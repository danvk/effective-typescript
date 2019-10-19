function double(x: number|string): number|string;
function double(x: any) { return x + x; }
const num = double(12);  // string | number
const str = double('x');  // string | number
