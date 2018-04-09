var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var nowTime =(year + '-' + month + '-' + day);
//初始化加载
$(function(){
	//获取全部行业
	findSecondLevelTrade();
	//获取全部区域
	findFirstLevelArea();
	//所有主办券商
	findHostBrokerage();
	//挂牌企业数
	findListing();
	//挂脾企业走势
	findListingCount(1);
	//新增挂脾企业走势
	findNewList(1);
	//新增挂牌企业列表
	findListNew();
	//全部挂牌企业列表
	findAllList();
	//查询全部挂牌企业 总股本流通股本
	fingListCount();
	
	/*********信息补全开始***********/
	$("#stockCodeParam").keydown(function(e) {
		if(e.keyCode==13){
			$("#stockCodeParam").click();
			$("#ui-id-2").hide();
		}
	});
	
	$("#stockCodeParam").on("click", function() {
		findAllList();
	});
	//首页顶部搜索
	$("#stockCodeParam").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findByCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		}
	});
	/*********信息补全结束***********/
	
	//点击假背景的时候下拉框收缩
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").hide();
		$(".jiabeijing").hide();
	})
	
});

/**
 * 挂牌企业数
 */
function findListing(){
	$.axs("/betaInvest/threeBoardIndex/findListing.do",null,false,function(data){
		if(data.retCode=="0000"){
			var resultTemp=data.retData;
			if(resultTemp==null){
				return false;
			}
			var result = jQuery.parseJSON(resultTemp);
			var listingAllHtml="";
			var listingNewHtml="";
			//全部挂牌企业
			listingAllHtml+='<div class="gp_info_l_top">';
			listingAllHtml+='<span>挂牌企业总数</span>';
			listingAllHtml+='<h2 class="timer" data-to="9480" data-speed="1500">'+result.totallisting+'<em></em></h2>';
			listingAllHtml+='</div>';
			listingAllHtml+='<div class="gp_info_l_btn">';
			listingAllHtml+='<ul>';
			listingAllHtml+='<li class="gp_zs">';
			listingAllHtml+='<span></span>';
			listingAllHtml+='<em>做市(家)</em>';
			listingAllHtml+='<h2>'+result.marketmaker+'</h2>';
			listingAllHtml+='</li>';
			listingAllHtml+='<li class="gp_xy">';
			listingAllHtml+='<span></span>';
			listingAllHtml+='<em>协议(家)</em>';
			listingAllHtml+='<h2>'+result.agreementnum+'</h2>';
			listingAllHtml+='</li>';
			listingAllHtml+='</ul>';
			listingAllHtml+='<div class="clr"></div>';
			listingAllHtml+='</div>';
			//今日新增挂牌企业
			listingNewHtml+='<div class="gp_info_l_top">';
			listingNewHtml+='<span>今日新增挂牌 <i>'+result.listingtime+'</i></span>';
			listingNewHtml+='<h2 class="timer" data-to="9485" data-speed="1500">'+result.newtotallisting+'<em></em></h2>';
			listingNewHtml+='</div>';
			listingNewHtml+='<div class="gp_info_l_btn">';
			listingNewHtml+='<ul>';
			listingNewHtml+='<li class="xzgp_zs">';
			listingNewHtml+='<span></span>';
			listingNewHtml+='<em>做市(家)</em>';
			listingNewHtml+='<h2>'+result.newmarketmaker+'</h2>';
			listingNewHtml+='</li>';
			listingNewHtml+='<li class="xzgp_xy">';
			listingNewHtml+='<span></span>';
			listingNewHtml+='<em>协议(家)</em>';
			listingNewHtml+='<h2>'+result.newagreementnum+'</h2>';
			listingNewHtml+='</li>';
			listingNewHtml+='</ul>';
			listingNewHtml+='<div class="clr"></div>';
			listingNewHtml+='</div>';
			$("#listingAll").html(listingAllHtml);
			$("#listingNew").html(listingNewHtml);
			findListingAll(result.marketmaker,result.agreementnum);
			findListingNew(result.newmarketmaker,result.newagreementnum);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//挂牌企业总数
function  findListingAll(zs,xy){
	var myChart = echarts.init(document.getElementById('gp_info_r'));
	option = {
		color:['#fcda6f','#fd8a8f'] ,
	    series : [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius : '85%',
//	            提示文字显示到饼图里
	            label: {
                normal: {
                    position: 'inner'
                }
            },
	            center: ['50%', '50%'],
	            data:[
	                {value:zs, name:'做市'},
	                {value:xy, name:'协议'},
	               
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
	myChart.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart.resize();
                });
    
	
}


//今日新增挂牌公司
function findListingNew(zsN,xyN){
	var myChart2 = echarts.init(document.getElementById('xzgp_info_r'));
	option = {
	    color:['#cb93dd','#90b4e6'] ,
	    series : [
	        {
	            name: '访问来源',
	            type: 'pie',
	            //	            提示文字显示到饼图里
	            label: {
                normal: {
                    position: 'inner'
                }
            },
	           radius : '85%',
	            center: ['50%', '50%'],
	            data:[
	                {value:zsN, name:'做市'},
	                {value:xyN, name:'协议'},
	               
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
}

//挂牌数量走势图 近一年/近一月
$('#listCount li').on('click',function(){
	var type = this.dataset.value;
	if(type==0){
		findListingCount(type);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	}else if(type==1){
		findListingCount(1);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	}else{
		findListingCount(1);
	}
});

//挂牌数量走势图
function findListingCount(type){
	$.axs("/betaInvest/threeBoardIndex/findListCount.do",{type:type},false,function(data){
		if(data.retCode=="0000"){
			var resultTemp=data.retData;
			if(resultTemp==null){
				return false;
			}
			var result = jQuery.parseJSON(resultTemp);
			//挂牌数量走势图
			listingCount(result.date,result.num);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//挂牌数量走势图
function  listingCount(date,num){
	var myChart3 = echarts.init(document.getElementById('gp_zst_sjmap'));
	option = {
	    title:{
	        show:true,
	        text:'挂牌企业总数',
	        textStyle:{
	            fontWeight:'normal',
	        },
	    },
	    color: ['#6ac8f9'],
	   
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : date,//['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            data:[]
	        }
	    ],
	    tooltip : {
	        show:true,
        	trigger:'item',
        	  formatter: function(params) {
	      	    	var divHtml='<div class="multi_tip">'+
									'<p class="multi_tips">'+date[params.dataIndex]+'<br/>挂牌企业总数:<span>'+num[params.dataIndex]+'</span></p>'+
									'<div class="tip_tips"></div>'+
								'</div>';
	                return divHtml;
	            }
//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//	        }
	    },
	    series : [
	        {
	            name:'挂牌企业总数',
	            type:'bar',
	            barWidth: '60%',
	            data:num,//[10, 52, 200, 334, 390, 330, 500 , 220]
	            itemStyle: {
                emphasis:{
                	color:"#37a4dc"//鼠标放到柱形图上显示的颜色
                }
            }},
	        
	        
	    ]
	};
	myChart3.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart3.resize();
                });
	
}


//挂牌数量走势图 近一年/近一月
$('#listCountN li').on('click',function(){
	var type = this.dataset.value;
	if(type==0){
		findNewList(type);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	}else if(type==1){
		findNewList(1);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	}else{
		findNewList(1);
	}
});

//新增挂牌数量走势图
function findNewList(type){
	$.axs("/betaInvest/threeBoardIndex/findNewList.do",{type:type},false,function(data){
		if(data.retCode=="0000"){
			var resultTemp=data.retData;
			if(resultTemp==null){
				return false;
			}
			var result = jQuery.parseJSON(resultTemp);
			//挂牌数量走势图
			listingCountNew(result.dateNew,result.numNew);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//新增挂牌数量走势图
function listingCountNew(date,num){
	var myChart4 = echarts.init(document.getElementById('xzgp_zst_sjmap'));
	option = {
	    title:{
	        show:true,
	        text:'新增挂牌家数',
	        textStyle:{
	            fontWeight:'normal',
	        },
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
	            data : date,//['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12', '10-13', '10-14'],
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
	    tooltip : {
	        show:true,
        	trigger:'item',
        	  formatter: function(params) {
	      	    	var divHtml='<div class="multi_tip">'+
									'<p class="multi_tips">'+date[params.dataIndex]+'<br/>新增挂牌家数:<span>'+num[params.dataIndex]+'</span></p>'+
									'<div class="tip_tips"></div>'+
								'</div>';
	                return divHtml;
	            }
//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//	        }
	    },
	    series : [
	        {
	            name:'新增挂牌家数',
	            type:'bar',
	            barWidth: '60%',
	            data:num,//[10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220]
	            itemStyle: {
                emphasis:{
                	color:"#37a4dc"//鼠标放到柱形图上显示的颜色
                }
            }        
	        }
	    ]
	};
	myChart4.setOption(option);
window.addEventListener("resize",function(){
                                      myChart4.resize();
                });	
}

//新增挂牌企业列表
function findListNew(){
	var pageNum=$("#findListNew").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#findListNew").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=6;
	}
	var paramData={pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaInvest/threeBoardIndex/findListNew.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var pageNumResult=result.pageIndex;
			var pageSizeResult=result.pageLimit;
			var totalCountResult=result.totalCount;
			if(result==null){
				return false;
			}
			$("#listNewCount").text(totalCountResult);
			$("#noWTime").text(nowTime);
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				for(var i =0;i<list.length;i++){
					var listNew=list[i];
					html+='<tr>';
					html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+listNew.stockName+'&stockCode='+listNew.stockCode+'">'+listNew.stockName+'('+listNew.stockCode+')</a></td>';
					html+='<td>'+listNew.dealtype+'</td>';
					html+='<td>'+listNew.tradeName+'</td>';
					html+='<td>'+listNew.state+'</td>';
					html+='<td>'+listNew.sponsoredbroker+'</td>';
					if(listNew.priceChangeRatio>0){
						html+='<td class="red">'+(listNew.newPrice).toFixed(2)+'</td>';
						html+='<td class="red">'+(listNew.priceChangeRatio).toFixed(2)+'%</td>';
					}else{
						html+='<td class="lvse">'+(listNew.newPrice).toFixed(2)+'</td>';
						html+='<td class="lvse">'+(listNew.priceChangeRatio).toFixed(2)+'%</td>';
					}
					html+='<td class="shuzi">'+(listNew.amount).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(listNew.priceAmount).toFixed(2)+'</td>';
					html+='</tr> ';
				}
				$("#findListNew").html(html);
				$('#page_1').show();
				//分页
				$('#page_1').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						$("#findListNew").attr("data-pageNum",pageNumber);
						$("#findListNew").attr("data-pageSize",size);
						findListNew();
					}
				});
				//修改分页文字
				setPageText2('page_1');
			}else{
				$('#page_1').hide();
				var html=getNoDataHtml(10);
				$("#findListNew").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//全部挂牌企业列表
function findAllList(){
	//转让方式
	var transferType ="";
	var transferValue=$("#transferType").prev().attr("value");
	if(transferValue!=null && transferValue!="" && transferValue!="undefined" && transferValue!=0){
		transferType=$("#transferType").prev().text();
	}
	//行业
	var tradeName="";
	var tradeValue=$("#secondLevelTrade").prev().attr("value");
	if(tradeValue!=null && tradeValue!="" && tradeValue!="undefined" && tradeValue!=0){
		tradeName=$("#secondLevelTrade").prev().attr("value");
	}
	//地区
	var areaName="";
	var areaValue=$("#firstLevelArea").prev().attr("value");
	if(areaValue!=null && areaValue!="" && areaValue!="undefined" && areaValue!=0){
		areaName=$("#firstLevelArea").prev().text();
	}
	//主办券商
	var sponsoredName ="";
	var asponsoredValue=$("#hostBrokerage").prev().attr("value");
	if(asponsoredValue!=null && asponsoredValue!="" && asponsoredValue!="undefined" && asponsoredValue!=0){
		sponsoredName=$("#hostBrokerage").prev().text();
	}
	//股票代码或者简称
	var stockCodeParam=$("#stockCodeParam").val();
	var stcokName = "";
	var stcokCode = "";
	if(!isNaN(stockCodeParam)){
		stcokCode=stockCodeParam;
	}else{
		stcokName=stockCodeParam;
	}
	//条件
	loadData(transferType,tradeName,areaName,sponsoredName,stcokCode,stcokName,1,10)
}


function loadData(transferType,tradeName,areaName,sponsoredName,stcokCode,stcokName,pageNum,pageSize){
	var paramData={dealType:transferType,industry:tradeName,state:areaName,sponsoredBroker:sponsoredName,stockCode:stcokCode,companyForShort:stcokName,pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/stock/enterPriseData/findAllList.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var pageNumResult=result.pageIndex;
			var pageSizeResult=result.pageLimit;
			var totalCountResult=result.totalCount;
			if(result==null){
				return false;
			}
			$("#listAllCount").text(totalCountResult);
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					html+='<tr>';
					html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					html+='<td>'+temp.dealtype+'</td>';
					html+='<td>'+temp.tradeName+'</td>';
					html+='<td>'+temp.state+'</td>';
					html+='<td>'+temp.sponsoredbroker+'</td>';
					if(temp.priceChangeRatio>0){
						html+='<td class="red">'+(temp.newPrice).toFixed(2)+'</td>';
						html+='<td class="red">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
					}else{
						html+='<td class="lvse">'+(temp.newPrice).toFixed(2)+'</td>';
						html+='<td class="lvse">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
					}
					html+='<td class="shuzi">'+(temp.amount).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(temp.priceAmount).toFixed(2)+'</td>';
					html+='</tr> ';
				}
				$("#listAll").html(html);
				$('#page_2').show();
				//分页
				$('#page_2').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						$("#listAll").attr("data-pageNum",pageNumber);
						$("#listAll").attr("data-pageSize",size);
						loadData(transferType,tradeName,areaName,sponsoredName,stcokCode,stcokName,pageNumber,size);
					}
				});
				//修改分页文字
				setPageText2('page_2');
			}else{
				$('#page_2').hide();
				var html=getNoDataHtml(10);
				$("#listAll").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//查询全部挂牌企业 总股本流通股本  股票代码为000000的数据
function fingListCount(){
	$.axs("/stock/qutation/fingListCount.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			$("#totalShareVapital").html(result.generalCapital);
			$("#flowOfEquity").html(result.circulateCapital);
			$("#turnoverQuantity").html(result.tradingVolume);
			$("#turnoverAmount").html(result.tradingAmount);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
* 查询所有二级行业
*/
function findSecondLevelTrade(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var secondLevelTrade=data.retData;
				var html='';
				html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(secondLevelTrade,function(index,item){
					html+='<li value="'+item.categoryId+'"><a href="javascript:void(0)">'+(item.categoryName.length > 6 ? item.categoryName.substring(0,6)+"..." : item.categoryName)+'</a></li>';
				});
				$("#secondLevelTrade").html(html);
			}
		}
	});
}
/**
* 查询所有区域
*/
function findFirstLevelArea(){
	$.axs("/stock/common/findWorkBook.do",{type:1,dataType:1},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var firstLevelArea=data.retData;
				var html='';
				html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(firstLevelArea,function(index,item){
					html+='<li value="'+item.id+'"><a href="javascript:void(0)">'+item.nameCn+'</a></li>';
				});
				$("#firstLevelArea").html(html);
			}
		}
	});
}

/**
 * 所有主办券商
 */
function findHostBrokerage(){
	$.axs("/stock/common/findWorkBook.do",{type:5,dataType:1},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var firstLevelArea=data.retData;
				var html='';
				html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(firstLevelArea,function(index,item){
					html+='<li value="'+item.id+'"><a href="javascript:void(0)">'+item.nameCn+'</a></li>';
				});
				$("#hostBrokerage").html(html);
			}
		}
	});
}









