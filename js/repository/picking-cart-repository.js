
function restPickingCartRepository() {

    /**
     * 检索拣货派车商品
     * @param params sid 仓库ID（必填），areapro 省（非必填），areacity 市（非必填），areazone 区（非必填）
     */
    this.findPickingCartGoods = function (params) {
        var postUrl = urlDefault("PICKING_CART_GOODS_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = 1;
        postData["page_num"] = 100;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 浏览拣货派车单列表
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAll = function (page, pageNum, params) {
        var postUrl = urlDefault("PICKING_CART_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 查询拣货派车单详情
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("PICKING_CART_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 创建拣货派车单
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("PICKING_CART_CREATE");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 删除拣货派车单
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("PICKING_CART_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };



}
