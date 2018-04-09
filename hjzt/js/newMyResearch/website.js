var Website = {
	run: function(){
		oScroll1 = $('#scrollbar1');
		if(oScroll1.length > 0){
			oScroll1.tinyscrollbar();
		}
		var oScroll2 = $('#scrollbar2');
		if(oScroll2.length > 0){
			oScroll2.tinyscrollbar();
		}
		var oScroll3 = $('#scrollbar3');
		if(oScroll3.length > 0){
			oScroll3.tinyscrollbar();
		}
		var oScroll4 = $('#scrollbar4');
		if(oScroll4.length > 0){
			oScroll4.tinyscrollbar();
		}
		var oScroll5 = $('#scrollbar5');
		if(oScroll5.length > 0){
			oScroll5.tinyscrollbar();
		}
		var oScroll6 = $('#scrollbar6');
		if(oScroll6.length > 0){
			oScroll6.tinyscrollbar();
		}
					
		Cufon.replace('h2, h1, a.download');
		
		var oCon = document.getElementById('mcon');
		var oLink = document.createElement('a');
		var oText = document.createTextNode("me"); 
		var sPart0 = 'ma';
		var sPart1 = 'ilto:wie';
		var sPart2 = 'ringen';
		var sPart3 = '@gm';	
		var sPart4 = 'ail.com';
		oLink.href = sPart0+sPart1+sPart2+sPart3+sPart4;
		
		//var ding = document.evaluate("//h2", document, null, 8, null);
		//console.log(ding.singleNodeValue);

		
	}
};


//Initialize
//$(document).ready(function(){
//	
//});