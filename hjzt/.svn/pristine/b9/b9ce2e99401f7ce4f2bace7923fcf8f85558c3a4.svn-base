var obj1 = {}
$(document).ready(function () {
    
    scgk.init()
    // gfltfun()
    $("#minPlacementDateStrInput").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        // showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        defaultDate:null,
        prevBigText: '<<',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dateFormat: 'yy-mm-dd',
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        maxDate: 0,
        minDate: '2010-1-1',
        // onSelect: function (dateText, inst) {
        //     selecttime(dateText, inst)
        // },
        onClose: function (dateText, inst) {
            selecttime(dateText, inst)
        },
        // beforeShow: function (input) {
        //     $("#minPlacementDateStrInput").datepicker('option', 'maxDate', $("#maxPlacementDateStrInput").val());
        // }
    });
    // var myDate = new Date();
    // var dateTemps = (myDate.getFullYear()).toString() + "-" + ((myDate.getMonth() + 4).toString() < 10 ? "0" + (myDate.getMonth() + 4).toString() : (myDate.getMonth() + 4).toString()) + "-" + ((myDate.getDate()).toString() < 10 ? "0" + (myDate.getDate()).toString() : (myDate.getDate()).toString());
    $("#maxPlacementDateStrInput").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        // showButtonPanel: true,
        changeMonth: true,
        defaultDate:"+3m",
        changeYear: true,
        prevBigText: '<<',
        nextBigText: '>>',
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dateFormat: 'yy-mm-dd',
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        maxDate: "0",
        minDate: '2010-1-1',
        // onSelect: function (dateText, inst) {
        //     selecttime(dateText, inst)
        // },
        onClose: function (dateText, inst) {
            selecttime(dateText, inst)
        },
        // beforeShow: function (input) {
        //     $("#maxPlacementDateStrInput").datepicker('option', 'minDate', $("#minPlacementDateStrInput").val());
        // }
    });
    var selecttime = function (dateText, inst) {
        var DateStrInput = $("#minPlacementDateStrInput").val()
        var _max = false;
        if (inst.id === "minPlacementDateStrInput") {
            DateStrInput = $("#maxPlacementDateStrInput").val()
            _max = true
        }

        if (DateStrInput.trim().length) {
            var fullDate = DateStrInput.split("-");
            if (_max) {
                if (new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0) < new Date(dateText)) {
                    $(".sj_alert").show()
                    setTimeout(function () { $(".sj_alert").hide(); }, 1000);
                    return;
                }
                else
                    _function({
                        startTime: dateText,
                        endTime: DateStrInput
                    })

            }
            else {
                if (new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0) > new Date(dateText)) {
                    $(".sj_alert").show()
                    setTimeout(function () { $(".sj_alert").hide(); }, 1000);
                    return;
                }
                else
                    _function({
                        startTime: DateStrInput,
                        endTime: dateText
                    })
            }

            // console.log(new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0));
        }
        else {
            // var fullDate = inst.input[0].value;
            if (_max) {
                _function({
                    startTime: dateText,
                    endTime: ""
                })
            }
            else

                _function({
                    startTime: "",
                    endTime: dateText
                })

        }

    }
})

var util = {
    isStrKong: function (str) {
        return ((str == null || str == "" || str == "null" || str == undefined) ? "--" : str);
    },

    /**
     * 判断数字是否为空
     * @param str
     * @returns
     */
    isSZKong: function (sz, bl, h) {
        return ((sz == null || sz == undefined || (sz == "" && sz != 0)) ? "-" : (bl && h ? (sz / h).toFixed(2) : (bl && !h ? sz.toFixed(2) : sz)));
    },
    fix2: function (sz) {
        return (sz / 10000).toFixed(2);
    },
    fmtNum3: function (num) {//格式化数字成千分位
        var num = (num || 0).toString(), result = '';
        if (num.indexOf(',') > 0)
            return num;
        var xiaoshu = "";
        var fushu = "";
        if (num.indexOf("-") == 0) {
            fushu = "-";
            num = num.substring(1);
        }
        if (num.indexOf('.') > 0) {
            xiaoshu = num.substring(num.indexOf("."));
            num = num.substring(0, num.indexOf("."));
        }
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return fushu + result + xiaoshu;
    }
}
var _getdata = function (url, _callback, param, isload) {
    $.axs(url, param, true, function (_data) {
        if (_data.retCode === "0000") {
            var renderdata = _data.retData;
            if (renderdata instanceof Array) {
                if (_data.retData.length)
                    _callback(renderdata);
                else
                    _callback(0)
            }
            else
                _callback(renderdata);
        }
        else
            _callback("");
    }, isload)
}
//融资下拉菜单
// 行业
$("#cw-listO").on("click", "li", function () {
    $(this).addClass("on").siblings().removeClass("on");
    var reportPeriod = $(this).text();
    $("#hyxl").html(reportPeriod);
    $(this).parent().slideUp();
    // AfindProfitData(reportPeriod);
})
$("#hyxl").on("click", function () {
    if ($("#cw-listO").css("display") == "block") {
        $("#cw-listO").slideUp()
    } else {
        $("#cw-listO").slideDown()
    }
})
$(document).on("click", function (e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var target = $("#cwTimeO");
    while (elem != null && elem.id != "cwTimeO") {
        elem = elem.parentElement;
        if (elem == target[0]) {
            return;
        } else {
            $("#cw-listO").slideUp();
        }
    }
})
// 地区
$("#cw-listS").on("click", "li", function () {
    $(this).addClass("on").siblings().removeClass("on");
    var reportPeriod = $(this).text();
    $("#dqxl").html(reportPeriod);
    $(this).parent().slideUp();
    // AfindProfitData(reportPeriod);
})
$("#dqxl").on("click", function () {
    if ($("#cw-listS").css("display") == "block") {
        $("#cw-listS").slideUp()
    } else {
        $("#cw-listS").slideDown()
    }
})
$(document).on("click", function (e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var target = $("#cwTimeS");
    while (elem != null && elem.id != "cwTimeS") {
        elem = elem.parentElement;
        if (elem == target[0]) {
            return;
        } else {
            $("#cw-listS").slideUp();
        }
    }
})
// 融资方式
$("#cw-listT").on("click", "li", function () {
    $(this).addClass("on").siblings().removeClass("on");
    var reportPeriod = $(this).text();
    $("#rzxl").html(reportPeriod);
    $(this).parent().slideUp();
    // AfindProfitData(reportPeriod);
})
$("#rzxl").on("click", function () {
    if ($("#cw-listT").css("display") == "block") {
        $("#cw-listT").slideUp()
    } else {
        $("#cw-listT").slideDown()
    }
})
$(document).on("click", function (e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var target = $("#cwTimeT");
    while (elem != null && elem.id != "cwTimeT") {
        elem = elem.parentElement;
        if (elem == target[0]) {
            return;
        } else {
            $("#cw-listT").slideUp();
        }
    }
})
var _function = {}

// 投资日历tab切换 12/26 6.32
// 股份流通
var tzrl = {

    hyd: function (a, page) {
        // 会议大全
        //   console.log(a)

        var shuju = a.data;
        // console.log(shuju)
        if (shuju.length) {
            var nth = "";
            for (var i = 0; i < shuju.length; i++) {
                // console.log(shuju[i])

                nth += "<ul class='hydqlb'>"
                nth += "<li title='" + shuju[i].meetingName + "'>" + shuju[i].meetingName + "</li>"
                nth += "<li>" + shuju[i].conveneDate + "</li>"
                if (shuju[i].holdCity == null) {
                    nth += "<li>" + '--' + "</li>"
                } else {
                    nth += "<li>" + shuju[i].holdCity + "</li>"
                }
                if (shuju[i].sponsor == null) {
                    nth += "<li>" + '--' + "</li>"
                } else {
                    nth += "<li title='" + shuju[i].sponsor + "'>" + shuju[i].sponsor + "</li>"
                }
                if (shuju[i].participants == null) {
                    nth += "<li>" + '--' + "</li>"
                } else {
                    nth += "<li title='" + shuju[i].participants + "'>" + shuju[i].participants + "</li>"
                }

                nth += "<li>" + shuju[i].meetingType + "</li>"
                nth += "<li>" + shuju[i].industry + "</li>"
                nth += "<li class='hyck'><span class='mbjkTT'>查看</span></li>"
                nth += "<div class='martable' style='display: none;'>"
                nth += "           <div class='gban gbhy'></div>"
                nth += "           <div class='mtzx'>"
                nth += "               <h2>" + shuju[i].meetingName + "</h2>"
                nth += "               <div class='menu'>"
                nth += "                   <div class='bdnr'>"
                nth += "                       <div class='mtlis'>"
                nth += "                       <p>" + shuju[i].detailedMsg + "</p>"
                nth += "                       </div>"
                nth += "                       <div class='clr'></div>"
                nth += "                  </div>"
                nth += "                 <div class='clr'></div>"
                nth += "            </div>"
                nth += "       </div>"
                nth += "  </div>"
                nth += "</ul>"
            }
            if (page) {
                $(".bdnr .lis").append(nth);
            } else {
                $(".bdnr .lis").html('').html(nth);
            }
            $(".hyck").on("click", function () {
                $(this).next().show()
                $(".marsk").show().css('z-index', '0')
            })
            $(".gbhy").on('click', function () {
                $(".marsk").hide()
                $(".martable").hide()
            })

        } else if (!page) {
            var ul1 = $("<div class='zwshuj'>暂无数据</div>");
            $(".bdnr .lis").html('').html(ul1);
        }

    },
    _onscroll: function () {
        // alert("1")
        var totalheight = 0;//定义一个总的高度变量
        var ind = 2;
        $(".lis").off("scroll")
        $(".lis").scroll(function () {
            var stime = $("#minPlacementDateStrInput").val();
            // alert(stime)
            var etime = $("#maxPlacementDateStrInput").val();
            totalheight = parseFloat($(".lis").height()) + parseFloat($(".lis").scrollTop());//浏览器的高度加上滚动条的高度 
            // console.log(totalheight)
            if ($(".lis")[0].scrollHeight <= totalheight) //当文档的高度小于或者等于总的高度的时候，开始动态加载数据
            {
                //加载数据
                _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                    tzrl.hyd(a, ind); ind++;
                    // console.log(a)
                }, {
                        type: 3,
                        pageLimit: 20,//每页条数
                        pageIndex: ind, //当前页数
                        stime: stime,
                        etime: etime

                    })
            }
        });
    },
    init: function () {
        var MaxHeight =$(document).height()-400;
        $(".lis").height(MaxHeight)
        tzrl._onscroll()
        
        $("#maxPlacementDateStrInput").datepicker('option', 'maxDate', '+3m')
        $("#minPlacementDateStrInput").datepicker('option', 'maxDate', '+3m')
        // $("title").text('投资日历')
        $(".lishei").html('');
        $("#gfltul").hide()
        $('.rzlb').removeClass("zjkd")
        $("#gfltdiv").off()
        $(".rzlb").removeClass("rzw");
        $(".rzlb").addClass('rzz')
        // $(".rzlb").addClass("rzw")
        $(".rztitle").show();
        $(".scgk,.rzdxl,.tzrlxl").hide();
        var ul = $("<ul class='gulbul'><li>企业名称</li><li style='text-align:center!important;'>股份流通</li></ul>");
        $(".bdnr .biaoTou").html("").html(ul);
        $("#mbj").hide();
        $("#gfl").show();
        $(".biaoTou").show();
        $('.lishei').html("")
        $('#tzrldx').css('display', 'block');
        $("#gfltdiv").show();
        $("#gfl").find("span").removeClass("sel");
        $("#gfl").find("span").eq(0).addClass("sel");



        var cli = function (type_val) {
            $("#gfltdiv").on("click", "li", function (e) {
                var evt = e || event;
                var target = evt.target;
                cslb(type_val, e);

            })
        }
        cli('1');
        var ltgfdj = function () {
            $(".lishei").removeClass("minW")
            $(".lis").off("scroll")
            $(".lishei").html('');
            $('.rzlb').removeClass("zjkd")
            $(".rzlb").removeClass("rzw");
            $(".rzlb").addClass("rzz")
            var ul = $("<ul class='gulbul'><li>企业名称</li><li style='text-align:center!important;'>股份流通</li></ul>");
            $(".bdnr .biaoTou").html("").html(ul);
            $(".biaoTou").off("click")
            $('#mbj').css('display', 'none')
            $(this).addClass('sel').siblings().removeClass("sel");
            $("#gfl").show()
            $('#gfltdiv').css('display', 'block')
            $('.rzdxl').css('display', 'none')

            var p = $("#gfltp").text().substr(0, 10)
            // console.log(p)
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                ltg(a);
            }, {
                    stime: p,
                    // endTime: '2017-11-30',
                    type: 1

                })
            var reportPeriod;
            $("#gfltdiv").on("click", "li", function (e) {
                var evt = e || event;
                var target = evt.target;
                $(this).addClass("on").siblings().removeClass("on");
                reportPeriod = $(this).text();
                // console.log(reportPeriod)
                $(".cw-selectedTime").text(reportPeriod);
                // console.log( $(".cw-selectedTime").text())
                $(this).parent().slideUp();
                // console.log(p)
                _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                    ltg(a);
                }, {
                        stime: p,
                        // endTime: '2017-11-30',
                        type: 1

                    })

                // evt.stopPropagation();

            })
        }
        var yjbgdj = function () {
            $(".lishei").removeClass("minW")
            $(".lis").off("scroll")
            $('.rzlb').removeClass("zjkd")
            $(".rzlb").removeClass("rzw");
            $(".rzlb").addClass('rzz')
            var ul = $("<ul class='gulbul yjbgul'><li>企业名称</li><li style='text-align:center!important;'>业绩预告</li></ul>");
            $(".bdnr .biaoTou").html("").html(ul);
            $('#mbj').css('display', 'none')
            $('#gfl').css('display', 'blcok')
            $(this).addClass('sel').siblings().removeClass("sel");
            $('#gfltdiv').css('display', 'block')
            $('.rzdxl').css('display', 'none')
            $(".bdnr .biaoTou").html("").html(ul);
            $('.bdnr .lis').html("")
            var p = $("#gfltp").text().substr(0, 10)
            // console.log(p)
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                ltt(a);
            }, {
                    stime: p,
                    // endTime: '2017-11-30',
                    type: 2

                })
            $("#gfltdiv").on("click", "li", function () {
                // $(this).addClass("on").siblings().removeClass("on");
                var reportPeriod = $(this).text().substr(0, 10);
                // console.log(reportPeriod)
                $("#gfltp").text(reportPeriod);
                $(this).parent().slideUp();
                // console.log(p)
                _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                    ltt(a);
                }, {
                        stime: p,
                        // endTime: '2017-11-30',
                        type: 2

                    })



            })
        }
        var hydqdj = function () {
            $(".lishei").removeClass("minW")
            $(".lishei").html('');
            var currDate = new Date();
                var startY=currDate.getFullYear();
                var startM=currDate.getMonth()+1;
                var startD=currDate.getDate();
                var mydate=new Date(startY,startM+3,startD);
                var endY=mydate.getFullYear();
                var endM=mydate.getMonth();
                var endD=mydate.getDate();
                endM = (endM < 10) ? ('0' + endM) : endM;
                endD = ( endD< 10) ? ('0' + endD) : endD;
                startM = (startM < 10) ? ('0' + startM) : startM;
                startD = (startD < 10) ? ('0' + startD) : startD;
                var tcsy=(endY+"-"+endM+"-"+endD);
                var getD=(startY+"-"+startM+"-"+startD)
            // $("#minPlacementDateStrInput").attr("placeholder",getD)
            // $("#maxPlacementDateStrInput").attr("placeholder",tcsy)     
            // $("#minPlacementDateStrInput").val("")
            // $("#maxPlacementDateStrInput").val("")
            $("#minPlacementDateStrInput").val(getD)
            $("#maxPlacementDateStrInput").val(tcsy)     
            $("#dadq").show()
            $("#dadd").hide()
            $(".rzlb").removeClass("rzz");
            $(".rzlb").removeClass("rzw");
            $(".biaoTou").off("click")
            $('#mbj').css('display', 'none')
            $(this).addClass('sel').siblings().removeClass("sel");
            $('#gfl').css('display', 'blcok')
            $('.list').addClass('xzkd')
            // $(".bdnr").html("");
            $('.rzlb').addClass("zjkd")
            var ul = $("<ul class='hydqlb'><li>会议名称</li><li>召开日期</li><li>举办城市</li><li>举办方</li><li>参会人员</li><li><p>会议类型</p></li><li><p>所属行业</p></li><li>详细介绍</li></ul>")
            $(".bdnr .biaoTou").html("").html(ul);
            $('.bdnr .lis').html("")
            $('#gfltdiv').css('display', 'none')
            $('.rzdxl').css('display', 'block')
            $('.ggwb').text('学术分类')
            $('.hyp').text('行业')
            $('.qyp').text('区域')
            $(".selectBox").off()
            // 条件筛选接口
            _getdata("/seinvest/investmentCalendar/queryMeetTerm.do", function (data) {
                if (data) {
                    $(document).on("click", function () {
                        $(".selectBox ul").slideUp();
                    });

                    $(".selectBox").on("click", function (e) {
                        var evt = e || event;
                        var target = evt.target;
                        var te = target.innerText
                        if (target.tagName === "A")
                            target = target.parentElement;
                        if (target.tagName === "LI") {
                            var p = $(target).parent().parent().find("p");
                            var vl = target.getAttribute("data-value");
                            $(".selectBox ul").hide();
                            $(".searching").hide();
                            $(".jiabeijing").hide();
                            p.text(te)
                            var whi = target.parentElement;
                            var id = whi.getAttribute("id")
                            if (id === "qy")
                                param.stateId = 12
                            else if (id === "hy")
                                param.industryLtId = 60
                            else if (id === "rzfs")
                                param.rzType = vl
                        }
                    });
                    var hy = data.industry;
                    var nth = "<li data-value=''><a href=\"javascript:;\">全部</a></li>";
                    for (var i = 0; i < hy.length; i++) {
                        // console.log(hy[i])

                        nth += "<li data-value='" + hy[i] + "' ><a href=\"javascript:;\">" + hy[i] + "</a></li>"
                    }
                    $("#hy").html(nth)

                    var qy = data.holdCity;
                    var tth = "<li data-value=''><a href=\"javascript:;\">全部</a></li>";
                    $("#hy").html(nth)
                    for (var i = 0; i < qy.length; i++) {
                        if (qy[i] == null) {

                        } else {
                            // console.log("区域=="+qy[i]+"==="+qy[i].length+"       ====="+qy[i].replace(" ","").length);
                            tth += "<li  data-value='" + qy[i] + "'  title='" + qy[i] + "'><a href=\"javascript:;\">" + qy[i] + "</a></li>"
                        }

                    }
                    $('#qy').html(tth)

                    var fs = data.meetingType;
                    var ntt = "<li data-value=''><a href=\"javascript:;\">全部</a></li>";
                    for (var i = 0; i < fs.length; i++) {
                        ntt += "<li  data-value='" + fs[i] + "' ><a href=\"javascript:;\">" + fs[i] + "</a></li>"
                    }
                    $('#rzfs').html(ntt)

                }
            })
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                tzrl.hyd(a);
                // console.log(a)
            }, {
                    type: 3,
                    pageLimit: 20,//每页条数
                    pageIndex: 1  //当前页数


                })
            
            $(".list5").on('click', 'li', function () {
                //行业
                var hy = $(this).attr("data-value");
                // console.log(hy)
                obj1.hy = hy;
                _function();
                // tzrl._onscroll(_function())


            })
            $(".list6").on('click', 'li', function () {
                //区域
                var qy = $(this).attr("data-value");
                // console.log(qy)
                obj1.qy = qy;
                _function();
                // tzrl._onscroll(_function())

            })
            $(".list7").on('click', 'li', function () {
                //方式
                var fs = $(this).attr("data-value");
                // if (obj.fs && obj.fs != fs) {
                // console.log(fs)
                obj1.fs = fs;
                _function();
                // tzrl._onscroll(_function())
                // }
            })

        }
        scgksel(function (type) {
            if (type == "流通股份") {
                ltgfdj();
                cli('1')
            }
            if (type == "业预报告") {
                yjbgdj();
                cli('2')
            }
            if (type == "会议大全") {
                hydqdj();
                cli('3')
            }
        })
        this._initselTime();
        var ltg = function (a) {
            //   console.log(a)
            // evt.stopPropagation();
            var shuju = a.data;
            if (shuju != null && shuju != "" && shuju != undefined) {
                var nth = "";
                // console.log(reportPeriod)
                for (var i = 0; i < shuju.length; i++) {
                    // console.log(shuju[i])

                    nth += "<ul class='gulbul'><li>" + shuju[i].stockName + "</li><li>" + shuju[i].circulationMsg + "</li></ul>"
                }
                $(".bdnr .lis").html('').append(nth)
            } else {
                var ul1 = $("<div class='zwshuj'>暂无数据</div>");
                $(".bdnr .lis").html("").append(ul1);
            }


        }
        var ltt = function (a) {
            // 业绩报告
            //   console.log(a)
            
            var shuju = a.data;
            if (shuju != null && shuju != "" && shuju != undefined) {
                var nth = "";
                for (var i = 0; i < shuju.length; i++) {
                    // console.log(shuju[i])

                    nth += "<ul class='gulbul'><li>" + shuju[i].stockName + "</li><li>" + shuju[i].circulationMsg + "</li></ul>"
                }
                $(".bdnr .lis").html(nth)
            } else {
                var ul1 = $("<div class='zwshuj'>暂无数据</div>");
                $(".bdnr .lis").html(ul1);
            }

        }



        var reportPeriod;
        var cslb = function (type, e) {
            //          $('#gfl').css('display', 'block')
            $(e.target).addClass("on").siblings().removeClass("on");
            reportPeriod = $(e.target).text().substr(0, 10);
            // console.log(reportPeriod)
            $("#gfltp").html(reportPeriod);
            $(e.target).parent().slideUp();
            // $(".scgk").css('display', 'none')
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                ltg(a);
            }, {
                    stime: reportPeriod,
                    // endTime: '2017-11-30',
                    type: type

                })
        }




        $("#gfltdiv").on("click", function (e) {
            // alert(1)
            var e = e || window.event;
            var elem = e.target || e.srcElement;
            if ($("#gfltul").css("display") == "block") {
                $("#gfltul").slideUp()

            } else {
                $("#gfltul").slideDown()
            }
            e.stopPropagation();


        })
        $(document).on("click", function (e) {
            // alert(0)
            var e = e || window.event;
            var elem = e.target || e.srcElement;
            var target = $("#gfltdiv");
            while (elem != null && elem.id != "gfltdiv") {
                elem = elem.parentElement;
                if (elem == target[0]) {
                    return;
                } else {
                    $("#gfltul").slideUp();
                    $("#gflaaa").css('display', 'block')
                }
            }
        })



        // 获取当前时间并向前推7天
        // $(".rlcd").css("display", "block").siblings().css('display', 'none')

        function getDayOfWeek(dayValue) {
            var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化
            var today = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            return today[day.getDay()] //day.getDay();根据Date返一个星期中的某一天，其中0为星期日
        }
        var myDate = new Date();
        myDate.toLocaleDateString()
        //  console.log(myDate.toLocaleDateString())
        var myDate = new Date(); //获取今天日期
        var dateArray = [];
        var flag = 1;
        var nth = "";
        for (var i = 0; i < 7; i++) {
            //年月日
            var dateTemp = (myDate.getFullYear()).toString() + "-" + ((myDate.getMonth() + 1).toString() < 10 ? "0" + (myDate.getMonth() + 1).toString() : (myDate.getMonth() + 1).toString()) + "-" + ((myDate.getDate()).toString() < 10 ? "0" + (myDate.getDate()).toString() : (myDate.getDate()).toString());
            dateTemp += "  " + getDayOfWeek(dateTemp);
            dateArray.push(dateTemp);
            myDate.setDate(myDate.getDate() + flag);
            nth += "<li>" + dateTemp + "</li>"
        }
        // return nth;
        $('#gfltul').html("");
        $('#gfltul').html(nth);
        $('#gfltp').text(dateArray[0])
        var a = $('#gfltp').text().substr(0, 10);
        if (a == "") {

        } else {
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                ltg(a);
            }, {
                    stime: a,
                    // endTime: '2017-11-30',
                    type: 1

                })
        }
    },
    _initselTime: function (obj) {
        _function = function (obj) {

            tzrl._onscroll();
            var objj = obj || obj1
            // objj.startTime = objj.startTime
            // objj.endTime = objj.endTime
            // var stime = objj.startTime;
            // var etime = objj.endTime;
            var stime = $("#minPlacementDateStrInput").val()
            var etime = $("#maxPlacementDateStrInput").val()
            
            obj1.startTime = objj.startTime;
            obj1.endTime = objj.endTime;
            
            
        //    console.log(tcsy)
            if(stime.length>0&&etime.length==0){
                var currDate = new Date();
                var startY=currDate.getFullYear();
                var startM=currDate.getMonth()+1;
                var startD=currDate.getDate();
                var mydate=new Date(startY,startM+3,startD);
                var endY=mydate.getFullYear();
                var endM=mydate.getMonth();
                var endD=mydate.getDate();
                endM = (endM < 10) ? ('0' + endM) : endM;
                endD = ( endD< 10) ? ('0' + endD) : endD;
                var tcsy=(endY+"-"+endM+"-"+endD);
                    stime=$("#minPlacementDateStrInput").val()
                    etime=tcsy;
                    var hy;
                    var qy;
                    var fs;
                    var ys;
                    // var ind = 2; 
                    hy = objj.hy;
                    qy = objj.qy;
                    fs = objj.fs;
                    _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                        tzrl.hyd(a);
                        // console.log(a)
                    }, {
                            pageIndex: 1,
                            pageLimit: 20,
                            industry: hy,
                            meetingType: fs,
                            holdCity: qy,
                            stime: stime,
                            etime: etime,
                            type: 3
        
                        })
            }
            if(etime.length>0&&stime.length==0){
                    stime="2010-01-01" 
                    etime=$("#maxPlacementDateStrInput").val()
                    var hy;
            var qy;
            var fs;
            var ys;
            // var ind = 2; 
            hy = objj.hy;
            qy = objj.qy;
            fs = objj.fs;
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                tzrl.hyd(a);
                // console.log(a)
            }, {
                    pageIndex: 1,
                    pageLimit: 20,
                    industry: hy,
                    meetingType: fs,
                    holdCity: qy,
                    stime: stime,
                    etime: etime,
                    type: 3

                })
            }
            if(etime.length>0&&stime.length>0){
                stime=$("#minPlacementDateStrInput").val()
                etime=$("#maxPlacementDateStrInput").val()
                var hy;
            var qy;
            var fs;
            var ys;
            // var ind = 2; 
            hy = objj.hy;
            qy = objj.qy;
            fs = objj.fs;
            _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
                tzrl.hyd(a);
                // console.log(a)
            }, {
                    pageIndex: 1,
                    pageLimit: 20,
                    industry: hy,
                    meetingType: fs,
                    holdCity: qy,
                    stime: stime,
                    etime: etime,
                    type: 3

                })
            }
            // if(stime!==""||stime!==undefined){
            //     stime = $("#minPlacementDateStrInput").val()
            //     etime="2018-03-08"
            // }
            // if(etime!==""||etime!==undefined){
            //     stime ="2011-11-11" 
            //     etime=$("#maxPlacementDateStrInput").val()
            // }
            // var hy;
            // var qy;
            // var fs;
            // var ys;
            // // var ind = 2; 
            // hy = objj.hy;
            // qy = objj.qy;
            // fs = objj.fs;
            // _getdata("/seinvest/investmentCalendar/queryCompfromInvestmentCalendar.do", function (a) {
            //     tzrl.hyd(a);
            //     // console.log(a)
            // }, {
            //         pageIndex: 1,
            //         pageLimit: 20,
            //         industry: hy,
            //         meetingType: fs,
            //         holdCity: qy,
            //         stime: stime,
            //         etime: etime,
            //         type: 3

            //     })
        }

    }


}




// $("#test11").jeDate({
//     trigger: "click",
//     format: "YYYY-MM-DD",
//     multiPane: false,
//     range: " 至 ",
//     okfun: function (obj) {
//         // console.log(obj.val)
//         _function(obj)

//     }
// });


/**
 * 市场概况
 */
var scgk = {
    _data: "",
    init: function () {
        
        
        $(".lishei").removeClass("minW")
        // $("title").text('市场概况')
        $('.rzlb').removeClass("zjkd")
        $(".rzlb").removeClass('rzz')
        $(".rzlb").removeClass("rzw")
        $(".rztitle").show();
        $('#gflaaa').attr('style', 'display: none;');
        $(".biaoTou1 .biaoTou").show();
        $(".scgk").removeAttr("style");
        $(".scgk h2").text("主要指数");
        $(".sjzj").children().attr('style', 'display: none;');

        // $(".lis").removeClass("sss1");
        $(".lis").removeAttr("style")
        
        var ul = $("<ul>")
        ul.append("<li>代码</li>").append("<li>名称</li>").append("<li>指数&nbsp;</li>").append("<li>涨幅&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa fa-long-arrow-down mbjk-icon'></i></li>").append("<li>涨跌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>").append("<li class='scgk-cje'>成交额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>")
        var MaxHeight =$(document).height()-400;
        $(".lishei").height(MaxHeight);
        var iarrow = document.createElement("i");
        iarrow.classList = "fa mbjk-icon";
        $(".biaoTou").off("click")
        $(".biaoTou").on("click", function (e) {
            var evt = e || event;
            var target = evt.target;
            var _text = target.innerText.trim();
            var _sort = 1;
            evt.stopPropagation();
            if (target.tagName === "LI") {

                if (_text === "名称" || _text === "代码") {
                    return;
                }
                if (!target.children.length) {
                    // iarrow.classList.contact(["icon-long-arrow-up"])
                    iarrow.classList.add("fa-long-arrow-up")
                    target.appendChild(iarrow)
                }
                else {
                    var i = target.children[0]
                    if (i.classList.contains("fa-long-arrow-up")) {
                        i.classList.remove("fa-long-arrow-up")
                        i.classList.add("fa-long-arrow-down")
                        _sort = 0
                    }
                    else {
                        i.classList.remove("fa-long-arrow-down")
                        i.classList.add("fa-long-arrow-up")
                        _sort = 1
                    }

                }
                if (_text === "指数") {
                    _data.sort(sort('ZRSP', _sort))
                }
                else if (_text === "涨幅") {
                    _data.sort(sort('ZDF', _sort))
                }
                else if (_text === "涨跌") {
                    _data.sort(sort('ZDE', _sort))
                }
                else if (_text === "成交额") {
                    _data.sort(sort('CJE', _sort))
                }
                $(target).siblings().children().remove()
                scgk.rrerender();
            }
        })
        // var emitsort = function(type,_sort){
        //     _data.sort(sort(type,_sort))
        // }
        var sort = function (type, s) {
            return function (a, b) {
                var value1 = a[type];
                var value2 = b[type];
                if (s)
                    return value1 - value2;
                else
                    return value2 - value1;
            }
        }

        if ($(".bdnr").find(".biaoTou").length) {
            $(".biaoTou").html(ul.html())
        }
       
        // else
        //     $(".bdnr").append("<div class='biaoTou rzli'></div><div  class=\"lis lishei\"></div>")
        this.rerender()
    },
    rerender: function () {
        _getdata("/seinvest/marketSurvey/queryMarketSurvey.do", function (data) {
            if (data) {
                _data = data;
                scgk.rrerender()
            }
        }, { rankType: 1 })
    },
    rrerender: function () {
        var div = $("<div>")
        $.each(_data, function (k, v) {
            if (k === 0) {
                $(".scgk h2").append("<p style='position: absolute;right: 0;top: 10px;'>" + v.tDate + "  15:10</p>")
            }
            var ul = $("<ul>")
            var CJElength = parseInt(v.CJE).toString().length, CJE;
            // if (CJElength > 4)
            //     CJE = util.isSZKong(v.CJE, 1, 10000) + "元";
            // else
            //     CJE = util.isSZKong(v.CJE, 1) + "万元"；

            if (v.CJE > 100000000) {
                je = v.CJE / 100000000
                CJE = util.isSZKong(je, 1) + "亿元";
            }
            if (v.CJE < 100000000) {
                var je = v.CJE / 10000
                CJE = util.isSZKong(je, 1) + "万元";
            }
            var color;
            if (v.ZDF > 0) {
                color = 'Red';
            } else if (v.ZDF < 0) {
                color = 'gern';
            }
            var colors;
            if (v.ZDE > 0) {
                colors = 'Red';
            } else if (v.ZDE < 0) {
                colors = 'gern';
            }
            var sz = util.isSZKong(v.SP, 1);
            ul.append("<li>" + v.stockCode + "</li>").append("<li>" + v.stockName + "</li>").append("<li>" + (sz === "-" ? sz : util.fmtNum3(sz)) + "</li>").append("<li><span class='" + color + "'>" + util.isSZKong(v.ZDF, 1) + "%</span></li>").append("<li><span class='" + colors + "'>" + util.isSZKong(v.ZDE, 1) + "</span></li>").append("<li class='scgk-cje'>" + (CJE == "-" ? "--" : util.fmtNum3(CJE)) + "</li>")

            div.append(ul)
        })
        // $(".lis").removeClass("sss1")
        $(".lis").html(div.html())
    }
}

var mbjk = {
    //点击模板监控的排序类型或者方式
    mbjkPaixu: function () {
        $(".rzlb").on("click", ".mbjk-list", function (e) {
            var type;
            var rankType;
            var evt = e || event;
            evt.stopPropagation();
            var target = evt.target;
            $("#mbj span").each(function (index, item) {
                if ($(this).hasClass("sel")) {
                    type = $(this).attr("data-type");
                }
            });

            $(this).parent().siblings().find(".mbjk-icon").removeClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
            var text = $(this).text();
            if (text == "涨幅") {
                if ($(this).next().hasClass("fa-long-arrow-up")) {
                    $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
                    rankType = 1;
                } else if ($(this).next().hasClass("fa-long-arrow-down")) {
                    $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
                    rankType = 2;
                } else {
                    $(this).next().addClass("fa-long-arrow-down");
                    rankType = 1;
                }
            }
            if (text == "上涨家数") {
                if ($(this).next().hasClass("fa-long-arrow-up")) {
                    $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
                    rankType = 3;
                } else if ($(this).next().hasClass("fa-long-arrow-down")) {
                    $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
                    rankType = 4;
                } else {
                    $(this).next().addClass("fa-long-arrow-down");
                    rankType = 3;
                }
            }
            if (text == "下跌家数") {
                if ($(this).next().hasClass("fa-long-arrow-up")) {
                    $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
                    rankType = 5;
                } else if ($(this).next().hasClass("fa-long-arrow-down")) {
                    $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
                    rankType = 6;
                } else {
                    $(this).next().addClass("fa-long-arrow-down");
                    rankType = 5;
                }
            }
            if (text == "成交额") {
                if ($(this).next().hasClass("fa-long-arrow-up")) {
                    $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
                    rankType = 7;
                } else if ($(this).next().hasClass("fa-long-arrow-down")) {
                    $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
                    rankType = 8;
                } else {
                    $(this).next().addClass("fa-long-arrow-down");
                    rankType = 7;
                }
            }
            mbjk.render(type, rankType);
        })
    },
    init: function () {
        
        $(".lishei").removeClass("minW")
        // $("title").text('板块监控')
        $('.rzlb').removeClass("zjkd")
        $(".rzlb").removeClass('rzz')
        $(".rzlb").removeClass("rzw")
        $(".rzlb").off("click");
        $(".biaoTou").off("click");//shiqi 20171226
        $(".scgk,.rzdxl,.tzrlxl").hide();
        $("#mbj").show();
        $(".biaoTou").show();
        $("#gfl").hide();
        $("#gfltdiv").hide();
        // $(".lis").removeClass("sss1");
        $(".lis").removeAttr("style")
        $(".rztitle").show();
        var list = $("<div class='template-monitoring'><ul><li>序号</li><li>名称</li><li>指数<i class='fa mbjk-icon'></i></li><li><span class='mbjk-zdf on mbjk-list'>涨幅</span><i class='fa fa-long-arrow-down mbjk-icon'></i></li><li><span class='szjs mbjk-list'>上涨家数</span><i class='fa mbjk-icon'></i></li><li><span class='xdjs mbjk-list'>下跌家数</span><i class='fa mbjk-icon'></i></li><li class='scgk-cje mbri mbrii'><span class='mbjk-cje mbjk-list'>成交额</span><i class='fa mbjk-icon'></i></li><div class='clr'></div></ul></div>");
        $(".rzlb .biaoTou").html("").html(list);
        this.mbjkPaixu();
        var MaxHeight =$(document).height()-400;
        $(".lishei").height(MaxHeight);
        //      scgksel(function (type) {
        //          mbjk.init(mbjk.render(type, 1));
        //      })
    },
    render: function (type, rankType) {
        _getdata("/seinvest/plateMonitoring/queryPlateMonitoring.do", function (_data) {
            $(".lis").html("");
            if (_data != null && _data != "" && _data != undefined) {
                $("#mbDate").html(_data[0].tDate);
                var div2 = $("<div class='template-monitoring'></div>");
                $(_data).each(function (index, item) {
                    var ul = $("<ul>");
                    if (item.ZDF != null && item.ZDF != "" && item.ZDF != undefined) {
                        var color;
                        if (item.ZDF > 0) {
                            color = "Red";
                        } else if (item.ZDF < 0) {
                            color = "gern";
                        } else if (item.ZDF = 0) {
                            color = "normal";
                        }
                    }
                    if (item.CJE > 100000000) {
                        je = item.CJE / 100000000
                        jje = util.isSZKong(je, 1) + "亿元";
                    }
                    if (item.CJE < 100000000) {
                        var je = item.CJE / 10000
                        jje = util.isSZKong(je, 1) + "万元";
                    }
                    ul.append("<li class='shuzi'>" + (index + 1) + "</li>").append("<li title='" + util.isStrKong(item.pName) + " '><span class='mbjkTc' data-id='" + item.pCode + "'>" + util.isStrKong(item.pName) + "</span></li>").append("<li class='shuzi'>" + (util.isSZKong(item.ZRSP) == "--" ? "--" : util.fmtNum3(item.ZRSP)) + "</li>").append("<li class='" + color + " shuzi'>" + (util.isSZKong(item.ZDF) == "-" ? "--" : (item.ZDF + "%")) + "</li>").append("<li class='shuzi'>" + util.isSZKong(item.upNum) + "</li>").append("<li class='shuzi'>" + util.isSZKong(item.downNum) + "</li>").append("<li class='shuzi mbri'>" + (jje == "--" ? "--" : util.fmtNum3(jje)) + "</li>").append("<div class='clr'></div>");
                    div2.append(ul);
                })
                $(".lis").html(div2[0].outerHTML)
            } else {
                var ul1 = $("<div class='zwshuj'>暂无数据</div>");
                $(".lis").html(ul1);
            }
        }, {
                type: type,
                rankType: rankType
            })
    }
}

var xgzx = {
    init: function (_callback) {
        
        $(".lishei").addClass("minW")
        // console.log($(".lishei").height())
        // $("title").text('新股中心')
        $('.rzlb').removeClass("zjkd")
        // $('#gfl').css('display','none')
        $(".rzlb").removeClass('rzz')
        $(".rzlb").removeClass("rzw")
        $(".sjzj").children().css("display", "none");
        $(".scgk").css("display", "none");
        $(".biaoTou").html("");
        $(".rztitle").hide();
        $(".lis").html("").css("height", "auto")
        // var div = $("<div class='biaoTou xgzcbt'>")
        // var ul =$("<ul>")
        // var h2 =$("<h2>")
        // var dvv =$("<div class='lis lishei'>")
        // ul.append("<li>公司</li>").append("<li>交易代码</li>").append("<li>申购代码</li>").append("<li>申购上限</li>").append("<li>发行量（万股）</li>").append("<li>发行价（元/股）</li>").append("<li>预计上网发行量（万股）</li>").append("<li>主承销商</li>")
        // $(".bdnr").html("").append(div.html(ul)).append(h2).append(dvv)
        this.rerender();
        
    },
    rerender: function () {
        _getdata("/seinvest/sharesCenter/querySharesCenter.do", function (data) {
            if (data) {
                // $(".xgzzz").html('')
                var divD = $("<div >")
                $.each(data, function (k, v) {
                    var div = $("<div class='menu'>")
                    var h2 = $("<h2>")
                    var dvv = $("<div class='bdnr'>")
                    var div_bt = $("<div class='biaoTou xgzcbt'>")
                    var bt_ul = $("<ul class='sss'>")
                    var div_bd = $("<div class='lis lishei bygd' style='width: 100%;'>")
                    h2.html(v.date + "&nbsp;&nbsp;" + v.dateDay + "&nbsp;&nbsp;(" + v.counts + "家)")
                    bt_ul.append("<li style='width:12%!important'>公司</li>").append("<li>交易代码</li>").append("<li>申购代码</li>").append("<li>申购上限</li>").append("<li>发行量（万股）</li>").append("<li>发行价（元/股）</li>").append("<li style='width:17%!important'>预计上网发行量（万股）</li>").append("<li style='text-align:center'>主承销商</li>")
                    //    div.append(h2).append(dvv.append(div_bt.appen(bt_ul)).append(div_bd.append(bd_ul)))

                    div.append(h2).append(dvv);
                    // div.html(dvv);
                    div_bt.html(bt_ul)
                    dvv.append(div_bt).append(div_bd);
                    // dvv.html(div_bd);


                    var bd_ul = $("<ul class=sss>")
                    div_bd.append(bd_ul);
                    $.each(v.data, function (k1, v1) {
                        //                  	console.log(v1.bidCeiling)
                        bd_ul.html("<li style='width:12%!important'>" + v1.stockName + "</li><li style='width:10%'>" + v1.tCode + "</li><li style='width:10%'>" + v1.pCode + "</li><li style='width:10%'>" + (util.isSZKong(v1.bidCeiling) == "-" ? "--" : util.fmtNum3(util.isSZKong(v1.bidCeiling))) + "</li><li style='width:10%'>" + (v1.issueShareNum == "-" ? "--" : (util.fmtNum3(util.isSZKong(v1.issueShareNum).toFixed(2)))) + "</li><li>" + (v1.piPrice == "-" ? "--" : util.fmtNum3(util.isSZKong(v1.piPrice))) + "</li><li style='width:17%!important'>" + (v1.pioDistribution == "-" ? "--" : util.fmtNum3(util.isSZKong(Number(v1.pioDistribution)).toFixed(2))) + "</li><li style='text-align:center'>" + v1.mainUnderwriter + "</li>")
                        if (k1 === 10) {
                            div_bd.css("height", "200px")
                        }
                    })
                    divD.append(div)

                })
                // $('.lis').html(divD.html())
                $(".biaoTou1 .biaoTou").hide();
                // $(".lis").addClass("sss1").html(divD.html())
                $(".lis").html(divD.html())

            }
        }, {})
    }
}
var rz = {
    _onscroll: function (_callback) {
        var totalheight = 0;//定义一个总的高度变量
        $(".lis").scroll(function () {
            totalheight = parseFloat($(".lis").height()) + parseFloat($(".lis").scrollTop());//浏览器的高度加上滚动条的高度 
            if ($(".lis")[0].scrollHeight <= totalheight) //当文档的高度小于或者等于总的高度的时候，开始动态加载数据
            {
                //加载数据
                _callback()
            }
        });
    }, param: {},
    prom: function (_promise) {
        return new Promise(function (resolve, reject) { _promise(resolve, reject) })
    },
    init: function () {
       
        $(".lishei").removeClass("minW")
        $(".lis").off("scroll")
        $("#maxPlacementDateStrInput").datepicker('option', 'maxDate', '0')
        $("#minPlacementDateStrInput").datepicker('option', 'maxDate', '0')
        // $("title").text('新股中心')
        $("#minPlacementDateStrInput").val("")
        $("#maxPlacementDateStrInput").val("")
        $('.rzlb').removeClass("zjkd")
        $("#dadd").show()
        $("#dadq").hide()
        // var nnt = '<li data-value="1"><a href="javascript:;">定向增发</a></li><li data-value="2"><a href="javascript:;">配股</a></li><li data-value="3"><a href="javascript:;">债券</a></li><li data-value="4"><a href="javascript:;">优先股</a></li><li data-value="5"><a href="javascript:;">其他</a></li>'
        // $("#rzfs").html('').append(nnt)
        $('.ggwb').text('融资方式')
        $(".rzlb").removeClass('rzz')
        // $(".sjzj").css("display", "")
        // $('#gfl').css('display','none')
        $('.list').removeClass('xzkd')
        $(".biaoTou").off("click")
        $(".rztitle").show();
        $(".rzlb").addClass("rzw")
        $(".lis").html("");
        $(".loadingBox").show();
        $(".scgk h2").text("融资列表");
        $(".scgk").removeAttr("style");
        $(".rzdxl").removeAttr("style").siblings().css("display", "none");
        $(".lis").removeAttr("style")
        $(".biaoTou1 .biaoTou").show();
        var ul = $("<ul>");
        // ul.append("<li>股票名称</li>").append("<li>公告日期</li>").append("<li>最新进度</li>").append("<li>筹集资金</li>")
        ul.append("<li>股票代码</li>").append("<li>股票名称</li>").append("<li>公告日期</li>").append("<li>筹集资金</li>")
        $(".biaoTou").html(ul.html())
        var MaxHeight =$(document).height()-400;
        $(".lishei").height(MaxHeight);
        rz.prom(this._initselTime)
        rz.param = {}
        $(".hyp").text("行业")
        $(".qyp").text("区域")
        $(".qqyb").text("融资方式")
        Promise.all([rz.prom(function (resolve, reject) {
            _getdata("/seinvest/common/findIndustry.do", function (data) {
                if (data) {
                    var div = $("<div>");
                    div.append("<li data-value=''><a href=\"javascript:;\">全部</a></li>");
                    $.each(data, function (k, v) {
                        // div.append("<option value=" + v.categoryId + ">" + v.categoryName + "</option>")
                        var categoryName = v.categoryName;
                        if (categoryName.length > 10)
                            categoryName = categoryName.substr(0, 10) + "..."
                        div.append("<li data-value=" + v.categoryId + " title=" + v.categoryName + "><a href=\"javascript:;\">" + categoryName + "</a> </li>")
                    })
                    $("#hy").html(div.html())
                    resolve(1)
                }

            }, {}, 1)
        }).catch(function (errmsg) {
            reject(errmsg)
        })
            , rz.prom(function (resolve, reject) {
                _getdata("/betaStock/common/findWorkBookByPid.do", function (data) {
                    if (data) {
                        var div = $("<div>");
                        div.append("<li data-value=''><a href=\"javascript:;\">全部</a></li>");
                        $.each(data, function (k, v) {
                            // div.append("<option value=" + v.id + ">" + v.nameCn + "</option>")
                            div.append("<li data-value=" + v.id + "><a href=\"javascript:;\">" + v.nameCn + "</a> </li>")
                        })
                        $("#qy").html(div.html())
                        resolve(1)
                    }
                }, {
                        dataType: 1,
                        type: 1,
                        parentId: 0
                    }, 1)
            }).catch(function (errmsg) {
                reject(errmsg)
            }), rz.prom(function (resolve, reject) {
                rz.rerender(resolve, reject);
            })]).then(function (data) {
                // if (data[0] && data[1]) {
                $(".loadingBox").hide();
                // }
            })


        $(document).on("click", function () {
            $(".selectBox ul").slideUp();
        });
        $(".selectBox").off("click")
        $(".selectBox").on("click", function (e) {
            var evt = e || event;
            var target = evt.target;
            var te = target.innerText
            //console.log(te)
            // while (target.tagName !== "LI")
            //     target = target.parentElement;
            if (target.tagName === "A")
                target = target.parentElement;
            if (target.tagName === "LI") {
                var p = $(target).parent().parent().find("p");
                var vl = target.getAttribute("data-value");
                $(".selectBox ul").hide();
                $(".searching").hide();
                $(".jiabeijing").hide();
                evt.stopPropagation()
                p.text(te)
                var whi = target.parentElement;
                var id = whi.getAttribute("id")
                if (id === "qy")
                    rz.param.stateId = vl
                else if (id === "hy")
                    rz.param.industryLtId = vl
                else if (id === "rzfs")
                    rz.param.rzType = vl

                rz.prom(function (resolve, reject) {
                    rz.rerender(resolve, reject);
                }).then(function (data) {
                    $(".loadingBox").hide();
                }).catch(function (errmsg) {
                    // var ul1 = $("<div class='zwshuj'>暂无数据</div>");
                    $(".lis").html("<div class='zwshuj'>暂无数据</div>");
                    $(".loadingBox").hide();
                })
            }


            // findEnterpriseData(1, 20);
        });

        // this.rerender();        // var div = $("<div>")
        // div.append("<div class=\"jeinpbox\"><input type=\"text\" class=\"jeinput\" id=\"test11\" placeholder=\"YYYY-MM-DD\"></div>")

    },
    rerender: function (resolve, reject) {
        _getdata("/seinvest/finance/findRZData.do", function (data) {
            if (data) {
                rz._data = data;
                $(".lis").html("")
                rz._listindex = 0;
                // $.each(data, function (k, v) {
                //     var ul = $("<ul>")
                //     ul.append("<li>" + v.stockName + "</li>").append("<li>" + v.noticeDate + "</li>").append("<li>" + v.newProgress + "</li>").append("<li>" + util.isSZKong(v.raiseMoney, 1) + "</li>")
                //     div.append(ul)
                // })
                // $(".lis").html(div.html())

                //var div = $("<div>");
                //$.each(data, function (k, v) {
                //    var ul = $("<ul>")
                //    ul.append("<li>" + v.stockName + "</li>").append("<li>" + v.noticeDate + "</li>").append("<li>" + v.newProgress + "</li>").append("<li>" + util.isSZKong(v.raiseMoney, 1) + "</li>")
                //    div.append(ul)
                //})
                //$(".lis").html(div.html())
                // if (rz._data.data.length)
                //     resolve(1)
                // else
                rz._onscroll(rz._datapage)
                rz._datapage()
                resolve(rz._data)
            }
            else
                reject(0)
        }, rz.param, 1)

    },
    _datapage: function () {
        // $.each(data, function (k, v) {
        if (!rz._data) {
            return;
        }
        var div = $("<div>");

        var _range = rz._listindex + 20;

        for (var i = rz._listindex + 1; i < _range; i++) {
            var d = rz._data.data[i]
            if (!d) {
                $(".lis").append(div.html())
                rz._data = []
                return false;
            }
            var ul = $("<ul>")
            ul.append("<li>" + d.stockCode + "</li>")
            var je = 0;
            if (d.raiseMoney > 100000000) {
                je = ((d.raiseMoney) / 100000000)
                // if (d.newProgress == null) {
                // ul.append("<li>" + d.stockName + "</li>").append("<li>" + d.noticeDate + "</li>").append("<li>" + util.isSZKong(je, 1) + "亿元</li>")
                // } else {
                // ul.append("<li>" + d.stockName + "</li>").append("<li>" + d.noticeDate + "</li>").append("<li>" + d.newProgress + "</li>").append("<li>" + util.isSZKong(je, 1) + "亿元</li>")
                // }

            } else {
                je = ((d.raiseMoney) / 10000)
                // if (d.newProgress == null) {

                // } else {
                // ul.append("<li>" + d.stockName + "</li>").append("<li>" + d.noticeDate + "</li>").append("<li>" + d.newProgress + "</li>").append("<li>" + util.isSZKong(je, 1) + "亿元</li>")
                // }
            }
            ul.append("<li>" + d.stockName + "</li>").append("<li>" + d.noticeDate + "</li>").append("<li>" + util.isSZKong(je, 1) + "亿元</li>")
            div.append(ul)
            rz._listindex = i;
        }

        // })
        $(".lis").append(div.html())
    },
    _initselTime: function (obj) {
        _function = function (obj) {
            rz._listindex = 0
            rz._data = {}
            // var _date = obj.date;
            // var startTime = _date[0].YYYY + "-" + _date[0].MM + "-" + _date[0].DD
            // var endTime = _date[1].YYYY + "-" + _date[1].MM + "-" + _date[1].DD
            rz.param.startTime = obj.startTime;
            rz.param.endTime = obj.endTime;
            // rz.rerender();
            rz.prom(function (resolve, reject) {
                rz.rerender(resolve, reject);
            }).then(function (data) {

                if (!data.data.length)
                    $(".lis").html("<div class='zwshuj'>暂无数据</div>");
                $(".loadingBox").hide();
            }).catch(function (data) {
                $(".lis").html("<div class='zwshuj'>暂无数据</div>");
                $(".loadingBox").hide();
            })
        }
    }

}
var switchmenu = function (m) {
    var title = document.title.substr(0, document.title.indexOf("-") + 3);
    document.title = title + "-" + m
    if (m === "市场概况") {

        scgk.init();
        $(".rztitle").show()
        $(".lis").off("scroll")
    }
    else if (m === "板块监控") {
        $("#mbj").find("span").removeClass("sel");
        $("#mbj").find("span").eq(0).addClass("sel");
        mbjk.init(mbjk.render(1, 1));
        $(".rztitle").show()
        $(".lis").off("scroll")
    }
    else if (m === "新股中心") {
        xgzx.init();
        $(".rztitle").hide()
        $(".lis").off("scroll")
    }
    else if (m === "投资日历") {
        tzrl.init();
        $(".rztitle").show()
        $(".lis").off("scroll")
        // hqdqsj();
    }
    else if (m === "融资") {
        rz.init();
        $(".rztitle").show()
    }
}
// 投资日历tab切换 12/26 6.32
var scgksel = function (e) {
    $("#gfl").on("click", "span", function () {
        $(this).addClass("sel").siblings().removeClass("sel");
        var type = $(this).attr("data-type");
        // mbjk.init(mbjk.render(type, 1));
        e(type)
    })
};
var mbjksel = function () {
    $("#mbj").on("click", "span", function () {
        $(this).addClass("sel").siblings().removeClass("sel");
        var type = $(this).attr("data-type");
        mbjk.init(mbjk.render(type, 1));

    })
}();


//点击模板监控的表格中的名称显示的弹窗
var mbjkTc = function () {
    $(".lis").on("click", ".mbjkTc", function () {
        $(".mbtc-biaotou .tc-icon").removeClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
        $(".mbtc-biaotou .zdf").next().addClass("fa-long-arrow-down");
        var type;
        var rankType;
        var dataId = $(this).attr("data-id");
        var name = $(this).text();
        $(".marsk").show();
        $("#templateMonitoring").show();
        $("#mbjkName").html(name);
        $("#mbjkName").attr("data-type", dataId);
        $("#mbj span").each(function (index, item) {
            if ($(this).hasClass("sel")) {
                type = $(this).attr("data-type");
            }
        });
        getDataMBJK(type, 3, dataId);
    })
}()

function getDataMBJK(type, rankType, pCode) {
    _getdata("/seinvest/plateMonitoring/queryCompOfPlate.do", function (_data) {
        $("#templateMonitoring .mtlis").html("");
        if (_data != null && _data != "" && _data != undefined) {
            var div = $("<div class='template-monitoring'></div>");
            $(_data).each(function (index, item) {
                var ul = $("<ul>");
                if (item.hqzf != null && item.hqzf != "" && item.hqzf != undefined) {
                    var color;
                    if (item.hqzf > 0) {
                        color = "Red";
                    } else if (item.hqzf < 0) {
                        color = "gern";
                    } else if (item.hqzf = 0) {
                        color = "normal";
                    }
                }
                var colors;
                if (item.hqzd >= 0) {
                    colors = "Red";
                } else if (item.hqzd < 0) {
                    colors = "gern";
                }
                if (item.hqcje > 100000000) {
                    je = item.hqcje / 100000000
                    jje = util.isSZKong(je, 1) + "亿元";
                }
                if (item.hqcje < 100000000) {
                    var je = item.hqcje / 10000
                    jje = util.isSZKong(je, 1) + "万元";
                }
                ul.append("<li class='shuzi'>" + util.isStrKong(item.stockCode) + "</li>").append("<li>" + util.isStrKong(item.stockName) + "</li>").append("<li class='shuzi'>" + util.isSZKong(item.hqzs) + "</li>").append("<li class='" + color + " shuzi'>" + util.isSZKong(item.hqzf) + "%</li>").append("<li class='" + colors + " shuzi'>" + util.isSZKong(item.hqzd) + "</li>").append("<li class='shuzi list-rg'>" + (jje == "-" ? "--" : util.fmtNum3(jje)) + "</li>").append("<div class='clr'></div>");
                div.append(ul);
            })
            $("#templateMonitoring .mtlis").html(div[0].outerHTML);
            //           console.log($(".mtzx").height())
            var height = $(".mtzx").height() - 110;

            $("#templateMonitoring .mtlis").css("max-height", height);
        } else {
            var ul1 = $("<div class='zwshuj'>暂无数据</div>");
            $("#templateMonitoring .mtlis").html(ul1);
        }
    }, {
            type: type,
            rankType: rankType,
            pCode: pCode
        })
}

$("#templateMonitoring").on("click", ".mbjk-tc", function (e) {
    var type;
    var rankType;
    var pCode = $("#mbjkName").attr("data-type");
    $("#mbj span").each(function (index, item) {
        if ($(this).hasClass("sel")) {
            type = $(this).attr("data-type");
        }
    });
    var e = e || event;
    e.stopPropagation();
    $(this).parent().siblings().find(".tc-icon").removeClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
    var text = $(this).text();
    if (text == "收盘价") {
        if ($(this).next().hasClass("fa-long-arrow-up")) {
            $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
            rankType = 1;
        } else if ($(this).next().hasClass("fa-long-arrow-down")) {
            $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
            rankType = 2;
        } else {
            $(this).next().addClass("fa-long-arrow-down");
            rankType = 1;
        }
    }
    if (text == "涨幅") {
        if ($(this).next().hasClass("fa-long-arrow-up")) {
            $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
            rankType = 3;
        } else if ($(this).next().hasClass("fa-long-arrow-down")) {
            $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
            rankType = 4;
        } else {
            $(this).next().addClass("fa-long-arrow-down");
            rankType = 3;
        }
    }
    if (text == "涨跌") {
        if ($(this).next().hasClass("fa-long-arrow-up")) {
            $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
            rankType = 5;
        } else if ($(this).next().hasClass("fa-long-arrow-down")) {
            $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
            rankType = 6;
        } else {
            $(this).next().addClass("fa-long-arrow-down");
            rankType = 5;
        }
    }
    if (text == "成交额") {
        if ($(this).next().hasClass("fa-long-arrow-up")) {
            $(this).next().addClass("fa-long-arrow-down").removeClass("fa-long-arrow-up");
            rankType = 7;
        } else if ($(this).next().hasClass("fa-long-arrow-down")) {
            $(this).next().addClass("fa-long-arrow-up").removeClass("fa-long-arrow-down");
            rankType = 8;
        } else {
            $(this).next().addClass("fa-long-arrow-down");
            rankType = 7;
        }
    }
    getDataMBJK(type, rankType, pCode);
})



var marsk = function () {
    $(".marsk").on("click", function () {
        //		alert();
        $(this).hide();
        $(".martable").hide();
    })
    $(".gban").on("click", function () {
        $(".marsk").click();
    })
}()
