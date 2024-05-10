# Item 47: Prefer Type-Safe Approaches to Monkey Patching

## Things to Remember

- Prefer structured code to storing data in globals or on the DOM.
- If you must store data on built-in types, use one of the type-safe approaches (augmentation or asserting a custom interface).
- Understand the scoping issues of augmentations. Include `undefined` if that's a possibility at runtime.

## Code Samples

```ts
document.monkey = 'Tamarin';
//       ~~~~~~ Property 'monkey' does not exist on type 'Document'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYewxgrgtgpgdgFwHRRHA1jAngAgLw4DkAKgIZSkBOAlnIQNwBQA9MzuxzgH4+84AKlEAAcYlBLkKoM2QjlAwAzjjggEOGAA9qi9WhwTRRACLho8BIUZA)

----

```ts
(document as any).monkey = 'Tamarin';  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/BQEw9gxgrgtgpgOwC4AICGBndCCeBKAOhjAQGs4cUBeFAcgBU0Y0AnASwVoG4UUB6PigDyAaQBQQA)

----

```ts
(document as any).monky = 'Tamarin';  // Also OK, misspelled
(document as any).monkey = /Tamarin/;  // Also OK, wrong type
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/BQEw9gxgrgtgpgOwC4AICGBndCCeBKAOhjAQGscUBeFAcgBU0Y0AnASwRoG4UUB6XlAEEANhjAoA8gGkANChisMGAA5xhwuCABQoSLESpM2fERKk4FarwZM2CXtz4CRYybJQB3ZiQDmKJDiqWkA)

----

```ts
interface User {
  name: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('/api/users/current-user');
  const user = (await response.json()) as User;
  window.user = user;
  //     ~~~~ Property 'user' does not exist
  //          on type 'Window & typeof globalThis'.
});

// ... elsewhere ...
export function greetUser() {
  alert(`Hello ${window.user.name}!`);
  //                    ~~~~ Property 'user' does not exist on type Window...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDcuAvrrgCYD2CArqeAHRw2bAKIA3COAAywKpOgAKAEQARAPIBZAMIdwksFI5CIbJQBpkcdAE8QCZAoCUyALwA+HPmQJdVZFAh0AAdfFBdLAHc4YDBkGAgwBAALBQByAHo4IOB07kwodHSeKADwAFo86FTHRgIfED9KqFcHOCiY-0CQhoh+ACt0XSdnKzR82uQI0E4I-iaWpon09IJVgD8NteQABSgOIOgwa2RUptTkTkDCDliIAA9ZMC9l1dfV3WQjg5OAdWmOCLIABkn2sBw4MGQtAANhwAEZwaEAFSSslS-GYNVYL34uOQEGhmAiSWgKFxGPuISgsRg3DsYGAH1oAQSGEUzjwBERhwUAAMABIE2HIAAk2CmIBmc3y-CIpCYAEJeViCC83uqNchNltdvtDsdTvlzpd0Ndbg8-B8vig-pKAeTmLggA)

----

```ts
declare global {
  interface Window {
    /** The currently logged-in user */
    user: User;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDcuAvrhAB4AOA9lGDiwBMICADZwoKWiK4AjOCJz5koSLEQoA6qAFcA7ooIEA9ACoTyACoALFAgCuUCeBEBPZNNq0IAgLShkdphQyCZGSgSB0BQY0IwELCxAA)

----

```ts
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('/api/users/current-user');
  const user = (await response.json()) as User;
  window.user = user;  // OK
});

// ... elsewhere ...
export function greetUser() {
  alert(`Hello ${window.user.name}!`);  // OK
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDcuAvrhAB4AOA9lGDiwBMICADZwoKWiK4AjOCJz5koSLEQoA6qAFcA7ooIEA9ACoTyACoALFAgCuUCeBEBPZNNq0IAgLShkdphQyCZGSgSB0BQY0IwELIJc9qTgAHRwAgIAogBuEOAAMsBU+dAAFABEACIA8gCyAMJc4PlgBVwZ3hUANMhw6C4gCMhlAJTIALwAfAbICM1UyBLo3CCYk326cMB8MBBgCFZlAORGcBzARpFQ6Eb2jq0+18ejcXMLfNcbZXBbO0sQFYLCCpABW6GaY3G-TQQTeum0elSXwmAThxiMyBqAGlmK9cLgjJjUiTkBARJhdDYJMgSalWJweLs7EMwMBmshaBJ9jEoGNZvJoGAygADAAS5OkyAAJNgESAdLpkUFUkRSEwAIQi14YrG4lhAA)

----

```ts
declare global {
  interface Window {
    /** The currently logged-in user */
    user: User | undefined;
  }
}

// ...
export function greetUser() {
  alert(`Hello ${window.user.name}!`);
  //             ~~~~~~~~~~~ 'window.user' is possibly 'undefined'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDcuAvrgCYQIA2cUKtnAewBGcTjnzJQkWIhQB1UKwEB3cQQIB6AFRbkAFQAWKBAFcovcJwCeyQbVoRWAWlDITmKMi0aJBd9AoMLAAfNxB2GFBHRgIWFlwNDWQAOlTcCAAPAAcBKDBkGBMQBDBgARBkWl4IMCCoAAoASjVkUWgweoADAAkITkFkABJsZUUVZP8oZKJSJgBCTsaY5ET1NfXkAD9tnd3N5AByUfDxyYPJdGQc9HRgIWtDooio1gPk5lwgA)

----

```ts
type MyWindow = (typeof window) & {
  /** The currently logged-in user */
  user: User | undefined;
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('/api/users/current-user');
  const user = (await response.json()) as User;
  (window as MyWindow).user = user;  // OK
});

// ...
export function greetUser() {
  alert(`Hello ${(window as MyWindow).user.name}!`);
  //             ~~~~~~~~~~~~~~~~~~~~~~~~~ Object is possibly 'undefined'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDcuAvrmAJ4AOKAsmwOqgAJgHsA7sgC8yABTsuwmMlFCxASmQAyHPmQB6AFT7kAFQAWKBAFcoUCOAA2bZPeG1aEQQFpQyS5ijI+ro6ftAUGFgAPr4gghAwoB6MLLgiVqTgAHRwgoIAogBudmAAMsBUdtDSAEQAIgDy3ADCwuDFJcI5HtUANMhw6GwgCDLqEgB82gQIrVTItugcsyhScKJwwGDIMBBgCKbSAOS6cBzAuqFQ6LpWNsWel4eqjNOzW5eSMmsbWwtLIJhMgArdCtaSqdQDND+F4yZSxMT9dDIXgCBGiVSZD5SS70Ai6XTIeoAaWYz1wuAJyEyNNwEAAHksoFsYJZhmBgK1kLRbLsIlBwVN+vZoGBpAADAASEHsLmQABJsNJ4SJxFDUSoMVj-JkiKQmABCcXk-GEgjmi3mgB+NttdvtDrtRIARkCIAgtuVkEt0OhgM7HMhDmy4gkQB5DplmLggA)
