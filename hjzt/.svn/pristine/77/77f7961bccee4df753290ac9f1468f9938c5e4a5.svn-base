$(function(){
	
	//初始化加载权限种类
	findAllPower();
	
	$("[name='addSonButton']").click(function(){
		if($(this).attr("data-pid") != undefined){
//			alert($(this).attr("data-pid"))
			if($(this).text() == "添加url"){
				$("#url").parent().show();
			}
			openAddDiv($(this).text(),this);
		}else{
			alert("请确定上级模块");
		}
	})
	
	/**
	 * 点击添加弹出框消失
	 */
	$("[name='closedDiv']").on("click",function(){
		$("#url").hide();
		$(".tmtc_new").hide();
		$(".auth_tc").hide();
	});
	
	$("#qd_auth").click(function(){
		if($("#addName").val() == "添加url"){
			addUrl(this);
		}else{
			addPowerType(this);
		}
	})
})

/**
 * 打开添加框
 * @param name
 */
function openAddDiv(name,data){
	$("#addName").text(name);
	$("#qd_auth").attr("data-pid",$(data).attr("data-pid"));
	$(".tmtc_new").show();
	$(".auth_tc").show();
}

/**
 * 初始化加载权限种类
 */
function findAllPower(){
	$.axs("/user/role/findAllPowerType.do",null,false,function(data){
		if(data.retCode=="0000"){
			$("#powerType").empty();
			$(data.retData).each(function(){
				if(this.parentId == 0){
					$("#powerType").append("<li name='levelA' data-id="+this.id+" ><a href='javascript:;'>"+this.powerName+"</a><ul></ul></li>");
				}
			})
			$(data.retData).each(function(){
				var level = this;
				$("[name='levelA']").each(function(){
					if($(this).attr("data-Id") == level.parentId){
						$(this).children().eq(1).append("<li name='levelB' data-id="+level.id+" ><a href='javascript:;' onclick='findUrlByPower("+$(this).attr("data-Id")+","+level.id+")'>"+level.powerName+"</a></li>");
					}
				})
			})
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	$(".tree").treemenu({
		delay : 300
	}).openActive();
}

/**
 * 根据powerTypeID加载详细的数据（带URL）
 * @param id
 */
function findUrlByPower(pid,id){
	$("#addSubset").attr("data-pid",pid);
	$("#addUrl").attr("data-pid",id);
	$.axs("/user/role/findOnePt.do",{ptId:id},false,function(data){
		if(data.retCode=="0000"){
			$("#urlBody").empty();
			$(data.retData.requestList).each(function(){
				$("#urlBody").append("<tr><td>"+this.urlName+"</td><td>"+this.url+"</td><td>"+this.descript+"</td><td><a href='#'>删除</a><a href='#'>查看</a></td></tr>");
			})
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 添加模块
 * @param data
 * @returns
 */
function addPowerType(data){
	if($("#name").val() != ""){
		$.axs("/user/role/insertPowerType.do",{parentId:$(data).attr("data-pid"), powerName:$("#name").val(),descript:$("#descript").val()},false,function(data){
			if(data.retCode=="0000"){
				findAllPower();
				alert("添加成功！");
				$("#name").val("");
				$("#descript").val("");
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		});
	}else{
		alert("名称不可以为空");
	}
}

/**
 * 添加url
 * @param data
 */
function addUrl(data){
	if($("#name").val() != "" && $("#url").val() != ""){
		$.axs("/user/role/addUrlPt.do",{parentId:$(data).attr("data-pid"), urlName:$("#name").val(),url:$("#url").val(),descript:$("#descript").val()},false,function(data){
			if(data.retCode=="0000"){
				findAllPower();
				alert("添加成功！");
				$("#name").val("");
				$("#url").val("");
				$("#descript").val("");
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		});
	}else{
		alert("名称和路径不可以为空");
	}
}
