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
    $.fn.formBuilder = function(ops){
        if(ops.itemtype == "select") {
            selectBuild($(this), ops);
        }
    }

    function selectBuild(src,ops){
        var _area = $("<span class=\"selectdiv\"></span>");

        // 寻找当前选中值
        var _cval = src.find("option:selected").text();
        var _cindex = src.find("option:selected").val();

        // 寻找预设属性
        var _prep = "";
        $.each(ops.propty,function(index,item){
            _prep += " " + item + "=\"" + src.attr(item) +"\"";
        });

        var _input = $("<input type=\"text\" "+_prep+"/>").appendTo(_area);

        // 设置默认值
        _input.attr("value",_cval);
        _input.attr("index",_cindex);

        var _ul = $("<ul></ul>");
        src.find("option").each(function(){
            $("<li><a href=\"#\" index=\""+ $(this).val() +" title=\""+$(this).text()+"\">"+ $(this).text() +"</a></li>").appendTo(_ul);
        });
        _ul.appendTo(_area);

        // 事件处理
        bindSelect(_area);
        src.after(_area);
        src.remove();
    }

    function bindSelect(src){
        src.find("input").click(function(){
            $(this).parent().find("ul").slideDown('fast');
        });
        src.find("li a").click(function(){
            var x = $(this).text();
            var i = $(this).attr("index");
            $(this).parent().parent().parent().find("input").attr('value',x);
            $(this).parent().parent().parent().find("input").attr('index',i);
            $(this).parent().parent().slideUp('fast');
        });
    }
})(jQuery);