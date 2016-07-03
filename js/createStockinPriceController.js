var priceRes = new priceRepository();
var stockRes = new stockRepository();
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
            "class" : "op",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"stockinPrice\");'>移出</a>",
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
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbarcode_#{index}' type='text' value='#{barcode}' size='10' />",
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
            "name": "price_show",
            "type": true,
            "class" : "gcode",
            //"template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtoutprice1_#{index}' type='text' value='点击显示' size='10' />",
            "template": "<span class='align-center' id='span_price_show_#{index}'><a href='javascript:showPrices(#{index})'>#{price_show}</a></span>",
            "dattr": []
        },
        {
            "name": "newprice",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' onchange='priceDiffCompress(\"rtinprice_#{index}\",\"rtnewinprice_#{index}\",\"rtpricediff_#{index}\");' id='rtnewinprice_#{index}' type='text'  value='#{newprice}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "pricediff",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff_#{index}' type='text'  size='10' />",
            "dattr": []
        }*/
    ]
};

var checkOpts = {
    "rows": 10,
    "template": [
        {
            "name": "gid",
            "type": true,
            "class" : "op",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"stockinPrice\");'>移出</a>",
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
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbarcode_#{index}' type='text' value='#{barcode}' size='10' />",
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
            "name": "price_show",
            "type": true,
            "class" : "gcode",
            //"template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtoutprice1_#{index}' type='text' value='点击显示' size='10' />",
            "template": "<span class='align-center' id='span_price_show_#{index}'><a href='javascript:showPrices(#{index})'>#{price_show}</a></span>",
            "dattr": []
        },
        {
            "name": "newprice",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' onchange='priceDiffCompress(\"rtinprice_#{index}\",\"rtnewinprice_#{index}\",\"rtpricediff_#{index}\");' id='rtnewinprice_#{index}' type='text'  value='#{newprice}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "pricediff",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff_#{index}' type='text' value='#{pricediff}'  size='10' />",
            "dattr": []
        }*/
    ]
};



/**
 * 计算价格差
 * @param container1
 * @param container2
 */
function priceDiffCompress(container1, container2, container3) {
    var price1 = parseFloat($("#" + container1).val());
    var price2 = parseFloat($("#" + container2).val());
    $("#" + container3).val(computePriceDiff(price1, price2));
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
            if (("rtbarcode_" + container) == id) {
                $("#" + id).runnerAutoComplete({
                    onSearch: onsearch
                })
            }
        }
    });
}


var tempData = null;
var onsearch = function (val, parent, divID) {
    var storein = $("#stockInStore").val();
    var supplier = $("#supplier").val();
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {
            "in_sid": storein,
            "out_cid": supplier,
            "old_price": 1,
        };
        var send = true;
        if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
            params['barcodes'] = searchVal;
            if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) send = false;
        } else {
            params['search'] = searchVal;
        }
        if (send) {
            var res = stockRes.readStockInGoodsByField(1, autoCompletePageNum, params);
            //var res = stockRes.readStockInGoods(1, autoCompletePageNum, storein, searchVal, supplier,1);
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
    //console.log(index);
    //console.log(tempIndex);
    if (tempData != null && tempData.length > 0) {
        //console.log(tempData[tempIndex]);
        //填充数据到列表
        var appendData = {
            "gid": tempData[tempIndex].gid,
            "code": tempData[tempIndex].gcode,
            "name": tempData[tempIndex].gname,
            "barcode": fieldNull(tempData[tempIndex].gbarcode),
            "spec": tempData[tempIndex].gspec,
            "unit": tempData[tempIndex].gunit,
            "price": tempData[tempIndex].price,
            "price_show": '查看原价',
            "newprice": tempData[tempIndex].price,
            "pricediff": '',
        };
        var idx = index;
        //console.log(idx);
        $("#stockinPrice").runnerTableAppend(idx, appendData, bindAutoComplete);
        $("#rtnewinprice_" + idx).focus();
        lockHeader(1);
    }
    $("#" + divID).toggle();
}

function lockHeader(lock) {
    if (lock) {
        $('#stockInStore').attr('disabled', 'disabled');
    } else {
        $('#stockInStore').removeAttr('disabled');
    }
}

/**
 * 获取商品清单中的价格数据
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            var index = $(this).attr("id").substring(10, $(this).attr("id").length);
            var newprice = $("#rtnewinprice_" + index).val();
            goodList[i] = {
                "gid": gid,
                "in_price": newprice,
            };
            i++;
        }
    });
    return goodList;
}


/**
 * 转换数据格式:API返回参数转模版参数
 * @param data
 */
function changePriceGoodList(data) {
    var goodsList = [];
    if (data.length){
        for (var i = 0; i < data.length; i++) {
            goodsList[i] = {
                "gid": data[i].gid,
                "barcode": fieldNull(data[i].gbarcode),
                "name": data[i].gname,
                "code": data[i].gcode,
                "unit": fieldNull(data[i].gunit),
                "spec": fieldNull(data[i].gspec),
                "price_show": '',
                "newprice": data[i].in_price,
                "pricediff": computePriceDiff(data[i].old_in_price, data[i].in_price),
            };
        }
        lockHeader(1);
    }
    return goodsList;
}

/**
 * 查看各个仓库的原价
 */
function showPrices(idx){
    var span = $('#span_price_show_' + idx);
    var gid = $('#hiddengid_' + idx).val();
    //console.log(gid);
    var params = {
        'gid': gid
    };
    var currentData = priceRes.readPriceInAllStore(defaultPage, defaultPageNum, params);
    //console.log(currentData);
    if (currentData && currentData.data){
        //console.log(currentData.data[0].price);
        var prices = currentData.data[0].price;
        var tips = '<tr><th>公司/仓库</th><th class="price">原进价</th></tr>';
        for (var k in prices){
            if (k == 0) continue; //不显示公司价格了
            //console.log(prices[k]);
            tips += '<tr><td>'+prices[k]['name']+'</td><td class="price"><strong>'+prices[k]['in_price']+'</strong> 元</td></tr>';
        }
        var offset = span.offset();
        var css_top = offset.top + span.height();
        var css_left = offset.left;
        $('#tips_price').css('top', css_top+1).css('left', css_left).html('').html(tips).show();
    }

    $('#tips_price').mouseleave(function(){
        $(this).hide();
    });

}

/*--------------------------------------------------分隔线-----------------------------------------------------*/


var currentPriceId = 0;

/**
 * 初始加载数据
 */
$(function () {
    $("#effectTime").datepicker();

    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");

    if (msg != null) {
        msg = JSON.parse(msg);
        //console.log(msg);
        $("#fullperson").html(msg.name); //默认填单人
        //$("#effectTime").val(GetDateStr(1));
        //$("#companyName").html(msg.cname); //公司名称
        bindSelfStore("stockInStore"); //绑定仓库
        $("#stockInStore").prepend("<option value='-1'>公司</option>");
        /*bindSelfStoreCheckBox("stockInStore"); //绑定仓库
        $("#checkall").click(function(){
            if ($(this).attr('checked') == 'checked'){
                $('#stockInStore input').removeAttr('checked').attr('disabled', 'disabled');
            } else {
                $('#stockInStore input').removeAttr('disabled');
            }
        });*/

    }

    $('#isnow').click(function(){
        if ($('#isnow').attr("checked") == "checked"){
            $('#effectTime').val(GetDateStr(0)).attr('disabled', 'disabled');
        } else {
            $('#effectTime').removeAttr('disabled');
        }
    });

    //新建
    if (action == null || action == 'undefined') {
        $('#btn-print').remove();
        $('#btn-list').click(function(){
            openParentForFrame('进货价调整单','/mainframe/price/stockinPrice.html?option=1', 662);
        });
        $("#cuname").html('(空)');
        $("#checktime").html('(空)');
        $("#stockinPrice").runnerTableOnStart(opts, null, bindAutoComplete);
    }

    //审核
    if (action == "ch") {
        $('#btn-list').click(function(){
            openParentForFrame('进货价调整单','/mainframe/price/stockinPrice.html?option=1', 662);
        });
        currentPriceId = id;
        $("#priceId").html(id);
        var currentData = priceRes.findStockinPriceById(id);

        if (currentData != null) {
            if (currentData.isnow == 1){
                $("#isnow").attr("checked", "checked");
                $("#effectTime").attr('disabled', 'disabled');
            }
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#effectTime").val(formatDatetime(currentData.begintime, 'Ymd'));
            $("#memo").val(fieldNull(currentData.memo));
            $("#cuname").html('(空)');
            $("#checktime").html('(空)');
            //$("#stockInStore").val(currentData.sid);

            //处理调价范围 BEGIN
            if (currentData.sids == -1){
                $('#checkall').attr('checked', 'checked');
                $('#stockInStore input').removeAttr('checked').attr('disabled', 'disabled');
            } else {
                var sids_tmp = currentData.sids.split(',');
                var sids_arr = [];
                for (var id in sids_tmp){
                    //console.log(id, sids_tmp);
                    sids_arr[id] = 'stockInStore_' + sids_tmp[id];
                }
                $('#stockInStore input').removeAttr('checked').each(function(){
                    if($.inArray($(this).attr('name'), sids_arr) != -1){
                        //console.log($(this).attr('name'), sids_arr);
                        $(this).attr('checked', 'checked');
                    }
                });
            }
            //处理调价范围 END

            var goodsList = changePriceGoodList(currentData.goods_list);
            $("#stockinPrice").runnerTableOnStart(checkOpts, goodsList, bindAutoComplete);
        }
        $("#newStockinPrice").hide();
        $("#checkStockinPrice").show();
    }

    //查看
    if (action == "see") {
        $('#btn-list').click(function(){
            openParentForFrame('进货价调整单','/mainframe/price/stockinPrice.html?option=2', 662);
        });
        currentPriceId = id;
        $("#priceId").html(id);
        var currentData = priceRes.findStockinPriceById(id);

        if (currentData != null) {
            if (currentData.isnow == 1){
                $("#isnow").attr("checked", "checked");
            }
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#effectTime").val(currentData.begintime);
            $("#cuname").html(fieldNull(currentData.cuname, '(空)')); //审核人
            $("#checktime").html(formatDatetime(currentData.checktime)); //审核时间
            $("#memo").val(fieldNull(currentData.memo));
            //$("#stockInStore").val(currentData.sid);

            //处理调价范围 BEGIN
            if (currentData.sids == -1){
                $('#checkall').attr('checked', 'checked');
                $('#stockInStore input').removeAttr('checked').attr('disabled', 'disabled');
            } else {
                var sids_tmp = currentData.sids.split(',');
                var sids_arr = [];
                for (var id in sids_tmp){
                    //console.log(id, sids_tmp);
                    sids_arr[id] = 'stockInStore_' + sids_tmp[id];
                }
                $('#stockInStore input').removeAttr('checked').each(function(){
                    if($.inArray($(this).attr('name'), sids_arr) != -1){
                        //console.log($(this).attr('name'), sids_arr);
                        $(this).attr('checked', 'checked');
                    }
                });
            }
            //处理调价范围 END

            var goodsList = changePriceGoodList(currentData.goods_list);
            $("#stockinPrice").runnerTableOnStart(checkOpts, goodsList, bindAutoComplete);
            stampStatus(currentData.status == 2 ? '已审核' : '已作废');
        }
        $("#newStockinPrice").hide();
        $("#divbtn-cancel").show();

        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $('#checkStockinPrice .btn-add').remove();
        $("#stockinPrice tr th").eq(0).remove();
        $('#stockinPrice tr').each(function(){$(this).find('td').eq(0).remove();});
    }

    //按钮权限
    if (!checkPower(11801)) {}
    if (!checkPower(11802)) {}
    if (!checkPower(11803)) {}
    if (!checkPower(11804)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 操作进货调价单
 * @param type  删除:delete
 *              创建:create (default)
 *              审核:check
 *              创建并审核:create_and_check
 */
function saveStockinPrice(type) {
    if (type != 'delete'){
        var data = getTableData();
        if (!data || data.length <= 0) {
            runnerAlert("错误提示", "请添加商品");
            return;
        }
        var isnow = $("#isnow").attr("checked") == "checked" ? 1 : 2;
        var begintime = $("#effectTime").val();
        if (!begintime) {
            runnerAlert("错误提示", "请选择生效时间");
            return;
        }
        var memo = $("#memo").val();
        var sids = $("#stockInStore").val();
        /*var sids = '';
        if ($('#checkall').attr('checked') == 'checked') {
            sids = '-1';
        } else {
            $('#stockInStore input').each(function(){
                if ($(this).attr('checked') == 'checked') sids += $(this).val() + ',';
            });
        }*/
        if (!sids) {
            runnerAlert("错误提示", "请选择调价范围");
            return;
        }

        var postData = {
            "sids": sids,
            "begintime": begintime,
            "goods_list": JSON.stringify(data),
            "isnow": isnow,
            "memo": memo
        };
    }

    switch (type) {
        case 'delete':
            var res = priceRes.deletePriceById(currentPriceId);
            if (res != null) {
                noticeFrame(662, 'refrush', page);
                runnerConfirem("操作提示", "作废成功");
            }
            break;

        case 'check':
            var res = priceRes.editAndCheckStockinPrice(currentPriceId, postData);
            if (res != null) {
                noticeFrame(662, 'refrush', page);
                runnerConfirem("操作提示", "审核通过");
            }
            break;

        case 'create_and_check':
            var res = priceRes.createAndCheckStockinPrice(postData);
            if (res != null) {
                noticeFrame(662, 'refrush', page);
                runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/price/createStockinPrice.html?iframeid=62&iframename=" + encodeURI("新建进货价调整单"));
            }
            break;

        case 'create':
        default:
            var res = priceRes.createStockinPrice(postData);
            if (res != null) {
                noticeFrame(662, 'refrush', page);
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/price/createStockinPrice.html?iframeid=62&iframename=" + encodeURI("新建进货价调整单"));
            }
            break;


    }

}

