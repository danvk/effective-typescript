interface Foo { foo: string; }
interface Bar { bar: string; }
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) { /* ... */ }
function f1() {
  const x: any = expressionReturningFoo();  // Don't do this
  processBar(x);
}

function f2() {
  const x = expressionReturningFoo();
  processBar(x as any);  // Prefer this
}
