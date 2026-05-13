# Carnet de voyages
Projet JavaScript - Cours 122 (ESIG)

## Description

J'ai créé une application web pour gérer mes destinations de voyage. J'ai choisi
ce thème car les voyages me passionnent et je voulais un endroit pour
noter mes destinations visitées et celles que je rêve de faire un jour.
Le site permet de visualiser toutes les destinations sous forme de cartes,
de les filtrer, les trier, d'en ajouter de nouvelles et de les supprimer.

## Lien GitHub Pages

https://sophieborgeaud.github.io/CarnetDeVoyages/

## Fonctionnalités

- Affichage dynamique de la liste (cartes avec image, lieu, pays, statut visité/prévu, date prévue)
- Tri par lieu, pays, continent, date et statut
- Recherche en temps réel par lieu ou pays
- Filtrage par statut (Tous / Prévu / Visité) et par type (Ville, Mer, Montagne, Nature)
- Ajout via formulaire avec validation des champs obligatoires
- Suppression avec confirmation
- Modification d'une destination existante
- Responsive (mobile + desktop)
- Message de feedback après ajout et suppression
- Validation de l'année (impossible de prévoir une date dans le passé)

## Captures d'écrans

![Accueil du site](screenshots/Screenshot_Site.png)

![Formulaire d'ajout](screenshots/Screenshot_FormulaireAjout.png)

## Transparence IA

### Outils utilisés

- Claude (Anthropic)
- ChatGPT (OpenAI)

J'ai utilisé ces outils comme une assistance technique et d'apprentissage durant le développement du projet.

### Prompts utilisés

- "Génère un tableau de 13 destinations de voyage avec id, lieu, pays, continent, type, statut, date, image. Voici les noms de lieux à utiliser :..."
- "Aide-moi à créer une fenêtre modale pour ajouter une destination"
- "Comment faire pour que les boutons supprimer et modifier fonctionnent sur des cartes créées dynamiquement ?"
- "Aide-moi à ajouter une validation empêchant de sélectionner une date passée pour une destination prévue"
- "Aide-moi à faire que la dernière destination ajoutée soit affichée en premier dans la liste"
- "Aide-moi à créer un compteur dans le menu de navigation qui affiche le nombre de destinations prévues et visitées"

### Ce que j'ai appris vs ce que l'IA a généré

L’IA a été utilisée principalement pour proposer des structures de code, expliquer certaines syntaxes JavaScript et suggérer des améliorations visuelles ou organisationnelles dans mon code.

Le projet a ensuite été adapté et simplifié afin de correspondre aux notions vues en cours et à ma compréhension actuelle du JavaScript.

J'ai appris à manipuler le DOM, à créer des éléments dynamiquement, à gérer les événements et à structurer mon code de manière plus claire. J'ai également amélioré mes compétences en HTML et CSS depuis le semestre passé pour rendre le site plus attrayant et fonctionnel.
