function getLengthBad(array: any) {  // Don't do this!
  return array.length;
}

function getLength(array: any[]) {
  return array.length;
}
const numArgsBad = (...args: any) => args.length; // Returns any
const numArgsGood = (...args: any[]) => args.length;  // Returns number
