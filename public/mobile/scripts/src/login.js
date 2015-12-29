require('scss/login.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes');

$(function() {
    var emailInput = $('input[name="email"]'),
        passwordInput = $('input[name="password"]'),
        // rememberInput = $('input[name="remember-login"]'),
        _tokenInput = $('input[name="_token"]');

    $('#login').tap(function() {
        var email = emailInput.val(),
            password = passwordInput.val(),
            // remember = rememberInput.attr('checked'),
            _token = _tokenInput.val();

        if (!email || !password) {
            util.showMes(mes.inputNotComplete);
        } else if (!util.mailCheck(email)) {
            util.showMes(mes.emailFormatWrong);
        } else {
            var form = util.createForm({
                email: email,
                password: hex_md5(password),
                // remember: remember,
                _token: _token
            });
            sendLogin(form);
        }
    });
});

function sendLogin(form) {
    $.ajax({
        url: 'user/login',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code == 1) {
                window.location.href = '/';
            } else if (data.code == 0) {
                util.showMes(mes.loginErr);
            } else {
                util.showMes(mes.accountNotActivate, function() {
                    window.location.href = '/remind?action=login';
                });
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
        }
    });
}
