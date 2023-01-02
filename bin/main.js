#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const Optimizer = require("../app/services/optimizer");

const getInput = function () {
  program
    .option(
      "-a, --addresses <addresses>",
      "Addresses in a newline delimieted text file"
    )
    .option(
      "-d, --drivers <drivers>",
      "Drivers in a newline deliemited text file"
    );

  program.parse(process.argv);

  const options = program.opts();
  const addressesFile = options.addresses;
  const driversFile = options.drivers;

  if (!addressesFile || !driversFile) {
    console.error(
      "Error: Please provide an address file and driver file. See help for more details."
    );
    process.exit(1);
  }

  try {
    let addresses = fs.readFileSync(addressesFile).toString().split("\n");
    let drivers = fs.readFileSync(driversFile).toString().split("\n");
    return {
      addresses,
      drivers,
    };
  } catch (e) {
    console.error(e.message);
  }
};

const input = getInput();
if (input) {
  const optimizer = new Optimizer();

  console.log(optimizer.optimize(input.addresses, input.drivers));
}
