function range(start: number, limit: number) {
  const out = [];  // Type is any[]
  for (let i = start; i < limit; i++) {
    out.push(i);  // Type of out is any[]
  }
  return out;  // Type is number[]
}
function makeSquares(start: number, limit: number) {
  const out = [];
     // ~~~ Variable 'out' implicitly has type 'any[]' in some locations
  range(start, limit).forEach(i => {
    out.push(i * i);
  });
  return out;
      // ~~~ Variable 'out' implicitly has an 'any[]' type
}
