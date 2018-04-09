var stockCode= getUrlParam("stockCode");

//模拟用户ID入缓存
//var userId = localStorage.getItem("userId");
var contrasts = findContrastCompany();


var lng = localStorage.getItem("lng");
var lat = localStorage.getItem("lat");
var map = new BMap.Map("map"); // 创建Map实例
var point = new BMap.Point(lng, lat); // 地图中心点，广州市
map.centerAndZoom(point, 10); // 初始化地图,设置中心点坐标和地图级别。
map.enableScrollWheelZoom(true); // 启用滚轮放大缩小
// 向地图中添加缩放控件
var ctrlNav = new window.BMap.NavigationControl({
	anchor : BMAP_ANCHOR_TOP_LEFT,
	type : BMAP_NAVIGATION_CONTROL_LARGE
});
map.addControl(ctrlNav);

// 向地图中添加缩略图控件
var ctrlOve = new window.BMap.OverviewMapControl({
	anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
	isOpen : 1
});
map.addControl(ctrlOve);
// 添加选择城市的控件
makecitylist(map);
// 向地图中添加比例尺控件
var ctrlSca = new window.BMap.ScaleControl({
	anchor : BMAP_ANCHOR_BOTTOM_LEFT
});
map.addControl(ctrlSca);

var markerArr = [];
var haveRank = false; // 是否含有排名
var clickPageNum = 2; // 翻页页数
var pageTotal = 0; // 总页数
var initCity = "";

$(function() {
	
	$("#stock").val(stockCode);
	
var ipdata = eval(remote_ip_info); //获取城市
	initCity = ipdata['city'];
dqmap();
function dqmap(){
		
	if(lng != null && lat != null){
		loadPlace(lng, lat, 10);
	}else{
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(initCity, function(point){
			loadPlace(point.lng, point.lat, 10); //传入的经纬度应该为现在当前地区或者搜索的地区的经纬度
			localStorage.setItem("lng",point.lng);
			localStorage.setItem("lat",point.lat);
	
		},initCity);
	}
	return true;
}
	/**
	 * 初始化加载公司行情信息
	 */
	loadIniQuotationMsg(1, 1, 10);
	var size=$(".map_r_info table tbody").find("tr").size();
	var windows_w=$(window).width();
	if(size>=10){
		if(windows_w>1600){
		$(".map_title_wz").css("width","97%");	
		}else{
		$(".map_title_wz").css("width","95%");	
		}
	}else{
		$(".map_title_wz").css("width","100%");
	}

	/**
	 * 加载二级行业
	 */
	loadTrade(0,2);
	
	/**
	 * 更改行业已选择数量
	 */
	$(".choo").click(function(){
		var num = 0;
		$(".choo").each(function(){
			if(this.checked){
				num++;
			}
		})
		$("#che_yx").text("(" + num + ")");
	});
	

	/**
	 * 点击更改时间段
	 */
	$("[name='time']").click(function(){
		$("[name='showTime']").each(function(index, item){
			if($(this).attr("data-value") != undefined && $(this).attr("data-value") != ""){
				if(index == 0){
					$(this).text("天");
				}
				if(index == 1){
					$(this).text("月");
				}
				if(index == 2){
					$(this).text("年");
				}
				$(this).attr("data-value","");
			}
		})
		$(this).parent().prev().attr("data-value",$(this).attr("data-value")); //添加data-value属性值
		$(this).parent().prev().text($(this).text()); //更改文字
		$(this).parent().slideUp();
		loadIniQuotationMsg(1, 1, 10);
	})
	
	/**
	 * 通过股票代码和股票名称搜索
	 */
	$("#stock").keyup(function(event) {
		if (event.keyCode == 13) {
			if($("#stock").val() != ""){
				loadIniQuotationMsg(1, 1, 10);
			}else{
				$.zmAlert("参数为空");
			}
		}
	});
	//点击文字也可以使复选框选中
    $(".r_indu_list ul li em").on("click",function(){
    	
    	if($(this).siblings("input[type='checkbox']").is(':checked')==true){
    		$(this).siblings("input[type='checkbox']").attr("checked", false);
    		var num = 0;
    		$(".chee").each(function(){
    			if($(this).siblings("input[type='checkbox']").is(':checked')==true){
    				num++;
    			}
    			$("#che_yx").text("(" + num + ")");
    		});
    		
    		return false;
    	}else{
    		$(this).siblings("input[type='checkbox']").attr("checked", true);
    		var num = 0;
    		$(".chee").each(function(){
    			if($(this).siblings("input[type='checkbox']").is(':checked')==true){
    				num++;
    			}
    			$("#che_yx").text("(" + num + ")");
    		});
    		
    		return false;
    	}
    	
    });
    
    
    /*********信息补全开始***********/
	$("#stock").keydown(function(e) {
		if(e.keyCode==13){
			$("#btn").click();
			$("#ui-id-2").hide();
		}
	});
	$("#stock").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findByCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		}
	});
	/*********信息补全结束***********/
    
})
/*
 * 添加地图中的城市切换
 */
function makecitylist(map) { // 城市列表
	var size = new BMap.Size(50, 20);
	var mapList = new BMap.CityListControl({
		anchor : BMAP_ANCHOR_TOP_RIGHT,
		offset : size,
		onChangeAfter : function(e) {
			// 清除地图所有覆盖物，包括Marker
			loadIniQuotationMsg(1, 1, 10);
		}
	});
	map.addControl(mapList);
}

/**
 * 加载行业
 */
function loadTrade(type,level) {
	$.axs("/betaStock/common/findTrade.do", {categorType:type,levelId:level}, false, function(data) {
			if (data.retCode == "0000") {
				if (data.retData != null) {
					var firstLetter = ""; // 控制是否追加大写字母
					var html = ""; // 追加的html代码
					$(data.retData).each(
						function(index, item) {
							if (firstLetter != this.pinyinHeader) {
								firstLetter = this.pinyinHeader;
								if (index != 0) {
									html += "</ul><div class='clr'></div></div>";
								}
								html += "<div class='r_indu_list'><i>"
										+ firstLetter
										+ "</i><ul>";
							}
							html += "<li title='"+this.categoryName+"'><em class='chee'>"
									+ this.categoryName.substring(0,7)
									+ "</em><input type='checkbox' data-value="
									+ this.categoryId
									+ " class='choo'/></li>";
							if ((data.retData.length - 1) == index) {
								html += "</ul><div class='clr'></div></div>";
							}
						});
					$("#tradeList").append(html);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}

/**
 * 获取查询条件
 */
function searchCondition(){
	var conditions = "";
	var industries = "";
	//时间段的选择
	$("[name='showTime']").each(function(){
		if($(this).attr("data-value") != undefined && $(this).attr("data-value") != ""){
			conditions += "&dataTime="+$(this).attr("data-value");
		}
	});
	//区域的选择
	if($("#cur_city_name").text() != ""){
		conditions += "&state="+$("#cur_city_name").text();
	}
	//行业的选择
	$(".choo").each(function(){
		if(this.checked){
			industries += $(this).attr("data-value") + ",";
		}
	})
	if(industries != ""){
		conditions += "&industries="+industries;
	}
	//股票代码或者股票名称的选择
	if($("#stock").val() != ""){
		conditions += "&stock="+$("#stock").val().replace(/(^\s*)|(\s*$)/g, "");
	}
	return conditions;
}

function loadIniQuotationMsg(type, pageNum, pageSize){
	map.clearOverlays();
	var conditions = searchCondition();
	if(conditions==""){
		var ipdata = eval(remote_ip_info); // 获取城市
		initCity = ipdata['city'];
		conditions += "&state=" + initCity;
	}
	//console.log("a");
	$.axs("/betaInvest/quotationRecordMap/findCompanyQuotationList.do","pageNum="+pageNum+"&pageSize="+pageSize+conditions,false,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData)
			pageTotal = data.retData.pageTotal;
			if(type == 1){
				markerArr = [];
				clickPageNum=2;
				if (pageTotal == 1 || pageTotal == 0) {
                    $("#moreData").text("没有更多数据");
                } else {
                	$("#moreData").text("点击查看更多");
                }
			}
			$("#list").empty();
			var arrTemp = []; //临时存放数组的地方
			if((data.retData.quoList != null && data.retData.quoList != "") || (data.retData.cqr != null && data.retData.cqr != "")){
				if(data.retData.quoList != null){
					$("#loadMoreTr").show();
					arrTemp = data.retData.quoList;
					markerArr = markerArr.concat(arrTemp);
					if(data.retData.quoList.length<3){
						$("#loadMoreTr").hide();
					}
				}else{
					haveRank = true;
					markerArr = data.retData.cqr;
					$("#stock").val("");
					$("#loadMoreTr").hide();
				}
//				pageTotal = data.retData.pageTotal;
//				if(conditions.indexOf("state") != -1 && arrTemp.length != 0){
					// 将地址解析结果显示在地图上,并调整地图视野
                	loadPlace(); //传入的经纬度应该为现在当前地区或者搜索的地区的经纬度
//				}
			}else{
				$("#moreData").text("暂无数据");
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

function loadPlace() {
    var point = new Array(); //存放标注点经纬信息的数组
    var marker = new Array(); //存放标注点对象的数组
    var info = new Array(); //存放提示信息窗口对象的数组
    //获取经纬度
    $(markerArr).each(function(index,item){
    	var company = this;
    	var myGeo = new BMap.Geocoder();
    	var myIcon = new BMap.Icon("/saasBeta/images/markers.png", new BMap.Size(23, 25));
//  	此处图片地址http://api.map.baidu.com/img/markers.png
    	// 将地址解析结果显示在地图上,并调整地图视野
    	myGeo.getPoint(company.businessAddress, function(point){
    		var p0 = point.lng; //
            var p1 = point.lat; //按照原数组的point格式将地图点坐标的经纬度分别提出来
            point[index] = new window.BMap.Point(p0, p1); //循环生成新的地图点
            marker[index] = new window.BMap.Marker(point[index], {icon: myIcon});//按照地图点坐标生成标记
            map.addOverlay(marker[index]);
              var tips='<div class="map_b">';
				tips+='<div class="mp_title">';
				tips+='<div class="mp_tit_l fl"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+item.stockName+'&stockCode='+item.stockCode+'">';
				tips+='<h2>'+item.stockName+'</h2>';
				tips+='<span>('+item.stockCode+')</span>';
				tips+='</div><a/>';
				tips+='<div class="mp_tit_r fl">';
				
				if(item.priceChangeRatio>=0){
					tips+='<span class="gp_up">'+(item.newPrice).toFixed(2)+'</span>';
					tips+='<i class="gp_up"></i>';
					tips+='<em class="gp_up">'+(item.priceChangeRatio == null ? "--" : item.priceChangeRatio.toFixed(2))+'%</em>';
				}else{
					tips+='<span class="gp_down">'+(item.newPrice).toFixed(2)+'</span>';
					tips+='<i class="gp_down"></i>';
					tips+='<em class="gp_down">'+item.priceChangeRatio.toFixed(2)+'%</em>';
				}
				tips+='<div class="clr"></div>';
				tips+='</div>';
				tips+='<div class="clr"></div>';
				tips+='<div class="mp_btn_d">';
//				if(contrasts != null){
//					var contrast = contrasts.split(",");
//					$(contrast).each(function(){
//						var val = this.split("-");
//						if(val[0] == item.stockCode){
//							duibi = "删除对比";
//						}
//					})
//				}
				if(isTrue(item.stockCode)){
					tips+='<a href="javascript:;" data-value="'+item.stockCode+'" onclick="addorDeleOptional(this)" id="zxgId" class="zx_sc_icon on">删除自选</a>';
				}else{
					tips+='<a href="javascript:;" data-value="'+item.stockCode+'"  onclick="addorDeleOptional(this)" id="zxgId" class="zx_jr_icon">加入自选</a>';
				}
				
//				var duibi = "加入对比";
//				var userId=localStorage.getItem("userId");
				var showName = findContrastCompany();
				if(showName!=null && showName!="" && showName!=undefined && showName.indexOf(item.stockCode)>-1 && showName.indexOf(item.stockName)>-1){
//					duibi="删除对比";
					tips+='<a data-name='+item.stockName+' data-code='+item.stockCode+' href="javascript:;" id="duibi_'+item.stockCode+'" onclick="addComparisonStockClass(\''+item.stockCode+'\',\''+item.stockName+'\')" class="db_jr_icon on">删除对比</a>';
				}else{
					tips+='<a data-name='+item.stockName+' data-code='+item.stockCode+' href="javascript:;" id="duibi_'+item.stockCode+'" onclick="addComparisonStockClass(\''+item.stockCode+'\',\''+item.stockName+'\')" class="db_jr_icon">加入对比</a>';
				}
				//
				//<a data-name='+item.stockName+' data-code='+item.stockCode+' href="javascript:;" id="duibi_'+item.stockCode+'" onclick="addComparisonStockClass(\''+item.stockCode+'\',\''+item.stockName+'\')" class="db_jr_icon">'+duibi+'</a>
				tips+='</div>';
				tips+='<div class="clr"></div>';
				tips+='</div>';
				tips+='<div class="clr"></div>';
				tips+='<div class="mp_info_tips">';
				tips+='<p>公司网址：<a '+item.companyUrl+' == null ? "--" : href=http://'+item.companyUrl+' target="_blank">'+(item.companyUrl == null ? "--" : item.companyUrl)+'</a></p>';
				tips+='<p>董秘：'+item.secretary+'<em></em>董事长：'+item.chairman+'</p>';
				tips+='<p>联系电话：'+item.phone+'</p>';
				tips+='<p>办公地址：'+item.businessAddress+'</p>';
				tips+='<div class="tips_dh">';
				tips+='<a href="#">导航</a></div></div></div>';
              info[index] = new window.BMap.InfoWindow(tips); // 创建信息窗口对象
				if(showName!=null && showName!="" && showName!=undefined && showName.indexOf(item.stockCode)>-1 && showName.indexOf(item.stockName)>-1){
					$("#zx_jr_icon").removeClass("on");
				}else{
					$("#zx_jr_icon").addClass("on");
				}
              openInfo(marker[index],info[index]);
        	  $("#tr_"+index).mouseover(function(){
        		  marker[index].openInfoWindow(info[index]);
        		  var contentCK = info[index].content;
        		  var ckCode = contentCK.substring(contentCK.indexOf("&stockCode=") + 11, contentCK.indexOf('"><h2>'));
        		  var showName = findContrastCompany();
        		  if(isTrue(ckCode)){
        			  $("#zxgId").removeClass().addClass("zx_sc_icon");
        			  $("#zxgId").text("删除自选");
        		  }else{
        				$("#zxgId").removeClass().addClass("zx_jr_icon");
        			  $("#zxgId").text("加入自选");
        		  }
        		  if(showName.indexOf(ckCode) > -1){
        			  $("#duibi_"+ckCode).addClass("on");
        			  $("#duibi_"+ckCode).text("删除对比");
        		  }else{
        			  $("#duibi_"+ckCode).removeClass("on");
        			  $("#duibi_"+ckCode).text("加入对比");
        		  }
        		  
        		  
              });
    	});
        var tr= $("<tr id='tr_"+index+"'>");
        var td1= $("<td>");
        if(haveRank){
        	td1.text(item.ranking);
        }else{
        	td1.text(index+1);
        }
//                  公司
        var td2= $("<td>");
        var sp=$("<a target='_blank' href='/businessDetails/newTBindex.html?stockName="+item.stockName+"&stockCode="+item.stockCode+"'><span>");
        sp.text(item.stockName);
        var td_2=td2.append(sp);
//                  最新价
        var td3= $("<td>");
        var t_i1=$("<i>");
        if(item.priceChangeRatio < 0){
        	t_i1.css("color","green");
        }
        t_i1.text((item.newPrice).toFixed(2));
        var td_3=td3.append(t_i1);
//                  涨跌幅
        var td4= $("<td>");
        var t_i2=$("<i>");
        if(item.priceChangeRatio < 0){
        	t_i2.css("color","green");
        }
        t_i2.text((item.priceChangeRatio == null ? "--" : item.priceChangeRatio.toFixed(2)) + "%");
        var td_4=td4.append(t_i2);
        tr.append(td1);
        tr.append(td_2);
        tr.append(td_3);
        tr.append(td_4);
        $("#list").append(tr);
        //console.log(tr);
        top++;
    });
    haveRank = false;
}

function openInfo(mak,info){
	mak.addEventListener("click", function () {
        this.openInfoWindow(info);
    });
}

/**
 * 点击查看更多分页
 */
function loadPage(data){
	if(clickPageNum <= pageTotal){
		loadIniQuotationMsg(2, clickPageNum, 10);
		if(clickPageNum == pageTotal){
			$(data).text("没有更多数据");
		}
		clickPageNum++;
	}
}

/**
 * 选择行业后点击确定或者取消
 * @param type
 */

function slideUp(type,data){
	$(data).parent().parent().prev().siblings(".r_industry_sele").slideUp();
    $(data).parent().parent().prev().removeClass("i");
	if(type == "1"){ //确定的
		loadIniQuotationMsg(1, 1, 10);
	}
}

//添加或者删除自选股
function addorDeleOptional(data){
	var zxgType = $(data).text();
	if(zxgType=="加入自选"){
		var optionalId = addOptional($(data).attr("data-value"),"");
		if(optionalId!=null&&optionalId!=""&&optionalId!=undefined){
			$(data).removeClass().addClass("zx_sc_icon");
			$(data).text("删除自选");
		}else{
			$.zmAlert("添加自选股失败");
		}
	}else{
	    var resultData = deleteOptionalByStocke($(data).attr("data-value"));
		if(resultData=="0000"){
			$(data).removeClass().addClass("zx_jr_icon");
			$(data).text("加入自选");
		}else{
			$.zmAlert("删除自选股失败");
		}
	}
//	loadPlace();
}

//function contrast(data){
//	var contrast = "";
//	if($(data).text() == "加入对比"){
//		var flag = true;
//		if(contrasts == null){
//			contrasts = ",";
//			contrasts += $(data).attr("data-code") + "-" + $(data).attr("data-name") + ",";
//			$(data).removeClass().addClass("db_sc_icon");
//			$(data).text("删除对比");
//		}else{
//			contrast = contrasts.split(",");
//			if(contrast.length < 7){
//				$(contrast).each(function(){
//					var val = this.split("-");
//					if(val[0] == $(data).attr("data-code")){
//						flag = false;
//					}
//				})
//				if(flag){
//					contrasts += $(data).attr("data-code") + "-" + $(data).attr("data-name") + ",";
//					$(data).removeClass().addClass("db_sc_icon");
//					$(data).text("删除对比");
//				}
//			}else{
//				$.zmAlert("对比企业只能添加五个");
//			}
//		}
//	}else if($(data).text() == "删除对比"){
//		contrast = contrasts.split(",");
//		$(contrast).each(function(){
//			var val = this.split("-");
//			if(val[0] == $(data).attr("data-code")){
//				$(data).removeClass().addClass("db_jr_icon");
//				$(data).text("加入对比");
//				contrasts = contrasts.replace(","+this,"");
//			}
//		})
//	}
//	localStorage.setItem(userId,contrasts);
//}

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass(comparisonStockCode,comparisonStockName){
	if($("#duibi_"+comparisonStockCode).text()=="删除对比"){
		 // db_sc_icon   db_jr_icon
		$("#duibi_"+comparisonStockCode).removeClass("on");
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$("#duibi_"+comparisonStockCode).text("加入对比")
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$("#duibi_"+comparisonStockCode).text("删除对比")
			$("#duibi_"+comparisonStockCode).addClass("on");
		}
	}
//	loadPlace();
}