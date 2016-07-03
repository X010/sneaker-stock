var checkRes = new checkRepository();

var currentId = 0;



/* ----------------------------- 华丽丽的分割线 ------------------------------------- */

/**
 * 新建帐盘
 */
$(function () {
    var isShow = getUrlParam("isshow");

    if (isShow == null || isShow == "undefined" || isShow.length <= 0) {
        //绑定仓库
        bindSelfStore("store");
        bindGoodsType("select1");

        $('#modalCAS').modal({
            backdrop:'static'
        }).modal('show');
        //openPupup('PupUpWindows');
        return false;
    }

    var id = getUrlParam("id");
    var ch = getUrlParam("action");

    //读取并填充信息(共用)
    if (id != null && id != "undefined") {
        var data = checkRes.findAcccountSetById(id);
        currentId = id;
        if (data != null) {
            if (data.status == 1){
                $('#totalDiff').html('预盈亏数目');
                $('#amountDiff').html('预盈亏金额');
                $('#amountReal_title').text('预盈亏总金额');
                $("#statusText").html('未记账');
                amountReal = formatAmountWithComma(data.pre_amount);
            } else {
                $('#totalDiff').html('实盈亏数目');
                $('#amountDiff').html('实盈亏金额');
                $('#amountReal_title').text('实际盈亏总金额');
                $("#statusText").html('已记账');
                amountReal = formatAmountWithComma(data.amount);
            }

            $("#checkId").html(data.id);
            $("#fullperson").html(data.uname);
            $("#cuname").html(data.cuname);
            $("#sname").html(data.sname);
            $("#createtime").html(formatDatetime(data.createtime));
            $("#checktime").html(formatDatetime(data.checktime));
            $('#tnames').html(data.tids ? data.tnames : '全部');
            $('#amountReal').html(amountReal);
            fullTable(data.goods_list, data.status);
        }

    }

    //查看
    if (ch == "vw") {
        $('#btn-list').click(function(){
            openParentForFrame('帐盘单','/mainframe/check/accounting.html?option=2', 722);
        });
        $("#chalkitup").hide();
        $("#lookup").show();
        $("input").attr('disabled', 'disabled');
    }
    //记账
    else {
        $('#btn-list').click(function(){
            openParentForFrame('帐盘单','/mainframe/check/accountSet.html?option=1', 722);
        });
        $("#chalkitup").show();
        $("#lookup").hide();
    }

    tableHover();
    //按钮权限
    if (!checkPower(12104)) {}

    fixTables();
});


/**
 * 填充帐盘列表
 * @param data
 */
function fullTable(data, status) {
    if (data != null && data.length > 0) {
        $("#accountSetList tbody").empty();
        for (var i = 0; i < data.length; i++) {
            var rowContent = "<tr data-toggle='tooltip' data-placement='top' title='" + data[i].gname + "'>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gcode + "</div></td>";
            rowContent += "<td class='w280 align-left'><div class='td-wrap'>" + data[i].gname + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gbarcode + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gspec + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gunit + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + data[i].total_sys + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + data[i].total_phy + "</div></td>";
            var total_sub = computeNumberDiff(data[i].total_sys, data[i].total_phy);
            total_sub = total_sub > 0 ? total_sub.substr(1) : total_sub; //去掉+号
            rowContent += "<td class='num'><div class='td-wrap'>" + setColor(total_sub) + "</div></td>";
            if (status == 1){
                rowContent += "<td class='num'><div class='td-wrap'>" + setColor(data[i].pre_amount) + "</div></td>";
            } else {
                rowContent += "<td class='price'><div class='td-wrap'>" + setColor(data[i].amount) + "</div></td>";
            }
            rowContent += "</tr>";
            $("#accountSetList tbody").append(rowContent);
        }
    } else {
        $("#accountSetList tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
    tipsTableTr();
}

/*----------------------------------------------------华丽的分隔线--------------------------------------------------------*/


/**
 * 创建帐盘
 */
function createAccountSet() {
    if (confirm("确定创建帐盘？\n\n注意：新建帐盘后会清空该仓库当前正在盘点的帐盘单据，以及所有未审核的实盘单据！")) {
        var sid = $("#store").val();
        var tid = "";
        $("#select2 option").each(function () {
            tid += ($(this).val() + ","); //这里得到的就是
        });
        var fromType = $("input[type='radio']:checked").val();
        if (sid != null) {
            var memo = $("#memo").val();
            var res = checkRes.createAccountSet({"sid": sid, "tids": tid, "type": fromType});
            if (res != null) {
                noticeFrame(722, 'refrush');
                runnerConfiremUrl("操作提示", "创建成功，可以开始录入实盘了", false, "/mainframe/check/createAccountSet.html?isshow=0&action=vw&id=" + res.id + "&iframeid=72&iframename=" + encodeURI("新建帐盘单"));
            }
        }
    }
}

/**
 * 记帐
 */
function chalkItUpForAccountSet() {
    if (confirm("确定进行记账操作？\n\n注意：记账后会修改该仓库的库存数据！")) {
        if (currentId != null) {
            //进行记帐
            var res = checkRes.checkAccountSet(currentId);
            if (res != null) {
                noticeFrame(744, 'refrush');
                runnerConfirem("操作提示", "记账成功");
            }
        }
    }
}
