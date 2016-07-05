/**
* @Author: jeffrey
* @Date:   2016-06-27T19:05:07+08:00
* @Last modified by:   jeffrey
* @Last modified time: 2016-07-03T14:00:38+08:00
*/



//URL配置模块

//切换环境
var ENV = 'D'; //P:生成 B:测试 D:开发
var SITE_URL;
var searchUrl;
var companySearchUrl;
switch (ENV){
    case 'P':
        //sneaker API
        SITE_URL = 'http://local.api.test.ms9d.com';
        //搜索商品服务器的URL
        //searchUrl = "http://115.28.93.117:8081/search/goods?index_name=index_goods&type_name=index_goods&page=0&page_num=13&dsl=";
        //搜索公司服务器的URL
        //companySearchUrl = "http://115.28.93.117:8081/search/company?index_name=index_company&type_name=index_company&page=0&page_num=13&dsl=name:";
        break;
    case 'B':
        //sneaker API
        SITE_URL = 'http://local.api.test.ms9d.com';
        break;
    case 'D':
    default:
        //sneaker API
        SITE_URL = 'http://local.api.test.ms9d.com';
        //搜索商品服务器的URL
        //searchUrl = "http://115.28.93.117:8081/search/goods?index_name=index_goods&type_name=index_goods&page=0&page_num=13&dsl=";
        //搜索公司服务器的URL
        //companySearchUrl = "http://115.28.93.117:8081/search/company?index_name=index_company&type_name=index_company&page=0&page_num=13&dsl=name:";
        break;
}
