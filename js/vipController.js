var customRes = new customRepository();

var option;
var currentPage;
$(function () {
    option = getUrlParam("option");
    if (option == null || option == 'undefined' || option == 'false') option = false;
    currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;

    //新建按钮
    if (!checkPower(433)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('会员注册', "/mainframe/baseinfo/vipReg.html?iframeid=412&iframename=" + encodeURI("会员注册"), 412);
        });
    }

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
        var data = customRes.findAllVIPByField(currentPage, defaultPageNum, params);//加载数据
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
    //按钮权限
    if (!checkPower(10401)){}
    if (!checkPower(10402)){
        $("button[name='btn_edit']").attr('disabled', 'disabled');
    }
}

function buildParams(){
    var params = {};
    if ($("#search").val()) params['search'] = $("#search").val();
    if ($("#vip_status").val()) params['vip_status'] = $("#vip_status").val();
    if ($("#cctype").val()) params['cctype'] = $("#cctype").val();
    if ($("#suid").val()) params['suid'] = $("#suid").val();
    //console.log(params);
    return params;
}



var editTempData = null;

//将数据填充到Table
function fullTable(res) {
    $("#custom tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        editTempData = res.data;
        for (var i = 0; i < res.data.length; i++) {
            //var href = "company.html?action=viewCustom&id=" + res.data[i].ccid;
            var href = "openParentForFrame('客户:" + fieldNull(res.data[i].ccname) + "','/mainframe/baseinfo/vipReg.html?page=" + currentPage + "&id=" + res.data[i].ccid + "&action=view', '" + buildTabId('base', 412, res.data[i].ccid) + "');";
            var tableContent = '<tr key="' + i + '" ondblclick="' + href + '">';
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].ccname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + id2text(VIPList, res.data[i].cctype) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].sname) + "</div></td>";
            //tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].updatetime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].createtime) + "</div></td>";
            //tableContent += '<td><button class="btn-small btn-op" onclick="editCustomRow(' + i + ')">修改</button><button class="btn-small btn-op" onclick="' + href + '">查看</button><button class="btn-small btn-op" onclick="deleteCustom(' + res.data[i].id + ');" href="#">删除</button></td>';
            //tableContent += '<td class="btns"><div class="td-wrap"><button name="btn_edit" class="btn btn-xs btn-default" onclick="editCustomRow(' + i + ')">编辑</button></div></td>';
            tableContent += "</tr>";
            $("#custom tbody").append(tableContent);
        }
    } else {
        $("#custom tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}

/* ------------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

function saveBatchComstom(item) {
    var sres = null;
    if (item != null && item.length > 0) {
        var postData = {"data": JSON.stringify(item)};
        var sres = customRes.batchAdd(postData);
        if (sres != null){
            refrush();
            //window.location.href = "custom.html";
        }


    }
    return sres;
}


/**
 * 默认推荐客户
 * @param containerId
 */
function recommendCustom() {
    var data = customRes.readByRecommend();
    $("#pupupContent tbody").empty();
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td class='center'><input type='checkbox'  sid='" + data[i].id + "' scode='" + data[i].code + "' sname='" + data[i].name + "' onclick='checkboxSelect(" + data[i].id + ",\"" + data[i].code + "\",\"" + data[i].name + "\"," + 2 + ")' name='searchBox' /></td>";
            //tableContent += "<td>" + res.data[i].id + "</td>";
            tableContent += "<td>" + data[i].code + "</td>";
            tableContent += "<td>" + data[i].name + "</td>";
            tableContent += "</tr>";
            //$("#pupupContent tr").each(function(i){
            //    if (i) $(this).remove(); //清空之前的数据
            //});
            $("#pupupContent tbody").append(tableContent);
            $("#pupupContent").fadeIn();
        }
    }


}


