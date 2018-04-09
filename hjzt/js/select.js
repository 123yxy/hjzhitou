$(function(){
    $(".select").each(function(){
        var s=$(this);
        var z=parseInt(s.css("z-index"));
        var title=$(this).children(".s-title");
        var date1=$(this).children().children("a");
        var bot=$(this).children().children("span.bot");
        var content=$(this).children(".s-content");
        var item=$(this).children(".s-content").children().children();
        var _show=function(){content.slideDown(200);title.addClass("cur");s.css("z-index",z+1);};   //展开效果
        var _hide=function(){content.slideUp(200);title.removeClass("cur");s.css("z-index",z);};    //关闭效果
        title.click(function(){
            content.is(":hidden")?_show():_hide();
            $(".big-box").removeClass("width");
            if(!$(this).children("span").hasClass("active")){
                $(this).children("span").addClass("active");
                $(this).parent().siblings().children(".s-title").children().removeClass("active");
            }else{
                $(this).children("span").removeClass("active");
            }

        });
        console.log(date1)
         date1.click(function(){
            content.is(":hidden")?_show():_hide();
            $(this).siblings("span").removeClass("close");
            $(".big-box").removeClass("width");
            if(!$(this).siblings("span").hasClass("active")){
                $(this).siblings("span").addClass("active");
                $(this).parent().parent().siblings().children().children().removeClass("active");
            }else{
                $(this).siblings("span").removeClass("active");
            }

        });
        bot.click(function(){
            content.is(":hidden")?_show():_hide();
            $(".big-box").removeClass("width");
            if(!$(this).hasClass("active")){
                $(this).addClass("active");
                $(this).parent().parent().siblings().children().children().removeClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        var titleTxt=title.html();
        content.on("click","ul li a",function(){
            if($(this).html()!="全部"){
                title.html($(this).html()+"<span></span>");_hide();
            }else{
                title.html(titleTxt); _hide();
            }
            $(".s-title>span").removeClass("active");

        });     //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
        item.hover(function(){
            $(this).parent().siblings().removeClass("hide");
            $(this).children().addClass("hover").parents().siblings().children().removeClass("hover");
            if($(this).children().hasClass("all")){
            	$(".big-box").removeClass("width");
            	$(".item-content").addClass("hide");
            	$(".item-content ul").html("");
            }else{
            		$(".big-box").addClass("width")
            }
            
        });
        $(".big-box").on("mouseleave",function(){
            $(this).children(".item-content").addClass("hide");
            $(this).removeClass("width");
            $(this).children(".content-box").children().children().removeClass("hover");
        });
        $(".item-content ul").click(function(){
            $(this).parents(".s-content").siblings(".s-title").html($(this)
                .html()+"<span></span>");
            _hide();
            $(".s-title>span").removeClass("active");
        });

        $("body").click(function(i){
            !$(i.target).parents(".select").first().is(s) ? _hide():"";
            if(!$(i.target).parents(".select").first().last("span").is(s))
                title.children("span").removeClass("active")
        });
    })
})