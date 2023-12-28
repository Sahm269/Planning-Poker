/**
 * Récupère les éléments du formulaire et les variables nécessaires  et globales.
 * @type {HTMLElement} formulaire - L'élément du formulaire avec l'ID 'setupForm'.
 * @type {HTMLElement} pseudo_hote - L'élément du formulaire avec l'ID 'pseudoHote'.
 * @type {HTMLElement} nom_projet - L'élément du formulaire avec l'ID 'nomProjet'.
 * @type {HTMLElement} nombre_joueur - L'élément du formulaire avec l'ID 'nombreJoueur'.
 * @type {Array} tab_nom_joueur - Un tableau vide pour stocker les noms des joueurs.
 * @type {HTMLElement} backlog - L'élément du formulaire avec l'ID 'backlog'.
 * @type {HTMLElement} regleValue - L'élément radio du formulaire pour la règle sélectionnée.
 */

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


/**
 * Ajoute des champs de saisie de joueur dynamiquement en fonction du nombre de joueurs.
 * @event DOMContentLoaded - L'événement se déclenche lorsque le DOM est complètement chargé.
 * @event input - L'événement se déclenche lorsqu'une valeur d'entrée change.
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * Ajoute des champs de saisie de joueur dynamiquement en fonction du nombre de joueurs.
   * @event input - L'événement se déclenche lorsqu'une valeur d'entrée change dans le champ 'nombreJoueur'.
   * @type {HTMLInputElement} this - L'élément 'nombreJoueur'.
   */
  document.getElementById('nombreJoueur').addEventListener('input', function () {
      /** @type {number} numberOfPlayers - Le nombre de joueurs saisi dans le champ 'nombreJoueur'. */
      const numberOfPlayers = parseInt(this.value);
      /** @type {HTMLElement} playersContainer - L'élément contenant les champs de saisie des joueurs. */
      const playersContainer = document.getElementById('nomJoueur');
      playersContainer.innerHTML = ""; // Efface les champs de saisie précédents

      for (let i = 1; i <= numberOfPlayers; i++) {
          /** @type {HTMLInputElement} playerInput - Le champ de saisie du joueur créé dynamiquement. */
          const playerInput = document.createElement('input');
          playerInput.type = 'text';
          playerInput.placeholder = 'Joueur ' + i;
          playerInput.name = 'player' + i;
          playerInput.id = 'nom_du_joueur' + i;
          playersContainer.appendChild(playerInput);
      }
  });
});


/**
 * Affiche la partie spécifiée tout en masquant les autres parties.
 * @param {string} part - Le nom de la partie à afficher.
 */
function showPart(part) {
  /**
   * @type {string[]} parts - Un tableau contenant les noms de toutes les parties.
   */
  var parts = ['partie1', 'partie2', 'partie3'];

  // Masque toutes les parties
  for (var i = 0; i < parts.length; i++) {
      document.querySelector('.' + parts[i]).style.display = 'none';
  }

  // Affiche la partie sélectionnée
  document.querySelector('.' + part).style.display = 'block';
}

/**
 * Affiche la description associée à une règle dans un popup.
 * @param {string} regle - Le nom de la règle pour laquelle afficher la description.
 */
function afficherDescription(regle) {
    let description = getDescription(regle);

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('descriptionText').innerHTML = description;
  }

  function fermerPopup() {
    // Fermer le popup et l'overlay
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
  }

  

/**
 * Récupère la description associée à une règle spécifique.
 *
 * @param {string} regle - Le nom de la règle pour laquelle récupérer la description.
 * @returns {string} La description associée à la règle spécifiée.
 */
function getDescription(regle) {
  /**
   * Description par défaut en cas de règle non reconnue.
   * @type {string}
   */
  const descriptionNonDefinie = "Description non définie.";

  // Retourner la description en fonction de la règle
  switch (regle) {
      case 'regle1':
          return "Le mode de jeu strict correspond aux votes de l'estimation des tâches du backlog jusqu'à ce que l'unanimité soit acquise. C'est-à-dire que chacun, à leur tour, les joueurs vont voter avant la fin du temps imparti. À la fin, les cartes seront révélées, mais seuls ceux ayant choisi les cartes avec la plus faible valeur et la plus forte pourront s'exprimer pour se mettre d'accord. Si durant le temps de négociation les joueurs sont encore en désaccord, le vote recommence. Ces opérations sont répétées jusqu'à ce que l'unanimité soit acquise ou que les joueurs ayant fait le minimum et le maximum se soient mis d'accord. Appuyez sur suivant pour valider ce mode de jeu.";
      case 'regle2':
          return "Le mode de jeu majorité relative correspond aux votes de l'estimation des tâches du backlog jusqu'à ce que l'unanimité soit acquise ou la majorité relative. C'est-à-dire que chacun, à leur tour, les joueurs vont voter avant la fin du temps imparti. Pour le premier tour de vote d'une tâche : À la fin, les cartes seront révélées, mais seuls ceux ayant choisi les cartes avec la plus faible valeur et la plus forte pourront s'exprimer pour se mettre d'accord. Si durant le temps de négociation les joueurs sont encore en désaccord, le vote recommence. Dans ce cas, l'estimation de la tâche correspondra à l'estimation la plus présente dans le choix parmi celles choisies par les joueurs. Appuyez sur suivant pour valider ce mode de jeu.";
      default:
          return descriptionNonDefinie;
  }
}


  


/**
 * Affiche la liste des tâches correspondant au bouton cliqué.
 *
 * @param {string} liste - L'ID de la liste de tâches à afficher.
 * @param {HTMLElement} bouton - L'élément bouton cliqué.
 */
function afficherTaches(liste, bouton) {
  /** @type {HTMLElement} backlogList - L'élément de la liste de tâches non validées. */
  var backlogList = document.getElementById('backlogList');
  /** @type {HTMLElement} backlogListvalide - L'élément de la liste de tâches validées. */
  var backlogListvalide = document.getElementById('backlogListvalide');

  // Masquer toutes les listes de tâches
  backlogList.style.display = 'none';
  backlogListvalide.style.display = 'none';

  // Retirer la classe "active" de tous les boutons
  /** @type {HTMLCollectionOf<Element>} boutons - Une collection d'éléments avec la classe "buttonbacklog". */
  var boutons = document.getElementsByClassName('buttonbacklog');
  for (var i = 0; i < boutons.length; i++) {
      boutons[i].classList.remove('active');
  }

  // Afficher la liste spécifiée
  document.getElementById(liste).style.display = 'block';
  bouton.classList.add('active');
}

