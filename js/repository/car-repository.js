
function restCarRepository() {

    /**
     * 查询车辆
     * @param startPage
     * @param pageNum
     */
    this.findAll = function (page, pageNum, params) {
        var postUrl = urlDefault("CARS_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID查询车辆信息
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("CAR_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 根据车牌号查询车辆信息
     * @param license
     */
    this.queryByName = function (license) {
        var postUrl = urlDefault("CARS_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = {};
        postData["ticket"] = ticket;
        postData["license"] = license;
        postData["page"] = 1;
        postData["page_num"] = 1;
        var data = asyncAjax(postUrl, postData);
        var result;
        //模拟类似 /read/get_customer_by_name 的接口返回格式
        if (data && data.data){
            result = {
                "data": {
                    "result": data.data[0],
                },
            };
        }
        return result;
    };

    /**
     * 添加车辆
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("CAR_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 删除车辆
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("CAR_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 修改车辆信息
     * @param item
     */
    this.edit = function (id, item) {
        var postUrl = urlDefault("CAR_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };



}
