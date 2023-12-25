
partieData.backlog = JSON.parse(partieData.backlog );//conversion du backlog en object
partieData.nomJoueur = JSON.parse(partieData.nomJoueur);// conversion du nom joueur en objet 

var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs
var premierTache = Object.keys(partieData.backlog)[0];
var estimation = '';
var index =1;
var indexJoueurActuel = 0;  // Initialisation à 0, le premier joueur à jouer
var etat = partieData.etatpartie;

var tempsRestant1 = 180;
var tempsRestant2 = 60;

document.getElementById('boutonRevoter').disabled = true;
document.getElementById('boutonNextTache').disabled = true;

console.log(ordreJoueurs)
console.log (partieData.nomJoueur)



// Initialisation du jeu 
mettreAJourAffichage();
onload=initialisation
function initialisation(){
    tempsRestant2 = 60;
    mettreAJourTacheDebattre();
    ecouteur();
}

//-------------------------------------fonction qui gere les tour du joueur ici on a utilisé lordrre de lobjet nomJoueur qui stocke les nom des joueurs et la carte jouée
function tourJoueur(nomJoueur, valeurCarte) {
    console.log(`Tour du joueur ${nomJoueur}. Carte jouée : ${valeurCarte}`);
    // Vérifier si c'est le tour du joueur actuel
    if (nomJoueur === ordreJoueurs[indexJoueurActuel]) {
        //chronometre2();
        partieData.nomJoueur[nomJoueur] = valeurCarte;
      
        // Passer au joueur suivant
        indexJoueurActuel = (indexJoueurActuel + 1) % ordreJoueurs.length; 
        
        console.log(ordreJoueurs.length);
        console.log(indexJoueurActuel);
        mettreAJourAffichage();
   // Vérifier si tous les joueurs ont joué
    if (indexJoueurActuel === 0) {
        vote();
        console.log("Votes terminés. Affichage des cartes jouées :");

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
    tempsRestant2 = 60;
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
            console.log("nomMax");
        }
    }


    

    // Après avoir trouvé le min et le max, ajoutez la classe aux éléments correspondants
    var elementMin = document.getElementById('joueur' + (nomMin + 1));
    var elementMax = document.getElementById('joueur' + (nomMax + 1));

 // Ajoutez la classe seulement si les éléments existent
 if (elementMin) {
     elementMin.classList.add('joueur-special');
 }

 if (elementMax) {
     elementMax.classList.add('joueur-special');
 }
}
 

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
        document.getElementById('boutonRevoter').disabled = true;
        document.getElementById('boutonNextTache').disabled = true;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.add('bouton-desactive');
    }
        else {
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'block';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('fin').style.display = 'none';

      
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
    else{
       
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('discussion').style.display = 'block';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        boutonNextTache.disabled = true;
        boutonRevoter.disabled = false;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.remove('bouton-desactive');
    
    }
  

      

  
}




// ----------------------------------------------------------------------------------Fonction Tache suivante 

function nexttache(){
  
    tachevalidee();
    mettreAJourTacheDebattre()
    document.getElementById('boutonNextTache').classList.add('bouton-clique');
    index=0;
if  (partieData.etatpartie !== "finie"){
    document.getElementById('cartesDiv').style.display = 'block';
    document.getElementById('estimation').style.display = 'none';
    document.getElementById('discussion').style.display = 'none';
    document.getElementById('cafe').style.display = 'none';
    document.getElementById('interrogation').style.display = 'none';
    document.getElementById('fin').style.display = 'none';
}

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
 boutonNextTache.classList.add('bouton-desactive');
 boutonRevoter.classList.add('bouton-desactive');
 
}

//-------------------------------------------------------------------------------------- Fonction pour mettre à jour l'affichage de la tâche à débattre
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
        document.getElementById('cartesDiv').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';
        document.getElementById('fin').style.display = 'block';
        document.getElementById('boutonRevoter').disabled = true;
        document.getElementById('boutonNextTache').disabled = true;
        boutonNextTache.classList.add('bouton-desactive');
        boutonRevoter.classList.add('bouton-desactive');


        

    }
}



// ---------------------------------------------------------------------------------------fonction revoter 

function revoter(){
    if (document.getElementById('boutonRevoter').disabled === false){
        console.log('boutonactivé')
        document.getElementById('boutonRevoter').classList.add('bouton-clique');
    }
    var indexJoueurActuel = 0;  
    var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs
        index = 0;
        document.getElementById('cartesDiv').style.display = 'block';
        document.getElementById('discussion').style.display = 'none';
        document.getElementById('estimation').style.display = 'none';
        document.getElementById('cafe').style.display = 'none';
        document.getElementById('interrogation').style.display = 'none';

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




function quitter() {
    alert("Action quitter");
    enregistrer();
    fermerPopup('popupFin');
    window.location.href = '//profile.blade.php';
}

function nouvellePartie() {
    alert("Action créer une nouvelle partie");
    enregistrer();
    // Rediriger vers menu
    fermerPopup('popupFin');
    window.location.href = '//menu.blade.php';
}
// function qui va mettre une pause de la partie et enregistre quand meme 
function pausecafe(){
    enregistrer();
    
}


function telechargerJson() {
    alert("Action télécharger le JSON");

    // Créer un lien de données (data URI) avec les données JSON encodées
    var lienTelechargement = document.createElement("a");
    lienTelechargement.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(partieData.backlog);
    lienTelechargement.download = "backlog.json"; // Nom du fichier à télécharger

    // Ajouter le lien à la page et déclencher un clic
    document.body.appendChild(lienTelechargement);
    lienTelechargement.click();

    // Supprimer le lien après le téléchargement
    document.body.removeChild(lienTelechargement);

    enregistrer();

    fermerPopup('popupFin');

    //Rediriger vers une page ou faire un nouveau popup
}
// Fonction pour enregistrer la partie
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


// chronometre a definir au debut une partie ;
/*function chronometre(){

    // Définir la durée du compte à rebours en secondes
    // Demander à l'utilisateur de choixir ???
    var tempsRestant = 180;

    // Fonction pour mettre à jour le compte à rebours
    function mettreAJourCompteRebours() {
        var minutes = Math.floor(tempsRestant / 60);
        var secondes = tempsRestant % 60;

        // Affichage du compte à rebours dans votre élément HTML
        document.getElementById('chronometrevote').innerText = minutes + 'm ' + secondes + 's';

        // Vérification du compte à rebour
        if (tempsRestant <= 0) {
            clearInterval(compteReboursInterval);
            document.getElementById('chronometrevote').innerText = 'Temps écoulé';
            // Ici du code à exécuter lorsque le temps est écoulé
        } else {
            tempsRestant--;
        }
    }

    // Fonction chronometre appele toutes les secondes pour mettre à jours le compte à rebour
    var compteReboursInterval = setInterval(mettreAJourCompteRebours, 1000);
}*/


/*/ chronometre a definir au debut une partie ;
function chronometre2(){

    // Définir la durée du compte à rebours en secondes
    // Demander à l'utilisateur de choixir ???
    tempsRestant2 = 60;

    // Fonction pour mettre à jour le compte à rebours
    function mettreAJourCompteRebours2() {
        var minutes = Math.floor(tempsRestant2 / 60);
        var secondes = tempsRestant2 % 60;

        // Affichage du compte à rebours dans votre élément HTML
        document.getElementById('chronometre').innerText = minutes + 'm ' + secondes + 's';

        // Vérification du compte à rebour
        if (tempsRestant2 <= 0) {
            clearInterval(compteReboursInterval);
            document.getElementById('chronometre').innerText = 'Temps écoulé';
            // Ici du code à exécuter lorsque le temps est écoulé
        } else {
            tempsRestant2--;
        }
    }

    // Fonction chronometre appele toutes les secondes pour mettre à jours le compte à rebour
    var compteReboursInterval = setInterval(mettreAJourCompteRebours2, 1000);
}
*/