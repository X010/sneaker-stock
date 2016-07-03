/*表单Table*/
(function ($) {
    var options = null;
    var currentDataIndex = 0;
    var rows = 9;
    var template = null;
    var totalIndex = 0;


    var defaults = {
        onChane: function (conatinerId) {
            return null;
        }
    };


    /**
     * 初始化Table
     */
    $.fn.runnerTableOnStart = function (opt, data, event) {
        if (options != null)  options = opt; //保存配置
        if (opt == null) throw  new Error("配置项为空");

        var sets = $.extend(defaults, event || {});

        $(this).find("tbody").empty();  //清空原始表格
        var tableContent = "";
        rows = opt.rows;
        template = opt.template;
        if (data == null) {
            //填充空数据列表，根据options中的默认多少行来填充
            for (var i = 0; i < rows; i++) {
                var rowStr = "<tr rid='#{index}'>";
                for (var k = 0; k < template.length; k++) {
                    rowStr += "<td class='"+ template[k].class +"'>";
                    //将每列的Row转换为可以识别的行
                    var singleTemplate = template[k];
                    if (singleTemplate != null && singleTemplate.type && singleTemplate.template != null
                        && singleTemplate.template != "undefined" && singleTemplate.template.length > 0) {
                        var occFlag = "#{" + singleTemplate.name + "}";
                        var singleTemplateContent = singleTemplate.template;
                        if (singleTemplateContent.indexOf(occFlag) >= 0) {
                            singleTemplateContent = singleTemplateContent.replaceAll(occFlag, "");
                            rowStr += singleTemplateContent;
                        } else {
                            rowStr += singleTemplate.template;
                        }
                    }
                    rowStr += "</td>";
                }
                rowStr += "</tr>";
                rowStr = rowStr.replace(/#{index}/g, totalIndex);
                tableContent += rowStr;
                totalIndex++;
            }
        } else {
            //有数据需要分开填充 多少数据，及空的列表
            var datalength = data.length;
            var d = 0;
            //保存表格的同时添加数据
            if (rows < datalength) rows = datalength + 1;
            for (var i = 0; i < rows; i++) {
                var rowStr = "<tr rid='#{index}'>";
                for (var k = 0; k < template.length; k++) {

                    var td_rowspan = '';
                    if (data && data[i] && typeof(data[i][template[k].name + '_HTMLrowspan']) != 'undefined'){
                        td_rowspan = ' rowspan="' + data[i][template[k].name + '_HTMLrowspan'] + '" ';
                    } else if (data && data[i] && typeof(data[i][template[k].name + '_HTMLremove']) != 'undefined'){
                        td_rowspan = ' style="display:none;" ';
                    }
                    rowStr += "<td " + td_rowspan + " class='"+ template[k].class +"'>";

                    //将每列的Row转换为可以识别的行
                    var singleTemplate = template[k];
                    if (singleTemplate != null && singleTemplate.type && singleTemplate.template != null
                        && singleTemplate.template != "undefined" && singleTemplate.template.length > 0) {
                        //Type True
                        var occFlag = "#{" + singleTemplate.name + "}";
                        var singleTemplateContent = singleTemplate.template;
                        if (d < datalength) {
                            //需要绑定数据,并换算
                            if (singleTemplateContent.indexOf(occFlag) >= 0) {
                                //进行替换
                                singleTemplateContent = singleTemplateContent.replaceAll(occFlag, data[d][singleTemplate.name]);
                            }

                            rowStr += singleTemplateContent;//不用绑数据和替换
                        } else {
                            //需要绑定数据,并换算
                            if (singleTemplateContent.indexOf(occFlag) >= 0) {
                                //进行替换
                                singleTemplateContent = singleTemplateContent.replace(occFlag, "");
                            }
                            rowStr += singleTemplateContent;//不用绑数据和替换
                        }
                    } else {
                        //TYPE false
                        if (d < datalength) {
                            var fieldValue = data[d][singleTemplate.name];
                            if (fieldValue != null && fieldValue != "undefined" && fieldValue.length > 0)
                                rowStr += fieldValue;
                        }
                    }
                    rowStr += "</td>";
                }
                if (d < datalength) {
                    d++;
                    currentDataIndex++;
                    //console.log(currentDataIndex);
                }
                rowStr += "</tr>";
                rowStr = rowStr.replace(/#{index}/g, totalIndex);

                totalIndex++;
                tableContent += rowStr;
            }

        }
        $(this).find("tbody").append(tableContent);

        //补一行添加行确保有空行可以添加
        if (currentDataIndex >= rows - 1) {
            //添加一行空白行;
            $(this).runnerTableAddBlankRow();
        }

        if (sets != null && sets.onChane != null) {
            sets.onChane(null, true);
        }
        $("tbody input").keydown(function(event){handleKeyEvent(event, $(this));});
    };


    /**
     * 像表格添加数据
     * @param index
     * @param data
     * @param event
     */
    $.fn.runnerTableAppend = function (index, data, event) {
        var currentTemplate = template;

        var sets = $.extend(defaults, event || {});

        /**
         * 开始补充数据
         */
        var rowStr = "";
        totalIndex++;
        for (var i = 0; i < currentTemplate.length; i++) {

            var td_rowspan = '';
            if (template && template[i] && typeof(template[i][template[i].name + '_HTMLrowspan']) != 'undefined'){
                td_rowspan = ' rowspan="' + template[i][template[i].name + '_HTMLrowspan'] + '" ';
            } else if (template && template[i] && typeof(template[i][template[i].name + '_HTMLremove']) != 'undefined'){
                td_rowspan = ' style="display:none;" ';
            }
            rowStr += "<td " + td_rowspan + " class='"+ currentTemplate[i].class +"'>";

            var singleTemplate = template[i];
            if (singleTemplate != null && singleTemplate.type && singleTemplate.template != null
                && singleTemplate.template != "undefined" && singleTemplate.template.length > 0) {

                //Type True
                var occFlag = "#{" + singleTemplate.name + "}";
                var singleTemplateContent = singleTemplate.template;
                //需要绑定数据,并换算
                if (singleTemplateContent.indexOf(occFlag) >= 0) {
                    //进行替换
                    singleTemplateContent = singleTemplateContent.replaceAll(occFlag, data[singleTemplate.name]);
                }
                rowStr += singleTemplateContent;//不用绑数据和替换
            }
            else {
                //type false
                rowStr += data[singleTemplate.name];
            }
            rowStr += "</td>";
            rowStr = rowStr.replace(/#{index}/g, index);
        }
        $(this).find("tbody tr").each(
            function () {
                var rowIndex = $(this).attr("rid");
                if (index == parseInt(rowIndex)) {
                    $(this).html("");
                    $(this).html(rowStr);
                }
            }
        );

        if (currentDataIndex >= rows - 1) {
            //添加一行空白行;
            $(this).runnerTableAddBlankRow();
            //解发表格行数变动事件
            if (sets != null && sets.onChane != null) {
                sets.onChane(totalIndex, false);
            }
        }
        currentDataIndex++;

        //解发行变动事件
        if (sets != null && sets.onChane != null) {
            sets.onChane(index, false);
        }
        $("tbody input").keydown(function(event){handleKeyEvent(event, $(this));});
    };


    /**
     * 添加到最后一行
     */
    $.fn.runnerTableAddBlankRow = function () {

        var currentTemplate = template;

        /**
         * 开始补充数据
         */
        var rowStr = "<tr rid='#{index}'>";
        for (var i = 0; i < currentTemplate.length; i++) {
            rowStr += "<td class='"+ currentTemplate[i].class +"'>";
            var singleTemplate = template[i];
            if (singleTemplate != null && singleTemplate.type && singleTemplate.template != null
                && singleTemplate.template != "undefined" && singleTemplate.template.length > 0) {

                //Type True
                var occFlag = "#{" + singleTemplate.name + "}";
                var singleTemplateContent = singleTemplate.template;
                //需要绑定数据,并换算
                if (singleTemplateContent.indexOf(occFlag) >= 0) {
                    //进行替换
                    singleTemplateContent = singleTemplateContent.replaceAll(occFlag, "");
                }
                rowStr += singleTemplateContent;//不用绑数据和替换
            }
            else {
                //type false
                rowStr += "";
            }
            rowStr += "</td>";
        }
        rowStr += "</tr>";
        totalIndex++;
        //console.log("D"+totalIndex);
        rowStr = rowStr.replace(/#{index}/g, totalIndex);
        $(this).find("tbody tr:last").after(rowStr);

        $("tbody input").keydown(function(event){handleKeyEvent(event, $(this));});
    };

    /**
     * 删除其中一个
     * @param index
     */
    $.fn.runnerTableRemove = function (index, event) {
        var sets = $.extend(defaults, event || {});

        $(this).runnerTableAddBlankRow();

        currentDataIndex--;
        //console.log(currentDataIndex);
        $(this).find("tbody tr").each(function () {
            var rowIndex = $(this).attr("rid");
            if (index == parseInt(rowIndex)) {
                $(this).remove();
            }
        });

        //解发行变动事件
        if (sets != null && sets.onChane != null) {
            sets.onChane(totalIndex, false);
        }

        $("tbody input").keydown(function(event){handleKeyEvent(event, $(this));});
    }
})(jQuery);

String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};

/**
 * 处理键盘事件
 * 目前只处理上下按键
 * @param event
 * @param input
 */
function handleKeyEvent(event, input){
    if ($('#autocomplateDiv').css('display') != 'block') {
        if (event.keyCode == 38 || event.keyCode == 40){
            var idx_td = input.parent().index();
            var idx_tr = input.parent().parent().index();
            if (event.keyCode == 38) { //Up
                idx_tr -= 1;
                idx_tr = idx_tr < 0 ? 0 : idx_tr;
            } else if (event.keyCode == 40) { //Down
                idx_tr += 1;
            }
            //console.log(event.keyCode);
            input.parent().parent().parent().find('tr').eq(idx_tr).find('td').eq(idx_td).find('input').focus();
        }
    }
}
