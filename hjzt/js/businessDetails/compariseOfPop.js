//财务详情
//财务详情---财务数据
var stockCodeValue=getUrlParam("stockCode");
var paramData={stockCode:stockCodeValue};
$(function(){
	console.log(stockCodeValue);
	//初始化页面数据
	findAssetDebt();
	findChartData();
	findProfitability();
	//tab切换
	$(".content_list").find("a").on("click",function(){
		$(this).addClass("bgc").siblings().removeClass();
		var index=$(this).index();
		if(index==0){
			findAssetDebt();
		}else if(index==1){
			findBenefit();
		}else if(index==2){
			findCashFlow();
		}
	});
	//导出按钮
	$(".datasheet").on("click",function(){
		var index=$(".content_list").find("a.bgc").index();
		$.axs("/betaStock/financial/checkExport.do",paramData,true,function(data){
			if(data.retCode=="0000"){
				if(index==0){
					window.location.href="/stock/financial/exportAssetDebt.do?stockCode="+stockCodeValue
				}else if(index==1){
					window.location.href="/stock/financial/exportBenefit.do?stockCode="+stockCodeValue
				}else if(index==2){
					window.location.href="/stock/financial/exportCashFlow.do?stockCode="+stockCodeValue
				}
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
			
		});
	});
	//单击每一列
	$("#financialInfo").delegate("li","click",function(){
		var liIndex=$(this).index();
		//判断单机的是否是第一行标题
		if(liIndex==0){
			return false;
		}
		var title="";
		var chartValueData=new Array();
		var chartDateData=new Array();
		var ulLength=$("#financialInfo").find("ul").length;
		$("#financialInfo").find("ul").each(function(ulIndex){
		   var date=$(this).find("li").eq(0).text();
		   var value=$(this).find("li").eq(liIndex).text();
		   //每一列添加样式
		   $(this).find("li").eq(liIndex).addClass("datasheet_bgc").siblings().removeClass("datasheet_bgc");
		   if(ulIndex==0){
			   title=value;
		   }else{
			   chartValueData.push(value);
			   chartDateData.push(date);
		   }
		});
		//调用画图方法
		var data={"no":chartValueData,"name":chartDateData,"title":title};
		compariseOfPop(data);
	});
});

/**
 * 资产负债数据
 */
function findAssetDebt(){
	$("#financialInfo").html('');
	$.axs("/betaStock/financial/findAssetDebt.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var html=findAssetDebtTitle();
			for(var i=0;i<result.length;i++){
				if(i>=5){
					break;
				}
				var assetDebt=result[i];
				html+=findAssetDebtData(assetDebt);
			}
			$("#financialInfo").html(html);
			$("#financialInfo").find("li").eq(1).click();
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
 * 利润数据
 */
function findBenefit(){
	$("#financialInfo").html('');
	$.axs("/betaStock/financial/findBenefit.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var html=findBenefitTitle();
			for(var i=0;i<result.length;i++){
				if(i>=5){
					break;
				}
				var benefit=result[i];
				html+=findBenefitData(benefit);
			}
			$("#financialInfo").html(html);
			$("#financialInfo").find("li").eq(1).click();
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
 * 现金流量数据
 */
function findCashFlow(){
	$("#financialInfo").html('');
	$.axs("/betaStock/financial/findCashFlow.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var html=findCashFlowTitle();
			for(var i=0;i<result.length;i++){
				if(i>=5){
					break;
				}
				var cashFlow=result[i];
				html+=findCashFlowData(cashFlow);
			}
			$("#financialInfo").html(html);
			$("#financialInfo").find("li").eq(1).click();
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
 * 生成图标
 * @param data data.name=date  data.no=value  data.title=name
 */
function compariseOfPop(data) {
    var myChart = echarts.init(document.getElementById("datasheet_main"));
    // 图表的其他样式
    var option = {
        title: {
            text: data.title,
            textStyle: {
                color: "#ccc",
                fontFamily: "宋体",
                fontSize: 18
            },
            x: "center",
        },
        calculable: true,
        grid: {
            containLabel: true
        },
        tooltip: {
            trigger: "item",
        },
        xAxis: [
            {
                type: 'category',
                data: data.name,
                splitNumber: 6,
                splitLine: {
                    show: true
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "单位：万元",
                position:"right",
                axisLabel: {
                    formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                            ? echarts.format.addCommas(+a / 1000)
                            : '';
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "black"
                    }
                },

                axisLabel: {},
                // position:"right",
                data: [{
                    textStyle: {
                        color: "#666",
                        fontWeight: "block",
                        fontSize: 12,
                        align: "middle"
                    }
                }],
            }
        ],
        series: [
            {
                type: "bar",
                barWidth: "25%",
                itemStyle: {
                    normal: {
                        color: "rgba(170,204,227,1)",
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: "top",
                        formatter: function(data) {
                            return data.no;
                        }
                    }
                },
                data: data.no
            }
        ]
    }
    myChart.setOption(option);
}

/**
 * 资产负载字段
 */
function findAssetDebtTitle(){
	var assetDebtTitle='<ul class="title">';
		assetDebtTitle+='<li>科目(万元)/年度</li>';
		assetDebtTitle+='<li title="货币资金">货币资金</li>';
		assetDebtTitle+='<li title="应收票据">应收票据</li>';
		assetDebtTitle+='<li title="应收账款">应收账款</li>';
		assetDebtTitle+='<li title="预付账款">预付账款</li>';
		assetDebtTitle+='<li title="其他应收款">其他应收款</li>';
		assetDebtTitle+='<li title="存货">存货</li>';
		assetDebtTitle+='<li title="其他流动资产">其他流动资产</li>';
		assetDebtTitle+='<li title="流动资产合计">流动资产合计</li>';
		assetDebtTitle+='<li title="可供出售金融资产">可供出售金融资产</li>';
		assetDebtTitle+='<li title="长期股权投资">长期股权投资</li>';
		assetDebtTitle+='<li title="固定资产">固定资产</li>';
		assetDebtTitle+='<li title="在建工程">在建工程</li>';
		assetDebtTitle+='<li title="无形资产">无形资产</li>';
		assetDebtTitle+='<li title="商誉">商誉</li>';
		assetDebtTitle+='<li title="长期待摊费用">长期待摊费用</li>';
		assetDebtTitle+='<li title="递延所得税资产">递延所得税资产</li>';
		assetDebtTitle+='<li title="非流动资产合计">非流动资产合计</li>';
		assetDebtTitle+='<li title="资产总计">资产总计</li>';
		assetDebtTitle+='<li title="应付账款">应付账款</li>';
		assetDebtTitle+='<li title="预收账款">预收账款</li>';
		assetDebtTitle+='<li title="应交税费">应交税费</li>';
		assetDebtTitle+='<li title="其他应付款">其他应付款</li>';
		assetDebtTitle+='<li title="其他流动负债">其他流动负债</li>';
		assetDebtTitle+='<li title="流动负债合计">流动负债合计</li>';
		assetDebtTitle+='<li title="负债合计">负债合计</li>';
		assetDebtTitle+='<li title="股本(万股)">股本(万股)</li>';
		assetDebtTitle+='<li title="资本公积金">资本公积金</li>';
		assetDebtTitle+='<li title="盈余公积金">盈余公积金</li>';
		assetDebtTitle+='<li title="未分配利润">未分配利润</li>';
		assetDebtTitle+='<li title="归属于母公司股东权益合计">归属于母公司股东权益合计</li>';
		assetDebtTitle+='<li title="少数股东权益">少数股东权益</li>';
		assetDebtTitle+='<li title="股东权益合计">股东权益合计</li>';
		assetDebtTitle+='<li title="负债和股东权益总计">负债和股东权益总计</li>';
		assetDebtTitle+='</ul>';
	return assetDebtTitle;
}
/**
 * 资产负载数据
 */
function findAssetDebtData(assetDebt){
	var assetDebtData='<ul>';
		assetDebtData+='<li>'+assetDebt.dateTime+'</li>';
		assetDebtData+='<li>'+(assetDebt["3399"]==null?"":assetDebt["3399"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3401"]==null?"":assetDebt["3401"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3402"]==null?"":assetDebt["3402"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3403"]==null?"":assetDebt["3403"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3404"]==null?"":assetDebt["3404"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3405"]==null?"":assetDebt["3405"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3406"]==null?"":assetDebt["3406"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3407"]==null?"":assetDebt["3407"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3446"]==null?"":assetDebt["3446"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3408"]==null?"":assetDebt["3408"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3410"]==null?"":assetDebt["3410"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3411"]==null?"":assetDebt["3411"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3412"]==null?"":assetDebt["3412"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3413"]==null?"":assetDebt["3413"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3414"]==null?"":assetDebt["3414"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3415"]==null?"":assetDebt["3415"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3416"]==null?"":assetDebt["3416"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3417"]==null?"":assetDebt["3417"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3420"]==null?"":assetDebt["3420"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3421"]==null?"":assetDebt["3421"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3422"]==null?"":assetDebt["3422"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3424"]==null?"":assetDebt["3424"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3425"]==null?"":assetDebt["3425"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3426"]==null?"":assetDebt["3426"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3477"]==null?"":assetDebt["3477"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3433"]==null?"":assetDebt["3433"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3434"]==null?"":assetDebt["3434"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3435"]==null?"":assetDebt["3435"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3436"]==null?"":assetDebt["3436"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3437"]==null?"":assetDebt["3437"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3438"]==null?"":assetDebt["3438"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3478"]==null?"":assetDebt["3478"])+'</li>';
		assetDebtData+='<li>'+(assetDebt["3439"]==null?"":assetDebt["3439"])+'</li>';
		assetDebtData+='</ul>';
	return assetDebtData;
}

/**
 * 利润-字段
 */
function findBenefitTitle(){
	var benefitTitle='<ul class="title">';
		benefitTitle+='<li>科目(万元)/年度</li>';
		benefitTitle+='<li title="净利润">净利润</li>';
		benefitTitle+='<li title="扣非净利润">扣非净利润</li>';
		benefitTitle+='<li title="营业总收入">营业总收入</li>';
		benefitTitle+='<li title="营业收入">营业收入</li>';
		benefitTitle+='<li title="营业总成本">营业总成本</li>';
		benefitTitle+='<li title="营业成本">营业成本</li>';
		benefitTitle+='<li title="营业利润">营业利润</li>';
		benefitTitle+='<li title="投资收益">投资收益</li>';
		benefitTitle+='<li title="资产减值损失">资产减值损失</li>';
		benefitTitle+='<li title="管理费用">管理费用</li>';
		benefitTitle+='<li title="销售费用">销售费用</li>';
		benefitTitle+='<li title="财务费用">财务费用</li>';
		benefitTitle+='<li title="营业外收入">营业外收入</li>';
		benefitTitle+='<li title="营业外支出">营业外支出</li>';
		benefitTitle+='<li title="营业税金及附加">营业税金及附加</li>';
		benefitTitle+='<li title="利润总额">利润总额</li>';
		benefitTitle+='<li title="所得税">所得税</li>';
		benefitTitle+='<li title="综合收益总额">综合收益总额</li>';
		benefitTitle+='<li title="归属于母公司股东的综合收益总额">归属于母公司股东的综合收益总额</li>';
		benefitTitle+='<li title="归属于少数股东的综合收益总额">归属于少数股东的综合收益总额</li>';
		benefitTitle+='</ul>';
	return benefitTitle
}

/**
 * 利润数据
 */
function findBenefitData(benefit){
	var benefitData='<ul>';
		benefitData+='<li>'+benefit.dateTime+'</li>';
		benefitData+='<li>'+(benefit["3481"]==null?"":benefit["3481"])+'</li>';
		benefitData+='<li>'+(benefit["3482"]==null?"":benefit["3482"])+'</li>';
		benefitData+='<li>'+(benefit["3483"]==null?"":benefit["3483"])+'</li>';
		benefitData+='<li>'+(benefit["3484"]==null?"":benefit["3484"])+'</li>';
		benefitData+='<li>'+(benefit["3485"]==null?"":benefit["3485"])+'</li>';
		benefitData+='<li>'+(benefit["3486"]==null?"":benefit["3486"])+'</li>';
		benefitData+='<li>'+(benefit["3487"]==null?"":benefit["3487"])+'</li>';
		benefitData+='<li>'+(benefit["3488"]==null?"":benefit["3488"])+'</li>';
		benefitData+='<li>'+(benefit["3490"]==null?"":benefit["3490"])+'</li>';
		benefitData+='<li>'+(benefit["3491"]==null?"":benefit["3491"])+'</li>';
		benefitData+='<li>'+(benefit["3492"]==null?"":benefit["3492"])+'</li>';
		benefitData+='<li>'+(benefit["3493"]==null?"":benefit["3493"])+'</li>';
		benefitData+='<li>'+(benefit["3494"]==null?"":benefit["3494"])+'</li>';
		benefitData+='<li>'+(benefit["3495"]==null?"":benefit["3495"])+'</li>';
		benefitData+='<li>'+(benefit["3496"]==null?"":benefit["3496"])+'</li>';
		benefitData+='<li>'+(benefit["3497"]==null?"":benefit["3497"])+'</li>';
		benefitData+='<li>'+(benefit["3498"]==null?"":benefit["3498"])+'</li>';
		benefitData+='<li>'+(benefit["3500"]==null?"":benefit["3500"])+'</li>';
		benefitData+='<li>'+(benefit["3501"]==null?"":benefit["3501"])+'</li>';
		benefitData+='<li>'+(benefit["3502"]==null?"":benefit["3502"])+'</li>';
		benefitData+='</ul>';
	return benefitData;
}

/**
 * 现金流量-字段
 */
function findCashFlowTitle(){
	var cashFlowTitle='<ul>';
		cashFlowTitle+='<li>科目(万元)/年度</li>';
		cashFlowTitle+='<li title="销售商品、提供劳务收到的现金">销售商品、提供劳务收到的现金</li>';
		cashFlowTitle+='<li title="收到的税费与返还">收到的税费与返还</li>';
		cashFlowTitle+='<li title="支付的各项税费">支付的各项税费</li>';
		cashFlowTitle+='<li title="支付给职工以及为职工支付的现金">支付给职工以及为职工支付的现金</li>';
		cashFlowTitle+='<li title="经营现金流入">经营现金流入</li>';
		cashFlowTitle+='<li title="经营现金流出">经营现金流出</li>';
		cashFlowTitle+='<li title="经营现金流量净额">经营现金流量净额</li>';
		cashFlowTitle+='<li title="购建固定资产和其他支付的现金">购建固定资产和其他支付的现金</li>';
		cashFlowTitle+='<li title="投资支付的现金">投资支付的现金</li>';
		cashFlowTitle+='<li title="支付其他与投资的现金">支付其他与投资的现金</li>';
		cashFlowTitle+='<li title="投资现金流入">投资现金流入</li>';
		cashFlowTitle+='<li title="投资现金流出">投资现金流出</li>';
		cashFlowTitle+='<li title="投资现金流量净额">投资现金流量净额</li>';
		cashFlowTitle+='<li title="吸收投资收到现金">吸收投资收到现金</li>';
		cashFlowTitle+='<li title="其中子公司吸收现金">其中子公司吸收现金</li>';
		cashFlowTitle+='<li title="取得借款的现金">取得借款的现金</li>';
		cashFlowTitle+='<li title="收到其他与筹资的现金">收到其他与筹资的现金</li>';
		cashFlowTitle+='<li title="偿还债务支付现金">偿还债务支付现金</li>';
		cashFlowTitle+='<li title="分配股利、利润或偿付利息支付的现金">分配股利、利润或偿付利息支付的现金</li>';
		cashFlowTitle+='<li title="支付其他与筹资的现金">支付其他与筹资的现金</li>';
		cashFlowTitle+='<li title="筹资现金流入">筹资现金流入</li>';
		cashFlowTitle+='<li title="筹资现金流出">筹资现金流出</li>';
		cashFlowTitle+='<li title="筹资现金流量净额">筹资现金流量净额</li>';
		cashFlowTitle+='<li title="汇率变动对现金的影响">汇率变动对现金的影响</li>';
		cashFlowTitle+='<li title="现金及现金等价物净增加额">现金及现金等价物净增加额</li>';
		cashFlowTitle+='</ul>';
	return cashFlowTitle
}

/**
 * 现金流量数据
 */
function findCashFlowData(cashFlow){
	var cashFlowData='<ul>';
		cashFlowData+='<li>'+cashFlow.dateTime+'</li>';
		cashFlowData+='<li>'+(cashFlow["3517"]==null?"":cashFlow["3517"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3518"]==null?"":cashFlow["3518"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3519"]==null?"":cashFlow["3519"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3520"]==null?"":cashFlow["3520"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3521"]==null?"":cashFlow["3521"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3522"]==null?"":cashFlow["3522"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3523"]==null?"":cashFlow["3523"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3526"]==null?"":cashFlow["3526"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3527"]==null?"":cashFlow["3527"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3529"]==null?"":cashFlow["3529"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3530"]==null?"":cashFlow["3530"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3531"]==null?"":cashFlow["3531"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3532"]==null?"":cashFlow["3532"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3533"]==null?"":cashFlow["3533"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3534"]==null?"":cashFlow["3534"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3535"]==null?"":cashFlow["3535"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3536"]==null?"":cashFlow["3536"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3537"]==null?"":cashFlow["3537"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3538"]==null?"":cashFlow["3538"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3540"]==null?"":cashFlow["3540"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3541"]==null?"":cashFlow["3541"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3542"]==null?"":cashFlow["3542"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3543"]==null?"":cashFlow["3543"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3544"]==null?"":cashFlow["3544"])+'</li>';
		cashFlowData+='<li>'+(cashFlow["3545"]==null?"":cashFlow["3545"])+'</li>';
		cashFlowData+='</ul>';
	return cashFlowData
}


//财务详情---财务分析
function findChartData(){
	$.axs("/betaStock/financial/findChartData.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var dateArray=[];
			var xiaoshoumaolilv=[];
			var xiaoshoujinglilv=[];
			var zichanfuzhailv=[];
			var yingshouzhangkuanzhouzhuanlv=[];
			var cunhuozhouzhuanlv=[];
			var zongzichanzengzhanglv=[];
			var yingyeshouruzengzhanglv=[];
			var jinglirunzengzhanglv=[];
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				var strDate=obj.dateTime.split("-"); 
				var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
				var year=(s).Format("yyyy");
				dateArray.push(year);
				xiaoshoumaolilv.push(obj["3839"]);
				xiaoshoujinglilv.push(obj["3838"]);
				zichanfuzhailv.push(obj["3879"]);
				yingshouzhangkuanzhouzhuanlv.push(obj["3810"]);
				cunhuozhouzhuanlv.push(obj["3808"]);
				zongzichanzengzhanglv.push(obj["3921"]);
				yingyeshouruzengzhanglv.push(obj["3895"]);
				jinglirunzengzhanglv.push(obj["3922"]);
			}
//			console.log(dateArray);
//			console.log(xiaoshoumaolilv);
			myChart1(dateArray,xiaoshoumaolilv,xiaoshoujinglilv);
			myChart2(dateArray,zichanfuzhailv);
			myChart3(dateArray,yingshouzhangkuanzhouzhuanlv,cunhuozhouzhuanlv);
			myChart4(dateArray,zongzichanzengzhanglv,yingyeshouruzengzhanglv,jinglirunzengzhanglv);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
 * 公司盈利能力情况
 */
function myChart1(date,xiaoshoumaolilv,xiaoshoujinglilv){
	var myChart1 = echarts.init(document.getElementById("gsylnlqk01"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['毛利率','净利率'],
		        bottom:10
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '13%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		    series: [
		        {
		            name:'毛利率',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:xiaoshoumaolilv//第一种数据种类数据
		           
		        },
		         {
		            name:'净利率',//第一种数据种类名字
		            type:'line',
		             data:xiaoshoujinglilv//第一种数据种类数据
		           
		        }
		    ],
		     color:["#ed5a5c","#00a65a",]
		}
		;
	myChart1.setOption(option);
}
/**
 * 公司偿债能力情况
 */
function myChart2(date,zichanfuzhailv){
	var myChart2 = echarts.init(document.getElementById("gsylnlqk02"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['资产负债率'],
		       bottom:10
		    },
		    grid: {
		         left: '3%',
		        right: '4%',
		        bottom: '13%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		    series: [
		        {
		            name:'资产负债率',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:zichanfuzhailv//第一种数据种类数据
		           
		        }
		    ],
		     color:["#ed5a5c","#00a65a",]
		}
		;
	myChart2.setOption(option);
}
/**
 * 公司营运情况
 */
function myChart3(date,yingshouzhangkuanzhouzhuanlv,cunhuozhouzhuanlv){
	var myChart3 = echarts.init(document.getElementById("gsylnlqk03"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['应收账款周转','存货周转率'],
		        bottom:10
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '13%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		    series: [
		        {
		            name:'应收账款周转',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:yingshouzhangkuanzhouzhuanlv//第一种数据种类数据
		           
		        },
		         {
		            name:'存货周转率',//第一种数据种类名字
		            type:'line',
		             data:cunhuozhouzhuanlv//第一种数据种类数据
		           
		        }
		    ],
		     color:["#ed5a5c","#00a65a",]
		}
		;
	myChart3.setOption(option);
}
/**
 * 公司营运情况
 */
function myChart4(date,zongzichanzengzhanglv,yingyeshouruzengzhanglv,jinglirunzengzhanglv){
	var myChart4 = echarts.init(document.getElementById("gsylnlqk04"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['总资产增长率','营业收入增长率','净利润增长率'],
//		        orient: 'vertical',
        		bottom:0
		    },
		    grid: {
		         left: '3%',
		        right: '4%',
		        bottom: '15%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		    series: [
		        {
		            name:'总资产增长率',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:zongzichanzengzhanglv//第一种数据种类数据
		           
		        },
		         {
		            name:'营业收入增长率',//第一种数据种类名字
		            type:'line',
		             data:yingyeshouruzengzhanglv//第一种数据种类数据
		           
		        },
		        {
		            name:'净利润增长率',//第一种数据种类名字
		            type:'line',
		             data:jinglirunzengzhanglv//第一种数据种类数据
		           
		        }
		    ],
		     color:["#ed5a5c","#00a65a","#ff7f27"]
	};
	myChart4.setOption(option);
}
/**
 * 盈利能力
 */
function findProfitability(){
	$("#profitability").html("");
	$.axs("/betaStock/financial/findProfitability.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var div1=getProfitabilityHtml(result,0);
			$("#profitability").append(div1);
			var div2=getProfitabilityHtml(result,1);
			$("#profitability").append(div2);
			$("#profitability").append('<div class="clr"></div>');
		}
	});
}
/**
 * 盈利能力
 * @param result retData
 * @param num 开始位置
 */
function getProfitabilityHtml(result,num){
	var div=$("<div>");
	div.addClass("cw_d_table_box");
	//日期
	var strDate=result[num].dateTime.split("-"); 
	var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
	var year=(s).Format("yyyy");
	div.append("<span>"+year+"年度</span>");
	var title_tr=$("<tr>");
	var tr_1=$("<tr>");
	var tr_2=$("<tr>");
	var tr_3=$("<tr>");
	var tr_4=$("<tr>");
	var tr_5=$("<tr>");
	var tr_6=$("<tr>");
	var tr_7=$("<tr>");
	var tr_8=$("<tr>");
	var tr_9=$("<tr>");
	var tr_10=$("<tr>");
	var tr_11=$("<tr>");
	title_tr.append("<td>&nbsp;&nbsp;</td>");
	title_tr.append("<td>本期期末</td>");
	title_tr.append("<td>上期期末</td>");
	title_tr.append("<td>增减比例</td>");
	tr_1.append("<td>销售净利率</td>");
	tr_2.append("<td>销售毛利率</td>");
	tr_3.append("<td>资产净利率（总资产报酬率）</td>");
	tr_4.append("<td>净资产收益率（权益报酬率）</td>");
	tr_5.append("<td>净资产收益率（平均）</td>");
	tr_6.append("<td>主营业务毛利率</td>");
	tr_7.append("<td>主营业务成本率</td>");
	tr_8.append("<td>主营业务净利率</td>");
	tr_9.append("<td>营业费用率</td>");
	tr_10.append("<td>管理费用率</td>");
	tr_11.append("<td>财务费用率</td>");
	//3838-3848
	for (var i = num; i < num+2; i++) {
		var obj=result[i];
		tr_1.append("<td>"+obj["3838"].toFixed(2)+"</td>");
		tr_2.append("<td>"+obj["3839"].toFixed(2)+"</td>");
		tr_3.append("<td>"+obj["3840"].toFixed(2)+"</td>");
		tr_4.append("<td>"+obj["3841"].toFixed(2)+"</td>");
		tr_5.append("<td>"+obj["3842"].toFixed(2)+"</td>");
		tr_6.append("<td>"+obj["3843"].toFixed(2)+"</td>");
		tr_7.append("<td>"+obj["3844"].toFixed(2)+"</td>");
		tr_8.append("<td>"+obj["3845"].toFixed(2)+"</td>");
		tr_9.append("<td>"+obj["3846"].toFixed(2)+"</td>");
		tr_10.append("<td>"+obj["3847"].toFixed(2)+"</td>");
		tr_11.append("<td>"+obj["3848"].toFixed(2)+"</td>");
	}
	tr_1.append(getBilvHtml(tr_1));
	tr_2.append(getBilvHtml(tr_2));
	tr_3.append(getBilvHtml(tr_3));
	tr_4.append(getBilvHtml(tr_4));
	tr_5.append(getBilvHtml(tr_5));
	tr_6.append(getBilvHtml(tr_6));
	tr_7.append(getBilvHtml(tr_7));
	tr_8.append(getBilvHtml(tr_8));
	tr_9.append(getBilvHtml(tr_9));
	tr_10.append(getBilvHtml(tr_10));
	tr_11.append(getBilvHtml(tr_11));
	var table=$("<table>");
	table.append(title_tr);
	table.append(tr_1);
	table.append(tr_2);
	table.append(tr_3);
	table.append(tr_4);
	table.append(tr_5);
	table.append(tr_6);
	table.append(tr_7);
	table.append(tr_8);
	table.append(tr_9);
	table.append(tr_10);
	table.append(tr_11);
	div.append(table);
	return div;
}

/**
 * 偿债能力
 */
function findDebtPayingAbility(){
	$("#debtPayingAbility").html("");
	$.axs("/betaStock/financial/findDebtPayingAbility.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var div1=getDebtPayingHtml(result,0);
			$("#debtPayingAbility").append(div1);
			var div2=getDebtPayingHtml(result,1);
			$("#debtPayingAbility").append(div2);
			$("#debtPayingAbility").append('<div class="clr"></div>');
		}
	});
}
/**
 * 偿债能力
 * @param result retData
 * @param num 开始位置
 */
function getDebtPayingHtml(result,num){
	var div=$("<div>");
	div.addClass("cw_d_table_box");
	//日期
	var strDate=result[num].dateTime.split("-"); 
	var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
	var year=(s).Format("yyyy");
	div.append("<span>"+year+"年度</span>");
	var title_tr=$("<tr>");
	var tr_1=$("<tr>");
	var tr_2=$("<tr>");
//	var tr_3=$("<tr>");
	var tr_4=$("<tr>");
	var tr_5=$("<tr>");
	var tr_6=$("<tr>");
	title_tr.append("<td>&nbsp;&nbsp;</td>");
	title_tr.append("<td>本期期末</td>");
	title_tr.append("<td>上期期末</td>");
	title_tr.append("<td>增减比例</td>");
	tr_1.append("<td>流动比率</td>");
	tr_2.append("<td>速动比率</td>");
//	tr_3.append("<td>保守速动比率</td>");
	tr_4.append("<td>现金比率</td>");
	tr_5.append("<td>现金到期债务比</td>");
	tr_6.append("<td>现金流量利息保障倍数</td>");
	//3838-3848
	for (var i = num; i < num+2; i++) {
		var obj=result[i];
		tr_1.append("<td>"+obj["3802"].toFixed(2)+"</td>");
		tr_2.append("<td>"+obj["3803"].toFixed(2)+"</td>");
//		tr_3.append("<td>"+obj["3804"].toFixed(2)+"</td>");
		tr_4.append("<td>"+obj["3805"].toFixed(2)+"</td>");
		tr_5.append("<td>"+obj["3806"].toFixed(2)+"</td>");
		tr_6.append("<td>"+obj["3807"].toFixed(2)+"</td>");
	}
	tr_1.append(getBilvHtml(tr_1));
	tr_2.append(getBilvHtml(tr_2));
//	tr_3.append(getBilvHtml(tr_3));
	tr_4.append(getBilvHtml(tr_4));
	tr_5.append(getBilvHtml(tr_5));
	tr_6.append(getBilvHtml(tr_6));
	var table=$("<table>");
	table.append(title_tr);
	table.append(tr_1);
	table.append(tr_2);
//	table.append(tr_3);
	table.append(tr_4);
	table.append(tr_5);
	table.append(tr_6);
	div.append(table);
	return div;
}
/**
 * 运营情况
 */
function findOperationalAbility(){
	$("#operationalAbility").html("");
	$.axs("/betaStock/financial/findOperationalAbility.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var div1=getOperationalHtml(result,0);
			$("#operationalAbility").append(div1);
			var div2=getOperationalHtml(result,1);
			$("#operationalAbility").append(div2);
			$("#operationalAbility").append('<div class="clr"></div>');
		}
	});
}
/**
 * 运营情况
 * @param result retData
 * @param num 开始位置
 */
function getOperationalHtml(result,num){
	var div=$("<div>");
	div.addClass("cw_d_table_box");
	//日期
	var strDate=result[num].dateTime.split("-"); 
	var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
	var year=(s).Format("yyyy");
	div.append("<span>"+year+"年度</span>");
	var title_tr=$("<tr>");
	var tr_1=$("<tr>");
	var tr_2=$("<tr>");
	var tr_3=$("<tr>");
	var tr_4=$("<tr>");
	var tr_5=$("<tr>");
	var tr_6=$("<tr>");
	var tr_7=$("<tr>");
	var tr_8=$("<tr>");
	var tr_9=$("<tr>");
	var tr_10=$("<tr>");
	var tr_11=$("<tr>");
//	var tr_12=$("<tr>");
	var tr_13=$("<tr>");
	title_tr.append("<td>&nbsp;&nbsp;</td>");
	title_tr.append("<td>本期期末</td>");
	title_tr.append("<td>上期期末</td>");
	title_tr.append("<td>增减比例</td>");
	tr_1.append("<td>存货周转率</td>");
	tr_2.append("<td>存货周转天数</td>");
	tr_3.append("<td>应收账款周转率</td>");
	tr_4.append("<td>应收账款周转天数</td>");
	tr_5.append("<td>营业周期</td>");
	tr_6.append("<td>流动资产周转率</td>");
	tr_7.append("<td>总资产周转率</td>");
	tr_8.append("<td>固定资产周转率</td>");
	tr_9.append("<td>应付账款周转率</td>");
	tr_10.append("<td>应付账款周转天数</td>");
	tr_11.append("<td>净营业周期</td>");
//	tr_12.append("<td>营运资金周转率</td>");
	tr_13.append("<td>非流动资产周转率</td>");
	//3838-3848
	for (var i = num; i < num+2; i++) {
		var obj=result[i];
		tr_1.append("<td>"+obj["3808"].toFixed(2)+"</td>");
		tr_2.append("<td>"+obj["3809"].toFixed(2)+"</td>");
		tr_3.append("<td>"+obj["3810"].toFixed(2)+"</td>");
		tr_4.append("<td>"+obj["3811"].toFixed(2)+"</td>");
		tr_5.append("<td>"+obj["3812"].toFixed(2)+"</td>");
		tr_6.append("<td>"+obj["3813"].toFixed(2)+"</td>");
		tr_7.append("<td>"+obj["3814"].toFixed(2)+"</td>");
		tr_8.append("<td>"+obj["3815"].toFixed(2)+"</td>");
		tr_9.append("<td>"+obj["3816"].toFixed(2)+"</td>");
		tr_10.append("<td>"+obj["3817"].toFixed(2)+"</td>");
		tr_11.append("<td>"+obj["3818"].toFixed(2)+"</td>");
//		tr_12.append("<td>"+obj["3819"].toFixed(2)+"</td>");
		tr_13.append("<td>"+obj["3820"].toFixed(2)+"</td>");
	}
	tr_1.append(getBilvHtml(tr_1));
	tr_2.append(getBilvHtml(tr_2));
	tr_3.append(getBilvHtml(tr_3));
	tr_4.append(getBilvHtml(tr_4));
	tr_5.append(getBilvHtml(tr_5));
	tr_6.append(getBilvHtml(tr_6));
	tr_7.append(getBilvHtml(tr_7));
	tr_8.append(getBilvHtml(tr_8));
	tr_9.append(getBilvHtml(tr_9));
	tr_10.append(getBilvHtml(tr_10));
	tr_11.append(getBilvHtml(tr_11));
//	tr_12.append(getBilvHtml(tr_12));
	tr_13.append(getBilvHtml(tr_13));
	var table=$("<table>");
	table.append(title_tr);
	table.append(tr_1);
	table.append(tr_2);
	table.append(tr_3);
	table.append(tr_4);
	table.append(tr_5);
	table.append(tr_6);
	table.append(tr_7);
	table.append(tr_8);
	table.append(tr_9);
	table.append(tr_10);
	table.append(tr_11);
//	table.append(tr_12);
	table.append(tr_13);
	div.append(table);
	return div;
}
/**
 * 成长情况
 */
function findGrowAbility(){
	$("#growAbility").html("");
	$.axs("/betaStock/financial/findGrowAbility.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var div1=getGrowAbilityHtml(result,0);
			$("#growAbility").append(div1);
			var div2=getGrowAbilityHtml(result,1);
			$("#growAbility").append(div2);
			$("#growAbility").append('<div class="clr"></div>');
		}
	});
}
/**
 *成长情况
 * @param result retData
 * @param num 开始位置
 */
function getGrowAbilityHtml(result,num){
	var div=$("<div>");
	div.addClass("cw_d_table_box");
	//日期
	var strDate=result[num].dateTime.split("-"); 
	var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
	var year=(s).Format("yyyy");
	div.append("<span>"+year+"年度</span>");
	var title_tr=$("<tr>");
	var tr_1=$("<tr>");
	var tr_2=$("<tr>");
	var tr_3=$("<tr>");
	var tr_4=$("<tr>");
	var tr_5=$("<tr>");
	var tr_6=$("<tr>");
	var tr_7=$("<tr>");
	var tr_8=$("<tr>");
	var tr_9=$("<tr>");
	var tr_10=$("<tr>");
	var tr_11=$("<tr>");
	var tr_12=$("<tr>");
	title_tr.append("<td>&nbsp;&nbsp;</td>");
	title_tr.append("<td>本期期末</td>");
	title_tr.append("<td>上期期末</td>");
	title_tr.append("<td>增减比例</td>");
	tr_1.append("<td>销售增长率</td>");
	tr_2.append("<td>资本积累率</td>");
	tr_3.append("<td>主营业务利润</td>");
	tr_4.append("<td>营业利润</td>");
	tr_5.append("<td>利润总额</td>");
	tr_6.append("<td>净利润</td>");
	tr_7.append("<td>每股经营活动产生的现金流量净额（%）</td>");
//	tr_8.append("<td>营业总收入同比增长率（%）</td>");
	tr_9.append("<td>营业收入同比增长率（%）</td>");
	tr_10.append("<td>经营活动产生的现金流量净额（%）</td>");
	tr_11.append("<td>净资产收益率（摊薄）（%）</td>");
	tr_12.append("<td>每股净资产（%）</td>");
	//3838-3848
	for (var i = num; i < num+2; i++) {
		var obj=result[i];
		tr_1.append("<td>"+obj["3887"].toFixed(2)+"</td>");
		tr_2.append("<td>"+obj["3888"].toFixed(2)+"</td>");
		tr_3.append("<td>"+obj["3889"].toFixed(2)+"</td>");
		tr_4.append("<td>"+obj["3890"].toFixed(2)+"</td>");
		tr_5.append("<td>"+obj["3891"].toFixed(2)+"</td>");
		tr_6.append("<td>"+obj["3892"].toFixed(2)+"</td>");
		tr_7.append("<td>"+obj["3893"].toFixed(2)+"</td>");
//		tr_8.append("<td>"+obj["3894"].toFixed(2)+"</td>");
		tr_9.append("<td>"+obj["3895"].toFixed(2)+"</td>");
		tr_10.append("<td>"+obj["3896"].toFixed(2)+"</td>");
		tr_11.append("<td>"+obj["3897"].toFixed(2)+"</td>");
		tr_12.append("<td>"+obj["3898"].toFixed(2)+"</td>");
	}
	tr_1.append(getBilvHtml(tr_1));
	tr_2.append(getBilvHtml(tr_2));
	tr_3.append(getBilvHtml(tr_3));
	tr_4.append(getBilvHtml(tr_4));
	tr_5.append(getBilvHtml(tr_5));
	tr_6.append(getBilvHtml(tr_6));
	tr_7.append(getBilvHtml(tr_7));
//	tr_8.append(getBilvHtml(tr_8));
	tr_9.append(getBilvHtml(tr_9));
	tr_10.append(getBilvHtml(tr_10));
	tr_11.append(getBilvHtml(tr_11));
	tr_12.append(getBilvHtml(tr_12));
	var table=$("<table>");
	table.append(title_tr);
	table.append(tr_1);
	table.append(tr_2);
	table.append(tr_3);
	table.append(tr_4);
	table.append(tr_5);
	table.append(tr_6);
	table.append(tr_7);
//	table.append(tr_8);
	table.append(tr_9);
	table.append(tr_10);
	table.append(tr_11);
	table.append(tr_12);
	div.append(table);
	return div;
}
/**
 * 杜邦分析
 */
function findDupontAbility(){
	$("#dupontAbility").html("");
	$.axs("/betaStock/financial/findDupontAbility.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var div1=getDupontAbilityHtml(result,0);
			$("#dupontAbility").append(div1);
			var div2=getDupontAbilityHtml(result,1);
			$("#dupontAbility").append(div2);
			$("#dupontAbility").append('<div class="clr"></div>');
		}
	});
}
/**
 *	杜邦分析
 * @param result retData
 * @param num 开始位置
 */
function getDupontAbilityHtml(result,num){
	var div=$("<div>");
	div.addClass("cw_d_table_box");
	//日期
	var strDate=result[num].dateTime.split("-"); 
	var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
	var year=(s).Format("yyyy");
	div.append("<span>"+year+"年度</span>");
	var title_tr=$("<tr>");
	var tr_1=$("<tr>");
	var tr_2=$("<tr>");
	var tr_3=$("<tr>");
	var tr_4=$("<tr>");
	var tr_5=$("<tr>");
	var tr_6=$("<tr>");
	var tr_7=$("<tr>");
	title_tr.append("<td>&nbsp;&nbsp;</td>");
	title_tr.append("<td>本期期末</td>");
	title_tr.append("<td>上期期末</td>");
	title_tr.append("<td>增减比例</td>");
	tr_1.append("<td>净资产收益率（ROE）</td>");
	tr_2.append("<td>销售净利率</td>");
	tr_3.append("<td>权益乘数</td>");
	tr_4.append("<td>资产周转率（次）</td>");
	tr_5.append("<td>净利润</td>");
	tr_6.append("<td>利润总额</td>");
	tr_7.append("<td>息税前收入（EBIT）（%）</td>");
	//3838-3848
	for (var i = num; i < num+2; i++) {
		var obj=result[i];
		tr_1.append("<td>"+obj["3908"].toFixed(2)+"</td>");
		tr_2.append("<td>"+obj["3909"].toFixed(2)+"</td>");
		tr_3.append("<td>"+obj["3910"].toFixed(2)+"</td>");
		tr_4.append("<td>"+obj["3911"].toFixed(2)+"</td>");
		tr_5.append("<td>"+obj["3912"].toFixed(2)+"</td>");
		tr_6.append("<td>"+obj["3913"].toFixed(2)+"</td>");
		tr_7.append("<td>"+obj["3914"].toFixed(2)+"</td>");
	}
	tr_1.append(getBilvHtml(tr_1));
	tr_2.append(getBilvHtml(tr_2));
	tr_3.append(getBilvHtml(tr_3));
	tr_4.append(getBilvHtml(tr_4));
	tr_5.append(getBilvHtml(tr_5));
	tr_6.append(getBilvHtml(tr_6));
	tr_7.append(getBilvHtml(tr_7));
	var table=$("<table>");
	table.append(title_tr);
	table.append(tr_1);
	table.append(tr_2);
	table.append(tr_3);
	table.append(tr_4);
	table.append(tr_5);
	table.append(tr_6);
	table.append(tr_7);
	div.append(table);
	return div;
}
/**
 * 增持比率
 * @param trObj
 * @returns {String}
 */
function getBilvHtml(trObj){
	var tr_td_1=trObj.find("td").eq(1).text();
	var tr_td_2=trObj.find("td").eq(2).text();
	if(tr_td_2==0){
		return "<td>--</td>";
	}else{
		return "<td>"+((tr_td_1-tr_td_2)/tr_td_2).toFixed(2)+"</td>";
	}
}



$(document).ready(function(){
	//财务详情，财务分析切换
	$(".con_tit_dbox").children(".content_r").eq(1).hide();
	$(".ycycd_dbox").children(".cw_tab_dbox").hide();
	$(".ycycd_dbox").children(".cw_tab_dbox").eq(0).show();
	$(".yjy_title_tab ul li").on("click",function(){
		var ind =$(this).index();
		$(".yjy_title_tab ul li").removeClass("on");
		$(this).addClass("on");
		$(".con_tit_dbox").children(".content_r").hide();
		$(".con_tit_dbox").children(".content_r").eq(ind).show();
	});
	//财务分析tab切换
	$(".cw_second_tab ul li").on("click",function(){
		var idx =$(this).index();
		$(".cw_second_tab ul li").removeClass("on");
		$(this).addClass("on");
		$(".ycycd_dbox").children(".cw_tab_dbox").hide();
		$(".ycycd_dbox").children(".cw_tab_dbox").eq(idx).show();
		if(idx==0){
			findProfitability();
		}else if(idx==1){
			findDebtPayingAbility();
		}else if(idx==2){
			findOperationalAbility();
		}else if(idx==3){
			findGrowAbility();
		}else if(idx==4){
			findDupontAbility();
		}
	});
});