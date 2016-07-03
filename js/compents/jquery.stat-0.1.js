/*操作行为统计插件*/
(function ($) {
    var statModule = true; //是否开启行为统计分析
    var statUrl = "http://stat.ms9d.com/s.gif";
    /*将数据发送到服务器*/
    $.fn.stat = function (data) {
        if (statModule) {
            //开启行为统计分析的情况下
            //将Data转换为KEY-VALUE形式有数据
            if (data != null) {
                var getData = "";
                for (var key in data) {
                    getData += (key + "=" + data[key] + "&");
                }
                if (getData != null && getData != "" && getData.length > 0) {
                    //将数据上报到服务器
                    //$.get(statUrl + "?" + getData, function (result) {
                    //});
                }
            }
        }
    }
})(jQuery);