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
	window.alert.hyConfirm = function(popHtml, type, options) {
	    var btnType = window.alert.hyConfirm.btnEnum;
		var eventType = window.alert.hyConfirm.eventEnum;
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
		
		
		var $tt = $("<span>").addClass("tt").text("选择兴趣行业,信息更对味");//标题1
		var $tta = $("<span>").addClass("tta").text("来研料汇金的目的");//标题2
		var icon = config.icon;
	
		var btn = config.btn;//按钮组生成参数
		
		var popId = creatPopId();//弹窗索引
		
		var $box = $("<div>").addClass("hyConfirm");//弹窗插件容器
		var $layer = $("<div>").addClass("hy_layer");//遮罩层
		var $popBox = $("<div>").addClass("popBox");//弹窗盒子
		var $ttBox = $("<div>").addClass("ttBox");//弹窗行业标题
		// var $ts = $("<a>").addClass("ts").text("请选择3个-6个 您关注的行业");//右边提示
		var $txtBox = $("<div>").addClass("txtBox");//弹窗行业内容

		var $ttBoxa = $("<div>").addClass("ttBoxa");//弹窗目的标题
		var $txtBoxa = $("<div>").addClass("txtBoxa");//弹窗目的内容
		var $clear=$("<div>").addClass("claer")
		var $btnArea = $("<div>").addClass("btnArea");//按钮区域
		
		var $ok = $("<a>").addClass("sgBtn").addClass("ok").addClass("click").text("确定");//确定按钮
		var $cancel = $("<a>").addClass("sgBtn").addClass("cancel").text("取消");//取消按钮
		var $input = $("<input>").addClass("inputBox");//输入框
		var $clsBtn = $("<img src='../saasBeta/js/industry/images/close.png'>").addClass("clsBtn").addClass("click");//关闭按钮
		// 行业列表数据
		var paraminfo='{"body":{"type":"A"}}';
		var hy="";
	  	$.axsRequest("FT002",paraminfo,false,function(data){
			if(data.retCode == "0000") {
				var data=data.retData.infoList;
				if(data.length==0) return;
				for(i=1;i<data.length;i++){
					hy+="<span class='industry' title='"+data[i].category_name+"' hover-url='"+data[i].icon_url+"' gray-url='"+data[i].gray_icon_url+"'>"+
							"<img src='"+data[i].gray_icon_url+"'>"+
							"<span class='indust_text' data-id='"+data[i].category_id+"'>"+data[i].category_name+"</span>"+
						"</span>"
				}
			}		
		});

		//目的列表数据
		var md="";
		var paraminfo='{"body":{"type":"42"}}';
	  	$.axsRequest("FT003",paraminfo,false,function(data){
	  		console.log(data)
	  		if(data.retCode == "0000") {
				var data=data.retData.infoList;
				if(data.length==0) return;
				for(var j=0;j<data.length;j++){
					md+="<span class='objective' data-id='"+data[j].id+"' data-code='"+data[j].code+"'>"+data[j].name+"</span>"
				}
			}		
		});
		
		//建立按钮映射关系
		var btns = {
			ok: $ok,
			cancel: $cancel
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
				$txtBox.append(hy)
			).append(
				$ttBoxa.append(
					$tta
				)
			).append(
				$txtBoxa.append(md).append($clear)
			).append(
				$btnArea.append($ok)
			).append(
				$clsBtn
			);
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
			//控制第八个span的样式
		$(".txtBox>span:nth-child(8n)").css("margin-right","0")
			
			//点击取消按钮
			$cancel.click(doCancel);
			
			//点击关闭按钮
			$clsBtn.click(doClose);
			// 点击选中行业
			$(".industry").click(industry).mouseenter(industryMouseenter).mouseleave(industryMouseleave);
			//点击选中目的
			$(".objective").click(objective);

			var indust_width=$(".industry").width();
			// console.log(indust_width)
			var indust_text=$(".indust_text");
			// var indust_text=$(".indust_text").width();
			// console.log(indust_text)
			var arr=[];
			for(var i=0;i<indust_text.length;i++){	
				
				var margin_left=(indust_width-indust_text[i].clientWidth)/2;				
				arr.push(margin_left)
				// console.log(arr);
				indust_text[i].clientLeft=arr[i];	
				
				for(var j=0;j<arr.length;j++){				
					indust_text[i].style.left=arr[j]+'px';
				}

			}
		}

		//确认按钮事件
		function doOk(){
			var $o = $(this);
			var v = $.trim($input.val());
			if ($input.is(":visible"))
		        config.onOk(v);
		    else
		        config.onOk();
		        //保存行业
		        saveIndustry();
		        //保存系统使用目的
		        saveGoals();
		        
		        
			$("#" + popId).remove(); 
			config.onClose(eventType.ok);
		}
		//保存行业
		function saveIndustry(){
			var focusIndustry="";
			$(".industry.img").each(function(index,item){
				focusIndustry+=$(this).find(".indust_text").attr("data-id")+"|";	
		 	});
			focusIndustry=focusIndustry.substring(0,focusIndustry.length-1);
			focusIndustry=focusIndustry.split("|");
			if(focusIndustry.length==0){
				return false;
			}
			focusIndustry=focusIndustry.join("|");
			param={industries:focusIndustry};
			
			$.axs("/betaStock/btUserIndustry/updateBtUserIndustry.do",param,false,function(data){
				if(data.retCode=="0000"){
				}else{
					//errorAlert(data.retCode, data.retMsg);
				}
			});
		}
		function saveGoals(){
			var focusGoals="";
			$(".objective.color").each(function(index,item){
				focusGoals+=$(this).attr("data-code")+",";	
		 	});
			focusGoals=focusGoals.substring(0,focusGoals.length-1);
			focusGoals=focusGoals.split(",");
			if(focusGoals.length==0){
				return false;
			}
			focusGoals=focusGoals.join(",");
			var paraminfo = '{"body":{"goals":"'+focusGoals+'"}}';
			$.axsRequest("FT340", paraminfo, false, function(data) {
				if(data.retCode == "0000") {
				} else {
				}
			});
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
	
	
		// 点击选中行业事件
		function industry(){		
			 var $this=$(this);
			 if($this.hasClass("img")){
			 	$this.removeClass("img");
			 	$this.find(".pitch").remove();
			 	$this.find("img").attr("src",$this.attr("gray-url"));
			 }else{
			 	$this.addClass("img");
			 	$this.find("img").attr("src",$this.attr("hover-url"));
			 	$this.append("<img src='../saasBeta/js/industry/images/pitch_on.png' class='pitch'>");
			 }
		}
        function industryMouseenter(){
            var $this=$(this);
            if(!$this.hasClass("img")){
                $this.find("img").attr("src",$this.attr("hover-url"));
			}
        }
        function industryMouseleave(){
            var $this=$(this);
            if(!$this.hasClass("img")){
                $this.find("img").attr("src",$this.attr("gray-url"));
			}


        }
		// 点击选中目的事件
		function objective(){		 
			 $this=$(this);
			 if($this.hasClass("color")){
		        $this.removeClass("color");
		        $this.find("img").remove();
		    }else{
		        $this.addClass("color");
		        $this.append("<img src='../saasBeta/js/industry/images/pitch_on.png'>")
		    } 		
		}

	};

	//按钮类型
	window.alert.hyConfirm.btnEnum = {
		ok: parseInt("0001",2), //确定按钮
		cancel: parseInt("0010",2), //取消按钮
		okcancel: parseInt("0011",2) //确定&&   取消
	};
	
	//触发事件类型
	window.alert.hyConfirm.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};
	
	//弹窗类型
	window.alert.hyConfirm.typeEnum = {
		info: "info",
		success: "success",
		error:"error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};



})(jQuery);