$(function(){
	
	$(".selectBox ul li").click(function(){
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
	})
	
	//点击的之后换背景图片
$("#informationList li").on("click",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
	$(this).find("p").addClass("list_bgc").parent().siblings().find("p").removeClass("list_bgc");
})

//每月市场概览历史记录
fingMonthListChart(0,"挂牌家数");

//每日市场概览历史记录分页
fingMonthListHistory();

$('#indicatorName li').on('click',function(){
	var type = $(this).children().attr("data-value");
	var text = $(this).children().text();
	fingMonthListChart(type,text)
});

})


//每日市场概览历史记录图表
function fingMonthListChart(type,name){
	
	$.axs("/betaStock/marketOverView/fingMonthListChart.do",{type:type},true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			} 
			var datas=[];
			if(type==4){
				$(result.num).each(function(index,item){
					datas[datas.length]=(item/100000000).toFixed(2);
				})
				fieldRankChart(result.date,datas,name);
//				console.log(datas);
			}else if(type==5){
				$(result.num).each(function(index,item){
					datas[datas.length]=((item == null || item == "") ? "0" : item.toFixed(2));
				})
				fieldRankChart(result.date,datas,name);
			}else{
				//console.log(result.num)
				fieldRankChart(result.date,result.num,name);
			}
			
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//每月市场概览历史记录
function fingMonthListHistory(){
	var pageNum=$("#monthListHistory").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#monthListHistory").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=50;
	}
	var param = {pageNum:pageNum,pageLimit:pageSize};
	$.axs("/betaStock/marketOverView/fingMonthListHistory.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var totalCountResult=result.totalCount;
			if(result==null){
				return false;
			}
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					html+='<tr>';
					html+='<td>'+temp.listingTime+'</td>';
					html+='<td class="shuzi">'+(temp.agreementNum+temp.marketMaker)+'</td>';
					html+='<td class="shuzi">'+temp.agreementNum+'</td>';
					html+='<td class="shuzi">'+temp.marketMaker+'</td>';
					html+='<td class="shuzi">'+(temp.newMarketMaker+temp.newAgreementNum)+'</td>';
					html+='<td class="shuzi">'+((temp.generalCapitalZS+temp.generalCapitalXY)/100000000.00).toFixed(2)+'</td>';	
					if(temp.priceEarningRatio==null||temp.priceEarningRatio==""||temp.priceEarningRatio==undefined || temp.priceEarningRatio==0){
						html+='<td class="shuzi">--</td>';	
					}else{
						html+='<td class="shuzi">'+(temp.priceEarningRatio).toFixed(2)+'</td>';	
					}
					html+='</tr>';
				}
				$("#monthListHistory").html(html);
				$('#page').show();
				//分页
				$('#page').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						$("#monthListHistory").attr("data-pageNum",pageNumber);
						$("#monthListHistory").attr("data-pageSize",size);
						fingMonthListHistory();
					}
				});
				//修改分页文字
				setPageText2('page');
			}else{
				var html=getNoDataHtml(7);
				$("#monthListHistory").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}



//图表展示的配置
/**
 * @param xAixs  X轴-公司名称
 * @param name 
 * @param data  Y轴-公司对应的指标值
 * @param startValue 第一个显示的排名位置
 */
function fieldRankChart(date,data,name){
//	var datas=[];
//	if(data!=" " && data!=null && data!=undefined){
//		$(data).each(function(index,item){
//			datas[datas.length]=item.toFixed(2);
//		})
//	}

	
	 // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('monthlyEcharts'));
    var option = {
//      title: {
//          text: name,//"挂牌企业总数"
//          textStyle:{
//          	fontWeight:"normal",
//          	fontSize:16
//          },
//          textAlign:"left"
//      },
		legend:{
        	show:true,
        	data:[name],
        	textStyle:{
            	fontWeight:"normal",
            	fontSize:14
            }
        },
        grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
        backgroundColor:'#fff',
        toolbox: {
        feature: {
           
            saveAsImage: {
            	show: true,
					title:'保存图片',
	        icon:'image:///saasBeta/images/ave.png'
            }
        },
        top:0,
        right:'5%',
    },
        dataZoom: [{
            type: "slider",
            show: true
//          startValue: startValue - 2,
//          endValue: startValue + 2 + 8
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
//          data:xAixs,
            data: date//[2016-01,2016-02,2016-03,2016-04,2016-05,2016-06]
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'axis',
        	position:'top',
      	    formatter: function(params) {
//      	    	console.log(params)
//    	    		if(name=="总股本"){
//    	    			showvalue=(data[params.dataIndex]/100000000.00).toFixed(2);
//    	    		}

                var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl">'+name+'</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
                return divHtml;
	        }
        },
        series: [{
            name: name,
            type: 'bar',
            barWidth:'30',
            data: data,//[9000,9200,9108,9800,9600,9500],
			label:{
				normal:{
					show:true,
					position:'top',
					formatter: function(params) {
						var showvalue=data[params.dataIndex];
//	      	    		if(name=="总股本"){
//	      	    			showvalue=(data[params.dataIndex]/100000000.00).toFixed(2);
//	      	    		}
	      	    		return (showvalue == 0 ? "" : showvalue);
                    }
				}
			},
            itemStyle: {
                normal: {
                    color: function(params) {
                    	  // 检索结果颜色
//                      if(params.dataIndex == itemIndex) {
//                          return "#00C1EF";
//                      } else {
//                          return "#D53A35";
//                      }
                      	return "#62a6f2";
                    }
                },
                emphasis:{
                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}
