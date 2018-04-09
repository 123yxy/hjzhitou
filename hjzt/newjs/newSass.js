$(function(){
	//查询行业
	findCategory();
})
//查询所有行业
function findCategory(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false
			}
			var hyHtml='';
			$(result).each(function(index,item){
				categoryName=item.categoryName;
				hyHtml+='<div class="hy_public fl '+item.nameEn+'" title="'+item.categoryName+'">';
				hyHtml+='<div class="hy_icons">';
				hyHtml+='<i></i>';
				hyHtml+='</div>';
				if(categoryName.length>6){
					categoryName=categoryName.substring(0,5)+"...";
				}
				hyHtml+='<span data-categoryId="'+item.categoryId+'">'+categoryName+'</span>';
				hyHtml+='<em></em>';
				hyHtml+='</div>';
			})
			hyHtml+="<div class='clr'></div>";
			$("div.indexhy_tc").html(hyHtml);
			$(".new_small_pdbox").html(hyHtml);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}
