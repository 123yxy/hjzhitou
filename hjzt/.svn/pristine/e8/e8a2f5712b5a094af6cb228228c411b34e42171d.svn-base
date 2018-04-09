//在审挂牌
$(function(){
	//所有二级行业
//	findSecondLevelTrade();
	//查询所有地区
//	findFirstLevelArea();
	//所有主办券商
//	findHostBrokerage();
	findAllSelectParam();
	//在审挂牌统计
	findInListedCompaniesStatistics();
	//拟挂牌企业总数 近一年 趋势图
	findInListedCompaniesOneYear();
	//新增拟挂牌家数 近一年 趋势图
	findInListedCompaniesAddOneYear();
	//新增拟挂牌
	findInListedCompaniesAdd();
	//全部拟挂牌
	findInListedCompanies();
	
	//点击假背景的时候下拉框收缩
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").hide();
		$(".jiabeijing").hide();
	})
});

/**
 * 在审挂牌统计
 */
function findInListedCompaniesStatistics(){
	$.axs("/stock/inListedCompanies/findInListedCompaniesStatistics.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var json=jQuery.parseJSON(result);
			if(result!=null){
				$("#inListedCompaniesTotal").html(json.inListedCompaniesTotal);
				$("#schedule_1").html(json.schedule_1);
				$("#schedule_2").html(json.schedule_2);
				$("#schedule_3").html(json.schedule_3);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}
/**
 * 拟挂牌企业总数 近一年 趋势图
 */
function findInListedCompaniesOneYear(){
	$("#allYear").addClass("on");
	$("#allMouth").removeClass("on");
	$.axs("/stock/inListedCompanies/findInListedCompaniesOneYear.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var json=jQuery.parseJSON(result);
			if(result!=null){
				var dateArray=json.allDateArray;
				var dataArray=json.allDataArray;
				inListedCompaniesNum(dateArray,dataArray);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 拟挂牌企业总数 近一月 趋势图
 */
function findInListedCompaniesOneMouth(){
	$("#allMouth").addClass("on");
	$("#allYear").removeClass("on");
	$.axs("/stock/inListedCompanies/findInListedCompaniesOneMouth.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var json=jQuery.parseJSON(result);
			if(result!=null){
				var dateArray=json.allDateArray;
				var dataArray=json.allDataArray;
				inListedCompaniesNum(dateArray,dataArray);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 新增拟挂牌家数 近一年 趋势图
 */
function findInListedCompaniesAddOneYear(){
	$("#addYear").addClass("on");
	$("#addMouth").removeClass("on");
	$.axs("/stock/inListedCompanies/findInListedCompaniesAddOneYear.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var json=jQuery.parseJSON(result);
			if(result!=null){
				var dateArray=json.addDateArray;
				var dataArray=json.addDataArray;
				inListedCompaniesAddNum(dateArray,dataArray);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 新增拟挂牌家数 近一月 趋势图
 */
function findInListedCompaniesAddOneMouth(){
	$("#addMouth").addClass("on");
	$("#addYear").removeClass("on");
	$.axs("/stock/inListedCompanies/findInListedCompaniesAddOneMouth.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var json=jQuery.parseJSON(result);
			if(result!=null){
				var dateArray=json.addDateArray;
				var dataArray=json.addDataArray;
				inListedCompaniesAddNum(dateArray,dataArray);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 新增拟挂牌
 */
function findInListedCompaniesAdd(){
	var pageNum=$("#inListedCompaniesAdd").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#inListedCompaniesAdd").attr("data-pageSizee");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=6;
	}
	var paramData={pageNum:pageNum,pageSize:pageSize};
	$.axs("/stock/inListedCompanies/findInListedCompaniesAdd.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
			var pageNumResult=pageObj.pageIndex;
			$("#inListedCompaniesAdd").attr("data-pageNum",pageNumResult);
			var pageSizeResult=pageObj.pageLimit;
			$("#inListedCompaniesAdd").attr("data-pageSizee",pageSizeResult);
			var totalCountResult=pageObj.totalCount;
			$("#inListedCompaniesAddTotal").html(totalCountResult);
			var list=pageObj.list;
			if(list!=null && list.length>0){
				$("#newDate").html(list[0].dateTime);
				var html='';
				for(var i=0;i<list.length;i++){
					var result=list[i];
					html+='<tr>';
					html+='<td>'+result.companyName+'</td>';
					html+='<td>'+result.areaName+'</td>';
					html+='<td>'+result.hostBrokerage+'</td>';
					html+='<td>'+result.tradeName+'</td>';
					html+='<td>'+result.dateTime+'</td>';
					var schedule=result.schedule;
					if(schedule==1){
						html+='<td>待出具反馈意见</td>';
					}else if(schedule==2){
						html+='<td>反馈意见回复审查</td>';
					}else if(schedule==3){
						html+='<td>落实反馈意见中</td>';
					}else{
						html+='<td>已完成</td>';
					}
					html+='</tr>';
				}
				$("#inListedCompaniesAdd").html(html);
				//分页
				$('#page_1').show();
				$('#page_1').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						$("#inListedCompaniesAdd").attr("data-pageNum",pageNumber);
						$("#inListedCompaniesAdd").attr("data-pageSizee",size);
						findInListedCompaniesAdd();
					}
				});
				//修改分页文字
				setPageText2('page_1');
			}else{
				var html=getNoDataHtml(6);
				$("#inListedCompaniesAdd").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 全部拟挂牌
 */
function findInListedCompanies(){
	//所在地
	var areaNameParam="";
	var areaValue=$("#firstLevelArea").prev().attr("data-value");
	if(areaValue!=null && areaValue!="" && areaValue!="undefined" && areaValue!=0){
//		areaNameParam=$("#firstLevelArea").prev().text();
		areaNameParam=areaValue;
	}
	//主办券商
	var hostBrokerageParam="";
	var hostBrokerageValue=$("#hostBrokerage").prev().attr("data-value");
	if(hostBrokerageValue!=null && hostBrokerageValue!="" && hostBrokerageValue!="undefined" && hostBrokerageValue!=0){
//		hostBrokerageParam=$("#hostBrokerage").prev().text();
		hostBrokerageParam=hostBrokerageValue;
	}
	//所属行业
	var tradeNameParam="";
	var tradeValue=$("#secondLevelTrade").prev().attr("data-value");
	if(tradeValue!=null && tradeValue!="" && tradeValue!="undefined" && tradeValue!=0){
//		tradeNameParam=$("#secondLevelTrade").prev().text();
		tradeNameParam=tradeValue;
	}
	//公司名称
	var companyNameParam=$("#companyName").val();
	loadData(areaNameParam,hostBrokerageParam,tradeNameParam,companyNameParam,1,10);
}

//加载数据
function loadData(areaNameParam,hostBrokerageParam,tradeNameParam,companyNameParam,pageNum,pageSize){
	var paramData={areaName:areaNameParam,hostBrokerage:hostBrokerageParam,tradeName:tradeNameParam,companyName:companyNameParam,pageNum:pageNum,pageSize:pageSize};
	$.axs("/stock/inListedCompanies/findInListedCompanies.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
			var pageNumResult=pageObj.pageIndex;
			$("#inListedCompanies").attr("data-pageNum",pageNumResult);
			var pageSizeResult=pageObj.pageLimit;
			$("#inListedCompanies").attr("data-pageSizee",pageSizeResult);
			var totalCountResult=pageObj.totalCount;
			$("#inListedCompaniesTotalValue").html(totalCountResult);
			var list=pageObj.list;
			if(list!=null && list.length>0){
				var html='';
				for(var i=0;i<list.length;i++){
					var result=list[i];
					html+='<tr>';
					html+='<td>'+result.companyName+'</td>';
					html+='<td>'+result.areaName+'</td>';
					html+='<td>'+result.hostBrokerage+'</td>';
					html+='<td>'+result.tradeName+'</td>';
					html+='<td>'+result.dateTime+'</td>';
					var schedule=result.schedule;
					if(schedule==1){
						html+='<td>待出具反馈意见</td>';
					}else if(schedule==2){
						html+='<td>反馈意见回复审查</td>';
					}else if(schedule==3){
						html+='<td>落实反馈意见中</td>';
					}else{
						html+='<td>已完成</td>';
					}
					html+='</tr>';
				}
				$("#inListedCompanies").html(html);
				//分页
				$('#page_2').show();
				$('#page_2').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						$("#inListedCompanies").attr("data-pageNum",pageNumber);
						$("#inListedCompanies").attr("data-pageSizee",size);
						loadData(areaNameParam,hostBrokerageParam,tradeNameParam,companyNameParam,pageNumber,size);
					}
				});
				//修改分页文字
				setPageText2('page_2');
			}else{
				$('#page_2').hide();
				var html=getNoDataHtml(6);
				$("#inListedCompanies").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
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

/**
 * 查询所有二级行业
 * 查询所有区域
 * 所有主办券商
 */
function findAllSelectParam(){
	$.axs("/stock/inListedCompanies/findAllSelectParam.do",null,false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var resultMap=data.retData;
				//行业
				var tradeName=resultMap.tradeName;
				var html='';
				html+='<li data-value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(tradeName,function(index,item){
					var trade=item;
					if(trade.length>6){
						trade=trade.substring(0,5)+"...";
					}
					html+='<li data-value="'+item+'"><a href="javascript:void(0)" title="'+item+'">'+trade+'</a></li>';
				});
				$("#secondLevelTrade").html(html);
				//所有区域
				var areaName=resultMap.areaName;
				var html='';
				html+='<li data-value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(areaName,function(index,item){
					html+='<li data-value="'+item+'"><a href="javascript:void(0)" title="'+item+'">'+item+'</a></li>';
				});
				$("#firstLevelArea").html(html);
				//所有主办券商
				var hostBrokerage=resultMap.hostBrokerage;
				var html='';
				html+='<li data-value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(hostBrokerage,function(index,item){
					var num=item.indexOf("证券");
					html+='<li data-value="'+item+'"><a href="javascript:void(0)" title="'+item+'">'+item.substring(0,num+2)+'</a></li>';
				});
				$("#hostBrokerage").html(html);
			}
		}
	});
}


//挂牌数量走势图
function inListedCompaniesNum(dateArray,dataArray){
	var myChart3 = echarts.init(document.getElementById('gp_zst_sjmap'));
	option = {
	    title:{
	        show:true,
	        text:'拟挂牌企业总数',
	        textStyle:{
	            fontWeight:'normal',
	        },
	    },
	    color: ['#6ac8f9'],
	    tooltip : {
	         show:true,
        	trigger:'item',
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
	            //data : ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08'],
	            data : dateArray,
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
									'<p class="multi_tips">'+dateArray[params.dataIndex]+'<br/>拟挂牌企业总数:<span>'+dataArray[params.dataIndex]+'</span></p>'+
									'<div class="tip_tips"></div>'+
								'</div>';
	                return divHtml;
	            }
	    },
	    series : [
	        {
	            name:'拟挂牌企业总数',
	            type:'bar',
	             emphasis:{
                	color:"#37a4dc"//鼠标放到柱形图上显示的颜色
               },
	            barWidth: '60%',
	            //data:[10, 52, 200, 334, 390, 330, 500 , 220]
	        	data : dataArray
	        }
	    ]
	};
	myChart3.setOption(option);
	window.addEventListener("resize",function(){
		myChart3.resize();
	});	
}


//新增挂牌数量走势图
function inListedCompaniesAddNum(dateArray,dataArray){
	var myChart4 = echarts.init(document.getElementById('xzgp_zst_sjmap'));
	option = {
	    title:{
	        show:true,
	        text:'新增拟挂牌家数',
	        textStyle:{
	            fontWeight:'normal',
	        },
	    },
	    color: ['#6ac8f9'],
	    tooltip : {
	         show:true,
        	trigger:'item',
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
	            //data : ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12', '10-13', '10-14'],
	            data : dateArray,
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
									'<p class="multi_tips">'+dateArray[params.dataIndex]+'<br/>新增拟挂牌家数:<span>'+dataArray[params.dataIndex]+'</span></p>'+
									'<div class="tip_tips"></div>'+
								'</div>';
	                return divHtml;
	            }
	    },
	    series : [
	        {
	            name:'新增拟挂牌家数',
	            type:'bar',
	            barWidth: '60%',
	            //data:[10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220]
	        	data : dataArray,
	        	 emphasis:{
                	color:"#37a4dc"//鼠标放到柱形图上显示的颜色
               }
	        }
	    ]
	};
	myChart4.setOption(option);
	window.addEventListener("resize",function(){
		myChart4.resize();
	});	
}
