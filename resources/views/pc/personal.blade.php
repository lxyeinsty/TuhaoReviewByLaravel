<!DOCTYPE html>
<html lang="en">
	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css"/>
		<link rel="stylesheet" type="text/css" href="/pc/styles/jquery.Jcrop.css"/>
		<link rel="stylesheet" type="text/css" href="/pc/styles/personal.css"/>
	</head>
	<body>
		<header>
			@if($status == 0 || $status == 1)
				@include ('pc/content/header',['sentNum'=>0])
			@else
				@include ('pc/content/header',['mesNum'=>0])
			@endif
			<div class="doodle">
				@include ('pc/content/nav')
			</div>
		</header>
		<div id="main">
			<div class="contain">
				<div><button class="edit-info"><i class="edit-icon"></i>编辑信息</button></div>
				<div class="personal">
					<img id="avatar" src="{{$user->src}}" title="点击更换头像"/>
					<div class="info">
						<span class="name left" data-id="{{$user->user_id}}">{{$user->username}}</span>
						<span class="level right">LV {{$user->levell}}</span>
						<div class="">
							<span class="left">我的积分:</span>
							<span class="scroe right">{{$user->score}}</span>
						</div>
					</div>
					@if($status == 2)
					<a href="javascript:void(0)" class="btn goods">我的物品</a>
					<a href="javascript:void(0)" class="btn active mes">我的消息</a>
					@else
					<a href="javascript:void(0)" class="btn active goods">我的物品</a>
					<a href="javascript:void(0)" class="btn mes">我的消息</a>
					@endif
				</div>
				@if($status == 0)
					@include('pc/content/goodsList')
				@elseif($status == 1)
					@include('pc/content/sendingList')
				@else
					@include('pc/content/MesList')
				@endif
				<div class="detail">
					<header>账户资料</header>
					<article class="info">
						<div>
							<i class="logo-portrait"></i>
							<input  class= "nickname name" type="text" placeholder="昵称">
						</div>
						<div><i class="logo-department"></i>
							<div id="editColleges" class="select">
								<div class="textWrapper">学院</div>
								<ul class="options">
									<li class="option" data-value="1">软件学园</li>
									<li class="option" data-value="2">机械学院</li>
									<li class="option" data-value="3">计算机学院</li>
									<li class="option" data-value="4">什么学院</li>
									<li class="option" data-value="5">启明学院</li>
								</ul>
							</div>
						</div>
						<div>
							<i class="logo-address"></i>
							<!--<input class="address" type="text" placeholder="地址">-->
							<div id="editAddress" class="select">
								<div class="textWrapper">地址</div>
								<ul class="options">
									<li class="option" data-value="1">韵苑</li>
									<li class="option" data-value="2">紫菘</li>
									<li class="option" data-value="3">沁苑</li>
									<li class="option" data-value="4">西区</li>
								</ul>
							</div>
						</div>
						<div class="footer"><i></i><button class="finish-edit">完 成 编 辑</button></div>
					</article>
				</div>
			</div>
		</div>
		<div id='overLayer'>
			<a href="javascript:void(0)" class="close"></a>
			<div class="panel">
				<header>
					<h2>头像设置</h2>
				</header>
				<div id="">
					<div class="imgWrapper">
						<img src="" id="target" />
					</div>
					<div id="preview">
						<canvas id="thumb " width="202" height="202"></canvas>
					</div>
					<div class="clearfix"></div>
				</div>
				<footer>
					<input type="file" name="imgs" id="imgs" value="" />
					<label class="btn" for="imgs">上传图片</label>
					<a href="javascript:void(0)" class="btn submit">确定</a>
				</footer>
			</div>
		</div>
		<div id="mes">提交失败，为什么会这样呢，为什么呢，这是为什么呢？</div>
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script> 
		<script src="/pc/scripts/lib/jquery.Jcrop.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="/pc/scripts/lib/sea.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use(['scripts/personal','scripts/header']);
		</script>
	</body>
</html>