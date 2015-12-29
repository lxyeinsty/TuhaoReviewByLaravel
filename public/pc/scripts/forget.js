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
		forget: 'user/forgetPwd', //忘记密码得知
		reset: "user/resetPwd"
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
		} else {
			sign = true;
		}
	}

	function sendEmail() {
		var email = $('#email').val().trim();
		$.ajax({
			type: 'post',
			dataType: 'JSON',
			url: route_path.forget,
			data: {
				'email': email
			},
			success: function(data) {
				switch (data.code) {
					case 1:
						window.location.href = "/remind?action=password"
						break;
					default:
						showPrompt(data.mes);
						break;
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

	$("[role='submit']").on('click', function() {
		if (sign) {
			sendEmail();
		}
	})
});