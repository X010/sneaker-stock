var financeRes = new financeRepository();

var type_order = {
    1: '采购退货',
    2: '采购入库'
};

var currentId = 0;

/**
 * Table字段定义
 * @type {{}}
 */
var opts = {
    "rows": 10,
    "template": [
        {
            "name": "order_id",
            "type": true,
            "class" : "code",
            "template": "<input disabled='disabled' type='text' index='#{index}' name='order_id' id='rtorder_id_#{index}' value='#{order_id}' />",
            "dattr": []
        },
        {
            "name": "stock_id",
            "type": true,
            "class" : "code",
            "template": "<input disabled='disabled' type='text' index='#{index}' name='stock_id' id='rtstock_id_#{index}' value='#{stock_id}' />",
            "dattr": []
        },
        {
            "name": "stock_type",
            "type": true,
            "class" : "cate",
            "template": "<input disabled='disabled' type='text' index='#{index}' name='stock_type' id='rtstock_type_#{index}' value='#{stock_type}' />",
            "dattr": []
        },
        {
            "name": "gcode",
            "type": true,
            "class" : "gcode",
            "template": "<input disabled='disabled' class='f-input-gcode' id='rtgcode_#{index}' value='#{gcode}' type='text' />",
            "dattr": []
        },
        {
            "name": "gname",
            "type": true,
            "class" : "gname",
            "template": "<input disabled='disabled' class='f-input-gname' id='rtgname_#{index}' value='#{gname}' type='text' />",
            "dattr": []
        },
        {
            "name": "gbarcode",
            "type": true,
            "class" : "barcode",
            "template": "<input disabled='disabled' class='f-input-gbarcode' id='rtgbarcode_#{index}' value='#{gbarcode}' type='text' />",
            "dattr": []
        },
        {
            "name": "gspec",
            "type": true,
            "class" : "spec",
            "template": "<input disabled='disabled' class='f-input-gspec' id='rtgspec_#{index}' value='#{gspec}' type='text' />",
            "dattr": []
        },
        {
            "name": "unit_price",
            "type": true,
            "class" : "price",
            "template": "<input disabled='disabled' class='f-input-unit_price' id='rtunit_price_#{index}' value='#{unit_price}' type='text' />",
            "dattr": []
        },
        {
            "name": "total",
            "type": true,
            "class" : "num",
            "template": "<input disabled='disabled' class='f-input-total' id='rttotal_#{index}' value='#{total}' type='text' />",
            "dattr": []
        },
        {
            "name": "gunit",
            "type": true,
            "class" : "spec",
            "template": "<input disabled='disabled' class='f-input-gunit' id='rtgunit_#{index}' value='#{gunit}' type='text' />",
            "dattr": []
        },
        {
            "name": "amount",
            "type": true,
            "class" : "price",
            "template": "<input disabled='disabled' class='f-input-amount' id='rtamount_#{index}' value='#{amount}' type='text' />",
            "dattr": []
        },
        {
            "name": "gtax_rate",
            "type": true,
            "class" : "num",
            "template": "<input disabled='disabled' class='f-input-gtax_rate' id='rtgtax_rate_#{index}' value='#{gtax_rate}' type='text' />",
            "dattr": []
        },
        {
            "name": "tax_price",
            "type": true,
            "class" : "price",
            "template": "<input disabled='disabled' class='f-input-tax_price' id='rttax_price_#{index}' value='#{tax_price}' type='text' />",
            "dattr": []
        }
    ]
};


function bindThisPageAutoComplete(container, isInit) {}

/**
 * 搜索数据
 * @type {null}
 */
var tempData = null;
var onsearch = function (val, parent, divID) {

};

/**
 * 选中其中一个单据
 * @param index
 * @param tempIndex
 * @param divID
 */
function selectLiItem(index, tempIndex, divID) {

}




/**
 * 单据批量填充模块(通用)
 * @param goodsList
 */
function handleGoodsList(goodsList){
    //console.log(stockList);
    if (goodsList != null) {
        for (var i = 0; i < goodsList.length; i++) {
            goodsList[i]['order_id'] = fieldNull(goodsList[i].order_id);
            if (goodsList[i].stock_type == 2) {
                goodsList[i]['amount'] = num2price(goodsList[i].unit_price * goodsList[i].total);
            } else {
                goodsList[i]['amount'] = num2price(-1 * goodsList[i].unit_price * goodsList[i].total);
            }
            goodsList[i]['stock_type'] = type_order[goodsList[i].stock_type];
            goodsList[i]['gtax_rate'] = float2percent(goodsList[i].gtax_rate);
            goodsList[i]['tax_price'] = num2price(goodsList[i].tax_price);
        }
    }
    $("#supSetlementGoods").runnerTableOnStart(opts, goodsList, bindAutoComplete);
}

/*--------------------------------------------华丽的分隔线------------------------------------------*/



$(function () {

    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");
    if (msg) {
        //加载数据(除新建外全部共用)
        if (id && msg) {
            bindSelfStoreCheckBox("sids"); //绑定仓库
            $('#stores input').attr('disabled', 'disabled');

            currentId = id;
            var data = financeRes.findSupSetlementGoodsById(id);
            if (data != null) {
                //console.log(data);
                $("#fullperson").html(data.uname); //填单人
                $("#cuname").html(fieldNull(data.cuname, '(空)')); //审核人
                $("#setlementId").html(id);
                $("#supplier").html(fieldNull(data.scname)).attr('disabled', 'disabled');
                $("#memo").val(fieldNull(data.memo)).attr('disabled', 'disabled');
                $("#createtime").html(formatDatetime(data.createtime));
                $("#checktime").html(fieldNull(formatDatetime(data.checktime), '(空)'));
                //仓库
                var sids = typeof(data.sids) == 'string' ? data.sids.split(',') : false;
                if (sids){
                    $('#sids input').each(function(){
                        if ($.inArray($(this).val(), sids) != -1){
                            $(this).attr('checked', 'checked');
                        }
                    });
                }
                //总计
                $("#amountTobe").html(formatAmountWithComma(parseFloat(data.amount_price) / parseFloat(data.discount)));
                $("#amountCut").html(formatAmountWithComma(parseFloat(data.amount_price) / parseFloat(data.discount) - data.amount_price));
                $("#amountReal").html(formatAmountWithComma(data.amount_price));
                $("#amountTax").html(formatAmountWithComma(data.tax_price));

                //分税率汇总部分(含HTML)
                if (data.tax_group) {
                    for (var k in data.tax_group) {
                        var amountReal = num2price(data.tax_group[k].amount_price);
                        var amountCut = num2price(data.tax_group[k].discount_price);
                        var amountTobe = num2price(parseFloat(amountReal) + parseFloat(amountCut));
                        var amountTax = num2price(data.tax_group[k].tax_price);
                        var tax = float2percent(data.tax_group[k].tax_rate);
                        var html = '';
                        html += '<div class="subtotal"><h4>' + tax + '%税汇总</h4>';
                        html += '<span class="name">应结金额：<strong id="amountTobe_' + tax + '" >' + formatAmountWithComma(amountTobe) + '</strong> 元</span>';
                        html += '<span class="name">优惠金额：<strong id="amountCut_' + tax + '" >' + formatAmountWithComma(amountCut) + '</strong> 元</span>';
                        html += '<span class="name">实结金额：<strong id="amountReal_' + tax + '" >' + formatAmountWithComma(amountReal) + '</strong> 元</span>';
                        html += '<span class="name">税额：<strong id="amountTax_' + tax + '" >' + formatAmountWithComma(amountTax) + '</strong> 元</span>';
                        html += '</div>';
                        $('#subTotal').append(html).show();
                    }
                }

                handleGoodsList(data.goods_list);

                //处理空行
                $("#cusSetlementGoods tr").each(function () {
                    var input_stock_type = $(this).find('input[name="stock_type"]');
                    //if empty
                    if (!$(this).find('input[name="stock_id"]').val()) {
                        input_stock_type.val('');
                    }
                });
            }
            stampStatus(id2text(showInStatusList, data.status));
        }
        //加载数据 END

        //打印
        $('#btn-print').click(function(){
            if (currentId) {
                previewPrint(822, currentId);
            }
        });
    }


});

/* ----------------------------------- 华丽丽的分割线 ----------------------------------- */
