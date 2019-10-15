const inquirer = require('inquirer');

const promptSets = require('../promptSets');
const utils = require('../utils');

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
    this.totalScore = 0;
  }
  /**
 *
 * start tournament
 * @return {Promise}
 */
  playTournamentAsync() {
    console.log(`
-------------
The tournament is starting!
-------------
    `);

    const roundsToPlay = [];
    for (let i = 0; i < this.rounds; i++) {
      roundsToPlay.push(() => this.playRoundAsync(i + 1));
    }

    return utils.runPromisesInSeries(roundsToPlay)
        .then(() => this.solveTournamentOutcome());
  }

  /**
   * Calculate total score and whether team won/lost/tied
   * after all rounds have been played
   */
  solveTournamentOutcome() {
    let outcome;

    // could be rewritten with ternary
    if (this.totalScore < 0) {
      outcome = 'LOST';
    } else if (this.totalScore > 0) {
      outcome = 'WON';
    } else {
      outcome = 'TIED';
    }

    console.log(`
-------------
Tournament score: ${this.totalScore}
Your team ${outcome} the tournament!
-------------
    `);

    console.log(`
Here are your players' updated stats:
-------------------------------------
`);

    this.team.starters.forEach((player) => {
      if (this.totalScore > 0) player.goodGame();
      else if (this.totalScore < 0) player.badGame();
      player.printStats();
    });
  }

  /**
 *
 * @param {*} count
 * @return {Promise}
 */
  playRoundAsync(count) {
    const enemyOffense = utils.randomNumber(20, 1);
    const enemyDefense = utils.randomNumber(20, 1);
    const myOffensivePower = this.calcPower('offense');
    const myDefensivePower = this.calcPower('defense');

    /**
     * 2 examples of ternary chains
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator}
     */
    const roundScore = (enemyOffense < myOffensivePower) ? 1 :
      (enemyDefense > myDefensivePower) ? -1 :
      0;
    const outcome = roundScore == 0 ? 'TIED' :
      roundScore == 1 ? 'WON' :
      'LOST';

    this.totalScore += roundScore;
    console.log(`--- Round ${count}: your team ${outcome}`);

    if (outcome != 'TIED' && count < this.rounds) {
      return this.offerSubChanceAsync();
    } else {
      return Promise.resolve();
    }
  };

  /**
   * @return {Promise}
   */
  offerSubChanceAsync() {
    const subName = this.team.subs[0].name;
    const prompts = promptSets.subPlayer(subName, this.team.starters);
    return inquirer.prompt(prompts)
        .then((answers) => {
          if (answers.wantsToSub) {
            /**
             * several array methods used here
             * findIndex: @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex}
             * push @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push}
             * splice: @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}
             */

            // assumes no players have the same name
            const indexOfStarterToTakeOut = this.team.starters
                .findIndex((it) => it.name == answers.doSub);

            const starterTakenOut = this.team.starters
                .splice(indexOfStarterToTakeOut, 1)[0];

            // assumes only one sub
            const sub = this.team.subs.splice(0)[0];

            this.team.starters.push(sub);
            this.team.subs.push(starterTakenOut);

            console.log(`--- ${starterTakenOut.name} pulled out.`);
            console.log(`--- ${subName} sent in.`);
          }
        });
  }

  /**
   *
   * @param {string} side property (offense | defense)
   * @return {number} sum of the team's players' [side] stat
   */
  calcPower(side) {
    return this.team.starters
        .map((it) => it[side])
        .reduce((sum, it) => sum + it);
  }
}

module.exports = Tournament;
