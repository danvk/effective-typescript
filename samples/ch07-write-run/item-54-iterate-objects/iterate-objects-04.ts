const obj = {
  one: 'uno',
  two: 'dos',
  three: 'tres',
};
for (const k in obj) {
  const v = obj[k];
         // ~~~~~~ Element implicitly has an 'any' type
         //        because type ... has no index signature
}
interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  for (const k in abc) {  // const k: string
    const v = abc[k];
           // ~~~~~~ Element implicitly has an 'any' type
           //        because type 'ABC' has no index signature
  }
}
