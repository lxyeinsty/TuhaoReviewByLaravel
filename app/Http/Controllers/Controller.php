<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function success($code = null, $mes = null, $data = null)
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



    protected function fail($code = null, $mes = null, $data = null)
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
