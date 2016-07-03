var resCustom = new customRepository();
var userRes = new restUserRepository();

/* ---------------------------------------------- 华丽丽的分割线 ---------------------------------------------------- */

var id;
var page;

/**
 * 初始加载数据
 */
$(function () {
    bindSelfStore('my_sid');

    //审核
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    id = getUrlParam("id");
    /**
     * 公用读取
     */
    if (id){
        var data = resCustom.findVIPById(id);
        if (data) {
            var vip = data.customer;
            //console.log(data);
            $("#my_sid").val(vip.sid);
            $("#name").val(vip.ccname);
            $("#name_old").val(vip.ccname);
            $("#type").val(vip.cctype);
            if (vip.cctype == 1){
                $('#vip_end_date').val('').attr('disabled', 'disabled')
            } else {
                $('#vip_end_date').removeAttr('disabled', 'disabled')
            }
            $("#contactor").val(vip.contactor);
            $("#username").val(data.username);
            $("#username_old").val(data.username);
            $("#refuse_memo").val(fieldNull(data.memo));

            $("#vip_balance").val(num2price(vip.vip_balance));
            $("#vip_daily_reduce").val(num2price(vip.vip_daily_reduce));
            $("#vip_logistics").val(num2price(vip.vip_logistics));
            $("#vip_end_date").val(formatDatetime(vip.vip_end_date, 'Ymd'));

            if (vip.vip_status != 9){
                $("#div-delete").show();
            } else {
                $("#div-recover").show();
            }
        }
    }


    //按钮权限
    if (!checkPower(10408)) {
        disableForm();
    }
    if (!checkPower(10409)) {
        disableForm();
    }

    $('#username').blur(function(){
        checkUsername();
    });
    $('#name').blur(function(){
        checkName();
    });
    $('#type').change(function(){
        if ($(this).val() == 1) {
            $('#vip_end_date').val('').attr('disabled', 'disabled')
        } else {
            $('#vip_end_date').removeAttr('disabled', 'disabled')
        }
    });

    addTooltip("em.help", "#wg-tooltip", "data-help");

    formValidator();
    $('#btn-submit').click(function(){$('#companyForm').submit();});

    autoCheckBox();


});

/**
 * 禁用表单
 */
function disableForm(){
    $('#btn-submit').remove();
    $('input').attr('disabled', 'disabled');
    $('selected').attr('disabled', 'disabled');
}
/* ---------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

/**
 * 组装参数
 * @returns {*}
 */
function buildParams(){
    var ret = {};
    if (1) {
        var my_sid = $("#my_sid").val();
        var username = $("#username").val();
        var name = $("#name").val();
        var type = $("#type").val();
        var contactor = $("#contactor").val();
        var memo = $("#memo").val();
        //var vip_balance = num2price($("#vip_balance").val());
        var vip_logistics = num2price($("#vip_logistics").val());
        //var vip_daily_reduce = $("#vip_daily_reduce").val();
        var vip_end_date = $("#vip_end_date").val();
        ret = {
            "my_sid": my_sid,
            "username": username,
            "name": name,
            "type": type,
            "contactor": contactor,
            "memo": memo,
            "vip_end_date": vip_end_date,
            "vip_logistics": vip_logistics,
        };
    }
    return ret;
}


/**
 * 注册
 */
function regVIP() {
    var msg = false;
    var params = buildParams();
    if (typeof(params) == 'string') {
        runnerAlert('操作提示', params);
    } else if (params){
        msg = resCustom.registerVIP(params);
    }
    return msg;
}


/**
 * 修改
 */
function updateVIP() {
    var msg = false;
    var params = buildParams();
    if (typeof(params) == 'string') {
        runnerAlert('操作提示', params);
    } else if (params){
        msg = resCustom.updateVIP(id, params);
    }
    return msg;
}


/**
 * 停用
 */
function deleteVIP() {
    if (confirm('确定停用该账号吗？')){
        var sres = resCustom.deleteVIP(id);
        if (sres) {
            noticeFrame(411, 'refrush', page);
            runnerConfirem("操作提示", "停用成功");
        }
    }
}

/**
 * 启用
 */
function recoverVIP() {
    if (confirm('确定启用该账号吗？')){
        var sres = resCustom.recoverVIP(id);
        if (sres) {
            noticeFrame(411, 'refrush', page);
            runnerConfirem("操作提示", "启用成功");
        }
    }
}


/**
 * 表单验证
 */
function formValidator() {
    var validator = $("#companyForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            username: {required: true, mobile:[] },
            contactor: {required: true, maxlength: 20},
            memo: {maxlength: 200}
        },
        messages: {
            name: {
                required: "请填写会员昵称",
                minlength: "会员昵称最少需要2个字",
                maxlength: "会员昵称最多不要超过20个字",
            },
            contactor: {required: "请填写姓名", maxlength: "姓名最多输入20个字"},
            type: {required: "请选择会员等级"},
            username: {required: "请填写真实手机号"},
            memo: {maxlength: "备注信息最多输入200个字"},
        },
        submitHandler: function () {
            var sres;
            if (id){
                sres = updateVIP();
                if (sres) {
                    noticeFrame(411, 'refrush', page);
                    runnerConfirem("操作提示", "修改成功");
                }
            } else {
                sres = regVIP();
                if (sres) {
                    noticeFrame(411, 'refrush', page);
                    runnerConfiremUrl("操作提示", "注册成功", false, "/mainframe/baseinfo/vipReg.html?iframeid=412&iframename=" + encodeURI("会员注册"));
                }
            }

        },
    });
    /**
     * 表单按键模拟
     */
    $("#companyForm").mouseMove({
        focusElem: "input",
        focusId: "username"
    });
}


/**
 * 检测用户名是否已存在
 * @return boolean 是否可用
 */
function checkUsername(){
    var username = $.trim($('#username').val());
    var username_old = $.trim($('#username_old').val());
    if (username.length >= 5 && username != username_old) {
        var sres = userRes.checkUsername(username, 1);
        if (sres) {
            if (sres.result) {
                $('#tips_username').html('该号码已被占用').css('color', "#E56762").show();
                $('#refuse_memo').val('该号码已被占用');
                return false;
            } else {
                //$('#tips_username').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_username').hide();
                $('#name').val($.trim($('#username').val()));
                return true;
            }
        }
    } else {
        $('#tips_username').hide();
    }
    return false;
}


/**
 * 检测会员昵称是否已存在
 */
function checkName(){
    var name = $.trim($('#name').val());
    var name_old = $.trim($('#name_old').val());
    if (name.length >= 3 && name != name_old) {
        var sres = resCustom.checkName(name, 1);
        if (sres) {
            if (sres.result) {
                $('#tips_name').html('该昵称已被占用').css('color', "#E56762").show();
                $('#refuse_memo').val('该昵称已被占用');
            } else {
                //$('#tips_name').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_name').hide();
            }
        }
    } else {
        $('#tips_name').hide();
    }
}