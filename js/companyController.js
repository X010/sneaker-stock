var res = new restCompanyRepository();
var resCustom = new customRepository();
var resSupplier = new supplierRepository();
var resGoods = new restGoodsRepository();
var userRes = new restUserRepository();


var cid = -1;
var relation_id; //客户关系ID
var page;
var username_tmp; //用于对比是否被修改
var name_tmp; //用于对比是否被修改

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

/**
 * 向UL中添加业务员
 * @param checked 是否默认业务员
 * @param id 业务员关系ID
 * @param suname 业务员名字
 */
function addSalesmanToUL(checked, id, suname){
    var checked = checked ? ' checked="checked" ' : '';
    var html_li = '<li class="item-checkbox"><label><input name="salesman_defalut" '+checked+' type="radio" value="'+id+'">'+suname+' <a name="a-removeSalesman" href="javascript:removeSalesman('+id+');">×</a></label></li>';
    $('#salesman ul li:last').before(html_li);
}

/* ---------------------------------------------- 华丽丽的分割线 ---------------------------------------------------- */

/**
 * 初始加载数据
 */
$(function () {
    //地区选择联动菜单
    $('#addr').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province', 'city', 'area', 'streat'],
    });
    //地区选择联动菜单
    $('#region').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province', 'city', 'area'],

    });

    getAllGoodsType();
    autoChangeAddress(); //两组地域联动

    for (var i=1; i<29; i++){
        $('#basedate').append('<option value="'+i+'">每月 '+i+'号</option>');
    }
    for (var i=20; i<29; i++){
        $('#financedate').append('<option value="'+i+'">每月 '+i+'号</option>');
    }

    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam("action");
    var ccid = getUrlParam("id");
    if (action == 'view') {
        //加载查看数据

        //延迟加载的禁用
        $("#addrpro").change(function(){
            $("#addrpro").attr("disabled", 'disabled');
        });
        $("#addrcity").change(function(){
            $("#addrcity").attr("disabled", 'disabled');
        });
        $("#addrzone").change(function(){
            $("#addrzone").attr("disabled", 'disabled');
        });
        $("#addrstreat").change(function(){
            $("#addrstreat").attr("disabled", 'disabled');
        });
        $("#areapro").change(function(){
            $("#areapro").attr("disabled", 'disabled');
        });
        $("#areacity").change(function(){
            $("#areacity").attr("disabled", 'disabled');
        });
        $("#areazone").change(function(){
            $("#areazone").attr("disabled", 'disabled');
        });

        var data = res.findById(ccid);
        if (data != null) {
            $("#code").val(data.code);
            $("#name").val(data.name);
            $("#simple_name").val(data.simple_name);
            var address_arr = data.address ? data.address.split(' ') : ['','','','',''];
            $("#addrpro").attr("data-value",address_arr[0]).trigger('change');
            $("#addrcity").attr("data-value",address_arr[1]).trigger('change');
            $("#addrzone").attr("data-value",address_arr[2]).trigger('change');
            $("#addrstreat").attr("data-value",address_arr[3]).trigger('change');
            $("#address").val(address_arr[4]);
            $("#type").val(data.type);
            $("#areapro").attr("data-value",data.areapro).trigger('change');
            $("#areacity").attr("data-value",data.areacity).trigger('change');
            $("#areazone").attr("data-value",data.areazone).trigger('change');
            $("#tax_no").val(data.tax_no);
            $("#account_no").val(data.account_no);
            $("#license").val(data.license);
            $("#fax").val(data.fax);
            $("#phone").val(data.phone);
            $("#lawrep").val(data.lawrep);
            $("#contactor").val(data.contactor);
            $("#contactor_phone").val(data.contactor_phone);
            $("#email").val(data.email);
            $("#basedate").val(data.basedate);
            $("#memo").val(data.memo);
            if (data.gtids){
                var scope = data.gtids.split(',');
                for (i in scope){
                    $('#gt_' + scope[i]).attr('checked', 'checked');
                }
            }
            cid = ccid;
        }

        //禁用表单
        $("#memo").attr("disabled", 'disabled');
        $('input').attr('disabled', 'disabled').removeAttr('placeholder');
        $('select').attr('disabled', 'disabled');

        $("#btndiv-save").hide();
        $("#btndiv-modify-supplier").hide();
        $("#btndiv-modify-custom").hide();
        $("#btndiv-cancel").show();

    } else if (action == 'viewSupplier') {
        //查看供应商
        $('li[name="li_supplier"]').show(); //显示供应商设置
        $('li[name="li_contactor"]').hide(); //隐藏公司默认的联系人和电话

        var data = resSupplier.findById(ccid);
        if (data != null) {
            //供应商属性
            $('#period_sup').val(data.supplier.period);
            $('#discount').val(float2percent(data.supplier.discount));
            $('#auto_delete').val(data.supplier.auto_delete);
            $("#contactor_sup").val(data.supplier.contactor);
            $("#contactor_phone_sup").val(data.supplier.contactor_phone);
            relation_id = data.supplier.id;

            $("#code").val(data.code);
            $("#name").val(data.name);
            $("#simple_name").val(data.simple_name);
            var address_arr = data.address ? data.address.split(' ') : ['','','','',''];
            $("#addrpro").attr("data-value",address_arr[0]).trigger('change');
            $("#addrcity").attr("data-value",address_arr[1]).trigger('change');
            $("#addrzone").attr("data-value",address_arr[2]).trigger('change');
            $("#addrstreat").attr("data-value",address_arr[3]).trigger('change');
            $("#address").val(address_arr[4]);
            $("#type").val(data.type);
            $("#areapro").attr("data-value",data.areapro).trigger('change');
            $("#areacity").attr("data-value",data.areacity).trigger('change');
            $("#areazone").attr("data-value",data.areazone).trigger('change');
            $("#tax_no").val(data.tax_no);
            $("#account_no").val(data.account_no);
            $("#license").val(data.license);
            $("#fax").val(data.fax);
            $("#phone").val(data.phone);
            $("#lawrep").val(data.lawrep);
            $("#contactor").val(data.contactor);
            $("#contactor_phone").val(data.contactor_phone);
            $("#email").val(data.email);
            $("#basedate").val(data.basedate);
            $("#memo").val(data.memo);
            if (data.gtids){
                var scope = data.gtids.split(',');
                for (i in scope){
                    $('#gt_' + scope[i]).attr('checked', 'checked');
                }
            }
            cid = ccid;

            //除非可编辑(创建者),否则禁用表单
            if (data.allow_edit != 1){
                //延迟加载的禁用
                $("#addrpro").change(function(){
                    $("#addrpro").attr("disabled", 'disabled');
                });
                $("#addrcity").change(function(){
                    $("#addrcity").attr("disabled", 'disabled');
                });
                $("#addrzone").change(function(){
                    $("#addrzone").attr("disabled", 'disabled');
                });
                $("#addrstreat").change(function(){
                    $("#addrstreat").attr("disabled", 'disabled');
                });
                $("#areapro").change(function(){
                    $("#areapro").attr("disabled", 'disabled');
                });
                $("#areacity").change(function(){
                    $("#areacity").attr("disabled", 'disabled');
                });
                $("#areazone").change(function(){
                    $("#areazone").attr("disabled", 'disabled');
                });

                $("#memo").attr("disabled", 'disabled');
                $('input').attr('disabled', 'disabled').removeAttr('placeholder');
                $('select').attr('disabled', 'disabled');
            }
            //编辑项不禁用
            $('li[name="li_supplier"] input').removeAttr('disabled');
            //$("#basedate").removeClass("disabled"); //自处css有问题,先去掉

        }
        $("#btndiv-save").hide();
        $("#btndiv-modify-supplier").show();
        $("#btndiv-modify").hide();
        $("#btndiv-cancel").hide();

    } else if (action == 'viewCustom') {
        //查看客户
        $('li[name="li_custom"]').show(); //显示客户设置
        $('li[name="li_contactor"]').hide(); //隐藏公司默认的联系人和电话
        bindAutoCompleteCommon('suname', 'user');
        bindSelfStore('sid');
        $('#sid').prepend('<option value="">- 请选择 -</option>');

        var data = resCustom.findById(ccid);
        if (data != null) {
            //客户属性
            $('#cctype').val(data.customer.cctype);
            $('#period').val(data.customer.period);
            $('#sid').val(data.customer.sid);
            $("#contactor_cus").val(data.customer.contactor);
            $("#contactor_phone_cus").val(data.customer.contactor_phone);
            relation_id = data.customer.id;
            //我方业务员
            for (var i=0; i<data.salesman_list.length; i++){
                var salesman = data.salesman_list[i];
                var checked = salesman.type == 1;
                addSalesmanToUL(checked, salesman.id, salesman.suname);
            }

            $("#code").val(data.code);
            $("#name").val(data.name);
            $("#simple_name").val(data.simple_name);
            var address_arr = data.address ? data.address.split(' ') : ['','','','',''];
            $("#addrpro").attr("data-value",address_arr[0]).trigger('change');
            $("#addrcity").attr("data-value",address_arr[1]).trigger('change');
            $("#addrzone").attr("data-value",address_arr[2]).trigger('change');
            $("#addrstreat").attr("data-value",address_arr[3]).trigger('change');
            $("#address").val(address_arr[4]);
            //$("#address").val(data.address);
            //$('#addr').html($('#address'));
            $("#type").val(data.type);
            $("#areapro").attr("data-value",data.areapro);
            $("#areacity").attr("data-value",data.areacity);
            $("#areazone").attr("data-value",data.areazone);
            $("#tax_no").val(data.tax_no);
            $("#account_no").val(data.account_no);
            $("#license").val(data.license);
            $("#fax").val(data.fax);
            $("#phone").val(data.phone);
            $("#lawrep").val(data.lawrep);
            $("#contactor").val(data.contactor);
            $("#contactor_phone").val(data.contactor_phone);
            $("#email").val(data.email);
            $("#basedate").val(data.basedate);
            $("#memo").val(data.memo);
            if (data.gtids){
                var scope = data.gtids.split(',');
                for (i in scope){
                    $('#gt_' + scope[i]).attr('checked', 'checked');
                }
            }
            cid = data.id;

            //非创建者
            if (data.allow_edit != 1){
                //禁用表单
                $("#addrpro").change(function(){
                    $("#addrpro").attr("disabled", 'disabled');
                });
                $("#addrcity").change(function(){
                    $("#addrcity").attr("disabled", 'disabled');
                });
                $("#addrzone").change(function(){
                    $("#addrzone").attr("disabled", 'disabled');
                });
                $("#addrstreat").change(function(){
                    $("#addrstreat").attr("disabled", 'disabled');
                });
                $("#areapro").change(function(){
                    $("#areapro").attr("disabled", 'disabled');
                });
                $("#areacity").change(function(){
                    $("#areacity").attr("disabled", 'disabled');
                });
                $("#areazone").change(function(){
                    $("#areazone").attr("disabled", 'disabled');
                });

                $("#memo").attr("disabled", 'disabled');
                $('input').attr('disabled', 'disabled').removeAttr('placeholder');
                $('select').attr('disabled', 'disabled');
                $('#item_phone').remove();
                $('#item_username').remove();
            } else { //是创建者
                //密码重置功能
                $('#username').val(data.username).blur(function(){
                    checkUsername();
                }).keydown(function(){
                    $(this).next('span').hide();
                });
                $('#name').blur(function(){
                    checkName();
                }).keydown(function(){
                    $(this).next('span').hide();
                });
                username_tmp = data.username;
                name_tmp = data.name;
                $('#item_username').show();
                $('#name').removeAttr('disabled');
                $('#resetPassword').removeAttr('disabled').removeClass("disabled").click(function(){
                    //runnerConfiremCommon('操作提示', '确定进行密码重置?', resetPassword);
                    resetPassword();
                });
            }
            //$('#username').attr("disabled", 'disabled');
            //编辑项不禁用
            $('li[name="li_custom"] input').removeAttr('disabled');
            $('li[name="li_custom"] select').removeAttr('disabled');
            //$("#basedate").removeClass("disabled"); //自处css有问题,先去掉

            /*如果客户是小B,则显示采购员账号(移到创建者可编辑逻辑中)
            if (!parseInt(data.iserp)){
                $('#username').val(data.username);
                $('#item_username').show();
                $('#resetPassword').removeAttr('disabled').removeClass("disabled").click(function(){
                    //runnerConfiremCommon('操作提示', '确定进行密码重置?', resetPassword);
                    resetPassword();
                });
            }*/
        }
        $("#btndiv-save").hide();
        $("#btndiv-modify-supplier").hide();
        $("#btndiv-modify-custom").show();
        $("#btndiv-cancel").hide();

    } else {
        //自己
        var data = res.findSelf();
        if (data != null) {
            $("#code").val(data.code);
            $("#name").val(data.name);
            $("#simple_name").val(data.simple_name);
            var address_arr = data.address ? data.address.split(' ') : ['','','','',''];
            $("#addrpro").attr("data-value",address_arr[0]).trigger('change');
            $("#addrcity").attr("data-value",address_arr[1]).trigger('change');
            $("#addrzone").attr("data-value",address_arr[2]).trigger('change');
            $("#addrstreat").attr("data-value",address_arr[3]).trigger('change');
            $("#address").val(address_arr[4]);
            $("#type").val(data.type);
            $("#areapro").attr("data-value",data.areapro);
            $("#areacity").attr("data-value",data.areacity);
            $("#areazone").attr("data-value",data.areazone);
            $("#tax_no").val(data.tax_no);
            $("#account_no").val(data.account_no);
            $("#license").val(data.license);
            $("#fax").val(data.fax);
            $("#phone").val(data.phone);
            $("#lawrep").val(data.lawrep);
            $("#contactor").val(data.contactor);
            $("#contactor_phone").val(data.contactor_phone);
            $("#email").val(data.email);
            $("#basedate").val(data.basedate);
            $("#financedate").val(data.financedate ? data.financedate : 0);
            $('#li_financedate').show();
            $("#memo").val(data.memo);
            if (data.gtids){
                var scope = data.gtids.split(',');
                for (i in scope){
                    $('#gt_' + scope[i]).attr('checked', 'checked');
                }
            }
            cid = data.id;
        }

        if (!checkPower(10101)){
            $("input").attr('disabled', 'disabled');
            $("select").attr('disabled', 'disabled');
            $("textarea").attr('disabled', 'disabled');

            //延迟加载的禁用
            $("#addrpro").change(function(){
                $("#addrpro").attr("disabled", 'disabled');
            });
            $("#addrcity").change(function(){
                $("#addrcity").attr("disabled", 'disabled');
            });
            $("#addrzone").change(function(){
                $("#addrzone").attr("disabled", 'disabled');
            });
            $("#addrstreat").change(function(){
                $("#addrstreat").attr("disabled", 'disabled');
            });
            $("#areapro").change(function(){
                $("#areapro").attr("disabled", 'disabled');
            });
            $("#areacity").change(function(){
                $("#areacity").attr("disabled", 'disabled');
            });
            $("#areazone").change(function(){
                $("#areazone").attr("disabled", 'disabled');
            });
        }
    }


    addTooltip("em.help", "#wg-tooltip", "data-help");

    formValidator();
    //updateRegion();
    autoCheckBox();

    //按钮权限
    if (!checkPower(10302)) {}
    if (!checkPower(10402)) {}
    if (!checkPower(10405)) {}
    if (!checkPower(10406)) {
        $('a[name="a-removeSalesman"]').remove();
    }
    if (!checkPower(10407)) {
        $('input[name="salesman_defalut"]').each(function(){
            if (!$(this).prop('checked')){
                $(this).remove();
            }
        });
    }
});

/* ---------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

/**
 * 拼装参数
 */
function buildParams(){
    var ret = {};
    var name = $("#name").val();
    var type = $("#type").val();

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

        var addrpro = $("#addrpro").val() ? $("#addrpro").val() : '';
        var addrcity = $("#addrcity").val() ? $("#addrcity").val() : '';
        var addrzone = $("#addrzone").val() ? $("#addrzone").val() : '';
        var addrstreat = $("#addrstreat").val() ? $("#addrstreat").val() : '';
        var address = addrpro + ' ' + addrcity + ' ' + addrzone + ' ' + addrstreat + ' ' + $("#address").val();
        //var address = $("#address").val();

        //经营区域
        var areapro = $("#areapro").val();
        var areacity = $("#areacity").val();
        var areazone = $("#areazone").val();

        var tax_no = $("#tax_no").val();
        var account_no = $("#account_no").val();
        var license = $("#license").val();
        var fax = $("#fax").val();
        var username = $("#username").val();
        var phone = $("#phone").val();
        var lawrep = $("#lawrep").val();
        var contactor = $("#contactor").val();
        var contactor_phone = $("#contactor_phone").val();
        var email = $("#email").val();
        var basedate = $("#basedate").val();
        var financedate = $("#financedate").val();
        var memo = $("#memo").val();
        var gtids = '';
        $('#goods_type li').each(function () {
            if ($(this).find('input').attr('checked') == 'checked') {
                gtids += $(this).find('input').val() + ',';
            }
        });
        //console.log(scope);

        ret = {
            //"code": code,
            "name": name,
            //"simple_name": simple_name,
            "address": address,
            "type": type,
            "areapro": areapro,
            "areacity": areacity,
            "areazone": areazone,
            "tax_no": tax_no,
            "account_no": account_no,
            "license": license,
            "fax": fax,
            "username": username,
            "phone": phone,
            "lawrep": lawrep,
            "contactor": contactor,
            "contactor_phone": contactor_phone,
            "email": email,
            "basedate": basedate ? basedate : 1,
            "financedate": financedate,
            "gtids": gtids,
            "memo": memo
        };
    }

    return ret;
}

/**
 * 更新本公司信息
 */
function updateCompany() {
    var params = buildParams();
    if (typeof(params) == 'string') {
        runnerAlert('操作提示', params);
    } else {
        var msg = res.updateSelf(params, cid);
    }
    return msg;
}


/**
 * 表单验证
 */
function formValidator() {
    var validator = $("#companyForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
            'gt[]': {required: true,minlength: 1},
            //simple_name: {maxlength: 6},
            address: {maxlength: 50},
            type: {required: true},
            tax_no: {minlength: 15, maxlength: 18},
            license: {minlength: 13, maxlength: 18},
            account_no: {maxlength: 18, number: true},
            fax: {phone: []},
            phone: {mobile: []},
            lawrep: {maxlength: 20},
            contactor: {required: true, maxlength: 20},
            contactor_phone: {required: true, mobile: []},
            contactor_sup: {required: true, maxlength: 20},
            contactor_phone_sup: {required: true},
            contactor_cus: {required: true, maxlength: 20},
            contactor_phone_cus: {required: true},
            email: {mail: []},
            basedate: {
                required: true,
                maxlength: 2,
                min: 1,
                max: 28,
                number: true
            },
            //pay_team_in: {maxlength: 5, number: true},
            //pay_team_out: {maxlength: 5, number: true},
            memo: {maxlength: 200}
        },
        messages: {
            name: {
                required: "请输入公司名称",
                minlength: "公司名称最少需要2个字",
                maxlength: "公司名称最多不超过20个字",
            },
            'gt[]': {required: "请选择经营范围", minlength: "至少选择一个经营范围"},
            type: {required: "请选择公司类型"},
            //simple_name: {maxlength: "公司简称最多输入6个字"},
            address: {maxlength: "公司地址最多输入50个字"},
            tax_no: {minlength: "企业税号必须是15位数字", maxlength: "企业税号必须是18位数字"},
            license: {minlength: "营业执照注册号最少13位数字", maxlength: "营业执照注册号最多18位数字"},
            account_no: {maxlength: "银行账号最多输入18个数字", number: "银行账号为纯数字"},
            lawrep: {maxlength: "企业法人最多输入20个字"},
            phone: {required: "用于接收系统短信，必须填写"},
            contactor: {required: "请填写联系人姓名", maxlength: "联系人姓名最多输入20个字"},
            contactor_phone: {required: "请填写联系人电话", maxlength: "联系人电话最多输入20个字"},
            contactor_sup: {required: "请填写联系人姓名", maxlength: "联系人姓名最多输入20个字"},
            contactor_phone_sup: {required: "请填写联系人电话"},
            contactor_cus: {required: "请填写联系人姓名", maxlength: "联系人姓名最多输入20个字"},
            contactor_phone_cus: {required: "请填写联系人电话"},
            basedate: {required: "请填写基准日",maxlength: "只能设置1～28", min: "日期不能小于1", max: "日期不能大于28", number: "只能设置数字1～28"},
            //pay_team_in: {maxlength: "进货付款期最多输入5个数字", number: "请注意进货付款期为纯数字，请重新输入。"},
            //pay_team_out: {maxlength: "出库付款期最多输入5个数字", number: "请注意出库付款期为纯数字，请重新输入。"},
            memo: {maxlength: "备注信息最多输入200个字"},
        },
        success: function (element) {
            if (element.attr("name") == 'basedate')
                $("#baseDateError").empty().remove();
            else if (element.attr("name") == 'gt[]')
                $("#gtError").empty().remove();
            else{element.parent().find('LABEL').remove();}
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == 'basedate')
                $("#baseDateError").text(error.text());
            else if(element.attr("name") == 'gt[]')
                $("#gtError").text(error.text());
            else {
                if(error.text() != '')
                    error.appendTo(element.parent());
            }
        },
        submitHandler: function () {
            var sres = updateCompany();
            if (sres != null) {
                runnerAlert("操作提示", "保存成功");
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
 * 重置客户采购员登录密码
 */
function resetPassword(){
    var data = res.resetPassword(cid);
    if (data != null) {
        runnerAlert("操作提示", "操作成功，密码已重置为：" + data.password);
    }
}



/**
 * 移除业务员
 */
function removeSalesman(id){
    if (confirm("确定移除该业务员?")) {
        var data = resCustom.removeSalesman(id);
        if (data != null) {
            $('input[name="salesman_defalut"]').each(function(){
                if ($(this).val() == id){
                    $(this).parent().parent().remove();
                }
                if ($(this).val() == data.default_id){
                    $(this).attr('checked', 'checked');
                }
            });
            noticeFrame(43, 'refrush', page);
            runnerAlert("操作提示", "移除成功");
        }
    }
}

/**
 * 添加业务员
 */
function addSalesman(){
    var suname = $('#suname').val().split('(')[0]; //剔除电话
    if (!checkAutoComplete('suid')) return false;
    var suid = $('#suid').val();
    var params = {
        'ccid': cid,
        'suid': suid,
    };
    var data = resCustom.addSalesman(params);
    if (data != null) {
        var checked = data.default_id == data.id;
        addSalesmanToUL(checked, data.id, suname);
        $('#suid').val('');
        $('#suname').val('');
        noticeFrame(43, 'refrush', page);
        //runnerAlert("操作提示", "添加成功");
    }
}

/**
 * 设置默认业务员
 */
function defalutSalesman(){
    var id;
    $('#salesman input[name="salesman_defalut"]').each(function(){
        if ($(this).prop('checked')){
            id = $(this).val();
        }
    });
    if (id) {
        var data = resCustom.defaultSalesman(id);
        if (data != null) {
            noticeFrame(43, 'refrush', page);
            runnerAlert("操作提示", "设置成功");
        }
    } else {
        runnerAlert("操作提示", "请先选择业务员");
    }
}


/**
 * 保存供应商修改
 */
function saveModifySupplier(){
    var currentData = buildParams();
    if (typeof(currentData) == 'string') {
        runnerAlert('操作提示', currentData);
        return false;
    } else {
        currentData['period'] = $.trim($("#period_sup").val());
        if (isNaN(currentData['period'])) {
            runnerAlert("操作提示", "请正确填写供应商账期");
            return;
        } else {
            currentData['period'] = num2total(currentData['period']);
        }
        currentData['discount'] = $.trim($("#discount").val());
        if (isNaN(currentData['discount'])) {
            runnerAlert("操作提示", "请正确填写供应商折扣");
            return;
        } else {
            currentData['discount'] = (parseFloat(currentData['discount']) / 100).toFixed(4);
        }
        currentData['auto_delete'] = $.trim($("#auto_delete").val());
        if (isNaN(currentData['auto_delete'])) {
            runnerAlert("操作提示", "请正确填写订单有效期");
            return;
        } else {
            currentData['auto_delete'] = num2total(currentData['auto_delete']);
        }
        currentData['contactor_sup'] = $.trim($("#contactor_sup").val());
        if (currentData['contactor_sup'] == '') {
            runnerAlert("操作提示", "请填写联系人姓名");
            return;
        }
        currentData['contactor_phone_sup'] = $.trim($("#contactor_phone_sup").val());
        if (currentData['contactor_phone_sup'] == '') {
            runnerAlert("操作提示", "请填写联系人电话");
            return;
        }
        var res = resSupplier.edit(relation_id, currentData);
        if (res != null) {
            noticeFrame(42, 'refrush', page);
            runnerConfirem("操作提示", "修改成功");
        }
    }
}


/**
 * 保存客户修改
 */
function saveModifyCustom(){
    var currentData = buildParams();
    if (typeof(currentData) == 'string') {
        runnerAlert('操作提示', currentData);
        return false;
    } else {
        currentData['cctype'] = $("#cctype").val();
        currentData['period'] = $.trim($("#period").val());
        if (currentData['period'] == '') {
            runnerAlert("操作提示", "请填写账期天数");
            return;
        }
        currentData['sid'] = $("#sid").val();
        if (!currentData['sid']) {
            runnerAlert("操作提示", "请选择出货仓库");
            return;
        }
        currentData['contactor_cus'] = $.trim($("#contactor_cus").val());
        if (currentData['contactor_cus'] == '') {
            runnerAlert("操作提示", "请填写联系人姓名");
            return;
        }
        currentData['contactor_phone_cus'] = $.trim($("#contactor_phone_cus").val());
        if (currentData['contactor_phone_cus'] == '') {
            runnerAlert("操作提示", "请填写联系人电话");
            return;
        }
        if ($('#item_username').length > 0 && $('#item_username').css('display') != 'none'){
            currentData['phone'] = $.trim($("#phone").val());
            //if (currentData['phone'] == '') {
            //    runnerAlert("操作提示", "请填写预留手机");
            //    return;
            //}
            currentData['username'] = $.trim($("#username").val());
            if (currentData['username'] == '') {
                runnerAlert("操作提示", "请填写登录账号");
                return;
            }
        } else {
            delete currentData['phone'];
            delete currentData['username'];
        }
        if (checkUsername()) {
            var res = resCustom.edit(relation_id, currentData);
            if (res != null) {
                noticeFrame(43, 'refrush', page);
                runnerConfirem("操作提示", "修改成功");
            }
        }
    }
}


/**
 * 检测用户名是否已存在
 * @return boolean 是否可用
 */
function checkUsername(){
    var username = $.trim($('#username').val());
    if (username.length >= 5 && username_tmp != username) {
        var sres = userRes.checkUsername(username);
        if (sres) {
            if (sres.result) {
                $('#tips_username').html('账号 ' + username + ' 已被占用!').css('color', "#E56762").show();
                return false;
            } else {
                //$('#tips_username').html('该账号可以使用.').css('color', "#1ACF06").show();
                $('#tips_username').hide();
                return true;
            }
        }
    }
    return true;
}


/**
 * 检测公司名是否已存在
 */
function checkName(){
    var name = $.trim($('#name').val());
    if (name.length >= 3 && name_tmp != name) {
        var sres = resCustom.checkName(name);
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