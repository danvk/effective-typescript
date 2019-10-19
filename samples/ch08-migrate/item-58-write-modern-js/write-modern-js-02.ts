function foo() {
  bar();
  function bar() {
    console.log('hello');
  }
}
