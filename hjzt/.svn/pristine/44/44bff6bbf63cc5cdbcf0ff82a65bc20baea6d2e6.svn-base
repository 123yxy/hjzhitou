var stockCode = UTIL.getPara("stockCode");
var stockName = decodeURI(UTIL.getPara("stockName"));
// 大宗交易情况开始
function findGsDzjyqk(){
	var dataE = {stockCode:stockCode}
	UTIL.axs(UTIL.CONFIG.AfindGsDzjyqk, dataE, true, function (data) {
		if(data.retCode=="0000"){
			var data = data.retData.data;
			// console.log(data)
			$('#tradeList').html('');
			if(data!="" && data!=null && data!=undefined){
				var otn='';
				$(data).each(function(index,item){
					otn+='<tr><td class="zbdq" style="line-height:30px;">'+item.tdate+'</td><td class="shuzi sxjz" style="line-height:30px;">'+(isSZKong(item.price)=="-"?"--":(Number(item.price).toFixed(2)))+'</td><td class="shuzi sxjz" style="line-height:30px;">'+(isSZKong(item.tvol)=="-"?"--":(UTIL.fmtNum3(Number(item.tvol).toFixed(2))))+'</td><td class="shuzi sxjz" style="line-height:30px;">'+(isSZKong(item.tval)=="-"?"--":(UTIL.fmtNum3(Number(item.tval).toFixed(2))))+'</td><td  title="'+isStrKong(item.buyerName)+'"><em class="xsddd" >'+isStrKong(item.buyerName)+'</em></td><td title="'+isStrKong(item.salesName)+'"><em class="xsddd">'+isStrKong(item.salesName)+'</em></td></tr>';
				})
				$('#tradeList').html(otn);
			}else{
				var tr='<tr><td colspan="6" style="text-align:center;">暂无数据</td></tr>';
				$('#tradeList').html(tr);
			}
		}

	});
}
//法律诉讼
function AfindLegal(pageNum,type) {
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	// WF_ajax.findLegal(dataT,function(_data){
		var dataParams={stockCode : stockCode,pageSize:10,pageNum:pageNum};
	UTIL.axs(UTIL.CONFIG.AfindLegal, dataParams, true, function (data) {
		
		if (data.retCode == '0000') {

			var _data = data.retData.data;

			var _data = data.retData;
			var tr = '';		

			var _data = data.retData.data;
			var totalPages=data.retData.pageTotal;

			var tr = '';

			if(_data!=null &&　_data　!="" &&_data!=undefined){
//				$("#Law").find(".noDatas").hide();
//				$("#Law").find(".caiwu-table").show();
				$(_data).each(function(index,item){
					// console.log(item.url)
					tr+='<tr>';
					if(item.title.length>30){
						if(item.url.indexOf('http')>-1){
							tr+='<td class="zbdq" title="'+item.title+'"><a target="_blank" href='+item.url+'>'+item.title.substring(0,30)+ "..." +'</a></td>';
							// console.log('222')
						}else{
							tr+='<td class="zbdq" title="'+item.title+'">'+item.title.substring(0,30)+ "..." +'</td>';
						}
					}else{
						if(item.url.indexOf('http')>-1){
							tr+='<td class="zbdq" title="'+item.title+'"><a target="_blank" href='+item.url+'>'+item.title+'</a></td>';
							// console.log('111')
						}else{
							tr+='<td class="zbdq" title="'+item.title+'">'+item.title+'</td>';
						}
						
						
					}
					if(item.casetype==null){
						tr+='<td>--</td>'
					}else{
						tr+='<td>'+(item.casetype)+'</td>';
					}
					if(item.submittime==null){
						tr+='<td>--</td>'
					}else{
						tr+='<td>'+item.submittime+'</td>';
					}
					//var regTime = toDateTime(item.submittime, "yyyy-MM-dd");
					if(item.caseno.length>15){
						tr+='<td class="zbdq" title="'+item.caseno+'">'+item.caseno.substring(0,15)+ "..." +'</td>';
					}else{
						tr+='<td class="zbdq">'+item.caseno+'</td>';
					}
					tr+='</tr>';
				});	
				$("#findLegalData").html(tr);
				if(totalPages==1){
					$('#gqbdFL').css('display','none')
				}
				if(type==1){
					$('#pagesFlss').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							AfindLegal(pageNum,2);	
						}				   
					}
				});
				}
			}else{
//				var div='<div class="noDatas">暂无数据</div>';
//				$("#Law").find("div.caiwu-table").hide();
				var trHtml='<tr><td colspan="4" class="falv"  style="text-align: center;">暂无数据</td></tr>';
				$("#findLegalData").html(trHtml);
			}
		}
	});
}



//股权出质
function AfindEPData() {
		var params={stockCode : stockCode};
	UTIL.axs(UTIL.CONFIG.AfindEPData, params, true, function (data) {
		if (data.retCode == "0000") {
			var _data = data.retData.data;
			var liHtml = '';
			if( _data==null ||  _data=="" ||  _data==undefined){
				var trHtml='<tr><td colspan="8">暂无数据</td></tr>';
				$("#findPledgedData").html(trHtml);
			}else{
				for (var i = 0; i < _data.length; i++) {
					var obj = _data[i];
					liHtml += '<tr><td style="width: 115px;">' + ((new Date(obj.equityPledgedRecordDate)).Format("yyyy-MM-dd")) + '</td>';
					liHtml += '<td>' + isStrKong(obj.equityPledgedRecordNumber) + '</td>';
					liHtml += '<td>' + isStrKong(obj.equityPledgedState) + '</td>';
					liHtml += '<td>' + isStrKong(obj.equityPledgedAmount) + '</td>';
					liHtml += '<td class="td-left">' + isStrKong(obj.equityPledgedPerson) + '</td>';
					liHtml += '<td class="td-left">' + isStrKong(obj.equityPledgedPawnee) + '</td>';
				}
				$("#findPledgedData").html(liHtml);
			}
		}
	});
}
//经营异常
function AfindAbnormal() {
	// WF_ajax.findAbnormal(dataT,function(_data){
		var params={stockCode : stockCode};
	UTIL.axs(UTIL.CONFIG.AfindAbnormal, params, true, function (_data) {
		if (_data.retCode == "0000") {
			var result = _data.retData.data;
			var liHtml = '';
			if(result=="" || result==null || result==undefined){
				var trHtml='<tr><td colspan="5" class="yc"  style="text-align: center;">暂无数据</td></tr>';
				$("#findAbnormalData").html(trHtml);
			}else{
				for (var i = 0; i < result.length; i++) {
					var obj = result[i];
					if(obj.putReason.length>12){
						liHtml += '<tr><td class="zbdqbj" title="'+obj.putReason+'">' + obj.putReason.substring(0,12)+"..." + '</td>';
					}else{
						liHtml += '<tr><td class="zbdqbj">' + obj.putReason + '</td>';
					}
					liHtml += '<td>' + ((new Date(obj.putDate)).Format("yyyy-MM-dd")) + '</td>';
					if(obj.putDepartment==null || obj.putDepartment=="" || obj.putDepartment==undefined){
						liHtml += '<td>--</td>';
					}else{
						if(obj.putDepartment.length>10){
							liHtml += '<td title="'+obj.putDepartment+'">' + obj.putDepartment.substring(0,10)+"..." + '</td>';
						}else{
							liHtml += '<td>' + obj.putDepartment + '</td>';
						}
					}
					if(obj.removeReason==null || obj.removeReason=="" || obj.removeReason==undefined){
						liHtml += '<td>--</td>';
					}else{
						if(obj.removeReason.length>10){
							liHtml += '<td title="'+obj.removeReason+'">' + obj.removeReason.substring(0,10)+"..." + '</td>';
						}else{
							liHtml += '<td>' + obj.removeReason + '</td>';
						}
					}
					
					liHtml += '<td>' + ((new Date(obj.removeDate)).Format("yyyy-MM-dd")) + '</td>';
					if(obj.removeDepartment==null || obj.removeDepartment=="" || obj.removeDepartment==undefined){
						liHtml += '<td class="ybdqbj">--</td></tr>';
					}else{
						if(obj.removeDepartment.length>10){
							liHtml += '<td class="ybdqbj" title="'+obj.removeDepartment+'">' + obj.removeDepartment.substring(0,10)+"..." + '</td></tr>';
						}else{
							liHtml += '<td class="ybdqbj">' + obj.removeDepartment + '</td></tr>';
						}
					}
				}
				$("#findAbnormalData").html(liHtml);
			}
			
		}
	});
}
//欠税公告
function AfindOAData() {
	// WF_ajax.findAffiche(dataT,function(_data){
		var params={stockCode : stockCode};
	UTIL.axs(UTIL.CONFIG.AfindOAData, params, true, function (_data) {
		// console.log(_data)
		if (_data.retCode == "0000") {
			var result = _data.retData.data;
			var liHtml = '';
			if(result=="" || result==null || result==undefined){
				var trHtml='<tr><td colspan="5">暂无数据</td></tr>';
				$("#findAfficheData").html(trHtml);
			}else{
				for (var i = 0; i < result.length; i++) {
					var obj = result[i];
					liHtml += '<tr><td class="zbdq">' + ((new Date(obj.releaseDate)).Format("yyyy-MM-dd")) + '</td>';
					liHtml += '<td>' + isSZKong(obj.registrationNumber) + '</td>';
					liHtml += '<td>' + isStrKong(obj.qutstandingTaxes) + '</td>';
					if(obj.backTaxes==null || obj.backTaxes=="" || obj.backTaxes==undefined){
						liHtml += '<td class="shuzi">--</td>';
					}else{
						liHtml += '<td class="shuzi">' + UTIL.fmtNum3(Number(obj.backTaxes).toFixed(2)) + '</td>';
					}
					
					if(obj.taxesBalance==null || obj.taxesBalance=="" || obj.taxesBalance==undefined){
						liHtml += '<td class="shuzi">--</td>';
					}else{
						liHtml += '<td class="shuzi">' + UTIL.fmtNum3(Number(obj.taxesBalance).toFixed(2)) + '</td>';
					}
					liHtml += '<td>' + isStrKong(obj.taxAuthority) + '</td></tr>';
				}	
				$("#findAfficheData").html(liHtml);
			}
		}
	});
}
//更新时间十大股东
function gengXinshijian(){
	var dataW ={stockCode:stockCode,sType:'1'}
		UTIL.axs(UTIL.CONFIG.AfindShidagudongsj,dataW , false, function (data) {
			var data = data.retData;
			// console.log(data)
			var otn='';
			$(data).each(function(index,item){
					otn+='<li>'+item+'</li>'
				})
			$('#xzsdgd').html(otn)
			var ssj=data[0];
			// console.log(ssj)
			$('#sdgdp').text(ssj);
		});
}
function gengXinshijianLt(){
	var dataW ={stockCode:stockCode,sType:'2'}
		UTIL.axs(UTIL.CONFIG.AfindShidagudongsj,dataW , false, function (data) {
			var data = data.retData;
			// console.log(data)
			var otn='';
			$(data).each(function(index,item){
					otn+='<li>'+item+'</li>'
				})
			$('#sdltgd').html(otn)
			var ssj=data[0];
			// console.log(ssj)
			$('#sdltgdp').text(ssj);
		});
}
//十大流通股东
function shiDaLiuTongGuDong(reportPeriod){

var dataW ={stockCode:stockCode,sType:'2'}
	UTIL.axs(UTIL.CONFIG.AfindShidagudongsj,dataW , false, function (data) {
		var data = data.retData;
		// console.log(data)
		var otn='';
		$(data).each(function(index,item){
				otn+='<li>'+item+'</li>'
			})
			// console.log(otn)
		$('#sdltgd').html(otn)
	});
	var sj=$("#sdltgdp").text()
	// console.log(sj)
	
	var dataP = { stockCode:stockCode,sType:2,reportDate:sj};
		UTIL.axs(UTIL.CONFIG.AfindShidagudong, dataP, true, function (data) {
			if(data.retCode == "0000"){
				var data = data.retData;
				var litr='';
				$("#ltlist").html('');
				if( data==null ||  data=="" ||  data==undefined){
					var trHtml='<tr><td colspan="7">暂无数据</td></tr>';
					$("#ltlist").html(trHtml);
					$("#xzsdgd").css('display','none')
				}else{
					$(data).each(function(index,item){
						if(item.ZJ=="不变"){
							litr+='<tr>';
							litr+='<td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>15){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,15)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							
							// litr+='<td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td>'+
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>'
							litr+='<td>'+isSZKong(item.stockType)+'</td>'
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td>'
							litr+='<td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td>'
							litr+='<td class="ybnbj"><span class="Hei">'+item.ZJ+'</span></td>';
						}else if(item.ZJ>0){
							litr+='<tr>';
							litr+='<td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>15){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,15)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>';
							litr+='<td>'+isSZKong(item.stockType)+'</td>';						
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td>';
							litr+='<td class="ybnbj"><span class="Red">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
						}else if(item.ZJ<0){
							litr+='<tr>';
							litr+='<td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>15){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,15)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>';
							litr+='<td>'+isSZKong(item.stockType)+'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td>';
							litr+='<td class="ybnbj"><span class="gern">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
						}else if( item.ZJ=="新进"){
							litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>15){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,15)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>';
							litr+='<td>'+isSZKong(item.stockType)+'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td>';
							litr+='<td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td>';
							litr+='<td class="ybnbj"><span class="Red">'+item.ZJ+'</span></td>';
						}
						$('#ltlist').html(litr)
					})
				}
			}
	});
}
//十大股东
function shiDaGuDong(reportPeriod){

	var dataW ={stockCode:stockCode,sType:'1'}
		UTIL.axs(UTIL.CONFIG.AfindShidagudongsj,dataW , false, function (data) {
			var data = data.retData;
			// console.log(data)
			var otn='';
			$(data).each(function(index,item){
					otn+='<li>'+item+'</li>'
				})
			$('#xzsdgd').html(otn)
		});
	var sj =$("#sdgdp").text();
	// console.log(sj)

 var dataP = { stockCode:stockCode,sType:1,reportDate:sj };
	UTIL.axs(UTIL.CONFIG.AfindShidagudong, dataP, true, function (data) {
		if(data.retCode == "0000"){
				var data = data.retData;
				var litr='';
				$("#eventListGG").html('');
				if( data==null ||  data=="" ||  data==undefined){
					var trHtml='<tr><td colspan="7">暂无数据</td></tr>';
					$("#eventListGG").html(trHtml);
					$("#xzsdgd").css('display','none')
				}else{
					$(data).each(function(index,item){
						if(item.ZJ=="不变"){
							litr+='<tr>';
							litr+='<td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>13){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,13)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							
							// litr+='<td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td>'+
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>'
							litr+='<td>'+isSZKong(item.stockType)+'</td>'
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td>'
							litr+='<td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td>'
							litr+='<td class="ybnbj"><span class="Hei">'+item.ZJ+'</span></td>';
						}else if(item.ZJ>0){
							litr+='<tr>';
							litr+='<td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>13){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,13)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>';
							litr+='<td>'+isSZKong(item.stockType)+'</td>';						
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td>';
							litr+='<td class="ybnbj"><span class="Red">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
						}else if(item.ZJ<0){
							litr+='<tr>';
							litr+='<td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>13){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,13)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>';
							litr+='<td>'+isSZKong(item.stockType)+'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td>';
							litr+='<td class="ybnbj"><span class="gern">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
						}else if( item.ZJ=="新进"){
							litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td>';
							if(item.sharehdName!=null&&item.sharehdName!=''&&item.sharehdName!=undefined){
								if(item.sharehdName.length>13){
									litr+='<td class="lfdq" title="'+item.sharehdName+'">'+(item.sharehdName).substring(0,13)+'...</td>';
								}else{
									litr+='<td class="lfdq">'+isSZKong(item.sharehdName)+'</td>';
								}
							}else{
								litr+='<td class="lfdq">--</td>';
							}
							litr+='<td>'+isSZKong(item.sharehdNature)+'</td>';
							litr+='<td>'+isSZKong(item.stockType)+'</td>';
							litr+='<td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td>';
							litr+='<td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td>';
							litr+='<td class="ybnbj"><span class="Red">'+item.ZJ+'</span></td>';
						}
						$('#eventListGG').html(litr)
					})
				}
					
			}
	});
}


function AsectionOne3() {
	// 十大股东开始
	//获取时间接口
	// var dataW ={stockCode:stockCode,sType:'1'}
	// UTIL.axs(UTIL.CONFIG.AfindShidagudongsj,dataW , false, function (data) {
	// 	var data = data.retData;
	// 	var otn='';
	// 	$(data).each(function(index,item){
	// 			otn+='<li>'+item+'</li>'
	// 		})
	// 	$('#xzsdgd').html(otn)
	// });

	
   
	// // 十大股东结束
	// // 十大流通股东开始
	// //获取时间接口
	// var dataW ={stockCode:stockCode,sType:'2'}
	// UTIL.axs(UTIL.CONFIG.AfindShidagudongsj,dataW , false, function (data) {
	// 	var data = data.retData;
	// 	// console.log(data)
	// 	var otn='';
	// 	$(data).each(function(index,item){
	// 			otn+='<li>'+item+'</li>'
	// 		})
	// 	$('#sdltgd').html(otn)
	// });
	// $('#sdltgd').on('change',function(){
	// 	var sj=$('#sdltgd').find("option:selected").text();
	// 	//console.log(sj)
	// 	var dataP = { stockCode:stockCode,sType:2,reportDate:sj };
	// 	UTIL.axs(UTIL.CONFIG.AfindShidagudong, dataP, true, function (data) {
	// 		if(data.retCode == "0000"){
	// 			var data = data.retData;
	// 			var litr='';
	// 			$("#ltlist").html('');
	// 			if( data==null ||  data=="" ||  data==undefined){
	// 				var trHtml='<tr><td colspan="7">暂无数据</td></tr>';
	// 				$("#ltlist").html(trHtml);
	// 				$('#sdltgd').css('display','none');
	// 			}else{
	// 				$(data).each(function(index,item){
	// 					if(item.ZJ=="不变"){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td  class="shuzi">'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td><td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td><td  class="ybnbj"><span class="Hei">'+item.ZJ+'</span></td>';
	// 					}else if(item.ZJ>0){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td class="shuzi">'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td><td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td><td class="ybnbj"><span class="Red">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
	// 					}else if(item.ZJ<0){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td class="shuzi">'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td><td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td><td class="ybnbj"><span class="gern">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
	// 					}else if( item.ZJ=="新进"){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td class="shuzi">'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td><td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td><td class="ybnbj"><span class="Red">'+item.ZJ+'</span></td>';
	// 					}
	// 					$('#ltlist').html(litr)
	// 				})
	// 			}
	// 		}
	// 	});
	// })
	// var sj=$('#sdltgd').find("option:selected").text();
	// 	// console.log(sj)
	// 	var dataP = { stockCode:stockCode,sType:2,reportDate:sj };
	// 	UTIL.axs(UTIL.CONFIG.AfindShidagudong, dataP, true, function (data) {
	// 		if(data.retCode == "0000"){
	// 			var data = data.retData;
	// 			var litr='';
	// 			$("#ltlist").html('');
	// 			if( data==null ||  data=="" ||  data==undefined){
	// 				var trHtml='<tr><td colspan="7">暂无数据</td></tr>';
	// 				$("#ltlist").html(trHtml);
	// 				$('#sdltgd').css('display','none');
	// 			}else{
	// 				$(data).each(function(index,item){
	// 					if(item.ZJ=="不变"){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td>'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td><td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td><td class="ybnbj"><span class="Hei">'+item.ZJ+'</span></td>';
	// 					}else if(item.ZJ>0){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td>'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td><td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td><td class="ybnbj"><span class="Red">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
	// 					}else if(item.ZJ<0){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td>'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" :  UTIL.fmtNum3((item.sharehdNum).toFixed(2))) +'</td><td class="shuzi">'+(isSZKong(item.sharehdNumper) == "-" ? "--" :  (item.sharehdNumper).toFixed(2))+'</td><td class="ybnbj"><span class="gern">'+(isSZKong(item.ZJ) == "-" ? "--" : (UTIL.fmtNum3(Number(item.ZJ).toFixed(2)))) +'</span></td>';
	// 					}else if( item.ZJ=="新进"){
	// 						litr+='<tr><td class="zbdqbj">'+isSZKong(item.shareRanking)+'</td><td class="lfdq" title="'+isSZKong(item.sharehdName)+'"><em class="xsddd">'+isSZKong(item.sharehdName)+'</em></td><td>'+isSZKong(item.sharehdNature)+'</td><td>'+isSZKong(item.stockType)+'</td><td class="shuzi">'+(isSZKong(item.sharehdNum) == "-" ? "--" : (((item.sharehdNum).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharehdNum).toFixed(2)))) +'</td><td class="shuzi">'+isSZKong(item.sharehdNumper)+'</td><td class="ybnbj"><span class="Red">'+item.ZJ+'</span></td>';
	// 					}
	// 					$('#ltlist').html(litr)
	// 				})
	// 			}
				
	// 		}
	// 	});
	// 十大流动股东结束	
	// 股东人数变化开始
		var dataS={stockCode:stockCode}
		UTIL.axs(UTIL.CONFIG.AfindGudongrenshu, dataS, false, function (data) {
			//  console.log(data)
			if(data.retCode == "0000"){
				var data = data.retData;
				var sjTr="";
				var sjTh='';
				 $('#ltRs').html("");
				 //表头
				
				 $('#ltTh').html("");
				 var titles =[];
				if( data==null ||  data=="" ||  data==undefined){
					var trHtml="<div style='text-align:center'>暂无数据</div>";
					$('#zwyc1').css('display','none');
					$('#zwyc2').css('display','none');
					$('#zwxs').html(trHtml);
				}else{
					$(data[0]).each(function(index,item){
						for( var key in item){
							if(key=="name"){

							}else{
								sjTh+='<th  class="shuzi">'+key+'</th>';
								titles.push(key);
							}
						}	
						$('#ltTh').append(sjTh);
					})
				}
				var WidK=(titles.length)*112;
				// console.log(WidK);
				$('.nrhdz').css('width',WidK+'px');
				if( data==null ||  data=="" ||  data==undefined){
					var trHtml='<tr><td colspan="7">暂无数据</td></tr>';
					$('#ltRs').html(trHtml);
				}else{
					$(data).each(function(index,item){
						// console.log(data)
						//  console.log(item)
							sjTr+='<tr>';
							// if(item['name']=='rjltg'){
							// 	$(titles).each(function(index,itemTitle){
							// 		var cyyw=((item[itemTitle]/10000).toFixed(2));
							// 		// console.log(cyyw)
							// 		sjTr+='<td>'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							// 	});
							// }else if(item['name']=='rjcgje'){
							// 	$(titles).each(function(index,itemTitle){
							// 		var cyyw=(item[itemTitle].toFixed(2));
							// 		// console.log(cyyw)
							// 		sjTr+='<td>'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							// 	});
							// }else{
								
							// 	console.log('333')
							// 	$(titles).each(function(index,itemTitle){
							// 		sjTr+='<td>'+(isSZKong(item[itemTitle]) == "-" ? "--" :isSZKong(item[itemTitle]) == "0" ? "--": (UTIL.fmtNum3(Number(item[itemTitle]))))+'</td>';
							// 	});
								
							// }

							//股东户数
							if(item['name']=='gdrs'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);
									// console.log('1')
									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									// sjTr+='<td class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								});
							}
							//股东户数较上期变化
							if(item['name']=='gdrsJsqbh'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);

									
									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									// console.log('2')
									// sjTr+='<td class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								});
							}
							//户均流通股东
							if(item['name']=='rjltg'){
								$(titles).each(function(index,itemTitle){
									var cyyw=((item[itemTitle]/10000).toFixed(2));
									// console.log('3')
									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									// sjTr+='<td class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								});
							}
							//户均流通股东较上期变化
							if(item['name']=='rjltgJsqbh'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);
									// console.log('4')
									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									// sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								});
							}
							//股价
							 if(item['name']=='gj'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);
									// console.log('5')
									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									// sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								});
							}
							//户均持股金额
							 if(item['name']=='rjcgje'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);
									// console.log(cyyw)
									// var cyqw=cyyw;
									
									if(cyyw==null){
										cyyw="--";
									}else{
										cyyw=cyyw.toFixed(2);
									}
									// console.log(cyyw)
									// sjTr+='<td  class="shuzi">'+cyyw+'</td>';
									 if(index==titles.length-1){
										sjTr+='<td  class="ybdqbj">'+cyyw+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+cyyw+'</td>';

									 }
									
								});
							}
							//前十大股东持股合计
							if(item['name']=='qsdgdcghj'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);
									// console.log('7')
									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									// sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								});
							}
							//前十大流通股东持股合计
							if(item['name']=='qsdltgdcghj'){
								$(titles).each(function(index,itemTitle){
									var cyyw=(item[itemTitle]);
									// console.log('8')
									// sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									//console.log(itemTitle.length)

									 if(index==titles.length-1){
										 sjTr+='<td  class="ybdqbj">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
									 }else{
										 sjTr+='<td  class="shuzi">'+(isSZKong(cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';

									 }
									

								});
							}
							
								
								// console.log('333')
								// $(titles).each(function(index,itemTitle){
								// 	sjTr+='<td>'+(isSZKong(item[itemTitle]) == "-" ? "--" :isSZKong(item[itemTitle]) == "0" ? "--": (UTIL.fmtNum3(Number(item[itemTitle]))))+'</td>';
								// });
								
							
							sjTr+='</tr>';
							//sjTr+='<tr><td>'+(isSZKong(item['2017-11-15']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-11-15']).toFixed(2))))+'</td><td>'+(isSZKong(item['2017-10-31']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-10-31']).toFixed(2))))+'</td><td>'+(isSZKong(item['2017-10-15']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-10-15']).toFixed(2)))) +'</td><td>'+(isSZKong(item['2017-09-30']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-09-30']).toFixed(2)))) +'</td><td>'+(isSZKong(item['2017-09-15']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-09-15']).toFixed(2))))+'</td><td>'+(isSZKong(item['2017-08-31']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-08-31']).toFixed(2)))) +'</td><td>'+(isSZKong(item['2017-08-15']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-08-15']).toFixed(2)))) +'</td><td>'+(isSZKong(item['2017-07-31']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-07-31']).toFixed(2)))) +'</td><td>'+(isSZKong(item['2017-07-14']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-07-14']).toFixed(2)))) +'</td><td>'+(isSZKong(item['2017-06-30']) == "-" ? "--" : (UTIL.fmtNum3(Number(item['2017-06-30']).toFixed(2)))) +'</td></tr>';
							$('#ltRs').html(sjTr);					
						})
				}
			}
		});


	// 股东人数变化结束
}
function section1() {
	//企业简介方法调用 section0
	UTIL.axs(UTIL.CONFIG.AcompanyIntroduction, dataT, true, function (_data) {
		if (_data.retCode == "0000") {
			var data = _data.retData;
			$("#companyIntroductionId").html("");
			$("#companyIntroductionId").html(isStrKong(data.introduction).replace(/\s+/g, ""));
		}
	});
	var dataParams={stockCode:stockCode};
	//企业工商信息 section0
	UTIL.axs(UTIL.CONFIG.AfindCompanyMsgByCode, dataParams, true, function (_data) {
		 //console.log(_data)
		 if (_data.retCode == "0000") {
		 	var data = _data.retData;
		 	$("#chiName").html(isStrKong(data.chiName));
		 	$("#AShareCode").html(isStrKong(data.stockCode));
		 	$("#AStockAbbreviation").html(isStrKong(data.stockName));
		 	$("#SecuritiesCategory").html(isStrKong(data.stockCategory));
		 	$("#legalperson").html(isStrKong(data.legalPerson));
		 	$("#managerMan").html(isStrKong(data.managerMan));
		 	$("#chairMan").html(isStrKong(data.chairMan));
		 	$("#secretary").html(isStrKong(data.secretary));
		 	$("#phone").html(isSZKong(data.phone));
		 	$("#fax").html(isSZKong(data.fax));
		 	$("#companyMail").html(isStrKong(data.companyMail));
		 	$("#companyUrl").html(isStrKong(data.companyUrl));
		 	if(data.businessAddress!="" && data.businessAddress!=undefined && data.businessAddress!=null){
		 		if(data.businessScope.length>18){
		 			$("#businessAddress").html(isStrKong(data.businessAddress)=="--"?"--":(isStrKong(data.businessAddress)).substring(0,18)+"...");
		 			$("#businessAddress").attr("title",data.businessAddress);
		 		}else{
		 			$("#businessAddress").html(isStrKong(data.businessAddress));
		 		}
		 	}else{
		 		$("#businessAddress").html("--");
		 	}
			 if(data.registeredAddress!="" && data.registeredAddress!=undefined && data.registeredAddress){
		 		if(data.registeredAddress.length>18){
		 			$("#registeredAddress").html(isStrKong(data.registeredAddress)=="--"?"--":(isStrKong(data.registeredAddress)).substring(0,18)+"...");
		 			$("#registeredAddress").attr("title",data.registeredAddress);
		 		}else{
		 			$("#registeredAddress").html(isStrKong(data.registeredAddress));
		 		}
		 	}else{
		 		$("#registeredAddress").html("--");
		 	}
		 	// var spHtml="<em class='ycnr' title="+isStrKong(data.registeredAddress)+">"+isStrKong(data.registeredAddress)+"</em>"
		 	// $("#registeredAddress").html(isStrKong(data.registeredAddress));
		 	$("#state").html(isStrKong(data.state));
		 	$("#registeredCapital").html(UTIL.fmtNum3((data.registeredCapital).toFixed(2)) + "亿元");
		 	$("#registrationNumber").html(isStrKong(data.registrationNumber));
		 	$("#lawName").html(isStrKong(data.lawName));
		 	$("#accountingFirm").html(isStrKong(data.accountingFirm));
		 	if(data.businessScope!="" && data.businessScope!=undefined && data.businessScope!=null){
		 		if(data.businessScope.length>100){
		 			$("#businessScopes").html(isStrKong(data.businessScope)=="--"?"--":(isStrKong(data.businessScope)).substring(0,100)+"...");
		 			$("#businessScopes").attr("title",data.businessScope);
		 		}else{
		 			$("#businessScopes").html(isStrKong(data.businessScope));
		 		}
		 	}else{
		 		$("#businessScopes").html("--");
		 	}
		 	
		 	
		 	$("#companyIntroductionId").html(isStrKong(data.enterpriseIntroduction));
		 }
	});
	 UTIL.axs(UTIL.CONFIG.AfindStockSummary, dataParams, true, function (_data) { 
	 	if(_data.retCode=="0000"){
	 		var data=_data.retData;
	 		if(data!=null && data!="" && data!=undefined && data!="null"){
	 			$("#industryEjName").html(isStrKong(data.industryEjName));
	 			if(data.industryGnName!=="" && data.industryGnName!=null && data.industryGnName!=undefined){
	 				if(data.industryGnName.length>18){
	 					$("#industryGnName").html((data.industryGnName).substring(0,18)+"...");
	 					$("#industryGnName").attr("title",data.industryGnName);
	 				}else{
	 					$("#industryGnName").html(data.industryGnName);
	 				}
	 			}else{
	 				$("#industryGnName").html("--");
	 			}
	 			if(data.pettm<0){
					 $("#pettm").html(isSZKong(data.pettm)=="-"?"--":"--");
				 }else{
					$("#pettm").html(isSZKong(data.pettm)=="-"?"-":(isSZKong(data.pettm).toFixed(2)));
				 }
	 			
	 			$("#pe").html((isSZKong(data.pe)=="-"?"-":isSZKong(data.pe).toFixed(2)));
	 			$("#pb").html((isSZKong(data.pb)=="-"?"-":isSZKong(data.pb).toFixed(2)));
	 			$("#earningsPerShare").html((isSZKong(data.earningsPerShare)=="-"?"-":isSZKong(data.earningsPerShare).toFixed(2)));
	 			$("#dilutionEarningsPerShare").html((isSZKong(data.dilutionEarningsPerShare)=="-"?"-":isSZKong(data.dilutionEarningsPerShare).toFixed(2)));
	 			$("#generalCapital").html((isSZKong(data.generalCapital)=="-"?"-":UTIL.fmtNum3(isSZKong(data.generalCapital))));
	 			$("#totalMarketValue").html((isSZKong(data.totalMarketValue)=="-"?"-":UTIL.fmtNum3(isSZKong(data.totalMarketValue).toFixed(2))));
	 			$("#circulationCapital").html((isSZKong(data.circulationCapital)=="-"?"-":UTIL.fmtNum3(isSZKong(data.circulationCapital))));
	 			$("#marketCapitalization").html((isSZKong(data.marketCapitalization)=="-"?"-":UTIL.fmtNum3(isSZKong(data.marketCapitalization).toFixed(2))));
				$("#financingBalance").html((isSZKong(data.financingBalance)=="-"?"-":UTIL.fmtNum3(isSZKong(data.financingBalance).toFixed(2))));
				$("#securitiesBalance").html((isSZKong(data.securitiesBalance)=="-"?"-":UTIL.fmtNum3(isSZKong(data.securitiesBalance).toFixed(2))));
	 			$("#netAssetValuePerShare").html((isSZKong(data.netAssetValuePerShare)=="-"?"-":isSZKong(data.netAssetValuePerShare).toFixed(2)));
	 			$("#accumulationFundShare").html((isSZKong(data.accumulationFundShare)=="-"?"-":isSZKong(data.accumulationFundShare).toFixed(2)));
	 			$("#undistributedProfit").html((isSZKong(data.undistributedProfit)=="-"?"-":isSZKong(data.undistributedProfit).toFixed(2)));
	 			$("#operatingCashFlow").html((isSZKong(data.operatingCashFlow)=="-"?"-":isSZKong(data.operatingCashFlow).toFixed(2)));
	 		}
	 	}
			 
	 })
};
	 
//  * 查询董监高信息
//  * 修改：shiqi
//  * 更细内容：1）股数没有时，不显示
//  * 日期：2017/10/16
//  */
function AfindNewDigData() {
	UTIL.axs(UTIL.CONFIG.AfindNewDigData, { stockCode: stockCode }, true, function (data) {
		//console.log(data)
		if (data.retCode == "0000") {
			var jdgHtml = "";
			if (data.retData != null && data.retData.length > 0) {
				//console.log(data.retData)
				$(data.retData).each(function (i, item) {
					jdgHtml += "<tr>" +
						"<td style='text-align:left; padding-left:20px;box-sizing: border-box;'>" + isStrKong(item.dignitaryName) + "</td>" +
						"<td>" + isStrKong(item.position)+"</td>" +
						"<td>" + isStrKong(item.sex) + "</td>" +
						"<td>" + isStrKong(item.age) + "</td>" +
						"<td>" + isStrKong(item.education) + "</td>" +
						"<td>" + isStrKong(item.tenure).replace(/\s+/g, "") + "</td>" +
						"<td class=shuzi>" + (isSZKong(item.sharesNumber) == "-" ? "--" : (((item.sharesNumber).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharesNumber).toFixed(2)))) + "</td>" +
						"<td><span class='chakan' data-id='"+item.personalProfile+"' data-name='"+ item.dignitaryName +"'>查看</span></td></tr>";
				})
			} else {
				jdgHtml = "<tr>" +
					"<td colspan='8' ><div class='noDatas'>暂无数据</div></td>" +
					"</tr>";
			}
			$("#djgUL").html(jdgHtml);
			var djgWidth = $(".dongjiangao").width();
			$("#djgUL .jl-tc").css("width", djgWidth - 20);
			UTIL.sjly("#ryqkly", "ryqk", ".djg", "sjlyy");
			//			$("[name='djgA']").on('tap',function(){ //改成jquery
			//				hqJL(this);
			//			});
			
		
		}
	})
}
/**
 * 查询员工信息
 */
function AfindStaffData() {
	UTIL.axs(UTIL.CONFIG.AfindStaffData, { stockCode: stockCode }, true, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			var result = data.retData;
			var legendXLData = []; //学历
			var xlData = []; //学历
			var legendZWData = []; //职位
			var zwData = []; //职位
			if (result.zwMap != null && result.zwMap.zwData != null && result.zwMap.zwData.length > 0) { //职位数据
				$(result.zwMap.zwData).each(function (i, item) {
					legendZWData.push(item.belongClassification);
					zwData.push({ "value": item.number, "name": item.belongClassification });
				})
				jobDistribution(legendZWData, zwData); //职位
			} else {
				$("#employee").hide();
			}
			if (result.xlMap != null && result.xlMap.xlData != null && result.xlMap.xlData.length > 0) { //学历数据
				$(result.xlMap.xlData).each(function (i, item) {
					legendXLData.push(item.belongClassification);
					xlData.push({ "value": item.number, "name": item.belongClassification });
				})
				educational(legendXLData, xlData); //学历
			} else {
				$("#educational").hide();
			}
			var xlIHtml = "<h6>同行业对比分析</h6>";
			if (result.xlMap != null && result.xlMap.xlIList != null && result.xlMap.xlIList.length > 0) { //学历同行业
				$(result.xlMap.xlIList).each(function(i, item){ //循环要展示的学历同行业
					if(item.gsBFB != null){
						if (item.CZ.toString().indexOf("-") == 0) {
							xlIHtml += "<p>公司学历为" + isStrKong(item.gsMC) + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ) == 0) {
							xlIHtml += "<p>公司学历为" + isStrKong(item.gsMC) + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比去年无变化。</p>";
						} else {
							xlIHtml += "<p>公司学历为" + isStrKong(item.gsMC) + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				xlIHtml += "<div class='noDatas'>暂无数据</div>";
			}
			var xlCHtml = "<h6>水平分析</h6>";
			if (result.xlMap != null && result.xlMap.xlHList != null && result.xlMap.xlHList.length > 0) { //学历与上期
				$(result.xlMap.xlHList).each(function(i, item){ //循环要展示的学历与上期
					if(item.newBFB != null){
						if (item.CZ.toString().indexOf("-") == 0) {
							xlCHtml += "<p>本年度公司学历为" + isStrKong(item.MC) + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为"+parseFloat(item.oldBFB).toFixed(2)+"%，比去年少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ) == 0) {
							xlCHtml += "<p>本年度公司学历为" + isStrKong(item.MC) + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为"+parseFloat(item.oldBFB).toFixed(2)+"%，比去年无变化。</p>";
						} else {
							xlCHtml += "<p>本年度公司学历为" + isStrKong(item.MC) + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为"+parseFloat(item.oldBFB).toFixed(2)+"%，比去年多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				xlCHtml += "<p><div class='noDatas'>无上一年度数据</div></p>";
			}
			$("#xlDBMsg").html(xlIHtml + xlCHtml); //学历
			var zwIHtml = "<h6>同行业对比分析</h6>";
			if (result.zwMap != null && result.zwMap.zwIList != null && result.zwMap.zwIList.length > 0) { //职位同行业
				$(result.zwMap.zwIList).each(function(i, item){
					if(item.gsBFB != null){
						if (item.CZ.toString().indexOf("-") == 0) {
							zwIHtml += "<p>公司" + isStrKong(item.gsMC) + "的职工人数比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ.toString()) == 0) {
							zwIHtml += "<p>公司" + isStrKong(item.gsMC) + "的职工人数与行业均值一样。</p>";
						} else {
							zwIHtml += "<p>公司" + isStrKong(item.gsMC) + "的职工人数比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				zwIHtml += "<div class='noDatas'>暂无数据</div>";
			}
			var zwCHtml = "<h6>水平分析</h6>";
			if (result.zwMap != null && result.zwMap.zwHList != null && result.zwMap.zwHList.length > 0) { //与上期比较
				$(result.zwMap.zwHList).each(function(i, item){
					if(item.newBFB){
						if (item.CZ.toString().indexOf("-") == 0) {
							zwCHtml += "<p>截止最近一个会计年度，公司" + isStrKong(item.MC) + "类员工与上年同期变化少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ) == 0) {
							zwCHtml += "<p>截止最近一个会计年度，公司" + isStrKong(item.MC) + "类员工与上年同期无变化。</p>";
						} else {
							zwCHtml += "<p>截止最近一个会计年度，公司" + isStrKong(item.MC) + "类员工与上年同期变化多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				zwCHtml += "<div class='noDatas'>暂无数据</div>";
			}
			$("#zwDBMsg").html(zwIHtml + zwCHtml); //职位
			UTIL.sjly("#ryqk1ly", "ryqk", ".ygqk", "sjlyy");
		}
	})
}
// A股重大事件开始
// 1.6.1并购重组
function findBingGou(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode, pageSize:10, pageNum:pageNum}
	// console.log(dataY)
	UTIL.axs(UTIL.CONFIG.AfindBingGou, dataY, true, function (data) {
		//console.log(data);
		if(data.retCode=="0000"){
			var result=data.retData.data;
			var totalPages=data.retData.pageTotal;
			if(result!=null &&　result!="" && result!=undefined){
				var otn='';
				$(result).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isStrKong(item.firstnoticeDate)+'</td><td>'+isStrKong(item.noticeDate)+'</td><td>'+isStrKong(item.fajd)+'</td><td class="shuzi">'+isSZKong(item.tradeAmount)+'</td><td>'+isStrKong(item.currency)+'</td><td class="shuzi">'+isSZKong(item.zrbl)+'</td><td class="ybdqbj"><span class="chakan" data-type="'+item.sign+'">查看</span></td></tr>';
				})
				$('#eventListBG').html(otn);
				//console.log(totalPages)
				if(totalPages==1){
					$('#gqbdBG').css('display','none')
				}

				if(type==1){
					$('#pagesBG').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findBingGou(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				var tr="<tr><td colspan='7'>暂无数据</td></tr>";
				$('#eventListBG').html(tr);
			}

			
			
		}
		
	});
}
//并购的查看详情
function findBGDetails(sigin){
	var type=sigin;
	var dataParams={sign:sigin};
	UTIL.axs(UTIL.CONFIG.AfindBGDetails,dataParams,true,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				var bdData=result.bdData;//标的方的数据
				var shellData=result.shellData;//卖方
				var buyData=result.buyData;//买方
				if(bdData!=null && bdData!="" && bdData!=undefined){
					var html='';
					$(bdData).each(function(index,item){
						html+='<tr>';
						if(item.bdfName=="" || item.bdfName==null || item.bdfName==undefined){
							html+='<td class="textLe">--</td>';
						}else{
							if(item.stockName.length>15){
								html+='<td class="textLe" title="'+item.bdfName+'" style="cursor: pointer;">'+item.bdfName.substring(0,14)+'...</td>';
								
							}else{
								html+='<td class="textLe">'+item.bdfName+'</td>';
							}
						}
			          	html+='<td class="textLe">'+isStrKong(item.plrelaObj)+'</td>';
			          	html+='<td class="textRi">'+isSZKong(item.objType)+'</td>';
			          	html+='</tr>';
					})
					$("#bdData").html(html);
				}else{
					var shellTr="<tr><td colspan='3'>暂无数据</td></tr>";
					$("#bdData").html(shellTr);
				}
				if(shellData!=null && shellData!="" && shellData!=undefined){
					var html='';
					$(shellData).each(function(index,item){
						html+='<tr>';
						if(item.nameSell=="" || item.nameSell==null || item.nameSell==undefined){
							html+='<td class="textLe">--</td>';
						}else{
							if(item.nameSell.length>15){
								html+='<td class="textLe" title="'+item.nameSell+'" style="cursor: pointer;">'+item.nameSell.substring(0,14)+'...</td>';
								
							}else{
								html+='<td class="textLe">'+item.nameSell+'</td>';
							}
						}
			          	
			          	html+='<td class="textLe">'+isStrKong(item.orgformSell)+'</td>';
			          	html+='<td class="shuzi">'+isSZKong(item.tradeAmount)+'</td>';
			          	html+='<td class="shuzi">'+isSZKong(item.holdnum2Sell)+'</td>';
			          	html+='<td class="textRi">'+isSZKong(item.holdper2Sell)+'</td>';
			          	html+='</tr>';
					})
					$("#shellData").html(html);
				}else{
					var shellTr="<tr><td colspan='5'>暂无数据</td></tr>";
					$("#shellData").html(shellTr);
				}
				if(buyData!=null && buyData!="" && buyData!=undefined){
					var html='';
					$(buyData).each(function(index,item){
						html+='<tr>';
						if(item.nameBuy=="" || item.nameBuy==null || item.nameBuy==undefined){
							html+='<td class="textLe">--</td>';
						}else{
							if(item.nameBuy.length>15){
								html+='<td class="textLe" title="'+item.nameBuy+'" style="cursor: pointer;">'+item.nameBuy.substring(0,14)+'...</td>';								
							}else{
								html+='<td class="textLe">'+item.nameBuy+'</td>';
							}
						}
			          	
			          	html+='<td class="textLe">'+isStrKong(item.orgformBuy)+'</td>';
			          	html+='<td class="xqzdq">'+isStrKong(item.plrelaBuy)+'</td>';
			          	html+='<td class="shuzi">'+isSZKong(item.holdnum2Buy)+'</td>';
			          	html+='<td class="textRi">'+isSZKong(item.holdper2Buy)+'</td>';
			          	html+='</tr>';
					})
					$("#buyData").html(html);
				}else{
					var shellTr="<tr><td colspan='5'>暂无数据</td></tr>";
					$("#buyData").html(shellTr);
				}
			}else{
//				var nodata='<div class="noDatas noDatas-s1">暂无数据</div>';
//				$("#MajorEventsAndMergers").append(nodata);
				var buyData="<tr><td colspan='5'>暂无数据</td></tr>";
				$("#buyData").html(buyData);
				var shellTr="<tr><td colspan='5'>暂无数据</td></tr>";
				$("#shellData").html(shellTr);
				var bdData="<tr><td colspan='3'>暂无数据</td></tr>";
				$("#bdData").html(bdData);
			}
		}
	})
}

//1.6.2 增发开始
function findZengFa(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,pageSize:10,pageNum:pageNum};
	UTIL.axs(UTIL.CONFIG.AfindZengFa, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var result = data.retData.data;
			var totalPages = data.retData.pageTotal;
			//console.log(data)
			if(result!=null && result!="" && result!=undefined){
				var otn='';
				$(result).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isStrKong(item.zfsj)+'</td><td class="shuzi">'+(isSZKong(item.sjzfsl)=="-"?"-":(UTIL.fmtNum3((item.sjzfsl).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.sjmjje)=="-"?"-":(UTIL.fmtNum3((item.sjmjje).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.zfjg)=="-"?"-":(UTIL.fmtNum3((item.zfjg).toFixed(2))))+'</td><td title="'+isStrKong(item.fxfs)+'"><em class="ycnr" style="margin:0 auto;">'+isStrKong(item.fxfs)+'</em></td><td>'+isStrKong(item.gqdjr)+'</td><td>'+isStrKong(item.zfssr)+'</td><td class="ybdqbj">'+isStrKong(item.zjdzr)+'</td></tr>';
				})
				$('#eventListZF').html(otn);
				if(totalPages==1){
					$('#gqbdZF').css('display','none')
				}
				if(type==1){
					$('#pagesZF').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findZengFa(pageNum,2);	
						}				   
					}
				});
				
			}
			}else{
				var tr="<tr><td colspan='8'>暂无数据</td></tr>"
				$('#eventListZF').html(tr)
			}
			
		}
		
		
	});
}
// 1.6.3配股开始
function findPeiGu(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,pageSize:10,pageNum:pageNum};
	UTIL.axs(UTIL.CONFIG.AfindPeiGu, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var result = data.retData.data;
			var totalPages = data.retData.pageTotal;
			if(result!=null && result!="" && result!=undefined){
				var otn='';
				$(result).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isStrKong(item.pgggr)+'</td><td class="shuzi">'+(isSZKong(item.pgjg)=="-"?"-":((item.pgjg).toFixed(2)))+'</td><td class="shuzi">'+(isSZKong(item.sjpgsl)=="-"?"-":(UTIL.fmtNum3((item.sjpgsl).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.sjmjze)=="-"?"-":(UTIL.fmtNum3((item.sjmjze).toFixed(2))))+'</td><td>'+isStrKong(item.gqdjr)+'</td><td>'+isStrKong(item.cqjzr)+'</td><td class="ybdqbj">'+isStrKong(item.pgfa)+'</td></tr>';
				})
				$('#eventListPG').html(otn);
				if(totalPages==1){
					$('#gqbdPG').css('display','none')
				}
				if(type==1){
					$('#pagesPG').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findPeiGu(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				var tr="<tr><td colspan='7'>暂无数据</td></tr>";
				$('#eventListPG').html(tr);
			}
		}
		
	});
}
//1.6.4 分红
function findFenHong(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,pageSize:10,pageNum:pageNum};
	UTIL.axs(UTIL.CONFIG.AfindFenHong, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var datas = data.retData.data;
			var totalPages=data.retData.pageTotal;
			if(datas!=null &&　datas!="" && datas!=undefined){
				var otn='';
				$(datas).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isStrKong(item.ggrq)+'</td><td>'+isStrKong(item.fhfa)+'</td><td>'+isStrKong(item.gqdjr)+'</td><td>'+isStrKong(item.cqcxr)+'</td><td>'+isStrKong(item.pxr)+'</td><td class="ybdqbj">'+isStrKong(item.fajd)+'</td></tr>';
					// console.log(otn)
				})
				$('#eventListFH').html(otn);
				if(totalPages==1){
					$('#gqbdFH').css('display','none')
				}
				if(type==1){
					$('#pagesFH').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findFenHong(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				var tr="<tr><td colspan='6'>暂无数据</td></tr>";
				$('#eventListFH').html(tr);
			}
		}
	});
}
//1.6.5 股权变动公告
var totalPages,pagesize = 10;
var pageNum=1;
function findGuQuanBianDong(pageSize, pageNum,type){
	var dataY = {stockCode:stockCode,pageSize:10,pageNum:pageNum};	
	UTIL.axs(UTIL.CONFIG.AfindGuQuanBianDong, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var datas = data.retData;
			if(datas!=null &&　datas!="" && datas!=undefined){
				totalPages=datas.pageTotal;				
				if(datas.data!=null &&　datas.data!="" && datas.data!=undefined){
					var otn='';
					$(datas.data).each(function(index,item){
						otn+='<tr>';
						otn+='<td class="zbdq">'+isStrKong(item.dignitaryName)+'</td>';
						otn+='<td class="ybdq">'+UTIL.fmtNum3(isSZKong(item.sharesMsg))+'</td>';
						otn+='<td class="ybdq">'+UTIL.fmtNum3(isSZKong(item.sharesNumber))+'</td>';
						otn+='<td >'+isStrKong(item.shareDate)+'</td>';
						otn+='<td class="fd">'+isStrKong(item.changerName)+'</td>';
						otn+='<td class="ybdq rd">'+isStrKong(item.relationShip)+'</td>';
						otn+='</tr>';
					})
					$('#eventListDJG').html(otn);
					if(totalPages==1){
						$('#gqbdDJ').css('display','none')
					}

					if(type==1){
						$('#pages').jqPaginator({
					    totalPages: totalPages,
					    totalCounts: data.retData.total,
					    //visiblePages: 5,//总共显示多少页
					    pageSize:10,
					     first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
		                prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
		                next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
		                last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
		                page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					    currentPage: pageNum,
					    onPageChange: function (pageNum) {
					    	if(type==1){
					    		type=2
					    	}else{
					    		findGuQuanBianDong(10,pageNum,2);	
					    	}
					       						       
					    }
					});
					}
					
					
				}else{
					var tr="<tr><td colspan='6'>暂无数据</td></tr>";
					$('#eventListDJG').html(tr);
				}
				
				
				
			}
		}
		
	});
}


//1.6.6 停复牌
function findTingFuPai(){
	var dataY = {stockCode:stockCode}
	UTIL.axs(UTIL.CONFIG.AfindTingFuPai, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var datas = data.retData;
			if(datas!=null &&　datas!="" && datas!=undefined){
				var otn='';
				$(datas).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isStrKong(item.suspendreason)+'</td><td>'+isStrKong(item.suspendsdate)+'</td><td class="ybdqbj">'+isStrKong(item.suspendedate)+'</td></tr>';
				})
				$('#eventListTFP').html(otn)
			}else{
				var tr="<tr><td colspan='3'>暂无数据</td></tr>";
				$('#eventListTFP').html(tr);
			}
		}
		
	});
}
//1.6.7员工持股计划完成公告
function findYuanGongChiGu(){
	var dataY = {stockCode:stockCode}
	UTIL.axs(UTIL.CONFIG.AfindYuanGongChiGu, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var datas = data.retData;
			// console.log(datas)
			if(datas!=null &&　datas!="" && datas!=undefined){
				var otn='';
				$(datas).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isStrKong(item.zxggr)+'</td><td class="shuzi">'+(isSZKong(item.gmzje)=="-"?"-":(UTIL.fmtNum3((item.gmzje).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.gmjjqfq)=="-"?"-":(UTIL.fmtNum3((item.gmjjqfq).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.sjcgsl)=="-"?"-":(UTIL.fmtNum3((item.sjcgsl).toFixed(2))))+'</td><td class="ybdqbj">'+(isSZKong(item.sjcgbl)=="-"?"-":((item.sjcgbl).toFixed(2)))+'</td></tr>';
				})
				$('#eventListYGCG').html(otn);
			}
			else{
				var tr="<tr><td colspan='5'>暂无数据</td></tr>";
				$('#eventListYGCG').html(tr);
			}
		}

	});
}
//1.6.8债券发行公告
//1.6.8.1标准公告
function findZhaiJuanFaXingBZ(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
		var dataY = {stockCode:stockCode,categoryLt:1,category:1,pageSize:10,pageNum:pageNum}
		UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, true, function (data) {

			if(data.retCode=="0000"){
				var otn='';
				var _data = data.retData.data;
				var totalPages=data.retData.pageTotal;
				if(_data!=null &&　_data!="" && _data!=undefined){
					$(_data).each(function(index,item){
						// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						// console.log(otn)
						if(item.attType=="pdf"){
							otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
							otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="xlsx"){
							otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="jpg"){
							otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="ppt"||item.attType=="pptx"){
							otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="rar"){
							otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						

					})
					$('#BZGG').html(otn)
					if(totalPages==1){
						$('#gqbdHZ').css('display','none')
					}
					if(type==1){
						$('#pagesBZGG').jqPaginator({
						totalPages: totalPages,
						totalCounts: data.retData.total,
						//visiblePages: 5,//总共显示多少页
						pageSize:10,
						 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
						prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
						next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
						last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
						page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
						currentPage: pageNum,
						onPageChange: function (pageNum) {
							if(type==1){
								type=2;
							}else{
								findZhaiJuanFaXingBZ(pageNum,2);	
							}				   
						}
					});
					}
				}else{
					// console.log('1')
					var tr="<p>暂无数据</p>";
					$('#BZGG').html(tr);
				}
			}
			
		});
	
	
}
//1.6.8.2募集公告
function findZhaiJuanFaXingMJ(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,categoryLt:2,category:1,pageSize:10,pageNum:pageNum}
	UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, true, function (data) {
		// console.log(data)
		if(data.retCode=="0000"){
			var otn='';
			var _data = data.retData.data;
			var totalPages=data.retData.pageTotal;
			if(_data!=null &&　_data!="" && _data!=undefined){
				$(_data).each(function(index,item){
					// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					// console.log(otn)
					if(item.attType=="pdf"){
						otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
						otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="xlsx"){
						otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="jpg"){
						otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="ppt"||item.attType=="pptx"){
						otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="rar"){
						otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
				})
				$('#MJGG').html(otn)
				if(totalPages==1){
					$('#gqbdMJGG').css('display','none')
				}
				if(type==1){
					$('#pagesMJGG').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findZhaiJuanFaXingMJ(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				// console.log('2')
				var tr="<p>暂无数据</p>";
				$('#MJGG').html(tr);
			}
			
		}
		
	});
}
//1.6.8.3结果公告
function findZhaiJuanFaXingJG(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,categoryLt:3,category:1,pageSize:10,pageNum:pageNum}
	UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, true, function (data) {
		// console.log(data)
		if(data.retCode=="0000"){
			var _data = data.retData.data;
			var totalPages=data.retData.pageTotal;
			var otn='';
			if(_data!=null &&　_data!="" && _data!=undefined){
				$(_data).each(function(index,item){
					// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					// console.log(otn)
					if(item.attType=="pdf"){
						otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
						otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="xlsx"){
						otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="jpg"){
						otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="ppt"||item.attType=="pptx"){
						otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="rar"){
						otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
				})
				$('#JGGG').html(otn)
				if(totalPages==1){
					$('#pagesJGGG').css('display','none')
				}
				if(type==1){
					$('#pagesJGGG').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findZhaiJuanFaXingJG(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				// console.log('3')
				var tr="<p>暂无数据</p>";
				$('#JGGG').html(tr);
			}
			
		}
		
	});
}
//1.6.8.4其他公告
function findZhaiJuanFaXingQT(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,categoryLt:4,category:1,pageSize:10,pageNum:pageNum}
	UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, false, function (data) {
		if(data.retCode=="0000"){
			var _data = data.retData.data;
			var totalPages=data.retData.pageTotal;
			var otn='';
			if(_data!=null &&　_data!="" && _data!=undefined){
				$(_data).each(function(index,item){
					// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					if(item.attType=="pdf"){
						otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
						otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="xlsx"){
						otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="jpg"){
						otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="ppt"||item.attType=="pptx"){
						otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="rar"){
						otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
				})
				$('#QTGG').html(otn)
				if(totalPages==1){
					$('#gqbdQTGG').css('display','none')
				}
				if(type==1){
					$('#pagesQTGG').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findZhaiJuanFaXingQT(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				// console.log('4')
				var tr="<p>暂无数据</p>";
				$('#QTGG').html(tr);
			}
			
		
		}
		
	});
}
//公告切换
function TabQieHuan(){
	$('#bz').on('click',function(){
		$('#BZGG').css('display','block').siblings('ul').css('display','none');
		findZhaiJuanFaXingBZ();
	})
	$('#mj').on('click',function(){
		$('#MJGG').css('display','block').siblings('ul').css('display','none');
		findZhaiJuanFaXingMJ();
	})
	$('#jg').on('click',function(){
		$('#JGGG').css('display','block').siblings('ul').css('display','none');
		findZhaiJuanFaXingJG();
	})
	$('#qt').on('click',function(){
		$('#QTGG').css('display','block').siblings('ul').css('display','none');
		findZhaiJuanFaXingQT();
	})
}
//1.6.9特别处理
function findZhaiJuanFaXingTB(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,category:2,pageSize:10,pageNum:pageNum};
	UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var _data = data.retData.data;
			var totalPages=data.retData.pageTotal;
			if(_data!=null &&　_data!="" && _data!=undefined){
				var otn='';
				$(_data).each(function(index,item){
					// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					if(item.attType=="pdf"){
						otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
						otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="xlsx"){
						otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="jpg"){
						otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="ppt"||item.attType=="pptx"){
						otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="rar"){
						otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
				})
				$('#tbcl').html(otn);
				if(totalPages==1){
					$('#gqbdTB').css('display','none')
				}
				if(type==1){
					$('#pagesTBCL').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findZhaiJuanFaXingTB(pageNum,2);	
						}				   
					}
				});
				}
			}else {
				var p='<p>暂无数据</p>';
				$('#tbcl').html(p);
			}
			
		}

		
	});
}
//1.6.10监管问询
function findZhaiJuanFaXingJGWX(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,category:3,pageSize:10,pageNum:pageNum}
	UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var _data = data.retData.data;
			var totalPages=data.retData.pageTotal;
			var otn='';
			if(_data!=null &&　_data!="" && _data!=undefined){
				$(_data).each(function(index,item){
					//console.log(item)
					// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					// console.log(otn)
					if(item.attType=="pdf"){
						otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
						otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="xlsx"){
						otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="jpg"){
						otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="ppt"||item.attType=="pptx"){
						otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
					if(item.attType=="rar"){
						otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
					}
				})
				$('#jgwx').html(otn)
				if(totalPages==1){
					$('#gqbdJG').css('display','none')
				}
				if(type==1){
					$('#pagesJGWX').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findZhaiJuanFaXingJGWX(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				var tr="<p>暂无数据</p>";
				$('#jgwx').html(tr);
			}
			
		}
	});
	
}
//1.6.11对外投资
function findDuiWaiTouZi(pageNum,type){
	$(".dwtznr").addClass("dwtz");
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,pageSize:10,pageNum:pageNum}
	UTIL.axs(UTIL.CONFIG.AfindDuiWaiTouZi, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var otn='';
			var _data = data.retData.data;
			// console.log(_data)
			var totalPages=data.retData.pageTotal;
			if(_data!=null &&　_data!="" && _data!=undefined){
				$(_data).each(function(index,item){
					otn+='<tr><td class="zbdq" title="'+isSZKong(item.name)+'"><em class="ycnr">'+isSZKong(item.name)+'</em></td><td title="'+isSZKong(item.legalPersonName)+'"><em class="ycnr">'+isSZKong(item.legalPersonName)+'</em></td>';
					 if(item.regCapital!="" && item.regCapital!=null && item.regCapital!=undefined){
					 otn+='<td  class="shuzi">'+item.regCapital+'</td>';
					 }else{
					 otn+='<td  class="shuzi">--</td>';
					 }
					
					otn+='<td class="shuzi">'+UTIL.fmtNum3(((isSZKong(item.amount)*10000).toFixed(2)))+'</td><td>'+isSZKong(item.percent)+'</td><td  class="shuzi">'+isSZKong(item.estiblishTime)+'</td><td class="ybdqbj">'+isSZKong(item.regStatus)+'</td></tr>';
					// console.log(otn)
				})
				$('#eventListDWTZ').html(otn)
				if(totalPages==1){
					$('#gqbdDW').css('display','none');
					$(".dwtznr").removeClass("dwtz");
				}
				if(type==1){
					$('#pagesDWTZ').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.retData.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findDuiWaiTouZi(pageNum,2);	
						}				   
					}
				});
				}
			}else{
				$(".dwtznr").removeClass("dwtz");
				var tr="<tr><td colspan='6'>暂无数据</td></tr>";
				$('#eventListDWTZ').html(tr);
			}
			
		}
	});
}
//1.6.12解禁预告
function findJieJinYuGao(){
	var dataY = {stockCode:stockCode}
	UTIL.axs(UTIL.CONFIG.AfindJieJinYuGao, dataY, true, function (data) {
		// console.log(data)
		if(data.retCode=="0000"){
			var otn='';
			var data = data.retData;
			if(data!=null &&　data!="" && data!=undefined){
				$(data).each(function(index,item){
					otn+='<tr><td class="zbdq">'+isSZKong(item.jjsj)+'</td><td class="shuzi">'+(isSZKong(item.jjsl)=="-"?"-":(UTIL.fmtNum3((item.jjsl))))+'</td><td  class="shuzi">'+(isSZKong(item.zgbzb)=="-"?"-":((item.zgbzb).toFixed(2)))+'</td><td class="ybdqbj"><span class="chakan" data-id="'+item.xxgjjsjbId+'">解禁明细</span></td></tr>';
					// console.log(otn)
					// 预告里没   股票类型  多一个外键  外键写到股票类型的位置了
				})
				$('#eventListJJYG').html(otn)
			}else{
				var tr="<tr><td colspan='4'>暂无数据</td></tr>";
				$('#eventListJJYG').html(tr);
			}
		}
	});
}

//解禁详情
function AfindDetailbyId(id){
	var id={id:id};
	UTIL.axs(UTIL.CONFIG.AfindDetailbyId,id,false,function(data){
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				var tr='';
				$(result).each(function(index,item){
					tr+='<tr>';
          			tr+='<td class="zbdqbj">'+item.gdmc+'</td>';
          			tr+='<td class="shuzi">'+UTIL.fmtNum3(item.bcjjgfsl)+'</td>';
          			tr+='<td class="ybnbj">'+UTIL.fmtNum3(item.syyxsgfsl)+'</td>';
          			tr+='</tr>';
				})
				$("#jjgdList").html(tr);
			}else{
				var tr='<tr><td colspan="4">暂无数据</td></tr>';
				$("#jjgdList").html(tr);
			}
		}
	})
}


// A股重大事件结束
//第二章
/*查询行业介绍
 * 
 */
function AfindIndustryReMark(){
	UTIL.axs(UTIL.CONFIG.AfindIndustryReMark,{stockCode:stockCode},true,function(data){
		// console.log(data)
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				$("#industryRemark").html(data.retData);
			}else{
				var div='<div class="noDatas noDatas-s1">暂无数据</div>';
				$("#industryRemark").html(div);
			}		
		}
	})
}
//第三章
//3.1.1主要产品服务
function ZhuYaoChanPinFuWu(){
	var dataY = {stockCode:stockCode};
	UTIL.axs(UTIL.CONFIG.AfindZhuYaoChanPinFuWu, dataY, true, function (data) {
		if(data.retCode == "0000"){
				var data = data.retData;
				// console.log(data)
				var otn='';
				$("#mainbusiness").html('');
				if( data==null ||  data=="" ||  data==undefined){
						var trHtml='暂无数据';
						$("#mainbusiness").text(trHtml);
					}else{
						$(data).each(function(index,item){
							otn+=isSZKong(item.majorProductsDuties);
							// console.log(otn)
						})
						$('#mainbusiness').text(otn)
					}
			}
		});	
}
//3.1.2主营业务收入
function ZhuYingYeWuShouRu(){
	var dataY = {stockCode:stockCode};
	UTIL.axs(UTIL.CONFIG.AfindZhuYingYeWuShouRu, dataY, true, function (data) {
		if(data.retCode == "0000"){
				var data=data.retData;
				// console.log(data)
				var DataLenght=data.date.length;
				if( data==null ||  data=="" ||  data==undefined){
						var trHtml='';
						var thHtml='';
						trHtml+='<tr><th class"zbdq">项目</th></tr>';
						thHtml+='<tr><td colspan="1">暂无数据</td></tr>';
						$("ywsrbt").html(trHtml);
					}else{
						if(DataLenght==1){
							// console.log("1")
							var otn='';
							var ott='';
							var BiaoTou=data.date;
							var Shuju=data.data;
							// console.log(BiaoTou)
							// console.log(Shuju)
							$(BiaoTou).each(function(index,item){
								// console.log(item)
								
								// console.log(otn)
							})
							otn+='<tr><th class="zbdq">项目</th><th>'+BiaoTou[0]+'</th></tr>';
							$(Shuju).each(function(index,item){
								ott+='<tr>'+
										'<td  class="shuzi">'+item.project+'</td> '+
										'<td  class="shuzi">'+(isSZKong(item.newMoney)=="-"?"-":(UTIL.fmtNum3((item.newMoney))))+'</td> '+
									' </tr>';
								// console.log(otn)
							})
							$('#ywsrbt').html(otn);
							$('#businessTBody').html(ott);
						}
						if(DataLenght==2){
							// console.log("1")
							var otn='';
							var ott='';
							var BiaoTou=data.date;
							var Shuju=data.data;
							// console.log(BiaoTou)
							// console.log(Shuju)
							$(BiaoTou).each(function(index,item){
								// console.log(item)
								
								// console.log(otn)
							})
							otn+='<tr><th class="zbdq">项目</th><th  class="shuzi">'+BiaoTou[0]+'</th><th class="shuzi">'+BiaoTou[1]+'</th><th class="shuzi">变化</th><th class="ybdqbj">增长率（%）</th></tr>';
							$(Shuju).each(function(index,item){
								ott+='<tr>'+
										'<td class="zbdq">'+item.project+'</td> '+
										'<td class="shuzi">'+(isSZKong(item.newMoney)=="-"?"-":(UTIL.fmtNum3(((item.newMoney)/10000).toFixed(2))))+'</td> '+
										'<td class="shuzi">'+(isSZKong(item.oldMoney)=="-"?"-":(UTIL.fmtNum3(((item.oldMoney)/10000).toFixed(2))))+'</td> '+
										'<td class="shuzi">'+(isSZKong(item.changeMoney)=="-"?"-":(UTIL.fmtNum3(((item.changeMoney)/10000).toFixed(2))))+'</td> '+
										'<td class="shuzi ybnbj">'+(isSZKong(item.changeMoneyLv)=="-"?"-":(UTIL.fmtNum3((item.changeMoneyLv).toFixed(2))))+'</td> '+
									' </tr>';
								// console.log(otn)
							})
							$('#ywsrbt').html(otn);
							$('#businessTBody').html(ott);
						}
				
					
				}
			}
		});	
}
//3.3 1供应商
function findGongYingShang(){
	var dataY = {stockCode:stockCode}
	UTIL.axs(UTIL.CONFIG.AfindGongYingShang, dataY, true, function (data) {
		if(data.retCode == "0000"){
			var data = data.retData;
			// console.log(data)
			var otn='';
			$("#GYS").html('');
			if( data==null ||  data=="" ||  data==undefined){
					var trHtml='<tr><td colspan="4">暂无数据</td></tr>';
					$("#GYS").html(trHtml);
				}else{
					$(data).each(function(index,item){
						otn+='<tr><td class="zbdq">'+isSZKong(item.ranking)+'</td><td>'+isSZKong(item.suppliersName)+'</td><td class="shuzi ">'+(isSZKong(item.purchaseAmount)=="-"?"-":(UTIL.fmtNum3((item.purchaseAmount).toFixed(2))))+'</td><td class="shuzi ybnbj">'+(isSZKong(item.percentagePurchase)=="-"?"-":(UTIL.fmtNum3((item.percentagePurchase).toFixed(2))))+'</td></tr>';
						// console.log(otn)
					})
					$('#GYS').html(otn)
				}
		}
		
	});
}
//3.3 2客户
function findKeHu(){
	var dataY = {stockCode:stockCode}
	UTIL.axs(UTIL.CONFIG.AfindKeHu, dataY, true, function (data) {
		if(data.retCode == "0000"){
			var data = data.retData;
			// console.log(data)
			var otn='';
			$("#KeHu").html('');
				if( data==null ||  data=="" ||  data==undefined){
					var trHtml='<tr><td colspan="4">暂无数据</td></tr>';
					$("#KeHu").html(trHtml);
				}else{
					$(data).each(function(index,item){
						otn+='<tr><td class="zbdq">'+isSZKong(item.ranking)+'</td><td>'+isSZKong(item.customerName)+'</td><td class="shuzi ">'+(isSZKong(item.salesAmount)=="-"?"-":(UTIL.fmtNum3((item.salesAmount).toFixed(2))))+'</td><td class="shuzi ybnbj">'+(isSZKong(item.operatingIncome)=="-"?"-":(UTIL.fmtNum3((item.operatingIncome).toFixed(2))))+'</td></tr>';
						// console.log(otn)
					})
					$('#KeHu').html(otn)
				}
		}
		
	});
}
// 3.4投资者关系活动记录
function findTouZiZheGX(pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var dataY = {stockCode:stockCode,category:4,pageSize:10,pageNum:pageNum}
	// console.log(dataY)
	UTIL.axs(UTIL.CONFIG.AfindZhaiJuanFaXing, dataY, true, function (data) {
		
		if(data.retCode=="0000"){
			var otn='';
			var _data = data.retData;
			var ssjj =_data.data;
			// console.log(data)
			if(ssjj!=null && ssjj!="" && ssjj!=undefined){
				totalPages=_data.pageTotal;
				if( ssjj!="" && ssjj!=null && ssjj!=undefined){
					// console.log('1')
					$(ssjj).each(function(index,item){
						// console.log(item.attType)
						if(item.attType=="pdf"){
							otn+="<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="doc"||item.attType=="docm"||item.attType=="docx"){
							otn+="<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="xlsx"){
							otn+="<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="jpg"){
							otn+="<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="ppt"||item.attType=="pptx"){
							otn+="<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
						if(item.attType=="rar"){
							otn+="<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						}
							// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						// console.log(otn)
					})
					$('#tzzgx').html(otn)
					if(totalPages==1){
						$('#tzzGX').css('display','none')
					}
					if(type==1){
						$('#pagesFlss').jqPaginator({
							totalPages: totalPages,
							totalCounts: data.retData.total,
							//visiblePages: 5,//总共显示多少页
							pageSize:10,
							first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
							prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
							next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
							last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
							page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
							currentPage: pageNum,
							onPageChange: function (pageNum) {
								if(type==1){
									type=2;
								}else{
									findTouZiZheGX(pageNum,2);	
								}				   
							}
						});
					}
				}

			}else{
					// console.log('2')
					var tr='<div class="noDatas noDatas-s1">暂无数据</div>';
					$('#tzzgx').html(tr);
				}
			
			
		}
		
	});
}
//3.5.1 主要竞争对手市场表现
function findDuiShouShiChang(){
	var dataY = {stockCode:stockCode};
	
	UTIL.axs(UTIL.CONFIG.AfindJingZhengDuiShou, dataY, true, function (data) {
		if(data.retCode=="0000"){
			var data =data.retData;
			var otn ='';
			var ttn='';
			$("#sicDNTBody").html('');
			$("#dscwqk").html('');

			if( data==null ||  data=="" ||  data==undefined){
					var trHtml='<tr><td colspan="5">暂无数据</td></tr>';
					var ttHtml='<tr><td colspan="6">暂无数据</td></tr>'
					$("#sicDNTBody").html(trHtml);
					$('#dscwqk').html(ttHtml);
				}else{
					$(data).each(function(index,item){
						//console.log(item.stockCode)
						if(stockCode==item.stockCode){
							otn+='<tr><td class="zbdq"><span data-code="'+item.stockCode+'" data-name="'+item.stockName+'" style="cursor: pointer;" class="zyjzds">'+isStrKong(item.stockName)+'</span></td><td class="shuzi">'+(isSZKong(item.gj)=="-"?"-":(UTIL.fmtNum3((item.gj).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.sz)=="-"?"-":(UTIL.fmtNum3((item.sz).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.pe)=="-"?"-":isSZKong(item.pe) < 0 ? '-':(UTIL.fmtNum3((item.pe).toFixed(2))))+'</td><td class="shuzi ybdqbj">'+(isSZKong(item.pb)=="-"?"-":(UTIL.fmtNum3((item.pb).toFixed(2))))+'</td></tr>';
							ttn+='<tr><td class="zbdq"><span data-code="'+item.stockCode+'" data-name="'+item.stockName+'" style="cursor: pointer;" class="zyjzds">'+isStrKong(item.stockName)+'</span></td><td class="shuzi">'+(isSZKong(item.yysr)=="-"?"-":(UTIL.fmtNum3((item.yysr).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.jlr)=="-"?"-":(UTIL.fmtNum3((item.jlr).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.zczj)=="-"?"-":(UTIL.fmtNum3((item.zczj).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.eps)=="-"?"-":(UTIL.fmtNum3((item.eps).toFixed(2))))+'</td><td class="shuzi ybnbj">'+(isSZKong(item.roe)=="-"?"-":(UTIL.fmtNum3((item.roe).toFixed(2))))+'</td></tr>';
						}else{
							otn+='<tr><td class="zbdq"><span data-code="'+item.stockCode+'" data-name="'+item.stockName+'" style="cursor: pointer;" class="chakan zyjzds">'+isStrKong(item.stockName)+'</span></td><td class="shuzi">'+(isSZKong(item.gj)=="-"?"-":(UTIL.fmtNum3((item.gj).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.sz)=="-"?"-":(UTIL.fmtNum3((item.sz).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.pe)=="-"?"-":isSZKong(item.pe) < 0 ? '-':(UTIL.fmtNum3((item.pe).toFixed(2))))+'</td><td class="shuzi ybdqbj">'+(isSZKong(item.pb)=="-"?"-":(UTIL.fmtNum3((item.pb).toFixed(2))))+'</td></tr>';
							ttn+='<tr><td class="zbdq"><span data-code="'+item.stockCode+'" data-name="'+item.stockName+'" style="cursor: pointer;" class="chakan zyjzds">'+isStrKong(item.stockName)+'</span></td><td class="shuzi">'+(isSZKong(item.yysr)=="-"?"-":(UTIL.fmtNum3((item.yysr).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.jlr)=="-"?"-":(UTIL.fmtNum3((item.jlr).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.zczj)=="-"?"-":(UTIL.fmtNum3((item.zczj).toFixed(2))))+'</td><td class="shuzi">'+(isSZKong(item.eps)=="-"?"-":(UTIL.fmtNum3((item.eps).toFixed(2))))+'</td><td class="shuzi ybnbj">'+(isSZKong(item.roe)=="-"?"-":(UTIL.fmtNum3((item.roe).toFixed(2))))+'</td></tr>';
						}
						
						// (isSZKong(item.sharesNumber) == "-" ? "--" : (((item.sharesNumber / 10000).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharesNumber / 10000).toFixed(2))))
					})
					$('#sicDNTBody').html(otn);
					$('#dscwqk').html(ttn);
				}
		}
	});
}

function tiaozhuan(){
	$(".AguTable").on("click",".zyjzds",function(){
		var Codes=$(this).attr("data-code");
		var Name=$(this).attr("data-name");
		if(stockCode!=Codes){
			window.open("./coverA.html?stockCode=" + Codes + "&stockName=" + Name);
		}
	})
	
}
//第四章
/**
 * 杜邦分析
 */
function AfindDubangData() {
	//默认隐藏掉
	$(".yincang_1").hide();
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findDubangData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindDubangData, paramData, true, function (result) {
		var _data = result.retData;
		//console.log(_data);
		//净资产收益率
		//		$("#JingZiChanShouYiLv_dubang").text(_data.JingZiChanShouYiLv==null?"--":(_data.JingZiChanShouYiLv).toFixed(2)+"%");
		//		$("#ZongZiChanShouYiLv_dubang").text(_data.ZongZiChanShouYiLv==null?"--":(_data.ZongZiChanShouYiLv).toFixed(2)+"%");
		$("#QuanYiChengShu_dubang").text(_data.QuanYiChengShu == null ? "--" : UTIL.fmtNum3((_data.QuanYiChengShu).toFixed(2)));
		//营收利润率
		var XiaoShouJingLiRunLv=((_data.f2JLR)/(_data.f2QZYYSR))*100;
		$("#XiaoShouJingLiRunLv_dubang").text(XiaoShouJingLiRunLv == null ? "--" : UTIL.fmtNum3((XiaoShouJingLiRunLv).toFixed(2)) + "%");
		//$("#XiaoShouJingLiRunLv_dubang").text(_data.XiaoShouJingLiRunLv == null ? "--" : UTIL.fmtNum3((_data.XiaoShouJingLiRunLv).toFixed(2)) + "%");
		//		$("#ZongZiChanZhouZhuanLv_dubang").text(_data.ZongZiChanZhouZhuanLv==null?"--":(_data.ZongZiChanZhouZhuanLv).toFixed(2));
		$("#f2JLR_dubang").text(_data.f2JLR == null ? "--" : UTIL.fmtNum3((_data.f2JLR / 10000.00).toFixed(2)));
		$("#f2YYZSR_dubang_1").text(_data.f2QZYYSR == null ? "--" : UTIL.fmtNum3((_data.f2QZYYSR / 10000.00).toFixed(2)));
		$("#f2YYZSR_dubang_2").text(_data.f2QZYYSR == null ? "--" : UTIL.fmtNum3((_data.f2QZYYSR / 10000.00).toFixed(2)));
		$("#f1ZCZJ_dubang").text(_data.f1ZCZJ == null ? "--" : UTIL.fmtNum3((_data.f1ZCZJ / 10000.00).toFixed(2)));
		//上面的数据需要重新计算
		var ZongZiChanZhouZhuanLv=(_data.f2QZYYSR==null?0:(_data.f2QZYYSR/10000.00))/(_data.f1ZCZJ==null?0:(_data.f1ZCZJ/10000.00));
		$("#ZongZiChanZhouZhuanLv_dubang").text(UTIL.fmtNum3(ZongZiChanZhouZhuanLv.toFixed(2)));
		var ZongZiChanShouYiLv=(XiaoShouJingLiRunLv==null?0:(XiaoShouJingLiRunLv))*ZongZiChanZhouZhuanLv
		$("#ZongZiChanShouYiLv_dubang").text(UTIL.fmtNum3(ZongZiChanShouYiLv.toFixed(2))+"%");
		var JingZiChanShouYiLv=ZongZiChanShouYiLv*(_data.QuanYiChengShu==null?0:(_data.QuanYiChengShu));
		$("#JingZiChanShouYiLv_dubang").text(UTIL.fmtNum3(JingZiChanShouYiLv.toFixed(2))+"%");
		//新增下面层级：如果不是一般类公司不显示下面的成绩
		if (_data.companyType == 1 || _data.companyType == "1") {
			$(".yincang_1").show();
			//净利润下面的数据
			$("#f2YYZSR_dubang_3").text(_data.f2QZYYSR == null ? "--" : UTIL.fmtNum3((_data.f2QZYYSR / 10000.00).toFixed(2)));
			//需要计算:营业成本	＋	销售费用 ＋	管理费用 ＋	财务费用 ＋	营业税金及附加	＋	资产减值损失
			var f2CBFY=(_data.f2QZYYCB==null?0:(_data.f2QZYYCB/10000.00))+
						(_data.f2XSFY==null?0:(_data.f2XSFY/10000.00))+
						(_data.f2GLFY==null?0:(_data.f2GLFY/10000.00))+
						(_data.f2CWFY==null?0:(_data.f2CWFY/10000.00))+
						(_data.f2YYSJJFJ==null?0:(_data.f2YYSJJFJ/10000.00))+
						(_data.f2ZCJZSS==null?0:(_data.f2ZCJZSS/10000.00));
			$("#f2CBFY_dubang").text(UTIL.fmtNum3(f2CBFY.toFixed(2)));
			$("#f2TZSY_dubang").text(_data.f2TZSY == null ? "--" : UTIL.fmtNum3((_data.f2TZSY / 10000.00).toFixed(2)));
			$("#f2JGYJZBDSY_dubang").text(_data.f2JGYJZBDSY == null ? "--" : UTIL.fmtNum3((_data.f2JGYJZBDSY / 10000.00).toFixed(2)));
			//需要计算:营业外收入 - 营业外支出
			var f2YWWSZJE=(_data.f2YYWSR==null?0:(_data.f2YYWSR/10000.00))-(_data.f2YYWZC==null?0:(_data.f2YYWZC/10000.00));
			$("#f2YWWSZJE_dubang").text(UTIL.fmtNum3(f2YWWSZJE.toFixed(2)));
			$("#f2JSDSFY_dubang").text(_data.f2JSDSFY == null ? "--" : UTIL.fmtNum3((_data.f2JSDSFY / 10000.00).toFixed(2)));
			//成本费用下面的数据
			$("#f2QZYYCB_dubang").text(_data.f2QZYYCB == null ? "--" : UTIL.fmtNum3((_data.f2QZYYCB / 10000.00).toFixed(2)));
			$("#f2GLFY_dubang").text(_data.f2GLFY == null ? "--" : UTIL.fmtNum3((_data.f2GLFY / 10000.00).toFixed(2)));
			$("#f2YYSJJFJ_dubang").text(_data.f2YYSJJFJ == null ? "--" : UTIL.fmtNum3((_data.f2YYSJJFJ / 10000.00).toFixed(2)));
			$("#f2XSFY_dubang_3").text(_data.f2XSFY == null ? "--" : UTIL.fmtNum3((_data.f2XSFY / 10000.00).toFixed(2)));
			$("#f2CWFY_dubang").text(_data.f2CWFY == null ? "--" : UTIL.fmtNum3((_data.f2CWFY / 10000.00).toFixed(2)));
			$("#f2ZCJZSS_dubang").text(_data.f2ZCJZSS == null ? "--" : UTIL.fmtNum3((_data.f2ZCJZSS / 10000.00).toFixed(2)));
			//总资产下面的数据
			$("#f1LDZCHJ_dubang").text(_data.f1LDZCHJ == null ? "--" : UTIL.fmtNum3((_data.f1LDZCHJ / 10000.00).toFixed(2)));
			$("#f1FLDZCHJ_dubang").text(_data.f1FLDZCHJ == null ? "--" : UTIL.fmtNum3((_data.f1FLDZCHJ / 10000.00).toFixed(2)));
			//流动资产下面的数据
			$("#f1HBZJ_dubang").text(_data.f1HBZJ == null ? "--" : UTIL.fmtNum3((_data.f1HBZJ / 10000.00).toFixed(2)));
			$("#f1YFKX_dubang").text(_data.f1YFKX == null ? "--" : UTIL.fmtNum3((_data.f1YFKX / 10000.00).toFixed(2)));
			$("#f1YSZK_dubang").text(_data.f1YSZK == null ? "--" : UTIL.fmtNum3((_data.f1YSZK / 10000.00).toFixed(2)));
			$("#f1CH_dubang").text(_data.f1CH == null ? "--" : UTIL.fmtNum3((_data.f1CH / 10000.00).toFixed(2)));
			//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货
			var f1QTLDZC=(_data.f1LDZCHJ==null?0:(_data.f1LDZCHJ/10000.00))-
							(_data.f1HBZJ==null?0:(_data.f1HBZJ/10000.00))-
							(_data.f1YFKX==null?0:(_data.f1YFKX/10000.00))-
							(_data.f1YSZK==null?0:(_data.f1YSZK/10000.00))-
							(_data.f1CH==null?0:(_data.f1CH/10000.00));
			$("#f1QTLDZC_dubang").text(UTIL.fmtNum3(f1QTLDZC.toFixed(2)));
			//非流动资产下面的数据
			//流动资产下面的数据
			$("#f1GDZC_dubang").text(_data.f1GDZC == null ? "--" : UTIL.fmtNum3((_data.f1GDZC / 10000.00).toFixed(2)));
			$("#f1WXZC_dubang").text(_data.f1WXZC == null ? "--" : UTIL.fmtNum3((_data.f1WXZC / 10000.00).toFixed(2)));
			$("#f1CQGQTZ_dubang").text(_data.f1CQGQTZ == null ? "--" : UTIL.fmtNum3((_data.f1CQGQTZ / 10000.00).toFixed(2)));
			//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货
			var f1QTFLDZC=(_data.f1FLDZCHJ==null?0:(_data.f1FLDZCHJ/10000.00))-
							(_data.f1GDZC==null?0:(_data.f1GDZC/10000.00))-
							(_data.f1WXZC==null?0:(_data.f1WXZC/10000.00))-
							(_data.f1CQGQTZ==null?0:(_data.f1CQGQTZ/10000.00));

			$("#f1QTFLDZC_dubang").text(UTIL.fmtNum3(f1QTFLDZC.toFixed(2)));
		}
		UTIL.sjly("#dbfxfly", "dbfxf", ".dbfxf", "sjlyy");
		//		$("#f2JLR_dubang").text(_data.f2JLR==null?"--":(_data.f2JLR).toFixed(2)+"");
		//		$("#f2YYZSR_dubang_1").text(_data.f2YYZSR==null?"--":(_data.f2YYZSR).toFixed(2)+"");
		//		$("#f2YYZSR_dubang_2").text(_data.f2YYZSR==null?"--":(_data.f2YYZSR).toFixed(2)+"");
		//		$("#f1ZCZJ_dubang").text(_data.f1ZCZJ==null?"--":(_data.f1ZCZJ).toFixed(2)+"");
		//		setScrollTos();
	});
}
/**
 * 公司盈利情况
 */
function findreportPeriod(reportPeriod){
	var reportPeriod=reportPeriod;
	var paramData = { stockCode: stockCodeParam,reportPeriod:reportPeriod };
	UTIL.axs(UTIL.CONFIG.AfindProfitData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null") {
			$("#companyProfitShuoMing").hide();
			$("#companyProfit").hide();
			$("#companyProfit").after(noDataHtml());
			return false;
		}
		var reportDate=_data.reportDate;
		if(reportDate!=null &&　reportDate!="" &&　reportDate!=undefined){
			var op='';
			$(reportDate).each(function(index,item){
				op+='<li>'+item+'</li>';
			})
			$("#cw-list").html(op);
			$("#cwTime .cw-selectedTime").html(reportDate[0]);
		}
	})
}
function AfindProfitData(reportPeriod) {
	var reportPeriod=reportPeriod;
	var paramData = { stockCode: stockCodeParam,reportPeriod:reportPeriod };
	// WF_ajax.findProfitData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindProfitData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null") {
			$("#companyProfitShuoMing").hide();
			$("#companyProfit").hide();
			$("#companyProfit").after(noDataHtml());
			return false;
		}
		UTIL.sjly( "gsylqk", ".cw1", "sjlyy");
		// UTIL.sjly("#cwsdfxly","gsyynlqk",".cw2","sjlyy");
		// UTIL.sjly("#cwsdfxly","cwsdfx",".cw3","sjlyy");
		var shuoming = "<p>截止2016-12-31，公司净利润为" + ((_data.stockValue == null || _data.stockValue == "undefined") ? "--" : (_data.stockValue / 1000000.00).toFixed(2)) + "百万，" +
			"在行业内排名" + ((_data.stockRanking == null || _data.stockRanking == "undefined") ? "--" : _data.stockRanking) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，属于行业" + ((_data.rankingName == null || _data.rankingName == "undefined") ? "--" : _data.rankingName) + "。</p>";
		$("#companyProfitShuoMing").html(shuoming);
		//控制显示的起始位置
		var startIndex = 0;
		if (_data.stockRanking > 5) {
			startIndex = Number(_data.stockRanking) / _data.financeValueArrray.length * 100 - 1;
		}
		var stockNameArrrayChart = [];
		$(_data.stockNameArrray).each(function (index, item) {
			if (item == null) {
				item = "";
			}
			stockNameArrrayChart.push(item);
		})
		//控制一屏幕显示多少条
		var endIndex = 15 / _data.financeValueArrray.length * 100;
		var width=($(".page").width()-100)*0.98;
		$("#companyProfit").css("width",width);
		var myChart = echarts.init(document.getElementById('companyProfit'));
		var option = {
			legend: {
				show: true,
				data: ['净利润'],
				//				backgroundColor:"#62a6f2",
				top: '8%'
			},
			color: ['#62a6f2'],
			xAxis: {
				show: true,
				type: 'category',
				//data:['东方证劵','东方时尚','华夏证劵','东方证劵']
				data: stockNameArrrayChart
			},
			yAxis: {
				show: true,
				name: '百万',
				type: 'value'
			},
			grid: {
				show: true,
				left: '8%',
				right: '5%',
				bottom: '30%'
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			dataZoom: {
				type: 'slider',
				show: true,
				start: '0',
				end: 20,
				bottom: '3%',
				zoomLock:true
			},
			series: [{
				type: 'bar',
				name: '净利润',
				barMaxWidth: '30',
				//data:[10,50,20,83]
				data: _data.financeValueArrray,
				//				label: {
				//	                normal: {
				//	                    show: true,
				//	                    position: "top",
				//	                    offset:[1,100],
				//	                    formatter: function(params) {
				//	                    	if(params.dataIndex<10){
				//	                    		 return "第" + (params.dataIndex+1) + "";
				//	                    	}else{
				//	                    		 return "第" + ((_data.stockRanking==null || _data.stockRanking=="undefined")?"--":_data.stockRanking) + "";
				//	                    	}
				//	                    },
				//	                    textStyle:{
				//	                    	color:"#333"
				//	                    }
				//	                }
				//	            },
				itemStyle: {
					normal: {
						color: function (params) {
							// 检索结果颜色
							if (((params.dataIndex + 1) == _data.stockRanking) || (params.dataIndex + 1) == 11) {
								return "#f3565d";
							} else {
								return "#62a6f2";
							}
						}
					},
					emphasis: {
						color: "#4a8ad3"//鼠标放到柱形图上显示的颜色
					}
				}
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}
/**
 * 公司成长情况
 */
function AfindGroupData() {
//	alert(1)
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findGroupData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindGroupData, paramData, true, function (result) {
		var _data = result.retData;
		//console.log(_data)
		if (_data == null || _data == "null") {
			$("#companyGrowUpShuoming").hide();
			$("#companyGrowUp").hide();
			$("#companyGrowUp").after(noDataHtml());
			return false;
		}
		//		console.log(_data);
		var shuoming = "<p>截止" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
			"公司的营收增长率为：" + ((_data.REVZengZhangLv_tips == null || _data.REVZengZhangLv_tips == "undefined") ? "--" : Number(_data.REVZengZhangLv_tips).toFixed(2)) + "%，" +
			"净利润增长率为" + ((_data.JingLiRunZengZhangLv_tips == null || _data.JingLiRunZengZhangLv_tips == "undefined") ? "--" : Number(_data.JingLiRunZengZhangLv_tips).toFixed(2)) + "%，" +
			"成长能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
		$("#companyGrowUpShuoming").html(shuoming);
		var width=($(".page").width()-100)*0.98;
		$("#companyGrowUp").css("width",width);
		var myChart = echarts.init(document.getElementById('companyGrowUp'));
		var option = {
			legend: {
				show: true,
				data: ['营收增长率', "净利润增长率"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '%',
				type: 'value'
			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
						dataZoom:[{
							type:'slider',
							show:true,
							start:'0',
							end:'100',
							bottom:'3%'
						}],
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			series: [{
				type: 'line',
				name: '营收增长率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.REVZengZhangLv
			},
			{
				type: 'line',
				name: '净利润增长率',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.JingLiRunZengZhangLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}
/**
 * 偿债能力
 */
function AfindPayData() {
//	alert(0)
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findPayData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindPayData, paramData, true, function (result) {
		var _data = result.retData;
				//console.log(_data);
		if (_data == null || _data == "null") {
			//alert(0)
			$("#companySinking").hide();
			$("#companySinkingShuoming").hide();
//			$("#companyProfitShuoMing").hide();
//			$("#companyProfit").hide();
			$("#companySinking").after(noDataHtml());
			return false;
		}
		var shuoming = "<p>截止" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
			"公司的流动比率为：" + ((_data.LiuDongBiLv_tips == null || _data.LiuDongBiLv_tips == "undefined") ? "--" : Number(_data.LiuDongBiLv_tips).toFixed(2)) + "，" +
			"速动比率为" + ((_data.SuDongBiLv_tips == null || _data.SuDongBiLv_tips == "undefined") ? "--" : Number(_data.SuDongBiLv_tips).toFixed(2)) + "，" +
			"偿债能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
		$("#companySinkingShuoming").html(shuoming);
		var width=($(".page").width()-100)*0.98;
		$("#companySinking").css("width",width);
		var myChart = echarts.init(document.getElementById('companySinking'));
		var option = {
			legend: {
				show: true,
				data: ['流动比率', "速动比率"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '',
				type: 'value'
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
						dataZoom:[{
							type:'slider',
							show:true,
							start:'0',
							end:'100',
							bottom:'3%'
						}],
			series: [{
				type: 'line',
				name: '流动比率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.LiuDongBiLv
			},
			{
				type: 'line',
				name: '速动比率',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.SuDongBiLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}
/**
 * 运营情况
 */
function AfindOperationData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findOperationData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindOperationData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null" || 
				(_data.CunHuoZhouZhuanLv == undefined && _data.YingShouZhangKuanZhouZhuanLv == undefined)) {
			$("#companyOperateShuoming").hide();
			$("#companyOperate").hide();
			$("#companyOperate").after(noDataHtml());
			return false;
		}
		var flag1 = false; //存货周转率是否有值
		var flag2 = false; //应收账款周转率是否有值
		$(_data.CunHuoZhouZhuanLv).each(function(i, item){
			if(item != null && item != 0){
				flag1 = true;
			}
		})
		$(_data.YingShouZhangKuanZhouZhuanLv).each(function(i, item){
			if(item != null && item != 0){
				flag2 = true;
			}
		})
		if(!flag1 && !flag2){ //都没有值隐藏
			$("#companyOperateShuoming").hide();
			$("#companyOperate").hide();
			$("#companyOperate").after(noDataHtml());
		}
		//		console.log(_data);
		//UTIL.sjly("#cwsdfxly", "gsyynlqk", ".cw2", "sjlyy");
		// UTIL.sjly("#cwsdfxly","cwsdfx",".cw3","sjlyy");
		var shuoming;
		var chts;//存货天数
		var yszk;//应收账款
		var yynl;//营运能力
		if(_data.CunHuoZhouZhuanLv==null || _data.CunHuoZhouZhuanLv=="" || _data.CunHuoZhouZhuanLv==undefined){
			chts="";
		}else{
			chts="公司的存货周转天数为" + Number(_data.CunHuoZhouZhuanLv_tips).toFixed(2) + "天，";
		}
		if(_data.YingShouZhangKuanZhouZhuanLv=="" || _data.YingShouZhangKuanZhouZhuanLv==null || _data.YingShouZhangKuanZhouZhuanLv==undefined){
			yszk="";
		}else{
			yszk="应收账款周转天数为" + (Number(_data.YingShouZhangKuanZhouZhuanLv_tips).toFixed(2)) + "天，" ;
		}
		if(_data.rankingName==null || _data.rankingName=="" || _data.rankingName==undefined){
			yynl="";
		}else{
			yynl="公司的营运能力表现" + _data.rankingName + "。</p>";
		}
		shuoming="<p>截止"+((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips)+"，" + chts + yszk + yynl;
		if(shuoming.lastIndexOf(",")>-1){
			$("#companyOperateShuoming").html(shuoming);
		}else{
			shuoming=shuoming.substring(0,shuoming.length-1);
			shuoming=shuoming+"。";
			$("#companyOperateShuoming").html(shuoming);	
		}
		
		var width=($(".page").width()-100)*0.98;
		$("#companyOperate").css("width",width);
		var myChart = echarts.init(document.getElementById('companyOperate'));
		var option = {
			legend: {
				show: true,
				data: ['存货周转天数', "应收账款周转天数"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '',
				type: 'value'
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
							dataZoom:[{
								type:'slider',
								show:true,
								start:'0',
								end:'100',
								bottom:'3%'
							}],
			series: [{
				type: 'line',
				name: '存货周转天数',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.CunHuoZhouZhuanLv
			},
			{
				type: 'line',
				name: '应收账款周转天数',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.YingShouZhangKuanZhouZhuanLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//		setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}
/**
 * 财务深度分析
 */
function AfindFinanceDepthData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findFinanceDepthData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindFinanceDepthData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null") {
			$("#companyFinancialDepthShuoming").hide();
			$("#companyFinancialDepth1").hide();
			$("#companyFinancialDepth1").after(noDataHtml());
			return false;
		}
		// UTIL.sjly("#cwsdfxly","gsyynlqk",".cw2","sjlyy");
		//UTIL.sjly("#cwsdfxly", "cwsdfx", ".cw3", "sjlyy");
		//		console.log(_data);
		var shuoming = "<p>截止"+((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips)+"，公司的利润率水平" + ((_data.M == null || _data.M == "undefined") ? "--" : _data.M) + "，资产负债结构" + ((_data.Z == null || _data.Z == "undefined") ? "--" : _data.Z) + "。</p>"
		$("#companyFinancialDepthShuoming").html(shuoming);
		var myChart = echarts.init(document.getElementById('companyFinancialDepth1'));
		var option = {
			legend: {
				show: true,
				data: ['销售毛利率', "销售净利率"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '%',
				type: 'value'
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
							dataZoom:[{
								type:'slider',
								show:true,
								start:'0',
								end:'100',
								bottom:'3%'
							}],
			series: [{
				type: 'line',
				name: '销售毛利率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.XiaoShouMaoLiLv
			},
			{
				type: 'line',
				name: '销售净利率',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.XiaoShouJingLiRunLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function () {
			myChart.resize();
		});

		var myChart_1 = echarts.init(document.getElementById('companyFinancialDepth2'));
		var option_1 = {
			legend: {
				show: true,
				data: ['资产负债率', "净资产收益率(权益报酬率)"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '%',
				type: 'value'
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
							dataZoom:[{
								type:'slider',
								show:true,
								start:'0',
								end:'100',
								bottom:'3%'
							}],
			series: [{
				type: 'line',
				name: '资产负债率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.ZiChanFuZhaiLv
			},
			{
				type: 'line',
				name: '净资产收益率(权益报酬率)',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.JingZiChanShouYiLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart_1.setOption(option_1);
		//		setScrollTos();
		window.addEventListener("resize", function () {
			myChart_1.resize();
		});
	});
}
/**
 * 查询核心数据
 */
function AfindFinanceKernelData() {
	$("#AguName").html(stockName)
	var paramData = { stockCode: stockCodeParam };
	UTIL.axs(UTIL.CONFIG.AfindFinanceKernelData, paramData, true, function (result) {
		var _data = result.retData;
		//		console.log(_data);
		if (_data == null || _data == "null") {
			return false;
		}
		$("#finance_3_1_stockName").text(_data.stockName);
		$.each(_data, function (key, item) {
						// console.log(item);
			//			console.log(item[key+"_showUnit"]);
			var value = item[key + "_value"];
			var avg = item[key + "_avg"];
			var showUnit = item[key + "_showUnit"];
			if (showUnit != null) {
				if (showUnit.indexOf("亿") > -1) {
					value = Number(value) / 100000000.00;
					avg = Number(avg) / 100000000.00;
				} else if (showUnit.indexOf("万") > -1) {
					value = Number(value) / 10000.00;
					avg = Number(avg) / 10000.00;
				}
			}
//			$("#"+key+"_value").prev().text(item[key+"_showName"]+(showUnit==null?"":"("+showUnit+")"));
			// $("#"+key+"_value").text(UTIL.fmtNum3(Number((value)/10000).toFixed(2)));
			// $("#"+key+"_avg").text(UTIL.fmtNum3(Number((avg)/10000).toFixed(2)));
			$("#"+key+"_value").text(UTIL.fmtNum3(Number(value).toFixed(2)));
			$("#"+key+"_avg").text(UTIL.fmtNum3(Number(avg).toFixed(2)));
			//市值总额  市盈率  市净率
			if($("#ShiZhiZongE_value").text()==0.00 || $("#ShiZhiZongE_value").text()=="0.00"){
				$("#ShiZhiZongE_value").text("--")
			}
			if($("#ShiYingLv_value").text()==0.00 || $("#ShiYingLv_value").text()=="0.00"){
				$("#ShiYingLv_value").text("--")
			}
			if($("#ShiJingLv_value").text()==0.00 || $("#ShiJingLv_value").text()=="0.00"){
				$("#ShiJingLv_value").text("--")
			}
		});
		UTIL.sjly("#hxcwsjly", "hxcwsj", ".hxcwsj", "sjlyy");
		//		setScrollTos();
	});
}
//点击查看
function chakan(){
	$(".look-data").on("click",function(){
		$("#BenchmarkingData").show();
		$(".marsk").show();
		$("body,html").css("overflow", "hidden");
		financeName=$(this).attr("data-name");
		fType=$(this).attr("data-type");
		if(financeName=="ZSZ"){
			$("#zhibName").html("市值总额");
		}else if(financeName=="SJL"){
			$("#zhibName").html("市净率");
		}else if(financeName=="HQSYL1"){
			$("#zhibName").html("市盈率");
		}else{
			$("#zhibName").html(financeName);
		}
		findIFinanceData();
	})
}
/*
 * 综合模型分析雷达图
 */
function AfindFinanceModelData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findFinanceModelData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.AfindFinanceModelData, paramData, true, function (result) {
		var _data = result.retData;
		//		console.log(_data);
		if (_data == null || _data == "null") {
			$("#companyModelAnalysisShuoming").hide();
			$("#companyModelAnalysis").hide();
			$("#companyModelAnalysis").after(noDataHtml());
			return false;
		}
		UTIL.sjly("#zhnlmxfxly", "zhnlmxfx", ".zhnlmxfx", "sjlyy");
		var shuoming = "<p>公司在" + ((_data.max == null || _data.max == "undefined") ? "--" : _data.max) + "方面表现突出，在" + ((_data.min == null || _data.min == "undefined") ? "--" : _data.min) + "上表现差强人意，有待加强，需要额外关注。</p>"
		$("#companyModelAnalysisShuoming").html(shuoming);
		var height=$(".company-main").height();
		// document.getElementById('companyModelAnalysis').style.width = document.getElementsByClassName('company-content')[0].offsetWidth * 0.8+ 'px';
		document.getElementById('companyModelAnalysis').style.height = height *0.7+ 'px';
		var myChart=echarts.init(document.getElementById('companyModelAnalysis'));
		var option = {
//			    title: {
//			        text: '基础雷达图'
//			    },
//			    legend: {
//			        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
//			    },
				color:["#feb535"],
				grid:{
					left:'50%',
					right:'50%'
//					bottom:'30%'
				},
			    radar: {
			        // shape: 'circle',
			        name: {
			            textStyle: {
			                color: '#5c666e',
			                // backgroundColor: '#999',
			                borderRadius: 3,
			                padding: [10, 10]
			           }
			        },
			        center: ['50%', '50%'],
			        radius: 120,
			        indicator: [
			           { name: '盈利性', max: 6},
			           { name: '安全性', max: 6},
			           { name: '利润质量', max: 6},
			           { name: '运营能力', max: 6},
			           { name: '偿债能力', max: 6},
			           { name: '成长性', max: 6}
			        ]
			    },
			    textStyle:{
			    	cololr:'#000'
			    },
			    series: [{
//			        name: '预算 vs 开销（Budget vs spending）',
			        type: 'radar',
			        symbol:'circle',
			        data : [
			            {
//			                value : [4300, 10000, 28000, 35000, 50000, 19000],
			                value : [_data.YingLiXing, _data.AnQuanXing,  _data.LiRunZiLiang, _data.YunYingNengLi,  _data.ChangZhaiNengLi, _data.ChengZhangXing]
			                //name : '预算分配（Allocated Budget）'
			            }
			        ]
			    }]
			};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}

//3.2的经营情况
/**
 * 引	用：jyqkyw.html
 * 创建日期：
 * 修	改：shiqi
 * 修改日期：20171020
 * 版	本：v2.0
 */
function AbusinessIncome() {
	var params = {
		stockCode: stockCode
	}, n = false;
	UTIL.axs(UTIL.CONFIG.AfindBusinessIncome, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;
				//WF_ajax.findBusinessIncome(params,true,function(data){
				//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f2QZYYSR; //营业收入
				var REVZengZhangLvList = result.REVZengZhangLv; //增长率
				// 使用刚指定的配置项和数据显示图表。
				var start=((result.portTime.length-4)/result.portTime.length)*100;
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["营业收入", '增长率']
					},
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: start,
						end: 100,
						bottom: '3%',
						zoomLock:true
					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '营业收入',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};
				var myChart = echarts.init(document.getElementById('businessIncome'));
				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#businessIncome").html('<div class="noDatas">暂无数据</div>');
				$("#businessIncome").height('auto');
				n = false; //新增 无数据项返回
			}

		}

	})
	if (n)
		return true;
	else
		return false;
}

function AfindTotalProfit(_callback) {
	var params = {
		stockCode: stockCode
	}, n = false;
	//WF_ajax.findTotalProfit(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.AfindTotalProfit, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;

				//$("#businessIncomeShowName").html("2.2.1"+data.LiRunZongEZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f2LRZE; //营业收入
				var REVZengZhangLvList = result.LiRunZongEZengZhangLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('totalProfit'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["利润总额", '增长率']
					},
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '利润总额',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#totalProfit").html('<div class="noDatas">暂无数据</div>');
				$("#totalProfit").height('auto')
				n = false;
			}


		}
	})
	if (n)
		return true;
	else
		return false;
}
	
function AfindNetProfit(_callback) {
	var params = {
		stockCode: stockCode
	},n=false;
	//WF_ajax.findNetProfit(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.AfindNetProfit, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;
				//$("#businessIncomeShowName").html("2.2.1"+data.JingLiRunZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f2JLR; //营业收入
				var REVZengZhangLvList = result.JingLiRunZengZhangLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('netProfit'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["净利润", '增长率']
					},
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '净利润',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#netProfit").html('<div class="noDatas">暂无数据</div>');
				$("#netProfit").height('auto')
				n = false;
			}


		}
	})
	if(n)
	return true;
	else
	return false;
}
	
function AfindTotalAssets(_callback) {
	var params = {
		stockCode: stockCode
	},n=false;
	//WF_ajax.findTotalAssets(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.AfindTotalAssets, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;
				//$("#businessIncomeShowName").html("2.2.1"+data.ZongZiChanZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f1ZCZJ; //营业收入
				var REVZengZhangLvList = result.ZongZiChanZengZhangLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('totalAssets'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["总资产", '增长率']
					},
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '总资产',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				 n = true;
			} else {
				$("#totalAssets").html('<div class="noDatas">暂无数据</div>');
				$("#totalAssets").height('auto')
				n = false;
			}


		}
	})
	return n;
}
	
function AfindInterestRateChange(_callback) {
	var params = {
		stockCode: stockCode
	},n=false;
	//WF_ajax.findInterestRateChange(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.AfindInterestRateChange, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;

				//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.XiaoShouMaoLiLv; //营业收入
				var REVZengZhangLvList = result.XiaoShouJingLiRunLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('interestRateChange'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					tooltip:{
						trigger:'axis'
					},
					legend: {
						show: true,
						data: ["销售毛利率", '销售净利率']
					},
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					yAxis: [{
						type: 'value',
						name: "单位：%",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '销售毛利率',
						type: 'line',
						yAxisIndex: 0,
						symbol: "circle",
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '销售净利率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#interestRateChange").html('<div class="noDatas">无</div>');
				$("#interestRateChange").height('auto')
				n = false;
			}


		}
	})
	return n;
}

var newData;
var lastMonth;
//评级结构
function AfindJZDS(){
	var dataParams={stockCode:stockCode};
	UTIL.axs(UTIL.CONFIG.AfindTzpjData,dataParams,false,function(data){
		//console.log(data)
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined && data.retData.data.length>0){
				var result=data.retData;
				newData=result.new;
				lastMonth=result.old;
				var li='';
				$(result.data).each(function(index,item){
					li +='<li><span class="jg-date">'+item.rq+'</span><span><em>'+ item.jgsl +'</em>家机构维持评级为：<em>'+ item.jgpj +'</em>。</span></li>';
				})
				$("#jgList").html(li);
				drawEcharts(newData,lastMonth);
			}else{
				var div='<div class="noDatas noDatas-s1">暂无数据</div>';
				$(".jgpj-content").html(div);
			}
		}
	})
}
function getData(cn){
	switch(cn){
		case "强烈看跌":
			return 1;
		case "看跌":
			return 3;
		case "看平":
			return 5;
		case "看涨":
			return 7;
		case "强烈看涨":
			return 9;
		default:
			return 0;
	}
}
function drawEcharts(newData,lastMonth){	
	//newData 为最新的值
	//lastMonth为上月的值
	newData = getData(newData);
	lastMonth=getData(lastMonth);
	var lastWidth;
	var newWidth;
	var datas;
	var axisLabel;
	var jiacu;
	var fts;
	var ys;
	if(lastMonth==null || lastMonth=="" || lastMonth==undefined || lastMonth==0){
		lastWidth=0;
	}else{
		lastWidth=5;	
	}
	if(newData==null || newData=="" || newData==undefined || newData==0){
		newWidth=0;
	}else{
		newWidth=5;
	}
	if(newData==null && lastMonth==null)return;	
	var option = {    
		series : [
			{
				name: '速度',
				type: 'gauge',
				z: 3,
				min:0,
				max:10,
				splitNumber: 10,
				radius: '65%',
				center: ['54%', '35%'],    // 默认全局居中
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						width: 10,
						color:[[0.2, '#2cab65'],[0.4,"#41c97e"],[0.6,"#cde123"],[0.8,"#f9a538"],[1,"#ed3232"]]
					}
				},
				pointer:{
					show:true,
					length:'90%',
					width:newWidth
				},
				axisTick: {            // 坐标轴小标记
					length: 0,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length: 0,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},

				itemStyle:{
					normal:{
						color:"#f9a538"
					}
				},
				axisLabel: {
					formatter:function(value){
						if(newWidth==0){
							return "";
						}else{
							switch(value+""){
							case "1":
							return "强烈看跌";
							case "3":
							return "看跌";
							case "5":
							return "看平";
							case "7":
							return "看涨";
							case "9":
							return "强烈看涨";
							default:
							return "";
							}
						}
					},
					color:'#333'
				},
				detail : {
					// 其余属性默认使用全局文本样式，详见TEXTSTYLE
					formatter: function (value) {//显示的最新的那里的数据
						return "最新";
					},
					fontWeight: 'bolder',
					fontSize:18,
					color: '#333',
					rich: {}
				},
				data:[{value: newData},{name:"最新"}]//指针指向的位置
			},
			{
				name: '转速',
				type: 'gauge',
				center: ['34%', '40%'],    // 默认全局居中
				radius: '60%',
				min:0,
				max:10,
				endAngle:45,
				splitNumber:10,
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						width: 8,
						color:[[0.2, '#2cab65'],[0.4,"#41c97e"],[0.6,"#cde123"],[0.8,"#f9a538"],[1,"#ed3232"]]
					}
				},
				axisTick: {            // 坐标轴小标记
					length:0,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length:0,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				pointer: {
					show:true,
					length:'90%',
					width:lastWidth
				},
				title: {
					offsetCenter: [0, '-30%'],       // x, y，单位px
				},
				itemStyle:{
					normal:{
						color:"#ed3232"
					}
				},
				axisLabel: {
					formatter:function(e){
						if(lastWidth==0){
							return "";
						}else{
							switch(e+""){
							case "1":
							return "强烈看跌";
							case "3":
							return "看跌";
							case "5":
							return "看平";
							case "7":
							return "看涨";
							case "9":
							return "强烈看涨";
							default:
							return "";
							}
						}
						
					},
					color:'#333'
				},
				detail: {
					formatter: function (value) {//显示的最新的那里的数据
						var tip="{a|暂无数据}";
						if(lastWidth==0){
							return "上月\n" + tip;
						}else{
							return "上月";
						}
						
					},
					fontWeight: 'bolder',
					fontSize:18,
					color: '#333',
					rich: {
						a:{
							fontWeight:"normal",
							fontSize:14,
							color: '#666',
							height:26
						}
					}
				},
				data:[{value: lastMonth}]
			}
		]
	}
	var mycharts=echarts.init(document.getElementById('jgPj'));
	 mycharts.setOption(option);
	 //console.log(option)
	 window.addEventListener("resize", function () {
		mycharts.resize();
	});
}