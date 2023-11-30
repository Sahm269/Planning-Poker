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

function showPart(part) {
    var parts = ['partie1', 'partie2', 'partie3'];

    // Hide all parts
    for (var i = 0; i < parts.length; i++) {
        document.querySelector('.' + parts[i]).style.display = 'none';
    }

    // Show the selected part
    document.querySelector('.' + part).style.display = 'block';
}


function startGame() {
   
   //processBacklog();
   var formulaire = document.getElementById('setupForm');
   var formData = new FormData(formulaire);
   var pseudo_hote = formData.get('pseudoHote')
   var nom_projet = formData.get('nomProjet')
   var nombre_joueur = formData.get('nombreJoueur')
   var i = 0;
   var tab_nom_joueur = [];
   while(i<=nombre_joueur){
        tab_nom_joueur[i]=formData.get('player'+i)
        i++;
   }
   var tab_backlog = [];
   var backlog = formData.get('backlog');
   /*
   var lignes = backlog.split('\n');
   var nb_ligne = lignes.length;
   var j = 0;
   while(j<=nb_ligne){
    tab_backlog[j]=lignes.j;
    j++;
   }
   var affichage_backlog="";
   */
   alert("pseudo " + pseudo_hote + "nb joueur " + nombre_joueur + "liste joueur " + tab_nom_joueur + "baclog " + backlog)


   //recuperer_donnees();
}

function recuperer_donnees(){
    
}

function processBacklog() {
    // Récupère le contenu du textarea
    const backlogTextarea = document.getElementById('backlog');
    const backlogContent = backlogTextarea.value;

    // Sépare les lignes pour obtenir une liste de tâches
    const backlogTasks = backlogContent.split('\n');

    // Crée un tableau de tâches au format JSON avec des estimations initialisées à une chaîne vide
    const taskList = backlogTasks.map(task => ({ task: task.trim(), estimate: "" }));

    // Convertit le tableau de tâches en JSON
    const taskListJSON = JSON.stringify(taskList, null, 2);
    console.log(taskListJSON);
    document.getElementById('taskList').value = taskListJSON;

    // Affiche la liste de tâches JSON dans la zone de texte
    document.getElementById('taskList').value = taskListJSON;



}

