var customRes = new customRepository();

var option;
var currentPage;


$(function () {
    option = getUrlParam("option");
    if (option == null || option == 'undefined' || option == 'false') option = false;
    currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;

    refrush();

    $('#search').keyup(function(event){
        if (event.keyCode == 13){
            refrush();
        }
    });

    //固定表头
    fixTables();

});



function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = customRes.findTempAll(currentPage, defaultPageNum, params);//加载数据
        fullTable(data);
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

function buildParams(){
    var params = {};
    if ($("#search").val()) params['search'] = $("#search").val();
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    return params;
}




//将数据填充到Table
function fullTable(res) {
    $("#custom tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
            var href = '';
            if (res.data[i].status == 0){ //未审核
                href = "openParentForFrame('客户:" + fieldNull(res.data[i].cname) + "','/mainframe/baseinfo/customReg.html?page=" + currentPage + "&id=" + res.data[i].id + "&action=ch', '" + buildTabId('base', 48, res.data[i].id) + "');";
            } else if (res.data[i].status == 1){//已审核
                href = "openParentForFrame('客户:" + fieldNull(res.data[i].cname) + "','/mainframe/baseinfo/customReg.html?page=" + currentPage + "&id=" + res.data[i].id + "&action=vw', '" + buildTabId('base', 48, res.data[i].id) + "');";
            } else if (res.data[i].status == 2){ //已拒绝
                href = "openParentForFrame('客户:" + fieldNull(res.data[i].cname) + "','/mainframe/baseinfo/customReg.html?page=" + currentPage + "&id=" + res.data[i].id + "&action=vw', '" + buildTabId('base', 48, res.data[i].id) + "');";
            }
            var tableContent = '<tr key="' + i + '" ondblclick="' + href + '">';
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].cname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + companyType(res.data[i].ctype) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].period, 0) + "天</div></td>";
            //tableContent += "<td class='store'><div class='td-wrap'>" + fieldNull(res.data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].suname) + "</div></td>";
            //tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].updatetime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].createtime) + "</div></td>";
            //tableContent += '<td><button class="btn-small btn-op" onclick="editCustomRow(' + i + ')">修改</button><button class="btn-small btn-op" onclick="' + href + '">查看</button><button class="btn-small btn-op" onclick="deleteCustom(' + res.data[i].id + ');" href="#">删除</button></td>';
            tableContent += "</tr>";
            $("#custom tbody").append(tableContent);
        }
    } else {
        $("#custom tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}


