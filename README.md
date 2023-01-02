# delivery-optimizer

## Requirements
This app was written using Node.js and npm. For instructions on how to install Node.js and npm, please visit https://docs.npmjs.com/cli/v9/configuring-npm/install/

You can confirm if you have the required versions installed by running these commands
```
npm -v
node -v
```

### Min Versions
* npm - 8.19.2
    * this is what came installed w/ my mac
* Node.js - 12.22.12 
    * using n (https://github.com/tj/n) I have confirmed that the minimum version of Node.js is 12.x.x 

## Installation
All the dependencies are defined in package.json. Just run the npm install script.
```
$ npm install
```
Note: If the min versions of Node.js and npm have not been installed, the install will fail. Please refere to the requirements section for more information.

## Running the app
This app can be run using the npm scripts or by running the index.js file directly

### Run via npm scripts
```
$ npm run optimize -- -a {address_file} -d {driver_file}

// Example
$ npm run optimize -- -a test/input/addresses.txt -d test/input/drivers.txt
```

### Run as an executable script
```
// make the index script executable
$ chmod +x ./bin/main.js
$ .bin/main.js -a {address_file} -d {driver_file}

// Example
.bin/main.js -a test/input/addresses.txt -d test/input/drivers.txt
```

## Generating test input
I wrote a quick test input generator using faker. 
```
npm run generate-driver-input
npm run generate-address-input
```

## Output
The output will have the following format
```
{
  'Total Sustainability Score': number,
  'Delivery Schedule': {
    'Driver1_name' : {
        'address': string,
        'score': number
    },
    'Driver2_name' : {
        'address': string,
        'score': number
    },
    ...
  }
}
```
With the input files defined in the example above, the following output is expected
```
{
  'Total Sustainability Score': 118.25,
  'Delivery Schedule': Map(10) {
    'Dr. Pauline McLaughlin' => {
      address: '1772 Rubye Spur, Port Taylor, VA85370-1740',
      score: 19.5
    },
    'Ms. Gladys Welch' => {
      address: '2326 Bridget Parkways, Domenicoworth, ME92305-2809',
      score: 18
    },
    'Carrie Jacobson' => {
      address: '5675 Batz Streets, South Esperanzastead, KS98314',
      score: 13.5
    },
    'Donald Paucek' => {
      address: '5913 Muller Pike, Port Jackelineside, MS87629-3134',
      score: 11.25
    },
    'Robin Ziemann' => {
      address: '9297 Mercedes Knoll, Huntington, AL06100',
      score: 11.25
    },
    'Jacquelyn Boehm' => {
      address: '324 King Forges, West Kali, OH90241-4279',
      score: 11.25
    },
    'Sam Volkman' => { address: '2369 Piper Mews, Fort Madaline, PA65227', score: 10.5 },
    'Don Beier' => { address: '71611 Mara Views, Port Reyesberg, NE90519', score: 9 },
    'Natasha Harris' => { address: '8024 Smith Glens, Cambridge, SD37342', score: 8 },
    'Sheila Lakin' => { address: '5235 Sunny Hollow, Pagacport, SC58544-8302', score: 6 }
  }
}
```