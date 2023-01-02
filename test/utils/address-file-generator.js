#!/usr/bin/env node

const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Generate a list of 10 addresses
const addresses = [];
for (let i = 0; i < 10; i++) {
  const state = faker.address.stateAbbr();
  let address = faker.address.streetAddress() + ', ';
  address += faker.address.city() + ', ';
  address += state + faker.address.zipCodeByState(state);
  addresses.push(address);
}


// Write the list of addresses to a new file, separated by newlines
fs.writeFile('test/input/addresses.txt', addresses.join('\n'), (err) => {
  if (err) throw err;
  console.log('The file has been saved to test/input/addresses.txt');
});
