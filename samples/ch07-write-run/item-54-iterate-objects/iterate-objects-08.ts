interface ABC {
  a: string;
  b: string;
  c: number;
}
function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k  // Type is string
    v  // Type is any
  }
}
