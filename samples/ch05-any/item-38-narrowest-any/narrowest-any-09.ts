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
const config: Config = {
  a: 1,
  b: 2,  // These properties are still checked
  c: {
    key: value as any
  }
};
