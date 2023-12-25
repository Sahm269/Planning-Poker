
/*
// Attende le chargement du document pour accéder à tachesTexte
document.addEventListener('DOMContentLoaded', function () {
alert("Redirection vers la page jeu");
var tachesTexte = localStorage.getItem('tachesTexte');
var premiereTacheBacklogAffiche = document.getElementById('premiereTacheBacklogAffiche');
premiereTacheBacklogAffiche.innerText = tachesTexte;
});
*/

document.addEventListener('DOMContentLoaded', function () {
    //alert("test")
    tacheDebat();
    chronometre();
});


function tacheDebat(){
    var tachesDebat = localStorage.getItem('tachesTexte');
    // Extraire la première ligne
    var premiereTache = tachesDebat.split('\n')[0];
    // Afficher la première ligne dans une alerte
    //alert(premiereTache);
    var premiereTacheBacklogAffiche = document.getElementById('premiereTacheBacklogAffiche');
    premiereTacheBacklogAffiche.innerText = premiereTache;

    // Ajouter un gestionnaire d'événements au bouton "Tâche suivante"
    var boutonTacheSuivante = document.getElementById('TacheSuivante');
    boutonTacheSuivante.addEventListener('click', function () {
        // Diviser la chaîne en lignes
        var lignes = tachesDebat.split('\n');
        
        // Supprimer la première ligne
        lignes.shift();
        
        // Mettre à jour la variable tachesDebat avec les lignes restantes
        tachesDebat = lignes.join('\n');
        
        // Mettre à jour le contenu de l'élément HTML
        premiereTacheBacklogAffiche.innerText = tachesDebat.split('\n')[0];
        
        // Mettre à jour la valeur dans le stockage local
        localStorage.setItem('tachesTexte', tachesDebat);
    });
}

var compteReboursInterval;

var nb_joueur=3;
var indexJoueurActuel=1;

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
            document.getElementById('chronometre').innerText = 'Temps écoulé';
            // Ici du code à exécuter lorsque le temps est écoulé

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


// Ajoutez un gestionnaire d'événements à chaque div de carte
for (let i = 0; i <= 12; i++) {
    // Supposons que vos div ont les identifiants de 'carte0' à 'carte12'
    var carteDiv = document.getElementById('carte' + i);
    // Ajoutez un gestionnaire d'événements à chaque div de carte
    carteDiv.addEventListener('click', function() {
        // Arrêter le chronomètre en utilisant l'identifiant de l'intervalle
        clearInterval(compteReboursInterval);
        if (indexJoueurActuel==nb_joueur){
            alert("Tous le monde a voté !");
            document.getElementById('chronometre').innerText = 'chronomètre';
        }
        else{
            // Redémarrer le chronomètre après un délai 2 secondes
            setTimeout(chronometre, 2000);
            alert("Passez le téléphone aux joueur suivant.");
            
            indexJoueurActuel++;
        }
    });
}

// Fonction pour réinitialiser les variables du chronomètre
function reinitialiserChronometre() {
    indexJoueurActuel= 1;
    chronometre();
}

// Gestionnaire d'événements pour le boutonNextTache
document.getElementById('TacheSuivante').addEventListener('click', function() {
    reinitialiserChronometre();
});


//////////////////////////////////////////////////////////////
function pauseCafe(){
    //Initialisation du nombre de joueur ayant choisit la carte café
    var nbJoueurCafe = 0;

    

    if (nbJoueurCafe === nombre_joueur){
        alert("Carte café jouée par tout le monde. Demande de pause validée.")
    }
}
