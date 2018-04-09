$(window).load(function () {


    var options =

        {

            thumbBox: '.thumbBox',

            spinner: '.spinner',

            imgSrc: '',
            // zoomable:false,
            // scalable:false,
            // rotatable:false,

        }

    var cropper = $('.imageBox').cropbox(options);

    var img = "";

    $('#upload-file').on('change', function () {
        var reader = new FileReader();

        reader.onload = function (e) {

            options.imgSrc = e.target.result;

            cropper = $('.imageBox').cropbox(options);

            //			getImg();

        }

        reader.readAsDataURL(this.files[0]);
        //		this.files = [];

        setTimeout(getImg, 80);
    })

    // function btnCrop(_callback) {

    //     var base64Str = $(".cropped").children().first().attr("src");
    //     if (base64Str == "/saasBeta/images/tx.png") {
    //         $.zmAlert("请选择新图片");
    //     } else {
    //         uoploadPic(base64Str, _callback);
    //     }
    // }
    // $('#btnCrop').on('click', function(){
    //     var base64Str = $(".cropped").children().first().attr("src");
    //     if(base64Str=="/saasBeta/images/tx.png"){
    //         $.zmAlert("请选择新图片");
    //     }else{
    //         uoploadPic(base64Str,_callback);
    //     }

    // })

    function getImg() {

        img = cropper.getDataURL();
        $('.cropped').html('');

        $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:90px;margin-top:0px;display:none;">');
        // $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:30px;margin-top:10px;" >');
        //		if(imgStr == ""){
        ////			console.log("第一次进入");
        //			getImg();
        //		}
    }

    $(".imageBox").on("mouseup", function () {
        getImg();

    });

    /*$('#btnZoomIn').on('click', function(){
 
        cropper.zoomIn();
 
    })
 
    $('#btnZoomOut').on('click', function(){
 
        cropper.zoomOut();
 
    });*/
    $('#btnZoomOut,#quxiao_btn').on('click', function () {
        $(".uptouxia").hide();
    });
    $("#files").on("click", function () {
        $(".uptouxia").show();
    });

});
function btnCrop(_callback) {

    var base64Str = $(".cropped").children().first().attr("src");
    if (base64Str == "/saasBeta/images/tx.png") {
        $.zmAlert("请选择新图片");
    } else {
        uoploadPic(base64Str, _callback);
    }
}
/**
 * 上传头像
 * @param dataUrl
 */
function uoploadPic(dataUrl,_callback) {
    var fd = new FormData();
    var files = dataURLtoBlob(dataUrl);
    fd.append("file", files);
    _callback(dataUrl);
    // $.ajax({
    //     type: "post",
    //     url: "/user/appUser/uploadUserAvatar.do",
    //     data: fd,
    //     async: false,
    //     processData: false, // 告诉jQuery不要去处理发送的数据
    //     contentType: false, // 告诉jQuery不要去设置Content-Type请求头
    //     success: function(data) {
    //         if(data.retCode == 0000) {
    //             $.zmAlert("上传成功");
    //             var path = data.retData;
    //             localStorage.setItem("headImg", path.path);
    //             //更改头部头像
    //             // $(".avatar_img img").attr("src",path.path);
    //             // $("#imageHead img").attr("src",path.path);
    //             // $(".img_infor").find("span").text("修改头像");
    //             $("#headimg").attr("src", path.path);
    //             $(".uptouxia").hide();
    //         } else {
    //             errorAlert(data.retCode, data.retMsg);
    //         }
    //     }
    // });
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
        } else { }
    }
    return out;
}
