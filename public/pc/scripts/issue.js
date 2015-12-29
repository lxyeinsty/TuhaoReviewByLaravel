$.ajaxSetup({
	dataType: "JSON"
});
var uploadFiles = [];
var goodsName;
var mes;
var mFilter = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
var imgMaxSize = 409600;
var initWidth = 928 * 0.7;
var initHeight = 550;
var compressWidth = 800;
var compressHeight = 800;
//通过ID获取元素
function getElem(id) {
	return document.getElementById(id);
}

//综合检测
function completeTest() {
	var goods = {};
	var curErrInfo;
	var curErrText;
	var flag = 0;
	var check = document.getElementById('check-issue').checked;
	if (!check) {
		setWholeErr($("input[type='checkbox']").parent().next(), $("input[type='checkbox']").parent(), "请勾选同意发布规则");
		return;
	}
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
	var activity = $('#check-activity').is(':checked');
	if (activity) {
		activity = 1;
	} else {
		activity = 0;
	}
	goods["activity"] = activity;

	if (!flag) {
		//填写提交表单
		goodsName = goods.goodsName;
		setAjaxForm(goods);
	}
}

//显示相关联的第二级分类项
function showItem(pkitem, curElem) {
	if (curElem.attr("pkitem") == pkitem || curElem.attr("pkitem") == 99) {
		curElem.addClass("item-show");
	} else if (curElem.hasClass("item-show")) {
		curElem.removeClass("item-show");
	}
}

//添加节点
function addNode(srcNode, desNode, addWay) {
	switch (addWay) {
		case "after":
			desNode.after(srcNode);
			break;
		case "append":
			desNode.append(srcNode);
	}
}

//判断图片是否重复
function isImgRepeat(curImg, imgFiles) {
	for (var i = 0, len = imgFiles.length; i < len; i++) {
		if (curImg.src === imgFiles[i].src) {
			return true;
		}
	}
	return false;
}

//图片压缩
function compress(srcImg, imgSize, outFormat) {
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext("2d");
	var resultImg = new Image();
	//获取图片真实高度和宽度
	resultImg.src = srcImg;
	var width = resultImg.naturalWidth;
	var height = resultImg.naturalHeight;
	var scale;

	if (width > initWidth || height > initHeight) {
		if (width > height) {
			scale = initWidth / width;
			width = width * scale;
			height = height * scale;
		} else {
			scale = initHeight / height;
			width = width * scale;
			height = height * scale;
		}
	}

	cvs.width = width;
	cvs.height = height;

	//铺底色
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	ctx.drawImage(resultImg, 0, 0, cvs.width, cvs.height);
	if (imgSize > imgMaxSize) {
		resultImg.src = cvs.toDataURL('image/webp', 0.5);
	}
	ctx.drawImage(resultImg, 0, 0);
	var newImg = cvs.toDataURL(outFormat, 1);
	return newImg;
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

//压缩完图片显示
function showCompress(mFiles, blob, i, length) {
	blob = toBlob(mFiles[i].src, mFiles[i].type);
	blob.index = uploadFiles.length;
	blob.src = mFiles[i].src;
	mFiles[i].index = uploadFiles.length;
	uploadFiles.push(blob);
	if (i === 0) {
		$(".add-photo-frame").hide();
		$(".photo-preview-area").show();
	}
	var newPreview = "<div class='upload-ph'>" +
		"<div class='upload-preview' style='background-image:url(" + blob.src + ")'></div>" +
		"<a href='javascript:void(0)' class='delete-photo' picIndex=" + blob.index + "></a>" + "</div>";
	addNode(newPreview, $(".upload-photo-area"), "append");
	var newInitArea = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file' multiple accept='image/jpeg,image/png,image/gif'>" + "</div>";
	delPhotoEvent(newInitArea);
	i++;
	imgPreview(i, mFiles, length);
}

function showCompress2(blob, mFiles, i, length, curInput) {
	blob = toBlob(mFiles[i].src, mFiles[i].type);
	blob.src = mFiles[i].src;
	blob.index = uploadFiles.length;
	mFiles[i].index = uploadFiles.length;
	if (i === 0) {
		curInput.remove();
	}
	if (isImgRepeat(mFiles[i], uploadFiles)) {
		mes.show("图片已重复！请重新选择");
		i++;
		photoPre(i, mFiles, length, curInput);
	} else {
		uploadFiles.push(blob);
		var newPreview = "<div class='upload-ph'>" +
			"<div class='upload-preview' style='background-image:url(" + blob.src + ")'></div>" +
			"<a href='javascript:void(0)' class='delete-photo' picIndex=" + blob.index + "></a>" + "</div>";
		addNode(newPreview, $(".upload-photo-area"), "append");
		var newInitArea = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file' multiple accept='image/jpeg,image/png,image/gif'>" + "</div>";
		delPhotoEvent(newInitArea);
		i++;
		photoPre(i, mFiles, length);
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

//绑定添加图片事件
function addPhotoEvent() {
	//更改添加图片的hover样式
	$(".upload-ph .upload-file").on("mouseover", function() {
		$(".init-photo").addClass("init-photo-hover");
	}).on("mouseout", function() {
		$(".init-photo").removeClass("init-photo-hover");
	});
	//预览上传的图片
	$(".upload-file").on("change", function(event) {
		var mFReader = new FileReader();
		var curInput = $(this);
		var newUpload = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file' multiple accept='image/jpeg,image/png,image/gif'>" + "</div>";
		var mFiles = event.target.files;
		var i = 0;
		//检测图片是否会超过4张
		if (uploadFiles.length + mFiles.length > 4) {
			mes.show("亲，最多只能上传4张图片哟！");
			curInput.parent().remove();
			addNode(newUpload, $(".upload-photo-area"), "append");
			addPhotoEvent();
		} else {
			photoPre(i, mFiles, mFiles.length, curInput.parent());
		}
	});
}

//添加照片多图预览
function photoPre(i, mFiles, length, curInput) {
	var newInitArea = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file' multiple accept='image/jpeg,image/png,image/gif'>" + "</div>";
	//检测图片格式是否正确
	if ((i < length) && !mFilter.test(mFiles[i].name)) {
		mes.show("只支持jpg、png、gif格式");
		i++;
		if (i === length) {
			return;
		}
		photoPre(i, mFiles, length, curInput);
		return;
	}
	if (i === length) {
		if (uploadFiles.length < 4) {
			addNode(newInitArea, $(".upload-photo-area"), "append");
			addPhotoEvent();
		}
		return;
	}
	var mFReader = new FileReader();
	var blob;
	mFReader.onload = function(mFREvent) {
		mFiles[i].src = mFREvent.target.result;
		if (testImg(mFiles[i].src)) {
			lrz(mFiles[i], {
				width: compressWidth,
				height: compressHeight
			}).then(function(rst) {
				mFiles[i].src = rst.base64;
				showCompress2(blob, mFiles, i, length, curInput);
			});
		} else if (mFiles.size > imgMaxSize) {
			lrz(mFiles[i]).then(function(rst) {
				mFiles[i].src = rst.base64;
				showCompress2(blob, mFiles, i, length, curInput);
			});
		} else {
			showCompress2(blob, mFiles, i, length, curInput);
		}
	};
	mFReader.readAsDataURL(mFiles[i]);
}

//绑定删除图片事件
function delPhotoEvent(newInitArea) {
	//删除图片
	$(".delete-photo").unbind('click').on("click", function() {
		var parentElem = $(this).parent();
		var picIndex = $(this).attr("picIndex");
		picIndex = parseInt(picIndex);
		parentElem.remove();
		uploadFiles.splice(picIndex, 1);
		for (var i = 0; i < uploadFiles.length; i++) {
			uploadFiles[i].index = i;
			$(".delete-photo:eq(" + i + ")").attr("picIndex", i);
		}
		//判断预览区内是否还有图片
		if ($(".upload-preview").length == 0) {
			$(".upload-photo-area").empty();
			$(".photo-preview-area").hide();
			$(".add-photo-frame").show();
		} else if ($(".upload-preview").length < 4) {
			if (!($(".photo-preview-area").find(".init-photo").length)) {
				addNode(newInitArea, $(".upload-photo-area"), "append");
				addPhotoEvent();
			}
		}
	});
}

//显示上传成功后的图片
function changeInit(curElem, imgUrl, picIndex) {
	var newInitArea = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file'>" + "</div>";
	curElem.removeClass();
	curElem.addClass("upload-preview");
	curElem.css("background-image", "url(" + imgUrl + ")");
	addNode("<a href='javascript:void(0)' class='delete-photo'></a>", curElem, "after");
	curElem.next().attr("picIndex", picIndex);
	delPhotoEvent(newInitArea);
	if ($(".upload-preview").length != 4) {
		addNode(newInitArea, curElem.parent(), "after");
		addPhotoEvent();
	}
}

//多图片预览显示
function imgPreview(i, mFiles, length) {
	var newInitArea = "<div class='upload-ph'>" + "<div class='init-photo'></div>" + "<input type='file' class='upload-file' multiple accept='image/jpeg,image/png,image/gif'>" + "</div>";
	var blob;
	//检测图片格式是否正确
	if ((i < length) && !mFilter.test(mFiles[i].name)) {
		mes.show("只支持jpg、png、gif格式");
		i++;
		if (i === length) {
			return;
		}
		arguments.callee(i, mFiles, length);
		return;
	}
	if (i === length) {
		if (uploadFiles.length < 4) {
			addNode(newInitArea, $(".upload-photo-area"), "append");
			addPhotoEvent();
		}
		return;
	}
	var mFReader = new FileReader();
	mFReader.onload = function(mFREvent) {
		mFiles[i].src = mFREvent.target.result;
		if (testImg(mFiles[i].src)) {
			lrz(mFiles[i], {
				width: compressWidth,
				height: compressHeight
			}).then(function(rst) {
				mFiles[i].src = rst.base64;
				showCompress(mFiles, blob, i, length);
			});
		} else if (mFiles[i].size > imgMaxSize) {
			lrz(mFiles[i]).then(function(rst) {
				mFiles[i].src = rst.base64;
				showCompress(mFiles, blob, i, length);
			});
		} else {
			showCompress(mFiles, blob, i, length);
		}

	};
	mFReader.readAsDataURL(mFiles[i]);
}

//更新添加图片按钮
function updateAddPhoto() {
	var mFiles = this.files;
	var curParent = $(this).parent();
	var i = 0;
	$(this).remove();
	curParent.append("<input type='file' id='first-upload-file' multiple accept='image/jpeg,image/png,image/gif'>");
	$("#first-upload-file").on("change", updateAddPhoto);
	//检测上传图片数是否超过四张
	if (mFiles.length > 4) {
		mes.show("图片上传多于四张，请重新选择");
		return;
	} else {
		imgPreview(i, mFiles, mFiles.length);
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
				case "activity":
					mForm.append("activity", goods[i]);
					break;
			}
		} else {
			for (var j = 0; j < goods[i].length; j++) {
				mForm.append("goodsPhoto_" + j, goods[i][j], "1.jpg");
			}
		}
	}
	$.ajax({
		url: "goods/issue",
		type: "POST",
		data: mForm,
		processData: false,
		contentType: false,
		beforeSend: function() {
			$('.issue-button').off('click');
			$('.issue-button').addClass('ajax-send');
		},
		success: function(res) {
			if(res.code){
				var data = res.data;
				window.location.href = "details?pro_id=" + data.pro_id;
			}
			else {
				mes.show(res.mes);
				$('.issue-button').on('click', completeTest);
				$('.issue-button').removeClass('ajax-send');
			}
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
		if (!(getElem("goods-cat-top").contains(currentElem)) && (getElem("goods-cat-top") != currentElem)) {
			//隐藏第一级下拉菜单
			$(".issue-category").hide();
		}
		if (!(getElem("goods-cat-next").contains(currentElem)) && (getElem("goods-cat-next") != currentElem)) {
			//隐藏第二级下拉菜单
			$(".issue-category-next").hide();
		}
	});

	//第一级分类选择
	$("#goods-cat-top").on("click", function() {
		var catTop = $(".issue-category");
		if (catTop.css("display") == "none") {
			catTop.show();
		} else {
			catTop.hide();
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
				showItem(value, $(this));
			});
		}
	});

	//第二级分类选择
	$("#goods-cat-next").on("click", function() {
		var catNext = $(".issue-category-next");
		if (catNext.css("display") == "none") {
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
	$("#first-upload-file").on("change", updateAddPhoto);

	//清空输入框内的值及重置错误信息
	$(".form-input-wr input,.form-input-wr textarea").on("focus", function() {
		if ($(this).parent().hasClass("form-input-error")) {
			$(this).parent().removeClass("form-input-error");
			$(this).parent().next().hide();
		}
	});

	//设置勾选发布信息错误提示
	//  $("input[type='checkbox']").on("click", function() {
	//      if (this.checked) {
	//          $(".form-issue-wr").removeClass("form-input-error");
	//          $(".form-issue-wr").next().hide();
	//      } else {
	//          $(this).parent().addClass("form-input-error");
	//          $(this).parent().next().children(".error-text").text("请勾选同意发布规则");
	//          $(this).parent().next().show();
	//      }
	//  });

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