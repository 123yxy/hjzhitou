var refreshList;
var reportSaveId = decodeURI(getUrlParam('id'));
$(function(){

//	console.log(list);
//	console.log(file);
//	获取url参数
//	
 
	function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = encodeURI(window.location.search).substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	var stockCode = decodeURI(GetQueryString('stockCode'));
	var title = decodeURI(GetQueryString('title'));
	var content = decodeURI(GetQueryString('content'));
	var newyb = decodeURI(GetQueryString('newyb'));
	
	
	if (newyb == 1){
//		新建
		if(isXSBCompany(stockCode)){
			$.ajax({
				url: '/beta/template/getTemplate.do',
				type: 'post',
				dataType: "json",
				async:false,
				data: {
					'userId': localStorage.getItem("userId"),
					'catalogType': 'NEWSB'
				},
				success: function(res){
//					console.log(res)
					file = $.parseJSON(res.result[0].catalogFile);
					echartsOptions = file.echartsOptions||{};//赋值研报中图形option
					list = $.parseJSON(res.result[0].catalogList);
					$.YanbaoLogJsonData({"reportName":title,"reportObject":content,"dataName":content,"dataObject":content,"eventType":1},true,function(data){});
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"创建三板研报："+title},true,function(data){});
				}
			})
		}else{
			$.ajax({
				url: '/beta/template/getTemplate.do',
				type: 'post',
				dataType: "json",
				async:false,
				data: {
					'userId': localStorage.getItem("userId"),
					'catalogType': 'NEWA'
				},
				success: function(res){
					
					file = $.parseJSON(res.result[0].catalogFile);
					echartsOptions = file.echartsOptions||{};//赋值研报中图形option
					list = $.parseJSON(res.result[0].catalogList);
					$.YanbaoLogJsonData({"reportName":title,"reportObject":content,"dataName":content,"dataObject":content,"eventType":1},true,function(data){});
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"创建A股研报："+title},true,function(data){});
				}
			})
		}
	}else if (newyb == 2){
		var id = decodeURI(GetQueryString('id'));
	//编辑
			$.ajax({
				url: '/beta/report/findReportInfo.do',
				type: 'post',
				dataType: "json",
				async:false,
				data: {
					'userId': localStorage.getItem("userId"),
					'id': id,
				},
				success: function(res){
					list = $.parseJSON(res.result.reportCatalog);
					file = $.parseJSON(res.result.reportContext);
					echartsOptions = file.echartsOptions||{};//赋值研报中图形option
					$.YanbaoLogJsonData({"reportName":title,"reportObject":content,"dataName":content,"dataObject":content,"eventType":2},true,function(data){});
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"编辑研报："+title},true,function(data){});
				}
			})
		
	}else if (newyb == 3){
		var id = decodeURI(GetQueryString('id'));
	//预览
		$.ajax({
			url: '/beta/report/findReportInfo.do',
			type: 'post',
			dataType: "json",
			async:false,
			data: {
				'userId': localStorage.getItem("userId"),
				'id': id,
			},
			success: function(res){
				list = $.parseJSON(res.result.reportCatalog);
				file = $.parseJSON(res.result.reportContext);
				echartsOptions = file.echartsOptions||{};//赋值研报中图形option
				$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"预览研报<"+title+">"},true,function(data){});
				//切换按钮
				$('.class1').hide();
				$('.class2').show();
				//解绑部分事件
//				$('h3').nextAll().unbind('mouseenter');
//				$(positionObj).next().unbind('mouseenter');
//				$(positionObj).prev().unbind('mouseenter');
				
			}
		})
		$('.middle_left').hide();
		$('.middle_right').hide();
	}else if(newyb == 4){
		//空白
		{
			$.ajax({
				url: '/beta/template/getTemplate.do',
				type: 'post',
				dataType: "json",
				async:false,
				data: {
					'userId': localStorage.getItem("userId"),
					'catalogType': 'NEWBLANK'
				},
				success: function(res){
					
					file = $.parseJSON(res.result[0].catalogFile);
					echartsOptions = file.echartsOptions||{}; //赋值研报中图形option
					list = $.parseJSON(res.result[0].catalogList);
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"创建空白研报："+title},true,function(data){});
				}
			})
		}
	}
	
	
	
	refreshList = function(){
//		生成左侧list 以及其各个小图标
//alert(list)
//alert(file)
//
//console.log(list);
if(list == null || list.mulu == null)
	return;
		var l_str = '';
		for(var i=0; i<list.mulu.length; i++){
//			console.log(list.mulu[i])
			l_str += '<div class="catalog_ clear">';
			l_str += '<span class="mlclass" code='+list.mulu[i].code+' name='+list.mulu[i].name+' mtradm='+list.mulu[i].mtradm+' ><b></b><a title='+list.mulu[i].name+' >'+list.mulu[i].name+'</a><i title="删除" class="del"></i><i title="添加" class="add"></i><i title="向下" class="down"></i><i title="向上" class="up"></i></span>';
			for(var j=0; j<list.mulu[i].mulu.length; j++){
//				console.log(list.mulu[i].mulu[j])
				l_str += '<ul><span class="mlclass" code='+list.mulu[i].mulu[j].code+' name='+list.mulu[i].mulu[j].name+' mtradm='+list.mulu[i].mulu[j].mtradm+'><b></b><a title='+list.mulu[i].mulu[j].name+' >'+list.mulu[i].mulu[j].name+'</a><i title="删除" class="del"></i><i title="添加" class="add"></i><i title="向下" class="down"></i><i title="向上" class="up"></i></span>';
				for(var m=0; m<list.mulu[i].mulu[j].mulu.length; m++){
//					console.log(list.mulu[i].mulu[j].mulu[m])
					l_str += '<li><span  class="mlclass" code='+list.mulu[i].mulu[j].mulu[m].code+' name='+list.mulu[i].mulu[j].mulu[m].name+' mtradm='+list.mulu[i].mulu[j].mulu[m].mtradm+'><a title='+list.mulu[i].mulu[j].mulu[m].name+' >'+list.mulu[i].mulu[j].mulu[m].name+'</a><i title="删除" class="del"></i><i title="向下" class="down"></i><i title="向上" class="up"></i></li>'
				}
				l_str += '</ul>';
			}
			l_str += '</div>';
		}
		$('.catalog').nextAll().remove();
		$('.catalog').after(l_str);
		
		
//		生成中间部分
		var i_str = '';
		i_str += '<div class="import_mask new "  style="z-index:10"><i title="点击插入空白编辑区域"></i><b title="点击删除所选编辑区域" class="del"></b><div>双击进行编辑</div><i title="点击插入空白编辑区域"></i></div>';
		
		if(file.YBType){// 空白研报
			i_str +='';// 空白研报没有封面
		}else{//智能研报
			i_str += '<div class="fengmian" style="font-size:20px;text-align:center;height:1200px;"><div style="margin-top:500px"><div id="change_title" style="font-size:40px;" >'+title+'</div><br/><div>企业名称:<span class="qiyename">'+content.split("(")[0]+'</span></div><div>股票代码:<span>'+stockCode+'</span></div></div></div>';
		}
		for(var i=0; i<list.mulu.length; i++){
//			console.log(list.mulu[i])
			i_str += '<div class="clear"><h1 id='+list.mulu[i].mtradm+' code='+list.mulu[i].code+' name='+list.mulu[i].name+' mtradm='+list.mulu[i].mtradm+'><b></b><em>'+list.mulu[i].index+'  '+list.mulu[i].name+'</em><i title="点击删除所选目录" class="del"></i><i title="点击进行目录修改" class="change"></i><i title="点击添加内容" class="add"></i></h1>';
			if(file[list.mulu[i].mtradm]){
				for(var k=0;k<file[list.mulu[i].mtradm].length;k++){
					var text = file[list.mulu[i].mtradm][k].dom;
					i_str += '<div id="'+list.mulu[i].mtradm+'_'+k+'"	>'+text+'</div>';
				}
			}else{
			}
			for(var j=0; j<list.mulu[i].mulu.length; j++){
				i_str += '<div class="clear" ><h2 id='+list.mulu[i].mulu[j].mtradm+' code='+list.mulu[i].mulu[j].code+' name='+list.mulu[i].mulu[j].name+' mtradm='+list.mulu[i].mulu[j].mtradm+'><b></b><em>'+list.mulu[i].index+"."+list.mulu[i].mulu[j].index+'  '+list.mulu[i].mulu[j].name+'</em><i title="点击删除所选目录" class="del"></i><i title="点击进行目录修改" class="change"></i><i title="点击添加内容" class="add"></i></h2>';
				if(file[list.mulu[i].mulu[j].mtradm]){
					for(var k=0;k<file[list.mulu[i].mulu[j].mtradm].length;k++){
						var text = file[list.mulu[i].mulu[j].mtradm][k].dom;
						i_str += '<div id="'+list.mulu[i].mtradm+'_'+k+'"	>'+text+'</div>';
					}
				}else{
				}
				for(var n=0; n<list.mulu[i].mulu[j].mulu.length; n++){
//					console.log(list.mulu[i].mulu[j].mulu[n])
					i_str += '<div class="clear" ><h3 id='+list.mulu[i].mulu[j].mulu[n].mtradm+' code='+list.mulu[i].mulu[j].mulu[n].code+' name='+list.mulu[i].mulu[j].mulu[n].name+' mtradm='+list.mulu[i].mulu[j].mulu[n].mtradm+'><b></b><em>'+list.mulu[i].index+"."+list.mulu[i].mulu[j].index+"."+list.mulu[i].mulu[j].mulu[n].index+'  '+list.mulu[i].mulu[j].mulu[n].name+'</em><i title="点击删除所选目录" class="del"></i><i title="点击进行目录修改" class="change"></i><i title="点击添加内容" class="add"></i></h3>'
					if(file[list.mulu[i].mulu[j].mulu[n].mtradm]){
						for(var k=0;k<file[list.mulu[i].mulu[j].mulu[n].mtradm].length;k++){
							var text = file[list.mulu[i].mulu[j].mulu[n].mtradm][k].dom;
							i_str += '<div id="'+list.mulu[i].mulu[j].mulu[n].mtradm+'_'+k+'"	>'+text+'</div>';
						}
					}else{
					}
					i_str += '</div>'
				}
				i_str += '</div>'
			}
			i_str += '</div>'
		}
		$('.import_').empty();
		$('.import_').append(i_str);
		
//		生成hover蒙版部分
		$(".middle_middle h1,.middle_middle h2,.middle_middle h3").nextAll("div[id]").mouseenter(function() {
			//当前被选中的内容
			var context = $(this).html();
			toMask(this);
			//拿到唯一标记
			window.mtradm = $(this).prevAll('h3').attr('mtradm');
			//拿到当前标记下的索引
			window.index = $(this).index();
			var sender = this;
			var obj = new ShowMask(sender);
			obj.show();
			$("div.import_mask i").unbind("click").click(function(){
				var obj = new AddBlcok($("div.table "), $(sender));
				console.log(1)
				obj.insertBlock(this);
				
			})
		})
		
//		记录打开关闭状态
		$('.middle_left .catalog_').each(function(k,v){
			if($(this).find('span').attr('code') == '0'){
				$(this).find('span').addClass('on');
				$(this).find('ul').show();
			}else{
				$(this).find('span').removeClass('on');
				$(this).find('ul').hide();
			}
		})
		
		$('.middle_left ul').each(function(k,v){
			if($(this).find('span').attr('code') == '0'){
				$(this).find('span').addClass('on');
				$(this).find('li').show();
			}else{
				$(this).find('span').removeClass('on');
				$(this).find('li').hide();
			}
		})
	}
	refreshList();
	
	//中间部分 删除目录内 div中的内容
	$('.import_mask b.del').unbind("click").live('click',function(){
		var $this = $(this);
		$('div.import_mask').hide(); 
		$('.mask').show();
		$('.mask .alert .confirm').unbind("click").live('click',function(){
			var mtradm =$this.attr("mtradm");
			var index = $this.attr("index");
			file[mtradm].splice(index-1,1)
			$('.mask').hide();
			
			
			refreshList();
			$('div.import_mask').hide(); 
		})
	})
	
//	点击标题 显示隐藏
	$('.biaoti').on('click',function(){
		if($(this).next().is(':hidden')){
			$(this).next().show();
		}else{
			$(this).next().hide();
		}
	})
//	编辑
	$('.edit').on('click',function(){
		$('.class1').show();
		$('.class2').hide();
		$('.middle_left').show();
		$('.middle_right').show();
		$('.jindu_1').removeClass('jindu_4');
		$('.jindu_2').removeClass('jindu_5');
	})
//	保存
	$('.save').on('click',function(){
		//保存按钮不可点击 出现蒙版
// 		$('.save').attr('disabled','disabled');
		$(".save1_mask").show();
		$(".save1_mask .confirm").on("click",function(){
			$('.save1_mask').hide();
			$('.save_mask').show();
	    // 清除空白区域
		$(".new_insert_table").remove();
		title = $('.yanbao_name').html()
		file["echartsOptions"] =  echartsOptions;
		var file1 = JSON.stringify(file);
		var list1 = JSON.stringify(list);
		var userId = localStorage.getItem("userId");
		
		function succ(){
					$('.class1').hide();
					$('.class2').show();
					$("#export").hide();
					$('.middle_left').hide();
					$('.middle_right').hide();
					$('.jindu_1').addClass('jindu_4');
					$('.jindu_2').addClass('jindu_5');
					$('.save_mask .confirm').show();
					$('.save_mask .alert .change').html('保存成功');
					$('.save_mask .confirm').live('click',function(){
						$('.save_mask').hide();
						$('.save_mask .alert .change').html('正在保存中。。。请稍等。。。');
						$('.save_mask .confirm').hide();
					})
		//			window.open('/saasBeta/myResearch/researchReport.html','_self')
		}
		function err(){
					$('.save_mask .confirm').show();
					$('.save_mask .alert .change').html('保存失败');
					$('.save_mask .confirm').live('click',function(){
						$('.save_mask').hide();
						$('.save_mask .alert .change').html('正在保存中。。。请稍等。。。');
					})
		}
		if(reportSaveId == "" || reportSaveId == undefined || reportSaveId == "null")
		{
		
			$.ajax({
				url: '/beta/report/insertReport.do',
				type: 'post',
				dataType: "json",
				async:true,
				data: {
					'userId': userId,
					'reportName': title,
					'reportObject': content,
					'objectCode': stockCode,
					'reportType': 0,
					'reportCatalog': list1,
					'reportContext': file1
				},
				success: function(res){
      //               $.PostJsonData("/beta/report/findReportPageList.do",{"userId":localStorage.getItem("userId"),"currentPage":currentPage,"pageSize":pageSize},false,function(data){
						// if(data.code=="0000"){
	     //                }
      //           	}
                    reportSaveId = res.result.id;
					$.YanbaoLogJsonData({"reportName":title,"reportObject":content,"dataName":content,"dataObject":content,"eventType":1},true,function(data){
						//console.log(data);
						
					});
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"创建研报《"+title+"》"},true,function(data){});
                    					
					
					succ();
				},
				error: function(res){
					err();
				}
			})
		}else {
			
			title = $('.yanbao_name').html()
			$.ajax({
				url: '/beta/report/editReportInfo.do',
				type: 'post',
				dataType: "json",
				async:true,
				data: {
					'userId': userId,
					'id': reportSaveId,
					'reportName': title,
					'reportObject': content,
					'objectCode': stockCode,
					'reportType': 0,
					'reportCatalog': list1,
					'reportContext': file1
				},
				success: function(res){
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"编辑研报《"+title+"》"},true,function(data){});
					succ();
				},
				error: function(res){
					err();
				}
			})
		}
		})

		$(".save1_mask .cancel").on("click",function(){
			$(".save1_mask").hide();
		})
		$(".wyblist").css("display","block");
		$("#export").css("display","none!important;");
	})
	
	$(".wyblist").on("click",function(){
		window.open("../myResearch/researchReport.html");
	})
	
//	显示
//	一级目录
	$('.middle_left .catalog_>span').live('mouseover',function(){
		if($(this).parent().prev('.catalog_').length && $(this).parent().next('.catalog_').length){
			$(this).find('i').show();
		}else if($(this).parent().prev('.catalog_').length && !$(this).parent().next('.catalog_').length){
			$(this).find('i').show();
			$(this).children('.down').hide();
		}else if(!$(this).parent().prev('.catalog_').length && $(this).parent().next('.catalog_').length){
			$(this).find('i').show();
			$(this).children('.up').hide();
		}else{
			$(this).find('i').show();
			$(this).children('.up').hide();
			$(this).children('.down').hide();
		}
	})
//	二级目录
	$('.middle_left .catalog_ ul>span').live('mouseover',function(){
		if($(this).parent().prev('ul').length && $(this).parent().next('ul').length){
			$(this).find('i').show();
		}else if($(this).parent().prev('ul').length && !$(this).parent().next('ul').length){
			$(this).find('i').show();
			$(this).children('.down').hide();
		}else if(!$(this).parent().prev('ul').length && $(this).parent().next('ul').length){
			$(this).find('i').show();
			$(this).children('.up').hide();
		}else{
			$(this).find('i').show();
			$(this).children('.up').hide();
			$(this).children('.down').hide();
		}
	})
//	三级目录
	$('.middle_left .catalog_ ul>li>span').live('mouseover',function(){
		if($(this).parent().prev('li').length && $(this).parent().next('li').length){
			$(this).find('i').show();
		}else if($(this).parent().prev('li').length && !$(this).parent().next('li').length){
			$(this).find('i').show();
			$(this).children('.down').hide();
		}else if(!$(this).parent().prev('li').length && $(this).parent().next('li').length){
			$(this).find('i').show();
			$(this).children('.up').hide();
		}else{
			$(this).find('i').show();
			$(this).children('.up').hide();
			$(this).children('.down').hide();
		}
	})
//	消失
	$('.middle_left .catalog_ span').live('mouseout',function(){
		$(this).find('i').hide();
	})
		
		
		
		
		
	$('.middle_middle .import .import_ h1 , .middle_middle .import .import_ h2 , .middle_middle .import .import_ h3').live('mouseover',function(){
		if($('.edit').is(":hidden")){
			$(this).css({'background':'#b0d5f7','opacity':'0.7'});
			$(this).find('i.change').show();
			$(this).find('i.del').show();
			
			if($(this).nextAll().length== 0)
				$(this).find('i.add').show();
		}else{
			return;
		}
	})
	$('.middle_middle .import .import_ h1 , .middle_middle .import .import_ h2 , .middle_middle .import .import_ h3').live('mouseout',function(){
		if($('.edit').is(":hidden")){
			$(this).css({'background':'#ffffff','opacity':'1'});
			$(this).find('i.change').hide();
			$(this).find('i.del').hide();
			$(this).find('i.add').hide();
		}else{
			return;
		}
	})
		
//	头部左右fix
	$(window).on('scroll',function(){
		var stop = 195 - $(window).scrollTop() +'px';
		if($(window).scrollTop() > 70){
			$('.title2').addClass('title2fix');
			$('.middle_left').css({'top':'124px'});
			$('.middle_right').css({'top':'124px'});
//			$('.middle_middle').css('margin-top','200px');
//			$('.middle_middle .import').css('margin-top','104px');
//			$('.middle_middle .import').css('border-top','200px solid #000');
			offsetheight = $(window).height() - 165  + 'px';
		}else{
			$('.title2').removeClass('title2fix');
			$('.middle_left').css({'top':stop});
			$('.middle_right').css({'top':stop});
//			$('.middle_middle').css('margin-top','200px');
//			$('.middle_middle .import').css('margin-top','20px');
			offsetheight = $(window).height() - $('.middle_left').offset().top - 40 + 'px';
//			console.log($('.middle_left').offset().top);
			
		}
//		左右高度
		$('.middle_left , .middle_right').css({'height':offsetheight});
	})
	$(window).on('load',function(){
		if($(window).scrollTop() > 70){
			$('.middle_left').css('height',$(window).height() - 165+ 'px');
			$('.middle_right').css('height',$(window).height() -165+ 'px');
		}else{
			$('.middle_left').css('height',$(window).height() - $('.middle_left').offset().top - 40 + 'px');
			$('.middle_right').css('height',$(window).height() - $('.middle_left').offset().top - 40 + 'px');
		}
	})
//	右侧选项卡
	$('.middle_right ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.middle_right .list_main > div').eq($(this).index()).show().siblings().hide();
		
	})
		
//	点击叉号关闭弹框
	$(".tankuang .closeT").on("click",function(){
		$(".tankuang").attr("style","display:none;")
	})
//	打开弹框
	$("#zb_list").on("click","li.zb_list_two",function(){
		$(".tankuang").attr("style","display:block;")
	})
		
	
//	研报标题 及修改
	$('.title2_ i').on('click',function(){
		$(".yanbao_name_edit").show();
		$(".yanbao_name,#yanbao_name_icon").hide();
		var val=$('.yanbao_name').html();
		$(".yanbao_name_edit").find("input:eq(0)").val(val);
	})
//	保存标题
	$(".yanbao_name_edit input:eq(1)").on("click",function(){
		var html=$(".yanbao_name_edit input:eq(0)").val();
		if(html=="" || html==null){
			var txt=  "请输入研报标题";
			var option = {
				title: "提示",
				btn: parseInt("0001",2),
			}
			window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
    			return false;
		}
		if(html.length>30){
			var txt=  "研报标题超出限制字数，请保持在30个字符以内！";
			var option = {
				title: "提示",
				btn: parseInt("0001",2),
			}
			window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
    			return false;
		}
		$(".yanbao_name_edit").hide();
		$(".yanbao_name,#yanbao_name_icon").show();
		
		$(".yanbao_name").html(html).attr("title",html);
		$("#change_title").html(html);
		
	})
	
	$('.changetitle_mask .confirm').on('click',function(){
		var nname = $('.changetitle_mask .newlistname').val();
		if(nname.length)
		$('.yanbao_name').html(nname);
		list.name = $('.changetitle_mask .newlistname').val();
		$('.changetitle_mask').hide();
	})
	$('.changetitle_mask .cancel').on('click',function(){
		$('.changetitle_mask').hide();
	})
	
	var title=getUrlParam("title");
	$(".title2_ .yanbao_name").html(title).attr("title",title);
	list.name = title
		
//	打印
	$('.preview').on('click',function(){
		if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
			 PageSetup_Default();
		}
		//PageSetup_Null();
		
		$(".import").jqprint({ operaSupport: true });
		//
		//$("#export-content").wordExport();
		//$("#export-content").jqprint();
// 		if ($.browser.msie) {
//                 //IE浏览器执行
//                 printitIE('export-content');
//             } else {
//                 //其他浏览器执行通用打印
//                 $("#export-content").jqprint();
//             }
	})
	    var HKEY_Root, HKEY_Path, HKEY_Key;
        HKEY_Root = "HKEY_CURRENT_USER";
        HKEY_Path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
       function printitIE(MyDiv) {
            PageSetup_Null();
            //提示窗口
            if (confirm('确定打印吗？')) {
                var newstr = document.getElementById(MyDiv).innerHTML;
                document.body.innerHTML = "<div style='position:absolute;left:20px;top:20px;'>" + newstr + "</div>";
                window.print();
                return false;
            }
        }

        function PageSetup_Null() {
            try {
                var Wsh = new ActiveXObject("WScript.Shell");
                HKEY_Key = "header";
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
                HKEY_Key = "footer";
                Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, ""); 
            }
            catch (e) { }
        }
		// 设置页眉页脚为默认值  
		function PageSetup_Default()  
		{  
		try{  
		 var RegWsh = new ActiveXObject("WScript.Shell") ;  
		 HKEY_Key="header" ;  
		 RegWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key,"&w&b页码，&p/&P") ;  
		 HKEY_Key="footer" ;  
		 RegWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key,"&u&b&d") ;  
		 }  
		catch(e){}  
		}   
	$('.export').on('click',function(){
		$(".import_").wordExport(getUrlParam("title"));
		  // var pdf = new jsPDF('', 'px', 'a4');
    //             pdf.internal.scaleFactor = 1;
    //             var options = {
    //                 pagesplit: true
    //             };
    //             //$('.pdf-wrapper')
    //             pdf.addHTML($(".import"), options, function() {
    //                 console.log(pdf);
    //                 pdf.save('导出.pdf');
    //             });
	})
		
		
//    日历插件
	  laydate.render({
	      elem: '.start-date',
	      position:'fixed'
	  });
	  laydate.render({
	      elem: '.end-date',
	      position:'fixed'
	  });
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//点击b标签 显示隐藏 
		$('.middle_left .catalog_>span b , .middle_left .catalog_>ul b').live('click',function(){
			
			var _C = CatalogManage(list)
			if($(this).parent().attr('code') == '0'){
				_C.SetCode($(this).parent().attr('mtradm'),'1');
			}else{
				_C.SetCode($(this).parent().attr('mtradm'),'0');
			}
			
			$(this).parent().parent().find('ul').toggle();
			$(this).parent().parent().find('li').toggle();
			if($(this).hasClass('on')){
				$(this).removeClass('on');
			}else{
				$(this).addClass('on');
			}
			refreshList();
		})
	
		//交换位置向下
		$('.middle_left .down').live('click',function(){
			var _C = CatalogManage(list)
			_C.MoveCatalog($(this).parent().attr('mtradm'),'down');
			refreshList();
		})
		//交换位置向上
		$('.middle_left .up').live('click',function(){
			var _C = CatalogManage(list)
			_C.MoveCatalog($(this).parent().attr('mtradm'),'up');
			refreshList();
		})
		//删除
		$('.middle_left .del , .middle_middle h1 .del , .middle_middle h2 .del , .middle_middle h3 .del').live('click',function(){
			
			var mtradm = $(this).parent().attr('mtradm')
			$('.mask').show();
			$('.mask .alert .confirm').live('click',function(){
				var _C = CatalogManage(list)
				_C.DelCatalog(mtradm);
				$('.mask').hide();
				refreshList();
			})
			$('.mask .alert .cancel').live('click',function(){
				$('.mask').hide();
			})
		})
		//添加
		$('.middle_left .add').live('click',function(){
			var _C = CatalogManage(list)
			_C.AddCatalog($(this).parent().attr('mtradm'));
			refreshList();
		})
		$('.middle_left .setup').live('click',function(){
			var _C = CatalogManage(list)
			_C.AddCatalog(list.mtradm);
			refreshList();
		})
		//修改名称
		$('.middle_middle .change').live('click',function(){
			var name = $(this).parent().attr('name');
			var mtradm = $(this).parent().attr('mtradm')
			$('.change_mask .change .newlistname').val(name)
			$('.change_mask').show();
			$('.change_mask .change_button .confirm').unbind('click').click(function(){
				var name = $('.change_mask .change .newlistname').val();
				if(name.trim()=="")
				{
					alert("请输入目录名称!")
					return;
				}
				
				var _C = CatalogManage(list);
				_C.EditCatalog(mtradm,name);
				$('.change_mask').hide();
				refreshList();
			})
			$('.change_mask .change_button .cancel').live('click',function(){
				$('.change_mask').hide();
			})
		})
		
		//空目录添加内容
		$('.middle_middle h1 i.add,.middle_middle h2 i.add,.middle_middle h3 i.add').live('click',function(){
			//保证空块在页面中和FILE中的唯一性
			$("div.table").remove();
			var newBlock = "<div class='table new_insert_table' style='min-height:50px;width:99%'>双击此处进行编辑或作为插入的区域</div>"
			$(this).parent().after(newBlock);
			$('div.import_mask').attr("isNew", 1);
			$('div.import_mask').attr("mtradm", $(this).parent().attr('mtradm'));
			$('div.import_mask').attr("index", 1);
			//hover蒙版
				$(this).parent().nextAll().unbind("mouseenter").mouseenter(function() {
					//当前被选中的内容
					toMask(this);
					var sender = this;
					var obj = new ShowMask(sender);
					obj.show();
					$("div.import_mask i").unbind("click").click(function(){
						var obj = new AddBlcok($("div.table"), $(sender));
						console.log(1)
						obj.insertBlock(this);
					})
				})
		})
		$(".mlclass").live('click',function(){
      
		 // alert($("#"+$(this).attr("mtradm")).offset().top);
		  var pos = parseFloat($("#"+$(this).attr("mtradm")).offset().top)-130;
		  //alert(pos)
       	   $(document).scrollTop(pos);
       }
    );
})
