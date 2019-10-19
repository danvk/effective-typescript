interface Foo { foo: string; }
interface Bar { bar: string; }
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) { /* ... */ }
function f1() {
  const x: any = expressionReturningFoo();
  processBar(x);
  return x;
}

function g() {
  const foo = f1();  // Type is any
  foo.fooMethod();  // This call is unchecked!
}
