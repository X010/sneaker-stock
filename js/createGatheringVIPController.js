var financeRes = new financeRepository();

var currentId = 0;
var page;

var financeOption = '';
var caption = {
    '1': '会员费用',
    '99': '其他费用'
};
for (var i in caption){
    financeOption += '<option value="'+i+'">'+ caption[i] +'</option>';
}

var opts = {
    "rows": 10,
    "template": [
        {
            "name": "id",
            "type": true,
            "class" : "cate",
            "template": "<div class='table-form-td-wrap'><select index='#{index}' class='form-control input-sm' id='financeOptionId_#{index}'>" + financeOption + "</select></div>",
            "dattr": []
        },
        {
            "name": "amount_price",
            "type": true,
            "class" : "price",
            "template": "<input type='text' name='amount_price' index='#{index}' value='#{amount_price}' id='amount_price_#{index}' maxlength='10' autocomplete='off'/>",
            "dattr": []
        },
        {
            "name": "memo",
            "type": true,
            "class" : "des",
            "template": "<input type='text' index='#{index}' value='#{memo}' id='rtmemo_#{index}' />",
            "dattr": []
        }
    ]
};

/**
 * 获取TableData
 */
function getTableData() {
    var i = 0;
    var goodList = [];
    $('input[id*="amount_price_"]').each(function () {
            var eff = $(this).val();
            var index = $(this).attr("id").substring(13, $(this).attr("id").length);
            if (eff != null && eff != 'undefined' && eff.length > 0) {
                var account_id = $("#financeOptionId_" + index).val();
                var memo = $("#rtmemo_" + index).val();
                goodList[i] = {
                    "amount_price": eff,
                    "account_id": account_id,
                    "memo": memo
                };
                i++;
            }
        }
    );
    return goodList;
}


/**
 * 计算结算总金额
 */
function computeAmount(){
    //应该结算金额
    var amountReal = 0;
    $("#gatheringList tr").each(function(){
        var amount = $(this).find('td input[name="amount_price"]').val();
        if (amount){
            amountReal += parseFloat(amount);
        }
    });
    $('#amountReal').html(formatAmountWithComma(num2price(amountReal)));
}

/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */


/**
 * 创建收款单初始化
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var id = getUrlParam("id");
    var msg = cookieUtil("userprofile");
    if (msg) {
        msg = JSON.parse(msg);
        $("#fullperson").html(msg.name); //填单人
        bindAutoCompleteCommon('companyName', 'vip', false);
        bindConfigBalance('pay_type');


        /**
         * 新建
         */
        if (action == null || action == "undefined" || action.length <= 0) {
            $('#btn-print').remove();
            $('#btn-list').click(function () {
                openParentForFrame('会员收款单', '/mainframe/finance/gathering.html?option=1', 877);
            });
            $("#cuname").html('(空)');
            $("#checktime").html('(空)');
            $("#gatheringList").runnerTableOnStart(opts, null, null);
        }

        /**
         * 除新建外共用
         */
        if (id && action){
            currentId = id;
            $("#setlementId").html(currentId);
            var data = financeRes.findGatheringById(id);
            if (data != null) {
                $('#btn-list').click(function () {
                    openParentForFrame('会员收款单', '/mainframe/finance/gathering.html?option=' + data.status, 877);
                });
                if (data.negative_id) $("#negative_id").html(data.negative_id).parent().show();
                $('#div-companyType').hide();
                $("#company").val(data.dcid);
                $("#companyName").val(data.dcname).attr('disabled', 'disabled');
                $("#fullperson").html(data.uname); //填单人
                $("#cuname").html(fieldNull(data.cuname, '(空)')); //审核人
                $("#pay_type").val(data.pay_type);
                $("#createtime").html(formatDatetime(data.createtime));
                $("#checktime").html(formatDatetime(data.checktime));
                //填充表格数据
                $("#gatheringList").runnerTableOnStart(opts, data.account_list, null);
                $.each(data.account_list, function(i){
                    $('#financeOptionId_' + i).val(data.account_list[i].account_id);
                });
            }
            stampStatus(id2text(showInStatusList, data.status));
        }


        /**
         * 自动添加新行
         */
        var currentDataIndex = 0;
        $('tbody input').blur(function(){
            var rows = $('tbody tr').length;
            currentDataIndex = $(this).parent().parent().index();
            if (currentDataIndex >= rows - 2) {
                if ($.trim($(this).val()) != ''){
                    addBlankRow();
                }
            }
        });
        /**
         * 递归对新行绑定新增事件
         */
        function addBlankRow(){
            $('#gatheringList').runnerTableAddBlankRow(); //添加一行空白行;
            $('#gatheringList tr:last input').blur(function(){
                if ($.trim($(this).val()) != ''){
                    addBlankRow();
                }
            });
            ++currentDataIndex;
        }


        //自动计算总金额
        computeAmount();
        $('#gatheringList input[name="amount_price"]').keyup(function(){
            computeAmount();
        });

        /**
         * 审核
         */
        if (action == "ch") {
            $("#createGathering").hide();
            $("#chGathering").show();
            $("#xdGathering").hide();
            $("#vwGathering").hide();
        }

        /**
         * 红冲
         */
        if (action == "xd") {
            $("#createGathering").hide();
            $("#chGathering").hide();
            $("#xdGathering").show();
            $("#vwGathering").hide();
            $('input').attr('disabled', 'disabled');
            $('select').attr('disabled', 'disabled');
        }

        /**
         * 查看
         */
        if (action == "vw") {
            $('input').attr('disabled', 'disabled');
            $('select').attr('disabled', 'disabled');
            $("#createGathering").hide();
            $("#chGathering").hide();
            $("#xdGathering").hide();
            $("#vwGathering").show();
        }

        //打印
        $('#btn-print').click(function(){
            if (currentId) {
                previewPrint(877, currentId);
            }
        });

        //按钮权限
        if (!checkPower(12401)) {}
        if (!checkPower(12402)) {}
        if (!checkPower(12403)) {}
        if (!checkPower(12404)) {}
        if (!checkPower(1240)) {}

    }
});


/** ---------------------------------- 华丽丽的分割线 ---------------------------------- */



/**
 * 创建收款单
 */
function createGathering() {
    var companyId = $("#company").val();
    if (!checkAutoComplete(null, null, 'company')) return false;
    var account_list = getTableData();
    if (account_list == null || account_list.length <= 0) {
        runnerAlert("操作提示", "请填写会计科目明细");
        return false;
    }
    var pay_type = $("#pay_type").val();
    var postData = {
        "dcid": companyId,
        "pay_type": pay_type,
        "account_list": JSON.stringify(account_list)
    };

    var res = financeRes.createGathering(postData);
    if (res != null) {
        noticeFrame(877, 'refrush', page);
        runnerConfiremUrl("操作提示", "保存成功", false, "/mainframe/finance/createGatheringVIP.html?iframeid=87&iframename=" + encodeURI("新建会员收款单"));
    }
}

/**
 * 保存并审核收款单
 * @param add 是否保存并审核
 */
function checkGathering(add) {
    var companyId = $("#company").val();
    if ($('#companyType').val() == 1){
        if (!checkAutoComplete(null, 'company', null)) return false;
    } else {
        if (!checkAutoComplete(null, null, 'company')) return false;
    }
    var account_list = getTableData();
    if (account_list == null || account_list.length <= 0) {
        runnerAlert("操作提示", "请填写会计科目明细");
        return false;
    }
    var pay_type = $("#pay_type").val();
    var postData = {
        "dcid": companyId,
        "pay_type": pay_type,
        "account_list": JSON.stringify(account_list)
    };
    var id = add ? false : currentId;
    var res = financeRes.checkGathering(id, postData);
    if (res != null) {
        noticeFrame(877, 'refrush', page);
        if (add){
            runnerConfiremUrl("操作提示", "审核通过", false, "/mainframe/finance/createGatheringVIP.html?iframeid=87&iframename=" + encodeURI("新建会员收款单"));
        } else {
            runnerConfirem("操作提示", "审核通过");
        }
    }
}


/**
 * 红冲收款单
 */
function xdGathering() {
    if (confirm("确定红冲该单据?")) {
        var res = financeRes.xdGatheringById(currentId);
        if (res != null) {
            noticeFrame(877, 'refrush', page);
            runnerConfirem("操作提示", "冲单成功");
        }
    }
}

/**
 * 删除收款单(审核不通过)
 */
function delGathering() {
    if (confirm("确定作废该单据?")) {
        var res = financeRes.delGatheringById(currentId);
        if (res != null) {
            noticeFrame(877, 'refrush', page);
            runnerConfirem("操作提示", "作废成功");
        }
    }
}
