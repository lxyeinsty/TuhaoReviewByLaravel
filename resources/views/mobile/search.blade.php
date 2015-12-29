<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/search.css">
</head>

<body class="search hide-mask">
    @include ('mobile/content/header')
    <a href="javascript:;" id="issue-button">
        <img src="/mobile/images/issue.png">
    </a>
    <input type="hidden" name="curPage" curPage="1">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <main>
        <div class="search-tab">
            <ul>
                <li class="search-choose current-choose">综合</li>
                <li class="search-choose">热度</li>
                <li class="search-choose">评论数</li>
                <li class="search-choose">最新</li>
            </ul>
        </div>
        <div class="search-result">
            <div class="loading">
                <img src="/mobile/images/loading.gif">
            </div>
            @if(count($goods) > 0)
            @foreach($goods as $item)
                <div class="goods-item">
                    <a href="details?pro_id={{$item->id}}">
                        <img src="{{$item->src}}">
                    </a>
                    <div class="goods-intro">
                        <a href="details?pro_id={{$item->id}}">
                            <h3>{{$item->pro_name}}</h3>
                        </a>
                        <p class="goods-master">
                            <span>{{$item->college}}　{{$item->username}}</span>
                        </p>
                        <p class="goods-cademy">
                            <span>{{$item->reg_time}}</span>
                        </p>
                        <a href="details?pro_id={{$item->id}}" class="icon specific-icon"></a>
                    </div>
                </div>
            @endforeach
            @endif
        </div>
    </main>
    @if(count($goods) === 0)
    <p class="end-line show-end-line">
        <span>END</span>
    </p>
    @else
    <p class="end-line">
        <span>END</span>
    </p>
    @endif
    <p class="more-loading">
        <img src="/mobile/images/loading.gif">
    </p>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/tpl/dist/template.js"></script>
    <script type="text/javascript" src="/mobile/scripts/lib/fastclick.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/search.js"></script>
</body>

</html>
