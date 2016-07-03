var checkRes = new checkRepository();

var currentId = 0;



/* ----------------------------- 华丽丽的分割线 ------------------------------------- */

/**
 * 新建帐盘
 */
$(function () {

    var id = getUrlParam("id");
    var ch = getUrlParam("action");

    //读取并填充信息(共用)
    if (id != null && id != "undefined") {
        var data = checkRes.findAcccountSetById(id);
        currentId = id;
        if (data != null) {
            if (data.status == 1){
                $("#pageName").text("预盈亏帐盘详情");
                $('#totalDiff').html('预盈亏数目');
                $('#amountDiff').html('预盈亏金额');
                $('#amountReal_title').text('预盈亏总金额');
                $("#statusText").html('未记账');
                amountReal = data.pre_amount;
                $('#btn-list').click(function(){
                    openParentForFrame('盘点预盈亏报表','/mainframe/reports/accountSetReports.html?action=pre', 9107);
                });
            } else {
                $("#pageName").text("实盈亏帐盘详情");
                $('#totalDiff').html('实盈亏数目');
                $('#amountDiff').html('实盈亏金额');
                $('#amountReal_title').text('实际盈亏总金额');
                $("#statusText").html('已记账');
                amountReal = data.amount;
                $('#btn-list').click(function(){
                    openParentForFrame('盘点实盈亏报表','/mainframe/reports/accountSetReports.html?action=real', 9108);
                });
            }

            $("#checkId").html(data.id);
            $("#fullperson").html(data.uname);
            $("#cuname").html(data.cuname);
            $("#sname").html(data.sname);
            $("#createtime").html(formatDatetime(data.createtime));
            $("#checktime").html(formatDatetime(data.checktime));
            $('#amountReal').html(amountReal);
            fullTable(data.goods_list, data.status);
        }

    }
    $("input").attr('disabled', 'disabled');

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
            var rowContent = "<tr>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gcode + "</div></td>";
            rowContent += "<td class='w280 align-left'><div class='td-wrap'>" + data[i].gname + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gbarcode + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gunit + "</div></td>";
            rowContent += "<td class=''><div class='td-wrap'>" + data[i].gspec + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + data[i].total_sys + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].total_sys, data[i].gspec) + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + data[i].total_phy + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + total2boxtotal(data[i].total_phy, data[i].gspec) + "</div></td>";
            var numDiff = computeNumberDiff(data[i].total_sys, data[i].total_phy);
            rowContent += "<td class='num'><div class='td-wrap'>" + setColor(numDiff) + "</div></td>";
            rowContent += "<td class='num'><div class='td-wrap'>" + (numDiff<=0 ? '' : '+') + total2boxtotal(numDiff, data[i].gspec) + "</div></td>";
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
    tableHover();
}

/*----------------------------------------------------华丽的分隔线--------------------------------------------------------*/

