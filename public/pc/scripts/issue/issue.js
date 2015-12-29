define(function(require, exports, module) {
    var uploadFiles = [],
        goodsName,
        mes,
        util = require('issue-util');

    //综合检测
    function completeTest() {
        var goods = {};
        var curErrInfo;
        var curErrText;
        var flag = 0;
        //  var check = document.getElementById('check-issue').checked;
        var check = true;
        goods['goodsName'] = $("input[name='goods-title']").val();
        goods['masterTel'] = $("input[name='goods-tele']").val();
        goods['goodsIntro'] = $("textarea[name='goods-detailed']").val();
        goods['masterDesire'] = $("textarea[name='master-desire']").val();
        goods['goodsCate'] = $("#cat-top-name").text() + "-" + $("#cat-next-name").text();
        goods['cateParent'] = $("#cat-top-name").text();
        if ($("input[name='goods-cat-top']").val() != 9) {
            goods['cateChild'] = $("#cat-next-name").text();
        } else {
            goods['cateChild'] = null;
        }
        goods['goodsPhoto'] = uploadFiles;
        for (var i in goods) {
            switch (i) {
                case 'goodsName':
                    if (goods[i] == "") {
                        setWholeErr($("input[name='goods-title']").parent().next(), $("input[name='goods-title']").parent());
                        flag = 1;
                    } else if (goods[i].length > 25) {
                        setWholeErr($("input[name='goods-title']").parent().next(), $("input[name='goods-title']").parent(), "输入不能多于25个字");
                        flag = 1;
                    }
                    break;
                case 'masterTel':
                    if (goods[i] == "") {
                        setWholeErr($("input[name='goods-tele']").parent().next(), $("input[name='goods-tele']").parent());
                        flag = 1;
                    }
                    break;
                case "goodsIntro":
                    if (goods[i] == "") {
                        setWholeErr($("textarea[name='goods-detailed']").parent().next(), $("textarea[name='goods-detailed']").parent());
                        flag = 1;
                    } else if (goods[i].length > 160) {
                        setWholeErr($("textarea[name='goods-detailed']").parent().next(), $("textarea[name='goods-detailed']").parent(), "物品详情字数不能超过160字");
                        flag = 1;
                    }
                    break;
                case "masterDesire":
                    if (goods[i] == "") {
                        setWholeErr($("textarea[name='master-desire']").parent().next(), $("textarea[name='master-desire']").parent());
                        flag = 1;
                    }
                    break;
                case "goodsCate":
                    if ($("#cat-top-name").text() == "未选择") {
                        setWholeErr($("#issue-category").next(), $("#goods-cat-top"), "分类信息未选");
                        flag = 1;
                    } else if ($("#cat-next-name").text() == "未选择" && $("input[name='goods-cat-top']").val() != 9) {
                        setWholeErr($("#issue-category").next(), $("#goods-cat-next"), "分类信息未选全");
                        flag = 1;
                    }
                    break;
                case "goodsPhoto":
                    if (goods[i].length == 0) {
                        mes.show("有图有真相，亲，赶快传图吧！");
                        flag = 1;
                    }
            }
        }
        if (!check) {
            setWholeErr($("input[type='checkbox']").parent().next(), $("input[type='checkbox']").parent(), "请勾选同意发布规则");
            flag = 1;
        }
        if (!flag) {
            //填写提交表单
            goodsName = goods.goodsName;
            setAjaxForm(goods);
        }
    }

    //设置输入错误提示
    function setErrInfo(curErrInfo, curErrText, curInput, errText) {
        var className = arguments[4] || "form-input-error";
        curErrInfo.show();
        curErrText.text(errText);
        curInput.addClass(className);
    }

    //综合检测设置错误信息
    function setWholeErr(curErrInfo, curInput) {
        var curErrText = curErrInfo.children(".error-text");
        var errText = arguments[2] || "不能为空";
        setErrInfo(curErrInfo, curErrText, curInput, errText);
    }

    //填写表单，ajax提交
    function setAjaxForm(goods) {
        var mForm = new FormData();
        for (var i in goods) {
            if (i != "goodsPhoto") {
                switch (i) {
                    case "goodsName":
                        mForm.append("pro_name", goods[i]);
                        break;
                    case "masterTel":
                        mForm.append("contact", goods[i]);
                        break;
                    case "goodsIntro":
                        mForm.append("pro_desc", goods[i]);
                        break;
                    case "masterDesire":
                        mForm.append("desire", goods[i]);
                        break;
                    case "cateParent":
                        mForm.append("parent_cate", goods[i]);
                        break;
                    case "cateChild":
                        mForm.append("son_cate", goods[i]);
                        break;
                }
            } else {
                for (var j = 0; j < goods[i].length; j++) {
                    console.log(goods[i].length);
                    mForm.append("goodsPhoto_" + j, goods[i][j]);
                }
            }
        }
        $.ajax({
            url: "doAction.php?action=issue",
            type: "POST",
            data: mForm,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $('.issue-button').off('click');
                $('.issue-button').addClass('ajax-send');
            },
            success: function(data) {
                window.location.href = "detail.php?pro_id=" + data.pro_id;
            },
            error: function() {
                mes.show("上传失败，请重新上传！");
                $('.issue-button').on('click', completeTest);
                $('.issue-button').removeClass('ajax-send');
            }
        });
    }


    $(function() {
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
        };

        $(document).on("click", function(event) {
            var currentElem = event.target;
            if (!(util.getElemById("goods-cat-top").contains(currentElem)) && (util.getElemById("goods-cat-top") != currentElem)) {
                //隐藏第一级下拉菜单
                $(".issue-category").hide();
            }
            if (!(util.getElemById("goods-cat-next").contains(currentElem)) && (util.getElemById("goods-cat-next") != currentElem)) {
                //隐藏第二级下拉菜单
                $(".issue-category-next").hide();
            }
        });

        //第一级分类选择
        $("#goods-cat-top").on("click", function() {
            var topCat = $(".issue-category");
            if (topCat.is(":hidden")) {
                topCat.show();
            } else {
                topCat.hide();
            }
            $(this).removeClass("form-input-error");
            $(this).nextAll(".error-info").hide();
            $("#goods-cat-next").removeClass("form-input-error");
        });

        $("#issue-category").on("click", "li", function(event) {
            var currentTarget = $(event.target);
            var value = currentTarget.attr("value");
            var catInfo = currentTarget.text();

            $("#goods-cat-top > span").text(catInfo);
            $("[name='goods-cat-top']").val(value);
            if (value != 9) {
                $(".form-value-l").css("display", "inline-block");
            } else {
                $(".form-value-l").hide();
            }
            $("#goods-cat-next > span").text("未选择");
            $("[name='goods-cat-next']").attr("value", "");
            if (value != 9) {
                $(".issue-category-next li").each(function() {
                    util.showSubItem(value, $(this));
                });
            }
        });

        //第二级分类选择
        $("#goods-cat-next").on("click", function() {
            var catNext = $(".issue-category-next");
            if (catNext.is(":hidden")) {
                catNext.show();
            } else {
                catNext.hide();
            }
            $(this).removeClass("form-input-error");
            $("#goods-cat-top").nextAll(".error-info").hide();
        });

        $("#issue-category-next").on("click", "li", function(event) {
            var currentTarget = $(event.target);
            var value = currentTarget.attr("value");
            var catInfo = currentTarget.text();

            $("#goods-cat-next > span").text(catInfo);
            $("[name='goods-cat-next']").attr("value", value);
        });

        //预览上传的图片
        $("#first-upload-file").on("change", function() {
            var imgOpts = {
                uploadFiles: uploadFiles,
                files: this.files,
                btnParent: $(this).parent(),
                uploadBtn: $(this),
                flag: 1
            };
            util.imgView(imgOpts);
        });

        //清空输入框内的值及重置错误信息
        $(".form-input-wr input,.form-input-wr textarea").on("focus", function() {
            if ($(this).parent().hasClass("form-input-error")) {
                $(this).parent().removeClass("form-input-error");
                $(this).parent().next().hide();
            }
        });

        //设置勾选发布信息错误提示
        $("input[type='checkbox']").on("click", function() {
            if (this.checked) {
                $(".form-issue-wr").removeClass("form-input-error");
                $(".form-issue-wr").next().hide();
            } else {
                $(this).parent().addClass("form-input-error");
                $(this).parent().next().children(".error-text").text("请勾选同意发布规则");
                $(this).parent().next().show();
            }
        });

        //检测物品名称输入
        $("input[name='goods-title']").on("blur", function() {
            var valLen = $(this).val().length;
            var curErrInfo = $(this).parent().next();
            var curErrText = curErrInfo.children(".error-text");
            if (valLen == 0) {
                setErrInfo(curErrInfo, curErrText, $(this).parent(), "不能为空");
            } else if (valLen > 25) {
                setErrInfo(curErrInfo, curErrText, $(this).parent(), "输入不能多于25个字");
            } else {
                curErrInfo.hide();
                $(this).parent().removeClass("form-input-error");
            }
        });

        //检测联系方式输入
        $("input[name='goods-tele']").on("blur", function() {
            var reg = /^1[0-9]{10}$/;
            var curVal = $(this).val();
            var curErrInfo = $(this).parent().next()
            var curErrText = curErrInfo.children(".error-text");
            if (curVal == "") {
                setErrInfo(curErrInfo, curErrText, $(this).parent(), "不能为空");
            } else if (reg.test(curVal)) {
                curErrInfo.hide();
                $(this).parent().removeClass("form-input-error");
            } else {
                setErrInfo(curErrInfo, curErrText, $(this).parent(), "手机号格式不正确");
            }
        });

        //检测物品详情输入
        $("textarea[name='goods-detailed'],textarea[name='master-desire']").on("blur", function() {
            var curVal = $(this).val();
            var curErrInfo = $(this).parent().next()
            var curErrText = curErrInfo.children(".error-text");
            if (curVal == "") {
                setErrInfo(curErrInfo, curErrText, $(this).parent(), "不能为空");
            } else if ((curVal.length > 160) && (this.name == "goods-detailed")) {
                setErrInfo(curErrInfo, curErrText, $(this).parent(), "物品详情字数不能超过160字");
            } else {
                curErrInfo.hide();
                $(this).parent().removeClass("form-input-error");
            }
        });

        //综合检测
        $(".issue-button").on("click", completeTest);
        
    });

});
