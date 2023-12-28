
partieData.backlog = JSON.parse(partieData.backlog );//conversion du backlog en object
partieData.nomJoueur = JSON.parse(partieData.nomJoueur);// conversion du nom joueur en objet 

var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs
var premierTache = Object.keys(partieData.backlog)[0];
var estimation = '';
var index =1;
var indexJoueurActuel = 0;  // Initialisation à 0, le premier joueur à jouer
var etat = partieData.etatpartie;
var allPlayersVoted = false;
var regleValue = partieData.regle;
var myPieChart;
var compteurVotes = 0;
var tempsRestant1 = 180;
var tempsRestant2 = 60;

/**
 * Classe de stratégie d'estimation de base.
 * @class
 */
class EstimationStrategy {
    /**
     * Méthode d'estimation par défaut, peut être remplacée par des sous-classes.
     * @param {Object} partieData - Les données de la partie en cours.
     */
    estimate(partieData) {
      // Implémentation par défaut, peut être remplacée par des sous-classes
    }
}

/**
 * Classe de stratégie d'estimation pour la règle 'strict'.
 * @extends EstimationStrategy
 * @class
 */
class StrictEstimationStrategy extends EstimationStrategy {
    /**
     * Méthode d'estimation pour la règle 'strict'.
     * @param {Object} partieData - Les données de la partie en cours.
     */
    estimate(partieData) {
        console.log('On est dans le mode strict.');
        
        // Vérifier si tous les joueurs ont voté la même carte
        var votesUniques = new Set(Object.values(partieData.nomJoueur));
        var tousLesVotesSontIdentiques = votesUniques.size === 1;

        // Sélectionner les boutons
        var boutonNextTache = document.querySelector('#boutonNextTache');
        var boutonRevoter = document.querySelector('#boutonRevoter');
        
        // Si tous les votes sont identiques et la valeur est ? ou l'icône café, attribuer estimation
        if (tousLesVotesSontIdentiques) {
            var valeurVote = Array.from(votesUniques)[0]; // Obtenir la valeur unique
            document.getElementById('cartesDiv').style.display = 'none';
            document.getElementById('estimation').style.display = 'block';
            document.getElementById('discussion').style.display = 'none';
            document.getElementById('cafe').style.display = 'none';
            document.getElementById('interrogation').style.display = 'none';
            document.getElementById('fin').style.display = 'none';
            document.getElementById('estimationmaj').style.display = 'none';
            document.getElementById('discussionmaj').style.display = 'none';

            // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
            console.log('Estimation attribuée:', estimation);
            estimation = valeurVote;
            
            boutonNextTache.disabled = false;
            boutonRevoter.disabled = true;
            boutonNextTache.classList.remove('bouton-desactive');
            boutonRevoter.classList.add('bouton-desactive');
        } else {
            document.getElementById('cartesDiv').style.display = 'none';
            document.getElementById('discussion').style.display = 'block';
            document.getElementById('estimation').style.display = 'none';
            document.getElementById('cafe').style.display = 'none';
            document.getElementById('interrogation').style.display = 'none';
            document.getElementById('estimationmaj').style.display = 'none';
            document.getElementById('discussionmaj').style.display = 'none';
            boutonNextTache.disabled = true;
            boutonRevoter.disabled = false;
            boutonNextTache.classList.add('bouton-desactive');
            boutonRevoter.classList.remove('bouton-desactive');
            chronometre2();
        }
    }
}

/**
 * Classe de stratégie d'estimation pour la règle 'majorite'.
 * @extends EstimationStrategy
 * @class
 */
class MajorityEstimationStrategy extends EstimationStrategy {
    /**
     * Méthode d'estimation pour la règle 'majorite'.
     * @param {Object} partieData - Les données de la partie en cours.
     */
    estimate(partieData) {
        if (compteurVotes > 1) {
            maxMajorite(partieData);
        } else {
            document.getElementById('cartesDiv').style.display = 'none';
            document.getElementById('discussion').style.display = 'block';
            document.getElementById('estimation').style.display = 'none';
            document.getElementById('cafe').style.display = 'none';
            document.getElementById('interrogation').style.display = 'none';
            document.getElementById('estimationmaj').style.display = 'none';
            document.getElementById('discussionmaj').style.display = 'none';
            boutonNextTache.disabled = true;
            boutonRevoter.disabled = false;
            boutonNextTache.classList.add('bouton-desactive');
            boutonRevoter.classList.remove('bouton-desactive');
            chronometre2();
        }
      
        console.log('On est dans le mode majorite.');
    }
}





// Initialisation du jeu 
mettreAJourAffichage();
document.getElementById('boutonRevoter').disabled = true;
document.getElementById('boutonNextTache').disabled = true;
onload=initialisation
function initialisation(){
    mettreAJourTacheDebattre();
    ecouteur();
}




/**
 * Estime une tâche en fonction de la règle spécifiée.
 *
 * @param {string} regleValue - La règle du jeu ('strict' ou 'majorite').
 * @param {Object} partieData - Les données de la partie en cours.
 */
function estimerTache(regleValue, partieData) {
    /** @type {EstimationStrategy} estimationStrategy - Stratégie d'estimation à utiliser. */
    var estimationStrategy;

    // Sélectionner la stratégie en fonction de la règle spécifiée
    if (regleValue === 'strict') {
        estimationStrategy = new StrictEstimationStrategy();
    } else if (regleValue === 'majorite') {
        estimationStrategy = new MajorityEstimationStrategy();
    } else {
        // Stratégie par défaut ou gestion d'erreur si nécessaire
        estimationStrategy = new StrictEstimationStrategy();
    }

    // Utiliser la stratégie pour effectuer l'estimation
    estimationStrategy.estimate(partieData);
}


/**
 * Gère le tour d'un joueur en enregistrant la carte jouée et passant au joueur suivant.
 *
 * @param {string} nomJoueur - Le nom du joueur dont c'est le tour.
 * @param {string} valeurCarte - La valeur de la carte jouée par le joueur.
 */
function tourJoueur(nomJoueur, valeurCarte) {
    console.log(`Tour du joueur ${nomJoueur}. Carte jouée : ${valeurCarte}`);

    if (nomJoueur === ordreJoueurs[indexJoueurActuel]) {
        partieData.nomJoueur[nomJoueur] = valeurCarte;

        // Rendre la carte visible pour le joueur actuel
        var joueurActuelElement = document.getElementById('joueur' + (indexJoueurActuel + 1));
        var carteJoueeElement = joueurActuelElement.querySelector('.carte-jouee');
        carteJoueeElement.style.visibility = 'visible';
        carteJoueeElement.classList.add('visible');

        // Passer au joueur suivant
        indexJoueurActuel = (indexJoueurActuel + 1) % ordreJoueurs.length;

        mettreAJourAffichage();

        // Vérifier si tous les joueurs ont joué
        if (indexJoueurActuel === 0) {
            var nomsJoueurs = document.querySelectorAll('.nom-joueur');
            nomsJoueurs.forEach(function(nomJoueur) {
                nomJoueur.classList.remove('active');
            });
            vote();

            console.log("Votes terminés. Affichage des cartes jouées :");
            return;
        }
    } else {
        // C'est le tour d'un autre joueur, gérer le cas d'erreur ou afficher un message
        console.log("Ce n'est pas votre tour !");
    }
}

/**
 * Met à jour l'affichage en ajoutant une classe "active" au joueur qui doit jouer.
 */
function mettreAJourAffichage() {
    var nomsJoueurs = document.querySelectorAll('.nom-joueur');

    nomsJoueurs.forEach(function(nomJoueur, index) {
        if (index === indexJoueurActuel) {
            nomJoueur.classList.add('active');
        } else {
            nomJoueur.classList.remove('active');
        }
    });
}



/**
 * Ajoute des écouteurs d'événements aux cartes pour gérer les clics des joueurs.
 * Réinitialise également le temps restant.
 */
function ecouteur() {
    /**
     * @type {NodeListOf<Element>} cartes - Liste des éléments HTML représentant les cartes.
     */
    var cartes = document.querySelectorAll('.carte');

    /**
     * @type {number} tempsRestant2 - Temps restant pour le joueur actuel.
     */
    tempsRestant2 = 60;

    // Ajouter un écouteur d'événements à chaque carte
    cartes.forEach(function(carte) {
        carte.addEventListener('click', function() {
            // Appel de la fonction tourJoueur avec le nom du joueur et la valeur de la carte
            tourJoueur(ordreJoueurs[indexJoueurActuel], carte.textContent);
        });
    });
}

/**
 * Termine le processus de vote en affichant les cartes jouées par chaque joueur.
 * Met également à jour les cartes jouées à l'écran et affiche le résultat.
 */
function vote() {
    console.log("Votes terminés. Affichage des cartes jouées :");
  
    // Parcours chaque joueur et affiche la carte jouée
    for (var joueur in partieData.nomJoueur) {
      var carteJouee = partieData.nomJoueur[joueur];
      console.log(`${joueur}: ${carteJouee}`);
  
      // Obtient l'élément de la carte jouée à l'aide de l'index
      var carteJoueeElement = document.getElementById('carteJouee' + index);
      index = index + 1;
      console.log(carteJoueeElement);
  
      // Met à jour l'affichage des cartes jouées à l'écran
      mettreAJourCartesJouees();
    }
  
    // Incrémente le compteur de votes
    compteurVotes++;
    console.log(' compteurVotes ',  compteurVotes);
  
    // Affiche les valeurs minimales et maximales des votes
    afficheMinMax();
  
    // Définit le drapeau pour indiquer que tous les joueurs ont voté
    allPlayersVoted = true;
  
    // Vérifie si tous les joueurs ont voté avant d'afficher la div des résultats
  }



/**
 * Calcule la carte la plus jouée en fonction des votes des joueurs.
 * Affiche le résultat sur un diagramme à secteurs.
 * Si une majorité se dégage, attribue cette carte comme estimation.
 * Si aucune majorité, affiche un message indiquant qu'aucune carte n'a été jouée plus fréquemment.
 *
 * @param {Object} partieData - Les données de la partie, contenant les votes des joueurs.
 */
  
function maxMajorite(partieData) {
    var carteOccurrences = {};

    // Compter les occurrences de chaque carte
    for (var joueur in partieData.nomJoueur) {
        var carteJouee = partieData.nomJoueur[joueur];

        // Ignorer les cartes '?' et 'cafe'
        if (carteJouee !== '?' && carteJouee !== 'cafe') {
            // Initialiser le compteur de la carte si elle n'existe pas encore
            if (!carteOccurrences[carteJouee]) {
                carteOccurrences[carteJouee] = 1;
            } else {
                // Incrémenter le compteur si la carte a déjà été rencontrée
                carteOccurrences[carteJouee]++;
            }
        }
    }

    // Créer un tableau pour les libellés et les données du diagramme
    var labels = [];
    var data = [];

    // Remplir le tableau avec les données des occurrences
    for (var carte in carteOccurrences) {
        labels.push(carte);
        data.push(carteOccurrences[carte]);
    }
    // Récupérer la référence du canevas
    var pieChartCanvas = document.getElementById('pieChart');

    // Vérifier si le graphique existe déjà
    if (myPieChart) {
        // Détruire le graphique existant
        window.myPieChart.destroy();
    }



    // Créer le diagramme avec Chart.js
    var ctx = document.getElementById('pieChart').getContext('2d');
     myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'purple',
                    'yellow',
                    'orange'
                   
                ]
            }]
        }
    });

  // Trouver la carte la plus jouée
  var carteMaxOccurrences;
  var maxOccurrences = 0;

  // Parcourir les occurrences pour trouver la carte la plus jouée
  for (var carte in carteOccurrences) {
      if (carteOccurrences[carte] > maxOccurrences) {
          maxOccurrences = carteOccurrences[carte];
          carteMaxOccurrences = carte;
      }
  }


    // Vérifier s'il y a une majorité
    if (maxOccurrences > 1) {
        console.log(`La carte la plus jouée est : ${carteMaxOccurrences} (${maxOccurrences} fois)`);
        estimation = carteMaxOccurrences;

            document.getElementById('cartesDiv').style.display = 'none';
            document.getElementById('discussion').style.display = 'none';
            document.getElementById('discussionmaj').style.display = 'none';
            document.getElementById('estimation').style.display = 'none';
            document.getElementById('estimationmaj').style.display = 'block';
            document.getElementById('cafe').style.display = 'none';
            document.getElementById('interrogation').style.display = 'none';
            
            boutonNextTache.disabled = false;
            boutonRevoter.disabled = true;
            boutonNextTache.classList.remove('bouton-desactive');
            boutonRevoter.classList.add('bouton-desactive');
          
  
    } else {
            document.getElementById('cartesDiv').style.display = 'none';
            document.getElementById('discussion').style.display = 'none';
            document.getElementById('estimation').style.display = 'none';
            document.getElementById('estimationmaj').style.display = 'none';
            document.getElementById('discussionmaj').style.display = 'block';
            document.getElementById('cafe').style.display = 'none';
            document.getElementById('interrogation').style.display = 'none';
            boutonNextTache.disabled = true;
            boutonRevoter.disabled = false;
            boutonNextTache.classList.add('bouton-desactive');
            boutonRevoter.classList.remove('bouton-desactive');
            chronometre2();
        console.log("Pas de majorité, toutes les cartes ont été jouées le même nombre de fois.");
       
    }

}




/**
 * Affiche le résultat de l'estimation en fonction des votes des joueurs.
 * Vérifie s'il y a un consensus ou si la valeur est '?', 'cafe' ou autre.
 * Gère les différentes situations en modifiant l'affichage sur l'interface utilisateur.
 */

// --------------------------------------------------------------------------------function qui affiche le min et le max et traite le vote
function afficheMinMax() {
    estimerTache(regleValue, partieData);
    var votes = partieData.nomJoueur;
    console.log(votes) 

// Vérifier si tous les joueurs ont voté la même carte
var votesUniques = new Set(Object.values(partieData.nomJoueur));
var tousLesVotesSontIdentiques = votesUniques.size === 1;

// Sélectionner les boutons
var boutonNextTache = document.querySelector('#boutonNextTache');
var boutonRevoter = document.querySelector('#boutonRevoter');
// Si tous les votes sont identiques et la valeur est ? ou l'icône café, attribuer estimation
if (tousLesVotesSontIdentiques) {
    var valeurVote = Array.from(votesUniques)[0]; // Obtenir la valeur unique
    if (valeurVote === 'cafe') {
         estimation = '';
            enregistrer();
            alert("Pause café !!!")
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'block';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('fin').style.display = 'none';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';

        boutonNextTache.disabled = true;
        boutonRevoter.disabled = false;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.remove('bouton-desactive');
        
    }
    else if(valeurVote === '?'){
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'block';
        document.getElementById('fin').style.display = 'none';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';
        boutonNextTache.disabled = true;
        boutonRevoter.disabled = false;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.remove('bouton-desactive');
      
    }
    else if( partieData.etatpartie === "finie")  {
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('fin').style.display = 'block';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';
        document.getElementById('boutonRevoter').disabled = true;
        document.getElementById('boutonNextTache').disabled = true;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.add('bouton-desactive');
    } else{

    document.getElementById('cartesDiv').style.display = 'none';
    document.getElementById('estimation').style.display = 'block';
    document.getElementById('discussion').style.display = 'none';
    document.getElementById('cafe').style.display = 'none';
    document.getElementById('interrogation').style.display = 'none';
    document.getElementById('fin').style.display = 'none';
    document.getElementById('estimationmaj').style.display = 'none';
    document.getElementById('discussionmaj').style.display = 'none';

  
    // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
    console.log('Estimation attribuée:', estimation);
    estimation = valeurVote;
    
    // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
    console.log('Estimation attribuée:', estimation);
    boutonNextTache.disabled = false;
    boutonRevoter.disabled = true;
    boutonNextTache.classList.remove('bouton-desactive');
    boutonRevoter.classList.add('bouton-desactive');
      
    }
       
    }
    
    }
  
  



 

/**
 * Fonction appelée pour passer à la tâche suivante.
 * Met à jour l'affichage, valide la tâche en cours, et prépare le débat pour la prochaine tâche.
 * Affiche les cartes des joueurs pour la nouvelle tâche et réinitialise les cartes jouées.
 * Désactive les boutons de revote et de passage à la tâche suivante.
 */
function nexttache(){
    mettreAJourAffichage();
    tachevalidee();
    mettreAJourTacheDebattre()
    document.getElementById('boutonNextTache').classList.add('bouton-clique');
    index=0;
    
    // on rend de nouveau les cartes invisible
    var joueursElements = document.querySelectorAll('.joueur');
    joueursElements.forEach(function (joueurElement) {
        var carteJoueeElement = joueurElement.querySelector('.carte-jouee');
       carteJoueeElement.style.visibility = 'hidden';
       carteJoueeElement.classList.remove('visible');
       
    });

    if  (partieData.etatpartie  == "finie"){
        document.getElementById('fin').style.display = 'block';
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display ='none';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';
        enregistrer();
       
       
        

    }

    else  {
        document.getElementById('cartesDiv').style.display = 'block';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('fin').style.display = 'none';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';
    }

    


    for (var joueur in partieData.nomJoueur) {
        if (partieData.nomJoueur.hasOwnProperty(joueur)) {
            partieData.nomJoueur[joueur] = ''; // Réinitialise la carte jouée comme vide
            carteJouee = partieData.nomJoueur[joueur];
            console.log('joueur ', joueur ,' carte',carteJouee);
            mettreAJourCartesJouees();
            index++;}
        
  
}

 // Désactiver les boutons 
 document.getElementById('boutonRevoter').disabled = true;
 document.getElementById('boutonNextTache').disabled = true;
 boutonNextTache.classList.add('bouton-desactive');
 boutonRevoter.classList.add('bouton-desactive');
 
}


/**
 * Fonction pour mettre à jour l'affichage de la tâche à débattre.
 * Trouve la première tâche non encore débattue dans le backlog,
 * puis affiche cette tâche dans l'interface. Si toutes les tâches ont été débattues,
 * met à jour l'état de la partie à "finie".
 */
function mettreAJourTacheDebattre() {
    var tacheDebattreElement = document.getElementById('tacheDebattre');
    // Trouver la première tâche non encore débattue
    var tachesNonDebattues = Object.keys(partieData.backlog);
    var premierTache = tachesNonDebattues.length > 0 ? tachesNonDebattues[0] : null;

    console.log(premierTache);
    
    // Afficher la tâche à débattre dans l'interface
    if (premierTache !== null) {
        tacheDebattreElement.textContent = premierTache;
    } else {
        tacheDebattreElement.textContent = "Aucune tâche restante";
        partieData.etatpartie = "finie";
        etat = partieData.etatpartie;
       
        
    }

}

/**
 * Fonction qui valide une tâche du backlog.
 * Cette fonction met à jour l'estimation de la tâche actuelle dans l'objet partieData.backlog,
 * la supprime de la liste des tâches restantes, l'ajoute à la liste des tâches validées,
 * puis met à jour la tâche à débattre pour la prochaine tâche restante.
 * Si aucune tâche restante n'est disponible, elle met à jour l'état de la partie à "finie"
 * et affiche le contenu approprié.
 */

function tachevalidee() {
    compteurVotes=0;
    var tacheDebattreElement = document.getElementById('tacheDebattre');
    var tacheValideeListe = document.getElementById('backlogListvalide');
    var tacheRestanteListe = document.getElementById('backlogList');

    var tacheActuelle = tacheDebattreElement.textContent;
    partieData.backlog[tacheActuelle]=estimation;
    estimation = partieData.backlog[tacheActuelle];

    // Supprimer la tâche actuelle de l'objet partieData.backlog
    delete partieData.backlog[tacheActuelle];

    // Ajouter la tâche validée à la liste des tâches validées
    var nouvelleTacheValidee = document.createElement('li');
    nouvelleTacheValidee.textContent = `${tacheActuelle} : ${estimation}`;
    tacheValideeListe.appendChild(nouvelleTacheValidee);

    // Supprimer la tâche actuelle de la liste des tâches restantes
    var tacheActuelleElement = Array.from(tacheRestanteListe.children).find(element => element.textContent.includes(tacheActuelle));
    if (tacheActuelleElement) {
        tacheRestanteListe.removeChild(tacheActuelleElement);
    }

    // Mettre à jour la tâche à débattre pour la prochaine tâche restante
    var prochaineTacheRestante = tacheRestanteListe.firstChild;
    if (prochaineTacheRestante) {
        tacheDebattreElement.textContent = prochaineTacheRestante.textContent.split(':')[0].trim();
    } else {
        tacheDebattreElement.textContent = "Aucune tâche restante";
        partieData.etatpartie = "finie";
        etat = partieData.etatpartie;
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('fin').style.display = 'block';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';
        document.getElementById('boutonRevoter').disabled = true;
        document.getElementById('boutonNextTache').disabled = true;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.add('bouton-desactive');


        

    }
}

/**
 * Fonction qui permet aux joueurs de revoter pour la tâche actuelle.
 * Elle met à jour l'affichage, réactive les cartes des joueurs pour permettre un nouveau vote,
 * et réinitialise les cartes jouées par les joueurs. Elle rend également visible les cartes
 * pour les joueurs actuels, réinitialise l'index du joueur actuel, et affiche l'interface
 * de vote.
 */
function revoter(){
    mettreAJourAffichage();
    if (document.getElementById('boutonRevoter').disabled === false){
        document.getElementById('boutonRevoter').classList.add('bouton-clique');
       
        // on rend de nouveau invisible les cartes 
        var joueursElements = document.querySelectorAll('.joueur');
        joueursElements.forEach(function (joueurElement) {
            var carteJoueeElement = joueurElement.querySelector('.carte-jouee');
            carteJoueeElement.style.visibility = 'hidden';
            carteJoueeElement.classList.remove('visible');
        });
    }
        index = 0;
        document.getElementById('cartesDiv').style.display = 'block';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('estimationmaj').style.display = 'none';
        document.getElementById('discussionmaj').style.display = 'none';

    for (var joueur in partieData.nomJoueur) {
        if (partieData.nomJoueur.hasOwnProperty(joueur)) {
            partieData.nomJoueur[joueur] = ''; // Réinitialiser la carte jouée comme vide
            carteJouee = partieData.nomJoueur[joueur];
            console.log('joueur ', joueur ,' carte',carteJouee);
            mettreAJourCartesJouees();
            index++;
        }
    }
 boutonNextTache.classList.add('bouton-desactive');
 boutonRevoter.classList.add('bouton-desactive');
}

/**
 * Fonction qui met à jour le contenu des cartes jouées par les joueurs dans l'interface.
 * Elle récupère les éléments HTML correspondant aux cartes jouées et met à jour leur contenu
 * avec les valeurs des cartes jouées par chaque joueur.
 */
function mettreAJourCartesJouees() {
    var carteJoueeElements = document.querySelectorAll('.carte-jouee-element');

    for (var i = 0; i < carteJoueeElements.length; i++) {
        var joueur = ordreJoueurs[i];
        var carteJoueeElement = carteJoueeElements[i];

        // Mise à jour le contenu de la carte jouée
        carteJoueeElement.textContent = partieData.nomJoueur[joueur];
    }
}




/**
 * Fonction qui enregistre l'état actuel du jeu.
 * Cette fonction peut être utilisée, par exemple, pour sauvegarder la partie avant une pause café du planning poker.
 */
function pausecafe(){
    enregistrer();
    
}


/**
 * Fonction qui enregistre l'état actuel de la partie.
 * Elle envoie une requête AJAX pour sauvegarder les données de la partie du joueur sur le serveur.
 * @function
 * @throws {Error} Si la requête AJAX échoue.
 * @returns {void}
 */
function enregistrer() {
    partieData.tachevalide =  obtenirBacklog('backlogListvalide');
    partieData.tacherestante = obtenirBacklog('backlogList');
    var donneesAEnregistrer = {
        nomJoueur: partieData.nomJoueur,
        backlog: partieData.backlog,
        backlogList: partieData.tacherestante,
        backlogListvalide: partieData.tachevalide,
        etatpartie: partieData.etatpartie,
        partie_id: partieData.id  
    };
    console.log(donneesAEnregistrer)
    fetch('/enregistrer-partie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(donneesAEnregistrer)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        
    })
    .catch(error => console.error('Erreur lors de la requête AJAX:', error));
}




// Fonction pour obtenir les backlogs des tâches restantes ou validées
function obtenirBacklog(idListe) {

    var backlogListe = document.getElementById(idListe);
    var backlog = {};

    Array.from(backlogListe.children).forEach(function (element) {
        var [tache, estimation] = element.textContent.split(':').map(item => item.trim());
        backlog[tache] = estimation;
    });

    return backlog;
}
//module.exports = obtenirBacklog;

/**
 * Fonction qui obtient les backlogs des tâches restantes ou validées à partir d'une liste HTML.
 * @function
 * @param {string} idListe - L'ID de l'élément HTML de la liste des tâches (backlog).
 * @throws {Error} Si la liste avec l'ID spécifié n'est pas trouvée.
 * @returns {Object.<string, string>} Un objet représentant le backlog avec les tâches comme clés et les estimations comme valeurs.
 */
function telechargerbacklog(){
    enregistrer()
    var donneesBacklog = {
        backlogListvalide: partieData.tachevalide,
        NomProjet: partieData.nom_projet
        
    };
    var blob = new Blob([JSON.stringify(donneesBacklog)], { type: 'application/json' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'backlog.json'; // Nom du fichier téléchargé
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);


}


/**
 * Fonction qui enregistre la partie, crée un fichier JSON, et déclenche le téléchargement.
 * @function
 * @throws {Error} Si la création de l'objet Blob échoue.
 */
function telechargerJson() {
    alert("Votre partie sera enregistrée et téléchargée en format JSON");

    // Enregistrez la partie
    enregistrer();

    var donneesAEnregistrer = {
        nomJoueur: partieData.nomJoueur,
        backlog: partieData.backlog,
        backlogList: partieData.tacherestante,
        backlogListvalide: partieData.tachevalide,
        etatpartie: partieData.etatpartie,
        partie_id: partieData.id  
    };
    var blob = new Blob([JSON.stringify(donneesAEnregistrer)], { type: 'application/json' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'partie.json'; // Nom du fichier téléchargé
    document.body.appendChild(a);
    a.click();

    // Retirez le lien de l'élément body
    document.body.removeChild(a);

  

 
}



function quitter() {
    // Demandez à l'utilisateur s'il veut vraiment quitter la partie
    var confirmation = confirm("Vous allez quitter cette partie. Êtes-vous sûr(e) de vouloir continuer?");

    // Si l'utilisateur confirme, enregistrez la partie et redirigez
    if (confirmation) {
        enregistrer();
        console.log(partieData.tachevalide)
        window.location.href = '/profile';
    }
  
}


function nouvellepartie() {
    window.location.href = '/menu';
}





//-------------------------------------------------Gestion des Chronometre
document.addEventListener('DOMContentLoaded', function () {
    chronometre();
});

var compteReboursInterval;
var indexJoueurChrono=1;


function chronometre() {
    // Réinitialiser le temps restant
    var tempsRestant = 60;

    // Fonction pour mettre à jour le compte à rebours
    function mettreAJourCompteRebours() {
        var minutes = Math.floor(tempsRestant / 60);
        var secondes = tempsRestant % 60;

        // Affichage du compte à rebours dans votre élément HTML
        document.getElementById('chronometre').innerText = minutes + 'm ' + secondes + 's';

        // Vérification du compte à rebours
        if (tempsRestant <= 0) {
            clearInterval(compteReboursInterval);
            tourJoueur(ordreJoueurs[indexJoueurActuel], '?');
            document.getElementById('chronometre').innerText = 'Temps écoulé';
            console.log(indexJoueurChrono);
            console.log(ordreJoueurs.length);
            //indexJoueurChrono++;
           if (indexJoueurActuel !== 0){
               chronometre();
           }
            

        } else {
            tempsRestant--;
        }
    }

    // Effacer l'ancien intervalle s'il existe
    clearInterval(compteReboursInterval);

    // Définir le nouvel intervalle
    compteReboursInterval = setInterval(mettreAJourCompteRebours, 1000);

    // Retourner l'identifiant de l'intervalle
    return compteReboursInterval;
}

// Gestionnaire d'événements à chaque div de carte
for (let i = 0; i <= 12; i++) {
    var carteDiv = document.getElementById('carte' + i);
    carteDiv.addEventListener('click', function() {
        clearInterval(compteReboursInterval);
        if (indexJoueurChrono==ordreJoueurs.length){
        }
        else{
            chronometre();
            indexJoueurChrono++;


        }
    });
}

// Fonction pour réinitialiser les variables du chronomètre
function reinitialiserChronometre() {
    indexJoueurChrono= 1;
    chronometre();
}

// Gestionnaire d'événements pour le boutonNextTache
document.getElementById('boutonNextTache').addEventListener('click', function() {
    if (partieData.etatpartie !== "finie"){
    reinitialiserChronometre();}
    
});

document.getElementById('boutonRevoter').addEventListener('click', function() {
    reinitialiserChronometre();
    
});

///////////////
var compteReboursInterval2;
function chronometre2() {
    // Réinitialiser le temps restant
    var tempsRestant2 = 180;

    // Fonction pour mettre à jour le compte à rebours
    function mettreAJourCompteRebours2() {
        var minutes2 = Math.floor(tempsRestant2 / 60);
        var secondes2 = tempsRestant2 % 60;

        // Affichage du compte à rebours dans votre élément HTML
        document.getElementById('chronometrevote').innerText = minutes2 + 'm ' + secondes2 + 's';

        // Vérification du compte à rebours
        if (tempsRestant2 <= 0) {
            clearInterval(compteReboursInterval2);
            document.getElementById('chronometrevote').innerText = 'Temps écoulé';

        } else {
            tempsRestant2--;
        }
    }

    clearInterval(compteReboursInterval2);
    compteReboursInterval2 = setInterval(mettreAJourCompteRebours2, 1000);

    // Retourner l'identifiant de l'intervalle
    return compteReboursInterval2;
}




















 