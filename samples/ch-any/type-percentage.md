# Item 49: Track Your Type Coverage to Prevent Regressions in Type Safety

## Things to Remember

- Even with `noImplicitAny` set, `any` types can make their way into your code either through explicit ++any++s or third-party type declarations (`@types`).
- Consider tracking how well-typed your program is using a tool like `type-coverage`. This will encourage you to revisit decisions about using `any` and increase type safety over time.## Code Samples

```ts
function getColumnInfo(name: string): any {
  return utils.buildColumnInfo(appState.dataSchema, name);  // Returns any
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBArlAlgGwjAvDA3gKBjAIzhQBMBhEZOAWzAEkwAzEACggC4YBDMATwBoYYLtQCmnaACdEYAOYBKTj17YAvvxyqA3DhKjgyLpNExko2FwAOlgMpQuUcdhgkHXG8AAWo6l05wwAGswEAB3MBhtHEYA4CRwGFlzCipaBmYWYTEJKGk5RW4+bDwYYyg4SQiEFAgAOiJSFJp6JlYrW3tHWtd7D29fQSzReS18AHoxmAAlcwrIQt5NHCA)

----

```ts
declare module 'my-module';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBArlAlgGwjAvDA3gKBjAIzhQBMBhEZOAWzAEkwAzEACggC4YBDMATwBoYYLtQCmnaACdEYAOYBKTj17YAvvxyqA3DhKjgyLpNExko2FwAOlgMpQuUcdhgkHXG8AAWo6l05wwAGswEAB3MBhtXX1DYxhqEBI4MxgAcmpeAFoEpLNUnSA)

----

```ts
import {someMethod, someSymbol} from 'my-module';  // OK

const pt1 = { x: 1, y: 2 };
//    ^? const pt1: { x: number; y: number; }
const pt2 = someMethod(pt1, someSymbol);  // OK
//    ^? const pt2: any
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBArlAlgGwjAvDA3gKBjAIzhQBMBhEZOAWzAEkwAzEACggC4YBDMATwBoYYLtQCmnaACdEYAOYBKTj17YAvvxyqA3DhKjgyLpNExko2FwAOlgMpQuUcdhgkHXG8AAWo6l05wwAGswEAB3MBhtHERqSxBJWCwIEDEAWXNPEBJBZLEbXmoCSlUYRkkUmAByal4AWmosuDNKrXwAejaYAHkAaRwcUEhYSygARgxnAA9OUcFeTgAmSJ0O-HwAPQB+GEHoGBHRziwYaaEaAlFJVvmzwsvW1QHwPZGlzFzRdKhMkhYDnJSonyhUo8laMFWvRwqzWWx2z2GUAWSj4OCAA)
