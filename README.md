# Projet Planning Poker

Bienvenue dans le projet Planning Poker basé sur le framework Laravel. Ce projet propose une application pour la planification agile des estimations.

## Installation

Suivez ces étapes pour installer et exécuter le projet localement.

### Prérequis

Assurez-vous que votre environnement de développement possède les éléments suivants :

- [PHP](https://www.php.net/) >= 7.4
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) avec [npm](https://www.npmjs.com/) (pour la gestion des dépendances JavaScript)

### Étapes d'installation( cas ou vous n'avez jamais travaillé avec Laravel )
1. Installez Laravel via Composer :
composer create-project --prefer-dist laravel/laravel nom-du-projet
(Remplacez nom-du-projet par le nom souhaité pour votre projet.)

2. Accédez au répertoire du projet :
cd nom-du-projet


3.Copiez le fichier d'environnement :
cp .env.example .env


4. Générez la clé d'application Laravel :
php artisan key:generate

5. Éditez le fichier .env et configurez la base de données :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=planningpoker
DB_USERNAME=root
DB_PASSWORD=Sourayat19

6. Exécutez les migrations et les seeders :
php artisan migrate --seed


7. Installez les dépendances JavaScript :
npm install

8. Compilez les assets :
npm run dev

9. Lancez le serveur de développement :
php artisan serve
L'application sera accessible à l'adresse http://127.0.0.1:8000



## Petite partie du  suivi de notre projet 
14/11/2023 : Un point sur les fonctions la structure du code. Pour la prochaine fois on se concentre sur l'interface en html et js pour la structure du code. 
- La page d'accueil(menu) : 2 à verifier le nombre de personne max, les pseudos(array), les boutons des regles, description des regles (v1)
                             bouton parametre( langue, aide , a propos)(v2)
- Le code js : faire les variables globales(pseudo de lhote, choisir les parametres pour chaque fonction.
- un tableau de kanban(idée de fonctionnalité v2)

  16/11/2023 : prochaine réunion

  14/12/2023
  Reunion

  Liste des taches restantes
  - mettre toutes les routes
  - image de planning poker sur la page d'acceuil
  - help
  - charger la partie en fct du mode choisit ==> design pattern
  - tutoriel ==> peut-être sympa
  - dans créer une nouvel page faire en sorte que si tout n'est pas remplis bloquer le bouton suivant
  - dans café caché café dans jeu
  - si tout le monde utilise café enregistremnt du json puis le mettre dans reprendre partit (+ popup pause)
  - mode majorité relative aficher diagramme vote
  - quitter==> page d'acceuil
  - quand partit finit ==> proposer de télécharger son backlog, créer une une nouvelle partit ou quitter
  - quand tu clic sur le logo /profil ou autre enregistre la partie de l'acceuil dans la page jeu sa doit enregister la partit
  - si on passe sur une carte elle flotte
  - si tout le monde appeyue sur le ? tache pas validée
  - if toutes les cartes sont identiques et que c'est un café ou un point ?
  - majorité relative ==> page de message qui change et nb tour de jeu
  - crhonométre vote commprendre pourquoi il ne fonctionne avec une réniatilisation

POUR LE 27/12
- Remettre le backlog en mode json car pdf ne fct pas
- Mettre en place 2 designs patterns supp
- Mettre en place l'intégration continu
- Mettre en place la documentation
- Rapport
- Nettoyer le code + mettre les commentaires partout + tous en francais
- Faire la vidéo de présentation
- Faire le readme
