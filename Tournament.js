const inquirer = require('inquirer');

const promptSets = require('./promptSets');
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
        .then(() => {
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
              `Your team ${outcome} the tournament!`
          );

          this.team.starters.forEach((player) => {
            if (this.score > 0) player.goodGame();
            else if (this.score < 0) player.badGame();
            player.printStats();
          });
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

    let change = 0;
    if (enemyOffense < myOffensivePower) change = 1;
    if (enemyDefense > myDefensivePower) change = -1;
    const outcome = change == 0 ? 'tied' :
      change == 1 ? 'won' :
      'lost';

    this.score += change;
    console.log(`Round ${count}: you ${outcome}`);

    if (change && count < this.rounds) {
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
            // assumes no players have the same name
            const indexOfStarterToTakeOut = this.team.starters
                .findIndex((it) => it.name == answers.doSub);

            const starterTakenOut = this.team.starters
                .splice(indexOfStarterToTakeOut, 1)[0];

            // assumes only one sub
            const sub = this.team.subs.splice(0)[0];

            this.team.starters.push(sub);
            this.team.subs.push(starterTakenOut);

            console.log(`${starterTakenOut.name} pulled out.`);
            console.log(`${subName} sent in.`);
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
