const square = (x: number) => x * x;
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add);  // OK

const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double);  // OK!?
