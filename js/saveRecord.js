var recordRes = new recordRepository();
var id;
var opt = 'create';
var page;

/* -------------------------------------- 华丽丽的分割线 ----------------------------------------- */

/**
 * 初始加载数据
 */
$(function () {

    var cancelOff = $('#data-cancelOff').attr('src');
    var cancelOn = $('#data-cancelOn').attr('src');
    var starHalf = $('#data-starHalf').attr('src');
    var starOff = $('#data-starOff').attr('src');
    var starOn = $('#data-starOn').attr('src');
    $('#score_service').raty({
        //'path': '/css/raty/images/',
        'cancelOff': cancelOff,
        'cancelOn': cancelOn,
        'starHalf': starHalf,
        'starOff': starOff,
        'starOn': starOn,
    });
    $('#score_deliver').raty({
        'cancelOff': cancelOff,
        'cancelOn': cancelOn,
        'starHalf': starHalf,
        'starOff': starOff,
        'starOn': starOn,
    });
    $('#score_goods').raty({
        'cancelOff': cancelOff,
        'cancelOn': cancelOn,
        'starHalf': starHalf,
        'starOff': starOff,
        'starOn': starOn,
    });

    page = getUrlParam("page");
    page = page ? page : 1;


    id = getUrlParam("id");
    if (id) {
        //修改编辑
        opt = 'update';
        var data = recordRes.findById(id);
        if (data != null) {
            $("#uname").val(fieldNull(data.uname));
            $("#type").val(data.type).attr('disabled', 'disabled');
            $("#ccid").val(data.ccid);
            $("#ccname").val(fieldNull(data.ccname)).attr('disabled', 'disabled');
            $("#order_id").val(fieldNull(data.order_id));
            if (data.type == 1){
                //$("#order_id").remove();
                $("#order_id_wrap").remove();
            }
            $("#memo").val(fieldNull(data.memo));
            $('#score_service').raty('score', parseInt(num2total(data.score_service)));
            $('#score_deliver').raty('score', parseInt(num2total(data.score_deliver)));
            $('#score_goods').raty('score', parseInt(num2total(data.score_goods)));

            //业务员到店
            if (data.score_salesman == 2) {
                $('#score_salesman1').removeAttr('checked');
                $('#score_salesman2').attr('checked', 'checked');
            } else {
                $('#score_salesman1').attr('checked', 'checked');
                $('#score_salesman2').removeAttr('checked');
            }
            //告知活动内容
            if (data.score_activity == 2) {
                $('#score_activity1').removeAttr('checked');
                $('#score_activity2').attr('checked', 'checked');
            } else {
                $('#score_activity1').attr('checked', 'checked');
                $('#score_activity2').removeAttr('checked');
            }

        }
        $('#addSelfPage').hide();
        $('#editSelfPage').show();

        //按钮权限 - 新建
        if (!checkPower(13001)){
            $("input").attr('disabled', 'disabled');
            $("select").attr('disabled', 'disabled');
            $("textarea").attr('disabled', 'disabled');
        }
    } else {
        //新建
        var msg = cookieUtil("userprofile");
        msg = JSON.parse(msg);
        $("#uname").val(msg.name);

        var type = getUrlParam("type");
        var ccid = getUrlParam("ccid");
        var ccname = getUrlParam("ccname");
        var order_id = getUrlParam("order_id");

        //console.log(type, ccid, ccname, order_id);

        if (type){
            $("#type").val(type).attr('disabled', 'disabled');
            $("#ccname").val(ccname).attr('disabled', 'disabled');
            $("#ccid").val(ccid);
        } else {
            bindAutoCompleteCommon('ccname', 'customer');
            $('#type option').each(function(){
                if ($(this).attr('value') == '2'){
                    $(this).remove();
                }
            });
        }
        $("#order_id").val(order_id);

        opt = 'create';
        $('#addSelfPage').show();
        $('#editSelfPage').hide();

        //按钮权限 - 修改
        if (!checkPower(13002)){
            $("input").attr('disabled', 'disabled');
            $("select").attr('disabled', 'disabled');
            $("textarea").attr('disabled', 'disabled');
        }
    }



    addTooltip("em.help", "#wg-tooltip", "data-help");

    formValidator();

});

/* ---------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

/**
 * 保存数据
 */
function saveRecord(opt) {
    var type = $("#type").val();
    var ccid = $("#ccid").val();
    var order_id = $("#order_id").val();
    var score_service = $('#score_service').raty('score');
    if (!score_service){
        runnerAlert('操作提示', '请选择服务态度');
        return false;
    }
    var score_deliver = $('#score_deliver').raty('score');
    if (!score_deliver){
        runnerAlert('操作提示', '请选择送货及时性');
        return false;
    }
    var score_goods = $('#score_goods').raty('score');
    if (!score_goods){
        runnerAlert('操作提示', '请选择货品完整性');
        return false;
    }
    var score_salesman = $("#score_salesman2").attr('checked') == 'checked' ? 2 : 1;
    var score_activity = $("#score_activity2").attr('checked') == 'checked' ? 2 : 1;
    var memo = $.trim($("#memo").val());

    if (!ccid){
        if (!checkAutoComplete(null, null, 'ccid')) return false;
    }

    var item = {
        "type": type,
        "ccid": ccid,
        "order_id": order_id,
        "score_service": score_service,
        "score_deliver": score_deliver,
        "score_goods": score_goods,
        "score_salesman": score_salesman,
        "score_activity": score_activity,
        "memo": memo,
    };

    if (opt == 'create'){
        var msg = recordRes.add(item);
    } else {
        var msg = recordRes.update(id, item);
    }
    return msg;
}


/**
 * 表单验证
 */
function formValidator() {
    var validator = $("#mainForm").validate({
        rules: {
            ccname: {
                required: true,
            },

        },
        messages: {
            ccname: {
                required: "请指定回访的客户",
            },
        },
        submitHandler: function () {
            var sres = saveRecord(opt);
            if (sres) {
                if (opt == 'create'){
                    noticeFrame(25, 'refrush', page); //刷新订单回访列表页
                    //noticeFrame(91, 'refrush'); //刷新记录页
                    if (getUrlParam("order_id")){
                        runnerConfirem("操作提示", "保存成功");
                    } else {
                        runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/service/saveRecord.html?iframeid=911&iframename=" + encodeURI("新建回访记录"));
                    }
                } else {
                    noticeFrame(91, 'refrush', page);
                    runnerConfirem("操作提示", "修改成功");
                }
            }
        },
    });
    /**
     * 表单按键模拟
     */
    $("#companyForm").mouseMove({
        focusElem: "input",
        focusId: "name"
    });
}

