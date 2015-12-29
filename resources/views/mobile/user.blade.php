<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/user.css">
</head>

<body>
    @include ('mobile/content/header')
    <input type="hidden" name="curPage" curPage="1">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="hidden" name="tab" value="0">
    <input type="hidden" name="user_id" value="{{$user->user_id}}">
    <a href="javascript:;" id="issue-button">
        <img src="/mobile/images/issue.png">
    </a>
    <main>
        <div class="user-panel">
            <div class="user-intro">
                <a href="user-center?id={{$user->user_id}}">
                    <img src="{{$user->src}}">
                </a>
                <div class="user-info">
                    <h2>{{$user->username}}</h2>
                    <p>{{$user->college}}</p>
                    <p class="user-rank">
                        <span>LV{{$user->levell}}</span>
                        <span class="user-grades">
                            积分:<span>{{$user->score}}</span>
                        </span>
                    </p>
                    @if($loginFlag === $user->user_id)
                    <a href="user-info" class="edit-info">
                        <span>编辑资料</span>
                    </a>
                    @endif
                </div>
            </div>
            <div class="user-panel-tab">
                <ul>
                    <!-- <li class="current-choose">已送出的</li> -->
                    <li tab-id="0" class="current-choose">正在送出的物品</li>
                    <!-- <li>我收到的</li> -->
                    @if($loginFlag === $user->user_id)
                    <li tab-id="1">新留言</li>
                    @endif
                </ul>
            </div>
        </div>
        <div class="goods-sending-list">
            <div class="loading">
                <img src="/mobile/images/loading.gif">
            </div>
            @foreach($data as $item)
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
    </main>
    @if(count($data) > 0)
    <p class="end-line">
        <span>END</span>
    </p>
    @else
    <p class="end-line show-end-line">
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
    <script type="text/javascript" src="/mobile/scripts/dist/user.js"></script>
</body>

</html>
