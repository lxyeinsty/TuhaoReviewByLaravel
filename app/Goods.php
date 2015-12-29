<?php

namespace App;

use Upload;
use Help;

class Goods extends Base
{
    public $timestamps = false;

    protected $table = 'tuhao_pro';

    protected $guarded = [];

    protected $hidden = [];


    public function hasAlbums()
    {
        return  $this->hasMany('App\Album', 'pid', 'id');
    }


    public static function offsetHelp($pageSize, $curPage, $returnType)
    {
        if ($returnType == 'json') {
            if ($curPage < 1 || $curPage == null) {
                $curPage = 1;
            }
            $offset = ($curPage- 1) * $pageSize;
        }  else {
            $offset = 0;
        }

        return $offset;
    }


    public static function hot($offset, $num, $returnType = '')
    {
        $src = '';
        $goods = [];
        $rows = self::where('is_send', 0)->orderBy('hot', 'desc')
            ->skip($offset)->take($num)->get();

        foreach ($rows as $row) {
            $info = User::where('username', $row->username)->first()->hasInfo;
            $albums = $row->hasAlbums;
            foreach ($albums as $key => $album) {
                if ($key == 0) {
                    $src = 'uploads/' . $album->album_path;
                }
            }

            $row->reg_time = date('Y.m.d', $row->reg_time);
            $row->src = $src;
            $row->college = $info->college;

            if ($returnType == 'json') {
                $goods = $row->toArray();
            } else {
                $goods[] = $row;
            }
        }

        if ($returnType == 'json') {
           return self::success($goods);
        }

        return $goods;
    }


    public static function recently($offset, $num, $returnType = '')
    {
        $goods = [];
        $src = '';
        $rows = self::where('is_send', 0)->orderBy('reg_time', 'desc')
            ->skip($offset)->take($num)->get();

        foreach ($rows as $row) {
            $info = User::where('username', $row->username)->first()->hasInfo;
            $albums = $row->hasAlbums;
            foreach ($albums as $key => $album) {
                if ($key == 0) {
                    $src = 'uploads/' . $album->album_path;
                }
            }

            $row->reg_time = date('Y.m.d', $row->reg_time);
            $row->src = $src;
            $row->college = $info->college;

            if ($returnType == 'json') {
                $goods[] = $row->toArray();
            } else {
                $goods[] = $row;
            }

        }

        if ($returnType == 'json') {
            return self::success($goods);
        }

        return $goods;
    }


    public static function issue(array $args)
    {
        $args['is_send'] = 0;
        $args['hot'] = 0;
        $args['reg_time'] = time();
        $args['status'] = 0;
        $path = 'uploads';
        $files = Upload::fileUpload($path);

        $goods = self::create($args);
        $pid = $goods->id;
        if ($goods && $pid && $files) {
            foreach ($files as $file) {
                Help::thumb('uploads/' . $file['name'],
                    'uploads/mobile/' . $file['name'], 200, 200);
                $row = [
                    'pid' => $pid,
                    'album_path' => $file['name']
                ];
                Album::create($row);
            }

            return self::success(['pro_id' => $pid]);
        }

        return self::fail();
    }


    public static function details($goodsId)
    {
        $src = '';
        $goods = self::find($goodsId);
        $albums = $goods->hasAlbums;
        $owner = User::where('username', $goods->username)->first();
        $receiver = User::where('username', $goods->receiver)->first();

        foreach ($albums as $album) {
            $src[] = 'uploads/' . $album->album_path;
        }

        $goods->reg_time = date('Y.m.d', $goods->reg_time);
        $goods->src = $src;
        $goods->user_id = $owner->id;
        $goods->receiver_id = isset($receiver->id) ? $receiver->id : 0;
        $goods->portrait = 'uploads/' . $owner->hasInfo->head_photo;
        $goods->comment_total = Comments::where('pro_id', $goods->id)->count();

        return $goods;
    }


    public static function category($category, $order, $pageSize, $curPage = 1, $returnType = '')
    {
        $goods = [];
        $src = '';
        $categories = ['学习用品','衣服配饰','数码产品','交通工具','生活娱乐','其他','双11专区'];
        if (in_array($category, $categories)) {
            if ($category == '双11专区') {
                $numRows = self::where('activity', 1)->count();
            } else {
                $numRows = self::where('parent_cate', $category)->count();
            }
        } else {
            $numRows = self::where('son_cate', $category)->count();
        }

        $totalPage = ceil($numRows/$pageSize);
        $offset = self::offsetHelp($pageSize, $curPage, $returnType);

        $rows = [];
        if ($order == 'time') {
            if (in_array($category, $categories)) {
                if ($category == '双11专区') {
                    $rows = self::where('activity', 1)->orderBy('reg_time', 'desc')
                        ->skip($offset)->take($pageSize)->get();
                } else {
                    $rows = self::where('parent_cate', $category)->orderBy('reg_time', 'desc')
                        ->skip($offset)->take($pageSize)->get();
                }
            } else {
                $rows = self::where('son_cate', $category)->orderBy('reg_time', 'desc')->get();
            }
        } elseif ($order == 'hot') {
            if (in_array($category, $categories)) {
                if ($category == '双11专区') {
                    $rows = self::where('activity', 1)->orderBy('hot', 'desc')
                        ->skip($offset)->take($pageSize)->get();
                } else {
                    $rows = self::where('parent_cate', $category)->orderBy('hot', 'desc')
                        ->skip($offset)->take($pageSize)->get();
                }
            } else {
                $rows = self::where('son_cate', $category)
                    ->skip($offset)->take($pageSize)->get();
            }
        } elseif ($order == 'general') {
            if (in_array($category, $categories)) {
                if ($category == '双11专区') {
                    $rows = self::where('activity', 1)->skip($offset)->take($pageSize)->get();
                } else {
                    $rows = self::where('parent_cate', $category)
                    ->skip($offset)->take($pageSize)->get();
                }
            } else {
                $rows = self::where('son_cate', $category)
                    ->skip($offset)->take($pageSize)->get();
            }

            $length = count($rows);
            for ($k = 1; $k < $length; $k++) {
                for ($j = $length - 1, $i = 0; $i < $length - $k; $i++, $j--)
                    if ($rows[$j]->general > $rows[$j - 1]->general) {
                        if ($rows[$j]->general > $rows[$j - 1]->general) {
                            $tmp = $rows[$j];
                            $rows[$j] = $rows[$j - 1];
                            $rows[$j - 1] = $tmp;
                        }
                    }
            }
        } elseif ($order == 'comment') {
            if (in_array($category, $categories)) {
                if ($category == '双11专区') {
                    $rows = self::where('activity', 1)->skip($offset)->take($pageSize)->get();
                } else {
                    $rows = self::where('parent_cate', $category)->get();
                }
            } else {
                $rows = self::where('son_cate', $category)->get();
            }
            foreach ($rows as $row) {
                $row->commCount =Comments::where('pro_id', $row->id)->count();
            }

            $length = count($rows);
            for ($k = 1; $k < $length; $k++) {
                for ($j = $length - 1, $i = 0; $i < $length - $k; $i++, $j--)
                    if ($rows[$j]->commCount > $rows[$j - 1]->commCount) {
                        if ($rows[$j]->commCount > $rows[$j - 1]->commCount) {
                            $tmp = $rows[$j];
                            $rows[$j] = $rows[$j - 1];
                            $rows[$j - 1] = $tmp;
                            $rows[$j - 1] = $tmp;
                        }
                    }
            }
        }

        foreach ($rows as $row) {
            $user = User::where('username',$row->username)->first();
            $info = $user->hasInfo;
            $albums = $row->hasAlbums;
            foreach ($albums as $key => $album) {
                if ($key == 0) {
                    $src = 'uploads/' . $album->album_path;
                }
            }

            $row->src = $src;
            $row->college = $info->college;
            $row->reg_time = date('Y.m.d', $row->reg_time);

            if ($returnType == 'json') {
                $goods[] = $row->toArray();
            } else {
                $goods[] = $row;
            }
        }

        $data = [
            'curPage' => $curPage,
            'maxPage' => $totalPage,
            'data' => $goods
        ];

        if ($returnType == 'json') {
            return self::success($data);
        }

        return $data;
    }


    public static function headerCategory($category)
    {
        $src = '';
        $goods = [];
        if ($category == '双11专区') {
            $rows = self::where('activity', 1)->take(3)->get();
        } else {
            $rows = self::where('parent_cate', $category)->take(3)->get();
        }

        $length = count($rows);
        for ($k = 1; $k < $length; $k++) {
            for ($j = $length - 1, $i = 0; $i < $length - $k; $i++, $j--)
                if ($rows[$j]->general > $rows[$j - 1]->general) {
                    if ($rows[$j]->general > $rows[$j - 1]->general) {
                        $tmp = $rows[$j];
                        $rows[$j] = $rows[$j - 1];
                        $rows[$j - 1] = $tmp;
                    }
                }
        }

        foreach ($rows as $row) {
            $user = User::where('username',$row->username)->first();
            $info = $user->hasInfo;
            $albums = $row->hasAlbums;
            foreach ($albums as $key => $album) {
                if ($key == 0) {
                    $src = 'uploads/' . $album->album_path;
                }
            }

            $row->src = $src;
            $row->reg_time = date('Y.m.d', $row->reg_time);
            $row->college = $info->college;

            $goods[] = $row;
        }

        return $goods;
    }


    public static function search($key, $order, $pageSize, $curPage = 1, $returnType = '')
    {
        $goods = [];
        $src = '';
        $numRows = self::where('pro_name', 'like', "%$key%")->orderBy('reg_time', 'desc')->count();
        $totalPage = ceil($numRows/$pageSize);
        $offset = self::offsetHelp($pageSize, $curPage, $returnType);

        $rows = [];
        if ($order == 'time') {
            $rows = self::where('pro_name', 'like', "%$key%")->orderBy('reg_time', 'desc')
                ->skip($offset)->take($pageSize)->get();
        } elseif ($order == 'hot') {
            $rows = self::where('pro_name', 'like', "%$key%")->orderBy('hot', 'desc')
                ->skip($offset)->take($pageSize)->get();
        } elseif ($order == 'general') {
            $rows = self::where('pro_name', 'like', "%$key%")
                ->skip($offset)->take($pageSize)->get();
            foreach ($rows as $row) {
                $row->general = $row->reg_time + $row->hot * 100000000;
            }

            $length = count($rows);
            for ($k = 1; $k < $length; $k++) {
                for ($j = $length - 1, $i = 0; $i < $length - $k; $i++, $j--)
                    if ($rows[$j]->general > $rows[$j - 1]->general) {
                        if ($rows[$j]->general > $rows[$j - 1]->general) {
                            $tmp = $rows[$j];
                            $rows[$j] = $rows[$j - 1];
                            $rows[$j - 1] = $tmp;
                        }
                    }
            }
        } elseif ($order == 'comment') {
            $rows = self::where('pro_name', 'like', "%$key%")
                ->skip($offset)->take($pageSize)->get();
            foreach ($rows as $row) {
                $row->commCount =Comments::where('pro_id', $row->id)->count();
            }

            $length = count($rows);
            for ($k = 1; $k < $length; $k++) {
                for ($j = $length - 1, $i = 0; $i < $length - $k; $i++, $j--)
                    if ($rows[$j]->commCount > $rows[$j - 1]->commCount) {
                        if ($rows[$j]->commCount > $rows[$j - 1]->commCount) {
                            $tmp = $rows[$j];
                            $rows[$j] = $rows[$j - 1];
                            $rows[$j - 1] = $tmp;
                            $rows[$j - 1] = $tmp;
                        }
                    }
            }
        }

        foreach ($rows as $row) {
            $user = User::where('username',$row->username)->first();
            $info = $user->hasInfo;
            $albums = $row->hasAlbums;
            foreach ($albums as $key => $album) {
                if ($key == 0) {
                    $src = 'uploads/' . $album->album_path;
                }
            }

            $row->src = $src;
            $row->college = $info->college;
            $row->reg_time = date('Y.m.d', $row->reg_time);

            if ($returnType == 'json') {
                $goods[] = $row->toArray();
            } else {
                $goods[] = $row;
            }
        }

        $data = [
            'curPage' => $curPage,
            'maxPage' => $totalPage,
            'data' => $goods
        ];

        if ($returnType == 'json') {
            return self::success($data);
        }

        return $data;
    }


    public static function personal($id, $pageSize, $entrance, $curPage = 1, $returnType = '')
    {
        $goods = [];
        $rows = [];
        $src = '';
        $person = User::find($id);
        $newNum = 0;

        if ($entrance == 'sent') {
            $numRows = self::where('username', $person->username)->whereNotNULL('receiver')
                ->orderBy('reg_time', 'desc')->count();
        } elseif ($entrance == 'received') {
            $numRows = self::where('receiver', $person->username)
                ->orderBy('reg_time', 'desc')->count();
        } elseif ($entrance == 'sending') {
            $numRows = self::where('username', $person->username)->whereNULL('receiver')
                ->orderBy('reg_time', 'desc')->count();
        }

        $totalPage = ceil($numRows/$pageSize);
        $offset = self::offsetHelp($pageSize, $curPage, $returnType);

        if ($entrance == 'sent') {
            $rows = self::where('username', $person->username)->whereNotNULL('receiver')
                ->orderBy('reg_time', 'desc')->skip($offset)->take($pageSize)->get();
            $newNum = self::where(['username' => $person->username, 'is_send' => 1, 'status' => 0])
                ->count();
            if ($newNum != 0) {
                $sentGoods = self::where(['username' => $person->username,
                    'is_send' => 1, 'status' => 0])->get();
                foreach ($sentGoods as $one) {
                    $one->update(['status' => 1]);
                }
            }
        } elseif ($entrance == 'received') {
            $rows = self::where('receiver', $person->username)
                ->orderBy('reg_time', 'desc')->skip($offset)->take($pageSize)->get();
        } elseif ($entrance == 'sending') {
            $rows = self::where('username', $person->username)->whereNULL('receiver')
                ->orderBy('reg_time', 'desc')->skip($offset)->take($pageSize)->get();
        }

        foreach($rows as $row) {
            $receiver = User::where('username', $row->receiver)->first();
            $albums = $row->hasAlbums;
            foreach ($albums as $key => $album) {
                if ($key == 0) {
                    $src = 'uploads/' . $album->album_path;
                }
            }

            $row->pro_id =  $row->id;
            $row->goods_name = $row->pro_name;
            $row->sender_author = $row->username;
            $row->receiver_author = $row->receiver;
            $row->status = $row->is_send;
            $row->sender_id = $person->id;
            $row->receiver_id= $receiver ? $receiver->id : 0;
            $row->reg_time = date('Y.m.d', $row->reg_time);
            $row->src = $src;
            $row->college = User::where('username', $row->username)->first()
                        ->hasInfo->college;

            if ($returnType == 'json') {
                $goods[] = $row->toArray();
            } else {
                $goods[] = $row;
            }
        }

        $data = [
            'curPage' => $curPage,
            'maxPage' => $totalPage,
            'newNum' => $newNum,
            'data' => $goods
        ];

        if ($returnType == 'json') {
            return self::success($data);
        }

        return $data;
    }


    public static function give($id, $receiver, $goodsId)
    {
        $goods = self::find($goodsId);

        if ($goods->update(['receiver' => $receiver])) {
            $user = Info::where('user_id', $id)->first();
            $user->score = $user->score + 10;
            $user->inc_score = $user->inc_score + 10;
            $user->save();

            $user = Info::where('user_id', $id)->first();
            $level = floor($user->score/30) + 1;
            $user->levell = $level;
            $user->save();

            return self::success();
        }

        return self::fail();
    }


    public static function sign($id, $proId, $username)
    {
        $goods = self::where(['id' => $proId, 'receiver' => $username])->first();

        if ($goods->update(['is_send' => 1])) {
            $user = Info::where('user_id', $id)->first();
            $user->score = $user->score + 10;
            $user->inc_score = $user->inc_score + 10;
            $user->save();

            $user = Info::where('user_id', $id)->first();
            $level = floor($user->score/30) + 1;
            $user->levell = $level;
            $user->save();

            return self::success();
        }

        return self::fail();
    }


    public static function edit($action, array $data, $id)
    {
        $goods = self::find($id);
        if ($action == 'edit') {
            $rows = Album::where('pid', $id)->get();
            $srcNum = Album::where('pid', $id)->count();
            $path = 'uploads';
            $files = Upload::fileUpload($path);
            $uploadNum = count($files);

            if ($uploadNum < $srcNum) {
                $i = 0;
                foreach ($files as $file) {
                    $array = [
                        'album_path' => $file['name']
                    ];
                    unlink("uploads/" . $rows[$i]->album_path);
                    $rows[$i]->update($array);
                    $i++;
                }
                for ($j = $i; $j < $srcNum; $j++) {
                    $rows[$j]->delete();
                    unlink("uploads/" . $rows[$j]->album_path);
                }
            } elseif ($uploadNum == $srcNum) {
                $i = 0;
                foreach ($files as $file) {
                    $updateArr = [
                        'album_path' => $file['name']
                    ];
                    unlink("uploads/" . $rows[$i]->album_path);
                    $rows[$i]->update($updateArr);
                    $i++;
                }
            } elseif ($uploadNum > $srcNum) {
                $i = 0;
                foreach ($rows as $row) {
                    $updateArr = array(
                        'album_path' => $files[$i]['name']
                    );
                    unlink("uploads/" . $row->album_path);
                    $row->update($updateArr);
                    $i++;
                }
                for ($j = $i; $j < $uploadNum; $j++) {
                    $insertArr = array(
                        'pid' => $id,
                        'album_path' => $files[$j]['name']
                    );
                    Album::create($insertArr);
                }
            }

            if ($goods->update($data)) {
                return self::success(['pro_id' => $id]);
            }

            return self::fail();
        } elseif ($action == 'delete') {
            if (self::where('id', $id)->delete()) {
                foreach (Album::where('pid', $id)->get() as $row) {
                    unlink("uploads/" . $row->album_path);
                }
                Album::where('pid', $id)->delete();
                Comments::where('pro_id', $id)->delete();

                return self::success();
            }

            return self::fail();
        }
    }
}