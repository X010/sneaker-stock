var resCom = new commissionRepository();
var storeRes = new restStoreRepository();

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
            "class": "op",
            "template": "<input type='checkbox' id='hiddengid_#{index}' name='gid' value='#{gid}' checked='checked' index='#{index}' />",
            "dattr": []
        },
        {
            "name": "stock_id", //出货单号
            "type": true,
            "class" : "code",
            "template": "<input class='f-input-num' disabled name='stock_id' index='#{index}' id='rtstock_id_#{index}' type='text' value='#{stock_id}' />",
            "fill": []
        },
        {
            "name": "gbarcode",
            "type": true,
            "class" : "barcode",
            "template": "<input class='f-input-goodname' disabled index='#{index}' name='barcode' id='rtbarcode_#{index}' type='text' value='#{gbarcode}' size='10' />",
            "dattr": []
        },
        {
            "name": "gname",
            "type": true,
            "class" : "gname",
            "template": "<input class='f-input-goodname' disabled index='#{index}' id='rtname_#{index}' type='text' value='#{gname}' size='10' />",
            "fill": []
        },
        {
            "name": "status",
            "type": true,
            "class" : "status",
            "template": "<input class='f-input-status' disabled index='#{index}' name='status' id='rtstatus_#{index}' type='text' value='#{status}' />",
            "fill": []
        },
        {
            "name": "box_total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled name='box_total' id='rtbox_total_#{index}' value='#{box_total}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "amount_price", //商品金额
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' disabled index='#{index}' name='amount_price' id='rtamount_price_#{index}' type='text' value='#{amount_price}' />",
            "dattr": []
        },
        {
            "name": "volume",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled name='volume' id='rtvolume_#{index}' value='#{volume}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "amount_price_count", //实收金额
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-num' disabled name='amount_price_count' id='rtamount_price_count_#{index}' value='#{amount_price_count}' type='text' />",
            "dattr": []
        },
        {
            "name": "commission_rate", //提成(%)
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' name='commission_rate' id='rtcommission_rate_#{index}' value='#{commission_rate}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "commission_unit_price", //提成(元/箱)
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' name='commission_unit_price' id='rtcommission_unit_price_#{index}' value='#{commission_unit_price}' type='text' />",
            "dattr": []
        },
        {
            "name": "commission_amount", //应提金额
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' disabled name='commission_amount' id='rtcommission_amount_#{index}' value='#{commission_amount}' type='text' />",
            "dattr": []
        },
        {
            "name": "commission_real_amount", //实提金额
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' name='commission_real_amount' id='rtcommission_real_amount_#{index}' value='#{commission_real_amount}' type='text' />",
            "dattr": []
        },
        {
            "name": "memo",
            "type": true,
            "class" : "gname",
            "template": "<input class='f-input-goodname' name='memo' id='rtmemo_#{index}' value='#{memo}' type='text' />",
            "dattr": []
        }

    ]
};

/**
 * 绑定自动输入框
 */
function bindThisPageAutoComplete(container, isInit) {}




/**
 * 获取勾选商品的单据IDs
 */
function getStockList() {
    //放到集合中去重
    var stock_ids_obj = {};
    $('#mainList tbody tr').each(function() {
        if ($(this).find('input[name="gid"]').prop('checked') && $(this).find('input[name="stock_id"]').val()){
            var stock_id_current = $(this).find('input[name="stock_id"]').val();
            if (stock_id_current) stock_ids_obj[stock_id_current] = true;
        }
    });
    //拼装成字符串
    var stock_ids_str = '';
    $.each(stock_ids_obj, function(k, v){
        stock_ids_str += k + ',';
    });
    //console.log(stock_ids_str);
    return stock_ids_str;
}


/**
 * 获取勾选商品的商品列表数据
 */
function getGoodsList(){
    var goods_list = [];
    $('#mainList tbody tr').each(function() {
        var input_gid = $(this).find('input[name="gid"]');
        var input_status = $(this).find('input[name="status"]');
        if (input_gid.prop('checked') && $(this).find('input[name="stock_id"]').val()){
            //过滤掉合并单元格的
            var repeat = false;
            for (var i=0; i<goods_list.length; i++){
                if (goods_list[i]['gid'] == input_gid.val() && goods_list[i]['is_activity'] == (input_status.val() ? 1 : 0)){
                    repeat = true;
                }
            }
            if (!repeat){
                var item = {};
                item['gid'] = $(this).find('input[name="gid"]').val();
                item['is_activity'] = $(this).find('input[name="status"]').val() ? 1 : 0;
                item['commission_rate'] = $(this).find('input[name="commission_rate"]').val();
                item['commission_unit_price'] = $(this).find('input[name="commission_unit_price"]').val();
                item['commission_amount'] = $(this).find('input[name="commission_amount"]').val();
                item['commission_real_amount'] = $(this).find('input[name="commission_real_amount"]').val();
                item['memo'] = $.trim($(this).find('input[name="memo"]').val());
                goods_list.push(item);
            }
        }
    });
    return goods_list;
}


/**
 * 填充每个商品的隐藏行数据
 * @param input
 */
function fullHiddenRow(input){
    var tr = input.parent().parent();
    var barcode = tr.find('input[name="barcode"]').val();
    var status = tr.find('input[name="status"]').val();
    $('#mainList tbody tr').each(function(){
        if ($(this).find('input[name="barcode"]').val() == barcode && $(this).find('input[name="status"]').val() == status){
            $(this).find('input[name="' + input.attr('name') + '"]').val(input.val());
        }
    });
}



/**
 * 单据批量填充模块(通用)
 * @param stockList
 */
function handleList(data){
    var bindData = [];
    if (data != null) {
        var k = 0;
        for (var i=0; i<data.length; i++){
            var group = data[i]; //新的一组
            for (var j=0; j<group.length; j++){
                bindData[k] = group[j]; //copy
                if (group[j].is_activity == 1){
                    bindData[k]['status'] = '含赠品';
                } else {
                    bindData[k]['status'] = ''; //不能有内容
                }
                if (!j){
                    //开始新的一组(HTML跨行)
                    bindData[k]['volume_HTMLrowspan'] = group.length;
                    bindData[k]['amount_price_count_HTMLrowspan'] = group.length;
                    bindData[k]['commission_rate_HTMLrowspan'] = group.length;
                    bindData[k]['commission_unit_price_HTMLrowspan'] = group.length;
                    bindData[k]['commission_amount_HTMLrowspan'] = group.length;
                    bindData[k]['commission_real_amount_HTMLrowspan'] = group.length;
                    bindData[k]['memo_HTMLrowspan'] = group.length;
                    //填充数据
                    bindData[k]['volume'] = num2price(group[j].group_box_total); //结算箱数
                    bindData[k]['amount_price_count'] = num2price(group[j].group_amount); //实收金额
                    bindData[k]['commission_rate'] = num2price(group[j].commission_rate, '');  //提成(%)
                    var commission_unit_price = num2price(group[j].commission_unit_price, '');
                    bindData[k]['commission_unit_price'] = commission_unit_price == '0.00' ? '' : commission_unit_price; //提成(元/箱)
                    bindData[k]['commission_amount'] = num2price(group[j].commission_amount);  //应提金额
                    bindData[k]['commission_real_amount'] = num2price(group[j].commission_real_amount, ''); //实提金额
                    bindData[k]['memo'] = fieldNull(group[j].memo); //说明
                } else {
                    //重复的组(HTML)
                    bindData[k]['volume_HTMLremove'] = true;
                    bindData[k]['amount_price_count_HTMLremove'] = true;
                    bindData[k]['commission_rate_HTMLremove'] = true;
                    bindData[k]['commission_unit_price_HTMLremove'] = true;
                    bindData[k]['commission_amount_HTMLremove'] = true;
                    bindData[k]['commission_real_amount_HTMLremove'] = true;
                    bindData[k]['memo_HTMLremove'] = true;
                }
                k++;
            }
        }
        $('#checkAll').attr('checked', true);
    }
    $("#mainList").runnerTableOnStart(opts, bindData, bindAutoComplete);

    //将输入值填充到隐藏行
    $('#mainList input[name="commission_rate"]').blur(function(){
        fullHiddenRow($(this));
        changeSum();
    });
    $('#mainList input[name="commission_unit_price"]').blur(function(){
        fullHiddenRow($(this));
        changeSum();
    });
    $('#mainList input[name="commission_real_amount"]').blur(function(){
        fullHiddenRow($(this));
        formatSum();
    });
    $('#mainList input[name="memo"]').blur(function(){
        fullHiddenRow($(this));
    });

    //处理空行
    $("#mainList tbody tr").each(function () {
        var checkbox = $(this).find('input[type="checkbox"]');
        //if empty
        if (!checkbox.parent().parent().find('input[name="stock_id"]').val()) {
            checkbox.hide();
        }
    });
    //绑定勾选事件
    $('#mainList input[type="checkbox"]').click(function(){
        var stock_id_current = $(this).parent().parent().find('input[name="stock_id"]').val();
        var checked = $(this).prop('checked');
        $('#mainList input[type="checkbox"]').each(function(){
            var stock_id = $(this).parent().parent().find('input[name="stock_id"]').val();
            if (stock_id_current == stock_id){
                if (checked){
                    $(this).attr('checked', true);
                } else {
                    $(this).removeAttr('checked');
                    $('#checkAll').removeAttr('checked');
                }
            }
        });
        changeSum();
    });
    //计算总计
    changeSum();
}


/**
 * 通过时间和业务员筛选出出货单
 */
function searchStock(){
    var all = $("#all").prop('checked') ? 1 : 0;
    var begin_date = $.trim($('#begin_date').val());
    var end_date = $.trim($('#end_date').val());
    /*if (!begin_date || !end_date){
        runnerAlert('操作提示', '请选择起至日期');
        return;
    }*/
    var sid = $("#sid").val();
    var suid = $("#suid").val();
    //if (!checkAutoComplete('suid')) return false;

    if ((begin_date && end_date && suid) || (all && suid)){
        var params = {
            'all': all,
            'begin_date': begin_date,
            'end_date': end_date,
            'suid': suid,
            'sid': sid,
        };

        var res = resCom.findStock(params);
        if (res){
            $('#customer_count').text(num2total(res.customer_count));
            handleList(res.data);
        }
    }

}



/* ---------------------------------------------- 总计数据动态计算 ---------------------------------------------- */

/**
 * 重新计算小计 和 单据总计
 */
function changeSum(){
    computeSum();
    formatSum();
}


var data_for_formatSum = {};
/**
 * 小计
 */
function computeSum(){
    //初始化清零数据
    $('#mainList tbody tr').each(function(){
        var opt = $(this).find('td:first input');
        if (opt.prop('checked') && opt.css('display')!='none') {
            $(this).parent().parent().find('input[name="commission_amount"]').val('0.00');
            //$(this).parent().parent().find('input[name="volume"]').val('0.00');
            //$(this).parent().parent().find('input[name="amount_price_count"]').val('0.00');
        } else {
            $(this).parent().parent().find('input[name="commission_amount"]').val('');
            $(this).parent().parent().find('input[name="volume"]').val('');
            $(this).parent().parent().find('input[name="amount_price_count"]').val('');
        }
    });

    data_for_formatSum = {}; //总计
    $('#mainList tbody tr').each(function(){
        var opt = $(this).find('td:first input');
        if (opt.prop('checked') && opt.css('display')!='none') {
            //箱数 box_total -> volume
            var box_total = $(this).find('input[name="box_total"]').val();
            box_total = !isNaN(box_total) ? parseFloat(box_total) : 0;
            //金额 amount_price -> amount_price_count
            var amount_price = $(this).find('input[name="amount_price"]').val();
            amount_price = !isNaN(amount_price) ? parseFloat(amount_price) : 0;

            //计算提成
            //提成(%)
            var commission_rate = $.trim($(this).find('input[name="commission_rate"]').val());
            commission_rate = parseFloat(commission_rate) / 100;
            //提成(元/箱)
            var commission_unit_price = $.trim($(this).find('input[name="commission_unit_price"]').val());
            commission_unit_price = parseFloat(commission_unit_price);

            //应提金额
            var commission_amount = 0;
            if (commission_rate){
                commission_amount = amount_price * commission_rate;
            } else if (commission_unit_price){
                commission_amount = box_total * commission_unit_price;
            }

            //小计
            var key = getKeyFromTable($(this));
            if (key) {
                if (typeof(data_for_formatSum[key]) == 'undefined') {
                    data_for_formatSum[key] = {
                        'volume': box_total, //结算箱数
                        'amount_price_count': amount_price, //实收金额
                        'commission_amount_count': commission_amount, //应提金额
                    };
                } else {
                    data_for_formatSum[key]['volume'] += parseFloat(box_total);
                    data_for_formatSum[key]['amount_price_count'] += parseFloat(amount_price);
                    data_for_formatSum[key]['commission_amount_count'] += parseFloat(commission_amount);
                }
            }
        }
    });

    //小计赋值到table
    if (Object.prototype.isPrototypeOf(data_for_formatSum) && Object.keys(data_for_formatSum).length === 0){
        //无值(空对象)
        $('#mainList tbody tr').each(function(){
            var key = getKeyFromTable($(this));
            if (key) {
                var input;
                input = $(this).find('input[name="volume"]').val('0.00');
                fullHiddenRow(input);
                input = $(this).find('input[name="amount_price_count"]').val('0.00');
                fullHiddenRow(input);
                input = $(this).find('input[name="commission_amount"]').val('0.00');
                fullHiddenRow(input);
            }
        });
    } else {
        //有值
        $('#mainList tbody tr').each(function(){
            var key = getKeyFromTable($(this));
            if (key && data_for_formatSum[key]){
                var volume = parseFloat(data_for_formatSum[key]['volume']).toFixed(2);
                var amount_price_count = parseFloat(data_for_formatSum[key]['amount_price_count']).toFixed(2);
                var commission_amount_count = parseFloat(data_for_formatSum[key]['commission_amount_count']).toFixed(2);
                var input;
                input = $(this).find('input[name="volume"]').val(volume);
                fullHiddenRow(input);
                input = $(this).find('input[name="amount_price_count"]').val(amount_price_count);
                fullHiddenRow(input);
                input = $(this).find('input[name="commission_amount"]').val(commission_amount_count);
                fullHiddenRow(input);
            }
        });
    }

}

/**
 * 从table中拼装计数器的key
 * @param tr
 * @returns {*}
 */
function getKeyFromTable(tr){
    //var oid = tr.find('input[name="stock_id"]').val();
    var barcode = tr.find('input[name="barcode"]').val();
    var status = tr.find('input[name="status"]').val();
    return barcode + status;
}


/**
 * 单据总计
 */
function formatSum(){
    //应提金额
    var commission_amount = 0;
    $.each(data_for_formatSum, function(k, v){
        commission_amount += v['commission_amount_count'];
    });
    $('#amountTobe').text(commission_amount.toFixed(2));

    //实提金额
    var commission_real_amount = 0;
    $('#mainList tbody tr').each(function(){
        var input = $(this).find('input[name="commission_real_amount"]');
        var current_amount = $.trim(input.val());
        if (input.parent().css('display')!='none' && !isNaN(current_amount) && current_amount != ''){
            commission_real_amount += parseFloat(current_amount);
        }
    });
    $('#amountReal').text(commission_real_amount.toFixed(2));

}


/*--------------------------------------------------分隔线-----------------------------------------------------*/


var com_id = 0;

/**
 * 初始加载数据
 */
$(function () {
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name); //默认填单人
        //bindSelfStore("store"); //绑定仓库
        //$('#store').prepend('<option value="">- 请选择 -</option>');
        //$('#store').change(function(){
        //    autoSetArea();
        //});
        bindAutoCompleteCommon('suname', 'user');
        bindSelfStore('sid');
        $('#sid').prepend('<option value="">所有仓库</option>');
    }
    $('#btn-list').click(function(){
        openParentForFrame('提成结算单','/mainframe/finance/commission.html', 866);
    });

    //勾选列出所有则禁用时间选项
    $('#all').click(function(){
        if ($(this).prop('checked')){
            $('#begin_date').val('').attr('disabled', 'disabled');
            $('#end_date').val('').attr('disabled', 'disabled');
            searchStock();
        } else {
            $('#begin_date').removeAttr('disabled');
            $('#end_date').removeAttr('disabled');
        }
    });

    //全选勾
    $('#checkAll').click(function(){
        if ($(this).prop('checked')){
            $('#mainList input[type="checkbox"]').attr('checked', true);
        } else {
            $('#mainList input[type="checkbox"]').removeAttr('checked');
        }
    });

    if (action == null || action == 'undefined' || !id) {
        //新建
        $('#btn-print').remove();
        $('#begin_date').change(function(){
            searchStock();
        });
        $('#end_date').change(function(){
            searchStock();
        });
        $('#suid').change(function(){
            searchStock();
        });
        $('#sid').change(function(){
            searchStock();
        });
        handleList();
    } else {

        //除新建外通用
        com_id = id;
        $("#com_id").html(id);
        var currentData = resCom.findById(id);
        if (currentData != null) {
            $("#iOrderDate").text(formatDatetime(currentData.createtime));
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#cuname").html(fieldNull(currentData.cuname));
            $("#suname").val(fieldNull(currentData.suname)).attr('disabled', 'disabled');
            $("#suid").val(fieldNull(currentData.suid));
            $("#begin_date").val(fieldNull(currentData.begin_date));
            $("#end_date").val(fieldNull(currentData.end_date));
            $("#customer_count").text(fieldNull(currentData.customer_count));
            $("#memo").val(fieldNull(currentData.memo));
            $('#sid').val(currentData.sid).attr('disabled', 'disabled');
            handleList(currentData.commission_glist);
            stampStatus(id2text(showInStatusList, currentData.status));
        }

    }

    if (action == 'check'){
        $("#divbtn-save").hide();
        $("#divbtn-check").show();
        $("#divbtn-flush").hide();
        $("#divbtn-cancel").hide();

    } else if (action == 'flush'){
        $("#divbtn-save").hide();
        $("#divbtn-check").hide();
        $("#divbtn-flush").show();
        $("#divbtn-cancel").hide();
        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $("#mainList tr th").eq(0).remove();
        $('#mainList tr').each(function(){$(this).find('td').eq(0).remove();});

    } else if (action == 'view'){
        $("#divbtn-save").hide();
        $("#divbtn-check").hide();
        $("#divbtn-flush").hide();
        $("#divbtn-cancel").show();
        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $("#mainList tr th").eq(0).remove();
        $('#mainList tr').each(function(){$(this).find('td').eq(0).remove();});
    }

    /*
    //打印
    $('#btn-print').click(function(){
        if (com_id){
            previewPrint(86, com_id);
        }
    });
    */

    //按钮权限
    if (!checkPower(12601)) {}
    if (!checkPower(12602)) {}
    if (!checkPower(12603)) {}
    if (!checkPower(12604)) {}
    if (!checkPower(12605)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 保存单据
 * @param type  创建:create (default)
 *              作废:delete
 *              审核:check
 *              保存并审核:create_check
 *              冲单:flush
 */
function saveData(type) {
    if (type != 'delete' && type != 'flush'){
        //拼装基本参数
        var all = $("#all").prop('checked') ? 1 : 0;
        var begin_date = $.trim($("#begin_date").val());
        var end_date = $.trim($("#end_date").val());
        if (!all && (!begin_date || !end_date)) {
            runnerAlert("错误提示", "请指定起至日期");
            return;
        }
        var suid = $("#suid").val();
        if (!checkAutoComplete('suid')) return false;
        var memo = $("#memo").val();
        var customer_count = isNaN($("#customer_count").text()) ? 0 : $("#customer_count").text();
        var stock_list = getStockList();
        var postData = {
            "all": all,
            "begin_date": begin_date,
            "end_date": end_date,
            "suid": suid,
            "memo": memo,
            "customer_count": customer_count,
            "stock_list": stock_list,
        };

        //拼装商品参数
        var goods_list = getGoodsList();
        if (!goods_list || goods_list.length <= 0) {
            runnerAlert("错误提示", "请勾选单据商品");
            return;
        } else {
            postData['goods_list'] = JSON.stringify(goods_list);
        }
    }

    switch (type) {
        case 'delete':
            var res = resCom.delete(com_id);
            if (res != null) {
                noticeFrame(866, 'refrush');
                runnerConfirem("操作提示", "作废成功");
            }
            break;

        case 'flush':
            var res = resCom.flush(com_id);
            if (res != null) {
                noticeFrame(866, 'refrush');
                runnerConfirem("操作提示", "冲单成功");
            }
            break;

        case 'check':
            var res = resCom.check(com_id, postData);
            if (res != null) {
                noticeFrame(866, 'refrush');
                runnerConfirem("操作提示", "审核成功");
            }
            break;

        case 'create_check':
            var res = resCom.createCheck(postData);
            if (res != null) {
                noticeFrame(866, 'refrush');
                runnerConfiremUrl("操作提示", "审核成功", false, "/mainframe/finance/createCommission.html?iframeid=86&iframename=" + encodeURI("新建提成结算单"));
            }
            break;

        case 'create':
        default:
            var res = resCom.add(postData);
            if (res != null) {
                noticeFrame(866, 'refrush');
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/finance/createCommission.html?iframeid=86&iframename=" + encodeURI("新建提成结算单"));
            }
            break;


    }

}

