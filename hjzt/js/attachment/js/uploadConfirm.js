/*

 * 用法: 
	window.alert.hyConfirm(window.alert.hyConfirm.typeEnum.info);

 */
(function($){
	window.alert = window.alert || {};
	window.alert.uploadConfirm = function(popHtml, type, options) {
	    var btnType = window.alert.uploadConfirm.btnEnum;
		var eventType = window.alert.uploadConfirm.eventEnum;
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
		
		
		var $tt = $("<span>").addClass("tt").text("上传附件");//标题1
		// var $tta = $("<span>").addClass("tta").text("来研料汇金的目的");//标题2
		var icon = config.icon;
	
		var btn = config.btn;//按钮组生成参数
		
		var popId = creatPopId();//弹窗索引
		
		var $box = $("<div>").addClass("upConfirm");//弹窗插件容器
		var $layer = $("<div>").addClass("bc_layer");//遮罩层
		var $popBox = $("<div>").addClass("popBox");//弹窗盒子
		var $ttBox = $("<div>").addClass("ttBox");//弹窗标题
		var $form = $("<form id='formFile'>");//弹窗标题
		var $txtBox = $("<div>").addClass("txtBox");//弹窗内容  
		var $txtBoxtt = $("<p>").addClass("txtBoxtt").text("注:支持类型.pdf,.doc,.docx,.xlsx,.txt,.png(单个文件大小:20M)");//弹窗提示内容
		var $upload=$("<span>").addClass("upload");//上传文件
		var $xing=$("<p>").addClass("xing").text("*");
		var $file=$("<p>").addClass("file").text("文件 :");
		var $fileSpan=$("<span id='fileName' readonly='readonly' >").addClass("file_span");//上传文件框
		var $fileShow=$("<p>").addClass("file_show");
		var $fileBtn=$("<input type='file' value='上传文件' id='file'name='multipartFile' hidden='hidden'>").addClass("file_btn");
		var $fileA=$("<a>").addClass("file_a").text("上传文件");
		// console.log($("#file").val());
		
		
		

		var $tit=$("<span>").addClass("tit");//上传文件
		var $titXing=$("<p>").addClass("tit_xing").text("*");
		var $titText=$("<p>").addClass("tit_text").text("标题 :");
		var $titIpt=$("<input placeholder='最多30字' maxlength='30'>").addClass("tit_ipt");//上传文件框

		
		var $btnArea = $("<div>").addClass("btnArea");//按钮区域
		
		var $ok = $("<a>").addClass("sgBtn").addClass("ok").text("确认上传");//确定按钮
		var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("取消");//取消按钮
		var $input = $("<input>").addClass("inputBox");//输入框
		var $clsBtn = $("<img src='/saasBeta/js/attachment/images/close.png'>").addClass("clsBtn");//关闭按钮
		
		
		//建立按钮映射关系
		var btns = {
			ok: $ok,
			cancel: $cancel,

		};
		
		init();
		
		function init(){
			//处理特殊类型input
			if(popType["input"] === itype){
				$txt.append($input);
			}
			
			creatDom();
			bind();
		}
		
		function creatDom(){
			$popBox.append(
				$ttBox.append(
					$tt
				)
			).append(
					$form.append(
				$txtBox.append(
					$txtBoxtt
				).append(
					$upload.append($xing).append($file).append($fileSpan.append($fileShow).append($fileBtn).append($fileA))
				).append(
					$tit.append($titXing).append($titText).append($titIpt)
				)
				.append(
					$btnArea.append($ok)
				)
			).append($clsBtn));
			$box.attr("id", popId).append($layer).append($popBox);
			$("body").append($box);
		}
		
		function bind(){
			//点击确认按钮
			/*$ok.click(doOk);
			
			//回车键触发确认按钮事件
			$(window).bind("keydown", function(e){
				if(e.keyCode == 13) {
					if($("#" + popId).length == 1){
						doOk();
					}
				}
			});*/
			
			//点击取消按钮
			$cancel.click(doCancel);
			
			//点击关闭按钮
			$clsBtn.click(doClose);		
			$fileBtn.change(handleFile);	
			$fileA.click(doFile);
		}

		//确认按钮事件
		function doOk(){
			var $o = $(this);
			var v = $.trim($input.val());
			if ($input.is(":visible"))
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

		// var file = document.getElementById("file");
  //       var fileName = document.getElementById("fileName");
        function handleFile(){
        	var str=$("#file").val();
        	// console.log(str)
        	var index=str.lastIndexOf("\\");
        	str=str.substring(index+1,str.length);
        	// alert(str);
            $(".file_show").text(str);
        }
        function doFile(){
        	$fileBtn.click()
        }
	
		

	};

	//按钮类型
	window.alert.uploadConfirm.btnEnum = {
		ok: parseInt("0001",2), //确定按钮
		cancel: parseInt("0010",2), //取消按钮
		okcancel: parseInt("0011",2) //确定&&   取消
	};
	
	//触发事件类型
	window.alert.uploadConfirm.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};
	
	//弹窗类型
	window.alert.uploadConfirm.typeEnum = {
		info: "info",
		success: "success",
		error:"error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};



})(jQuery);