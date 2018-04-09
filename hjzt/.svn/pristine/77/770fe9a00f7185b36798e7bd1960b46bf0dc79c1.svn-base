
$(function(){
	//绑定下拉框单击事件
	$("#selectUrl").find("li").on("click",function(){
		window.location.href=$(this).find("a").eq(0).attr("href");
	});
	//初始化对比公司
//	initComparisonStock();
	//初始化标签
	initIndicatorsTags();
	//判断是否有对比的公司
	if($(".comparis_newserach .yixuan_gs").length<=0){
		$(".yanjiu_wushuju").show();
		$(".caiwu_comparison").hide();
	}else{
		$(".yanjiu_wushuju").hide();
		$(".caiwu_comparison").show();
	}
	//标签绑定单击事件---添加标签，或者切换数据
	$("#tagName").delegate("a","click",function(){
		//a标签的个数
		var aLength=$("#tagName").find("a").length;
		$("#tagValue").html("");
		var index=$(this).attr("data-index");
		var tagValue=$(this).attr("data-html");
		$("#tagValue").html(tagValue);
		$(this).addClass("on").siblings().removeClass();
		if(index==0){
//			if(aLength>10){
//				errorAlert("","最多自定义十个标签");
//				return false;
//			}
			$("#diy_bq").before('<a href="javascript:void(0);" data-index="'+(aLength)+'"><b>自定义标签'+(aLength-8)+'</b><em></em><i></i></a>');
			$(this).prev().addClass("on").siblings().removeClass();
//			$("#showIndicators").show();
//			$(".morezb_box").show();
			$(".diy_yx_box").html('');
			$(".diy_zb_tc").show();
			$(".jiabeijing").show();
			$("body,html").css("overflow","hidden");
			$("#aaaaa").val('');
			return false;
		}
//		console.log("asdasdasd");
		changeParam();
	});
	
	
	//自定义标签删除按钮绑定事件
	$("#tagName").delegate("i","click",function(event){
		var id=$(this).parent().attr("data-id");
		if(id!=null && id!="" && id!="undefined"){
			deleIndicatorsTags(id);
		}
		//删除标签
		$(this).parent().remove();
		$(".morezb_box").hide();
		
		$("#tagName").find("a").eq(0).click();
		//所有指标选中样式去掉
		$("#allIndicators a").removeClass("on");
		//阻止冒泡事件
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	});
	
	//自定义标签修改按钮绑定事件 ---自定义标签弹窗		
	$("#tagName").delegate("em","click",function(event){
		var id=$(this).parent().attr("data-id");
		if(id=="" || id==null || id=="undefined"){
			$.zmAlert("请刷新重试！");
			return false;
		}
		$("#tagTitle").attr("data-id",id);
		var tagTitle=$(this).parent().text();
		$("#tagTitle").val(tagTitle);//.substring(0,tagTitle.length-1)
		$("#add_zxg").show();
		//阻止冒泡事件
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	});
	//自定义标签修改按钮绑定事件 ---关闭自定义弹窗
	$("#add_zxg .add_zxg_title i").on("click",function(){
		$("#add_zxg").hide();
	});
	//修改标签名字-监听键盘事件
	$("#tagTitle").on("keyup",function(){
		var tagName=$("#tagTitle").val();
		if(tagName.length>20){
			$("#tagTitle").val(tagName.substring(0,20));
		}
	});
	//自定义标签修改按钮绑定事件 ---确定按钮
	$("#add_zxg .add_se_btn a").on("click",function(){
		//判断指标是否为空
		//显示选择的指标
		var length=$("#tagName").find("a").length;
		var aObj=$("#tagName").find("a").eq(length-2);
		var tagValue=aObj.attr("data-html");
		if(tagValue==null || tagValue=="" || tagValue=="undefined"){
			$.zmAlert("请选择指标");
			return false;
		}
		
		var tagName=$("#tagTitle").val();
		tagName=$.trim(tagName);
		if(tagName=="" || tagName==null || tagName=="undefined"){
			$.zmAlert("请输入指标名称");
			return false;
		}
		var id=$("#tagTitle").attr("data-id");
		var aObj=null;
		$("#tagName").find("a").each(function(){
			var dataId=$(this).attr("data-id");
			if(dataId==id){
				aObj=$(this);
				$(this).html("<b>"+tagName+"</b><em></em><i></i>")
			}
		});
		//修改名字
		addOrEditIndicatorsTags(id,tagName,null,aObj);
		$("#add_zxg").hide();
	});
	//查询对比企业的时间
	findComparisonDate();
	//单击选择时间
//	$("input[name='timeBk']").on("click",function(){
//		changeParam();
//	});
	
	//初始化所有指标
	initAllIndicators();
	//重新选择指标---选择指标
	$("#allIndicators").delegate("a","click",function(){
		var text = $(this).text();
		var column=$(this).attr("data-value");
		var tableName=$(this).attr("data-table");
		//修改样式
		if($(this).hasClass("on")){
			//去掉已经添加上的指标
			var length=$("#tagName").find("a").length;
			var aObj=$("#tagName").find("a").eq(length-2);
			var aObjHtml=aObj.attr("data-html");
			aObjHtml=aObjHtml.replace("<i data-table='"+tableName+"' data-value='"+column+"'>"+text+"</i>","");
			aObj.attr("data-html",aObjHtml);
			$(this).removeClass("on");
		}else{
			var length=$("#tagName").find("a").length;
			var aObj=$("#tagName").find("a").eq(length-2);
			var aObjHtml=aObj.attr("data-html");
			if(aObjHtml==null || aObjHtml=="" || aObjHtml=="undefined"){
				aObjHtml="<p></p>";
			}
			//控制添加的指标数
			var addINum=aObjHtml.split("data-value").length;
			if(addINum>=11){
				$.zmAlert("最多可以选择十个指标");
				return false;
			}
			aObjHtml=aObjHtml.substring(0,aObjHtml.length-4);
			var indicatorsHtml=aObjHtml+"<i  data-table='"+tableName+"' data-value='"+column+"'>"+text+"</i>";
			aObj.attr("data-html",indicatorsHtml+"</p>");
			$(this).addClass("on");
		}
	});
	//重新选择指标---确定按钮-----添加自定标签指标
	$("#submitButton").on("click",function(){
		//显示选择的指标
		var length=$("#tagName").find("a").length;
		var aObj=$("#tagName").find("a").eq(length-2);
		var tagValue=aObj.attr("data-html");
		if(tagValue==null || tagValue=="" || tagValue=="undefined"){
			$.zmAlert("请选择指标");
			return false;
		}
		if(tagValue.indexOf("i")<=-1){
			$.zmAlert("请选择指标");
			return false;
		}
		$("#tagValue").html(tagValue);
		//重新查询数据
		changeParam();
		$("#showIndicators").hide();
		//保存标签信息
		var tagName=aObj.text();
		tagName=tagName.substring(0,tagName.length-1);
		var indicatorsList="";
		$("#tagValue").find("i").each(function(){
			var key=$(this).attr("data-value");
			var tableName=$(this).attr("data-table");
			indicatorsList+=tableName+"-"+key+","
		});
		addOrEditIndicatorsTags(null,tagName,indicatorsList,aObj);
		//所有指标选中样式去掉
		$("#allIndicators a").removeClass("on");
	});
	//重新选择指标---取消按钮
	$("#cancelButton").on("click",function(){
		//所有指标选中样式去掉
		$("#allIndicators a").removeClass("on");
		$("#showIndicators").hide();
		var length=$("#tagName").find("a").length;
		var aObj=$("#tagName").find("a").eq(length-2);
		aObj.remove();
		$("#tagName").find("a").eq(0).click();
	});
	
	
	
	//用户对比记录
//	financeComparisonUser();
});

/**
 *  初始化标签
 */
function initIndicatorsTags(){
	var tagName="";
	
//	var tag_1="<p><i data-table='bt_finance_table' data-value='jingzichanshouyilv_ROE_zidingyidecaiwuzhibiao'>ROE(%)</i><i data-table='bt_finance_table' data-value='ROA_zidingyidecaiwuzhibiao'>ROA(%)</i><i data-table='bt_finance_table' data-value='xiaoshoumaolilv_zidingyidecaiwuzhibiao'>销售毛利率(%)</i>"+
//		"<i data-table='bt_finance_table' data-value='yingyelirunlv_zidingyidecaiwuzhibiao'>营业利润率</i><i data-table='bt_finance_hierarchy_data' data-value='d332f52912cc4e2298e7ca54e3d58dcf'>资产负债率(%)</i><i data-table='finance_dictionary' data-value='zongzichanzhouzhuanlv_zidingyidecaiwuzhibiao'>总资产周转率(%)</i></p>";
//	tagName+='<a href="javascript:void(0);" class="on" data-index="1" data-html="'+tag_1+'">财务比率比较</a>';
//	
//	var tag_2="<p><i data-table='bt_finance_hierarchy_data' data-value='ccc9385147b54adabe2668794b2a7da8'>营业收入(万元)</i><i data-table='bt_finance_hierarchy_data' data-value='f54cacecac9543cfbcf53617d39c1b13'>净利润(万元)</i>"+
//	"<i data-table='bt_finance_hierarchy_data' data-value='51608fe2376042b88e793aff65703761'>总资产(万元)</i><i data-table='bt_finance_hierarchy_data' data-value='4b14b99f6b6743e4a87b85b89a750502'>总负债(万元)</i>"+
//	"<i data-table='bt_finance_hierarchy_data' data-value='6b5d7f2a616e41e885f2c9f501080b00'>股东权益(万元)</i><i data-table='bt_finance_table' data-value='xianjinjingliuliang_zidingyidecaiwuzhibiao'>现金净流量(万元)</i></p>";
//	tagName+='<a href="javascript:void(0);" data-index="2" data-html="'+tag_2+'">财务数据比较 </a>';
//	
//	var tag_3="<p><i data-table='bt_finance_table' data-value='shiyinglv_zidingyidecaiwuzhibiao'>市盈率(P/E,tom)</i><i data-table='bt_finance_table' data-value='shijinglv_zidingyidecaiwuzhibiao'>市净率(P/B,MRQ)</i>"+
//	"<i data-table='bt_finance_table' data-value='shixiaolv_zidingyidecaiwuzhibiao'>市销率(P/S,ttm)</i><i data-table='bt_finance_table' data-value='shixianlv_zidingyidecaiwuzhibiao'>市现率(P/CF,TTM)</i></p>";
//	tagName+='<a href="javascript:void(0);" data-index="3" data-html="'+tag_3+'">估值分析</a>';
//	
//	var tag_4="<p><i data-table='bt_finance_table' data-value='zongshizhi_zidingyidecaiwuzhibiao'>总市值(万元)</i><i data-table='bt_finance_table' data-value='liutongshizhi_zidingyidecaiwuzhibiao'>流通市值(万元)</i>"+
//	"<i data-table='bt_finance_table' data-value='shiyinglv_zidingyidecaiwuzhibiao'>市盈率(P/E,tom)</i><i data-table='bt_finance_table' data-value='shijinglv_zidingyidecaiwuzhibiao'>市净率(P/B,MRQ)</i></p>";
//	tagName+='<a href="javascript:void(0);" data-index="4" data-html="'+tag_4+'">估值分析比较</a>';
//	
	
	//偿债能力
	var tag_changzhainenglibijiao="<p>" +
			"<i data-table='bt_finance_table' data-value='liudongbilv_zidingyidecaiwuzhibiao'>流动比率</i>" +
			"<i data-table='bt_finance_table' data-value='sudongbilv_zidingyidecaiwuzhibiao'>速动比率</i>" +
//			"<i data-table='bt_finance_table' data-value='xianjinliudongfuzhaibi_zidingyidecaiwuzhibiao'>现金流动负债比（%）</i>" +
			"<i data-table='bt_finance_table' data-value='zichanfuzhailv_zidingyidecaiwuzhibiao'>资产负债率（%）</i>" +
			"<i data-table='bt_finance_table' data-value='chanquanbilv_zidingyidecaiwuzhibiao'>产权比率（%）</i>" +
//			"<i data-table='bt_finance_table' data-value='yihuolixibeishu_zidingyidecaiwuzhibiao'>已获利息倍数（比例）</i>" +
			"</p>";
	tagName+='<a href="javascript:void(0);" data-index="1" data-html="'+tag_changzhainenglibijiao+'" class="on">偿债能力比较</a>';
	//营运能力
	var tag_yingyunnenglibijiao="<p>" +
	"<i data-table='bt_finance_table' data-value='yingshouzhangkuanzhouzhuanlv_cishu_zidingyidecaiwuzhibiao'>应收帐款周转率(次)</i>" +
	"<i data-table='bt_finance_table' data-value='cunhuozhouzhuanlv_zidingyidecaiwuzhibiao'>存货周转率（次）</i>" +
	"<i data-table='bt_finance_table' data-value='liudongzichanzhouzhuanlv_zidingyidecaiwuzhibiao'>流动资产周转率（次）</i>" +
//	"<i data-table='bt_finance_table' data-value='gudingzichanzhouzhuanlv_zidingyidecaiwuzhibiao'>固定资产周转率（次）</i>" +
	"<i data-table='bt_finance_table' data-value='zongzichanzhouzhuanlv_zidingyidecaiwuzhibiao'>总资产周转率（次）</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="2" data-html="'+tag_yingyunnenglibijiao+'">营运能力比较</a>';
	//盈利能力
	var tag_yinglinenglibijiao="<p>" +
	"<i data-table='bt_finance_table' data-value='xiaoshoumaolilv_zidingyidecaiwuzhibiao'>销售毛利率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='jingzichanshouyilv_pingjun_zidingyidecaiwuzhibiao'>净资产收益率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='ROA_zidingyidecaiwuzhibiao'>资产收益率（ROA）（%）</i>" +
	"<i data-table='bt_finance_table' data-value='yingyelirunlv_zidingyidecaiwuzhibiao'>营业利润率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='aa1b802bc7b64fa8b6b512b36a18f23b'>每股收益</i>" +
//	"<i data-table='bt_finance_table' data-value=''>每股股利</i>" +
//	"<i data-table='bt_finance_table' data-value='shiyinglv_zidingyidecaiwuzhibiao'>市盈率</i>" +
//	"<i data-table='bt_finance_table' data-value='shixiaolv_zidingyidecaiwuzhibiao'>市销率</i>" +
//	"<i data-table='bt_finance_table' data-value='meigujingzichan_zidingyidecaiwuzhibiao'>每股净资产</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="3" data-html="'+tag_yinglinenglibijiao+'">盈利能力比较</a>';
	//增长能力
	var tag_zengzhanngnenglibijiao="<p>" +
	"<i data-table='bt_finance_table' data-value='yingyeshourutongbizengzhanglv_zidingyidecaiwuzhibiao'>营业收入同比增长率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='jinglirunzengzhanglv_zidingyidecaiwuzhibiao'>净利润增长率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='jingzichanzengzhanglv_zidingyicaiwuzhibiao'>净资产增长率</i>" +
	"<i data-table='bt_finance_table' data-value='zongzichanzengzhanglv_zidingyidecaiwuzhibiao'>总资产增长率（%）</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="4" data-html="'+tag_zengzhanngnenglibijiao+'">增长能力比较</a>';
	//现金流
	var tag_xianjinliubijiao="<p>" +
	"<i data-table='bt_finance_table' data-value='xianjindaoqizhaiwubi_zidingyidecaiwuzhibiao'>现金到期债务比</i>" +
	"<i data-table='bt_finance_table' data-value='xianjinliudongfuzhaibi_zidingyidecaiwuzhibiao'>现金流动负债比（%）</i>" +
	"<i data-table='bt_finance_table' data-value='xianjinzhaiwuzongebi_zidingyidecaiwuzhibiao'>现金债务总额比</i>" +
	"<i data-table='bt_finance_table' data-value='xiaoshouxianjinbilv_zidingyidecaiwuzhibiao'>销售现金比率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='xianjingulibaozhangbeishu_zidingyidecaiwuzhibiao'>现金股利保障倍数（比例）</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="5" data-html="'+tag_xianjinliubijiao+'">现金流比较</a>';
	//资本结构比较
	var tag_zibenjiegoubijiao="<p>" +
	"<i data-table='bt_finance_table' data-value='gudongquanyibilv_zidingyicaiwuzhibiao'>股东权益比率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='zichanfuzhailv_zidingyidecaiwuzhibiao'>资产负债率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='changqifuzhailv_zidingyicaiwuzhibiao'>长期负债率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='zhangqizichanshihelv_zidingyidecaiwuzhibiao'>长期资产适合率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='xiaoshouxianjinbilv_zidingyidecaiwuzhibiao'>销售现金比率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='meigujingyingxianjinliuliangjinge_zidingyidecaiwuzhibiao'>每股经营现金流量净额</i>" +
//	"<i data-table='bt_finance_table' data-value='quanbuzichanxianjinhuishoulv_zidingyidecaiwuzhibiao'>全部资产现金回收率（%）</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="6" data-html="'+tag_zibenjiegoubijiao+'">资本结构比较</a>';
	//公司价值比较
	var tag_gongsiguzhibijiao="<p>" +
//	"<i data-table='bt_finance_table' data-value='yingyeshourutongbizengzhanglv_zidingyidecaiwuzhibiao'>营业收入同比增长率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='jinglirunzengzhanglv_zidingyidecaiwuzhibiao'>净利润增长率（%）</i>" +
//	"<i data-table='bt_finance_table' data-value='jingzichanzengzhanglv_zidingyicaiwuzhibiao'>净资产增长率</i>" +
//	"<i data-table='bt_finance_table' data-value='zongzichanzengzhanglv_zidingyidecaiwuzhibiao'>总资产增长率（%）</i>" +
	"<i data-table='bt_finance_table' data-value='shiyinglv_zidingyidecaiwuzhibiao'>市盈率</i>" +
	"<i data-table='bt_finance_table' data-value='shijinglv_zidingyidecaiwuzhibiao'>市净率</i>" +
	"<i data-table='bt_finance_table' data-value='zongshizhi_zidingyidecaiwuzhibiao'>总市值</i>" +
	"<i data-table='bt_finance_table' data-value='meigujingzichan_zidingyidecaiwuzhibiao'>每股净资产</i>" +
	"<i data-table='bt_finance_table' data-value='jingzichanshouyilv_pingjun_zidingyidecaiwuzhibiao'>净资产收益率（%）</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="7" data-html="'+tag_gongsiguzhibijiao+'">公司价值比较</a>';
	//主要财务数据比较
	var tag_zhuyaocaiwushujubijiao="<p>" +
	"<i data-table='bt_finance_table' data-value='ccc9385147b54adabe2668794b2a7da8'>营业收入</i>" +
	"<i data-table='bt_finance_table' data-value='f54cacecac9543cfbcf53617d39c1b13'>净利润</i>" +
	"<i data-table='bt_finance_table' data-value='6b5d7f2a616e41e885f2c9f501080b00'>股东权益</i>" +
	"<i data-table='bt_finance_table' data-value='xianjinjingliuliang_zidingyidecaiwuzhibiao'>现金净流量（万元）</i>" +
	"</p>";
	tagName+='<a href="javascript:void(0);" data-index="8" data-html="'+tag_zhuyaocaiwushujubijiao+'">主要财务数据比较</a>';
	
	//获取用户自定标签
	var tagNameDIYExist=findIndicatorsTags();
	//自定义标签按钮
	var tagNameDIY='<a href="javascript:void(0);" data-index="0" data-html="" id="diy_bq">自定义标签</a>';
	var tagNameTotal=tagName+tagNameDIYExist+tagNameDIY;
		$("#tagName").html(tagNameTotal);
		
		$("#tagValue").html(tag_changzhainenglibijiao);
}
/**
 * 初始化所有指标
 */
function initAllIndicators(){
	$.axs("/betaInvest/finance/findIndicators.do",null,true,function(data){
		if(data.retData!=null){
			var alreadHtml="";
			var indicatorsList=data.retData;
			var letterTmp="";//控制是否追加大写字母
			var html='';
			for(var i=0;i<indicatorsList.length;i++){
				var obj=indicatorsList[i];
				if(alreadHtml.indexOf(obj.indicatorsName)==-1){
					var letter=obj.pinyinHeader;
					if((letterTmp!="" && letterTmp!=letter) || (i+1)==indicatorsList.length){
						html+='</p>';
						html+='</div>';
						html+='<div class="clr"></div>';
						$("#allIndicators").append(html);
						html='';
					}
					if(letterTmp!=letter){
						letterTmp=letter;
						html+='<div class="r_box_list">';
						html+='<span>'+letter+'</span>';
						html+='<p>';
					}
					alreadHtml+=obj.nameCn+",";
					html+='<a href="javascript:void(0);" data-table="'+obj.tableName+'" data-value="'+obj.indicators+'">'+obj.indicatorsName+'</a>';
				}
			}
		}
	});
}
/**
 * 获取财务对比时间
 */
function findComparisonDate(){
	//日期
	var index=0;
	var dateValue="";
	$("input[name='timeBk']").each(function(){
		if($(this).next().hasClass("on")){
			dateValue=$(this).val();
			return false; //跳出循环
		}
	});
	$("#contrastDate").html("");
	var comparisonStockCodes=getAllStockCode();
//	$.axs("/betaInvest/finance/findIndicatorsComparisonDate.do",{stockCodes:comparisonStockCodes},false,function(data){
//		if(data.retData!=null){
//			var resultList=data.retData;
//			var html='';
//			for (var int = 0; int < resultList.length; int++) {
//				var result=resultList[int];
//				html+='<div class="data-radio">';
//				html+='<input type="radio" value="'+result.reportPeriod+'" name="timeBk" />';
//				html+='<label for="time1" class="radio"></label>';
//				html+='<label class="radioWord" for="time1">'+result.dateTime+'</label>';
//				html+='</div>';
//				if(result==dateValue){
//					index=int;
//				}
//			}
//			$("#contrastDate").html(html);
//			var divObj=$("#contrastDate").find("div").eq(index);
//			divObj.find("label").eq(0).addClass("on");
////			divObj.find("label").eq(1).css("color","#2fa6dc");
//		}
//	});
	$.axs("/betaInvest/finance/findIndicatorsComparisonDateAddShangshi.do",{stockCodes:comparisonStockCodes},false,function(data){
		if(data.retData!=null){
			var resultList=data.retData;
			var html='';
			for (var int = 0; int < resultList.length; int++) {
				var result=resultList[int];
				html+='<div class="data-radio">';
				html+='<input type="radio" value="'+result.reportPeriod+'" name="timeBk" />';
				html+='<label for="time1" class="radio"></label>';
				html+='<label class="radioWord" for="time1">'+result.dateTime+'</label>';
				html+='</div>';
				if(result==dateValue){
					index=int;
				}
			}
			$("#contrastDate").html(html);
			var divObj=$("#contrastDate").find("div").eq(index);
			divObj.find("label").eq(0).addClass("on");
//			divObj.find("label").eq(1).css("color","#2fa6dc");
		}
	});
	//单击时间
//	$(".data-radio").on("click",function(e){
//		if ($(this).siblings(".radio").hasClass("on")) {
//			$(this).siblings(".radio").removeClass("on");
//			$(this).css("color", "")
//		} else {
//			$(this).siblings(".radio").addClass("on");
////			$(this).css("color", "#2fa6dc");
//		}
//		changeParam();
//	});
	$(".data-radio label").on("click",function(e) {
		$(this).parent().find(".radio").addClass("on");
//		$(this).parent().find(".radio").next(".radioWord").css("color","#2fa6dc")
		if ($(this).parent().siblings("div").hasClass("data-radio")) {
			$(this).parent().siblings(".data-radio").find(".radio").removeClass("on");
//			$(this).parent().siblings(".data-radio").find(".radio").next(".radioWord").css("color", "");
		} else {
			$(this).parent().parent().siblings().find(".radio").removeClass("on");
		}
		 changeParam();
	});
	changeParam();
}
/**
 * 改变搜索条件
 */
function changeParam(){
	var codeS=getAllStockCode();
	//日期
	var dateValue="";
	$("input[name='timeBk']").each(function(){
		if($(this).next().hasClass("on")){
			dateValue="'"+$(this).val()+"'";
			return false; //跳出循环
		}
	});
	if(dateValue=="" || dateValue==null || dateValue=="undefined"){
//		console.log("日期为空:"+dateValue);
		return false;
	}
	//财物指标
	var indicatorsNames="";
	$("#tagValue").find("i").each(function(){
		var indicatorsName=$(this).attr("data-value");
		indicatorsNames+=indicatorsName+",";
	});
	indicatorsNames=indicatorsNames.substring(0,indicatorsNames.length-1);
	if(indicatorsNames=="" || indicatorsNames==null || indicatorsNames=="undefined"){
//		console.log("指标为空:"+indicatorsNames);
		return false;
	}
	//查询财务指标数据
	findComparisonData(codeS,dateValue,indicatorsNames);
}
/**
 * 获取财务对比数据
 */
function findComparisonData(comparisonStockCodes,dateTimes,financeIndicatorIds){
	$("#indicatorsComparisonInfo").html("");
	var financeIndicatorIds='';
	var financeIndicatorIdArray=[];
//	var titleTrHtml='';
//	titleTrHtml+='<tr>';
//	titleTrHtml+='<td scope="col">企业/指标名称</td>';
//	$("#tagValue").find("i").each(function(){
//		var indicatorId=$(this).attr("data-value");
//		var indicatorName=$(this).text();
//		titleTrHtml+='<td scope="col" data-value="'+indicatorId+'">'+indicatorName+'</td>';
//		financeIndicatorIds+="'"+indicatorId+"',";
//		financeIndicatorIdArray.push(indicatorId);
//	});
//	titleTrHtml+='</tr>';
//	financeIndicatorIds=financeIndicatorIds.substring(0,financeIndicatorIds.length-1);
//	$("#indicatorsComparisonInfo").append(titleTrHtml);
//	$.axs("/betaInvest/finance/findIndicatorsComparison.do",{stockCodes:comparisonStockCodes,dateTimes:dateTimes,financeIndicatorIds:financeIndicatorIds},false,function(data){
//		if(data.retData!=null){
//			var resultList=data.retData;
//			$.each(resultList,function(index,result){
//				var dataTrHtml='<tr>';
//				dataTrHtml+='<td scope="row"><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'" >'+result.stockName+'('+result.stockCode+')</a></td>';
//				$.each(financeIndicatorIdArray,function(index,item){
//					var danwei=$("#indicatorsComparisonInfo").find("td").eq(index+1).text();
//					$.each(result,function(key,value){ 
//						if(key==item){
//							if(value==null || value==" " || value==undefined){
//								value="--";
//							}else{
//								if(danwei.indexOf("万元")>-1){
//									value=value/10000.00;
//								}
//								value=(value).toFixed(2);
//							}
//							dataTrHtml+='<td>'+value+'</td>';
//							return false;
//						}
//					}); 
//				});
//				dataTrHtml+='</tr>';
//				$("#indicatorsComparisonInfo").append(dataTrHtml);
//			});
//			//画图
//			chart();
//		}
//	});
	
	//改版表格---第一行锁定，后面滑动
	//对比的公司
	$("#zbmcTable").html("");
	//选择的指标
	$("#dataTHead").html("");
	//指标对应的数据
	$("#dataTbody").html("");
	//---加载选择的指标
	var titleTrHtml='';
	titleTrHtml+='<tr>';
	$("#tagValue").find("i").each(function(){
		var indicatorId=$(this).attr("data-value");
		var indicatorName=$(this).text();
		var titleDanwei="（万元）";
		if(indicatorId.indexOf("_")>-1){
			titleDanwei="";
			if(indicatorName.indexOf("市值")>-1){
				titleDanwei="（亿元）";
			}else if(indicatorName.indexOf("每股")>-1){
				titleDanwei="（元）";
			}
		}else{
			if(indicatorName.indexOf("每股")>-1){
				titleDanwei="（元）";
			}
		}
		titleTrHtml+='<th data-value="'+indicatorId+'">'+indicatorName+titleDanwei+'</th>';
		financeIndicatorIds+="'"+indicatorId+"',";
		financeIndicatorIdArray.push(indicatorId);
	});
	titleTrHtml+='</tr>';
	$("#dataTHead").html(titleTrHtml);
	//获取指标数据---findIndicatorsComparisonAddShangshi
	$.axs("/betaInvest/finance/findIndicatorsComparisonAddShangshi.do",{stockCodes:comparisonStockCodes,dateTimes:dateTimes,financeIndicatorIds:financeIndicatorIds},false,function(data){
		if(data.retData!=null){
			var resultList=data.retData;
			var showDanWeiName="元";
			$.each(resultList,function(index,result){
				//公司加载
				if(isXSBCompany(result.stockCode)){
					var stockTrHtml='<tr><td><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'"">'+result.stockName+'（<em>'+result.stockCode+'</em>）</a></td></tr> '
				}else{
					var stockTrHtml='<tr><td><a href="javascript:void(0)">'+result.stockName+'（<em>'+result.stockCode+'</em>）</a></td></tr> '
				}
				$("#zbmcTable").append(stockTrHtml);
				//dataTrHtml+='<td scope="row"><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'" >'+result.stockName+'('+result.stockCode+')</a></td>';
				//数据加载
				var dataTrHtml='<tr>';
				$.each(financeIndicatorIdArray,function(index,item){
					var danwei=$("#dataTHead").find("th").eq(index).text();
					var leixing=$("#dataTHead").find("th").eq(index).attr("data-value");
					$.each(result,function(key,value){ 
						if(key==item){
							if(leixing.indexOf("_")>-1){
//								console.log($("#tagValue").find("em").eq(0).text());
								if(danwei.indexOf("市值")>-1){
									showDanWeiName="亿元";
									dataTrHtml+='<td>'+(value==null?"--":(value/100000000.00).toFixed(2))+'</td>';
								}else if(danwei.indexOf("现金净流量")>-1){
									dataTrHtml+='<td>'+(value==null?"--":(value/10000.00).toFixed(2))+'</td>';
								}else{
//									var danwei_1=$("#tagValue").find("em").eq(0).text()
//									danwei_1=danwei_1.substring(danwei_1.indexOf("（")+1,danwei_1.indexOf("）"));
//									if(danwei_1==null || danwei_1=="" || danwei_1==undefined){
//										danwei_1="";
//									}
//									showDanWeiName="单位:"+danwei_1;
									showDanWeiName='';
									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
								}
							}else{
								if(danwei.indexOf("每股收益")>-1){
									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
								}else{
									showDanWeiName="万元";
									dataTrHtml+='<td>'+(value==null?"--":(value/10000).toFixed(2))+'</td>';
								}
							}
							
							
//							if(value==null || value==" " || value==undefined){
//								value="--";
//							}else{
//								if(danwei.indexOf("万元")>-1){
//									value=value/10000.00;
//								}
//								value=(value).toFixed(2);
//							}
//							dataTrHtml+='<td>'+value+'</td>';
							return false;
						}
					}); 
				});
				dataTrHtml+='</tr>';
				$("#dataTbody").append(dataTrHtml);
			});
			//画图
			chart(showDanWeiName);
		}
	});
}

/**
 * 画图
 * 获取table里面的值
 */
function chart(showDanWeiName){
	//X轴-- 指标名称
	var columns=new Array();
	$("#dataTHead").find("tr").each(function(index){
		if(index==0){
			$(this).find("th").each(function(d){
//				if(d!=0){
					columns.push($(this).text());
//				}
			});
			return false;
		}
	});
//	console.log(columns);
	var nameS=getAllStockName();
	//股票名称
	var stockNamesSplit=nameS.split(",");
	//同期多企业指标对标
	var myChart01 = echarts.init(document.getElementById('sj_zhuxingtu'));
	//公司名字集合
	var titleNames=new Array();
//	for(var i=0;i<stockNamesSplit.length;i++){
//		titleNames.push(stockNamesSplit[i]);
//	}
	$("#zbmcTable").find("a").each(function(){
		titleNames.push($(this).text());
	});
//	console.log(titleNames);
    var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	var option = {
		color:color,
	    tooltip : {
	    	enterable:true,//鼠标可以进入提示信息里面
	        trigger: 'axis',
	        position:'top',
	        show:true,
	        formatter:function(params){
	        	//console.log(params)
	        	var bg='';
	 			var content='';
	 			$(params).each(function(index,item){
	 				bg=color[index];
	 				var divShowDanwei="";
//	 				console.log(item);
	 				if(item.name.indexOf("%")>-1){
	 					divShowDanwei="%";
	 				}else if(item.name.indexOf("次")>-1){
	 					divShowDanwei="次";
	 				}else if(item.name.indexOf("亿元")>-1){
	 					divShowDanwei="亿元";
	 				}else if(item.name.indexOf("万元")>-1){
	 					divShowDanwei="万元";
	 				}else if(item.name.indexOf("元")>-1){
	 					divShowDanwei="元";
	 				}else if(item.name.indexOf("每股")>-1 || item.name.indexOf("基本")>-1){
	 					divShowDanwei="元";
	 				}else if(item.name.indexOf("市值")>-1){
	 					divShowDanwei="亿元";
	 				}else if(item.name.indexOf("每股")==-1 && item.name.indexOf("基本")==-1
	 						&& item.name.indexOf("率")==-1 && item.name.indexOf("比")==-1
	 						&& item.name.indexOf("倍")==-1 && item.name.indexOf("乘数")==-1
	 						&& item.name.indexOf("天数")==-1&& item.name.indexOf("周期")==-1){
	 					divShowDanwei="万元";
	 				}
	 				content+='<div class="sb_tips_content">'+
  	    						'<span class="tips_leibie fl" style="background-color: '+bg+';">'+params[index].seriesName+'：</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[index].value+divShowDanwei+'</span>'+
  	    						'<div class="clr"></div>'+
  	    					'</div>';
	 			})
	        	var divHtml='<div class="sanban_tips">'+
	        				'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
	        	return divHtml;			
//	        	 var divHtml='<div class="sanban_tips">'+
//    	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
//    	    					'<div class="sb_tips_content">'+
//    	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[0]+';">'+params[0].seriesName+'：</span>'+
//    	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
//    	    						'<div class="clr"></div>'+
//    	    					'</div>'+
//    	    				'</div>';
//              	return divHtml;
	        }
	       
	    },
	    legend: {
	        data: titleNames
	    },
	    dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end: 100
	        }
	    	
	    ],
	    calculable : true,
	    grid: {
	        left: '1%',
	        right: '1%',
	        bottom:'20%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : columns
	        }
	    ],
	    yAxis : [
	        {
	        	//name : showDanWeiName,
	            type : 'value'
	        }
	    ],
		//color:['#7981cd','#4482c7'],
	    series :function(){
			    	var serie=new Array();//
//			    	$("#indicatorsComparisonInfo").find("tr").each(function(index){
			    	$("#dataTbody").find("tr").each(function(index){
//			    		if(index!=0){
			    			var seriesData=new Array();
			    			$(this).find("td").each(function(d){
//			    				if(d!=0){
			    					var showVlaue=$(this).text();
			    					if(showVlaue=="--"){
			    						showVlaue=0;
			    					}
			    					seriesData.push(showVlaue);
//			    				}
			    			});
			    			var object={
					    	        name:titleNames[index],
					    	        type:'bar',
					    	        barMaxWidth:'30', 
					    	        data:seriesData,
					    			label: {
					    	            normal: {
					    	                show: true,
					    	                position: 'top'
					    	            }
					    	        }
					    	    }
				    		serie.push(object)
//			    		}
			    	});
			    	return serie;
		    	}()
	};
	myChart01.setOption(option);
}

//====================  用户自定义标签=======
/**
* 查询自定义指标对比标签
*/
function findIndicatorsTags(){
	var tagNameDIY='';
	$.axs("/betaInvest/finance/findIndicatorsTags.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null || result.length==0){
				return false;
			}
			var userTagsId=result[0].id;
			var tagName=result[0].tagName;
			var tagNum=0;
			var html="";
			for(var i=0;i<result.length;i++){
				var indicatorsTags=result[i];
				if(userTagsId!=indicatorsTags.id){
					tagNameDIY+='<a href="javascript:void(0);" data-html="<p>'+html+'</p>" data-index="'+(tagNum+4+1)+'" data-id="'+userTagsId+'"><b>'+tagName+'</b><em></em><i></i></a>';
					html="";
					html+="<i data-table='"+indicatorsTags.tableName+"' data-value='"+indicatorsTags.indicatorId+"'>"+indicatorsTags.indicatorName+"</i>";
					userTagsId=indicatorsTags.id;
					tagNum++;
					tagName=indicatorsTags.tagName;
				}else{
					html+="<i data-table='"+indicatorsTags.tableName+"' data-value='"+indicatorsTags.indicatorId+"'>"+indicatorsTags.indicatorName+"</i>";
					if((i+1)==result.length){
						tagNameDIY+='<a href="javascript:void(0);" data-html="<p>'+html+'</p>" data-index="'+(tagNum+4+1)+'" data-id="'+userTagsId+'"><b>'+tagName+'</b><em></em><i></i></a>';
					}
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
//	console.log(tagNameDIY);
	return tagNameDIY;
}
/**
* 添加自定义标签
* @param id 主键
* @param tagName 标签名称
* @param indicatorsList 字段列表:财务,a;利润,b;
* @param thiz  当前a标签jquery对象
*/
function addOrEditIndicatorsTags(id,tagName,indicatorsList,aObj){
	var paramData={id:id,tagName:tagName,indicatorsList:indicatorsList};
	$.axs("/betaInvest/finance/addOrEditIndicatorsTags.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			//var id=result.id;
			aObj.attr("data-id",result);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
* 删除自定义标签
* @param id
*/
function deleIndicatorsTags(id){
	$.axs("/betaInvest/finance/deleIndicatorsTags.do",{tagsId:id},false,function(data){
		
	});
}