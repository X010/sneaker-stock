
function taskRepository() {

    /**
     * 浏览销售任务单列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAll = function (page, pageNum, params) {
        var postUrl = urlDefault("SALE_TASK_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询销售任务单详情
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("SALE_TASK_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 创建销售任务单
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("SALE_TASK_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 修改销售任务单
     * @param id
     * @param item
     */
    this.update = function (id, item) {
        var postUrl = urlDefault("SALE_TASK_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 删除销售任务单
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("SALE_TASK_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


}
