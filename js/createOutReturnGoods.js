var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var returnRes = new returnGoodsRepository();
var inventoryRes = new inventoryRepository();
var page;

var currOrderId = "";

/**统计栏目**/
var orderTotalItems = [{'in': 'amount_price[]', 'out': 'sumAmountPrice'}, {'in': 'tax_price[]', 'out': 'sumTaxPrice'}, {'in': 'total[]', 'out': 'sumTotal'}];

/*定义表格结构*/
var opt_idx = {
    'batch' : 5,
    'reserve' : 13
};
var opt = {
    "rows": 10,
    "template": [
        {
            "name": "gid",
            "type": true,
            "class" : "op",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" href='javascript:removeItem(#{index},\"goodsListId\");'>移出</a>",//hidden
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
            "name": "batch",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-batch' index='#{index}' id='rtbatch_#{index}' value='#{batch}' type='text' size='5' /><input class='f-input-reserveid' index='#{index}' id='rtreserveid_#{index}' value='#{reserveid}' type='hidden' size='5' />",
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
            if (!isNaN($("#rtreserveid_" + index).val())){
                goodList[i]['reserveid'] = $("#rtreserveid_" + index).val();
            }
            i++;
        }
    });
    return goodList;
}

/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/


/*自动输出框绑定*/


var tempData = null;
var onsearch = function (val, parent, divID) {
    if (!checkAutoComplete(null, 'supplier')) return false;
    if (1){
        var storein = $("#stockInStore").val();
        var list = [];
        var searchVal = $.trim(val);
        if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
            if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
                if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
            }
            var params = {
                'sid': storein,
            };
            var send = true;
            if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
                params['barcodes'] = searchVal;
                if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) send = false;
            } else {
                params['search'] = searchVal;
            }
            if (send) {
                var res = stockRes.readEarliestGoodsInStore(1, autoCompletePageNum, params);
                //var res = stockRes.readStockInGoods(1, autoCompletePageNum, storein, searchVal);
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
    }
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
            "volume": '', //箱数
            "volume_price": num2price(tempData[tempIndex].price * tempData[tempIndex].gspec),
            "amount_price": 0,
            "tax_price": fieldNull(tempData[tempIndex].tax_price, 0), //税额
            "outtax_price": fieldNull(tempData[tempIndex].outtax_price, 0), //去税金额
            "tax_rate": fieldNull(tempData[tempIndex].gtax_rate, 0) * 100, //税率
            "reserve": tempData[tempIndex].reserve, 
            "reserveid": '', //指定批次库存ID
            "batch": '', //批次号
        };
        var idx = index;
        //console.log(idx);
        $("#goodsListId").runnerTableAppend(idx, appendData, bindAutoComplete);
        if (!needReserveid) {
            //$('#goodsListId tr').eq(idx+1).find('td').eq(opt_idx['batch']).remove(); //删除批次列
            $('#goodsListId tr').eq(idx + 1).find('td').eq(opt_idx['batch']).find('input').attr('disabled', 'disabled'); //禁用批次列
        }
        //if (!needReserve) {
            //$('#goodsListId tr').eq(idx+1).find('td').eq(opt_idx['reserve']).remove(); //删除库存列
        //}
        $("#rttotal_"+idx).focus();
        lockHeader(1); //禁止修改供应商和进货仓库
    }
    $("#" + divID).toggle();
}

function lockHeader(lock) {
    if (lock) {
        $('#supplierName').attr('disabled', 'disabled');
        $('#stockInStore').attr('disabled', 'disabled');
    } else {
        $('#supplierName').removeAttr('disabled');
        $('#stockInStore').removeAttr('disabled');
    }
}



var reserveidData = null;
var onsearch_batch = function (val, parent, divID) {
    var index = parent.attr("index");
    var storein = $("#stockInStore").val();
    var goodsid = $("#hiddengid_"+index).val();
    var list = [];
    var res = inventoryRes.reserveRead(1, autoCompletePageNum, storein, goodsid);

    if (res != null && res.data != null && res.data.length > 0) {
        reserveidData = res.data;
        list[0] = "<li onclick='return false;'><span class='item-batch'>批次号</span> <span class='item-unit_price'>单价</span> <span class='item-total'>库存量</span></li>";
        for (var i = 0; i < reserveidData.length; i++) {
            list[i+1] = "<li id='" + reserveidData[i].id + "'  onclick='selectLiItem_batch(" + index + "," + i + ",\"" + divID + "\")' >" + "<span class='item-batch'>" + reserveidData[i].batch + "</span> <span class='item-unit_price'>" + reserveidData[i].unit_price + "</span> <span class='item-total'>" + reserveidData[i].total + "</span></li>";
        }
    }else{
        runnerAlert("操作提示", '该商品当前没有库存，无法指定批次');
        $("#rtbatch_"+index).val('');
        $("#rtreserveid_"+index).val('');
        $("#rttotal_"+index).val('');
    }
    return list;
};

/**
 * 选择UL LI ITEM 并填充数据
 */
function selectLiItem_batch(idx, dataIndex, divID) {
    if (reserveidData != null && reserveidData.length > 0) {
        $("#rtbatch_"+idx).val(reserveidData[dataIndex].batch);
        $("#rtreserveid_"+idx).val(reserveidData[dataIndex].id);
        $("#rtprice_"+idx).val(reserveidData[dataIndex].unit_price);
        $("#rttotal_"+idx).focus();
        priceOnChange(idx,1);
    }
    $("#" + divID).toggle();
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
    $("input[id*='rtbatch_']").each(function () {
        var id = $(this).attr("id");
        if (isInit) {
            $("#" + id).runnerAutoCompleteAndSearch(onsearch_batch);
        } else {
            if (("rtbatch_" + container) == id) {
                $("#" + id).runnerAutoCompleteAndSearch(onsearch_batch);
            }
        }
    });
}

/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/


/**
 * 初始化数据
 */
var needReserveid = 1; //退货申请单需要批次；退回单不需要批次
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var orderId = getUrlParam("orderId");
    var action = getUrlParam("action");
    if (orderId != null && orderId.length != 'undefined') currOrderId = orderId;
    if (action == null || action == 'undefined') {
        action = 'cn';
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name);
        $("#cuname").html('(空)');
        //bindSupplier("supplier");
        bindSelfStore("stockInStore");
        bindBusinessPracticeSelect('business');

        //bindSelfUser('brokerageman', msg.id); //默认责任人
        bindAutoCompleteCommon('supplierName', 'supplier');
        bindAutoCompleteCommon('brokerageman_name', 'user');
    }


    //审核采购退货单
    if (action == 'co') {
        var data = returnRes.findReturnOutByIdBillIN(orderId);
        if (data != null) {
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#supplierName").val(data.in_cname).attr("disabled", "disabled");
            $("#supplier").val(data.in_cid).attr("disabled", "disabled");
            $("#stockInStore").val(data.sid).attr("disabled", "disabled");
            $("#brokerageman_name").val(addPhone2Name(data.suname, data.suphone));
            $("#brokerageman").val(fieldNull(data.suid));
            $("#memo").val(fieldNull(data.memo));
            $("#billId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#business").val(data.business).attr("disabled", "disabled");

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
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "barcode": fieldNull(selectGoods[i].gbarcode),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "reserve": selectGoods[i].reserve, 
                        "reserveid": selectGoods[i].reserveid ? selectGoods[i].reserveid : '', 
                        "batch": selectGoods[i].batch ? selectGoods[i].batch : '', 
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购退货单','/mainframe/returngoods/outReturnGoods.html', 181);
            });
            $("#createReturnIn").hide();
            $("#checkReturnIn").show();
        }
    }

    //修正&冲单 采购退货单
    if (action == 'xcd') {
        var data = returnRes.findReturnOutByIdBillIN(orderId);
        if (data != null) {
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#supplierName").val(data.in_cname).attr("disabled", "disabled");
            $("#supplier").val(data.in_cid).attr("disabled", "disabled");
            $("#stockInStore").val(data.sid).attr("disabled", "disabled");
            $("#brokerageman").val(fieldNull(data.suid));
            $("#brokerageman_name").val(addPhone2Name(data.suname, data.suphone));
            $("#memo").val(fieldNull(data.memo));
            $("#billId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#business").val(data.business).attr("disabled", "disabled");

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
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "barcode": fieldNull(selectGoods[i].gbarcode),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "reserve": selectGoods[i].reserve,
                        "reserveid": selectGoods[i].reserveid ? selectGoods[i].reserveid : '',
                        "batch": selectGoods[i].batch ? selectGoods[i].batch : '',
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购退货单','/mainframe/returngoods/outReturnGoods.html', 181);
            });
            $("#createReturnIn").hide();
            $("#xcdReturnIn").show();
        }
        stampStatus('已审核');
    }

    //查看 采购退货单
    if (action == 'see') {
        var data = returnRes.findReturnOutByIdBillIN(orderId);
        if (data != null) {
            $("#fullperson").html(fieldNull(data.uname, '(空)'));
            $("#billId").html(fieldNull(data.id));
            $("#iOrderId").html(fieldNull(data.order_id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#supplierName").val(data.in_cname).attr("disabled", "disabled");
            $("#supplier").val(data.in_cid).attr("disabled", "disabled");
            $("#stockInStore").val(data.sid).attr("disabled", "disabled");
            $("#brokerageman").val(fieldNull(data.suid));
            $("#brokerageman_name").val(addPhone2Name(data.suname, data.suphone));
            $("#memo").val(fieldNull(data.memo));
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#business").val(data.business).attr("disabled", "disabled");

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
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "barcode": fieldNull(selectGoods[i].gbarcode),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "reserve": selectGoods[i].reserve,
                        "reserveid": selectGoods[i].reserveid ? selectGoods[i].reserveid : '',
                        "batch": selectGoods[i].batch ? selectGoods[i].batch : '',
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete, bindAutoComplete);
            }
            $('#btn-list').click(function(){
                openParentForFrame('采购退货单','/mainframe/returngoods/outReturnGoods.html?option=2', 181);
            });
            $("#createReturnIn").hide();
            $("#btndiv-cancel").show();
        }

        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#checkReturnIn .btn-add').remove();
        $('#btn-help').remove();
        $("#goodsListId tr th").eq(0).remove();
        $('#goodsListId tr').each(function(){$(this).find('td').eq(0).remove();});
        //$("#th_reserve").remove();
        //$('#goodsListId tr').each(function(){$(this).find('td').eq(opt_idx['reserve']).remove();});
        stampStatus(id2text(showOutStatusList, data.status));
    }

    formOrderTotal();// 统计金额

    //打印
    $('#btn-print').click(function(){
        if (orderId){
            previewPrint(181, orderId);
        }
    });

    //按钮权限
    if (!checkPower(11201)) {}
    if (!checkPower(11202)) {}
    if (!checkPower(11203)) {}
    if (!checkPower(11204)) {}
    if (!checkPower(11205)) {}
    if (!checkPower(11206)) {}
    if (!checkPower(11207)) {}

});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 保存
 */
function cAddReturnOutBill(modify) {
    var in_cid = $("#supplier").val();
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman', 'supplier')) return false;

    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {

        var sres = null;
        if (1) { //退货申请单
            var out_sid = $("#stockInStore").val();
            var memo = $("#memo").val();
            var business = $("#business").val();
            var postData = {
                "out_sid": out_sid,
                "in_cid": in_cid,
                "memo": memo,
                "business": business,
                "suid": name_do,
                "goods_list": JSON.stringify(goodList)
            };
            if (modify){
                sres = returnRes.updateReturnOutBill(currOrderId, postData);
                if (sres != null) {
                    noticeFrame(181, 'refrush', page);
                    runnerConfirem("操作提示", "保存成功");
                }
            } else {
                sres = returnRes.addReturnOutBill(postData);
                if (sres != null) {
                    noticeFrame(181, 'refrush', page);
                    runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/returngoods/createOutReturnGoods.html?iframeid=18&iframename=" + encodeURI("新建退货单"));
                }
            }

        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}

/**
 * 审核通过退货
 */
function cCheckReturnOutBill() {
    var in_cid = $("#supplier").val();
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman', 'supplier')) return false;

    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var out_sid = $("#stockInStore").val();
        var memo = $("#memo").val();
        var business = $("#business").val();
        var postData = {
            "out_sid": out_sid,
            "in_cid": in_cid,
            "memo": memo,
            "business": business,
            "suid": name_do,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = returnRes.updateAndCheckReturnOutBill(currOrderId, postData);
        if (sres != null) {
            noticeFrame(181, 'refrush', page);
            runnerConfirem("操作提示", "审核通过");
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}

/**
 * 审核不通过
 */
function cDeleteReturnOutBill() {
    if (confirm("确定作废该单据?")) {
        var currOrder = currOrderId;
        if (currOrder != null && currOrder.length > 0) {
            var sres = returnRes.deleteReturnOutBill(currOrder);
            if (sres != null) {
                noticeFrame(181, 'refrush', page);
                runnerConfirem("操作提示", "作废成功");
            }
        }
    }
}

/**
 * 保存并审核
 */
function cAddAndCheckReturnOutBill() {
    var in_cid = $("#supplier").val();
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman', 'supplier')) return false;
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var out_sid = $("#stockInStore").val();
        var memo = $("#memo").val();
        var business = $("#business").val();
        var postData = {
            "out_sid": out_sid,
            "in_cid": in_cid,
            "memo": memo,
            "business": business,
            "suid": name_do,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = returnRes.addAndCheckReturnOutBill(postData);
        if (sres != null) {
            noticeFrame(181, 'refrush', page);
            runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/returngoods/createOutReturnGoods.html?iframeid=18&iframename=" + encodeURI("新建退货单"));
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}

/**
 * 对入库单进行冲单
 */
function cdReturnOutBill() {
    if (confirm("确定红冲该单据?")) {
        var sres = returnRes.ReturnOutBillFlushBill(currOrderId);
        if (sres != null) {
            noticeFrame(181, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 修正单据
 */
function xdReturnOutBill() {
    var in_cid = $("#supplier").val();
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman', 'supplier')) return false;
    var goodList = getTableData();
    if (goodList.length > 0) {
        var out_sid = $("#stockInStore").val();
        var memo = $("#memo").val();
        var business = $("#business").val();
        if (!name_do){
            runnerAlert("操作提示", '请填写责任人');
            return false;
        }
        var postData = {
            "out_sid": out_sid,
            "in_cid": in_cid,
            "memo": memo,
            "business": business,
            "suid": name_do,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = returnRes.ReturnOutBillRepaireBill(currOrderId, postData);
        if (sres != null) {
            noticeFrame(181, 'refrush', page);
            runnerConfirem("操作提示", "修正成功");
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}