
/**
 * 退货Rest
 */
function returnGoodsRepository() {

    /**
     * 自定义退货入库
     * @param item
     */
    this.directReturnOutBill = function (item) {
        var postUrl = urlDefault("RETURNIN_DIRECT");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改并审核退货入库
     * @param id
     * @param item
     */
    this.updateAndCheckReturnInBill = function (id, item) {
        var postUrl = urlDefault("RETURNIN_UPDATE_CHECK") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 创建并审核退货入库单
     * @param item
     */
    this.addAndCheckReturnInBill = function (item) {
        var postUrl = urlDefault("RETURNIN_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 取消退货入库单
     * @param id
     */
    this.deleteReturnInBill = function (id) {
        var postUrl = urlDefault("RETURNIN_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 更新退货入库单
     * @param id
     * @param item
     */
    this.updateReturnInBill = function (id, item) {
        var postUrl = urlDefault("RETURNIN_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 根据ID查询退货入库单
     * @param id
     */
    this.findReturnInByIdBill = function (id) {
        var postUrl = urlDefault("RETURNIN_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     *
     * @param page
     * @param pageNum
     * @param status
     */
    this.findAllReturnInBill = function (page, pageNum, status) {
        var postUrl = urlDefault("RETURNIN_READ");
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
     * Search
     * @param page
     * @param pageNum
     * @param status
     */
    this.findAllReturnInBillSearch = function (page, pageNum, status, search) {
        var postUrl = urlDefault("RETURNIN_READ");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "status": status,
            "search": search
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * Search by field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllReturnInBillField = function (page, pageNum, params) {
        var postUrl = urlDefault("RETURNIN_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 创建退货入库单
     * @param item
     */
    this.addReturnInBill = function (item) {
        var postUrl = urlDefault("RETURNIN_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 修正退入单
     * @param id
     * @param item
     * @returns {*}
     */
    this.ReturnInBillRepaireBill = function (id, item) {
        var postUrl = urlDefault("RETURNIN_REPAIRE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 冲正退入单
     * @param id
     * @param item
     * @returns {*}
     */
    this.ReturnInBillFlushBill = function (id) {
        var postUrl = urlDefault("RETURNIN_FLUSH") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 修改并审核退货单
     * @param id
     * @param item
     */
    this.updateAndCheckReturnOutBill = function (id, item) {
        var postUrl = urlDefault("RETURNOUT_UPDATE_CHECK") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 创建并审核退货单
     * @param item
     */
    this.addAndCheckReturnOutBill = function (item) {
        var postUrl = urlDefault("RETURNOUT_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 取消退货单
     * @param id
     */
    this.deleteReturnOutBill = function (id) {
        var postUrl = urlDefault("RETURNOUT_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 更新退货单
     * @param id
     * @param item
     */
    this.updateReturnOutBill = function (id, item) {
        var postUrl = urlDefault("RETURNOUT_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 根据ID查询退货单详情
     * @param id
     */
    this.findReturnOutByIdBillIN = function (id) {
        var postUrl = urlDefault("RETURNOUT_READ_BY_ID_OUT") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID查询退货单详情
     * @param id
     */
    this.findReturnOutByIdBillOUT = function (id) {
        var postUrl = urlDefault("RETURNOUT_READ_BY_ID_IN") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取退货单列表
     * @param page
     * @param pageNum
     * @param status
     */
    this.findAllReturnOutBill_IN = function (page, pageNum, status) {
        var postUrl = urlDefault("RETURNOUT_READ_OUT");
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
     * 读取退货单列表 Search
     * @param page
     * @param pageNum
     * @param status
     */
    this.findAllReturnOutBill_INSearch = function (page, pageNum, status, search) {
        var postUrl = urlDefault("RETURNOUT_READ_OUT");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "status": status,
            "search": search
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取退货单列表 field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllReturnOutBill_INField = function (page, pageNum, params) {
        var postUrl = urlDefault("RETURNOUT_READ_OUT");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取退货单列表
     * @param page
     * @param pageNum
     * @param status
     */
    this.findAllReturnOutBill_OUT = function (page, pageNum, status) {
        var postUrl = urlDefault("RETURNOUT_READ_IN");
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
     * 读取退货单列表 Search
     * @param page
     * @param pageNum
     * @param status
     */
    this.findAllReturnOutBill_OUTSearch = function (page, pageNum, status, search) {
        var postUrl = urlDefault("RETURNOUT_READ_IN");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "status": status,
            "search": search
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取退货单列表 Search
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllReturnOutBill_OUTField = function (page, pageNum, params) {
        var postUrl = urlDefault("RETURNOUT_READ_IN");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 生成退货单
     * @param item
     */
    this.addReturnOutBill = function (item) {
        var postUrl = urlDefault("RETURNOUT_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修正退出单
     * @param id
     * @param item
     * @returns {*}
     */
    this.ReturnOutBillRepaireBill = function (id, item) {
        var postUrl = urlDefault("RETURNOUT_REPAIRE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 冲正退出单
     * @param id
     * @param item
     * @returns {*}
     */
    this.ReturnOutBillFlushBill = function (id) {
        var postUrl = urlDefault("RETURNOUT_FLUSH") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };
}