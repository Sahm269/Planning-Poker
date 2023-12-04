document.addEventListener('DOMContentLoaded', function () {
    // Add player input fields dynamically based on the number of players
    document.getElementById('nombreJoueur').addEventListener('input', function () {
        const numberOfPlayers = parseInt(this.value);
        const playersContainer = document.getElementById('nomJoueur');
        playersContainer.innerHTML = ""; // Clear previous inputs

        for (let i = 1; i <= numberOfPlayers; i++) {
            const playerInput = document.createElement('input');
            playerInput.type = 'text';
            playerInput.placeholder = 'Joueur ' + i;
            playerInput.name = 'player' + i;
            playerInput.id = 'nom_du_joueur' + 1;
            playersContainer.appendChild(playerInput);
        }
    });
});

function showPart(part) {
    var parts = ['partie1', 'partie2', 'partie3'];

    // Hide all parts
    for (var i = 0; i < parts.length; i++) {
        document.querySelector('.' + parts[i]).style.display = 'none';
    }

    // Show the selected part
    document.querySelector('.' + part).style.display = 'block';
}


function startGame() {
   
   

   //alert("pseudo " + pseudo_hote + "nb joueur " + nombre_joueur + "liste joueur " + tab_nom_joueur + "baclog " + backlog)
   recuperer_donnees();
}

function recuperer_donnees(){

    var formulaire = document.getElementById('setupForm');
    var formData = new FormData(formulaire);
    var pseudo_hote = formData.get('pseudoHote')
    var nom_projet = formData.get('nomProjet')
    var nombre_joueur = formData.get('nombreJoueur')
    var i = 0;
    var tab_nom_joueur = [];
    while(i<=nombre_joueur){
         tab_nom_joueur[i]=formData.get('player'+i)
         i++;
    }
    var backlog = formData.get('backlog');
 var lignes = backlog.split('\n');
 var nb_ligne = lignes.length;
 var backlogJson = [];
 
 for (var i = 0; i < nb_ligne; i++) {
     // Initialiser chaque ligne avec une chaîne vide
     var tacheEstimation = { tache: lignes[i], estimation: '' };
     // Ajouter l'objet à l'array backlogJson
     backlogJson.push(tacheEstimation);
 }
 
 console.log(backlogJson);
 
 // Convertir l'array backlogJson en une chaîne JSON
 var backlogJsonString = JSON.stringify(backlogJson);
 console.log(backlogJsonString);
 
    
}

function afficherDonner(){

}
