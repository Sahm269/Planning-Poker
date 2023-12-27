<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Partie;
use App\Models\User; 
use Illuminate\Validation\Rule;
use Illuminate\Http\Response;
use PDF;
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
        $partie->pseudo_hote = auth()->user()->pseudo_hote;
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
        $tacherestanteData =[];
        $tachevalideData = [];
        foreach ($taches as $tache) {
            $backlogData[$tache] = ''; 
            $tacherestanteData[$tache]='';
        }

        // Encoder le tableau associatif en JSON
        $partie->backlog = json_encode($backlogData);
        $partie-> tacherestante = json_encode($tacherestanteData);
        $partie-> tachevalide = json_encode( $tachevalideData);











        
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
// Ajoutez cette méthode à votre PartieController
public function enregistrerPartie(Request $request)
{
    // Validez les données si nécessaire

    // Récupérez la partie à mettre à jour
    $partie = Partie::find($request->input('partie_id'));

    // Mise à jour des champs nécessaires
    $partie->nomJoueur = $request->input('nomJoueur');
    $partie->backlog = $request->input('backlog');
    
    
    $partie->tachevalide = $request->input('backlogListvalide');
    $partie->tacherestante = $request->input('backlogList');
    $partie->etatpartie = $request->input('etatpartie');


    // Mettez à jour d'autres champs au besoin
    $partie->save();

    return response()->json(['message' => 'Partie mise à jour avec succès']);
}
public function partiesCrees()
{
    try {
        // Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Vérifier si l'utilisateur est connecté
        if ($user) {
            // Récupérer les parties créées par l'utilisateur connecté
            $partiesCrees = Partie::where('pseudo_hote', $user->pseudo_hote)->get();

            return response()->json($partiesCrees);
        } else {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            return response()->json(['error' => 'Utilisateur non connecté'], 401);
        }
    } catch (\Exception $e) {
        // Gérer les erreurs
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}

public function afficherProfile()
{
    try {
        // Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Vérifier si l'utilisateur est connecté
        if ($user) {
            // Récupérer les parties associées à l'utilisateur connecté
            $partiesCrees = Partie::where('pseudo_hote', $user->pseudo_hote)->get();

            // Retourner la vue "profile" en passant les parties créées comme variable
            return view('profile', ['partiesCrees' => $partiesCrees]);
        } else {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            return redirect()->route('login');
        }
    } catch (\Exception $e) {
        // Gérer les erreurs
        dd($e->getMessage()); // Ajouter cette ligne pour afficher les détails de l'exception
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}


public function continuerPartie($partieId)
{
    try {
        // Retrieve the specified game from the database
        $partie = Partie::find($partieId);

        // Perform any additional logic needed for continuing a game

        // Pass the game data to the view
        return view('jeu', ['partie' => $partie]);
    } catch (\Exception $e) {
        // Handle errors
        dd($e->getMessage()); // Output details of the exception
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}


//Telechargement json

public function telechargerBacklog($partieId)
{
    try {
        
        $partie = Partie::findOrFail($partieId);
        $donneesBacklog = $partie->tachevalide;
        $nomProjet = $partie->nom_Projet;

        // Décoder le JSON en tableau associatif
        $tacheValideArray = json_decode($donneesBacklog, true);


        // Construisez un tableau associatif avec les données du Backlog et le nom du projet
        $donnees = [
            'nomProjet' => $nomProjet,
            'backlog' =>  $tacheValideArray,
        ];

       // Convertissez les données en format JSON avec l'option JSON_UNESCAPED_UNICODE
        $donneesJSON = json_encode($donnees, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);


        // Définissez les en-têtes pour indiquer que c'est un fichier JSON à télécharger
        $headers = [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="backlog.json"',
        ];

        // Envoyez une réponse avec le contenu JSON et les en-têtes appropriés
        return new Response($donneesJSON, 200, $headers);
    } catch (\Exception $e) {
        // Gérez les erreurs
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}




}

?>