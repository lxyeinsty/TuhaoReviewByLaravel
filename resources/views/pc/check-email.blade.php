<!DOCTYPE html>
<html lang="zh-cmn-Hans">
	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/universe.css">
	</head>
	<body>
		<header>
			@include ('pc/content/header_empty')
		</header>
		<main>
			@if(type == 0)
			<div class="content-info">
				<span>邮件已成功发送!</span>
				<p>感谢您的注册，一封邮件已经发到你的邮箱上。请注意查收，并且按照邮件中的指示验证你的邮箱地址。</p>
				<p>请在<strong>24</strong>小时内完成验证，完成后可立即使用土豪网</p>
			</div>
			@elseif(type == 1)
			<div class="content-info">
				<span>请先激活您的账号，邮件已发送到您的邮箱！</span>
				<p>请在<strong>24</strong>小时内完成验证，完成后可立即使用土豪网</p>
			</div>
			@else
			<div class="content-info">
				<span>邮件已成功发送!</span>
				<p>一封邮件已经发到你的邮箱上。请注意查收，并且按照邮件中的指示验证你的邮箱地址。</p>
				<p>请在<strong>24</strong>小时内修改密码，完成后可立即使用土豪网</p>
			</div>
			@endif
		</main>
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/footer.js"></script>
	</body>
</html>