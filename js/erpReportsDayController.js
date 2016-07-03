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
            {type:'dates', name:'起至日期'},
            {type:'store', name:'指定仓库'},
            {type:'goods_type', name:'商品分类'},
            {type:'goods', name:'指定商品'}
        ]);

        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(-1));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(-1));
        }
        refrush(currentPage);
    }


});

/* --------------------------------- 华丽丽的分割线 --------------------------------------- */



/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    //if ($("#date").val()) params['date'] = $("#date").val();
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();

    if(diffDate(params['begin_date'], params['end_date']) > 31){
        runnerAlert('操作提示', '时间间隔不能超过一个月');
        return false;
    }



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

    if (params['date'] == '') {
        params['sid'] = $('#searchBox-goods_type input').eq(0).attr('checked', 'checked').val();//默认取第一个仓库
    }
    if ($("#store").val()) params['sid'] = $("#store").val();
    if ($("#searchBox-goods-name").val()) params['search'] = $("#searchBox-goods-name").val();

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
        var data = resRCR.query('REPORTS_RESERVE_ERP_READ', params, page, defaultPageNum);
        //var data = resRRR.findErpAll(page, defaultPageNum, params);
        fullTable(data); //填充数据到表格
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    } else {
        emptyTable('没有记录');
    }
    tableHover();
}


/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = resRCR.download('REPORTS_RESERVE_ERP_READ', params, 1, EXCEL_LINE_MAX);
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
            var tabid = buildTabId('reports', 9104, data[i].gid);
            var tableContent = "<tr data-toggle='tooltip' data-placement='top' title='" + fieldNull(data[i].gname) + "' ondblclick='openParentForFrame(\"进销存:"+fieldNull(data[i].gname)+"\",\"/mainframe/reports/erpReportsDetail.html?"+qs+"\","+tabid+");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gcode) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gunit) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gtname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].adjust_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].total_begin) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].total_begin, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount_begin) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].total_end) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].total_end, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount_end) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].buy_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].buy_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].buy_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].buy_return_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].buy_return_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].buy_return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].sell_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].sell_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].sell_return_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].sell_return_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].sell_return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].transfer_in_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].transfer_in_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].transfer_in_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].transfer_out_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].transfer_out_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].transfer_out_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].overloss_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].overloss_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].overloss_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].inventory_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].inventory_total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].inventory_amount) + "</div></td>";
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
            tableContent += "<td class=''><div class='td-wrap'>总计</div></td>";
            //tableContent += "<td class='gcode'><div class='td-wrap'>" + fieldNull(data[i].gcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.adjust_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount_begin) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount_end) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.buy_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.buy_return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.sell_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.sell_return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.transfer_in_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.transfer_out_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.overloss_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.inventory_amount) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
    tipsTableTr();
    fixTables();
}

