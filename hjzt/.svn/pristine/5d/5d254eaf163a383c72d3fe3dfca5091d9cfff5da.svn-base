
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}



  // custom formatting example
  $('#count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
/*//添加应用
$(document).ready(function(){
//	打开应用列表
	$(".applic_tjyy a").on("click",function(){
		$(".add_app_down").slideDown();
		$(".jiabeijing").show();
	});
//	关闭应用列表
$(".jiabeijing").on("click",function(){
	$(".add_app_down").slideUp();
		$(this).hide();
});
//添加各项应用
$(".add_app_down ul li").on("click",function(){
	var ap = $(this).children("b").text();
	var yqgz = '<li class="applic_yqgz"><a href="#"><span></span>舆情跟踪</a></li>';
	var qytp = '<li class="applic_qytp"><a href="#"><span></span>企业图谱</a></li>';
	var gjfx = '<li class="applic_gjfx"><a href="#"><span></span>工具分析</a></li>';
	var dwxg = '<li class="applic_dwxg"><a href="#"><span></span>多维选股</a></li>';
	var gpph = '<li class="applic_gpph"><a href="#"><span></span>股票排行</a></li>';
	var tjyy = '<li class="applic_tjyy"><a href="#"><span></span>添加应用</a></li>';
	if($(this).hasClass("on")){
		$(this).removeClass("on");
		if(ap=="多维选股"){
			$(".app_list li.applic_dwxg").remove();
			return false;
		}
		if(ap=="股票排行"){
			$(".app_list li.applic_gpph").remove();
			return false;
		}
		if(ap=="工具分析"){
			$(".app_list li.applic_gjfx").remove();
			return false;
		}
		if(ap=="企业图谱"){
			$(".app_list li.applic_qytp").remove();
			return false;
		}
		if(ap=="舆情跟踪"){
			$(".app_list li.applic_yqgz").remove();
			return false;
		}
	}else{
		$(this).addClass("on");
		if(ap=="多维选股"){
			$(".app_list ul").prepend(dwxg);
			return false;
		}
		if(ap=="股票排行"){
			$(".app_list ul").prepend(gpph);
			return false;
		}
		if(ap=="工具分析"){
			$(".app_list ul").prepend(gjfx);
			return false;
		}
		if(ap=="企业图谱"){
			$(".app_list ul").prepend(qytp);
			return false;
		}
		if(ap=="舆情跟踪"){
			$(".app_list ul").prepend(yqgz);
			return false;
		}
	}
});
	
});*/
