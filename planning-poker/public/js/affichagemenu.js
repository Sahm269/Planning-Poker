// Recuperation des elements
var formulaire = document.querySelector('#setupForm');
var pseudo_hote = document.querySelector('#pseudoHote');
var nom_projet = document.querySelector('#nomProjet');
var nombre_joueur = document.querySelector('#nombreJoueur');
var tab_nom_joueur = [];
var backlog = document.querySelector('#backlog');

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


form.addEventListener('submit',e=>{
    e.preventDefault();

    form_verify();
})


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


// Fonstions
function form_verify() {
    // Obtenir toutes les valeurs des inputs
    const pseudo_hoteValue = pseudo_hote.value();
    const nom_projetValue = nom_projet.value();
    const nombre_joueurValue = nombre_joueur.value();
    const backlogValue = backlog.value();
    
    // Username verify
    if (pseudo_hoteValue === "") {
        let message ="l'hote ne peut pas être vide";
        setError(pseudo_hote,message);
    }else if(!userValue.match(/^[a-zA-Z]/)){
        let message ="l'hote doit commencer par une lettre";
        setError(pseudo_hote,message)
    }else{
        let letterNum = pseudo_hoteValue.length;
        if (letterNum < 3) {
            let message ="l'hote doit avoir au moins 3 caractères";
            setError(pseudo_hote,message)
        } else {
            setSuccess(pseudo_hote);
        }
    }

    // nom projet  verify
    if (nom_projetValue === "") {
        let message = "Le nom du projet ne peut pas être vide";
        setError(nom_projet,message);
    }
    
    // Nombre_joueurValue verify
    if (nombre_joueurValue ==="") {
        let message ="Le nombre de joueur ne peut pas être vide";
        setError(nombre_joueur,message)
    }
    // backlog verify
    if (backlogValue  ==="") {
        let message ="Le backlog ne peut pas être vide";
        setError(backlog,message)
    }
}

function setError(elem,message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');

    // Ajout du message d'erreur
    small.innerText = message

    // Ajout de la classe error
    formControl.className = "form-control error";
}



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