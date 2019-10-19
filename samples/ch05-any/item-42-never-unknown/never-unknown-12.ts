function parseYAML(yaml: string): any {
  // ...
}
interface Foo { foo: string }
interface Bar { bar: string }
declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;
