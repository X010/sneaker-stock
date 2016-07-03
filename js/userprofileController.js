var userRes = new restUserRepository();

var currentId = 0;
/**
 * 加载个人信息
 */
$(function () {
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        msg = JSON.parse(msg);
        currentId = msg.id;
        //读取用户个人信息
        var data = userRes.findByIdNoPower(currentId);
        if (data != null) {
            //console.log(data);
            $("#username").val(data.username);
            $("#name").val(data.name);
            $("#idcard").val(data.idcard);
            $("#worktype").val(workType(data.worktype));
            $("#email").val(data.email);
            $("#phone").val(data.phone);
            $("#memo").val(data.memo);
        }
    }
});

/**
 * 编辑个人信息
 */
function editUserProfile() {
    /*
    $("#name").attr("disabled", false).removeClass("disabled");
    $("#idcard").attr("disabled", false).removeClass("disabled");
    $("#email").attr("disabled", false).removeClass("disabled");
    $("#phone").attr("disabled", false).removeClass("disabled");
    $("#memo").attr("disabled", false).removeClass("disabled");
    */
    $("input").removeAttr("disabled");
    $("textarea").removeAttr("disabled");
    $("#username").attr("disabled","disabled");
    $("#name").attr("disabled","disabled");
    $("#worktype").attr("disabled","disabled");
    $("#useredit").hide();
    $("#usersave").show();

}

/**
 * 保存个人用户信息
 */
function saveUserProfile() {
    var name = $("#name").val();
    var idcard = $("#idcard").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var memo = $("#memo").val();

    var postData = {
        "name": name,
        "idcard": idcard,
        "email": email,
        "phone": phone,
        "memo": memo
    };
    var sres = userRes.editSelf(currentId, postData);
    if (sres != null) {
        runnerAlert("操作提示", "修改成功");
    }
}

/**
 * 表单验证
 */
$().ready(function () {
    var validator = $("#userProfileForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            idcard: {idCard: []},
            phone: {required: true, mobile: []},
            email: {mail: []}
        },
        messages: {
            name: {
                required: "请输入真实姓名",
                minlength: "真实姓名最少需要2个字",
                maxlength: "真实姓名最多不要超过20个字",
            },
            idcard: {required:"请输入身份证号码"},
            phone: {required: "用于接收系统短信，请填写真实手机号"},
            email: {required:"请输入手机号码"},
        },
        submitHandler: function () {
            saveUserProfile();
        },
    });

});