require('scss/search.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes'),
    searchGoods = template('search-goods'),
    load = true;

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

    //切换选项卡
    $('.search-tab').on('click', function(e) {
        var $this = $(e.target),
            _token = $('input[name="_token"]').val(),
            current_tab = $('.current-choose').text(),
            tab = $this.text();
        if (tab === current_tab) {
            return;
        }
        switch (tab) {
            case '综合':
                tab = 'general';
                break;
            case '热度':
                tab = 'hot';
                break;
            case '评论数':
                tab = 'comment';
                break;
            case '最新':
                tab = 'time';
                break;
            default:
                tab = 'general';
        }
        $(window).scrollTop(0);
        $('.search-tab li').removeClass('current-choose');
        $this.addClass('current-choose');
        $('.loading').addClass('show-loading');
        var form = {
            curPage: 1,
            order: tab,
            _token: _token
        };
        categoryPageGoods(form, showPageGoods);
        // showPageGoods(data);
    });

    $('#search-input').off('focus').on('focus', function(e) {
        $('body').addClass('show-mask').removeClass('goods-category-input');
    });

    $('#search-input').off('blur').on('blur', function(e) {
        $('body').removeClass('show-mask').addClass('goods-category-input');
    });

    //加载更多的搜索结果
    $(window).on('scroll', function(e) {
        var $this = $(e.currentTarget),
            bodyH = $('body').height(),
            windowH = $this.height(),
            scrollH = $this.scrollTop(),
            tab = $('.current-choose').text(),
            curPage = parseInt($('input[name="curPage"]').attr('curPage')) + 1,
            _token = $('input[name="_token"]').val();
        switch (tab) {
            case '综合':
                tab = 'general';
                break;
            case '热度':
                tab = 'hot';
                break;
            case '评论数':
                tab = 'comment';
                break;
            case '最新':
                tab = 'time';
                break;
            default:
                tab = 'general';
        }
        if (bodyH - windowH - scrollH < 100 && load) {
            load = false;
            $('.end-line').removeClass('show-end-line');
            $('.more-loading').addClass('show-more-loading');
            util.loadMore({
                url: 'goods/category',
                page: curPage,
                _token: _token,
                order: tab
            }, showMoreGoods, 1);
            // showMoreGoods(data, curPage);
        }
    });
});

//显示加载的更多物品
function showMoreGoods(data, page) {
    var goodsContainer = $('.search-result'),
        flag = 0;
    $('.more-loading').removeClass('show-more-loading');
    if (data) {
        for (var i in data.data) {
            flag = 1;
            var newGoods = searchGoods({
                pro_id: data.data[i].id,
                imgSrc: data.data[i].src,
                goodsName: data.data[i].pro_name,
                goodsDetail: data.data[i].pro_desc,
                masterCollege: data.data[i].college,
                issueTime: data.data[i].reg_time,
                goodsMaster: data.data[i].username
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

//显示分页结果
function showPageGoods(data) {
    var goodsContainer = $('.search-result'),
        flag = 0;
    goodsContainer.empty();
    $('input[name="curPage"]').attr('curPage', 1);
    if (data) {
        for (var i in data) {
            flag = 1;
            var newGoods = searchGoods({
                pro_id: data[i].id,
                imgSrc: data[i].src,
                goodsName: data[i].pro_name,
                goodsDetail: data[i].pro_desc,
                masterCollege: data[i].college,
                issueTime: data[i].reg_time,
                goodsMaster: data[i].username
            });
            goodsContainer.append(newGoods);
        }
        if (flag) {
            $('.end-line').removeClass('show-end-line');
        } else {
            $('.end-line').addClass('show-end-line');
        }
    }
}

//物品分类分页加载
function categoryPageGoods(form, callback) {
    $.ajax({
        url: 'goods/category',
        type: 'get',
        data: form,
        success: function(data) {
            if (data.code == 1) {
                callback(data.data.data);
            } else {
                util.showMes(mes.loadFailed);
                callback(null);
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
            callback(null);
        }
    });
}
