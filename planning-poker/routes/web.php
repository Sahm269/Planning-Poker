<?php

use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\Controleur;


Route::get('/', function () {
    return view('index');
});


/*route::get('/menu', function () {
    return view('menu');
});


Route::get('/menu/jeu', function () {
    return view('jeu');
});*/
use App\Http\Controllers\PartieController;
// Route pour afficher la page de menu
Route::get('/menu', function () {
    return view('menu'); 
});

// Route pour afficher la page de jeu
Route::get('/menu/jeu', [PartieController::class, 'afficherPageJeu']);

// Route pour traiter le formulaire de création de partie
Route::post('/menu/creer-partie', [PartieController::class, 'creerPartie']);

Route::get('/profile', function () {
    return view('profile');
});




