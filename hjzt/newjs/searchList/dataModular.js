///**
// *loading
// */
//var logding='<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
//$("#wj_dataCom").prepend(logding);
//$("#wj_dataCom").find(".loadingBox2").hide();
//
///**
// *加载更多
// */
//var countMore = 0;
//$("#wj_datadBtn").click(function(){
////  $("#wj_dataCom").css({height:"645px"});
//    if(countMore==1){
//        $(".search_tab li").eq(1).addClass("on").siblings().removeClass("on");
//        $(".serach_info_box").hide();
//        $(".serach_info_box").eq(8).show();
//        $("#wj_dataCom").css("height","auto");
//        $("body").scrollTop(0)
//    };
//    countMore=countMore+1;
//})
//
///**
// *查看数据
// */
//$(".wj_showData").click(function(){
//    $(".wj_data_mark").show();
//    $(".wj_data_popUP").show();
//    $("body,html").css("overflow","hidden");
//});
//$(".wj_data_mark").click(function(){
//    $(".wj_data_mark").hide();
//    $(".wj_data_popUP").hide();
//     $("body,html").css("overflow","auto");
//});
//$(".wj_popUP_close").click(function(){
//    $(".wj_data_mark").hide();
//    $(".wj_data_popUP").hide();
//    $("body,html").css("overflow","auto");
//});
//$(".wj_dataTabs span").click(function(){
//    $(this).addClass("wj_active").siblings().removeClass("wj_active");
//});
//$("#wj_export").click(function(){
//    var btn1 = 1;
//    rotateCircle (btn1);
//    $(".wj_exportProgress").css("opacity","1");
//    $(this).css("opacity","0");
//    if(btn1==100){
//        $("#wj_export").css("opacity","1");
//        $(".wj_exportProgress").css("opacity","0");
//        $(".wj_toast").fadeIn();
//        setTimeout(
//            '$(".wj_toast").fadeOut()', 
//            2000 )
//    }
//});
//function rotateCircle (exprotNum) {
//    var wj_progress =  document.getElementById("wj_progress");
//    var wj_progressText = document.getElementById("wj_progressText");
//    var circleLength = Math.floor(2 * Math.PI * wj_progress.getAttribute("r"));
//    var val = exprotNum.toFixed(2);
//    val = Math.max(0,val);
//    val = Math.min(100,val);
//    wj_progress.setAttribute("stroke-dasharray","" + circleLength * val / 100 + ",10000");
//    wj_progressText.textContent = exprotNum +"%";
//};
//
///**
// *查看数据图表
// */
//$.ajax({
//    type: "get",
//    async: true,
//    url: "js/wj_SZDATA_json.json",
//    dataType: "json",
//    success:  function(result){
//        var spj = []; //收盘价
//        var cjl = []; //成交量
//        var dateTime = []; //成交量
//        $(result).each(function(){
//            spj.push(this.newPrice == null ? 0 : this.newPrice.toFixed(2));
//            cjl.push(this.tradingVolume == null ? 0 : this.tradingVolume.toFixed(2));
//            dateTime.push(this.dateTime);
//        });
//        //数据
//        function dataEcharts(){
//            var myChart = echarts.init(document.getElementById('wj_dataEcharts'));
//            option = {
//                color: ['#3398DB'],
//                tooltip : {
//                    trigger: 'axis',
//                    formatter: function(params) {
//                        console.log(params)
//                        return '<div class="shizhi_tips">'+
//                            '<span class="shizhi_time">'+params[0].name+'</span>'+
//                            '<div class="types_one">'+
//                                '<span class="shoupanjia">净利润（万元）</span>'+
//                                '<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[0].data != 0) ? "-" : params[0].data)+'</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                        '</div>';   
//                    }
//                },
//                legend:{
//                    show:true,
//                    data:['总市值']
//                },
//                dataZoom:[
//                     {
//                        show: true,
//                        realtime: true,
//                        start: 0,
//                        end: 60
//                    },
//                    {
//                        type: 'inside',
//                        realtime: true,
//                        start:0,
//                        end:60
//                    }
//                    
//                ],
//                grid: {
//                    left: '3%',
//                    right: '4%',
//                    bottom: '3%',
//                    containLabel: true
//                },
//                xAxis : [
//                    {
//                        type : 'category',
//                        data : dateTime,
//                        axisTick: {
//                            alignWithLabel: true
//                        }
//                    }
//                ],
//                yAxis : [
//                    {
//                        type : 'value'
//                    }
//                ],
//                series : [
//                    {
//                        name:'总市值',
//                        type:'line',
//                        symbol:'circle',
//                        itemStyle:{
//                            normal:{
//                                color:"#3398DB"
//                            }
//                        },
//                        data:cjl
//                    }
//                ]
//            };
//            myChart.setOption(option);
//        };
//        dataEcharts();
//    }
//});