@extends('layouts.app')
@section('content')



    <!--    Première taches a faire doit s'afficher ici donc ceci est une variable encore une fois -->
    <div class="jeu">
         <!--Nom du projet ceci doit etre une variable qui doit afficher ce qui a été saisi dans le menu -->
    <div class="groupe1"> 
    <div>
        <h2 id="nomProjet">Nom Projet: {{ $partie->nom_projet }}</h2> <!-- ici on doit mettre le nom projet saisi dans le menu-->
        <p></p>
    </div>
        <div> 
            <h3 id="tacheDebattre"></h3>
        </div>
        <div classe="cartes" id="cartesDiv">
           
            <div id="carte0" class="carte">0</div>  <!-- 1ère carte de la 1ère ligne (en haut à gauche) -->
            <div id="carte1" class="carte">1/2</div>  <!-- 2e carte de la 1ère ligne -->
            <div id="carte2" class="carte">1</div>  <!-- 3e carte de la 1ère ligne -->
            <div id="carte3" class="carte">2</div>  <!-- 4e carte de la 1ère ligne -->
            <div id="carte4" class="carte">3</div>  <!-- 1ère carte de la 2e ligne -->
            <div id="carte5" class="carte">5</div>  <!-- ... -->
            <div id="carte6" class="carte">8</div>
            <div id="carte7" class="carte">13</div>
            <div id="carte8" class="carte">20</div>
            <div id="carte9" class="carte">40</div>
            <div id="carte10" class="carte">100</div>
            <div id="carte11" class="carte">?</div>
            <div id="carte12" class="carte"><i class="fas fa-coffee"></i>cafe</div>
                  
               
        </div>

      
            <div id="discussion">
            <div class="chronometrevote" id="chronometrevote"> chronometre </div> <!-- Chronomètre à gerer --> 
            <h3> Seule les joueurs qui ont jouée la carte max et min c'est à dire les extremité ont le droit de parler</h3>
            <h3> Discuter avant le fin du chronometre si non on passe dirrectement au vote </h3>
            <h3> Les personnes coloriées en orange doivent parlées </h3></div>

            <div id = "estimation">
                <h3>La tâche est validée , vous pouvez passer à la tâche suivante. En appuiyannt sur le bouton next tache</h3>
            </div>

            <div id="interrogation">
                <h3> Vous avez tous joué la carte interrogation, cette tache est à rejouée</h3>
            </div>
            <div id="cafe">
                <h3> Vous avez tous joué la carte caffée, cette tache est à rejouée, Après votre petite pause bien meritée </h3>
            </div>
            <div id = "fin">
                <h3>Bravo vous avez fini !!! </h3>
                <button type="button" class="bouton" onclick="nouvellePartie()">Quitter</button>
                <button type="button" class="bouton"onclick="telechargerJson()">New Game</button>
                <button type="button" class="bouton" onclick="telechargerJson()"> Sauvegarder <i class="fas fa-download"></i> </button>
                <button tyoe="bouton" class="bouton" onclick="telechargerJson()"> Backlog <i class="fas fa-download"></i></button>
            </div>
       
 
    </div>

    <!--         Section de tout les joueur sous format de liste avec la carte cachée jusqu'à ce que tout les joueurs jouent -->
    
            <!-- Ajoutez une balise div avec un ID pour chaque règle -->
        <div id="regle1" class="regle" >
            <!-- Contenu spécifique à la règle 1 -->
            <div class = "groupe2">
                <div class="chronometre" id="chronometre"> chronometre </div> <!-- Chronomètre à gerer --> 
                <div>
                    <ul class="liste-joueurs">
                    @foreach (json_decode($partie->nomJoueur, true) as $nomJoueur => $carteJouee)
                        <li>
                            <div id="joueur{{ $loop->index + 1 }}" class="joueur">
                                <div class="profil-icon"><i class="fa fa-user" aria-hidden="true"></i></div>
                                <span class="nom-joueur">{{ $nomJoueur }}</span>
                                <span class="carte-jouee carte-jouee-element"> </span>

                            </div>
                        </li>
                    @endforeach            
              


                    </ul>

                </div>
          
                <div class="button-container">
                <button id="boutonRevoter" class="bouton-clique bouton-desactive" onclick="revoter()"> Aigain tache <i class="fa fa-spin"></i></button>
                <button id="boutonNextTache" class="bouton-clique bouton-desactive" onclick="nexttache()"> Next tache <i class="fa fa-forward"></i></button>
                </div>


            <div>
                <button id="boutonQuitter" onclick="quitter()">Quitter</button>
            </div>
            </div>
    </div>


  

    <!-- Liste de toute les taches à faire on doit pouvoir le modifier ou ajouter quelque chose ...-->
    <div class="groupe3">
        <div class="backlog">

            <button class="buttonbacklog active " onclick="afficherTaches('backlogList',this)">Taches Restantes</button>
            <button class="buttonbacklog" onclick="afficherTaches('backlogListvalide',this)">Taches Validées</button>

            <ul class="backlog-list" id="backlogList">
                @foreach (json_decode($partie->backlog, true) as $tache => $estimation)
                    <li>{{ "$tache: $estimation" }}</li>
                @endforeach
            </ul>


            <ul class="backlog-list" id="backlogListvalide">
                
                
            </ul>
</div>





<script>
     var partieData = @json($partie);
</script>

@endsection