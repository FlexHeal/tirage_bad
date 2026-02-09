import Terrain from "./classes/terrain.js";
import Joueur from "./classes/joueur.js";

const joueur1 = new Joueur("Alice");


// ========= FONCTIONS PRINCIPALES =========
function creerTerrains(nbTerrains) {
  let Terrains = [];
  for (let i = 1; i <= nbTerrains; i++) {
    Terrains.push(new Terrain(i));
    console.log(`Terrain ${i} créé`);
  }
  return Terrains;
}

function ajouterJoueur(nom, sexe) {
  const nouveauJoueur = new Joueur(nom, sexe);
  console.log(`Joueur ${nom} ajouté avec succès.`);
  return nouveauJoueur;
}

function enleverJoueur(nom) {
  // Logique pour enlever un joueur de la liste des joueurs
  console.log(`Joueur ${nom} supprimé avec succès.`);
}


// ========= PROGRAMME PRINCIPALES =========
let nbTerrainsInput = document.getElementById("nbTerrains");
nbTerrainsInput.addEventListener("change", (event) => {
  creerTerrains(event.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
  creerTerrains(nbTerrainsInput.value);

  let modalAjouterJoueur = document.getElementById("modalAjouterJoueur");
  modalAjouterJoueur.addEventListener("click", () => {
    let nomJoueur = document.getElementById("nomJoueurAjout").value;
    let sexeJoueur = document.getElementById("sexeJoueur").value;
    ajouterJoueur(nomJoueur, sexeJoueur);
    document.getElementById("nomJoueurAjout").value = "";
    document.getElementById("sexeJoueur").value = "";
  });

  let modalSupprimerJoueur = document.getElementById("modalSupprimerJoueur");
  modalSupprimerJoueur.addEventListener("click", () => {
    let nomJoueur = document.getElementById("nomJoueurSuppression").value;
    enleverJoueur(nomJoueur);
    document.getElementById("nomJoueurSuppression").value = "";
  });
});