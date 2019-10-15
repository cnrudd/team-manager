/**
 * This module contains oft used functions that do not contain business logic
 * (they could be reused in any program).
 * @module utils
 */
module.exports = {
  /**
     *
     * @param {number} max      highest possible number
     * @param {number} min     lowest possible number (defaults to 0)
     * @return {number}         randomly generated number
     */
  randomNumber(max, min = 0) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  },

  /**
   *
   * @param {Array} promiseArray The array of promises to run
   * @return {Promise}
   *
   * @see {@link https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
   */
  runPromisesInSeries(promiseArray) {
    return promiseArray.reduce((promiseChain, currentTask) => {
      return promiseChain.then(currentTask);
    }, Promise.resolve());
  },
};
