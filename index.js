// dependency for inquirer npm package
const inquirer = require('inquirer');

const Team = require('./Team');
const Tournament = require('./Tournament');

const team = new Team(2, 1);

team.buildTeamAsync()
    .then(() => {
      const tournament = new Tournament(team, 5);
      tournament.playTournament();
    });






