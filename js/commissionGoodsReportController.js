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
            {type:'user', name:'业务员'},
            {type:'goods', name:'指定商品'},
        ]);

        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(0));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(0));
        }

        //如果从 业务员业绩查询 页面点开的,带入一些初始参数
        if (getUrlParam("suid")){
            $('#searchBox-user').val(getUrlParam("suid"));
        }
        if (getUrlParam("suname")) $('#searchBox-user-name').val(getUrlParam("suname")).attr('disabled', 'disabled');
        if (getUrlParam("begin_date")) $('#begindate').val(getUrlParam("begin_date"));
        if (getUrlParam("end_date")) $('#enddate').val(getUrlParam("end_date"));
        //带入参数 END

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
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
    if (!params['suid']){
        return false;
    }
    if ($('#searchBox-goods').val()) params['gid'] = $('#searchBox-goods').val();
    params['gid'] = $.trim($('#searchBox-goods-name').val())=='' || !$('#searchBox-goods').val() ? '' : $('#searchBox-goods').val();
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
    if (params){
        var data = resRCR.query('REPORTS_FINANCE_COMMISSION_GOODS', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    } else {
        emptyTable('请指定业务员');
    }
    tableHover();
}


/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = resRCR.download('REPORTS_FINANCE_COMMISSION_GOODS', params, 1, EXCEL_LINE_MAX);
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
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gunit) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].commission_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].commission_real_amount) + "</div></td>";
            tableContent += "</tr>";
            //tableContent += detailContent(data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            emptyTable('没有记录');
        } else {
            //添加总计
            var data = res.add_up;
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class='align-left'><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.commission_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.commission_real_amount) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}

