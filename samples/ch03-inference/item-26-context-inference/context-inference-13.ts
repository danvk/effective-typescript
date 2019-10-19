function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}
const fn = (a: number, b: number) => {
  console.log(a + b);
}
callWithRandomNumbers(fn);
