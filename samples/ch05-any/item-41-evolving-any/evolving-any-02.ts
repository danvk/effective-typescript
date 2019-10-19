function range(start: number, limit: number) {
  const out = [];  // Type is any[]
  for (let i = start; i < limit; i++) {
    out.push(i);  // Type of out is any[]
  }
  return out;  // Type is number[]
}
