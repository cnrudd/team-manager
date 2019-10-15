
/**
 * This module contains customizable prompt sets intended for use
 * by the Inquirer library
 * @module promptSets
 * @see {@link https://www.npmjs.com/package/inquirer}
 */

module.exports = {
  /**
   *
   * @param {Array} playerChoices List of player names
   * @return {Array} The prompts needed to add one player to the team.
   */
  addPlayer(playerChoices) {
    return [
      {
        name: 'name',
        message: 'What is the player\'s name?',
        type: 'list',
        choices: playerChoices,
      }, {
        name: 'position',
        message: 'What is the player\'s position?',
        type: 'list',
        choices: [
          'Pitcher',
          'Catcher',
          'Infielder',
          'Outfielder',
        ],
      }, {
        name: 'offense',
        message: 'What is the player\'s offensive skill level (1 - 10)?',
        type: 'number',
        default: 5,
        validate: withinRange(1, 10),
      }, {
        name: 'defense',
        message: 'What is the player\'s defensive skill level (1 - 10)?',
        type: 'number',
        default: 5,
        validate: withinRange(1, 10),
      },
    ];
  },

  /**
   *
   * @param {string} subName The name of the current substitute player.
   * @param {Array} starters The array of current starting players.
   * @return {Array} The prompts needed to sub in a player.
   */
  subPlayer(subName, starters) {
    return [
      {
        name: 'wantsToSub',
        type: 'confirm',
        message: `Do you want to bring in substitute player ${subName}?`,
      },
      {
        name: 'doSub',
        type: 'list',
        message: `Please pick a starter to replace with ${subName}?`,
        choices: starters.map((player) => player.name),
        when: (answers) => answers.wantsToSub,
      },
    ];
  },
};

/**
 *
 * @param {number} min Smallest allowable number in range
 * @param {number} max Largest allowable number in range
 * @return {Function} an "Inquirer" compatible validation function
 * @see {@link https://www.npmjs.com/package/inquirer#question}
 */
function withinRange(min, max) {
  return function(input, answers) {
    return input >= min && input <= max ?
    true :
    'Please enter a number between 1 and 10';
  };
}
