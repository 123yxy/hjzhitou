//公司公告页面标题检索与时间检索切换
//$(".classnotice_r a").on("click",function(){
//	$(".time_xz_l").show();
////	$(".notice_select,.notice_tab").hide();
//	});
//	$(".classnotime_r a").on("click",function(){
//	$(".notic_time_xz").hide();
//	$(".notice_select,.notice_tab").show();
//	
//});
//获取当前时间
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//初始化
//var stockCode = getUrlParam("stockCode");
var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
$(function() {
	$("#stockNameShow").text(stockName);
	//初始化加载
	getBystockCode(1,18,stockCode,null,null,null,null,null);
	//滚动加载事件
	scroll(null,null,null,null,null);
	//按时间段搜索
	$("#serchByTime").on("click",function(){
		var title = $("#title").val().replace(/\s+/g,"");//标题
		var event= $("#ggtype").attr("data-value");//企业公告类型
		//清除div中的list
		$("#list").html("");
		var startTime = $("#startTime").val();
		var time1 = $("#endTime").val();
		$("#list").addClass("notice_info_box");
		if(time1==""){
			var endTime = new Date().Format("yyyy-MM-dd");
		}else if(time1!=""){
			var endTime = time1;
		}
		getBystockCode(1,18,stockCode,null,startTime,endTime,title,event);
		$("#startTime").val("");
		$("#endTime").val("");
		scroll(null,startTime,endTime,title,event);
	});
	
	//按标题搜索
	$("#titleId").on("click",function(){
		var type = $("#timeF").attr("data-value");//公告其他时间
		var event= $("#ggtype").attr("data-value");//企业公告类型
		var startTime = $("#startTime").val();
		var time1 = $("#endTime").val();
		if(time1==""){
			var endTime = new Date().Format("yyyy-MM-dd");
		}else if(time1!=""){
			var endTime = time1;
		}
		$("#list").addClass("notice_info_box");
		var title = $("#title").val().replace(/\s+/g,"");
		//清除div中的list
		$("#list").html("");
		getBystockCode(1,18,stockCode,type,startTime,endTime,title,event);
		$("#title").val("");
		scroll(type,startTime,endTime,title);
	});
	
	//其他时间查询公告
	$("#otherTime li").on("click",function(){
		$("#list").addClass("notice_info_box");
		type = $(this).attr("data-type");//公告其他时间
		var title = $("#title").val().replace(/\s+/g,"");//标题
		var event= $("#ggtype").attr("data-value");//企业公告类型
		//给时间赋值赋值
		$("#timeF").attr("data-value",type);
		switch(type) {
		case "":
			$(".notice_time").hide();
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,null,null,title,event);
			scroll(type,null,null,title,event);
			break;
		case "1":
			$(".notice_time").hide();
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,null,null,title,event);
			scroll(type,null,null,title,event);
			break;
		case "2":
			$(".notice_time").hide();
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,null,null,title,event);
			scroll(type,null,null,title,event);
			break;
		case "3":
			$(".notice_time").hide();
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,null,null,title,event);
			scroll(type,null,null,title,event);
			break;
		case "4":
			$(".notice_time").hide();
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,null,null,title,event);
			scroll(type,null,null,title,event);
			break;
		case "5":
		$(".notice_time").show();
		break;
		default:
			break;
		}		
	});
	
	//事件类型查询公告
	$("#lexing li").on("click",function(){
		$("#list").addClass("notice_info_box");
		typeEvent = $(this).attr("data-value");//公告类型
		var type = $("#timeF").attr("data-value");//公告其他时间
		var title = $("#title").val().replace(/\s+/g,"");//标题
		var startTime = $("#startTime").val();
		var time1 = $("#endTime").val();
		if(time1==""){
			var endTime = new Date().Format("yyyy-MM-dd");
		}else if(time1!=""){
			var endTime = time1;
		}
		//给事件类型赋值
		$("#ggtype").attr("data-value",typeEvent);
		switch(typeEvent) {
		case "":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "1":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "2":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "3":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "4":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "5":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "6":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "7":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "8":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "9":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "10":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "11":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "12":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "13":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "14":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "15":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "16":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		case "17":
			$("#list").html("");
			getBystockCode(1,18,stockCode,type,startTime,endTime,title,typeEvent);
			scroll(type,startTime,endTime,title,typeEvent);
			break;
		default:
			break;
		}		
	});
	
});


//滚动加载事件
function scroll(type,startTime,endTime,title,event){
	$("#divTop").scroll(function() {
		//$(this).scrollTop() 这个方法是当前div滚动条滚动的距离
		//$(this).height() 获取当前div窗体的高度
		//$(this).outerHeight() 获取当前div文档的高度*/		
		var bot = 0; //bot是底部距离的高度
		if((bot + $(this).scrollTop()) >= ($(this).outerHeight() - $(this).height())) {
			if(isLoading) {
				isLoading = false;
				var pageNum = $("#list").attr("pageNum");
				var pageSize = $("#list").attr("pageSize");
				var typeT = $("#list").attr("typeT");
				var startTimeT = $("#list").attr("startTimeT");
				var endTimeT = $("#list").attr("endTimeT");
				var titleT = $("#list").attr("titleT");
				var typeEvent = $("#list").attr("typeEvent");
				getBystockCode(pageNum,pageSize,stockCode,typeT,startTimeT,endTimeT,titleT,typeEvent);
			}
		}
	});			
}

//渲染列表
function getBystockCode(pageNum, pageSize,stockCode,type,startTime,endTime,title,typeEvent) {
	$.axs("/betaInvest/companyAnnouncement/findCompanyAnnouncement.do", {
		pageIndex: pageNum,
		pageLimit: pageSize,
		stockCode:stockCode,
		type:type,
		startTime:startTime,
		endTime:endTime,
		title:title,
		typeEvent:typeEvent
	}, true, function(data) {
		if(data.retCode == "0000") {
			var pageObj = data.retData.result;
			var num = pageObj.pageIndex;
			var size = pageObj.pageLimit;
			$("#list").attr("pageNum", num+1);
			$("#list").attr("pageSize", size);
			$("#list").attr("typeT", type);
			$("#list").attr("startTimeT", startTime);
			$("#list").attr("endTimeT", endTime);
			$("#list").attr("titleT", title);
			$("#list").attr("typeEvent", typeEvent);
			var list = pageObj.list;
			var html = "";
			var time = "";
			if(list!=null && list.length>0){
				for(var i = 0; i < list.length; i++) {
					var temp = list[i];
					if(time!=temp.announcementtime){
						if(i!=0){
							html +='</ul>';
							html +='<div class="clr"></div>';
							html +=' </div>';
						}
						html +='<div class="noticv_list" time='+temp.announcementtime+'>';
						html +='<h2>'+temp.announcementtime+'</h2>';
						html +='<ul>';
						if(temp.announcementname.length>42){
							announcementNameTemp = temp.announcementname.substring(0,42)+"..";
							html +="<li time="+temp.announcementtime+"><span>【"+temp.typename+"】</span><a title="+temp.announcementname+" href='javascript:;'  onclick='downloadPdf(\""+encodeURIComponent(temp.pdfurl)+"\")'>"+announcementNameTemp+"</a></li>";
			            }else{
			            	html +="<li time="+temp.announcementtime+"><span>【"+temp.typename+"】</span><a href='javascript:;'  onclick='downloadPdf(\""+encodeURIComponent(temp.pdfurl)+"\")'>"+temp.announcementname+"</a></li>";
			            }
						//最后一条数据追加html
						if((i+1)==list.length){
							html +='</ul>';
							html +='<div class="clr"></div>';
							html +=' </div>';
						}
					}else{
						if(temp.announcementname.length>42){
							announcementNameTemp = temp.announcementname.substring(0,42)+"..";
							html +="<li time="+temp.announcementtime+"><span>【"+temp.typename+"】</span><a title="+temp.announcementname+" href='javascript:;'  onclick='downloadPdf(\""+encodeURIComponent(temp.pdfurl)+"\")'>"+announcementNameTemp+"</a></li>";
			            }else{
			            	html +="<li time="+temp.announcementtime+"><span>【"+temp.typename+"】</span><a href='javascript:;'  onclick='downloadPdf(\""+encodeURIComponent(temp.pdfurl)+"\")'>"+temp.announcementname+"</a></li>";
			            }
						//最后一条数据追加html
						if((i+1)==list.length){
							html +='</ul>';
							html +='<div class="clr"></div>';
							html +=' </div>';
						}
					}
					time=temp.announcementtime;
				}
				$("#list").append(html);
				isLoading = true;
			}else{
					if(pageNum == 1 || pageNum == null) {
						$("#list").removeClass("notice_info_box");
						var html ='<div class="zanwu_shuju" style="width:125px; margin:0 auto;padding-top:70px;padding-left:40px"><span></span><p>暂无数据</p></div>';
						$("#list").html(html);
					} else {
						var html = "<div class='new_zwsj_n'>没有更多数据了<div>";
						$("#list").append(html);
					}
				}
			}else {
				errorAlert(data.retCode, data.retMsg);
			}
	});
}