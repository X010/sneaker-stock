/**
 * 报表顶部搜索块
 * author: Linvo
 *
 * type:
 *          search          关键字搜索
 *          goods           商品检索(自动提示)
 *          goods_type      商品分类
 *          supplier        供应商(自动提示)
 *          customer        客户(自动提示)
 *          user            员工(自动提示)
 *          price           价格带(select)
 *          company_type    公司类型(多选)
 *          area            地域
 *          store           仓库(select)
 *          stores          仓库(多选)
 *          date            日期
 *          dates           起止日期
 *          status          状态(select)
 *          settle_status   结算状态(select)
 *          out_order_type  出库单类型(select)
 *          in_order_type   入库单类型(select)
 *          pay_types       支付方式(多选)
 *          pay_type        支付方式(select)
 *          year            年份(select)
 *          belong          业务员隶属关系(select)
 *          tree_user       员工分组(select+tree)
 *
 */
(function ($) {

    //默认要显示的搜索块
    var defaults = [
        {type: 'search', name: '关键字'}
    ];

    /**
     * 按指定内容和顺序输出搜索块
     * 用法: $('#searchBox').searchBox([
     *          {type:'goods_type', name:'商品分类'},
     *          {type:'supplier', name:'供应商'},
     *          {type:'price', name:'价格'},
     *          {type:'search', name:'关键字'},
     *          {type:'dates', name:'结算日期', prefix:'settle_'}
     *          {type:'status', name:'状态', data:[["","- 全部 -"], ["2","未结算"], ["3","已结算"]]}
     *      ]);
     *
     * @param opts 指定搜索块类型及顺序
     */
    $.fn.searchBox = function (opts) {
        var sets = $.extend(defaults, opts || []);
        var html = '';
        for (var i in sets){
            //关键字搜索
            var id = 'searchBox-' + sets[i].type;
            switch (sets[i].type){
                case 'search':
                    html += formatSearchKey(sets[i].name);
                    break;

                //商品分类
                case 'goods_type':
                    //var resGoods = new restGoodsRepository(); //系统商品分类
                    //var data = resGoods.findGoodsType();
                    var GTR = new goodsTypeRepository(); //公司商品分类
                    var data = GTR.readType();
                    var html_li = '';
                    if (data && data.data) {
                        data = data.data;
                        for (var j in data) {
                            html_li += '<li class="radio-inline col-xs-4 col-sm-2 col-md-2 col-lg-2"><label><input type="radio" id="gt_' + data[j].id + '" name="gt" value="' + data[j].id + '" /> ' + data[j].name + '</label></li>';
                        }
                    }
                    html += formatSearchBox(id, sets[i].name, html_li);
                    break;

                //供应商
                case 'supplier':
                    var set_supplier = 1;
                    html += formatAutoInput(id, sets[i].name);
                    break;

                //客户
                case 'customer':
                    var set_customer = 1;
                    html += formatAutoInput(id, sets[i].name);
                    break;

                //员工
                case 'user':
                    var set_user = 1;
                    html += formatAutoInput(id, sets[i].name);
                    break;

                //商品
                case 'goods':
                    var set_goods= 1;
                    html += formatAutoInput(id, sets[i].name);
                    break;

                //价格带
                case 'price':
                    var html_li = '';
                    html_li += '<option value="0-">- 全部 -</option>';
                    html_li += '<option value="0-50">0-50</option>';
                    html_li += '<option value="50-100">50-100</option>';
                    html_li += '<option value="100-500">100-500</option>';
                    html_li += '<option value="500-1000">500-1000</option>';
                    html_li += '<option value="1000-">1000+</option>';
                    html += formatSearchBoxSelect(id, sets[i].name, html_li);
                    break;

                //公司类型
                case 'company_type':
                    var html_li = '';
                    html_li += '<li class="checkbox-inline col-xs-4 col-sm-2 col-md-3 col-lg-2"><label><input type="checkbox" value="1" /> 经销商</label></li>';
                    html_li += '<li class="checkbox-inline col-xs-4 col-sm-2 col-md-3 col-lg-2"><label><input type="checkbox" value="2" /> 酒店饭店</label></li>';
                    html_li += '<li class="checkbox-inline col-xs-4 col-sm-2 col-md-3 col-lg-2"><label><input type="checkbox" value="3" /> 商场超市</label></li>';
                    html_li += '<li class="checkbox-inline col-xs-4 col-sm-2 col-md-3 col-lg-2"><label><input type="checkbox" value="4" /> 便利店</label></li>';
                    html += formatSearchBox(id, sets[i].name, html_li);
                    break;

                //地域
                case 'area':
                    //$(this).append('<script language="JavaScript" src="/js/compents/jquery.cxselect.min.js"></script>');
                    html += formatSearchArea(sets[i].name);
                    var set_cxSelect = 1;
                    break;

                //仓库(单选)
                case 'store':
                    var storeRes = new restStoreRepository();
                    var data = storeRes.findMine(1);
                    var html_li = '';
                    if (data != null && data.data != null) {
                        data = data.data;
                        for (var j in data) {
                            html_li += '<option value="' + data[j].id + '">' + data[j].name + '</option>';
                        }
                    }
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //仓库(多选)
                case 'stores':
                    var storeRes = new restStoreRepository();
                    var data = storeRes.findMine(1);
                    var html_li = '';
                    if (data != null && data.data != null) {
                        data = data.data;
                        for (var j in data) {
                            html_li += '<li class="checkbox-inline col-xs-4 col-sm-3 col-md-3 col-lg-2"><label><input type="checkbox" id="store_'+ data[j].id +'" name="store" value="' + data[j].id + '" /> ' + data[j].name + '</label></li>';
                        }
                    }
                    html += formatSearchBox(id, sets[i].name, html_li);
                    break;

                //日期
                case 'date':
                    html += formatSearchDate(sets[i].name);
                    var set_datepicker = 1;
                    break;

                //起至日期
                case 'dates':
                    html += formatSearchDates(sets[i].name, sets[i].prefix);
                    var set_datepicker = 1;
                    if (sets[i].prefix){
                        var set_datepicker_prefix = sets[i].prefix;
                    }
                    break;

                //状态(单选)
                case 'status':
                    var html_li = '';
                    sets[i].data = sets[i].data ? sets[i].data : [["","- 全部 -"]];
                    for (var k in sets[i].data){
                        html_li += '<option value="' + sets[i].data[k][0] + '">' + sets[i].data[k][1] + '</option>';
                    }
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //结算状态(select)
                case 'settle_status':
                    var option = [
                        ['',  '- 全部 -'],
                        ['0', '未结算'],
                        ['1', '已结算']
                    ];
                    var html_li = '';
                    for (var k in option){
                        html_li += '<option value="' + option[k][0] + '">' + option[k][1] + '</option>';
                    }
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //出库单类型(单选)
                case 'out_order_type':
                    var type_names = [
                        ['',  '- 全部 -'],
                        ['1', '销售'],
                        ['2', '退货'],
                        ['3', '调出'],
                        ['4', '报损'],
                        ['5', '盘亏']
                    ];
                    var html_li = '';
                    for (var k in type_names){
                        html_li += '<option value="' + type_names[k][0] + '">' + type_names[k][1] + '</option>';
                    }
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //入库单类型(单选)
                case 'in_order_type':
                    var type_names = [
                        ['',  '- 全部 -'],
                        ['1', '采购'],
                        ['2', '退货'],
                        ['3', '调入'],
                        ['4', '报溢'],
                        ['5', '盘盈']
                    ];
                    var html_li = '';
                    for (var k in type_names){
                        html_li += '<option value="' + type_names[k][0] + '">' + type_names[k][1] + '</option>';
                    }
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //支付方式(多选)
                case 'pay_types':
                    var configRes = new configRepository();
                    var data = configRes.query('CONFIG_BALANCE_READ');
                    var html_li = '';
                    if (data != null) {
                        for (var j in data) {
                            html_li = '<li class="checkbox-inline col-xs-4 col-sm-2 col-md-3 col-lg-2"><label><input type="checkbox" id="pay_type_'+ data[j].id +'" name="pay_type" value="' + data[j].value + '" /> ' + data[j].memo + '</label></li>' + html_li;
                        }
                    }
                    html += formatSearchBox(id, sets[i].name, html_li);
                    break;

                //支付方式(select)
                case 'pay_type':
                    var configRes = new configRepository();
                    var data = configRes.query('CONFIG_BALANCE_READ');
                    var html_li = '';
                    if (data != null) {
                        for (var j in data) {
                            html_li = '<option value="' + data[j].value + '">' + data[j].memo + '</option>' + html_li;
                        }
                    }
                    html_li = '<option value="">- 全部 -</option>' + html_li;
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //年份
                case 'year':
                    //自动填充任务年度
                    var now = new Date();
                    var year_min = now.getFullYear() - 4;
                    var year_max = now.getFullYear() + 5;
                    var html_li = '';
                    for (var y=year_min; y<year_max; y++){
                        var selected = now.getFullYear() == y ? ' selected ' : '';
                        html_li += '<option value="' + y + '"' + selected + '>' + y + '</option>\n';
                    }
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //业务员隶属关系
                case 'belong':
                    var html_li = '';
                    html_li += '<option value="">- 全部 -</option>';
                    html_li += '<option value="1">自有</option>';
                    html_li += '<option value="2">外借</option>';
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;

                //员工分组
                case 'tree_user':
                    var set_tree_user = 1;
                    var html_tree = '';
                    html_tree += '<div class="panel-body" id="div-tree-user" style="display:none;position:absolute;border:1px solid #ccc;background:#fff;z-index:100;">';
                    html_tree += '<ul id="userCateTree" class="ztree"></ul>';
                    html_tree += '</div>';
                    $('body').append(html_tree);
                    var html_li = '';
                    html_li += '<option value="">公司</option>';
                    html += formatSearchBoxSelect(sets[i].type, sets[i].name, html_li);
                    break;
            }
        }

        //添加搜索块到DOM
        //console.log(html);
        $(this).append(html);

        //绑定日期控件
        if (set_datepicker){
            $("#date").datepicker();
            $("#begindate").datepicker();
            $("#enddate").datepicker();
        }
        if (set_datepicker_prefix){
            $("#" + set_datepicker_prefix + "begindate").datepicker();
            $("#" + set_datepicker_prefix + "enddate").datepicker();
        }
        //如果有地域选择块:填充地区选择联动菜单
        set_cxSelect && $('#area').cxSelect({
            //url: '/js/compents/city.json',
            selects: ['province', 'city', 'area'],  // selects 为数组形式，请注意顺序
        });
        //绑定刷新事件:点击搜索块后刷新内容(需页面包含refrush函数)
        $(this).find('input').click(function(){
            if ($(this).attr('type') == 'text'){ //如果是输入框则不刷新

            } else {
                if ($(this).closest('ul').attr('id') == 'searchBox-goods_type'){ //如果是大分类则展示相应的小分类
                    showGoodsSubType($(this).val());
                }
                if (typeof(refrush) == 'function') refrush(1); //回到第一页
            }
        });
        //绑定刷新事件:select切换后后刷新内容(需页面包含refrush函数)
        $('#areapro').click(function(){
            $('#areapro').change(function(){
                refrush(1); //回到第一页
            });
        });
        $('#areacity').click(function() {
            $('#areacity').change(function(){
                refrush(1); //回到第一页
            });
        });
        $('#areazone').click(function() {
            $('#areazone').change(function(){
                refrush(1); //回到第一页
            });
        });
        //绑定刷新事件:日期选择后刷新内容(需页面包含refrush函数)
        $('#date').change(function(){
            refrush(1); //回到第一页
        });
        $('#begindate').change(function(){
            refrush(1); //回到第一页
        });
        $('#enddate').change(function(){
            refrush(1); //回到第一页
        });

        //绑定刷新事件:切换后刷新内容(需页面包含refrush函数)
        $('#searchBox-price').change(function(){
            refrush(1); //回到第一页
        });
        $('#store').change(function(){
            refrush(1); //回到第一页
        });
        $('#status').change(function(){
            refrush(1); //回到第一页
        });
        $('#settle_status').change(function(){
            refrush(1); //回到第一页
        });
        $('#out_order_type').change(function(){
            refrush(1); //回到第一页
        });
        $('#in_order_type').change(function(){
            refrush(1); //回到第一页
        });
        $('#belong').change(function(){
            refrush(1); //回到第一页
        });


        //绑定自动输入提示框(供应商)
        if (set_supplier){
            bindAutoCompleteCommon('searchBox-supplier-name', 'supplier', false);
            $('#searchBox-supplier').change(function(){
                if ($(this).val() != '' && typeof(refrush) == 'function'){
                    refrush();
                }
            });
        }
        //绑定自动输入提示框(客户)
        if (set_customer){
            bindAutoCompleteCommon('searchBox-customer-name', 'customer', false);
            $('#searchBox-customer').change(function(){
                if ($(this).val() != '' && typeof(refrush) == 'function'){
                    refrush();
                }
            });
        }
        //绑定自动输入提示框(员工)
        if (set_user){
            bindAutoCompleteCommon('searchBox-user-name', 'user', false);
            $('#searchBox-user').change(function(){
                if ($(this).val() != '' && typeof(refrush) == 'function'){
                    refrush();
                }
            });
        }
        //绑定自动输入提示框(商品)
        if (set_goods){
            bindAutoCompleteCommon('searchBox-goods-name', 'goods', false);
            $('#searchBox-goods').change(function(){
                if ($(this).val() != '' && typeof(refrush) == 'function'){
                    refrush();
                }
            });
        }


        //显示员工分组
        if (set_tree_user){
            var setting = {
                edit:{
                    enable: false //不允许编辑
                },
                callback:{
                    onClick: zTreeOnClick
                }
            };
            $('#userCateTree').treeUser(setting);
            $('#tree_user').click(function(){
                var offset = $(this).offset();
                var offset_css = {'top': offset.top+30, 'left': offset.left};
                $('#div-tree-user').css(offset_css).show();
            });
            $('#div-tree-user').mouseleave(function(){
                $(this).hide();
            });
        }


    };


})
(jQuery);


/* ------------------------------------------------- 一条华丽丽的分割线儿 --------------------------------------------------- */

/**
 * 展示商品子分类
 * @param id
 */
function showGoodsSubType(id){
    //var resGoods = new restGoodsRepository();
    //var data = resGoods.findGoodsSubType(id);
    var GTR = new goodsTypeRepository();
    var data = GTR.readSubType(id);
    var html_li = '';
    if (data && data.data) {
        data = data.data;
        for (var j in data) {
            html_li += '<li class="checkbox-inline col-xs-4 col-sm-2 col-md-2 col-lg-2"><label><input type="checkbox" id="subgt_' + data[j].id + '" name="subgt" value="' + data[j].id + '" /> ' + data[j].name + '</label></li>';
        }
    }
    if (html_li){
        var html = formatSearchBox('searchBox-goods_subtype', '商品子分类', html_li);
        $('#box_searchBox-goods_subtype').remove();
        $('#box_searchBox-goods_type').after(html);
        $('#box_searchBox-goods_subtype input').click(function(){
            if (typeof(refrush) == 'function') refrush(1); //回到第一页
        });
    } else {
        $('#box_searchBox-goods_subtype').remove();
    }


}

/* ------------------------------------------------- 又一条华丽丽的分割线儿 --------------------------------------------------- */


/**
 * 格式化搜索块(多选/单选)
 *
 * @param id
 * @param name
 * @param html_li
 * @returns {string}
 */
function formatSearchBox(id, name, html_li){
    var html = '';
    html += '<div class="form-group" id="box_' + id + '">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<div class="list"><ul class="clearfix" id="' + id + '">';
    html += html_li;
    html += '</ul></div>';
    html += '</div>';
    return html;
}

/**
 * 格式化搜索块(关键字)
 *
 * @param name
 * @returns {string}
 */
function formatSearchKey(name){
    var html = '';
    html += '<div class="form-group form-inline form-group-sm">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<div class="input-group">';
    html += '<input type="text" class="form-control" id="search" placeholder="请输入名称关键字"/>';
    html += '<div class="input-group-btn"><button class="btn btn-sm btn-info" onClick="refrush();">查询</button></div>';
    html += '</div>';
    html += '</div>';
    return html;
}

/**
 * 格式化自动提示输入框
 *
 * @param id
 * @param name
 * @returns {string}
 */
function formatAutoInput(id, name){
    var html = '';
    html += '<div class="form-group form-inline form-group-sm">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<div class="input-group">';
    html += '<input id="'+id+'-name" type="text" class="form-control" placeholder="请输入关键字" /><input id="'+id+'" type="hidden" value="" />';
    html += '<div class="input-group-btn"><button class="btn btn-sm btn-info" onClick="refrush();">查询</button></div>';
    html += '</div>';
    html += '</div>';
    return html;
}



/**
 * 格式化搜索块(地域)
 *
 * @param name
 * @returns {string}
 */
function formatSearchArea(name){
    var html = '';
    html += '<div class="form-group form-inline" id="area" data-url="/js/compents/city.json">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<select class="form-control input-sm province" id="areapro" style="margin-right: 5px;" data-first-title="全部省份"></select>';
    html += '<select class="form-control input-sm city" id="areacity" style="margin-right: 5px;" data-first-title="全部城市"></select>';
    html += '<select class="form-control input-sm area" id="areazone" style="margin-right: 5px;" data-first-title="全部区县"></select>';
    html += '</div>';
    return html;
}

/**
 * 格式化搜索块(日期)
 *
 * @param name
 * @returns {string}
 */
function formatSearchDate(name){
    var html = '';
    html += '<div class="form-group form-inline form-group-sm">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<div class="input-group input-sm">';
    html += '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>';
    html += '<input type="text" class="form-control" id="date" />';
    html += '</div>';
    html += '</div>';
    return html;
}

/**
 * 格式化搜索块(起至日期)
 *
 * @param name
 * @param prefix
 * @returns {string}
 */
function formatSearchDates(name, prefix){
    prefix = prefix ? prefix : '';
    var html = '';
    html += '<div class="form-group form-inline form-group-sm">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<div class="input-group input-sm">';
    html += '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>';
    html += '<input type="text" class="form-control" id="' + prefix + 'begindate" placeholder="选择开始日期" />';
    html += '</div>';
    html += '<span class=""> 至 </span>';
    html += '<div class="input-group input-sm">';
    html += '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>';
    html += '<input type="text" class="form-control" id="' + prefix + 'enddate" placeholder="选择结束日期" />';
    html += '</div>';
    html += '</div>';
    return html;
}

/**
 * 格式化搜索块(select)
 *
 * @param id
 * @param name
 * @param html_li
 * @returns {string}
 */
function formatSearchBoxSelect(id, name, html_li){
    var html = '';
    html += '<div class="form-group form-inline form-group-sm">';
    html += '<label class="group-name">' + name + '：</label>';
    html += '<select class="form-control" id="' + id + '">';
    html += html_li;
    html += '</select>';
    html += '</div>';
    return html;
}


/* ------------------------------------------------- 又一条华丽丽的分割线儿 --------------------------------------------------- */


/**
 * 点击分组(用户)
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
    //console.log(treeNode);
    //if (!treeNode.children || !treeNode.children.length) {
    if (1) {
        $('#tree_user option:first').attr('value', treeNode.id).html(treeNode.name);
        $('#div-tree-user').hide();
        refrush();
    } else {
        var treeObj = $.fn.zTree.getZTreeObj("userCateTree");
        treeObj.cancelSelectedNode(treeNode);
    }
}

