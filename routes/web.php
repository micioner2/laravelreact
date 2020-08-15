<?php

use Illuminate\Support\Facades\Route;

Route::get('ruta/categoria','CategoriaController@index');
Route::post('ruta/categoria','CategoriaController@store');
Route::put('ruta/categoria','CategoriaController@edit');
Route::put('ruta/categoria/estado','CategoriaController@update');

Route::get('ruta/producto','ProductoController@index');
Route::post('ruta/producto','ProductoController@store');
Route::put('ruta/producto','ProductoController@edit');
Route::put('ruta/producto/estado','ProductoController@update');
Route::get('ruta/producto/search','ProductoController@search');


Route::get( '/{path?}', function(){
    return view( 'index' );
} )->where('path', '.*');
