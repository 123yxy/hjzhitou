userHead();
$(document).ready(function () {
    UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAppUser, {}, true, function (_data) {
        if (_data.retCode === "0000") {
            _data.retData ?
                ({
                    ccountstatus,
                    address,
                    appOpenid,
                    authStatus,
                    authentication,
                    businessCard,
                    company,
                    companycode,
                    contact,
                    createTime,
                    effectiveTime,
                    email,
                    focusarea,
                    isFill,
                    isFrozen,
                    lastLoginTime,
                    lastUserId,
                    loginTimes,
                    mobile,
                    nickName,
                    openTime,
                    openid,
                    password,
                    position,
                    purpose,
                    qq,
                    qqname,
                    qqopenid,
                    region,
                    registFrom,
                    sex,
                    signature,
                    subscribeTime,
                    thumb,
                    userId,
                    userLevel,
                    userName,
                    wechatNumber,
                    weibo,
                    weiboname,
                    weiboopenid,
                } =_data.retData) : location.href = "index.html";

            if (thumb) {
                $("#headimg").attr("src", thumb);
            }

            if (userName) {
                $("#username").val(userName);
            }
            // $("#persondata").attr("href","accountCenter.html?_to=z&thumb="+thumb+"&username="+userName+"&nickname="+nickName+"&sex="+sex+"&wechatnumber="+wechatNumber+"&company="+company+"&position="+position+"&region="+region);
            var _sex = "男"
            sex === 1 ? "" : _sex = "女"
            $("#nickname").val(nickName);
            $("#sex").val(_sex);
            $("#weinum").val(wechatNumber);
            $("#company").val(company);
            $("#pos").val(position);
            $("#region").val(region);
            localStorage.setItem('headImg', thumb ? thumb : '');
            localStorage.setItem('userName', userName ? userName : '');
            localStorage.setItem('nickName', nickName ? nickName : '');
            localStorage.setItem('sex', _sex);
            localStorage.setItem('wechatNumber', wechatNumber ? wechatNumber : '');
            localStorage.setItem('company', company ? company : '');
            localStorage.setItem('position', position ? position : '');
            localStorage.setItem('region', region ? region : '');
            localStorage.setItem('focusarea', focusarea ? focusarea : '');
            // $("#myfocusdata").attr("href", "myFocus.html?focusArea=" + focusarea);
            //console.log(password)
        }
    });
})

$("#edit").on("click", function () {
    $(this).hide();
    $("#save").show();
    $(".userMain-editPhoto").show();
})
var rgValidator = $("#infoForm").validate({
    rules: {
        username: {
            required: true,
            maxlength: 20
        },
        // nickname: {
        //     required: true,
        //     maxlength: 20
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
        username: {
            required: "请填写用户姓名",
            maxlength: "用户姓名最多支持20个汉字",
        },
        // nickname: {
        //     required: "请填写用户昵称",
        //     maxlength: "用户昵称最多支持20个汉字",
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
$("#passwordLo,#phoneNumLo").keydown(function (e) {
    if (e.keyCode == 13) {
        if ($("#loginForm").valid()) {
            login();
        }
    }
});

//提交登录
$("#save").on("click", function () {
    if ($("#infoForm").valid()) {
        // login();
        return false;
    }
});
