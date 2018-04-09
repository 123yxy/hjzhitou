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
	window.alert.mlConfirm = function(popHtml, type, options) {
	    var btnType = window.alert.mlConfirm.btnEnum;
		var eventType = window.alert.mlConfirm.eventEnum;
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
		
		
		var $tt = $("<span>").addClass("tt").text("目录管理");//标题1
		// var $tta = $("<span>").addClass("tta").text("来研料汇金的目的");//标题2
		var icon = config.icon;
	
		var btn = config.btn;//按钮组生成参数
		
		var popId = creatPopId();//弹窗索引
		
		var $box = $("<div>").addClass("mlConfirm");//弹窗插件容器
		var $layer = $("<div>").addClass("ml_layer");//遮罩层
		var $popBox = $("<div>").addClass("popBox");//弹窗盒子
		var $ttBox = $("<div>").addClass("ttBox");//弹窗标题

		var $txtBox_No1 = $("<div>").addClass("txtBox_No1");//弹窗内容No1
		var $No1Box=$("<span>").addClass("tit_img");
		var $No1Box_img=$("<img src='/saasBeta/js/catalog/images/no.png'>").addClass("No1Box_img");//No1图标
		var $No1Box_text=$("<p>").addClass("No1Box_text").text("NO1.公司概述");//No1标题内容
		var $No1clear=$("<div>").addClass("clear");//No1标题清除浮动
		var $No1Box_list=$("<span>").addClass("box No1Box_list");//No1标题内容


		var $txtBox_No2 = $("<div>").addClass("txtBox_No2");//弹窗内容No2
		var $No2Box=$("<span>").addClass("tit_img");
		var $No2Box_img=$("<img src='/saasBeta/js/catalog/images/no.png'>").addClass("No2Box_img");//No2图标
		var $No2Box_text=$("<p>").addClass("No2Box_text").text("NO2.公司业务");//No2标题内容
		var $No2clear=$("<div>").addClass("clear");//No1标题清除浮动
		var $No2Box_list=$("<span>").addClass("box No2Box_list");//No1标题内容

		var $txtBox_No3 = $("<div>").addClass("txtBox_No3");//弹窗内容No3
		var $No3Box=$("<span>").addClass("tit_img");
		var $No3Box_img=$("<img src='/saasBeta/js/catalog/images/no.png'>").addClass("No3Box_img");//No3图标
		var $No3Box_text=$("<p>").addClass("No3Box_text").text("NO3.财务分析");//No3标题内容
		var $No3clear=$("<div>").addClass("clear");//No1标题清除浮动
		var $No3Box_list=$("<span>").addClass("box No3Box_list");//No1标题内容

  
		var $txtBox_No4 = $("<div>").addClass("txtBox_No4");//弹窗内容No4
		var $No4Box=$("<span>").addClass("tit_img");
		var $No4Box_img=$("<img src='/saasBeta/js/catalog/images/no.png'>").addClass("No4Box_img");//No4图标
		var $No4Box_text=$("<p>").addClass("No4Box_text").text("NO4.盈利预测");//No4标题内容
		var $No4clear=$("<div>").addClass("clear");//No1标题清除浮动
		var $No4Box_list=$("<span>").addClass("box No4Box_list");//No1标题内容
		
		
		
		var $btnArea = $("<div>").addClass("btnArea");//按钮区域
		
		var $ok = $("<a>").addClass("sgBtn").addClass("ok").text("确定");//确定按钮
		var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("取消");//取消按钮
		var $input = $("<input>").addClass("inputBox");//输入框
		var $clsBtn = $("<img src='/saasBeta/js/catalog/images/close.png'>").addClass("clsBtn");//关闭按钮


		// 公司概述
		var data1=[
			{"src":"no.png","text":"公司信息"},
			{"src":"no.png","text":"挂牌信息"},
			{"src":"no.png","text":"股权结构"},
			{"src":"no.png","text":"股本变动情况"},
			{"src":"no.png","text":"人员情况"},
			{"src":"no.png","text":"重大事件"},
			{"src":"no.png","text":"风险信息"},
			{"src":"no.png","text":"投资分析"}
		]
		var gk="";
		for(i=0;i<data1.length;i++){
			gk+="<span class='list'><img class='list_img' src='/saasBeta/js/catalog/images/"+data1[i].src+"'>"+
				"<p class='list_txt'>"+data1[i].text+"</p>"+
				"</span>"
		}
		$No1Box_list.append(gk);

		// 公司业务
		var data2=[
			{"src":"no.png","text":"主营业务分析"},
			{"src":"no.png","text":"商业模式"},
			{"src":"no.png","text":"上下游分析"},
			{"src":"no.png","text":"主要竞争对手"}
		]
		var yw="";
		for(i=0;i<data2.length;i++){
			yw+="<span class='list'><img class='list_img' src='/saasBeta/js/catalog/images/"+data2[i].src+"'>"+
				"<p class='list_txt'>"+data2[i].text+"</p>"+
				"</span>"
		}
		$No2Box_list.append(yw);

		// 财务分析
		var data3=[
			{"src":"no.png","text":"核心财务数据"},
			{"src":"no.png","text":"公司财务分析"},
			{"src":"no.png","text":"综合能力模型分析"},
			{"src":"no.png","text":"杜邦分析法"}
		]
		var cw="";
		for(i=0;i<data3.length;i++){
			cw+="<span class='list'><img class='list_img' src='/saasBeta/js/catalog/images/"+data3[i].src+"'>"+
				"<p class='list_txt'>"+data3[i].text+"</p>"+
				"</span>"
		}
		$No3Box_list.append(cw);

		// 盈利预测
		
		var data4=[
			{"src":"no.png","text":"盈利预测表"},
			{"src":"no.png","text":"盈利风险提示"}
			
		]
		var yl="";
		for(i=0;i<data4.length;i++){
			yl+="<span class='list'><img class='list_img' src='/saasBeta/js/catalog/images/"+data4[i].src+"'>"+
				"<p class='list_txt'>"+data4[i].text+"</p>"+
				"</span>"
		}
		$No4Box_list.append(yl);



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
				$txtBox_No1.append($No1Box.append($No1Box_img).append($No1Box_text)).append($No1clear).append($No1Box_list)
			).append(
				$txtBox_No2.append($No2Box.append($No2Box_img).append($No2Box_text)).append($No2clear).append($No2Box_list)
			).append(
				$txtBox_No3.append($No3Box.append($No3Box_img).append($No3Box_text)).append($No3clear).append($No3Box_list)
			).append(
				$txtBox_No4.append($No4Box.append($No4Box_img).append($No4Box_text)).append($No4clear).append($No4Box_list)
			).append(
				$btnArea.append($ok).append($cancel)
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
			// 点击切换子级选框
			$(".list").click(doPitch);
			// 点击切换父级选框
			$(".tit_img").click(doBig);
			
			
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
		// 切换子级选框的状态
		function doPitch(){
			var $this=$(this);
			

			if ($this.hasClass("img")) {
				$this.removeClass("img");
				var str=$this.find("img").attr("src")
			 	var str=str.replace("ok","no");
			 	// console.log(str)
			 	$this.find("img").attr("src",str);
			}else{
				var str=$this.find("img").attr("src")
			 	var str=str.replace("no","ok");
			 	// console.log(str)
			 	$this.find("img").attr("src",str);
			 	$this.addClass("img");
			}

			var par=$(this).parent(".box");
			console.log(par.find(".img").length)
			if(par.find(".img").length==par.find(".list").length){
				var str_child=par.siblings(".tit_img").find("img").attr("src");
				var str_child=str_child.replace("no","ok");
				par.siblings(".tit_img").find("img").attr("src",str_child);
				par.siblings(".tit_img").addClass("ok");
			}else{
				var str_child=par.siblings(".tit_img").find("img").attr("src");
				var str_child=str_child.replace("ok","no");
				par.siblings(".tit_img").find("img").attr("src",str_child);
				par.siblings(".tit_img").removeClass("ok");
			}

			

			
		}
		
		


		// 切换父级选框的状态
		function doBig(){
			var $this=$(this);

			if ($this.hasClass("ok")) {
				$this.removeClass("ok");
				// 不选中当前选框的src
				var str=$this.find("img").attr("src")
			 	var str=str.replace("ok","no");
			 	$this.find("img").attr("src",str);
			 	// 不选中当前选框下的所有子选框的src
			 	var str_child=$this.siblings("span").children(".list").find("img").attr("src");
			 	var str_child=str_child.replace("ok","no");
			 	$this.siblings("span").children(".list").find("img").attr("src",str_child);
			 	$this.siblings("span").children(".list").removeClass("img");
			 	// console.log(str_child);
			 	// console.log(str)
			 	
			}else{
				// 选中当前选框src
				var str=$this.find("img").attr("src")
			 	var str=str.replace("no","ok");
			 	$this.find("img").attr("src",str);
			 	$this.addClass("ok");
			 	// console.log(str)
			 	// 选中当前选框下的所有子选框的src
			 	var str_child=$this.siblings("span").children(".list").find("img").attr("src");
			 	var str_child=str_child.replace("no","ok");
			 	$this.siblings("span").children(".list").find("img").attr("src",str_child);
			 	$this.siblings("span").children(".list").addClass("img");
			 	// console.log(str_child);
			 	
			}
			
		}
	
		

	};

	//按钮类型
	window.alert.mlConfirm.btnEnum = {
		ok: parseInt("0001",2), //确定按钮
		cancel: parseInt("0010",2), //取消按钮
		okcancel: parseInt("0011",2) //确定&&   取消
	};
	
	//触发事件类型
	window.alert.mlConfirm.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};
	
	//弹窗类型
	window.alert.mlConfirm.typeEnum = {
		info: "info",
		success: "success",
		error:"error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};



})(jQuery);