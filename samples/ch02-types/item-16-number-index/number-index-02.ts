const xs = [1, 2, 3];
const keys = Object.keys(xs);  // Type is string[]
for (const key in xs) {
  key;  // Type is string
  const x = xs[key];  // Type is number
}
