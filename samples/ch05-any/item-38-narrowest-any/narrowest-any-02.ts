interface Foo { foo: string; }
interface Bar { bar: string; }
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) { /* ... */ }

function f() {
  const x = expressionReturningFoo();
  processBar(x);
  //         ~ Argument of type 'Foo' is not assignable to
  //           parameter of type 'Bar'
}
