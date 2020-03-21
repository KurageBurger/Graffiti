<?php

use Illuminate\Http\Request;

Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/user', fn() => Auth::user())->name('user');
Route::post('/photos', 'PhotoController@create')->name('photo.create');
Route::get('/photos', 'PhotoController@index')->name('photo.index');
Route::get('/photos/{id}', 'PhotoController@show')->name('photo.show');
Route::post('/photos/{photo}/comments', 'PhotoController@addComment')->name('photo.comment');
Route::put('/photos/{id}/like', 'PhotoController@like')->name('photo.like');
Route::delete('/photos/{id}/like', 'PhotoController@unlike');