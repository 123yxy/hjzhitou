var iturl = window.location.pathname;
var ithtml = iturl.substring(iturl.lastIndexOf("/") + 1, iturl.lastIndexOf("."));
var pathnames = iturl.substring(iturl.indexOf("/") + 1, iturl.lastIndexOf("/"));
//console.log(pathnames)
$(document).ready(function () {

	var t_main = '<div class="t_main new_t_main">';
	t_main += '<ul id="informationList">';
	t_main += '<li class="gaikuang">';
	t_main += '<div class="on" onclick="javascript:window.location.href=\'stockQuotes.html\'">';
	t_main += '<img src="/saasBeta/images/shichang2.png"/>';
	t_main += '<p><a href="stockQuotes.html">市场概况</a></p>';
	t_main += '</div>';
	t_main += '</li>';
	t_main += '<li class="hangqing">';
	t_main += '<div  onclick="javascript:window.location.href=\'quotation.html\'">';
	t_main += '<img src="/saasBeta/images/zhishu2.png"/>';
	t_main += '<p><a href="quotation.html">行情</a></p>';
	t_main += '</div>';
	t_main += '</li>';
	t_main += '<li class="newguapai">';
	t_main += '<div onclick="skipListedCompaniesToListed()">';
	t_main += '<img src="/saasBeta/images/guapai2.jpg"/>';
	t_main += '<p><a href="listedCompaniesToListed.html">挂牌</a></p>';
	t_main += '</div>';
	t_main += '</li>';
	t_main += '<li class="newzuoshi">';
	t_main += '<div  onclick="javascript:window.location.href=\'marketMakingTransfer.html\'">';
	t_main += '<img src="/saasBeta/images/zuoshi2.png"/>';
	t_main += '<p><a href="marketMakingTransfer.html">做市</a></p>';
	t_main += '</div>';
	t_main += '</li>';
	t_main += '<li class="newxieyi">';
	t_main += '<div onclick="javascript:window.location.href=\'agreementTransfer.html\'">';
	t_main += '<img src="/saasBeta/images/xieyi2.png"/>';
	t_main += '<p><a href="agreementTransfer.html">协议</a></p>';
	t_main += '</div>';
	t_main += '</li>';
	t_main += '<li class="newdingzeng">';
	t_main += '<div  onclick="javascript:window.location.href=\'newsprivatePlacement.html\'">';
	t_main += '<img src="/saasBeta/images/today_zuoshigu2.png"/>';
	t_main += '<p><a href="newsprivatePlacement.html">定增</a></p>	';
	t_main += '</div>';
	t_main += '</li>';
	t_main += '<div class="clr"></div>';
	t_main += '</ul>';
	t_main += '</div>';
	//		if(pathnames==threeLibrary){
	//			$(".l_main").prepend(t_main);
	//		}

	if (ithtml == "agreementTransfer") {
		$(".sb-t-main").find("div").eq(0).after(t_main);
	} else {
		$(".sb-t-main").prepend(t_main);
	}
	if (ithtml == "stockQuotes") {
		$("#informationList li").find("div").removeClass("on");
		$("#informationList").find("li").eq(0).find("div").addClass("on");
	}
	if (ithtml == "quotation") {
		$("#informationList li").find("div").removeClass("on");
		$("#informationList").find("li").eq(1).find("div").addClass("on");
	}
	if (ithtml == "listedCompaniesToListed") {
		$("#informationList li").find("div").removeClass("on");
		$("#informationList").find("li").eq(2).find("div").addClass("on");
	}
	if (ithtml == "marketMakingTransfer") {
		$("#informationList li").find("div").removeClass("on");
		$("#informationList").find("li").eq(3).find("div").addClass("on");
	}
	if (ithtml == "agreementTransfer") {
		$("#informationList li").find("div").removeClass("on");
		$("#informationList").find("li").eq(4).find("div").addClass("on");
	}
	if (ithtml == "newsprivatePlacement") {
		$("#informationList li").find("div").removeClass("on");
		$("#informationList").find("li").eq(5).find("div").addClass("on");
	}

	//	A股的资讯数据	
	var A_main = '<div class="t_main new_t_main">';
	A_main += '<ul id="informationList">';


	A_main += '<li class="gaikuang ascgk">';
	 A_main += '<div class="on">';
	// A_main += '<div>'
	A_main += '<div style="width:66px;height:66px;border-radius: 50px;background-color:#F46C78;"><i class="fa fa-server"></i></div>';
	A_main += '<p><a href="javascript:void(0);">市场概况</a></p>';
	A_main += '</div>';
	A_main += '</li>';


	A_main += '<li class="hangqing abkjk">';
	A_main += '<div>';
	A_main += '<div style="width:66px;height:66px;border-radius: 50px;background-color:#65A4F3;"><i class="fa fa-laptop"></i></div>';
	A_main += '<p><a href="javascript:void(0);">板块监控</a></p>';
	A_main += '</div>';
	A_main += '</li>';


	A_main += '<li class="newguapai axgzx">';
	//  A_main+='<div>';
	A_main += '<div>';
	A_main += '<div style="width:66px;height:66px;border-radius: 50px;background-color:#FEB535;"><i class="fa fa-newspaper-o"></i></div>';
	A_main += '<p><a href="javascript:void(0);">新股中心</a></p>';
	A_main += '</div>';
	A_main += '</li>';
	A_main += '<li class="newzuoshi atzrl">';
	A_main += '<div	>';
	A_main += '<div style="width:66px;height:66px;border-radius: 50px;background-color:#9575DA;"><i class="fa fa-calendar"></i></div>';
	A_main += '<p><a href="javascript:void(0);">投资日历</a></p>';
	A_main += '</div>';
	A_main += '</li>';
	A_main += '<li class="newxieyi arz">';
	A_main += '<div>';
	A_main += '<div style="width:66px;height:66px;border-radius: 50px;background-color:#F8926C;"><i class="fa fa-usd"></i></div>';
	A_main += '<p><a href="javascript:void(0);">融资</a></p>';
	A_main += '</div>';
	A_main += '</li>';
	A_main += '<div class="clr"></div>';
	A_main += '</ul>';
	A_main += '</div>';
	$(".AguList").prepend(A_main);

//	if (ithtml == "scgk") {
//		$("#informationList li").find("div").removeClass("on");
//		$("#informationList").find("li").eq(0).find("div").addClass("on");
//	}
//	if (ithtml == "bkjk") {
//		$("#informationList li").find("div").removeClass("on");
//		$("#informationList").find("li").eq(1).find("div").addClass("on");
//	}
//	if (ithtml == "xgzx") {
//		$("#informationList li").find("div").removeClass("on");
//		$("#informationList").find("li").eq(2).find("div").addClass("on");
//	}
//	if (ithtml == "tzrl") {
//		$("#informationList li").find("div").removeClass("on");
//		$("#informationList").find("li").eq(3).find("div").addClass("on");
//	}
//	if (ithtml == "rz") {
//		$("#informationList li").find("div").removeClass("on");
//		$("#informationList").find("li").eq(4).find("div").addClass("on");
//	}


	var r_main = '<div class="r_main">';
	r_main += '<div class="market">';
	r_main += '<p>';
	r_main += '<span>市场概况</span>';
	r_main += '<span id="time1">2016-11-11</span>';
	r_main += '</p>';
	r_main += '<div class="m_market">';
	r_main += '<div><img src="/saasBeta/images/guapaishu.jpg"></div>';
	r_main += '<div class="public">';
	r_main += '<p>总挂牌(家)</p>';
	r_main += '<p><span id="totalGp"></span></p>';
	r_main += '</div>';
	r_main += '<div class="clr"></div>';
	r_main += '</div>';
	r_main += '<div class="m_market">';
	r_main += '<div><img src="/saasBeta/images/chengjiaohu,jpg.gif"></div>';
	r_main += '<div class="public">';
	r_main += '<p>成交股数(百万)</p>';
	r_main += '<p><span id="czGs"></span></p>';
	r_main += '</div>';
	r_main += '<div class="clr"></div>';
	r_main += '</div>';
	r_main += '<div class="m_market">';
	r_main += '<div><img src="/saasBeta/images/chengjiaoer.jpg"></div>';
	r_main += '<div class="public">';
	r_main += '<p>成交金额(亿)</p>';
	r_main += '<p><span id="czJe"></span></p>';
	r_main += '</div>';
	r_main += '<div class="clr"></div>';
	r_main += '</div>';
	r_main += '</div>';
	r_main += '<div class="number">';
	r_main += '<p>';
	r_main += '<span>指数</span>';
	r_main += '<span id="time2"></span>';
	r_main += '</p>';
	r_main += '<div class="m_number">';
	r_main += '<div class="up">';
	r_main += '<p id="zhishu_1"></p>';
	r_main += '</div>';
	r_main += '<div class="up_number">';
	r_main += '<p id="cf_zhishu"></p>';
	r_main += '<p>三板成分指数</p>';
	r_main += '</div>';
	r_main += '<div class="clr"></div>';
	r_main += '</div>';
	r_main += '<div class="m_number">';
	r_main += '<div class="down">';
	r_main += '<p id="zhishu_2"></p>';
	r_main += '</div>';
	r_main += '<div class="down_number">';
	r_main += '<p id="zs_zhishu"></p>';
	r_main += '<p>三板做市指数</p>';
	r_main += '</div>';
	r_main += '<div class="clr"></div>';
	r_main += '</div>';
	r_main += '</div>';
	r_main += '<div class="transacte">';
	r_main += '<p>';
	r_main += '<span>交易提示</span>';
	r_main += '<span id="time3"></span>';
	r_main += '</p>';
	r_main += '<div class="m_transacte">';
	r_main += '<div>';
	r_main += '<p>新股挂牌</p>';
	r_main += '<p id="xggp"></p>';
	r_main += '</div>';
	r_main += '<div>';
	r_main += '<p>新发股份挂牌</p>';
	r_main += '<p id="xfgp"></p>';
	r_main += '</div>';
	r_main += '<div>';
	r_main += '<p>转让方式变更</p>';
	r_main += '<p id="zrbg"></p>';
	r_main += '</div>';
	r_main += '<div>';
	r_main += '<p>除权除息</p>';
	r_main += '<p id="cqcx"></p>';
	r_main += '</div>';
	r_main += '<div>';
	r_main += '<p>暂停转让</p>';
	r_main += '<p id="ztzr"></p>';
	r_main += '</div>';
	r_main += '<div>';
	r_main += '<p>恢复转让</p>';
	r_main += '<p id="hfzr"></p>';
	r_main += '</div>';
	r_main += '</div>';
	r_main += '</div>';
	r_main += '<div class="clr"></div> ';
	r_main += '</div>';
	if (ithtml == "stockQuotes" || ithtml == "quotation" || ithtml == "monthlyMarket") {
		$(".l_main").after(r_main);
	}

	$("#informationList").on("click", function (e) {
		var evt = e || event;
		target = evt.target;
		while (target.tagName !== "LI") {
			target = target.parentElement;
			if (!target)
				return false;
		}
		$(".AguList li div").removeClass("on");
		target.childNodes[0].setAttribute("class","on");
		var chi = target.childNodes[0].children[1].childNodes[0].innerText;
		switchmenu(chi)

	})
});

/**
 * 跳转到挂牌
 */
function skipListedCompaniesToListed() {
	localStorage.setItem("indPageNum", 0);
	location.href = "/threeLibrary/listedCompaniesToListed.html";
}

