var columns = ""; //指标code

var dateType = ""; //选择时间类型
var stockCode = ""; //股票代码
var stockName = ""; //股票名称

//图形显示字段
var ZXColumns = ""; //柱形图字段
var lineColumns = ""; //折线图字段
var MJColumns = ""; //面积图字段

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
var allZBName = {};// {code:value}所有指标
var  YXZB=[]; //已选指标data-param集合
var  YXZBNAME=[]; //已选指标名集合
var myChart = echarts.init(document.getElementById('bj_tub'));

//**************新的指标增加变量开始*****************
var indexCodes = decodeURI(getParamByUrl("indexCode")).split(","); //获取指标选取idupdate**
var dataDateType = "D"; //数据的最小统计单位
var XZSJArr = ["周,近一周","月,近一月","季,近三月","半年,近半年","1年,近一年","2年,近2年","3年,近3年","5年,近5年"]; //选择时间数组
var businessTypes = ""; //需要查询的接口
var showTData = {}; //查询数据的结果


/*class_115 新三板-完成发行均价（周，均值，元）
class_124 新三板-完成发行均价（月，均值，元）
class_142	新三板-日均成交金额（月，均值，百万元）
class_143	新三板-日均成交数量（月，均值，百万股）
class_148	新三板-全-净利润同比增速
class_151	新三板-全-毛利率同比增速
class_154	新三板-全-营业收入同比增速
ZDF	新三板-做市指数-涨跌幅（日，%）
ZDF	新三板-成份指数-涨跌幅（日，%）
ZDF	涨跌幅（日，%）
class_222	十大股东持股占总股本的比例（报告期，%）
class_225	主营业务收入占比（报告期，%）
class_227	主要供应商采购金额占比（报告期，%）
class_230	员工总人数同比变化率（报告期）
class_232	董监高成员持股占总股本的比例（报告期）
class_234	董事会成员持股占总股本的比例（报告期）
class_236	监事会成员持股占总股本的比例（报告期）
class_238	高级管理人员持股占总股本的比例（报告期）*/
var yRColumnArr = [ "class_115", "class_124", "class_142", "class_143",
		"class_148", "class_151", "class_154", "ZDF", "class_222", "class_225",
		"class_227", "class_230", "class_232", "class_234", "class_236",
		"class_238" ]; // 多个的时候需要显示在y轴的右边的数据

var bfhColumnArr = [ "ZDF", "class_222", "class_225", "class_227", "class_232",
		"class_234", "class_236", "class_238", "class_230",
		"sudongbilv_zidingyidecaiwuzhibiao",
		"liudongbilv_zidingyidecaiwuzhibiao" ]; // 需要数据加百分号的
//***************结束****************
$(function(){
	findUserCategory(); //查询图表分类
	columns = /*"class_136"*/decodeURI(getParamByUrl("indexCode"));//update**
	dateType = decodeURI(getParamByUrl("dateType"));
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
//	console.log(ZBSZ)
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
		lineColumns = columns;
	}

	//判断请求的接口
	judgeRequest((dateType == null || dateType == "") ? "init" : "");
	
	//点击新建分类的确定按钮
	$(".biaji_tc .fenlei_qx,.xin_tc_shanchu").on("click",function(){
		$(".tub_tc2").hide();
		$(".biaji_tc").hide();
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
		
		$("#yxNumber").html("已选指标（"+yxnumber+"/2）");
		
		lineColumns = lineColumns.substring(0, lineColumns.length - 1);
		columns = lineColumns;
		
		//新的指标代码
		if(lineColumns == ""){
			indexCodes = [];
		}else{
			indexCodes = lineColumns.split(",");
		}
		judgeRequest(""); //测试
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
		/*var zbText = "";
		$("#xuanh_zb").children("a").each(function(){
			zbText += $(this).attr("title") + ",";
		})*/
		businessUrl = "?stockCode="+stockCode+"&stockName="+stockName+ "&chartMS=" + encodeURI($("#chartRemark").val()) + "&indexCode=" + columns + "&dataDateType=" + dataDateType + "&businessTypes=" + businessTypes + 
						"&dateType=" + dateType + "&ZXColumns=" + ZXColumns + "&lineColumns=" + lineColumns + "&MJColumns=" + MJColumns + "&chartName=" + encodeURI($("#chartTitle").val()) + 
						"&ZBQDATA=" + encodeURI(JSON.stringify(ZBSZ));
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
	
//郭建杰 7.12换成按钮触发查询 star
	$("#timeSearch").on("click",function(){
		if($("#startTime").val() != ""){
				if($("#endTime").val() != ""){
					/*if(){
						
					}*/
					var startTime = new Date(Date.parse($.trim($("#startTime").val())));
					var endTime = new Date(Date.parse($.trim($("#endTime").val())));
					if(endTime > startTime){
						dateType = $.trim($("#startTime").val()) + "," + $.trim($("#endTime").val());
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
//	郭建杰7.14 编辑图表右侧收缩js star
var minHeight=$(window).height();
$(".bianji_content").css("min-height",minHeight)
$(".sq_btn").click(function(){
	//是展开的状态
	if($(this).hasClass("open")){
		$(this).removeClass("open");
		$(".zhibiao_datas").css("padding-right","435px");
		$(".zhibaio_types").css("right","30px");
		$(".bianji_tb,.f_bg").css("width","705px");
		var width=$(".bianji_tb").width()-355;
		$(".t_r").css("width",width);
		setTimeout(myChart.resize,300);
//		myChart.resize();
	}else{
		$(this).addClass("open");
		$(".zhibiao_datas").css("padding-right","30px");
		$(".bianji_tb,.f_bg").css("width","1100px");
		$(".zhibaio_types").css("right","-400px");
		setTimeout(myChart.resize,300);
		var width=$(".bianji_tb").width()-355;
		$(".t_r").css("width",width);
		
		
	}
})
//	郭建杰7.14 编辑图表右侧收缩js end
	
	
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
	var  kexuanNumber=2;
	var zbList = ZBSZ;
	setXZSJ(zbList); //设置显示选择时间段按钮
	var ZBhtml = "";
	$(zbList).each(function(j, item){ //添加上级指标
		if(item.isIndex == 0){
			if(j != 0){
				ZBhtml+='<ul class="zb_public" style="display: block;">';
				ZBhtml+='<li title='+item.className+' >';
				ZBhtml+='<span class="tree_node on">'+item.className+'</span>';
			}else{
				ZBhtml+='<li class="zb_public " style="display: block;">';
				ZBhtml+='<span class="tree_node on">'+item.className+'</span>';
			}
		}else{
			businessTypes = item.businessTypes;
			$(indexCodes).each(function(i, code){ //添加选中的code和name到集合
				if(item.classValue == code){
					YXZB.push(code);
					YXZBNAME.push(item.className);
				}
			})
			allZBName[item.classValue] = item.className;
		}
	})
	ZBhtml+='<ul class="zb_public seacher" style="display: block;">';
	$(zbList).each(function(j, item){ //添加末级指标
		if(item.isIndex == 1){
			var xg = "";
			$(indexCodes).each(function(i, code){ //判断否添加选中效果
				if(item.classValue == code){
					xg = "on";
				}
			})
			ZBhtml+='<li title='+item.className+' >';
			ZBhtml+='<div class="data-checkbox" data-param='+item.classValue+'>';
			ZBhtml+='<input type="checkbox" />';
			ZBhtml+='<label class="checkbox '+xg+'"></label>';
			ZBhtml+='<label class="checkboxWord '+xg+'">'+(item.className.length > 13 ? (item.className.substring(0,13) + "...") : item.className)+'</label>';
			ZBhtml+='</div>';
			ZBhtml+='</li>';
		}
	})
	ZBhtml+='</ul>';
	for(var g = 0; g < indexCodes.length-2; g++){
	ZBhtml+='</li>'; 
	ZBhtml+='</ul>';	
	}
	ZBhtml+='</li>'; 
   $("#zb_list").html(ZBhtml);
   
//	已选指标回显
	var yxHtm='';//已选指标标签
	$("#yxNumber").html("已选指标（"+YXZBNAME.length+"/"+kexuanNumber+"）");
	for(var f=0;f<YXZBNAME.length;f++){
		yxHtm+='<a href="javascript:;" data-param='+YXZB[f]+' title='+YXZBNAME[f]+'>'+(YXZBNAME[f].length > 7 ? (YXZBNAME[f].substring(0,7) + "...") : YXZBNAME[f])+'<i></i></a>';
	}
	$("#xuanh_zb").html(yxHtm);
	
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
			var  checkword =$(this).parent().parent().attr("title");
			yxHtml+='<a href="javascript:;" data-param='+dataParam+' title='+checkword+'>'+(checkword.length > 7 ? (checkword.substring(0,7) + "...") : checkword)+'<i></i></a>';
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
//		console.log(lineColumns)
		
		columns = lineColumns;
		if(lineColumns == ""){
			indexCodes = [];
		}else{
			indexCodes = lineColumns.split(",");
		}
		judgeRequest("");
	});
}

/**
 * 设置选择时间段按钮
 */
function setXZSJ(data){
	dataDateType = data[data.length - 1].dataDateType;
	var beginIndex = 0;
	if(dataDateType == "W"){ //周
		beginIndex = 1;
	}else if(dataDateType == "M"){ //月
		beginIndex = 2;
	}else if(dataDateType == "H"){ //半年
		beginIndex = 4;
	}else if(dataDateType == "Y"){ //年
		beginIndex = 5;
	}
	
	for (var i = beginIndex; i < XZSJArr.length; i++) {
		if(dateType != null && dateType != "" && dateType != undefined){
			$(".time_list").append("<a href='javascript:;' class="+(dateType == (XZSJArr[i].split(",")[0]) ? "on" : "")+" title="+XZSJArr[i].split(",")[1]+">"+XZSJArr[i].split(",")[0]+"</a>");
		}else{
			$(".time_list").append("<a href='javascript:;' class="+(i == beginIndex ? "on" : "")+" title="+XZSJArr[i].split(",")[1]+">"+XZSJArr[i].split(",")[0]+"</a>");
		}
	}
	
	//点击事时间中的a
	$(".time_list a").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		$("#startTime, #endTime").attr("value", "");
		dateType = $(this).text();
		judgeRequest("");
	})
	
}

/**
 * 修改指标别名
 * @param thiz
 */

function editZBBName(thiz){
	var flag = false;
	if($.trim($(thiz).val()) != ""){
		
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
	
//	console.log(lineColumns+"===="+ ZXColumns+"=="+ MJColumns)
	drawLine(showTData, lineColumns, ZXColumns, MJColumns);
}

//请求接口
function judgeRequest(reqType){
	if(dateType != null && dateType != ""){
		if(dateType.indexOf(",") > -1){
			$("#startTime").attr("value", dateType.split(",")[0]);
			$("#endTime").attr("value", dateType.split(",")[1]);
			$(".time_list a").removeClass("on");
		}
	}

	if(reqType == "init"){
		if(dataDateType == "D"){ //天
			dateType = "周";
		}else if(dataDateType == "W"){ //周
			dateType = "月";
		}else if(dataDateType == "M"){ //月
			dateType = "季";
		}else if(dataDateType == "H"){ //半年
			dateType = "1年";
		}else if(dataDateType == "Y"){ //年
			dateType = "2年";
		}
		
		$(".time_list").children("a").removeClass("on");
		$(".time_list").children().eq(0).addClass("on");
		$("#startTime").attr("value", "");//开始结束值去掉
		$("#endTime").attr("value", "");//开始结束值去掉
	}
	
	var nowTemp = new Date();
    var nowDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).valueOf();
    var nowMoth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).valueOf();
    var nowYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf();
//    console.log(nowTemp.getFullYear())
//    console.log(nowTemp.getMonth())
	//设置插件显示类型
	if(dataDateType == "W" || dataDateType == "M"){
		$("#startTime").attr("data-am-datepicker", "{format: 'yyyy-mm', viewMode: 'months', minViewMode: 'months'}");
		$("#endTime").attr("data-am-datepicker", "{format: 'yyyy-mm', viewMode: 'months', minViewMode: 'months'}");
		if(reqType == "init"){
			if(dataDateType == "M"){
				if(nowTemp.getMonth() < 10){
					$("#startTime").attr("value", nowTemp.getFullYear() + "-0" + nowTemp.getMonth());
					$("#endTime").attr("value", nowTemp.getFullYear() + "-0" + nowTemp.getMonth());
				}else{
					$("#startTime").attr("value", nowTemp.getFullYear() + "-" + nowTemp.getMonth());
					$("#endTime").attr("value", nowTemp.getFullYear() + "-" + nowTemp.getMonth());
				}
			}
		}
	}else if(dataDateType == "H" || dataDateType == "Y"){
		$("#startTime").attr("data-am-datepicker", "{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}");
		$("#endTime").attr("data-am-datepicker", "{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}");
	}
	
    var $myStart2 = $("#startTime");
//    console.log(dataDateType)
    var checkin = $myStart2.datepicker({
      onRender: function(date, viewMode) {
        // 默认 days 视图，与当前日期比较
        var viewDate = nowDay;
        switch (viewMode) {
          // moths 视图，与当前月份比较
          case 1:
            viewDate = nowMoth;
            break;
          // years 视图，与当前年份比较
          case 2:
            viewDate = nowYear;
            break;
        }

        if(dataDateType == "W"){
        	return date.valueOf() > viewDate ? 'am-disabled' : '';
        }
        return date.valueOf() >= viewDate ? 'am-disabled' : '';
      }
    }).on('changeDate.datepicker.amui', function(ev) {
        checkin.close();
    }).data('amui.datepicker');

    var checkout = $("#endTime").datepicker({
      onRender: function(date, viewMode) {
        // 默认 days 视图，与当前日期比较
    	  var viewDate = nowDay;
        switch (viewMode) {
          // moths 视图，与当前月份比较
          case 1:
            viewDate = nowMoth;
            break;
          // years 视图，与当前年份比较
          case 2:
            viewDate = nowYear;
            break;
        }
        if(dataDateType == "W"){
        	return date.valueOf() > viewDate ? 'am-disabled' : '';
        }
        return date.valueOf() >= viewDate ? 'am-disabled' : '';
      }
    }).on('changeDate.datepicker.amui', function(ev) {
      checkout.close();
    }).data('amui.datepicker');
    
    if(reqType == "init"){
    	if(dataDateType == "W" || dataDateType == "M"){
        	$("#startTime").attr("value", "");
        	$("#endTime").attr("value", "");
        }
    }
	findZBData();
}

/**
 * 查询指标数据
 */
function findZBData(){
	var codes = "";
	$(indexCodes).each(function(i, item){
		codes += item + ",";
	})
	if(codes != ""){
		codes = codes.substring(0, codes.length - 1);
	}
	$.axs("/betaInvest/btStockIndex/findStockIndexData.do",
			{indexIds:codes, stockCode:stockCode, dataDateType:dataDateType, businessTypes:businessTypes, dateType:dateType},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
//			if(result==null){
//				
//				return false;
//			}
			var jsonD = {};
			var xShowData = []; //X轴集合
			var fdArr = []; //数据集合
			var leibie_zhibiao_data={}; //{指标名称:数据,指标名称:数据}
			$(indexCodes).each(function(){ //先将选中的添加进去值为空
				leibie_zhibiao_data[this] = [];
			})
			$(result).each(function(i,obj){
				var xShow = obj.dataDateValue; //时间字段按照返回的字段名改
				if(dataDateType == "W"){
					xShowData.push(xShow + "W");
				}else{
					xShowData.push(xShow);
				}
				
				for(var column in obj){ //column就是指标名
					if(leibie_zhibiao_data[column]!=undefined){
						leibie_zhibiao_data[column].push(obj[column]);
					}
				}
			})
			
			for (var i = 0; i < indexCodes.length; i++) {
				var json={};
				var dd = leibie_zhibiao_data[indexCodes[i]];
				json.code = indexCodes[i];
				json.name=allZBName[indexCodes[i]];
				json.data=dd;
				fdArr.push(json);
			}
			
			jsonD.date = xShowData;
			jsonD.arr = fdArr;
			
			showTData = jsonD;
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
//	console.log(tableData)
	var showColumns = "";
	showColumns = columns;
	
	var split = showColumns.split(",");
	 
	var bodyHtml = "";
	var zwsjFlag = true;

	$(tableData.arr).each(function(index, item){
		$(split).each(function(){
			if(item.code == this){
				bodyHtml += "<tr>";
				$(item.data).each(function(index, itemd){
					zwsjFlag = false;
					var str = "";
					if($.inArray(item.code,bfhColumnArr) > -1){
						str = "%";
					}
					bodyHtml += "<td>"+ ((itemd == null || (itemd == "" && itemd != 0)) ? "--" : (itemd.toFixed(2) + str)) +"</td>";
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
		if(!zwsjFlag){
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
		}
		$(".shuxing_shezhi .tubiao_leixing").remove();
		$(".shuxing_shezhi").append(sxHtml);
		
		var width=$(".bianji_tb").width()-355;
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
	myChart = echarts.init(document.getElementById('bj_tub'));
	var showBFB = 100;
	if(chartData.date.length != 0 && chartData.date != null){
		showBFB = (8/chartData.date.length)*100;
	}
//          郭建杰7月12号修改滚动条起始值
	if(showBFB == 100){
		showBFB=showBFB-8;
	}
	
	var color=['#64a4f2', '#36b8f4'];
	var option = myChart.getOption();
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
			top: '30px',
			right:'5%'
		},
		tooltip: {
			show:true,
        	trigger:'axis',
			formatter:function(params){
				//console.log(params)
				var content='';
				$(params).each(function(index,item){
					var str = "";
					
					if(item.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || item.seriesName.indexOf("%") > -1 || item.seriesName.indexOf("比例") > -1 || item.seriesName.indexOf("比率") > -1){
						str = "%";
					}
//					var yushu=index%params.length;
					var bg=color[index];
					content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bg+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+ ((item.data == undefined || item.data == null || item.data == undefined || (item.data == "" && item.data != 0)) ? "--" : ((item.data).toFixed(2) + str)) +'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
					
				});
				var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
	    			return divHtml;
			}

		},
		dataZoom: [{
            show: true,
            realtime: true,
//          郭建杰7月12号修改滚动条起始值
            start: 0,
            end: showBFB
        },
        {
            type: 'inside',
            realtime: true,
//          郭建杰7月12号修改滚动条起始值
            start: 0,
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
	option.series = [];
	var legendDataArr = []; //显示的legend
	if(showLineColumns != "" && showLineColumns != null){ //折线图
		var showLineArr = showLineColumns.split(",");
//		console.log(showLineArr)
		$(chartData.arr).each(function(index, lineItem){
//			console.log(showLineArr)
			$(showLineArr).each(function(){
//				console.log(this + "=====" + lineItem.code)
				if(this == lineItem.code){
					for (var int = 0; int < lineItem.data.length; int++) {
						lineItem.data[int] = (lineItem.data[int] == null ? 0 : lineItem.data[int]);
					}
					var serData = {
							name: lineItem.name,
							type: 'line',
							symbol: 'circle',
							data: lineItem.data,
							yAxisIndex:0,
							label: {
								normal: {
									show: true,
									position: 'top',
				            		formatter:function(param){
				            			var str = "";
				    					
				    					if(param.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || param.seriesName.indexOf("%") > -1 || param.seriesName.indexOf("比例") > -1 || param.seriesName.indexOf("比率") > -1){
				    						str = "%";
				    					}
				            			return ((param.data == 0.00 || param.data == 0) ? "" : ((param.data).toFixed(2)) + str);
				            		}
								}
							}
							
						};
					
					if(($.inArray(lineItem.code,yRColumnArr)>-1) && (indexCodes.length > 1)){ //将指定的指标用y轴的右侧
						serData["yAxisIndex"] = 1;
						option.yAxis.push({
										type: 'value',
										name: '',
										axisLabel: {
											formatter: '{value}'
										}
									});
					}
					
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
							yAxisIndex:0,
							//data:tradingVolume
							label: {
								normal: {
									show: true,
									position: 'top',
				            		formatter:function(param){
				            			var str = "";
				    					if(param.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || param.seriesName.indexOf("%") > -1 || param.seriesName.indexOf("比例") > -1 || param.seriesName.indexOf("比率") > -1){
				    						str = "%";
				    					}
				            			return ((param.data == 0.00 || param.data == 0) ? "" : ((param.data).toFixed(2)) + str);
				            		}
								}
							}						
						};
					
					if(($.inArray(zxItem.code,yRColumnArr)>-1) && (indexCodes.length > 1)){ //将指定的指标用y轴的右侧
						serData["yAxisIndex"] = 1;
						option.yAxis.push({
										type: 'value',
										name: '',
										axisLabel: {
											formatter: '{value}'
										}
									});
					}
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
				            yAxisIndex:0,
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
					
					if(($.inArray(areaItem.code,yRColumnArr)>-1) && (indexCodes.length > 1)){ //将指定的指标用y轴的右侧
						serData["yAxisIndex"] = 1;
						option.yAxis.push({
										type: 'value',
										name: '',
										axisLabel: {
											formatter: '{value}'
										}
									});
					}
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

/**
 * 获取指标列表(通过最后一级指标的id)
 */
function findZBList(){
	var zbArr = []; //所有指标的集合
	$.axs("/betaInvest/btIndexClass/findIndexOrParent.do",{indexId:"101710101014"},false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			zbArr = result;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
	return zbArr;
}