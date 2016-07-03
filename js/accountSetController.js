var checkRes = new checkRepository();


/**
 * 读取帐盘列表信息
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    if (option == null || option == 'undefined') option = 1;
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    $("#begin_date").change(function(){
        refrush();
    });
    $("#end_date").change(function(){
        refrush();
    });

    if (msg != null) {
        //msg = JSON.parse(msg);
        $("#statusNumber").val(option);

        refrush(currentPage);
    }
});


function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        var data = checkRes.findAcccountSet(page, defaultPageNum, params);
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
    var params = {
        "option": $("#statusNumber").val()
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    return params;
}

/**
 * 填充帐盘列表
 * @param data
 */
function fullTable(pdata) {
    if (pdata != null) {
        var data = pdata.data;
        //console.log(data);
        $("#accountSetList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var rowContent = "";
            if (data[i].status == 1){
                rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "预盈亏") + "\",\"/mainframe/check/createAccountSet.html?isshow=0&action=vw&id=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "实盈亏") + "\",\"/mainframe/check/createAccountSet.html?isshow=0&action=vw&id=" + data[i].id + "\","+data[i].id+");'>";
            }
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].cuname) + "</div></td>";
            if (data[i].status == 1 || data[i].status == "1") {
                rowContent += "<td class='status'><span class='status-doing'>盘点中</span></td>";
            } else {
                rowContent += "<td class='status'><span class='status-done'>已结束</span></td>";
            }
            rowContent += "</tr>";
            $("#accountSetList tbody").append(rowContent);
        }
    }
    if (data == null || data.length == 0) {
        $("#accountSetList tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}
