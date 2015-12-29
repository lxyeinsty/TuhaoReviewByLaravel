require('scss/user-info.scss');

var $ = require('zepto'),
    mes = require('./mes'),
    util = require('./util');

$(function() {
    var nicknameInput = $('input[name="nickname"]'),
        academyInput = $('input[name="academy"]'),
        locationInput = $('input[name="location"]');
    util.headerSearch();

    //完成编辑
    $('#finish-edit').tap(function() {
        var newInput = {
                username: nicknameInput.val(),
                college: academyInput.val(),
                address: locationInput.val()
            },
            originInput = {
                username: nicknameInput.attr('origin-nickname'),
                college: academyInput.attr('origin-academy'),
                address: locationInput.attr('origin-location')
            },
            finishInput = {},
            flag = 0;
        finishInput['_token'] = $('input[name="_token"]').val();
        var user_id = parseInt($('input[name="user_id"]').val());
        for (var i in newInput) {
            if (newInput[i] == '' || newInput[i] == originInput[i]) {
                flag += 1;
                finishInput[i] = originInput[i];
            } else {
                finishInput[i] = newInput[i];
            }
        }
        if (flag == 3) {
            window.location.href = 'user-center?id=' + user_id;
        } else {
            var form = util.createForm(finishInput);
            finishEdit(form, user_id);
        }
    });
});

function finishEdit(form, user_id) {
    $.ajax({
        url: 'user/edit',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.code == 1) {
                window.location.href = 'user-center?id=' + user_id;
            } else {
                util.showMes(mes.editInfoErr);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
        }
    });
}
