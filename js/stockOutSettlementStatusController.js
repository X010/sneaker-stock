var resRCR = new reportsCommonRepository();



/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 页面初始数据
 */
$().ready(function () {
    //跳转初始化参数
    var in_cid = getUrlParam("in_cid");
    var in_cname = getUrlParam("in_cname");
    var begin_date = getUrlParam("begin_date");
    var end_date = getUrlParam("date");
    var sid = getUrlParam("sids");
    var status = getUrlParam("status");
    var settle_status = getUrlParam("settle_status");

    var currentPage = getUrlParam("page");
    if (currentPage == null) currentPage = 1;
    $("#pageName").text(getUrlParam("iframename"));

    var msg = cookieUtil("userprofile");
    if (msg != null) {
        //msg = JSON.parse(msg);
        //填充搜索块
        $('#searchBox').searchBox([
            {type:'store', name:'指定仓库'},
            {type:'status', name:'单据状态', data:[
                ["","- 全部 -"],
                //["2","未审核"],
                ["3","缺货待配"],
                ["4","已审核"],
                //["9","已作废"],
                //["10","已冲单"],
                //["11","冲单（负单）"],
                //["12","已修正"],
                //["13","修正单（负单）"]
            ]},{type:'settle_status', name:'结算状态'},
            {type:'customer', name:'指定客户'},
            {type:'user', name:'业务员'},
            {type:'dates', name:'审核日期'},
            {type:'dates', name:'结算日期', prefix:'settle_'},
        ]);


        $('#store').prepend('<option value="">- 全部 -</option>').val(sid);
        $('#searchBox-customer').val(in_cid);
        $('#searchBox-customer-name').val(in_cname);
        $('#status').val(status);
        $('#settle_status').val(settle_status);

        begin_date = begin_date ? begin_date : GetDateStr(0);
        $("#begindate").val(begin_date).change(function(){
            $("#settle_begindate").val('');
            $("#settle_enddate").val('');
            refrush();
        });
        end_date = end_date ? end_date : GetDateStr(0);
        $("#enddate").val(end_date).change(function(){
            $("#settle_begindate").val('');
            $("#settle_enddate").val('');
            refrush();
        });

        $("#settle_begindate").change(function(){
            $("#begindate").val('');
            $("#enddate").val('');
            refrush();
        });
        $("#settle_enddate").change(function(){
            $("#begindate").val('');
            $("#enddate").val('');
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
        var data = resRCR.query('REPORTS_FINANCE_STOCK_OUT_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_FINANCE_STOCK_OUT_READ', params, 1, EXCEL_LINE_MAX);
    /*
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
            content += fieldNull(data[i].order_id) + ',';
            content += fieldNull(data[i].id) + ',';
            content += type2name(data[i].type) + ',';
            content += fieldNull(data[i].in_cname) + ',';
            content += fieldNull(data[i].uname) + ',';
            content += fieldNull(data[i].cuname) + ',';
            content += fieldNull(data[i].suname) + ',';
            content += fieldNull(data[i].runame) + ',';
            content += num2price(data[i].amount) + ',';
            content += formatDatetime(data[i].createtime) + ',';
            content += strip_tags(id2text(showOutStatusListWithColor, data[i].status)) + ',';
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
    }
    */
}

/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    if ($('#store').val()) params['sid'] = $('#store').val();
    //if ($('#out_order_type').val()) params['type'] = $('#out_order_type').val();
    if ($('#status').val()) params['status'] = $('#status').val();
    if ($('#settle_status').val()) params['settle_status'] = $('#settle_status').val();
    if ($('#searchBox-customer').val()) params['in_cid'] = $('#searchBox-customer').val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
    if ($("#begindate").val()) params['check_begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['check_end_date'] = $("#enddate").val();
    if ($("#settle_begindate").val()) params['settle_begin_date'] = $("#settle_begindate").val();
    if ($("#settle_enddate").val()) params['settle_end_date'] = $("#settle_enddate").val();
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
            if (data[i].type == 1){ //销售
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/sale/createThelibrary.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>"
            } else if (data[i].type == 2){ //退货
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看") + "\",\"/mainframe/returngoods/createOutReturnGoods.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else if (data[i].type == 3){ //调出
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].order_id, "查看") + "\",\"/mainframe/inventory/createStubbsOutBill.html?action=see&id=" + data[i].order_id + "\","+data[i].id+");'>";
            } else if (data[i].type == 4){ //报损
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/inventory/createReportedLossBill.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            } else if (data[i].type == 5){ //盘亏
                tableContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "查看")  + "\",\"/mainframe/inventory/createReportedLossBill.html?action=see&orderId=" + data[i].id + "\","+data[i].id+");'>";
            }
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].order_id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + type2name(data[i].type) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].in_cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].cuname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].runame) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(showOutStatusListWithColor, data[i].status) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].settle_status == 1 ? '已结算' : '未结算') + "</div></td>";
            /*
            var diffDays = data[i].lastdate ? diffDate(GetDateStr(0), data[i].lastdate) : 0;
            if (data[i].settle_status == 1 || data[i].status != 4){
                diffDays = '';
            } else {
                diffDays += '天';
            }
            */
            var diffDays = (data[i].delay_days === 0 || data[i].delay_days) ? data[i].delay_days + '天' : '';
            tableContent += "<td class=''><div class='td-wrap'>" + diffDays + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].settletime) + "</div></td>";
            var driver = fieldNull(data[i].duname, '无')!='无' ? (fieldNull(data[i].duname) + '(' + fieldNull(data[i].dphone) + ')') : '';
            tableContent += "<td class=''><div class='td-wrap'>" + driver + "</div></td>";
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
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
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
        '1': '销售',
        '2': '退货',
        '3': '调出',
        '4': '报损',
        '5': '盘亏',
    };
    return names[type+''] ? names[type+''] : '其他';
}

