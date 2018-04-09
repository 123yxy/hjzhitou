$(function(){
	$(".userHead-logo").html(logourl());
    $(".indexTop-user").html(sethead());
    
    $(".baogao-type span").on("click",function(){
    	$(this).addClass("on").siblings().removeClass("on");
    })
    
})
