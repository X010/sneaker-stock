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
    if (!checkPower(18)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建退货单', "/mainframe/returngoods/createOutReturnGoods.html?iframeid=18&iframename=" + encodeURI("新建退货单"), 18);
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
        //bindSupplier("supplier");
        //$("#supplier").prepend('<option value="">- 全部 -</option>');
        //$("#supplier").val(getUrlParam("supplier"));
        //bindSelfUser('suid');
        //$("#suid").prepend('<option value="">- 全部 -</option>');
        //$("#suid").val(getUrlParam("suid"));
        $("#sorderid").val(getUrlParam("sorderid"));
        bindOutStatusSelect("statusNumber", ",2,3,4,5,6,7,8,9,10,11,12,13,14,");
        $("#statusNumber").prepend('<option value="">- 全部 -</option>');
        $("#statusNumber").val(status);

        bindAutoCompleteCommon('supplierName', 'supplier');
        //bindAutoCompleteCommon('suname', 'user');
        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    status = $("#statusNumber").val();
    var params = buildParams();
    if (1){
        var data = returnRes.findAllReturnOutBill_INField(currentPage, defaultPageNum, params);
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
    var params = {
        "option": status,
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#settle_status").val()) params['settle_status'] = $("#settle_status").val();
    if ($("#supplier").val()) params['in_cid'] = $("#supplier").val();
    //if ($("#suid").val()) params['suid'] = $("#suid").val();
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
        $("#returnGoods_in tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 1 || data[i].status == 2 || data[i].status == 3) {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/returngoods/createOutReturnGoods.html?page=" + currentPage + "&action=co&orderId=" + data[i].id + "\","+data[i].id+");'>";
                //data[i].status = "<span class='status-uncheck'>未审核</span>";
            } else if (data[i].status == 4) {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已审") + "\",\"/mainframe/returngoods/createOutReturnGoods.html?page=" + currentPage + "&action=xcd&orderId=" + data[i].id + "\","+data[i].id+");'>";
                //data[i].status = "<span class='status-checked'>已审核</span>";
            } else {
                var tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/returngoods/createOutReturnGoods.html?page=" + currentPage + "&action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].in_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOutStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].settle_status == 1 ? '已结算' : '未结算') + "</div></td>";
            tableContent += "</tr>";
            $("#returnGoods_in tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#returnGoods_in tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}



