var goodsRes = new restGoodsRepository();
var edit = 0;
var page;
var storeCount = 0;
var globalGid = 0;

var gtids; //商品的分类ID路径

function modifyGoodsType(){
    var setting = {
        edit:{
            enable: false //不允许编辑
        },
        callback:{
            onClick: zTreeOnClick
        }
    };

    $('#btn-modifyGoodsType').hide();
    $('#btn-saveGoodsType').show();
    $('#goodsCateTree').show().treeGoods(setting, gtids);
}

function saveGoodsType(){
    if (updateGoodsType()){
        $('#goodsCateTree').hide();
        $('#btn-modifyGoodsType').show();
        $('#btn-saveGoodsType').hide();
    }

}

/**
 * 点击分类
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
    //console.log(treeNode);
    if (!treeNode.children || !treeNode.children.length) {
        $('#gtid').val(treeNode.id);
        $('#tname').val(treeNode.name);
    } else {
        var treeObj = $.fn.zTree.getZTreeObj("goodsCateTree");
        treeObj.cancelSelectedNode(treeNode);
    }
}


/* ----------------------------------------------- 分割线儿 ------------------------------------------------- */



/**
 * 添加供应商
 */
function addSupplierForGoods() {
    $('#btn-addSupplier').attr('disabled', 'disabled');
    var index = $("#goodsSupplier tbody tr").length + 1;
    //$("#goodsSupplier tbody").append("<tr><td><select class='form-control input-sm' id='supperListIndex_" + index + "'></select></td><td><button class='btn btn-sm btn-primary' onclick='saveSupplierForGoods(" + index + ")'> 保存 </button> <button class='btn btn-sm btn-default' onclick='cancelAddSupplierForGoods();'>取消</button></td></tr>");
    //bindSupplier("supperListIndex_" + index);
    $("#goodsSupplier tbody").append("<tr><td><input id='supplierName' type='text' class='form-control' /><input id='supplier' type='hidden' value='' /></td><td><button class='btn btn-sm btn-primary' onclick='saveSupplierForGoods()'> 保存 </button> <button class='btn btn-sm btn-default' onclick='cancelAddSupplierForGoods();'>取消</button></td></tr>");
    bindAutoCompleteCommon('supplierName', 'supplier', false);
}

/**
 * 取消添加供应商
 */
function cancelAddSupplierForGoods(){
    $('#btn-addSupplier').removeAttr('disabled');
    $('#goodsSupplier tbody tr').last().remove();
    initAutoCompleteOfSupplier = true;
}


/**
 * 删除商品供应商
 * @param id
 */
function deleteSupplierForGoods(id) {
    var res = goodsRes.deleteSupplierForGoods(id);
    if (res != null) {
        window.location.reload();
    }
}

/**
 * 保存商品供应商数据
 * @param index
 */
function saveSupplierForGoods(index) {
    //var supplierId = $("#supperListIndex_" + index).val();
    if (!checkAutoComplete(null, "supplier")) return false;
    var supplierId = $("#supplier").val();
    var goodId = globalGid;
    //保存数据
    var data = {
        "gid": goodId,
        "scid": supplierId
    };

    var res = goodsRes.addSupplierForGoods(data);
    if (res != null) {
        window.location.reload();
    }
}




/**
 * 初始数据信息
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    bindAutoCompleteCommon('name', 'goods');
    $('body').click(function(){
        if ($("#name_old").val() != $.trim($("#name").val()) && $('#goods_id').val()){
            $('#name_error').html('商品已存在');
        } else {
            $('#name_error').html('');
        }
    });
    bindBusinessPracticeSelect('business');
    bindAutoCompleteCommon('bname', 'brand');

    if (action == 'new') {
        //新建
    } else {
        //更新
        edit = id;
        //var vf = goodsRes.findGoodsById(id);
        var vf = goodsRes.findCompanyGoodsById(edit);
        globalGid = vf.gid;
        var goodsById = vf.goods;
        if (goodsById != null) {
            //填充数据
            $("#currentGid").val(goodsById.id);
            $("#trademark").val(goodsById.trademark);
            $("#isbind").val(goodsById.isbind);
            $("#ispricetype").val(goodsById.price_type);
            $("#validperiod").val(goodsById.valid_period);
            $("#shippingprice").val(goodsById.shipping_price);
            $("#pkgspec").val(goodsById.pkgspec);
            $("#place").val(goodsById.place);
            $("#factory").val(goodsById.factory);

            //加载供应商信息
            var supperList = vf.goods_supplier;
            if (supperList != null) {
                for (var i = 0; i < supperList.length; i++) {
                    $("#goodsSupplier tbody").append("<tr><td>" + supperList[i].scname + "</td><td><button name='deleteSupplierForGoods' class='btn btn-danger btn-sm' onclick='deleteSupplierForGoods(" + supperList[i].id + ")'>移除</button></td></tr>");
                }
            }
            //商品基础信息
            $("#barcode").val(vf.gbarcode);
            $("#bcTarget").barcode(vf.gbarcode, "ean13", {barWidth: 2, barHeight: 30});
            $("#code").val(vf.gcode);
            $("#name").val(vf.gname);
            $("#name_old").val(vf.gname);
            //经营方式
            $("#business").val(vf.business);
            //公司商品属性
            $("#weight").val(fieldNull(vf.weight)); //箱重
            $("#tname").val(vf.gtname);
            $("#gtid").val(vf.gtid);
            $("#spec").val(vf.gspec);
            $("#unit").val(vf.gunit);
            $("#taxrate").val(vf.gtax_rate);
            $("#bname").val(vf.gbname);
            $("#bid").val(vf.gbid);


            gtids = vf.gtids;

            if (vf.limit_buy == 1){
                $('#btndiv-buyOff').show();
                $('#btndiv-buyOn').hide();
            } else if (vf.limit_buy == 2){
                $('#btndiv-buyOff').hide();
                $('#btndiv-buyOn').show();
            }

            //按钮权限
            if (!checkPower(10602)) {
                $('#btn-addSupplier').remove();
            }
            if (!checkPower(10607)) {
                $('#goodsSupplier button[name="deleteSupplierForGoods"]').remove();
            }
            if (!checkPower(10603)) {
                $('#power-10603-1').remove();
                $('#power-10603-2').remove();
                $('#btn-weight').remove();
                $('#weight').attr('disabled', 'disabled');
            }
            if (!checkPower(10604)) {
                $('#btndiv-buyOff').remove();
            }
            if (!checkPower(10605)) {
                $('#btndiv-buyOn').remove();
            }
            if (!checkPower(10606)) {
                $('#btndiv-del').remove();
            }
        }
    }
});

/* ----------------------------------------------- 分割线儿 ------------------------------------------------- */


/**
 * 保存数据
 */
function save() {
    var name = $.trim($("#name").val());
    if (!name){
        runnerAlert("操作提示", '请填写商品名称');
        return false;
    } else {
        if ($("#name_old").val() != name && $('#goods_id').val()){
            runnerAlert("操作提示", '该商品已存在');
            return false;
        }
    }
    var barcode = $.trim($("#barcode").val());
    if (barcode.length != 13){
        runnerAlert("操作提示", '商品条码必须是13位');
        return false;
    }
    var business = $("#business").val();
    if (!business){
        runnerAlert("操作提示", '请选择经营方式');
        return false;
    }
    var weight = $.trim($("#weight").val());
    var gtid = $("#gtid").val();
    if (!gtid){
        runnerAlert("操作提示", '请选择商品分类');
        return false;
    }
    var tax_rate = $.trim($("#taxrate").val());
    if (!tax_rate){
        runnerAlert("操作提示", '请填写税率');
        return false;
    }
    var unit = $.trim($("#unit").val());
    if (!unit){
        runnerAlert("操作提示", '请填写单位');
        return false;
    }
    var spec = $.trim($("#spec").val());
    if (!spec || !parseInt(spec)>0){
        runnerAlert("操作提示", '请填写规格');
        return false;
    }
    var bname = $.trim($("#bname").val());
    if (!bname){
        runnerAlert("操作提示", '请指定品牌');
        return false;
    }
    var bid = $("#bid").val();
    var factory = $("#factory").val();
    var place = $("#place").val();

    var postData;
    var sres;
    postData = {
        "gname": name,
        "gbarcode": barcode,
        "business": business,
        "weight": weight,
        "gtax_rate": tax_rate,
        "gunit": unit,
        "gtid": gtid,
        "gbid": bid,
        "gspec": spec,
        "gbname": bname,
        "factory": factory,
        "place": place,
    };

    sres = goodsRes.editCompanyGoods(edit, postData);
    if (sres != null) {
        noticeFrame(44, 'refrush', page);
        runnerConfirem('操作提示', '修改成功');
    }

}

/**
 * 删除仓库商品
 */
function deleteStoreGoods() {
    if (confirm("确定删除该商品?")) {
        if (edit) {
            var sres = goodsRes.deleteStoreGoods(edit);
            if (sres != null) {
                noticeFrame(44, 'refrush', page);
                runnerConfirem("操作提示", "删除成功");
            }
        }
    }
}

/**
 * 停用仓库商品
 */
function buyOffStoreGoods() {
    if (confirm("确定停止采购该商品?")) {
        if (edit) {
            var sres = goodsRes.buyOffStoreGoods(edit);
            if (sres != null) {
                noticeFrame(44, 'refrush', page);
                var iframeid = getUrlParam("iframeid");
                var iframename = getUrlParam("iframename");
                var url = '/mainframe/baseinfo/saveGoods.html?action=edit&id=' + edit + '&iframeid=' + iframeid + '&iframename=' + iframename;
                runnerConfiremUrl("操作提示", "停用成功", false, url);
            }
        }
    }
}

/**
 * 启用仓库商品
 */
function buyOnStoreGoods() {
    if (confirm("确定开启采购该商品?")) {
        if (edit) {
            var sres = goodsRes.buyOnStoreGoods(edit);
            if (sres != null) {
                noticeFrame(44, 'refrush', page);
                var iframeid = getUrlParam("iframeid");
                var iframename = getUrlParam("iframename");
                var url = '/mainframe/baseinfo/saveGoods.html?action=edit&id=' + edit + '&iframeid=' + iframeid + '&iframename=' + iframename;
                runnerConfiremUrl("操作提示", "启用成功", false, url);
            }
        }
    }
}

/**
 * 修改商品分类
 */
function updateGoodsType() {
    var gtid = $("#gtid").val();
    var sres;
    if (gtid) {
        var postData = {
            "gtid": gtid,
        };
        sres = goodsRes.editCompanyGoods(edit, postData);
        if (sres != null) {
            noticeFrame(44, 'refrush', page);
        }
    }
    return sres;
}

/**
 * 修改商品箱重
 */
function saveGoodsWeight() {
    var weight = $.trim($("#weight").val());
    var sres;
    if (weight) {
        var postData = {
            "weight": weight,
        };
        sres = goodsRes.editCompanyGoods(edit, postData);
        if (sres != null) {
            runnerAlert('操作提示', '箱重修改成功');
            noticeFrame(44, 'refrush', page);
        }
    }
    return sres;
}

/**
 * 修改商品经营方式
 */
function saveGoodsBusiness() {
    var business = $.trim($("#business").val());
    var sres;
    if (business) {
        var postData = {
            "business": business,
        };
        sres = goodsRes.editCompanyGoods(edit, postData);
        if (sres != null) {
            runnerAlert('操作提示', '经营方式修改成功');
            noticeFrame(44, 'refrush', page);
        }
    }
    return sres;
}