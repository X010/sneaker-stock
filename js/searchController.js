/**
 * 搜索并填充数据 商品
 */
function searchAndFull(containerId) {
    var content = $.trim($("#esSearch").val());
    /*if (content == '') {
        runnerAlert("操作提示", '请输入要搜索的商品关键字');
        return false;
    }*/
    //var selectType = $("#goodTypeSelect").val();

    var args = {};
    //if (selectType) args['tid'] = selectType;
    if (node_id_box){
        args['tid'] = node_id_box;
    }
    if (content) args['search'] = content;
    var resGoods = new restGoodsRepository();
    var result = resGoods.findAllByField(1, 100, args);
    var res = {
        'data': result
    };
    if (res){
        //console.log(res);
        //填充数据
        var tableContent = "";
        //$("#" + containerId + " tbody").empty();
        if (res.data && res.data.length) {
            for (var i = 0; i < res.data.length; i++) {
                tableContent += "<tr class='s-item'>";
                tableContent += "<td align='center'><input type='checkbox'  sid='" + res.data[i].id + "' scode='" + res.data[i].code + "' sbarcode='" + res.data[i].barcode + "' sname='" + res.data[i].name + "' name='searchBox' onclick='checkboxSelect(" + res.data[i].id + ",\"" + res.data[i].code + "\",\"" + res.data[i].name + "\",3)' /></td>";
                tableContent += "<td>" + fieldNull(res.data[i].code) + "</td>";
                tableContent += "<td>" + fieldNull(res.data[i].name) + "</td>";
                tableContent += "<td>" + fieldNull(res.data[i].barcode) + "</td>";
                tableContent += "<td>" + fieldNull(res.data[i].spec) + "</td>";
                tableContent += "<td>" + fieldNull(res.data[i].unit) + "</td>";
                //tableContent += "<td>" + fieldNull(res.data[i].tname) + "</td>";
                tableContent += "</tr>";
            }
        } else {
            tableContent += "<tr>";
            tableContent += "<td colspan='7' style='text-align:center;'>没有查询到结果</td>";
            tableContent += "</tr>";
        }
        if (res.data.length >= 100) {
            $('#msg').text('提示：查询结果过多，请缩小范围');
        } else {
            $('#msg').text('');
        }
        $("#" + containerId + "  tbody").html(tableContent);
        $("#" + containerId).show();

        //清空之前已经选择的
        $("#selectedList").html('');
    }

    /* 暂不调用数据搜索接口

    if (selectType != null) {
        if (content != null && content != 'undefined')
            if (content.indexOf("请输入") >= 0) {
                content = "tid:" + selectType + "*";
            } else {
                if (selectType == 0 || selectType == "0") {
                    content = "name:" + content;
                } else {
                    content = "name:" + content + " AND " + "tid:" + selectType + "*";
                }
            }
        else
            content = "tid:" + selectType + "*";
    }
    if (content != null && content != 'undefined' && content.length > 0 && content != '请输入商品信息') {
        $.ajax({
            url: searchUrl + content,
            type: "GET",
            timeout: 30000,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function (data, textStatus) {
                //填充数据
                var res = data;
                $("#" + containerId + " tr:gt(0)").remove();
                if (res.data != null && res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        var barcodeName = res.data[i].name.split("^");
                        res.data[i].name = barcodeName[0];
                        var tableContent = "<tr class='s-item'>";
                        tableContent += "<td><input type='checkbox'  sid='" + res.data[i].id + "' scode='" + res.data[i].code + "' sbarcode='" + barcodeName[1] + "' sname='" + res.data[i].name + "' onclick='checkboxSelect(" + res.data[i].id + ",\"" + barcodeName[1] + "\",\"" + res.data[i].name + "\",3)' name='searchBox' /></td>";
                        //tableContent += "<td>" + res.data[i].id + "</td>";
                        //tableContent += "<td>" + res.data[i].barcode + "</td>"; //条码
                        tableContent += "<td>" + res.data[i].code + "</td>";
                        tableContent += "<td>" + barcodeName[1] + "</td>";
                        tableContent += "<td>" + barcodeName[0] + "</td>";
                        tableContent += "</tr>";
                        $("#" + containerId + "  tr:last").after(tableContent);
                    }
                } else {
                    alert('系统未到相应的商品!searchAndFull');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        });
    } else {
        alert('请输入商品信息');
    }
    */
}

/**
 * 根据查询自己的商品
 * @param containerId

function searchGoodForSelf(containerId) {
    var keyword = $("#esSearch").val();
    var sid = $("#transferOut").val();
    if (sid <= 0) {
        runnerAlert("操作提示", "请选择对应的仓库");
        return false;
    }
    var stockRes = new stockRepository();
    var data = stockRes.readStockInGoods(defaultPage, defaultPageNum, sid, keyword);
    if (data != null && data.data != 0) {
        //绑定数据
        var tres = data.data;
        var res = [];
        for (var i = 0; i < tres.length; i++) {
            res[i] = {
                "gid": tres[i].gid,
                "gname": tres[i].gname,
                "gcode": tres[i].gcode,
                "barcode": tres[i].barcode,
                "price": tres[i].price,
                "spec": tres[i].spec,
                "tname": tres[i].tname,
                "bname": tres[i].bname,
                "tax_rate": tres[i].tax_rate
            };
        }
        $("#" + containerId + " tr:gt(0)").remove();
        for (var i = 0; i < res.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td><input type='radio' onclick='checkboxOrderSelect(" + res[i].gid + ",\"" + res[i].gname + "\",\"" + res[i].gcode + "\",\"" + res[i].barcode + "\",\"" + res[i].bname + "\",\"" + res[i].tname + "\",\"" + res[i].spec + "\",\"" + res[i].tax_rate + "\",\"" + res[i].price + "\")' name='searchBox' /></td>";
            tableContent += ("<td>" + res[i].gcode + "</td>");
            tableContent += ("<td>" + res[i].barcode + "</td>");
            tableContent += ("<td>" + res[i].gname + "</td>");
            tableContent += ("<td>" + res[i].tname + "</td>");
            tableContent += ("<td>" + res[i].spec + "</td>");
            tableContent += ("<td>" + float2percent(res[i].tax_rate) + "</td>");
            tableContent += ("<td>" + res[i].price + "</td>");
            tableContent += "</tr>";
            $("#" + containerId + "  tr:last").after(tableContent);
        }
    } else {
        runnerAlert("操作提示", '系统未到相应的商品');
    }
}
 */
/**
 * 搜索出库商品
 * @param containerId

function searchStoreOutGoods(containerId) {
    var keyword = $("#esSearch").val();
    var storeout = $("#outStore").val();
    var incid = $("#customId").val();
    if (storeout <= 0) {
        runnerAlert("操作提示", "请选择对应的仓库");
        return false;
    }


    var stockRes = new stockRepository();
    var data = stockRes.readStockOutGoods(defaultPage, defaultPageNum, incid, storeout, keyword);
    if (data != null && data.data != 0) {
        //绑定数据
        var res = data.data;
        $("#" + containerId + " tr:gt(0)").remove();
        for (var i = 0; i < res.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td><input type='radio' onclick='checkboxOrderSelect(" + res[i].gid + ",\"" + res[i].gname + "\",\"" + res[i].gcode + "\",\"" + res[i].barcode + "\",\"" + res[i].bname + "\",\"" + res[i].tname + "\",\"" + res[i].spec + "\",\"" + res[i].tax_rate + "\",\"" + res[i].price + "\")' name='searchBox' /></td>";
            tableContent += ("<td>" + res[i].gcode + "</td>");
            tableContent += ("<td>" + res[i].barcode + "</td>");
            tableContent += ("<td>" + res[i].gname + "</td>");
            tableContent += ("<td>" + res[i].tname + "</td>");
            tableContent += ("<td>" + res[i].spec + "</td>");
            tableContent += ("<td>" + float2percent(res[i].tax_rate) + "</td>");
            tableContent += ("<td>" + res[i].price + "</td>");
            tableContent += "</tr>";
            $("#" + containerId + "  tr:last").after(tableContent);
        }
    } else {
        if (data != null) {
            runnerAlert("操作提示", '系统未到相应的商品');
        }
    }
}
 */
/**
 * 搜索入库商品
 * @param containerId

function searchStoreInGoods(containerId) {
    var storein = $("#stockInStore").val();
    var keyword = $("#esSearch").val();
    if (storein <= 0) {
        runnerAlert("操作提示", "请选择对应的仓库");
        return false;
    }
    var stockRes = new stockRepository();
    var data = stockRes.readStockInGoods(defaultPage, defaultPageNum, storein, keyword);
    if (data != null && data.data != 0) {
        //绑定数据
        var res = data.data;
        $("#" + containerId + " tr:gt(0)").remove();
        for (var i = 0; i < res.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td><input type='radio' onclick='checkboxOrderSelect(" + res[i].gid + ",\"" + res[i].gname + "\",\"" + res[i].gcode + "\",\"" + res[i].barcode + "\",\"" + res[i].bname + "\",\"" + res[i].tname + "\",\"" + res[i].spec + "\",\"" + res[i].tax_rate + "\",\"" + res[i].price + "\")' name='searchBox' /></td>";
            tableContent += ("<td>" + res[i].gcode + "</td>");
            tableContent += ("<td>" + res[i].barcode + "</td>");
            tableContent += ("<td>" + res[i].gname + "</td>");
            tableContent += ("<td>" + res[i].tname + "</td>");
            tableContent += ("<td>" + res[i].spec + "</td>");
            tableContent += ("<td>" + float2percent(res[i].tax_rate) + "</td>");
            tableContent += ("<td>" + res[i].price + "</td>");
            tableContent += "</tr>";
            $("#" + containerId + "  tr:last").after(tableContent);
        }
    } else {
        if (data != null) {
            runnerAlert("操作提示", '系统未到相应的商品');
        }
    }

}
 */
/**
var currentRowid = 0;
var currentData = null;
var preRowId = 0;
*/

/**
 * 设置 当前选中ID
 * @param sid

function settingCurrentSid(rid) {
    //保存上一个
    preRowId = currentRowid;

    //设置当前RID
    currentRowid = rid;
}
 */



/*表格中单点移动时触发事件*/
function removeItem(rid, container) {
    $("#" + container).runnerTableRemove(rid, bindAutoComplete);
    var unlock_header = 1;
    $("#" + container + ' tr').each(function(){
        //console.log($(this).find('td').eq(1).find('input').val());
        if ($(this).find('td').eq(1).find('input').val() != '' && typeof($(this).find('td').eq(1).find('input').val()) != 'undefined'){
            unlock_header = 0;
        }
    });
    if (typeof(cleanEmptyTR) == 'function'){
        cleanEmptyTR();
    }
    if (typeof(lockHeader) == 'function'){
        //console.log(unlock_header);
        unlock_header && lockHeader(0);
    }
}

/**
 *添加选中数据到列表
 * @param container

function saveCurrentSelectGoods(container) {
    $("#" + container).runnerTableAppend(currentRowid, currentData, bindAutoComplete);
} */

/**
 * 选择商品

function checkboxOrderSelect(gid, gname, gcode, barcode, bname, tname, spec, tax_rate, pric) {
    currentData = {
        "gid": gid,
        "name": gname,
        "gcode": gcode,
        "barcode": barcode,
        "tname": tname,
        "spec": spec,
        "price": pric,
        "total": 0,
        "amount_price": 0,
        "tax_rate": tax_rate,
        "outtax_price": 0,
        "tax_price": 0
    };
} */

var importGoods = [];

/**
 * 将商品导入到表格
 * @param container

function saveImportToTable() {
    var i = 0;
    $("#selectedList li").each(function () {
            selectIds = $(this).attr('sid');
            selectName = $(this).attr('sname');
            selectCode = $(this).attr('gcode');
            selectBarcode = $(this).attr('barcode');
            selectbname = $(this).attr('bname');
            selecttname = $(this).attr('tname');
            selectspec = $(this).attr('spec');
            selectTax_rate = $(this).attr('tax_rate');
            selectpric = $(this).attr('pric');
            var item = {
                "id": selectIds,
                "name": selectName,
                "gcode": selectCode,
                "barcode": selectBarcode,
                "bname": selectbname,
                "tname": selecttname,
                "spec": selectspec,
                "tax_rate": selectTax_rate,
                "price": selectpric
            };
            importGoods[i] = item;
            i++;
        }
    );
} */

/**
 * 搜索公司
 * @param containerId
 * @param type 客户1，供应商2
 */
function searchCompanyAndFull(containerId, type) {
    var content = $.trim($("#esSearch").val());
    var types = {1: '供应商', 2: '客户'};
    //if (content != null && content != 'undefined' && content.length > 0 && content != '请输入' + types[type] + '信息') {
    if (1) {
        var RCR = new restCompanyRepository();
        var params = {};
        if (content) params['search'] = content;
        if (type == 1) {
            params['search_type'] = 'supplier';
        } else if (type == 2){
            params['search_type'] = 'customer';
        }
        if ($("#areapro").val()) params['areapro'] = $("#areapro").val();
        if ($("#areacity").val()) params['areacity'] = $("#areacity").val();
        if ($("#areazone").val()) params['areazone'] = $("#areazone").val();
        var res = RCR.findAll(1, 100, params);

        $("#" + containerId + " tr:gt(0)").remove();
        var tableContent = '';
        if (res && res.data.length){
            for (var i = 0; i < res.data.length; i++) {
                var name_plus = '';
                if (type == 1) {
                    if (res.data[i].supplier == 1) name_plus = '<span style="color:#3B99FC;">(已添加)</span>';
                } else if (type == 2){
                    if (res.data[i].customer == 1) name_plus = '<span style="color:#3B99FC;">(已添加)</span>';
                }

                var disabled = '';
                if (name_plus){
                    disabled = ' disabled="disabled" ';
                }
                tableContent += "<tr>";
                tableContent += "<td align='center'><input type='checkbox' " + disabled + " sid='" + res.data[i].id + "'  sname='" + res.data[i].name + "' onclick='checkboxSelect(" + res.data[i].id + ",\"" + res.data[i].code + "\",\"" + res.data[i].name + "\"," + type + ")' name='searchBox' /></td>";
                tableContent += "<td>" + res.data[i].code + "</td>";
                tableContent += "<td>" + res.data[i].name + name_plus + "</td>";

                tableContent += "</tr>";
                //$("#" + containerId + "  tr:first").after(tableContent);
            }
            $("#" + containerId ).show();
        } else {
            tableContent += "<tr>";
            tableContent += "<td colspan='3' style='text-align:center;'>没有查询到结果</td>";
            tableContent += "</tr>";
            //$("#" + containerId + "  tr:first").after(tableContent);
        }
        $("#" + containerId + "  tbody").html(tableContent);


        /** 暂不使用搜索系统
        $.ajax({
            url: companySearchUrl + encodeURI(content),
            type: "GET",
            timeout: 30000,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function (data, textStatus) {
                //填充数据
                var res = data;
                $("#" + containerId + " tr:gt(0)").remove();
                if (res.data != null && res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        var tableContent = "<tr>";
                        tableContent += "<td align='center'><input type='checkbox'  sid='" + res.data[i].id + "' scode='" + res.data[i].code + "' sname='" + res.data[i].name + "' onclick='checkboxSelect(" + res.data[i].id + ",\"" + res.data[i].code + "\",\"" + res.data[i].name + "\"," + type + ")' name='searchBox' /></td>";
                        //tableContent += "<td>" + res.data[i].id + "</td>";
                        tableContent += "<td>" + res.data[i].code + "</td>";
                        tableContent += "<td>" + res.data[i].name + "</td>";
                        tableContent += "</tr>";
                        $("#" + containerId + "  tr:last").after(tableContent);
                    }
                    $("#" + containerId ).show();
                } else {
                    runnerAlert("操作提示", '该公司不存在');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        });*/


    } else {
        runnerAlert("操作提示", '请输入' + types[type] + '信息');
    }


}

/**
 * 选中后将选中的数据带到UL LIST中去
 * @param id
 * @param code
 * @param name
 * @param type 供应商1，客户是2，商品是3
 */
function checkboxSelect(id, code, name, type) {
    var add_li = false;
    var del_li = false;

    if (type == 1) {
        $("input[name='searchBox']").each(function () {
            if (parseInt(id) == parseInt($(this).attr("sid"))) {
                //被选中,添加li
                if ($(this).prop('checked')){
                    //被选中,添加li
                    if (existSupplier(id)){ //判断是否存在
                        //已存在
                        $(this).removeAttr("checked");
                        runnerAlert("操作提示", "该公司已经是您的供应商了");
                    } else {
                        //不存在
                        add_li = true;
                    }
                } else {
                    //不选中,移除li
                    del_li = true;

                }

            }
        });

    } else if (type == 2) {
        $("input[name='searchBox']").each(function () {
            if (parseInt(id) == parseInt($(this).attr("sid"))) {
                //被选中,添加li
                if ($(this).prop('checked')){
                    if (existCustomer(id)){ //判断是否存在
                        //已存在
                        $(this).removeAttr("checked");
                        runnerAlert("操作提示", "该公司已经是您的客户了");
                    } else {
                        //不存在
                        add_li = true;
                    }
                } else {
                    //不选中,移除li
                    del_li = true;

                }

            }
        });

    } else if (type == 3) {
        $("input[name='searchBox']").each(function () {
            if (parseInt(id) == parseInt($(this).attr("sid"))) {
                //被选中,添加li
                if ($(this).prop('checked')){
                    if (existGoods(id)){ //判断是否存在
                        //已存在
                        $(this).removeAttr("checked");
                        runnerAlert("操作提示", "该商品已经添加过了");
                    } else {
                        //不存在
                        add_li = true;
                    }
                } else {
                    //不选中,移除li
                    del_li = true;
                }

            }
        });

    }

    /*防止重复添加到SelectList
    $("#selectedList li").each(function () {
        var thisid = parseInt($(this).attr('sid'));
        if (thisid == id) {
            isFlag = true;
        }
    });
    */
    if (add_li) {
        $("#selectedList").append("<li sid='" + id + "' sname='" + name + "' sbarcode='" + code + "'><a class='fa fa-remove' title='从列表中移除' onclick='removeForSelected(" + id + ");'></a> <span class='item-code'>[" + code + "] </span><span class='item-name'>" + name + "</span></li>");
    } else if (del_li){
        $("#selectedList li").each(function(){
            if ($(this).attr('sid') == id){
                $(this).remove();
            }
        });
    }
}

/**
 * 从选出列表移出
 * @param id
 */
function removeForSelected(id) {
    $("#selectedList li").each(function () {
        var thisid = parseInt($(this).attr('sid'));
        if (thisid == id) {
            $(this).remove();
            $("input[name='searchBox']").each(function () {
                if (id == $(this).attr("sid")){
                    $(this).removeAttr("checked");
                }
            });
        }
    });
}


/**
 * 清除所有状态
 */
function clearStatus() {
    $("input[name=searchBox]").each(function () {
        $(this).attr("checked", false);
    });
    $("#selectedList li").each(function () {
        $(this).remove();
    });
    $("#modalStep2").hide();
    $("#modalStep1").show();
    items = [];
}


/**
 * 清除单据商品选择器所有状态
 */
function clearBillStatus(containerId) {
    $("#esSearch").val("");
    $("input[name=searchBox]").each(function () {
        $(this).attr("checked", false);
    });
    $("#selectedList li").each(function () {
        $(this).remove();
    });
    $("#" + containerId + " tbody tr:gt(0)").remove();
    importGoods = [];
}


var items = [];

/**
 * 选择器:下一步
 */
function saveSelected() {
    var i = 0;
    items = [];
    $("#selectedList li").each(function () {
            selectIds = $(this).attr('sid');
            selectName = $(this).attr('sname');
            selectBarcode = $(this).attr('sbarcode');
            var item = {"id": selectIds, "name": selectName, "barcode": selectBarcode};
            items[i] = item;
            i++;
        }
    );
}


/**
 * 供应商信息第二步
 */
function loadSupplierTwo() {
    if (items != null && items.length > 0) {
        $("#supplier2 tbody").empty();
        for (var i = 0; i < items.length; i++) {
            var tableContent = "<tr>";
            //tableContent += "<td>" + items[i].id + "</td>";
            tableContent += "<td><input disabled type='text' id='companyName" + i + "' value='" + items[i].name + "'></td>";
            tableContent += "<td class='name'><input type='text' id='contactor" + i + "' size='10' maxlength='5' value='' /></td>"; //联系人
            tableContent += "<td class='num'><input type='text' id='contactor_phone" + i + "' size='10' maxlength='11' value='' /></td>"; //联系人电话
            tableContent += "<td class='num'><input type='text' id='companyPeriod" + i + "' size='10' maxlength='3' value='30' /></td>"; //供应商账期，默认30天
            tableContent += "<td class='num'><input type='text' id='companyDiscount" + i + "' size='10' maxlength='3' value='100' /></td>"; //供应商折扣，默认100%(不打折)
            tableContent += "<td class='num'><input type='text' id='autoDeleteDays" + i + "' size='10' maxlength='3' value='15' /></td>"; //供应商订单有效期，默认15天
           tableContent += "</tr>";
            $("#supplier2 tbody").append(tableContent);
        }
    }
}


/**
 * 客户信息第二步
 */
function loadCompanyTwo() {
    if (items != null && items.length > 0) {
        $("#custom2 tbody").empty();
        for (var i = 0; i < items.length; i++) {
            var tableContent = "<tr>";
            //tableContent += "<td>" + items[i].id + "</td>";
            tableContent += "<td><input disabled id='companyName" + i + "' type='text' value='" + items[i].name + "'></td>";
            tableContent += "<td><input type='text' id='contactor" + i + "' size='10' maxlength='5' value='' /></td>"; //联系人
            tableContent += "<td><input type='text' id='contactor_phone" + i + "' size='10' maxlength='11' value='' /></td>"; //联系人电话
            tableContent += "<td><div><select class='form-control input-sm' id='companyType" + i + "'><option value='1' selected>经销商</option><option value='2'>酒店饭店</option><option value='3'>商场超市</option><option value='4'>便利店</option></select></div></td>";
            tableContent += "<td><input type='text' id='companyPeriod" + i + "' size='5' value='30' /></td>"; //客户账期，默认30天
            tableContent += "<td><div><select class='form-control input-sm' id='MyStore" + i + "'></select></div></td>"; //为其发货的我方出库仓库
            //tableContent += "<td><div class='table-form-td-wrap'><select class='form-control input-sm' id='MySuid" + i + "'></select></div></td>"; //所属业务员
            tableContent += "<td><div><input style='padding:6px 0 6px 0;' id=\"suname"+i+"\" index=\""+i+"\" name='suname' type=\"text\" class=\"form-control w2\" placeholder=\"请输入员工信息\"/><input id=\"MySuid" + i + "\" type=\"hidden\" value=\"\" /></div></td>"; //所属业务员
            tableContent += "</tr>";
            $("#custom2 tbody").append(tableContent);
            //绑定业务员，与仓库
            bindSelfStore("MyStore" + i);
            //bindSelfUser("MySuid" + i);
            bindAutoCompleteCommon('suname'+i, 'user', false);
        }
    }
}


/**
 * 商品信息第二步
 */
function loadGoodsTwo() {
    if (items != null && items.length > 0) {
        $("#goods2 tbody").empty();
        /*读取供应商列表
        var suppliers = findSupplier();
        var options = '<option value="-1" selected="selected">- 请选择供应商 -</option>';
        if (suppliers != null && suppliers.data != null && suppliers.data.length > 0) {
            suppliers = suppliers.data;
            for (var i = 0; i < suppliers.length; i++) {
                options += "<option value='" + suppliers[i].scid + "'>" + suppliers[i].scname + "</option>"
            }
        }
        options += '<option value="0">（缺省供应商）</option>';
        */

        //填充表格
        for (var i = 0; i < items.length; i++) {
            var tableContent = "<tr>";
            //tableContent += "<td>" + items[i].id + "</td>";
            //tableContent += "<td class='barcode'><input disabled type='text' value='" + items[i].barcode + "'></td>";
            tableContent += "<td class='gname'><input disabled type='text' value='" + items[i].name + "'></td>";
            tableContent += "<td class='company'><input id='c_outName" + i + "' name='companyName' type='text' value=''><input id='c_out" + i + "' name='company' type='hidden' value=''></td>";
            //tableContent += "<td class='company'><div class='table-form-td-wrap'><select class='form-control input-sm' id='c_out" + i + "' >" + options + "</select></div></td>";
            //tableContent += "<td><select  onchange='goodsSelectOnchange(" + i + ")' id='c_out" + i + "' >" + options + "</select></td>";
            //tableContent += "<td><select   id='c_out_store" + i + "'><option value='-1' selected='selected'>- 请选择仓库 -</option></select></td>";
            tableContent += "<td class='price'><input type='text' size='5' name='gprice[]' id='p1" + i + "' /></td>";
            tableContent += "<td class='price'><input type='text' size='5' name='gprice[]' id='p2" + i + "' /></td>";
            tableContent += "<td class='price'><input type='text' size='5' name='gprice[]' id='p3" + i + "' /></td>";
            tableContent += "<td class='price'><input type='text' size='5' name='gprice[]' id='p4" + i + "' /></td>";
            tableContent += "<td class='price'><input type='text' size='5' name='gprice[]' id='p5" + i + "' /></td>";
            tableContent += "<td class='num'><input type='text' size='5' name='weight' id='weight" + i + "' /></td>";
            tableContent += "<td class='num'><select class='form-control' style='height:30px;' id='business" + i + "'></select></td>";
            tableContent += "</tr>";
            $("#goods2 tbody").append(tableContent);
            bindBusinessPracticeSelect('business' + i);
            bindAutoCompleteCommon('c_outName'+i, 'supplier', false);
        }
    }
}

/**
 * 保存供应商信息
 */
function saveSupplierSelected() {
    if (items != null && items.length > 0) {
        var saveItems = [];
        for (var i = 0; i < items.length; i++) {
            var scid = items[i].id;
            var scname = $("#companyName" + i).val();
            var period = num2total($("#companyPeriod" + i).val());
            var auto_delete = num2total($("#autoDeleteDays" + i).val());
            var discount = (num2price($("#companyDiscount" + i).val()) / 100).toFixed(4);
            var contactor = $.trim($("#contactor" + i).val());
            if (!contactor){
                runnerAlert('操作提示', '请填写联系人');
                return false;
            }
            var contactor_phone = parseInt($("#contactor_phone" + i).val());
            if (!contactor_phone){
                runnerAlert('操作提示', '请填写联系人电话');
                return false;
            }
            saveItems[i] = {
                "scid": scid,
                "scname": scname,
                "period": period,
                "discount": discount,
                "auto_delete": auto_delete,
                "contactor": contactor,
                "contactor_phone": contactor_phone,
            };

        }
        res = saveBatchSupplier(saveItems);
        if (res != null) $('#modalImport').modal('hide');
    }
}


/**
 * 保存客户信息
 */
function saveCompanySelected() {
    if (items != null && items.length > 0) {
        var saveItems = [];
        for (var i = 0; i < items.length; i++) {
            if (!checkAutoComplete("MySuid" + i)) return false;
            var ccid = items[i].id;
            var ccname = $("#companyName" + i).val();
            var cctype = $("#companyType" + i).val();
            var period = num2total($("#companyPeriod" + i).val());
            var sid = $("#MyStore" + i).val();
            var suid = $("#MySuid" + i).val();
            var contactor = $.trim($("#contactor" + i).val());
            if (!contactor){
                runnerAlert('操作提示', '请填写联系人');
                return false;
            }
            var contactor_phone = parseInt($("#contactor_phone" + i).val());
            if (!contactor_phone){
                runnerAlert('操作提示', '请填写联系人电话');
                return false;
            }
            saveItems[i] = {
                "ccid": ccid,
                "ccname": ccname,
                "cctype": cctype,
                "period": period,
                "sid": sid,
                "suid": suid,
                "contactor": contactor,
                "contactor_phone": contactor_phone,
            };
        }
        res = saveBatchComstom(saveItems);
        if (res != null) $('#modalImport').modal('hide');
    }
}





/**
 * 供应商与仓库联动
 * @param id

function goodsSelectOnchange(index) {
    var supplierValue = $("#c_out" + index).val();
    if (supplierValue == '0') {
        $("#c_out_store" + index).html('<option value="0" selected="selected">（缺省仓库）</option>');
    } else {
        $("#c_out_store" + index).html("");
        $("#c_out_store" + index).html('<option value="-1">-请选择仓库-</option>');
        if (supplierValue > 0) {
            //读取公司仓库
            var stores = findStoreByGoodsSuppilerId(supplierValue);
            if (stores != null && stores.data != null && stores.data.length > 0) {
                stores = stores.data;
                for (var i = 0; i < stores.length; i++) {
                    $("#c_out_store" + index).append("<option value='" + stores[i].id + "'>" + stores[i].name + "</option>");
                }
                //$("#c_out_store" + index).append("<option value='0'>（缺省仓库）</option>");
            }
        }
    }
}
 */

/**
 * 保存商品选中信息
 */
function saveGoodsSelected(containerId) {
    if (items != null && items.length > 0) {
        //if ($("#stores").val() != null && $("#stores").val() > 0) {
        if (1) {
            var saveItems = [];
            for (var i = 0; i < items.length; i++) {
                var c_out = $("#c_out" + i).val();
                /*
                //var c_out_store = $("#c_out_store" + i).val();
                //if (c_out == '-1' || c_out_store == '-1') {
                if (c_out == '-1') {
                    runnerAlert("操作提示", '请选择供应商');
                    return false;
                }*/
                if (!checkAutoComplete(null, "c_out" + i)) return false;

                var gid = items[i].id;
                //var sid = $("#stores").val();
                var gtid = $("#gtid").val();
                var p1 = $("#p1" + i).val();
                var p2 = $("#p2" + i).val();
                var p3 = $("#p3" + i).val();
                var p4 = $("#p4" + i).val();
                var p5 = $("#p5" + i).val();
                var weight = $("#weight" + i).val();
                var business = $("#business" + i).val();
                saveItems[i] = {
                    "gid": gid,
                    "gtid": gtid,
                    //"in_sid": sid,
                    "out_cid": c_out,
                    //"out_sid": c_out_store,
                    "in_price": p1,
                    "out_price1": p2,
                    "out_price2": p3,
                    "out_price3": p4,
                    "out_price4": p5,
                    "weight": weight,
                    "business": business,
                };
                if (!(p1 && p2 && p3 && p4 && p5)) {
                    runnerAlert("操作提示", '请完善价格信息');
                    return false;
                }
            }
            //saveGoodsPrice(saveItems);
            saveCompanyGoods(saveItems);
            //清空选择器
            if (containerId){
                $("#" + containerId + " tbody").empty();
                $("#" + containerId).parent().next().find('#selectedList li').remove();
            }
        }
        $('#modalImport').modal('hide');
    }
}

/**
 * 判断商品是否存在于仓库之中
 * @param gid

function existStoreGoods(gid) {
    var res = false;
    var storeId = $("#stores").val();
    if (storeId != null && storeId != 'undefined') {
        var postUrl = urlDefault("STORE_GOODS_EXISTS");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "gid": gid,
            "in_sid": storeId
        };
        var data = asyncAjax(postUrl, postData);
        if (data != null) {
            if (data.result) res = true;
        }
    }
    return res;
}
 */
/**
 * 判断商品是否存在
 * @param gid
 */
function existGoods(gid) {
    var res = false;
    if (gid) {
        var postUrl = urlDefault("COMPANY_GOODS_EXISTS");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "gid": gid
        };
        var data = asyncAjax(postUrl, postData);
        if (data != null) {
            if (data.result) res = true;
        }
    }
    return res;
}

/**
 * 判断客户是否存在
 * @param ccid
 */
function existCustomer(ccid) {
    return false; //只有未添加的才能勾选,so 已不需判断
    var res = false;
    var postUrl = urlDefault("CUSTOM_EXISTS");
    var ticket = cookieUtil("ticket");
    var postData = {
        "ccid": ccid,
        "ticket": ticket
    };
    var data = asyncAjax(postUrl, postData);
    if (data != null) {
        if (data.result) res = true;
    }
    return res;
}


/**
 * 判断供应商是否存在
 * @param ccid
 */
function existSupplier(scid) {
    return false; //只有未添加的才能勾选,so 已不需判断
    var res = false;
    var postUrl = urlDefault("SUPPLIER_EXISTS");
    var ticket = cookieUtil("ticket");
    var postData = {
        "scid": scid,
        "ticket": ticket
    };
    var data = asyncAjax(postUrl, postData);
    if (data != null) {
        if (data.result) res = true;
    }
    return res;
}


