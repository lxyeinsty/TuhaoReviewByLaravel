<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/login.css">
</head>

<body>
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <section class="panel">
        <section class="panel-logo">
            <a href="/">
                <img src="/mobile/images/logo.png">
            </a>
        </section>
        <section class="login-register-panel">
            <div class="panel-input origin">
                <input type="text" placeholder="电子邮箱" name="email">
            </div>
            <div class="panel-input origin">
                <input type="password" placeholder="密码" name="password">
            </div>
            <div class="panel-item">
                <input type="checkbox" name="remember-login" checked>
                <span>下次自动登录</span>
            </div>
            <a href="javascript:;" class="panel-button" id="login">登录</a>
            <div class="login-extra-info">
                <a href="register">立即注册</a>
                <a href="forget-password">忘记密码?</a>
            </div>
        </section>
    </section>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/scripts/lib/md5-min.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/login.js"></script>
</body>

</html>
