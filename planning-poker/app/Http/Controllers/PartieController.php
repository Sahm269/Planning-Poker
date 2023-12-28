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
   
   /**
 * Crée une nouvelle partie avec les informations fournies dans la requête.
 *
 * @param \Illuminate\Http\Request $request La requête HTTP contenant les données du formulaire.
 * @return \Illuminate\View\View La vue de la page de jeu avec les informations de la nouvelle partie.
 */
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
    $tacherestanteData = [];
    $tachevalideData = [];
    foreach ($taches as $tache) {
        $backlogData[$tache] = ''; 
        $tacherestanteData[$tache] = '';
    }

    // Encoder le tableau associatif en JSON
    $partie->backlog = json_encode($backlogData);
    $partie->tacherestante = json_encode($tacherestanteData);
    $partie->tachevalide = json_encode($tachevalideData);

    

    $partie->save();

    // Rediriger vers la page de jeu
    return view('jeu', ['partie' => $partie]);
}




/**
 * Affiche la page de jeu en récupérant les données de la dernière partie enregistrée.
 *
 * @return \Illuminate\View\View La vue de la page de jeu avec les données de la dernière partie.
 */
public function afficherPageJeu()
{
    // Récupérer les données de la partie depuis la base de données
    $partie = Partie::latest()->first(); 

    // Passez les données à la vue
    return view('jeu', ['partie' => $partie]);
}



/**
 * Enregistre les modifications apportées à une partie.
 *
 * @param \Illuminate\Http\Request $request La requête HTTP contenant les données à enregistrer.
 * @return \Illuminate\Http\JsonResponse Une réponse JSON indiquant le succès de la mise à jour.
 */
public function enregistrerPartie(Request $request)
{
    // Récupérez la partie à mettre à jour
    $partie = Partie::find($request->input('partie_id'));

    // Mise à jour des champs nécessaires
    $partie->nomJoueur = $request->input('nomJoueur');
    $partie->backlog = $request->input('backlog');
    $partie->tachevalide = $request->input('backlogListvalide');
    $partie->tacherestante = $request->input('backlogList');
    $partie->etatpartie = $request->input('etatpartie');
    $partie->save();

    // Retourner une réponse JSON indiquant le succès de la mise à jour
    return response()->json(['message' => 'Partie mise à jour avec succès']);
}

/**
 * Récupère les parties créées par l'utilisateur connecté.
 *
 * @return \Illuminate\Http\JsonResponse Une réponse JSON contenant les parties créées par l'utilisateur.
 */
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

/**
 * Affiche le profil de l'utilisateur connecté avec les parties associées.
 *
 * @return \Illuminate\Http\RedirectResponse|\Illuminate\View\View Une redirection vers la page accueil
 * ou la vue "profile" avec les parties créées comme variable.
 */
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
            return redirect()->route('accueil');
        }
    } catch (\Exception $e) {
        // Gérer les erreurs
        dd($e->getMessage()); // Ajouter cette ligne pour afficher les détails de l'exception
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}

/**
 * Affiche la page de jeu en reprenant une partie en cours.
 *
 * @param int $partieId L'identifiant de la partie à reprendre.
 * @return \Illuminate\View\View|\Illuminate\Http\JsonResponse La vue de la page de jeu avec les données de la partie spécifiée,
 * ou une réponse JSON en cas d'erreur serveur.
 */
public function continuerPartie($partieId)
{
    try {
        // Récupérer la partie spécifiée depuis la base de données
        $partie = Partie::find($partieId);

        // Effectuer toute logique supplémentaire nécessaire pour reprendre une partie

        // Passer les données de la partie à la vue
        return view('jeu', ['partie' => $partie]);
    } catch (\Exception $e) {
        // Gérer les erreurs
        dd($e->getMessage()); // Afficher les détails de l'exception
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}


/**
 * Télécharge le Backlog d'une partie au format JSON.
 *
 * @param int $partieId L'identifiant de la partie pour laquelle télécharger le Backlog.
 * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse Une réponse avec le Backlog au format JSON en cas de succès,
 * ou une réponse JSON en cas d'erreur serveur.
 */
public function telechargerBacklog($partieId)
{
    try {
        // Récupérer la partie spécifiée depuis la base de données
        $partie = Partie::findOrFail($partieId);

        // Récupérer les données du Backlog et le nom du projet
        $donneesBacklog = $partie->tachevalide;
        $nomProjet = $partie->nom_Projet;

        // Décoder le JSON en tableau associatif
        $tacheValideArray = json_decode($donneesBacklog, true);

        // Construire un tableau associatif avec les données du Backlog et le nom du projet
        $donnees = [
            'nomProjet' => $nomProjet,
            'backlog' =>  $tacheValideArray,
        ];

        // Convertir les données en format JSON avec l'option JSON_UNESCAPED_UNICODE
        $donneesJSON = json_encode($donnees, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        // Définir les en-têtes pour indiquer que c'est un fichier JSON à télécharger
        $headers = [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="backlog.json"',
        ];

        // Envoyer une réponse avec le contenu JSON et les en-têtes appropriés
        return new Response($donneesJSON, 200, $headers);
    } catch (\Exception $e) {
        // Gérer les erreurs
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
}





}

?>