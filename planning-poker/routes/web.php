<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controleur;


Route::get('/', function () {
    return view('index');
});


Route::get('/menu', function () {
    return view('menu');
});


Route::get('/menu/jeu', function () {
    return view('jeu');
});

Route::get('/profile', function () {
    return view('profile');
});




