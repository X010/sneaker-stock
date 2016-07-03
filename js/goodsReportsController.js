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
            {type:'goods_type', name:'商品分类'},
            {type:'supplier', name:'供应商'},
            {type:'price', name:'价格'},
            {type:'search', name:'关键字'}
        ]);

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
    page = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        //var data = resRBR.findGoodsAll(page, defaultPageNum, params);
        var data = resRCR.query('REPORTS_BASE_GOODS_READ', params, page, defaultPageNum);
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
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {};
    //先取小分类
    params['tids'] = '';
    $('#searchBox-goods_subtype input').each(function(){
        if ($(this).attr('checked') == 'checked'){
            params['tids'] += $(this).val() + ',';
        }
    });
    //小分类没有,则取大分类
    if (params['tids'] == '') {
        $('#searchBox-goods_type input').each(function(){
            if ($(this).attr('checked') == 'checked'){
                params['tids'] += $(this).val() + ',';
            }
        });
    }
    //价格带
    var prices = $('#searchBox-price').val().split('-');
    params['price_min'] = prices[0];
    params['price_max'] = prices[1];

    if ($("#search").val()) params['search'] = $("#search").val();
    if ($('#searchBox-supplier').val()) params['scids'] = $('#searchBox-supplier').val();

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
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gcode) + "</div></td>";
            tableContent += "<td class='w200 align-left'><div class='td-wrap'>" + fieldNull(res.data[i].gname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gbarcode) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gunit) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gspec) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].gtname) + "</div></td>";
            tableContent += "<td class='num'><div class='td-wrap'>" + float2percent(res.data[i].gtax_rate) + "</div></td>";
            //tableContent += "<td class='cate'><div class='td-wrap'>" + fieldNull(res.data[i].gbname) + "</div></td>";
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
function detailContent(data){
    var html = '<tr style="display:none;"><td colspan="9" class="report-item-detail-wrap">';
    //基础信息
    var goods = data.goods;
    html += '<div class="report-item-detail clearfix">'+
                '<h3 class="title">基础信息</h3>'+
                '<div class="list-inline clearfix"><ul>'+
                    '<li><label>保质期：</label><span>'+fieldNull(goods.valid_period)+' 天</span></li>'+
                    '<li><label>厂商：</label><span>'+fieldNull(goods.factory)+'</span></li>'+
                    '<li><label>产地：</label><span>'+fieldNull(goods.place)+'</span></li>'+
                    '<li><label>品牌：</label><span>'+fieldNull(data.gbname)+'</span></li>'+
                    '<li><label>箱重：</label><span>'+(data.weight ? fieldNull(data.weight)+' Kg' : '')+'</span></li>'+
                '</ul></div>'+
            '</div>';


    //默认价格
    html += '<div class="report-item-detail clearfix">' +
        '<h3 class="title">公司默认价格(单位:元)</h3><div class="list">';
    html += '<ul class="report-price-table clearfix">';
    html += '<li><span class="th">进货价</span><span class="td">'+data.in_price+'</span></li>';
    if (VERSION_MODE == 'B2C') {
        html += '<li><span class="th">非会员价</span><span class="td">'+data.out_price1+'</span></li>';
        html += '<li><span class="th">计价会员价</span><span class="td">'+data.out_price2+'</span></li>';
        html += '<li><span class="th">包年会员价</span><span class="td">'+data.out_price3+'</span></li>';
        html += '<li><span class="th">合伙会员价</span><span class="td">'+data.out_price4+'</span></li>';
    } else {
        html += '<li><span class="th">经销价</span><span class="td">'+data.out_price1+'</span></li>';
        html += '<li><span class="th">酒店价</span><span class="td">'+data.out_price2+'</span></li>';
        html += '<li><span class="th">商超价</span><span class="td">'+data.out_price3+'</span></li>';
        html += '<li><span class="th">便利店价</span><span class="td">'+data.out_price4+'</span></li>';
    }
    html += '</ul></div></div>';


    //供应商
    var supplier = data.goods_supplier;
    html += '<div class="report-item-detail clearfix"><h3 class="title">供应商</h3><div class="list"><ul>';
    for (var i in supplier){
        html += '<li><span>['+formatDatetime(supplier[i].createtime)+'] </span><span>'+supplier[i].scname+'</span></li>';
    }
    html += '</ul></div></div>';

    html += '</td></tr>';
    return html;
}


