//初始化加载
var stockCode= getUrlParam("stockCode");
$(function() {
	findDignitary();
	findDignitaryShare();
	findMessageStats();
	findDignitaryChange();
});
//董监高基础数据
function findDignitary(){
	$.axs("/betaStock/dignitary/findDignitary.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var htmlOne='';
			var divHtml='';
			var divHtmlT='';
			var divHtmlTt='';
			var htmlTwo='';
			var htmlThree='';
			var one = 0;
			var two = 0;
			var three = 0;
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				if(stat.dignitarytype==1){
					htmlOne+='<tr>';
					htmlOne+= '<td><a href="javascript:;" onclick="showDiv(\''+stat.id+'\')"><i></i>'+stat.dignitaryName+'</a></td>';
					htmlOne+='<td>'+stat.position+'</td>';
					if(stat.sharesNumber==''||stat.sharesNumber==null||stat.sharesNumber==undefined){
						htmlOne+='<td>--</td>';	
					}else{
						htmlOne+='<td>'+stat.sharesNumber+'</td>';	
					}
					if(stat.education==''||stat.education==null||stat.education==undefined){
						htmlOne+='<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp</td>';
					}else{
						htmlOne+='<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</td>';
					}
					htmlOne+='<td>'+stat.reportPeriod+'</td>';
					//高管弹框
					divHtmlT+='<div class="gg_tc_box" id="digitary'+stat.id+'">';
					divHtmlT+='<a href="javascript:;" class="faxfp_close_gg" onclick="hideDiv(\''+stat.id+'\')"><img src="/saasBeta/images/close1.png" alt="关闭"></a>';
					divHtmlT+='<div class="faxfp_gg">';
					divHtmlT+='<div class="fax_fp_top_gg">';
					divHtmlT+='<div class="fp_top_l_gg fl">';
					if(stat.dignitaryName.length>14){
						divHtmlT+='<h2 style="line-height:40px">'+stat.dignitaryName+'</h2>';
					}else{
						divHtmlT+='<h2>'+stat.dignitaryName+'</h2>';
					}
					divHtmlT+='</div>';
					divHtmlT+='<div class="fp_top_r_gg fr">';
					divHtmlT+='<div class="top_r_list_gg">';
					divHtmlT+='<span>'+stat.position+'</span>';
					if(stat.sharesNumber==''||stat.sharesNumber==null||stat.sharesNumber==undefined){
						divHtmlT+='<span>持股数：--万股</span>';
					}else{
						divHtmlT+='<span>持股数：'+stat.sharesNumber+'万股</span>';
					}
					divHtmlT+='</div>';
					divHtmlT+='<div class="top_r_list_gg">';
					if(stat.education==''||stat.education==null||stat.education==undefined){
						divHtmlT+='<span>'+stat.sex+'&nbsp&nbsp'+stat.age+'</span>';
					}else{
						divHtmlT+='<span>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</span>';
					}
					if(stat.tenure==''||stat.tenure==null||stat.tenure==undefined){
						divHtmlT+='<span>任期：--</span>';
					}else{
						divHtmlT+='<span>任期：'+stat.tenure+'</span>';
					}
					divHtmlT+='</div>';
					divHtmlT+='</div>';
					divHtmlT+='</div>';
					divHtmlT+='<div class="clr"></div>';
					divHtmlT+='<div class="fp_fax_box_gg">';
					divHtmlT+='<p>'+stat.personalProfile+'</p>';
					divHtmlT+='<div class="fax_time_gg">';
					divHtmlT+='<span>报告期:'+stat.reportPeriod+'</span>';
					divHtmlT+='</div>';
					divHtmlT+='</div>';
					divHtmlT+='<div class="clr"></div>';
					divHtmlT+='</div>';
					divHtmlT+='</div>';
					htmlOne+='</tr>';
					one=one+1;
				}else if(stat.dignitarytype==2){
					htmlTwo+='<tr>';
					htmlTwo+= '<td><a href="javascript:;" onclick="showDiv(\''+stat.id+'\')"><i></i>'+stat.dignitaryName+'</a></td>';
					htmlTwo+='<td>'+stat.position+'</td>';
					if(stat.sharesNumber==''||stat.sharesNumber==null||stat.sharesNumber==undefined){
						htmlTwo+='<td>--</td>';	
					}else{
						htmlTwo+='<td>'+stat.sharesNumber+'</td>';	
					}
					if(stat.education==''||stat.education==null||stat.education==undefined){
						htmlTwo+='<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp</td>';
					}else{
						htmlTwo+='<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</td>';
					}
					htmlTwo+='<td>'+stat.reportPeriod+'</td>';
					//高管弹框
					divHtml+='<div class="gg_tc_box" id="digitary'+stat.id+'">';
					divHtml+='<a href="javascript:;" class="faxfp_close_gg" onclick="hideDiv(\''+stat.id+'\')"><img src="/saasBeta/images/close1.png" alt="关闭"></a>';
					divHtml+='<div class="faxfp_gg">';
					divHtml+='<div class="fax_fp_top_gg">';
					divHtml+='<div class="fp_top_l_gg fl">';
					if(stat.dignitaryName.length>14){
						divHtml+='<h2 style="line-height:40px">'+stat.dignitaryName+'</h2>';
					}else{
						divHtml+='<h2>'+stat.dignitaryName+'</h2>';
					}
					divHtml+='</div>';
					divHtml+='<div class="fp_top_r_gg fr">';
					divHtml+='<div class="top_r_list_gg">';
					divHtml+='<span>'+stat.position+'</span>';
					if(stat.sharesNumber==''||stat.sharesNumber==null||stat.sharesNumber==undefined){
						divHtml+='<span>持股数：--万股</span>';
					}else{
						divHtml+='<span>持股数：'+stat.sharesNumber+'万股</span>';
					}
					divHtml+='</div>';
					divHtml+='<div class="top_r_list_gg">';
					if(stat.education==''||stat.education==null||stat.education==undefined){
						divHtml+='<span>'+stat.sex+'&nbsp&nbsp'+stat.age+'</span>';
					}else{
						divHtml+='<span>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</span>';
					}
					if(stat.tenure==''||stat.tenure==null||stat.tenure==undefined){
						divHtml+='<span>任期：--</span>';
					}else{
						divHtml+='<span>任期：'+stat.tenure+'</span>';
					}
					divHtml+='</div>';
					divHtml+='</div>';
					divHtml+='</div>';
					divHtml+='<div class="clr"></div>';
					divHtml+='<div class="fp_fax_box_gg">';
					divHtml+='<p>'+stat.personalProfile+'</p>';
					divHtml+='<div class="fax_time_gg">';
					divHtml+='<span>报告期:'+stat.reportPeriod+'</span>';
					divHtml+='</div>';
					divHtml+='</div>';
					divHtml+='<div class="clr"></div>';
					divHtml+='</div>';
					divHtml+='</div>';
					htmlTwo+='</tr>';
					two=two+1;
				}else if(stat.dignitarytype==3){
					htmlThree+='<tr>';
					htmlThree+= '<td><a href="javascript:;" onclick="showDiv(\''+stat.id+'\')"><i></i>'+stat.dignitaryName+'</a></td>';
					htmlThree+='<td>'+stat.position+'</td>';
					if(stat.sharesNumber==''||stat.sharesNumber==null||stat.sharesNumber==undefined){
						htmlThree+='<td>--</td>';	
					}else{
						htmlThree+='<td>'+stat.sharesNumber+'</td>';	
					}
					if(stat.education==''||stat.education==null||stat.education==undefined){
						htmlThree+='<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp</td>';
					}else{
						htmlThree+='<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</td>';
					}
					htmlThree+='<td>'+stat.reportPeriod+'</td>';
					//高管弹框
					divHtmlTt+='<div class="gg_tc_box" id="digitary'+stat.id+'">';
					divHtmlTt+='<a href="javascript:;" class="faxfp_close_gg" onclick="hideDiv(\''+stat.id+'\')"><img src="/saasBeta/images/close1.png" alt="关闭"></a>';
					divHtmlTt+='<div class="faxfp_gg">';
					divHtmlTt+='<div class="fax_fp_top_gg">';
					divHtmlTt+='<div class="fp_top_l_gg fl">';
					if(stat.dignitaryName.length>14){
						divHtmlTt+='<h2 style="line-height:40px">'+stat.dignitaryName+'</h2>';
					}else{
						divHtmlTt+='<h2>'+stat.dignitaryName+'</h2>';
					}
					divHtmlTt+='</div>';
					divHtmlTt+='<div class="fp_top_r_gg fr">';
					divHtmlTt+='<div class="top_r_list_gg">';
					divHtmlTt+='<span>'+stat.position+'</span>';
					if(stat.sharesNumber==''||stat.sharesNumber==null||stat.sharesNumber==undefined){
						divHtmlTt+='<span>持股数：--万股</span>';
					}else{
						divHtmlTt+='<span>持股数：'+stat.sharesNumber+'万股</span>';
					}
					divHtmlTt+='</div>';
					divHtmlTt+='<div class="top_r_list_gg">';
					if(stat.education==''||stat.education==null||stat.education==undefined){
						divHtmlTt+='<span>'+stat.sex+'&nbsp&nbsp'+stat.age+'</span>';
					}else{
						divHtmlTt+='<span>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</span>';
					}
					if(stat.tenure==''||stat.tenure==null||stat.tenure==undefined){
						divHtmlTt+='<span>任期：--</span>';
					}else{
						divHtmlTt+='<span>任期：'+stat.tenure+'</span>';
					}
					divHtmlTt+='</div>';
					divHtmlTt+='</div>';
					divHtmlTt+='</div>';
					divHtmlTt+='<div class="clr"></div>';
					divHtmlTt+='<div class="fp_fax_box_gg">';
					divHtmlTt+='<p>'+stat.personalProfile+'</p>';
					divHtmlTt+='<div class="fax_time_gg">';
					divHtmlTt+='<span>报告期:'+stat.reportPeriod+'</span>';
					divHtmlTt+='</div>';
					divHtmlTt+='</div>';
					divHtmlTt+='<div class="clr"></div>';
					divHtmlTt+='</div>';
					divHtmlTt+='</div>';
					htmlThree+='</tr>';
					three=three+1;
				}
			}
			$("#directorsNum").text("("+one+")");
			$("#committeeNum").text("("+two+")");
			$("#seniorNum").text("("+three+")");
			$("#directors").append(htmlOne);
			$("#directorsTable").after(divHtmlT);
			
			$("#committee").append(htmlTwo);
			$("#committeeTable").after(divHtml);
			$("#senior").append(htmlThree);
			$("#seniorTable").after(divHtmlTt);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//董监高持股情况
function findDignitaryShare(){
	$.axs("/betaStock/dignitary/findDignitaryShare.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var fdsHtml='';
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				fdsHtml=fdsHtml+'<tr><td>'+stat.dignitaryName+'</td>'+
					'<td>'+stat.position+'</td>'+
					'<td class="shuzi">'+stat.beginHoldings+'</td>'+
					'<td class="shuzi">'+stat.numberVariation+'</td>'+
					'<td class="shuzi">'+stat.endHoldings+'</td>'+
					'<td class="shuzi">'+stat.endHoldingsRatio+'%</td>'+
					'<td class="shuzi">'+stat.endOptionsSums+'</td></tr>';
			}
			$("#findDignitaryShare").append(fdsHtml);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//董监高变动情况
function findMessageStats(){
	$.axs("/betaStock/dignitary/findMessageStats.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}else{
				var result=data.retData;
				$("#directorChange").html(result.directorchange);
				$("#managerChange").html(result.managerchange);
				$("#secretaryChange").html(result.secretarychange);
				$("#cfoChange").html(result.cfochange);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//董监高变动情况
function findDignitaryChange(){
	$.axs("/betaStock/dignitary/findDignitaryChange.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var dcHtml='';
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				dcHtml=dcHtml+'<tr><td>'+stat.username+'</td>'+
					'<td>'+stat.beginduty+'</td>'+
					'<td>'+stat.changetype+'</td>'+
					'<td>'+stat.endduty+'</td>'+
					'<td>'+stat.changecause+'</td></tr>';
			}
			$("#findDignitaryChange").append(dcHtml);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

function hideDiv(id){
	$("#digitary"+id).hide();
}

function showDivDig(id){
	$("#digitary101").show();
}

/*$(document).ready(function() {
	// 董事会点击弹窗
	$(".borDir_table tr td a").on("click", function() {
		$(this).parents("table").siblings(".gg_tc_box").show();
	});
	// 关闭弹窗
	$(".faxfp_close_gg img").on("click", function() {
		$(this).parent().parent(".gg_tc_box").hide();
	});
})*/
function hideDiv(id){
	$("#digitary"+id).hide();
}

function showDiv(id){
	$("#digitary"+id).show();
}