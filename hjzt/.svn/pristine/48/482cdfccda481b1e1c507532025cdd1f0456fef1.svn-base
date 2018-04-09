var websocket = null;
function marketMakingWebsocket(){
	/**
	 * 判断当前浏览器是否支持WebSocket
	 */
	if('WebSocket' in window){
	    websocket = new WebSocket("ws://192.168.1.77:9012/marketMakingWebsocket/");
	}else{
		errorAlert("",'Not support websocket');
	}

	/**
	 * 连接发生错误的回调方法
	 */
	websocket.onerror = function(){
	    setMessageInnerHTML("error");
	};

	/**
	 * 连接成功建立的回调方法
	 */
	websocket.onopen = function(event){
//	    setMessageInnerHTML("open");
	}

	/**
	 * 接收到消息的回调方法
	 */
	websocket.onmessage = function(event){
	    setMessageInnerHTML(event.data);
	}

	/**
	 * 连接关闭的回调方法
	 */
	websocket.onclose = function(){
//	    setMessageInnerHTML("close");
	}

	/**
	 * 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	 */
	window.onbeforeunload = function(){
	    websocket.close();
	}
}



/**
 * 将消息显示在网页上
 * @param jsonStr
 */
function setMessageInnerHTML(jsonStr){
//    document.getElementById('message').innerHTML += innerHTML + '<br/>';
	var obj = jQuery.parseJSON(jsonStr);
	var headerStr="Header";
	$("#stockCode"+headerStr).html(obj.stockCode);//股票代码
	$("#stockName"+headerStr).html(obj.stockName);//股票名称
	$("#exponent"+headerStr).html(obj.exponent);//今日做市指数
	$("#exponentAmount"+headerStr).html(obj.exponentAmount);//指数涨跌量
	$("#exponentRate"+headerStr).html(obj.exponentRate);//指数涨跌率
	$("#open"+headerStr).html(obj.open);//今开
	$("#high"+headerStr).html(obj.high);//最高
	$("#low"+headerStr).html(obj.low);//最低
	$("#amount"+headerStr).html((Number(obj.amount)/10000.0).toFixed(2));//成交量
	$("#moneyAmount"+headerStr).html((Number(obj.moneyAmount)/10000.0).toFixed(2));//成交额
	$("#peRatio"+headerStr).html(obj.peRatio);//成交市盈率
}

//关闭连接
function closeWebSocket(){
    websocket.close();
}

//发送消息
//function send(){
//    var message = document.getElementById('text').value;
//    websocket.send(message);
//}