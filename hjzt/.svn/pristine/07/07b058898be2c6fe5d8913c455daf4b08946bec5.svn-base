var chartType = ""; //统计类型
var industryId = ""; //行业id
var areaId = ""; //地区id
var placeType = ""; //定增类型
var investorsType = ""; //投资人类型
var zsCode = ""; //指数代码
var mmName = ""; //做市商名称
var orName = ""; //机构名称
var orType = ""; //机构类型
var columns = ""; //指标名称
var interStr = ""; //接口名
var dateType = ""; //时间类型
var stockCode = ""; //股票代码
var stockName = ""; //股票名称
var orderColumn = ""; //排行字段
var financeIndicatorIds = ""; //财务指标

var ZXColumns = ""; //柱形图字段
var lineColumns = ""; //折线图字段
var MJColumns = ""; //面积图字段

//三板统计
var SBSDayData = {}; //三板统计按天显示数据
var SBSHYData = {}; //三板统计半年一次的数据
var SBSMData = {}; //查询月统计的融资数据
var PlaceMData = {}; //定增月的统计数据
var InvestorMData = {}; //投资人月统计数据
var QTDData = {}; //行情天的统计数据
var MMDData = {}; //做市商天统计数据
var EIDData = {}; //中介机构天统计数据

//排行榜
var frData = {}; //融资排行数据
var firData = {}; //投资排行
var bwData = {}; //交易排行

var zbData = {}; //个股指标

//保存图表
var categoryId1 = "";
var businessUrl = ""; //路径参数
var imageUrl = ""; //图片路径base64
var chartName = ""; //标题名称
var chartMS = ""; //图表描述
var chartId = ""; //再次编辑图表时进行保存图表的id

//我的研究-编辑图表中的 指标设置
var ZBSZ="";
//console.log(ZBSZ);
var allZB = ""; //所有指标
var  YXZB=[]; //已选指标data-param集合
var  YXZBNAME=[]; //已选指标名集合

$(function(){
	findUserCategory(); //查询图表分类
	chartType = decodeURI(getParamByUrl("chartType"));
	industryId = decodeURI(getParamByUrl("industryId"));
	areaId = decodeURI(getParamByUrl("areaId"));
	investorsType = decodeURI(getParamByUrl("investorsType"));
	placeType = decodeURI(getParamByUrl("placeType"));
	zsCode = decodeURI(getParamByUrl("zsCode"));
	mmName = decodeURI(getParamByUrl("mmName"));
	orName = decodeURI(getParamByUrl("orName"));
	orType = decodeURI(getParamByUrl("orType"));
	columns = decodeURI(getParamByUrl("columns"));
	interStr = decodeURI(getParamByUrl("interStr"));
	orderColumn = decodeURI(getParamByUrl("orderColumn"));
	dateType = decodeURI(getParamByUrl("dateType"));
	financeIndicatorIds = decodeURI(getParamByUrl("financeIndicatorIds"));
	stockCode = decodeURI(getParamByUrl("stockCode"));
	stockName = decodeURI(getParamByUrl("stockName"));
	chartName = decodeURI(getParamByUrl("chartName"));
	chartMS = decodeURI(getParamByUrl("chartMS"));
	chartId = decodeURI(getParamByUrl("chartId"));
	
	ZXColumns = decodeURI(getParamByUrl("ZXColumns"));
	lineColumns = decodeURI(getParamByUrl("lineColumns"));
	MJColumns = decodeURI(getParamByUrl("MJColumns"));
	
	if(chartId != null && chartId != "" && chartId != undefined){ //编辑图表的时候从数据库中读取
		ZBSZ = JSON.parse(decodeURI(findURLById()));
	}else{ //从缓存中取
		ZBSZ = JSON.parse(decodeURI(localStorage.getItem("ZBQDATA")));
	}
	//console.log(ZBSZ)
	allZB = ZBSZ.ZBZ; //所有指标
	sezhiZB();
	
	//编辑的时候进行回显图表名称（有的时候）
	if(chartName != null && chartName != "null" && chartName != undefined && $.trim(chartName) != ""){
		$("#chartTitle").val(chartName);
	}
	//编辑的时候进行回显图表描述（有的时候）
	if(chartMS != null && chartMS != "null" && chartMS != undefined && $.trim(chartMS) != ""){
		if(chartMS != null && chartMS != ""){
			$("#chartRemark").val(chartMS);
		}
	}

	if((ZXColumns == "" && lineColumns == "" && MJColumns == "")||
	(ZXColumns == null && lineColumns == null && MJColumns == null)){ //说明是从指标库过来的
		if(columns != null){
			lineColumns = columns;
		}else if(orderColumn != null){
			lineColumns = orderColumn;
		}else{
			lineColumns = financeIndicatorIds;
		}
	}

	//判断请求的接口
	judgeRequest((dateType == null || dateType == "") ? "init" : "");
	
	//点击新建分类的确定按钮
	/*$(".biaji_tc .fenlei_qd").on("click",function(){
		$(".tub_tc").hide();
		$(".biaji_tc").hide();
	})*/
	//点击新建分类的确定按钮
	$(".biaji_tc .fenlei_qx,.xin_tc_shanchu").on("click",function(){
		$(".tub_tc2").hide();
		$(".biaji_tc").hide();
	})
	//点击事时间中的a
	$(".time_list a").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		$("#startTime, #endTime").attr("value", "");
		dateType = $(this).text();
		judgeRequest("");
	})
	//点击图表设置下的图表的类型
	$(".tubiao_leixing .type_public").on("click",function(){
		editChartShowType(this);
	})
	//点击收缩时把下面的隐隐藏了
	$(".shuxing_shezhi .top>em").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(this).parent().next().show();
			$(this).parent().next().next().show();
		}else{
			$(this).addClass("on");
			$(this).parent().next().hide();
			$(this).parent().next().next().hide();
		}		
	})
	
	$(".yix_zb>.top>em").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(this).parent().next().show();
		}else{
			$(this).addClass("on");
			$(this).parent().next().hide();
		}
	})
	//指标设置切换
	$(".zb_titles span").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).find("em").text()=="图表设置"){
			$(".tb_shezhi_zb").show();
			$(".zb_shizhe").hide();
		}else{
//			sezhiZB();
			$(".tb_shezhi_zb").hide();
			$(".zb_shizhe").show();
		}
	})
	//编辑框获取焦点时清空内容
	$(".tub_miaoshu").on("focus",function(){
		$(this).text("");
	});
	
	
	//	指标设置模糊搜索
	$('#sechas').keyup(function(){
      $('.seacher li').hide()
          .filter(":contains('" +($(this).val()) + "')").show();
    }).keyup();//DOM加载完时，绑定事件完成之后立即触发
	
	//点击指标设置下的span
//	$(".zb_leixing span").on("click",function(){
//		$(this).addClass("on").siblings().removeClass("on");
//	})
	//点击指标设置下的指标统计
	$(".zb_list").delegate(".tree_node","click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(this).next().slideUp();
		}else{
			$(this).addClass("on");
			$(this).next().slideDown();
		}
	})
	//删除已选的指标
	$(".xuanh_zb").delegate("i","click",function(){
//		获取要删除已选指标的data-param
		var dataParam=$(this).parent().attr("data-param");
//		定义所有指标的data-param
		var threeDataParam="";
		$(".seacher li").each(function(){
			threeDataParam=$(this).find(".data-checkbox").attr("data-param");
			if(threeDataParam==dataParam){
				$(this).find(".data-checkbox").children("label").removeClass("on");
			}
		})
		$(this).parent().remove();
		
		
		lineColumns = "";
		ZXColumns = "";
		MJColumns = "";
		var yxnumber = 0;
		$("#xuanh_zb").children("a").each(function(){
			yxnumber++;
			lineColumns += $(this).attr("data-param") + ",";
		})
		
		$("#yxNumber").html("已选指标（"+yxnumber+"/6）");
		
		lineColumns = lineColumns.substring(0, lineColumns.length - 1);
		if(financeIndicatorIds != ""){
			financeIndicatorIds = lineColumns;
		}
		columns = lineColumns;
		judgeRequest("init");
	})
	

	//取消保存图表
	$("#noSave").click(function(){
		history.back();
	});
	//保存图表
	$("#saveChart").click(function(){
		if($.trim($("#chartTitle").val()) != ""){
			$(".fenlei_tc").show();
			$(".tub_tc").show();
		}else{
			$.zmAlert("请填写图表标题");
		}
	})

	
	//点击确定按钮进行保存
	$(".baoc_qd").click(function(){
		if(chartType == 1){
//			alert("/myResearch/editChart.html?chartType=1&interStr="+ interStr + "&industryId=" + industryId + "&areaId=" + areaId + "&placeType="
//					+ placeType + "&investorsType=" + investorsType
//					+ "&zsCode=" + zsCode + "&mmName=" + mmName + "&orName="
//					+ orName + "&orType=" + orType + "&columns=" + columns + "&dateType=" + dateType +
//					"&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns)
			businessUrl = "?chartType=1&interStr="+ interStr + "&industryId=" + industryId + "&areaId=" + areaId + "&placeType="
							+ placeType + "&investorsType=" + investorsType + "&chartMS=" + encodeURI($("#chartRemark").val())
							+ "&zsCode=" + zsCode + "&mmName=" + mmName + "&orName="
							+ orName + "&orType=" + orType + "&columns=" + columns + "&dateType=" + dateType +
							"&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns + "&chartName=" + encodeURI($("#chartTitle").val()) + "&ZBQDATA=" + encodeURI(JSON.stringify(ZBSZ));
			
		}
		if(chartType == 2){
			var zbText = "";
			$("#xuanh_zb").children("a").each(function(){
				zbText += $(this).attr("title") + ",";
			})
			
//			alert("?chartType=2&interStr="+interStr+"&stockCode="+stockCode+"&financeIndicatorIds="+financeIndicatorIds+
//							"&dateType=" + dateType + "&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns + "&zbText="+zbText.substring(0,zbText.length - 1))
			businessUrl = "?chartType=2&interStr="+interStr+"&stockCode="+stockCode+"&financeIndicatorIds="+financeIndicatorIds+"&stockName="+stockName+ "&chartMS=" + encodeURI($("#chartRemark").val()) + 
							"&dateType=" + dateType + "&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns + "&chartName=" + encodeURI($("#chartTitle").val()) + 
							"&zbText="+ encodeURI(zbText.substring(0,zbText.length - 1)) + "&ZBQDATA=" + encodeURI(JSON.stringify(ZBSZ));
		}
		if(chartType == 3){
//			alert("?chartType=1&interStr="+ interStr + "&industryId=" + industryId + "&investorsType=" + investorsType
//				+ "&orderColumn=" + orderColumn + "&dateType=" + dateType +
//				"&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns)
			businessUrl = "?chartType=3&interStr="+ interStr + "&industryId=" + industryId + "&investorsType=" + investorsType
							+ "&orderColumn=" + orderColumn + "&dateType=" + dateType + "&chartMS=" + encodeURI($("#chartRemark").val()) + 
							"&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns + 
							"&chartName=" + encodeURI($("#chartTitle").val()) + "&ZBQDATA=" + encodeURI(JSON.stringify(ZBSZ));
		}
		addBtUserStudyChart(businessUrl);
	})
	
	//点击弹窗的右上角的关闭按钮
	$(".tc_shanchu").on("click",function(){
		$(".tub_tc").hide();
		$(".fenlei_tc").hide();
		$(".tub_tc2").hide();
	})
	//点击取消
	$(".baoc_qx").on("click",function(){
		$(".tub_tc").hide();
		$(".tub_tc2").hide();
		$(this).parent().parent().hide();
	})
	
	/**
	 * 自定义查询
	 */
	 //wtl 7.12 更改不能大于结束时间  同下   
	 //郭建杰 7.12换成按钮触发查询
//	$("#startTime").on("blur",function(){
//		setTimeout(function(){
//			if($("#startTime").val() != ""){
//				if($("#endTime").val() != ""){
//					var startTime = new Date(Date.parse($("#startTime").val()));
//					var endTime = new Date(Date.parse($("#endTime").val()));
//					if(endTime > startTime){
//						dateType = $("#startTime").val() + "," + $("#endTime").val();
//						//请求查询
//						judgeRequest("");
//					}else{
//						$(".am-datepicker-dropdown").hide();
//						$.zmAlert("结束时间必须大于开始时间");
//					}
//				}
//			}else{
//				$(".am-datepicker-dropdown").hide();
//				$.zmAlert("请选择开始时间");
//
//			}
//		},100);
//	})
//	$("#endTime").on("blur",function(){
//		setTimeout(function(){
//			if($("#startTime").val() != ""){
//				if($("#endTime").val() != ""){
//					var startTime = new Date(Date.parse($("#startTime").val()));
//					var endTime = new Date(Date.parse($("#endTime").val()));
//					if(endTime > startTime){
//						dateType = $("#startTime").val() + "," + $("#endTime").val();
//						//请求查询
//						judgeRequest("");
//					}else{
//						$.zmAlert("结束时间必须大于开始时间");
//					}
//				}else{
//					$(".am-datepicker-dropdown").hide();
//					$.zmAlert("请选择结束时间");
//					
//				}
//			}else{
//				$(".am-datepicker-dropdown").hide();
//				$.zmAlert("请选择开始时间");
//
//			}
//		},100);
//	});


//郭建杰 7.12换成按钮触发查询 star
	$("#timeSearch").on("click",function(){
		if($("#startTime").val() != ""){
				if($("#endTime").val() != ""){
					var startTime = new Date(Date.parse($("#startTime").val()));
					var endTime = new Date(Date.parse($("#endTime").val()));
					if(endTime > startTime){
						dateType = $("#startTime").val() + "," + $("#endTime").val();
						//请求查询
						judgeRequest("");
					}else{
						$.zmAlert("结束时间必须大于开始时间");
					}
				}else{
					$(".am-datepicker-dropdown").hide();
					$.zmAlert("请选择结束时间");
					
				}
			}else{
				$(".am-datepicker-dropdown").hide();
				$.zmAlert("请选择开始时间");

			}
	});
	//郭建杰 7.12换成按钮触发查询 end
	
});

//查询我的分类
function findUserCategory(){
	$.axs("/betaInvest/btUserCategory/findUserCategory.do",null,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			var html='';
			if(result==null){
				$("#categoryList").empty();
				html+='<li onclick="newlyBuildTypes()"><a href="javascript:;">新建分类</a></li>';
				$("#categoryList").append(html);
				return false
			}
//			console.log(result)
			$("#categoryList").empty();
			//$("#categoryList2").empty();
			//console.log(result)
			$(result).each(function(index,item){
				html+='<li onclick="selectCategoryId1(\''+item.categoryId+'\')"><a href="javascript:;">'+item.categoryName+'</a></li>';
			})
			html+='<li onclick="newlyBuildTypes()"><a href="javascript:;">新建分类</a></li>';
			$("#categoryList").append(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

//选择哪个行业ID
function selectCategoryId1(cateId){
	categoryId1=cateId;
}
//点击新建分类
function newlyBuildTypes(){
	$(".biaji_tc").show();
	$(".tub_tc2").show();
}


//	我的研究 指标设置
function sezhiZB(){
//	var chartType=getUrlParam("chartType");
	var  kexuanNumber=6
	if(chartType==1){
		$(".zb_leixing").find("span").removeClass("on");
		$(".zb_leixing").find("span").eq(0).addClass("on");
	}
	if(chartType==2){
		$(".zb_leixing").find("span").removeClass("on");
		$(".zb_leixing").find("span").eq(1).addClass("on");
	}
	if(chartType==3){
		$(".zb_leixing").find("span").removeClass("on");
		$(".zb_leixing").find("span").eq(2).addClass("on");
		kexuanNumber=1;
	}

	var ZBhtml='';
	for(var j=0; j<ZBSZ.CJGX.length-1;j++){
		 var zbfl = ZBSZ.CJGX[j];
		 if(j==0){
		 	ZBhtml+='<li class="zb_public " style="display: block;">'; 
			ZBhtml+='<span class="tree_node on">'+zbfl.name+'</span>'; 
		 }
		 if(j==1){
		 	ZBhtml+='<ul class="zb_public" style="display: block;">'; 
			ZBhtml+='<li>'; 
			ZBhtml+='<span class="tree_node on">'+zbfl.name+'</span>'; 
		 }
		 if(j==2){
		 	ZBhtml+='<ul class="zb_public" style="display: block;">'; 
			ZBhtml+='<li>'; 
			ZBhtml+='<span class="tree_node on">'+zbfl.name+'</span>'; 
		 }
		 if(j==3){
		 	ZBhtml+='<ul class="zb_public" style="display: block;">'; 
			ZBhtml+='<li>'; 
			ZBhtml+='<span class="tree_node on">'+zbfl.name+'</span>'; 
		 }
		 if(j==4){
		 	ZBhtml+='<ul class="zb_public" style="display: block;">'; 
			ZBhtml+='<li>'; 
			ZBhtml+='<span class="tree_node on">'+zbfl.name+'</span>'; 
		 }
		 if(j==5){
		 	ZBhtml+='<ul class="zb_public" style="display: block;">'; 
			ZBhtml+='<li>'; 
			ZBhtml+='<span class="tree_node on">'+zbfl.name+'</span>'; 
		 }

		
	}
	
	for(var k=0;k<ZBSZ.CJGX.length;k++){
		 var yxzb = ZBSZ.CJGX[k];//已选指标
			if(k==(ZBSZ.CJGX.length-1)){
		 	YXZB=yxzb.dataParam.split(",");
		 	YXZBNAME=yxzb.name.split(",");
			}
	}
	//	已选指标回显
	var yxHtm='';//已选指标标签
	$("#yxNumber").html("已选指标（"+YXZBNAME.length+"/"+kexuanNumber+"）");
	for(var f=0;f<YXZBNAME.length;f++){
		yxHtm+='<a href="javascript:;" data-param='+YXZB[f]+' title='+YXZBNAME[f]+'>'+YXZBNAME[f].substring(0,7)+'<i></i></a>';
	}
	$("#xuanh_zb").html(yxHtm);	
	ZBhtml+='<ul class="zb_public seacher" style="display: block;">';
	var flag = true;
	for(i=0;i<allZB.length;i++){
		var geGeZB = allZB[i];//所有指标
		$(YXZB).each(function(){
			if(geGeZB.dataParam==this){
				flag = false;
				ZBhtml+='<li>'; 
				ZBhtml+='<div class="data-checkbox" data-param='+geGeZB.dataParam+'>'; 
				ZBhtml+='<input type="checkbox" />'; 
				ZBhtml+='<label class="checkbox on"></label>'; 
				ZBhtml+='<label class="checkboxWord on">'+geGeZB.name+'</label>'; 
				ZBhtml+='</div>'; 
				ZBhtml+='</li>'; 
			}
		})
		if(flag){
			ZBhtml+='<li>'; 
			ZBhtml+='<div class="data-checkbox" data-param='+geGeZB.dataParam+'>'; 
			ZBhtml+='<input type="checkbox" />'; 
			ZBhtml+='<label class="checkbox"></label>'; 
			ZBhtml+='<label class="checkboxWord">'+geGeZB.name+'</label>'; 
			ZBhtml+='</div>'; 
			ZBhtml+='</li>'; 
		}
		flag = true;
	}
	ZBhtml+='</ul>';
	for(var g=0; g<ZBSZ.CJGX.length-2; g++){
	ZBhtml+='</li>'; 
	ZBhtml+='</ul>';	
	}
	ZBhtml+='</li>'; 
   $("#zb_list").html(ZBhtml);	
   //	多选框
	$(".zb_public .data-checkbox").delegate("label","click", function(e) {
		var yxN =$(this).parents(".seacher").find("label.checkboxWord.on");
		var yxHtml='';//已选指标标签
		var yxnumber=0;
		if(yxN.length>=kexuanNumber){
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
		} else {
			errorAlert("","最多选择"+kexuanNumber+"个指标");
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
		}
		}else{
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
		} else {
			$(this).addClass("on");
			$(this).siblings("label").addClass("on");
		}	
		}
		var yxN =$(this).parents(".seacher").find("label.checkboxWord.on");
		yxN.each(function(){
			var  dataParam = $(this).parent().attr("data-param");
			var  checkword =$(this).text();
			yxHtml+='<a href="javascript:;" data-param='+dataParam+' title='+checkword+'>'+checkword.substring(0,7)+'<i></i></a>';
			yxnumber++;
		});
		$("#yxNumber").html("已选指标（"+yxnumber+"/"+kexuanNumber+"）");
		$("#xuanh_zb").html(yxHtml);
		e.stopPropagation();
		
		//********************
		lineColumns = "";
		ZXColumns = "";
		MJColumns = "";
		$("#xuanh_zb").children("a").each(function(){
			lineColumns += $(this).attr("data-param") + ",";
		})
		lineColumns = lineColumns.substring(0, lineColumns.length - 1);
		if(financeIndicatorIds != ""){
			financeIndicatorIds = lineColumns;
		}
		columns = lineColumns;
		judgeRequest("init");
	});
}

/**
 * 修改指标别名
 * @param thiz
 */

function editZBBName(thiz){
	var flag = false;
	if($.trim($(thiz).val()) != ""){
		
		var showTData = {};
		if(interStr == "findSBSDayData"){ //三板统计按天显示数据
			showTData = SBSDayData;
		}else if(interStr == "findSBSHYData"){ //三板统计半年一次的数据
			showTData = SBSHYData;
		}else if(interStr == "findSBSMData"){ //月统计的融资数据
			showTData = SBSMData;
		}else if(interStr == "findPlaceMData"){ //定增月的统计数据
			showTData = PlaceMData;
		}else if(interStr == "findInvestorMData"){ //投资人月统计数据
			showTData = InvestorMData;
		}else if(interStr == "findQTDData"){ //行情天的统计数据
			showTData = QTDData;
		}else if(interStr == "findMMDData"){ //做市商天统计数据
			showTData = MMDData;
		}else if(interStr == "findEIDData"){ //中介机构天统计数据
			showTData = EIDData;
		}else if(interStr == "findFinanceRanking"){ //融资排行
			showTData = frData;
		}else if(interStr == "findInvestRanking"){ //投资排行
			showTData = firData;
		}else if(interStr == "findBtTradingWas"){ //交易排行
			showTData = bwData;
		}else if(interStr == "findFinancialData"){ //个股指标
			showTData = zbData;
		}
		
		//改变名称
		$(showTData.arr).each(function(){
			if(this.name == $(thiz).val()){
				$.zmAlert("此别名已存在");
				$(thiz).val("");
				$(thiz).attr("placeholder","指标别名");
				flag = true;
			}
		})
		
		if(flag){
			return;
		}
		ZXColumns = ""; //柱形图字段
		lineColumns = ""; //折线图字段
		MJColumns = ""; //面积图字段
		
		$(".type_public").each(function(){
			if($(this).hasClass("on")){
				if($(this).children("em").text() == "柱形"){
					ZXColumns += $(this).parent().prev().prev().attr("data-code") + ",";
				}
				if($(this).children("em").text() == "折线"){
					lineColumns += $(this).parent().prev().prev().attr("data-code") + ",";
				}
				if($(this).children("em").text() == "面积"){
					MJColumns += $(this).parent().prev().prev().attr("data-code") + ",";
				}
			}
		})
		
		var zbName = $(thiz).val();
		var zbNameType = $(thiz).prev().attr("data-code");
		
		//改变名称
		$(showTData.arr).each(function(){
			if(this.code == zbNameType){
				this.name = zbName;
			}
		})
		//console.log(1)
		drawLine(showTData, lineColumns, ZXColumns, MJColumns);
		showTable(showTData, 1);
	
	}
}

/**
 * 改变图标显示类型
 * @param thiz
 */
function editChartShowType(thiz){
	$($(thiz).parent(".tuxing_types").children(".type_public")).each(function(index,item){
		if($(item).hasClass("on")){
			$(this).removeClass("on");
		}
	})
	$(thiz).addClass("on");
	
	
	//进行改变图形
	ZXColumns = ""; //柱形图字段
	lineColumns = ""; //折线图字段
	MJColumns = ""; //面积图字段
	
	$(".type_public").each(function(){
		if($(this).hasClass("on")){
			if($(this).children("em").text() == "柱形"){
				ZXColumns += $(this).parent().prev().prev().attr("data-code") + ",";
			}
			if($(this).children("em").text() == "折线"){
				lineColumns += $(this).parent().prev().prev().attr("data-code") + ",";
			}
			if($(this).children("em").text() == "面积"){
				MJColumns += $(this).parent().prev().prev().attr("data-code") + ",";
			}
		}
	})
	
	var showTData = {};
	if(interStr == "findSBSDayData"){ //三板统计按天显示数据
		showTData = SBSDayData;
	}else if(interStr == "findSBSHYData"){ //三板统计半年一次的数据
		showTData = SBSHYData;
	}else if(interStr == "findSBSMData"){ //月统计的融资数据
		showTData = SBSMData;
	}else if(interStr == "findPlaceMData"){ //定增月的统计数据
		showTData = PlaceMData;
	}else if(interStr == "findInvestorMData"){ //投资人月统计数据
		showTData = InvestorMData;
	}else if(interStr == "findQTDData"){ //行情天的统计数据
		showTData = QTDData;
	}else if(interStr == "findMMDData"){ //做市商天统计数据
		showTData = MMDData;
	}else if(interStr == "findEIDData"){ //中介机构天统计数据
		showTData = EIDData;
	}else if(interStr == "findFinanceRanking"){ //融资排行
		showTData = frData;
	}else if(interStr == "findInvestRanking"){ //投资排行
		showTData = firData;
	}else if(interStr == "findBtTradingWas"){ //交易排行
		showTData = bwData;
	}else if(interStr == "findFinancialData"){ //个股指标
		showTData = zbData;
	}
//	console.log(lineColumns+"===="+ ZXColumns+"=="+ MJColumns)
	drawLine(showTData, lineColumns, ZXColumns, MJColumns);
}

//判断请求接口
function judgeRequest(reqType){
	if(dateType != null && dateType != ""){
		if(dateType.indexOf(",") > -1){
			$("#startTime").attr("value", dateType.split(",")[0]);
			$("#endTime").attr("value", dateType.split(",")[1]);
		}
		$(".time_list").children("a").each(function(){
			if($(this).text() == dateType){
				$(this).addClass("on");
			}else{
				$(this).removeClass("on");
			}
		})
	}
	if(reqType == "init"){
		$(".time_list").children("a").removeClass("on");
	}
	
	if(interStr == "findSBSDayData"){ //查询三板统计按天显示数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findSBSDayData();
	}else if(interStr == "findSBSHYData"){ //查询三板统计半年一次的数据
		
		$(".time_list").children("a").each(function(){
			if($(this).text() == "周" || $(this).text() == "月" || $(this).text() == "季" || $(this).text() == "半年"){
				$(this).hide();
			}
			if(reqType == "init"){
				if($(this).text() == "1年"){
					dateType = "1年";
					$(this).addClass("on");
				}
			}
		})
		
		findSBSHYData();
	}else if(interStr == "findSBSMData"){ //查询月统计的融资数据
		
		$(".time_list").children("a").each(function(){
			if($(this).text() == "周" || $(this).text() == "月" || $(this).text() == "季"){
				$(this).hide();
			}
			if(reqType == "init"){
				if($(this).text() == "半年"){
					dateType = "半年";
					$(this).addClass("on");
				}
			}
		})
		findSBSMData();
	}else if(interStr == "findPlaceMData"){ //查询定增月的统计数据
		
		$(".time_list").children("a").each(function(){
			if($(this).text() == "周" || $(this).text() == "月" || $(this).text() == "季"){
				$(this).hide();
			}
			if(reqType == "init"){
				if($(this).text() == "半年"){
					dateType = "半年";
					$(this).addClass("on");
				}
			}
		})
		findPlaceMData();
	}else if(interStr == "findInvestorMData"){ //查询投资人月统计数据
		$(".time_list").children("a").each(function(){
			if($(this).text() == "周" || $(this).text() == "月" || $(this).text() == "季"){
				$(this).hide();
			}
			if(reqType == "init"){
				if($(this).text() == "半年"){
					dateType = "半年";
					$(this).addClass("on");
				}
			}
		})
		findInvestorMData();
	}else if(interStr == "findQTDData"){ //查询行情天的统计数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findQTDData();
	}else if(interStr == "findMMDData"){ //查询做市商天统计数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findMMDData();
	}else if(interStr == "findEIDData"){ //查询中介机构天统计数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findEIDData();
	}else if(interStr == "findFinanceRanking"){ //查询融资排行数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findFinanceRanking();
	}else if(interStr == "findInvestRanking"){ //查询投资排行数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findInvestRanking();
	}else if(interStr == "findBtTradingWas"){ //查询交易排行数据
		if(reqType == "init"){
			$(".time_list").children("a").show();
			//隐藏自定义
			$(".data_times").hide();
			$(".time_list").children("a").each(function(){
				if($(this).text() == "周"){
					dateType = "周";
					$(this).addClass("on");
				}
			})
		}
		findBtTradingWas();
	}else if(interStr == "findFinancialData"){ //查询个股指标
		$(".time_list").children("a").each(function(){
			if($(this).text() == "周" || $(this).text() == "月" || $(this).text() == "季" || $(this).text() == "半年"){
				$(this).hide();
			}
			if(reqType == "init"){
				if($(this).text() == "1年"){
					dateType = "1年";
					$(this).addClass("on");
				}
			}
		})
		findFinancialData();
	}
	
}

//查询三板统计按天显示数据
function findSBSDayData(){
	$.axs("/betaInvest/indexLibrary/findSBSDayData.do",
			{industryId:industryId,areaId:areaId,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var lcn = []; //挂牌公司家数
			var mtn = []; //做市转让公司家数
			var atn = []; //协议转让总数
			var bcn = []; //基础层公司总数
			var icn = []; //创新层公司总数
			var lcsn = []; //挂牌公司总股本（亿股）
			var tcsn = []; //做市转让总股本（亿股）
			var atsn = []; //协议转让总股本（亿股）
			var lcfn = []; //挂牌公司流通股本（亿股）
			var tcfn = []; //做市转让流通股本（亿股）
			var atfn = []; //协议转让流通股本（亿股）
			var nmtn = []; //新增做市转让家数
			var natn = []; //新增协议转让家数
			var nbcn = []; //新加入基础层总数
			var nicn = []; //新加入创新层总数
			var pln = []; //拟挂牌公司总数
			var npln = []; //新增拟挂牌公司总数
			var lvn = []; //挂牌公司总成交数量(万股)
			var mvn = []; //做市转让成交数量(万股)
			var ltn = []; //挂牌公司总成交金额(万元)
			var mtn1 = []; //做市转让成交金额(万元)
			var atn1 = []; //协议转让成交金额(万元)
			var ltan = []; //挂牌公司总成交均价(元)
			var mtan = []; //做市转让成交均价(元)
			var atan = []; //协议转让成交均价(元)
			var ltt = []; //挂牌总成交笔数
			var mtt = []; //做市转让成交笔数
			var att = []; //协议转让成交笔数
			var st = []; //日期
			
			$(result.sbsDayData).each(function(){
				lcn.push(this.listedCompanyNum);
				mtn.push(this.marketTransfersNum);
				atn.push(this.agreementTransfersNum);
				bcn.push(this.baseCompaniesNum);
				icn.push(this.innovationCompaniesNum);
				lcsn.push((this.listedCompanyScNum == null ? "" : this.listedCompanyScNum.toFixed(2)));
				tcsn.push((this.transferCapitalScNum == null ? "" : this.transferCapitalScNum.toFixed(2)));
				atsn.push((this.agreementTransfersScNum == null ? "" : this.agreementTransfersScNum.toFixed(2)));
				lcfn.push((this.listedCompanyFeNum == null ? "" : this.listedCompanyFeNum.toFixed(2)));
				tcfn.push((this.transferCapitalFeNum == null ? "" : this.transferCapitalFeNum.toFixed(2)));
				atfn.push((this.agreementTransfersFeNum == null ? "" : this.agreementTransfersFeNum.toFixed(2)));
				nmtn.push(this.newMarketTransfersNum);
				natn.push(this.newAgreementTransfersNum);
				nbcn.push(this.newBaseCompaniesNum);
				nicn.push(this.newInnovationCompaniesNum);
				pln.push(this.proposedListedNum);
				npln.push(this.newProposedListedNum);
				lvn.push((this.lcVolumeNum == null ? "" : this.lcVolumeNum.toFixed(2)));
				mvn.push((this.mtVolumeNum == null ? "" : this.mtVolumeNum.toFixed(2)));
				ltn.push((this.lcTurnoverNum == null ? "" : this.lcTurnoverNum.toFixed(2)));
				mtn1.push((this.mtTurnoverNum == null ? "" : this.mtTurnoverNum.toFixed(2)));
				atn1.push((this.atTurnoverNum == null ? "" : this.atTurnoverNum.toFixed(2)));
				ltan.push((this.lcTpAvgNum == null ? "" : this.lcTpAvgNum.toFixed(2)));
				mtan.push((this.mtTpAvgNum == null ? "" : this.mtTpAvgNum.toFixed(2)));
				atan.push((this.atTpAvgNum == null ? "" : this.atTpAvgNum.toFixed(2)));
				ltt.push(this.lcTransactionsTotal);
				mtt.push(this.mtTransactionsTotal);
				att.push(this.atTransactionsTotal);
				st.push(this.storageTime);
			})
			
			var jsonD = {"date":st};
			var sbsDArr = [];
			
			var json = {};
			json.code = "listed_company_num";
			json.name = "挂牌公司家数";
			json.data = lcn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "market_transfers_num";
			json.name = "做市转让公司家数";
			json.data = mtn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_num";
			json.name = "协议转让总数";
			json.data = atn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "base_companies_num";
			json.name = "基础层公司总数";
			json.data = bcn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "innovation_companies_num";
			json.name = "创新层公司总数";
			json.data = icn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "listed_company_sc_num";
			json.name = "挂牌公司总股本（亿股）";
			json.data = lcsn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "transfer_capital_sc_num";
			json.name = "做市转让总股本（亿股）";
			json.data = tcsn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_sc_num";
			json.name = "协议转让总股本（亿股）";
			json.data = atsn;
			sbsDArr.push(json);

			json = {};
			json.code = "listed_company_fe_num";
			json.name = "挂牌公司流通股本（亿股）";
			json.data = lcfn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "transfer_capital_fe_num";
			json.name = "做市转让流通股本（亿股）";
			json.data = tcfn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_fe_num";
			json.name = "协议转让流通股本（亿股）";
			json.data = atfn;
			sbsDArr.push(json);

			json = {};
			json.code = "new_market_transfers_num";
			json.name = "新增做市转让家数";
			json.data = nmtn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "new_agreement_transfers_num";
			json.name = "新增协议转让家数";
			json.data = natn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "new_base_companies_num";
			json.name = "新加入基础层总数";
			json.data = nbcn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "new_innovation_companies_num";
			json.name = "新加入创新层总数";
			json.data = nicn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "proposed_listed_num";
			json.name = "拟挂牌公司总数";
			json.data = pln;
			sbsDArr.push(json);

			json = {};
			json.code = "new_proposed_listed_num";
			json.name = "新增拟挂牌公司总数";
			json.data = npln;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_volume_num";
			json.name = "挂牌公司总成交数量(万股)";
			json.data = lvn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_volume_num";
			json.name = "做市转让成交数量(万股)";
			json.data = mvn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_turnover_num";
			json.name = "挂牌公司总成交金额(万元)";
			json.data = ltn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_turnover_num";
			json.name = "做市转让成交金额(万元)";
			json.data = mtn1;
			sbsDArr.push(json);
			
			json = {};
			json.code = "at_turnover_num";
			json.name = "协议转让成交金额(万元)";
			json.data = atn1;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_tp_avg_num";
			json.name = "挂牌公司总成交均价(元)";
			json.data = ltan;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_tp_avg_num";
			json.name = "做市转让成交均价(元)";
			json.data = mtan;
			sbsDArr.push(json);
			
			json = {};
			json.code = "at_tp_avg_num";
			json.name = "协议转让成交均价(元)";
			json.data = atan;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_transactions_total";
			json.name = "挂牌总成交笔数";
			json.data = ltt;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_transactions_total";
			json.name = "做市转让成交笔数";
			json.data = mtt;
			sbsDArr.push(json);
			
			json = {};
			json.code = "at_transactions_total";
			json.name = "协议转让成交笔数";
			json.data = att;
			sbsDArr.push(json);
			jsonD.arr = sbsDArr;
//			console.log(st);
			
			SBSDayData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询三板统计半年一次的数据
function findSBSHYData(){
	$.axs("/betaInvest/indexLibrary/findSBSHYData.do",
			{industryId:industryId,areaId:areaId,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var lcn = []; //挂牌公司总数
			var mtn = []; //做市转让总数
			var atn = []; //协议转让总数
			var nln = []; //新增挂牌公司数
			var sn = []; //总股本（亿股）
			var fn = []; //流通股本（亿股）
			var ta = []; //总资产合计(万元) 
			var taa = []; //总资产均值(万元) 
			var tna = []; //净资产合计(万元) 
			var tnaa = []; //净资产均值(万元)
			var toi = []; //营业收入合计(万元) 
			var toia = []; //营业收入均值(万元) 
			var tnp = []; //净利润合计(万元) 
			var tnpa = []; //净利润均值(万元)
			var st = []; //日期
			
			$(result.sbsHYData).each(function(){
				lcn.push(this.listedCompanyNum);
				mtn.push(this.marketTransfersNum);
				atn.push(this.agreementTransfersNum);
				nln.push(this.newLcNum);
				sn.push((this.scNum == null ? "" : this.scNum.toFixed(2)));
				fn.push((this.feNum == null ? "" : this.feNum.toFixed(2)));
				ta.push((this.totalAssets == null ? "" : this.totalAssets.toFixed(2)));
				taa.push((this.totalAssetsAvg == null ? "" : this.totalAssetsAvg.toFixed(2)));
				tna.push((this.totalNetAssets == null ? "" : this.totalNetAssets.toFixed(2)));
				tnaa.push((this.totalNetAssetsAvg == null ? "" : this.totalNetAssetsAvg.toFixed(2)));
				toi.push((this.totalOperatingIncome == null ? "" : this.totalOperatingIncome.toFixed(2)));
				toia.push((this.totalOperatingIncomeAvg == null ? "" : this.totalOperatingIncomeAvg.toFixed(2)));
				tnp.push((this.totalNetProfit == null ? "" : this.totalNetProfit.toFixed(2)));
				tnpa.push((this.totalNetProfitAvg == null ? "" : this.totalNetProfitAvg.toFixed(2)));
				st.push(this.statisticsTime);
			})
			
			var jsonD = {"date":st};
			var sdArr = [];
			
			var json = {};
			json.code = "listed_company_num";
			json.name = "挂牌公司总数";
			json.data = lcn;
			sdArr.push(json);
			
			json = {};
			json.code = "market_transfers_num";
			json.name = "做市转让总数";
			json.data = mtn;
			sdArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_num";
			json.name = "协议转让总数";
			json.data = atn;
			sdArr.push(json);
			
			json = {};
			json.code = "new_lc_num";
			json.name = "新增挂牌公司数";
			json.data = nln;
			sdArr.push(json);
			
			json = {};
			json.code = "sc_num";
			json.name = "总股本（亿股）";
			json.data = sn;
			sdArr.push(json);
			
			json = {};
			json.code = "fe_num";
			json.name = "流通股本（亿股）";
			json.data = fn;
			sdArr.push(json);
			
			json = {};
			json.code = "total_assets";
			json.name = "总资产合计(万元) ";
			json.data = ta;
			sdArr.push(json);
			
			json = {};
			json.code = "total_assets_avg";
			json.name = "总资产均值(万元) ";
			json.data = taa;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_assets";
			json.name = "净资产合计(万元) ";
			json.data = tna;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_assets_avg";
			json.name = "净资产均值(万元)";
			json.data = tnaa;
			sdArr.push(json);
			
			json = {};
			json.code = "total_operating_income";
			json.name = "营业收入合计(万元) ";
			json.data = toi;
			sdArr.push(json);
			
			json = {};
			json.code = "total_operating_income_avg";
			json.name = "营业收入均值(万元) ";
			json.data = toia;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_profit";
			json.name = "净利润合计(万元) ";
			json.data = tnp;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_profit_avg";
			json.name = "净利润均值(万元)";
			json.data = tnpa;
			sdArr.push(json);
			
//			console.log(pmArr);
			jsonD.arr = sdArr;
//			console.log(jsonD);
			
			SBSHYData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询月统计的融资数据
function findSBSMData(){
	$.axs("/betaInvest/indexLibrary/findSBSMData.do",
			{industryId:industryId,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var ct = []; //融资企业家数
			var ft = []; //融资事件次数
			var as = []; //融资总额
			var am = []; //最高单笔融资金额
			var aa = []; //平均融资金额
			var AQQGR = []; //融资金额环比增长率
			var PNGR = []; //融资事件次数环比增长率
			var dt = []; //日期
			$(result.SBSMData).each(function(){
				ct.push(this.companyTotal);
				ft.push(this.financeTotal);
				as.push((this.amountSum == null ? "" : this.amountSum.toFixed(2)));
				am.push((this.amountMax == null ? "" : this.amountMax.toFixed(2)));
				aa.push((this.amountAvg == null ? "" : this.amountAvg.toFixed(2)));
				AQQGR.push((this.AQQGR == null ? "" : this.AQQGR.toFixed(2)));
				PNGR.push((this.PNGR == null ? "" : this.PNGR.toFixed(2)));
				dt.push(this.dateTime);
			})
			
			var jsonD = {"date":dt};
			var pmArr = [];
			
			var json = {};
			json.code = "companyTotal";
			json.name = "融资企业家数";
			json.data = ct;
			pmArr.push(json);
			
			json = {};
			json.code = "financeTotal";
			json.name = "融资事件次数";
			json.data = ft;
			pmArr.push(json);
			
			json = {};
			json.code = "amountSum";
			json.name = "融资总额";
			json.data = as;
			pmArr.push(json);
			
			json = {};
			json.code = "amountMax";
			json.name = "最高单笔融资金额";
			json.data = am;
			pmArr.push(json);
			
			json = {};
			json.code = "amountAvg";
			json.name = "平均融资金额";
			json.data = aa;
			pmArr.push(json);
			
			json = {};
			json.code = "AQQGR";
			json.name = "融资金额环比增长率";
			json.data = AQQGR;
			pmArr.push(json);
			
			json = {};
			json.code = "PNGR";
			json.name = "融资事件次数环比增长率";
			json.data = PNGR;
			pmArr.push(json);
//			console.log(pmArr);
			jsonD.arr = pmArr;
//			console.log(jsonD);
			
			SBSMData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询定增月的统计数据
function findPlaceMData(){
	$.axs("/betaInvest/indexLibrary/findPlaceMData.do",
			{placeType:placeType,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var pc = []; //增发次数
			var ct = []; //增发公司家数
			var pn = []; //增发数量(万股)
			var rp = []; //募资总额(亿元)
			var dt = []; //日期
			$(result.mData).each(function(){
				pc.push(this.placeCount);
				ct.push(this.companyTotal);
				pn.push((this.privateNum == null ? "" : this.privateNum.toFixed(2)));
				rp.push((this.raisePrice == null ? "" : this.raisePrice.toFixed(2)));
				dt.push(this.dateTime);
			})
			
			var jsonD = {"date":dt};
			var pmArr = [];
			
			var json = {};
			json.code = "placeCount";
			json.name = "增发次数";
			json.data = pc;
			pmArr.push(json);
			
			json = {};
			json.code = "companyTotal";
			json.name = "增发公司家数";
			json.data = ct;
			pmArr.push(json);
			
			json = {};
			json.code = "privateNum";
			json.name = "增发数量(万股)";
			json.data = pn;
			pmArr.push(json);
			
			json = {};
			json.code = "raisePrice";
			json.name = "募资总额(亿元)";
			json.data = rp;
			pmArr.push(json);
			
//			console.log(pmArr);
			jsonD.arr = pmArr;
//			console.log(jsonD);
			
			PlaceMData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询投资人月统计数据
function findInvestorMData(){
	$.axs("/betaInvest/indexLibrary/findInvestorMData.do",
			{investorsType:investorsType,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var it = []; //投资事件总数
			var is = []; //投资总金额
			var nd = []; //日期
			$(result.investorData).each(function(){
				it.push(this.invesTotal);
				is.push((this.investSum == null ? "" : this.investSum.toFixed(2)));
				nd.push(this.noticeDate);
			})
			
			var jsonD = {"date":nd};
			var imArr = [];
			
			var json = {};
			json.code = "invesTotal";
			json.name = "投资事件总数";
			json.data = it;
			imArr.push(json);
			
			json = {};
			json.code = "investSum";
			json.name = "投资总金额";
			json.data = is;
			imArr.push(json);
			
//			console.log(imArr);
			jsonD.arr = imArr;
//			console.log(jsonD);
			
			InvestorMData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询行情天的统计数据
function findQTDData(){
	$.axs("/betaInvest/indexLibrary/findQTDData.do",
			{stockCode:zsCode,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var np = []; //指数
			var pcr = []; //涨跌幅
			var dt = []; //日期
			$(result.qtdData).each(function(){
				np.push((this.newPrice == null ? "" : this.newPrice.toFixed(2)));
				pcr.push((this.pcr == null ? "" : this.pcr.toFixed(2)));
				dt.push(this.dataTime);
			})
			var jsonD = {"date":dt};
			var qtdArr = [];
			
			var json = {};
			json.code = "newPrice";
			json.name = "指数";
			json.data = np;
			qtdArr.push(json);
			
			json = {};
			json.code = "pcr";
			json.name = "涨跌幅";
			json.data = pcr;
			qtdArr.push(json);
			
			jsonD.arr = qtdArr;
			
			QTDData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询做市商天统计数据
function findMMDData(){
	$.axs("/betaInvest/indexLibrary/findMMDData.do",
			{mmName:mmName,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var rn = []; //推荐家数
			var sn = []; //成功家数
			var dt = []; //日期
			$(result.mmdData).each(function(){
				rn.push(this.recommendNum);
				sn.push(this.successNum);
				dt.push(this.dateTime);
			})
			var jsonD = {"date":dt};
			var mdArr = [];
			
			var json = {};
			json.code = "recommendNum";
			json.name = "推荐家数";
			json.data = rn;
			mdArr.push(json);
			json = {};
			json.code = "successNum";
			json.name = "成功家数";
			json.data = sn;
			mdArr.push(json);
			
			jsonD.arr = mdArr;
			
			MMDData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询中介机构天统计数据
function findEIDData(){
	$.axs("/betaInvest/indexLibrary/findEIDData.do",
			{orType:orType,orName:orName,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null || result.eidData == null){
				return false;
			}
			
			var rn = []; //推荐家数
			var sn = []; //成功家数
			var dt = []; //日期
			$(result.eidData).each(function(){
				rn.push(this.recommendNum);
				sn.push(this.successNum);
				dt.push(this.dateTime);
			})
			var jsonD = {"date":dt};
			var eiArr = [];
			
			var json = {};
			json.code = "recommendNum";
			json.name = "推荐家数";
			json.data = rn;
			eiArr.push(json);
			json = {};
			json.name = "成功家数";
			json.code = "successNum";
			json.data = sn;
			eiArr.push(json);
			jsonD.arr = eiArr;
			
			EIDData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询融资排行
 */
function findFinanceRanking(){
	$.axs("/betaInvest/rankingList/findFinanceRanking.do",
			{industryId:industryId,dateType:dateType,orderColumn:orderColumn},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var sa = []; //融资总金额
			var at = []; //融资总次数
			var scSN = []; //股票代码与名称
			$(result).each(function(){
				sa.push((this.sumAmount == null ? "" : this.sumAmount.toFixed(2)));
				at.push(this.amountTotal);
				scSN.push(this.stockName + "("+this.stockCode+")");
			})
			var jsonD = {"date":scSN};
			var frArr = [];
			
			var json = {};
			json.code = "sumAmount";
			json.name = "融资总金额";
			json.data = sa;
			frArr.push(json);
			json = {};
			json.code = "amountTotal";
			json.name = "融资总次数";
			json.data = at;
			frArr.push(json);
			jsonD.arr = frArr;
			
			frData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询投资排行
 */
function findInvestRanking(){
	$.axs("/betaInvest/rankingList/findInvestRanking.do",
			{investorsType:investorsType,dateType:dateType,orderColumn:orderColumn},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var it = []; //投资事件总数
			var is = []; //投资总金额
			var scSN = []; //股票代码与名称
			$(result).each(function(){
				it.push(this.investTotal);
				is.push((this.investSum == null ? "" : this.investSum.toFixed(2)));
				scSN.push(this.stockName + "("+this.stockCode+")");
			})
			var jsonD = {"date":scSN};
			var firArr = [];
			
			var json = {};
			json.code = "investTotal";
			json.name = "投资事件总数";
			json.data = it;
			firArr.push(json);
			json = {};
			json.code = "investSum";
			json.name = "投资总金额";
			json.data = is;
			firArr.push(json);
			jsonD.arr = firArr;
			
			firData = jsonD;
			
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询交易排行
 */
function findBtTradingWas(){
	$.axs("/betaInvest/shareIndex/findBtTradingWas.do",
			{industryId:industryId,dateType:dateType,orderColumn:orderColumn},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var op = []; //开盘价
			var cp = []; //收盘价
			var map = []; //最高价
			var mip = []; //最低价
			var da = []; //成交量
			var ds = []; //成交额
			var ca = []; //涨跌额
			var pl = []; //涨跌幅
			var gc = []; //总股本(万股)
			var tv = []; //总市值(万元)
			
			var scSN = []; //股票代码与名称
			$(result).each(function(){
				op.push((this.openinPprice == null ? "" : this.openinPprice.toFixed(2)));
				cp.push((this.closingPrice == null ? "" : this.closingPrice.toFixed(2)));
				map.push((this.maxPrice == null ? "" : this.maxPrice.toFixed(2)));
				mip.push((this.minPrice == null ? "" : this.minPrice.toFixed(2)));
				da.push((this.dealAmount == null ? "" : this.dealAmount.toFixed(2)));
				ds.push((this.dealSum == null ? "" : this.dealSum.toFixed(2)));
				ca.push((this.changeAmount == null ? "" : this.changeAmount.toFixed(2)));
				pl.push((this.priceLimit == null ? "" : this.priceLimit.toFixed(2)));
				gc.push((this.generalCapital == null ? "" : this.generalCapital.toFixed(2)));
				tv.push((this.totalValue == null ? "" : this.totalValue.toFixed(2)));
				scSN.push(this.stockName + "("+this.stockCode+")");
			})
			var jsonD = {"date":scSN};
			var bwArr = [];
			
			var json = {};
			json.code = "opening_price";
			json.name = "开盘价";
			json.data = op;
			bwArr.push(json);
			json = {};
			json.code = "closing_price";
			json.name = "收盘价";
			json.data = cp;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "max_price";
			json.name = "最高价";
			json.data = map;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "min_price";
			json.name = "最低价";
			json.data = mip;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "deal_amount";
			json.name = "成交量（万股）";
			json.data = da;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "deal_sum";
			json.name = "成交额（万元）";
			json.data = ds;
			bwArr.push(json);
			jsonD.arr = bwArr;
			
			json = {};
			json.code = "change_amount";
			json.name = "涨跌额";
			json.data = ca;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "price_limit";
			json.name = "涨跌幅";
			json.data = pl;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "general_capital";
			json.name = "总股本";
			json.data = gc;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "total_value";
			json.name = "总市值";
			json.data = tv;
			bwArr.push(json);
			jsonD.arr = bwArr;
			
			bwData = jsonD;
			
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}


/**
 * 查询财务指标
 */
function findFinancialData(){
	$.axs("/betaInvest/shareIndex/findFinancialData.do",
			{stockCode:stockCode,dateType:dateType,financeIndicatorIds:financeIndicatorIds/*fids.substring(0, fids.length - 1)*/},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var jsonD = {};
			var dateTime = []; //日期集合
			var fdArr = [];
			var leibie_zhibiao_data={}; //{指标名称:数据,指标名称:数据}
			var fsplit = financeIndicatorIds.split(",");
			$(fsplit).each(function(){
//				console.log(this)
				leibie_zhibiao_data[this] = [];
			})
			$(result).each(function(i,obj){
				var reportPeriod = obj.reportPeriod;
				if(reportPeriod.indexOf("FY") > -1){
					reportPeriod=reportPeriod.substring(0,4)+"-12";
				}else if(reportPeriod.indexOf("HY") > -1){
					reportPeriod=reportPeriod.substring(0,4)+"-06";
				}
				dateTime.push(reportPeriod);
				
				for(var column in obj){ //column就是指标名
					if(leibie_zhibiao_data[column]!=undefined){
						leibie_zhibiao_data[column].push(obj[column]);
					}
				}
//				fdArr.push(leibie_zhibiao_data);
			})
			var allZBName = {};
			$(allZB).each(function(){
//				console.log(this)
				allZBName[this.dataParam] = this.name;
			})
			for (var i = 0; i < fsplit.length; i++) {
				var json={};
//				console.log(leibie_zhibiao_data[fsplit[i]])
				var dd=leibie_zhibiao_data[fsplit[i]];
				json.code = fsplit[i];
				json.name=allZBName[fsplit[i]];
				json.data=dd;
				fdArr.push(json);
			}
			
//			console.log(fdArr)
			
			jsonD.date = dateTime;
			jsonD.arr = fdArr;
			
			zbData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 显示表格
 */
function showTable(tableData, isLoadSXS){
	
	var showColumns = "";
	if(columns != null && columns != ""){
		showColumns = columns;
	}
	if(orderColumn != null && orderColumn != ""){
		showColumns = orderColumn;
	}
	if(financeIndicatorIds != null && financeIndicatorIds != ""){
		showColumns = financeIndicatorIds;
	}
	
	var split = showColumns.split(",");
	
	var bodyHtml = "";
	var zwsjFlag = true;

//	console.log(zwsjFlag)

	$(tableData.arr).each(function(index, item){
		$(split).each(function(){
			if(item.code == this){
				bodyHtml += "<tr>";
				$(item.data).each(function(index, itemd){
					zwsjFlag = false;

					bodyHtml += "<td>"+ (itemd == null ? "--" : itemd) +"</td>";
				})
					bodyHtml += "</tr>";
			}
		})
	})
	$("#dataTbody").html(bodyHtml);

	if(zwsjFlag){
		$(".t_left, .t_r").hide();
		$(".tongzhi_zanwu_shuju1").show();
	}else{
		$(".t_left, .t_r").show();
		$(".tongzhi_zanwu_shuju1").hide();
		var zbHtml = "";
		$(tableData.arr).each(function(i, item){
			$(split).each(function(){
				if(item.code == this){
					zbHtml += "<tr><td title='"+ item.name +"'>" + item.name + "</td></tr>";
				}
			})
		})
		$("#zbmcTable").html(zbHtml);
		
		var headHtml = "";
		$(tableData.date).each(function(i, item){
			headHtml += "<th>" + item + "</th>";
		})
		$("#dataTHead").html("<tr>"+ headHtml +"</tr>");
	}
	
	if(isLoadSXS != 1){
		var sxHtml = "";
		$(tableData.arr).each(function(index, item){
			$(split).each(function(){
				if(item.code == this){
					sxHtml += "<div class='tubiao_leixing'>"
						+"<h2 data-code="+item.code+" >"+item.name+"</h2>"
						+"<input type='text' placeholder='指标别名'/>"
						+"<div class='tuxing_types'>"
						+"<div class='fl lr_zhex type_public "+((lineColumns != '' && lineColumns != null) ? ((lineColumns.indexOf(item.code) > -1) ? 'on' : '') : '')+"'>"
						+"<i></i>"
						+"<em>折线</em>"
						+"<div class='clr'></div>"
						+"</div>"
						+"	<div class='fl lr_zhux type_public "+((ZXColumns != '' && ZXColumns != null) ? ((ZXColumns.indexOf(item.code) > -1) ? 'on' : '') : '')+"'>"
						+"		<i></i>"
						+"		<em>柱形</em>"
						+"		<div class='clr'></div>"
						+"	</div>"
						+"	<div class='fl lr_mianj type_public "+((MJColumns != '' && MJColumns != null) ? ((MJColumns.indexOf(item.code) > -1) ? 'on' : '') : '')+"'>"
						+"		<i></i>"
						+"		<em>面积</em>"
						+"		<div class='clr'></div>"
						+"	</div>"
						+"	<div class='clr'></div>"
						+"</div>"
						+"</div>";
				}
			})
		})
		$(".shuxing_shezhi .tubiao_leixing").remove();
		$(".shuxing_shezhi").append(sxHtml);
		
		var width=$(".bianji_tb").width()-308;
		$(".t_r").css("width",width);
		
		$(".tubiao_leixing .type_public").on("click",function(){
			editChartShowType(this);
		})
		$("#zbmcTable tr").hover(function(){
			var index=$(this).index();
		$("#dataTbody tr").eq(index).addClass("on");
		}).mouseout(function(){
			$("#dataTbody tr").removeClass("on");
		})
		$("#dataTbody tr").hover(function(){
			var index=$(this).index();
		$("#zbmcTable tr").eq(index).addClass("on");
		}).mouseout(function(){
			$("#zbmcTable tr").removeClass("on");
		})
		//修改指标别名
		$(".tubiao_leixing input").blur(function(){
			editZBBName(this);
		})
	}
	
}

//折线图,柱状图，面积图
function drawLine(chartData,showLineColumns,showZXColumns,showAreaColumns){
	console.log(chartData)
	var showBFB = 100;
	if(chartData.date.length != 0 && chartData.date != null){
		showBFB = (10/chartData.date.length)*100;
	}
//          郭建杰7月12号修改滚动条起始值
	if(showBFB=100){
		showBFB=showBFB-8;
	}
	var myChart = echarts.init(document.getElementById('bj_tub'));
	var color=['#64a4f2', '#36b8f4','#41ccdc','#feb535','#fd865b','#f36c77'];
	option = {
		animation:false,
		color: color,
		/*legend: {
			data: [],
			top: '10px'

		},*/
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true,
					title:'保存图片',
	        icon:'image:///saasBeta/images/ave.png'

				}
			},
			top: '10px'
		},
		tooltip: {
			show:true,
        	trigger:'axis',
			formatter:function(params){
				//console.log(params)
				//7月4号玲修改提示弹窗start
				var content='';
				$(params).each(function(index,item){
//					var yushu=index%params.length;
					var bg=color[index];
					//console.log(item)
					content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bg+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+ ((item.data == undefined || item.data == null || item.data == undefined || (item.data == "" && item.data != 0)) ? "--" : item.data) +'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
					
				});
				var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
	    			return divHtml;
			}
			//7月4号玲修改提示弹窗end
		},
		dataZoom: [{
            show: true,
            realtime: true,
//          郭建杰7月12号修改滚动条起始值
            start: 8,
            end: showBFB
        },
        {
            type: 'inside',
            realtime: true,
//          郭建杰7月12号修改滚动条起始值
            start: 8,
            end: showBFB
        }],
		xAxis: [{
			type: 'category',
			data: chartData.date,
			boundaryGap : true,
			show : true,  
			axisLabel:{ //wtl 7.6  3118 所有系统只带公司简称的都需要加链接包括柱形图下面的
	            interval:0,
	            clickable:true
	        },
			triggerEvent:true
		}],
		yAxis: [{
			type: 'value',
			name: '',
			axisLabel: {
				formatter: '{value}'
			}
		}],
		grid: {
			left: '1%',
			right: '1%',
			containLabel: true
		},
		series: [/*{
			name: '净利润金额(万)',
			type: 'line',
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			//data:tradingVolume
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			}
		},{
			name: '净利润金额(万)',
			type: 'line',
			data: [3, 5.9, 5.0, 17.2, 23.6, 56.7, 112.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			//data:tradingVolume
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			}
		}*/]
	};
	var legendDataArr = []; //显示的legend
	if(showLineColumns != "" && showLineColumns != null){ //折线图
		var showLineArr = showLineColumns.split(",");
		$(chartData.arr).each(function(index, lineItem){
			$(showLineArr).each(function(){
				if(this == lineItem.code){
					for (var int = 0; int < lineItem.data.length; int++) {
						lineItem.data[int] = (lineItem.data[int] == null ? 0 : lineItem.data[int]);
					}
					var serData = {
							name: lineItem.name,
							type: 'line',
							symbol: 'circle',
							data: lineItem.data,
							//data:tradingVolume
							label: {
								normal: {
									show: true,
									position: 'top',
				            		formatter:function(param){
				            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
				            		}
								}
							}
							
						};
					option.series.push(serData);
					legendDataArr.push(lineItem.name);
				}
			})
		})
	}
	if(showZXColumns != "" && showZXColumns != null){ //柱形图
		var showZXArr = showZXColumns.split(",");
		$(chartData.arr).each(function(index, zxItem){
			$(showZXArr).each(function(){
				if(this == zxItem.code){
					for (var int = 0; int < zxItem.data.length; int++) {
						zxItem.data[int] = (zxItem.data[int] == null ? 0 : zxItem.data[int]);
					}
					var serData = {
							name: zxItem.name,
							type: 'bar',
							barWidth:'30',
							data: zxItem.data,
							//data:tradingVolume
							label: {
								normal: {
									show: true,
									position: 'top',
				            		formatter:function(param){
				            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
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
						};
					option.series.push(serData);
					legendDataArr.push(zxItem.name);
				}
			})
		})
	}
	if(showAreaColumns != "" && showAreaColumns != null){ //面积图
		var showAreaArr = showAreaColumns.split(",");
		$(chartData.arr).each(function(index, areaItem){
			$(showAreaArr).each(function(){
				if(this == areaItem.code){
					for (var int = 0; int < areaItem.data.length; int++) {
						areaItem.data[int] = (areaItem.data[int] == null ? 0 : areaItem.data[int]);
					}
					var serData = {
				            name:areaItem.name,
				            type:'line',
				            smooth:true,
				            symbol: 'none',
				            sampling: 'average',
				            itemStyle: {
				                normal: {
				                    color: 'rgb(255, 70, 131)'
				                }
				            },
				             itemStyle:{
				            	normal:{
				            		color:"#36b8f4"
				            	}
				            },
				            areaStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgb(255, 158, 68)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 70, 131)'
				                    }])
				                }
				            },
				            data: areaItem.data
				        };
					option.series.push(serData);
					legendDataArr.push(areaItem.name);
				}
			})
		})
	}
	var legend = {     
					top: '10px',
					data:legendDataArr
				 };
	option.legend = legend;
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});
	
	imageUrl = myChart.getDataURL("png");
//	console.log(imageUrl)
	//wtl 7.6  3118 所有系统只带公司简称的都需要加链接包括柱形图下面的
	myChart.on('click', function (params) {
		if(params.componentType == "xAxis"){
			var pv = params.value;
			if(pv != "" && pv != null){
				if(pv.indexOf("(") > -1 && pv.indexOf(")") > -1){
					var stockName = pv.substring(0, pv.indexOf("("));
					var stockCode = pv.substring(pv.indexOf("(") + 1, pv.indexOf(")"));
					location.href = "/businessDetails/newTBindex.html?stockCode="+stockCode+"&stockName="+stockName;
				}
			}
		}
    });
}

//添加图表
function addBtUserStudyChart(businessUrl){
	$.axs("/betaInvest/btUserStudyChart/addBtUserStudyChart.do",
			{chartId:chartId,categoryId:categoryId1,chartName:$("#chartTitle").val(),remark:$("#chartRemark").text(),imageUrlBase:imageUrl,
		stockCode:stockCode,stockName:stockName,businessUrl:businessUrl},
			false,function(data){
		if(data.retCode=="0000"){
			businessUrl = businessUrl.substring(0, businessUrl.indexOf("&ZBQDATA"));
			businessUrl += "&chartId=" + data.retData;
			$(".tips_shanchu").show();
			$(".tub_tc").show();
			$(".fenlei_tc").hide();
			//确定
			$(".bianji_tub").click(function(){
				location.href = "newschartPreview.html" + businessUrl;
			})
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//根据图表id查询URL
function findURLById(){
	var zbd = "";
	$.axs("/betaInvest/btUserStudyChart/findUrlById.do",
			{chartId:chartId}, false,function(data){
		if(data.retCode=="0000"){
			var reg = new RegExp("(^|&)ZBQDATA=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
			var r = data.retData.businessUrl.substr(1).match(reg); // 匹配目标参数
			if(r != null)
				zbd = decodeURIComponent(r[2]);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return encodeURI(zbd);
}

//添加我的分类
function addUserCategory(){
	var categoryName=$("#categoryName").val();
	if(categoryName==null || categoryName==""){
		errorAlert("","请添加分类信息!");
		return false;
	}
	$.axs("/betaInvest/btUserCategory/addUserCategory.do",{categoryName:categoryName},false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			findUserCategory();
			$(".tub_tc").hide();
			$(".biaji_tc").hide();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

/**
 * 通过URL获取参数值
 */
function getParamByUrl(paramName){
	var param = "";
	var reg = new RegExp("(^|&)"+paramName+"=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if(r != null){
		param = decodeURIComponent(r[2]);
	}
	param = encodeURI(param);
	return param;
}
