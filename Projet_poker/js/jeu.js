
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

function chronometre() {
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

function pauseCafe(){
    //Initialisation du nombre de joueur ayant choisit la carte café
    var nbJoueurCafe = 0;

    

    if (nbJoueurCafe === nombre_joueur){
        alert("Carte café jouée par tout le monde. Demande de pause validée.")
    }
}
