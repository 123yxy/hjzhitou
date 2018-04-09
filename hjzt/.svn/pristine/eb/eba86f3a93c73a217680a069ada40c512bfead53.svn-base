var timeType = "1";
var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
var keyWord = "";
var eventType = "0";
$(document).ready(function() {
	$("#stockShort").html(stockName+" ("+stockCode+")");
	removeKeys();
	// 打开添加关键词的input
	$(".keyscz span").on("click", function() {
		$(this).addClass("on");
		$(this).siblings("input").show();
		$(this).siblings("i").show();
	});
	// 点击确认关键词的对勾
	$(".keyscz i.keys_qd").on("click", function() {
		var le = $(".kesbox").find("a").size();
		var tex = $(this).siblings("input").val();
		var htm = '<a href="#">' + tex + '<i></i></a>';
		if (le >= 5) {
			alert("最多可以添加5个关键词");
			$(this).hide();
			$(this).siblings("input").hide();
			$(this).siblings("i").hide();
		} else if ($.trim(tex) != "") {
			$(".kesbox").append(htm);
			$(this).hide();
			$(this).siblings("input").hide();
			$(this).siblings("i").hide();
			removeKeys();
		} else {
			$.zmAlert("请填写关键词!");
		}
		onKeyWord();
	});
	// 删除关键词
	function removeKeys() {
		$(".kesbox a i").on("click", function() {
			$(this).parent().remove();
			onKeyWord();
		});
	}
	//查询公司的分类图表数据
	findClassifyChartList();
	//查询公司的分类新闻列表
	findClassifyList(1,10);
	
	//点击叉号的事件 
	$(".keys_qx").on("click", function(){
		$("#inputText").val("");
		$("#inputText").hide();
		$(".keys_qd").hide();
		$(".keys_qx").hide();
		$("#spanId").removeClass("on");
	});
	
	
});
//查询公司的分类图表数据
function findClassifyChartList(){
	$.axs("/stock/publicOpinion/findClassifyChartList.do","timeType="+timeType+"&stockCode="+stockCode+"&stockName="+stockName+"&keyWord="+keyWord+"&eventType="+eventType,false,function(data){
		if(data.retCode=="0000"){
			if(data.retData.chartList != null && data.retData.chartList != ""){
				var chartDate=[];
				var chartNum=[];
				$(data.retData.chartList).each(function(){
					chartDate.push(this.dateTime);
					chartNum.push(this.num);
				})
				addEcharts(chartDate,chartNum);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//查询公司的分类新闻列表
function findClassifyList(pageNum, pageSize){
	$.axs("/stock/publicOpinion/findClassifyList.do","pageNum="+pageNum+"&pageSize="+pageSize+"&timeType="+timeType+"&stockCode="+stockCode+"&stockName="+stockName+"&keyWord="+keyWord+"&eventType="+eventType,false,function(data){
		if(data.retCode=="0000"){
			if(data.retData.classifyList != null && data.retData.classifyList != ""){
				$("#findClassifyList").empty();
				$(data.retData.classifyList).each(function(){
					var html='';
					if(this.eventType=='1'){
						html='<li class="dwfm"><span><em>单位负面</em></span>'
					}else if(this.eventType=='2'){
						html='<li class="rwfm"><span><em>人物负面</em></span>'
					}else if(this.eventType=='3'){
						html='<li class="tfsj"><span><em>突发事件</em></span>'
					}else if(this.eventType=='4'){
						html='<li class="jysj"><span><em>热点事件</em></span>'
					}else if(this.eventType=='5'){
						html='<li class="ywsj"><span><em>业务事件</em></span>'
					}else{
						html='<li class="hysj"><span><em>行业事件</em></span>'
					}
					html+='<a href="'+this.eventUrl+'" target="_blank">'+this.title+'</a>'+ 
							'<i>'+this.enentSource+'</i>'+ 
							'<i>'+this.eventDate+'</i></li>'+ 
							'<div class="clr"></div>';
					$("#findClassifyList").append(html);
				})
				$('#page').show();
				//分页
				$('#page').pagination({
					total: data.retData.tot,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						findClassifyList(pageNumber,size);
					}
				});
				//修改分页文字
				setPageText2('page');
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//加载图表
function addEcharts(chartDate,chartNum){
	// 舆情总览图表
	// 三板成分指数 图表
	var myChart6 = echarts.init(document.getElementById('yq_zl_tu'));
	option = {
		tooltip : {
			trigger : 'axis',
			formatter : function(params) {
				return params[0].name + '<br/>'  + params[0].value;
			}
		},

		dataZoom : {
			show : true,
			realtime : true,
			start : 0,
			end : 100
		},
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			axisLine : {
				onZero : false
			},
			data : chartDate/*[ '2009/6/11', '2009/6/12', '2009/6/13',
					'2009/6/14', '2009/6/15', '2009/6/16', '2009/6/17',
					'2009/6/11', '2009/6/12', '2009/6/13', '2009/6/14',
					'2009/6/15', '2009/6/16', '2009/6/17', '2009/6/11',
					'2009/6/12', '2009/6/13', '2009/6/14', '2009/6/15',
					'2009/6/16', '2009/6/17', '2009/6/11', '2009/6/12',
					'2009/6/13', '2009/6/14', '2009/6/15', '2009/6/16',
					'2009/6/17' ]*/
		} ],
		yAxis : [ {
			name : '',
			type : 'value',
		}

		],
		series : [ {

			type : 'line',
			itemStyle : {
				normal : {
					areaStyle : {
						type : 'default'
					},
					color : '#f4a068'
				}
			},
			data :chartNum/* [ 0.97, 0.96, 0.96, 0.95, 0.95, 0.94, 0.45, 0.97,
					0.96, 0.96, 0.95, 0.95, 0.94, 0.45, 0.97, 0.96,
					0.96, 0.95, 0.95, 0.94, 0.45, 0.97, 0.96, 0.96,
					0.95, 0.95, 0.94, 0.45 ]*/
		}

		]
	};

	myChart6.setOption(option);
	window.addEventListener("resize", function() {
		myChart6.resize();
	});
}
//选中日期处理事件
function onTimeType(id){
	$("#timeType"+id).siblings().removeClass("on");
	$("#timeType"+id).addClass("on");
	timeType=id;
	findClassifyChartList();
	findClassifyList(1,10);
}
//选择舆情类型
function onEventType(id){
	eventType=id;
	findClassifyChartList();
	findClassifyList(1,10);
}
//获取关键字信息
function onKeyWord(){
	$("#keyWords").find("a").each(function(index,item){
		if(index==0){
			keyWord=$(this).text();
		}else{
			keyWord+="|"+$(this).text();
		}
	});
	findClassifyChartList();
	findClassifyList(1,10);
}