$(function(){
	//公司盈利情况
	companyAnalysis();
	//公司成长情况
	companyGrowUp();
	//综合能力模型分析
	comprehensiveAnalysis();
})


//公司盈利情况
function companyAnalysis(){
	var myChart=echarts.init(document.getElementById('companyProfit'));
	var option={
		legend:{
			show:true,
			data:['净利润'],
			top:'8%'
		},
		color:['#62a6f2'],
		xAxis:{
			show:true,
			type:'category',
			data:['东方证劵','东方时尚','华夏证劵','东方证劵']
		},
		yAxis:{
			show:true,
			type:'value',
			name:'单位：万元'
		},
		grid:{
			show:true,
			left:'5%',
			right:'5%',
			bottom:'30%'
			
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
			name:'净利润',
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
		}]
	};
	 // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

/*
 * 公司成长情况
 */
function companyGrowUp(){
	var myChart=echarts.init(document.getElementById('companyGrowUp'));
	var option={
		legend:{
			show:true,
			data:['净利润',"利润"],
			top:'5%'
		},
		color:['#62a6f2',"#feb535"],
		xAxis:{
			show:true,
			type:'category',
			data:['2015-11','2015-11','2015-11','2015-11']
		},
		yAxis:{
			show:true,
			name:'单位:%',
			type:'value'
		},
		grid:{
			show:true,
			left:'5%',
			right:'5%',
			bottom:'30%'
		},
		dataZoom:[{
			type:'slider',
			show:true,
			start:'0',
			end:'100',
			bottom:'3%'
		}],
		series:[{
			type:'line',
			name:'净利润',
			symbol:'circle',
			data:[10,50,20,83]
		},
		{
			type:'line',
			name:'利润',
			symbol:'circle',
			data:[15,38,40,60]
		}]
	};
	 // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


/*
 * 综合模型分析雷达图
 */
function comprehensiveAnalysis(){
	var myChart=echarts.init(document.getElementById('companyModelAnalysis'));
	var option = {
//		    title: {
//		        text: '基础雷达图'
//		    },
//		    legend: {
//		        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
//		    },
			color:["#feb535"],
		    radar: {
		        // shape: 'circle',
		        name: {
		            textStyle: {
		                color: '#5c666e',
		                backgroundColor: '#999',
		                borderRadius: 3,
		                padding: [3, 5]
		           }
		        },
		        indicator: [
		           { name: '盈利性', max: 6500},
		           { name: '安全性', max: 16000},
		           { name: '利润质量', max: 30000},
		           { name: '运营能力', max: 38000},
		           { name: '偿债能力', max: 52000},
		           { name: '成长性', max: 25000}
		        ]
		    },
		    textStyle:{
		    	cololr:'#000'
		    },
		    series: [{
//		        name: '预算 vs 开销（Budget vs spending）',
		        type: 'radar',
		        symbol:'circle',
		        data : [
		            {
		                value : [4300, 10000, 28000, 35000, 50000, 19000],
		                //name : '预算分配（Allocated Budget）'
		            }
		        ]
		    }]
		};
	// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}