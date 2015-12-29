<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;

use App\Goods;
use Validator;

class GoodsController extends Controller
{
    public function more(Request $request)
    {
        $page = $request->input('page');
        $offset = 4 + ($page - 1) * 15;

        return Goods::recently($offset, 15, 'json');
    }


    public function issue(Request $request)
    {
        $input = $request->only('pro_name', 'parent_cate', 'son_cate',
                                'contact', 'pro_desc', 'desire', 'activity');
        $input['username'] =  $request->session()->get('username');

        $validator = Validator::make($request->all(), [
            'pro_name' => 'required|max:255',
            'parent_cate' => 'required|max:30',
            'son_cate' => 'required|max:255',
            'contact' => 'required',
            'pro_desc' => 'required',
            'desire' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->fail('输入信息不符合要求');
        }

        return Goods::issue($input);
    }


    public function category(Request $request)
    {
        $category = $request->session()->get('category');
        $order = $request->input('order');
        $curPage = $request->input('curPage');

        return Goods::category($category, $order, 15, $curPage, 'json');
    }


    public function hot(Request $request)
    {
        $curPage = $request->input('curPage');
        $offset = ($curPage - 1) * 15;

        return Goods::hot($offset, 15, 'json');
    }


    public function search(Request $request)
    {
        $key = $request->session()->get('key');
        $order = $request->input('order');
        $curPage = $request->input('curPage');

        return Goods::search($key, $order, 15, $curPage, 'json');
    }


    public function personal(Request $request)
    {
        $entrance = $request->input('entrance');
        $id = $request->session()->get('id');
        $curPage = $request->input('curPage');

        return Goods::personal($id, 8, $entrance, $curPage, 'json');
    }


    public function userCenter(Request $request)
    {
        $entrance = $request->input('entrance');
        $id = $request->input('id');
        $curPage = $request->input('curPage');

        return Goods::personal($id, 8, $entrance, $curPage, 'json');
    }


    public function guest(Request $request)
    {
        $id = $request->input('id');
        $curPage = $request->input('curPage');

        return Goods::personal($id, 8, 'sending', $curPage, 'json');
    }


    public function give(Request $request)
    {
        $id = $request->session()->get('id');
        $goodsId = $request->input('pro_id');
        $receiverId = $request->input('receiver_id');
        $receiver = User::find($receiverId);

        return Goods::give($id, $receiver->username, $goodsId);
    }


    public function sign(Request $request)
    {
        $id = $request->session()->get('id');
        $proId = $request->input('pro_id');
        $user = User::find($id);

        return Goods::sign($id, $proId, $user->username);
    }


    public function getGoods(Request $request)
    {
        $id = $request->input('pro_id');
        $goods = Goods::details($id);

        return $this->success($goods->toArray());
    }

    public function edit(Request $request)
    {
        $proId = $request->input('pro_id');
        $action = $request->input('action');
        $data = $input = $request->only('pro_name', 'parent_cate', 'son_cate',
            'contact', 'pro_desc', 'desire', 'activity');

        return Goods::edit($action, $data, $proId);
    }
}