var resRecord = new recordRepository();

var currentPage;


$(function () {
    var msg = cookieUtil("userprofile");
    var option = getUrlParam("option");
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;


    //新建按钮
    if (!checkPower(911)){
        $('#btn-create').remove();
    } else {
         $('#btn-create').click(function(){
            openParentForFrame('新建回访记录', "/mainframe/service/saveRecord.html?iframeid=911&iframename=" + encodeURI("新建回访记录"), 911);
         });
    }

    $("#begin_date").datepicker();
    $("#end_date").datepicker();
    $("#begin_date").change(function(){
        refrush();
    }).val(GetDateStr(-days_view));
    $("#end_date").change(function(){
        refrush();
    }).val(GetDateStr(0));

    if (msg != null) {
        //msg = JSON.parse(msg);
        bindAutoCompleteCommon('ccname', 'customer');
        bindAutoCompleteCommon('uname', 'user');

        refrush(currentPage);
    }

    fixTables();
});


function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = resRecord.findAll(currentPage, defaultPageNum, params);
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, currentPage, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}

function buildParams(){
    var params = {};
    if ($("#type").val()) params['type'] = $("#type").val();
    if ($("#ccid").val()) params['ccid'] = $("#ccid").val();
    if ($("#uid").val()) params['uid'] = $("#uid").val();
    if ($("#score_service").val()) params['score_service'] = $("#score_service").val();
    if ($("#score_deliver").val()) params['score_deliver'] = $("#score_deliver").val();
    if ($("#score_goods").val()) params['score_goods'] = $("#score_goods").val();
    if ($("#begin_date").val()) params['begin_date'] = $("#begin_date").val();
    if ($("#end_date").val()) params['end_date'] = $("#end_date").val();
    return params;
}

/**
 * 填充Table
 */
function fullTable(data) {
    if (data != null && data.data != null) {
        data = data.data;
        $("#mainList tbody").empty();
        $("#table-empty").empty().hide();
        for (var i = 0; i < data.length; i++) { //填充数据到表单
            var tableContent = "<tr ondblclick='openParentForFrame(\""+ ('回访记录:'+data[i].id)  + "\",\"/mainframe/service/saveRecord.html?page=" + currentPage + "&id=" + data[i].id + "&action=update\","+data[i].id+");'>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].id) + "</div></td>";
            tableContent += "<td class='datetime'><div class='td-wrap'>" + formatDatetime(data[i].createtime) + "</div></td>";
            tableContent += "<td class='align-left'><div class='td-wrap'>" + fieldNull(data[i].ccname) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + type2name(data[i].type) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(data[i].uname) + "</div></td>";
            tableContent += "<td class='star'><div class='td-wrap'>" + num2star(data[i].score_service) + "</div></td>";
            tableContent += "<td class='star'><div class='td-wrap'>" + num2star(data[i].score_deliver) + "</div></td>";
            tableContent += "<td class='star'><div class='td-wrap'>" + num2star(data[i].score_goods) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (data[i].score_salesman == 2 ? '是' : '否') + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" +(data[i].score_activity == 2 ? '是' : '否') + "</div></td>";
            tableContent += "</tr>";
            $("#mainList tbody").append(tableContent);
        }
        if (data.length == 0) {
            $("#mainList tbody").empty();
            $("#table-empty").empty().append("没有记录").show();
        }
    }
    formatTDOfRMB();//格式化金额列
}


function type2name(type){
    var name = '其他回访';
    switch (parseInt(type)){
        case 1:
            name = '客户回访';
            break;
        case 2:
            name = '订单回访';
            break;
    }
    return name;
}

function num2star(num) {
    var star = '';
    for (var i=0; i<num; i++){
        star += '★';
    }
    return star;
}