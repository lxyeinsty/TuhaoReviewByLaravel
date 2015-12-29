<!DOCTYPE html>
<html lang="zh-cmn-Hans">
	<head>
		@include ('pc/content/title')
		<link rel="stylesheet" type="text/css" href="/pc/styles/homepage.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/issue.css">
		<link rel="stylesheet" type="text/css" href="/pc/styles/mes.css"/>
	</head>
	<body>
		<header>
			@include ('pc/content/header')
			<div class="doodle">
				@include ('pc/content/nav')
			</div>
		</header>
		<section class="issue-main-frame">
			<section class="issue-nav"></section>
			<section class="issue-main">
				<p class="issue-title">发布物品</p>
				<section class="issue-form-area">
					<section class="add-photo-area">
						<div class="add-photo-frame">
							<p>
								<a href="javascript:void(0)" class="photo-add-photo">
									<input type="file" id="first-upload-file" multiple accept="image/jpg,image/jpeg,image/gif,image/png">
								</a>
							</p>
						</div>
						<div class="photo-preview-area">
							<div class="upload-photo-area"></div>
							<div class="upload-info">最多上传四张图片，支持jpg、png、gif格式</div>
						</div>
					</section>
					<div class="boxshadow"></div>
					<div class="issue-form-item goods-title">
						<div class="form-key">物品名称:</div>
						<div class="form-value">
							<div class="form-input-wr">
								<input type="text" name="goods-title">
							</div>
							<div class="error-info">
								<span class="error-circle"></span>
								<span class="error-text"></span>
							</div>
						</div>
					</div>
					<div class="issue-form-item goods-cat">
						<div class="form-key">选择分类:</div>
						<div class="form-value">
							<div class="form-input-wr" id="goods-cat-top">
								<span id="cat-top-name">未选择</span>
								<input type="hidden" name="goods-cat-top">
								<a href="javascript:void(0)" class="form-down-arrow">
									<span></span>
								</a>
							</div>
							<ul class="issue-category" id="issue-category">
								<li value="1">学习用品</li>
								<li value="2">衣服配饰</li>
								<li value="3">数码产品</li>
								<li value="5">生活娱乐</li>
								<li value="9">其他</li>
							</ul>
							<div class="error-info">
								<span class="error-circle"></span>
								<span class="error-text"></span>
							</div>
						</div>
						<div class="form-value-l">
							<div class="form-input-wr" id="goods-cat-next">
								<span id="cat-next-name">未选择</span>
								<input type="hidden" name="goods-cat-next">
								<a href="javascript:void(0)" class="form-down-arrow">
									<span></span>
								</a>
							</div>
							<ul class="issue-category-next" id="issue-category-next">
								<li pkitem="1" value="11" class="item-hide">课内教材</li>
								<li pkitem="1" value="12" class="item-hide">文具</li>
								<li pkitem="1" value="13" class="item-hide">出国书籍</li>
								<li pkitem="1" value="14" class="item-hide">课外书籍</li>
								<li pkitem="2" value="21" class="item-hide">男装</li>
								<li pkitem="2" value="22" class="item-hide">女装</li>
								<li pkitem="2" value="23" class="item-hide">手表鞋袋</li>
								<li pkitem="2" value="24" class="item-hide">配饰</li>
								<li pkitem="3" value="31" class="item-hide">鼠标键盘</li>
								<li pkitem="3" value="32" class="item-hide">移动电源</li>
								<li pkitem="3" value="33" class="item-hide">充电器</li>
								<li pkitem="3" value="34" class="item-hide">耳机</li>
								<li pkitem="4" value="41" class="item-hide">自行车</li>
								<li pkitem="4" value="42" class="item-hide">电动车</li>
								<li pkitem="5" value="51" class="item-hide">乐器</li>
								<li pkitem="5" value="52" class="item-hide">棋牌</li>
								<li pkitem="5" value="53" class="item-hide">会员卡</li>
								<li pkitem="5" value="54" class="item-hide">化妆品</li>
								<!-- <li pkitem="99" value="99" class="item-hide">其他</li> -->
							</ul>
						</div>
					</div>
					<div class="issue-form-item check-activity">
						<div class="form-key"></div>
						<div class="form-value">
							<input type="checkbox" name = "check-activity" id="check-activity">
							<label class="check" for="check-activity"> 
								<div class="form-input-wr">
									<span id="">双11专区</span>
								</div>
								<div class="info" >（点选此处可以变萌变帅变可爱，物品在双11专区可见哦）</div>
							</label>
						</div>
					</div>
					<div class="issue-form-item goods-tele">
						<div class="form-key">联系方式:</div>
						<div class="form-value">
							<div class="form-input-wr">
								<input type="text" name="goods-tele">
							</div>
							<div class="error-info">
								<span class="error-circle"></span>
								<span class="error-text"></span>
							</div>
						</div>
					</div>
					<div class="issue-form-item goods-detailed">
						<div class="form-key">物品详情:</div>
						<div class="form-value">
							<div class="form-input-wr">
								<textarea name="goods-detailed"></textarea>
							</div>
							<div class="error-info">
								<span class="error-circle"></span>
								<span class="error-text"></span>
							</div>
						</div>
					</div>
					<div class="issue-form-item master-desire">
						<div class="form-key">我的愿望:</div>
						<div class="form-value">
							<div class="form-input-wr">
								<textarea name="master-desire"></textarea>
							</div>
							<div class="error-info">
								<span class="error-circle"></span>
								<span class="error-text"></span>
							</div>
						</div>
					</div>
					<div class="issue-form-item check-issue">
						<div class="form-key"></div>
						<div class="form-value">
							<div class="form-issue-wr">
								<input type="checkbox" checked id="check-issue">
								<label for="check-issue"><i>我同意</i></label>
								<a href="/rules" target="_blank">商品发布规则</a>
							</div>
							<div class="error-info">
								<span class="error-circle"></span>
								<span class="error-text"></span>
							</div>
						</div>
					</div>
					<div class="issue-form-item">
						<div class="form-key"></div>
						<div class="form-value">
							<a href="javascript:void(0)" class="issue-button">马上发布</a>
						</div>
					</div>
				</section>
			</section>
		</section>
		<div id="mes">提交失败，为什么会这样呢，为什么呢，这是为什么呢？</div>
		@include('pc/content/modals')
		@include('pc/content/footer')
		<script type="text/javascript" src="/pc/scripts/lib/jQuery.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/photoUpload/dist/lrz.bundle.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/sea.js"></script>
		<script type="text/javascript" src="/pc/scripts/lib/jquery.simplemodal.js"></script>
		<script type="text/javascript" src="/pc/scripts/issue.js"></script>
		<script type="text/javascript">
			seajs.config({base: './pc'});
			seajs.use('scripts/header');
		</script>
	</body>
</html>
