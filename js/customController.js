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
            openParentForFrame('客户注册', "/mainframe/baseinfo/customReg.html?iframeid=433&iframename=" + encodeURI("客户注册"), 433);
        });
    }

    bindAutoCompleteCommon('suname', 'user');
    refrush();

    $('#search').keyup(function(event){
        if (event.keyCode == 13){
            refrush();
        }
    });

    //导入供应商弹框搜索事件
    $('#esSearch').keyup(function(event){
        if (event.keyCode == 13){
            searchCompanyAndFull('pupupContent', 2);
        }
    });
    $('#searchButton').click(function(){
        searchCompanyAndFull('pupupContent', 2);
    });

    /*浮层打开和关闭时触发事件*/
    $('#modalImport').on('hide.bs.modal', function () {
        //console.log("clear");
        clearStatus();
    }).on('show.bs.modal',function(){
        //console.log("run");
        $('#esSearch').val('');
        recommendCustom();
    });

    //地区选择联动菜单
    $('#region').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province', 'city', 'area'],  // selects 为数组形式，请注意顺序

    });

    //固定表头
    fixTables();

});



function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = customRes.findAllByField(currentPage, defaultPageNum, params);//加载数据
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
            var href = "openParentForFrame('客户:" + fieldNull(res.data[i].ccname) + "','/mainframe/baseinfo/company.html?page=" + currentPage + "&id=" + res.data[i].ccid + "&action=viewCustom', '" + buildTabId('base', 43, res.data[i].ccid) + "');";
            var tableContent = '<tr key="' + i + '" ondblclick="' + href + '">';
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].ccname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].cctypename) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].period, 0) + "天</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].sname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].contactor) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].contactor_phone) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].suname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].suphone) + "</div></td>";
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

/**
 * 修改资料
 * @param index
 */
function editCustomRow(index) {
    if (editTempData != null) {
        $("button[name='btn_edit']").attr('disabled', 'disabled'); //禁用其他编辑按钮
        var currentData = editTempData[index];
        $("#custom tbody tr").each(function () {
            var key = $(this).attr("key");
            if (key == index || parseInt(key) == index) {
                //进行替换操作
                var rowContent = "";
                rowContent += "<td class='company'><div class='td-wrap'>" + fieldNull(currentData.ccname) + "</div></td>";
                rowContent += "<td class='cate'><div class='td-wrap'><select class='form-control input-sm' id='cctype_" + index + "'><option value='1' selected>经销商</option><option value='2'>酒店饭店</option><option value='3'>商场超市</option><option value='4'>便利店</option></select></div></td>";
                rowContent += "<td class='num'><div class='td-wrap'><input class='form-control input-sm' id='accountPeriod_" + index + "' value='" + currentData.period + "' /></div></td>";
                rowContent += "<td class='store'><div class='td-wrap'><select class='form-control input-sm' id='MyStore_" + index + "'></select></div></td>";
                //rowContent += '<td class="username"><div class="td-wrap"><input id="suname" type="text" class="form-control input-sm" placeholder="请输入员工信息"/><input id="suid" type="hidden" value="" /></div></td>';
                rowContent += "<td class='username'><div class='td-wrap'>" + fieldNull(currentData.suname) + "</div></td>";
                rowContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(currentData.createtime) + "</div></td>";
                rowContent += "<td class='btns'><div class='td-wrap'><button type=\"button\" class=\"btn btn-xs btn-primary\" onclick=\"saveEditCustomRow(" + index + ")\">保存</button><button type=\"button\" class=\"btn btn-xs btn-default\" onclick=\"refrush("+currentPage+");\">取消</button></div></td>";
                $(this).html(rowContent).find('input').dblclick(function(){return false;});
                //绑定业务员，与仓库
                bindSelfStore("MyStore_" + index);
                $("#cctype_" + index).val(currentData.cctype);
                $("#MyStore_" + index).val(currentData.sid);
                //bindSelfUser("MySuid_" + index);
                //$("#MySuid_" + index).val(currentData.suid);
                //$("#suname").val(currentData.suname);
                //$("#suid").val(currentData.suid);
                //bindAutoCompleteCommon('suname', 'user', false);
                return false;
            }

        });
    }
}

/**
 * 保存修改的客户资料
 * @param index
 */
function saveEditCustomRow(index) {
    if (editTempData != null) {
        var currentData = {}; //editTempData[index];
        currentData['cctype'] = $("#cctype_" + index).val();
        currentData['period'] = $("#accountPeriod_" + index).val();
        currentData['sid'] = $("#MyStore_" + index).val();
        //if (!checkAutoComplete('suid')) return false;
        //currentData['suid'] = $("#suid").val();
        var res = customRes.edit(editTempData[index].id, currentData);
        if (res != null) {
            refrush(currentPage);
        }
    }
}

/**
 * 删除客户关系
 * @param id

function deleteCustom(id) {
    if (confirm("是否删除该客户关系")) {
        var sres = customRes.delete(id);
        if (sres != null)
            window.location.href = "custom.html";
    }
} */

