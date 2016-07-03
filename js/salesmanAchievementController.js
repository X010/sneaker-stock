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
            {type:'date', name:'截止日期'},
            {type:'stores', name:'指定仓库'},
            {type:'tree_user', name:'员工分组'},
            {type:'belong', name:'隶属关系'},
            {type:'user', name:'业务员'},
        ]);

        //$('#searchBox-user-name').parent().after('<span style="font-size:12px;color:#46b8da;margin-left:5px;">提示:不支持第三方业务员</span>');

        if (!$('#date').val()) {
            $('#date').val(GetDateStr(0));
        }

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
    if ($("#date").val()) params['date'] = $("#date").val();
    params['sids'] = '';
    $('#searchBox-stores input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['sids'] += $(this).val() + ','; //多选
            //params['sid'] = $(this).val(); //单选
        }
    });
    if ($('#tree_user').val()) params['ugid'] = $('#tree_user').val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
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
        var data = resRCR.query('REPORTS_SALESMAN_ACHIEVEMENT_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_SALESMAN_ACHIEVEMENT_READ', params, 1, EXCEL_LINE_MAX);
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
            var date = $.trim($('#date').val());
            var replace = {
                //'begin_date': date.substr(0, 8) + '01', //该月第一天
                'begin_date': fieldNull(res.month_first_day), //该任务月第一天
                'end_date': date,
                'suid': data[i].suid,
                'suname': data[i].suname,
            };
            var qs = params2querystring(replace);
            var tabid = buildTabId('reports', 9404, data[i].suid);
            var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].suname, "单品订量:") + "\",\"/mainframe/reports/salesmanReportsAboutGoods.html?"+qs+"\","+tabid+");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].all_customer_count2) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].all_customer_count) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].day_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].day_order_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].day_customer_count) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].period_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].period_order_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].period_customer_count) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].complete_rate) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data[i].period_box_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].task_total) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].amount_complete_rate) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2total(data[i].amount_task_total) + "</div></td>";
            tableContent += "</tr>";
            //tableContent += detailContent(data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        } else {
            //添加总计
            var data = res.add_up;
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class=''><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.all_customer_count2) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.all_customer_count) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.day_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.day_order_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.day_customer_count) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.period_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.period_order_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.period_customer_count) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data.complete_rate) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data.period_box_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.task_total) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data.amount_complete_rate) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2total(data.amount_task_total) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}


