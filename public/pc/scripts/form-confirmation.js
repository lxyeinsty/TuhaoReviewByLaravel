$(function() {
    //响应式表格
    var $email = $('#email');
    var $v_code = $('#verification');
    (function() {
        $(window).on("resize", function() {
            if ($(this).width() < 430) {
                $email.attr("placeholder", "电子邮箱");
                $v_code.attr("placeholder","验证码");
            }else{
            	$email.attr("placeholder","");
            	$v_code.attr("placeholder","");
            }
        });

    }())
})
