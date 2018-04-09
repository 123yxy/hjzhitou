
var stockCode = getUrlParam("stockcode");
var type = getUrlParam("type");
/**
 *加入自选
 */
function wj_searchAdd(){
    $(".wj_searchAdd").click(function(){
        insertOptional();
    });
};

/**
 * 添加自选股
 */
function insertOptional(){
	if(!$(".wj_searchAdd").hasClass("wj_searchCut")){
		var opId = addOptional(stockCode,"");
		$(".wj_searchAdd").attr("data-opId",opId);
	}else{
		deleteOptional($(".wj_searchAdd").attr("data-opId"), stockCode);
	}
	
	$(".wj_searchAdd").toggleClass("wj_searchCut");
    $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
}

/**
 * 查询公司基本信息
 */
function findCompanySurveyGPleft(){
	$.axs("/betaInvest/enterpriseData/findCompanySurvey.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null){
				if(data.retData.opId != null){
					$(".wj_searchAdd").attr("data-opId",data.retData.opId);
					$(".wj_searchAdd").toggleClass("wj_searchCut");
			        $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
				}
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 *查看数据
 */
//function wj_showData(){
//    $(".wj_showData").click(function(){
//        $(".wj_data_mark").show();
//        $(".wj_data_popUP").show();
//    });
//    $(".wj_data_mark").click(function(){
//        $(".wj_data_mark").hide();
//        $(".wj_data_popUP").hide();
//    });
//    $(".wj_popUP_close").click(function(){
//        $(".wj_data_mark").hide();
//        $(".wj_data_popUP").hide();
//    });
//    $(".wj_dataTabs span").click(function(){
//        $(this).addClass("wj_active").siblings().removeClass("wj_active");
//    });
//    $("#wj_export").click(function(){
//        var btn1 = 100;
//        rotateCircle (btn1);
//        $(".wj_exportProgress").css("opacity","1");
//        $(this).css("opacity","0");
//        if(btn1==100){
//            $("#wj_export").css("opacity","1");
//            $(".wj_exportProgress").css("opacity","0");
//            $(".wj_toast").fadeIn();
//            setTimeout(
//                '$(".wj_toast").fadeOut()', 
//                2000 )
//        }
//    })
//}
function rotateCircle (exprotNum) {
    var wj_progress =  document.getElementById("wj_progress");
    var wj_progressText = document.getElementById("wj_progressText");
    var circleLength = Math.floor(2 * Math.PI * wj_progress.getAttribute("r"));
    var val = exprotNum.toFixed(2);
    val = Math.max(0,val);
    val = Math.min(100,val);
    wj_progress.setAttribute("stroke-dasharray","" + circleLength * val / 100 + ",10000");
    wj_progressText.textContent = exprotNum +"%";


}

/**
 *提醒弹层
 */
 function wj_searchWarn() {
    $(".wj_searchMsg").click(function(){
        var searchMsg = '<div class="wj_popUP"><div class="wj_popUP_close"></div><div class="wj_popUP_wrap"><div class="wj_popUP_tit">华阳科技（876171）-股价提醒<span>（<i>*</i> 提示：操作中心-通知，查看提醒）</span></div><div class="wj_currentPrice">当前价：<span>15.65</span></div><ul class="wj_priceList wj_clear"><li><label>买入目标价</label><div class="wj_popUPInput"><input type="text">元</div></li><li><label>卖出目标价</label><div class="wj_popUPInput"><input type="text">元</div></li><li><label>涨跌幅</label><div class="wj_popUPInput"><input type="text">%</div></li></ul><div class="wj_popUP_btn"><a class="wj_btn wj_btnSubmit wj_pop_btnSubmit">确定</a><a class="wj_btn wj_btnCancel wj_pop_btnCancel">取消</a><div class="wj_checkbox"><input type="checkbox" checked>公告提醒</div></div></div></div>'
        wj_popShow(searchMsg);
        $(".wj_pop_btnCancel").on('click',function(){
            wj_popClose()
        });
        $(".wj_mark").on('click',function(){
            wj_popClose()
        });
        $(".wj_popUP_close").on('click',function(){
            wj_popClose()
        });
        $(".wj_pop_btnSubmit").on('click',function(){
            if($(".wj_priceList input").eq(0).val()!="" && $(".wj_priceList input").eq(1).val()!="" && $(".wj_priceList input").eq(2).val()!="" && $(".wj_checkbox input[type='checkbox']").is(":checked")){
                wj_popClose();
                $(".wj_searchMsg").addClass("wj_searchMsg_checked");
            }
        })
    });
};

/**
 *加载更多
 */
 function addMore(addMoreBtn,addMoreMain){
    var countMore = 0;
    addMoreBtn.click(function(){
        addMoreMain.css({height:"645px",overflow:"visible"});
        if(countMore==1){
            window.location.href="http://www.163.com"
        };
        countMore=countMore+1;
    })
 }

function wj_popShow(popUPMain){
    var popUP = '';
    popUP += '<div class="wj_mark"></div>';
    popUP += popUPMain;
    $("body").append(popUP);
}
function wj_popClose(){
    $(".wj_mark").remove();
    $(".wj_popUP").remove();
}

/**
 *tab切换
 */
$(".wj_searchTab_t span").click(function(){
    $(this).addClass("wj_active").siblings().removeClass("wj_active");
    var index = $(this).index();
    $(".wj_searchTab_c > div").css("z-index","2");
    $(".wj_searchTab_c > div").eq(index).css("z-index","3");
    // if($(this).text()=="日线图"){
    //     $(".wj_searchTab_c div").css("z-index","2");
    //     $("#wj_dailyData").css("z-index","3")
    // }else if($(this).text()=="分时图"){
    //     $(".wj_searchTab_c div").css("z-index","2");
    //     $("#wj_fst").css("z-index","3")
    // }else if($(this).text()=="市值"){
    //     $(".wj_searchTab_c div").css("z-index","2");
    //     $("#wj_marketValue").css("z-index","3")
    // };
}) 

/**
 *获取SZDATA数据
 */
// $.ajax({
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
//
//        //日线图
//        function dailyData(){
//            var myChart = echarts.init(document.getElementById('wj_dailyData'));
//            option = {
//                color: ['#3398DB'],
//                tooltip : {
//                    trigger: 'axis',
//                    formatter: function(params) {
//                        return '<div class="shizhi_tips">'+
//                            '<span class="shizhi_time">'+params[0].name+'</span>'+
//                            '<div class="types_one">'+
//                                '<span class="shoupanjia">收盘价（元）</span>'+
//                                '<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                            '<div class="types_two">'+
//                                '<span class="cjl_shuju">成交量（万股）</span>'+
//                                '<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                        '</div>';   
//                    }
//                },
//                legend:{
//                    show:true,
//                    data:['成交量','收盘价']
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
//                        name:'成交量',
//                        type:'bar',
//                        barWidth: '30',
//                        data:cjl
//                    },
//                    {
//                        name:'收盘价',
//                        type: 'line',
//                        symbol:'circle',
//                        itemStyle:{
//                            normal:{
//                                color:"#feb535"
//                            }
//                        },
//                        data:spj
//                    }
//                ]
//            };
//            myChart.setOption(option);
//        };
//        //分时图
//        function fst(){
//            var myChart = echarts.init(document.getElementById('wj_fst'));
//            option = {
//                color: ['#3398DB'],
//                tooltip : {
//                    trigger: 'axis',
//                    formatter: function(params) {
//                        return '<div class="shizhi_tips">'+
//                            '<span class="shizhi_time">'+params[0].name+'</span>'+
//                            '<div class="types_one">'+
//                                '<span class="shoupanjia">成交量</span>'+
//                                '<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'万股</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                            '<div class="types_two">'+
//                                '<span class="cjl_shuju">股价</span>'+
//                                '<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'/股</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                        '</div>';   
//                    }
//                },
//                legend:{
//                    show:true,
//                    data:['成交量','股价']
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
//                        name:'成交量',
//                        type:'bar',
//                        barWidth: '30',
//                        data:cjl
//                    },
//                    {
//                        name:'股价',
//                        type: 'line',
//                        symbol:'circle',
//                        itemStyle:{
//                            normal:{
//                                color:"#feb535"
//                            }
//                        },
//                        data:spj
//                    }
//                ]
//            };
//            myChart.setOption(option);
//        };
//        //市值
//        function marketValue(){
//            var myChart = echarts.init(document.getElementById('wj_marketValue'));
//            option = {
//                color: ['#3398DB'],
//                tooltip : {
//                    trigger: 'axis',
//                    formatter: function(params) {
//                        return '<div class="shizhi_tips">'+
//                            '<span class="shizhi_time">'+params[0].name+'</span>'+
//                            '<div class="types_one">'+
//                                '<span class="shoupanjia">总市值（亿）</span>'+
//                                '<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                            '<div class="types_two">'+
//                                '<span class="cjl_shuju">流通市值（亿）</span>'+
//                                '<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'</span>'+
//                                '<div class="clr"></div>'+
//                            '</div>'+
//                        '</div>';   
//                    }
//                },
//                legend:{
//                    show:true,
//                    data:['总市值','流通市值']
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
//                    },
//                    {
//                        name:'流通市值',
//                        type: 'line',
//                        symbol:'circle',
//                        itemStyle:{
//                            normal:{
//                                color:"#feb535"
//                            }
//                        },
//                        data:spj
//                    }
//                ]
//            };
//            myChart.setOption(option);
//        };
//        dailyData();
//        fst();
//        marketValue();
//    }
//});

$(function(){
	
	if(stockCode != null && stockCode != "" && type != null  && (type == 1 || type == 2 || type == 3)){
		findCompanySurveyGPleft();
	}else{
		$(".wj_companyData").parent().hide();
	}
	
    wj_searchAdd();
    wj_searchWarn();
//    wj_showData();
    addMore($("#wj_relatedBtn"),$("#wj_relatedCom"));
    addMore($("#wj_datadBtn"),$("#wj_dataCom"));
})
