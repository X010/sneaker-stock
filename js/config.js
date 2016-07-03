//常量配置模块
var VERSION_TYPE = 1; //1:平台版本 2:售卖版本
var VERSION_MODE = 'B2B'; //B2B or B2C 当B2C时,客户将成为会员
/**
 * 功能块
 */
var IMPORT_GOODS_FROM_PLATFORM = 1; //1:允许从平台导入 0:禁止导入功能

var defaultPage = 1; //默认第一页面
var defaultPageNum = 20; //默认条数
var autoCompletePageNum = 10; //自动提示的默认条数
var days_view = 15; //浏览单据默认查看几天的

var BARCODE_LENGTH_MIN = 8; //条码最短长度(小于则不触发搜索)
var BARCODE_LENGTH_MAX = 15; //条码最大长度(大于则不触发搜索)

var CODE_LENGTH_MIN = 4; //单据号/商品编号最短长度(小于则不触发搜索)
var CODE_LENGTH_MAX = 10; //单据号/商品编号最短长度(大于则不触发搜索)

var EXCEL_LINE_MAX = 1000; //导出excel时最大数据行数
