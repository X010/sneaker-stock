/*调拔单列表*/
var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();


/**
 * 加载数据
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    //if (option == null || option == 'undefined') option = $("#sid").val();

    $("#pageName").text(getUrlParam("iframename"));

    if (msg != null) {
        //msg = JSON.parse(msg);
        //bindSelfStore("sid");
        //if (getUrlParam("sid")) $("#sid").val(getUrlParam("sid"));
        //填充搜索块
        $('#searchBox').searchBox([
            {type:'store', name:'指定仓库'},
            {type:'search', name:'指定商品'}
        ]);
        if (!$('#searchBox-store input:checked').length) {
            $('#searchBox-store input').eq(0).attr('checked', 'checked');//默认取第一个仓库
        }

        refrush(currentPage);
    }

    fixTables();
});

/* ------------------------------------------ 华丽丽的分割线 ------------------------------------------ */

function buildParams(){
    var params = {};
    if ($('#store').val()) params['sid'] = $('#store').val();
    if ($("#search").val()) params['search'] = $("#search").val();
    return params;
}

/**
 * 查询单据
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = inventoryRes.reserveReadGoodByField(page, defaultPageNum, params);
        fullTable(data, params);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = {
                "sid": typeof(params['sid']) == 'undefined' ? '' : params['sid'],
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

function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = inventoryRes.reserveReadGoodByField(1, EXCEL_LINE_MAX, params);
    if (res && res.data && res.data.length){
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
            content += fieldNull(data[i].unit_price) + ',';
            content += num2total(data[i].total) + ',';
            content += total2boxtotal(data[i].total, data[i].gspec)  + ',';
            content += num2price(data[i].amount) + ',';
            content += num2total(data[i].onway_total) + ',';
            content += total2boxtotal(data[i].onway_total, data[i].gspec) + ',';
        }
        //总计
        content += '\n';
        content += '总计,';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += ',';
        content += num2total(add_up.total) + ',';
        content += ',';
        content += num2price(add_up.amount) + ',';
        content += ',';
        content += ',';
        //保存
        saveExcelFile($('head title').text(), content);
    } else {
        runnerAlert('操作提示', '查询结果为空');
    }
}
 */


/**
 * 绑定数据
 * @param data
 */
function fullTable(data, params) {
    if (data != null && data.data != null) {
        var add_up = data.add_up;
        data = data.data;
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr ondblclick='openParentForFrame(\"" + fieldNull(data[i].gname) + "\",\"/mainframe/reports/inventoryBatchReports.html?sid=" + params['sid'] + "&gid=" + data[i].gid + "\");' data-toggle='tooltip' data-placement='top' title='" + fieldNull(data[i].gname) + "'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gcode) + "</div></td>";
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + formatDatetime(data[i].gunit) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + formatDatetime(data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].unit_price) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].total, data[i].gspec) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].onway_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].onway_total, data[i].gspec) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        } else {
            //添加总计
            var data = add_up;
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class=''><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
    tipsTableTr();
}



