@extends('layouts.app')
@section('content')
<!-- Conteneur pour la page -->
<div class="pContainer">
    <!-- Section du contenu principal -->
    <div class="mainContent">
        
        <!-- Section d'informations sur l'utilisateur -->
        <div class="user-info">
            <div class="profile">
                <!-- Afficher le pseudonyme de l'utilisateur -->
                <h2><i class="fas fa-user"></i>  {{ auth()->user()->pseudo_hote }}</h2>
            </div>
            <div class="logout">
                <!-- Lien de déconnexion pour l'utilisateur -->
                <a href="{{ route('logout') }}">
                    <i class="fas fa-sign-out-alt"></i>
                    Déconnexion
                </a>
            </div>
        </div>

        <!-- En-tête pour la liste des états de partie -->
        <h3>Voici toutes tes parties en cours et finies</h3>

        <!-- Tableau pour afficher les informations sur la partie -->
        <table class="partTable">
            <!-- En-tête du tableau -->
            <thead>
                <tr>
                    <th>Nom de la partie</th>
                    <th>État</th>
                    <th>Action</th>
                </tr>
            </thead>
            <!-- Corps du tableau pour afficher les détails de la partie -->
            <tbody>
                <!-- Boucle à travers chaque partie de la liste -->
                @foreach ($partiesCrees as $partie)
                    <tr>
                        <!-- Afficher le nom de la partie -->
                        <td>{{ $partie->nom_Projet }}</td>
                        <!-- Afficher l'état de la partie -->
                        <td>{{ $partie->etatpartie }}</td>
                        <td>
                            <!-- Vérifier si la partie est en cours -->
                            @if ($partie->etatpartie === 'en cours')
                                <!-- Lien pour continuer la partie -->
                                <a href="{{ route('continuer.partie', ['partieId' => $partie->id]) }}">Reprendre</a>
                            @else
                                <!-- Afficher le lien de téléchargement uniquement si la partie n'est pas en cours -->
                                <a href="{{ route('telecharger.backlog', ['partieId' => $partie->id]) }}" class="downloadBtn">Backlog <i class="fas fa-download"></i></a>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Section pour commencer une nouvelle partie -->
        <div class="newPart">
            <button onclick="nouvellepartie()" >Commencer une nouvelle partie</button>
        </div>
    </div>
</div>



@endsection
