jQuery(document).ready(function(e) {

	$ = jQuery;


/*返回顶部*/
  $(function() {
        $(window).scroll(function () {
            if(!$('body').hasClass('probably-mobile'))
            {
				var e = $("#left-slide-bar");
                if ($(this).scrollTop() > 50) {
                    $('a#scroll-top').fadeIn();
					$(e).css({top: 100});
                } else {
                    $('a#scroll-top').fadeOut();
					$(e).css({top: 426})
                } 
            }
            else
            {
                $('a#scroll-top').fadeOut();
            }
        });

        $('a#scroll-top').on('click', function(){
            if(!$('body').hasClass('probably-mobile'))
            {
                $('html, body').animate({scrollTop:0}, 'slow' );
                return false;
            }
        });
        
        /*v3 add*/
        $(window).scroll(function () {
        	
        	if ($(this).scrollTop() > 50) {
                $('a#V3_Totop').fadeIn();
            } else {
                $('a#V3_Totop').fadeOut();
            } 
			
        });

        $('a#V3_Totop').on('click', function(){
            if(!$('body').hasClass('probably-mobile'))
            {
                $('html, body').animate({scrollTop:0}, 'slow' );
                return false;
            }
        });
		
		
    });

 /*城市下拉选择*/
 $(".city-select").on('click', function(evt){
      evt.stopPropagation();
      var input = $(this).find('.str'),
        dropObj = $(this).find('.city-menu'),
        _this = $(this),
        closeBtn = dropObj.find(".closebtn");
      $(this).addClass("current");    
      
      closeBtn.on('click', function(evt){
        evt.stopPropagation();
        _this.removeClass("current");   
      });
    
  });
  $("body").on('click', function(){
    $(".city-select").removeClass("current"); 
  });

  
  $("body").on('click', function(){
    $(".city-select").removeClass("current"); 
  });

 
$(".map li a") .click(function(evt){ 
    $provice = $(this).attr('provice'),
    $name  = $(this).attr('name'),
    //alert($provice);  
    $(".provice").val($provice);      
    $(".name").val($name); 
    $('.citySelect p').html($name);	
    evt.stopPropagation();
    $(".city-select").removeClass("current"); 
  })
  

 
  $('#btn-search').click(function () {  
    var  provice = $(".provice").val();
	var  key     = $("#areaInput").val(); 
	var  name    = $(".name").val(); 
 	if($.trim(provice)==""){
        errmsg('请选择省份');
		return false; 
	}else if($.trim(key)==""){
		errmsg('请输入企业名称或注册号！');
		return false;
	}else if($.trim(key).length<2){
		errmsg('企业名称至少2个关键字');		
		return false;
	}else{
		window.location.href=encodeURI(INDEX_URL+"search?provice="+provice+"&key="+key+"&name="+name); 	
	} 
});   
   
 

/*返回顶部*/
  $(function() {
    $('body').delegate('#left-slide-bar a','click',function(e){
        e.preventDefault();
		var hash = $(this).attr('href');
        var offset = $(hash).offset().top;
		//alert(offset);
		$("#left-slide-bar a").each(function(){
			$(this).removeClass('active');
		});
		 $(this).addClass('active').siblings().removeClass('active');
        $('body,html').animate({scrollTop:offset-100},300);
    })	
 }); 

 

 

/*	个人中心 */
$(function(){
    var avatar_timer=null;
    $('.nav-user').hover(
      function(event){

        clearTimeout(avatar_timer);

        $('.profile-box').show();

    },function(){
        avatar_timer = setTimeout(function(){
            $('.profile-box').hide();
        },500);
    }); 
  });
 
/*	应用中心 */
$(function(){
    var avatar_timer=null;
    $('.nav-app').hover(
      function(event){

        clearTimeout(avatar_timer);

        $('.app-box').show();

    },function(){
        avatar_timer = setTimeout(function(){
            $('.app-box').hide();
        },500);
    }); 
  });


 /*微信登录*/
 $(function(){
    var avatar_timer=null;
    $('.cc_btn-weixin').hover(
      function(event){ 

        clearTimeout(avatar_timer);

        $('.share-dropdown').show();

    },function(){
        avatar_timer = setTimeout(function(){
            $('.share-dropdown').hide();
        },500);
    }); 
  });
 
 //重新认证邮箱
  $(".email2").click(function(){ 
  //alert($(this).attr('companykey'));
	$.post(INDEX_URL+'/user_changeEmailAction2',function(rs){
		if(rs.success){
			sucdia({content:"重新发送邮件成功，请尽快认证您的邮箱"});  
		}else{
		   faldia({ 
			  content: rs.msg,            
		  });               
		}                             
	},'json');    
 });  
  
  $('.btn-guest').click(function () {
    var  content  = $(".content").val();
	var  email     = $(".email").val();
	if($.trim(content)==""){
		$(".contentmsg").text('请输入内容！');
		return false;
	}else if($.trim(email)==""){
		$(".emailmsg").text('请输入邮箱');
		return false;
	}else if(!$(".email").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
		$(".emailmsg").text('邮箱格式不正确');
		return false;
	}else{
		$.ajax({
		   type: 'POST',
		   url:INDEX_URL+'/guestbook_addAction',
		   data:'content='+content+'&email='+email,
		   success: function(result){
			    var delay;
			 	delay = function(ms, func) {
					return setTimeout(func, ms);
				};
				toastr.options = {
					positionClass: 'toast-bottom-left'
				};
				delay(100, function() {
                    if(result.success){
                        return toastr.success('恭喜你，反馈成功！');
                    }else{
                        return toastr.success(result.msg);
                    }

				});
				setTimeout(location.reload(),2000);
		   }
		});
	}
});


 //操作错误对话框
 errmsg = function(content){
	var delay; 
	delay = function(ms, func) {
	    return setTimeout(func, ms);
	};
	toastr.options = {
	    positionClass: 'toast-bottom-left'
	}; 
	delay(10, function() {
	    return toastr.error(content);
	}); 
 }
 
 

  //操作失败对话框
 errmsg2  = function(content){
	var provice    =  $("#provice").val();
	var unique     =  $("#unique").val();	 
	fn = function() {
		location.href = INDEX_URL+"/user_login?back="+INDEX_URL+"/firm_"+provice+"_"+unique;  
	};  
	var options = {}; 
	if(typeof(content) == 'string'){
		options.content = content;
		options.fn = fn || function(){};
	}else{
		options = content;
	}
	options.content 	= options.content || '保存失败！';
	options.time		= options.time 	|| 2;
	options.fn			= options.fn 		|| function(){};
	var delay;
	delay = function(ms, func) {
	    return setTimeout(func, ms);
	};
	toastr.options = { 
	    positionClass: 'toast-bottom-left'
	};
	delay(10, function() {
	    return toastr.error(options.content);
	}); 
    setTimeout(options.fn,2000);  
 }
 
 
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(5(){$(".1").4();$("#i").v(5(){$(".1").4();0 e=$(".9").8();0 f=$("#i").8();0 g=$.k(e+f);3($.j(e)==""){6 7}2 3($.j(f)==""){$(".1").4();6 7}2{$.w({x:\'A\',D:l+\'/m\',n:\'9=\'+e+\'&o=\'+f+\'&p=\'+g,q:5(a){3(a=="s"){$(".t-u").h("网络状态异常");6 7}2{0 b="";0 c=y.z(a);0 d=c.B;3(d){$(".1").C();0 b=r(e,d);$(".1").h(b)}2{$(".1").4()}}}})}})});',40,40,'var|list|else|if|hide|function|return|false|val|provice||||||||html|areaInput|trim|md5|INDEX_URL|gongsi_getList|data|key|token|success|dealInfoToHTML|null|result|msg|keyup|ajax|type|JSON|parse|POST|Result|show|url'.split('|'),0,{}))


	
// $(function() {	
// 	$("#search-list").hide();
// 	$("#header-search-list").hide();
// 	$("#searchkey").on('input',function(e){
// 	  searchList(1);
// 	})
// 	$("#searchkey").bind('click',function(e){
// 		searchList(1);
// 	})
//     $("#headerKey").on('input',function(e){
//         searchList(2);
//     })
//     $("#headerKey").bind('click',function(e){
//         searchList(2);
//     })

// 	document.onclick=function(e){
// 		var e=e?e:window.event;
// 		var tar = e.srcElement||e.target;
// 		if(tar.id!="searchkey"){
// 			$("#search-list").hide();
// 		}
// 	}
// });

// //搜索
// function searchList(){
//         if(arguments[0] == 1){
//             var list = $("#search-list");
//             var key = $("#searchkey");
//         }else{
//             var list = $("#header-search-list");
//             var key = $("#headerKey");
//         }
//         list.hide();
// 		var f = key.val();
// 		var type = $("#index").val();
//  		if ($.trim(f) == "") {
//  			return false
// 		} else {
// 				$.ajax({ 
// 					type: 'POST',
// 					url: INDEX_URL + '/gongsi_getList',
// 					data: 'key=' + f + "&type="+type,
// 					success: function(a) {
// 						if (a == "null") {
// 							//$(".result-msg").html("网络状态异常");
// 							return false
// 						} else {
// 							var b = "";
// 							var c = JSON.parse(a);
// 							var d = c;
// 							if (d) {
//                                 list.show();
// 								var b = dealInfoToHTML(e, d);
//                                 list.html(b)
// 							} else {
//                                 list.hide()
// 							}
// 						}
// 					}
// 				})		 	 
// 		}
// }	 
	
	
	
// /** 搜索结果html**/
// function dealInfoToHTML(provice,companys){
// 	var html='';
//     html=html+"<div class='list-group no-radius alt'>";
// 	for(var i=0;i<companys.length;i++){
//  	    html=html+"<a class='list-group-item' href='"+INDEX_URL+"/firm_"+companys[i].KeyNo+".shtml'><span class='badge bg-info'>"+companys[i].Reason+"</span>"+companys[i].Name+"</a>";
// 	} 
// 	html=html+"</div>";
// 	return html; 
// }  
// }); 


$(function() {	
	$("#search-list").hide();
	$("#header-search-list").hide();
	$("#searchkey").on('input',function(e){
		
	  searchList(1);
	})
	$("#searchkey").bind('click',function(e){
		if($(this).val()!=''){
			searchList(1);
		}else{
			searchList(2);
		}
	})
    $("#headerKey").on('input',function(e){
        searchList(3);
    })
    $("#headerKey").bind('click',function(e){
    	if($(this).val()!=''){
			searchList(3);
		}else{
			searchList(4);
		}
    })

	document.onclick=function(e){
		var e=e?e:window.event;
		var tar = e.srcElement||e.target;
		if(tar.id!="searchkey"&&tar.id!="headerKey"){
			$("#search-list").hide(); 
			$("#header-search-list").hide();
		}
	}
});
	
var mTimeout;
//搜索
function searchList(type){

		if(type==1||type==3){
			//加这个是为了防刷，输入完0.5秒后再去请求服务器
			if(mTimeout){
				clearTimeout(mTimeout);
			}
			var flag = type;
			mTimeout = setTimeout(function(){
		        if(flag == 1){

		            var list = $("#search-list");
		            var key = $("#searchkey");
		        }else{
		            var list = $("#header-search-list");
		            var key = $("#headerKey");
		        }
				list.hide();
				var f = key.val();
				if(f.length<2) return;
				var type = $("#index").val();
					if ($.trim(f) == "") {
						return false
				} else {
					
					$.ajax({ 
						type: 'POST',
						url: INDEX_URL + '/gongsi_getList',
						data: 'key=' + f + "&type="+type,
						success: function(a) {
							if (a == "null") {
								//$(".result-msg").html("网络状态异常");
								return false
							} else {
								var b = "";
								var c = "";
								try{
									c = JSON.parse(a);
								}catch(e){
									//console.info(e);
								}
								
								var d = c;
								if (d) {
				                    list.show();
									var b = dealInfoToHTML(e, d);
				                    list.html(b)

								} else {
				                    list.hide()
								}
							}
						}
					})		 	 
				}
			},350);

		}else if(type==2||type==4){
			var list;
			if(type==2){
				var list = $("#search-list");
			}else{
				var list = $("#header-search-list");
			}
			$.ajax({ 
				type: 'POST',
				url: INDEX_URL + '/gongsi_getSearchWord',
				data: '',
				success: function(a) {
					if(a.view||a.search){
						var b = dealHistoryToHTML(a.view, a.search);
						list.html(b);
						list.show();
					}
				}
			})		 	 
		}

}



/** 搜索结果html**/
function dealInfoToHTML(provice,companys){
	var html='';
    html=html+"<div class='list-group no-radius alt'>";
	for(var i=0;i<companys.length;i++){
 	    html=html+"<a class='list-group-item' href='"+INDEX_URL+"/firm_"+companys[i].KeyNo+".shtml'><span class='badge bg-info'>"+companys[i].Reason+"</span>"+companys[i].Name+"</a>";
	} 
	html=html+"</div>";
	return html; 
} 

/** 搜索结果html**/
function dealHistoryToHTML(coms,keys){
	var html='';
	html=html+"<div class='list-group no-radius alt'>";
	/*if(keys && keys.length>0){
		html=html+'<div class="list-group-item" ><a class="text-info" href="javascript:;">搜索记录</a></div>';
		// if(keys.length>3){
		// 	keys = keys.splice(0,3);
		// }
		for(var i=0;i<keys.length;i++){
 	    	html=html+'<a class="list-group-item" href="/search?key='+keys[i].key+'">'+keys[i].key+'</a>';
		} 
	}*/
	if(coms && coms.length>0){
		html=html+'<div class="list-group-item" ><a class="text-info" href="javascript:;">浏览记录</a></div>';
		// if(coms.length>3){
		// 	coms = coms.splice(0,3);
		// }
		for(var i=0;i<coms.length;i++){
 	    	html=html+'<a class="list-group-item" href="/firm_'+coms[i].key+'.shtml">'+coms[i].name+'</a>';
		} 
	}  

	html=html+"</div>";
	return html; 
}

}); 




//回复评论
function reply(e,u){
	box  = document.getElementById('comm');
	to   = document.getElementById('to');
	to.value = u; 
	//alert(u);
	oc = box.value; 
	prefix = '@' + e + ' ';
	nc = oc + prefix;
	box.focus();
	box.value = nc;
}


 $(function(){	 
	/**微信二维码扫描**/ 
	$("#wechat_code").hover(function(){ 
		//alert(123);
		$(".wechat_showplace").stop(true).show().animate({"top":"35px","opacity":"1"});
	},function(){
		$(".wechat_showplace").stop(true).animate({"top":"35px","opacity":"0"},200,function(){
			$(this).hide();
		}); 
	});
	
 
   
	  /**首页点击搜索**/
  
	   
    $('.search-type').click(function () {  
        $(".newlist").hide();	 		 
		$('.search-type').removeClass("active");
		$(this).addClass("active");
		//alert(); 
		var index = $(this).index();
		$("#index").val(index);
		if(index==2){
	       $('#searchkey').attr('placeholder','请输入企业名称、注册号或统一社会信用代码，如“小米科技”')						
        }else if(index==4){  
	       $('#searchkey').attr('placeholder','请输入法人名称或股东名称，如“马云”')				
		}else if(index==6){
	       $('#searchkey').attr('placeholder','请输入高管名称，如“李嘉诚”')		  					
		}else if(index==8){
	       $('#searchkey').attr('placeholder','请输入品牌或产品的关键字，如“企查查”')							
		}else if(index==10){
	       $('#searchkey').attr('placeholder','请输入企业注册地址、联系电话、邮箱或网址，如“苏州工业园区”')							
		}else if(index==12){
	       $('#searchkey').attr('placeholder','请输入企业经营范围，如“软件”')	 		 	 			
		}else{  
		   $('#searchkey').attr('placeholder','请输入企业名称、人名，产品名等，多个关键词用空格隔开，如“小米 雷军”')									
		 }	 	    
	  });   
	  
	  
	  $('#new-search').click(function () {   
		var  key     = $("#newInput").val(); 
		var  type    = $("#sType").val(); 
	    var msg = $('#newInput').attr('placeholder');
	   if($.trim(key)==""){
			errmsg(msg);
			return false;
		}else if($.trim(key).length<2){
			errmsg('至少2个关键字');		
			return false; 
		}else{
			if(type==0){ 
			    window.location.href=encodeURI(INDEX_URL+"search?"+"key="+key+"&index=name"); 	 				
			}else if(type==1){
				window.location.href=encodeURI(INDEX_URL+"search?"+"key="+key+"&index=opername"); 	  					
			}else if(type==2){
				window.location.href=encodeURI(INDEX_URL+"search?"+"key="+key+"&index=address"); 	 					
			}else if(type==3){
				window.location.href=encodeURI(INDEX_URL+"search?"+"key="+key+"&index=scope"); 	 					
			}else if(type==4){
				window.location.href=encodeURI(INDEX_URL+"search?"+"key="+key+"&index=featurelist"); 	 					
			}
		} 
	});  

    $('#relation-nv a').click(function () { 
        $(".newlist").hide();	
		var  key     = $("#newInput").val(); 
		var  type    = $("#sType").val(); 
		//$(this).addClass("on");
        if(type==1){
	       $('#newInput').attr('placeholder','请输入准确的身份证号码')				
        }else{
		   $('#newInput').attr('placeholder','请输入完整的企业名称')									
		 }	 	 
	  });  
	  
	
	  $('#relation-search').click(function () {   
		var  key     = $("#newInput").val(); 
		var  type    = $("#sType").val(); 
	    var msg = $('#newInput').attr('placeholder');
	   if($.trim(key)==""){
			errmsg(msg);
			return false;
		}else if($.trim(key).length<2){
			errmsg('至少2个关键字');		
			return false; 
		}else{
			if(type==0){ 
			    window.location.href=encodeURI(INDEX_URL+"relation_search?"+"key="+key); 	 				
			}else if(type==1){
				window.location.href=encodeURI(INDEX_URL+"relation_buy?"+"key="+key); 	  					
			}
		} 
	});  
	
	//快报资讯
    $('#panel-news').hover(
      function(){ 
		$(this).css("overflow","auto");
    },function(){       
       $(this).css("overflow","hidden");
    }); 
	
	 $('.item-inner').click(function () {   
	    // alert(123);
		if($(this).children(".item-info").is(':hidden')){
			//alert(123);
		   $(".item-info").hide();  
		   $(this).children(".item-info").show();  
		}else{
		   $(this).children(".item-info").hide();
		}			
	});  
		 
})	
 
 
function selectType(typeIndex) {
	var container = document.getElementById("search-nv");
	var links = container.getElementsByTagName("a");
	if (!links) {
		return 
	}
	document.getElementById("sType").value = typeIndex;
 	for (i = 0; i < links.length; i++) {
		if (i == typeIndex) { 
			links[i].className = "search-type  on"
		} else {
			links[i].className = "search-type "
		}
	}
}

function realtionType(typeIndex) {
	var container = document.getElementById("relation-nv");
	var links = container.getElementsByTagName("a");
	if (!links) {
		return  
	}
	document.getElementById("sType").value = typeIndex;
 	for (i = 0; i < links.length; i++) {
		if (i == typeIndex) { 
			links[i].className = "searchType on"
		} else {
			links[i].className = "searchType"
		}
	}
} 
 
  
  
 /*	搜索结果 */ 
$(function(){
    var btn_timer=null;
    $('.filter-bar .btn-group').hover(
      function(event){ 
         clearTimeout(btn_timer);
		 $(".btn-group .dropdown-menu").hide(); 
         $(this).children(".dropdown-menu").show();
    },function(){    
         btn_timer = setTimeout(function(){  
           $(".btn-group .dropdown-menu").hide();
        },500);
    }); 
  });
  
 
$(function(){
    var btn_timer=null;
    $('.dropdown-submenu').hover(
      function(event){ 
         clearTimeout(btn_timer); 
		 $("#hangye .dropdown-menu").hide(); 
         $(this).children(".dropdown-menu").show();
    },function(){       
         btn_timer = setTimeout(function(){   
           $(".btn-group .dropdown-menu").hide();
        },500);
    }); 
  });
 
   
 	//关注
   function  follow(obj,companykey){
			$.ajax({
				type: 'post',
				url: INDEX_URL+'/company_followadd?companykey='+companykey,
 				success: function(data){
                    sucdia({content:"你关注了一家公司~ 萌萌哒~~"});					
					obj.className = "btn btn-icon btn-success  btn-rounded btn-inactive m-r-xs";
 					$(obj).attr('onclick','unfollow(this,"'+companykey+'");stopPP(arguments[0]);');
                    $(obj).attr('title','取消关注公司');					
				},
			});   
   }  

  

	//取消关注
   function  unfollow(obj,companykey){
			$.ajax({
				type: 'post',
				url: INDEX_URL+'/company_followdel?companykey='+companykey,
 				success: function(data){ 
					 obj.className = "btn btn-icon btn-default  btn-rounded btn-inactive m-r-xs";
 					$(obj).attr('onclick','follow(this,"'+companykey+'");stopPP(arguments[0]);');
                    $(obj).attr('title','关注公司');					
				},
			}); 
   }   
 
 

//阻止冒泡的方法
	function stopPP(e){
		var evt = e || window.event;
		//IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
		evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble=true);
	}
	
		
	//发表产品评论
    function postRroductComment(){ 
		    var companykey     =  $("#companykey").val();  
			var content        =  $("#commentcontent").val(); 
			var contentid      =  $("#contentid").val();	
            if(content==''){  
				faldia({  
					content:"请输入评论内容"
				});	
                return false;				
			}else{
				$.ajax({ 
					type:'POST',
					url:INDEX_URL+'/user_productcommentAdd',
					data:'companykey='+companykey+'&content='+content+'&contentid='+contentid,
					success:function(msg){ 
					   var obj = JSON.parse(msg);
						if(obj.success==true){
                              sucdia({content:"你评论了一家产品~ +5 积分！"});
                              productcomment(1);
                              $("#commentcontent").val('');  	 						  
						}else{		 			
							 faldia({
								  content: '亲，好像出什么错了，请稍后重试' 
							  }); 	 	 					 
						}					   
					}
				})				
			}			 

        } 
	
		 //删除评论
       function delRroductComment(id){ 
			$.post(INDEX_URL+'/company_productcommentDel?id='+id,function(rs){
				if(rs.success)  sucdia({
				   content:"删除成功",
				  'fn':function(){   
					productcomment(1);
				   }		 	
				});               
				else{   
				   faldia({ 
					  content: rs.msg,
					  'fn': function() {
					   if (rs['code'] == 1){ 
						location.href = INDEX_URL+"/user_login";
					   }               
					}               
				  });               
				}    
			},'json'); 		 

        }	
	
		//评论分页
     function productcomment(page){ 
	        var contentid       = $("#contentid").val();			
            var url = INDEX_URL+"user_productfeeds?"+"contentid="+contentid+"&p="+page;		
			$.ajax({     
				type:'GET',    
				dataType:"html",			
				url:url, 			 
				success:function(data){ 
				   //alert(data);    
						if(data){      
 							$("#comment").html(data);					 				 
						}				
				} 
			})			    
	  }
	  
   
   //关注产品
   function  productfollow(obj,contentid){
			$.ajax({
				type: 'post',
				url: INDEX_URL+'/user_productfollowadd?contentid='+contentid,
 				success: function(data){
                    sucdia({content:"你关注了一个产品~ 萌萌哒~~"});					
					//obj.className = "btn btn-icon btn-success  btn-rounded btn-inactive m-r-xs";
 					$(obj).attr('onclick','productunfollow(this,"'+companykey+'");stopPP(arguments[0]);');
                     $(obj).text('取消关注');					
				}, 
			});   
   }  
 
     
 
	//取消关注产品
   function  productunfollow(obj,contentid){
			$.ajax({ 
				type: 'post',
				url: INDEX_URL+'/user_productfollowdel?contentid='+contentid,
 				success: function(data){
 					 //obj.className = "btn btn-icon btn-primary  btn-rounded btn-inactive m-r-xs";
 					$(obj).attr('onclick','productfollow(this,"'+contentid+'");stopPP(arguments[0]);');
                    $(obj).text('+ 加关注');		   				
				}, 
			});  
   }     	
	
//广告内容
window.onload = function(){ 
 	if(getCookie("footad")==0){  
	    $("#float_mask").hide();
		$(".guider").hide(); 
	}else{
 		$(".guider").show(); 
		$("#float_mask").show();  
	} 
} 
//关闭底部广告 
function closeFootAd() { 
 	$(".guider").hide(); 
	$("#float_mask").hide(); 
	setCookie("footad","0");  
}  
	 
//设置cookie  
function setCookie(name,value){  
	var exp = new Date();   
	exp.setTime(exp.getTime() + 1*60*60*1000);//有效期1小时  
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
}  
//取cookies函数  
function getCookie(name){  
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
	if(arr != null) return unescape(arr[2]); return null;  
}  

			

//找关系
//function findRelation(name){
//	 // alert(name); 
//	  $("#findModal").show();
// 	  if($(".tag").length==0){
//       // alert(123);		   
// 		  $(".tagsinput").html(""); 
//	  }
//    try{
//        if($("#tag"+name+"").length==1){
//            errmsg('节点已添加');
//            return false;
//        }
//    }catch(e){
//        //...
//    }
//
//	  var id = $(".tag").length; 
//	  // alert(id);
//    if(id>4){      
//		  errmsg('至多选择五个节点');
//		  return false; 
//	  }		  
//	  $(".tagsinput").append('<span class="tag '+id+'"" id="tag'+name+'" onclick="removeTag('+id+')"><span>'+name+' </span><a class="tagsinput-remove-link fui-cross-16"></a></span>') ;
//     $(".btn-remove").css("display","inline-block"); 	  
//}  	   
  
function findModal(){ 
	  $("#findModal").show();	 
} 

function hidefindModal(){   
	  $("#findModal").hide();	 
}  

function removeTag(obj){   	  
	  $(".tag."+obj+"").remove();
	 // alert(e);
 	  if($(".tag").length==0){ 
         // alert(123);		   
 		  $(".tagsinput").html('请点击左边 <span class="find-btn"><i class="fa   fa-plus-circle"></i></span> 加入 人或者公司 来找关系');
	  }   	  
}  

function removeAllTag(){   	   
	  $(".tag").remove();
      $(".btn-remove").hide();		  
 	  $(".tagsinput").html('请点击左边 <span class="find-btn"><i class="fa   fa-plus-circle"></i></span> 加入 人或者公司 来找关系');	  
}   

function findTo(){    
 		if($(".tag").length<2){
			 errmsg('至少选择两个节点');
			 return false;
		}  
       var searchKey = $(".tag").text();
  	   var url = encodeURI(INDEX_URL+"more_findRelation?searchKey="+searchKey);
	   window.open(url,"_blank");  
 }

//公司列表ajax请求
function getAjaxList(page){
    var key = $("input[name='key']").val();
    var index = $("input[name='index']").val();
    var statuscode = $("input[name='statuscode']").val();
    var registCapiBegin = $("input[name='registCapiBegin']").val();
    var registCapiEnd = $("input[name='registCapiEnd']").val();
    var sortField = $("input[name='sortField']").val();
    var isSortAsc = $("input[name='isSortAsc']").val();
    var province = $("input[name='province']").val();
    var startDateBegin = $("input[name='startDateBegin']").val();
    var startDateEnd = $("input[name='startDateEnd']").val();
    var city = $("input[name='city']").val();
    var industrycode = $("input[name='industrycode']").val();
    var subindustrycode = $("input[name='subindustrycode']").val();
    var tel = $("input[name='tel']").val();
    var email = $("input[name='email']").val();
    var ajaxflag = $("input[name='ajaxflag']").val();
    if(registCapiBegin == 0)registCapiBegin='';
    if(registCapiEnd == 0)registCapiEnd='';
    $("input[name='page']").val(page);
    $('#load_data').show();
    $('#ajaxlist').hide();
    $.ajax({
        url:INDEX_URL+'/search_index',
        type:'get',
        data:{key:key,index:index,statusCode:statuscode,registCapiBegin:registCapiBegin,registCapiEnd:registCapiEnd,sortField:sortField,isSortAsc:isSortAsc,
            province:province,startDateBegin:startDateBegin,startDateEnd:startDateEnd,cityCode:city,industryCode:industrycode,subIndustryCode:subindustrycode,
            tel:tel,email:email,ajaxflag:ajaxflag,p:page},
        dataType:'html',
        success:function(result){
            $('#ajaxlist').html(result);
            var sortDesc = $("input[name='hiddenSort']").val();
            if(sortDesc != '')$('.sortDesc').text(sortDesc);
            var hiddenArr = ['Index','Statuscode','RegistCapi','Startdate','Province','City','Industrycode','Subindustrycode','Tel','Email'];
            var appendHide = true;
            appendSearchWord(hiddenArr);
            //如果没有搜索条件，隐藏公司列表上方的筛选条件DIV
            $('#appendBox .appendSpan').each(function(){
                if($(this).css('display') != 'none'){
                    appendHide = false;
                    return false;
                }
            });
            if(appendHide){
                $('#appendBox').prev().css('margin-bottom','20px');
                $('#appendBox').hide();
            }else{
                $('#appendBox').prev().css('margin-bottom','0px');
                $('#appendBox').show();
            }
            $('#load_data').hide();
            $('html, body').animate({scrollTop:0}, 'normal');
            $('#ajaxlist').show();
        },
        error: function (result) {
            console.log(result);
        }
    });
}
  //公司列表ajax请求
    function getAjaxList2(page){
        var key = $("input[name='key']").val();
        var index = $("input[name='index']").val();
        var statuscode = $("input[name='statuscode']").val();
        var sortField = $("input[name='sortField']").val();
        var isSortAsc = $("input[name='isSortAsc']").val();
        var cat = $("input[name='cat']").val();
        var startDateBegin = $("input[name='startDateBegin']").val();
        var startDateEnd = $("input[name='startDateEnd']").val();
        var flowno = $("input[name='flowno']").val();
        var ajaxflag = $("input[name='ajaxflag']").val();
        $("input[name='page']").val(page);
        $('#load_data').show();
        $('#ajaxlist').hide();
        $.ajax({
            url:INDEX_URL+'/more_brand',
            type:'get',
            data:{key:key,index:index,status:statuscode,sortField:sortField,isSortAsc:isSortAsc,
                flowno:flowno,startDateBegin:startDateBegin,startDateEnd:startDateEnd,cat:cat,ajaxflag:ajaxflag,p:page},
            dataType:'html',
            success:function(result){
                $('#ajaxlist').html(result);
                var sortDesc = $("input[name='hiddenSort']").val();
                if(sortDesc != '')$('.sortDesc').text(sortDesc);
                var hiddenArr = ['Statuscode','Startdate','Flowno','Cat'];
                var appendHide = true;
                appendSearchWord(hiddenArr);
                //如果没有搜索条件，隐藏公司列表上方的筛选条件DIV
                $('#appendBox .appendSpan').each(function(){
                    if($(this).css('display') != 'none'){
                        appendHide = false;
                        return false;
                    }
                });
                if(appendHide){
                    $('#appendBox').prev().css('margin-bottom','20px');
                    $('#appendBox').hide();
                }else{
                    $('#appendBox').prev().css('margin-bottom','0px');
                    $('#appendBox').show();
                }
                $('#load_data').hide();
                $('html, body').animate({scrollTop:0}, 'normal');
                $('#ajaxlist').show();
            },
            error: function (result) {
                console.log(result);
            }
        });    
    
}    
//把筛选条件单独显示出来
function appendSearchWord(hiddenArr){
    var sname = '';
    var sclass = '';
    var svalue = '';

    for(var i=0;i<hiddenArr.length;i++){
        sname = "input[name='hidden"+hiddenArr[i]+"']";
        svalue = $(sname).val();
        sclass = '.append'+hiddenArr[i];
        if(svalue != ''){
            svalue = svalue + '<span class="glyphicon glyphicon-remove" style="padding-left: 3px"></span>';
            $(sclass).html(svalue);
            $(sclass).show();
        	}else{
        		$(sclass).hide();
        	}
    	}
}

//企业服务评论分页
function getServiceComment(page,id){
    $.ajax({
       data:{p:page,id:parseInt(id),ajax:true},
       url:INDEX_URL+'store_view',
       type:'get',
       dataType:'html',
       success:function(result){
            if(result){
                $('#commentlist').html(result);
            }
       }
    });
}

//添加企业服务评论
function addServiceComment(){
    var serviceid = $("#serviceid").val();
    var content = $('#commentcontent').val();
    if(content==''){
        faldia({
            content:"请输入评论内容"
        });
        return false;
    }else{
        $.ajax({
            type:'POST',
            url:INDEX_URL+'/store_addComment',
            data:{id:serviceid,content:content},
            success:function(msg){
                if(msg.success==true){
                    sucdia({content:"你评论了一家公司~ 获得 5 积分！"});
                    getServiceComment(1,serviceid);
                    $("#commentcontent").val('');
                }else{
                    faldia({
                        content: '亲，好像出什么错了，请稍后重试'
                    });
                }
            }
        })
    }
};

function deleteServiceComment(commentid,serviceid){
    $.ajax({
        data:{commentid:commentid,serviceid:serviceid},
        url:INDEX_URL+'/store_deleteComment',
        type:'post',
        success:function(result){
            if(result.success){
                sucdia({
                    content:"删除成功",
                    'fn':function(){
                        getServiceComment(1,serviceid);
                    }
                });
            }else{
                faldia({
                    content: result.msg,
                    'fn': function() {

                    }
                });
            }
        }
    });
};

//公司产品发表评论
function addProductComment(){
    var content = $("#commentcontent").val();
    if(content==''){
        faldia({content:"请输入评论内容"});
        return false;
    }else{
        $.ajax({
            type:'POST',
            url:INDEX_URL+'/company_commentAdd',
            data:$("#addProductComment").serialize(),
            success:function(msg){
                if(msg.success==true){
                    sucdia({content:"你评论了一家公司~ 获得 5 积分！"});
                    getProductComment(1,$("input[name='commentcode']").val());
                    $("#commentcontent").val('');
                }else{
                    faldia({
                        content: '亲，好像出什么错了，请稍后重试'
                    });
                }
            }
        })
    }
}

//删除公司产品评论
function deleteProductComment(commentcode,companykey,commentid){
    $.post(INDEX_URL+'/company_commentDel?id='+commentcode+'&companykey='+companykey+'&commentid='+commentid,function(rs){
        if(rs.success)  sucdia({
            content:"删除成功",
            'fn':function(){
                getProductComment(1,commentcode);
            }
        });
        else{
            faldia({
                content: rs.msg,
                'fn': function() {
                    if (rs['code'] == 1){
                        location.href = INDEX_URL+"/user_login";
                    }
                }
            });
        }
    },'json');
}

//公司产品评论分页
function getProductComment(page,id){
    $.ajax({
        data:{p:page,ajax:true,id:id},
        url:INDEX_URL+'product_index',
        type:'get',
        dataType:'html',
        success:function(result){
            if(result){
                $('#commentlist').html(result);
            }
        }
    });
}

function searchKeydown(event,obj){
    var event = event||window.event;
    var keyCode = event.keyCode;//40:下移，38：上移
    var flag = false;
    //var list = obj == 1 ? $('#search-list') : $('#header-search-list');
    var list = obj == 3 ? $('#radar-search-list') : (obj == 1 ? $('#search-list') : $('#header-search-list'));
    //var key = obj == 1 ? $('#searchkey') : $('#headerKey');
    var key = obj == 3 ? $('#radarkey') : (obj == 1 ? $('#searchkey') : $('#headerKey'));
    var radarFlag = obj == 3 ? true : false;
    //搜索列表是否显示
    var isShow = list.css('display');
    if(isShow == 'block' && (keyCode == 40 || keyCode == 38)){
        //判断是否有选中公司
        list.find('a').each(function(i){
            if($(this).hasClass('keyMove')){
                $(this).removeClass('keyMove');
                if(i != 4 && keyCode == 40){
                    var nextObj = list.find('a').eq(i+1);
                    var nextObjSpanText = list.find('a').eq(i+1).find('span').text();
                    assignSearchkey(key,nextObj,nextObjSpanText,radarFlag);
                    flag = true;
                }
                if(i != 0 && keyCode == 38){
                    var nextObj = list.find('a').eq(i-1);
                    var nextObjSpanText = list.find('a').eq(i-1).find('span').text();
                    assignSearchkey(key,nextObj,nextObjSpanText,radarFlag);
                    flag = true;
                }
                return false;//跳出each循环
            }
        });
        if(!flag){
            var j = keyCode == 40 ? 0 : 4;
            var nextObj = list.find('a').eq(j);
            var nextObjSpanText = list.find('a').eq(j).find('span').text();
            assignSearchkey(key,nextObj,nextObjSpanText,radarFlag);
        }
    }
}

function assignSearchkey(key,nextObj,nextObjSpanText,radarFlag){
    //样式变化
    nextObj.addClass('keyMove');
    //值处理
    var text = nextObj.text();
    text = text.replace(nextObjSpanText,'');
    //修改值
    key.val(text);
    //修改公司ID
    if(radarFlag){
        var companykey = nextObj.attr('data-key');
        $("input[name='radarCompanykey']").val(companykey);
    }
}

//搜索页
//$('#load_data').hide();

//var key = '{{$smarty.get.key}}';
var splitSymbolMid = ':';
var splitSymbolEnd = '&';
var jointClassOne = 'Choose';
var jointClassTwo = 'Choosen';

/*$('#search-options dl dd a').on('click', function () {
    changeHash($(this),true);
});*/

// 转换
function changeHash_(obj,http,t) {
    changeHash($(obj),http,t);
}

// 处理hash
function handleHash_(o,v) {
	var ovStr = o + splitSymbolMid + v;
	var hashStr = window.location.hash;
	var optionStr = hashStr.substr(1);
	var flag = true;
    var hideFlag = true;//默认隐藏
	var tel_email = 0;
	if(!optionStr){
		window.location.hash = optionStr + ovStr + splitSymbolEnd;
		flag = false;
        if(o != 'sortField' && o != 'p' && o != ''){
            hideFlag = false;
        }
	}else{
		var optionArr = optionStr.split(splitSymbolEnd);
		$.each(optionArr,function(i,itemStr){
			var itemArr = itemStr.split(splitSymbolMid);
			if(itemArr[0] == 'tel' || itemArr[0] == 'email' || itemArr[0] == 'mark' || itemArr[0] == 'patent' || itemArr[0] == 'finance' || itemArr[0] == 'listed'){
				tel_email++;
			}
            if((itemArr[0] != 'sortField' && itemArr[0] != 'p' && itemArr[0] != '') || (o != 'sortField' && o != 'p' && o != '')){
                hideFlag = false;
            }
            //非翻页请求，页码置为1
            if(itemArr[0] == 'p' && o != 'p'){
                optionArr[i] = 'p' + splitSymbolMid + '1';
            }
			if(o == itemArr[0]){
				flag = false;
				if(v != itemArr[1]){
					optionArr[i] = ovStr;
					//window.location.hash = optionArr.join(splitSymbolEnd);
				}
				//return false;
			}
		});
        optionStr = optionArr.join(splitSymbolEnd);//重新修改optionStr，因为页码可能发生修改
        window.location.hash = optionArr.join(splitSymbolEnd);
	}
	if(flag){
		window.location.hash = optionStr + ovStr + splitSymbolEnd;
	}
    hideFlag ? $('#appendBox').hide() : $('#appendBox').show();
	if(o == 'tel' || o == 'email' || o == 'mark' || o == 'patent' || o == 'finance' || o == 'listed'){
		if(tel_email == 5){
			$('#telOld').css('display','none');
		}
	}
}

// 添加查询条件
function changeHash(obj,http, t){
    if(obj instanceof jQuery){
        var o = obj.attr('data-option');
        var v = obj.attr('data-value');
    }else{
        var o = arguments[2];
        var v = obj;
    }
	handleHash_(o,v);
    // 加载城市选项
    if(o == 'province'){
		$.ajax({
			url:'/search_getCityListHtml',
			type:'get',
			data:'province=' +v+ '&q_type='+t,
			dataType:'html',
			success:function(result){
				if(result != ''){
					$('#city_show').html(result);
					$('#cityOld').css('display','block');
				}
			}
		});
	}
	// 加载二级行业分类
	if(o == 'industrycode'){
		$.ajax({
			url:'/search_getSubIndustrycodeHtml',
			type:'get',
			data:'industryCode=' + v + '&q_type='+t,
			dataType:'html',
			success:function(result){
				if(result != ''){
					$('#subindustrycode_show').html(result);
					$('#subindustrycodeOld').css('display','block');
				}
			}
		});
	}
	var obj_s = '.' + o + jointClassOne;
	var obj_sn = '.' + o + jointClassTwo;
	var desc = obj.attr('data-append');
	$(obj_sn).text(desc);
	$(obj_sn).show();
	$(obj_s).hide();
	$('#has_condition').text('已选条件');

    if(http){
		if(t == 1){
			getSearchList();
		}else if(t == 2){
			getRiskSearchList();
		}else if(t == 3){
			getIntellectualSearchList();
		}
    }
}
// 去除查询条件 type:区分：公司、知识产权、风险信息
function clearHash(obj, t){
	var o = obj.attr('data-option');

	var hashStr = window.location.hash;
	var optionStr = hashStr.substr(1);

	var optionArr = optionStr.split(splitSymbolEnd);
	var optionArrNew = new Array();
    var hideFlag = true;//默认隐藏
	$.each(optionArr,function(i,itemStr){
		var itemArr = itemStr.split(splitSymbolMid);
		if(o != itemArr[0] && itemArr[0] != ''){
			// 省特殊处理
			if(o == 'province'){
				if(itemArr[0] != 'city'){
					optionArrNew[i] = itemStr;
				}
			}else if(o == 'industrycode'){ // 行业特殊处理
				if(itemArr[0] != 'subindustrycode'){
					optionArrNew[i] = itemStr;
				}
			}else{
				optionArrNew[i] = itemStr;
			}
			//筛选条件特殊处理
			if(itemArr[0] != 'sortField' && itemArr[0] != 'p'){
				hideFlag = false;
			}
		}
	});
    hideFlag ? $('#appendBox').hide() : $('#appendBox').show();
	if(optionArrNew && optionArrNew.length > 0){
		window.location.hash = optionArrNew.join(splitSymbolEnd)+splitSymbolEnd;
	}else{
		$('#has_condition').text('');
		window.location.hash = optionArrNew.join(splitSymbolEnd);
	}
	obj.text('');
	var obj_s = '.' + o + jointClassOne;
	var obj_sn = '.' + o + jointClassTwo;
	$(obj_sn).hide();
	$(obj_s).show();
	if(o == 'province'){
		$('.city'+jointClassOne).hide();
		$('.city'+jointClassTwo).hide();
	}
	if(o == 'industrycode'){
		$('.subindustrycode'+jointClassOne).hide();
		$('.subindustrycode'+jointClassTwo).hide();
	}
	if(o == 'tel' || o == 'email' || o == 'mark' || o == 'patent' || o == 'finance' || o == 'listed'){
		$('#telOld').css('display','block');
	}
	if(t == 1){
		getSearchList();
	}else if(t == 2){
		getRiskSearchList();
	}else if(t == 3){
		getIntellectualSearchList();
	}
}

// 公司、风险信息、知识产权 分页查询
function getSearchPage(page,t){
	var o = 'p';
	handleHash_(o, page);
	if(t == 1){
		getSearchList();
	}else if(t == 2){
		getRiskSearchList();
	}else if(t == 3){
		getIntellectualSearchList();
	}

}

//刷新页面，筛选数据处理
function updateDesc(type){
    var hashStrNew = window.location.hash;
    var optionStrNew = hashStrNew.substr(1);
    var optionArr = optionStrNew.split(splitSymbolEnd);
    var hideFlag = true;//默认隐藏
    if(type == 1){
        var arr = ['index','statusCode','registfund','startDate','province','city','industrycode','subindustrycode','tel','email'];
    }else if(type == 2){
        var arr = ['index','courtYear','province','city'];
    }else if(type == 3){
        var arr = ['index','groupYear'];
    }
    $.each(optionArr,function(i,itemStr){
        var itemArr = itemStr.split(splitSymbolMid);
        if(itemArr[0] != 'sortField' && itemArr[0] != 'p' && itemArr[0] != ''){
            hideFlag = false;
        }
        if($.inArray(itemArr[0],arr) > -1){
            var obj = '.' + itemArr[0] + jointClassOne;
            var objTwo = '.' + itemArr[0] + jointClassTwo;
            //遍历选择项
            $(obj).find('a').each(function(){
                //法人、股东特殊处理
                if(type == 1 && itemArr[0] == 'index' && itemArr[1] == '14' && $(this).attr('data-value') == '4'){
                    itemArr[1] = '4';
                }
                if($(this).attr('data-value') == itemArr[1]){
                    var desc = $(this).attr('data-append');
                    $(objTwo).text(desc);
                    $(objTwo).show();
                    $(obj).hide();
                    return false;
                }
            });
            $('#has_condition').text('已选条件');
        }
    });
    hideFlag ? $('#appendBox').hide() : $('#appendBox').show();
}


function addQuerySort(obj,http) {
	if(obj instanceof jQuery){
		var o = obj.attr('data-option');
		var v = obj.attr('data-value');
	}else{
		var o = arguments[2];
		var v = obj;
	}

	var ovStr = o + splitSymbolMid + v;
	var hashStr = window.location.hash;
	window.location.hash = hashStr + ovStr + splitSymbolEnd;
	getSearchList();
}

// 查询公司
function getSearchList(download){
    var paramStr = window.location.search;
    var paramArr = paramStr.split('=');
    var key = paramArr[1];
    var hashStrNew = window.location.hash;
    var optionStrNew = hashStrNew.substr(1);
    var reg = new RegExp(splitSymbolMid,"g");
    var data = 'key=' + encodeURIComponent(key) + '&ajaxflag=1&' + optionStrNew.replace(reg,'=');
    if(download){
        $.ajax({
            url:INDEX_URL+'/search_getExcelAccess',
            type:'get',
            data:{},
            dataType:'json',
            success:function(result){
                if(result.success){
                    $.ajax({
                        url:INDEX_URL+'/search_getExcel',
                        type:'get',
                        data:data,
                        success:function(result){
                            if(result.success){
                                window.location.href = INDEX_URL+'/user_download?redirect=1';
                            }else{
                                faldia(result.msg);
                            }
                        }
                    });
                }else{
                    faldia('超出当日下载次数限制!');
                }
            }
        });
    }else{
        $.ajax({
            url:'/search_index',
            type:'get',
            data:data,
            dataType:'html',
            success:function(result){
                $('#ajaxlist').html(result);
                hasResult();
                if($('#statuscodeNew').html()){
                 $('#statuscodeOld').html($('#statuscodeNew').html());
                 $('#statuscodeOld').show();
                 }else{
                 $('#statuscodeOld').hide();
                 }
                 if($('#startdateNew').html()){
                 $('#startdateOld').html($('#startdateNew').html());
                 $('#startdateOld').show();
                 }else{
                 $('#startdateOld').hide();
                 }
                 if($('#provinceNew').html()){
                 $('#provinceOld').html($('#provinceNew').html());
                 $('#provinceOld').show();
                 }else{
                 $('#provinceOld').hide();
                 }
                 if($('#industrycodeNew').html()){
                 $('#industrycodeOld').html($('#industrycodeNew').html());
                 $('#industrycodeOld').show();
                 }else{
                 $('#industrycodeOld').hide();
                 }
                updateDesc(1);
                $('html, body').animate({scrollTop:0}, 'normal');
            }
        });
    }

}

// 查询风险信息
function getRiskSearchList(){
	var paramStr = window.location.search;
	var paramArr = paramStr.split('=');
	var key = paramArr[1];
	var hashStrNew = window.location.hash;
	var optionStrNew = hashStrNew.substr(1);
	var reg = new RegExp(splitSymbolMid,"g");
	var data = 'key=' + encodeURIComponent(key) + '&ajaxflag=1&' + optionStrNew.replace(reg,'=');
	$.ajax({
		url:'/search_riskInfo',
		type:'get',
		data:data,
		dataType:'html',
		success:function(result){
			$('#ajaxlist').html(result);
            hasResult();
            if($('#courtyearNew').html()){
                $('#courtyearOld').html($('#courtyearNew').html());
                $('#courtyearOld').show();
            }else{
                $('#courtyearOld').hide();
            }
            if($('#provinceNew').html()){
                $('#provinceOld').html($('#provinceNew').html());
                $('#provinceOld').show();
            }else{
                $('#provinceOld').hide();
            }
            updateDesc(2);
            $('html, body').animate({scrollTop:0}, 'normal');
		}
	});
}

// 查询知识产权
function getIntellectualSearchList(){
	var paramStr = window.location.search;
	var paramArr = paramStr.split('=');
	var key = paramArr[1];
	var hashStrNew = window.location.hash;
	var optionStrNew = hashStrNew.substr(1);
	var reg = new RegExp(splitSymbolMid,"g");
	var data = 'key=' + encodeURIComponent(key) + '&ajaxflag=1&' + optionStrNew.replace(reg,'=');
	$.ajax({
		url:'/search_intellectualInfo',
		type:'get',
		data:data,
		dataType:'html',
		success:function(result){
			$('#ajaxlist').html(result);
            hasResult();
            if($('#courtyearNew').html()){
                $('#courtyearOld').html($('#courtyearNew').html());
                $('#courtyearOld').show();
            }else{
                $('#courtyearOld').hide();
            }
            updateDesc(3);
            $('html, body').animate({scrollTop:0}, 'normal');
		}
	});
}

function jumpPage(maxSize,allowSize,page,gId,type){
    var pageCheck = new RegExp('^[1-9][0-9]{0,}$');
    if(maxSize > allowSize && gId != '43'){
        maxSize = allowSize;
    }
    if(pageCheck.test(page) && parseInt(page)<=maxSize){
        $("input[name='page']").val(page);
        getSearchPage(page,type);
    }else if(!pageCheck.test(page)){
        faldia('请输入正确的页码!');
        return false;
    }else if(parseInt(page) > maxSize){
        faldia('超出页码范围!');
        return false;
    }else{
        return false;
    }
}

function indexHashJump(){
    var url = $('#V3_Index_S').attr('action');
    var key = $('#searchkey').val();
    var type = $("input[name='index']").val();
    if(type == '0'){
        url = url + '?key=' + key;
    }else{
        url = url + '?key=' + key + '#index:' + type + '&';
    }
    window.location.href = url;
}

function hasResult(){
    var count = parseInt($('#countOld').find('.text-danger').first().text());
    if(count == 0){
        $('#SearchBox').hide();
        $('#hideSearchBox').find('span').text('展开');
        $('#hideSearchBox').find('i').removeClass('i-arrow-up4');
        $('#hideSearchBox').find('i').addClass('i-arrow-down4');
    }else{
        $('#SearchBox').show();
        $('#hideSearchBox').find('span').text('收起');
        $('#hideSearchBox').find('i').removeClass('i-arrow-down4');
        $('#hideSearchBox').find('i').addClass('i-arrow-up4');
    }
}


function showDetail2(keyNo){
    $("#company-detail").hide();
    var url = INDEX_URL+"more_findRelationsDetail";
    $.ajax({
        url: url,
        type: 'GET',
        data: {"keyNo": keyNo},
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            var companyDetail = $('#company-detail');
            companyDetail.find('.mao-company-name').text(data.Result.Name);
            companyDetail.find('.mao-company-status').text(data.Result.ShortStatus);
            companyDetail.find('.mao-oper').text(data.Result.OperName || '-');
            companyDetail.find('.mao-ziben').text(data.Result.RegistCapi || '-');
            companyDetail.find('.mao-date').text((data.Result.StartDate || '').substr(0,10));
            companyDetail.find('.mao-company-name').attr("href","firm_"+keyNo+".shtml");
            companyDetail.find('.mao-tupu-link').attr("href","company_relation?keyNo="+keyNo+"&name="+data.Result.Name);
            companyDetail.find('.close').click(function(){
                companyDetail.fadeOut();
            });

            var noData = '<div class="mao-noresult"> <p ><img src="/material/theme/chacha/cms/v2/images/nodata.png"></p>暂无信息</div>';

            //股东
            if(data.Result.Partners && data.Result.Partners.length>0){
                var html = '<ul class="mao-list list-group">';
                for(var i=0; i<data.Result.Partners.length; i++){
                    html += "<li>";
                    if(data.Result.Partners[i].StockType){
                        html += '<span style="background:#fff;color:#333;" class="badge">'+data.Result.Partners[i].StockType+'</span>';
                    }
                    if(data.Result.Partners[i].CompanyId){
                        html += "<a href='firm_"+data.Result.Partners[i].CompanyId+".shtml' target='_blank'>"+data.Result.Partners[i].StockName+"</a>";
                    }else {
                        html += data.Result.Partners[i].StockName;
                    }

                    html += "</li>";

                }
                html+='</ul>'

                companyDetail.find('.gudong-list').html(html);


            }else {
                companyDetail.find('.gudong-list').html(noData);
            }



            //投资
            if(data.Result.touziList && data.Result.touziList.length>0){
                var html = '<ul class="mao-list list-group">';
                for(var i=0; i<data.Result.touziList.length; i++){
                    html += "<li><a href='firm_"+data.Result.touziList[i].KeyNo+".shtml' target='_blank'>"+data.Result.touziList[i].Name+"</a></li>";
                }
                html+='</ul>'
                companyDetail.find('.touzi-list').html(html);


            }else {
                companyDetail.find('.touzi-list').html(noData);
            }

            //成员
            if(data.Result.Employees && data.Result.Employees.length>0){
                var html = '<ul class="mao-list list-group">';
                for(var i=0; i<data.Result.Employees.length; i++){
                    html += "<li>";
                    html += '<span style="background:#fff;color:#333;" class="badge">'+data.Result.Employees[i].Job+'</span>';
                    html += data.Result.Employees[i].Name;
                    html += "</li>";
                }
                html+='</ul>'
                companyDetail.find('.member-list').html(html);


            }else {
                companyDetail.find('.member-list').html(noData);
            }

            $("#company-detail").fadeIn();
            companyDetail.find('.mao-tab-content').slimScroll({
                wheelStep: 1
            });
        },
        error:function(data){
            console.log(data);
        }
    });
}

function showDetail(keyNo){
    $("#company-detail").hide();
    var url = INDEX_URL+"more_findRelationsDetail";
    $.ajax({
        url: url,
        type: 'GET',
        data: {"keyNo": keyNo},
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            if(data.Status!=200){
            	return;
            }
            var companyDetail = $('#company-detail');
            companyDetail.find('.mao-company-name').text(data.Result.Name);
            companyDetail.find('.mao-company-status').text(data.Result.ShortStatus);
            companyDetail.find('.mao-oper').text(data.Result.OperName || '-');
            companyDetail.find('.mao-ziben').text(data.Result.RegistCapi || '-');
            companyDetail.find('.mao-date').text((data.Result.StartDate || '').substr(0,10));
            companyDetail.find('.mao-company-name').attr("href","firm_"+keyNo+".shtml");
            companyDetail.find('.mao-tupu-link').attr("href","company_relation?keyNo="+keyNo+"&name="+data.Result.Name);
            companyDetail.find('.close').click(function(){
                companyDetail.fadeOut();
            });

            var noData = '<div class="mao-noresult"> <p ><img src="/material/theme/chacha/cms/v2/images/nodata.png"></p>暂无信息</div>';

            //股东
            if(data.Result.Partners && data.Result.Partners.length>0){

                var html = '<table class="table table-bordered mao-table">';
                html += "<thead><tr><th>名称</th><th>类型</th></tr></thead>";
                for(var i=0; i<data.Result.Partners.length; i++){
                    html += "<tr>";
                    if(data.Result.Partners[i].CompanyId){
                        html += "<td><a href='/firm_"+data.Result.Partners[i].CompanyId+".shtml' target='_blank'>"+data.Result.Partners[i].StockName+"</a></td>";
                    }else {
                        html += "<td>"+data.Result.Partners[i].StockName+"</td>";
                    }
                    html += "<td>"+data.Result.Partners[i].StockType+"</td>";
                    html += "</tr>";
                }
                html+='</table>'

                companyDetail.find('.gudong-list').html(html);


            }else {
                companyDetail.find('.gudong-list').html(noData);
            }

            //投资
            if(data.Result.touziList && data.Result.touziList.length>0){

                var html = '<table class="table table-bordered mao-table">';
                html += "<thead><tr><th>名称</th></tr></thead>";
                for(var i=0; i<data.Result.touziList.length; i++){
                    html += "<tr>";
                    html += "<td><a href='/firm_"+data.Result.touziList[i].KeyNo+".shtml' target='_blank'>"+data.Result.touziList[i].Name+"</a></td>";
                    html += "</tr>";
                }
                html+='</table>';
                companyDetail.find('.touzi-list').html(html);
            }else {
                companyDetail.find('.touzi-list').html(noData);
            }

            //成员
            if(data.Result.Employees && data.Result.Employees.length>0){
                var html = '<table class="table table-bordered mao-table">';
                html += "<thead><tr><th>名称</th><th>类型</th></tr></thead>";
                for(var i=0; i<data.Result.Employees.length; i++){
                    html += "<tr>";
                    html += "<td>"+data.Result.Employees[i].Name+"</td>";
                    html += "<td>"+data.Result.Employees[i].Job+"</td>";
                    html += "</tr>";
                }
                html+='</table>';
                companyDetail.find('.member-list').html(html);

            }else {
                companyDetail.find('.member-list').html(noData);
            }

            $("#company-detail").fadeIn();
            companyDetail.find('.mao-tab-content').slimScroll({
                wheelStep: 1
            });
        },
        error:function(data){
            console.log(data);
        }
    });
}

function launchFullScreen(element) { 
  if(element.requestFullscreen) { 
    element.requestFullscreen(); 
  }else if(element.mozRequestFullScreen) { 
    element.mozRequestFullScreen(); 
  }else if(element.webkitRequestFullscreen) { 
    element.webkitRequestFullscreen(); 
  } else if(element.msRequestFullscreen) { 
    element.msRequestFullscreen(); 
  } 
}
function exitFullScreen(){
  if(document.exitFullscreen){
    document.exitFullscreen();
  }
  else if(document.mozCancelFullScreen){
    document.mozCancelFullScreen();
  }
  else if(document.msExitFullscreen){
    document.msExitFullscreen();
  }
  else if(document.webkitCancelFullScreen){
    document.webkitCancelFullScreen();
  }
}

function isFullScreen(){
  if(document.fullscreen){
    return true;
  }else if(document.mozFullScreen){
    return true;
  }else if(document.webkitIsFullScreen){
    return true;
  }else if(document.msFullscreenElement){
    return true;
  }else{
    return false;
  }
}

function setFullScreenListener(fullScreenChange){
  document.addEventListener('fullscreenchange', function(){ fullScreenChange() });
  document.addEventListener('webkitfullscreenchange', function(){ fullScreenChange()});
  document.addEventListener('mozfullscreenchange', function(){ fullScreenChange()});
  document.addEventListener('MSFullscreenChange', function(){ fullScreenChange()});
}

function animatieChart(myChart,targetX,targetY){
	targetX = targetX||0;
	targetY = targetY||0;
	var centerX = myChart.getZrender().getWidth()/2;
	var centerY = myChart.getZrender().getHeight()/2;
	var layer = myChart.getZrender().painter._layers[1];
	var animation = myChart.getZrender().animation;
	layer.scale = [0.2,0.2,centerX,centerY];
	layer.rotation = [0,centerX,centerY];
	layer.position = [targetX,targetY];
	myChart.getZrender().render();
	animation.animate(layer).when(400, {
	  scale: [1,1,centerX,centerY]
	}).start('spline').done(function(){
	layer.scale[2] = 0;
	layer.scale[3] = 0;
	}).during(function(){
	  myChart.getZrender().render();
	});
}


// 获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

//截图
function jietuChart(myChart){
    var type = 'png';
    var imgdata = myChart.getConnectedDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
    //将图片保存到本地
    var saveFile = function (data, filename) {
        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }
    var filename = new Date().toLocaleDateString() + '.' + type;
    saveFile(imgdata, filename);
}

function download(canvas,type) {
	type = 'png';
    //设置保存图片的类型
    var imgdata = canvas.toDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
    //将图片保存到本地
    var saveFile = function (data, filename) {
        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }
    var filename = new Date().toLocaleDateString() + '.' + type;
    saveFile(imgdata, filename);
}

var Prefs = {
  Set:function(key,value){
    window.localStorage.setItem(key,JSON.stringify(value)); 
  },
  Get:function(key){
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  }
}

var ICON={
  ICON_OPEN:'data:image/png;base64,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',
  ICON_CLOSE:'data:image/png;base64,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'

}




//搜老板企业自动提示搜索


$(function() {	
	$("#boss-company-list").hide();
	$("#companyname").on('input',function(e){		
	  BoosSearchList(1);
	})
  
	document.onclick=function(e){
		var e=e?e:window.event;
		var tar = e.srcElement||e.target;
		if(tar.id!="companyname"){
			$("#boss-company-list").hide(); 
		}
	}
});  
	
var mTimeout;
function BoosSearchList(type){
		if(type==1||type==3){
			//加这个是为了防刷，输入完0.5秒后再去请求服务器
			if(mTimeout){
				clearTimeout(mTimeout);
			}
			var flag = type;
			mTimeout = setTimeout(function(){
		        var list = $("#boss-company-list");
		        var key = $("#companyname");
				list.hide();
				var f = key.val();
				if(f.length<2) return;
				var type = $("#index").val(); 
					if ($.trim(f) == "") {
						return false
				} else {
					
					$.ajax({ 
						type: 'POST',
						url: INDEX_URL + '/gongsi_getList',
						data: 'key=' + f +' '+ $('#bossname').val() + "&type="+type,
						success: function(a) {
							if (a == "null") {
								//$(".result-msg").html("网络状态异常");
								return false
							} else {
								var b = "";
								var c = "";
								try{
									c = JSON.parse(a);
								}catch(e){
									//console.info(e);
								}
								
								var d = c;
								if (d) {
				                    list.show();
									var b = bossInfoToHTML(d);
				                    list.html(b)

								} else {
				                    list.hide()
								}
							}
						}
					})		 	 
				}
			},350);

		} 
}



/** 搜索结果html**/
function bossInfoToHTML(companys){ 
	var html=''; 
    html=html+"<div class='list-group no-radius alt'>";
	for(var i=0;i<companys.length;i++){
 	    html=html+("<a onclick='bossInfoTianbu(this)'  class='list-group-item '>"+companys[i].Name+"</a>");
	} 
	html=html+"</div>";
	return html; 
}
function bossInfoTianbu(dom){
	$("#boss-company-list").hide();
	$("#companyname").val($(dom).text());
}

var cookie = {
    set:function(key,val,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        date.setTime(date.getTime()+time); //格式化为cookie识别的时间
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
    },
    get:function(key){//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
            var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips=arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    }
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}