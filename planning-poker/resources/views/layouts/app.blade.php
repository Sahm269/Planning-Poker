<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Planning Poker')</title>
    <!-- Inclure vos styles CSS ici -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
    <link rel="stylesheet" href="{{asset('css/menu.css')}}">
    <link rel="stylesheet" href="{{asset('css/profile.css')}}">
    <link rel="stylesheet" href="{{asset('css/jeu.css')}}">
    <link rel="stylesheet" href="{{asset('css/layout.css')}}">
    <link rel="stylesheet" href="{{asset('css/index.css')}}">

     <!-- Inclure vos scripts JavaScript ici -->
     <script src="{{asset('js/affichagemenu.js')}}"></script>
     
    <style>
        .partie2, .partie3 {
            display: none;
            
        }
    </style>
  

</head>
<body>

    <div class="navbar">
        <nav class="navbar navbar-light bg-light static-top">
            <div class="navcontainer">
                <a class="" href="#"><img  id ="logo" src = "{{asset('asset/logo.png')}}"/>
                <a href="#">Aide <i class="fa fa-question-circle"></i></a>
                <a class="ml-auto" href="#">Profile <i class="fa fa-user"></i></a>
            </div>
        </nav>
    </div>


        @yield('content')
    

    <footer class="footer bg-light">
        <!-- Contenu du footer -->
    </footer>

   
</body>
</html>
