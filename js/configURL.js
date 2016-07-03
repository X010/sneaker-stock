//URL配置模块

//切换环境
var ENV = 'D'; //P:生成 B:测试 D:开发
var SITE_URL;
var searchUrl;
var companySearchUrl;
switch (ENV){
    case 'P':
        //sneaker API
        SITE_URL = 'http://yc.api.ms9d.com';
        //搜索商品服务器的URL
        //searchUrl = "http://115.28.93.117:8081/search/goods?index_name=index_goods&type_name=index_goods&page=0&page_num=13&dsl=";
        //搜索公司服务器的URL
        //companySearchUrl = "http://115.28.93.117:8081/search/company?index_name=index_company&type_name=index_company&page=0&page_num=13&dsl=name:";
        break;
    case 'B':
        //sneaker API
        SITE_URL = 'http://115.28.8.173:808';
        break;
    case 'D':
    default:
        //sneaker API
        SITE_URL = 'http://115.28.8.173:809';
        //搜索商品服务器的URL
        //searchUrl = "http://115.28.93.117:8081/search/goods?index_name=index_goods&type_name=index_goods&page=0&page_num=13&dsl=";
        //搜索公司服务器的URL
        //companySearchUrl = "http://115.28.93.117:8081/search/company?index_name=index_company&type_name=index_company&page=0&page_num=13&dsl=name:";
        break;
}

