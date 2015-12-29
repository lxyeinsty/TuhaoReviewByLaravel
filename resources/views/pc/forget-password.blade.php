<!DOCTYPE html>
<html lang="en">
	<head>
		@include('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/forget-password.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css">
	</head>
	<body>
		<!-- 头部信息 -->
		<header class="header">
			 @include('pc/content/header_empty')
		</header>
		<article class="item2" style="padding-top: 80px;">
			<header>请输入您找回密码的邮箱</header>
			<table class="confirmation">
				<tr class="email">
					<td>电子邮箱:</td>
					<td class="email-td">
						<input id="email" type="text" role="email" />
						<p class="prompt"></p>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<button role="submit">确定</button>
					</td>
				</tr>
			</table>
		</article>
		<!-- 头部信息 -->
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src='/pc/scripts/forget.js'></script>
	</body>
</html>
