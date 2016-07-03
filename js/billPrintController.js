/**
 * 打印模版(默认)
 */

//定义初始变量
var lineNum = 10; //单页表格行数
var bt = baidu.template;

//初始化数据模块
var stockRes = new stockRepository();
var returnRes = new returnGoodsRepository();
var financeRes = new financeRepository();
var rPCR = new restPickingCartRepository();


//页面初始加裁
$(function () {
    $('#btn-back').click(function(){
        location.href = document.referrer;
    });
    //加载获取参数
    var tid = getUrlParam("tid"); //模板ID
    //var did = getUrlParam("did"); //需要打印的单据类型
    var id = getUrlParam("id"); //需要打印的单据ID
    if (tid != null && id != null) {

        var p = new Print(tid, id);
        p.view();

    }
});


/**
 * 定义打印对象
 */
function Print(tpl, id) {
    var o = {};

    o.tpl = tpl; //打印的模板ID
    o.id = id; //单据的ID，用于读取数据

    o.view = function () {
        //console.log("-----start view print content------------tpl:" + tpl + ",id:" + id);
        var data = null;
        var goods_list = [];
        var account_list = [];
        var stock_list = [];
        var sorting_glist = [];
        var data_ext = {}; //附加数据
        var barcode = null;

        //获取到数据
        this.tpl = parseInt(this.tpl);
        switch (this.tpl) {
            case 121: //采购订单
                data = stockRes.findOrderById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.id = fieldNull(data.id, '无');
                data.buname = addPhone2Name(data.buname, data.buphone);
                data.cuname = fieldNull(data.cuname, '无');
                data.amount = formatAmountWithComma(data.amount);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] =  num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['price_box'] =  num2price(data.goods_list[i].amount_price / goods_list[i]['total_box']);
                    goods_list[i]['gtax_rate'] =  float2percent(data.goods_list[i].gtax_rate) + '%';
                }
                data.goods_list = goods_list;
                break;

            case 161: //入库单
                data = stockRes.findStockInById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.order_id = fieldNull(data.order_id, '无');
                data.buname = addPhone2Name(data.buname, data.buphone);
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showInStatusList, data.status);
                data.amount = formatAmountWithComma(data.amount);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] =  num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['price_box'] =  num2price(data.goods_list[i].amount_price / goods_list[i]['total_box']);
                    goods_list[i]['gtax_rate'] =  float2percent(data.goods_list[i].gtax_rate) + '%';
                }
                data.goods_list = goods_list;
                break;

            case 181: //采购退货单
                data = returnRes.findReturnOutByIdBillIN(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.order_id = fieldNull(data.order_id, '无');
                data.suname = addPhone2Name(data.suname, data.suphone);
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showOutStatusList, data.status);
                data.amount = formatAmountWithComma(data.amount);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] =  num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['gtax_rate'] =  float2percent(data.goods_list[i].gtax_rate) + '%';
                }
                data.goods_list = goods_list;
                break;

            //case 22: //客户订单
            //    data = stockRes.findOrderByOutId(this.id);
            //    break;

            //case 24: //退货申请单
            //    break;

            case 261: //出库单
                data = stockRes.findStockOutById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.order_id = fieldNull(data.order_id, '无');
                data.suname = addPhone2Name(data.suname, data.suphone);
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showOutStatusList, data.status);
                data.amount = formatAmountWithComma(data.amount);
                data.is_cod = (data.is_cod==1 ? '(货到付款) ' : '');
                if (data.mall_orderno) {
                    data.mall_info = '收货人:' + fieldNull(data.contacts) + '(' + fieldNull(data.phone) + ')';
                    data.mall_info += ' 收货地址:' + formatReceipt(data.receipt);
                }
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] =  num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['price_box'] =  num2price(data.goods_list[i].amount_price / goods_list[i]['total_box']);
                    goods_list[i]['gtax_rate'] =  float2percent(data.goods_list[i].gtax_rate) + '%';
                }
                data.goods_list = goods_list;
                break;

            case 281: //销售退回单
                data = returnRes.findReturnInByIdBill(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.order_id = fieldNull(data.order_id, '无');
                data.buname = addPhone2Name(data.buname, data.buphone);
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showInStatusList, data.status);
                data.amount = formatAmountWithComma(data.amount);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] =  num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['gtax_rate'] =  float2percent(data.goods_list[i].gtax_rate) + '%';
                }
                data.goods_list = goods_list;
                break;

            case 811: //客户结算单
                var type_order = {
                    1: '客户出货',
                    2: '客户退货'
                };
                data = financeRes.findCusSetlementGoodsById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.checktime = fieldNull(formatDatetime(data.checktime), '无');
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showInStatusList, data.status);
                data.amount_price = num2price(data.amount_price);
                //data.settle_type = fieldNull(data.settle_type, 1)==1 ? '线下' : '线上';
                data.pay_type = id2text(getAllConfigBalance(), data.pay_type);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] = num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['gtax_rate'] = float2percent(data.goods_list[i].gtax_rate) + '%';
                    goods_list[i]['stock_type'] = type_order[goods_list[i].stock_type];
                }
                data.goods_list = goods_list;
                //分税率汇总部分(含HTML)
                if (data.tax_group) {
                    var html = '';
                    for (var k in data.tax_group) {
                        var amountReal = num2price(data.tax_group[k].amount_price);
                        var amountCut = num2price(data.tax_group[k].discount_price);
                        var amountTobe = num2price(parseFloat(amountReal) + parseFloat(amountCut));
                        var amountTax = num2price(data.tax_group[k].tax_price);
                        var tax = float2percent(data.tax_group[k].tax_rate);
                        html += '<tr><td class="item-right"><strong>' + tax + '%税汇总</strong></td><td class="item-right">';
                        html += '<span class="total-item">应结金额：<strong>' + formatAmountWithComma(amountTobe) + '</strong> 元</span>';
                        html += '<span class="total-item">优惠金额：<strong>' + formatAmountWithComma(amountCut) + '</strong> 元</span>';
                        html += '<span class="total-item">实结金额：<strong>' + formatAmountWithComma(amountReal) + '</strong> 元</span>';
                        html += '<span class="total-item">税额：<strong>' + formatAmountWithComma(amountTax) + '</strong> 元</span>';
                        html += '</td></tr>';
                    }
                    data_ext['subTotal'] = html;
                }
                //总计
                data['amountTobe'] = formatAmountWithComma(parseFloat(data.amount_price) + parseFloat(data.discount_price));
                data['amountCut'] = formatAmountWithComma(data.discount_price);
                data['amountReal'] = formatAmountWithComma(data.amount_price);
                data['amountTax'] = formatAmountWithComma(data.tax_price);
                break;

            case 822: //供应商结算单
                var type_order = {
                    1: '采购退货',
                    2: '采购入库'
                };
                data = financeRes.findSupSetlementGoodsById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.checktime = fieldNull(formatDatetime(data.checktime), '无');
                data.cuname = fieldNull(data.cuname, '无');
                data.discountText = float2percent(data.discount) + '%';
                //data.sname = fieldNull(data.sname, '无');
                data.snames = fieldNull(data.snames, '无');
                data.status = id2text(showInStatusList, data.status);
                //data.amount_price = formatAmountWithComma(data.amount_price);
                data.pay_type = id2text(getAllConfigBalance(), data.pay_type);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['total_box'] = num2price(data.goods_list[i].total / data.goods_list[i].gspec);
                    goods_list[i]['gtax_rate'] = float2percent(data.goods_list[i].gtax_rate) + '%';
                    goods_list[i]['stock_type'] = type_order[goods_list[i].stock_type];
                }
                data.goods_list = goods_list;

                //分税率汇总部分(含HTML)
                if (data.tax_group) {
                    var html = '';
                    for (var k in data.tax_group) {
                        var amountReal = num2price(data.tax_group[k].amount_price);
                        var amountCut = num2price(data.tax_group[k].discount_price);
                        var amountTobe = num2price(parseFloat(amountReal) + parseFloat(amountCut));
                        var amountTax = num2price(data.tax_group[k].tax_price);
                        var tax = float2percent(data.tax_group[k].tax_rate);
                        html += '<tr><td class="item-right"><strong>' + tax + '%税汇总</strong></td><td class="item-right">';
                        html += '<span class="total-item">应结金额：<strong>' + formatAmountWithComma(amountTobe) + '</strong> 元</span>';
                        html += '<span class="total-item">优惠金额：<strong>' + formatAmountWithComma(amountCut) + '</strong> 元</span>';
                        html += '<span class="total-item">实结金额：<strong>' + formatAmountWithComma(amountReal) + '</strong> 元</span>';
                        html += '<span class="total-item">税额：<strong>' + formatAmountWithComma(amountTax) + '</strong> 元</span>';
                        html += '</td></tr>';
                    }
                    data_ext['subTotal'] = html;
                }
                //总计
                data['amountTobe'] = formatAmountWithComma(parseFloat(data.amount_price) / parseFloat(data.discount));
                data['amountCut'] = formatAmountWithComma(parseFloat(data.amount_price) / parseFloat(data.discount) - data.amount_price);
                data['amountReal'] = formatAmountWithComma(data.amount_price);
                data['amountTax'] = formatAmountWithComma(data.tax_price);
                break;

            case 833: //收款单
            case 877: //会员收款单
                data = financeRes.findGatheringById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.checktime = fieldNull(formatDatetime(data.checktime), '无');
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showInStatusList, data.status);
                data.amount_price = formatAmountWithComma(data.amount_price);
                data.pay_type = id2text(getAllConfigBalance(), data.pay_type);
                for (var i=0; i<data.account_list.length; i++){
                    account_list[i] = data.account_list[i];
                    account_list[i]['amount_price'] =  num2price(data.account_list[i].amount_price);
                    account_list[i]['memo'] =  fieldNull(data.account_list[i].memo, '无');
                }
                data.account_list = account_list;
                break;

            case 844: //付款单
                data = financeRes.findPaymentById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.checktime = fieldNull(formatDatetime(data.checktime), '无');
                data.cuname = fieldNull(data.cuname, '无');
                data.status = id2text(showInStatusList, data.status);
                data.amount_price = formatAmountWithComma(data.amount_price);
                data.pay_type = id2text(getAllConfigBalance(), data.pay_type);
                for (var i=0; i<data.account_list.length; i++){
                    account_list[i] = data.account_list[i];
                    account_list[i]['amount_price'] =  num2price(data.account_list[i].amount_price);
                    account_list[i]['memo'] =  fieldNull(data.account_list[i].memo, '无');
                }
                data.account_list = account_list;
                break;

            case 29: //拣货派车单
                data = rPCR.findById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.id = fieldNull(data.id, '无');
                //data.duname = addPhone2Name(data.duname, data.duphone);
                data.cuname = fieldNull(data.cuname, '无');
                data.ccname = fieldNull(data.ccname);
                data.status = data.status == 1 ? '已派车' : '已作废';
                data.sname = fieldNull(data.sname, '无');
                data.car_license = data.car_license + ' [' +  data.car_ton + '吨]';
                data.address = fieldNull(data.areapro) + fieldNull(data.areacity) + fieldNull(data.areazone) + fieldNull(data.areastreet);
                data.weightSum = 0;
                for (var i=0; i<data.sorting_glist.length; i++){
                    var group = data.sorting_glist[i]; //新的一组
                    sorting_glist[i] = [];
                    for (var j=0; j<group.length; j++){
                        sorting_glist[i][j] = group[j]; //copy
                        sorting_glist[i][j].volume = (group[j].total / group[j].gspec).toFixed(2); //箱数
                        sorting_glist[i][j].stock_out_id = group[j].stock_out_id ? group[j].stock_out_id : group[j].stock_id; //出库单号
                        sorting_glist[i][j].volume_sum = parseFloat(group[j].group_box_total).toFixed(2); //总箱数
                        sorting_glist[i][j].weight_sum = group[j].group_weight; //总重
                        if (j == 0){
                            data.weightSum += parseFloat(group[j].group_weight);
                        }
                        //data.weightSum += sorting_glist[i][j].volume * group[j].weight;
                    }
                }
                data.weightSum = data.weightSum.toFixed(2); //总计
                data.sorting_glist = sorting_glist;
                break;

            case 855: //代销结算单
                data = financeRes.readProxySetlementById(this.id);
                barcode = this.id;
                data.createtime = formatDatetime(data.createtime);
                data.checktime = fieldNull(formatDatetime(data.checktime), '无');
                data.cuname = fieldNull(data.cuname, '无');
                data.discountText = float2percent(data.discount) + '%';
                data.sname = fieldNull(data.sname, '无');
                data.status = id2text(showInStatusList, data.status);
                //data.amount_price = formatAmountWithComma(data.amount_price);
                data.pay_type = id2text(getAllConfigBalance(), data.pay_type);
                for (var i=0; i<data.goods_list.length; i++){
                    goods_list[i] = data.goods_list[i];
                    goods_list[i]['gtax_rate'] = float2percent(data.goods_list[i].gtax_rate) + '%';
                }
                data.goods_list = goods_list;

                //分税率汇总部分(含HTML)
                if (data.tax_group) {
                    var html = '';
                    for (var k in data.tax_group) {
                        var amount_price = num2price(data.tax_group[k].amount_price);
                        var tax_price = num2price(data.tax_group[k].tax_price);
                        var tax = float2percent(data.tax_group[k].tax_rate);
                        html += '<tr><td class="item-right"><strong>' + tax + '%税汇总</strong></td><td class="item-right">';
                        html += '<span class="total-item">折后税额：<strong>' + formatAmountWithComma(tax_price) + '</strong> 元</span>';
                        html += '<span class="total-item">折后实结金额：<strong>' + formatAmountWithComma(amount_price) + '</strong> 元</span>';
                        html += '</td></tr>';
                    }
                    data_ext['subTotal'] = html;
                }
                break;

        }

        //console.log(this.tpl, this.id, printData);
        if (data == null){
            runnerAlert('打印出错', '暂不支持该类型单据打印(' + this.tpl + ')');
            //history.back();
            return false;
        }
        if (!data){
            runnerAlert('打印出错', '获取单据数据出错(' + this.id + '),请重试!');
            //history.back();
            return false;
        }

        //追加通用信息
        data.now = getNowFormatDate();
        //补充订单号与二维码
        //$("#bcTarget").barcode(this.id, "code11", {barWidth: 2, barHeight: 30});
        //console.log(this.id);

        //统一单据明细字段名
        var data_list;
        if (typeof(data.goods_list) == 'object'){
            data_list = data.goods_list;
            delete data.goods_list;
        } else if (typeof(data.stock_list) == 'object') {
            data_list = data.stock_list;
            delete data.stock_list;
        } else if (typeof(data.account_list) == 'object') {
            data_list = data.account_list;
            delete data.account_list;
        } else if (typeof(data.sorting_glist) == 'object') {
            data_list = data.sorting_glist;
            delete data.account_list;
        } else {
            runnerAlert('打印出错', '不支持的单据明细!');
            //history.back();
            return false;
        }

        //分页逻辑(把原始数据分组)
        //var num = Math.ceil((data.goods_list.length / lineNum).toFixed(1)); //页数
        var data_sum = data_sum_init(); //初始化单据总计栏
        var data_split = []; //分组后的数据
        var j = -1;
        for (var i=0; i<data_list.length; i++){
            if (i%lineNum == 0) { //新组
                data_split[++j] = $.extend(true, {}, data); //先复制基本信息(此处一定要拷贝,千万不要直接赋值!!!)
                data_split[j]['data_list'] = []; //再初始化表格
            }
            data_split[j]['data_list'].push(data_list[i]); //向表格追加数据

            data_sum = data_sum_add(data_sum, data_list[i]); //追加计算总计
        }

        var i_list = -lineNum; //初始化序号
        for (var i=0; i<data_split.length; i++){
            var tpl_data = data_split[i];
            tpl_data['i_list'] = i_list + lineNum; //明细序号
            i_list = tpl_data['i_list']; //分页后序号累加
            tpl_data['page_current'] = i + 1; //当前页
            tpl_data['page_sum'] = data_split.length; //总页数
            tpl_data['data_sum'] = data_sum; //单据总计

            //克隆一个内容块,并添加到DOM
            $('#print_content').clone(true).attr('id', 'print_content_'+i).appendTo('#print_area').show();

            //获取数据绑定标题，头部，清单，属部
            var temp_title = "template_" + this.tpl + "_title";
            var temp_header = "template_" + this.tpl + "_header";
            var temp_list = "template_" + this.tpl + "_list";
            var temp_footer = "template_" + this.tpl + "_footer";

            var html_title = bt(temp_title, tpl_data);
            var html_header = bt(temp_header, tpl_data);
            var html_list = bt(temp_list, tpl_data);
            var html_footer = bt(temp_footer, tpl_data);

            $("#print_content_"+i+" div[name='com_content_title']").append(html_title);
            $("#print_content_"+i+" table[name='com_content_header']").append(html_header);
            $("#print_content_"+i+" div[name='com_content_list']").append(html_list);
            $("#print_content_"+i+" div[name='com_content_footer']").append(html_footer);
        }


        //附加数据
        $.each(data_ext, function(k, v){
            var table = $('table[name="' + k + '"]');
            var div = $('div[name="' + k + '"]');
            if (table.length > 0){
                table.html(v).show();
            }
            if (div.length > 0){
                div.html(v).show();
            }
        });

        //显示条码
        if (barcode && $(".order-barcode").length){
            $(".order-barcode").barcode(barcode, "code128", {barWidth: 2, barHeight: 30});
        }

        //去掉最后一个块尾部的边距
        $('#print_content_'+i+' .print-body').css('margin-bottom', '');

    };
    return o;
}

/**
 * 初始化单据总计栏
 */
function data_sum_init(){
    var data_sum = {};
    //普通单据
    data_sum['amount_price'] = 0;
    data_sum['total'] = 0;
    data_sum['total_box'] = 0;
    //代销结算单
    data_sum['current_sell_total'] = 0;
    data_sum['current_sell_amount'] = 0;
    data_sum['current_real_total'] = 0;
    data_sum['current_real_amount'] = 0;
    data_sum['current_after_discount_amount'] = 0;
    //派车单
    data_sum['group_total'] = 0;
    data_sum['volume_sum'] = 0;
    data_sum['weight_sum'] = 0;
    return data_sum;
}

/**
 * 追加计算总计
 * @param data_sum
 * @param data_add
 * @returns {*}
 */
function data_sum_add(data_sum, data_add){
    //普通单据
    data_sum['amount_price'] = num2price(parseFloat(data_sum['amount_price']) + parseFloat(data_add.amount_price));
    data_sum['total'] = num2total(parseInt(data_sum['total']) + parseInt(data_add.total));
    data_sum['total_box'] = num2price(parseFloat(data_sum['total_box']) + parseFloat(data_add.total_box));
    //代销结算单
    data_sum['current_sell_total'] = num2total(parseInt(data_sum['current_sell_total']) + parseInt(data_add.current_sell_total));
    data_sum['current_sell_amount'] = num2price(parseFloat(data_sum['current_sell_amount']) + parseFloat(data_add.current_sell_amount));
    data_sum['current_real_total'] = num2total(parseInt(data_sum['current_real_total']) + parseInt(data_add.current_real_total));
    data_sum['current_real_amount'] = num2price(parseFloat(data_sum['current_real_amount']) + parseFloat(data_add.current_real_amount));
    data_sum['current_after_discount_amount'] = num2price(parseFloat(data_sum['current_after_discount_amount']) + parseFloat(data_add.current_after_discount_amount));
    //派车单
    if ($.isArray(data_add)) {
        data_sum['group_total'] = num2total(parseInt(data_sum['group_total']) + parseInt(data_add[0].group_total));
        data_sum['volume_sum'] = num2price(parseFloat(data_sum['volume_sum']) + parseFloat(data_add[0].volume_sum));
        data_sum['weight_sum'] = num2price(parseFloat(data_sum['weight_sum']) + parseFloat(data_add[0].weight_sum));
    }
    return data_sum;

}

/**
 * 拉起打印
 */
function printPage(container) {
    $("#" + container).jqprint();
}

