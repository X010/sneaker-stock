var resGoods = new restGoodsRepository();
var resCustom = new customRepository();
var userRes = new restUserRepository();

function getAllGoodsType(){
    //var data = resGoods.findGoodsSubType(6177);
    var data = resGoods.findGoodsType();
    //console.log(data);
    if (data) {
        for (var i in data) {
            var html_input = '<li class="item-checkbox"><label for="gt_'+ data[i].id +'"><input type="checkbox" id="gt_'+ data[i].id +'" name="gt[]" value="' + data[i].id + '" /> ' + data[i].name + '</label></li>';
            $('#goods_type').append(html_input);
        }
    }
}

/* ---------------------------------------------- 华丽丽的分割线 ---------------------------------------------------- */

var id;
var page;

/**
 * 初始加载数据
 */
$(function () {


    //地区选择联动菜单
    $('#addr').cxSelect({
        //url: '/js/compents/city.json',  // 提示：如果服务器不支持 .json 类型文件，请将文件改为 .js 文件
        selects: ['province', 'city', 'area', 'streat'],  // selects 为数组形式，请注意顺序
    });
    //地区选择联动菜单
    $('#region').cxSelect({
        //url: '/js/compents/city.json',  // 提示：如果服务器不支持 .json 类型文件，请将文件改为 .js 文件
        selects: ['province', 'city', 'area'],  // selects 为数组形式，请注意顺序
    });

    getAllGoodsType();
    autoChangeAddress(); //两组地域联动
    bindAutoCompleteCommon('suname', 'user');
    //bindSelfUser('my_suid');
    bindSelfStore('my_sid');

    $('#suname').change(function(){
        if ($.trim($('#suname').val()) == ''){
            $('#belong').text('');
        }
    });


    //审核
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    id = getUrlParam("id");
    /**
     * 公用读取
     */
    if (id){
        var data = resCustom.findTemp(id);
        if (data) {
            //console.log(data);
            $("#suname").val(data.suname);
            $("#belong").text(data.belong == 1 ? '自有业务员' : '外借业务员');
            $("#my_suid").val(data.suid);
            $("#my_sid").val(data.sid);
            $("#my_period").val(data.period);
            $("#username").val(data.account);
            $("#password").val(data.password);
            $("#name").val(data.cname);
            $("#addrpro").attr("data-value",data.province).trigger('change');
            $("#addrcity").attr("data-value",data.city).trigger('change');
            $("#addrzone").attr("data-value",data.country).trigger('change');
            $("#addrstreat").attr("data-value",data.street).trigger('change');
            $("#address").val(data.address ? data.address.replaceAll(',', ' ') : '');
            $("#gps").val(fieldNull(data.formatted_address));
            $("#type").val(data.ctype);
            $("#contactor").val(data.contractor);
            $("#contactor_phone").val(data.phone);
            $("#phone").val(data.phone);
            $("#areapro").attr("data-value",data.areapro).trigger('change');
            $("#areacity").attr("data-value",data.areacity).trigger('change');
            $("#areazone").attr("data-value",data.areazone).trigger('change');
            $("#area_sale").val(data.areapro + ' ' + data.areacity + ' ' + data.areazone);
            $("#refuse_memo").val(fieldNull(data.memo));

            if (data.status == 1){
                $('#refuse_memo').parent().remove();
            }

            data.gtids = data.gtids ? data.gtids : '';
            var gtids = data.gtids.split(',');
            $('#goods_type li').each(function(){
                if ($.inArray($(this).find('input').val(), gtids) != -1){
                    $(this).find('input').attr('checked', 'checked');
                }
            });
        }
    }
    /**
     * 审核
     */
    if (action == 'ch'){
        $('li[name="li_check"]').show();
        $('#div-refuse').show();
        $('#btnDiv-save').hide();
        $('#btnDiv-check').show();
    }
    /**
     * 查看
     */
    else if (action == 'vw'){
        $('li[name="li_check"]').show();
        $('#div-refuse').show();
        $('#btn-submit').hide();
        $('input').attr('disabled', 'disabled');
        $('select').attr('disabled', 'disabled');
        $('textarea').attr('disabled', 'disabled');
    }

    //按钮权限
    if (!checkPower(10403)) {}
    if (!checkPower(10404)) {}

    //电话联动输入
    $('#contactor_phone').keyup(function(){
        $('#phone').val($(this).val());
        $('#username').val($(this).val());
    }).blur(function(){
        $('#phone').blur(); //重新验证规则
    });
    $('#phone').keyup(function(){
        $('#username').val($(this).val());
    });

    $('#username').blur(function(){
        checkUsername();
    });
    $('#name').blur(function(){
        checkName();
    });

    addTooltip("em.help", "#wg-tooltip", "data-help");

    formValidator();
    $('#btn-submit').click(function(){$('#companyForm').submit();});
    //updateRegion(); //拼接地区信息到输入框

    autoCheckBox();


});

/* ---------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

/**
 * 组装参数
 * @returns {*}
 */
function buildParams(){
    var ret = {};
    if (!checkAutoComplete("my_suid")) return false;

    var my_suid = $("#my_suid").val();
    var my_sid = $("#my_sid").val();
    var my_period = $("#my_period").val();
    var username = $("#username").val();
    var password = $("#password").val();

    var name = $("#name").val();
    var simple_name = $("#simple_name").val();
    var type = $("#type").val();
    if (!type) return false;

    //公司地址
    if (!$('#addrpro').val() || !$('#addrcity').val() || !$('#addrzone').val()) {
        ret = '请选择公司所在的省市区';
    }
    //经营地域
    //if (!$('#areapro').val() || !$('#areacity').val() || !$('#areazone').val()) {
    //    ret = '请选择公司的经营地域';
    //}
    /* //街道也必填
     $('#addr select').each(function(){
     if ($(this).html() != '' && !$(this).val()){
     ret = '公司地址请选择完整';
     }
     });
     */
    if (typeof(ret) != 'string') {
        var addrpro = $("#addrpro").val();
        var addrcity = $("#addrcity").val();
        var addrzone = $("#addrzone").val();
        var addrstreat = $("#addrstreat").val();
        var address = $("#address").val();
        addrpro = addrpro ? addrpro : '';
        addrcity = addrcity ? addrcity : '';
        addrzone = addrzone ? addrzone : '';
        addrstreat = addrstreat ? addrstreat : '';
        address = address ? address : '';
        var address = addrpro + ' ' + addrcity + ' ' + addrzone + ' ' + addrstreat + ' ' + address;

        //经营地域
        var areapro = $("#areapro").val();
        var areacity = $("#areacity").val();
        var areazone = $("#areazone").val();

        var tax_no = $("#tax_no").val();
        var account_no = $("#account_no").val();
        var license = $("#license").val();
        var fax = $("#fax").val();
        var phone = $("#phone").val();
        var lawrep = $("#lawrep").val();
        var contactor = $("#contactor").val();
        var contactor_phone = $("#contactor_phone").val();
        var email = $("#email").val();
        //var basedate = $("#basedate").val();
        var memo = $("#memo").val();
        var gtids = '';
        $('#goods_type li').each(function () {
            if ($(this).find('input').attr('checked') == 'checked') {
                gtids += $(this).find('input').val() + ',';
            }
        });
        if (!gtids) return false;
        //console.log(scope);

        ret = {
            "my_suid": my_suid,
            "my_sid": my_sid,
            "my_period": my_period,
            "username": username,
            "password": password,

            "name": name,
            "simple_name": simple_name,
            "address": address,
            "type": type,
            "areapro": areapro,
            "areacity": areacity,
            "areazone": areazone,
            "tax_no": tax_no,
            "account_no": account_no,
            "license": license,
            "fax": fax,
            "phone": phone,
            "lawrep": lawrep,
            "contactor": contactor,
            "contactor_phone": contactor_phone,
            "email": email,
            "gtids": gtids,
            "memo": memo
        };
    }

    return ret;
}


/**
 * 注册客户公司
 */
function regCustomCompany() {
    var msg = false;
    var params = buildParams();
    if (typeof(params) == 'string') {
        runnerAlert('操作提示', params);
    } else if (params){
        msg = resCustom.register(params);
    }
    return msg;
}

/**
 * 审核客户公司通过
 */
function checkPassCustomCompany() {
    if (!$("#type").val()){
        runnerAlert('操作提示', '请选择客户公司类型');
        return false;
    } else if (!$("#my_sid").val()){
        runnerAlert('操作提示', '请选择我方出库仓库');
        return false;
    } else if (!$('input[name="gt[]"]:checked').val()){
        runnerAlert('操作提示', '请选择客户经营范围');
        return false;
    } else if ($.trim($("#contactor_phone").val()) == ''){
        runnerAlert('操作提示', '请填写客户联系人电话');
        return false;
    }
    var params = buildParams();
    if (typeof(params) == 'string') {
        runnerAlert('操作提示', params);
        return false;
    } else if (!params){
        //false
    } else if (typeof(params) != 'object'){
        runnerAlert('操作提示', '请先完善资料');
        return false;
    } else {
        //console.log(checkUsername());
        if (checkUsername()) {
            var msg = resCustom.checkPass(id, params);
            if (msg != null) {
                noticeFrame(48, 'refrush', page);
                noticeFrame(43, 'refrush', page);
                runnerConfirem("操作提示", "审核通过");
            }
        }
    }
}

/**
 * 审核客户公司不通过
 */
function checkUnpassCustomCompany() {
    var refuse_memo = $.trim($('#refuse_memo').val());
    if (refuse_memo == ''){
        runnerAlert('操作提示', '请填写拒绝理由');
        return false;
    }
    var params = {
        'refuse_memo': refuse_memo,
    };
    var msg = resCustom.checkUnpass(id, params);
    if (msg != null) {
        noticeFrame(48, 'refrush', page);
        runnerConfirem("操作提示", "拒绝成功");
    }
}

/**
 * 表单验证
 */
function formValidator() {
    var validator = $("#companyForm").validate({
        rules: {
            suname: {
                //required: true,
            },
            my_period:{
                required:true,
                min:0,
                number:true
            },
            name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            'gt[]': {required: true,minlength: 1},
            type: {required: true},
            //simple_name: {maxlength: 5},
            address: {maxlength: 50},
            username: {required: true, minlength: 5, maxlength: 15 },
            password: {required: true, minlength: 6},
            tax_no: {minlength: 15, maxlength: 18},
            license: {minlength: 13, maxlength: 18},
            account_no: {maxlength: 18, number: true},
            fax: {phone: []},
            phone: {mobile: []},
            lawrep: {maxlength: 20},
            contactor: {required: true, maxlength: 20},
            contactor_phone: {required: true},
            email: {mail: []},
            basedate: {
                maxlength: 2,
                min: 1,
                max: 28,
                number: true
            },
            memo: {maxlength: 200}
        },
        messages: {
            //suname:{required:"请指定一个我方业务员",},
            my_period:{
                required:"请填写账期天数,0表示现结",
                min:"账期天数只能为整数",
                number:"账期天数只能为整数"
            },
            name: {
                required: "请填写公司名称",
                minlength: "公司名称最少需要2个字",
                maxlength: "公司名称最多不要超过20个字",
            },
            contactor: {required: "请填写联系人姓名", maxlength: "联系人姓名最多输入20个字"},
            contactor_phone: {required: "请填写联系人电话"},
            'gt[]': {required: "请选择经营范围", minlength: "至少选择一个经营范围"},
            type: {required: "请选择公司类型"},
            phone: {required: "用于接收系统短信，必须填写"},
            //simple_name: {maxlength: "公司简称最多输入6个字"},
            address: {maxlength: "公司地址最多输入50个字"},
            username: {required: "用于登录采购平台，必须填写", minlength: "登录账号不得少于5个字符", maxlength: "账号不得多于15个字符"},
            password: {required: "用于登录采购平台，必须填写", minlength: "登录密码需不少于6位"},
            tax_no: {minlength: "企业税号必须是15位数字", maxlength: "企业税号必须是18位数字"},
            license: {minlength: "营业执照注册号最少13位数字", maxlength: "营业执照注册号最多18位数字"},
            account_no: {maxlength: "银行账号最多输入18个数字", number: "银行账号为纯数字"},
            lawrep: {maxlength: "企业法人最多输入20个字"},
            basedate: {required: "请填写基准日",maxlength: "只能设置1～28", min: "日期不能小于1", max: "日期不能大于28", number: "只能设置数字1～28"},
            memo: {maxlength: "备注信息最多输入200个字"},
        },
        success: function (element) {
            if (element.attr("name") == "my_period"){
                $("#periodError").empty();
            }
            else if (element.attr("name") == 'gt[]'){
                $("#gtError").empty();
            }else{element.parent().find('LABEL').remove();}
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "my_period"){
                $("#periodError").text(error.text());
            }
            else if (element.attr("name") == 'gt[]') {
                $("#gtError").text(error.text());
            } else {
                if(error.text() != '')
                    error.appendTo(element.parent());
            }
        },
        submitHandler: function () {
            var sres = regCustomCompany();
            if (sres) {
                noticeFrame(43, 'refrush', page);
                runnerConfirem("操作提示", "注册成功");
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


/**
 * 两组地域联动
 */
function autoChangeAddress(){
    $("#addrpro").click(function(){
        $(this).change(function(){
            var pro = $("#addrpro option:selected").text();
            pro = pro == '请选择' ? '' : pro;
            //自动设置经营地域
            $("#areapro").val(pro).trigger('change');
        });
    });
    $("#addrcity").click(function(){
        $(this).change(function(){
            var city = $("#addrcity option:selected").text();
            city = city == '请选择' ? '' : city;
            //自动设置经营地域
            $("#areacity").val(city).trigger('change');
        });
    });
    $("#addrzone").click(function() {
        $(this).change(function () {
            var zone = $("#addrzone option:selected").text();
            zone = zone == '请选择' ? '' : zone;
            //自动设置经营地域
            $("#areazone").val(zone).trigger('change');
        });
    });
}

/**
 * 拼接地区信息到输入框

function updateRegion(){
    $("#addrpro").click(function(){
        $(this).change(function(){
            var pro = $("#addrpro option:selected").text();
            pro = pro == '请选择' ? '' : pro;
            //自动设置经营地域
            $("#areapro").val(pro).trigger('change');
            //拼装地址
            $('#address').val(pro + ' ');
            $("#addrpro").unbind('change');
        });
    });
    $("#addrcity").click(function(){
        $(this).change(function(){
            var pro = $("#addrpro option:selected").text();
            var city = $("#addrcity option:selected").text();
            city = city == '请选择' ? '' : city;
            //自动设置经营地域
            $("#areacity").val(city).trigger('change');
            //拼装地址
            $('#address').val(pro + ' ' + city + ' ');
            $("#addrpro").unbind('change');
            $("#addrcity").unbind('change');
        });
    });
    $("#addrzone").click(function() {
        $(this).change(function () {
            var pro = $("#addrpro option:selected").text();
            var city = $("#addrcity option:selected").text();
            var zone = $("#addrzone option:selected").text();
            zone = zone == '请选择' ? '' : zone;
            //自动设置经营地域
            $("#areazone").val(zone).trigger('change');
            //拼装地址
            $('#address').val(pro + ' ' + city + ' ' + zone + ' ');
            $("#addrpro").unbind('change');
            $("#addrcity").unbind('change');
            $("#addrzone").unbind('change');
        });
    });
    $("#addrstreat").click(function() {
        $(this).change(function () {
            var pro = $("#addrpro option:selected").text();
            var city = $("#addrcity option:selected").text();
            var zone = $("#addrzone option:selected").text();
            var streat = $("#addrstreat option:selected").text();
            streat = streat == '请选择' ? '' : streat;
            //拼装地址
            $('#address').val(pro + ' ' + city + ' ' + zone + ' ' + streat);
            $("#addrpro").unbind('change');
            $("#addrcity").unbind('change');
            $("#addrzone").unbind('change');
            $("#addrstreat").unbind('change');
        });
    });
}
 */


/**
 * 检测用户名是否已存在
 * @return boolean 是否可用
 */
function checkUsername(){
    var username = $.trim($('#username').val());
    if (username.length >= 5) {
        var sres = userRes.checkUsername(username, 1);
        if (sres) {
            if (sres.result) {
                $('#tips_username').html(sres.msg).css('color', "#E56762").show();
                $('#refuse_memo').val(sres.msg);
                return false;
            } else {
                //$('#tips_username').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_username').hide();
                return true;
            }
        }
    }
    return false;
}


/**
 * 检测公司名是否已存在
 */
function checkName(){
    var name = $.trim($('#name').val());
    if (name.length >= 3) {
        var sres = resCustom.checkName(name, 1);
        if (sres) {
            if (sres.result) {
                $('#tips_name').html(sres.msg).css('color', "#E56762").show();
                $('#refuse_memo').val(sres.msg);
            } else {
                //$('#tips_name').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_name').hide();
            }
        }
    }
}