function double<T extends number|string>(x: T): T;
function double(x: any) { return x + x; }

const num = double(12);  // Type is 12
const str = double('x');  // Type is "x"
