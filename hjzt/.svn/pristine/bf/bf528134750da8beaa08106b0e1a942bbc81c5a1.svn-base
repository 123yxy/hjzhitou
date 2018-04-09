$(function(){
	//加载行业排名所有数据
	findTradeList();
	//绑定下拉框单击事件
	$("#selectUrl").find("li").on("click",function(){
		window.location.href=$(this).find("a").eq(0).attr("href");
	});
	//刷新图标
	$("#sortChart li").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(this).siblings().prev().find("em").css("color","#fff");
		findTradeSort();
	});
});

/**
 * 查询财务指标排名数据
 */
function findTradeList(){
	$("#zbmcTable").html("");
//	$("#dataTHead").html("");
	$("#dataTbody").html("");
	var codeList=getAllStockCode();
	if(codeList==null || codeList=="" || codeList==undefined){
		return false;
	}
	var paramData={stockCodes:codeList};
	//------findTradeListAddShangshi
	$.axs("/betaInvest/finance/findTradeList.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			//console.log(result)
			var controlShow='';
			var html='';
			var industryHtml="行业类别：";
			var industryTitleHtml="行业类别：";
			for (var int = 0; int < result.length; int++) {
				var trade=result[int];
//				console.log(controlShow);
				if(controlShow.indexOf(trade.stockCode)<=-1){
					controlShow+=trade.stockCode+",";
					var industryName=trade.industryName;
					if(industryName!=null && industryName!="" && industryName!="undefined"){
						industryHtml+=trade.industryName+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
						industryTitleHtml+=trade.industryName+"      ";
					}
//					var stockHtml='';
					var stockCode=trade.stockCode==null?"--":trade.stockCode;
//					stockHtml+='<td id="'+stockCode+'"></td>';
					var name=trade.stockName==null?"--":trade.stockName;
//					stockHtml+='<td><a href="/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+name+'" >'+name+'('+stockCode+')</a></td>';
					var stockHtml='<tr><td id="'+stockCode+'"></td><td><a href="/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+name+'" >'+name+'（<em>'+stockCode+'</em>）</a></td></tr>';
					$("#zbmcTable").append(stockHtml);
					html+='<tr>';
//					var stockCode=trade.stockCode==null?"--":trade.stockCode;
//					html+='<td id="'+stockCode+'"></td>';
//					var name=trade.stockName==null?"--":trade.stockName;
//					html+='<td><a href="/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+name+'" >'+name+'('+stockCode+')</a></td>';
					var earningsPerShare=trade['422']==null?"--":(trade['422']).toFixed(2);
					html+='<td>'+earningsPerShare+'</td>';
					var netAssetValuePerShare=trade['423']==null?"--":(trade['423']).toFixed(2);
					html+='<td>'+netAssetValuePerShare+'</td>';
					var cashFlowPerShare=trade['424']==null?"--":(trade['424']).toFixed(2);
					html+='<td>'+cashFlowPerShare+'</td>';
					var netProfit=trade['425']==null?"--":(trade['425']/100000000.00).toFixed(2);
					html+='<td>'+netProfit+'</td>';
					var businessIncome=trade['426']==null?"--":(trade['426']/100000000.00).toFixed(2);
					html+='<td>'+businessIncome+'</td>';
					var totalAssets=trade['427']==null?"--":(trade['427']/100000000.00).toFixed(2);
					html+='<td>'+totalAssets+'</td>';
					var returnNetAssets=trade['428']==null?"--":(trade['428']).toFixed(2);
					html+='<td>'+returnNetAssets+'</td>';
					var shareholderEquityRatio=trade['429']==null?"--":trade['429'].toFixed(2);
					html+='<td>'+shareholderEquityRatio+'</td>';
					var salesGrossMargin=trade['430']==null?"--":(trade['430']).toFixed(2);
					html+='<td>'+salesGrossMargin+'</td>';
					var totalShareCapital=trade['431']==null?"--":(trade['431']/100000000.00).toFixed(2);
					html+='<td>'+totalShareCapital+'</td>';
					html+='</tr>';
					
					$("#dataTbody").attr("data-time",trade.createTime);
				}
			}
//			$("#tradeListInfo").html(html); 
			$("#dataTbody").html(html);
			$("#industryList").html(industryHtml.substring(0,industryHtml.length-36));
			$("#industryList").attr("title",industryTitleHtml.substring(0,industryTitleHtml.length-6));
			//获取排名信息
			findTradeSort();
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 这个是查询排名信息
 */
function findTradeSort(){
	//股票代码
	var codeList=getAllStockCode();
	//排名字段
	var field="";
	var types='';
	$("#sortChart").find("li").each(function(){
		if($(this).hasClass("on")){
			field="'"+$(this).attr("data-colum")+"'";
			types=$(this).find("a").text();
			return false;
		}
	});
	if(field==""){
		return false;
	}
	var dateTime=$("#dataTbody").attr("data-time");
	if(codeList==null || codeList=="" || codeList==undefined){
		return false;
	}
	dateTime=null;
	var paramData={stockCodes:codeList,financeIndicatorId:field,dateTime:dateTime};
	//------findRankingAddShangshi
	$.axs("/betaInvest/finance/findRanking.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for (var int = 0; int < result.length; int++) {
				var dataObj=result[int];
				if(dataObj==null || dataObj=="null"){
					continue;
				}
				var stockCode=dataObj.stockCode;
				var sortNum=dataObj.sortNum;
				console.log(stockCode+":"+sortNum);
				$("#"+stockCode).text(sortNum);
			}
			//画图
			chart(types);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

function chart(types){
	var type=types;
	var columnIndex=null;
	$("#sortChart").find("li").each(function(index){
		if($(this).hasClass("on")){
			columnIndex=index;
			return false;
		}
	});
	var stockNamesData=new Array();
	var chartData=new Array();
	var shortNumData=new Array();
//	$("#tradeListInfo").find("tr").each(function(){
//		var stockName=$(this).find("td").eq(1).text();
//		stockNamesData.push(stockName);
//		var shortNum=$(this).find("td").eq(0).text();
//		shortNumData.push(shortNum);
//		var columnValue=$(this).find("td").eq(columnIndex+3).text();
//		chartData.push(columnValue);
//	});
	
	$("#zbmcTable").find("tr").each(function(){
		var stockName=$(this).find("td").eq(1).text();
		stockNamesData.push(stockName);
		var shortNum=$(this).find("td").eq(0).text();
		shortNumData.push(shortNum);
	});
	$("#dataTHead").find("tr").each(function(){
		var columnValue=$(this).find("td").eq(columnIndex).text();
		chartData.push(columnValue);
	});
	var seriesData=new Array();
	$("#dataTbody").find("tr").each(function(){
		var columnValue=$(this).find("td").eq(columnIndex).text();
		seriesData.push(columnValue);
	});
	console.log(seriesData);
	// 指标对标
	var myChart01 = echarts.init(document.getElementById('hy_ran_zxt_box'));
	//7月29号修改start
	var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
	    calculable : false,
	    xAxis : [
	        {
	            type : 'category',
	            data : stockNamesData
	        }
	    ],
	    legend: {
	    	show:true,
	    	left:'center',
	        data:[type]
	    },
	    yAxis : [
	        {
//				name : '单位:万元',
	            type : 'value',
	            data: []
	        }
	    ],
	    color:color,
	    tooltip:{
	      	enterable:true,//鼠标可以进入提示信息里面
	      	show:true,
	      	trigger:'axis',
	      	position:'top',
    	    formatter: function(params) {
    	    	var danweiShow="";
        	    //多少列
        	    var column=null;
        	    $("#dataTHead").find("th").each(function(index,item){
        	    	if($(this).text().indexOf(params[0].seriesName)>-1){
        	    		column=index;
        	    		danweiShow=$(this).text().replace(params[0].seriesName,"");
        	    	}
        	    });
        	    //多少行
        	    var row=null;
        	    $("#zbmcTable").find("a").each(function(index,item){
        	    	if($(this).text().indexOf(params[0].name)>-1){
        	    		row=index;
        	    	}
        	    });
//        	    console.log(row+"-"+column);
        	    var showValue=$("#dataTbody").find("tr").eq(row).find("td").eq(column).text();
	    		var divHtml='<div class="sanban_tips">'+
    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
    					'<div class="sb_tips_content">'+
    						'<span class="tips_leibie fl" style="background-color: '+params[0].color+';">'+type+'：</span>'+
    						'<span class="tips_leibie_num fl">'+showValue+""+danweiShow+'</span>'+
    						'<div class="clr"></div>'+
    					'</div>'+
    				'</div>';
           		 return divHtml;
           		
	        }
	      },
	    series : 
	    [
	        {
	            name:type,
	            type:'bar',
	            barWidth:'30',
	            data:seriesData,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top',
                    	formatter: function(params) {
                    		var index=params.dataIndex;
                    		var value=shortNumData[index];
                    		if(value==0){
                    			return "无排名";
                    		}else{
                    			return "第" + (value) + "名";
                    		}
	                    }
	                }
	            }
//	            itemStyle: {
//	                normal: {
//	                    color: function(params) {
//	                        var colorList = [
//	                          '#62a6f2','#55c2f4','#ae90db','#909edb'
//	                        ];
//	                        return colorList[params.dataIndex]
//	                    },
//	                    label: {
//	                        show: true,
//	                        position: 'top',
//	                        formatter: '{b}\n{c}'
//	                    }
//	                }
//	            },

	        }
	    ]
	};
	// 7月29号修改end
	myChart01.setOption(option);
	window.addEventListener("resize", function() {
		myChart01.resize();
	});
}
