//var pageNum=1;
//var pageSize=10000;
var studyReportId=null;
var userName=localStorage.getItem("userName");
var currentPage =1;
var pageSize = 10 ;

//var userName=localStorage.getItem("userName");
$(function(){
	
	//点击编辑图标时
	$(".baog_list").delegate("b","click",function(){
		//跳转到编辑页面
	})
	var height=$(window).innerHeight()-128;
	$(".baogao_main").css("min-height",height);
	//点击弹窗的删除按钮
	$(".shanc_btn").on("click",function(){
		$(".tub_tc").hide();
		$(this).parent().parent().hide();
	})
	//点击弹窗的取消按钮
	$(".shanc_qux").on("click",function(){
		$(".tub_tc").hide();
		$(this).parent().parent().hide();
	})
	$(".tc_shanchu").on("click",function(){
		$(".tub_tc").hide();
		$(this).parent().hide();
	})
	//点击整个li的时候显示判断此报告的类型然后跳到对应的页面
	$(".baog_list").delegate("li","click",function(){
		if($(this).find("em").hasClass(".yanjiu_bg")){
			//说明是研究报告，则跳转到报告预览中
		}
		else if($(this).find("em").hasClass(".mox_bg")){
			
		}
		else if($(this).find("em").hasClass(".qiye_bg")){
			
		}
	})
	//鼠标移入行的是显示市值
	$(".yanbao_lb").delegate("li","mouseover",function(){
		var yanjiusuixiang=$(this).find("div.yanjiu_content").find("span").eq(0).text();
//		console.log(yanjiusuixiang);
		if(yanjiusuixiang!=""){
			$(this).find(".gs_shizhi").show();
		}
	})
	$(".yanbao_lb").delegate("li","mouseout",function(){
		$(this).find(".gs_shizhi").hide();
	})
	
	$(".yanbao_lb").delegate(".gs_sz","mouseover",function(){
		$(this).next().show();
	})
	$(".yanbao_lb").delegate(".gs_sz","mouseout",function(){
		$(this).next().hide();
	})
//	//点击添加研报时跳转
//	$(".tj_yanbao").on("click",function(){
//		window.open("/myResearch/editReport.html");
//	})
	//findBtUserStudyReport(null,null);
	reportList();
	//当没有内容是不显示暂无数据
	if($("#studyReportList li").length<=0){
		var height=(window.innerHeight)-228;
		//console.log(height)
		var marginTop=((height-206)/2)-50;
		$(".baog_list").css("height",height);	
		$(".baogao_zwsj").show();
		$(".baogao_zwsj").css("margin-top",marginTop);
		$("#studyReportList").hide();
	}else
		$(".baogao_zwsj").hide();
		$("#studyReportList").show();
	//}
	$("#moreCloud").on("click",function(){
		reportList();		
	})
})

//查询我的分类图表
/*function findBtUserStudyReport(pageNum,pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=20;
	}
	if(pageNum==1){
		$("#pages").remove();
		$(".baogao_zwsj").after('<div id="pages" class="pages pagination " style="display: none;"></div>')
	}
	$("#pages").attr("data-pageNum",pageNum);
	$("#pages").attr("data-pageSize",pageSize);
	var data={pageNum:pageNum,pageSize:pageSize}
	$.axs("/betaInvest/btUserStudyReport/findBtUserStudyReportByPage.do",data,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false
			}
			//$("#studyReportList").empty();
			//console.log(result)
			var html='';
			$(result.list).each(function(index,item){
				var deleUrl="";//删除
				var editUrl="";//编辑
				var viewUrl="";//预览
				var reportType=item.reportType;
				var baogaomingcheng="";
				var baogaoClass="";
				if(reportType==1){//研究报告
					deleUrl="/betaInvest/report/deleteReport.do";
					editUrl="/myResearch/editReport.html"+item.edirParam;
					viewUrl="/myResearch/reportPreview.html?id="+item.keyVlaue;
					baogaomingcheng="研究报告";
					baogaoClass="yanjiubaogao";
				}else if(reportType==2){//模型报告
					deleUrl="/betaInvest/report/deleModelReport.do";
//					editUrl="/myResearch/modelReportDetail.html"+item.edirParam+"&key="+item.keyVlaue;
//					viewUrl="/myResearch/modelReportDetail.html"+item.edirParam+"&key="+item.keyVlaue;
					editUrl="/myResearch/modelReportDetail.html?key="+item.keyVlaue;
					viewUrl="/myResearch/modelReportDetail.html?key="+item.keyVlaue;
					baogaomingcheng="模型报告";
					baogaoClass="moxingbaogao";
				}else if(reportType==3){//图标分析
					deleUrl="/betaInvest/btUserStudyChart/deleBtUserStudyChart.do";
					editUrl="/myResearch/editChart.html"+item.edirParam;
					viewUrl="/myResearch/chartPreview.html"+item.edirParam;
				}else if(reportType==4){//企业报告
					deleUrl="";
					editUrl="";
					viewUrl="";
					baogaomingcheng="企业报告";
					baogaoClass="qiyebaogao";
				}
//				html+='<li>';
//				html+='<div class="fl f_baogao" onclick="javascript:location.href=\''+viewUrl+'\'">';
//				html+='<div class="fl yanj_content">';
//				var titleName=item.titleName;
//				if(titleName.length>=22){
//					titleName=titleName.substring(0,20)+"...";
//				}
//				html+='<span title="'+item.titleName+'">'+titleName+'</span>';
//				html+='</div>';
//				html+='<div class="fl yanjiu_duix">';
//				//html+='<span>研究对象</span>';
//				if(item.stockName!=null && item.stockName!=''){
//					if(item.reportType==1){
//						html+='<span class="yanjiu_bg">'+item.stockName+'</span>';
//					}else if(item.reportType==2){
//						html+='<span class="mox_bg">'+item.stockName+'</span>';
//					}else if(item.reportType==3){
//						html+='<span class="tubiao_fenxi">'+item.stockName+'</span>';
//					}else if(item.reportType==4){
//						html+='<span class="qiye_bg">'+item.stockName+'</span>';
//					}
//				}else{
//					html+='<span>'+item.stockName+'</span>';
//				}
//				
////				html+='<div class="clr"></div>';
//				html+='</div>';
//				html+='<div class="fl chuangjianren">';
//				
//				var chuangjianren=item.userName;
//				if(item.userName=='null' || item.userName=="" || item.userName=="undefined" || item.userName==null){
//					chuangjianren="--";
//				}else{
//					chuangjianren=item.userName;
//				}
//				html+='<span>'+chuangjianren+'</span>';
//				html+='</div>';
//				html+='<div class="fl yanjiu_shijian">';
//				var date=item.createTime;//toDateTime(item.createTime,"yyyy-MM-dd hh:ss:mm");
//				html+='<i>'+date+'</i></div><div class="clr"></div></div><div class="fl baogao_cz"><div class="caozuo_icon" style="display: none;">'+
//					'<b title="编辑" onclick="javascript:window.location.href=\''+editUrl+'\'"></b>'+
//					'<em title="删除" onclick="deleConfirmation(\''+deleUrl+'\',\''+item.keyVlaue+'\')"></em>'+
//					'<div class="clr"></div></div></div><div class="clr"></div></li>';
				
				html+='<li>';
				html+='<div class="fl f_baogao" onclick="javascript:location.href=\''+viewUrl+'\'">';
				html+='<div class="fl yanj_content">';
				html+='<b class="'+baogaoClass+'">'+baogaomingcheng+'</b>';
				var titleName=item.titleName;
				if(titleName.length>=21){
					titleName=titleName.substring(0,16)+"...";
				}
				html+='<span title="'+item.titleName+'">'+titleName+'</span>';
//				html+='<span>两会再谈创新，敏慧等中</span>';
				html+='</div>';
				html+='<div class="fl yanjiu_duix">';
				html+='<div class="yanjiu_content">';
				if(item.stockName!=null && item.stockName!=''){
					var stockNameArray=item.stockName.split(",");
					for (var i = 0; i < stockNameArray.length; i++) {
						html+='<span class="bg_gs_mc">'+stockNameArray[i]+'</span>';
					}
				}else{
					html+='<span></span>';
				}
//				html+='<span class="bg_gs_mc">天阳科技</span>';
//				html+='<span class="bg_gs_mc">天阳科技</span>';
//				html+='<span class="bg_gs_mc">天阳科技</span>';
				html+='<div class="shizhi_num">';
				html+='<div class="gs_shizhi" style="display: none;">';
				html+='<span class="gs_sz">市值</span>';
				html+='<div class="sz_tc" style="display: none;">';
				html+='<ul>';
				if(item.stockName!=null && item.stockName!=''){
					var stockCodeArray=item.stockCode.split(",");
					var stockNameArray=item.stockName.split(",");
					for (var i = 0; i < stockNameArray.length; i++) {
						html+='<li>';
						html+='<i class="gs_list_icon"></i>';
						html+='<span>'+stockNameArray[i]+'（'+stockCodeArray[i]+'）</span>';
						html+='<p>';
						if(item.thisValue!=null && item.thisValue!="" && item.thisValue!=undefined){
							var showThisValue=item.thisValue.split(",")[i];
							if(showThisValue==null || showThisValue=="" || showThisValue==undefined){
								showThisValue="--"
							}
							html+='<span>当前市值：<em class="dq_shiz">'+showThisValue+'</em>百万</span>';
						}else{
							html+='<span>当前市值：<em class="dq_shiz">--</em>百万</span>';
						}
						if(item.expectValue!=null && item.expectValue!="" && item.expectValue!=undefined){
							var showExpectValue=item.expectValue.split(",")[i];
							if(showExpectValue==null || showExpectValue=="" || showExpectValue==undefined){
								showExpectValue="--"
							}
							html+='<span>期望市值：<em class="dq_shiz">'+showExpectValue+'</em>百万</span>';
						}else{
							html+='<span>期望市值：<em class="dq_shiz">--</em>百万</span>';
						}
						html+='</p>';
						html+='</li>';
					}
				}
//				html+='<li>';
//				html+='<i class="gs_list_icon"></i>';
//				html+='<span>天阳科技（876433）</span>';
//				html+='<p>';
//				html+='<span>当前市值：<em class="dq_shiz">765</em>亿</span>';
//				html+='<span>期望市值：<em class="dq_shiz">987</em>亿</span>';
//				html+='</p>';
//				html+='</li>';
//				html+='<li>';
//				html+='<i class="gs_list_icon"></i>';
//				html+='<span>天阳科技（876433）</span>';
//				html+='<p>';
//				html+='<span>当前市值：<em class="dq_shiz">765</em>亿</span>';
//				html+='<span>期望市值：<em class="dq_shiz">987</em>亿</span>';
//				html+='</p>';
//				html+='</li>';
//				html+='<li>';
//				html+='<i class="gs_list_icon"></i>';
//				html+='<span>天阳科技（876433）</span>';
//				html+='<p>';
//				html+='<span>当前市值：<em class="dq_shiz">765</em>亿</span>';
//				html+='<span>期望市值：<em class="dq_shiz">987</em>亿</span>';
//				html+='</p>';
//				html+='</li>';
				html+='</ul>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="fl chuangjianren">';
				var chuangjianren=item.userName;
				if(item.userName=='null' || item.userName=="" || item.userName=="undefined" || item.userName==null){
					chuangjianren="--";
				}else{
					chuangjianren=item.userName;
					if(chuangjianren.length>6){
						chuangjianren=chuangjianren.substring(0,6)+"...";
					}
				}
				html+='<span title="'+item.userName+'">'+chuangjianren+'</span>';
				html+='</div>';
				html+='<div class="fl yanjiu_shijian">';
				var date=item.createTime.substring(0,10);//toDateTime(item.createTime,"yyyy-MM-dd hh:ss:mm");
				html+='<i title="'+item.createTime+'">'+date+'</i>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='<div class="fl baogao_cz">';
				html+='<div class="caozuo_icon" style="display:block;">';
				html+='<b title="编辑" onclick="javascript:window.location.href=\''+editUrl+'\'"></b>';
				html+='<em title="删除" onclick="deleConfirmation(\''+deleUrl+'\',\''+item.keyVlaue+'\')"></em>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</li>';
			})
			$("#studyReportList").html(html);
			//鼠标经过li的时候显示小图标
//			$(".baog_list li").on("mouseover",function(){
//				$(this).find(".caozuo_icon").show();
//			}).stop().on("mouseout",function(){
//				$(this).find(".caozuo_icon").hide();
//			});
			
			//分页
			if(pageNum==1){
				$('#pages').pagination({
					total: result.totalCount,
					pageSize: pageSize,
					current: pageNum,
//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
					layout: ['first', 'prev', 'links','next','last'],
					links:5,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						findBtUserStudyReport(pageNumber,size);
					}
					
				});
			}
			if(result.totalCount<=pageSize){
				$('#pages').hide();
			}else{
				$('#pages').show();
			}
			setPageText('pages');
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	
}*/
var deleMyStudy="";//删除的地址
var id="";//删除的地址
//点击删除的图标时
function deleConfirmation(delUrl,reportId,report){	
	studyReportId=reportId;
	deleMyStudy=delUrl;//删除链接
	id=report;
	$(".tub_tc").show();
	$(".tips_shanchu").show();
}

//删除我的分类
function deleBtUserStudyReport(){
	//console.log(deleMyStudy);
	//console.log(studyReportId);
	if(deleMyStudy=="" || studyReportId==""){//企业报告
		return false;
	}
	if(studyReportId==0){
		delReportInfo(id);
	}
	$.axs(deleMyStudy,{id:studyReportId},false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			errorAlert("","删除成功！");
			var pageNum=$("#pages").attr("data-pageNum");
			var pageSize=$("#pages").attr("data-pageSize");
			findBtUserStudyReport(pageNum,pageSize);
			if($("#studyReportList li").length<=0){
				var height=(window.innerHeight)-228;
				var marginTop=(height-206)/2;
				//console.log(marginTop)
				$(".baog_list").css("height",height);
				$(".baogao_zwsj").show();
				$(".baogao_zwsj").css("margin-top",marginTop);
				$("#studyReportList").hide();
			}else{
				$(".baogao_zwsj").hide();
				$("#studyReportList").show();
			}
			//刷新操作中心
			myResearch();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}


function reportList(){
	$.PostJsonData("/beta/report/findReportPageList.do",{"userId":localStorage.getItem("userId"),"currentPage":currentPage,"pageSize":pageSize},false,function(data){
		if(data.code=="0000"){
			var url ="/beta/report/deleteReport.do";
			var editReport = "/researches/researchesnew.html?stockCode=";
			var html = "";
			var listData = data.result.content;
			for(var i=0;i<listData.length;i++){
				var titleName=listData[i].reportName;
				var date=listData[i].createDateTime.substring(0,10);//toDateTime(item.createTime,"yyyy-MM-dd hh:ss:mm");
				var reportObject=listData[i].reportObject;
				var objectCode=listData[i].objectCode;
				reportObject=reportObject.replace("null","无");
				var mmtitle=listData[i].reportName;
				if(mmtitle=="null")
				{
					mmtitle="";
				}
				var mmreportObject = reportObject;
				if(mmreportObject=="无")
				{
					mmreportObject="";
				}
				if(objectCode=="null")
				{
					objectCode="";
				}
				html+='<li>';
				html+='<div class="fl f_baogao" onclick="window.location.href=\''+editReport+objectCode+'&content='+encodeURI(mmreportObject)+'&title='+encodeURI(mmtitle)+'&newyb=3&id='+listData[i].id+'\'">';
				html+='<div class="fl yanj_content">';
				html+='<b class="yanjiubaogao">研究报告</b>';			
				if(titleName.length>=21){
					titleName=titleName.substring(0,16)+"...";
				}
				html+='<span title="'+listData[i].reportName+'">'+titleName+'</span>';
				html+='</div>';
				html+='<div class="fl yanjiu_duix">';
				html+='<div class="yanjiu_content">';
				html+='<span class="bg_gs_mc">'+reportObject+'</span>';
				/*if(reportObject!=null && reportObject!=''){
					var stockNameArray=reportObject.split("(");
					//for (var i = 0; i < stockNameArray.length; i++) {
*/						//html+='<span class="bg_gs_mc">'+stockNameArray[0]+'</span>';
					//}
				/*}else{
					html+='<span></span>';
				}*/
				/*html+='<div class="shizhi_num">';
				html+='<div class="gs_shizhi" style="display: none;">';
				html+='<span class="gs_sz">市值</span>';
				html+='<div class="sz_tc" style="display: none;">';
				html+='<ul>';
				if(reportObject!=null && reportObject!=''){
					var stockCodeArray=objectCode.split(",");
					var stockNameArray=reportObject.split(",");
					//for (var i = 0; i < stockNameArray.length; i++) {
						html+='<li>';
						html+='<i class="gs_list_icon"></i>';
						html+='<span>'+stockNameArray+'</span>';
						html+='<p>';
						if(item.thisValue!=null && item.thisValue!="" && item.thisValue!=undefined){
							var showThisValue=item.thisValue.split(",")[i];
							if(showThisValue==null || showThisValue=="" || showThisValue==undefined){
								showThisValue="--"
							}
							html+='<span>当前市值：<em class="dq_shiz">'+showThisValue+'</em>百万</span>';
						}else{
							html+='<span>当前市值：<em class="dq_shiz">--</em>百万</span>';
						//}
						if(item.expectValue!=null && item.expectValue!="" && item.expectValue!=undefined){
							var showExpectValue=item.expectValue.split(",")[i];
							if(showExpectValue==null || showExpectValue=="" || showExpectValue==undefined){
								showExpectValue="--"
							}
							html+='<span>期望市值：<em class="dq_shiz">'+showExpectValue+'</em>百万</span>';
						}else{
							html+='<span>期望市值：<em class="dq_shiz">--</em>百万</span>';
						//}
						html+='</p>';
						html+='</li>';
					//}
				}
				html+='</ul>';
				html+='</div>';
				html+='</div>';
				html+='</div>';*/
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="fl chuangjianren">';
				var chuangjianren=userName;
				if(userName=='null' || userName=="" || userName=="undefined" || userName==null){
					chuangjianren="--";
				}else{
					chuangjianren=userName;
					if(chuangjianren.length>6){
						chuangjianren=chuangjianren.substring(0,6)+"...";
					}
				}
				var user = '\''+userName+'\''; 
				html+='<span title="'+userName+'">'+chuangjianren+'</span>';
				html+='</div>';
				html+='<div class="fl yanjiu_shijian">';
				
				html+='<i title="'+date+'">'+date+'</i>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='<div class="fl baogao_cz">';
				html+='<div class="caozuo_icon" style="display:block;">';
				
		

				html+='<b title="编辑" onclick="javascript:window.location.href=\''+editReport+objectCode+'&content='+encodeURI(mmreportObject)+'&title='+encodeURI(mmtitle)+'&newyb=2&id='+listData[i].id+'\'"></b>';
				html+='<em title="删除" onclick="deleConfirmation(\''+url+'\',\''+0+'\',\''+listData[i].id+'\')" id="'+listData[i].id+'"></em>';
				//html+='<em title="删除" onclick="delReportInfo('+listData[i].id+')" id="'+listData[i].id+'"></em>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</li>';
				//console.log(listData);
			}
			
			$("#studyReportList").append(html);
			if(data.result.nextPage<=currentPage){
				$("#moreCloud").hide();
			}else if(data.result.content.length==0){
				$("#moreCloud").hide();
			}
			currentPage = data.result.currentPage+1;//设置翻页变量页码
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	})
}


function delReportInfo(id){
	$.PostJsonData(
		"/beta/report/deleteReport.do",
		{"userId":localStorage.getItem("userId"),"id":id},
		false,
		function(data){
		if(data.code=="0000"){
			errorAlert("","删除成功！");
			$("#"+id).parents("li").remove();
		}
		//当没有内容是不显示暂无数据
		if($("#studyReportList li").length<=0){
			var height=(window.innerHeight)-228;
			//console.log(height)
			var marginTop=((height-206)/2)-50;
			$(".baog_list").css("height",height);	
			$(".baogao_zwsj").show();
			$(".baogao_zwsj").css("margin-top",marginTop);
			$("#studyReportList").hide();
		}else
			$(".baogao_zwsj").hide();
			$("#studyReportList").show();
	});
}


function toDateTime (time, format) {  
    var x = new Date(parseInt(time)),  
        y = format;  
    var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};  
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {  
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)  
    });  
    var formatDateTime = y.replace(/(y+)/g, function (v) {  
        return x.getFullYear().toString().slice(-v.length)  
    });  
    return formatDateTime;  
};
