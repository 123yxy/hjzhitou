
// (function () {
//     alert(11111)
//     gfltfun()
// })
// 版块监控tab切换
$('#zjhhy').on('click', function () {
    $('#zjh').css('display', 'block').siblings().css('display', 'none');
})
$('#swyjhy').on('click', function () {
    $('#swy').css('display', 'block').siblings().css('display', 'none');
})
$('#swejhy').on('click', function () {
    $('#swe').css('display', 'block').siblings().css('display', 'none');
})
$('#dqbk').on('click', function () {
    $('#dqb').css('display', 'block').siblings().css('display', 'none');
})
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


// 投资日历
// 股份流通
$("#gfltul").on("click", "li", function () {
    $(this).addClass("on").siblings().removeClass("on");
    var reportPeriod = $(this).text();
    $("#gfltp").html(reportPeriod);
    $(this).parent().slideUp();
    AfindProfitData(reportPeriod);
})
$("#gfltp").on("click", function () {
    if ($("#gfltul").css("display") == "block") {
        $("#gfltul").slideUp()
    } else {
        $("#gfltul").slideDown()
    }
})
$(document).on("click", function (e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var target = $("#gfltdiv");
    while (elem != null && elem.id != "gfltdiv") {
        elem = elem.parentElement;
        if (elem == target[0]) {
            return;
        } else {
            $("#gfltul").slideUp();
        }
    }
})
// 业绩报告

$("#yjbgul").on("click", "li", function () {
    $(this).addClass("on").siblings().removeClass("on");
    var reportPeriod = $(this).text();
    $("#yjbgp").html(reportPeriod);
    $(this).parent().slideUp();
    // AfindProfitData(reportPeriod);
})
$("#yjbgp").on("click", function () {
    if ($("#yjbgul").css("display") == "block") {
        $("#yjbgul").slideUp()
    } else {
        $("#yjbgul").slideDown()
    }
})
$(document).on("click", function (e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var target = $("#yjbgdiv");
    while (elem != null && elem.id != "yjbgdiv") {
        elem = elem.parentElement;
        if (elem == target[0]) {
            return;
        } else {
            $("#yjbgul").slideUp();
        }
    }
})



// 流通股份 业绩报告表头
var ltgf = function () {
    return `<ul>
                <li>公司名称</li>
                <li class="degbt">股份流通</li>
            </ul>`}
var hyb = function () {
    return `<ul>
                <li>会议大全</li>
                <li>召开日期</li>
                <li>举办城市</li>
                <li>主办方</li>
                <li>参会人员</li>
                <li>会议类型</li>
                <li>所属行业</li>
                <li>详细介绍</li>
            </ul>`
}

var _getdata = function (url, _callback, param) {
    $.axs(url, param, true, function (_data) {
        if (_data.retCode === "0000") {
            var renderdata = _data.retData;

            _callback(renderdata);
        }
        else
            _callback("");
    })
}

var ltg = function (a) {
    var div = $("<div>");
    $.each(a, function (index, item) {
        var lis = $('<ul>')
        lis.append("<li>" + item.newProgress + "</li><li>" + item.noticeDate + "</li><li>" + item.raiseMoney + "</li><li>" + item.stockName + "</li>")
        div.append(lis)
    })
    $(".lis").html(div.html())
}
var gfltfun = function () {
    _getdata("/seinvest/finance/findRZData.do", function (a) {
        ltg(a);
    }, {
            startTime: '2017-10-1',
            endTime: '2017-11-30',
            rzType: '1',
            industryLtId: 'J',
            stateId: '20'
        })
}

$('#tzrlhtml').on('click', function (e) {
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var _ss = ltgf();
    var _sd = hyb();

    
    if (elem.tagName == 'LI') {
        //股份流通接口数据
        if (elem.innerText == '股份流通') {

            //设置日期，当前日期的前七天
            var myDate = new Date();
            myDate.toLocaleDateString()

            console.log(myDate.toLocaleDateString())
            var myDate = new Date(); //获取今天日期
            myDate.setDate(myDate.getDate() - 6);

            var dateArray = [];
            var dateTemp;
            var flag = 1;
            for (var i = 0; i < 7; i++) {
                dateTemp = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
                dateArray.push(dateTemp);
                myDate.setDate(myDate.getDate() + flag);
                var nth = "";
                nth += "<li>" + dateTemp + "</li>"
                console.log(nth)
                $("#gfltul").append(nth);
            }



            $(_ss).eq(0).text("")
            $(".biaoTou").html($(_ss).html())

            $('#gfltdiv').css('display', 'block');
            $('#hydqxlcd').css('display', 'none');



        }
        //业绩报告接口数据
        if (elem.innerText == '业绩预告') {

            _getdata("/seinvest/finance/findRZData.do", function (a) {
                ltg(a);
            }, {
                    startTime: '2017-10-1',
                    endTime: '2017-11-30',
                    rzType: '1',
                    industryLtId: 'J',
                    stateId: '20'
                })


            $(_ss).eq(0).text("")
            $(".biaoTou").html($(_ss).html())

            $('#gfltdiv').css('display', 'block');
            $('#hydqxlcd').css('display', 'none');

        }


        //会议大全接口数据
        if (elem.innerText == '会议大全') {

            _getdata("/seinvest/finance/findRZData.do", function (a) {
                ltg(a);
            }, {
                    startTime: '2017-10-1',
                    endTime: '2017-11-30',
                    rzType: '1',
                    industryLtId: 'J',
                    stateId: '20'
                })


            $(_sd).eq(0).text("")
            $(".biaoTou").html($(_sd).html())

            $('#gfltdiv').css('display', 'none');
            $('#hydqxlcd').css('display', 'block');
        }

    }

})




$("#test11").jeDate({
    format: "YYYY-MM-DD",
    multiPane: false,
    range: " 至 "
});