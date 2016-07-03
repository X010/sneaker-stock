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
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"stockoutPrice\");'>移出</a>",
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
            "name": "out_price1",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' onchange='priceDiffCompress(\"rtoutprice1_#{index}\",\"rtnewinprice1_#{index}\",\"rtpricediff1_#{index}\");' id='rtnewinprice1_#{index}'  type='text'  value='#{out_price1}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "out_price2",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtoutprice2_#{index}' type='text' value='#{out_price2}' size='10' />",
            "dattr": []
        },*/
        {
            "name": "out_price2",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}'  onchange='priceDiffCompress(\"rtoutprice2_#{index}\",\"rtnewinprice2_#{index}\",\"rtpricediff2_#{index}\");' id='rtnewinprice2_#{index}' type='text'  value='#{out_price2}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "out_price3",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtoutprice3_#{index}' type='text' value='#{out_price3}' size='10' />",
            "dattr": []
        },*/
        {
            "name": "out_price3",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}'  onchange='priceDiffCompress(\"rtoutprice3_#{index}\",\"rtnewinprice3_#{index}\",\"rtpricediff3_#{index}\");' id='rtnewinprice3_#{index}' type='text' value='#{out_price3}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "out_price4",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtoutprice4_#{index}'  type='text' value='#{out_price4}' size='10' />",
            "dattr": []
        },*/
        {
            "name": "out_price4",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' onchange='priceDiffCompress(\"rtoutprice4_#{index}\",\"rtnewinprice4_#{index}\",\"rtpricediff4_#{index}\");' id='rtnewinprice4_#{index}' type='text'  value='#{out_price4}' size='10' />",
            "dattr": []
        }
        /**,
        {
            "name": "pricediff1",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff1_#{index}' type='text'  size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff2",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff2_#{index}' type='text'  size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff3",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff3_#{index}' type='text'  size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff4",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff4_#{index}' type='text'  size='10' />",
            "dattr": []
        }
         */
    ]
};

var checkOpts = {
    "rows": 10,
    "template": [
        {
            "name": "gid",
            "type": true,
            "class" : "op",
            "template": "<input type='hidden' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"stockoutPrice\");'>移出</a>",
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
            "name": "out_price1",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtoutprice1_#{index}' onchange='priceDiffCompress(\"rtold_out_price1_#{index}\",\"rtoutprice1_#{index}\",\"rtpricediff1_#{index}\");' type='text' value='#{out_price1}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "old_out_price2",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtold_out_price2_#{index}' type='text'  value='#{old_out_price2}' size='10' />",
            "dattr": []
        },*/
        {
            "name": "out_price2",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtoutprice2_#{index}' onchange='priceDiffCompress(\"rtold_out_price2_#{index}\",\"rtoutprice2_#{index}\",\"rtpricediff2_#{index}\");'  type='text' value='#{out_price2}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "old_out_price3",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtold_out_price3_#{index}' type='text' value='#{old_out_price3}' size='10' />",
            "dattr": []
        },*/
        {
            "name": "out_price3",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtoutprice3_#{index}' onchange='priceDiffCompress(\"rtold_out_price3_#{index}\",\"rtoutprice3_#{index}\",\"rtpricediff3_#{index}\");' type='text' value='#{out_price3}' size='10' />",
            "dattr": []
        },
        /*{
            "name": "old_out_price4",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' readonly index='#{index}' onclick='showPrices(this)' id='rtold_out_price4_#{index}' type='text'  value='#{old_out_price4}' size='10' />",
            "dattr": []
        },*/
        {
            "name": "out_price4",
            "type": true,
            "class" : "price",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtoutprice4_#{index}' onchange='priceDiffCompress(\"rtold_out_price4_#{index}\",\"rtoutprice4_#{index}\",\"rtpricediff4_#{index}\");' type='text' value='#{out_price4}' size='10' />",
            "dattr": []
        }
        /**,
        {
            "name": "pricediff1",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff1_#{index}' value='#{pricediff1}' type='text'  size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff2",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff2_#{index}' value='#{pricediff2}' type='text'  size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff3",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff3_#{index}' value='#{pricediff3}' type='text'  size='10' />",
            "dattr": []
        },
        {
            "name": "pricediff4",
            "type": true,
            "template": "<input class='f-input-goodname' readonly index='#{index}' id='rtpricediff4_#{index}' value='#{pricediff4}' type='text'  size='10' />",
            "dattr": []
        }
         */
    ]
};


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
    var storeout = $("#stockInStore").val();
    var incid = 0;
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {
            "in_cid": incid,
            "out_sid": storeout,
        };
        var send = true;
        if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
            params['barcodes'] = searchVal;
            if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) send = false;
        } else {
            params['search'] = searchVal;
        }
        if (send) {
            var res = stockRes.readStockOutGoodsByField(1, autoCompletePageNum, params);
            //var res = stockRes.readStockOutGoods(1, autoCompletePageNum, incid, storeout, searchVal);
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
            "barcode": fieldNull(tempData[tempIndex].gbarcode),
            "name": tempData[tempIndex].gname,
            "code": tempData[tempIndex].gcode,
            "bname": fieldNull(tempData[tempIndex].gbname),
            "tname": fieldNull(tempData[tempIndex].gtname),
            "spec": tempData[tempIndex].gspec,
            "unit": tempData[tempIndex].gunit,
            "price": tempData[tempIndex].price,
            "total": '',
            "volume": '', //箱数
            "amount_price": 0,
            "tax_price": fieldNull(tempData[tempIndex].tax_price, 0), //税额
            "outtax_price": fieldNull(tempData[tempIndex].outtax_price, 0), //去税金额
            "tax_rate": fieldNull(tempData[tempIndex].gtax_rate, 0) * 100, //税率
            "reserve": tempData[tempIndex].reserve,
            "price_show": '查看原价',
            "pricediff1": '',
            "pricediff2": '',
            "pricediff3": '',
            "pricediff4": '',
        };
        var idx = index;
        if (currentPriceId){ //审核
            appendData["old_out_price1"] = tempData[tempIndex].out_price1;
            appendData["old_out_price2"] = tempData[tempIndex].out_price2;
            appendData["old_out_price3"] = tempData[tempIndex].out_price3;
            appendData["old_out_price4"] = tempData[tempIndex].out_price4;
            appendData["out_price1"] = tempData[tempIndex].out_price1;
            appendData["out_price2"] = tempData[tempIndex].out_price2;
            appendData["out_price3"] = tempData[tempIndex].out_price3;
            appendData["out_price4"] = tempData[tempIndex].out_price4;
        } else { //新建
            appendData["out_price1"] = tempData[tempIndex].out_price1;
            appendData["out_price2"] = tempData[tempIndex].out_price2;
            appendData["out_price3"] = tempData[tempIndex].out_price3;
            appendData["out_price4"] = tempData[tempIndex].out_price4;
        }
        //console.log(idx);
        $("#stockoutPrice").runnerTableAppend(idx, appendData, bindAutoComplete);
        if (currentPriceId) { //审核
            $("#rtoutprice1_" + idx).focus();
        } else {
            $("#rtnewinprice1_" + idx).focus();
        }
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
 * 获取商品清单中的价格数据
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            var index = $(this).attr("id").substring(10, $(this).attr("id").length);
            var out_price1, out_price2, out_price3, out_price4;
            if (currentPriceId) { //审核
                out_price1 = $("#rtoutprice1_" + index).val();
                out_price2 = $("#rtoutprice2_" + index).val();
                out_price3 = $("#rtoutprice3_" + index).val();
                out_price4 = $("#rtoutprice4_" + index).val();
            } else { //新建
                out_price1 = $("#rtnewinprice1_" + index).val();
                out_price2 = $("#rtnewinprice2_" + index).val();
                out_price3 = $("#rtnewinprice3_" + index).val();
                out_price4 = $("#rtnewinprice4_" + index).val();
            }

            goodList[i] = {
                "gid": gid,
                "out_price1": out_price1,
                "out_price2": out_price2,
                "out_price3": out_price3,
                "out_price4": out_price4
            };
            i++;
        }
    });
    return goodList;
}


/**
 * 转换数据格式
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
                "price_show": '',
                "out_price1": data[i].out_price1,
                "out_price2": data[i].out_price2,
                "out_price3": data[i].out_price3,
                "out_price4": data[i].out_price4,
                /*
                "old_out_price1": data[i].old_out_price1,
                "old_out_price2": data[i].old_out_price2,
                "old_out_price3": data[i].old_out_price3,
                "old_out_price4": data[i].old_out_price4,
                "pricediff1": computePriceDiff(data[i].old_out_price1, data[i].out_price1),
                "pricediff2": computePriceDiff(data[i].old_out_price2, data[i].out_price2),
                "pricediff3": computePriceDiff(data[i].old_out_price3, data[i].out_price3),
                "pricediff4": computePriceDiff(data[i].old_out_price4, data[i].out_price4),
                */
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
    //if (!$(x).val()) return;
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
        if (VERSION_MODE == 'B2C'){
            var tips = '<tr><th>仓库</th><th class="price">非会员价</th><th class="price">计价会员价</th><th class="price">包年会员价</th><th class="price">合伙会员价</th></tr>';
        } else {
            var tips = '<tr><th>仓库</th><th class="price">原经销价</th><th class="price">原酒店价</th><th class="price">原商超价</th><th class="price">原便利店价</th></tr>';
        }
        for (var k in prices){
            if (k == 0) continue; //不显示公司价格了
            tips += '<tr><td>'+prices[k]['name']+'</td>';
            tips += '<td class="price"><strong>'+prices[k]['out_price1']+'</strong> 元</td></td>';
            tips += '<td class="price"><strong>'+prices[k]['out_price2']+'</strong> 元</td></td>';
            tips += '<td class="price"><strong>'+prices[k]['out_price3']+'</strong> 元</td></td>';
            tips += '<td class="price"><strong>'+prices[k]['out_price4']+'</strong> 元</td></td>';
            tips += '</tr>';
        }
        var offset = span.offset();
        var css_top = offset.top + span.height();
        var css_left = offset.left;
        $('#tips_price').css('top', css_top + 1).css('left', css_left - 400).html('').html(tips).show();
    }

    $('#tips_price').mouseleave(function(){
        $(this).hide();
    });

}


/*-----------------------------------------------分隔线-----------------------------------------------*/

var currentPriceId = 0;

/**
 * 初始加载数据
 */
$(function () {
    $("#effectTime").datepicker();

    if (VERSION_MODE == 'B2C') {
        $('#price1').html('非会员价');
        $('#price2').html('计价会员价');
        $('#price3').html('包年会员价');
        $('#price4').html('合伙会员价');
    }

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
        //bindSelfStore("outStore"); //绑定仓库
        //$("#outStore").prepend("<option value='-1'>公司</option>")
        //bindSelfStoreCheckBox("stockInStore"); //绑定仓库
        bindSelfStore("stockInStore"); //绑定仓库
        $("#stockInStore").prepend("<option value='-1'>全部</option>");
        $("#checkall").click(function(){
            if ($(this).attr('checked') == 'checked'){
                $('#stockInStore input').removeAttr('checked').attr('disabled', 'disabled');
            } else {
                $('#stockInStore input').removeAttr('disabled');
            }
        });
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
            openParentForFrame('出货价调整单','/mainframe/price/stockoutPrice.html?option=1', 663);
        });
        $("#cuname").html('(空)');
        $("#checktime").html('(空)');
        $("#stockoutPrice").runnerTableOnStart(opts, null, bindAutoComplete);
        //$("#effectTime").val(GetDateStr(1));
    }

    //审核
    if (action == "ch") {
        $('#btn-list').click(function(){
            openParentForFrame('出货价调整单','/mainframe/price/stockoutPrice.html?option=1', 663);
        });
        $("#newStockoutPrice").toggle();
        $("#checkStockoutPrice").toggle();
        currentPriceId = id;
        $("#priceId").html(id);
        var currentData = priceRes.findStockoutPriceById(id);
        //console.log(currentData);
        if (currentData != null) {
            if (currentData.isnow == 1){
                $("#isnow").attr("checked", "checked");
                $("#effectTime").attr('disabled', 'disabled');
            }
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#memo").val(fieldNull( currentData.memo));
            $("#cuname").html('(空)');
            $("#checktime").html('(空)');
            $("#effectTime").val(formatDatetime(currentData.begintime, 'Ymd'));
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
            $("#stockoutPrice").runnerTableOnStart(checkOpts, goodsList, bindAutoComplete);
        }
    }

    //查看
    if (action == "see") {
        $('#btn-list').click(function(){
            openParentForFrame('出货价调整单','/mainframe/price/stockoutPrice.html?option=2', 663);
        });
        currentPriceId = id;
        $("#priceId").html(id);
        var currentData = priceRes.findStockoutPriceById(id);
        //console.log(currentData);
        if (currentData != null) {
            if (currentData.isnow == 1){
                $("#isnow").attr("checked", "checked");
            }
            $("#fullperson").html(fieldNull(currentData.uname));
            $("#iOrderDate").html(formatDatetime(currentData.createtime));
            $("#memo").val(fieldNull(currentData.memo));
            $("#effectTime").val(formatDatetime(currentData.begintime, 'Ymd'));
            $("#cuname").html(fieldNull(currentData.cuname, '(空)')); //审核人
            $("#checktime").html(formatDatetime(currentData.checktime)); //审核时间
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
            $("#stockoutPrice").runnerTableOnStart(checkOpts, goodsList, bindAutoComplete);
            stampStatus(currentData.status == 2 ? '已审核' : '已作废');
        }
        $("#newStockoutPrice").hide();
        $("#divbtn-cancel").show();

        //禁止编辑并去掉无用列
        $('input').attr("disabled", "disabled");
        $('select').attr("disabled", "disabled");
        $('#btn-help').remove();
        $('#checkStockoutPrice .btn-add').remove();
        $("#stockoutPrice tr th").eq(0).remove();
        $('#stockoutPrice tr').each(function(){$(this).find('td').eq(0).remove();});
    }

    //按钮权限
    if (!checkPower(11901)) {}
    if (!checkPower(11902)) {}
    if (!checkPower(11903)) {}
    if (!checkPower(11904)) {}

});

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */






/**
 * 操作进货调价单
 * @param type  删除:delete
 *              创建:create (default)
 *              审核:check
 *              创建并审核:create_and_check
 */
function saveStockoutPrice(type) {
    if (type != 'delete'){
        var data = getTableData();
        if (!data || data.length <= 0) {
            runnerAlert("错误提示", "请添加商品");
            return;
        }
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
            runnerAlert("错误提示", "请选择调价仓库");
            return;
        }

        var begintime = $("#effectTime").val();
        if (!begintime) {
            runnerAlert("错误提示", "请选择生效时间");
            return;
        }

        var isnow = $("#isnow").attr("checked") == "checked" ? 1 : 2;
        var memo = $("#memo").val();
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
                noticeFrame(663, 'refrush', page);
                runnerConfirem("操作提示", "作废成功");
            }
            break;

        case 'check':
            var res = priceRes.editAndCheckStockoutPrice(currentPriceId, postData);
            if (res != null) {
                noticeFrame(663, 'refrush', page);
                runnerConfirem("操作提示", "审核通过");
            }
            break;

        case 'create_and_check':
            var res = priceRes.createAndCheckStockoutPrice(postData);
            if (res != null) {
                noticeFrame(663, 'refrush', page);
                runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/price/createStockoutPrice.html?iframeid=63&iframename=" + encodeURI("新建出货价调整单"));
            }
            break;

        case 'create':
        default:
            var res = priceRes.createStockoutPrice(postData);
            if (res != null) {
                noticeFrame(663, 'refrush', page);
                runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/price/createStockoutPrice.html?iframeid=63&iframename=" + encodeURI("新建出货价调整单"));
            }
            break;
    }

}

