/*新建调拔单*/
var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();
var currOrderId = "";
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
            "template": "<input class='readonly' id='rtprice_#{index}' onkeyup='priceOnChange(#{index},1)' value='#{price}' type='text' size='5' disabled='disabled' />",
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
            "template": "<span class='readonly' id='rtunit_#{index}'>#{unit}</span>",
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
            "template": "<input class='f-input-price' id='rtamount_price_#{index}' name='amount_price[]' value='#{amount_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_rate",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rttax_rate_#{index}' value='#{tax_rate}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "outtax_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' id='rtouttax_price_#{index}'  value='#{outtax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' id='rttax_price_#{index}' name='tax_price[]' value='#{tax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "reserve",
            "type": true,
            "class" : "num",
            "template": "<span class='readonly' id='reserve_#{index}' name='reserve'>#{reserve}</span>",
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


/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/
/*自动输出框绑定*/


var tempData = null;
var onsearch = function (val, parent, divID) {
    var storein = $("#transferOut").val();
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
            "code": fieldNull(tempData[tempIndex].gcode),
            "name": tempData[tempIndex].gname,
            "barcode": tempData[tempIndex].gbarcode,
            "bname": fieldNull(tempData[tempIndex].gbname),
            "tname": fieldNull(tempData[tempIndex].gtname),
            "spec": tempData[tempIndex].gspec,
            "unit": tempData[tempIndex].gunit,
            "price": tempData[tempIndex].price,
            "total": '',
            "volume": '', //箱数
            "amount_price": 0,
            "tax_price": fieldNull(tempData[tempIndex].tax_price, 0), //税额
            "outtax_price": fieldNull(tempData[tempIndex].outtax_price, 0), //去税金额
            "tax_rate": fieldNull(tempData[tempIndex].gtax_rate, 0) * 100, //税率
            "reserve": tempData[tempIndex].reserve, 
        };
        var idx = index;
        //console.log(idx);
        $("#goodsListId").runnerTableAppend(idx, appendData, bindAutoComplete);
        $("#rttotal_"+idx).focus();
        lockHeader(1); //禁止修改供应商和进货仓库
    }
    $("#" + divID).toggle();
}

function lockHeader(lock) {
    if (lock) {
        $('#transferOut').attr('disabled', 'disabled');
        $('#supplierStore').attr('disabled', 'disabled');
    } else {
        $('#transferOut').removeAttr('disabled');
        $('#supplierStore').removeAttr('disabled');
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
 * 加载数据
 */
$(function () {
    //bindAllStore('transferOut'); //所有仓库都要显示
    //bindSelfStore('supplierStore');
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    currOrderId = id;
    var msg = cookieUtil("userprofile");

    if (msg != null) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name); //默认填单人
        $("#cuname").html('(空)');
        $("#checktime").html('(空)');
        //bindSelfUser('suid'); //业务员
    }

    if (action == null || action == 'undefined' || action.length <= 0) {
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }


    //调拨订单－>调入单
    if (action == "rec") {
        $('#btn-list').click(function(){
            openParentForFrame('调入单','/mainframe/inventory/stubbsInBill.html', 331);
        });
        var data = inventoryRes.findTransferBillById(id);
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#iOrderId").html(fieldNull(data.id));
            //$("#supplierStore").attr("disabled", true);
            //$("#transferOut").attr("disabled", true);
            $("#suid").val(data.suid);
            $("#supplierStoreName").text(data.in_sname);
            $("#supplierStore").val(data.in_sid);
            $("#transferOutName").text(data.out_sname);
            $("#transferOut").val(data.out_sid);
            $("#memo").val(data.memo);
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "code": selectGoods[i].gcode,
                        "name": selectGoods[i].gname,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].bname),
                        "tname": fieldNull(selectGoods[i].tname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": (parseInt(selectGoods[i].total) / parseInt(selectGoods[i].gspec)).toFixed(4),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "reserve": selectGoods[i].reserve, 
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
        }
        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#memo').removeAttr("disabled");
        $('#btn-help').remove();
        $('.btn-add').remove();
        $("#goodsListId tr th").eq(0).hide();
        $('#goodsListId tr').each(function(){$(this).find('td').eq(0).hide();});
        $('#statusText').html('未收货');
    }

    //查看 调入单
    if (action == "see") {
        $('#btn-list').click(function(){
            openParentForFrame('调入单','/mainframe/inventory/stubbsInBill.html?option=3', 331);
        });
        var data = inventoryRes.findTransferBillById(id);
        if (data != null) {
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#iOrderId").html(fieldNull(data.id));
            //$("#supplierStore").attr("disabled", true);
            //$("#transferOut").attr("disabled", true);
            $("#suid").val(data.suid);
            $("#supplierStoreName").text(data.in_sname);
            $("#supplierStore").val(data.in_sid);
            $("#transferOutName").text(data.out_sname);
            $("#transferOut").val(data.out_sid);
            $("#memo").val(data.memo);
            $("#cuname").html(fieldNull(data.cuname, '(空)')); //审核人
            $("#checktime").html(formatDatetime(data.checktime)); //审核时间
            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "code": selectGoods[i].gcode,
                        "name": selectGoods[i].gname,
                        "barcode": selectGoods[i].gbarcode,
                        "bname": fieldNull(selectGoods[i].bname),
                        "tname": fieldNull(selectGoods[i].tname),
                        "spec": selectGoods[i].gspec,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "amount_price": selectGoods[i].amount_price,
                        "unit": selectGoods[i].gunit,
                        "volume": (parseInt(selectGoods[i].total) / parseInt(selectGoods[i].gspec)).toFixed(4),
                        "tax_price": fieldNull(selectGoods[i].tax_price, 0), //税额
                        "outtax_price": fieldNull(selectGoods[i].outtax_price, 0), //去税金额
                        "tax_rate": fieldNull(selectGoods[i].gtax_rate, 0) * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }
            $("#reviceGoods").hide();
            $("#divbtn-cancel").show();
        }
        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $('.btn-add').remove();
        $("#goodsListId tr th:first").remove();
        $('#goodsListId tr .op').remove();
        $('#goodsListId tr th[name="reserve"]').remove();
        $('#goodsListId tr td span[name="reserve"]').parent().remove();
        $('#statusText').html('已收货');
    }

    formOrderTotal();// 统计金额
    //按钮权限
    if (!checkPower(11505)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */




/**
 * 调拔收货
 */
function stubbReviceGoods() {
    //获取table中的商品列表
    var goodList = getTableData();
    if (goodList.length > 0) {
        var in_sid = $("#supplierStore").val();
        var out_sid = $("#transferOut").val();
        var memo = $("#memo").val() + "";
        var suid = $("#suid").val();
        var postData = {
            "in_sid": in_sid,
            "out_sid": out_sid,
            "memo": memo,
            "suid": suid,
            "goods_list": JSON.stringify(goodList)
        };
        var sres = inventoryRes.transferReviceGood(currOrderId, postData);
        //调用收货接口
        if (sres != null) {
            noticeFrame(331, 'refrush', page);
            runnerConfirem("操作提示", "收货成功");
        }
    }
    else {
        runnerAlert("操作提示", "请添加商品");
    }

}



