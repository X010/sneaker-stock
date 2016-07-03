var resGoods = new restGoodsRepository();
var resSupplier = new supplierRepository();
var userRes = new restUserRepository();

var cid = -1;

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

    $('#name').blur(function(){
        checkName();
    });

    //电话联动输入
    $('#contactor_phone').keyup(function(){
        $('#phone').val($(this).val());
    }).blur(function(){
        $('#phone').blur();
    });

    addTooltip("em.help", "#wg-tooltip", "data-help");

    formValidator();
    //updateRegion();
    autoCheckBox();
});

/* ---------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

/**
 * 注册客户公司
 */
function regSupplierCompany() {
    var ret = {};

    var my_period = $("#my_period").val();
    var my_auto_delete = $("#my_auto_delete").val();
    var my_discount = $("#my_discount").val();
    my_discount = (parseFloat(my_discount) / 100).toFixed(4);
    var name = $("#name").val();
    var simple_name = $("#simple_name").val();

    //地址
    if (!$('#addrpro').val() || !$('#addrcity').val() || !$('#addrzone').val()) {
        ret = '请选择公司所在的省市区';
    }
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
        var address = addrpro + ' ' + addrcity + ' ' + addrzone + ' ' + addrstreat + ' ' + $("#address").val();
        //var address = $("#address").val();

        var type = $("#type").val();
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
        //console.log(scope);

        var params = {
            "my_period": my_period,
            "my_auto_delete": my_auto_delete,
            "my_discount": my_discount,
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
            //"basedate": basedate,
            "gtids": gtids,
            "memo": memo
        };

        ret = resSupplier.register(params);
    } else {
        runnerAlert('操作提示', ret);
        ret = null;
    }
    return ret;
}


/**
 * 表单验证
 */
function formValidator() {
    var validator = $("#companyForm").validate({
        rules: {
            my_period:{
                required:true,
                min:0,
                number:true
            },
            my_auto_delete:{
                required:true,
                min:0,
                max:365,
                number:true
            },
            my_discount:{
                required:true,
                min:0,
                max:100,
                number:true
            },
            name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            'gt[]': {required: true,minlength: 1},
            //simple_name: {maxlength: 5},
            address: {maxlength: 50},
            //username: {required: true, mobile: []},
            //password: {required: true, minlength: 6},
            type: {required: true},
            tax_no: {minlength: 15, maxlength: 18},
            license: {minlength: 13, maxlength: 18},
            account_no: {maxlength: 18, number: true},
            fax: {phone: []},
            //phone: {mobile: []},
            lawrep: {maxlength: 20},
            contactor: {required: true, maxlength: 20},
            contactor_phone: {required: true, mobile: []},
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
            my_period:{
                required:"请填写账期天数,0表示现结",
                min:"账期天数只能为整数",
                number:"账期天数只能为整数"
            },
            my_auto_delete:{
                required:"请填写订单有效期天数",
                min:"天数不能小于0",
                max:"不能大于365天",
                number:"天数只能为整数"
            },
            my_discount:{
                required:"请填写折扣",
                min:"折扣不能小于0 %",
                max:"折扣不能大于100 %",
                number:"折扣只能是数字"
            },
            name: {
                required: "请填写公司名称",
                minlength: "公司名称最少需要2个字",
                maxlength: "公司名称最多不要超过20个字",
            },
            'gt[]': {required: "请选择经营范围", minlength: "至少选择一个经营范围"},
            //simple_name: {maxlength: "公司简称最多输入6个字"},
            //username: {required: "采购员电话必须设置", minlength: "电话号码需不少于8位"},
            //password: {required: "采购员密码必须设置", minlength: "登录密码需不少于6位"},
            type: {required: "请选择公司类型"},
            address: {maxlength: "公司地址最多输入50个字"},
            tax_no: {minlength: "企业税号必须是15位数字", maxlength: "企业税号必须是18位数字"},
            license: {minlength: "营业执照注册号最少13位数字", maxlength: "营业执照注册号最多18位数字"},
            account_no: {maxlength: "银行账号最多输入18个数字", number: "银行账号为纯数字"},
            lawrep: {maxlength: "企业法人最多输入20个字"},
            contactor: {required: "请填写联系人姓名", maxlength: "联系人姓名最多输入20个字"},
            contactor_phone: {required: "请填写联系人电话", maxlength: "联系人电话最多输入20个字"},
            basedate: {required: "请填写基准日",maxlength: "只能设置1～28", min: "日期不能小于1", max: "日期不能大于28", number: "只能设置数字1～28"},
            memo: {maxlength: "备注信息最多输入200个字"},
        },
        success: function (element) {
            if (element.attr("name") == "my_period"){
                $("#periodError").empty();
            } else if (element.attr("name") == 'gt[]'){
                $("#gtError").empty();
            } else if (element.attr("name") == 'my_auto_delete'){
                $("#auto_deleteError").empty();
            } else if (element.attr("name") == 'my_discount'){
                $("#discountError").empty();
            } else{element.parent().find('LABEL').remove();}
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "my_period"){
                $("#periodError").text(error.text());
            } else if (element.attr("name") == 'gt[]') {
                $("#gtError").text(error.text());
            } else if (element.attr("name") == 'my_auto_delete'){
                $("#auto_deleteError").text(error.text());
            }  else if (element.attr("name") == 'my_discount'){
                $("#discountError").text(error.text());
            } else {
                if(error.text() != '')  error.appendTo(element.parent());
            }
        },
        submitHandler: function () {
            var sres = regSupplierCompany();
            if (sres != null) {
                noticeFrame(42, 'refrush');
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
 * 检测公司名是否已存在
 */
function checkName(){
    var name = $('#name').val();
    if (name.length >= 3) {
        var sres = resSupplier.checkName(name);
        if (sres) {
            if (sres.result) {
                $('#tips_name').html('公司名 ' + name + ' 已被占用!').css('color', "#E56762").show();
            } else {
                //$('#tips_name').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_name').hide();
            }
        }
    }
}