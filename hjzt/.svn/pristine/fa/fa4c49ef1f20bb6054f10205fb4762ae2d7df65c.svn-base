$(function(){
	//点击加入对比的时候显示取消对比
//	$(".cwsh_mox span").on("click",function(){
//		if($(this).hasClass("on")){
//			$(this).removeClass("on").text("加入对比");
//		}else{
//			$(this).addClass("on").text("取消对比");	
//		}
//	})
	
	//点击发布时间
	$(".paixu_types").on("mouseover",function(){
//		alert(0)
		$(this).find(".fabu_fangshi").addClass("on");
		$(this).find(".fabu_fangshi").next().stop().slideDown();
	})
	$(".paixu_types").on("mouseout",function(){
		$(this).find(".fabu_fangshi").removeClass("on");
		$(this).find(".fabu_fangshi").next().stop().slideUp();
	})
	
	
	//点击新闻全屏的推出全屏按钮
	$(".new_fullPage .quanp_btn").on("click",function(){
		$(".new_fullPage").hide();
		$("body","html").css("overflow","auto");
	})
	//财务数据的柱状图
//	drawFinancialData();
	
})
//财务数据的图表
//function drawFinancialData(){
//	var mychart=echarts.init(document.getElementById('cWsj'));
//	 
//	var option={
//		color:["#2789df"],
//		grid: {
//	        left: '3%',
//	        right: '4%',
//	        bottom: '3%',
//	        containLabel: true
//	    },
//	    legend:{
//	    	show:true,
//	    	data:['中科软'],
//	    	top:10
//	    },
//	    tooltip:{
//	    	show:true,
//	    	trigger: 'axis',
//	    	position:"top",
//	    	formatter:function(params){
//	    		//console.log(params);
//	    		return '<div class="caiwu_tips">'+
//							'<h2>'+params[0].seriesName+'</h2>'+
//							'<div class="tips_content">'+
//							'<span class="tips_zb">'+params[0].name+'</span>'+
//							'<span class="shouru_data">'+params[0].data+'</span>'+
//							'<div class="clr"></div>'+
//							'</div>'+
//						'</div>';
//	    		
//	    	}
//	    },
//	    xAxis : [
//	        {
//	            type : 'category',
//	            data : ['营业收入', '净利润', '总资产', '总负债', '股东权益', '现金净流量'],
//	            axisTick: {
//	                alignWithLabel: true
//	            }
//	        }
//	    ],
//	    yAxis : [
//	        {
//	            type : 'value'
//	        }
//	    ],
//	     series : [
//	        {
//	            name:'中科软',
//	            type:'bar',
//	            barMaxWidth:"30px",
//	            data:[10, 52, 200, 334, 390, 220]
//	        }
//	    ]
//	}
//	mychart.setOption(option);
//	window.addEventListener("resize",function(){
//		mychart.resize();
//	})
//	
//}
