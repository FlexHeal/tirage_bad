export default class Joueur {
  constructor(nom, sexe) {
    this.nom = nom;
    this.sexe = sexe;
    this.partenaires = [];
    this.score = 0;
    this.nbMatchs = 0;
  }

  static fromJSON(data) {
    const j = new Joueur(data.nom, data.sexe);
    j.nbMatchs = data.nbMatchs;
    return j;
  }

  ajouterScore() {
    this.score += 1;
  }

  ajouterMatch() {
    this.nbMatchs += 1;
  }

  ajouterPartenaire(partenaire) {
    this.partenaires.push(partenaire);
  }
}
