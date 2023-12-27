
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
    if (nomJoueur === ordreJoueurs[indexJoueurActuel]) {
        //chronometre2();
        partieData.nomJoueur[nomJoueur] = valeurCarte;
    
        // Rendre la carte visible pour le joueur actuel
        var joueurActuelElement = document.getElementById('joueur' + (indexJoueurActuel + 1));
        var carteJoueeElement = joueurActuelElement.querySelector('.carte-jouee');
        carteJoueeElement.style.visibility = 'visible';
        carteJoueeElement.classList.add('visible');
    
        // Passer au joueur suivant
        indexJoueurActuel = (indexJoueurActuel + 1) % ordreJoueurs.length;
    
        console.log(ordreJoueurs.length);
        console.log(indexJoueurActuel);
        mettreAJourAffichage();
        // Vérifier si tous les joueurs ont joué 
    
    
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
  compteurVotes++;
  console.log(' compteurVotes ',  compteurVotes)
  afficheMinMax();

  // Set the flag to indicate that all players have voted
  allPlayersVoted = true;
  
  // Check if all players have voted before showing the Resultat div



}

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






// --------------------------------------------------------------------------------function qui affiche le min et le max et traite le vote
function afficheMinMax() {
    estimerTache(regleValue, partieData);
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
  
  



 

// ----------------------------------------------------------------------------------Fonction Tache suivante 

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



// ---------------------------------------------------------------------------------------fonction revoter 

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
    var indexJoueurActuel = 0;  
    var ordreJoueurs = Object.keys(partieData.nomJoueur); // Récupère l'ordre des joueurs
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




function pausecafe(){
    enregistrer();
    
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
}function telechargerbacklog(){
    enregistrer()
    var donneesBacklog = {
        backlogListvalide: partieData.tachevalide,
        NomProjet: partieData.nom_projet
        
    };
    var blob = new Blob([JSON.stringify(donneesBacklog)], { type: 'application/json' });

    // Créez un URL pour le Blob
    var url = window.URL.createObjectURL(blob);

    // Créez un lien et définissez l'URL du lien sur l'URL du Blob
    var a = document.createElement('a');
    a.href = url;
    a.download = 'backlog.json'; // Nom du fichier téléchargé
    document.body.appendChild(a);

    // Cliquez sur le lien pour déclencher le téléchargement
    a.click();

    // Retirez le lien de l'élément body
    document.body.removeChild(a);


}

function telechargerJson() {
    alert("Votre partie sera enregistrée et téléchargée en format JSON");

    // Enregistrez la partie
    enregistrer();

    // Créez un objet Blob avec les données JSON
    var donneesAEnregistrer = {
        nomJoueur: partieData.nomJoueur,
        backlog: partieData.backlog,
        backlogList: partieData.tacherestante,
        backlogListvalide: partieData.tachevalide,
        etatpartie: partieData.etatpartie,
        partie_id: partieData.id  
    };
    var blob = new Blob([JSON.stringify(donneesAEnregistrer)], { type: 'application/json' });

    // Créez un URL pour le Blob
    var url = window.URL.createObjectURL(blob);

    // Créez un lien et définissez l'URL du lien sur l'URL du Blob
    var a = document.createElement('a');
    a.href = url;
    a.download = 'partie.json'; // Nom du fichier téléchargé
    document.body.appendChild(a);

    // Cliquez sur le lien pour déclencher le téléchargement
    a.click();

    // Retirez le lien de l'élément body
    document.body.removeChild(a);

  

    // Rediriger vers une page ou faire un nouveau popup
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


function telechargerPDF() {
    // Effectuer la requête Ajax
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/generer-pdf', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // La requête a réussi, déclencher le téléchargement du PDF
                var blob = new Blob([xhr.response], { type: 'application/pdf' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'tachevalide.pdf';
                link.click();
                console.log('PDF généré avec succès');
            } else {
                // La requête a échoué
                console.error('Échec de la génération du PDF');
            }
        }
    };
    
    // Indiquer que la réponse doit être traitée en tant que binaire
    xhr.responseType = 'arraybuffer';
    
    // Envoyer la requête
    xhr.send();
}



//AU CHARGEMENT DE LA PAGE LANCE CHRONOMETTRE
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
    // Supposons que vos div ont les identifiants de 'carte0' à 'carte12'
    var carteDiv = document.getElementById('carte' + i);
    // Gestionnaire d'événements à chaque div de carte
    carteDiv.addEventListener('click', function() {
        // Arrêter le chronomètre en utilisant l'identifiant de l'intervalle
        clearInterval(compteReboursInterval);
        if (indexJoueurChrono==ordreJoueurs.length){
           // alert("Tous le monde a voté !");
         // document.getElementById('chronometre').innerText = 'chronomètre';
        }
        else{
            // Redémarrer le chronomètre après un délai 2 secondes
            //setTimeout(chronometre, 2000);
            chronometre();
            //alert("Passez le téléphone aux joueur suivant.");
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
            // Ici du code à exécuter lorsque le temps est écoulé

        } else {
            tempsRestant2--;
        }
    }

    // Effacer l'ancien intervalle s'il existe
    clearInterval(compteReboursInterval2);

    // Définir le nouvel intervalle
    compteReboursInterval2 = setInterval(mettreAJourCompteRebours2, 1000);

    // Retourner l'identifiant de l'intervalle
    return compteReboursInterval2;
}




















/* ________________________________________________________DESIGN PATTERN STRATEGY______________________________________ */
function estimerTache(regleValue, partieData) {
    var estimationStrategy;
  
    if (regleValue === 'strict') {
      estimationStrategy = new StrictEstimationStrategy();
    } else if (regleValue === 'majorite') {
      estimationStrategy = new MajorityEstimationStrategy();
    } else {
      // Stratégie par défaut ou gestion d'erreur si nécessaire
      estimationStrategy = new StrictEstimationStrategy();
    }
  
    // Utilisation de la stratégie pour effectuer l'estimation
    estimationStrategy.estimate(partieData);
  }
  
// Classe de stratégie d'estimation de base
class EstimationStrategy {
    estimate(partieData) {
      // Implémentation par défaut, peut être remplacée par des sous-classes
    }
  }
  
// Classe de stratégie d'estimation pour la règle 'strict'
class StrictEstimationStrategy extends EstimationStrategy {
    estimate(partieData) {
    console.log('on est dans le strict ');

        
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
    
    // Faire quelque chose avec l'estimation (peut-être l'afficher ou la stocker)
    console.log('Estimation attribuée:', estimation);
    boutonNextTache.disabled = false;
    boutonRevoter.disabled = true;
    boutonNextTache.classList.remove('bouton-desactive');
    boutonRevoter.classList.add('bouton-desactive');
      
  } 
  else{
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
        chronometre2()
  }

} }
  
  // Classe de stratégie d'estimation pour la règle 'majorite'
  class MajorityEstimationStrategy extends EstimationStrategy {
    estimate(partieData) {
      if (compteurVotes>1){
      maxMajorite(partieData);}
      else{
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
        chronometre2()}
      
      console.log('on est dans le mode majorite ')
      
    }
  }
  
