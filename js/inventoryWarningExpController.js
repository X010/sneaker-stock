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
            {type:'store', name:'指定仓库'},
            {type:'date', name:'到效日期'},
        ]);

        if (!$('#date').val()) {
            $('#date').val(GetDateStr(-1));//默认为前一天
        }
        refrush(currentPage);
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
    if ($("#store").val()) params['sid'] = $("#store").val();
    if (params['date'] == '') {
        params['sid'] = $('#searchBox-goods_type input').eq(0).attr('checked', 'checked').val();//默认取第一个仓库
    }
    if ($("#search").val()) params['search'] = $("#search").val();

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
        //var data = resRRR.findSnapshotAll(page, defaultPageNum, params);
        var data = resRCR.query('REPORTS_RESERVE_EXPDATE_WARNING_READ', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = {
                "sid": typeof(params['sid']) == 'undefined' ? '' : params['sid'],
                "date": typeof(params['date']) == 'undefined' ? '' : params['date'],
            };
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
    var res = resRCR.download('REPORTS_RESERVE_EXPDATE_WARNING_READ', params, 1, EXCEL_LINE_MAX);
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
            content += fieldNull(data[i].expdate) + ',';
            content += num2total(data[i].batch) + ',';
            content += num2price(data[i].unit_price) + ',';
            content += num2total(data[i].total) + ',';
            content += total2boxtotal(data[i].total, data[i].gspec) + ',';
            content += fromType(data[i].from) + ',';
            content += fieldNull(data[i].order_id) + ',';
        }
        //总计
        content += '\n';
        content += '总计,';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += num2total(add_up.total) + ',';
        content += ',';
        content += ',';
        content += ',';
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
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gcode) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gunit) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].expdate) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + num2total(data[i].batch) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].unit_price) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + num2total(data[i].total) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + total2boxtotal(data[i].total, data[i].gspec)+ "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fromType(data[i].from) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
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
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + num2total(data.total) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}



