<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/forget-password.css">
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
                <input type="password" placeholder="新密码" name="new-password">
            </div>
            <div class="panel-input origin">
                <input type="password" placeholder="再输入一次新密码" name="password-again">
            </div>
            <a href="javascript:;" class="panel-button" id="submit">提交</a>
        </section>
    </section>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/scripts/lib/md5-min.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/reset-password.js"></script>
</body>

</html>
