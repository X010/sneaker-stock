var userRes = new restUserRepository();
var option;
var currentPage;






var node_id; //要查询的分类ID

/**
 * 点击分类(查询该分类商品)
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
    node_id = treeNode.id;
    refrush();
}



function buildTree(){
    var setting = {
        view:{},
        edit:{
            enable: true //允许编辑
        },
        callback:{
            onClick: zTreeOnClick
        }
    };
    //分类操作按钮权限
    if (!checkPower(10705)) {
        setting.view.addHoverDom = false;
    }
    if (!checkPower(10706)) {
        setting.edit.showRemoveBtn = false;
    }
    if (!checkPower(10707)) {
        setting.edit.showRenameBtn = false;
    }
    var treeObj = $('#userCateTree').treeUser(setting);

}


/* ------------------------------------------------- 一条华丽丽的分割线儿 --------------------------------------------------- */




/**
 * 页面初始数据
 */
jQuery.extend({
    Initialization: function (sorts, pinit) {
        if (pinit == null || pinit == 'undefined') pinit = false;
        option = getUrlParam("option");
        var currentPage = getUrlParam("page");
        if (sorts == null || sorts == 'undefined') {
            sorts = getUrlParam("sorts");
            //console.log(sorts);
        }
        if (pinit)  currentPage = 1;
        else if (currentPage == null || option == 'undefined') currentPage = 1;
        if (option == null || option == 'undefined') option = false;

        //移交客户按钮
        $('#power-10704').click(function(){
            openParentForFrame('移交客户', "/mainframe/baseinfo/moveCustom.html?iframeid=499&iframename=" + encodeURI("移交客户"), 499);
        });

        //新建按钮
        if (!checkPower(455)){
            $('#btn-create').remove();
        } else {
            $('#btn-create').click(function(){
                openParentForFrame('新建员工', "/mainframe/baseinfo/saveUser.html?action=new&iframeid=455&iframename=" + encodeURI("新建员工"), 455);
            });
        }

        $('#search').keyup(function(event){
            if (event.keyCode == 13){
                refrush();
            }
        });

        bindRole('role');
        $('#role').prepend('<option value="">- 全部 -</option>');

        buildTree();

        refrush(currentPage);

        bindAutoCompleteCommon('from_suname', 'user');
        bindAutoCompleteCommon('to_suname', 'user');

        //按钮权限
        if (!checkPower(10704)) {}

        fixTables();
    }
});

/**
 * 业务员移交客户
 * @returns {boolean}

function moveCustomer(){
    var from_suid = $('#from_suid').val();
    var to_suid = $('#to_suid').val();
    if (!checkAutoComplete('from_suid')) return false;
    if (!checkAutoComplete('to_suid')) return false;
    if (from_suid && to_suid) {
        var sres = userRes.moveCustomer(from_suid, to_suid);
        if (sres == 'success') {
            $('#from_suname').val('');
            $('#from_suid').val('');
            $('#to_suname').val('');
            $('#to_suid').val('');
            $('#modalTransfer').modal('hide');
            runnerAlert('操作提示', '移交成功');
            return true;
        }
    }
    return false;
}
 */

// 执行初始化
$().ready(function () {
    $.Initialization();
});




/**
 * 根据当前所属条件,获取并填充数据到页面
 * @param page
 */
function refrush(page) {
    //var defaultPageNum = 1;
    currentPage = page ? page : defaultPage;
    var params = buildParams(); //获取搜索条件
    if (1){
        var data = userRes.findAllByField(currentPage, defaultPageNum, params);
        fullTable(data); //填充数据到表格
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

/**
 * 获取并组织搜索参数
 * @returns {{}}
 */
function buildParams(){
    var params = {
        'option': option
    };
    if (node_id){
        params['group_id'] = node_id;
    }
    if ($("#search").val()) params['search'] = $("#search").val();
    if ($("#role").val() != '') params['rid'] = $("#role").val();
    //if ($("#statusNumber").val() != '') params['status'] = $("#statusNumber").val();
    params['status'] = 1;
    //console.log(params);
    return params;
}



/**
 * 将数据填充到table
 * @param res
 */
function fullTable(res) {
    //$("#user tr:gt(0)").remove();
    $("#user tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
            //var tableContent = "<tr>";
            var href = "openParentForFrame('员工:" + fieldNull(res.data[i].name) + "','/mainframe/baseinfo/saveUser.html?page=" + currentPage + "&action=edit&id=" + res.data[i].id + "', '" + buildTabId('base', 45, res.data[i].id) + "');";
            var tableContent = '<tr ondblclick="' + href + '">';
            //tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].code) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].name) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].username) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].phone) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (res.data[i].admin == 1 ? '<span style="color:#F00;">超级管理员</span>' : workType(res.data[i].worktype)) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].group_name) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (res.data[i].belong == 2 ? '外借' : '自有') + "</div></td>";
            //tableContent += "<td class='des'><div class='td-wrap'>" + fieldNull(res.data[i].email) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].logintime) + "</div></td>";
            //tableContent += "<td class='status'><div class='td-wrap'>" + (res.data[i].status == 1 ? "<sapn class='status-normal'>正常</sapn>" : "<span class='status-locked'>停用</span>") + "</div></td>";
            //tableContent += "<td class='btns'><div class='td-wrap'><a class='btn btn-xs btn-default' href='saveUser.html?action=edit&id=" + res.data[i].id + "'>修改</a><a class='btn btn-xs btn-default' href='javascript:" + (res.data[i].status == 1 ? "deleteUser" : "enableUser") + "(" + res.data[i].id + ");'>" + (res.data[i].status == 1 ? "停用" : "启用") + "</a></div></td>";
            tableContent += "</tr>";
            $("#user tbody").append(tableContent);
        }
    } else {
        $("#user tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}



// 排序 (暂时未用到)
$.doSort = function (o) {
    var sorts = $(o).attr('tt') + "^" + $(o).attr('tv');
    if ($(o).attr("tv") == "asc") {
        $(o).attr("tv", "desc");
    }
    else if ($(o).attr("tv") == "desc") {
        $(o).attr("tv", "asc");
    }
    $.Initialization(sorts, true);
};