<!DOCTYPE html>
<html lang="zh-cmn-Hans">
	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css" />
		<link rel="stylesheet" type="text/css" href="/pc/styles/pages.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/article-show.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/mes.css" />
	</head>

	<body>
		<header>
			@include ('pc/content/header')
			<div class="doodle">
				@include ('pc/content/nav')
			</div>
		</header>
		<section class="article-show-main">
			<section class="article-show-area">
				@if ($loginFlag == $goods->user_id) 
					@if (!$goods->receiver_id)
					<a href="javascript:;" id="edit-goods"></a>
					@endif 
				@endif
				<section class="article-photo">
					<img src="{{$goods->src[0]}}">
					<section class="article-photo-frame">
						<!-- <a href="javascript:void(0)" class="article-photo-switch photo-switch-left">
							<img src="images/logo/left-arrow.png">
						</a> -->
						<section class="article-photo-gallery">
							<ul class="article-photo-list">
								@foreach ($goods->src as $src)
								<li><img src="{{$src}}" alt="{{$goods->name}}"></li>
								@endforeach
							</ul>
						</section>
						<!-- <a href="javascript:void(0)" class="article-photo-switch photo-switch-right">
							<img src="images/logo/right-arrow.png">
						</a> -->
					</section>
				</section>
				<seciton class="article-info">
					<h2 id="goods" data-id="{{$goods->id}}" data-receiver="{{$goods->receiver_id}}">{{$goods->pro_name}}
						@if($goods->is_send)【已送出】@endif
					</h2>
					<p>
						<span class="article-title">主　　人:</span>
						<span class="article-master" data-id="{{$goods->user_id}}"><a class="username" href="guest?id={{$goods->user_id}}">{{$goods->username}}</a></span>
					</p>
					<p>
						<span class="article-title">联系方式:</span>
						<span class="article-master">{{$goods->contact}}</span>
					</p>
					<p>
						<span class="article-title">发布时间:</span>
						<span class="article-master">{{$goods->reg_time}}</span>
					</p>
					<p>
						<span class="article-title">物品详情:</span>
						<span class="article-master article-detailed">{{$goods->pro_desc}}</span>
					</p>
				</seciton>
			</section>
			<section class="master-desire-area">
				<span class="article-info-title">主人心愿</span>
				<p class="article-master-desire">{{$goods->desire}}</p>
			</section>
			<section class="article-comment-area">
				<span class="article-info-title">累计评论</span> 
				@if(count($comments)==0)
				<div class="empty-reply">还没有人留言哦，快来评论为主人实现愿望拿到闲置~</div>
				@endif
				<section class="article-comment-frame cmt">
					<div class="comment-content-area" contenteditable="true">
						<br />
					</div>
					<a href="javascript:void(0)" id="comment-submit" class="comment-submit-button">评&nbsp;论</a>
				</section>
				<div class="cmtWrapper">
					@foreach($comments as $item)
					<section class="user-comment-outer">
						<div class="user-potrait">
							<a href="guest?id={{$item->sender_id}}">
								<img src="{{$item->src}}">
							</a>
						</div>
						<div class="user-comment-area">
							<div class="wrapper">
								<p class="user-name" data-id="{{$item->sender_id}}">
									<a href="guest?id={{$item->sender_id}}">{{$item->sender_author}}</a> 
									@if($item->receiver_id) 回复
									<a href="guest?id={{$item->receiver_id}}">{{$item->receiver_author}}</a> 
									@endif ：
								</p>
								<div class="user-comment-content" data-id="{{$item->id}}" data-parent="{{$item->parent_id}}">{{$item->content}}</div>
								<div class="comment-button-list">
								@if($loginFlag)
									@if($loginFlag == $goods->user_id)
										@if($goods->receiver_id == 0)
											@if($item->sender_id != $goods->user_id)
									<a href="javascript:void(0)" class="confirm-button comment-button" data-id="{{$item->sender_id}}"></a>
											@endif 
										@elseif ($goods->receiver_id == $item->sender_id)
									<a href="javascript:void(0)" class="success comment-button"></a>
										@endif 
									@endif 
								@endif 
								@if($loginFlag == $item->sender_id)
									<a href="javascript:;" class="comment-button delete-comment" data-id="{{$item->id}}"></a>
								@endif
									<a href="javascript:void(0)" class="reply-button comment-button"></a>
								</div>
								<section class="article-comment-frame">
									<div class="comment-content-area" contenteditable="true">
										<br />
									</div>
									<a href="javascript:void(0)" class="comment-submit-button">回&nbsp;复</a>
								</section>
							</div>
							@foreach ($item->comments as $inner)
							<section class="user-comment-inner">
								<div class="user-potrait">
									<img src="{{$inner->src}}">
								</div>
								<div class="user-comment-area">
									<div class="wrapper">
										<p class="user-name" data-id="{{$inner->sender_id}}">{{$inner->sender_author}} 回复{{$inner->receiver_author}}： </p>
										<div class="user-comment-content" data-id="{{$inner->id}}" data-parent="{{$inner->parent_id}}">{{$inner->content}}</div>
										<div class="comment-button-list">
											@if($loginFlag == $item->sender_id)
											<a href="javascript:;" class="comment-button delete-comment" data-id="{{$inner->id}}"></a>
											@endif
											<a href="javascript:void(0)" class="reply-button comment-button"></a>
										</div>
										<section class="article-comment-frame">
											<div class="comment-content-area" contenteditable="true">
												<br />
											</div>
											<a href="javascript:void(0)" class="comment-submit-button">回&nbsp;复</a>
										</section>
									</div>
								</div>
							</section>
							@endforeach
						</div>
					</section>
					@endforeach
				</div>
				<section class="comment-footer">
					@include('pc/content/pages')
				</section>
			</section>
		</section>
		<div id="mes">提交失败，为什么会这样呢，为什么呢，这是为什么呢？</div>
		@include('pc/content/modals') 
		@include('pc/content/footer')
		<script src="/pc/scripts/lib/jQuery.js" type="text/javascript" charset="utf-8"></script>
		<script src="/pc/scripts/lib/sea.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="/pc/scripts/lib/jquery.simplemodal.js"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use(['scripts/goods', 'scripts/header']);
		</script>
	</body>

</html>