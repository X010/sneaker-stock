/*调拔单列表*/
var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();

var status; //未发货
var currentPage;

/**
 * 读取调拔单列表
 */
$(function () {
    //读取未审核调拔单列表
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(32)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建调出单', "/mainframe/inventory/createStubbsOutBill.html?iframeid=32&iframename=" + encodeURI("新建调出单"), 32);
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
        bindSelfStore("out_sid");
        $("#out_sid").prepend('<option value="">- 全部 -</option>');
        $("#out_sid").val(getUrlParam("out_sid"));
        $("#sorderid").val(getUrlParam("sorderid"));
        $("#statusNumber").val(status);

        refrush(currentPage);
    }
});



function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (params){
        var data = inventoryRes.findAllField(currentPage, defaultPageNum, params);
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
    if ($("#out_sid").val()) params['out_sid'] = $("#out_sid").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    //console.log(params);
    return params;
}


/**
 * 填充数据
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#stubbList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == '未审核'){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未发") + "\",\"/mainframe/inventory/createStubbsOutBill.html?page=" + currentPage + "&action=cbs&id=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/inventory/createStubbsOutBill.html?page=" + currentPage + "&action=see&id=" + data[i].id + "\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + data[i].id + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].out_sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].in_sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].iuid ? '<span class="status-yes">是</span>' : '<span class="status-no">否</span>') + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + formatStatusInStubbsOut(data[i].status) + "</div></td>";
            tableContent += "</tr>";
            $("#stubbList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#stubbList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}


/**
 * 状态文字转换
 * @param status
 * @returns {*}
 */
function formatStatusInStubbsOut(status){
    status = fieldNull(status);
    switch (status){
        case '未审核':
            status = '未发货';
            break;
        case '已审核':
            status = '已发货';
            break;
        default:
            break;
    }
    return status;
}