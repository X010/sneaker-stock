
function goodsTypeRepository() {

    /**
     * 复制系统商品类型
     */
    this.copySystemType = function () {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_COPY_SYSTEM');
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 新增根级商品分类
     * @param name
     */
    this.addType = function (name) {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_CREATE');
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
     * 新增子级商品分类
     * @param pid
     * @param name
     */
    this.addSubType = function (pid, name) {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_SUB_TYPE_CREATE') + pid;
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
     * 查询整个商品分类树
     */
    this.readTypeTree = function () {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_TREE_READ');
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
     */
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
    };

    /**
     * 查询子级商品分类
     * @param pid
     */
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
    };

    /**
     * 修改商品分类
     * @param id
     * @param name
     */
    this.updateType = function (id, name) {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_UPDATE') + id;
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
     * 删除商品分类
     * @param id
     */
    this.deleteType = function (id) {
        var data;
        var postUrl = urlDefault('COMPANY_GOODS_TYPE_DELETE') + id;
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
     */
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
    };

}
