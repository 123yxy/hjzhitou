/**
 * Created by Ancs on Hover
 * Date: 2017/7/14
 * Time: 13:15
 */
//页面联级查询
var LibraryPlugin = {
    //初始化根节点
    initTopDom : function(dataJson,hasShowChild){
        var html = "";
        $.each(dataJson,function(index,value){
            var dataType = value.level;
            var classSel = '';
            //判断是否为搜索后结果重新初始化根节点并选中
            if(hasShowChild===true && value.isSelect==1){
                classSel = 'sel';
            }else{
                classSel = value.isSelect==1 ? 'sel':'';
            }
            //判断节点是否开发完成
            var isOk='';
            if(value.isOk==0){
                isOk = 'no';
            }
            if(isOk=="no"){
            	classSel='suibian';
            }
            //判断是否为搜索后结果重新初始化根节点
            if(index==0 && hasShowChild==undefined){
                LibraryPlugin.initDataDom(value.id);
            }
            if(dataType==1){
                html += '<a href="javascript:void(0)" class="'+classSel+'" dataId="'+value.id+'" id="'+value.id+'" isOk="'+isOk+'" name="'+value.className+'" dataType="'+value.level+'" isIndex="'+value.isIndex+'">'+value.className+'</a>';
            }
        });
        $('div.top_rootDom').html(html);
    },
    //初始化数据容器
    initDataDom : function(dataId,hasShowChild){
        var url = '/betaInvest/btIndexClass/findClassByParentId.do'; //此为测试文件，请更改为正式接口地址
        //测试显示子节点，可以删除
        if(hasShowChild===true){
            url = '/betaInvest/btIndexClass/findClassByParentId.do';
        }
        var dataId = dataId;
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            data: "parentId="+dataId,
            beforeSend: function(xhr) {
			$(".loadingBox").show();
		},
            success: function(dataJson){
            	if(dataJson!=null){
            		var result = dataJson.retData;
            		LibraryPlugin.createDataDom(result);
            	}
            	$(".loadingBox").hide();
    	$(".jiabeijing4").hide();
            	
            }
        });
    },
    //初始化个股数据容器
    initStockDom : function(andereDataValue,andereDataUrl){
        var url = andereDataUrl; //此为测试文件，请更改为正式接口地址
        andereDataValue=andereDataValue.replace(/:/g,"=");
        andereDataValue=andereDataValue.replace(/,/g,"&");
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            data: andereDataValue,
            success: function(dataJson){
            	if(dataJson!=null){
            		var result = dataJson.retData;
            		LibraryPlugin.createDataDom(result);
            	}
            	$(".jiabeijing4").hide();
            }
        });
    },
    //绘制数据容器
    createDataDom : function(dataJson,hasToSearch){
        var html = '', htmlList = '';
        htmlList = this.initDataList(dataJson,hasToSearch);
        html = '<div class="center_dataList" dataParent_id="'+dataJson.id+'">'
            +'<div class="center_dataList_search">'
            +'<div class="center_input"><input type="text" class="center_search" name="dataList_search" dataId="'+dataJson.id+'" placeholder="搜索">'
            +'<i class="zhb_search1"></i></div>'
            +'<ul class="data_list">'+htmlList+'</ul>'
            +'</div>'
            +'</div>';
        $('div.center').append(html);
    },
    //初始化数据列表
    initDataList : function(dataJson,hasToSearch){
        var html = '', hasChild ='', hasSel = '', isOk = '';
        $.each(dataJson,function(index,value){
            //如果为页头查询结果，判断节点是否选中
            if(value.isSelect==1 && hasToSearch===true){
                hasSel = 'sel';
            }
            //判断节点是否开发完成
            if(value.isOk==0){
                isOk = 'no';
            }
            //判断节点是否为叶级
            if(value.level==0){
                hasChild = '<i></i>';
            }
            if(isOk=="no"){
            	hasSel='suibian';
            }
            html += '<li dataId="'+value.id+'" id="'+value.id+'" level="'+value.level+'" name="'+value.className+'" class="'+hasSel+'" isOk="'+isOk+'" isIndex="'+value.isIndex+'"';
            if(value.andereDataValue!=null){//是否有外部请求接口
            	html += ' andereDataValue="'+value.andereDataValue+'" andereDataUrl="'+value.andereDataUrl+'"'
            }
            if(value.stockCode!=null && value.stockCode!=undefined){//是否是个股选择
            	html += ' stockCode="'+value.stockCode+'" stockName="'+value.stockName+'"'
            }
            if(value.isIndex==1){
            	html += ' parentId="'+value.parentId+'" classValue="'+value.classValue+'"'
            }
            html += '>'+hasChild + value.className+'</li>';
            hasSel = '', isOk = '';
        });
        return html;
    },
    //点击根节点初始化列表容器
    clickRoot : function (dataId) {
        this.destoryDom($('div.center')); //销毁已有列表容器
        this.initDataDom(dataId); //根据新的根节点重新初始化列表
    },
    //数据列表快捷搜索
    searchList : function (inputDom) {
        var inputDom = $(inputDom);
        var inputVal = inputDom.val();
        var sear = new RegExp(inputVal);
        var listDom = inputDom.parents('div.center_dataList_search').find('ul.data_list li');
        if(inputVal==""){
            listDom.show();
            return;
        }
        $.each(listDom,function(index,value){
            var text = $(this).attr('name');
            if(sear.test(text)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    },
    //点击列表节点初始化下级列表容器
    clickParents : function (dataId,hasShowChild) {
        this.initDataDom(dataId,hasShowChild);
    },
    //点击列表节点初始化下级列表容器
    clickStocks : function (andereDataValue,andereDataUrl) {
        this.initStockDom(andereDataValue,andereDataUrl);
    },
    //页头搜索后，后台取完整数据结构并重绘控件
    searchTop : function (dataId) {
    	var selectBox=$(".selectBox1").find("p").text();
    	var findType='1';
    	if(selectBox=='搜股票'){
    		findType='2';
    	}
        url = '/betaInvest/btIndexClass/findIndex.do'; //此为测试文件，请更改为正式接口地址
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            data: "indexId="+dataId+"&findType="+findType,
            success: function(dataJson){
            	if(dataJson!=null){
            		var result = dataJson.retData;
            		LibraryPlugin.destoryDom($('div.center')); //销毁已有列表容器
                    LibraryPlugin.analysisSearchResault(eval(result)); //根据新的搜索结果解析后重新初始化列表
            	}else{
            		alert("无数据")
            	}
            	$(".jiabeijing4").hide();
            }
        });
    },
    //解析搜索结果
    analysisSearchResault : function (arr) {
        var map = {},
            dest = [];
        for(var i = 0; i < arr.length; i++){
            var ai = arr[i];
            if(!map[ai.level]){
                dest.push({
                    level: ai.level,
                    data: [ai]
                });
                map[ai.level] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.level == ai.level){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        $.each(dest,function (index,value) {
            if(value.level==1){
                LibraryPlugin.initTopDom(value.data, true); //重新初始化根节点
            }else {
                LibraryPlugin.createDataDom(value.data, true); //重新初始化列表
            }
        });
    },
    //销毁DOM
    destoryDom : function (domObj) {
        domObj.html('');
    },
    //初始化页面
    initPage : function(){
        $.ajax({
            type: "get",
            url: "/betaInvest/btIndexClass/initIndexClass.do", //此为测试文件，请更改为正式接口地址
            dataType: "json",
            success: function(dataJson){
            	if(dataJson!=null){
            		var result = dataJson.retData;
            		LibraryPlugin.initTopDom(result);
            	}
            	$(".jiabeijing4").hide();
            }
        });
    }
};
$(document).ready(function(){
	
    LibraryPlugin.initPage(); //初始化页面
    //页头联想搜索插件
    $("#top_search").bigAutocompletes({
    	//url: 'dataJson_child.json', //此为测试文件，请更改为正式接口地址
    	url:'/betaInvest/btIndexClass/findBtIndexClass.do',
        callback:function(data){
            LibraryPlugin.searchTop(data.id); //初始化表头及数据列表
        }
    });
    //点击页头根节点初始化列表容器
    $('body').on('click','.top_rootDom a',function (event) {
    	$("#top_search").val('');//切换分类，清空内容
        event.preventDefault();
        event.stopPropagation();
        var dataId = $(this).attr('dataId');
        var isOk = $(this).attr('isOk');
        if(isOk=="no"){
        	var layerId = $(this).attr('id');
       	 	layer.tips('敬请期待', "#"+layerId,{
       	 		time:1000
       	 	});
       	 	return;
       }else{
    	   $('.top_rootDom a').removeClass('sel');
    	   $(this).addClass('sel');
    	   LibraryPlugin.clickRoot(dataId);
       }
    });
    //点击列表节点初始化下级列表容器
    $('body').on('click','ul.data_list li',function (event) {
    	$("#top_search").val('');//切换分类，清空内容
    	$(".jiabeijing4").show();
        /*if($(this).hasClass('sel')){
            return;
        }*/
        var dataId = $(this).attr('dataId');
        var layerId = $(this).attr('id');
        var level = $(this).attr('level');
        var isOk = $(this).attr('isOk');
        var andereDataValue = $(this).attr('andereDataValue');
        var andereDataUrl = $(this).attr('andereDataUrl');
        var parentId = $(this).attr('parentId');
        var classValue = $(this).attr('classValue');
        //判断节点是否开发完成
        if(isOk=="no"){
        	
        	 layer.tips('敬请期待', "#"+layerId,{
       	 		time:1000
       	 	});
//          alert("敬请期待！");
    	$(".jiabeijing4").hide();
            return;
        }
        var dataParent_dom = $(this).parents('div.center_dataList');
        var dataParent_id = $(this).parents('div.center_dataList').attr('dataParent_id');
        $(this).parents('ul.data_list').find('li').removeClass('sel');
        $(this).addClass('sel');
        dataParent_dom.nextAll().remove(); //清空已存在的其他下级数据容器
        if(andereDataUrl!=null && andereDataUrl!="null"){
        	LibraryPlugin.clickStocks(andereDataValue,andereDataUrl);
        }else if(level!="0"){//判断是否为叶节点，叶节点不能再次点击
            LibraryPlugin.clickParents(dataId,true);
        }
        if(level==0 && isOk!="no"){
        	var stockCode='';
        	var stockName='';
        	var dateValue = [];
        	$(".sel").each(function(i,item){
        		if($(".sel").length-1!=i){
        			var index={};
            		index["id"]=$(item).attr("dataId");
            		index["className"]=$(item).attr('name');
            		index["isIndex"]=$(item).attr('isIndex');
            		var stockCode1=$(item).attr('stockCode');
            		var stockName1=$(item).attr('stockName');
            		if(stockCode1!=null && stockCode1!=undefined){
            			stockCode=stockCode1;
            		}
            		if(stockName1!=null && stockName1!=undefined){
            			stockName=stockName1;
            		}
            		dateValue.push(index);
        		}
        	})
            $.ajax({
                type: "get",
                url: "/betaInvest/btIndexClass/findClassByParentId.do",
                dataType: "json",
                async: false,
                data: "parentId="+parentId,
                success: function(dataJson){
                	if(dataJson!=null){
                		var result = dataJson.retData;
                		$(result).each(function(i,obj){
                			if(obj.isOk==1){
                				dateValue.push(obj);//只存储开发完成的指标
                			}
                		})
                	}
                	$(".jiabeijing4").hide();
                }
            });
        	console.log(dateValue);
        	localStorage.setItem("ZBQDATA", encodeURI(JSON.stringify(dateValue)));
        	var url="newseditChart.html?indexCode="+classValue;
        	if(stockCode!=null && stockCode!=''){
        		url+="&stockCode="+stockCode+"&stockName="+stockName;
        	}
            console.log("url:"+url);
        	window.location.href=url;
        }

		
        
    })
    //列表内联想搜索
    $('body').on('keyup','.center_dataList input[name=dataList_search]',function (event) {
        event.preventDefault();
        event.stopPropagation();
        LibraryPlugin.searchList(this);
    });
    //点击生成报表按钮
//  $('#subPage').on('click',function (event) {
//      event.preventDefault();
//      event.stopPropagation();
//      var liArr = $('ul.data_list:last li.sel')[0];
//      var selNodeId = $(liArr).attr('dataId');
//      if(selNodeId==undefined){
//          alert('请选择要生成报表的节点');
//      }else {
//          alert('生成报表ID：' + selNodeId);
//      }
//  })

	//点击搜指标显示下拉框
	$(".selectBox1 p").on("click",function(){
		if($(this).next().css("display")==="block"){
			$(this).next().slideUp();
		}else{
			$(this).next().slideDown();
		}
	})
	$(document).on("click", ".selectBox1 ul li", function() {
		var p = $(this).parent().parent().find("p");
		var oldVal=p.text();//获取点之前P标签的值
		p.text($(this).find("a").text());
		p.attr("value", $(this).attr("value"));
		var newVal=$(this).find("a").text();//获取点选之后P标签的值
    	if(newVal=='搜股票'){
    		$("#top_search").attr('placeholder','请输入股票简称/代码');
    	}else{
    		$("#top_search").attr('placeholder','请输入指标名称');
    	}
    	if(oldVal!=newVal){//当丙次选择不一样时清空搜索内容
    		$("#top_search").val('');
    	}
    	$(this).parent().slideUp();
	});
	//当输入框的有值的时候显示删除符号
	$("#top_search").on("keyup",function(e){
		var val=$.trim($(this).val());
		if(val!=null && val!=""  && val!=undefined){
			$(this).parent().find("i").hide();
			$(this).parent().find("b").show();
		}else{
			$(this).parent().find("i").show();
			$(this).parent().find("b").hide();
		}
	})
	//点击输入框的删除号
	$(".zhb_sc").on("click",function(){
		$(this).next().next().val("");
		$(this).hide();
		$(this).prev().show();
		LibraryPlugin.destoryDom($('div.center')); //销毁已有列表容器
		LibraryPlugin.initPage(); //初始化页面
	})
	
	

});

//自动补全控件
(function($){
    var bigAutocompletes = new function(){
        this.currentInputText = null;//目前获得光标的输入框（解决一个页面多个输入框绑定自动补全功能）
        this.functionalKeyArray = [9,20,13,16,17,18,91,92,93,45,36,33,34,35,37,39,112,113,114,115,116,117,118,119,120,121,122,123,144,19,145,40,38,27];//键盘上功能键键值数组
        this.holdText = null;//输入框中原始输入的内容

        //初始化插入自动补全div，并在document注册mousedown，点击非div区域隐藏div
        this.init = function(){
            $("body").append("<div id='bigAutocompletesContent' class='bigautocomplete-layout'></div>");
            $(document).bind('mousedown',function(event){
                var $target = $(event.target);
                if((!($target.parents().andSelf().is('#bigAutocompletesContent'))) && (!$target.is(bigAutocompletes.currentInputText))){
                    bigAutocompletes.hideAutocomplete();
                }
            })

            //鼠标悬停时选中当前行
            $("#bigAutocompletesContent").delegate("tr", "mouseover", function() {
                $("#bigAutocompletesContent tr").removeClass("ct");
                $(this).addClass("ct");
            }).delegate("tr", "mouseout", function() {
                $("#bigAutocompletesContent tr").removeClass("ct");
            });


            //单击选中行后，选中行内容设置到输入框中，并执行callback函数
            $("#bigAutocompletesContent").delegate("tr", "click", function() {
                bigAutocompletes.currentInputText.val( $(this).find("div:last").text());
                var callback_ = bigAutocompletes.currentInputText.data("config").callback;
                if($("#bigAutocompletesContent").css("display") != "none" && callback_ && $.isFunction(callback_)){
                    callback_($(this).data("jsonData"));

                }
                bigAutocompletes.hideAutocomplete();
            })

        }
        this.autocomplete = function(param){

            if($("body").length > 0 && $("#bigAutocompletesContent").length <= 0){
                bigAutocompletes.init();//初始化信息
            }

            var $this = $(this);//为绑定自动补全功能的输入框jquery对象

            var $bigAutocompletesContent = $("#bigAutocompletesContent");

            this.config = {
                //width:下拉框的宽度，默认使用输入框宽度
                width:$this.outerWidth() - 2,
                //url：格式url:""用来ajax后台获取数据，返回的数据格式为data参数一样
                url:null,
                /*data：格式{data:[{title:null,result:{}},{title:null,result:{}}]}
                 url和data参数只有一个生效，data优先*/
                data:null,
                //callback：选中行后按回车或单击时回调的函数
                callback:null};
            $.extend(this.config,param);

            $this.data("config",this.config);

            //输入框keydown事件
            $this.keydown(function(event) {
                switch (event.keyCode) {
                    case 40://向下键

                        if($bigAutocompletesContent.css("display") == "none")return;

                        var $nextSiblingTr = $bigAutocompletesContent.find(".ct");
                        if($nextSiblingTr.length <= 0){//没有选中行时，选中第一行
                            $nextSiblingTr = $bigAutocompletesContent.find("tr:first");
                        }else{
                            $nextSiblingTr = $nextSiblingTr.next();
                        }
                        $bigAutocompletesContent.find("tr").removeClass("ct");

                        if($nextSiblingTr.length > 0){//有下一行时（不是最后一行）
                            $nextSiblingTr.addClass("ct");//选中的行加背景
                            $this.val($nextSiblingTr.find("div:last").text());//选中行内容设置到输入框中

                            //div滚动到选中的行,jquery-1.6.1 $nextSiblingTr.offset().top 有bug，数值有问题
                            $bigAutocompletesContent.scrollTop($nextSiblingTr[0].offsetTop - $bigAutocompletesContent.height() + $nextSiblingTr.height() );

                        }else{
                            $this.val(bigAutocompletes.holdText);//输入框显示用户原始输入的值
                        }


                        break;
                    case 38://向上键
                        if($bigAutocompletesContent.css("display") == "none")return;

                        var $previousSiblingTr = $bigAutocompletesContent.find(".ct");
                        if($previousSiblingTr.length <= 0){//没有选中行时，选中最后一行行
                            $previousSiblingTr = $bigAutocompletesContent.find("tr:last");
                        }else{
                            $previousSiblingTr = $previousSiblingTr.prev();
                        }
                        $bigAutocompletesContent.find("tr").removeClass("ct");

                        if($previousSiblingTr.length > 0){//有上一行时（不是第一行）
                            $previousSiblingTr.addClass("ct");//选中的行加背景
                            $this.val($previousSiblingTr.find("div:last").text());//选中行内容设置到输入框中

                            //div滚动到选中的行,jquery-1.6.1 $$previousSiblingTr.offset().top 有bug，数值有问题
                            $bigAutocompletesContent.scrollTop($previousSiblingTr[0].offsetTop - $bigAutocompletesContent.height() + $previousSiblingTr.height());
                        }else{
                            $this.val(bigAutocompletes.holdText);//输入框显示用户原始输入的值
                        }

                        break;
                    case 27://ESC键隐藏下拉框

                        bigAutocompletes.hideAutocomplete();
                        break;
                }
            });

            //输入框keyup事件
            $this.keyup(function(event) {
                var k = event.keyCode;
                var ctrl = event.ctrlKey;
                var isFunctionalKey = false;//按下的键是否是功能键
                for(var i=0;i<bigAutocompletes.functionalKeyArray.length;i++){
                    if(k == bigAutocompletes.functionalKeyArray[i]){
                        isFunctionalKey = true;
                        break;
                    }
                }
                //k键值不是功能键或是ctrl+c、ctrl+x时才触发自动补全功能
                if(!isFunctionalKey && (!ctrl || (ctrl && k == 67) || (ctrl && k == 88)) ){
                    var config = $this.data("config");

                    var offset = $this.offset();
//                  $bigAutocompletesContent.width(config.width);
                    var h = $this.outerHeight() - 1;
                    $bigAutocompletesContent.css({"top":offset.top + h,"left":offset.left});

                    var data = config.data;
                    var url = config.url;
                    var keyword_ = $.trim($this.val());
                    if(keyword_ == null || keyword_ == "" || keyword_.length<2){
                        bigAutocompletes.hideAutocomplete();
                        return;
                    }
                    if(data != null && $.isArray(data) ){
                        var data_ = new Array();
                        for(var i=0;i<data.length;i++){
                            if(data[i].text.indexOf(keyword_) > -1){
                                data_.push(data[i]);
                            }
                        }

                        makeContAndShow(data_);
                    }else if(url != null && url != ""){//ajax请求数据
                        var selectBox=$(".selectBox1").find("p").text();
                    	if(selectBox=='搜股票'){
                    		url='/betaInvest/btIndexClass/findCodeName.do';
                    	}
                        $.get(url,{indexName:keyword_},function(result){
                            makeContAndShow(result)
                        },"json")
                    }


                    bigAutocompletes.holdText = $this.val();
                }
                //回车键
                if(k == 13){
                    var callback_ = $this.data("config").callback;
                    if($bigAutocompletesContent.css("display") != "none"){
                        if(callback_ && $.isFunction(callback_)){
                            callback_($bigAutocompletesContent.find(".ct").data("jsonData"));
                        }
                        $bigAutocompletesContent.hide();
                    }
                }

            });


            //组装下拉框html内容并显示
            function makeContAndShow(data_){
            	data_=data_.retData;
                if(data_ == null || data_.length <=0 ){
                    return;
                }
				var tt = $("#top_search").val();
				
                var cont = "<table><tbody>";
                for(var i=0;i<data_.length;i++){
                	var searchtext=data_[i].text.replace(tt,"<i class='red'>"+tt+"</i>");
                    cont += "<tr><td><div>" + searchtext + "</div></td></tr>"
                }
                cont += "</tbody></table>";
                $bigAutocompletesContent.html(cont);
                $bigAutocompletesContent.show();

                //每行tr绑定数据，返回给回调函数
                $bigAutocompletesContent.find("tr").each(function(index){
                    $(this).data("jsonData",data_[index]);
                })
            }


            //输入框focus事件
            $this.focus(function(){
                bigAutocompletes.currentInputText = $this;
            });

        }
        //隐藏下拉框
        this.hideAutocomplete = function(){
            var $bigAutocompletesContent = $("#bigAutocompletesContent");
            if($bigAutocompletesContent.css("display") != "none"){
                $bigAutocompletesContent.find("tr").removeClass("ct");
                $bigAutocompletesContent.hide();
            }
        }

    };
    $.fn.bigAutocompletes = bigAutocompletes.autocomplete;
})(jQuery)