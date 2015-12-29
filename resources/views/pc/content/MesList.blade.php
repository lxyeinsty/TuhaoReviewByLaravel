<div class="list">
	<header>
		<ul class="goods" style="display: none;">
			<li><a class="" href="javascript:void(0);" data-tab="1">我送出的</a></li>
			<li><a href="javascript:void(0);" data-tab="2">我收到的</a></li>
			<li><a href="javascript:void(0);" data-tab="3">正在送出的</a></li>
		</ul>
		<ul class="mes" >
			<li><a class="active" href="javascript:void(0);" data-tab="4">我收到的留言 @if($mesNum) {{$mesNum}} @endif </a></li>
		</ul>
	</header>
	<ul>
		@forelse ($data as $item)
		<li class="mes @if ($item->status == 0) new @endif">
			<div class="mes_title">
				<span class="username" data-id="{{$item->sender_id}}">{{$item->sender_author}}</span>
				<span>在</span>
				<span class="goods" data-id="{{$item->pro_id}}">{{$item->goods_name}}</span>
				<span>中回复你：</span>
			</div>
			<div class="textWrapper">
				<div class="text" data-id="{{$item->id}}" data-parent="{{$item->parent_id}}">
					<a href="details?pro_id={{$item->pro_id}}">{{$item->content}}</a>
				</div>
				<a href="javascript:void(0);" class="btn">回复</a>
			</div>
			<div class="replay" style="display: none;">
				<span class="caret"></span>
				<span class="caret front"></span>
				<div class="textArea" contenteditable="true"><br /></div> 
				<a href="javascript:void(0);" class="btn">提交</a>
			</div>
		</li>
		@empty
		<li class="item" style="text-align: center;">暂时还没有新消息哦~ </li>
		@endforelse
	</ul>
	@include('pc/content/pages')
</div>
