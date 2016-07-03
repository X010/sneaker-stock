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
        //bindCustom("custom");
        //$("#custom").prepend('<option value="">- 全部 -</option>');
        //$("#custom").val(getUrlParam("custom"));
        //bindSelfUser('suid'); //采购员
        //$("#suid").prepend('<option value="">- 全部 -</option>');
        //$("#suid").val(getUrlParam("suid"));
        bindSelfStore("store");
        $("#store").prepend('<option value="-1" selected>- 未分配 -</option>');
        $("#store").prepend('<option value="">- 全部 -</option>');
        $("#sorderid").val(getUrlParam("sorderid"));

        bindOrderRankSelect("rank", '');
        $("#rank").prepend('<option value="" selected>- 全部 -</option>');
        bindAutoCompleteCommon('customName', 'customer');
        //bindAutoCompleteCommon('suname', 'user');
        bindAutoCompleteCommon('search_goods', 'goods');
        refrush(currentPage);
    }

});

function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        var data = stockRes.findOrderOutForCustomService(currentPage, defaultPageNum, params);
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
    //if ($("#suid").val()) params['suid'] = $("#suid").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
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
            var tableContent = "<tr ondblclick='openParentForFrame(\"" +simpleBillNo(data[i].id, "分配")  + "\",\"/mainframe/service/modifyOrderThelibrary.html?page=" + currentPage + "&action=up&orderId=" + data[i].id + "\","+data[i].id+"1);'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].mall_orderno) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].in_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].out_sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOrderRankListwithColor, data[i].rank) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(orderFromList, data[i].from) + "</div></td>";
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
