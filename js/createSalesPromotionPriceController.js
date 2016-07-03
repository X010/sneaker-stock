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
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"stockinSalePriceList\");'>移出</a>",
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
            "name": "begin_date",
            "type": true,
            "class" : "date",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbegin_date_#{index}' type='text' value='#{begin_date}' size='10' />",
            "dattr": []
        },
        {
            "name": "begin_time",
            "type": true,
            "class" : "time",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbegin_time_#{index}' type='text' value='#{begin_time}' size='10' />",
            "dattr": []
        },
        {
            "name": "end_date",
            "type": true,
            "class" : "date",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtend_date_#{index}' type='text' value='#{end_date}' size='10' />",
            "dattr": []
        },
        {
            "name": "end_time",
            "type": true,
            "class" : "time",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtend_time_#{index}' type='text' value='#{end_time}' size='10' />",
            "dattr": []
        }/*,
        {
            "name": "price_option",
            "type": true,
            "template": "<select index='#{index}' id='rtinprice_#{index}'>#{price_option}</select>",
            //"template": "<input class='f-input-goodname' index='#{index}' id='rtinprice_#{index}' type='text' value='#{price}' size='10' />",
            "dattr": []
        }*/,
        {
            "name": "price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtinprice_#{index}' type='text' value='#{price}' size='10' />",
            "dattr": []
        },
        {
            "name": "price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' onchange='priceDiffCompress(\"rtinprice_#{index}\",\"rtnewinprice_#{index}\",\"rtpricediff_#{index}\");' id='rtnewinprice_#{index}' type='text'  value='#{price}' size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff_#{index}' type='text'  size='10' />",
            "dattr": []
        }
    ]
};


var checkOpts = {
    "rows": 10,
    "template": [
        {
            "name": "gid",
            "type": true,
            "class" : "op",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"stockinSalePriceList\");'>移出</a>",
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
            "name": "begin_date",
            "type": true,
            "class" : "date",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbegin_date_#{index}' type='text' value='#{begin_date}' size='10' />",
            "dattr": []
        },
        {
            "name": "begin_time",
            "type": true,
            "class" : "time",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbegin_time_#{index}' type='text' value='#{begin_time}' size='10' />",
            "dattr": []
        },
        {
            "name": "end_date",
            "type": true,
            "class" : "date",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtend_date_#{index}' type='text' value='#{end_date}' size='10' />",
            "dattr": []
        },
        {
            "name": "end_time",
            "type": true,
            "class" : "time",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtend_time_#{index}' type='text' value='#{end_time}' size='10' />",
            "dattr": []
        }/*,
        {
            "name": "price_option",
            "type": true,
            "template": "<select index='#{index}' id='rtinprice_#{index}'>#{price_option}</select>",
            //"template": "<input class='f-input-goodname' index='#{index}' id='rtinprice_#{index}' type='text' value='#{price}' size='10' />",
            "dattr": []
        }*/,
        {
            "name": "price",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtinprice_#{index}' type='text' value='#{price}' size='10' />",
            "dattr": []
        },
        {
            "name": "newprice",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' onchange='priceDiffCompress(\"rtinprice_#{index}\",\"rtnewinprice_#{index}\",\"rtpricediff_#{index}\");' id='rtnewinprice_#{index}' type='text'  value='#{newprice}' size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff_#{index}' type='text' value='#{pricediff}'  size='10' />",
            "dattr": []
        }
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
    if ($('#checkall').attr('checked')!='checked' && !$('#stockInStore input:checked').val()){
        runnerAlert("错误提示", "请选择调价范围");
        return;
    }
    var storein = '-1'; //强制查公司下商品
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
            "barcode": fieldNull(tempData[tempIndex].gbarcode),
            "name": tempData[tempIndex].gname,
            "code": tempData[tempIndex].gcode,
            "bname": fieldNull(tempData[tempIndex].gbname),
            "tname": fieldNull(tempData[tempIndex].gtname),
            "spec": tempData[tempIndex].gspec,
            "unit": tempData[tempIndex].gunit,
            "price": tempData[tempIndex].price,
            //"price_option": '<option value="' + tempData[tempIndex].price + '">'+tempData[tempIndex].price+'</option>',
            "total": '',
            "volume": '', //箱数
            "amount_price": 0,
            "tax_price": fieldNull(tempData[tempIndex].tax_price, 0), //税额
            "outtax_price": fieldNull(tempData[tempIndex].outtax_price, 0), //去税金额
            "tax_rate": fieldNull(tempData[tempIndex].gtax_rate, 0) * 100, //税率
            "reserve": tempData[tempIndex].reserve,
            "newprice": tempData[tempIndex].price,
            "pricediff": '',
            "begin_date": '',
            "begin_time": '00:00:00',
            "end_date": '',
            "end_time": '23:59:59',
        };
        var idx = index;
        //console.log(idx);
        $("#stockinSalePriceList").runnerTableAppend(idx, appendData, bindAutoComplete);
        //$("#rtbegin_date_" + idx).focus();
        $("#rtbegin_date_" + idx).datepicker();
        $("#rtend_date_" + idx).datepicker();
        lockHeader(1);
    }
    $("#" + divID).toggle();
}


function lockHeader(lock) {
    if (lock) {
        $('#stores input').attr('disabled', 'disabled');
    } else {
        $('#stores input').removeAttr('disabled');
    }
}

/**
 * 获取商品清单中的价格数据
 * @return 正确时为array | 错误时为string
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    var msg_error = false;
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            var index = $(this).attr("id").substring(10, $(this).attr("id").length);

            var begin_date = $.trim($("#rtbegin_date_" + index).val());
            var end_date = $.trim($("#rtend_date_" + index).val());
            if (begin_date=='' || end_date==''){
                msg_error = '请填写完整日期信息';
            }

            var newprice = $("#rtnewinprice_" + index).val();
            var begintime = begin_date + ' ' + $("#rtbegin_time_" + index).val();
            var endtime = end_date + ' ' + $("#rtend_time_" + index).val();
            goodList[i] = {
                "gid": gid,
                "in_price": newprice,
                "begintime": begintime,
                "endtime": endtime,
            };
            i++;
        }
    });
    if (msg_error){
        goodList = msg_error;
    }
    return goodList;
}



/**
 * 转换数据格式:API返回参数转模版参数
 * @param data
 */
function changePriceGoodList(data) {
    var goodsList = [];
    if (data.length) {
        for (var i = 0; i < data.length; i++) {
            goodsList[i] = {
                "gid": data[i].gid,
                "barcode": fieldNull(data[i].gbarcode),
                "name": data[i].gname,
                "code": data[i].gcode,
                "unit": fieldNull(data[i].gunit),
                "spec": fieldNull(data[i].gspec),
                "price": data[i].old_in_price,
                "newprice": data[i].in_price,
                "begin_date": data[i].begintime ? data[i].begintime.split(' ')[0] : '',
                "begin_time": data[i].begintime ? data[i].begintime.split(' ')[1] : '',
                "end_date": data[i].endtime ? data[i].endtime.split(' ')[0] : '',
                "end_time": data[i].endtime ? data[i].endtime.split(' ')[1] : '',
                "pricediff": computePriceDiff(data[i].old_in_price, data[i].in_price),
            };
        }
        lockHeader(1);
    }
    return goodsList;
}

/**
 * 对非空行,清理select
 */
function cleanEmptyTR(){
    $('#stockinSalePriceList tr').each(function(){
        if (!$(this).find('td').eq(1).find('input').val()) {
            $(this).find('td').find('select').remove();
        }
    });
}


/**
 * 查看各个仓库的原价
 * @param x 当前input元素
 */
function showPrices(x){
    if (!$(x).val()) return;
    var gid = $('#hiddengid_' + $(x).attr('index')).val();
    //console.log(gid);
    var params = {
        'gid': gid
    };
    var currentData = priceRes.readPriceInAllStore(defaultPage, defaultPageNum, params);
    //console.log(currentData);
    if (currentData && currentData.data){
        //console.log(currentData.data[0].price);
        var prices = currentData.data[0].price;
        var tips = '<tr><th>公司仓库</th><th class="price">原进价</th></tr>';
        for (var k in prices){
            //console.log(prices[k]);
            tips += '<tr><td>'+prices[k]['name']+'</td><td class="price"><strong>'+prices[k]['in_price']+'</strong> 元</td></tr>';
        }
        var offset = $(x).offset();
        var css_top = offset.top + $(x).height();
        var css_left = offset.left;
        $('#tips_price').css('top', css_top+1).css('left', css_left).html('').html(tips).show();
    }

    $('#tips_price').mouseleave(function(){
        $(this).hide();
    });

}

/*----------------------------------------------分隔线-----------------------------------------------*/

var currentPriceId = 0;

$(function () {
    //$("#startEffectTime").datepicker();
    //$("#endEffectTime").datepicker();
    page = getUrlParam("page");
    page = page ? page : 1;
    var id = getUrlParam("id");
    var action = getUrlParam("action");
    var msg = cookieUtil("userprofile");

    if (msg != null) {
        msg = JSON.parse(msg);
        //console.log(msg);
        $("#fullperson").html(msg.name); //默认填单人
        //$("#companyName").html(msg.cname); //公司名称
        //bindSelfStore("stockInStore"); //绑定仓库
        //$("#stockInStore").prepend("<option value='-1'>公司</option>");
        bindSelfStoreCheckBox("stockInStore"); //绑定仓库
        //$("#stockInStore").prepend('<input type="checkbox" name="checkall" value="" /> 公司');
        $("#checkall").click(function(){
            if ($(this).attr('checked') == 'checked'){
                $('#stockInStore input').removeAttr('checked').attr('disabled', 'disabled');
            } else {
                $('#stockInStore input').removeAttr('disabled');
            }
        });
        //$("#startEffectTime").val(GetDateStr(1));
        //$("#endEffectTime").val(GetDateStr(1));
    }

    //用首行值填充其余行
    $('#stockinSalePriceList a[name="datetime"]').click(function(){
        var offset_td = $(this).parent().index();
        var td_prodate = $('#stockinSalePriceList tbody tr').eq(0).find('td').eq(offset_td).find('input').val();
        if (td_prodate) {
            $('#stockinSalePriceList tr').each(function () {
                if ($(this).find('td').eq(1).find('input').val()) {
                    $(this).find('td').eq(offset_td).find('input').val(td_prodate);
                }
            });
        }
    });


    //新建
    if (action == null || action == 'undefined') {
        $('#btn-print').remove();
        $('#btn-list').click(function(){
            openParentForFrame('进价促销单','/mainframe/price/salesPromotionPrice.html?option=1', 664);
        });
        $("#cuname").html('(空)');
        $("#checktime").html('(空)');
        $("#stockinSalePriceList").runnerTableOnStart(opts, null, bindAutoComplete);
    }

    //审核
    if (action == "ch") {
        $('#btn-list').click(function(){
            openParentForFrame('进价促销单','/mainframe/price/salesPromotionPrice.html?option=1', 664);
        });
        $("#cuname").html('(空)');
        $("#checktime").html('(空)');
        $("#newStockinSalesPrice").hide();
        $("#checkStockinSalesPrice").show();
        currentPriceId = id;

        var currentData = priceRes.findStockinSalePromotionPriceById(id);

        if (currentData != null) {
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#priceId").html(currentData.id);
            $("#memo").val(fieldNull(currentData.memo));
            //var startSplit = currentData.begintime.split(" ");
            //$("#startEffectTime").val(startSplit[0]);
            //$("#startEffectHour").val(startSplit[1]);
            //var endSplit = currentData.endtime.split(" ");
            //$("#endEffectTime").val(endSplit[0]);
            //$("#endEffectHour").val(endSplit[1]);

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
            $("#stockinSalePriceList").runnerTableOnStart(checkOpts, goodsList, bindAutoComplete);
        }
        for (var j = 0; j < currentData.goods_list.length; j++){ $("#rtbegin_date_"+j).datepicker(); $("#rtend_date_"+j).datepicker(); }
    }

    //查看
    if (action == "see") {
        $('#btn-list').click(function(){
            openParentForFrame('进价促销单','/mainframe/price/salesPromotionPrice.html?option=2', 664);
        });
        currentPriceId = id;

        var currentData = priceRes.findStockinSalePromotionPriceById(id);

        if (currentData != null) {
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#priceId").html(currentData.id);
            $("#memo").val(fieldNull(currentData.memo));
            $("#cuname").html(fieldNull(currentData.cuname, '空')); //审核人
            $("#checktime").html(formatDatetime(currentData.checktime)); //审核时间
            //var startSplit = currentData.begintime.split(" ");
            //$("#startEffectTime").val(startSplit[0]);
            //$("#startEffectHour").val(startSplit[1]);
            //var endSplit = currentData.endtime.split(" ");
            //$("#endEffectTime").val(endSplit[0]);
            //$("#endEffectHour").val(endSplit[1]);

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
            $("#stockinSalePriceList").runnerTableOnStart(checkOpts, goodsList, bindAutoComplete);
            stampStatus(currentData.status == 2 ? '已审核' : '已作废');
        }
        $("#newStockinSalesPrice").hide();
        $("#divbtn-cancel").show();

        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $('#checkStockinSalesPrice .btn-add').remove();
        $("#stockinSalePriceList tr th").eq(0).remove();
        $('#stockinSalePriceList tr').each(function(){$(this).find('td').eq(0).remove();});
    }

    //cleanEmptyTR();
    //按钮权限
    if (!checkPower(12001)) {}
    if (!checkPower(12002)) {}
    if (!checkPower(12003)) {}
    if (!checkPower(12004)) {}
});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 操作促销进货调价单
 * @param type  删除:delete
 *              创建:create (default)
 *              审核:check
 *              创建并审核:create_and_check
 */
function saveSalesPromotionPrice(type) {
    if (type != 'delete'){
        var data = getTableData();
        if (typeof(data) == 'string'){
            runnerAlert("错误提示", data);
            return;
        }
        if (!data || data.length <= 0) {
            runnerAlert("错误提示", "请添加商品");
            return;
        }
        //var sid = $("#stockInStore").val();
        //var startTime = $("#startEffectTime").val() + " " + $("#startEffectHour").val();
        //var endTime = $("#endEffectTime").val() + " " + $("#endEffectHour").val();
        var memo = $("#memo").val();
        var sids = '';
        if ($('#checkall').attr('checked') == 'checked') {
            sids = '-1';
        } else {
            $('#stockInStore input').each(function(){
                if ($(this).attr('checked') == 'checked') sids += $(this).val() + ',';
            });
        }
        if (!sids) {
            runnerAlert("错误提示", "请选择调价范围");
            return;
        }

        //封装数据
        var postData = {
            "sids": sids,
            //"begintime": startTime,
            //"endtime": endTime,
            "goods_list": JSON.stringify(data),
            "memo": memo
        };
    }


    switch (type){
        case 'delete':
            var res = priceRes.deleteStockinSalesPromotionPrice(currentPriceId);
            if (res != null) {
                noticeFrame(664, 'refrush', page);
                runnerConfirem("操作提示", "作废成功");
            }
            break;

        case 'check':
            var res = priceRes.editAndCheckStockinSalesPromotionPrice(currentPriceId, postData);
            if (res != null) {
                noticeFrame(664, 'refrush', page);
                runnerConfirem("操作提示", "审核通过");
            }
            break;

        case 'create_and_check':
            var res = priceRes.createAndCheckStockinSalesPromotionPrice(postData);
            if (res != null) {
                noticeFrame(664, 'refrush', page);
                runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/price/createSalesPromotionPrice.html?iframeid=64&iframename=" + encodeURI("新建进价促销单"));
            }
            break;

        case 'create':
        default:
            var res = priceRes.createStockinSalesPromotionPrice(postData);
            if (res != null) {
                noticeFrame(664, 'refrush', page);
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/price/createSalesPromotionPrice.html?iframeid=64&iframename=" + encodeURI("新建进价促销单"));
            }
            break;
    }

}

