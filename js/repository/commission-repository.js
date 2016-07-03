
function commissionRepository() {

    /**
     * 获取要结算的出货单信息
     */
    this.findStock = function (params) {
        var postUrl = urlDefault("COMMISSION_READ_STOCK");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = 1;
        postData["page_num"] = 500;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览业务员结算单列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAll = function (page, pageNum, params) {
        var postUrl = urlDefault("COMMISSION_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询业务员结算单详情
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("COMMISSION_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 创建业务员结算单
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("COMMISSION_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 创建并审核业务员结算单
     * @param item
     */
    this.createCheck = function (item) {
        var postUrl = urlDefault("COMMISSION_CREATE_CHECK");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 审核业务员结算单
     * @param id
     * @param item
     */
    this.check = function (id, item) {
        var postUrl = urlDefault("COMMISSION_CHECK") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 删除业务员结算单
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("COMMISSION_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 红冲业务员结算单
     * @param id
     */
    this.flush = function (id) {
        var postUrl = urlDefault("COMMISSION_FLUSH") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

}
