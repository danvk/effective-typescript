function double<T extends number | string>(
  x: T
): T extends string ? string : number;
function double(x: any) { return x + x; }
const num = double(12);  // number
const str = double('x');  // string

// f<T extends number | string>(x: T): T extends string ? string : number
function f<T extends number | string>(x: T) {
  return double(x);
}
