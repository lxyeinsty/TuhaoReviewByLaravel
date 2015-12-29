require('scss/register.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes');

$(function() {
    var nicknameInput = $('input[name="nickname"]'),
        emailInput = $('input[name="email"]'),
        passwordInput = $('input[name="password"]'),
        confirmInput = $('input[name="confirm-password"]'),
        agreeInput = $('input[name="agree-cite"]'),
        _tokenInput = $('input[name="_token"]');
    var nickname, email, password, _token, sex, academy, enterYear, doom, form;

    //绑定注册按钮
    $('#register').tap(function() {
        var nicknameReg = /^[\u4e00-\u9fa5A-Za-z0-9-_]{4,12}$/,
            emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            passwordReg = /^[a-zA-Z]\w{5,15}$/;
        var confirm = confirmInput.val(),
            agree = agreeInput.attr('checked');
        nickname = nicknameInput.val();
        email = emailInput.val();
        _token = _tokenInput.val();
        password = passwordInput.val();
        if (!nickname) {
            util.showMes(mes.nicknameNotNull);
        } else if (!registerItemCheck(nickname, nicknameReg)) {
            util.showMes(mes.nicknameFormatWrong);
        } else if (!email) {
            util.showMes(mes.emailNotNull);
        } else if (!registerItemCheck(email, emailReg)) {
            util.showMes(mes.emailFormatWrong);
        } else if (!password) {
            util.showMes(mes.passwordNotNull);
        } else if (!registerItemCheck(password, passwordReg)) {
            util.showMes(mes.passwordFormatWrong);
        } else if (!confirm) {
            util.showMes(mes.confirmNotNull);
        } else if (confirm != password) {
            util.showMes(mes.confirmPasswordErr);
        } else if (!agree) {
            util.showMes(mes.agreeNotChoose);
        } else {
            nicknameIsRepeat(nickname, email, emailIsRepeat, _token);
        }
    });

    //显示下拉选项表单
    $('.select-show').tap(function(e) {
        var selectChoose = $(e.target).siblings('.select-choose');
        if (selectChoose.hasClass('show-select-choose')) {
            selectChoose.removeClass('show-select-choose');
        } else {
            selectChoose.addClass('show-select-choose');
        }
    });

    //选择下拉选项
    $('.select-choose').tap(function(e) {
        var choose = $(e.target).text(),
            current = $(e.currentTarget);
        current.siblings('.select-show').text(choose);
        current.removeClass('show-select-choose');
    });

    //绑定完成注册按钮
    $('#finish-register').tap(function() {
        sex = $('#sex').text();
        academy = $('#academy').text();
        enterYear = $('input[name="enter-year"]').val();
        doom = $('#doom').text();
        if (sex == '性别') {
            util.showMes(mes.sexNotNull);
        } else if (academy == '学院') {
            util.showMes(mes.academyNotNull);
        } else if (!enterYear) {
            util.showMes(mes.enterYearNotNull);
        } else if (doom == '住址') {
            util.showMes(mes.doomNotNull);
        } else {
            form = util.createForm({
                username: nickname,
                email: email,
                password: hex_md5(password),
                _token: _token,
                sex: sex,
                college: academy,
                enroll_year: enterYear,
                address: doom
            });
            sendRegiser(form);
        }
    });
});

//注册信息项检测
function registerItemCheck(item, reg) {
    if (!reg.test(item)) {
        return false;
    } else {
        return true;
    }
}

//检测用户名是否存在
function nicknameIsRepeat(nickname, email, callback, _token) {
    var form = util.createForm({
        username: nickname,
        _token: _token
    });
    $.ajax({
        url: 'user/register/username',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code == 1) {
                callback(email, _token);
            } else {
                util.showMes(mes.usernameReapeat);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
            // callback(email);
        }
    });
}

//检测邮箱是否存在
function emailIsRepeat(email, _token) {
    var form = util.createForm({
        email: email,
        _token: _token
    });
    $.ajax({
        url: 'user/register/email',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code == 1) {
                $('.login-register-panel').addClass('show-hust-register');
            } else {
                util.showMes(mes.emailReapeat);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
            // $('.login-register-panel').addClass('show-hust-register');
        }
    });
}

//发送注册表单
function sendRegiser(form) {
    $.ajax({
        url: 'user/register/save',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code == 1) {
                window.location.href = 'remind?action=register';
            } else {
                util.showMes(data.mes);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
        }
    });
}
