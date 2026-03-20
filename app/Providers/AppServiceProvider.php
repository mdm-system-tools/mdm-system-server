<?php

namespace App\Providers;

use App\Models\Divida;
use App\Observers\DividaObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Divida::observe(DividaObserver::class);
    }
}
