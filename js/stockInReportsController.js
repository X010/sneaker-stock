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
            {type:'supplier', name:'指定供应商'},
            {type:'user', name:'采购员'},
            {type:'dates', name:'起止日期'},
            {type:'in_order_type', name:'入库单类型'},
            {type:'status', name:'单据状态', data:[
                ["","- 全部 -"],
                ["1","未审核"],
                ["2","已审核"],
                //["4","已结算"],
                ["9","已作废"],
                ["10","已冲单"],
                ["11","冲单（负单）"],
                ["12","已修正"],
                ["13","修正单（负单）"]
            ]},
            {type:'settle_status', name:'结算状态'},
        ]);

        if (!$('#searchBox-store input:checked').length) {
            $('#searchBox-store input').eq(0).attr('checked', 'checked');//默认取第一个仓库
        }
        $("#begindate").val(GetDateStr(-1)).change(function(){
            refrush();
        });

        $("#enddate").val(GetDateStr(0)).change(function(){
            refrush();
        });
        refrush(currentPage);

        bindSortByField();
    }

    fixTables();
});

/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = resRCR.query('REPORTS_RESERVE_STOCK_IN_READ', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格
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

/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    var res = resRCR.download('REPORTS_RESERVE_STOCK_IN_READ', params, 1, EXCEL_LINE_MAX);
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
            content += fieldNull(data[i].order_id) + ',';
            content += fieldNull(data[i].id) + ',';
            content += type2name(data[i].type) + ',';
            content += fieldNull(data[i].uname) + ',';
            content += fieldNull(data[i].cuname) + ',';
            content += fieldNull(data[i].buname) + ',';
            content += fieldNull(data[i].runame) + ',';
            content += num2price(data[i].amount) + ',';
            content += formatDatetime(data[i].createtime) + ',';
            content += strip_tags(id2text(showInStatusListWithColor, data[i].status)) + ',';
            content += (data[i].settle_status == 1 ? '已结算' : '未结算') + ',';
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
        content += num2price(add_up.amount) + ',';
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
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    params['sid'] = '';

    if ($('#store').val()) params['sid'] = $('#store').val();
    if ($('#in_order_type').val()) params['type'] = $('#in_order_type').val();
    if ($('#status').val()) params['status'] = $('#status').val();
    if ($('#settle_status').val()) params['settle_status'] = $('#settle_status').val();
    if ($('#searchBox-supplier').val()) params['out_cid'] = $('#searchBox-supplier').val();
    if ($('#searchBox-user').val()) params['buid'] = $('#searchBox-user').val();
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();

    //console.log(params);
    return params;
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
            if (data[i].type == 1){ //采购
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/stock/createOrder.html?orderId=" + data[i].id + "&action=see\","+data[i].id+");'>";
            } else if (data[i].type == 2){ //退货
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/returngoods/createReturnGoods.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else if (data[i].type == 3){ //调入
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].order_id, "查看") + "\",\"/mainframe/inventory/createStubbsInBill.html?action=see&id=" + data[i].order_id + "\","+data[i].id+");'>";
            } else if (data[i].type == 4){ //报溢
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/inventory/createOverFlowBill.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else if (data[i].type == 5){ //盘盈
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/inventory/createOverFlowBill.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + type2name(data[i].type) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].cuname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].buname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].runame) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showInStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].settle_status == 1 ? '已结算' : '未结算') + "</div></td>";
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
            tableContent += "<td class='align-left'><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}


function type2name(type){
    var names = {
        '1': '采购',
        '2': '退货',
        '3': '调入',
        '4': '报溢',
        '5': '盘盈',
    };
    return names[type+''] ? names[type+''] : '其他';
}

