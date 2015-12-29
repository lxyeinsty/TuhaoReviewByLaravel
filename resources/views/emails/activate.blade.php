<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <title>账户激活</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
    亲爱的{{ $user->username }} ：<br/>请点击链接激活您的帐号。<br/>
    <a href='http://thm.hustonline.net/user/register/activate?verify={{ $user->token }}' target=
    '_blank'>http://thm.hustonline.net/user/register/activate?verify={{ $user->token }}</a><br/>
    如果以上链接无法点击，请将它复制到你的当前浏览器地址栏中进入访问，该链接24小时内有效;
</body>
</html>
