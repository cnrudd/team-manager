const utils = require('./utils');

// test randomNumber function
for (let i = 0; i < 10000; i++) {
  const rn = utils.randomNumber(20, 1);
  if (rn == 1|| rn == 20) {
    console.log(rn);
  }
  if (rn < 1 || rn > 20) {
    console.log('error: ', rn);
  }
}
