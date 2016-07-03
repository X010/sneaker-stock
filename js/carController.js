var carRes = new restCarRepository();
var option;
var currentPage;

/**
 * 页面初始数据
 */
$().ready(function () {
    $.Initialization();
});

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

        //新建按钮
        if (!checkPower(477)){
            $('#btn-create').remove();
        } else {
            $('#btn-create').click(function(){
                openParentForFrame('新建车辆', "/mainframe/baseinfo/saveCar.html?action=new&iframeid=477&iframename=" + encodeURI("新建车辆"), 477);
            });
        }

        $('#search').keyup(function(event){
            if (event.keyCode == 13){
                refrush();
            }
        });

        refrush(currentPage);
        fixTables();

    }
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
        var data = carRes.findAll(currentPage, defaultPageNum, params);
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
    if ($("#search").val()) params['search'] = $("#search").val();
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
            var href = "openParentForFrame('车辆:" + fieldNull(res.data[i].license) + "','/mainframe/baseinfo/saveCar.html?page=" + currentPage + "&action=edit&id=" + res.data[i].id + "', '" + buildTabId('base', 47, res.data[i].id) + "');";
            var tableContent = '<tr ondblclick="' + href + '">';
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].license) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].style) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].ton) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].model) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].createtime) + "</div></td>";
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