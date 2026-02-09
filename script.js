import Terrain from "./classes/terrain.js";
import Joueur from "./classes/joueur.js";

// ========= FONCTIONS PRINCIPALES =========
/**
 * Crée une liste de terrains numérotés.
 * @param {number} nbTerrains - Nombre de terrains à créer
 * @returns {Terrain[]} Tableau de terrains instanciés
 */
function creerTerrains(nbTerrains) {
  let Terrains = [];
  for (let i = 1; i <= nbTerrains; i++) {
    Terrains.push(new Terrain(i));
    console.log(`Terrain ${i} créé`);
  }
  return Terrains;
}

/**
 * Crée une nouvelle instance de joueur.
 * @param {string} nom - Nom du joueur
 * @param {string} sexe - Sexe du joueur
 * @returns {Joueur} Nouveau joueur
 */
function ajouterJoueur(nom, sexe) {
  const nouveauJoueur = new Joueur(nom, sexe);
  return nouveauJoueur;
}

/**
 * Recherche l’index d’un joueur dans une liste par son nom.
 * @param {string} nom - Nom du joueur à supprimer
 * @param {Joueur[]} listeJoueurs - Liste des joueurs
 * @returns {number} Index du joueur ou -1 si non trouvé
 */
function enleverJoueur(nom, listeJoueurs) {
  // Logique pour enlever un joueur de la liste des joueurs
  for (let i = 0; i < listeJoueurs.length; i++) {
    if (listeJoueurs[i].nom === nom) {
      return i; // Retourne l'index du joueur à supprimer
    }
  }
  return -1; // Retourne -1 si le joueur n'est pas trouvé
}

/**
 * Calcule la répartition optimale des matchs de badminton :
 * priorité aux doubles (4 joueurs), puis un simple si ≥ 2 restants.
 * @param {Joueur[]} joueurs - Liste des joueurs disponibles
 * @returns {{
 *   nbDoubles: number,
 *   nbSimples: number,
 *   nbTerrains: number
 * }} Statistiques de répartition des matchs
 */
function calculerMatchs(joueurs) {
  const nbDoubles = Math.floor(joueurs.length / 4);
  const reste = joueurs.length % 4;

  let nbSimples = 0;
  if (reste >= 2) {
    nbSimples = 1;
  }

  return {
    nbDoubles,
    nbSimples,
    nbTerrains: nbDoubles + nbSimples,
  };
}

/**
 * Génère les matchs en priorité doubles, puis simples si reste.
 * @param {Joueur[]} joueurs - Liste des joueurs disponibles
 */
function genererMatchs(joueurs) {
  // Calcul de la répartition
  const repartition = calculerMatchs(joueurs);

  // Crée ou recrée les terrains nécessaires
  let terrains = creerTerrains(repartition.nbTerrains);

  console.log(`Répartition : ${repartition.nbDoubles} doubles, ${repartition.nbSimples} simples, ${repartition.nbTerrains} terrains nécessaires.`);

  return terrains;
}

// ========= PROGRAMME PRINCIPAL =========
let joueurs = [1, 2, 3, 4, 5, 6, 7];

document.addEventListener("DOMContentLoaded", () => {
  let modalAjouterJoueur = document.getElementById("modalAjouterJoueur");
  modalAjouterJoueur.addEventListener("click", () => {
    // Récupérer les valeurs du formulaire
    let nomJoueur = document.getElementById("nomJoueurAjout").value;
    let sexeJoueur = document.getElementById("sexeJoueur").value;

    // Vérifier si le joueur existe déjà
    for (let joueur of joueurs) {
      if (joueur.nom === nomJoueur) {
        console.log(`Le joueur ${nomJoueur} existe déjà.`);
        return;
      }
    }
    // Ajouter le joueur à la liste des joueurs
    joueurs.push(ajouterJoueur(nomJoueur, sexeJoueur));

    // Réinitialiser les champs du formulaire
    document.getElementById("nomJoueurAjout").value = "";
    document.getElementById("sexeJoueur").value = "";
  });

  let modalSupprimerJoueur = document.getElementById("modalSupprimerJoueur");
  modalSupprimerJoueur.addEventListener("click", () => {
    // Récupérer le nom du joueur à supprimer
    let nomJoueur = document.getElementById("nomJoueurSuppression").value;

    let index = enleverJoueur(nomJoueur, joueurs);
    // Vérifier si le joueur existe
    if (index === -1) {
      console.log(`Joueur ${nomJoueur} non trouvé.`);
      return;
    }
    // Enlever le joueur de la liste des joueurs
    joueurs.splice(index, 1);

    // Réinitialiser le champ du formulaire
    document.getElementById("nomJoueurSuppression").value = "";
  });

  document.getElementById("genTerrains").addEventListener("click", () => {
    console.log("Matchs générés avec les joueurs disponibles.");
    genererMatchs(joueurs);
  });
});
