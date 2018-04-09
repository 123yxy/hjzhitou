$(function(){
	//点击tab切换
	$(".tab-list span").on("click",function(){
		if($(this).hasClass("on")){
			return false;
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).text()=="图表"){
				$(".echarts-tb").show();
				$(".reyuan-table").hide();
			}else{
				$(".echarts-tb").hide();
				$(".reyuan-table").show();
			}
		}
	})
	equitySituation();
	
})
//股本及变动情况
function equitySituation(){
	var myChart=echarts.init(document.getElementById('equitySituation'));
	var option={
		legend:{
			show:true,
			data:['2015','2016'],
			top:'8%'
		},
		color:['#65a8ef','#fcb444'],
		xAxis:{
			show:true,
			type:'category',
			data:['东方证劵','东方时尚','华夏证劵','东方证劵']
		},
		yAxis:{
			show:true,
			type:'value',
			name:'单位:亿'
		},
		grid:{
			show:true,
			left:'5%',
			right:'5%',
			bottom:'30%'
		},
		tooltip:{
			show:true,
			trigger:'axis',
			formatter:function(params){
				var div='<div class="tooltips">'+
							'<h4>中科软(430002)</h4>'+
							'<div class="tips-num">'+
								'<span class="name1">每股收益</span><em class="shuzi">15.64</em>'+
							'</div>'+
							'<div class="tips-num">'+
								'<span class="name2">涨跌幅</span><em class="shuzi">15.64%</em>'+
							'</div>'+
						'</div>';
						return div;
			}
		},
		dataZoom:[{
			type:'slider',
			show:true,
			start:'0',
			end:'100',
			bottom:'3%'
		}],
		series:[{
			type:'bar',
			name:'2015',
			barMaxWidth:'30',
			data:[10,50,20,83]
//			itemStyle: {
//              normal: {
//                  color: function(params) {
//
//                  	  // 检索结果颜色
////                      if(params.dataIndex == itemIndex) {
////                          return "#f3565d";
////                      } else {
////                          return "#62a6f2";
////                      }
//                  }
//              }
//          }
		},
		{
			type:'bar',
			name:'2016',
			barMaxWidth:'30',
			data:[10,50,20,83]
//			itemStyle: {
//              normal: {
//                  color: function(params) {
//
//                  	  // 检索结果颜色
////                      if(params.dataIndex == itemIndex) {
////                          return "#f3565d";
////                      } else {
////                          return "#62a6f2";
////                      }
//                  }
//              }
//          }
		}
		]
	};
	 // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}