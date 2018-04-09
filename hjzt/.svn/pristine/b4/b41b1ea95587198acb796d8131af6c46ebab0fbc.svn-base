var ver = {
    S4: function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    metacache: function (c) {
        var version = "" || this.S4();
        if (c === 1) {//参数1指明conver.html调用，参数自行扩展
            document.write("<s" + "cript type='text/javascript' src='js/common/util.js?v=" + version + "'></s" + "cript>")

            document.write("<s" + "cript type='text/javascript' src='js/catalogue.js?v=" + version + "'></s" + "cript>")            

            document.write("<s" + "cript type='text/javascript' src='js/bus/section01.js?v=" + version + "'></s" + "cript>");

            document.write("<s" + "cript type='text/javascript' src='js/bus/section02.js?v=" + version + "'></s" + "cript>");

            document.write("<s" + "cript type='text/javascript' src='js/bus/section03.js?v=" + version + "'></s" + "cript>");

            document.write("<s" + "cript type='text/javascript' src='js/bus/section04.js?v=" + version + "'></s" + "cript>");

            var _head = document.head;
            var common = this.createEle("css/common.css?v="+version);
            _head.insertBefore(common,document.getElementsByTagName("title")[0]);
            // _head.insertBefore("  <link rel=\"stylesheet\" href=\"css/common.css?v="+ version +"\" />","title")
            // _head.appendChild("  <link rel=\"stylesheet\" href=\"css/common.css?v="+ version +"\" />");
            // _head.appendChild("  <link rel=\"stylesheet\" href=\"css/user.css?v="+ version +"\" />");
            // _head.appendChild("  <link rel=\"stylesheet\" href=\"css/cover.css?v="+ version +"\" />");
        }
    },
    createEle :function(href){
        var newEle = document.createElement("link");
        newEle.setAttribute("rel","stylesheet");
        newEle.setAttribute("href",href);
        return newEle;
    }
}