var storeRes = new restStoreRepository();
var id;
var areatype; //1全国 2省级 3市级 4区级
var areastat= {'type':'','sheng':'','shi':'','qu':''};
var opt = 'create';
var page;

/**
 * 出货地域限制
 * @param type
 * @param keep
 */
function changeOutArea(type, keep){
    keep = keep != false;
    areatype = type;
    if (type == 2){ //省级限制
        $('#out_area1').attr('checked', 'checked');
        $('#out_area2').removeAttr('checked');
        $('#out_area3').removeAttr('checked');
        $('#region1 select').removeAttr('disabled');
        $('#region2 select').attr('disabled', 'disabled');
        $('#region3 select').attr('disabled', 'disabled');
        $('#btn-add1').show();
        $('#btn-add2').hide();
        $('#btn-add3').hide();
    } else if (type == 3) {//市级限制
        $('#out_area1').removeAttr('checked');
        $('#out_area2').attr('checked', 'checked');
        $('#out_area3').removeAttr('checked');
        $('#region1 select').attr('disabled', 'disabled');
        $('#region2 select').removeAttr('disabled');
        $('#region3 select').attr('disabled', 'disabled');
        $('#btn-add1').hide();
        $('#btn-add2').show();
        $('#btn-add3').hide();
    } else if (type == 4){//区级限制
        $('#out_area1').removeAttr('checked');
        $('#out_area2').removeAttr('checked');
        $('#out_area3').attr('checked', 'checked');
        $('#region1 select').attr('disabled', 'disabled');
        $('#region2 select').attr('disabled', 'disabled');
        $('#region3 select').removeAttr('disabled');
        $('#btn-add1').hide();
        $('#btn-add2').hide();
        $('#btn-add3').show();
    }
    //keep || $('#area').html('');
}

/**
 * 添加某个地域
 * @param area
 * @param fpro
 * @param fcit
 */
function addArea(area,fpro,fcit){
    if (area){
        var add = 1;
        $('#area span').each(function(){
            if ($(this).find('em').html() == area){
                add = 0;
            }
        });
        if(areatype != areastat.type){
            $('#area').empty();
            areastat.type = areatype;
        }
        if(fpro && areatype == 3 && areastat.sheng != fpro){
            $('#area').empty();
            areastat.sheng = fpro;
        }
        if(fcit && areatype == 4 && areastat.shi != fcit){
            $('#area').empty();
            areastat.shi = fcit;
        }
        if (add) {
            var html_area = '<span class="label label-info label-lg"><em>' + area + '</em> <a class="fa fa-remove" href="javascript:removeArea(\'' + area + '\');"></a></span>';
            $('#area').append(html_area);
        }
    }
}

/**
 * 删除某个地域
 * @param area
 */
function removeArea(area){
    //console.log("remove");
    $('#area span').each(function(){
        if ($(this).find('em').html() == area){
            $(this).remove();
        }
    });
}

/* -------------------------------------- 华丽丽的分割线 ----------------------------------------- */

/**
 * 初始加载数据
 */
$(function () {

    //地区选择联动菜单
    $('#region1').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province'],  // selects 为数组形式，请注意顺序
    });
    $('#region2').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province', 'city'],  // selects 为数组形式，请注意顺序
    });
    $('#region3').cxSelect({
        //url: '/js/compents/city.json',
        selects: ['province', 'city', 'area'],  // selects 为数组形式，请注意顺序
    });

    //绑定事件:切换地域级别
    $('#out_area1').click(function(){
        changeOutArea(2, false);
        $('#li_region1').show();
        $('#li_region2').hide();
        $('#li_region3').hide();
    });
    $('#out_area2').click(function(){
        changeOutArea(3, false);
        $('#li_region1').hide();
        $('#li_region2').show();
        $('#li_region3').hide();
    });
    $('#out_area3').click(function(){
        changeOutArea(4, false);
        $('#li_region1').hide();
        $('#li_region2').hide();
        $('#li_region3').show();
    });

    //绑定事件:地域切换处理
    //WARNNING: 此处逻辑很容易出bug,建议别尝试优化此处逻辑!!
    $('#areapro2').click(function(){
        $(this).attr('checked', 'checked');
        changeOutArea(3, false);
    });
    $('#areapro3').click(function(){
        $(this).attr('checked', 'checked');
        changeOutArea(4, false);
    });
    $('#areacity3').click(function(){
        $(this).change(function(){
            changeOutArea(4, false);
        });
    });

    //绑定事件:添加地域
    $('#btn-add1').click(function(){
        changeOutArea(2, true);
        addArea($('#areapro1').val(),'','');
    });
    $('#btn-add2').click(function(){
        changeOutArea(3, true);
        addArea($('#areacity2').val(),$('#areapro2').val(),$('#areacity2').val());
    });
    $('#btn-add3').click(function(){
        changeOutArea(4, true);
        $('#areapro3').val();
        $('#areacity3').val();
        addArea($('#areazone3').val(),$('#areapro3').val(),$('#areacity3').val());
    });

    page = getUrlParam("page");
    page = page ? page : 1;
    id = getUrlParam("id");
    if (id) {
        //修改编辑
        opt = 'update';
        var data = storeRes.findById(id);
        if (data != null) {
            $("#code").val(data.code);
            $("#name").val(data.name);
            $("#address").val(data.address);
            $("#contactor").val(data.contactor);
            $("#phone").val(data.phone);

            //出货地域限制
            areatype = data.areatype;
            areastat.type = areatype;
            changeOutArea(areatype, false);

            //显示已选中区域
            if (data.store_area) {
                var num = areatype - 1;
                if (areatype == 2) { //省级
                    for (k in data.store_area){
                        addArea(data.store_area[k].areapro);
                    }
                    $('#li_region1').show();
                    $('#li_region2').hide();
                    $('#li_region3').hide();
                } else if (areatype == 3) {//市级
                    $("#areapro" + num).attr("data-value", data.store_area[0].areapro);
                    areastat.sheng = data.store_area[0].areapro;
                    for (k in data.store_area){
                        addArea(data.store_area[k].areacity);
                    }
                    $('#li_region1').hide();
                    $('#li_region2').show();
                    $('#li_region3').hide();
                } else if (areatype == 4) {//区级
                    $("#areapro" + num).attr("data-value", data.store_area[0].areapro);
                    $("#areacity" + num).attr("data-value", data.store_area[0].areacity);
                    areastat.sheng = data.store_area[0].areapro;
                    areastat.shi = data.store_area[0].areacity;
                    for (k in data.store_area){
                        addArea(data.store_area[k].areazone);
                    }
                    $('#li_region1').hide();
                    $('#li_region2').hide();
                    $('#li_region3').show();
                }
            }

            //仓库状态设置
            if (data.status == 1) {
                $('#status0').removeAttr('checked');
                $('#status1').attr('checked', 'checked');
            } else {
                $('#status0').attr('checked', 'checked');
                $('#status1').removeAttr('checked');
            }
            //库存管理开关设置
            if (data.isreserve == 1) {
                $('#isreserve0').removeAttr('checked');
                $('#isreserve1').attr('checked', 'checked');
            } else {
                $('#isreserve0').attr('checked', 'checked');
                $('#isreserve1').removeAttr('checked');
            }

        }
        $('#addSelfPage').hide();
        $('#editSelfPage').show();
        //按钮权限
        if (!checkPower(10201)){
            $("input").attr('disabled', 'disabled');
            $("select").attr('disabled', 'disabled');
            $("textarea").attr('disabled', 'disabled');
            $("button").attr('disabled', 'disabled');
            $("#area a").attr('href', '#');

            $("#areapro1").change(function(){
                $("#areapro1").attr("disabled", 'disabled');
            });
            $("#areapro2").change(function(){
                $("#areapro2").attr("disabled", 'disabled');
            });
            $("#areacity2").change(function(){
                $("#areacity2").attr("disabled", 'disabled');
            });
            $("#areapro3").change(function(){
                $("#areapro3").attr("disabled", 'disabled');
            });
            $("#areacity3").change(function(){
                $("#areacity3").attr("disabled", 'disabled');
            });
            $("#areazone3").change(function(){
                $("#areazone3").attr("disabled", 'disabled');
            });
        }
    } else {
        //新建
        opt = 'create';
        $('#addSelfPage').show();
        $('#editSelfPage').hide();
    }
    addTooltip("em.help", "#wg-tooltip", "data-help");

    formValidator();

});

/* ---------------------------------------- 华丽丽的分割线 --------------------------------------------------- */

/**
 * 保存数据
 */
function saveStore(opt, type) {
    //var code = $("#code").val();
    var name = $("#name").val();
    var address = $("#address").val();
    var contactor = $("#contactor").val();
    var phone = $("#phone").val();
    var areapro = '';
    var areacity = '';
    var areazone = '';
    $('#area span em').each(function(){
        //console.log(type);
        if (type == 2){
            areapro += $(this).text() + ',';
        } else if (type == 3){
            areapro = $("#areapro2").val();
            areacity += $(this).text() + ',';
        } else if (type == 4){
            areapro = $("#areapro3").val();
            areacity = $("#areacity3").val();
            areazone += $(this).text() + ',';
        }
    });
    var status = $("#status1").attr('checked') == 'checked' ? 1 : 0;
    var isreserve = $("#isreserve1").attr('checked') == 'checked' ? 1 : 0;

    var item = {
        //"code": code,
        "name": name,
        "address": address,
        "phone": phone,
        "contactor": contactor,
        "areapro": areapro,
        "areacity": areacity,
        "areazone": areazone,
        "status": status,
        "isreserve": isreserve,
    };

    if (opt == 'create'){
        var msg = storeRes.add(item);
    } else {
        var msg = storeRes.edit(id, item);
    }
    return msg;
}


/**
 * 表单验证
 */
function formValidator() {
    var validator = $("#storeForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 15,
            },
            address: {
                required: true,
                maxlength: 100
            },
            phone: {
                required: true,
                mobile: []
            },
            contactor: {
                required: true,
                maxlength: 20
            },
        },
        messages: {
            name: {
                required: "请输入仓库名称",
                minlength: "仓库名称最少需要2个字",
                maxlength: "仓库名称最多不要超过15个字",
            },
            address: {
                required: "请输入仓库详细地址",
                maxlength: "仓库地址最多输入100个字"
            },
            phone: {
                required: "请输入仓库联系人电话",
                maxlength: "电话最多输入20个字"
            },
            contactor: {
                required: "请输入仓库联系人姓名",
                maxlength: "联系人最多输入20个字"
            },

            /*
            basedate: {
                required: "仓库名称是必须输入的内容，请您输入",
                maxlength: "只能设置1～28", min: "日期不能小于1", max: "日期不能大于28", number: "只能设置数字1～28"
            },*/
        },
        submitHandler: function () {
            var sres = saveStore(opt, areastat.type);
            if (sres != null) {
                if (opt == 'create'){
                    noticeFrame(46, 'refrush', page);
                    //runnerConfirem("操作提示", "创建成功");
                    runnerConfiremUrl("操作提示", "创建成功", false, "/mainframe/baseinfo/saveStore.html?iframeid=466&iframename=" + encodeURI("新建仓库"));

                } else {
                    noticeFrame(46, 'refrush', page);
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

