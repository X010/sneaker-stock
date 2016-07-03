var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();

var currOrderId = ""; //保存当前订单号
var currAction = ""; //保存操作
var edit = false;
var needRecreate = true; //操作完成后是否进行新建
var page;

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
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" href='javascript:removeItem(#{index},\"goodsListId\");'>移出</a>",
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
            "template": "<span class='readonly' id='rtspec_#{index}'>#{spec}</span>",
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
            "template": "<input class='f-input-num' id='rttotal_#{index}' name='total[]' onkeyup='priceOnChange(#{index},2)' value='#{total}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "unit",
            "type": true,
            "class" : "spec",
            "template": "<span class='readonly' id='rtunit#{index}'>#{unit}</span>",
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
            "name": "amount_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price disabled' id='rtamount_price_#{index}' name='amount_price[]' value='#{amount_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        }
        ,
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
            "template": "<input class='f-input-price disabled' id='rttax_price_#{index}' name='tax_price[]' value='#{tax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "reserve",
            "type": true,
            "class" : "num",
            "template": "<span class='readonly' id='reserve_#{index}'>#{reserve}</span>",
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
            i++;
        }
    });
    return goodList;
}


/**
 * 添加商品至订单列表
 */
function addItemToTable(containerId) {
    var selectGoods = importGoods;
    $("#goodsListId").runnerTableOnStart(opt, selectGoods, bindAutoComplete);
}


/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/



/*自动输出框绑定*/


var tempData = null;
var onsearch = function (val, parent, divID) {
    var storeout = $("#outStore").val();
    if (!storeout){
        runnerAlert('操作提示', '请先选择出库仓库');
        return false;
    }
    var incid = $("#customId").val();
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {
            "in_cid": incid,
            "out_sid": storeout,
        };
        var send = true;
        if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
            params['barcodes'] = searchVal;
            if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) send = false;
        } else {
            params['search'] = searchVal;
        }
        if (send) {
            var res = stockRes.readStockOutGoodsByField(1, autoCompletePageNum, params);
            //var res = stockRes.readStockOutGoods(1, autoCompletePageNum, incid, storeout, searchVal);
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
        var lack = [];
        if (parseInt(appendData.reserve) == 0){
            lack.push(parseInt(appendData.gid));
        }
        var idx = index;
        //console.log(idx);
        $("#goodsListId").runnerTableAppend(idx, appendData, bindAutoComplete);
        colorGoodsForLack(lack);
        $("#rttotal_"+idx).focus();
        lockHeader(1); //禁止修改供应商和进货仓库
    }
    $("#" + divID).toggle();
}

function lockHeader(lock) {
    if (lock) {
        $('#supplier').attr('disabled', 'disabled');
        $('#outStore').attr('disabled', 'disabled');
    } else {
        $('#supplier').removeAttr('disabled');
        $('#outStore').removeAttr('disabled');
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

/* --------------------------------------- 导入订单 BEGIN ------------------------------------------------- */

/**
 * 加载已审核的订单，供导入到列表中
 */
function loadBillTable() {
    var out_sname = $('#outStore option:selected').text();
    $("#title_import").text('导入订单 [' + out_sname + ']');
    var params = {'out_sid': $('#outStore').val()};
    var data = stockRes.findOrderOutAllField(1, 50, params);
    if (data != null && data.data != null) {
        data = data.data;
        $("#pupupContent tbody").empty();
        var tableContent = "";
        for (var i = 0; i < data.length; i++) {
            tableContent += "<tr class='clickable' onclick='trOnClick(\"" + data[i].id + "\");'>";
            tableContent += "<td class='code'>" + data[i].id + "</td>";
            tableContent += "<td class='company'>" + fieldNull(data[i].in_cname) + "</td>";
            tableContent += "<td class='price'>" + fieldNull(data[i].amount) + "</td>";
            tableContent += "<td class='username'>" + fieldNull(data[i].suname) + "</td>";
            tableContent += "<td class='datetime'>" + formatDatetime(data[i].createtime) + "</td>";
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
    var data = stockRes.findOrderByOutId(currOrderId);
    if (data != null) {
        $("#iOrderId").html(fieldNull(data.id));
        $("#customId").val(data.in_cid);
        $("#customLists").val(data.in_cid);
        $("#customName").val(data.in_cname);
        $("#in_cid").val(data.in_cid);
        $("#in_sid").val(data.in_sid);
        $("#outStore").val(data.out_sid);
        $('#rank').val(data.rank);
        $('#suid').val(data.suid); //业务员
        $("#suname").val(addPhone2Name(data.suname, data.suphone));
        $("#memo").val(fieldNull(data.memo));
        $("#discount_amount").val(num2price(data.discount_amount));
        $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
        /*console.log($("#customId").val());
        //如果还未添加该公司为客户，则自动切换为输入模式
        var turnHand = 1;
        $("#customLists").find("option").each(function(){
            //console.log($(this).val());
            if (data.in_cid == $(this).val()){
                turnHand = 0;//已添加过，不用切换了
            }
        });
        //if (turnHand) inputForHand(data.in_cname);
        console.log($("#customId").val());
        */
        if (data.mall_orderno) {
            $("#contacts").html(data.contacts);
            $("#phone").html(data.phone);
            $("#receipt").html(formatReceipt(data.receipt));
            $("#mall_info").show();
        }

        var selectGoods = data.goods_list;
        if (selectGoods != null) {
            //console.log(selectGoods);
            //转换绑定
            var bindData = [];
            var lack = [];
            for (var i = 0; i < selectGoods.length; i++) {
                bindData[i] = {
                    "gid": selectGoods[i].gid,
                    "name": selectGoods[i].gname,
                    "code": selectGoods[i].gcode,
                    "bname": fieldNull(selectGoods[i].gbname),
                    "tname": fieldNull(selectGoods[i].gtname),
                    "spec": selectGoods[i].gspec,
                    "barcode": selectGoods[i].gbarcode,
                    "price": selectGoods[i].unit_price,
                    "total": selectGoods[i].total,
                    "unit": selectGoods[i].gunit,
                    "volume": computeVolume(selectGoods[i]),
                    "volume_price": computeVolumePrice(selectGoods[i]),
                    "amount_price": selectGoods[i].amount_price,
                    "tax_price": selectGoods[i].tax_price, //税额
                    "outtax_price": selectGoods[i].outtax_price, //去税金额
                    "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                    "reserve": selectGoods[i].reserve,
                };
                if (parseInt(selectGoods[i].reserve) == 0){
                    lack.push(parseInt(selectGoods[i].gid));
                }
            }
            $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            colorGoodsForLack(lack);
        }
        $("#directExportOut").show();
        $("#directStockOut").hide();

        //点击订单后关闭浮层
        $('#modalImportOrder').modal('hide');

        formOrderTotal();// 统计金额
    }
}

/* --------------------------------------- 导入订单 END ------------------------------------------------- */


/* --------------------------------------- 拆分订单 BEGIN ------------------------------------------------- */

/**
 * 加载当前订单的商品到拆分弹窗中
 */
function loadGoodsTable() {
    var orderId = $('#iOrderId').text();
    var data = stockRes.findOrderByOutId(orderId);
    if (data != null && data.goods_list.length > 0) {
        data = data.goods_list;

        var goods = {};
        for (var i = 0; i < data.length; i++) {
            if (typeof(goods[data[i].gid]) == 'undefined'){
                goods[data[i].gid] = {};
                goods[data[i].gid]['gid'] = data[i].gid;
                goods[data[i].gid]['gname'] = data[i].gname;
                goods[data[i].gid]['gbarcode'] = data[i].gbarcode;
                goods[data[i].gid]['gspec'] = data[i].gspec;
                goods[data[i].gid]['total'] = num2total(data[i].total);
            } else {
                goods[data[i].gid]['total'] += num2total(data[i].total);
            }
        }

        //console.log(goods);
        $("#divideContent tbody").empty();
        var tableContent = "";

        var i = 0;
        $.each(goods, function(k, v){
            tableContent += "<tr class='' gid='" + v.gid + "'>";
            tableContent += "<td class='company'>" + fieldNull(v.gname) + "</td>";
            tableContent += "<td class='barcode'>" + fieldNull(v.gbarcode) + "</td>";
            tableContent += "<td class='spec'>" + fieldNull(v.gspec) + "</td>";
            tableContent += "<td class='num'>" + num2total(v.total) + "</td>";
            tableContent += "<td class='num' style='padding:0;width:30px;'><input type='text' name='total_divide' id='total_divide_"+i+"' onkeyup='total2volume("+i+")' value='' /></td>";
            tableContent += "<td class='num'>" + computeVolume(v) + "</td>";
            tableContent += "<td class='num' style='padding:0;width:30px;'><input type='text' name='volume_divide' id='volume_divide_"+i+"' onkeyup='volume2total("+i+")' value='' /></td>";
            tableContent += "</tr>";
            i++;
        });

        $("#divideContent tbody").append(tableContent);
    }
}


/**
 * 计算箱数
 * @param idx
 */
function total2volume(idx){
    var total = $.trim($('#total_divide_' + idx).val());
    var spec = $('#divideContent tbody tr').eq(idx).find('td.spec').text();
    //console.log(total, spec);
    var ret = (parseInt(total) / parseInt(spec)).toFixed(4);
    $('#volume_divide_' + idx).val(ret);
}

/**
 * 计算数量
 * @param idx
 */
function volume2total(idx){
    var volume = $.trim($('#volume_divide_' + idx).val());
    var spec = $('#divideContent tbody tr').eq(idx).find('td.spec').text();
    var ret = parseInt(parseFloat(volume) * parseInt(spec));
    $('#total_divide_' + idx).val(ret);
}

/**
 * 获取拆单内容
 */
function getGoodsOfDivide(){
    var i = 0;
    var goodList = [];
    $('#divideContent tbody tr').each(function () {
        var gid = $(this).attr('gid');
        var total = parseInt($(this).find('input[name="total_divide"]').val());
        goodList[i] = {
            "gid": gid,
            "total": total,
        };
        i++;
    });
    return goodList;
}

/* --------------------------------------- 拆分订单 END ------------------------------------------------- */

/**
 * select每次选择时更新客户信息
 */
function changeCustomerId() {
    $("#customName").val($("#customLists").find("option:selected").text());
    $("#customId").val($("#customLists").val());
}


/**
 * 关闭客户的下拉选择框模式
 */
function offCustomSelect(){
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
    $("#customId").val(-1);
    isHand = isHand ? 0 : 1;
    if (isHand){
        $("#customLists").hide();
        $("#customName").show().val(cname?cname:'').focus();
        $("#inputHand").html('取消');
    }else{
        $("#customLists").show();
        $("#customName").val('').hide();
        $("#inputHand").html('输入');
    }
}

/**
 * 通过选择客户自动填充出货仓库和业务员
 * @param data
 */
function fullHeader(data){
    if (data){
        $("#outStore").val(data.sid);
        $("#suid").val(data.suid);
        $("#suname").val(addPhone2Name(data.suname, data.suphone));
    } else {
        //$("#outStore").val('');
        //$("#suid").val('');
        //$("#suname").val('');
    }
}

/**
 * 是否允许优惠金额
 */
function agreeDiscount(){
    if ($('#agree_discount').prop('checked')){
        $('#discountAmount').text(formatAmountWithComma($('#discount_amount').val()));
    } else {
        $('#discountAmount').text('0.00');
    }
    formOrderTotal();// 统计金额
}


/**
 * 高亮缺货商品名称
 * @param lack
 */
function colorGoodsForLack(lack){
    $("#goodsListId tbody tr").each(function(){
        var index = $(this).attr('rid');
        if ($.inArray(parseInt($(this).find('td:first input').val()), lack) != -1){
            $('#rtname_' + index).css({'color':'#D54E4E'});
        }
    });
}


/*---------------------------------------------------华丽的一逼-------------------------------------------------------*/



/**
 * 加载出货单创建
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var orderId = getUrlParam("orderId");
    var disable = getUrlParam("disable");
    var action = getUrlParam("action");
    if (orderId != null && orderId != 'undefined') currOrderId = orderId;
    if (action != null && action != 'undefined') currAction = action;
    var msg = cookieUtil("userprofile");

    if (msg != null) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name); //默认填单人
        //bindSelfUser('suid'); //业务员
        //bindCustom('customLists');
        //$("#customLists").prepend('<option value="">- 请选择客户 -</option>');
        bindSelfStore('outStore');

        //切换仓库后刷新库存列
        $("#outStore").change(function(){
            var sid = $(this).val();
            var gids = '';
            $("#goodsListId tr").each(function(){
                var gid = $(this).find('td').eq(0).find('input').val();
                if (gid) gids += gid + ',';
            });
            if (sid && gids){
                var result = inventoryRes.reserveTempRead(1, 100, sid, gids);
                if (result){
                    //var result = {'49537':123, '50673':345}; //TEST
                    $("#goodsListId tr").each(function(){
                        var gid = $(this).find('td').eq(0).find('input').val();
                        if (gid){
                            $('#reserve_' + $(this).attr('rid')).text(result[gid]);
                        }
                    });

                }
            }
        });

        bindOrderRankSelect("rank", 0);
        changeCustomerId(); //防止没有初始值
        offCustomSelect(); //关闭客户的下拉选择框模式(注释后则开启双重切换模式)
        bindAutoCompleteCommon('customName', 'customer', null, fullHeader);
        bindAutoCompleteCommon('suname', 'user');
    }


    if (action == null || action == 'undefined') {
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }

    /*浮层打开和关闭时触发事件*/
    $('#modalImportOrder').on('hide.bs.modal', function () {
        clearBillStatus();
    }).on('show.bs.modal',function(){
        loadBillTable();
    });

    //拆单弹窗
    $('#divideOrder').on('hide.bs.modal', function () {
    }).on('show.bs.modal',function(){
        loadGoodsTable();
    });

    //客户订单->创建出库单
    if (action == 'cso' && orderId != null) {
        needRecreate = false;
        $('#power-11313').show();
        $('#btn-print').remove();
        $('#btn-list').remove();
        $('#pageName').text("客户订单");
        $('#div_is_cod').remove();
        //绑定订单相关信息
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findOrderByOutId(orderId);
        if (data != null) {
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#iOrderId").html(fieldNull(data.id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#rank").val(data.rank);
            $("#sCustom").show();
            $("#customId").val(data.in_cid);
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $("#outStore").val(data.out_sid);
            $("#suid").val(data.suid);
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#memo").val(fieldNull(data.memo));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }
            lockHeader(1); //禁止修改供应商和进货仓库

            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                var lack = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "barcode": selectGoods[i].gbarcode,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                    if (parseInt(selectGoods[i].reserve) == 0){
                        lack.push(parseInt(selectGoods[i].gid));
                    }
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                colorGoodsForLack(lack);
            }

            if (disable || fieldNull(data.status) == '已作废'){
                $('#power-11313').remove();
                $('#btn-help').remove();
                $('#goodsListId tr').each(function(){
                    $(this).find('th:first').remove();
                    $(this).find('td:first').remove();
                });
                $('input').attr("disabled", "disabled");
                $('select').attr("disabled", "disabled");
                $("#createStockOut").hide();
                $("#divbtn-cancel").show();
            }
        }

    }



    //自定义出库单-Start
    if (action == 'csko') {
        $('#btn-print').remove();
        $('#pageName').text("客户出货单");
        $('#div_is_cod').remove();
        $('#btn-list').click(function(){
            openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html', 261);
        });
        $('#customId').val($('#custom').val());
        $('#rank').val(1);
        $("#cuname").html('(空)');
        $("#agree_discount").remove();
        $("#discountAmount").text('0.00');
        $("#createStockOut").toggle();
        $("#directStockOut").toggle();
        $("#importBill").toggle();
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }
    //自定义出库单-End

    //预审 出库单
    if (action == 'csp' && orderId != null) {
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findStockOutById(orderId);
        $('#pageName').text("客户出货单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#customId").val(data.in_cid);
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $("#outStore").val(data.sid);
            $("#rank").val(data.rank);
            $('#suid').val(data.suid); //业务员
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#cuname").html('(空)');
            $("#memo").val(fieldNull(data.memo));
            $("#iSaleId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#agree_discount").remove();
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }
            lockHeader(1); //禁止修改供应商和进货仓库

            //$("#brokerageman").val(fieldNull(data.name_do));
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                var lack = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "barcode": selectGoods[i].gbarcode,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                    if (parseInt(selectGoods[i].reserve) == 0){
                        lack.push(parseInt(selectGoods[i].gid));
                    }
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                colorGoodsForLack(lack);
            }
            stampStatus(id2text(showOutStatusList, data.status));
            $('#btn-list').click(function(){
                openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html?option='+data.status, 261);
            });
        }
        if (data.length == 0) {
            $("#table-empty").empty().append("没有记录").show();
        }
        $("#createStockOut").hide();
        $("#preCheckStockOut").show();
    }
    //预审出库单-end

    //审核 出库单
    if (action == 'csc' && orderId != null) {
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findStockOutById(orderId);
        $('#pageName').text("客户出货单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#customId").val(data.in_cid);
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $("#outStore").val(data.sid);
            $("#rank").val(data.rank);
            $("#memo").val(fieldNull(data.memo));
            $("#iSaleId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $('#suid').val(data.suid); //业务员
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#agree_discount").remove();
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }
            lockHeader(1); //禁止修改供应商和进货仓库

            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                var lack = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "barcode": selectGoods[i].gbarcode,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                    if (parseInt(selectGoods[i].reserve) == 0){
                        lack.push(parseInt(selectGoods[i].gid));
                    }
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                colorGoodsForLack(lack);
            }
            stampStatus(id2text(showOutStatusList, data.status));
            $('#btn-list').click(function(){
                openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html?option='+data.status, 261);
            });

            //未审核&已结算 的出货单禁止编辑 和 作废(只可审核)
            if (data.settle_status == 1 && data.status <= 3){
                $('#goodsListId tr').each(function(){
                    $(this).find('td:first a').remove();
                });
                $('#goodsListId input').attr('disabled', 'disabled');
                $('#power-11306').remove();
                $('#power-11309').remove();
            }
        }
        $("#createStockOut").hide();
        $("#checkStockOut").show();
    }
    //审核出库单-end


    //冲单
    if (action == 'cd' && orderId != null) {
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findStockOutById(orderId);
        $('#pageName').text("客户出货单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSaleId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#customId").val(data.in_cid);
            $("#rank").val(data.rank);
            $("#in_cid").val(data.in_cid).attr("disabled", "disabled");
            $("#in_sid").val(data.in_sid).attr("disabled", "disabled");
            $("#outStore").val(data.sid).attr("disabled", "disabled");
            $('#suid').val(data.suid).attr("disabled", "disabled"); //业务员
            $("#suname").val(addPhone2Name(data.suname, data.suphone)).attr("disabled", "disabled");
            $("#memo").val(fieldNull(data.memo));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#agree_discount").remove();
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }

            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                var lack = [];
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
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "barcode": selectGoods[i].gbarcode,
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                    if (parseInt(selectGoods[i].reserve) == 0){
                        lack.push(parseInt(selectGoods[i].gid));
                    }
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                colorGoodsForLack(lack);
            }
            stampStatus(id2text(showOutStatusList, data.status));
            $('#btn-list').click(function(){
                openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html?option='+data.status, 261);
            });
            //允许修改业务员
            $("#btnMdySaler").removeAttr("disabled");
        }
        $("#modify_saler").show();
        $("#createStockOut").hide();
        $("#cdStockOut").show();
    }

    //修正
    if (action == 'xd' && orderId != null) {
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findStockOutById(orderId);
        $('#pageName').text("客户出货单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSaleId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#customId").val(data.in_cid);
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $('#suid').val(data.suid); //业务员
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#outStore").val(data.sid).attr("disabled", true);
            $("#rank").val(data.rank);
            $("#memo").val(fieldNull(data.memo));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#agree_discount").remove();
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }
            lockHeader(1); //禁止修改供应商和进货仓库

            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                var lack = [];
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
                        "barcode": selectGoods[i].gbarcode,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                    if (parseInt(selectGoods[i].reserve) == 0){
                        lack.push(parseInt(selectGoods[i].gid));
                    }
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                colorGoodsForLack(lack);
            }
            stampStatus(id2text(showOutStatusList, data.status));
            $('#btn-list').click(function(){
                openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html?option='+data.status, 261);
            });
            //允许修改业务员
            $("#btnMdySaler").removeAttr("disabled");
        }
        $("#modify_saler").show();
        $("#createStockOut").hide();
        $("#xdStockOut").show();
    }

    //冲单 或 修正
    if (action == 'cxd' && orderId != null) {
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findStockOutById(orderId);
        $('#pageName').text("客户出货单");
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSaleId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#customId").val(data.in_cid);
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $('#suid').val(data.suid); //业务员
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#outStore").val(data.sid).attr("disabled", true);
            $("#rank").val(data.rank);
            $("#memo").val(fieldNull(data.memo));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#agree_discount").remove();
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }
            lockHeader(1); //禁止修改供应商和进货仓库

            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                var lack = [];
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
                        "barcode": selectGoods[i].gbarcode,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                    if (parseInt(selectGoods[i].reserve) == 0){
                        lack.push(parseInt(selectGoods[i].gid));
                    }
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                colorGoodsForLack(lack);
            }
            stampStatus(id2text(showOutStatusList, data.status));
            $('#btn-list').click(function(){
                openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html?option='+data.status, 261);
            });
            //允许修改业务员
            $("#btnMdySaler").removeAttr("disabled");
        }
        $("#modify_saler").show();
        $("#createStockOut").hide();
        $("#cxdStockOut").show();
    }

    //查看 出库单
    if (action == 'see' && orderId != null) {
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findStockOutById(orderId);
        $('#pageName').text("客户出货单");
        if (data != null) {
            if (data.negative_id) $("#negative_id").html(data.negative_id).parent().show();
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#iSaleId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#customId").val(data.in_cid);
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $('#suid').val(data.suid); //业务员
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#outStore").val(data.sid).attr("disabled", true);
            $("#rank").val(data.rank);
            $("#memo").val(fieldNull(data.memo));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(formatAmountWithComma(data.discount_amount));
            $("#agree_discount").remove();
            $("#is_cod").val(data.is_cod);
            if (data.mall_orderno) {
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#receipt").html(formatReceipt(data.receipt));
                $("#mall_info").show();
            }

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
                        "barcode": selectGoods[i].gbarcode,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            stampStatus(id2text(showOutStatusList, data.status));
            $('#btn-list').click(function(){
                openParentForFrame('客户出货单','/mainframe/sale/checkThelibrary.html?option='+data.status, 261);
            });
        }
        $("#createStockOut").hide();
        $("#divbtn-cancel").show();

        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#cxdStockOut .btn-add').remove();
        $('#btn-help').remove();
        $("#goodsListId tr th").eq(0).remove();
        $('#goodsListId tr').each(function(){$(this).find('td').eq(0).remove();});
        $("#goodsListId tr th").eq(11).remove();
        $('#goodsListId tr').each(function(){$(this).find('td').eq(11).remove();});
    }

    formOrderTotal();// 统计金额
    $("#brokerageman").focus();

    //打印
    $('#btn-print').click(function(){
        if (orderId) {
            previewPrint(261, orderId);
        }
    });


    //按钮权限
    if (!checkPower(11301)) {
        $("#power-11301-1").remove();
        $("#power-11301-2").remove();
    }
    if (!checkPower(11302)) {
        $("#power-11302-1").remove();
        $("#power-11302-2").remove();
    }
    if (!checkPower(11310)) {
        $("#power-11310-1").remove();
        $("#power-11310-2").remove();
    }
    if (!checkPower(11303)) {}
    if (!checkPower(11304)) {}
    if (!checkPower(11305)) {}
    if (!checkPower(11306)) {}
    if (!checkPower(11307)) {}
    if (!checkPower(11308)) {}
    if (!checkPower(11309)) {
        $("#btnMdySaler").attr('disabled', 'disabled');
    }
    if (!checkPower(11313)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */



/**
 * 取消客户订单
 */
function cancelCustomOrder() {
    if (confirm("确定取消该客户订单吗？")) {
        var currOrder = currOrderId;
        if (currOrder != null && currOrder.length > 0) {
            var sres = stockRes.cancelCustomOrder(currOrder);
            if (sres != null) {
                noticeFrame(22, 'refrush', page);
                runnerConfirem("操作提示", "取消订单成功");
            }
        }
    }
}


/**
 * 创建出库单(不审核)
 */
function createStockOutBill(status) {
    if (!checkAutoComplete(null, null, 'customId')) return false;
    var suid = $("#suid").val();
    if (!checkAutoComplete('suid')) return false;
    var out_sid = $("#outStore").val();
    if (!out_sid){
        runnerAlert("操作提示", '请选择出库仓库');
        return false;
    }

    if (1) {
        var in_cid = $("#customId").val();
        var in_cname = $("#customName").val();
        if ($.trim(in_cname) == ''){
            runnerAlert("操作提示", '请选择客户');
            return false;
        }
        in_cid = in_cid == '' ? '-1' : in_cid;
        var goodList = getTableData();
        if (goodList.length > 0) {
            var memo = $.trim($("#memo").val());
            //console.log(out_sid);
            var postData = {
                "memo": memo,
                "in_cid": in_cid,
                "out_sid": out_sid,
                "suid": suid,
                "goods_list": JSON.stringify(goodList)
            };
            postData['agree_discount'] = $('#agree_discount').prop('checked') ? 1 : 0;
            var order_id = $('#iOrderId').text();
            if (order_id) postData['order_id'] = order_id;
            if (in_cid == '-1') postData['in_cname'] = in_cname;
            var sres = null;
            if (status == 1) { //未用到
                sres = stockRes.addStockOut(postData); //创建
                if (sres != null) {
                    noticeFrame(22, 'refrush', page);
                    noticeFrame(261, 'refrush');
                    runnerConfirem("操作提示", "保存成功");
                }
            } else if (status == 2) {
                sres = stockRes.addStockOutAndPreCheck(postData); //创建并预审出库单
                if (sres != null) {
                    noticeFrame(22, 'refrush', page);
                    noticeFrame(261, 'refrush');
                    runnerConfirem("操作提示", "生成成功");
                }
            } else if (status == 3) {//自定义出库单
                if ($("#receipt").html()=='' && memo==''){
                    runnerAlert("操作提示", '请在备注栏写明收获地址等信息');
                    return false;
                }
                sres = stockRes.directStockOut(postData);
                if (sres != null) {
                    noticeFrame(22, 'refrush');
                    noticeFrame(261, 'refrush');
                    runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/sale/createThelibrary.html?action=csko&iframeid=26&iframename=" + encodeURI("新建出货单"));
                }
            } else if (status == 4) {//自定义出库单-修改保存
                if ($("#receipt").html()=='' && memo==''){
                    runnerAlert("操作提示", '请在备注栏写明收获地址等信息');
                    return false;
                }
                sres = stockRes.updateStockOut(currOrderId, postData);
                if (sres != null) {
                    noticeFrame(261, 'refrush', page);
                    runnerConfirem("操作提示", "保存成功");
                }
            }

        } else {
            runnerAlert("操作提示", "请添加商品");
        }
    }
}

/**
 * 审核出库单通过
 */
function checkStockOut() {
    if (!checkAutoComplete(null, null, 'customId')) return false;
    var suid = $("#suid").val();
    if (!checkAutoComplete('suid')) return false;
    var out_sid = $("#outStore").val();
    if (!out_sid){
        runnerAlert("操作提示", '请选择出库仓库');
        return false;
    }
    var in_cname = $("#customName").val();
    if ($.trim(in_cname) == ''){
        runnerAlert("操作提示", '请选择客户');
        return false;
    }
    var goodList = getTableData();
    if (goodList.length > 0) {
        var memo = $("#memo").val() + " ";
        var out_sid = $("#outStore").val();
        var postData = {
            "memo": memo,
            "suid": suid,
            "out_sid": out_sid,
            "goods_list": JSON.stringify(goodList)
        };
        var order_id = $('#iOrderId').text();
        if (order_id){
            postData["order_id"] = order_id;
        }
        var sres = stockRes.checkStockOut(currOrderId, postData);
        if (sres != null) {
            //console.log(sres);
            var msg = '';
            var print_setting = false;
            if (sres.status == 3){ //缺货待配
                msg += '库存不足，出货单已置为缺货待配状态';
            } else if(sres.status == 4){ //已审核
                msg += '审核通过';
                print_setting = {"tid":261, "billId":currOrderId};
            }
            noticeFrame(261, 'refrush', page);
            runnerConfirem("操作提示", msg, print_setting);
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}




/**
 * 保存(生成)并审核
 * @param build 是否是生成(默认是保存)
 */
function checkAndPassStockOut(build) {
    if (!checkAutoComplete(null, null, 'customId')) return false;
    var suid = $("#suid").val();
    if (!checkAutoComplete('suid')) return false;
    var out_sid = $("#outStore").val();
    if (!out_sid){
        runnerAlert("操作提示", '请选择出库仓库');
        return false;
    }
    var in_cname = $("#customName").val();
    if ($.trim(in_cname) == ''){
        runnerAlert("操作提示", '请选择客户');
        return false;
    }
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_cid = $("#customId").val();
        in_cid = in_cid == '' ? '-1' : in_cid;
        var memo = $("#memo").val() + "";
        if ($("#receipt").html()=='' && memo==''){
            runnerAlert("操作提示", '请在备注栏写明收获地址等信息');
            return false;
        }
        var out_sid = $("#outStore").val();
        var postData = {
            "memo": memo,
            "suid": suid,
            "in_cid": in_cid,
            "out_sid": out_sid,
            "goods_list": JSON.stringify(goodList)
        };
        postData['agree_discount'] = $('#agree_discount').prop('checked') ? 1 : 0;
        var order_id = $('#iOrderId').text();
        if (build && order_id){
            postData["order_id"] = order_id;
        }
        if (in_cid == '-1') postData['in_cname'] = in_cname;
        var sres = stockRes.checkStockOut(false, postData);
        if (sres != null) {
            //console.log(sres);
            var msg = '';
            var print_setting = false;
            if (sres.status == 3){ //缺货待配
                msg += '库存不足，出货单已置为缺货待配状态';
            } else if(sres.status == 4){ //已审核
                msg += '审核通过';
                print_setting = {"tid":261, "billId":sres.id};
            }
            if (needRecreate) { //手工创建
                noticeFrame(261, 'refrush');
                runnerConfiremUrl("操作提示", msg, false, "/mainframe/sale/createThelibrary.html?action=csko&iframeid=26&iframename=" + encodeURI("新建出货单"), print_setting);
            } else { //从客户订单列表页打开
                noticeFrame(22, 'refrush', page);
                noticeFrame(261, 'refrush');
                runnerConfirem("操作提示", msg, print_setting);
            }
        }
    } else {
        runnerAlert("操作提示", "请添加商品");
    }
}

/**
 * 审核出库单不通过
 */
function checkStockOutNoPass() {
    var stockOutId = currOrderId;
    if (stockOutId != null && stockOutId != 'undefined' && stockOutId.length > 0) {
        var sres = stockRes.checkNoPassStockOut(stockOutId);
        if (sres != null) {
            noticeFrame(261, 'refrush', page);
            runnerConfirem("操作提示", "作废成功");
        }
    }
}

/**
 * 预审核出库单

function preCheckStockOutPass() {
    var suid = $("#suid").val();
    if (!checkAutoComplete('suid')) return false;

    var goodList = getTableData();
    if (goodList.length > 0) {
        var memo = $("#memo").val() + " ";
        var postData = {
            "memo": memo,
            "suid": suid,
            "goods_list": JSON.stringify(goodList)
        };
        if (currOrderId){
            postData["order_id"] = currOrderId;
        }
        var sres = stockRes.editStockOutAndPreCheck(currOrderId, postData);
        if (sres != null) {
            //alert("预审成功!");
            window.location.href = "checkThelibrary.html?option=2";
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}*/

/**
 * 冲单出库单
 */
function cdStockOutBill() {
    if (confirm("确定红冲该单据?")) {
        var sres = stockRes.stockOutFlushBill(currOrderId); //进行冲单
        if (sres != null) {
            noticeFrame(22, 'refrush'); //客单
            noticeFrame(261, 'refrush', page); //出库单
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 修正出库单
 */
function xdStockOutBill() {
    if (!checkAutoComplete(null, null, 'customId')) return false;
    var suid = $("#suid").val();
    if (!checkAutoComplete('suid')) return false;
    var out_sid = $("#outStore").val();
    if (!out_sid){
        runnerAlert("操作提示", '请选择出库仓库');
        return false;
    }
    var in_cname = $("#customName").val();
    if ($.trim(in_cname) == ''){
        runnerAlert("操作提示", '请选择客户');
        return false;
    }
    var goodList = getTableData();
    if (goodList.length > 0) {
        var memo = $("#memo").val() + " ";
        var out_sid = $("#outStore").val();
        var postData = {
            "memo": memo,
            "suid": suid,
            "out_sid": out_sid,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = stockRes.stockOutRepaireBill(currOrderId, postData); //进行冲单
        if (sres != null) {
            noticeFrame(261, 'refrush', page);
            var print_setting = {"tid":261, "billId":sres.id};
            runnerConfirem("操作提示", "修正成功", print_setting);
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}


/**
 * 修改业务员
 */
function modifySaler() {
    if (currOrderId) {
        var suid = $("#suid").val();
        if (!checkAutoComplete('suid')) return false;
        var postData = {
            "suid": suid,
        };
        var sres = stockRes.updateStockOut(currOrderId, postData);
        if (sres != null) {
            noticeFrame(261, 'refrush', page);
            runnerAlert("操作提示", "修改成功");
        }
    } else {
        runnerAlert("操作提示", "单号错误");
    }
}



/**
 * 确定拆单
 */
function divideOrder() {
    if (confirm("确定对该客户订单进行拆单吗？")) {
        if (currOrderId) {
            var goodList = getGoodsOfDivide();
            var postData = {
                "goods_list": JSON.stringify(goodList)
            };
            var sres = stockRes.divideOrder(currOrderId, postData);
            if (sres != null) {
                noticeFrame(22, 'refrush', page);
                runnerConfirem("操作提示", "拆单成功");
            }
        } else {
            runnerAlert("操作提示", "单号错误");
        }
    }
}