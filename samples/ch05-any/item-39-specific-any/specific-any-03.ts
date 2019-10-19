function getLengthBad(array: any) {  // Don't do this!
  return array.length;
}

function getLength(array: any[]) {
  return array.length;
}
function hasTwelveLetterKey(o: {[key: string]: any}) {
  for (const key in o) {
    if (key.length === 12) {
      return true;
    }
  }
  return false;
}
