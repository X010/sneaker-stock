
function supplierRepository() {

    /**
     * 读取供应商列表
     * @param page
     * @param pageNum
     */
    this.findAll = function (page, pageNum, bSearch) {
        var postUrl = urlDefault("SUPPLIER_READ");
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
     * 读取供应商列表 by Field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllByField = function (page, pageNum, params) {
        var postUrl = urlDefault("SUPPLIER_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID读取供应商公司
     * @param id
     */
    this.findById = function (id) {
        var postURL = urlDefault("READ_SUPPLIER_BY_ID") + id;
        var ticket = cookieUtil("ticket");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };

    /**
     * 添加一个对象
     * @param item

    this.add = function (item) {
        var postUrl = urlDefault("SUPPLIER_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };*/

    /**
     * 修改供应商信息
     * @param id
     * @param item
     * @returns {*}
     */
    this.edit = function (id, item) {
        var postUrl = urlDefault("SUPPLIER_EDIT") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 删除一个对象
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("SUPPLIER_DELETE") + id;
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
        var postUrl = urlDefault("SUPPLIER_ADD_BATCH");
        items.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, items);
        return result;
    };

    /**
     * 推荐供应商列表
     * @param items
     */
    this.readByRecommend = function () {
        var postUrl = urlDefault("SUPPLIER_READ_BY_RECOMMEND");
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 注册供应商
     * @param item
     */
    this.register = function (item) {
        var postUrl = urlDefault("SUPPLIER_REGISTER");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 判断公司名是否可用
     * @param name
     */
    this.checkName = function (name) {
        var postUrl = urlDefault("COMPANY_NAME_EXISTS");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": name
        };
        var result = asyncAjax(postUrl, postData);
        //result = {"data": result};
        return result;
    };

    /**
     * 查询供应商
     * @param name
     */
    this.queryByName = function (name) {
        var postUrl = urlDefault("READ_SUPPLIER_BY_NAME");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": name
        };
        var result = asyncAjax(postUrl, postData);
        result = {"data": result};
        return result;
    };
}
