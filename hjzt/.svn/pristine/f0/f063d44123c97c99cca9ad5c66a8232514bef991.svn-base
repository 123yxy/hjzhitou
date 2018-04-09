/**
 * 高管和股东模块
 */
var stockCode = getUrlParam("stockcode");
var type = getUrlParam("type");
var dtContent = getUrlParam("content");
var tj = getUrlParam("tj");
var pageNum = 1;
var pageTotal = ""; //总页数
$(function(){
	
	/**
	 * 判断是否加载此模块
	 */
	if(dtContent != null && dtContent != ""){
		if($.trim(dtContent.split(",")[0]) != null && $.trim(dtContent.split(",")[0]) != ""){
			loadDTData($.trim(dtContent.split(",")[0]), 10);
		}else{
			blockDiv.content_gdcg = false; //单个
			blockDiv.content_sbgs = false; //多个
			$(".gudong_infor").hide();
			$(".sanb_company_geren").parent().hide();
		}
	}else{
		blockDiv.content_gdcg = false;
		blockDiv.content_sbgs = false;
		$(".gudong_infor").hide();
		$(".sanb_company_geren").parent().hide();
	}
	
	/**
	 * 加载更多
	 */
	$("#dtSearchMore").click(function(){
		if($(this).text() != "没有更多的数据"){
			loadDTData(dtContent.split(",")[0], 10);
			if(pageTotal <= pageNum){
				$("#dtSearchMore").text("没有更多的数据");
			}
		}
	})
	//点击持股信息中图表的收起
	$(".chigu_num .gr_xiangxi_infor").on("click",function(){
		if($("#isHaveChart").text() != "-"){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(this).find("span").text("展开");
				$(this).parents(".chigu_bianhua").find(".chigu_qk").hide();
				if($("#isHaveGDJL").text() != "-"){
					$(this).parents(".gudong_infor").find(".jianli_infor").show();
					$("#isHaveGDJL").parent().addClass("on");
					$("#isHaveGDJL").text("收起");
				}
			}else{
				$(this).addClass("on");
				$(this).find("span").text("收起");
				$(this).parents(".chigu_bianhua").find(".chigu_qk").show();
				if($("#isHaveGDJL").text() != "-"){
					$(this).parents(".gudong_infor").find(".jianli_infor").hide();
					$("#isHaveGDJL").parent().removeClass("on");
					$("#isHaveGDJL").text("简历");
				}
			}
		}
	})
	
	
	//点击持股信息中的简历
	$(".serach_info_box").delegate(".gudong_jinli","click",function(e){
		if($("#isHaveGDJL").text() != "-"){ //没有简历的时候不执行这个操作
			if($(this).hasClass("on")){
				$(this).removeClass("on").find("span").text("简历");
				$(this).parent().parent().removeClass("on");
				$(this).parent().parent().find(".jianli_infor").hide();
				if($("#isHaveChart").text() != "-"){
					$(".chigu_qk").show();
					$(".chigu_num .gr_xiangxi_infor").find("span").text("收起");
					$(".chigu_num .gr_xiangxi_infor").addClass("on");
				}
			}else{
				$(this).addClass("on").find("span").text("收起");
				$(this).parent().parent().addClass("on");
				$(this).parent().parent().find(".jianli_infor").show();
				
				if($("#isHaveChart").text() != "-"){
					$(".chigu_qk").hide();
					$(".chigu_num .gr_xiangxi_infor").find("span").text("展开");
					$(".chigu_num .gr_xiangxi_infor").removeClass("on");
				}
				
			}
		}
		e.stopPropagation();
	})
	//点击三板信息的股东的信息的简历展开对应的简历
	$(".serach_info_box").delegate(".geren_jianli","click",function(){
		if($(this).children("span").text() != "-"){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(this).find("span").text("简历");
				$(this).parent().parent().parent().find(".jianli_infor").hide();
			}else{
				$(".serach_info_box .geren_jianli").each(function(){
					if($(this).find("span").text() != "-"){
						$(this).find("span").text("简历");
						$(this).find("span").parent().removeClass("on");
					}
				})
//				$(".serach_info_box .geren_jianli").find("span").text("简历");
//				$(".serach_info_box .geren_jianli").find("span").parent().removeClass("on");
				$(this).addClass("on");
				$(this).find("span").text("收起");
				$(this).parent().parent().parent().find(".jianli_infor").show();
				$(this).parent().parent().parent().siblings().find(".jianli_infor").hide();
			}
		}
	})
	
	//点击跳转公司详情页
	$("#dtShowCompany").click(function(){
		window.open("/businessDetails/newTBindex.html?stockCode=" + $(this).attr("data-code") + "&stockName=" + $(this).attr("data-name"));
	})
})

/**
 * 加载高管和股东数据
 */
function loadDTData(searchStr, pageSize){
	//正在加载添加及显示star
	var logding='<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
	$("#dtInformationDiv").prepend(logding);
	$("#dtInformationDiv").find(".loadingBox2").show();
	$("#content_gdcg").prepend(logding);
	$("#content_gdcg").find(".loadingBox2").show();
	//console.log("a")
	$("[name='searchStr']").text(searchStr);
	$.axs("/betaInvest/searchDT/findDTList.do",{searchStr:searchStr, pageNum:pageNum, pageSize:pageSize},true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
//			console.log(data.retData);
			if(result.total == 0){
				blockDiv.content_gdcg = false; //单个
				blockDiv.content_sbgs = false; //多个
				$(".gudong_infor").hide();
				$(".sanb_company_geren").parent().hide();
				$("#changeValue").change();
				return false;
			}
			pageTotal = result.pageTotal;
			var dtInfo = result.dtList[0];
			
			if(result.isOneCompany){ //为一家公司的时候加载行情
				initQuotaionData(dtInfo.stockCode);
			}

			if(result.total == 1){
				$("#dtGDUpdateTime").text(dtInfo.updateTime);
//				var dtInfo = result.dtList[0];
				blockDiv.content_sbgs = false; //多个
				$("#changeValue").change();
				$(".sanb_company_geren").parent().hide();
				$("#dtShowCompany").attr("data-code", dtInfo.stockCode);
				$("#dtShowCompany").attr("data-name", dtInfo.stockName);
				$("#dtShowCompany").text(dtInfo.stockName + "（"+ dtInfo.stockCode +"）");
				$("#dtPosition").text((dtInfo.position == null || dtInfo.position == "") ? "--" : (dtInfo.position.length > 13 ? (dtInfo.position.substring(0,13) + "...") : dtInfo.position));
				$("#dtPosition").attr("title",((dtInfo.position == null || dtInfo.position == "") ? "--" : dtInfo.position));
				$("#dtTenure").text((dtInfo.tenure == null || dtInfo.tenure == "") ? "--" : dtInfo.tenure);
				$("#dtHoldInfo").text(((dtInfo.holdCount == null || (dtInfo.holdCount == "" && dtInfo.holdCount != 0)) ? "--" : ((dtInfo.holdCount/10000).toFixed(2)) + "（万股）")+"（"+((dtInfo.holdRatio == null || (dtInfo.holdRatio == "" && dtInfo.holdRatio != 0)) ? "--" : (dtInfo.holdRatio.toFixed(2) + "%"))+"）");
				
				if(dtInfo.dtType == 2){ //判断是否为十大股东
					$("#isHaveGDJL").text("-");
				}
				
				$("#dtDiName").text((dtInfo.diName == null || dtInfo.diName == "") ? "--" : dtInfo.diName);
				$("#dtSex").text((dtInfo.sex == null || dtInfo.sex == "") ? "--" : dtInfo.sex);
				$("#dtAge").text((dtInfo.age == null || dtInfo.age == "") ? "--" : dtInfo.age);
				$("#dtNationality").text((dtInfo.nationality == null || dtInfo.nationality == "") ? "--" : dtInfo.nationality);
				$("#dtLivingPlace").text((dtInfo.livingPlace == null || dtInfo.livingPlace == "") ? "--" : dtInfo.livingPlace);
				
				//教育经历
				var edJl = "<b class='infor_yd'></b><li class='jiben_titles'><span>教育经历</span></li>";
				if(dtInfo.edExperience != null && dtInfo.edExperience != ""){
					var splitED = dtInfo.edExperience.split(";");
					$(splitED).each(function(){
						edJl += "<li><span>"+this+"</span></li>";
					})
				}else{
					edJl = "<li><span>暂无</span></li>";
				}
				$("#gdJYJL").html(edJl);
				
				//创业经历
				var workJl = "<b class='infor_yd'></b><li class='jiben_titles'><span>任职经历</span></li>";
				if(dtInfo.workExperience != null && dtInfo.workExperience != ""){
					var splitWork = dtInfo.workExperience.split(";");
					$(splitWork).each(function(){
						workJl += "<li><span>"+this+"</span></li>";
					})
				}else{
					workJl = "<li><span>暂无</span></li>";
				}
				$("#gdCYJL").html(workJl);
				//console.log(dtInfo.holdChangeStr)
				if(dtInfo.holdChangeStr == null ||
						dtInfo.holdChangeStr == "" || 
						dtInfo.holdChangeStr == "不变" || 
						dtInfo.holdChangeStr == "新进" || 
						dtInfo.holdChangeStr == "退出"){ //近期持股变化
					$("#gdJQCGBH").html("近期持股变化：<span class='bubian'>--</span>");
				}else if(dtInfo.holdChangeStr > 0){
					$("#gdJQCGBH").html("近期持股变化：<span class='zengchi'>增持</span>");
				}else if(dtInfo.holdChangeStr < 0){
					$("#gdJQCGBH").html("近期持股变化：<span class='jianchi'>减持</span>");
				}
			}else{
				pageNum++;
				if(pageNum <= pageTotal){
					$("#dtSearchMore").text("加载更多");
				}
				blockDiv.content_gdcg = false; //单个
				$("#changeValue").change();
				$(".gudong_infor").hide();
				var informationHtml = "";
				var holdFlag = false; //是否持股
				$(result.dtList).each(function(i, item){
					holdFlag = false;
					if(item.holdCount != null && item.holdCount != "" && item.holdCount != 0){
						holdFlag = true;
					}
					informationHtml += "<div class='geren_list on'>" +
										"<div class='information_geren'>" +
											"<ul>" +
												"<li class='gs_inform'>" +
													"<span>所属公司：<a class='suoshu_gs' href='/businessDetails/newTBindex.html?stockCode=" + item.stockCode + "&stockName=" + item.stockName +"'>"+item.stockName+"（"+item.stockCode+"）</a></span>";
//					if(holdFlag){
						informationHtml += "<span>股东排名：<em>"+((item.sort == null || item.sort == "") ? "-" : item.sort)+"</em></span>";
//					}
					
					informationHtml += 			"</li> " +
												"<li class='chigu_number'> " +
													"<span>性别：<em>"+((item.sex == null || item.sex == "") ? "--" : item.sex)+"</em></span>";
					if(holdFlag){
						informationHtml += "<span>持股数量：<em>"+((item.holdCount == null || (item.holdCount == "" && item.holdCount != 0)) ? "--" : ((item.holdCount/10000).toFixed(2)) + "（万股）")+"</em></span>";
					}
					
					informationHtml +=			"</li>" +
												"<li class='cs_nianfen'>" +
													"<span>年龄：<em>"+((item.age == null || item.age == "") ? "--" : item.age)+"</em></span>";
					if(holdFlag){
						informationHtml += "<span>持股比例：<em>"+((item.holdRatio == null || (item.holdRatio == "" && item.holdRatio != 0)) ? "--" : (item.holdRatio.toFixed(2) + "%"))+"</em></span>";
					}
					
					informationHtml +=			"</li>" +
												"<li class='zhiwu'>" +
													"<span>职务：<em title="+((item.position == null || item.position == "") ? "--" : item.position)+" >"+((item.position == null || item.position == "") ? "--" : (item.position.length > 9 ? (item.position.substring(0,8) + "...") : item.position))+"</em></span>";
					if(holdFlag){
						informationHtml += "<span>持股市值：<em>"+((item.CGSZ == null || (item.CGSZ == "" && item.CGSZ != 0)) ? "--" : ((item.CGSZ/10000).toFixed(2)) + "（万元）")+"</em></span>";
					}
					informationHtml +=			"</li>" +
												"<li class='renzhi_shijian'>" +
													"<span>任职时间：<em>"+((item.tenure == null || item.tenure == "") ? "--" : item.tenure.replace(/\s/g,""))+"</em></span>" +
													"<span>更新时间：<em>"+((item.updateTime == null || item.updateTime == "") ? "--" : item.updateTime)+"</em></span>" +
												"</li>" +
												"<li class='geren_jianli'>" +
													"<span>"+(item.dtType == 2 ? "-" : "简历")+"</span>" +
												"</li>" +
												"<div class='clr'></div>" +
											"</ul>" +
										"</div>" +
										"<div class='jianli_infor' style='display: none;'>" +
											"<em class='jianli_sj'></em>" +
											"<div class='jianli_content'>" +
												"<div class='jiben_xinx infor_public'>" +
													"<ul>" +
														"<b class='infor_yd'></b>" +
														"<li class='jiben_titles'><span>基本信息</span></li>" +
														"<li class='zw_list'>" +
															"<span>姓名：<em>"+((item.diName == null || item.diName == "") ? "--" : item.diName)+"</em></span>" +
															"<span>性别：<em>"+((item.sex == null || item.sex == "") ? "--" : item.sex)+"</em></span>" +
															"<span>年龄：<em>"+((item.age == null || item.age == "") ? "--" : item.age)+"</em></span>" +
															"<span>国籍：<em>"+((item.nationality == null || item.nationality == "") ? "--" : item.nationality)+"</em></span>" +
															"<span>现居地：<em>"+((item.livingPlace == null || item.livingPlace == "") ? "--" : item.livingPlace)+"</em></span>" +
															"<div class='clr'></div>" +
														"</li>" +
													"</ul>" +
												"</div>" +
												"<div class='jiaoyu_jl infor_public'>" +
													"<ul>" +
														"<b class='infor_yd'></b>" +
														"<li class='jiben_titles'><span>教育经历</span></li>";
					if(item.edExperience != null && item.edExperience != ""){
						var splitED = item.edExperience.split(";");
						$(splitED).each(function(){
							informationHtml += "<li><span>"+this+"</span></li>";
						})
					}else{
						informationHtml += "<li><span>暂无</span></li>";
					}
					informationHtml +=		 		"</ul>" +
												"</div>" +
												"<div class='cy_jl infor_public'>" +
													"<ul>" +
														"<li>" +
															"<b class='infor_yd'></b>" +
															"<li class='jiben_titles'><span>任职经历</span></li>";
					if(item.workExperience != null && item.workExperience != ""){
						var splitWork = item.workExperience.split(";");
						$(splitWork).each(function(){
							informationHtml += "<li><span>"+this+"</span></li>";
						})
					}else{
						informationHtml += "<li><span>暂无</span></li>";
					}
					informationHtml +=					"</li>" +
													"</ul>" +
												"</div>" +
												"<div class='clr'></div>" +
											"</div>" +
										"</div>" +
									"</div>";
				})
				
				$("#dtInformationDiv").append(informationHtml);
			}
			
			//持股数图
			if(result.hisList != null && result.hisList.length > 0){
				var chartFlag = false;
				$(result.hisList).each(function(i, item){
					if(item.holdCount != null && item.holdCount != "" && item.holdCount > 0){
						chartFlag = true;
					}
				})
				if(chartFlag){
					var dates = []; //日期
					var holds = []; //持股数量
					var ratio = []; //持股比例
					var zjl = []; //持股增减量
					//, name:"当前持股比例：\n" + (holdRatio + "%")
					var holdRatio = ((dtInfo.holdRatio == null || dtInfo.holdRatio == "") ? 0 : dtInfo.holdRatio.toFixed(2));
					var bData = [//holdRatio,(100 - holdRatio)
					                {value:holdRatio,name:"当前持股比例\n"+holdRatio+"%"},
					                {value:(100 - holdRatio),name:"其他占比"}
					            ];
					$(result.hisList).each(function(i, item){
						dates.push(item.noticeDate);
						holds.push((item.holdCount == null || item.holdCount == "") ? 0 : (item.holdCount/10000).toFixed(2));
						ratio.push((item.holdRatio == null || item.holdRatio == "") ? 0 : item.holdRatio.toFixed(2));
						zjl.push((item.holdChangeDou == null || item.holdChangeDou == "") ? 0 : (item.holdChangeDou/10000).toFixed(2));
					})
					//股东持股情况
					shareholdingSituation(dtInfo.diName, dates, holds, ratio, zjl, bData);
				}else{
					$("#isHaveChart").text("-");
					$("#chigu_tubiao").hide();
				}
			}else{
				$("#isHaveChart").text("-");
				$("#chigu_tubiao").hide();
			}
			$("#dtInformationDiv").find(".loadingBox2").hide();
			$("#content_gdcg").find(".loadingBox2").hide();
		}else{
//			errorAlert(data.retCode, "数据飞走了，请重试~");
		}
	});
}

//股东持股的图表
function shareholdingSituation(name, dates, holds, ratio, zjl, bData){
	var mychart=echarts.init(document.getElementById("chigu_tubiao"));
	var option={
		color: ['#feb535'],
		grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    legend:{
	    	show:true,
	    	data:[name + "-持股变化趋势"],
	    	textStyle:{
	    		color:"#666",
	    		fontSize:12 
	    	}
	    },
	     tooltip:{
	    	show:true,
	    	trigger: 'axis',
	    	position:"top",
	    	formatter:function(params){
	    		return	'<div class="caiwu_tips">'+
							'<h2>'+params[0].name+'</h2>'+
							'<div class="tips_list">'+
								'<ul>'+
									'<li>'+
										'<span>当前持股比例</span>'+
										'<em>'+ratio[params[0].dataIndex]+'%</em>'+
										'<div class="clr"></div>'+
									'</li>'+
									'<li>'+
										'<span>持股数量（万）</span>'+
										'<em>'+params[0].data+'</em>'+
										'<div class="clr"></div>'+
									'</li>'+
									'<li>'+
										'<span>持股增减量（万）</span>'+
										'<em>'+zjl[params[0].dataIndex]+'</em>'+
										'<div class="clr"></div>'+
									'</li>'+
								'</ul>'+
							'</div>'+
						'</div>';	
	    	}
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : dates,
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	     series : [
	        {
	            name: name + '—持股变化趋势',
	            type:'line',
	            symbol: 'circle',
	            data:holds
	        },
	        {
	            name:'',
	            startAngle:90,
	            type:'pie',
	           /* tooltip : {
	                trigger: 'item',
	                formatter: '{b} : {d}%'
	            },*/
	            center: ['85%','50%'],
	            radius : ['20%', '40%'],
	            color:["#2789df","#d4e7f9"],
//	            labelLine:{
//	            	normal:{
//	            		show:false
//	            	}
//	            },
	            label:{
	            	normal:{
	            		show:true,
	            		position:'outside',
	            		textStyle:{
	            			color:"#666"
	            		}
	            	},
	            	emphasis:{
	            		show:true,
	            	}
	            },
	            data:bData
	        }
	    ]
	}
	mychart.setOption(option);
	window.addEventListener("resize",function(){
		mychart.resize();
	})
}