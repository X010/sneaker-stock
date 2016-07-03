var rPCR = new restPickingCartRepository();

var status = 1;



/* ------------------------------------------------- 一条华丽丽的分割线儿 --------------------------------------------------- */


/**
 * 页面初始化
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(29)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建拣货派车单', "/mainframe/wms/createPickingCart.html?iframeid=29&iframename=新建拣货派车单", 29);
        });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    $("#begin_date").change(function(){
        refrush();
    }).val(GetDateStr(-7));
    $("#end_date").change(function(){
        refrush();
    }).val(GetDateStr(0));

    if (msg != null) {
        //msg = JSON.parse(msg);
        $("#statusNumber").val(status);
        $("#sorderid").val(getUrlParam("sorderid"));
        bindSelfStore("sid");
        $("#sid").prepend('<option value="">- 全部 -</option>');
        bindAutoCompleteCommon('duname', 'user');

        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = rPCR.findAll(page, defaultPageNum, params);
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}

function buildParams(){
    status = $("#statusNumber").val();
    var params = {};
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#sid").val()) params['sid'] = $("#sid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    if ($("#duid").val()) params['duid'] = $("#duid").val();
    //console.log(params);
    return params;
}

/**
 * 填充表格
 * @param data
 */
function fullTable(data) {
    if (data != null) {
        data = data.data;
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 1){
                var rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "派车") + "\",\"/mainframe/wms/createPickingCart.html?action=op&id=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                var rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/wms/createPickingCart.html?action=view&id=" + data[i].id + "\","+data[i].id+");'>";
            }
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].id + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            rowContent += "<td class='align-left'><div class='td-wrap'>" + formatArea(data[i]) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].duname) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].car_license) + "</div></td>";
            rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + statusShow(data[i].status) + "</div></td>";
            rowContent += "</tr>";
            $("#mainList tbody").append(rowContent);
        }
    }
    if (data==null||data.length == 0) {
        $("#mainList tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
}

/**
 *
 * @param data
 * @returns {string}
 */
function formatArea(data){
    var area = fieldNull(data.areapro) + fieldNull(data.areacity) + fieldNull(data.areazone);
    return area;
}

/**
 * 状态转换
 */
function statusShow(status) {
    switch (status) {
        case "1":
            return "<span class='status-checked'>已派车</span>";
        case "9":
            return "<span class='status-cancel'>已作废</span>";
    }
}