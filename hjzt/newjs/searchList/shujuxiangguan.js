var XZSJArr = ["周,1W","月,1M","半年,6M","1年,1Y","3年,3Y","5年,5Y","'',ALL"]; //选择时间数组
//数据相关--检索
$(function(){
//	console.log(!(getUrlParam("type")==15 || getUrlParam("type")=="15" || getUrlParam("type")==""))
	//当type为14或者15或者为空的时候检索指标
	if(!(getUrlParam("type")==14 || getUrlParam("type")=="14" || getUrlParam("type")==15 || getUrlParam("type")=="15" || getUrlParam("type")=="")){
		$("#content_data").hide();
		blockDiv.content_data=false;
		return false;
	}
	//console.log("开始检索指标")
	//判断获取的关键字不空时查询数据
	var findDatakeyWorld_shuju=getUrlParam("content");
	if(findDatakeyWorld_shuju==null || findDatakeyWorld_shuju=="" || findDatakeyWorld_shuju==undefined || findDatakeyWorld_shuju=="null" || findDatakeyWorld_shuju=="undefined"){
		//隐藏财务数据模块的DIV
		$("#content_data").hide();
		blockDiv.content_data=false;
		return false;
	}
	//console.log(findDatakeyWorld_shuju)
	var findDataStockCode_shuju=getUrlParam("stockcode");
	if(findDataStockCode_shuju==null || findDataStockCode_shuju=="" || findDataStockCode_shuju==undefined || findDataStockCode_shuju=="null" || findDataStockCode_shuju=="undefined"){
		findDataStockCode_shuju=null;
	}
	//加载更多
	$("#wj_datadBtn").on("click",function(){
		var stockCode_Key=$("#wj_datadBtn").attr("data-stockCode");
		var keyWorld=$("#wj_datadBtn").attr("data-keyWorld");
		var pageNum=$("#wj_datadBtn").attr("data-pageNum");
		var pageSize=$("#wj_datadBtn").attr("data-pageSize");
		//查询数据
		findSearchIndicatorData(stockCode_Key,keyWorld,Number(pageNum)+1,pageSize);
		
	});
	//type为15的关键字带有空格全部去掉
	var key_world_input="";
//	console.log(findDatakeyWorld_shuju.indexOf(" ")>-1);
//	if(getUrlParam("type")==15 || getUrlParam("type")=="15"){
	if(findDatakeyWorld_shuju.indexOf(" ")>-1){
		findDataStockCode_shuju=findDatakeyWorld_shuju.split(",")[0].split(" ")[0];
		key_world_input=findDatakeyWorld_shuju.split(",")[0].split(" ")[1];
	}else{
		key_world_input=findDatakeyWorld_shuju.split(",")[0];
	}
	if(key_world_input==""){
		//隐藏财务数据模块的DIV
		$("#content_data").hide();
		blockDiv.content_data=false;
		return false;
	}
	//查询数据
	findSearchIndicatorData(findDataStockCode_shuju,key_world_input,null,null);
	
	//点击自定义查询
	$("#changeParamToFindSearchIndicatorDataDeatil").click(function(){
		if($("#diyMinDate").val() != ""){
			if($("#diyMaxDate").val() != ""){
				var startTime = new Date(Date.parse($.trim($("#diyMinDate").val())));
				var endTime = new Date(Date.parse($.trim($("#diyMaxDate").val())));
				if(endTime > startTime){
					var dateType = $.trim($("#diyMinDate").val()) + "," + $.trim($("#diyMaxDate").val());
					$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-dateType", dateType);
					$(".wj_dataTabs").children("span").removeClass("wj_active");
					//请求查询
					changeParamToFindSearchIndicatorDataDeatil();
				}else{
					$.zmAlert("结束时间必须大于开始时间");
				}
			}else{
				$(".am-datepicker-dropdown").hide();
				$.zmAlert("请选择结束时间");
			}
		}else{
			$(".am-datepicker-dropdown").hide();
			$.zmAlert("请选择开始时间");
		}
	})
	
	//导出数据
	$("#wj_export").click(function(){
		var paramData = {};
		var titleData = {1:"指标名称"}; //数据头
		$("#shujuChartTableDate tr th").each(function(i, item){
			titleData[i+2] = $(item).text();
		})
		var sjData = {1:$("#shujuChartTableTitle tr td").text()}; //数据内容
		$("#shujuChartTableData tr td").each(function(i, item){
			sjData[i+2] = $(item).text();
		})
		
		var titleName = $("#chartTitle").text();
		paramData[titleName] = [];
		paramData[titleName].push(titleData);
		paramData[titleName].push(sjData);
		methodExportExcel(titleName, paramData);
	})
	
	//跳转到指标编辑页面
	$("#sjAddZB").click(function(){
		var indexId = $("#changeParamToFindSearchIndicatorDataDeatil").attr("data-indexId"); //指标数据库中的id
		var classValue = $("#changeParamToFindSearchIndicatorDataDeatil").attr("data-indexIds"); //指标数据库中的字段值
		var codeKey = $("#changeParamToFindSearchIndicatorDataDeatil").attr("data-stockcode_key"); //个股关联的code
		if(indexId != undefined && indexId != "" && classValue != undefined && classValue != ""){
//			console.log(indexId)
			var zbList = findZBList(indexId);
	    	var url="/myResearch/newseditChart.html?indexCode="+classValue;
	    	if(codeKey != undefined && codeKey != "" && codeKey != null && codeKey != "null"){
	    		var name=findCName(codeKey);
	    		url+="&stockCode="+codeKey+"&stockName="+name;
	    		var json = {};
	    		json.className = name + "("+codeKey+")";
	    		json.id = "a";
	    		json.isIndex = 0;
	    		var temp = [];
	    		temp.push(json);
	    		$(zbList).each(function(){
	    			temp.push(this);
	    		})
	    		zbList = temp;
	    	}
	    	
	    	localStorage.setItem("ZBQDATA", encodeURI(JSON.stringify(zbList)));
	    	/*if(stockCode!=null && stockCode!=''){
	    		url+="&stockCode="+stockCode+"&stockName="+stockName;
	    	}*/
	    	window.location.href=url;
		}
	})
	//单击表头
	$("#shujuxiangguanKey").on("click",function(){
		$("#tab_data").click();
	})
});

/**
 * 获取指标列表(通过最后一级指标的id)
 */
function findZBList(indexId){
	var zbArr = []; //所有指标的集合
	$.axs("/betaInvest/btIndexClass/findIndexOrParent.do",{indexId:indexId},false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			zbArr = result;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
	return zbArr;
}

/**
 * 查询数据相关公司
 * @param stockCode
 * @param keyWorlds
 * @param pageNum
 * @param pageSize
 */
function findSearchIndicatorData(stockCode_Key,keyWorlds,pageNum,pageSize){
	$("#shujuxiangguanKey").text((stockCode_Key==null?"":stockCode_Key+" ")+(keyWorlds==null?"":keyWorlds));
	if(pageNum==null || pageNum=="" || pageNum==undefined){
		pageNum=1;
	}
	if(pageSize==null || pageSize=="" || pageSize==undefined){
		pageSize=10;
	}
	$("#wj_datadBtn").attr("data-stockCode",stockCode_Key);
	$("#wj_datadBtn").attr("data-keyWorld",keyWorlds);
	$("#wj_datadBtn").attr("data-pageNum",pageNum);
	$("#wj_datadBtn").attr("data-pageSize",pageSize);
	if(pageNum==1){//第一页初始化信息
		$("#searchIndicatorDataTable").html('');
	}
	$(".loadingBox2").show();
	//console.log(keyWorlds);
	$.axs("/betaInvest/searchBusiness/findSearchIndicatorData.do",{stockCode:stockCode_Key,keyWorlds:keyWorlds,pageNum:pageNum,pageSize:pageSize},true,function(data){
		if(data.retCode==0000){
			if(data.retData!=null){
				//查询耗时
				var time=data.retData.time;
				$("#tab_data").attr("data-time",time);
				$("#wj_datadBtn").attr("data-stockCode",data.retData.stockCode);
//				var totalTime=$("#totalTime").text();
//				if(totalTime==null || totalTime=="" || totalTime=="undefined"){
//					totalTime=0;
//				}
//				totalTime=Number(totalTime);
//				$("#totalTime").text(totalTime+Number(time));
				
				$("#tab_data").attr("data-count",0);
				if(data.retData.page!=null && data.retData.page.list!=null && data.retData.page.list.length!=0){
					var page=data.retData.page;
					var pageIndex=page.pageIndex;
					var pageLimit=page.pageLimit;
					var totalCount=page.totalCount;
					//查询的条数
//					var num=$("#totalCount").text();
//					if(num==null || num=="" || num=="undefined"){
//						num=0;
//					}
//					num=Number(num);
//					$("#totalCount").text(Number(totalCount)+num);
//					console.log(Number(totalCount)+num);
					$("#tab_data").attr("data-count",totalCount);
					var list=page.list;
					for (var i = 0; i < list.length; i++) {
						var result=list[i];
						var html='<tr>';
						html+='<td>'+result.showName+'</td>';
						html+='<td class="wj_tRight">'+(result.showValue==null?"--":result.showValue)+'</td>';
						html+='<td>'+result.showUnit+'</td>';
						html+='<td>'+result.comeName+'</td>';
						html+='<td>'+result.showDate+'</td>';
						html+='<td><a class="wj_showData" data-indexId="'+result.indexId+'" data-stockCode_Key="'+data.retData.stockCode+'" data-indexIds="'+result.columnName+'" data-businessTypes="'+result.tableName+'" data-minDate="'+result.minDate+'" data-maxDate="'+result.maxDate+'" data-dataDateType="'+result.dataDateType+'">查看</a></td>';
						html+='</tr>';
						$("#searchIndicatorDataTable").append(html);
					}
					
					if(pageNum == 1){
						setXZSJ(list[0].dataDateType);
						//设置自定义时间框格式
			//			setTimeBttn(list[0].dataDateType);
					}
			//		console.log("pageNum:"+pageNum+";pageSize:"+pageSize+";totalCount"+totalCount);
			//		console.log(pageNum*pageSize>=totalCount);
					//隐藏加载更多
					if(pageNum*pageSize>=totalCount){
						$("#wj_datadBtn").hide();
					}
					blockDiv.content_data=true;
				}else{
					if(pageNum==1){
						//隐藏财务数据模块的DIV
						$(".xiangguanshuju").append('<div class="wj_dataNone">未检索到“<span>'+(stockCode_Key==null?"":stockCode_Key+" ")+(keyWorlds==null?"":keyWorlds)+'”</span>相关数据</div>');
						$("#content_data .wj_btnMoreWrap").hide();
						$("#wj_dataCom").hide();
						$("#content_data").hide();
						blockDiv.content_data=false;
						$("#changeValue").change();
					}
				}
			}else{
				if(pageNum==1){
					//隐藏财务数据模块的DIV
					$(".xiangguanshuju").append('<div class="wj_dataNone">未检索到“<span>'+(stockCode_Key==null?"":stockCode_Key+" ")+(keyWorlds==null?"":keyWorlds)+'”</span>相关数据</div>');
					$("#content_data .wj_btnMoreWrap").hide();
					$("#wj_dataCom").hide();
					$("#content_data").hide();
					blockDiv.content_data=false;
					$("#changeValue").change();
				}
			}
			wj_showData();
		}else{
			//隐藏财务数据模块的DIV
			$("#content_data").hide();
			blockDiv.content_data=false;
			$("#changeValue").change();
		}
		$(".loadingBox2").hide();
		changeTime();
	});
}

/**
 *查看按钮
 */
function wj_showData(){
    $(".wj_showData").click(function(){
    	//查询数据的参数
    	var indexIds=$(this).attr("data-indexIds");
    	var stockCode_Key=$(this).attr("data-stockCode_Key");
    	var dataDateType=$(this).attr("data-dataDateType");
    	var businessTypes=$(this).attr("data-businesstypes");
    	var dateType=$(this).attr("data-mindate")+","+$(this).attr("data-maxdate");
    	//图标显示的参数
    	var showChatName=$(this).parent().parent().find("td").eq(0).text();
    	var showChatDanwei=$(this).parent().parent().find("td").eq(2).text();
    	//设置弹窗后的查询按钮
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-indexIds",indexIds);
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-stockCode_Key",stockCode_Key);
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-dataDateType",dataDateType);
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-businessTypes",businessTypes);
//    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-dateType",dateType);
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-showChatName",showChatName);
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-showChatDanwei",showChatDanwei);
    	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-indexId",$(this).attr("data-indexId"));
    	
    	setTimeBttn(dataDateType); //设置自定义的日期插件格式
    	//设置ALL选项的时间范围
    	$("#sjAll").attr("data-value",dateType);
    	//查询数据
    	findSearchIndicatorDataDeatil(indexIds, stockCode_Key, dataDateType, businessTypes, dateType,showChatName,showChatDanwei);
        $(".wj_data_mark").show();
        $(".wj_data_popUP").show();
    });
    $(".wj_data_mark").click(function(){
    	$("#diyMinDate").attr("value", "");
    	$("#diyMaxDate").attr("value", "");
    	$(".wj_dataTabs span").last().addClass("wj_active").siblings("span").removeClass("wj_active");
        $(".wj_data_mark").hide();
        $(".wj_data_popUP").hide();
    });
    $(".wj_popUP_close").click(function(){
    	$("#diyMinDate").attr("value", "");
    	$("#diyMaxDate").attr("value", "");
    	$(".wj_dataTabs span").last().addClass("wj_active").siblings("span").removeClass("wj_active");
        $(".wj_data_mark").hide();
        $(".wj_data_popUP").hide();
    });
    
    /*$("#wj_export").click(function(){
        var btn1 = 100;
        rotateCircle (btn1);
        $(".wj_exportProgress").css("opacity","1");
        $(this).css("opacity","0");
        if(btn1==100){
            $("#wj_export").css("opacity","1");
            $(".wj_exportProgress").css("opacity","0");
            $(".wj_toast").fadeIn();
            setTimeout(
                '$(".wj_toast").fadeOut()', 
                2000 )
        }
    })*/
}

/**
 * 设置选择时间段按钮
 */
function setXZSJ(dataDateType){
	var beginIndex = 0;
	if(dataDateType == "W"){ //周
		beginIndex = 1;
	}else if(dataDateType == "M"){ //月
		beginIndex = 2;
	}else if(dataDateType == "H"){ //半年
		beginIndex = 3;
	}else if(dataDateType == "Y"){ //年
		beginIndex = 4;
	}
	
	for (var i = beginIndex; i < XZSJArr.length; i++) {
		if(XZSJArr[i].split(",")[1] == "ALL"){
			$(".wj_dataTabs").append("<span id='sjAll' class='wj_active' data-value="+XZSJArr[i].split(",")[0]+">"+XZSJArr[i].split(",")[1]+"</span>");
		}else{
			$(".wj_dataTabs").append("<span data-value="+XZSJArr[i].split(",")[0]+">"+XZSJArr[i].split(",")[1]+"</span>");
		}
	}
	
	//点击事时间中的span
	$(".wj_dataTabs span").click(function(){
		$("#diyMinDate").attr("value", "");
    	$("#diyMaxDate").attr("value", "");
        $(this).addClass("wj_active").siblings().removeClass("wj_active");
        changeParamToFindSearchIndicatorDataDeatil();
    });
	
}

/**
 * 设置时间自定义框
 */
function setTimeBttn(dataDateType){
	var nowTemp = new Date();
    var nowDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).valueOf();
    var nowMoth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).valueOf();
    var nowYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf();
//    console.log(nowTemp.getFullYear())
//    console.log(nowTemp.getMonth())
	//设置插件显示类型
	if(dataDateType == "W" || dataDateType == "M"){
		$("#diyMinDate").attr("data-am-datepicker", "{format: 'yyyy-mm', viewMode: 'months', minViewMode: 'months'}");
		$("#diyMaxDate").attr("data-am-datepicker", "{format: 'yyyy-mm', viewMode: 'months', minViewMode: 'months'}");
		if(dataDateType == "M"){
			if(nowTemp.getMonth() < 10){
				$("#diyMinDate").attr("value", nowTemp.getFullYear() + "-0" + nowTemp.getMonth());
				$("#diyMaxDate").attr("value", nowTemp.getFullYear() + "-0" + nowTemp.getMonth());
			}else{
				$("#diyMinDate").attr("value", nowTemp.getFullYear() + "-" + nowTemp.getMonth());
				$("#diyMaxDate").attr("value", nowTemp.getFullYear() + "-" + nowTemp.getMonth());
			}
		}
	}else if(dataDateType == "H" || dataDateType == "Y"){
		$("#diyMinDate").attr("data-am-datepicker", "{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}");
		$("#diyMaxDate").attr("data-am-datepicker", "{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}");
	}
	
	var $myStart2 = $("#diyMinDate");
//  console.log(dataDateType)
  var checkin = $myStart2.datepicker({
    onRender: function(date, viewMode) {
      // 默认 days 视图，与当前日期比较
      var viewDate = nowDay;
      switch (viewMode) {
        // moths 视图，与当前月份比较
        case 1:
          viewDate = nowMoth;
          break;
        // years 视图，与当前年份比较
        case 2:
          viewDate = nowYear;
          break;
      }

      if(dataDateType == "W"){
      	return date.valueOf() > viewDate ? 'am-disabled' : '';
      }
      return date.valueOf() >= viewDate ? 'am-disabled' : '';
    }
  }).on('changeDate.datepicker.amui', function(ev) {
      checkin.close();
  }).data('amui.datepicker');

  var checkout = $("#diyMaxDate").datepicker({
    onRender: function(date, viewMode) {
      // 默认 days 视图，与当前日期比较
  	  var viewDate = nowDay;
      switch (viewMode) {
        // moths 视图，与当前月份比较
        case 1:
          viewDate = nowMoth;
          break;
        // years 视图，与当前年份比较
        case 2:
          viewDate = nowYear;
          break;
      }
      if(dataDateType == "W"){
      	return date.valueOf() > viewDate ? 'am-disabled' : '';
      }
      return date.valueOf() >= viewDate ? 'am-disabled' : '';
    }
  }).on('changeDate.datepicker.amui', function(ev) {
    checkout.close();
  }).data('amui.datepicker');
  
  	if(dataDateType == "W" || dataDateType == "M"){
		$("#diyMinDate").attr("value", "");
		$("#diyMaxDate").attr("value", "");
	}
}

/**
 * 改变搜索参数
 */
function changeParamToFindSearchIndicatorDataDeatil(){
	
	var dateType=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-dateType");
	if(dateType == undefined || dateType == ""){
		dateType = $(".wj_dataTabs").find("span.wj_active").attr("data-value");
	}
	var indexIds=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-indexIds");
	var stockCode_Key=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-stockCode_Key");
	var dataDateType=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-dataDateType");
	var businessTypes=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-businessTypes");
	var showChatName=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-showChatName");
	var showChatDanwei=$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-showChatDanwei");
	
	
	$("#changeParamToFindSearchIndicatorDataDeatil").attr("data-dateType", "");
	
	//查询数据重新画图
	findSearchIndicatorDataDeatil(indexIds,stockCode_Key,dataDateType,businessTypes,dateType,showChatName,showChatDanwei)
}

/**
 * 
 * @param indexIds  例如:"class_150"
 * @param stockCode  例如:"430002"
 * @param dataDateType 例如:"D","W","H","Y",
 * @param businessTypes 例如:"bt_stock_index"
 * @param dateType 例如:"周","月","季","半年","1年","2年","3年","5年","2017-08-01,2017-08-03"
 */
function findSearchIndicatorDataDeatil(indexIds,stockCode_Key,dataDateType,businessTypes,dateType,showChatName,showChatDanwei){
	//画图弹窗标题
	$("#chartTitle").text(showChatName);
	//清空表格数据
	$("#shujuChartTableTitle").html("");
	$("#shujuChartTableDate").html("");
	$("#shujuChartTableData").html("");
	//设置参数
	var param={indexIds:indexIds,stockCode:stockCode_Key,dataDateType:dataDateType,businessTypes:businessTypes,dateType:dateType};
	$.axs("/betaInvest/btStockIndex/findStockIndexData.do",param,true,function(data){
		if(data.retCode==0000){
			var result=data.retData;
			if(result==null || result.length==0){
//				errorAlert("","数据飞走了，请重试~");
				dataEcharts([],[],"","");
				$("#shujuChartTableTitle").parent().hide();
				return false;
			}
			
			$("#shujuChartTableTitle").parent().show();
			$("#shujuChartTableTitle").html("<tr><td>"+showChatName+"("+showChatDanwei+")</td></tr>");
			var shujuChartTableDateHtml="<tr>";
			var shujuChartTableDataHtml="<tr>";
			var dateTime=[];
			var seriesData=[];
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var xShow = obj.dataDateValue;
				if(dataDateType == "W"){
					xShow = xShow + "W";
				}
				dateTime.push(xShow);
				seriesData.push(obj[indexIds]);
				shujuChartTableDateHtml+="<th>"+xShow+"</th>";
				shujuChartTableDataHtml+="<td>"+obj[indexIds]+"</td>";
			}
			shujuChartTableDateHtml+="</tr>";
			shujuChartTableDataHtml+="</tr>";
			$("#shujuChartTableDate").html(shujuChartTableDateHtml);
			$("#shujuChartTableData").html(shujuChartTableDataHtml);
			//画图数据
			dataEcharts(dateTime,seriesData,showChatName,showChatDanwei);
		}else{
//			errorAlert("","数据飞走了");
			return false;
		}
	});
	
}


/**
 * 画图
 */
function dataEcharts(dateTime,seriesData,showChatName,showChatDanwei){
  var myChart = echarts.init(document.getElementById('wj_dataEcharts'));
  option = {
      color: ['#3398DB'],
      tooltip : {
          trigger: 'axis',
          formatter: function(params) {
                //console.log(params[0])
              if(params[0].data != undefined){
            	  return '<div class="shizhi_tips">'+
                  '<span class="shizhi_time">'+params[0].name+'</span>'+
                  '<div class="types_one">'+
                      '<span class="shoupanjia">'+showChatName+'（'+showChatDanwei+'）</span>'+
                      '<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[0].data != 0) ? "-" : params[0].data)+'</span>'+
                      '<div class="clr"></div>'+
                  '</div>'+
              '</div>';
              }
          }
      },
      legend:{
          show:true,
          data:[showChatName]
      },
      dataZoom:[
           {
              show: true,
              realtime: true,
              start: 0,
              end: 60
          },
          {
              type: 'inside',
              realtime: true,
              start:0,
              end:60
          }
          
      ],
      grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : dateTime,
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
              name:showChatName,
              type:'line',
              symbol:'circle',
              itemStyle:{
                  normal:{
                      color:"#3398DB"
                  }
              },
              data:seriesData
          }
      ]
  };
  myChart.setOption(option);
};

//根据代码查询msg
function findCName(code) {
	//console.log(code)
	var cName = "";
	$.axs("/betaInvest/enterpriseData/findSearchMsg.do", {searchStr:code}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				cName = "";
			}else{
				if(data.retData.length > 0){
					cName = data.retData[0].companyForShort;
				}
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return cName;
}
