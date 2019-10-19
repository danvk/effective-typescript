function getLengthBad(array: any) {  // Don't do this!
  return array.length;
}

function getLength(array: any[]) {
  return array.length;
}
getLengthBad(/123/);  // No error, returns undefined
getLength(/123/);
       // ~~~~~ Argument of type 'RegExp' is not assignable
       //       to parameter of type 'any[]'
