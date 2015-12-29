var $ = require('zepto'),
    mes = require('./mes');

//显示错误提示样式
function showMes(mes, callback) {
    $('.mes-content').html(mes);
    $('.mes-hint').addClass('show-mes');

    setTimeout(function() {
        $('.mes-hint').removeClass('show-mes');
        if (callback) {
            callback();
        }
    }, 2000);
}

//创建表单
function createForm(data) {
    var form = new FormData();
    for (var i in data) {
        form.append(i, data[i]);
    }
    return form;
}

//检测电子邮箱格式是否正确
function mailCheck(mailbox) {
    var mailStr = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (mailStr.test(mailbox)) {
        return true;
    } else {
        return false;
    }
}

//检查手机号格式是否正确
function teleCheck(telephone) {
    var teleStr = /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
    if (teleStr.test(telephone)) {
        return true;
    } else {
        return false;
    }
}

//网页头部搜索栏交互
function headerSearch() {
    var searchInput = $('#search-input'),
        emptyBtn = $('#empty'),
        flag = 0;
    $('#search').tap(function() {
        $('body').addClass('search');
        searchInput.focus();
    });

    $('#cancel').tap(function(e) {
        $('body').removeClass('search').removeClass('show-mask');
        searchInput.val('').blur();
        emptyBtn.removeClass('show-empty');
        e.preventDefault();
    });

    searchInput.on('focus', function() {
        $('body').addClass('show-mask');
    });

    searchInput.on('blur', function() {
        $('body').removeClass('show-mask');
    });

    searchInput.on('keyup', function(e) {
        var $this = $(e.target),
            code = e.keyCode,
            value = searchInput.val();
        if (code === 13) {
            window.location.href = 'search?key=' + value;
            return;
        }
        if (value) {
            emptyBtn.addClass('show-empty');
        } else {
            emptyBtn.removeClass('show-empty');
        }
    });

    $('#empty').tap(function(e) {
        searchInput.val('');
        $(e.target).removeClass('show-empty');
    });

    $(window).on('scroll', function(e) {
        var $this = $(window),
            scrollH = $this.scrollTop();
        if (scrollH > 45) {
            $('body').addClass('fix-top');
        } else {
            $('body').removeClass('fix-top');
        }
    });

    $('#logout').tap(function() {
        window.location.href = 'user/logout';
    });

    $('#user_info').tap(function() {
        var loginFlag = parseInt($('input[name="loginFlag"]').val());
        window.location.href = 'user-center?id=' + loginFlag;
    });

    $('#login').tap(function() {
        window.location.href = 'login';
    });

    $('#issue-button').tap(function() {
        var login = parseInt($('input[name="loginFlag"]').val());
        if (login) {
            window.location.href = 'release';
        } else {
            showMes(mes.notLogin);
        }
    });
}

//加载更多数据
function loadMore(opts, callback, flag) {
    var form;
    if (flag == 1) {
        form = {
            curPage: opts.page,
            _token: opts._token,
            order: opts.order
        };
    } else if (flag == 2) {
        form = {
            curPage: opts.page,
            entrance: opts.entrance,
            id: opts.id,
            _token: opts._token
        };
    } else if (flag == 3) {
        form = {
            curPage: opts.page,
            id: opts.id,
            _token: opts._token
        };
    } else if (flag == 4) {
        form = {
            curPage: opts.page,
            pro_id: opts.pro_id,
            _token: opts._token
        };
    } else {
        form = {
            page: opts.page,
            _token: opts._token
        };
    }
    $.ajax({
        url: opts.url,
        type: 'get',
        data: form,
        success: function(data) {
            if (data.code == 1) {
                callback(data.data, opts.page, flag);
            } else {
                showMes(mes.loadFailed);
                callback(null);
            }
        },
        error: function() {
            showMes(mes.networkFail);
            callback(null);
        }
    });
}

//动态滚动到某一位置
function animateScroll(src, dest, time) {
    var perSec = 5,
        gap = Math.round(time / 5),
        distance = dest - src,
        perMove = Math.round(distance / gap);
    $(window).scrollTop(src + perMove);
    setTimeout(function() {
        perScroll(dest, perMove);
    }, 5);
}

//每次动态移动函数
function perScroll(dest, perMove) {
    var pos = $(window).scrollTop();
    if (pos !== dest) {
        var move = (Math.abs(perMove) > Math.abs((dest - pos))) ? (dest - pos) : perMove;
        $(window).scrollTop(pos + move);
        setTimeout(function() {
            perScroll(dest, perMove);
        }, 5);
    }
}

exports.showMes = showMes;
exports.createForm = createForm;
exports.mailCheck = mailCheck;
exports.headerSearch = headerSearch;
exports.teleCheck = teleCheck;
exports.loadMore = loadMore;
exports.animateScroll = animateScroll;
