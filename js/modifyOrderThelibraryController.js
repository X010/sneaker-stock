var stockRes = new stockRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();

var currOrderId = ""; //保存当前订单号
var currAction = ""; //保存操作
var edit = false;
var needRecreate = true; //操作完成后是否进行新建
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
            "template": "<input class='f-input-price' id='rtprice_#{index}' onkeyup='priceOnChange(#{index},1)' value='#{price}' type='text' size='5' />",
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
            "template": "<span class='readonly' id='rtunit#{index}'>#{unit}</span>",
            "dattr": []
        },
        {
            "name": "volume_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price' id='rtvolume_price_#{index}' onkeyup='priceOnChange(#{index},4)' value='#{volume_price}' type='text' size='5' />",
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
            "template": "<input class='f-input-price disabled' id='rtamount_price_#{index}' name='amount_price[]' value='#{amount_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        }
        ,
        {
            "name": "tax_rate",
            "type": true,
            "class" : "num",
            "template": "<input class='f-input-num disabled' id='rttax_rate_#{index}' value='#{tax_rate}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "outtax_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price disabled' id='rtouttax_price_#{index}'  value='#{outtax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "tax_price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-price disabled' id='rttax_price_#{index}' name='tax_price[]' value='#{tax_price}' disabled type='text' size='5' autocomplete='off' />",
            "dattr": []
        },
        {
            "name": "reserve",
            "type": true,
            "class" : "num",
            "template": "<span class='readonly' id='reserve_#{index}'>#{reserve}</span>",
            "dattr": []
        }
    ]
};


/*---------------------------------------------------华丽分一逼线-----------------------------------------------------------------*/



/**
 * 绑定自动输入框
 */
function bindThisPageAutoComplete(container, isInit) {}



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
    $("#customId").val(-1);
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
}

/**
 * 通过选择客户自动填充出货仓库和业务员
 * @param data
 */
function fullHeader(data){
    if (data){
        $("#outStore").val(data.sid);
        $("#suid").val(data.suid);
        $("#suname").val(addPhone2Name(data.suname, data.suphone));
    } else {
        $("#outStore").val('');
        $("#suid").val('');
        $("#suname").val('');
    }
}
/*---------------------------------------------------华丽的一逼-------------------------------------------------------*/



/**
 * 加载出货单创建
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var orderId = getUrlParam("orderId");
    var action = getUrlParam("action");
    if (orderId != null && orderId != 'undefined') currOrderId = orderId;
    if (action != null && action != 'undefined') currAction = action;
    var msg = cookieUtil("userprofile");

    if (msg != null) {
        msg = JSON.parse(msg);
        //$("#fullperson").html(msg.name); //默认填单人
        //bindSelfUser('suid'); //业务员
        //bindCustom('customLists');
        //$("#customLists").prepend('<option value="">- 请选择客户 -</option>');
        bindSelfStore('outStore');

        //切换仓库后刷新库存列
        $("#outStore").change(function(){
            var sid = $(this).val();
            var gids = '';
            $("#goodsListId tr").each(function(){
                var gid = $(this).find('td').eq(0).find('input').val();
                if (gid) gids += gid + ',';
            });
            if (sid && gids){
                var result = inventoryRes.reserveTempRead(1, 100, sid, gids);
                if (result){
                    //var result = {'49537':123, '50673':345}; //TEST
                    $("#goodsListId tr").each(function(){
                        var gid = $(this).find('td').eq(0).find('input').val();
                        if (gid){
                            $('#reserve_' + $(this).attr('rid')).text(result[gid]);
                        }
                    });

                }
            }
        });

        bindOrderRankSelect("rank", 0);
        changeCustomerId(); //防止没有初始值
        offCustomSelect(); //关闭客户的下拉选择框模式(注释后则开启双重切换模式)
        bindAutoCompleteCommon('customName', 'customer', null, fullHeader);
        bindAutoCompleteCommon('suname', 'user');
    }


    //客户订单
    if (action == 'up' && orderId != null) {
        needRecreate = false;
        //绑定订单相关信息
        //console.log("action=" + action + ",orderId=" + orderId);
        var data = stockRes.findOrderByOutId(orderId);
        if (data != null) {
            $("#fullperson").html(fieldNull(data.uname));
            $("#cuname").html(fieldNull(data.cuname));
            $("#iOrderId").html(fieldNull(data.id));
            $("#iOrderDate").html(formatDatetime(data.createtime));
            $("#rank").val(num2total(data.rank));
            $("#sCustom").show();
            $("#customId").val(data.in_cid);
            $("#customName").val(data.in_cname).attr('disabled', 'disabled');
            $("#in_cid").val(data.in_cid);
            $("#in_sid").val(data.in_sid);
            $("#outStore").val(data.out_sid);
            $("#suid").val(data.suid);
            $("#suname").val(addPhone2Name(data.suname, data.suphone));
            $("#memo").val(fieldNull(data.memo));
            $("#discount_amount").val(num2price(data.discount_amount));
            $("#discountAmount").text(num2price(data.discount_amount));
            if (data.mall_orderno) {
                $("#receipt").html(formatReceipt(data.receipt));
                $("#contacts").html(data.contacts);
                $("#phone").html(data.phone);
                $("#mall_info").show();
            }

            var selectGoods = data.goods_list;
            if (selectGoods != null) {
                //console.log(selectGoods);
                //转换绑定
                var bindData = [];
                for (var i = 0; i < selectGoods.length; i++) {
                    bindData[i] = {
                        "gid": selectGoods[i].gid,
                        "name": selectGoods[i].gname,
                        "code": selectGoods[i].gcode,
                        "bname": fieldNull(selectGoods[i].gbname),
                        "tname": fieldNull(selectGoods[i].gtname),
                        "spec": selectGoods[i].gspec,
                        "barcode": selectGoods[i].gbarcode,
                        "price": selectGoods[i].unit_price,
                        "total": selectGoods[i].total,
                        "unit": selectGoods[i].gunit,
                        "volume": computeVolume(selectGoods[i]),
                        "volume_price": computeVolumePrice(selectGoods[i]),
                        "amount_price": selectGoods[i].amount_price,
                        "tax_price": selectGoods[i].tax_price, //税额
                        "outtax_price": selectGoods[i].outtax_price, //去税金额
                        "tax_rate": selectGoods[i].gtax_rate * 100, //税率
                        "reserve": selectGoods[i].reserve,
                    };
                }
                $("#goodsListId").runnerTableOnStart(opt, bindData, bindAutoComplete);
            }

            $('#goodsListId tr').each(function(){
                $(this).find('th:first').remove();
                $(this).find('td:first').remove();
            });
            if (fieldNull(data.status) == '已作废'){
                $('#btn-help').remove();
                $('input').attr("disabled", "disabled");
                $('select').attr("disabled", "disabled");
                $(".form-footer button").hide();
                $(".form-footer button:last").show();
            }
        }
    }

    $("#goodsListId input").attr('disabled', 'disabled');

    formOrderTotal();// 统计金额
    $("#brokerageman").focus();



    //按钮权限
    if (!checkPower(11310)) {}
    if (!checkPower(11311)) {}

});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */



/**
 * 取消客户订单
 */
function cancelCustomOrder() {
    if (confirm("确定取消该客户订单吗？")) {
        var currOrder = currOrderId;
        if (currOrder != null && currOrder.length > 0) {
            var sres = stockRes.cancelCustomOrder(currOrder);
            if (sres != null) {
                noticeFrame(23, 'refrush', page);
                runnerConfirem("操作提示", "取消订单成功");
            }
        }
    }
}




/**
 * 修改订单信息
 */
function updateOrderBill() {
    if (currOrderId) {
        var suid = $("#suid").val();
        var out_sid = $("#outStore").val();
        var rank = $.trim($("#rank").val());
        var memo = $.trim($("#memo").val());
        if (!checkAutoComplete('suid')) return false;
        if (!out_sid) {
            runnerAlert('操作提示', '请指定出库仓库');
            return false;
        }
        var postData = {
            "suid": suid,
            "out_sid": out_sid,
            "rank": rank,
            "memo": memo,
        };
        var sres = stockRes.updateCustomOrder(currOrderId, postData);
        if (sres != null) {
            noticeFrame(23, 'refrush', page);
            runnerConfirem("操作提示", "修改成功");
        }
    } else {
        runnerAlert("操作提示", "单号错误");
    }
}
