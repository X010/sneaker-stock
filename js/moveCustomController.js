var customRes = new customRepository();
var userRes = new restUserRepository();

/**
 * Table字段定义
 * @type {{}}
 */
var opts = {
    "rows": 10,
    "template": [
        {
            "name": "opt",
            "type": true,
            "class": "op",
            "template": "<input type='checkbox' checked='checked' index='#{index}' name='opt' id='rtccid_#{index}' value='#{opt}' />",
            "dattr": []
        },
        {
            "name": "ccname",
            "type": true,
            "class": "gname",
            "template": "<input disabled='disabled' name='ccname' id='rtccname_#{index}' value='#{ccname}' type='text' />",
            "dattr": []
        },
        {
            "name": "cctypename",
            "type": true,
            "class": "cate",
            "template": "<input disabled='disabled' name='cctypename' id='rtcctypename_#{index}' value='#{cctypename}' type='text' />",
            "dattr": []
        },
        {
            "name": "period",
            "type": true,
            "class": "num",
            "template": "<input disabled='disabled' class='f-input-period' name='period' id='rtperiod_#{index}' value='#{period}' type='text' />",
            "dattr": []
        },
        {
            "name": "sname",
            "type": true,
            "class": "username",
            "template": "<input disabled='disabled' class='f-input-sname' name='sname' id='rtsname_#{index}' value='#{sname}' type='text' />",
            "dattr": []
        },
        {
            "name": "suname",
            "type": true,
            "class": "username",
            "template": "<input disabled='disabled' class='f-input-suname' name='suname' id='rtsuname_#{index}' value='#{suname}' type='text' />",
            "dattr": []
        },
        {
            "name": "createtime",
            "type": true,
            "class": "date",
            "template": "<input disabled='disabled' class='f-input-createtime' name='createtime' id='rtcreatetime_#{index}' value='#{createtime}' type='text' />",
            "dattr": []
        }
    ]
};

function bindThisPageAutoComplete(container, isInit) {}


/**
 * 获取选中数据
 */
function getTableData() {
    var ccids = '';
    $('input[id*="rtccid_"]:checked').each(function () {
            var ccid = $(this).val();
            if (ccid != null && ccid != 'undefined' && ccid.length > 0) {
                ccids += (ccid + ',');
            }
        }
    );
    return ccids;
}


function buildParams(){
    var suid1 = $("#suid1").val();
    if (!suid1) {
        return false;
    }
    var params = {
        'suid': suid1
    };
    if ($("#sid").val()) params['sid'] = $("#sid").val();
    return params;
}

/**
 *  选择业务员A后,拉取客户并填充
 */
function changeQueryParam() {
    var params = buildParams();
    var data;
    if (params) {
        var res = customRes.findAllByField(1, 1000, params);//加载数据
        if (res && res.data) data = res.data;
    }
    handleStockList(data);
}


/**
 * 客户批量填充模块(通用)
 * @param customList
 */
function handleStockList(customList){
    var bindData = [];
    if (customList != null) {
        for (var i = 0; i < customList.length; i++) {
            bindData[i] = customList[i]; //copy
            bindData[i]['opt'] = customList[i].ccid;
            bindData[i]['ccname'] = fieldNull(customList[i].ccname);
            bindData[i]['cctypename'] = fieldNull(customList[i].cctypename);
            bindData[i]['period'] = fieldNull(customList[i].period, 0);
            bindData[i]['sname'] = fieldNull(customList[i].sname);
            bindData[i]['suname'] = fieldNull(customList[i].suname);
            bindData[i]['createtime'] = formatDatetime(customList[i].createtime);
        }
        $('#checkAll').attr('checked', true);
    }
    $("#mainList").runnerTableOnStart(opts, bindData, bindAutoComplete);
    //处理空行
    $("#mainList tbody tr").each(function () {
        if (!$(this).find('input[name="ccname"]').val()) {
            $(this).find('input[type="checkbox"]').hide();
        }
    });
}



/*--------------------------------------------华丽的分隔线------------------------------------------*/



$(function () {
    var msg = cookieUtil("userprofile");
    if (msg) {
        bindSelfStore('sid');
        $('#sid').prepend('<option value="">- 全部 -</option>');
        bindAutoCompleteCommon('suname1', 'user');
        bindAutoCompleteCommon('suname2', 'user');

        $('#sid').change(function(){
            changeQueryParam();
        });

        $('#suid1').change(function(){
            changeQueryParam();
        });

        //全选勾
        $('#checkAll').click(function(){
            if ($(this).prop('checked')){
                $('#mainList input[type="checkbox"]').attr('checked', true);
            } else {
                $('#mainList input[type="checkbox"]').removeAttr('checked');
            }
        });

        handleStockList();

    }



});

/* ----------------------------------- 华丽丽的分割线 ----------------------------------- */



/**
 * 确认移交客户
 * @returns {boolean}
 */
function moveCustomer() {
    if (!checkAutoComplete('suid1')) return false;
    if (!checkAutoComplete('suid2')) return false;
    var from_uid = $("#suid1").val();
    var to_uid = $("#suid2").val();
    if (from_uid == to_uid){
        runnerAlert("操作提示", "业务员不能相同");
        return false;
    }

    var ccids = getTableData();
    if (ccids == null || ccids.length <= 0) {
        runnerAlert("操作提示", "请选择要移交的客户");
        return false;
    }

    if (confirm("确定移交?")) {
        var res = userRes.moveCustomer(from_uid, to_uid, ccids);
        if (res != null) {
            noticeFrame(43, 'refrush');
            runnerConfiremUrl("操作提示", "移交成功", false, "/mainframe/baseinfo/moveCustom.html?iframeid=499&iframename=" + encodeURI("移交客户"));
        }
    }
}
