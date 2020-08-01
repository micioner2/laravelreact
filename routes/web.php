<?php

use Illuminate\Support\Facades\Route;

Route::get('ruta/categoria','CategoriaController@index');
Route::post('ruta/categoria','CategoriaController@store');
Route::put('ruta/categoria','CategoriaController@edit');
Route::put('ruta/categoria/estado','CategoriaController@update');

Route::get( '/{path?}', function(){
    return view( 'index' );
} )->where('path', '.*');
