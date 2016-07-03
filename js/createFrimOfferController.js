var checkRes = new checkRepository();

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
            "template": "<input type='hidden' index='#{index}' id='hiddengid_#{index}' value='#{gid}'/><a class=\"iconbtn-del\" title=\"从列表移除\" href='javascript:removeItem(#{index},\"frimOfferList\");'>移出</a>",
            "dattr": []
        },
        {
            "name": "gcode",
            "type": true,
            "class": "gcode",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtcode_#{index}' type='text' value='#{gcode}' size='10' />",
            "fill": []
        },
        {
            "name": "gname",
            "type": true,
            "class": "gname",
            "template": "<input class='f-input-goodname'  index='#{index}' id='rtname_#{index}' type='text' value='#{gname}' size='10' />",
            "fill": []
        },
        {
            "name": "gbarcode",
            "type": true,
            "class": "barcode",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtbarcode_#{index}' type='text' value='#{gbarcode}' size='10' />",
            "dattr": []
        },
        {
            "name": "gspec",
            "type": true,
            "class": "spec",
            "template": "<span class='align-center' id='rtspec_#{index}'>#{gspec}</span>",
            "dattr": []
        },
        {
            "name": "gunit",
            "type": true,
            "class": "spec",
            "template": "<span class='align-center' id='rtunit_#{index}'>#{gunit}</span>",
            "dattr": []
        },
        {
            "name": "total",
            "type": true,
            "class": "num",
            "template": "<input class='f-input-goodname' index='#{index}' id='rttotal_#{index}' onkeyup='priceOnChange(#{index},2)' type='text' value='#{total}' size='10' maxlength='10' />",
            "dattr": []
        },
        {
            "name": "volume",
            "type": true,
            "class": "num",
            "template": "<input class='f-input-goodname' index='#{index}' id='rtvolume_#{index}' onkeyup='priceOnChange(#{index},3)' type='text' value='#{volume}' size='10' maxlength='10' />",
            "dattr": []
        }
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
    });$("input[id*='rtname_']").each(function () {
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
    var sid = $("#store").val();
    if (sid == -1 || sid == "-1") {
        runnerAlert("操作提示", "请选择仓库");
        return false;
    }
    var list = [];
    var searchVal = $.trim(val);
    if (searchVal != null && searchVal != "undefined" && searchVal != "" && searchVal.length > 0) {
        if ($(parent.context).attr('id').indexOf('rtcode') == 0) { //编码
            if (searchVal.length < CODE_LENGTH_MIN || searchVal.length > CODE_LENGTH_MAX) return false;
        }
        var params = {
            //"in_sid": sid,
            "sid": sid,
            //"old_price": 1,
        };
        var send = true;
        if ($(parent.context).attr('id').indexOf('rtbarcode') == 0){
            params['barcodes'] = searchVal;
            if (searchVal.length < BARCODE_LENGTH_MIN || searchVal.length > BARCODE_LENGTH_MAX) send = false;
        } else {
            params['search'] = searchVal;
        }
        if (send){

            var res = checkRes.findGoodsInventory(1, autoCompletePageNum, params);
            if (res != null && res.data != null && res.data.length > 0) {
                tempData = res.data;
                var index = parent.attr("index");
                //console.log(index);
                for (var i = 0; i < tempData.length; i++) {
                    list[i] = "<li class='td-tr' sid='" + tempData[i].gid + "'  onclick='selectLiItem(" + index + "," + i + ",\"" + divID + "\")' >" + "<span class='td item-code'>[" + tempData[i].gbarcode + "]</span> <span class='td item-gname'>" + tempData[i].gname + "</span></li>";
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
            "gbarcode": fieldNull(tempData[tempIndex].gbarcode),
            "gname": tempData[tempIndex].gname,
            "gcode": tempData[tempIndex].gcode,
            "bname": fieldNull(tempData[tempIndex].gbname),
            "tname": fieldNull(tempData[tempIndex].gtname),
            "gspec": tempData[tempIndex].gspec,
            "gunit": tempData[tempIndex].gunit,
            "price": tempData[tempIndex].price,
            "total": '',
            "volume": '', //箱数
            "amount_price": 0,
            "tax_price": fieldNull(tempData[tempIndex].tax_price, 0), //税额
            "outtax_price": fieldNull(tempData[tempIndex].outtax_price, 0), //去税金额
            "tax_rate": fieldNull(tempData[tempIndex].gtax_rate, 0) * 100, //税率
            "reserve": tempData[tempIndex].reserve,
        };
        var idx = index;
        $("#frimOfferList").runnerTableAppend(idx, appendData, bindAutoComplete);
        $("#rttotal_" + idx).focus();
    }
    $("#" + divID).toggle();
}

/**
 * 获取清单列表
 */
function getTableData() {
    var goodList = [];
    //有gid时(页面输入),使用gid
    var i = 0;
    $('input[id*="hiddengid_"]').each(function () {
        var gid = $(this).val();
        if (gid != null && gid != 'undefined' && gid.length > 0) {
            var index = $(this).attr("id").substring(10, $(this).attr("id").length);
            var total = $("#rttotal_" + index).val();
            goodList[i] = {
                "gid": gid,
                "total": total,
            };
            i++;
        }
    });
    //没有gid时(通过导入文件方式),使用barcode
    if (!goodList.length){
        i = 0;
        $('input[id*="rtbarcode_"]').each(function () {
            var barcode = $(this).val();
            if (barcode != null && barcode != 'undefined' && barcode.length > 0) {
                var index = $(this).attr("index");
                var total = $("#rttotal_" + index).val();
                goodList[i] = {
                    "gbarcode": barcode,
                    "total": total,
                };
                i++;
            }
        });
    }
    return goodList;
}

/**
 * 判断该仓库是否存在帐盘
 */
function checkStoreIsForAccountSet() {
    var sid = $("#store").val();
    var res = checkRes.checkStoreIsHaveFirmOffer(sid);
    if (res){
        //console.log(res);
        $("#sys_id").html(res.id);
    }
    return false;
}
/*----------------------------------------------------华丽的分隔线--------------------------------------------------------*/


/**
 * 载入盘点文件
 * @param data
 */
function frimOfferFile(data) {
    if(data) {
        //console.log(data);
        //1.把要查询的商品条码放到集合里(去重)
        var err = false;
        var barcodes_obj = {}; //集合
        var barcodes_arr = []; //数组
        for (var i in data){
            if ($.trim(data[i]) != ''){
                var line = data[i].split(',');
                if (!line[0] || line[0].length < BARCODE_LENGTH_MIN || line[0].length > BARCODE_LENGTH_MAX){ //该行数据非法
                    err = true;
                    break;
                } else { //该行数据正确
                    barcodes_obj[parseInt(line[0])] = true;
                    barcodes_arr.push({
                        'barcode': parseInt(line[0]),
                        'total': line[1] ? parseInt(line[1]) : 1,
                    });
                }
            }
        }
        //2.把条码拼装成,号分割的参数
        var num = 0;
        var barcodes = '';
        for (var barcode in barcodes_obj){
            barcodes += barcode + ',';
            ++num;
        }
        //3.批量查询条码对应的商品信息
        if (err){
            alert('文件中存在非法条码,请修正后重新导入'); //此处请使用原生弹窗!!!
        } else if (barcodes == ''){
            alert('文件内容不正确,请检查'); //此处请使用原生弹窗!!!
        } else {
            var storein = $("#store").val();
            var params = {
                //"in_sid": storein,
                "sid": storein,
                "barcodes": barcodes,
                //"old_price": 1,
            };
            var goods;
            var res = checkRes.findGoodsInventory(1, num, params);
            if (res != null && res.data != null && res.data.length > 0) {
                goods = res.data;
            } else {
                alert('没有查询到相应的商品信息'); //此处请使用原生弹窗!!!
            }
        }
        //4.组织信息(大包装时数量要乘以规格),填充到table中
        if (goods){
            var goods_list = [];
            for (var i in barcodes_arr){
                for (var j in goods){
                    //遍历商品信息,找到该条码对应的信息
                    if (goods[j]['barcode2'] == barcodes_arr[i]['barcode'] || goods[j]['gbarcode'] == barcodes_arr[i]['barcode']) {
                        //拼装
                        var item = {
                            'gcode':goods[j]['gcode'],
                            'gname':goods[j]['gname'],
                            'gunit':goods[j]['gunit'],
                            'gspec':goods[j]['gspec'],
                            'gbarcode':goods[j]['gbarcode'],
                        };
                        if (goods[j]['isbig'] == 1) { //大包装
                            item['total'] = barcodes_arr[i]['total'] * goods[j]['gspec'];
                            item['volume'] = barcodes_arr[i]['total'];
                        } else { //小包装
                            item['total'] = barcodes_arr[i]['total'];
                            item['volume'] = (barcodes_arr[i]['total'] / goods[j]['gspec']).toFixed(4);
                        }
                        goods_list.push(item);
                        break;
                    }

                }
            }
            $("#frimOfferList").runnerTableOnStart(opts, goods_list, bindAutoComplete);

        }

    }

    $('#file').val(''); //允许载入同一个文件
}

/**
 * 载入盘点文件
 * @param data

function frimOfferFile(data) {
    if(data) {
        //console.log(data);
        var data_err = '';
        var goods_list = [];
        for (var i in data){
            if ($.trim(data[i]) != ''){
                var line = data[i].split(',');
                if (!line[0]){ //该行数据非法
                    data_err += data[i] + "\n"; //换行符
                } else { //该行数据正确
                    var barcode = parseInt(line[0]);
                    var total = line[1] ? parseInt(line[1]) : 1;
                    var item = {
                        'gcode':'',
                        'gname':'',
                        'gunit':'',
                        'gspec':'',
                        'gbarcode':barcode,
                        'total':total,
                        'volume':'',
                    };
                    //console.log(barcode, total);
                    goods_list.push(item);
                }
            }
        }
        if (data_err != ''){
            data_err = '文件中存在以下错误格式数据,请修正后重新导入:\n' + data_err;
            alert(data_err); //此处请使用原生弹窗!!!
        } else if (goods_list.length){
            $("#frimOfferList").runnerTableOnStart(opts, goods_list, bindAutoComplete);
        }
    }
}

 */



/*----------------------------------------------------华丽的分隔线--------------------------------------------------------*/


var currentId = 0;

/***
 * 创建实盘单
 */
$(function () {
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");


    if (msg != null) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name); //默认填单人
        bindSelfStore("store"); //绑定仓库
        $("#store").prepend("<option value='-1'>- 请选择仓库 -</option>");

        $('#file').click(function(){
            if ($("#store").val() == '-1'){
                runnerAlert("操作提示", "请先选择仓库");
                return false;
            }
        });
    }


    //读取并填充信息(共用)
    if (id != null && id != "undefined") {
        currentId = id;
        $("#checkId").html(currentId);
        $("#createFrimOffer").toggle();
        $("#checkFrimOffer").toggle();
        var data = checkRes.findFirmOfferById(id);
        if (data != null) {
            //填充数据
            $('#btn-list').click(function(){
                openParentForFrame('实盘单','/mainframe/check/firmOffer.html?option='+data.status, 733);
            });
            $("#sys_id").html(data.sys_id);
            $("#cuname").html(data.cuname);
            $("#createtime").html(data.createtime);
            $("#checktime").html(data.checktime);
            $("#store").val(data.sid);
            $("#store").attr("disabled", "disabled");
            if (data.goods_list != null && data.goods_list.length) {
                for (var i = 0; i < data.goods_list.length; i++) {
                    data.goods_list[i]['volume'] = (data.goods_list[i]['total'] / data.goods_list[i]['gspec']).toFixed(4);
                }
                //console.log(data.goods_list);
                $("#frimOfferList").runnerTableOnStart(opts, data.goods_list, bindAutoComplete);
            }
        }
    }

    //新建
    if (action == null || action == 'undefined') {
        $('#btn-print').remove();
        $('#btn-list').click(function(){
            openParentForFrame('实盘单','/mainframe/check/firmOffer.html?option=1', 733);
        });
        $('#div-loadFile').show();
        //如果已有录入数据,则提示
        $('#file').click(function(){
            var flag = $('tbody tr').eq(0).find('.barcode input').val();
            if (flag){
                alert('警告:导入后会覆盖本页面已录入数据!'); //此处请使用原生弹框!!!
            }
        });
        $("#frimOfferList").runnerTableOnStart(opts, null, bindAutoComplete);
    }
    //审核
    else if (action == "ch") {
        $("#createFrimOffer").hide();
        $("#checkFrimOffer").show();
        $("#lookup").hide();
    }
    //查看
    else {
        $("#createFrimOffer").hide();
        $("#checkFrimOffer").hide();
        $("#lookup").show();
        $("input").attr('disabled', 'disabled');
    }

    //使用插件优化上传按钮UI
    $("#file").bootstrapFileInput();
    //按钮权限
    if (!checkPower(12102)) {}
});

/*----------------------------------------------------华丽的分隔线--------------------------------------------------------*/



/**
 * 创建一个实盘单
 */
function createFirmOffer(submitStatus) {

    var sid = $("#store").val();
    if (sid == -1 || sid == "-1") {
        runnerAlert("操作提示", "请选择仓库");
        return false;
    }

    var good_list = getTableData();
    if (good_list == null || good_list == "" || good_list.length <= 0) {
        runnerAlert("操作提示", "无实盘信息");
    } else {
        var memo = $("#memo").val();
        var postData = {
            "sid": sid,
            "goods_list": JSON.stringify(good_list),
            "memo": memo
        };
        var res = null;
        if (submitStatus == 1 || submitStatus == "1") //保存实盘
        {
            res = checkRes.createFirmOffer(postData);
        }
        else if (submitStatus == 2 || submitStatus == "2")
        {
            res = checkRes.createAndCheckFrimOffer(postData); //保存并审核实盘
        }
        if (res != null) {
            noticeFrame(733, 'refrush');
            runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/check/createFirmOffer.html?iframeid=73&iframename=" + encodeURI("新建实盘单"));
        }
    }
}

/**
 * 审核一个实盘单
 */
function checkFirmOffer() {
    var sid = $("#store").val();
    if (sid == -1 || sid == "-1") {
        runnerAlert("操作提示", "请选择仓库");
        return false;
    }
    var good_list = getTableData();
    if (good_list == null || good_list == "" || good_list.length <= 0) {
        runnerAlert("操作提示", "无实盘信息");
    } else {
        var memo = $("#memo").val();
        var postData = {
            "sid": sid,
            "goods_list": JSON.stringify(good_list),
            "memo": memo
        };
        var res = checkRes.checkFirmOffer(currentId, postData);
        if (res != null) {
            noticeFrame(733, 'refrush');
            runnerConfirem("操作提示", "审核通过");
        }
    }
}

