require('scss/user.scss');

var $ = require('zepto'),
    util = require('./util'),
    sendingGoods = template('search-goods'),
    newMes = template('new-mes'),
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
//     "sender_author": "lxyeins",
//     "receiver_author": "lxyeins",
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
//     "sender_author": "lxyeins",
//     "receiver_author": "lxyeins",
//     "college": "软件学院",
//     "content": "我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我要我想要我想要我想要我想要我想要我想要我想要我想要"
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
//     "sender_author": "lxyeins",
//     "receiver_author": "lxyeins",
//     "college": "软件学院",
//     "content": "我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我要我想要我想要我想要我想要我想要我想要我想要我想要"
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
//     "sender_author": "lxyeins",
//     "receiver_author": "lxyeins",
//     "college": "软件学院",
//     "content": "我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我要我想要我想要我想要我想要我想要我想要我想要我想要"
// }];

$(function() {
    util.headerSearch();

    //用户页信息选项卡切换
    $('.user-panel-tab').tap(function(e) {
        var $this = $(e.target),
            tabText = $this.text(),
            curPage = 1,
            _token = $('input[name="_token"]').val(),
            tab = parseInt($this.attr('tab-id')),
            user_id = parseInt($('input[name="user_id"]').val()),
            currentTab = parseInt($('input[name="tab"]').val());
        if ($this.hasClass('current-choose')) {
            return;
        }
        $(window).scrollTop(0);
        $('.user-panel-tab li').removeClass('current-choose');
        $this.addClass('current-choose');
        $('input[name="tab"]').val(tab);
        $('input[name="curPage"]').attr('curPage', 1)
        $('.loading').addClass('show-loading');
        if (load) {
            load = false;
            if (tab == 0) {
                util.loadMore({
                    url: 'goods/user-center',
                    page: curPage,
                    entrance: 'sending',
                    id: user_id,
                    _token: _token
                }, showTabData, 2);
                // showTabData(data, 1, 2);
            } else {
                util.loadMore({
                    url: 'comments/user-center',
                    page: curPage,
                    _token: _token,
                    id: user_id,
                }, showTabData, 3);
                // showTabData(data, 1, 3);
            }
        }

    });

    //滚动加载新的数据
    $(window).on('scroll', function(e) {
        var $this = $(e.currentTarget),
            bodyH = $('body').height(),
            windowH = $this.height(),
            scrollH = $this.scrollTop(),
            curPage = parseInt($('input[name="curPage"]').attr('curPage')) + 1,
            user_id = parseInt($('input[name="user_id"]').val()),
            _token = $('input[name="_token"]').val(),
            tab = $('input[name="tab"]').val();

        if (bodyH - windowH - scrollH < 100 && load) {
            load = false;
            $('.end-line').removeClass('show-end-line');
            $('.more-loading').addClass('show-more-loading');
            if (tab == 0) {
                util.loadMore({
                    url: 'goods/user-center',
                    page: curPage,
                    entrance: 'sending',
                    id: user_id,
                    _token: _token
                }, showLoadData, 2);
                // showLoadData(data, curPage, 2);
            } else {
                util.loadMore({
                    url: 'comments/user-center',
                    page: curPage,
                    id: user_id,
                    _token: _token
                }, showLoadData, 3);
                // showLoadData(data, curPage, 3);
            }
        }
    });
});

//显示获取的更多数据
function showTabData(data, page, tabFlag) {
    var goodsContainer = $('.goods-sending-list'),
        flag = 0;
    goodsContainer.empty();
    if (data) {
        for (var i in data.data) {
            flag = 1;
            if (tabFlag == 2) {
                goodsContainer.append(sendingGoods({
                    imgSrc: data.data[i].src,
                    goodsName: data.data[i].pro_name,
                    goodsDetail: data.data[i].pro_desc,
                    masterCollege: data.data[i].college,
                    issueTime: data.data[i].reg_time,
                    goodsMaster: data.data[i].username
                }));
            } else if (tabFlag == 3) {
                goodsContainer.append(newMes({
                    pro_id: data.data[i].pro_id,
                    mesImg: data.data[i].src,
                    mesMaster: data.data[i]['receiver_author'],
                    mesContent: data.data[i].content
                }));
            }
        }
        if (flag) {
            $('input[name="curPage"]').attr('curPage', page);
            $('.end-line').removeClass('show-end-line');
        } else {
            $('.end-line').addClass('show-end-line');
        }
    }
    load = true;
    $('.loading').removeClass('show-loading');
}

//显示同一选项卡中的加载数据
function showLoadData(data, page, tabFlag) {
    var goodsContainer = $('.goods-sending-list'),
        flag = 0;
    $('.more-loading').removeClass('show-more-loading');
    if (data) {
        for (var i in data.data) {
            flag = 1;
            if (tabFlag == 2) {
                goodsContainer.append(sendingGoods({
                    imgSrc: data.data[i].src,
                    goodsName: data.data[i].pro_name,
                    goodsDetail: data.data[i].pro_desc,
                    masterCollege: data.data[i].college,
                    issueTime: data.data[i].reg_time,
                    goodsMaster: data.data[i].username
                }));
            } else if (tabFlag == 3) {
                goodsContainer.append(newMes({
                    pro_id: data.data[i].pro_id,
                    mesImg: data.data[i].src,
                    mesMaster: data.data[i]['receiver_author'],
                    mesContent: data.data[i].content
                }));
            }
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
