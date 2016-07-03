function asyncAjax(postUrl, postData) {
    var resultData = null;
    $.ajax({
        url: postUrl,
        type: "POST",
        timeout: 30000,
        async: false,
        data: postData,
        dataType: "json",
        success: function (data, textStatus) {
            var result = data.status;
            if (result == "0000") {
                resultData = data.msg;
            } else {
                //表示有错误需要根据错误段进行后续判断
                var error_code = parseInt(result);
                if (error_code >= 1300 && error_code <= 1310) {
                    //登陆时密码或用户名错误
                    //resultData = false;
                    resultData = data.msg;
                } else if (error_code == 3108) {
                    runnerConfirem('信息提示', data.msg);  //关闭当前页
                } else if (error_code >= 8000 && error_code <= 8010) {
                    //帐号在别处登陆或被踢
                    alert('账号已退出，请重新登录！');
                    if (window.parent != null) {
                        window.parent.location.href = "/login.html";
                    } else {
                        window.location.href = "/login.html";
                    }
                    throw  new Error("no login");
                } else if (error_code >= 8100 && error_code <= 8199) {
                    runnerConfirem('信息提示', data.msg);  //关闭当前页
                } else if (error_code >= 9900 && error_code <= 9999) {
                    //系统错误
                    var msg = '后端接口出错(' + data.msg + ')，请联系管理员!';
                    alert(msg);
                    resultData = null;
                } else {
                    //其它都是Notic信息
                    runnerAlert("信息提示", data.msg);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR, textStatus, errorThrown);
            var msg = '';
            if (errorThrown.name == "NetworkError"){
                if (postUrl.indexOf('/login/check') != '-1'){
                    return;
                } else {
                    msg = '网络环境异常，请重试。';
                }
            } else {
                msg = '后端接口出错(' + errorThrown + ')，请联系管理员！';
            }
            alert(msg);
            resultData = null;
        }
    });
    return resultData;
}
