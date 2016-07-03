var resRCR = new reportsCommonRepository();


/* --------------------------------- 华丽丽的分割线 --------------------------------------- */

/**
 * 页面初始数据
 */
$().ready(function () {
    //var currentPage = getUrlParam("page");
    //if (currentPage == null) currentPage = 1;
    $("#pageName").text(getUrlParam("iframename"));

    var msg = cookieUtil("userprofile");
    if (msg != null) {
        //msg = JSON.parse(msg);
        //填充搜索块
        $('#searchBox').searchBox([
            {type:'dates', name:'起止日期'},
            {type:'store', name:'指定仓库'},
            {type:'goods', name:'指定商品'},
        ]);


        if (!$('#begindate').val()) {
            $('#begindate').val(GetDateStr(0));
        }
        if (!$('#enddate').val()) {
            $('#enddate').val(GetDateStr(0));
        }
        //refrush(currentPage);
        $("#table-empty").empty().append("没有记录").show();
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
    if (params['gid']){
        var data = resRCR.query('REPORTS_RESERVE_BOOK_READ', params, page, defaultPageNum);
        fullTable(data); //填充数据到表格
        /*
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
        */
    }
    tableHover();
}

/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    params['gid'] = $('#searchBox-goods').val();
    if ($("#store").val()) params['sid'] = $("#store").val();
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
    if (res != null) {
        var data = res;
        $("#mainList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].checktime) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + bigType(data[i].big_type) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].small_type_name) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].cuname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + num2price(data[i].total) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + fieldNull(data[i].amount) + "</div></td>";
            tableContent += "</tr>";
            //tableContent += detailContent(data[i]); //预加载模式
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}

/**
 * 单据种类翻译
 * @param i
 * @returns {string}
 */
function bigType(i){
    i = i ? parseInt(i) : 0;
    var data = [
        '未知', //0
        '订单', //1
        '入库', //2
        '出库', //3
        '调价', //4
        '临时调价', //5
    ];
    return data[i];
}
