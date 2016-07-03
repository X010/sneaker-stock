/**
 * 绑定Tbale
 * 表格具体格式<table> <thead></thead><tbody></tbody></table>
 *
 * conf 配置格式
 * conf.name 字段名
 * conf.type 列类型 1 表示原生   2 表示使用模板
 *
 * eg
 * var data = [
 *            {"id": 1, "name": "test", "status": 1},
 *            {"id": 1, "name": "test", "status": 1},
 *            {"id": 1, "name": "test", "status": 1}];
 *
 *var conf = [
 *           {"name": "id", "type": 1},
 *           {"name": "name", "type": 1},
 *           {"name": "status", "type": 1},
 *           {
 *              "name": null,
 *              "type": 2,
 *              "template": "<a href='http://www.baidu.com?id={id}'>{name}</a>",
 *              "fill": ["id", "name"]
 *           }
 *          ];
 * @param container 容器Table,统一使用容易ID进行管理
 * @param data 表格数据
 * @param conf  配置
 */
function bindTable(container, data, conf) {
    if (container == null || container == 'undefined') alert("容器不允许为空!");
    $("#" + container + " tbody").empty();

    //没有表格配置无法完成表格式
    if (conf == null || conf == 'undefined') alert("无法加载表格配置!");

    //没有数据的情况下使用默认样式
    if (data == null || data == 'undefined')
        $("#" + container + " tbody").append("<div id='nodata'>该列表无数据显示</div>");


    for (var j = 0; j < data.length; j++) { //遍历行配置
        var rowContent = "<tr>";
        for (var i = 0; i < conf.length; i++) //遍历列配置
        {
            if (conf[i].type == 1) {
                //原生填充
                rowContent += "<td>" + (conf[i].name == null ? "" : data[j][conf[i].name]) + "</td>";
            } else if (conf[i].type == 2) {
                //使用模板填充
                var fill = conf[i].fill;
                var template = conf[i].template;
                for (var k = 0; k < fill.length; k++) {
                    var preStr = "{" + fill[k] + "}";
                    var repValue = data[j][fill[k]];
                    template = template.replace(preStr, repValue);
                }
                rowContent += ("<td>" + template + "</td>");
            }
        }
        rowContent += "</tr>";
        $("#" + container + " tbody").append(rowContent);
    }
}


/**
 * 通用的分页功能支持
 * @param container  容器
 * @param url  页面地址
 * @param currentPage  当前页号
 * @param pageNum   每页多少条
 * @param count   总条数
 * @param 自定义参数   URL参数
 *
 * eg
 * pageSplitCompent("outOrderThelibrary.html", 1, 10, 20, {"option": status});
 */
function bindSplitPage(container, url, currentPage, pageNum, count) {
    //获取参数
    var arg = arguments;
    var sUrl = "";
    var scurrentPage = 1;
    var spageNum = 1;
    var scount = 1;
    var param = "";

    $.each(arg, function (key, value) {
        if (key == 0) {
            sUrl = value;
        } else if (key == 1) {
            scurrentPage = value;
        } else if (key == 2) {
            spageNum = value;
        } else if (key == 3) {
            scount = value;
        } else {
            var data = value;
            if (data != null) {
                $.each(data, function (k1, v1) {
                    param += (k1 + "=" + v1 + "&");
                });
            }
        }
    });

    var isShowPre = true;
    var isShowNext = true;
    currentPage = parseInt(currentPage);
    var prePage = currentPage;
    var nextPage = 0;
    var countPage = 0;
    if (count % pageNum == 0) {
        countPage = count / pageNum;
    } else {
        countPage = parseInt(count / pageNum) + 1;
    }
    if (currentPage <= 1) {
        //已经是第一页了
        prePage = 1;
        isShowPre = false;
    } else {
        prePage = currentPage - 1;
    }

    if (countPage >= (currentPage + 1)) {
        nextPage = currentPage + 1;
    } else {
        nextPage = currentPage;
        isShowNext = false;
    }
    var prePageUrl = "";
    var nextPageUrl = "";
    //输同不带搜索参数的

    prePageUrl = url + "?page=" + prePage + "&" + param;
    nextPageUrl = url + "?page=" + nextPage + "&" + param;

    var pageButtom = "";
    if (isShowPre) pageButtom += "<a href='" + prePageUrl + "'>上一页</a>";
    if (isShowNext)pageButtom += "<a href='" + nextPageUrl + "'>下一页</a>";
    $("#" + container).html(pageButtom);
}


/*

 该 jQuery plugin 实现并改自 from https://www.open2space.com/projects/fixedtable.
 布局说明：
 @ #tableDivArea  主容器，用来放置原始表格及修正表格
 @ .table-body   原始表格样式
 @ .fixedArea    修正表格容器
 @ .fixedColumnsFst 修正表格头部样式
 @ .fixedColumnsScd 修正表格尾部样式
 @ .fixedContainer  修正表格滚动内容样式
 @ .fixedTableHeader 修正表格<thead>部分样式
 @ .fixedTableTable  修正表格<tbody>样式

 Example:
 $().ready(function () {
 $("#tableDivArea > table").fixedTable({
 tableId:"goods",
 fixedColumns: [2,6],
 tblWidth:$(this).width()
 });
 window.onload=function(){
 window.onresize = adjust;
 adjust();
 }
 function adjust(obj){
 var w  = document.body.clientWidth;
 $("#tableDivArea .fixedArea").resizeTable(w);
 }
 });

 @param tableId 表格iD
 @param fixedColumns  [{Fnum:头部列个数,[宽度,宽度],{Fnum:尾部位置,[宽度[}
 */
(function($) {
    // 主函数
    $.fn.fixedTable = function(ops) {
        var tbl = this;
        var layout = buildLayout(tbl, ops);
        return tbl;
    };

    $.fn.resizeTable = function(newScreen){
        var _oDiv = this;
        tblResize(_oDiv,newScreen);

    };

    function buildLayout(src, options) {

        var area ;
        //隐藏空表格
        if (src.has("td").length === 0 ){
            area = $("<div class=\"fixedArea\" style=\"display:none;\"></div>").appendTo($(src).parent());
        }else{
            // 创建一个新的DIV ，将表格内容置入
            area = $("<div class=\"fixedArea\"></div>").appendTo($(src).parent());
        }

        // 构建并填充fixedColumnsFst
        var fc = $("<div class=\"fixedColumnsFst\"></div>").appendTo(area);
        var fch = $("<div class=\"fixedTableHeader\"></div>").appendTo(fc);
        var fct = $("<div class=\"fixedTable\"></div>").appendTo(fc);
        buildFixedColumns(src, "thead", options.fixedColumns[0], fch, ":lt");
        buildFixedColumns(src, "tbody", options.fixedColumns[0], fct, ":lt");

        // 构建并填充fixedColumnsScd
        var fcs = $("<div class=\"fixedColumnsScd\"></div></div>").appendTo(area);
        var fchs = $("<div class=\"fixedTableHeader\"></div>").appendTo(fcs);
        var fcts = $("<div class=\"fixedTable\"></div>").appendTo(fcs);
        buildFixedColumns(src, "thead", options.fixedColumns[1]-options.fixedColumns[0], fchs, ":gt");
        buildFixedColumns(src, "tbody", options.fixedColumns[1]-options.fixedColumns[0], fcts, ":gt");

        // 构建并填充fixedContainer
        var fcn = $("<div class=\"fixedContainer\"></div>");
        var fcnh = $("<div class=\"fixedTableHeader\"></div>").appendTo(fcn);
        var fcnt = $("<div class=\"fixedTable\" ></div>").appendTo(fcn);

        fc.after(fcn);

        buildFixedTable(src, "thead", fcnh);

        fcnt.append(src,options);

        tblResize(area,options.tblWidth);

        return area;
    }

    function tblResize(src, tblWidth){
        fixTableWidth(src,tblWidth);
        fixTdwidth(src, "fixedColumnsFst");
        fixTdwidth(src, "fixedContainer");
        fixTdwidth(src, "fixedColumnsScd");
    }
    function fixTableWidth(src,tblwidth){
        var fixedContainerWidth = 0;
        var fixedColumnsFstWidth = 0;
        var fixedColumnsScdWidth = 0;
        // 计算fixedColumns总宽度
        $(".fixedColumnsFst > .fixedTableHeader th",src).each(function() {
            fixedColumnsFstWidth+=parseInt($(this).attr('width'));
        });
        $(".fixedColumnsFst",src).width(fixedColumnsFstWidth+"px");
        $(".fixedColumnsFst table",src).each(function(){
            $(this).attr("width",fixedColumnsFstWidth+"px");
        });

        $(".fixedColumnsScd > .fixedTableHeader th",src).each(function() {
            fixedColumnsScdWidth+=parseInt($(this).attr('width'));
        });
        $(".fixedColumnsScd",src).width(fixedColumnsScdWidth+"px");
        $(".fixedColumnsScd table",src).each(function(){
            $(this).attr("width",fixedColumnsScdWidth+"px");
        });

        // 调整框架布局宽度
        fixedContainerWidth = tblwidth-fixedColumnsFstWidth-fixedColumnsScdWidth;
        var fixdot = 30;
        $(".fixedContainer", src).width((fixedContainerWidth-fixdot) + "px");

        // 计算滚动容器内TH宽度和
        var w=0;
        $(".fixedContainer > .fixedTableHeader th",src).each(function() {
            //scrollw+=parseInt($(this).attr('width'));
            w+=parseInt($(this).attr('width'));
        });

        // 如果w大于布局
        if(w>fixedContainerWidth)
            $(".fixedContainer table",src).each(function(){
                $(this).attr("width",w+"px");
            });
        else
            $(".fixedContainer table",src).each(function(){
                $(this).attr("width","100%");
            })
    }

    function fixTdwidth(src, section){
        var wlist = [];
        $("." + section + " > .fixedTableHeader th",src).each(function() {
            wlist.push(parseInt($(this).attr('width')));
        });
        $("." + section + " > .fixedTable tr",src).each(function() {
            $(this).find("td").each(function(i,e){
                $(this).attr("width",wlist[i]+"px");
            })
        });
    }

    function buildFixedColumns(src, section, cols, target,se) {
        if ($(section, src).length) {
            var colHead = $("<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"></table>").appendTo(target);
            var cellType = "td";  //deafault cell type
            if (section.toLowerCase() == "thead" || section.toLowerCase() == "tfoot") { cellType = "th"; }

            $(section + " tr", src).each(function() {
                var tr = $("<tr></tr>").appendTo(colHead);
                $(cellType + se + "(" + cols + ")", this).each(function() {
                    var vc = ($(this).attr('width')) ? "width="+$(this).attr("width"):"";
                    $("<"+cellType+" "+ vc +">" + $(this).html() + "</"+cellType+">").addClass(this.className).appendTo(tr);
                    $(this).remove();
                });
            });
        }
    }

    function buildFixedTable(src, section, target) {
        if ($(section, src).length) {
            var th = $("<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"></table>").appendTo(target);
            var tr = null;
            var cellType = "td";  //deafault cell type
            if (section.toLowerCase() == "thead" || section.toLowerCase() == "tfoot") { cellType = "th"; }
            $(section + " tr", src).each(function() {
                var tr = $("<tr></tr>").appendTo(th);
                $(cellType, this).each(function() {
                    var vc = ($(this).attr('width')) ? "width="+$(this).attr("width"):"";
                    $("<"+cellType+" "+vc+">" + $(this).html() + "</"+cellType+">").appendTo(tr);
                });

            });
            $(section, src).remove();
        }
    }

})(jQuery);

/**
 * 密码强度验证
 * Example
 * $().ready(function() {
            $("#oldPassword").pwdStrongCheck();
            $("#newPassword").pwdStrongCheck();
            $("#twoPassword").pwdStrongCheck();
        });
 */
(function($) {
    $.fn.pwdStrongCheck = function() {
        $("<div class=\"pwdStrongCheck\"> \
                        <div class=\"pwdLevel\"></div> \
                        <div class=\"pwdLevel\"> </div> \
                        <div class=\"pwdLevel\"> </div>\
                        <div class=\"pwdLevelMsg\"> 弱</div>\
                        <div class=\"pwdLevelMsg\"> 中</div>\
                        <div class=\"pwdLevelMsg\"> 强</div>\
                        </div>").appendTo($(this).parent());
        $(this).focus(function () {
            $(this).keyup();
        });

        $(this).keyup(function(){
            if (!$(this).val()) {
                $(this).parent().find(".pwdStrongCheck").css('display','none');
                Primary(this);
                return;
            }else{
                $(this).parent().find(".pwdStrongCheck").css('display','block');

            }
            if ($(this).val().length < 6) {
                Weak(this);
                return;
            }
            var _r = checkPassword(this);
            if (_r < 1) {
                Primary(this);
                return;
            }

            if (_r > 0 && _r < 2) {
                Weak(this);
            } else if (_r >= 2 && _r < 4) {
                Medium(this);
            } else if (_r >= 4) {
                Tough(this);
            }

        });
    };

    function Primary(o) {
        $(o).parent().find(".pwdStrongCheck div:first-child").attr('class', 'pwdLevel');
        $(o).parent().find(".pwdStrongCheck div:nth-child(2)").attr('class', 'pwdLevel');
        $(o).parent().find(".pwdStrongCheck div:nth-child(3)").attr('class', 'pwdLevel');
    }

    function Weak(o) {
        $(o).parent().find(".pwdStrongCheck div:first-child").attr('class', 'pwdLevelLight');
        $(o).parent().find(".pwdStrongCheck div:nth-child(2)").attr('class', 'pwdLevel');
        $(o).parent().find(".pwdStrongCheck div:nth-child(3)").attr('class', 'pwdLevel');
    }

    function Medium(o) {
        $(o).parent().find(".pwdStrongCheck div:first-child").attr('class', 'pwdLevelLight');
        $(o).parent().find(".pwdStrongCheck div:nth-child(2)").attr('class', 'pwdLevelLight2');
        $(o).parent().find(".pwdStrongCheck div:nth-child(3)").attr('class', 'pwdLevell');
    }

    function Tough(o) {
        $(o).parent().find(".pwdStrongCheck div:first-child").attr('class', 'pwdLevelLight');
        $(o).parent().find(".pwdStrongCheck div:nth-child(2)").attr('class', 'pwdLevelLight2');
        $(o).parent().find(".pwdStrongCheck div:nth-child(3)").attr('class', 'pwdLevelLight3');
    }
    function checkPassword(pwdinput) {
        var maths, smalls, bigs, corps, cat, num;
        var str = $(pwdinput).val();
        var len = str.length;

        var cat = /.{16}/g;
        if (len == 0) return 1;
        if (len > 16) { $(pwdinput).val(str.match(cat)[0]); }
        cat = /.*[\u4e00-\u9fa5]+.*$/;
        if (cat.test(str)) {
            return -1;
        }
        cat = /\d/;
        var maths = cat.test(str);
        cat = /[a-z]/;
        var smalls = cat.test(str);
        cat = /[A-Z]/;
        var bigs = cat.test(str);
        var corps = corpses(pwdinput);
        var num = maths + smalls + bigs + corps;

        if (len < 6) { return 1; }

        if (len >= 6 && len <= 8) {
            if (num == 1) return 1;
            if (num == 2 || num == 3) return 2;
            if (num == 4) return 3;
        }

        if (len > 8 && len <= 11) {
            if (num == 1) return 2;
            if (num == 2) return 3;
            if (num == 3) return 4;
            if (num == 4) return 5;
        }

        if (len > 11) {
            if (num == 1) return 3;
            if (num == 2) return 4;
            if (num > 2) return 5;
        }
    }

    function corpses(pwdinput) {
        var cat = /./g;
        var str = $(pwdinput).val();
        var sz = str.match(cat);
        for (var i = 0; i < sz.length; i++) {
            cat = /\d/;
            maths_01 = cat.test(sz[i]);
            cat = /[a-z]/;
            smalls_01 = cat.test(sz[i]);
            cat = /[A-Z]/;
            bigs_01 = cat.test(sz[i]);
            if (!maths_01 && !smalls_01 && !bigs_01) { return true; }
        }
        return false;
    }

})(jQuery);

/**
 * 按键处理
 */
(function($) {
    $.fn.mouseMove = function(ops){
        var fstElem = elemCheck(this,ops);
        watchTheKey(this);
    };
    function elemCheck(src,options){
        var _oSelf = $(src);
        if(!(options.focusId.length == 0) && $("#" + options.focusId).length){
            $("#" + options.focusId)[0].focus();
            //$("#" + options.focusId).blur();
            //$("#" + options.focusId).css("background-color","#D6D6FF");
        }
    }

    /**
     * 左：37；上：38：右：39；下：40 回车：13
     * 单页面元素编码 1,2,3....n
     * 多行混编  11，22，33....nn
     * @param src
     * @private
     */
    function watchTheKey(src){
        $(document).on("keydown", function (e) {
            if (e.keyCode == 40) {
                var _nobj = _theNext($(document.activeElement));
            }

        });
        $(document).on("keydown", function (e) {
            if (e.keyCode == 38) {
                var _nobj = _thePre($(document.activeElement));
            }

        });

    }

    function _theNext(cobj){
        var __i = 0;
        $('input, textarea, select, button').each(
            function(index){

                if(cobj.is($(this)))
                //alert('Type: ' + input.attr('type') + 'Name: ' + input.attr('name') + 'Value: ' + input.val());
                    __i = index;
                if(index == __i+1) {
                    $(this).focus();
                    //return false;
                }
            }
        );
    }

    function _thePre(cobj){
        var __preObj;
        $('input, textarea, select, button').each(
            function(index){
                if(cobj.is($(this))) {
                    //alert('Type: ' + input.attr('type') + 'Name: ' + input.attr('name') + 'Value: ' + input.val());
                    __preObj && __preObj.focus();
                    return false;
                }
                __preObj = $(this);
            }
        );
    }
})(jQuery);




