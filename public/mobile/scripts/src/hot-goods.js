var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes'),
    searchGoods = template('search-goods'),
    load = true;

$(function() {
    util.headerSearch();

    //加载更多的搜索结果
    $(window).on('scroll', function(e) {
        var $this = $(e.currentTarget),
            bodyH = $('body').height(),
            windowH = $this.height(),
            scrollH = $this.scrollTop(),
            curPage = parseInt($('input[name="curPage"]').attr('curPage')) + 1,
            _token = $('input[name="_token"]').val();
        if (bodyH - windowH - scrollH < 100 && load) {
            load = false;
            $('.end-line').removeClass('show-end-line');
            $('.more-loading').addClass('show-more-loading');
            sendHot(curPage, _token);
        }
    });
});

function sendHot(page, _token) {
    var form = {
        curPage: page,
        _token: _token
    };
    $.ajax({
        url: 'goods/hot',
        type: 'GET',
        data: form,
        success: function(data) {
            $('.more-loading').removeClass('show-more-loading');
            if (data.code === 1) {
                var goodsContainer = $('.search-result'),
                    flag = 0;
                if (data) {
                    for (var i in data.data.data) {
                        flag = 1;
                        var newGoods = searchGoods({
                            imgSrc: data.data.data[i].src,
                            goodsName: data.data.data[i].pro_name,
                            goodsDetail: data.data.data[i].pro_desc,
                            masterCollege: data.data.data[i].college,
                            goodsMaster: data.data.data[i].username
                        });
                        goodsContainer.append(newGoods);
                    }
                    if (flag) {
                        $('input[name="curPage"]').attr('curPage', page);
                        $('.end-line').removeClass('show-end-line');
                    } else {
                        $('.end-line').addClass('show-end-line');
                    }
                }
                load = true;
            } else {
                util.showMes(mes.loadFailed);
            }
        },
        error: function() {
            $('.more-loading').removeClass('show-more-loading');
            util.showMes(mes.networkFail);
            load = true;
        }
    });
}
