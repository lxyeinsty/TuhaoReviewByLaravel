<!DOCTYPE html>
<html lang="en">
	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/per-center.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css">
	</head>
	<body>
		<!-- 头部信息 -->
		<header class="header">
			@include ('pc/content/header_empty')
		</header>
		<article class="item2" >
			<header>请输入您的新密码</header>
			<table class="confirmation">
				<tr class="email">
					<td>您的邮箱为：</td>
					<td class="email-td">
						<input type="text" class="email" id="email">
						<p class="prompt"></p>
					</td>
					<td><div class="confir-code"></div></td>
				</tr>
				<!--<tr>
					<td>验证码:</td>
					<td>
						<input type="text" id="verification" role="verification" />
					</td>
					<td><div class="confir-code"></div></td>
				</tr> -->
				<tr>
					<td>新密码：</td>
					<td>
						<input type="password" class="new-password">
					</td>
				</tr>
				<tr>
					<td>确认密码：</td>
					<td>
						<input type="password" class="confir">
					</td>
				</tr>
				<tr>
					<td></td>
					<td class="submit">
						<button role="submit">提交</button>
					</td>
				</tr>
			</table>
		</article>
		<!-- 头部信息 -->
		@include ('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/reset.js"></script>
	</body>
</html>
