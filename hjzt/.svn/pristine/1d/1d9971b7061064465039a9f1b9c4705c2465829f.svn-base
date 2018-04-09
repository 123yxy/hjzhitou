$(function(){
	//下拉框部分 wtt
    $(".select").each(function(){
        var s=$(this);
        var z=parseInt(s.css("z-index"));
        var title=$(this).children(".s-title");
        var content=$(this).children(".s-content");
        var _show=function(){content.slideDown(200);title.addClass("cur");s.css("z-index",z+1);};   //展开效果
        var _hide=function(){content.slideUp(200);title.removeClass("cur");s.css("z-index",z);};    //关闭效果
        title.click(function(){
            content.is(":hidden")?_show():_hide();
            $(this).children("span").addClass("active")
        });
        content.find("a").click(function(){
            title.html($(this).html()+"<span></span>");_hide();
        });     //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
        $("body").click(function(i){ !$(i.target).parents(".select").first().is(s) ? _hide():"";});
    })
    
    //日历部分
//	1.首先取得处理月的总天数
//	2.计算处理月第一天是星期几
//	3.打印表格 2for循环
    
    //1.取得处理月的总天数
//var date = new Date();
//var cyear = date.getFullYear(); 
//var cmonth = date.getMonth()+1;
//var cday = date.getDate();
//var cweekend = date.getDay();
////判断是否闰年2月
//function is2(year){
//	if(year%100 == 0 && year%400 !=0){
//		return 0;
//	}else if(year%4 == 0){
//		return 1;
//	}else if(year%4 !=0){
//		return 0;
//	}
//}
//var carr = new Array(31,is2(cyear),31,30,31,30,31,31,30,31,30,31);
//var 
  
 
//  alert(is2());
    
    
    
    
    
	//日历部分
    function is_leap(year) {
	   return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
	} //是否为闰年
	
	var nstr=new Date(); //当前Date资讯
	var ynow=nstr.getFullYear(); //年份
	var mnow=nstr.getMonth(); //月份
	var dnow=nstr.getDate(); //今日日期
	var n1str=new Date(ynow,mnow,1); //当月第一天Date资讯
	
	var firstday=n1str.getDay(); //当月第一天星期几
	
	var m_days=new Array(31,28+is_leap(ynow),31,30,31,30,31,31,30,31,30,31); //各月份的总天数
	
	var tr_str=Math.ceil((m_days[mnow] + firstday)/7); //表格所需要行数
	
	//打印表格第一行（有星期标志）
	var str = ("<table style='width:330px;height:200px;' border='0' align='center' width='220' cellspacing='0'><tr style='color:#1985e2;height:25px;vertical-align:top'><td align='center'>日</td><td align='center'>一</td><td align='center'>二</td><td align='center'>三</td><td align='center'>四</td><td align='center'>五</td><td align='center'>六</td></tr>");
	
	for(i=0;i<tr_str;i++) { //表格的行
	   str += ("<tr>");
	   for(k=0;k<7;k++) { //表格每行的单元格
	      idx=i*7+k; //单元格自然序列号
	      date_str=idx-firstday+1; //计算日期
	      (date_str<=0 || date_str>m_days[mnow]) ? date_str="&nbsp;" : date_str=idx-firstday+1; //过滤无效日期（小于等于零的、大于月总天数的）
	      //打印日期：今天底色为红
	      date_str==dnow ? str += ("<td style='height:33px;width:47px' align='center' bgcolor=''>" + "<span style='height: 30px;width: 30px;color:white;background: #f46d74;border-radius: 50%;display: inline-block;line-height: 31px;'>"+ date_str+"</span>" + "</td>") : str += ("<td style='height:33px;width:47px' align='center'>" + date_str + "</td>");
	   }
	   str += ("</tr>"); //表格的行结束
	}
	$('.data_main').html(str); //表格结束
	
	
})
