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
            {type:'company_type', name:'客户类型'},
            {type:'dates', name:'注册日期'},
            {type:'area', name:'经营地域'},
            //{type:'goods_type', name:'经营范围'},
            {type:'user', name:'业务员'},
            {type:'search', name:'客户名称'},
        ]);

        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(0));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(0));
        }

        refrush(currentPage);
    }

    fixTables();
});

/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    //var defaultPageNum = 1;
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = resRCR.query('REPORTS_BASE_CUSTOMER_READ', params, page, defaultPageNum);
        //var data = resRBR.findCustomAll(page, defaultPageNum, params);
        fullTable(data); //填充数据到表格
        $('#countYes').text(data.trade_total); //有交易客户数
        $('#countNo').text(data.count - data.trade_total); //无交易客户数
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
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    if ($("#search").val()) params['search'] = $("#search").val();
    params['types'] = '';
    $('#searchBox-company_type input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['types'] += $(this).val() + ',';
        }
    });
    if ($("#areapro").val()) params['areapro'] = $("#areapro").val();
    if ($("#areacity").val()) params['areacity'] = $("#areacity").val();
    if ($("#areazone").val()) params['areazone'] = $("#areazone").val();
    if ($('#searchBox-user').val()) params['suids'] = $('#searchBox-user').val();
    if ($('#begindate').val()) params['begin_date'] = $('#begindate').val();
    if ($('#enddate').val()) params['end_date'] = $('#enddate').val();

    //console.log(params);
    return params;
}


/**
 * 将数据填充到table
 * @param res
 */
function fullTable(res) {
    if (res != null && res.data != null) {
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < res.data.length; i++) {
            var tableContent = "<tr class='clickable' onclick='showDetail(this)'>";
            tableContent += "<td class='op'><div class='td-wrap'><i class='fa fa-plus-square-o'></i></div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].name) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + companyType(res.data[i].cctype) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].period) + "天</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].out_sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].suname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + fieldNull(res.data[i].trade_total) + "</div></td>";
            tableContent += "</tr>";
            tableContent += detailContent(res.data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (res.data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}

/**
 * 展示某一行的详情
 * @param tr
 */
function showDetail(tr){
    var detail = $('#showDetail');
    if (detail){
        //其他行则打开
        if ($(tr).index() != detail.prev().index()) {
            detail.removeAttr('id').hide();
            //$(tr).after(detailContent(data)); //后加载模式
            $(tr).next().attr('id', 'showDetail').show();
            $("td.op i").removeClass().addClass("fa fa-plus-square-o");
            $(tr).find("i").removeClass().addClass("fa fa-minus-square-o");
        }
        //当前行则关闭
        else {
            detail.removeAttr('id').hide();
            $(tr).find("i").removeClass().addClass("fa fa-plus-square-o");
        }
    }
}

/**
 * 组织详情数据,用单独一行作为扩展详情区域
 * @param data
 * @returns {string}
 */
function detailContent(data) {
    var html = '<tr style="display:none;"><td colspan="9" class="report-item-detail-wrap">';
    //基础信息
    html += '<div class="report-item-detail">' +
        '<h3 class="title">基础信息</h3>' +
        '<div class="list">' +
        '<li><label>联系人：</label><span>' + fieldNull(data.contactor) + '</span></li>' +
        '<li><label>联系电话：</label><span>' + fieldNull(data.contactor_phone) + '</span></li>' +
        '<li><label>公司地址：</label><span>' + fieldNull(data.address) + '</span></li>' +
        '<li><label>公司电话：</label><span>' + fieldNull(data.phone) + '</span></li>' +
        '<li><label>经营地域：</label><span>' + fieldNull(data.areapro) + ' ' + fieldNull(data.areacity) + ' ' + fieldNull(data.areazone) + ' ' + '</span></li>' +
        '<li><label>经营范围：</label><span>' + fieldNull(data.gtnames) + '</span></li>' +
        '<li><label>企业税号：</label><span>' + fieldNull(data.tax_no) + '</span></li>' +
        '<li><label>营业执照：</label><span>' + fieldNull(data.license) + '</span></li>' +
        '</ul></div></div>';


    html += '</td></tr>';
    return html;
}