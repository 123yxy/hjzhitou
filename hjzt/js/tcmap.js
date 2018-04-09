
var clickPageNum = 2; //翻页页数
var pageTotal = 0; //总页数
var loadType = "init"; //加载的类型   init：初始化加载
var i = 1; //地区的排名
var dataArr = []; //数据
var showDatasJson = new Array(); //地图上显示的数据
var showDatas = '['; //转换成json数据之前的显示数据
function initLoad(){
	var dom = document.getElementById("map");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	var geoMap = '{';
	var jwNum = 1; //在获取经纬度中循环的次数
	var jwStr = ""; //拼接经纬度的字符串
	$(dataArr).each(function(){
		var myGeo = new BMap.Geocoder();
		var areaMsg = this;
		myGeo.getPoint(this.areaName,function(point){
//		    var address=new BMap.Point(point.lng, point.lat);
//		    var lng=point.lng; //经度
//		    var lat=point.lat; //纬度
			jwStr = point.lng + "," + point.lat;
			geoMap += '"'+areaMsg.areaName+'":\['+jwStr.split(",")+'\],';
			if(jwNum == dataArr.length){
				geoMap += '}';
				var geoCoordMap=eval('('+geoMap+')');
				var convertData = function (data) {
				    var res = [];
				    for (var i = 0; i < data.length; i++) {
				        var geoCoord = geoCoordMap[data[i].name];
				        if (geoCoord) {
				            res.push({
				                name: data[i].name,
				                value: geoCoord.concat(data[i].value + "," + data[i].tradingVolume)
				            });
				        }
				    }
				    return res;
				};

				option = {
					backgroundColor:'#fff',
				    tooltip: {
				    	show:true,
				        trigger: 'item',
				        position:"top",
				        formatter: function (params) {
				           	var divHtml='<div class="map_tip">'+
					        				'<span>'+params.name+'</span>'+
											'<span class="red">排名：'+params.value[2].split(",")[0]+'</span>'+
											'<span class="green">交易量：'+params.value[2].split(",")[1]+'%</span>'+
											'<div class="map_tips"></div>'+
										'</div>';
								return 	divHtml;	
				        }
				    },
				    geo: {
				        map: 'china',
				        label: {
				        	normal:{
				        		show:false
				        	},
				            emphasis: {
				                show: false
				            }
				        },
				        itemStyle: {
				            normal: {
				                borderColor: '#000'
				            },
				            emphasis: {//鼠标放上去是时显示的额颜色 
				            }
				        }
				    },
				    series: [
				        {
				            name: '行情交易企业地图',
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            data: convertData(showDatasJson),
				            symbolSize: function(value){
//				                return Math.ceil(value[2]/0.5);
				            	return Math.ceil(value[2].split(",")[1]*0.00005);
				            },
				            label: {//小圆圈内显示数据的value值
				                normal: {
				                    show: false
				                },
				                emphasis: {
				                    show: false
				                },
				                formatter: function (params) {
				    	            return params.name + '<br/>排名: ' + params.value[2].split(",")[0] + '<br/>交易量：'+params.value[2].split(",")[1];
				    	        }
				            },
				            itemStyle: {
				                normal:{
				                    color:"#70c7e3",
				                    borderColor:"#a6e1f3",
				                    borderWidth:1
				                }
//				              emphasis: {
//				                  color:"blue",
//				                  borderColor: '#fff',
//				                  borderWidth: 1
//				              }
				            }
				        }
				    ]
				};
				if (option && typeof option === "object") {
				    myChart.setOption(option, true);
				    window.onresize = myChart.resize;
				}
			}
			jwNum++;
		})
	})
}

$(function(){
	/**
	 * 加载行业
	 */
	loadTrade(2,2);
	
	/**
	 * 加载初始化行情交易数据
	 */
	loadMTMsg(true,"findMTIList.do", 2, 1, 4,"");
	
	/********************测试开始****************************
	/**
	 * 字符串拼接json测试
	 */
//	var str1 = '[';
//	str1 += '{"name":"wang","sex":"man"},';
//	str1 += '{"name":"liu","sex":"woman"},';
//	str1 += ']';
//	alert(str1)
//	var e=eval(str1);
//	alert(e)
//	$(e).each(function(){
//		alert(this.name)
//	})
	/*********************测试结束***************************
	
	/**
	 * 更改行业已选择数量
	 */
	$(".choo").click(function(){
		var num = 0;
		$(".choo").each(function(){
			if(this.checked){
				num++;
			}
		})
		$("#che_yx").text("(" + num + ")");
	})
	
	/**
	 * 点击更改时间段
	 */
	$("[name='time']").click(function(){
		$("[name='showTime']").each(function(index, item){
			if($(this).attr("data-value") != undefined && $(this).attr("data-value") != ""){
				if(index == 0){
					$(this).text("天");
				}
				if(index == 1){
					$(this).text("月");
				}
				if(index == 2){
					$(this).text("年");
				}
				$(this).attr("data-value","");
			}
		})
		$(this).parent().prev().attr("data-value",$(this).attr("data-value")); //添加data-value属性值
		$(this).parent().prev().text($(this).text()); //更改文字
		i = 1;
		$("#mtList").empty();
		loadMTMsg(true,"findMTList.do",2, 1, 3,searchCondition());
	})
})

/**
 * 获取查询的条件
 */
function searchCondition(){
	var conditions = "";
	var industryIds = "";
	//时间段的选择
	$("[name='showTime']").each(function(){
		if($(this).attr("data-value") != undefined && $(this).attr("data-value") != ""){
			conditions += "&dataTime="+$(this).attr("data-value");
		}
	});
	//行业的选择
	$(".choo").each(function(){
		if(this.checked){
			industryIds += $(this).attr("data-value") + ",";
		}
	})
	if(industryIds != ""){
		conditions += "&industryIds="+industryIds;
	}
	return conditions;
}

/**
 * 选择行业后点击确定或者取消
 * @param type
 */
function slideUp(type,data){
	$(data).parent().parent().prev().siblings(".r_industry_sele").slideUp();
    $(data).parent().parent().prev().removeClass("i");
	if(type == "1"){ //确定的
		$("#mtList").empty();
		i = 1;
		loadMTMsg(true,"findMTList.do", 2, 1, 3,searchCondition());
	}
}

/**
 * 加载行业
 */
function loadTrade(type,dataType){
	$.axs("/betaStock/btCategory/findBtCategory.do",{parentId:null,type:type,dataType:dataType},false,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null){
				var firstLetter = ""; //控制是否追加大写字母
				var html = ""; //追加的html代码
				$(data.retData).each(function(index, item){
					if(firstLetter != this.pinyinHeader){
						firstLetter = this.pinyinHeader;
						if(index != 0){
							html += "</ul><div class='clr'></div></div>";
						}
						html += "<div class='r_indu_list'><i>"+firstLetter+"</i><ul>";
					}
					html += "<li><em>"+this.categoryName+"</em><input type='checkbox' data-value="+this.categoryId+" class='choo'/></li>";
					if((data.retData.length - 1) == index){
						html += "</ul><div class='clr'></div></div>";
					}
				});
				$("#tradeList").append(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 加载行情交易数据
 * @param isPage 是否为分页查询
 * @param url
 * @param type
 * @param pageNum
 * @param pageSize
 * @param conditions
 */
function loadMTMsg(isPage, url,type, pageNum,pageSize,conditions){
	if(url == "findMTIList.do"){
		loadType = "init";
	}else{
		loadType = "mt";
	}
	$.axs("/stock/marketTransaction/"+url,"type="+type+"&pageNum="+pageNum+"&pageSize="+pageSize+conditions,false,function(data){
		if(data.retCode=="0000"){
			if(isPage){ //正常第一次查询
				dataArr = [];
				showDatas = '[';
			}else{
				showDatas = showDatas.substring(0, showDatas.length - 1);
			}
//			$("#mtList").empty();
			if(data.retData.mTList != null){
				var dataArrTemp = [];
				dataArrTemp = data.retData.mTList;
				dataArr = dataArr.concat(dataArrTemp);
				$(data.retData.mTList).each(function(index, item){
					if(i == 1){
						max = this.tradingVolume;
					}
					var tr = $("<tr>");
					var html = "<td>" + i + "</td><td><span>"
							+ this.areaName + "</span></td><td><i style='width: "+(this.tradingVolume/max)*100+"%;'></i></td>";
					tr.append(html);
					$("#mtList").append(tr);
					showDatas += '{"name":"'+this.areaName+'","value":"'+i+'","tradingVolume":"'+this.tradingVolume+'"},';
					i++;
				})
				showDatas += ']';
				showDatasJson = eval(showDatas);
				pageTotal = data.retData.pageTotal;
			}
			/**
			 * 初始加载数据
			 */
			initLoad();
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 点击查看更多分页
 */
function loadPage(data){
	if(clickPageNum <= pageTotal){
		if(loadType == "init"){
			loadMTMsg(false,"findMTIList.do", 2, clickPageNum, 3,"");
		}else{
			loadMTMsg(false,"findMTList.do", 2, clickPageNum, 3,searchCondition());
		}
		if(clickPageNum == pageTotal){
			$(data).text("没有更多数据");
		}
		clickPageNum++;
	}
}
