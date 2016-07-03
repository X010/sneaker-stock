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
            {type:'dates', name:'起止日期'},
            {type:'tree_user', name:'员工分组'},
            {type:'user', name:'业务员'},
            {type:'customer', name:'客户'},
            {type:'status', name:'维护类型', data:[["","- 全部 -"], ["1","签到"], ["2","新客户申请"], ["3","老客户意见"], ["4","老客户图像"]]},
        ]);


        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(0));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(0));
        }
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
    if ($.trim($('#searchBox-user-name').val()) != ''){
        if (!checkAutoComplete('searchBox-user')) return false;
    }
    var params = {};
    if ($("#begindate").val()) params['begin_date'] = $("#begindate").val();
    if ($("#enddate").val()) params['end_date'] = $("#enddate").val();
    if ($('#tree_user').val()) params['ugid'] = $('#tree_user').val();
    if ($('#searchBox-user').val()) params['suid'] = $('#searchBox-user').val();
    if ($('#searchBox-customer').val()) params['ccid'] = $('#searchBox-customer').val();
    if ($('#status').val()) params['source'] = $('#status').val();
    return params;
}


/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (params){
        var data = resRCR.query('REPORTS_SALESMAN_GEO_READ', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格

        $("tbody a[rel='lightbox']").picbox({/* Put custom options here */}, null, function(el) {
            return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
        });

        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    } else {
        emptyTable();
    }
    tableHover();
}



/**
 * 导出当前查询的结果为Excel文件
 */
function saveExcel(){
    var params = buildParams(); //获取搜索条件
    if (params){
        var res = resRCR.download('REPORTS_SALESMAN_GEO_READ', params, 1, EXCEL_LINE_MAX);
    }
}



/**
 * 将数据填充到table
 * @param res
 */
function fullTable(res) {
    if (res != null && res.data != null) {

        var data = res.data;
        $("#mainList tbody").empty();
        $("#table-empty").hide();

        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='username'><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class='type'><div class='td-wrap'>" + source2text(data[i].source) + "</div></td>";
            tableContent += "<td class='company'><div class='td-wrap'>" + fieldNull(data[i].ccname) + "</div></td>";
            if (data[i].source == 4){ //图片
                tableContent += "<td class='memo'><div class='td-wrap'><a rel='lightbox' href='" + data[i].pic_url + "'>查看图片</a></div></td>";
            } else {
                tableContent += "<td class='memo'><div class='td-wrap'>" + fieldNull(data[i].memo) + "</div></td>";
            }

            if (fieldNull(data[i].baidu_address) != ''){ //已翻译为地址
                tableContent += "<td class='memo'><div class='td-wrap'>" + fieldNull(data[i].baidu_address) + "</div></td>";
            } else if (fieldNull(data[i].baidu_latitude) != ''){ //已拿到精确坐标
                tableContent += "<td class='memo'><div class='td-wrap'><a href='javascript:' onclick='showAddress(this, \""+data[i].baidu_latitude+"\",\""+data[i].baidu_longgitude+"\");'>查询位置</a></div></td>";
            } else if (fieldNull(data[i].latitude) != '') { //已拿到火星坐标
                tableContent += "<td class='memo'><div class='td-wrap'>（坐标转换中，请稍后）</div></td>";
            } else { //根本获取不到GPS信息
                tableContent += "<td class='memo'><div class='td-wrap'>（未上传GPS信息）</div></td>";
            }

            tableContent += "</tr>";
            //tableContent += detailContent(data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            emptyTable();
        }
    }
    formatTDOfRMB();//格式化金额列
}

/**
 * 类型描述
 * @param source
 * @returns {string}
 */
function source2text(source){
    var sources = {
        1: "签到",
        2: "新客户申请",
        3: "老客户意见",
        4: "老客户图像",
    };
    var ret = typeof(sources[source]) == 'undefined' ? '未知类型' : sources[source];
    return ret;
}

/**
 * 显示地理位置
 * @param a
 * @param latitude
 * @param longgitude
 */
function showAddress(a, latitude, longgitude){
    $(a).parent().html(gps2address(latitude, longgitude));
}

