/**
 * Created by marsidea on 16/3/21.
 */

function fixTables(){
    var stable = $(".table-body table");
    var stable_w = $(".table-body").width();
    var th_top = $(".table-body table").offset().top;
    var thWrap = $("<div style='height:40px; z-index: 10; position: absolute; left: 0; top:0; overflow-y: hidden;'></div>");
    //var colWrap = $("<div style='position: absolute; z-index: 11; left: 0; top:0; height: 860px; width: 100px; background: #CCCCCC;'></div>");

    //监听滚动事件
    $(window).scroll(function(){
        var eleTop = $(window).scrollTop();
        thWrap.empty();

        //表头接触顶部时，固定显示
        if(parseInt(eleTop) > (th_top - 90)){
            $(".table-body").append(thWrap);
            stable.clone().appendTo(thWrap);
            thWrap.css({top:eleTop-th_top+90,width:stable_w}).fadeIn(10);
        }else{
            thWrap.fadeOut(0);
        }

    });
}

