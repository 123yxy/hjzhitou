$(function() {
	//decodeURI(GetQueryString('stockCode'));

	// 目录管理弹框
	$('.add_1').click(function() {

		//		window.alert.mlConfirm(window.alert.mlConfirm.typeEnum.info);
		$('.list_mask').show()

	})
	//自定义目录
//	$('.setup').click(function() {
//
//		window.alert.zdyConfirm(window.alert.zdyConfirm.typeEnum.info);
//
//	})
	//上传附件
//	$('.wdyp').click(function() {
//
//		window.alert.uploadConfirm(window.alert.uploadConfirm.typeEnum.info);
//
//	})
	// 保存

//	$('.export').click(function() {
//
//		window.alert.bcConfirm(window.alert.bcConfirm.typeEnum.info);
//
//	})

	//分享
//	$('.share').click(function() {
//
//		window.alert.fxConfirm(window.alert.fxConfirm.typeEnum.info);
//
//	})

	//公司信息
//	for(var i = 0; i < $('.list_main ul .mag_ > span').length; i++) {
//		$('.list_main ul .massage_ span').eq(i).click(function() {
//			//window.alert.xxConfirm(window.alert.xxConfirm.typeEnum.info);
//			$(".hyConfirm").show();
//			$(".hyConfirm .clsBtn").show();
//			if($(this).parents('.massage_').prev().text() === "公司信息") {
//				$(".hyConfirm .companyinfobox").show();
//				$(".hyConfirm .shichanginfobox").hide();
//			}
//			if($(this).parents('.massage_').prev().text() === "市场信息") {
//				alert(0000)
//				$(".hyConfirm .companyinfobox").hide();
//				$(".hyConfirm .shichanginfobox").show();
//			}
//			//$('.hyConfirm .popBox .txtBox .list > .list_tab').eq($(this).index()).addClass('information').siblings().removeClass('information');
//			//$('.hyConfirm .popBox .txtBox .list > .list_tab').parents(".txtBox").find(".contents").hide();
//			//$('.hyConfirm .popBox .txtBox .list > .list_tab').parents(".txtBox").find('.contents').eq($(this).index()).show();
//			//$('.hyConfirm .popBox .txtBox .list > .list_tab').eq($(this).index()).trigger('click');
//		})
//	}
	//公司信息三板
	for(var i = 0; i < $('.list_main ul .mag_ .sanban span').length; i++){
		$('.list_main ul .massage_ .sanban span').eq(i).click(function() {
			stockCode=$(".sousuo").find("span").attr("stockcode");
			//alert(1)
			
			$("div.contents").hide();
			$(".hyConfirm").show();
			$(".hyConfirm .companyinfobox").show();
			$(".hyConfirm .shichanginfobox").hide();
			$(".hyConfirm .editImgBox").hide();
			$('.hyConfirm .popBox .txtBox .sanbandiv .list > .list_tab').eq($(this).index()).addClass('information').siblings().removeClass('information');
			$('.hyConfirm .popBox .txtBox .sanbandiv .list > .list_tab').parents('.sanbandiv').find('.contents').hide();
			$('.hyConfirm .popBox .txtBox .sanbandiv .list > .list_tab').parents('.sanbandiv').find('.contents').eq($(this).index()).show();
			
			//记录触犯点击的事件源name
			var senderObj =  $(this).attr("title");
			$('.hyConfirm .popBox .txtBox .sanbandiv .list > .list_tab').parents('.sanbandiv').find('.contents').eq($(this).index()).find("img.yes_no").attr("sender",senderObj)
			
		})
	}
	//A股
	for(var i = 0; i < $('.list_main ul .mag_ .Agu span').length; i++){
		$('.list_main ul .massage_ .Agu span').eq(i).click(function() {
			stockCode=$(".sousuo").find("span").attr("stockcode");
			//alert(2)
			$("div.contents").hide();
			$(".hyConfirm").show();
			$(".hyConfirm .companyinfobox").show();
			$(".hyConfirm .shichanginfobox").hide();
			$(".hyConfirm .editImgBox").hide();
			$('.hyConfirm .popBox .txtBox .Agudiv .list > .list_tab').eq($(this).index()).addClass('information').siblings().removeClass('information');
			$('.hyConfirm .popBox .txtBox .Agudiv .list > .list_tab').parents('.Agudiv').find('.contents').hide();
			$('.hyConfirm .popBox .txtBox .Agudiv .list > .list_tab').parents('.Agudiv').find('.contents').eq($(this).index()).show();
		})
	}
	//市场信息
	for(var i = 0; i < $('.list_main ul .mag_ > span').length; i++){
//		console.log(i);
		$('.list_main ul .shichang span').eq(i).click(function() {
			stockCode=$(".sousuo").find("span").attr("stockcode");
			//alert(3)
			$("div.contents").hide();
			$(".hyConfirm").show();
			$(".hyConfirm .shichanginfobox").show();
			$(".hyConfirm .companyinfobox").hide();
			$(".hyConfirm .editImgBox").hide();
			$('.hyConfirm .popBox .txtBox .shichangcontent .list > .list_tab').eq($(this).index()).addClass('information').siblings().removeClass('information');
			$('.hyConfirm .popBox .txtBox .shichangcontent .list > .list_tab').parents('.shichangcontent').find('.contents').hide();
			$('.hyConfirm .popBox .txtBox .shichangcontent .list > .list_tab').parents('.shichangcontent').find('.contents').eq($(this).index()).show();
		})
	}
	//console.log("refreshList();");
//	refreshList();
			

	
})