/**
 * A tournament that consissts of playing N rounds
 */
class Tournament {
  /**
     *
     * @param {Team} team a object of type Team
     * @param {number} rounds number of rounds to play in tournament
     */
  constructor(team, rounds) {
    this.team = team;
    this.rounds = rounds;
    this.score = 0;
  }
  /**
 *
 * start tournament
 */
  playTournament() {
    this.playRound(0, this.rounds);
    console.log('tournament score:', this.score);

    let outcome;

    if (this.score < 0) {
      outcome = 'lost';
    } else if (this.score > 0) {
      outcome = 'won';
    } else {
      outcome = 'tied';
    }

    console.log(
        `Your team ${outcome}!`
    );

    this.team.starters.forEach((player) => {
      if (this.score > 0) player.goodGame();
      else if (this.score < 0) player.badGame();
      player.printStats();
    });
  }


  /**
 *
 * @param {*} count
 */
  playRound(count) {
    if (count == this.rounds) {
      return;
    }
    const rando = () => Math.ceil(Math.random() * 20);
    const enemyOffense = rando();
    const enemyDefense = rando();
    const myOffensivePower = this.team.starters
        .map((it) => it.offense)
        .reduce((sum, it) => sum + it);

    const myDefensivePower = this.team.starters
        .map((it) => it.defense)
        .reduce((sum, it) => sum + it);

    let change = 0;
    if (enemyOffense < myOffensivePower) change = 1;
    if (enemyDefense > myDefensivePower) change = -1;
    const outcome = change == 0 ? 'tied' :
      change == 1 ? 'won' :
      'lost';

    this.score += change;
    console.log(`Round ${count}: you ${outcome}`);

    count++;


    if (change) {
      // doSubbing();
    } else {
      this.playRound(count);
    }
  };
}

module.exports = Tournament;
