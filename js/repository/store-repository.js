
function restStoreRepository() {

    /**
     * 查询公司下仓库
     */
    this.findAllStores = function (page, pageNum, params) {
        var postUrl = urlDefault("STORE_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID查询仓库详情
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("STORE_READ_BY_ID") + id;
        var postData = {"ticket": ticket};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 只读自己的仓库
     */
    this.findMine = function readMineStore(status) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("STORE_MINE");
        var postData = {"ticket": ticket, "page": 1, "page_num": 50};
        if (status) {
            postData['status'] = status;
        } 
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    this.findAllMine = function (pageStart, pageNum, bsearch, status) { //按页读取数据
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("STORE_MINE");
        var postData = {"ticket": ticket, "page": pageStart, "page_num": pageNum};
        if (status) {
            postData['status'] = status;
        }
        if (bsearch) {
            postData['big_search'] = bsearch;
        }
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    this.findAllMineByField = function (page, pageNum, params) { //按页读取数据
        var postUrl = urlDefault("STORE_MINE");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    this.findAll = function (pageStart, pageNum, bsearch, status) { //按页读取数据
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("STORE_READ_LIST");
        var postData = {"ticket": ticket, "page": pageStart, "page_num": pageNum};
        if (status) {
            postData['status'] = status;
        }        
        if (bsearch) {
            postData['big_search'] = bsearch;
        }
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    this.add = function (item) {//添加一个store
        var postUrl = urlDefault("STORE_ADD");
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };


    this.delete = function (id) {//删除一个store
        var postUrl = urlDefault("STORE_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    this.edit = function (id, item) {//修改一个store
        var postUrl = urlDefault("STORE_UPDATE") + id;
        item.ticket = cookieUtil("ticket"); //添加一个tciket对象
        var result = asyncAjax(postUrl, item);
        return result;
    };


    this.query = function (dsl) { //查询
        var postUrl = urlDefault("STORE_LIKE");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": dsl
        };
        var result = asyncAjax(postUrl, postData);
        result = {"data": result};
        return result;
    };
}
