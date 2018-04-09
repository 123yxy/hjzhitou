$((function($){
//	$("body,html").css("overflow","hidden");
    $.datepicker.regional['zh-CN'] = {
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '<上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort: ['1','2','3','4','5','6', '7','8','9','10','11','12'],
        yearStatus: '选择年份',
        monthStatus: '选择月份',
        
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        isRTL: false};
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
})(jQuery));
var datepickerDate='';
//显示日历上红点的日期
var dates=new Array(),tips=new Array();
 $(function() {
	$("#more_rongzi_qk").on("click",function(){
		var pageNum=$(this).attr("data-pageNum");
		var createDate=$(this).attr("data-createDate");
		findDateData(createDate,Number(pageNum)+1);
	});
	//查询有数据的日期 
	initDate((new Date()).Format("yyyy-MM"));
	//日历初始化
    $( "#datepicker" ).datepicker({
       changeMonth: true,
       changeYear: true,
       yearRange:"2003:2017",
       showMonthAfterYear: true,  
       onChangeMonthYear:function(year, month, inst){
       	 //alert();
//    	   console.log(year+"-"+month+"-"+inst);
    	   if(month<10){
    		   month="0"+month;
    	   }
    	   initDate((new Date(year+"-"+month)).Format("yyyy-MM"));
       },
       onSelect: function(dateText, inst) {
    	   datepickerDate=dateText;
//  	   console.log(datepickerDate);

    	   showDate();
       },
       beforeShowDay: function(date) { 
//	       var dates = ['2017/03/01', '2017/03/11','2016/03/11'];  
//	       var tips = ['2017/03/01', '2017/03/11','2016/03/11'];  
	       //此处dates  和tips 是所有发生事件的日期
	       for (var i = 0; i < dates.length; i++) {  
	           if (new Date(dates[i]).toString() == date.toString()) {  
	               return [true, 'highlight', tips[i]];  
	           }  
	       }  
	       return [true, ''];  
    	}
    });
});
 
 /**
  * 单击日期
  * @param a
  */
function showDate(){
	//alert();
//  	var xingQ = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
//  	var riqi = a;
//    var arys1= new Array();      
//    arys1=riqi.split('-');     //日期为输入日期，格式为 2013-3-10
//    var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);   
//  	$("#ridate").html(a);
//  	$("#xinqidate").html(xingQ[ssdate.getDay()]);
//	此处实现对应日期下的事件列表
//  	console.log(a);
  //查询日期的详细数据列表
	findDateData(datepickerDate,1);
	//融资数据
	changParamRongZi();
	//融资排行
	changParamRongZiPaihang(1,20);  
}

/**
 * 按年月查询有数据的日期
 */
function initDate(date){
//	var date=(new Date()).Format("yyyy-MM");
    $.axs("/betaInvest/btFinancingEvent/findBfeDateList.do",{date:date},false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var maxDate="";
			for (var i = 0; i < result.length; i++) {
				var map=result[i];
				var createDate=map.createDate;
				if(maxDate=="" || createDate>maxDate){
					maxDate=createDate;
				}
				while(createDate.indexOf("-")>-1){
					createDate=createDate.replace("-","/");
				}
				dates.push(createDate);
				tips.push(createDate);
			}
			//查询日期的详细数据列表
			findDateData(maxDate,1);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
    });
}

/**
 * 查询日期下的所有数据--带分页
 */
function findDateData(createDate,pageNum){
	while(createDate.indexOf("/")>-1){
		createDate=createDate.replace("/","-");
	}
//	$(".rz_paih_time").text(createDate);
	$("#more_rongzi_qk").attr("data-pageNum",pageNum);
	$("#more_rongzi_qk").attr("data-createDate",createDate);
	var xingQ = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var dateType=new Date(createDate);   
    datepickerDate=createDate;
  	$("#ridate").html("最近定增    "+createDate);
  	$("#xinqidate").html(xingQ[dateType.getDay()]);
	//date=2017-03-02&pageNum=2&pageSize=10
  	if(pageNum==1){
  		$(".rongzi_qk").html('');
  	}
	var param={date:createDate,pageNum:pageNum,pageSize:10};
	$.axs("/betaInvest/btFinancingEvent/findBfeList.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				$("#more_rongzi_qk").hide();
				return false;
			}
			if(result.length<10){
				$("#more_rongzi_qk").hide();
			}else{
				$("#more_rongzi_qk").show();
			}
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var htm='';
					htm+='<li>';
					htm+='<div class="gs_qk">';
					htm+='<a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+obj.stockCode+'&stockName='+obj.stockNm+'">'+obj.stockNm+'</a>';
					htm+='<span>融资<em class="shuzi">'+(obj.financingAmount==null?"--":(obj.financingAmount).toFixed(2))+'</em>万元</span>';
					
					htm+='</div>';
					htm+='<div class="rongzi_leix">';
					htm+='<span class="clr">事件类型：'+obj.eventTypeName+'</span>';
					//<!--i的类是shishi时说明i的内容是已实施-->
					//<!--i的类是yipizhun时说明i的内容是股东大会已批准-->
					//1:董事会通过、2:股东大会通过、3:停止实施、4:股东大会未通过、5:证监会核准、6:实施中、7:发行失败、8:已完成定向增发（不存在进度）',
					if(obj.stage==8){
						htm+='<i class="fr shishi">已实施</i>';
					}else if(obj.stage==1){
						htm+='<i class="fr yipizhun">董事会通过</i>';
					}else if(obj.stage==2){
						htm+='<i class="fr yipizhun">股东大会通过</i>';
					}else if(obj.stage==3){
						htm+='<i class="fr yipizhun">停止实施</i>';
					}else if(obj.stage==4){
						htm+='<i class="fr yipizhun">股东大会未通过</i>';
					}else if(obj.stage==5){
						htm+='<i class="fr yipizhun">证监会核准</i>';
					}else if(obj.stage==6){
						htm+='<i class="fr yipizhun">实施中</i>';
					}else if(obj.stage==7){
						htm+='<i class="fr yipizhun">发行失败</i>';
					}else{
						htm+='<i class="fr yipizhun"></i>';
					}
					htm+='<div class="clr"></div>';
					htm+='</div>';
					
					htm+='</li>';
					$(".rongzi_qk").append(htm);
					//日期显示
					createDate=obj.createDate
					dateType=new Date(createDate);   
//				    datepickerDate=createDate;
				  	$("#ridate").html("最近定增    "+createDate);
				  	$("#xinqidate").html(xingQ[dateType.getDay()]);
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
    });
}