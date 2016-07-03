
/**
 * 进出货操作Rest
 */
function stockRepository() {

    /**
     * 自定义出库单
     * @param item
     */
    this.directStockOut = function (item) {
        var postUrl = urlDefault("STOCKOUT_DRIECT");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 自定义入库单
     * @param item
     */
    this.directStockIn = function (item) {
        var postUrl = urlDefault("STOCKIN_DRIECT");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 根据查询关建字来查询(支持字段筛选)
     * @param page
     * @param pageNum
     * @param params
     * @returns {*}
     */
    this.findOrderAllByField = function (page, pageNum, params) {
        var postUrl = urlDefault("ORDER_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询入库单列表 (by field)
     * @param page
     * @param pageNum
     * @param params
     */
    this.findStockInAllField = function (page, pageNum, params) {
        var postUrl = urlDefault("STOCKIN_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询出库单列表 field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findStockOutAllField = function (page, pageNum, params) {
        var postUrl = urlDefault("STOCKOUT_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建采购单
     * @param item
     */
    this.addOrder = function (item) {
        var postUrl = urlDefault("ORDER_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 更新采购订单
     * @param id
     * @param item
     */
    this.updateOrder = function (id, item) {
        var postUrl = urlDefault("ORDER_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 更新客户订单
     * @param id
     * @param item
     */
    this.updateCustomOrder = function (id, item) {
        var postUrl = urlDefault("ORDER_OF_CUSTOMER_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 保存客户订单回访结果
     * @param id
     * @param item
     */
    this.saveRevisitForCustomOrder = function (id, item) {
        var postUrl = urlDefault("SAVE_REVISIT_FOR_CUSTOM_ORDER") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 客户订单拆单
     * @param id
     * @param item
     */
    this.divideOrder = function (id, item) {
        var postUrl = urlDefault("ORDER_SPLIT") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 审核采购订单(有ID则审核,无ID则创建并审核)
     * @param item
     */
    this.checkOrder = function (id, item) {
        var postUrl = urlDefault("ORDER_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 审核入库单(有ID则审核,无ID则创建并审核)
     * @param id
     */
    this.checkStockIn = function (id, item) {
        var postUrl = urlDefault("STOCKIN_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 审核出库(有ID则审核,无ID则创建并审核)
     * @param id
     * @param item
     */
    this.checkStockOut = function (id, item) {
        var postUrl = urlDefault("STOCKOUT_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 浏览订单详情
     * @param id
     */
    this.findOrderById = function (id) {
        var postUrl = urlDefault("ORDER_READE_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览订单详情for客户回访
     * @param id
     */
    this.findOrderByIdForRevisit = function (id) {
        var postUrl = urlDefault("ORDER_READE_BY_ID_FOR_REVISIT") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 浏览出货订单详情
     * @param id
     */
    this.findOrderByOutId = function (id) {
        var postUrl = urlDefault("ORDER_READ_OUT_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 读取出货订单列表
     * @param page
     * @param pageNum
     * @param status
     */
    this.findOrderOutAll = function (page, pageNum, status) {
        var postUrl = urlDefault("ORDER_LIST_OUT");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            //"status": status //后端已限制为2
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取出货订单列表  Search
     * @param page
     * @param pageNum
     * @param status
     */
    this.findOrderOutAllSearch = function (page, pageNum, status, search) {
        var postUrl = urlDefault("ORDER_LIST_OUT");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "search": search
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取出货订单列表(支持字段筛选)
     * @param page
     * @param pageNum
     * @param params
     */
    this.findOrderOutAllField = function (page, pageNum, params) {
        var postUrl = urlDefault("ORDER_LIST_OUT");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取出货订单列表(for 客服分配)
     * @param page
     * @param pageNum
     * @param params
     */
    this.findOrderOutForCustomService = function (page, pageNum, params) {
        var postUrl = urlDefault("ORDER_LIST_OUT_FOR_CUSTOMER_SERVICE");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取出货订单列表(for 客服回访)
     * @param page
     * @param pageNum
     * @param params
     */
    this.findOrderOutForCustomRevisit = function (page, pageNum, params) {
        var postUrl = urlDefault("ORDER_LIST_OUT_FOR_CUSTOMER_REVISIT");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 审核不通过
     * @param id
     */
    this.checkNoPass = function (id) {
        var postUrl = urlDefault("ORDER_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 取消客户订单
     * @param id
     */
    this.cancelCustomOrder = function (id) {
        var postUrl = urlDefault("ORDER_CUSTOM_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 生成出库单
     * @param item
     */
    this.addStockOut = function (item) {
        var postUrl = urlDefault("STOCKOUT_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 创建并预审出库单
     * @param item
     * @returns {*}
     */
    this.addStockOutAndPreCheck = function (item) {
        var postUrl = urlDefault("STOCKOUT_PRECHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改并预审
     * @param id
     * @param item
     */
    this.editStockOutAndPreCheck = function (id, item) {
        var postUrl = urlDefault("STOCKOUT_EDIT_PRECHECK") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 更新出库单
     * @param id
     * @param item
     */
    this.updateStockOut = function (id, item) {
        var postUrl = urlDefault("STOCK_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 查看出库单详情
     * @param id
     */
    this.findStockOutById = function (id) {
        var postUrl = urlDefault("STOCKOUT_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 取消出库单
     * @param id
     */
    this.checkNoPassStockOut = function (id) {
        var postUrl = urlDefault("STOCKOUT_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建并审核出库单
     * @param item
     */
    this.addAndCheckStockOut = function (item) {
        var postUrl = urlDefault("STOCKOUT_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改并复核出库单
     * @param item
     */
    this.updateAndCheckStockOut = function (item) {
        var postUrl = urlDefault("STOCKOUT_UPDATE_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 创建入库单
     * @param item
     */
    this.addStockIn = function (item) {
        var postUrl = urlDefault("STOCKIN_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 入库单详情
     * @param id
     */
    this.findStockInById = function (id) {
        var postUrl = urlDefault("STOCKIN_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 取消入库
     * @param id
     */
    this.checkNoPassStockIn = function (id) {
        var postUrl = urlDefault("STOCKIN_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建并审核入库单
     * @param item
     */
    this.addAndCheckStockIn = function (item) {
        var postUrl = urlDefault("STOCKIN_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改入库单
     * @param id
     * @param item
     */
    this.updateStockIn = function (id, item) {
        var postUrl = urlDefault("STOCKIN_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改并复核入库单
     * @param item
     */
    this.updateAndRecheckStockIn = function (item) {
        var postUrl = urlDefault("STOCKIN_UPDATE_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 查询进货仓库商品 添加oldPrice 参数用于调价单那块的原价查询
     * @param page
     * @param pageNum
     * @param storeIn
     * @param keyword
     */
    this.readStockInGoods = function (page, pageNum, storeIn, keyword, cidOut, old_price) {
        var postUrl = urlDefault("STOREGOODS_READIN");
        var postData = {
            "page": page,
            "page_num": pageNum,
            "in_sid": storeIn,
            "search": keyword,
            "out_cid": cidOut,
            "old_price": old_price,
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 查询出货仓库商品
     * @param page
     * @param pageNum
     * @param storeIn
     * @param storeOut
     * @param keyword
     */
    this.readStockOutGoods = function (page, pageNum, incid, storeOut, keyword) {
        var postUrl = urlDefault("STOREGOODS_READOUT");
        var postData = {
            "page": page,
            "page_num": pageNum,
            "in_cid": incid,
            "out_sid": storeOut,
            "search": keyword,
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 修正入库单
     * @param id
     * @param item
     * @returns {*}
     */
    this.stockInRepaireBill = function (id, item) {
        var postUrl = urlDefault("STOCKIN_REAIRE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 冲正入库单
     * @param id
     * @param item
     * @returns {*}
     */
    this.stockInFlushBill = function (id) {
        var postUrl = urlDefault("STOCKIN_FLUSH") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 修正出库单
     * @param id
     * @param item
     * @returns {*}
     */
    this.stockOutRepaireBill = function (id, item) {
        var postUrl = urlDefault("STOCKOUT_REPAIRE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 冲正出库单
     * @param id
     * @param item
     * @returns {*}
     */
    this.stockOutFlushBill = function (id) {
        var postUrl = urlDefault("STOCKOUT_FLUSH") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 查询最早批次的库存商品(sid & search)
     * @param page
     * @param pageNum
     * @param params
     */
    this.readEarliestGoodsInStore = function (page, pageNum, params) {
        var postUrl = urlDefault("READ_GOODS_OLD");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 查询进货仓库商品
     * @param page
     * @param pageNum
     * @param params
     */
    this.readStockInGoodsByField = function (page, pageNum, params) {
        var postUrl = urlDefault("STOREGOODS_READIN");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询出货仓库商品
     * @param page
     * @param pageNum
     * @param params
     */
    this.readStockOutGoodsByField = function (page, pageNum, params) {
        var postUrl = urlDefault("STOREGOODS_READOUT");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };



}
