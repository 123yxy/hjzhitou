var stockCode=getUrlParam("stockCode");
//数据初始化
$(function(){
	findSummaryEvents(stockCode);
});

/**
 * 公司重大事项
 */
function findSummaryEvents(stockCode){
	$.axs("/betaStock/companySummaryEvents/findSummaryEvents.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var ProfitDistribution = result.ProfitDistribution;//利润分配或公积金转增股本的情况
			var StockIssue = result.StockIssue;//股票发行事项
			var ImportantMatters = result.ImportantMatters;//重大事项
			var ExternaGuarantee = result.ExternaGuarantee;//对外担保事项 
			var GuaranteeSummary = result.GuaranteeSummary;//对外担保汇总 
			var OccupancyAssets = result.OccupancyAssets;//占用资产情况
			var DailyDeal = result.DailyDeal;//日常性关联交易事项
			var RandomDeal = result.RandomDeal;//偶发性关联交易事项
			var AssetsSeizure = result.AssetsSeizure;//资产异常情况
			var SummaryEvents = result.SummaryEvents;//重大事项汇总
			//重大事项汇总
			if(SummaryEvents!=null&&SummaryEvents!=""&&SummaryEvents!=undefined){
				$.each(SummaryEvents,function(index,item){
					//调查处罚事项  
					if(item.mattertype==3928){
						var a = '<div class="event_public">'
							+'<div class="event_title">'
							+'<span>被调查处罚事项  </span>'
							+'</div>'
							+'<div class="eve_info">'
							+'<p>'+item.mattercontent+'</p>'
							+'</div>'
							+'</div>'
						$("#SummaryEventsAll").after(a);
					}
					//已披露的承诺事项 
					if(item.mattertype==3929){
						$("#SummaryEventsAll").after('<div class="event_public">'
								+'<div class="event_title">'
								+'<span>已披露的承诺事项 </span>'
								+'</div>'
								+'<div class="eve_info">'
								+'<p>'+item.mattercontent+'</p>'
								+'</div>'
								+'</div>')
					}
					//股权激励事项 
					if(item.mattertype==3930){
						$("#SummaryEventsAll").after('<div class="event_public">'
								+'<div class="event_title">'
								+'<span>股权激励事项 </span>'
								+'</div>'
								+'<div class="eve_info">'
								+'<p>'+item.mattercontent+'</p>'
								+'</div>'
								+'</div>')
					}
					//对外投资事项 
					if(item.mattertype==3931){
						$("#SummaryEventsAll").after('<div class="event_public">'
								+'<div class="event_title">'
								+'<span>经股东大会审议过的收购，出售资产，对外投资事项</span>'
								+'</div>'
								+'<div class="eve_info">'
								+'<p>'+item.mattercontent+'</p>'
								+'</div>'
								+'</div>')
					}
				});
			}
			//资产异常情况
			if(AssetsSeizure!=null&&AssetsSeizure!=""&&AssetsSeizure!=undefined){
				var  htmlASDiv = '';
				var  htmlASTable = '';
				var  bookvalue = 0;
				var  assetsproportion = 0;
				htmlASDiv ='<div class="event_title">'
				 +'<span>资产被查封，扣押，冻结或者被抵押，质押情况</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlASDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>资产</th>'
				 +'<th>权限受限类型</th>'
				 +'<th>账面价值</th>'
				 +'<th>占总资产的比例</th>'
				 +'<th>发生原因</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="AssetsSeizure">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlASDiv);
				$.each(AssetsSeizure,function(index,item){
					htmlASTable +='<tr>'
					htmlASTable +='<td>'+item.assets+'</td>'
					htmlASTable +='<td>'+item.limitedtype+'</td>'
					if(item.bookvalue==null){
						htmlASTable +='<td>-</td>'
					}else{
						htmlASTable +='<td>'+item.bookvalue+'</td>'
						bookvalue=bookvalue+item.bookvalue;
					}
					if(item.assetsproportion==null){
						htmlASTable +='<td>-</td>'
					}else{
						htmlASTable +='<td>'+item.assetsproportion.toFixed(2)+'%</td>'
						assetsproportion = assetsproportion+item.assetsproportion;
					}
					htmlASTable +='<td>'+item.reason+'</td>'
					htmlASTable +='</tr>'
				});
				htmlASTable +='<tr>'
				htmlASTable +='<td>总计</td>'
				htmlASTable +='<td>-</td>'
				if(bookvalue==0){
					htmlASTable +='<td>-</td>'
				}else{
					htmlASTable +='<td>'+bookvalue.toFixed(2)+'</td>'
				}
				if(assetsproportion==0){
					htmlASTable +='<td>-</td>'
				}else{
					htmlASTable +='<td>'+assetsproportion.toFixed(2)+'%</td>'
				}
				htmlASTable +='<td>-</td>'
				htmlASTable +='</tr>'
				$("#AssetsSeizure").append(htmlASTable);
			}
			//偶发性关联交易事项
			if(RandomDeal!=null&&RandomDeal!=""&&RandomDeal!=undefined){
				var  htmlRDDiv = '';
				var  htmlRDTable = '';
				htmlRDDiv ='<div class="event_title">'
				 +'<span>偶发性关联交易内容</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlRDDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>关联方</th>'
				 +'<th>交易内容</th>'
				 +'<th>交易金额</th>'
				 +'<th>是否履行必要决策程序</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="RandomDeal">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlRDDiv);
				$.each(RandomDeal,function(index,item){
					htmlRDTable +='<tr>'
					htmlRDTable +='<td>'+item.relatedparty+'</td>'
					htmlRDTable +='<td>'+item.dealcontent+'</td>'
					if(item.transactionamount==null){
						htmlRDTable +='<td>-</td>'
					}else{
						htmlRDTable +='<td>'+item.transactionamount+'</td>'
					}
					htmlRDTable +='<td>'+item.whetherprocess+'</td>'
					htmlRDTable +='</tr>'
				});
				$("#RandomDeal").append(htmlRDTable);
			}
			//日常性关联交易事项
			if(DailyDeal!=null&&DailyDeal!=""&&DailyDeal!=undefined){
				var  htmlDLDiv = '';
				var  htmlDLTable = '';
				var  estimatedamount = 0;
				var  occurrenceamount = 0;
				htmlDLDiv ='<div class="event_title">'
				 +'<span>日常性关联交易事项</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlDLDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>具体事项类型</th>'
				 +'<th>预计金额</th>'
				 +'<th>发生金额</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="DailyDeal">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlDLDiv);
				$.each(DailyDeal,function(index,item){
					htmlDLTable +='<tr>'
					htmlDLTable +='<td>'+item.itemtype+'</td>'
					if(item.estimatedamount==null){
						htmlDLTable +='<td>-</td>'
					}else{
						htmlDLTable +='<td>'+item.estimatedamount+'</td>'
						estimatedamount=estimatedamount+item.estimatedamount;
					}
					if(item.occurrenceamount==null){
						htmlDLTable +='<td>-</td>'
					}else{
						htmlDLTable +='<td>'+item.occurrenceamount+'</td>'
						occurrenceamount=occurrenceamount+item.occurrenceamount;
					}
					htmlDLTable +='</tr>'
				});
				htmlDLTable +='=<tr>'
				htmlDLTable+='<td>总计</td>'
				if(estimatedamount==0){
					htmlDLTable+='<td>-</td>'
				}else{
					htmlDLTable+='<td>'+estimatedamount.toFixed(2)+'</td>'
				}
				if(occurrenceamount==0){
					htmlDLTable+='<td>-</td>'
				}else{
					htmlDLTable+='<td>'+occurrenceamount.toFixed(2)+'</td>'
				}
				htmlDLTable+='</tr>'
				$("#DailyDeal").append(htmlDLTable);
			}
			//占用资产情况
			if(OccupancyAssets!=null&&OccupancyAssets!=""&&OccupancyAssets!=undefined){
				var  htmlOADiv = '';
				var  htmlOATable = '';
				var  initialbalance = 0;
				var  cumulativeoccurrence = 0;
				var  endingbalance = 0;
				htmlOADiv ='<div class="event_title">'
				 +'<span>股东及其关联方占用或转移公司资金，资产及其他资源的情况</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlOADiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>占用着</th>'
				 +'<th>占用形式</th>'
				 +'<th>占用性质</th>'
				 +'<th>期初余额</th>'
				 +'<th>累计发生余额</th>'
				 +'<th>期末余额</th>'
				 +'<th>是否归还</th>'
				 +'<th>是否为挂牌前已清理事项</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="OccupancyAssets">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlOADiv);
				$.each(OccupancyAssets,function(index,item){
					htmlOATable +='<tr>'
					htmlOATable +='<td>'+item.occupants+'</td>'
					htmlOATable +='<td>'+item.occupancyform+'</td>'
					htmlOATable +='<td>'+item.occupancyproperty+'</td>'
					if(item.initialbalance==null){
						htmlOATable +='<td>-</td>'
					}else{
						htmlOATable +='<td>'+item.initialbalance+'</td>'
						initialbalance= initialbalance+item.initialbalance;
					}
					if(item.cumulativeoccurrence==null){
						htmlOATable +='<td>-</td>'
					}else{
						htmlOATable +='<td>'+item.cumulativeoccurrence+'</td>'
						cumulativeoccurrence=cumulativeoccurrence+item.cumulativeoccurrence;
					}
					if(item.endingbalance==null){
						htmlOATable +='<td>-</td>'
					}else{
						htmlOATable +='<td>'+item.endingbalance+'</td>'
						endingbalance=endingbalance+item.endingbalance;
					}
					htmlOATable +='<td>'+item.whetherreturn+'</td>'
					htmlOATable +='<td>'+item.beforelistingmatter+'</td>'
					htmlOATable +='</tr>'
				});
				htmlOATable +='<tr>'
				htmlOATable +='<td>总计</td>'
				htmlOATable +='<td>-</td>'
				htmlOATable +='<td>-</td>'
				if(initialbalance==0){
					htmlOATable +='<td>-</td>'
				}else{
					htmlOATable +='<td>'+initialbalance.toFixed(2)+'</td>'	
				}
				if(cumulativeoccurrence==0){
					htmlOATable +='<td>-</td>'				
				}else{
					htmlOATable +='<td>'+cumulativeoccurrence.toFixed(2)+'</td>'			
				}
				if(endingbalance==0){
					htmlOATable +='<td>-</td>'
				}else{
					htmlOATable +='<td>'+endingbalance.toFixed(2)+'</td>'
				}
				htmlOATable +='<td>-</td>'
				htmlOATable +='<td>-</td>'
				htmlOATable +='</tr>'
				$("#OccupancyAssets").append(htmlOATable);
			}
			//对外担保事项 
			if(ExternaGuarantee!=null&&ExternaGuarantee!=""&&ExternaGuarantee!=undefined){
				var  htmlEGDiv = '';
				var  htmlEGTable = '';
				htmlEGDiv ='<div class="event_title">'
				 +'<span>对外担保事项</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlEGDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>担保对象</th>'
				 +'<th>担保金额</th>'
				 +'<th>担保期限</th>'
				 +'<th>担保类型</th>'
				 +'<th>责任类型</th>'
				 +'<th>是否履行必要决策程序</th>'
				 +'<th>是够关联担保</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="ExternaGuarantee">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlEGDiv);
				$.each(ExternaGuarantee,function(index,item){
					htmlEGTable +='<tr>'
						htmlEGTable +='<td>'+item.guaranteeobject+'</td>'
					if(item.guaranteeamount==null){
						htmlEGTable +='<td>-</td>'
					}else{
						htmlEGTable +='<td>'+item.guaranteeamount+'</td>'
					}
					htmlEGTable +='<td>'+item.guaranteeperiod+'</td>'
					htmlEGTable +='<td>'+item.guaranteetype+'</td>'
					htmlEGTable +='<td>'+item.responsibilitytype+'</td>'
					htmlEGTable +='<td>'+item.makingprocess+'</td>'
					htmlEGTable +='<td>'+item.relatedguarantee+'</td>'
					htmlEGTable +='</tr>'
				});
				$("#ExternaGuarantee").append(htmlEGTable);
			}
			//对外担保分类汇总
			if(GuaranteeSummary!=null&&GuaranteeSummary!=""&&GuaranteeSummary!=undefined){
				var  htmlGSDiv = '';
				var  htmlGSTable = '';
				htmlGSDiv ='<div class="event_public">'
				+'<div class="eve_title">'
				+'<span>对外担保分类汇总:</span>'
				+'</div>'
				+'<div class="event_content information">'
				+'<table>'
				+'<thead>'
				+'<tr>'
				+'<th>汇总项目</th>'
				+'<th>余额</th>'
				+'</tr>'
				+'</thead>'
				+'<tbody id="GuaranteeSummary">'
				+'</tbody>'
				+'</table>'
				+'</div>'
				+'</div>'
				$("#htmlEGDiv").after(htmlGSDiv);
				$.each(GuaranteeSummary,function(index,item){
					htmlGSTable +='<tr>'
					htmlGSTable +='<td>'+item.projectsummary+'</td>'
					if(item.balance==null){
						htmlGSTable +='<td>-</td>'
					}else{
						htmlGSTable +='<td>'+item.balance+'</td>'
					}
					htmlGSTable +='</tr>'
				});
				$("#GuaranteeSummary").append(htmlGSTable);
			}
			//重大事项
			if(ImportantMatters!=null&&ImportantMatters!=""&&ImportantMatters!=undefined){
				var  htmlIMDiv = '';
				var  htmlIMTable = '';
				var  amountinvolved = 0;
				var  ratioassets = 0;
				htmlIMDiv ='<div class="event_title">'
				 +'<span>重大诉讼，仲裁事项</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlIMDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>重大诉讼，仲裁事项</th>'
				 +'<th>涉及金额</th>'
				 +'<th>占期末净资产的比例</th>'
				 +'<th>是否结案</th>'
				 +'<th>临时公告披露时间</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="ImportantMatters">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlIMDiv);
				$.each(ImportantMatters,function(index,item){
					htmlIMTable +='<tr>'
					htmlIMTable +='<td>'+item.importantmatters+'</td>'
					if(item.amountinvolved==null){
						htmlIMTable +='<td>-</td>'
					}else{
						htmlIMTable +='<td>'+item.amountinvolved+'</td>'
						amountinvolved=amountinvolved+item.amountinvolved;
					}
					if(item.ratioassets==null){
						htmlIMTable +='<td>-</td>'
					}else{
						htmlIMTable +='<td>'+item.ratioassets.toFixed(2)+'%</td>'
						ratioassets=ratioassets+item.ratioassets;
					}
					htmlIMTable +='<td>'+item.closed+'</td>'
					htmlIMTable +='<td>'+item.disclosuretime+'</td>'
					htmlIMTable +='</tr>'
				});
				htmlIMTable +='<tr>'
				htmlIMTable +='<td>总计</td>'
				if(amountinvolved==0){
					htmlIMTable +='<td>-</td>'
				}else{
					htmlIMTable +='<td>'+amountinvolved.toFixed(2)+'</td>'
				}
				if(ratioassets==0){
					htmlIMTable +='<td>-</td>'
				}else{
					htmlIMTable +='<td>'+ratioassets.toFixed(2)+'%</td>'
				}
				htmlIMTable +='<td>-</td>'
				htmlIMTable +='<td>-</td>'
				htmlIMTable +='</tr>'
				$("#ImportantMatters").append(htmlIMTable);
			}
			//股票发行事项
			if(StockIssue!=null&&StockIssue!=""&&StockIssue!=undefined){
				var  htmlSIDiv = '';
				var  htmlSITable = '';
				htmlSIDiv ='<div class="event_title">'
				 +'<span>股票发行事项</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlSIDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>发行方案公告时间</th>'
				 +'<th>新增股票挂牌装让日期</th>'
				 +'<th>发行价格（元/股）</th>'
				 +'<th>发行数量（股）</th>'
				 +'<th>募集金额（元）</th>'
				 +'<th>募集资金用途</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="StockIssue">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlSIDiv);
				$.each(StockIssue,function(index,item){
					htmlSITable +='<tr>'
					htmlSITable +='<td>'+item.announcementtime+'</td>'
					htmlSITable +='<td>'+item.listingtransfertime+'</td>'
					htmlSITable +='<td>'+item.issueprice+'</td>'
					htmlSITable +='<td>'+item.issuenumber+'</td>'
					if(item.raiseamount==null){
						htmlSITable +='<td>-</td>'
					}else{
						htmlSITable +='<td>'+item.raiseamount+'</td>'
					}
					htmlSITable +='<td>'+item.raisepurpose+'</td>'
					htmlPDTable +='</tr>'
				});
				$("#StockIssue").append(htmlSITable);
			}
			//利润分配或公积金转增股本的情况
			if(ProfitDistribution!=null&&ProfitDistribution!=""&&ProfitDistribution!=undefined){
				var  htmlPDDiv = '';
				var  htmlPDTable = '';
				htmlPDDiv ='<div class="event_title">'
				 +'<span>利润分配或公积金转增股本的情况</span>'
				 +'</div>'
				 +'<div class="event_content information" id="htmlPDDiv">'
				 +'<table>'
				 +'<thead>'
				 +'<tr>'
				 +'<th>股利分配日期</th>'
				 +'<th>每10股派现数(含税)</th>'
				 +'<th>每10股送股数</th>'
				 +'<th>每10股转增股数</th>'
				 +'</tr>'
				 +'</thead>'
				 +'<tbody id="ProfitDistribution">'
				 +'</tbody>'
				 +'</table>'
				 +'</div>'
				$("#SummaryEventsAll").after(htmlPDDiv);
				$.each(ProfitDistribution,function(index,item){
					htmlPDTable +='<tr>'
					htmlPDTable +='<td>'+item.allocationdate+'</td>'
					if(item.numberpie!=null){
						htmlPDTable +='<td>'+item.numberpie+'</td>'
					}else{
						htmlPDTable +='<td>-</td>'
					}
					if(item.sendnumber!=null){
						htmlPDTable +='<td>'+item.sendnumber+'</td>'
					}else{
						htmlPDTable +='<td>-</td>'
					}
					if(item.transferringnumber!=null){
						htmlPDTable +='<td>'+item.transferringnumber+'</td>'
					}else{
						htmlPDTable +='<td>-</td>'
					}
					htmlPDTable +='</tr>'
				});
				$("#ProfitDistribution").append(htmlPDTable);
			}
			//重大事项汇总
			if(SummaryEvents!=null&&SummaryEvents!=""&&SummaryEvents!=undefined){
				$.each(SummaryEvents,function(index,item){
					//偶发性关联交易影响  
					if(item.mattertype==3932){
						$("#htmlRDDiv").after('<div class="event_public">'
								+'<div class="eve_title">'
								+'<span>偶发性关联交易的必要性，持续性以及对公司产生经营的影响：</span>'
								+'</div>'
								+'<div class="eve_info">'
								+'<p>'+item.mattercontent+'</p>'
								+'</div>'
								+'</div>')
					}
					//资产占用原因  
					if(item.mattertype==3933){
						$("#htmlOADiv").after('<div class="event_public">'
								+'<div class="eve_title">'
								+'<span>占用原因，归还及整改情况：</span>'
								+'</div>'
								+'<div class="eve_info">'
								+'<p>'+item.mattercontent+'</p>'
								+'</div>'
								+'</div>')
					}
					//利润分配或公积金转增执行情况
					if(item.mattertype==3934){
						$("#htmlPDDiv").after('<div class="event_public">'
								+'<div class="eve_title">'
								+'<span>报告期内利润分配或公积金庄增股本执行情况：</span>'
								+'</div>'
								+'<div class="eve_info">'
								+'<p>'+item.mattercontent+'</p>'
								+'</div>'
								+'</div>')
					}
				});
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
