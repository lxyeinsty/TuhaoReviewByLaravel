<div class="self-info">
	<ul class="item1">
		<li role="release"><a href="javascript:void(0)">我要发布</a></li>
		<li role="sending"><a href="@if ($loginFlag)personal?entrance=sending @else javascript:void(0) @endif">我的送送@if ($sentNum)({{$sentNum}}) @endif</a><i class="logo-down-arrow"></i>
			<ul class="sending-table" id="sending-table" data-toggle="mysending">
				<li><a href="personal?entrance=sending">出送中</a></li>
				<li><a href="personal?entrance=info">新留言@if ($mesNum)({{$mesNum}}) @endif</a></li>
			</ul>
		</li>
		<li role="self-info-btn">
			<span id="username" >@if ($loginFlag) <a href="personal"> {{$username}} </a>@endif</span>
			<i class="logo-self-info @if ($loginFlag) after-log @endif" role="login" data-log="{{$loginFlag}}" data-tooltip="登录"></i>
			<ul class="logout">
				<li><a href="user/logout">退出登录</a></li>
			</ul>
		</li>
	</ul>
</div>
<div class="banner">
	<div class="item2">
		<a href="/" class="logo">
			<h1>土豪网</h1>
		</a>
		<div class="search">
			<input type="text" id="search" placeholder="想要什么搜起来~"><i class="logo-search"></i>
		</div>
	</div>
</div>
