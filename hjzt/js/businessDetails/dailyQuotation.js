var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
var data = [];
$(function(){
	
	loadDQ(1,30,"");
	
	//绘制K线图
//	drawChart();
	
	$(".yjy_title a").click(function(){
		$(".yjy_title a").attr("class","");
		$(this).attr("class","on");
		if($(this).text() == "本年度"){
			loadDQ(1,30,"");
		}else{
			loadDQ(1,30,$(this).text());
		}
	})
	
})

//K线图
//var data = splitData([
//   ["2004-01-02",232374,200000,240000,132374],
//   ["2004-01-05",10411.85,10544.07,10411.85,10575.92,221290000],
//   ["2004-01-06",10543.85,10538.66,10454.37,10584.07,191460000],
//   ["2004-01-07",10535.46,10529.03,10432,10587.55,225490000],
//   ["2004-01-08",10530.07,10592.44,10480.59,10651.99,237770000],
//   ["2004-01-09",10589.25,10458.89,10420.52,10603.48,223250000],
//   ["2004-01-12",10461.55,10485.18,10389.85,10543.03,197960000],
//   ["2004-01-13",10485.18,10427.18,10341.19,10539.25,197310000],
//   ["2004-01-14",10428.67,10538.37,10426.89,10573.85,186280000],
//   ["2004-01-15",10534.52,10553.85,10454.52,10639.03,260090000],
//   ["2004-01-16",10556.37,10600.51,10503.7,10666.88,254170000],
//   ["2004-01-20",10601.4,10528.66,10447.92,10676.96,224300000],
//   ["2004-01-21",10522.77,10623.62,10453.11,10665.7,214920000],
//   ["2004-01-22",10624.22,10623.18,10545.03,10717.4,219720000],
//   ["2004-01-23",10625.25,10568.29,10490.14,10691.77,234260000],
//   ["2004-01-26",10568,10702.51,10510.44,10725.18,186170000],
//   ["2004-01-27",10701.1,10609.92,10579.33,10748.81,206560000]
//   
//]);


function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns=[];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns:volumns
    };
}

function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}

function drawChart(){
	var myChart=echarts.init(document.getElementById('hq_tb1'));
	option = {
        backgroundColor: '#fff',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center'
           // data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            formatter: function (param) {
            	var param = param[0];
            	if(param.data.length == undefined){
            		return[
            		       	param.name + '<hr size=1 style="margin: 3px 0">',
        					'成交量: ' + param.data
            		      ].join('');
            	}else{
            		return [
        					param.name + '<hr size=1 style="margin: 3px 0">',
        					'开盘: ' + param.data[2] + ' 最高：'+param.data[0]+'<br/>',
        					'收盘: ' + param.data[1] + ' 最低：'+param.data[3]+'<br/>',
        					'涨跌: ' + param.data[6] + '<br/>',
        					'涨跌幅: ' + param.data[7] + '<br/>',
        					'成交量: ' + param.data[4] + '<br/>',
        					'成交额: ' + param.data[5] + '<br/>'
                        ].join('');
            	}
                
            }
        },
        /*brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },*/
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '50%'
            },
            {
                left: '10%',
                right: '8%',
                top: '65%',
                height: '10%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: data.categoryData,
//              scale: true,
//              boundaryGap : false,
//              axisLine: {onZero: false},
//              splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
//              scale: true,
//              boundaryGap : false,
//              axisLine: {onZero: false},
//              axisTick: {show: false},
//              splitLine: {show: false},
//              axisLabel: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 10,
                end: 100
            }
        ],
        series: [
            {
                name: 'Dow-Jones index',
                type: 'candlestick',
                data: data.values,
                itemStyle: {
                    normal: {
                        borderColor: null,
                        borderColor0: null
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        var param = param[0];
                        return [
                        ].join('');
                    }
                }
            },
//          {
//              name: 'MA5',
//              type: 'line',
//              data: calculateMA(5, data),
//              smooth: true,
//              lineStyle: {
//                  normal: {opacity: 0.5}
//              }
//          },
//          {
//              name: 'MA10',
//              type: 'line',
//              data: calculateMA(10, data),
//              smooth: true,
//              lineStyle: {
//                  normal: {opacity: 0.5}
//              }
//          },
//          {
//              name: 'MA20',
//              type: 'line',
//              data: calculateMA(20, data),
//              smooth: true,
//              lineStyle: {
//                  normal: {opacity: 0.5}
//              }
//          },
//          {
//              name: 'MA30',
//              type: 'line',
//              data: calculateMA(30, data),
//              smooth: true,
//              lineStyle: {
//                  normal: {opacity: 0.5}
//              }
//          },
            {
                name: '成交量',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumns
            }
        ]
    }

myChart.setOption(option);
}

/**
 * 加载每日行情
 */
function loadDQ(pageNum, pageSize, dataTime){
	$.axs("/betaStock/qutation/findDQByStockCode.do", {
		pageNum : pageNum,
		pageSize : pageSize,
		stockCode : stockCode,
		dataTime : dataTime
	}, false, function(Data) {
		if(Data.retCode=="0000"){
			var allData = "[";
			$("#dqList").empty();
			if(Data.retData.dqList != null && Data.retData.dqList != ""){
				$("#hq_tb1").show();
				$(Data.retData.dqList).each(function(index, item){
					if(index == 0){
						$("#maxDate").text(this.dataTime);
					}
					if((index + 1) == Data.retData.dqList.length){
						$("#minDate").text(this.dataTime);
					}
					var stockData = "[";
					stockData += "'" + this.dataTime + "',"; //加入时间
					stockData += this.highPrice + ","; //加入最高价
					stockData += this.yClosePrice + ","; //加入收盘价
					stockData += this.openPrice + ","; //加入开盘价
					stockData += this.lowPrice + ","; //加入最低价
					stockData += ((this.tradingVolume/10000).toFixed(2)) + ","; //加入成交量
					stockData += (this.tradingAmount/10000).toFixed(2) + ","; //加入成交额
					stockData += (this.changeAmount).toFixed(3) + ","; //加入涨跌额
					stockData += (this.priceChangeRatio).toFixed(3); //加入涨跌幅
					stockData += "]";
					var tr = $("<tr>");
					var td1 = $("<td class='shuzi hq_gray'>");
					var td2 = $("<td class='shuzi hq_blue'>");
					var td3 = $("<td class='shuzi hq_blue'>");
					var td4 = $("<td class='shuzi hq_blue'>");
					var td5 = $("<td class='shuzi hq_blue'>");
					var td6 = $("<td class='shuzi'>");
					var td7 = $("<td class='shuzi'>");
					var td8 = $("<td class='shuzi hq_gray'>");
					var td9 = $("<td class='shuzi hq_blue'>");
					var td10 = $("<td class='shuzi hq_blue'>");
					var td11 = $("<td class='shuzi hq_blue'>");
					var td12 = $("<td class='shuzi hq_gray'>");
					var td13 = $("<td class='shuzi hq_blue'>");
					td1.text(this.dataTime); //时间
					td2.text((this.openPrice).toFixed(2)); //开盘价
					td3.text((this.highPrice).toFixed(2)); //最高价
					td4.text((this.lowPrice).toFixed(2)); //最低价
					td5.text((this.yClosePrice).toFixed(2)); //收盘价
					td6.text((this.changeAmount).toFixed(3)); //涨跌额
					td7.text((this.priceChangeRatio).toFixed(3)); //涨跌幅
					td8.text((this.tradingVolume/10000).toFixed(3)); //成交量
					td9.text((this.tradingAmount/10000).toFixed(2)); //成交额
					td10.text((this.peRatio).toFixed(3)); //市盈率
					td11.text((this.priceSalesRatio).toFixed(3)); //市销率
					td12.text((this.generalCapital/10000).toFixed(3)); //总股本
					td13.text((this.totalMarketValue/10000).toFixed(2)); //总市值
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					tr.append(td7);
					tr.append(td8);
					tr.append(td9);
					tr.append(td10);
					tr.append(td11);
					tr.append(td12);
					tr.append(td13);
					$("#dqList").append(tr);
					allData += stockData + ",";
				})
				allData = allData.substring(0, allData.length - 1);
				allData += "]";
				$('#page').show();
				//分页
				$('#page').pagination({
					total: Data.retData.total,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						loadDQ(pageNumber,size,dataTime);
					}
				});
				//修改分页文字
				setPageText2('page');
				allData = eval(allData);
				data = splitData(allData);
				drawChart();
				
			}else{
				$(".hq_k_title").hide();
				$("#hq_tb1").hide();
				$('#page').hide();
				$("#dqList").append("<tr><td colspan='13' >暂无数据</td></tr>");
			}
		}else{
			errorAlert(Data.retCode,data.retMsg);
		}
	});
}

/**
 * 将大于三位的数字变成每三位用逗号分割的字符串
 * @param num
 * @returns
 */
function formatNumber(num) {
	if(num.length <= 3){
		return num;
	}
    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
        return num;
    }
    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
    var re = new RegExp("(\\d)(\\d{3})(,|$)");
    while (re.test(b))   b = b.replace(re, "$1,$2$3");
    return a + "" + b + "" + c;
}
