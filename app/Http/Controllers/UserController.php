<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Comments;
use App\User;
use App\Info;
use Validator;
use Help;
use Mail;
use DB;

class UserController extends Controller
{
    public function register(Request $request, $action)
    {
        $userArgs = [
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        $infoArgs = [
            'sex' => $request->input('sex'),
            'college' => $request->input('college'),
            'enroll_year' => $request->input('enroll_year'),
            'address' => $request->input('address')
        ];

        if ($action == 'username') {
            $validator = Validator::make($userArgs, [
                'username' => 'required|between:4,12'
            ]);

            if ($validator->fails()) {
                return $this->fail('用户名不符合要求');
            }
        } elseif ($action == 'email') {
            $validator = Validator::make($userArgs, [
                'email' => 'required|email|max:30'
            ]);

            if ($validator->fails()) {
                return $this->fail('邮箱格式不符合要求');
            }
        } elseif($action == 'save') {
            $validator = Validator::make($infoArgs, [
                'sex' => 'required|in:男,女',
                'college' => 'required|max:30',
                'enroll_year' => 'required|max:20',
                'address' => 'required|in:沁苑,西区,韵苑,紫菘'
            ]);

            if ($validator->fails()) {
                return $this->fail('信息不符合要求');
            }

            if ($user = User::register($action, $userArgs, $infoArgs)) {
                if (Mail::send('emails.activate', ['user' => $user], function($mail) use ($user) {
                    $mail->to($user->email)->subject('欢迎注册我们的网站，请激活您的账号！');
                })) {
                    return $this->success('注册成功');
                }

                return $this->fail('邮件发送失败');
            }

            return $this->fail('注册失败');
        }

        return User::register($action, $userArgs, $infoArgs);
    }


    public function userActivate(Request $request)
    {
        $nowTime = time();
        if ($user = User::where(['token' => $request->input('verify')])->first()) {
            if ($nowTime > $user->token_exptime) {
                if (Help::checkMobile()) {
                    $template = 'mobile.prompt';
                } else {
                    $template = 'pc.prompt';
                }
                return view($template, [
                    'status' => false,
                    'message' => '链接过期']);
            } else {
                if ($user->update(['status' => 1])) {
                    if (Help::checkMobile()) {
                        $template = 'mobile.prompt';
                    } else {
                        $template = 'pc.prompt';
                    }
                    return view($template)->with('status', true);
                } else {
                    if (Help::checkMobile()) {
                        $template = 'mobile.prompt';
                    } else {
                        $template = 'pc.prompt';
                    }
                    return view($template, [
                        'status' => false,
                        'message' => '激活失败']);
                }
            }
        } else {
            if (Help::checkMobile()) {
                $template = 'mobile.prompt';
            } else {
                $template = 'pc.prompt';
            }
            return view($template, [
                'status' => false,
                'message' => '链接无效']);
        }
    }


    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = md5($request->input('password'));

        if ($user = User::where(['email' => $email, 'password' => $password])->first()) {
            if ($user->status == 0) {
                Mail::send('emails.activate', ['user' => $user], function($mail) use ($user) {
                    $mail->to($user->email)->subject('账户激活');
                });

                return $this->fail(2, '账户还未激活');
            } elseif ($user->status == 1) {
                $user->auto_token = md5($user->email . time());
                $user->save();
                $request->session()->put('id', $user->id);
                $request->session()->put('username', $user->username);
                cookie('autoToken', $user->auto_token, 60 * 24 * 7);
                $data = Comments::newsCount($user->id, $user->username);

                return $this->success('登录成功',
                    [
                        'id' => $user->id,
                        'username' => $user->username,
                        'sentNum'  => $data['sentNum'],
                        'mesNum' => $data['mesNum']
                    ]);
            }
        }

        return $this->fail('用户名或者密码错误');
    }


    public function logout(Request $request)
    {
        $request->session()->flush();
        cookie('autoToken', '', 0);
        return redirect('/');
    }


    public function chart(Request $request)
    {
        $type =  $request->input('type');

        return Info::chart(0, 10, $type, 'json');
    }


    public function info(Request $request){
        $user = Info::where('user_id', $request->session()->get('id'))->first();
        $user->username = $request->session()->get('username');
        $user->src = 'uploads/' . $user->head_photo;

        return $this->success($user->toArray());
    }


    public function edit(Request $request)
    {
        $args = [
            'username' => $request->input('username'),
            'college' => $request->input('college'),
            'address' => $request->input('address'),
            'id' => $request->session()->get('id')
        ];

        $request->session()->put('username', $request->input('username'));

        return User::edit($args);
    }


    public function forgetPwd(Request $request)
    {
        $email = $request->input('email');
        $token = md5($email . time());

        if ($user = User::where('email', $email)->first()) {
            $result = Mail::send('emails.resetPwd', ['token' => $token],
                function($mail) use ($email) {
                $mail->from('admin@hustonline.net', '冰岩作坊');
                $mail->to($email);
                $mail->subject('土豪网-密码重置链接');
            });

            if ($result) {
                $user->update(['reset_token' => $token]);
                return $this->success('邮件发送成功');
            }

            return $this->fail('邮件发送失败');
        }

        return $this->fail(2, '邮箱未注册');
    }


    public function resetPwd(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $user = User::where('email', $email)->first();

        if ($user) {
            if ($user->update(['password' => md5($password)])) {
                return $this->success('重置密码成功');
            }

            return $this->fail('重置密码失败');
        }

        return $this->fail('邮箱未注册');
    }


    public function headPhoto(Request $request)
    {
        $file = $request->input('file');
        $userId = $request->session()->get('id');
        $base64 = base64_decode($file);
        $path = 'uploads';
        $filename = time() . '.png';
        $destination = $path . "/" . $filename;

        if (file_put_contents($filename, $base64)) {
            if (rename($filename, $destination)) {
                Info::where('user_id', $userId)->update(['head_photo' => $filename]);
                return $this->success('上传成功', ['src' => 'uploads/' . $filename]);
            }

            return $this->fail('上传失败');
        }

        return $this->fail('上传失败');
    }
}


