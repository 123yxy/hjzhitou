
BS.MyCollect = {
    PageInit: function () {
        var obj = this;
            obj.leftQH();
            obj.collectQH();
            obj.personalCenter();
            obj.resetPwd();
            obj.ModerShow();
            obj.MyAlbum();
            obj.hyList();
            obj.mdList();
            obj.saveHyMd();
            obj.industrySelect();
            obj.findUserIndustry();
            obj.userLog();
    },
// 左侧切换
    leftQH:function(){
        $('.per-left li').click(function(){
            $(this).addClass("active").children().addClass("active").parent().siblings().removeClass("active").children().removeClass("active");
            var name=$(this).attr("name");
            $('.'+name).removeClass('hide').siblings().addClass("hide")
        })
    },
    // 我的收藏中切换
    collectQH:function(){
        $('.right-collect li').click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            var name=$(this).attr("name")
            $('#'+name).removeClass('hide').siblings().addClass("hide")
        })
    },
//个人中心展示
    personalCenter:function(){
        // 列表展示
        var id=localStorage.getItem("userId");
        var paraminfo='{"body":{"id":"'+id+'"}}';
        console.log(id)
        $.axsRequest("U5151",paraminfo,false,function(data){
            console.log(data);
            if(data.retCode=="0000"){
                var list=data.retData.data[0];
                console.log(list);
                console.log(list.password);
                if(list.user_name!==null){
                    $(".user-name").html("用户名："+list.user_name);
                }
                if(list.mobile!==null){
                    $(".tel").html("联系电话："+list.mobile);
                }
                if(list.email!==null){
                    $(".email").html("邮箱地址："+list.email);
                }
                if(list.region!==null){
                    $(".dq").html("所在地区："+list.region);
                }
                if(list.position!==null){
                    $(".zw").html("公司职务："+list.position);
                }
                if(list.company!==null){
                    $(".company").html("所在企业："+list.company);
                }
                if(list.wechat_number!==null){
                    $(".wx").html("微信："+list.wechat_number);
                }
                if(list.wb_authorize!==null){
                    $(".wb").html("微博："+list.wb_authorize);
                }
                if(list.qq_authorize!=null){
                    $(".qq").html("QQ:"+list.qq_authorize);
                }

                $(".tel1 input").val(list.mobile);
                $(".user-name1 input").val(list.user_name);
                $(".email1 input").val(list.email);
                $(".dq1 input").val(list.region);
                $(".zw1 input").val(list.position);
                $(".company1 input").val(list.company);
                if(list.thumb!==null){
                    $(".tou").attr("src",list.thumb)
                }
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
        // 编辑按钮点击
        $(".bj-btn").click(function(){
            $(".moren").addClass("hide").siblings(".bianji1").removeClass("hide")
        });
        // 取消按钮点击
        $(".quxiao").click(function(){
            $(".moren").removeClass("hide").siblings(".bianji1").addClass("hide")
        });
        //点击保存按钮
        $(".save").click(function(){
            var userName=$(".user-name1 input").val();
            var Tel=$(".tel1 input").val();
            var Email=$(".email1 input").val();
            var DQ=$(".dq1 input").val();
            var ZW=$(".zw1 input").val();
            var Company=$(".company1 input").val();
            console.log(userName,Tel,Email,DQ,ZW,Company);
            var paraminfo='{"body":{"user_name":"'+userName+'","phone":"'+Tel+'","email":"'+Email+'","region":"'+DQ+'","position":"'+ZW+'","company":"'+Company+'"}}';
            $.axsRequest("U512",paraminfo,false,function(data){
                console.log(data);
                if(data.retCode=="0000"){
                    window.location.href="../../personalCenter/personalCenter.html";
                    console.log(data);
                     $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"编辑资料保存"},true,function(data){});
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //点击修改头像
        $(".reset-tou").click(function(){
            $(".tou-box").css("display","block");
            var str=$(".tou>div:last-child img").attr("src");
            $(".imageBox").css({
                "background":"url("+str+")",
                "background-size":"284px 284px"
            })
            $(".cropped img").attr("src",str)
        })
    },
//修改密码
    resetPwd:function(){
        /**
         * 修改用户信息
         */
        function updateUserMsg(field, value){
            if(field=="password"){//当为密码是md5加密
                value=md5(value);
            }
            var flag = false;
            $.axs("/user/user/updateSignature.do",{field:field, value:value},false,function(data){
                if(data.retCode=='0000'){
        			$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"修改密码"},true,function(data){});
                    if(field == "userName"){
                        $("#nameHead").text(value);
                        localStorage.setItem('userName',value);
                    }
                    flag = true;
                     $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"修改密码"},true,function(data){});
                }else{
                    errorAlert(data.retCode, data.retMsg);
                }
            });
            return flag;
        }

        /**
         * 查询原密码是否正确
         * @param oldPassword
         * @returns {Boolean}
         */
        function isTurePassword(oldPassword){
            var pwdMD5 = md5(oldPassword);
            var flag = false;
            $.axs("/user/user/isTurePassword.do",{old_password:pwdMD5},false,function(data){
                flag = data;
            });
            return flag;
        }

        function isYPassword(newPassword){
            var pwdMD5 = md5(newPassword);
            var flag = false;
            $.axs("/user/user/isYPassword.do",{new_password:pwdMD5},false,function(data){
                flag = data;
            });
            return flag;
        }



        $(".old-pwd").blur(function(){
            if($(".old-pwd").val() != ""){
                if(isTurePassword($(".old-pwd").val())){
                    $(".new-pwd").attr("readonly",false);
                    $('.old-box .false-box').html('')
                    $(".old-box .pwd-true").removeClass("hide2");
                }else{
                    $(".new-pwd").val("").attr("readonly",true);
                    $(".sure-pwd").val("").attr("readonly",true);
                    $("#savePawss").unbind("click");
                    $('.old-box .false-box').html('<b class="pwd-false"></b><span>密码不正确</span>')
                    $(".old-box .pwd-true").addClass("hide2");
                }
            }
        })

        $(".new-pwd").blur(function(){
            if($(".new-pwd").val() != ""){
                console.log($(".new-pwd").val());
            	//$(".new-pwd").val().length >= 6 && $(".new-pwd").val().length <= 16
            		// var reg=/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{5,12}$/;
                 var reg=/^[0-9a-zA-Z_~!@#$%^&*]{6,12}$/
            		//console.log(reg.test($(".new-pwd").val()))
                if(reg.test($(".new-pwd").val())){
                    if(isYPassword($(".new-pwd").val())){
                        $(".sure-pwd").attr("readonly",false);
                        $('.new-box .false-box').html("");
                        $(".new-box .pwd-true").removeClass("hide2");
                    }else{
                        $(".sure-pwd").val("").attr("readonly",true);
                        // $.zmAlert("您输入的密码与原密码相同，请重新输入");
                        $('.new-box .false-box').html('<b class="pwd-false"></b><span>您输入的密码与原密码相同</span>');
                        $(".new-box .pwd-true").addClass("hide2");
                    }
                }else{
                    $(".sure-pwd").val("").attr("readonly",true);
                    // $.zmAlert("密码长度6-16位");
                    $('.new-box .false-box').html('<b class="pwd-false"></b><span>密码格式不正确,全部字母、字符、数字6-12位</span>')
                    $(".new-box .pwd-true").addClass("hide2");
                }
            }else{
                $('.new-box .false-box').html('<b class="pwd-false"></b><span>密码不能为空</span>')
                $(".new-box .pwd-true").addClass("hide2");
            }
        })

        $(".sure-pwd").blur(function(){
            if($(".sure-pwd").val() != ""){
                if($(".new-pwd").val() == $(".sure-pwd").val()){
                    $('.sure-box .false-box').html("");
                    $(".sure-box .pwd-true").removeClass("hide2");
                    $("#savePawss").click(function(){
                        if(updateUserMsg("password",$(".sure-pwd").val())){
                            exitLogin();
                        };
                    })
                }else{
                    $('.sure-box .false-box').html('<b class="pwd-false"></b><span>密码不一致</span>');
                    $(".sure-box .pwd-true").addClass("hide2");
                }
            }else{
                $('.sure-box .false-box').html('<b class="pwd-false"></b><span>密码不能为空</span>');
                $(".sure-box .pwd-true").addClass("hide2");
            }
        })

    },
//根据参数显示相应模块
    ModerShow:function(){
        function getName(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            var context = "";
            if (r != null) {
                context = r[2];
                reg = null;
                r = null;
                return context == null || context == "" || context == "undefined" ? "" : context;}}
        var typeId=decodeURI(getName("typeId"));
        console.log(typeId);
        console.log($("."+typeId));
        $("."+typeId).removeClass("hide").siblings().addClass("hide")
        $("li[data='"+typeId+"']").addClass("active").children("b").addClass("active").parent().siblings().removeClass("active").children("b").removeClass("active")
    },
    
    //获取用户关注信息
    MyAlbum:function(){
    	var userId=localStorage.getItem("userId");
    	//var paraminfo='{"userId":"'+userId+'","currentPage":"1","pageSize":"15"}';
    	/*var url = "/beta/collection/collectionList.do" ;
        $.axsRequestUrl("FT336",{"userId":userId,"currentPage":"1","pageSize":"15"},url,false,function(data){        
        	if(data.code="0000"){
        		if(data.result.retData!=undefined && data.result.retData.infoList.length>0){
        			var html = "";
	        		for(var i=0;i<data.result.retData.infoList.length;i++){
	        			html += "<div class='col-box clearfix' id='company'"+data.result.retData.infoList[i].stockCode+"><ul class='fl'><li><a href='/businessDetails/newTBindex.html?stockCode="+data.result.retData.infoList[i].stockCode+"&stockName="+data.result.retData.infoList[i].stockName+" target='_Blank' >"+data.result.retData.infoList[i].stockName+"（"+data.result.retData.infoList[i].stockCode+"）</a></li>"
			        			+"<li>"+data.result.retData.infoList[i].industry_l1_name+">"+data.result.retData.infoList[i].industry_lt_name+"</li>"+
			        			"<li>"+data.result.retData.infoList[i].mainBusiness+"</li></ul><button class='button_com fr' id='"+data.result.retData.infoList[i].stockCode+"'>取消收藏</button></div>";
	        		}
	        		$("#company").html(html);
        		}
        	}
        });*/
    	
    	$.axs("/betaStock/personInfo/findUserAttention.do",null,false,function(data){
    		if(data.retCode=='0000'){
    			var result=data.retData;
    			if(result==null){
    				return false;
    			}
    			//总数
    			//$("#totalNum").text(result.totalNum);
    			//关注的公司
    			//$("#companyDataNum").text(result.companyDataNum);
    			var companyData=result.companyData;
    			var companyHtml=getCompanyDataHtml(companyData);
    			$("#company").html(companyHtml);
    			/*if(companyData!=null && companyData.length!=0){
    				$(".no_content").hide();
    			}*/
    			//关注的特色推荐
    			//$("#specialDataNum").text(result.specialDataNum);
    			var specialData=result.specialData;
    			var specialHtml=getSpecialDataHtml(specialData);
    			$("#specialData").html(specialHtml);
    			//关注的中介
    			//$("#institutionsDataNum").text(result.institutionsDataNum);
    			var institutionsData=result.institutionsData;
    			var institutionsHtml=getInstitutionsDataHtml(institutionsData);
    			$("#institutionsData").html(institutionsHtml);
    			//关注的投资人
    			//$("#investorDataNum").text(result.investorDataNum);
    			var investorData=result.investorData;
    			var investorHtml=getInvestorDataHtml(investorData);
    			$("#investorData").html(investorHtml);
    		}else{
    			errorAlert(data.retCode, data.retMsg);
    		}
    	});
    	
    	//取消收藏按钮绑定事件
    	$(".button_com").on("click",function(){
    		var code = $(this).attr("id");
    		var param={followId:code,followType:1};
    		var path="/betaStock/redis/deleFollow.do";
    		$.axs(path,param,false,function(data){
    			console.log(data);
//    			var value=localStorage.getItem('follow_'+thizType);
//    			value+=","+followId;
//    			localStorage.setItem('follow_'+thizType,value);
    		});
		    $(this).parent().remove();
    	});
    },
    //行业
    hyList:function(){
    		var paraminfo='{"body":{"type":"A"}}';
		var hy="";
	  	$.axsRequest("FT002",paraminfo,false,function(data){
	  		console.log(1)
	  		console.log(data)
			if(data.retCode == "0000") {
				var data=data.retData.infoList;
				if(data.length==0) return;
				data=data.slice(1,data.length);
				for(i=0;i<data.length;i++){
					hy+="<span class='industry' title='"+data[i].category_name+"' hover-url='"+data[i].icon_url+"' gray-url='"+data[i].gray_icon_url+"' data-id='"+data[i].category_id+"'>"+
							"<img src='"+data[i].gray_icon_url+"'>"+
							"<span class='indust_text' data-id='"+data[i].category_id+"'>"+data[i].category_name+"</span>"+
						"</span>"
				}
				$("#hylist").html(hy);
			}		
		});
    },
    mdList:function(){
    	//目的列表数据
		var md="";
		var paraminfo='{"body":{"type":"42"}}';
	  	$.axsRequest("FT003",paraminfo,false,function(data){
	  		if(data.retCode == "0000") {
				var data=data.retData.infoList;
				if(data.length==0) return;
				for(var j=0;j<data.length;j++){
					md+="<span class='objective' data-id='"+data[j].id+"' data-code='"+data[j].code+"'>"+data[j].name+"</span>"
				}
				$("#mdlist").html(md);
			}		
		});
    },
    //保存行业选择
    saveHyMd:function(){
    	var obj=this;
    		$("#savehymd").on("click",function(){
    			obj.saveIndustry();
//  			obj.saveGoals();
    			
			   var txt= "修改成功了！";
			   var option = {
			    title: "提示",
			    btn: parseInt("0011",2),
			    onOk: function(){
			       console.log("确认啦");
			      }
			   }
			   
	   		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.confirm, option);

    		});
    		
    },
        		//保存行业
		saveIndustry:function(){
			var focusIndustry="";
			$(".industry.img").each(function(index,item){
				focusIndustry+=$(this).find(".indust_text").attr("data-id")+",";	
		 	});
			focusIndustry=focusIndustry.substring(0,focusIndustry.length-1);
			focusIndustry=focusIndustry.split(",");
			if(focusIndustry.length==0){
				return false;
			}
			focusIndustry=focusIndustry.join(",");
			console.log(focusIndustry);
				var focusGoals="";
			$(".objective.color").each(function(index,item){
				focusGoals+=$(this).attr("data-code")+",";	
		 	});
			focusGoals=focusGoals.substring(0,focusGoals.length-1);
			focusGoals=focusGoals.split(",");
			if(focusGoals.length==0){
				return false;
			}
			focusGoals=focusGoals.join(",");
			
			
		     var paraminfo='{"body":{"industries":"'+focusIndustry+'","goals":"'+focusGoals+'"}}';
     	$.axsRequest("FT340",paraminfo,false,function(data){

     		if(data.retCode=="0000"){
			 		console.log("成功")
			 	}else{
			 		errorAlert(data.retCode,data.retMsg);
			 	}
     	});
		},
				//保存目的
//		saveGoals:function(){
//			var focusGoals="";
//			$(".objective.color").each(function(index,item){
//				focusGoals+=$(this).attr("data-code")+",";	
//		 	});
//			focusGoals=focusGoals.substring(0,focusGoals.length-1);
//			focusGoals=focusGoals.split(",");
//			if(focusGoals.length==0){
//				return false;
//			}
//			focusGoals=focusGoals.join(",");
//			var paraminfo = '{"body":{"goals":"'+focusGoals+'"}}';
//			$.axsRequest("FT340", paraminfo, false, function(data) {
//				console.log(data)
//				if(data.retCode == "0000") {
//					console.log("sus")
//				} else {
//				}
//			});
//		},
    industrySelect:function(){
    		$(".industry").click(industry).mouseenter(industryMouseenter).mouseleave(industryMouseleave);
    		$(".objective").click(objective);
    		// 点击选中行业事件
		function industry(){		
			 var $this=$(this);
			 if($this.hasClass("img")){
			 	$this.removeClass("img");
			 	$this.find(".pitch").remove();
			 	$this.find("img").attr("src",$this.attr("gray-url"));
			 }else{
			 	$this.addClass("img");
			 	$this.find("img").attr("src",$this.attr("hover-url"));
			 	$this.append("<img src='../saasBeta/js/industry/images/pitch_on.png' class='pitch'>");
			 }
		}
        function industryMouseenter(){
            var $this=$(this);
            if(!$this.hasClass("img")){
                $this.find("img").attr("src",$this.attr("hover-url"));
			}
        }
        function industryMouseleave(){
            var $this=$(this);
            if(!$this.hasClass("img")){
                $this.find("img").attr("src",$this.attr("gray-url"));
			}
        }
        // 点击选中目的事件
		function objective(){		 
			 $this=$(this);
			 if($this.hasClass("color")){
		        $this.removeClass("color");
		        $this.find("img").remove();
		    }else{
		        $this.addClass("color");
		        $this.append("<img src='../saasBeta/js/industry/images/pitch_on.png'>")
		    } 		
		}
   },
   //查询用户信息,获取用户关注的行业
	findUserIndustry:function(){
//		$.axs("/betaStock/btUserIndustry/findBtUserIndustry.do", null, false, function(data) {
//			console.log(111)
//			console.log(data);
//			if(data.retCode == "0000") {
//				var result = data.retData;
//				var industriesname="";
//				if(result.industries != null && result.industries != "" && result.industries != undefined){
//					var industries=result.industries;
//					var industriesArray=industries.split(",");
//					var goals=result.goals;
//					var goalsArray=goals.split(",");
//					console.log(industriesArray)
//					if(industriesArray.length==0) return;
//					for (var i = 0; i < industriesArray.length; i++) {
//						console.log(industriesArray[i])
//						console.log($(".industry[data-id="+industriesArray[i]+"]"))
//						$(".industry[data-id="+industriesArray[i]+"]").addClass("img");
//					 	$(".industry[data-id="+industriesArray[i]+"]").find("img").attr("src",$(".industry[data-id="+industriesArray[i]+"]").attr("hover-url"));
//					 	$(".industry[data-id="+industriesArray[i]+"]").append("<img src='../saasBeta/js/industry/images/pitch_on.png' class='pitch'>");
//					}
//					if(goalsArray.length==0) return;
//					for (var i = 0; i < goalsArray.length; i++) {
//						$(".objective[data-code="+goalsArray[i]+"]").addClass("color");
//		        			$(".objective[data-code="+goalsArray[i]+"]").append("<img src='../saasBeta/js/industry/images/pitch_on.png'>");
//					}
//				}
//			}
//		})

    var paraminfo='{"body":{}}';
   	$.axsRequest("FT346",paraminfo,false,function(data){

     		if(data.retCode=="0000"){
			 		console.log(data)
			 		var result = data.retData;
			 		
			 			var industriesname="";
				if(result.industries != null && result.industries != "" && result.industries != undefined){
					var industries=result.industries;
					var industriesArray=industries.split(",");
					var goals=result.goals;
					var goalsArray=goals.split(",");
					console.log(industriesArray)
					if(industriesArray.length==0) return;
					for (var i = 0; i < industriesArray.length; i++) {
						console.log(industriesArray[i])
						console.log($(".industry[data-id="+industriesArray[i]+"]"))
						$(".industry[data-id="+industriesArray[i]+"]").addClass("img");
					 	$(".industry[data-id="+industriesArray[i]+"]").find("img").attr("src",$(".industry[data-id="+industriesArray[i]+"]").attr("hover-url"));
					 	$(".industry[data-id="+industriesArray[i]+"]").append("<img src='../saasBeta/js/industry/images/pitch_on.png' class='pitch'>");
					}
					if(goalsArray.length==0) return;
					for (var i = 0; i < goalsArray.length; i++) {
						$(".objective[data-code="+goalsArray[i]+"]").addClass("color");
		        			$(".objective[data-code="+goalsArray[i]+"]").append("<img src='../saasBeta/js/industry/images/pitch_on.png'>");
					}
				}
			 		
			 		
			 		
			 	}else{
			 		errorAlert(data.retCode,data.retMsg);
			 	}
     	});




	},
	userLog:function(){
		var currentPage = 1;
		var pageSize = 10 ;
		list_more();
		function list_more(){
			$.PostJsonData("/beta/log/findLogList.do",{"userId":localStorage.getItem("userId"),"currentPage":currentPage,"pageSize":pageSize},false,function(data){
				if(data.code=="0000"){
					console.log(data);
					var html = "";
					for(var i=0;i<data.result.content.length;i++){
						html+='<div class="blog-box clear"><span class="fl">'+data.result.content[i].modelName+'</span><span class="fr">'+data.result.content[i].dateTime+'</span></div>';
					}
					$("#myLog").append(html);
					if(data.result.nextPage<=currentPage){
						$("#userLog").hide();
					}else if(data.result.content.length==0){
						$("#userLog").hide();
					}
					currentPage = data.result.currentPage+1;
				}				
			});
		}
		$("#userLog").on("click",function(){
			list_more();		
    	})
	}
}


function list_more(){
	
}

//关注公司数据
function getCompanyDataHtml(list){
	var htm='';
	var code='yyyyy';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		//console.log(code.indexOf(obj.stockCode));
		if(code.indexOf(obj.stockCode)<=0){
			htm += "<div class='col-box clearfix' id='company'"+obj.stockCode+"><ul class='fl'><li><a href='/businessDetails/newTBindex.html?stockCode="+obj.stockCode+"&stockName="+obj.stockname+" target='_Blank' >"+obj.stockname+"（"+obj.stockCode+"）</a></li>"
			+"<li>"+(obj.firstName==null?"--":obj.firstName)+">"+(obj.secendName==null?"--":obj.secendName)+"</li>"+
			"<li>"+obj.mainBusiness+"</li></ul><button class='button_com fr'id='"+obj.stockCode+"'>取消收藏</button></div>";
			code+=obj.stockCode;
		}
		
		/*htm+='<li>';
		htm+='<div class="fl c_logo">';
		htm+='<a href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">';
		htm+='</a>';
		htm+='</div>';
		htm+='<div class="fl company_content">';
		htm+='<a href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">'+(obj.stockname==null?"--":obj.stockname)+'('+obj.stockCode+')</a>';
		htm+='<span><em>'+(obj.firstName==null?"--":obj.firstName)+'>'+(obj.secendName==null?"--":obj.secendName)+'</em><i>'+(obj.areaName==null?"--":obj.areaName)+'</i></span>';
		htm+='<p>'+(obj.mainBusiness==null?"--":obj.mainBusiness)+'</p>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on" onclick="updateFollow(this,\'company\')" data-followId="'+obj.stockCode+'"><i class="guanzhu_xingx"></i>取消收藏</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';*/
	}
	return htm;
}
//特色推荐
function getSpecialDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		htm+='<li>';
		htm+='<div class="fl c_logo">';
		htm+='<a href="/security/albumBetails.html?id='+obj.id+'">';
		htm+='<img src="'+obj.picUrl+'" alt="" />';
		htm+='</a>';
		htm+='</div>';
		htm+='<div class="fl company_profile">';
		htm+='<a href="/security/albumBetails.html?id='+obj.id+'">'+obj.name+'投资事件（'+obj.eventNum+'）</a>';
		htm+='<span>'+obj.intro+'</span>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on"  onclick="updateFollow(this,\'speciality\')" data-followId="'+obj.id+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}
//中介机构
function getInstitutionsDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		//console.log(obj);
		htm+='<li>';
		htm+='<div class="fl zj_logo">';
		htm+='<span>';
		htm+='<img src="/www/images/gs_2.png" alt="" />';
		htm+='</span>';
		htm+='<div class="fl jigou_types">';
		var organizationName=(obj.organizationName==null?"--":obj.organizationName);
		if(organizationName.length>5){
			organizationName=organizationName.substring(0,5)+"...";
		}
		htm+='<a href="javascript:void(0)" title="'+obj.organizationName+'">'+organizationName+'</a>';
		var typeName="--";
		var type=""+(obj.type==null?"--":obj.type)+"";
		//1:主办券商,2:律师事务所,3:会计师事务所,4:资产评估公司,5:证券登记结算机构,6:拟挂牌场所
		if(type=="1"){
			typeName="主办券商";
		}else if(type=="2"){
			typeName="律师事务所";
		}else if(type=="3"){
			typeName="会计师事务所";
		}else if(type=="4"){
			typeName="资产评估公司";
		}else if(type=="5"){
			typeName="证券登记结算机构";
		}
		htm+='<span>'+(obj.address==null?"--":obj.address)+'>'+typeName+'</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='<div class="fl zj_gpshu">';
		htm+='<span>推荐挂牌公司数</span>';
		htm+='<em class="shuzi">'+obj.inListNum+'</em>';
		htm+='</div>';
		htm+='<div class="fl zj_faxing">';
		htm+='<span>推荐定向发行情况</span>';
		htm+='<div class="cishu">';
		htm+='<span>成功：<em>'+(obj.dzNum==null?0:obj.dzNum)+'</em>次</span>';
		htm+='<span>失败：<em>0</em>次</span>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='</div>';
		htm+='<div class="fl c_service">';
		htm+='<span>最新服务的公司</span>';
		htm+='<div class="t_service">';
		htm+='<em>'+obj.maxTime+'</em>';
		htm+='<span style = "cursor:pointer" href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">'+obj.stockName+'('+obj.stockCode+')</span>';
		htm+='<i>'+obj.newDateType+'</i>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on"  onclick="updateFollow(this,\'intermediary\')" data-followId="'+obj.organizationNameSort+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}
//投资人
function getInvestorDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		htm+='<li>';
		htm+='<div class="fl p_investor">';
		htm+='<span>';
		htm+='<img src="/www/images/tzr_icon.png" alt="" />';
		htm+='</span>';
		htm+='<div class="fl intrduce">';
		htm+='<span>'+obj.investorName+'</span>';
//		htm+='<p>共青城海棠投资管理合伙企业（有限合伙）成立于2016年5月20日，统一社会信用代码为932115524455554</p>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='<div class="fl total">';
		htm+='<span>投资事件总数</span>';
		htm+='<i class="shuzi">'+obj.investorNum+'</i>';
		htm+='</div>';
		htm+='<div class="fl total">';
		htm+='<span>投资总金额</span>';
		if(obj.investSumTotal==""||obj.investSumTotal==null||obj.investSumTotal==undefined){
			obj.investSumTotal="--";
		}else{
			obj.investSumTotal=(obj.investSumTotal).toFixed(2);
		}
		htm+='<i class="shuzi">'+obj.investSumTotal+'万</i>';
		htm+='</div>';
		htm+='<div class="fl tz_shijian">';
		htm+='<span>最新投资事件</span>';
		htm+='<div class="com_infor" style="text-align:center">';
		htm+='<i>'+obj.noticeDate+'</i>';
		htm+='<span style = "cursor:pointer" href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">'+obj.stockName+'（'+obj.stockCode+'）</span>';
		if(obj.investSum==""||obj.investSum==null||obj.investSum==undefined){
			obj.investSum="--";
		}else{
			obj.investSum=(obj.investSum).toFixed(2);
		}
		htm+='<em>'+obj.investSum+'万</em>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on"  onclick="updateFollow(this,\'investor\')" data-followId="'+obj.investorName+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}
$(function(){
    BS.MyCollect.PageInit();
})



