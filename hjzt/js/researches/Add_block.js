window.Array.prototype.removeByValue = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) {
			this.splice(i, 1);
			break;
		}
	}
}

//插入块

function AddBlcok(insertObj, positionObj) {
	this.insertObj = insertObj; //要插入的对象

	this.positionObj = positionObj; //插入位置对象，当前的焦点对象

	this.insertBlock = function(sender) {

		var position = $(sender).index();

		

		var newBlock = "<div class='table new_insert_table' style='min-height:50px;width:99%'>双击此处进行编辑或作为插入的区域</div>"
		$('div.import_mask').hide();
		//保证空块在页面中和FILE中的唯一性
		$("div.table").remove();


		if(position == 0) {
			$(positionObj).before(newBlock);
			//记录当前状态为新增块
			$('div.import_mask').attr("isNew", 1);
			$('div.import_mask').attr("mtradm", $(positionObj).prevAll('[mtradm]:first').attr('mtradm'));
			$('div.import_mask').attr("index", $(positionObj).index()-1);
			$(positionObj).prev().unbind('mouseenter').mouseenter(function() {
				toMask(this);
				
				
			})
			$(positionObj).prev().mouseenter();
		} else if(position == 3) {
			$(positionObj).after(newBlock);
			//记录当前状态为新增块
			$('div.import_mask').attr("isNew", 1);
			$('div.import_mask').attr("mtradm", $(positionObj).prevAll('[mtradm]:first').attr('mtradm'));
			$('div.import_mask').attr("index", $(positionObj).index()+1);
			
			$(positionObj).next().unbind('mouseenter').mouseenter(function() {
				toMask(this);

				//file[mtradm].splice([index-1],0,{"editor":1,"attribute":"table","dom":"<div class='table'>"+newBlock+"</div>"})
			})
			$(positionObj).after().mouseenter();
		} else {
			console.log(position)
			alert('未传入正确位置');
			return;
		}

	}

}

function ShowMask(sender) {
	//	console.log(this)
	this.sender = sender;

	this.show = function() {

		var top = $(sender).position().top;

		var height = $(sender).height();

		$('div.import_mask div').css('marginTop', height / 2 - 10);

		$('div.import_mask').css('top', top);

		$('div.import_mask').css('height', height);

		if($(sender).children().length <= 0) {
			$("div.import_mask i").attr("style", "display:none");
			$("div.import_mask .del").attr("style", "display:none");

		} else {

			$("div.import_mask i").removeAttr("style");
			$("div.import_mask .del").removeAttr("style");
		}
		//记录要呈现至编辑器的数据
		$('div.import_mask').attr("data", $(sender).html());
		
		var id_ = $(sender).attr("id");
//		console.log("hpf____"+id_)
		if(id_)
			$('div.import_mask').attr("clickSenderID", id_);
		else
			$('div.import_mask').attr("clickSenderID", "new");
		//$('div.import_mask').attr("clickSenderID","");
		
		//		//拿到唯一标记
		//		$('div.import_mask').attr("mtradm",$(sender).prevAll('h3').attr('mtradm'));
		//		
		//		//拿到当前标记下的索引
		//		$('div.import_mask').attr("index",$(sender).index());

		//找到要进行删除的对象
		$('.import_mask b.del').attr("mtradm", $(sender).prevAll('h1,h2,h3').attr('mtradm'));
		$('.import_mask b.del').attr("index", $(sender).index());

		//		console.log(this)
		//		console.log($(this))
		if($('.edit').is(":hidden")) {
			$('div.import_mask').stop(true, true).show();
		}
		//		else if($(this).children().hasClass('imgcanvas')){
		//			return;
		//		}
		else {
			return;
		}

		$('div.import_mask').unbind('mouseleave').live('mouseleave', function() {

			$(this).hide();

		});
	}

}

//调用示例
$(function() {

	//插入研报
	$("#btninsertYB,#btninsertSH,#btninsertTB").live('click', function() {

		var isnew = $('div.new_insert_table').length;
		//var isAdd = $('div.import_mask').attr("isNew");
		if(isnew<=0)
		{
			alert("请添加新的编辑区域再插入！");
			return;
		}
		//从蒙层中得到要插入的位置
		var mtradm = $('div.import_mask').attr("mtradm")
		var index = $('div.import_mask').attr("index");
		//取出弹出层数据
		var newBlock = $(".middle_middle div.table:first");
		
		if(newBlock.length<=0)
		{
				newBlock = $(".middle_middle div[id]:first")
		}

		//var newBlockHTML = "";
		if($(".contents[style='display: block;'] img.yes_no").hasClass("ok")) {
			
			if($(".contents[style='display: block;'] input[id=picInfoSrc]").length > 0) {

				var fromid = $(".contents[style='display: block;'] input[id=picInfoSrc]").val();
				if(fromid!=null &&fromid.indexOf("data:image/png;base64,")==0)
				{
                    fromid = "kLineChart"; // k线图没有置换picInfoSrc内容
                    
				}
				var img ="";
				var mychart = echarts.getInstanceByDom(document.getElementById(fromid));
				var picIdx = "";
				 var  key = fromid+"_"+stockCode+"_"+$(".contents[style='display: block;'] input[id=picInfoSrc]").attr("idx");
				if(fromid == "kLineChart") // k线图
				{
					// 获得k线图父对象的id
					var domId=$(".contents[style='display: block;'] input[id=picInfoSrc]").parents(".contents").attr("id");
					var tmpObj  = $("#"+domId+" #"+fromid); // 获得k线图的DIV对象
                    key = fromid+"_"+stockCode;
					if(tmpObj!=null && tmpObj.length>0)
					{
						var domOj = tmpObj[0]; // Dom对象转换
						mychart = echarts.getInstanceByDom(domOj);// 获得k线图的ECharts
						var undefined = void(0);
                        // 获得k线图的ECharts是否为undefined
						if(mychart=== undefined )
						{
							alert("无法获得echarts对象")
							return;
						}

					}
					
				}
				if(mychart)
				{
				   img = mychart.getDataURL() ;
                   // 图表option存在的场合
				   if(echartsOptions[key] )
				   {
				   	 	//echartsOptions[fromid+"_"+stockCode] = $.parseJSON(mychart.getOption());
				   }
				   else
				   {
				   	 if(mychart.getOption())
				   	 {
				   	 	var jsonStr = '{"'+key+'":'+JSON.stringify(mychart.getOption())+'}';
                        $.extend(echartsOptions, $.parseJSON(jsonStr) );
				   	 }
						
				   }


				}
				var sender = $(".contents[style='display: block;'] img.yes_no.ok").attr("sender")
				
				$(newBlock).html("<div echartsId='"+fromid+"' stockCode='"+stockCode+"' idx='"+$(".contents[style='display: block;'] input[id=picInfoSrc]").attr("idx")+"' class='imgcanvas' sender='" + sender + "' style='min-height:50px;width:100%'><img class='chartImg' src='" + img + "'/></div>")
				$(newBlock).removeClass("table new_insert_table")
			} else {
				var insertObj = $(".contents[style='display: block;']").find(".ok[name=1]").parents("h3").next(".insertbefordiv");
				var insertClass  = "";
				if(insertObj) // 插入对象
				{
					 insertClass = insertObj.attr("insertClass");
                     if(insertClass == null || insertClass=="undefined")
                     {
                     	 insertClass  = "";
                     }
				}
                // 插入html
				var insertHtml = $(".contents[style='display: block;']").find(".ok[name=1]").parents("h3").next(".insertbefordiv").html();

				
				$(newBlock).html("<div class='text' style='min-height:50px;width:100%'>" + insertHtml + "</div>")
				$(newBlock).removeClass("table new_insert_table");
				//newBlockHTML = "<div><div class='text' style='min-height:50px;width:100%'>" + insertHtml + "</div></div>"
				$('div.import_mask').hide();
				if(insertClass  == "dubang") // 杜邦分析法插入
				{
					if(!isIe())
					{
						
						//insertDubang(mtradm,index,insertObj);
						//return;
					}
					
				}
			}
			EditContent(mtradm,index,$(newBlock).html());

			//关闭弹层
			$(".hyConfirm").hide();
			$(".tb-mask-box").hide();

			//refreshList();
		} else {
			alert("请选择一项插入")
		}
	})
     // 插入杜邦分析法
      insertDubang = function(mtradm, index,insertObj){ 
     	    var imgId = "dbt";
     	    if(insertObj.attr("id")=="Adubang")
     	    {
     	    	imgId = "adbt";
     	    }


     		html2canvas($("#export-content #"+imgId+"div"),{  
					    onrendered: function(canvas) {  
					        var imgURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
					       // $("#export-content #"+imgId).attr("src",imgURL);
					        //$("#export-content #"+imgId).css("display","block");
					        var divObj = $("#export-content #"+imgId+"div")[0]
					        var po = divObj.parentNode;
							if(po)
							{
					        	//po.removeChild(divObj);
					        	// $("#export-content #"+imgId+"div").css("display","none");
              //                   $("#export-content #"+imgId).css("display","block");
					     		//EditContent(mtradm,index,po.innerHTML);
							}
					       
					    } 
				 }); 
				//关闭弹层
				$(".hyConfirm").hide();
				$(".tb-mask-box").hide();
                EditContent(mtradm,index,po.innerHTML);
	
     };
	//图形弹出框更新图片
	$("#btnEditImg").live('click', function() {

		
		//从蒙层中得到要插入的位置
		var mtradm = $('div.import_mask').attr("mtradm")
		var index = $('div.import_mask').attr("index");
		
		var data =  $('div.import_mask').attr("data");
		var dataID = $(data).attr("echartsid") || $(data).find("[echartsid]").attr("echartsid");
		var stockcode = $(data).attr("stockcode") || $(data).find("[stockcode]").attr("stockcode");
		var idx =   $(data).attr("idx")|| $(data).find("[idx]").attr("idx");
		
		//取出弹出层数据
		// var newBlock = $(".middle_middle div.table:first");
		
		// if(newBlock.length<=0)
		// {
		// 		newBlock = $(".middle_middle div[id]:first")
		// }
		
		var fromid = "div_imgbox";

		var img ="";
		if(echarts.getInstanceByDom(document.getElementById(fromid)))
		{
              var mychart = echarts.getInstanceByDom(document.getElementById(fromid));
              if(mychart)
              {
              	  img = mychart.getDataURL() ;

				  // if(echartsOptions[dataID+"_"+stockcode] && mychart.getOption())
				  //  {
				  //  	 	echartsOptions[dataID+"_"+stockcode] = mychart.getOption();
				  //  }
              }

		}
				
		var sender = $(".hyConfirm #ipt_orgimgID").val();
				
		var html = "<div echartsId='"+sender+"' stockCode='"+stockCode+"' class='img' sender='" + sender + "' idx='"+idx+"' style='min-height:50px;width:100%'><img class='chartImg' src='" + img + "'/></div>";
		//$(newBlock).removeClass("table new_insert_table")
				
		EditContent(mtradm,index,html);	
		
		//关闭弹层
		$(".hyConfirm").hide();

		
	})

	//编辑表格
	$('.import_mask').live('dblclick', function() {
		var clickSenderID = $('div.import_mask').attr("clickSenderID");
		var senderObj;
	   
		if(clickSenderID!="new")
		{
			senderObj = $("#"+clickSenderID);
			$('div.import_mask').attr("isNew", 0);
			$('div.import_mask').attr("index", parseInt(clickSenderID.split('_')[1])+1);
		}
		else
		{
			senderObj = $("div.new_insert_table");
			$('div.import_mask').attr("isNew", 1);
			$('div.import_mask').attr("index", $(senderObj).index());
		}
		$('div.import_mask').attr("mtradm", $(senderObj).prevAll('[mtradm]:first').attr('mtradm'));
		
		
		//获取事件源
		var mask = $(this);

		var dom = $(this).attr("data");
		dom = "<div>" + dom + "</div>"
		
		//找到echaart图片来源
		var sender = $(dom).find("[echartsid]").attr("echartsid");

		//找到来源股票代码
		var fromStockCode =  $(dom).find("[stockCode]").attr("stockCode");
 		var idx =  $(dom).find("[stockCode]").attr("idx");
		
		
		//找到父级对象
		var pindex =  $("#"+sender).parents("div.contents").index();
		
		//找到父级对象
		var parDom =  $("#"+sender).parents("div.content");
		//找到父级对应的左侧目录
		var list = $(parDom).prev("div.list");
		//list目录的span
		var postion = $(list).find("span:eq("+pindex+")").attr("name");

		//不可用编辑器编辑的表格
		if(sender) {
			
 			//$("#company-ui span[name=" + postion + "]").click();
 			$(".hyConfirm #ipt_orgimgID").val('');
 			$(".hyConfirm").show();
 			$(".hyConfirm .editImgBox").show();
 			$(".hyConfirm #ipt_orgimgID").val(sender);
 			var mychart = echarts.init(document.getElementById("div_imgbox"));
			//var op = eval('(' + echartsOptions[sender+"_"+fromStockCode] + ')') ;
		    if(mychart)
		    {
		    	mychart.clear();
		    	if(sender=="kLineChart") // K线图
		    	{
		    		mychart.setOption(echartsOptions[sender+"_"+fromStockCode]);
		    	}
		    	else{
		    		mychart.setOption(echartsOptions[sender+"_"+fromStockCode+"_"+idx]);
		    	}
				
				window.addEventListener("resize", function() {
					mychart.resize();
				});
		    }


		} else {

			if($(dom).find("img[id=adbt]").length>0||$(dom).find("img[id=dbt]").length>0)
			{
				alert("杜邦分析法不支持编辑！");
				return;
			}

			if($(dom).find("iframe").length>0)
			{
				alert("上下游关系图表不支持编辑！");
				return;
			}
			$('.edit_mask').show();
			console.log(dom)
			var domObject = $(dom);
            
				UE.getEditor('editor').setContent(domObject.html());
			$('.edit_mask .alert div .cancel').die().live('click', function() {
				$('.edit_mask').hide();
				UE.getEditor('editor').setContent('');
			})
			$('.edit_mask .alert div .confirm').die().live('click', function() {
				$('.edit_mask').hide();
				if(UE.getEditor('editor').getContent().trim() == "") {
					alert("修改内容不能为空！");
					return;
				}
				if(UE.getEditor('editor').getContentTxt().trim() == "双击此处进行编辑或作为插入的区域") {
					return;
				}

				$(domObject).html(UE.getEditor('editor').getContent());

				//$(domObject).html(UE.getEditor('editor').getContent());		
				//从蒙层中得到要插入的位置
				var mtradm = $('div.import_mask').attr("mtradm")
				var index = $('div.import_mask').attr("index");

				//将选择内容插入至研报
				EditContent(mtradm,index,domObject.prop('outerHTML'));
			})
		}
	})
})

function EditContent(mtradm, index,htmlContent ) {
	
	var isnew = $('div.import_mask').attr("isNew");
	//如果在新加目录上添加内容,或者新增块中插入内容
	if(!file[mtradm]) {
		
		var newObj =	{
			"editor": 1,
			"attribute": "table",
			"dom": ""
		}
		newObj.dom = htmlContent;
		var jsonHtml = '{"' + mtradm + '":[]}';
		var newJsonObj = jQuery.parseJSON(jsonHtml);
		
		$.extend(file, newJsonObj);
		file[mtradm].push(newObj);
	}
	else if(isnew=="1"){
		
		file[mtradm].splice(index-1, 0, {
			"editor": 1,
			"attribute": "table",
			//"dom": "<div class=''>" + htmlContent + "</div>"
			"dom": "<div class=''>" + htmlContent + "</div>"
		})
		
	}
	else
	{
		file[mtradm].splice(index-1, 1, {
			"editor": 1,
			"attribute": "table",
			"dom": "<div class=''>" + htmlContent + "</div>"
		})
	}

	refreshList();
}

function toMask(e) {

	//拿到唯一标记
	window.mtradm = $(e).prevAll('h3').attr('mtradm');
	//拿到当前标记下的索引
	window.index = $(e).index();
	//	console.log(e)
	var sender = e;

	var obj = new ShowMask(sender);

	obj.show();

	$("div.import_mask i").unbind("click").click(function() {

		var obj = new AddBlcok($("div.table"), $(sender));
		obj.insertBlock(this);

	})
}

function isIe(){

       if( window.ActiveXObject )
       {
       	return true;
       }
       else
       {
       	 
       	 if (window.navigator.userAgent.indexOf('AppleWebKit') == -1) {
			return true;
		 }
       }
       return false;

}