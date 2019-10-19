function double<T extends number | string>(
  x: T
): T extends string ? string : number;
function double(x: any) { return x + x; }
