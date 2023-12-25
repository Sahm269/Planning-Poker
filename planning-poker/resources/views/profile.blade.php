@extends('layouts.app')
@section('content')
<div class="pContainer">

    <div class="mainContent">
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
                                <button>Reprendre</button>
                            @endif
                            <button class="downloadBtn">Backlog <i class="fas fa-download"></i></button>
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
