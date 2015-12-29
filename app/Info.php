<?php

namespace App;

class Info extends Base
{
    public $timestamps = false;

    protected $table = 'tuhao_info';

    protected $guarded = [];

    protected $hidden = ['inc_score'];


    public static function store(array $args)
    {
        $profileArr = ['header1.jpg', 'header2.jpg', 'header3.jpg'];
        $profile = $profileArr[rand(0, 2)];

        $data = [
            'user_id' => $args['id'],
            'sex' => $args['sex'],
            'college' => $args['college'],
            'enroll_year' => $args['enroll_year'],
            'address' => $args['address'],
            'head_photo' => $profile,
            'levell' => 1,
            'score' => 0,
            'week_score' => 0,
            'inc_score' => 0
        ];

        return self::create($data);
    }


    public static function chart($offset, $num, $type, $returnType = '')
    {
        $charts = [];
        $score = $type == 'week' ? 'week_score' : 'score';
        $rows = self::orderBy($score, 'desc')->orderBy('id','asc')
            ->skip($offset)->take($num)->get();

        foreach ($rows as $row) {
            $row->head_photo = 'uploads/' . $row->head_photo;
            $user = User::find($row->user_id);
            if ($type == 'week') {
                $row->username = $user->username;
                $row->score = $row->week_score;
                if ($returnType == 'json') {
                    $row = $row->toArray();
                }
            } else {
                $row->username = $user->username;
                if ($returnType == 'json') {
                    $row = $row->toArray();
                }
            }

            $charts[] = $row;
         }

        if ($returnType == 'json') {
            return self::success($charts);
        } else {
            return  $charts;
        }
    }


}
