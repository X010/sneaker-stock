var goodsRes = new restGoodsRepository();
var supplierRes = new supplierRepository();
var storeRes = new restStoreRepository();
var goodsTypeRes = new goodsTypeRepository();

var in_sid = 0;
var option;
var currentPage;

var node_id; //要查询的分类ID
var show_addbtn; //是否可以在该分类添加商品

/**
 * 点击分类(查询该分类商品)
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
    show_addbtn = !!(!treeNode.children || !treeNode.children.length);
    node_id = treeNode.id;
    refrush();
}

function showGoodsType(){
    $('#initGoodsType').hide();
    $('#goodsCateTree').show();
    $('#power-10505').show();
}

function copyGoodsType(){
    var res = goodsTypeRes.copySystemType();
    //console.log(res);
    if (res != null) {
        buildTree();
    }
}


function flushType(){
    if (confirm("确定清空所有商品分类?")) {
        var res = goodsTypeRes.flushType();
        if (res != null) {
            buildTree();
        }
    }
}

function buildTree(){
    var setting = {
        view:{},
        edit:{
            enable: true //允许编辑
        },
        callback:{
            onClick: zTreeOnClick
        }
    };
    //分类操作按钮权限
    if (!checkPower(10501)) {
        setting.view.addHoverDom = false;
    }
    if (!checkPower(10502)) {
        setting.edit.showRemoveBtn = false;
    }
    if (!checkPower(10503)) {
        setting.edit.showRenameBtn = false;
    }
    var treeObj = $('#goodsCateTree').treeGoods(setting);
    if (!treeObj.getNodes()[0].isParent){
        //init
        $('#goodsCateTree').hide();
        var html = '';
        html += '<div class="alert alert-warning" role="alert">该公司未建立商品分类,可选择自建或导入系统分类</div>';
        html += '<button class="btn btn-block btn-primary" id="newGoodsType" onclick="showGoodsType()"><i class="fa fa-wrench"></i> 自建商品分类</button>';
        html += '<button class="btn btn-block btn-primary" id="copyGoodsType" onclick="copyGoodsType()"><i class="fa fa-sign-in"></i> 导入系统分类</button>';
        $('#initGoodsType').html(html).show();
        $('#power-10505').hide();
    } else {
        showGoodsType();
    }

    if (!checkPower(10501)) {
        $('#newGoodsType').attr('disabled', 'disabled');
    }
    if (!checkPower(10504)) {
        $('#copyGoodsType').attr('disabled', 'disabled');
    }
}


//弹框中用到
var treeObjInBox;
var node_id_box; //要查询的分类ID
/**
 * 导入商品弹框 点击分类(查询该分类商品)
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClickInBox(event, treeId, treeNode) {
    node_id_box = treeNode.id;
    searchAndFull('pupupContent');
}

/* ------------------------------------------------- 一条华丽丽的分割线儿 --------------------------------------------------- */


/**
 * 商品信息加载
 */
$(function () {
    buildTree();

    //清空分类
    if (!checkPower(10505)){}
    //商品新建
    if (!checkPower(10608)){

    } else {
        $('#power-10608').click(function(){
            openParentForFrame('新建商品', '/mainframe/baseinfo/createGoods.html', 444);
        });
    }

    option = getUrlParam("option");
    var currentPage = getUrlParam("page");

    /*绑定商品分类列表
    var allGoodsType = goodsRes.findGoodsType();
    if (allGoodsType != null) {
        for (var i = 0; i < allGoodsType.length; i++) {
            //$("#goodTypeSelect").append("<option value='" + allGoodsType[i].code + "'>" + allGoodsType[i].name + "</option>")
            $("#goodTypeSelect").append("<option value='" + allGoodsType[i].id + "'>" + allGoodsType[i].name + "</option>")
        }
    }*/

    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = false;

    $("#search").val(getUrlParam("search"));
    $('#search').keyup(function(event){
        if (event.keyCode == 13){
            refrush();
        }
    });
    $('#esSearch').keyup(function(event){
        if (event.keyCode == 13){
            $('#searchButton').click();
        }
    });

    //var data = goodsRes.findGoodsPrice(currentPage, defaultPageNum, in_sid);
    refrush(currentPage);

    /*
    $("#goodsCateTree").height(function(){
        return $(".goods-container-content").height();
    });
    */


    /*浮层打开和关闭时触发事件*/
    $('#modalImport').on('hide.bs.modal', function () {
        clearStatus();
    }).on('show.bs.modal',function(){
        if (!treeObjInBox){
            var setting = {
                edit:{
                    enable: false //禁止编辑
                },
                callback:{
                    onClick: zTreeOnClickInBox
                }
            };
            treeObjInBox = $('#sysgoodsCateTree').treeGoods(setting, null, 'system');
            searchAndFull('pupupContent');
        }
    });

    if (VERSION_MODE == 'B2C') {
        $('tr[name="tr-b2b"]').remove();
        $('tr[name="tr-b2c"]').show();
    }

    fixTables();

});

function buildParams(){
    var params = {
        'option': option
    };
    if (node_id){
        params['gtid'] = node_id;
        $('#gtid').val(node_id);
        if (show_addbtn){
            $('#btn-addGoods').removeAttr('disabled').removeClass('disabled');
        } else {
            $('#btn-addGoods').attr('disabled','disabled').addClass('disabled');
        }
    } else {
        $('#btn-addGoods').attr('disabled','disabled').addClass('disabled');
    }
    if ($("#search").val()) params['search'] = $("#search").val();
    if ($("#statusNumber").val()) params['limit_buy'] = $("#statusNumber").val();
    //console.log(params);
    return params;
}


/**
 * 搜索商品
 */
function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    var data = goodsRes.findCompanyGoodsByField(currentPage, defaultPageNum, params);
    if (data != null) {
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, currentPage, defaultPageNum, data.count, args);
        }
        else {
            $("#split").html("");
        }
    }
    tableHover();
    //导入商品按钮权限
    if (!checkPower(10601)) {
        $('#btn-addGoods').remove();
    }
}

/**
 * 搜索用

function reload(){
    var querystring = '';
    var params =  buildParams();
    for (var k in params){
        querystring += '&' + k + '=' + params[k];
    }
    //alert("goods.html?page=1" + querystring);
    window.location.href = "goods.html?page=1" + querystring;
    inputFocus();
}
 */

/**
 * 加载商品

function reloadGood() {
    var cid = $("#stores").val();
    in_sid = cid;
    var currentPage = 1;
    window.location.href = "goods.html?insid=" + in_sid + "&page=" + currentPage;

    inputFocus();
}
 */
/**
 * 读取供应商

function findSupplier() {
    return supplierRes.findAll();
}
 */
/**
 * 根据商品选中的供应商获取仓库信息
 * @param id

function findStoreByGoodsSuppilerId(id) {
    return storeRes.findByCid(id);
}
 */




//将数据填充到Table
function fullTable(res) {
    //$("#goods tr:gt(0)").remove();
    $("#goods tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
            var tableContent = "<tr ondblclick='openParentForFrame(\"商品:" + res.data[i].gname + "\",\"/mainframe/baseinfo/saveGoods.html?page=" + currentPage + "&action=edit&id=" + res.data[i].id + "\", \"" + buildTabId('base', 44, res.data[i].id) + "\");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gcode) + "</div></td>";
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(res.data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gunit) + "</div></td>";
            //tableContent += "<td>" + fieldNull(res.data[i].out_cname) + "</td>";
            //tableContent += "<td>" + fieldNull(res.data[i].out_sname) + "</td>";
            //tableContent += "<td>" + fieldNull(res.data[i].barcode) + "</td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gtname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + float2percent(res.data[i].gtax_rate) + "%</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gbname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (res.data[i].limit_buy==1 ? '<span class="status-normal">正常</span>' : '<span class="status-locked">停止采购</span>') + "</div></td>";
            //tableContent += "<td>" + fieldNull(res.data[i].pkgsepc) + "</td>";
            //tableContent += "<td>" + fieldNull(res.data[i].place) + "</td>";
            //tableContent += "<td><a class='btn-small btn-op' href='saveGoods.html?action=edit&id=" + res.data[i].id + "'>查看</a><a href='javascript:deletStoreGoods(" + res.data[i].id + ")' class='btn-small btn-edit' >删除</a> </td>";
            tableContent += "</tr>";
            //$("#goods tr:last").after(tableContent);
            // !importent: fixed for table sorting
            $("#goods tbody").append(tableContent);
        }
    } else {
        $("#goods tbody").empty();
        $("#table-empty").empty().append("该分类还没有添加商品").show();
    }
    formatTDOfRMB();//格式化金额列
}


/**
 * 保存公司商品
 * @param item
 */
function saveCompanyGoods(item) {
    if (item != null && item.length > 0) {
        var postData = {"data": JSON.stringify(item)};
        var sres = goodsRes.addCompanyGoods(postData);
        if (sres != null){
            refrush();
        }
    }
}




/**
 * 删除仓库商品
 * @param id

function deletStoreGoods(id) {
    if (confirm("是否确定删除该商品")) {
        var sres = goodsRes.deleteStoreGoods(id);
        if (sres != null)
            window.location.href = "goods.html?insid=" + in_sid;
    }
}
 */

/**
 * 保存商品价格
 * @param item

function saveGoodsPrice(item) {
    if (item != null && item.length > 0) {
        var postData = {"data": JSON.stringify(item)};
        var sres = goodsRes.addGoodsPrice(postData);
        if (sres != null)
            window.location.href = "goods.html?insid=" + in_sid;
    }
} */


//支持表格排序
/**$().ready(function () {
        //$("#store").tablesorter(); 
        $("#goods").tablesorter(
            {
                headers: {
                    1: {sorter: false},
                    8: {sorter: false}
                }
            });
    }
 ); **/




