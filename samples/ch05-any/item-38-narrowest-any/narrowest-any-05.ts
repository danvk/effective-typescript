interface Foo { foo: string; }
interface Bar { bar: string; }
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) { /* ... */ }
function f1() {
  const x = expressionReturningFoo();
  // @ts-ignore
  processBar(x);
  return x;
}
