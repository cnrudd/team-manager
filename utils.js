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
};
