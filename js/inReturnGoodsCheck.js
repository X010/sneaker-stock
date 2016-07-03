var stockRes = new stockRepository();
var storeRes = new restStoreRepository();
var customRes = new customRepository();
var returnRes = new returnGoodsRepository();

var status = '';
var currentPage;

/**
 * 加载数据
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(28)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建客户退货单', "/mainframe/returngoods/createReturnGoods.html?iframeid=28&iframename=" + encodeURI("新建客户退货单"), 28);
        });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    $("#begin_date").change(function(){
        refrush();
    }).val(GetDateStr(-days_view));
    $("#end_date").change(function(){
        refrush();
    }).val(GetDateStr(0));

    if (msg != null) {
        msg = JSON.parse(msg);
        //bindSupplier("custom");
        //$("#custom").prepend('<option value="">- 全部 -</option>');
        //$("#custom").val(getUrlParam("custom"));
        //bindSelfUser('buid');
        //$("#buid").prepend('<option value="">- 全部 -</option>');
        //$("#buid").val(getUrlParam("buid"));
        $("#sorderid").val(getUrlParam("sorderid"));
        bindInStatusSelect("statusNumber", ",1,2,3,4,5,6,7,8,9,10,11,12,13,14,");
        $("#statusNumber").prepend('<option value="">- 全部 -</option>');
        $("#statusNumber").val(status);

        bindAutoCompleteCommon('customName', 'customer');
        //bindAutoCompleteCommon('buname', 'user');
        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = returnRes.findAllReturnInBillField(currentPage, defaultPageNum, params);
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
        "option": status
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#settle_status").val()) params['settle_status'] = $("#settle_status").val();
    if ($("#custom").val()) params['out_cid'] = $("#custom").val();
    //if ($("#buid").val()) params['buid'] = $("#buid").val();
    if ($("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    //console.log(params);
    return params;
}


function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#returningoods_in tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 1){
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审")  + "\",\"/mainframe/returngoods/createReturnGoods.html?page=" + currentPage + "&action=ch&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else if (data[i].status == 2) {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审")  + "\",\"/mainframe/returngoods/createReturnGoods.html?page=" + currentPage + "&action=xcd&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/returngoods/createReturnGoods.html?page=" + currentPage + "&action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].out_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].buname) + "</div></td>"; //责任人
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showInStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].settle_status == 1 ? '已结算' : '未结算') + "</div></td>";
            tableContent += "</tr>";
            $("#returningoods_in tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#returningoods_in tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}


