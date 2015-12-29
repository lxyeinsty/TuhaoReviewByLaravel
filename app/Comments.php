<?php

namespace App;

class Comments extends Base
{
    public $timestamps = false;

    protected $table = 'tuhao_comm';

    protected $guarded = [];

    protected $hidden = [];

    public static function offsetHelp($pageSize, $curPage, $returnType)
    {
        if ($returnType == 'json') {
            if ($curPage < 1 || $curPage == null || !is_numeric($curPage)) {
                $curPage = 1;
            }
            $offset = ($curPage- 1) * $pageSize;
        }  else {
            $offset = 0;
        }

        return $offset;
    }


    public static function newsCount($id, $username)
    {
        $sentNum = Goods::where([
            'username' => $username,
            'is_send' => 1,
            'status' => 0])->count();
        $mesNum = self::where(['receiver_id' => $id, 'status' => 0])->count();

        return ['sentNum' => $sentNum, 'mesNum' => $mesNum];
    }


    public static function details($goodsId, $pageSize, $curPage = 1, $returnType = '')
    {
        $sonComments = [];
        $parentComments = [];
        $numRows = self::where(['pro_id' => $goodsId, 'parent_id' => 0])->
                            orderBy('reg_time', 'desc')->count();
        $totalPage = ceil($numRows/$pageSize);
        $offset = self::offsetHelp($pageSize, $curPage, $returnType);
        $rows = self::where(['pro_id' => $goodsId, 'parent_id' => 0])
                        ->orderBy('reg_time', 'desc')->skip($offset)->take($pageSize)->get();

        foreach ($rows as $row) {
            $goods =  Goods::find($goodsId);
            $sender = User::find($row->sender_id);
            $receiver = User::find($row->receiver_id);
            $src = 'uploads/' . $sender->hasInfo->head_photo;
            $sonRows = self::where('parent_id', $row->id)->get();

            foreach ($sonRows as $sonRow) {
                $sonSender = User::find($sonRow->sender_id);
                $sonReceiver = User::find($sonRow->receiver_id);
                $sonSrc = 'uploads/' . $sonSender->hasInfo->head_photo;
                $sonRow->sender_author = $sonSender->username;
                $sonRow->receiver_author = $sonReceiver->username;
                $sonRow->src = $sonSrc;

                if ($returnType == 'json') {
                    $sonComments[] = $sonRow->toArray();
                } else {
                    $sonComments[] = $sonRow;
                }
            }

            $row->sender_author = $sender->username;
            $row->receiver_author = $receiver->username;
            $row->goods_name = $goods->pro_name;
            $row->src = $src;
            $row->comments = $sonComments;
            $sonComments = [];

            if ($returnType == 'json') {
                $parentComments[] = $row->toArray();
            } else {
                $parentComments[] = $row;
            }
        }

        $data = [
            'curPage' => $curPage,
            'maxPage' => $totalPage,
            'data' => $parentComments
        ];

        if ($returnType == 'json') {
            return self::success($data);
        }

        return $data;
    }


    public static function personal($id, $pageSize, $curPage = 1, $returnType = '')
    {
        $comments = [];
        $numRows = self::where(['receiver_id' => $id])->orderBy('reg_time', 'desc')->count();
        $totalPage = ceil($numRows/$pageSize);
        $offset = self::offsetHelp($pageSize, $curPage, $returnType);
        $rows = self::where(['receiver_id' => $id])
            ->orderBy('reg_time', 'desc')->skip($offset)->take($pageSize)->get();
        $newNum = self::where(['receiver_id' => $id, 'status' => 0])->count();

        foreach ($rows as $row) {
            $goods =  Goods::find($row->pro_id);
            $sender = User::find($row->sender_id);
            $receiver = User::find($row->receiver_id);
            $src = 'uploads/' . $sender->hasInfo->head_photo;

            if ($row->status == 0) {
                $row->update(['status' => 1]);
                $row->status = 0;
            }
            $row->sender_author = $sender->username;
            $row->receiver_author = $receiver->username;
            $row->goods_name = $goods->pro_name;
            $row->src = $src;

            if ($returnType == 'json') {
                $comments[] = $row->toArray();
            } else {
                $comments[] = $row;
            }
        }

        $data = [
            'curPage' => $curPage,
            'maxPage' => $totalPage,
            'newNum' => $newNum,
            'data' => $comments
        ];

        if ($returnType == 'json') {
            return self::success($data);
        }

        return $data;
    }


    public static function add(array $args)
    {
        $args['receiver_id'] = $args['receiver_id'] ? $args['receiver_id'] : 0;
        $comment = [
            'parent_id' => $args['parent_id'],
            'pro_id' => $args['pro_id'],
            'sender_id' => $args['sender_id'],
            'receiver_id' => $args['receiver_id'],
            'content' => $args['content'],
            'status' => 0,
            'reg_time' => time()
        ];

        $comm = self::create($comment);
        $goods= Goods::find($comm->pro_id);
        $info = Info::where('user_id', $comm->sender_id)->first();
        $sender = User::find($comm->sender_id);
        $receiver = User::find($comm->receiver_id);
        $comm->sender_author = $sender->username;
        $comm->receiver_author = $receiver->usernmae;
        $comm->pro_name = $goods->pro_name;
        $comm->src = 'uploads/' . $info->head_photo;
        $comm->comments = [];

        return self::success($comm->toArray());
    }

}
