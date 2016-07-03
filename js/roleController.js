var roleRes = new restRoleRepository();

/**
 * 初始加载数据
 */
$(function () {
    //新建按钮
    if (!checkPower(522)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建角色', "/mainframe/baseinfo/saveRole.html?action=new&iframeid=522&iframename=" + encodeURI("新建角色"), 522);
        });
    }

    refrush();

    fixTables();
});


function refrush(){
    var params = buildParams();
    if (1){
        var data = roleRes.findAllByField(1, 100, params);
        //var data = roleRes.findInc(1, 100, params);
        if (data) {
            fullTable(data);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}


function buildParams(){
    var params = {};
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    //console.log(params);
    return params;
}

/**
 * 将数据填充到table
 * @param res
 */
function fullTable(res) {
    //$("#role tr:gt(0)").remove();
    $("#role tbody").empty();
    $("#table-empty").hide();
    if (res.data != null && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
            var href = "openParentForFrame('角色:" + fieldNull(res.data[i].name) + "','/mainframe/baseinfo/saveRole.html?action=edit&id=" + res.data[i].id + "&mids=" + res.data[i].mids + "&name=" + res.data[i].name + "&status=" + res.data[i].status + "&cid=" + res.data[i].cid + "', '" + buildTabId('setting', 52, res.data[i].id) + "');";
            var tableContent = '<tr ondblclick="' + href + '">';
            //tableContent += "<td class='order'><div class='td-wrap'>" + fieldNull(res.data[i].id) + "</div></td>";

            var name_text;
            if (res.data[i].cid == -1) {
                name_text = "<span style='color:#337AB7;'>" + fieldNull(res.data[i].name) + "</span>";
            } else {
                name_text = fieldNull(res.data[i].name);
            }
            tableContent += "<td class=''><div class='td-wrap'>" + name_text + "</div></td>";

            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].createtime) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(res.data[i].updatetime) + "</div></td>";

            /*
            var type_text;
            if (res.data[i].cid == -1) {
                type_text = "<span class='status-normal'>系统默认</span>";
            } else {
                type_text = "<span class='status-normal'>自定义</span>";
            }
            tableContent += "<td class='status'><div class='td-wrap'>" + type_text + "</div></td>";
            */

            var status_text;
            if (res.data[i].status == 1) {
                status_text = "<span class='status-normal'>正常</span>";
            } else {
                status_text = "<span class='status-locked'>停用</span>"
            }
            tableContent += "<td class=''><div class='td-wrap'>" + status_text + "</div></td>";
            //tableContent += "<td class='btns'><div class='td-wrap'><a class='btn btn-xs btn-default' href='saveRole.html?action=edit&id=" + res.data[i].id + "&mids=" + res.data[i].mids + "&name=" + encodeURI(res.data[i].name) + "'>修改</a><a class='btn btn-xs btn-default' href='javascript:" + (res.data[i].status == 1 ? "deleteRole" : "enableRole") + "(" + res.data[i].id + ")'>" + (res.data[i].status == 1 ? "停用" : "启用") + "</a></div></td>";
            tableContent += "</tr>";
            //$("#role tr:last").after(tableContent);
            $("#role tbody").append(tableContent);
        }
    }else{
        $("#role tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}

/**
 * 删除角色
 * @param id

function deleteRole(id) {
    if (confirm("是否删除该角色!")) {
        var sres = roleRes.delete(id);
        if (sres != null)
            window.location.reload();
    }
}

function enableRole(id) {
    if (confirm("是否启动该角色!")) {
        var data = {"status": 1};
        var sres = roleRes.edit(id, data);
        if (sres != null)
            window.location.reload();
    }
}

 */