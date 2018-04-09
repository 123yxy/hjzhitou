

BS.MyCollect = {
    PageInit: function () {
        
        var obj = this;
        var SBZS=obj.SBZS;
        var SBFC=obj.SBFC;
        var CYBZ=obj.CYBZ;
		var SZZS=obj.SZZS;
		var ZXBZ=obj.ZXBZ;
		var SCZS=obj.SCZS;
		var List_YB=obj.List_YB;
		var List_ZX=obj.List_ZX;
		var rankingCode=obj.rankingCode;//融资利润排名
		var areaId=obj.areaId;//融资排行地区id
		var category_id=obj.category_id;//融资排行行业ID
        var kanban_type=$("#data-kanban .switch.active").attr("data-type");
        var dateReg = obj.dateReg;
        //obj.SbanA();
        obj.SbanSB();
        obj.Yb();
        obj.Comsearch();
        obj.SzsSfc(kanban_type);
		obj.KanBanSwitch(kanban_type);
        obj.PmSelect(kanban_type);
        obj.HySelect(kanban_type);
        obj.AreaSelect(kanban_type);
        obj.PhHistogram(kanban_type);
        obj.Self(); 
        obj.CfSelect();
        obj.TxSelect();
		obj.AddSchedule();
		obj.RiChengCalendar();
		obj.CloudCount();
		obj.ModelCount();
		obj.ChartCount();
    },
    //获取云盘资料数量
    CloudCount:function(){
   	 var userId=localStorage.getItem("userId");
   	 $.ajax({
   		 url:'/beta/cloudResource/getCount.do',
   		 type:'post',
   		 data:{"userId":userId},
   		 success : function(data){
   			 var html='';
   			 if(data.code=='0000'){   				 
   				 html += data.result;
   			 }
   			 $("#cloud").html(html)
   		 }
   	 });
    },
    //我的模型
    ModelCount:function(){
    		var data = {pageNum: 1,pageSize: 1};
		$.axs("/betaInvest/btUserStudyReport/findBtUserStudyReportByPage.do", data, false, function(data) {
			var result = data.retData;
			var totalCount = result.totalCount;
			if(totalCount>=0) {
				$("#modelCount").html(totalCount);
			}
		});
   },
   //我的图表
   ChartCount:function(){
		var paraminfo='{"body":{"serch_key":""}}';
      	$.axsRequest("FT339",paraminfo,true,function(data){
			var result = data.retData;
//			console.log(data.retData)
			var totalNum = result.totalNum;
			if(totalNum>=0) {
				$("#chartCount").html(totalNum);
			}
		});
   },
    //三版A股轮播图
    SbanSB:function(){
           console.log("SbanSB");
	    	var paraminfo='{"body":{"pageNum":"1","pageSize":"8"}}';
	      	$.axsRequest("FT312",paraminfo,false,function(data){
                console.log(data);
		 	if(data.retCode=="0000"){
		 		var html = '';
                var list = data.retData.infoList_A;
                var htmlSB = '';
                var listSB = data.retData.infoList_SB;
//		 		console.log(list);
                 if(list.length==0){
                     $(".hdSB").html("");
                 }
                 for(var i=0;i<list.length;i++){
                     html+="<li><a href='../../slideJump/slideJump.html?txt="+list[i].url+"' target='_blank'><div class='pic slide2'><div class='item-title' title="+list[i].category_name+"><img src="+list[i].icon_url+"><span>"+list[i].category_name+"</span></div><div class='con-img'><img src='../saasBeta/images/Image/con-pic2.png'></div><div class='con-name'><div title="+list[i].stockName+list[i].stockCode+">"+list[i].stockName+"（"+list[i].stockCode+"）</div><span>智能研报</span></div></div></li>"
                 }
                 $(".picListSB").html(html);
                 $("#picListSB .loadingBox").hide();

		 		if(listSB.length==0){
		 			$(".hdA").html("");
				}
			 	for(var i=0;i<list.length;i++){
			 		htmlSB+="<li><a href='../../slideJump/slideJump.html?txt="+listSB[i].url+"' target='_blank'><div class='pic slide1'><div class='item-title' title="+listSB[i].category_name+"><img src="+listSB[i].icon_url+"><span>"+listSB[i].category_name+"</span></div><div class='con-img'><img src='../saasBeta/images/Image/con-pic.jpg'></div><div class='con-name'><div title="+listSB[i].stockName+listSB[i].stockCode+">"+listSB[i].stockName+"（"+listSB[i].stockCode+"）</div><span>智能研报</span></div></div></a></li>"
				}
		 		$(".picListA").html(htmlSB);
		 		 $("#picListA .loadingBox").hide();
		 	}else{
		 		errorAlert(data.retCode,data.retMsg);
		 		$("#picListSB .loadingBox").hide();
		 	}
		 });
    },
	 /*SbanA:function(){
         var paraminfo='{"body":{"pageNum":"1","pageSize":"8"}}';
         $.axsRequest("FT312",paraminfo,false,function(data){
             if(data.retCode=="0000"){
                 var html = '';
                 var list = data.retData.infoList_SB;
                 console.log(list);
		 		if(list.length==0){
		 			$(".hdA").html("");
                    console.log("轮播图没有数据")
				}
			 	for(var i=0;i<list.length;i++){
			 		html+="<li><a href='../../slideJump/slideJump.html?txt="+list[i].url+"' target='_blank'><div class='pic slide1'><div class='item-title' title="+list[i].category_name+"><img src="+list[i].icon_url+"><span>"+list[i].category_name+"</span></div><div class='con-img'><img src='../saasBeta/images/Image/con-pic.jpg'></div><div class='con-name'><div title="+list[i].stockName+list[i].stockCode+">"+list[i].stockName+"（"+list[i].stockCode+"）</div><span>智能研报</span></div></div></a></li>"
				}
		 		$(".picListA").html(html);
		 		 $("#picListA .loadingBox").hide();
             }else{
                 errorAlert(data.retCode,data.retMsg);
                 $("#picListA .loadingBox").hide();
             }
         });
	 },*/
    //研报资讯
	 Yb:function(){
	 	var obj=this;
         var paraminfo='{"body":{"pageNum":"1","pageSize":"8"}}';
         $.axsRequest("FT311",paraminfo,true,function(data){
             if(data.retCode=="0000"){
             	console.log(data);
             	List_YB=data.retData.infoList_YB;
            		List_ZX=data.retData.infoList_ZX;
                YB_ZX_List(List_YB,0);
             }else{
                errorAlert(data.retCode,data.retMsg);
                $("#yanbao_news .loadingBox").hide();
             }
         });
         $(".newshead span").on("click",function () {
         	 $(".newshead span").removeClass("on");
	 	     $(this).addClass("on");
	     	 var index=$(this).index();
	         if(index==0){
	            YB_ZX_List(List_YB,index);
	         }else{
	         	YB_ZX_List(List_ZX,index);
	         }
         });
         function YB_ZX_List(infoList,index) {
             var html='';
             if(infoList==undefined) return;
             for(var i=0;i<infoList.length;i++){
             		if(index==0){
             			var listObj = JSON.stringify(infoList[i]);
             			html+='<div class="row_"><div></div><h1><a href="../../detail/detail.html?txt2='+infoList[i].pdf_url+'" code="'+infoList[i].stock_code+'" class="news-url" target="_blank">'+infoList[i].title+'</a></h1><p><span>'+infoList[i].release_time+'</span><span class="xie">/</span><span>机构:'+infoList[i].rorgname+'</span></p></div>';
             		}else{
             			html+='<div class="row_"><div></div><h1><a href="../../detail/detail.html?txt='+infoList[i].news_url+'" class="news-url" target="_blank">'+infoList[i].content_title+'</a></h1><p><span>'+infoList[i].release_time+'</span><span class="xie">/</span><span>来源:'+infoList[i].source_site+'</span></p></div>';
             		}
             }
             $(".mb_news").html(html);
              $(".mb_news .con-item").on("click",function(){
            		localStorage.setItem('sfybobj',$(this).attr("data-listObj"));
            		// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
                window.open("/detail/detail.html?type=sf&stockCode="+$(this).attr("code"));
            });
             $("#yanbao_news .loadingBox").hide();
         }
	 },
    //企业搜索跳转
     Comsearch:function(){
	 	// var val=$(".m94 .select").val();
	 	// console.log(val);
         //热搜关键词接口
         var paraminfo='{"body":{}}';
         $.axsRequest("FT335",paraminfo,true,function(data){
//           console.log(data);
             if(data.retCode=="0000"){
                 var html = '';
                 var wordList = data.retData.infoList;
				 for(var i=0;i<wordList.length;i++){
				 	html+='<span class="hot-word">'+wordList[i].name+'</span>'
				 }
				 $(".hot").append(html);
             }else{
                 errorAlert(data.retCode,data.retMsg);
             }
         });
         $(".hot").on("click",".hot-word",function(){
         	var word=$(this).html();
             location.href="companySearchList/companySearchList.html?txt="+word;
		 });
 		$(".sc-icon").click(function(){
            var val=$(".m94 .select").val();
	        location.href="companySearchList/companySearchList.html?txt="+val;
	    })
     },
     //数据看板 三板 A股
     KanBanSwitch:function(type){
     	var obj=this;
     	//切换 三版和a股
     	$("#data-kanban .switch").on("click",function(){
     		$("#kanban_data .loadingBox").show();
     		$("#data-kanban .switch").removeClass("active");
     		$(this).addClass("active");
     		//定位到日k图
     		$(".lines-type span").removeClass("on");
     		$(".lines-type span").eq(0).addClass("on");
     		var data_type=$(this).attr("data-type");
     		$("#kanban-zhishu,#SzsSfcList").removeClass("A"); 
     		if(data_type=="A"){
     			if($("#kanban-zhishu").hasClass("A")==false){
     				$("#kanban-zhishu,#SzsSfcList").addClass("A"); 
     			}
     		}
     		//切换 每次定位到第一个子栏目
			if(data_type=="SB"){
				var isXSB=true;
				ajxrequestdata("899002","KLine-index",true);
				//更多链接地址
				$("#data-kanban .databoard_more").find("a").attr("href","threeLibrary/stockQuotes.html");
			}else{
				var isXSB=false;
				ajxrequestdata("399006","KLine-index",false); 
				//更多链接地址
				$("#data-kanban .databoard_more").find("a").attr("href","xym/rz.html");
			}
			
//   		console.log(data_type)
     		obj.SzsSfc(data_type);
     		obj.PhHistogram(data_type);//融资排行-柱状图
     		obj.PmSelect(data_type);//融资排行-利润排名
     		obj.HySelect(data_type);//融资排行-行业
     		obj.AreaSelect(data_type);//融资排行-地区
     		$("#kanban_data .loadingBox").hide();
     	});
     	
     },
     //4.1.	首页-数据看板-三板/主板市场各指数市场概况
     SzsSfc:function(type){
     		var obj=this;
     	    var paraminfo='{"body":{}}';
     	    $.axsRequest("FT301",paraminfo,false,function(data){
			 	if(data.retCode=="0000"){
			 		var retData = data.retData;
			 		console.log(retData)
			 		if(retData==undefined) return;
			 		SBZS=retData.SBZS;
			 		SBFC=retData.SBFC;
			 		CYBZ=retData.CYBZ;
			 		SZZS=retData.SZZS;
			 		ZXBZ=retData.ZXBZ;
			 		SCZS=retData.SCZS;
			 		DataList(SBZS);
			 	}else{
			 		errorAlert(data.retCode,data.retMsg);
			 	}
			 });
			 showzs(type);
			 function showzs(type){
			 	var szhtml="";
				 if(type=="SB"){
				 	szhtml += '<div class="exponent_l active" d-type="SBZS" d-code="899002">';
					szhtml += '<a href="threeLibrary/stockQuotes.html">';
					szhtml += '<div>三板做市指数</div>';
					szhtml += '<span class="green green_l">'+SBZS[0].newPrice+'</span>';
					szhtml += '<span class="green green_r">'+SBZS[0].priceChangeRatio+'%</span>';
					szhtml += '</a>';
					szhtml += '</div>';
					szhtml += '<div class="line"></div>';
					szhtml += '<div class="exponent_l" d-type="SBFC" d-code="899001">';
					szhtml += '<a href="threeLibrary/stockQuotes.html">';
					szhtml += '<div>三板成份指数</div>';
					szhtml += '<span class="red red_l">'+SBFC[0].newPrice+'</span>';
					szhtml += '<span class="red red_r">'+SBZS[0].priceChangeRatio+'%</span>';
					szhtml += '</a>';
					szhtml += '</div>';
				 }else{
				 	szhtml += '<div class="exponent_l active" d-type="CYBZ" d-code="399006">';
					szhtml += '<a href="threeLibrary/stockQuotes.html">';
					szhtml += '<div>创业板指</div>';
					szhtml += '<span class="green green_l">'+CYBZ[0].newPrice+'</span>';
					szhtml += '</a>';
					szhtml += '<div class="line" style="display:none;"></div>';
					szhtml += '</div>';
					szhtml += '<div class="exponent_l" d-type="SZZS" d-code="000001">';
					szhtml += '<a href="threeLibrary/stockQuotes.html">';
					szhtml += '<div>上证指数</div>';
					szhtml += '<span class="red red_l">'+SZZS[0].newPrice+'</span>';
					szhtml += '</a>';
					szhtml += '<div class="line"></div>';
					szhtml += '</div>';
					szhtml += '<div class="exponent_l" d-type="ZXBZ" d-code="399005">';
					szhtml += '<a href="threeLibrary/stockQuotes.html">';
					szhtml += '<div>中小板指</div>';
					szhtml += '<span class="red red_l">'+ZXBZ[0].newPrice+'</span>';
					szhtml += '</a>';
					szhtml += '<div class="line"></div>';
					szhtml += '</div>';
					szhtml += '<div class="exponent_l" d-type="SCZS" d-code="399001">';
					szhtml += '<a href="threeLibrary/stockQuotes.html">';
					szhtml += '<div>深成指数</div>';
					szhtml += '<span class="red red_l">'+SCZS[0].newPrice+'</span>';
					szhtml += '</a>';
					szhtml += '</div>';
				 }
				 $("#kanban-zhishu").html(szhtml);
			 }
			 //切换
			 $(".exponent .exponent_l").on("mouseenter",function(){
			 	//判断三版还是A股
			 	var typeval=$("#data-kanban .switch.active").attr("data-type");
				if(typeval=="SB"){
					var isXSB=true;
				}else{
					var isXSB=false;
				}
			 	ajxrequestdata($(this).attr("d-code"),"KLine-index",isXSB);
     			var d_type=$(this).attr("d-type");
     			$(".exponent .exponent_l").removeClass("active");
     			//定位到日k图
	     		$(".lines-type span").removeClass("on");
	     		$(".lines-type span").eq(0).addClass("on");
     			if(d_type=="CYBZ" || d_type=="SZZS" || d_type=="ZXBZ" || d_type=="SCZS"){
     				$(this).find(".line").hide();
     				$(this).siblings().find(".line").show();
     				$(this).prev().find(".line").hide();
     			}
     			$(this).addClass("active");
     			if(d_type=="SBZS"){
     				DataList(SBZS);
     			}else if(d_type=="SBFC"){
     				DataList(SBFC);
     			}else if(d_type=="CYBZ"){
     				DataList(CYBZ);
     			}else if(d_type=="SZZS"){
     				DataList(SZZS);
     			}else if(d_type=="ZXBZ"){
     				DataList(ZXBZ);
     			}else if(d_type=="SCZS"){
     				DataList(SCZS);
     			}
     		}).on("mouseleave",function(){
     			// $(".exponent .exponent_l").find(".line").show();
                 $(this).prev().find(".line").show();
     		})
		 $("#kanban-zhishu").on("mouseleave",function(){
		 	$(".exponent>div.active").prev().find(".line").hide();

		 })
			 function DataList(datainfo){
			 	var html = '';
			 	html+='<div class="eight_">';
				html += '<div class="eight_data">' + datainfo[0].newPrice + '</div>';
				html += '<div class="eight_zui">最新</div>';
				html += '</div>';
				html += '<div class="eight_ bg_blue">';
				html += '<div class="eight_data">' + datainfo[0].highPrice + '</div>';
				html += '<div class="eight_zui">最高</div>';
				html += '</div>';
				html += '<div class="eight_">';
				html += '<div class="eight_data">' + datainfo[0].tradingVolume + '</div>';
				html += '<div class="eight_zui">成交量(百万)</div>';
				html += '</div>';
				html += '<div class="eight_ bg_blue">';
				html += '<div class="green eight_data">' + datainfo[0].changeAmount + '</div>';
				html += '<div class="eight_zui">涨跌额</div>';
				html += '</div>';
				html += '<div class="eight_ bg_blue">';
				html += '<div class="eight_data">' + datainfo[0].lowPrice + '</div>';
				html += '<div class="eight_zui">最低</div>';
				html += '</div>';
				html += '<div class="eight_">';
				html += '<div class="eight_data">' + datainfo[0].openPrice + '</div>';
				html += '<div class="eight_zui">开盘</div>';
				html += '</div>';
				html += '<div class="eight_ bg_blue">';
				html += '<div class="eight_data">' + datainfo[0].tradingAmount + '</div>';
				html += '<div class="eight_zui">成交额(百万)</div>';
				html += '</div>';
				html += '<div class="eight_">';
				html += '<div class="green eight_data">' + datainfo[0].priceChangeRatio + '%</div>';
				html += '<div class="eight_zui">涨跌幅</div>';
				html += '</div>';
				$("#SzsSfcList").html(html);
			 }
    },
     //融资排行柱状图
     PhHistogram:function(type){
     	if($("#sel_node_selId_pm_hidden").val()==-1){
     		var pm='';
     	}else{
     		var pm=$("#sel_node_selId_pm_hidden").val();
     	}
     	if($("#sel_node_selId_area_hidden").val()==-1){
     		var areaid='';
     	}else{
     		var areaid=$("#sel_node_selId_area_hidden").val();
     	}
     	if($("#sel_node_selId_hy_hidden").val()==-1){
     		var hy='';
     	}else{
     		var hy=$("#sel_node_selId_hy_hidden").val();
     	}
     	var paraminfo='{"body":{"type": "'+type+'","rankingCode": "'+pm+'","areaId": "'+areaid+'","category_id": "'+hy+'","sortSize": "5"}}';
//       console.log(paraminfo)
         $.axsRequest("FT302",paraminfo,true,function(data){
         	console.log(data)
         	
             if(data.retCode=="0000"){
             	var chartInfo=data.retData.chartInfo;
             	var result = data.retData.infoList;
             	var dateTemp=[],tradingVolume=[];
				var stockCodes=[];
             	for (var i = 0; i < result.length; i++) {
					var obj=result[i];
					dateTemp.push(obj.stockName);
					//tradingVolume.push((obj.statistic==null?0:obj.statistic/10000.00).toFixed(2));
					tradingVolume.push(obj.statistic==null?0:obj.statistic);
					stockCodes.push(obj.stockCode);
             	}
             	showChartRongZiJine(dateTemp, tradingVolume, stockCodes,chartInfo)
             }else{
                 errorAlert(data.retCode,data.retMsg);
             }
         });
		function showChartRongZiJine(dateTemp, tradingVolume, stockCodes,chartInfo) {
			//	console.log(dateTemp)
			//	console.log(stockCodes)
			console.log(chartInfo)
			// 融资排行 图表 
			var myChart5 = echarts.init(document.getElementById('rongzi_jiner'));
			option = {
				tooltip: {
					trigger: 'axis',
					show: true,
					formatter: function(params) {
//						console.log(params)
						var index = params[0].dataIndex;
						var divHtml = '<div class="sanban_tips">' +
							'<p class="sb_tips_title">' + params[0].name + '(' + stockCodes[index] + ')' + '</p>' +
							'<div class="sb_tips_content">' +
							'<span class="tips_leibie fl">' + params[0].seriesName + '</span>' +
							'<span class="tips_leibie_num fl">' + params[0].value + '</span>' +
							'<div class="clr"></div>' +
							'</div>' +
							'</div>';
						return divHtml;
					}
				},
				toolbox: {
					feature: {
		
						saveAsImage: {
							title: '保存图片',
							icon: 'image:///saasBeta/images/ave.png'
		
						}
					},
					top: 0,
					right: '4%',
				},
				legend: {
					show: true,
					data: [chartInfo.xName],
					top: 0
				},
				title: {
					text: chartInfo.yName,
					textStyle: {
						fontSize: '14px',
						color: "#4c4c4c"
					},
					left: '5% ',
					top: 0
				},
				//	   color:['#90b4e6','#5581bf'],
				xAxis: [{
					type: 'category',
					//data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					data: dateTemp
				}],
				yAxis: [{
					type: 'value',
					//	            name: '累计融资金额(亿)',
					axisLabel: {
						formatter: '{value}'+chartInfo.unit
					}
				}],
				grid: {
					top:'23%',
					left: '3%',
					right: '2%',
					bottom:'22%',
					containLabel: true
				},
				dataZoom: [{
						show: true,
						realtime: true,
						start: 0,
						end: 100
					},
					{
						type: 'inside',
						realtime: true,
						start: 0,
						end: 100
					}
		
				],
		
				series: [{
					name: chartInfo.xName,
					type: 'bar',
					barWidth: '20',
					itemStyle: {
						normal: {
							color: '#62a6f2'
						},
						emphasis: {
							color: "#4a8ad3" //鼠标放到柱形图上显示的颜色
						}
					},
					//	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
					data: tradingVolume,
					label: {
						normal: {
							show: true,
							position: "top"
						}
					}
				}]
			};
			myChart5.setOption(option);
			window.addEventListener("resize", function() {
				myChart5.resize();
			});
		}
     },
     //融资排行-利润排名
     PmSelect:function(type){
     	var obj=this;
     	var HyList = [];
        if(type=="SB"){
        		pmtype=13;
        }else{
        		pmtype=14;
        }
        var paraminfo='{"body":{"type":"'+pmtype+'"}}';
     	$.axsRequest("FT003",paraminfo,false,function(data){
     		if(data.retCode=="0000"){
			 		var retData = data.retData;
			 		if(retData==undefined) return;
			 		$.each(retData.infoList, function (i, item) {
		                HyList.push({ "key": item.code, "value": item.name });
		           });
			 	}else{
			 		errorAlert(data.retCode,data.retMsg);
			 	}
     	});
        
     	var width=$("#pm_select").width();
	                    BS.Common.Select.Create({
	                        uniqueID: "sel_node_selId_pm",
	                        showID: "pm_select",
	                        isAjax: false,
	                        DefaultConfig: {
	                            data: HyList
	                        },
	                        width: width,
	                        selectwidth: 24,
	                        returnFun: function (v) {
	                        		obj.PhHistogram(type);
		                		},
		                		defaultKey: HyList[0].key,
		                		max_height:130

	                    });
     },
     //融资排行-行业
     HySelect:function(type){
     	var obj=this;
     	var HyList = [];
        HyList.push({ "key": -1, "value": "行业" });
        var paraminfo='{"body":{"type":"'+type+'","name":"","pinyin_header":"","parent_id":""}}';
     	$.axsRequest("FT002",paraminfo,false,function(data){
     		if(data.retCode=="0000"){
			 		var retData = data.retData;
			 		if(retData==undefined) return;
			 		$.each(retData.infoList, function (i, item) {
		                HyList.push({ "key": item.id, "value": item.category_name });
		           });
			 	}else{
			 		errorAlert(data.retCode,data.retMsg);
			 	}
     	});
        
     	var width=$("#hy_select").width();
	                    BS.Common.Select.Create({
	                        uniqueID: "sel_node_selId_hy",
	                        showID: "hy_select",
	                        isAjax: false,
	                        DefaultConfig: {
	                            data: HyList
	                        },
	                        width: width,
	                        selectwidth: 24,
	                        returnFun: function (v) {
	                        		obj.PhHistogram(type);
		                		},
		                		defaultKey: HyList[0].key,
		                		max_height:130

	                    });
     },
     //融资排行-地区
     AreaSelect:function(type){
     	var obj=this;
     	var AreaList = [];
        AreaList.push({ "key": -1, "value": "地区"});
        
        var paraminfo='{"body":{"name_cn":"","pinyin":"","pinyin_header":"","parent_id":"0"}}';
     	$.axsRequest("FT001",paraminfo,false,function(data){

     		if(data.retCode=="0000"){
			 		var retData = data.retData;
			 		if(retData==undefined) return;
			 		$.each(retData.infoList, function (i, item) {
		                AreaList.push({ "key": item.id, "value": item.name_cn });
		           });
			 	}else{
			 		errorAlert(data.retCode,data.retMsg);
			 	}
     	});
        
     	var width=$("#hy_select").width();
	                    BS.Common.Select.Create({
	                        uniqueID: "sel_node_selId_area",
	                        showID: "area_select",  //div id
	                        isAjax: false,          //异步 同步
	                        DefaultConfig: {
	                            data: AreaList      //接口返回数据
	                        },
	                        width: width,           //下拉框宽度
	                        selectwidth: 24,        //箭头图标宽度
	                        returnFun: function (v) {
	                        		obj.PhHistogram(type);
		                		},
		                		defaultKey: AreaList[0].key,  //默认选项
		                		max_height:130

	                    });
     },
     //自选股
     Self:function(){
     	//初始化列表
		 var list=[];
		 var id=localStorage.getItem("userId");
         var paraminfo='{"body":{"pageNum":"1","pageSize":"16"}}';
         $.axsRequest("FT310",paraminfo,true,function(data){
             if(data.retCode=="0000"){
                 var html = '';
                  list = data.retData;
                  console.log(list);
                 if(list.length==0){
                 	$(".right_bottom .no-data").removeClass("hide");
                     $(".stock_massage").addClass("hide");
				 }
                 for(var i=0;i<list.length;i++){
                 	html+='<ul stockcode="'+list[i].stockCode+'" class="clear"><li>'+list[i].stockName+'</li><li class="price">'+list[i].newPrice+'</li><li class="price-change">'+list[i].priceChangeRatio+'</li><li><i class="pk" onclick="BS.MyCollect.addComparisonStockClass(this,'+"'"+list[i].stockCode+"'"+','+"'"+list[i].stockName+"'"+')"></i><i class="del" name='+list[i].stockCode+'></i></li></ul>'
				 }
                 $(".stock_massage").html(html);
             }else{
                 errorAlert(data.retCode,data.retMsg);
             }
         });
         var lis=$(".stock_massage>ul>li.price-change");
         var uls=$(".stock_massage>ul")
         for(var i=0;i<uls.length;i++){
             if(parseFloat(uls[i].children[2].textContent)>0){
            uls[i].children[2].style.color="#f13742";
            uls[i].children[1].style.color="#f13742";
             }else if(parseFloat(uls[i].children[2].textContent)<0){
                 uls[i].children[2].style.color="#2ea749";
                 uls[i].children[1].style.color="#2ea749";
			 }else{
                 uls[i].children[2].style.color="#333";
                 uls[i].children[1].style.color="#333";
			 }
		 }
//		 $(".right_bottom .stock_massage").on("click"," ul li:nth-child(4) i:nth-child(1)",function(){
//		 	if(!$(this).hasClass("active")){
//              $(this).addClass("active")
//			}else{
//              $(this).removeClass("active")
//			}
//
//		 });
		 //自选股删除
		 $(".stock_massage").on("click",".del",function(){
			var stockCode=$(this).attr("name");
             var paraminfo='{"body":{"stockCode":"'+stockCode+'"}}';
             var txt=  "确认删除该自选股信息吗？";
         	 var option = {
         		 title: "警告",
         		 btn: parseInt("0011",2),
         		 onOk: function(){
		             $.axsRequest("FT337",paraminfo,true,function(data){
		                 console.log(data);
		                 if(data.retCode=="0000"){
		                     $("i[name='"+stockCode+"']").parents("ul").remove();
		                     if($(".stock_massage").html()==""){
		                         $(".right_bottom .no-data").removeClass("hide");
		                         $(".stock_massage").addClass("hide");
							}
		                     $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"删除自选股操作"},true,function(data){});
		                 }else{
		                     errorAlert(data.retCode,data.retMsg);
		                 }
		             });
         		 }
         	 }
         	window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum. confirm, option);	
		 })
     
      //新建自选股
     $(".no-data .gupiao").click(function(){
     	window.location.href="security/myPreferredStock.html";
     })
     },
   
	//自选股 pk
	addComparisonStockClass:function(the,comparisonStockCode,comparisonStockName){
		$(".tanc_public .gegu_searches").hide();
		if($(the).hasClass("active")){
			$(the).removeClass("active");
			if($("#duibi_zb-ul li[StockCode='"+comparisonStockCode+"']").length>0){
				$("#duibi_zb-ul li[StockCode='"+comparisonStockCode+"']").remove();
			} 
			//删除接口
			delContrastCompany(comparisonStockCode);
			$("#duibi_zb-xg").html("");
			var length=$("#duibi_zb-ul").find("li").length;
			$(".top_titles em").html("（"+length+"/4）");
			
		}else{
//			if($("#tanc_public").css("display")=="none"){
//				$("#tanc_public").show();
//			}
//			$(".cz_duibi").show();
			
			var length=$("#duibi_zb-ul").find("li").length;
			$(".top_titles em").html("（"+(length+1)+"/4）");
			//超出四个点击不弹框
			if(length!=null && length>=4){
			   var txt=  "最多可添加四个公司";
			   var option = {
			    title: "提示",
			    btn: parseInt("0001",2)
			   }
			   window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
			}else{
				$(the).addClass("active");
				//显示弹框
				$("#tanc_public").show();
				$(".cz_duibi").show();
				//插入
				$("#duibi_zb-ul").append('<li StockCode="'+comparisonStockCode+'"><a target="_blank" href="/businessDetails/newTBindex.html?stockCode="'+comparisonStockCode+'"&amp;stockName='+comparisonStockName+'">'+comparisonStockName+'('+comparisonStockCode+')</a><i></i></li>');
//				$("#duibi_zb-xg").html("");
				//设置对比公司
				setContrastCompany();
				
			}
			
			//删除以选择的li
			$("#duibi_zb-ul i").on("click",function(){
				var stockcode=$(this).parents("li").attr("stockcode");
				//计算个数
				var length=$("#duibi_zb-ul").find("li").length;
				$(".top_titles em").html("（"+length+"/4）");
				$(".stock_massage ul[StockCode='"+stockcode+"']").find("li i.pk").removeClass("active");
				$("#duibi_zb-ul li[StockCode='"+stockcode+"']").remove();
				//删除接口
				var stockSHow=$(this).prev().text();
				var removeClassStockCode=stockSHow.substring(stockSHow.indexOf("(")+1,stockSHow.indexOf(")"));
				delContrastCompany(removeClassStockCode);
//				$("#duibi_zb-xg").html("");
			});
			//相关企业
			var html="";
			var paraminfo='{"body":{"stockCode":"'+comparisonStockCode+'","number":"3"}}';
			$("#duibi_zb-xg-box .loadingBox").show();
			$.axsRequest("FT343",paraminfo,true,function(data){
		                 var retData=data.retData;
		                 if(data.retCode=="0000"){
		                 	if(retData.length==0) {
		                 		$("#duibi_zb-xg-box").hide();
		                 		$("#duibi_zb-xg-box .loadingBox").hide();
		                 		return;
		                 	}else{
		                 		$("#duibi_zb-xg-box").show();
		                 		for(var i=0;i<retData.length;i++){
			                 		html+='<li StockCode="'+retData[i].stockCode+'"><a>'+retData[i].stockName+'('+retData[i].stockCode+')</a><i></i></li>';
			                     	$("#duibi_zb-xg").html(html);
			                     	$("#duibi_zb-xg-box .loadingBox").hide();
		                 		}
		                 	}
		                 }
		    });
		    $(".cz_duibi span").on("click",function(){
				var length=$("#duibi_zb-ul").find("li").length;
				if(length==null || length==0){
					var txt=  "请添加对比企业";
				   var option = {
				    title: "提示",
				    btn: parseInt("0001",2)
				   }
				   window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
				}else{
					window.location.href="/contrast/companyBepthComparison.html";
				}
			
			});
			//设置用户对比
			function setContrastCompany(){
				var contrasts="";
				//股票代码
				$("#duibi_zb-ul").find("a").each(function(){
					var codeAndName=$(this).text();
					if(codeAndName!=null && codeAndName!="" && codeAndName!="undefined"){
						var startIndex=codeAndName.indexOf("(");
						var endIndex=codeAndName.indexOf(")");
						contrasts+= codeAndName.substring(startIndex+1,endIndex) + "-" + codeAndName.substring(0,startIndex) + ",";
					}
				});
				if(contrasts == ""){
					return;
				}else{
					contrasts = contrasts.substring(0, contrasts.length - 1);
				}
				$.axs("/betaInvest/common/setUserCC.do",{cnStr:contrasts},false,function(data){
					if(data.retCode!="0000"){
						errorAlert("", data.retMsg);
					}
				});
			}
			//删除
			function delContrastCompany(conStockCode){
				$.axs("/betaInvest/common/delUserCC.do",{stockCode:conStockCode},false,function(data){
					if(data.retCode!="0000"){
						errorAlert("", data.retMsg);
					}
				});
			}
		}
	},
	//重复下拉框
     CfSelect:function(keyVal){
         var CfList = [];
         CfList.push({ "key": 1, "value": "重复" });
         CfList.push({"key":2,"value":"不重复"});
		 
		 if(keyVal==0){
         	var keyVal=CfList[1].key;
         }else{
         	var keyVal=CfList[0].key;
         }
			
         var width=$("#cf_select").width();
         BS.Common.Select.Create({
             uniqueID: "sel_node_selId_cf",
             showID: "cf_select",  //div id
             isAjax: false,          //异步 同步
             DefaultConfig: {
                 data: CfList      //接口返回数据
             },
             width: width,           //下拉框宽度
             selectwidth: 24,        //箭头图标宽度
             returnFun: function (v) {
                 console.log(v)
             },
             defaultKey: keyVal,  //默认选项
             max_height:130

         });
     },
     //提醒下拉框
     TxSelect:function(keyVal){
         var TxList = [];
         TxList.push({ "key": 1, "value": "提醒" });
         TxList.push({"key":2,"value":"不提醒"});
         console.log(keyVal)
         if(keyVal==0){
         	var keyVal=TxList[1].key;
         }else{
         	var keyVal=TxList[0].key;
         }

         var width=$("#tx_select").width();
         BS.Common.Select.Create({
             uniqueID: "sel_node_selId_tx",
             showID: "tx_select",  //div id
             isAjax: false,          //异步 同步
             DefaultConfig: {
                 data: TxList      //接口返回数据
             },
             width: width,           //下拉框宽度
             selectwidth: 24,        //箭头图标宽度
             returnFun: function (v) {
                 console.log(v)
             },
             defaultKey: keyVal,  //默认选项
             max_height:130

         });
     },
	 //添加日程安排
	 AddSchedule:function(){
         var userId=localStorage.getItem("userId");
         var currentDate=$("#choice-date").html();
         var html="";
         var scheduleName="",
             startDate="",
             endDate="",
             scheduleContext="",
             allDateEvent="",
             isRepeat="",
             isRemind="";
         var id='';
        
         //点击编辑
		 $(".prog_xm").on("click",".bj-log",function(){
		 	$(".new_pro_window .new_pro_main .save1").hide();
		 	$(".new_pro_window .new_pro_main .save2").show();
             $('.new_pro_window').show();
             $('.mask').show();
              id=$(this).parent().attr("name");
             $.ajax({
                 type: 'POST',
                 url:'/beta/schedule/findSchedule.do',
                 data: {"userId":userId,"scheduleId":id},
                 async:  true,
                 success: function(data) {
                     if(data.code=="0000"){
//                       console.log(data);
                         $("#log-title").val(data.result.scheduleName);
							 $(".start-time").val(data.result.startDate);
                         	$(".end-time").val(data.result.endDate);
							 $("#log-content").val(data.result.scheduleContext);
                             $(".yes_no").attr("name",data.result.allDateEvent);
                                 $("#sel_node_selId_cf_hidden").val(data.result.isRepeat);
                                 $("#sel_node_selId_tx_hidden").val(data.result.isRemind);
								 if(data.result.allDateEvent==0){
                                     $(".yes_no").attr("src","../saasBeta/images/Image/Index/no.png").removeClass("ok")
								 }else{
                                     $(".yes_no").attr("src","../saasBeta/images/Image/Index/ok.png").addClass("ok")
								 }
								 if(data.result.isRepeat==2){
                                     $(".cf_select .sel_input_style").val("不重复");
								 }else {
                                     $(".cf_select .sel_input_style").val("重复");
								 }
								 if(data.result.isRemind==2){
                                     $(".tx_select .sel_input_style").val("不提醒");
								 }else{
                                     $(".tx_select .sel_input_style").val("提醒");
								 }
                     }
                 }
             });
		 });
         //新建日程
//       $('.right_middle .prog_manage input').on('click',function(){
         $('.new_pro,span.richeng').on('click',function(){
             $('.new_pro_window').show();
             $(".new_pro_window .new_pro_main .save2").hide();
             $(".new_pro_window .new_pro_main .save1").show();
             $('.mask').show();
             $(".yes_no").attr({"name":"0","src":"../saasBeta/images/Image/Index/no.png"}).removeClass("ok");
             $(".cf_select .sel_input_style").val("重复");
             $(".tx_select .sel_input_style").val("提醒");
             $("#sel_node_selId_cf_hidden").val("1");
             $("#sel_node_selId_tx_hidden").val("1");   
             //清空详情
             $("#log-content").val("");
         });
         //点取消按钮
         $('.new_pro_window .new_pro_main .cancel').on('click',function(){
             //不添加日程: 直接关闭 并清空 其中内容
             $('.new_pro_window').hide();
             $('.mask').hide();
         });
         //新建时点保存按钮
         $('.new_pro_window .new_pro_main .save1').on('click',function(){
             //添加日程: 发送ajax 关闭并清空内容
    		 scheduleName=$("#log-title").val(),
             startDate=$(".start-time").val(),
        	 endDate=$(".end-time").val(),
             scheduleContext=$("#log-content").val(),
             allDateEvent=$(".yes_no").attr("name"),
             isRepeat=$("#sel_node_selId_cf_hidden").val(),
             isRemind=$("#sel_node_selId_tx_hidden").val();
			 //console.log(allDateEvent);
              
             if(scheduleName.trim()=="")
             {
                var txt=  "请输入标题！";
               var option = {
                title: "提示",
                btn: parseInt("0001",2)
               }
               window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
                return;
             }
             if(startDate.trim()=="" || endDate.trim()=="")
             {
                var txt=  "请选择日程起始时间！";
               var option = {
                title: "提示",
                btn: parseInt("0001",2)
               }
               window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
                return;
             }
             var d1 = new Date(startDate.replace(/\-/g, "\/"));    
             var d2 = new Date(endDate.replace(/\-/g, "\/"));    
                
             if(startDate!=""&&endDate!=""&&d1 >=d2)    
             {    
                  var txt=  "开始时间不能大于结束时间！";
               var option = {
                title: "提示",
                btn: parseInt("0001",2)
               }
               window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
                  return false;    
             }
             $.ajax({
                 type: 'POST',
                 url:'/beta/schedule/insertSchedule.do',
                 async:  true,
                 data: {"userId":userId,"scheduleName":scheduleName,"startDate":startDate,"endDate":endDate,"scheduleContext":scheduleContext,"allDateEvent":allDateEvent,"isRepeat":isRepeat,"isRemind":isRemind},
                 success: function(data) {
	 				$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"新增日程信息《"+scheduleName+"》"},true,function(data){});
                	 if(data.code=="0000"){    
     					/*if(data.result.length==0){
     						$(".prog_xm .no-data").removeClass("hide");
     					}else{
     						$(".prog_xm .no-data").addClass("hide");
     						html+='<ul class="clear" id='+data.result.id+'><li>'+data.result.startDate+'</li><li>'+data.result.scheduleName+'</li><li name="'+data.result.id+'" class="icon-box"><i class="pk bj-log"></i><i class="del"></i></li></ul>'    						
     					}*/ 
                		BS.MyCollect.RiChengCalendar();
     				}else{
     		 			errorAlert(data.retCode,data.retMsg);
     		 		}
     				//$("#RiChengList").append(html);
     				if($("#RiChengList").html()==""){
     					$("#RiChengList").next().removeClass('hide');
     				}
                 }

             });
            // history.go(0)
             //刷新右侧日程列表

             $('.new_pro_window').hide();
             $('.mask').hide();
             $('.new_pro_window .new_pro_main table input').val('');
         });
         //修改时点击保存按钮
		$(".new_pro_window .new_pro_main .save2").on("click",function(){
            scheduleName=$("#log-title").val(),
            startDate=$(".start-time").val(),
       	 	endDate=$(".end-time").val(),

            scheduleContext=$("#log-content").val(),
            allDateEvent=$(".yes_no").attr("name"),
            isRepeat=$("#sel_node_selId_cf_hidden").val(),
            isRemind=$("#sel_node_selId_tx_hidden").val();     
              if(scheduleName.trim()=="")
             {
                var txt=  "请输入标题！";
               var option = {
                title: "提示",
                btn: parseInt("0001",2)
               }
               window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
                return;
             }
             if(startDate.trim()=="" || endDate.trim()=="")
             {
                var txt=  "请选择日程起始时间！";
               var option = {
                title: "提示",
                btn: parseInt("0001",2)
               }
               window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
                return;
             }
             var d1 = new Date(startDate.replace(/\-/g, "\/"));    
             var d2 = new Date(endDate.replace(/\-/g, "\/"));    
                
             if(startDate!=""&&endDate!=""&&d1 >=d2)    
             {    
                  var txt=  "开始时间不能大于结束时间！";
               var option = {
                title: "提示",
                btn: parseInt("0001",2)
               }
               window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
                  return false;    
             }      
            $.ajax({
                type: 'POST',
                url:'/beta/schedule/editScheduleInfo.do',
                async:  true,
                data: {"userId":userId,"scheduleName":scheduleName,"scheduleId":id,"startDate":startDate,"endDate":endDate,"scheduleContext":scheduleContext,"allDateEvent":allDateEvent,"isRepeat":isRepeat,"isRemind":isRemind},
                success: function(data) {
 					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"修改日程信息《"+scheduleName+"》"},true,function(data){});
                	if(data.code=="0000"){    
     					/*if(data.result.length==0){
     						$(".prog_xm .no-data").removeClass("hide");
     					}else{
     						$(".prog_xm .no-data").addClass("hide");
     						html+='<ul class="clear" id='+data.result.id+'><li>'+data.result.startDate+'</li><li>'+data.result.scheduleName+'</li><li name="'+data.result.id+'" class="icon-box"><i class="pk bj-log"></i><i class="del"></i></li></ul>'    						
     						$("#"+data.result.id).hide();
     					}*/
                		BS.MyCollect.RiChengCalendar();
     				}else{
     		 			errorAlert(data.retCode,data.retMsg);
     		 		}
     				//$("#RiChengList").html(html);
     				if($("#RiChengList").html()==""){
     					$("#RiChengList").next().removeClass('hide');
     				}
                }
            });
            //刷新右侧日程列表
            //history.go(0);
            $('.new_pro_window').hide();
            $('.mask').hide();
            $('.new_pro_window .new_pro_main table input').val('');
		});
		//点击删除
         $(".prog_xm").on("click",".del",function(){
         	
             id=$(this).parent().attr("name");
             scheduleName=$(this).parent().prev().html();
             var txt=  "确认删除该日程信息吗？";
         	 var option = {
         		 title: "警告",
         		 btn: parseInt("0011",2),
         		 onOk: function(){
		             $.ajax({
		                 type: 'POST',
		                 url:'/beta/schedule/editScheduleInfo.do',
		                 data: {"userId":userId,"scheduleId":id,"scheduleName":scheduleName,"isDelete":1},
		                 success: function(data) {
		 					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"删除日程《"+scheduleName+"》"},true,function(data){});
		                     if(data.code=="0000"){
		                         $("#"+id).remove();
		                         var length=$("#RiChengList ul.clear").length;
		                         if(length==0){
		                         	$(".prog_xm .no-data").removeClass("hide");
		                         }
							 }
		                 }
		             });
         		 }
         	 }
         	window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum. confirm, option);	
         });
         //新建日程中日历插件
          laydate.render({
              elem: '.start-time',
              type: 'datetime',
              position:'fixed',
              min: -7
          });
          laydate.render({
              elem: '.end-time',
              type: 'datetime' ,
              position:'fixed',
              min: 0,
              max: 30
          });
 
	 },
	 //日程管理列表
	 RiChengCalendar:function(){
			// 对Date的扩展，将 Date 转化为指定格式的String
			// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
			// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
			// 例子： 
			// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
			// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
			Date.prototype.Format = function (fmt) { //author: meizz 
			    var o = {
			        "M+": this.getMonth() + 1, //月份 
			        "d+": this.getDate(), //日 
			        "h+": this.getHours(), //小时 
			        "m+": this.getMinutes(), //分 
			        "s+": this.getSeconds(), //秒 
			        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			        "S": this.getMilliseconds() //毫秒 
			    };
			    if (/(y+)/.test(fmt)) {
			        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			    }
			    for (var k in o)
			        if (new RegExp("(" + k + ")").test(fmt)) 
			            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			    return fmt;
			    
			}
		  var obj=this;
	 	  var currentDate = new Date().Format("yyyy-MM-dd");
	 	  var userId=localStorage.getItem("userId");
	 	
          //var currentDate= date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
          //初始化列表
          getRiChengList(currentDate);	 	  
          function getRiChengList(currentDate){
			$.PostJsonData("/beta/schedule/getSchedule.do",{"userId":userId,"currentDate":currentDate},false,function(data){
       			dateReg = '';
     			var html="";
				if(data.code=="0000"){    
					if(data.result.length==0){
						$(".prog_xm .no-data").removeClass("hide");
					}else{
						$(".prog_xm .no-data").addClass("hide");
						$.each(data.result.schedule, function (i, item) {											
                        		html+='<ul class="clear" id='+item.id+'><li>'+item.startDate+'</li><li>'+item.scheduleName+'</li><li name="'+item.id+'" class="icon-box"><i class="pk bj-log"></i><i class="del"></i></li></ul>'
		           		});
					}
													   
				}else{
		 			errorAlert(data.retCode,data.retMsg);
		 		}
				$("#RiChengList").html(html);
				if($("#RiChengList").html()==""){
					$("#RiChengList").next().removeClass('hide');
				}
				if(data.result.dateReg!='' && typeof(data.result.dateReg)!="undefined"){
					dateReg = "{"+data.result.dateReg+"}";
				}
     	    });
		}
       
	      if(dateReg!='' && typeof(dateReg)!="undefined"){
	    	  	dateReg = JSON.parse(dateReg);
	      }     
     //console.log(dateReg)
      laydate.render({
		    elem: '#choice-date',
		    showBottom:false,
		    istoday: true,
		    value: currentDate,
		    format: 'yyyy-MM-dd',
		    trigger: 'click',
		    zIndex:"999",
		    mark: dateReg,
		    done: function(value, data,endDate){
		    	dateReg="";
		    	//console.log(dateReg)
		  		//选择日期回调
		  		getRiChengList(value);
		    }
		}); 
	 }
	 

}
$(function(){
    $("#dropOut").on("click", function() {
        exitLogin();
    });
   	BS.MyCollect.PageInit();
   	//初始化调用做市指数k线图
   	ajxrequestdata("899002","KLine-index",true);
   	$(".tanc_public i.chahao").on("click",function(){
// 		$(".stock_massage ul li i.pk").removeClass("active");
// 		$("#duibi_zb-ul").html("");
// 		$("#duibi_zb-xg").html("");
   	});
   	// 勾选全天事件时间置灰
         $(".yes_no").click(function(){
             if($(this).hasClass("ok")){
                 $(this).removeClass("ok");
                 $(this).attr("name","0");
                 $(this).attr("src","../saasBeta/images/Image/Index/no.png");
                 $(".start-time").val("");
                 $(".end-time").val("");
                 $(".start_data").css("color","#333333");
                 $(".end_data").css("color","#333333");
                 $(".ipt_data").removeAttr("disabled");                
                 BS.MyCollect.CfSelect(1);
                 BS.MyCollect.TxSelect(1);
             }else{
//          		 $(".start-time").val("");
//               $(".end-time").val("");
                 $(this).addClass("ok");
                 $(this).attr("name","1");
                 $(this).attr("src","../saasBeta/images/Image/Index/ok.png");
                 $(".start-time").val(new Date().Format("yyyy-MM-dd")+" 00:00:00");
                 $(".end-time").val(new Date().Format("yyyy-MM-dd")+" 23:59:59");
                 $(".start_data").css("color","#a59e9e");
                 $(".end_data").css("color","#a59e9e");
                 $(".ipt_data").attr("disabled","disabled");
                 //默认显示“不重复”、“不提醒”
                 BS.MyCollect.CfSelect(0);
                 BS.MyCollect.TxSelect(0);
                 
             }
         });

//	//创建模型
//	$('.my_mx a').on('click',function(){
//		$('.new_mode_window').show()
//		$('.mask').show();
//	})
//	$('.new_mode_window .new_mode_title i').on('click',function(){
//		$('.new_mode_window').hide()
//		$('.mask').hide();
//		$('.new_mode_window .new_mode_body input').val('');
//	})
	
	
	//c创建日历
//	$('.open_calendar').on('click',function(){
//		$('.new_data_window').toggle();
//	});
    // var mySchedule1 = new Schedule({
     //    el: '#schedule-box1',
     //    //date: '2018-9-20',
     //    clickCb: function (y, m, d) {
     //        document.querySelector('.start-time').value = y + '-' + m + '-' + d;
     //        $("#schedule-box1").attr("style","display:none")
     //    }
    // });
    // var mySchedule2 = new Schedule({
     //    el: '#schedule-box2',
     //    //date: '2018-9-20',
     //    clickCb: function (y, m, d) {
     //        document.querySelector('.end-time').value = y + '-' + m + '-' + d;
     //        $("#schedule-box2").attr("style","display:none");
     //    }
    // });
    // $(".ipt_data").on("focus",function(){
     //    $(this).addClass("open").siblings().attr("style","display:block");
     //    $(this).parent().siblings(".data").children(".boxshaw").attr("style","display:none")
    // });
    // $(".ipt_data").on("click",function(){
     //    if($(this).hasClass("open")){
     //        $(this).removeClass("open").siblings().attr("style","display:block");
    //
     //    }else{
     //        $(this).addClass("open").siblings().attr("style","display:none");
     //    }
    // });
	
	//左上六个链接
// 	$('.lt_li1').on('click',function(){
// 		window.location.href = '../researches/researches.html'
// 	})
// 	$('.lt_li2').on('click',function(){
// 		window.location.href = '../news/news.html'
// 	})
// 	$('.lt_li3').on('click',function(){
// //		window.location.href = '#'
// 	})
// 	$('.lt_li4').on('click',function(){
// 		window.location.href = '../companyNotice/companyNotice.html'
// 	})
// 	$('.lt_li5').on('click',function(){
// //		window.location.href = '#'
// 	})
// 	$('.lt_li6').on('click',function(){
// 		window.location.href = '../myResearch/researchChart.html'
// 	})
	

	
	//行业弹框
	
     console.log("LoginTimes:"+LoginTimes);
	 if(LoginTimes==1){
	 	window.alert.hyConfirm(window.alert.hyConfirm.typeEnum.info);
        LoginTimes = LoginTimes+1;
        localStorage.setItem("login_times", LoginTimes)
        console.log("LoginTimes:"+LoginTimes);
	 	// 引导页注释 
	var coverGuide = function(cover, target) {  
	    var body = document.body, doc = document.documentElement;  
	    if (cover && target) {  
	        // target size(width/height)  
	        var targetWidth = target.clientWidth,  
	            targetHeight = target.clientHeight;  
	        // page size  
	        var pageWidth = doc.scrollWidth,  
	            pageHeight = doc.scrollHeight;  
	        // offset of target      
	        var offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop),  
	            offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft);  
	        // set size and border-width  
	        cover.style.width = targetWidth + 'px';  
	        cover.style.height = targetHeight + 'px';      
	        cover.style.borderWidth =   
	            offsetTop + 'px ' +   
	            (pageWidth - targetWidth - offsetLeft) + 'px ' +  
	            (pageHeight - targetHeight - offsetTop) + 'px ' +   
	            offsetLeft + 'px'; 

			// resize  
	        if (!cover.isResizeBind) {  
	            if (window.addEventListener) {  
	                window.addEventListener('resize', function() {  
	                    coverGuide(cover, target);  
	                });      
	                cover.isResizeBind = true;  
	            } else if (window.attachEvent) {  
	                window.attachEvent('onresize', function() {  
	                    coverGuide(cover, target);  
	                });  
	                cover.isResizeBind = true;  
	                  
	                // IE7, IE8 box-shadow hack  
	                cover.innerHTML = '<img src="guide-shadow.png">';  
	            }  
	        }  
	    }  
	};  
	  
	var elCover = document.getElementById('cover');  
	// var left     = document.getElementById("left");  
	// var p       = document.getElementById("p_a");  
	// var header       = document.getElementsByClassName("header")[0];  
	var header       =document.getElementById('head');  
	// var guide      = document.getElementsByClassName("guide");  

	var guide     = document.getElementsByClassName("guide_btn");  

	console.log(guide.length)
	var arrElTarget = [header,header,
	    document.getElementById('left'),   
	    document.getElementById('middle'),
	    document.getElementById('right')
	], index = 0;  
	 cover.style.display = 'block'; 
	 $(".guide_nav").css("display","block");
	coverGuide(elCover,header); 
	// $(".click").click(function(){ 
		
		// $(".guide_nav").css("display","block");

		for(var i=0;i<guide.length;i++){
		    guide[i].onclick = function() {  
		    $(this).parent(".guidei").hide().next().show();
		    index++;        
		    if (!arrElTarget[index]) {  
		        $("#cover").hide();
		        $(".mask").hide();

		        // index = 0;      
		    }  
		    coverGuide(elCover, arrElTarget[index]);  
		    };
		}
	// })
	 }         

	

	
	
	//研报资讯切换及判断点击更多跳转链接
	



	$(".newshead a").click(function(){		
		var span=$(".newshead").children("span:first-child");
		console.log(span);
		if(span.hasClass("on")){
			$(".newshead a").attr("href","reportList/reportList.html")
		}else{
			$(".newshead a").attr("href","news/news.html")
		}

	})

	//新三板A股切换
//	$(".databoard .switch").click(function(){
//		var index=$(this).index();
//		$(this).css("color","#1e7bcd").siblings(".switch").css("color","#555555");
//		$(".sampan").eq(index-1).css("display","block").siblings(".sampan").css("display","none")
//	})
	//k图切换
//	$(".k_map span").click(function(){
//		$(this).addClass("sp_on").siblings("span").removeClass("sp_on");
//		var index=$(this).index();
//		// alert(index)
//		$(this).parent(".k_map").next(".map").html(index)
//		
//	})
	   // 轮播
function Slide() {
    var v=$(".picScroll-left .bd").width();
    var width=$(window).width();
   if(width>=1440) {
       $(".picList li").css("width", Math.round(v / 4));
       // console.log($(".hd ul").last());
       $(".hd ul").last().css("margin-right", "0");

       jQuery(".picScroll-left").slide({
           titCell: ".hd ul",
           mainCell: ".bd ul",
           autoPage: true,
           effect: "left",
           autoPlay: false,
           vis: 4,
           trigger: "click",
           scroll:4
       });
   }else if(width<1440){
       $(".picList li").css("width", Math.round(v / 3));
       $(".hd ul").last().css("margin-right", "0");

       jQuery(".picScroll-left").slide({
           titCell: ".hd ul",
           mainCell: ".bd ul",
           autoPage: true,
           effect: "left",
           autoPlay:false,
           vis: 3,
           trigger: "click",
           scroll:3
       });
   }
    var width=$(".picScroll-left").width();
    var len=$(".hdA ul>li").length;
    var len2=$(".hdSB ul>li").length;
   // console.log(len);
    var width1=16*len;
    var width3=16*len2;
    width2=width-width1+7;
    width4=width-width3+7;
    $(".hdA").css("padding-left",width2/2);
    $(".hdSB").css("padding-left",width4/2)
}
Slide();

})