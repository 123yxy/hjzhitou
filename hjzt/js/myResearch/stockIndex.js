var industryArr = []; //行业集合
$(document).ready(function(){
	
	findCategory(0,2);
	
	addZhiBiao("")

	$(".change_xlist").hide();
	$(".change_xlist").eq(0).show();
	//	三板统计多选框特效
	$(".library_ul .data-checkbox ").delegate("label","click", function(e) {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
		} else {
			$(this).addClass("on");
			$(this).siblings("label").addClass("on");
		}
		e.stopPropagation();
	});
	//	三板统计选择指标
	$(".change_xlist .library_ul").delegate("li","click",function(){
		if($(this).find("label").length!=0){
		}else{
			//	获取指标分类data-value
			var dataValue= $(this).parent().attr("data-value");
			//	需要后台查询的分类 比如行业 机构等分类的data-value
			var data_CX_value=$(this).attr("data-value");
			
			//	获取点击当前分类名
			var	tex =(($(this).attr("title") == undefined || $(this).attr("title") == "") ? $(this).text() : $(this).attr("title"));
			var data_value=$(this).attr("data-value");
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			updateShaixuan(dataValue,tex, $(this).attr("data-parType"), $(this).attr("data-param"));
			//	此处data_value为0的时候 说明此级为最后一级指标
			if(data_value!=0){
				//	加载下级指标或者指标分类
				addZhiBiao(tex,data_CX_value,this);
				$(this).parents(".change_xlist").next(".change_xlist").find(".overview,.thumb").css("top",0);
				$(this).parents(".change_xlist").next(".change_xlist").show().nextAll(".change_xlist").hide();
			}else{
				$(this).parents(".change_xlist").addClass("library_check");
			}
			//	三板统计多选框特效
			$(".library_ul .data-checkbox ").delegate("label","click", function(e) {
				//所选指标个数
				var onchange=$(this).parents(".library_ul").find("label.checkboxWord.on").length;
				var datavalue=$(this).parents("ul").attr("data-value");
				if(onchange>=6){
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
						$(this).siblings("label").removeClass("on");
						$(this).parent().parent().removeClass("on");
					} else {
						errorAlert("","最多选择6个行业");
						$(this).removeClass("on");
						$(this).siblings("label").removeClass("on");
						$(this).parent().parent().removeClass("on");
					}
				}else{
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
						$(this).siblings("label").removeClass("on");
						$(this).parent().parent().removeClass("on");
					} else {
						$(this).addClass("on");
						$(this).siblings("label").addClass("on");
						$(this).parent().parent().addClass("on");
					}
				}
				//点击详细指标
				updatiShaixuanDetail(this);
//				var tex="";
//				var parm = "";
//				var word =$(this).parents(".library_ul").find("label.checkboxWord.on");
//				word.each(function(){
//					tex+=$(this).text() + "、";
//					parm += $(this).parent().attr("data-param") + ",";
//				});
//				if(tex!=""){
//					updateShaixuan(datavalue,tex.substring(0, tex.length - 1), $(this).parent().attr("data-parType"), parm.substring(0, parm.length - 1));
//				}else{
//					$("#chenge_list").find("a").eq(-1).remove();
//				}
				e.stopPropagation();	
			});
		//	加载仿滚动条
			Website.run();
		}
	//	加载仿滚动条
		Website.run();
	});

	 $(function() {
            $('#filterName01').keyup(function(){
                $('.jq11 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName02').keyup(function(){
                $('.jq22 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName03').keyup(function(){
                $('.jq33 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName04').keyup(function(){
                $('.jq44 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName05').keyup(function(){
                $('.jq55 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
            $('#filterName06').keyup(function(){
                $('.jq66 li').hide()
                    .filter(":contains('" +($(this).val()) + "')").show();
            }).keyup();//DOM加载完时，绑定事件完成之后立即触发
        });
	 
	//生成图表
	 $("#createCharts").click(function(){
		 
		 var stockCode = "";
		 var stockName = "";
		 var financeIndicatorIds = "";
		 var columns = "";
		 $(".chenge_list a").each(function(){
			 
			 if($(this).attr("data-parType") == "columns"){
				 financeIndicatorIds += $(this).attr("data-param")+",";
			 }else if($(this).attr("data-parType") == "stockCode"){
				 stockCode = $(this).attr("data-param");
				 stockName = $(this).text().substring(0,$(this).text().indexOf("("));
			 }
		 })
		 if(financeIndicatorIds!=""){
			 financeIndicatorIds=financeIndicatorIds.substring(0,financeIndicatorIds.length-1);
		 }
		 columns = financeIndicatorIds;
		 if(columns != ""){
			 
			 var ZBZArr = []; //全部指标集合
			 var CJGXArr = []; //所选层级及指标集合
			 //获取最后一层div显示的位置，为选择的具体指标
			 var zhibiaoDivLength=null;
			 $(".change_dblist").find("div.change_xlist").each(function(index,item){
				 if(!$(this).is(":hidden")){
					 zhibiaoDivLength=(index+1);
				 }
			 });
			 $("#scrollbar"+zhibiaoDivLength+" .checkboxWord").each(function(){
				 var json = {"name":$(this).parent().attr("title"), "dataParam":$(this).parent().attr("data-param")};
				 ZBZArr.push(json);
			 })
			 var jsonDetail={};
			 var names="";
			 var dataInterface="";
			 var dataPartype="";
			 var dataParam="";
			 $("#chenge_list").children("a").each(function(index,item){//添加所选层级及指标集合
				 if((index+1)<zhibiaoDivLength){
					 var json = {"name":$(this).text(), "dataInterface":$(this).attr("data-interface"),
							 "dataPartype":$(this).attr("data-partype"), "dataParam":$(this).attr("data-param")};
					 CJGXArr.push(json);
				 }else{
					 names+=$(this).text()+",";
					 dataInterface=$(this).attr("data-interface");
					 dataPartype= $(this).attr("data-partype");
					 dataParam+=$(this).attr("data-param")+",";
				 }
			 });
			 jsonDetail.name=names.substring(0,names.length-1);
			 jsonDetail.dataInterface=dataInterface;
			 jsonDetail.dataPartype=dataPartype;
			 jsonDetail.dataParam=dataParam.substring(0,dataParam.length-1);
			 CJGXArr.push(jsonDetail);
			 var ZBQJson = {"ZBZ":ZBZArr,"CJGX":CJGXArr};
			 localStorage.setItem("ZBQDATA", encodeURI(JSON.stringify(ZBQJson))); //存入到缓存中(为解决参数过长)
//			 alert("editChart.html?chartType=3&interStr&=findFinancialData&stockCode="+ stockCode + "&financeIndicatorIds=" + financeIndicatorIds 
//					 + "&columns=" + columns)
			 location.href = "editChart.html?chartType=2&interStr=findFinancialData&stockCode="+ stockCode + 
			 				"&stockName=" + stockName + "&financeIndicatorIds=" + financeIndicatorIds + "&columns=" + columns;
		 }else{
			 $.zmAlert("请选择指标");
		 }
	 
	 })
	 
	 /**
	  * 删除选择条件
	  */
	 $(".chenge_list").delegate("i", "click", function(){
		 var i = null;
		 //选择是指标--单个删除
		 if($(this).parent().attr("data-partype")=="columns"){
			 var key=$(this).parent().attr("data-param");
			 var lastShowCalssName="";
			 $(".change_dblist").find("div.change_xlist").each(function(){
				 if(!$(this).is(":hidden")){
					 lastShowCalssName=$(this).find("ul").attr("class");
				 }
			 });
			 console.log(lastShowCalssName);
			 if(lastShowCalssName==""){
				 return false;
			 }
			 $("."+lastShowCalssName).find("div").each(function(index,item){
				var divKey=$(item).attr("data-param");
				if(key==divKey){
					$(item).parent().removeClass("on");
					$(item).find("label").removeClass("on");
					return false;
				}
			 });
		 }else{//选择的不是指标--后面整体删除
			 $(this).parent().nextAll().remove();
			 var div_ChangeXlistLength=$(this).parent().attr("data-value");
			 if(div_ChangeXlistLength=="dataOne"){
				 i = 0;
			 }else if(div_ChangeXlistLength=="dataTwo"){
				 i = 1;
			 }else   if(div_ChangeXlistLength=="dataThree"){
				 i = 2;
			 }else   if(div_ChangeXlistLength=="dataFour"){
				 i = 3;
			 }else   if(div_ChangeXlistLength=="dataFive"){
				 i = 4;
			 }
		 }
		 $(this).parent().remove();
		 if(i!=null){
			 $(".change_dblist").children(".change_xlist").each(function(index, item){
				 if(index > i){
					 $(this).hide();
				 }else if(index==i){
					 $(this).find("li").removeClass("on");
				 }
			 });
		 }
	 })
});


function updateShaixuan(datavalue,tex, parTypeStr, paramStr){
	var tex = tex;
	var dataValue=datavalue;
	var fale=true;
var aHtml=tex + '<i></i>';
	$(".chenge_list a").each(function(){
		var aDataValue =$(this).attr("data-value");
		if(aDataValue==dataValue){
			fale=false;
			$(this).html(aHtml);
			$(this).attr("data-parType", parTypeStr);
			$(this).attr("data-param", paramStr);
			$(this).nextAll("a").remove();
		}
	})	
	if(fale){
		$("#chenge_list").append('<a data-param='+paramStr+' data-parType='+parTypeStr+' href="javascript:;" data-value='+dataValue+'>'+tex+'<i></i></a>');	
	}

}
/**
 * 加载详细指标
 */
function updatiShaixuanDetail(thiz){
	var word =$(thiz).parents(".library_ul").find("label.checkboxWord");
	word.each(function(){
		var tex=$(this).parent().attr("title");
		var parm= $(this).parent().attr("data-param");
		if($(this).hasClass("on")){
			if(!$("#"+parm)[0]){
				var html='<a id="'+parm+'" data-partype="columns" data-param="'+parm+'" href="javascript:;" data-value="dataFour">'+tex+'<i></i></a>';
				$("#chenge_list").append(html);
			}
		}else{
			$("#"+parm).remove();
		}
	});
}
function addZhiBiao(tex,data_CX_value,thiz){
//	一级指标
	var lihtm01='';
//	二级指标
	var lihtm02='';
//	三级指标
	var lihtm03='';
//	四级指标
	var lihtm04='';
	//	五级指标
	var lihtm05='';
	//	六级指标
	var lihtm06='';
if(tex==""){
	lihtm01+='<li data-guz="1" >做市成份股</li>';
	lihtm01+='<li data-guz="2" >三板成指股</li>';
	lihtm01+='<li data-guz="3" >创新层股</li>';
//	lihtm01+='<li>拟IPO股</li>';
	lihtm01+='<li data-guz="4" >热门概念板块</li>';
	lihtm01+='<li data-guz="5" >行业股</li>';
//	二级指标

}
if(tex=="做市成份股"||tex=="三板成指股"||tex=="创新层股"){
	var codeArr = []; //公司集合
	if(tex == "做市成份股"){
		codeArr = searchCompany(1,1,null,null);
	}else if(tex=="三板成指股"){
		codeArr = searchCompany(2,2,null,null);
	}else if(tex=="创新层股"){
		codeArr = searchCompany(3,null,null,null);
	}
	
	$(codeArr).each(function(){
		lihtm02+='<li data-parType="stockCode" data-param='+this.stockCode+' data-value="gupiao">'+this.stockName+'('+this.stockCode+')</li>';
	})
	
	$(".jq22").html(lihtm02);
}
if(tex=="行业股"){
	$(industryArr).each(function(){
		var obj=this;
		var  hy=obj.categoryName;
		if(obj.categoryName.length>11){
			hy=obj.categoryName.substring(0,11)+"...";
		}else{
			hy=obj.categoryName;
		}
		
		lihtm02 += "<li data-parType='industryId' data-param="+obj.categoryId+" title="+obj.categoryName+" data-value='hangyegu'>"+hy+"</li>";
	})
	$(".jq22").html(lihtm02);
}
if(data_CX_value=="hangyegu"){
	
	var stockArr = searchCompany(5, null, $(thiz).attr("data-param"), null);
	
	$(stockArr).each(function(){
		lihtm03+='<li data-parType="stockCode" data-param='+this.stockCode+' data-value="hangyegugupiao">'+this.stockName+'('+this.stockCode+')</li>';
	})
	
	$(".jq33").html(lihtm03);
}
if(data_CX_value=="hangyegugupiao"){
	//	四级指标
	lihtm04+='<li data-cwType="4" data-value="hangyegugupiaoZB">偿债能力</li>';
	lihtm04+='<li data-cwType="5" data-value="hangyegugupiaoZB">营运能力</li>';
	lihtm04+='<li data-cwType="6" data-value="hangyegugupiaoZB">负债比率</li>';
	lihtm04+='<li data-cwType="7" data-value="hangyegugupiaoZB">每股指标</li>';
	lihtm04+='<li data-cwType="8" data-value="hangyegugupiaoZB">盈利能力</li>';
	lihtm04+='<li data-cwType="9" data-value="hangyegugupiaoZB">资本结构</li>';
	lihtm04+='<li data-cwType="10" data-value="hangyegugupiaoZB">成长能力</li>';
	lihtm04+='<li data-cwType="11" data-value="hangyegugupiaoZB">现金流分析</li>';
	lihtm04+='<li data-cwType="12" data-value="hangyegugupiaoZB">杜邦分析</li>';
	lihtm04+='<li data-cwType="13" data-value="hangyegugupiaoZB">估值分析</li>';
	$(".jq44").html(lihtm04);
}

	if(tex=="偿债能力"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
//	console.log(data_CX_value);
	if(tex=="营运能力"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="负债比率"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="每股指标"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="盈利能力"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="资本结构"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	
	if(tex=="成长能力"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="现金流分析"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="杜邦分析"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="估值分析"&&data_CX_value=="hangyegugupiaoZB"){
		var CWArr = findFinanceIndexByType($(thiz).attr("data-cwType"));
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm05+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq55").html(lihtm05);
	}
	if(tex=="热门概念板块"){
		var ZJArr = findWordBookByType();
		$(ZJArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm02+='<li data-zjType='+this.id+' title='+tilName+' data-value="zhuanjifenlei">'+this.nameCn+'</li>';
		})
		$(".jq22").html(lihtm02);
	}
	if(data_CX_value=="zhuanjifenlei"){
		var ZJArr = findSpecialRecommendationList($(thiz).attr("data-zjType"));
		$(ZJArr).each(function(){
			var tilName = this.name;
			if(tilName.length > 8){
				this.name = this.name.substring(0, 7) + "...";
			}
			//三级指标
			lihtm03+='<li data-zjType='+this.id+' title='+tilName+' data-value="zhuanjiname" >'+this.name+'</li>';
		})
		$(".jq33").html(lihtm03);
	}
	if(data_CX_value=="zhuanjiname"){
		var stockArr = searchCompany(4, null, null, $(thiz).attr("data-zjType"));
		$(stockArr).each(function(){
			//四级指标
			lihtm04+='<li data-parType="stockCode" data-param='+this.stockCode+' data-value="zhuanjigpnumber" >'+this.stockName+'('+this.stockCode+')</li>';
		})
		$(".jq44").html(lihtm04);
		
	}
	if(data_CX_value=="zhuanjigpnumber"){
	//	四级指标
	lihtm05+='<li data-cwType="4" data-value="wujizhibiao">偿债能力</li>';
	lihtm05+='<li data-cwType="5" data-value="wujizhibiao">营运能力</li>';
	lihtm05+='<li data-cwType="6" data-value="wujizhibiao">负债比率</li>';
	lihtm05+='<li data-cwType="7" data-value="wujizhibiao">每股指标</li>';
	lihtm05+='<li data-cwType="8" data-value="wujizhibiao">盈利能力</li>';
	lihtm05+='<li data-cwType="9" data-value="wujizhibiao">资本结构</li>';
	lihtm05+='<li data-cwType="10" data-value="wujizhibiao">成长能力</li>';
	lihtm05+='<li data-cwType="11" data-value="wujizhibiao">现金流分析</li>';
	lihtm05+='<li data-cwType="12" data-value="wujizhibiao">杜邦分析</li>';
	lihtm05+='<li data-cwType="13" data-value="wujizhibiao">估值分析</li>';
	$(".jq55").html(lihtm05);
	}
	
	if(data_CX_value=="gupiao"){
	//	三级指标
	lihtm03+='<li>偿债能力</li>';
	lihtm03+='<li>营运能力</li>';
	lihtm03+='<li>负债比率</li>';
	lihtm03+='<li>每股指标</li>';
	lihtm03+='<li>盈利能力</li>';
	lihtm03+='<li>资本结构</li>';
	lihtm03+='<li>成长能力</li>';
	lihtm03+='<li>现金流分析</li>';
	lihtm03+='<li>杜邦分析</li>';
	lihtm03+='<li>估值分析</li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="偿债能力"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(4);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
//	console.log(data_CX_value);
	if(tex=="营运能力"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(5);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="负债比率"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(6);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="每股指标"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(7);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="盈利能力"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(8);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="资本结构"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(9);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	
	if(tex=="成长能力"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(10);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="现金流分析"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(11);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="杜邦分析"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(12);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	if(tex=="估值分析"&&data_CX_value==undefined){
		var CWArr = findFinanceIndexByType(13);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm04+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq44").html(lihtm04);
	}
	
	
	
	
	if(tex=="偿债能力"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(4);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="营运能力"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(5);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="负债比率"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(6);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="每股指标"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(7);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="盈利能力"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(8);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="资本结构"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(9);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	
	if(tex=="成长能力"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(10);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="现金流分析"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(11);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="杜邦分析"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(12);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex=="估值分析"&&data_CX_value=="wujizhibiao"){
		var CWArr = findFinanceIndexByType(13);
		$(CWArr).each(function(){
			var tilName = this.nameCn;
			if(tilName.length > 8){
				this.nameCn = this.nameCn.substring(0, 7) + "...";
			}
			lihtm06+='<li data-value="0"><div data-parType="financeIndicatorIds" data-param='+this.nameEn+' title='+tilName+' class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">'+this.nameCn+'</label></div></li>';
		})
		$(".jq66").html(lihtm06);
	}
	if(tex==""){
	$(".jq11").html(lihtm01);
	Website.run();
	}
	Website.run();
}

/**
 * 查询公司
 */
function searchCompany(stockType, componentType, industry, listId){
	var result = "";
	$.axs("/betaInvest/shareIndex/findStockCodeName.do",
			{stockType:stockType,componentType:componentType,industry:industry,listId:listId},
			false,function(data){
		if(data.retCode=="0000"){
			result = data.retData;
			//console.log(result)
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return result;
}

/**
 * 查询所有行业
 */
function findCategory(type,level){
	$.axs("/betaStock/common/findTrade.do", {categorType:type,levelId:level}, false, function(data) {
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			industryArr = result;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 根据指标类型查询财务指标
 */
function findFinanceIndexByType(financeIndexId){
	var result = "";
	$.axs("/betaInvest/shareIndex/findFinanceIndexByType.do",
			{financeIndexId:financeIndexId},
			false,function(data){
		if(data.retCode=="0000"){
			result = data.retData;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return result;
}

/**
 * 查询特色专辑分类
 */
function findWordBookByType(){
	var result = "";
	$.axs("/betaInvest/shareIndex/findWordBookByType.do",
			null,
			false,function(data){
		if(data.retCode=="0000"){
			result = data.retData;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return result;
}

/**
 * 查询特色专辑分类下的专辑名称
 */
function findSpecialRecommendationList(wordBookId){
	var result = "";
	$.axs("/betaInvest/shareIndex/findSpecialRecommendationList.do",
			{wordBookId:wordBookId},
			false,function(data){
		if(data.retCode=="0000"){
			result = data.retData;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return result;
}
