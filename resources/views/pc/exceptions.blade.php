<!DOCTYPE html>
<html lang="en">
	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css" />
		<link rel="stylesheet" type="text/css" href="/pc/styles/exceptions.css" />
	</head>
	<body>
		<header>
			<div class="self-info">
				<div class="content">
					<ul class="item1">
						<li role="release"><a href="javascript:void(0)">我要发布</a></li>
						<li role="sending"><a href="@if ($loginFlag)personal?entrance=sending @else javascript:void(0) @endif">我的送送@if ($sentNum)({{$sentNum}}) @endif</a><i class="logo-down-arrow"></i>
							<ul class="sending-table" id="sending-table" data-toggle="mysending">
								<li><a href="personal?entrance=sending">出送中</a></li>
								<li><a href="personal?entrance=info">新留言@if ($mesNum)({{$mesNum}}) @endif</a></li>
							</ul>
						</li>
						<li role="self-info-btn">
							<span id="username">@if ($loginFlag) <a href="personal"> {{$username}} </a>@endif</span>
							<i class="logo-self-info @if ($loginFlag) after-log @endif" role="login" data-log="{{$loginFlag}}" data-tooltip="登录"></i>
							<ul class="logout">
								<li><a href="user/logout">退出登录</a></li>
							</ul>
						</li>
					</ul>
					<div class="item2">
						<a href="/" class="logo"><h1>土豪网</h1></a>
						<span id="title">免责声明</span>
					</div>
				</div>
			</div>
		</header>
		<div id="main">
			<div class="content">
				<header>为了更好的使用土豪网并保障您的利益，请您务必仔细阅读此声明，如有不解之处请您立即与网站开发人员联系询问。因为一旦您选择了土豪网提供的转运服务，那么就视为您对此声明的内容已全部认可。</header>
				<ol>
					<li>1 .【土豪网】所有的闲置物品来源均为用户自主发布，物品的来源与【土豪网】无关，本网站会在物品发布之后起到监督检测的作用。如有侵犯您的权益，请联系我们，我们将在第一时间修改。</li>
					<li>2 .【土豪网】保证网站内提供的所有物品信息都是按用户自主提交呈现，本网站未做过任何改动；但【土豪网】不保证用户发布物品的真实性和安全性；同时【土豪网】也不承担用户因接收这些闲置物品对自己和他人造成任何形式的损失或伤害</li>
					<li>3 .【土豪网】对其自行开发的或和他人共同开发的所有内容，包括网站设计、布局结构、服务等拥有全部知识产权，未经【土豪网】开发人员的明确许可，任何人不得作全部或部分复制或仿造。</li>
				</ol>
			</div>
		</div>
		@include('pc/content/modals') @include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/jquery.simplemodal.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/sea.js"></script>
		<script type="text/javascript">
			seajs.config({
				base: './pc'
			});
			seajs.use('scripts/header');
		</script>
	</body>
</html>