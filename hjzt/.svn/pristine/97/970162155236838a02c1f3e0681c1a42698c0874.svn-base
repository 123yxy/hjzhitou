//初始化加载
var stockCode= getUrlParam("stockCode");
$(function() {
	findDirectionNotice();
	findPPUnderway();
	findPPAccomplish();
});
//查询已完成定增
function findDirectionNotice(){
	$.axs("/betaStock/companyAnnouncement/findDirectionNotice.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var html='<li><a href="javascript:;">'+stat.announcementname+'</a>'+
					'<i onclick="downloadPdf(\''+stat.pdfurl+'\')">下载</i></li>';
				$("#notice").append(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//查询已完成定增
function findPPAccomplish(){
	$.axs("/betaStock/privatePlacement/findPPAccomplish.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var jindu='';
				if(stat.schedule=='1'){
					jindu='董事会通过';
				}else if(stat.schedule=='2'){
					jindu='股东大会通过';
				}else if(stat.schedule=='3'){
					jindu='停止实施';
				}else if(stat.schedule=='4'){
					jindu='股东大会未通过';
				}else if(stat.schedule=='5'){
					jindu='证监会核准';
				}else if(stat.schedule=='6'){
					jindu='实施中';
				}else if(stat.schedule=='7'){
					jindu='发行失败';
				}else{
					jindu='已完成定向增发';
				}
				html='<tr><td>'+stat.dateTime+'</td>'+
					'<td>'+jindu+'</td>'+
					'<td>'+stat.privatePrice+'</td>'+
					'<td>'+stat.privateNum+'</td>'+
					'<td class="mjje">'+stat.raisePrice+'</td>'+
					'<td>'+stat.financingRatio+'%</td>'+
					'<td>'+stat.premiumRate+'%</td>'+
					'<td>发行对象</td></tr>';
				$("#findPPAccomplish").append(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//查询增发预案-0
function findPPUnderway(){
	$.axs("/betaStock/privatePlacement/findPPUnderway.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var jindu='';
				if(stat.schedule=='1'){
					jindu='董事会通过';
				}else if(stat.schedule=='2'){
					jindu='股东大会通过';
				}else if(stat.schedule=='3'){
					jindu='停止实施';
				}else if(stat.schedule=='4'){
					jindu='股东大会未通过';
				}else if(stat.schedule=='5'){
					jindu='证监会核准';
				}else if(stat.schedule=='6'){
					jindu='实施中';
				}else if(stat.schedule=='7'){
					jindu='发行失败';
				}else{
					jindu='已完成定向增发';
				}
				html='<tr><td>'+stat.dateTime+'</td>'+
					'<td>'+jindu+'</td>'+
					'<td>'+stat.privatePrice+'</td>'+
					'<td>'+stat.privateNum+'</td>'+
					'<td class="mjje">'+stat.raisePrice+'</td>'+
					'<td>'+stat.financingRatio+'%</td>'+
					'<td>'+stat.premiumRate+'%</td>'+
					'<td>发行对象</td></tr>';
				$("#findPPUnderway").append(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//定增预案
function privatePlacementType(num){
	if(num==0){
		$("#a_0").attr("class","color");
		$("#a_8").removeClass();
		$("#findPPUnderway").show();
		$("#findPPAccomplish").hide();
	}else{
		$("#a_8").attr("class","color");
		$("#a_0").removeClass();
		$("#findPPAccomplish").show();
		$("#findPPUnderway").hide();
	}
}