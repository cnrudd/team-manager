// dependency for inquirer npm package
const inquirer = require('inquirer');

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
}

const team = [];


const addPlayer = function(total, roster) {
  if (roster.length == total) {
    console.log('Done with this.');
    playGames(5);
    return;
  }

  // runs inquirer and asks the user a series of questions whose replies are
  // stored within the variable answers inside of the .then statement
  inquirer.prompt([
    {
      name: 'name',
      message: 'What is the player\'s name?',
    }, {
      name: 'position',
      message: 'What is the player\'s position?',
    }, {
      name: 'offense',
      message: 'What is the player\'s offensive skill level?',
      type: 'number',
    }, {
      name: 'defense',
      message: 'What is the player\'s defensive skill level?',
      type: 'number',
    },
  ]).then((answers) => {
    // initializes the variable newProgrammer
    // to be a programmer object which will take
    // in all of the user's answers to the questions above
    const newPlayer = new Player(
        answers.name,
        answers.position,
        answers.offense,
        answers.defense
    );

    // add the new Programmer to the answers array
    roster.push(newPlayer);
    addPlayer(total, roster);
  });
};


const fillTeam = function(total) {
  console.log('Collecting Players');
  addPlayer(total, team);
};

let tournamentScore = 0;

const playRound = function(count, rounds) {
  if (count == rounds) {
    return;
  }
  const rando = () => Math.ceil(Math.random() * 20);
  const enemyOffense = rando();
  const enemyDefense = rando();
  const myOffensivePower = team
      .map((it) => it.offense)
      .reduce((sum, it) => sum + it);

  const myDefensivePower = team
      .map((it) => it.defense)
      .reduce((sum, it) => sum + it);

  let change = 0;
  if (enemyOffense < myOffensivePower) change = 1;
  if (enemyDefense > myDefensivePower) change = -1;
  const outcome = change == 0 ? 'tied' :
    change == 1 ? 'won' :
    'lost';

  tournamentScore += change;
  console.log(`Round ${count}: you ${outcome}`);

  count++;


  if (change) {
    // doSubbing();
  } else {
    playRound(count, rounds);
  }
};

/**
 * reward players for good game
 */
function goodGame() {
  const prop = Math.floor(Math.random() * 2) ? 'defense' : 'offense';
  team.map((it) => it[prop]++);
}

/**
 * dock players for bad game
 */
function badGame() {
  const prop = Math.floor(Math.random() * 2) ? 'defense' : 'offense';
  team.map((it) => it[prop]--);
}
/**
 *
 * @param {number} rounds
 */
function playGames(rounds) {
  console.log('teamLength: ', team.length);
  playRound(0, rounds);
  console.log('score:', tournamentScore);

  if (tournamentScore > 0) goodGame();
  else if (tournamentScore < 0) badGame();

  let outcome;

  if (tournamentScore < 0) {
    outcome = 'lost';
  } else if (tournamentScore > 0) {
    outcome = 'win';
  } else {
    outcome = 'tied';
  }

  console.log(
      `Your team ${outcome}!`
  );
  team.forEach((it) => it.printStats());
};

fillTeam(3);

