function getLengthBad(array: any) {  // Don't do this!
  return array.length;
}

function getLength(array: any[]) {
  return array.length;
}
function hasTwelveLetterKey(o: object) {
  for (const key in o) {
    if (key.length === 12) {
      console.log(key, o[key]);
                   //  ~~~~~~ Element implicitly has an 'any' type
                   //         because type '{}' has no index signature
      return true;
    }
  }
  return false;
}
