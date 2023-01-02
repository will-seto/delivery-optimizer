#!/usr/bin/env node

const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Generate a list of 10 drivers
const drivers = [];
for (let i = 0; i < 10; i++) {
  drivers.push(faker.name.fullName());
}

// Write the list of drivers to a new file, separated by newlines
fs.writeFile('test/input/drivers.txt', drivers.join('\n'), (err) => {
  if (err) throw err;
  console.log('The file has been saved to test/input/drivers.txt');
});
