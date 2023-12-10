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
        return "Description pour la Médiane.";
      case 'regle2':
        return "Description pour la Moyenne.";
      case 'regle3':
        return "Description pour la Majorité absolue.";
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
