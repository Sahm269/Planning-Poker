
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