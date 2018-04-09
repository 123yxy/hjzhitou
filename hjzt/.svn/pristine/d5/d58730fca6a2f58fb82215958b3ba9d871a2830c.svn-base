
//成交量 图表
	var myChart1 = echarts.init(document.getElementById('gl_cjl'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   backgroundColor:'#fff',
	   color:['#0070ca','#24bdd8'],
	    legend: {
	        data:['成交额','收盘价'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['2016-08-29','2016-09-29','2016-10-29','2016-11-29'],
	            axisLabel:{  
            				interval: 0  
        				  }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '(百万)',
//	            min: 0,
//	            max: 250,
//	            interval: 50,

	            axisLabel: {
	                formatter: '{value}'
	            }
	        },
	        {
	            type: 'value',
	            name: '元/股',
//	            min: 0,
//	            max: 25,
//	            interval: 5,
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	    series: [
	    		
	        {
	        	
	            name:'成交额',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2]
	        },
	       
	        {
	        	
	            name:'收盘价',
	            type:'line',
	            yAxisIndex: 1,
	            data:[2.0, 2.2, 3.3, 4.5]
	        }
	    ]
	};
	myChart1.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart1.resize();
                });
 //营业收入净利润  图表
	var myChart2 = echarts.init(document.getElementById('gl_yysrjlr'));
	option = {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
	    },
	   backgroundColor:'#fff',
	   color:['#d2d6de','#14b8d4'],
	    legend: {
	        data:['营业收入','净利润'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['2016-08-29','2016-09-29','2016-10-29','2016-11-29'],
	            axisLabel:{  
            				interval: 0  
        				  }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	        
	    ],
	    series: [
	    		
	        {
	        	
	            name:'营业收入',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2]
	        },
	       
	        {
	        	
	            name:'净利润',
	            type:'bar',
	            data:[2.0, 2.2, 3.3, 4.5]
	        }
	    ]
	};
	myChart2.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart2.resize();
                });
    //现金流  图表
	var myChart3 = echarts.init(document.getElementById('gl_xjl'));
	option = {
    backgroundColor:'#fff',
	color:['#11aa61'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['现金流'],
        bottom:10
    },
   
//  toolbox: {
//      feature: {
//          saveAsImage: {}
//      }
//  },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2012','2013','2014','2015']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'现金流',
            type:'line',
            data:[2.0, 2.2, 3.3, 4.5]
        }
        
    ]
};
	myChart3.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart3.resize();
                });
    
//现金流  图表
	var myChart4 = echarts.init(document.getElementById('gl_ltgb'));
	option = {
   backgroundColor:'#fff',
	color:['#c0504d','#4f81bd'],
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:50,
        data: ['流通股本','非流通股本']
    },
     
    series : [
        {
            
            type: 'pie',
            radius : '70%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'流通股本'},
                {value:310, name:'非流通股本'},
                
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    position: 'inner',
                    formatter: '{c}'+"万股"
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
        }
    ]
};
	myChart4.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart4.resize();
                });
                
$(document).ready(function(){
	$("#close_tc").on("click",function(){
		window.open('/relationMap/businessRelationship.html','_self');
	});
});
