var menu = [
    {
        "id": 4,
        "parentName": "资料",
        "icon": "&#xe0004;",
        "secondMenu": [
            {
                "cateName": "基础资料",
                "subList": [
                    {
                        "id": 41,
                        "name": "公司信息",
                        "url": "/mainframe/baseinfo/company.html?iframeid=41&iframename=公司信息",
                        "isList": false
                    },
                    {
                        "id": 46,
                        "name": "仓库管理",
                        "url": "/mainframe/baseinfo/store.html?iframeid=46&iframename=仓库管理",
                        "isList": true,
                        "listUrl": {
                            "id": 466,
                            "name": "新建仓库",
                            "url": "/mainframe/baseinfo/saveStore.html?iframeid=466&iframename=新建仓库",
                        }
                    },
                    {
                        "id": 45,
                        "name": "员工管理",
                        "url": "/mainframe/baseinfo/user.html?iframeid=45&iframename=员工管理",
                        "isList": true,
                        "listUrl": {
                            "id": 455,
                            "name": "新建员工",
                            "url": "/mainframe/baseinfo/saveUser.html?action=new&iframeid=455&iframename=新建员工",
                        }
                    },
                    {
                        "id": 42,
                        "name": "供应商管理",
                        "url": "/mainframe/baseinfo/supplier.html?iframeid=42&iframename=供应商管理",
                        "isList": true,
                        "listUrl": {
                            "id": 422,
                            "name": "供应商注册",
                            "url": "/mainframe/baseinfo/supplierReg.html?iframeid=422&iframename=供应商注册",
                        }
                    },
                    {
                        "id": 43,
                        "name": "客户管理",
                        "url": "/mainframe/baseinfo/custom.html?iframeid=43&iframename=客户管理",
                        "isList": true,
                        "listUrl": {
                            "id": 433,
                            "name": "客户注册",
                            "url": "/mainframe/baseinfo/customReg.html?iframeid=433&iframename=客户注册",
                        }
                    },
                    {
                        "id": 411,
                        "name": "会员管理",
                        "url": "/mainframe/baseinfo/vip.html?iframeid=411&iframename=会员管理",
                        "isList": true,
                        "listUrl": {
                            "id": 412,
                            "name": "会员注册",
                            "url": "/mainframe/baseinfo/vipReg.html?iframeid=412&iframename=会员注册",
                        }
                    },
                    /*
                    {
                        "id": 499,
                        "name": "移交客户",
                        "url": "/mainframe/baseinfo/moveCustom.html?iframeid=499&iframename=移交客户",
                        "isList": false
                    },*/
                    {
                        "id": 47,
                        "name": "车辆管理",
                        "url": "/mainframe/baseinfo/car.html?iframeid=47&iframename=车辆管理",
                        "isList": true,
                        "listUrl": {
                            "id": 477,
                            "name": "新建车辆",
                            "url": "/mainframe/baseinfo/saveCar.html?action=new&iframeid=477&iframename=新建车辆",
                        }
                    },
                    {
                        "id": 44,
                        "name": "商品管理",
                        "url": "/mainframe/baseinfo/goods.html?iframeid=44&iframename=商品管理",
                        "isList": true,
                        "listUrl": {
                            "id": 444,
                            "name": "新建商品",
                            "url": "/mainframe/baseinfo/createGoods.html?iframeid=444&iframename=新建商品",
                        }
                    },
                    {
                        "id": 271,
                        "name": "销售任务管理",
                        "url": "/mainframe/sale/task.html",
                        "isList": true,
                        "listUrl": {
                            "id": 27,
                            "name": "新建销售任务",
                            "url": "/mainframe/sale/createTask.html?iframeid=27&iframename=新建销售任务",
                        }
                    },
                    {
                        "id": 37,
                        "name": "库存预警管理",
                        "url": "/mainframe/inventory/saveInventoryWarning.html?iframeid=37&iframename=库存预警管理",
                        "isList": false,
                    }
                ]
            }
        ]
    },
    {
        "id": 1,
        "parentName": "采购",
        "icon": "&#xe0001;",
        "secondMenu": [
            {
                "cateName": "采购单据",
                "subList": [
                    {
                        "id": 121,
                        "name": "采购订单",
                        "url": "/mainframe/stock/checkOrder.html",
                        "isList": true,
                        "listUrl": {
                            "id": 12,
                            "name": "新建订单",
                            "url": "/mainframe/stock/createOrder.html?iframeid=12&iframename=新建订单",
                        }
                    },
                    {
                        "id": 161,
                        "name": "采购入库单",
                        "url": "/mainframe/stock/checkStorageBill.html",
                        "isList": true,
                        "listUrl": {
                            "id": 16,
                            "name": "新建入库单",
                            "url": "/mainframe/stock/createOrder.html?action=cski&iframeid=16&iframename=新建入库单",
                        }
                    },
                    {
                        "id": 181,
                        "name": "采购退货单",
                        "url": "/mainframe/returngoods/outReturnGoods.html",
                        "isList": true,
                        "listUrl": {
                            "id": 18,
                            "name": "新建退货单",
                            "url": "/mainframe/returngoods/createOutReturnGoods.html?iframeid=18&iframename=新建退货单",
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "parentName": "销售",
        "icon": "&#xe0002;",
        "secondMenu": [
            {
                "cateName": "销售单据",
                "subList": [
                    {
                        "id": 22,
                        "name": "客户订单",
                        "url": "/mainframe/sale/outOrderThelibrary.html",
                        "isList": false
                    },
                    {
                        "id": 24,
                        "name": "客户退货申请单",
                        "url": "/mainframe/returngoods/inReturnGoods.html",
                        "isList": false
                    },
                    {
                        "id": 261,
                        "name": "客户出货单",
                        "url": "/mainframe/sale/checkThelibrary.html",
                        "isList": true,
                        "listUrl": {
                            "id": 26,
                            "name": "新建出货单",
                            "url": "/mainframe/sale/createThelibrary.html?action=csko&iframeid=26&iframename=新建出货单",
                        }
                    },
                    {
                        "id": 281,
                        "name": "客户退货单",
                        "url": "/mainframe/returngoods/inReturnGoodsCheck.html",   //审核通过的列表
                        "isList": true,
                        "listUrl": {
                            "id": 28,
                            "name": "新建客户退货单",
                            "url": "/mainframe/returngoods/createReturnGoods.html?iframeid=28&iframename=新建客户退货单",
                        }
                    },
                    {
                        "id": 291,
                        "name": "拣货派车单",
                        "url": "/mainframe/wms/pickingCart.html",
                        "isList": true,
                        "listUrl": {
                            "id": 29,
                            "name": "新建拣货派车单",
                            "url": "/mainframe/wms/createPickingCart.html?iframeid=29&iframename=新建拣货派车单",
                        }
                    }/*,
                    {
                        "id": 271,
                        "name": "销售任务管理",
                        "url": "/mainframe/sale/task.html",
                        "isList": true,
                        "listUrl": {
                            "id": 27,
                            "name": "新建销售任务",
                            "url": "/mainframe/sale/createTask.html?iframeid=27&iframename=新建销售任务",
                        }
                    }*/
                ]
            }
        ]
    },
    {
        "id": 9,
        "parentName": "客服",
        "icon": "&#xe0006;",
        "secondMenu": [
            {
                "cateName": "客户服务",
                "subList": [
                    {
                        "id": 48,
                        "name": "客户审核",
                        "url": "/mainframe/baseinfo/customCheck.html?iframeid=48&iframename=客户审核",
                        "isList": false,
                    },
                    {
                        "id": 23,
                        "name": "客户订单分配",
                        "url": "/mainframe/service/outOrderThelibraryModify.html",
                        "isList": false
                    },
                    {
                        "id": 25,
                        "name": "客户订单回访",
                        "url": "/mainframe/service/outOrderThelibraryRevisit.html",
                        "isList": false
                    },
                    {
                        "id": 91,
                        "name": "回访记录",
                        "url": "/mainframe/service/record.html",
                        "isList": true,
                        "listUrl": {
                            "id": 911,
                            "name": "新建回访记录",
                            "url": "/mainframe/service/saveRecord.html?iframeid=911&iframename=新建回访记录",
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "parentName": "价格",
        "icon": "&#xe0007;",
        "secondMenu": [
            {
                "cateName": "价格调整单据",
                "subList": [
                    {
                        "id": 662,
                        "name": "进货价调整单",
                        "url": "/mainframe/price/stockinPrice.html",
                        "isList": true,
                        "listUrl": {
                            "id": 62,
                            "name": "新建进货价调整单",
                            "url": "/mainframe/price/createStockinPrice.html?iframeid=62&iframename=新建进货价调整单",
                        }
                    }, {
                        "id": 663,
                        "name": "出货价调整单",
                        "url": "/mainframe/price/stockoutPrice.html",
                        "isList": true,
                        "listUrl": {
                            "id": 63,
                            "name": "新建出货价调整单",
                            "url": "/mainframe/price/createStockoutPrice.html?iframeid=63&iframename=新建出货价调整单",
                        }
                    }, {
                        "id": 664,
                        "name": "进价促销单",
                        "url": "/mainframe/price/salesPromotionPrice.html",
                        "isList": true,
                        "listUrl": {
                            "id": 64,
                            "name": "新建进价促销单",
                            "url": "/mainframe/price/createSalesPromotionPrice.html?iframeid=64&iframename=新建进价促销单",
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "parentName": "财务",
        "icon": "&#xe0008;",
        "secondMenu": [
            {
                "cateName": "财务单据",
                "subList": [
                    {
                        "id": 811,
                        //"name": "客户结算单（经销）",
                        "name": "客户结算单",
                        "url": "/mainframe/finance/curSetlement.html",
                        "isList": true,
                        "listUrl": {
                            "id": 81,
                            "name": "新建客户结算单",
                            "url": "/mainframe/finance/checkCusSetlement.html?iframeid=81&iframename=新建客户结算单",
                        }
                    },
                    {
                        "id": 822,
                        //"name": "供应商结算单（经销）",
                        "name": "供应商结算单",
                        "url": "/mainframe/finance/supSetlement.html",
                        "isList": true,
                        "listUrl": {
                            "id": 82,
                            "name": "新建供应商结算单",
                            "url": "/mainframe/finance/checkSupSetlement.html?iframeid=82&iframename=新建供应商结算单",
                        }
                    },
                    {
                        "id": 855,
                        "name": "代销结算单",
                        //"name": "供应商结算单（代销）",
                        "url": "/mainframe/finance/consignmentSettlement.html",
                        "isList": true,
                        "listUrl": {
                            "id": 85,
                            "name": "新建代销结算单",
                            "url": "/mainframe/finance/createConsignmentSettlement.html?iframeid=85&iframename=新建代销结算单",
                        }
                    },
                    {
                        "id": 833,
                        "name": "收款单",
                        "url": "/mainframe/finance/gathering.html",
                        "isList": true,
                        "listUrl": {
                            "id": 83,
                            "name": "新建收款单",
                            "url": "/mainframe/finance/createGathering.html?iframeid=83&iframename=新建收款单",
                        }
                    },
                    {
                        "id": 844,
                        "name": "付款单",
                        "url": "/mainframe/finance/payment.html",
                        "isList": true,
                        "listUrl": {
                            "id": 84,
                            "name": "新建付款单",
                            "url": "/mainframe/finance/createPayment.html?iframeid=84&iframename=新建付款单",
                        }
                    },
                    {
                        "id": 866,
                        "name": "提成结算单",
                        "url": "/mainframe/finance/commission.html",
                        "isList": true,
                        "listUrl": {
                            "id": 86,
                            "name": "新建提成结算单",
                            "url": "/mainframe/finance/createCommission.html?iframeid=86&iframename=新建提成结算单",
                        }
                    },
                    {
                        "id": 877,
                        "name": "会员收款单",
                        "url": "/mainframe/finance/gatheringVIP.html",
                        "isList": true,
                        "listUrl": {
                            "id": 87,
                            "name": "新建会员收款单",
                            "url": "/mainframe/finance/createGatheringVIP.html?iframeid=87&iframename=新建会员收款单",
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "parentName": "库存",
        "icon": "&#xe0003;",
        "secondMenu": [
            {
                "cateName": "库存单据",
                "subList": [
                    {
                        "id": 321,
                        "name": "调出单",
                        "url": "/mainframe/inventory/stubbsOutBill.html",
                        "isList": true,
                        "listUrl": {
                            "id": 32,
                            "name": "新建调出单",
                            "url": "/mainframe/inventory/createStubbsOutBill.html?iframeid=32&iframename=新建调出单",
                        }
                    },
                    {
                        "id": 331,
                        "name": "调入单",
                        "url": "/mainframe/inventory/stubbsInBill.html",
                        "isList": false,
                    },
                    {
                        "id": 341,
                        "name": "报损单",
                        "url": "/mainframe/inventory/reportedLossBill.html",
                        "isList": true,
                        "listUrl": {
                            "id": 34,
                            "name": "新建报损单",
                            "url": "/mainframe/inventory/createReportedLossBill.html?iframeid=34&iframename=新建报损单",
                        }
                    },
                    {
                        "id": 361,
                        "name": "报溢单",
                        "url": "/mainframe/inventory/overflowBill.html",
                        "isList": true,
                        "listUrl": {
                            "id": 36,
                            "name": "新建报溢单",
                            "url": "/mainframe/inventory/createOverFlowBill.html?iframeid=36&iframename=新建报溢单",
                        }
                    }/*,
                    {
                        "id": 37,
                        "name": "库存预警管理",
                        "url": "/mainframe/inventory/saveInventoryWarning.html?iframeid=37&iframename=库存预警管理",
                        "isList": false,
                    }*/
                ]
            }
        ]
    },
    {
        "id": 7,
        "parentName": "盘点",
        "icon": "&#xe0006;",
        "secondMenu": [
            {
                "cateName": "库存盘点",
                "subList": [
                    {
                        "id": 722,
                        "name": "帐盘单",
                        "url": "/mainframe/check/accountSet.html",
                        "isList": true,
                        "listUrl": {
                            "id": 72,
                            "name": "新建帐盘单",
                            "url": "/mainframe/check/createAccountSet.html?iframeid=72&iframename=新建帐盘单",
                        }
                    }, {
                        "id": 733,
                        "name": "实盘单",
                        "url": "/mainframe/check/firmOffer.html",
                        "isList": true,
                        "listUrl": {
                            "id": 73,
                            "name": "新建实盘单",
                            "url": "/mainframe/check/createFirmOffer.html?iframeid=73&iframename=新建实盘单",
                        }
                    }, {
                        "id": 744,
                        "name": "记账",
                        "url": "/mainframe/check/accounting.html",
                        "isList": false,
                        "listUrl": false
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "parentName": "设置",
        "icon": "&#xe0005;",
        "secondMenu": [
            {
                "cateName": "系统设置",
                "subList": [
                    {
                        "id": 52,
                        "name": "角色管理",
                        "url": "/mainframe/baseinfo/role.html",
                        "isList": true,
                        "listUrl": {
                            "id": 522,
                            "name": "新建角色",
                            "url": "/mainframe/baseinfo/saveRole.html?action=new&iframeid=522&iframename=新建角色",
                        }
                    }, {
                        "id": 54,
                        "name": "打印模版",
                        "url": "/mainframe/baseinfo/printTemplate.html?iframeid=54&iframename=打印模版",
                        "isList": false
                    }, {
                        "id": 53,
                        "name": "日志查询",
                        "url": "/mainframe/baseinfo/log.html",
                        "isList": false
                    }
                ]
            }
        ]
    }
];

/**
 * 根据模式过滤菜单
 */
var menuFilter = {
    'B2C': [43,271,48,23,811,833,844,855,866],
    'B2B': [411,877]
};

/*定义菜单状态*/
var isMiniSide = 0;
var isCloseSubside = 1;

/*定义初始菜单宽度*/
var miniSideWidth = 40;
var standardSideWidth = 100;
//var subsideWidth = 150;
//var subsideLeft = -110;

//var widthSubsideFix;

$(function () {
    makeMenu();

    //报表权限判断
    $("#dmProduct dd").each(function(){
        var a = $(this).find('a');
        if (!checkPower(a.attr('id'))){
            a.attr('href', 'javascript:').css({'color':'#ccc'});
        } else {
            //有权限时点击后隐藏div
            a.click(function(){
                $("#dmProduct").hide();
                $("#navProduct").removeClass().addClass("navname");
            });
        }
    });


    /*产品与服务菜单*/
    var timer_product_down;
    var timer_product_up;
    $("#navProductWrap").hover(function () {
        clearTimeout(timer_product_up);
        timer_product_down = setTimeout(function(){
            $("#dmProduct").slideDown('fast');
            $("#navProduct").addClass('active');
        }, 300);
    },function(){
        clearTimeout(timer_product_down);
        timer_product_up = setTimeout(function(){
            $("#dmProduct").slideUp('fast');
            $("#navProduct").removeClass().addClass("navname");
        }, 150);
    });

    /*个人菜单*/
    var timer_profile_down;
    var timer_profile_up;
    $("#navProfileWrap").hover(function () {
        clearTimeout(timer_profile_up);
        timer_profile_down = setTimeout(function(){
            $("#dmProfile").slideDown('fast');
            $("#navProfile").addClass('active');
        }, 300);
    },function () {
        clearTimeout(timer_profile_down);
        timer_profile_up = setTimeout(function(){
            $("#dmProfile").slideUp('fast');
            $("#navProfile").removeClass().addClass("navname");
        }, 150);
    });

    /*消息菜单*/
    var timer_notice_down;
    var timer_notice_up;
    $("#navNoticeWrap").hover(function () {
        clearTimeout(timer_notice_up);
        timer_notice_down = setTimeout(function(){
            $("#dmNotice").slideDown('fast');
            $("#navNotice").addClass('active');
        }, 300);
    },function () {
        clearTimeout(timer_notice_down);
        timer_notice_up = setTimeout(function(){
            $("#dmNotice").slideUp('fast');
            $("#navNotice").removeClass().addClass("navname");
        }, 150);
    });


    /*点击页面空白处关闭菜单
    $(document).click(function (event) {
        $("#dmProduct").hide();
        $("#navProduct").removeClass().addClass("navname");
        $("#dmProfile").slideUp('fast');
        $("#navProfile").removeClass().addClass("navname");
        event.stopPropagation();
    });*/

    if (isMiniSide === 1) {
        $(".layout-side .item-name").hide(0);
    }

    /*侧边一级菜单左右折叠*/
    $("#menuHandle").click(function () {
        switchMenu();
    });

    /*侧边二级菜单左右收缩*/
    $("#submenuHandle").click(function () {
        //console.log("xxx");
        switchSubMenu();
    });

    /*鼠标移出主菜单区域时隐藏二级菜单*/
    $("#oneMenu").hover(function(){

    },function(){
        $(".panel-menu-sub").hide();
    });

    /*
     $("#submenuHandle").toggle(function () {
     isCloseSubside = 1;

     $(this).css("right", "-11px");
     $(this).toggleClass("handle-open");
     $(".layout-subside").animate({
     left: widthSide - 140 + "px"
     }, 100);
     $(".layout-main").animate({
     marginLeft: widthSide + "px"
     }, 100);
     event.stopPropagation();
     }, function () {
     isCloseSubside = 0;

     $(this).css("right", "0");
     $(this).toggleClass("handle-open");
     $(".layout-subside").animate({
     left: widthSide + "px"
     }, 100);
     $(".layout-main").animate({
     marginLeft: widthSide + widthSubsideFix + "px"
     }, 100);
     event.stopPropagation();
     });
     */

});



/**
 *一级菜单水平展开和收起
 */
function switchMenu() {

    if (isMiniSide === 1) {
        //展开一级菜单
        isMiniSide = 0;

        $(".layout-side").animate({width: standardSideWidth + "px"}, 100, function () {
            $(".layout .item-name").show(0);
        });

        //同步改变主容器左边距
        $(".layout-main").animate({
            marginLeft: standardSideWidth + "px"
        }, 100);

        $(".version").show();

    } else {
        //收起一级菜单
        isMiniSide = 1;

        $(".layout-side .item-name").hide(0);
        $(".layout-side").animate({width: miniSideWidth + "px"}, 100, function () {

        });

        //同步改变主容器左边距
        $(".layout-main").animate({
            marginLeft: miniSideWidth + "px"
        }, 100);

        $(".version").hide();

    }
}

/**
 *输出菜单
 */
function makeMenu() {
    var menus = menu;
    initMenuPower();
    var classSplit = "";
    if (menus != null && menus.length > 0) {
        for (var i = 0; i < menus.length; i++) {
            //console.log(menus[i].id);
            (menus[i].id == 5) ? classSplit = " separator" : classSplit = "";
            var menuItem = $("<li id='oneMenuId" + menus[i].id + "' class='item" + classSplit + "'></li>");
            var menuItem_sub = $("<div id='twoMenuId" + menus[i].id + "' data-id='"+ menus[i].id +"' class='panel-menu-sub'></div>");
            var menuItem_link = $("<a class='item-link' data-id='"+ menus[i].id +"' href='javascript:void(0);'><i class='item-icon icon-menu-" + menus[i].id + "'></i>" + menus[i].parentName + "</a>");
            var handle = null;

            menuItem_link.hover(function(){
                var id = $(this).data("id");
                handle = setTimeout(function(){
                    makeTwoMenu(id);
                },150);
            },function(){
                //$(".panel-menu-sub").hide(0); //优化用户体验,不要打开!!!
                clearTimeout(handle);
            });

            menuItem_sub.hover(function(){
                $(this).show(0);
            },function(){
                $(".panel-menu-sub").hide(0);
            });

            menuItem_link.appendTo(menuItem);
            menuItem_sub.appendTo(menuItem);
            menuItem.appendTo($("#oneMenu"));
            //$("#oneMenu").append("<li id='oneMenuId" + menus[i].id + "' class='item" + classSplit + "'><a class='item-icon'  href='javascript:makeTwoMenu(" + menus[i].id + ")'>" + menus[i].icon + "</a><a class='item-name' href='javascript:makeTwoMenu(" + menus[i].id + ")'>" + menus[i].parentName + "</a></li>");

        }
    }
}

/**
 * 获取菜单权限
 */
var menuPower;
var is_admin = false;
function initMenuPower(){
    var msg = cookieUtil("userprofile");
    msg = JSON.parse(msg);
    //msg.admin = null; //test
    if (msg.admin && msg.admin == 1){
        //管理员则跳过权限判断
        is_admin = true;
    } else {
        if (!power) {
            runnerAlert('系统错误', '权限系统异常，请通知管理员！');
            $('#navProduct').remove();
        } else {
            menuPower = power; //通过util中的getuser获取

            /*
            //普通用户
            var configRes = new configRepository();
            menuPower = configRes.menuPower();
            if (!menuPower) {
            alert('权限系统异常,请通知管理员!'); //请使用原生alert
            window.parent.location.href = "/login.html";
            }
            */
        }
    }
}

/**
 * 填充二级菜单
 * @param name
 */
function makeTwoMenu(id) {

    var menus = menu;
    var subMenus = null;
    isCloseSubside = 0;

    //console.log(isCloseSubside);

    //找到该级采单数据
    for (var i = 0; i < menus.length; i++) {
        $("#oneMenuId" + menus[i].id).removeClass("current");
        if (menus[i].id == id) {
            subMenus = menus[i];
        }
    }
    $('#oneMenu li div').hide(); //先把其他的二级菜单隐藏
    //给一级添加样式
    //$("#oneMenuId" + id).addClass("current");

    //输出二级菜单
    var subList = subMenus.secondMenu;
    var subMenuStr = "";
    if (subList != null && subList.length > 0) {
        for (var i = 0; i < subList.length; i++) {
            var currentCate = subList[i]; //获取每个分类
            subMenuStr += "<h2 class=\"title\"><span class=\"name\" >" + currentCate.cateName + "</span></h2>";
            subMenuStr += "<div class=\"list\">";
            subMenuStr += "<ul id=\"menu2\">";
            var subMenuSubList = currentCate.subList;
            //输出具体菜单列表
            if (is_admin || menuPower) {
                if (subMenuSubList != null) {
                    for (var j = 0; j < subMenuSubList.length; j++) {
                        //console.log(subMenuSubList[j].id);
                        //根据模式过滤菜单
                        if ($.inArray(subMenuSubList[j].id, menuFilter[VERSION_MODE]) != -1){
                            continue;
                        }
                        //列表页菜单权限判断
                        if (is_admin || menuPower[subMenuSubList[j].id]) { //有权限
                            var liStr = "<li class=\"sub-item\"><a class='sub-item-name' href=\"javascript:addTab('" + subMenuSubList[j].id + "','" + subMenuSubList[j].name + "','" + subMenuSubList[j].url + "');closeSubMenu();\">" + subMenuSubList[j].name + "</a>";
                        } else { //无权限
                            var liStr = "<li class=\"sub-item\"><a class='sub-item-name' style='color:#999;' href=\"#\">" + subMenuSubList[j].name + "</a>";
                        }

                        subMenuStr += liStr;

                        //新建菜单权限判断
                        if (subMenuSubList[j].isList) {
                            if (is_admin || menuPower[subMenuSubList[j].listUrl.id]) { //有权限
                                subMenuStr += "<a class=\"sub-item-highlight font-icon\" href=\"javascript:addTab('" + subMenuSubList[j].listUrl.id + "','" + subMenuSubList[j].listUrl.name + "','" + subMenuSubList[j].listUrl.url + "');closeSubMenu();\">新建</a>";
                            } else { //无权限
                                subMenuStr += "<a class=\"sub-item-highlight font-icon\" style='background:#999;' href=\"#\">新建</a>";
                            }
                        }
                        subMenuStr += "</li>";
                    }
                }
            }
            subMenuStr += " </ul>";
            subMenuStr += "</div>";
        }
    }

    $("#twoMenuId" + id).empty().append(subMenuStr).fadeIn("fast");

    //$("#panelsubmenu").html(subMenuStr);

}

function closeSubMenu(){
    $(".panel-menu-sub").hide();
}

/**
 *下拉菜单切换
 */
function toggleMenu(btnId, id) {
    $(id).slideToggle(100);
    $(btnId).toggleClass("active");
}





