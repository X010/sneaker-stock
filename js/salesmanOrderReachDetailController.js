var resRCR = new reportsCommonRepository();



/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 页面初始数据
 */
$().ready(function () {
    var currentPage = getUrlParam("page");
    if (currentPage == null) currentPage = 1;
    $("#pageName").text(getUrlParam("iframename"));

    var msg = cookieUtil("userprofile");
    if (msg != null) {
        //msg = JSON.parse(msg);

        refrush(currentPage);
        //bindSortByField();
    }

    fixTables();
});


/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    params['detail'] = '1';
    if (getUrlParam("begin_date")) params['begin_date'] = getUrlParam("begin_date");
    if (getUrlParam("end_date")) params['end_date'] = getUrlParam("end_date");
    if (getUrlParam("sids")) params['sids'] = getUrlParam("sids");
    if (getUrlParam("suid")) params['suid'] = getUrlParam("suid");
    return params;
}


/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = resRCR.query('REPORTS_SALESMAN_ORDER_RATE_READ', params, page, defaultPageNum);
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
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = resRCR.download('REPORTS_SALESMAN_ORDER_RATE_READ', params, 1, EXCEL_LINE_MAX);
}



/**
 * 将数据填充到table
 * @param res
 */
function fullTable(res) {
    if (res != null && res.data != null) {
        //console.log(res.data);
        var data = res.data;
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].order_time) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].stock_out_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].stock_out_status ? id2text(showOutStatusList, data[i].stock_out_status) : '') + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + num2total(data[i].delay_days) + "天</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].in_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOrderRankListwithColor, num2total(data[i].rank)) + "</div></td>";
            //tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(data[i].visit_memo) + "</div></td>";
            tableContent += "</tr>";
            //tableContent += detailContent(data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        } else {
            /*
            //添加总计
            var data = res.add_up;
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class='num'><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='status'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='username'><div class='td-wrap'></div></td>";
            tableContent += "<td class='status'><div class='td-wrap'></div></td>";
            tableContent += "<td class='text'><div class='td-wrap'></div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
            */
        }
    }
    formatTDOfRMB();//格式化金额列
}


