function formartData(arr)
{
	var dataarr = [];
	if(arr.length>0)
	{
		var itemarr = [];
		$.each(arr, function(i,item) {
			itemarr = [];
		
			//itemarr[0] = item.stockCode;
			itemarr[0] = item.date+"";
			itemarr[1] = item.openPrice+"";
			itemarr[2] = item.yClosePrice+"";
			itemarr[3] = item.highPrice+"";
			itemarr[4] = item.lowPrice+"";
			itemarr[5] = item.changeAmount+"";
			itemarr[6] = item.priceChangeRatio+"";
			itemarr[7] = item.volume+"";

			
			dataarr.push(itemarr);
		});
		return dataarr;
	}
	
}

var upColor = '#f4363e';
var downColor = '#26a844';
//	
//var width = $(".contents").width();
//	console.log(width)
//	$(".lines-echarts").css("width",width);

var dKLineData = '';
var wKLineData = '';
var mKLineData = '';
var _data = {};
//指数k线图

function ajxrequestdata(code,domId,isXSB){
var paraminfo='{"body":{"code":"'+code+'"}}';
//if(isXSBCompany(code)){
//	var isXSB=true;
//}else{
//	var isXSB=false;
//}
$.axsRequest("FT303",paraminfo,false,function(data){
		if(data.retCode == "0000") {
			var result = data.retData;
			if(result != "" && result != null && result != undefined) {
				result.DKLine = formartData(result.DKLine);
				result.MKLine = formartData(result.MKLine);   
				result.WKLine = formartData(result.WKLine);
				
				_data.dKLineData = splitData(result.DKLine);
				_data.wKLineData = splitData(result.WKLine);
				_data.mKLineData = splitData(result.MKLine);
				
				//					console.log(_data.dKLineData)
				setTimeout(function() {
					drawEcharts(isXSB,_data.dKLineData, 80,domId);
				}, 500)
				var p = $("<p>");
				p.css("color", "#f13944");
				//					console.log(_data.dKLineData)
				if(_data.dKLineData==undefined) return;
				if(_data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != "" && _data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != null && _data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != "null" && _data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != undefined) {
					$("#"+domId+" .dataTime").html(_data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1]);
				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][0] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][0] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][0] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][0] != undefined ) {
					//console.log(_data.dKLineData.values[_data.dKLineData.values.length - 1][0])
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][0] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][0]) {
						$("#"+domId+" .open").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][0]).toFixed(2));
					} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][0] < _data.dKLineData.values[_data.dKLineData.values.length - 2][0]) {
						$("#"+domId+" .open").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][0]).toFixed(2));
					}

				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][1] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][1] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][1] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][1] !=undefined) {
					// $("#close").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][1]).toFixed(2));
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][1] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][1]) {
						$("#"+domId+" .close").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][1]).toFixed(2));
					} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][1] < _data.dKLineData.values[_data.dKLineData.values.length - 2][1]) {
						$("#"+domId+" .close").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][1]).toFixed(2));
					}

				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][2] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][2] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][2] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][2] != undefined) {
					// $("#highest").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][2]).toFixed(2));
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][2] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][2]) {
						$("#"+domId+" .highest").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][2]).toFixed(2));
					} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][2] < _data.dKLineData.values[_data.dKLineData.values.length - 2][2]) {
						$("#"+domId+" .highest").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][2]).toFixed(2));
					}
				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][3] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][3] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][3] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][3] != undefined) {
					//$("#lowest").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][3]).toFixed(2));
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][3] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][3]) {
						$("#"+domId+" .lowest").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][3]).toFixed(2));
					} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][3] < _data.dKLineData.values[_data.dKLineData.values.length - 2][3]) {
						$("#"+domId+" .lowest").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][3]).toFixed(2));
					}

				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][4] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][4] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][4] != undefined) {
					//console.log(_data.dKLineData.values[_data.dKLineData.values.length - 1][4])
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][4] >= 0) {
						$("#"+domId+" .zhangDie").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][4]).toFixed(2))
					} else {
						$("#"+domId+" .zhangDie").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][4]).toFixed(2))
					}

				} else {
					$("#"+domId+" .zhangDie").removeAttr("class").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][4]).toFixed(2))
				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][5] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][5] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][5] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][5] != undefined) {
					// $("#zhangFu").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2) + "%");
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][5] >= 0) {
						$("#"+domId+" .zhangFu").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2) + "%")
					} else {
						$("#"+domId+" .zhangFu").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2) + "%")
					}
				} else {
					$("#"+domId+" .zhangFu").removeAttr("class").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2))

				}
				if(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][6] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][6] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][6] != undefined) {
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] > 10000) {
						if(isXSB){
							$("#"+domId+" .line-cjl-span").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] / 10000).toFixed(2) + "万股");
						}else{
							$("#"+domId+" .line-cjl-span").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] / 10000/100).toFixed(2) + "万手");
						}
					} else {
						if(isXSB){
							$("#"+domId+" .line-cjl-span").html(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] + "股");
						}else{
							$("#"+domId+" .line-cjl-span").html((_data.dKLineData.values[_data.dKLineData.values.length - 1][6])/100 + "手");
						}
					}
				}
			} else {
				var div = '<div class="noDatas noDatas-s1">暂无数据</div>';
				$("#"+domId+" .KLineEcharts").html(div);
			}
	} else {
		errorAlert(data.retCode, data.retMsg);
	}
});
}
//研报市场信息
function ajxCompanyMarketData(type,stockCode,domId){
	var paraminfo='{"body":{"stockCode":"'+stockCode+'"}}';
	if(type){
		var urlCode="FT509";
	}else{
		var urlCode="FT605";
	}
	$.axsRequest(urlCode,paraminfo,true,function(data){
		if(data.retCode == "0000") {
				var result = data.retData;
				if(result != "" && result != null && result != undefined) {
//					result.dKLine = formartData(result.dKLine);
//					result.mKLine = formartData(result.mKLine);   
//					result.wKLine = formartData(result.WKLine);
//					
					_data.dKLineData = splitData(result.dKLine);
					_data.mKLineData = splitData(result.mKLine);
					_data.wKLineData = splitData(result.wKLine);
//					console.log(1111111)
					setTimeout(function() {
						drawEcharts(type,_data.dKLineData, 80,domId);
					}, 500)
					var p = $("<p>");
					p.css("color", "#f13944");
//					console.log(_data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1])
					
					if(_data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != "" && _data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != null && _data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != "null" && _data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1] != undefined) {
						$("#"+domId+" .dataTime").html(_data.dKLineData.categoryData[_data.dKLineData.categoryData.length - 1]);
					
					}
//					console.log(_data.dKLineData.values.length)
					if(_data.dKLineData.values.length==0) return;
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1]==undefined || _data.dKLineData.values[_data.dKLineData.values.length - 2]==undefined) return;
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][0] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][0] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][0] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][0] != undefined) {
						//console.log(_data.dKLineData.values[_data.dKLineData.values.length - 1][0])
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][0] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][0]) {
							$("#"+domId+" .open").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][0]).toFixed(2));
						} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][0] < _data.dKLineData.values[_data.dKLineData.values.length - 2][0]) {
							$("#"+domId+" .open").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][0]).toFixed(2));
						}
	
					}
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][1] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][1] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][1] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][1] != undefined) {
						// $("#close").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][1]).toFixed(2));
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][1] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][1]) {
							$("#"+domId+" .close").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][1]).toFixed(2));
						} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][1] < _data.dKLineData.values[_data.dKLineData.values.length - 2][1]) {
							$("#"+domId+" .close").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][1]).toFixed(2));
						}
	
					}
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][2] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][2] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][2] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][2] != undefined) {
						// $("#highest").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][2]).toFixed(2));
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][2] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][2]) {
							$("#"+domId+" .highest").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][2]).toFixed(2));
						} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][2] < _data.dKLineData.values[_data.dKLineData.values.length - 2][2]) {
							$("#"+domId+" .highest").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][2]).toFixed(2));
						}
					}
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][3] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][3] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][3] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][3] != undefined) {
						//$("#lowest").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][3]).toFixed(2));
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][3] >= _data.dKLineData.values[_data.dKLineData.values.length - 2][3]) {
							$("#"+domId+" .lowest").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][3]).toFixed(2));
						} else if(_data.dKLineData.values[_data.dKLineData.values.length - 1][3] < _data.dKLineData.values[_data.dKLineData.values.length - 2][3]) {
							$("#"+domId+" .lowest").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][3]).toFixed(2));
						}
	
					}
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][4] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][4] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][4] != undefined) {
						//console.log(_data.dKLineData.values[_data.dKLineData.values.length - 1][4])
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][4] >= 0) {
							$("#"+domId+" .zhangDie").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][4]).toFixed(2))
						} else {
							$("#"+domId+" .zhangDie").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][4]).toFixed(2))
						}
	
					} else {
						$("#"+domId+" .zhangDie").removeAttr("class").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][4]).toFixed(2))
					}
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][5] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][5] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][5] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][5] != undefined) {
						// $("#zhangFu").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2) + "%");
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][5] >= 0) {
							$("#"+domId+" .zhangFu").removeClass("down").addClass("up").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2) + "%")
						} else {
							$("#"+domId+" .zhangFu").removeClass("up").addClass("down").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2) + "%")
						}
					} else {
						$("#"+domId+" .zhangFu").removeAttr("class").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][5]).toFixed(2))
	
					}
					if(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] != "" && _data.dKLineData.values[_data.dKLineData.values.length - 1][6] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][6] != "null" && _data.dKLineData.values[_data.dKLineData.values.length - 1][6] != undefined) {
						if(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] > 10000) {
							if(type){
								$("#"+domId+" .line-cjl-span").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] / 10000).toFixed(2) + "万股");
							}else{
								$("#"+domId+" .line-cjl-span").html(Number(_data.dKLineData.values[_data.dKLineData.values.length - 1][6] / 10000/100).toFixed(2) + "万手");
							}
							
						} else {
							if(type){
								$("#"+domId+" .line-cjl-span").html((_data.dKLineData.values[_data.dKLineData.values.length - 1][6]) + "股");
							}else{
								$("#"+domId+" .line-cjl-span").html((_data.dKLineData.values[_data.dKLineData.values.length - 1][6]/100) + "手");
							}
						}
					}
					
				} else {
					var div = '<div class="noDatas noDatas-s1">暂无数据</div>';
					$("#"+domId+" .KLineEcharts").html(div);
				}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

function splitData(rawData) {
	var categoryData = [];
	var values = [];
	var volumes = [];
	if(rawData==undefined) return;
	for(var i = 0; i < rawData.length; i++) {
		categoryData.push(rawData[i].splice(0, 1)[0]);
		values.push(rawData[i]);
		volumes.push([i, rawData[i][6] > 0 ? rawData[i][6] : 0, rawData[i][0] > rawData[i][1] ? 1 : -1]);
	}

	return {
		categoryData: categoryData,
		values: values,
		volumes: volumes
	};
}

function calculateMA(dayCount, data) {
	var result = [];
	for(var i = 0, len = data.values.length; i < len; i++) {
		if(i < dayCount) {
			result.push('-');
			continue;
		}
		var sum = 0;
		for(var j = 0; j < dayCount; j++) {
			sum += data.values[i - j][1];
		}
		result.push(+(sum / dayCount).toFixed(3));
	}
	return result;
}

function drawEcharts(isXSB,rawData, starts,domId) {
	$("#"+domId+" .KLineEcharts").css("width",$("#"+domId).width());
//	document.getElementById('KLine').style.width = $("#"+domId).width();
	// 	console.log()
	var data = rawData;
	if(data==undefined) return;
	var length = data.categoryData.length;
	var startValue = '';
	if(starts == 0) {
		startValue = 0;
	} else {
		startValue = ((length - starts) / length) * 100;
	}

	//	console.log(startValue)
	var option = {
		backgroundColor: '#fff',
		animation: false,
		//      legend: {
		//          bottom: 10,
		//          left: 'center',
		//          data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
		//      },
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			},
			backgroundColor: 'rgba(245, 245, 245, 0.8)',
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000'
			},
			//          position: function (pos, params, el, elRect, size) {          
			//              var obj = {top: 10};
			//              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
			//              return obj; 
			//          }, 
			formatter: function(param) {
				//							console.log(param)
				//							console.log(param[0].axisValue);
				var _res = getdata(param[0].axisValue);
				//							console.log(_res)
				if(param[0].componentSubType == "candlestick") {
					if(param[0].axisValue != null && param[0].axisValue != "null" && param[0].axisValue != undefined && param[0].axisValue != "") {
						$("#"+domId+" .dataTime").html(param[0].axisValue);
					} else {
						$("#"+domId+" .dataTime").html("--");
					}
					if(param[0].data[1] != "" && param[0].data[1] != null && param[0].data[1] != "null" && param[0].data[1] != undefined) {
						// $("#open").html(Number(param[0].data[1]).toFixed(2));
						if(param[0].data[1] >= _res[1]) {
							$("#"+domId+" .open").removeClass("down").addClass("up").html(Number(param[0].data[1]).toFixed(2));
						} else if(param[0].data[1] < _res[1]) {
							$("#"+domId+" .open").removeClass("up").addClass("down").html(Number(param[0].data[1]).toFixed(2));
						}
						//$("#open").removeAttr("class").html(Number(param[0].data[1]).toFixed(2));
					} else {
						$("#"+domId+" .open").removeAttr("class").html("--");
					}
					if(param[0].data[2] != "" && param[0].data[2] != null && param[0].data[2] != "null" && param[0].data[2] != undefined) {
						// $("#close").html(Number(param[0].data[2]).toFixed(2));
						if(param[0].data[2] >= _res[2])
							$("#"+domId+" .close").removeClass("down").addClass("up").html(Number(param[0].data[2]).toFixed(2));
						else if(param[0].data[2] < _res[2])
							$("#"+domId+" .close").removeClass("up").addClass("down").html(Number(param[0].data[2]).toFixed(2));
						//                          else
						//                              $("#close").removeAttr("class").html(Number(param[0].data[2]).toFixed(2));
					} else {
						$("#"+domId+" .close").removeAttr("class").html("--");
					}
					if(param[0].data[3] != "" && param[0].data[3] != null && param[0].data[3] != "null" && param[0].data[3] != undefined) {
						// $("#highest").html(Number(param[0].data[3]).toFixed(2));
						if(param[0].data[3] >= _res[3])
							$("#"+domId+" .highest").removeClass("down").addClass("up").html(Number(param[0].data[3]).toFixed(2));
						else if(param[0].data[3] < _res[3])
							$("#"+domId+" .highest").removeClass("up").addClass("down").html(Number(param[0].data[3]).toFixed(2));
						//                          else
						//                              $("#highest").removeAttr("class").html(Number(param[0].data[3]).toFixed(2));
					} else {
						$("#"+domId+" .highest").removeAttr("class").html("--");
					}
					if(param[0].data[4] != "" && param[0].data[4] != null && param[0].data[4] != "null" && param[0].data[4] != undefined) {
						// $("#lowest").html(Number(param[0].data[4]).toFixed(2));
						if(param[0].data[4] >= _res[4])
							$("#"+domId+" .lowest").removeClass("down").addClass("up").html(Number(param[0].data[4]).toFixed(2));
						else if(param[0].data[4] < _res[4])
							$("#"+domId+" .lowest").removeClass("up").addClass("down").html(Number(param[0].data[4]).toFixed(2));
						//                          else
						//                              $("#lowest").removeAttr("class").html(Number(param[0].data[4]).toFixed(2));
					} else {
						$("#"+domId+" .lowest").removeAttr("class").html("--");
					}
					if(param[0].data[5] != "" && param[0].data[5] != null && param[0].data[5] != "null" && param[0].data[5] != undefined) {
						if(param[0].data[5] >= 0)
							$("#"+domId+" .zhangDie").removeClass("down").addClass("up").html(Number(param[0].data[5]).toFixed(2));
						else if(param[0].data[5] < 0)
							$("#"+domId+" .zhangDie").removeClass("up").addClass("down").html(Number(param[0].data[5]).toFixed(2));
						//                          else
						//                              $("#zhangDie").removeAttr("class").html(Number(param[0].data[5]).toFixed(2));
					} else {
						$("#"+domId+" .zhangDie").removeAttr("class").html("--");
					}
					if(param[0].data[6] != "" && param[0].data[6] != null && param[0].data[6] != "null" && param[0].data[6] != undefined) {
						// $("#zhangFu").html(Number(param[0].data[6]).toFixed(2));
						if(param[0].data[6] >= 0)
							$("#"+domId+" .zhangFu").removeClass("down").addClass("up").html(Number(param[0].data[6]).toFixed(2) + "%");
						else if(param[0].data[6] < 0)
							$("#"+domId+" .zhangFu").removeClass("up").addClass("down").html(Number(param[0].data[6]).toFixed(2) + "%");
						//                          else
						//                              $("#zhangFu").removeAttr("class").html(Number(param[0].data[6]).toFixed(2));
					} else {
						$("#"+domId+" .zhangFu").removeAttr("class").html("--");
					}
					if(param[0].data[7] != "" && param[0].data[7] != null && param[0].data[7] != "null" && param[0].data[7] != undefined) {
						if(param[0].data[7] > 10000) {
							if(isXSB){
								$("#"+domId+" .line-cjl-span").html(Number((param[0].data[7] / 10000)).toFixed(2) + "万股");
							}else{
								$("#"+domId+" .line-cjl-span").html(Number((param[0].data[7] / 10000/100)).toFixed(2) + "万手");
							}
							
						} else {
							if(isXSB){
								$("#"+domId+" .line-cjl-span").html((param[0].data[7]) + "股");
							}else{
								$("#"+domId+" .line-cjl-span").html((param[0].data[7]/100) + "手")
							}
						}
					} else {
						$("#"+domId+" .line-cjl-span").html("--")
					}

				} else {
					if(param[0].axisValue != null && param[0].axisValue != "null" && param[0].axisValue != undefined && param[0].axisValue != "") {
						$("#"+domId+" .dataTime").html(param[0].axisValue);
					} else {
						$("#"+domId+" .dataTime").html("--");
					}
					//开
					if(param[1].data[1] != "" && param[1].data[1] != null && param[1].data[1] != "null" && param[1].data[1] != undefined) {
						// $("#open").html(Number(param[1].data[1]).toFixed(2));
						if(param[1].data[1] >= _res[1])
							$("#"+domId+" .open").removeClass("down").addClass("up").html(Number(param[1].data[1]).toFixed(2));
						else if(param[1].data[1] < _res[1])
							$("#"+domId+" .open").removeClass("up").addClass("down").html(Number(param[1].data[1]).toFixed(2));
						//                          else
						//                              $("#open").html(Number(param[1].data[1]).toFixed(2));
					} else {
						$("#"+domId+" .open").removeAttr("class").html("--");
					}
					//收
					if(param[1].data[2] != "" && param[1].data[2] != null && param[1].data[2] != "null" && param[1].data[2] != undefined) {
						// $("#close").html(Number(param[1].data[2]).toFixed(2));
						if(param[1].data[2] >= _res[2])
							$("#"+domId+" .close").removeClass("down").addClass("up").html(Number(param[1].data[2]).toFixed(2));
						else if(param[1].data[2] < _res[2])
							$("#"+domId+" .close").removeClass("up").addClass("down").html(Number(param[1].data[2]).toFixed(2));
						//                          else
						//                              $("#close").removeAttr("class").html(Number(param[1].data[2]).toFixed(2));
					} else {
						$("#"+domId+" .close").removeAttr("class").html("--");
					}
					//高
					if(param[1].data[3] != "" && param[1].data[3] != null && param[1].data[3] != "null" && param[1].data[3] != undefined) {
						// $("#highest").html(Number(param[1].data[3]).toFixed(2));
						if(param[1].data[3] >= _res[3])
							$("#"+domId+" .highest").removeClass("down").addClass("up").html(Number(param[1].data[3]).toFixed(2));
						else if(param[1].data[3] < _res[3])
							$("#"+domId+" .highest").removeClass("up").addClass("down").html(Number(param[1].data[3]).toFixed(2));
						//                          else
						//                              $("#highest").removeAttr("class").html(Number(param[1].data[3]).toFixed(2));
					} else {
						$("#"+domId+" .highest").removeAttr("class").html("--");
					}
					//低
					if(param[1].data[4] != "" && param[1].data[4] != null && param[1].data[4] != "null" && param[1].data[4] != undefined) {
						// $("#lowest").html(Number(param[1].data[4]).toFixed(2));
						if(param[1].data[4] >= _res[4])
							$("#"+domId+" .lowest").removeClass("down").addClass("up").html(Number(param[1].data[4]).toFixed(2));
						else if(param[1].data[4] < _res[4])
							$("#"+domId+" .lowest").removeClass("up").addClass("down").html(Number(param[1].data[4]).toFixed(2));
						//                          else
						//                              $("#lowest").removeAttr("class").html(Number(param[1].data[4]).toFixed(2));
					} else {
						$("#"+domId+" .lowest").removeAttr("class").html("--");
					}
					if(param[1].data[5] != "" && param[1].data[5] != null && param[1].data[5] != "null" && param[1].data[5] != undefined) {
						// $("#zhangDie").html(Number(param[1].data[5]).toFixed(2));
						if(param[1].data[5] > 0)
							$("#"+domId+" .zhangDie").removeClass("down").addClass("up").html(Number(param[1].data[5]).toFixed(2));
						else if(param[1].data[5] < 0)
							$("#"+domId+" .zhangDie").removeClass("up").addClass("down").html(Number(param[1].data[5]).toFixed(2));
						else
							$("#"+domId+" .zhangDie").removeAttr("class").html(Number(param[1].data[5]).toFixed(2));
					} else {
						$("#"+domId+" .zhangDie").removeAttr("class").html("--");
					}
					if(param[1].data[6] != "" && param[1].data[6] != null && param[1].data[6] != "null" && param[1].data[6] != undefined) {
						// $("#zhangFu").html(Number(param[1].data[6]).toFixed(2) + "%");
						if(param[1].data[6] > 0)
							$("#"+domId+" .zhangFu").removeClass("down").addClass("up").html(Number(param[1].data[6]).toFixed(2) + "%");
						else if(param[1].data[6] < 0)
							$("#"+domId+" .zhangFu").removeClass("up").addClass("down").html(Number(param[1].data[6]).toFixed(2) + "%");
						else
							$("#"+domId+" .zhangFu").removeAttr("class").html(Number(param[1].data[6]).toFixed(2));
					} else {
						$("#"+domId+" .zhangFu").removeAttr("class").html("--");
					}
					if(param[1].data[7] != "" && param[1].data[7] != null && param[1].data[7] != "null" && param[1].data[7] != undefined) {
						if(param[1].data[7] > 10000) {
							//alert(0)
							if(isXSB){
								$("#"+domId+" .line-cjl-span").html(Number((param[1].data[7] / 10000)).toFixed(2) + "万股");
							}else{
								$("#"+domId+" .line-cjl-span").html(Number((param[1].data[7] / 10000/100)).toFixed(2) + "万手")
							}
							
						} else {
							//alert(1)
							if(isXSB){
								$("#"+domId+" .line-cjl-span").html((param[1].data[7]) + "股")
							}else{
								$("#"+domId+" .line-cjl-span").html((param[1].data[7])/100 + "手")
							}
							
						}
					} else {
						$("#"+domId+" .line-cjl-span").html("--")
					}

				}

			},
			extraCssText: 'width: 170px'
		},
		axisPointer: {
			link: {
				xAxisIndex: 'all'
			},
			label: {
				backgroundColor: '#777'
			}
		},
		visualMap: {
			show: false,
			seriesIndex: 5,
			dimension: 2,
			pieces: [{
				value: 1,
				color: downColor
			}, {
				value: -1,
				color: upColor
			}]
		},
		grid: [{
				left: '15%',
				right: '0',
				height: '50%',
				top: '5%'
			},
			{
				left: '15%',
				right: '0',
				top: '73%',
				height: '16%'
			}
		],
		xAxis: [{
				type: 'category',
				data: data.categoryData,
				scale: true,
				axisLine:{lineStyle:{color: '#666'}},
				boundaryGap: true,
				axisTick: {
					onGap: false
				},
				axisLine: {
					onZero: false
				},
				splitLine: {
					show: false
				},
				splitNumber: 20,
				min: 'dataMin',
				max: 'dataMax',
				axisPointer: {
					z: 100
				}
			},
			{
				type: 'category',
				gridIndex: 1,
				data: data.categoryData,
				scale: true,
				axisLine: {lineStyle:{color:'#666'}},
				boundaryGap: true,
				axisLine: {
					onZero: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitNumber: 20,
				min: 'dataMin',
				max: 'dataMax',
				//                 axisPointer: {
				//                     label: {
				//                         formatter: function (params) {
				//                             var seriesValue = (params.seriesData[0] || {}).value;
				//                             return params.value
				// //                          + (seriesValue != null ? '\n' + echarts.format.addCommas(seriesValue): ''
				// //                          );
				//                         }
				//                     }
				//                 }
			}
		],
		yAxis: [{

				scale: true,
				axisLine: { lineStyle: { color: '#666' } },
				splitArea: {
					show: true
				}
			},
			{

				scale: true,
				gridIndex: 1,
				splitNumber: 2,
				// boundaryGap:[2,2],//负数设置
				// axisLabel: {show: false},
				// axisLine: {show: false},
				// axisTick: {show: false},
				splitLine: {
					show: false
				},
				axisLine: { lineStyle: { color: '#666' } },
				// min: function (value) {
				//     if(value.min > 10000)
				//         return value.min / 10000;
				//     else
				//     return value.min
				// },
				// max: function (value) {
				//     if(value.max > 10000)
				//     return value.max / 10000;
				//     else
				//     return value.max
				// }
				axisLabel: {
					formatter: function(value, index) {
						// 格式化成月/日，只在第一个刻度显示年份
						// var date = new Date(value);
						//console.log(value)
						if(value > 10000) {

							// console.log(value);
							return value / 10000 + "万";
						}
						// return value / 10000 + "万";
						else
							return value + "10000"
						// return texts.join('/');
					}
				}

			}
		],
		dataZoom: [{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: startValue,
				end: 100
			},
			{
				show: true,
				xAxisIndex: [0, 1],
				type: 'slider',
				top: '93%',
				start: startValue,
				end: 100
			}
		],
		series: [{
				name: 'Dow-Jones index',
				type: 'candlestick',
				data: data.values,
				itemStyle: {
					normal: {
						color: upColor,
						color0: downColor,
						borderColor: null,
						borderColor0: null
					}
				},
				tooltip: {
					formatter: function(param) {
						//                      return [
						//                          'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
						//                          'Open: ' + param.data[0] + '<br/>',
						//                          'Close: ' + param.data[1] + '<br/>',
						//                          'Lowest: ' + param.data[2] + '<br/>',
						//                          'Highest: ' + param.data[3] + '<br/>'
						//                      ].join('');
					}
				}
			},
			{
				name: 'MA5',
				type: 'line',
				symbolSize: 0,
				//              showSymbol:false,            
				data: calculateMA(5, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0
					}
				}
			},
			{
				name: 'MA10',
				type: 'line',
				//              showSymbol:false,
				symbolSize: 0,
				data: calculateMA(10, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0
					}
				}
			},
			{
				name: 'MA20',
				type: 'line',
				symbolSize: 0,
				//              showSymbol:false,
				data: calculateMA(20, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0
					}
				}
			},
			{
				name: 'MA30',
				type: 'line',
				symbolSize: 0,
				//              showSymbol:false,
				data: calculateMA(30, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0
					}
				}
			},
			{
				name: 'Volume',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: data.volumes
			}
		]
	};

	// myChart.on('brushSelected', renderBrushed);

	// function renderBrushed(params) {
	//     var sum = 0;
	//     var min = Infinity;
	//     var max = -Infinity;
	//     var countBySeries = [];
	//     var brushComponent = params.brushComponents[0];

	//     var rawIndices = brushComponent.series[0].rawIndices;
	//     for (var i = 0; i < rawIndices.length; i++) {
	//         var val = data.values[rawIndices[i]][1];
	//         sum += val;
	//         min = Math.min(val, min);
	//         max = Math.max(val, max);
	//     }

	//     panel.innerHTML = [
	//         '<h3>STATISTICS:</h3>',
	//         'SUM of open: ' + (sum / rawIndices.length).toFixed(4) + '<br>',
	//         'MIN of open: ' + min.toFixed(4) + '<br>',
	//         'MAX of open: ' + max.toFixed(4) + '<br>'
	//     ].join(' ');
	// }

	var myChart = echarts.init($("#"+domId+" .KLineEcharts")[0]);
	myChart.clear();
	myChart.dispatchAction({
		type: 'brush',
		areas: [{
			brushType: 'lineX',
			coordRange: ['2016-06-02', '2016-06-20'],
			xAxisIndex: 0
		}]
	});

	myChart.setOption(option);
	//var picInfo = myChart.getDataURL();
    var picInfo = myChart.getDataURL();	
//	console.log(picInfo)
//	
	$("#"+domId).find("#picInfoSrc").remove();
	$("#"+domId).find(".insertbefordiv").append('<input id="picInfoSrc" type="hidden" idx="0" value="'+picInfo+'">');
	if (typeof echartsOptions != "undefined" && typeof stockCode != "undefined" ) {
			var key = "kLineChart_"+stockCode;
			if(echartsOptions[key] == null)
			{
				var jsonStr = '{"'+key+'":'+JSON.stringify(option)+'}';
			    $.extend(echartsOptions, $.parseJSON(jsonStr) );
			}
	}

//	console.log(picInfo);
	window.addEventListener("resize", function() {
		myChart.resize();
	})
	var getdata = function(_data) {
		// if (type === "dKLine") {
		var _idx = 0,
			_result;
		$.each(data.categoryData, function(k, v) {
			//console.log(data.categoryData)
			if(_data === v) {
				// console.log(v)
				// console.log(data.categoryData[k - 1])
				if(k !== 0)
					_idx = k - 1;
				return false;
			}

		})
		$.each(data.values, function(k, v) {
			if(k === _idx) {
				_result = v;
				// console.log( _result.join(''))
				return false;
			}

		})
		return _result;
		// return 0;

	}
}
$(function() {
	
	$(".lines-type span").on("click", function() {
		//var domId=$(".lines-type span").parents(".contents").attr("id");
		var domId=$(this).parents(".contents").attr("id");
		$(this).addClass("on").siblings().removeClass("on");
		var typeval=$("#data-kanban .switch.active").attr("data-type");
		if(typeval=="SB"){
			var isXSB=true;
		}else{
			var isXSB=false;
		}
		if($(this).text() == "日K图") {
			drawEcharts(isXSB,_data.dKLineData, 80,domId);
		} else if($(this).text() == "周K图") {
			drawEcharts(isXSB,_data.wKLineData, 48,domId);
		} else if($(this).text() == "月K图") {
			drawEcharts(isXSB,_data.mKLineData, 0,domId);
		}
	})

})