<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
//use App\Http\Controllers\Controleur;


Route::get('/', function () {
    return view('index');
})->name('accueil');


use App\Http\Controllers\PartieController;

// Route pour afficher la page de jeu
Route::get('/menu/jeu', [PartieController::class, 'afficherPageJeu']);

// Route pour traiter le formulaire de création de partie
Route::post('/menu/creer-partie', [PartieController::class, 'creerPartie']);
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

// routes pour enregistrer la parite
Route::post('/enregistrer-partie', [PartieController::class,'enregistrerPartie']);

// route pour le profile
Route::get('/profile', [PartieController::class, 'afficherProfile'])->name('profile');

// route pour les parties crées et continuer une partie
Route::get('/parties-crees', [PartieController::class, 'partiesCrees']);
Route::get('/continuer-partie/{partieId}', [PartieController::class,'continuerPartie'])->name('continuer.partie');

// Route pour afficher la page de menu inscritpion et connexion
Route::get('/menu', function () {
    return view('menu'); 
})->name('menu');
Route::post('/inscription-connexion', [AuthController::class, 'handleRegistrationOrLogin'])->name('inscription-connexion');

// Route pour telecharger le bakclog selon une partie 
Route::get('/telecharger-backlog/{partieId}', [PartieController::class, 'telechargerBacklog'])->name('telecharger.backlog');
