const square = (x: number) => x * x;
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const double = (x: number) => 2 * x;
let p: Parameters<typeof double> = null!;
assertType<[number, number]>(p);
//                           ~ Argument of type '[number]' is not
//                             assignable to parameter of type [number, number]
let r: ReturnType<typeof double> = null!;
assertType<number>(r);  // OK
