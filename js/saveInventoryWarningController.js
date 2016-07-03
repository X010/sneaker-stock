var resGoods = new restGoodsRepository();
var resInventory = new inventoryRepository();
var page;

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
            "name": "code",
            "type": true,
            "class" : "code",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtcode#{index}' type='text' value='#{code}' size='10' />",
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
            "template": "<span class='align-center' id='rtspec_#{index}' name='spec'>#{spec}</span>",
            "dattr": []
        },
        {
            "name": "unit",
            "type": true,
            "class" : "unit",
            "template": "<span class='align-center' id='rtunit_#{index}'>#{unit}</span>",
            "dattr": []
        },
        {
            "name": "total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-goodname' disabled index='#{index}' id='rttotal#{index}' name='total' type='text' value='#{total}' size='10' />",
            "dattr": []
        },
        {
            "name": "box_total",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num' index='#{index}' id='rtbox_total#{index}' name='box_total' type='text' value='#{box_total}' size='10' />",
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
            "code": tempData[tempIndex].gcode,
            "barcode": fieldNull(tempData[tempIndex].gbarcode),
            "name": tempData[tempIndex].gname,
            "spec": tempData[tempIndex].gspec,
            "unit": tempData[tempIndex].gunit,
            "total": '0',
            "box_total": '',
        };
        var idx = index;
        //console.log(idx);
        $("#goodsListId").runnerTableAppend(idx, appendData, bindAutoComplete);
        $("#rtbox_total_" + idx).focus();
    }
    $("#" + divID).toggle();
    triggerTotal();
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


/**
 * 箱数->数量
 */
function triggerTotal(){
    $('#goodsListId input[name="box_total"]').keyup(function(){
        var tr = $(this).parent().parent();
        var spec = tr.find('span[name="spec"]').text();
        var total = num2total(parseInt(spec) * parseFloat(num2price($(this).val())));
        tr.find('input[name="total"]').val(total);
    });
}

/*--------------------------------------------------- 数据 BEGIN -----------------------------------------------------------------*/


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
                "total": $(this).parent().parent().find('input[name="total"]').val(),
            };
            ++i;
        }
    });
    return goodList;
}

/**
 * 填充商品库存设置
 */
function fullGoodsTable(){
    var sid = $('#store').val();
    var data = resInventory.readWarningSetting(sid);
    var bindData = [];
    if (data != null) {
        //$("#fullperson").html(data.uname);

        //转换数据格式并绑定数据
        var selectGoods = data;
        if (selectGoods != null) {
            //console.log(selectGoods);
            //转换绑定
            for (var i = 0; i < selectGoods.length; i++) {
                bindData[i] = {
                    "gid": selectGoods[i].gid,
                    "code": selectGoods[i].gcode,
                    "name": selectGoods[i].gname,
                    "barcode": selectGoods[i].gbarcode,
                    "spec": selectGoods[i].gspec,
                    "unit": selectGoods[i].gunit,
                    "total": num2total(selectGoods[i].total),
                    "box_total": num2price(selectGoods[i].box_total),
                };
            }
        }
    }

    $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
    triggerTotal();
}

/*--------------------------------------------------- 数据 END -----------------------------------------------------------------*/


/**
 * 加载新建采购订单
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        //msg = JSON.parse(msg);
        //$("#fullperson").html(msg.name); //默认填单人

        bindSelfStore('store');

        $('#store').change(function(){
            fullGoodsTable();
        });
    }

    //读取信息
    fullGoodsTable();

    //保存权限
    if (!checkPower(10506)) {
        $('input').attr('disabled', 'disabled');
        $('select').attr('disabled', 'disabled');
        $('#btn-help').remove();
        $('#goodsListId th:first').remove();
        $('#goodsListId tr').each(function(){
            $(this).find('td:first').remove();
        });
    }
});

/** ----------------------------------------------- 华丽丽的分割线 ---------------------------------------------------- */



/**
 * 保存
 */
function saveData() {
    //拼装基本参数
    var sid = $("#store").val();
    var postData = {
        "sid": sid,
    };

    //拼装商品参数
    var goods_list = getGoodsList();
    postData['goods_list'] = JSON.stringify(goods_list);

    var res = resInventory.saveWarningSetting(postData);
    if (res != null) {
        //noticeFrame(271, 'refrush');
        //runnerConfirem("操作提示", "设置成功");
        runnerAlert("操作提示", "设置成功");
    }

}


