
function recordRepository() {

    /**
     * 浏览列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAll = function (page, pageNum, params) {
        var postUrl = urlDefault("VISIT_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询详情
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("VISIT_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 创建
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("VISIT_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 修改
     * @param id
     * @param item
     */
    this.update = function (id, item) {
        var postUrl = urlDefault("VISIT_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 删除
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("VISIT_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };



}
