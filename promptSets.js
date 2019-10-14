
/**
 *
 * @param {number} input
 * @param {object} answers  Answers object provided by Inquirer lib
 * @return {boolean} true for valid, false otherwise
 */
function withinRange(input, answers) {
  return input >= 1 && input <= 10 ?
    true :
    'Please enter a number between 1 and 10';
}

module.exports = {
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
        message: 'What is the player\'s offensive skill level?',
        type: 'number',
        validate: withinRange,
      }, {
        name: 'defense',
        message: 'What is the player\'s defensive skill level?',
        type: 'number',
        validate: withinRange,
      },
    ];
  },
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
