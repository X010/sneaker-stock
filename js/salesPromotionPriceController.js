var priceRes = new priceRepository();

var status = '';
var currentPage;

/**
 * 页面初始化
 */
$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') option = status;
    else status = option;

    //新建按钮
    if (!checkPower(64)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建进价促销单', "/mainframe/price/createSalesPromotionPrice.html?iframeid=64&iframename=" + encodeURI("新建进价促销单"), 64);
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
        //msg = JSON.parse(msg);
        $("#statusNumber").val(status);
        $("#sorderid").val(getUrlParam("sorderid"));
        bindSelfStore("sid");
        $("#sid").prepend('<option value="">- 全部 -</option><option value="-1">公司</option>');

        bindAutoCompleteCommon('search_goods', 'goods');

        refrush(currentPage);
    }
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = priceRes.findStockinSalePromotionPriceByField(currentPage, defaultPageNum, params);
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
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#sid").val()) params['sid'] = $("#sid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    if ($.trim($("#search_goods").val()) != '' && $("#search_goods_id").val()) params['gid'] = $("#search_goods_id").val();
    return params;
}


/**
 * 填充表格
 * @param data
 */
function fullTable(data) {
    if (data != null) {
        data = data.data;
        $("#stockInSalePromotionPriceList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 1){
                var rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审") + "\",\"/mainframe/price/createSalesPromotionPrice.html?page=" + currentPage + "&action=ch&id=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                var rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/price/createSalesPromotionPrice.html?page=" + currentPage + "&action=see&id=" + data[i].id + "\","+data[i].id+");'>";
            }
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].id + "</div></td>";
            rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + (data[i].snames ? data[i].snames : '公司') + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            rowContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].memo) + "</div></td>";
            //rowContent += "<td>" + fieldNull(data[i].begintime) + "</td>";
            //rowContent += "<td>" + fieldNull(data[i].endtime) + "</td>";
            rowContent += "<td class=''><div class='td-wrap'>" + stockInSalePromotionPriceStatusShow(data[i].status) + "</div></td>";

            //rowContent += "<td><a class='btn-small btn-op' href='javascript:openParentForFrame(\"" + simpleBillNo(data[i].id, "SSIP") + "\",\"/mainframe/price/createSalesPromotionPrice.html?action=ch&id=" + data[i].id + "\")'>查看</a></td>";
            rowContent += "</tr>";
            $("#stockInSalePromotionPriceList tbody").append(rowContent);
        }
    }
    if (data==null||data.length == 0) {
        $("#stockInSalePromotionPriceList tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}

/**
 * 状态转换
 */
function stockInSalePromotionPriceStatusShow(pricestatus) {
    switch (pricestatus) {
        case "1":
            return "<span class='status-uncheck'>未审核</span>";
        case "2":
            return "<span class='status-checked'>已审核</span>";
        case "9":
            return "<span class='status-cancel'>已作废</span>";
    }
}