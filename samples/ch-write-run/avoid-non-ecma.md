# Item 72: Prefer ECMAScript Features to TypeScript Features

## Things to Remember

- By and large, you can convert TypeScript to JavaScript by removing all the types from your code.
- Enums, parameter properties, triple-slash imports, experimental decorators, and member visibility modifiers are historical exceptions to this rule.
- To keep TypeScript’s role in your codebase as clear as possible and to avoid future compatibility issues, avoid nonstandard features.

## Code Samples

```ts
enum Flavor {
  Vanilla = 0,
  Chocolate = 1,
  Strawberry = 2,
}

let flavor = Flavor.Chocolate;
//  ^? let flavor: Flavor

Flavor  // Autocomplete shows: Vanilla, Chocolate, Strawberry
Flavor[0]  // Value is "Vanilla"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYOwrgtgBAYgNgQwG4HsBOUDeAoKUBqCIAlnIlALxQAMANLlAMIAWKAxiogC7CVQCM9PAGUuaBAHcARsDRoAnnwBM9AL7ZscYFygAzRKgxV4ydADoW7Tgh4BubAHoHeAHoB+KFp37TaAFywBugaJoZ4TlAAgmBcVhAADl68AM6sEskBhCRkCLRMrBzcwHmi4tKyCtih6ADa1AC64c6EcGC8xMlQAERZpIhd2EA)

----

```ts
enum Flavor {
  Vanilla = 'vanilla',
  Chocolate = 'chocolate',
  Strawberry = 'strawberry',
}

let favoriteFlavor = Flavor.Chocolate;  // Type is Flavor
favoriteFlavor = 'strawberry';
// ~~~~~~~~~~~ Type '"strawberry"' is not assignable to type 'Flavor'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYOwrgtgBAYgNgQwG4HsBOUDeAoKUBqCIAlnIlALxQDkSRpi1ANLlAMIAWKAxiogC7BKNbl14DgzVgGV+aBAHcARsDRoAnsOoBnOYpVr1UgL7ZscYPygAzZOmKD4djFSeo0AOk48+CQQG48AHogqAAVdQAHIWJtWER3bFt3B2A3dC1deWVVDWp-bBCoAD9SsvLi8KihagAiLP1c9VrqKFioEBQrBG1tYgBzEAQlCyh+FDHqmnS0amwgA)

----

```ts
function scoop(flavor: Flavor) { /* ... */ }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYOwrgtgBAYgNgQwG4HsBOUDeAoKUBqCIAlnIlALxQDkSRpi1ANLlAMIAWKAxiogC7BKNbl14DgzVgGV+aBAHcARsDRoAnsOoBnOYpVr1UgL7ZscYPygAzZOmKD4djFSeo0AOk48+CQQG48AHogqAAVdQAHIWJtWER3bFt3B2A3dC1deWVVDWp-bBCoAD9SsvLi8KihagAiLP1c9VrqKFioEBQrBG1tYgBzEAQlCyh+FDHqmnS0aiSwEG5+YhQQKG1eFEiACmsE9AAueOcASiwoIIAqKA9bqEvQ0yA)

----

```ts
scoop('vanilla');
//    ~~~~~~~~~ '"vanilla"' is not assignable to parameter of type 'Flavor'

import {Flavor} from 'ice-cream';
scoop(Flavor.Vanilla);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYWwDg9gTgLgBAbwM4GMITAXzgMyhEOAcmBQFMBaFKMgQxCIG4AoVdMACiIDdaA7YABtBtIgEoWAeklxZcAH6KlS4gCJeA4bVVE4wJHD4R4tJEmABzPrQBGgsnBgQ4YWlHpkYZKHAg5HAJ5gDkQAYiLc0ETMzKCQsIjhtJFQ2HgExKSU1HQMLGwYHEkpAHQAavxCIhKy0nAA8gDSzEA)

----

```ts
type Flavor = 'vanilla' | 'chocolate' | 'strawberry';

let favoriteFlavor: Flavor = 'chocolate';  // OK
favoriteFlavor = 'americone dream';
// ~~~~~~~~~~~ Type '"americone dream"' is not assignable to type 'Flavor'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAYgNgQwG4HsBOUC8UDkSEB2AlnIjlAD64DGAFitSosBOVTgM7BoIDuARhDRoQOANwAoCXAjAoAM2ToiLeErQAuWIlQZsOOgyYIW4qFAD0FqAHkA0hMW6VENbqy4EAWyFFGBaAATNAhvcQkrKAA-GNi4qKgAFXBoHAAib19-IJDvNPIiDigCFDkEDg4iAHMCBH4ZKGAURpTcN3QcCSA)

----

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAKCmAnCB7AdtA3gKGtNYAtvAFzQQAuiAlmgOYDcu0w6liArsBSogBQFiZdrToBKLMzwUAFtQgA6QfGgBefEXhM8AX2x6gA)

----

```ts
class Person {
  constructor(public name: string) {}
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAKCmAnCB7AdtA3gKGtY6EALogK7BEqIAUADqQEYgCWw0aYAtvAFzTGJmaAOYBKLAF9sUoA)

----

```ts
class Person {
  first: string;
  last: string;
  constructor(public name: string) {
    [this.first, this.last] = name.split(' ');
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAKCmAnCB7AdtA3gKGtAZgJbIAuAXNBCYoWgOYDcu04VFVN9Tew6HArsBIpEACgAO-AEYhCwaGjABbeO2q06ASizM8AbRIALQhAB0RUgBpoRk6dYkAutAC8C5fFMRxskqIDk0P6a3NAAvtgRQA)

----

```ts
class PersonClass {
  constructor(public name: string) {}
}
const p: PersonClass = { name: 'Jed Bartlet' };  // OK

interface Person {
  name: string;
}
const jed: Person = new PersonClass('Jed Bartlet');  // also OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAKCmAnCB7AdgYXFaBvAUNNMOhAC6ICuwZKiAFAA6UBGIAlsNGmALbwAuaOUTs0AcwCUeAL745JNOWiMhCZOiyQYAXjzc+g6AHIAUvAAm0AEJhEZEPDLHoMgNxEA9J+gB5ANL4+GJkSABmYMDwcEioaHiEBvxCImLibvL4isoAVpZqsejQemjwAO4xGpjYEPRmljZ2Dk7Gkh7Q3tBgIKh+gUA)

----

```ts
// other.ts
namespace foo {
  export function bar() {}
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEHsBcAsFMCcB0kDOAoAdgQwLaxQA5YDGsoAZuOKAN5qiiwAeB48kFArhsZAJbgMoAEZZ4ACgCUtAL5o5QA)

----

```ts
// index.ts
/// <reference path="other.ts"/>
foo.bar();
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEEsDsBMFMA8B0AXAzgKBGAPAJ1gGaz6QDGsoADgIbIAWAvAEQD29xKqTwAfOgSxaIARtVwAKAJQBudEA)

----

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @logged  // <-- this is the decorator
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

function logged(originalFn: any, context: ClassMethodDecoratorContext) {
  return function(this: any, ...args: any[]) {
    console.log(`Calling ${String(context.name)}`);
    return originalFn.call(this, ...args);
  };
}

console.log(new Greeter('Dave').greet());
// Logs:
// Calling greet
// Hello, Dave
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEDiBOBTRAXR9oG8BQ1oHMlUBLAO3wC5oIV4z8BuXaYAe1JvgFdgVX4AFAFtEUMPkRVO9AJRZmeFAAtiEAHSFkKetAC80EWIlM8AX2YABEK3wSAJngD0j6AB4AtO+jLV0X8sRoO0Q2eDA+eGZNVAE5HDw8JBQueFJoAAMACUQQawAaaAASTB91aO1yU3STaHNzbAAzLlJeYnZoa1tEOwF+YnwyMBAAMVIqMFIATwK2UjQADxQqAGFwKABZVCVWOwAREP5w-mX2BZQ45iSUtKaW7XYBUvGpgrU3sHh8CGfJgG0AXQuCRY7AgrBAiDUnQE6WWQxAOmKAGVaPQBLMzmpSGARDIqjIaolUNdoH0BtiRqQ1MB4Y8VBBXu9PhACcxTEx6rMwRCoTYBKREAB3OBENCCADkuzAADdEOKZBpRbFWc5oAAZGzfbCquG5HTlbUubK5VgFKWy7BAA)

----

```ts
class Diary {
  private secret = 'cheated on my English test';
}

const diary = new Diary();
diary.secret
//    ~~~~~~ Property 'secret' is private and only accessible within ... 'Diary'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAiCWYBOBPaBvAUNaAHJ8AbmAC4Cm0EZwSZJ0AvNAOTAAWZpZAJtAPYA7aAFs0AUQEBzEPAhto5CCWYBuTAF9MmYIKXRuiVI2gCyAdziGUACgCUag8hQA6KjTqYA9J5w4AfgGB0AAKSHy4ZEgkaMxutMrQsngExOTQYAK8giBoYMDAZFDwAEYgFGbwJGzwQs51LAhOzJhAA)

----

```ts
const diary = new Diary();
(diary as any).secret  // OK

console.log(Object.entries(diary));
// logs [["secret", "cheated on my English test"]]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAiCWYBOBPaBvAUNaAHJ8AbmAC4Cm0EZwSZJ0AvNAOTAAWZpZAJtAPYA7aAFs0AUQEBzEPAhto5CCWYBuTAF9MwQUujdEqRtAFkA7nAMoAFAEo1V-cjSRoYAShsA6KjTo4A9P7QAPIA0phaOnwgZJ4gfJJWwQBGAFbUJJ5kAiQEZBAOljZ2mIHQ8ZIwANpVAEQ+tCS1ADTQteyc5LyCIuJSMnIK+U0AuiOYQA)

----

```ts
class PasswordChecker {
  #passwordHash: number;

  constructor(passwordHash: number) {
    this.#passwordHash = passwordHash;
  }

  checkPassword(password: string) {
    return hash(password) === this.#passwordHash;
  }
}

const checker = new PasswordChecker(hash('s3cret'));
checker.#passwordHash
//      ~~~~~~~~~~~~~ Property '#passwordHash' is not accessible outside class
//                    'PasswordChecker' because it has a private identifier.
checker.checkPassword('secret');  // Returns false
checker.checkPassword('s3cret');  // Returns true
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAiCWYBOBPaBvAUNaAHJ8AbmAC4Cm0EZwSZJ0AvNAOTAAWZpZAJtAPYA7aAFs0AUQEBzEPAhto5CCWYBuTAF9M3auFrQAZgFcBwEvEHQ2kNgApyADxIAuSiQJSAlC4GHhAIzIkNVBIGAAFUIB3PiRuAGEOYABrQIxsaABiXCiY7gAJa29fAKDMdOBBJSRDUxibbKho2IK5Iv9AjzScHBI2WQA6LJzm60Y8YfzrNRxNcsSkiMbc+omXKvhPLu7aEkMkISs5FaXYzoZzhT6IQYaIJsm5aehNWYqBJWh2ahSkMYEySLQRZ3XIJb6BGyHWzMCAAZhodGYHg8wXmgRuExabEwAHocd1ugA-Ykk0kkoFIPi4QIkNDMIYnB5sZjQWTQAR8ehgYDAMhQeB+EAUPiGEgQeDaT7gKC4-EE+UKgnMYH3MHJQIsgLAMCGKis+iHaBgPAEYjkVnaARmfTwdGYL7qpD9B0LCY2GHUHZIlQ4PHQABKdD27wMYBAVHtaKdLpVyxh8K9KN9+MDu32MDchjImCAA)
