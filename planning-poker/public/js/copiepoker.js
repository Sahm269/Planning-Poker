
partieData.backlog = JSON.parse(partieData.backlog );//conversion du backlog en object
partieData.nomJoueur = JSON.parse(partieData.nomJoueur);// conversion du nom joueur en objet 

var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs
var premierTache = Object.keys(partieData.backlog)[0];
var estimation = '';
var index =1;
var indexJoueurActuel = 0;  // Initialisation à 0, le premier joueur à jouer
var etat = partieData.etatpartie;

document.getElementById('boutonRevoter').disabled = true;
document.getElementById('boutonNextTache').disabled = true;

console.log(ordreJoueurs)
console.log (partieData.nomJoueur)



// Initialisation du jeu 
mettreAJourAffichage();
onload=initialisation
function initialisation(){
  
    mettreAJourTacheDebattre();
    ecouteur();
}

//-------------------------------------fonction qui gere les tour du joueur ici on a utilisé lordrre de lobjet nomJoueur qui stocke les nom des joueurs et la carte jouée
function tourJoueur(nomJoueur, valeurCarte) {
    console.log(`Tour du joueur ${nomJoueur}. Carte jouée : ${valeurCarte}`);
    // Vérifier si c'est le tour du joueur actuel
    if (nomJoueur === ordreJoueurs[indexJoueurActuel]) {
        partieData.nomJoueur[nomJoueur] = valeurCarte;
      
        // Passer au joueur suivant
        indexJoueurActuel = (indexJoueurActuel + 1) % ordreJoueurs.length; 
        
        console.log(ordreJoueurs.length);
        console.log(indexJoueurActuel);
        mettreAJourAffichage();
   // Vérifier si tous les joueurs ont joué
    if (indexJoueurActuel === 0) {
        vote();
        return; 
    }
    } else {
        // C'est le tour d'un autre joueur, gérer le cas d'erreur ou afficher un message
        console.log("Ce n'est pas votre tour !");
    }

}

// -----------------------------------fonction qui met à jpur l'affichage du joueur qui va joueur en lui ajoutant une couleur à la classe active
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


function ecouteur() {
    var cartes = document.querySelectorAll('.carte');

    cartes.forEach(function(carte) {
        carte.addEventListener('click', function() {
            // Appel de la fonction tourJoueur avec le nom du joueur et la valeur de la carte
            tourJoueur(ordreJoueurs[indexJoueurActuel], carte.textContent);
            
        });
    });
}



/*function vote(){
// Fonction pour afficher toutes les cartes jouées
console.log("Votes terminés. Affichage des cartes jouées :");

    for (var joueur in partieData.nomJoueur) {
        var carteJouee = partieData.nomJoueur[joueur];
        console.log(`${joueur}: ${carteJouee}`);
       console.log('NOM : ',index)
       

       // Appeler la fonction chronometre pour chaque joueur pendant son tour
       //chronometre();

       // Récupérer l'élément span correspondant à la carte jouée du joueur
        var carteJoueeElement = document.getElementById('carteJouee'+index);
        index = index+1;
        console.log(carteJoueeElement)
    
        // Mettre à jour le contenu de la balise span
        mettreAJourCartesJouees();

}
afficheMinMax();

}*/

// Add this variable at the top of your script
var allPlayersVoted = false;

// Modify your vote() function
function vote() {
  console.log("Votes terminés. Affichage des cartes jouées :");

  for (var joueur in partieData.nomJoueur) {
    var carteJouee = partieData.nomJoueur[joueur];
    console.log(`${joueur}: ${carteJouee}`);
    console.log('NOM : ', index)

    var carteJoueeElement = document.getElementById('carteJouee' + index);
    index = index + 1;
    console.log(carteJoueeElement)

    mettreAJourCartesJouees();
  }

  afficheMinMax();

  // Set the flag to indicate that all players have voted
  allPlayersVoted = true;

  // Check if all players have voted before showing the Resultat div
  checkShowResultat();
}

// Add this function to check if all players have voted and show Resultat div
function checkShowResultat() {
  if (allPlayersVoted) {
    // Hide the "cartes" div
    document.getElementById('cartesDiv').style.display = 'none';

    // Show the "Resultat" div
    document.getElementById('resultatDiv').style.display = 'block';
  }
}


// --------------------------------------------------------------------------------function qui affiche le min et le max et traite le vote
function afficheMinMax() {
    var votes = partieData.nomJoueur;
    console.log(votes)
    // Convertir les valeurs en tableau
    var valeursVotes = Object.values(votes).map(Number);

    // Trouver le minimum et le maximum
    var minVote = Math.min(...valeursVotes);
    var maxVote = Math.max(...valeursVotes);

   // Initialisation des noms min et max à undefined
var nomMin, nomMax;

// Parcourir toutes les clés
for (var joueur in votes) {
    if (votes.hasOwnProperty(joueur)) {
        // Si le nomMin n'est pas défini ou si la valeur actuelle est inférieure à la valeur minimale actuelle
        if (nomMin === undefined || votes[joueur] < votes[nomMin]) {
            nomMin = joueur; // Mettre à jour le nomMin
        }

        // Si le nomMax n'est pas défini ou si la valeur actuelle est supérieure à la valeur maximale actuelle
        if (nomMax === undefined || votes[joueur] > votes[nomMax]) {
            nomMax = joueur; // Mettre à jour le nomMax
            console.log("nomMaw");
        }
    }
}

// Vérifier si tous les joueurs ont voté la même carte
var votesUniques = new Set(Object.values(partieData.nomJoueur));
var tousLesVotesSontIdentiques = votesUniques.size === 1;

// Si tous les votes sont identiques et la valeur est ? ou l'icône café, attribuer estimation
if (tousLesVotesSontIdentiques) {
    var valeurVote = Array.from(votesUniques)[0]; // Obtenir la valeur unique
    if (valeurVote === 'cafe') {
         estimation = '';
            enregistrer();
            alert("Pause café !!!")
        
    }
        
        // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
        console.log('Estimation attribuée:', estimation);
    }
    else{
        estimation = valeurVote;
        
        // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
        console.log('Estimation attribuée:', estimation);
    }


        // Sélectionner les boutons
        var boutonNextTache = document.querySelector('#boutonNextTache');
        var boutonRevoter = document.querySelector('#boutonRevoter');

        // Activer ou désactiver les boutons en fonction du consensus des votes
        boutonNextTache.disabled = !tousLesVotesSontIdentiques;
        boutonRevoter.disabled = tousLesVotesSontIdentiques;

    // Afficher les résultats dans un popup
       alert(`Voici les joueurs qui ont le droit de parler Minimum : ${minVote} par ${nomMin}\nMaximum : ${maxVote} par ${nomMax}`);
}




// ----------------------------------------------------------------------------------Fonction Tache suivante 

function nexttache(){
    tachevalidee();
    mettreAJourTacheDebattre()
    index=0;

      // show the "cartes" div
      document.getElementById('cartesDiv').style.display = 'block';

      // hide the "Resultat" div
      document.getElementById('resultatDiv').style.display = 'none';
    for (var joueur in partieData.nomJoueur) {
        if (partieData.nomJoueur.hasOwnProperty(joueur)) {
            partieData.nomJoueur[joueur] = ''; // Réinitialiser la carte jouée comme vide
            carteJouee = partieData.nomJoueur[joueur];
            console.log('joueur ', joueur ,' carte',carteJouee);
            mettreAJourCartesJouees();
            // Augmenter l'index pour le prochain joueur
            index++;}
        
  
}

 // Désactiver les boutons 
 document.getElementById('boutonRevoter').disabled = true;
 document.getElementById('boutonNextTache').disabled = true;
 
}

//-------------------------------------------------------------------------------------- Fonction pour mettre à jour l'affichage de la tâche à débattre
function mettreAJourTacheDebattre() {
    var tacheDebattreElement = document.getElementById('tacheDebattre');

    // Trouver la première tâche non encore débattue
    var tachesNonDebattues = Object.keys(partieData.backlog);
    var premierTache = tachesNonDebattues.length > 0 ? tachesNonDebattues[0] : null;

    console.log(premierTache);

    // Afficher la tâche à débattre dans l'interface
    tacheDebattreElement.textContent = premierTache !== null ? premierTache : "Aucune tâche restante";
}



//(------------------------------------------------------------------------------------------ fonction qui valide une tache 
function tachevalidee() {
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
        console.log('ekhtkghkyhrkth',etat);

    }
}



// ---------------------------------------------------------------------------------------fonction revoter 

function revoter(){
    if (document.getElementById('boutonRevoter').disabled === false){
        console.log('boutonactivé')
    }
    var indexJoueurActuel = 0;  
    var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs
    index = 0;

      // show the "cartes" div
      document.getElementById('cartesDiv').style.display = 'block';

      // hide the "Resultat" div
      document.getElementById('resultatDiv').style.display = 'none';

    for (var joueur in partieData.nomJoueur) {
        if (partieData.nomJoueur.hasOwnProperty(joueur)) {
            partieData.nomJoueur[joueur] = ''; // Réinitialiser la carte jouée comme vide
            carteJouee = partieData.nomJoueur[joueur];
            console.log('joueur ', joueur ,' carte',carteJouee);
            mettreAJourCartesJouees();
            index++;
        }
    }
}

//-----------------------------------------------------------------------------------------------Fonction Mise à jour le contenu des cartes jouées
function mettreAJourCartesJouees() {
    var carteJoueeElements = document.querySelectorAll('.carte-jouee-element');

    for (var i = 0; i < carteJoueeElements.length; i++) {
        var joueur = ordreJoueurs[i];
        var carteJoueeElement = carteJoueeElements[i];

        // Mise à jour le contenu de la carte jouée
        carteJoueeElement.textContent = partieData.nomJoueur[joueur];
    }
}



// fonction qui va quitter la partie et enregistrer et renvoyer l'utilisateur dans à la page menu 
function quitter(){
    enregistrer();

}
// function qui va mettre une pause de la partie et enregistre quand meme 
function pausecafe(){
    enregistrer();
    
}
function enregistrer() {
    var donneesAEnregistrer = {
        nomJoueur: partieData.nomJoueur,
        backlog: partieData.backlog,
        backlogRestantes: obtenirBacklog('backlogList'),
        backlogValidees: obtenirBacklog('backlogListvalide'),
        etatpartie:partieData.etatpartie,
        // Ajoutez d'autres propriétés au besoin
    };

    console.log(donneesAEnregistrer);

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


// chronometre a definir au debut une partie ;
function chronometre(){

    // Définir la durée du compte à rebours en secondes
    // Demander à l'utilisateur de choixir ???
    var tempsRestant = 60;

    // Fonction pour mettre à jour le compte à rebours
    function mettreAJourCompteRebours() {
        var minutes = Math.floor(tempsRestant / 60);
        var secondes = tempsRestant % 60;

        // Affichage du compte à rebours dans votre élément HTML
        document.getElementById('chronometre').innerText = minutes + 'm ' + secondes + 's';

        // Vérification du compte à rebour
        if (tempsRestant <= 0) {
            clearInterval(compteReboursInterval);
            document.getElementById('chronometre').innerText = 'Temps écoulé';
            // Ici du code à exécuter lorsque le temps est écoulé
        } else {
            tempsRestant--;
        }
    }

    // Fonction chronometre appele toutes les secondes pour mettre à jours le compte à rebour
    var compteReboursInterval = setInterval(mettreAJourCompteRebours, 1000);
}
