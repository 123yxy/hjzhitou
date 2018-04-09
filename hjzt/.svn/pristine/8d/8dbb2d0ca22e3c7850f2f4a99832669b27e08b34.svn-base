/*

说明：下拉文本选择插件 input select
创建日期：2017年12月14日

*/

/// <reference path="../../jquery-1.8.0.min.js" />

BS.Common = BS.Common || {};

var toolsSelect = {

    Select: {

        //#region 创建方法

        Create: function (options) {

            //#region 基本配置

            var defaultsettings = {
                showID: "",                 //显示位置
                isAjax: true,               //是否通过Ajax加载数据,如果为true，需要配置AjaxConfig 如果为false 需要配置DefaultConfig
                AjaxConfig: {
                    async: false,           //请求方式 异步：ture 同步：false
                    data: {},               //ajax请求数据
                    url: "",                //ajax请求的地址,返回json类型数据
                    key: "key",             //json的key对应的属性名
                    value: "value"          //json的value对应的属性名
                    //例：[{ "key" : "1", "value" : "返回值1" }, { "key" : "2", "value" : "返回值2" }]
                },
                DefaultConfig: {
                    data: []                //[{ "key" : "1", "value" : "返回值1", "padding_left" : 10 }, { "key" : "2", "value" : "返回值2", "padding_left" : 20 }]
                },
                width: 220,                 //文本框宽度
                selectwidth:24,             //箭头图标宽度
                uniqueID: "",
                returnFun: function (v, o) {
                },                              //选择完成后执行的方法
                complateFun: function () {
                },
                require: undefined,             //是否必填，结合Cloudcool.CCM.Base一起使用
                title: undefined,               //显示文本上的title
                defaultKey: undefined,          //默认选中值

                haveCheckbox: false,             //是否多选
                max_height: 200
            };

            options = jQuery.extend(defaultsettings, options);

            //#endregion

            //#region 初始化判断

            if (options.showID.length == 0) {
                _Alert("请配置下拉框显示的位置:showID");
                return;
            }

            if ($("#" + options.showID).length == 0) {
                _Alert("未找到显示位置:showID");
                return;
            }
            //清空要显示层的内容
            $("#" + options.showID).empty();

            if (options.uniqueID.length == 0) {
                _Alert("请配置下拉框的ID:uniqueID");
                return;
            }

            if ($("#" + options.uniqueID).length > 0) {
                _Alert("发现相同ID：" + options.uniqueID + "！");
                return;
            }

            if (options.isAjax) {
                if (options.AjaxConfig.url.length == 0) {
                    _Alert("必须为下拉框添加请求的URL地址:url");
                    return;
                }

                if (options.AjaxConfig.key.length == 0 || options.AjaxConfig.value.length == 0) {
                    _Alert("必须为下拉框添加返回数据名:key||value");
                    return;
                }
            }

            //#endregion

            //#region 加载样式表

            _ImportCss("../saasBeta/js/select/select.css");

            //#endregion

            //#region 添加元素

            var input_require = options.require ? ' require=require ' : '';
            var input_title = options.title ? ' title=' + options.title : ''

            //添加元素

            $('<div class="sel_input_text" id="' + options.uniqueID + '" style="width:' + options.width + 'px;">' +
                    '    <input type="text" readonly="realonly"   ' + input_require + ' ' + input_title + ' name="' + options.uniqueID + '_input" class="sel_input_style" style="width:' + (options.width-options.selectwidth) + 'px" />' +
                    '    <input type="hidden" id="' + options.uniqueID + '_hidden" name="' + options.uniqueID + '_hidden" />' +
                    '    <span style="width:'+options.selectwidth+'px;"><img src="../saasBeta/js/select/selectIcon.png" /></span>' +
                    '   <ul class="sel_input_list"  style="width:' + (options.width - 2) + 'px;max-height:' + options.max_height + 'px;"></ul> ' +
                    '</div>').appendTo($("#" + options.showID));

            var objCurrent = $("#" + options.uniqueID);
            var objUl = $("ul", objCurrent), objInput = $("input[type='text']", objCurrent), objHidden = $("input[type='hidden']", objCurrent);
            var objImg = $("span", objCurrent), objDiv = $("#" + options.uniqueID);

            //#endregion

            //#region li基本事件

            $(objUl).off("mouseover").on("mouseover", "li", function () {

                $("li", objUl).removeClass("current").addClass("default");
                $(this).removeClass("default").addClass("current");

            }).off("click").on("click", "li", function (e) {

                if (!options.haveCheckbox) {

                    if (e.target.tagName != "INPUT") {
                        //单选
                        $("input:checkbox", $("li", objUl)).removeAttr("checked");
                        $("input:checkbox", $(this)).attr("checked", "checked");
                    }

                    //添加编号
                    addCheckedToHidden();

                    //隐藏弹出层
                    objUl.hide();

                    //回调方法
                    options.returnFun($(this).attr("data-id"), $(this));

                    //移除当前样式
                    $("li", objUl).removeClass("current").addClass("default");
                }
                else {

                    if (e.target.tagName != "INPUT") {

                        if ($("input:checkbox[checked]", $(this)).length > 0) {
                            $("input:checkbox[checked]", $(this)).removeAttr("checked");
                        }
                        else {
                            $("input:checkbox", $(this)).attr("checked", "checked");
                        }
                    }

                    //添加编号
                    addCheckedToHidden();
                }

                objInput.focus();

            });

            //#endregion

            //#region 保存编号

            function addCheckedToHidden() {

                var tempArray = [], tempArrayName = [];

                $("li", $(objUl)).each(function () {
                    if ($(this).find("input:checkbox[checked]").length > 0) {
                        tempArray.push($(this).attr("data-id"));
                        tempArrayName.push($("label", $(this)).html().replace("&lt;", "<").replace("&gt;", ">").replace(/&nbsp;/gi, ""));
                    }
                });

                objHidden.val(tempArray.join(','));
                objInput.val(tempArrayName.join(','));
            }

            //#endregion

            //#region 注册document事件

            $(top.window.document).off("click.selectDocumentEvent").on("click.selectDocumentEvent", selectDocumentEvent);
            $(document).off("click.selectDocumentEvent").on("click.selectDocumentEvent", selectDocumentEvent);

            function selectDocumentEvent(e) {

                try {
                    if ($(e.target).parents("div.sel_input_text").length > 0) {
                        return;
                    }

                    if (e.target.tagName == "BUTTON" && $(e.target).parents("table.msgAlertBox").length > 0)
                        return;

                    $("ul.sel_input_list").hide();
                    $("li", $("ul.sel_input_list")).removeClass("current");
                    objUl.hide();
                }
                catch (ex) { }
            }

            //#endregion

            //#region input基本事件

            objInput.click(function () {

                if ($(this).attr("disabled")) return;

                $("ul.sel_input_list").hide();
                _AjaxSearch(this, "click");


            }).keyup(function (event) {

                var that = this;
                //回车选择
                if (event.keyCode == 13) {

                    if (objUl.length > 0 && $("li", objUl).length > 0) {

                        if ($("li.current", objUl).length > 0) {

                            var selLi = $("li.current:first", objUl);
                            //单选
                            if (!options.haveCheckbox) {

                                $("input:checkbox", $("li", objUl)).removeAttr("checked");

                                $("input:checkbox", selLi).attr("checked", "checked");

                                //保存编号
                                addCheckedToHidden();

                                //隐藏弹出层
                                objUl.hide();

                                //回调方法
                                options.returnFun(selLi.attr("data-id"), selLi);

                            }
                            else {


                                if ($("input:checkbox[checked]", selLi).length > 0) {
                                    $("input:checkbox[checked]", selLi).removeAttr("checked");
                                }
                                else {
                                    $("input:checkbox", selLi).attr("checked", "checked");
                                }

                                //保存编号
                                addCheckedToHidden();

                            }




                        }
                    }
                    return;
                }

                //方向键向下
                if (event.keyCode == 40) {

                    if (objUl.length > 0 && $("li", objUl).length > 0) {

                        objUl.show();
                        if ($("li.current", objUl).length > 0) {

                            var currentIndex = $("li.current", objUl).index();
                            $("li", objUl).removeClass("current").addClass("default");
                            if (currentIndex == $("li", objUl).length - 1) {
                                //最后一个
                                $("li:first", objUl).removeClass("default").addClass("current");
                            }
                            else {
                                $("li:eq(" + (currentIndex + 1) + ")", objUl).removeClass("default").addClass("current");
                            }
                        }
                        else {

                            $("li:first", objUl).removeClass("default").addClass("current");
                        }

                    }
                    return;
                }

                //方向键向上
                if (event.keyCode == 38) {

                    if (objUl.length > 0 && $("li", objUl).length > 0) {

                        objUl.show();
                        if ($("li.current", objUl).length > 0) {

                            var currentIndex = $("li.current", objUl).index();
                            $("li", objUl).removeClass("current").addClass("default");
                            if (currentIndex == 0) {
                                //第一个
                                $("li:last", objUl).removeClass("default").addClass("current");
                            }
                            else {
                                $("li:eq(" + (currentIndex - 1) + ")", objUl).removeClass("default").addClass("current");
                            }
                        }
                        else {

                            $("li:last", objUl).removeClass("default").addClass("current");
                        }
                    }
                    return;
                }


                $("ul.sel_input_list").hide();
                _AjaxSearch(this, "keyup");


            }).keydown(function (event) {

                if (event.keyCode == 8) {
                    if (!options.haveCheckbox) {
                        $(this).val("");
                        $("input", objCurrent).val("");
                        return false;
                    }
                }
            });

            objImg.click(function () {

                objInput.focus().click();
            });

            //#endregion

            //#region 初始化 _defaultSet

            _defaultSet();

            //#endregion

            //#region 初始化ul
            function _defaultSet() {

                objUl.empty();

                if (options.isAjax) {

                    //ajax加载

                    $.ajax({

                        url: options.AjaxConfig.url,
                        data: options.AjaxConfig.data,
                        type: "post",
                        dataType: "json",
                        async: options.AjaxConfig.async,
                        success: function (json) {

                            if (json && json.JsonBox.DataInfo.Object) {

                                var objData = CC.Common.Object.SafeCharFilter(json.JsonBox.DataInfo.Object);
                                $.each(objData, function (i, item) {

                                    var ck = options.haveCheckbox ? '<input type="checkbox" style="width:14px;height:20px; line-height:20px; margin-right:2px;" value="' + item[options.AjaxConfig.key] + '" />' : '<input type="checkbox" style="display:none;width:14px;height:20px; line-height:20px; margin-right:2px;" value="' + item[options.AjaxConfig.key] + '" />';
                                    var hl = '<label>' + item[options.AjaxConfig.value] + "</label>";

                                    objUl.append('<li class="default"  ' + (item.Spell ? ' data-p=' + item.Spell : '') + ' data-id="' + item[options.AjaxConfig.key] + '" style="width:' + (options.width - 2) + 'px;' + (item.padding_left ? 'padding-left:' + (item.padding_left + "px") : '') + '">' + ck + hl + '</li>');
                                });

                                //初始化
                                if (options.defaultKey) {

                                    //字符串或数据
                                    if (Object.prototype.toString.call(options.defaultKey).slice(8, -1) == "Number" || Object.prototype.toString.call(options.defaultKey).slice(8, -1) == "String") {

                                        var objLi = $("li[data-id='" + options.defaultKey + "']:first", objUl);
                                        $("input:checkbox", objLi).attr("checked", "checked");
                                        addCheckedToHidden();

                                    }

                                    //数组
                                    if (Object.prototype.toString.call(options.defaultKey).slice(8, -1) == "Array") {

                                        $.each(options.defaultKey, function (i, item) {
                                            $("input:checkbox", $("li[data-id='" + item + "']", objUl)).attr("checked", "checked");
                                        });
                                        addCheckedToHidden();

                                    }

                                }

                                options.complateFun && options.complateFun();
                            }
                        }
                    });

                }
                else {

                    $.each(options.DefaultConfig.data, function (i, item) {

                        var ck = options.haveCheckbox ? '<input type="checkbox" value="' + item.key + '" />' : '<input type="checkbox" style="display:none;" value="' + item.key + '" />';
                        var hl = '<label title="'+item.value+'">' + item.value + "</label>";

                        objUl.append('<li class="default"  ' + (item.spell ? ' data-p=' + item.spell : '') + ' data-id="' + item.key + '" style="width:' + (options.width - 2) + 'px;' + (item.padding_left ? 'padding-left:' + (item.padding_left + "px") : '') + '">' + ck + hl + '</li>');
                    });

                    //初始化
                    if (options.defaultKey) {

                        //字符串或数据
                        if (Object.prototype.toString.call(options.defaultKey).slice(8, -1) == "Number" || Object.prototype.toString.call(options.defaultKey).slice(8, -1) == "String") {

                            var objLi = $("li[data-id='" + options.defaultKey + "']:first", objUl);
                            $("input:checkbox", objLi).attr("checked", "checked");
                            addCheckedToHidden();

                        }

                        //数组
                        if (Object.prototype.toString.call(options.defaultKey).slice(8, -1) == "Array") {

                            $.each(options.defaultKey, function (i, item) {
                                $("input:checkbox", $("li[data-id='" + item + "']", objUl)).attr("checked", "checked");
                            });
                            addCheckedToHidden();

                        }

                    }

                    options.complateFun && options.complateFun();
                }

            }
            //#endregion

            //#region 搜索 _AjaxSearch

            function _AjaxSearch(obj, u) {

                if ($("li", objUl).length == 0) {
                    objUl.hide();
                    return;
                }

                //click事件
                if (u == "click") {
//					inputHeight = $(obj).height() + $(obj).offset().top
                    var ulHeight = objUl.height(), windowHeight = $(window).height(), inputHeight = $(obj).height();
					if ((ulHeight + inputHeight) > windowHeight) {
                        objUl.css({ "margin-top": ulHeight * -1 - $(obj).height() });
                    }
                    else {
                        objUl.css({ "margin-top": "" });
                    }

                    objUl.show();
                    $("li", objUl).show();
                }

            }

            //#endregion

            //#region 导入样式表基本方法
            function _ImportCss(path) {

                var s = document.createElement("link");
                s.rel = "stylesheet";
                s.type = "text/css";
                s.href = path;
                s.disabled = false;

                var head = document.getElementsByTagName("head")[0];
                head.appendChild(s);

            }
            //#endregion

            //#region 系统配置错误
            function _Alert(message) {
                throw message;
            }
            //#endregion
        }

        //#endregion 

    }
};
BS.Common = jQuery.extend(BS.Common, toolsSelect);