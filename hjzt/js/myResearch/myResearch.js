var CS={};
var currentPage = 1; //云盘分页变量，当前页码
var pageSize = 15;	//一页多少条数据

CS.MyCloudStorage = {
    PageInit: function () {
        var obj = this;
        obj.UploadFail();
        obj.ShowList();
    },
    //上传
    UploadFail:function(){
    	$("#resourceFile").click(function(){
    		window.alert.uploadConfirm();
    		 $(".sgBtn").bind("click", function () {
    			 uploadCloudResource();
    	     });
    	})
    },
    //列表
    ShowList:function(){      	
    	list();
    	function list(){
    		$.ajax({ 
        		url:'/beta/cloudResource/getResourceList.do',
        		type:'POST',
        		data:{"userId":localStorage.getItem("userId"),"currentPage":currentPage,"pageSize":pageSize},
        		dataType:'json',
        		success: function(data){
        			var html='';
        			console.log(data);
        			if(data.code=='0000'){
        				for(var i=0;i<data.result.content.length;i++){
        					if(data.result.content[i].resourceType=='.doc' || data.result.content[i].resourceType=='.docx'){
            					html+='<tr id="'+data.result.content[i].id+'"><td><b><img src="/saasBeta/images/Image/word.png" width="12px" height="14px"/></b><a href="'+data.result.content[i].resourceUrl+'" target="_blank">'+data.result.content[i].resourceName+'</a></td><td>'+data.result.content[i].uploadDate+'<b style="display:none;" onclick="delete_resource('+data.result.content[i].id+')"></b></td></tr>'
        					}else if(data.result.content[i].resourceType=='.pdf'){
            					html+='<tr id="'+data.result.content[i].id+'"><td><b><img src="/saasBeta/images/Image/pdf.png" width="12px" height="14px"/></b><a href="'+data.result.content[i].resourceUrl+'" target="_blank">'+data.result.content[i].resourceName+'</a></td><td>'+data.result.content[i].uploadDate+'<b style="display:none;" onclick="delete_resource('+data.result.content[i].id+')"></b></td></tr>'
        					}else if(data.result.content[i].resourceType=='.ppt' || data.result.content[i].resourceType=='.pptx'){
            					html+='<tr id="'+data.result.content[i].id+'"><td><b><img src="/saasBeta/images/Image/ppt.png" width="12px" height="14px"/></b><a href="'+data.result.content[i].resourceUrl+'" target="_blank">'+data.result.content[i].resourceName+'</a></td><td>'+data.result.content[i].uploadDate+'<b style="display:none;" onclick="delete_resource('+data.result.content[i].id+')"></b></td></tr>'
        					}else if(data.result.content[i].resourceType=='.png' || data.result.content[i].resourceType=='.jpg'){
            					html+='<tr id="'+data.result.content[i].id+'"><td><b><img src="/saasBeta/images/Image/tupian.png" width="12px" height="14px"/></b><a href="'+data.result.content[i].resourceUrl+'" target="_blank">'+data.result.content[i].resourceName+'</a></td><td>'+data.result.content[i].uploadDate+'<b style="display:none;" onclick="delete_resource('+data.result.content[i].id+')"></b></td></tr>'
        					}else if(data.result.content[i].resourceType=='.xlsx' || data.result.content[i].resourceType=='.xls'){
            					html+='<tr id="'+data.result.content[i].id+'"><td><b><img src="/saasBeta/images/Image/excel.png" width="12px" height="14px"/></b><a href="'+data.result.content[i].resourceUrl+'" target="_blank">'+data.result.content[i].resourceName+'</a></td><td>'+data.result.content[i].uploadDate+'<b style="display:none;" onclick="delete_resource('+data.result.content[i].id+')"></b></td></tr>'
        					}else{
            					html+='<tr id="'+data.result.content[i].id+'"><td><b><img src="/saasBeta/images/Image/txt.png" width="12px" height="14px"/></b><a href="'+data.result.content[i].resourceUrl+'" target="_blank">'+data.result.content[i].resourceName+'</a></td><td>'+data.result.content[i].uploadDate+'<b style="display:none;" onclick="delete_resource('+data.result.content[i].id+')"></b></td></tr>'
        					}
        				}
        				$(".disk-box table").append(html);
        				//鼠标经过tr显示删除图标
        				$(".disk-box tr").on("mouseover",function(){
        					$(this).find("td:eq(1) b").show();
        				}).on("mouseleave",function(){
        					$(this).find("td:eq(1) b").hide();
        				});
        				if(data.result.nextPage<=currentPage){
        					$("#moreCloud").hide();
        				}else if(data.result.content.length==0){
        					$("#moreCloud").hide();
        				}
        				currentPage = data.result.currentPage+1;//设置翻页变量页码
        			}
        		}
        	})
    	}    	
    	$("#moreCloud").on("click",function(){
    		list();		
    	})
    	
    },
    
	//删除
    DelList:function(){
    	
    },
    //

}
$(function(){
   	CS.MyCloudStorage.PageInit();
  })

function uploadCloudResource(){
	var formData = new FormData($("#formFile")[0]);
    var name = encodeURI($(".tit_ipt").val());
	var userId = localStorage.getItem("userId");		
	formData.append("userId",userId);
	//formData.delete("resourceName");
	formData.append("resourceName",name);	
	if($(".tit_ipt").val().length>30){
		var txt=  "资源名称超出限制字数，请保持在30个字符以内！"; 
		var option = {
			title: "警告",
			btn: parseInt("0001",2)
		}		
		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum. confirm, option);
		return false;
	}else if($(".tit_ipt").val()=="" || typeof($(".tit_ipt").val())=="undefined" ){
		var txt=  "请输入标题！";
		var option = {
			title: "警告",
			btn: parseInt("0001",2)
		}
		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum. confirm, option);
		return false;
	}else if($("#file").val()=="" || typeof($("#file").val())=="undefined"){
		var txt=  "请上传文件！";
		var option = {
			title: "警告",
			btn: parseInt("0001",2)
		}
		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum. confirm, option);
		return false;
	}else{
		$.ajax({
			url:'/beta/cloudResource/insertResource.do',
			type:'post',
			data:formData,
			processData:false,
	        contentType:false,
			success: function(data){
				$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"上传资源《"+$(".tit_ipt").val()+"》"},true,function(data){});
				if(data.code=='0000'){
					window.location.reload();
				}
				window.location.reload(); 
			}
		})
	}
}  
  

function delete_resource(id){
	var txt=  "确认删除该资源信息吗？";
	var option = {
		title: "警告",
		btn: parseInt("0011",2),
		onOk: function(){
			$.ajax({
				url:'/beta/cloudResource/removeResource.do',
				type:'post',
				data:{"userId":localStorage.getItem("userId"),"resourceId":id},
				success: function(data){
					$.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"删除云盘资源《"+$("#"+id).find("a").text()+"》"},true,function(data){});
					if(data.code=='0000'){
						$("#"+id).hide();
					} 
				}
			})
		}
	}
	window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum. confirm, option);	
}



//$(function(){
//  // 模块切换
//  $(".dis-left>ul>li").click(
//      function(){
//          $(this).addClass("active").children().addClass("active").parent().siblings().removeClass("active").children().removeClass("active");
//          var name=$(this).attr("name");
//          $("."+name).removeClass('hide').siblings().addClass("hide");
//          if(!$(".dis-chart").hasClass("hide")){
//              $("#dis-chart").removeClass('hide');
//          }else {
//              $("#dis-chart").addClass('hide');
//          }
//
//      }
//  )
//
//
//  var setTotalCount = 301;
//  $('#box').paging({
//      initPageNo: 3, // 初始页码
//      totalPages: 30, //总页数
//      totalCount: '合计' + setTotalCount + '条数据', // 条目总数
//      slideSpeed: 600, // 缓动速度。单位毫秒
//      jump: true, //是否支持跳转
//      callback: function(page) { // 回调函数
//          console.log(page);
//      }
//  })
//
//});
