const obtenirBacklog = require('../public/js/pokercopie.js');

describe('obtenirBacklog', () => {
    test('retourne un objet avec les tâches et estimations', () => {
        // Créez une liste HTML simulée
        document.body.innerHTML = `
            <ul id="maListe">
                <li>Tache1 : Estimation1</li>
                <li>Tache2 : Estimation2</li>
            </ul>
        `;

        // Appelez la fonction et vérifiez le résultat
        const resultat = obtenirBacklog('maListe');
        expect(resultat).toEqual({
            'Tache1': 'Estimation1',
            'Tache2': 'Estimation2'
        });
    });

    // Ajoutez d'autres tests si nécessaire
});
