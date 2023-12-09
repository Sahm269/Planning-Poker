@extends('layouts.app')
@section('content')


    
    <!--Contenu -->
  <div class="container">
     <!-----------------------                              Titre           ----------------------------->
     <div class="header">
            <h2>Créer une partie</h2>
     </div>

    <!-----------------------          Formulaire pour la partie          ----------------------------->
    
    
       
<form class= "form" action="" method="" id="setupForm">

    <!-- Partie 1 -->
    <div class="partie1">
        <!-- ... Your existing Partie 1 HTML ... -->
        <div class="form-control ">
            <label for="pseudoHote">Nom de l'hote </label>
            <input type="text" id="pseudoHote" name="pseudoHote" placeholder="Entre ton pseudo" required>
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-exclamation"></i>
            <small>Message d'erreur </small>
        </div>

        <!-- Champ de texte pour le nom du projet -->
        <div class="form-control">
            <label for="nomProjet">Nom du Projet </label>
            <input  type="text" id="nomProjet" name="nomProjet" placeholder="Nom pour votre projet...">
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-exclamation"></i>
            <small>Message d'erreur </small>
        </div>
        <div class="form-control">   <!-- Liste déroulante pour le nombre de joueurs -->
            <label for="nombreJoueur">Nombre de joueurs</label>
            <input name="nombreJoueur" type="number" id="nombreJoueur" min="1"  max = "10" required>
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-exclamation"></i>
            <small>Message d'erreur </small>
        </div> 

         <!-- Boutons pour les règles avec champs de description Ondoit gerer cette partie avec un du js qui affichera un petit pop up a chaque fois qu'on va cliquer sur une regle  -->
        <div class="form-control" id="regle" >
            <input type="radio" name="regle" id="regle1" onclick="afficherDescription('regle1')">
            <label for="regle1">Mediane</label>

            <input type="radio" name="regle" id="regle2" onclick="afficherDescription('regle2')">
            <label for="regle2">Moyenne</label>

            <input type="radio" name="regle" id="regle3" onclick="afficherDescription('regle3')">
            <label for="regle3">Majorité absolue</label>
            <small>Message d'erreur </small>
        </div>

        <div id="overlay"></div>
            <div id="popup">
            <p id="descriptionText"></p>
            <button onclick="fermerPopup()">OK</button>
           </div>

        <div class="bouton-container">            
        <button type="button" class="bouton-quitter" onclick="">Quitter</button>
        <button type="button" id="boutonSuivantPartie1" class="bouton-suivant" onclick="showPart('partie2')">Suivant</button>
        </div>
    </div>

    

    <!-- Partie 2 -->
    <div class="partie2">
        <!-- ... Your existing Partie 2 HTML ... -->
        <div class="form-control" id="nomJoueur">
            <!-- champs pour nom des joueurs gerer dynamiquement -->
            <p>Noms des joueurs</p>
            <small>Message d'erreur </small>
        </div>
        <div class="bouton-container">
            <button type="button" class="bouton-retour" onclick="showPart('partie1')">Retour</button>
            <button type="button" id="boutonSuivantPartie2" class="bouton-suivant" onclick="showPart('partie3')">Suivant</button>
        </div>
    </div>

    <!-- Partie 3 -->
    <div class="partie3">
        <!-- ... Your existing Partie 3 HTML ... -->
        <p><b>(!!!!!Attention une ligne correspond à une tache )</b> </p>
        <!-- Ajoutez une zone de texte pour la liste de tâches -->
       <div class="form-control">
            <label for="backlog">Backlog des tâches :</label>
            <textarea name="backlog" id="backlog" rows="4" placeholder="Saisissez une tâche par ligne"></textarea>
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-exclamation"></i>
            <small>Message d'erreur </small>
            
        </div>
        <div class="bouton-container">
        <button type="button" class="bouton-retour" onclick="showPart('partie2')">Retour</button>
        <button type="submit" name="valider" onclick="startGame()" >Commencer la partie</button>
        </div>
    </div>

</form>

</div>
    
    
@endsection