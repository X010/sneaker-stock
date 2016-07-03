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
            {type:'dates', name:'起止日期'},
            {type:'goods', name:'指定商品'},
            {type:'user', name:'业务员'},
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
    if ($.trim($('#searchBox-goods-name').val()) == ''){
        //runnerAlert('操作提示', '请先指定商品');
        return false;
    }
    //if (!checkAutoComplete('searchBox-user')) return false;
    var params = {};
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
    if ($('#searchBox-goods').val()) params['gid'] = $('#searchBox-goods').val();
    return params;
}


/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (params){
        var data = resRCR.query('REPORTS_SALESMAN_GOODS_CUSTOM_READ', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    } else {
        emptyTable('请指定商品');
    }
    tableHover();
}



/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    if (params){
        var res = resRCR.download('REPORTS_SALESMAN_GOODS_CUSTOM_READ', params, 1, EXCEL_LINE_MAX);
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
                content += fieldNull(data[i].ccname) + ',';
                content += fieldNull(data[i].suname) + ',';
                content += num2total(data[i].total) + ',';
                content += num2price(data[i].amount) + ',';
            }
            //总计
            content += '\n';
            content += '总计,';
            content += ',';
            content += num2total(add_up.total) + ',';
            content += num2price(add_up.amount) + ',';
            //保存
            saveExcelFile($('head title').text(), content);
        } else {
            runnerAlert('操作提示', '查询结果为空');
        }*/
    }
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
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].ccname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "</tr>";
            //tableContent += detailContent(data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            emptyTable();
        } else {
            //添加总计
            var data = res.add_up;
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class='align-left'><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}



