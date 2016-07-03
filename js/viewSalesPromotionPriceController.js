var priceRes = new priceRepository();

var status = 1;

/**
 *页面初始化
 */
$(function () {
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    $("#pageName").text("商品促销价格");

    $("#statusNumber").val(option);

    refrush(currentPage);

    fixTables();

});


function refrush(page) {
    var defaultPageNum = 10000;//不支持分页...那就一次取个够!
    page = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        var data = priceRes.findSalesPromotionPriceByField(page, defaultPageNum, params);
        if (data != null) {
            fullTable(data);
            if (data && data.count > defaultPageNum) {
                //需要进行分页
                var args = {
                    "option": status,
                    "gid": typeof(params['gid']) == 'undefined' ? '' : params['gid'],
                    "sid": typeof(params['sid']) == 'undefined' ? '' : params['sid'],
                };
                pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
            } else {
                $("#split").html("");
            }
        }
    }
    tableHover();
}

function buildParams(){
    status = $("#statusNumber").val();
    var sid = getUrlParam("sid");
    var gid = getUrlParam("gid");
    var params = {
        'status': status,
        'gid': gid,
        'sid': sid,
    };
    //if ($("#search").val()) params['search'] = $("#search").val();
    //console.log(params);
    return params;
}

/**
 * 填充页面数据
 * @param data
 */
function fullTable(data) {
    if (data != null) {
        data = data.data;
        $("#viewSalesPromotionPrice tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var rowContent = "<tr>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gcode + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gbarcode + "</div></td>";
            rowContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            rowContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].range) + "</div></td>";
            rowContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].in_price) + "</div></td>";
            rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].begintime) + "</div></td>";
            rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].endtime) + "</div></td>";
            rowContent += "</tr>";
            $("#viewSalesPromotionPrice tbody").append(rowContent);
        }
    }
    if (data==null||data.length == 0) {
        $("#viewSalesPromotionPrice tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}



/**
 * 返回上一层页面
 */
function goBack() {
    window.location.href = '/mainframe/reports/viewPrice.html';
}