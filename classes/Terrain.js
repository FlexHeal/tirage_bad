/**
 * Représente un terrain de badminton pouvant accueillir un match.
 */
export default class Terrain {
  constructor(numeroTerrain) {
    this.joueurs = [];
    this.numeroTerrain = numeroTerrain;
  }

  /**
   * Crée un match simple (1v1) sur le terrain.
   * Refuse si le terrain est déjà occupé.
   * @param {Joueur} joueur1
   * @param {Joueur} joueur2
   */
  creerMatchSimple(joueurs1, joueurs2) {
    if (this.joueurs.length > 0) {
      console.log("Le terrain est déjà occupé.");
      return;
    }

    this.joueurs.push(joueurs1);
    this.joueurs.push(joueurs2);

    joueurs1.ajouterMatch();
    joueurs2.ajouterMatch();
  }

  /**
   * Crée un match double (2v2) sur le terrain.
   * Met à jour le nombre de matchs et les partenaires.
   * Refuse si le terrain est déjà occupé.
   * @param {Joueur[]} equipe1 - Tableau de 2 joueurs
   * @param {Joueur[]} equipe2 - Tableau de 2 joueurs
   */
  creerMatchDouble(equipe1, equipe2) {
    if (this.joueurs.length > 0) {
      console.log("Le terrain est déjà occupé.");
      return;
    }

    this.joueurs.push(...equipe1);
    this.joueurs.push(...equipe2);

    for (let i = 0; i < equipe1.length; i++) {
      equipe1[i].ajouterMatch();
      equipe1[i].ajouterPartenaire(equipe1[(i + 1) % equipe1.length]);
    }

    for (let i = 0; i < equipe2.length; i++) {
      equipe2[i].ajouterMatch();
      equipe2[i].ajouterPartenaire(equipe2[(i + 1) % equipe2.length]);
    }
  }

  /**
   * Libère le terrain en supprimant tous les joueurs du match.
   */
  terminerMatch() {
    this.joueurs = [];
  }

  /**
   * Génère le HTML pour afficher le terrain et les joueurs présents. 
   */
  genererHTML() {
    // A faire
    if (this.joueurs.length === 0) {
      return; // Ne rien faire si le terrain est vide
    }
    const terrainContainer = document.getElementById("terrains");

    return;
  }
}
