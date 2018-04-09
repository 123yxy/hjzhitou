var searchStr = decodeURI(UTIL.getPara("searchStr")); //搜索的字符串
var state = ""; //地区
var industryName = ""; //行业名称
var sortColumn = "ZSZ"; //排序字段
var pageNum = 1;
var pageSize = 10;
$(function(){
	
	
		 $(".userHead-logo").html(logourl());
        $(".indexTop-user").html(sethead());

	/**
	 * 加载数据
	 */
	searchData();
	getuserinfo();
	$("#topSearchA").val(searchStr);
 	
 	
 	
 	$("#topSearchA").on("blur",function(){
 		$(this).attr("placeholder","输入股票名称/代码");
// 		$(this).val(searchStr);
 	})
	 var width1=($("#topSearchA").width());
	$(".his-search").css("width",width1); 
	$(".list-publick p").on("click",function(){
		//alert(0)
		if($(this).next().css("display")=="block"){
			$(this).next().slideUp();
		}else{
			$(this).next().slideDown();
			$(this).parents().siblings(".list-publick").find("p").next().slideUp();
		}
	
	})
	//点击下拉框的li
	$(".list-publick").delegate("li","click",function(){
		var type=$(this).parent().prev().text();
		var text=$(this).text();

			$(this).parent().slideUp();
		
		
		$(".slected span").each(function(){
			if($(this).attr("data-type") == type){
				//console.log("进入")
				$(this).remove();
			}
		})
		var selectHy='<span data-id="'+text+'" data-type="'+type+'">'+type+"："+text+'<em></em></span>';
		$(".slected").append(selectHy);
		
		if(type == "行业"){
			industryName = text;
		}else if(type == "地区"){
			state = text;
		}
		pageNum = 1;
		searchData(1);
	})
	//点击清空筛选
	$(".clear-select").on("click",function(){	
		$(".slected").html("");
		industryName = "";
		state = "";
		pageNum = 1;
		searchData(1);
	})
	//点击已选的删除符号
	$(".slected").delegate("em","click",function(){
		$(this).parent().remove();
		var companyTypes=$(this).parent().attr("data-type");
		if(companyTypes=="地区"){
			state = "";
		}else{
			industryName = "";
		}
		pageNum = 1;
		searchData(1);
	})
	//点击排序
	$(".paixu-list span").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		sortColumn = $(this).attr("data-code");
		pageNum = 1;
		searchData(1);
	})
	
	
	$(".load-more").click(function(){
		if($(this).text() == "加载更多"){
			pageNum++;
			searchData();
		}
	});
	
	$(".search-result").on("click",".sb-list",function(){
		var code=$(this).attr("data-code");
		var name=$(this).attr("data-name");
		window.open("coverA.html?stockCode="+code+"&stockName="+name);
	})
	//点击其他的地方隐藏下拉框
	$(document).on("click",function(e){
		var e = e || window.event;
		var elem= e.target || e.srcElement;
		var target=$(".diqu");
		while(elem!=null && elem.tagName !== "DIV" && elem.className !=="diqu" )
			elem = elem.parentElement;
		if(elem==target[0]){
			//return
		}else{
			$("#dqUl").hide();
		}
		e.stopPropagation();
		e.cancelBubble = true;
	});
	//点击其他的地方隐藏下拉框
	$(document).on("click",function(e){
		//alert(0)
		var e = e || window.event;
		var elem= e.target || e.srcElement;
		var target=$(".hangye");
		while(elem!=null && elem.tagName !== "DIV" && elem.className !=="hangye" )
			elem = elem.parentElement;
		if(elem==target[0]){
			//return
		}else{
			$("#hyUl").hide();
		}
		e.stopPropagation();
		e.cancelBubble = true;
	});
	
})

/**
 * 查询数据
 * @param pageNum
 * @param pageSize
 */
function searchData(type){
	$("#searchStr").text('"'+(searchStr == null ? "":searchStr)+'"');
	UTIL.axs(UTIL.CONFIG.AsearchData,{
		str:searchStr,
		state:state,
		industryName:industryName,
		sortColumn:sortColumn,
		pageNum:pageNum,
		pageSize:pageSize
	},true, function(data) {
		if(data.retCode == "0000"){
			var result = data.retData;
			if(result == null){
				$(".top-list").hide();
				$(".paixu-list").hide();
				
				$("#companyTotal").text("0");
				$(".load-more").hide();
				var div='<div class="noData"><span><img src="/saasBeta/yanbao/images/noData-icon.png" alt="" /></span><p>没找到结果，换个搜索词试试</p></div>';
				$(".search-result").html(div);
				return;
			}
			$("#companyTotal").text(result.total); //总条数
			if(result.total == 0){ //总条数
				$(".top-list").hide();
				$(".paixu-list").hide();
				$(".load-more").hide();
				var div='<div class="noData"><span><img src="/saasBeta/yanbao/images/noData-icon.png" alt="" /></span><p>没找到结果，换个搜索词试试</p></div>';
				$(".search-result").html(div);
			}else{ //有数据
				$(".load-more").show();
				if(result.pageTotal <= pageNum){ //已到最后一页
					$(".load-more").text("暂无更多数据");
				}else if(result.pageTotal > pageNum){ //还有其他数据
					$(".load-more").text("加载更多");
				}
				
				if(type == 1){
					$(".search-result").empty();
				}
				var html = "";
				$(result.data).each(function(){
					html += "<li>" +
								"<div class='fl list-type'>" +
									"<div class='company-type'>" +
										// "<i>"+(this.stockBlock == "基础层" ? "基" : "创")+"</i>" +
										// "<em>"+(this.dealType == "协议" ? "协" : "市")+"</em>" +
										"<span class='sb-list' data-code='"+this.stockCode+"' data-name='"+this.stockName+"'>"+isStrKong(this.stockName)+"（"+isStrKong(this.stockCode)+"）</span>" +
										"<div class='clearfix'></div>" +
									"</div>" +
									"<div class='company-hy'>" +
										"<span class='diqu'>地区："+isStrKong(this.state)+"</span>" +
										"<span>行业："+isStrKong(this.industryName)+"</span>" +
									"</div>" +
								"</div>" +
								"<div class='fr scbg' data-code="+this.stockCode+" data-name="+this.stockName+" >一键报告</div>" +
								"<div class='clearfix'></div>" +
							"</li>";
					
				})
				$(".search-result").append(html);
				
				$(".scbg").click(function(){ //一键生成研报
					//console.log("dianji ")
					window.open("coverA.html?stockCode="+$(this).attr("data-code")+"&stockName="+$(this).attr("data-name"));
				})
				
				var hyHtml = "";
				$(result.industry).each(function(){
					hyHtml += "<li>"+this+"</li>";
				})
				$("#hyUl").html(hyHtml);
				
				var dqHtml = "";
				$(result.state).each(function(){
					dqHtml += "<li>"+this+"</li>";
				})
				$("#dqUl").html(dqHtml);
			}
		}
	})
}
