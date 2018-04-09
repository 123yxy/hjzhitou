var stockCodeParam = UTIL.getPara("stockCode");
var stockNameParam = decodeURI(UTIL.getPara("stockName"));
var orderId="";
var userId = localStorage.getItem("userId");//20171010 shiqi
$(function(){
	//查询用户是否是付费的用户
	//payOrNot();
	var innerWidth=$(document).width();
	//console.log(innerWidth)
	var width=$(".container").width();
	var height=$(".container").height();
	var marginTop=(height/2)+70;
	if(innerWidth>=1600){
		$(".payment-page").css("width",width);
		$(".payment-page").css("height",height);
		$(".payment-page").css("margin-top",-marginTop);
		$(".payment-page").css("margin-left",-width/2);
		$("#payForList").css("max-height",height-240);
	}else{
		$(".payment-page").css("width",width);
		$(".payment-page").css("height",500);
		$(".payment-page").css("margin-top",-250);
		$(".payment-page").css("margin-left",-width/2);
		$("#payForList").css("max-height",200);
	}
	$(".top-name span").html(stockNameParam+"("+stockCodeParam+")智能研报");
	
	//点击首页的深度阅读显示支付的弹窗
	$(".pay-for").on("click",function(){
		var url=window.location.href;
		//console.log(url);
		 if (userId != null && userId != "" && userId != "undefined") {
		 	$(".marsk").show();
                $("#payment-page").show();
           } else {
              	localStorage.setItem("locaHref",url);
                location.href = "./login.html";
            }
		
	})
	
	
	
	
	
	
	
})

////是否是付费的用户
//function payOrNot(){
//	var params={stockCode:stockCode,}
//	UTIL.axs(UTIL.CONFIG.findIsPay,params,false,function(data){
//		if(data.retCode=="0000"){
//			var result=data.retData;
//			if(result!="" && result!=null && result!=undefined){
//				if(result==true){
//					$(".pay-for").hide();
//				}
//			}
//		}
//		
//	})
//}
//////创建订单信息并支付
//var clearIntervalFuc;
//function doOrder(){
//	var params={orderName:stockNameParam,productId:stockCodeParam};
//	UTIL.axs(UTIL.CONFIG.doOrder,params,false,function(data){
//		//console.log(data);
//		orderId=data.orderId;
//		$("#zf-ewm").show();
//		$("#code").qrcode(data.qrCode);//生成二维码
//		//主动查询客户是否支付成功
//		var start=new Date().getTime();
////		while(new Date().getTime()<(start+30*60*1000)){
////			if(checkOrder(orderId)){
////				break;
////			}
////			setTimeout(aa,5000);
////		}
//		clearIntervalFuc=self.setInterval("checkOrder()",1000);
//	})
//}


////支付完成主动查询订单信息是否支付成功
//function checkOrder(){
////	alert(0)
////  var  isPayTrue=false;
//	var dingdnhao=orderId;
//	var params={orderId:dingdnhao}
//	UTIL.axs(UTIL.CONFIG.checkOrder,params,false,function(data){
//		//console.log(data)
//		if(data==true){
//			$("#zf-ewm").hide();
//			
////			isPayTrue=true;
//			window.clearInterval(clearIntervalFuc);
//			findPayParams(params);
//		}
//	});
////	return isPayTrue
//}

//支付成功之后显示支付成功的页面
//function findPayParams(orderId){
//	$("#pay-sucess").show();
//	var orderId=orderId;
//	UTIL.axs(UTIL.CONFIG.findPayParam,{orderId:orderId},false,function(data){
//		if(data.retCode=="0000"){
//			if(data.retData!="" &&　data.retData!=null && data.retData!=undefined){
//				$(".ddxx").html("订单号："+order_id);
//				$(".zfje").html("￥"+order_money);
//			}
//		}
//	})
//}