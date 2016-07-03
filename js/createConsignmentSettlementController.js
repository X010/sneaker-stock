var financeRes = new financeRepository();
var page;

/**
 * Table字段定义
 * @type {{}}
 */
var opts = {
    "rows": 10,
    "template": [
        {
            "name": "gid",
            "type": true,
            "class" : "opt",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><span class='align-center' id='rtnumber_#{index}'></span>",
            "fill": []
        },
        {
            "name": "code",
            "type": true,
            "class" : "gcode",
            "template": "<input class='f-input-goodname' disabled index='#{index}' id='rtcode_#{index}' type='text' value='#{code}' size='10' />",
            "fill": []
        },
        {
            "name": "name",
            "type": true,
            "class" : "gname",
            "template": "<input class='f-input-goodname' disabled index='#{index}' id='rtname_#{index}' type='text' value='#{name}' size='10' />",
            "fill": []
        },
        {
            "name": "barcode",
            "type": true,
            "class" : "barcode",
            "template": "<input class='f-input-goodname' disabled index='#{index}' id='rtbarcode_#{index}' type='text' value='#{barcode}' size='10' />",
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
            "name": "unit",
            "type": true,
            "class" : "spec",
            "template": "<span class='align-center' id='rtunit#{index}'>#{unit}</span>",
            "dattr": []
        },
        {
            "name": "proxy_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtproxy_amount_#{index}'>#{proxy_amount}</span>",
            "dattr": []
        },
        {
            "name": "last_rest_total",
            "type": true,
            "class" : "num",
            "template": "<span class='align-center' id='rtlast_rest_total_#{index}'>#{last_rest_total}</span>",
            "dattr": []
        },
        {
            "name": "last_rest_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtlast_rest_amount_#{index}'>#{last_rest_amount}</span>",
            "dattr": []
        },
        {
            "name": "current_sell_total",
            "type": true,
            "class" : "num",
            "template": "<span class='align-center' id='rtcurrent_sell_total_#{index}'>#{current_sell_total}</span>",
            "dattr": []
        },
        {
            "name": "current_sell_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtcurrent_sell_amount_#{index}'>#{current_sell_amount}</span>",
            "dattr": []
        },
        {
            "name": "current_expect_total",
            "type": true,
            "class" : "num",
            "template": "<span class='align-center' id='rtcurrent_expect_total_#{index}'>#{current_expect_total}</span>",
            "dattr": []
        },
        {
            "name": "current_expect_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtcurrent_expect_amount_#{index}'>#{current_expect_amount}</span>",
            "dattr": []
        },
        {
            "name": "current_real_total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtcurrent_real_total_#{index}' name='current_real_total' type='text' value='#{current_real_total}' size='10' />",
            "dattr": []
        },
        {
            "name": "current_real_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtcurrent_real_amount_#{index}'>#{current_real_amount}</span>",
            "dattr": []
        },
        {
            "name": "current_after_discount_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtcurrent_after_discount_amount_#{index}'>#{current_after_discount_amount}</span>",
            "dattr": []
        },
        {
            "name": "reserve",
            "type": true,
            "class" : "num",
            "template": "<span class='align-center' id='rtreserve_#{index}'>#{reserve}</span>",
            "dattr": []
        },
        {
            "name": "reserve_amount",
            "type": true,
            "class" : "price",
            "template": "<span class='align-center' id='rtreserve_amount_#{index}'>#{reserve_amount}</span>",
            "dattr": []
        }
    ]
};


/**
 * 绑定自动输入框
 */
function bindThisPageAutoComplete(container, isInit) {}




/**
 * 组装商品清单信息
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            var index = $(this).attr("id").substring(10, $(this).attr("id").length);
            var current_real_total = $("#rtcurrent_real_total_" + index).val();
            var current_real_amount = $("#rtcurrent_real_amount_" + index).val();
            goodList[i] = {
                "gid": gid,
                "current_real_total": current_real_total,
                "current_real_amount": current_real_amount,
            };
            i++;
        }
    });
    return goodList;
}




/**
 * 单据批量填充模块(通用)
 * @param stockList
 */
function handleList(goodsList){
    //console.log(goodsList);
    var bindData = [];
    if (goodsList != null) {
        for (var i = 0; i < goodsList.length; i++) {
            bindData[i] = goodsList[i];
            bindData[i]['code'] = goodsList[i].gcode;
            bindData[i]['name'] = goodsList[i].gname;
            bindData[i]['barcode'] = goodsList[i].gbarcode;
            bindData[i]['unit'] = goodsList[i].gunit;
            bindData[i]['spec'] = goodsList[i].gspec;
            bindData[i]['current_real_total'] = goodsList[i].current_real_total ? goodsList[i].current_real_total : '';
            bindData[i]['current_real_amount'] = goodsList[i].current_real_amount ? goodsList[i].current_real_amount : '0.00';
            bindData[i]['current_after_discount_amount'] = goodsList[i].current_after_discount_amount ? goodsList[i].current_after_discount_amount : '0.00';

        }
    }
    $("#mainList").runnerTableOnStart(opts, bindData, bindAutoComplete);
    $('input[name="current_real_total"]').keyup(function() {
        computeTotal($(this));
    });
    computeAmount();
}


/**
 * 计算当前行的小计
 * @param input
 */
function computeTotal(input){
    var discount = parseFloat($('#discount').val()) / 100;
    discount = discount ? discount : 1;
    var idx = input.parent().parent().attr('rid');
    var total = num2total(input.val()); //实结数
    var price = parseFloat($('#rtproxy_amount_' + idx).text()); //代销价
    if (price) {
        var current_real_amount = (price * total); //实际结算金额
        var current_after_discount_amount = (current_real_amount * discount); //折后实际结算金额
        //console.log('computeTotal', idx, total, price, current_real_amount, current_after_discount_amount);
        $('#rtcurrent_real_amount_' + idx).text(num2price(current_real_amount));
        $('#rtcurrent_after_discount_amount_' + idx).text(num2price(current_after_discount_amount));
    }
    computeAmount();
}



/**
 * 计算单据金额总计
 */
function computeAmount(){
    var expect_amount = 0;
    var real_amount = 0;
    var after_discount_amount = 0;
    var i = 1;
    $('#mainList tbody tr').each(function(){
        var idx = $(this).attr('rid');
        if ($('#hiddengid_' + idx).val()) {
            $('#rtnumber_' + idx).text(i++); //添加序号
        }
        //console.log('computeAmount', expect_amount, real_amount, after_discount_amount);
        expect_amount += parseFloat(num2price($(this).find('#rtcurrent_expect_amount_' + idx).text()));
        real_amount += parseFloat(num2price($(this).find('#rtcurrent_real_amount_' + idx).text()));
        after_discount_amount += parseFloat(num2price($(this).find('#rtcurrent_after_discount_amount_' + idx).text()));
    });

    $('#expect_amount').text(formatAmountWithComma(num2price(expect_amount)));
    $('#real_amount').text(formatAmountWithComma(num2price(real_amount)));
    $('#after_discount_amount').text(formatAmountWithComma(num2price(after_discount_amount)));
}


/**
 * 修改折扣率时,重新计算表格中所有数据
 */
function changeDiscount(){
    $('#mainList tbody tr').each(function(){
        var input = $(this).find('input[name="current_real_total"]');
        if (input.val()) {
            computeTotal(input);
        }
    });
}


/**
 *  选择供应商后,拉取单据信息并填充
 */
function changeQueryParam(data) {
    if (data) $("#discount").val(float2percent(data.discount));
}

/**
 * 检索结算商品
 * @returns {boolean}
 */
function searchGoods(){
    var sup = $("#supplierId").val();
    if (!checkAutoComplete(null, 'supplierId')) return false;
    var sid = $("#store").val();
    if (!sid){
        runnerAlert('操作提示', '请选择结算仓库');
        return false;
    }
    var end_date = $("#end_date").val();
    var params = {
        'scid': sup,
        'sid': sid,
        'date': end_date,
    };
    var res;
    if (sid && end_date){
        res = financeRes.findProxySetlementGoods(params);
        handleList(res);
    }
}
/*--------------------------------------------------分隔线-----------------------------------------------------*/

/**
 * 初始加载数据
 */
$(function () {
    $("#end_date").datepicker();
    $('#end_date').val(GetDateStr(-1));

    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");

    if (msg != null) {
        msg = JSON.parse(msg);
        //console.log(msg);
        $("#fullperson").html(msg.name); //默认填单人
        bindSelfStore("store"); //绑定仓库
        bindConfigBalance('pay_type');
        bindAutoCompleteCommon('supplierName', 'supplier', null, changeQueryParam);
        //焦点引导
        $('#supplierName').focus().blur(function(){
            $('#store').focus().change(function(){
                $('#pay_type').focus().change(function(){
                    $('#end_date').focus();
                });
            });
        });
        $('#search').click(function(){
            $('input[name="current_real_total"]:first').focus();
        });
    }


    //新建
    if (action == null || action == 'undefined') {
        $('#btn-print').remove();
        $('#btn-list').click(function(){
            openParentForFrame('代销结算单', '/mainframe/finance/consignmentSettlement.html?option=' + data.status, 855);
        });
        $("#cuname").html('(空)');
        $("#checktime").html('(空)');
        $("#mainList").runnerTableOnStart(opts, null, bindAutoComplete);
    }

    //加载数据(除新建外全部共用)
    if (action && msg != null && id) {
        currentId = id;
        var data = financeRes.readProxySetlementById(id);
        if (data != null) {
            $('#btn-list').click(function () {
                openParentForFrame('代销结算单', '/mainframe/finance/consignmentSettlement.html?option=' + data.status, 855);
            });
            if (data.negative_id) $("#negative_id").html(data.negative_id).parent().show();
            $("#setlementId").html(id);
            $("#fullperson").html(data.uname); //填单人
            $("#cuname").html(fieldNull(data.cuname, '(空)')); //审核人
            $("#supplierId").val(fieldNull(data.scid));
            $("#supplierName").val(fieldNull(data.scname)).attr('disabled', 'disabled');
            $("#store").val(data.sid).attr('disabled', 'disabled');
            $("#pay_type").val(data.pay_type);
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#checktime").html(formatDatetime(data.checktime));
            $("#end_date").val(fieldNull(data.settle_date)).attr('disabled', 'disabled');
            $("#search").attr('disabled', 'disabled');
            $('#discount').val(float2percent(data.discount));
            $('#memo').val(fieldNull(data.memo));
            //$('#amountReal').val(num2price(data.amount_price));

            //分税率汇总部分(含HTML)
            if (data.tax_group) {
                for (var k in data.tax_group) {
                    var amount_price = num2price(data.tax_group[k].amount_price);
                    var tax_price = num2price(data.tax_group[k].tax_price);
                    var tax = float2percent(data.tax_group[k].tax_rate);
                    var html = '';
                    html += '<div class="subtotal"><h4>' + tax + '%税汇总</h4>';
                    html += '<span class="name">折后税额：<strong id="amountReal_' + tax + '" >' + formatAmountWithComma(tax_price) + '</strong> 元</span>';
                    html += '<span class="name">折后实结金额：<strong id="amountTobe_' + tax + '" >' + formatAmountWithComma(amount_price) + '</strong> 元</span>';
                    html += '</div>';
                    $('#subTotal').append(html).show();
                }
            }

            handleList(data.goods_list);
        }

        stampStatus(id2text(showInStatusList, data.status));
    }
    //加载数据 END


    /**
     * 审核
     */
    if (action == "ch") {
        $("#createConsignmentSettlement").hide();
        $("#chConsignmentSettlement").show();
        $("#cdConsignmentSettlement").hide();
        $("#vwConsignmentSettlement").hide();
    }

    /**
     * 冲单
     */
    if (action == "cd") {
        $("#btn-help").remove();
        $('#search').attr('disabled', true);
        $("#createConsignmentSettlement").hide();
        $("#chConsignmentSettlement").hide();
        $("#cdConsignmentSettlement").show();
        $("#vwConsignmentSettlement").hide();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
    }

    /**
     * 查看
     */
    if (action == "vw") {
        $("#btn-help").remove();
        $('#search').attr('disabled', true);
        $("#createConsignmentSettlement").hide();
        $("#chConsignmentSettlement").hide();
        $("#cdConsignmentSettlement").hide();
        $("#vwConsignmentSettlement").show();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
    }

    //打印
    $('#btn-print').click(function(){
        if (currentId) {
            previewPrint(855, currentId);
        }
    });

    //按钮权限
    if (!checkPower(12701)) {}
    if (!checkPower(12702)) {}
    if (!checkPower(12703)) {}
    if (!checkPower(12704)) {}
    if (!checkPower(12705)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */




/*---------------------------------------华丽的分隔线---------------------------------------------*/
/**
 * 创建代销结算单
 */
function createConsignmentSettlement() {
    var scid = $("#supplierId").val();
    if (!checkAutoComplete(null, 'supplierId')) return false;

    var goods_list = getTableData();
    if (goods_list == null || goods_list.length <= 0) {
        runnerAlert("操作提示", "没有要结算的商品");
        return false;
    }
    var sid = $("#store").val();
    var date = $("#end_date").val();
    var memo = $("#memo").val();
    var pay_type = $("#pay_type").val();
    var discount = num2price($.trim($("#discount").val()));
    if (discount > 100 || discount < 0) {
        runnerAlert("操作提示", "供应商折扣只能为0~100%");
        return false;
    } else {
        discount = (discount / 100).toFixed(4);
    }
    var postData = {
        "date": date,
        "memo": memo,
        "scid": scid,
        "sid": sid,
        "discount": discount,
        "pay_type": pay_type,
        "goods_list": JSON.stringify(goods_list)
    };
    var res = financeRes.createProxySetlement(postData);
    if (res != null) {
        noticeFrame(855, 'refrush', page);
        runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/finance/createConsignmentSettlement.html?iframeid=85&iframename=" + encodeURI("新建代销结算单"));
    }
}


/**
 * 审核
 */
function checkConsignmentSettlement(add) {
    var scid = $("#supplierId").val();
    if (!checkAutoComplete(null, 'supplierId')) return false;

    var goods_list = getTableData();
    if (goods_list == null || goods_list.length <= 0) {
        runnerAlert("操作提示", "没有要结算的商品");
        return false;
    }
    var sid = $("#store").val();
    var date = $("#end_date").val();
    var memo = $("#memo").val();
    var pay_type = $("#pay_type").val();
    var discount = num2price($.trim($("#discount").val()));
    if (discount > 100 || discount < 0) {
        runnerAlert("操作提示", "供应商折扣只能为0~100%");
        return false;
    } else {
        discount = (discount / 100).toFixed(4);
    }
    var postData = {
        "date": date,
        "memo": memo,
        "scid": scid,
        "sid": sid,
        "discount": discount,
        "pay_type": pay_type,
        "goods_list": JSON.stringify(goods_list)
    };
    var id = add ? false : currentId;
    var res = financeRes.checkProxySetlement(id, postData);
    if (res != null) {
        noticeFrame(855, 'refrush', page);
        if (add){
            runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/finance/createConsignmentSettlement.html?iframeid=85&iframename=" + encodeURI("新建代销结算单"));
        } else {
            runnerConfirem("操作提示", "审核通过");
        }
    }
}


/**
 * 冲单
 */
function cdConsignmentSettlement() {
    if (confirm("确定红冲该单据?")) {
        var res = financeRes.flushProxySetlement(currentId);
        if (res != null) {
            noticeFrame(855, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 删除(审核不通过)
 */
function delConsignmentSettlement() {
    if (confirm("确定作废该单据?")) {
        var res = financeRes.deleteProxySetlement(currentId);
        if (res != null) {
            noticeFrame(855, 'refrush', page);
            runnerConfirem("操作提示", "作废成功");
        }
    }
}
