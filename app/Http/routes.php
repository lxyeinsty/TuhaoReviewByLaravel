<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');
Route::get('login', 'HomeController@login');
Route::get('register', 'HomeController@register');
Route::get('remind', 'HomeController@remind');
Route::get('forget-password', 'HomeController@forgetPwd');
Route::get('reset-password', 'HomeController@resetPwd');
Route::get('exceptions', 'HomeController@exceptions');
Route::get('rules', 'HomeController@rules');
Route::get('chart', 'HomeController@chart');
Route::get('release', 'HomeController@release');
Route::get('details', 'HomeController@details');
Route::get('edit-goods', 'HomeController@editGoods');
Route::get('category', 'HomeController@category');
Route::get('hot', 'HomeController@hot');
Route::get('search', 'HomeController@search');
Route::get('personal', 'HomeController@personal');
Route::get('user-center', 'HomeController@userCenter');
Route::get('guest', 'HomeController@guest');
Route::get('user-info', 'HomeController@userInfo');

Route::group(['prefix' => 'user'], function() {
    Route::group(['prefix' => 'register'], function(){
        Route::get('activate', 'UserController@userActivate');
        Route::post('{action}', 'UserController@register');
    });
    Route::post('login', 'UserController@login');
    Route::get('logout', 'UserController@logout');
    Route::get('index', 'UserController@chart');
    Route::get('info', 'UserController@info');
    Route::post('edit', 'UserController@edit');
    Route::post('forgetPwd', 'UserController@forgetPwd');
    Route::post('resetPwd', 'UserController@resetPwd');
    Route::post('headPhoto', 'UserController@headPhoto');
});

Route::group(['prefix' => 'goods'], function() {
    Route::get('index', 'GoodsController@more');
    Route::post('issue', 'GoodsController@issue');
    Route::get('hot', 'GoodsController@hot');
    Route::get('get', 'GoodsController@getGoods');
    Route::post('edit', 'GoodsController@edit');
    Route::get('category', 'GoodsController@category');
    Route::get('search', 'GoodsController@search');
    Route::get('personal', 'GoodsController@personal');
    Route::get('user-center', 'GoodsController@userCenter');
    Route::get('guest', 'GoodsController@guest');
    Route::post('give', 'GoodsController@give');
    Route::post('sign', 'GoodsController@sign');
});

Route::group(['prefix' => 'comments'], function() {
    Route::get('details', 'CommentsController@details');
    Route::get('personal', 'CommentsController@personal');
    Route::post('user-center', 'CommentsController@userCenter');
    Route::post('add', 'CommentsController@add');
});

