/**
 * $.customKeyPress
 * @extends jquery.1.11.3
 * $("#box").dialog({
       move: true,
       title: "错误提示",
       buttons: [{
         name: "重置",
         callback: function() {
           alert("重置");
         }
       }, {
         name: "上一步",
         callback: function() {
           alert("上一步");
         }
       }]
   }).dialog("open");
 */
(function($) {
    $.fn.customKeyPress = function(ops){
        initFocus(this,ops);
        watchTheKey(this);
    }
    function initFocus(obj,ops){
        $(obj).focus();
    }
    function watchTheKey(){
        var len = $(":input").length;
        $(":input").keydown(function(e) {
            var key = e.keyCode;
            if (13 == key) {
                var nx = $(":input").index(this) + 1;
                if(len == nx)
                    nx = 0;
                findNext(nx,len);
            }
        });
    }

    function findNext(ix,len){
        while(ix<=len){
            if($(":input:eq(" + ix + ")").attr("disabled") == "disabled") {
                //alert(ix);
                findNext(ix+1,len);
            }
            $(":input:eq(" + ix + ")").focus();
            break;
        }
    }
})(jQuery);






