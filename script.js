"use strict";

// Base de données de destinations (mon tableau d'objets)
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
        statut: "Prévu",
        date: "2025",
        image: "images/bali.jpg"
    },
    {
        id: 3,
        lieu: "Banff",
        pays: "Canada",
        continent: "Amérique du Nord",
        type: "Montagne",
        statut: "Prévu",
        date: "2027",
        image: "images/banff_canada.jpg"
    },
    {
        id: 4,
        lieu: "Barcelone",
        pays: "Espagne",
        continent: "Europe",
        type: "Ville",
        statut: "Prévu",
        date: "2023",
        image: "images/barcelone.jpg"
    },
    {
        id: 5,
        lieu: "Chamonix",
        pays: "France",
        continent: "Europe",
        type: "Montagne",
        statut: "Prévu",
        date: "2025",
        image: "images/chamonix.jpg"
    },
    {
        id: 6,
        lieu: "Côte Amalfitaine",
        pays: "Italie",
        continent: "Europe",
        type: "Mer",
        statut: "Prévu",
        date: "2026",
        image: "images/cote_amalfitaine_italie.jpg"
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
        statut: "Prévu",
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
        statut: "Prévu",
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
        statut: "Prévu",
        date: "2028",
        image: "images/patagonie_argentine.jpg"
    },
    {
        id: 13,
        lieu: "Zermatt",
        pays: "Suisse",
        continent: "Europe",
        type: "Montagne",
        statut: "Prévu",
        date: "2025",
        image: "images/zermatt.jpg"
    }
];

// Compteur pour générer des ids uniques aux nouvelles destinations
let prochainId = 14;

// Affiche toutes les destinations dans la console pour vérifier que les données sont bien là
function afficherDestinationsConsole(liste) {
    console.log("Nombre de destinations : " + liste.length);

    for (const destination of liste) {
        console.log(destination.lieu + " — " + destination.pays + " (" + destination.statut + ")");
    }
}

afficherDestinationsConsole(destinations);
// Retourne la liste filtrée et triée selon les contrôles actifs
// C'est cette fonction qui centralise toute la logique d'affichage

function obtenirListeFiltreeEtTriee() {
    const terme = document.querySelector("#recherche").value;
    const filtreStatut = document.querySelector(".btn-filtre.actif").dataset.filtre;
    const filtreType = document.querySelector("#filtre-type").value;
    const critèreTri = document.querySelector("#tri").value;

    // 1. Je pars de toutes les destinations
    let liste = destinations;

    // 2. Je filtre par terme de recherche (lieu ou pays)
    if (terme !== "") {
        liste = rechercherDestination(liste, terme);
    }

    // 3. Je filtre par statut si ce n'est pas "Tous"
    if (filtreStatut !== "Tous") {
        liste = liste.filter(function(d) {
            return d.statut === filtreStatut;
        });
    }

    // 4. Je filtre par type si un type est sélectionné
    if (filtreType !== "") {
        liste = liste.filter(function(d) {
            return d.type === filtreType;
        });
    }

    // 5. Je trie selon le critère choisi
    if (critèreTri !== "") {
        liste = trierDestinations(liste, critèreTri);
    }

    return liste;
}


// Filtre les destinations selon ce que l'utilisateur tape
// Ça cherche dans le lieu ET dans le pays

function rechercherDestination(liste, terme) {
    // Je mets tout en minuscules pour que "Paris" et "paris" donnent le même résultat
    const termeLower = terme.toLowerCase();

    return liste.filter(function(destination) {
        return destination.lieu.toLowerCase().includes(termeLower)
            || destination.pays.toLowerCase().includes(termeLower);
    });
}

// Trie une liste de destinations selon un critère
function trierDestinations(liste, critere) {
    // slice() crée une copie du tableau pour ne pas modifier l'original
    return liste.slice().sort(function(a, b) {
        if (critere === "lieu") {
            return a.lieu.localeCompare(b.lieu);
        }
        if (critere === "pays") {
            return a.pays.localeCompare(b.pays);
        }
        if (critere === "continent") {
            return a.continent.localeCompare(b.continent);
        }
        if (critere === "date") {
            // Les destinations sans date vont à la fin
            if (a.date === "") return 1;
            if (b.date === "") return -1;
            return a.date - b.date;
        }
        if (critere === "statut") {
            return a.statut.localeCompare(b.statut);
        }
        return 0;
    });
}

// Génère le HTML d'une carte à partir d'un objet destination
function creerCarteDestination(destination) {
    // Je choisis la bonne classe CSS selon le statut pour que le badge ait la bonne couleur
    let classeStatut = "";
    if (destination.statut === "Visité") {
        classeStatut = "visite";
    } else if (destination.statut === "Prévu") {
        classeStatut = "prevu";
    }

    // Je prépare le texte selon si c'est déjà visité ou juste prévu
    let texteDate = "";
    if (destination.statut === "Visité") {
        texteDate = "Visité en " + destination.date;
    } else if (destination.statut === "Prévu" && destination.date !== "") {
        texteDate = "Prévu pour " + destination.date;
    }

    return `
    <article class="voyage-card">
        <div class="card-image-wrapper">
            <img src="${destination.image}" alt="${destination.lieu}">
            <span class="badge-type">${destination.type}</span>
            <div class="card-overlay">
                <p class="card-pays-overlay">${destination.pays} · ${destination.continent}</p>
                ${texteDate !== "" ? `<p class="card-date-overlay">${texteDate}</p>` : ""}
            </div>
        </div>
        <div class="card-body">
            <div class="card-header-row">
                <h3>${destination.lieu}</h3>
                <span class="badge-statut ${classeStatut}">${destination.statut}</span>
            </div>
            <div class="card-footer">
                <button class="btn-modifier" data-id="${destination.id}">✏️ Modifier</button>
                <button class="btn-supprimer" data-id="${destination.id}">🗑 Supprimer</button>
            </div>
        </div>
    </article>
`;
}


// Vide la grille et la remplit avec les destinations reçues en paramètre
function afficherDestinations(liste) {
    const conteneur = document.querySelector("#voyage-container");

    // Si aucun résultat, j'affiche un message plutôt que de laisser la page vide
    if (liste.length === 0) {
        conteneur.innerHTML = `<p class="message-vide">Aucune destination trouvée 🌍</p>`;
        return;
    }

    conteneur.innerHTML = "";

    for (const destination of liste) {
        conteneur.innerHTML += creerCarteDestination(destination);
    }
}

// Fonction centrale appelée à chaque interaction
// Elle recalcule et réaffiche toujours la bonne liste
function mettreAJourAffichage() {
    const liste = obtenirListeFiltreeEtTriee();
    afficherDestinations(liste);
    mettreAJourCompteur(); // ← ajoute cette ligne
}

// Validation du formulaire — vérifie que les champs obligatoires sont remplis
// Retourne true si tout est ok, false sinon
function validerFormulaire(prefixe) {
    let valide = true;

    const champs = ["lieu", "pays", "continent", "type", "statut"];

    for (const champ of champs) {
        const input = document.querySelector("#" + prefixe + "-" + champ);
        const erreur = document.querySelector("#erreur-" + prefixe + "-" + champ)
            || document.querySelector("#erreur-" + champ);

        if (input.value.trim() === "") {
            input.classList.add("invalide");
            if (erreur) erreur.textContent = "Ce champ est obligatoire.";
            valide = false;
        } else {
            input.classList.remove("invalide");
            if (erreur) erreur.textContent = "";
        }
    }

    return valide;
}

// Événement : recherche en temps réel
document.querySelector("#recherche").addEventListener("input", function() {
    mettreAJourAffichage();
});

// Événement : filtres par statut (boutons Tous / Prévu / Visité)
const boutonsFiltres = document.querySelectorAll(".btn-filtre");

boutonsFiltres.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        // Je retire la classe "actif" de tous les boutons
        boutonsFiltres.forEach(function(b) {
            b.classList.remove("actif");
        });
        // Je l'ajoute seulement sur celui cliqué
        bouton.classList.add("actif");
        mettreAJourAffichage();
    });
});

// Événement : filtre par type (select)
document.querySelector("#filtre-type").addEventListener("change", function() {
    mettreAJourAffichage();
});

// Événement : tri
document.querySelector("#tri").addEventListener("change", function() {
    mettreAJourAffichage();
});

// Événement : soumission du formulaire d'ajout
document.querySelector("#formulaire-ajout").addEventListener("submit", function(event) {
    // J'empêche le rechargement de la page (comportement par défaut des formulaires)
    event.preventDefault();

    // Je vérifie que les champs obligatoires sont remplis
    if (!validerFormulaire("champ")) {
        return;
    }

    // Je crée un nouvel objet destination avec les valeurs du formulaire
    const nouvelleDestination = {
        id: prochainId,
        lieu: document.querySelector("#champ-lieu").value.trim(),
        pays: document.querySelector("#champ-pays").value.trim(),
        continent: document.querySelector("#champ-continent").value,
        type: document.querySelector("#champ-type").value,
        statut: document.querySelector("#champ-statut").value,
        date: document.querySelector("#champ-date").value,
        image: document.querySelector("#champ-image").value || "images/defaut.jpg"
    };

    // J'incrémente le compteur pour le prochain ajout
    prochainId++;

    // J'ajoute la destination au tableau
    destinations.push(nouvelleDestination);

    // Je remets le formulaire à zéro
    document.querySelector("#formulaire-ajout").reset();

    // Je réaffiche la grille
    mettreAJourAffichage();
});

// Événements sur la grille : suppression et modification
// J'écoute le conteneur plutôt que chaque bouton
// parce que les boutons sont créés dynamiquement et n'existent pas encore au chargement
const conteneur = document.querySelector("#voyage-container");

conteneur.addEventListener("click", function(event) {

    // --- Suppression ---
    if (event.target.classList.contains("btn-supprimer")) {
        const id = Number(event.target.dataset.id);
        const index = destinations.findIndex(function(d) {
            return d.id === id;
        });
        destinations.splice(index, 1);
        mettreAJourAffichage();
    }

    // --- Modification : ouverture de la modale ---
    if (event.target.classList.contains("btn-modifier")) {
        const id = Number(event.target.dataset.id);

        // Je retrouve la destination correspondante
        const destination = destinations.find(function(d) {
            return d.id === id;
        });

        // Je pré-remplis les champs de la modale avec les valeurs actuelles
        document.querySelector("#modif-lieu").value = destination.lieu;
        document.querySelector("#modif-pays").value = destination.pays;
        document.querySelector("#modif-continent").value = destination.continent;
        document.querySelector("#modif-type").value = destination.type;
        document.querySelector("#modif-statut").value = destination.statut;
        document.querySelector("#modif-date").value = destination.date;

        // Je stocke l'id dans le formulaire pour savoir quoi modifier au moment de la sauvegarde
        document.querySelector("#formulaire-modif").dataset.id = id;

        // J'affiche la modale
        document.querySelector("#modale").hidden = false;
    }
});

// Événement : sauvegarde de la modification depuis la modale
document.querySelector("#formulaire-modif").addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validerFormulaire("modif")) {
        return;
    }

    // Je retrouve la destination à modifier grâce à l'id stocké dans le formulaire
    const id = Number(document.querySelector("#formulaire-modif").dataset.id);
    const destination = destinations.find(function(d) {
        return d.id === id;
    });

    // Je mets à jour ses propriétés
    destination.lieu = document.querySelector("#modif-lieu").value.trim();
    destination.pays = document.querySelector("#modif-pays").value.trim();
    destination.continent = document.querySelector("#modif-continent").value;
    destination.type = document.querySelector("#modif-type").value;
    destination.statut = document.querySelector("#modif-statut").value;
    destination.date = document.querySelector("#modif-date").value;

    // Je ferme la modale et je réaffiche
    document.querySelector("#modale").hidden = true;
    mettreAJourAffichage();
});

// Événement : fermeture de la modale avec le bouton Annuler
document.querySelector("#btn-fermer-modale").addEventListener("click", function() {
    document.querySelector("#modale").hidden = true;
});

// Met à jour le compteur de destinations dans le header
function mettreAJourCompteur() {
    const total = destinations.length;
    const visitees = destinations.filter(function(d) {
        return d.statut === "Visité";
    }).length;
    const prevues = destinations.filter(function(d) {
        return d.statut === "Prévu";
    }).length;

    document.querySelector("#compteur").innerHTML = `
        <span>🌍 ${total} destinations</span>
        <span>✅ ${visitees} visitées</span>
        <span>🗓 ${prevues} prévues</span>
    `;
}

// Ouvre et ferme le formulaire d'ajout au clic
document.querySelector("#btn-toggle-formulaire").addEventListener("click", function() {
    const contenu = document.querySelector("#formulaire-contenu");
    const bouton = document.querySelector("#btn-toggle-formulaire");

    // Si caché on affiche, si affiché on cache
    if (contenu.hidden) {
        contenu.hidden = false;
        bouton.classList.add("ouvert");
    } else {
        contenu.hidden = true;
        bouton.classList.remove("ouvert");
    }
});

// Remet tous les filtres, la recherche et le tri à zéro en un clic
document.querySelector("#btn-reinitialiser").addEventListener("click", function() {
    // Je vide la barre de recherche
    document.querySelector("#recherche").value = "";

    // Je remets le filtre statut sur "Tous"
    boutonsFiltres.forEach(function(b) { b.classList.remove("actif"); });
    document.querySelector("[data-filtre='Tous']").classList.add("actif");

    // Je remets les selects sur leur valeur par défaut
    document.querySelector("#filtre-type").value = "";
    document.querySelector("#tri").value = "";

    mettreAJourAffichage();
});

// Affichage initial au chargement de la page
mettreAJourAffichage();

// Met à jour automatiquement l'année du copyright
document.querySelector("#annee").textContent = new Date().getFullYear();