<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partie;

class PartieController extends Controller
{
    public function creerPartie(Request $request)
    {
        // Valider les données du formulaire
        $validator = $request->validate([
            'pseudoHote' => 'required',
            'nomProjet' => 'required',
            'nombreJoueur' => 'required',
            'regle' => 'required',
            'backlog' => 'required',
        ]);

            // Ajoutez une validation pour le nom des joueurs
        for ($i = 1; $i <= $request->input('nombreJoueur'); $i++) {
            $validator = $request->validate([
                "player{$i}" => 'required',
            ]);
        }

      
        // Créer une nouvelle partie dans la base de données
        $partie = new Partie;
        $partie->nom_projet = $request->input('nomProjet');
        $partie->pseudo_hote = $request->input('pseudoHote');
        $partie->etatpartie = 'en cours'; 
        $partie->chronometre = 0; 
        $partie->nbjoueur = $request->input('nombreJoueur');
        $partie->regle = $request->input('regle');

        
        
        // Récupérer le nom des joueurs et les stocker en JSON avec cartes initialement vides
        $nomJoueurs = [];

        // Ajouter le pseudo_hote aux joueurs
        $pseudoHote = $request->input('pseudoHote');
        $nomJoueurs[$pseudoHote] = ''; // Initialiser la carte jouée comme vide

        // Récupérer les autres noms des joueurs
        for ($i = 1; $i <= $partie->nbjoueur; $i++) {
            $nomJoueur = $request->input("player{$i}");
            $nomJoueurs[$nomJoueur] = ''; // Initialiser la carte jouée comme vide
        }

        $partie->nomJoueur = json_encode($nomJoueurs);

            // Récupérer le backlog et le stocker en JSON
        $backlog = $request->input('backlog');
        $taches = array_filter(array_map('trim', explode("\n", $backlog)));

        // Initialiser le tableau associatif avec des estimations vides
        $backlogData = [];
        foreach ($taches as $tache) {
            $backlogData[$tache] = ''; 
        }

        // Encoder le tableau associatif en JSON
        $partie->backlog = json_encode($backlogData);











        
    // Appliquer la logique spécifique à la règle choisie
    switch ($partie->regle) {
        case 'regle1':
            // Logique pour la règle 1 (par exemple, Majorité absolue)
            break;

        case 'regle2':
            // Logique pour la règle 2 (par exemple, Médiane)
            break;

        case 'regle3':
            // Logique pour la règle 3 (par exemple, Moyenne)
            break;

        // Ajoutez d'autres cas au besoin

        default:
            // Logique par défaut si la règle n'est pas reconnue
    }
        $partie->save();

        // Rediriger vers la page de jeu
        return view('jeu', ['partie' => $partie]);


    }

    public function afficherPageJeu()
    {
        // Récupérer les données de la partie depuis la base de données
        $partie = Partie::latest()->first(); // Par exemple, récupérez la dernière partie enregistrée
    
        // Passez les données à la vue
        return view('jeu', ['partie' => $partie]);

    }
    
}

?>