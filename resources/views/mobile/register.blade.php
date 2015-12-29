<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/register.css">
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
            <div class="basic-register-info">
                <div class="panel-input origin">
                    <input type="text" placeholder="昵称" name="nickname">
                </div>
                <div class="panel-input origin">
                    <input type="text" placeholder="电子邮箱" name="email">
                </div>
                <div class="panel-input origin">
                    <input type="password" placeholder="密码" name="password">
                </div>
                <div class="panel-input origin">
                    <input type="password" placeholder="确认密码" name="confirm-password">
                </div>
                <a href="javascript:;" class="panel-button" id="register">注册</a>
                <div class="panel-item">
                    <input type="checkbox" name="agree-cite" checked>
                    <span>我已阅读并同意</span>
                    <a href="javascript:;">土豪网发布条款</a>
                </div>
            </div>
            <div class="hust-register-info">
                <div class="select-input">
                    <a href="javascript:;" class="select-show" sex="0" id="sex">性别</a>
                    <ul class="select-choose">
                        <li sex="1">男</li>
                        <li sex="2">女</li>
                    </ul>
                </div>
                <div class="select-input">
                    <a href="javascript:;" class="select-show" academy="0" id="academy">学院</a>
                    <ul class="select-choose">
                        <li academy="1">数学学院</li>
                        <li academy="2">物理学院</li>
                        <li academy="3">工程科学学院</li>
                        <li academy="4">化工学院</li>
                        <li academy="5">生命学院</li>
                        <li academy="6">材料学院</li>
                        <li academy="7">船海学院</li>
                        <li academy="8">电气学院</li>
                        <li academy="9">能源学院</li>
                        <li academy="10">电信系</li>
                        <li academy="11">控制系</li>
                        <li academy="12">计算机学院</li>
                        <li academy="13">光电学院</li>
                        <li academy="14">环境学院</li>
                        <li academy="15">电子系</li>
                        <li academy="16">建规学院</li>
                        <li academy="17">土木学院</li>
                        <li academy="18">水电学院</li>
                        <li academy="19">软件学院</li>
                        <li academy="20">法学院</li>
                        <li academy="21">社会学系</li>
                        <li academy="22">新闻学院</li>
                        <li academy="23">历史研究所</li>
                        <li academy="24">外国语学院</li>
                        <li academy="25">中文系</li>
                        <li academy="26">马克思学院</li>
                        <li academy="27">哲学系</li>
                        <li academy="28">公管学院</li>
                        <li academy="29">管理学院</li>
                        <li academy="30">经济学院</li>
                        <li academy="31">体育课部</li>
                        <li academy="32">计算中心</li>
                        <li academy="33">工程实训中心</li>
                        <li academy="34">现代教育技术中心</li>
                        <li academy="35">第一临床学院</li>
                        <li academy="36">第二临床学院</li>
                        <li academy="37">第三临床学院</li>
                        <li academy="38">基础医学院</li>
                        <li academy="39">公共卫生学院</li>
                        <li academy="40">医管院</li>
                        <li academy="41">药学院</li>
                        <li academy="42">法医学系</li>
                        <li academy="43">护理学系</li>
                        <li academy="44">生殖医学中心</li>
                    </ul>
                </div>
                <div class="panel-input origin">
                    <input type="text" placeholder="入学年份" name="enter-year">
                </div>
                <div class="select-input">
                    <a href="javascript:;" class="select-show" doom="0" id="doom">住址</a>
                    <ul class="select-choose">
                        <li doom="1">韵苑</li>
                        <li doom="2">沁苑</li>
                        <li doom="3">西区</li>
                    </ul>
                </div>
                <a href="javascript:;" class="panel-button" id="finish-register">完成</a>
            </div>
        </section>
    </section>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/scripts/lib/md5-min.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/register.js"></script>
</body>

</html>
