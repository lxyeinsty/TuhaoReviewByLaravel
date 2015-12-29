<header class="tuhao-header">
    <div class="origin-show">
        <a href="/">
            <img src="/mobile/images/header-logo.png">
        </a>
        <div class="list-button">
            <a href="javascript:;" id="search">
                <img src="/mobile/images/search.png">
            </a>
            @if($loginFlag)
                <a href="javascript:;" id="user_info">
                    <img src="/mobile/images/logout.png">
                </a>
                <a href="javascript:;" id="logout"></a>
            @else
                <a href="javascript:;" id="login">
                    <img src="/mobile/images/login.png">
                </a>
            @endif
        </div>
    </div>
    <div class="search-show">
        <div class="search-frame">
            <i class="icon search-icon"></i>
            @if($key)
                <input type="text" name="search" placeholder="搜索" id="search-input" value="{{$key}}">
            @else
                <input type="text" name="search" placeholder="搜索" id="search-input">
            @endif
            <i class="icon empty-icon" id="empty"></i>
        </div>
        <a href="javascript:;" id="cancel">取消</a>
    </div>
</header>
<div class="mask-layer"></div>
@if($loginFlag)
    <input type="hidden" name="loginFlag" value="{{$loginFlag}}">
@else
    <input type="hidden" name="loginFlag" value="0">
@endif