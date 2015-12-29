define(function(require) {
	var $ul, $header, $user, $avatar;
	var user_id, user_mask;
	var mes = {},
		overLayer = {},
		pages = {};
	var state = false;
	var first = false;
	var jcrop_api, boundx, boundy, $pcnt, canvas, image, ctx,
		Pathurl = {
			getInfo: '/user/info', //请求得到基本信息,姓名，学院
			changeInfo: '/user/edit' //修改提交，姓名，学院, 返回成功失败
		}
	var txtUtil = require('./modules/textUtil');
	window.onload = function() {
		init();

		$('.list>ul').on('click', '.item.new a.btn', function() {

			var $this = $(this);
			var $item = $this.parents('.item');
			var pro_id = parseInt($item.find('.goodsName').first().attr('data-id'), 10);
			$.post('goods/sign', {
				pro_id: pro_id
			}, function(res) {
				//		  res = $.parseJSON(res);
				mes.show(res.mes);
				if (res.code == 1) {
					$item.removeClass('new');
					$this.html("收到");
				}
			});
		});

		$('.list>ul').on('click', '.textWrapper a.btn', function() {
			var $this = $(this);
			var $replay = $this.parents('.mes').find('.replay');
			if ($replay.css('display') === 'block') {
				$replay.css('display', 'none');
			} else {
				$replay.css('display', 'block');
			}
		});

		$('.list>ul').on('click', '.replay a.btn', function() {
			var $this = $(this);
			var $textArea = $this.prev();
			var $mes = $this.parents('.mes');
			var $title = $mes.find('.mes_title');
			var $goods = $title.find('.goods');
			var $username = $title.find('.username');
			var $text = $mes.find('.textWrapper .text');
			var pro_id = parseInt($goods.attr('data-id'), 10);
			var parent_id = parent_id = parseInt($text.attr('data-parent'), 10);
			if (!parent_id) {
				parseInt($text.attr('data-id'), 10);
			}
			var sender_id = user_id;
			var receiver_id = parseInt($username.attr('data-id'), 10);
			var text = $textArea.html().trim();
			text = txtUtil.decode(text);
			if (text != "" && text != '\r\n') {
				$.post('comment/add', {
					parent_id: parent_id,
					pro_id: pro_id,
					sender_id: sender_id,
					receiver_id: receiver_id,
					content: text
				}, function(res) {
					if(res.code){
						$this.parents('.mes').removeClass('new');
					}
					mes.show(res.mes);
				})
			}
			$textArea.html('<br />');
		});

		$('.pages').on('click', 'li', function() {
			var $this = $(this);
			if ($this.hasClass('active')) {
				return;
			}
			var $num = parseInt($this.attr('data-num'), 10);
			var tab = findTab();
			if ($num == -3) {
				return;
			} else {
				var cur = pages.getCur();
				if ($num == -1) {
					if (cur > 1) {
						pages.removeActive();
						cur--;
						pages.update(cur);
					}
				} else if ($num == -2) {
					if (cur < pages.max) {
						pages.removeActive();
						cur++;
						pages.update(cur);
					}
				} else {
					cur = parseInt($num, 10);
					pages.removeActive();
					pages.update(cur);
				}
				if (tab != 4) {
					getGoods(cur, tab);
				} else {
					getMes(cur);
				}
			}

		});

		$avatar.on('click', function() {
			overLayer.show();
		});

		$('#overLayer>a').on('click', function() {
			overLayer.hide();
		});

		$('input[type=file]').change(function() {
			var file = this.files[0];
			var reader = new FileReader();
			reader.onload = function() {
				var url = reader.result;
				setImageURL(url);
				if (first) {
					ctx.clearRect(0, 0, 202, 202);
					jcrop_api.setImage(url);
					jcrop_api.setOptions({
						onChange: updatePreview,
						onSelect: updatePreview,
						aspectRatio: 1,
						boxWidth: 300,
						boxHeight: 400
					});
				} else {
					first = true;
					$('#target').Jcrop({
						onChange: updatePreview,
						onSelect: updatePreview,
						aspectRatio: 1,
						boxWidth: 300,
						boxHeight: 400
					}, function() {
						// Use the API to get the real image size
						var bounds = this.getBounds();
						boundx = bounds[0];
						boundy = bounds[1];
						// Store the API in the jcrop_api variable
						jcrop_api = this;
					});
				}
			};
			reader.readAsDataURL(file);
		});
		$.ajaxSetup({
			dataType: 'JSON',
			type: 'POST'
		})
		$('.submit').on('click', function() {
			var data = canvas.toDataURL("image/png");
			data = data.split(',')[1];
			$.ajax({
				url: 'user/headPhoto',
				type: "POST",
				data: {
					file: data
				},
				success: function(res) {
					mes.show(res.mes);
					if(res.code){
						ctx.clearRect(0, 0, 202, 202);
						jcrop_api.release();
						$avatar.attr('src', res.data.src);
						overLayer.hide();
					}
				}
			});

		});

		$('.personal').on('click', 'a.btn', function() {
			var $this = $(this);
			if ($this.hasClass('active')) {
				return;
			} else {
				var str = '';
				if ($this.hasClass('goods')) {
					$this.parent().find('.active').removeClass('active');
					$this.addClass('active');

					$header.find('.mes').css('display', 'none');
					$header.find('.active').removeClass('active');
					var $headerGoods = $header.find('.goods');
					$headerGoods.find('li>a').first().addClass('active');
					$headerGoods.css('display', 'block');
					getGoods(1, 1);
					$("[role='sending']>a").html('我的送送');
				} else if ($this.hasClass('mes')) {
					$this.parent().find('.active').removeClass('active');
					$this.addClass('active');

					$header.find('.goods').css('display', 'none');
					$header.find('.active').removeClass('active');
					var $headerMes = $header.find('.mes');
					$headerMes.find('li>a').first().addClass('active');
					$headerMes.css('display', 'block');
					getMes(1);
					$("[role='sending']>a li").eq(1).html('新留言');
				}
				$(".detail").hide();
				$('.list').show();
			}
		});

		$header.on('click', 'li>a', function() {
			var $this = $(this);
			if ($this.hasClass('active')) {
				return;
			} else {
				$header.find('.active').removeClass('active');
				$this.addClass('active');

				var tab = findTab();
				if (tab == 4) {
					getMes(1);
				} else {
					getGoods(1, tab);
				}
			}
		})

		$('.textArea').on('paste', function() {
			var $this = $(this);
			setTimeout(function() {
				var text = $this.html();
				text = text.replace(/<br\s*\/?>/gi, "\r\n");
				text = text.replace(/&nbsp;/g, " ");
				$this.html(text);
				text = $this.text();
				text = txtUtil.encode(text);
				$this.html(text);
			}, 2)
		});
	}

	function init() {
		// page init

		pages = require('./modules/pages');
		pages = pages.initPage();

		//dom init
		$ul = $('.list>ul');
		$header = $('.list>header');
		$user = $('.personal>.info .name');
		user_id = parseInt($user.attr('data-id'), 10);
		//user_mask = $user.attr('data-mask');
		$avatar = $('#avatar');

		//Obj init
		mes = require('./modules/mes').mes;

		overLayer = require('./modules/overLayer').overLayer;

		//select init
		var Select = require('./modules/select');
		var col = new Select();
		var collegeArray = require('./modules/config').college;
		col.init($('#editColleges')[0], collegeArray);
		var addr = new Select();
		addr.init($('#editAddress')[0]);
		//img init
		$pcnt = $('canvas');
		canvas = $pcnt[0];
		image = new Image();
		ctx = canvas.getContext('2d');
		/*
		 * 切换账户资料和list
		 */
		var Edit = {
			edit_btn: $('.edit-info'), //编辑信息-btn
			list: $('.list'), //list信息
			detail: $('.detail'), //用户信息
			finish_edit: $('.finish-edit'), //完成编辑
			info: $('.nickname'), //名字
			colleges: $('#editColleges .textWrapper'), //院系
			address: $('#editAddress .textWrapper'), //地址
			showDetail: function() {
				var _this = this;
				this.edit_btn.on('click', function() {
					if (_this.detail.css('display') == "none")
						toggleShow(_this.detail, _this.list);
					else
						toggleShow(_this.list, _this.detail);
				});
				//发送请求，并填入信息
				$.ajax({
					url: Pathurl.getInfo,
					type:'get'
				}).done(function(res) {
					if(res.code){
						var data = res.data;
						_this.info.val(data.username);
		//				$('#editColleges .option[data-value="'+data.department+'"]').addClass('active')
						_this.colleges.attr('data-value', data.college);
						_this.colleges.text(data.college);
						_this.address.attr("data-value", data.address);
						_this.address.text(data.address);
					}
				});
			},
			checkInfo: function(name, department, address) {
				var reg = /^[\u4e00-\u9fa5A-Za-z0-9]*$/;;
				if (name == '' || name === null || department == '' || department === null || address == '') {
					mes.show('信息不能为空');
					return false;
				} else if (!(reg.test(name) && reg.test(department) && reg.test(address))) {
					mes.show('对不起，只能输入中英文数字!');
					return false;
				} else {
					return true;
				}

			},
			finishEdit: function() {
				var _this = this;
				this.finish_edit.on('click', function() {
					var name = _this.info.val().trim(),
						department = _this.colleges.attr('data-value').trim(),
						address = _this.address.attr('data-value').trim();
					if (_this.checkInfo(name, department, address)) {
						$.ajax({
							url: Pathurl.changeInfo,
							data: {
								username: name,
								college: department,
								address: address
							}
						}).done(function(data) {
							//信息修改成功后，改变弹窗的结构
							if (data.code) {
								toggleShow(_this.list, _this.detail);
								mes.show("编辑成功!!!");
							} else {
								mes.show("编辑失败,请重新编辑!");
							}
						})
					}
				})
			},
			init: function() {
				this.showDetail();
				this.finishEdit();
			}
		}
		Edit.init();

	}
	/*
	 * 切换显示第一个和第二个btn
	 */
	function toggleShow(first, second) {
		first.show();
		second.hide();
	}

	function setImageURL(url) {
		image.src = url;
		$('#target').attr('src', url);
	}

	function updatePreview(c) {
		if (parseInt(c.w) > 0) {
			ctx.drawImage(image, c.x, c.y, c.w, c.h, 0, 0, 202, 202);
		}
	};


	function createMesList(data) {
		var $li = $('<li class="mes"></li>');
		if (data.status == 0) {
			$li.addClass('new');
		}
		$li.html('<div class="mes_title"><span class="username"></span><span>在你的</span><span class="goods"></span><span>回复你：</span></div><div class="textWrapper"><div class="text"><a href=""></a></div><a href="javascript:void(0);" class="btn">回复</a></div>')
		var $username = $li.find('.username');
		var $goods = $li.find('.goods');
		var $text = $li.find('.text');
		$username.attr('data-id', data.sender_id);
		$username.html(data.sender_author);
		$goods.attr('data-id', data.pro_id);
		$goods.html(data.goods_name);
		$text.attr('data-id', data.id);
		$text.attr('data-parent', data.parent_id);
		$text.find('a').attr('href', 'details?pro_id=' + data.pro_id);
		var text = data.content;
		text = txtUtil.encode(text);
		$text.find('a').html(text);
		$li.append('<div class="replay" style="display: none;"><span class="caret"></span><span class="caret front"></span><div class="textArea" contenteditable="true"><br /></div><a href="javascript:void(0);" class="btn">提交</a></div>');
		var $tem = $('<div></div>');
		$tem.append($li);
		return $tem.html();
	}

	function creatGoodsList(data, tab) {
		var $li = $('<li class="item"></li>');
		$li.html('<div class="goodsName"></div><div class="wrapper"><div class="text"><a href=""></a></div></div><a href=""><img src=""/></a>');
		var $goodsName = $li.find('.goodsName');
		var $wrapper = $li.find('.wrapper');
		var $a = $li.find('a');
		var $text = $li.find('.text a');
		var $img = $li.find('img');
		$a.attr('href', 'details?pro_id=' + data.pro_id);
		if (tab == 1) {
			if (data.status == 0) {
				$text.html('我送给了' + data.receiver_author + '，正在等待他确认收到哦！');
			} else {
				$text.html('我送给了' + data.receiver_author + '，收获了他给我的10分！');
			}
		} else if (tab == 2) {
			if (data.status == 0) {
				$li.addClass('new');
				$wrapper.append('<a href="javascript:void(0);" class="btn">确认</a>');
			} else {
				$wrapper.append('<a href="javascript:void(0);" class="btn">收到</a>');
			}
			$text.html('我终于从@' + data.sender_author + '收到了心心念念的物品呢！');
		} else if (tab == 3) {
			$text.html('快来看看有谁想要~');
		}
		$goodsName.attr('data-id', data.pro_id);
		$goodsName.html(data.goods_name);
		$img.attr('src', data.src);
		var $tem = $('<div></div>');
		$tem.append($li);
		return $tem.html();
	}

	function findTab() {
		var tab = $header.find('.active').first().attr('data-tab');
		if (!tab) {
			tab = 1;
		}
		return tab;
	}

	function getGoods(curPage, tab) {
		var entrance = "sent";
		if (tab == 2) {
			entrance = "received"
		} else if (tab == 3) {
			entrance = "sending"
		}
		$.ajax({
			type: "get",
			url: 'goods/personal',
			data: {
				entrance:entrance,
				curPage: curPage
			},
			success: function(res) {
				if (res.code == 1) {
					res= res.data;
					if (res.maxPage == 0) {
						pages.max = 1;
						pages.update(1);
					} else {
						pages.max = res.maxPage;
						pages.update(res.curPage);
					}
					var str = '';
					var len = res.data.length;
					if (len == 0) {
						str = '<li class="item" style="text-align: center;">这里还什么都没有。</li>'
					} else {
						for (var i = 0; i < len; i++) {
							str += creatGoodsList(res.data[i], tab);
						}
					}
					$ul.html(str);
					$('html,body').animate({
						scrollTop: 0
					}, 0);
					if (res.newNum) {
						if (tab == 1) {
							$('.list>header a[data-tab="1"]').html('我送出的 (' + res.newNum + ')');
						} else if (tab == 2) {
							$('.list>header a[data-tab="2"]').html('我收到的 (' + res.newNum + ')');
						}
					}
				}
			}
		});
	}

	function getMes(curPage) {
		$.get('comments/personal', {
			curPage: curPage
		}, function(res) {
			//	res = $.parseJSON(res);
			if (res.code == 1) {
				res = res.data;
				if (res.maxPage == 0) {
					pages.max = 1;
					pages.update(1);
				} else {
					pages.max = res.maxPage;
					pages.update(res.curPage);
				}
				var str = "";
				var len = res.data.length;
				if (len == 0) {
					str = '<li class="item" style="text-align: center;">这里一条消息也没有。</li>';
				}
				for (var i = 0; i < len; i++) {
					str += createMesList(res.data[i]);
				}
				$ul.html(str);
				if (res.newNum) {
					$('.list>header a[data-tab="4"]').html('我收到的留言 (' + res.newNum + ')');
				}
				$('html,body').animate({
					scrollTop: 0
				}, 0);
			}
		});
	}
});