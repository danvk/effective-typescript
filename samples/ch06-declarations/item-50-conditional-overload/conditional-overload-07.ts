function double<T extends number | string>(
  x: T
): T extends string ? string : number;
function double(x: any) { return x + x; }
const num = double(12);  // number
const str = double('x');  // string

// function f(x: string | number): string | number
function f(x: number|string) {
  return double(x);
}
