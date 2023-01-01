// math.js
"usse strict";

exports.findGCF = function (a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
};
