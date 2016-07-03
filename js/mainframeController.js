/**
 * 页面加载信息
 */
$(function () {
    //var userName = cookieUtil("username");
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        msg = JSON.parse(msg);
        $("#navProfile").html(msg.name);
        //$("#navProfile").html(userName);
    }

    $("#overflowTitle").mouseleave(function(){
        $(this).fadeOut('fast');
    });

    //添加我的工作台页面
    addTab(98, '我的工作台', '/mainframe/workspace.html');
});


var orderFrameIndex = 9000;

/**
 * 打开一个新窗口
 */
function openFrame(name, url, id) {
    id = id ? id : ++orderFrameIndex;
    if (url.indexOf("?") >= 0) {
        url += "&iframeid=" + id + "&iframename=" + name;
    } else {
        url += "?iframeid=" + id + "&iframename=" + name;
    }
    addTab(id, name, url);
}

/**
 * 闭关一个窗口
 * @param id
 * @param name
 */
function closeFrame(id, name) {
    removeTab(id, name);
}


/**
 * 退出操作系统
 */
function logout() {
    if (confirm("您确认退出系统吗?")) {
        var postUrl = urlDefault("LOGIN_OUT");
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        if (result == 'success') {
            delCookie("ticket");
            window.location.href = "/login.html";
        }
    }
}

