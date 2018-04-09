var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");

$(document).ready(function(){
	
	$("#stockNameShow").text(stockName);
	
	tick();
	
	findHeadMsgByCode();
	
	findCompanyOverview();
	
	findCompanySurvey();
	
	findHolder();
	
	findDignitary();
	
	findTeam();
	
	findPlacement();
	
	findCompanyEvents(1,10);
	
	findOperatingConditions();
	
	//点击上面分时图出的收起展开
	$(".tub_shouqi").on("click",function(){
		if($(".fen_echars").is(":hidden")){
			$(this).removeClass("on").text("收起");
			$(".fen_echars").show();
		}else{
			$(this).addClass("on").text("展开");
			$(".fen_echars").hide();
		}
	})
	$(".boar_r").on("scroll",function(){
		var top=$(this).scrollTop();
		var offsetTop=$(".new_gp_in_title").scrollTop();
		//console.log(top)
		if(top>=420){
			$(".fen_echars").slideUp();
			//$(".new_gp_in_title").offsetTop=500;
			$(".tub_shouqi").addClass("on").text("展开");
		}else{
//			$(".fen_echars").slideDown();
//			$(".tub_shouqi").removeClass("on").text("收起");
		}
	})
//	点击公司信息详情
$("#tc_gsxq").on("click",function(){
	$(".n_gsjbx,.backbj").show();
	$("body,html").css("overflow","hidden");
	
});
//点击显示股本股东中的详情
$("#tc_gbgd").on("click",function(){
	$(".n_ten_dbox,.backbj").show();
	$("body,html").css("overflow","hidden");
	
});
//点击显示高管的详情
$("#tc_gaoguan").on("click",function(){
	$(".n_gsgguan_dbox,.backbj").show();
	$("body,html").css("overflow","hidden");
	
});
//点击显示经营情况的详情
$("#tc_jyqk").on("click",function(){
	$(".n_jyqk_dbox,.backbj").show();
	$("body,html").css("overflow","hidden");
});
//点击显示团队的详情
$("#tc_tuandui").on("click",function(){
	$(".n_teamdbox,.backbj").show();
	$(".n_teamdbox").css("opacity",1);
	$("body,html").css("overflow","hidden");
});
//点击显示发行情况的详情
$("#tc_fxqk").on("click",function(){
	$(".n_fxqkd_dbox,.backbj").show();
	$("body,html").css("overflow","hidden");
});

//点击显示公司大事的详情
$("#tc_gsds").on("click",function(){
	$(".n_big_dbox,.backbj").show();
	$("body,html").css("overflow","hidden");
});
//关闭概况页面中的弹窗
$(".n_gs_close").on("click",function(){
	$(this).parent().hide();
	$(".backbj").hide();
	$("body,html").css("overflow","auto");
});

//点击行业分析进行跳转
$(".tiaozhuan").on("click",function(){
	window.open('/dataAnalysis/stockRankings.html?stockCode='+stockCode+'&stockName='+stockName+'');
})


//	关闭高管信息弹层
$("#n_g_t_tc_colse").on("click",function(){
	$(".n_gg_tc_tc").removeClass("on");
});

//	关闭发行对象弹层
$("#n_fxdx_t_tc_colse").on("click",function(){
	$(".n_fxqk_tc_tc").removeClass("on");
});

});

/**
 * 查询头部信息
 */
function findHeadMsgByCode(){
	$.axs("/betaInvest/common/findDetailHeder.do",{stockCode:stockCode}, false, function(data){
		if(data.retCode == 0000){
			if(data.retData != null){
				var obj=jQuery.parseJSON(data.retData);
//				console.log(obj);
				$("#stockName").text(obj.stockName); //股票名称
				$("#stockCode").text(obj.stockCode); //股票代码
				//console.log(obj)
				if(obj.flag == 1){
//					if(obj.newPrice<obj.openPrice){//如果跌了显示绿色
//						$(".top_box").attr("class","top_box down");
//						$(".new_price").attr("class","new_price green");
//						$("#openPrice").attr("class","green");
//					}
					if(obj.changeAmount>=0){
						$(".top_box").addClass("up_gj").removeClass("down");
						$("#newPrice").addClass("red").removeClass("green");
					}else{
						$(".top_box").addClass("down").removeClass("up_gj");
						$("#newPrice").addClass("green").removeClass("red");
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
					$("#limitUp").text(((obj.limitUp=="" && obj.limitUp!=0) || obj.limitUp==null)?"--":(obj.limitUp).toFixed(2)); //涨停
					$("#limitDown").text(((obj.limitDown=="" && obj.limitDown!=0) || obj.limitDown==null)?"--":(obj.limitDown).toFixed(2)); //跌停
					$("#yclosePrice").text(((obj.yclosePrice=="" && obj.yclosePrice!=0) || obj.yclosePrice==null)?"--":obj.yclosePrice.toFixed(2)); //昨收
					$("#totalMarketValue").text((obj.totalMarketValue/100000000).toFixed(2) + "亿"); //总市值
					$("#turnover").text((((obj.turnover=="" && obj.turnover!=0) || obj.turnover==null)?"--":(obj.turnover.toFixed(2) + "%"))); //换手
					$("#highPrice").text(((obj.highPrice=="" && obj.highPrice!=0) || obj.highPrice==null)?"--":obj.highPrice.toFixed(2)); //最高
					$("#tradingVolume").text(((obj.tradingVolume=="" && obj.tradingVolume!=0) || obj.tradingVolume==null)?"--":((obj.tradingVolume/10000).toFixed(2) + "万股")); //成交量
					$("#cmValue").text(((obj.cmValue=="" && obj.cmValue!=0) || obj.cmValue==null)?"--":(obj.cmValue/100000000).toFixed(2) + "亿"); //流通市值
					$("#netRatio").text(((obj.netRatio=="" && obj.netRatio!=0) || obj.netRatio==null)?"--":obj.netRatio.toFixed(2)); //市净率
					$("#lowPrice").text(((obj.lowPrice=="" && obj.lowPrice!=0) || obj.lowPrice==null)?"--":obj.lowPrice.toFixed(2)); //最低
					$("#tradingAmount").text(((obj.tradingAmount=="" && obj.tradingAmount!=0) || obj.tradingAmount==null)?"--":((obj.tradingAmount/10000).toFixed(2) + "万元")); //成交额
					$("#amplitude").text((((obj.amplitude=="" && obj.amplitude!=0) || obj.amplitude==null)?"--":(obj.amplitude.toFixed(2) + "%"))); //振幅
					//wtl 7.6 加百分号
					$("#priceEarningRatio").text(((obj.priceEarningRatio=="" && obj.priceEarningRatio!=0) || obj.priceEarningRatio==null)?"--":(obj.priceEarningRatio.toFixed(2))); //市盈率
				}
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
    });
}

/**
 * 加载实时时间
 */
function tick() {
	var years,months,days,hours, minutes, seconds;
	var intYears,intMonths,intDays,intHours, intMinutes, intSeconds;
	var today;
	today = new Date(); //系统当前时间
	intYears = today.getFullYear(); //得到年份,getFullYear()比getYear()更普适
	intMonths = today.getMonth() + 1; //得到月份，要加1
	intDays = today.getDate(); //得到日期
	intHours = today.getHours(); //得到小时
	intMinutes = today.getMinutes(); //得到分钟
	intSeconds = today.getSeconds(); //得到秒钟
	years = intYears + "-";
	if(intMonths < 10 ){
		months = "0" + intMonths +"-";
	} else {
		months = intMonths +"-";
	}
	if(intDays < 10 ){
		days = "0" + intDays +" ";
	} else {
		days = intDays + " ";
	}
	if (intHours == 0) {
		hours = "00:";
	} else if (intHours < 10) {
		hours = "0" + intHours+":";
	} else {
		hours = intHours + ":";
	}
	if (intMinutes < 10) {
		minutes = "0"+intMinutes+":";
	} else {
		minutes = intMinutes+":";
	}
	if (intSeconds < 10) {
		seconds = "0"+intSeconds+" ";
	} else {
		seconds = intSeconds+" ";
	}
	timeString = years+months+days+hours+minutes+seconds;
	realTime.innerHTML = timeString;
	window.setTimeout("tick();", 1000);
}

/**
 * 查询公司概览
 */
function findCompanyOverview(){
	$.axs("/betaInvest/enterpriseData/findCompanyOverview.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData);
			if(data.retData != null){
				$("#companyMsg").text(data.retData.companyMsg);
				$("#equityShareholders").text(data.retData.equityShareholders);
				$("#director").text(data.retData.director);
				$("#operation").text(data.retData.operation);
				$("#industry").text(data.retData.industry);
				$("#team").text(data.retData.team);
				$("#issuance").text(data.retData.issuance);
				$("#event").text(data.retData.event);
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询公司基本信息
 */
function findCompanySurvey(){
	$.axs("/betaInvest/enterpriseData/findCompanySurvey.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData);
			if(data.retData != null){
				$("#enterpriseUpTime").text("更新时间:"+((data.retData.updateTime == null || data.retData.updateTime == "") ? "--" : data.retData.updateTime));
				$("#companyForShort").text((data.retData.companyForShort == null || data.retData.companyForShort == "") ? "--" : data.retData.companyForShort);
				$("#legalPerson").text((data.retData.legalPerson == null || data.retData.legalPerson == "") ? "--" : data.retData.legalPerson);
				$("#registrationDate").text((data.retData.registrationDate == null || data.retData.registrationDate == "") ? "--" : data.retData.registrationDate);
				$("#registeredCapital").text((data.retData.registeredCapital == null || data.retData.registeredCapital == "") ? "--" : ((parseFloat(data.retData.registeredCapital)/10000).toFixed(2)));
				$("#stockDate").text((data.retData.stockDate == null || data.retData.stockDate == "") ? "--" : data.retData.stockDate);
				$("#sponsoredBroker").text((data.retData.sponsoredBroker == null || data.retData.sponsoredBroker == "") ? "--" : data.retData.sponsoredBroker);
				$("#dealType").text((data.retData.dealType == null || data.retData.dealType == "") ? "--" : data.retData.dealType);
				$("#generalCapital").text((data.retData.generalCapital == null || data.retData.generalCapital == "") ? "--" : (data.retData.generalCapital/10000.00).toFixed(2));
				var jianjie=data.retData.actualController;
				if(data.retData.actualController==null||data.retData.actualController==""||data.retData.actualController==undefined){
					data.retData.actualController="--";
					jianjie='--';
				}else{
					if((data.retData.actualController).length>19){
						data.retData.actualController=(data.retData.actualController).substring(0,18)+"...";
					}
				}
				$("#actualController").text(data.retData.actualController);
				$("#actualController").attr("title",jianjie);
				$("#secretary").text((data.retData.secretary == null || data.retData.secretary == "") ? "--" : data.retData.secretary);
				$("#industryName").text((data.retData.industryName == null || data.retData.industryName == "") ? "--" : data.retData.industryName);
				$("#state").text((data.retData.state == null || data.retData.state == "") ? "--" : data.retData.state);
				var dianhua=data.retData.phone;
				if(data.retData.phone==null || data.retData.phone=="" ||data.retData.phone==undefined){
					data.retData.phone="--";
				}else{
					if((data.retData.phone).length>31){
						data.retData.phone=(data.retData.phone).substring(0,30)+"...";
					}
				}
				$("#phone").text(data.retData.phone);
				$("#phone").attr("title",dianhua);
				$("#fax").text((data.retData.fax == null || data.retData.fax == "") ? "--" : data.retData.fax);
				$("#companyUrl").text((data.retData.companyUrl == null || data.retData.companyUrl == "") ? "--" : data.retData.companyUrl);
				var dizhi=data.retData.businessAddress;
				if(data.retData.businessAddress==null||data.retData.businessAddress==""||data.retData.businessAddress==undefined){
					data.retData.businessAddress="--";
					dizhi='--';
				}else{
					if((data.retData.businessAddress).length>19){
						data.retData.businessAddress=(data.retData.businessAddress).substring(0,18)+"...";
					}
				}
				$("#businessAddress").text(data.retData.businessAddress);
				$("#businessAddress").attr("title",dizhi);
				$("#enterpriseIntroduction").text((data.retData.enterpriseIntroduction == null || data.retData.enterpriseIntroduction == "") ? "--" : data.retData.enterpriseIntroduction);
				$("#businessModel").text((data.retData.businessModel == null || data.retData.businessModel == "") ? "--" : data.retData.businessModel);
				
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
 * 查询公司股东信息
 */
function findHolder(){
	$.axs("/betaInvest/topTenShareholder/findHolderForSurvey.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			//console.log(data.retData);
			if(data.retData != null && data.retData.length > 0){
				var holderHtml = "";
				$(data.retData).each(function(index, item){
					if(index == 0){
						$("#holderUpTime").text("更新时间:" + ((item.updateTime == null || item.updateTime == "") ? "--" : item.updateTime));
					}
					holderHtml += "<tr>";
					holderHtml += "<td class='shuzi'>"+(index + 1)+"</td>";
					holderHtml += "<td>"+((item.investor == null || item.investor == "") ? "--" : item.investor)+"</td>";
					holderHtml += "<td class='shuzi'>"+((item.holdCount == null || (item.holdCount == "" && item.holdCount != 0)) ? "--" : (item.holdCount/10000).toFixed(2))+"</td>";
					holderHtml += "<td class='shuzi'>"+((item.numberRestrictedShares == null || (item.numberRestrictedShares == "" && item.numberRestrictedShares != 0)) ? "--" : (item.numberRestrictedShares/10000).toFixed(2))+"</td>";
					holderHtml += "<td class='shuzi'>"+((item.noneRestrictedShares == null || (item.noneRestrictedShares == "" && item.noneRestrictedShares != 0)) ? "--" : (item.noneRestrictedShares/10000).toFixed(2))+"</td>";
					holderHtml += "<td class='shuzi'>"+((item.proportion == null || (item.proportion == "" && item.proportion != 0)) ? "--" : item.proportion)+"%</td>";
					if(item.shareChange==null || item.shareChange=="" || item.shareChange==undefined){
						holderHtml += "<td>--</td>";
					}else{
						if(item.shareChange=="新进" || item.shareChange=="退出"){
							holderHtml += "<td class='xinjin'>"+item.shareChange+"</td>";	
						}else{
							//判断涨幅
							if(item.shareChange<0){
								holderHtml += "<td class='down shuzi'>"+item.shareChange+"%</td>";
							}else if(item.shareChange>0){
								holderHtml += "<td class='up shuzi'>"+item.shareChange+"%</td>";
							}else{
								holderHtml += "<td>"+item.shareChange+"</td>";
							}
							
						}
					}

					holderHtml += "</tr>";
				})
				$("#tenHolder").html(holderHtml);
			}else{
				$("#tenHolder").html("<tr><td colspan='7' >暂无数据</td></tr>");
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询公司高管信息
 */
function findDignitary(){
	$.axs("/betaInvest/dignitary/findDignForSurvey.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData);
			if(data.retData != null && data.retData.length > 0){
				//console.log(data.retData);
				var dignitaryHtml = "";
				$(data.retData).each(function(index, item){
					if(index == 0){
						$("#dignUpTime").text("更新时间:" + ((item.updateTime == null || item.updateTime == "") ? "--" : item.updateTime));
					}
					//console.log(item.sharesNumber)
					dignitaryHtml += "<tr>"
									+"<td class='gsgg_xuhao'>"+(index + 1)+"</td>"
									+"<td class='gsgg_xm'>"+((item.dignitaryName == null || item.dignitaryName == "") ? "--" : item.dignitaryName)+"</td>"
									+"<td class='gsgg_zw'>"+((item.position == null || item.position == "") ? "--" : item.position)+"</td>"
									+"<td class='gsgg_sj'>"+((item.servingTime == null || item.servingTime == "") ? "--" : item.servingTime)+"</td>"
									+"<td class='gsgg_cg'>"+((item.sharesNumber == null || (item.sharesNumber == "" && item.sharesNumber != 0)) ? "--" : (item.sharesNumber/10000).toFixed(2))+"</td>";
					dignitaryHtml += "<td class='gsgg_cgbh'>"+((item.numberVariation == null || item.numberVariation == "") ? "--" : item.numberVariation)+"</td>"
									+"<td class='gsgg_jl'><a href='javascript:;' onclick='showDignitary(\""+item.dignitaryName+"\",\""+item.sex+"\",\""+item.bornDate+"\",\""+item.nationality+"\",\""+item.livingPlace+"\",\""+item.workExperience+"\",\""+item.edExperience+"\")' >查看</a></td>"
									+"</tr>";
				})
				$("#dignitaryTbody").html(dignitaryHtml);
			}else{
				$("#dignitaryTbody").html("<tr><td colspan='7' >暂无数据</td></tr>");
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 显示单个高管的信息
 * @param value
 */
function showDignitary(name,sex,bornDate,nationality,livingPlace,workExperience,edExperience){
	$(".n_gg_tc_tc").addClass("on");
	$("#dignitaryName").text((name == "null" || name == "") ? "--" : name);
	$("#sex").text((sex == "null" || sex == "") ? "--" : sex);
	$("#bornDate").text((bornDate == "null" || bornDate == "") ? "--" : bornDate);
	$("#nationality").text((nationality == "null" || nationality == "") ? "--" : nationality);
	$("#livingPlace").text((livingPlace == "null" || livingPlace == "") ? "--" : livingPlace);
	
	var edJl = "";

	if(edExperience.indexOf(";") > -1){
		var splitED = edExperience.split(";");
		$(splitED).each(function(){
			edJl += "<li><p>"+this+"。</p><div class='clr'></div></li>";
		})
	}else{
		edJl = "<li><p>暂无</p><div class='clr'></div></li>";
	}
	$(".n_gg_jyjlul").children().html(edJl);
	
	var workJl = "";
	if(workExperience.indexOf(";") > -1){
		var splitWork = workExperience.split(";");
		$(splitWork).each(function(){
			workJl += "<li><p>"+this+"。</p></li>";
		})
	}else{
		workJl = "<li><p>暂无</p></li>";
	}
	$(".n_gg_zyjlul").children().html(workJl);
}

//经营信息对比
function myChartXz(data){
	var myChart1 = echarts.init(document.getElementById('ygzzjiegou'));
	option = {
	    tooltip : {
	        trigger: 'item',
	        formatter: function(params){
	        	return	'<div class="shizhi_tips">'+
						'<span class="shizhi_time">'+params.seriesName+'</span>'+
						'<div class="types_one">'+
							'<span class="zong_shizhi">'+params.name+'：</span>'+
							'<span class="shuju2">'+params.value+'('+params.percent+'%)</span>'+
							'<div class="clr"></div>'+
						'</div>'+
					'</div>';
	        }
	    },
	    
	    color:["rgba(98,166,242,.9)","rgba(98,166,242,.7)","rgba(98,166,242,.6)","rgba(98,166,242,.5)","rgba(98,166,242,.4)"],
	    series : [
	        {
	            name: '员工组织结构',
	            type: 'pie',
	            radius : '55%',
   				label:{
	            	normal:{
	            		show:true,
	            		formatter:function(params){
	            			return params.name+'\n('+params.value+')';
	            		},
	            		textStyle:{
	            			color:'#333',
	            			fontSize:14
	            		}
	            	}
	            },
	            center: ['50%', '50%'],
	            data:data/*[
	                {value:335, name:'财务人员'},
	                {value:310, name:'行政管理人员'},
	                {value:234, name:'生产人员'},
	                {value:135, name:'销售人员'},
	                {value:1548, name:'技术人员'}
//	            ]*/
//	            itemStyle: {
//	                emphasis: {
//	                    shadowBlur: 10,
//	                    shadowOffsetX: 0,
//	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
//	                }
//	            }
	        }
	    ]
	};
	 myChart1.setOption(option);
	 window.onresize = myChart1.resize;
}

//绘制员工教育组织图
function myChartJy(data){
	//console.log(data)
	var myChart2 = echarts.init(document.getElementById('ygjyjiegou'));
	option = {
	    tooltip : {
	        trigger: 'item',
	        show:true,
	        formatter:function(params){
        	return	'<div class="shizhi_tips">'+
						'<span class="shizhi_time">'+params.seriesName+'</span>'+
						'<div class="types_one">'+
							'<span class="zong_shizhi">'+params.name+'：</span>'+
							'<span class="shuju2">'+params.value+'('+params.percent+'%)</span>'+
							'<div class="clr"></div>'+
						'</div>'+
					'</div>';	
	        }
	    },
	    color:["rgba(98,166,242,.9)","rgba(98,166,242,.7)","rgba(98,166,242,.6)","rgba(98,166,242,.5)","rgba(98,166,242,.4)"],
	    series : [
	        {
	            name: '员工教育结构',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '50%'],
	            label:{
	            	normal:{
	            		show:true,
	            		formatter:function(params){
	            			return params.name+'\n('+params.value+')';
	            		},
	            		textStyle:{
	            			color:'#333',
	            			fontSize:14
	            		}
	            	}
	            },
	            data:data/*[
	                {value:335, name:'专科'},
	                {value:310, name:'专科以下'},
	                {value:234, name:'博士'},
	                {value:135, name:'硕士'},
	                {value:1548, name:'本科'}
	            ]*/
//	            itemStyle: {
//	                emphasis: {
//	                    shadowBlur: 10,
//	                    shadowOffsetX: 0,
//	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
//	                }
//	            }
	        }
	    ]
	};

	 myChart2.setOption(option);
	 window.onresize = myChart2.resize;
}

//绘制员工变动图
function myChartBd(data,nameData){
	var dateData = [];
	var time = "";
	var totalData = [];
	 var totalNumVal = 0;
	$(data).each(function(index,item){
		if(time != this.reportPeriod){
			if(time != ''){
				if(totalNumVal == 0){
					totalData.push(null);
				}else{
					totalData.push(totalNumVal);
				}
				totalNumVal = 0;
			}
			time = this.reportPeriod;
			dateData.push(time);
			
			totalNumVal = totalNumVal + parseInt(this.number);
		}else{
			totalNumVal = totalNumVal + parseInt(this.number);
			if(index == (data.length - 1)){
				if(totalNumVal == 0){
					totalData.push(null);
				}else{
					totalData.push(totalNumVal);
				}
				totalNumVal = 0;
			}
		}
	})
	var myChart=echarts.init(document.getElementById("fxqk_bod_echar_info"));
	 option = {
		tooltip : {
			trigger: 'axis',
			// axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			// 	type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			// }
		},
		color:["rgba(98,166,242,.3)","rgba(98,166,242,.4)","rgba(98,166,242,.5)","rgba(98,166,242,.6)","rgba(98,166,242,.7)","rgba(98,166,242,.8)","rgba(98,166,242,.9)","rgba(98,166,242,1.0)"],
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		yAxis:  [
			{
//			type:'直接访问',
			type: 'value'
			
		},
		{
//			type:'直接访问',
			type: 'value'
			
		}
		],
		xAxis: {
			type: 'category',
			data: dateData/*['2015年度期初','2015年度期末','2016年半年度']*/
		},
		series: [
			/*{
				name: '技术人员',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'insideRight',
						formatter:function(params){
							
							return params.seriesName+":"+params.data;
						}
					}
				},
				data: [320, 302, 301]
			},
			{
				name: '销售人员',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'insideRight',
						formatter:function(params){
							
							return params.seriesName+":"+params.data;
						}
					}
				},
				data: [120, 132, 101]
			},
			{
				name: '生产人员',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'insideRight',
						formatter:function(params){
							
							return params.seriesName+":"+params.data;
						}
					}
				},
				data: [220, 182, 191]
			},
			{
				name: '行政管理人员',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'insideRight',
						formatter:function(params){
							
							return params.seriesName+":"+params.data;
						}
					}
				},
				data: [150, 212, 201]
			},
			{
				name: '员工',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter:function(params){
							console.log(params);
							return params.seriesName+":"+params.data;
						}
					}
				},
				data: [150, 320, 1320]
			},*/
		]
	};
	 
	 $(nameData).each(function(){
		 var time = "";
		 var valData = [];
		 var numVal = 0;
		 var name = this.typeName;
			$(data).each(function(index,item){
				if(time != this.reportPeriod){
					if(time != ""){
						if(numVal == 0){
							valData.push(null);
						}else{
							valData.push(numVal);
						}
						numVal = 0;
					}
					time = this.reportPeriod;
					
					if(name == this.categoryName){
						numVal = numVal + parseInt(this.number);
					}
				}else{
					if(name == this.categoryName){
						numVal = numVal + parseInt(this.number);
					}
					if(index == (data.length - 1)){
						if(numVal == 0){
							valData.push(null);
						}else{
							valData.push(numVal);
						}
						numVal = 0;
					}
				}
			})
			
		 var serData = {
					name: name,
					type: 'bar',
					stack: '总量',
					barMaxWidth:100,
					label: {
						normal: {
							show: true,
							position: 'insideRight',
							formatter:function(params){
								//console.log(params);
								return params.seriesName+":"+params.data;
							},
							textStyle:{
								color:"#666"
							}
						}
					},
					data: valData/*[150, 320, 1320]*/
				};
		 
		 option.series.push(serData);
	 })

	 var serData = {
				name: '员工人数',
				type: 'line',
				stack: '总量',
				yAxisIndex:1,
				symbol:'circle',
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter:function(params){
							//console.log(params);
							return params.seriesName+":"+params.data;
						}
					}
				},
				data: totalData/*[150, 320, 1320]*/
			};
	 option.series.push(serData);
	 // 使用刚指定的配置项和数据显示图表。
	
	 myChart.setOption(option);
	 window.onresize = myChart.resize;
}

/**
 * 查询团队信息
 */
function findTeam(){
	var wnResult = [];
	$.axs("/betaInvest/staffSituation/findStaffForSurvey.do",{stockCode:stockCode},false,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData);
			if(data.retData.wnList != null){
				wnResult = data.retData.wnList;
				var currentWnData = [];
				$(data.retData.wnList).each(function(){
					if(this.isCurrent == '1'){
						var cwd = {value:this.number , name:this.categoryName};
						currentWnData.push(cwd);
					}
				})
				//绘制工作性质分类图
				myChartXz(currentWnData);
			}
			if(data.retData.deuList != null){
				var currentEduData = [];
				$(data.retData.deuList).each(function(){
					if(this.isCurrent == '1'){
						var ced = {value:this.number , name:this.categoryName};
						currentEduData.push(ced);
					}
				})
				//绘制教育分类图
				myChartJy(currentEduData);
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	
	$.axs("/betaInvest/staffSituation/findTypeName.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			//console.log(data.retData);
			if(data.retData != null && data.retData != ""){
				myChartBd(wnResult,data.retData);
			}
//			员工
			$(".n_teamdbox").hide();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});


}

/**
 * 查询发行情况
 */
function findPlacement(){
	$.axs("/betaInvest/private/findPlacementForSurvey.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData);
			if(data.retData != null && data.retData.length > 0){
				var fxHtml = "";
				
				$(data.retData).each(function(index,item){
					if(index == 0){
						$("#fxUpTime").text("更新时间:"+((this.updateTime) == null ? "--" : (this.updateTime)));
					}
					fxHtml += "<tr>"
									+"<td>"+(this.dateTime == null ? "--" : this.dateTime)+"</td>"
									+"<td>"+(this.newPrice == null ? "--" : (this.newPrice).toFixed(2))+"</td>"
									+"<td>"+(this.privatePrice == null ? "--" : (this.privatePrice).toFixed(2))+"</td>"
									+"<td>"+(this.premiumRate == null ? "--" : (this.premiumRate).toFixed(2))+"</td>"
									+"<td>"+(this.financingRatio == null ? "--" : (this.financingRatio).toFixed(2))+"</td>"
									+"<td>"+(this.raisePrice == null ? "--" : (this.raisePrice).toFixed(2))+"</td>"
									+"<td>"+(this.privateNum == null ? "--" : (this.privateNum).toFixed(2))+"</td>";
					
					var schedule = "";
					if(this.schedule == 1){
						schedule = "董事会通过";
					}else if(this.schedule == 2){
						schedule = "股东大会通过";
					}else if(this.schedule == 3){
						schedule = "停止实施";
					}else if(this.schedule == 4){
						schedule = "股东大会未通过";
					}else if(this.schedule == 5){
						schedule = "证监会核准";
					}else if(this.schedule == 6){
						schedule = "实施中";
					}else if(this.schedule == 7){
						schedule = "发行失败";
					}else if(this.schedule == 8){
						schedule = "已完成定向增发";
					}
					//console.log(this.purchaser.length)
					fxHtml += "<td>"+schedule+"</td>"
							+"<td>"+((this.schedule != 8 || this.purchaser == null || this.purchaser == "" || this.purchaser.length <=2) ? "--" : "<a href='javascript:;' onclick='showFx("+this.purchaser+")'>查看</a>")+"</td>"
							+"</tr>";
				})
				$("#fxTbody").html(fxHtml);
			}else{
				$("#fxTbody").html("<tr><td colspan='9' >暂无数据</td></tr>");
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 显示发行对象信息
 * @param data
 */
function showFx(data){
	$(".n_fxqk_tc_tc").addClass("on");	
	var fxDxHtml = "";
	$(data).each(function(index,item){
		fxDxHtml += "<tr>"
					+"<td class='fax_xuhao'>"+(index + 1)+"</td>"
					+"<td>"+this.ORGNAME+"</td>"
					+"<td>"+this.ORGTYPE+"</td>"
					+"<td>"+(this.F005N_STK236==null?"--":(Number(this.F005N_STK236)).toFixed(2))+"</td>"
					+"<td>"+(this.F001N_STK236==null?"--":(Number(this.F001N_STK236)).toFixed(2))+"</td>"
					+"<td>"+(this.F005N_STK236*this.F001N_STK236).toFixed(2)+"</td>"
					+"</tr>";
	})
	$("#fxdxTbody").html(fxDxHtml);
}

/**
 * 查询公司大事
 */
function findCompanyEvents(pageNum,pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=10;
	}
	if(pageNum==1){
		$("#page").remove();
		$(".n_big_table").after('<div id="page" class="pages pagination " style="display: none;"></div>')
	}
	$.axs("/betaInvest/companyEvent/findEventForSurvey.do",{pageNum:pageNum,pageSize:pageSize,stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData.eventForSurvey != null && data.retData.eventForSurvey != ""){
				var eventHtml = "";
				$(data.retData.eventForSurvey).each(function(){
					eventHtml += "<tr>"
								+"<td class='n_big_time'>"+this.announcementDate+"</td>"
								+"<td class='n_big_type'>"+this.eventType+"</td>";
					var showAnnouncementName = this.announcementName;
//					if((this.announcementName).length > 17){
//						showAnnouncementName = (this.announcementName).substring(0,17) + "...";
//					}
					eventHtml += "<td title="+this.announcementName+"><a href='javascript:;' onclick='downloadPdf(\""+encodeURIComponent(this.announcementUrl)+"\")'>"+showAnnouncementName+"</a></td></tr>";
				})
				$("#eventTbody").html(eventHtml);
				if((data.retData.total)<=pageSize){
					$('#page').hide();
				}else{
					$('#page').show();
				}
				//分页
				
				$('#page').pagination({
					total: data.retData.total,
					pageSize: pageSize,
					current: pageNum,
//					layout:['list','sep','first','prev','links','next','last','sep','refresh'],
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						findCompanyEvents(pageNumber,size);
					}
				});
				//修改分页文字
				setPageText2('page');
			}else{
				$("#eventTbody").html("<tr><td colspan='3'>暂无数据</td></tr>");
				$('#page').hide();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询经营情况
 */
function findOperatingConditions(){
	$.axs("/betaInvest/operatingConditions/findOperatingConditions.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){

//			console.log("经营情况：" + data.retData.oc);

			var result=data.retData;
			//主营业务
			var oMBList = result.mb;
			//主要客户
			var oMCList = result.oc;
			//主营业务
			if(oMBList.length!=0&&oMBList!=null){
				
				$("#opUpTime").text("更新时间:" + (oMBList[0].updateTime == null ? "--" : oMBList[0].updateTime));
				var time ="";
				var project ="";
				var trNum = 1;
				var projectNum = 1;
				var isSameProject = false;
				var isSameTime = false;
				var temp = false;
				$.each(oMBList,function(index,item){
					isSameProject = (item.mainbusinesssituation == project);
					isSameTime = (item.time == time);
					if(!isSameTime){
						time =item.time;
						$("#mainBusinessHead").append('<th colspan="2" class="jiny_nd" scope="col">'+(time == null ? "--" : time)+'</td>')
						$("#mainBusinessCenter").append('<th class="jiny_jine">金额（万元）</th><th class="jine_zb">比例(%)</th>')
					}
					if(!isSameProject){
						if(index == 0){
							$("#mainBusinessTBody").append('<tr id='+trNum+'><td class="jiny_mc">'+item.mainbusinesssituation+'</td>');
							trNum++;
						}
						if(!isSameTime){
							if(index != 0){
								temp = true;
							}
							projectNum = 1;
							$("#"+projectNum).append('<td>'+(item.amountmoney==null?"--":(item.amountmoney/10000.00).toFixed(2))+'</td><td>'+item.proportion.toFixed(2)+'%</td></tr>');
							projectNum++;
						}else{
							if(temp){
								$("#"+projectNum).append('<td>'+(item.amountmoney==null?"--":(item.amountmoney/10000.00).toFixed(2))+'</td><td>'+item.proportion.toFixed(2)+'%</td></tr>');
								projectNum++;
							}else{
								$("#mainBusinessTBody").append('<tr id='+trNum+'><td class="jiny_mc">'+item.mainbusinesssituation+'</td>'
										+'<td>'+(item.amountmoney==null?"--":(item.amountmoney/10000.00).toFixed(2))+'</td>'
										+'<td>'+item.proportion.toFixed(2)+'%</td>'
										+'</tr>');
								trNum++;
							}
						}
					}
				});
			}else{
				$("#mainBusinessTBody").append("<tr><td>暂无数据</td></tr>");
			}
			
			//主要客户	
			if(oMCList!=null&&oMCList.length!=0){
				$("#opUpTime").text("更新时间:" + (oMCList[0].updateTime == null ? "--" : oMCList[0].updateTime));
				var ocHtml = "";
				$.each(oMCList,function(){
					ocHtml += "<tr>"
							+"<td class='jiny_mc'>"+this.customerName+"</td>"
							+"<td>"+(this.salesAmount==null?"--":((this.salesAmount)/10000.00).toFixed(2))+"</td>"
							+"<td>"+(this.operatingIncome==null?"--":((this.operatingIncome)/10000.00).toFixed(2))+"</td>"
							+"</tr>";
				});
				$("#ocTbody").html(ocHtml);
			}else{
				$("#ocTbody").html("<tr><td colspan='3' >暂无数据</td></tr>");
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

