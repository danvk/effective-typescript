const square = (x: number) => x * x;
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}

assertType<number[]>(map(['john', 'paul'], name => name.length));
