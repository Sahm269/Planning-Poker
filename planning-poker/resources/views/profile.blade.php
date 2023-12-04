@extends('layouts.app')
@section('content')

<div class="pContainer">
    <div class="profileName">
        <h2>Nom Profile</h2>
    </div>

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
                <tr>
                    <td>Nom de la partie 1</td>
                    <td>En cours</td>
                    <td>
                        <button>Continuer</button>
                        <button class="downloadBtn">Backlog <i class="fas fa-download"></i></button>
                    </td>
                </tr>
                <!-- Ajoutez d'autres lignes selon vos besoins -->
            </tbody>
        </table>

        <div class="newPart">
            <button>Commencer une nouvelle partie</button>
        </div>
    </div>
</div>

@endsection
