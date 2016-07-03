
function restCompanyRepository() {
    this.findSelf = function () { //读取公司信息
        //获取公司信息
        var ticket = cookieUtil("ticket");
        var postURL = urlDefault("COMPANY_READ") + "0";
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };

    /**
     * 浏览公司列表
     * @param page
     * @param pageNum
     * @param params
     * @returns {*}
     */
    this.findAll = function (page, pageNum, params) {
        var data;
        var postUrl = urlDefault('COMPANY_ALL_READ');
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
     * 根据ID查看公司信息
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postURL = urlDefault("COMPANY_READ") + id;
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };


    /**
     * 更新公司信息
     * @param model
     */
    this.updateSelf = function (model, cid) {
        if (model != null) {
            var ticket = cookieUtil("ticket");
            var postURL = urlDefault("COMPANY_SAVE") + cid;
            model.ticket = ticket;
            var result = asyncAjax(postURL, model);
            return result;
        }
    };

    /**
     * 重置公司默认用户密码
     * @param id
     */
    this.resetPassword = function (id) {
        var ticket = cookieUtil("ticket");
        var postURL = urlDefault("COMPANY_RESET_PASSWORD") + id;
        var postData = {"ticket": ticket};
        var result = asyncAjax(postURL, postData);
        return result;
    };

    /**
     * 设置公司打印模版
     * @param print_tpl
     */
    this.setPrintTemplate = function (print_tpl) {
        var ticket = cookieUtil("ticket");
        var postURL = urlDefault("COMPANY_SET_PRINT_TPL");
        var postData = {
            "ticket": ticket,
            "print_tpl": print_tpl,
        };
        var result = asyncAjax(postURL, postData);
        return result;
    }
}
