// Braille mappings for letters and numbers
const brailleMapping = {
  a: "O.....",
  b: "O.O...",
  c: "OO....",
  d: "OO.O..",
  e: "O..O..",
  f: "OOO...",
  g: "OOOO..",
  h: "O.OO..",
  i: ".OO...",
  j: ".OOO..",
  k: "O...O.",
  l: "O.O.O.",
  m: "OO..O.",
  n: "OO.OO.",
  o: "O..OO.",
  p: "OOO.O.",
  q: "OOOOO.",
  r: "O.OOO.",
  s: ".OO.O.",
  t: ".OOOO.",
  u: "O...OO",
  v: "O.O.OO",
  w: ".OOO.O",
  x: "OO..OO",
  y: "OO.OOO",
  z: "O..OOO",
  1: "O.....",
  2: "O.O...",
  3: "OO....",
  4: "OO.O..",
  5: "O..O..",
  6: "OOO...",
  7: "OOOO..",
  8: "O.OO..",
  9: ".OO...",
  0: ".OOO..",
  " ": "......",
};

// Special symbols
const capitalIndicator = ".....O";
const numberIndicator = ".O.OOO";

// Function to translate English to Braille
function englishToBraille(input) {
  let brailleOutput = "";
  let isNumber = false;

  for (let char of input) {
    if (/[A-Z]/.test(char)) {
      // Handle capital letters
      brailleOutput += capitalIndicator;
      brailleOutput += brailleMapping[char.toLowerCase()];
    } else if (/\d/.test(char)) {
      // Handle numbers
      if (!isNumber) {
        // If not already in number mode
        brailleOutput += numberIndicator;
        isNumber = true;
      }
      brailleOutput += brailleMapping[char];
    } else if (char === " ") {
      brailleOutput += brailleMapping[char];
      isNumber = false; // Reset number mode on spaces
    } else {
      brailleOutput += brailleMapping[char];
      isNumber = false; // Reset number mode on non-numbers
    }
  }

  return brailleOutput;
}

// Function to translate Braille to English
function brailleToEnglish(input) {
  let englishOutput = "";
  let isCapital = false;
  let isNumber = false;
  let i = 0;

  while (i < input.length) {
    let brailleChar = input.slice(i, i + 6);

    if (brailleChar === capitalIndicator) {
      isCapital = true;
      i += 6;
      continue;
    } else if (brailleChar === numberIndicator) {
      isNumber = true;
      i += 6;
      continue;
    }

    let char = Object.keys(brailleMapping).find(
      (key) => brailleMapping[key] === brailleChar
    );
    if (isCapital && !isNumber) {
      char = char.toUpperCase();
      isCapital = false;
    }

    englishOutput += char;
    isNumber = false; // Reset number mode after translating

    i += 6;
  }

  return englishOutput;
}

// Main function to detect input type and translate
function translate(input) {
  if (/^[O.]+$/.test(input)) {
    // Input is Braille
    return brailleToEnglish(input);
  } else {
    // Input is English
    return englishToBraille(input);
  }
}

// Get input from command line
const input = process.argv.slice(2).join(" ");
console.log(translate(input));
