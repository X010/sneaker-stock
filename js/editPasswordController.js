var userRes = new restUserRepository();

$().ready(function () {
    var validator = $("#editForm").validate({
        rules: {
            oldPassword: {minlength: 6, maxlength: 15},
            newPassword: {minlength: 6, maxlength: 15},
            twoPassword: {minlength: 6, maxlength: 15, equalTo: "#newPassword"},
        },
        messages: {
            oldPassword: {
                required: "请输入原密码",
                minlength: "密码最少需要6个字符",
                maxlength: "密码最多不能超15个符"
            },
            newPassword: {
                required: "请输入新密码",
                minlength: "密码最少需要6个字符",
                maxlength: "密码最多不能超15个符"
            },
            twoPassword: {
                required: "请再次输入新密码",
                minlength: "密码最少需要6个字符",
                maxlength: "密码最多不能超15个符",
                equalTo: "两次新密码输入不一致,请重新输入"
            }
        },
        submitHandler: function () {
            var old_password = $("#oldPassword").val();
            var password = $("#newPassword").val();


            var postData = {
                "old_password": old_password,
                "password": password
            };

            var sres = userRes.editPassWord(postData);
            //console.log(sres);
            //if (sres != null && sres != false) {
            if (sres == 'success') {
                postUrl = urlDefault("LOGIN_OUT");
                postData = {"ticket": cookieUtil("ticket")};
                var result = asyncAjax(postUrl, postData);
                if (result != null && result != false) {
                    runnerConfiremUrl("操作提示", "修改成功，请重新登录", true, "/login.html");
                }
            } else {
                runnerAlert("操作提示", "修改失败(" + sres + ")");
            }
        }
    });

    $("#oldPassword").pwdStrongCheck();
    $("#newPassword").pwdStrongCheck();
    $("#twoPassword").pwdStrongCheck();
});
