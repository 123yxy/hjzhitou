/*
 * 使用说明:
 * window.wxc.Pop(popHtml, [type], [options])
 * popHtml:html字符串
 * type:window.alert.hyConfirm.typeEnum集合中的元素
 * options:扩展对象
 * 用法: 
	window.alert.hyConfirm(window.alert.hyConfirm.typeEnum.info);

 */
(function($){
	window.alert = window.alert || {};
	window.alert.fxConfirm = function(popHtml, type, options) {
	    var btnType = window.alert.fxConfirm.btnEnum;
		var eventType = window.alert.fxConfirm.eventEnum;
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
		
		
		var $tt = $("<span>").addClass("tt").text("分享");//标题1
		// var $tta = $("<span>").addClass("tta").text("来研料汇金的目的");//标题2
		var icon = config.icon;
	
		var btn = config.btn;//按钮组生成参数
		
		var popId = creatPopId();//弹窗索引
		
		var $box = $("<div>").addClass("fxConfirm");//弹窗插件容器
		var $layer = $("<div>").addClass("fx_layer");//遮罩层
		var $popBox = $("<div>").addClass("popBox");//弹窗盒子
		var $ttBox = $("<div>").addClass("ttBox");//弹窗标题
		var $txtBox = $("<div>").addClass("txtBox");//弹窗内容
		var $txtBoxImg = $("<img src='/saasBeta/js/share/images/share.png'>").addClass("txtBoxImg");//弹窗分享
		var $txtBoxtt = $("<p>").addClass("txtBoxtt").text("扫一扫,分享给朋友");//弹窗提示内容
		
		var $btnArea = $("<div>").addClass("btnArea");//按钮区域
		
		// var $ok = $("<a>").addClass("sgBtn").addClass("ok").text("确定");//确定按钮
		// var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("取消");//取消按钮
		// var $input = $("<input>").addClass("inputBox");//输入框
		var $clsBtn = $("<img src='/saasBeta/js/share/images/close.png'>").addClass("clsBtn");//关闭按钮
		
		
		//建立按钮映射关系
		var btns = {
			// ok: $ok,
			// cancel: $cancel,

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
				$txtBox.append(
					$txtBoxImg
				).append(
					$txtBoxtt
				)
			).append($clsBtn);
			$box.attr("id", popId).append($layer).append($popBox);
			$("body").append($box);
		}
		
		function bind(){
			//点击确认按钮
			// $ok.click(doOk);
			
			//回车键触发确认按钮事件
			$(window).bind("keydown", function(e){
				if(e.keyCode == 13) {
					if($("#" + popId).length == 1){
						doOk();
					}
				}
			});
			
			//点击取消按钮
			// $cancel.click(doCancel);
			
			//点击关闭按钮
			$clsBtn.click(doClose);			
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
	
		

	};

	//按钮类型
	window.alert.fxConfirm.btnEnum = {
		ok: parseInt("0001",2), //确定按钮
		cancel: parseInt("0010",2), //取消按钮
		okcancel: parseInt("0011",2) //确定&&   取消
	};
	
	//触发事件类型
	window.alert.fxConfirm.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};
	
	//弹窗类型
	window.alert.fxConfirm.typeEnum = {
		info: "info",
		success: "success",
		error:"error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};



})(jQuery);