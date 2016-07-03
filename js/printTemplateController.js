var res = new restCompanyRepository();


/**
 * 初始加载数据
 */
$(function () {
    var msg = cookieUtil("userprofile");
    if (msg != null) {
        //msg = JSON.parse(msg);
        //console.log(msg);
        $('input[name="tpl"]').each(function(){
            if ($(this).val() == printTpl){
                $(this).attr('checked', true);
                return true;
            }
        });
    }
});



/**
 * 保存模版选择
 */
function save(){
    var print_tpl = $('input[name="tpl"]:checked').val();
    var msg = res.setPrintTemplate(print_tpl);
    return msg;
}



