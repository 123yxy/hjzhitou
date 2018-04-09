//新的自动补全
var dataTj;//推荐数据
var clickedValue={};//点击过的提示信息
		//自动补全控件
var lastResult;//上一次补全的返回结果
var lastSearchText="";
//自动补全控件
(function($){
	function getSearchTest(){
		return $('#topSearch').val();
	}
    var bigAutocomplete = new function(){
        this.currentInputText = null;//目前获得光标的输入框（解决一个页面多个输入框绑定自动补全功能）
        this.functionalKeyArray = [9,20,13,16,17,18,91,92,93,45,36,33,34,35,37,39,112,113,114,115,116,117,118,119,120,121,122,123,144,19,145,40,38,27];//键盘上功能键键值数组
        this.holdText = null;//输入框中原始输入的内容

        //初始化插入自动补全div，并在document注册mousedown，点击非div区域隐藏div
        this.init = function(){
            $(".search_in_put").append("<div id='bigAutocompleteContents' class='bigcomplete'></div>");
            $(document).bind('mousedown',function(event){
               
                var $target = $(event.target);
                if((!($target.parents().andSelf().is('#bigAutocompleteContents'))) && (!$target.is(bigAutocomplete.currentInputText))){
                    bigAutocomplete.hideAutocomplete();
                }
            })

            //鼠标悬停时选中当前行
            $("#bigAutocompleteContents").delegate("tr", "mouseover", function() {
                $("#bigAutocompleteContents tr").removeClass("ct");
                $(this).addClass("ct");
                if($(this).attr("data-type")){
                	$("#topSearch").val($(this).find("div:last").text());
                }
            }).delegate("tr", "mouseout", function() {
                $("#bigAutocompleteContents tr").removeClass("ct");
            });

            //单击选中行后，选中行内容设置到输入框中，并执行callback函数
            $("#bigAutocompleteContents").delegate("tr", "click", function() {
                bigAutocomplete.currentInputText.val( $(this).find("div:last").text());
                var callback_ = bigAutocomplete.currentInputText.data("config").callback;
                if($("#bigAutocompleteContents").css("display") != "none" && callback_ && $.isFunction(callback_)){
                    callback_($(this).attr("data-type"),$(this).attr("stockcode"),$(this).attr("search_value"));
                }
                search($(this).attr("stockcode"),$(this).attr("search_value"),$(this).attr("data-type"),$(this).attr("value1"),$(this).attr("value2"),$(this).attr("tipid"),$(this).attr("tj"));
                bigAutocomplete.showTj($(this).attr("stockcode"),$(this).attr("search_value"),$(this).attr("data-type"),$(this).attr("value1"),$(this).attr("value2"),$(this).attr("tipid"));
                //bigAutocomplete.hideAutocomplete();
            })
        }
        this.autocomplete = function(param){
            if($("body").length > 0 && $("#bigAutocompleteContents").length <= 0){
                bigAutocomplete.init();//初始化信息
            }

            var $this = $(this);//为绑定自动补全功能的输入框jquery对象

            var $bigAutocompleteContent = $("#bigAutocompleteContents");

            this.config = {
                //width:下拉框的宽度，默认使用输入框宽度
                width:$this.outerWidth() - 2,
                //url：格式url:""用来ajax后台获取数据，返回的数据格式为data参数一样
                url:'/betaInvest/searchTips/search.do',
                /*data：格式{data:[{title:null,result:{}},{title:null,result:{}}]}
                 url和data参数只有一个生效，data优先*/
                data:null,
                //callback：选中行后按回车或单击时回调的函数
                callback:null};
            $.extend(this.config,param);

            $this.data("config",this.config);

            //输入框keydown事件
            $this.on("keydown",function(event) {
                switch (event.keyCode) {
                    case 40://向下键
                        if($bigAutocompleteContent.css("display") == "none")return;

                        var $nextSiblingTr = $bigAutocompleteContent.find(".ct");
                        var $textTr=$bigAutocompleteContent.find(".ct");
                        if($nextSiblingTr.length <= 0){//没有选中行时，选中第一行
                            $nextSiblingTr = $bigAutocompleteContent.find("tr:first");
                        }else{
                            $nextSiblingTr = $nextSiblingTr.next();
                        }
                        $bigAutocompleteContent.find("tr").removeClass("ct");

                        if($nextSiblingTr.length > 0){//有下一行时（不是最后一行）
                        	
                              $nextSiblingTr.addClass("ct");//选中的行加背景
                              $this.val($nextSiblingTr.find("div:last").text());//选中行内容设置到输入框中

                            //div滚动到选中的行,jquery-1.6.1 $nextSiblingTr.offset().top 有bug，数值有问题
                            $bigAutocompleteContent.scrollTop($nextSiblingTr[0].offsetTop - $bigAutocompleteContent.height() + $nextSiblingTr.height() );

                        }else{
                        	if($textTr.parent().parent().hasClass("tstj")){
                        		if($this.next().find(".search_list").find("tr:first").attr("data-type")){
                        			$this.next().find(".search_list").find("tr:first").addClass("ct");
                        			$this.val($this.next().find(".search_list").find("tr:first").find("div:last").text());//选中行内容设置到输入框中
                        		}else{
                        			$this.next().find(".search_list").find("tr:first").next().addClass("ct");
                        			$this.val($this.next().find(".search_list").find("tr:first").next().find("div:last").text());//选中行内容设置到输入框中
                        		}
                        	}else{
                        		if($this.next().find(".tstj").find("tr:first").attr("data-type")){
                        			$this.next().find(".tstj").find("tr:first").addClass("ct");
                        			 $this.val($this.next().find(".tstj").find("tr:first").find("div:last").text());//选中行内容设置到输入框中
                        		}else{
                        			$this.next().find(".tstj").find("tr:first").next().addClass("ct");
                        			$this.val($this.next().find(".tstj").find("tr:first").next().find("div:last").text());//选中行内容设置到输入框中
                        		}
                          		$this.next().find(".tstj").find("tr:first").addClass("ct");
                        	}
                        	
                              //$this.val(bigAutocomplete.holdText);//输入框显示用户原始输入的值
                        }
//						var a=event.target;
//						console.log(a)
                        break;
                    case 38://向上键
                        if($bigAutocompleteContent.css("display") == "none")return;

                        var $previousSiblingTr = $bigAutocompleteContent.find(".ct");
                        var $prevTr= $bigAutocompleteContent.find(".ct");
                        if($previousSiblingTr.length <= 0){//没有选中行时，选中最后一行行
                            $previousSiblingTr = $bigAutocompleteContent.find("tr:last");
                        }else{
                            $previousSiblingTr = $previousSiblingTr.prev();
                        }
                        $bigAutocompleteContent.find("tr").removeClass("ct");

                        if($previousSiblingTr.length > 0){//有上一行时（不是第一行）

							if($prevTr.prev().attr("data-type")){
								$prevTr.prev().addClass("ct");
//								$previousSiblingTr.addClass("ct");//选中的行加背景
                            	$this.val($prevTr.prev().find("div:last").text());//选中行内容设置到输入框中
							}else{
								if($prevTr.parent().parent().hasClass("tstj")){
									$this.next().find(".search_list").find("tr:last").addClass("ct");
									$this.val($this.next().find(".search_list").find("tr:last").find("div:last").text());//选中行内容设置到输入框中
								}else{
									if($prevTr.length<=0){
										$bigAutocompleteContent.find("tr:last").addClass("ct");
										$this.val($bigAutocompleteContent.find("tr:last").find("div:last").text());
									}else{
										$this.next().find(".tstj").find("tr:last").addClass("ct");
										$this.val($bigAutocompleteContent.find(".ct").find("div:last").text());
									}
									
								}
							}
                            //div滚动到选中的行,jquery-1.6.1 $$previousSiblingTr.offset().top 有bug，数值有问题
                            $bigAutocompleteContent.scrollTop($previousSiblingTr[0].offsetTop - $bigAutocompleteContent.height() + $previousSiblingTr.height());
                       }else{
                        	
                              $this.val(bigAutocomplete.holdText);//输入框显示用户原始输入的值
                        }

                        break;
                    case 27://ESC键隐藏下拉框
                        bigAutocomplete.hideAutocomplete();
                        break;
                      
                }
                if($this.val().length>=38){
                	$(".input_tips").show().delay(1000).fadeOut();
                }
            });
			$this.on("click",function(event){
				if(lastResult==null || getSearchTest()==""){
					$.axs("/betaInvest/searchTips/search.do",{text:getSearchTest()},false,function(result){
						lastResult=result;
	                    makeContAndShow(result);
                    });
				}else{
					makeContAndShow(lastResult);
				}
			});
            //输入框keyup事件
            $this.on("keyup",function(event) {
                var k = event.keyCode;
                var ctrl = event.ctrlKey;
                var isFunctionalKey = false;//按下的键是否是功能键
                for(var i=0;i<bigAutocomplete.functionalKeyArray.length;i++){
                    if(k == bigAutocomplete.functionalKeyArray[i]){
                        isFunctionalKey = true;
                        break;
                    }
                }
                //console.log(k+":"+ctrl+":"+isFunctionalKey)
                //k键值不是功能键或是ctrl+c、ctrl+x时才触发自动补全功能
                if(!isFunctionalKey && (!ctrl || (ctrl && k == 67) || (ctrl && k == 88) || (ctrl && k == 86)) ){
                    var config = $this.data("config");
                    var offset = $this.offset();
//                  $bigAutocompleteContent.width(config.width);
                    var h = $this.outerHeight() - 1;
//                  $bigAutocompleteContent.css({"top":offset.top + h,"left":offset.left});

                    var data = config.data;
                    var url = config.url;
                    var keyword_ = $.trim($this.val());
//                  if(keyword_ == null || keyword_ == "" || keyword_.length<1){
//                      bigAutocomplete.hideAutocomplete();
//                      return;
//                  }
                    if(data != null && $.isArray(data) ){
                        var data_ = new Array();
                        for(var i=0;i<data.length;i++){
                            if(data[i].text.indexOf(keyword_) > -1){
                                data_.push(data[i]);
                            }
                        }
                        makeContAndShow(data_);
                    }else if(url != null && url != ""){//ajax请求数据
                    	/*if(k==8){//删除键
                    		 bigAutocomplete.hideAutocomplete();
                    		 lastSearchText="";
                    	}else{*/
                    		var txt = getSearchTest();
                    		//console.log(lastSearchText!=txt.trim());
                    		if(k==32 || lastSearchText!=txt.trim()){
                    			lastSearchText=txt.trim();
	                    		$.axs(url,{text:txt},false,function(result){
	                    			lastResult=result;
	                                makeContAndShow(result);
	                              	//设置输入框的值
	                              	if(k!=8 && txt.trim().length>0 && result.retData.tips && result.retData.tips.length>0){
	                              		var first = result.retData.tips[0];
	                              		if(first.weight_type==14 || first.weight_type==15){
	                              			selectText(first.tip_value);	
	                              		}else{
	                              			selectText(first.search_value);	
	                              		}
	                              	}
	                            });
                    		}
                    	//}
                    }
                    bigAutocomplete.holdText = $this.val();
                      
                }
                //回车键
                if(k == 13){
                    var callback_ = $this.data("config").callback;
                  //console.log(callback_)
                    if($bigAutocompleteContent.css("display") != "none"){
       
                        var current = $bigAutocompleteContent.find(".ct");
                        //console.log(current)
                        if(callback_ && $.isFunction(callback_)){
                            callback_(current.attr("data-type"),current.attr("stockcode"),current.attr("search_value"));
                        }
                        if(current.attr("data-type")==undefined){
                        	search("",getSearchTest(),"","","","","");
                        }else{
                        	search(current.attr("stockcode"),current.attr("search_value"),current.attr("data-type"),current.attr("value1"),current.attr("value2"),current.attr("tipid"),current.attr("tj"));
	                        bigAutocomplete.showTj(current.attr("stockcode"),current.attr("search_value"),current.attr("data-type"),current.attr("value1"),current.attr("value2"),current.attr("tipid"));
                        }
                    }else{
                    	search("",getSearchTest(),"","","","","");
                    }
                }
            });


            //组装下拉框html内容并显示
            function makeContAndShow(data_){            		
            	data_=data_.retData;
            	//console.log(data_)
                if(data_ == null || data_.length <=0 ){
                    return;
                }
                var dataTips=data_.tips;
                
                dataTj=data_.tj;
                
				var tt = $("#topSearch").val();
				$bigAutocompleteContent.empty();
				if(dataTips!=null && dataTips!=undefined && dataTips.length>0){
					 var cont = "<table class='search_list' style='margin-top: 6px;'><tbody>";
					 if((dataTips[0].weight_type==1||dataTips[0].weight_type==2||dataTips[0].weight_type==3) && getSearchTest()!=""){
					 	cont +='<tr class="num_1" ><td>股票</td></tr>';
					 }else{
					 	cont +='<tr class="num_1" ><td>搜索建议</td></tr>';
					 }
					 	
	                for(var i=0;i<dataTips.length;i++){
	//              	var searchtext=data_[i].text.replace(tt,"<i class='red'>"+tt+"</i>");
						
						if(dataTips[i].tip_value!=null&&dataTips[i].tip_value!=""&&dataTips[i].tip_value!=undefined){
							cont += "<tr data-type='"+dataTips[i].weight_type+"' stockcode='"+dataTips[i].stock_code+"' "+
							" value1='"+dataTips[i].value1+"'  value2='"+dataTips[i].value2+"'  tipid='"+dataTips[i].id+"'";
							/*if(i==0 && getSearchTest().trim().length>0){//加默认选中效果
								cont+=" class='ct'";
							}*/
							if(i==0)
								clickedValue.tipid=dataTips[i].id;
							cont+=" search_value='"+dataTips[i].search_value+"'><td><div>" + dataTips[i].tip_value + "</div></td></tr>"
						}else{
							cont += "<tr data-type='"+dataTips[i].weight_type+"' stockcode='"+dataTips[i].stock_code+"' "+
							" value1='"+dataTips[i].value1+"'  value2='"+dataTips[i].value2+"'  tipid='"+dataTips[i].id+"'";
							/*if(i==0 && getSearchTest().trim().length>0){//加默认选中效果
								cont+=" class='ct'";
							}*/
							if(i==0)
								clickedValue.tipid=dataTips[i].id;
							cont+=" search_value='"+dataTips[i].search_value+"'><td><div>" + dataTips[i].search_value + "</div></td></tr>"
						}  
	                }
	                cont += "</tbody></table>";

	                $bigAutocompleteContent.append(cont); 
	               	//显示特色推荐信息
	               	bigAutocomplete.showTj(dataTips[0].stock_code,dataTips[0].search_value,dataTips[0].weight_type,dataTips[0].value1,dataTips[0].value2,dataTips[0].id);
				}
                $bigAutocompleteContent.show();

                //每行tr绑定数据，返回给回调函数
               /*  $bigAutocompleteContent.find("tr").each(function(index){
                    $(this).data("jsonData",data_[index]);
                }) */
            }
            
            //输入框focus事件
            $this.focus(function(){
                bigAutocomplete.currentInputText = $this;
            });

        }
        //隐藏下拉框
        this.hideAutocomplete = function(){
            var $bigAutocompleteContent = $("#bigAutocompleteContents");
            if($bigAutocompleteContent.css("display") != "none"){
                $bigAutocompleteContent.find("tr").removeClass("ct");
                $bigAutocompleteContent.hide();
            }
        }

        /**
         * 点击股票时，推荐信息变更
         * @param {Object} stockCode
         * @param {Object} searchValue
         * @param {Object} weightType
         */
         this.showTj = function(stockCode,searchValue,weightType,value1,value2,tipid){
        	var $bigAutocompleteContent = $("#bigAutocompleteContents");
//        	alert(0)
        	var height=$("#bigAutocompleteContents").find(".search_list").height();
        	 var div='<div class="moudels"></div>';
        	 $("#bigAutocompleteContents").append(div);
        	 var height1=$(".tstj").height()-30;
        	  $(".moudels").css("height",height1);
        	 $(".moudels").css("top",height);
        	 $(".moudels").show().delay(100).fadeOut();
        	var tstj = $('#tstj');       	 
        	var contTj="<table class='tstj'><tbody>";    
        	contTj+='<tr class="num_1"><td>特色推荐</td></tr>';
        	var have=false;

        	if((weightType==1||weightType==2||weightType==3)){//第一个是公司，补全公司的推荐检索结果
   				contTj += "<tr tj='dingzeng' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-定增" + "</div></td></tr>";
   				contTj += "<tr tj='paiming' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-行业排名" + "</div></td></tr>";
   				contTj += "<tr tj='caiwu' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-主要财务数据" + "</div></td></tr>";
   				contTj += "<tr tj='xinwen' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-新闻" + "</div></td></tr>";
   				contTj += "<tr tj='yanbao' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-研报" + "</div></td></tr>";
   				contTj += "<tr tj='gonggao' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-公告" + "</div></td></tr>";
   				contTj += "<tr tj='guanxitu' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
					" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
					" search_value='"+searchValue+"'><td><div >" + searchValue+"-关系图" + "</div></td></tr>";
   				have=true;
   			}else if(weightType==6 || weightType==5){
   				contTj += "<tr tj='xiangguan' data-type='"+weightType+"' stockcode='"+stockCode+"' "+
				" value1='"+value1+"'  value2='"+value2+"'  tipid='"+tipid+"'"+
				" search_value='"+searchValue+"'><td><div >" + searchValue+"相关业务公司" + "</div></td></tr>";
   				have=true;
   			}
        	if(dataTj!=null && dataTj!=undefined && dataTj.length>0){
        		have=true;
             for(var i=0;i<dataTj.length;i++){
//           	var searchtext=data_[i].text.replace(tt,"<i class='red'>"+tt+"</i>");
					if(dataTj[i].tip_value!=null&&dataTj[i].tip_value!=""&&dataTj[i].tip_value!=undefined){
						contTj += "<tr data-type='"+dataTj[i].weight_type+"' stockcode='"+dataTj[i].stock_code+"'  "+
						" value1='"+dataTj[i].value1+"'  value2='"+dataTj[i].value2+"'  tipid='"+dataTj[i].id+"'"+
						"  search_value='"+dataTj[i].search_value+"'><td><div> " + dataTj[i].tip_value + "</div></td></tr>";
					}else{
						contTj += "<tr data-type='"+dataTj[i].weight_type+"' stockcode='"+dataTj[i].stock_code+"' "+
						" value1='"+dataTj[i].value1+"'  value2='"+dataTj[i].value2+"'  tipid='"+dataTj[i].id+"'"+
						"  search_value='"+dataTj[i].search_value+"'><td><div>" + dataTj[i].search_value + "</div></td></tr>";
					}
             	}
           	}
        	contTj += "</tbody></table>";
        	if(have){
        		if($("#bigAutocompleteContents").find("table").hasClass("tstj")){
        			$(".tstj").html(contTj);
        		}else{
	        		$bigAutocompleteContent.append(contTj);
        		}
        	}
        	
        }
    };
    $.fn.bigAutocomplete = bigAutocomplete.autocomplete;
})(jQuery)


$(function(){
	$("#topSearch").bigAutocomplete();	
	var paths=window.location.pathname;
	var path=paths.split("/")[1];
	if(path=="searchList.html"){
		var content=getUrlParam("content");
		if(content!=null && content!="" && content!=undefined){
			var value=content.split(",")[0];
//			console.log(value)
			$("#topSearch").val(value);
		}
	}
})

/**
 * 搜索功能，判断是否要进行搜索
 */
function search(stockCode,searchValue,weightType,val1,val2,tipid,tj){
	if($.trim(searchValue)=="")
		return;
	searchValue=$.trim(searchValue);
	if((clickedValue.tipid==tipid)
			||(weightType!=1 && weightType!=2 && weightType!=3)){
		//stockcode=1212&type=&content=dsaf,asdfaf,sdfadsf&tj=
		var val=searchValue;
		if(val1!=null && val1!="" && val1!=undefined && val1!="null")
			val+=","+val1;
		if(val2!=null && val2!="" && val2!=undefined  && val2!="null")
			val+=","+val2;
		var tjValue="";
		if(tj!=null && tj!="" && tj!=undefined)
			tjValue=tj;
		if(weightType==14 || weightType==15){
			tjValue="zhibiao";
		}
		
		if(weightType=="" ||weightType=="0"){
			//没有用推荐的，查之前再匹配一次，排除公司信息未能正确匹配
			$.axs("/betaInvest/searchTips/searchBefore.do",
					{text:searchValue},false,function(data){
						if(data.retData && data.retData.length>0){
							var _data = data.retData[0];
							if(_data.weight_type==1 || _data.weight_type==2 || _data.weight_type==3){
//								dataTips[0].stock_code,dataTips[0].search_value,dataTips[0].weight_type,dataTips[0].value1,dataTips[0].value2,dataTips[0].id
								stockCode=_data.stock_code;
								weightType=_data.weight_type;
								tjValue=_data.tjValue ? _data.tjValue : "";
								val=_data.search_value+","+_data.value1+","+_data.value2;
								//window.location.href="/searchList.html?stockcode="+_data.stock_code+"&type="+_data.weight_type+"&tj=&content="+_data.search_value+","+_data.value1+","+_data.value2;
							}else{
								//window.location.href="/searchList.html?stockcode="+stockCode+"&type="+weightType+"&tj="+tjValue+"&content="+val;
							}
						}else{
							//window.location.href="/searchList.html?stockcode="+stockCode+"&type="+weightType+"&tj="+tjValue+"&content="+val;
						}
			});
		}else{
			//window.location.href="/searchList.html?stockcode="+stockCode+"&type="+weightType+"&tj="+tjValue+"&content="+val;
		}
		if(weightType==14 || weightType==15){
			stockCode="";
		}
		$.axs("/betaInvest/searchTips/saveSearch.do",
				{stockCode:stockCode,searchContent:searchValue,weightType:weightType,tipValue:searchValue,tip1:val1,tip2:val2}
		,false,function(data){
		});
		window.location.href="/searchList.html?stockcode="+stockCode+"&type="+weightType+"&tj="+tjValue+"&content="+val;
//		console.log("/searchList.html?stockcode="+stockCode+"&type="+weightType+"&tj="+tjValue+"&content="+val);
		//alert("/searchList.html?stockcode="+stockCode+"&type="+weightType+"&tj="+tjValue+"&content="+val)
	}
	clickedValue.tipid=tipid;
}

function selectText(suggestTxt){
	/*var input=document.getElementById('top_search');
	var start = $('#top_search').val().length;
	if(start == -1) start = 0;
	var end = suggestTxt.length;
	if(end == -1) end = val.length;
	$('#top_search').val(suggestTxt);
	setSelection(input,start,end);*/
}

function setSelection(input, startPos, endPos) {
    input.focus();
    if (typeof input.selectionStart != "undefined") {
        input.selectionStart = startPos;
        input.selectionEnd = endPos;
    } else if (document.selection && document.selection.createRange) {
        input.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
    }
}
function getPosition (input) {
	var pos = 0;
	if (document.selection) {
		input.focus ();
		var selection = document.selection.createRange ();
		selection.moveStart ('character', -input.value.length);
		pos = selection.text.length;
	}
	else if (input.selectionStart || input.selectionStart == '0')
		pos = input.selectionStart;
	return pos;
}