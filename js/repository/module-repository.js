
function restModuleRepository() {

    /**
     * 读取权限项
     * @param startPage
     * @param pageNum
     */
    this.findAll = function (startPage, pageNum) {
        var postUrl = urlDefault("MODULE_READ_LIST");
        var postData = {"ticket": cookieUtil("ticket"), "page": startPage, "page_num": pageNum};
        var result = asyncAjax(postUrl, postData); //加载权限列表
        return result;
    };
}
