var financeRes = new financeRepository();
var customRes = new customRepository();

var type_order = {
    1: '客户出货',
    2: '客户退货'
};

var currentId = 0;
var page;

/**
 * Table字段定义
 * @type {{}}
 */
var opts = {
    "rows": 10,
    "template": [
        {
            "name": "opt",
            "type": true,
            "class": "op",
            "template": "<input type='checkbox' checked='checked' index='#{index}' name='opt' id='stockinandoutid_#{index}' value='#{opt}' onclick='computeAmountOnFinance();' />",
            "dattr": []
        },
        {
            "name": "order_id",
            "type": true,
            "class": "code",
            "template": "<input type='text' index='#{index}' name='order_id' id='rtorder_id_#{index}' value='#{order_id}' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "id",
            "type": true,
            "class": "code",
            "template": "<input type='text' index='#{index}' name='name' id='rtname_#{index}' value='#{id}' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "stock_type",
            "type": true,
            "class": "cate",
            "template": "<input type='hidden' name='stock_type' value='#{stock_type}' /><input disabled='disabled' class='f-input-stock_type' index='#{index}' name='stock_type' id='rtstock_type_#{index}' value='#{stock_type}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "suname",
            "type": true,
            "class": "username",
            "template": "<input disabled='disabled' class='f-input-suname' id='rtsuname_#{index}' value='#{suname}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "cuname",
            "type": true,
            "class": "username",
            "template": "<input disabled='disabled' class='f-input-cuname' id='rtcuname_#{index}' value='#{cuname}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "checktime",
            "type": true,
            "class": "datetime",
            "template": "<input disabled='disabled' class='f-input-checktime' id='rtchecktime_#{index}' value='#{checktime}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "sname",
            "type": true,
            "class": "store",
            "template": "<input disabled='disabled' class='f-input-sname' id='rtsname_#{index}' value='#{sname}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "lastdate",
            "type": true,
            "class": "date",
            "template": "<input disabled='disabled' class='f-input-lastdate' id='rtlastdate_#{index}' value='#{lastdate}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "amount",
            "type": true,
            "class": "price",
            "template": "<input disabled='disabled' class='f-input-amount' name='amount' id='rtamount_#{index}' value='#{amount}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_amount",
            "type": true,
            "class": "price",
            "template": "<input disabled='disabled' class='f-input-tax_amount' name='tax_amount' id='rttax_amount_#{index}' value='#{tax_amount}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        }/*,
        {
            "name": "opt",
            "type": true,
            "template": "<button class='btn-small' name='opt1' id='rtopt1_#{index}' onclick='openParentForFrame(\"" + simpleBillNo("#{opt}", "查看") + "\",\"/mainframe/sale/createThelibrary.html?action=see&orderId=#{opt}\");'>查看详情</button>",
            "dattr": []
        },
        {
            "name": "opt",
            "type": true,
            "template": "<button class='btn-small' name='opt2' id='rtopt2_#{index}' onclick='openParentForFrame(\"" + simpleBillNo("#{opt}", "查看") + "\",\"/mainframe/returngoods/createReturnGoods.html?action=see&orderId=#{opt}\");' style='display:none;'>查看详情</button>",
            "dattr": []
        }*/
    ]
};

function bindThisPageAutoComplete(container, isInit) {
    $("input[id*='rtorder_id_']").each(function () {
        var id = $(this).attr("id");
        if (isInit) {
            $("#" + id).runnerAutoComplete({
                onSearch: onsearch
            })
        } else {
            if (("rtorder_id_" + container) == id) {
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
}




/**
 * 搜索数据 by 订单号 / 出入库单号
 * @type {null}
 */
var tempData = null;
var onsearch = function (val, parent, divID) {
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        var params = {
            'limit': 5,
            'order_id': searchVal,
        };
        var res = financeRes.findStockInAndOutForCustomerByField(params);
        if (res != null && res != null && res.length > 0) {
            tempData = res;
            var index = parent.attr("index");
            //console.log(index);
            for (var i = 0; i < tempData.length; i++) {
                list[i] = "<li class='td-tr' sid='" + fieldNull(tempData[i].order_id) + "'  onclick='selectLiItem(" + index + "," + i + ",\"" + divID + "\")' >";
                list[i] += "<span class='td item-code'>" + fieldNull(tempData[i].order_id, '无') + "</span>";
                list[i] += "<span class='td item-code'>" + tempData[i].id + "</span>";
                list[i] += "<span class='td item-cate'>" + type_order[tempData[i].stock_type] + "</span>";
                list[i] += "<span class='td item-company'>" + (tempData[i].stock_type == 1 ? tempData[i].in_cname : tempData[i].out_cname) + "</span>";
                list[i] += "<span class='td item-username'>" + (tempData[i].stock_type == 1 ? tempData[i].suname : tempData[i].buname) + "</span>";
                list[i] += "<span class='td item-price'><strong>" + tempData[i].amount + "</strong>元</span>";
                list[i] += "</li>";
                //list[i] = "<li sid='" + tempData[i].order_id + "'  onclick='selectLiItem(" + index + "," + i + ",\"" + divID + "\")' >" + "<span class='item-code'>[" + tempData[i].order_id + "]</span> <span class='item-name'>" + tempData[i].id + "</span></li>";
            }
            var title = '<li class="th-tr"><span class="th th-code">订单单号</span><span class="th th-code">出入库单号</span><span class="th th-cate">单据类型</span><span class="th th-company">往来单位</span><span class="th th-username">业务员</span><span class="th th-price">单据金额</span></li>';
            list.unshift(title);
        }
    }
    return list;
};


/**
 * 选中其中一个单据
 * @param index
 * @param tempIndex
 * @param divID
 */
function selectLiItem(index, tempIndex, divID) {
    var flag = 1;
    if (tempData != null && tempData.length > 0) {
        $("#cusSetlement tr").each(function(){
            if (($(this).find('td input[name="order_id"]').val() == tempData[tempIndex].order_id) &&
                ($(this).find('td input[name="name"]').val() == tempData[tempIndex].id)){
                runnerAlert("操作提示", "该单据已存在在列表中");
                $(this).next().find('td input[name="order_id"]').val('');
                flag = 0;
                return false;
            }
        });
        if (flag){
            var bindData = tempData[tempIndex]; //copy
            bindData['opt'] = tempData[tempIndex].id;
            bindData['order_id'] = fieldNull(tempData[tempIndex].order_id, '无');
            if (tempData[tempIndex].stock_type == 1) { //正常
                bindData['suname'] = fieldNull(tempData[tempIndex].suname); //业务员
                if ($('#customName').val() != '' && $('#customName').val() != tempData[tempIndex].in_cname) {
                    runnerAlert("操作提示", "该单据客户为[" + tempData[tempIndex].in_cname + "]，与结算单客户不同!");
                    return;
                } else {
                    $('#customId').val(tempData[tempIndex].in_cid);
                    $('#customName').val(tempData[tempIndex].in_cname);
                }
                bindData['tax_amount'] = num2price(tempData[tempIndex].tax_amount);
            } else { //退货
                bindData['suname'] = fieldNull(tempData[tempIndex].buname); //业务员(退货的责任人)
                bindData['amount'] = num2price(-1 * tempData[tempIndex].amount); //退货单要给别人钱
                if ($('#customName').val() != '' && $('#customName').val() != tempData[tempIndex].out_cname) {
                    runnerAlert("操作提示", "该单据客户为[" + tempData[tempIndex].out_cname + "]，与结算单客户不同!");
                    return;
                } else {
                    $('#customId').val(tempData[tempIndex].out_cid);
                    $('#customName').val(tempData[tempIndex].out_cname);
                }
                bindData['tax_amount'] = num2price(-1 * tempData[tempIndex].tax_amount);
            }
            bindData['lastdate'] = formatDatetime(tempData[tempIndex].lastdate);
            bindData['checktime'] = formatDatetime(tempData[tempIndex].checktime);
            $("#cusSetlement").runnerTableAppend(index, bindData, bindAutoComplete);


            //单据类型逻辑
            var tr = $("#cusSetlement tr[rid='"+index+"']");
            var input_stock_type = tr.find('td input[name="stock_type"]');
            /*
            if (input_stock_type.val() == 1){
                tr.find('td button[name="opt2"]').parent().remove();
            } else {
                tr.find('td button[name="opt1"]').parent().remove();
                tr.find('td button[name="opt2"]').show();
            }
            */
            input_stock_type.val(type_order[input_stock_type.val()]);

            $("#stockinandoutid_" + index).attr("checked", "checked");
        }

    }
    $("#" + divID).toggle();
    computeAmountOnFinance();
    //如果是通过单号添加,时间条件就没用了
    //$('#startTime').val('');
    //$('#endTime').val('');
    //lockHeader(1);
}
/*
function lockHeader(lock) {
    if (lock) {
        $('#customer').attr('disabled', 'disabled');
        $('#startTime').attr('disabled', 'disabled');
        $('#endTime').attr('disabled', 'disabled');
    } else {
        $('#customer').removeAttr('disabled');
        $('#startTime').removeAttr('disabled');
        $('#endTime').removeAttr('disabled');
    }
}
*/




/* ------------------------------------------------ 分割线 ------------------------------------------------------------ */

/**
 * 获取选中数据
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    $('input[id*="stockinandoutid_"]:checked').each(function () {
            var eff = $(this).val();
            if (eff != null && eff != 'undefined' && eff.length > 0) {
                goodList[i] = {
                    "id": eff
                };
                i++;
            }
        }
    );
    return goodList;
}

/**
 * 计算结算总金额
 */
function computeAmountOnFinance(negative){
    //应该结算金额
    var amountTobe = 0;
    var amountTaxTobe = 0;
    $("#cusSetlement tr").each(function(){
        var checked = $(this).find('td input[type="checkbox"]').attr('checked');
        var amount = $(this).find('td input[name="amount"]').val();
        var tax_amount = $(this).find('td input[name="tax_amount"]').val();
        if (checked == 'checked' && amount){
            amountTobe += parseFloat(amount);
            amountTaxTobe += parseFloat(tax_amount);
        }
    });
    $('#amountTobe').html(formatAmountWithComma(num2price(negative ? -amountTobe : amountTobe)));

    //优惠金额
    //var amountCut = '0.00';
    var amountCut = num2price($('#amountCut_input').val());
    $('#amountCut').html(formatAmountWithComma(num2price(negative ? -amountCut : amountCut)));

    //实际结算金额
    var amountReal = parseFloat(amountTobe)-parseFloat(amountCut);
    $('#amountReal').html(formatAmountWithComma(num2price(negative ? -amountReal : amountReal)));

    //税额
    var discount = (amountReal / amountTobe);
    //console.log(discount);
    var amountTax = amountTaxTobe * discount;
    $('#amountTax').html(formatAmountWithComma(num2price(negative ? -amountTax : amountTax)));
}



function buildParams(){
    var cus = $("#customId").val();
    if (!cus) {
        return false;
    }
    var params = {
        'ccid': cus
    };
    if ($("#startTime").val()) params['begintime'] = $("#startTime").val();
    if ($("#endTime").val()) params['endtime'] = $("#endTime").val();
    return params;
}

/**
 *  选择客户后,拉取单据信息并填充
 */
function changeQueryParam() {
    var params = buildParams();
    var data;
    if (params) {
        data = financeRes.findStockInAndOutForCustomerByField(params);
    }
    handleStockList(data);
    computeAmountOnFinance();

}


/**
 * 单据批量填充模块(通用)
 * @param stockList
 */
function handleStockList(stockList){
    //console.log(stockList);
    var bindData = [];
    if (stockList != null) {
        for (var i = 0; i < stockList.length; i++) {
            bindData[i] = stockList[i]; //copy
            bindData[i]['opt'] = stockList[i].id;
            bindData[i]['order_id'] = fieldNull(stockList[i].order_id, '无');
            bindData[i]['cuname'] = fieldNull(stockList[i].cuname, '无');
            bindData[i]['checktime'] = formatDatetime(stockList[i].checktime);
            bindData[i]['lastdate'] = fieldNull(stockList[i].lastdate);
            if (stockList[i].stock_type == 1) { //正常
                bindData[i]['suname'] = fieldNull(stockList[i].suname); //业务员
                bindData[i]['tax_amount'] = num2price(stockList[i].tax_amount);
            } else { //退货
                bindData[i]['suname'] = fieldNull(stockList[i].buname); //业务员(退货的责任人)
                bindData[i]['amount'] = num2price(-1 * stockList[i].amount); //退货单要给别人钱
                bindData[i]['tax_amount'] = num2price(-1 * stockList[i].tax_amount);
            }
        }
        $('#checkAll').attr('checked', true);
    }
    $("#cusSetlement").runnerTableOnStart(opts, bindData, bindAutoComplete);
    //处理空行 & 单据类型逻辑
    $("#cusSetlement tbody tr").each(function () {
        var input_stock_type = $(this).find('input[name="stock_type"]');
        //if empty
        if (!$(this).find('input[name="name"]').val()) {
            $(this).find('input[type="checkbox"]').hide();
            $(this).find('button').hide();
            input_stock_type.val('');
            //$(this).find('td button[name="opt2"]').parent().remove();
        } else {
            //console.log(input_stock_type.val());
            /*
            if (input_stock_type.val() == 1) { //出库单
                $(this).find('td button[name="opt2"]').parent().remove();
            } else { //退回单
                $(this).find('td button[name="opt1"]').parent().remove();
                $(this).find('td button[name="opt2"]').show();
            }
            */
            //单据类型逻辑
            input_stock_type.val(type_order[input_stock_type.val()]);
        }
    });
}




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
    //$("#customId").val(-1); //不可以自定义
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
    $("#customName").blur(function(){
        if ($.trim($(this).val()) == '') {
            handleStockList(); //清空单据列表
        }
    });
}

/*--------------------------------------------华丽的分隔线------------------------------------------*/



$(function () {

    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");
    if (msg) {
        //bindCustom("customer");
        //$("#customer").prepend("<option value='' >- 请选择客户 -</option>");
        //全选勾
        $('#checkAll').click(function(){
            if ($(this).prop('checked')){
                $('#cusSetlement input[type="checkbox"]').attr('checked', true);
            } else {
                $('#cusSetlement input[type="checkbox"]').removeAttr('checked');
            }
        });

        //新建
        if (!action && msg != null) {
            $('#btn-print').remove();
            $('#btn-list').click(function () {
                openParentForFrame('客户结算单', '/mainframe/finance/curSetlement.html?option=1', 811);
            });
            msg = JSON.parse(msg);
            $("#fullperson").html(msg.name); //填单人
            $("#startTime").val(GetDateStr(-30));
            $("#endTime").val(GetDateStr(1));
            $("#cuname").html('无');
            $("#checktime").html('无');
            //$("#settle_type").val('1');
            $('#btn-goods-list').remove(); //还不能查看商品清单
            $('#goods-list').remove(); //还不能查看商品清单
            /*$("#customer").removeAttr('disabled').change(function(){
                changeQueryParam();
            });*/
            handleStockList();
        }
        $("#iCustom").toggle();
        $("#sCustom").toggle();
        bindConfigBalance('pay_type');
        changeCustomerId(); //防止没有初始值
        offCustomSelect(); //关闭客户的下拉选择框模式(注释后则开启双重切换模式)
        bindAutoCompleteCommon('customName', 'customer', null, changeQueryParam);

        //加载数据(除新建外全部共用)
        if (action && msg != null) {
            $('#goods-list').click(function(){
                openParentForFrame('清单'+id, '/mainframe/finance/viewCusSetlementGoods.html?id='+id);
            });
            $('#btn-goods-list').click(function(){
                openParentForFrame('清单'+id, '/mainframe/finance/viewCusSetlementGoods.html?id='+id);
            });
            $('#customName').attr('disabled', 'disabled');
            currentId = id;
            var data = financeRes.findCusSetlementById(id);
            if (data != null) {
                $('#btn-list').click(function () {
                    openParentForFrame('客户结算单', '/mainframe/finance/curSetlement.html?option=' + data.status, 811);
                });
                //console.log(data);
                if (data.negative_id) $("#negative_id").html(data.negative_id).parent().show();
                $("#fullperson").html(data.uname); //填单人
                $("#cuname").html(fieldNull(data.cuname, '无')); //审核人
                $("#divCreate1").remove();
                $("#divCreate2").remove();
                $("#setlementId").html(id);
                $("#customId").val(data.ccid);
                $("#customName").val(data.ccname);
                $("#memo").val(fieldNull(data.memo));
                $("#pay_type").val(data.pay_type);
                //$("#settle_type").val(fieldNull(data.settle_type, 1));
                $("#amountCut_input").val(num2price(data.discount_price)=='0.00' ? '' : num2price(data.discount_price));
                $("#createtime").html(formatDatetime(data.createtime));
                $("#checktime").html(formatDatetime(data.checktime));

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

                handleStockList(data.stock_list);
                stampStatus(id2text(showInStatusList, data.status));

            }
        }
        //加载数据 END

    }

    var negative = data && data.status == 11; //是否是负数
    computeAmountOnFinance(negative);
    //优惠金额处理
    $('#amountCut_input').keyup(function(){
        computeAmountOnFinance(negative);
    }).change(function(){
        var discount_price = parseFloat($(this).val());
        var amountTobe = parseFloat($('#amountTobe').text().replaceAll(', ', ''));
        //console.log(discount_price, amountTobe, typeof(discount_price), typeof(amountTobe));
        if (isNaN($(this).val())){
            $('button[type="submit"]').attr('disabled', 'disabled');
            runnerAlert("操作提示", '优惠金额必须是数字');
            //alert('优惠金额必须是数字'); //此处需用原生alert
        } else if (discount_price > amountTobe) {
            //console.log(discount_price, typeof(discount_price), amountTobe, typeof(amountTobe));
            $('button[type="submit"]').attr('disabled', 'disabled');
            //alert('优惠金额不能大于应结金额'); //此处需用原生alert
            runnerAlert("操作提示", '优惠金额不能大于应结金额');
        } else {
            $('button[type="submit"]').removeAttr('disabled');
        }
    });

    /**
     * 审核
     */
    if (action == "ch") {
        $("#createCusSetlement").hide();
        $("#chCusSetlement").show();
        $("#xdCusSetlement").hide();
        $("#vwCusSetlement").hide();
    }

    /**
     * 冲单
     */
    if (action == "xd") {
        $("#createCusSetlement").hide();
        $("#chCusSetlement").hide();
        //if (fieldNull(data.settle_type, 1) == 1){ //线下支付的才能冲单
        //if ($.inArray(parseInt(data.pay_type), [3, 4, 5]) != -1){ //线下支付(现金/银行卡/支票)的才能冲单
        if (1){ //API来控制
            $("#xdCusSetlement").show();
            $("#vwCusSetlement").hide();
        } else {
            $("#vwCusSetlement").show();
        }
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
    }

    /**
     * 查看
     */
    if (action == "vw") {
        $("#createCusSetlement").hide();
        $("#chCusSetlement").hide();
        $("#xdCusSetlement").hide();
        $("#vwCusSetlement").show();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
    }

    //按钮权限
    if (!checkPower(12201)) {}
    if (!checkPower(12202)) {}
    if (!checkPower(12203)) {}
    if (!checkPower(12204)) {}
    if (!checkPower(12205)) {}
    if (!checkPower(12206)) {
        $('#btn-goods-list').remove();
        $('#goods-list').remove();
    }

});

/* ----------------------------------- 华丽丽的分割线 ----------------------------------- */



/**
 * 创建客户结算单
 * @returns {boolean}
 */
function createCusSetlement() {
    var ccid = $("#customId").val();
    if (!checkAutoComplete(null, null, 'customId')) return false;
    var in_cname = $("#customName").val();

    var stock_list = getTableData();
    if (stock_list == null || stock_list.length <= 0) {
        runnerAlert("操作提示", "请选择单据");
        return false;
    }
    var amountCut = num2price($('#amountCut_input').val());
    var memo = $("#memo").val();
    var pay_type = $("#pay_type").val();
    var postData = {
        "discount_price": amountCut,
        "memo": memo,
        "ccid": ccid,
        "ccname": in_cname,
        "pay_type": pay_type,
        "stock_list": JSON.stringify(stock_list)
    };
    var res = financeRes.createCusSetlement(postData);

    if (res != null) {
        noticeFrame(811, 'refrush', page);
        runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/finance/checkCusSetlement.html?iframeid=81&iframename=" + encodeURI("新建客户结算单"));
        //runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/finance/checkCusSetlement.html?action=ch&id=" + res.id + "&iframeid=" + res.id + "&iframename="+simpleBillNo(res.id, "未审"));
    }
}

/**
 * 审核客户结算单
 */
function checkCusSetlement(add) {
    var ccid = $("#customId").val();
    if (!checkAutoComplete(null, null, 'customId')) return false;
    var in_cname = $("#customName").val();
    var stock_list = getTableData();
    if (stock_list == null || stock_list.length <= 0) {
        runnerAlert("操作提示", "请选择单据");
        return false;
    }
    var amountCut = num2price($('#amountCut_input').val());
    var memo = $("#memo").val();
    var pay_type = $("#pay_type").val();
    var postData = {
        "discount_price": amountCut,
        "memo": memo,
        "ccid": ccid,
        "ccname": in_cname,
        "pay_type": pay_type,
        "stock_list": JSON.stringify(stock_list)
    };
    var id = add ? false : currentId;
    var res = financeRes.checkCusSetlement(id, postData);

    if (res != null) {
        noticeFrame(811, 'refrush', page);
        if (add){
            runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/finance/checkCusSetlement.html?iframeid=81&iframename=" + encodeURI("新建客户结算单"));
        } else {
            //关闭页面
            runnerConfirem("操作提示", "审核通过");
            //跳转到结果页(有bug,点关闭无效)
            //runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/finance/checkCusSetlement.html?action=xd&id=" + res.id + "&iframeid=" + res.id + "&iframename="+simpleBillNo(res.id, "已审"));
        }
    }
}

/**
 * 冲单
 */
function xdCusSetlement() {
    if (confirm("确定红冲该单据?")) {
        var res = financeRes.xdCusSetlementById(currentId);
        if (res != null) {
            noticeFrame(811, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
            //runnerConfiremUrl("操作提示", "冲单成功", false, "/mainframe/finance/checkCusSetlement.html?action=vw&id=" + res.id + "&iframeid=" + res.id + "&iframename="+simpleBillNo(res.id, "查看"));
        }
    }
}

/**
 * 删除(审核不通过)
 */
function delCusSetlement() {
    if (confirm("确定作废该单据?")) {
        var res = financeRes.delCusSetlementById(currentId);
        if (res != null) {
            noticeFrame(811, 'refrush', page);
            runnerConfirem("操作提示", "作废成功");
            //runnerConfiremUrl("操作提示", "作废成功", false, "/mainframe/finance/checkCusSetlement.html?action=vw&id=" + res.id + "&iframeid=" + res.id + "&iframename="+simpleBillNo(res.id, "查看"));
        }
    }
}