var stockCodeParam=UTIL.getPara("stockCode");
// stockCodeParam=430002;
$(function(){
	businessIncome();
	findTotalProfit();
	findNetProfit();
	findTotalAssets();
	findInterestRateChange();
	
	
})

function businessIncome(){
	var params={stockCode:stockCodeParam};
	WF_ajax.findBusinessIncome(params,true,function(data){
		//console.log(data)
		//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
		var dateList=data.portTime;
		var yingyeDataList=data.f2QZYYSR;//营业收入
		var REVZengZhangLvList=data.REVZengZhangLv;//增长率
	  // 使用刚指定的配置项和数据显示图表。
  	var myChart=echarts.init(document.getElementById('businessIncome'));
    var option = {
        color: [
            "#62a6f2","#feb535"
        ],
        calculable : true,
        legend:{
        	show:true,
        	data:["营业收入",'增长率']
        },
        grid:{
        	show:true,
        	right:'5%',
        	left:'5%',
        	bottom:'30%'
        },
        xAxis : {
                type : 'category',
                data : dateList//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
        label:{
			normal:{
				show:true,
				position:'top'
			}
		},
        yAxis :[
            {
                type : 'value',
                name:"单位：万元",
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            },
            {
                type : 'value',
                name:"单位：%",
                min:0,
                max:100,
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            }
            ],
        series : [
            {
                name:'营业收入',
                type:'bar',
                
                barMaxWidth:'30',
                data:yingyeDataList//[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
             {
                name:'增长率',
                type:'line',
//              barMaxWidth:'30',
				symbol:"circle",
                data:REVZengZhangLvList,//[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                axisLine:{
                	show:false
                }
            }
        ]
    };
  
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
	});
	
	})
}

function findTotalProfit(){
	var params={stockCode:stockCodeParam};
	WF_ajax.findTotalProfit(params,true,function(data){
		
		//$("#totalProfitShowName").html("2.2.1"+data.LiRunZongEZengZhangLv_showName);
		var dateList=data.portTime;
		var yingyeDataList=data.f2LRZE;//营业收入
		var REVZengZhangLvList=data.LiRunZongEZengZhangLv;//增长率
	  // 使用刚指定的配置项和数据显示图表。
  	var myChart=echarts.init(document.getElementById('totalProfit'));
    var option = {
        color: [
            "#62a6f2","#feb535"
        ],
        calculable : true,
        legend:{
        	show:true,
        	data:["利润总额",'增长率']
        },
        grid:{
        	show:true,
        	right:'5%',
        	left:'5%',
        	bottom:'30%'
        },
        xAxis : {
                type : 'category',
                data : dateList//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
        label:{
			normal:{
				show:true,
				position:'top'
			}
		},
        yAxis :[
            {
                type : 'value',
                name:"单位：万元",
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            },
            {
                type : 'value',
                name:"单位：%",
                min:0,
                max:100,
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            }
            ],
        series : [
            {
                name:'利润总额',
                type:'bar',
                barMaxWidth:'30',
                data:yingyeDataList//[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
             {
                name:'增长率',
                type:'line',
//              barMaxWidth:'30',
				symbol:"circle",
                data:REVZengZhangLvList,//[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                axisLine:{
                	show:false
                }
            }
        ]
    };
  
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
	});
	
	})
}

function findNetProfit(){
	var params={stockCode:stockCodeParam};
	WF_ajax.findNetProfit(params,true,function(data){
		
		//$("#netProfitShowName").html("2.2.1"+data.JingLiRunZengZhangLv_showName);
		var dateList=data.portTime;
		var yingyeDataList=data.f2JLR;//营业收入
		var REVZengZhangLvList=data.JingLiRunZengZhangLv;//增长率
	  // 使用刚指定的配置项和数据显示图表。
  	var myChart=echarts.init(document.getElementById('netProfit'));
    var option = {
        color: [
            "#62a6f2","#feb535"
        ],
        calculable : true,
        legend:{
        	show:true,
        	data:["净利润",'增长率']
        },
        grid:{
        	show:true,
        	right:'5%',
        	left:'5%',
        	bottom:'30%'
        },
        xAxis : {
                type : 'category',
                data : dateList//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
        label:{
			normal:{
				show:true,
				position:'top'
			}
		},
        yAxis :[
            {
                type : 'value',
                name:"单位：万元",
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            },
            {
                type : 'value',
                name:"单位：%",
                min:0,
                max:100,
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            }
            ],
        series : [
            {
                name:'净利润',
                type:'bar',
                barMaxWidth:'30',
                data:yingyeDataList//[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
             {
                name:'增长率',
                type:'line',
//              barMaxWidth:'30',
				symbol:"circle",
                data:REVZengZhangLvList,//[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                axisLine:{
                	show:false
                }
            }
        ]
    };
  
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
	});
	
	})
}

function findTotalAssets(){
	var params={stockCode:stockCodeParam};
	WF_ajax.findTotalAssets(params,true,function(data){
		
		//$("#totalAssetsShowName").html("2.2.1"+data.ZongZiChanZengZhangLv_showName);
		var dateList=data.portTime;
		var yingyeDataList=data.f1ZCZJ;//营业收入
		var REVZengZhangLvList=data.ZongZiChanZengZhangLv;//增长率
	  // 使用刚指定的配置项和数据显示图表。
  	var myChart=echarts.init(document.getElementById('totalAssets'));
    var option = {
        color: [
            "#62a6f2","#feb535"
        ],
        calculable : true,
        legend:{
        	show:true,
        	data:["总资产",'增长率']
        },
        grid:{
        	show:true,
        	right:'5%',
        	left:'5%',
        	bottom:'30%'
        },
        xAxis : {
                type : 'category',
                data : dateList//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
        label:{
			normal:{
				show:true,
				position:'top'
			}
		},
        yAxis :[
            {
                type : 'value',
                name:"单位：万元",
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            },
            {
                type : 'value',
                name:"单位：%",
                min:0,
                max:100,
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            }
            ],
        series : [
            {
                name:'总资产',
                type:'bar',
                barMaxWidth:'30',
                data:yingyeDataList//[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
             {
                name:'增长率',
                type:'line',
//              barMaxWidth:'30',
				symbol:"circle",
                data:REVZengZhangLvList,//[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                axisLine:{
                	show:false
                }
            }
        ]
    };
  
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
	});
	
	})
}

function findInterestRateChange(){
	var params={stockCode:stockCodeParam};
	WF_ajax.findInterestRateChange(params,true,function(data){
		//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
		var dateList=data.portTime;
		var yingyeDataList=data.XiaoShouMaoLiLv;//营业收入
		var REVZengZhangLvList=data.XiaoShouJingLiRunLv;//增长率
	  // 使用刚指定的配置项和数据显示图表。
  	var myChart=echarts.init(document.getElementById('interestRateChange'));
    var option = {
        color: [
            "#62a6f2","#feb535"
        ],
        calculable : true,
        legend:{
        	show:true,
        	data:["销售毛利率",'销售净利率']
        },
        grid:{
        	show:true,
        	right:'5%',
        	left:'5%',
        	bottom:'30%'
        },
        xAxis : {
                type : 'category',
                data : dateList//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
        label:{
			normal:{
				show:true,
				position:'top'
			}
		},
        yAxis :[
            {
                type : 'value',
                name:"单位：万元",
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            },
            {
                type : 'value',
                name:"单位：%",
                min:0,
                max:100,
                axisLabel:{
                	show:true,
                	formatter:"{value}"
                }
            }
            ],
        series : [
            {
                name:'销售毛利率',
                type:'line',
                symbol:"circle",
                data:yingyeDataList//[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
             {
                name:'销售净利率',
                type:'line',
//              barMaxWidth:'30',
				symbol:"circle",
                data:REVZengZhangLvList,//[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                axisLine:{
                	show:false
                }
            }
        ]
    };
  
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
	});
	
	})
}