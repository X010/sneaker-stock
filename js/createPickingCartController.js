var rPCR = new restPickingCartRepository();
var rSR = new restStoreRepository();


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
            "template": "<input type='checkbox' id='hiddengid_#{index}' value='#{gid}' checked='checked' index='#{index}' onclick='' />",
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
            "name": "gbarcode",
            "type": true,
            "class" : "barcode",
            "template": "<input class='f-input-goodname' disabled index='#{index}' id='rtbarcode_#{index}' type='text' value='#{gbarcode}' size='10' />",
            "dattr": []
        },
        {
            "name": "gspec",
            "type": true,
            "class" : "spec",
            "template": "<span class='align-center' id='rtspec_#{index}'>#{gspec}</span>",
            "dattr": []
        },
        {
            "name": "total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled name='total' id='rttotal_#{index}' value='#{total}' type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "gunit",
            "type": true,
            "class" : "spec",
            "template": "<span class='align-center' disabled id='rtunit#{index}'>#{gunit}</span>",
            "dattr": []
        },
        {
            "name": "volume",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rtvolume_#{index}' name='volume' value='#{volume}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "weight",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rtweight_#{index}' name='weight' value='#{weight}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "weight_total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rtweight_total_#{index}' name='weight' value='#{weight_total}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "stock_out_id",
            "type": true,
            "class" : "code",
            "template": "<input class='f-input-num' disabled id='rtstock_out_id_#{index}' name='stock_out_id' value='#{stock_out_id}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "ccname",
            "type": true,
            "class" : "company",
            "template": "<input class='f-input-num' disabled id='rtccname_#{index}' value='#{ccname}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "total_sum",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rttotal_sum_#{index}' value='#{total_sum}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "total_sum_selected",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-num' disabled id='rttotal_sum_selected_#{index}' name='total_sum_selected' value='#{total_sum_selected}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "volume_sum",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rtvolume_sum_#{index}' value='#{volume_sum}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "volume_sum_selected",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-num' disabled id='rtvolume_sum_selected_#{index}' name='volume_sum_selected' value='#{volume_sum_selected}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "weight_sum",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rtweight_sum_#{index}' value='#{weight_sum}' type='text' size='10' />",
            "dattr": []
        },
        {
            "name": "weight_sum_selected",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-num' disabled id='rtweight_sum_selected_#{index}' name='weight_sum_selected' value='#{weight_sum_selected}' type='text' size='10' />",
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
function getTableData() {
    //放到集合中去重
    var stock_ids_obj = {};
    $('#mainList tbody tr').each(function() {
        if ($(this).find('input[type="checkbox"]').prop('checked')){
            var stock_out_id_current = $(this).find('input[name="stock_out_id"]').val();
            if (stock_out_id_current) stock_ids_obj[stock_out_id_current] = true;
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
 * 单据批量填充模块(通用)
 * @param data
 */
function handleList(data){
    var bindData = [];
    if (data != null) {
        var k = 0;
        for (var i=0; i<data.length; i++){
            var group = data[i]; //新的一组
            for (var j=0; j<group.length; j++){
                bindData[k] = group[j]; //copy
                bindData[k].volume = (group[j].total / group[j].gspec).toFixed(4);
                bindData[k].weight_total = (bindData[k].volume * group[j].weight).toFixed(2); //总箱重=箱数*箱重
                bindData[k].stock_out_id = group[j].stock_out_id ? group[j].stock_out_id : group[j].stock_id; //出库单号
                if (!j){
                    //开始新的一组(HTML跨行)
                    bindData[k]['total_sum_HTMLrowspan'] = group.length; //总数量
                    bindData[k]['total_sum_selected_HTMLrowspan'] = group.length; //已选总数
                    bindData[k]['volume_sum_HTMLrowspan'] = group.length; //总数量
                    bindData[k]['volume_sum_selected_HTMLrowspan'] = group.length; //已选总数
                    bindData[k]['weight_sum_HTMLrowspan'] = group.length; //总重
                    bindData[k]['weight_sum_selected_HTMLrowspan'] = group.length; //已选总重
                    //填充数据
                    bindData[k]['total_sum'] = num2total(group[j].group_total);
                    bindData[k]['total_sum_selected'] = 0;
                    bindData[k]['volume_sum'] = num2price(group[j].group_box_total);
                    bindData[k]['volume_sum_selected'] = 0;
                    bindData[k]['weight_sum'] = num2price(group[j].group_weight);
                    bindData[k]['weight_sum_selected'] = 0;
                } else {
                    //重复的组(HTMLd)
                    bindData[k]['total_sum_HTMLremove'] = true;
                    bindData[k]['total_sum_selected_HTMLremove'] = true;
                    bindData[k]['volume_sum_HTMLremove'] = true;
                    bindData[k]['volume_sum_selected_HTMLremove'] = true;
                    bindData[k]['weight_sum_HTMLremove'] = true;
                    bindData[k]['weight_sum_selected_HTMLremove'] = true;
                }
                k++;
            }
        }
        $('#checkAll').attr('checked', true);
    }
    $("#mainList").runnerTableOnStart(opts, bindData, bindAutoComplete);
    //处理空行
    $("#mainList tr").each(function () {
        var checkbox = $(this).find('input[type="checkbox"]');
        //if empty
        if (!checkbox.val()) {
            checkbox.hide();
        }
    });
    //绑定勾选事件
    $('#mainList input[type="checkbox"]').click(function(){
        var stock_out_id_current = $(this).parent().parent().find('input[name="stock_out_id"]').val();
        var checked = $(this).prop('checked');
        $('#mainList input[type="checkbox"]').each(function(){
            var stock_out_id = $(this).parent().parent().find('input[name="stock_out_id"]').val();
            if (stock_out_id_current == stock_out_id){
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
 * 通过仓库和送货地区筛选出商品
 */
function searchGoods(){
    var sid = $('#store').val();
    var begin_time = $('#startTime').val();
    var end_time = $('#endTime').val();
    if (!sid){
        runnerAlert('操作提示', '请选择出库仓库');
        return;
    }
    var params = {
        'sid': sid,
        'begin_time': begin_time,
        'end_time': end_time,
    };
    var in_cid = $("#custom").val();
    if (in_cid) {
        params['in_cid'] = in_cid;
    } else {
        var areapro = $("#areapro").val();
        var areacity = $("#areacity").val();
        var areazone = $("#areazone").val();
        var areastreat = $("#areastreat").val();
        areapro = areapro ? areapro : '';
        areacity = areacity ? ' ' + areacity : '';
        areazone = areazone ? ' ' + areazone : '';
        areastreat = areastreat ? ' ' + areastreat : '';
        var address = areapro + areacity + areazone + areastreat;
        if (address) params['address'] = address;
        /*
         if ($('#areapro').val()) params['areapro'] = $('#areapro').val();
         if ($('#areacity').val()) params['areacity'] = $('#areacity').val();
         if ($('#areazone').val()) params['areazone'] = $('#areazone').val();
         if ($('#areastreat').val()) params['areastreat'] = $('#areastreat').val();
         */
    }

    var res = rPCR.findPickingCartGoods(params);
    if (res && res.data){
        handleList(res.data);
    }
}


/**
 * 切换仓库时自动填充出货地域(有点bug)
 */
function autoSetArea(){
    var in_cid = $("#custom").val();
    if (!in_cid) {
        var res = rSR.findById($('#store').val());
        if (res && res.store_area.length) {
            $('#address').cxSelect({
                //url: '/js/compents/city.json',
                selects: ['province', 'city', 'area', 'streat'],
            });
            $("#areapro").attr("data-value", res.store_area[0].areapro).trigger('change');
            $("#areacity").attr("data-value", res.store_area[0].areacity).trigger('change');
            $("#areazone").attr("data-value", res.store_area[0].areazone).trigger('change');
            $("#areastreat").attr("data-value", res.store_area[0].areastreat).trigger('change');
        }
    }
}


/* ---------------------------------------------- 总计数据动态计算 ---------------------------------------------- */

/**
 * 重新计算商品小计 和 单据总计
 */
function changeSum(){
    computeSum();
    formatWeightSum();
}


var sum_pickingCart = {};
/**
 * 小计已选总数和总重
 */
function computeSum(){
    sum_pickingCart = {}; //总计
    $('#mainList tbody tr').each(function(){
        if ($(this).find('td:first input').prop('checked')) {
            var gid = $(this).find('td:first input').val();
            if (gid) {
                //小计总数
                var total = $(this).find('input[name="total"]').val();
                var total_sum_selected = !isNaN(total) ? parseFloat(total) : 0;
                //小计总箱数
                var volume = $(this).find('input[name="volume"]').val();
                var volume_sum_selected = !isNaN(volume) ? parseFloat(volume) : 0;
                //小计总重
                var weight = $(this).find('input[name="weight"]').val();
                var weight_sum = volume * weight;
                var weight_sum_selected = !isNaN(weight_sum) ? parseFloat(weight_sum) : 0;
                if (typeof(sum_pickingCart[gid]) == 'undefined') {
                    sum_pickingCart[gid] = {
                        'total_sum_selected': total_sum_selected,
                        'volume_sum_selected': volume_sum_selected,
                        'weight_sum_selected': weight_sum_selected,
                    };
                } else {
                    sum_pickingCart[gid]['total_sum_selected'] += parseFloat(total_sum_selected);
                    sum_pickingCart[gid]['volume_sum_selected'] += parseFloat(volume_sum_selected);
                    sum_pickingCart[gid]['weight_sum_selected'] += parseFloat(weight_sum_selected);
                }
            }
        }
    });
    //console.log(sum);
    if (Object.prototype.isPrototypeOf(sum_pickingCart) && Object.keys(sum_pickingCart).length === 0){
        //无值(空对象)
        $('#mainList tbody tr').each(function(){
            var gid = $(this).find('td:first input').val();
            if (gid) {
                $(this).find('input[name="total_sum_selected"]').val(0);
                $(this).find('input[name="volume_sum_selected"]').val(0);
                $(this).find('input[name="weight_sum_selected"]').val(0);
            }
        });
    } else {
        //有值
        $('#mainList tbody tr').each(function(){
            //var checked = $(this).find('td:first input').prop('checked');
            var gid = $(this).find('td:first input').val();
            if (gid && sum_pickingCart[gid]){
                $(this).find('input[name="total_sum_selected"]').val(sum_pickingCart[gid]['total_sum_selected']);
                $(this).find('input[name="volume_sum_selected"]').val(sum_pickingCart[gid]['volume_sum_selected'].toFixed(2));
                $(this).find('input[name="weight_sum_selected"]').val(sum_pickingCart[gid]['weight_sum_selected'].toFixed(2));
            }
        });
    }

}


/**
 * 计算单据已选总重
 */
function formatWeightSum(){
    var weightSum = 0;
    $.each(sum_pickingCart, function(k, v){
        weightSum += v['weight_sum_selected'];
    });
    $('#weightSumKg').text(weightSum.toFixed(2));
    var weightSumTon = (weightSum / 1000).toFixed(2); //吨
    $('#weightSumTon').text(weightSumTon);
}


/*--------------------------------------------------分隔线-----------------------------------------------------*/


var pcid = 0;

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
        //地区选择联动菜单
        $('#address').cxSelect({
            //url: '/js/compents/city.json',
            selects: ['province', 'city', 'area', 'streat'],
        });
        bindSelfStore("store"); //绑定仓库
        $('#store').prepend('<option value="">- 请选择 -</option>');
        $('#store').change(function(){
            autoSetArea();
        });
        bindAutoCompleteCommon('car', 'car');
        bindAutoCompleteCommon('duname', 'user');
        bindAutoCompleteCommon('customName', 'customer');
        $("#startTime").val(GetDateStr(-1));
        $("#endTime").val(GetDateStr(0));
    }
    $('#btn-list').click(function(){
        openParentForFrame('拣货派车单','/mainframe/wms/pickingCart.html', 291);
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
        $('#custom').change(function(){
            if ($.trim($(this).val()) == ''){
                $('#address select').removeAttr('disabled');
            } else {
                $('#areapro').attr('disabled', 'disabled');
                $('#areacity').attr('disabled', 'disabled').find('option:first').attr('selected', true);
                $('#areazone').attr('disabled', 'disabled').html('');
                $('#areastreat').attr('disabled', 'disabled').html('');
            }
            handleList();
        });
        $('#customName').keyup(function(){
            if ($.trim($(this).val()) == ''){
                $('#address select').removeAttr('disabled');
            }
        });
        handleList();
    } else {
        $("#areapro").change(function(){
            $("#areapro").attr("disabled", 'disabled');
        });
        $("#areacity").change(function(){
            $("#areacity").attr("disabled", 'disabled');
        });
        $("#areazone").change(function(){
            $("#areazone").attr("disabled", 'disabled');
        });
        $("#areastreat").change(function(){
            $("#areastreat").attr("disabled", 'disabled');
        });

        //除新建外通用
        pcid = id;
        $("#pcId").html(id);
        var currentData = rPCR.findById(id);
        if (currentData != null) {
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#duname").val(fieldNull(currentData.duname)); //司机
            $("#customName").val(fieldNull(currentData.ccname));
            $("#store").val(currentData.sid);
            $("#car").val(currentData.car_license + ' [' +  currentData.car_ton + '吨]');
            $("#memo").val(fieldNull(currentData.memo));
            $("#areapro").attr("data-value",currentData.areapro).trigger('change');
            $("#areacity").attr("data-value",currentData.areacity).trigger('change');
            $("#areazone").attr("data-value",currentData.areazone).trigger('change');
            $("#areastreat").attr("data-value",currentData.areastreet).trigger('change');

            handleList(currentData.sorting_glist);
            stampStatus(id2text(showInStatusList, currentData.status));
        }

        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $("#mainList tr th").eq(0).remove();
        $('#mainList tr').each(function(){$(this).find('td').eq(0).remove();});
        $('#mainList th[name="total_sum_selected"]').remove();
        $('#mainList tbody input[name="total_sum_selected"]').parent().remove();
        $('#mainList th[name="volume_sum_selected"]').remove();
        $('#mainList tbody input[name="volume_sum_selected"]').parent().remove();
        $('#mainList th[name="weight_sum_selected"]').remove();
        $('#mainList tbody input[name="weight_sum_selected"]').parent().remove();
    }

    if (action == "op"){
        $("#divbtn-save").hide();
        $("#divbtn-delete").show();
        $("#btn-search").remove();
    }

    if (action == "view"){
        $("#divbtn-save").hide();
        $("#divbtn-cancel").show();
        $("#btn-search").remove();
    }

    //打印
    $('#btn-print').click(function(){
        if (pcid){
            previewPrint(29, pcid);
        }
    });

    //按钮权限
    if (!checkPower(12601)) {}
    if (!checkPower(12602)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 保存拣货派车单
 * @param type  删除:delete
 *              创建:create (default)
 */
function savePickingCart(type) {
    if (type != 'delete'){
        var data = getTableData();
        if (!data || data.length <= 0) {
            runnerAlert("错误提示", "请勾选单据商品");
            return;
        }
        var sid = $("#store").val();
        if (!sid) {
            runnerAlert("错误提示", "请选择出库仓库");
            return;
        }
        var carid = $("#carid").val();
        if (!checkAutoComplete(null, null, null, 'carid')) return false;
        var duid = $("#duid").val();
        if (!checkAutoComplete('duid')) return false;
        var memo = $("#memo").val();
        var postData = {
            "sid": sid,
            "car_id": carid,
            "duid": duid,
            "memo": memo,
            "stock_list": data,
        };
        var ccid = $("#custom").val();
        if (ccid){
            postData['ccid'] = ccid;
        } else {
            var areapro = $("#areapro").val();
            var areacity = $("#areacity").val();
            var areazone = $("#areazone").val();
            var areastreat = $("#areastreat").val();
            if (areapro) postData['areapro'] = areapro;
            if (areacity) postData['areacity'] = areacity;
            if (areazone) postData['areazone'] = areazone;
            if (areastreat) postData['areastreet'] = areastreat;
            /*
             areapro = areapro ? areapro : '';
             areacity = areacity ? ','+areacity : '';
             areazone = areazone ? ','+areazone : '';
             areastreat = areastreat ? ','+areastreat : '';
             var address = areapro + areacity + areazone + areastreat;
             if (address) postData['address'] = address;
             */
        }
    }

    switch (type) {
        case 'delete':
            var res = rPCR.delete(pcid);
            if (res != null) {
                noticeFrame(261, 'refrush');
                noticeFrame(291, 'refrush');
                runnerConfirem("操作提示", "作废成功");
            }
            break;

        case 'create':
        default:
            var res = rPCR.add(postData);
            if (res != null) {
                noticeFrame(261, 'refrush');
                noticeFrame(291, 'refrush');
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/wms/createPickingCart.html?iframeid=29&iframename=" + encodeURI("新建拣货派车单"));
            }
            break;


    }

}

