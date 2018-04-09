$(function(){
$(".tree").treemenu({delay:300}).openActive();

});
//股本结构  期初  
var myChart1 = echarts.init(document.getElementById('gbjg_tb_qc'));
	option = {
		color:['#ff7f50','#87cefa'] ,
	    series : [
	        {
	            name: '期末',
	            type: 'pie',
	            radius : '85%',
//	            提示文字显示到饼图里
//	            label: {
//              normal: {
//                  position: 'inner'
//              }
//          },
	            center: ['50%', '50%'],
	            data:[
	                {value:100, name:'无限售股份总数'+'\n'+'1.23亿股'},
	                {value:70, name:'有限售股份总数'+"\n"+'2.23亿股'},
	               
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	myChart1.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart1.resize();
                });
//股本结构  期末               
var myChart2 = echarts.init(document.getElementById('gbjg_tb_qm'));
	option = {
		color:['#ff7f50','#87cefa'] ,
	    series : [
	        {
	            name: '期末',
	            type: 'pie',
	            radius : '85%',
//	            提示文字显示到饼图里
//	            label: {
//              normal: {
//                  position: 'inner'
//              }
//          },
	            center: ['50%', '50%'],
	            data:[
	                {value:100, name:'无限售股份总数'+'\n'+'1.23亿股'},
	                {value:70, name:'有限售股份总数'+"\n"+'2.23亿股'},
	               
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	myChart2.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart2.resize();
                });
                
//股本结构  期初  
var myChart3 = echarts.init(document.getElementById('gbjg_tb_qccg'));
	option = {
		color:['#ff7f50','#87cefa','#2ec7c9','#b6a2de','#5ab1ef','#ffb980'] ,
	    series : [
	        {
	            name: '期末',
	            type: 'pie',
	            radius : '85%',
//	            提示文字显示到饼图里
//	            label: {
//              normal: {
//                  position: 'inner'
//              }
//          },
	            center: ['50%', '50%'],
	            data:[
	                 {value:200, name:'张三'+'\n'+'1%'},
	                {value:270, name:'李四'+"\n"+'5%'},
	                {value:70, name:'王五'+"\n"+'2.23%'},
	                {value:90, name:'张三'+'\n'+'1%'},
	                {value:180, name:'李四'+"\n"+'5%'},
	                {value:570, name:'王五'+"\n"+'2.23%'},
	               
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	myChart3.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart3.resize();
                });
//股本结构  期末               
var myChart4 = echarts.init(document.getElementById('gbjg_tb_qmcg'));
	option = {
		color:['#ff7f50','#87cefa','#2ec7c9','#b6a2de','#5ab1ef','#ffb980'] ,
	    series : [
	        {
	            name: '期末',
	            type: 'pie',
	            radius : '85%',
//	            提示文字显示到饼图里
//	            label: {
//              normal: {
//                  position: 'inner'
//              }
//          },
	            center: ['50%', '50%'],
	            data:[
	                {value:100, name:'张三'+'\n'+'1%'},
	                {value:170, name:'李四'+"\n"+'5%'},
	                {value:270, name:'王五'+"\n"+'2.23%'},
	                {value:30, name:'张三'+'\n'+'1%'},
	                {value:80, name:'李四'+"\n"+'5%'},
	                {value:70, name:'王五'+"\n"+'2.23%'},
	               
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	myChart4.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart4.resize();
                });
                
                
                
 //股本结构  期末               
var myChart5 = echarts.init(document.getElementById('rsgr_zl'));
	option = {
	    title:{
	        show:true,
	        text:'热水供热总量(万吉焦)',
	        textStyle:{
	            fontWeight:'normal',
	        },
	    },
	     legend: {
	        data:['热水供热总量(万吉焦)'],
	        right:10,
	    },
	    color: ['#6ac8f9'],
	    tooltip : {
	        show:true,
        	trigger:'item',
//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08'],
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
	            name:'热水供热总量(万吉焦)',
	            type:'bar',
	            barWidth: '60%',
	            data:[10, 52, 200, 334, 390, 330, 500 , 220],
	            itemStyle: {
                emphasis:{
                	color:"#37a4dc"//鼠标放到柱形图上显示的颜色
                }
            }},
	        
	        
	    ]
	};
	myChart5.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart5.resize();
                });
                
                
                
// 营业收入排行
var myChart6 = echarts.init(document.getElementById('ggxq_three_tb_info'));
 option = {
//      title: {
//          text: "行业地位分析"
//      },
        dataZoom: [{
            type: "slider",
            show: true,
             startValue: 1,
            endValue: 10
//          startValue: startValue - 2,
//          endValue: startValue + 2 + 8
            				//startValue + 2 + (Math.ceil(data.length / end))
                            // backgroundColor:"#CFEBF2",
                            // dataBackground:{
                            //     areaStyle:{
                            //          color:"#406ac1"
                            //     }
                            // }
        }],
        yAxis: [{
            type: "value",
            data: []
        }],
        xAxis: [{
            type: 'category',
	        data : ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08'],
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'item',
        	position:'top',
      	    formatter: function(params) {
//	      	    	var divHtml='<div class="tooltips">';
//	      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//					if(chg[params.dataIndex]>0){
//						divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//					}else{
//						divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//					}
//					if(indicatorName!="涨跌幅"){
//						divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//					}
//						divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//						divHtml+='<div class="tip"></div>';
//						divHtml+='</div>';
//	                return divHtml;
	            }
        },
        series: [{
            name: "",
            type: 'bar',
            data:[10, 52, 200, 334, 390, 330, 500 , 220],
            label: {
                normal: {
                    show: true,
                    position: "top",
                    formatter: function(params) {
                    	return "第10名";
//                      return "第" + ranking[params.dataIndex] + "名";
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
                    	  // 检索结果颜色
//                      if(params.dataIndex == itemIndex) {
//                          return "#f3565d";
//                      } else {
//                          return "#5bc0de";
//                      }
                      	return "#D53A35";
                    }
                },
                emphasis:{
                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
                }
            }
        }]
    };

myChart6.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart6.resize();
            });
            
//公司盈利能力图表
	var myChart7 = echarts.init(document.getElementById('ggxq_ylnl_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['毛利率','净利率'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'毛利率',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]//第一种数据种类数据
		           
		        },
		         {
		            name:'净利率',//第一种数据种类名字
		            type:'line',
		             data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]//第一种数据种类数据
		           
		        }
		    ],
	};
	myChart7.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart7.resize();
                });
                

$(document).ready(function(){
	$(".detai_dbox").children(".det_box").hide();
	$(".detai_dbox").children(".det_box").eq(0).show();
	var details_width = $(".enter_details").width();
	var detai_r_width = details_width-238;
	var d_rheight= $(".detai_r").height();
	$(".detai_l").css("height",d_rheight);
	$(".detai_r").css("width",detai_r_width);

	   $("[name='a']").on("click",function(){
	   	$("body,html").animate({ 
				scrollTop:0 
				},0);
		var li=$(this).parent();
		var in_inde=li.index();
		$(".detai_dbox").children(".det_box").hide();
		$(".detai_dbox").children(".det_box").eq(in_inde).show();
		var d_rheight= $(".detai_r").height();
		$(".detai_l").css("height",d_rheight);
	});
//	二级标题定位
	$("[name='location']").on("click",function(){
		var location_text=$(this).text();
		var locationIndex=$(this).parent().parent().parent().index();
		var small_title=$(".detai_dbox").find("div.detai_small_title");
		$(small_title).each(function(index,item){
			var small_title_text=$(item).find("span").text();
			if(location_text==small_title_text){
			$(".detai_dbox").children(".det_box").hide();
			$(".detai_dbox").children(".det_box").eq(locationIndex).show();
			var small_top=$(item).offset().top;
				$("body,html").animate({ 
				scrollTop:small_top-73 
				},500); 
			}
		})
		
	});
	
	});

