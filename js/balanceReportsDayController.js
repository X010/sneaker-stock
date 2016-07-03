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
            //{type:'stores', name:'仓库'},
            {type:'date', name:'指定日期'},
        ]);

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
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = resRCR.query('REPORTS_FORM_BALANCE_READ', params, page, 50);
        fullTable(data); //填充数据到表格

    }
    tableHover();
}


/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = resRCR.download('REPORTS_FORM_BALANCE_READ', params, 1, EXCEL_LINE_MAX);
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
            content += fieldNull(data[i].sname) + ',';
            content += num2total(data[i].sell_total) + ',';
            content += num2price(data[i].sell_amount) + ',';
            content += num2price(data[i].sell_cost_amount) + ',';
            content += num2price(data[i].sell_profit_amount) + ',';
            content += fieldNull(data[i].sell_profit_percent) + ',';
            content += num2total(data[i].return_total) + ',';
            content += num2price(data[i].return_amount) + ',';
            content += num2price(data[i].return_cost_amount) + ',';
            content += num2price(data[i].return_profit_amount) + ',';
        }
        //总计
        content += '\n';
        content += '总计,';
        content += num2total(add_up.sell_total) + ',';
        content += num2price(add_up.sell_amount) + ',';
        content += num2price(add_up.sell_cost_amount) + ',';
        content += num2price(add_up.sell_profit_amount) + ',';
        content += ',';
        content += num2total(add_up.return_total) + ',';
        content += num2price(add_up.return_amount) + ',';
        content += num2price(add_up.return_cost_amount) + ',';
        content += num2price(add_up.return_profit_amount) + ',';
        //保存
        saveExcelFile($('head title').text(), content);
    } else {
        runnerAlert('操作提示', '查询结果为空');
    }*/
}

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
    if ($('#date').val()) params['date'] = $('#date').val();
    else runnerAlert('操作提示', '请选择日期');
    if (sort_name && sort_updown){
        params['orderby'] = sort_name + '^' + sort_updown;
    }
    //console.log(params);
    return params;
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
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";

            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].sell_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_profit_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + fieldNull(data[i].sell_profit_percent) + "</div></td>";

            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].return_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_profit_amount) + "</div></td>";
            /*tableContent += "<td class='num'><div class='td-wrap'>" + fieldNull(data[i].return_profit_percent) + "</div></td>";

            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].real_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].real_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].real_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].real_profit_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + fieldNull(data[i].real_profit_percent) + "</div></td>";
            */
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

            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.sell_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.sell_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.sell_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.sell_profit_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'> </div></td>";

            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.return_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.return_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.return_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.return_profit_amount) + "</div></td>";

            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}



