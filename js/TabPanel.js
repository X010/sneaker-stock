var countTab = 1;

function runnerMap() {
    /** 存放键的数组(遍历用到) */
    this.keys = [];
    /** 存放数据 */
    this.data = {};

    /**
     * 放入一个键值对
     * @param {String} key
     * @param {Object} value
     */
    this.put = function (key, value) {
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };

    /**
     * 获取某键对应的值
     * @param {String} key
     * @return {Object} value
     */
    this.get = function (key) {
        return this.data[key];
    };

    /**
     * 删除一个键值对
     * @param {String} key
     */
    this.remove = function (key) {
        var newKeys = [];
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i] != key) {
                newKeys[i] = this.keys[i];
            }
        }
        this.keys = newKeys;
        this.data[key] = null;
    };

    /**
     * 遍历Map,执行处理函数
     *
     * @param {Function} 回调函数 function(key,value,index){..}
     */
    this.each = function (fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
        }
    };

    /**
     * 获取键值数组(类似Java的entrySet())
     * @return 键值对象{key,value}的数组
     */
    this.entrys = function () {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entrys;
    };

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function () {
        return this.keys.length == 0;
    };

    /**
     * 获取键值对数量
     */
    this.size = function () {
        return this.keys.length;
    };

    /**
     * 重写toString
     */
    this.toString = function () {
        var s = "{";
        for (var i = 0; i < this.keys.length; i++, s += ',') {
            var k = this.keys[i];
            s += k + "=" + this.data[k];
        }
        s += "}";
        return s;
    };
}

var extContainer = new runnerMap();
var extI = 1;

function addTab(id, name, url) {
    liClassChange(name);
    //console.log('addTab:', extContainer, id, name);
    if (extContainer.get(id) != null) {
        //console.log('激活流程');
        actionTab(id, name);
    } else {
        //console.log('新增流程');

        //if (countTab > 7) { ,暂时不做限制
        //    runnerAlert("操作提示", "您打开的窗口太多，建议您关闭几个窗口");
        //    return false;
        // }
        //为TAB添加一个下拉列表框

        getOverFlowLi(name);
        addTabTitle(id, name, "frameTab" + id, url);
        addTabContent(id, name, url);
        countTab = countTab + 1;

        //修改Count数
        //var countTabTitle = $("#addtitles li").length;
        //$("#countTabList").html("(" + countTabTitle + ")");
    }
    mouseRight_Tab(); //标签页鼠标右键操作
}


//var singleLi = 135;
var PXmax = 165;
/*
var tabShowPannel = {
    'width':0,
    'tabs':[]
};
*/
/**
 * 获取占用游览器使用了多少宽度了
 */
function getOverFlowLi(name) {
    var pageWidth = $(document).width();
    //console.log(pageWidth);
    var canShowPX = pageWidth - 140;
    //var totalTab = parseInt(canShowPX / singleLi);
    //console.log(totalTab);
    //获取查标题栏下面有几个LI
    //var liCount = $("#addtitles li").length;

    /*var current_width = 0;
    $('#addtitles').find('li').each(function(){
        current_width += $(this).width();
    });*/
    var current_width = $('#addtitles').parent().width();
    //console.log("all:"+current_width);


    //if (liCount + 1 > totalTab) {
    if(current_width+PXmax > canShowPX){
        //console.log("move tab");
        //需要重新调整Title的排序问题了，否则就只能BB了。。。
        //当然我的工作台是不能动的，如果动了干死你
        $("#addtitles li").each(function (i) {
            //将第一个非激活状态的移除到下拉列表中去
            var isMove = false;
            var className = $(this).attr("class");
            var closeAHfre = null;

            if (className != null && className.indexOf("current") >= 0) {
                isMove = false;
            } else {
                var closea = $(this).find("a");
                if (closea != null) {
                    $.each(closea, function () {
                        if (i == 0) {
                            isMove = false;
                        } else {
                            isMove = true;
                            closeAHfre = $(this);
                        }
                    })
                }
            }
            //已经确定该ITEM可以移除到DownList
            if (isMove && closeAHfre != null) {
                //tabShowPannel['width'] -= tabShowPannel['tabs'][i];
                //tabShowPannel['tabs'].shift();

                //开始移动操作^V^
                var href = closeAHfre.attr("href");
                //开始分析ID,NAME,URL
                var param = href.substring(href.indexOf("(") + 1, href.indexOf(")"));
                var params = param.replace(/"/g, "").split(",");


                var liContent = " <li  key='" + params[0] + "' class='item'><a class='item-name' href='javascript:onlyActionTitle(" + params[0] + ",\"" + params[1] + "\",\"" + params[2] + "\")'>" + params[1] + "</a><a class='item-close' href='javascript:removeTabForDownList(" + params[0] + ",\"" + params[1] + "\",\"" + params[2] + "\")'></a></li>";
                //如果已经生成一个，则可以直接添加到里面并退出

                $("#overflowTitle").append(liContent);

                //考虑第一个移动以后仍然宽度不够的情况
                var first_width = $(this).width();
                $(this).remove();

                //console.log("first:"+first_width);
                if(current_width+PXmax-first_width > canShowPX){
                    //这时候要移动第二个
                    $("#addtitles li").each(function (i) {
                        //将第一个非激活状态的移除到下拉列表中去
                        var isMove = false;
                        var className = $(this).attr("class");
                        var closeAHfre = null;

                        if (className != null && className.indexOf("current") >= 0) {
                            isMove = false;
                        } else {
                            var closea = $(this).find("a");
                            if (closea != null) {
                                $.each(closea, function () {
                                    if (i == 0) {
                                        isMove = false;
                                    } else {
                                        isMove = true;
                                        closeAHfre = $(this);
                                    }
                                })
                            }
                        }
                        //已经确定该ITEM可以移除到DownList
                        if (isMove && closeAHfre != null) {
                            //tabShowPannel['width'] -= tabShowPannel['tabs'][i];
                            //tabShowPannel['tabs'].shift();

                            //开始移动操作^V^
                            var href = closeAHfre.attr("href");
                            //开始分析ID,NAME,URL
                            var param = href.substring(href.indexOf("(") + 1, href.indexOf(")"));
                            var params = param.replace(/"/g, "").split(",");


                            var liContent = " <li  key='" + params[0] + "' class='item'><a class='item-name' href='javascript:onlyActionTitle(" + params[0] + ",\"" + params[1] + "\",\"" + params[2] + "\")'>" + params[1] + "</a><a class='item-close' href='javascript:removeTabForDownList(" + params[0] + ",\"" + params[1] + "\",\"" + params[2] + "\")'></a></li>";
                            //如果已经生成一个，则可以直接添加到里面并退出

                            $("#overflowTitle").append(liContent);

                            $(this).remove();

                            return false;
                        }
                    });
                }

                return false;
            }
        });

    }
    //tabShowPannel['width'] += width_item;
    //tabShowPannel['tabs'].push(width_item);
    //console.log(tabShowPannel);

}

/**
 * 只删除标题，Tab的body用于激活使用
 * @param id
 */
function onlyActionTitle(id, name, url) {
    getOverFlowLi(id);

    //先将需要激活的移到title分类里面，移动
    $("#addtitles li").removeClass("current");
    var newTabTitle = null;
    if (name == "我的工作台") {
        newTabTitle = "<li  key='" + id + "' class='item current'><a class='item-name' onclick='actionTab(" + id + ",\"" + name + "\");'>" + name + "</a></li>";
    } else {
        newTabTitle = "<li  key='" + id + "' class='item current'><a class='item-name' onclick='actionTab(" + id + ",\"" + name + "\");'>" + name + "</a><a class='item-close'  href='javascript:removeTab(" + id + ",\"" + name + "\",\"" + url + "\");'></a></li>";
    }
    $("#addtitles").html($("#addtitles").html() + newTabTitle);

    //删除现在DownList里面的Item
    $("#overflowTitle li").each(function () {
        var con = $(this).find('a').html();
        var currentID = parseInt($(this).attr('key'));
        if (con != null && con.length > 0 && name == con) {
            $(this).remove();
        }
    });

    //激活该Tab

    actionTab(id, name);
}


/**
 * 关闭一个Tab
 * @param id
 */
function removeTabForDownList(id, name, url) {
    if (extContainer.get(id) != null) {
        extContainer.remove(id);
        //删除Title
        var activeTabId = 0;
        var activeFlag = true;
        var activeName = "";
        $("#overflowTitle li").each(function () {
            var con = $(this).find('a').html();
            var currentID = parseInt($(this).attr('key'));
            if (id != currentID && activeFlag) {
                activeTabId = currentID;
                activeName = con;
            }
            if (con != null && con.length > 0 && name == con) {
                $(this).remove();
            }
        });
        //删除Content
        $("#frameTab" + id).remove();
        countTab = countTab - 1;
        //if (activeTabId != 0 && activeName != "") actionTab(activeTabId, activeName);
        toggleDownTitle();
    }
}


/**
 * 关闭所有的打开的窗口
 */
function closeAllTab(){
    runnerConfiremCommon('操作提示', '确定关闭当前所有标签页吗？', closeAllTabDo, true);
}
function closeAllTabDo() {
    //关闭隐藏的Tab
    $("#overflowTitle li").each(function () {
        var closea = $(this).find("a");
        if (closea != null) {
            $.each(closea, function () {
                var text = $(this).html();
                var className = $(this).attr("class");
                if (className == "item-close") {
                    if (text == "关闭所有标签页") {

                    } else {
                        eval($(this).attr("href")); //直接执行关闭a的href属性
                    }
                }
            });
        }
    });

    $("#addtitles li").each(function () {
        var closea = $(this).find("a");
        if (closea != null) {
            $.each(closea, function () {
                var innerHtml = $(this).html();
                var className = $(this).attr("class");
                if (className == "item-close") {
                    eval($(this).attr("href")); //直接执行关闭a的href属性
                }
            })
        }
    });

    $("#overflowTitle").slideUp(100);
}

/**
 * 切换隐藏的下来拉列表
 * @param container
 */
function toggleOverFlowTitleDiv(container) {
    $("#" + container).toggle();
}


/**
 * 二级菜单样式切换
 */
function liClassChange(name) {
    $("#menu2 li").removeClass("current");
    $("#menu2 li").each(function () {
        var con = $(this).find('a').html();
        if (con != null && con.length > 0 && name == con) {
            $(this).addClass("current");
        }
    });
}

/**
 * 激活Tab页面
 * @param id
 * @param name
 * @param url
 */
function actionTab(id, name) {
    displayNoneContent();
    liClassChange(name);
    $("#addtitles li").removeClass("current");
    $("#addtitles li").each(function () {
        if ($(this).attr('key') == id){ //顶部激活
            var con = $(this).find('a').html();
            if (con != null && con.length > 0 && name == con) {
                $(this).addClass("current");
            }
        }
    });
    var contentTab = "frameTab" + id;
    $("#" + contentTab).show();
    mouseRight_Tab(); //标签页鼠标右键操作
}


/**
 * 添加Table Title
 * @param id
 * @param name
 * @param containId
 */
function addTabTitle(id, name, containId, url) {
    if (extContainer.get(id) != null) {
        console.log("title exits")
    } else {
        extContainer.put(id, name);
        $("#addtitles li").removeClass("current");
        var newTabTitle = null;
        if (name == "我的工作台") {
            newTabTitle = "<li  key='" + id + "' class='item current'><a class='item-name' onclick='actionTab(" + id + ",\"" + name + "\");'>" + name + "</a></li>";
        } else {
            newTabTitle = "<li  key='" + id + "' class='item current'><a class='item-name' onclick='actionTab(" + id + ",\"" + name + "\");'>" + name + "</a><a class='item-close'  href='javascript:removeTab(" + id + ",\"" + name + "\",\"" + url + "\");'></a></li>";
        }
        $("#addtitles").html($("#addtitles").html() + newTabTitle);
        toggleDownTitle();
    }
}


/**
 * 添加frame内容
 * @param id
 * @param name
 * @param url
 */
function addTabContent(id, name, url) {
    displayNoneContent();
    //console.log(id, name, url);
    var divStart = "<div class='frameTab' id='frameTab" + id + "'>";
    var s = '<iframe name="mainFrame' + id + '" id="mainFrame' + id + '" scrolling="yes" frameborder="0"  src="' + url + '" height="100%" width="100%"></iframe>';
    var divEnd = "</div>";
    var content = divStart + s + divEnd;
    $("#tabContents").append(content);
}

/**
 * 隐藏已有的所有content
 */
function displayNoneContent() {
    $('#tabContents').children('div').hide();
    /*for (var i = 0; i < 9999; i++) {
        var contentTab = "frameTab" + i;
        $("#" + contentTab).hide();
    }*/
}


/**
 * 关闭一个Tab
 * @param id
 */
function removeTab(id, name, url) {
    //console.log('removeTab:', extContainer, id, extContainer.get(id));
    if (name != '我的工作台') {
        if (extContainer.get(id) != null) {
            //删除Title
            var activeTabId = 0;
            var activeFlag = true;
            var activeName = "";
            $("#addtitles li").each(function () {
                var con = $(this).find('a').html();
                var currentID = parseInt($(this).attr('key'));
                if (id != currentID && activeFlag) {
                    activeTabId = currentID;
                    activeName = con;
                }
                if (con != null && con.length > 0 && name == con) {
                    $(this).remove();
                }
            });
            //删除Content
            $("#frameTab" + id).remove();
            countTab = countTab - 1;
            extContainer.remove(id);
            if (activeTabId != 0 && activeName != "") actionTab(activeTabId, activeName);
            var isAddFlag = true;
            //当移动一个顶部Top的Title的后,判断隐藏的有没有Title如果有,则移一个上来
            $("#overflowTitle li").each(function () {
                var closea = $(this).find("a");
                if (closea != null) {
                    $.each(closea, function () {
                        var text = $(this).html();
                        var className = $(this).attr("class");
                        if (className == "item-close") {
                            if (text == "关闭所有标签页") {

                            } else {
                                //解释属性,添加一个Title至Top Title
                                //分析分关属性
                                if (isAddFlag) {
                                    var href = closea.attr("href");
                                    //开始分析ID,NAME,URL
                                    var param = href.substring(href.indexOf("(") + 1, href.indexOf(")"));
                                    var params = param.replace(/"/g, "").split(",");

                                    onlyActionTitle(parseInt(params[0]), params[1], params[2]);
                                    toggleDownTitle();
                                    isAddFlag = false;
                                    return false
                                }
                            }
                        }
                    });
                }
            });

            mouseRight_Tab();
        }
    }
}

/**
 * 当tab页过多时再显示下拉按钮
 */
function toggleDownTitle(){
    var moreTabNum = $("#overflowTitle li").length;
    $("#countTabList").text(moreTabNum);
    if ($('#overflowTitle li').length <= 0) {
        $('#downTitle').hide();
    } else {
        $('#downTitle').show();
    }
}


/**
 * 标签页鼠标右键操作
 */
function mouseRight_Tab(){
    var tabMenuData = [
        [{
            text: "关闭所有页面",
            func: function() {
                closeAllTab();
            }
        },{
            text: "关闭其他页面",
            func: function() {
                //关闭隐藏tab
                $('#overflowTitle li').each(function(){
                    var id = $(this).attr('key');
                    var name = $(this).find("a:first").text();
                    removeTabForDownList(id, name);
                });
                //关闭顶部tab
                var current_id = $(this).attr('key');
                $('#addtitles li').each(function(){
                    var id = $(this).attr('key');
                    var name = $(this).find("a:first").text();
                    if (id != current_id){
                        removeTab(id, name);
                    }
                });
            }
        },{
            text: "关闭页面",
            func: function() {
                var id = $(this).attr('key');
                var name = $(this).find("a:first").text();
                removeTab(id, name);
            }
        }]
    ];
    $("#addtitles li").smartMenu(tabMenuData, {
        name: "tab"
    });
}