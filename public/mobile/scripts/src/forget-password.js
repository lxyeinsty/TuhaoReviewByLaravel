require('scss/forget-password.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes');

$(function() {
    var emailInput = $('input[name="email"]');
    $('#submit').tap(function() {
        var email = emailInput.val(),
            _token = $('input[name="_token"]').val();
        if (!email) {
            util.showMes(mes.emailNotNull);
        } else if (!util.mailCheck(email)) {
            util.showMes(mes.emailFormatWrong);
        } else {
            var form = util.createForm({
                email: email,
                _token: _token
            });
            sendForgetForm(form);
        }
    });
});

//发送忘记密码表单
function sendForgetForm(form) {
    $.ajax({
        url: 'user/forgetPwd',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code === 1) {
                window.location.href = 'remind?action=password';
            } else {
                util.showMes(mes.sendMailFailed);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
        }
    });
}
