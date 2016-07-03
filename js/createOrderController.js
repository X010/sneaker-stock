var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var currOrderId = "";
var action;
var page;
var order_or_stock = 'order';
/**统计栏目**/
var orderTotalItems = [{'in': 'amount_price[]', 'out': 'sumAmountPrice'}, {'in': 'tax_price[]', 'out': 'sumTaxPrice'}, {'in': 'total[]', 'out': 'sumTotal'}];


/*定义表格结构*/
var opt = {
    "rows": 10,
    "template": [
        {
            "name": "gid",
            "type": true,
            "class" : "op",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"goodsListId\");'></a>",
            "dattr": []
        },
        {
            "name": "code",
            "type": true,
            "class" : "gcode",
            "template": "<input class='f-input-goodname'  index='#{index}' id='rtcode_#{index}' type='text' value='#{code}' size='10' />",
            "fill": []
        },
        {
            "name": "name",
            "type": true,
            "class" : "gname",
            "template": "<input class='f-input-goodname'  index='#{index}' id='rtname_#{index}' type='text' value='#{name}' size='10' />",
            "fill": []
        },
        {
            "name": "barcode",
            "type": true,
            "class" : "barcode",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbarcode#{index}' type='text' value='#{barcode}' size='10' />",
            "dattr": []
        },
        {
            "name": "spec",
            "type": true,
            "class" : "spec",
            "template": "<span class='align-center' id='rtspec_#{index}'>#{spec}</span>",
            "dattr": []
        },
        {
            "name": "price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' id='rtprice_#{index}' onkeyup='priceOnChange(#{index},1)' value='#{price}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' name='total[]' id='rttotal_#{index}' onkeyup='priceOnChange(#{index},2)' value='#{total}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "unit",
            "type": true,
            "class" : "spec",
            "template": "<span class='align-center' id='rtunit#{index}'>#{unit}</span>",
            "dattr": []
        },
        {
            "name": "volume_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' id='rtvolume_price_#{index}' onkeyup='priceOnChange(#{index},4)' value='#{volume_price}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume_#{index}' onkeyup='priceOnChange(#{index},3)' value='#{volume}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "prodate",
            "type": true,
            "class" : "date",
            "template": "<input class='f-input-prodate' name='prodate[]' id='rtprodate_#{index}'  value='#{prodate}' type='text' size='10' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "expdate",
            "type": true,
            "class" : "date",
            "template": "<input class='f-input-expdate' name='expdate[]' id='rtexpdate_#{index}'  value='#{expdate}' type='text' size='10' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "amount_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price disabled' name='amount_price[]' id='rtamount_price_#{index}' value='#{amount_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_rate",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num disabled' id='rttax_rate_#{index}' value='#{tax_rate}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "outtax_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price disabled' id='rtouttax_price_#{index}'  value='#{outtax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price disabled' name='tax_price[]' id='rttax_price_#{index}' value='#{tax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "reserve",
            "type": true,
            "class" : "num",
            "template": "<span id='reserve_#{index}' name='reserve'>#{reserve}</span>",
            "dattr": []
        }
    ]
};


/**
 * 获取表格中添加的商品清单
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            var index = $(this).attr("id").substring(10, $(this).attr("id").length);
            var total = $("#rttotal_" + index).val();
            var price = $("#rtprice_" + index).val();
            var amount_price = $("#rtamount_price_" + index).val();
            goodList[i] = {
                "gid": gid,
                "total": total,
                "unit_price": price,
                "amount_price": amount_price,
            };
            if ($("#rtprodate_" + index).val()){
                goodList[i]['prodate'] = $("#rtprodate_" + index).val();
            }
            if ($("#rtexpdate_" + index).val()){
                goodList[i]['expdate'] = $("#rtexpdate_" + index).val();
            }
            i++;
        }
    });
    return goodList;
}


/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/


/*搜索商品*/


var tempData = null;
var onsearch = function (val, parent, divID) {
    var business = $("#business").val();
    var storein = $("#stockInStore").val();
    var supplier = $("#supplierId").val();
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {
            "business": business,
            "in_sid": storein,
            "out_cid": supplier,
        };
        var send = true;
        if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
            params['barcodes'] = searchVal;
            if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) return false;
        } else {
            params['search'] = searchVal;
        }
        if (send) {
            var res = stockRes.readStockInGoodsByField(1, autoCompletePageNum, params);
            //var res = stockRes.readStockInGoods(1, autoCompletePageNum, storein, searchVal, supplier);
            if (res != null && res.data != null && res.data.length > 0) {
                tempData = res.data;
                var index = parent.attr("index");
                //console.log(index);
                for (var i = 0; i < tempData.length; i++) {
                    list[i] = "<li class='td-tr' sid='" + tempData[i].gid + "'  onclick='selectLiItem(" + index + "," + i + ",\"" + divID + "\")' >";
                    list[i] += "<span class='td item-code'>[" + tempData[i].gcode + "] </span>";
                    list[i] += "<span class='td item-code'>[" + tempData[i].gbarcode + "] </span>";
                    list[i] += "<span class='td item-gname'>" + tempData[i].gname + " </span>";
                    list[i] += "</li>";
                    //list[i] = "<li sid='" + tempData[i].order_id + "'  onclick='selectLiItem(" + index + "," + i + ",\"" + divID + "\")' >" + "<span class='item-code'>[" + tempData[i].order_id + "]</span> <span class='item-name'>" + tempData[i].id + "</span></li>";
                }
            }
        }
    }
    return list;
};


/**
 * 选择UL LI ITEM 并填充数据
 */
function selectLiItem(index, tempIndex, divID) {
    //console.log(index);
    //console.log(tempIndex);
    if (tempData != null && tempData.length > 0) {
        //console.log(tempData[tempIndex]);
        //填充数据到列表
        var appendData = {
            "gid": tempData[tempIndex].gid,
            "barcode": fieldNull(tempData[tempIndex].gbarcode),
            "name": tempData[tempIndex].gname,
            "code": tempData[tempIndex].gcode,
            "bname": fieldNull(tempData[tempIndex].gbname),
            "tname": fieldNull(tempData[tempIndex].gtname),
            "spec": tempData[tempIndex].gspec,
            "prodate": '',
            "expdate": '',
            "unit": tempData[tempIndex].gunit,
            "price": tempData[tempIndex].price,
            "total": '',
            "volume_price": num2price(tempData[tempIndex].price * tempData[tempIndex].gspec),
            "volume": '',
            "amount_price": 0,
            "tax_price": fieldNull(tempData[tempIndex].tax_price, 0), //税额
            "outtax_price": fieldNull(tempData[tempIndex].outtax_price, 0), //去税金额
            "tax_rate": fieldNull(tempData[tempIndex].gtax_rate, 0) * 100, //税率
            "reserve": tempData[tempIndex].reserve,
        };
        var idx = index;
        //console.log(idx);
        $("#goodsListId").runnerTableAppend(idx, appendData, bindAutoComplete);
        $("#rttotal_" + idx).focus();
        lockHeader(1); //禁止修改供应商和进货仓库
    }
    $("#" + divID).toggle();
    if (action == 'co' || action == null) { //订单
        $("#rtprodate_"+idx).attr('disabled', 'disabled').addClass('disabled');
        $("#rtexpdate_"+idx).attr('disabled', 'disabled').addClass('disabled');
    } else { //入库单
        $("#rtprodate_" + idx).datepicker();
        $("#rtexpdate_" + idx).datepicker();
        $(".iconbtn-del").focus(function(){
            $("#datepicker").hide();
        });
    }
}

function lockHeader(lock) {
    if (lock) {
        $('#supplier').attr('disabled', 'disabled');
        $('#stockInStore').attr('disabled', 'disabled');
        $('#business').attr('disabled', 'disabled');
    } else {
        $('#supplier').removeAttr('disabled');
        $('#stockInStore').removeAttr('disabled');
        $('#business').removeAttr('disabled');
    }
}

/**
 * 绑定自动输入框
 */
function bindThisPageAutoComplete(container, isInit) {
    $("input[id*='rtcode_']").each(function () {
        var id = $(this).attr("id");
        if (isInit) {
            $("#" + id).runnerAutoComplete({
                onSearch: onsearch
            })
        } else {
            if (("rtcode_" + container) == id) {
                $("#" + id).runnerAutoComplete({
                    onSearch: onsearch
                })
            }
        }
    });
    $("input[id*='rtname_']").each(function () {
        var id = $(this).attr("id");
        if (isInit) {
            $("#" + id).runnerAutoComplete({
                onSearch: onsearch
            })
        } else {
            if (("rtname_" + container) == id) {
                $("#" + id).runnerAutoComplete({
                    onSearch: onsearch
                })
            }
        }
    });
    $("input[id*='rtbarcode']").each(function () {
        var id = $(this).attr("id");
        if (isInit) {
            $("#" + id).runnerAutoComplete({
                onSearch: onsearch
            })
        } else {
            if (("rtbarcode" + container) == id) {
                $("#" + id).runnerAutoComplete({
                    onSearch: onsearch
                })
            }
        }
    });


}


/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/
/**
 * 加载已审核的订单，供导入到列表中
 */
function loadBillTbale() {
    var in_sname = $('#stockInStore option:selected').text();
    $("#title_import").text('导入订单 [' + in_sname + ']');
    var params = {
        'in_sid': $('#stockInStore').val(),
        'status': '-1', //查询过滤过的
    };
    var data = stockRes.findOrderAllByField(1, 50, params);
    if (data != null && data.data != null) {
        data = data.data;
        $("#pupupContent tbody").empty();
        var tableContent = "";
        for (var i = 0; i < data.length; i++) {
            tableContent += "<tr class='clickable' onclick='trOnClick(\"" + data[i].id + "\");'>";
            tableContent += "<td class='code'><div class='td-wrap'>" + data[i].id + "</div></td>";
            tableContent += "<td class='company'><div class='td-wrap'>" + fieldNull(data[i].out_cname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class='username'><div class='td-wrap'>" + fieldNull(data[i].buname) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "</tr>";
        }
        $("#pupupContent tbody").append(tableContent);
    }
}

/**
 * 表格行单击或回车事件
 */
function trOnClick(trid) {
    currOrderId = trid;
    //读取订单详细信息
    var data = stockRes.findOrderById(currOrderId);
    if (data != null) {
        $("#stockInStore").val(data.in_sid);

        $("#iSupplier").html(data.out_cname);
        $("#supplierId").val(data.out_cid);
        $("#supplier").val(data.out_cid).attr("disabled", "disabled");
        $("#supplierName").val(data.out_cname).attr("disabled", "disabled");

        $("#business").val(data.business);
        $("#memo").val(fieldNull(data.memo));
        $("#iOrderId").html(fieldNull(data.id));
        $("#buid").val(data.buid);
        $("#buname").val(addPhone2Name(data.buname, data.buphone));

        bindOrderRankSelect("rank", data.rank);

        //转换数据格式并绑定数据
        var selectGoods = data.goods_list;
        if (selectGoods != null) {
            //console.log(selectGoods);
            //转换绑定
            var bindData = [];
            for (var i = 0; i < selectGoods.length; i++) {
                bindData[i] = {
                    "gid": selectGoods[i].gid,
                    "name": selectGoods[i].gname,
                    "code": selectGoods[i].gcode,
                    "bname": fieldNull(selectGoods[i].gbname),
                    "tname": fieldNull(selectGoods[i].gtname),
                    "spec": selectGoods[i].gspec,
                    "price": selectGoods[i].unit_price,
                    "prodate": '',
                    "expdate": '',
                    "total": selectGoods[i].total,
                    "amount_price": selectGoods[i].amount_price,
                    "barcode": fieldNull(selectGoods[i].gbarcode),
                    "unit": selectGoods[i].gunit,
                    "volume": computeVolume(selectGoods[i]),
                    "volume_price": computeVolumePrice(selectGoods[i]),
                    "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                    "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                    "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                    "reserve": selectGoods[i].reserve,
                };
            }
            $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
        }
        $("#createExportStockIn").show();
        $("#dirStockIn").hide();

        //点击订单后关闭浮层
        $('#modalImportOrder').modal('hide');

        formOrderTotal(); //统计金额
        //对非空行,绑定日期控件
        $('#goodsListId tr').each(function(){
            if ($(this).find('td').eq(1).find('input').val()) {
                $(this).find('input[name*="prodate"]').datepicker();
                $(this).find('input[name*="expdate"]').datepicker();
            }
        });
    }
}


/**
 * select每次选择时更新客户信息
 */
function changeSupplierId() {
    $("#supplierName").val($("#supplier").find("option:selected").text());
    $("#supplierId").val($("#supplier").val());
}


/**
 * 关闭客户的下拉选择框模式
 */
function offSupplierSelect(){
    inputForHand();
    $('#inputHand').hide();
}

var isHand = 0;
/**
 * 客户选择模式切换
 * @param cname
 */
function inputForHand(cname) {
    isHand = cname == null ? isHand : 0;
    $("#supplierId").val(-1);
    isHand = isHand ? 0 : 1;
    if (isHand){
        $("#supplier").hide();
        $("#supplierName").show().val(cname?cname:'').focus();
        $("#inputHand").html('取消');
    }else{
        $("#supplier").show();
        $("#supplierName").val('').hide();
        $("#inputHand").html('输入');
    }
}
/*---------------------------------------------------华丽的一逼-------------------------------------------------------------------*/



/**
 * 加载新建采购订单
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var orderId = getUrlParam("orderId");
    action = getUrlParam("action");
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        msg = JSON.parse(msg);
        //console.log(msg);
        $("#fullperson").html(msg.name); //默认填单人
        //bindSelfUser('buid', msg.id); //默认采购员
        $("#cuname").html('(空)');
        //bindSupplier("supplier");
        bindSelfStore("stockInStore");
        bindOrderRankSelect("rank", 0);
        bindBusinessPracticeSelect('business');

        changeSupplierId(); //防止没有初始值
        offSupplierSelect(); //关闭客户的下拉选择框模式(注释后则开启双重切换模式)
        bindAutoCompleteCommon('supplierName', 'supplier');
        bindAutoCompleteCommon('buname', 'user');
    }


    //用首行值填充其余行
    $('#goodsListId a[name="datetime"]').click(function(){
        var offset_td = $(this).parent().index();
        var td_prodate = $('#goodsListId tbody tr').eq(0).find('td').eq(offset_td).find('input').val();
        if (td_prodate) {
            $('#goodsListId tr').each(function () {
                if ($(this).find('td').eq(1).find('input').val()) {
                    $(this).find('td').eq(offset_td).find('input').val(td_prodate);
                }
            });
        }
    });

    /*浮层打开和关闭时触发事件*/
    $('#modalImportOrder').on('hide.bs.modal', function () {
        clearBillStatus();
    }).on('show.bs.modal',function(){
        loadBillTbale();
    });

    /**
     *  新建订单
     */
    if (action == null || action == 'undefined') {
        $('#btn-print').remove();
        $('#btn-list').click(function(){
            openParentForFrame('采购订单','/mainframe/stock/checkOrder.html', 121);
        });
        $('#pageName').text("采购订单");
        $('#supplierId').val($('#supplier').val());
        $("#iSupplier").toggle();
        $("#sSupplier").toggle();
        $("#cuname").html('(空)');
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
        $('#goodsListId tr').each(function(){
            $(this).find('input[name*="prodate"]').attr('disabled', 'disabled').addClass('disabled');
            $(this).find('input[name*="expdate"]').attr('disabled', 'disabled').addClass('disabled');
        });
    }

    /**
     * 自定义入库单
     */
    if (action == 'cski') {
        order_or_stock = 'stock';

        //隐藏采购员保存按钮
        $("#btnMdyBuyerWrap").parent().removeClass();
        $("#btnMdyBuyerWrap").hide();

        //console.log("自定义入库单");
        $('#pageName').text("采购入库单");
        $('#btn-print').remove();
        $('#btn-list').click(function(){
            openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html', 161);
        });
        $("#rank").closest(".col-xs-6").hide(); //隐藏紧急度
        $("#newOrder").toggle();
        $("#dirStockIn").toggle();
        $("#importBill").toggle();
        $('#supplierId').val($('#supplier').val());
        $("#iSupplier").toggle();
        $("#sSupplier").toggle();
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }

    //审核订单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'co') {
        currOrderId = orderId;
        //读取订单详细信息
        var data = stockRes.findOrderById(currOrderId);
        $('#pageName').text("采购订单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#rank").val(num2total(data.rank));
            $("#fullperson").html(data.uname);
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#memo").val(fieldNull(data.memo));
            $("#supplierStore").attr("disabled", true);
            $("#stockInStore").attr("disabled", true);
            $("#iOrderId").html(fieldNull(data.id));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#business").val(data.business).attr('disabled', true);
            if (data.mall_orderno) {
                $("#recept").val(data.recept);
                $("#contacts").val(data.contacts);
                $("#phone").val(data.phone);
                $("#mall_info").show();
            }
            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": '',
                        "expdate": '',
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                $('#goodsListId tr').each(function(){
                    $(this).find('input[name*="prodate"]').attr('disabled', 'disabled').addClass('disabled');
                    $(this).find('input[name*="expdate"]').attr('disabled', 'disabled').addClass('disabled');
                });
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购订单','/mainframe/stock/checkOrder.html', 121);
            });
            $("#newOrder").hide();
            $("#checkOrderInfo").show();
        }
    }

    //订单 -> 入库单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'cs') {
        currOrderId = orderId;
        //读取订单详细信息
        var data = stockRes.findOrderById(currOrderId);
        $('#pageName').text("采购订单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#rank").val(num2total(data.rank)).attr('disabled', true);
            $("#fullperson").html(data.uname);
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid).attr("disabled", true);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#memo").val(fieldNull(data.memo));
            $("#iOrderId").html(fieldNull(data.id));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#business").val(data.business).attr('disabled', true);
            //$("#rank").closest(".col-xs-6").hide(); //隐藏紧急度

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": '',
                        "expdate": '',
                        "amount_price": selectGoods[i].amount_price,
                        "barcode": fieldNull(selectGoods[i].gbarcode),
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html?option='+data.status, 161);
            });
            $("#modify_buyer").show();
            $("#newOrder").hide();
            $("#createStockIn").show();
            //stampStatus(fieldNull(data.status));
            for (var j = 0; j < i; j++){ $("#rtprodate_"+j).datepicker(); $("#rtexpdate_"+j).datepicker();}

            //允许修改采购员
            $("#btnMdyBuyer").removeAttr("disabled");
        }

    }

    //查看订单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'seeorder') {
        currOrderId = orderId;
        //读取订单详细信息
        var data = stockRes.findOrderById(currOrderId);
        $('#pageName').text("采购订单");
        bindOrderRankSelect("rank", data.rank);
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(data.uname);
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#memo").val(fieldNull(data.memo));
            $("#supplierStore").attr("disabled", true);
            $("#stockInStore").attr("disabled", true);
            $("#iOrderId").html(fieldNull(data.id));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#business").val(data.business);

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": '',
                        "expdate": '',
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            stampStatus(fieldNull(data.status));
            //console.log(data.status);
            $("#newOrder").hide();
            $("#divbtn-cancel").show();


        }
        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $('#cxdStockIn .btn-add').remove();
        $("#goodsListId tr th").eq(0).remove();
        $('#goodsListId tr').each(function(){$(this).find('td').eq(0).remove();});
    }

    //审核入库单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'cc') {
        order_or_stock = 'stock';
        currOrderId = orderId;
        //读取入库单
        var data = stockRes.findStockInById(orderId);
        $('#pageName').text("采购入库单");
        if (data != null) {
            //绑定数据
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(data.uname);
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid).attr("disabled", true);
            $("#memo").val(fieldNull(data.memo));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#iStockId").html(fieldNull(data.id));
            $("#cuname").html(fieldNull(data.cuname, '(无)'));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#rank").closest(".col-xs-6").hide(); //隐藏紧急度
            $("#business").val(data.business);

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": (selectGoods[i].prodate ? selectGoods[i].prodate : ''),
                        "expdate": (selectGoods[i].expdate ? selectGoods[i].expdate : ''),
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,

                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html?option='+data.status, 161);
            });
            $("#newOrder").hide();
            $("#checkStockIn").show();

            stampStatus(id2text(showInStatusList, data.status));

            for (var j = 0; j < i; j++){ $("#rtprodate_"+j).datepicker(); $("#rtexpdate_"+j).datepicker(); }

            //允许修改采购员
            $("#btnMdyBuyer").removeAttr("disabled");
        }
    }


    //冲单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'cd') {
        order_or_stock = 'stock';
        currOrderId = orderId;
        //读取入库单
        var data = stockRes.findStockInById(orderId);
        $('#pageName').text("采购入库单");
        if (data != null) {
            //绑定数据
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(data.uname);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid).attr("disabled", true);
            $("#memo").val(fieldNull(data.memo));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#iStockId").html(fieldNull(data.id));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#rank").closest(".col-xs-6").hide(); //隐藏紧急度
            $("#business").val(data.business);

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": (selectGoods[i].prodate ? selectGoods[i].prodate : ''),
                        "expdate": (selectGoods[i].expdate ? selectGoods[i].expdate : ''),
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html?option='+data.status, 161);
            });
            //允许修改采购员
            $("#btnMdyBuyer").removeAttr("disabled");
            $("#newOrder").hide();
            $("#cdStockIn").show();
            stampStatus(id2text(showInStatusList, data.status));
            for (var j = 0; j < i; j++) { $("#rtprodate_"+j).datepicker(); $("#rtexpdate_"+j).datepicker(); }
        }
    }

    //修单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'xd') {
        order_or_stock = 'stock';
        currOrderId = orderId;
        //读取入库代
        var data = stockRes.findStockInById(orderId);
        $('#pageName').text("采购入库单");
        if (data != null) {
            //绑定数据
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(data.uname);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid).attr("disabled", true);
            $("#memo").val(fieldNull(data.memo));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#iStockId").html(fieldNull(data.id));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#rank").closest(".col-xs-6").hide(); //隐藏紧急度
            $("#business").val(data.business);

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": (selectGoods[i].prodate ? selectGoods[i].prodate : ''),
                        "expdate": (selectGoods[i].expdate ? selectGoods[i].expdate : ''),
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html?option='+data.status, 161);
            });
            //允许修改采购员
            $("#btnMdyBuyer").removeAttr("disabled");
            $("#newOrder").hide();
            $("#xdStockIn").show();
            stampStatus(id2text(showInStatusList, data.status));
            for (var j = 0; j < i; j++){ $("#rtprodate_"+j).datepicker(); $("#rtexpdate_"+j).datepicker(); }
        }
    }

    //冲单 或 修单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'cxd') {
        order_or_stock = 'stock';
        currOrderId = orderId;
        //读取入库代
        var data = stockRes.findStockInById(orderId);
        $('#pageName').text("采购入库单");
        if (data != null) {
            //绑定数据
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(data.uname);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", true);
            $("#supplierId").val(data.out_cid);
            $("#supplierName").val(data.out_cname);
            $("#stockInStore").val(data.in_sid).attr("disabled", true);
            $("#memo").val(fieldNull(data.memo));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#iStockId").html(fieldNull(data.id));
            $("#buid").val(data.buid);
            $("#buname").val(addPhone2Name(data.buname, data.buphone));
            $("#rank").closest(".col-xs-6").hide(); //隐藏紧急度
            $("#business").val(data.business).attr("disabled", true);

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": (selectGoods[i].prodate ? selectGoods[i].prodate : ''),
                        "expdate": (selectGoods[i].expdate ? selectGoods[i].expdate : ''),
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html?option='+data.status, 161);
            });
            //允许修改采购员
            $("#btnMdyBuyer").removeAttr("disabled");
            $("#modify_buyer").show();
            $("#newOrder").hide();
            $("#cxdStockIn").show();
            stampStatus(id2text(showInStatusList, data.status));
            for (var j = 0; j < i; j++){ $("#rtprodate_"+j).datepicker(); $("#rtexpdate_"+j).datepicker(); }
        }
    }

    //查看入库单
    if (orderId != null && orderId != 'undefined' && orderId.length > 0 && action == 'see') {
        order_or_stock = 'stock';
        currOrderId = orderId;
        //读取入库代
        var data = stockRes.findStockInById(orderId);
        $('#pageName').text("采购入库单");
        if (data != null) {
            //绑定数据 禁止编辑
            if (data.negative_id) $("#negative_id").html(data.negative_id).parent().show();
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(data.uname);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSupplier").html(data.out_cname);
            $("#supplier").val(data.out_cid).attr("disabled", "disabled");
            $("#supplierId").val(data.out_cid).attr("disabled", "disabled");
            $("#supplierName").val(data.out_cname).attr("disabled", "disabled");
            $("#stockInStore").val(data.in_sid).attr("disabled", "disabled");
            $("#memo").val(fieldNull(data.memo)).attr("disabled", "disabled");
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#iStockId").html(fieldNull(data.id));
            $("#buid").val(data.buid).attr("disabled", "disabled");
            $("#buname").val(addPhone2Name(data.buname, data.buphone)).attr("disabled", "disabled");
            $("#rank").closest(".col-xs-6").hide(); //隐藏紧急度
            $("#business").val(data.business);

            //转换数据格式并绑定数据
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "prodate": (selectGoods[i].prodate ? selectGoods[i].prodate : ''),
                        "expdate": (selectGoods[i].expdate ? selectGoods[i].expdate : ''),
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        //"reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购入库单','/mainframe/stock/checkStorageBill.html?option='+data.status, 161);
            });
            $("#newOrder").hide();
            $("#divbtn-cancel").show();
            stampStatus(id2text(showInStatusList, data.status));
            for (var j = 0; j < i; j++){ $("#rtprodate_"+j).datepicker(); $("#rtexpdate_"+j).datepicker(); }
        }
        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $('#cxdStockIn .btn-add').remove();
        $("#goodsListId tr th:first").remove();
        $('#goodsListId tr').each(function(){$(this).find('td:first').remove();});
        $("#goodsListId th:last").remove();
        $('#goodsListId tr').each(function(){$(this).find('td:last').remove();});
    }

    formOrderTotal();// 统计金额
    $("#buid").focus();

    //打印
    $('#btn-print').click(function(){
        if (order_or_stock == 'order' && currOrderId){
            previewPrint(121, currOrderId);
        } else if (order_or_stock == 'stock' && currOrderId){
            previewPrint(161, currOrderId);
        }
    });

    //按钮权限-订单
    if (order_or_stock == 'order' && !checkPower(11001)) {
        $("#btnMdyBuyer").attr('disabled', 'disabled');
    }
    if (!checkPower(11002)) {}
    if (!checkPower(11003)) {}
    if (!checkPower(11004)) {}
    if (!checkPower(11005)) {
        $("#power-11005-1").remove();
        $("#power-11005-2").remove();
    }
    if (!checkPower(11006)) {
        $("#power-11006-1").remove();
        $("#power-11006-2").remove();
    }
    if (!checkPower(11007)) {
        $("#power-11007-1").remove();
        $("#power-11007-2").remove();
    }
    //按钮权限-入库单
    if (order_or_stock == 'stock' && !checkPower(11101)) {
        $("#btnMdyBuyer").attr('disabled', 'disabled');
    }
    if (!checkPower(11102)) {}
    if (!checkPower(11103)) {}
    if (!checkPower(11104)) {}
    if (!checkPower(11105)) {}
    if (!checkPower(11106)) {}
    if (!checkPower(11107)) {}
});

/** ----------------------------------------------- 华丽丽的分割线 ---------------------------------------------------- */



/**
 * 保存订单
 */
function createOrder(modify) {
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        //var orderdate = $("#dataTimeInput").val();
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#supplierId").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', 'supplierId', null)) return false;
        var memo = $("#memo").val();
        var rank = $("#rank").val();
        var business = $("#business").val();
        var postData = {
            "in_sid": in_sid,
            "out_cid": out_cid,
            "buid": buid,
            "memo": memo,
            "rank": rank,
            "business": business,
            //"orderdate": orderdate,
            "goods_list": JSON.stringify(goodList)
        };
        var sres;
        if (modify){
            sres = stockRes.updateOrder(currOrderId, postData);
            if (sres != null) {
                noticeFrame(121, 'refrush', page);
                runnerConfirem("操作提示", "保存成功");
            }
        } else {
            sres = stockRes.addOrder(postData);
            if (sres != null) {
                noticeFrame(121, 'refrush', page);
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/stock/createOrder.html?iframeid=12&iframename=" + encodeURI("新建订单"));
            }
        }

    }
    else {
        runnerAlert("操作提示", "您没有在订单中添加商品");
    }
}

/**
 * 审核订单
 * @param add 是否保存并审核
 */
function checkAndPassOrder(add) {
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#supplierId").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', 'supplierId', null)) return false;
        var memo = $("#memo").val();
        var rank = $("#rank").val();
        var business = $("#business").val();
        var postData = {
            "in_sid": in_sid,
            "out_cid": out_cid,
            "buid": buid,
            "memo": memo,
            "rank": rank,
            "business": business,
            "goods_list": JSON.stringify(goodList)
        };
        var order_id = add ? false : currOrderId;
        var sres = stockRes.checkOrder(order_id, postData);
        if (sres != null) {
            noticeFrame(121, 'refrush', page);
            if (add){
                runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/stock/createOrder.html?iframeid=12&iframename=" + encodeURI("新建订单"));
            } else {
                runnerConfirem("操作提示", "审核通过");
            }
        }
    } else {
        runnerAlert("操作提示", "您没有在订单中添加商品");
    }
}

/**
 * 审核不通过订单
 */
function checkNoPassOrder() {
    if (confirm("确定作废该订单吗？")) {
        var currOrder = getUrlParam("orderId");
        if (currOrder != null && currOrder.length > 0) {
            var sres = stockRes.checkNoPass(currOrder);
            if (sres != null) {
                noticeFrame(121, 'refrush', page);
                runnerConfirem("操作提示", "操作成功");
            }
        }
    }
}



/**
 * 保存入库单
 */
function createStorage(modify) {
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#supplierId").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', 'supplierId', null)) return false;
        var memo = $("#memo").val();
        var business = $("#business").val();
        var postData = {
            "in_sid": in_sid,
            "out_cid": out_cid,
            "buid": buid,
            "memo": memo,
            "business": business,
            "goods_list": JSON.stringify(goodList)
        };
        var sres;
        if (modify) {
            sres = stockRes.updateStockIn(currOrderId, postData);
            if (sres != null) {
                noticeFrame(161, 'refrush', page);
                runnerConfirem("操作提示", "保存成功");
            }
        } else {
            sres = stockRes.directStockIn(postData);
            if (sres != null) {
                noticeFrame(121, 'refrush');
                noticeFrame(161, 'refrush');
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/stock/createOrder.html?action=cski&iframeid=16&iframename=" + encodeURI("新建入库单"));
            }
        }

    } else {
        runnerAlert("操作提示", "您没有在订单中添加商品");
    }
}

/**
 * 生成入库单
 */
function createStorageForOrderId(status) {
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var memo = $("#memo").val();
        var business = $("#business").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', null, null)) return false;
        var postData = {
            "order_id": currOrderId,
            "in_sid": in_sid,
            "memo": memo,
            "buid": buid,
            "business": business,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = stockRes.addStockIn(postData);
        if (sres != null) {
            if (status == 2) {
                noticeFrame(121, 'refrush');
                noticeFrame(161, 'refrush');
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/stock/createOrder.html?action=cski&iframeid=16&iframename=" + encodeURI("新建入库单"));
            } else {
                noticeFrame(121, 'refrush');
                noticeFrame(161, 'refrush');
                runnerConfirem("操作提示", "保存成功");
            }
        }
    }
    else {
        runnerAlert("操作提示", "您没有在订单中添加商品");
    }
}

/**
 * 审核通过入库单
 */
function checkStockIn() {
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#supplierId").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', 'supplierId', null)) return false;
        var memo = $("#memo").val();
        var business = $("#business").val();
        var postData = {
            "in_sid": in_sid,
            "out_cid": out_cid,
            "buid": buid,
            "memo": memo,
            "business": business,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = stockRes.checkStockIn(currOrderId, postData);
        if (sres != null) {
            noticeFrame(161, 'refrush', page);
            runnerConfirem("操作提示", "审核通过");
        }
    } else {
        runnerAlert("操作提示", "您没有在列表中添加商品");
    }

}

/**
 * 保存(生成)并审核 入库单
 * @param build 是否是生成(默认是保存)
 */
function checkAndPassStockIn(build) {
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#supplierId").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', 'supplierId', null)) return false;
        var memo = $("#memo").val();
        var business = $("#business").val();
        var postData = {
            "in_sid": in_sid,
            "out_cid": out_cid,
            "buid": buid,
            "memo": memo,
            "business": business,
            "goods_list": JSON.stringify(goodList)
        };

        if (build){
            var order_id = $('#iOrderId').text();
            postData["order_id"] = order_id;
        }
        var sres = stockRes.checkStockIn(false, postData);
        if (sres != null) {
            noticeFrame(161, 'refrush', page);
            runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/stock/createOrder.html?action=cski&iframeid=16&iframename=" + encodeURI("新建入库单"));
        }
    } else {
        runnerAlert("操作提示", "您没有在列表中添加商品");
    }

}

/**
 * 审核不通过入库单
 */
function checkAndNoPassStockIn() {
    var stockInBillId = currOrderId;
    if (stockInBillId != null && stockInBillId.length > 0) {
        var data = stockRes.checkNoPassStockIn(stockInBillId);
        if (data != null) {
            noticeFrame(161, 'refrush', page);
            runnerConfirem("操作提示", "操作成功");
        }
    }
}

/**
 * 对入库单进行冲单
 */
function cdStockIn() {
    if (confirm("确定红冲该单据?")) {
        var sres = stockRes.stockInFlushBill(currOrderId);
        if (sres != null) {
            noticeFrame(161, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 修正单据
 */
function xdStockIn() {
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#supplierId").val();
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', 'supplierId', null)) return false;
        var memo = $("#memo").val() + " ";
        var business = $("#business").val();
        var postData = {
            "in_sid": in_sid,
            "out_cid": out_cid,
            "memo": memo,
            "buid": buid,
            "business": business,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = stockRes.stockInRepaireBill(currOrderId, postData);
        if (sres != null) {
            noticeFrame(161, 'refrush', page);
            runnerConfirem("操作提示", "修正成功");
        }
    }
    else {
        runnerAlert("操作提示", "您没有在订单中添加商品");
    }
}

/**
 * 修改采购员
 */
function modifyBuyer() {
    if (currOrderId) {
        var buid = $("#buid").val();
        if (!checkAutoComplete('buid', null, null)) return false;
        var postData = {
            "buid": buid,
        };
        var sres;
        if (order_or_stock == 'order'){
            sres = stockRes.updateOrder(currOrderId, postData);
            if (sres != null) {
                noticeFrame(121, 'refrush', page);
                runnerAlert("操作提示", "修改成功");
            }
        } else {
            sres = stockRes.updateStockIn(currOrderId, postData);
            if (sres != null) {
                noticeFrame(161, 'refrush', page);
                runnerAlert("操作提示", "修改成功");
            }
        }

    } else {
        runnerAlert("操作提示", "单号错误");
    }
}
