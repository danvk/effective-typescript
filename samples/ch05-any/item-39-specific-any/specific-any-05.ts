function getLengthBad(array: any) {  // Don't do this!
  return array.length;
}

function getLength(array: any[]) {
  return array.length;
}
type Fn0 = () => any;  // any function callable with no params
type Fn1 = (arg: any) => any;  // With one param
type FnN = (...args: any[]) => any;  // With any number of params
                                     // same as "Function" type
