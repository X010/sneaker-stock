var checkRes = new checkRepository();


/**
 * 初始实盘列表
 */
$(function () {
    var msg = cookieUtil("userprofile");
    bindSelfStore("store");
    var option = getUrlParam("option");
    var sid = getUrlParam("sid");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;
    if (option == null || option == 'undefined') {
        sid = $("#store").val();
        option = $("#statusNumber").val();
    }

    //新建按钮
    if (!checkPower(73)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建实盘单', "/mainframe/check/createFirmOffer.html?iframeid=73&iframename=" + encodeURI("新建实盘单"), 73);
        });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    $("#begin_date").change(function(){
        refrush();
    });
    $("#end_date").change(function(){
        refrush();
    });

    if (msg != null) {
        $("#store").val(sid);
        $("#statusNumber").val(option);

        refrush(currentPage);
    }
});


function refrush(page) {
    page = page ? page : defaultPage;
    var params = buildParams();
    if (1) {
        var data = checkRes.findFirmOffer(page, defaultPageNum, params);
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, page, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}


function buildParams(){
    var params = {
        "option": $("#statusNumber").val()
    };
    if ($("#statusNumber").val()) params['status'] = $("#statusNumber").val();
    if ($("#store").val()) params['sid'] = $("#store").val();
    if ($("#sorderid").val()) params['search'] = $("#sorderid").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    return params;
}

/**
 * 填充数据
 * @param data
 */
function fullTable(data) {
    if (data != null && data != 'undefined' && data.data != null && data.data.length > 0) {
        data = data.data;
        $("#firmOfferList tbody").empty();
        $("#table-empty").hide();
        for (var i = 0; i < data.length; i++) {
            var rowContent = "<tr>";
            if (data[i].status == 3){
                //rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "未审核") + "\",\"/mainframe/check/createFirmOffer.html?action=ch&id=" + data[i].id + "\","+data[i].id+");'>";
                rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "已记账") + "\",\"/mainframe/check/createFirmOffer.html?action=vw&id=" + data[i].id + "\","+data[i].id+");'>";
            } else {
                rowContent = "<tr ondblclick='openParentForFrame(\"" + simpleBillNo(data[i].id, "盘点中") + "\",\"/mainframe/check/createFirmOffer.html?action=vw&id=" + data[i].id + "\","+data[i].id+");'>";
            }
            rowContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            rowContent += "<td class=''>" + fieldNull(data[i].sys_id) + "</td>";
            rowContent += "<td class=''>" + fieldNull(data[i].sname) + "</td>";
            rowContent += "<td class=''>" + fieldNull(data[i].uname) + "</td>";
            rowContent += "<td class=''>" + formatDatetime(data[i].createtime) + "</td>";
            //rowContent += "<td class='username'>" + fieldNull(data[i].cuname) + "</td>";
            //rowContent += "<td class='datetime'>" + formatDatetime(data[i].checktime) + "</td>";
            rowContent += "<td class=''>" + (data[i].status == 3 ? '<span class="status-checked">已记账</span>' : '<span class="status-uncheck">盘点中</span>') + "</td>";
            rowContent += "</tr>";
            $("#firmOfferList tbody").append(rowContent);
        }
    } else {
        $("#firmOfferList tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}

