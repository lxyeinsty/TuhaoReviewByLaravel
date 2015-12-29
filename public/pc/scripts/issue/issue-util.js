define(function(require, exports, module) {
    var Util = function() {},
        util = new Util(),
        mes = {
            $dom: $('#mes'),
            show: function(str) {
                this.$dom.html(str);
                this.$dom.addClass('active');
                var $this = this;
                setTimeout(function() {
                    $this.hide();
                }, 2000);
            },
            hide: function() {
                this.$dom.removeClass('active');
            }
        },
        initWidth = 928 * 0.7,
        initHeight = 550,
        compressWidth = 800,
        compressHeight = 800,
        imgMaxSize = 409600,
        mFilter = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/,
        newUpload = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file' multiple accept='image/jpeg,image/png,image/gif'>" + "</div>";

    //更新上传图片按钮
    function updateBtn(parentNode, uploadBtn) {
        var cloneBtn = uploadBtn.clone(true);
        uploadBtn.remove();
        parentNode.append(cloneBtn);
    }

    //检测图片宽高
    function testImg(srcImg) {
        var resultImg = new Image();
        resultImg.src = srcImg;
        var width = resultImg.naturalWidth;
        var height = resultImg.naturalHeight;
        if (width > initWidth || height > initHeight) {
            return true;
        } else {
            return false;
        }
    }

    //图片转成blob对象
    function toBlob(srcImg, format) {
        srcImg = srcImg.split(",")[1];
        srcImg = window.atob(srcImg);
        var buffer = new Uint8Array(srcImg.length);
        for (var i = 0, len = srcImg.length; i < len; i++) {
            buffer[i] = srcImg.charCodeAt(i);
        }
        var blob = new Blob([buffer], {
            type: format
        });
        return blob;
    }

    //添加上传图片的图标并绑定事件
    function addUpload(dealOpts) {
        $(".upload-photo-area").append(newUpload);
        //更改添加图片的hover样式
        $(".upload-ph .upload-file").on("mouseover", function() {
            $(".init-photo").addClass("init-photo-hover");
        }).on("mouseout", function() {
            $(".init-photo").removeClass("init-photo-hover");
        });
        //预览上传图片
        $(".upload-file").on("change", function(e) {
            var parent = $(this).parent(),
                imgOpts = {
                    uploadFiles: dealOpts.uploadFiles,
                    files: this.files,
                    btnParent: parent,
                    uploadBtn: $(this),
                    flag: 0,
                    parent: parent
                };
            util.imgView(imgOpts);
        });
    }

    //添加删除图片事件
    function deleteImg(parentElem, picIndex, dealOpts) {
        var uploadFiles = dealOpts.uploadFiles;
        parentElem.remove();
        uploadFiles.splice(picIndex, 1);
        for (var i = 0; i < uploadFiles.length; i++) {
            uploadFiles[i].index = i;
            $(".delete-photo:eq(" + i + ")").attr("picIndex", i);
        }
        //判断预览区内是否还有图片
        if ($(".upload-preview").length === 0) {
            $(".upload-photo-area").empty();
            $(".photo-preview-area").hide();
            $("#delete-goods-btn").css('top', '-55px');
            $(".add-photo-frame").show();
        } else if ($(".upload-preview").length < 4) {
            if (!($(".photo-preview-area").find(".init-photo").length)) {
                addUpload(dealOpts);
            }
        }
    }

    //检测图片是否已经存在
    function isImgRepeat(curImg, imgFiles) {
        for (var i = 0, len = imgFiles.length; i < len; i++) {
            if (curImg.src === imgFiles[i].src) {
                return true;
            }
        }
        return false;
    }

    //显示压缩好的图片
    function showCmp(dealOpts, i) {
        var mFiles = dealOpts.files,
            blob = toBlob(mFiles[i].src, dealOpts.files[i].type),
            newPre;

        blob.src = mFiles[i].src;
        blob.index = dealOpts.uploadFiles.length;
        if (i === 0) {
            if (dealOpts.flag) {
                $(".add-photo-frame").hide();
                $(".photo-preview-area").show();
                $("#delete-goods-btn").css('top', '-40px');
            } else {
                dealOpts.parent.remove();
            }
        }
        if (!dealOpts.flag) {
            if (isImgRepeat(mFiles[i], dealOpts.uploadFiles)) {
                mes.show("图片已重复！请重新选择");
                i++;
                testCmp(dealOpts, i);
                return;
            }
        }
        dealOpts.uploadFiles.push(blob);
        newPre = "<div class='upload-ph'>" +
            "<div class='upload-preview' style='background-image:url(" + blob.src + ")'></div>" +
            "<a href='javascript:void(0)' class='delete-photo' picIndex=" + blob.index + "></a>" + "</div>";
        $(".upload-photo-area").append(newPre);
        //绑定图片删除事件
        $(".delete-photo").eq(blob.index).on("click", function() {
            var parentElem = $(this).parent(),
                picIndex = parseInt($(this).attr("picIndex"));
            deleteImg(parentElem, picIndex, dealOpts);
        });
        testCmp(dealOpts, ++i);
    }

    //检测上传图片的格式并压缩
    function testCmp(dealOpts, i) {
        var mFiles = dealOpts.files;
        if (i < dealOpts.files.length) {
            //检测图片格式是否正确
            if (!mFilter.test(dealOpts.files[i].name)) {
                mes.show("只支持jpg、png、gif格式");
                i++;
                if (i !== mFiles.length) {
                    arguments.callee(dealOpts, i);
                }
            } else {
                var mFReader = new FileReader();
                mFReader.onload = function(mFREvent) {
                    mFiles[i].src = mFREvent.target.result;
                    if (testImg(mFiles[i].src)) {
                        lrz(mFiles[i], {
                            width: compressWidth,
                            height: compressHeight
                        }).then(function(rst) {
                            mFiles[i].src = rst.base64;
                            showCmp(dealOpts, i);
                        });
                    } else if (mFiles[i].size > imgMaxSize) {
                        lrz(mFiles[i]).then(function(rst) {
                            mFiles[i].src = rst.base64;
                            showCmp(dealOpts, i);
                        });
                    } else {
                        showCmp(dealOpts, i);
                    }

                };
                mFReader.readAsDataURL(mFiles[i]);
            }
        } else if (i === dealOpts.files.length) {
            if (dealOpts.uploadFiles.length < 4) {
                addUpload(dealOpts);
            }
        }
    }

    //获取物品选择的值
    function getCateVal(cate) {
        var cateVal = {
            '学习用品': 1,
            '衣服配饰': 2,
            '数码产品': 3,
            '交通工具': 4,
            '生活娱乐': 5,
            '其他': 9,
            '课内教材': 11,
            '文具': 12,
            '出国书籍': 13,
            '课外书籍': 14,
            '男装': 21,
            '女装': 22,
            '手表鞋袋': 23,
            '配饰': 24,
            '鼠标键盘': 31,
            '移动电源': 32,
            '充电器': 33,
            '耳机': 34,
            '自行车': 41,
            '电动车': 42,
            '乐器': 51,
            '棋牌': 52,
            '会员卡': 53,
            '化妆品': 54
        };

        return cateVal[cate];
    }

    //加载物品选择
    function loadCate(data) {
        var parentCate = data['parent_cate'],
            sonCate = data['son_cate'],
            parentVal = getCateVal(parentCate);
        $('#cat-top-name').text(parentCate);
        $('input[name=goods-cat-top]').val(parentVal);
        if (parentCate !== "其他") {
            $(".form-value-l").css("display", "inline-block");
            $(".issue-category-next li").each(function() {
                util.showSubItem(parentVal, $(this));
            });
            $('#cat-next-name').text(sonCate);
            $('input[name=goods-cat-next]').val(getCateVal(sonCate));
        }
    }

    //展示图片
    function showImg(dealOpts, i) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image();

        if (i < dealOpts.files.length) {
            img.onload = function() {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL('image/jpeg'),
                    blob = toBlob(dataURL, 'image/jpeg'),
                    newPre = "<div class='upload-ph'>" +
                    "<div class='upload-preview' style='background-image:url(" + dataURL + ")'></div>" +
                    "<a href='javascript:void(0)' class='delete-photo' picIndex=" + i + "></a>" + "</div>";
                blob.src = dataURL;
                blob.index = i;
                dealOpts.uploadFiles.push(blob);
                if (i === 0) {
                    $(".add-photo-frame").hide();
                    $(".photo-preview-area").show();
                    $("#delete-goods-btn").css('top', '-40px');
                }
                $(".upload-photo-area").append(newPre);
                //绑定图片删除事件
                $(".delete-photo").eq(i).on("click", function() {
                    var parentElem = $(this).parent(),
                        picIndex = parseInt($(this).attr("picIndex"));
                    deleteImg(parentElem, picIndex, dealOpts);
                });
                showImg(dealOpts, ++i);
            };
            img.src = dealOpts.files[i];
        } else {
            if (dealOpts.files.length < 4) {
                addUpload(dealOpts);
            }
        }
    }

    //加载已上传的图片
    function loadImg(files, uploadFiles) {
        var mFiles = [],
            dealOpts = {
                files: mFiles,
                uploadFiles: uploadFiles
            };
        for (var key in files) {
            mFiles.push(files[key]);
        }
        showImg(dealOpts, 0);
    }

    //图片上传预览
    Util.prototype.imgView = function(imgOpts) {
        var dealOpts = {
            files: imgOpts.files,
            uploadFiles: imgOpts.uploadFiles,
            flag: imgOpts.flag,
            parent: imgOpts.parent
        };

        //更新上传图片按钮
        updateBtn(imgOpts.btnParent, imgOpts.uploadBtn);
        //检测上传图片是否超过4张
        if (imgOpts.uploadFiles.length + imgOpts.files.length > 4) {
            mes.show("图片上传多于四张，请重新选择");
        } else {
            testCmp(dealOpts, 0);
        }
    };

    //显示相关联的第二级分类项
    Util.prototype.showSubItem = function(pkitem, curElem) {
        if (curElem.attr("pkitem") == pkitem || curElem.attr("pkitem") == 99) {
            curElem.addClass("item-show");
        } else if (curElem.hasClass("item-show")) {
            curElem.removeClass("item-show");
        }
    };

    //通过ID获取元素
    Util.prototype.getElemById = function(id) {
        return document.getElementById(id);
    };

    //初始化发布物品表单
    Util.prototype.initForm = function(data, uploadFiles) {
        loadCate(data);
        $("input[name=goods-title]").val(data['pro_name']);
        $("input[name=goods-tele]").val(data['contact']);
        $("textarea[name=goods-detailed]").val(data['pro_desc']);
        $("textarea[name=master-desire]").val(data['desire']);
        if(parseInt(data.activity)){
        	$('#check-activity').attr('checked',true);
        }
        //初始化添加图片区
        loadImg(data.src, uploadFiles);
    };

    return util;
});
