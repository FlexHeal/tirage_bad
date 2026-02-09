/**
 * Représente un joueur avec score, historique de matchs et partenaires.
 */
export default class Joueur {
  constructor(nom, sexe) {
    this.nom = nom;
    this.sexe = sexe;
    this.partenaires = [];
    this.score = 0;
    this.nbMatchs = 0;
  }

  /**
   * Reconstruit une instance Joueur depuis des données JSON.
   * @param {Object} data
   * @returns {Joueur}
   */
  static fromJSON(data) {
    const j = new Joueur(data.nom, data.sexe);
    j.nbMatchs = data.nbMatchs;
    j.score = data.score;
    j.partenaires = data.partenaires.map((p) => Joueur.fromJSON(p));
    return j;
  }

  /**
   * Incrémente le score du joueur de 1.
   */
  ajouterScore() {
    this.score++;
  }

  /**
   * Incrémente le nombre de matchs joués.
   */
  ajouterMatch() {
    this.nbMatchs++;
  }

  /**
   * Ajoute un partenaire à l’historique du joueur.
   * @param {Joueur|string} partenaire - Joueur ou nom du partenaire
   */
  ajouterPartenaire(partenaire) {
    this.partenaires.push(partenaire);
  }
}
