<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/index.css">
</head>

<body>
    @include ('mobile/content/header')
    <a href="javascript:;" id="issue-button">
        <img src="/mobile/images/issue.png">
    </a>
    <input type="hidden" name="curPage" curPage="0">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <main>
        <div class="tuhao-rank">
            <p class="rank-title">
                <span>土豪榜</span>
                <i class="icon feedback-icon"></i>
            </p>
            <div class="rank-list-frame">
            	<ul class="rank-list">
                    @for($i = 0;$i < 3;$i++)
                       <li>
                           <img src="{{$chart[$i]->head_photo}}">
                           <span class="rank-name">{{$i + 1}}</span>
                           <a href="user-center?id={{$chart[$i]->user_id}}" class="user-info">
                               <p class="username">{{$chart[$i]->username}}</p>
                               <p class="academy">{{$chart[$i]->college}}</p>
                               <p class="user-sent">
                                   <span>积分:</span>
                                   <span>{{$chart[$i]->score}}</span>
                               </p>
                               <i class="icon specific-icon"></i>
                           </a>
                       </li> 
                    @endfor
            	</ul>
            </div>
        </div>
        <div class="goods-category">
            <div class="category-row">
                <a href="category?category=双11专区" class="category-cell">
                    <p>
                    	<img src="/mobile/images/icon1-01.png">
                    </p>
                    <p>双十一专区</p>
                </a>
                <a href="hot" class="category-cell">
                    <p>
                    	<img src="/mobile/images/icon2-01.png">
                    </p>
                    <p>最热</p>
                </a>
                <a href="category?category=学习用品" class="category-cell">
                    <p>
                    	<img src="/mobile/images/icon3-01.png">
                    </p>
                    <p>学习用品</p>
                </a>
                <a href="category?category=衣服配饰" class="category-cell">
                    <p>
                    	<img src="/mobile/images/icon4-01.png">
                    </p>
                    <p>衣服配饰</p>
                </a>
            </div>
            <div class="category-row">
            	<a href="category?category=数码产品" class="category-cell">
            	    <p>
            	    	<img src="/mobile/images/icon5-01.png">
            	    </p>
            	    <p>数码产品</p>
            	</a>
            	<a href="category?category=交通工具" class="category-cell">
            	    <p>
            	    	<img src="/mobile/images/icon6-01.png">
            	    </p>
            	    <p>交通工具</p>
            	</a>
            	<a href="category?category=生活娱乐" class="category-cell">
            	    <p>
            	    	<img src="/mobile/images/icon7-01.png">
            	    </p>
            	    <p>生活娱乐</p>
            	</a>
            	<a href="category?category=其他" class="category-cell">
            	    <p>
            	    	<img src="/mobile/images/icon8-01.png">
            	    </p>
            	    <p>其它</p>
            	</a>
            </div>
        </div>
        <div class="goods-show">
            @foreach($newGoods as $item)
                <a class="goods-info" href="details?pro_id={{$item->id}}">
                    <div class="goods-thumb">
                        <img src="{{$item->src}}">
                        @if($item->is_send === 1)
                            <p class="goods-status">已送出</p>
                        @endif
                    </div>
                    <p class="goods-content">
                        <span class="goods-name">{{$item->pro_name}}</span>
                        <span class="goods-master">{{$item->username}}</span>
                    </p>
                </a>
            @endforeach
        </div>
    </main>
    <p class="end-line">
        <span>END</span>
    </p>
    <p class="more-loading">
        <img src="/mobile/images/loading.gif">
    </p>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/tpl/dist/template.js"></script>
    <script type="text/javascript" src="/mobile/scripts/lib/fastclick.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/index.js"></script>
</body>

</html>
