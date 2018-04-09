// 注册头部
function logHead(){
    var logHead = '<img src="/saasBeta/yanbao/images/logo-loginReg.png" alt="">';
    $(".logHead").append(logHead)
};

// 注册尾部
function logFoot(){
    var logFoot = '<p><a href="">圣康汇金</a>  ·  <a href="">三板数据库</a>  ·  <a href="">微信服务号</a>  ·  <a href="">联系我们</a></p>';
    logFoot += '<p>@2017圣康汇金  ·  京ICP备11029652号</p>';
    $(".logFoot").append(logFoot)
}

// 个人中心头部
function userHead(){
    var userHead = '<div class="cotainer">';
    userHead += '<div class="col-lg6 col-md-6 col-sm-6 userHead-logo"><img src="/saasBeta/yanbao/images/logo.png"></div>';
    userHead += '</div>';
    $(".userHead").append(userHead)
}

// 发送验证码
function sendcode() {
    var time = 120;
    var checkCode = $(".check-code");
    function countDown() {
        checkCode.attr("disabled", true).val("剩余(" + time + "s)");
        if (time == 0) {
            checkCode.val("获取验证码").removeAttr("disabled");
            clearInterval(countdown);
        }
        time--;
    }
    var countdown = setInterval(countDown, 1000);
}

/**
 * 判断字符串是否为空
 * @param str
 * @returns
 */
function isStrKong(str) {
    return ((str == null || str == "" || str == undefined) ? "--" : str);
}

/**
 * 判断数字是否为空
 * @param sz
 * @returns
 */
function isSZKong(sz) {
    return ((sz == null || sz == undefined || (sz == "" && sz != 0)) ? "-" : sz);
}