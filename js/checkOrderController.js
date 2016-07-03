var stockRes = new stockRepository();
var storeRes = new restStoreRepository();

var status = '';
var currentPage;

$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(12)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建订单', "/mainframe/stock/createOrder.html?iframeid=12&iframename=" + encodeURI("新建订单"), 12);
        });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    var days_begin = getUrlParam("days_begin");
    if (days_begin == null || days_begin == 'undefined') days_begin = GetDateStr(-days_view);
    $("#begin_date").change(function(){
        refrush();
    }).val(days_begin);
    $("#end_date").change(function(){
        refrush();
    }).val(GetDateStr(0));

    if (msg != null) {
        //msg = JSON.parse(msg);
        //bindSupplier("supplier");
        //$("#supplier").prepend('<option value="">- 全部 -</option>');
        //$("#supplier").val(getUrlParam("supplier"));
        //bindSelfUser('buid'); //采购员
        //$("#buid").prepend('<option value="">- 全部 -</option>');
        //$("#buid").val(getUrlParam("buid"));
        $("#sorderid").val(getUrlParam("sorderid"));
        $("#statusNumber").val(status);

        bindOrderRankSelect("rank", '');
        $("#rank").prepend('<option value="" selected>- 全部 -</option>');
        bindAutoCompleteCommon('supplierName', 'supplier');
        //bindAutoCompleteCommon('buname', 'user');
        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }

    fixTables();
});


/**
 * 查询订单
 */
function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = stockRes.findOrderAllByField(currentPage, defaultPageNum, params);//读取未审核订单
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, currentPage, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}

function buildParams(){
    status = $("#statusNumber").val();
    var params = {
        'option': status,
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#rank").val()) params['rank'] = $("#rank").val();
    if ($("#supplier").val()) params['out_cid'] = $("#supplier").val();
    //if ($("#buid").val()) params['buid'] = $("#buid").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    //console.log(params);
    return params;
}


/**
 * 填充表格
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#checkOrder tbody").empty();
        $("#table-empty").empty().hide();
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].status);

            if (data[i].status == '未审核'){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/stock/createOrder.html?page=" + currentPage + "&action=co&option=1&orderId=" + data[i].id + "\","+data[i].id+")'>";
                data[i].status = '<span class="status-uncheck">未审核</span>';
            } else if (data[i].status == '已审核') {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审") + "\",\"/mainframe/stock/createOrder.html?page=" + currentPage + "&action=cs&option=2&orderId=" + data[i].id + "\","+data[i].id+")'>";
                data[i].status = '<span class="status-checked">已审核</span>';
            } else { //已作废
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/stock/createOrder.html?page=" + currentPage + "&action=seeorder&option=2&orderId=" + data[i].id + "\","+data[i].id+")'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            //tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].mall_orderno) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].out_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].in_sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].buname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOrderRankListwithColor, data[i].rank) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            //tableContent += "<td class='status'><div class='td-wrap'>" + (data[i].ouname ? '<span class="status-delivered">已出库</span>' : '<span class="status-undeliver">未出库</span>') + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].iuname) + "</div></td>";
            tableContent += "</tr>";
            $("#checkOrder tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#checkOrder tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}
