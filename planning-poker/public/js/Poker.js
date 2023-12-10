
partieData.backlog = JSON.parse(partieData.backlog );
partieData.nomJoueur = JSON.parse(partieData.nomJoueur);

var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs

//var taille = parseInt(partieData.nbjoueur) + 1; // Récupère l'ordre des joueurs
var indexJoueurActuel = 0;  // Initialisation à 0, le premier joueur à jouer
mettreAJourAffichage();
var statutVotes = {}; // Statut des votes
// Désactiver les boutons au début de la partie
document.getElementById('boutonRevoter').disabled = true;
document.getElementById('boutonNextTache').disabled = true;



console.log(ordreJoueurs)
console.log (partieData.nomJoueur)
onload=initialisation
function initialisation(){
    mettreAJourTacheDebattre()
    ecouteur();
}
function tourJoueur(nomJoueur, valeurCarte) {
    console.log(`Tour du joueur ${nomJoueur}. Carte jouée : ${valeurCarte}`);
    // Vérifier si c'est le tour du joueur actuel
    if (nomJoueur === ordreJoueurs[indexJoueurActuel]) {
        partieData.nomJoueur[nomJoueur] = valeurCarte;
      
        // Passer au joueur suivant
        indexJoueurActuel = (indexJoueurActuel + 1) % ordreJoueurs.length; 
        var arret =  
        console.log(ordreJoueurs.length);
        console.log(indexJoueurActuel);
        
        // Mettre à jour l'affichage, changer la couleur, etc.
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

function mettreAJourAffichage() {
    // Récupérez tous les éléments avec la classe nom-joueur
    var nomsJoueurs = document.querySelectorAll('.nom-joueur');

    // Parcourez tous les noms de joueurs
    nomsJoueurs.forEach(function(nomJoueur, index) {
        // Vérifiez si c'est le joueur actuel
        if (index === indexJoueurActuel) {
            // Ajoutez la classe active pour la couleur violette
            nomJoueur.classList.add('active');
        } else {
            // Supprimez la classe active s'il s'agit d'un autre joueur
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
var index = 1;
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
        carteJoueeElement.textContent = carteJouee;
}
afficheMinMax();

}
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

// Sélectionner les boutons
var boutonNextTache = document.querySelector('#boutonNextTache');
var boutonRevoter = document.querySelector('#boutonRevoter');

// Activer ou désactiver les boutons en fonction du consensus des votes
boutonNextTache.disabled = !tousLesVotesSontIdentiques;
boutonRevoter.disabled = tousLesVotesSontIdentiques;

    // Afficher les résultats dans un popup
       alert(`Voici les joueurs qui ont le droit de parler Minimum : ${minVote} par ${nomMin}\nMaximum : ${maxVote} par ${nomMax}`);
}






// Fonction pour mettre à jour l'affichage de la tâche à débattre
function mettreAJourTacheDebattre() {
    var tacheDebattreElement = document.getElementById('tacheDebattre'); 
    var premierTache = Object.keys(partieData.backlog)[0];
    console.log(premierTache);
    // Afficher la tâche à débattre dans l'interface
    tacheDebattreElement.textContent = premierTache;
}



function nexttache(){

if (document.getElementById('boutonNextTache').disabled === false){
    console.log('boutonactivé')
}
    
}

function revoter(){
    if (document.getElementById('boutonRevoter').disabled === false){
        console.log('boutonactivé')
    }
     var indexJoueurActuel = 0;  
    var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs

    // Réinitialiser les votes de chaque joueur
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
function ecouesouris(){

}
function chronometre(){

}