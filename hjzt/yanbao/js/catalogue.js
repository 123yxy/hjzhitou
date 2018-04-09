

function catalogue(data) {
	// $.ajax({
	//		UTIL.initimg();
	// url:UTIL.CONFIG.wwwhost + UTIL.CONFIG.findZJList,
	// type:"post",
	// dataType:'json',
	// async: false,
	// success: function (returnData) {
	// 	var data = returnData.retData;
	var slideHtml = '';
	slideHtml += '<div class="slide-nav">';
	// slideHtml += '<span class="slide-ml">目录</span>';
	slideHtml += '<div class="slide-list">';
	slideHtml += '<span class="slide-up"></span>';
	slideHtml += '<div class="slide-scroll">';
	var count = 0, precataID = 0;
	var len = data.length;
	var flag;
	if(payOrNot()==true){
		flag=true;//已付费
	}else if(payOrNot()==false || payOrNot()==undefined){
		flag=false;//未付费
	}
	$.each(data, function (index, item) {
		//console.log(item)
		var cataID = item.levelcode.split("-");
		//				console.log(cataID)
		var liHtml = '';
		// if (cataID.length > 2) {
		// 	return true;
		// }
		//增加附录 20171031 shiqi
		if (item.zjLevel > 2)
			return true;


		if (item.zjLevel === 1 && precataID !== cataID[0])//新增 1级标题进行加粗 20171019 shiqi
		{
			// if (slideHtml.find("ul").length)
			if (precataID !== 0)
				slideHtml += '</ul></div>'
			// else {
			slideHtml += '<div class="slide-content">';
			if (item.code === "fulu_hide")
				slideHtml += '';
			else
				slideHtml += '<h4>NO' + item.levelcode + '.' + item.name + '</h4>';
			slideHtml += '<ul>';
			// }

			// if(cataID[0] === "5"){
			// 	liHtml ='<li index=' + (count++) + '>' + item.name + '</li>';
			// 	slideHtml += liHtml;
			// }
			// return false;
		}
		else if (item.zjLevel === 2) {
			//alert(0)
			if (parseInt(cataID[0]) < 3) {//章节信息
				if(item.isPay==0){//免费的
					liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span></li>';
				}else if(item.isPay==1){
					if(flag==true){//已付费，不需要显示收费标签
						liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span></li>';
					}else if(flag==false){
						liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span><em class="fufei">付费</em></li>';
					}
				}
				
				// liHtml='<li><a href="/znyb_pc/section'+cataID[0]+'/section'+item.levelcode+'.html">'+item.name+'</a></li>';
			} else {
				if (localStorage.getItem("useId") == null || localStorage.getItem("useId") == "" || localStorage.getItem("useId") == undefined) {
					if (item.code === "fulu"){
						liHtml = '<li class="fulu"  index=' + (count++) + '><h4>' + item.name + '</h4></li>'
					}else{
						if(item.isPay==0){//免费的
							liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span></li>';
						}else if(item.isPay==1){
							if(flag==true){//已付费，不需要显示收费标签
								liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span></li>';
							}else if(flag==false){
								liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span><em class="fufei">付费</em></li>';
							}
						}
					}
					// liHtml='<li><a href="javascript:void(0);">'+item.name+'</a></li>';
				} else {
					if (item.code === "fulu"){
						liHtml = '<li class="fulu" index=' + (count++) + '><h4>' + item.name + '</h4></li>'
					}else{
						if(item.isPay==0){//免费的
							liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span></li>';
						}else if(item.isPay==1){
							if(flag==true){//已付费，不需要显示收费标签
								liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span></li>';
							}else if(flag==false){
								liHtml = '<li index=' + (count++) + '><span class="mulu-ys">' + item.name + '</span><em class="fufei">付费</em></li>';
							}
						}
					}	
					// liHtml='<li><a href="/znyb_pc/section'+cataID[0]+'/section'+item.levelcode+'.html">'+item.name+'</a></li>';
				}
			}
			if (len === index + 1)
				liHtml += '</ul></div>'

			slideHtml += liHtml;
		}
		precataID = cataID[0];

		// if (cataID.length > 1) {
		// 	if (parseInt(cataID[0]) < 3) {
		// 		liHtml = '<li index=' + (count++) + '>' + item.name + '</li>';
		// 		// liHtml='<li><a href="/znyb_pc/section'+cataID[0]+'/section'+item.levelcode+'.html">'+item.name+'</a></li>';
		// 	} else {
		// 		if (localStorage.getItem("useId") == null || localStorage.getItem("useId") == "" || localStorage.getItem("useId") == undefined) {
		// 			liHtml = '<li index=' + (count++) + '>' + item.name + '</li>';
		// 			// liHtml='<li><a href="javascript:void(0);">'+item.name+'</a></li>';
		// 		} else {
		// 			liHtml = '<li index=' + (count++) + '>' + item.name + '</li>';
		// 			// liHtml='<li><a href="/znyb_pc/section'+cataID[0]+'/section'+item.levelcode+'.html">'+item.name+'</a></li>';
		// 		}
		// 	}
		// }
		// if ((index != 0 && (!item.showData || item.showData == "false")) || (index + 1) == data.length) {
		// if ((index != 0 && (item.zjLevel === 3 || item.zjLevel === 1)) || (index + 1) == data.length) {//新增 3级标题
		// 	if ((index + 1) == data.length) {
		// 		slideHtml += liHtml;
		// 		slideHtml += '</ul>';
		// 		slideHtml += '</div>';
		// 		return false;
		// 	}
		// 	slideHtml += '</ul>';
		// 	slideHtml += '</div>';
		// }
		// if (!item.zjLevel || item.showData == "false") {
		// if (item.zjLevel === 1 || item.zjLevel === 3)//新增 1级标题进行加粗 20171019 shiqi
		// {
		// 	slideHtml += '<div class="slide-content">';
		// 	slideHtml += '<h4>NO' + item.levelcode + '.' + item.name + '</h4>';
		// 	slideHtml += '<ul>';
		// }
		// if (!(!item.showData || item.showData == "false")) {
		// if (item.zjLevel === 2) {
		// 	slideHtml += liHtml;
		// }
	});
	slideHtml += '</div>';
	slideHtml += '</div></div>';

	//			console.log(slideHtml)
	$("#catalogue").append(slideHtml);

	// }

	// })
	$(".slide-ml>span").on("click", function () {
		$("#catalogue").toggle();
		$(this).parent().toggleClass("active");
		
	});

		//点击其他地方收回目录
		$(document).on("click",function(e){
			//alert(0)
			var e = e || event;
			var elem= e.target || e.srcElement;			
			 while (elem) { //循环判断至跟节点，防止点击的是div子元素
                if (elem.id && elem.id=='muList') {
                    return;
                }
                elem = elem.parentNode;
           }
            $('#catalogue').css('display','none'); //点击的不是div或其子元素
            $("#share").css('display','none');
            $(".slide-ml,.slide-share").removeClass("active");
            e.stopPropagation();
			e.cancelBubble = true;
			
		})

	$(".slide-content h4").on("click", function () {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).next().show();
		} else {
			$(this).addClass("on");
			$(this).next().hide();
		}
	})
	$("#catalogue").on("click", ".slide-up", function () {
		$("#catalogue").hide();
		$("#catalogue").parent(".slide-ml").removeClass("active");
	})

	// userHead();
	// $(".infor-name").on("click", function () {
	// 	window.location.href = "userCenter.html";
	// })

	//	var slideHeight=$(".container").height();
	//	console.log(slideHeight)

}
// var crStockCode = UTIL.getPara("stockCode");
// if (crStockCode != undefined && crStockCode != null && crStockCode != "") {
// 	WF_ajax.canRead(false, { stockCode: crStockCode, phone: UTIL.getPara("phone") })
// }
// //         $(function () {
// //             var windowHeight = $(window).height()
// //             $(".container").height(windowHeight - 195);
// //             $(".contents").height(windowHeight - 290)
// //         })
// yepnope({
// 	test: Modernizr.csstransforms,
// 	yep: ['js/lib/turn.js'],
// 	nope: ['js/lib/turn.html4.min.js'],
// 	both: ['css/basic.css'],

// 	complete: function () {

// 		_initflipd(loadApp)
// 	}

// });
// //添加未注册/登录头 获取用户登录信息

// $(".companies-name span").text(decodeURI(UTIL.getPara("stockName")) + "(" + UTIL.getPara("stockCode") + ")");





// var divNum = [], sectiondata;
// // userHead();
// // catalogue();
// // $(".userHead-out").html(sethead());
// // $("#uc").css("margin-right", "10px");

// //logo链接
// // $(".userHead-logo").html(logourl());
// // getuserinfo();
// //logo链接
// $(".userHead-logo").html(logourl());
// $(".indexTop-user").html(sethead());
// getuserinfo();
// function _initflipd(_callback) {
// 	UTIL.getsection(function (_data) {
// 		for (var i = 0; i < _data.length; i++) {

// 			var showData = _data[i].showData;
// 			var zjLevel = _data[i].zjLevel//新增zjlevel判断 pc端显示二级标题目录 需shouData及zjlevel 20171019 shiqi
// 			if (zjLevel === 2) {
// 				var turnDiv = '<div></div>';
// 				$(".flipbook").append(turnDiv);
// 				divNum.push(_data[i])//所有的二级标题
// 			}
// 		};
// 		sectiondata = _data;
// 		var pageCount = $(".flipbook").children('div').length;
// 		$(".pageCount").text(pageCount);
// 		catalogue(sectiondata);
// 		var windowHeight = $(window).height()
// 		$(".slide-scroll").height(windowHeight - 260);
// 		_callback();
// 	});
// };

// $("#catalogue").on("click", "li", function () {
// 	//      	alert(0)
// 	var catalogueIndex = parseInt($(this).attr("index"));
// 	//console.log(catalogueIndex+"a323")
// 	var levelcode = divNum[catalogueIndex].levelcode;
// 	var zj = levelcode.split('-')[0];
// 	UTIL.searchsection._d = [];
// 	UTIL.searchsection.dosearch(sectiondata, levelcode);//20170926 shiqi 遍历当前节点下的所有子节点,只查找一级
// 	$.ajax({
// 		// url: 'section' + zj + '/section' + divNum[catalogueIndex].levelcode + '.html',
// 		url: 'section' + zj + '/' + divNum[catalogueIndex].code + '.html',//shiqi 20170919
// 		type: 'get',
// 		async: false,
// 		dataType: 'html',
// 		success: function (data) {
// 			//console.log(".p"+(catalogueIndex+2));
// 			$(".flipbook").find(".p" + (catalogueIndex + 2)).eq(0).html(data);
// 			$(".flipbook").turn('page', catalogueIndex + 2);
// 			$(".currentPage").text(catalogueIndex + 2);
// 			showCatalogue();
// 		}
// 	});

// 	$("#catalogue").hide();
// 	$(".slide-ml").removeClass("active")
// })

// /**
//  * turn.js
//  */
// function loadApp() {
// 	$('.flipbook').turn({
// 		width: 1156,
// 		// height:500,
// 		// width:900,
// 		elevation: 50,
// 		gradients: true,
// 		autoCenter: true,
// 		display: "single",
// 		elevation: 50

// 	});
// };
// // 隐藏工具条
// function hideTools(){
// 	$(".cover-tools").hide();
// }
// function nextPage() {
// 	var pageCount = $(".flipbook").turn("pages");//总页数
// 	var currentPage = $(".flipbook").turn("page");//当前页
// 	var zj = divNum[currentPage - 1].levelcode.split('-')[0];//divNum为二级标题的内容
// 	UTIL.searchsection._d = [];
// 	UTIL.searchsection.dosearch(sectiondata, divNum[currentPage - 1].levelcode);//20170926 shiqi 遍历当前节点下的所有子节点,只查找一级
// 	// console.log(divNum[currentPage - 1].levelcode)
// 	try {
// 		$.ajax({
// 			//url: 'section' + zj + '/section' + divNum[currentPage - 1].levelcode + '.html',
// 			url: 'section' + zj + '/' + divNum[currentPage - 1].code + '.html',//shiqi 20170919
// 			type: 'get',
// 			async: false,
// 			// data: { lc: divNum[currentPage - 1].levelcode },
// 			dataType: 'html',
// 			success: function (data) {
// 				//console.log(".p"+currentPage);
// 				$(".flipbook").find(".p" + (currentPage + 1)).eq(0).html(data);
// 				if (currentPage <= pageCount) {
// 					$(".flipbook").turn('page', currentPage + 1);
// 					$(".currentPage").text(currentPage + 1);
// 				} else {
// 				}

// 			}
// 		})
// 	} catch (e) {
// 		if (currentPage <= pageCount) {
// 			$(".flipbook").turn('page', currentPage + 1);
// 			$(".currentPage").text(currentPage + 1);
// 		} else {
// 		}
// 	}
// 	//console.log(currentPage)
// };
// function lastNextPage() {
// 	var pageCount = $(".flipbook").turn("pages");//总页数
// 	var currentPage = $(".flipbook").turn("page");//当前页
// 	// console.log(currentPage)
// 	if (currentPage == pageCount) {
// 		return
// 	}
// 	//console.log(currentPage+":"+pageCount)
// 	var zj = divNum[pageCount - 2].levelcode.split('-')[0];
// 	UTIL.searchsection._d = [];
// 	UTIL.searchsection.dosearch(sectiondata, divNum[pageCount - 2].levelcode);//20170926 shiqi 遍历当前节点下的所有子节点,只查找一级
// 	try {
// 		$.ajax({
// 			//url: 'section' + zj + '/section' + divNum[pageCount - 2].levelcode + '.html',
// 			url: 'section' + zj + '/' + divNum[pageCount - 2].code + '.html',//shiqi 20170919
// 			type: 'get',
// 			async: false,
// 			dataType: 'html',
// 			success: function (data) {
// 				$(".flipbook").find(".p" + pageCount).eq(0).html(data);

// 				$(".flipbook").turn('page', pageCount);
// 				$(".currentPage").text(pageCount);

// 			}
// 		})
// 	} catch (e) {
// 		// if (currentPage <= pageCount) {
// 		//     $(".flipbook").turn('page', currentPage + 1);
// 		//     $(".currentPage").text(currentPage + 1);
// 		// } else {
// 		// }
// 	}
// };
// function prePage() {
// 	var pageCount = $(".flipbook").turn("pages");//总页数
// 	var currentPage = $(".flipbook").turn("page");//当前页
// 	// hideTools();
// 	// console.log(divNum)
// 	//console.log(currentPage)
// 	if (currentPage < 3) {
// 		$(".flipbook").turn('page', 1);
// 		$(".currentPage").text(1);

// 	} else {
// 		var zj = divNum[currentPage - 3].levelcode.split('-')[0];
// 		UTIL.searchsection._d = [];
// 		UTIL.searchsection.dosearch(sectiondata, divNum[currentPage - 3].levelcode);//20170926 shiqi 遍历当前节点下的所有子节点,只查找一级
// 		try {
// 			$.ajax({
// 				// url: 'section' + zj + '/section' + divNum[currentPage - 3].levelcode + '.html',
// 				url: 'section' + zj + '/' + divNum[currentPage - 3].code + '.html',//shiqi 20170919
// 				type: 'get',
// 				async: false,
// 				dataType: 'html',
// 				success: function (data) {
// 					//console.log(".p"+currentPage);
// 					$(".flipbook").find(".p" + (currentPage - 1)).eq(0).html(data);
// 					if (currentPage >= 1) {
// 						$(".flipbook").turn('page', currentPage - 1);
// 						$(".currentPage").text(currentPage - 1);
// 					} else {
// 					}

// 				}
// 			})
// 		} catch (e) {
// 			if (currentPage <= pageCount) {
// 				$(".flipbook").turn('page', currentPage - 1);
// 				$(".currentPage").text(currentPage - 1);
// 			} else {
// 			}
// 		}
// 	}
// };
// function showCatalogue() {
// 	var currentPage = $(".flipbook").turn("page");//当前页
// 	if (currentPage !== 1) {
// 		$("#catalogue").show()
// 	} else {
// 		$("#catalogue").hide()
// 	}
// }
// $(document).keydown(function (e) {

// 	var previous = 37, next = 39, esc = 27;

// 	switch (e.keyCode) {
// 		case previous:

// 			// left arrow
// 			prePage();
// 			showCatalogue();
// 			e.preventDefault();
// 			$(".currentPage").text($(".flipbook").turn("page"));
// 			$("#catalogue").hide();
// 			$(".slide-ml").removeClass("active");
// 			$(".cover-tools").show();
// 			if($(".flipbook").turn("page")==1){
// 				hideTools();
// 			}
// 			break;
// 		case next:
// 			//right arrow
// 			nextPage();
// 			showCatalogue();
// 			// $('.flipbook').turn('next');

// 			e.preventDefault();
// 			$(".currentPage").text($(".flipbook").turn("page"));
// 			$("#catalogue").hide();
// 			$(".slide-ml").removeClass("active")
// 			$(".cover-tools").show();
// 			break;
// 		// case esc:

// 		//     $('.magazine-viewport').zoom('zoomOut');    
// 		//     e.preventDefault();

// 		// break;
// 	};
// });
// // 第一页
// $(".firstPage").on("click", function () {
// 	$(".flipbook").turn('page', 1);
// 	$(".currentPage").text(1);
// 	$("#catalogue").hide();
// 	$(".slide-ml").removeClass("active")
// 	showCatalogue();
// 	$(".cover-tools").hide()
// });
// //上一页
// $(".previousPage").on("click", function () {
// 	prePage();
// 	showCatalogue();
// 	$("#catalogue").hide();
// 	$(".slide-ml").removeClass("active");
// 	if($(".flipbook").turn("page")==1){
// 		hideTools();
// 	}
// });
// // 下一页
// $(".nextPage").on("click", function () {
// 	nextPage();
// 	showCatalogue();
// 	$("#catalogue").hide();
// 	$(".slide-ml").removeClass("active");
// 	$(".cover-tools").show()
// });
// // 最后一页
// $(".lastPage").on("click", function () {
// 	var pageCount = $(".flipbook").turn("pages");//总页数
// 	lastNextPage();
// 	showCatalogue();
// 	$(".currentPage").text(pageCount);
// 	$("#catalogue").hide();
// 	$(".slide-ml").removeClass("active")
// });

// //返回到目录页
// // $(".return").on("click", function () {
// //     $(".flipbook").turn('page', 1);
// //     $(".currentPage").text($(".flipbook").turn("page"));
// // });
// // function userHead() {
// //     var userHead = '<div class="cotainer">' +
// //         '<div class="col-lg6 col-md-6 col-sm-6 userHead-logo"><a href="index.html"><img src="/saasBeta/yanbao/images/logo.png"></a></div>' +
// //         '<div class="col-lg6 col-md-6 col-sm-6 userHead-out">' +
// //         '<div class="infor-name">' +
// //         '<em>' +
// //         '<img src="' + getuserinfo().headimg + '" alt="头像" />' +
// //         '</em>' +
// //         '<span>' + getuserinfo().username + '</span>' +
// //         '</div>' +
// //         '</div>' +
// //         '</div>';

// //     $(".qxheader").append(userHead)

// // };
// // function getuserinfo() {
// //     var userinfo = {}
// //     if (localStorage["headImg"] && localStorage["headImg"] !== "null")
// //         userinfo.headimg = localStorage["headImg"]
// //     if (localStorage["userName"] && localStorage["userName"] !== "null")
// //         userinfo.username = localStorage["userName"];
// //     return userinfo;
// // }


// $(function () {
// 	var windowHeight = $(window).height()
// 	$(".flipbook").height(windowHeight -130);
// 	$(".page-wrapper").height(windowHeight - 130);
// 	$(".slide-scroll").height(windowHeight - 260);
// 	$(window).resize(function () {
// 		var windowHeight2 = $(window).height();
// 		//console.log(windowHeight2)
// 		$(".flipbook").height(windowHeight2 - 130);
// 		$(".page-wrapper").height(windowHeight2 - 130);
// 		$(".slide-scroll").height(windowHeight2 - 260);
// 	})
// 	 $(".cover-tools").on("click","li",function(){
// 		$(this).siblings().children("div").hide();
// 		$(this).siblings().removeClass("active");
// 	})

// 	// 分享
// 	$(".slide-share span").on("click", function () {
// 		$("#share").toggle();
// 		$(this).parent().toggleClass("active");
// 	});

// 	//js动态生成二维码
// 	var elText = document.getElementById("text");
// 	var url = window.location.href;
// 	var realUrl = url.replace(".com", ".com/wei/znyb_phone");
// 	// var img=$("#ewm-img")[0];
// 	$("#text").qrcode({
// 		render: "canvas", // 渲染方式有table方式和canvas方式
// 		text: realUrl,
// 		width: 106,
// 		height: 106,
// 		colorDark: '#000000',
// 		colorLight: '#ffffff',
// 		//	correctLevel : H,
// 		src: 'images/logo2.png'
// 	})

// 	userPhoto();

// 	//function makeCode () {      
// 	//  var elText = document.getElementById("text");
// 	//  var url=window.location.href;
// 	//  var realUrl=url.replace("znyb_pc","znyb_phone");
// 	//  qrcode.makeCode(realUrl);
// 	//}
// 	//
// 	//makeCode();

// 	//			//修改滚动条的样式
// 	//			$(".slide-scroll").niceScroll({
// 	//				cursorcolor:"#36b8f4",
// 	//				autohidemode:false,
// 	//				cursorwidth: "6px", // 滚动条的宽度，单位：便素
// 	//				cursorborderradius: "5px"// 滚动条圆角（像素）
// 	//			});
// 	//			$(".contents").niceScroll({
// 	//				cursorcolor:"#36b8f4",
// 	//				autohidemode:false,
// 	//				cursorwidth: "6px", // 滚动条的宽度，单位：便素
// 	//				cursorborderradius: "5px"// 滚动条圆角（像素）
// 	//			});


// })



// //获取url中 的index地址，回跳到当前 章节 
// if (UTIL.getParaNoLocalStorage("index") != null && UTIL.getParaNoLocalStorage("index") != "undefined" && UTIL.getParaNoLocalStorage("index") != "") {
// 	//console.log(UTIL.getParaNoLocalStorage("index"));
// 	//登录回跳 
// 	setTimeout(function () { $("#catalogue").find("li").eq(parseInt(UTIL.getParaNoLocalStorage("index"))).click() }, 1000)

// }
