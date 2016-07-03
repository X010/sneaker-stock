var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var returnRes = new returnGoodsRepository();
var page;
var currOrderId = "";

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
        }/*,
        {
            "name": "reserve",
            "type": true,
            "class" : "num",
            "template": "<span class='readonly' id='reserve_#{index}'>#{reserve}</span>",
            "dattr": []
        }*/
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


/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/

/*自动输出框绑定*/


var tempData = null;
var onsearch = function (val, parent, divID) {
    if (!checkAutoComplete(null, null, 'custom')) return false;
    var storein = $("#stockInStore").val();
    var cid = $("#custom").val();
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {
            "in_cid": cid,
            "out_sid": storein,
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
            //var res = stockRes.readStockOutGoods(1, autoCompletePageNum, cid, storein, searchVal);
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
            "volume": '', //箱数
            "volume_price": num2price(tempData[tempIndex].price * tempData[tempIndex].gspec),
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
    }
    $("#" + divID).toggle();
}


/**
 * 绑定自动输入框
 */

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


/**
 * 通过选择客户自动填充出货仓库和业务员(退货则为入库仓库和责任人)
 * @param data
 */
function fullHeader(data){
    if (data){
        $("#stockInStore").attr("insid", fieldNull(data.sid)).val(fieldNull(data.sid));
        $("#brokerageman").val(data.suid);
        $("#brokerageman_name").val(addPhone2Name(data.suname, data.suphone));
    } else {
        $("#stockInStore").attr("insid", '').val('');
        $("#brokerageman").val('');
        $("#brokerageman_name").val('');
    }
}

/*---------------------------------------------------华丽的一逼-------------------------------------------------------*/


/**
 * 加载出库信息
 */
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
        $('#btn-print').hide();
        $('#btn-list').click(function(){
            openParentForFrame('客户退货单','/mainframe/returngoods/inReturnGoodsCheck.html', 281);
        });
        bindSelfStore("stockInStore");
        $("#cuname").html('(空)');

        bindAutoCompleteCommon('customName', 'customer', null, fullHeader);
        bindAutoCompleteCommon('brokerageman_name', 'user');
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }



    //退货申请单(客退)－>销售退回单
    if (action == 'cc') {
        $('#btn-list').remove();
        var data = returnRes.findReturnOutByIdBillOUT(orderId);
        if (data != null) {
            $("#orderId").html(fieldNull(data.id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            //$("#returnCustom").val(data.in_cid).attr("disabled", "disabled");
            bindSelfStore("stockInStore");
            $("#cuname").html('(空)');
            $("#memo").val(fieldNull(data.memo));
            $("#iOrderId").html(fieldNull(data.id));
            $("#custom").val(data.out_cid);
            $("#customName").val(data.out_cname).attr("disabled", "disabled");
            $("#stockInStore").attr("insid", fieldNull(data.in_sid)).val(fieldNull(data.in_sid));
            $("#brokerageman").val(fieldNull(data.buid));
            $("#brokerageman_name").val(addPhone2Name(data.buname, data.buphone));

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
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "barcode": fieldNull(selectGoods[i].gbarcode),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "batch": '',
                        "reserve": '',
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $("#directReturnIn").hide();
            $("#loadReturnIn").show();
        }
    }


    //审核
    if (action == 'ch') {
        $('#btn-print').show();
        $('#btn-list').click(function () {
            openParentForFrame('客户退货单', '/mainframe/returngoods/inReturnGoodsCheck.html?option=' + data.status, 281);
        });
        var data = returnRes.findReturnInByIdBill(orderId);
        if (data) {
            $("#orderId").html(fieldNull(data.order_id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#memo").val(fieldNull(data.memo));
            $("#fullperson").html(data.uname);
            $("#billId").html(fieldNull(data.id));
            //$("#returnCustom").val(data.out_cid).attr("disabled", "disabled");
            //if (!$("#returnCustom").val()) {
            //    $("#returnCustom").after('<span class="text">' + data.out_cname + '</span>').remove();
            //}
            $("#customName").val(data.out_cname).attr("disabled", "disabled");
            $("#custom").val(data.out_cid).attr("disabled", "disabled");
            $("#cuname").html('(空)');
            $("#stockInStore").attr("insid", fieldNull(data.sid)).val(fieldNull(data.sid));
            $("#brokerageman").val(fieldNull(data.buid));
            $("#brokerageman_name").val(addPhone2Name(data.buname, data.buphone));
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
            $("#directReturnIn").hide();
            $("#checkReturnIn").show();
        }
    }

    //冲单 & 修正
    if (action == 'xcd') {
        $('#btn-print').show();
        $('#btn-list').click(function () {
            openParentForFrame('客户退货单', '/mainframe/returngoods/inReturnGoodsCheck.html?option=' + data.status, 281);
        });
        var data = returnRes.findReturnInByIdBill(orderId);
        if (data) {
            $("#orderId").html(fieldNull(data.order_id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#memo").val(fieldNull(data.memo)).attr("disabled", "disabled");
            $("#fullperson").html(data.uname);
            $("#billId").html(fieldNull(data.id));
            //$("#returnCustom").val(data.out_cid).attr("disabled", "disabled");
            //if (!$("#returnCustom").val()) {
            //    $("#returnCustom").after('<span class="text">' + data.out_cname + '</span>').remove();
            //}
            $("#customName").val(data.out_cname).attr("disabled", "disabled");
            $("#custom").val(data.out_cid).attr("disabled", "disabled");
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#stockInStore").attr("insid", fieldNull(data.sid)).val(fieldNull(data.sid)).attr("disabled", "disabled");
            $("#brokerageman").val(fieldNull(data.buid));
            $("#brokerageman_name").val(addPhone2Name(data.buname, data.buphone)).attr("disabled", "disabled");

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
            stampStatus(id2text(showInStatusList, data.status));

        }
        $("#directReturnIn").hide();
        $("#xcdReturnIn").show();
    }

    //查看
    if (action == 'see') {
        $('#btn-print').show();
        $('#btn-list').click(function () {
            openParentForFrame('客户退货单', '/mainframe/returngoods/inReturnGoodsCheck.html?option=' + data.status, 281);
        });
        var data = returnRes.findReturnInByIdBill(orderId);
        if (data) {
            $("#orderId").html(fieldNull(data.order_id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#memo").val(fieldNull(data.memo));
            $("#fullperson").html(data.uname);
            $("#cuname").html(fieldNull(data.cuname, '(空)'));
            $("#billId").html(fieldNull(data.id));
            //$("#returnCustom").val(data.out_cid).attr("disabled", "disabled");
            //if (!$("#returnCustom").val()) {
            //    $("#returnCustom").after('<span class="text">' + data.out_cname + '</span>').remove();
            //}
            $("#customName").val(data.out_cname).attr("disabled", "disabled");
            $("#custom").val(data.out_cid).attr("disabled", "disabled");
            $("#stockInStore").attr("insid", fieldNull(data.sid)).val(fieldNull(data.sid));
            $("#brokerageman").val(fieldNull(data.buid));
            $("#brokerageman_name").val(addPhone2Name(data.buname, data.buphone));
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
            $('input').attr("disabled", "disabled");
            $('select').attr("disabled", "disabled");
            $('#createReturnInStockIn .btn-add').remove();
            $('#btn-help').remove();
            $("#goodsListId tr th:first").remove();
            $('#goodsListId tr').each(function () {
                $(this).find('td:first').remove();
            });
            stampStatus(id2text(showInStatusList, data.status));
        }
        $("#directReturnIn").hide();
        $("#cancelReturnIn").show();
    }

    formOrderTotal();// 统计金额

    //打印
    $('#btn-print').click(function(){
        if (orderId) {
            previewPrint(281, orderId);
        }
    });

    //按钮权限
    if (!checkPower(11401)) {}
    if (!checkPower(11402)) {}
    if (!checkPower(11403)) {}
    if (!checkPower(11404)) {
        $('#power-11404-1').remove();
        $('#power-11404-2').remove();
    }
    if (!checkPower(11405)) {}
    if (!checkPower(11406)) {}
    if (!checkPower(11407)) {}
    if (!checkPower(11408)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 创建退回入库单
 */
function cAddReturnInBill(modify) {
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman')) return false;

    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var sres = null;
        if (1){
            var in_sid = $("#stockInStore").val();
            var out_cid = $("#custom").val();
            if (!out_cid){
                runnerAlert("操作提示", "请选择退货客户");
                return false;
            }else{
                var memo = $("#memo").val() + " ";
                var postData = {
                    "in_sid": in_sid,
                    "out_cid": out_cid,
                    "memo": memo,
                    "buid": name_do,
                    "goods_list": JSON.stringify(goodList)
                };
                if (modify){
                    sres = returnRes.updateReturnInBill(currOrderId, postData);
                    if (sres != null) {
                        noticeFrame(281, 'refrush', page);
                        runnerConfirem("操作提示", "保存成功");
                    }
                } else {
                    sres = returnRes.directReturnOutBill(postData);
                    if (sres != null) {
                        noticeFrame(24, 'refrush');
                        noticeFrame(281, 'refrush');
                        runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/returngoods/createReturnGoods.html?iframeid=28&iframename=" + encodeURI("新建客户退货单"));
                    }
                }
            }
        }
    } else {
        runnerAlert("操作提示", "请添加商品");
    }
}


/**
 * 生成退货入库单
 *
 * @param bool check 是否并审核
 */
function cCreateReturnStockIn(check) {
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman')) return false;
    var goodList = getTableData();
    if (goodList.length > 0) {
        var orderId = currOrderId;
        var memo = $("#memo").val() + " ";
        var in_sid = $("#stockInStore").val();
        var out_cid = $("#custom").val();
        if (!out_cid){
            runnerAlert("操作提示", "请选择退货客户");
            return false;
        }else {
            var postData = {
                "in_sid": in_sid,
                "out_cid": out_cid,
                "memo": memo,
                "buid": name_do,
                "goods_list": JSON.stringify(goodList)
            };
            if (orderId) postData['order_id'] = orderId;
            var sres;
            if (check) sres = returnRes.addAndCheckReturnInBill(postData);
            else sres = returnRes.addReturnInBill(postData);
            if (sres != null) {
                noticeFrame(24, 'refrush', page);
                noticeFrame(281, 'refrush');
                runnerConfirem("操作提示", "操作成功");
            }
        }
    } else {
        runnerAlert("操作提示", "请添加商品");
    }
}


/**
 * 生成退货入库单并审核
 */
function cCreateAndCheckReturnStockIn() {
    cCreateReturnStockIn(1);
}


/**
 * 审核退货入库单
 */
function checkReturnInStockIn() {
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman')) return false;
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var memo = $("#memo").val() + "";
        var postData = {
            "in_sid": in_sid,
            "memo": memo,
            "buid": name_do,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = returnRes.updateAndCheckReturnInBill(currOrderId, postData);
        if (sres != null) {
            noticeFrame(281, 'refrush', page);
            runnerConfirem("操作提示", "审核通过");
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}

/**
 * 审核不通过入库单
 */
function deleteReturnInStockIn() {
    if (confirm("确定作废该单据?")) {
        var currOrder = currOrderId;
        if (currOrder != null && currOrder.length > 0) {
            var sres = returnRes.deleteReturnInBill(currOrder);
            if (sres != null) {
                noticeFrame(281, 'refrush', page);
                runnerConfirem("操作提示", "作废成功");
            }
        }
    }
}


/**
 * 对入库单进行冲单
 */
function cdReturnInBill() {
    if (confirm("确定红冲该单据?")) {
        var sres = returnRes.ReturnInBillFlushBill(currOrderId);
        if (sres != null) {
            noticeFrame(24, 'refrush');
            noticeFrame(281, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 修正单据
 */
function xdReturnInBill() {
    var name_do = $("#brokerageman").val();
    if (!checkAutoComplete('brokerageman')) return false;
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#stockInStore").val();
        var memo = $("#memo").val() + "";
        var postData = {
            "in_sid": in_sid,
            "memo": memo,
            "buid": name_do,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = returnRes.ReturnInBillRepaireBill(currOrderId, postData);
        if (sres != null) {
            noticeFrame(281, 'refrush', page);
            runnerConfirem("操作提示", "修正成功");
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }
}
