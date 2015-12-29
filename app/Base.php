<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

abstract class Base extends Model
{
    protected  static function success($code = null, $mes = null, $data = null)
    {
        $json = [
            'code' => 1,
            'mes' => 'success',
            'data' => [],
        ];

        foreach([$code, $mes, $data] as $v)
        {
            switch (true)
            {
                case (is_integer($v)):
                    $json['code'] = $v;
                    break;
                case (is_string($v)):
                    $json['mes'] = $v;
                    break;
                case (is_array($v)):
                    $json['data'] = $v;
            }
        }

        return response()->json($json);
    }



    protected static function fail($code = null, $mes = null, $data = null)
    {
        $json = [
            'code' => 0,
            'mes' => 'failed',
            'data' => [],
        ];

        foreach([$code, $mes, $data] as $v)
        {
            switch (true)
            {
                case (is_integer($v)):
                    $json['code'] = $v;
                    break;
                case (is_string($v)):
                    $json['mes'] = $v;
                    break;
                case (is_array($v)):
                    $json['data'] = $v;
            }
        }

        return response()->json($json);
    }
}