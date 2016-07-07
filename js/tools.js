/**
 * 业务工具函数集合
 */


/** 按钮权限

 [含菜单ID]

 9001   商品报表
 9002   客户报表
 9003   供应商报表
 9004   查询商品进货价格
 9005   查询商品出货价格
 9006   商品价格报表(不需要单独勾选)
 9007   客户业务员排行

 9101   库存日报
 9102   实时库存查询
 9103   台帐查询
 9104   进销存日报
 9105   盘点预盈亏报表
 9106   盘点实盈亏报表
 9107   保质期预警
 9108   出库单汇总
 9109   入库单汇总

 9201   日对账报表
 9202   业务员排名
 9203   商品排名
 9204   客户排名
 9205   供应商销量排名 [缺]
 9206   销售分析 [缺]

 9301   应付款报表
 9302   应收款报表

 10101	公司资料修改［OK］
 10201	仓库修改［OK］
 10301	供应商导入［OK］
 10302	供应商修改［OK］
 10401	客户导入［OK］
 10402	客户编辑［OK］
 10403	审核客户通过［OK］
 10404	审核客户不通过［OK］
 10405	向客户添加业务员［OK］
 10406	从客户移除业务员［OK］
 10407	设置客户默认业务员［OK］
 10408  会员注册
 10409  会员修改
 10410  会员停用
 10411  会员启用
 10501	商品分类新建［OK］
 10502	商品分类删除［OK］
 10503	商品分类改名［OK］
 10504	导入系统商品分类［OK］
 10505  清空商品分类［OK］
 10506  库存预警设置［OK］

 10601	商品导入［OK］
 10602  商品添加供应商［OK］
 10603  商品编辑(修改分类/箱重)［OK］
 10604  商品停止采购［OK］
 10605  商品开启采购［OK］
 10606  商品删除［OK］
 10607  商品删除供应商［OK］
 10608  商品新建［OK］

 10701	员工修改［OK］
 10702	员工停用［OK］
 10703	员工创建［OK］
 10704	批量移交客户［OK］
 10705	新建员工分组［OK］
 10706	删除员工分组［OK］
 10707	改名员工分组［OK］

 10801  车辆新建 [OK]
 10802  车辆编辑 [OK]
 10803  车辆删除 [OK]

 11001  订单修改［OK］
 11002  订单保存［OK］
 11003  订单保存并审核［OK］
 11004  订单审核［OK］
 11005  订单作废［OK］
 11006  订单生成入库单［OK］
 11007  订单生成入库单并审核［OK］

 11101  入库单修改［OK］
 11102  入库单保存［OK］
 11103  入库单保存并审核［OK］
 11104  入库单审核［OK］
 11105  入库单作废［OK］
 11106  入库单修正［OK］
 11107  入库单冲单［OK］

 11201	退货出库单保存［OK］
 11202	退货出库单保存并审核［OK］
 11203	退货出库单审核［OK］
 11204	退货出库单作废［OK］
 11205	退货出库单修正［OK］
 11206	退货出库单冲单［OK］
 11207	退货出库单修改［OK］

 11301	从客户订单生成出库单［OK］
 11302	从客户订单生成出库单并审核［OK］
 11303	出库单保存［OK］
 11304	出库单保存并审核［OK］
 11305	出库单审核［OK］
 11306	出库单作废［OK］
 11307	出库单修正［OK］
 11308	出库单冲单［OK］
 11309  出库单修改［OK］
 11310  取消客户订单［OK］
 11311  修改客户订单［OK］
 11312  保存订单回访结果［OK］
 11313  客户订单拆单［OK］

 11401	从订单生成退货入库单［OK］
 11402	从订单生成退货出库单并审核［OK］
 11403	退货入库单保存［OK］
 11404	退货入库单审核［OK］
 11405	退货入库单作废［OK］
 11406	退货入库单修正［OK］
 11407	退货入库单冲单［OK］
 11408	退货入库单修改［OK］

 11501	调出单保存［OK］
 11502	调出单直接发货［OK］
 //11503	调出单直接收货［OK］
 11504	调出单确认发货［OK］
 11505	调入单确认收货［OK］
 11506  调出单作废［OK］
 11507  调出单冲单［OK］

 11601	报损单保存［OK］
 11602	报损单保存并审核［OK］
 11603	报损单审核［OK］
 11604	报损单作废［OK］
 11605	报损单修正［OK］
 11606	报损单冲单［OK］

 11701	报溢单保存［OK］
 11702	报溢单保存并审核［OK］
 11703	报溢单审核［OK］
 11704	报溢单作废［OK］
 11705	报溢单修正［OK］
 11706	报溢单冲单［OK］

 11801	进货调价单保存［OK］
 11802	进货调价单保存并审核［OK］
 11803	进货调价单审核［OK］
 11804	进货调价单作废［OK］

 11901	出货调价单保存［OK］
 11902	出货调价单保存并审核［OK］
 11903	出货调价单审核［OK］
 11904	出货调价单作废［OK］

 12001	进货促销调价单保存［OK］
 12002	进货促销调价单保存并审核［OK］
 12003	进货促销调价单审核［OK］
 12004	进货促销调价单作废［OK］
 12005  查看促销价［OK］

 12101  实盘单保存［Pass］
 12102  实盘单保存并审核［OK］
 12103  实盘单审核［Pass］
 12104  帐盘单记账［OK］

 12201  客户结算单保存［OK］
 12202  客户结算单保存并审核［OK］
 12203  客户结算单审核［OK］
 12204  客户结算单作废［OK］
 12205  客户结算单冲单［OK］
 12206  查看客户结算单商品清单［OK］

 12301  供应商结算单保存［OK］
 12302  供应商结算单保存并审核［OK］
 12303  供应商结算单审核［OK］
 12304  供应商结算单作废［OK］
 12305  供应商结算单冲单［OK］
 12306  查看供应商结算单商品清单［OK］

 12401  收款单保存［OK］
 12402  收款单保存并审核［OK］
 12403  收款单审核［OK］
 12404  收款单作废［OK］
 12405  收款单冲单［OK］

 12501  付款单保存［OK］
 12502  付款单保存并审核［OK］
 12503  付款单审核［OK］
 12504  付款单作废［OK］
 12505  付款单冲单［OK］

 12601  拣货派车单保存 [OK]
 12602  拣货派车单作废 [OK]

 12701  代销结算单保存［OK］
 12702  代销结算单保存并审核［OK］
 12703  代销结算单审核［OK］
 12704  代销结算单作废［OK］
 12705  代销结算单冲单［OK］

 12801  保存提成结算单［OK］
 12802  保存并审核提成结算单［OK］
 12803  审核提成结算单［OK］
 12804  作废提成结算单［OK］
 12805  冲单提成结算单［OK］

 12901  新建销售任务单［OK］
 12902  修改销售任务单［OK］
 12903  删除销售任务单［OK］

 13001  新建回访记录［OK］
 13002  修改回访记录［OK］
 */

//页面加载检查用户是否在线
var printTpl = '0'; //默认打印模版
var power; //全局权限
var is_admin = false; //当前用户是否是超级管理员




$().ready(function () {
    var ticket = getUrlParam("ticket");
    var userRes = new restUserRepository();
    var restUser = userRes.getUser(ticket);
    if (restUser != null) {
        VERSION_MODE = restUser.business ? restUser.business : 'B2B'; //B2B or B2C
        //平台内跳转,自动登录(写登录cookie)
        if (ticket){
            restUser['ticket'] = ticket;
            saveLoginCookie(restUser);
            window.location.href = "console.html"; //为了去掉URL中ticket
            return;
        }

        //如果用户在线,设置全局按钮权限
        printTpl = fieldNull(restUser.print_tpl, '0');
        power = restUser.power;
        is_admin = parseInt(restUser.admin) == 1;
        $("#dataTimeInput").val(getDateTimeYYYYMMDD(restUser.logintime));
    }


    //搜索框自动回车
    $("#sorderid").keyup(function(event){
        if (event.keyCode == 13){
            if (typeof(refrush) == 'function') refrush();
        }
    });

    //按键屏蔽
    $('body').keydown(function(e){
        //屏蔽backspace回退页面
        PreventBSK();
        //屏蔽F5
        if (e.keyCode == 116){
            e.keyCode = 0;
            return false;
        }

    });

    //生产环境屏蔽鼠标右键
    if (ENV == 'P') {
        $('body').bind("contextmenu", function (e) {
            return false;
        });
    }
});




/**
 * 判断按钮权限
 * @param id
 * @returns {*}
 */
function checkPower(id){
    var ret;
    if (is_admin || power[id]){
        ret = true;
    } else {
        ret = false;
        $("#power-" + id).remove();
    }
    return ret;
}



/**
 * 绑定商品根节点
 * @param container
 */
function bindGoodsType(container) {
    if ($("#" + container).length) {
        //var goodsRes = new restGoodsRepository();
        //var data = goodsRes.findGoodsType();
        var GTR = new goodsTypeRepository();
        var data = GTR.readType();
        if (data && data.data) {
            data = data.data;
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>")
            }
        }
    }
}

/**
 * 打开弹窗
 * @param id

 function openPupup(id) {
    //在弹窗口时绑定
    // 商品搜索自动回车
    var es = document.getElementById("esSearch");
    if (es != null && es != 'undefined') {
        $(this).on("keydown", function (e) {
            if (e.keyCode == 13) {
                $("#searchButton").click();
                //searchStoreInGoods('pupupContent');  暂时不能这么加。因为每个页面调用的Search方法不一样
            }
        });

    }

    //$("#" + id).removeClass("pupupclose");
    $("#" + id).toggle();
    $("#overlay").show();
    //$("#" + id).addClass("pupupopen");
}*/

/**
 * 窗口下一步
 * @param id
 * @param preid
 * @param dataTrans
 * @param message
 */
function openPupupNext(id, preid, dataTrans, message) {
    if (dataTrans) {
        if (items != null && items.length > 0) {
            $("#" + id).toggle();
            $("#" + preid).toggle();
        } else {
            runnerAlert("操作提示", message);
        }
    } else {
        $("#" + id).toggle();
        $("#" + preid).toggle();
    }
    //$("#" + id).removeClass("pupupopen");
    //$("#" + id).addClass("pupupclose");
    //$("#" + preid).removeClass("pupupclose");
    //$("#" + preid).addClass("pupupopen");
}

/**
 * 窗口上一步
 * @param preid
 * @param id
 */
function preSetup(preid, id) {
    $("#" + preid).toggle();
    $("#" + id).toggle();
}

/**
 * 关闭弹窗
 * @param id

 function closePupup(id) {
    //$("#" + id).removeClass("pupupopen");
    //$("#" + id).addClass("pupupclose");
    $("#" + id).hide();
    $("#overlay").hide();
}


 function inputFocus() {
    $('input').each(function () { //开始遍历
        var $val = $(this).val();
        $(this).focus(function () {
            if ($(this).val() == $val) {
                $(this).val("");
            }
            //$(this).css({"border": "#FFFDE1"});
        });
        $(this).blur(function () {
            if ($(this).val().length == 0) {
                $(this).val("")
            }
            //$(this).css({"background-color": "#FFFFFF"});
        })
    });
}
 */


/**
 * 绑定商品品牌列表
 */
function bindGoodsBrand(container) {
    if ($("#" + container).length) {
        var goodsRes = new restGoodsRepository();
        var data = goodsRes.findGoodsBrand();
        if (data != null) {
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].id + "' >" + data[i].name + "</option>");
            }
        }
    }
}


/**
 * 获取所有结算方式
 */
function getAllConfigBalance() {
    var ret = [];
    var configRes = new configRepository();
    var data = configRes.query('CONFIG_BALANCE_READ');
    if (data != null) {
        for (var i = data.length - 1; i >= 0; i--) {
            ret.push({
                'id': data[i].value,
                'text': data[i].memo
            });
        }
    }
    return ret;
}


/**
 * 绑定结算方式列表
 */
function bindConfigBalance(container) {
    if ($("#" + container).length) {
        var configRes = new configRepository();
        var data = configRes.query('CONFIG_BALANCE_READ');
        if (data != null) {
            $("#" + container).html("");
            //for (var i = 0; i < data.length; i++) {
            for (var i = data.length - 1; i >= 0; i--) {
                $("#" + container).append("<option value='" + data[i].value + "' >" + data[i].memo + "</option>");
            }
        }
    }
}

/**
 * 绑定供应商列表
 */
function bindSupplier(container) {
    if ($("#" + container).length) {
        var supplierRes = new supplierRepository();
        var data = supplierRes.findAll();
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].scid + "' discount='" + data[i].discount + "' >" + data[i].scname + "</option>");
            }
        }
    }
}

/**
 * 绑定供应商仓库列表
 * @param id
 * @param container

 function bindSupplierStore(id, container) {
    if ($("#" + container).length) {
        var storeRes = new restStoreRepository();
        var data = storeRes.findByCid(id);
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
        }
    }
} */

/**
 * 绑定本公司角色列表
 */
function bindRole(container) {
    if ($("#" + container).length) {
        var roleRes = new restRoleRepository();
        var data = roleRes.findAll();
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
        }
    }
}


/**
 * 绑定本公司全部的仓库(select)
 * @param container
 */
function bindAllStore(container) {
    var storeRes = new restStoreRepository();
    var params = {'status': 1};
    var data = storeRes.findAllStores(1, 50, params);
    if (data != null && data.data != null) {
        data = data.data;
        $("#" + container).html("");
        for (var i = 0; i < data.length; i++) {
            $("#" + container).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
        }
    }
}


var data_MyStores;
/**
 * 绑定本公司有权限的仓库(select)
 * @param container
 */
function bindSelfStore(container, idx) {
    if ($("#" + container).length) {
        if (!data_MyStores){
            var storeRes = new restStoreRepository();
            data_MyStores = storeRes.findMine(1);
        }
        var data = data_MyStores;
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].id + "'" + (data[i].id == idx ? ' selected ' : '') + ">" + data[i].name + "</option>");
            }
        }
    }
}

/**
 * 绑定自己仓库(checkbox)
 * @param container
 */
function bindSelfStoreCheckBox(container) {
    if ($("#" + container).length) {
        if (!data_MyStores){
            var storeRes = new restStoreRepository();
            data_MyStores = storeRes.findMine(1);
        }
        var data = data_MyStores;
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                var checkbox = ' <label><input type="checkbox" name="' + container + '_' + data[i].id + '" value="' + data[i].id + '" /> ' + data[i].name + '</label>';
                $("#" + container).append(checkbox);
            }
        }
    }
}

/**
 * 绑定公司所有用户(select 未用到)
 * @param container
 */
function bindSelfUser(container, idx) {
    if ($("#" + container).length) {
        var userRes = new restUserRepository();
        var data = userRes.findAll(1, 50, null, null);
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].id + "'" + (data[i].id == idx ? ' selected ' : '') + ">" + data[i].name + "</option>");
            }
        }
    }
}


/*
 * 绑定客户列表(select 未用到)
 * @param container
 */
function bindCustom(container) {
    if ($("#" + container).length) {
        var customRes = new customRepository();
        var data = customRes.findAll(1, 50, false);
        if (data != null && data.data != null) {
            data = data.data;
            $("#" + container).html("");
            //$("#" + container).append("<option value='' >- 请选择客户 -</option>");
            for (var i = 0; i < data.length; i++) {
                $("#" + container).append("<option value='" + data[i].ccid + "' >" + data[i].ccname + "</option>");
            }
        }
    }
}



/**
 * 绑定经营方式下拉列表框
 * @param containerId
 */
function bindBusinessPracticeSelect(container) {
    if ($("#" + container).length) {
        $("#" + container).html('');
        for (var i = 0; i < showBusinessPracticeList.length; i++) {
            $("#" + container).append("<option value='" + showBusinessPracticeList[i].id + "'>" + showBusinessPracticeList[i].text + "</option>");
        }
    }
}

/**
 * 绑定紧急度下拉列表框
 * @param containerId
 */
function bindOrderRankSelect(container, idx) {
    if ($("#" + container).length) {
        $("#" + container).html('');
        for (var i = 0; i < showOrderRankList.length; i++) {
            html_selected = '';
            if (idx == i) html_selected = ' selected="selected" ';
            $("#" + container).append("<option value='" + showOrderRankList[i].id + "'" + html_selected + ">" + showOrderRankList[i].text + "</option>");
        }
    }
}

/**
 * 绑定状态下拉列表框
 * @param containerId
 */
function bindInStatusSelect(container, showIds) {
    if ($("#" + container).length) {
        for (var i = 0; i < showInStatusList.length; i++) {
            var curId = "," + showInStatusList[i].id + ",";
            if (showIds.indexOf(curId) >= 0) {
                $("#" + container).append("<option value='" + showInStatusList[i].id + "'>" + showInStatusList[i].text + "</option>");
            }
        }
    }
}


/**
 * 绑定状态下拉列表框
 * @param containerId
 */
function bindOutStatusSelect(container, showIds) {
    if ($("#" + container).length) {
        for (var i = 0; i < showOutStatusList.length; i++) {
            var curId = "," + showOutStatusList[i].id + ",";
            if (showIds.indexOf(curId) >= 0) {
                $("#" + container).append("<option value='" + showOutStatusList[i].id + "'>" + showOutStatusList[i].text + "</option>");
            }
        }
    }
}

var bindAutoComplete = {
    onChane: function (containerId,isInit) {
        //绑定自动输入框
        bindThisPageAutoComplete(containerId,isInit);
        //console.log(containerId);
    }
};



/**
 * 防止重复提交
 */
function disableBtn(btn) {
    clickBtn = null;
    var class_name = $(btn).attr('disabled', 'disabled').attr('class');
    $(btn).attr('class', 'btn btn-default');
    setTimeout(function () {
        $(btn).attr("disabled", false).attr('class', class_name);
    }, 2000);
}

/**
 * 计算箱数(读取时)
 * @param selectGoods
 */
function computeVolume(selectGoods){
    var ret = (parseInt(selectGoods.total) / parseInt(selectGoods.gspec)).toFixed(4);
    return ret;
}

/**
 * 计算箱单价(读取时)
 * @param selectGoods
 */
function computeVolumePrice(selectGoods){
    var ret = (selectGoods.amount_price * selectGoods.gspec / selectGoods.total).toFixed(2);
    return ret;
}

/**
 * 单据商品金额数量联动计算
 * @param index
 * @param source 手工修改的字段 1:单价 2:数量 3:箱数 4:箱单价
 */
function priceOnChange(index, source) {
    var singleP = parseFloat($("#rtprice_" + index).val()); //含税单价
    var num     = parseInt($("#rttotal_" + index).val());   //数量
    var pakgeNum= parseFloat($("#rtvolume_" + index).val()); //箱数
    var pakgeP  = parseFloat($("#rtvolume_price_" + index).val()); //箱单价
    var spec = parseInt($("#rtspec_" + index).html()); //规格

    var res; //含税总金额
    if (source == 1){
        //修改单价
        pakgeP = (singleP * spec).toFixed(2);
        res = singleP * num;
        //pakgeP = pakgeNum ? (res / pakgeNum).toFixed(2) : 0;
        $("#rtvolume_price_" + index).val(isNaN(pakgeP) ? 0 : pakgeP);//更新箱单价
    } else if (source == 2) {
        //修改的数量
        pakgeNum = (num / spec).toFixed(4); //箱数需要保留4位小数,否则箱单价误差较大
        $("#rtvolume_" + index).val(isNaN(pakgeNum) ? 0 : pakgeNum); //更新箱数
        res = singleP * num;
        //pakgeP = pakgeNum ? (res / pakgeNum).toFixed(2) : 0;
        //$("#rtvolume_price_" + index).val(isNaN(pakgeP) ? 0 : pakgeP);//更新箱单价
    } else if (source == 3) {
        //修改的箱数
        num = parseInt(pakgeNum * spec);
        $("#rttotal_" + index).val(isNaN(num) ? 0 : num); //更新数量
        /*if (pakgeP && !singleP) {
         res = pakgeP * pakgeNum;
         singleP = num ? (res / num).toFixed(2) : 0;
         $("#rtprice_" + index).val(isNaN(singleP) ? 0 : singleP);//更新单价
         } else if (singleP && !pakgeP){
         res = singleP * num;
         pakgeP = pakgeNum ? (res / pakgeNum).toFixed(2) : 0;
         $("#rtvolume_price_" + index).val(isNaN(pakgeP) ? 0 : pakgeP);//更新箱单价
         } else {
         res = pakgeP * pakgeNum;
         }*/
        //console.log(pakgeP, pakgeNum);
        res = pakgeP * pakgeNum;
        if (isNaN(res)){
            res = singleP * num;
        }
    } else if (source == 4) {
        //修改的箱单价
        singleP = spec ? (pakgeP / spec).toFixed(2) : 0;
        $("#rtprice_" + index).val(isNaN(singleP) ? 0 : singleP);//更新单价
        res = pakgeP * pakgeNum;
    }

    var tax_rate = parseFloat($("#rttax_rate_" + index).val()) / 100; //税率
    var tax_price = ((res * tax_rate) / (1 + tax_rate)).toFixed(2);  //税额算法
    var outtax_price = (res - tax_price).toFixed(2);//去税金额

    /**
     log={
    '含税单价':singleP,
    '数量':num,
    '含税金额':res,
    '税率':tax_rate,
    '税额':((res * tax_rate) / (1 + tax_rate)),
    '去税金额':outtax_price,
    '------------------':'---------------------',
    '(含税金额 * 税率)/(1 + 税率)':'(' + res + '*' +  tax_rate + ')/' + (1+tax_rate),
    '含税金额－税额':res + '-' +  outtax_price,
    };
     //console.log(log);
     */

    $("#rttax_price_" + index).val(isNaN(tax_price) ? 0 : tax_price);//税额
    $("#rtouttax_price_" + index).val(isNaN(outtax_price) ? 0 : outtax_price);//去税金额

    if (isNaN(res)) res = '0';
    else res = res.toFixed(2); //四舍五入到分
    $("#rtamount_price_" + index).val(res); //含税金额
    formOrderTotal();// 统计金额
}

/**
 * 分析并处理单号
 * @param billNo
 * @param flag
 */
function simpleBillNo(billNo, flag) {
    return flag + billNo;
}



/**
 * 表单统计栏
 */
function formOrderTotal() {
    if (typeof(orderTotalItems) != 'undefined') {
        $.each(orderTotalItems, function (i, row) {
            var total = 0;
            $("[name='" + row["in"] + "']").each(function () {
                var tmp = parseFloat($(this).val());
                tmp = isNaN(tmp) ? 0 : tmp;
                total += tmp;
            });

            if (row['out'] != 'sumTotal') {
                total = formatAmountWithComma(total);
            }
            $("#" + row["out"]).text(total);
        });
        if ($("#discountPrice").length){
            var sumAmountPrice = parseFloat($('#sumAmountPrice').text().replaceAll(', ', ''));
            var discountAmount = parseFloat($('#discountAmount').text().replaceAll(', ', ''));
            var discountPrice = sumAmountPrice - discountAmount;
            discountPrice = discountPrice < 0 ? '0.00' : num2price(sumAmountPrice - discountAmount);
            $('#discountPrice').text(formatAmountWithComma(discountPrice));
        }
    }
}

/**
 * 金额加逗号
 * @param amount
 * @returns {string|*}
 */
function formatAmountWithComma(amount){
    amount = num2price(amount);
    var tmp = parseFloat(amount).toLocaleString().split('.');
    amount = tmp[0] + '.' + (tmp[1] ? (tmp[1].length == 1 ? tmp[1]+'0' : tmp[1]) : '00');
    amount = amount.replaceAll(',', ', ');
    return amount;
}



/**
 * Tooltip提示
 * @param selector
 * @param target
 * @param data
 */
function addTooltip(selector, target, data) {
    $(selector).mouseover(function () {
        var offset = $(this).offset();
        $(target + " .inner").empty().append($(this).attr(data));
        $(target).css({"left": offset.left + 15, "top": offset.top - 5}).fadeIn(200)
    });

    $(selector).mouseout(function () {
        $(target).fadeOut(0);
    });

}


/**
 * 提供通用的分页功能支持
 */
function pageSplitCompent(url, currentPage, pageNum, count) {
    //获取参数
    var arg = arguments;
    var sUrl = "";
    var scurrentPage = 1;
    var spageNum = 1;
    var scount = 1;
    var param = "";

    $.each(arg, function (key, value) {
        if (key == 0) {
            sUrl = value;
        } else if (key == 1) {
            scurrentPage = value;
        } else if (key == 2) {
            spageNum = value;
        } else if (key == 3) {
            scount = value;
        } else {
            var data = value;
            if (data != null) {
                $.each(data, function (k1, v1) {
                    param += (k1 + "=" + v1 + "&");
                });
            }
        }
    });

    var isShowPre = true;
    var isShowNext = true;
    currentPage = parseInt(currentPage);
    var prePage = currentPage;
    var nextPage = 0;
    var countPage = 0;
    if (count % pageNum == 0) {
        countPage = count / pageNum;
    } else {
        countPage = parseInt(count / pageNum) + 1;
    }
    if (currentPage <= 1) {
        //已经是第一页了
        prePage = 1;
        isShowPre = false;
    } else {
        prePage = currentPage - 1;
    }

    if (countPage >= (currentPage + 1)) {
        nextPage = currentPage + 1;
    } else {
        nextPage = currentPage;
        isShowNext = false;
    }
    var firstPageUrl = "";
    var prePageUrl = "";
    var nextPageUrl = "";
    var endPageUrl = "";
    //输同不带搜索参数的

    firstPageUrl = url + "?page=1&" + param;
    prePageUrl = url + "?page=" + prePage + "&" + param;
    nextPageUrl = url + "?page=" + nextPage + "&" + param;
    endPageUrl = url + "?page=" + countPage + "&" + param;

    var pageButtom = "<span class=\"pos\">[总计: <span id=\"countNumer\">" + count + "</span> 条]</span>";
    pageButtom += "<span class=\"pos\">第 <input onkeydown='jumpPage(this, " + countPage + ")' class='form-control input-sm' value='" + currentPage + "' /> 页 / 共 " + countPage + " 页</span>";
    if (typeof(refrush) != 'function'){
        pageButtom += "<a href='" + firstPageUrl + "'>首&nbsp;&nbsp;&nbsp;页</a>";
        pageButtom += "<a href='" + prePageUrl + "'>上一页</a>";
        pageButtom += "<a href='" + nextPageUrl + "'>下一页</a>";
        pageButtom += "<a href='" + endPageUrl + "'>末&nbsp;&nbsp;&nbsp;页</a>";
    } else {
        pageButtom += "<a href='javascript:refrush(1)'>首&nbsp;&nbsp;&nbsp;页</a>";
        pageButtom += "<a href='javascript:refrush(" + prePage + ")'>上一页</a>";
        pageButtom += "<a href='javascript:refrush(" + nextPage + ")'>下一页</a>";
        pageButtom += "<a href='javascript:refrush(" + countPage + ")'>末&nbsp;&nbsp;&nbsp;页</a>";
    }

    $("#split").html(pageButtom);
}

/**
 * 直接跳转相应页数
 * @param input
 * @param countPage 总页数
 */
function jumpPage(input, countPage){
    if (window.event.keyCode == 13){
        var page = parseInt($(input).val());
        if (page <= 0) page = 1;
        if (page > countPage) page = countPage;
        if (typeof(refrush) != 'function'){
            runnerAlert('操作提示', '该页面暂不支持页数跳转');
        } else {
            refrush(page);
        }
    }

}

var sort_name; //排序字段名
var sort_updown; //排序方向
/**
 * 列表按字段排序
 * 例如:<th><a href="javascript:" name="amount" sort="">销售额</a></th>
 */
function bindSortByField(){
    $('thead th').each(function(){
        var a = $(this).find('a');
        if (a.html()){
            a.click(function(){
                //清空其他列箭头
                $('thead th').each(function(){
                    var aa = $(this).find('a');
                    if (aa.html()){
                        aa.html(aa.html().split(' ')[0]);
                    }
                });
                //设置当前列箭头和排序属性
                if (a.attr('sort') == 'desc'){
                    a.attr('sort', 'asc').html(a.html().split(' ')[0] + ' ▲');
                } else {
                    a.attr('sort', 'desc').html(a.html().split(' ')[0] + ' ▼');
                }
                //按当前排序属性去取数据
                sort_name = $(this).attr('name');
                sort_updown = $(this).attr('sort');
                refrush(1);
            });
        }
    });
}




/**
 * 标准表格hover
 *
 */
function tableHover() {
    $(".table-body tbody tr:odd").addClass("strip");
    $(".table-body tbody tr").hover(
        function () {
            $(this).addClass("hover");
        },
        function () {
            $(this).removeClass("hover");
        }
    ).click(function(){
        $(".table-body tbody tr").removeClass("hover-click");
        $(this).addClass("hover-click");
    });

    mouseRight_list(); //鼠标右键操作
}

/**
 * fixtable表格hover
 *

 function fixTableHover() {
    $(".fixedTable tbody tr").hover(
        function () {
            var pos = $(this).index() + 1;
            $(".fixedColumnsFst tbody tr").eq(pos).addClass("hover");
            $(".fixedColumnsScd tbody tr").eq(pos).addClass("hover");
            $(".fixedContainer tbody tr").eq(pos).addClass("hover");
        },
        function () {
            var pos = $(this).index() + 1;
            $(".fixedColumnsFst tbody tr").eq(pos).removeClass("hover");
            $(".fixedColumnsScd tbody tr").eq(pos).removeClass("hover");
            $(".fixedContainer tbody tr").eq(pos).removeClass("hover");
        }
    );
}
 */


/**
 * 打印
 */
function printBill(container) {
    $("#" + container).jqprint();
}

/**
 * 帮助引导
 */
function startHelpIntro() {
    introJs().start();
}

/**
 * 在父级窗口新加一个Frame
 * @param name
 * @param url
 */
function openParentForFrame(name, url, id) {
    window.parent.openFrame(name, url, id);
}

/**
 * 关闭父级窗口中的一个Frame
 */
function closeParentForFrame() {
    var id = getUrlParam("iframeid");
    var name = getUrlParam("iframename");
    window.parent.closeFrame(parseInt(id), name);
}


/**
 * 刷新其它Iframe页面
 * @param id
 * @param type
 */
function noticeFrame(id, type, page) {
    type = type ? type : 'reload';
    page = page ? page : 1;
    var wantNotice = "mainFrame" + id;
    var frames = window.parent.frames;
    if (frames != null) {
        for (var i = 0; i < frames.length; i++) {
            if (wantNotice == frames[i].name) {
                if (type == 'reload') frames[i].location.reload();
                else frames[i].window.refrush(page);
            }
        }
    }
}


/* -------------------------------------------------- 弹窗处理 BEGIN ------------------------------------------------- */

/**
 * 弹出通用消息框
 * @param title 标题
 * @param cust 内容
 * @param ok_fun 点击OK时要执行的函数
 * @param need_cancelBtn 是否需要取消按钮
 */
function runnerConfiremCommon(title, cust, ok_fun, need_cancelBtn, print_setting) {
    $("#confireInfoLayer").show();
    var setting = {
        move: true,
        width: "auto",
        height: "auto",
        title: title,
        content: cust,
        okText: "确定",
        cancelText: (need_cancelBtn ? "取消" : false),
        ok: function () {
            if (typeof(ok_fun) == 'function') ok_fun();
            $("#confireInfoLayer").hide();
            $("#confrom").dialog("close");
            $("body").append("<div id='confrom' class='confrom'></div>");
        }, cancel: function () {
            $("#confireInfoLayer").hide();
            $("#confrom").dialog("close");
            $("body").append("<div id='confrom' class='confrom'></div>");
        },
        buttons: []
    };
    //打印按钮
    if (print_setting) {
        var print = {
            'name': '打印',
            'callback': function () {
                //console.log(print_setting);
                previewPrint(print_setting.tid, print_setting.billId);
                $(this).dialog('close');
            }
        };
        setting.buttons.push(print);
    }
    $("#confrom").dialog(setting).dialog("open");
    $(document.activeElement).blur(); //屏蔽焦点
}

/**
 * 弹窗(只提示,不做其他处理,类似alert)
 * @param title
 * @param cust
 */
function runnerAlert(title, cust) {
    runnerConfiremCommon(title, cust);
}


/**
 * 弹窗(确定后关闭当前页面)
 * @param title
 * @param cust
 */
function runnerConfirem(title, cust, print_setting) {
    runnerConfiremCommon(title, cust, closeParentForFrame, null, print_setting);
}



/**
 * 弹框按钮执行参数(用于:弹窗(页面跳转))
 */
var dialogParams = {};
function dialogLocation(){
    var isParent = dialogParams['isParent'];
    var url = dialogParams['url'];
    if (isParent) {
        window.parent.location.href = url;
    } else {
        window.location.href = url;
    }
}

/**
 * 弹窗(页面跳转)
 * @param title
 * @param cust
 * @param isParent
 * @param url
 */
function runnerConfiremUrl(title, cust, isParent, url, print_setting) {
    dialogParams['isParent'] = isParent;
    dialogParams['url'] = url;
    runnerConfiremCommon(title, cust, dialogLocation, null, print_setting);
}

/* -------------------------------------------------- 弹窗处理 END ------------------------------------------------- */





/**
 * 数值上色(正红负绿)
 *
 * @param num 数值
 * @param pow 权重系数(>=1,默认为1)
 * @returns {string}
 */
function setColor(num, pow){
    pow = pow ? pow : 1;
    var color = '';
    if      (num >= pow * 100)  { color = '#22AA22'; } //大量溢出
    else if (num >= pow * 10)   { color = '#22AA22'; } //溢出
    else if (num >= pow * 1)    { color = '#0D0'; } //少量溢出
    else if (num <= pow * -1)   { color = '#D00'; } //少量报损
    else if (num <= pow * -10)  { color = '#CF4242'; } //报损
    else if (num <= pow * -100) { color = '#CF4242'; } //大量报损
    else                        { color = ''; }     //正常范围(当pow=1时,只有0才算正常)
    return '<span style="color:' + color + ';">' + num + '</span>';
}


/**
 * 格式化列表中金额列(统一把金额列加上￥并且右对齐)
 */
function formatTDOfRMB(){
    /*
     $("tbody td").each(function(){
     var txt = $(this).html();
     if (!isNaN(txt) && txt.indexOf('.') > 0){
     $(this).html('￥ ' + txt).attr('class', 'td_right');
     }
     });
     */
}




function autoCheckBox(){
    // 初始化
    $("input:checkbox:checked").each(function(i){
        $(this).parent().addClass('selected');
    });
    // 事件绑定
    $("input:checkbox").each(function(i){
        $(this).on('click',function(){
            if($(this).is(':checked')){
                $(this).parent().addClass('selected');
            }else{
                $(this).parent().removeClass('selected');
            }
        })
    })
}

/**
 * 中文状态=>图章
 * @param statusText
 */
function stampStatus(statusText){
    //console.log(statusText);
    switch (statusText){
        case '已审核':
            $("#stamp").addClass("stamp-checked").show();
            break;
        case '已结算':
            $("#stamp").addClass("stamp-close").show();
            break;
        case '已作废':
            $("#stamp").addClass("stamp-cancel").show();
            break;
        case '已冲单':
            $("#stamp").addClass("stamp-repaired").show();
            break;
        case '冲单':
            $("#stamp").addClass("stamp-repair").show();
            break;
        case '已修正':
            $("#stamp").addClass("stamp-fixed").show();
            break;
        case '修正单':
            $("#stamp").addClass("stamp-fix").show();
            break;
    }
}



/* --------------------------------------------- 员工/供应商/客户/车辆 自动检索框 BEGIN --------------------------------------------- */

/**
 * 绑定自动输入框(页面加载时调用该函数)
 * @param id        HTML ID about text input
 * @param type      [ user | supplier | customer | vip | car | goods | brand ]
 * @param only      [ true(default) | false ] 是否只绑定一次
 * @param callback  回调函数
 */
var initAutoCompleteCommon = {};
function bindAutoCompleteCommon(id, type, only, callback) {
    only = only == null ? true : only; //default true
    var need_refrush = only ? 1 : 0; //如果允许绑定多次,说明是在列表页中编辑,填充后不应该刷新页面
    //console.log(initAutoCompleteCommon[id], id);
    if (!initAutoCompleteCommon[id] && id){
        $("#" + id).dblclick(function(){return false;});
        $("#" + id).runnerAutoCompleteAndSearch(onsearchCommon, type, need_refrush, callback);
        $("#" + id).change(function(){
            if ($.trim($(this).val()) == '') {
                $(this).val('').next('input').val('').change();
            }
        });
        autoCompletePlus(id, type, need_refrush, callback);
        if (only) initAutoCompleteCommon[id] = true;
    }
}

var tempData;
var onsearchCommon = function (value, obj, div, type, need_refrush, callback) {
    var list = [];
    var params = {
        'search':value
    };
    var res;
    var field_type;
    var field_contactor;
    var field_typename;
    var field_ton;
    var field_name = 'name';
    var field_gname;
    var field_gcode;
    var field_gbarcode;
    if (type == 'user'){
        var userRes = new restUserRepository();
        //res = userRes.findAllByField(1, autoCompletePageNum, params);
        res = userRes.findAllNoPower(1, autoCompletePageNum, params);
        field_name = 'name';
    } else if (type == 'supplier'){
        var supplierRes = new supplierRepository();
        res = supplierRes.findAllByField(1, autoCompletePageNum, params);
        field_name = 'scname';
    } else if (type == 'customer'){
        var customRes = new customRepository();
        res = customRes.findAllByField(1, autoCompletePageNum, params);
        field_name = 'ccname';
        field_typename = 'cctypename';
    } else if (type == 'vip'){
        var vipRes = new customRepository();
        res = vipRes.findAllVIPByField(1, autoCompletePageNum, params);
        field_name = 'ccname';
        field_typename = 'cctypename';
        field_type = 'cctype'; //特有
        field_contactor = 'contactor'; //特有
    } else if (type == 'car'){
        var carRes = new restCarRepository();
        res = carRes.findAll(1, autoCompletePageNum, params);
        field_name = 'license';
        field_ton = 'ton';  //特有
    } else if (type == 'goods'){
        var goodsRes = new restGoodsRepository();
        res = goodsRes.findCompanyGoodsByField(1, autoCompletePageNum, params);
        field_gname = 'gname';  //特有
        field_gcode = 'gcode';  //特有
        field_gbarcode = 'gbarcode';  //特有
    } else if (type == 'brand'){
        var goodsRes = new restGoodsRepository();
        res = goodsRes.findGoodsBrandByField(1, autoCompletePageNum, params);
    }
    if (res) {
        if (res != null && res.data != null && res.data.length > 0) {
            tempData = res.data;
            var callback_name = typeof(callback)=='function' ? callback.name : '';
            for (var i = 0; i < tempData.length; i++) {
                list[i] = '<li class="td-tr" onclick="selectLiItemCommon(' + i + ', \'' + obj.attr('id') + '\', \'' + type + '\', ' + need_refrush + ', \'' + callback_name + '\')">';
                if (field_typename){
                    if (field_type){
                        list[i] += "<span class='td item-cate'>[" + id2text(VIPList, tempData[i][field_type]) + "] </span>";
                        //list[i] += "<span class='td item-cate'>(" + tempData[i][field_contactor] + ") </span>";
                    } else {
                        list[i] += "<span class='td item-cate'>[" + tempData[i][field_typename] + "] </span>";
                    }
                    list[i] += "<span class='td item-single'>" + tempData[i][field_name] + " </span>";
                } else if (field_ton){
                    list[i] += "<span class='td item-car'>" + tempData[i][field_name] + " </span>";
                    list[i] += "<span class='td item-cate'>[" + tempData[i][field_ton] + "吨] </span>";
                } else if (field_gname){
                    list[i] += "<span class='td item-code'>[" + tempData[i][field_gcode] + "] </span>";
                    list[i] += "<span class='td item-code'>[" + tempData[i][field_gbarcode] + "] </span>";
                    list[i] += "<span class='td item-gname'>" + tempData[i][field_gname] + " </span>";
                } else {
                    list[i] += "<span class='td item-single'>" + tempData[i][field_name] + " </span>";
                }
                list[i] += "</li>";
            }
        }
    }
    return list;
};

/**
 * 选择UL LI ITEM 并填充数据
 */
var tempIndex;
function selectLiItemCommon(idx, id, type, need_refrush, callback_name) {
    tempIndex = idx;
    if (tempData != null && tempData.length > 0) {
        var k_name = '';
        var k_id = '';
        var k_belong = '';
        if (type == 'user'){
            k_name = tempData[tempIndex]['name'] + '(' + tempData[tempIndex]['phone'] + ')';
            k_id = tempData[tempIndex]['id'];
            k_belong = tempData[tempIndex]['belong'] == 1 ? '自有' : '外借';
        } else if (type == 'supplier'){
            k_name = tempData[tempIndex]['scname'];
            k_id = tempData[tempIndex]['scid'];
        } else if (type == 'customer' || type == 'vip'){
            k_name = tempData[tempIndex]['ccname'];
            k_id = tempData[tempIndex]['ccid'];
        } else if (type == 'car'){
            k_name = tempData[tempIndex]['license'] + ' [' + tempData[tempIndex]['ton'] + '吨]';
            k_id = tempData[tempIndex]['id'];
        } else if (type == 'goods'){
            k_name = tempData[tempIndex]['gname'];
            k_id = tempData[tempIndex]['gid'];
        } else {
            k_name = tempData[tempIndex]['name'];
            k_id = tempData[tempIndex]['id'];
        }
        var obj_name = $("#" + id);
        obj_name.val(k_name).next('input').val(k_id).change();
        if (obj_name.length){
            obj_name.siblings("div[name='belong']").text(k_belong);
        }
        if (need_refrush && typeof(refrush)=='function') {
            refrush();
            //console.log(2);
        }
        if (callback_name){
            var code = callback_name + '(tempData[tempIndex])';
            try {eval(code);} catch (e){}
        }
    }
}


/**
 * 自动提示输入框:支持不通过选择提示项进行填充
 * @param id 关键字文本的元素ID
 * @param type [ user | supplier | customer | car | goods ]
 * @param need_refrush true(default) OR false
 * @param callback
 */
function autoCompletePlus(id, type, need_refrush, callback){
    /* 注意:实际情况下此事件比selectLiItemCommon要早执行!!! */
    $('#' + id).change(function(){
        var ret = '';
        var text = $.trim($(this).val());
        if (text != ''){
            var rep;
            if (type == 'user'){
                rep = new restUserRepository();
                text = text.split('(')[0]; //兼容直接粘贴带电话的名字
            } else if (type == 'supplier'){
                rep = new supplierRepository();
            } else if (type == 'customer' || type == 'vip'){
                rep = new customRepository();
            } else if (type == 'car'){
                rep = new restCarRepository();
                text = $.trim(text.split('[')[0]); //兼容直接粘贴带吨位的车牌
            } else if (type == 'goods'){
                rep = new restGoodsRepository();
            } else if (type == 'brand'){
                rep = new restGoodsRepository();
            }
            var res = rep.queryByName(text, type);
            var id = '';
            if (res && res.data && res.data.result){
                ret = res.data.result;
                if (type == 'user'){
                    id = ret.id;
                    $(this).val(text + '(' + ret.phone + ')');
                } else if (type == 'supplier'){
                    id = ret.scid;
                } else if (type == 'customer' || type == 'vip'){
                    id = ret.ccid;
                } else if (type == 'car'){
                    id = ret.id;
                    $(this).val(text + ' [' + ret.ton + '吨]');
                } else if (type == 'goods'){
                    id = ret.gid;
                } else {
                    id = ret.id;
                }
            }
            $(this).next('input').val(id).change();
            need_refrush = need_refrush == null ? true : need_refrush;
            if (need_refrush && typeof(refrush)=='function') {
                refrush();
            }
        }
        /*if (need_refrush && typeof(refrush)=='function') {
         refrush();
         }*/
        if (typeof(callback)=='function') {
            callback(ret);
        }
    });
}

/**
 * 自动输入框通用验证(员工/供应商/客户/车辆/商品) HTML ID about input ID
 * @param userId
 * @param supplierId
 * @param customerId
 * @param carId
 * @param goodsId
 * @returns {boolean}
 */
function checkAutoComplete(userId, supplierId, customerId, carId, goodsId){
    var ret = true;

    var user = $("#"+userId);
    if (userId && user.length){
        var buid = user.val();
        if (!buid){
            var text = $.trim(user.prev().val());
            runnerAlert('操作提示', '员工 ' + text + ' 不存在');
            return false;
        }
    }


    var supplier = $("#"+supplierId);
    if (supplierId && supplier.length){
        var out_cid = supplier.val();
        if (!out_cid){
            var text = $.trim(supplier.prev().val());
            runnerAlert('操作提示', '供应商 ' + text + ' 不存在');
            return false;
        }
    }


    var customer = $("#"+customerId);
    if (customerId && customer.length){
        var out_cid = customer.val();
        if (!out_cid){
            var text = $.trim(customer.prev().val());
            runnerAlert('操作提示', '客户 ' + text + ' 不存在');
            return false;
        }
    }

    var car = $("#"+carId);
    if (carId && car.length){
        var car_id = car.val();
        if (!car_id){
            var text = $.trim(car.prev().val());
            runnerAlert('操作提示', '车辆 ' + text + ' 不存在');
            return false;
        }
    }

    var goods = $("#"+goodsId);
    if (goodsId && goods.length){
        var goods_id = goods.val();
        if (!goods_id){
            var text = $.trim(goods.prev().val());
            runnerAlert('操作提示', '商品 ' + text + ' 不存在');
            return false;
        }
    }

    return ret;

}

/* --------------------------------------------- 员工/供应商/客户/车辆/商品 自动检索框 END --------------------------------------------- */

/**
 * 把电话添加到姓名后面
 * @param name
 * @param phone
 * @returns {string}
 */
function addPhone2Name(name, phone){
    var ret;
    if (fieldNull(name) == ''){
        ret = '';
    } else {
        ret = fieldNull(name) + '(' + fieldNull(phone) + ')';
    }
    return ret;
}

/**
 * 数量转换箱数
 * @param total 数量
 * @param spec 规格
 */
function total2boxtotal(total, spec){
    return num2price(num2total(total) / fieldNull(spec, 1));
}

/**
 * 收货地址格式化(逗号变空格, 去掉null)
 * @param receipt
 * @returns {string|*}
 */
function formatReceipt(receipt){
    return $.trim(fieldNull(receipt).replaceAll(',', ' ').replaceAll('null ', ''));
}

/**
 * 打印预览
 * @param tid 单据类型ID(参照页面菜单ID)
 * @param billId 单据ID
 */
function previewPrint(tid, billId){
    var page = "/mainframe/print/" + printTpl + ".html?tid=" + tid + "&id=" + billId;
    location.href = page;
    //var title = '打印' + billId;
    //var pageId = '9999' + billId;
    //openParentForFrame(title, tpl, pageId);
    //console.log(page);
}


/**
 * 列表页鼠标右键操作
 */
function mouseRight_list(){
    if (typeof($("tbody tr").smartMenu) == 'function') {

        var menuData = [
            [{
                text: "打开",
                func: function () {
                    var fun = $(this).attr('ondblclick');
                    if (fun) {
                        eval(fun);
                    } else {
                        runnerAlert('操作提示', '不支持打开操作');
                    }
                }
            }]
        ];
        if ($('#btn-create').length) {
            menuData[0].push(
                {
                    text: "新建",
                    func: function () {
                        $('#btn-create').click();
                    }
                }
            );
        }
        if (typeof(refrush) == 'function') {
            menuData[0].push(
                {
                    text: "刷新",
                    func: function () {
                        refrush();
                    }
                }
            );
        }
        /*if (1){
         menuData[0].push(
         {
         text: "复制文字",
         func: function (){
         alert('请使用 Ctrl + C 进行复制');
         }
         }
         );
         }*/

        $("tbody tr").smartMenu(menuData, {
            name: "list"
        });
    }
}


/**
 * 展开单据某字段
 * @param a TH标签中的A标签
 *      例如:<th>商品名称<a href="javascript:" onclick="switchWidth(this);">展开</a></th>

 function switchWidth(a){
    var th = $(a).parent();
    var close = th.attr('close');

    var idx = th.index();
    var td = $('table td').eq(idx);
    var min_width = td.outerWidth();

    //console.log(close);
    if (parseInt(close)){
        th.attr('close', 0).find('a').html('展开');
        td.css({'min-width': parseInt(min_width / 1.5)});
    } else {
        th.attr('close', 1).find('a').html('折叠');
        td.css({'min-width': min_width * 1.5});
    }

} */

/**
 * 展开折叠单据某字段
 * @param a TH标签中的A标签
 *      例如:<th>商品名称<a href="javascript:" onclick="switchWidth(this, '-');">－</a><a href="javascript:" onclick="switchWidth(this, '+');">＋</a></th>
 * @param flag
 */
function switchWidth(a, flag){
    var th = $(a).parent();

    var idx = th.index();
    var td = $('table td').eq(idx);
    var min_width = parseInt(td.outerWidth());

    //console.log(close);
    if (flag == '-'){
        //th.attr('close', 0).find('a').html('展开');
        td.css({'min-width': min_width - 100});
    } else {
        //th.attr('close', 1).find('a').html('折叠');
        td.css({'min-width': min_width + 100});
    }

}


/**
 * 获取刷新所需参数,并拼装成QueryString
 * @param replace 需要替换的参数 {'foo':'bar'}
 * @returns {string}
 */
function params2querystring(replace){
    replace = replace ? replace : {};
    var qs = '';
    if (typeof(buildParams) == 'function'){
        var params = buildParams();
        $.extend(params, replace);
        $.each(params, function(k, v){
            qs += k + '=' + v + '&';
        });
    }
    return qs;
}

/**
 * 生成标签页ID
 * @param type 页面类型: base:基础资料 / reports:报表 /setting:设置
 * @param pageid 页面权限ID 可选
 * @param keyid 关键值ID 如:员工ID/仓库ID/等
 * @returns {string}
 */
function buildTabId(type, pageid, keyid){
    var typeid = '';
    switch (type){
        case 'base':
            typeid = '999';
            break;
        case 'reports':
            typeid = '998';
            break;
        case 'setting':
            typeid = '997';
            break;
    }
    var ret = typeid + pageid + keyid;
    return ret;
}


/**
 * 固定表格头部
 */
function fixTables(){
    //删除上一次产生的容器
    $(".fixedTH").remove();

    var stable = $(".table-body table thead");
    var th_top = $(".table-body table").offset().top;
    var thWrap = $("<table class='fixedTH' style='height:40px; z-index: 10; position: absolute; left: 0; top:0; overflow-y: hidden;'></table>");

    $(".table-body").append(thWrap);

    //监听滚动事件
    $(window).scroll(function(){
        var eleTop = $(window).scrollTop();

        //表头接触顶部时，固定显示
        if(parseInt(eleTop) > (th_top - 90)){
            thWrap.empty().append(stable.clone());
            thWrap.css({top:eleTop-th_top+90}).fadeIn(10);
        }else{
            thWrap.fadeOut(0);
        }

    });

}

/**
 * 表格行tooltip跟随
 */
function tipsTableTr() {
    $("[data-toggle='tooltip']").tooltip();
    $(".table-body table").mousemove(function(e){
        var sl = $(".table-body").scrollLeft();
        $(".tooltip").css({left:e.pageX - 110 + sl, width:"200px"});
        $(".tooltip-arrow").css({left:"50%"});
    });
}


/**
 * 打开新页面进入其他系统
 * @param subdomain
 */
function enterOtherPlatform(subdomain){
    if (typeof(subdomain) == 'string'){
        var hosts = window.location.host.split('.');
        var url = 'http://';
        for (var i=0; i<hosts.length; i++){
            if (!i) {
                url += subdomain + '.';
            } else {
                url += hosts[i] + '.';
            }
        }
        url = "http://admin.zsg.99yuncang.com/admin.php";
        //var url = 'http://' + subdomain + '.' + hosts[1] + '.' + hosts[2];
        if (typeof(url) == 'string'){
            var msg = cookieUtil("userprofile");
            if (msg != null) {
                msg = JSON.parse(msg);
                url += '?ticket=' + msg.ticket;
                if (msg.admin == 1 || $.inArray('194', msg.mids) != -1){
                    window.open(url);
                }
            }
        }
    }

}





/**
 * GPS经纬度转地理位置
 * @param latitude
 * @param longgitude
 */
function gps2address(latitude, longgitude){
    var address = '经纬度错误';
    if (latitude && longgitude){
        var params = {
            'latitude':latitude,
            'longgitude':longgitude,
        };
        var resRCR = new reportsCommonRepository();
        var data = resRCR.query('READ_GPS', params, 1, 1);
        if (data){
            address = data.address;
        } else {
            address = '未查询到结果';
        }
    }
    return address;
}

/**
 * 清空列表内容(for 报表)
 * @param msg
 */
function emptyTable(msg){
    msg = msg ? msg : '没有记录';
    $("#mainList tbody").empty();
    $("#table-empty").empty().append(msg).show();
}

