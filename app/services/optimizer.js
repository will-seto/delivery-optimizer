const Driver = require("../models/driver.js");
const Address = require("../models/address.js");

module.exports = class MatchMaker {

  optimize = function(addresses, drivers) {
    const suitabilityMatrix = this.#buildSuitabilityMatrix(addresses, drivers);
    return this.#maximizeSuitabilityScore(suitabilityMatrix);
  }

  #buildSuitabilityMatrix = function (addresses, drivers) {
    const matrix = [];

    for (let i = 0; i < addresses.length; i++) {
      // go through the addresses
      const address = new Address(addresses[i]);
      matrix[i] = [];

      for (let j = 0; j < drivers.length; j++) {
        //  convert driver input to Driver object as needed
        if (!(drivers[j] instanceof Driver)) {
          drivers[j] = new Driver(drivers[j]);
        }

        matrix[i][j] = {
          address: addresses[i],
          driver: drivers[j].name,
          score: address.getSuitabilityScore(drivers[j]),
        };
      }
    }

    return matrix;
  };

  /**
   * After some analysis, it seems that the greedy algorithm works just fine as a solution.
   * After calcuating all the suitability scores across the addresses and drivers (the suitability matrix), 
   * simply picking the next highest score from available will yield us the highest sustainability score.
   * To do this, we just have to sort the suitability scores and keep track of commited drivers and addresses.
   * 
   * @param {*} matrix 
   * @returns 
   */
  #maximizeSuitabilityScore = function (matrix) {
    const min = Math.min(matrix.length, matrix[0].length);
    const drivers = new Map();
    const shippedAddresses = new Map();

    let totalSuitabilityScore = 0;

    let array = [];
    matrix.forEach((row) => {
      array = array.concat(row);
    });

    // we can optimize by using a heap sort
    array.sort(function (a, b) {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    });

    for (let i = array.length - 1; i >= 0; i--) {
      // we are done - all drivers and addresses have been matched
      if (drivers.size >= min || shippedAddresses.size >= min) break;

      // driver committed
      if (drivers.get(array[i].driver)) continue;
      // address shipped
      if (shippedAddresses.get(array[i].address)) continue;

      totalSuitabilityScore += array[i].score;

      shippedAddresses.set(array[i].address, true);

      drivers.set(array[i].driver, {
        address: array[i].address,
        score: array[i].score
      });
    }

    return {
      "Total Sustainability Score": totalSuitabilityScore,
      "Delivery Schedule": drivers,
    };
  };
};
