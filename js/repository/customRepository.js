
function customRepository() {

    /**
     * 读取供应商列表
    this.findSupplier = function () {
        var postUrl = urlDefault("SUPPLIER_READ");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "page": 1,
            "page_num": 200
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    }
     */


    /**
     * 读取客户关系列表
     * @param page
     * @param pageNum
     */
    this.findAll = function (page, pageNum, bSearch) {
        var postUrl = urlDefault("CUSTOMER_READ");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "page": page,
            "page_num": pageNum
        };
        if (bSearch) {
            postData['search'] = bSearch;
        }
        return asyncAjax(postUrl, postData);
    };

    /**
     * 读取客户关系列表 by Field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllByField = function (page, pageNum, params) {
        var postUrl = urlDefault("CUSTOMER_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID读取客户公司
     * @param id
     */
    this.findById = function (id) {
        var postURL = urlDefault("READ_CUSTOMER_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };

    /**
     * 添加一个对象
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("CUSTOMER_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 修改客户信息
     * @param id
     * @param item
     * @returns {*}
     */
    this.edit = function (id, item) {
        var postUrl = urlDefault("CUSTOMER_EDIT") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 删除一个对象
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("CUSTOMER_DELETE") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 批量批加
     * @param items
     */
    this.batchAdd = function (items) {
        var postUrl = urlDefault("CUSTOMER_ADD_BATCH");
        items.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, items);
        return result;
    };

    /**
     * 推荐客户列表
     * @param items
     */
    this.readByRecommend = function () {
        var postUrl = urlDefault("CUSTOMER_READ_BY_RECOMMEND");
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 注册客户
     * @param item
     */
    this.register = function (item) {
        var postUrl = urlDefault("CUSTOMER_REGISTER");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 判断公司名是否可用
     * @param name
     * @param why
     */
    this.checkName = function (name, why) {
        var postUrl = urlDefault("COMPANY_NAME_EXISTS");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": name
        };
        if (why) postData['why'] = 1;
        var result = asyncAjax(postUrl, postData);
        //result = {"data": result};
        return result;
    };

    /**
     * 查询客户
     * @param name
     */
    this.queryByName = function (name) {
        var postUrl = urlDefault("READ_CUSTOMER_BY_NAME");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": name
        };
        var result = asyncAjax(postUrl, postData);
        result = {"data": result};
        return result;
    };


    /**
     * 读取未审核的客户列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.findTempAll = function (page, pageNum, params) {
        var postUrl = urlDefault("READ_CUSTOMER_TMP");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 读取未审核的客户详情
     * @param id
     * @param params
     * @returns {*}
     */
    this.findTemp = function (id, params) {
        var postUrl = urlDefault("READ_CUSTOMER_TMP_BY_ID") + id;
        var postData = typeof(params)=='object' ? params : {};
        postData.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 审核客户通过
     * @param id
     * @param params
     */
    this.checkPass = function (id, params) {
        var postUrl = urlDefault("CUSTOMER_CHECK_PASS") + id;
        var postData = typeof(params)=='object' ? params : {};
        postData.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 审核客户不通过
     * @param id
     * @param params
     */
    this.checkUnpass = function (id, params) {
        var postUrl = urlDefault("CUSTOMER_CHECK_UNPASS") + id;
        var postData = typeof(params)=='object' ? params : {};
        postData.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 给客户添加业务员
     * @param params
     */
    this.addSalesman = function (params) {
        var postUrl = urlDefault("CUSTOMER_ADD_SALESMAN");
        var postData = typeof(params)=='object' ? params : {};
        postData.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 移除客户业务员
     * @param id
     * @param params
     */
    this.removeSalesman = function (id, params) {
        var postUrl = urlDefault("CUSTOMER_DELETE_SALESMAN") + id;
        var postData = typeof(params)=='object' ? params : {};
        postData.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 设置客户默认业务员
     * @param id
     * @param params
     */
    this.defaultSalesman = function (id, params) {
        var postUrl = urlDefault("CUSTOMER_DEFAULT_SALESMAN") + id;
        var postData = typeof(params)=='object' ? params : {};
        postData.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, postData);
        return result;
    };




    //会员

    /**
     * 注册
     * @param item
     */
    this.registerVIP = function (item) {
        var postUrl = urlDefault("VIP_REGISTER");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 读取VIP列表 by Field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllVIPByField = function (page, pageNum, params) {
        var postUrl = urlDefault("VIP_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID读取VIP
     * @param id
     */
    this.findVIPById = function (id) {
        var postURL = urlDefault("READ_VIP_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };

    /**
     * 更新VIP
     * @param id
     * @param item
     */
    this.updateVIP = function (id, item) {
        var postURL = urlDefault("VIP_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postURL, item);
        return result;
    };

    /**
     * 停用VIP
     * @param id
     */
    this.deleteVIP = function (id) {
        var postURL = urlDefault("VIP_DELETE") + id;
        var ticket = cookieUtil("ticket");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };

    /**
     * 启用VIP
     * @param id
     */
    this.recoverVIP = function (id) {
        var postURL = urlDefault("VIP_RECOVER") + id;
        var ticket = cookieUtil("ticket");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };


}
