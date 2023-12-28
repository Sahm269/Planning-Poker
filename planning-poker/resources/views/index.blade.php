@extends('layouts.app')
@section('content')

    <div class="accueilContainer">
   
<div id="partie1">
   <!-----------------------                              Titre           ----------------------------->
   <div class="titrejeu">
        <h1 class="">Planning Poker </h1>

   </div>
   <div class="Resume">
     <p>
          <strong>Bienvenue dans notre planning poker.</strong> Nous vous proposons une expérience unique et interactive.
          Découvrez un planning poker conçu pour répondre à vos besoins, offrant des fonctionnalités
          exceptionnelles et une facilité d'utilisation hors du commun.
     </p>
     

   </div>


   <form method="POST" action="{{ route('inscription-connexion') }}">
    @csrf <!-- Protection CSRF -->

    <!-- Champ pour le nom -->
    <label id="label" for="pseudo_hote">Nom :</label>
    <input type="text" id="pseudo_hote" name="pseudo_hote" required>

    <!-- Champ caché pour l'action -->
    <input type="hidden" name="action" value="connexion">

    <div class="bouttons">
        <button type="submit" class="itembouton">! Nouvelle partie !</button>
        <button type="submit" class="itembouton" name="connexion">Connexion</button>
    </div>
</form>




    </div>

    <div id = "gifaccueil" >
          <img src="{{asset('asset/accueil1.gif')}}">
    </div>


    
    
   <!-----------------------                             footer        ----------------------------->
   </div>

           
@endsection