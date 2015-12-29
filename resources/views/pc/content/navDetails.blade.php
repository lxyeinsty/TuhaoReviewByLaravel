<nav class="navigation">
	<ul class="nav-lists">
		<li>
			<a href="category?category=双11专区"><i>双11专区</i></a>
			<article>
				<span class="progress-bar"></span>
				<ul class="aside-nav">
					<a href="category?category=11.11"><li>双11专区</li></a>
				</ul>
				<div class="nav-content">
				@foreach ($activity as $item)
				<div>
					<a href="details?pro_id={{$item->id}}">
						<div class="thumbnail">
							<img src="{{$item->src}}" alt = "【土豪网 {$item->id}】" title="【土豪网 {$item->pro_name}】"/>
						</div>
						<h3>{{$item->pro_name}}</h3>
						<p>{{$item->username}} {{$item->college}}</p>
					</a>
				</div>
				@endforeach
				</div>
			</article>
		</li>
		<li>
			<a href="category?category=学习用品">学习用品</a>
			<article>
				<span class="progress-bar"></span>
				<ul class="aside-nav">
					<a href="category?category=课内教材"><li>课内教材</li></a>
					<a href="category?category=文具"><li>文具</li></a>
					<a href="category?category=出国书籍"><li>出国书籍</li></a>
					<a href="category?category=课外书籍"><li>课外书籍</li></a>
				</ul>
				<div class="nav-content">
				@foreach ( $study as $item)
				<div>
					<a href="details?pro_id={{$item->id}}">
						<div class="thumbnail">
							<img src="{{$item->src}}" alt = "【土豪网 {$item->id}】" title="【土豪网 {$item->pro_name}】"/>
						</div>
						<h3>{{$item->pro_name}}</h3>
						<p>{{$item->username}} {{$item->college}}</p>
					</a>
				</div>
				@endforeach
				</div>
			</article>
		</li>
		<li>
			<a href="category?category=衣服配饰">衣服配饰</a>
			<article>
				<span class="progress-bar"></span>
				<ul class="aside-nav">
					<a href="category?category=男装"><li>男装</li></a>
					<a href="category?category=女装"><li>女装</li></a>
					<a href="category?category=手表鞋袋"><li>手表鞋袋</li></a>
					<a href="category?category=配饰"><li>配饰</li></a>
				</ul>
				<div class="nav-content">
					@foreach ( $clothes as $item)
					<div>
						<a href="details?pro_id={{$item->id}}">
							<div class="thumbnail">
								<img src="{{$item->src}}" alt = "【土豪网 {$item->id}】" title="【土豪网 {$item->pro_name}】"/>
							</div>
							<h3>{{$item->pro_name}}</h3>
							<p>{{$item->username}} {{$item->college}}</p>
						</a>
					</div>
					@endforeach
				</div>
			</article>
		</li>
		<li>
			<a href="category?category=数码产品">数码产品</a>
			<article>
				<span class="progress-bar"></span>
				<ul class="aside-nav">
					<a href="category?category=键盘鼠标"><li>键盘鼠标</li></a>
					<a href="category?category=移动电源"><li>移动电源</li></a>
					<a href="category?category=充电器"><li>充电器</li></a>
					<a href="category?category=耳机"><li>耳机</li></a>
				</ul>
				<div class="nav-content">
					@foreach ( $digital as $item)
					<div>
						<a href="details?pro_id={{$item->id}}">
							<div class="thumbnail">
								<img src="{{$item->src}}" alt = "【土豪网 {$item->id}】" title="【土豪网 {$item->pro_name}】"/>
							</div>
							<h3>{{$item->pro_name}}</h3>
							<p>{{$item->username}} {{$item->college}}</p>
						</a>
					</div>
					@endforeach
				</div>
			</article>
		</li>
		<li>
			<a href="category?category=生活娱乐">生活娱乐</a>
			<article>
				<span class="progress-bar"></span>
				<ul class="aside-nav">
					<a href="category?category=乐器"><li>乐器</li></a>
					<a href="category?category=棋牌"><li>棋牌</li></a>
					<a href="category?category=会员卡"><li>会员卡</li></a>
					<a href="category?category=化妆品"><li>化妆品</li></a>
				</ul>
				<div class="nav-content">
					@foreach ($entertainment as $item)
					<div>
						<a href="details?pro_id={{$item->id}}">
							<div class="thumbnail">
								<img src="{{$item->src}}" alt = "【土豪网 {$item->id}】" title="【土豪网 {$item->pro_name}】"/>
							</div>
							<h3>{{$item->pro_name}}</h3>
							<p>{{$item->username}} {{$item->college}}</p>
						</a>
					</div>
					@endforeach
				</div>
			</article>
		</li>
		<li>
			<a href="category?category=其他">其他</a>
			<article>
				<span class="progress-bar"></span>
				<ul class="aside-nav">
					<a href="category?category=其他"><li>其他</li></a>
				</ul>
				<div class="nav-content">
					@foreach ($others as $item)
					<div>
						<a href="details?pro_id={{$item->id}}">
							<div class="thumbnail">
								<img src="{{$item->src}}" alt = "【土豪网 {$item->id}】" title="【土豪网 {$item->pro_name}】"/>
							</div>
							<h3>{{$item->pro_name}}</h3>
							<p>{{$item->username}} {{$item->college}}</p>
						</a>
					</div>
					@endforeach
				</div>
			</article>
		</li>
	</ul>
</nav>
