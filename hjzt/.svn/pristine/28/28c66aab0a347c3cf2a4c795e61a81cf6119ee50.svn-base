//我的云盘
$(function(){
	//初始化数据
	findMyCloud();
	//全选
	$("#selectAll").change(function(){ 
		var innum = $(".choo").length;
		if($(this).prop("checked")){ 
			$(".choo").prop("checked", true); 
		}else{
			$(".choo").prop("checked", false);
		} 
		check();
	});
	$(".choo").live("click",function(){
		check();	
	});
	//点击文件夹
	$(".folder").live("click",function(){
		if($(this).find("input").is(":hidden")){
			var id=$(this).attr("data-id");
			$("#cloudFolderId").val(id);
			findMyCloud();
		}
	});
	//单击新建文件夹按钮
	$("#newfaile").on("click",function(){
		var newfaile = '<tr>';
			newfaile += '<td class="quanxuan"><input type="checkbox" class="choo" name="choo"/></td>';
			newfaile += '<td class="textleft"><span class="folder"><input type="text" value="新建文件夹"/></span><a href="javascript:;" onclick="queding(this)" ><img src="/saasBeta/images/duigou.png" alt="保存" /></a><a href="javascript:;" onclick="quxiao(this)"><img src="/saasBeta/images/cha.png" alt="取消" /></a></td>';
			newfaile += '<td>-</td>';
			newfaile += '<td>2015-06-06</td>';
			newfaile += '</tr>';
			$("#new_list_box").prepend(newfaile);
	});
});
/**
 *  查询云盘
 *  @param folderId 当前文件夹id，根目录为0
 */
function findMyCloud(){
	$("#new_list_box").html('');
	var parentId=$("#cloudFolderId").val();
	if(parentId==null || parentId=="" || parentId=="undefined"){
		parentId=0;
	}
	$.axs("/cloud/cloud/findMyCloud.do",{floderId:parentId}, false,function(data){
        //console.log(data.retData);
        if(data.retCode!="0000"){
        	errorAlert(data.retCode, data.retMsg);
        	return false;
        }
        var result=data.retData;
        //总空间
        var cloudSpace=result.cloudSpace;
        //文件空间
        var cloudFileSpace=result.cloudFileSpace;
        //文件夹列表
        var floderList=result.floder;
        if(floderList!=null && floderList.length>0){
        	for(var i=0;i<floderList.length;i++){
        		var floder=floderList[i];
        		var html='';
        		var newfaile ='<tr>';
    			newfaile += '<td class="quanxuan"><input type="checkbox" class="choo" name="choo" /></td>';
    			newfaile += '<td class="textleft"><span class="folder" data-id="'+floder.id+'">'+floder.folderName+'<input type="text" value="'+floder.folderName+'" style="display:none"/></span><a href="javascript:;" onclick="queding(this)" style="display:none"><img src="/saasBeta/images/duigou.png" alt="保存" /></a><a href="javascript:;" onclick="quxiao(this)" style="display:none"><img src="/saasBeta/images/cha.png" alt="取消" /></a></td>';
    			newfaile += '<td>-</td>';
    			newfaile += '<td>'+floder.createTime+'</td>';
    			newfaile += '</tr>';
    			$("#new_list_box").prepend(newfaile);
    			//当前文件夹id
    			$("#cloudFolderId").val(floder.parentId);
        	}
        }
        //文件列表
        var fileList=result.file;
        if(fileList!=null && fileList.length>0){
        	for(var i=0;i<fileList.length;i++){
        		var file=fileList[i];
        		var fileHtml='';
        		fileHtml+='<tr>';
        		fileHtml+='<td class="quanxuan">';
        		fileHtml+='<input class="choo" name="choo" type="checkbox">';
        		fileHtml+='</td>';
        		fileHtml+='<td class="textleft">';
        		fileHtml+='<span class="word">'+file.fileName+'</span>';
        		fileHtml+='</td>';
        		var size=file.fileSize;
        		if(size>1024*1024){
        			size=(size/1024/1024).toFiex(2);
        			fileHtml+='<td>'+size+'Gb</td>';
        		}else if(size>1024){
        			size=(size/1024).toFiex(2);
        			fileHtml+='<td>'+size+'Mb</td>';
        		}else{
        			fileHtml+='<td>'+size+'Kb</td>';
        		}
        		fileHtml+='<td>'+file.uploadTime+'</td>';
        		fileHtml+='</tr>';
        		$("#new_list_box").append(fileHtml);
        	}
        }
        if(parentId==0){
        	var cloudCommonHtml='';
        		cloudCommonHtml+='<tr>';
        		cloudCommonHtml+='<td class="quanxuan">';
        		cloudCommonHtml+='<input class="choo" name="choo" type="checkbox">';
        		cloudCommonHtml+='</td>';
        		cloudCommonHtml+='<td class="textleft">';
        		cloudCommonHtml+='<span class="word">《汇金智投》帮助手册</span>';
        		cloudCommonHtml+='</td>';
        		cloudCommonHtml+='<td>0Kb</td>';
        		cloudCommonHtml+='<td>2015-06-06</td>';
        		cloudCommonHtml+='</tr>';
        	$("#new_list_box").append(cloudCommonHtml);
        }
       
    });
}

/**
 * 新增文件夹
 * @param folderName 文件夹名称
 */
function addCloudFolder(folderName){
	var createFolder=false;
	var parentId=$("#cloudFolderId").val();
	if(parentId==null || parentId=="" || parentId=="undefined"){
		parentId=0;
	}
	var paramData={parentId:parentId,folderName:folderName};
	$.axs("/cloud/cloud/addAndEditCloudFolder.do",paramData, false,function(data){
		//console.log(data.retData);
		if(data.retCode!="0000"){
        	errorAlert(data.retCode, data.retMsg);
        	return false;
        }
		createFolder=true;
    });
	return createFolder;
}
/**
 * 新增文件
 */
function addCloudFile(){
	var files=$("#uploadFile").get(0).files
	var filesName=files[0].name;
	console.log(files);
	console.log(filesName);
	$("#fileName").val(filesName);
//	var hideForm =$("<form id='fileForm'></form>");
//	hideForm.appendTo("body")
//    hideForm.css('display','none')
//	hideForm.attr("action","/cloud/cloud/addCloudFile.do");
//	hideForm.attr("method","post");
//	hideForm.attr("enctype","multipart/form-data");
//	$("#uploadFile").attr("name","file")
//	hideForm.append($("#uploadFile"))
//	hideForm.append($("#cloudFolderId"))
//	hideForm.append($("#fileName"))
//	================Jquery.form插件文件上传=====================
	var options = {
            dataType: 'json',
            cache: false,
            success: function (data) {
            	console.log(data);
            	if(data.retCode!="0000"){
            		errorAlert(data.retCode, data.retMsg);
                	return false;
            	}
            	var file=data.retData;
            	var fileHtml='';
        		fileHtml+='<tr>';
        		fileHtml+='<td class="quanxuan">';
        		fileHtml+='<input class="choo" name="choo" type="checkbox">';
        		fileHtml+='</td>';
        		fileHtml+='<td class="textleft">';
        		fileHtml+='<span class="word">'+file.fileName+'</span>';
        		fileHtml+='</td>';
        		var size=file.fileSize;
        		if(size>1024*1024){
        			size=(size/1024/1024).toFiex(2);
        			fileHtml+='<td>'+size+'Gb</td>';
        		}else if(size>1024){
        			size=(size/1024).toFiex(2);
        			fileHtml+='<td>'+size+'Mb</td>';
        		}else{
        			fileHtml+='<td>'+size+'Kb</td>';
        		}
        		fileHtml+='<td>'+file.uploadTime+'</td>';
        		fileHtml+='</tr>';
        		$("#new_list_box").append(fileHtml);
        		$("#cloudFolderId").next().children().html('');
            	$("#cloudFolderId").next().children().html('<input type="file" name="file" id="uploadFile" onchange="addCloudFile()"/>上传 ');
            },
            uploadProgress: function(event, position, total, percentComplete) {
            	//console.log("position:"+position+",total:"+total+",percentComplete:"+percentComplete);
            	  //进度条
            	  //$('#uploadFileProgress_' + index).css('width',percentComplete + '%');
            	  //大小
            	  //$('#uploadFileSize_' + index).html('(' +percentComplete + '%,'  + (total/1024).toFixed(0) + 'k)');
            },
            error : function(result) {  
               /* var data = jQuery.parseJSON(result.result);  
                var message = data.message;  
                $file.remove();  
                alert(message);  */
            }  
        };
	$("#uploadForm").ajaxSubmit(options);
//	hideForm.ajaxSubmit(options);
}

//确认添加文件夹并命名
function queding(qthis){
    var inval = $(qthis).siblings().children("input").val();
    //创建文件夹
	var createFolder=addCloudFolder(inval);
	if(createFolder){
		//页面显示创建成功效果
		$(qthis).siblings("span").children("input").hide();
		$(qthis).siblings("span").prepend(inval);
		$(qthis).hide();
		$(qthis).nextAll().hide();
	}
}	
//取消添加文件夹并命名
function quxiao(qthis){
	$(qthis).parents("tr").remove();
}

/**
 * 单选或者多选同时显示可操作项
 */
function check(){
	var choo=document.getElementsByName("choo");
	var checsize =0 ;
	for(var i=0;i<choo.length;i++){
		if(choo[i].checked){
			checsize++;
		}
	}if(checsize>0){
		if(checsize==1){
		 $(".cz_btn").show();
		 $("#rename").show();	
		}else{
		$(".cz_btn").show();
		$("#rename").hide();		
		}
	       	
	}else{
	   $(".cz_btn").hide();	
	   $("#rename").hide();	
	}
}