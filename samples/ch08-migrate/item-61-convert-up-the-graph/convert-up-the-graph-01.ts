// tsConfig: {"noImplicitAny":false,"strictNullChecks":false}

class Greeting {
  constructor(name) {
    this.greeting = 'Hello';
      // ~~~~~~~~ Property 'greeting' does not exist on type 'Greeting'
    this.name = name;
      // ~~~~ Property 'name' does not exist on type 'Greeting'
  }
  greet() {
    return this.greeting + ' ' + this.name;
             // ~~~~~~~~              ~~~~ Property ... does not exist
  }
}
