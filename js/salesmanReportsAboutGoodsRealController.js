var resRCR = new reportsCommonRepository();


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
            {type:'stores', name:'仓库'},
            {type:'dates', name:'起止日期'},
            {type:'tree_user', name:'员工分组'},
            {type:'belong', name:'隶属关系'},
            {type:'user', name:'业务员'},
            {type:'goods', name:'指定商品'},
            {type:'status', name:'商品TOP', data:[["1","1"], ["10","10"], ["20","20"], ["50","50"], ["100","100"], ["","全部"]]},
        ]);

        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(0));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(0));
        }

        //$('#enddate').parent().parent().append('<span style="margin-left:10px;color:#D54E4E;">注意:当跨财务结算日时，将无法显示任务箱数和完成率！</span>');


        //如果从 业务员业绩查询 页面点开的,带入一些初始参数
        if (getUrlParam("suid")){
            $('#searchBox-user').val(getUrlParam("suid"));
            $('#status').val('');
        }
        if (getUrlParam("suname")) $('#searchBox-user-name').val(getUrlParam("suname")).attr('disabled', 'disabled');
        if (getUrlParam("begin_date")) $('#begindate').val(getUrlParam("begin_date"));
        if (getUrlParam("end_date")) $('#enddate').val(getUrlParam("end_date"));
        var sids = getUrlParam("sids");
        if (sids){
            sids = sids.split(',');
            $('#searchBox-stores input').each(function(){
                if ($.inArray($(this).val(), sids) != -1){
                    $(this).attr('checked', 'checked');
                }
            });
        }
        //带入参数 END

        refrush(currentPage);

        bindSortByField();
    }

    fixTables();
});


/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();
    params['sids'] = '';
    $('#searchBox-stores input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['sids'] += $(this).val() + ','; //多选
            //params['sid'] = $(this).val(); //单选
        }
    });
    if ($('#tree_user').val()) params['ugid'] = $('#tree_user').val();
    if ($('#status').val()) params['top'] = $('#status').val();
    if ($('#belong').val()) params['belong'] = $('#belong').val();
    if ($('#settle_status').val()) params['settle_status'] = $('#settle_status').val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
    if ($('#searchBox-goods').val()) params['gid'] = $('#searchBox-goods').val();
    params['gid'] = $.trim($('#searchBox-goods-name').val())=='' || !$('#searchBox-goods').val() ? '' : $('#searchBox-goods').val();
    //console.log(params);
    return params;
}


/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = resRCR.query('REPORTS_SALESMAN_GOODS_REAL_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_SALESMAN_GOODS_REAL_READ', params, 1, EXCEL_LINE_MAX);
}



/**
 * 将数据填充到table
 * @param res
 */
function fullTable(res) {
    if (res != null && res.data != null) {
        //console.log(res.data);
        //var same_month = ($('#begindate').val().split('-')[1] == $('#enddate').val().split('-')[1]);
        var same_month = res.show_task;

        var data = res.data;
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data[i].box_total) + "</div></td>";
            //var task_total = same_month ? num2total(data[i].task_total) : '';
            //tableContent += "<td class='num'><div class='td-wrap'>" + task_total + "</div></td>";
            //var complete_rate = same_month ? fieldNull(data[i].complete_rate) : '';
            //tableContent += "<td class='num'><div class='td-wrap'>" + complete_rate + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].free_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data[i].free_box_total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].return_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data[i].return_box_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data[i].return_free_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data[i].return_free_box_total) + "</div></td>";
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
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            //task_total = same_month ? num2total(data.task_total) : '';
            //tableContent += "<td class='num'><div class='td-wrap'>" + task_total + "</div></td>";
            //tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.free_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.return_amount) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.return_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2total(data.return_free_total) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'></div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}


