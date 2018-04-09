//模拟用户ID入缓存
var userId = localStorage.getItem("userId");
var contrasts = localStorage.getItem(userId);
$(function() {

	/**
	 * 显示用户添加的对比公司
	 */
	showContrast();

	/**
	 * 开始对比
	 */
	$("#contrastList_a")
			.click(
					function() {
						var stockCodes = "";
						var stockNames = "";
						$(".duibiCompany").each(function() {
							stockCodes += $(this).attr("data-code") + ",";
							stockNames += $(this).attr("data-name") + ",";
						})
						if (stockCodes != "" && stockNames != "") {
							location.href = "/multidimensionalStock/multidStockanalysisTable.html";
						} else {
							$.zmAlert("请选择要对比的企业");
						}

					})
	// 财务数据对比弹层
	$(".top_btn button,.contrast_left span").on("click", function() {
		var wi = $(window).width();
		var wi2 = $('.boar_l').width();
		var wi1 = wi - wi2 - 35;
		var wi3 = $(".main").width();
		if ($(".contrast_right").is(":visible")) {
			$(".contrast_right").removeClass("bounceOutLeft");
			$(".contrast_right").css("width","auto").hide();
		} else {
			
			$(".contrast_right").css("width",wi3).show();
			$(".contrast_right").addClass("bounceInLeft");
			$(".contra_yc").show();
		}
	});
	$(".contra_yc span").on("click", function() {
		$(".contrast_right").removeClass("bounceInLeft");
		$(".contrast_right span").hide();
		$(".contrast_right").hide();
		$(".contra_yc").hide();
		$(".contrast").css("width", "");
	});

})

/**
 * 显示对比公司
 */
function showContrast() {
	$(".duibiCompany").remove();
	if (contrasts != null) {
		var contrast = contrasts.split(",");
		$(contrast)
				.each(
						function() {
							var val = this.split("-");
							if (val[0] != "") {
								$("#contrastList_a")
										.before(
												"<span data-code="
														+ val[0]
														+ " data-name="
														+ val[1]
														+ " class='duibiCompany' >"
														+ val[1]
														+ "  ("
														+ val[0]
														+ ") <i data-value="
														+ val[0]
														+ " data-stocke="
														+ val[0]
														+ " onclick='removeIcon(this)'>X</i></span>");
							}
						})
	}
}

/**
 * 添加,删除对比公司
 * 
 * @param data
 */
function contrast(data) {
	
	var wi = $('.boar_r').width();
	var wi3 = $('.mPstock_table').width();
	var wi2 = $('.m_10_box').width();
	$(".contrast").css("width", wi);
	$(".contrast").css("width", wi2);
	$(".contrast").css("width", wi3);
	$(".contrast_right").show();
	$(".contrast_right").removeClass("bounceOutLeft");
	$(".contrast_right").addClass("bounceInLeft");
	$(".contrast_right span").show();
	$(".contra_yc").show();
	var contrast = "";
	if ($(data).text() == "加入对比") {
		var flag = true;
		if (contrasts == null) {
			contrasts = ",";
			contrasts += $(data).attr("data-code") + "-"
					+ $(data).attr("data-name") + ",";
			$(data).text("删除对比");
		} else {
			contrast = contrasts.split(",");
			if (contrast.length < 7) {
				$(contrast).each(function() {
					var val = this.split("-");
					if (val[0] == $(data).attr("data-code")) {
						flag = false;
					}
				})
				if (flag) {
					contrasts += $(data).attr("data-code") + "-"
							+ $(data).attr("data-name") + ",";
					$(data).text("删除对比");
				}
			} else {
				$.zmAlert("对比企业只能添加五个");
			}
		}
	} else if ($(data).text() == "删除对比") {
		contrast = contrasts.split(",");
		$(contrast).each(function() {
			var val = this.split("-");
			if (val[0] == $(data).attr("data-code")) {
				$(data).text("加入对比");
				contrasts = contrasts.replace("," + this, "");
			}
		})
	}
	showContrast();
	localStorage.setItem(userId, contrasts);
}

/**
 * 删除对比公司
 * 
 * @param data
 */
function removeIcon(data) {
	var contrast = contrasts.split(",");
	$(contrast).each(function() {
		var val = this.split("-");
		if (val[0] == $(data).attr("data-value")) {
			contrasts = contrasts.replace("," + this, "");
			var duibi = $(data).attr("data-value");
			$("#" + duibi + "").text("加入对比");
		}
	})
	localStorage.setItem(userId, contrasts);
	$(data).parent().remove();
}
