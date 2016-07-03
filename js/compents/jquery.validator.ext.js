 /**
 * 表单验证扩展
 */


// 电话格式验证
 jQuery.validator.addMethod("phone", function (value, element) {
         var phone = /^0\d{2,3}-\d{7,8}$/;
         return this.optional(element) || (phone.test(value));
     },
     "电话格式不正确，应该像这样：0371-68787027");

 //手机格式验证
 jQuery.validator.addMethod("mobile", function (value, element) {
     var mobile = /^1[3|4|5|7|8]\d{9}$/;
     return this.optional(element) || (mobile.test(value));
 }, "手机格式不正确，应该像这样：13066668888");

 //邮箱格式验证
 jQuery.validator.addMethod("mail", function (value, element) {
     var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
     return this.optional(element) || (mail.test(value));
 }, "邮箱格式不正确，应该像这样：admin@ms9d.com");

 //密码验证
 jQuery.validator.addMethod("regexPassword", function(value, element) {
     return this.optional(element) || /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
 }, "一个大写，一个小写，一个符号");

 //身份证
 jQuery.validator.addMethod("idCard", function (value, element) {
     var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
     var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;//(18位)
     return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
 }, "身份证格式不正确，请输入正确的身份证号码");

 // 金额
 jQuery.validator.addMethod("ePrice", function (value, element) {
     var ePrice=/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
     return this.optional(element) || (ePrice.test(value));
 }, "金额格式错误");