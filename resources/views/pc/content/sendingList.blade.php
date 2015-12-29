<div class="list">
	<header>
		<ul class="goods">
			<li><a  href="javascript:void(0);" data-tab="1">我送出的</a></li>
			<li><a href="javascript:void(0);" data-tab="2">我收到的</a></li>
			<li><a class="active" href="javascript:void(0);" data-tab="3">正在送出的</a></li>
		</ul>
		<ul class="mes" style="display: none;">
			<li><a class="" href="javascript:void(0);" data-tab="4">我收到的留言</a></li>
		</ul>
	</header>
	<ul>
		@forelse( $data as $item)
		<li class="item">
			<div class="goodsName" data-id="{{$item->pro_id}}">{{$item->goods_name}}</div>
			<div class="wrapper">
				<div class="text">
				@if( !$item->status)
					<a href="details?pro_id={{$item->pro_id}}">{{$item->pro_desc}}</a>
				@endif
				</div>
			</div>
			<a href="details?pro_id={{$item->pro_id}}"><img src="{{$item->src}}"/></a>
		</li>
		@empty
		<li class="item" style="text-align: center;">还米有正在送出的物品哦，快来发布物品送出闲置~</li>
		@endforelse
	</ul>
	@include('pc/content/pages')
</div>