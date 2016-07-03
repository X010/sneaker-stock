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
            {type:'customer', name:'指定客户'},
            //{type:'stores', name:'仓库'},
            {type:'store', name:'指定仓库'},
            {type:'dates', name:'单据审核日期'},
            {type:'date', name:'账期到期日'},
        ]);

        /*if (!$('#date').val()) {
            $('#date').val(GetDateStr(-1));//默认为前一天
        }*/
        $('#begindate').val('2016-03-01');
        $('#enddate').val(GetDateStr(0));
        $('#date').val(GetDateStr(0));

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
    /*params['sids'] = '';
     $('#searchBox-stores input').each(function(){
     if ($(this).attr('checked') == 'checked'){
     params['sids'] += $(this).val() + ','; //多选
     //params['sid'] = $(this).val(); //单选
     }
     });*/
    if ($("#searchBox-customer").val()) params['ccids'] = $("#searchBox-customer").val();
    if ($("#store").val()) params['sids'] = $("#store").val();
    if ($("#date").val()) params['last_date'] = $("#date").val();
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['date'] = $("#enddate").val();
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
    //var defaultPageNum = 1;
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        //var data = resRFR.findDebit(page, defaultPageNum, params);
        var data = resRCR.query('REPORTS_FINANCE_DEBIT_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_FINANCE_DEBIT_READ', params, 1, EXCEL_LINE_MAX);
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
            content += fieldNull(data[i].name) + ',';
            content += num2total(data[i].all_total) + ',';
            content += num2price(data[i].all_amount) + ',';
            content += num2total(data[i].exp_total) + ',';
            content += num2price(data[i].exp_amount) + ',';
            content += num2total(data[i].real_total) + ',';
            content += num2price(data[i].real_amount) + ',';
        }
        //总计
        content += '\n';
        content += '总计,';
        content += num2total(add_up.all_total) + ',';
        content += num2price(add_up.all_amount) + ',';
        content += num2total(add_up.exp_total) + ',';
        content += num2price(add_up.exp_amount) + ',';
        content += num2total(add_up.real_total) + ',';
        content += num2price(add_up.real_amount) + ',';
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
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < res.data.length; i++) {
            var replace = {
                'in_cid': res.data[i].id,
                'in_cname': res.data[i].name,
            };
            var qs = params2querystring(replace);
            //var tabid = buildTabId('reports', 9306, data[i].suid);
            var tableContent = "<tr ondblclick='openParentForFrame(\"出货单结算状态查询\",\"/mainframe/reports/stockOutSettlementStatus.html?"+qs+"\","+9306+");'>";
            //var tableContent = '<tr>';
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].name, '(临时客户)') + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(res.data[i].all_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(res.data[i].all_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(res.data[i].exp_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(res.data[i].exp_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(res.data[i].real_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(res.data[i].real_amount) + "</div></td>";
            tableContent += "</tr>";
            //tableContent += detailContent(res.data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (res.data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        } else {
            //添加总计
            var data = res.add_up;
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class=''><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.all_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.all_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.exp_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.exp_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.real_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.real_amount) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}
