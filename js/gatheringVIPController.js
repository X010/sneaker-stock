var financeRes = new financeRepository();
var currentPage;

var statusNumbers = {
    1 : '<span class="status-uncheck">未审核</span>',
    2 : '<span class="status-checked">已审核</span>',
    9 : '<span class="status-cancel">已作废</span>',
    10 : '<span class="status-repaired">已冲单</span>',
    11 : '<span class="status-repair">冲单(负单)</span>'
};



/**
 * 初始页面
 */
$(function () {
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = $("#statusNumber").val();
    var msg = cookieUtil("userprofile");

    //新建按钮
    if (!checkPower(87)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建会员收款单', "/mainframe/finance/createGatheringVIP.html?iframeid=87&iframename=" + encodeURI("新建会员收款单"), 87);
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
        $("#statusNumber").val(option);
        $("#sorderid").val(getUrlParam("sorderid"));
        bindAutoCompleteCommon('customName', 'vip');
        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        var data = financeRes.findGatheringAll(currentPage, defaultPageNum, params);
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
    if ($("#statusNumber").val()) params['option'] = $("#statusNumber").val();
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#custom").val()) params['dcid'] = $("#custom").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    return params;
}


/**
 * 填充数据
 * @param data
 */
function fullTable(data) {
    if (data != null && data != 'undefined' && data.data != null && data.data.length > 0) {
        data = data.data;
        $("#gatheringList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var rowContent = "";
            if (data[i].status == 1) {
                rowContent += "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/finance/createGatheringVIP.html?page=" + currentPage + "&action=ch&id=" + data[i].id + "\","+data[i].id+")'>";
            } else if (data[i].status == 2) {
                rowContent += "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审") + "\",\"/mainframe/finance/createGatheringVIP.html?page=" + currentPage + "&action=xd&id=" + data[i].id + "\","+data[i].id+")'>";
            } else {
                rowContent += "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/finance/createGatheringVIP.html?page=" + currentPage + "&action=vw&id=" + data[i].id + "\","+data[i].id+")'>";
            }
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].id + "</div></td>";
            //rowContent += "<td class='order'><div class='td-wrap'>" + fieldNull(data[i].negative_id) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].dcname + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].cuname) + "</div></td>";
            rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            rowContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount_price) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + statusNumbers[data[i].status] + "</div></td>";
            rowContent += "</tr>";
            $("#gatheringList tbody").append(rowContent);
        }
    } else {
        $("#gatheringList tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}
