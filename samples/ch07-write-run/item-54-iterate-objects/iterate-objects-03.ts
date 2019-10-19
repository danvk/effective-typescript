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
let k: keyof typeof obj;  // Type is "one" | "two" | "three"
for (k in obj) {
  const v = obj[k];  // OK
}
