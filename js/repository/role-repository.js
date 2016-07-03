
function restRoleRepository() {

    /**
     * 分页读取数据
     * @param startPage
     * @param pageNum
     */
    this.findAll = function (startPage, pageNum, bsearch)//分页面读取数据
    {
        //绑定数据
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("ROLE_READ_LIST");
        var postData = {"ticket": ticket, "page": startPage, "page_num": pageNum};
        if (bsearch) {
            postData['big_search'] = bsearch;
        }
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 读取数据 by Field
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllByField = function (page, pageNum, params)
    {
        var postUrl = urlDefault("ROLE_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     *读取系统权限项
     */
    this.findInc = function (page, pageNum, params)
    {
        var postUrl = urlDefault("ROLE_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["inc"] = 'true';
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID获取信息
     * @param id
     */
    this.findById = function (id) {
        var postUrl = urlDefault("ROLE_READ_BY_ID") + id;
        var postDate = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postDate);
        return result;
    };

    /**
     * 添加角色
     * @param item
     */
    this.add = function (item) {
        item.ticket = cookieUtil("ticket");
        var postUrl = urlDefault("ROLE_ADD");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 删除角色
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("ROLE_DELETE") + id;
        var postDate = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postDate);
        return result;
    };

    /**
     * 修改脚色
     * @param item
     */
    this.edit = function (id, item) {
        var postUrl = urlDefault("ROLE_EDIT") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 查询
     * @param dsl
     */
    this.query = function (dsl) {
        var postUrl = urlDefault("ROLE_READ_LIKE");
        var postData = {"ticket": cookieUtil("ticket"), name: dsl};
        var result = asyncAjax(postUrl, postData);
        result = {"data": result};
        return result;
    };
}
