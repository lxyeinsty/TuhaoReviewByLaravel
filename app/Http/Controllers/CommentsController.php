<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Comments;

class CommentsController extends Controller
{
    public function details(Request $request)
    {
        $id = $request->input('pro_id');
        $curPage = $request->input('curPage');

        return Comments::details($id, 8, $curPage, 'json');
    }


    public function personal(Request $request)
    {
        $id = $request->session()->get('id');
        $curPage = $request->input('curPage');

        return Comments::personal($id, 8, $curPage, 'json');
    }


    public function userCenter(Request $request)
    {
        $id = $request->input('id');
        $curPage = $request->input('curPage');

        return Comments::personal($id, 8, $curPage, 'json');
    }


    public static function add(Request $request)
    {
        $args = $request->all();
        $args['sender_id'] = $request->session()->get('id');

        return Comments::add($args);
    }

}