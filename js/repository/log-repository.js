
function restLogRepository() {
    /**
     * 查询所有日志
     * @param startTime
     * @param endTime
     */
    this.findAll = function (startTime, endTime, startPage, pageNum) {
        var postURL = urlDefault("LOG_READ_LIST");
        var model = {
            "begin_time": startTime,
            "end_time": endTime,
            "ticket": cookieUtil("ticket"),
            "page": startPage,
            "page_num": pageNum
        };
        var result = asyncAjax(postURL, model);
        if (result != null) {
            $("#logTable").html("");
            //console.log(result);
            var tableData = result;
            return result;
        }
    };


    /**
     * 读取数据并根据
     * @param startTime
     * @param endTime
     * @param startPage
     * @param pageNum

    this.findMenuId = function (startTime, endTime, startPage, pageNum, menuId) {
        var postURL = urlDefault("LOG_READ_LIST");
        var model = {
            "begin_time": startTime,
            "end_time": endTime,
            "ticket": cookieUtil("ticket"),
            "page": startPage,
            "page_num": pageNum
        };
        if (menuId != -1) model['menu_id'] = menuId;
        var result = asyncAjax(postURL, model);
        if (result != null) {
            $("#logTable").html("");
            //console.log(result);
            var tableData = result;
            return result;
        }
    };*/

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
}
