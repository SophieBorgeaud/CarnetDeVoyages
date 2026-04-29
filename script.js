"use strict";

// Données : mon tableau d'objets destinations

const destinations = [
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

// Id de la destination qu'on est en train de modifier (modale)
let idEnCoursDeModif = null;


// --- Filtre actif (statut) ---
// Je garde en mémoire quel bouton de statut est actif
let filtreStatutActif = "Tous";


// FONCTIONS D'AFFICHAGE

// Crée le HTML d'une carte à partir d'un objet destination
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

    // Je construis le HTML de la carte avec un template litéral
    let html = '<article class="voyage-card">';
    html += '<div class="card-image-wrapper">';
    html += '<img src="' + destination.image + '" alt="Photo de ' + destination.lieu + '">';
    html += '<span class="badge-type">' + destination.type + '</span>';
    html += '</div>';
    html += '<div class="card-body">';
    html += '<div class="card-header-row">';
    html += '<h3>' + destination.lieu + '</h3>';
    html += '<span class="badge-statut ' + classeStatut + '">' + destination.statut + '</span>';
    html += '</div>';
    html += '<p class="card-pays">' + destination.pays + ' — ' + destination.continent + '</p>';

    if (texteDate !== "") {
        html += '<p class="card-date">' + texteDate + '</p>';
    }

    html += '<div class="card-footer">';
    html += '<button class="btn-modifier" data-id="' + destination.id + '">✏️ Modifier</button>';
    html += '<button class="btn-supprimer" data-id="' + destination.id + '">🗑 Supprimer</button>';
    html += '</div>';
    html += '</div>';
    html += '</article>';

    return html;
}


// Affiche la liste des destinations dans la grille
function afficherDestinations(liste) {
    const grille = document.querySelector("#voyage-container");

    // Si aucun résultat, on affiche un message
    if (liste.length === 0) {
        grille.innerHTML = '<p class="message-vide">Aucune destination trouvée 🌍</p>';
        return;
    }

    // On vide la grille et on la remplit avec les nouvelles cartes
    grille.innerHTML = "";

    for (const destination of liste) {
        grille.innerHTML += creerCarteHTML(destination);
    }
}


// Met à jour le compteur dans le header
function mettreAJourCompteur() {
    const total = destinations.length;

    // Je filtre pour compter les visitées et les prévues
    const visitees = destinations.filter(function(d) {
        return d.statut === "Visité";
    });

    const prevues = destinations.filter(function(d) {
        return d.statut === "Prévu";
    });

    document.querySelector("#compteur").innerHTML =
        '<span>🌍 ' + total + ' destinations</span>' +
        '<span>✅ ' + visitees.length + ' visitées</span>' +
        '<span>🗓 ' + prevues.length + ' prévues</span>';
}


// Fonction principale : applique filtres + tri et réaffiche
function rafraichir() {
    // Je lis les valeurs des contrôles
    const recherche = document.querySelector("#recherche").value.toLowerCase();
    const filtreType = document.querySelector("#filtre-type").value;
    const critèreTri = document.querySelector("#tri").value;

    // Je pars de tout le tableau
    let liste = destinations;

    // 1. Filtre par recherche (lieu ou pays)
    if (recherche !== "") {
        liste = liste.filter(function(d) {
            return d.lieu.toLowerCase().includes(recherche)
                || d.pays.toLowerCase().includes(recherche);
        });
    }

    // 2. Filtre par status
    if (filtreStatutActif !== "Tous") {
        liste = liste.filter(function(d) {
            return d.statut === filtreStatutActif;
        });
    }

    // 3. Filtre par type
    if (filtreType !== "") {
        liste = liste.filter(function(d) {
            return d.type === filtreType;
        });
    }

    // 4. Tri : je fais une copie avec slice() pour ne pas modifier le tableau original
    if (critèreTri !== "") {
        liste = liste.slice().sort(function(a, b) {
            if (critèreTri === "lieu") {
                if (a.lieu < b.lieu) return -1;
                if (a.lieu > b.lieu) return 1;
                return 0;
            }
            if (critèreTri === "pays") {
                if (a.pays < b.pays) return -1;
                if (a.pays > b.pays) return 1;
                return 0;
            }
            if (critèreTri === "continent") {
                if (a.continent < b.continent) return -1;
                if (a.continent > b.continent) return 1;
                return 0;
            }
            if (critèreTri === "date") {
                return a.date - b.date;
            }
            if (critèreTri === "statut") {
                if (a.statut < b.statut) return -1;
                if (a.statut > b.statut) return 1;
                return 0;
            }
            return 0;
        });
    }

    afficherDestinations(liste);
    mettreAJourCompteur();
}


// FORMULAIRE D'AJOUT

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
        champ.classList.add("invalide");
        erreur.textContent = "Ce champ est obligatoire.";
        return false;
    } else {
        champ.classList.remove("invalide");
        erreur.textContent = "";
        return true;
    }
}


// Soumission du formulaire d'ajout
document.querySelector("#formulaire-ajout").addEventListener("submit", function(event) {
    // On empêche le rechargement de la page
    event.preventDefault();

    // On vérifie chaque champ obligatoire
    let formulaireValide = true;

    if (!validerChamp("champ-lieu", "erreur-lieu")) formulaireValide = false;
    if (!validerChamp("champ-pays", "erreur-pays")) formulaireValide = false;
    if (!validerChamp("champ-continent", "erreur-continent")) formulaireValide = false;
    if (!validerChamp("champ-type", "erreur-type")) formulaireValide = false;
    if (!validerChamp("champ-statut", "erreur-statut")) formulaireValide = false;

    if (!formulaireValide) {
        return;
    }

    // On vérifie que l'année n'est pas dans le passé si le statut est "Prévu"
    const annee = document.querySelector("#champ-date").value;
    const statut = document.querySelector("#champ-statut").value;
    const anneeActuelle = new Date().getFullYear();

    if (statut === "Prévu" && annee !== "" && Number(annee) < anneeActuelle) {
        document.querySelector("#champ-date").classList.add("invalide");
        document.querySelector("#erreur-date").textContent = "L'année doit être " + anneeActuelle + " ou plus.";
        return;
    }

    // Si l'année est valide, on efface l'éventuell message d'erreur
    document.querySelector("#erreur-date").textContent = "";

    // On crée un nouvel objet avec les valeurs saisies
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

    // On ajoute la destination au tableau
    destinations.push(nouvelleDestination);

    // On remet le formulaire à zéro et on le ferme
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
});


// SUPPRESSION ET MODIFICATION

// J'écoute les clics sur le conteneur plutôt que sur chaque bouton,
// parce que les boutons sont créés dynamiquement (ils n'existent pas au chargement)
document.querySelector("#voyage-container").addEventListener("click", function(event) {

    // Suppression
    if (event.target.classList.contains("btn-supprimer")) {
        const id = Number(event.target.dataset.id);

        // Trouver la destination dans le tableau
        let indexASupprimer = -1;
        for (let i = 0; i < destinations.length; i++) {
            if (destinations[i].id === id) {
                indexASupprimer = i;
            }
        }

        if (indexASupprimer !== -1) {
            const nomDestination = destinations[indexASupprimer].lieu;

            // Je demande une confirmation avant de supprimer
            if (!confirm("Supprimer " + nomDestination + " ?")) {
                return;
            }


            destinations.splice(indexASupprimer, 1);
            rafraichir();

            // On affiche un message de confirmation pendant 3 secondes
            const msg = document.querySelector("#message-confirmation");
            msg.textContent = "🗑 " + nomDestination + " a été supprimé.";
            msg.hidden = false;

            setTimeout(function() {
                msg.hidden = true;
            }, 3000);
        }
    }

    // Ouverture de la modale
    if (event.target.classList.contains("btn-modifier")) {
        const id = Number(event.target.dataset.id);

        // Je retrouve la destination à modifier
        let destinationAModifier = null;
        for (let i = 0; i < destinations.length; i++) {
            if (destinations[i].id === id) {
                destinationAModifier = destinations[i];
            }
        }

        if (destinationAModifier !== null) {
            // Je mémorise l'id qu'on modifie
            idEnCoursDeModif = id;

            // Je pré-remplis les champs de la modale
            document.querySelector("#modif-lieu").value = destinationAModifier.lieu;
            document.querySelector("#modif-pays").value = destinationAModifier.pays;
            document.querySelector("#modif-continent").value = destinationAModifier.continent;
            document.querySelector("#modif-type").value = destinationAModifier.type;
            document.querySelector("#modif-statut").value = destinationAModifier.statut;
            document.querySelector("#modif-date").value = destinationAModifier.date;

            // J'affiche la modale
            document.querySelector("#modale").hidden = false;
        }
    }
});


// MODALE DE MODIFICATION

// Sauvegarde les modifications
document.querySelector("#formulaire-modif").addEventListener("submit", function(event) {
    event.preventDefault();

    // Vérification que l'année n'est pas dans le passé si le statut est "Prévu"
    const anneeModif = document.querySelector("#modif-date").value;
    const statutModif = document.querySelector("#modif-statut").value;
    const anneeActuelle = new Date().getFullYear();

    if (statutModif === "Prévu" && anneeModif !== "" && Number(anneeModif) < anneeActuelle) {
        document.querySelector("#modif-date").classList.add("invalide");
        return;
    }
    document.querySelector("#modif-date").classList.remove("invalide");

    // Je retrouve la destination grâce à l'id mémorisé
    let destinationAModifier = null;
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].id === idEnCoursDeModif) {
            destinationAModifier = destinations[i];
        }
    }

    if (destinationAModifier !== null) {
        // Je mets à jour les propriétés de l'objet
        destinationAModifier.lieu = document.querySelector("#modif-lieu").value.trim();
        destinationAModifier.pays = document.querySelector("#modif-pays").value.trim();
        destinationAModifier.continent = document.querySelector("#modif-continent").value;
        destinationAModifier.type = document.querySelector("#modif-type").value;
        destinationAModifier.statut = document.querySelector("#modif-statut").value;
        destinationAModifier.date = document.querySelector("#modif-date").value;
    }

    // On ferme la modale et on réaffiche
    document.querySelector("#modale").hidden = true;
    idEnCoursDeModif = null;
    rafraichir();
});


// Ferme la modale avec le bouton Annuler
document.querySelector("#btn-fermer-modale").addEventListener("click", function() {
    document.querySelector("#modale").hidden = true;
    idEnCoursDeModif = null;
});


// FILTRES, RECHERCHE ET TRI

// Recherche en temps réel
document.querySelector("#recherche").addEventListener("input", function() {
    rafraichir();
});

// Filtres par statut (boutons Tous / Prévu / Visité)
const boutonsFiltres = document.querySelectorAll(".btn-filtre[data-filtre]");

for (let i = 0; i < boutonsFiltres.length; i++) {
    boutonsFiltres[i].addEventListener("click", function() {
        // On retire la classe actif de tous les boutons
        for (let j = 0; j < boutonsFiltres.length; j++) {
            boutonsFiltres[j].classList.remove("actif");
        }
        // On l'ajoute sur le bouton cliqué
        this.classList.add("actif");

        // On mémorise le filtre actif
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

// INITIALISATION AU CHARGEMENT DE LA PAGE

// Affichage initial
rafraichir();

// Année dans le footer
document.querySelector("#annee").textContent = new Date().getFullYear();