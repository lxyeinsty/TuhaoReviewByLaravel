<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use Help;
use App\User;
use App\Info;
use App\Goods;
use App\Comments;

class HomeController extends Controller
{
    public function check(Request $request)
    {
        if ($request->session()->has('id') && $request->session()->has('username')) {
            $loginFlag = $request->session()->get('id');
            $username = $request->session()->get('username');
        } elseif ($user = User::where(['auto_token' => $request->cookie('autoToken')])->first()) {
            $request->session()->put('id', $user->id);
            $request->session()->put('username', $user->username);
            $loginFlag = $user->id;
            $username = $user->username;
        } else {
            $loginFlag = 0;
            $username = 'xxx';
        }

        return [
            'loginFlag' => $loginFlag,
            'username' => $username
        ];
    }


    public function login(Request $request)
    {
        return view('mobile.login');
    }


    public function register(Request $request)
    {
        return view('mobile.register');
    }


    public function forgetPwd(Request $request)
    {
        if (Help::checkMobile()) {
            $template = 'mobile.forget-password';
        } else {
            $template = 'pc.forget-password';
        }

        return view($template);
    }


    public function resetPwd(Request $request)
    {
        $verify = $request->input('verify');
        if (User::where('reset_token', $verify)->first()) {
            if (Help::checkMobile()) {
                $template = 'mobile.reset-password';
            } else {
                $template = 'pc.reset-password';
            }

            return view($template);
        }

        return '链接无效';
    }


    public function rules(Request $request)
    {
        $result = $this->check($request);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        return view('pc.rules', [
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum']
        ]);
    }


    public function exceptions(Request $request)
    {
        $result = $this->check($request);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        return view('pc.exceptions', [
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum']
        ]);
    }


    public function remind(Request $request)
    {
        $action = $request->input('action');

        if ($action == 'register') {
            if (Help::checkMobile()) {
                $template = 'mobile.remind-email';
            } else {
                $template = 'pc.remind-email';
            }

            return view($template, ['type' => 0]);
        } elseif ($action == 'login') {
            if (Help::checkMobile()) {
                $template = 'mobile.remind-email';
            } else {
                $template = 'pc.remind-email';
            }

            return view($template, ['type' => 1]);
        } elseif ($action == 'password') {
            if (Help::checkMobile()) {
                $template = 'mobile.remind-email';
            } else {
                $template = 'pc.remind-email';
            }

            return view($template, ['type' => 2]);
        }
    }


    public function index(Request $request)
    {
        $result = $this->check($request);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (Help::checkMobile()) {
            $template = 'mobile.index';
        } else {
            $template = 'pc.index';
        }

        return view($template, [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'hotGoods' => Goods::hot(0, 9),
            'newGoods' => Goods::recently(0, 4),
            'chart' => Info::chart(0, 10, 'week'),
            'activity' => Goods::headerCategory('双11专区'),
            'study' => Goods::headerCategory('学习用品'),
            'clothes' => Goods::headerCategory('衣服配饰'),
            'digital' => Goods::headerCategory('数码产品'),
            'transportation' => Goods::headerCategory('交通工具'),
            'entertainment' => Goods::headerCategory('生活娱乐'),
            'others' => Goods::headerCategory('其他')
        ]);
    }


    public function chart(Request $request)
    {
        $result = $this->check($request);
        $type = $request->input('type');
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        return view('pc.tuhao-chart', [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'time' => date('Y/m/d', time()),
            'type' => $type,
            'chartOne' => Info::chart(0, 3, $type),
            'chartTwo' => Info::chart(3, 5, $type),
            'chartThree' => Info::chart(8, 10, $type)
        ]);
    }


    public function release(Request $request)
    {
        $result = $this->check($request);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (!$result['loginFlag']) {
            return redirect('/');
        }

        if (Help::checkMobile()) {
            $template = 'mobile.release';
        } else {
            $template = 'pc.release';
        }

        return view($template, [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username' => $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum']
        ]);
    }


    public function details(Request $request)
    {
        $result = $this->check($request);
        $id = $request->input('pro_id');
        $goods = Goods::details($id);
        $data = Comments::details($id, 8);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (Help::checkMobile()) {
            $template = 'mobile.details';
        } else {
            $template = 'pc.details';
        }

        return view($template, [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username' => $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'max' => $data['maxPage'],
            'goods' => $goods,
            'comments' => $data['data']
        ]);
    }


    public function category(Request $request)
    {
        $result = $this->check($request);
        $category = $request->input('category');
        $request->session()->put('category', $category);
        $data = Goods::category($category, 'general', 15);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (Help::checkMobile()) {
            $template = 'mobile.goods-category';
        } else {
            $template = 'pc.cate';
        }

        return view($template, [
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'key' => $category,
            'max' => $data['maxPage'],
            'goods' => $data['data']
        ]);
    }


    public function hot(Request $request)
    {
        $result = $this->check($request);
        $data = Goods::hot(0, 15);

        return view('mobile.hot-goods', [
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'key' => '最热',
            'goods' => $data
        ]);
    }


    public function search(Request $request)
    {
        $result = $this->check($request);
        $key = $request->input('key');
        $request->session()->put('key', $key);
        $data = Goods::search($key, 'general', 15);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (Help::checkMobile()) {
            $template = 'mobile.search';
        } else {
            $template = 'pc.search';
        }

        return view($template, [
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'key' => $key,
            'max' => $data['maxPage'],
            'goods' => $data['data']
        ]);
    }


    public function personal(Request $request)
    {
        $result = $this->check($request);
        $entrance = $request->input('entrance');
        $user = Info::where('user_id', $result['loginFlag'])->first();
        $user->username = $result['username'];
        $user->src = 'uploads/' . $user->head_photo;
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (!$result['loginFlag']) {
            return redirect('/');
        }

        if ($entrance == 'sending') {
            $status = 1;
            $data = Goods::personal($result['loginFlag'], 8, $entrance);
        } elseif ($entrance == 'info') {
            $status = 2;
            $data = Comments::personal($result['loginFlag'], 8);
        } else {
            $status = 0;
            $data = Goods::personal($result['loginFlag'], 8, 'sent');
        }

        $goods = Goods::where([
                            'username' => $result['username'],
                            'is_send' => 1,
                            'status' => 0 ])->first();
        if ($goods) {
            $goods->update(['status' => 1]);
        }

        return view('pc.personal', [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'max' => $data['maxPage'],
            'status' => $status,
            'user' => $user,
            'data' => $data['data']
        ]);
    }


    public function userCenter(Request $request)
    {
        $result = $this->check($request);
        $id = $request->input('id');
        $user = Info::where('user_id', $id)->first();
        $user->username = User::find($id)->username;
        $user->src = 'uploads/' . $user->head_photo;
        $status = 0;
        $data = Goods::personal($id, 8, 'sending');

        return view('mobile.user', [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'max' => $data['maxPage'],
            'status' => $status,
            'user' => $user,
            'data' => $data['data']
        ]);
    }


    public function userInfo(Request $request)
    {
        $result = $this->check($request);

        if (!$result['loginFlag']) {
            return redirect('/');
        }

        $user = Info::where('user_id', $result['loginFlag'])->first();
        $user->username = $result['username'];
        $user->src = 'uploads/' . $user->head_photo;

        return view('mobile.user-info', [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'user' => $user
        ]);
    }


    public function guest(Request $request)
    {
        $result = $this->check($request);
        $id = $request->input('id');
        $user = Info::where('user_id', $id)->first();
        $user->username = User::find($id)->username;
        $user->src  = 'uploads/' . $user->head_photo;
        $data = Goods::personal($id, 8, 'sending');
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        return view('pc.guest', [
            'key' => '',
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
            'max' => $data['maxPage'],
            'user' => $user,
            'data' => $data['data']
        ]);
    }


    public function editGoods(Request $request)
    {
        $result = $this->check($request);
        $news = Comments::newsCount($result['loginFlag'], $result['username']);

        if (!$result['loginFlag']) {
            return redirect('/');
        }

        return view('pc.edit-goods', [
            'loginFlag' => $result['loginFlag'],
            'username'=> $result['username'],
            'sentNum' => $news['sentNum'],
            'mesNum' => $news['mesNum'],
        ]);
    }
}
