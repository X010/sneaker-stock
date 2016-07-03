var financeRes = new financeRepository();

var type_order = {
    1: '采购退货',
    2: '采购入库'
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
            "class":"op",
            "type": true,
            "template": "<input type='checkbox' checked='checked' index='#{index}' id='stockinandoutid_#{index}' value='#{opt}' onclick='computeAmountOnFinance();' />",
            "dattr": []
        },
        {
            "name": "order_id",
            "class":"code",
            "type": true,
            "template": "<input type='text' index='#{index}' name='order_id' id='rtorder_id_#{index}' value='#{order_id}' disabled='disabled' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "id",
            "class":"code",
            "type": true,
            "template": "<input type='text' index='#{index}' name='name' id='rtname_#{index}' value='#{id}' disabled='disabled' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "stock_type",
            "class":"cate",
            "type": true,
            "template": "<input type='hidden' name='stock_type' value='#{stock_type}' /><input disabled='disabled' class='f-input-stock_type' index='#{index}' name='stock_type' id='rtstock_type_#{index}' value='#{stock_type}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "buname",
            "class":"username",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-buname' id='rtbuname_#{index}' value='#{buname}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "cuname",
            "class":"username",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-cuname' id='rtcuname_#{index}' value='#{cuname}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "checktime",
            "class":"datetime",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-checktime' id='rtchecktime_#{index}' value='#{checktime}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "sname",
            "class":"store",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-sname' id='rtsname_#{index}' value='#{sname}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "lastdate",
            "class":"date",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-lastdate' id='rtlastdate_#{index}' value='#{lastdate}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "amount",
            "class":"price",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-amount' name='amount' id='rtamount_#{index}' value='#{amount}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_amount",
            "class":"price",
            "type": true,
            "template": "<input disabled='disabled' class='f-input-tax_amount' name='tax_amount' id='rttax_amount_#{index}' value='#{tax_amount}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        }/*,
        {
            "name": "opt",
            "type": true,
            "template": "<button class='btn-small' name='opt1' id='rtopt1_#{index}' onclick='openParentForFrame(\"" + simpleBillNo("#{opt}", "查看") + "\",\"/mainframe/stock/createOrder.html?action=see&orderId=#{opt}\");'>查看详情</button>",
            "dattr": []
        },
        {
            "name": "opt",
            "type": true,
            "template": "<button class='btn-small' name='opt2' id='rtopt2_#{index}' onclick='openParentForFrame(\"" + simpleBillNo("#{opt}", "查看") + "\",\"/mainframe/returngoods/createOutReturnGoods.html?action=see&orderId=#{opt}\");' style='display:none;'>查看详情</button>",
            "dattr": []
        }*/
    ]
};



////////////////////////

function bindThisPageAutoComplete(container, isInit) {}

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
    $("#supSetlement tr").each(function(){
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
    var discount = num2price($("#discount").val());
    //if (discount <= 0 || discount > 100) discount = 100.0; //非法值时强制默认成100%
    var amountCut = amountTobe * num2price(1 - (discount / 100));
    $('#amountCut').html(formatAmountWithComma(num2price(negative ? -amountCut : amountCut)));


    //实际结算金额
    var amountReal = parseFloat(amountTobe) - parseFloat(amountCut);
    $('#amountReal').html(formatAmountWithComma(num2price(negative ? -amountReal : amountReal)));

    //税额

    var amountTax = amountTaxTobe * num2price(discount / 100);
    //console.log(negative, amountTaxTobe, amountTax);
    $('#amountTax').html(formatAmountWithComma(num2price(negative ? -amountTax : amountTax)));
}

/**
 *  选择供应商后,拉取单据信息并填充
 */
function changeQueryParam(data) {
    if (data) $("#discount").val(float2percent(data.discount));
    var sup = $("#supplierId").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var baseDate = $("#baseDate").val();
    //var sid = $("#store").val();
    var stores = buildStoresParams();
    var sids = stores['sids'];
    var res;
    if (sup && sids){
        res = financeRes.findStockInAndOutForSupplier(sup, startTime, endTime, baseDate, sids);
    }
    handleStockList(res);
    computeAmountOnFinance();
}

/**
 * 拼装仓库参数
 * @returns {string}
 */
function buildStoresParams(){
    var ret = {
        'sids': '',
        'snames': '',
    };
    $("#sids input").each(function(){
        if ($(this).prop('checked')){
            ret['sids'] += $(this).val() + ',';
            ret['snames'] += $(this).parent().text() + ',';
        }
    });
    return ret;
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
            bindData[i] = stockList[i];
            bindData[i]['opt'] = stockList[i].id;
            bindData[i]['order_id'] = fieldNull(stockList[i].order_id, '(空)');
            bindData[i]['checktime'] = formatDatetime(stockList[i].checktime);
            bindData[i]['lastdate'] = fieldNull(stockList[i].lastdate);
            if (stockList[i].stock_type == 2) {
                bindData[i]['buname'] = fieldNull(stockList[i].buname); //采购员
                //bindData[i]['opt'] = stockList[i].id;

            } else {
                bindData[i]['buname'] = fieldNull(stockList[i].suname); //采购员(退货的责任人)
                bindData[i]['amount'] = (-1 * stockList[i].amount).toFixed(2); //退货单要给别人钱
                bindData[i]['tax_amount'] = (-1 * stockList[i].tax_amount).toFixed(2); //退货单要给别人钱
                //bindData[i]['opt'] = stockList[i].order_id;
            }
        }
    }
    $("#supSetlement").runnerTableOnStart(opts, bindData, bindAutoComplete);
    //处理空行 & 单据类型逻辑
    $("#supSetlement tr").each(function () {
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
            if (input_stock_type.val() == 2) { //入库单
                $(this).find('td button[name="opt2"]').parent().remove();
            } else { //退回单
                $(this).find('td button[name="opt1"]').parent().remove();
                $(this).find('td button[name="opt2"]').show();
            }
            */
            input_stock_type.val(type_order[input_stock_type.val()]);
        }
    });
}




/**
 * select每次选择时更新供应商信息
 */
function changeSupplierId() {
    $("#supplierName").val($("#supplierLists").find("option:selected").text());
    $("#supplierId").val($("#supplierLists").val());
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
    //$("#supplierId").val(-1); //不可以自定义
    isHand = isHand ? 0 : 1;
    if (isHand){
        $("#supplierLists").hide();
        $("#supplierName").show().val(cname?cname:'').focus();
        $("#inputHand").html('取消');
    }else{
        $("#supplierLists").show();
        $("#supplierName").val('').hide();
        $("#inputHand").html('输入');
    }
    $("#supplierName").blur(function(){
        if ($.trim($(this).val()) == '') {
            handleStockList(); //清空单据列表
        }
    });
}

/*---------------------------------------华丽的分隔线---------------------------------------------*/


/**
 * 初始化数据
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");

    if (msg) {
        //bindSupplier("supplier");
        //$("#supplier").prepend("<option value='' >- 请选择客户 -</option>");

        //选择仓库(多选)
        bindSelfStoreCheckBox("sids"); //绑定仓库
        $("#checkall").click(function(){
            if ($(this).prop('checked')){
                $('#stores input').attr('checked', 'checked');
            } else {
                $('#stores input').removeAttr('checked');
            }
            changeQueryParam();
        });
        $('#stores input').click(function(){
            if (!$(this).prop('checked')){
                $('#checkall').removeAttr('checked');
            }
            changeQueryParam();
        });

        //选择仓库(单选)
        //bindSelfStore("store");
        var userRes = new restUserRepository();
        var userinfo = userRes.getUserForParam(1);
        $("#baseDate").val(userinfo['basedate']);

        //新建
        if (!action && msg != null) {
            $('#btn-print').remove();
            $('#btn-list').click(function () {
                openParentForFrame('供应商结算单', '/mainframe/finance/supSetlement.html?option=1', 822);
            });
            msg = JSON.parse(msg);
            $("#fullperson").html(msg.name); //填单人
            $("#startTime").val(GetDateStr(-30));
            $("#endTime").val(GetDateStr(1));
            $("#cuname").html('(空)');
            $("#checktime").html('(空)');
            $("#settle_type").val('1');
            $('#btn-goods-list').remove(); //还不能查看商品清单
            $('#goods-list').remove(); //还不能查看商品清单
            $("#supplier").removeAttr('disabled').change(function(){
                changeQueryParam();
            });
            $("#store").removeAttr('disabled').change(function(){
                changeQueryParam();
            });
            handleStockList();
        }
        $("#iSupplier").toggle();
        $("#sSupplier").toggle();
        bindConfigBalance('pay_type');
        changeSupplierId(); //防止没有初始值
        offSupplierSelect(); //关闭客户的下拉选择框模式(注释后则开启双重切换模式)
        bindAutoCompleteCommon('supplierName', 'supplier', null, changeQueryParam);


        //加载数据(除新建外全部共用)
        if (action && msg != null && id) {
            $('#goods-list').click(function(){
                openParentForFrame('清单'+id, '/mainframe/finance/viewSupSetlementGoods.html?id='+id);
            });
            $('#btn-goods-list').click(function(){
                openParentForFrame('清单'+id, '/mainframe/finance/viewSupSetlementGoods.html?id='+id);
            });
            currentId = id;
            var data = financeRes.findSupSetlementById(id);
            if (data != null) {
                $('#btn-list').click(function () {
                    openParentForFrame('供应商结算单', '/mainframe/finance/supSetlement.html?option=' + data.status, 822);
                });
                if (data.negative_id) $("#negative_id").html(data.negative_id).parent().show();
                $("#fullperson").html(data.uname); //填单人
                $("#cuname").html(fieldNull(data.cuname, '(空)')); //审核人
                $("#supplierId").val(fieldNull(data.scid));
                $("#supplierName").val(fieldNull(data.scname));
                $("#divCreate1").hide();
                $("#divCreate2").hide();
                $("#supplier").val(data.scid);
                //仓库
                //$("#store").val(data.sid);
                var sids = typeof(data.sids) == 'string' ? data.sids.split(',') : false;
                if (sids){
                    $('#sids input').each(function(){
                        if ($.inArray($(this).val(), sids) != -1){
                            $(this).attr('checked', 'checked');
                        }
                    });
                }
                $("#setlementId").html(id);
                $("#pay_type").val(data.pay_type);
                $("#settle_type").val(fieldNull(data.settle_type, 1));
                $("#createtime").html(formatDatetime(data.createtime));
                $("#checktime").html(formatDatetime(data.checktime));
                //$('#amountReal').val(num2price(data.amount_price));
                $('#discount').val(float2percent(data.discount));
                $('#memo').val(fieldNull(data.memo));

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
            }

            stampStatus(id2text(showInStatusList, data.status));
        }
        //加载数据 END
    }

    var negative = data && data.status == 11; //是否是负数
    computeAmountOnFinance(negative);

    /**
     * 审核
     */
    if (action == "ch") {
        $("#stores input").attr('disabled', 'disabled');
        $("#supplierName").attr('disabled', 'disabled');
        $("#baseDate").attr('disabled', 'disabled');
        $("#createSupSetlement").hide();
        $("#chSupSetlement").show();
        $("#xdSupSetlement").hide();
        $("#vwSupSetlement").hide();
    }

    /**
     * 冲单
     */
    if (action == "xd") {
        $("#btn-help").remove();
        $("#div-baseDate").remove();
        $("#createSupSetlement").hide();
        $("#chSupSetlement").hide();
        $("#xdSupSetlement").show();
        $("#vwSupSetlement").hide();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
    }

    /**
     * 查看
     */
    if (action == "vw") {
        $("#btn-help").remove();
        $("#div-baseDate").remove();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
        $("#createSupSetlement").hide();
        $("#chSupSetlement").hide();
        $("#xdSupSetlement").hide();
        $("#vwSupSetlement").show();
    }

    //按钮权限
    if (!checkPower(12301)) {}
    if (!checkPower(12302)) {}
    if (!checkPower(12303)) {}
    if (!checkPower(12304)) {}
    if (!checkPower(12305)) {}
    if (!checkPower(12306)) {
        $('#btn-goods-list').remove();
        $('#goods-list').remove();
    }
});





/*---------------------------------------华丽的分隔线---------------------------------------------*/


/**
 * 创建供应商结算单
 */
function createSupSetlement() {
    var scid = $("#supplierId").val();
    if (!checkAutoComplete(null, 'supplierId')) return false;

    var stock_list = getTableData();
    if (stock_list == null || stock_list.length <= 0) {
        runnerAlert("操作提示", "请选择单据");
        return false;
    }
    //var sid = $("#store").val();
    var stores = buildStoresParams();
    var sids = stores['sids'];
    var snames = stores['snames'];
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
        "memo": memo,
        "scid": scid,
        //"sid": sid,
        "sids": sids,
        "snames": snames,
        "discount": discount,
        "pay_type": pay_type,
        "stock_list": JSON.stringify(stock_list)
    };
    var res = financeRes.createSupSetlement(postData);
    if (res != null) {
        noticeFrame(822, 'refrush', page);
        runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/finance/checkSupSetlement.html?iframeid=82&iframename=" + encodeURI("新建供应商结算单"));
    }
}


/**
 * 审核
 */
function checkSupSetlement(add) {
    var scid = $("#supplierId").val();
    if (!checkAutoComplete(null, 'supplierId')) return false;
    var stock_list = getTableData();
    if (stock_list == null || stock_list.length <= 0) {
        runnerAlert("操作提示", "请选择单据");
        return false;
    }
    //var sid = $("#store").val();
    var stores = buildStoresParams();
    var sids = stores['sids'];
    var snames = stores['snames'];
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
        "memo": memo,
        "scid": scid,
        //"sid": sid,
        "sids": sids,
        "snames": snames,
        "discount": discount,
        "pay_type": pay_type,
        "stock_list": JSON.stringify(stock_list)
    };
    var id = add ? false : currentId;
    var res = financeRes.checkSupSetlement(id, postData);
    if (res != null) {
        noticeFrame(822, 'refrush', page);
        if (add){
            runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/finance/checkSupSetlement.html?iframeid=82&iframename=" + encodeURI("新建供应商结算单"));
        } else {
            runnerConfirem("操作提示", "审核通过");
        }
    }
}


/**
 * 冲单
 */
function xdSupSetlement() {
    if (confirm("确定红冲该单据?")) {
        var res = financeRes.xdSupSetlementById(currentId);
        if (res != null) {
            noticeFrame(822, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 删除(审核不通过)
 */
function delSupSetlement() {
    if (confirm("确定作废该单据?")) {
        var res = financeRes.delSupSetlementById(currentId);
        if (res != null) {
            noticeFrame(822, 'refrush', page);
            runnerConfirem("操作提示", "作废成功");
        }
    }
}