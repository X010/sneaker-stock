var userRes = new restUserRepository();
var roleRes = new restRoleRepository();
var storeRes = new restStoreRepository();

var edit = 0;
var page;



/**
 * 点击分组
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
    //console.log(treeNode);
    if (!treeNode.children || !treeNode.children.length) {
        $('#group_id').val(treeNode.id);
        $('#group_name').val(treeNode.name);
    } else {
        var treeObj = $.fn.zTree.getZTreeObj("userCateTree");
        treeObj.cancelSelectedNode(treeNode);
    }
}


/* ----------------------------------------------- 分割线儿 ------------------------------------------------- */




/**
 * 初始加载数据
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam('action');
    var id = getUrlParam('id');
    var storeStr = "";
    var roleStr = "";
    var is_admin;
    var gtids = '';
    if (action == 'new') {
        //新建User对象
        //$("#username").removeClass("disabled").attr("disabled",false);

    } else {
        //修改用户对象
        //$("#username").attr("readonly", true);
        //$("#password").attr("readonly", true);
        edit = id;
        var userData = userRes.findById(id);
        if (userData){
            $("#username").val(userData.username);
            $("#name").val(userData.name);
            $("#idcard").val(userData.idcard);
            $("#belong").val(userData.belong);
            $("#worktype").val(userData.worktype);
            $("#phone").val(userData.phone);
            $("#email").val(userData.email);
            $("#discount").val(userData.discount);
            $("#memo").val(userData.memo);
            storeStr = "," + userData.sids + ",";
            roleStr = "," + userData.rids + ",";

            $("#group_id").val(userData.group_id);
            $("#group_name").val(userData.group_name);
            gtids = fieldNull(userData.gtids);

            if (userData.status == 1) { //正常
                $("#btndiv-Off").show();
            } else { //停用
                //$("#btndiv-On").show();
            }

            is_admin = userData.admin == 1;
        }
    }

    //员工组
    var setting = {
        edit:{
            enable: false //不允许编辑
        },
        callback:{
            onClick: zTreeOnClick
        }
    };
    $('#userCateTree').treeUser(setting, gtids);


    $('#username').keyup(function(){
        $('#phone').val($(this).val());
    }).blur(function(){
        $('#phone').blur();
    });

    $('#username').blur(function(){
        checkUsername();
    });
    $('#name').blur(function(){
        checkRealname();
    });

    if (is_admin){
        $('#li_stores').hide();
        $('#li_roles').hide();
        $('input').attr('disabled', 'disabled');
        $('select').attr('disabled', 'disabled');
        $('textarea').attr('disabled', 'disabled');
        $('button').hide();
        $('#btn-cancel').show();
    } else {
        //加载仓库信息
        var data = storeRes.findAll(1, 100, null, 1);//读取所有该公司下面的仓库信息
        if (data != null && data.data != null && data.data.length > 0) {
            data = data.data;
            var content = "";
            for (var i = 0; i < data.length; i++) {
                var currStoreId = "," + data[i].id + ",";
                if (storeStr != null && storeStr.indexOf(currStoreId) >= 0) {
                    content += ("<li class='item-checkbox'><label for='checkbox_store_id_" + data[i].id + "'><input type='checkbox' checked name='store[]' id='checkbox_store_id_" + data[i].id + "' value='" + data[i].id + "' />" + data[i].name + "</label></li>");
                } else {
                    content += ("<li class='item-checkbox'><label for='checkbox_store_id_" + data[i].id + "'><input type='checkbox' name='store[]' id='checkbox_store_id_" + data[i].id + "' value='" + data[i].id + "' />" + data[i].name + "</label></li>");
                }
            }
            $("#stores").html(content);
        }
        //加载角色信息
        //data = roleRes.findInc(1, 100);//读取所有该公司及系统角色
        data = roleRes.findAllByField(1, 100, {'status':1});//读取所有该公司及系统角色
        if (data != null && data.data != null && data.data.length > 0) {
            data = data.data;

            var contentArr = [];
            for (var i = 0; i < data.length; i++) {
                var currRoleId = "," + data[i].id + ",";
                var level = 0;
                if (data[i].level != null && data[i].level != 'undefined') level = parseInt(data[i].level);
                //高亮系统角色
                var name_text;
                if (data[i].cid == -1) {
                    name_text = "<span style='color:#337AB7;'>" + fieldNull(data[i].name) + "</span>";
                } else {
                    name_text = fieldNull(data[i].name);
                }
                if (roleStr != null && roleStr.indexOf(currRoleId) >= 0) {
                    contentArr[level] += ("<li class='item-checkbox'><label for='checkbox_role_id_" + data[i].id + "'><input type='checkbox' checked name='role[]' id='checkbox_role_id_" + data[i].id + "' value='" + data[i].id + "' />" + name_text + "</label></li>");
                } else {
                    contentArr[level] += ("<li class='item-checkbox'><label for='checkbox_role_id_" + data[i].id + "'><input type='checkbox' name='role[]' id='checkbox_role_id_" + data[i].id + "' value='" + data[i].id + "' />" + name_text + "</label></li>");
                }
            }
            var roleContent = "";
            //将数组的内容装到DIV中进行分组
            for (var i = 0; i < contentArr.length; i++) {
                var arrContent = contentArr[i];
                if (arrContent != null && arrContent != 'undefined') {
                    roleContent += "<div class=\"group\">";
                    roleContent += "<ul class=\"f-checkbox\">";
                    roleContent += arrContent.replace("undefined", "");
                    roleContent += "</ul>";
                    roleContent += "</div>";
                }
            }
            $("#roles").html(roleContent);
        }
    }

    //按钮权限
    if (action != 'new' && !checkPower(10701)) { //没有修改权限
        $('#btn-save').remove();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
        $("textarea").attr('disabled', 'disabled');
    }
    if (action == 'new' && !checkPower(10703)) { //没有新建权限
        $('#btn-save').remove();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
        $("textarea").attr('disabled', 'disabled');
    }
    if (!checkPower(10702)) {
        $("#btndiv-Off").remove();
        //$("#btndiv-On").remove();
    }

    checkForm();

    autoCheckBox();

});


/**
 * 检测用户名是否已存在
 */
function checkUsername(){
    var username = $('#username').val();
    if (username.length >= 3) {
        var sres = userRes.checkUsername(username);
        if (sres) {
            if (sres.result) {
                $('#tips_username').html('账号 ' + username + ' 已被占用!').css('color', "#E56762").show();
            } else {
                //$('#tips_username').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_username').hide();
            }
        }
    }
}

/**
 * 检测姓名是否已存在
 */
function checkRealname(){
    var name = $('#name').val();
    if (name.length >= 2) {
        var id = edit ? edit : 0;
        var sres = userRes.checkRealname(id, name);
        if (sres) {
            if (sres.result) {
                $('#tips_name').html('姓名 ' + name + ' 已被占用!').css('color', "#E56762").show();
            } else {
                //$('#tips_name').html('该姓名可以使用.').css('color', "#1ACF06").show();
                $('#tips_name').hide();
            }
        }
    }
}

/**
 * 保持数据
 */
function save() {
    var username = $("#username").val();
    var password = $("#password").val();
    var name = $("#name").val().replaceAll(' ', '');
    var idcard = $("#idcard").val();
    var belong = $("#belong").val();
    var worktype = $("#worktype").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var discount = $("#discount").val();
    var memo = $("#memo").val();
    var group_id = $("#group_id").val();
    var store_checkvalue = "";
    $('input[name="store\[\]"]:checked').each(function () {
        store_checkvalue += ($(this).val() + ",");
    });
    var role_checkvalue = "";
    $('input[name="role\[\]"]:checked').each(function () {
        role_checkvalue += ($(this).val() + ",");
    });
    if (edit > 0) {
        //修改用户对象
        var postData = {
            "username": username,
            "name": name,
            "idcard": idcard,
            "sids": store_checkvalue,
            "rids": role_checkvalue,
            "belong": belong,
            "worktype": worktype,
            "email": email,
            "phone": phone,
            "group_id": group_id,
            "memo": memo,
            "discount": discount
        };
        if (password) postData['password'] = password;
        var sres = userRes.edit(edit, postData);
        if (sres != null) {
            noticeFrame(45, 'refrush', page);
            runnerConfirem("操作提示", "保存成功");
        }
    } else {
        //新建用户对象
        var postData = {
            "username": username,
            "password": password,
            "name": name,
            "idcard": idcard,
            "sids": store_checkvalue,
            "rids": role_checkvalue,
            "belong": belong,
            "worktype": worktype,
            "email": email,
            "phone": phone,
            "group_id": group_id,
            "memo": memo,
            "discount": discount
        };
        var sres = userRes.add(postData);
        if (sres != null) {
            noticeFrame(45, 'refrush', page);
            //runnerConfirem("操作提示", "新建成功");
            runnerConfiremUrl("操作提示", "新建成功", false, "/mainframe/baseinfo/saveUser.html?action=new&iframeid=455&iframename=" + encodeURI("新建员工"));
        }
    }
}


/**
 * 启用员工
 * @param id

function enableUser() {
    if (confirm("确认启用该员工账号？")) {
        var postData = {"status": 1};
        var msg = userRes.edit(edit, postData);
        if (msg != null) {
            noticeFrame(45, 'refrush', page);
            runnerConfirem("操作提示", "启用成功");
        }
    }
}*/

/**
 * 停用用户
 */
function disableUser() {
    if (confirm("注意：删除后不可恢复，但是不会影响之前已产生的单据。\n确认删除该员工账号？")) {
        var msg = userRes.delete(edit);
        if (msg != null) {
            noticeFrame(45, 'refrush', page);
            runnerConfirem("操作提示", "删除成功");
        }
    }
}



/**
 * 表单验证
 */
function checkForm() {
    var validator = $("#userForm").validate({
        rules: {
            username: {
                required: true,
                //mobile: [],
                minlength: 5,
                maxlength: 15,
            },
            password: {
                required: function () {
                    return (edit <= 0);
                },
                minlength: 6,
                maxlength: 15,
            },
            name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            idcard: {idCard: []},
            phone: {required: true, mobile: []},
            email: {mail: []},
            'store[]': {required: true},
            'role[]': {required: true}
        },
        messages: {
            username: {
                required: "请输入登录账号",
                minlength: "登录账号最少需要5个字符",
                maxlength: "登录账号最多不得超过15个字符",
            },
            password: {
                required: '请输入登录密码',
                minlength: "密码最少需要6个字符",
                maxlength: "密码最多不能超15个字符"
                //regexPassword: '密码至少包含一个大写字母、一个小写字母及一个符号，长度至少8位。'
            },
            name: {
                required: "请输入员工的真实姓名",
                minlength: "真实姓名最少需要2个字符",
                maxlength: "真实姓名最多不要超过20个字符",
            },
            phone: {required: "用于接收系统短信，请填写真实手机号"},
            //discount: {
            //    maxlength: "折扣填写的太多了吧。",
            //},
            'store[]': {required: '至少选择一个仓库的权限'},
            'role[]': {required: '至少选择一个权限角色'},
        },
        success: function (element) {
            if (element.attr("name") == 'store[]'){
                $("#storeError").empty();
            } else if (element.attr("name") == 'role[]') {
                $("#roleError").empty();
            }else{element.parent().find('LABEL').remove();}
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == 'store[]'){
                $("#storeError").text(error.text());
            } else if (element.attr("name") == 'role[]'){
                $("#roleError").text(error.text());
            } else {
                if(error.text() != '')
                    error.appendTo(element.parent());
            }

        },
        submitHandler: function () {
            save();
            //alert("保存成功!");
        },
    });
    $("#password").pwdStrongCheck();
}

