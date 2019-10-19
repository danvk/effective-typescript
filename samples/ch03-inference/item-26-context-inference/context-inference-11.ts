function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}

callWithRandomNumbers((a, b) => {
  a;  // Type is number
  b;  // Type is number
  console.log(a + b);
});
