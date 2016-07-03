var resCom = new commissionRepository();

var status = '';
var currentPage;

var statusNumbers = {
    1 : '<span class="status-uncheck">未审核</span>',
    2 : '<span class="status-checked">已审核</span>',
    9 : '<span class="status-cancel">已作废</span>',
    10 : '<span class="status-repaired">已冲单</span>',
    11 : '<span class="status-repair">冲单(负单)</span>'
};


$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var suid = getUrlParam("suid");
    var suname = getUrlParam("suname");
    var begin_date = getUrlParam("begin_date");
    var end_date = getUrlParam("end_date");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(86)){
        $('#btn-create').remove();
    } else {
         $('#btn-create').click(function(){
            openParentForFrame('新建提成结算单', "/mainframe/finance/createCommission.html?iframeid=86&iframename=" + encodeURI("新建提成结算单"), 86);
         });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    begin_date = begin_date ? begin_date : GetDateStr(-days_view);
    $("#begin_date").change(function(){
        refrush();
    }).val(begin_date);
    end_date = end_date ? end_date : GetDateStr(0);
    $("#end_date").change(function(){
        refrush();
    }).val(end_date);

    $('#suname').val(suname);
    $('#suid').val(suid);

    if (msg != null) {
        //msg = JSON.parse(msg);
        $("#sorderid").val(getUrlParam("sorderid"));
        $("#statusNumber").val(status);

        bindAutoCompleteCommon('suname', 'user');

        refrush(currentPage);
    }
    fixTables();

});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = resCom.findAll(currentPage, defaultPageNum, params);
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
    if ($("#suid").val()) params['suid'] = $("#suid").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    return params;
}

/**
 * 填充Table
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#mainList tbody").empty();
        $("#table-empty").empty().hide();
        for (var i = 0; i < data.length; i++) { //填充数据到表单
            if (data[i].status == 1){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/finance/createCommission.html?page=" + currentPage + "&id=" + data[i].id + "&action=check\","+data[i].id+");'>";
            } else if (data[i].status == 2){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审") + "\",\"/mainframe/finance/createCommission.html?page=" + currentPage + "&id=" + data[i].id + "&action=flush\","+data[i].id+");'>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/finance/createCommission.html?page=" + currentPage + "&id=" + data[i].id + "&action=view\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].commission_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].commission_real_amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + statusNumbers[data[i].status]+ "</div></td>"; //状态
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}


