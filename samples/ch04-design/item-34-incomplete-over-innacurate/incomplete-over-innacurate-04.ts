type Expression1 = any;
type Expression2 = number | string | any[];
const tests: Expression2[] = [
  10,
  "red",
  true,
// ~~~ Type 'true' is not assignable to type 'Expression2'
  ["+", 10, 5],
  ["case", [">", 20, 10], "red", "blue", "green"],  // Too many values
  ["**", 2, 31],  // Should be an error: no "**" function
  ["rgb", 255, 128, 64],
  ["rgb", 255, 0, 127, 0]  // Too many values
];
