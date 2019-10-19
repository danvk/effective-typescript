type Expression1 = any;
type Expression2 = number | string | any[];
type FnName = '+' | '-' | '*' | '/' | '>' | '<' | 'case' | 'rgb';
type CallExpression = [FnName, ...any[]];
type Expression3 = number | string | CallExpression;

const tests: Expression3[] = [
  10,
  "red",
  true,
// ~~~ Type 'true' is not assignable to type 'Expression3'
  ["+", 10, 5],
  ["case", [">", 20, 10], "red", "blue", "green"],
  ["**", 2, 31],
// ~~~~~~~~~~~ Type '"**"' is not assignable to type 'FnName'
  ["rgb", 255, 128, 64]
];
