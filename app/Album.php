<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Base
{
    public $timestamps = false;

    protected $table = 'tuhao_album';

    protected $guarded = [];

    protected $hidden = [];


}