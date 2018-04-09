
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
// 判断是否需要blobbuilder
var needsFormDataShim = (function() {
		var bCheck = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome');

		return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
	})(),
	blobConstruct = !!(function() {
		try {
			return new Blob();
		} catch (e) {}
	})(),
	XBlob = blobConstruct ? window.Blob : function(parts, opts) {
		var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
		parts.forEach(function(p) {
			bb.append(p);
		});

		return bb.getBlob(opts ? opts.type : undefined);
	};
	
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
//----------------------
function uoploadPic(dataUrl,n) { // n:隐藏域ID
	$("html,body").css("overflow", "auto");
	var fd = needsFormDataShim ? new FormDataShim() : new FormData();
	var files = dataURLtoBlob(dataUrl);
	var url = "";
	if(n == 1){
		url = "/stock/project/uploadLogo.do";
		fd.append("logoFile", files);
		localStorage.setItem("logoImageUrl", dataUrl);
		
	}else if(n == 2){
		url = "/stock/project/uploadCover.do";
		fd.append("coverFile", files);
		localStorage.setItem("coverImageUrl", dataUrl);
	}
	fd.append("stockCode",$("#stockCode").val());
	$.ajax({
		type: "post",
		url: url,
		data: fd,
		async: false,
		processData: false, // 告诉jQuery不要去处理发送的数据
		contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		success: function(data) {
			if(data.retCode == 0000) {
				$("#imgFile"+n).val(data.retData);
				$("#image>img").attr("src", dataUrl);
				$("#imageLeft>img").attr("src", dataUrl);
				$("#imageHead>img").attr("src", dataUrl);
				localStorage.setItem("imageUrl", dataUrl);
				$(".img_box").hide();
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
var file_name = false;
var file_obj = false,nn;
	use_general_upload = false,
	showimg = document.getElementById("showimg");
function selectimg(n,flag) {
	nn=n;
	var e = document.getElementById("i-file" + n);
	var ev = document.createEvent("MouseEvents");
	$("#clipArea").empty();
//	$("#clipBtn").before("<div id='clipArea'></div>");
	$("#clipBtn").unbind("click");
	$("#clipArea").photoClip({
		width: 350,
		height: 152,
		file: "#i-file" + n,
		view: "#preview_img" + n,
		ok: "#clipBtn",
		strictSize: true,
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			uoploadPic(dataURL,n);
		}
	});
	ev.initEvent("click", true, true);
	e.dispatchEvent(ev);
	
};
$("#reselect").click(function(){
	selectimg(nn);
	});
$("#close").click(function(){
	$(".img_box").hide();
	$("html,body").css("overflow", "auto");
	});
if (typeof FileReader === 'undefined' || typeof FormData === 'undefined') {


	use_general_upload = true;
}
var file_name = false;
var file_obj = false,
	use_general_upload = false,
	showimg = document.getElementById("showimg")

$(".imgbox").css("height",$(".addfile ").innerWidth()/1.6+"px");

function onSelectPhoto(files, n) {
	
	var file_head = document.getElementById("i-file" + n);
	var Tbox = document.createElement("a");
	file_obj = files[0];
	if (use_general_upload) {
		return;
	}
	var filesize = file_obj.size < 5120 || file_obj.size > 5242880;
	var allow_type = '|.jpg|jpeg|.png|.gif|';
	var ext_name = '|' + file_obj.name.toLowerCase().substr(file_obj.name.length - 4) + '|';
	var filetype = (allow_type.indexOf(ext_name) == -1);
	var reader = new FileReader();
	reader.onload = function(e) {
		if (e.target.result.substr(0, 11) == 'data:base64') {

			$("#preview_img" + n).attr('src',
				"data:application/octet-stream;" + e.target.result.substr(e.target.result.indexOf("base64,")));


		} else {
			$(".img_box").show();
			$("html,body").css("overflow", "hidden");
//			Tbox.href="javascript:;";
//                Tbox.innerHTML = "预览";
//				file_head.parentNode.appendChild(Tbox);
//				Tbox.onclick=function(){
//					showimg.src=$("#preview_img"+n).attr('src');
//					showimg.style.display="block";
//					}
//				; 
//				showimg.onclick=function(){
//					this.style.display="none";
//					} 
//					$("#preview_img"+n).attr('src', e.target.result);
					
		}
	}
	if (filesize) {
		file_obj = false;
		alert("您选择的文件大于5MB或小于5K，请选择合适的照片");
		return false;
	}
	if (filetype) {
		file_obj = false;
		alert("您选择的文件格式有误，应为JPG、PNG或GIF类型的文件");
		return false;
	}
	file_name = file_obj.name;
	reader.readAsDataURL(file_obj);
}


if (typeof FileReader === 'undefined' || typeof FormData === 'undefined') {
	use_general_upload = true;
}
