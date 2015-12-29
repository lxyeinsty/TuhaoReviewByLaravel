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
			@if($status)
			<div class="content-info">
				<span class="confirm-success">邮箱验证成功</span>
				<br/>
				<span>页面将在<span class="time" id="time">3</span>秒后跳转至<a href="/">土豪网首页</a></span>
			</div>
			@else
			<div class="content-info">
				<span class="confirm-success">{{$message}}</span>
				<span class="time" id="time">3</span>
			</div>
			@endif
		</main>
		@include ('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/footer.js"></script>
		<script type="text/javascript" src="/pc/scripts/active-ok.js"></script>
	</body>
</html>