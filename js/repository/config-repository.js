
function configRepository() {

    /**
     * 通用查询
     * @param URL
     * @param params
     * @param page
     * @param pageNum
     */
    this.query = function (URL, params, page, pageNum) {
        var data;
        var postUrl = urlDefault(URL);
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = typeof(params)=='object' ? params : {};
            postData["ticket"] = ticket;
            if (page) postData["page"] = page;
            if (pageNum) postData["page_num"] = pageNum;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     * 获取菜单权限
     * @param params
     */
    this.menuPower = function (params) {
        var data;
        var postUrl = urlDefault("READ_MENU");
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = typeof(params)=='object' ? params : {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

}
