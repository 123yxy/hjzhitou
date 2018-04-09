$(function(){
	var html='';
	html+='<div class="slide-nav">'+
				'<span class="slide-ml">目录</span>'+
				'<div class="slide-list"  style="display: none;">'+
				'<span class="slide-up">收起</span>'+
					'<h3>目录</h3>'+
					'<div class="slide-content">'+
						'<h4>NO1.公司概况</h4>'+
						'<ul>'+
							'<li><a href="section1-1.html">公司信息</a></li>'+
							'<li><a href="section1-2.html">挂牌信息</a></li>'+
							'<li><a href="section1-3.html">股权结构</a></li>'+
							'<li><a href="section1-4.html">股本及变动情况</a></li>'+
							'<li><a href="section1-5.html">人员情况</a></li>'+
							'<li><a href="section1-6.html">重大事件</a></li>'+
							'<li><a href="section1-7.html">风险信息</a></li>'+
							'<li><a href="section1-8.html">投融资分析</a></li>'+
						'</ul>'+
					'</div>'+
					'<div class="slide-content">'+
						'<h4>NO2.公司业务</h4>'+
						'<ul>'+
							'<li><a href="section2-1.html">产品服务及主营业务收入</a></li>'+
							'<li><a href="section2-2.html">商业模式及未来规划</a></li>'+
							'<li><a href="section2-3.html">上下游分析</a></li>'+
							'<li><a href="section2-4.html">所处行业分析</a></li>'+
						'</ul>'+
					'</div>'+
					'<div class="slide-content">'+
						'<h4>NO3.财务分析</h4>'+
						'<ul>'+
							'<li><a href="section3-1.html">核心财务数据</a></li>'+
							'<li><a href="section3-2.html">公司财务分析</a></li>'+
							'<li><a href="section3-3.html">综合能力模型分析</a></li>'+
							'<li><a href="section3-4.html">杜邦分析法</a></li>'+
						'</ul>'+
					'</div>'+
					'<div class="slide-content">'+
						'<h4>NO4.盈利预测</h4>'+
						'<ul>'+
							'<li><a href="section4-1.html">盈利预测表</a></li>'+
							'<li><a href="section4-2.html">预测风险提示</a></li>'+
						'</ul>'+
					'</div>'+
				'</div>'+
			'</div>';
			
		$(".container").append(html);	
		$(".slide-ml").on("click",function(){
			$(this).next().show();
		});
		$(".slide-content h4").on("click",function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(this).next().show();
			}else{
				$(this).addClass("on");
				$(this).next().hide();
			}
		})
		$(".slide-up").on("click",function(){
			$(".slide-list").hide();
		})
		userHead();
		$(".infor-name").on("click",function(){
			window.location.href="/static/znyb_pc/userCenter.html";
		})
})
function userHead(){
    var userHead = '<div class="cotainer">'+
				'<div class="col-lg6 col-md-6 col-sm-6 userHead-logo"><img src="../images/logo.png"></div>'+
				'<div class="col-lg6 col-md-6 col-sm-6 userHead-out">'+
					'<div class="infor-name">'+
						'<em>'+
							'<img src="" alt="" />'+
						'</em>'+
						'<span>王宝强</span>'+
					'</div>'+
				'</div>'+
			'</div>';
     
    $(".qxheader").append(userHead)
}