var stockRes = new stockRepository();
var resGoods = new restGoodsRepository();
var resTask = new taskRepository();
var currentId = "";
var action;
var page;
var order_or_stock = 'order';
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
            "template": "<input type='hidden' id='hiddengid_#{index}' name='gid' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"goodsListId\");'></a>",
            "dattr": []
        },
        {
            "name": "barcode",
            "type": true,
            "class" : "barcode",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbarcode#{index}' type='text' value='#{barcode}' size='10' />",
            "dattr": []
        },
        {
            "name": "name",
            "type": true,
            "class" : "gname",
            "template": "<input class='f-input-goodname'  index='#{index}' id='rtname_#{index}' type='text' value='#{name}' size='10' />",
            "fill": []
        },
        {
            "name": "spec",
            "type": true,
            "class" : "spec",
            "template": "<span class='align-center' id='rtspec_#{index}'>#{spec}</span>",
            "dattr": []
        },
        {
            "name": "volume1",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume1_#{index}' name='volume1' onkeyup='' value='#{volume1}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume2",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume2_#{index}' name='volume2' onkeyup='' value='#{volume2}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume3",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume3_#{index}' name='volume3' onkeyup='' value='#{volume3}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume4",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume4_#{index}' name='volume4' onkeyup='' value='#{volume4}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume5",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume5_#{index}' name='volume5' onkeyup='' value='#{volume5}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume6",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume6_#{index}' name='volume6' onkeyup='' value='#{volume6}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume7",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume7_#{index}' name='volume7' onkeyup='' value='#{volume7}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume8",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume8_#{index}' name='volume8' onkeyup='' value='#{volume8}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume9",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume9_#{index}' name='volume9' onkeyup='' value='#{volume9}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume10",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume10_#{index}' name='volume10' onkeyup='' value='#{volume10}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume11",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume11_#{index}' name='volume11' onkeyup='' value='#{volume11}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volume12",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' id='rtvolume12_#{index}' name='volume12' onkeyup='' value='#{volume12}' type='text' size='5' />",
            "dattr": []
        },
        {
            "name": "volumeSum",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' disabled id='rtvolumeSum_#{index}' name='volumeSum' value='#{volumeSum}' type='text' size='6' />",
            "dattr": []
        }
    ]
};

/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/





/*搜索商品*/


var tempData = null;
var onsearch = function (val, parent, divID) {
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {};
        var send = true;
        if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
            if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) return false;
        }
        params['search'] = searchVal;
        if (send) {
            //var res = stockRes.readStockOutGoodsByField(1, autoCompletePageNum, params);
            var res = resGoods.findCompanyGoodsByField(1, autoCompletePageNum, params);
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
    //判断该商品是否已经存在
    var exist = false;
    $('#goodsListId tbody tr').each(function(){
        if ($(this).find('input[name="gid"]').val() == tempData[tempIndex].gid){
            exist = true;
        }
    });
    if (exist){
        runnerAlert('操作提示', '该商品已经添加');
        return false;
    }

    if (tempData != null && tempData.length > 0) {
        //填充数据到列表
        var appendData = {
            "gid": tempData[tempIndex].gid,
            "barcode": fieldNull(tempData[tempIndex].gbarcode),
            "name": tempData[tempIndex].gname,
            "spec": tempData[tempIndex].gspec,
            "volume1": '',
            "volume2": '',
            "volume3": '',
            "volume4": '',
            "volume5": '',
            "volume6": '',
            "volume7": '',
            "volume8": '',
            "volume9": '',
            "volume10": '',
            "volume11": '',
            "volume12": '',
            "volumeSum": '',
        };
        var idx = index;
        //console.log(idx);
        $("#goodsListId").runnerTableAppend(idx, appendData, bindAutoComplete);
        $("#rtvolume1_" + idx).focus();
    }
    $("#" + divID).toggle();
    bindCompute();
}


/**
 * 绑定自动输入框
 */
function bindThisPageAutoComplete(container, isInit) {
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

/*--------------------------------------------------- 获取数据 -----------------------------------------------------------------*/


/**
 * 获取表格中添加的商品清单
 */
function getGoodsList() {
    var i = 0;
    var goodList = [];
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            goodList[i] = {
                "gid": gid,
            };
            for (var n=1; n<=12; n++){
                goodList[i]['val'+n] = num2total($(this).parent().parent().find('input[name="volume' + n + '"]').val());
            }
            i++;
        }
    });
    return goodList;
}


/**
 * 获取月度总计
 */
function getAddUpList() {
    var ret = {};
    $('#sumMonth input').each(function(k){
        ret['val'+(k+1)] = num2total($(this).val());
    });
    return ret;
}


/*--------------------------------------------------- 统计 BEGIN -----------------------------------------------------------------*/


/**
 * 绑定触发触发统计事件
 */
function bindCompute(){
    $('#goodsListId input[name*="volume"]').keyup(function(){
        if ($(this).parent().parent().find('input[name="gid"]').val()) {
            computeSum();
            //computeSumGoods();
            //computeSumYear();
        }
    });
    $('#sumMonth input').blur(function(){
        computeSumYear();
    });
}

/**
 * 统计
 */
function computeSum(){
    computeSumGoods();
    computeSumMonth();
    computeSumYear();
}

/**
 * 商品总计
 */
function computeSumGoods(){
    $('#goodsListId tbody tr').each(function(){
        var val = 0;
        if ($(this).find('input[name="gid"]').val()){
            for (var n=1; n<=12; n++){
                val += num2total($.trim($(this).find('input[name="volume'+n+'"]').val()));
            }
            $(this).find('input[name="volumeSum"]').val(val);
        }
    });
}

/**
 * 月度总计
 */
function computeSumMonth(){
    var val = {};
    $('#goodsListId tbody tr').each(function(){
        if ($(this).find('input[name="gid"]').val()){
            for (var n=1; n<=12; n++){
                if (typeof(val[n]) == 'undefined'){
                    val[n] = 0;
                }
                val[n] += num2total($.trim($(this).find('input[name="volume'+n+'"]').val()));
            }
        }
    });
    $('#sumMonth input').each(function(k){
        $(this).val(val[k+1]);
    });
}

/**
 * 年度总计
 */
function computeSumYear(){
    var sumTotal = 0;
    $('#sumMonth input').each(function(){
        sumTotal += ($.trim($(this).val())=='' || isNaN($(this).val())) ? 0 : parseInt($(this).val());
    });
    $('#sumTotal').text(sumTotal);
}

/*--------------------------------------------------- 统计 END -----------------------------------------------------------------*/


/**
 * 加载新建采购订单
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var id = getUrlParam("id");
    action = getUrlParam("action");
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name); //默认填单人

        bindAutoCompleteCommon('suname', 'user');

        //自动填充任务年度
        var now = new Date();
        var year_min = now.getFullYear() - 4;
        var year_max = now.getFullYear() + 5;
        var years = '';
        for (var y=year_min; y<year_max; y++){
            years += '<option value="' + y + '">' + y + '</option>\n';
        }
        $('#year').append(years).val(now.getFullYear());


        //指标类型切换
        $('#type').change(function(){
            if ($(this).val() == 1){
                $('#type_unit').text('箱');
                $('#goodsListId').show();
            } else if ($(this).val() == 2){
                $('#type_unit').text('元');
                $('#goodsListId').hide();
            }
        });
    }

    $('#btn-list').click(function(){
        openParentForFrame('销售任务单','/mainframe/sale/task.html', 271);
    });


    /*浮层打开和关闭时触发事件*/
    $('#modalImportOrder').on('hide.bs.modal', function () {
        clearBillStatus();
    }).on('show.bs.modal',function(){
        loadBillTbale();
    });

    /**
     *  新建
     */
    if (action == null || action == 'undefined') {
        $("#goodsListId").runnerTableOnStart(opt, null, bindAutoComplete);
    }

    /**
     *  通用读取数据
     */
    if (id != null && id != 'undefined' && id > 0) {
        currentId = id;
        //读取订单详细信息
        var data = resTask.findById(currentId);
        if (data != null) {
            $("#fullperson").html(data.uname);
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#suid").val(data.suid);
            $("#suname").val(fieldNull(data.suname));
            $("#year").val(data.year);
            $("#type").val(data.type).attr('disabled', 'disabled');
            $("#sumTotal").text(num2total(data.val_all));

            if (data.type == 1){ //箱数
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
                            "barcode": selectGoods[i].gbarcode,
                            "spec": selectGoods[i].gspec,
                            "volume1": num2total(selectGoods[i].val1),
                            "volume2": num2total(selectGoods[i].val2),
                            "volume3": num2total(selectGoods[i].val3),
                            "volume4": num2total(selectGoods[i].val4),
                            "volume5": num2total(selectGoods[i].val5),
                            "volume6": num2total(selectGoods[i].val6),
                            "volume7": num2total(selectGoods[i].val7),
                            "volume8": num2total(selectGoods[i].val8),
                            "volume9": num2total(selectGoods[i].val9),
                            "volume10": num2total(selectGoods[i].val10),
                            "volume11": num2total(selectGoods[i].val11),
                            "volume12": num2total(selectGoods[i].val12),
                            "volumeSum": num2total(selectGoods[i].val_all),
                        };
                    }
                    $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
                }
            } else if (data.type == 2) { //金额
                $('#goodsListId').hide();
            }

            //填充月度总计
            $('#sumMonth input').each(function(k){
                $(this).val(data['val'+(k+1)]);
            });
        }

        if (action == 'update'){
            //编辑
            $('#btn-save').hide();
            $('#btn-update').show();

        } else if (action == 'view'){
            //查看
            $('#btn-help').remove();
            $('input').attr('disabled', 'disabled');
            $('select').attr('disabled', 'disabled');
            $('#goodsListId th:first').remove();
            $('#goodsListId tbody tr').each(function(){
                $(this).find('td:first').remove();
            });
            $('#btn-save button:first').remove();

        }

    }

    bindCompute();

    //按钮权限
    if (!checkPower(12901)) {}
    if (!checkPower(12902)) {}
    if (!checkPower(12903)) {}
});

/** ----------------------------------------------- 华丽丽的分割线 ---------------------------------------------------- */



/**
 * 保存单据
 * @param kind  创建:create (default: 无currentId)
 *              修改:update (default: 有currentId)
 *              删除:delete
 */
function saveData(kind) {
    if (kind != 'delete'){
        //拼装基本参数
        var year = $("#year").val();
        var type = $("#type").val();
        var suid = $("#suid").val();
        if (!checkAutoComplete('suid')) return false;
        var postData = {
            "year": year,
            "type": type,
            "suid": suid,
        };

        if (type == 1){
            //拼装商品参数
            var goods_list = getGoodsList();
            if (!goods_list || goods_list.length <= 0) {
                runnerAlert("错误提示", "请勾选单据商品");
                return;
            } else {
                postData['goods_list'] = JSON.stringify(goods_list);
            }
        }

        //拼装月度总计参数
        var add_up = getAddUpList();
        if (!add_up || add_up.length <= 0) {
            runnerAlert("错误提示", "月度总计不能为空");
            return;
        } else {
            postData['add_up'] = JSON.stringify(add_up);
        }
    }

    if (!kind && currentId) kind = 'update';
    else if(!kind) kind = 'create';

    switch (kind) {
        case 'delete':
            var res = resTask.delete(currentId);
            if (res != null) {
                noticeFrame(271, 'refrush');
                runnerConfirem("操作提示", "删除成功");
            }
            break;

        case 'update':
            var res = resTask.update(currentId, postData);
            if (res != null) {
                noticeFrame(271, 'refrush');
                runnerConfirem("操作提示", "修改成功");
            }
            break;


        case 'create':
        default:
            var res = resTask.add(postData);
            if (res != null) {
                noticeFrame(271, 'refrush');
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/sale/createTask.html?iframeid=27&iframename=" + encodeURI("新建销售任务单"));
            }
            break;


    }

}


