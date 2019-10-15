// dependency for inquirer npm package
const inquirer = require('inquirer');

const Team = require('./models/Team');
const Tournament = require('./models/Tournament');

/**
 * This is the main entry point to the whole application
 */
function playTeamManager() {
  const team = new Team(2, 1);
  team.buildTeamAsync()
      .then(() => {
        const tournament = new Tournament(team, 5);
        return tournament.playTournamentAsync();
      })
      .then(() => {
        return inquirer.prompt([
          {
            name: 'playAgain',
            type: 'confirm',
            message: `Do you want play again?`,
          },
        ])
            .then((answers) => {
              if (answers.playAgain) playTeamManager();
            });
      });
}

console.log(`
ULTIMATE TEAM MANAGER - THE GAME
================================
`);

playTeamManager();








