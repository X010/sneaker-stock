var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var returnRes = new returnGoodsRepository();
var status = 2;
var currentPage;

/**
 * 加载数据
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
        msg = JSON.parse(msg);
        //bindCustom("custom");
        //$("#custom").prepend('<option value="">- 全部 -</option>');
        //$("#custom").val(getUrlParam("custom"));
        $("#sorderid").val(getUrlParam("sorderid"));

        bindAutoCompleteCommon('customName', 'customer');
        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = returnRes.findAllReturnOutBill_OUTField(currentPage, defaultPageNum, params);
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = {
                "option": status,
                "custom": typeof(params['out_cid']) == 'undefined' ? '' : params['out_cid'],
                "sorderid": typeof(params['search']) == 'undefined' ? '' : params['search'],
            };
            pageSplitCompent(window.location.pathname, currentPage, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}

function buildParams(){
    var params = {
        'status': status,
    };
    if ($("#custom").val()) params['out_cid'] = $("#custom").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    //console.log(params);
    return params;
}

function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#returngoods_out tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            //var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "客退")  + "\",\"/mainframe/returngoods/createOutReturnGoods.html?action=cc&orderId=" + data[i].id + "\");'>";
            var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "客退")  + "\",\"/mainframe/returngoods/createReturnGoods.html?page=" + currentPage + "&action=cc&orderId=" + data[i].id + "\","+data[i].id+");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].out_cname) + "</div></td>"; //退货客户
            //tableContent += "<td>" + fieldNull(data[i].in_sname) + "</td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>"; //退货人
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].memo) + "</div></td>";
            //tableContent += "<td>" + (data[i].status == 1 ? "未审核" : "已审核") + "</td>";
            //tableContent += "<td><a class='btn-small btn-op' href='javascript:openParentForFrame(\"" + simpleBillNo(data[i].id, "D")  + "\",\"/mainframe/returngoods/createOutReturnGoods.html?action=cc&orderId=" + data[i].id + "\")'>查看</a></td>";
            tableContent += "</tr>";
            $("#returngoods_out tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#returngoods_out tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}

