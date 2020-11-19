<?php

Route::group(['prefix' => 'api/v1', 'namespace' => 'Bt7s7k7\Blog\Http\Controller'], function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::resource('posts', 'PostsController');
        Route::resource('pages', 'PagesController');
    });
});
