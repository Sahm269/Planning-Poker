<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Controleur extends Controller
{
    public function action(Request $request)
{
    // Validez et traitez les données du formulaire

    $pseudoHote = $request->input('pseudoHote');
    $nomProjet = $request->input('nomProjet');
    $nombreJoueur = $request->input('nombreJoueur');
    // ... autres données

    // Stockez les données dans la session
    session([
        'pseudoHote' => $pseudoHote,
        'nomProjet' => $nomProjet,
        'nombreJoueur' => $nombreJoueur,
        // ... autres données
    ]);

    // Redirigez vers la page "jeu"
    return redirect()->route('jeu'); // Assurez-vous que vous avez une route nommée 'jeu'
}

}

