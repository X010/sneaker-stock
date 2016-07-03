var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();

var status = '';
var currentPage;


/**
 * 加载需要审核的出库单
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var action = getUrlParam("action");
    if (action == null || action == 'undefined')  action = "precheck";
    if (action == 'check') status = 2;
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;
    var settle_status = getUrlParam("settle_status");


    //新建按钮
    if (!checkPower(26)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建出货单', "/mainframe/sale/createThelibrary.html?action=csko&iframeid=26&iframename=" + encodeURI("新建出货单"), 26);
        });
    }

    bindSelfStore("sid");
    $("#sid").prepend('<option value="">- 全部 -</option>');

    //审核时间
    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    var days_begin = getUrlParam("days_begin");
    if (days_begin == null || days_begin == 'undefined') days_begin = GetDateStr(-days_view);
    $("#begin_date").change(function(){
        $("#settle_begin_date").val('');
        $("#settle_end_date").val('');
        refrush();
    }).val(days_begin);
    $("#end_date").change(function(){
        $("#settle_begin_date").val('');
        $("#settle_end_date").val('');
        refrush();
    }).val(GetDateStr(0));

    //结算时间
    $("#settle_begin_date").datepicker();
    $("#settle_end_date").datepicker();
    $("#settle_begin_date").change(function(){
        $("#begin_date").val('');
        $("#end_date").val('');
        refrush();
    }).val('');
    $("#settle_end_date").change(function(){
        $("#begin_date").val('');
        $("#end_date").val('');
        refrush();
    }).val('');

    if (msg != null) {
        msg = JSON.parse(msg);
        //bindCustom("custom");
        //$("#custom").prepend('<option value="">- 全部 -</option>');
        //$("#custom").val(getUrlParam("custom"));
        //bindSelfUser('suid'); //采购员
        //$("#suid").prepend('<option value="">- 全部 -</option>');
        //$("#suid").val(getUrlParam("suid"));
        $("#sorderid").val(getUrlParam("sorderid"));
        bindOutStatusSelect("statusNumber", ",2,3,4,5,6,7,8,9,10,11,12,13,14,");
        $("#statusNumber").prepend('<option value="">- 全部 -</option>');
        $("#statusNumber").val(status);
        $("#settle_status").val(settle_status);

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
    if (1){
        var data = stockRes.findStockOutAllField(currentPage, defaultPageNum, params);
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
    status = $("#statusNumber").val();
    var params = {
        'option': status,
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#settle_status").val()) params['settle_status'] = $("#settle_status").val();
    if ($("#custom").val()) params['in_cid'] = $("#custom").val();
    if ($("#sid").val()) params['sid'] = $("#sid").val();
    if ($("#suid").val()) params['suid'] = $("#suid").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    if ($("#settle_begin_date").val()) params['settle_begin_date'] = $("#settle_begin_date").val();
    if ($("#settle_end_date").val()) params['settle_end_date'] = $("#settle_end_date").val();
    //console.log(params);
    return params;
}

/**
 * 绑定出库单列表
 * @param data
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#theLibrary tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 1 || data[i].status == 2 || data[i].status == 3){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/sale/createThelibrary.html?page=" + currentPage + "&action=csc&orderId=" + data[i].id + "\","+data[i].id+");'>"
            } else if (data[i].status == 4){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审") + "\",\"/mainframe/sale/createThelibrary.html?page=" + currentPage + "&action=cxd&orderId=" + data[i].id + "\","+data[i].id+");'>"
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/sale/createThelibrary.html?page=" + currentPage + "&action=see&orderId=" + data[i].id + "\","+data[i].id+");'>"
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            //tableContent += "<td class='order'><div class='td-wrap'>" + fieldNull(data[i].negative_id) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].in_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOrderRankListwithColor, num2total(data[i].rank)) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOutStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].settle_status == 1 ? '已结算' : '未结算') + "</div></td>";
            /*var diffDays = data[i].lastdate ? diffDate(GetDateStr(0), data[i].lastdate) : 0;
            if (data[i].settle_status == 1 || data[i].status != 4){
                diffDays = '';
            } else {
                diffDays += '天';
            }*/
            var diffDays = (data[i].delay_days === 0 || data[i].delay_days) ? data[i].delay_days + '天' : '';
            tableContent += "<td class=''><div class='td-wrap'>" + diffDays + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].settletime, 'Ymd') + "</div></td>";
            var driver = fieldNull(data[i].duname, '无')!='无' ? (fieldNull(data[i].duname) + '(' + fieldNull(data[i].dphone) + ')') : '';
            tableContent += "<td class=''><div class='td-wrap'>" + driver + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sorting_id) + "</div></td>";
            /*if (status == 1) {
                tableContent += "<td><a class='btn-small btn-op' href='javascript:openParentForFrame(\"" + simpleBillNo(data[i].id, "S") + "\",\"/mainframe/sale/createThelibrary.html?action=csc&orderId=" + data[i].id + "\")'>审核出库单</a></td>"
            } else if (status == 2) {
                //已取消预审核
                //tableContent += "<td><a class='btn-small btn-op' href='createThelibrary.html?action=csc&orderId=" + data[i].id + "'>审核出库单</a></td>"
                tableContent += "<td><a class='btn-small btn-op' href='javascript:openParentForFrame(\"" + simpleBillNo(data[i].id, "S") + "\",\"/mainframe/sale/createThelibrary.html?action=csc&orderId=" + data[i].id + "\")'>审核出库单</a></td>"
            } else if (status == 3) {
                tableContent += "<td><a class='btn-small btn-op' href='javascript:openParentForFrame(\"" +simpleBillNo(data[i].id, "C") + "\",\"/mainframe/sale/createThelibrary.html?action=cd&orderId=" + data[i].id + "\")'>冲单</a>  <a class='btn-small btn-op' href='javascript:openParentForFrame(\"" + simpleBillNo(data[i].id, "X") + "\",\"/mainframe/sale/createThelibrary.html?action=xd&orderId=" + data[i].id + "\")'>修正</a></td>"
            } else {
                tableContent += "<td></td>";
            }*/
            tableContent += "</tr>";
            $("#theLibrary tbody").append(tableContent);
        }

        if (data.length == 0) {
            $("#theLibrary tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}


