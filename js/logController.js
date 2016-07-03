var logRes = new restLogRepository();

/**
 * 加载数据
 */
$(function () {
    defaultPageNum = 20;
    var startTime = getUrlParam("startTime");
    var endTime = getUrlParam("endTime");
    var menu_id = getUrlParam("menu_id");
    var currentPage = getUrlParam("page");
    if (startTime == null || startTime == 'undefined') startTime = getCurrentOldDate();
    if (endTime == null || endTime == 'undefined') endTime = getNowFormatDate();
    if (menu_id == null || menu_id == 'undefined') menu_id = '';
    if (currentPage == null || currentPage == 'undefined') currentPage = defaultPage;

    $('#reservationtime').val(startTime + ' ~ ' + endTime);
    $("#menuType").val(menu_id);
    bindAutoCompleteCommon('uname', 'user');

    refrush();

    fixTables();

});



/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = logRes.query('LOG_READ_LIST', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格
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

/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var time = $("#reservationtime").val();
    var params = {
        'begin_time':time.split(' ~ ')[0],
        'end_time':time.split(' ~ ')[1],
    };
    if ($('#menuType').val()) params['menu_id'] = $('#menuType').val();
    if ($('#flag').val()) params['flag'] = $('#flag').val();
    if ($('#uid').val()) params['uid'] = $('#uid').val();

    return params;
}




//将数据填充到Table
function fullTable(res) {
    //$("#log tr:gt(0):not(:eq(1))").remove();
    //$("#log tr:gt(0)").remove();
    $("#log tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td class=''><div class='td-wrap'>" + res.data[i].createtime + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].menu_name) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].module_name) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].action_msg) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].flag == 1 ? '成功' : '失败') + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].uname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].ip) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].imark) + "</div></td>";
            tableContent += "</tr>";
            //$("#log tr:last").after(tableContent);
            $("#log tbody").append(tableContent);
        }
    }else{
        $("#log tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    tableHover();
}
