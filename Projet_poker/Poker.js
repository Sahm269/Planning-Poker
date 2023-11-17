//Variable globale 
//joueur hote 
//time
//fichier json

const tps_vote =30; //Temps de vote VERIFIER LE TEMPS UTILISE
const tps_desicion = 90; //Temps pour se mettre d'accod avec 2 extrmites VERIFIER LE TEMPS UTILISE

//FONCTIONNALITE EN PLUS
//Pas de chat car en locale
//Preciser de na pas echanger dans les regles
//Simulation
//Tutoriel
//Donner un nom au partie comme ca on peut se reperer plus facilement

onload=initialisation

function initialisation(){
    ecouteur();
    //fichier json vide
    nb_joueur=0;
    mode=null;
    //initialisé le plateau
    //initialisé un tableau de tache vide
}

function plateau(){ // jeu de carte

}

function id_hote(){ //créer aléatoirement l'id de l'hote puis le stocke ou pseudo
    //Definir les char possible
    //crer un table et parcourir
    //A REFLECHIR
}

function ecouteur(){ //ecouteur des fct mode
    //Poser sur le plateau et relier aux bouton modes
}

function chronometre(){
    //mette à jour le chro pour les vote et décision
}

function creer_partie(){
    //donner un nom à ta partie
    //liste des taches
    //choix du nb_joueur
    //choisit les regle du jeux
    //==> appel au fct mode
}

function pause_partie(){
    //enregistre aussi le tableau de tache
    //enregister un json
    //enregistre l'état de la partie dans reprendre partie
}

function reprendre_partie(){
    //ouvrir le fichier
    //reprendre au bon momoent

}

function quitter_jeu(){
    //quitte et fait une mise à jour de tout
}

function voter(){
    //chronome decompte
    //enregister les max et min des votes
    //a la fin affiche le min et le max
    //==>Boucle : debat
    //si le débat est régle ==> on supprime la tache dans le tableau et on la mais dans le json
    //sinon on recommence le vote
    //si tout le monde choisit café
    //==>fct pause
}

function mode_1(){ //regle de jeu 1

}

function mode_2(){//regle de jeu 2
    
}

function mode_3(){//regle de jeu 3

}

function tableau_kanban(){
    //quand une partie et fini ca utilise ton json pour créer un tableau kanban
}

function deplacer_tache_kanban(){
    //passe de fait à faire à fini
}

function parametre(){
    //Tutoriel
    //autre
}
