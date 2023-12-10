
//Voir si il faut les passer en var global avec stockage locale de la même manière que dans comme dans Poker avec global.js
partieData.backlog = JSON.parse(partieData.backlog );
partieData.nomJoueur = JSON.parse(partieData.nomJoueur);

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

// Initialisation du nombre de joueur qui vont choisir la carte café
var nbJouerPauseCafe =0;

function tourJoueur(nomJoueur, valeurCarte) {
    console.log(`Tour du joueur ${nomJoueur}. Carte jouée : ${valeurCarte}`);
    // Vérifier si c'est le tour du joueur actuel
    if (nomJoueur === ordreJoueurs[indexJoueurActuel]) {
        partieData.nomJoueur[nomJoueur] = valeurCarte;
      
        // Appeler la fonction chronometre pour chaque joueur pendant son tour
        chronometre();

        //Verifier si la carte jouer est la carte café
        if (valeurCarte==="carte12"){
            nbJouerPauseCafe++;
            if(nbJouerPauseCafe===ordreJoueurs.length){
                // Enregistrer l'état de la partie
                enregistrer();
                alert("Pause café !!!")
            }
        }

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

    //ecouteur sur le bouton quitter
    var boutonQuitter = document.getElementById('boutonQuitter');
    boutonQuitter.addEventListener('click', quitter);
}



function vote(){
// Fonction pour afficher toutes les cartes jouées
console.log("Votes terminés. Affichage des cartes jouées :");

    for (var joueur in partieData.nomJoueur) {
        var carteJouee = partieData.nomJoueur[joueur];
        console.log(`${joueur}: ${carteJouee}`);
        console.log('NOM : ',index)
       
       // Récupérer l'élément span correspondant à la carte jouée du joueur
        var carteJoueeElement = document.getElementById('carteJouee'+index);
        index = index+1;
        console.log(carteJoueeElement)
    
        // Mettre à jour le contenu de la balise span
        mettreAJourCartesJouees();

}
afficheMinMax();

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
    if (valeurVote === '?' || valeurVote === 'cafe') {
         estimation = valeurVote;
        
        // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
        console.log('Estimation attribuée:', estimation);
    }
    else{
        estimation = valeurVote;
        
        // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
        console.log('Estimation attribuée:', estimation);
    }
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

    for (var joueur in partieData.nomJoueur) {
        if (partieData.nomJoueur.hasOwnProperty(joueur)) {
            partieData.nomJoueur[joueur] = ''; // Réinitialiser la carte jouée comme vide
            carteJouee = partieData.nomJoueur[joueur];

              
       // Récupérer l'élément span correspondant à la carte jouée du joueur
        var carteJoueeElement = document.getElementById('carteJouee'+index);
        index = index+1;
        console.log(carteJoueeElement)
    
        // Mettre à jour le contenu de la balise span
        carteJoueeElement.textContent = carteJouee;
        }
    }




    // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
    mettreAJourAffichage(); // Vous devez implémenter cette fonction pour mettre à jour l'affichage
    
}
function tachevalidee(){

}
function quitter(){

}
function enregistrer(){

}

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

/*
Des qu'on clic sur reprendre partie

// Récupérer les données sauvegardées du stockage local
var partieSauvegarde = localStorage.getItem('etatPartie');

// Analyser les données sauvegardées
var partieRestaure = JSON.parse(partieSauvegarde);

// Maintenant, etatPartieRestaure contient les données sauvegardées
console.log(partieRestaure);

//Cas d'eereur si partieSauvegard ==null ou ==undifinied
afficher aucune partie à reprendre

*/