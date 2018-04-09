//财务数据---检索
$(function(){
	//判断获取的股票代码不空时查询数据
	var findDataStockCode_caiwu=getUrlParam("stockcode");
	if(findDataStockCode_caiwu==null || findDataStockCode_caiwu=="" || findDataStockCode_caiwu==undefined || findDataStockCode_caiwu=="null" || findDataStockCode_caiwu=="undefined"){
		//隐藏财务数据模块的DIV
		$("#content_cwsj").hide();
		blockDiv.content_cwsj=false;
		$("#changeValue").change();
		return false;
	}
	//点击加入对比的时候显示取消对比
	$(".cwsh_mox span").on("click",function(){
//		if($(this).hasClass("on")){
//			$(this).removeClass("on").text("加入对比");
//		}else{
//			$(this).addClass("on").text("取消对比");	
//		}
		addComparisonStockClass_caiwu($(this).parent().attr("data-stockCode"),$(this).parent().attr("data-stockName"));
	});
	//模型分析
	$(".cwsh_mox a").on("click",function(){
//		if($(this).hasClass("on")){
//			$(this).removeClass("on").text("加入对比");
//		}else{
//			$(this).addClass("on").text("取消对比");	
//		}
		$("#modelSeachStock").val($(this).parent().attr("data-stockName")+"("+$(this).parent().attr("data-stockCode")+")");
		$(".czzx_bg").show();
		$(".mox_tc").show();
		$(".mx_yind").hide();
		$(".yd_img_icon").hide();
		$("#toModelHtml").show();
		$(".zhibiao_list").show();
	});
	//查询数据
	findFinanaceDataForSerch(findDataStockCode_caiwu);
});

/**
 * 查询财务数据
 * @param finanaceStockCode 股票代码
 */
function findFinanaceDataForSerch(finanaceStockCode){
	$(".loadingBox2").show();
	$.axs("/betaInvest/searchBusiness/findFinanceData.do",{stockCode:finanaceStockCode},true,function(data){
		if(data.retCode==0000){
//			console.log(data.retData);
			if(data.retData!=null && data.retData.length!=0){
				var resultList=data.retData;
				var showCaiwuTableHtml='';
//				for (var i = 0; i < resultList.length; i++) {
				var result=resultList[0];
				//查询的数据为空
				if(result.stockCode==null || result.stockCode=="null"){
					$("#content_cwsj").hide();
					blockDiv.content_cwsj=false;
					$("#changeValue").change();
					return false;
				}
				//设置跳转财务页面
				$("#caiwushujuTitile").html('<a class="gs_cwxx" href="/businessDetails/financialData.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'">'+result.stockName+'('+result.stockCode+')-财务数据</a>');
				//模型分析 ---加入对比
				$(".cwsh_mox").attr("data-stockCode",result.stockCode);
				$(".cwsh_mox").attr("data-stockName",result.stockName);
				$(".cwsh_mox").find("span").attr("id","duibi_"+result.stockCode+"_caiwu")
				//更新时间
				$(".cwsj_time span").html('更新时间:<em>'+result.dateTime+'</em>');
				//显示图片
				//['营业收入', '净利润', '总资产', '总负债', '股东权益', '现金净流量'],
				var showData=new Array();
				showData.push(result.yingyeshouru);
				showData.push(result.jinglirun);
				showData.push(result.zongzichan);
				showData.push(result.zongfuzhai);
				showData.push(result.gudongquanyi);
				showData.push(result.xianjinjingliuliang);
				//显示图标
				drawFinancialData(result.stockName,showData);
				//显示表格
				$("#showCaiwuStockTable").html('<tr><td><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'">'+result.stockName+'（'+result.stockCode+'）</a></td></tr>');
				showCaiwuTableHtml+='<tr>';
				showCaiwuTableHtml+='<td class="shuzi">'+(result.yingyeshouru==null?"--":result.yingyeshouru)+'</td>';	
				showCaiwuTableHtml+='<td class="shuzi">'+(result.jinglirun==null?"--":result.jinglirun)+'</td>';	
				showCaiwuTableHtml+='<td class="shuzi">'+(result.zongzichan==null?"--":result.zongzichan)+'</td>';	
				showCaiwuTableHtml+='<td class="shuzi">'+(result.zongfuzhai==null?"--":result.zongfuzhai)+'</td>';	
				showCaiwuTableHtml+='<td class="shuzi">'+(result.gudongquanyi==null?"--":result.gudongquanyi)+'</td>';	
				showCaiwuTableHtml+='<td class="shuzi">'+(result.xianjinjingliuliang==null?"--":result.xianjinjingliuliang)+'</td>';
				showCaiwuTableHtml+='</tr>';
				$("#showCaiwuTable").html(showCaiwuTableHtml);
//				}
				blockDiv.content_cwsj=true;
			}else{
//				showCaiwuTableHtml+='<tr>';
//				showCaiwuTableHtml+='<td colspan="6">暂无数据</td>';	
//				showCaiwuTableHtml+='</tr>';
				//隐藏财务数据模块的DIV
				$("#content_cwsj").hide();
				blockDiv.content_cwsj=false;
				$("#changeValue").change();
			}
		}else{
			//隐藏财务数据模块的DIV
			$("#content_cwsj").hide();
			blockDiv.content_cwsj=false;
			$("#changeValue").change();
		}
		$(".loadingBox2").hide();
	});
}



//财务数据的图表
function drawFinancialData(chartShowStockName,showData){
	var mychart=echarts.init(document.getElementById('cWsj'));
	 
	var option={
		color:["#2789df"],
		grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    legend:{
	    	show:true,
	    	data:[chartShowStockName],
	    	top:10
	    },
	    tooltip:{
	    	show:true,
	    	trigger: 'axis',
	    	position:"top",
	    	formatter:function(params){
	    		//console.log(params);
	    		return '<div class="caiwu_tips">'+
							'<h2>'+params[0].seriesName+'</h2>'+
							'<div class="tips_content">'+
							'<span class="tips_zb">'+params[0].name+'</span>'+
							'<span class="shouru_data">'+params[0].data+'</span>'+
							'<div class="clr"></div>'+
							'</div>'+
						'</div>';
	    		
	    	}
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['营业收入', '净利润', '总资产', '总负债', '股东权益', '现金净流量'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	        	name : "单位:万元",
	            type : 'value'
	        }
	    ],
	     series : [
	        {
	            name:chartShowStockName,
	            type:'bar',
	            barMaxWidth:"30px",
	            //data:[10, 52, 200, 334, 390, 220]
	            data:showData
	        }
	    ]
	}
	mychart.setOption(option);
	window.addEventListener("resize",function(){
		mychart.resize();
	})
}


/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass_caiwu(comparisonStockCode,comparisonStockName){
	if($(".cwsh_mox span").text()=="取消对比"){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$(".cwsh_mox span").text("加入对比");
		$(".cwsh_mox span").removeClass("on");
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$(".cwsh_mox span").text("取消对比");
			$(".cwsh_mox span").addClass("on");
		}
	}
}