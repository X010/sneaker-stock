
/**
 * 盘点Repository接品操作
 */
function checkRepository() {


    /**
     * 读取帐盘列表
     */
    this.findAcccountSet = function (page, pageNum, params) {
        var postUrl = urlDefault("ACCOUNTSET_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建帐盘接口
     * @param item
     */
    this.createAccountSet = function (item) {
        var postUrl = urlDefault("ACCOUNTSET_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 审核帐盘接口
     * @param id
     * @param item
     */
    this.checkAccountSet = function (id) {
        var postUrl = urlDefault("ACCOUNTSET_CHECK") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 根据ID读取帐盘信息
     * @param id
     */
    this.findAcccountSetById = function (id) {
        var postUrl = urlDefault("ACCOUNTSET_READ_BY_ID") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 判断仓库是否已经生成帐盘单
     * @param sid
     */
    this.checkStoreIsHaveFirmOffer = function (sid) {
        var postUrl = urlDefault("ACCOUNTSET_CHECK_FOR_STORE");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "sid": sid
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 新建实盘
     * @param item
     */
    this.createFirmOffer = function (item) {
        var postUrl = urlDefault("FRIMOFFER_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 保存并审核
     * @param item
     */
    this.createAndCheckFrimOffer = function (item) {
        var postUrl = urlDefault("FRIMOFFER_CREATE_AND_CHECK");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 读取实盘列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.findFirmOffer = function (page, pageNum, params) {
        var postUrl = urlDefault("FRIMOFFER_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 审核实盘单
     * @param id
     * @param item
     */
    this.checkFirmOffer = function (id, item) {
        var postUrl = urlDefault("FRIMOFFER_CHECK") + id;
        item.ticket = cookieUtil("ticket");
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 根据ID读取实盘单详情信息
     * @param id
     */
    this.findFirmOfferById = function (id) {
        var postUrl = urlDefault("FRIMOFFER_READ_BY_ID") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 实盘单商品检索
     * @param page
     * @param pageNum
     * @param params
     */
    this.findGoodsInventory = function (page, pageNum, params) {
        var postUrl = urlDefault("READ_GOODS_INVENTORY");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };
}