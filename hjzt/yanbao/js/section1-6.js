$(function(){
	//点击tab切换
	$(".tab-list span").on("click",function(){
		if($(this).hasClass("on")){
			return false;
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).text()=="图表"){
				$(".zhongd-sj").show();
				$(".reyuan-table").hide();
			}else{
				$(".zhongd-sj").hide();
				$(".reyuan-table").show();
			}
		}
	})
	//重大事件柱状图
	importantEvent();
})
function importantEvent(){
	var myChart=echarts.init(document.getElementById('importantEvent'));
	var option={
		legend:{
			show:true,
			data:['中科软'],
			top:'8%'
		},
		color:['#65a8ef'],
		xAxis:{
			show:true,
			type:'category',
			data:['重大资产重组','定增','收购','分红派息','股权解禁','股权激励']
		},
		yAxis:{
			show:true,
			type:'value',
			name:'单位:万元'
		},
		grid:{
			show:true,
			left:'5%',
			right:'5%',
			bottom:'30%'
		},
//		tooltip:{
//			show:true,
//			trigger:'axis',
//			formatter:function(params){
//				var div='<div class="tooltips">'+
//							'<h4>中科软(430002)</h4>'+
//							'<div class="tips-num">'+
//								'<span class="name1">每股收益</span><em class="shuzi">15.64</em>'+
//							'</div>'+
//							'<div class="tips-num">'+
//								'<span class="name2">涨跌幅</span><em class="shuzi">15.64%</em>'+
//							'</div>'+
//						'</div>';
//						return div;
//			}
//		},
		dataZoom:[{
			type:'slider',
			show:true,
			start:'0',
			end:'100',
			bottom:'3%'
		}],
		series:[{
			type:'bar',
			name:'中科软',
			barMaxWidth:'30',
			data:[10,50,20,83,120,43]
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
