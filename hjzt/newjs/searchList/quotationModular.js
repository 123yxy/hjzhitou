 /**
 * 行情模块
 */

//loading
//var logding='<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
//$(".wj_companyData_info").prepend(logding);
//$(".wj_companyData_info").find(".loadingBox2").hide();

var qmStockCode = getUrlParam("stockcode");

// A股仅显示三部分
if(!isXSBCompany(qmStockCode))
	{
		$("#content_gsgk").hide();
		$("#content_sbgs").hide();
		$("#content_xw").hide();
		$("#content_gg").hide();
		$("#content_yb").hide();
		$("#fst").hide();// 隐藏分时图

      //  $(".wj_searchTab_t").children(1).hide();
	}
var stockName = "";
var type = getUrlParam("type");
var RXTDATA = {}; //日线图数据
var SZDATA = {}; //市值图数据
var FSTDATA = {}; //分时图数据
var reportOpen="1";//开通报告提醒
$(function(){
//	股价提醒
var searchMsg = '<div class="wj_mark"></div>';
	searchMsg += '<div class="wj_popUP">';
	searchMsg += '<div class="wj_popUP_close"></div>';
	searchMsg += '<div class="wj_popUP_wrap">';
	searchMsg += '<div class="wj_popUP_tit" >-股价提醒<span>（<i>*</i> 提示：操作中心-通知，查看提醒）</span></div>';
	searchMsg += '<div class="wj_currentPrice">当前价：<span id="g_newPrice">15.65</span></div>';
	searchMsg += '<ul class="wj_priceList wj_clear">';
	searchMsg += '<li><label>买入目标价</label><div class="wj_popUPInput"><input type="text" id="buyPrice" onkeyup="inputNumber(this)">元</div></li>';
	searchMsg += '<li><label>卖出目标价</label><div class="wj_popUPInput"><input type="text" id="salePrice" onkeyup="inputNumber(this)">元</div></li>';
	searchMsg += '<li><label>涨跌幅</label><div class="wj_popUPInput"><input type="text" id="changeAmount_1" onkeyup="inputNumber(this)">%</div></li>';
	searchMsg += '</ul>';
	searchMsg += '<div class="wj_popUP_btn">';
	//searchMsg += '<a class="wj_btn wj_btnSubmit wj_pop_btnSubmit" onClick=addBtStockAlert()>确定</a>';
	searchMsg += '<a class="wj_btn wj_btnSubmit wj_pop_btnSubmit">确定</a>';
	searchMsg += '<a class="wj_btn wj_btnCancel wj_pop_btnCancel" onClick=closeAlert()>取消</a>';
	searchMsg += '<div class="wj_checkbox">';
	searchMsg += '<div class="data-checkbox" id="checkbox_div"><input type="checkbox"><label class="checkbox on"></label><label class="checkboxWord">公告提醒</label><i class="fx"></i></div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	$("body").append(searchMsg);
	
	$(".wj_searchMsg").click(function(){
        wj_popShow();
    });
	//点击取消按钮关闭股价提醒
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
    	
        if(($(".wj_priceList input").eq(0).val()!="" || $(".wj_priceList input").eq(1).val()!="" || $(".wj_priceList input").eq(2).val()!="") && $(".wj_checkbox label.checkbox").hasClass("on")){
            wj_popClose();
            $(".wj_searchMsg").addClass("wj_searchMsg_checked");
            addBtStockAlert();
        }else if($("#buyPrice").val()=="" && $("#salePrice").val()=="" && $("#changeAmount_1").val()=="" && !($(".wj_checkbox label.checkbox").hasClass("on"))){
			deleBtStockAlert();
			wj_popClose();
			$(".wj_searchMsg").removeClass("wj_searchMsg_checked");
			
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
    $("#checkbox_div").on('click',function(){
    	if($("#checkbox_div").find("label").hasClass("on")){
    		reportOpen=0;
    		$("#checkbox_div").find("label").removeClass("on");
    	}else{
    		reportOpen=1;
    		$("#checkbox_div").find("label").addClass("on");
    	}
    });
	
	/**
	 *加入自选
	 */
	$(".wj_searchAdd").click(function(){
	    insertOptional();
	});
	//点击取消提醒的叉号
	$(".tc_shanchu_cha , .backbj").on("click",function(){
		$(".shanc_qux").click();
	})
	
	/**
	 * 跳转企业报告链接
	 */
	$("#qybgLj").on("click", function(){
		var host = window.location.host;
		if(host == "localhost" || host == "127.0.0.1"){
			host = "beta.159jh.com";
		}
		if(isHaveUrl("http://"+ host +"/reports/report_"+ qmStockCode +".html")){
			window.location.href = "http://"+ host +"/reports/report_"+ qmStockCode +".html";
		}
	})
	
	/**
	 *tab切换
	 */
	$(".wj_searchTab_t span").click(function(){
	    $(this).addClass("wj_active").siblings().removeClass("wj_active");
	    var index = $(this).index();
	    $(".wj_searchTab_c > div").css("z-index","2");
	    $(".wj_searchTab_c > div").eq(index).css("z-index","3");
	    // if($(this).text()=="日线图"){
	    //     $(".wj_searchTab_c div").css("z-index","2");
	    //     $("#wj_dailyData").css("z-index","3")
	    // }else if($(this).text()=="分时图"){
	    //     $(".wj_searchTab_c div").css("z-index","2");
	    //     $("#wj_fst").css("z-index","3")
	    // }else if($(this).text()=="市值"){
	    //     $(".wj_searchTab_c div").css("z-index","2");
	    //     $("#wj_marketValue").css("z-index","3")
	    // };
	})
	
	if(qmStockCode != null && qmStockCode != "" && type != null  && (type == 1 || type == 2 || type == 3)){
		initQuotaionData();
	}else{
		blockDiv.content_all = false;
		$(".wj_companyData").parent().hide();
		$("#changeValue").change();
	}
	
	/**
	 * 删除自选选择取消
	 */
	$(".shanc_qux").click(function(){
		$(".tips_shanchu").hide();
		$(".backbj").hide();
	})
	findBtStockAlert();
	findNewPrice();

	
	
})

/**
 * 查询公司基本信息
 */
function findCompanySurveyGPleft(){
	$.axs("/betaInvest/enterpriseData/findCompanySurvey.do",{stockCode:qmStockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null){
				$("#quotationModularTitle").text(((data.retData.companyForShort == null || data.retData.companyForShort == "") ? "--" : data.retData.companyForShort.replace(/\s+/g,"")) + "(" + data.retData.stockCode + ")");
				$("#quotationModularTitle").click(function(){
					window.open("/businessDetails/newTBindex.html?stockCode=" + data.retData.stockCode + "&stockName=" + ((data.retData.companyForShort == null || data.retData.companyForShort == "") ? "--" : data.retData.companyForShort));
				})
				if(data.retData.opId != null){
					$(".wj_searchAdd").attr("data-opId",data.retData.opId);
					$(".wj_searchAdd").toggleClass("wj_searchCut");
			        $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
				}
			}
		}else{
//			errorAlert(data.retCode, "数据飞走了，请重试~");
		}
	});
}

/**
 * 添加自选股
 */
function insertOptional(){
	if(!$(".wj_searchAdd").hasClass("wj_searchCut")){
		var opId = addOptional(qmStockCode,"");
		$(".wj_searchAdd").attr("data-opId",opId);
		$(".wj_searchAdd").toggleClass("wj_searchCut");
	    $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
	}else{
		$(".backbj").show();
		$(".tips_shanchu").show();
	};
};

/*
 * 取消自选
 */
function delOptional(){
	$(".wj_searchAdd").toggleClass("wj_searchCut");
    $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
    $("#addTips").removeClass("on");
	deleteOptional($(".wj_searchAdd").attr("data-opId"), qmStockCode);
	$(".tips_shanchu").hide();
	$(".backbj").hide();
	deleBtStockAlert();
}

/**
 *提醒弹层
 */
function wj_popShow(){
	$(".wj_mark").show();
    $(".wj_popUP").show();
    $("body,html").css("overflow","hidden");
};
function wj_popClose(){
    $(".wj_mark").hide();
    $(".wj_popUP").hide();
    $("body,html").css("overflow","auto");
};

/**
 * 初始化加载数据
 */
function initQuotaionData(sCode){
	qmStockCode = (sCode != undefined) ? sCode : qmStockCode;
	$(".wj_companyData").parent().show();
	findCompanySurveyGPleft();
	
	var flag1 ="";
	var flag2 ="";
	if(!isXSBCompany(qmStockCode))
	{
	flag1 = findHeadMsgByCodeA();
	flag2 = findRXSZDataA();
	console.log(1)
	}else{
		flag1 = findHeadMsgByCode();
		flag2 = findRXSZData();
console.log(2)
	}
	
	//市值和日线图
	
	
	//分时图
	var flag3 = findGraphData();
	if(!(flag1 || flag2 || flag3)){
		blockDiv.content_all = false;
		//$(".wj_companyData").parent().hide();
		$("#changeValue").change();
	}else{
		blockDiv.content_all = true;
	}


}

/**
 * 查询头部信息
 */
function findHeadMsgByCode(){
	var flag = false;
	$.axs("/betaInvest/common/findDetailHeder.do",{stockCode:qmStockCode}, false, function(data){
		if(data.retCode == 0000){
			if(data.retData != null){
				flag = true;
				var obj=jQuery.parseJSON(data.retData);
				$("#quotationModularUpdateTime").text("更新时间:" + (obj.updateTime == undefined ? "--" : obj.updateTime.substring(0, 10)));
				$("#quotationModularTitle").text(obj.stockName + "(" + obj.stockCode + ")");
				$("#quotationModularTitle").click(function(){
					window.open("/businessDetails/newTBindex.html?stockCode=" + obj.stockCode + "&stockName=" + obj.stockName);
				})
				stockName=obj.stockName;
				$(".wj_popUP_tit").prepend(obj.stockName+'('+obj.stockCode+')');
				//console.log(obj)
				if(obj.flag == 1){
					if(obj.changeAmount>=0){
						$(".wj_companyData_info_l").addClass("wj_companyData_info_up").removeClass("wj_companyData_info_down");
						$("#openPrice").addClass("up").removeClass("down");
					}else{
						$(".wj_companyData_info_l").addClass("wj_companyData_info_down").removeClass("wj_companyData_info_up");
						$("#openPrice").addClass("down").removeClass("up");
					}
					if(obj.openPrice=="" || obj.openPrice==null){
						$("#openPrice").text("--"); //今开
						$("#changeAmount").text("--"); //涨跌额
						$("#priceChangeRatio").text("--"); //涨跌幅
					}else{
						$("#openPrice").text(((obj.openPrice=="" && obj.openPrice!=0) || obj.openPrice==null)?"--":obj.openPrice.toFixed(2)); //今开
						$("#changeAmount").text(((obj.changeAmount=="" && obj.changeAmount!=0) || obj.changeAmount==null)?"--":obj.changeAmount.toFixed(2)); //涨跌额
						$("#priceChangeRatio").text((((obj.priceChangeRatio=="" && obj.priceChangeRatio!=0) || obj.priceChangeRatio==null)?"--":(obj.priceChangeRatio).toFixed(2)) + "%"); //涨跌幅
					}
					$("#newPrice").text((((obj.newPrice=="" && obj.newPrice!=0) || obj.newPrice==null) || obj.newPrice==null)?"--":obj.newPrice.toFixed(2)); //最新价
					$("#yclosePrice").text(((obj.yclosePrice=="" && obj.yclosePrice!=0) || obj.yclosePrice==null)?"--":obj.yclosePrice.toFixed(2)); //昨收
					$("#totalMarketValue").text((obj.totalMarketValue/100000000).toFixed(2) + "亿"); //总市值
					$("#cmValue").text(((obj.cmValue=="" && obj.cmValue!=0) || obj.cmValue==null)?"--":(obj.cmValue/100000000).toFixed(2) + "亿"); //流通市值
					$("#netRatio").text(((obj.netRatio=="" && obj.netRatio!=0) || obj.netRatio==null)?"--":obj.netRatio.toFixed(2)); //市净率
					$("#priceEarningRatio").text(((obj.priceEarningRatio=="" && obj.priceEarningRatio!=0) || obj.priceEarningRatio==null)?"--":(obj.priceEarningRatio.toFixed(2))); //市盈率
				}
			}
		}else{
//			errorAlert(data.retCode, "数据飞走了，请重试~");
		}
    });
	
	return flag;
}


//A股时调用方法
function findHeadMsgByCodeA(){
	var flag = false;
	
	       var  paraminfo='{"body":{"stockCode":"'+qmStockCode+'"}}';
                    $.axsRequest("FT344",paraminfo,true,function(data){
                        if(data.retCode=="0000"){
console.log(data)
                        if(data.retData != null){
				flag = true;
				var obj=jQuery.parseJSON(data.retData);
				console.log(obj);
				$("#quotationModularUpdateTime").text("更新时间:" + (obj.updateTime == undefined ? "--" : obj.updateTime.substring(0, 10)));
				$("#quotationModularTitle").text(obj.stockName + "(" + obj.stockCode + ")");
				$("#quotationModularTitle").click(function(){
					window.open("/businessDetails/newTBindex.html?stockCode=" + obj.stockCode + "&stockName=" + obj.stockName);
				})
				stockName=obj.stockName;
				$(".wj_popUP_tit").prepend(obj.stockName+'('+obj.stockCode+')');
				//console.log(obj)
				if(obj.flag == 1){
					if(obj.changeAmount>=0){
						$(".wj_companyData_info_l").addClass("wj_companyData_info_up").removeClass("wj_companyData_info_down");
						$("#openPrice").addClass("up").removeClass("down");
					}else{
						$(".wj_companyData_info_l").addClass("wj_companyData_info_down").removeClass("wj_companyData_info_up");
						$("#openPrice").addClass("down").removeClass("up");
					}
					if(obj.openPrice=="" || obj.openPrice==null){
						$("#openPrice").text("--"); //今开
						$("#changeAmount").text("--"); //涨跌额
						$("#priceChangeRatio").text("--"); //涨跌幅
					}else{
						$("#openPrice").text(((obj.openPrice=="" && obj.openPrice!=0) || obj.openPrice==null)?"--":obj.openPrice.toFixed(2)); //今开
						$("#changeAmount").text(((obj.changeAmount=="" && obj.changeAmount!=0) || obj.changeAmount==null)?"--":obj.changeAmount.toFixed(2)); //涨跌额
						$("#priceChangeRatio").text((((obj.priceChangeRatio=="" && obj.priceChangeRatio!=0) || obj.priceChangeRatio==null)?"--":(obj.priceChangeRatio).toFixed(2)) + "%"); //涨跌幅
					}
					$("#newPrice").text((((obj.newPrice=="" && obj.newPrice!=0) || obj.newPrice==null) || obj.newPrice==null)?"--":obj.newPrice.toFixed(2)); //最新价
					$("#yclosePrice").text(((obj.yclosePrice=="" && obj.yclosePrice!=0) || obj.yclosePrice==null)?"--":obj.yclosePrice.toFixed(2)); //昨收
					$("#totalMarketValue").text((obj.totalMarketValue/100000000).toFixed(2) + "亿"); //总市值
					$("#cmValue").text(((obj.cmValue=="" && obj.cmValue!=0) || obj.cmValue==null)?"--":(obj.cmValue/100000000).toFixed(2) + "亿"); //流通市值
					$("#netRatio").text(((obj.netRatio=="" && obj.netRatio!=0) || obj.netRatio==null)?"--":obj.netRatio.toFixed(2)); //市净率
					$("#priceEarningRatio").text(((obj.priceEarningRatio=="" && obj.priceEarningRatio!=0) || obj.priceEarningRatio==null)?"--":(obj.priceEarningRatio.toFixed(2))); //市盈率
				}
			}
                        }else{
                            errorAlert(data.retCode,data.retMsg)
                        }
                    })
	return flag;
}

/**
 * 查询市值和日线图数据
 */
function findRXSZData(){
	var flag = false;
	$.axs("/betaInvest/quotation/findRKSZ.do",{stockCode:qmStockCode},false,function(data){
		if(data.retCode=="0000"){
			var spj = []; //收盘价
			var cjl = []; //成交量
			
			var zsz = []; //总市值
			var ltsz = []; //流通市值
			
			var dateTime = [];
			
			$(data.retData).each(function(){
				spj.push(this.newPrice == null ? 0 : this.newPrice.toFixed(2));
				cjl.push(this.tradingVolume == null ? 0 : (this.tradingVolume/10000).toFixed(2));
				zsz.push(this.totalMarketValue == null ? 0 : (this.totalMarketValue/100000000).toFixed(2));
				ltsz.push(this.marketCapitalization == null ? 0 : (this.marketCapitalization/100000000).toFixed(2));
				
				dateTime.push(this.dataTime);
			})
			if(dateTime.length > 0){
				flag = true;
			}
			SZDATA = {"zsz":zsz, "ltsz":ltsz, "dateTime":dateTime};
			RXTDATA = {"spj":spj, "cjl":cjl, "dateTime":dateTime};
			
			dailyData();
			marketValue();
		}else{
//			errorAlert(data.retCode, "数据飞走了，请重试~");
		}
	});
	return flag;
}
/**
 * 查询市值和日线图数据  A股
 */
function findRXSZDataA(){
	var flag = false;
	// console.log("findRXSZDataA.stockCode:"+qmStockCode)
	         paraminfo='{"body":{"stockCode":"'+qmStockCode+'"}}';
                    $.axsRequest("FT342",paraminfo,true,function(data){
      //               	console.log("in return1")
      //               	console.log(data);
						// console.log("in return2")
      //               	console.log(data.retCode);
                        if(data.retCode=="0000"){
                        	 
                       var spj = []; //收盘价
						var cjl = []; //成交量
						
						var zsz = []; //总市值
						var ltsz = []; //流通市值
						
						var dateTime = [];
						
						$(data.retData).each(function(){
							spj.push(this.newPrice == null ? 0 : this.newPrice.toFixed(2));
							cjl.push(this.tradingVolume == null ? 0 : (this.tradingVolume/10000).toFixed(2));
							zsz.push(this.totalMarketValue == null ? 0 : this.totalMarketValue);
							ltsz.push(this.marketCapitalization == null ? 0 : this.marketCapitalization);
							dateTime.push(this.dataTime);
						})
						if(dateTime.length > 0){
							flag = true;
						}
						SZDATA = {"zsz":zsz, "ltsz":ltsz, "dateTime":dateTime};
						RXTDATA = {"spj":spj, "cjl":cjl, "dateTime":dateTime};
						console.log("SZDATA:")
						console.log(SZDATA);
						dailyData();
						marketValue();
                        }else{
                            errorAlert(data.retCode,data.retMsg)
                        }
                    })
	return flag;
}


/**
 * 查询分时图数据
 */
function findGraphData(){
	var flag = false;
	$.axs("/betaInvest/quotation/findGraphData.do",{stockCode:qmStockCode},false,function(data){
		if(data.retCode=="0000"){
			//console.log("分时图：" + data.retData);
			var newPrice = [];
			var CJJ = [];
			var ZDF = [];
			var arrCurTime = [];
			if(data.retData != null){
				$(data.retData).each(function(){
					newPrice.push(this.price);
					ZDF.push(this.priceChangeRatio);
					CJJ.push(this.tradingVolume);
					arrCurTime.push(this.date);
				})
			}
			if(arrCurTime.length > 0){
				flag = true;
			}
			FSTDATA = {"newPrice":newPrice, "CJJ":CJJ, "ZDF":ZDF, "arrCurTime":arrCurTime};
			
			fst();
		}else{
//			errorAlert(data.retCode, "数据飞走了，请重试~");
		}
	});
	return flag;
}


function addZero(val, len, top){
	if (!arguments[1]) len = 2;
	if (!arguments[2]) top = true;

	if (val.toString().length < len) 
	{
		while (len != val.toString().length)
		{
			if (top) val = "0" + val.toString();
			else val = val.toString() + "0";
		}
	}
	return val.toString();
}

function getCurDate(){
	return [new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate())].join("");
}

/**
 * 根据数组及值获取下标
 * @param {Object} arr
 */
function getArrIndex(arr, d){
	var i = -1;
	$(arr).each(function(index, item){
		if(arr[index] == d){
			i = index;
		}
	})
	return i;
}


/*******************************************股价提醒----begin*********************************************/
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
	var data={stockCode:qmStockCode,stockName:stockName,buyPrice:buyPrice,salePrice:salePrice,changeAmount:changeAmount,reportOpen:reportOpen}
	$.axs("/betaInvest/shareAlert/addBtStockAlert.do",data,true,function(data){
		if(data.retCode=="0000"){
			$(".wj_searchMsg").addClass("wj_searchMsg_checked");
			//$(".news_boar_tongzhi").addClass("on");
			$("#addTips").addClass("on");
//			errorAlert(null,"保存成功！");
			closeAlert();
			//修改于16-8-11
			/*if(!$(".news_boar_duibi").hasClass("on")){
				var opId = addOptional(stockCode,"");
				$(".news_boar_duibi").attr("data-opId",opId);
				$(".news_boar_duibi").addClass("on");
			}*/
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}



//删除股票提醒 修改于16-8-11
function deleBtStockAlert(){
	var data={stockCode:qmStockCode}
	$.axs("/betaInvest/shareAlert/deleBtStockAlert.do",data,true,function(data){
		if(data.retCode=="0000"){
			$(".wj_searchMsg").removeClass("wj_searchMsg_checked");
			//$(".news_boar_tongzhi").removeClass("on");
			$("#buyPrice").val("");
			$("#salePrice").val("");
			$("#changeAmount_1").val("");
			//$("#checkbox_div").find("label").addClass("on");//取消全选
			reportOpen="1";//开通报告提醒
		}
	});
}

//查询最新股价
function findNewPrice(){
	$.axs("/betaInvest/shareAlert/findNewPrice.do",{stockCode:qmStockCode},true,function(data){
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
 * 查询公司是否有股票提醒
 */
function findBtStockAlert(){
	$.axs("/betaInvest/shareAlert/findBtStockAlert.do",{stockCode:qmStockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null){
				//$(".news_boar_tongzhi").addClass("on");
				$(".wj_searchMsg").addClass("wj_searchMsg_checked");
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

/*******************************************股价提醒----end*********************************************/

/**
 * 分时图
 */
function fst(){
//	console.log(FSTDATA)
	var newPrice = FSTDATA.newPrice;
	var CJJ = FSTDATA.CJJ;
	var ZDF = FSTDATA.ZDF;
	var dataDate = FSTDATA.arrCurTime;
	var STOCK_CODE = "601099";
	var START_ID = getCurDate() + "0925";
	var END_ID = getCurDate() + "1500";
	var short_date = getCurDate();
	var short_id = "0925";
	var time_pos = "09:25";

	// 基于准备好的dom，初始化echarts实例
	var myChart1 = echarts.init(document.getElementById('wj_fst'));
	// 基于准备好的dom，初始化echarts实例
	//var myChart2 = echarts.init(document.getElementById('newnumber'));


	//***************************************************************//
	// 初始化 x轴 
	//***************************************************************//
	var dtCurDate = new Date();
	var arrCurTime = [];
	//arrCurTime.push(new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 9, 25, 0, 0));
//	arrCurTime.push("09:25");
//	arrCurTime.push("09:26");
//	arrCurTime.push("09:27");
//	arrCurTime.push("09:28");
//	arrCurTime.push("09:29");
	var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 9, 30, 0, 0)
	
	for (var i=0; i<=120; i++)
	{
		arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
		dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
	}
	var dtTimePM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 13, 0, 0, 0)
	for (var i=0; i<=120; i++)
	{
		arrCurTime.push([addZero(dtTimePM.getHours()), addZero(dtTimePM.getMinutes())].join(":"));
		dtTimePM = new Date(dtTimePM.getTime() + 60*1000);
	}
	//***************************************************************//
//	最新价格
	var line_data = [] /*[8.9,10,25,25.6,25.6,25.6,25.6,25.6,25.6,30,30]*/;
	for (var i=0; i<arrCurTime.length; i++)
	{
		line_data.push( {name: arrCurTime[i], value: ((newPrice[getArrIndex(dataDate, arrCurTime[i])] == undefined || newPrice[getArrIndex(dataDate, arrCurTime[i])] == null) ? "-" : newPrice[getArrIndex(dataDate, arrCurTime[i])])} );
	}
//	最新成交量
	var bar_data = []/*[15.9,110,254,25.6,25.6,25.6,25.6,25.6,25.6,300,325]*/;
	for (var i=0; i<arrCurTime.length; i++)
	{
		bar_data.push( {name: arrCurTime[i], value: ((CJJ[getArrIndex(dataDate, arrCurTime[i])] == undefined || CJJ[getArrIndex(dataDate, arrCurTime[i])] == null) ? "-" : CJJ[getArrIndex(dataDate, arrCurTime[i])])} );
	}
	//涨跌幅
//	var zd_data = []/*[10.9,32,25.4,52.6,33.6,65.6,25.6,44.6,76.6,150,25]*/;
//	for (var i=0; i<arrCurTime.length; i++)
//	{
//		zd_data.push( {name: arrCurTime[i], value: ((ZDF[getArrIndex(dataDate, arrCurTime[i])] == undefined || ZDF[getArrIndex(dataDate, arrCurTime[i])] == null) ? "-" : ZDF[getArrIndex(dataDate, arrCurTime[i])])} );
//	}
	function getDataPos(time)
	{
		for (var i=0; i<line_data.length; i++)
		{
			if (time == line_data[i].name) return i;
		}
	}
	option1 = {
		title : {
		},
		tooltip : {
			trigger : 'axis',
//			axisPointer : {
//				type : 'line'
//			},
			position : 'top',
			formatter:function(params){
				//console.log(params)
				return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia">'+params[1].seriesName+'（万股）：</span>'+
								'<span class="shuju2">'+params[1].value+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="cjl_shuju">'+params[0].seriesName+'（元）：</span>'+
								'<span class="shuju2">'+params[0].value+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';
			}
		},
		legend:{
			show:true,
			top:10,
			data:["成交量","股价"]
		},
		grid : {
			top : '20%',
			left : '5%',
			right : '3%',
			bottom : '10%'
		},
		xAxis : {
			boundaryGap : false,
			type : 'category',
			splitLine : {
				show : true,
				interval : function (index, value) {
					if (value == "09:15" 
						|| value == "09:30"
						|| value == "10:30"
						|| value == "11:30"
						|| value == "14:00"
						|| value == "15:00") {
						return true;
					}
					else return false;
				}
			},
			data: arrCurTime,
			scale: true,
			axisTick : {
				show : true,
				interval : function (index, value) {
					if (value == "09:15" 
						|| value == "09:30"
						|| value == "10:30"
						|| value == "11:30"
						|| value == "14:00"
						|| value == "15:00") {
						return true;
					}
					else return false;
				}
			},
			axisLabel : {
				show : true,
				interval : 0,
				formatter: function (value, index) {
					if (value == "09:15" 
						|| value == "09:30"
						|| value == "10:30"
						|| value == "11:30"
						|| value == "14:00"
						|| value == "15:00") {
						return value;
					} else {
						return "";
					}
				}
			},
		},
		yAxis : [ {
			scale : true,
			splitArea : {
				show : true
			}
		}/*,
		{
			scale : true,
			splitArea : {
				show : true
			}
		}*/],
		series : [ {
			name : '股价',
			type:'line',
			symbol:'none',
            itemStyle: {
                normal: {
                    color: '#feb535'
                }
            },
			data : line_data
		},
		{
			name : '成交量',
			type:'bar',
			symbol:'none',
			barWidth:'30',
            itemStyle: {
                normal: {
                    color: '#2789df'
                }
            },
			data : bar_data
		}]
	};

	option2 = {
		title : {
		},
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'line'
			},
			position : 'top',
			formatter:function(params){
				//console.log(params)
			}
		},
		grid : {
			top : '5%',
			left : '8%',
			right : '3%',
			bottom : '15%'
		},
		xAxis : {
			boundaryGap : false,
			type : 'category',
			splitLine : {
				show : true,
				interval : function (index, value) {
					if (value == "09:15" 
						|| value == "09:30"
						|| value == "10:30"
						|| value == "11:30"
						|| value == "14:00"
						|| value == "15:00") {
						return true;
					}
					else return false;
				}
			},
			data: arrCurTime,
			scale: true,
			axisTick : {
				show : true,
				interval : function (index, value) {
					if (value == "09:15" 
						|| value == "09:30"
						|| value == "10:30"
						|| value == "11:30"
						|| value == "14:00"
						|| value == "15:00") {
						return true;
					}
					else return false;
				}
			},
			axisLabel : {
				show : true,
				interval : 0,
				formatter: function (value, index) {
					if (value == "09:15" 
						|| value == "09:30"
						|| value == "10:30"
						|| value == "11:30"
						|| value == "14:00"
						|| value == "15:00") {
						return value;
					} else {
						return "";
					}
				}
			},
		},
		yAxis : [ {
			scale : true,
			splitArea : {
				show : true
			}
		}],
		series : [ {
			name : '成交量',
			type:'bar',
            itemStyle: {
                normal: {
                    color: '#688db1'
                }
            },
			data : bar_data
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart1.setOption(option1);
//	myChart2.setOption(option2);
	
	var app = {};
	app.timeTicket = setInterval(function () {
		if (parseInt(short_date + short_id) < parseInt(END_ID))
		{
			// line_data.push(randomData(arrCurTime[pos]));
			// line_data.splice(pos, 1, randomData(arrCurTime[pos]));
		}
		else if (parseInt(short_date+short_id) == parseInt(END_ID))
		{
			// getLineData();
			clearInterval(app.timeTicket);
		}
	}, 1000);
	
	///echarts.connect([myChart1, myChart2]);
	window.onresize = function(){
		// alert("asdfasdfasdf");
		myChart1.resize();
//		myChart2.resize();
	};
}

//日线图
function dailyData(){
	console.log("日线图");
	console.log(RXTDATA)
	var dateTime = RXTDATA.dateTime;
	var cjl = RXTDATA.cjl;
	var spj = RXTDATA.spj;
	//console.log(RXTDATA)
	var myChart = echarts.init(document.getElementById('wj_dailyData'));
    var option = {
        yAxis: [{
            type: "value",
//            name:'单位：元/股',
            axisLabel: {
                formatter: '{value}'
            }
        }/*,
        {
        	type: "value",
            name:'单位：元',
            axisLabel: {
                formatter: '{value}'
            }
        }*/
        ],
        legend:{
        	show:true,
        	data:['成交量','收盘价']
        },
        grid : {
			top : '20%',
			left : '5%',
			right : '3%',
			bottom : '10%'
		},
        xAxis: [{
            type: 'category',
            data: dateTime
        }],
	      tooltip:{
	      	enterable:true,//鼠标可以进入提示信息里面
	      	show:true,
	      	trigger:'axis',
	      	position:'top',
    	    formatter: function(params) {
    	    	//console.log(params)
    	    	var dw = "";
    	    	if(params.seriesName == "收盘价"){
    	    		dw = "元";
    	    	}else{
    	    		dw = "万股";
    	    	}
    	    	//console.log(params)
    	    	return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia">成交量（万股）</span>'+
								'<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="cjl_shuju">收盘价（元）</span>'+
								'<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';		
    	    	//return "日期    " + params.name + "<br />" + params.seriesName + "    " + params.data + dw;
	        }
	      },
        series: [{
            name: "成交量",
            type: 'bar',
            barWidth:'30',
            data: cjl,
            itemStyle:{
            	normal:{
            		color:"#62a6f2"
            	},
            	emphasis:{
                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
                }
            },
             label:{
            	normal:{
            		show:true,
            		position:'top',
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
            	}
            }
        },
        {
            name: "收盘价",
            type: 'line',
            symbol:'circle',
            //barWidth:'30',
            data: spj,
            itemStyle:{
            	normal:{
            		color:"#feb535"
            	}
            },
            label:{
            	normal:{
            		show:true,
            		position:'top',
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
            	}
            }
        }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}

//市值
function marketValue(){
	//console.log(SZDATA);
	var dateTime = SZDATA.dateTime;
	var zsz = SZDATA.zsz;
	var ltsz = SZDATA.ltsz;

	
	var myChart = echarts.init(document.getElementById('wj_marketValue'));
    var option = {
        yAxis: [{
            type: "value"
           // data: []
        }],
        legend:{
        	show:true,
        	data:['总市值','流通市值']
        },
        grid : {
			top : '20%',
			left : '5%',
			right : '3%',
			bottom : '10%'
		},
        xAxis: [{
            type: 'category',
            data: dateTime
        }],
	      tooltip:{
	      	enterable:true,//鼠标可以进入提示信息里面
	      	show:true,
	      	trigger:'axis',
	      	position:'top',
    	    formatter: function(params) {
    	    	//console.log(params)
    	    	return	'<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="zong_shizhi">总市值（亿）</span>'+
								'<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="zong_shizhi">流通市值（亿）</span>'+
								'<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';	
    	    	
    	    	//return "日期    " + params.name + "<br />" + params.seriesName + "    " + params.data + "亿元";
	        }
	      },
        series: [{
            name: "总市值",
            type: 'line',
            symbol:'circle',
            data: zsz,
            itemStyle:{
            	normal:{
            		color:"#36b8f4"
            	}
            },
             label:{
        		normal:{
        			show:true,
        			position:"top",
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
        		}
        	}
        },
        {
            name: "流通市值",
            type: 'line',
            symbol:'circle',
            //barWidth:'30',
            data: ltsz,
            itemStyle:{
            	normal:{
            		color:"#ffac1c"
            	}
            },
            label:{
        		normal:{
        			show:true,
        			position:"top",
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
        		}
        	}
        }
        ]
    };
 
    console.log(option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}