var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();
var status = '';
var currentPage;

/**
 * 加载报溢
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(36)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建报溢单', "/mainframe/inventory/createOverFlowBill.html?iframeid=36&iframename=" + encodeURI("新建报溢单"), 36);
        });
    }

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
        bindSelfStore("sid");
        $("#sid").prepend('<option value="">- 全部 -</option>').val(getUrlParam("sid"));
        $("#sorderid").val(getUrlParam("sorderid"));
        bindInStatusSelect("statusNumber", ",1,2,9,");
        $("#statusNumber").prepend('<option value="">- 全部 -</option>').val(status);

        refrush(currentPage);
    }
});



function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (params){
        var data = inventoryRes.findOverFLowAllField(currentPage, defaultPageNum, params);
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
        "option": status,
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#sid").val()) params['sid'] = $("#sid").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    //console.log(params);
    return params;
}

/**
 * 加载数据到表格
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#overflow tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == "1" || data[i].status == 1){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审")  + "\",\"/mainframe/inventory/createOverFlowBill.html?page=" + currentPage + "&action=co&orderId=" + data[i].id + "\","+data[i].id+");'>";
            //} else if (data[i].status == "2" || data[i].status == 2) {
            //    var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审")  + "\",\"/mainframe/inventory/createOverFlowBill.html?page=" + currentPage + "&action=cxd&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/inventory/createOverFlowBill.html?page=" + currentPage + "&action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            }   
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            //tableContent += "<td class='order'><div class='td-wrap'>" + fieldNull(data[i].negative_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showInStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "</tr>";
            $("#overflow tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#overflow tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }

    }
    formatTDOfRMB();//格式化金额列
}
