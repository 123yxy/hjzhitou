var id=getUrlParam("id");
// 创建文本编辑器
var ue = UE.getEditor('editor');
var val='';
var buquangupiaodaima="";
$(function(){
	//编辑页面
	if(id!=null && id!="" && id!="undefined"){
		findReportById();
	}
	//点击保存按钮
	$("#addReport").on("click",function(){
		addReportForUserId();
	});
	//点击重要度下的星星
	$(".xingxing i").on("click",function(){
		var thisIndex=$(this).index();
		$(".xingxing").find("i").each(function(index,item){
			if(index<=thisIndex){
				$(item).addClass("on");
			}else{
				$(item).removeClass("on");
			}
		});
	})
	//点击研究对象显示下拉框
	$("#yjdxAdd").on("click",function(){
		var length=$(".news_object_list").find("span").length;
		if(length>=3){
			errorAlert("","最多添加三个企业");
			return false;
		}
		//标示为新增的
		$(".addyjdx").attr("data-update",-1);
		//隐藏掉添加研究对象默认选中的状态
		$(".yjdx_select").find("label.checkbox").removeClass("on");
		//
//		$(".loadingBox").show();
		$("#searchCompanys").val(""); 
		$(".yjdx_list").show(); 
		$(".charu_lexing").hide();
		$(".chiyou_list").hide();
		$(".tub_tc").show();
		//填写市值--隐藏
		$(".yjsz_input").hide();
	})
	//点击右上角的叉号
	$(".duixiang_top i").on("click",function(){
		$(this).parent().parent().hide();
		$(".tub_tc").hide();
	})
	$(".quxiaoyjdx").on("click",function(){
		$(".yjdx_list").hide();
		$(".tub_tc").hide();
		$(".loadingBox").hide();
		//清空弹框的东西
		$("#searchCompanys").val("");
		$("#thisValue").val("");
		$("#expectValue").val("");
		$(".yjdx_select").find("label").removeClass("on");
	})
	//鼠标经过显示垃圾桶
	$(".yix_gs li").on("mouseenter",function(){
		$(this).find("em").show();
	})
	//点击删除按钮
	$(".yix_gs").delegate("em","click",function(){
		var len=$(".yix_gs li").length-1;
		$(this).parent().remove();
		$(".yanjiu_duixiang span em").text('('+len+')');
	})
	//点击评级
	$(".chiyou p").on("click",function(){
		if($(".chiyou_list").is(":hidden")){
			$(".chiyou_list").slideDown();
			$(".charu_lexing").hide();
			$(".yjdx_list").hide();
		}else{
			$(".chiyou_list").slideUp();
		}	
	})
	$(".chiyou_list li").on("click",function(){
		var val=$(this).find("a").text();
		$(".chiyou p").text(val).addClass("on");
		$(".chiyou_list").slideUp();
	})
	//点击填写市值时显示对应的输入内容
	$(".data-checkbox").on("click",function(){
		if($(this).find("label.checkbox").hasClass("on")){
			$(this).find("label.checkbox").removeClass("on");
			$(".yjsz_input").hide();
		}else{
			$(this).find("label.checkbox").addClass("on");
			$(".yjsz_input").show();
		}
		
	})
	//点击搜索框后面的添加按钮-------上一版本添加的方法
	$(".tianjia").on("click",function(){
		var value=$(this).parent().find("input").val();
		if(value!=val){
//			errorAlert("","请选择企业");
			return false;
		}
		//判断个数
		var length=$(".yix_gs li").length;
		if(length>=3){
			errorAlert("","最多添加三个企业");
			return false;
		}
		//判断是否已经添加过
		var addValue='';
		$(".yix_gs").find("a").each(function(index,item){
			addValue+=$(item).text()+",";
		});
		if(addValue.indexOf(value)>-1){
			errorAlert("",value+"已经添加");
			return false;
		}
		if(value!=""&&value!=null && value!=undefined){
			//北京时代(430003)
			var li='<li><a href="/businessDetails/newTBindex.html?stockName='+value.substring(0,value.indexOf("("))+'&stockCode='+value.substring(value.indexOf("(")+1,value.indexOf(")"))+'">'+value+'</a><em></em><div class="clr"></div></li>'
			$(".yix_gs").append(li);
			var selectLen=length+1;
			$(".yanjiu_duixiang span em").text('('+selectLen+')')
		}
		$("#searchCompanys").val("");
	});
	//添加研究对象
	$(".addyjdx").on("click",function(){
		var yanjiuOBject=$("#searchCompanys").val();
		if(yanjiuOBject!=buquangupiaodaima){
//			errorAlert("","请选择企业");
			return false;
		}
		var thisValue=$("#thisValue").val();
		var expectValue=$("#expectValue").val();
		if(!$(".data-checkbox").find("label.checkbox").hasClass("on")){
			thisValue="";
			expectValue="";
			$("#thisValue").val('');
			$("#expectValue").val('');
		}
		//下标
		var exsitIndex=$(this).attr("data-update");
		//判断是新增还是修改:值为-1的时候新增，其他修改，标示的是下标值
		if(exsitIndex==-1 || exsitIndex=="-1"){
			//判断个数
			var length=$(".news_object_list").find("span").length;
			if(length>=3){
				errorAlert("","最多添加三个企业");
				return false;
			}
			//判断是否已经添加过
			var addValue='';
			$(".news_object_list").find("em").each(function(index,item){
				addValue+=$(item).text()+",";
			});
			if(addValue.indexOf(yanjiuOBject)>-1){
				errorAlert("",yanjiuOBject+"已经添加");
				return false;
			}
			if(yanjiuOBject!="" && yanjiuOBject!=null && yanjiuOBject!=undefined){
				var yanjiuduixiangHtml='';
				yanjiuduixiangHtml+='<span>';
				yanjiuduixiangHtml+='<em data-thisValue="'+thisValue+'" data-expectValue="'+expectValue+'">';
				yanjiuduixiangHtml+=yanjiuOBject;
				yanjiuduixiangHtml+='</em>';
				yanjiuduixiangHtml+='<i data-index="'+length+'"></i>';
				yanjiuduixiangHtml+='<b></b>';
				yanjiuduixiangHtml+='<div class="clr"></div>';
				yanjiuduixiangHtml+='</span>';
				$(".news_object_list").append(yanjiuduixiangHtml);
			}
		}else{
			//判断是否已经添加过
			var addValue='';
			$(".news_object_list").find("em").each(function(index,item){
				if((index+"")!=exsitIndex){
					addValue+=$(item).text()+",";
				}
			});
			if(addValue.indexOf(yanjiuOBject)>-1){
				errorAlert("",yanjiuOBject+"已经添加");
				return false;
			}
			if(yanjiuOBject!="" && yanjiuOBject!=null && yanjiuOBject!=undefined){
				var yanjiuduixiangHtml='';
//				yanjiuduixiangHtml+='<span>';
				yanjiuduixiangHtml+='<em data-thisValue="'+thisValue+'" data-expectValue="'+expectValue+'">';
				yanjiuduixiangHtml+=yanjiuOBject;
				yanjiuduixiangHtml+='</em>';
				yanjiuduixiangHtml+='<i data-index="'+exsitIndex+'"></i>';
				yanjiuduixiangHtml+='<b></b>';
				yanjiuduixiangHtml+='<div class="clr"></div>';
//				yanjiuduixiangHtml+='</span>';
				$(".news_object_list").find("span").eq(exsitIndex).html(yanjiuduixiangHtml);
			}
		}
		//清空弹框的东西
		$("#searchCompanys").val("");
		$("#thisValue").val("");
		$("#expectValue").val("");
		//调用取消按钮隐藏弹框
		$(".quxiaoyjdx").click();
	});
	//已经添加的研究对象-删除按钮
	$("div.news_object_list").delegate("b","click",function(){
		$(this).parent().remove();
	});
	//已经添加的研究对象-编辑按钮
	$("div.news_object_list").delegate("i","click",function(){
		//标示为修改的--新增的为-1
		$(".addyjdx").attr("data-update",$(this).attr("data-index"));
		
//		$(".loadingBox").show();
		$("#searchCompanys").val("");
		$(".yjdx_list").show();
		$(".charu_lexing").hide();
		$(".chiyou_list").hide();
		$(".tub_tc").show();
		//回显信息
		//研究对象
		var yanjiuduixiang=$(this).prev().text();
		buquangupiaodaima=yanjiuduixiang;
		//当前市值
		var thisValue=$(this).prev().attr("data-thisvalue");
		if(thisValue==null || thisValue=="" || thisValue==undefined){
			thisValue="";
		}
		//期望市值
		var expectvalue=$(this).prev().attr("data-expectvalue");
		if(expectvalue==null || expectvalue=="" || expectvalue==undefined){
			expectvalue="";
		}
		$("#searchCompanys").val(yanjiuduixiang);
		$("#thisValue").val(thisValue);
		$("#expectValue").val(expectvalue);
		if(thisValue=="" && expectvalue==""){
			//填写市值--隐藏
			$(".yjsz_input").hide();
			$(".yjdx_select").find("label").removeClass("on");
		}else{
			//填写市值--隐藏
			$(".yjsz_input").show();
			$(".yjdx_select").find("label").addClass("on");
		}
	});
	//点击研究图表
	$(".char_yjtb>span").on("click",function(){
		$(".charu_lexing").show().css("opacity",0);
		findUserCategory();//查询所有分类
		findBtUserStudyChart(null,1);//查询图标图片
		$(".yjdx_list").hide();
		if($(".all_tubiao li").length<=0){
			$(".all_tubiao").hide();
			$(".zwu_shuju").show();
		}else{
			$(".all_tubiao").show();
			$(".zwu_shuju").hide();
		}
		$(".charu_lexing").css("opacity",1);
		$(".tub_tc").show();
		$("body,html").css("overflow","hidden");
	})
	//点击删除符号
	$(".shanchu_icon").on("click",function(){
		$(this).parent().parent().hide();
		$(".tub_tc").hide();
		$("body,html").css("overflow","auto");
	})
	
	$(".tubiao_fenlei p").on("click",function(){
		if($(".all_types").is(":hidden")){
			$(this).next().slideDown();
		}else{
			$(this).next().slideUp();
		}
		
	})
	//研究图标的分类
	$(".all_types").delegate("li","click",function(){
		var value=$(this).find("a").text();
		var dataValue=$(this).attr("data-value");
		$(".all_types").slideUp();
		$(".tubiao_fenlei>p").text(value);
		$(".tubiao_fenlei>p").attr("data-value",dataValue);
		//查询图标信息
		findBtUserStudyChart(dataValue,1);
		$(".zwu_shuju").hide();
		$(".all_tubiao").show();
		if($(".all_tubiao li").length<=0){
			$(".all_tubiao").hide();
			$(".zwu_shuju").show();
		}else{
			$(".all_tubiao").show();
			$(".zwu_shuju").hide();
		}
	})
	
	//点击页面上已选的指标
	$(".fanshi").delegate("i","click",function(){
		var value=$(this).parent().attr("title");
		$(this).parent().remove();
		$(".all_tubiao p").each(function(index,item){
			if($(item).text()==value){
				$(item).parent().parent().removeClass("on");
			}
		})
	})
	//点击显示的图表
	$(".all_tubiao").delegate("li","click",function(){
		var titles=$(this).find("p").text();
		var imageUrl=$(this).find("img").attr("src");
		var a='';
		var len=$(".fanshi a").length;
		if(len<=3){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(".fanshi a").each(function(index,item){
					if($(item).attr("title")==titles){
						$(item).remove();
					}
				})
			}else{
				$(this).addClass("on");
				if(titles.length>6){
					var title=titles.substring(0,6)+"...";
					a='<a href="javascript:;" title="'+titles+'" data-src="'+imageUrl+'">'+title+'<i></i></a>';
				}else{
					a='<a href="javascript:;" title="'+titles+'" data-src="'+imageUrl+'">'+titles+'<i></i></a>';
				}
				$(".fanshi").prepend(a);
			}
		}else{
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(".fanshi a").each(function(index,item){
					if($(item).attr("title")==titles){
						$(item).remove();
					}
				})
			}
		}
	})
	//显示暂无数据
	if($(".all_tubiao li").length<=0){
		$(".all_tubiao").hide();
		$(".zwu_shuju").show();
	}else{
		$(".all_tubiao").show();
		$(".zwu_shuju").hide();
	}
	
	
	//图标研究--加载更多
	$(".btn_more").on("click",function(){
		var pageNum=$(".btn_more").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum==undefined){
			pageNum=0;
		}
		pageNum=Number(pageNum)+1;
		var dataValue=$(".tubiao_fenlei").find("span").attr("data-value");
		findBtUserStudyChart(dataValue,pageNum);
	})
	//图标研究--点击确定按钮
	$(".tubiao_lx span").on("click",function(){
		//$(this).parent().parent().hide();
		$(".fanshi").find("a").each(function(){
			var src=$(this).attr("data-src");
			//插入富文本
			//富文本内容-追加
			ue.execCommand('insertHtml', '<img src="'+src+'" alt=""/>');
//			ue.addListener("ready", function () {
//		        // ue准备好之后才可以使用
//				
////		        ue.setContent(src,true);
//			});
		});
		$(".charu_lexing").hide();
		$(".tub_tc").hide();
		$("body,html").css("overflow","auto");
	})
	//图标研究--点击取消按钮
	$(".tubiao_lx b").on("click",function(){
		$(this).parent().parent().hide();
		$(".tub_tc").hide();
		$("body,html").css("overflow","auto");
	})
	//弹窗里的自动补全
	$("#searchCompanys").keydown(function(e) {
		if(e.keyCode==13){
			
			//回车事件
			if($("#searchCompanys").val() != "") {
				var val = $.trim($("#searchCompanys").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							buquangupiaodaima=flag.name+"("+flag.code+")";
							$("#searchCompanys").val(flag.name+"("+flag.code+")");
//							window.location.href = '/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name;
							//window.location.href = '/businessDetails/newTBindex.html?stockCode=430043&stockName=景睿策划'
							//window.open('/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name);
						}
					});
				}else{
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	//首页顶部搜索
	$("#searchCompanys").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			if(item.value.indexOf(item.code) > -1){
				inpVal = item.code;
			}else{
				inpVal = item.value;
			}
			item.value = item.label;
			val=item.value;
			buquangupiaodaima=item.label;
//			$("#inpVal").attr('placeholder','持股公司简称/股票代码/退出方');
//			findEnterpriseData(1, 20);
//			inpVal = "";
		}
	});
	/**
	 * 
	 */
	$("#importWord").on("click",function(){
		$("#wordFile").click();
	});
})
//
///**
// * 搜索补全信息查询
// * @param request
// * @param response
// * @param type
// */
//function findSearchMsg(request, response) {
//	$.axs("/betaInvest/enterpriseData/findSearchMsg.do", {searchStr:$("#inpVal").val()}, false, function(data){
//		if(data.retCode == 0000) {
//			if(data.retData == null) {
//				return false;
//			}
//			var arr = [];
//			$.each(data.retData, function(i, item) {
//				
//				var obj = {
//					label: item.msg,
//					value: item.msg,
//					name: item.companyForShort,
//					code: item.stockCode
//				}
//				arr.push(obj);
//			});
//			searchList = arr;
//			response(arr.slice(0, 5));
//		} else {
//			errorAlert(data.retCode, data.retMsg);
//		}
//	});
//}

/**
 * 保存研究报告
 */
function addReportForUserId(){
	//标题
	var title=$("#title").val();
	title=$.trim(title);
	if(title==null || title=="" || title=="undefined"){
		errorAlert("","请输入文章标题");
		return false;
	}
	//富文本内容 不带html标签
	var context=ue.getContent();
	context=$.trim(context);
	if(context==null || context=="" || context=="undefined"){
		errorAlert("","请输入文章内容");
		return false;
	}
	//富文本内容 带html标签
	var html=ue.getAllHtml();
	//重要程度
	var importanceValue=$(".xingxing").find("i.on").length;
	if(importanceValue==0){
		errorAlert("","请选择重要程度");
		return false;
	}
	//观望状态
	var holdStatus=$("#holdStatus").text();
	if(holdStatus=="请选择评级"){
		holdStatus=null;
	}
	//当前市值
	var thisValue="";//$("#thisValue").val();
	//期望市值
	var expectValue="";//$("#expectValue").val();
	var researchStockCode="";
	var researchStockName="";
//	$("#researchStock").find("a").each(function(index,item){
//		var stock=$(item).text();
//		researchStockCode+=stock.substring(stock.indexOf("(")+1,stock.indexOf(")"))+",";
//		researchStockName+=stock.substring(0,stock.indexOf("("))+",";
//	});
	$(".news_object_list").find("em").each(function(index,item){
		var stock=$(item).text();
		researchStockCode+=stock.substring(stock.indexOf("(")+1,stock.indexOf(")"))+",";
		researchStockName+=stock.substring(0,stock.indexOf("("))+",";
		var thisValueTmp=$(item).attr("data-thisvalue");
		if(thisValueTmp==null || thisValueTmp=="" || thisValueTmp==undefined){
			thisValueTmp="";
		}
		thisValue+=thisValueTmp+",";
		var expectValueTmp=$(item).attr("data-expectvalue");
		if(expectValueTmp==null || expectValueTmp=="" || expectValueTmp==undefined){
			expectValueTmp="";
		}
		expectValue+=expectValueTmp+",";
	});
	if(researchStockCode!=""){
		researchStockCode=researchStockCode.substring(0,researchStockCode.length-1)
	}
	if(researchStockName!=""){
		researchStockName=researchStockName.substring(0,researchStockName.length-1)
	}
	if(thisValue!=""){
		thisValue=thisValue.substring(0,thisValue.length-1)
	}
	if(expectValue!=""){
		expectValue=expectValue.substring(0,expectValue.length-1)
	}
	if(id==null || id=="" || id==undefined){
		id=null;
	}
	var param={id:id,title:title,importanceValue:importanceValue,holdStatus:holdStatus,thisValue:thisValue,
			expectValue:expectValue,researchStockCode:researchStockCode,
			researchStockName:researchStockName,context:context,html:html};
	$.axs("/betaInvest/report/addReportForUserId.do",param,false,function(data){
		if(data.retCode=="0000"){
			window.location.href="/myResearch/researchReport.html";
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

/**
 * 查询研究报告内容
 */
function findReportById(){
	$.axs("/betaInvest/report/findReportById.do",{id:id},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null){
				errorAlert(data.retCode,"没有返回结果");
				return false;
			}
			//标题
			$("#title").val(result.title);
			//重要程度
			$(".xingxing").find("i").each(function(index,item){
				if(index<result.importanceValue){
					$(item).addClass("on");
				}else{
					$(item).removeClass("on");
				}
			});
			//观望状态
			if(result.holdStatus!=null && result.holdStatus!="" && result.holdStatus!="undefined"){
				$("#holdStatus").text(result.holdStatus);
			}
			//当前市值
//			if(result.thisValue!=null && result.thisValue!="" && result.thisValue!="undefined"){
//				$(".checkbox").addClass("on");
//				$(".shizhi").show();
//				$("#thisValue").val(result.thisValue);
//			}
			//期望市值
//			if(result.expectValue!=null && result.expectValue!="" && result.expectValue!="undefined"){
//				$(".checkbox").addClass("on");
//				$(".shizhi").show();
//				$("#expectValue").val(result.expectValue);
//			}
			//研究对象
			if(result.researchStockCode!=null && result.researchStockCode!="" && result.researchStockCode!="undefined"){
				$("#researchStockNum").text("（"+result.researchStockCode.split(",").length+"）")
				var stockCodeArray=result.researchStockCode.split(",");
				var stockNameArray=result.researchStockName.split(",");
				var thisValueArray=result.thisValue==null?"":result.thisValue.split(",");
				var expectValueArray=result.expectValue==null?"":result.expectValue.split(",");
				$.each(stockCodeArray,function(index,item){
					var value=stockNameArray[index]+"("+stockCodeArray[index]+")"
//					var li='<li><a href="javascript:;">'+value+'</a><em></em><div class="clr"></div></li>'
//					$(".yix_gs").append(li);
					var yanjiuduixiangHtml='';
					yanjiuduixiangHtml+='<span>';
					yanjiuduixiangHtml+='<em data-thisValue="'+thisValueArray[index]+'" data-expectValue="'+expectValueArray[index]+'">';
					yanjiuduixiangHtml+=value;
					yanjiuduixiangHtml+='</em>';
					yanjiuduixiangHtml+='<i data-index="'+index+'"></i>';
					yanjiuduixiangHtml+='<b></b>';
					yanjiuduixiangHtml+='<div class="clr"></div>';
					yanjiuduixiangHtml+='</span>';
					$(".news_object_list").append(yanjiuduixiangHtml);
				});
			}
			//富文本内容
			ue.addListener("ready", function () {
		        // ue准备好之后才可以使用
		        ue.setContent(result.context);
			});
		}else{
			errorAlert("",data.retMsg)
		}
	});
}


/**
 * 查询用户分类
 */
function findUserCategory(){
	$(".all_types").html('<li data-value=""><a href="javascript:;">全部分类</a></li>')
	$(".charu_lexing").show();
	$.axs("/betaInvest/btUserCategory/findUserCategory.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length==0){
				//errorAlert(data.retCode,"没有返回结果");
				return false;
			}
			$.each(result,function(i,obj){
				var html='<li data-value="'+obj.categoryId+'"><a href="javascript:;">'+obj.categoryName+'</a></li>';
				$(".all_types").append(html);
			});
		}else{
			errorAlert("",data.retMsg)
		}
	});
}


/**
 * 
 * @param dataValue 类别ID
 * @Param pageNum 页码
 */
function findBtUserStudyChart(dataValue,pageNum){
	if(pageNum==1 || pageNum=="1"){
		$(".fanshi").html('');
		$(".all_tubiao").html('');
	}
	$(".btn_more").attr("data-pageNum",pageNum);
	var param={categoryId:dataValue,pageNum:pageNum,pageSize:10}
	$.axs("/betaInvest/btUserStudyChart/findBtUserStudyChart.do",param,false,function(data){
		if(data.retCode=="0000"){
			$(".charu_lexing").show();
			var result =data.retData;
			if(result==null || result.length==0){
				//errorAlert(data.retCode,"没有返回结果");
				return false;
			}
			$.each(result,function(i,obj){
				var html='';
				//var html='<li data-value="'+obj.categoryId+'"><a href="javascript:;">'+obj.categoryName+'</a></li>';
				html+='<li>';
				html+='<div class="yanjiu_tubiao">';
				html+='<span>';
				html+='<img src="'+obj.imageUrl+'" alt="" />';
				html+='</span>';
				var subChartName=obj.chartName;
				if(subChartName.length>17){
					subChartName=subChartName.substring(0,16)+"...";
				}
				html+='<p title="'+obj.chartName+'">'+subChartName+'</p>';
				html+='</div>';
				html+='<i></i>';
				html+='</li>';
				$(".all_tubiao").append(html);
			});
//			var html='<li data-value="'+data.categorId+'"><a href="javascript:;">'+result.chartName+'</a></li>';
//			$(".all_types").append(html);
			
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

/**
 * 新增文件
 */
function addWordFile(){
	var files=$("#wordFile").get(0).files;
	var filesName=files[0].name;
	$("#fileName").val(filesName);
	//docx doc
	if(filesName.indexOf(".doc")<=-1){
		errorAlert("","请选择word文件");
		return false;
	}
//	console.log(files[0].size)
	var fileSize=2;
	//2M*1024=KB      byte=kb*1024
	if(files[0].size>fileSize*1024*1024){
		errorAlert("","文件大小不能超过"+fileSize+"M");
		return false;
	}
	console.log(files);
	console.log(filesName);
	var wordHtml='';
//	================Jquery.form插件文件上传=====================
	var options = {
            dataType: 'json',
            cache: false,
            success: function (data) {
            	console.log(data);
            	if(data.retCode!="0000"){
            		errorAlert(data.retCode, data.retMsg);
                	return false;
            	}
            	$("#wordFile").remove();
            	$("#uploadWordForm").append('<input type="file" name="file" id="wordFile" onchange="addWordFile()">');
            	console.log(data.retData);
            	wordHtml=data.retData;
            	ue.execCommand('insertHtml', wordHtml);
            },
            uploadProgress: function(event, position, total, percentComplete) {
            	//console.log("position:"+position+",total:"+total+",percentComplete:"+percentComplete);
            	  //进度条
            	  //$('#uploadFileProgress_' + index).css('width',percentComplete + '%');
            	  //大小
            	  //$('#uploadFileSize_' + index).html('(' +percentComplete + '%,'  + (total/1024).toFixed(0) + 'k)');
            },
            error : function(result) {  
               /* var data = jQuery.parseJSON(result.result);  
                var message = data.message;  
                $file.remove();  
                alert(message);  */
            }  
        };
	$("#uploadWordForm").ajaxSubmit(options);
	//富文本内容-追加
//	ue.addListener("ready", function () {
//        // ue准备好之后才可以使用
//		ue.execCommand('insertHtml', wordHtml);
////        ue.setContent(src,true);
//	});
}