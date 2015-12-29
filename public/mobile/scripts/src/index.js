require('scss/index.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes'),
    load = true,
    indexGoods = template('index-goods');

// var data = {};
// var data = [{
//     "id": 39,
//     "pro_name": "3123",
//     "parent_cate": "学习用品",
//     "son_cate": "课内教材",
//     "contact": "11111111111",
//     "pro_desc": "312231",
//     "desire": "31231",
//     "username": "lxyeins",
//     "hot": 0,
//     "receiver": null,
//     "is_send": 0,
//     "reg_time": "2015.11.09",
//     "status": 0,
//     "activity": 0,
//     "src": "images/goods.png",
//     "college": "软件学院"
// }, {
//     "id": 39,
//     "pro_name": "3123",
//     "parent_cate": "学习用品",
//     "son_cate": "课内教材",
//     "contact": "11111111111",
//     "pro_desc": "312231",
//     "desire": "31231",
//     "username": "lxyeins",
//     "hot": 0,
//     "receiver": null,
//     "is_send": 1,
//     "reg_time": "2015.11.09",
//     "status": 0,
//     "activity": 0,
//     "src": "images/goods.png",
//     "college": "软件学院"
// }];

$(function() {
    util.headerSearch();
    FastClick.attach(document.body);

    //土豪榜显示
    $('.tuhao-rank').tap(function(e) {
        var $this = $(e.currentTarget);
        if ($this.hasClass('rank-show')) {
            $this.removeClass('rank-show');
        } else {
            $this.addClass('rank-show');
        }
    });

    //加载更多首页物品
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
            util.loadMore({
                url: 'goods/index',
                page: curPage,
                _token: _token
            }, showMoreGoods, 0);
            // showMoreGoods(data, curPage);
        }
    });
});

//显示加载的更多物品
function showMoreGoods(data, page) {
    var goodsContainer = $('.goods-show'),
        flag = 0;
    $('.more-loading').removeClass('show-more-loading');
    if (data) {
        for (var i in data) {
            flag = 1;
            var newGoods = indexGoods({
                pro_id: data[i].id,
                imgSrc: data[i].src,
                goodsName: data[i].pro_name,
                goodsMaster: data[i].username,
                isSend: data[i].is_send
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
}
