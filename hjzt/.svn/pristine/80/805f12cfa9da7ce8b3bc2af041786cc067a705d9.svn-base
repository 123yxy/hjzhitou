//详情页左边栏
//stockCode='430043';
//stockName='景睿策划';
// 左中栏目
var shareOpen="0";//开通股价提醒
var reportOpen="1";//开通报告提醒
var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
var iturl= window.location.pathname;
var ithtml= iturl.substring(iturl.lastIndexOf("/")+1,iturl.lastIndexOf("."));
$(function(){
	setLeft();
	
	//自选样式
	findCompanySurveyGPleft();
	//查询是否有股份提醒
	findBtStockAlert();
});

/**
 * 左边栏
 */
function setLeft() {
	var pathName = window.location.pathname;
//	var stockCode = getUrlParam("stockCode");
//	var stockName = getUrlParam("stockName");
	
	var leftNav ='<div class="news_boar_ltop">';
		leftNav+='<h2>'+stockName+'</h2>';
		leftNav+='<span>'+stockCode+'</span>';
		leftNav+='<div class="news_boar_gn">';
//		加入自选
		
		leftNav+='<i class="news_boar_duibi" title="自选" onclick="insertOptional(\''+stockCode+'\')"></i>';
//		通知
		leftNav+='<i class="news_boar_tongzhi" title="提醒"></i>';
//		对比--控制样式
//		var userId=localStorage.getItem("userId");
		var showName = findContrastCompany();
		if(showName!=null && showName!="" && showName!=undefined && showName.indexOf(stockCode)>-1 && showName.indexOf(stockName)>-1 ){
			leftNav+='<i class="news_boar_pk on" title="对比" onclick="addComparisonStockClass(\''+stockCode+'\',\''+stockName+'\')" id="duibi_'+stockCode+'"></i>';
		}else{
			leftNav+='<i class="news_boar_pk" title="对比" onclick="addComparisonStockClass(\''+stockCode+'\',\''+stockName+'\')" id="duibi_'+stockCode+'"></i>';
		}
//		报告
		leftNav+='<i class="news_boar_baogao" title="报告"></i>';
		leftNav+='<div class="clr"></div>';
		leftNav+='</div>';
		leftNav+='</div>';
		leftNav+='<ul id="detailHtmlList">';
		leftNav+='<li class="n_gK hover" onclick="javascript:window.location.href=\'/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+stockName+'\'"><span></span><a href="/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+stockName+'">概况</a></li>';
		leftNav+='<li class="n_cwsJ" onclick="javascript:window.location.href=\'/businessDetails/financialData.html?stockCode='+stockCode+'&stockName='+stockName+'\'"><span></span><a href="/businessDetails/financialData.html?stockCode='+stockCode+'&stockName='+stockName+'">财务数据</a></li>';
		leftNav+='<li class="n_gxT" onclick="javascript:window.location.href=\'/businessDetails/relationGraph.html?stockCode='+stockCode+'&stockName='+stockName+'\'"><span></span><a href="/businessDetails/relationGraph.html?stockCode='+stockCode+'&stockName='+stockName+'">关系图</a></li>';
		leftNav+='<li class="n_yjjL" onclick="javascript:window.location.href=\'/businessDetails/researchRecord.html?stockCode='+stockCode+'&stockName='+stockName+'\'"><span></span><a href="/businessDetails/researchRecord.html?stockCode='+stockCode+'&stockName='+stockName+'">研究记录</a></li>';
		leftNav+='<li class="n_gG" onclick="javascript:window.location.href=\'/businessDetails/TBnotice.html?stockCode='+stockCode+'&stockName='+stockName+'\'"><span></span><a href="/businessDetails/TBnotice.html?stockCode='+stockCode+'&stockName='+stockName+'">公告</a></li>';
		leftNav+='<li class="n_xW" onclick="javascript:window.location.href=\'/businessDetails/newsList.html?stockCode='+stockCode+'&stockName='+stockName+'\'"><span></span><a href="/businessDetails/newsList.html?stockCode='+stockCode+'&stockName='+stockName+'">新闻</a></li>';
		leftNav+='<div class="clr"></div>';
		leftNav+='</ul>';
	$(".boar_l").html("");
	$(".boar_l").prepend(leftNav);
	var nameList = ["/businessDetails/newTBindex.html","/businessDetails/financialData.html","/businessDetails/relationGraph.html","/businessDetails/researchRecord.html","/businessDetails/TBnotice.html","/businessDetails/newsList.html"];
	$.each(nameList, function(index, item) {
		if(pathName==item) {
			$("#detailHtmlList li").eq(index).addClass("hover").siblings().removeClass("hover");
		}

	});
	
}

/**
 * 添加自选股
 */
function insertOptional(stockCode){
	if(!$(".news_boar_duibi").hasClass("on")){
		var opId = addOptional(stockCode,"");
		$(".news_boar_duibi").attr("data-opId",opId);
		$(".news_boar_duibi").addClass("on");
		$(".czzx_content").addClass("on");	
		$(".zixuangu_tc").show();
		$(".zx_num").text($("#zixuanguNumTotal").text());
	}else{
		deleteOptional($(".news_boar_duibi").attr("data-opId"), stockCode);
		$(".news_boar_duibi").removeClass("on");
		//修改于16-8-11
		deleBtStockAlert();
	}
}

$(document).ready(function(){
//	
//	var new_heigh = $(".boar_r").height();
	var screenHeight=$(window).height();
	var height=screenHeight-56;

	$(".new_boar_main").css("height",height);
	$(".boar_r").css("height",(height-50));
//	alert(screenHeight);
//	if(new_heigh+98<screenHeight){
//		if(ithtml=="TBnotice"){
//		$(".boar_l").css("height",screenHeight-100);
//		$(".boar_r").css("padding-bottom",0);
//		$(".bfff").css("height",screenHeight-100);
//		$(".notice_info").css("height",screenHeight-350);
//		
//		}else{
//		$(".boar_l,.jilu_content,.my_yanbao,.quans_yanbao,.bfff").css("height", screenHeight-90);	
//		}
//
//	}else{
//		$(".boar_l,.jilu_content,.my_yanbao,.quans_yanbao,.bfff").css("height", new_heigh);	
//	}
	var new_width = $(document).innerWidth();
//	console.log(new_width)
	var zz_width = new_width-186-16;
	$(".boar_r").css("width",zz_width);
//	console.log(zz_width)
	if(ithtml=="TBnotice"){
	$(".boar_r").css("width",zz_width);	
	}else{
	$(".boar_r").css("width",zz_width);	
	}
	

	
//通知提醒弹框

//var settix ='<div class="setTix">';
//	settix +='<div class="n_gs_close">';
//	settix +='<span onClick=closeAlert()></span>';
//	settix +='<h2 class="gjgs_xinxi">'+stockName+'('+stockCode+')-提醒设置</h2>';
//	settix +='</div>';
//	
//
//	settix +='<div class="setTix_info">';
//	settix +='<ul>';
//	settix +='<li>';
//	settix +='<div class="set_tix_box">';
//	settix +='<span class="fl">股价提醒</span>';
//
//	settix +='<div class="fl set_check">';
//	settix +='<div class="data-checkbox fl gjtx_xk" id="checkbox_div1">';
//	settix +='<input type="checkbox" id="time1" value="开通提醒" name="timeBk" />';
//	settix +='<label for="time1" class="checkbox" data-type="1"></label>';
//	settix +='<label class="checkboxWord" for="time1"></label>';
//	settix +='</div>';
//	settix +='</div>';
//	
//	settix +='<div class="setTixCaozuo fr">';
//
//
//	settix +='<div class="set_zk fr on">';
//	settix +='<i id="setZk">收起</i>';
//	settix +='</div>';
//	settix +='<div class="clr"></div>';
//	settix +='</div>';
//	settix +='<div class="clr"></div>';
//	settix +='</div>';
//	settix +='<div class="set_down">';
//	settix +='<div class="set_dow_title">';
//	settix +='<p>当前价格:<em id="g_newPrice">15.65</em></p>';
//	settix +='</div>';
//	settix +='<div class="set_dow_input">';
//	settix +='<input type="text" placeholder="买入目标价" id="buyPrice" onkeyup="inputNumber(this)"/>';
//	settix +='<em class="mubiao_yuan">元</em>';
//	settix +='<input type="text" placeholder="卖出目标价" id="salePrice" onkeyup="inputNumber(this)"/>';
//	settix +='<em>元</em>';
//	settix +='<div class="clr"></div>';
//	settix +='</div>';
//	settix +='<div class="set_dow_textar">';
//	settix +='<b>备注</b>';
//	settix +='<textarea name="" rows="" cols="" id="content" placeholder=""></textarea>';
//	settix +='</div>';
//	settix +='</div>';
//	settix +='</li>';
//	settix +='<li>';
//	settix +='<div class="set_tix_box">';
//	settix +='<span class="fl">公告提醒</span>';
//	settix +='<div class="fl set_check">';
//	settix +='<div class="data-checkbox ggtx_xk" id="checkbox_div2">';
//	settix +='<input type="checkbox" id="time1" value="开通提醒" name="timeBk" />';
//	settix +='<label for="time1" class="checkbox" data-type="2"></label>';
//	settix +='<label class="checkboxWord" for="time1"></label>';
//	settix +='</div>';
//	settix +='</div>';
//	
//	settix +='<div class="clr"></div>';
//	settix +='</div>';
//	settix +='</li>';
//	settix +='<li>';
//	settix +='<a href="javascript:;" class="baocun" onClick=addBtStockAlert()>保存</a>';
//	settix +='<a href="javascript:;" class="qxb" onClick=closeAlert()>取消</a>';
//	settix +='<div class="clr"></div>';
//	settix +='</li>';
//	settix +='</ul>';
//	settix +='</div>';
//	settix +='</div>';
//	settix +='<div class="backbj" style="display: none;"></div>';

//
//	$("body").append(settix);
	
	/**
	 * 跳转企业报告链接
	 */
	$(".news_boar_gn .news_boar_baogao").on("click", function(){
		var host = window.location.host;
		if(host == "localhost" || host == "127.0.0.1"){
			host = "beta.159jh.com";
		}
		if(isHaveUrl("http://"+ host +"/reports/report_"+ stockCode +".html")){
			window.location.href = "http://"+ host +"/reports/report_"+ stockCode +".html";
		}
	})
	
	/**
	 * 修改股价提醒弹框
	 */
	var searchMsg = '<div class="wj_mark"></div>';
	searchMsg += '<div class="wj_popUP">';
	searchMsg += '<div class="wj_popUP_close"></div>';
	searchMsg += '<div class="wj_popUP_wrap">';
	searchMsg += '<div class="wj_popUP_tit">'+stockName+'('+stockCode+')-股价提醒<span>（<i>*</i> 提示：操作中心-通知，查看提醒）</span></div>';
	searchMsg += '<div class="wj_currentPrice">当前价：<span id="g_newPrice">15.65</span></div>';
	searchMsg += '<ul class="wj_priceList wj_clear">';
	searchMsg += '<li><label>买入目标价</label><div class="wj_popUPInput"><input type="text" id="buyPrice" onkeyup="inputNumber(this)">元</div></li>';
	searchMsg += '<li><label>卖出目标价</label><div class="wj_popUPInput"><input type="text" id="salePrice" onkeyup="inputNumber(this)">元</div></li>';
	searchMsg += '<li><label>涨跌幅</label><div class="wj_popUPInput"><input type="text" id="changeAmount_1" onkeyup="inputNumber(this)">%</div></li>';
	searchMsg += '</ul>';
	searchMsg += '<div class="wj_popUP_btn">';
	searchMsg += '<a class="wj_btn wj_btnSubmit wj_pop_btnSubmit" onClick=addBtStockAlert()>确定</a>';
	searchMsg += '<a class="wj_btn wj_btnCancel wj_pop_btnCancel" onClick=closeAlert()>取消</a>';
	searchMsg += '<div class="wj_checkbox">';
	searchMsg += '<div class="data-checkbox" id="checkbox_div"><input type="checkbox"><label class="checkbox on"></label><label class="checkboxWord">公告提醒</label><i class="fx"></i></div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	$("body").append(searchMsg);
	
	//展示弹出窗口
	function wj_popShow(){
		$(".wj_mark").show();
	    $(".wj_popUP").show();
	    $("body,html").css("overflow","hidden");
	};
	//关闭弹出窗口
	function wj_popClose(){
	    $(".wj_mark").hide();
	    $(".wj_popUP").hide();
	    $("body,html").css("overflow","auto");
	};
	
	
	$(".news_boar_tongzhi").on("click",function(){
//		$(".setTix").show();
//		$(".backbj").show();
//		$("body,html").css("overflow","hidden");
//		$(".czzx_tix").click();
		if(!$(".news_boar_duibi").hasClass("on")){
			errorAlert(null,"请先添加成自选股！");
			return false;
		}
        wj_popShow();
        //点击取消按钮关闭股价提醒
	});
	$(".wj_pop_btnCancel").on('click',function(){
        wj_popClose()
    });
	 	//点击空白处关闭股价提醒
    $(".wj_mark").on('click',function(){
        wj_popClose()
    });
    //点击X关闭股价提醒
    $(".wj_popUP_close").on('click',function(){
        wj_popClose()
    });
    //点击确定按钮，判断input是否为空&&checkbox是否选中,true关闭股价提醒
    $(".wj_pop_btnSubmit").on('click',function(){
        if($(".wj_priceList input").eq(0).val()!="" && $(".wj_priceList input").eq(1).val()!="" && $(".wj_priceList input").eq(2).val()!="" && $(".wj_checkbox label.checkbox").hasClass("on")){
            wj_popClose();
            $(".wj_searchMsg").addClass("wj_searchMsg_checked");
        }
    });
	//input获得焦点样式
    $(".wj_popUPInput input").on('focus',function(){
    		$(this).parent().css("border-color","#1e7bcd")
    });
    //input失去焦点样式
    $(".wj_popUPInput input").on('blur',function(){
    		$(this).parent().css("border-color","#d1d9df")
    });
	 //checkbox状态样式
    $(".wj_checkbox").on('click',function(e){
    	if($("#checkbox_div").find("label").hasClass("on")){
    		reportOpen=0;
    		$("#checkbox_div").find("label").removeClass("on");
    		e.stopPropagation()
    	}else{
    		reportOpen=1;
    		$("#checkbox_div").find("label").addClass("on");
    		e.stopPropagation()
    	}
    });
	//	点击股价提醒展开 
$(".set_zk").delegate("#setZk","click",function(e){
	if($(this).hasClass("on")){
		$(".set_down").slideDown();
//		$(".set_down").slideUp();
		$(this).removeClass("on");	
		$(this).html("收起");
//		
	}else{
		$(".set_down").slideUp();
		$(this).addClass("on");	
		$(this).html("展开");	
	}
	e.stopPropagation();
});

//点击股价提醒后的选框
$("#gjtx_xk>.data-checkbox>label.checkbox").on("click",function(e){
	if($(this).hasClass("on")){
		$(this).removeClass("on");
	}else{
		$(this).addClass("on");
	}
	e.stopPropagation();
})

//点击公告提醒后的选框
$("#ggtx_xk>.data-checkbox>label.checkbox").on("click",function(e){
	if($(this).hasClass("on")){
		$(this).removeClass("on");
	}else{
		$(this).addClass("on");
	}
	e.stopPropagation();
})

//仿复选框原来的开通提醒
$(".set_check .data-checkbox").delegate("label","click", function(e) {
// 此处dataType为1 是开通股价提醒   dataTYpe为2 为开通公告提醒
	var dataType=$(this).parent().find("label").attr("data-type");
	
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
//			$(this).siblings("label.checkboxWord").css("color", "");
			if(dataType=='1'){
				shareOpen="0";
			}else{
				reportOpen="0";
			}
		} else {
			$(this).addClass("on");
			$(this).siblings("label").addClass("on");
//			$(this).siblings("label.checkboxWord").css("color", "#2fa6dc");
			if(dataType=='1'){
				shareOpen="1";
			}else{
				reportOpen="1";
			}
		}
		e.stopPropagation();
	});
	findNewPrice();


});



//添加股价通知
function addBtStockAlert(){
	//修改于16-8-11
	var buyPrice=$("#buyPrice").val();
	var salePrice=$("#salePrice").val();
	var changeAmount=$("#changeAmount_1").val();
	//var content=$("#content").val();
	var reg=/^\d+(\.\d+)?$/;
	if(buyPrice!=null && buyPrice!="" && !reg.test(buyPrice)){
		errorAlert(null,"请输入正确的买入价格！");
		return false;
	}
	if(salePrice!=null && salePrice!="" && !reg.test(salePrice)){
		errorAlert(null,"请输入正确的卖出价格！");
		return false;
	}
	if(changeAmount!=null && changeAmount!="" && !reg.test(changeAmount)){
		errorAlert(null,"请输入正确的涨跌幅！");
		return false;
	}
	/*if((changeAmount==null || changeAmount=="") && (salePrice==null || salePrice=="") && (buyPrice==null || buyPrice=="")){
		errorAlert(null,"必须选择一个！");
		return false;
	}*/
	var data={stockCode:stockCode,stockName:stockName,buyPrice:buyPrice,salePrice:salePrice,changeAmount:changeAmount,reportOpen:reportOpen}
	if((changeAmount==null || changeAmount=="") && (salePrice==null || salePrice=="") && (buyPrice==null || buyPrice=="") && !($(".wj_checkbox label.checkbox").hasClass("on"))){
		deleBtStockAlert();
		closeAlert();
	}else{
		$.axs("/betaInvest/shareAlert/addBtStockAlert.do",data,true,function(data){
			if(data.retCode=="0000"){
				$(".news_boar_tongzhi").addClass("on");
				errorAlert(null,"保存成功！");
				closeAlert();
			}else{
				errorAlert(data.retCode, data.retMsg);
			}
		});
	}
}

//删除股票提醒 修改于16-8-11
function deleBtStockAlert(){
	var data={stockCode:stockCode}
	$.axs("/betaInvest/shareAlert/deleBtStockAlert.do",data,true,function(data){
		if(data.retCode=="0000"){
			$(".news_boar_tongzhi").removeClass("on");
			$("#buyPrice").val("");
			$("#salePrice").val("");
			$("#changeAmount_1").val("");
			//$("#checkbox_div").find("label").addClass("on");//取消全选
			reportOpen="1";//开通报告提醒
			$("#checkbox_div").find("label").addClass("on");//取消全选
		}
	});
}

//查询最新股价
function findNewPrice(){
	$.axs("/betaInvest/shareAlert/findNewPrice.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData!=null&& data.retData!=" " && data.retData!=undefined){
				if(data.retData.newPrice==null || (data.retData.newPrice=="" && data.retData.newPrice!=0) || data.retData.newPrice==undefined){
					data.retData.newPrice="--"
				}
				$("#g_newPrice").html(data.retData.newPrice);
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

function closeAlert(){
	$(".wj_mark").hide();
    $(".wj_popUP").hide();
    $("body,html").css("overflow","auto");
}

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass(comparisonStockCode,comparisonStockName){
	if($(".news_boar_pk").hasClass("on")){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$(".news_boar_pk").removeClass("on");
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$(".news_boar_pk").addClass("on");
		}
	}
}




/**
 * 查询公司基本信息
 */
function findCompanySurveyGPleft(){
	$.axs("/betaInvest/enterpriseData/findCompanySurvey.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData);
			if(data.retData != null){
				if(data.retData.opId != null){
					$(".news_boar_duibi").attr("data-opId",data.retData.opId);
					$(".news_boar_duibi").addClass("on");
				}
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询公司是否有股票提醒
 */
function findBtStockAlert(){
	$.axs("/betaInvest/shareAlert/findBtStockAlert.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null){
				$(".news_boar_tongzhi").addClass("on");
				var item=data.retData;
				$("#buyPrice").val(item.buyPrice);
				$("#salePrice").val(item.salePrice);
				$("#changeAmount_1").val(item.changeAmount);
				//$("#content").val(item.content);
				if(item.isReportOpen==1){
					$("#checkbox_div").find("label").addClass("on");//取消全选
					reportOpen="1";//开通报告提醒
				}else{
					$("#checkbox_div").find("label").removeClass("on");//取消全选
					reportOpen="0";//开通报告提醒
				}
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//限制股票价格只能输数字以及两位小数
function inputNumber(obj){
obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}