function double(x: number): number;
function double(x: string): string;
function double(x: any) { return x + x; }

const num = double(12);  // Type is number
const str = double('x');  // Type is string
