var paymentAlreadyPaid=[];//已付款的订单信息
var pendingPayment=[];//未付款的订单
var allOrder='';
var orderId;
var listsIndex=UTIL.getUrlPara("listsIndex");
$(function(){
	MyOrder();
	//点击上面的订单进项切换
	taggleTab();
	findOrderInfoByUser();
	findeOrdered(allOrder);

	if(listsIndex==0){
		$(".userMenu").click();
	}
	//点击订单详情
	$("#ddxq").on("click",function(){
		$(".userMenu").click();
	})
	
	//点击公司跳转
	$("#orderDetailsList").on("click",".pay-company",function(){
		var code=$(this).attr("data-code");
		var name=$(this).attr("data-name");
		window.open("cover.html?stockCode="+code+"&stockName="+name);
	})
	//点击待付款显示二维码的弹窗
	$("#orderDetailsList").on("click",".lanse",function(){
		var name=$(this).text();
		if(name=="待付款"){
			var stockCodeParam=$(this).attr("data-stockCode");
			var stockNameParam=$(this).attr("data-stockName");
			orderId=$(this).attr("data-id");
			//打开支付的二维码
			$("#zf-ewm").show();
			//需要一个接口就是生成二维码的接口
			findPayParam(orderId);
		}
	})
	
//	点击支付二维码的关闭按钮
	$("#zf-ewm .zf-close").on("click",function(){
		$(this).parent().hide();
		window.clearInterval(clearIntervalFuc);
	})
	
	//点击支付成功的删除符号
	$(".pay-top em").on("click",function(){
		$("#pay-sucess").hide();
		$(".marsk").hide();
	})

	
	
	
})


//点击上面的订单进项切换
function taggleTab(){
	$(".order-list span").on("click",function(){
		var text=$(this).text();
		$(this).addClass("on").siblings().removeClass("on");
		if(text=="全部订单"){
			findeOrdered(allOrder);
			$(".weifukuan").show();
		}else if(text=="已支付"){
			findeOrdered(paymentAlreadyPaid);
			$(".weifukuan").show();
		}else if(text=="待支付"){
			findeOrdered(pendingPayment);
			$(".weifukuan").hide();
		}
	})
}
//查询所有的订单信息
function findOrderInfoByUser(){
	UTIL.axs(UTIL.CONFIG.findOrderInfoByUser,null,false,function(data){
		//console.log(data)
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result!="" &&　result!=null && result!=undefined){
				$(result).each(function(index,item){
					if(item.orderType==2){//说明是已经支付的订单
						paymentAlreadyPaid.push(item);
					}else if(item.orderType==1){//说明是未付款的订单
						pendingPayment.push(item);
					}
				})
				allOrder=result;
			}
		}
	})
}
//订单信息渲染页面
function findeOrdered(datalist){
	var dataList=datalist;
	var tr='';
	$(dataList).each(function(k,v){
		tr+='<tr>';
		tr+='<td>'+ v.orderId +'</td>';
		tr+='<td class="pay-company" data-code="'+v.productId +'" data-name="'+v.productName +'">'+ v.productName +'（'+ v.productId +'）智能研报深度版</td>';
		tr+='<td class="order-je">￥'+ ((v.orderMoney)/100).toFixed(2) +'</td>';
		tr+='<td>'+ v.createTime +'</td>';
		if(v.payTime==null || v.payTime=="" || v.payTime==undefined){
		tr+='<td class="lanse" data-stockCode="'+ v.productId +'" data-stockName="'+v.productName +'" data-id="'+ v.orderId +'">待付款</td>';	
		tr+='<td class="weifukuan">--</td>';	
		}else{	
		tr+='<td>已支付</td>';
		tr+='<td>'+subsstr(v.payTime)+'</td>';	
		}
		tr+='</tr>';
	})
	$("#orderDetailsList").html(tr);
}

//对Date的扩展，将 Date 转化为指定格式的String 
function subsstr(time){
    return time.substr(0,4) + "-" + time.substr(4,2) + "-" + time.substr(6,2) + "  " +  time.substr(8,2) + ":" +  time.substr(10,2);
}

var clearIntervalFuc;
var tempOrderId;//临时订单ID，用来查支付状态
//点击立即支付的时候
function findPayParam(orderId){
	orderIds=orderId;
	UTIL.axs(UTIL.CONFIG.findPayParam,{orderId:orderIds},false,function(data){
		$("#zf-ewm").show();
		$("#code").html("");
		$("#code").qrcode(data.qrCode);//生成二维码
		tempOrderId=data.orderId;
		clearIntervalFuc=self.setInterval("checkOrders()",2000);
	})
}

//支付完成主动查询订单信息是否支付成功
function checkOrders(){
	var dingdnhao=tempOrderId;
	var params={orderId:dingdnhao}
	UTIL.axs(UTIL.CONFIG.checkOrder,params,false,function(data){
		if(data==true){
			$("#zf-ewm").hide();
			$("#code").html("");
			window.clearInterval(clearIntervalFuc); 
			findPayParamed(params);
		}
	});
}


//支付成功之后显示支付成功的页面
function findPayParamed(orderId){
	$("#pay-sucess").show();
	var datas=orderId;
	UTIL.axs(UTIL.CONFIG.findOrderInfo,datas,false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			if(data.retData!="" &&　data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				$(".ddxx").html("订单号："+result[0].orderId);
				var payMoney=((result[0].payMoney)/100).toFixed(2);
				$(".zfje").html("￥"+payMoney);
			}
		}
	})
}
//点击支付成功之后的确定按钮
function suceessPay(){
	$(".zf-shure").on("click",function(){
		$(".pay-top em").click();
		$(".marsk").hide();
		$("#pay-sucess").hide();
		MyOrder();
	})
}


//个人中心的我的订单
function MyOrder(){
	$("#orMyOrder").on("click",function(){
		$("#myOrder").show();
		$(".user-title").hide();
	})
}

