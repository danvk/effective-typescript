function range(start: number, limit: number) {
  const out = [];
  //    ~~~ Variable 'out' implicitly has type 'any[]' in some
  //        locations where its type cannot be determined
  if (start === limit) {
    return out;
    //     ~~~ Variable 'out' implicitly has an 'any[]' type
  }
  for (let i = start; i < limit; i++) {
    out.push(i);
  }
  return out;
}
