/*自动输入提示*/
(function ($) {

    var currentItemLi = null;
    var currentItemLiIndex = 0;

    var defaults = {
        onSearch: function (val) {
            return null;
        }
    };


    $.fn.runnerAutoComplete = function (opts) {
        var sets = $.extend(defaults, opts || {});
        var preText = "";
        $(this).keyup(function (event) {
            //console.log(event.which);
            switch (event.which) {
                case 40:
                    //向下
                    var upDownCount = $("#autocomplateDivUL li").length;
                    if (currentItemLiIndex < upDownCount - 1) {
                        //向下一行
                        $('#autocomplateDiv li').removeClass("currentAutoCompentBackColor");
                        currentItemLiIndex += 1;
                        currentItemLi = $("#autocomplateDiv li:eq(" + currentItemLiIndex + ")");
                        currentItemLi.addClass("currentAutoCompentBackColor");
                    }
                    break;
                case 38:
                    //向上
                    var upCount = $("#autocomplateDivUL li").length;
                    if (currentItemLiIndex > 0) {
                        $('#autocomplateDiv li').removeClass("currentAutoCompentBackColor");
                        currentItemLiIndex -= 1;
                        currentItemLi = $("#autocomplateDiv li:eq(" + currentItemLiIndex + ")");
                        currentItemLi.addClass("currentAutoCompentBackColor");
                    }
                    break;
                case 13:
                    //回车
                    if (currentItemLi != null) {
                        currentItemLi.trigger("click");
                    }
                    break;
                case 86:
                    //容错(键盘粘贴)
                    break;
                default :
                    currentItemLi = null;
                    currentItemLiIndex = -1;
                    var container = $("#autocomplateDiv").length;
                    if (container <= 0) {
                        $("body").append("<div class='autocomplaete dm-shadow' id='autocomplateDiv'><ul id='autocomplateDivUL'></ul></div>");
                    }
                    container = $("#autocomplateDiv");
                    var input = $(this);
                    var offset = input.offset();
                    var containerUl = $("#autocomplateDivUL");
                    containerUl.html("");
                    var textValue = $(this).val();
                    if (textValue != null && textValue != "undefined") {
                        if (textValue != preText) {
                            var res = sets.onSearch(textValue, $(this), "autocomplateDiv");
                            if (res && res.length > 0) {
                                container.css("position", "absolute").css('left', offset.left + 'px').css('top', offset.top + input.height() + 12 + 'px').fadeIn(20);
                            } else {
                                container.fadeOut(0);
                            }
                            if (res != null) {
                                for (var i = 0; i < res.length; i++) {
                                    //将内容填充到DIV中
                                    containerUl.append(res[i]);
                                }
                            }
                        }
                        preText = textValue;
                    }

                    //如果Li 不为空。则更一条是选中状态
                    var liCount = $("#autocomplateDivUL li").length;
                    if (liCount > 0) {
                        currentItemLi = $('#autocomplateDiv li:first-child');
                        currentItemLiIndex = 0;
                        currentItemLi.addClass("currentAutoCompentBackColor");
                    }
                    break;
            }
        });
    };


    $.fn.runnerAutoCompleteAndSearch = function (searchFun, type, need_refrush, callback) {
        var preText = "";
        $(this).keyup(function (event) {
            switch (event.which) {
                case 40:
                    //向下
                    var upDownCount = $("#autocomplateDivUL li").length;
                    if (currentItemLiIndex < upDownCount - 1) {
                        //向下一行
                        $('#autocomplateDiv li').removeClass("currentAutoCompentBackColor");
                        currentItemLiIndex += 1;
                        currentItemLi = $("#autocomplateDiv li:eq(" + currentItemLiIndex + ")");
                        currentItemLi.addClass("currentAutoCompentBackColor");
                    }
                    break;
                case 38:
                    //向上
                    var upCount = $("#autocomplateDivUL li").length;
                    if (currentItemLiIndex > 0) {
                        $('#autocomplateDiv li').removeClass("currentAutoCompentBackColor");
                        currentItemLiIndex -= 1;
                        currentItemLi = $("#autocomplateDiv li:eq(" + currentItemLiIndex + ")");
                        currentItemLi.addClass("currentAutoCompentBackColor");
                    }
                    break;
                case 13:
                    //回车
                    if (currentItemLi != null) {
                        currentItemLi.trigger("click");
                    }
                    break;
                case 86:
                    //容错(键盘粘贴)
                    break;
                default :
                    currentItemLi = null;
                    currentItemLiIndex = -1;
                    var container = $("#autocomplateDiv").length;
                    if (container <= 0) {
                        $("body").append("<div class='autocomplaete dm-shadow' id='autocomplateDiv'><ul id='autocomplateDivUL'></ul></div>");
                    }
                    container = $("#autocomplateDiv");
                    var input = $(this);
                    var offset = input.offset();
                    var containerUl = $("#autocomplateDivUL");
                    containerUl.html("");
                    var textValue = $(this).val();
                    if (textValue != null && textValue != "undefined") {
                        if (textValue != preText) {
                            var res = searchFun($.trim(textValue), $(this), "autocomplateDiv", type, need_refrush, callback);
                            if (res && res.length > 0) {
                                container.css("position", "absolute").css('left', offset.left + 'px').css('top', offset.top + input.height() + 12 + 'px').fadeIn(20);
                            } else {
                                container.fadeOut(0);
                            }
                            if (res != null) {
                                for (var i = 0; i < res.length; i++) {
                                    //将内容填充到DIV中
                                    containerUl.append(res[i]);
                                }
                            }
                        }
                        preText = textValue;
                    }

                    //如果Li 不为空。则更一条是选中状态
                    var liCount = $("#autocomplateDivUL li").length;
                    if (liCount > 0) {
                        currentItemLi = $('#autocomplateDiv li:first-child');
                        currentItemLiIndex = 0;
                        currentItemLi.addClass("currentAutoCompentBackColor");
                    }
                    break;
            }
        });
    };


    $(document).click(function (event) {
        $("#autocomplateDiv").fadeOut(20);
        event.stopPropagation();
    });
})
(jQuery);

