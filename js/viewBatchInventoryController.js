/*调拔单列表*/
var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var inventoryRes = new inventoryRepository();

var gid = 0;
var sid = 0;

/**
 * 加载数据
 */
$(function () {

    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = 1;

    $("#pageName").text("批次库存明细："+getUrlParam("iframename"));

    refrush(currentPage);

    fixTables();
});



function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams();
    if (params){
        var data = inventoryRes.reserveRead(page, defaultPageNum, params['sid'], params['gid']);
        fullTable(data);
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



function buildParams(){
    var params = {
        'gid': getUrlParam("gid"),
        'sid': getUrlParam("sid")
    };
    return params;
}

/**
 * 绑定数据
 * @param data
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            //tableContent += "<td>" + fieldNull(data[i].id) + "</td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gcode) + "</div></td>";
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + num2total(data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gunit) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].unit_price) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2total(data[i].total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount_price) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].box_total) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].batch) + "</div></td>";
            //tableContent += "<td>" + fieldNull(data[i].freeze_total) + "</div></td>";
            //tableContent += "<td class='order'><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fromType(data[i].from) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].scname) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + fieldNull(data[i].prodate) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + fieldNull(data[i].expdate) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            emptyTable();
        }
    }
    formatTDOfRMB();//格式化金额列
}

