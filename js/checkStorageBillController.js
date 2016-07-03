var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();

var status = '';
var currentPage;

$(function () {
    var msg = cookieUtil("userprofile");
    var action = getUrlParam("action");
    if (action == null || action == 'undefined') {
        action = "check";
    }

    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(16)){
        $('#btn-create').remove();
    } else {
         $('#btn-create').click(function(){
            openParentForFrame('新建入库单', "/mainframe/stock/createOrder.html?action=cski&iframeid=16&iframename=" + encodeURI("新建入库单"), 16);
         });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    var days_begin = getUrlParam("days_begin");
    if (days_begin == null || days_begin == 'undefined') days_begin = GetDateStr(-days_view);
    $("#begin_date").change(function(){
        refrush();
    }).val(days_begin);
    $("#end_date").change(function(){
        refrush();
    }).val(GetDateStr(0));

    if (msg != null) {
        //msg = JSON.parse(msg);
        $("#sorderid").val(getUrlParam("sorderid"));
        bindInStatusSelect("statusNumber", ",1,2,3,4,5,6,7,8,9,10,11,12,13,14,");
        $("#statusNumber").prepend('<option value="">- 全部 -</option>');
        $("#statusNumber").val(status);

        bindBusinessPracticeSelect("business");
        $("#business").prepend('<option value="">- 全部 -</option>');

        bindAutoCompleteCommon('supplierName', 'supplier');
        //bindAutoCompleteCommon('buname', 'user');
        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }

    fixTables();

});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = stockRes.findStockInAllField(currentPage, defaultPageNum, params);
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
        'option': status
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#business").val()) params['business'] = $("#business").val();
    if ($("#settle_status").val()) params['settle_status'] = $("#settle_status").val();
    if ($("#supplier").val()) params['out_cid'] = $("#supplier").val();
    //if ($("#buid").val()) params['buid'] = $("#buid").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    //console.log(params);
    return params;
}

/**
 * 填充Table
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#storkInList tbody").empty();
        $("#table-empty").empty().hide();
        for (var i = 0; i < data.length; i++) { //填充数据到表单
            if (data[i].status == 1){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/stock/createOrder.html?page=" + currentPage + "&orderId=" + data[i].id + "&action=cc\","+data[i].id+");'>";
            } else if (data[i].status == 2){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审") + "\",\"/mainframe/stock/createOrder.html?page=" + currentPage + "&orderId=" + data[i].id + "&action=cxd\","+data[i].id+");'>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/stock/createOrder.html?page=" + currentPage + "&orderId=" + data[i].id + "&action=see\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            //tableContent += "<td class='order'><div class='td-wrap'>" + fieldNull(data[i].negative_id) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].out_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].buname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showInStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showBusinessPracticeList, data[i].business) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].settle_status == 1 ? '已结算' : '未结算') + "</div></td>";
            tableContent += "</tr>";
            $("#storkInList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#storkInList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}



