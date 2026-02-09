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
    j.score = data.score;
    j.partenaires = data.partenaires.map(p => Joueur.fromJSON(p));
    return j;
  }

  ajouterScore() {
    this.score++;
  }

  ajouterMatch() {
    this.nbMatchs++;
  }

  ajouterPartenaire(partenaire) {
    this.partenaires.push(partenaire);
  }
}
