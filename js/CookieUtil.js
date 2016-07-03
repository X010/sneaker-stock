/**
 * Cookie 操作
 */

/**
 * 登录后保存cookie
 * @param msg
 */
function saveLoginCookie(msg){
    var expsecends = 7 * 24 * 60 * 60;
    setCookieExpires('ticket', msg.ticket, expsecends);
    setCookieExpires('username', msg.username, expsecends);
    setCookieExpires('userprofile', JSON.stringify(msg), expsecends);
    if ($('#remember').length){
        var remember = $('#remember').prop('checked') ? 1 : 0;
        setCookieExpires('remember', remember);
    }
}

/**
 * 设置带过期时间的cookie
 * @param key
 * @param data
 * @param sec
 * @return boolean
 */
function setCookieExpires(key, data, sec){
    if (key != null && typeof(key) != 'undefined'){
        data = data != null ? encodeURI(data) : '';
        if (sec){
            var exp = new Date();
            exp.setTime(exp.getTime() + parseInt(sec) * 1000);
            document.cookie = key + "=" + data + ";expires=" + exp.toUTCString();
        } else {
            document.cookie = key + "=" + data + ";";
        }
        return true;
    } else {
        return false
    }
}

/**
 * 读取cookie
 * @param name
 * @returns {*}
 */
function cookieUtil(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null)
    return decodeURI(arr[2]);
  return null;
}

/**
 * 删除cookies
 * @param name
 */
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=cookieUtil(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

