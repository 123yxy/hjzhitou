
(function($){
	
	window.alert = window.alert || {};
	window.alert.editConfirm = function(popHtml, type, options) {
	    var btnType = window.alert.editConfirm.btnEnum;
		var eventType = window.alert.editConfirm.eventEnum;
		var popType = {
			info: {
				title: "选择兴趣行业,信息更对味",
				icon: "0 0",//蓝色i
				btn: btnType.ok
			}
		};
		var itype = type ? type instanceof Object ? type : popType[type] || {} : {};//格式化输入的参数:弹窗类型
		var config = $.extend(true, {
			//属性
			title: "", //自定义的标题
			icon: "", //图标
			btn: btnType.ok, //按钮,默认单按钮
			//事件
			onOk: $.noop,//点击确定的按钮回调
			onCancel: $.noop,//点击取消的按钮回调
			onClose: $.noop//弹窗关闭的回调,返回触发事件
		}, itype, options);
	
	
	
		var $tt = $("<span>").addClass("tt").text("编辑表格");//标题1
		// var $tta = $("<span>").addClass("tta").text("来研料汇金的目的");//标题2
		var icon = config.icon;
	
		var btn = config.btn;//按钮组生成参数
		
		var popId = creatPopId();//弹窗索引
		
		var $box = $("<div>").addClass("editConfirm");//弹窗插件容器
		var $layer = $("<div>").addClass("bc_layer");//遮罩层
		var $popBox = $("<div>").addClass("popBox");//弹窗盒子
		var $ttBox = $("<div>").addClass("ttBox");//弹窗标题
		var $txtBox = $("<div>").addClass("txtBox");//弹窗内容
		var $editor = $("<div>").addClass("editor");//弹窗编辑内容   
			     
		var $family=$("<select>").addClass("family");//选择字体
		var $option=$("<option>").addClass("option").text("默认字体");//选择字体
		var $size=$("<select>").addClass("size");//选择字号
		var $sizeOption=$("<option>").addClass("size_option").text("字号");//选择字体

		var $color=$("<span id='color' hx='#ccc'>").addClass("color mycolor");//选择颜色
		var $colorImg=$("<img src='/saasBeta/js/editForm/images/color.jpg'>").addClass("color_img");//选择颜色
		// <input name="mycolor" id=color" type="text" value="" hx="#ccc" />
		var $weight=$("<img src='/saasBeta/js/editForm/images/weight.jpg'>").addClass("weight");//字体加粗
		var $underline=$("<img src='/saasBeta/js/editForm/images/underline.jpg'>").addClass("underline");//字体下划线
		var $italic=$("<img src='/saasBeta/js/editForm/images/italic.jpg'>").addClass("italic");//字体斜体

		var $form = $("<div>").addClass("form");//弹窗表格内容
		var $formTit=$("<p>").addClass("form_tit").text("1.1.2工商信息");//表格标题
		var $formList=$("<div>").addClass("form_list");//表格列表
		// var $listLf=$("<div>").addClass("list_lf")//左边列表
		// var $listRt=$("<div>").addClass("list_rt")//右边列表
		// var $input=$("<input type='text' placeholder='请输入目录名称'>").addClass("input");//标题输入框
		
		// var $start=$("<div>").addClass("start");//启动样式
		// var $pitch=$("<img src='images/ok.png'>").addClass("pitch");//选中图标
		// var $starText=$("<p>").addClass("star_text").text("启动样式");//启动提示内容
		// var $starTit=$("<p>").addClass("star_tit").text("(支持改变颜色,选择后修改颜色)");//启动提示内容
		
		
		var $btnArea = $("<div>").addClass("btnArea");//按钮区域
		
		var $ok = $("<a>").addClass("sgBtn").addClass("ok").text("保存");//确定按钮
		var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("返回");//取消按钮
		// var $input = $("<input>").addClass("inputBox");//输入框
		var $clsBtn = $("<img src='/saasBeta/js/editForm/images/close.png'>").addClass("clsBtn");//关闭按钮
		
		
		var data=["微软雅黑","宋体","楷体","黑体"];
		console.log(data[0]);
		var family="";
		for(var i=0;i<data.length;i++){
			family+="<option>"+data[i]+"</option>"
		}
		$family.append($option,family);


		var data2=["11","12","13","14","15","16","17","18","19","20","21","22"];
		var size="";
		for(var i=0;i<data2.length;i++){
			size+="<option>"+data2[i]+"</option>"
		}
		$size.append($sizeOption,size);

		var data3=[
				{"tit":"公司名称","cont":"中科软科技股份有限公司"},
				{"tit":"公司法人","cont":"北京时代科技股份有限公司"},
				{"tit":"注册资本","cont":"北京时代科技股份有限公司"},
				{"tit":"所属行业","cont":"北京时代科技股份有限公司"},
				{"tit":"注册地址","cont":"北京时代科技股份有限公司"},
				{"tit":"办公地址","cont":"北京时代科技股份有限公司"},
				{"tit":"成立时间","cont":"北京时代科技股份有限公司"},
				{"tit":"办公电话","cont":"北京时代科技股份有限公司"},
				{"tit":"公司传真","cont":"北京时代科技股份有限公司"},
				{"tit":"公司网址","cont":"北京时代科技股份有限公司"},
				{"tit":"经营期限","cont":"北京时代科技股份有限公司"},
				{"tit":"经营状态","cont":"北京时代科技股份有限公司"},
				{"tit":"登记机关","cont":"北京时代科技股份有限公司"},
				{"tit":"统一信用代码","cont":"北京时代科技股份有限公司"},
				{"tit":"专利","cont":"北京时代科技股份有限公司"},
				{"tit":"著作权","cont":"北京时代科技股份有限公司"},
				{"tit":"经营范围","cont":"北京时代科技股份有限公司"}
		]
		var listLf="";
		for(var i=0;i<data3.length;i++){
			listLf += "<span class='list'>"+
						"<img src='/saasBeta/js/editForm/images/ok.png' class='list_img'>"+
						"<p>"+data3[i].tit+"</p>"+
						"<input value='"+data3[i].cont+"'>"+
					"</span>"
					
		}
		$formList.append(listLf)



		//建立按钮映射关系
		var btns = {
			ok: $ok,
			cancel: $cancel,

		};
		
		init();
		
		function init(){
			//处理特殊类型input
			// if(popType["input"] === itype){
			// 	$txt.append($input);
			// }
			
			creatDom();
			bind();
		}
		
		function creatDom(){
			$popBox.append(
				$ttBox.append(
					$tt
				)
			).append(
				$txtBox.append(
					$editor.append($family).append($size).append($color.append($colorImg)).append($weight).append($underline).append($italic)
					// .append($input)
				).append(					
					$form.append(
						$formTit
					).append(
						$formList
						// .append($listLf).append($listRt)
					)
				)
				
			).append(
				$btnArea.append($cancel).append($ok)
			).append($clsBtn);
			$box.attr("id", popId).append($layer).append($popBox);
			$("body").append($box);
		}
		
		function bind(){
			//点击确认按钮
			$ok.click(doOk);
			
			//回车键触发确认按钮事件
			$(window).bind("keydown", function(e){
				if(e.keyCode == 13) {
					if($("#" + popId).length == 1){
						doOk();
					}
				}
			});
			
			//点击取消按钮
			$cancel.click(doCancel);
			
			//点击关闭按钮
			$clsBtn.click(doClose);
			//点击改变字体	
			$family.click(doFamily);	
			//点击改变字号
			$size.click(doSize);
			//点击加粗
			$weight.click(doWeight);
			//点击选择下划线	
			$underline.click(doUnderline);
			//点击选择斜体
			$italic.click(doItalic);
			$(".list_img").click(doPitch);
		}

		//确认按钮事件
		function doOk(){
			var $o = $(this);
			var v = $.trim($("input").val());
			if ($("input").is(":visible"))
		        config.onOk(v);
		    else
		        config.onOk();
			$("#" + popId).remove(); 
			config.onClose(eventType.ok);

		}
		
		//取消按钮事件
		function doCancel(){
			var $o = $(this);
			config.onCancel();
			$("#" + popId).remove(); 
			config.onClose(eventType.cancel);
			var p=[];
			console.log($(".froala-element span"))
		}
		
		//关闭按钮事件
		function doClose(){
			$("#" + popId).remove();
			config.onClose(eventType.close);
			$(window).unbind("keydown");
		}
		
		
		//重生popId,防止id重复
		function creatPopId(){
			var i = "pop_" + (new Date()).getTime()+parseInt(Math.random()*100000);//弹窗索引
			if($("#" + i).length > 0){
				return creatPopId();
			}else{
				return i;
			}
		}

		//选择字体
		function doFamily(){
			var selectVal=$(".family").val();
			console.log(selectVal)
			$("input").css("font-family",selectVal);
		}
		//选择字号
		function doSize(){
			var sizeVal=$(".size").val();
			console.log(sizeVal)
			$("input").css("font-size",sizeVal+'px');
		}
		//字体加粗
		function doWeight(){
			var $this=$(this); 

			if ($this.hasClass("img")) {
				$this.removeClass("img");
				var str=$this.attr("src");
			 	var str=str.replace("_active.",".");
			 	// console.log(str)
			 	$this.attr("src",str);
			}else{
				var str=$this.attr("src");
			 	var str=str.replace(".","_active.");
			 	// console.log(str)
			 	$this.attr("src",str);
			 	$this.addClass("img");
			}


			if($("input").hasClass("weight")){
				$("input").removeClass("weight");
				$("input").css("font-weight","normal");
				$(this).attr("src");
			}else{
				$("input").addClass("weight");
				$("input").css("font-weight","bold");
			}
		}
		//字体下划线
		function doUnderline(){
			var $this=$(this); 

			if ($this.hasClass("img")) {
				$this.removeClass("img");
				var str=$this.attr("src");
			 	var str=str.replace("_active.",".");
			 	// console.log(str)
			 	$this.attr("src",str);
			}else{
				var str=$this.attr("src");
			 	var str=str.replace(".","_active.");
			 	// console.log(str)
			 	$this.attr("src",str);
			 	$this.addClass("img");
			}

			if($("input").hasClass("underline")){
				$("input").removeClass("underline");
				$("input").css("text-decoration","none");
			}else{
				$("input").addClass("underline");
				$("input").css("text-decoration","underline");
			}
		}
		//选择斜体
		function doItalic(){
			var $this=$(this); 

			if ($this.hasClass("img")) {
				$this.removeClass("img");
				var str=$this.attr("src");
			 	var str=str.replace("_active.",".");
			 	// console.log(str)
			 	$this.attr("src",str);
			}else{
				var str=$this.attr("src");
			 	var str=str.replace(".","_active.");
			 	// console.log(str)
			 	$this.attr("src",str);
			 	$this.addClass("img");
			}

			if($("input").hasClass("italic")){
				$("input").removeClass("italic");
				$("input").css("font-style","normal");
			}else{
				$("input").addClass("italic");
				$("input").css("font-style","italic");
			}
		}


		//是否选中表格这一项
		function doPitch(){
			$this=$(this);
			if ($this.hasClass("img")) {
				$this.removeClass("img");
				var str=$this.attr("src")
			 	var str=str.replace("no","ok");
			 	// console.log(str)
			 	$this.attr("src",str);
			}else{
				var str=$this.attr("src")
			 	var str=str.replace("ok","no");
			 	// console.log(str)
			 	$this.attr("src",str);
			 	$this.addClass("img");
			}
		}

		
	
		

	};

	//按钮类型
	window.alert.editConfirm.btnEnum = {
		ok: parseInt("0001",2), //确定按钮
		cancel: parseInt("0010",2), //取消按钮
		okcancel: parseInt("0011",2) //确定&&   取消
	};
	
	//触发事件类型
	window.alert.editConfirm.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};
	
	//弹窗类型
	window.alert.editConfirm.typeEnum = {
		info: "info",
		success: "success",
		error:"error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};



})(jQuery);