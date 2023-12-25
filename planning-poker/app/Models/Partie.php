<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Partie extends Model
{
    use HasFactory;
    protected $connection = 'mysql';
    protected $table = 'partie';

    protected $fillable = [
        'nom_projet',
        'pseudo_hote',
        'backlog',
        'etatpartie',
        'chronometre',
        'nbjoueur',
        'regle',
        'nomJoueur',
        'tacherestante',
        'tachevalide'
    ];
    



    public function enregistrerPartie()
    {
        // Enregistrez la partie en utilisant les méthodes Eloquent
        $this->save();
    }

    public function supprimerPartie()
    {
        // Supprimez la partie en utilisant les méthodes Eloquent
        $this->delete();
    }
}
