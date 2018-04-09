//模型分析
var showBackModelId=getUrlParam("key");
if(showBackModelId!=null && showBackModelId!="" && showBackModelId!=undefined){
	$.axs("/betaInvest/report/findModelReportById.do",{id:showBackModelId},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null){
				return false;
			}
//			console.log(result);
			var initModelParam={};
			initModelParam.stock=result.modelStockName+"("+result.modelStockCode+")";
			var select=[];
			var suoyoufenleizhibiao=result.modelUrl.split(";");
			for (var i = 0; i < suoyoufenleizhibiao.length; i++) {
				var leibie=suoyoufenleizhibiao[i].split("*")[0];
				var leibieZhibiao=suoyoufenleizhibiao[i].split("*")[1];
				var selectObj={};
				selectObj[leibie]=leibieZhibiao;
				select.push(selectObj);
			}
			initModelParam.select=select;
			initModelParam.modelId=result.id;
			localStorage.setItem("modelParam",JSON.stringify(initModelParam));
		}else{
			errorAlert("",data.retMsg)
		}
	});
}
//{图标主键:指标名称,标名称,图标主键:指标名称}
var modelParam=JSON.parse(localStorage.getItem("modelParam"));
//股票代码
var stock=modelParam.stock;//getUrlParam("stock");
//指标改版，获取到缓存中的指标，修改成原来的数据格式，经行处理
var modelSelect=modelParam.select;
//主键
var key_id=modelParam.modelId;//getUrlParam("key");
//所有指标
var zhibiaoAll="";
$.each(modelSelect,function(index,item){
	$.each(item,function(key,value){
		zhibiaoAll+=key+"*"+value+";";
	});
});
zhibiaoAll=zhibiaoAll.substring(0,zhibiaoAll.length-1);

var stockCode=stock.substring(stock.indexOf("(")+1,stock.indexOf(")"));
var stockName=stock.substring(0,stock.indexOf("("));
var leibie_zhibiao={};

$(function(){
	//获取所有指标名称
	findAllIndicatorNameCn();

	$("#modelTile").text("模型分析-"+stockName);
//	console.log(stockCode+"--"+stockName);
	$("#modelStockShow").text(stock);
	$("#guanliStock").text(stock);
	
	//点击公司名称跳转到公司详情
	$(".model_name").delegate(".company_name","click",function(){
		window.location.href='/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+stockName+''
	})
	
	if(key_id==null || key_id=="" || key_id==undefined){
		key_id=null;
	}else{
		//指标回显
		showBack(key_id);
	}
	//指标
//	var zhibiaoAll=getUrlParam("zhibiao");
	var suoyoufenleizhibiao=zhibiaoAll.split(";");//指标分类
//	console.log(suoyoufenleizhibiao)
	//console.log(suoyoufenleizhibiao)
	//console.log(suoyoufenleizhibiao.split("*"));
	var allZhibiao="";//所有指标
	for (var i = 0; i < suoyoufenleizhibiao.length; i++) {
		var leibie=suoyoufenleizhibiao[i].split("*")[0];
		leibie=leibie.replace('：','');
		allZhibiao+=suoyoufenleizhibiao[i].split("*")[1]+",";
//		console.log(allZhibiao)
		var zhibiao=suoyoufenleizhibiao[i].split("*")[1].split(",");
		for (var j = 0; j < zhibiao.length; j++) {
			leibie_zhibiao_data[zhibiao[j]]=[];
		}
		//图标里面的指标
		leibie_zhibiao["chart_"+(i+1)]=suoyoufenleizhibiao[i].split("*")[1];
		//左边
		var html='<li id="tree_'+(i+1)+'" class="tree-empty"><a href="javascript:void(0);">'+(i+1)+""+leibie+'</a><span class="toggler"></span></li>'
		$("#treeTop").append(html);
		//右边图
//		var chatHtml='';
//		chatHtml+='<div class="title">';
//		chatHtml+='<div class="liuliang" id="title_'+(i+1)+'"><span>'+(i+1)+"."+leibie+'</span>';
//		chatHtml+='<div class="wenhao public_icon"></div>';
//		chatHtml+='</div>';
//		chatHtml+='<div class="clr"></div>';
//		chatHtml+='</div>';
//		chatHtml+='<div class="fenxitu public icon_button" id="chart_'+(i+1)+'">';
//		chatHtml+='</div>'; 
//		chatHtml+='<div class="biaoge">';
//		chatHtml+='<div class="information statistic public icon_button">';
//		chatHtml+='<table>';
//		chatHtml+='<thead>';
//		chatHtml+='<tr>';
//		chatHtml+='<th>分析指标</th>';
//		chatHtml+='</tr>';
//		chatHtml+='</thead>';
//		chatHtml+='<tbody id="tableData_'+(i+1)+'"></tbody>';
//		chatHtml+='</table><span><i></i></span></div>';
//		chatHtml+='</div>';
		//指标意义
		var modelYiyi=$.getExplain(leibie);
		//指标分析提示
		var modeltips=$.getExplainTitle(leibie);
		var chastHtml='';
		chastHtml+='<div class="moxing_baogao">';
		chastHtml+='<div class="title">';
		chastHtml+='<div class="liuliang" id="title_'+(i+1)+'">';
		chastHtml+='<span class="leibieText">'+(i+1)+"."+leibie+'</span>';
		chastHtml+='<div class="wenhao public_icon">';
		chastHtml+='<i></i>';
		//guojianjie 加
		chastHtml+='<div class="explain" style="display: none;">';
		chastHtml+='<div class="top"><img src="/saasBeta/images/llfx.png" alt=""></div>';
		chastHtml+='<div class="explain_content">';
		chastHtml+='<p class="title">'+(i+1)+"."+leibie+'</p>';
		chastHtml+='<div class="mean">';
		chastHtml+='<p class="mean_title">意义:</p>';
		chastHtml+='<p class="mean_content">'+(modelYiyi=="" ? "--" : modelYiyi)+'</p>';
		chastHtml+='</div>';
		chastHtml+='<div class="mean">';
		chastHtml+='<p class="mean_title">分析提示:</p>';
		chastHtml+='<p class="mean_content">'+(modeltips=="" ? "--" : modeltips)+'</p>';
		chastHtml+='</div>';
		chastHtml+='</div>';
		chastHtml+='</div>';
		//guojianjie 加
		chastHtml+='</div>';
		chastHtml+='<div class="clr"></div>';
		chastHtml+='</div>';
		chastHtml+='</div>';
		chastHtml+='<div class="erji_baogao">';
		chastHtml+='<div class="fenxitu public icon_button">';
		chastHtml+='<div class="liuliang erji_titles">';
//		chastHtml+='<div class="liuliang erji_titles"><span>'+(i+1)+"."+(i+1)+leibie+'</span>';
		
//		chastHtml+='<div class="wenhao public_icon">';
//		chastHtml+='<i></i>';
//		chastHtml+='</div>';
		chastHtml+='<div class="clr"></div>';
		chastHtml+='</div>';
		chastHtml+='<div class="tubiao" id="chart_'+(i+1)+'">';
		chastHtml+='</div>';
		chastHtml+='<div class="biaoge">';
		chastHtml+='<div class="information statistic public icon_button">';
		chastHtml+='<table>';
		chastHtml+='<thead>';
		chastHtml+='<tr>';
		chastHtml+='<th>分析指标</th>';
		chastHtml+='</tr>';
		chastHtml+='</thead>';
		chastHtml+='<tbody id="tableData_'+(i+1)+'"></tbody>';
		chastHtml+='</table><span><i></i></span></div>';
		chastHtml+='</div>';
		chastHtml+='</div>';
		chastHtml+='</div>';
		chastHtml+='<div class="clr"></div>';
//		console.log(chastHtml)
		$(".model_anisys").append(chastHtml);
	}
	//把获取到的参数做处理
	
	
	//console.log(chatHtml);
	allZhibiao=allZhibiao.substring(0,allZhibiao.length-1);
//	console.log(allZhibiao);
//	console.log(leibie_zhibiao);
	findFinanceDate(stockCode);
	findFinanceData(stockCode,allZhibiao);
	//console.log(leibie_zhibiao_data);
	//console.log(leibie_zhibiao);
	for(var key in leibie_zhibiao){//变量in对象
		//console.log(leibie_zhibiao)
		table(key);//表格
		chart(key);//画图
	}
	/**
	 * 模型计算调用操作中心的 模型计算
	 */
	$(".mx_jisuan").on("click",function(){
		//指标回显
		showBackZhibiao(key_id);
		//$(".mox_jisuan").click();
		$(".czzx_bg").show();
		$(".mox_tc").show();
	})
	/**
	 * 点击保存按钮
	 */
	$(".mx_baocun").on("click",function(){
		//主键
//		var key_id=getUrlParam("key");
		if(key_id!=null || key_id!="" || key_id!=undefined){
			//指标回显
			showBack(key_id);
		}
		$(".baocun_tc").show();//显示保存弹框
	});
	//弹框里的保存按钮
	$("#addModel").on("click",function(){
		addModelReport(key_id,zhibiaoAll);
	});
	//弹框里的取消按钮
	$("#noAddModel").on("click",function(){
		$(".baocun_tc").hide();
	});
	//弹框里的研究对象
	$("div.data-checkbox").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on")
		}
	});
	//鼠标经过问号显示弹窗
	$(".public_icon i").on("click",function(){
		$(this).parent().find(".explain").show();
		$(".jiabeijing3").show();
	});
	$(".jiabeijing3").on("click",function(){
		$(".explain").hide();
		$(this).hide();
	});
	//鼠标经过指标名称显示问号
	$(".model_right").delegate(".moxing_zhibiao_icon","mouseenter",function(){
		$(this).find(".zhib_wenhao_jieshi").show();
	})
	$(".model_right").delegate(".moxing_zhibiao_icon","mouseleave",function(){
		$(this).find(".zhib_wenhao_jieshi").hide();
	})
//鼠标点击表格指标的问号显示解释弹窗
	$("body").delegate(".zhib_wenhao_jieshi","click",function(e){
		var a = $(this).offset().top;//获取弹层距离顶部的高度
		var height=$(window).scrollTop();
		var docHeight=$(window).height();//获取文档窗口高度
		var secentH=docHeight-a;
		if(secentH<100){
			$(this).parent().parent().find(".explain").css("top","-200px");
		}
		$(this).parent().next().show();
		$(this).parent().parent().parent().siblings().find(".explain").hide();
		$(".jiabeijing3").show();
		e.stopPropagation();
	})
//	$("body").bind("mousedown",function(event){
//		var $target=$(event.target);
//		if(!($target.parents().andSelf().is(".explain"))){
//			if($(".explain").css("display")=="block"){
//				$(".explain").hide();
//			}
//		}
//	})
	//导出按钮
	$(".daochu").on("click",function(){
		//后台生成文件
//		var htmlContent=$("#pdfContent").html();
//		$.axs("/betaInvest/common/htmlToPDF.do",{htmlContent:htmlContent,chartPic:JSON.stringify(chartPic)},false,function(data){
//			
//		});
		//前台导出为图片
		// 将 id 为 content 的 div 渲染成 canvas
	    html2canvas(document.getElementById("pdfContent"), {

	        // 渲染完成时调用，获得 canvas
	        onrendered: function(canvas) {
				//console.log(canvas);
	            // 从 canvas 提取图片数据
	            var imgData = canvas.toDataURL('image/jpeg');

	            var doc = new jsPDF("p", "mm", "a4");
	            //                               |
	            // |—————————————————————————————|                     
	            // A0 841×1189                           
	            // A1 594×841                            
	            // A2 420×594                            
	            // A3 297×420                            
	            // A4 210×297                            
	            // A5 148×210                            
	            // A6 105×148                            
	            // A7 74×105                             
	            // A8 52×74                              
	            // A9 37×52                              
	            // A10 26×37             
	            //     |——|———————————————————————————|
	            //                                 |——|——|
	            //                                 |     |      
	            doc.addImage(imgData, 'JPEG', 0, 0,210,297);

	            doc.save('模型报告.pdf');
	        }
	    });
	});
});
//{指标名称:数据,指标名称:数据}
var leibie_zhibiao_data={};
var dateTime=[];//所有日期
var zhibiaoMingzheng={};//对应的中文名称
var allIndicatorNameCnMap={};//指标名称对应的中文名称

/**
 * 查询财务数据所有时间
 * @param stockCode
 */
function findFinanceDate(stockCode){
	var param={stockCode:"'"+stockCode+"'"}
	$.axs("/betaInvest/report/findModelDate.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null || result.length==0){
				return false;
			}
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				dateTime.push(obj.dateTime);
			}
		}else{
			
		}
	});
}
/**
 * 查询财务数据
 * @Param stockCode 股票代码
 * @Param indicators 指标,多个以逗号分隔
 */
function findFinanceData(stockCode,indicators){
	var param={stockCode:"'"+stockCode+"'",indicators:indicators}
	$.axs("/betaInvest/report/findModelData.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null || result.length==0){
				return false;
			}
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var reportPeriod=obj.reportPeriod;
				if(reportPeriod.indexOf("FY")>-1){
					reportPeriod=reportPeriod.substring(0,4)+"-12-31";
				}else if(reportPeriod.indexOf("HY")>-1){
					reportPeriod=reportPeriod.substring(0,4)+"-06-30";
				}
//				dateTime.push(reportPeriod);
//				console.log(reportPeriod)
				//数据以数据形式存放在leibie_zhibiao_data中{指标名称:数据,指标名称:数据}
				for(var column in obj){
					if(leibie_zhibiao_data[column]!=undefined){
						leibie_zhibiao_data[column].push(obj[column]);
					}
				}
			}
		}else{
			
		}
	});
}
/**
 * 画图下面的表格
 * @param key
 */
function table(key){
//	console.log(key)
	var index=key.substring(key.length-1,key.length);
	//时间
	for(var i=0;i<dateTime.length;i++){
		var th='<th>'+dateTime[i]+'</th>';
		$("#tableData_"+index).prev().find("tr").append(th);//头部
	}
	//第一行标题
	var zhibiaos=leibie_zhibiao[key];
	var zhibiaos1=zhibiaos.split(",");
	for (var i = 0; i < zhibiaos1.length; i++) {
		var nameCnShow=allIndicatorNameCnMap[zhibiaos1[i]];
		var charHtml="<tr id='"+zhibiaos1[i]+"_showValue_"+index+"'  onClick='chart(\""+key+"\",\""+zhibiaos1[i]+"\",\""+index+"\")'><td class='moxing_zhibiao_icon'><b class='moxing_icons'>"+nameCnShow+"";
		charHtml+='<em class="zhib_wenhao_jieshi" style="display: none;"></em></b><div class="explain '+zhibiaos1[i]+'_'+index+'" style="display: none;">';
//		charHtml+='<div class="top"><img src="/saasBeta/images/llfx.png" alt=""></div>';
		charHtml+='<div class="explain_content">';
//		charHtml+='<p class="title">'+(i+1)+"."+nameCnShow+'</p>';
		charHtml+='<div class="mean">';
		charHtml+='<p class="mean_title"><i></i>意义</p>';
		charHtml+='<p class="mean_content mean_content1">--</p>';
		charHtml+='</div>';
		charHtml+='<div class="mean">';
		charHtml+='<p class="mean_title"><i></i>分析提示</p>';
		charHtml+='<p class="mean_content mean_content2">--</p>';
		charHtml+='</div>';
		charHtml+='</div>';
		charHtml+='</div>';
		charHtml+="</td></tr>";
		var oneTd=$("#tableData_"+index).append(charHtml);
		var dd=leibie_zhibiao_data[zhibiaos1[i]];
		for(var j = 0; j < dateTime.length; j++){
			var valueTd=$("#"+zhibiaos1[i]+"_showValue_"+index).append("<td>"+(dd[j]==null?"--":dd[j])+"</td>");
		}
	}
}
//保存时使用
var chartPic=[];
/**
 * 画图
 */
function chart(key,showZB,index){
	//alert(key)
	//series
	//console.log(leibie_zhibiao_data);
	var chartData=[];
	var zhibiaos=leibie_zhibiao[key];
	if(showZB != undefined){
		zhibiaos = showZB;
		var yiyiText=$("#"+showZB+"_showValue_"+index).parents(".moxing_baogao").find("span.leibieText").text();
		var yiyiJQText=yiyiText.substring(yiyiText.indexOf(".")+1)
		var daqianText=$("#"+showZB+"_showValue_"+index+" b").text();
//		指标意义
		var modelYiyi=$.getExplain(yiyiJQText+'.'+daqianText);
//		指标分析提示
		var modelfxts=$.getExplainTitle(yiyiJQText+'.'+daqianText);
		$("#"+showZB+"_showValue_"+index).find(".mean_content1").html(modelYiyi);
		$("#"+showZB+"_showValue_"+index).find(".mean_content2").html(modelfxts);
		//console.log(yiyiJQText+'.'+daqianText)
		//$("."+showZB+"_"+index).show();
		//$(".jiabeijing3").show();
		var classN=showZB+"_"+index;
		explainHasLook(classN);
	}
	
	var zhibiaos1=zhibiaos.split(",");
	for (var i = 0; i < zhibiaos1.length; i++) {
		var serie={};
		//console.log(leibie_zhibiao_data[zhibiaos1[i]])
		var dd=leibie_zhibiao_data[zhibiaos1[i]];
		for(var k = 0; k < dd.length; k++){
			dd[k] = (dd[k] == null ? 0 : dd[k]);
		}
		var inde=$.inArray(null,dd);
//		console.log(inde);
		dd[inde]=0;
		var labe={
			normal:{
				show:true,
				position:'top'
			}
		};
//		console.log(dd);
		serie.name=allIndicatorNameCnMap[zhibiaos1[i]];
		serie.type='line';
		serie.data=dd;
		serie.symbol='circle';
		serie.label=labe;
		if(i==0){
		chartData.push(serie);
		}

	}
	var myChart = echarts.init(document.getElementById(key));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:[''+chartData[0].name+''],
	        top:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	           //data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        	data: dateTime
	        }
	    ],
	    yAxis: {
		        type: 'value'
//		         name:'百分比'
		    },
//		series: [
//		        {
//		            name:'毛利率',//第一种数据种类名字
//		            type:'line',
//		            // barWidth:
//		            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]//第一种数据种类数据
//		           
//		        },
//		         {
//		            name:'净利率',//第一种数据种类名字
//		            type:'line',
//		             data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]//第一种数据种类数据
//		           
//		        }
//		    ],
		series: chartData,
		animation:false
	}
	myChart.setOption(option);
	window.addEventListener("resize",function(){
                     myChart.resize();
                });
	
	var base={};
	base.chart=myChart.getDataURL("png");
	chartPic.push(base);
}
/**
 * 用户保存记录
 * @Param key_id 主键，不为空的时候编辑
 * @Param stockCode 股票代码
 * @Param stockName 股票名称
 * @Param urlParam url带的参数
 */
function addModelReport(key_id,urlParam){
//	var urlParam=location.href;
//	console.log(urlParam);
	var modelTitle=$("#baocunTitle").val();
	modelTitle=$.trim(modelTitle);
	if(modelTitle==null || modelTitle==""){
		errorAlert("","请数据模型标题");
		return false;
	}
	//选择关联股票代码,传入后台
	var paramStockCode="";
	var paramStockName="";
	if($("div.data-checkbox").hasClass("on")){
		paramStockCode=stockCode;
		paramStockName=stockName;
	}
	var dataParam={id:key_id,modelTitle:modelTitle,stockCode:paramStockCode,stockName:paramStockName,modelUrl:urlParam,chartPic:JSON.stringify(chartPic)};
	$.axs("/betaInvest/report/addModelReport.do",dataParam,false,function(data){
		window.location.href="/myResearch/researchReport.html";
//		if(data.retCode=="0000"){
//			
//		}else{
//			
//		}
	});
}

/**
 * 获取所有指标
 */
function findAllIndicatorNameCn(){
	$.axs("/betaInvest/common/findWorkBook.do",{type:6},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length<=0){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				if(obj.dataType<4){
					continue;
				}
				var nameEn=obj.nameEn;
				var nameCn=obj.nameCn;
//				console.log(nameEn+"---"+nameCn);
				allIndicatorNameCnMap[nameEn]=nameCn;
			}
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

/**
 * 获取所有指标
 */
function findAllIndicator2(){
	$.axs("/betaInvest/common/findWorkBook.do",{type:6},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length<=0){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				if(obj.dataType<4){
					continue;
				}
				var dataType=obj.dataType;
				var html='';
				html+='<li data-value="'+obj.nameEn+'" id="mo_'+obj.nameEn+'">';
				html+='<div class="data-checkbox">';
				html+='<input type="checkbox" />';
				html+='<label class="checkbox"></label>';
				html+='<label class="checkboxWord">'+obj.nameCn+'</label>';
				html+='</div>';
				html+='</li>';
				$("#zhibiaoleixing_"+dataType).find("ul").append(html);
				$(".zhibiao_list").show();
				$(".yd_img_icon,.mx_yind,#modelSeachStock").hide();
				$("#toModelHtml").show();
			}
			echoTarget();
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

/**
 * 回显指标
 */
function echoTarget(){
	$("#modelSeachStock").val(stock);
	//指标
//	var zhibiaoAll=getUrlParam("zhibiao");
	
	var suoyoufenleizhibiao=zhibiaoAll.split(";");//指标分类
	
	for (var i = 0; i < suoyoufenleizhibiao.length; i++) {
		findTargetName(suoyoufenleizhibiao[i]);
		var zhibiao=suoyoufenleizhibiao[i].split("*")[1].split(",");
		for (var j = 0; j < zhibiao.length; j++) {
			$("#mo_"+zhibiao[j]).find("label").eq(0).addClass("on");
		}
	}
}
//添加全选还是半选
function findTargetName(targetAll){
	var leibie=targetAll.split("*")[0];
	var type="";
	if(leibie=="偿债能力"){
		type="4";
	}else if(leibie=="营运能力"){
		type="5";
	}else if(leibie=="负债比率"){
		type="6";
	}else if(leibie=="每股指标"){
		type="7";
	}else if(leibie=="盈利能力"){
		type="8";
	}else if(leibie=="资本结构"){
		type="9";
	}else if(leibie=="成长能力"){
		type="10";
	}else if(leibie=="现金流分析"){
		type="11";
	}else if(leibie=="杜邦分析"){
		type="12";
	}else if(leibie=="估值分析"){
		type="13";
	}
	var target1=targetAll.split("*")[1].split(",").length;
	var target2=$("#zhibiaoleixing_"+type).find("ul").find("li").length;
	if(target1==target2){
		$("#zhibiaoleixing_"+type).find("label").eq(0).addClass("on");
	}else{
		$("#zhibiaoleixing_"+type).find("label").eq(0).addClass("danxuan");
	}
}

/**
 * 回显指标--标题名称
 */
function showBack(key){
	$.axs("/betaInvest/report/findModelReportById.do",{id:key},true,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null){
				return false;
			}
			//模型标题 --回显
			$("#baocunTitle").val(result.title);
		}else{
			errorAlert("",data.retMsg)
		}
	});
}
/**
 * 回显指标--指标的选择
 */
function showBackZhibiao(key){
//	var zhibiaoAll=getUrlParam("zhibiao");
//	console.log(zhibiaoAll);
	var suoyoufenleizhibiao=zhibiaoAll.split(";");//指标分类
	$("#modelSeachStock").val(stock);
	$("#modelZhibiao").html('');
	$("#modelZhibiao").attr("key_id",key);
	var html='';
//	console.log(suoyoufenleizhibiao);
	var num=0;
	for (var i = 0; i < suoyoufenleizhibiao.length; i++) {
		var leibie=suoyoufenleizhibiao[i].split("*")[0];
		
//		console.log(leibie);
		var leibieZhibiao=suoyoufenleizhibiao[i].split("*")[1];
//		console.log(leibieZhibiao)
		html+='<div class="zhibiao_zhl">';
		html+='<span class="fl" data-value="'+leibieZhibiao+'">'+leibie+'</span>';
		html+='<div class="fl zhibiao_ges">';
		var zhibiao=leibieZhibiao.split(",");
		for (var j = 0; j < zhibiao.length; j++) {
//			leibie_zhibiao_data[zhibiao[j]]=[];
//			console.log(allIndicatorNameCnMap[zhibiao[j]]);
			html+='<a href="javascript:;" data-value="'+zhibiao[j]+'">'+allIndicatorNameCnMap[zhibiao[j]]+'<i></i></a>';
			//下拉框---指标
			if($("#zhibiaoleixing_4").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_4").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}else if($("#zhibiaoleixing_5").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_5").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}else if($("#zhibiaoleixing_6").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_6").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}else if($("#zhibiaoleixing_7").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_7").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}else if($("#zhibiaoleixing_8").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_8").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}else if($("#zhibiaoleixing_9").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_9").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}else if($("#zhibiaoleixing_10").find("label.checkboxWord").eq(0).text()==leibie){
				$("#zhibiaoleixing_10").find("li").each(function(li,liObj){
					if($(liObj).attr("data-value")==zhibiao[j]){
						$(liObj).find("label.checkbox").addClass("on");
					}
				});
			}
		}
		html+='<div class="clr"></div>';
		html+='</div>';
		html+='<div class="clr"></div>';
		html+='</div>';
		$("#modelZhibiao").html(html);
		$(".zhibiao_list").show();
		$(".yd_img_icon,.mx_yind,#modelSeachStock").hide();
		$("#toModelHtml").show();
		var hei=$(".zhibiao_zhl").height();
//		//console.log(hei)
		$(".zhibiao_zhl>span").css("height",hei);
		
		
		
//		console.log(leibie);
		//下拉框---类别
		if(leibie.indexOf($("#zhibiaoleixing_4").find("label.checkboxWord").eq(0).text())>-1){
//			console.log(zhibiao.length+1);
//			console.log($("#zhibiaoleixing_4").find("label.checkboxWord").length);
			if((zhibiao.length+1)==$("#zhibiaoleixing_4").find("label.checkboxWord").length){
				$("#zhibiaoleixing_4").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_4").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}else if(leibie.indexOf($("#zhibiaoleixing_5").find("label.checkboxWord").eq(0).text())>-1){
			if((zhibiao.length+1)==$("#zhibiaoleixing_5").find("label.checkboxWord").length){
				$("#zhibiaoleixing_5").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_5").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}else if(leibie.indexOf($("#zhibiaoleixing_6").find("label.checkboxWord").eq(0).text())>-1){
			if((zhibiao.length+1)==$("#zhibiaoleixing_6").find("label.checkboxWord").length){
				$("#zhibiaoleixing_6").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_6").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}else if(leibie.indexOf($("#zhibiaoleixing_7").find("label.checkboxWord").eq(0).text())>-1){
			if((zhibiao.length+1)==$("#zhibiaoleixing_7").find("label.checkboxWord").length){
				$("#zhibiaoleixing_7").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_7").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}else if($("#zhibiaoleixing_8").find("label.checkboxWord").eq(0).text()==leibie){
			if((zhibiao.length+1)==$("#zhibiaoleixing_8").find("label.checkboxWord").length){
				$("#zhibiaoleixing_8").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_8").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}else if(leibie.indexOf($("#zhibiaoleixing_9").find("label.checkboxWord").eq(0).text())>-1){
			if((zhibiao.length+1)==$("#zhibiaoleixing_9").find("label.checkboxWord").length){
				$("#zhibiaoleixing_9").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_9").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}else if(leibie.indexOf($("#zhibiaoleixing_10").find("label.checkboxWord").eq(0).text())>-1){
			if((zhibiao.length+1)==$("#zhibiaoleixing_10").find("label.checkboxWord").length){
				$("#zhibiaoleixing_10").find("label.checkbox").eq(0).addClass("on");
			}else{
				$("#zhibiaoleixing_10").find("label.checkbox").eq(0).addClass("danxuan");
			}
			num+=1;
		}
		$("#selectLeibie").text("("+num+"/5)");
		
//		html+='<div class="moxing_zhibiao" id="modelZhibiao">';
//		html+='<div class="zhibiao_zhl">';
//		html+='<span class="fl">比率分析模型:</span>';
//		html+='<div class="fl zhibiao_ges">';
//		html+='<a href="javascript:;" data-id="">变现能力分析<i></i></a>';
//		html+='<a href="javascript:;" data-id="">变现能力分析<i></i></a>';
//		html+='<a href="javascript:;" data-id="">变现能力分析<i></i></a>';
//		html+='<div class="clr"></div>';
//		html+='</div>';
	}
}
//判断弹层距离底部距离太近的时候重置top值
	function explainHasLook(obj){
		var a = $("."+obj).offset().top;//获取弹层距离顶部的高度
		var height=$(window).innerHeight();//浏览器窗口的高度
		var docHeight=$(window).height();//获取文档窗口高度
		var secentH=height-a;
		if(secentH<200){
			$("."+obj).css("top","-200px");
		}
		//判断是否距离底部过近			
	}