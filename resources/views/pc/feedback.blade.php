<!DOCTYPE html>
<html lang="en">

	<head>
		@include('pc/content/cateResult')
		<link rel="stylesheet" type="text/css" href="/pc/styles/per-center.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css">
	</head>
	<body>
		<!-- 头部信息 -->
		<header class="header">
			@include('pc/content/header_empty')
		</header>
		<article class="item2">
			<header>如果使用过程中有任何产品建议，网站错误统统都可以告诉我们，我们将会为您不断改进</header>
			<table class="confirmation">
				<tr class="email">
					<td>意见反馈：</td>
					<td >
					   <textarea class="feedback"></textarea>
					</td>
				</tr>
				<!--<tr>
					<td>验证码:</td>
					<td>
						<input type="text" id="verification" role="verification" />
					</td>
					<td><div class="confir-code"></div></td>
				</tr>-->
				<tr>
					<td>联系方式：</td>
					<td>
						<input type="text" class="contact">
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
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>	
	</body>

</html>
