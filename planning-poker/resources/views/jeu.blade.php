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
        <div classe="cartes">
           
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
            <div id="carte12" class="carte"><i class="fas fa-coffee"></i></div>
                  
               
        </div>
 
    </div>

    <!--         Section de tout les joueur sous format de liste avec la carte cachée jusqu'à ce que tout les joueurs jouent -->
    
            <!-- Ajoutez une balise div avec un ID pour chaque règle -->
        <div id="regle1" class="regle" >
            <!-- Contenu spécifique à la règle 1 -->
            <div class = "groupe2">
                <div class="chronometre"> chronometre </div> <!-- Chronomètre à gerer --> 
                <div>
                    <ul class="liste-joueurs">
                    @foreach (json_decode($partie->nomJoueur, true) as $nomJoueur => $carteJouee)
                        <li>
                            <div id="joueur{{ $loop->index + 1 }}" class="joueur">
                                <div class="profil-icon"></div>
                                <span class="nom-joueur">{{ $nomJoueur }}</span>
                                <span class="carte-jouee carte-jouee-element"> </span>

                            </div>
                        </li>
                    @endforeach                     

                    </ul>

                </div>
          
            <div class="button-container">
                <button id ="boutonRevoter" onclick="revoter()"> Aigain tache <i class="fa fa-spin"></i></button> <!-- si tout le monde n'est pas d'accord  -->
                <button id="boutonNextTache" onclick="nexttache()"> Next tache <i class="fa fa-forward"></i></button><!--  Si tout le monde est d'accord -->
            </div>

            <div>
                <button onclick="quitter()">Quitter</button>
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
                <li>Aucune taches validée                    </li>
                
            </ul>
</div>

<script>
     var partieData = @json($partie);
</script>

@endsection