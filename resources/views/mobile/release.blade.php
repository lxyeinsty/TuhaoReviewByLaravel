<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/issue.css">
</head>

<body>
    @include ('mobile/content/header')
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <main class="issue-panel">
        <div class="goods-basic-info">
            <div class="upload-images">
                <div class="upload-preview-area">
                    <!-- <div class="upload-item-container">
                        <div class="upload-item preview-image">
                            <img src="images/goods.png">
                            <a href="javascript:;" delete-id="1"></a>
                        </div>
                    </div> -->
                    <div class="upload-item-container">
                        <div class="upload-item add-image">
                            <img src="/mobile/images/add-image.png">
                            <input type="file" accept="image/jpg,image/jpeg,image/gif,image/png" id="upload-file">
                        </div>
                    </div>
                </div>
                <p>最多上传四张照片</p>
            </div>
            <div class="issue-content">
                <div class="issue-item">
                    <span class="issue-item-title">物品名称:</span>
                    <input type="text" placeholder="字数不能超过25个字" name="goods-name" class="issue-item-content">
                </div>
                <div class="issue-item">
                    <span class="issue-item-title">选择分类:</span>
                    <a href="javascript:;" class="issue-item-content" id="parent-category"></a>
                </div>
                <div class="issue-item">
                    <span class="issue-item-title">联系方式:</span>
                    <input type="text" placeholder="请输入手机号" name="goods-tele" class="issue-item-content">
                </div>
                <div class="issue-item">
                    <span class="issue-item-title edit-textarea">物品详情:</span>
                    <textarea class="issue-item-content" placeholder="字数不能超过160个字" name="goods-intro"></textarea>
                </div>
                <div class="issue-item">
                    <span class="issue-item-title edit-textarea">我的愿望:</span>
                    <textarea class="issue-item-content" name="goods-desire"></textarea>
                </div>
                <a href="javascript:;" id="issue">发　布</a>
            </div>
        </div>
        <div class="choose-goods-category">
            <div class="category-title">
                <a href="javascript:;" back-id="1" id="back-upper"></a>
                <span>类目</span>
            </div>
            <div class="category-panel">
                <ul class="parent-category">
                    <li class="category-item" parent-id="1">学习用品</li>
                    <li class="category-item" parent-id="2">衣服配饰</li>
                    <li class="category-item" parent-id="3">数码产品</li>
                    <li class="category-item" parent-id="4">交通工具</li>
                    <li class="category-item" parent-id="5">生活娱乐</li>
                    <li class="category-item" parent-id="9">其他</li>
                </ul>
                <ul class="child-category">
                    <li class="category-item item-hide" child-id="11" link-id="1">课内教材</li>
                    <li class="category-item item-hide" child-id="12" link-id="1">文具</li>
                    <li class="category-item item-hide" child-id="13" link-id="1">出国书籍</li>
                    <li class="category-item item-hide" child-id="14" link-id="1">课外书籍</li>
                    <li class="category-item item-hide" child-id="21" link-id="2">男装</li>
                    <li class="category-item item-hide" child-id="22" link-id="2">女装</li>
                    <li class="category-item item-hide" child-id="23" link-id="2">手表鞋袋</li>
                    <li class="category-item item-hide" child-id="24" link-id="2">配饰</li>
                    <li class="category-item item-hide" child-id="31" link-id="3">鼠标键盘</li>
                    <li class="category-item item-hide" child-id="32" link-id="3">移动电源</li>
                    <li class="category-item item-hide" child-id="33" link-id="3">充电器</li>
                    <li class="category-item item-hide" child-id="34" link-id="3">耳机</li>
                    <li class="category-item item-hide" child-id="41" link-id="4">自行车</li>
                    <li class="category-item item-hide" child-id="42" link-id="4">电动车</li>
                    <li class="category-item item-hide" child-id="51" link-id="5">乐器</li>
                    <li class="category-item item-hide" child-id="52" link-id="5">棋牌</li>
                    <li class="category-item item-hide" child-id="53" link-id="5">会员卡</li>
                    <li class="category-item item-hide" child-id="54" link-id="5">化妆品</li>
                </ul>
            </div>
        </div>
    </main>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/tpl/dist/template.js"></script>
    <script type="text/javascript" src="/mobile/scripts/lib/fastclick.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/issue.js"></script>
</body>

</html>
