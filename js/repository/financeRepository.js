
/**
 * 结算模块Repository层,共计19个接口
 * 其中结算11个接口包括查询\生成\审核\列表\查看详情
 * 付款收款单8个接口,包括列表\审核\保存\查看详情
 */
function financeRepository() {

    /**
     * 查询供应商的结算的出入库单据
     * @param supId
     * @param startTime
     * @param endTime
     * @param baseDate
     * @param sid
     */
    this.findStockInAndOutForSupplier = function (supId, startTime, endTime, baseDate, sids) {
        var postUrl = urlDefault("SUPSETLEMENT_READ_STOCK_IN_AND_OUT");
        var postData = {
            "scid": supId,
            "begintime": startTime,
            "endtime": endTime,
            "basedate": baseDate,
            "sids": sids,
            "ticket": cookieUtil("ticket")
        };

        var res = asyncAjax(postUrl, postData);
        return res;
    };

    /**
     * 用于查询出库入单列表
     */
    this.findStockInAndOutForCustomer = function (cusId, startTime, endTime) {
        var postUrl = urlDefault("SETLEMENT_READ_STOCKINANDOUT");
        var postData = {
            "ccid": cusId,
            "begintime": startTime,
            "endtime": endTime,
            "ticket": cookieUtil("ticket")
        };

        var res = asyncAjax(postUrl, postData);
        return res;
    };

    /**
     * 根据订单号查询
     * @param orderId
     */
    this.findStockInAndOutForCustomerByOrderId = function (orderId) {
        var postUrl = urlDefault("SETLEMENT_READ_STOCKINANDOUT");
        var postData = {
            "order_id": orderId,
            "ticket": cookieUtil("ticket")
        };

        var res = asyncAjax(postUrl, postData);
        return res;
    };

    /**
     * 根据自定义字段查询
     * @param params
     */
    this.findStockInAndOutForCustomerByField = function (params) {
        var postUrl = urlDefault("SETLEMENT_READ_STOCKINANDOUT");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建供应商结算单
     * @param item
     */
    this.createSupSetlement = function (item) {
        var postUrl = urlDefault("SUPSETLEMENT_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 审核供应商结算单列表
     * @param id
     * @param item
     */
    this.checkSupSetlement = function (id, item) {
        var postUrl = urlDefault("SUPSETLEMENT_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 读取供应商结算单列表
     */
    this.findSupSetlementAll = function (page, pageNum, params) {
        var postUrl = urlDefault("SUPSETLEMENT_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取供应商结算单详情
     * @param id
     */
    this.findSupSetlementById = function (id) {
        var postUrl = urlDefault("SUPSETLEMENT_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取供应商结算单商品清单
     * @param id
     */
    this.findSupSetlementGoodsById = function (id) {
        var postUrl = urlDefault("SUPSETLEMENT_GOODS_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 根据ID结供应商结算单进行红冲
     * @param id
     */
    this.xdSupSetlementById = function (id) {
        var postUrl = urlDefault("SUPSETLEMENT_XD") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID结供应商结算单进行删除
     * @param id
     */
    this.delSupSetlementById = function (id) {
        var postUrl = urlDefault("SUPSETLEMENT_DELETE_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建客户结算单
     * @param item
     */
    this.createCusSetlement = function (item) {
        var postUrl = urlDefault("CUSSETLEMENT_CREATE");

        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 审核客户结算单列表
     * @param id
     * @param item
     */
    this.checkCusSetlement = function (id, item) {
        var postUrl = urlDefault("CUSSETLEMENT_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 读取客户结算单列表
     */
    this.findCusSetlementAll = function (page, pageNum, params) {
        var postUrl = urlDefault("CUSSETLEMENT_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID读取客户结算单详情
     * @param id
     */
    this.findCusSetlementById = function (id) {
        var postUrl = urlDefault("CUSSETLEMENT_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID读取客户结算单商品清单
     * @param id
     */
    this.findCusSetlementGoodsById = function (id) {
        var postUrl = urlDefault("CUSSETLEMENT_GOODS_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID红冲客户结算单
     * @param id
     */
    this.xdCusSetlementById = function (id) {
        var postUrl = urlDefault("CUSSETLEMENT_XD") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID删除客户结算单
     * @param id
     */
    this.delCusSetlementById = function (id) {
        var postUrl = urlDefault("CUSSETLEMENT_DELETE_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建收款单
     * @param item
     */
    this.createGathering = function (item) {
        var postUrl = urlDefault("GATHERING_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 审核收款单(id为false则为创建并审核)
     * @param id
     * @param item
     */
    this.checkGathering = function (id, item) {
        var postUrl = urlDefault("GATHERING_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 读取收款单列表
     */
    this.findGatheringAll = function (page, pageNum, params) {
        var postUrl = urlDefault("GATHERING_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查看收款单详情
     * @param id
     */
    this.findGatheringById = function (id) {
        var postUrl = urlDefault("GATHERING_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 冲正收款单详情
     * @param id
     */
    this.xdGatheringById = function(id)
    {
        var postUrl = urlDefault("GATHERING_XD_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 删除收款单
     * @param id
     */
    this.delGatheringById = function(id)
    {
        var postUrl = urlDefault("GATHERING_DELETE_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 创建付款单
     * @param item
     */
    this.createPayment = function (item) {
        var postUrl = urlDefault("PAYMENT_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 审核付款单
     * @param id (id为false则为创建并审核)
     * @param item
     */
    this.checkPayment = function (id, item) {
        var postUrl = urlDefault("PAYMENT_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 读取付款单列表
     */
    this.findPaymentAll = function (page, pageNum, params) {
        var postUrl = urlDefault("PAYMENT_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取付款单详情
     * @param id
     */
    this.findPaymentById = function (id) {
        var postUrl = urlDefault("PAYMENT_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 红冲付款单
     * @param id
     * @returns {*}
     */
    this.xdPaymentById = function(id)
    {
        var postUrl = urlDefault("PAYMENT_XD_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 删除付款单
     * @param id
     * @returns {*}
     */
    this.delPaymentById = function(id)
    {
        var postUrl = urlDefault("PAYMENT_DELETE_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };



    /**
     * 读取代销结算商品
     */
    this.findProxySetlementGoods = function (params) {
        var postUrl = urlDefault("PROXYSETLEMENT_GOODS_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = 1;
        postData["page_num"] = 100;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 创建代销结算单
     */
    this.createProxySetlement = function (params) {
        var postUrl = urlDefault("PROXYSETLEMENT_CREATE");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览代销结算单列表
     */
    this.readProxySetlement = function (page, pageNum, params) {
        var postUrl = urlDefault("PROXYSETLEMENT_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取代销结算单详情
     */
    this.readProxySetlementById = function (id) {
        var postUrl = urlDefault("PROXYSETLEMENT_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 审核代销结算单
     */
    this.checkProxySetlement = function (id, item) {
        var postUrl = urlDefault("PROXYSETLEMENT_CHECK") + (id ? id : '');
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 作废代销结算单
     */
    this.deleteProxySetlement = function (id) {
        var postUrl = urlDefault("PROXYSETLEMENT_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 冲单代销结算单
     */
    this.flushProxySetlement = function (id) {
        var postUrl = urlDefault("PROXYSETLEMENT_FLUSH") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

}