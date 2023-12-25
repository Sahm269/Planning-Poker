@extends('layouts.app')
@section('content')

    <div class="accueilContainer">
   
<div id="partie1">
   <!-----------------------                              Titre           ----------------------------->
   <div class="titrejeu">
        <h1 class="">Planning Pocker </h1>
      
   </div>
   <div class="Resume">
     <p>
          <strong>Bienvenue dans notre planning poker.</strong> Nous vous proposons une expérience unique et interactive.
          Découvrez un planning poker conçu pour répondre à vos besoins, offrant des fonctionnalités
          exceptionnelles et une facilité d'utilisation hors du commun.
     </p>

   </div>
   
    <!-----------------------                              Call to actions           ----------------------------->
    
    <div class="bouttons">
       <a href="{{ route('/menu') }}"> <button class="itembouton"> ! Nouvelle Partie !</button></a>
       <a href="{{ route('/profile') }}"> <button class="itembouton">continuer la partie</button></a>
       
    </div>
    </div>

    <div id = "gifaccueil" >
          <img src="{{asset('asset/accueil1.gif')}}">
    </div>


    
    
   <!-----------------------                             footer        ----------------------------->
   </div>

           
@endsection