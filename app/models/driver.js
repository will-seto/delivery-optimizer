// driver.js
"use strict";

module.exports = class Driver {
  constructor(name) {
    this.name = name;
    const vowels = "aeiou";
    name = name.toLowerCase().replace(/\s/g, "");
    this.vowels = 0;
    this.consonants = 0;
    this.length = name.length;

    for (let i = 0; i < name.length; i++) {
      if (vowels.indexOf(name[i]) > -1) {
        this.vowels++;
      } else {
        this.consonants++;
      }
    }
  }
};
