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
            {type:'date', name:'指定日期'},
            {type:'pay_types', name:'支付方式'},
            {type:'user', name:'业务员'},
        ]);


        if (!$('#date').val()) {
            $('#date').val(GetDateStr(0));
        }
        refrush(currentPage);

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
    if ($("#date").val()) params['date'] = $("#date").val();
    //if ($('#pay_type').val()) params['pay_type'] = $('#pay_type').val();
    params['pay_types'] = '';
    $('#searchBox-pay_types input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['pay_types'] += $(this).val() + ','; //多选
        }
    });
    if ($("#searchBox-user").val()) params['suid'] = $("#searchBox-user").val();
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
        var data = resRCR.query('REPORTS_FINANCE_SETTLE_READ', params, page, defaultPageNum);
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
    var res = resRCR.download('REPORTS_FINANCE_SETTLE_READ', params, 1, EXCEL_LINE_MAX);
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
            var amount_should = num2price(parseFloat(data[i].discount_amount) + parseFloat(data[i].amount)); //应结
            content += '\n';
            content += fieldNull(data[i].suname) + ',';
            content += id2text(getPayTypeList(), data[i].pay_type) + ',';
            content += amount_should + ',';
            content += num2price(data[i].discount_amount) + ',';
            content += num2price(data[i].amount) + ',';
            content += num2price(data[i].tax_amount) + ',';
        }
        //总计
        var amount_should_add_up = num2price(parseFloat(add_up.discount_amount) + parseFloat(add_up.amount)); //应结
        content += '\n';
        content += '总计,';
        content += ',';
        content += amount_should_add_up + ',';
        content += num2price(add_up.discount_amount) + ',';
        content += num2price(add_up.amount) + ',';
        content += num2price(add_up.tax_amount) + ',';
        //保存
        saveExcelFile($('head title').text(), content);
    } else {
        runnerAlert('操作提示', '查询结果为空');
    }*/
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
            var amount_should = num2price(parseFloat(data[i].discount_amount) + parseFloat(data[i].amount)); //应结
            var tableContent = "<tr>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].suname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(getPayTypeList(), data[i].pay_type) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + amount_should + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].discount_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data[i].tax_amount) + "</div></td>";
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
            var amount_should = num2price(parseFloat(data.discount_amount) + parseFloat(data.amount)); //应结
            var tableContent = "<tr class='add-up'>";
            tableContent += "<td class=''><div class='td-wrap'>总计</div></td>";
            tableContent += "<td class=''><div class='td-wrap'></div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + amount_should + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.discount_amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.amount) + "</div></td>";
            tableContent += "<td class='price'><div class='td-wrap'>" + num2price(data.tax_amount) + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
    }
    formatTDOfRMB();//格式化金额列
}

/* --------------------------------- 华丽丽的分割线 --------------------------------------- */


/*
 * 支付方式列表
 */
function getPayTypeList(){
    var ret = [];
    $('#searchBox-pay_types li').each(function(){
        var id = $(this).find('input').val();
        var text = $(this).find('label').text();
        ret.push({
            "id":id,
            "text":text,
        });
    });
    return ret;
}

