<!DOCTYPE html>
<html lang="en">
	<head>
		@include('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css"/>
		<link rel="stylesheet" type="text/css" href="/pc/styles/jquery.Jcrop.css"/>
		<link rel="stylesheet" type="text/css" href="/pc/styles/guest.css"/>
	</head>
	<body>
		<header>
			@include('pc/content/header')
			<div class="doodle">
				@include('pc/content/nav')
			</div>
		</header>
		<div id ="main">
			<header>
				<div class="contain">
					<div class="avatar">
						<img src="{{$user->src}}"/>
					</div>
					<div class="info">
						<span class="username" data-id="{{$user->user_id}}">{{$user->username}}</span>
						<span class="college">{{$user->college}}</span>
						<div class="">
							<div class="left">我的积分: <span class="scroe">{{$user->score}}</span></div>
							<div class="right">送出<span class="num">{{$user->sendNum}}</span>件物品</div>

						</div>
					</div>
				</div>
			</header>
			<div class="list">
				<header>
					<ul>
						<li><a class="" href="javascript:void(0);">正在送的物品</a></li>
					</ul>
				</header>
				<ul>
					@forelse ($data as $item)
					<li class="item">
						<div class="goodsName" data-id="{{$item->pro_id}}">{{$item->pro_name}}</div>
						<div class="wrapper">
							<div class="text">
							@if(!$item->status)
								<a href="details?pro_id={{$item->pro_id}}">{{$item->pro_desc}}</a>
							@endif
							</div>
						</div>
						<a href="details?pro_id={{$item->pro_id}}"><img src="{{$item->src}}"/></a>
					</li>
					@empty 
					<li class="item" style="text-align: center;">这里还什么都没有。</li>
					@endforelse
				</ul>
				@include('pc/content/pages')
			</div>
		</div>
		<div id="mes">提交失败，为什么会这样呢，为什么呢，这是为什么呢？</div>
		@include('pc/content/modals')
		@include('pc/content/footer')
		<script src="/pc/scripts/lib/jQuery.js" type="text/javascript" charset="utf-8"></script>
		<script src="/pc/scripts/lib/sea.js" type="text/javascript" charset="utf-8"></script>
		<script src="/pc/scripts/lib/jquery.simplemodal.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use(['scripts/guest','scripts/header']);
		</script>
	</body>
</html>