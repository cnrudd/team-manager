
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
  addPlayer: [
    {
      name: 'name',
      message: 'What is the player\'s name?',
      type: 'list',
      choices: [
        'Derek Jeter',
        'Daryll Strawberry',
        'Tim Tebow',
        'CC Sabathia',
        'Gary Sanchez',
      ],
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
  ],
};
