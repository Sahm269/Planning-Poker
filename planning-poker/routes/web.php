<?php
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\Controleur;


Route::get('/', function () {
    return view('index');
})->name('accueil');


use App\Http\Controllers\PartieController;
// Route pour afficher la page de menu
Route::get('/menu', function () {
    return view('menu'); 
})->name('menu');

// Route pour afficher la page de jeu
Route::get('/menu/jeu', [PartieController::class, 'afficherPageJeu']);

// Route pour traiter le formulaire de création de partie
Route::post('/menu/creer-partie', [PartieController::class, 'creerPartie']);


// routes/web.php
Route::post('/enregistrer-partie', [PartieController::class,'enregistrerPartie']);




Route::get('/generer-pdf', [PartieController::class, 'genererPDF']);


/*Route::get('/profile', function () {
    return view('profile');
});*/
Route::get('/profile', [PartieController::class, 'afficherProfile'])->name('profile');

Route::get('/parties-crees', [PartieController::class, 'partiesCrees']);

Route::get('/continuer-partie/{partieId}', [PartieController::class,'continuerPartie'])->name('continuer.partie');
