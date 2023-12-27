@extends('layouts.app')
@section('content')
<div class="pContainer">
        <div class="mainContent">
        <div class="user-info">
            <div class="profile">
                
                <h2><i class="fas fa-user"></i>  {{ auth()->user()->pseudo_hote }}</h2>
            </div>
            <div class="logout">
                <a href="{{ route('logout') }}">
                    <i class="fas fa-sign-out-alt"></i>
                    Déconnexion
                </a>
            </div>
        </div>


        <h3>Voici toutes tes parties en cours, commencées, finies</h3>

        <table class="partTable">
            <thead>
                <tr>
                    <th>Nom de la partie</th>
                    <th>Etat</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($partiesCrees as $partie)
                    <tr>
                        <td>{{ $partie->nom_Projet }}</td>
                        <td>{{ $partie->etatpartie }}</td>
                        <td>
                        @if ($partie->etatpartie === 'en cours')
                            <a href="{{ route('continuer.partie', ['partieId' => $partie->id]) }}">Reprendre</a>
                        @else
                            <!-- Affichez le lien de téléchargement uniquement si l'état de la partie n'est pas "en cours" -->
                            <a href="{{ route('telecharger.backlog', ['partieId' => $partie->id]) }}" class="downloadBtn">Backlog <i class="fas fa-download"></i></a>
                        @endif

                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="newPart">
            <button onclick="nouvellepartie()" >Commencer une nouvelle partie</button>
        </div>
    </div>
</div>



@endsection
