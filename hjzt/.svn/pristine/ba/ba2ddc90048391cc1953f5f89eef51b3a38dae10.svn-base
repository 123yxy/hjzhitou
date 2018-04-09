logHead();
logFoot();
$(function () {
    // $(".check-code").click(function () {
    //     sendcode();
    // })
    $("#phoneNumLo").val("");
    $("#verification_Code").val("");
    $("#passwordLo").val("");
    $("#passwordLol").val("");
    var smsCodes; //短信验证码计时器
    //登录表单验证
    var rgValidator = $("#regForm").validate({
        rules: {
            phoneNumLo: {
                required: true,
                mobile: true,
                maxlength: 11,
                remote: {
                    url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.isHaveUser, //后台处理程序
                    type: "post", //数据发送方式
                    dataType: "json", //接受数据格式   
                    data: {//要传递的数据
                        phone: function () {
                            return $("#phoneNumLo").val();
                        }
                    },
                    //nieshi 20170907 接口返回Json格式,如接口返回true/false,无需下面代码
                    dataType: 'json',

                    dataFilter: function (data, type) {

                        // console.log(data);
                        var data = JSON.parse(data);
                        result = data.retData;//这个result在ajax外定义了
                        return result ? false : true;

                        // console.log("result:" + result);

                    }
                }
            },
            passwordLo: {
                required: true,
                password: true,
                rangelength: [6, 16]
            },
            passwordLol: {
                required: true,
                password: true,
                rangelength: [6, 16],
                equalTo: "#passwordLo"
            },
            verification_Code: {
                required: true,
                remote: {
                    url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.validationCode, //后台处理程序
                    type: "post", //数据发送方式
                    dataType: "json", //接受数据格式   
                    data: {//要传递的数据
                        mobile: function () {
                            return $("#phoneNumLo").val();
                        },
                        verification_Code: function () {
                            return $("#verification_Code").val();
                        }
                    },
                    //nieshi 20170907 接口返回Json格式,如接口返回true/false,无需下面代码
                    dataType: 'json',

                    dataFilter: function (data, type) {

                        // console.log(data);
                        var data = JSON.parse(data);
                        result = data.retData;//这个result在ajax外定义了
                        return result;

                        // console.log("result:" + result);

                    }
                }
            }
            // agreement:{
            //     required:true
            // }
        },
        messages: {
            phoneNumLo: {
                required: "请填写手机号",
                mobile: "手机号格式不正确",
                maxlength: "手机号最大为11位",
                remote: "您的手机号已经注册"
            },
            passwordLo: {
                required: "请填写密码",
                // password: "密码仅支持数字、字母、字符",
                password: "密码格式不正确",
                rangelength: "密码长度6-12位"
            },
            passwordLol: {
                required: "请填写确认密码",
                // password: "密码仅支持数字、字母、字符",
                password: "密码格式不正确",
                rangelength: "密码长度6-12位",
                equalTo: "两次密码不一致"
            },
            verification_Code: {
                required: "请填写验证码",
                remote: "验证码错误"
            },

            // agreement:{
            //     required:
            // }
        },
        errorElement: "span", //可以用其他标签，记住把样式也对应修改
        success: function (label) {
            //label指向上面那个错误提示信息标签em
            label.text(" ")        //清空错误提示消息
                .addClass("icon-success");  //加上自定义的success类
        },
        showErrors: function (errorMap, errorList) {
            // if (!errorList.length)
            //     return;
            $("#passwordLo-error").removeClass("icon-success");
            $("#phoneNumLo-error").removeClass("icon-success");
            $("#passwordLol-error").removeClass("icon-success");
            $("#verification_Code-error").removeClass("icon-success");

            this.defaultShowErrors();
        }

    });

    //注册keydown事件
    $("#passwordLo,#phoneNumLo").keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#regForm").valid()) {
                reg();
            }
        }
    });

    //提交注册
    $("#reg").on("click", function () {
        if ($("#regForm").valid()) {
            reg();
            return false;
        }
    });
    // var phonePassWord = localStorage.getItem("phone");
    // if (phonePassWord != null && phonePassWord != "") {
    //     $("#phoneNumLo").val(phonePassWord);
    //     $("#passwordLo").val(localStorage.getItem(phonePassWord));
    // }
    //记住密码 回显
    // $("#phoneNumLo").on("blur", function () {
    //     $("#passwordLo").val(localStorage.getItem($("#phoneNumLo").val()));
    // })
    $("#valicode").on("click", function () {
        // if($("#phoneNumLo").val())
        if ($("#regForm").validate().element($("#phoneNumLo")))
            sendSMS($(this));
        // $("#regForm").validate().errorMap.phoneNumLo ? "" : sendSMS($(this));
    })
    $("#agreement").on("click", function () {
        if (this.checked)
            $("#reg").attr("disabled", true);
    })
    function reg() {
        var pwd = md5($("#passwordLo").val());

        param = { mobile: $("#phoneNumLo").val(), verification_Code: $("#verification_Code").val(), password: pwd,isFrozen:0 };
        UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.insertUser, param, false, function (data) {
            if (data.retCode == "0000") {
                var result = data.retData;
                if (result == null) {
                    return false;
                } else {
                    //数据入缓存
                    localStorage.setItem('UU', result.UU);
                    localStorage.setItem('userId', result.userId);
                    localStorage.setItem('phone', result.Phone);
                    // localStorage.setItem('userName', result.UserName);
                    // localStorage.setItem('headImg', result.imageUrl);
                    // localStorage.setItem('signature', result.signature);
                    // localStorage.setItem('qqName', result.qqName);
                    // localStorage.setItem('weChatName', result.weChatName);
                    // localStorage.setItem('weiBoName', result.weiBoName);
                    //记住密码
                    // if ($("#checkboxLo").is(':checked') == true) {
                    //     localStorage.setItem(result.Phone, $("#passwordLo").val());
                    // }
                    // findFollow();

                    window.location.href = "attentionField.html";
                }
            } else {
                $.zmAlert(data.retMsg);
            }
        });
    }
    //短信验证码
    function sendSMS(me) {
        sendSMSCountdown(me);
        param = { phoneNumber: $("#phoneNumLo").val(), type: 1 };
        UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.verificationCode, param, true, function (data) {
            if (data.retCode == "0000") {
                //发送成功
                $("#new_error3").hide();
            } else {
                //发送失败 或者 一分钟只能发一次
                $("#new_error3").empty().html(data.retMsg).show();
            }
        });
    }

    // 短信验证码倒计时
    function sendSMSCountdown(me) {
        clearInterval(smsCodes);
        countDown = 60
        me.addClass("disabled").attr("disabled", "disabled").val(
            countDown + "秒后再发送"); // 最后这个html去掉定时器一秒的延迟
        smsCodes = setInterval(function second() {
            countDown--;
            if (countDown != 0) {
                me.val(countDown + "秒后再发送");
            } else {
                me.val("重新获取验证码").removeClass("disabled").removeAttr("disabled");
                clearInterval(smsCodes);
            }

        }, 1000);
    }
})