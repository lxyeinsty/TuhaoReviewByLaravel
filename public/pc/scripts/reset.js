$(function() {
	//显示提示
	function showPrompt(text) {
		var $prompt = $('.prompt');
		$prompt.text(text);
		$prompt.show();
	}
	//隐藏提示
	function hidePrompt() {
		var $prompt = $('.prompt');
		$prompt.hide();
	}
	//路由地址
	var route_path = {
		forget: 'user/forgetPwd', //忘记密码地址
		reset: 'user/resetPwd', //重置密码地址
		jump_page: '/' //密码重置成功后的跳转页面

	};

	var DEFAULT_AJAX = {
			type: 'post',
			dataType: 'JSON'
		}
		//设置ajax的返回data
	var ajax_data,
		sign = false;
	/*
	 * fn: 验证邮箱地址，并且发送数据
	 *
	 */
	function comfirEmail() {
		var email = $('#email').val().trim(),
			reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if (email == null || email == "") {
			showPrompt('输入邮箱不能为空哦~~');
		} else if (!reg.test(email)) {
			showPrompt('邮箱格式不正确哦~~');
		}
	}

	function comfirPs() {
		var ps = $('.new-password').val().trim(),
			reg = /^[a-zA-Z]\w{5,15}$/; //邮箱验证
		if (reg == null || ps == "") {
			showPrompt('密码不能为空哦~~');
		} else if (!reg.test(ps)) {
			showPrompt('密码输入长度只能在6~16位！');
		}
	}

	function agComfirPs() {
		var ps = $('.new-password').val().trim(),
			ag_ps = $('.confir').val().trim();
		if (ps != ag_ps) {
			showPrompt('密码不一致,请重新输入!');
		} else {
			sign = true;
		}
	}

	function sendEmail() {
		var email = $('#email').val().trim(),
			password1 = $('.new-password').val().trim(),
			password2 = $('.confir').val().trim();
		if(password1 !== password2){
			showPrompt('密码不一致,请重新输入!');
			return ;
		}
		$.ajax({
			url: route_path.reset,
			type: 'post',
			dataType: 'JSON',
			data: {
				'email': email,
				'password': $.md5(password1),
			},
			success: function(data) {
				if (data.code) {
					window.location.href = route_path.jump_page;
				} else {
					showPrompt(data.mes);
				}
			}
		})

	}
	//当失去input框的焦点时，显示提示信息
	$('#email').on({
		focus: function() {
			hidePrompt();
		},
		blur: function() {
			comfirEmail();
		}
	})
	$('.new-password').on({
		focus: function() {
			hidePrompt();
		},
		blur: function() {
			comfirPs();
		}
	})
	$('.confir').on({
		focus: function() {
			hidePrompt();
		},
		blur: function() {
			agComfirPs();
		}
	})
	$("[role='submit']").on('click', function() {
		if (sign) {
			sendEmail();
		}
	})
});