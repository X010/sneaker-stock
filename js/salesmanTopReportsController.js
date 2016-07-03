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
            {type:'stores', name:'仓库'},
            {type:'dates', name:'起止日期'},
            {type:'user', name:'业务员'},
            {type:'settle_status', name:'结算状态'},
            //{type:'status', name:'单据状态', data:[["","- 全部 -"], ["2","未结算"], ["3","已结算"]]},
        ]);


        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(0));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(0));
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
    if ($("#begindate").val()) params['begindate'] = $("#begindate").val();
    if ($("#enddate").val()) params['enddate'] = $("#enddate").val();
    params['sids'] = '';
    $('#searchBox-stores input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['sids'] += $(this).val() + ','; //多选
            //params['sid'] = $(this).val(); //单选
        }
    });
    //if ($('#status').val()) params['status'] = $('#status').val();
    if ($('#settle_status').val()) params['settle_status'] = $('#settle_status').val();
    if ($("#searchBox-user").val()) params['suids'] = $("#searchBox-user").val();
    if (sort_name && sort_updown){
        params['orderby'] = sort_name + '^' + sort_updown;
    }
    //console.log(params);
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
        //var data = resRSR.findSalesmanTop(page, defaultPageNum, params);
        var data = resRCR.query('REPORTS_SALESMAN_TOP_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_SALESMAN_TOP_READ', params, 1, EXCEL_LINE_MAX);
    /*if (res && res.data && res.data.length){
        var add_up = res.add_up; //总计
        var data = res.data;
        var content = '';
        //head
        $('table thead th').each(function(){
            content += $(this).text() + ',';
        });
        //body
        for (var i=0; i<data.length; i++){
            content += '\n';
            content += fieldNull(data[i].suname) + ',';
            content += num2total(data[i].customer_count) + ',';
            content += num2total(data[i].order_count) + ',';
            content += num2price(data[i].amount) + ',';
            content += num2total(data[i].return_order_count) + ',';
            content += num2price(data[i].return_amount) + ',';
            content += num2total(data[i].sub_order_count) + ',';
            content += num2price(data[i].sub_amount) + ',';
        }
        //总计
        content += '\n';
        content += '总计,';
        content += ',';
        content += num2total(add_up.order_count) + ',';
        content += '\t' + num2price(add_up.amount) + ',';
        content += num2total(add_up.return_order_count) + ',';
        content += num2price(add_up.return_amount) + ',';
        content += num2total(add_up.sub_order_count) + ',';
        content += '\t' + num2price(add_up.sub_amount) + ',';
        //保存
        saveExcelFile($('head title').text(), content);
    } else {
        runnerAlert('操作提示', '查询结果为空');
    }*/
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
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].customer_count) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].return_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].sub_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sub_amount) + "</div></td>";
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
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.return_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.sub_order_count) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.sub_amount) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}


