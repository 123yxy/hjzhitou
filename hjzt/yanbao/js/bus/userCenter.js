// userHead();
var fn = "", region1 = "";
$(document).ready(function () {
    //添加未注册/登录头 获取用户登录信息
    // $(".infor-name").html(sethead());
    // $("#uc").css("margin-right","10px");

    //logo链接
    $(".userHead-logo").html(logourl());
    $(".indexTop-user").html(sethead());
    getuserinfo();
    // $("#distpicker1").citys({
    //     required: false,
    //     nodata: 'disabled',
    //     onChange: function (data) {
    //         region1 = data['province'] + "-" + data['city'] + "-" + data['area'];
    //         // $('#place').text('当前选中地区：' + data['province'] + text + ' ' + data['city'] + ' ' + data['area']);
    //     }
    //     // 'reset': true,
    //     // onchange: function () {
    //     //     alert("sss")
    //     // }
    // });//初始化地点 20171012
    $("#distpicker1").citys({
        // required: false,
        nodata: 'hidden',
        onChange: function (data) {
            region1 = data['province'] + "-" + data['city'] + "-" + data['area'];
            // $('#place').text('当前选中地区：' + data['province'] + text + ' ' + data['city'] + ' ' + data['area']);
        }
    });//初始化地点 20171012

    // getuserinfo();
    UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAppUser, {}, true, function (_data) {
        if (_data.retCode === "0000") {
			//console.log(_data)
            var a;
            if (_data.retData.thumb) {
                // var image = new Image();
                // image.setAttribute('crossOrigin', 'anonymous');
                // image.onload = function () {
                //     var width = image.width;
                //     var height = image.height;
                //     if (width > 160 || height > 160) {
                //         a = UTIL.ys(image, "id", 0);
                //         $("#headimg").addClass("userCenter-photo_img");
                //         $("#headimg,#headimg1").attr("src", a);
                //         localStorage.setItem('headImg', a);
                //         return;
                //     }
                // };
                // image.src = _data.retData.thumb;
                // if (!a) {
                //     $("#headimg,#headimg1").attr("src", _data.retData.thumb);
                //     localStorage.setItem('headImg', _data.retData.thumb);
                // }
                $("#headimg").attr("src", _data.retData.thumb);
                localStorage.setItem('headImg', _data.retData.thumb);

            }
			if(_data.retData.nickName){
				$(".userCenter-name").text(_data.retData.nickName);
                $(".userCenter-name").text(_data.retData.nickName);
			}else if (_data.retData.mobile) {
                $(".userCenter-name").text(_data.retData.mobile);
            }
            if (_data.retData.userName) {
                $("#username1").val(_data.retData.userName);
                
            }
            
            // $("#persondata").attr("href","accountCenter.html?_to=z&thumb="+thumb+"&username="+userName+"&nickname="+nickName+"&sex="+sex+"&wechatnumber="+wechatNumber+"&company="+company+"&position="+position+"&region="+region);
            var _sex = "男"
            _data.retData.sex === 1 ? "" : _sex = "女"
            $("#phone").val(_data.retData.mobile);
            $("#nickname").val(_data.retData.nickName);
            $("#sex").val(_sex);
            $("#weinum").val(_data.retData.wechatNumber);
            $("#company").val(_data.retData.company);
            $("#pos").val(_data.retData.position);
            // $("#region").val(_data.retData.region);
            if (_data.retData.region) {
                var _reg = _data.retData.region.split('-'), _opt = {};
              
                if (_reg[0])
                    _opt = {
                        province: _reg[0],
                    }
                if (_reg[1])
                    $.extend(_opt, { city: _reg[1] })
                if (_reg[2])
                    $.extend(_opt, { area: _reg[2] })
                // if (_reg[0] && _reg[1] && _reg[1])
                $.extend(_opt, {
                    valueType: 'name',
                    // required: false,
                    nodata: 'hidden',
                    onChange: function (data) {
                        if (!data['city']){
                            region1 = data['province'] + "-" + data['area'];
                        }else if (!data['area']){
                            region1 = data['province'] + "-" + data['city'];
                        }else{
                            region1 = data['province'] + "-" + data['city'] + "-" + data['area'];
                        }
                         
                    }
                })
                 region1= _data.retData.region;
                $("#distpicker1").citys(_opt);//初始化地点 20171012
                // if (_reg[0]) {
                //     var $province = $("#province");
                //     $province.val(_reg[0]);
                //     $province.trigger("change");
                // }

                // // $("#distpicker1 select").eq(0).val(_reg[0]);
                // if (_reg[1]) {
                //     var $city = $("#city");
                //     $city.val(_reg[1]);
                //     $city.trigger("change");
                // }

                // if (_reg[2]) {
                //     var $area = $("#area");
                //     $area.val(_reg[2]);
                //     $area.trigger("change");
                // }
            }

            localStorage.setItem('phone', _data.retData.mobile ? _data.retData.mobile : '');
            // localStorage.setItem('headImg', a ? a : _data.retData.thumb);
            localStorage.setItem('userName', _data.retData.userName ? _data.retData.userName : '');
            localStorage.setItem('nickName', _data.retData.nickName ? _data.retData.nickName : '');
            localStorage.setItem('sex', _sex);
            localStorage.setItem('wechatNumber', _data.retData.wechatNumber ? _data.retData.wechatNumber : '');
            localStorage.setItem('company', _data.retData.company ? _data.retData.company : '');
            localStorage.setItem('position', _data.retData.position ? _data.retData.position : '');
            localStorage.setItem('region', _data.retData.region ? _data.retData.region : '');
            localStorage.setItem('focusarea', _data.retData.focusarea ? _data.retData.focusarea : '');
            // $("#myfocusdata").attr("href", "myFocus.html?focusArea=" + focusarea);
            //console.log(password)
        }
        else {
            exit();
            $.zmAlert("请重新登录");
            setTimeout(function () {
                location.href = "login.html"
            }, 200);
        }
    });
})
$('#btnCrop').on('click', function () {
    // UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAppUser, {}, true, function (_data) {
    UTIL.isLogin("",function () {
        btnCrop(function (_fn) {
            $("#headimg").attr("src", _fn);
            fn = _fn;
        });
    })

})
$("#edit").on("click", function () {
    $(this).hide();
    $("#save").show();
    $(".uptouxia").show();
    // $(".userMain-editPhoto").show();
    // var _sex = "<select id=\"sex\"><option value=\"1\" selected>男</option><option value=\"2\">女</option></select>";
    $("#sex").addClass("d");
    $("#sex1").removeClass("d");
    if ($("#sex").val() === "女")
        $("#sex1").val("2");
    else
        $("#sex1").val("1");
    $("input[readonly]:gt(0)").removeAttr("readonly");
    $("#distpicker1 select").prop("disabled", false);
    // uploadPhoto(function (_data) {
    //     var fd = new FormData();
    //     var files = UTIL.initdataURLtoBlob.dataURLtoBlob(_data);
    //     fd.append("file", files);
    //     // WF_ajax.uploadUserAvatar(fd, function (_data) {
    //     //     if (_data.retCode === "0000") {
    //     //         // $.zmAlert("上传成功");
    //     //         var path = _data.retData;
    //     //         localStorage.setItem("headImg", path.path);
    //     //         var img_box = document.getElementById("img_box");
    //     //         var img = img_box.children[0];
    //     //         img.src = path.path;
    //     //         img.setAttribute("src", path.path);

    //     //     }
    //     // })
    //     var img = document.getElementById("headimg1");


    //     img.src = _data;
    //     img.data = 1;
    // }, "")
})
var rgValidator = $("#infoForm").validate({
    rules: {
        username1: {
            required: true,
            maxlength: 20
        },
        // phone: {
        //     required: true,
        //     mobile: true,
        //     maxlength: 11,
        // },
        sex: {
            required: true
        },
        pos: {
            required: true,
            maxlength: 20
        },
        company: {
            required: true,
            maxlength: 20
        }
    },
    messages: {
        username1: {
            required: "请填写用户姓名",
            maxlength: "用户姓名最多支持20个汉字",
        },
        // phone: {
        //     required: "请填写手机号",
        //     mobile: "手机号格式不正确",
        //     maxlength: "手机号最大为11位"
        // },
        sex: {

        },
        pos: {
            required: "请填写职位名称",
            maxlength: "职位最多支持20个汉字"
        },
        company: {
            required: "请填写公司名称",
            maxlength: "公司名称最多支持20个汉字"
        }

    }
});

//登录keydown事件
// $("#passwordLo,#phoneNumLo").keydown(function (e) {
//     if (e.keyCode == 13) {
//         if ($("#loginForm").valid()) {
//             login();
//         }
//     }
// });

//提交数据
$("#save").on("click", function () {
    UTIL.isLogin("",function () {
        if ($("#infoForm").valid()) {
            save();
            return false;
        }
    })

});
function save() {
    var username = $("#username1").val(),
        wechatnum = $("#weinum").val(),
        pos = $("#pos").val(),
        company = $("#company").val(),
        nickname = $("#nickname").val(),
        sex = $("#sex1").val(),
        // region = $("#region").val(),shiqi 20171016
        // region = $("#distpicker1 select").eq(0).val() + "-" + $("#distpicker1 select").eq(1).val() + "-" + $("#distpicker1 select").eq(2).val(),
        region = region1;
    // thumb = document.getElementById("headimg1").data === 1 ? document.getElementById("headimg1").src : "";
    // (username)?"":($$.toast('用户名未填写', { duration: 'long', type: 'div' }),return false);
    thumb = fn;
    if (thumb === "") {
        data = {
            userName: username,
            sex: sex,
            wechatNumber: wechatnum,
            position: pos,
            company: company,
            region: region,
            nickName: nickname
        }
    }
    else {
        data = {
            userName: username,
            sex: sex,
            wechatNumber: wechatnum,
            position: pos,
            company: company,
            region: region,
            nickName: nickname,
            thumb: thumb
        }
    }

    UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.updatetUser, data, true, function (_data) {
        if (_data.retCode === "0000") {
            localStorage.setItem('userName', username);
            if (thumb !== "")
                localStorage.setItem('headImg', thumb);
            localStorage.setItem('nickName', nickname);
            localStorage.setItem('company', company);
            localStorage.setItem('sex', sex);
            localStorage.setItem('position', pos);
            localStorage.setItem('region', region);
            localStorage.setItem('weChatName', wechatnum)
            $.zmAlert("资料更新成功", 300, "userCenter.html");
            // location.href = "userCenter.html";
        }

        else
            $.zmAlert(_data.retMsg);
    })
}

/**
 * 作    者 shiqi
 * 功    能 菜单切换
 * 时    间 20171025
 * 
 */
// var total = 1;
// var visiblePages = 5;
var userid = localStorage["userId"];
$(".userMenu").on("click", function (e) {
    // alert(1111111111111)
    var ee = window.event || e;
    	if (ee.target.tagName === "A") {
	        $(ee.target.parentElement).addClass("active").siblings().removeClass("active");
	        // ee.target.parentElement.addClass("active");
	        var _id = ee.target.getAttribute("data");
	        $(".userData").not("nodisplay").addClass("nodisplay");
	        _title(_id);
	    }else{
	    	var id="myOrder";
	    	_title(id);
	    }

    
})
/**
 * 作者 shiqi
 * 功能 每个子模块标题
 * 时间 20171025
 * @param {*} _id 模块id
 */
var _title = function (_id) {
    var _id = _id.split('.');
   // console.log(_id)
    if (_id.length > 1) {
        _id = _id[1]
        $("#userinfo").removeClass("nodisplay");
    }
    else {
        _id = _id[0];
        $("#" + _id).removeClass("nodisplay");
    }

    if (_id === "userver") {
    	$(".user-title").show();
//  	$("#myOrder").hide();
        $(".user-title").html("<h2>版本查询</h2>")
        _getdata(UTIL.CONFIG.findZntyVersion, _renderhtml, {});
    }
    else if (_id === "useryb") {
    	$(".user-title").show();
//  	$("#myOrder").hide();
        $(".user-title").html("<h2>历史研报</h2>")
        _getdata(UTIL.CONFIG.findResearchReport, _researchreport._renderhtml1, {
            userId: userid,
            pageNum: 1,
            pageSize: 10
        });
    }
    else if (_id === "userfoc") {
    	$(".user-title").show();
    	$("#myOrder").hide();
        $(".user-title").html("<h2>关注领域</h2>").append("<button id=\"edit1\" class=\"button-blue\">编辑</button>");

        _gethtml("./userFocus.html", function (_data) {
            var ug = $(_data).find(".userFocus-group");
            // var js = $(_data).find("script");
            if (ug.length)
                $("#userinfo").html(ug);
        });
    }
    else if (_id === "useracc") {
    	$(".user-title").show();
    	$("#myOrder").hide();
        $(".user-title").html("<h2>社交账号</h2>");
        // _gethtml("/userFocus.html", function (_data) {
        uc_callback("./userAccount.html", ".userAccount-group");
    }
    else if (_id === "usercpw") {
    	$(".user-title").show();
    	$("#myOrder").hide();
        $(".user-title").html("<h2>修改密码</h2>");
        uc_callback("./userChangePW.html", ".userChangePW-group");
    }
    else if (_id === "userCenter") {
    	window.location.href="userCenter.html"
        //location.reload();
    }else if (_id === "myOrder") {
    	$(".user-title").hide();
    	$(".userData").not("nodisplay").addClass("nodisplay");
    	$("#myOrder").removeClass("nodisplay");
    	$("#orMyOrder").addClass("active").siblings().removeClass("active");
    }
}

var _gethtml = function (url, _callback) {
    $.ajax({
        url: url,//shiqi 20170919
        type: 'get',
        dataType: 'html',
        success: function (data) {
            _callback(decodeURI(data))
        }
    });
}
/**
 * 作    者 shiqi
 * 功    能 统一获取数据
 * 时    间 20171025
 * @param {*} url 接口连接
 * @param {*} _callback 回调方法 
 */
var _getdata = function (url, _callback, param, _isinit, idx) {
    UTIL.axs(UTIL.CONFIG.wwwhost + url, param, true, function (_data) {
        if (_data.retCode === "0000") {
            var renderdata = _data.retData;
            _isinit = "" || _isinit
            _callback(renderdata, _isinit, idx);
        }
        else
            _callback("");
    })
}
/**
 * 作    者 shiqi
 * 功    能 获取版本内容
 * 时    间 20171025
 * 接口提供 国庆
 * @param {*} _data 后台接口数据
 */
var _renderhtml = function (_data) {
    var div = $("<div>"), obj = [];
    $.each(_data, function (k, v) {
        var tr = $("<tr>");
        obj.push({
            title: v.versionNum,
            content: v.versionContent
        })
        tr.append("<td>" + v.versionNum + "</td>")
            .append("<td>" + v.dataTime + "</td>")
            .append("<td><a class='lookat' href=javascript:void(0)>查看</a></td>");

        div.append(tr);
    })
    $("#userver .standard-table table tbody").html(div.html());
    $(".lookat").on("click", function () {
        var _idx = $(this).parent().parent().index();
        if ($(".faxing-tc").length) {
            // var ta = $("<textarea>");
            $(".faxing-tc h2").text(obj[_idx].title);
            // ta.val(obj[_idx].content);
            // $(".faxing-tc .wj-commonTable").append(ta);
            $(".faxing-tc .wj-commonTable").text(obj[_idx].content);
            $(".marsk").show();
            $(".faxing-tc").show();
            return;
        }
        var _wrapper = _tipwin(obj[_idx]);
        $(document.body).append(_wrapper);
        $(".tc-close").on("click", function () {
            $(".marsk").click();
        })
        // $('.box').pagination();
    })
    $(".marsk").on("click", function () {
        $(".marsk").hide();
        $("body,html").css("overflow", "auto");
        // $("#patentnumTc").hide();
        // $("#copyrightnumTc").hide();
        $(".faxing-tc").hide();
        // $("#marketNum").hide();
    })
    // $(".faxing-tc h2").on("click", function () {
    //     if(event.target.tagName === "B"){

    //     }
    //     $(".marsk").click();
    // })
}
/**
 * 功    能 历史研报
 * 作    者 shiqi
 * 时    间 20171028
 * 接口提供 国庆
 * @param {*} _data 后台接口数据
 * @param {*} _isinit 初始化分页
 */
var _researchreport = {
    _obj: [],
    total: 1,
    visiblePages: 5,
    currentpage: 1,
    _renderhtml1: function (_data, _isinit, idx) {
        // if (_data === "" || _data === null) {
        if (!_data.list.length) {
            if (idx) {
                if (_researchreport.currentpage === 1) {
                    $("#useryb .standard-table").html(UTIL.oplugins._nodata());
                    $("#useryb .standard-table").find(".noDatas").addClass("noDatas-s1");
                    $('.pagination').hide();
                }
                else {
                    _researchreport.currentpage -= 1;
                    _getdata(UTIL.CONFIG.findResearchReport, _researchreport._renderhtml1, {
                        userId: userid,
                        pageNum: _researchreport.currentpage,
                        pageSize: 10
                    })
                }
            }
            else {
                $("#useryb .standard-table").html(UTIL.oplugins._nodata());
                $("#useryb .standard-table").find(".noDatas").addClass("noDatas-s1");
            }

            return;
        }
        var div = $("<div>");
        _researchreport.total = _data.pageTotal;
        _researchreport._obj = [];
        // var _this = this;
        $.each(_data.list, function (k, v) {
            var tr = $("<tr>");
            _researchreport._obj.push({
                id: v.id
            })
            tr.append("<td><a href='cover.html?stockCode=" + v.stockCode + "&stockName=" + v.stockName + "'target=_blank>" + v.stockName + "(" + v.stockCode + ")智能研报</a></td>")
                .append("<td>" + v.dataTime + "</td>").append("<td class='del'></td>")
            // .append("<td><a class='lookat' href=javascript:void(0)>查看</a></td>");

            div.append(tr);
        })
        $("#useryb .standard-table table tbody").html(div.html());
       
        //首次加载分页
        if (!_isinit) {
            initpagination(_researchreport.total, _researchreport.visiblePages, _researchreport.currentpage, 1);
            return;
        }
        // _researchreport.currentpage += 1;
        console.log(_researchreport.currentpage )
    },
    delresearchreport: function (id, trno, _callback) {
        _getdata(UTIL.CONFIG.deleteResearchReport, function (_data) {
            if (!_data) {
                _researchreport.rerender(2, 2);
                _callback();
                $.zmAlert("删除成功");
            }
        }
            , id)
    },
    delegateEvent: function () {
        $("#useryb .standard-table table").on("click", function (e) {
            var ee = window.event || e;
            if (ee.target.tagName === "TD" && ee.target.className === "del") {
                var _parent = $(ee.target).parent();
                $.each(_researchreport._obj, function (k, v) {
                    if (k === _parent.index()) {
                        _researchreport.delresearchreport(v, k, function () {
                            _researchreport._obj.splice(k, 1);
                            // _researchreport.rerender(2, 2)
                            _parent.remove();
                        });
                        return false;
                    }
                })
            }
        })
    },
    rerender: function (tr, idx) {
        
        // _researchreport._obj = [];
        _getdata(UTIL.CONFIG.findResearchReport, _researchreport._renderhtml1, {
            userId: userid,
            pageNum: _researchreport.currentpage,
            pageSize: 10
        }, null, idx);
        // tr.remove();
    }
}
_researchreport.delegateEvent();
/**
 * 功能：分页
 * 作者：shiqi
 * 时间：20171027
 */
var initpagination = function (total, visiblePages, currentpage, noprocess) {
    var noprocess = "" || noprocess;
    $('.pagination').jqPaginator({
        // link_string: '/?page={page_number}',
        totalPages: total,
        visiblePages: visiblePages,
        currentPage: currentpage,
        first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
        prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
        next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
        last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
        onPageChange: function (num, type) {
            if (noprocess) {
                noprocess = "";
                return;
            }
            _researchreport.currentpage = num;
            _getdata(UTIL.CONFIG.findResearchReport, _researchreport._renderhtml1, {
                userId: userid,
                pageNum: num,
                pageSize: 10
            }, 1)
        }
    });
}

/**
 * 作    者 shiqi
 * 功    能 弹框
 * 时    间 20171025
 * @param {*} data 弹出框标题及内容
 */
var _tipwin = function (data) {
    // 融资情况
    var tip = "<div class=\"zhuanli-tc faxing-tc\" >" +
        "<b class=\"tc-close\"></b>" +
        "<h2>" + data.title + "</h2>" +
        "<div class=\"reyuan-table wj-commonTable\" style='white-space: pre;'>" + data.content +
        "</div></div>";
    $(".marsk").show();
    return tip;
}

function uc_callback(url, _wrapper, title) {
    _gethtml(url, function (_data) {
        var ug = $(_data).find(_wrapper);
        // var js = $(_data).find("script");
        if (ug.length) {
            if (title) {
                $(".user-title").html("<h2>关注领域</h2>").append("<button id=\"edit1\" class=\"button-blue\">编辑</button>");
            }
            $("#userinfo").html(ug);
        }

    });
}