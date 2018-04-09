/**
 * Created by Ancs on Hover
 * Date: 2017/6/20
 * Time: 13:59
 */
//获取查询参数
var stockName=getUrlParam("stockName");//获取参数的名称
var stockCode=getUrlParam("stockCode");//获取参数代码


if(!window.getI18NString){getI18NString = function(s){return s;}}
//连接线样式扩展方法
function HFlexEdgeUI(edge, graph){
    Q.doSuperConstructor(this, HFlexEdgeUI, arguments);
}
HFlexEdgeUI.prototype = {
    drawEdge: function(path, fromUI, toUI, edgeType, fromBounds, toBounds){
        var from = fromBounds.center;
        var to = toBounds.center;
        var cx = (from.x + to.x) / 1.9;
        var cy = (from.y + to.y) / 2;
        path.curveTo(from.x, cy, cx, to.y);
        //path.curveTo(from.x, from.y, cx, to.y);
    }
}
Q.extend(HFlexEdgeUI, Q.EdgeUI);
window.HFlexEdgeUI = HFlexEdgeUI;
Q.loadClassPath(HFlexEdgeUI, "HFlexEdgeUI");

//初始化画布
var graph = new Q.Graph(canvas);
graph.editable = false;
graph.enableDoubleClickToOverview = false;
//新建连接线方法
function createEdge(from, to, edgeText){
    var edge = graph.createEdge(edgeText, from, to );
    edge.setStyle(Q.Styles.ARROW_TO, Q.Consts.SHAPE_TRIANGLE);
    edge.setStyle(Q.Styles.ARROW_TO_SIZE, 4);//箭头大小
    edge.setStyle(Q.Styles.ARROW_TO_FILL_COLOR, "#444");//箭头颜色
    edge.setStyle(Q.Styles.ARROW_TO_STROKE, 0.5);//箭头边框厚度
    edge.setStyle(Q.Styles.ARROW_TO_STROKE_STYLE, "#444");//箭头边框颜色
    edge.setStyle(Q.Styles.EDGE_WIDTH, 1);//连接线厚度
    edge.uiClass = HFlexEdgeUI;
}
//新建节点方法
function createText(text, x, y, bgcolor){
    var node = graph.createNode(text, x, y);
    node.image = null;
    node.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#2898E0");//节点默认背景颜色
    node.setStyle(Q.Styles.LABEL_BACKGROUND_GRADIENT, new Q.Gradient(Q.Consts.GRADIENT_TYPE_LINEAR, bgcolor, null, Math.PI/2));//背景渐变颜色，有bgcolor传入时触发
    node.setStyle(Q.Styles.LABEL_COLOR, "#FFF");//字体颜色
    node.setStyle(Q.Styles.LABEL_PADDING, new Q.Insets(5, 5));//边距
    node.setStyle(Q.Styles.LABEL_ANCHOR_POSITION, Q.Position.CENTER_TOP);
    node.setStyle(Q.Styles.LABEL_BORDER, 0.5);//边框宽度
    node.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#1D4876");//边框颜色
    node.setStyle(Q.Styles.SELECTION_COLOR, "#0F0");//选中后边框颜色

    return node;
}
//初始化树
var layouter = new Q.TreeLayouter(graph);
layouter.isLayoutable = function(node, from){
    return node == ROOT || node.host != null;
}
layouter.vGap = 5;
//创建组方法
function createItem(data, parent, level){
    if(Q.isArray(data)){
        var children = data;
        for(var i= 0,l = children.length; i<l; i++){
            var child = children[i];
            createItem(child, parent, level);
        }
        return;
    }
    var node = createText(data.name,"","",data.bgcolor);
    node.tooltipType = "text";
    node.data = data;
    level = level || 0;
    node.level = level;
    if(parent){
        linkToParent(node, parent ,data);
    }
    node.parentChildrenDirection = data.parentChildrenDirection;
    node.layoutType = data.layoutType;

    if(data.children){
        createItem(data.children, node, level + 1);
    }
    return node;
}
//建立节点父子关系
function linkToParent(node, parent, data){
    node.host = parent;
    return createEdge(parent, node, data.edgeText);
}
//节点数据、root属性设置
var datas = {
    name: '天阳科技(835713)',
    parentChildrenDirection: Q.Consts.DIRECTION_MIDDLE,
    layoutType: Q.Consts.LAYOUT_TYPE_TWO_SIDE,
    children: [
        {
            name: '投资方',
            edgeText: '20.5%',//连接线上文字
            bgcolor:['#fff', '#000'], //节点背景颜色
            children: [
                {name: '北京华容互联创业投资中心(有限合伙)', edgeText: '20.5%',bgcolor:['#fff', '#000']},
                {name: '杭州XX公司', edgeText: '20.55%'},
                {name: '广州某公司', edgeText: '20.5%'},
                {name: '北京华容互联创业投资中心(有限合伙)', edgeText: '20.5%'},
                {name: '杭州XX公司', edgeText: '20.55%', cusType:'mg'},
                {name: '广州某公司', edgeText: '20.5%'},
                {name: '北京华容互联创业投资中心(有限合伙)', edgeText: '20.5%'},
                {name: '杭州XX公司', edgeText: '20.5%'},
                {name: '广州某公司', edgeText: '20.5%'}
            ]
        },
        {name: '参股控股', edgeText: '20.5%',
            children: [
                {name: '百度集团', edgeText: '20.5%'},
                {name: '腾讯集团', edgeText: '20.5%'},
                {name: '阿里巴巴集团', edgeText: '20.5%'},
                {name: '百度集团', edgeText: '20.5%'},
                {name: '腾讯集团', edgeText: '20.5%'},
                {name: '阿里巴巴集团', edgeText: '20.5%'},
                {name: '百度集团', edgeText: '20.5%'},
                {name: '腾讯集团', edgeText: '20.5%'},
                {name: '北京华容互联创业投资中心', edgeText: '20.5%'}
            ]
        }
    ]
}
//初始化数据
var ROOT = createItem(datas);
//ROOT.setStyle(Q.Styles.LABEL_FONT_SIZE, 20);
//ROOT.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(80, 60));
//初始化绘图插件
graph.callLater(function(){
    layouter.doLayout();
    //默认根据容器100%放大
    graph.zoomToOverview();
})