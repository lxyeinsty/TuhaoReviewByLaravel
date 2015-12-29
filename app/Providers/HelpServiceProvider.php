<?php

namespace App\Providers;
use App\Libraries\Help;

use Illuminate\Support\ServiceProvider;

class HelpServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('help', function() {
            return new Help;
        });
    }
}
