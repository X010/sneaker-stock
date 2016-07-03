var roleRes = new restRoleRepository();
var moduleRes = new restModuleRepository();
var edit = 0;
var mids = "";


/**
 * 计算角色的权限个数
 * @param mids
 * @returns {number}
 */
function countNumOfModules(mids){
    var ret = fieldNull(mids).split(',').length - 1;
    if (ret < 0) ret = 0;
    return ret;
}

/**
 * 加载已审核的订单，供导入到列表中
 */
function loadRolesTable() {
    var params = {};
    var data = roleRes.findInc(1, 50, params);
    if (data != null && data.data != null) {
        data = data.data;
        $("#pupupContent tbody").empty();
        var tableContent = "";
        for (var i = 0; i < data.length; i++) {
            tableContent += "<tr class='clickable' onclick='trOnClick(\"" + data[i].id + "\", \"" + fieldNull(data[i].name) + "\");'>";
            tableContent += "<td class='sysid'>" + data[i].id + "</td>";
            tableContent += "<td class='sysid'>" + fieldNull(data[i].name) + "</td>";
            tableContent += "<td class='sysid'>" + countNumOfModules(data[i].mids) + "</td>";
            tableContent += "<td class='datetime'>" + formatDatetime(data[i].createtime) + "</td>";
            tableContent += "</tr>";
        }
        $("#pupupContent tbody").append(tableContent);
    }
}

/**
 * 表格行单击或回车事件
 */
function trOnClick(trid, trname) {
    //$('#name').val(trname);
    var data = roleRes.findById(trid);
    if (data != null) {
        //console.log(data);
        $('#moduleList input[type="checkbox"]').removeAttr('checked').parent().removeClass('selected');
        for (var i=0; i<data.length; i++){
            $('#checkbox_id_' + data[i].id).attr('checked', 'checked');
        }
        autoCheckBox();

        $('#modalImport').modal('hide');
    }
}


/*---------------------------------------------------华丽的一逼-------------------------------------------------------*/

$(function () {
    refrush();
});

/**
 * 加载页面数据
 */
function refrush(){
    var action = getUrlParam('action');
    var id = getUrlParam('id');
    var status = getUrlParam('status');
    var cid = getUrlParam('cid');
    mids = "," + getUrlParam("mids") + ",";
    var name = decodeURI(getUrlParam("name"));
    if (id != null && id != 'undefined') edit = id;
    if (action == 'edit') {
        //读取需要修改的数据
        $("#name").val(name);
    }
    if (status == 1) { //正常
        $("#btndiv-Off").show();
    } else if (status == 0){ //停用
        $("#btndiv-On").show();
    }

    /*浮层打开和关闭时触发事件*/
    $('#modalImport').on('hide.bs.modal', function () {
    }).on('show.bs.modal',function(){
        loadRolesTable();
    });

    //读取module数据
    var modules = moduleRes.findAll(1, 500);
    if (modules != null && modules != null && modules.data != null) {
        modules = modules.data;
        var contentArr = {};
        var moduleList = "";
        for (var i = 0; i < modules.length; i++) {
            var menu = modules[i].menu;
            var currMids = "," + modules[i].id + ",";
            var html_checked = '';
            if (mids != null && mids.indexOf(currMids) >= 0) {
                html_checked = ' checked="checked" ';
            }
            contentArr[menu] += ("<li class='item-checkbox'><label for='checkbox_id_" + modules[i].id + "'><input name='moduleIds[]' type='checkbox' " + html_checked + " id='checkbox_id_" + modules[i].id + "' value='" + modules[i].id + "'>" + modules[i].name + "</label></li>");
        }
        $.each(contentArr, function (key, value) {
            moduleList += "<div class=\"group\">";
            moduleList += ('<h3 class=\"group-name\">&nbsp;<input class="" type="checkbox" value="">&nbsp;' + key + '</h3>');
            moduleList += ("<ul class=\"f-checkbox clearfix\">" + value.replace("undefined", "") + "</ul>");
            moduleList += "</div>";
        });
        $("#moduleList").html(moduleList);
        var checkedAll = '<div class="item-checkbox"><label for="checkedAll"><input class="" type="checkbox" id="checkedAll" value="" /> 所有权限</label></div>';
        $("#moduleList").prepend(checkedAll);

        //全选
        $('#checkedAll').click(function(){
            if ($(this).attr('checked') == 'checked'){ //全选
                $('#moduleList input[type="checkbox"]').attr('checked', 'checked').parent().addClass('selected');
            } else { //取消全选
                $('#moduleList input[type="checkbox"]').removeAttr('checked').parent().removeClass('selected');
            }
        });

        //部分全选
        $('h3 input').click(function(){
            if ($(this).attr('checked') == 'checked'){ //该部分全选
                $(this).parent().parent().find('input[type="checkbox"]').attr('checked', 'checked').parent().addClass('selected');
            } else { //取消该部分全选
                $(this).parent().parent().find('input[type="checkbox"]').removeAttr('checked').parent().removeClass('selected');
            }
        });

        //系统角色不允许修改
        if (cid == -1){
            $('#btndiv-Off').hide();
            $('#btndiv-On').hide();
            $('input').attr('disabled', 'disabled');
        }

        autoCheckBox();
    }


    //表单验证
    var validator = $("#roleAddForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 15,
            },
            'moduleIds[]': {required: true},
        },
        messages: {
            name: {
                required: "请填写角色名称",
                minlength: "角色名称最少需要2个字",
                maxlength: "角色名称最多不要超过15个字",
            },
            'moduleIds[]': {required: '至少选择一个权限模块'},
        },
        success: function (element) {
            if (element.attr("name") == 'moduleIds[]')
                $("#addRoleError").empty();
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == 'moduleIds[]')
                $("#addRoleError").text(error.text());
            else error.appendTo(element.parent());

        },
        submitHandler: function () {
            save();
        },
    });
}



/**
 * 保存数据
 */
function save() {
    var name = $("#name").val();
    var chk_value = "";
    $('input[name="moduleIds\[\]"]:checked').each(function () {
        chk_value += ($(this).val() + ",");
    });
    if (edit > 0) {
        //修改
        var postData = {
            "name": name,
            "mids": chk_value,
            "level": 1
        };
        var sres = roleRes.edit(edit, postData);
        if (sres != null){
            noticeFrame(52, 'refrush');
            runnerConfirem("操作提示", "修改成功");
        }
    } else {
        //新建
        var postData = {
            "name": name,
            "mids": chk_value,
            "level": 1
        };
        var sres = roleRes.add(postData);
        if (sres != null){
            noticeFrame(52, 'refrush');
            //runnerConfirem("操作提示", "创建成功");
            runnerConfiremUrl("操作提示", "新建成功", false, "/mainframe/baseinfo/saveRole.html?action=new&iframeid=522&iframename=" + encodeURI("新建角色"));
        }
    }
}

/**
 * 停用角色
 */
function disableRole() {
    if (confirm("是否停用该角色!")) {
        var sres = roleRes.delete(edit);
        if (sres != null) {
            noticeFrame(52, 'refrush');
            runnerConfirem("操作提示", "停用成功");
        }
    }
}

/**
 * 启用角色
 */
function enableRole() {
    if (confirm("是否启动该角色!")) {
        var data = {"status": 1};
        var sres = roleRes.edit(edit, data);
        if (sres != null) {
            noticeFrame(52, 'refrush');
            runnerConfirem("操作提示", "启用成功");
        }
    }
}

