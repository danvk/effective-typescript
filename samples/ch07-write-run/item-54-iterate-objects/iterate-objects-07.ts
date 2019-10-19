interface ABC {
  a: string;
  b: string;
  c: number;
}
function foo(abc: ABC) {
  let k: keyof ABC;
  for (k in abc) {  // let k: "a" | "b" | "c"
    const v = abc[k];  // Type is string | number
  }
}
