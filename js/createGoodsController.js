var goodsRes = new restGoodsRepository();

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


//var supplierNum = 0;
/**
 * 添加供应商

function addSupplierForGoods() {
    ++supplierNum;
    //$("#goodsSupplier tbody").append("<tr><td><input id='supplierName' type='text' class='form-control' /><input id='supplier' type='hidden' value='' /></td><td><button class='btn btn-sm btn-primary' onclick='saveSupplierForGoods()'> 保存 </button> <button class='btn btn-sm btn-default' onclick='cancelAddSupplierForGoods();'>取消</button></td></tr>");
    $("#goodsSupplier tbody").append("<tr><td><input id='supplierName_"+supplierNum+"' name='supplierName' type='text' class='form-control' /><input id='supplier' type='hidden' value='' /></td><td><button class='btn btn-default' onclick='cancelAddSupplierForGoods(this);'>移除</button></td></tr>");
    bindAutoCompleteCommon('supplierName_'+supplierNum, 'supplier', false);
} */

/**
 * 取消添加供应商

function cancelAddSupplierForGoods(btn){
    $(btn).parent().parent().remove();
}*/

/* ----------------------------------------------- 分割线儿 ------------------------------------------------- */


/**
 * 初始数据信息
 */
$(function () {
    if (VERSION_MODE == 'B2C') {
        $('li[name="li-b2c"]').show();
        $('li[name="li-b2b"]').remove();
    }

    bindAutoCompleteCommon('name', 'goods');
    $('body').click(function(){
        if ($('#goods_id').val()){
            $('#name_error').html('商品已存在');
        } else {
            $('#name_error').html('');
        }
    });
    bindAutoCompleteCommon('supplierName', 'supplier', false);
    bindBusinessPracticeSelect('business');
    //bindGoodsBrand('bid');
    //$('#bid').prepend('<option value="">- 请选择 -</option>');
    bindAutoCompleteCommon('bname', 'brand');
    modifyGoodsType(); //展示分类树
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
        if ($('#goods_id').val()){
            runnerAlert("操作提示", '该商品已存在');
            return false;
        }
    }
    var barcode = $.trim($("#barcode").val());
    if (isNaN(barcode)){
        runnerAlert("操作提示", '请填写商品条码');
        return false;
    } else if (barcode.toString().length != 13){
        runnerAlert("操作提示", '商品条码必须为13位');
        return false;
    }
    var out_cid = $("#supplier").val();
    if (!checkAutoComplete(null, 'supplier')) return false;
    if (!out_cid){
        runnerAlert("操作提示", '请指定供应商');
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
    var unit = $.trim($("#unit").val());
    if (!unit){
        runnerAlert("操作提示", '请填写计量单位');
        return false;
    }
    var tax_rate = $.trim($("#tax_rate").val());
    if (!tax_rate){
        runnerAlert("操作提示", '请填写税率');
        return false;
    }
    var spec = parseInt($("#spec").val());
    if (!spec || isNaN(spec)){
        runnerAlert("操作提示", '请填写规格');
        return false;
    }
    var bname = $.trim($("#bname").val());
    if (!bname){
        runnerAlert("操作提示", '请指定品牌');
        return false;
    }
    var bid = $("#bid").val();
    var factory = $.trim($("#factory").val());
    var place = $.trim($("#place").val());

    var in_price = $.trim($("#in_price").val());
    var out_price1 = $.trim($("#out_price1").val());
    var out_price2 = $.trim($("#out_price2").val());
    var out_price3 = $.trim($("#out_price3").val());
    var out_price4 = $.trim($("#out_price4").val());
    if (!in_price || !out_price1 || !out_price2 || !out_price3 || !out_price4){
        runnerAlert("操作提示", '请完善价格设置');
        return false;
    }

    var postData;
    var sres;
    //新建
    postData = {
        "name": name,
        "barcode": barcode,
        "bid": bid,
        "bname": bname,
        "business": business,
        "weight": weight,
        "spec": spec,
        "unit": unit,
        "tax_rate": tax_rate,
        "gtid": gtid,
        "out_cid": out_cid,
        "in_price": num2price(in_price),
        "out_price1": num2price(out_price1),
        "out_price2": num2price(out_price2),
        "out_price3": num2price(out_price3),
        "out_price4": num2price(out_price4),
        "factory": factory,
        "place": place,
    };
    //如果不允许使用导入功能,则直接强制添加
    if (!IMPORT_GOODS_FROM_PLATFORM){
        postData['force'] = 1;
    }
    sres = goodsRes.add(postData);
    if (sres != null) {
        if (sres.id == 0){ //系统商品库中已存在
            if (VERSION_TYPE == 1){
                /**
                 * 平台版本禁止添加重复商品
                 */
                runnerAlert('操作提示', '该商品['+barcode+']已存在于平台商品库，请使用导入功能进行添加');
            } else if (IMPORT_GOODS_FROM_PLATFORM && VERSION_TYPE == 2){
                /**
                 * 售卖版本可通过force=1参数强制添加
                 * 如果允许使用导入功能: 二次提示后再添加
                 * 如果不允许使用导入功能: 直接在第一次提交时就使用force=1进行添加
                 */
                if (confirm("该商品["+barcode+"]已存在于平台商品库，确定新建吗?")) {
                    postData['force'] = 1;
                    sres = goodsRes.add(postData);
                    if (sres != null){
                        noticeFrame(44, 'refrush');
                        runnerConfiremUrl("操作提示", "新建成功", false, "/mainframe/baseinfo/createGoods.html?iframeid=444&iframename=" + encodeURI("新建商品"));
                    }
                }
            }

        } else { //添加成功
            noticeFrame(44, 'refrush');
            runnerConfiremUrl("操作提示", "新建成功", false, "/mainframe/baseinfo/createGoods.html?iframeid=444&iframename=" + encodeURI("新建商品"));
        }
    }

}

