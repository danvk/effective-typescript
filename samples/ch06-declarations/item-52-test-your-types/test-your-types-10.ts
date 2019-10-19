const square = (x: number) => x * x;
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const g: (x: string) => any = () => 12;  // OK
