require('scss/confirm-ok.scss');

var $ = require('zepto');

$(function() {
    var $time = $('#time'),
    	time = parseInt($time.text());
    setTimeout(function() {
        countTime(time - 1);
    }, 1000);
});

//倒计时器
function countTime(time) {
    $('#time').text(time);
    if (time == 0) {
        window.location.href = '/';
    } else {
        setTimeout(function() {
            countTime(time - 1);
        }, 1000);
    }
}
