// tsConfig: {"noImplicitThis":false}

class Foo {
  method() {
    console.log(this);
    [1, 2].forEach(function(i) {
      console.log(this);
    });
  }
}
const f = new Foo();
f.method();
// Prints Foo, undefined, undefined in strict mode
// Prints Foo, window, window (!) in non-strict mode
