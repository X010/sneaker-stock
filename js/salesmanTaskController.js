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
        //填充搜索块
        $('#searchBox').searchBox([
            {type:'year', name:'年度'},
            {type:'tree_user', name:'员工分组'},
            {type:'belong', name:'隶属关系'},
            {type:'user', name:'业务员'},
            {type:'goods', name:'指定商品'},
        ]);

        //$('#searchBox-user-name').parent().after('<span style="font-size:12px;color:#46b8da;margin-left:5px;">提示:不支持第三方业务员</span>');

        refrush(currentPage);

        bindSortByField();
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
    if ($("#year").val()) params['year'] = $("#year").val();
    if ($('#tree_user').val()) params['ugid'] = $('#tree_user').val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
    if ($('#searchBox-goods').val()) params['gid'] = $('#searchBox-goods').val();
    if ($('#belong').val()) params['belong'] = $('#belong').val();
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
        var data = resRCR.query('REPORTS_SALESMAN_TASK_READ', params, page, defaultPageNum);
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

    fixTables();
}


/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = resRCR.download('REPORTS_SALESMAN_TASK_READ', params, 1, EXCEL_LINE_MAX);
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
            tableContent += "<td class='username'><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
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
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        } else {
            //添加总计
            if (res.add_up){
                var data = res.add_up;
                var tableContent = "<tr class='add-up'>";
                tableContent += "<td class=''><div class='td-wrap'></div></td>";
                tableContent += "<td class=''><div class='td-wrap'>月度总计(商品)</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val1) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val2) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val3) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val4) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val5) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val6) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val7) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val8) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val9) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val10) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val11) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val12) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val_all) + "</div></td>";
                tableContent += "</tr>";
                $("#mainList tbody").append(tableContent);
            }


            //添加总计
            if (res.add_up2) {
                var data = res.add_up2;
                var tableContent = "<tr class='add-up'>";
                tableContent += "<td class=''><div class='td-wrap'></div></td>";
                tableContent += "<td class=''><div class='td-wrap'>月度总计</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val1) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val2) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val3) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val4) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val5) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val6) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val7) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val8) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val9) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val10) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val11) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val12) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.val_all) + "</div></td>";
                tableContent += "</tr>";
                $("#mainList tbody").append(tableContent);
            }
        }
    }
    formatTDOfRMB();//格式化金额列
}


