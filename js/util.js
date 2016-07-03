/**
 * 系统工具函数集合
 */



/**
 * 给window对象添加event属性 for Firefox
 * @returns {*}
 */
if (getOs() == 'Firefox'){
    var $E = function(){var c=$E.caller; while(c.caller)c=c.caller; return c.arguments[0]};
    __defineGetter__("event", $E);
}

/**
 * 字符串替换(把String中的s1替换成s2)
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};


/**
 * 防止backspace回退页面
 * @returns {boolean}
 * @constructor
 */
function PreventBSK(){
    var bskEventCancel = false;
    var _EVENT = window.event;
    bskEventCancel = _EVENT && _EVENT.altKey && (_EVENT.keyCode == 8 || _EVENT.keyCode == 37 || _EVENT.keyCode == 39);
    if(_EVENT.keyCode == 8)
    {
        var tagName = _EVENT.srcElement.tagName.toUpperCase();
        if(tagName == "TEXTAREA" || tagName == "INPUT")//文本操作不受影响
            bskEventCancel = _EVENT.srcElement.readOnly;
        else
            bskEventCancel = true;
    }
    _EVENT.cancelBubble = bskEventCancel;
    _EVENT.returnValue = !bskEventCancel;
    return !bskEventCancel;
}


/**
 * 判断浏览器类型
 * @returns {*}
 */
function getOs() {
    if(navigator.userAgent.indexOf("MSIE")>0) {
        return "MSIE";
    }
    if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
        return "Firefox";
    }
    if(isChrome=navigator.userAgent.indexOf("Chrome")>0) {
        return "Chrome";
    }
    if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
        return "Safari";
    }
    if(isCamino=navigator.userAgent.indexOf("Camino")>0){
        return "Camino";
    }
    if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
        return "Gecko";
    }
}


/**
 * 过滤字符串中HTML标签
 * @param str
 * @returns {void|*|string|XML}
 */
function strip_tags(str){
    return str.replace(/<\/?[^>]*>/g,'');
}


/**
 * 获取url中的参数
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //console.log(window.location);
    if (r != null) {
        return decodeURI(r[2]);
        //return unescape(r[2]);
    }
    return null; //返回参数值
}

/* --------------------------------------------------- 数值处理 --------------------------------------------------- */


/**
 * 格式化空值
 * @param value
 * @param empty 为空时的返回值(默认为空字符串)
 * @returns {*}
 */
function fieldNull(value, empty) {
    var ret;
    if (value != null && value != 'undefined' && value.length > 0) {
        ret = value;
    } else {
        ret = empty == null ? '' : empty;
    }
    return ret;
}


/**
 * 数字 转 数量(整数)
 * @param value
 * @param empty 为空时的值
 * @returns {*}
 */
function num2total(value, empty) {
    empty = empty == null ? 0 : empty;
    return (isNaN(value) || !value) ? empty : parseInt(value);
}

/**
 * 数字 转 金额(两位小数)
 * @param value
 * @param empty 为空时的值
 * @returns {*}
 */
function num2price(value, empty) {
    empty = empty == null ? '0.00' : empty;
    return (isNaN(value) || !value) ? empty : parseFloat(value).toFixed(2);
}

/**
 * 浮点数 转 百分数(0.1234 => 12.34)
 * @param value
 * @returns {string|Number|*}
 */
function float2percent(value) {
    if (isNaN(value) || !value){
        ret = 0;
    } else {
        var ret = parseFloat(value) * 100;
        if (parseInt(ret) == ret){
            ret = parseInt(ret);
        } else {
            ret = ret.toFixed(2);
        }
    }
    return ret;
    //return (isNaN(value) || !value) ? 0 : parseInt(parseFloat(value) * 100);
}

/**
 * 计算价格差
 * @param price1
 * @param price2
 * @return diff (34-33 => +1.00)
 */
function computePriceDiff(price1, price2){
    var diff = ((price1 - price2) * -1).toFixed(2);
    diff = diff > 0 ? '+'+diff : diff;
    return diff;
}

/**
 * 计算数值差
 *
 * @param num1
 * @param num2
 * @return diff (例如: +123, -123)
 */
function computeNumberDiff(num1, num2){
    var diff = ((num1 - num2) * -1);
    diff = diff > 0 ? '+'+diff : diff;
    return diff;
}



/* --------------------------------------------------- 时间相关 --------------------------------------------------- */

/**
 * 获取时间
 */
function getDateTimeYYYYMMDD(time) {
    return time.substring(0, 10);
}

/**
 * 获取当前时间(yyyy-MM-dd HH:MM:SS)
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hours = date.getHours();
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    var minutes = date.getMinutes();
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    var seconds = date.getSeconds();
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + minutes + seperator2 + seconds;
    return currentdate;
}


/**
 * 获取日期前后
 * @param AddDayCount
 * @returns {string}
 * @constructor
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    if (m < 10) {
        m = '0' + m;
    }
    var d = dd.getDate();
    if (d < 10) {
        d = '0' + d;
    }
    return y + "-" + m + "-" + d;
}


/**
 * 获取前几分钟
 * @returns {string}
 */
function getCurrentOldDate() {
    var now = new Date();
    var date = new Date(now.getTime() - 5 * 60 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return time;
}

/**
 * 格式化时间显示到分钟
 */
function formatDatetime(value, type) {
    type = type == null ? 'YmdHi' : type;
    if (type == 'Ymd') {
        var pos = 10;
    } else if (type == 'YmdH') {
        var pos = 13
    } else if (type == 'YmdHi') {
        var pos = 16;
    } else {
        var pos = 19;
    }
    return fieldNull(value) != '' ? value.substr(0, pos) : '';
}


/**
 * 比较两个日期的间隔天数
 * @param sDate1 YYYY-mm-dd
 * @param sDate2 YYYY-mm-dd
 * @returns {Number|*}
 * @constructor
 */
function diffDate(sDate1, sDate2){
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为12-18-2002格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24); //把相差的毫秒数转换为天数
    return iDays
}

/* --------------------------------------------------- ID2TEXT --------------------------------------------------- */


/*
 * 入库单状态(列表页)
 */
var showInStatusListWithColor = [
    {"id": 1, "text": "<span class='status-uncheck'>未审核</span>"},
    {"id": 2, "text": "<span class='status-checked'>已审核</span>"},
    //{"id": 3, "text": "<span class='status-close'>已结算</span>"}, //已复核
    {"id": 9, "text": "<span class='status-cancel'>已作废</span>"},
    {"id": 10, "text": "<span class='status-repaired'>已冲单</span>"},
    {"id": 11, "text": "<span class='status-repair'>冲单（负单）</span>"},
    {"id": 12, "text": "<span class='status-fixed'>已修正</span>"},
    {"id": 13, "text": "<span class='status-fix'>修正单（负单）</span>"}
];

/*
 * 入库单状态(详情页)
 */
var showInStatusList = [
    {"id": 1, "text": "未审核"},
    {"id": 2, "text": "已审核"},
    //{"id": 3, "text": "已结算"}, //已复核
    {"id": 9, "text": "已作废"},
    {"id": 10, "text": "已冲单"},
    {"id": 11, "text": "冲单"},
    {"id": 12, "text": "已修正"},
    {"id": 13, "text": "修正单"}
];


/*
 * 出库单状态(列表页)
 */
var showOutStatusListWithColor = [
    {"id": 1, "text": "<span class='status-uncheck'>未审核</span>"},
    {"id": 2, "text": "<span class='status-uncheck'>未审核</span>"}, //取消 预审状态
    //{"id": 3, "text": "<span class='status-checked'>已审核</span>"},
    {"id": 3, "text": "<span class='status-uncheck'>缺货待配</span>"},
    //{"id": 4, "text": "<span class='status-close'>已结算</span>"},
    {"id": 4, "text": "<span class='status-checked'>已审核</span>"},
    {"id": 9, "text": "<span class='status-cancel'>已作废</span>"},
    {"id": 10, "text": "<span class='status-repaired'>已冲单</span>"},
    {"id": 11, "text": "<span class='status-repair'>冲单（负单）</span>"},
    {"id": 12, "text": "<span class='status-fixed'>已修正</span>"},
    {"id": 13, "text": "<span class='status-fix'>修正单（负单）</span>"}
];
/*
 * 出库单状态(详情页)
 */
var showOutStatusList = [
    {"id": 1, "text": "未审核"},
    {"id": 2, "text": "未审核"}, //取消 预审状态
    {"id": 3, "text": "缺货待配"},
    {"id": 4, "text": "已审核"},
    {"id": 9, "text": "已作废"},
    {"id": 10, "text": "已冲单"},
    {"id": 11, "text": "冲单"},
    {"id": 12, "text": "已修正"},
    {"id": 13, "text": "修正单"}
];

/*
 * 订单紧急度列表
 */
var showOrderRankList = [
    {"id": 0, "text": "不限制"},
    {"id": 1, "text": "立即送"},
    {"id": 2, "text": "当日送"},
    {"id": 3, "text": "隔日送"},
    {"id": 4, "text": "本周送"},
];

/*
 * 订单紧急度列表(列表页)
 */
var showOrderRankListwithColor = [
    {"id": 0, "text": "<span class='rank-0'>不限制</span>"},
    {"id": 1, "text": "<span class='rank-1'>立即送</span>"},
    {"id": 2, "text": "<span class='rank-2'>当日送</span>"},
    {"id": 3, "text": "<span class='rank-3'>隔日送</span>"},
    {"id": 4, "text": "<span class='rank-4'>本周送</span>"},
];

/*
 * 经营方式列表
 */
var showBusinessPracticeList = [
    {"id": 1, "text": "经销"},
    {"id": 2, "text": "代销"},
    {"id": 3, "text": "联营"},
    {"id": 4, "text": "租赁"},
];

/*
 * 下单方式列表
 */
var orderFromList = [
    {"id": 1, "text": "代客下单"},
    {"id": 2, "text": "微信下单"},
    {"id": 3, "text": "云仓下单"},
];

/*
 * 会员等级列表
 */
var VIPList = [
    {"id": 1, "text": "非会员"},
    {"id": 2, "text": "计价会员"},
    {"id": 3, "text": "包年会员"},
    {"id": 4, "text": "合伙会员"},
];

/**
 * ID=>Text
 * @param data
 * @param id
 */
function id2text(data, id) {
    var ret = '未知(' + id + ')';
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == parseInt(id)){
            ret = data[i].text;
            break;
        }
    }
    return ret;
}


/**
 * 工种显示
 * @param value
 */
function workType(value) {
    var res = "未知";
    switch (value) {
        case "1":
            res = "董事";
            break;
        case "2":
            res = "总经理";
            break;
        case "4":
            res = "主管";
            break;
        case  "5":
            res = "组长";
            break;
        case  "3":
            res = "经理";
            break;
        case  "6":
            res = "普通员工";
            break;
    }
    return res;
}

/**
 * 来源类型
 * @param value
 */
function fromType(value) {
    var show = "未知(" + value + ")";
    switch (parseInt(value)) {
        case 1:
            show = "进货";
            break;
        case 2:
            show = "退货";
            break;
        case 3:
            show = "调拨";
            break;
        case 4:
            show = "报溢";
            break;
        case 5:
            show = "冲单入库";
            break;
        case 6:
            show = "盘赢入库";
            break;
    }
    return show;
}

/**
 * 公司类型
 * @param value
 */
function companyType(value) {
    var show = "未知";
    switch (parseInt(value)) {
        case 1:
            show = "经销商";
            break;
        case 2:
            show = "酒店饭店";
            break;
        case 3:
            show = "商场超市";
            break;
        case 4:
            show = "便利店";
            break;
    }
    return show;
}


/* --------------------------------------------------- File --------------------------------------------------- */


/**
 * 通用载入文件方法
 *  目前仅适用于支持HTML5的浏览器
 * @param files
 * @param fun
 */
function loadFile(files, fun) {
    if(window.FileReader && files.length)
    {
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function()
        {
            var data = this.result.split("\n");
            //console.log(data);
            if (typeof(fun) == 'function'){
                fun(data)
            }
        };
        reader.readAsText(file);
    }
}


/**
 * 导出Excel(windows Office2007 SP3之前版本有乱码BUG)
 *   需要 Blob.js 和 FileSaver.min.js
 * @param filename
 * @param content

function saveExcelFile(filename, content){
    var BB = self.Blob;
    var data = new BB(
        ["\ufeff" + content] //\ufeff:utf8 bom防止中文乱码
        , {type: "text/plain;charset=utf8"}
    );
    saveAs(data, filename + '.csv');
}*/



