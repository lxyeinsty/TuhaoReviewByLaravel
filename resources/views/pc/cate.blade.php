<!DOCTYPE html>
<html lang="en">
	<head>
		@include('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css" />
		<link rel="stylesheet" type="text/css" href="/pc/styles/search.css"/>
		<link rel="stylesheet" type="text/css" href="/pc/styles/mes.css"/>
	</head>
	<body>
		<header>
			@include('pc/content/header')
			<div class="doodle">
				@include('pc/content/nav')
			</div>
		</header>
		@include('pc/content/cateResult')
		@include('pc/content/modals')
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/jquery.simplemodal.js"></script>
		<script src="/pc/scripts/lib/sea.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use(['scripts/cate','scripts/header']);
		</script>
	</body>
</html>
