/*
* @Author: Administrator
* @Date:   2016-11-27 21:52:09
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-27 22:00:28
*/

$(function(){

//协议 涨幅榜 初始化
//fingMarketRanking('协议',0);

//协议涨幅榜分页 初始化
//findMarketRankinList('协议',0);
$(".newzsxy_box").find(".newzsxy_list").eq(1).hide();
$(".newzsxy_title li").on("click",function(){
			var ind=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			if(ind==0){
				$(".newzsxy_box").find(".newzsxy_list").eq(ind).show();
				$(".newzsxy_box").find(".newzsxy_list").eq(1).hide();	
				$("#changeType01 a").removeClass("on");
				$("#changeType01 a:eq(0)").addClass("on");
				//隐藏做市的成交额显示框
				$("#dealList01").hide();
				//显示做市的显示框
				$("#upList01").show();
				fingMarketRanking01('做市',0);
				findMarketRankinList01('做市',0);
			}else{
				$(".newzsxy_box").find(".newzsxy_list").eq(0).hide();	
				$(".newzsxy_box").find(".newzsxy_list").eq(ind).show();	
				$("#changeType_0a a").removeClass("on");
				$("#changeType_0a a:eq(0)").addClass("on");
				//隐藏协议的成交额显示框
				$("#dealList_0a").hide();
				//显示协议的显示框
				$("#upList_0a").show();
 				fingMarketRanking('协议',0);
				findMarketRankinList('协议',0);
			}
			
		});
//涨跌幅 升降序切换
$('#changeType_0a a').on('click',function(){
	var type = $(this).attr("data-value");
	if(type==0){
		fingMarketRanking('协议',0);
		findMarketRankinList('协议',0);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_1_0a").hide();
		$("#page_0a").show();
		$("#upList_0a").show();
		$("#dealList_0a").hide();
	}else if(type==1){
		fingMarketRanking('协议',1);
		findMarketRankinList('协议',1);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_1_0a").hide();
		$("#page_0a").show();
		$("#upList_0a").show();
		$("#dealList_0a").hide();
	}else{
		fingMarketRanking('协议',2);
		findMarketRankinList('协议',2);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_1_0a").show();
		$("#page_0a").hide();
		$("#upList_0a").hide();
		$("#dealList_0a").show();
	}
});

$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
});
})


//协议排行
function fingMarketRanking(dealType,type){
	
	var param = {dealType:dealType,type:type};
	$.axs("/betaStock/qutation/fingMarketRanking.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			//柱形图
			if(type==0){
				var typeName = "涨跌幅";
				fieldRankChart_0a(result.dataName,result.dataNum,typeName);
			}
			if(type==1){
				var typeName = "涨跌幅";
				fieldRankChart_0a(result.dataName,result.dataNum,typeName);		
			}
			if(type==2){
				var typeName = "成交额（万元）";
				var dataNum = [];
				$(result.dataNum).each(function(){
					dataNum.push(this/10000);
				})
				fieldRankChart_0a(result.dataName,dataNum,typeName);
			}
			
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//协议分页
function findMarketRankinList(dealType,type){
	if(type==2){
		var pageNum=$("#paihang_0a").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum=="undefined"){
			pageNum=1;
		}
		var pageSize=$("#paihang_0a").attr("data-pageSize");
		if(pageSize==null || pageSize=="" || pageSize=="undefined"){
			pageSize=10;
		}
	}else{
		var pageNum=$("#marketRankinList_0a").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum=="undefined"){
			pageNum=1;
		}
		var pageSize=$("#marketRankinList_0a").attr("data-pageSize");
		if(pageSize==null || pageSize=="" || pageSize=="undefined"){
			pageSize=10;
		}
	}
	var paramData={dealType:dealType,type:type,pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/betaStock/qutation/findMarketRankinList.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var pageNumResult=result.pageIndex;
			var pageSizeResult=result.pageLimit;
			var totalCountResult=result.totalCount;
			if(result==null){
				return false;
			}
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					//排行
					if(type==2){
						html+='<tr>';
						html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
						if(temp.priceChangeRatio>=0){
							html+='<td class="shuzi red">'+((temp.newPrice == null || (temp.newPrice == "" && temp.newPrice != 0))?"--":temp.newPrice.toFixed(2))+'</td>';	
							html+='<td class="shuzi red">'+((temp.priceChangeRatio == null || (temp.priceChangeRatio == "" && temp.priceChangeRatio != 0))?"--":(temp.priceChangeRatio).toFixed(2))+'%</td>';
						}else{
							html+='<td class="shuzi red">'+((temp.newPrice == null || (temp.newPrice == "" && temp.newPrice != 0))?"--":temp.newPrice.toFixed(2))+'</td>';	
							html+='<td class="shuzi red">'+((temp.priceChangeRatio == null || (temp.priceChangeRatio == "" && temp.priceChangeRatio != 0))?"--":(temp.priceChangeRatio).toFixed(2))+'%</td>';
						}
						html+='<td class="shuzi">'+((temp.tradingAmount == null || (temp.tradingAmount == "" && temp.tradingAmount != 0))?"--":((temp.tradingAmount)/10000).toFixed(2))+'</td>';
						html+='</tr>';
					}else{
						html+='<tr>';
						html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
						html+='<td class="shuzi">'+((temp.newPrice == null || (temp.newPrice == "" && temp.newPrice != 0))?"--":temp.newPrice.toFixed(2))+'</td>';
						if(temp.priceChangeRatio>=0){
							html+='<td class="shuzi red">'+((temp.changeAmount == null || (temp.changeAmount == "" && temp.changeAmount != 0))?"--":(temp.changeAmount).toFixed(2))+'</td>';	
							html+='<td class="shuzi red">'+((temp.priceChangeRatio == null || (temp.priceChangeRatio == "" && temp.priceChangeRatio != 0))?"--":(temp.priceChangeRatio).toFixed(2))+'%</td>';
						}else{
							html+='<td class="shuzi red">'+((temp.changeAmount == null || (temp.changeAmount == "" && temp.changeAmount != 0))?"--":(temp.changeAmount).toFixed(2))+'</td>';	
							html+='<td class="shuzi red">'+((temp.priceChangeRatio == null || (temp.priceChangeRatio == "" && temp.priceChangeRatio != 0))?"--":(temp.priceChangeRatio).toFixed(2))+'%</td>';
						}
						html+='<td class="shuzi">'+((temp.openPrice == null || (temp.openPrice == "" && temp.openPrice != 0))?"--":temp.openPrice.toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.highPrice == null || (temp.highPrice == "" && temp.highPrice != 0))?"--":temp.highPrice.toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.lowPrice == null || (temp.lowPrice == "" && temp.lowPrice != 0))?"--":temp.lowPrice.toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.tradingVolume == null || (temp.tradingVolume == "" && temp.tradingVolume != 0))?"--":((temp.tradingVolume)/10000).toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.tradingAmount == null || (temp.tradingAmount == "" && temp.tradingAmount != 0))?"--":((temp.tradingAmount)/10000).toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.priceEarningRatio == null || (temp.priceEarningRatio == "" && temp.priceEarningRatio != 0))?"--":(temp.priceEarningRatio).toFixed(2))+'</td>';
						html+='</tr>';
					}
				}
				if(type==2){
					$("#paihang_0a").html(html);
					//分页
					if(pageNum==1){
						$('#page_1_0a').pagination({
							total: totalCountResult,
							pageSize: pageSize,
							current: pageNum,
							layout: ['first', 'prev', 'links','next'],
							links:0,
							displayMsg:"",
							showPageList:false,
							onSelectPage: function(pageNumber, size) {
								$("#paihang_0a").attr("data-pageNum",pageNumber);
								$("#paihang_0a").attr("data-pageSize",size);
								findMarketRankinList(dealType,type);
							}
						});
					}
					$('#page_1_0a').show();
					//修改分页文字
					setPageText2('page_1_0a');
				}else{
					$("#marketRankinList_0a").html(html);
					//分页
					if(pageNum==1){
						$('#page_0a').pagination({
							total: totalCountResult,
							pageSize: pageSize,
							current: pageNum,
							layout: ['first', 'prev', 'links','next'],
							links:0,
							displayMsg:"",
							showPageList:false,
							onSelectPage: function(pageNumber, size) {
								$("#marketRankinList_0a").attr("data-pageNum",pageNumber);
								$("#marketRankinList_0a").attr("data-pageSize",size);
								findMarketRankinList(dealType,type);
							}
						});
					}
					$('#page_0a').show();
					//修改分页文字
					setPageText2('page_0a');
				}
			}else{
				if(type==2){
					var html=getNoDataHtml(4);
					$("#paihang_0a").html(html);
				}else{
					var html=getNoDataHtml(10);
					$("#marketRankinList_0a").html(html);
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//图表展示的配置
/**
 * @param xAixs  X轴-公司名称
 * @param name 
 * @param data  Y轴-公司对应的指标值
 * @param startValue 第一个显示的排名位置
 */
function fieldRankChart_0a(stockName,data,name){
	var datas=data;//[9000,9200,9108,9800,9600,9500];
 	 // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('stockRank_0a'));
    var option = {
        dataZoom: [{
            type: "slider",
            show: true
//          startValue: startValue - 2,
//          endValue: startValue + 2 + 8
            				//startValue + 2 + (Math.ceil(data.length / end))
                            // backgroundColor:"#CFEBF2",
                            // dataBackground:{
                            //     areaStyle:{
                            //          color:"#406ac1"
                            //     }
                            // }
        }],
        grid: {
	        left: '10%',
	        right: '1%',
	        bottom:'30%'
	    },
        yAxis: [{
            type: "value",
            name:name,
            data: []
        }],
        xAxis: [{
            type: 'category',
            data:  stockName,//[2016-01,2016-02,2016-03,2016-04,2016-05,2016-06]
            axisLabel:{
	            interval:0,
	            clickable:true
	        },
			triggerEvent:true
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'axis',
			position:'top',	
      	    formatter: function(params) {
          	    	console.log(params)
        	//7月3号王仙玲修改的柱状图的提示框类型start
  	    		if(name=="成交额（万元）"){
	                var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl">'+name+'</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
               	 	return divHtml;
  	    		}else{
	                var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl">'+name+'</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'%</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
               	 	return divHtml;
			//7月3号王仙玲修改的柱状图的提示框类型end
  	    		}
            }
        },
        toolbox: {
        feature: {
            saveAsImage: {
				title:'保存图片',
	            icon:'image:///saasBeta/images/ave.png'
			}
        },
	        top:0,
	        right:'8%',
	    },
        series: [{
            name: "",
            type: 'bar',
            barWidth:'30',
            data:datas,
            label: {
                normal: {
                    show: true,
                    position: "top",
                    formatter: function(params) {
                        return "第"+(params.dataIndex +1)+"名";
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
                    	  // 检索结果颜色
//                      if(params.dataIndex == itemIndex) {
//                          return "#00C1EF";
//                      } else {
//                          return "#D53A35";
//                      }
                      	return "#62a6f2";
                    }
                },
                emphasis:{
                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    
    myChart.on('click', function (params) {
    	console.log(params);
		if(params.componentType == "xAxis"){
			var pv = params.value;
			if(pv != "" && pv != null){
				var stockName = pv.substring(0, pv.indexOf("("));
				var stockCode = pv.substring(pv.indexOf("(") + 1, pv.indexOf(")"));
				location.href = "/businessDetails/newTBindex.html?stockCode="+stockCode+"&stockName="+stockName;
			}
		}
    });
}



