interface Outer {
  inner: {
    x: number;
  }
}
const o: Readonly<Outer> = { inner: { x: 0 }};
o.inner = { x: 1 };
// ~~~~ Cannot assign to 'inner' because it is a read-only property
o.inner.x = 1;  // OK
type T = Readonly<Outer>;
// Type T = {
//   readonly inner: {
//     x: number;
//   };
// }
