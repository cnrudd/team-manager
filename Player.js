const utils = require('./utils');

/**
 * A player
 */
class Player {
  /**
     *
     * @param {string} name player's name
     * @param {string} position playing position
     * @param {number} offense 0 - 10
     * @param {number} defense 0 - 10
     */
  constructor(name, position, offense, defense) {
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;
  }

  /**
   * reward players for good game
   */
  goodGame() {
    this[this.chooseQuality()]++;
  }

  /**
   * dock players for bad game
   */
  badGame() {
    this[this.chooseQuality()]--;
  }

  /**
     * Print out player info
     */
  printStats() {
    console.log(`
      Name: ${this.name}
      Position: ${this.position}
      Offense: ${this.offense}
      Defense: ${this.defense}
  
      `);
  }

  /**
     * Choose 'offense or 'defense' with a,ahem, coinflip.
     * @return {string}
     */
  chooseQuality() {
    return utils.randomNumber(1) ? 'defense' : 'offense';
  }
}

module.exports = Player;
