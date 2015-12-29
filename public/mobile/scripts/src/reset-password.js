var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes');

$(function() {
    var emailInput = $('input[name="email"]'),
        newPwd = $('input[name="new-password"]'),
        pwdAgain = $('input[name="password-again"]'),
        passwordReg = /^[a-zA-Z]\w{5,15}$/;
    $('#submit').tap(function() {
        var email = emailInput.val(),
            new_password = newPwd.val(),
            password_again = pwdAgain.val(),
            _token = $('input[name="_token"]').val();
        if (!email) {
            util.showMes(mes.emailNotNull);
        } else if (!util.mailCheck(email)) {
            util.showMes(mes.emailFormatWrong);
        } else if (!new_password) {
            util.showMes(mes.passwordNotNull);
        } else if (!password_again) {
            util.showMes(mes.confirmNotNull);
        } else if (!passwordReg.test(new_password)) {
            util.showMes(mes.passwordFormatWrong);
        } else if (new_password !== password_again) {
            util.showMes(mes.confirmPasswordErr);
        } else {
            var form = util.createForm({
                email: email,
                password: hex_md5(new_password),
                _token: _token
            });
            sendForgetForm(form);
        }
    });
});

//发送修改密码表单
function sendForgetForm(form) {
    $.ajax({
        url: 'user/resetPwd',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code === 1) {
                util.showMes(mes.passwordResetSuccess, function() {
                    window.location.href = '/';
                });
            } else {
                util.showMes(mes.passwordResetFail);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
        }
    });
}
