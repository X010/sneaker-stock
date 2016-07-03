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
            {type:'goods_type', name:'商品分类'},
            {type:'dates', name:'起止日期'},
            {type:'goods', name:'指定商品'},
            //{type:'user', name:'业务员'},
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
});

/* --------------------------------- 华丽丽的分割线 --------------------------------------- */



/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    //先取小分类
    params['gtids'] = '';
    $('#searchBox-goods_subtype input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['gtids'] += $(this).val() + ',';
        }
    });
    //小分类没有,则取大分类
    if (params['gtids'] == '') {
        $('#searchBox-goods_type input').each(function(){
            if ($(this).attr('checked') == 'checked'){
                params['gtids'] += $(this).val() + ',';
            }
        });
    }
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();
    params['sids'] = '';
    $('#searchBox-stores input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['sids'] += $(this).val() + ','; //多选
            //params['sid'] = $(this).val(); //单选
        }
    });
    //if ($('#searchBox-user').val()) params['suids'] = $('#searchBox-user').val();
    if ($.trim($("#searchBox-goods").val()) != '' && $("#searchBox-goods").val()) params['gid'] = $("#searchBox-goods").val();
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
        var data = resRCR.query('REPORTS_FORM_GOODS_TOP_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_FORM_GOODS_TOP_READ', params, 1, EXCEL_LINE_MAX);
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
            content += fieldNull(data[i].gcode) + ',';
            content += fieldNull(data[i].gname) + ',';
            content += '\t' + fieldNull(data[i].gbarcode) + ',';
            content += fieldNull(data[i].gunit) + ',';
            content += fieldNull(data[i].gspec) + ',';
            content += num2total(data[i].sell_total) + ',';
            content += num2price(data[i].sell_amount) + ',';
            content += num2price(data[i].sell_cost_amount)  + ',';
            content += num2price(data[i].sell_profit_amount)  + ',';
            content += fieldNull(data[i].sell_profit_percent)  + ',';
            content += num2total(data[i].return_total)  + ',';
            content += num2price(data[i].return_amount)  + ',';
            content += num2price(data[i].return_cost_amount)  + ',';
            content +=  num2price(data[i].return_profit_amount)  + ',';
        }
        //总计
        content += '\n';
        content += '总计,';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += num2total(add_up.sell_total) + ',';
        content += num2price(add_up.sell_amount) + ',';
        content += num2price(add_up.sell_cost_amount)  + ',';
        content += num2price(add_up.sell_profit_amount)  + ',';
        content += ',';
        content += num2total(add_up.return_total)  + ',';
        content += num2price(add_up.return_amount)  + ',';
        content += num2price(add_up.return_cost_amount)  + ',';
        content +=  num2price(add_up.return_profit_amount)  + ',';
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
            var replace = {
                'gid': data[i].gid,
                'gname': data[i].gname,
            };
            var qs = params2querystring(replace);
            var tabid = buildTabId('reports', 9205, data[i].gid);
            var tableContent = "<tr data-toggle='tooltip' data-placement='top' title='" + fieldNull(data[i].gname) + "' ondblclick='openParentForFrame(\"销量:"+fieldNull(data[i].gname)+"\",\"/mainframe/reports/goodsTopFormDetail.html?"+qs+"\","+tabid+");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gcode) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gunit) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gspec) + "</div></td>";

            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].sell_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_profit_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + fieldNull(data[i].sell_profit_percent) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].return_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_cost_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_profit_amount) + "</div></td>";
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
            tableContent += "<td class='align-left' colspan='5'><div class='td-wrap'>总计</div></td>";

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
    tipsTableTr();
    fixTables();
}



