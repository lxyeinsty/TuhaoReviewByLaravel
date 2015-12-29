<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use DB;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\Inspire::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function() {
            $rows = DB::table('tuhao_info')->get();

            foreach ($rows as $row) {
                DB::table('tuhao_info')->where('id', $row->id)->update(['week_score' => $row->inc_score]);
                DB::table('tuhao_info')->where('id', $row->id)->update(['inc_score' => 0]);
            }
        });
    }
}
