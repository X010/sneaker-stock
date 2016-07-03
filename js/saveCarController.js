var carRes = new restCarRepository();

var edit = 0;
var page;

/**
 * 初始加载数据
 */
$(function () {
    page = getUrlParam("page");
    page = page ? page : 1;
    var action = getUrlParam('action');
    var id = getUrlParam('id');

    edit = id;
    //修改
    if (edit){
        var data = carRes.findById(id);
        $("#license").val(data.license);
        $("#ton").val(data.ton);
        $("#style").val(data.style);
        $("#model").val(data.model);
        $("#memo").val(data.memo);
        $("#btndiv-Off").show();
    }



    //按钮权限
    if (action != 'new' && !checkPower(10802)) { //没有修改权限
        $('#btn-save').remove();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
        $("textarea").attr('disabled', 'disabled');
    }
    if (action == 'new' && !checkPower(10801)) { //没有新建权限
        $('#btn-save').remove();
        $("input").attr('disabled', 'disabled');
        $("select").attr('disabled', 'disabled');
        $("textarea").attr('disabled', 'disabled');
    }
    if (!checkPower(10803)) { //没有删除权限
        $("#btndiv-Off").remove();
        //$("#btndiv-On").remove();
    }

    checkForm();

    autoCheckBox();

});


/**
 * 保持数据
 */
function save() {
    var license = $("#license").val().replaceAll(' ', '');
    var ton = $.trim($("#ton").val());
    var style = $.trim($("#style").val());
    var model = $.trim($("#model").val());
    var memo = $.trim($("#memo").val());

    if (edit > 0) {
        //修改
        var postData = {
            "license": license,
            "ton": ton,
            "style": style,
            "model": model,
            "memo": memo,
        };
        var sres = carRes.edit(edit, postData);
        if (sres != null) {
            noticeFrame(47, 'refrush', page);
            runnerConfirem("操作提示", "保存成功");
        }
    } else {
        //新建
        var postData = {
            "license": license,
            "ton": ton,
            "style": style,
            "model": model,
            "memo": memo,
        };
        var sres = carRes.add(postData);
        if (sres != null) {
            noticeFrame(47, 'refrush', page);
            //runnerConfirem("操作提示", "新建成功");
            runnerConfiremUrl("操作提示", "新建成功", false, "/mainframe/baseinfo/saveCar.html?action=new&iframeid=477&iframename=" + encodeURI("新建车辆"));
        }
    }
}



/**
 * 删除车辆
 */
function deleteCar() {
    if (confirm("注意：删除后不可恢复。\n确认删除该车辆？")) {
        var msg = carRes.delete(edit);
        if (msg != null) {
            noticeFrame(47, 'refrush', page);
            runnerConfirem("操作提示", "删除成功");
        }
    }
}

/**
 * 表单验证
 */
function checkForm() {
    var validator = $("#carForm").validate({
        rules: {
            license: {
                required: true,
                minlength: 7,
                maxlength: 10,
            },
            ton: {
                required: true,
                minlength: 1,
                maxlength: 5,
                number: true
            },
            style: {required: true},
        },
        messages: {
            license: {
                required: "请输入车牌号",
                minlength: "请输入完整车牌号",
                maxlength: "请输入正确车牌号",
            },
            ton: {
                required: '请输入车辆载重吨数',
                minlength: "请输入车辆载重吨数",
                maxlength: "请输入正确载重吨数",
                number: '请输入正确载重吨数'
            },
            style: {required: '请输入车辆类型'},
        },
        success: function (element) {
            if (element.attr("name") == 'license'){
                $("#licenseError").empty();
            } else if (element.attr("name") == 'ton') {
                $("#tonError").empty();
            } else{element.parent().find('label').remove();}
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == 'license'){
                $("#licenseError").text(error.text());
            } else if (element.attr("name") == 'ton'){
                $("#tonError").text(error.text());
            } else {
                if(error.text() != '') error.appendTo(element.parent());
            }

        },
        submitHandler: function () {
            save();
            //alert("保存成功!");
        },
    });
}

