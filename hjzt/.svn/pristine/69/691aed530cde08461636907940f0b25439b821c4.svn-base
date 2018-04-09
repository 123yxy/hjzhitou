$(function() {
	$(".ui-autocomplete-input-company").autocomplete({
			minLength: 2,
			source: function(request, response) {
//				console.log(request)
				searchObjecCodetList(request, response);
			},
			delay: 500,
			select: function(event, ui) {
				var item = ui.item;
				console.log(item)
				$(this).attr("ObjectCode", item.code);

				if($(this).attr("isjump") == "true") {
					window.location.href = "/searchList.html?stockcode=" + item.code + "&type=" + 2 + "&tj=" + "&content=" + item.name + "," + item.code;
				}
				$(".yd_img_icon").hide();
				$(".mx_yind").hide();
				$(".zhibiao_list").show();
				$(".mx_tc_btn").show();
			}
		}).focus(function () {
            $(this).autocomplete("search");
        });
		$(".ui-autocomplete-input-company").keydown(function(e) {
			if(e.keyCode == 13) {
				console.log($(this).val())
				//回车事件
				if($(this).val() != "") {
					var val = $.trim($(this).val());
					if(searchObjectList.length != 0) {
						$.each(searchObjectList, function(index, flag) {
							if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
								$(this).val(flag.name + "(" + flag.code + ")");
								$(this).attr("ObjectCode", flag.code);
								if($(this).attr("isjump") == "true") {
									window.location.href = "/searchList.html?stockcode=" + flag.code + "&type=" + 2 + "&tj=" + "&content=" + flag.name + "," + flag.code;
								}
							}
						});
						if($(this).val().indexOf("(") <= -1) {
							if($(this).attr("isjump") == "true") {
							window.location.href = "/companySearchList/companySearchList.html?txt="+val;
						   }
							$(this).val('');
							$(this).removeAttr("ObjectCode");
						}
					} else {
							if($(this).attr("isjump") == "true") {
							window.location.href = "/companySearchList/companySearchList.html?txt="+val;
						   }
						$(this).val('');
						$(this).removeAttr("ObjectCode");
						//$.zmAlert("请输入正确的检索信息");
					}
				} else {
					$(this).val('');
					$(this).removeAttr("ObjectCode");
					//$.zmAlert("请输入要检索的信息");
				}
				$("#ui-id-2").hide();
			}
		});
});