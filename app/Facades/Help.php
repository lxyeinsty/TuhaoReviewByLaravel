<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Help extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'help';
    }
}