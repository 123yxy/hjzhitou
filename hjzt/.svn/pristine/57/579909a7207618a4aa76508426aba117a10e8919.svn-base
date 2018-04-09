

// 引导页功能
$(function(){

	var coverGuide = function(cover, target) {  
	    var body = document.body, doc = document.documentElement;  
	    if (cover && target) {  
	        // target size(width/height)  
	        var targetWidth = target.clientWidth,  
	            targetHeight = target.clientHeight;  
	        // page size  
	        var pageWidth = doc.scrollWidth,  
	            pageHeight = doc.scrollHeight;  
	        // offset of target      
	        var offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop),  
	            offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft);  
	        // set size and border-width  
	        cover.style.width = targetWidth + 'px';  
	        cover.style.height = targetHeight + 'px';      
	        cover.style.borderWidth =   
	            offsetTop + 'px ' +   
	            (pageWidth - targetWidth - offsetLeft) + 'px ' +  
	            (pageHeight - targetHeight - offsetTop) + 'px ' +   
	            offsetLeft + 'px';  
	        
	         
	         
	        // resize  
	        if (!cover.isResizeBind) {  
	            if (window.addEventListener) {  
	                window.addEventListener('resize', function() {  
	                    coverGuide(cover, target);  
	                });      
	                cover.isResizeBind = true;  
	            } else if (window.attachEvent) {  
	                window.attachEvent('onresize', function() {  
	                    coverGuide(cover, target);  
	                });  
	                cover.isResizeBind = true;  
	                  
	                // IE7, IE8 box-shadow hack  
	                cover.innerHTML = '<img src="guide-shadow.png">';  
	            }  
	        }  
	    }  
	};  
	  
	var elCover = document.getElementById('cover');  
	
	var guideCatalog       = document.getElementById("guide_catalog"); 
	var guideContent     = document.getElementById("guide_content");  
	var guideData       = document.getElementById("guide_data");   
 	var guideMarket        = document.getElementById("guide_market");
 	var guideChart        = document.getElementById("guide_chart");
 	var guideUpload       = document.getElementById("guide_upload");   
	// var guide      = document.getElementsByClassName("guide");  

	var guide     = document.getElementsByClassName("guide_btn");  

	console.log(guide.length)
	var arrElTarget = [guideCatalog,
					guideContent,
					guideData,
					guideMarket,
					guideChart,
					guideUpload
		// header,header,
	 //    document.getElementById('left'),   
	 //    document.getElementById('middle'),
	 //    document.getElementById('right')
	], index =0;
	console.log(index);
	 
	coverGuide(elCover,arrElTarget[index]);
	cover.style.display = 'block';  

	for(var i=0;i<guide.length;i++){
	    guide[i].onclick = function() {
	    $(this).parent(".guide").hide().next().show();
	    index++;
	    if (!arrElTarget[index]) {  
	        $("#cover").hide();
	        $('#guide_data').hide();
	        $('#guide_market').hide();
	        $('#guide_chart').hide();
	        $('#guide_upload').hide();
	        $('#guide_catalog').hide();
	        $('#guide_content').hide();
			
	        // index = 0;      
	    }
	    coverGuide(elCover, arrElTarget[index]);  
	    };
	}
    console.log(index);
})