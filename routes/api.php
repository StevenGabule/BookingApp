<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "Api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', static function (Request $request) {
    return $request->user();
});

//Route::get('/products', 'ProductController@index');
Route::get('/restaurants', 'RestaurantController@index');
Route::post('/restaurants', 'RestaurantController@store');
Route::get('/restaurant/edit/{id}', 'RestaurantController@edit');
Route::post('/restaurant/update/{id}', 'RestaurantController@update');
Route::delete('/restaurants/{id}', 'RestaurantController@destroy');
