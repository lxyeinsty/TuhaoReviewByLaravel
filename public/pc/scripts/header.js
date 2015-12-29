define(function(require) {
	var nickname = "",
		email = "",
		password = "";
	$(function() {
		$.ajaxSetup({
			dataType: "JSON"
		});
		//搜索框事件
		var $search = $("#search");
		var $search_btn = $(".logo-search");
		$search.on('keydown', function(event) {
			if (event.which === 13) {
				submitSearch();
			}
		})
		$search_btn.on('click', function() {
			submitSearch();
		})

		function submitSearch() {
			var content = $('#search').val().trim();
			if (content) {
				window.location.href = 'search?key=' + content;
			}
		}

		//切换导航展示li   
		var $bar = $(".progress-bar");
		$(".nav-lists>li").on({
				mouseenter: function() {
					$(this).find("article").addClass('article-active');
					if ($bar.is(":animated")) {
						$bar.stop(true, true);
					}
					$bar.animate({
						width: "100%"
					}, 'slow');
				},
				mouseleave: function() {
					$(this).find("article").removeClass('article-active');
					if ($bar.is(":animated")) {
						$bar.stop(true, true);
					}
					$bar.animate({
						width: "0"
					}, 'fast');
				}
			})
			//固定nav在页面顶端
		var $nav = $(".navigation");
		if($nav.length>0){
			var $top = $nav.offset().top;
			$(window).scroll(function() {
				if ($top <= $(this).scrollTop()) {
					$nav.addClass("nav-fixed-top");
				} else {
					$nav.removeClass("nav-fixed-top");
				}
			});
		}

		//登录弹框
		//登录弹框
		var openModal = function(target, close) { //打开弹窗效果			  
			target.modal({
				overlayClose: close,
				onOpen: function(dialog) {
					dialog.overlay.fadeIn("fast", function() { //罩层载入
						dialog.data.hide(); //数据载入动画
						dialog.container.fadeIn('fast', function() { //内容区载入
							dialog.data.fadeIn('normal'); //数据显示动画
							window.inp = target.children('input').eq(0);
							target.children('input').eq(0).focus();
						});
					});
				},
				overlayCss: {
					backgroundColor: "#000"
				},
				opacity: 85
			});

		}
		$("#for-login").on("click", function() {
			$.modal.close();
			openModal($("#login"), true);
			$('input[role="email"]').focus();
		})
		$("#for-signin").on("click", function() {
			$.modal.close();
			openModal($("#signin"), true);
		})

		var afterlogin = function() {
			var $logout = $(".logout");
			$("[role='self-info-btn']").on({
				mouseover: function() {
					$logout.css('display', 'flex');
				},
				mouseout: function() {
					$logout.hide();
				}
			});
			$("[role='login']").off();
			$("[role='release']").off("click").on("click", function() {
				$(this).find("a").attr('href', "/release");
			});
			var $mysending = $("#sending-table");
			$("[role='sending']").off("click").on({
				mouseover: function() {
					$mysending.show();
				},
				mouseout: function() {
					$mysending.hide();
				}
			});
			$('.item1 li[role="sending"]>a').attr("href", "personal?entrance=sending");
		}
		var beforeLogin = function() {
			$("[role='self-info-btn']").off();
			$("[role='login']").on("click", function() {
				openModal($("#login"), true);
			});
			$("[role='release']").off("click").on("click.before-login", function() {
				openModal($("#login"), true);
			})
			$("[role='sending']").off().on("click.before-login", function() {
				openModal($("#login"), true);
			});
			$('.logo-self-info').removeClass('after-log');
		}
		$(".logout").find("a").on('click', function() {
			beforeLogin();
		});

		var login_status = {
			init: function() {
				this.sign = $('.logo-self-info').attr('data-log');
			},
			render: function() {
				if (this.sign === "0") {
					beforeLogin();
				} else {
					afterlogin();
					$('.logo-self-info').addClass('after-log');
					$('#username').addClass('content-span');
				}
			}
		}
		login_status.init();
		login_status.render();
		$('.logout').on('click', function() {
			beforeLogin();
		})

		var nickFlag = false,
			emailFlag = false,
			sameFlag = false,
			pswFlag = false;
		$("#signin").find("[role='nickname']").on("blur", function() {
			nickFlag = false;
			var content = $(this).val();
			var $prompt = $(this).parent().next("span");
			var reg1 = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/;
			var reg2 = /^[\u4e00-\u9fa5A-Za-z0-9-_]{4,12}$/;
			if (!content) {
				$prompt.text("输入值不能为空！");
			} else if (!reg1.test(content)) {
				$prompt.text("输入只能中英文，数字，下划线和减号！");
			} else if (!reg2.test(content)) {
				$prompt.text("输入长度只能在4~12位！");
			} else {
				// 执行ajax操作
				$.ajax({
					url: "user/register/username",
					type: "post",
					data: {
						username: content
					},
					success: function(data) {
						if (!data.code) {
							$prompt.text(data.mes);
							nickFlag = false;
						} else {
							$prompt.text("");
							nickFlag = true;
						}
					}
				});
			}
		});
		// 验证邮箱登录
		$("#signin").find("[role='email']").on("blur", function() {
			emailFlag = false;
			var content = $(this).val();
			var $prompt = $(this).parent().next("span");
			var reg1 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if (content == "" || null) {
				$prompt.text("输入值不能为空！");
			} else if (!reg1.test(content)) {
				$prompt.text("邮箱格式不正确!");
			} else {
				// 执行ajax操作
				$.ajax({
					url: "user/register/email",
					type: "post",
					data: {
						email: content
					},
					success: function(data) {
						if (!data.code) {
							emailFlag = false
							$prompt.text(data.mes);
						}
						else {
							$prompt.text("");
							emailFlag = true;
						}
					}
				});
			}
		});
		// 密码格式验证
		$("#signin").find("[role='password']").on("change", function() {
			pswFlag = false;
			var signment = false;
			var content = $(this).val();
			var $prompt = $(this).parent().next("span");
			var reg1 = /^[a-zA-Z]\w*$/;
			var reg2 = /^[a-zA-Z]\w{5,15}$/;
			if (!content) {
				$prompt.text("密码不能为空！");
			} else if (!reg1.test(content)) {
				$prompt.text("密码以字母开头，只能包含字母,数字,下划线!");
			} else if (!reg2.test(content)) {
				$prompt.text("输入长度只能在6~16位！");
			} else {
				var content2 = $("#signin").find("[role='confirm']").val();
				if (content != content2) {
					$prompt.text("两次密码输入不一致");
					sameFlag = false;
				}
				pswFlag = true;
			}
		});
			// 密码一致性验证
		$("#signin").find("[role='confirm']").on("change", function() {
			sameFlag = false;
			var signment = false;
			var $prompt = $(this).parent().next("span");
			var content1 = $(this).val();
			var content2 = $("#signin").find("[role='password']").val();
			if (content1 != content2) {
				$prompt.text("两次密码输入不一致");
			} else {
				sameFlag = true;
			}
		});
		$("#signin").find(".submit-btn").on("click", function(event) {
				var $this = $(this);
				if ($this.hasClass('disabled')) {
					return;
				}
				$this.addClass('disabled');
				// var $agreement = $("#agree"); //是否同意	
				nickname = $("#signin").find("[role='nickname']").val();
				email = $("#signin").find("[role='email']").val();
				passowrd = $("#signin").find("[role='password']").val();
				if (!((nickFlag && emailFlag) && (sameFlag && pswFlag))) {
					$this.removeClass('disabled');
					return false;
				} else if (passowrd != $("#signin").find("[role='confirm']").val()) {
					$prompt.text("两次密码输入不一致");
					$this.removeClass('disabled');
					return false;
				} else {
					$.modal.close(); //关闭注册
					openModal($("#info"), false);
				}
			})
			// signin验证 

		var addString = function(text, ele) {
			ele.parent().addClass('set-log');
			$('#username').addClass('content-span').html('<a href="personal?entrance=sending">' + text + '</a>');
			ele.addClass('after-log');
		}
		$("#info").find("[name='submit']").on("click", function(event) {
			var $this = $(this);
			if ($this.hasClass('disabled')) {
				return;
			}
			$this.addClass('disabled');
			var sex = $("#info").find("[role='sex'] .select-value.after-select").attr("value").trim(),
				college = $("#info").find("[role='college'] .select-value.after-select").attr("value").trim(),
				enroll_year = $("#info").find("[role='enroll-year']").val().trim(),
				address = $("#info").find("[role='address'] .select-value.after-select").attr("value").trim();
			var sexFlag = false,
				collegeFlag = false,
				yearFlag = false,
				addressFlag = false;

			var $prompt = $('#info>ul>span').eq(0);
			var reg = /^['男'|'女']$/;
			if (!sex) {
				$prompt.text("性别不能为空");
			} else if (!reg.test(sex)) {
				$prompt.text("性别输入不正确！");
			} else {
				$prompt.text("");
				sexFlag = true;
			}

			$prompt = $('#info>ul>span').eq(1);
			reg = /^[\u4e00-\u9fa5]{0,}$/;
			if (!college) {
				$prompt.text("院系不能为空");
			} else if (!reg.test(college)) {
				$prompt.text("院系输入不正确");
			} else {
				$prompt.text("");
				collegeFlag = true;
			}

			$prompt = $('#info>ul>span').eq(2);
			reg = /^\d{4}$/;
			if (!enroll_year) {
				$prompt.text("入学年份不能为空");
			} else if (!reg.test(enroll_year)) {
				$prompt.text("只能为4位数字！");
			} else if (!(Number(enroll_year) >= 2002 && Number(enroll_year) <= 2015)) {
				$prompt.text("只能输入2002~2015入学年份");
			} else {
				$prompt.text("");
				yearFlag = true;
			}

			addressFlag = false;
			var $prompt = $('#info>ul>span').eq(3);
			if (!address) {
				$prompt.text("地址不能为空");
			} else {
				if ((address != "韵苑" && address != '紫菘') && (address != '沁苑' && address != '西区')) {
					addressFlag = false;
				} else {
					addressFlag = true;
				}
			}

			if (!((sexFlag && collegeFlag) && (yearFlag && addressFlag))) {
				$this.removeClass('disabled');
				return false;
			} else {
				$.ajax({
					url: "user/register/save",
					type: "post",
					data: {
						"username": nickname,
						"email": email,
						"password": $.md5(passowrd),
						"sex": sex,
						"college": college,
						"enroll_year": enroll_year,
						"address": address
					},
					success: function(data) {
						$this.removeClass('disabled');
						if (!data.code) {
							alert("注册失败，请确保网络连接正常！");
						} else {
							$.modal.close();
							window.location.href = "remind?action=register";
						}
					},
					error: function() {
						$this.removeClass('disabled');
						alert("注册失败，服务器有错误发生！")
					}
				});
			}
		})

		//个人信息验证

		// login验证
		function login(ele) {
			var $this = $("#login").find("[name='submit']");
			if ($this.hasClass('disabled')) {
				return;
			}
			$this.addClass('disabled');
			var _password = $("#login").find("[role='password']").val();
			_email = $("#login").find("[role='email']").val(),
			$prompt = $('#login ul>span').eq(1);
			if (_password === "" || _password == null || _email === "" || _email == null) {
				$prompt.text('请填写正确的邮箱与密码');
				$this.removeClass('disabled');
			} else {
				$.ajax({
					url: "user/login",
					type: "post",
					data: {
						password: $.md5(_password),
						email: _email,
					},
					success: function(res) {
						$this.removeClass('disabled');
						switch (res.code) {
							case 1:
								$prompt.text("");
								$.modal.close();
								afterlogin();
								var data = res.data;
								addString(data.username, $(".logo-self-info"));
								$('i.logo-self-info').attr('data-log', data.id);
								if (data.sentNum) {
									$("[role='sending']>a").html('我的送送 (' + data.sentNum + ')');
								} else {
									$("[role='sending']>a").html('我的送送');
								}
								if (data.mesNum) {
									$("[role='sending'] li a").eq(1).html('新留言 (' + data.mesNum + ')');
								} else {
									$("[role='sending'] li a").eq(1).html('新留言 ');
								}
								break;
							case 2:
								window.location.href = "/remind?action=login";
								break ;
							default:
								$prompt.text(res.mes);
								break;
						}
					},
					error: function() {
						$this.removeClass('disabled');
						$prompt.text('服务器错误！');
					}
				});
			}
		}

		$("#login").find("[name='submit']").on("click", function(event) {
			login();
		});

		$("#login").find("[role='password']").on('keydown', function(event) {
			if (event.which === 13) {
				login();
			}
		})

		//清空提示信息
		var ClearInfo = {
			$all_input: $("#login input,#info input,#signin input"), //获取登录框的input
			clearInfo: function(ele) {
				var $prompt = ele.parent().next("span");
				$prompt.text(' ');
			},
			init: function() {
				var _this = this;
				this.$all_input.each(function() {
					$(this).on('focus', function() {
						_this.clearInfo($(this));
					})
				})
			}
		}
		ClearInfo.init();
		//自定义登录框

		var _college = require('./modules/config').college; //返回学院信息
		var SelfSelect = {
			$college_ul: $("#colleges"),
			$college_btn: $('#college-btn'),
			$sex_ul: $("#sex-content"),
			$sex_btn: $('#sex'),
			$address_ul: $("#address_ul"),
			$address_btn: $('#address'),
			$all_items: $('[data-range="info"]'),
			$down_arrow: $('.down-arrow'),
			returnLis: function(data, ele) { //添加信息
				var _html = ele.html(),
					content = [];
				for (i in data) {
					content.push(_html.replace('++content++', data[i]));
				}
				return content.join('');
			},
			addLis: function() {
				var _html = this.returnLis(_college, this.$college_ul);
				this.$college_ul.html(_html);
			},
			turn: function(ele) {
				if (ele.css('display') == 'block') {
					ele.hide();
				} else {
					ele.show();
					this.$all_items.not(ele).hide();
				}
			},
			//替换选择的内容
			replaceText: function($target, $replace) {
				$target.text($replace.text());
				$target.attr("value", $replace.text());
			},
			removeClass: function($ele, classname) {
				$ele.removeClass(classname);
			},
			toggleClass: function($ele, classname) {
				$ele[0].classList.toggle(classname);
			},
			bindClick: function(btn, ul) {
				var _this = this;
				//给院系的btn绑定弹出事件.
				btn.on('click', function() {
					_this.turn(ul);
					//选中down-arrow出现的样式
					var _down = $(this).find('.down-arrow');
					_this.$down_arrow.not(_down).removeClass('down-arrow-after');
					_this.toggleClass(_down, 'down-arrow-after');

				});
				//选定院系中的li，然后隐藏院系列表
				ul.on('click', function(event) {
					var $target = $(event.target);
					if ($target[0].tagName !== "LI") {
						return;
					}
					_this.removeClass(_this.$down_arrow, "down-arrow-after");
					//选中LI出现的样式				
					$(this).prev().find('.select-value').addClass('after-select');
					//替换btn里面选中的内容.
					_this.replaceText(btn.find('.select-value'), $target);
					$(this).hide();
				})
			},
			init: function() {
				this.bindClick(this.$college_btn, this.$college_ul);
				this.bindClick(this.$sex_btn, this.$sex_ul);
				this.bindClick(this.$address_btn, this.$address_ul);
			}
		}
		SelfSelect.addLis();
		SelfSelect.init();
		//点击忘记密码，跳转页面
		$('#login .forgetps-btn').on('click', function() {
			window.location.href = '/forget-password';
		})
	})
})