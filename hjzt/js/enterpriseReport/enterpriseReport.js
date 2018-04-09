$(function () {
    $(".conditions").show();
    $(".report_load").show();
    $(".company_model i").hide();
    $(".company_model").hide();
    $(".my_model").hide();
    var stockCodeAndName = [];//股票代码自动补全
    var stockCodeValue = [];//股票代码自动补全
    $(".next").hide();
    //tab切换
    $(".report_type a").on("click", function () {
        $(this).addClass("on").siblings().removeClass("on");
        if ($(this).text() === "企业报告") {
            $(".conditions").show();
            $(".report_load").show();
            $(".company_model i").hide();
            $(".company_model").hide();
            $(".next").hide();
            $(".my_model").hide();
        } else {
            $(".conditions").hide();
            $(".report_load").hide();
            $(".company_model i").hide();
            $(".company_model").show();
            $(".next").show();
            $(".my_model").show();
        }
    });
    //判断是否需要直接选中模型报告
    var toTab = getUrlParam("toTab");
    if (toTab === "model") {
        $('#model_a').click();
        //选中传过来的模型标题
        var idsParam = getUrlParam("ids");
        if (idsParam !== null && idsParam !== "") {
            var lis = $(".company_model i");
            var idsArr = idsParam.split(",");
            for (var i in idsArr) {
                for (var x = 0; x < lis.length; x++) {
                    if ($(lis[x]).attr("val") === idsArr[i]) {
                        $(lis[x]).show();
                    }
                }
            }
        }
    }
    $(".company_model li").on("click", function () {
        if ($(this).find("i").is(":hidden")) {
            $(this).find("i").show();
        } else {
            $(this).find("i").hide();
        }
    });
    $(".model_next").on("click", function () {
        var lis = $(".company_model li > i:visible");
        var ids = "";
        if(lis.length>0){
	        for (var x = 0; x < lis.length; x++) {
	            if (x > 0)
	                ids += ",";
	            ids += $(lis[x]).attr("val") + ":" + $(lis[x]).prev().text();
	        }
	        $(".model_tips").hide();
	        window.location.href = "/enterpriseReport/selectStock.html?ids=" + ids;
        }else{
        	$(".model_tips").show();
        }
    });

    loadIndustry("");
    loadArea("");
    loadReportList(getCond());
    loadStockCode();
    loadMyModel();
    //股票检索事件

    /**
     * 查询指标排名值
     * @param tradeId 行业主键
     * @param dateTime 时间
     * @param sortParam 排序方式：desc、asc
     * @param indicatorId 指标主键
     */
    function loadStockCode() {
        var industryId = $("#hiddenArea").val();
        var areaId = $("#hiddenArea").val();
        $.axs("/stock/reports/listStock.do", {'industry': industryId, 'area': areaId}, true, function (data) {

            if (data.retCode === '0000') {
                if (data.retData !== null && data.retData.length !== 0) {
                    for (var idx in data.retData) {
                        stockCodeAndName[idx] = data.retData[idx].shortName + "(" + data.retData[idx].stockCode + ")";
                        stockCodeValue[idx] = data.retData[idx].stockCode;
                    }
                }
                $("#inputStockCode").keydown(function (e) {
                    if (e.keyCode == 13) {
                        //回车事件
                        if ($("#inputStockCode").val() != "") {
                            var val = $.trim($("#inputStockCode").val());
                            if (searchList.length != 0) {
                                $.each(searchList, function (index, flag) {
                                    var val = $.trim($("#inputStockCode").val());
                                    aiOption();
                                    if (stockCodeAndName[index].indexOf(val) > -1) {
                                        $("#inputStockCode").val(stockCodeAndName[index]);
                                        $("#hiddenStockCode").val(stockCodeValue[index]);
                                    }
                                });
                            } else {
                                $.zmAlert("请输入正确的检索信息");
                            }
                        } else {
                            $.zmAlert("请输入要检索的信息");
                        }
                        $("#ui-id-2").hide();
                    }
                });

                //首页顶部搜索
                $("#inputStockCode").autocomplete({
                    minLength: 2,
                    source: function (request, response) {
                        findCodeName(request, response);
                    },
                    delay: 500,
                    select: function (event, ui) {
                        var item = ui.item;
                        $('#pageNum').val(1);
                        $("#hiddenStockCode").val(item.code);
                        loadReportList(getCond());
                    }
                });
            }
        });

    }



    /**
     * 加载二级行业
     */
    function loadIndustry(name) {
        var data = {type: 2, dataType: 2};
        if (name !== "") {
            data = {type: 2, dataType: 2, name: name};
        }
        $.axs("/stock/common/findWorkBookByName.do", data, false, function (data) {
            if (data.retCode === '0000') {
                $("#industryUL").empty();
                if (data.retData !== null && data.retData.length !== 0) {
                    var secondLevelTrade = data.retData;
                    var html = '';
                    if (name === "") {
                        html += '<li name="industryLi" value="0"><a href="javascript:void(0)">全部</a></li>';
                    }
                    $.each(secondLevelTrade, function (index, item) {
                        html += '<li name="industryLi" value="' + item.id + '"><a href="javascript:void(0)">' + item.nameCn + '</a></li>';
                    });
                    $("#industryUL").html(html);
                }
                aiOption();
            }
        });
    }

    /**
     * 加载地区
     */
    function loadArea(name) {
        var data = {type: 1, dataType: 1};
        if (name !== "") {
            data = {type: 1, dataType: 1, name: name};
        }
        $.axs("/stock/common/findWorkBookByName.do", data, false, function (data) {
            if (data.retCode === '0000') {
                if (data.retData !== null && data.retData.length !== 0) {
                    var firstLevelArea = data.retData;
                    var html = '<li value="0"><a href="javascript:void(0)">全部</a></li>';
                    $.each(firstLevelArea, function (index, item) {
                        html += '<li value="' + item.id + '"><a href="javascript:void(0)">' + item.nameCn + '</a></li>';
                    });
                    $("#areaUL").html(html);
                }
                aiOption();
            }
        });
    }
    ;

    /**
     * 行业和地区操作
     */
    function aiOption() {
        console.log("aiOption....");
        $(".selectBox ul li").on("click", function () {
            var p = $(this).parent().parent().find("p");
            $(".searching").hide();
            p.text($(this).find("a").text());
            p.attr("value", $(this).attr("value"));
            if ($(this).find("a").text() !== "全部") {
                //添加查询条件
                if (p.attr("id") === "area") {
                    addCond($(this).find("a").text(), $(this).attr("value"), "areaId");
                } else if (p.attr("id") === "stockCode") {
                    addCond($(this).find("a").text(), $(this).attr("value"), "stockCode");
                } else {
                    addCond($(this).find("a").text(), $(this).attr("value"), "industryId");
                }
            }
            $('#pageNum').val(1);
            loadReportList(getCond());
        });

    }
    ;

    function addCond(showText, value, type) {
        if (type === "areaId") {
            $("#hiddenArea").val(value);
        } else if (type === "industryId") {
            $("#hiddenIndustry").val(value);
        } else if (type === "stockCode") {
            $("#hiddenStockCode").val(value);
        }
    }

    function getCond() {
        var conditions = "";

        if ($("#industry").text() !== "全部行业" && $("#industry").text() !== "全部") {
            var v = ($("#hiddenIndustry").val() !== "undefined") ? $("#hiddenIndustry").val() : null;
            conditions = conditions + '&xxhyzl=' + v;
        }
        if ($("#area").text() !== "地区" && $("#area").text() !== "全部") {
            var v = ($("#hiddenArea").val() !== "undefined") ? $("#hiddenArea").val() : null;
            conditions = conditions + '&xxsfcs=' + v;
        }
        if ($("#hiddenStockCode").val() !== "") {
            var v = ($("#hiddenStockCode").val() !== "undefined") ? $("#hiddenStockCode").val() : null;
            conditions = conditions + '&xxzqdm=' + v;
        }
        return conditions;
    }

    $('#loadMore').on('click', function () {
        var tempIndex = $('#pageNum').val();
        $('#pageNum').val(parseInt(tempIndex) + 1);
        loadReportList(getCond(),'more');
    });

    /**
     * 加载项目动态列表
     * @param pageNum
     * @param pageSize
     * @param conditions
     */
    function loadReportList(conditions, type) {
        var pageNum = $('#pageNum').val();
        var pageSize = $('#pageSize').val();

        $.axs("/stock/reports/list.do", "currpage=" + pageNum + "&pagesize=" + pageSize + '&'
                + conditions, false, function (data) {
                    if (data.retCode === "0000") {
                        if (type !== 'more') {
                            $("#reportsList").empty();
                        }
                        if (data.retData.list !== null && data.retData.list !== "") {
                            $(data.retData.list).each(function () {
                                var inDiv = "<li>";
                                inDiv = inDiv + "   <div class=\"public\">";
                                inDiv = inDiv + "       <a href=\"/report/report_"+this.xxzqdm+".html\" target=\"_blank\"><img src=\"../images/baogao_03.png\" /></a>";
                                inDiv = inDiv + "       <span class=\"contain_mc\">" + this.xxzqjc + "</span>";
                                inDiv = inDiv + "       <span class=\"time\">(" + this.xxzqdm + ")</span>";
                                inDiv = inDiv + "   </div>";
                                inDiv = inDiv + " </li>";
                                $("#reportsList").append(inDiv);
                            });
                            var total = parseInt(data.retData.totalCount);
                            var ctotal = parseInt(data.retData.pageIndex) * parseInt(data.retData.pageLimit);
                            console.log("total: " + total);
                            console.log("ctotal: " + ctotal);
                            if (total >= ctotal) {
                                $('#loadMore').text("加载更多");
                                $('#pageNum').val(data.retData.pageIndex);
                                $('#pageSize').val(data.retData.pageLimit);
                                console.log("加载更多");
                            } else {
                                $('#loadMore').text("没有更多了");
                                $('#pageNum').val(parseInt(total / parseInt(data.retData.pageLimit)) + 1);
                            }
                        }
                    } else {
                        errorAlert(data.retCode, data.retMsg);
                    }
                });
    }

    /**
     * 加载我的模型
     */
    function loadMyModel() {
        $.axs("/stock/toolModel/myModels.do", null, false, function (data) {
            if (data.retCode === "0000") {
                var html = "";
                $(data.retData).each(function (index, item) {

                    html += '<li class="m_publicName"><a id="' + item.modelId + '">' + item.toolName + '</a></li>';

                    /*html+='<li class="m_publicName"  id="'+item.modelId+'"><a href="#">'+item.toolName+'</a></li>';*/

                });
                $(".my_model>ul").append(html);
            }
        });
    }
    $(".my_model").on("click", function () {
        $(".model_list").slideDown();
        $(".jiabeijing2").show();
    })

    //为我的模型添加事件
    $('.my_model>ul>.m_publicName').on("click", function () {
        if ($(this).hasClass("m_button")) {
            //新建模型
            window.location.href = "/toolAnalysis/modelPreview.html?from=report";
        } else {
            window.location.href = "/enterpriseReport/selectStock.html?modelId=" + $(this).attr("id");
        }
    });
    $('.my_model>ul>.m_button').on("click", function () {
        window.location.href = "/toolAnalysis/modelPreview.html";
    });
    //我的模型的鼠标经过事件
    $(".my_model>ul>.m_publicName").on("mouseenter", function () {
        $(this).addClass("on").siblings().removeClass("on");
    });
    $(".my_model>ul>.m_publicName").on("mouseleave", function () {
        $(this).removeClass("on");
    });
    //企业报告的点击其他地方时下拉框隐藏
    $(".jiabeijing").on("click",function(){
    	$(".selectBox ul").slideUp();
    })
     $(".jiabeijing2").on("click",function(){
    	$(".my_model ul").slideUp();
    	$(".jiabeijing2").hide();
    })

});
