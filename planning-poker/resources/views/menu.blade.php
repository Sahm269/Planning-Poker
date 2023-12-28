@extends('layouts.app')
@section('content')


    
    <!--Contenu -->
  <div class="container">
     <!-----------------------                              Titre           ----------------------------->
     <div class="header">
            <h2>Créer une partie</h2>
     </div>

    <!-----------------------          Formulaire pour la partie          ----------------------------->
    
    
    <form class="form" action="{{ url('/menu/creer-partie') }}" method="post" id="setupForm">
    @csrf

    <!-- Partie 1 -->
    <div class="partie1">
        <div class="form-control ">
        <label for="pseudoHote">Nom de l'hôte</label>
            @auth
                <input type="text" id="pseudoHote" name="pseudoHote" value="{{ auth()->user()->pseudo_hote }}" readonly>
               
            @else
                <input type="text" id="pseudoHote" name="pseudoHote" placeholder="Entre ton pseudo" required>
            @endauth
            
        </div>

        <!-- Champ de texte pour le nom du projet -->
        <div class="form-control">
            <label for="nomProjet">Nom du Projet </label>
            <input  type="text" id="nomProjet" name="nomProjet" placeholder="Nom pour votre projet...">
            
        </div>
        <div class="form-control">   <!-- Liste déroulante pour le nombre de joueurs avec maximum 10 -->
            <label for="nombreJoueur">Nombre de joueurs(max 10 sans compter l'hote)</label>
            <input name="nombreJoueur" type="number" id="nombreJoueur" min="1"  max = "10" required>
            
        </div> 

         <!-- Boutons pour les règles avec champs de description Ondoit gerer cette partie avec un du js qui affichera un petit pop up a chaque fois qu'on va cliquer sur une regle  -->
        <div class="form-control" id="regle" >
            <input type="radio" name="regle" value="strict" id="regle1" onclick="afficherDescription('regle1')">
            <label for="regle1">Mode strict</label>

            <input type="radio" name="regle" value="majorite" id="regle2" onclick="afficherDescription('regle2')">
            <label for="regle2">Majorité Relative</label>


        </div>

        <div id="overlay"></div>
            <div id="popup">
            <p id="descriptionText"></p>
            <div id ="bouton-ok"  onclick="fermerPopup()">OK</div>
           </div>

        <div class="bouton-container">            
         <a  href="{{ route('accueil') }}">Quitter <i class="fas fa-sign-out-alt"></i></a> 
        <button type="button" id="boutonSuivantPartie1" class="bouton-suivant" onclick="showPart('partie2')">Suivant</button>
        </div>
    </div>

    

    <!-- Partie 2 -->
    <div class="partie2">
        <!-- ... Your existing Partie 2 HTML ... -->
        <h3>Noms des joueurs , l'hote ne fait pas parti des joueurs à saisir </h3>
        <div class="form-control" id="nomJoueur">
            <!-- champs pour nom des joueurs gerer dynamiquement -->
            <p>Noms des joueurs</p>
        </div>
        <div class="bouton-container">
            <button type="button" class="bouton-retour" onclick="showPart('partie1')">Retour</button>
            <button type="button" id="boutonSuivantPartie2" class="bouton-suivant" onclick="showPart('partie3')">Suivant</button>
        </div>
    </div>

    <!-- Partie 3 -->
    <div class="partie3">
        <p><b>(!!!!!Attention une ligne correspond à une tache )</b> </p>
       <div class="form-control">
            <label for="backlog">Backlog des tâches :</label>
            <textarea name="backlog" id="backlog" rows="4" placeholder="Saisissez une tâche par ligne"></textarea>
           
            
        </div>
        <div class="bouton-container">
        <button type="button" class="bouton-retour" onclick="showPart('partie2')">Retour</button>
        <button type="submit" name="valider" >Commencer la partie</button>
        </div>
    </div>

</form>

</div>
    
    
@endsection