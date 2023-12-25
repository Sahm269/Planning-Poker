// Recuperation des elements
var formulaire = document.querySelector('#setupForm');
var pseudo_hote = document.querySelector('#pseudoHote');
var nom_projet = document.querySelector('#nomProjet');
var nombre_joueur = document.querySelector('#nombreJoueur');
var tab_nom_joueur = [];
var backlog = document.querySelector('#backlog');
var regleValue = document.querySelector('input[name="regle"]:checked');


//evenements

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




// Fonctions 
function showPart(part) {
    var parts = ['partie1', 'partie2', 'partie3'];

    // Hide all parts
    for (var i = 0; i < parts.length; i++) {
        document.querySelector('.' + parts[i]).style.display = 'none';
    }

    // Show the selected part
    document.querySelector('.' + part).style.display = 'block';
}

// ...

// gestion de la regle choisie 
function afficherDescription(regle) {
    // Récupérer la description en fonction de la règle
    let description = getDescription(regle);

    // Afficher le popup et l'overlay
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('descriptionText').innerHTML = description;
  }

  function fermerPopup() {
    // Fermer le popup et l'overlay
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
  }

  function getDescription(regle) {
    // Retourner la description en fonction de la règle
    switch (regle) {
      case 'regle1':
        return "Le mode de jeu stict correspond aux votes de l'estimation des taches du backlog jusqu'à que l'unanimité soit acquise. C'est-à-dire que chaqu'un leur tour les joeurs vont voter avant la fin du temps imprtit. A la fin les cartes seront réveler mais seule ce ayant choisit les avec cartes la plus faible valeur et la plus forte pouront s'exprimer pour ce mettre d'accord. Si durand le temps de négociation les joeurs sont encore en désacord le vote recommence. C'est opération sont répété jusqu'a que l'unanimité soit acquise ou que les joueurs ayans fait le minimu et le maximum se soit mis d'accord. Appuyer sur suivant pour valider ce mode de jeu.";
      case 'regle2':
        return "Le mode de jeu majorité relative correspond aux votent de l'estimation des taches du backlog jusqu'à que l'unanimité soit acquise ou la majorité relative. C'est-à-dire que chaqu'un leur tour les joeurs vont voter avant la fin du temps imprtit. Pour le premier tour de vote d'une taches : A la fin les cartes seront réveler mais seule ce ayant choisit les cartes avec la plus faible valeur et la plus forte pour s'exprimer pouront ce mettre d'accord. Si durand le temps de négociation les joeurs sont encore en désacord le vote recommence. Dans cas, l'estimation de la taches correspondrat à à l'estimation la plus présente dans le choix parmis celles choisit par les joueurs.Appuyer sur suivant pour valider ce mode de jeu.";
      default:
        return "Description non définie.";
    }
  }

  /* fonction qui affiches les taches selon le boutons cliquée  */

    function afficherTaches(liste,bouton) {
        document.getElementById('backlogList').style.display = 'none';
        document.getElementById('backlogListvalide').style.display = 'none';


           // Retirer la classe "active" de tous les boutons
        var boutons = document.getElementsByClassName('buttonbacklog');
        for (var i = 0; i < boutons.length; i++) {
            boutons[i].classList.remove('active');
        }
        // Afficher la liste spécifiée
        document.getElementById(liste).style.display = 'block';
        bouton.classList.add('active');
    }
// Fonction pour récupérer la partie enregistrée
function recuperer() {
  
  
}