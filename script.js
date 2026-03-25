"use strict";

// Base de données de destinations

const destinations = [
    {
        lieu: ,
        pays: ,
        continent: ,
        type: ,
        statut: ,
        date: ,
        image: ,
    }

]

// Affiche dans la console une liste de destinations

function afficherDestinationsConsole(liste){
    console.log("Nombre de destinations :" + liste.length);

    for(const destination of liste){

    }
}

afficherDestinationsConsole(destinations);

// Recherche de destination dans la liste

function rechercherDestination(liste, terme){

}


// Affichage d'une carte de destination

function creerCarteDestination(destination) {

    return `<article class="film-card">
        <img src="${destination.image}" alt="${destination.lieu}" class="image">
            <div class="destination-info">
                <h3>${destination.lieu}</h3>
                <p class="film-meta">${film.annee} · ${film.genre}</p>
                <p class="film-realisateur">${film.realisateur}</p>
                <div class="film-note">
                    <span class="note-badge">${film.note}</span>
                </div>
            </div>
    </article>`;
