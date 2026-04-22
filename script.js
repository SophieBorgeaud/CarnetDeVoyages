"use strict";

// Base de données de destinations
const destinations = [
    {
        id: 1,
        lieu: "Athènes",
        pays: "Grèce",
        continent: "Europe",
        type: "Ville",
        statut: "Visité",
        date: "2026",
        image: "images/athenes.jpg"
    },
    {
        id: 2,
        lieu: "Bali",
        pays: "Indonésie",
        continent: "Asie",
        type: "Mer",
        statut: "Rêvé",
        date: "2025",
        image: "images/bali.jpg"
    },
    {
        id: 3,
        lieu: "Banff",
        pays: "Canada",
        continent: "Amérique du Nord",
        type: "Montagne",
        statut: "Rêvé",
        date: "2027",
        image: "images/banff_canada.jpg"
    },
    {
        id: 4,
        lieu: "Barcelone",
        pays: "Espagne",
        continent: "Europe",
        type: "Ville",
        statut: "Rêvé",
        date: "2023",
        image: "images/barcelone.jpg"
    },
    {
        id: 5,
        lieu: "Chamonix",
        pays: "France",
        continent: "Europe",
        type: "Montagne",
        statut: "Rêvé",
        date: "2025",
        image: "images/chamonix.jpg"
    },
    {
        id: 6,
        lieu: "Côte Amalfitaine",
        pays: "Italie",
        continent: "Europe",
        type: "Mer",
        statut: "Rêvé",
        date: "2026",
        image: "images/coteamalfitaine_italie"
    },
    {
        id: 7,
        lieu: "Highlands",
        pays: "Écosse",
        continent: "Europe",
        type: "Nature",
        statut: "Visité",
        date: "2027",
        image: "images/highlands_ecosse.jpg"
    },
    {
        id: 8,
        lieu: "Islande",
        pays: "Islande",
        continent: "Europe",
        type: "Nature",
        statut: "Rêvé",
        date: "2025",
        image: "images/islande.jpg"
    },
    {
        id: 9,
        lieu: "Londres",
        pays: "Royaume-Uni",
        continent: "Europe",
        type: "Ville",
        statut: "Prévu",
        date: "2022",
        image: "images/londres.jpg"
    },
    {
        id: 10,
        lieu: "Maldives",
        pays: "Maldives",
        continent: "Asie",
        type: "Mer",
        statut: "Rêvé",
        date: "2027",
        image: "images/maldives.jpg"
    },
    {
        id: 11,
        lieu: "Paris",
        pays: "France",
        continent: "Europe",
        type: "Ville",
        statut: "Visité",
        date: "2021",
        image: "images/paris.jpg"
    },
    {
        id: 12,
        lieu: "Patagonie",
        pays: "Argentine",
        continent: "Amérique du Sud",
        type: "Nature",
        statut: "Rêvé",
        date: "2028",
        image: "images/patagonie_argentine.jpg"
    },
    {
        id: 13,
        lieu: "Zermatt",
        pays: "Suisse",
        continent: "Europe",
        type: "Montagne",
        statut: "Visité",
        date: "2025",
        image: "images/zermatt.jpg"
    }
];

// Affiche dans la console une liste de destinations

function afficherDestinationsConsole(liste) {
    console.log("Nombre de destinations :" + liste.length);

    for (const destination of liste) {

    }
}

afficherDestinationsConsole(destinations);

// Recherche de destination dans la liste

function rechercherDestination(liste, terme) {

}


// Affichage d'une carte de destination

function creerCarteDestination(destination) {

    return `<article class="destination-card">
        <img src="${destination.image}" alt="${destination.lieu}" class="image">

        <div class="destination-info">
            <h3>${destination.lieu}</h3>

            <p class="destination-meta">
                ${destination.pays} · ${destination.continent}
            </p>

            <p class="destination-type">
                Type : ${destination.type}
            </p>

            <p class="destination-date">
                Date : ${destination.date}
            </p>

            <div class="destination-statut">
                <span class="statut-badge">${destination.statut}</span>
            </div>

            <button class="btn-supprimer" data-id="${destination.id}">
                Supprimer
            </button>
        </div>
    </article>`;
}
