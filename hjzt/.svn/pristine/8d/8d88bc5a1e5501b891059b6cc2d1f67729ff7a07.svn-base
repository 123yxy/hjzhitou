//节点数据、root属性设置
var graphClick=null;
$(function(){
	//放大
	$(".border_bottom").delegate("em ","click",function(){
		graphClick.zoomIn();
	});
	//缩小
	$(".border_bottom").delegate("i ","click",function(){
		graphClick.zoomOut();
	});
	//全屏
	$(".border_bottom").delegate("a ","click",function(){
//		graphClick.zoomToOverview();
        if($('#graph_panel').hasClass('q-max')){
        	$(this).text("全屏");
	        $('#graph_panel').removeClass('q-max');
	        $(this).removeClass('active');
	    }else{
	    	$(this).text("还原");
	        $('#graph_panel').addClass('q-max');
	        $(this).addClass('active');
	    }
        graphClick.updateViewport();
        graphClick.moveToCenter(1);
//	    if(window.graph){
	       // window.graph.updateViewport();
//	    }
	});
});
//createBootStrapChart(datas);
/**
 * 数据格式：name连接点的数据，edgeText线条的数据,cusType控制左(mg)右(mx)位置
 * [
		{name: '天阳科技(835713)'},
        {name: '北京华容互联创业投资中心(有限合伙)', edgeText: '20.5%',cusType:'mg'},
        {name: '杭州XX公司', edgeText: '20.55%',cusType:'mg'},
		{name: '北京华容互联创业投资中心(有限合伙)', edgeText: '20.5%',cusType:'mg'},
        {name: '杭州XX公司', edgeText: '20.55%',cusType:'mg'},
		{name: '北京华容互联创业投资中心(有限合伙)', edgeText: '20.5%',cusType:'mg'},
        {name: '杭州XX公司', edgeText: '20.55%',cusType:'mg'},
       	
        {name: '腾讯集团', edgeText: '20.5%',cusType:'mx'},
		{name: '腾讯集团22', edgeText: '20.5%',cusType:'mx'},
        {name: '北京华容互联创业投资中心', edgeText: '20.5%',cusType:'mx'},
		{name: '腾讯集团', edgeText: '20.5%',cusType:'mx'},
		{name: '腾讯集团22', edgeText: '20.5%',cusType:'mx'},
        {name: '北京华容互联创业投资中心', edgeText: '20.5%',cusType:'mx'},
		{name: '腾讯集团', edgeText: '20.5%',cusType:'mx'},
		{name: '腾讯集团22', edgeText: '20.5%',cusType:'mx'},
        {name: '北京华容互联创业投资中心', edgeText: '20.5%',cusType:'mx'},
		{name: '北京华容互联创业投资中心', edgeText: '20.5%',cusType:'mx'}
    ]
 * @param datas
 */
function createBootStrapChart(datass){
	/**
	 * Created by Ancs on Hover
	 * Date: 2017/6/20
	 * Time: 13:59
	 */
	if(!window.getI18NString){getI18NString = function(s){return s;}}
	//连接线样式扩展方法
	function HFlexEdgeUI(edge, graph){
		edge.setStyle(Q.Styles.EDGE_BUNDLE_LABEL_OFFSET_X,100);
	    Q.doSuperConstructor(this, HFlexEdgeUI, arguments);
	}
	HFlexEdgeUI.prototype = {
	    drawEdge: function(path, fromUI, toUI, edgeType, fromBounds, toBounds){
	        var from = fromBounds.center;
	        var to = toBounds.center;
	        var cx = (from.x + to.x) / 2;
	        var cy = (from.y + to.y) / 2;

			if(toUI.data.data.cusType=="mx"){
				path.curveTo((from.x + toBounds.left) / 2 ,from.y , fromBounds.right, to.y); 
			}else{
				path.curveTo((from.x + toBounds.right) / 2 ,from.y , fromBounds.left, to.y); 
			}

	        //path.curveTo(fromBounds.right,from.y , toBounds.left, to.y);  //直線，需要分組對稱
	        //path.curveTo(from.x, 1, 1, to.y);
	    }
	}
	Q.extend(HFlexEdgeUI, Q.EdgeUI);
	window.HFlexEdgeUI = HFlexEdgeUI;
	Q.loadClassPath(HFlexEdgeUI, "HFlexEdgeUI");

	//初始化画布
	var graph = new Q.Graph(document.getElementById("canvas"));
	graph.editable = false;
	graph.enableDoubleClickToOverview = false;
	graph.interactionDispatcher.addListener(function(evt){
	    if(evt.data == ROOT){
	        return;
	    }
	    if(evt.kind == Q.InteractionEvent.ELEMENT_MOVING && evt.data){
	        var node = evt.data;
	        var host = findNearNode(node);
	        if(node.host == host){
	            return;
	        }
	        if(node.host){
	            unlinkToParent(node);
	        }
	        if(host){
	            linkToParent(node, host);
	        }
	    }else if(evt.kind == Q.InteractionEvent.ELEMENT_MOVE_END && evt.data){
	        layouter.doLayout();
	    }
	})
	function localToGlobal(x, y, canvas){
	    x += window.pageXOffset;
	    y += window.pageYOffset;
	    var clientRect = canvas.getBoundingClientRect();
	    return {x: x + clientRect.left, y: y + clientRect.top};
	}
	//新建连接线方法
	function createEdge(from, to, edgeText,dataType){
	    var edge = graph.createEdge("", from, to );
//	    edge.setStyle(Q.Styles.ARROW_TO, Q.Consts.SHAPE_TRIANGLE);
		edge.setStyle(Q.Styles.ARROW_TO, false);
//	    edge.setStyle(Q.Styles.ARROW_TO_SIZE, 4);//箭头大小
//	    edge.setStyle(Q.Styles.ARROW_TO_FILL_COLOR, "#444");//箭头颜色
//	    edge.setStyle(Q.Styles.ARROW_TO_STROKE, 0.5);//箭头边框厚度
//	    edge.setStyle(Q.Styles.ARROW_TO_STROKE_STYLE, "#444");//箭头边框颜色
		edge.setStyle(Q.Styles.EDGE_BUNDLE_GAP, 10);
	    edge.setStyle(Q.Styles.EDGE_WIDTH, 0.3);//连接线厚度
		edge.setStyle(Q.Styles.EDGE_TO_AT_EDGE,true);
		edge.setStyle(Q.Styles.SELECTION_COLOR, "#FFF");
		edge.setStyle(Q.Styles.EDGE_BUNDLE_LABEL_POSITION,Q.Position.RIGHT_MIDDLE);
		edge.setStyle(Q.Styles.EDGE_BUNDLE_LABEL_OFFSET_X,100);
		//线条提示信息
		var label2 = new Q.LabelUI();
		
		
		label2.border = 0;
		label2.padding = new Q.Insets(2, 5);
		label2.showPointer = true;
		if(dataType=="mg"){
			label2.position = Q.Position.RIGHT_BOTTOM;
			label2.anchorPosition = Q.Position.CENTER_TOP;
		}else{
			label2.position = Q.Position.RIGHT_TOP;
			label2.anchorPosition = Q.Position.CENTER_BOTTOM;
		}
		label2.offsetY = 0;
			label2.offsetX = -50;
		label2.backgroundColor = "";
		label2.fontFamily = "微软雅黑";
		label2.fontSize = 14;
		//label2.fontStyle = "italic 100";
		edge.addUI(label2, [{
		    property : "label2",
		    propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
		    bindingProperty : "data"
		}, {
		    property : "label2.color",
		    propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
		    bindingProperty : "color"
		}]);
		edge.set("label2",edgeText );
	    edge.uiClass = HFlexEdgeUI;
	}
	//新建节点方法
	function createText(text, x, y, bgcolor,dataType){
//		console.log(x+"   "+y);
	    var node = graph.createNode(text, x, y);
	    node.image = null;
	    //node.setStyle(Q.Styles.LABEL_BACKGROUND_GRADIENT, new Q.Gradient(Q.Consts.GRADIENT_TYPE_LINEAR, bgcolor, null, Math.PI/2));//背景渐变颜色，有bgcolor传入时触发
	    node.setStyle(Q.Styles.LABEL_COLOR, "#FFF");//字体颜色
	    node.setStyle(Q.Styles.LABEL_PADDING, new Q.Insets(3, 15));//边距
	    node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_TOP);
	    node.setStyle(Q.Styles.LABEL_BORDER, 0.5);//边框宽度
//	    node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#E79E0F");//边框颜色
//	    node.setStyle(Q.Styles.SELECTION_COLOR, "#E79E0F");//选中后边框颜色
	    node.setStyle(Q.Styles.LABEL_FONT_FAMILY,"微软雅黑");
	    node.setStyle(Q.Styles.LABEL_FONT_SIZE, 14);//字体大小
		node.edgeType = Q.Consts.EDGE_TYPE_ELBOW;
		if(dataType=="mx"){
			node.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#358AE4");//节点默认背景颜色
//			node.setStyle(Q.Styles.LABEL_FONT_FAMILY,"微软雅黑");
			node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#358AE4");//边框颜色
			node.setStyle(Q.Styles.SELECTION_COLOR, "#358AE4");//选中后边框颜色
			node.anchorPosition = Q.Position.LEFT_TOP;
		}else{
//			node.setStyle(Q.Styles.LABEL_FONT_FAMILY,"微软雅黑");
			node.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#975DBA");//节点默认背景颜色
			node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#975DBA");//边框颜色
			node.setStyle(Q.Styles.SELECTION_COLOR, "#975DBA");//选中后边框颜色
			node.anchorPosition = Q.Position.RIGHT_TOP;
		}
	    return node;
	}
	//初始化树
	var layouter = new Q.TreeLayouter(graph);
	layouter.isLayoutable = function(node, from){
		return false;
		//return node == ROOT || node.host != null;
	}
	layouter.vGap = 0;
	var step=30;
	var currentIndex=[0,0];
	//创建组方法
	//创建组方法
	function createItem(datas){
	    var firstNode;
		var a=[0,0];
		var pianyi=[0,0];
		for(var i= 0,l = datas.length; i<l; i++){
			if(datas[i].cusType=='mg'){
				a[0]++;
			}else{
				a[1]++;
			}
		}
		var max = a[0]>a[1] ? a[0] : a[1];
		pianyi[0]= a[0]>a[1] ? (a[0]-a[1])*step/2 : 0;
		pianyi[1]= a[1]>a[0] ? (a[1]-a[0])*step/2 : 0;
		for(var i= 0,l = datas.length; i<l; i++){
			var data = datas[i];
			if(data.cusType){
				if(data.cusType=='mg'){
					data.y=currentIndex[0]*step+pianyi[1];
					data.x=10;
					data.bgcolor=['#975DBA', '#975DBA'];
					currentIndex[0]++;
				}else if(data.cusType=='mx'){
					data.y=currentIndex[1]*step+pianyi[0];
					data.x=600;
					data.bgcolor=['#358AE4', '#358AE4'];
					currentIndex[1]++;
				}
			}else{
				data.x=350;
				data.y=max/2*step;
			}
			var node = createText(data.name,data.x,data.y,data.bgcolor,data.cusType);
			node.tooltipType = "text";
			node.data = data;

			if(i>0){
					linkToParent(node, firstNode ,data);
			}else{
				firstNode=node;
			}
		}
	    return firstNode;
		
	}
	//建立节点父子关系
	function linkToParent(node, parent, data){
	    node.host = parent;
	    return createEdge(parent, node, data.edgeText,data.cusType);
	}
	//初始化数据
	var ROOT = createItem(datass);
	ROOT.setStyle(Q.Styles.LABEL_FONT_SIZE, 16);
	ROOT.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(30, 40));
	ROOT.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#E79E0F");//节点默认背景颜色
	ROOT.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#E79E0F");
	ROOT.setStyle(Q.Styles.SELECTION_COLOR, "#E79E0F");//选中后边框颜色
	//初始化绘图插件
	graph.callLater(function(){
	    layouter.doLayout();
	    //默认根据容器100%放大
//	    graph.zoomToOverview();
	    graph.moveToCenter(1);
	    graphClick=graph;
	})
	//qunee for html5 去掉----注意千万不要删掉此代码
	$($(".Q-Canvas")[1]).hide(); 
	//放大缩小全屏事件使用
	
}