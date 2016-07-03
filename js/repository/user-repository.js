
function restUserRepository() {

    /**
     * 获取提示消息
     */
    this.getMessageOfNotice = function () {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("READ_MESSAGE_REMIND");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 检查用户是否在线
     */
    this.checkOnLine = function () {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("CHECK_ONLINE");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 获取用户信息
     */
    this.getUser = function (t) {
        var ticket = t ? t : cookieUtil("ticket");
        var postUrl = urlDefault("USER_INFO_READ");
        var postData = {"ticket": ticket};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 获取用户参数 含 basedate
     */
    this.getUserForParam = function (status) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("USER_INFO_READ");
        var postData = {"ticket": ticket, "basedate": status};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 根据分页查询用户
     * @param startPage
     * @param pageNum
     */
    this.findAll = function (startPage, pageNum, bsearch, order) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("USER_READ_LIST");
        var postData = {"ticket": ticket, "page": startPage, "page_num": pageNum, "orderby": order};
        if (bsearch) {
            postData['search'] = bsearch;
        }
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 根据分页查询用户 by Field
     * @param startPage
     * @param pageNum
     */
    this.findAllByField = function (page, pageNum, params) {
        var postUrl = urlDefault("USER_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 无需权限的检索
     * @param startPage
     * @param pageNum
     */
    this.findAllNoPower = function (page, pageNum, params) {
        var postUrl = urlDefault("READ_USER_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 根据ID查询用户信息
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("USER_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 根据ID查询用户信息(无需权限)
     * @param id
     */
    this.findByIdNoPower = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("READ_USER_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 添加用户项
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("USER_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 修改密码
     * @param id
     * @param item
     */
    this.editPassWord = function (item) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("USER_EDIT_PASSWORD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 删除用户
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("USER_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 修改用户
     * @param item
     */
    this.edit = function (id, item) {
        var postUrl = urlDefault("USER_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 修改个人资料
     * @param item
     */
    this.editSelf = function (id, item) {
        var postUrl = urlDefault("USER_UPDATE_SELF") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 查询用户
     * @param name
     */
    this.queryByName = function (name) {
        var postUrl = urlDefault("READ_USER_BY_NAME");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": name
        };
        var result = asyncAjax(postUrl, postData);
        result = {"data": result};
        return result;
    };

    /**
     * 判断账号是否可用
     * @param username
     * @param why
     */
    this.checkUsername = function (username, why) {
        var postUrl = urlDefault("USER_USERNAME_CHECK");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "username": username,
        };
        if (why) postData['why'] = 1;
        var result = asyncAjax(postUrl, postData);
        //result = {"data": result};
        return result;
    };

    /**
     * 判断真实姓名是否可用
     * @param id
     * @param name
     */
    this.checkRealname = function (id, name) {
        var postUrl = urlDefault("USER_REALNAME_CHECK");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "id": id,
            "name": name
        };
        var result = asyncAjax(postUrl, postData);
        //result = {"data": result};
        return result;
    };


    /**
     * 业务员批量移交客户
     * @param from_uid
     * @param to_uid
     * @param ccids
     */
    this.moveCustomer = function (from_uid, to_uid, ccids) {
        var postUrl = urlDefault("USER_MOVE_CUSTOMER");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "from_uid": from_uid,
            "to_uid": to_uid,
            "ccids": ccids
        };
        var result = asyncAjax(postUrl, postData);
        //result = {"data": result};
        return result;
    };

    /* ------------------------------------------------ 员工树形结构 ------------------------------------------------ */

    /**
     * 新增根级分类
     * @param name
     */
    this.addType = function (name) {
        var data;
        var postUrl = urlDefault('USER_ROOT_GROUP_CREATE');
        if (postUrl && name){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            postData["name"] = name;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 新增子级分类
     * @param pid
     * @param name
     */
    this.addSubType = function (pid, name) {
        var data;
        var postUrl = urlDefault('USER_SUB_GROUP_CREATE') + pid;
        if (postUrl && name){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            postData["name"] = name;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 查询整个分类树
     */
    this.readTypeTree = function () {
        var data;
        var postUrl = urlDefault('READ_USER_GROUP_TREE');
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 查询根级商品分类

    this.readType = function () {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_READ');
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };*/

    /**
     * 查询子级商品分类
     * @param pid

    this.readSubType = function (pid) {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_SUB_TYPE_READ') + pid;
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };*/

    /**
     * 修改分类
     * @param id
     * @param name
     */
    this.updateType = function (id, name) {
        var data;
        var postUrl = urlDefault('USER_GROUP_UPDATE') + id;
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            postData["name"] = name;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 删除分类
     * @param id
     */
    this.deleteType = function (id) {
        var data;
        var postUrl = urlDefault('USER_GROUP_DELETE') + id;
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 清空商品分类
     * @param id

    this.flushType = function () {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_FLUSH');
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };*/
}
