// $(function () {

//点击行业
$(".hy-list").delegate("span", "click", function () {
	if ($(this).hasClass("on")) {
		$(this).removeClass("on");
		getchecked._cdata(this.innerText);
	} else {
		$(this).addClass("on");

		getchecked._cdata(this.innerText, 1);
	}
});
//点击确定的按钮时
// $(".attention-btn").on("click", function () {
// 	findSelect();
// 	if (flag >= 3) {
// 		//跳转
// 	} else {
// 		//不做操作
// 		return false;
// 	}
// });

(function getattention() {
	param = {};
	UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.findNotionCon, param, true, function (data) {
		if (data.retCode == "0000") {
			var div = $("<div>")
			$.each(data.retData, function (k, v) {
				var span = $("<span>");
				span.text(v);
				div.append(span);
			})
			if (div.html())
				$(".hy-list").html(div.html());
			// window.location.href = "attentionField.html";
		} else {
			$.zmAlert(data.retMsg);
		}
	});
})();

// })
function findSelect() {
	var flag = 0;
	$(".hy-list span").each(function (index, item) {
		if ($(item).hasClass("on")) {
			flag++;
		}
	})
}
var getchecked = {
	len: 0,
	checkdata: [],
	_clen: function (a) {
		if (a)
			return this.len++;
		else
			return this.len--;
	},
	_cdata: function (e, is) {
		if (is) {
			this.checkdata.push(e);
			this._clen(1);
			return this.checkdata;
		}

		else {
			$.each(this.checkdata, function (k, v) {
				if (v === e) {
					this.checkdata.splice(k, 1);
					this._clen();
					return this.checkdata;
					// return false;
				}
			}.bind(this))
		}

	}
}
$("#save").on("click", function () {
	(getchecked.len > 2) ? UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.updateSignature, { field: "focusArea", value: getchecked.checkdata.join(',') }, true, function (_data) {
		// _data.retCode === "0000"? mui.toast('公司未填写', { duration: 'long', type: 'div' }):"";
		(_data.retCode === "0000") ? (localStorage.setItem('focusarea', getchecked.checkdata.join(',')), location.href = "perfectUserInfo.html") : "";//mui.toast('关注失败', { duration: 'long', type: 'div' })

	}) : $.zmAlert("关注行业需最少关注三个");
})