//获取查询参数
var stockName=getUrlParam("stockName");//获取参数的名称
var stockCode=getUrlParam("stockCode");//获取参数代码

$(function() {
	
	$("#stockNameShow").text(stockName);
	$("#gqgx_echars").show();
	$("#sxy_echars").hide();
	$("#showSockNameGuanxi").text(stockName+"--关系图");
	$("#youbiangengduoshuju").hide();//加载更多默认隐藏
	//查询股权关系
	findStockEquityTies();
	//上下游关系
//	findResourceRelation();
	
//	股权关系tab切换交互
	$(".gqgx_tab ul li").on("click",function(){
		$(".gqgx_tab ul li").removeClass("on");
		$(this).addClass("on");
		var index=$(this).index();
		$("#graph_panel").remove();
		$(".gqgx_ddbox").append('<div id="graph_panel" class="q-panel">'+
		         '<div role="toolbar" class="q-toolbar">'+
		        '<div>'+
	            '<div id="toolbar">'+
		        '<span style="cursor: pointer;display: none;" id="youbiangengduoshuju">加载更多</span>'+
		        '<em style="cursor: pointer;">&nbsp;</em>'+
		        '<i style="cursor: pointer;">&nbsp;</i>'+
		        '<a href="javascript:void(0);" style="cursor: pointer;">全屏</a>'+
		        '</div>'+
		        '<div class="tuli">'+
        		'<label  class="zygys"><i></i>主要供应商</label>'+
        		'<label  class="gongsi"><i></i>公司</label>'+
        		'<label  class="zykh"><i></i>主要客户</label>'+
            	'</div>'+
	        '</div>'+
	    '</div>'+
		    '<div class="q-content">'+
		        '<div  id="canvas"/>'+
		    '</div>'+
		'</div><div class="clr"></div>');
//		$(".gqgx_ddbox").append('<div  id="canvas"/>');
		if(index==0){
//			$("#youbiangengduoshuju").show();
//			$("#gqgx_echars").show();
//			$("#sxy_echars").hide();
			$(".zygys").html("<i></i>十大股东");
			$(".zykh").html("<i></i>参控股公司");
			findStockEquityTies();
		}else{
//			$("#gqgx_echars").hide();
//			$("#sxy_echars").show();
//			$("#youbiangengduoshuju").hide();
			$(".zygys").html("<i></i>主要供应商");
			$(".zykh").html("<i></i>主要客户");
			findResourceRelation();
		}
	});
	
	$(".border_bottom").delegate("span ","click",function(){
		var index=$(".gqgx_tab").find("li.on").index();
		var rightPageNum_1=$("#youbiangengduoshuju").attr("data-rightPageNum");
		if(rightPageNum_1==null || rightPageNum_1=="" || rightPageNum_1==undefined){
			rightPageNum_1=1;
		}
		var rightPageSize_1=$("#youbiangengduoshuju").attr("data-rightPageSize");
		if(rightPageSize_1==null || rightPageSize_1=="" || rightPageSize_1==undefined){
			rightPageSize_1=10;
		}
		$("#graph_panel").remove();
		$(".gqgx_ddbox").append('<div id="graph_panel" class="q-panel">'+
		        '<div role="toolbar" class="q-toolbar">'+
		        '<div>'+
		        '<div id="toolbar">'+
		        '<span style="cursor: pointer;display: none;" id="youbiangengduoshuju">加载更多</span>'+
		        '<em style="cursor: pointer;">&nbsp;</em>'+
		        '<i style="cursor: pointer;">&nbsp;</i>'+
		        '<a href="javascript:void(0);" style="cursor: pointer;">全屏</a>'+
		        '</div>'+
		        '<div class="tuli">'+
        		'<label  class="zygys"><i></i>十大股东</label>'+
        		'<label  class="gongsi"><i></i>公司</label>'+
        		'<label  class="zykh"><i></i>参控股公司</label>'+
            	'</div>'+
		        '</div>'+
		    '</div>'+
		    '<div class="q-content">'+
		        '<div  id="canvas"/>'+
		    '</div>'+
		'</div><div class="clr"></div>');
//		console.log(Number(rightPageSize_1)+10);
		findStockEquityTies(rightPageNum_1,Number(rightPageSize_1)+10);
	});
})

function findResourceRelation(){
	var param={stockCode:stockCode};
	$.axs("/betaStock/equityTies/findResourceRelation.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null||result==""||result==undefined){
				return false;
			}
			var customer=result.customer;//主要客户
			var suppliers=result.suppliers;//主要供应商
			//上下游关系换图--球球图
//			shangxiayouD3(customer,suppliers);
			//无数据显示的东西
			if((customer==null || customer.length==0) && (suppliers==null || suppliers.length==0)){
//				$("#graph_panel").attr("style","height:100px;");
				$("#graph_panel").html('<div class="zanwu_shuju" style="width:125px; margin:0 auto;"><span></span><p>未收录相关信息</p></div>');
				return false;
			}
			//上下游关系新图
			var datas=new Array();
//			{name: '天阳科技(835713)'}
			var centerTitle={};
			centerTitle.name=stockName+"("+stockCode+")";
			datas.push(centerTitle);
			//主要客户
			for (var i = 0; i < suppliers.length; i++) {
//				console.log(customer[i]);
				var obj={};
				//obj.investor+"(持股:"+obj.proportion+"%)";
				obj.name=suppliers[i].name;
				obj.edgeText="金额比例:"+suppliers[i].percentagePurchase+"%";
				obj.cusType="mx";
				datas.push(obj);
			}
			//=============数据分隔符============
			//主要供应商
			for (var i = 0; i < customer.length; i++) {
//				console.log(suppliers[i]);
				var obj={};
				//"(参控股:"+obj.shareholdingRatio+"%)"+obj.subCompanyName;
				obj.name=customer[i].customerName;
				obj.edgeText="金额比例:"+customer[i].operatingIncome+"%";
				obj.cusType="mg";
				datas.push(obj);
			}
			createBootStrapChart(datas);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 查询股权关系
 */
var nodes=[];
var links=[];
function findStockEquityTies(rightPageNum,rightPageSize){
	if(rightPageNum==null || rightPageNum=="" || rightPageNum==undefined){
		rightPageNum=1;
	}
	//设置右边分组数据永远为第一条数据开始，控制数据长度来显示数据
	rightPageNum=1;
	if(rightPageSize==null || rightPageSize=="" || rightPageSize==undefined){
		rightPageSize=10;
	}
	$("#youbiangengduoshuju").attr("data-rightPageNum",rightPageNum);
	$("#youbiangengduoshuju").attr("data-rightPageSize",rightPageSize);
	var param={stockCode:stockCode,rightPageNum:rightPageNum,rightPageSize:rightPageSize};
	$.axs("/betaStock/equityTies/findStockEquityTies.do",param,false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null||result==""||result==undefined){
				return false;
			}
			//console.log(result)
			var invest=result.invest;//投资方
			var participation=result.participation;//参股控股
			//股权关系换图--球球图
//			guquanguanxiD3(invest,participation);
			//无数据显示的东西
			if((invest==null || invest.length==0) && (participation==null || participation.length==0)){
//				$("#graph_panel").attr("style","height:100px;");
				$("#graph_panel").html('<div class="zanwu_shuju" style="width:125px; margin:0 auto;"><span></span><p>未收录相关信息</p></div>');
				return false;
			}
			//股权关系新图
			var datas=new Array();
//			{name: '天阳科技(835713)'}
			var centerTitle={};
			centerTitle.name=stockName+"("+stockCode+")";
			datas.push(centerTitle);
			for(var i=0;i<invest.length;i++){
				var obj={};
				//obj.investor+"(持股:"+obj.proportion+"%)";
				obj.name=invest[i].investor;
				obj.edgeText="持股:"+invest[i].proportion+"%";
				obj.cusType="mg";
				datas.push(obj);
			}
			if(participation.length<rightPageSize){
				$("#youbiangengduoshuju").hide();
			}else{
				$("#youbiangengduoshuju").show();
			}
//			console.log(participation.length);
			for(var i=0;i<participation.length;i++){
				var obj={};
				//"(参控股:"+obj.shareholdingRatio+"%)"+obj.subCompanyName;
				obj.name=participation[i].subCompanyName;
				obj.edgeText="参控股:"+participation[i].shareholdingRatio+"%";
				obj.cusType="mx";
				datas.push(obj);
			}
			createBootStrapChart(datas);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}


// 创建股权关系ECharts图表
function DrawEChart(ec) {
	// --- 折柱 ---
	myChart = ec.init(document.getElementById('gqgx_echars'));

	// 图表显示提示信息
	myChart.showLoading({
		text : "站点关系图正在努力加载..."
	});
	myChart.setOption({
		 tooltip : {
			 trigger : 'item',
			 formatter : function(params){
		 		if(params[1].indexOf(stockName)>-1){//是主体圆圈
		 			return params[1];
		 		}
		 		var companyRelationship="";
		 		var holding="";
		 		$.each(nodes,function(index,item){
		 			if(item.name==params[1]){
		 				companyRelationship=item.name;//公司简称
		 				holding=item.label;//持股情况	
		 				return false;
		 			}
		 		});
			 	return companyRelationship+"<br />"+holding;
			 }// 鼠标放上去显示的内容
		 },
		legend : {
			x : 'left',
			data : ['投资方', '参投控股']
		},
		color : ['#81B9F1', '#DF3E3E'],
		grid: {
	        x: '50%',
	        y: '100%',
	        z:'50%',
	        borderWidth:0
	    },
		series : [ {
			type : 'force',
			//name : "点击访问",
			categories : [ // 每个类型是什么样的
			{
				name:'当前公司'
			},
			 {
				name : '投资方'
			}, 
			{
				name : '参投控股'
				}],

			itemStyle : {
				normal : {
					label : {
						show : true,
						textStyle : {
							color : '#fff',
							fontSize : 14,
							fontFamily : "微软雅黑"
						},
						color : "#fff"
					},
					nodeStyle : {
						brushType : 'both',
						borderColor : 'rgba(255,215,0,0.4)',
						borderWidth : 1
					},
					linkStyle : {
						type : 'curve'
					}
				},
				emphasis : {
					label : {
						show : false
					// textStyle: null // 默认使用全局文本样式，详见TEXTSTYLE
					},
					nodeStyle : {
					// r: 30
					},
					linkStyle : {}
				}
			},
			minRadius : 40,// 最小的圆形半径
			maxRadius : 100,// 最大的圆形半径
			density : 0.5,// 密度大小，也就是2个类目之间的空间大小
			attractiveness : 1.3,// 吸引力，值越大，线越短，值越小线越长
			linkSymbol : 'arrow',
			nodes: nodes,//默认把第一个数据作为中心圆
            links: links,
		} ]
	});
	var ecConfig = require('echarts/config');

	// 绑定图表节点的点击事件
	myChart.on(ecConfig.EVENT.CLICK, focus);
	myChart.hideLoading();

}

/**
 * 上下游关系---思维导向图
 * @param customer 主要客户
 * @param suppliers 主要供应商
 */
function shangxiayouD3(customer,suppliers){
//	$("#gqgx_echars").attr("style","height:820px;");
	if((customer==null || customer.length==0) && (suppliers==null || suppliers.length==0)){
		$("#sxy_echars").attr("style","height:100px;");
		$("#sxy_echars").html('<div class="hyrd_zw"  style="display: block;"><p>未收录相关信息</p></div>');
		return false;
	}
	var rightChildrenData=new Array();
	var leftChildrenData=new Array();
	if(suppliers.length>40){
		$("#sxy_echars").attr("style","overflow-y: auto;");
	}
	//主要客户
	for (var i = 0; i < customer.length; i++) {
//		console.log(customer[i]);
		var obj=customer[i]
		var showObj={};
		showObj.name=obj.customerName+"(金额比例:"+obj.operatingIncome+"%)";
		showObj.pos="l";
		leftChildrenData.push(showObj);
	}
	//=============数据分隔符============
	//主要供应商
	for (var i = 0; i < suppliers.length; i++) {
//		console.log(suppliers[i]);
		var obj=suppliers[i]
		var showObj={};
		showObj.name="(金额比例:"+obj.percentagePurchase+"%)"+obj.name;
		rightChildrenData.push(showObj);
	}
	var json ={
		"r": {
			    "name": stockName+"("+stockCode+")",
			    "children":rightChildrenData
			},
		"l": {
		    "name": stockName+"("+stockCode+")",
		    "children":leftChildrenData
			}
	};
	var d3js = function(json){
			var objRight = json['r'] ? json['r'] : {};
			var objLeft  = json['l'] ? json['l'] : {};
			d3jsTree('#sxy_echars',objRight,objLeft);
		}
	d3js(json);

}

/**
 * 股权关系--思维导向图
 * @param invest 投资方
 * @param participation 参股控股
 */
function guquanguanxiD3(invest,participation){
//	$("#gqgx_echars").attr("style","height:820px;");
	if((invest==null || invest.length==0) && (participation==null || participation.length==0)){
		$("#gqgx_echars").attr("style","height:100px;");
		$("#gqgx_echars").html('<div class="hyrd_zw"  style="display: block;"><p>未收录相关信息</p></div>');
		return false;
	}
	var rightChildrenData=new Array();
	var leftChildrenData=new Array();
	if(participation.length>40){
		$("#gqgx_echars").attr("style","overflow-y: auto;");
	}
	//投资方
	for (var i = 0; i < invest.length; i++) {
//		console.log(invest[i]);
		var obj=invest[i]
		var showObj={};
		showObj.name=obj.investor+"(持股:"+obj.proportion+"%)";
		showObj.pos="l";
		leftChildrenData.push(showObj);
	}
	//=============数据分隔符============
	//参股控股
	for (var i = 0; i < participation.length; i++) {
//		console.log(participation[i]);
		var obj=participation[i]
		var showObj={};
		showObj.name="(参控股:"+obj.shareholdingRatio+"%)"+obj.subCompanyName;
		rightChildrenData.push(showObj);
	}
	var json ={
		"r": {
			    "name": stockName+"("+stockCode+")",
			    "children":rightChildrenData
			},
		"l": {
		    "name": stockName+"("+stockCode+")",
		    "children":leftChildrenData
			}
	};
	var d3js = function(json){
			var objRight = json['r'] ? json['r'] : {};
			var objLeft  = json['l'] ? json['l'] : {};
			d3jsTree('#gqgx_echars',objRight,objLeft);
		}
	d3js(json);

}
//d3js tree
function d3jsTree(aim,objRight,objLeft){
    // $(aim+' svg').remove();
    var m = [20, 120, 20, 120],
        w = 1280 - m[1] - m[3],
        h = 600 - m[0] - m[2] - m[1],  //闈犲乏
        i = 0;

    var tree = d3.layout.cluster().size([h, w]).nodeSize([15 ,  200]);

    var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

	var svgHeight=800;
	if(objRight.children.length>40){
		svgHeight=2000;
	}
	var translateHeight=300;

	//console.log(objRight.children[0].children.length);
	//if(objRight.children[0].children.length>=80){

	//console.log(objRight.children[0].children.length);
	if(objRight.children.length>=80){

		translateHeight=800;
	}else if(objRight.children.length>=70){
		translateHeight=600;
	}else if(objRight.children.length>=60){
		translateHeight=500;
	}else if(objRight.children.length>=50){
		translateHeight=550;
	}else if(objRight.children.length>=40){
		translateHeight=400;
	}
	h=640
	//
	var vis=d3.select(aim).append("svg:svg")
                .attr("width", "100%")
                .attr("height", svgHeight)
				.append("svg:g")
				.attr("fill", "#000")
				.attr("transform", "translate(" + h + "," + translateHeight + ")");

    
    update(objRight,objLeft);

    function init_nodes(left){
        left.x0 = h / 2;
        left.y0 = 0;
        var nodes_dic = [];
        var left_nodes = tree.nodes(left);
        return left_nodes;
    }

    function update(source,l) {

        var duration = d3.event && d3.event.altKey ? 5000 : 500;

        // Compute the new tree layout.
        var nodes = init_nodes(source);
        var left_nodes = init_nodes(l);
        // if( l !=)
        var len = nodes.length;
        for( var i in left_nodes ){
            nodes[len++] = left_nodes[i];
        }

        // Normalize for fixed-depth.
        nodes.forEach(function(d) {
            tmp = 1;
            if( d.pos == 'l' ){ tmp = -1;}
            d.y = tmp * d.depth * 200;  
            // d.x = d.l * 63;
        });

        // Update the nodes鈥�
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        //设置缩放的大小比例1-10
		var zoom = d3.behavior.zoom()  
            .scaleExtent([1, 10])  
            .on("zoom", zoomed); 
		// Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"});
		
            //.on("click", function(d) { alert(d.name); }); // 鐐瑰嚮浜嬩欢
            // .on("click", function(d) { ajax_get_server(d.name);console.log(d);toggle(d); update(d,l); });

        nodeEnter.append("svg:circle")
            .attr("r", 1e-6)
            .attr("fill","red")
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("svg:text")
            .attr("x", function(d) { 
            	//console.log(d);
            	if(d.name==(stockName+"("+stockCode+")")){return 40}//调整股票代码名称显示的位置
            	if(d.pos=="l"){return d.children || d._children ? 10 : -10;}return d.children || d._children ? -10 : 10; })
            .attr("dy", function(d){
//            	console.log(d);
            	if(d.name==(stockName+"("+stockCode+")")){return 25}//调整股票代码名称显示的位置
            	return ".35em"
            })
            .attr("text-anchor", function(d) {if(d.pos=="l"){return d.children || d._children ? "start" : "end";}
            					return d.children || d._children ? "end" : "start"; })
            .text(function(d) { if(d.name==(stockName+"("+stockCode+")") && d.children==null){return "";}return d.name; })
            .style("color", "#ff0000")
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text").style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
                            .duration(duration)
                            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links鈥�
        var link = vis.selectAll("path.link")
                    .data(tree.links(nodes), function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter()
            .insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit()
            .transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

		var circles_group=vis.call(zoom);

		circles_group.selectAll("circle")
			.data(node)
			.enter()
			.append("circle")
			.attr("cx",function(d){ return d.cx; })
			.attr("cy",function(d){ return d.cy; })
			.attr("r",function(d){ return d.r; }) 
			.attr("fill","black"); 

		//scale 设置放大缩小。translate设置位置
		function zoomed(){
			
			circles_group.attr("transform", function(){
				//console.log(d3.event.translate);
				return "translate("+(h+d3.event.translate[0])+","+(m[1]+d3.event.translate[1])+")scale(" + d3.event.scale + ")"
			}); 
			 
		}
    }

    // Toggle children.
    function toggle(d) {
        if (d.children) {
            d._children = d.children; // 闂悎瀛愯妭鐐�
            d.children = null;
        } else {
            d.children = d._children; // 寮€鍚瓙鑺傜偣
            d._children = null;
        }
    }

	
}



