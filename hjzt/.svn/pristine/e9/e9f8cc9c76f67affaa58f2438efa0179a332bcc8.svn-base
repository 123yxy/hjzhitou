$(function(){
	//查询所有行业
	findCategory();
	//查询地区
	findArea();
	//用户关注的行业
	findUser();
	//交易指数
	fingIndex();
	//融资数据
	changParamRongZi();
	//融资排行
	changParamRongZiPaihang(1,20);     
     //点击选择条件
     $(".rz_tiaojian p").on("click",function(){
     	$(".jiabeijing").show();
     	$(this).parent().find("ul").slideDown();
     })
     $(".jiabeijing").on("click",function(){
     	$(".rz_tiaojian ul").slideUp();
     	$(".jiabeijing").hide();
     })
     $(".rz_tiaojian").delegate("li","click",function(){
     	$(this).parents(".rz_tiaojian").find("p").text($(this).find("a").text());
//     	console.log($(this).find("a").eq(0).attr("data-value"));
     	$(this).parents(".rz_tiaojian").find("p").eq(0).attr("data-value",$(this).find("a").eq(0).attr("data-value"));
     	$(this).parent().slideUp();
     	var idName=$(this).parent().parent().parent().attr("id");
     	if(idName=="rongzishuju"){
     		//调用融资数据
     		changParamRongZi();
     	}else if(idName=="rongzipaihang"){
     		//调用融资排行方法
     		changParamRongZiPaihang(1,20);
     	}
     	$(".jiabeijing").hide();
     });
     //点击选择行业查看数据
     $(".new_small_pdbox .hy_public").on("click",function(){
     	var flag=0;
		$(".new_small_pdbox .hy_public").each(function(index,item){
			if($(item).find("em").hasClass("on")){
				flag++;
     		}
		})
 		if($(this).find("em").hasClass("on")){
 			if(flag==3){
 				errorAlert("","至少选择3个行业");
 				return false;
 			}
 			$(this).find("em").removeClass("on");
 			$(this).find(".hy_icons").find("i").removeClass("on");
 		}else{
 			$(this).find("em").addClass("on");
 			$(this).find(".hy_icons").find("i").addClass("on");
 		}
		updateUserShow();
     });
     //弹窗里的关注行业
     $(".indexhy_tc").delegate("div.hy_public","click",function(){
     	var flag=0;
		$(".indexhy_tc .hy_public").each(function(index,item){
			if($(item).find("em").hasClass("on")){
				flag++;
			}
		})
     	if(flag>=6){
     		if($(this).find("em").hasClass("on")){
     			$(this).find("em").removeClass("on");
     			$(this).find(".hy_icons").find("i").removeClass("on");
     		}else{
     			errorAlert("","最多可关注6个行业");
     		}
     		//console.log($(this).find("span").text());
     	}else{
     		if($(this).find("em").hasClass("on")){
     			$(this).find("em").removeClass("on");
     			$(this).find(".hy_icons").find("i").removeClass("on");
     		}else{
     			$(this).find("em").addClass("on");
     			$(this).find(".hy_icons").find("i").addClass("on");
     		}
     	}
     })
     //弹窗里的目的选择
     $(".mudi_public").on("click",function(){
     	if($(this).hasClass("on")){
     		$(this).removeClass("on")
     	}else{
     		$(this).addClass("on")
     	}
     })
     
     //点击弹窗的确定按钮
     $(".hy_shure span").on("click",function(){
    	//更新用户关注的行业
      	updateUser();
//     	var slectHy=[];
//     	$(".indexhy_tc .hy_public").each(function(index,item){
//     		if($(item).find("em").hasClass("on")){
//     			var yixHy=$(this).find("span").text();
//				slectHy[slectHy.length]=yixHy;
//     		}
//     	});
//     	
// 		$(".new_small_pdbox .hy_public").each(function(i,items){
// 			var showText=$(items).find("span").text();
// 			showText=showText.toString();
//   			if($.inArray(showText,slectHy)>=0){
//   				$(items).find("em").addClass("on");
//   				$(items).find(".hy_icons").find("i").addClass("on");
//   			}
//     	})
//		$(".select_hy").hide();
//		$(".tmtc_new2").hide();
//		$("body,html").css("overflow","auto");
    });
     
    //切换指数信息
    $(".zhishu_tab ul li").mouseover(function(){
    	var nx =$(this).index();
    	$(".zhishu_tab ul li").not(this).removeClass("on");
    	$(this).addClass("on");
    	$(".zhishu_info_dbox").find(".zhishu_list").eq(nx).show().siblings().hide();
    });
});


/**
 * 查询首页指数
 */
function fingIndex(){
	$.axs("/betaInvest/threeBoardIndex/findIndex.do",null,true,function(data){
		if(data.retCode=="0000"){
			var resultCZ=data.retData.indexOne;
			var resultZS=data.retData.indexTwo;
			var indexCZ=(data.retData.indexCZ);
			var indexZS=data.retData.indexZS;
			if(resultCZ==null||resultZS==null||indexCZ==null||indexZS==null){
				return false;
			}
			
			var indexHtml="";
			var zsHtml="";
			var czHtml="";
			if(resultZS.priceChangeRatio>=0){
				$("#zsHtml").siblings("span").addClass("red");
				zsHtml+='<em class="red">'+(resultZS.newPrice).toFixed(2)+'</em><i class="red">'+resultZS.priceChangeRatio+'%</i>';
			}else{
				$("#zsHtml").siblings("span").addClass("green");
				zsHtml+='<em>'+(resultZS.newPrice).toFixed(2)+'</em><i>'+resultZS.priceChangeRatio+'%</i>';
			}
			if(resultCZ.priceChangeRatio>=0){
				$("#czHtml").siblings("span").addClass("red");
				czHtml+='<em class="red">'+(resultCZ.newPrice).toFixed(2)+'</em><i class="red">'+resultCZ.priceChangeRatio+'%</i>';
			}else{
				$("#czHtml").siblings("span").addClass("green");
				czHtml+='<em class="green">'+(resultCZ.newPrice).toFixed(2)+'</em><i class="green">'+resultCZ.priceChangeRatio+'%</i>';
			}
			$("#zx_zs").html((resultZS.newPrice).toFixed(2));
			$("#kp_zs").html((resultZS.openPrice).toFixed(2));
			$("#zg_zs").html((resultZS.highPrice).toFixed(2));
			$("#zd_zs").html((resultZS.lowPrice).toFixed(2));
			$("#zdf_zs").html(resultZS.priceChangeRatio+"%");
			//console.log(resultZS.tradingVolume);
			$("#cjl_zs").html((resultZS.tradingVolume/1000000.00).toFixed(2));
			$("#cjl_zs").parent().attr("title","成交量(百万股)");
			$("#cje_zs").html((resultZS.tradingAmount/1000000.00).toFixed(2));
			$("#cje_zs").parent().attr("title","成交额(百万元)");
			$("#zx_cf").html((resultCZ.newPrice).toFixed(2));
			$("#kp_cf").html((resultCZ.openPrice).toFixed(2));
			$("#zg_cf").html((resultCZ.highPrice).toFixed(2));
			$("#zd_cf").html((resultCZ.lowPrice).toFixed(2));
			$("#zdf_cf").html(resultCZ.priceChangeRatio+"%");
			$("#cjl_cf").html((resultCZ.tradingVolume/1000000.00).toFixed(2));
			$("#cjl_cf").parent().attr("title","成交量(百万股)");
			$("#cje_cf").html((resultCZ.tradingAmount/1000000.00).toFixed(2));
			$("#cje_cf").parent().attr("title","成交额(百万元)");
			$("#zsHtml").html(zsHtml);
			$("#czHtml").html(czHtml);
			
			if(resultZS.changeAmount>=0){
				$("#zde_zs").addClass("red").removeClass("green");
			}else{
				$("#zde_zs").addClass("green").removeClass("red");
			}
//			console.log(resultZS.changeAmount);
			$("#zde_zs").html(resultZS.changeAmount);
			if(resultZS.priceChangeRatio>=0){
				$("#zdf_zs").addClass("red").removeClass("green");
				$("#zsHtml").find("i").addClass("red");
			}else{
				$("#zdf_zs").addClass("green").removeClass("red");
				$("#zsHtml").find("i").addClass("green");
			}
			$("#zdf_zs").html(resultZS.priceChangeRatio+"%");
			$("#cjl_zs").html((resultZS.tradingVolume/1000000.00).toFixed(2));
			$("#cjl_zs").parent().attr("title","成交量(百万股)");
			$("#cje_zs").html((resultZS.tradingAmount/1000000.00).toFixed(2));
			$("#cje_zs").parent().attr("title","成交额(百万元)");
			$("#zx_cf").html((resultCZ.newPrice).toFixed(2));
			$("#kp_cf").html((resultCZ.openPrice).toFixed(2));
			$("#zg_cf").html((resultCZ.highPrice).toFixed(2));
			$("#zd_cf").html((resultCZ.lowPrice).toFixed(2));
			if(resultCZ.changeAmount>=0){
				$("#zde_cf").addClass("red").removeClass("green");
			}else{
				$("#zde_cf").addClass("green").removeClass("red");
			}
			$("#zde_cf").html((resultCZ.changeAmount).toFixed(2));
			if(resultCZ.priceChangeRatio>=0){
				$("#zdf_cf").addClass("red").removeClass("green");
//				$("#czHtml").find("i").addClass("red");
			}else{
				$("#zdf_cf").addClass("green").removeClass("red");
//				$("#czHtml").find("i").addClass("green");
			}
			
			var eZS=jQuery.parseJSON(indexZS);
			showChartOne(eZS.tradingAmount,eZS.openPrice,eZS.data);
			var eCZ=jQuery.parseJSON(indexCZ);
			var a=eCZ.tradingAmount;
//			var b=[];
//			$(a).each(function(index,item){
//				
//			})
			
			showChartTwo(a,eCZ.openPrice,eCZ.data);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	
}

/**
 * 三板指数 图表
 * @param tradingVolume 成交量数组
 * @param openPrice 指数数组
 * @param dateTemp 日期数组
 */
function showChartOne(tradingVolume,openPrice,dateTemp){
//	console.log(openPrice)
//	var lowPrice=Math.ceil(openPrice.sort(sortNumber)[0])-5;
//	var higherPrice=Math.ceil(openPrice.sort(sortNumber)[openPrice.length-1])+10;
	//三板成分指数 图表
	var myChart6 = echarts.init(document.getElementById('three_zs'));
	
	option = {
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter:function(params){
	        	//console.log(params)
		        var divHtml='<div class="sanban_tips">'+
	  	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
	  	    					'<div class="sb_tips_content">'+
	  	    						'<span class="tips_leibie fl" style="background-color: #62a6f2;">'+params[0].seriesName+'：</span>'+
	  	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
	  	    						'<div class="clr"></div>'+
	  	    					'</div>'+
	  	    					'<div class="sb_tips_content">'+
	  	    						'<span class="tips_leibie fl" style="background-color: #43bdf5;">'+params[1].seriesName+'：</span>'+
	  	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
	  	    						'<div class="clr"></div>'+
	  	    					'</div>'+
	  	    				'</div>';
                return divHtml;
            }    	
	    },
	   color:['#90b4e6','#5581bf'],
	    legend: {
	        data:['成交额(百万)','指数']
//	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateTemp//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '成交额(百万)',
//	            min: 0,
//	            max: 250,
//	            interval: 50,

	            axisLabel: {
	                formatter: '{value}'
	            }
	        },
	        {
	            type: 'value',
	            name: '指数',
//	            min: lowPrice,
//	            max: higherPrice,
//	            interval: 5,
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	    grid: {
	        left: '3%',
	        right: '1%',
	        containLabel: true
	    },
	    series: [
	    		
	        {
	        	
	            name:'成交额(百万)',
	            type:'bar',
				itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            data:tradingVolume//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	       
	        {
	        	
	            name:'指数',
	            type:'line',
	            symbol:'none',
	            yAxisIndex: 1,
	            itemStyle:{
					normal:{
						color:'#43bdf5'
					}
				
				},
	            data:openPrice//[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	};
	myChart6.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart6.resize();
                });	
}

function showChartTwo(tradingVolume,openPrice,dateTemp){
	//三板成分指数 图表
	var myChart5 = echarts.init(document.getElementById('three_cf'));
	option = {
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter:function(params){
	        	//console.log(params)
		        var divHtml='<div class="sanban_tips">'+
	  	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
	  	    					'<div class="sb_tips_content">'+
	  	    						'<span class="tips_leibie fl" style="background-color: #62a6f2;">'+params[0].seriesName+'：</span>'+
	  	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
	  	    						'<div class="clr"></div>'+
	  	    					'</div>'+
	  	    					'<div class="sb_tips_content">'+
	  	    						'<span class="tips_leibie fl" style="background-color: #43bdf5;">'+params[1].seriesName+'：</span>'+
	  	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
	  	    						'<div class="clr"></div>'+
	  	    					'</div>'+
	  	    				'</div>';
                return divHtml;
            }    	
	    },
	   color:['#90b4e6','#5581bf'],
	    legend: {
	        data:['成交额(百万)','指数']
//	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data:dateTemp// ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '成交额(百万)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	            
	        },
	        {
	            type: 'value',
	            name: '指数',
	            min: 1200,
	            max: 1300,
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '3%',
	        right: '1%',
	        containLabel: true
	    },
	    series: [
	        {
	            name:'成交额(百万)',
	            type:'bar',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            
	            data:tradingVolume//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	       
	        {
	            name:'指数',
	            type:'line',
	            yAxisIndex: 1,
	            itemStyle:{
	            	normal:{
	            		color:'#43bdf5'
	            	}
	            },
	            symbol:'none',
	            data:openPrice//[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	};
	myChart5.setOption(option);
window.addEventListener("resize",function(){
                                      myChart5.resize();
                });	
}

/**
 * 查询融资数据
 */
function changParamRongZi(){
	//切换数据清空掉所有行业已经查询出来的数据
	$(".gs_gonggao").find("em").each(function(){
		$(this).text("--");
	});
	var dateType=$("#rongzishuju").find("p").eq(0).attr("data-value");
	var areaId=$("#rongzishuju").find("p").eq(1).attr("data-value");
	var param={dateType:dateType,areaId:areaId};
	$.axs("/betaInvest/btFinancingData/findBtFinancingData.do",param,true,function(data){
		
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result.length<=0){
				var htm='<div class="zanwu_shuju" style="padding-top:97px"><span></span><p>暂无数据</p></div>'
				$("#rongzi_number").html(htm);	
				return false;
			}
			var totalNum=0;
			var dateTemp=[],newStockNum=[],incidentNum=[],publicNum=[];
//			var htm='';
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				//页面文本数据
				totalNum+=(obj.publicNum==null?0:obj.publicNum);
//				htm+='<li>';
//				htm+='<span class="fl">'+(obj.industryName==null?0:obj.industryName)+'</span>';
//				htm+='<em class="fr shuzi">'+(obj.publicNum==null?0:obj.publicNum)+'</em>';
//				htm+='<div class="clr"></div>';
//				htm+='</li>';
				var publicNumShow=obj.publicNum;
				if(publicNumShow==null || publicNumShow=="" || publicNumShow==undefined || publicNumShow==0){
					publicNumShow="--";
				}
				$("#"+obj.industryId+"_show").text(publicNumShow);
				//画图数据
				//console.log(obj);
				//dateTemp.push(obj.createDate);
				dateTemp.push(obj.industryName);
				newStockNum.push((obj.newStrockNum==null?0:obj.newStrockNum));+
				incidentNum.push((obj.incidentNum==null?0:obj.incidentNum));
				publicNum.push((obj.amount==null?0:(obj.amount).toFixed(2)));
			}
//			$(".gs_gonggao").html(htm);
			$("#totalGonggao").text(totalNum+"篇");
			//融资数据图表
			showChartRongZi(dateTemp,newStockNum,incidentNum,publicNum)
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**	
 * 融资数据柱状图
 */
function showChartRongZi(dateTemp,newStockNum,incidentNum,publicNum){
	var length=Math.floor((4/dateTemp.length)*100);
	//融资数据 图表
	var myChart5 = echarts.init(document.getElementById('rongzi_number'));
	option = {
	    tooltip: {
//	    	show:true,
	        trigger: 'axis',
//	        position:'top'
	        formatter:function(params){
	        	//console.log(params)
	        	var divHtml='<div class="sanban_tips">'+
  	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
  	    					'<div class="sb_tips_content">'+
  	    						'<span class="tips_leibie fl" style="background-color: #66a4e3;">'+params[0].seriesName+'</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
  	    						'<div class="clr"></div>'+
  	    					'</div>'+
  	    					'<div class="sb_tips_content">'+
  	    						'<span class="tips_leibie fl" style="background-color: #ae90db;">'+params[1].seriesName+'</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
  	    						'<div class="clr"></div>'+
  	    					'</div>'+
  	    					'<div class="sb_tips_content">'+
  	    						'<span class="tips_leibie fl" style="background-color: #fcc530;">'+params[2].seriesName+'</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[2].value+'</span>'+
  	    						'<div class="clr"></div>'+
  	    					'</div>'+
  	    				'</div>';
                return divHtml;
	        	//return "<div>"+params[0].name+"<br />新增公司(家)："+params[0].data+"<br />融资事件数(次)："+params[1].data+"<br />融资金额(亿元)："+params[2].data+"</div>";
	        }
	
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {
	            	title:'保存图片',
	            	icon:'image:///saasBeta/images/ave.png'
	            }
	        },
        	top:0,
        	right:'8%',
   		},
	   color:['#66a4e3','#ae90db','#fcc530'],
	   legend:{
//	    	show:true,
	    	data:['新增公司（家）','融资事件数（次）','融资金额（亿元）']
	    },
//	    legend: {
//	        data:['成交额(百万)','指数'],
//	        bottom:10
//	    },
	    xAxis: [
	        {
	            type: 'category',
//	            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        	 data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            //name: '成交额(百万)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
	    dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: length
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end:length
	        }
	    	
	    ],
	    series: [
	        {
	            name:'新增公司（家）',
	            type:'bar',
	            barWidth:'30',
	            label:{
	            	normal:{
	            		show:true,
	            		position:'top'
	            	}
	            },
//	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        	data:newStockNum
	        },
	      {
	            name:'融资事件数（次）',
	            type:'bar',
	            barWidth:'30',
	            label:{
	            	normal:{
	            		show:true,
	            		position:'top'
	            	}
	            },
//	            data:[20.0, 41.9, 15.0, 8.2, 11.6, 50.7, 205.6, 35.2, 68.6, 300.0, 50.4, 9.3]
	        	data:incidentNum
	      },
	       {
	            name:'融资金额（亿元）',
	            type:'bar',
	            barWidth:'30',
	            label:{
	            	normal:{
	            		show:true,
	            		position:'top'
	            	}
	            },
//	            data:[50.0, 60.9, 100.0, 30.2, 110.6, 60.7, 154.6, 72.2, 30.6, 52.0, 110.4, 90.3]
	        	data:publicNum
	        }
	    ]
	};
	//console.log(option)
	myChart5.setOption(option);
	window.addEventListener("resize",function(){
                   myChart5.resize();
                });	
}

/**
 * 查询融资排行
 */
function changParamRongZiPaihang(pageNum,pageSize){
	$("#rongzi_jiner").html('<div class="rz_jine_tu" id="rongzi_jiner"></div>');
	$("#rongzipaihangData").html('');
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=20;
	}
	if(pageNum==1){
		//$("#pages").show();
		$("#pages").remove();
		$(".guapai_table").after('<div class="pages pagination" id="pages"></div>')
	}
	
	$('#pages').hide();
	var dateType=$("#rongzipaihang").find("p").eq(0).attr("data-value");
	var thisDate=new Date();
	var beginDate='';
	var endDate=thisDate.Format("yyyy年MM月dd日");
	if(dateType==1){//近一周
		beginDate=(new Date(thisDate.setDate(thisDate.getDate()-7))).Format("yyyy年MM月dd日");
	}else if(dateType==2){//近一月
		beginDate=(new Date(getDateForMonth(new Date(),-1))).Format("yyyy年MM月dd日");
	}else if(dateType==3){//近一年
		beginDate=(new Date(getDateForYear(new Date(),-1))).Format("yyyy年MM月dd日");
	}else if(dateType==4){//近两年
		beginDate=(new Date(getDateForYear(new Date(),-2))).Format("yyyy年MM月dd日");
	}else if(dateType==5){//近三年
		beginDate=(new Date(getDateForYear(new Date(),-3))).Format("yyyy年MM月dd日");
	}
	$(".rz_paih_time").text(beginDate+"-"+endDate);
	var areaId=$("#rongzipaihang").find("p").eq(1).attr("data-value");
	var param={dateType:dateType,areaId:areaId,pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaInvest/btFinancingDetail/findBtFinancingDetail.do",param,true,function(data){
		if(data.retCode=="0000"){
			var pageData=data.retData;
			if(pageData==null){

				return false;
			}
			var result = pageData.list;
//			console.log(result);
			var totalCount=pageData.totalCount;
			if(result==null || result.length<=0){
				var htm='<div class="zanwu_shuju" style="padding-top:97px"><span></span><p>暂无数据</p></div>'
				var htm2='<tr><td colspan="11"><div class="zanwu_shuju" style="padding-top:97px"><span></span><p>暂无数据</p></div></td></tr>'
				$("#rongzi_jiner").html(htm);	
				$("#rongzipaihangData").html(htm2);
				return false;
			}
			//控制为前200个数据
			if(totalCount>=200){
				totalCount=200;
			}
			var rankingNum=(pageNum-1)*pageSize;
			var dateTemp=[],tradingVolume=[];
			var htm='';
			var stockCodes=[];
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				rankingNum+=1;
				//页面文本数据
				htm+='<tr>';
				htm+='<td class="shuzi">'+rankingNum+'</td>';
				htm+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+obj.stockCode+'&stockName='+obj.stockNm+'">'+obj.stockNm+'('+obj.stockCode+')</a></td>';
				htm+='<td class="shuzi">'+(obj.totalAmount==null?0:obj.totalAmount/10000.00).toFixed(2)+'</td>';
				htm+='<td class="shuzi">'+(obj.maxAmount==null?0:obj.maxAmount).toFixed(2)+'</td>';
				htm+='<td class="shuzi">'+obj.lastDate+'</td>';
				htm+='<td class="shuzi">'+obj.stockDate+'</td>';
				htm+='<td class="shuzi">'+(obj.newPrice==null?0:obj.newPrice).toFixed(2)+'</td>';
				if((obj.priceChangeRatio != null && obj.priceChangeRatio != "") && obj.priceChangeRatio != 0){
					if(obj.priceChangeRatio>0){
						htm+= "<td class='shuzi zhangfu red'>"+obj.priceChangeRatio.toFixed(2)+"%</td>";
					}else{
						htm+= "<td class='shuzi zhangfu lvse'>"+obj.priceChangeRatio.toFixed(2)+"%</td>";
					}
				}else{
					htm+= "<td class='shuzi zhangfu red'>0.00%</td>";
				}
				//htm+='<td class="shuzi">'+(obj.priceChangeRatio==null?0:obj.priceChangeRatio).toFixed(2)+'%</td>';
				htm+='<td class="shuzi">'+(obj.tradingVolume==null?0.00:(obj.tradingVolume/10000.00)).toFixed(2)+'</td>';
				htm+='<td class="shuzi">'+(obj.totalValue==null?0.00:obj.totalValue).toFixed(2)+'</td>';
				htm+='<td class="shuzi">'+(obj.priceEarningRatio==null?0.00:obj.priceEarningRatio).toFixed(2)+'</td>';
				htm+='</tr>';
//				//画图数据
				//dateTemp.push(obj.createDate);
				dateTemp.push(obj.stockNm);
				//console.log(dateTemp);
				tradingVolume.push((obj.totalAmount==null?0:obj.totalAmount/10000.00).toFixed(2));
				stockCodes.push(obj.stockCode);
			}
			$("#rongzipaihangData").html(htm);
//			//融资数据图表
			
			showChartRongZiJine(dateTemp,tradingVolume,stockCodes);
			//分页
			if(totalCount>pageSize){
				//分页
				if(pageNum==1){
					$('#pages').pagination({
						total: totalCount,
						pageSize: pageSize,
						current:pageNum,
//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
						layout: ['first', 'prev', 'links','next','last'],
						links:5,
						displayMsg:"",
						showPageList:false,
//						callback:function(api){
//							changParamRongZiPaihang(api.getCurrent(),pageSize);
//							//findBtCompanyNews(stockCode, api.getCurrent(), 10);
//					    }
						onSelectPage: function(pageNumber, size) {
							changParamRongZiPaihang(pageNumber,size);
						}
					});
				}
				//修改分页文字
//				setPageText('pages');
				$("#pages").show();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/*
 * 融资排行
 */
function showChartRongZiJine(dateTemp,tradingVolume,stockCodes){
//	console.log(dateTemp)
//	console.log(stockCodes)
	// 融资排行 图表
	var myChart5 = echarts.init(document.getElementById('rongzi_jiner'));
	option = {
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter: function(params) {
          	  	//console.log(params)
          	  	var index=params[0].dataIndex;
      	    	var divHtml='<div class="sanban_tips">'+
  	    					'<p class="sb_tips_title">'+params[0].name+'('+stockCodes[index]+')'+'</p>'+
  	    					'<div class="sb_tips_content">'+
  	    						'<span class="tips_leibie fl">'+params[0].seriesName+'</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
  	    						'<div class="clr"></div>'+
  	    					'</div>'+
  	    				'</div>';
                return divHtml;
	        }
	    },
	    toolbox: {
	        feature: {
	           
	            saveAsImage: {
	            	title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								
	            }
	        },
	        top:0,
	        right:'8%',
	    },
	    legend:{
	    	show:true,
	    	data:['累计融资金额'],
	    	top:10
	    },
	    title:{
	    	text:"累计融资金额",
	    	textStyle:{
	    		fontSize:'14px',
	    		color:"#4c4c4c"
	    	},
	    	left:'5% ',
	    	top:'10%'
	    },
//	   color:['#90b4e6','#5581bf'],
	    xAxis: [
	        {
	            type: 'category',
//	            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        	data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
//	            name: '累计融资金额(亿)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '3%',
	        right: '2%',
	        containLabel: true
	    },
	    dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end: 100
	        }
	    	
	    ],

	    series: [
	        {
	            name:'累计融资金额',
	            type:'bar',
	            barWidth: '30',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
//	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	        	data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        }
	    ]
	};
	myChart5.setOption(option);
	window.addEventListener("resize",function(){
                   myChart5.resize();
                });	
}

/**
 * 查询用户信息,获取用户关注的行业
 * 判断是否进行弹窗提示
 */
function findUser(){
	$.axs("/betaStock/btUserIndustry/findBtUserIndustry.do",null,false,function(data){
		if(data.retCode=="0000"){
//			console.log(data);
			var result = data.retData;
			if(result==null){
				$(".select_hy").show();
				$(".select_hy").css("opacity",1);
				$(".tmtc_new2").show();
				$("body,html").css("overflow","hidden");
				return false;
			}
			$(".jiabeijing").hide();
//			//关注行业
			var focusAreaS=result.industries;
//			//使用目的
			var purposeS=result.goals;
			if(focusAreaS!=null && focusAreaS!="" && focusAreaS!="undefined" &&
				purposeS!=null && purposeS!="" && purposeS!="undefined"){
				$(".select_hy").hide();
				$(".tmtc_new2").hide();
				$("body,html").css("overflow","auto");
			}
			//显示用户查看的行业
			findUserShow();
//			if(focusAreaS!=null && focusAreaS!="" && focusAreaS!="undefined"){
//				//给已经关注过的行业添加样式
//				$(".indexhy_tc .hy_public").each(function(index,item){
//					var autoid=$(item).find("span").attr("data-autoid");
//		     		if(focusAreaS.indexOf(autoid)>-1){
//		     			$(item).find("em").addClass("on");
//		     		}
//		     	});
//				
//		 		$(".new_small_pdbox .hy_public").each(function(index,items){
//		 			var autoid=$(items).find("span").attr("data-autoid");
//		   			if(focusAreaS.indexOf(autoid)>-1){
//		   				$(items).find("em").addClass("on");
//		   				$(items).find(".hy_icons").find("i").addClass("on");
//		   			}
//		     	});
//			}
//			if(purposeS!=null && purposeS!="" && purposeS!="undefined"){
//				$(".mudi_types").find("div.mudi_public").eq(0).removeClass("on");
//				var purposeA=purposeS.split(",");
////				console.log(purposeA);
//				$(".mudi_types").find("a").each(function(index,item){
//					var aa=$(this).text();
//					if($.inArray("'"+aa+"'",purposeA)>-1){
//						$(".mudi_types").find("div.mudi_public").eq(index).addClass("on");
//					}
//				});
//			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}


/**
 * 修改用户信息,修改用户关注的行业
 */
function updateUser(){
	var param=null;
	//关注行业
	var focusArea="";
	$(".indexhy_tc .hy_public").find("em.on").each(function(index,item){
		focusArea+=$(this).prev().attr("data-autoId")+"|";	
 	});
	focusArea=focusArea.substring(0,focusArea.length-1);
	if(focusArea=="" || focusArea.split("|").length<3 || focusArea.split("|").length>6 ){
		errorAlert("","请选择3-6个行业");
		return false;
	}
	//使用目的
	var purpose="";
	$(".mudi_types").find("div.on").each(function(index,item){
		purpose+=$(this).find("a").eq(0).text()+"|";
	});
	purpose=purpose.substring(0,purpose.length-1);
	if(purpose==""){
		errorAlert("","请选择使用目的");
		return false;
	}
	param={industries:focusArea,goals:purpose}

//	console.log("关注行业:"+focusArea);
	$.axs("/betaStock/btUserIndustry/updateBtUserIndustry.do",param,false,function(data){
		if(data.retCode=="0000"){
			findUserShow();
			
			
	     	var slectHy=[];
	     	$(".indexhy_tc .hy_public").each(function(index,item){
	     		if($(item).find("em").hasClass("on")){
	     			var yixHy=$(this).find("span").text();
					slectHy[slectHy.length]=yixHy;
	     		}
	     	});
	     	
	 		$(".new_small_pdbox .hy_public").each(function(i,items){
	 			var showText=$(items).find("span").text();
	 			showText=showText.toString();
	   			if($.inArray(showText,slectHy)>=0){
	   				$(items).find("em").addClass("on");
	   				$(items).find(".hy_icons").find("i").addClass("on");
	   			}
	     	})
			$(".select_hy").hide();
			$(".tmtc_new2").hide();
			$("body,html").css("overflow","auto");
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}



/**
 * 查询用户信息,获取用户关注的行业
 * 
 */
function findUserShow(){
	$.axs("/betaInvest/btUserIndustryShow/findBtUserIndustryShow.do",null,false,function(data){
		if(data.retCode=="0000"){
//			console.log(data);
			var result = data.retData;
			if(result==null){
				$(".select_hy").show();
				$(".select_hy").css("opacity",1);
				$(".tmtc_new2").show();
				$("body,html").css("overflow","hidden");
				return false;
			}
//			//关注行业
			var focusAreaS=result.industries;
			var htm='';
	 		$(".new_small_pdbox .hy_public").each(function(index,items){
	 			var autoid=$(items).find("span").attr("data-autoid");
	   			if(focusAreaS.indexOf(autoid)>-1){
	   				$(items).find("em").addClass("on");
	   				$(items).find(".hy_icons").find("i").addClass("on");
	   				//融资排行显示数据
	   				htm+='<li title="'+$(items).attr("title")+'">';
	   				htm+='<span class="fl">'+$(items).find("span").text()+'</span>';
	   				htm+='<em class="fr shuzi" id="'+autoid+'_show">--</em>';
	   				htm+='<div class="clr"></div>';
	   				htm+='</li>';
	   			}
	     	});
	 		//融资排行显示行业重点公告的数据
	 		$(".gs_gonggao").html(htm);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 修改用户信息,修改用户关注的行业
 */
function updateUserShow(){
	var param=null;
	//关注行业
	var focusArea="";
	$(".new_small_pdbox .hy_public").find("em.on").each(function(index,item){
		focusArea+=$(this).prev().attr("data-autoId")+"|";	
 	});
	focusArea=focusArea.substring(0,focusArea.length-1);
	if(focusArea=="" || focusArea.split("|").length<3 ){
		errorAlert("","至少选择3个行业");
		return false;
	}
	param={industries:focusArea}

//	console.log("关注行业:"+focusArea);
	$.axs("/betaInvest/btUserIndustryShow/updateBtUserIndustryShow.do",param,false,function(data){
		if(data.retCode=="0000"){
			
			var htm='';
	 		$(".new_small_pdbox .hy_public").each(function(index,items){
	 			var autoid=$(items).find("span").attr("data-autoid");
	   			if(focusArea.indexOf(autoid)>-1){
	   				$(items).find("em").addClass("on");
	   				$(items).find(".hy_icons").find("i").addClass("on");
	   				//融资排行显示数据
	   				htm+='<li title="'+$(items).attr("title")+'">';
	   				htm+='<span class="fl">'+$(items).find("span").text()+'</span>';
	   				htm+='<em class="fr shuzi" id="'+autoid+'_show">--</em>';
	   				htm+='<div class="clr"></div>';
	   				htm+='</li>';
	   			}
	     	});
	 		//融资排行显示行业重点公告的数据
	 		$(".gs_gonggao").html(htm);
			//TODO 切换数据
			showDate();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 查询所有行业
 */
function findCategory(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var htm='';
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var categoryName=obj.categoryName;
				htm+='<div class="hy_public fl '+obj.pinyin+'" title="'+categoryName+'">';
				htm+='<div class="hy_icons">';
				htm+='<i></i>';
				htm+='</div>';
				if(categoryName.length>6){
					categoryName=categoryName.substring(0,5)+"...";
				}
				htm+='<span data-autoId="'+obj.categoryId+'">'+categoryName+'</span>';
				htm+='<em></em>';
				htm+='</div>';
			}
			htm+='<div class="clr"></div>';
			$("div.indexhy_tc").html(htm);
			$(".new_small_pdbox").html(htm);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询区域
 */
function findArea(){
	var param={dataType:1,type:1,parentId:0}
	$.axs("/betaStock/common/findWorkBookByPid.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var htm='<li><a href="javascript:void(0);" data-value="">全部地区</a></li>';
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				htm+='<li>';
				htm+='<a href="javascript:void(0);" data-value="'+obj.id+'">'+obj.nameCn+'</a>';
				htm+='</li>';
			}
			$(".rz_diqu_types").html(htm);
		}else{
			//errorAlert(data.retCode, data.retMsg);
		}
	});
}

function sortNumber(a,b){
	return a - b;
}

//#########################彩蛋来了######################################################
var consoleInfo="恭喜你发现了彩蛋。\n软文很熟悉，有木有？有木有？有木有？\n没错就是百度的软文。\n哈哈哈哈哈哈哈...";
console.log("一张网页，要经历怎样的过程，才能抵达用户面前？\n一条数据，要经历怎样的处理，才能为你所用？\n探寻这里的秘密；\n体验这里的数据；\n成为这里的主人；\n金衡大数据，你，可以投研、投资。");