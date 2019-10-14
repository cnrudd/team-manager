const inquirer = require('inquirer');

const utils = require('./utils');
const promptSets = require('./promptSets');
const Player = require('./Player');

/**
 * A team comprised of starter players and subs
 */
class Team {
/**
 *
 * @param {number} startersCount
 * @param {number} subsCount
 */
  constructor(startersCount, subsCount) {
    this.startersCount = startersCount;
    this.subsCount = subsCount;
    this.starters = [];
    this.subs= [];
  }

  /**
   * builds the team by adding players
   * @return {Promise}  Promise that resolves when all players are added
   */
  buildTeamAsync() {
    const prompts = [];
    for (let i = 0; i < this.startersCount; i++) {
      prompts.push(() => this.addPlayerAsync(true));
    }
    for (let i = 0; i < this.subsCount; i++) {
      prompts.push(() => this.addPlayerAsync(false));
    }

    return utils.runPromisesInSeries(prompts);
  }

  /**
   *
   * @param {boolean} isStarter
   * @return {Promise} Promise of completed player input;
   */
  addPlayerAsync(isStarter) {
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    console.log('\n-----');
    console.log(`Add a new ${isStarter ? 'starting' : 'sub'} player`);

    const playerChoices = [
      'Derek Jeter',
      'Daryll Strawberry',
      'Tim Tebow',
      'CC Sabathia',
      'Gary Sanchez',
    ];

    const unpickedPlayers = playerChoices.filter((it) => {
      const starterNames = this.starters.map((it) => it.name);
      const subNames = this.subs.map((it) => it.name);
      return !starterNames.includes(it) && !subNames.includes(it);
    });

    return inquirer.prompt(promptSets.addPlayer(unpickedPlayers))
        .then((answers) => {
          const player = new Player(
              answers.name,
              answers.position,
              answers.offense,
              answers.defense
          );
          if (isStarter) {
            this.starters.push(player);
          } else {
            this.subs.push(player);
          }

          return player;
        });
  }
}

module.exports = Team;
