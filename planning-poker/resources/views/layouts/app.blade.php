<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Planning Poker')</title>
    <!-- Inclure  styles CSS ici -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
    <link rel="stylesheet" href="{{asset('css/menu.css')}}">
    <link rel="stylesheet" href="{{asset('css/profile.css')}}">
    <link rel="stylesheet" href="{{asset('css/jeu.css')}}">
    <link rel="stylesheet" href="{{asset('css/layout.css')}}">
    <link rel="stylesheet" href="{{asset('css/index.css')}}">

     <!-- Inclure  scripts JavaScript ici -->
    
     
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
                <a class="" href="{{ route('accueil') }}"><img id="logo" src="{{ asset('asset/logo.png') }}"/></a>
                <a href="#" id="openPopup">Aide <i class="fa fa-question-circle"></i></a>
                <a class="ml-auto" href="{{ route('profile') }}">Profile <i class="fa fa-user"></i></a>
            </div>
        </nav>
    </div>
                 <div id="videoPopup" class="popupvideo">
                    <span class="close" id="closePopup">&times;</span>
                    <video  id = "video" controls>
                        <source src="{{asset('asset/tutoaide.mp4')}}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>


        @yield('content')
    

    <footer class="footer bg-light">
        <!-- Contenu du footer -->
    </footer>
    <!-- Chargement du script jsPDF -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="{{asset('js/affichagemenu.js')}}"></script>
    <script src="{{asset('js/copiepoker.js')}}"></script>
    <script>
        document.getElementById('openPopup').addEventListener('click', function() {
            document.getElementById('videoPopup').style.display = 'block';
        });

        document.getElementById('closePopup').addEventListener('click', function() {
            document.getElementById('videoPopup').style.display = 'none';
        });

    </script>

   
</body>
</html>
