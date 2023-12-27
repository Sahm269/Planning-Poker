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


// routes/web.php
Route::post('/enregistrer-partie', [PartieController::class,'enregistrerPartie']);


/*Route::get('/profile', function () {
    return view('profile');
});*/
Route::get('/profile', [PartieController::class, 'afficherProfile'])->name('profile');

Route::get('/parties-crees', [PartieController::class, 'partiesCrees']);

Route::get('/continuer-partie/{partieId}', [PartieController::class,'continuerPartie'])->name('continuer.partie');
//Route::post('/auth', [PartieController::class, 'handleAuth'])->name('handle-auth');
// routes/web.php
//Route::post('/register', [PartieController::class, 'handleRegistration'])->name('register');
// Route pour afficher la page de menu
Route::get('/menu', function () {
    return view('menu'); 
})->name('menu');
Route::get('/telecharger-backlog/{partieId}', [PartieController::class, 'telechargerBacklog'])->name('telecharger.backlog');


Route::post('/inscription-connexion', [AuthController::class, 'handleRegistrationOrLogin'])->name('inscription-connexion');
