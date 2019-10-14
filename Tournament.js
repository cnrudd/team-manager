const utils = require('./utils');

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
  playRoundAsync(count) {
    if (count == this.rounds) {
      return;
    }
    const enemyOffense = utils.randomNumber(20, 1);
    const enemyDefense = utils.randomNumber(20, 1);
    const myOffensivePower = this.calcPower('offense');
    const myDefensivePower = this.calcPower('defense');

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

  /**
   *
   * @param {string} side property (offense | defense)
   * @return {number} sum of the team's players' [side] stat
   */
  calcPower(side) {
    return this.team[side]
        .map((it) => it.defense)
        .reduce((sum, it) => sum + it);
  }
}

module.exports = Tournament;
