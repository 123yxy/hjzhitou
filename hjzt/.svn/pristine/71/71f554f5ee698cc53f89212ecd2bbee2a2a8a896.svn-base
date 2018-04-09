/**
 * Created by Ancs on Hover
 * Date: 2017/7/14
 * Time: 13:15
 */

var pubData=[];
var bigAutocompleteDataArray_=[];
var keyValue={};
var cengjiObj={}
//初始化数据
findIndicatorsFourTitle();
//$.ajax({
//    type: "get",
//    url: "new_file.json",
//    async:false,
//    dataType: "json",
//    success: function(dataJson){
//        pubData=dataJson;
//    }
//});
/**
 * 级别查找数据
 * @param {Object} parentId
 */
function selectData(parentId){
	var sql = "";
	if(parentId==""){
		parentId="0";
	}
	sql = "select * from json where ((typeof(pId)!='undefined' && pId=='"+parentId+"')";	
	sql+=") order by cengji ";
	return  jsonsql.query(sql,pubData);
}
//页面联级查询
var LibraryPlugin = {
    //初始化根节点
    //初始化数据容器
    initDataDom : function(dataId,hasShowChild){
    	var dataJson = selectData(dataId);
//        console.log(dataJson);
        LibraryPlugin.createDataDom(dataJson);
    },
    //绘制数据容器
    createDataDom : function(dataJson,hasToSearch){
        var html = '', htmlList = '';
        htmlList = this.initDataList(dataJson,hasToSearch);
        var jiebie=dataJson[0].cengji.length;
        if(jiebie==2){
        html ='<div class="diy_zb_list first">';
        }
        if(jiebie==4){
        html ='<div class="diy_zb_list second">';
        }
        if(jiebie==6){
        html ='<div class="diy_zb_list three">';
        }
        if(jiebie==8){
        html ='<div class="diy_zb_list four">';
        }
		html+='<ul>'+htmlList+'</ul></div>';
		html+='<div class="clr"></div>';
        $('div.diy_zhuti').append(html);
    },
    //初始化数据列表
    initDataList : function(dataJson,hasToSearch){
        var html = '';
        $.each(dataJson,function(index,value){
            //如果为页头查询结果，判断节点是否选中
            //判断节点是否为叶级
            html += '<li dataId="'+value.id+'" moji="'+value.moji+'" name="'+value.showName+'" data-cengji="'+value.cengji+'"  data-keyId="'+value.keyId+'">'+ value.showName+'</li>';
        });
        return html;
    },
    //点击根节点初始化列表容器
    clickRoot : function (dataId) {
        this.destoryDom($('div.center')); //销毁已有列表容器
        this.initDataDom(dataId); //根据新的根节点重新初始化列表
    },
    //点击列表节点初始化下级列表容器
    clickParents : function (dataId,hasShowChild) {
        this.initDataDom(dataId,hasShowChild);
    },
    //页头搜索后，后台取完整数据结构并重绘控件--根据层级结构一层一层递归显示
    searchTop : function (obj) {
    	var cengji=obj.cengji;
    	var cengjilength=0;
    	while(cengjilength<=cengji.length){
    		$("div.diy_zb_list").find("li").each(function(){
    			var liCengji=$(this).attr("data-cengji");
    			if(liCengji==cengji.substring(0,cengjilength)){
    				var htm='<div class="clr"></div>';
    				var dataParent_dom = $(this).parents('div.diy_zb_list');
    		        $(this).parents('div.diy_zb_list').find('li').removeClass('on');
    		        $(this).addClass('on');
    		        dataParent_dom.nextAll().remove(); //清空已存在的其他下级数据容器
    		        //判断是否为叶节点，叶节点不能再次点击
    		        var dataId = $(this).attr('dataId');
    		        var moji = $(this).attr('moji');
    		        if(moji!="true"){
    		            LibraryPlugin.clickParents(dataId,true);
    		            $('div.diy_zhuti').append(htm);
    		        }else{
    		        	//添加已选择的指标
    		        	$(this).click();
    		        	var height=$(this).offsetTop;
    		        	
    		        	$('div.diy_zhuti').append(htm);
    		        }
    		        $('div.diy_zhuti').append(htm);
    		        return false;
    			}
    		});
			cengjilength+=2;
		}
    	$("#aaaaa").val("");
    },
    //销毁DOM
    destoryDom : function (domObj) {
        domObj.html('');
    },
    //初始化页面
    initPage : function(){
    	 LibraryPlugin.initDataDom(0);
        
    }
};

$(document).ready(function(){
    LibraryPlugin.initPage(); //初始化页面
    //页头联想搜索插件
    $("#aaaaa").autocomplete({
		minLength: 2,
		source: bigAutocompleteDataArray_,
		delay: 500,
		autoFocus:true,
		selectFirst :true,
		select: function(event, ui) {
//			var item = ui.item;
//			console.log(ui.item.value);
//			$("#aaaaa").val(ui.item);
			//根据选择搜索的内容重新绘制
			LibraryPlugin.searchTop(keyValue[ui.item.value]);
			$("#aaaaa").val("");
			return false;
		}
	});
    //点击列表节点初始化下级列表容器
    $('body').on('mouseover','div.diy_zb_list li',function (event) {
    	var htm='<div class="clr"></div>';
        if($(this).hasClass('on')){
            return;
        }
        var dataId = $(this).attr('dataId');
        var moji = $(this).attr('moji');
        var isOk = $(this).attr('isOk');
        //判断节点是否开发完成
        if(isOk=="no"){
            alert("敬请期待！");
            return;
        }
        var dataParent_dom = $(this).parents('div.diy_zb_list');
        $(this).parents('div.diy_zb_list').find('li').removeClass('on');
        $(this).addClass('on');
        dataParent_dom.nextAll().remove(); //清空已存在的其他下级数据容器
        //判断是否为叶节点，叶节点不能再次点击
        if(moji!="true"){
            LibraryPlugin.clickParents(dataId,true);
            $('div.diy_zhuti').append(htm);
        }else{
        	
        	$('div.diy_zhuti').append(htm);
        }
        $('div.diy_zhuti').append(htm);
    })
    //指标以及标题单击事件
    $('body').on('click','div.diy_zb_list li',function (event) {
    	if($(this).attr("moji")=="true"){//指标单击
    		$(this).addClass("active").siblings().removeClass("active");
    		if($(".diy_yx_box").find("a").length>=10){
    			errorAlert("","最多选择10个指标");
    			return false;
    		}
    		var thisText=$(this).text();
    		var notExist=true;
    		$(".diy_yx_box").find("a").each(function(index,item){
    			notExist=($(item).attr("title")==thisText?false:true)
    			return notExist;
    		});
    		if(notExist){
    			var showName=$(this).text();
//  			$(this).parent().attr("id","showLi");
//				document.getElementById("showLi").scrollIntoView(false);
  				//console.log($(this).offsetTop)
  				var height2=$(this).offset().top-50;
  				$(this).parent().parent().scrollTop(height2);
    			if($(this).text().length>6){
    				showName=$(this).text().substring(0,6)+"...";
    			}
    			$(".diy_yx_box").append('<a href="javascript:;" title="'+$(this).text()+'" data-keyId="'+$(this).attr("data-keyId")+'">'+showName+'<i></i></a>');
			}
    	}else{//标题单击
    		//已经选择
//    		var existName=new Array();
//    		$(".diy_yx_box").find("a").each(function(index,item){
//    			existName.push($(item).text());
//    		});
//    		var cengji=$(this).attr("data-cengji");
//    		$.each(pubData,function(index,item){
//    			var zhibiaocengjiSub=item.cengji.substring(0,cengji.length);
//    			//判断是最后一级，并且层级关系是标题的层级开头，并且没有选择过
//    			if(item.moji && (cengji==zhibiaocengjiSub) && ($.inArray(item.showName,existName)==-1)){
//    				$(".diy_yx_box").append('<a href="javascript:;" data-keyId="'+item.keyId+'">'+item.showName+'<i></i></a>');
//    				existName.push(item.showName);
//    			}
//    		});
    	}
    });
    //删除已选指标
    $(".diy_yx_box").delegate("i","click",function(){
    	$(this).parent().remove();
    });
});

//自动补全数据
var bigAutocompleteDataFormt={};
/**
 * 查询财务数据指标整理标题后的字典
 */
function findIndicatorsFourTitle(){
	$.axs("/betaInvest/finance/findIndicatorsFourTitle.do",{data:1},false,function(returnValue){
		if(returnValue.retCode=="0000"){
//			pubData=data.retData;
			var aa={};
			//自动补全数据
			var result=returnValue.retData;
			var bigAutocompleteDataArray=[];
			//data：格式{data:[{title:null,result:{}},{title:null,result:{}}]}
			var notShowTitleId=[];
			$(result).each(function(index,item){
				//综合分析，绩效指标去掉
				if(item.showName=="综合分析" || item.showName=="绩效指标" || $.inArray(item.pId,notShowTitleId)>-1 || item.cengji=="0607"){
					notShowTitleId.push(item.id);
					return true;
				}
				pubData.push(item);
				//
				if(item.moji){
					keyValue[item.showName]=item;
					cengjiObj[item.cengji]=item;
					if($.inArray(item.showName,bigAutocompleteDataArray_)<=-1){
						bigAutocompleteDataArray_.push(item.showName);
					}
				}
			});
		}else{
			
		}
	});
}