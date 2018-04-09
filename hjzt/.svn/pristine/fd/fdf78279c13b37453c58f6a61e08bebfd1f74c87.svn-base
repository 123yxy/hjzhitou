/**
 * 尚未开发的功能调用
 */
function unDevelop(){
	errorAlert("", "功能有待完善,请敬请期待!");
}

/**
 * 用户关注、取消关注
 * @param thiz this
 * @param key 1(发现公司:company) 2(发现投资人:investor) 3(特色推荐:speciality)  4(发现中介机构:intermediary)
 */
function updateFollow(thiz,key){
	console.log(thiz);
	var guanzhuParam={thiz:thiz,key:key};
	var allPath=location.href;
	localStorage.setItem("guanzhuParam",JSON.stringify(guanzhuParam));
	toLogin();
	var value=localStorage.getItem('follow_'+key);
	value=JSON.parse(value);
	var path="";
	var followId=$(thiz).attr("data-followId");
	if(followId==null){
		return false;
	}
	if($(thiz).hasClass("on")){//已经关注，需要取消关注
		$(thiz).removeClass("on");
		$(thiz).text("关注");
		path="/betaStock/redis/deleFollow.do";
		//已经关注，需要取消关注
		var index=$.inArray(followId,value);
		value.splice(index,1);
		//移除后的结构重新赋值到缓存中
		localStorage.setItem('follow_'+key,JSON.stringify(value));
	}else{//未关注，需要关注
		$(thiz).addClass("on");
		$(thiz).html("关注");
		path="/betaStock/redis/addFollow.do";
		//添加关注的东西到缓存中
		value.push(followId);
		localStorage.setItem('follow_'+key,JSON.stringify(value));
	}
	if(path==""){
		return false;
	}
	//1.公司2.投资人3.专辑4.中介
	var followType=null;
	if(key=="company"){//发现公司
		followType=1;
	}else if(key=="investor"){//发现投资人
		followType=2;
	}else if(key=="speciality"){//发现专辑
		followType=3;
	}else if(key=="intermediary"){//中介
		followType=4;
	}
	if(followType==null){
		return false;
	}
//	return false;
	var param={followId:followId,followType:followType};
	$.axs(path,param,false,function(data){
//		var value=localStorage.getItem('follow_'+thizType);
//		value+=","+followId;
//		localStorage.setItem('follow_'+thizType,value);
	});
}





/**
 * 查询对比
 */
function findDuibi(){
	var value=localStorage.getItem("companyDuibi");
	if(value==null || value=="" || value=="undefined"){
		return false;
	}
	value=JSON.parse(value);
	$("#shuzi_num").text(value.length);
	for (var i = 0; i < value.length; i++) {
//		console.log(value[i]);
		var obj=value[i];
		var selecting = '<li id="li_'+obj.stockCode+'">';
		//selecting += '<a href="/threeLibrary/companyHome.html?stockCode='+obj.stockCode+'&stockName='+obj.stockName+'">'+obj.stockName+'('+obj.stockCode+')</a>';
		selecting += '<a href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\''+getDuibiGoBackHtmlName()+'\');">'+obj.stockName+'('+obj.stockCode+')</a>';
		selecting += '<i onclick="deleDuibi(\''+obj.stockCode+'\')"></i>';
		selecting += '<div class="clr"></div>';
		selecting += '</li>';
		$(".m_select").append(selecting);
	}
}
//加入对比
function duibi(thiz,stockCode,stockName) {
	
	var obj={stockCode:stockCode,stockName:stockName}
	var value=localStorage.getItem("companyDuibi");
	if(value==null || value=="" || value=="undefined"){
		value="[]";
	}
	if(value.indexOf(stockCode)>-1){
		deleDuibi(stockCode,stockName);
		$(thiz).removeClass("on");
//		errorAlert("","不能重复添加");
		return false;
	}
	value=JSON.parse(value);
	if(value.length>=4){
		errorAlert("","最多添加四个");
		return false;
	}
	var companyName = $(this).parent().parent().find(".company_info")
		.find(".compamy_msg").find("a").text();
		$(thiz).addClass("on");
	$(".duibiao").show();
	var selecting = '<li id="li_'+stockCode+'">';
	//selecting += '<a href="/threeLibrary/companyHome.html?stockCode='+stockCode+'&stockName='+stockName+'">'+stockName+'('+stockCode+')</a>';
	selecting += '<a href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\''+getDuibiGoBackHtmlName()+'\');">'+obj.stockName+'('+obj.stockCode+')</a>';
	selecting += '<i onclick="deleDuibi(\''+stockCode+'\',\''+stockName+'\')"></i>';
	selecting += '<div class="clr"></div>';
	selecting += '</li>';
	$(".m_select").append(selecting);
	//存放到缓存中
//	var obj={stockCode:stockCode,stockName:stockName}
//	var value=localStorage.getItem("companyDuibi");
//	if(value==null || value=="" || value=="undefined"){
//		value="[]";
//	}
	
	value.push(obj);
	$("#shuzi_num").text(value.length);
	localStorage.setItem("companyDuibi",JSON.stringify(value));
	toLogin();
}
//删除某个对比信息
function deleDuibi(stockCode,stockName) {
	$("#li_"+stockCode).remove();
	$("[name='duibi"+stockCode+"']").removeClass("on");
	//存放到缓存中
	var obj={stockCode:stockName}
	var value=localStorage.getItem("companyDuibi");
	if(value==null || value=="" || value=="undefined"){
		value="[]";
	}
	value=JSON.parse(value);
	//已经关注，需要取消关注
	var index=$.inArray(obj,value);
	value.splice(index,1);
	//移除后的结构重新赋值到缓存中
	localStorage.setItem("companyDuibi",JSON.stringify(value))
	$("#shuzi_num").text(value.length);
}
//跳转对比页面
function duibiHtml(goBackName){
	var value=localStorage.getItem("companyDuibi");
	if(value==null || value=="" || value=="undefined" || value=="[]"){
		errorAlert("","请添加对比公司");
		return false;
	}
	var stockCodes = "";
	$(eval(value)).each(function(){
		stockCodes += this.stockCode + ",";
	})
	//回跳控制
	var allPath=location.href;
	localStorage.setItem("companyDuibiHtml",null);
	var obj={goBackUrl:allPath,goBackName:goBackName};
	localStorage.setItem("companyDuibiHtml",JSON.stringify(obj));
	//TODO  公司对比页
	window.location.href='/companyComparison.html?stockCodes=' + stockCodes.substring(0, stockCodes.length - 1);
	//window.location.href='/companyComparison.html?stockCodes=831877,831811'
}
function getDuibiGoBackHtmlName(){
	var goBackName="首页";
	var allPath=location.href;
	if(allPath.indexOf("discoveryCompany.html")>-1){
		goBackName="发现公司";
	}else if(allPath.indexOf("albumBetails.html")>-1){
		goBackName="特色推荐";
	}else if(allPath.indexOf("companyHome.html")>-1){
		goBackName="公司主页";
	}else if(allPath.indexOf("searchResult.html")>-1){
		goBackName="搜索结果";
	}
	return goBackName;
}
/**
 * 跳转到公司主页
 * @param stockCode
 * @param stockName
 */
function toCompanyHomeHtml(stockCode,stockName,goBackName){
	var allPath=location.href;
	var obj={goBackUrl:allPath,goBackName:goBackName};
	localStorage.setItem("companyHomeHtml",JSON.stringify(obj));
	//TODO  股票详情页
	window.open('/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+stockName);
	//window.location.href='/businessDetails/newTBindex.html?stockCode='+stockCode+'&stockName='+stockName;
}
/**
 * 判断有木有登录
 */
function toLogin(){
	$.axs("/user/user/isLogin.do",null,false,function(data){
//		console.log(data);
		var allPath=location.href;
//		console.log(allPath);
		localStorage.setItem('loginToHtml',allPath);
		if(data){//没有登录
			var phoneNum=localStorage.getItem("phone");
			var pass=localStorage.getItem(phoneNum);
			//用户登录后控制页面参数回显
			var ajaxPath=localStorage.getItem(allPath); 
			var ajaxParam=localStorage.getItem(ajaxPath); 
			//用户点击关注的事件-用户登录后自动调用然后关注
			var guanzhuParam=localStorage.getItem("guanzhuParam");
			//清空所有缓存
			localStorage.clear();
			localStorage.setItem("phone",phoneNum);
			localStorage.setItem(phoneNum,pass);
			//登录页面回跳的页面
			localStorage.setItem('loginToHtml',allPath);
			//回跳后的页面回显的参数
			localStorage.setItem(allPath,ajaxPath); 
			localStorage.setItem(ajaxPath,ajaxParam); 
			//用户单击关注的东西
			localStorage.setItem("guanzhuParam",guanzhuParam);
			//跳转登录页
			window.location.href="/nlogin.html";
			//显示登录DIV
//			if(pass!=null && pass!="" && pass!=undefined && pass!="null"){
//				$("#phoneNumLo").val(phoneNum);
//				$("#passwordLo").val(pass);
//				$(".lrw_jz input[type='checkbox']").attr("checked","checked")
//			}
//			$(".lrwtc").slideDown();
//			$(".lrw_tc_info").find(".lrw_tc_list").hide();
//			$(".lrw_tc_info").find(".lrw_tc_list").eq(0).show();
//			//错误提示信息--隐藏
//			$(".lrw_login").find("li.lrw_error p").hide();
//			//滚动条到最顶部
//			$(window).scrollTop(0);
		}
	});
}


//------------下面全部都是导出EXCEL
var idTmr;  
function  getExplorer() {  
    var explorer = window.navigator.userAgent ;  
    //ie  
    if (!!window.ActiveXObject || "ActiveXObject" in window) { 
    	//errorAlert("","");
        return 'ie';  
    }  
    //firefox  
    else if (explorer.indexOf("Firefox") >= 0) {  
        return 'Firefox';  
    }  
    //Chrome  
    else if(explorer.indexOf("Chrome") >= 0){  
        return 'Chrome';  
    }  
    //Opera  
    else if(explorer.indexOf("Opera") >= 0){  
        return 'Opera';  
    }  
    //Safari  
    else if(explorer.indexOf("Safari") >= 0){  
        return 'Safari';  
    }  
}  
function method5(tableid) { 
    if(getExplorer()=='ie'){//整个表格拷贝到EXCEL中  
        var curTbl = document.getElementById(tableid);  
        try{  
            var oXL = new ActiveXObject("Excel.Application");  
            //创建AX对象excel  
        } catch (e) {  
            alert("请确认:\n1.机器上Excel已经安装.\n2.Internet选项=>安全=>本地Internet=>自定义级别  \"对未标记为安全的ActiveX控件进行初始化和脚本运行，设定为启用\".\n2.Internet选项=>安全=>受信任的站点=>站点  \"添加 \"=>关闭=>自定义级别  \"对未标记为安全的ActiveX控件进行初始化和脚本运行，设定为启用\"");  
        }  
        var oWB = oXL.Workbooks.Add();  
        //获取workbook对象  
        var oSheet = oWB.ActiveSheet;  
        //激活当前sheet  
        var sel = document.body.createTextRange();  
        sel.moveToElementText(curTbl);  
        //把表格中的内容移到TextRange中  
        //sel.select();  
        //全选TextRange中内容  
        sel.execCommand("Copy");  
        //复制TextRange中内容  
        oSheet.Paste();  
        //粘贴到活动的EXCEL中  
        oXL.Visible = true;  
        
      /*  //使 Excel 通过 Application 对象可见 
        var ExcelSheet = xlBook.Worksheets(1); 
        ExcelSheet.Application.Visible = true;  
        //设置单元格边框*()  
        ExcelSheet.ActiveSheet.Cells(row,col).Borders.Weight = 1;    
        //设置单元格底色*(1-黑色，
        ExcelSheet.ActiveSheet.Cells(row,col).Interior.ColorIndex = 5; 
        ExcelSheet.ActiveSheet.PageSetup.RightFooter = "来源:汇金智投投研系统";  */
        
        //设置excel可见属性  
        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);

            oWB.Close(savechanges = false);
            //xls.visible = false;
            oXL.Quit();
            oXL = null;
            //结束excel进程，退出完成
            //window.setInterval("Cleanup();",1);
            idTmr = window.setInterval("Cleanup();", 1);
        }
    } else{  
        tableToExcel(tableid)  
    }  
}  
function Cleanup() {  
    window.clearInterval(idTmr);  
    CollectGarbage();  
}  
var tableToExcel = (function() {  
    var uri = 'data:application/vnd.ms-excel;base64,',  
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',  
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },  
        format = function(s, c) {   return s.replace(/{(\w+)}/g,function(m, p) { return c[p]; }) }  
    return function(table, name) {  
        if (!table.nodeType) table = document.getElementById(table)  
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}  
        window.location.href = uri + base64(format(template, ctx))  
    }  
})()  

/**
 * 导出excel
 * @param fileName
 * @param exportData
 */
function methodExportExcel(fileName,exportData){
	//window.location.href="/betaInvest/common/exportExcel.do?fileName="+fileName+"&exportData="+JSON.stringify(exportData);
	 jQuery("<form action='/betaInvest/common/exportExcel.do' method='post'>" +  // action请求路径及推送方法
             "<input type='text' name='fileName' value='"+fileName+"'/>"+ // 文件路径
             "<input type='text' name='exportData' value='"+JSON.stringify(exportData)+"'/>"+ // 文件数据
         "</form>").appendTo("body").submit().remove();
}