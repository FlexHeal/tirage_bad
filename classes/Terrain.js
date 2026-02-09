export default class Terrain {
  constructor(numeroTerrain) {
    this.joueurs = [];
    this.numeroTerrain = numeroTerrain;
  }

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

  terminerMatch() {
    this.joueurs = [];
  }
}
