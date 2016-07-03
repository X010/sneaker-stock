
/**
 * 价格模块API交互
 */
function priceRepository() {

    /**
     * 读取进货调价单
     */
    this.findStockinPriceAll = function (page, pageNum, status) {
        var postUrl = urlDefault("PRICE_READ_IN");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "status": status
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取进货调价单 by filed
     */
    this.findStockinPriceByField = function (page, pageNum, params) {
        var postUrl = urlDefault("PRICE_READ_IN");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取出货调价单
     */
    this.findStockoutPriceAll = function (page, pageNum, status) {
        var postUrl = urlDefault("PRICE_READ_OUT");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "status": status
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取出货调价单 by filed
     */
    this.findStockoutPriceByField = function (page, pageNum, params) {
        var postUrl = urlDefault("PRICE_READ_OUT");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };



    /**
     * 查询价格列表
     * @param page
     * @param pageNum
     * @param sid
     */
    this.priceReadGood = function (page, pageNum, sid, search) {
        var postUrl = urlDefault("PRICE_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "sid": sid
        };
        if (search) {
            postData['search'] = search;
        }
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询价格列表 by Field
     * @param page
     * @param pageNum
     * @param params
     */
    this.priceReadGoodByField = function (page, pageNum, params) {
        var postUrl = urlDefault("PRICE_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };




    /**
     * 修改并审核入货价调价单
     * @param id
     * @param item
     */
    this.editAndCheckStockinPrice = function (id, item) {
        var postUrl = urlDefault("PRICE_EDIT_CHECK_IN") + id;
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 修改并审核出货价调价单
     * @param id
     * @param item
     */
    this.editAndCheckStockoutPrice = function (id, item) {
        var postUrl = urlDefault("PRICE_EDIT_CHECK_OUT") + id;
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 创建出货价调价单
     * @param item
     */
    this.createStockoutPrice = function (item) {
        var postUrl = urlDefault("PRICE_CREATE_OUT");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };



    /**
     * 创建进货价调价单
     * @param item
     */
    this.createStockinPrice = function (item) {
        var postUrl = urlDefault("PRICE_CREATE_IN");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };



    /**
     * 创建并审核入货价调价单
     * @param item
     */
    this.createAndCheckStockinPrice = function (item) {
        var postUrl = urlDefault("PRICE_CHECK_IN");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 创建并审核出货价调价单
     * @param item
     */
    this.createAndCheckStockoutPrice = function (item) {
        var postUrl = urlDefault("PRICE_CHECK_OUT");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 读取入货价调价单详情
     * @param id
     */
    this.findStockinPriceById = function (id) {
        var postUrl = urlDefault("PRICE_READ_IN_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 读取出货价调价单详情
     * @param id
     */
    this.findStockoutPriceById = function (id) {
        var postUrl = urlDefault("PRICE_READ_OUT_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 取消调价单
     */
    this.deletePriceById = function (id) {
        var postUrl = urlDefault("PRICE_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 查询所有仓库商品价格
     * @param item
     */
    this.readPriceInAllStore = function (page, pageNum, params) {
        var postUrl = urlDefault("PRICE_IN_ALL_STORE_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };





    //以下为 进货促销调价

    /**
     * 创建进货促销调价单
     * @param item
     * @returns {*}
     */
    this.createStockinSalesPromotionPrice = function (item) {
        var postUrl = urlDefault("PRICE_CREATE_SALES_IN");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 读取进货促销价详情
     * @param id
     */
    this.findStockinSalePromotionPriceById = function (id) {
        var postUrl = urlDefault("PRICE_READ_SALES_IN_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 创建并审核进货促销调价单
     * @param item
     */
    this.createAndCheckStockinSalesPromotionPrice = function (item) {
        var postUrl = urlDefault("PRICE_CHECK_SALES_IN");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 读取进货促销价列表,根据 Field
     */
    this.findSalesPromotionPriceByField = function (page, pageNum, params) {
        var postUrl = urlDefault("VIEW_SALES_PROMOTION_BY_GID_SID_STATUS");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 进货促销价审核
     * @param id
     * @param item
     * @returns {*}
     */
    this.editAndCheckStockinSalesPromotionPrice = function (id, item) {
        var postUrl = urlDefault("PRICE_EDIT_CHECK_SALES_IN") + id;
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 读取进货促销价列表
     * @param page
     * @param pageNum
     * @param params
     * @returns {*}
     */
    this.findStockinSalePromotionPriceByField = function (page, pageNum, params) {
        var postUrl = urlDefault("PRICE_READ_SALES_IN");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 删除进货促销调价单(审核不通过)
     * @param id
     * @returns {*}
     */
    this.deleteStockinSalesPromotionPrice = function (id) {
        var postUrl = urlDefault("PRICE_SALES_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


}