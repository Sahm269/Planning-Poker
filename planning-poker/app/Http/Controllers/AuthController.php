<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{/**
 * Gère le processus d'inscription ou de connexion de l'utilisateur.
 *
 * @param \Illuminate\Http\Request $request La requête HTTP contenant les données d'inscription ou de connexion.
 * @return \Illuminate\Http\RedirectResponse Une redirection vers le profil ou le menu après inscription ou connexion.
 */
public function handleRegistrationOrLogin(Request $request)
{
    $pseudoHote = $request->input('pseudo_hote');
    $action = $request->input('action');

    // Vérifie si l'utilisateur existe dans la base de données
    $user = User::where('pseudo_hote', $pseudoHote)->first();

    if ($user) {
        if ($action === 'connexion') {
            // L'utilisateur existe, effectuez le processus de connexion
            Auth::login($user);
            return redirect()->intended('profile');
        } else {
            Auth::login($user);
            return redirect()->intended('menu');
        }
    } else {
        // L'utilisateur n'existe pas ou l'action est une inscription, effectuez le processus d'inscription
        $newUser = User::create([
            'pseudo_hote' => $pseudoHote,
        ]);

        Auth::login($newUser);
        return redirect()->intended('menu'); // Rediriger vers le tableau de bord après l'inscription
    }
}

/**
 * Déconnecte l'utilisateur et le redirige vers la page d'accueil.
 *
 * @return \Illuminate\Http\RedirectResponse Une redirection vers la page d'accueil.
 */
public function logout()
{
    Auth::logout();
    return redirect()->route('accueil'); // Redirigez vers la page d'accueil ou toute autre page appropriée
}

    
}
