var currentPage=1;
var pageSize=12;
$(function(){
	
	getData(1,10);
	
	$('#tool_more').on("click",function(){
		getData(currentPage,pageSize);
		ChangeFrame();
	});
	
	ChangeFrame();
	
})

//修改边框颜色
function ChangeFrame(){
	$(".tool_public").on("mouseenter",function(){
		var borderColor=$(this).find("div.tool_public_l").find("i").eq(0).attr("class");
		if(borderColor=="tools_tb"){
			$(this).css("border","1px solid #ff9486");
		}
		if(borderColor=="tools_mx"){
			$(this).css("border","1px solid #8f82ba");
		}
		if(borderColor=="tools_fx"){
			$(this).css("border","1px solid #70CDFD");
		}
		$(this).siblings().css("border","1px solid #e4e4e4");
		$(".clr").css("border","none");
	})
}


function getData(pageNum,pageSize){
	$.axs("/user/analysisRecord/findUserTool.do",
			{
				pageNum : pageNum,
				pageSize : pageSize
			},
			false,
			function(data) {
				if (data.retCode == "0000") {
					if (data.retData != null) {
						var html = ""; // 追加的html代码
						$(data.retData.data).each(
							function(index, item) {
								console.log(item);
								html += '<div class="tool_public" onclick="clickHistory(\''+item.id+'\',\''+item.type+'\',\''+item.userdata+'\')">'+
										'<div class="tool_public_l">';
								if(item.tableName == "tool_article"){
									html += '<i class="tools_fx"></i><span>文章-行情分析</span>';
								}else if(item.tableName == "tool_chart_analysis"){
									html += '<i class="tools_tb"></i><span>行情图表</span>';
								}else{
									html += '<i class="tools_mx"></i><span>流量分析模型</span>';
								}
								html += '<div class="clr"></div>'+
										'</div>'+
										'<div class="tool_public_r">';
								if(item.title.length > 7){
									html += '<span class="tool_name" title='+item.title+' >'+item.title.substring(0,6)+'...</span>';
								}else{
									html += '<span class="tool_name" >'+item.title+'</span>';
								}
											
								html +=	'<span class="tool_time">'+item.date_time+'</span>'+
										'</div>'+
										'<div class="clr"></div>'+
									'</div>';
							});
						$(".tool_type").append(html);
						if(data.retData.more){
							currentPage++;
							$('#tool_more').show();
							$('#tool_no_nore').hide();
						}else{
							$('#tool_more').hide();
							$('#tool_no_nore').show();
						}
					}
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
}
