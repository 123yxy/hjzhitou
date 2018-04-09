var industryArr = []; //行业数据
$(document).ready(function(){
	
	//查询行业数据
	findCategory(0, 2);
	
	addZhiBiao("")

	$(".change_xlist").hide();
	$(".change_xlist").eq(0).show();
	//	三板统计多选框特效
	$(".library_ul .data-radio ").delegate("label","click", function(e) {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
		} else {
			$(this).addClass("on");
			$(this).siblings("label").addClass("on");
		}
		e.stopPropagation();
	});
//	三板统计选择指标
$(".change_xlist .library_ul").delegate("li","click",function(){
	if($(this).find("label").length!=0){
	}else{
		//	获取指标分类data-value
	var dataValue= $(this).parent().attr("data-value");
//	需要后台查询的分类 比如行业 机构等分类的data-value
	var data_CX_value=$(this).attr("data-value");
//	获取点击当前分类名
	var	tex =(($(this).attr("title") == undefined || $(this).attr("title") == "") ? $(this).text() : $(this).attr("title"));
	var data_value=$(this).attr("data-value");
	$(this).siblings().removeClass("on");
	$(this).addClass("on");
	updateShaixuan(dataValue,tex,  $(this).attr("data-interface"), $(this).attr("data-partype"), $(this).attr("data-param"));
//	此处data_value为0的时候 说明此级为最后一级指标
	if(data_value!=0){
//	加载下级指标或者指标分类
	addZhiBiao(tex,data_CX_value);	
	$(this).parents(".change_xlist").next(".change_xlist").find(".overview,.thumb").css("top",0);
	$(this).parents(".change_xlist").next(".change_xlist").show().nextAll(".change_xlist").hide();;
	}else{
		$(this).parents(".change_xlist").addClass("library_check");
	}
	//	三板统计多选框特效
	$(".library_ul .data-radio ").delegate("label","click", function(e) {
//		所选指标个数
		var onchange=$(this).parents(".library_ul").find("label.radioWord.on").length;
		var datavalue=$(this).parents("ul").attr("data-value");
//		if(onchange>=1){
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
			$(this).parent().parent().removeClass("on");
		} else {
//			errorAlert("","最多选择一个进行排名");
			$(this).addClass("on");
			$(this).siblings("label").addClass("on");
			$(this).parent().parent().addClass("on");
			$(this).parent().parent().siblings("li").removeClass("on")
			$(this).parent().parent().siblings("li").find("label").removeClass("on");
		}
//		}else{
//		if ($(this).hasClass("on")) {
//			$(this).removeClass("on");
//			$(this).siblings("label").removeClass("on");
//			$(this).parent().parent().removeClass("on");
//		} else {
//			$(this).addClass("on");
//			$(this).siblings("label").addClass("on");
//			$(this).parent().parent().addClass("on");
//		}	
//		}
		var tex="";
		var parm = "";
		var word =$(this).parents(".library_ul").find("label.radioWord.on");
		word.each(function(){
			tex+=$(this).parent().parent().attr("title") + "、";
			parm += $(this).parent().attr("data-param") + ",";
		});
		if(tex!=""){
			updateShaixuan(datavalue,tex.substring(0, tex.length - 1), null, "orderColumn", parm.substring(0, parm.length - 1));
		}else{
			$("#chenge_list").find("a").eq(-1).remove();
		}
		e.stopPropagation();	
	});
//	加载仿滚动条
	Website.run();
	}
	
//	加载仿滚动条
	Website.run();
});

	 $(function() {
            $('#filterName01').keyup(function(){
                $('.jq11 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName02').keyup(function(){
                $('.jq22 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName03').keyup(function(){
                $('.jq33 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName04').keyup(function(){
                $('.jq44 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName05').keyup(function(){
                $('.jq55 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
        });
	 
	 /**
	  * 删除选择条件
	  */
	 $(".chenge_list").delegate("i", "click", function(){
		 var i = null;
		 $(this).parent().nextAll().remove();
		 $(this).parent().remove();
		 if($(this).parent().attr("data-value") == "dataOne"){
			 $(".jq11 li").removeClass("on");
			 i = 0;
		 }else if($(this).parent().attr("data-value") == "dataTwo"){
			 $(".jq22 li").removeClass("on");
			 i = 1;
		 }else if($(this).parent().attr("data-value") == "dataThree"){
			 $(".jq33 li").removeClass("on");
			 $(".jq33 .checkbox").removeClass("on");
			 $(".jq33 .radioWord").removeClass("on");
			 i = 2;
		 }
		 
		 $(".change_dblist").children(".change_xlist").each(function(index, item){
			 if(index > i){
				 $(this).hide();
			 }
		 })
	 })
	 
	//生成图表
	 $("#createCharts").click(function(){
		 
		 var interStr = "";
		 var industryId = "";
		 var investorsType = "";
		 var orderColumn = "";
		 $(".chenge_list a").each(function(){
			 if (($(this).attr("data-interface") != "undefined") &&
					 ($(this).attr("data-interface") != undefined) &&
					 ($(this).attr("data-interface") != "") &&
					 ($(this).attr("data-interface") != null) &&
					 ($(this).attr("data-interface") != "null")) {
				 interStr = $(this).attr("data-interface");
			 }
			 
			 if($(this).attr("data-parType") == "industryId"){
				industryId = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "investorsType"){
				 investorsType = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "orderColumn"){
				 orderColumn = $(this).attr("data-param");
			 }
		 })
		 
		 if(orderColumn != ""){
			 
			 var ZBZArr = []; //全部指标集合
			 var CJGXArr = []; //所选层级及指标集合
			 
			 $("#scrollbar"+$("#chenge_list").children("a").length+" .radioWord").each(function(){
				 var json = {"name":$(this).parent().parent().attr("title"), "dataParam":$(this).parent().attr("data-param")};
				 ZBZArr.push(json);
			 })
			 
			 $("#chenge_list").children("a").each(function(){//添加所选层级及指标集合
				 var json = {"name":$(this).text(), "dataInterface":$(this).attr("data-interface"),
						 "dataPartype":$(this).attr("data-partype"), "dataParam":$(this).attr("data-param")};
				 CJGXArr.push(json);
			 })
			 var ZBQJson = {"ZBZ":ZBZArr,"CJGX":CJGXArr};
			 localStorage.setItem("ZBQDATA", encodeURI(JSON.stringify(ZBQJson))); //存入到缓存中(为解决参数过长)
			 
			 location.href = "editChart.html?chartType=3&interStr="+ interStr + "&industryId=" + industryId + "&investorsType=" + investorsType
//				+ "&orderColumn=" + orderColumn + "&ZBQDATA=" + encodeURI(JSON.stringify(ZBQJson));''
				+ "&orderColumn=" + orderColumn;
		 }else{
			 $.zmAlert("请选择指标");
		 }
	 
	 })
});


function updateShaixuan(datavalue,tex, interfaceStr, parTypeStr, paramStr){
	var tex = tex;
	var dataValue=datavalue;
	var fale=true;
//	if($(this).find('label').length == 0){
//
//	}else{
//		tex =$(this).find("label.radioWord").text();
//	}
var aHtml=tex + '<i></i>';
	$(".chenge_list a").each(function(){
		var aDataValue =$(this).attr("data-value");
		if(aDataValue==dataValue){
			fale=false;
			$(this).html(aHtml);
			$(this).attr("data-interface", interfaceStr);
			$(this).attr("data-parType", parTypeStr);
			$(this).attr("data-param", paramStr);
			$(this).nextAll("a").remove();
		}
	})	
	if(fale){
	$("#chenge_list").append('<a data-interface=' + interfaceStr + ' data-parType='+ parTypeStr + ' data-param=' + paramStr
						+ ' href="javascript:;" data-value='+dataValue+'>'+tex+'<i></i></a>');	
	}

}
function addZhiBiao(tex,data_CX_value){
//	一级指标
	var lihtm01='';
//	二级指标
	var lihtm02='';
//	三级指标
	var lihtm03='';
//	四级指标
	var lihtm04='';
if(tex==""){
lihtm01+='<li data-interface="findFinanceRanking" >融资排行</li>';
	lihtm01+='<li data-interface="findInvestRanking" >投资排行</li>';
	lihtm01+='<li data-interface="findBtTradingWas" >交易排行</li>';
//	二级指标
}
if(tex=="融资排行"){
	$(industryArr).each(function(){
		var obj=this;
		var  hy=obj.categoryName;
		if(obj.categoryName.length>11){
			hy=obj.categoryName.substring(0,11)+"...";
		}else{
			hy=obj.categoryName;
		}
		
		lihtm02 += "<li data-parType='industryId' data-param="+obj.categoryId+" title="+obj.categoryName+" data-value='rzphhangye'>"+hy+"</li>";
	})
	$(".jq22").html(lihtm02);
}
if(data_CX_value=="rzphhangye"){
//	三级指标
lihtm03+='<li data-value="0" title=\'按"融资总额（万元)"排名\'><div data-parType="orderColumn" data-param="sumAmount" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"融资总额...</label></div></li>';
lihtm03+='<li data-value="0" title=\'按"融资事件次数"排名\'><div data-parType="orderColumn" data-param="amountTotal" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"融资事件次数"...</label></div></li>';
lihtm03+='<li data-value="0" title=\'按"融资金额环比增长率"排名\'><div data-parType="orderColumn" data-param="AQQGR" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"融资金额环比增...</label></div></li>';
$(".jq33").html(lihtm03);	
}
if(tex=="投资排行"){
	lihtm02+='<li data-parType="investorsType" data-param="2" data-value="tzphtouzi">机构投资者</li>';
	lihtm02+='<li data-parType="investorsType" data-param="0" data-value="tzphtouzi">PE/VC投资者</li>';
	lihtm02+='<li data-parType="investorsType" data-param="1" data-value="tzphtouzi">个人投资者</li>';
	$(".jq22").html(lihtm02);	
}
if(data_CX_value=="tzphtouzi"){
//	三级指标
lihtm03+='<li data-value="0" title=\'按"投资事件总数"排名\'><div data-parType="orderColumn" data-param="investTotal" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"投资事件总数"...</label></div></li>';
lihtm03+='<li data-value="0" title=\'按"投资总金额"排名\'><div data-parType="orderColumn" data-param="investSum" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"投资总金额"排名</label></div></li>';
$(".jq33").html(lihtm03);	
}
if(tex=="交易排行"){
	$(industryArr).each(function(){
		var obj=this;
		var  hy=obj.categoryName;
		if(obj.categoryName.length>11){
			hy=obj.categoryName.substring(0,11)+"...";
		}else{
			hy=obj.categoryName;
		}
		
		lihtm02 += "<li data-parType='industryId' data-param="+obj.categoryId+" title="+obj.categoryName+" data-value='jyphhangye'>"+hy+"</li>";
	})
	$(".jq22").html(lihtm02);
}
if(data_CX_value=="jyphhangye"){
	//	三级指标
	lihtm03+='<li data-value="0" title=\'按"开盘价"排名\'><div data-parType="orderColumn" data-param="opening_price" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"开盘价"排名</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"收盘价"排名\'><div data-parType="orderColumn" data-param="closing_price" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"收盘价"排名</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"最高价"排名\'><div data-parType="orderColumn" data-param="max_price" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"最高价"排名</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"最低价"排名\'><div data-parType="orderColumn" data-param="min_price" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"最低价"排名</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"涨跌额"排名\'><div data-parType="orderColumn" data-param="change_amount" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"涨跌额"排名</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"涨跌幅"排名\'><div data-parType="orderColumn" data-param="price_limit" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"涨跌幅...</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"成交量（万股）"排名\'><div data-parType="orderColumn" data-param="deal_amount" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"成交量...</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"成交额（万元）"排名\'><div data-parType="orderColumn" data-param="deal_sum" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"成交额（万...</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"总股本（万股）"排名\'><div data-parType="orderColumn" data-param="general_capital" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"总股本(万...</label></div></li>';
	lihtm03+='<li data-value="0" title=\'按"总市值（万股）"排名\'><div data-parType="orderColumn" data-param="total_value" class="data-radio"><input type="radio" /><label class="radio"></label><label class="radioWord">按"总市值(万...</label></div></li>';
	$(".jq33").html(lihtm03);	
}
	if(tex==""){
		$(".jq11").html(lihtm01);
		Website.run();
	}
	Website.run();
}

/**
 * 查询所有行业
 */
function findCategory(type,level){
	$.axs("/betaStock/common/findTrade.do", {categorType:type,levelId:level}, false, function(data) {
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			industryArr = result;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
