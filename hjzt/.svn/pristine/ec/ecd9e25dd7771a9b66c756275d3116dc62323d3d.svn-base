var refreshList;

$(function(){
	//点击叉号关闭弹框
	$(".tankuang .closeT").on("click",function(){
		$(".tankuang").attr("style","display:none;")
	})
	//打开弹框
	$("#zb_list").on("click","li.zb_list_two",function(){
		$(".tankuang").attr("style","display:block;")
	})
//	$(.middle_left .catalog_>ul b.on).parent().parent().next().children("span").css("margin-top","5px");
	//判断A菇三板
//	function GetRequest() {
//	    var url = location.search; //获取url中"?"符后的字串
//	    var theRequest = new Object();
//	    if (url.indexOf("?") != -1) {
//	        var str = url.substr(1);
//	        strs = str.split("&");
//	        for(var i = 0; i < strs.length; i ++) {
//	            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//	        }
//	    }
//	    return theRequest;
//	}
//	var Request = new Object();
//	Request = GetRequest();

	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = encodeURI(window.location.search).substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	var stockCode = decodeURI(GetQueryString('stockCode'));
	var title = decodeURI(GetQueryString('title'));
	var content = decodeURI(GetQueryString('content'));
	
	var newyb = decodeURI(GetQueryString('newyb'));
	
	if (newyb == 1){
	//新建
		if(isXSBCompany(stockCode)){
			$.ajax({
				url: '/beta/template/getTemplate.do',
				type: 'post',
				dataType: "json",
				async:false,
				data: {
					'userId': localStorage.getItem("userId"),
					'catalogType': 'SB'
				},
				success: function(res){
					
					file = $.parseJSON(res.result[0].catalogFile);
					list = $.parseJSON(res.result[0].catalogList);
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
					'catalogType': 'A'
				},
				success: function(res){
					
					file = $.parseJSON(res.result[0].catalogFile);
					list = $.parseJSON(res.result[0].catalogList);
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
					$.YanbaoLogJsonData({"reportName":title,"reportObject":content,"dataName":content,"dataObject":content,"eventType":2},true,function(data){});
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
				$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"预览研报《"+title+"》"},true,function(data){});
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
		{
			$.ajax({
				url: '/beta/template/getTemplate.do',
				type: 'post',
				dataType: "json",
				async:false,
				data: {
					'userId': localStorage.getItem("userId"),
					'catalogType': 'BLANK'
				},
				success: function(res){
					
					file = $.parseJSON(res.result[0].catalogFile);
					list = $.parseJSON(res.result[0].catalogList);
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"创建空白研报："+title},true,function(data){});
				}
			})
		}
	}
	
	//研报标题 及修改
//	$('.title2_ .yanbao_name').on('mouseover',function(){$('.title2_ i').show()}).on('mouseout',function(){$('.title2_ i').hide()})
	$('.title2_ i').on('click',function(){
//		$('.changetitle_mask').show();
//		$('.changetitle_mask .newlistname').val($('.yanbao_name').html());
		$(".yanbao_name_edit").show();
		$(".yanbao_name,#yanbao_name_icon").hide();
		var val=$('.yanbao_name').html();
		$(".yanbao_name_edit").find("input:eq(0)").val(val);
	})
	//保存标题
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
//		$('.changetitle_mask .newlistname').on('change',function(){
			var nname = $('.changetitle_mask .newlistname').val();
			if(nname.length)
//			alert(nname)
			$('.yanbao_name').html(nname);
			list.lingji[0].name = $('.changetitle_mask .newlistname').val();
//		})
		$('.changetitle_mask').hide();
	})
	$('.changetitle_mask .cancel').on('click',function(){
		$('.changetitle_mask').hide();
	})
	
	var title=getUrlParam("title");
	$(".title2_ .yanbao_name").html(title).attr("title",title);
	list.lingji[0].name = title
	//左侧 左中联动
	
	


	//生成目录列表 包括左侧和中部及其内部的各个小操作
	refreshList = function (){

		//根据json数组生成目录结构 list_str
		var l_str = ''
 		console.log(list.lingji);
		for(var n=1; n<list.lingji.length; n++){
			l_str += '<div class="catalog_ clear">';
			var lj = list.lingji[n].yiji;
			l_str += '<span pro='+lj[0].pro+' code='+lj[0].code+' name='+lj[0].name+' mtradm='+lj[0].mtradm+'><b></b><em title='+lj[0].name+' >'+lj[0].name+'</em><i class="del"></i><i class="add"></i><i class="down"></i><i class="up"></i></span>';
				for(var i=1;i<lj.length;i++){
//					console.log(lj[i]);
					l_str += '<ul><span pro='+lj[i].erji[0].pro+' code='+lj[i].erji[0].code+' name='+lj[i].erji[0].name+' mtradm='+lj[i].erji[0].mtradm+' ><b></b><em title='+lj[i].erji[0].name+' >'+lj[i].erji[0].name+'</em><i class="del"></i><i class="add"></i><i class="down"></i><i class="up"></i></span>';
					for(var j=1;j<lj[i].erji.length;j++){
//						console.log(lj[i].erji[j].sanji.length);
						for(var m=0; m<lj[i].erji[j].sanji.length; m++){
//							console.log(lj[i].erji[j].sanji[m]);
							l_str += '<li><span pro='+lj[i].erji[j].sanji[m].pro+' code='+lj[i].erji[j].sanji[m].code+' name='+lj[i].erji[j].sanji[m].name+' mtradm='+lj[i].erji[j].sanji[m].mtradm+' ><em title='+lj[i].erji[j].sanji[m].name+' >'+lj[i].erji[j].sanji[m].name+'</em><i class="del"></i><i class="down"></i><i class="up"></i></span></li>';
						}
					}
					l_str += '</ul>';
				}
			l_str += '</div>';
		}
		$('.catalog').nextAll().remove();
		$('.catalog').after(l_str);
			
		
		//根据json数组生成目录控制结构 listadmin_str
		var la_str = ''
		for(var n=1; n<list.lingji.length; n++){
			la_str += '<div class="listadmin_ clear">';
			var lj = list.lingji[n].yiji;
			la_str += '<span pro='+lj[0].pro+' code='+lj[0].code+' name='+lj[0].name+' mtradm='+lj[0].mtradm+'><b></b><i></i><em title='+lj[0].name+' >'+lj[0].name+'</em></span>';
				for(var i=1;i<lj.length;i++){
					la_str += '<ul><span pro='+lj[i].erji[0].pro+' code='+lj[i].erji[0].code+' name='+lj[i].erji[0].name+' mtradm='+lj[i].erji[0].mtradm+' ><b></b><i></i><em title='+lj[i].erji[0].name+' >'+lj[i].erji[0].name+'</em></span>';
					for(var j=1;j<lj[i].erji.length;j++){
						for(var m=0; m<lj[i].erji[j].sanji.length; m++){
							la_str += '<li><span pro='+lj[i].erji[j].sanji[m].pro+' code='+lj[i].erji[j].sanji[m].code+' name='+lj[i].erji[j].sanji[m].name+' mtradm='+lj[i].erji[j].sanji[m].mtradm+' ><b></b><em title='+lj[i].erji[j].sanji[m].name+' >'+lj[i].erji[j].sanji[m].name+'</em></span></li>';
						}
					}
					la_str += '</ul>';
				}
			la_str += '</div>';
		}
		$('.list_mask .listadmin').empty();
		$('.list_mask .listadmin').append(la_str);
			
			
		createyb();		
			
			
			
//		//根据json数组生成 文件结构 import_str
		
		
		//hover蒙版
		$("h3").nextAll().mouseenter(function() {
			
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
		
//		function toMask(ccc){
//			//拿到唯一标记
//			window.mtradm = $(ccc).prevAll('h3').attr('mtradm');
//			//拿到当前标记下的索引
//			window.index = $(ccc).index();
//			var sender = ccc;
//			var obj = new ShowMask(sender);
//			obj.show();
//			$("div.import_mask i").unbind("click").click(function(){
//				var obj = new AddBlcok($("div.table"), $(sender));
//				console.log(1)
//				obj.insertBlock(this);
//			})
//		}

//	alert("end")
	}
	
	refreshList();
	
	//点击i标签目录管理打开折叠
	$('.listadmin_ i').live('click',function(){
		$(this).parent().parent().find('ul').toggle();
		$(this).parent().parent().find('li').toggle();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	})
	$('.listadmin_ b').live('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).parent().nextAll().find('b').removeClass('on');
		}else{
			$(this).addClass('on');
			$(this).parent().nextAll().find('b').addClass('on');
//			$(this).parents().find('b').removeClass('on')
//			if($(this).parent().parent().parent().children('span').nextAll().find('b').hasClass('on')){
//				alert(1);
//			}
		}
	})
	$('.list_mask .alert div .cancel').live('click',function(){
		$('.list_mask').hide();
	})
	
	
	
	//点击b标签 目录打开折叠
	$('.middle_left .catalog_>span b').live('click',function(){
		$(this).parent().parent().find('ul').toggle();
		$(this).parent().parent().find('li').toggle();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	})
	
	
		
		
	$('.middle_left .catalog_>ul b').on("click",function(){
		$(this).parent().parent().find('ul').toggle();
		$(this).parent().parent().find('li').toggle();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	})
	
	//移入移出span 图标显示消失
	//显示
	//一级目录
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
	//二级目录
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
	//三级目录
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
	//消失
	$('.middle_left .catalog_ span').live('mouseout',function(){
		$(this).find('i').hide();
	})
		
	//添加部分
	//左侧添加部分
	//点击最上层目录（0级目录）上的添加
	$('.middle_left .catalog .setup').live('click',function(){
		var newObj={
	            "yiji":[
					{
			            "pro": "first",
			            "code": "1",
			            "name": "一级目录",
			            "mtradm": suiji()
			            
					}
				]
			}
		list.lingji.push(newObj);
		refreshList();
	})
	//点击第一层（一级目录）上的添加
	$('.middle_left .catalog_>span .add').live('click',function(){
		var newObj={
	            "erji":[
					{
			            "pro": "second",
			            "code": "2",
			            "name": "二级目录",
			            "mtradm": suiji()
					}
				]
		}
		var mtradm = $(this).parent().attr('mtradm');
		for(var i=1;i<list.lingji.length;i++){
			if(list.lingji[i].yiji[0].mtradm == mtradm){
				list.lingji[i].yiji.push(newObj);
			}
		}
		refreshList();
	})
	
	var test = file;
	console.log("org test1  ")
	console.log(file)
	//点击第二层（二级目录）上的添加
	$('.middle_left .catalog_ ul>span .add').live('click',function(){
		
		var newObj={
	            "sanji":[
					{
			            "pro": "third",
			            "code": "3",
			            "name": "三级目录",
			            "mtradm": suiji(),
			            "attribute":"words",
						"editor":"1"
					}
				]
		}
		var mtradm = $(this).parent().attr('mtradm');
		console.log('list数据'+list)

		for(var i=1;i<list.lingji.length;i++){
			for(var j=1 ;j<list.lingji[i].yiji.length-1;j++){
				if(list.lingji[i].yiji[j].erji[0].mtradm == mtradm){
					list.lingji[i].yiji[j].erji.push(newObj);
				}
			}
		}
		console.log('list数据'+list)

		//对应的 file
		var mtradm_ = newObj.sanji[0].mtradm
//		console.log(newObj.sanji[0].mtradm)
		var newfileObj = {}
		newfileObj[mtradm_] = [{
					"editor":1,
					"attribute":"words",
					"dom":"<div class='words' style='height:50px;width:100%'>可在此插入内容或添加、编辑内容</div>"
				}]
		console.log("org test2  "+ file)
		console.log("org new  "+ newfileObj)
		console.log(file.length)
		
	    $.extend(file,newfileObj)
	    
	  	
//		console.log("org test3  ")
//		console.log(file.length)
//		console.log(mtradm)
//		console.log(mtradm_)
//		console.log("org test2  ")
//		console.log(file)
//		console.log(list)
//		console.log(newfileObj)
//		
		refreshList();
	})
	console.log("org   "+ JSON.stringify(file))
	
	
	//删除部分
	//左侧删除部分 中间删除目录级部分
	//删除弹窗
	$('.mask .alert .cancel').live('click',function(){
		$('.mask').hide(); 
	})
	//中间部分 目录移入出现删除
	$('.middle_middle .import .import_ h1 , .middle_middle .import .import_ h2 , .middle_middle .import .import_ h3').live('mouseover',function(){
		if($('.edit').is(":hidden")){
			$(this).css({'background':'#b0d5f7','opacity':'0.7'});
			$(this).find('i.change').show();
			$(this).find('i.del').show();
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
	//点击第一层（一级目录）上的删除
	$('.middle_left .catalog_>span .del , .middle_middle h1 i.del').live('click',function(){
		var $this = $(this);
		$('.mask').show();
		$('.mask .alert .confirm').live('click',function(){
			var mtradm = $this.parent().attr('mtradm');
			for(var i=1; i<list.lingji.length; i++){
				if(list.lingji[i].yiji[0].mtradm == mtradm){
					list.lingji.splice(i, 1);
	//				console.log(list.lingji);
				}
			}
			refreshList();
			$('.mask').hide();
		})
	})
	//修改 研报标题
	$('.title2 .title2_ i.change').live('click',function(){
		
		$('.change_mask').show();
		$('.change_mask .change_button .confirm').live('click',function(){
			
			$('.change_mask').hide();
			refreshList();
		})
		$('.change_mask .change_button .cancel').live('click',function(){
			$('.change_mask').hide();
		})
	})
	//一级目录上的修改目录
	$('.middle_middle h1 i.change').live('click',function(){
		var mtradm = $(this).closest('h1').attr('mtradm');
		var name = $(this).closest('h1').attr('name');
		$('.change_mask .change .newlistname').val(name);
		$('.change_mask').show();
		$('.change_mask .change_button .confirm').live('click',function(){
			for(var i=1; i<list.lingji.length; i++){
				if(list.lingji[i].yiji[0].mtradm == mtradm){
					list.lingji[i].yiji[0].name = $('.change_mask .change .newlistname').val();
				}
			}
			$('.change_mask').hide();
			refreshList();
		})
		$('.change_mask .change_button .cancel').live('click',function(){
			$('.change_mask').hide();
		})
	})
									
										
										
										
	//点击第二层（二级目录）上的删除
	$('.middle_left .catalog_ ul>span .del , .middle_middle h2 i.del').live('click',function(){
		var $this = $(this);
		$('.mask').show();
		$('.mask .alert .confirm').live('click',function(){
		var mtradm = $this.parent().attr('mtradm')
			for(var i=1; i<list.lingji.length; i++){
	//			console.log(list.lingji)
				for(var j=1; j<list.lingji[i].yiji.length; j++){
					if(list.lingji[i].yiji[j].erji[0].mtradm == mtradm){
						list.lingji[i].yiji.splice(j, 1);
						console.log(list.lingji[i].yiji);
					}
				}
			}
		})
		refreshList();
		$('.mask').hide();
	})
	//二级目录上的修改目录
	$('.middle_middle h2 i.change').live('click',function(){
		var mtradm = $(this).closest('h2').attr('mtradm')
		var name = $(this).closest('h2').attr('name');
		$('.change_mask .change .newlistname').val(name);
		$('.change_mask').show();
		$('.change_mask .change_button .confirm').live('click',function(){
			for(var i=1; i<list.lingji.length; i++){
				for(var j=1; j<list.lingji[i].yiji.length; j++){
					if(list.lingji[i].yiji[j].erji[0].mtradm == mtradm){
						list.lingji[i].yiji[j].erji[0].name = $('.change_mask .change .newlistname').val();
					}
				}
			}
			$('.change_mask').hide();
			refreshList();	
		})
		$('.change_mask .change_button .cancel').live('click',function(){
			$('.change_mask').hide();
		})
	})
	
	
	//点击第三层 （三级目录）上的删除
	$('.middle_left .catalog_ ul>li>span .del , .middle_middle h3 i.del').live('click',function(){
		var $this = $(this);
		$('.mask').show();
		$('.mask .alert .confirm').live('click',function(){
			var mtradm = $this.parent().attr('mtradm');
	//		alert(mtradm)
			for(var i=1;i<list.lingji.length;i++){
				for(var j=1 ;j<list.lingji[i].yiji.length;j++){
					for(var m=1 ;m<list.lingji[i].yiji[j].erji.length;m++){
						for(var n=0; n<list.lingji[i].yiji[j].erji[m].sanji.length;n++){
	//						console.log(list.lingji[i].yiji[j].erji[m].sanji[n])
							if(list.lingji[i].yiji[j].erji[m].sanji[n].mtradm == mtradm){
								list.lingji[i].yiji[j].erji[m].sanji.splice(n,1);
							}
						}
					}
				}
			}
		})
		refreshList();
		$('.mask').show();
	})
	//三级目录上的修改目录
	$('.middle_middle h3 i.change').live('click',function(){
		var mtradm = $(this).closest('h3').attr('mtradm');
		var name = $(this).closest('h3').attr('name');
		$('.change_mask .change .newlistname').val(name);
		$('.change_mask').show();
		$('.change_mask .change_button .confirm').live('click',function(){
			for(var i=1;i<list.lingji.length;i++){
				for(var j=1 ;j<list.lingji[i].yiji.length;j++){
					for(var m=1 ;m<list.lingji[i].yiji[j].erji.length;m++){
						for(var n=0; n<list.lingji[i].yiji[j].erji[m].sanji.length;n++){
	//						console.log(list.lingji[i].yiji[j].erji[m].sanji[n])
							if(list.lingji[i].yiji[j].erji[m].sanji[n].mtradm == mtradm){
								list.lingji[i].yiji[j].erji[m].sanji[n].name = $('.change_mask .change .newlistname').val();
							}
						}
					}
				}
			}
			$('.change_mask').hide();
			refreshList();	
		})
		$('.change_mask .change_button .cancel').live('click',function(){
			$('.change_mask').hide();
		})
	})
	
	//交换部分
	//左侧交换部分
	//点击第一层（一级目录）上的向上交换
	$('.middle_left .catalog_>span .up').live('click',function(){
		var mtradm = $(this).parent().attr('mtradm');
		for(var i=1; i<list.lingji.length; i++){
			if(list.lingji[i].yiji[0].mtradm == mtradm){
				var jiaohuan = list.lingji.splice(i,1)[0]
//				console.log(jiaohuan);
				list.lingji.splice(i-1,0,jiaohuan);
			}
		}
		refreshList();
	})
	//点击第一层（一级目录）上的向下交换
	$('.middle_left .catalog_>span .down').live('click',function(){
		var mtradm = $(this).parent().attr('mtradm')
		for(var i=1; i<list.lingji.length; i++){
			if(list.lingji[i].yiji[0].mtradm == mtradm){
				var jiaohuan = list.lingji.splice(i,1)[0];
				list.lingji.splice(i+1,0,jiaohuan);
			}
		}
		refreshList();
	})
	//点击第二层（二级目录）上的向上交换
	$('.middle_left .catalog_ ul>span .up').live('click',function(){
		var mtradm = $(this).parent().attr('mtradm')
		for(var i=1; i<list.lingji.length; i++){
			for(var j=1; j<list.lingji[i].yiji.length; j++){
				if(list.lingji[i].yiji[j].erji[0].mtradm == mtradm){
					var jiaohuan = list.lingji[i].yiji.splice(j,1)[0]
//					console.log(jiaohuan);
					list.lingji[i].yiji.splice(j-1,0,jiaohuan);
				}
			}
		}
		refreshList();
	})
	//点击第二层（二级目录）上的向下交换
	$('.middle_left .catalog_ ul>span .down').live('click',function(){
		var mtradm = $(this).parent().attr('mtradm')
		for(var i=1; i<list.lingji.length; i++){
			for(var j=1; j<list.lingji[i].yiji.length; j++){
				if(list.lingji[i].yiji[j].erji[0].mtradm == mtradm){
					var jiaohuan = list.lingji[i].yiji.splice(j,1)[0]
//					console.log(jiaohuan);
					list.lingji[i].yiji.splice(j+1,0,jiaohuan);
				}
			}
		}
		refreshList();
	})
	
	//点击第三层（三级目录）上的向上交换
	$('.middle_left .catalog_ ul>li>span .up').live('click',function(){
		var mtradm = $(this).parent().attr('mtradm')
		for(var i=1;i<list.lingji.length;i++){
			for(var j=1 ;j<list.lingji[i].yiji.length;j++){
				for(var m=1 ;m<list.lingji[i].yiji[j].erji.length;m++){
					for(var n=0; n<list.lingji[i].yiji[j].erji[m].sanji.length;n++){
						if(list.lingji[i].yiji[j].erji[m].sanji[n].mtradm == mtradm){
							var jiaohuan = list.lingji[i].yiji[j].erji[m].sanji.splice(n,1)[0];
							list.lingji[i].yiji[j].erji[m].sanji.splice(n-1,0,jiaohuan);
						}
					}
				}
			}
		}
		refreshList();
	})
	//点击第三层（三级目录）上的向下交换
	$('.middle_left .catalog_ ul>li>span .down').live('click',function(){
		var mtradm = $(this).parent().attr('mtradm')
		for(var i=1;i<list.lingji.length;i++){
			for(var j=1 ;j<list.lingji[i].yiji.length;j++){
				for(var m=1 ;m<list.lingji[i].yiji[j].erji.length;m++){
					for(var n=0; n<list.lingji[i].yiji[j].erji[m].sanji.length;n++){
						if(list.lingji[i].yiji[j].erji[m].sanji[n].mtradm == mtradm){
							var jiaohuan = list.lingji[i].yiji[j].erji[m].sanji.splice(n,1)[0];
							list.lingji[i].yiji[j].erji[m].sanji.splice(n+1,0,jiaohuan);
						}
					}
				}
			}
		}
		refreshList();
	})
	
	//中间部分 删除目录内 div中的内容
	$('.import_mask b.del').live('click',function(){
		var $this = $(this);
		$('div.import_mask').hide(); 
		$('.mask').show();
		$('.mask .alert .confirm').live('click',function(){
	//		var mtradm = window.mtradm;
	//		var index = window.index;
			var mtradm =$this.attr("mtradm");
			var index = $this.attr("index");
	//		$('.middle_middle .import .import_ h3[mtradm='+mtradm+']').siblings().eq(index-1).css('background','red');
	
	
			
			file[mtradm].splice(index-1,1)
			$('.mask').hide();
		
		refreshList();
		
		if(file[mtradm].length==0)
		{
			var newBlock = "<div class='table new_insert_table' style='min-height:50px;width:99%'>双击此处进行编辑或作为插入的区域</div>"
			$("h3[mtradm="+mtradm+"]").parent().append(newBlock)
			//hover蒙版
		$("h3").nextAll().mouseenter(function() {
			
			//当前被选中的内容
			var context = $this.html();
			
	
			toMask(this);
			//拿到唯一标记
			window.mtradm = $this.prevAll('h3').attr('mtradm');
			//拿到当前标记下的索引
			window.index = $this.index();
			
			
			
			
			var sender = this;
			
			var obj = new ShowMask(sender);
			
			obj.show();
			
			$("div.import_mask i").unbind("click").click(function(){
				
				var obj = new AddBlcok($("div.table"), $(sender));
				console.log(1)
				obj.insertBlock(this);
				
			})
		})
		
		}
		})
	})
	
	//头部左右fix

	$(window).on('scroll',function(){
		var stop = 195 - $(window).scrollTop() +'px';
		if($(window).scrollTop() > 70){
			$('.title2').addClass('title2fix');
			$('.middle_left').css({'top':'124px'});
			$('.middle_right').css({'top':'124px'});
			$('.middle_middle .import').css('margin-top','104px');
			offsetheight = $(window).height() - 165  + 'px';
		}else{
			$('.title2').removeClass('title2fix');
			$('.middle_left').css({'top':stop});
			$('.middle_right').css({'top':stop});
			$('.middle_middle .import').css('margin-top','20px');
			offsetheight = $(window).height() - $('.middle_left').offset().top - 40 + 'px';
			console.log($('.middle_left').offset().top)
		}
//		console.log($('.middle_left').offset().top - $(window).scrollTop())
//		console.log($(window).height() - $('.middle_left').offset().top)
		
		//左右高度
		$('.middle_left , .middle_right').css({'height':offsetheight});
	})
	$(window).on('load',function(){
//		$('.middle_left').css('height',$(window).height() - $('.middle_left').offset().top - 40 + 'px');
//		$('.middle_right').css('height',$(window).height() - $('.middle_left').offset().top - 40 + 'px');
if($(window).scrollTop() > 70){
$('.middle_left').css('height',$(window).height() - 165+ 'px');
		$('.middle_right').css('height',$(window).height() -165+ 'px');
}else{
			$('.middle_left').css('height',$(window).height() - $('.middle_left').offset().top - 40 + 'px');
		$('.middle_right').css('height',$(window).height() - $('.middle_left').offset().top - 40 + 'px');
}
		
	})
	
	
	//右侧选项卡
	$('.middle_right ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.middle_right .list_main > div').eq($(this).index()).show().siblings().hide();
		
	})
	
	//右侧隐藏  因找不到图片 暂时隐藏
//	$('.hideimg').on('click',function(){
////		console.log($('.middle_right').width())
//		if($('.middle_right').width() != 0){
//			$('.middle_right').css({'width':'0'});
//			$('.list_main .biaoti i').css({'width':'0'});
//		}else{
//			$('.middle_right').css({'width':'15%'});
//			$('.list_main .biaoti i').css({'width':'12px'});
//		}
//	})
	
	//点击标题 显示隐藏
	$('.biaoti').on('click',function(){
		
		if($(this).next().is(':hidden')){
//			$('.biaoti_').hide();
			$(this).next().show();
		}else{
			$(this).next().hide();
		}
	})
	//编辑
	$('.edit').on('click',function(){
		$('.class1').show();
		$('.class2').hide();
		$('.middle_left').show();
		$('.middle_right').show();
		$('.jindu_1').removeClass('jindu_4');
		$('.jindu_2').removeClass('jindu_5');
	})
	//保存
	$('.save').on('click',function(){
		//保存按钮不可点击 出现蒙版
// 		$('.save').attr('disabled','disabled');
		$(".save1_mask").show();
		$(".save1_mask .confirm").on("click",function(){
			$(".save1_mask").hide();
			$('.save_mask').show();
	    // 清除空白区域
		$(".new_insert_table").remove();
		title = $('.yanbao_name').html()
		var file1 = JSON.stringify(file);
		var list1 = JSON.stringify(list);
		var userId = localStorage.getItem("userId");
		
		function succ(){
					$('.class1').hide();
					$('.class2').show();
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
		if(newyb == 1){
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
					succ();
					$.YanbaoLogJsonData({"reportName":title,"reportObject":content,"dataName":content,"dataObject":content,"eventType":1},true,function(data){});
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"创建研报《"+title+"》"},true,function(data){});

				},
				error: function(res){
					err();
				}
			})
		}else if(newyb == 2 || newyb == 3){
			var id = decodeURI(GetQueryString('id'));
			title = $('.yanbao_name').html()
			$.ajax({
				url: '/beta/report/editReportInfo.do',
				type: 'post',
				dataType: "json",
				async:true,
				data: {
					'userId': userId,
					'id': id,
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
	})
	$('.preview').on('click',function(){
		PageSetup_Null();
		$(".import").jqprint();
		PageSetup_Default();
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
		 hkey_key="header" ;  
		 RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&w&b页码，&p/&P") ;  
		 hkey_key="footer" ;  
		 RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&u&b&d") ;  
		 }  
		catch(e){}  
		}   
	$('.export').on('click',function(){
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
 

	function createyb()
    {
    	var i_str = '';
		i_str += '<div class="import_mask new "  ><i title="点击插入空白编辑区域"></i><b title="点击删除所选编辑区域" class="del"></b><div>双击进行编辑</div><i title="点击插入空白编辑区域"></i></div>';
//		console.log(list.lingji);
		//alert(stockCode)
		console.log(stockCode)
		if(stockCode == null || stockCode == 'null'){
			i_str +=''
		}else{
			i_str += '<div class="fengmian" style="font-size:20px;text-align:center;height:1200px;"><div style="margin-top:500px"><div id="change_title" style="font-size:40px;" >'+title+'</div><br/><div>企业名称:<span class="qiyename">'+content.split("(")[0]+'</span></div><div>股票代码:<span>'+stockCode+'</span></div></div></div>';
		}
		for(var n=1; n<list.lingji.length; n++){
			
			i_str += '<div>';
			var lj = list.lingji[n].yiji;
			i_str += '<h1 pro='+lj[0].pro+' code='+lj[0].code+' name='+lj[0].name+' mtradm='+lj[0].mtradm+'><b></b><em>'+n+'、'+lj[0].name+'</em><i title="点击删除所选目录" class="del"></i><i title="点击进行目录修改" class="change"></i></h1>';
				for(var i=1;i<lj.length;i++){
//					console.log(lj[i]);
					i_str += '<div class="clear" ><h2 pro='+lj[i].erji[0].pro+' code='+lj[i].erji[0].code+' name='+lj[i].erji[0].name+' mtradm='+lj[i].erji[0].mtradm+' ><b></b><em>'+n+'.'+i+'、'+lj[i].erji[0].name+'</em><i title="点击删除所选目录" class="del"></i><i title="点击进行目录修改" class="change"></i></h2>';
					for(var j=1;j<lj[i].erji.length;j++){
						
//						console.log(lj[i].erji[j].sanji.length);
						for(var m=0; m<lj[i].erji[j].sanji.length; m++){
							
//							console.log(lj[i].erji[j].sanji[m]);
							i_str += '<div><h3 pro='+lj[i].erji[j].sanji[m].pro+' code='+lj[i].erji[j].sanji[m].code+' name='+lj[i].erji[j].sanji[m].name+' mtradm='+lj[i].erji[j].sanji[m].mtradm+' ><em>'+n+'.'+i+'.'+(m+1)+'、'+lj[i].erji[j].sanji[m].name+'</em><i title="点击删除所选目录" class="del"></i><i title="点击进行目录修改" class="change"></i></h3>';
							var mtradm = lj[i].erji[j].sanji[m].mtradm;
//							console.log(mtradm)
							for(var k=0;k<file[mtradm].length;k++){
								var text = file[mtradm][k].dom;
								i_str += '<div id="'+mtradm+'_'+k+'"	>'+text+'</div>';
							}
							i_str +='</div>';
						}
					}
					i_str += '</div>';
				}
			i_str += '</div>';
		}
		$('.import_').empty();
		$('.import_').append(i_str);
		console.log(list);
    }


})