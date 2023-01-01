// address.js
"use strict";

const parser = require("parse-address");
const { findGCF } = require("../utils/math.js");

module.exports = class Address {
  constructor(address) {
    this.address = address;
    this.parts = parser.parseLocation(address);
  }

  getSuitabilityScore(driver) {
    let suitabilityScore = 0;
    if (this.parts.street.length % 2 == 0) {
      // even - ss = vowels in driver name * 1.5
      suitabilityScore = driver.vowels * 1.5;
    } else {
      // odd - ss = consonants in driver name
      suitabilityScore = driver.consonants;
    }

    if (findGCF(this.parts.street.length, driver.length) > 1) {
      suitabilityScore *= 1.5;
    }

    return suitabilityScore;
  }
};
