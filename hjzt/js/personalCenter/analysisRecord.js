$(function(){
	
	findAnalysisRecord(1,10);
	
    //全部的下拉框
	$(".records p").on("click",function(){
		if($(".tool_select").is(":Visible")){
			$(".tool_select").slideUp();
		}else{
			$(".tool_select").slideDown();
		}	
	})
	$(".tool_select li").on("click",function(){
		var reName=$(this).text();
		$(".records p").text(reName);
		$(".records p").attr("value",$(this).attr("value"));
		$(".tool_select").hide();
		findAnalysisRecord(1,10);
	})
	$(".tool_select li").on("mouseenter",function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
	
	//全选
	$("#selectAll").on("click",function(){
		if($(this).is(":checked")){
			$('input[name="items"]').prop("checked",true);
		}else{
			$('input[name="items"]').prop("checked",false);
		}	
	})
	$('input[name="items"]').on("click",function(){
		var inputLen=$('input[name="items"]').length;
		var flag=true;
		var number=0;
		$('input[name="items"]').each(function(index,item){			
			if($(item).prop("checked")==true){
				number++;
			}
		})
		if(number==inputLen){
			$("#selectAll").prop("checked",true);
		}else{
			$("#selectAll").prop("checked",false);
		}
	})
	
	
	//点击删除的时候删除下面选中的内容
	$(".record_delet span").on("click",function(){
		var data = "";
		$('input[name="items"]').each(function(index,item){
			if($(item).is(":checked")){
				data += $(this).attr("data-value") + ",";
			}
		})
		deleteAnalysisRecord(data.substring(0,data.length - 1));
	})
	
})

/**
 * 删除用户的分析记录
 * @param value
 */
function deleteAnalysisRecord(value){
	$.axs("/user/analysisRecord/deleteAnalysisRecord.do", {"data":value}, false, function(data) {
		if(data.retCode=="0000"){
			findAnalysisRecord(1,10);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 查询用户的分析记录
 * @param pageNum
 * @param pageSize
 */
function findAnalysisRecord(pageNum, pageSize){
	var type = "";
	if($(".records p").attr("value") != "0"){
		type = $(".records p").attr("value");
	}
	$.axs("/user/analysisRecord/findAnalysisRecord.do", {
		"type" : type,
		"pageNum" : pageNum,
		"pageSize" : pageSize
	}, false, function(data) {
		if(data.retCode=="0000"){
			$("#recordList").empty();
			if(data.retData.analysisRecordList != null && data.retData.analysisRecordList != ""){
				$(data.retData.analysisRecordList).each(function(){
					var tr = $("<tr>");
					var checkboxTd = $("<td>");
					var checkbox = $("<input type='checkbox' name='items' data-value='"+this.id+"."+this.tableName+"' />");
					var timeTd = $("<td>");
					var typeTd = $("<td>");
					var titleTd = $("<td>");
					var titleA = $("<a href='javascript:;' >");
					var urlTd = $("<td class='ck'>");
					var urlA = $("<a href="+this.analysisUrl+">");
					checkboxTd.append(checkbox);
					timeTd.text(this.date_time);
					if(this.type == "1"){
						typeTd.text("股票对比");
					}else if(this.type == "2"){
						typeTd.text("选股查询");
					}else if(this.type == "3"){
						typeTd.text("股票详情");
					}else if(this.type == "4"){
						typeTd.text("模型报告");
					}
					titleA.attr("title",this.title);
					var and = "";
					if((this.title).length > 32){
						and = "……";
					}
					titleA.text((this.title).substring(0,38) + and);
					titleTd.append(titleA);
					urlA.html("查看");
					urlTd.append(urlA);
					tr.append(checkboxTd);
					tr.append(timeTd);
					tr.append(typeTd);
					tr.append(titleTd);
					tr.append(urlTd);
					$("#recordList").append(tr);
				})
				
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
                    	findAnalysisRecord(pageNumber, size);
                    }
                });
                //修改分页文字
                setPageText('page');
			}else{
				$('#page').hide();
				$("#recordList").append("<tr><td colspan='5' >暂无记录</td></tr>");
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
