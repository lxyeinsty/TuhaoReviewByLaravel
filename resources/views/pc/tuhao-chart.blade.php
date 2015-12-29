<!DOCTYPE html>
<html lang="en">

	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css" />
		<link rel="stylesheet" type="text/css" href="/pc/styles/tuhao-chart.css">
	</head>

	<body>
		<header>
			@include ('pc/content/header')
			<div class="doodle">
				@include ('pc/content/nav')
				<ul class="lists-top3 item3">
					@foreach($chartOne as $var=>$chart)
					<li>
						<div class="detail">
							<a href="guest?id={{$chart->user_id}}">
								<div class="thumbnail">
									<span data-order="TOP{{++$var}}">{{$chart->college}}</span>
									<span>{{$chart->username}}</span>
									<div class="nothing"></div>
								</div>
								<img src="{{$chart->head_photo}}" />
							</a>
						</div>
						<p>积分 : {{$chart->score}}</p>
						<p>LV {{$chart->levell}}</p>
					</li>
					@endforeach
					</ul>
			</div>
		</header>
		<article class="tuhao-lists item3">
			<p>TOP 8: <i class="logo-toggle" id="top5-items" data-tooltip="详细"></i></p>
			<div class="content">
				<div class="lists-content">
					<div class="first">
						<div class="detail">
							<div class="thumbnail" index='1'>
								<span>{{$chartTwo[0]->college}}</span>
								<span>{{$chartTwo[0]->username}}</span>
								<div class="nothing"></div>
								<span class="orders">TOP 4</span>
								<span role="score">积分: {{$chartTwo[0]->score}}</span>
							</div>
							<img src="{{$chartTwo[0]->head_photo}}" />
						</div>
					</div>
					<div class="second">
						<div class="detail">
							<div class="thumbnail" index="2">
								<span>{{$chartTwo[1]->college}}</span>
								<span>{{$chartTwo[1]->username}}</span>
								<div class="nothing"></div>
								<span class="orders">TOP 5</span>
								<span role="score">积分: {{$chartTwo[1]->score}}</span>
							</div>
							<img src="{{$chartTwo[1]->head_photo}}" />
						</div>
						<div class="deadline">
							<span class="end">日期</span><span class="date">{{$time}}</span>
							@if($type == 'week')
							<span class="month-chart">周榜</span>
							@else
							<span class="month-chart">总榜</span>
							@endif
						</div>
						<div class="third">
							<div class="decoration"></div>
							<div class="detail">
								<div class="thumbnail" index="3">
									<span>{{$chartTwo[2]->college}}</span>
									<span>{{$chartTwo[2]->username}}</span>
									<div class="nothing"></div>
									<span class="orders">TOP 6</span>
									<span role="score">积分: {{$chartTwo[2]->score}}</span>
								</div>
								<img src="{{$chartTwo[2]->head_photo}}" />
							</div>
						</div>
					</div>
					<div class="right-part">
						<div class="fourth">
							<div class="detail">
								<div class="thumbnail" index='4'>
									<span>{{$chartTwo[3]->college}}</span>
									<span>{{$chartTwo[3]->username}}</span>
									<div class="nothing"></div>
									<span class="orders">TOP 7</span>
									<span role="score">积分: {{$chartTwo[3]->score}}</span>
								</div>
								<img src="{{$chartTwo[3]->head_photo}}" />
							</div>
							<div class="decoration"></div>
						</div>
						<div class="fifth detail">
							<div class="thumbnail" index='5'>
								<span>{{$chartTwo[4]->college}}</span>
								<span>{{$chartTwo[4]->username}}</span>
								<div class="nothing"></div>
								<span class="orders">TOP 8</span>
								<span role="score">积分: {{$chartTwo[4]->score}}</span>
							</div>
							<img src="{{$chartTwo[4]->head_photo}}" />
						</div>
					</div>
				</div>
				<div class="detail-info detail-info-top5" id="container">
					<i class="left-arrow" id="prev"><a href="javascript:;"  class="logo-left-arrow"></a></i>
					<div class="chart-info">
						<div class="box" id="list" role="container" style="left:-667px">
							<div class="card" alt="1">
								<img src="{{$chartTwo[count($chartTwo)-1]->head_photo}}" alt="portrait" />
								<div class="card-info">
									<span class="colleges" data-order="8">{{$chartTwo[count($chartTwo)-1]->college}}</span>
									<div class="tuhao-name"><span role='name'><a href="guest?id={{$chartTwo[count($chartTwo)-1]->id}}">{{$chartTwo[count($chartTwo)-1]->username}}</a></span><span role="level">LV {{$chartTwo[count($chartTwo)-1]->levell}}</span></div>
									<div class="sending">
										<span role="sent">已送出：{{$chartTwo[count($chartTwo)-1]->sendNum}}</span>
										<span role="received">已收到：{{$chartTwo[count($chartTwo)-1]->receiveNum}}</span>
									</div>
									<div class="nothing"></div>
								</div>
							</div>
							@foreach($chartTwo as $i=>$chart) 
							@if($chart)
							<div class="card" alt="{{$i}}">
								<img src="{{$chart->head_photo}}" alt="portrait" />
								<div class="card-info">
									<span class="colleges" data-order="{{$i + 4}}">{{$chart->college}}</span>
									<div class="tuhao-name"><span role='name'><a href="guest?id={{$chart->id}}">{{$chart->username}}</a></span><span role="level">LV{{$chart->levell}}</span></div>
									<div class="sending">
										<span role="sent">已送出：{{$chart->sendNum}}</span>
										<span role="received">已收到：{{$chart->receiveNum}}</span>
									</div>
									<div class="nothing"></div>
								</div>
							</div>
							@endif
							@endforeach
							<div class="card" alt="{{count($chartTwo)-1}}">
								<img src="{{$chartTwo[0]->head_photo}}" alt="portrait" />
								<div class="card-info">
									<span class="colleges" data-order="4">{{$chartTwo[0]->college}}</span>
									<div class="tuhao-name"><span role='name'><a href="guest?id={{$chartTwo[0]->id}}">{{$chartTwo[0]->username}}</a></span><span role="level">LV{{$chartTwo[0]->levell}}</span></div>
									<div class="sending">
										<span role="sent">已送出：{{$chartTwo[0]->sendNum}}</span>
										<span role="received">已收到：{{$chartTwo[0]->receiveNum}}</span>
									</div>
									<div class="nothing"></div>
								</div>
							</div>
						</div>
					</div>
					<i class="right-arrow" id="next"><a href="javascript:;"  class="logo-right-arrow"></a></i>
				</div>
			</div>
			<p>TOP 18: <i class="logo-toggle" id="top10-items" data-tooltip="详细"></i></p>
			<div class="content top10">
				<ul class="top10-lists">
					@foreach($chartThree as $index=>$chart)
					<li>
						<div class="detail">
							<div class="thumbnail" index="{{$index+1}}">
								<span>{{$chart->college}}</span>
								<span>{{$chart->username}}</span>
								<div class="nothing"></div>
								<span class="orders">TOP {{$index + 9}}</span><span role="score">积分: {{$chart->score}}</span>
							</div>
							<img src="{{$chart->head_photo}}" />
						</div>
					</li>
					@endforeach
				</ul>
				<div class="detail-info detail-info-top10" id="container-top10">
					<i class="left-arrow" id="prev-top10"><a href="javascript:;"  class="logo-left-arrow"></a></i>
					<div class="chart-info">
						<div class="box" id="list-top10" role="container" style="left:-667px">
							<div class="card" alt="1">
								<img src="{{$chartThree[9]->head_photo}}" alt="portrait" />
								<div class="card-info">
									<span class="colleges" data-order="18">{{$chartThree[9]->college}}</span>
									<div class="tuhao-name"><span role='name'><a href="guest?id={{$chartThree[9]->id}}">{{$chartThree[9]->username}}</a></span><span role="level">LV{{$chartThree[9]->levell}}</span></div>
									<div class="sending">
										<span role="sent">已送出：{{$chart->sendNum}}</span>
										<span role="received">已收到：{{$chart->receiveNum}}</span>
									</div>
									<div class="nothing"></div>
								</div>
							</div>
							@foreach($chartThree as $index=>$chart)
							<div class="card" alt="{{$index}}">
								<img src="{{$chart->head_photo}}" alt="portrait" />
								<div class="card-info">
									<span class="colleges" data-order="{{$index + 9}}">{{$chart->college}}</span>
									<div class="tuhao-name"><span role='name'><a href="guest?id={{$chart->id}}">{{$chart->username}}</a></span><span role="level">LV{{$chart->levell}}</span></div>
									<div class="sending">
										<span role="sent">已送出：{{$chart->sendNum}}</span>
										<span role="received">已收到：{{$chart->receiveNum}}</span>
									</div>
									<div class="nothing"></div>
								</div>
							</div>
							@endforeach
							<div class="card" alt="5">
								<img src="{{$chartThree[0]->head_photo}}" alt="portrait" />
								<div class="card-info">
									<span class="colleges" data-order="9">{{$chartThree[0]->college}}</span>
									<div class="tuhao-name"><span role='name'><a href="guest?id={{$chartThree[0]->id}}">{{$chartThree[0]->username}}</a></span><span role="level">LV{{$chartThree[0]->levell}}</span></div>
									<div class="sending">
										<span role="sent">已送出：{{$chartThree[0]->sendNum}}</span>
										<span role="received">已收到：{{$chartThree[0]->receiveNum}}</span>
									</div>
									<div class="nothing"></div>
								</div>
							</div>
						</div>
					</div>
					<i class="right-arrow" id="next-top10"><a href="javascript:;"  class="logo-right-arrow"></a></i>
				</div>
			</div>
		</article>
		@include('pc/content/modals')
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/jquery.simplemodal.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/sea.js"></script>
		<script type="text/javascript" src="/pc/scripts/tuhao-chart.js"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use('scripts/header')
		</script>
	</body>

</html>