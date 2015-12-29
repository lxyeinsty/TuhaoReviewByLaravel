<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/user-info.css">
</head>

<body>
    @include ('mobile/content/header')
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="hidden" name="user_id" value="{{$user->user_id}}">
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
                    <a href="user-center?id={{$user->user_id}}" class="edit-info">
                        <span>取消编辑</span>
                    </a>
                </div>
            </div>
            <div class="user-panel-tab">
                <ul>
                    <li class="current-choose">个人资料</li>
                    <!-- <li>重置密码</li> -->
                </ul>
            </div>
        </div>
        <div class="user-specific-info">
            <div class="user-info-item">
                <span>昵 称:</span>
                <input type="text" name="nickname" origin-nickname="{{$user->username}}" value="{{$user->username}}">
            </div>
            <div class="user-info-item">
                <span>学 院:</span>
                <input type="text" name="academy" origin-academy="{{$user->college}}" value="{{$user->college}}">
            </div>
            <div class="user-info-item">
                <span>住 址:</span>
                <input type="text" name="location" origin-location="{{$user->address}}" value="{{$user->address}}">
            </div>
            <a href="javascript:;" id="finish-edit">完成编辑</a>
        </div>
    </main>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/scripts/dist/user-info.js"></script>
</body>

</html>
