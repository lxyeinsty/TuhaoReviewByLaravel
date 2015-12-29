require('scss/issue.scss');

var $ = require('zepto'),
    util = require('./util'),
    mes = require('./mes'),
    uploadImg = template('upload-image'),
    previewImg = template('preview-image'),
    parentCate = "",
    sonCate = "",
    uploadFiles = [];

$(function() {
    var goodsNameInput = $('input[name="goods-name"]'),
        goodsCateInput = $('#parent-category'),
        goodsTeleInput = $('input[name="goods-tele"]'),
        goodsDesireInput = $('textarea[name="goods-desire"]'),
        goodsIntroInput = $('textarea[name="goods-intro"]');

    util.headerSearch();
    FastClick.attach(document.body);

    //添加新照片
    $('#upload-file').on('change', function(e) {
        var file = e.target.files[0],
            parentItem = $(e.target).parent().parent();
        if (testImgFormat(file.type)) {
            getImageDataURL(parentItem, file, previewImage);
        } else {
            util.showMes(mes.imgFormatErr);
        }
    });

    //显示第一级物品选择
    $('#parent-category').on('click', function() {
        $('.issue-panel').addClass('show-category');
    });

    //获取父选择项并显示子选择项
    $('.parent-category li').on('click', function(e) {
        var $this = $(e.target),
            linkId = parseInt($this.attr('parent-id')),
            sonItems = $('.child-category li');
        parentCate = $this.text();
        if (linkId == 9) {
            $('#parent-category').text(parentCate);
            $('.issue-panel').removeClass('show-category');
        } else {
            $('#back-upper').attr('back-id', 2);
            for (var i = 0, len = sonItems.length; i < len; i++) {
                var sonItem = sonItems.eq(i),
                    sonItemLinkId = parseInt(sonItem.attr('link-id'));
                if (sonItemLinkId == linkId) {
                    sonItem.removeClass('item-hide');
                } else {
                    sonItem.addClass('item-hide');
                }
            }
            $('.category-panel').addClass('show-child-category');
        }
    });

    //获取子选择项并返回到发布首页
    $('.child-category li').on('click', function(e) {
        sonCate = $(e.target).text();
        $('#parent-category').text(parentCate + '-' + sonCate);
        $('.category-panel').removeClass('show-child-category');
        $('.issue-panel').removeClass('show-category');
    });

    //返回上一级选择项
    $('#back-upper').on('click', function(e) {
        e.preventDefault();
        var backId = parseInt($(e.target).attr('back-id'));
        if (backId == 1) {
            $('.issue-panel').removeClass('show-category');
        } else {
            $('#back-upper').attr('back-id', 1);
            $('.category-panel').removeClass('show-child-category');
        }
    });

    //发布检测
    $('#issue').on('tap', function(e) {
        var $this = $(e.target);
        if ($this.hasClass('disabled')) {
            return;
        } else {
            $this.addClass('disabled');
            var goodsName = goodsNameInput.val(),
                goodsCate = goodsCateInput.text(),
                goodsTele = goodsTeleInput.val(),
                goodsDesire = goodsDesireInput.val(),
                goodsIntro = goodsIntroInput.val(),
                _token = $('input[name="_token"]').val();
            if (!uploadFiles.length) {
                util.showMes(mes.goodsImgNull);
                $this.removeClass('disabled');
            } else if (!goodsName) {
                util.showMes(mes.goodsNameNull);
                $this.removeClass('disabled');
            } else if (goodsName.length > 25) {
                util.showMes(mes.goodsNameLong);
                $this.removeClass('disabled');
            } else if (!goodsCate) {
                util.showMes(mes.goodsCateNull);
                $this.removeClass('disabled');
            } else if (!goodsTele) {
                util.showMes(mes.goodsTeleNull);
                $this.removeClass('disabled');
            } else if (!util.teleCheck(goodsTele)) {
                util.showMes(mes.goodsTeleErr);
                $this.removeClass('disabled');
            } else if (!goodsDesire) {
                util.showMes(mes.goodsDesireNull);
                $this.removeClass('disabled');
            } else if (!goodsIntro) {
                util.showMes(mes.goodsIntroNull);
                $this.removeClass('disabled');
            } else if (goodsIntro.length > 160) {
                util.showMes(mes.goodsIntroLong);
                $this.removeClass('disabled');
            } else {
                var goods = {
                        pro_name: goodsName,
                        parent_cate: parentCate,
                        son_cate: sonCate,
                        contact: goodsTele,
                        pro_desc: goodsIntro,
                        desire: goodsDesire,
                        activity: 0
                    },
                    form = util.createForm(goods);
                for (var i = 0, len = uploadFiles.length; i < len; i++) {
                    form.append('goodsImg_' + i, uploadFiles[i]);
                }
                form.append('_token', _token);
                sendIssue(form);
            }
        }
    });
});

//读取上传的照片dataURL
function getImageDataURL(item, file, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        if (imgIsRepeat(e.target.result)) {
            util.showMes(mes.imgRepeat);
            item.remove();
            $('.upload-preview-area').append(uploadImg(''));
            $('#upload-file').on('change', function(e) {
                var file = e.target.files[0],
                    parentItem = $(e.target).parent().parent();
                if (testImgFormat(file.type)) {
                    getImageDataURL(parentItem, file, previewImage);
                } else {
                    util.showMes(mes.imgFormatErr);
                }
            });
        } else {
            callback(item, file, e.target.result);
        }
    };
    fileReader.readAsDataURL(file);
}

//检测照片格式是否正确
function testImgFormat(type) {
    var filter = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
    if (filter.test(type)) {
        return true;
    } else {
        return false;
    }
}

//检测图片是否重复
function imgIsRepeat(img) {
    for (var i = 0, len = uploadFiles.length; i < len; i++) {
        if (img == uploadFiles[i].dataURL) {
            return true;
        }
    }
    return false;
}

//添加上传照片预览图及设置新的上传按钮
function previewImage(item, file, dataURL) {
    var length = $('.preview-image').length;
    item.remove();
    $('.upload-preview-area').append(previewImg({
        dataURL: dataURL,
        deleteId: length
    }));
    $('.preview-image a').off('click').on('click', function(e) {
        e.preventDefault();
        var deleteId = parseInt($(e.target).attr('delete-id'));
        deleteImage($(e.target).parent().parent(), deleteId);
    });
    file.dataURL = dataURL;
    uploadFiles.push(file);
    if (length < 3) {
        $('.upload-preview-area').append(uploadImg(''));
        $('#upload-file').on('change', function(e) {
            var file = e.target.files[0],
                parentItem = $(e.target).parent().parent();
            if (testImgFormat(file.type)) {
                getImageDataURL(parentItem, file, previewImage);
            } else {
                util.showMes(mes.imgFormatErr);
            }
        });
    }
    // console.log(uploadFiles);
}

//删除照片操作
function deleteImage(item, id) {
    var length = $('.add-image').length;
    uploadFiles.splice(id, 1);
    item.remove();
    if (!length) {
        $('.upload-preview-area').append(uploadImg(''));
        $('#upload-file').on('change', function(e) {
            var file = e.target.files[0],
                parentItem = $(e.target).parent();
            getImageDataURL(parentItem, file, previewImage);
        });
    }
    //更新删除键
    var filesLen = $('.preview-image').length;
    for (var i = 0; i < filesLen; i++) {
        $('.preview-image').eq(i).children('a').attr('delete-id', i);
    }
    // console.log(uploadFiles);
}

//提交发布表单
function sendIssue(form) {
    $.ajax({
        url: 'goods/issue',
        type: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            $('#issue').removeClass('disabled');
            if (data.code == 1) {
                window.location.href = 'details?pro_id=' + data.data.pro_id;
            } else {
                util.showMes(mes.issueErr);
            }
        },
        error: function() {
            $('#issue').removeClass('disabled');
            util.showMes(mes.networkFail);
        }
    });
}
