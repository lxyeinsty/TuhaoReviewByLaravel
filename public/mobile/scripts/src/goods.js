require('scss/goods.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes'),
    moreComment = template('comment'),
    subComment = template('sub-comment'),
    mainComment = template('main-comment'),
    load = true;

// var data = {};
// var data = [{
//     "id": 79,
//     "parent_id": 0,
//     "pro_id": 49,
//     "sender_id": 38,
//     "receiver_id": 35,
//     "content": "我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要想要我想要想要我想要", //主评论的内容
//     "status": 0,
//     "reg_time": 1446474401,
//     "sender_author": "lxyien", //主评论人
//     "receiver_author": "lxy", //向谁评论
//     "goods_name": "111",
//     "src": "images/user.png", //评论者的头像
//     "comments": [ //主评论下的子评论
//         {
//             "id": 63,
//             "parent_id": 79,
//             "pro_id": 49,
//             "sender_id": 34,
//             "receiver_id": 34,
//             "content": "在来",
//             "status": 1,
//             "reg_time": 1446386573,
//             "sender_author": "lxyeins",
//             "receiver_author": "lxyeins",
//             "src": "images/user.png"
//         }, {
//             "id": 73,
//             "parent_id": 79,
//             "pro_id": 49,
//             "sender_id": 34,
//             "receiver_id": 34,
//             "content": "我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想要我想",
//             "status": 1,
//             "reg_time": 1446389162,
//             "sender_author": "lxyeins",
//             "receiver_author": "lxyeins",
//             "src": "images/user.png"
//         }
//     ]
// }];
// var data = {
//     "parent_id": "0",
//     "pro_id": "36",
//     "sender_id": 34,
//     "receiver_id": "34",
//     "content": "你好",
//     "status": 0,
//     "reg_time": 1450092930,
//     "id": 81,
//     "sender_author": "lxyeins",
//     "receiver_author": null,
//     "pro_name": "1112",
//     "src": "header3.jpg",
//     "comments": []
// };

$(function() {
    var scrollH;
    util.headerSearch();

    $(window).off('scroll');

    //切换预览图
    $('.image-gallery li').tap(function(e) {
        var src = $(e.currentTarget).children().attr('src');
        $('.image-gallery li').removeClass('choosed-image');
        $(e.currentTarget).addClass('choosed-image');
        $('.goods-thumb img').attr('src', src);
    });

    //展开子评论显示框
    $('.add-comment').tap(function(e) {
        var $this = $(e.target),
            parent = $this.closest('.comment-item');
        if (parent.hasClass('show-sub-comment')) {
            parent.removeClass('show-sub-comment');
            $(e.target).parent().siblings('textarea[name="user-comment"]').val('');
        } else {
            parent.addClass('show-sub-comment');
        }
    });

    $('.edit-info').tap(function() {
        util.showMes(mes.dealInPC);
    });

    //滑动到页面底部
    $('#link-comment').tap(function() {
        var src = $(window).scrollTop(),
            dest = $('body').height() - $(window).height() + 10;
        console.log(src, dest);
        util.animateScroll(src, dest, 500);
    });

    //加载更多的评论
    $('.container').on('scroll', function(e) {
        var $this = $(e.currentTarget),
            windowH = $(window).height(),
            scrollH = $this.scrollTop(),
            curPage = parseInt($('input[name="curPage"]').attr('curPage')) + 1,
            proId = parseInt($('input[name="proId"]').val()),
            main_comment_posT = $('#main-comment').position().top,
            _token = $('input[name="_token"]').val();
        if (main_comment_posT - windowH < 100 && load) {
            load = false;
            util.loadMore({
                url: 'comments/details',
                page: curPage,
                _token: _token,
                pro_id: proId
            }, showMoreComment, 4);
            // showMoreComment(data, curPage);
        }
    });

    //获取发布的评论消息
    $('.sub-issue-comment').tap(function(e) {
        var parentItem = $(e.target).closest('.comment-item'),
            pro_id = $('input[name="proId"]').val(),
            content = $(e.target).siblings('textarea[name="user-comment"]').val(),
            parent_id = parentItem.parent().children('input[name="parent_id"]').val(),
            sender_id = parentItem.children('input[name="sender_id"]').val(),
            _token = $('input[name="_token"]').val(),
            loginFlag = parseInt($('input[name="loginFlag"]').val()),
            $this = $(e.target),
            upperComment = null;
        if (parentItem.hasClass('sub-comment')) {
            upperComment = parentItem.parent();
        } else {
            upperComment = parentItem;
        }
        if ($this.hasClass('disabled')) {
            return;
        }
        $this.addClass('disabled');
        if (loginFlag === 0) {
            util.showMes(mes.notLoginComment);
            $this.removeClass('disabled');
            return;
        }
        if (!content) {
            parentItem.removeClass('show-sub-comment');
        } else {
            var form = util.createForm({
                parent_id: parent_id,
                pro_id: pro_id,
                receiver_id: sender_id,
                content: content,
                _token: _token
            });
            sendSubComment(form, parentItem, upperComment, $(e.target).siblings('textarea'), $this);
        }
    });

    //发布评论
    $('#issue-comment').tap(function(e) {
        var content = $('#main-comment').children('textarea').val(),
            pro_id = $('input[name="proId"]').val(),
            receiver_id = $('input[name="goods_master"]').val(),
            _token = $('input[name="_token"]').val(),
            loginFlag = parseInt($('input[name="loginFlag"]').val()),
            $this = $(e.target),
            form = util.createForm({
                parent_id: 0,
                pro_id: pro_id,
                receiver_id: receiver_id,
                content: content,
                _token: _token
            });
        // $('#main-comment').children('textarea').val('');
        // $('.comment-content-area').append(mainComment({
        //     parent_id: data.parent_id,
        //     sender_id: data.sender_id,
        //     user_src: data.src,
        //     sender_author: data.sender_author,
        //     content: data.content
        // }));
        // bindTemplate();
        var goods_master = parseInt($('input[name="goods_master"]').val()),
            loginFlag = parseInt($('input[name="loginFlag"]').val()),
            masterFlag = 0;
        if ($this.hasClass('disabled')) {
            return;
        }
        $this.addClass('disabled');
        if (loginFlag === 0) {
            util.showMes(mes.notLoginComment);
            $this.removeClass('disabled');
            return;
        }
        $.ajax({
            url: 'comments/add',
            type: 'POST',
            data: form,
            processData: false,
            contentType: false,
            success: function(data) {
                $this.removeClass('disabled');
                if (data.code === 1) {
                    if (goods_master === loginFlag && goods_master !== data.data.sender_id) {
                        masterFlag = 1;
                    }
                    $('#main-comment').children('textarea').val('');
                    $('.comment-content-area').append(mainComment({
                        parent_id: data.data.id,
                        sender_id: data.data.sender_id,
                        user_src: data.data.src,
                        sender_author: data.data.sender_author,
                        content: data.data.content,
                        masterFlag: masterFlag
                    }));
                    bindTemplate();
                }
            },
            error: function() {
                util.showMes(mes.networkFail);
            }
        });
    });

    //确认送出物品
    $('.confirm-icon').tap(function(e) {
        var $this = $(e.target),
            pro_id = $('input[name="proId"]').val(),
            _token = $('input[name="_token"]').val(),
            receiver_id = $this.parent().children('input[name="sender_id"]').val(),
            form = util.createForm({
                pro_id: pro_id,
                receiver_id: receiver_id,
                _token: _token
            });
        if ($this.hasClass('confirm-icon-ok')) {
            return;
        }
        $.ajax({
            url: 'goods/give',
            type: 'POST',
            data: form,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.code === 1) {
                    util.showMes(mes.giveOk);
                    $this.addClass('confirm-icon-ok');
                } else {
                    util.showMes(mes.giveFail);
                }
            },
            error: function() {
                util.showMes(mes.networkFail);
            }
        });
    });
});

//发布评论模板事件绑定
function bindTemplate() {
    //展开子评论编辑框
    $('.add-comment').off('tap').on('tap', function(e) {
        var $this = $(e.target),
            parent = $this.closest('.comment-item');
        if (parent.hasClass('show-sub-comment')) {
            parent.removeClass('show-sub-comment');
            $(e.target).parent().siblings('textarea[name="user-comment"]').val('');
        } else {
            parent.addClass('show-sub-comment');
        }
    });
    //获取子评论内容并发布
    $('.sub-issue-comment').off('tap').on('tap', function(e) {
        var parentItem = $(e.target).closest('.comment-item'),
            pro_id = $('input[name="proId"]').val(),
            content = $(e.target).siblings('textarea[name="user-comment"]').val(),
            parent_id = parentItem.parent().children('input[name="parent_id"]').val(),
            sender_id = parentItem.children('input[name="sender_id"]').val(),
            _token = $('input[name="_token"]').val(),
            loginFlag = parseInt($('input[name="loginFlag"]').val()),
            $this = $(e.target),
            upperComment = null;
        if (parentItem.hasClass('sub-comment')) {
            upperComment = parentItem.parent();
        } else {
            upperComment = parentItem;
        }
        if ($this.hasClass('disabled')) {
            return;
        }
        $this.addClass('disabled');
        if (loginFlag === 0) {
            util.showMes(mes.notLoginComment);
            $this.removeClass('disabled');
            return;
        }
        if (!content) {
            parentItem.removeClass('show-sub-comment');
        } else {
            var form = util.createForm({
                parent_id: parent_id,
                pro_id: pro_id,
                receiver_id: sender_id,
                content: content,
                _token: _token
            });
            sendSubComment(form, parentItem, upperComment, $(e.target).siblings('textarea'), $this);
        }
    });
    //确认送出物品
    $('.confirm-icon').off('tap').on('tap', function(e) {
        var $this = $(e.target),
            pro_id = $('input[name="proId"]').val(),
            _token = $('input[name="_token"]').val(),
            receiver_id = $this.parent().children('input[name="sender_id"]').val(),
            form = util.createForm({
                pro_id: pro_id,
                receiver_id: receiver_id,
                _token: _token
            });
        if ($this.hasClass('confirm-icon-ok')) {
            return;
        }
        $.ajax({
            url: 'goods/give',
            type: 'POST',
            data: form,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.code === 1) {
                    util.showMes(mes.giveOk);
                    $this.addClass('confirm-icon-ok');
                } else {
                    util.showMes(mes.giveFail);
                }
            },
            error: function() {
                util.showMes(mes.networkFail);
            }
        });
    });
}

//显示加载的评论
function showMoreComment(data, page) {
    var goodsContainer = $('.comment-content-area'),
        flag = 0,
        subFlag = 0;
    var goods_master = parseInt($('input[name="goods_master"]').val()),
        loginFlag = parseInt($('input[name="loginFlag"]').val()),
        masterFlag = 0;
    if (data) {
        for (var i in data.data) {
            flag = 1;
            for (var j in data.data[i].comments) {
                subFlag = 1;
                break;
            }
            if (goods_master === loginFlag && goods_master !== data.data[i].sender_id) {
                masterFlag = 1;
            }
            var newComment = moreComment({
                mainSrc: data.data[i].src,
                mainMaster: data.data[i].sender_authore,
                mainContent: data.data[i].content,
                sender_id: data.data[i].sender_id,
                parent_id: data.data[i].id,
                subFlag: subFlag,
                subComments: data.data[i].comments,
                masterFlag: masterFlag,
                is_send: parseInt($('input[name="is_send"]').val())
            });
            goodsContainer.append(newComment);
        }
        if (flag) {
            $('input[name="curPage"]').attr('curPage', page);
            bindTemplate();
            // $('.end-line').removeClass('show-end-line');
        }
    }
    load = true;
}

//发送子评论
function sendSubComment(form, parentItem, upperComment, textarea, currentBtn) {
    var goods_master = parseInt($('input[name="goods_master"]').val()),
        loginFlag = parseInt($('input[name="loginFlag"]').val()),
        masterFlag = 0;
    if (goods_master === loginFlag) {
        masterFlag = 1;
    }
    $.ajax({
        url: 'comments/add',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            currentBtn.removeClass('disabled');
            if (data.code === 1) {
                textarea.val('');
                parentItem.removeClass('show-sub-comment');
                upperComment.append(subComment({
                    parent_id: data.data.id,
                    sender_id: data.data.sender_id,
                    user_src: data.data.src,
                    sender_author: data.data.sender_author,
                    content: data.data.content,
                    masterFlag: masterFlag
                }));
                bindTemplate();
            }
        },
        error: function() {
            util.showMes(mes.networkFail);
        }
    });
}
