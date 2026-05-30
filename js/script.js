"use strict";

// Données : mon tableau d'objets destinations
let destinations = [
    {
        id: 1,
        lieu: "Athènes",
        pays: "Grèce",
        continent: "Europe",
        type: "Ville",
        statut: "Visité",
        date: "2025",
        image: "images/athenes.jpg"
    },
    {
        id: 2,
        lieu: "Bali",
        pays: "Indonésie",
        continent: "Asie",
        type: "Mer",
        statut: "Prévu",
        date: "2028",
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
        date: "2026",
        image: "images/barcelone.jpg"
    },
    {
        id: 5,
        lieu: "Chamonix",
        pays: "France",
        continent: "Europe",
        type: "Montagne",
        statut: "Prévu",
        date: "2026",
        image: "images/chamonix.jpg"
    },
    {
        id: 6,
        lieu: "Côte Amalfitaine",
        pays: "Italie",
        continent: "Europe",
        type: "Mer",
        statut: "Prévu",
        date: "2029",
        image: "images/cote_amalfitaine_italie.jpg"
    },
    {
        id: 7,
        lieu: "Highlands",
        pays: "Écosse",
        continent: "Europe",
        type: "Nature",
        statut: "Visité",
        date: "2022",
        image: "images/highlands_ecosse.jpg"
    },
    {
        id: 8,
        lieu: "Islande",
        pays: "Islande",
        continent: "Europe",
        type: "Nature",
        statut: "Prévu",
        date: "2030",
        image: "images/islande.jpg"
    },
    {
        id: 9,
        lieu: "Londres",
        pays: "Royaume-Uni",
        continent: "Europe",
        type: "Ville",
        statut: "Prévu",
        date: "2026",
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
        statut: "Visité",
        date: "2022",
        image: "images/zermatt.jpg"
    }
];

// Compteur pour créer des ids uniques quand on ajoute une destination
let prochainId = 14;

// Id de la destination qui est en cours de modification (modale)
let idEnCoursDeModif = null;

// Filtre actif (statut)
// Je garde en mémoire quel bouton de statut est actif
let filtreStatutActif = "Tous";

// Classes CSS utilisées en JavaScript
const classeInvalide = "invalide";

// Fonctions d'affichage

// Je construis le HTML de la carte avec un template litéral
function creerCarteHTML(destination) {

    // Classe CSS du badge selon le statut
    let classeStatut = "prevu";

    if (destination.statut === "Visité") {
        classeStatut = "visite";
    }

    // Texte de la date selon le statut
    let texteDate = "";

    if (destination.statut === "Visité" && destination.date !== "") {
        texteDate = "Visité en " + destination.date;
    } else if (destination.statut === "Prévu" && destination.date !== "") {
        texteDate = "Prévu pour " + destination.date;
    }

    // Retour du HTML avec template literal
    return `
        <article class="carte-voyage" data-id="${destination.id}">

            <div class="carte-image">
                <img src="${destination.image}" alt="Photo de ${destination.lieu}">
                <span class="badge-type">${destination.type}</span>
            </div>

            <div class="carte-entete">

                <div class="carte-header-row">
                    <h3>${destination.lieu}</h3>

                    <span class="badge-statut ${classeStatut}">
                        ${destination.statut}
                    </span>
                </div>

                <p class="carte-pays">
                    ${destination.pays} — ${destination.continent}
                </p>

                ${texteDate !== ""? `<p class="carte-date">${texteDate}</p>`: ""}

                <div class="carte-footer">
                    <button class="btn-modifier" data-id="${destination.id}">
                        ✏️ Modifier
                    </button>

                    <button class="btn-supprimer" data-id="${destination.id}">
                        🗑 Supprimer
                    </button>
                </div>

            </div>

        </article>
    `;
}

// Affiche la liste des destinations dans la grille
function afficherDestinations(liste) {
    const grille = document.querySelector("#voyage-container");

    // Si aucun résultat, affiche un message
    if (liste.length === 0) {
        grille.innerHTML = '<p class="message-vide">Aucune destination trouvée 🌍</p>';
        return;
    }

    // Construction de tout le HTML d'abord dans une variable
    let html = "";

    for (const destination of liste) {
        html += creerCarteHTML(destination);
    }

    // Une seule écriture dans le DOM à la fin
    grille.innerHTML = html;
}

// Met à jour le compteur dans le header
function mettreAJourCompteur() {
    const total = destinations.length;

    // Je compte les destinations visitées et les prévues
    let nbVisitees = 0;
    let nbPrevues = 0;

    for (const d of destinations) {
        if (d.statut === "Visité") nbVisitees++;
        else if (d.statut === "Prévu") nbPrevues++;
    }

    document.querySelector("#compteur").innerHTML =
        '<span>🌍 ' + total + ' destinations</span>' +
        '<span>✅ ' + nbVisitees + ' visitées</span>' +
        '<span>🗓 ' + nbPrevues + ' prévues</span>';
}

// Fonction principale : applique filtres + tri et réaffichage
function rafraichir() {
    // Je lis les valeurs des contrôles
    const recherche = document.querySelector("#recherche").value.trim().toLowerCase();
    const filtreType = document.querySelector("#filtre-type").value;
    const critereTri = document.querySelector("#tri").value;

    // Je pars de tout le tableau
    let liste = destinations;

    // Filtre par recherche (lieu ou pays)
    if (recherche !== "") {
        liste = liste.filter(function(d) {
            return d.lieu.toLowerCase().includes(recherche)
                || d.pays.toLowerCase().includes(recherche)
                || d.continent.toLowerCase().includes(recherche);
        });
    }

    // Filtre par statut (Tous / Prévu / Visité)
    if (filtreStatutActif !== "Tous") {
        liste = liste.filter(function(d) {
            return d.statut === filtreStatutActif;
        });
    }

    // Filtre par type
    if (filtreType !== "") {
        liste = liste.filter(function(d) {
            return d.type === filtreType;
        });
    }

    // Tri : je fais une copie avec slice() pour ne pas modifier le tableau original
    // "fr" pour utiliser les règles de tri de la langue française (accents, ordre alphabétique)
    if (critereTri !== "") {
        liste = liste.slice().sort(function(a, b) {
            if (critereTri === "lieu") {
                return a.lieu.localeCompare(b.lieu, "fr");
            }
            if (critereTri === "pays") {
                return a.pays.localeCompare(b.pays, "fr");
            }
            if (critereTri === "continent") {
                return a.continent.localeCompare(b.continent, "fr");
            }
            if (critereTri === "date") {
                return Number(a.date || 9999) - Number(b.date || 9999);
            }
            if (critereTri === "statut") {
                return a.statut.localeCompare(b.statut, "fr");
            }
            return 0;
        });
    }

    afficherDestinations(liste);
    mettreAJourCompteur();
}

// Formulaire d'ajout

// Ouvre ou ferme le formulaire d'ajout
document.querySelector("#btn-toggle-formulaire").addEventListener("click", function() {
    const formulaire = document.querySelector("#formulaire-contenu");
    const bouton = document.querySelector("#btn-toggle-formulaire");

    if (formulaire.hidden) {
        formulaire.hidden = false;
        bouton.classList.add("ouvert");
        document.querySelector("#icone-toggle").textContent = "×";
    } else {
        formulaire.hidden = true;
        bouton.classList.remove("ouvert");
        document.querySelector("#icone-toggle").textContent = "+";
    }
});

// Vérifie qu'un champ texte/select n'est pas vide
// Retourne true si le champ est valide, false sinon
function validerChamp(idChamp, idErreur) {
    const champ = document.querySelector("#" + idChamp);
    const erreur = document.querySelector("#" + idErreur);

    if (champ.value.trim() === "") {
        champ.classList.add(classeInvalide);
        erreur.textContent = "Ce champ est obligatoire.";
        return false;
    } else {
        champ.classList.remove(classeInvalide);
        erreur.textContent = "";
        return true;
    }
}

// Soumission du formulaire d'ajout
document.querySelector("#formulaire-ajout").addEventListener("submit", function(event) {
    // Empêche l'envoi auto du formulaire
    event.preventDefault();

    // Vérifie chaque champ obligatoire
    let formulaireValide = true;

    if (!validerChamp("champ-lieu", "erreur-lieu")) formulaireValide = false;
    if (!validerChamp("champ-pays", "erreur-pays")) formulaireValide = false;
    if (!validerChamp("champ-continent", "erreur-continent")) formulaireValide = false;
    if (!validerChamp("champ-type", "erreur-type")) formulaireValide = false;
    if (!validerChamp("champ-statut", "erreur-statut")) formulaireValide = false;

    if (!formulaireValide) {
        return;
    }

    // Vérifie que l'année n'est pas dans le passé si le statut est "Prévu"
    const annee = document.querySelector("#champ-date").value;
    const statut = document.querySelector("#champ-statut").value;
    const anneeActuelle = new Date().getFullYear();

    if (statut === "Prévu" && annee !== "" && Number(annee) < anneeActuelle) {
        document.querySelector("#champ-date").classList.add(classeInvalide);
        document.querySelector("#erreur-date").textContent = "L'année doit être " + anneeActuelle + " ou plus.";
        return;
    }

    // Si l'année est valide, efface l'éventuel message d'erreur
    document.querySelector("#erreur-date").textContent = "";

    // Crée un nouvel objet avec les valeurs saisies
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

    prochainId++;

    // Ajoute la destination au tableau
    destinations.push(nouvelleDestination);

    // Remet le formulaire à zéro et le ferme
    document.querySelector("#formulaire-ajout").reset();
    document.querySelector("#formulaire-contenu").hidden = true;
    document.querySelector("#btn-toggle-formulaire").classList.remove("ouvert");
    document.querySelector("#icone-toggle").textContent = "+";

    // Message de confirmation
    const msg = document.querySelector("#message-confirmation");
    msg.textContent = "✅ " + nouvelleDestination.lieu + " a été ajouté !";
    msg.hidden = false;

    setTimeout(function() {
        msg.hidden = true;
    }, 3000);

    rafraichir();

    // Fait défiler jusqu'à la dernière carte ajoutée
    const toutesLesCartes = document.querySelectorAll(".carte-voyage");
    const derniereCarte = toutesLesCartes[toutesLesCartes.length - 1];
    if (derniereCarte) {
        derniereCarte.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}
});

// Suppression et modification

// J'écoute les clics sur le conteneur plutôt que sur chaque bouton,
// parce que les boutons sont créés dynamiquement (ils n'existent pas au chargement)
document.querySelector("#voyage-container").addEventListener("click", function(event) {

// Suppression
    const boutonSupprimer = event.target.closest(".btn-supprimer");

    if (boutonSupprimer !== null) {
        const id = Number(boutonSupprimer.dataset.id);

        // Je retrouve la destination à supprimer
        const destinationASupprimer = destinations.find(destination => destination.id === id);

        if (destinationASupprimer !== undefined) {
            const nomDestination = destinationASupprimer.lieu;

            // Je demande une confirmation avant de supprimer
            if (!confirm("Voulez-vous vraiment supprimer la destination « " + nomDestination + " » ?")) {
                return;
            }

            // Je garde toutes les destinations sauf celle à supprimer
            destinations = destinations.filter(destination => destination.id !== id);

            rafraichir();

            // Affiche un message de confirmation pendant 3 secondes
            const msg = document.querySelector("#message-confirmation");
            msg.textContent = "🗑 " + nomDestination + " a été supprimé.";
            msg.hidden = false;

            setTimeout(function() {
                msg.hidden = true;
            }, 3000);
        }
    }

    // Ouverture de la modale
    const boutonModifier = event.target.closest(".btn-modifier");

    if (boutonModifier !== null) {
        const id = Number(boutonModifier.dataset.id);

        // Je retrouve la destination à modifier
        const destinationAModifier = destinations.find(destination => destination.id !== id);

        if (destinationAModifier !== undefined) {
            // Je mémorise l'id qu'on modifie
            idEnCoursDeModif = id;

            // Je pré-remplis les champs de la modale
            document.querySelector("#modif-lieu").value = destinationAModifier.lieu;
            document.querySelector("#modif-pays").value = destinationAModifier.pays;
            document.querySelector("#modif-continent").value = destinationAModifier.continent;
            document.querySelector("#modif-type").value = destinationAModifier.type;
            document.querySelector("#modif-statut").value = destinationAModifier.statut;
            document.querySelector("#modif-date").value = destinationAModifier.date;
            document.querySelector("#modif-image").value = destinationAModifier.image;

            // J'affiche la modale
            document.querySelector("#modale").hidden = false;
        }
    }
});

// Modale de modification

// Sauvegarde les modifications
document.querySelector("#formulaire-modif").addEventListener("submit", function(event) {
    event.preventDefault();

    // Vérification que l'année n'est pas dans le passé si le statut est "Prévu"
    const anneeModif = document.querySelector("#modif-date").value;
    const statutModif = document.querySelector("#modif-statut").value;
    const anneeActuelle = new Date().getFullYear();

    if (statutModif === "Prévu" && anneeModif !== "" && Number(anneeModif) < anneeActuelle) {
        document.querySelector("#modif-date").classList.add(classeInvalide);
        return;
    }
    document.querySelector("#modif-date").classList.remove(classeInvalide);

    // Je retrouve la destination grâce à l'id mémorisé
    const destinationAModifier = destinations.find(destination => destination.id === idEnCoursDeModif);

    if (destinationAModifier !== undefined) {
        destinationAModifier.lieu = document.querySelector("#modif-lieu").value.trim();
        destinationAModifier.pays = document.querySelector("#modif-pays").value.trim();
        destinationAModifier.continent = document.querySelector("#modif-continent").value;
        destinationAModifier.type = document.querySelector("#modif-type").value;
        destinationAModifier.statut = document.querySelector("#modif-statut").value;
        destinationAModifier.date = document.querySelector("#modif-date").value;
        destinationAModifier.image = document.querySelector("#modif-image").value || "images/defaut.jpg";
    }

    // Fermeture de la modale et affichage rafraîchi
    document.querySelector("#modale").hidden = true;
    idEnCoursDeModif = null;
    rafraichir();
});

// Fermeture de la modale avec le bouton Annuler
document.querySelector("#btn-fermer-modale").addEventListener("click", function() {
    document.querySelector("#modale").hidden = true;
    idEnCoursDeModif = null;
});

// Filtres, recherche et tri

// Recherche en temps réel
document.querySelector("#recherche").addEventListener("input", function() {
    rafraichir();
});

// Filtres par statut (boutons Tous / Prévu / Visité)
const boutonsFiltres = document.querySelectorAll(".btn-filtre[data-filtre]");

for (let i = 0; i < boutonsFiltres.length; i++) {
    boutonsFiltres[i].addEventListener("click", function() {
        // Retrait de la classe actif de tous les boutons
        for (let j = 0; j < boutonsFiltres.length; j++) {
            boutonsFiltres[j].classList.remove("actif");
        }
        // Ajout de la classe sur le bouton cliqué
        this.classList.add("actif");

        // Mémorisation du filtre actif
        filtreStatutActif = this.dataset.filtre;

        rafraichir();
    });
}

// Filtre par type
document.querySelector("#filtre-type").addEventListener("change", function() {
    rafraichir();
});

// Tri
document.querySelector("#tri").addEventListener("change", function() {
    rafraichir();
});

// Réinitialisation de tous les filtres
document.querySelector("#btn-reinitialiser").addEventListener("click", function() {
    document.querySelector("#recherche").value = "";

    // Remet le bouton "Tous" comme actif
    for (let i = 0; i < boutonsFiltres.length; i++) {
        boutonsFiltres[i].classList.remove("actif");
    }
    document.querySelector("[data-filtre='Tous']").classList.add("actif");
    filtreStatutActif = "Tous";

    document.querySelector("#filtre-type").value = "";
    document.querySelector("#tri").value = "";

    rafraichir();
});

// Initialisation au chargement de la page

// Affichage initial
rafraichir();

// Année dans le footer
document.querySelector("#annee").textContent = String(new Date().getFullYear());