var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var status = 2;

var currentPage;

/**
 * 加载出货订单列表
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    $("#begin_date").change(function(){
        refrush();
    }).val(GetDateStr(-days_view));
    $("#end_date").change(function(){
        refrush();
    }).val(GetDateStr(0));

    if (msg != null) {
        //msg = JSON.parse(msg);
        bindSelfStore("store");
        $("#store").prepend('<option value="-1">- 未分配 -</option>');
        $("#store").prepend('<option value="" selected>- 全部 -</option>');
        $("#sorderid").val(getUrlParam("sorderid"));

        bindOrderRankSelect("rank", '');
        $("#rank").prepend('<option value="" selected>- 全部 -</option>');
        bindAutoCompleteCommon('customName', 'customer');
        bindAutoCompleteCommon('suname', 'user');
        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }

    fixTables();

});

function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        var data = stockRes.findOrderOutForCustomRevisit(currentPage, defaultPageNum, params);
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, currentPage, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}


function buildParams(){
    var params = {};
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#rank").val()) params['rank'] = $("#rank").val();
    if ($("#store").val()) params['out_sid'] = $("#store").val();
    if ($("#custom").val()) params['in_cid'] = $("#custom").val();
    if ($("#suid").val()) params['suid'] = $("#suid").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    if ($("#out_status").val()) params['out_status'] = $("#out_status").val();
    if ($("#visit_status").val()) params['visit_status'] = $("#visit_status").val();
    if ($("#belong").val()) params['belong'] = $("#belong").val();
    //console.log(params);
    return params;
}

/**
 * 绑定表格数据
 * @param data
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#outOrderList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            //var tableContent = "<tr ondblclick='revisitOrder("+data[i].id+","+data[i].in_cid+",\""+data[i].in_cname+"\");'>";
            var tableContent = "<tr ondblclick='viewOrder("+data[i].id+");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].mall_orderno) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].in_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].contactor_phone, '无') + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].out_sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            //tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOrderRankListwithColor, data[i].rank) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(orderFromList, data[i].from) + "</div></td>";
            tableContent += "<td class=''><button type='button' class='btn btn-primary btn-sm' onclick='revisitOrder("+data[i].id+","+data[i].in_cid+",\""+data[i].in_cname+"\");'> 回访 </button></td>";
            tableContent += "</tr>";
            $("#outOrderList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#outOrderList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}

/**
 * 操作-查看
 * @param order_id
 */
function viewOrder(order_id){
    var name = simpleBillNo(order_id, "查看");
    var url = "/mainframe/sale/createThelibrary.html?page=" + currentPage + "&action=cso&disable=1&orderId=" + order_id;
    var id = order_id;
    openParentForFrame(name, url, id);
}

/**
 * 操作-回访
 * @param order_id
 * @param in_cid
 * @param in_cname
 */
function revisitOrder(order_id, in_cid, in_cname){
    var name = simpleBillNo(order_id, "回访");
    var url = "/mainframe/service/saveRecord.html?page=" + currentPage + "&action=create&order_id=" + order_id + "&type=2&ccid=" + in_cid + "&ccname=" + in_cname;
    var id = order_id + '2';
    openParentForFrame(name, url, id);
}