var industryArr = []; //行业数据
var areaArr = []; //地区数据
var mmArr = []; //做市商数据
var ZBQSArr = []; //主办券商数据
var LSArr = []; //律所数据
var KJSArr = []; //会计所数据
var ZCPGArr = []; //资产评估机构
var industryId = ""; //行业id
var areaId = ""; //地区id
var placeType = ""; //定增类型
var investorsType = ""; //投资人类型
var zsCode = ""; //指数代码
var mmName = ""; //做市商名称
var orName = ""; //机构名称
var orType = ""; //机构类型
var columns = ""; //指标名称
var interStr = ""; //接口名
$(document).ready(function(){
	
	//查询行业
	findCategory(0,2);
	
	//查询地区
	findArea();
	
	//查询做市商
	findMM();
	
	//查询中介机构
	findEI();
	
	addZhiBiao("");

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
		updateShaixuan(dataValue,tex, $(this).attr("data-interface"), $(this).attr("data-partype"), $(this).attr("data-param"));
		//	此处data_value为0的时候 说明此级为最后一级指标
		if(data_value!=0){
			//	加载下级指标或者指标分类
			addZhiBiao(tex,data_CX_value);
			$(this).parents(".change_xlist").next(".change_xlist").find(".overview,.thumb").css("top",0);
			$(this).parents(".change_xlist").next(".change_xlist").show().nextAll(".change_xlist").hide();;
		}else{
			$(this).parents(".change_xlist").addClass("library_check");
		}
		//	三板统计多选框特效
		$(".library_ul .data-checkbox ").delegate("label","click", function(e) {
			//		所选指标个数
			var onchange=$(this).parents(".library_ul").find("label.checkboxWord.on").length;
			var datavalue=$(this).parents("ul").attr("data-value");
			if(onchange>=6){
				if ($(this).hasClass("on")) {
					$(this).removeClass("on");
					$(this).siblings("label").removeClass("on");
					$(this).parent().parent().removeClass("on");
				} else {
					errorAlert("","最多选择6个指标");
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
//			var tex="";
//			var parm = "";
//			var word =$(this).parents(".library_ul").find("label.checkboxWord.on");
//			word.each(function(){
//				tex+=$(this).text() + "、";
//				parm += $(this).parent().attr("data-param") + ",";
//			});
//			if(tex!=""){
//				updateShaixuan(datavalue,tex.substring(0, tex.length - 1), null, "columns", parm.substring(0, parm.length - 1));
//			}else{
//				$("#chenge_list").find("a").eq(-1).remove();
//			}
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
        });
	 
	 
	 //生成图表
	 $("#createCharts").click(function(){
		 $(".chenge_list a").each(function(){
			 if (($(this).attr("data-interface") != "undefined") &&
					 ($(this).attr("data-interface") != undefined) &&
					 ($(this).attr("data-interface") != "") &&
					 ($(this).attr("data-interface") != null) &&
					 ($(this).attr("data-interface") != "null")) {
				 interStr = $(this).attr("data-interface");
			 }
			 
			 if($(this).attr("data-parType") == "industryId"){
				industryId = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "areaId"){
				areaId = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "placeType"){
				placeType = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "investorsType"){
				investorsType = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "zsCode"){
				zsCode = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "mmName"){
				mmName = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "orName"){
				 orName = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "orType"){
				 orType = $(this).attr("data-param");
			 }else if($(this).attr("data-parType") == "columns"){
				 columns += $(this).attr("data-param")+",";
			 }
		 })
		 
		 if(columns != ""){
			 columns=columns.substring(0,columns.length-1);
			 
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
				 var json = {"name":(($(this).attr("title") == undefined || $(this).attr("title") == "") ? $(this).text() : $(this).attr("title")), "dataParam":$(this).parent().attr("data-param")};
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
			 
			 var ZBQJson = {'ZBZ':ZBZArr,'CJGX':CJGXArr};
			 localStorage.setItem("ZBQDATA", encodeURI(JSON.stringify(ZBQJson))); //存入到缓存中(为解决参数过长)
//			 console.log(JSON.parse(localStorage.getItem("ZBQDATA")));
			 location.href = "editChart.html?chartType=1&interStr="+ interStr + "&industryId=" + industryId + "&areaId=" + areaId + "&placeType="
				+ placeType + "&investorsType=" + investorsType
				+ "&zsCode=" + zsCode + "&mmName=" + mmName + "&orName="
				+ orName + "&orType=" + orType + "&columns=" + columns;
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
			 //console.log(lastShowCalssName);
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

/**
 * 添加筛选指标
 * @param datavalue
 * @param tex
 * @param interfaceStr
 * @param parTypeStr
 * @param paramStr
 */
function updateShaixuan(datavalue,tex, interfaceStr, parTypeStr, paramStr){
	var tex = tex;
	var dataValue=datavalue;
	var fale=true;
//	if($(this).find('label').length == 0){
//
//	}else{
//		tex =$(this).find("label.checkboxWord").text();
//	}
	var aHtml=tex + '<i></i>';
	$(".chenge_list a").each(function(){
		var aDataValue =$(this).attr("data-value");
		if(aDataValue==dataValue){
			fale=false;
			$(this).html(aHtml);
			$(this).attr("data-interface", interfaceStr);
			$(this).attr("data-parType", parTypeStr);
			$(this).attr("data-param", paramStr);
			$(this).nextAll("a").remove();
		}
	})	
	if(fale){
		$("#chenge_list").append('<a data-interface=' + interfaceStr + ' data-parType='+ parTypeStr + ' data-param=' + paramStr
						+ ' href="javascript:;" data-value=' + dataValue + '>' + tex + '<i></i></a>');	
	}

}

/**
 * 加载详细指标
 */
function updatiShaixuanDetail(thiz){
	var word =$(thiz).parents(".library_ul").find("label.checkboxWord");
	word.each(function(){
		tex=(($(this).attr("title") == undefined || $(this).attr("title") == "") ? $(this).text() : $(this).attr("title"));
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

function addZhiBiao(tex,data_CX_value){
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
	
	lihtm01+='<li>市场规模</li>';
	lihtm01+='<li>挂牌统计</li>';
	lihtm01+='<li>中介机构</li>';
	lihtm01+='<li>交易统计</li>';
	lihtm01+='<li>融资统计</li>';
	lihtm01+='<li>投资者统计</li>';
	lihtm01+='<li>指数统计</li>';
//	二级指标
	if(tex=="市场规模"){
	lihtm02+='<li data-interface="findSBSDayData" >市场规模统计</li>';
	lihtm02+='<li data-interface="findSBSHYData" >行业规模统计</li>';
	lihtm02+='<li data-interface="findSBSHYData" >地域规模统计</li>';
	$(".jq22").html(lihtm02);
	}
	if(tex=="挂牌统计"){
	lihtm02+='<li data-interface="findSBSDayData" >挂牌公司</li>';
	lihtm02+='<li data-interface="findSBSDayData" >拟挂牌公司</li>';
	lihtm02+='<li data-interface="findSBSDayData" >分层统计</li>';	
	$(".jq22").html(lihtm02);
	}
	if(tex=="中介机构"){
	lihtm02+='<li data-interface="findMMDData" >做市商</li>';
	lihtm02+='<li data-interface="findEIDData" data-parType="orType" data-param="1" >主办券商</li>';
	lihtm02+='<li data-interface="findEIDData" data-parType="orType" data-param="2" >律所</li>';
	lihtm02+='<li data-interface="findEIDData" data-parType="orType" data-param="3" >会计所</li>';
	lihtm02+='<li data-interface="findEIDData" data-parType="orType" data-param="4" >资产评估机构</li>';
	$(".jq22").html(lihtm02);
	}
	if(tex=="交易统计"){
	lihtm02+='<li data-interface="findSBSDayData" >市场交易统计</li>';
	lihtm02+='<li data-interface="findSBSDayData" >行业交易统计</li>';
	$(".jq22").html(lihtm02);
	}
	if(tex=="融资统计"){
	lihtm02+='<li data-interface="findSBSMData"  data-value="zongtiqingkuang0">总体情况</li>';
	lihtm02+='<li data-interface="findSBSMData" >行业融资</li>';
//	lihtm02+='<li>新增定增预案</li>';
	lihtm02+='<li data-interface="findPlaceMData" data-parType="placeType" data-param="8" >定增实施完成</li>';
	$(".jq22").html(lihtm02);
	}
	if(tex=="投资者统计"){
	lihtm02+='<li data-interface="findInvestorMData" data-value="zongtiqingkuang1">总体情况</li>';
	lihtm02+='<li data-interface="findInvestorMData" data-parType="investorsType" data-param="2" >机构投资者</li>';
	lihtm02+='<li data-interface="findInvestorMData" data-parType="investorsType" data-param="0" >PE/VC投资者</li>';
	lihtm02+='<li data-interface="findInvestorMData" data-parType="investorsType" data-param="1" >个人投资者</li>';
	$(".jq22").html(lihtm02);
	}
	if(tex=="指数统计"){
	lihtm02+='<li data-interface="findQTDData" data-parType="zsCode" data-param="899002" >三板做市</li>';
	lihtm02+='<li data-interface="findQTDData" data-parType="zsCode" data-param="899001" >三板成指</li>';
	$(".jq22").html(lihtm02);
	}
//	二级指标
	if(tex=="市场规模统计"){
	lihtm03+='<li>挂牌公司家数</li>';
	lihtm03+='<li>总股本（亿股）</li>';
	lihtm03+='<li>流通股本（亿股）</li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="行业规模统计"){
		$(industryArr).each(function(){
			var obj=this;
			var  hy=obj.categoryName;
			if(obj.categoryName.length>11){
				hy=obj.categoryName.substring(0,11)+"...";
			}else{
				hy=obj.categoryName;
			}
			
			lihtm03 += "<li data-parType='industryId' data-param="+obj.categoryId+" title="+obj.categoryName+" data-value='hangyeguimo'>"+hy+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="挂牌公司家数"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="listed_company_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司总数</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="market_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让总数</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总数</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="base_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">基础层公司总数</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="innovation_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">创新层公司总数</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	if(tex=="总股本（亿股）"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="listed_company_sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司总股本</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="transfer_capital_sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让总股本</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总股本</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	if(tex=="流通股本（亿股）"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="listed_company_fe_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司流通股本</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="transfer_capital_fe_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让流通股本</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_fe_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让流通股本</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	if(tex=="成交数量(万股)"&&data_CX_value=="hangyejiaoyichengjiaosl0"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="lc_volume_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="挂牌公司总成交数量(万股)">挂牌公司总成交数...</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="mt_volume_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="做市转让成交数量(万股)">做市转让成交数...</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总股本</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	if(tex=="成交金额(万元)"&&data_CX_value=="hangyejiaoyichengjiaoje0"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="lc_turnover_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="挂牌公司总成交金额(万元)">挂牌公司总成交金...</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="mt_turnover_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="做市转让成交金额(万元)">做市转让成交金额...</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="at_turnover_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="协议转让成交金额(万元)">协议转让成交金额...</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	if(tex=="成交均价(元)"&&data_CX_value=="hangyejiaoyichengjiaojj0"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="lc_tp_avg_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="挂牌公司总成交均价(元)">挂牌公司总成交均...</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="mt_tp_avg_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让成交均价(元)</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="at_tp_avg_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让成交均价(元)</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	if(tex=="成交笔数"&&data_CX_value=="hangyejiaoyichengjiaobs0"){
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="lc_transactions_total" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司总成交笔数</label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="mt_transactions_total" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让成交笔数 </label></div></li>';
	lihtm04+='<li data-value="0"><div data-parType="columns" data-param="at_transactions_total" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让成交笔数</label></div></li>';
	$(".jq44").html(lihtm04);
	}
	/**
	 * data-value为hangyeguimo时为行业规模统计
	 * data-value为diyuguimo地域规模统计
	 * data-value为jigoumingchen机构名称
	 * data-value为hangyejiaoyi行业交易
	 * data-value为hangyerongzi行业融资
	 * data-value为hangyejiaoyichengjiaosl行业交易--成交数量
	 * data-value为hangyejiaoyichengjiaoje行业交易--成交金额
	 * data-value为hangyejiaoyichengjiaojj行业交易--成交均价
	 * data-value为hangyejiaoyichengjiaobs行业交易--成交笔数
	 * 
	 * 
	 **/
	if(data_CX_value!=undefined){
		if(data_CX_value=="hangyeguimo"){
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="listed_company_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司总数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="market_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让总数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="new_lc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新增挂牌公司数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总股本（亿股）</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="fe_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">流通股本（亿股）</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_assets" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总资产合计(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_assets_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总资产均值(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_assets" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净资产合计(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_assets_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净资产均值(万元) </label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_operating_income" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">营业收入合计(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_operating_income_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">营业收入均值(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_profit" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净利润合计(万元) </label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_profit_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净利润均值(万元)</label></div></li>';
			$(".jq44").html(lihtm04);
		}
		if(data_CX_value=="diyuguimo"){
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="listed_company_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司总数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="market_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让总数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="new_lc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新增挂牌公司数</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总股本（亿股）</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="fe_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">流通股本（亿股）</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_assets" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总资产合计(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_assets_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总资产均值(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_assets" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净资产合计(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_assets_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净资产均值(万元) </label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_operating_income" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">营业收入合计(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_operating_income_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">营业收入均值(万元)</label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_profit" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净利润合计(万元) </label></div></li>';
			lihtm04+='<li data-value="0"><div data-parType="columns" data-param="total_net_profit_avg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">净利润均值(万元)</label></div></li>';
			$(".jq44").html(lihtm04);
		}
		if(data_CX_value=="jigoumingchen"){
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="recommendNum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">推荐挂牌公司数</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="successNum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="推荐挂牌公司成功次数">推荐挂牌公司成功...</label></div></li>';
		$(".jq44").html(lihtm04);	
		}
		if(data_CX_value=="hangyejiaoyi"){
		lihtm04+='<li data-value="hangyejiaoyichengjiaosl2">成交数量(万股)</li>';
		lihtm04+='<li data-value="hangyejiaoyichengjiaoje2">成交金额(万元)</li>';
		lihtm04+='<li data-value="hangyejiaoyichengjiaojj2">成交均价(元)</li>';
		lihtm04+='<li data-value="hangyejiaoyichengjiaobs2">成交笔数</li>';
		$(".jq44").html(lihtm04);	
		}
		if(data_CX_value=="hangyerongzi"){
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="companyTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资企业家数</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="financeTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资事件次数</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="amountSum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资总额</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="AQQGR" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资金额环比增长率</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="PNGR" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="融资事件次数环比增长率">融资事件次数环比...</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="amountMax" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">最高单笔融资金额</label></div></li>';
		lihtm04+='<li data-value="0"><div data-parType="columns" data-param="amountAvg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">平均融资金额</label></div></li>';
		$(".jq44").html(lihtm04);	
		}
//		行业交易--成交数量
		if(data_CX_value=="hangyejiaoyichengjiaosl2"){
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="lc_volume_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总成交数量(万股)</label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="mt_volume_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="做市转让成交数量(万股)" >做市转让成交数量...</label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_sc_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总股本</label></div></li>';
		$(".jq55").html(lihtm05);	
		}
//		行业交易--成交金额
		if(data_CX_value=="hangyejiaoyichengjiaoje2"){
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="lc_turnover_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总成交金额(万元) </label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="mt_turnover_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="做市转让成交金额(万元)" >做市转让成交金额...</label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="at_turnover_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="协议转让成交金额(万元)" >协议转让成交金额...</label></div></li>';
		$(".jq55").html(lihtm05);	
		}
//		行业交易--成交均价
		if(data_CX_value=="hangyejiaoyichengjiaojj2"){
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="lc_tp_avg_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总成交均价(元) </label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="mt_tp_avg_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让成交均价(元) </label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="at_tp_avg_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让成交均价(元)</label></div></li>';
		$(".jq55").html(lihtm05);	
		}
//		行业交易--成交均价
		if(data_CX_value=="hangyejiaoyichengjiaobs2"){
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="lc_transactions_total" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">总成交笔数 </label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="mt_transactions_total" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让成交笔数 </label></div></li>';
		lihtm05+='<li data-value="0"><div data-parType="columns" data-param="at_transactions_total" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让成交笔数</label></div></li>';
		$(".jq55").html(lihtm05);	
		}
		
	}
	if(tex=="地域规模统计"){
		$(areaArr).each(function(){
			var obj=this;
			lihtm03+="<li data-parType='areaId' data-param="+obj.id+" data-id="+obj.id+" data-value='diyuguimo'>"+obj.nameCn+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="挂牌公司"){
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="listed_company_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">挂牌公司总数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="market_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">做市转让总数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="agreement_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">协议转让总数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="base_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">基础层公司总数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="innovation_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">创新层公司总数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_market_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新增做市转让数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_agreement_transfers_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新增协议转让数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_base_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新加入基础层数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_innovation_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新加入创新层数</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="拟挂牌公司"){
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="proposed_listed_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">拟挂牌公司总数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_proposed_listed_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新增拟挂牌公司数</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="分层统计"){
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="base_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">基础层公司数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="innovation_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">创新层公司数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_innovation_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新加入创新层公司数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="new_base_companies_num" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">新加入基础层公司数</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="做市商"){
		$(mmArr).each(function(){
			lihtm03+="<li data-parType='mmName' data-param="+this.mmName+" data-value='jigoumingchen'>"+this.mmName+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="主办券商"){
		$(ZBQSArr).each(function(){
			lihtm03+="<li data-parType='orName' data-param="+this.organizationNameSort+" data-value='jigoumingchen'>"+this.organizationNameSort+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="律所"){
		$(LSArr).each(function(){
			lihtm03+="<li data-parType='orName' data-param="+this.organizationNameSort+" data-value='jigoumingchen'>"+this.organizationNameSort+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="会计所"){
		$(KJSArr).each(function(){
			lihtm03+="<li data-parType='orName' data-param="+this.organizationNameSort+" data-value='jigoumingchen'>"+this.organizationNameSort+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="资产评估机构"){
		$(ZCPGArr).each(function(){
			lihtm03+="<li data-parType='orName' data-param="+this.organizationNameSort+" data-value='jigoumingchen' title="+this.organizationNameSort+">"+this.organizationNameSort+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="市场交易统计"){
		lihtm03+='<li data-value="hangyejiaoyichengjiaosl0">成交数量(万股)</li>';
		lihtm03+='<li data-value="hangyejiaoyichengjiaoje0">成交金额(万元)</li>';
		lihtm03+='<li data-value="hangyejiaoyichengjiaojj0">成交均价(元)</li>';
		lihtm03+='<li data-value="hangyejiaoyichengjiaobs0">成交笔数</li>';
		
		$(".jq33").html(lihtm03);
	}
	if(tex=="行业交易统计"){
		$(industryArr).each(function(){
			var obj=this;
			var  hy=obj.categoryName;
			if(obj.categoryName.length>11){
				hy=obj.categoryName.substring(0,11)+"...";
			}else{
				hy=obj.categoryName;
			}
			
			lihtm03 += "<li data-parType='industryId' data-param="+obj.categoryId+" title="+obj.categoryName+" data-value='hangyejiaoyi'>"+hy+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	if(tex=="总体情况"&&data_CX_value=="zongtiqingkuang0"){
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="companyTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资企业家数</label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="financeTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资事件次数</label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="amountSum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资总额</label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="AQQGR" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">融资金额环比增长率</label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="PNGR" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord" title="融资事件次数环比增长率">融资事件次数环比...</label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="amountMax" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">最高单笔融资金额</label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="amountAvg" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">平均融资金额</label></div></li>';
		$(".jq33").html(lihtm03);
	}
	if(tex=="行业融资"){
		$(industryArr).each(function(){
			var obj=this;
			var  hy=obj.categoryName;
			if(obj.categoryName.length>11){
				hy=obj.categoryName.substring(0,11)+"...";
			}else{
				hy=obj.categoryName;
			}
			
			lihtm03+="<li data-parType='industryId' data-param="+obj.categoryId+" title="+obj.categoryName+" data-value='hangyerongzi'>"+hy+"</li>";
		})
		$(".jq33").html(lihtm03);
	}
	
	if(tex=="新增定增预案"){
	lihtm03+='<li data-value="0"><div class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">增发次数</label></div></li>';
	lihtm03+='<li data-value="0"><div class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">增发家数</label></div></li>';
	lihtm03+='<li data-value="0"><div class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">增发数量(万股)</label></div></li>';
	lihtm03+='<li data-value="0"><div class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">预计募资(亿元)</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="定增实施完成"){
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="placeCount" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">增发次数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="companyTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">增发家数</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="privateNum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">增发数量(万股)</label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="raisePrice" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">募资总额(亿元)</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="总体情况"&&data_CX_value=="zongtiqingkuang1"){
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="invesTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资事件总数 </label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="investSum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资总金额</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="机构投资者"){
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="invesTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资事件总数 </label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="investSum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资总金额</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="PE/VC投资者"){
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="invesTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资事件总数 </label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="investSum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资总金额</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="个人投资者"){
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="invesTotal" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资事件总数 </label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="investSum" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">投资总金额</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="三板做市"){
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="newPrice" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">三板做市指数 </label></div></li>';
	lihtm03+='<li data-value="0"><div data-parType="columns" data-param="pcr" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">三板做市指数涨跌幅</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex=="三板成指"){
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="newPrice" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">三板成指 </label></div></li>';
		lihtm03+='<li data-value="0"><div data-parType="columns" data-param="pcr" class="data-checkbox"><input type="checkbox" /><label class="checkbox"></label><label class="checkboxWord">三板成指涨跌幅</label></div></li>';
	$(".jq33").html(lihtm03);
	}
	if(tex==""){
	$(".jq11").html(lihtm01);
	Website.run();
	}
	Website.run();
//	$(".overview,.thumb").css("top",0);
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
 * 查询区域
 */
function findArea(){
	var param={dataType:1,type:1,parentId:0}
	$.axs("/betaStock/common/findWorkBookByPid.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			areaArr = result;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询做市商数据
 */
function findMM(){
	$.axs("/betaInvest/btMmCompany/findAllMM.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			mmArr = result;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询中介数据
 */
function findEI(){
	$.axs("/betaInvest/common/findORData.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			$(result).each(function(){
				if(this.type == 1){ //主办券商
					ZBQSArr.push(this);
				}else if(this.type == 2){ //律所
					LSArr.push(this);
				}else if(this.type == 3){ //会计所
					KJSArr.push(this);
				}else if(this.type == 4){ //资产评估机构
					ZCPGArr.push(this);
				}
			})
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
