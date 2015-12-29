<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/confirm-ok.css">
</head>

<body>
	<section class="panel">
	    <section class="panel-logo">
	        <a href="/">
	            <img src="/mobile/images/logo.png">
	        </a>
	    </section>
	    <section class="login-register-panel">
	    	@if($status)
	    	<i class="ok-icon"></i>
	    	<p>邮箱激活成功</p>
	    	@else
	    	<i class="fail-icon"></i>
	    	<p>{{$message}}</p>
	    	@endif
	        <p>您将在<span id="time">3</span>秒后进入土豪网首页</p>
	    </section>
	</section>
	<script type="text/javascript" src="/mobile/scripts/dist/confirm-ok.js"></script>
</body>

</html>
