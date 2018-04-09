var total = "--"; //我的项目总条数
$(document).ready(function(){
	
	loadProjectList(1, 8, getCondition());
	
	$(".fujian i").mouseover(function(){
		$(this).siblings(".fujian_tc").show();
	});
	
	//	关闭附件弹窗
	$(".fj_tc_title b").on("click",function(){
		$(this).parent().parent(".fujian_tc").hide();
	});
	
	
	$(".selectBox li").click(function(){
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text($(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
		loadProjectList(1, 8, getCondition());
	})
	
	$("#search").click(function(){
		loadProjectList(1, 8, getCondition());
	})
	
	/*信息补全开始*/
	$("#stock").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($("#stock").val() != "") {
				var val = $.trim($("#stock").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
//								window.location.href = '/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name;
//								window.open('/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name);
							loadProjectList(1, 8, getCondition());
						}
					});
				}else{
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	
	//首页顶部搜索
	$("#stock").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			console.log(item);
		}
	});
	/*信息补全结束*/
});

/**
 * 获取查询的条件
 */
function getCondition() {
	var conditions = "";
	if($(".selectBox p").attr("value") != undefined){
		conditions += '&schedule=' + $(".selectBox p").attr("value");
	}
	if ($("#stock").val() != "") {
		var val = $.trim($("#stock").val());
		if(val.indexOf("(") != -1){
			val = val.substring(val.indexOf("(") + 1,val.length - 1);
		}
        conditions += '&stock=' + val;
    }
	if ($("#publishTimeStart").val() != "") {
        conditions += '&publishTimeStart=' + $("#publishTimeStart").val();
    }
    if ($("#publishTimeEnd").val() != "") {
        conditions += '&publishTimeEnd=' + $("#publishTimeEnd").val();
    }
    return conditions;
}

/**
 * 加载项目动态列表
 * @param pageNum
 * @param pageSize
 * @param conditions
 */
function loadProjectList(pageNum, pageSize, conditions) {
    $.axs("/stock/project/findList.do", "pageNum=" + pageNum + "&pageSize=" + pageSize + conditions, false, function (data) {
        if (data.retCode == "0000") {
            $("#projectList").empty();
            if (data.retData.projectList != null && data.retData.projectList != "") {
                $(data.retData.projectList).each(function () {
                    var tr = $("<tr>");
                    var stockTd = $("<td>"); //股票代码和股票名称
                    var stockA = $("<a target='_blank' href='/businessDetails/newTBindex.html?stockName="+this.stockName+"&stockCode="+this.stockCode+"'>");
                    stockA.text(this.stockName + "(" + this.stockCode + ")");
                    stockTd.append(stockA);
                    var td3 = $("<td>"); //所属行业
                    td3.text(this.industry);
                    var td4 = $("<td>"); //融资金额
                    var raisePrice = "";
                    if (this.raisePrice == "1") {
                        raisePrice = "5000万以下";
                    } else if (this.raisePrice == "2") {
                        raisePrice = "5000万-1亿";
                    } else if (this.raisePrice == "3") {
                        raisePrice = "1亿-2亿";
                    } else if (this.raisePrice == "4") {
                        raisePrice = "2亿以上";
                    }
                    td4.text(raisePrice);
                    var td5 = $("<td>"); //定增进度
                    var schedule = "";
                    if (this.schedule == 1) {
                        schedule = "未开始";
                    } else if (this.schedule == 2) {
                        schedule = "董事会预案";
                    } else if (this.schedule == 3) {
                        schedule = "股东大会通过";
                    } else if (this.schedule == 4) {
                        schedule = "实施完成";
                    } else if (this.schedule == 5) {
                        schedule = "停止实施";
                    }
                    td5.text(schedule);

                    var td6 = $("<td class='ck'>"); //查看详情
                    var td6A = $("<a href='/project/projectDetails.html?id=" + this.id + "'>");
                    var td6Em = $("<em>"); //查看详情
                    td6A.on("mouseover", function () {
                        $(this).addClass("on");
                    })
                    td6A.on("mouseout", function () {
                        $(this).removeClass("on");
                    })
                    td6A.append(td6Em);
                    td6A.append("查看");
                    td6.append(td6A);
                    var td7 = $("<td class='shuzi fujian'>"); //附件
                    var td7I = $("<i>");
                    var urls = this.enclosureUrl;
                    var urlArray = "";
                    if (urls != null && urls != "") {
                        urlArray = urls.split(",");
                    }
                    if (this.enclosureUrl != null && this.enclosureUrl != "") {
                        if (urlArray.length > 1) {
                            var td7Div = $("<div class='fujian_tc' style = 'display:none;'>");
                            var td7Div1 = $("<div  class='fj_tc_title'>");
                            var td7Span = $("<span>");
                            var td7B = $("<b>");
                            var td7Div2 = $("<div class='fj_ul'>");
                            var td7Ul = $("<ul>");
                            td7Span.text("项目附件");
                            td7Div1.append(td7Span);
                            td7Div1.append(td7B);
                            $(urlArray).each(function () {
                                var li = $("<li>");
                                var a = $("<a href='javascript:;' onclick='seeEnclosure(\"" + encodeURIComponent(this) + "\")'>");
                                a.text(this.substring(this.lastIndexOf("/")+1).substring(14));
                                li.append(a);
                                td7Ul.append(li);
                            })
                            td7I.on("mouseover", function () {
                                td7Div.show();
                            })
                            td7B.on("click", function () {
                                td7Div.hide();
                            })
                            td7Div2.append(td7Ul);
                            td7Div.append(td7Div1);
                            td7Div.append(td7Div2);
                        } else {
//                        	urls = urls.substring(0,urls.lastIndexOf("/") + 1)+urls.substring(urls.lastIndexOf("/")+1).substring(14);
                            td7I.attr("onclick", "seeEnclosure(\"" + encodeURIComponent(urls) + "\")");
                        }
                    }
                    td7.append(td7I);
                    td7.append(td7Div);
                    var td8 = $("<td>"); //发布时间
                    td8.text(this.publishTime);
                    tr.append(stockTd);
                    tr.append(td3);
                    tr.append(td4);
                    tr.append(td5);
                    tr.append(td6);
                    tr.append(td7);
                    tr.append(td8);
                    $("#projectList").append(tr);
                })
                if(conditions == ""){
                	total = data.retData.total;
                }
                $("#total").text(total);
                $("#wksNum").text(data.retData.wksNum);
                $("#dshyaNum").text(data.retData.dshyaNum);
                $("#wcNum").text(data.retData.wcNum);
                $("#tzNum").text(data.retData.tzNum);
                
                $('#page').show();
                //分页
                $('#page').pagination({
                    total: data.retData.total,
                    pageSize: pageSize,
                    current:pageNum,
                    layout: ['first', 'prev', 'links', 'next'],
                    links: 0,
                    displayMsg: "",
                    showPageList: false,
                    onSelectPage: function (pageNumber, size) {
                        loadProjectList(pageNumber, size, getCondition());
                    }
                });
                //修改分页文字
                setPageText('page');
            }
        } else {
            errorAlert(data.retCode, data.retMsg);
        }
    });
}

/**
 * 查看项目附件
 * @param url
 */
function seeEnclosure(url) {
    if (url == null || "" == url) {
        $.zmAlert("文件路径错误！");
    }
    window.open(decodeURIComponent(url));
}
