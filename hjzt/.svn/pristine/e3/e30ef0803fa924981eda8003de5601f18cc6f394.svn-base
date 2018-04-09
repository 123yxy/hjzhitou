/*
* @Author: Administrator
* @Date:   2016-11-27 21:52:09
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-27 22:00:28
*/

$(function(){

//做市 涨幅榜 初始化
fingMarketRanking01('做市',0);

//做市涨幅榜分页 初始化
findMarketRankinList01('做市',0);

//涨跌幅 升降序切换
$('#changeType01 a').on('click',function(){
	var type = $(this).attr("data-value");
	if(type==0){
		fingMarketRanking01('做市',0);
		findMarketRankinList01('做市',0);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_101").hide();
		$("#page_001").show();
		$("#upList01").show();
		$("#dealList01").hide();
	}else if(type==1){
		fingMarketRanking01('做市',1);
		findMarketRankinList01('做市',1);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_101").hide();
		$("#page_001").show();
		$("#upList01").show();
		$("#dealList01").hide();
	}else{
		fingMarketRanking01('做市',2);
		findMarketRankinList01('做市',2);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_101").show();
		$("#page_001").hide();
		$("#upList01").hide();
		$("#dealList01").show();
	}
});

$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})

})


//做市排行
function fingMarketRanking01(dealType,type){
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
				fieldRankChart01(result.dataName,result.dataNum,typeName);
			}
			if(type==1){
				var typeName = "涨跌幅";
				fieldRankChart01(result.dataName,result.dataNum,typeName);		
			}
			if(type==2){
				var typeName = "成交额（万元）";
				var dataNum = [];
				$(result.dataNum).each(function(){
					dataNum.push(this/10000);
				})
				fieldRankChart01(result.dataName,dataNum,typeName);
			}
			
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//做市分页
function findMarketRankinList01(dealType,type){
	if(type==2){
		var pageNum=$("#paihang01").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum=="undefined"){
			pageNum=1;
		}
		var pageSize=$("#paihang01").attr("data-pageSize");
		if(pageSize==null || pageSize=="" || pageSize=="undefined"){
			pageSize=10;
		}
	}else{
		var pageNum=$("#marketRankinList01").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum=="undefined"){
			pageNum=1;
		}
		var pageSize=$("#marketRankinList01").attr("data-pageSize");
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
							html+='<td class="shuzi lvse">'+((temp.changeAmount == null || (temp.changeAmount == "" && temp.changeAmount != 0))?"--":(temp.changeAmount).toFixed(2))+'</td>';	
							html+='<td class="shuzi lvse">'+((temp.priceChangeRatio == null || (temp.priceChangeRatio == "" && temp.priceChangeRatio != 0))?"--":(temp.priceChangeRatio).toFixed(2))+'%</td>';
						}
						html+='<td class="shuzi">'+((temp.openPrice == null || (temp.openPrice == "" && temp.openPrice != 0))?"--":temp.openPrice.toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.highPrice == null || (temp.highPrice == "" && temp.highPrice != 0))?"--":temp.highPrice.toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.lowPrice == null || (temp.lowPrice == "" && temp.lowPrice != 0))?"--":temp.lowPrice.toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.tradingVolume == null || (temp.tradingVolume == "" &&temp.tradingVolume != 0))?"--":((temp.tradingVolume)/10000).toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.tradingAmount == null || (temp.tradingAmount == "" && temp.tradingAmount != 0))?"--":((temp.tradingAmount)/10000).toFixed(2))+'</td>';
						html+='<td class="shuzi">'+((temp.priceEarningRatio == null || (temp.priceEarningRatio == "" && temp.priceEarningRatio != 0))?"--":(temp.priceEarningRatio).toFixed(2))+'</td>';
						html+='</tr>';
					}
				}
				if(type==2){
					$("#paihang01").html(html);
					//分页
					if(pageNum==1){
						$('#page_101').pagination({
							total: totalCountResult,
							pageSize: pageSize,
							current: pageNum,
							layout: ['first', 'prev', 'links','next'],
							links:0,
							displayMsg:"",
							showPageList:false,
							onSelectPage: function(pageNumber, size) {
								$("#paihang01").attr("data-pageNum",pageNumber);
								$("#paihang01").attr("data-pageSize",size);
								findMarketRankinList01(dealType,type);
							}
						});
					}
					$('#page_101').show();
					//修改分页文字
					setPageText2('page_101');
				}else{
					$("#marketRankinList01").html(html);
					//分页
					if(pageNum==1){
						$('#page_001').pagination({
							total: totalCountResult,
							pageSize: pageSize,
							current: pageNum,
							layout: ['first', 'prev', 'links','next'],
							links:0,
							displayMsg:"",
							showPageList:false,
							onSelectPage: function(pageNumber, size) {
								$("#marketRankinList01").attr("data-pageNum",pageNumber);
								$("#marketRankinList01").attr("data-pageSize",size);
								findMarketRankinList01(dealType,type);
							}
						});
					}
					$('#page_001').show();
					//修改分页文字
					setPageText2('page_001');
				}
			}else{
				if(type==2){
					var html=getNoDataHtml(4);
					$("#paihang01").html(html);
				}else{
					var html=getNoDataHtml(10);
					$("#marketRankinList01").html(html);
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
function fieldRankChart01(stockName,data,name){
	var datas=data;//[9000,9200,9108,9800,9600,9500];
	/*if(name=="跌幅"){
		datas=data;
	}else{
		var datas=data.sort(function(a,b){
			return b-a;
		});
	}*/
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('stockRank01'));
    var option = {
		legend:{
			show:true,
			data:[name]
		},
        dataZoom: [{
            type: "slider",
            show: true,
            start:0,
            end:100
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
        toolbox: {

	        feature: {
	           
	            saveAsImage: {
								title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								}
	        },
	        top:0,
	        right:'5%'
	    },
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'axis',
			position:'top',	
      	    formatter: function(params) {
			//7月3号王仙玲修改的柱状图的提示框类型start
      	    		if(name=="成交额（万元）"){
      	    			var divHtml='<div class="sanban_tips">'+
	      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
	      	    					'<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">'+name+'</span>'+
	      	    						'<span class="tips_leibie_num fl">'+Number(params[0].value).toFixed(2)+'</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>'+
	      	    				'</div>';
	               	 	return divHtml;
      	    			
      	    		}else{
      	    			var divHtml='<div class="sanban_tips">'+
	      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
	      	    					'<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">'+name+'</span>'+
	      	    						'<span class="tips_leibie_num fl">'+Number(params[0].value).toFixed(2)+'%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>'+
	      	    				'</div>';
	               	 	return divHtml;
      	    		}
	            }
      	    //7月3号王仙玲修改的柱状图的提示框类型end
        },
        xAxis: [{
            type: 'category',
            data: stockName,
            boundaryGap : true,
            triggerEvent:true,
			show : true, 
            axisLabel:{
	            interval:0,
	            clickable:true
	        }
        }],
        yAxis: [{
            type: "value",
            name:name,
            data: [],
            axisLabel: {
				formatter: '{value}'
			}
        }],
        grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
        series: [{
            name: name,
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

