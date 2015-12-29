<!DOCTYPE html>
<html lang="en">
	<head>
		@include ('pc/content/title')
		<!--[if lte IE 9]>
   			<link rel="stylesheet" href="/pc/styles/browser.css" />
		 <![endif]-->
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css" />
		<link rel="stylesheet" type="text/css" href="/pc/styles/banner-switch.css">		
	</head>
	<body>
		<header>
		@include ('pc/content/header')
		 <div class="doodle">
		 		@include ('pc/content/navDetails')
				<div class="carsouel">
					<div class="switch-arrow left-arrow">
						<a href="javascript:;" class="arrow-left"></a>
					</div>
					<div class="switch-arrow right-arrow">		
						<a href="javascript:;" class="arrow-right"></a>
					</div>
					<div class="container">
						<img src="/pc/images/banner/carousel1.jpg" alt="3" />
						<img src="/pc/images/banner/11.11.png" alt="1" />
						<img src="/pc/images/banner/carousel2.jpg" alt="2" />
						<img src="/pc/images/banner/carousel1.jpg" alt="3" />
						<img src="/pc/images/banner/11.11.png" alt="1" />
					</div>
					<div class="carsouel-buttons" id="buttons">
						<a href="javascript:void(0)"><span index="1" class="on"></span></a>
						<a href="javascript:void(0)"><span index="2"></span></a>
						<a href="javascript:void(0)"><span index="3"></span></a>
					</div>
				</div>
			</div>
		</header>
		<article>
			<div class="recommend">
				<h2>推荐物品:   <i class="logo-left-arrow"></i><i class="logo-right-arrow"></i></h2>
				<ul>
				@foreach ($hotGoods as $item)
					<li>
						<a href="details?pro_id={{$item->id}}">
							<div class="thumbnail">
								<img src="{{$item->src}}" title="【土豪网 · {{$item->pro_name}}】" alt="【土豪网 · {{$item->pro_name}}】"/>
							</div>
							<p>{{$item->pro_name}}</p>
							<p class="info">{{$item->username}}  {{$item->college}}</p>
						</a>
					</li>
				@endforeach
				</ul>
			</div>
			<!-- 商品推荐 -->
			<div class="divided">
				<h2 class="item1"><img src="/pc/images/order.png" alt="icon-order" title="最新发布">最新发布 :</h2>
			</div>
			<!-- 主要内容 -->
			<article class="content">
				<!-- 左侧商品栏 -->
				<section class="left">
					<ul>
					@foreach($newGoods as $item)
						<li>
							<a href="details?pro_id={{$item->id}}">
								<div class="thumbnail">
									<img src="{{$item->src}}" title="【土豪网 · {{$item->pro_name}}】" alt="【土豪网 · {{$item->pro_name}}】"/>
								</div>
							</a>
							<div class="sticky-note">
								<a href="details?pro_id={{$item->id}}" title="物品详情">ABOUT MORE</a>
								<p>{{$item->pro_desc}}</p>
								<span>{{$item->college}} {{$item->username}}</span>
							</div>
						</li>
					@endforeach
					</ul>
				</section>
				<!-- 左侧商品栏 -->
				<!-- 土豪榜 -->
				<section class="right">
					<h2>土豪榜</h2>
					<div class="chart">
						<div class="title">
							<a class="week-chart chart-active" href="javascript:void(0)">周榜</a>
							<span>&nbsp;|&nbsp;</span> 
							<a class="month-chart" href="javascript:void(0)">总榜</a>
						</div>
						<!-- 土豪lists -->
						<a href="chart?type=week">
						<div class="lists" id="wrapper">
							<ul id="scroller">
								<div class="first-title" data-title="1">
								 <div class="container-img"><img src="{{$chart[0]->head_photo}}" title="{{$chart[0]->username}}" alt="Avatar"/></div>
									<div class="sticky">
										<span>{{$chart[0]->college}}</span>
										<span>{{$chart[0]->username}}</span>
									</div>
								</div>
								@for( $var = 1;$var<=9; $var++)
								@if( $chart[$var] )
								<li data-title="{{$var+1}}">
									<img src="{{$chart[$var]->head_photo}}" title="{{$chart[$var]->username}}" alt="Avatar"/>
									<div class="detail">
										<span data-role="level">LV{{$chart[$var]->levell}}</span>
										<span data-role="name">{{$chart[$var]->username}}</span>
										<span data-role="college">{{$chart[$var]->college}}</span>
										<span data-role="score">积分: {{$chart[$var]->score}}</span>
									</div>
								</li>
								@endif
								@endfor
							</ul>
						</div>
						</a>
						<div class="change-lists">
							<a class="down" href="javascript:void(0)" title="下一页"><i class="logo-large-down-arrow"></i></a>
							<a class="up" href="javascript:void(0)" title="上一页"><i class="logo-large-up-arrow"></i></a>
						</div>
					</div>
				</section>
				<!-- 土豪榜 -->
			</article>
			<!-- 主要内容 -->
			 <section class="add_more">
			 	<ul>
				</ul>
			</section>
			<button class="getall">查看更多</button>
		</article>
		@include('pc/content/modals')
		@include('pc/content/footer')
		
	<!--[if lte IE 9]>
	<script type="text/javascript">
		document.getElementsByTagName('body')[0].innerHTML = '<div class="attention">' +
			'<div class="tip">' +
			'<div class="tip-head">' +
			'<img src="/pc/images/browser/tip.png" alt="友情提示">' +
			'</div>' +
			'<div class="tip-content">' +
			'<img src="/pc/images/browser/tip1.png" alt="友情提示">' +
			'</div>' +
			'</div>' +
			'<div class="browser">' +
			index.blade.phpai">' +
			'<img src="/pc/images/browser/chrome.png" alt="chrome">' +
			'</a>' +
			'<a href="http://www.opera.com/zh-cn" class="xiazai" target="_blank">' +
			'<img src="/pc/images/browser/opera.png" alt="opera">' +
			'</a>' +
			'<a href="https://support.apple.com/zh_CN/downloads/" class="xiazai" target="_blank">' +
			'<img src="/pc/images/browser/safari.png" alt="safari">' +
			'</a>' +
			'</div>' +
			'</div>';
	</script>

	<![endif]-->
	<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/iscroll.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/jquery.simplemodal.js"></script>
		<script src="/pc/scripts/lib/sea.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="/pc/scripts/iSend.js"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use('scripts/header')
		</script>
	</body>
</html>
