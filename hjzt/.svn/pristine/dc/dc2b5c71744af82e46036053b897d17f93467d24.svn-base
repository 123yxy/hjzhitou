// $(function(){
//     $(".select-box").each(function(){
//         var s=$(this);
//         // var z=parseInt(s.css("z-index"));
//         var title=$(this).children("ul").children("li.select");
//         var content=$(this).children(".s-content");
//         title.click(function(){
//              // content.is(":hidden")?slideDown(200):slideUp(200);
//             var name=$(this).attr("name");
//             console.log(name);
//             if($("."+name).is(":visible")){
//                 $("."+name).slideUp(200)
            
//             }else{
//                 $("."+name).slideDown(200)
//             }
        
//             $(this).children().children("span").addClass("active").parents(".s-title").parents("li.select").siblings("li.select").children().children("span").removeClass("active")
//             if(name=="sb"){

//                  $(".sb").slideDown(200);
//                  $(".aw").slideUp(200)
//                  // .attr("style","display:none");
//             }else{
//                 $(".aw").slideDown(200);
//                  $(".sb").slideUp(200)
//                  // .attr("style","display:none");
//             }
          
//         });
//         content.on("click","ul li a",function(){
//             content.slideUp(200);
//              $(".s-title").children("span").removeClass("active");
//             if($(this).parents(".s-content").hasClass("sb")){
//                 // alert(1)
//                 console.log($(".select[name='sb']").children(".s-tilte"))
//                     $(".select[name='sb']").children(".s-title").html($(this).html()+"<span><span>")
//             }else{
//                     $(".select[name='aw']").children(".s-title").html($(this).html()+"<span><span>")

//             }

            

//         });   
//     })
// })



$(function(){
    $(".select").each(function(){
        var s=$(this);
        var z=parseInt(s.css("z-index"));
        var title=$(this)
        var name=$(this).attr("name");
        // console.log(name)
        var content=$("."+name);
        // console.log(content)        
        var item=$(this).children(".s-content").children().children();
        var _show=function(){content.slideDown(200);title.addClass("cur");s.css("z-index",z+1);};   //展开效果
        var _hide=function(){content.slideUp(200);title.removeClass("cur");s.css("z-index",z);};    //关闭效果
        title.click(function(){     
           
            if(content.is(":visible")){
                content.slideUp(200)
            
            }else{
                content.slideDown(200)
            }
            // $(".big-box").removeClass("width");
            if(!$(this).children().children("span").hasClass("active")){
                $(this).children().children("span").addClass("active");
                $(this).siblings().children(".s-title").children().removeClass("active");
                content.slideDown(200).siblings(".s-content").slideUp(200);
            }else{
                $(this).children().children("span").removeClass("active");
            }

        });
        content.on("click","ul li a",function(){
            var cont_name=$(this).parents("li").parents("ul").parents();
            if(cont_name.hasClass("sb")){
                $(".select[name='sb']").children().html($(this).html()+"<span></span>");
                content.slideUp(200);

            }else if(cont_name.hasClass("aw")){
                $(".select[name='aw']").children().html($(this).html()+"<span></span>");
                content.slideUp(200);
            }           
            $(".select").children().children("span").removeClass("active");

        });    
       
        $("body").click(function(i){
            !$(i.target).parents(".select").first().is(s) ? _hide():"";
            if(!$(i.target).parents(".select").first().last("span").is(s))
                title.children().children("span").removeClass("active")
        });
    })
})