interface Foo { foo: string; }
interface Bar { bar: string; }
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) { /* ... */ }
interface Config {
  a: number;
  b: number;
  c: {
    key: Foo;
  };
}
declare const value: Bar;
