type Expression1 = any;
type Expression2 = number | string | any[];
type Expression4 = number | string | CallExpression;

type CallExpression = MathCall | CaseCall | RGBCall;

interface MathCall {
  0: '+' | '-' | '/' | '*' | '>' | '<';
  1: Expression4;
  2: Expression4;
  length: 3;
}

interface CaseCall {
  0: 'case';
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4 | 6 | 8 | 10 | 12 | 14 | 16 // etc.
}

interface RGBCall {
  0: 'rgb';
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4;
}

const tests: Expression4[] = [
  10,
  "red",
  true,
// ~~~ Type 'true' is not assignable to type 'Expression4'
  ["+", 10, 5],
  ["case", [">", 20, 10], "red", "blue", "green"],
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  Type '["case", [">", ...], ...]' is not assignable to type 'string'
  ["**", 2, 31],
// ~~~~~~~~~~~~ Type '["**", number, number]' is not assignable to type 'string
  ["rgb", 255, 128, 64],
  ["rgb", 255, 128, 64, 73]
// ~~~~~~~~~~~~~~~~~~~~~~~~ Type '["rgb", number, number, number, number]'
//                          is not assignable to type 'string'
];
