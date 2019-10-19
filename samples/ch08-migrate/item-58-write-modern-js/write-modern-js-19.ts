declare let obj: {props: {a: string; b: number; }; };
const point = [1, 2, 3];
const [x, y, z] = point;
const [, a, b] = point;  // Ignore the first one
