
/**
 * 库存Rest
 */
function inventoryRepository() {

    /**
     * 修改并审核调拔单
     * @param id
     * @param item
     */
    this.editAndCheckTransferBill = function (id, item) {
        var postUrl = urlDefault("TRANSFER_UPDATE_CHECK") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 创建并审核调拔单
     * @param item
     */
    this.addAndCheckTransferBill = function (item) {
        var postUrl = urlDefault("TRANSFER_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 调拔收货
     * @param id
     * @param item
     */
    this.transferReviceGood=function(id,item)
    {
        var postUrl = urlDefault("TRANSFER_REVICE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 取消调拔单
     * @param id
     */
    this.deleteTransferBill = function (id) {
        var postUrl = urlDefault("TRANSFER_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 冲正调出单
     * @param id
     * @param item
     * @returns {*}
     */
    this.flushTransferBill  = function (id) {
        var postUrl = urlDefault("TRANSFER_FLUSH") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 更新调拔单信息
     * @param id
     * @param item

    this.updateTransferBill = function (id, item) {
        var postUrl = urlDefault("TRANSFER_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };*/

    /**
     * 根据ID查询调拔单详情
     * @param id
     * @param transfer_type 调拨单类型 in：调入（默认） out：调出
     */
    this.findTransferBillById = function (id, transfer_type) {
        var postUrl = urlDefault("TRANSFER_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "transfer_type": transfer_type
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览调拔列表
     * @param page
     * @param page_num
     * @param status
     */
    this.findAll = function (page, page_num, status) {
        var postUrl = urlDefault("TRANSFER_READ");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": page_num,
            "status": status
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览调拔列表 Search
     * @param page
     * @param page_num
     * @param status
     */
    this.findAllSearch = function (page, page_num, status, search) {
        var postUrl = urlDefault("TRANSFER_READ");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": page_num,
            "status": status,
            "search": search
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览调拔列表 field
     * @param page
     * @param page_num
     * @param params
     */
    this.findAllField = function (page, page_num, params) {
        var postUrl = urlDefault("TRANSFER_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = page_num;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 生成调拔单
     * @param item
     */
    this.addTransferBill = function (item) {
        var postUrl = urlDefault("TRANSFER_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改并审核报损单
     */
    this.updateAndCheckLossBill = function (id, item) {
        var postUrl = urlDefault("LOSS_EDIT_CHECK") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 添加并审核报损单
     */
    this.addAndCheckLossBill = function (item) {
        var postUrl = urlDefault("LOSS_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 消取报损单
     */
    this.deleteLossBill = function (id) {
        var postUrl = urlDefault("LOSS_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 更新报损单
     * @param id
     * @param item
     */
    this.updateLossBill = function (id, item) {
        var postUrl = urlDefault("LOSS_EDIT") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 根据状态查询报损单
     * @param page
     * @param pageNum
     * @param status
     */
    this.findLossAll = function (page, pageNum, status) {
        var postUrl = urlDefault("LOSS_READ");
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
     * 根据状态查询报损单 Search
     * @param page
     * @param pageNum
     * @param status
     */
    this.findLossAllSearch = function (page, pageNum, status, search) {
        var postUrl = urlDefault("LOSS_READ");
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
     * 根据状态查询报损单 field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findLossAllField = function (page, pageNum, params) {
        var postUrl = urlDefault("LOSS_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID查询报损单
     * @param id
     */
    this.findLossById = function (id) {
        var postUrl = urlDefault("LOSS_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 添加报损单
     */
    this.addLossBill = function (item) {
        var postUrl = urlDefault("LOSS_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 修改并审核报溢单
     * @param id
     * @param item
     */
    this.updateAndCheakOverFLowBill = function (id, item) {
        var postUrl = urlDefault("OVERFLOW_EDIT_CHECK") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 添加并审核报溢单
     * @param item
     */
    this.addAndCheckOverFLowBill = function (item) {
        var postUrl = urlDefault("OVERFLOW_ADD_CHECK");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };


    /**
     * 取消报溢单
     * @param id
     */
    this.deleteOverFlowBill = function (id) {
        var postUrl = urlDefault("OVERFLOW_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 更新报溢单
     * @param item
     */
    this.upateOverFlowBill = function (id, item) {
        var postUrl = urlDefault("OVERFLOW_UPDATE") + id;
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 根据ID查询报溢单
     * @param id
     */
    this.findOverFlowById = function (id) {
        var postUrl = urlDefault("OVERFLOW_READ_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID查询报溢单
     * @param page
     * @param pageNum
     * @param status
     */
    this.findOverFLowAll = function (page, pageNum, status) {
        var postUrl = urlDefault("OVERFLOW_READ");
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
     * 根据ID查询报溢单 Search
     * @param page
     * @param pageNum
     * @param status
     */
    this.findOverFLowAllSearch = function (page, pageNum, status, search) {
        var postUrl = urlDefault("OVERFLOW_READ");
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
     * 根据ID查询报溢单 field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findOverFLowAllField = function (page, pageNum, params) {
        var postUrl = urlDefault("OVERFLOW_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 生成报溢单
     * @param item
     */
    this.addOverFlow = function (item) {
        var postUrl = urlDefault("OVERFLOW_ADD");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 查询库存商品列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.reserveReadGoodByField = function (page, pageNum, params) {
        var postUrl = urlDefault("RESERVE_READ_GOODS");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询某个商品的批次库存
     * @param page
     * @param pageNum
     * @param sid
     * @param gid
     */
    this.reserveRead = function (page, pageNum, sid, gid) {
        var postUrl = urlDefault("RESERVE_READ");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "sid": sid,
            "gid": gid
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 临时查询商品的库存数量
     * @param page
     * @param pageNum
     * @param sid
     * @param gids
     */
    this.reserveTempRead = function (page, pageNum, sid, gids) {
        var postUrl = urlDefault("RESERVE_READ_TEMP");
        var ticket = cookieUtil("ticket");
        var postData = {
            "ticket": ticket,
            "page": page,
            "page_num": pageNum,
            "sid": sid,
            "gids": gids
        };
        var data = asyncAjax(postUrl, postData);
        return data;
    };



    /**
     * 保存库存预警设置
     * @param item
     */
    this.saveWarningSetting = function (item) {
        var postUrl = urlDefault("GOODS_WARNING_SAVE");
        var ticket = cookieUtil("ticket");
        item.ticket = ticket;
        var data = asyncAjax(postUrl, item);
        return data;
    };

    /**
     * 读取库存预警设置
     * @param sid
     */
    this.readWarningSetting = function (sid) {
        var postUrl = urlDefault("GOODS_WARNING_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["sid"] = sid;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

}