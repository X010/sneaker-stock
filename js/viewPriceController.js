//var priceRes = new priceRepository();
var resRCR = new reportsCommonRepository();

/**
 * 加载数据
 */
$(function () {
    if (VERSION_MODE == 'B2C') {
        $('#price1').html('非会员价');
        $('#price2').html('计价会员价');
        $('#price3').html('包年会员价');
        $('#price4').html('合伙会员价');
    }

    bindSelfStore("selfStore");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = $("#selfStore").val();

    $("#pageName").text("商品价格");

    //bindSelfStore('selfStore');
    if (getUrlParam("sid")) $("#selfStore").val(getUrlParam("sid"));
    $("#search").val(getUrlParam("search"));

    refrush(currentPage);

    $('#search').keyup(function(e){
        if (e.keyCode == 13){
            refrush();
        }
    });

    fixTables();
});



function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        //var data = resRCR.priceReadGoodByField(page, defaultPageNum, params);
        //进出货价权限区分
        var API;
        if (checkPower(9004)){
            API = 'REPORTS_BASE_GOODS_PRICE_IN_READ';
        } else if (checkPower(9005)){
            API = 'REPORTS_BASE_GOODS_PRICE_OUT_READ';
        }
        var data = resRCR.query(API, params, page, defaultPageNum);
        if (data != null) {
            fullTable(data);
            if (data && data.count > defaultPageNum) {
                //需要进行分页
                var args = {
                    "search": typeof(params['search']) == 'undefined' ? '' : params['search'],
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
    var sid = $("#selfStore").val();
    var params = {
        'sid': sid,
    };
    if ($("#search").val()) params['search'] = $("#search").val();
    //console.log(params);
    return params;
}

/**
 * 绑定数据
 * @param data
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#viewPrice tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr data-toggle='tooltip' data-placement='top' title='" + fieldNull(data[i].gname) + "'>";
            var company_price = data[i].company_price;
            var store_price = data[i].store_price;
            //tableContent += "<td>" + fieldNull(data[i].gid) + "</td>";
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td><div class='td-wrap'>" + fieldNull(data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gunit) + "</div></td>";
            if (fieldNull(store_price.in_price) == ''){
                $('#viewPrice th').eq(6).hide();
            } else {
                tableContent += "<td class='price bl'><div class='td-wrap'>" + fieldNull(store_price.in_price) + "</div></td>";
            }
            if (fieldNull(store_price.out_price1) == ''){
                $('#viewPrice th').eq(7).hide();
                $('#viewPrice th').eq(8).hide();
                $('#viewPrice th').eq(9).hide();
                $('#viewPrice th').eq(10).hide();
            } else {
                tableContent += "<td class='price bl'><div class='td-wrap'>" + fieldNull(store_price.out_price1) + "</div></td>";
                tableContent += "<td class='price bl'><div class='td-wrap'>" + fieldNull(store_price.out_price2) + "</div></td>";
                tableContent += "<td class='price bl'><div class='td-wrap'>" + fieldNull(store_price.out_price3) + "</div></td>";
                tableContent += "<td class='price bl'><div class='td-wrap'>" + fieldNull(store_price.out_price4) + "</div></td>";
            }
            tableContent += "<td class='bl' align='center'><div class='td-wrap'><a name='viewSalesPromotionPrice' class='btn btn-sm btn-default' href='/mainframe/reports/viewSalesPromotionPrice.html?sid=" + $("#selfStore").val() + "&gid=" + data[i].gid + "'>查看促销价</a></div></td>";
            tableContent += "</tr>";

            $("#viewPrice tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#viewPrice tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
    tipsTableTr();

    //按钮权限
    if (!checkPower(12005)){
        $('a[name="viewSalesPromotionPrice"]').attr('href', 'javascript:').addClass('disabled');
    }
}
