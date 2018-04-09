//var Phone = localStorage.getItem("phone"); //浏览器缓存手机号
$(window).load(function() {


	var options =

	{

		thumbBox: '.thumbBox',

		spinner: '.spinner',

		imgSrc: ''

	}

	var cropper = $('.imageBox').cropbox(options);

	var img="";

	$('#upload-file').on('change', function(){
		var reader = new FileReader();

		reader.onload = function(e) {

			options.imgSrc = e.target.result;

			cropper = $('.imageBox').cropbox(options);

//			getImg();

		}

		reader.readAsDataURL(this.files[0]);
//		this.files = [];

		setTimeout(getImg,80);
	})

	$('#btnCrop').on('click', function(){
		var base64Str = $(".cropped").children().first().attr("src");
		if(base64Str=="../../saasBeta/images/Image/big-tou.png"){
			alert("重新选择图片")
		}else{
			uoploadPic(base64Str);
localStorage.headImg=base64Str;
		}

	})

	function getImg(){

		img = cropper.getDataURL();
		$('.cropped').html('');

		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:90px;margin-top:0px;">');
//		if(imgStr == ""){
////			console.log("第一次进入");
//			getImg();
//		}
	}

	$(".imageBox").on("mouseup",function(){
 		getImg();

  		});

	/*$('#btnZoomIn').on('click', function(){

		cropper.zoomIn();

	})

	$('#btnZoomOut').on('click', function(){

		cropper.zoomOut();

	});*/
	$('#btnZoomOut,#quxiao_btn').on('click', function(){
		$(".tou-box").hide();
	});
	// $("#crop-avatar").on("click",function(){
	// 	$(".uptouxia").show();
	// });

});

/**
 * 上传头像
 * @param dataUrl
 */

function uoploadPic(dataUrl) {
	//var formData = new FormData();
	//var files = dataURLtoBlob(dataUrl);
	//formData.append("thumb",files);
    var paraminfo='{"body":{"phone":"'+localStorage.getItem("phone")+'","thumb":"'+dataUrl+'"}}';
    /*$.ajax({
    	url:'/beta/public.do',
		type:'post',
		data: {"paraminfo":paraminfo},
        async: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function(xhr) {
            xhr.setRequestHeader("RequestType", "U512");
            xhr.setRequestHeader("AppCode", 002);
            xhr.setRequestHeader("SessionId", '1111');
            xhr.setRequestHeader("PhoneNum", localStorage.getItem("phone"));
            xhr.setRequestHeader("SendTime", generateTimeReqestNumber());
        },
		success : function (data) {
			console.log(data);
        }
	})*/
    $.axsRequest("U512",paraminfo,false,function(data){
        console.log(data);
        if(data.retCode=="0000"){
            // history.go(0);
            window.location.href="../../personalCenter/personalCenter.html";
        }else{
            errorAlert(data.retCode,data.retMsg);
        }
    });
}

//把图片转成formdata 可以使用的数据...
//这里要把\s替换掉..要不然atob的时候会出错....
function dataURLtoBlob(data) {
	var tmp = data.split(',');

	tmp[1] = tmp[1].replace(/\s/g, '');
	var binary = atob(tmp[1]);
	var array = [];
	for (var i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new newBlob(new Uint8Array(array), 'image/jpeg');
}

function newBlob(data, datatype) {
	var out;
	try {
		out = new Blob([data], {
			type: datatype
		});
	} catch (e) {
		window.BlobBuilder = window.BlobBuilder ||
			window.WebKitBlobBuilder ||
			window.MozBlobBuilder ||
			window.MSBlobBuilder;

		if (e.name == 'TypeError' && window.BlobBuilder) {
			var bb = new BlobBuilder();
			bb.append(data.buffer);
			out = bb.getBlob(datatype);
		} else if (e.name == "InvalidStateError") {
			out = new Blob([data], {
				type: datatype
			});
		} else {}
	}
	return out;
}
