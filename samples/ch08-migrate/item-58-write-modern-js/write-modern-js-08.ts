// tsConfig: {"noImplicitThis":false}

class Foo {
  method() {
    console.log(this);
    [1, 2].forEach(i => {
      console.log(this);
    });
  }
}
const f = new Foo();
f.method();
// Always prints Foo, Foo, Foo
