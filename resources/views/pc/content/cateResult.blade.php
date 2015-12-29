<article class="result">
	<header> 
		<h2 data-key="{{$key}}">{{$key}}:</h2>
	</header>
	<ul class="list">
		@forelse ($goods as $item)
		<li>
			<div class="imgWrapper">
				<a href="details?pro_id={{$item->id}}">
					<img src="{{$item->src}}" title="【土豪网】· {{$item->pro_name}}"/>
				</a>
			</div>
			<div class="textWrapper">
				<div class="goodsName"><a href="details?pro_id={{$item->id}}">{{$item->pro_name}}</a></div>
				<div class="des">{{$item->pro_desc}}</div>
				<div class="time">{{$item->reg_time}}</div>
			</div>
		</li>
		@empty
		<li class="info">这里还什么都没有，去搜搜其他的？</li>
		@endforelse
		<li class="fixed"></li>
		<li class="fixed"></li>
		<li class="fixed"></li>
	</ul>
	@include('pc/content/pages')
</article>