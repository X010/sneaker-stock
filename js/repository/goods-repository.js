
function restGoodsRepository() {

    /**
     * 删除供应商商品
     * @param id
     */
    this.deleteSupplierForGoods = function (id) {
        var postUrl = urlDefault("GOODS_SUPPLIER_DELETE") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        return asyncAjax(postUrl, postData);
    };

    /**
     * 为商品添加供应商
     * @param item
     */
    this.addSupplierForGoods = function (item) {
        var postUrl = urlDefault("GOODS_SUPPLIER_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

    /**
     * 读取商品列表
     * @param startPage
     * @param pageNum
     */
    this.findAll = function (startPage, pageNum, bSearch) {
        var postUrl = urlDefault("GOODS_READ_LIST");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "page": startPage,
            "page_num": pageNum
        };
        if (bSearch) {
            postData['big_search'] = bSearch;
        }
        return asyncAjax(postUrl, postData);
    };

    /**
     * 读取商品列表(by field)
     * @param page
     * @param pageNum
     * @param params
     */
    this.findAllByField = function (page, pageNum, params) {
        var postUrl = urlDefault("GOODS_READ_LIST");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };

    /**
     * 根据ID读取数据
     * @param id
     */
    this.findById = function (id) {
        var ticket = cookieUtil("ticket");
        var postUrl = urlDefault("GOODS_READ_BY_ID") + id;
        var postData = {"ticket": cookieUtil("ticket")};
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 添加商品
     * @param item
     */
    this.add = function (item) {
        var postUrl = urlDefault("GOODS_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 修改商品
     * @param item
     */
    this.edit = function (id, item) {
        var postUrl = urlDefault("GOODS_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 删除商品
     * @param id
     */
    this.delete = function (id) {
        var postUrl = urlDefault("GOODS_DELETE") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 查询商品
     * @param dsl
     */
    this.query = function (dsl) {
        var postUrl = urlDefault("GOODS_LIKE");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "name": dsl
        };
        var result = asyncAjax(postUrl, postData);
        result = {"data": result};
        return result;
    };



    var GOODS_BRAND = null;
    /**
     * 查询商品品牌
     */
    this.findGoodsBrand = function (search) {
        if (GOODS_BRAND == null) {
            var postUrl = urlDefault("READ_GOODS_BRAND");
            var postData = {
                "ticket": cookieUtil("ticket"),
                "page": 1,
                "page_num": 1000
            };
            if (search != null) postData['search'] = search;
            var result = asyncAjax(postUrl, postData);//读取品牌列表
            GOODS_BRAND = result.data;
        }
        return GOODS_BRAND;
    };

    /**
     * 查询商品品牌 for autocomplete
     */
    this.findGoodsBrandByField = function (page, pageNum, params) {
        var postUrl = urlDefault("READ_GOODS_BRAND");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    var GOODS_TYPES = null;
    /**
     * 查询商品类型
     */
    this.findGoodsType = function () {
        if (GOODS_TYPES == null) {
            var postUrl = urlDefault("GOODS_TYPE_READ");
            var postData = {
                "ticket": cookieUtil("ticket"),
                "page": 1,
                "page_num": 100
            };
            var result = asyncAjax(postUrl, postData);
            GOODS_TYPES = result;
        }
        return GOODS_TYPES;
    };

    /**
     * 查询商品类型
     * @param id 根分类ID
     */
    this.findGoodsSubType = function (id) {
        if (GOODS_TYPES == null) {
            var postUrl = urlDefault("GOODS_SUB_TYPE_READ_BY_ID") + id;
            var postData = {
                "ticket": cookieUtil("ticket"),
                "page": 1,
                "page_num": 200
            };
            var result = asyncAjax(postUrl, postData);
            GOODS_TYPES = result;
        }
        return GOODS_TYPES;
    };

    /**
     * 查询整个系统商品分类树
     */
    this.readGoodsTypeTree = function () {
        var data;
        var postUrl = urlDefault('GOODS_TYPE_TREE_READ');
        if (postUrl){
            var ticket = cookieUtil("ticket");
            var postData = {};
            postData["ticket"] = ticket;
            data = asyncAjax(postUrl, postData);
        }
        return data;
    };

    /**
     *添加商品价格

    this.addGoodsPrice = function (item) {
        var postUrl = urlDefault("GOODSPRICE_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    }; */

    /**
     *添加公司商品
     */
    this.addCompanyGoods = function (item) {
        var postUrl = urlDefault("COMPANYGOODS_ADD");
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };


    /**
     * 获取公司商品列表
     * @param startPage
     * @param pageNum
     */
    this.findCompanyGoods = function (startPage, pageNum) {
        var postUrl = urlDefault("COMPANYGOODS_READ");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "page": startPage,
            "page_num": pageNum
        };
        return asyncAjax(postUrl, postData);
    };

    /**
     * 获取公司商品列表 by Field
     * @param startPage
     * @param pageNum
     * @param params
     */
    this.findCompanyGoodsByField = function (page, pageNum, params) {
        var postUrl = urlDefault("COMPANYGOODS_READ");
        var ticket = cookieUtil("ticket");
        var postData = typeof(params)=='object' ? params : {};
        postData["ticket"] = ticket;
        postData["page"] = page;
        postData["page_num"] = pageNum;
        var data = asyncAjax(postUrl, postData);
        return data;
    };


    /**
     * 通过名称精确查询
     * @param name
     * @param type
     */
    this.queryByName = function (name, type) {
        var postData = {};
        type = type ? type : 'goods';
        if (type == 'goods'){
            var postUrl = urlDefault("COMPANYGOODS_READ");
            postData["gname"] = name;
        } else if (type == 'brand'){
            var postUrl = urlDefault("READ_GOODS_BRAND");
            postData["name"] = name;
        }
        postData["ticket"] = cookieUtil("ticket");
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
     * 获取商品价格列表
     * @param startPage
     * @param pageNum

    this.findGoodsPrice = function (startPage, pageNum, in_sid) {
        var postUrl = urlDefault("GOODSPRICE_READ");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "page": startPage,
            "page_num": pageNum,
            "in_sid": in_sid
        };
        return asyncAjax(postUrl, postData);
    }*/

    /**
     * 获取商品价格列表并查询
     * @param startPage
     * @param pageNum

    this.findGoodsPriceAndSearch = function (startPage, pageNum, in_sid, gsearch) {
        var postUrl = urlDefault("GOODSPRICE_READ");
        var postData = {
            "ticket": cookieUtil("ticket"),
            "page": startPage,
            "page_num": pageNum,
            "in_sid": in_sid,
            "gsearch": gsearch
        };
        return asyncAjax(postUrl, postData);
    }*/


    /**
     * 根据ID获取商品商价信息
     * @param id

    this.findGoodsById = function (id) {
        var postUrl = urlDefault("GOODSPRICE_READ_BY_ID") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    }*/

    /**
     * 根据ID获取公司商品详情
     * @param id
     */
    this.findCompanyGoodsById = function (id) {
        var postUrl = urlDefault("COMPANYGOODS_READ_BY_ID") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };


    /**
     * 删除仓库里面的商品
     * @param id
     */
    this.deleteStoreGoods = function (id) {
        var postUrl = urlDefault("COMPANYGOODS_DELETE") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 停用仓库里面的商品采购功能
     * @param id
     */
    this.buyOffStoreGoods = function (id) {
        var postUrl = urlDefault("COMPANYGOODS_BUY_OFF") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 启用仓库里面的商品采购功能
     * @param id
     */
    this.buyOnStoreGoods = function (id) {
        var postUrl = urlDefault("COMPANYGOODS_BUY_ON") + id;
        var postData = {
            "ticket": cookieUtil("ticket")
        };
        var result = asyncAjax(postUrl, postData);
        return result;
    };

    /**
     * 修改公司商品
     * @param item
     */
    this.editCompanyGoods = function (id, item) {
        var postUrl = urlDefault("COMPANYGOODS_UPDATE") + id;
        item.ticket = cookieUtil("ticket");
        var result = asyncAjax(postUrl, item);
        return result;
    };

}
