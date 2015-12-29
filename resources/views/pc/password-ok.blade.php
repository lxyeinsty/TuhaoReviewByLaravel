<!DOCTYPE html>
<html lang="en">
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
			<div class="content-info">
				<span class="confirm-success">修改密码成功</span>
				<p>您将在<strong id="countTime">3</strong>s内返回首页</p>
			</div>
		</main>
		@include ('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/footer.js"></script>
		<script type="text/javascript" src='/pc/scripts/countTime.js'></script>
	</body>
</html>