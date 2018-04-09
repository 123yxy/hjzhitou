$(function(){
    // 检索
    function search() {
        var valArr=[];
        // var Del=$(".item>b");
        // 点击搜索显示在搜索框
        $(".search-icon").click(function(){
            var html='';
            var inputVal=$(".search>input").val();
            if($.inArray(inputVal,valArr)==-1&&inputVal!="") {
                html += `<span class="item">${inputVal}<b>×</b></span>`;
                valArr.push(inputVal);
            }
            $(".sel-content").append(html)
        })
        //点击小×删除搜索框中当前条件
        $(".sel-content").on("click",".item b",function(e){
            var itemVal=$(e.target).parent().html().replace(" ","");
            var i=itemVal.indexOf("<");
            itemVal=itemVal.slice(0,i);
            valArr.splice($.inArray(itemVal,valArr),1);
            $(e.target).parent().remove();
        });
        // 点击清空筛选
        $(".search span").click(function(){
            $(".item").remove();
            valArr=[];
        })
    }
   search()
});