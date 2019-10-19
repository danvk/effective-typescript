const square = (x: number) => x * x;
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
const lengths: number[] = map(['john', 'paul'], name => name.length);
