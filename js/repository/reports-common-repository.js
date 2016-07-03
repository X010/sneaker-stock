
function reportsCommonRepository() {

    /**
     * 通用查询
     * @param URL
     * @param params
     * @param page
     * @param pageNum
     */
    this.query = function (URL, params, page, pageNum) {
        var data;
        var postUrl = urlDefault(URL);
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = typeof(params)=='object' ? params : {};
            postData["ticket"] = ticket;
            postData["page"] = page;
            postData["page_num"] = pageNum;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 通用查询 for download
     * @param URL
     * @param params
     * @param page
     * @param pageNum
     */
    this.download = function (URL, params, page, pageNum) {
        var data;
        var postUrl = urlDefault(URL);
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = typeof(params)=='object' ? params : {};
            postData["ticket"] = ticket;
            postData["page"] = page;
            postData["page_num"] = pageNum;
            postData["download"] = 'excel';
            data = jsPOST(postUrl, postData);
        }
        return data;
    };
}

/**
 * js模拟提交POST(用于下载)
 * @param URL
 * @param PARAMS
 * @returns {Element}
 */
function jsPOST(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}