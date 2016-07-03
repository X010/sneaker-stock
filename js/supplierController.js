var supplierRes = new supplierRepository();


var option;
var currentPage;

$(function () {
    option = getUrlParam("option");
    if (option == null || option == 'undefined' || option == 'false') option = false;
    currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;

    //新建按钮
    if (!checkPower(422)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('供应商注册', "/mainframe/baseinfo/supplierReg.html?iframeid=422&iframename=" + encodeURI("供应商注册"), 422);
        });
    }

    refrush();

    //表格排序(前端)
    /*
    $("#supplier").tablesorter({
        headers: {
            0: {sorter: false},
            4: {sorter: false}
        }
    });
    */

    $('#search').keyup(function(event){
        if (event.keyCode == 13){
            refrush();
        }
    });

    //导入供应商弹框搜索事件
    $('#esSearch').keyup(function(event){
        if (event.keyCode == 13){
            searchCompanyAndFull('pupupContent', 1);
        }
    });
    $('#searchButton').click(function(){
        searchCompanyAndFull('pupupContent', 1);
    });

    /*浮层打开和关闭时触发事件*/
    $('#modalImport').on('hide.bs.modal', function () {
        //console.log("clear");
        clearStatus();
    }).on('show.bs.modal',function(){
        //console.log("open");
        $('#esSearch').val('');
        recommendSupplier();
    });

    //地区选择联动菜单
    $('#region').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province', 'city', 'area'],  // selects 为数组形式，请注意顺序

    });

    fixTables();

});



function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = supplierRes.findAllByField(currentPage, defaultPageNum, params);//加载数据
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
    if (!checkPower(10301)){}
    if (!checkPower(10302)){
        $("button[name='btn_edit']").attr('disabled', 'disabled');
    }
}

function buildParams(){
    var params = {
        "option": option
    };
    if ($("#search").val()) params['search'] = $("#search").val();
    //console.log(params);
    return params;
}




var tempEditData = null;

//将数据填充到Table
function fullTable(res) {
    $("#supplier tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        tempEditData = res.data;
        for (var i = 0; i < res.data.length; i++) {
            //var href = "company.html?action=view&id=" + res.data[i].scid;
            var href = "openParentForFrame('供应商:" + fieldNull(res.data[i].scname) + "','/mainframe/baseinfo/company.html?page=" + currentPage + "&id=" + res.data[i].scid + "&action=viewSupplier', '" + buildTabId('base', 42, res.data[i].scid) + "');";
            var tableContent = '<tr key="' + i + '" ondblclick="' + href + '">';
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(res.data[i].scname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].period, 0) + "天</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + float2percent(res.data[i].discount) + "%</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].auto_delete, 999) + "天</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].createtime) + "</div></td>";
            //tableContent += '<td class="btns"><div class="td-wrap"><button class="btn btn-xs btn-default" onclick="editRowContent(' + i + ')">修改</button><button class="btn btn-xs btn-default" onclick="self.location=\'' + href + '\';">查看</button><button class="btn btn-xs btn-danger" onclick="deleteSupplier(' + res.data[i].id + ');" href="#">删除</button></div></td>';
            //tableContent += '<td class="btns"><div class="td-wrap"><button name="btn_edit" class="btn btn-xs btn-default" onclick="editRowContent(' + i + ')">编辑</button></div></td>';
            tableContent += "</tr>";
            $("#supplier tbody").append(tableContent);
        }
    } else {
        $("#supplier tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}

/* ------------------------------------------- 华丽丽的分割线 --------------------------------------------------- */



function saveBatchSupplier(item) {
    var sres = null;
    if (item != null && item.length > 0) {
        var postData = {"data": JSON.stringify(item)};
        var sres = supplierRes.batchAdd(postData);
        if (sres != null){
            refrush();
            //window.location.href = "supplier.html";
        }
    }
    return sres;
}


/**
 * 默认推荐供应商
 * @param containerId
 */
function recommendSupplier() {
    var data = supplierRes.readByRecommend();
    $("#pupupContent tbody").empty();
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var tableContent = "<tr>";
            tableContent += "<td  align='center'><input type='checkbox'  sid='" + data[i].id + "' scode='" + data[i].code + "' sname='" + data[i].name + "' onclick='checkboxSelect(" + data[i].id + ",\"" + data[i].code + "\",\"" + data[i].name + "\"," + 1 + ")' name='searchBox' /></td>";
            //tableContent += "<td>" + res.data[i].id + "</td>";
            tableContent += "<td>" + data[i].code + "</td>";
            tableContent += "<td>" + data[i].name + "</td>";
            tableContent += "</tr>";
            //$("#pupupContent tbody").each(function(i){
            //    if (i) $(this).remove(); //清空之前的数据
            //});

            $("#pupupContent tbody").append(tableContent);
            $("#pupupContent").fadeIn();
        }
    }
}

/**
 * 修改一条的资料
 * @param index
 */
function editRowContent(index) {
    if (tempEditData != null) {
        $("button[name='btn_edit']").attr('disabled', 'disabled'); //禁用其他编辑按钮
        var currentData = tempEditData[index];
        $("#supplier tbody tr").each(function () {
            var key = $(this).attr("key");
            if (key == index || parseInt(key) == index) {
                var tableContent = "";
                tableContent += "<td class='company'><div class='td-wrap'>" + fieldNull(currentData.scname) + "</div></td>";
                tableContent += "<td class='num'><div class='td-wrap'><input type='text' class='form-control' size='5' id='accountPeriod_" + index + "' value=\"" + num2total(currentData.period) + "\" /></div></td>";
                tableContent += "<td class='num'><div class='td-wrap'><input type='text' class='form-control' size='5' id='accountDiscount_" + index + "' value=\"" + float2percent(currentData.discount) + "\" /></div></td>";
                tableContent += "<td class='num'><div class='td-wrap'><input type='text' class='form-control' size='5' id='autoDeleteDays" + index + "' value=\"" + num2total(currentData.auto_delete) + "\" /></div></td>";
                tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(currentData.createtime) + "</div></td>";
                tableContent += "<td class='btns'><div class='td-wrap'><button class=\"btn btn-xs btn-primary\" onclick=\"saveEditRowContent(" + index + ")\">保存</button><button class=\"btn btn-xs btn-default\" onclick=\"refrush("+currentPage+")\">取消</button></div></td>";
                $(this).html(tableContent).find('input').dblclick(function(){return false;});
                return false;
            }
        });
        $("#accountPeriod_" + index).focus();
    }
}

/**
 * 保存一条修改记录
 * @param index
 */
function saveEditRowContent(index) {
    if (tempEditData != null) {
        var currentData = tempEditData[index];
        if (currentData != null) {
            currentData.period = $("#accountPeriod_" + index).val();
            currentData.auto_delete = $("#autoDeleteDays" + index).val();
            currentData.discount = (num2price($("#accountDiscount_" + index).val()) / 100).toFixed(4);
            var res = supplierRes.edit(currentData.id, currentData);
            if (res != null) {
                refrush();
            }
        }
    }
}

/**
 * 删除供应商关系
 * @param id
 */
function deleteSupplier(id) {
    if (confirm("是否删除该供应商关系")) {
        var sres = supplierRes.delete(id);
        if (sres != null)
            window.location.href = "supplier.html";
    }
}


