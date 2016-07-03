var resTask = new taskRepository();

var currentPage;


$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;


    //新建按钮
    if (!checkPower(27)){
        $('#btn-create').remove();
    } else {
         $('#btn-create').click(function(){
            openParentForFrame('新建销售任务单', "/mainframe/sale/createTask.html?iframeid=27&iframename=" + encodeURI("新建销售任务单"), 27);
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
        bindAutoCompleteCommon('suname', 'user');

        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = resTask.findAll(currentPage, defaultPageNum, params);
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
    if ($("#type").val()) params['type'] = $("#type").val();
    if ($("#suid").val()) params['suid'] = $("#suid").val();
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
                var tableContent = "<tr ondblclick='openParentForFrame(\""+ data[i].suname + data[i].year  + "\",\"/mainframe/sale/createTask.html?page=" + currentPage + "&id=" + data[i].id + "&action=update\","+data[i].id+");'>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\""+ data[i].suname + data[i].year  + "\",\"/mainframe/sale/createTask.html?page=" + currentPage + "&id=" + data[i].id + "&action=view\","+data[i].id+");'>";
            }
            tableContent += "<td class='status'><div class='td-wrap'>" + fieldNull(data[i].year) + "</div></td>";
            tableContent += "<td class='username'><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val1) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val2) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val3) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val4) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val5) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val6) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val7) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val8) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val9) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val10) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val11) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val12) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].val_all) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
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


