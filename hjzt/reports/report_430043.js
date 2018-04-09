var financialChartDatas = [{"dateTime":"2015-12-31","3497":81,"stockNode":"景睿策划","3481":100,"stockCode":"430043","3417":11,"3838":1.17647058823529,"3839":0.788235294117647,"3523":56,"3808":0.404494382022472,"3478":22,"3477":36,"3532":94,"3543":60,"3895":0,"3810":1.01796407185629,"3921":-0.810344827586207,"3922":3.76190476190476,"3879":3.27272727272727},{"dateTime":"2014-12-31","3497":35,"stockNode":"景睿策划","3481":42,"stockCode":"430043","3417":43,"3838":0.525,"3839":0.5375,"3523":86,"3808":0.850574712643678,"3478":77,"3477":13,"3532":73,"3543":13,"3895":0,"3810":0.935672514619883,"3921":-0.258620689655172,"3922":1,"3879":0.302325581395349},{"dateTime":"2013-12-31","3497":30,"stockNode":"景睿策划","3481":1,"stockCode":"430043","3417":99,"3838":0.0256410256410256,"3839":-1.28205128205128,"3523":56,"3808":2,"3478":94,"3477":92,"3532":77,"3543":58,"3895":0,"3810":0.435754189944134,"3921":0.706896551724138,"3922":-0.952380952380952,"3879":0.929292929292929}];
var zxyysrChartsData = [{"operatingIncome":33,"grossProfitMargin":-0.0303030303030303,"stock_name":"景睿策划","date_time":"2016-06-30","netAssetValuePerShare":0.85,"industry":"1207","stock_code":"430043"}];
var scyysrChartsData = [{"operatingIncome":85,"grossProfitMargin":0.788235294117647,"stock_name":"景睿策划","date_time":"2015-12-31","netAssetValuePerShare":0.22,"industry":"1207","stock_code":"430043"}];

var zxmgsyChartsData = [{"operatingIncome":33,"grossProfitMargin":-0.0303030303030303,"stock_name":"景睿策划","date_time":"2016-06-30","netAssetValuePerShare":0.85,"industry":"1207","stock_code":"430043"}];
var scmgsyChartsData = [{"operatingIncome":85,"grossProfitMargin":0.788235294117647,"stock_name":"景睿策划","date_time":"2015-12-31","netAssetValuePerShare":0.22,"industry":"1207","stock_code":"430043"}];

var zxxsmllChartsData = [{"operatingIncome":33,"grossProfitMargin":-0.0303030303030303,"stock_name":"景睿策划","date_time":"2016-06-30","netAssetValuePerShare":0.85,"industry":"1207","stock_code":"430043"}];
var scxsmllChartsData = [{"operatingIncome":85,"grossProfitMargin":0.788235294117647,"stock_name":"景睿策划","date_time":"2015-12-31","netAssetValuePerShare":0.22,"industry":"1207","stock_code":"430043"}];
$(function(){
$(".tree").treemenu({delay:300}).openActive();

//显示财务数据表
showFinancialCharts();

//显示行业分析数据
showIndustryCharts(zxyysrChartsData,"operatingIncome","zxyysr"); //最新营业收入
showIndustryCharts(scyysrChartsData,"operatingIncome","scyysr"); //上次营业收入 
showIndustryCharts(zxmgsyChartsData,"netAssetValuePerShare","zxmgsy"); //最新每股收益
showIndustryCharts(scmgsyChartsData,"netAssetValuePerShare","scmgsy"); //上次每股收益
showIndustryCharts(zxxsmllChartsData,"grossProfitMargin","zxxsmll"); //最新销售毛利率
showIndustryCharts(scxsmllChartsData,"grossProfitMargin","scxsmll"); //上次销售毛利率

});
//股本结构  期初  
var myChart1 = echarts.init(document.getElementById('gbjg_tb_qc'));
	option = {
		color:['#ff7f50','#87cefa'] ,
	    series : [
	        {
	            name: '期末',
	            type: 'pie',
	            radius : '50%',
//	            提示文字显示到饼图里
//	            label: {
//              normal: {
//                  position: 'inner'
//              }
//          },
	            center: ['50%', '50%'],
	            data:[{value:100, name:'无限售股份总数'+'\n'+'1.23亿股'},{value:170, name:'有限售股份总数'+"\n"+'2.23亿股'}
	              //  {value:100, name:'无限售股份总数'+'\n'+'1.23亿股'},
	              //  {value:70, name:'有限售股份总数'+"\n"+'2.23亿股'},
	               
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
	            radius : '50%',
//	            提示文字显示到饼图里
//	            label: {
//              normal: {
//                  position: 'inner'
//              }
//          },
	            center: ['50%', '50%'],
	            data:[{value:100, name:'无限售股份总数'+'\n'+'1.23亿股'},{value:170, name:'有限售股份总数'+"\n"+'2.23亿股'}
	               // {value:100, name:'无限售股份总数'+'\n'+'1.23亿股'},
	               // {value:70, name:'有限售股份总数'+"\n"+'2.23亿股'},
	               
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
	            data:[{value:8000.0,name:'张蔚'+'\n'+'8.0'},{value:7000.0,name:'高歌京'+'\n'+'7.0'},{value:9000.0,name:'翟波'+'\n'+'9.0'},{value:6000.0,name:'彭伟民'+'\n'+'6.0'}
	            //     {value:200, name:'张三'+'\n'+'1%'},
	            //    {value:270, name:'李四'+"\n"+'5%'},
	            //    {value:70, name:'王五'+"\n"+'2.23%'},
	            //    {value:90, name:'张三'+'\n'+'1%'},
	            //   {value:180, name:'李四'+"\n"+'5%'},
	            //    {value:570, name:'王五'+"\n"+'2.23%'},
	               
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
	            data:[{value:8000.0,name:'张蔚'+'\n'+'8.0'},{value:7000.0,name:'高歌京'+'\n'+'7.0'},{value:9000.0,name:'翟波'+'\n'+'9.0'},{value:6000.0,name:'彭伟民'+'\n'+'6.0'}
	              //  {value:100, name:'张三'+'\n'+'1%'},
	             //   {value:170, name:'李四'+"\n"+'5%'},
	             //   {value:270, name:'王五'+"\n"+'2.23%'},
	             //   {value:30, name:'张三'+'\n'+'1%'},
	              //  {value:80, name:'李四'+"\n"+'5%'},
	             //   {value:70, name:'王五'+"\n"+'2.23%'},
	               
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
/*var myChart5 = echarts.init(document.getElementById('rsgr_zl'));
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
                });*/
                
                
                
// 没有mycharts6


//显示财务数据表
function showFinancialCharts(){
	var dateArray=[];
	var xiaoshoumaolilv = [];
	var xiaoshoujinglilv=[];
	
	var zichanfuzhailv=[];
	
	var yingshouzhangkuanzhouzhuanlv=[];
	var cunhuozhouzhuanlv=[];
	
	var zongzichanzengzhanglv=[];
	var yingyeshouruzengzhanglv=[];
	var jinglirunzengzhanglv=[];
	
	var zongzichan=[];
	var zongfuzhai=[];
	var suoyouzhequanyi=[];
	
	var lirunzonge=[];
	var jinglirun=[];
	
	var jingyingxianjinjinge=[];
	var touzixianjinjinge=[];
	var chouzixianjinjinge=[];
	for(var i=0;i<financialChartDatas.length;i++){
		var obj=financialChartDatas[i];
		var strDate=obj.dateTime.split("-"); 
		var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
		var year=(s).Format("yyyy");
		dateArray.push(year);
		xiaoshoumaolilv.push(obj["3839"]);
		xiaoshoujinglilv.push(obj["3838"]);
		
		zichanfuzhailv.push(obj["3879"]);
		
		yingshouzhangkuanzhouzhuanlv.push(obj["3810"]);
		cunhuozhouzhuanlv.push(obj["3808"]);
		
		zongzichanzengzhanglv.push(obj["3921"]);
		yingyeshouruzengzhanglv.push(obj["3895"]);
		jinglirunzengzhanglv.push(obj["3922"]);
		
		zongzichan.push(obj["3417"]);
		zongfuzhai.push(obj["3477"]);
		suoyouzhequanyi.push(obj["3478"]);
		
		lirunzonge.push(obj["3481"]);
		jinglirun.push(obj["3497"]);
	
		jingyingxianjinjinge.push(obj["3523"]);
		touzixianjinjinge.push(obj["3532"]);
		chouzixianjinjinge.push(obj["3543"]);
		
	}
	myChart7(xiaoshoumaolilv,xiaoshoujinglilv,dateArray);
	myChart8(zichanfuzhailv,dateArray);
	myChart9(cunhuozhouzhuanlv,yingshouzhangkuanzhouzhuanlv,dateArray);
	myChart10(jinglirunzengzhanglv,yingyeshouruzengzhanglv,zongzichanzengzhanglv,dateArray);
	myChart11(suoyouzhequanyi,zongfuzhai,zongzichan,dateArray);
	myChart12(jinglirun,lirunzonge,dateArray);
	myChart13(chouzixianjinjinge,touzixianjinjinge,jingyingxianjinjinge,dateArray);

}
            
//财务分析公司盈利能力图表
function myChart7(xiaoshoumaolilv,xiaoshoujinglilv,dateArray){
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
	            data: dateArray
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
		            data:xiaoshoumaolilv//第一种数据种类数据
		           
		        },
		         {
		            name:'净利率',//第一种数据种类名字
		            type:'line',
		             data:xiaoshoujinglilv//第一种数据种类数据
		           
		        }
		    ],
	};
	myChart7.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart7.resize();
                });
}
                
//财务分析偿债能力图表
function myChart8(zichanfuzhailv,dateArray){
	var myChart8 = echarts.init(document.getElementById('ggxq_cznl_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['资产负债率'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateArray
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'资产负债率',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:zichanfuzhailv//第一种数据种类数据
		           
		        }
//		        ,
//		         {
//		            name:'净利率',//第一种数据种类名字
//		            type:'line',
//		             data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]//第一种数据种类数据
//		           
//		        }
		    ],
	};
	myChart8.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart8.resize();
                });
}	

//财务分析公司营运情况图表
function myChart9(cunhuozhouzhuanlv,yingshouzhangkuanzhouzhuanlv,dateArray){
	var myChart9 = echarts.init(document.getElementById('ggxq_yyqk_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['应收账款周转','存货周转率'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateArray
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'应收账款周转',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:yingshouzhangkuanzhouzhuanlv//第一种数据种类数据
		           
		        },
		         {
		            name:'存货周转率',//第一种数据种类名字
		            type:'line',
		             data:cunhuozhouzhuanlv//第一种数据种类数据
		           
		        }
		    ],
	};
	myChart9.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart9.resize();
                });
}

//财务分析成长情况图表
function myChart10(jinglirunzengzhanglv,yingyeshouruzengzhanglv,zongzichanzengzhanglv,dateArray){
	var myChart10 = echarts.init(document.getElementById('ggxq_czqk_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['总资产率','营业收入率','净利润增长率'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateArray
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'总资产率',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:zongzichanzengzhanglv//第一种数据种类数据
		           
		        },
		         {
		            name:'营业收入率',//第二种数据种类名字
		            type:'line',
		             data:yingyeshouruzengzhanglv//第二种数据种类数据
		           
		        },
		         {
		            name:'净利润增长率',//第三种数据种类名字
		            type:'line',
		             data:jinglirunzengzhanglv//第三种数据种类数据
		           
		        }
		    ],
	};
	myChart10.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart10.resize();
                });
}

//财务分析公司资产负债情况图表
function myChart11(suoyouzhequanyi,zongfuzhai,zongzichan,dateArray){
	var myChart11 = echarts.init(document.getElementById('ggxq_zcfz_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['总资产','总负债','所有者权益'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateArray
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'总资产',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:zongzichan//第一种数据种类数据
		           
		        },
		         {
		            name:'总负债',//第一种数据种类名字
		            type:'line',
		             data:zongfuzhai//第一种数据种类数据
		           
		        },
		         {
		            name:'所有者权益',//第三种数据种类名字
		            type:'line',
		             data:suoyouzhequanyi//第三种数据种类数据
		           
		        }
		    ],
	};
	myChart11.setOption(option);
	window.addEventListener("resize",function(){
					myChart11.resize();
                });
}

//财务分析公司利润情况图表
function myChart12(jinglirun,lirunzonge,dateArray){
	var myChart12 = echarts.init(document.getElementById('ggxq_lr_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['利润总额','净利润'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateArray
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'利润总额',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:lirunzonge//第一种数据种类数据
		           
		        },
		         {
		            name:'净利润',//第一种数据种类名字
		            type:'line',
		             data:jinglirun//第一种数据种类数据
		           
		        }
		    ],
	};
	myChart12.setOption(option);
	window.addEventListener("resize",function(){
		myChart12.resize();
                });
}
	
//财务分析公司现金流情况图表
function myChart13(chouzixianjinjinge,touzixianjinjinge,jingyingxianjinjinge,dateArray){
	var myChart13 = echarts.init(document.getElementById('ggxq_xjl_info'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#F07679','#0EAA62'],
	    legend: {
	        data:['经营现金流量净额','投资现金流量净额','筹资现金流量净额'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateArray
	        }
	    ],
	    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		series: [
		        {
		            name:'经营现金流量净额',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:jingyingxianjinjinge//第一种数据种类数据
		           
		        },
		         {
		            name:'投资现金流量净额',//第一种数据种类名字
		            type:'line',
		             data:touzixianjinjinge//第一种数据种类数据
		           
		        },
		         {
		            name:'筹资现金流量净额',//第三种数据种类名字
		            type:'line',
		             data:chouzixianjinjinge//第三种数据种类数据
		           
		        }
		    ],
	};
	myChart13.setOption(option);
	window.addEventListener("resize",function(){
		myChart13.resize();
                });
}

//显示行业排名信息
function showIndustryCharts(datas,indicatorId,timeType){
	if(datas != null && datas !="" && datas.length > 0){
		var stockNameArr = [];
		var stockDataArr = [];
		var startValue = 0;
		$(datas).each(function(index, item){
			if (item.stock_code == 430043) {
	            startValue = index;
	        }
			stockNameArr.push(item.stock_name); //获取股票代码集合
			if(indicatorId == "netAssetValuePerShare"){ //每股净资产
				stockDataArr.push(item.netAssetValuePerShare);
			}else if(indicatorId == "operatingIncome"){ //营业收入
				stockDataArr.push(item.operatingIncome);
			}else if(indicatorId == "grossProfitMargin"){ //销售毛利率
				stockDataArr.push(item.grossProfitMargin);
			}
		})
		
		//显示图表
		if(timeType == "zxyysr"){
			myChart14(stockNameArr, stockDataArr, startValue);
		}if(timeType == "scyysr"){
			myChart15(stockNameArr, stockDataArr, startValue);
		}if(timeType == "zxmgsy"){
			myChart16(stockNameArr, stockDataArr, startValue);
		}if(timeType == "scmgsy"){
			myChart17(stockNameArr, stockDataArr, startValue);
		}if(timeType == "zxxsmll"){
			myChart18(stockNameArr, stockDataArr, startValue);
		}if(timeType == "scxsmll"){
			myChart19(stockNameArr, stockDataArr, startValue);
		}
	}
}

//最新的行业排名-营业收入
function myChart14(stockNameArr, stockDataArr, startValue){
	
    var myChart14 = echarts.init(document.getElementById('ggxq_three_zxyysr_info'));
    var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
	 option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	             startValue: 1,
	            endValue: 10,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
		        data : stockNameArr,
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "",
	            type: 'bar',
	            data:stockDataArr,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                    	return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	 // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };

	 myChart14.setOption(option);
		window.addEventListener("resize",function(){
			myChart14.resize();
	            });
}
//上一次的行业排名-营业收入
function myChart15(stockNameArr, stockDataArr, startValue){
	var myChart15 = echarts.init(document.getElementById('ggxq_three_scyysr_info'));
	var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
	 option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	             startValue: 1,
	            endValue: 10,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
		        data : stockNameArr,
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "",
	            type: 'bar',
	            data:stockDataArr,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                    	return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	 // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };

	myChart15.setOption(option);
		window.addEventListener("resize",function(){
	                                      myChart15.resize();
	            });
}

//最新的行业排名-每股收益
function myChart16(stockNameArr, stockDataArr, startValue){
	var myChart16 = echarts.init(document.getElementById('ggxq_three_zxmgsy_info'));
	var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
	 option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	             startValue: 1,
	            endValue: 10,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
		        data : stockNameArr,
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "",
	            type: 'bar',
	            data:stockDataArr,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                    	return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	 // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };

	 myChart16.setOption(option);
		window.addEventListener("resize",function(){
			myChart16.resize();
	            });
}

//上次的行业排名-每股收益
function myChart17(stockNameArr, stockDataArr, startValue){
	var myChart17 = echarts.init(document.getElementById('ggxq_three_scmgsy_info'));
	var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
	 option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	             startValue: 1,
	            endValue: 10,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
		        data : stockNameArr,
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "",
	            type: 'bar',
	            data:stockDataArr,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                    	return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	 // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };

	 myChart17.setOption(option);
		window.addEventListener("resize",function(){
			myChart17.resize();
	            });
}

//最新的行业排名-销售毛利率
function myChart18(stockNameArr, stockDataArr, startValue){
	var myChart18 = echarts.init(document.getElementById('ggxq_three_zxxsmll_info'));
	var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
	 option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	             startValue: 1,
	            endValue: 10,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
		        data : stockNameArr,
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "",
	            type: 'bar',
	            data:stockDataArr,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                    	return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	 // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };

	 myChart18.setOption(option);
		window.addEventListener("resize",function(){
			myChart18.resize();
	            });
}

//上次的行业排名-销售毛利率
function myChart19(stockNameArr, stockDataArr, startValue){
	var myChart19 = echarts.init(document.getElementById('ggxq_three_scxsmll_info'));
	var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
	 option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	             startValue: 1,
	            endValue: 10,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
		        data : stockNameArr,
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "",
	            type: 'bar',
	            data:stockDataArr,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                    	return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	 // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };

	 myChart19.setOption(option);
		window.addEventListener("resize",function(){
			myChart19.resize();
	            });
}

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


