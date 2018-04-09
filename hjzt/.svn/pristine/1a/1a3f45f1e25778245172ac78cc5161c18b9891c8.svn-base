BS.AddReport = {
	PageInit: function() {
		var obj = this;
		obj.Event();
		obj.CreateReport();
		obj.GoBack();

	},
	Event: function() {
		//给单选按钮点击添加处理
		$(".radio").click(function() {
			// $(this).siblings("b.bg").removeClass("opc").parent().siblings('.radio').children(".bg").addClass("opc")
			$(this).addClass("active").siblings("label").removeClass("active");
		});
		//选择研报类型
		$(".img-box").click(function() {
			$(this).children("img").addClass("active")
				.siblings("span")
				.removeClass("opc")
				.parent().parent()
				.siblings()
				.children(".img-box").children("img")
				.removeClass("active")
				.siblings("span").addClass("opc");
			$(".report-content>p").addClass("hide");
			var names = $(this).attr("name");
			$("#" + names).removeClass("hide").siblings().addClass("hide")
		})
	},
	//保存 提示
	CreateReport:function(){
		$('.button_special').click(function(){
		var val = $(".ui-autocomplete-input-company").val();
		$.each(searchObjectList, function(index, flag) {
	        if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
	            
	            $(".ui-autocomplete-input-company").attr("ObjectCode", flag.code);
	            
        }
        });
		var index=$(".img-box img.active").parents(".report-box").index();
    		var content=$(".report-item").eq(index).find(".ui-autocomplete-input").val();
    		var stockCode=$(".report-item").eq(index).find(".ui-autocomplete-input").attr("ObjectCode");
    		var stockCode1=$(".report-item").eq(0).find(".ui-autocomplete-input").attr("ObjectCode");
    		
    		if($(".report-box").eq(0).find(".img-box img").hasClass("active") && stockCode1==undefined){
			var txt=  "请选择研究对象";
			var option = {
				title: "提示",
				btn: parseInt("0001",2),
			}
			window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
    			return false;
    		}
    		//
    		var title=$(".report-item").eq(index).find(".input-box:eq(1) input").val();
    		if(title =="" || title ==null){
    			var txt=  "请输入研报标题";
			var option = {
				title: "提示",
				btn: parseInt("0001",2),
			}
			window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
    			return false;
    		}
    		if(title.length>30){
    			var txt=  "研报标题超出限制字数，请保持在30个字符以内！";
			var option = {
				title: "提示",
				btn: parseInt("0001",2),
			}
			window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
    			return false; 
    		}
    		console.log("button_special.text:"+$(".button_special").text());
        if($(".report-box").eq(0).find(".img-box img").hasClass("active"))
        {
            window.location.href='/researches/researchesnew.html?stockCode='+stockCode+'&content='+ encodeURI(content)+'&title='+encodeURI(title)+'&newyb=1';
        }
		else{
	    	if(content!=undefined && stockCode!="" && stockCode!=undefined){
				window.location.href='/researches/researchesnew.html?stockCode='+stockCode+'&content='+encodeURI(content)+'&title='+encodeURI(title)+'&newyb=4';
			}else{
				window.location.href='/researches/researchesnew.html?title='+encodeURI(title)+'&newyb=4';  
			}
		}

		// if(content!=undefined && stockCode!="" && stockCode!=undefined){
		// 	window.location.href='/researches/researches.html?stockCode='+stockCode+'&content='+content+'&title='+title+'&newyb=1';
		// }else{
		// 	window.location.href='/researches/researchesblank.html?title='+title+'&newyb=4';  
		// }
    	
    })
	},
	//返回 上一页 cfz
	GoBack:function(){
		$('.goback').click(function(){
			//history.go(-1);
			window.location.reload();
		})
	}
}
$(function() {
	BS.AddReport.PageInit();
	var stockContent = getUrlParam("content");
	var stockCode = getUrlParam("stockcode");
	
	if(stockContent!=null && stockContent != "" && stockCode!=null && stockCode != "")
	{
		
       
       $(".ui-autocomplete-input-company").val(stockContent); 
       $(".ui-autocomplete-input-company").attr("objectcode",stockCode);     
      		 
	}

	
});

