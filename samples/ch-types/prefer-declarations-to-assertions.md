# Item 9: Prefer Type Annotations to Type Assertions

## Things to Remember

- Prefer type annotations (`: Type`) to type assertions (`as Type`).
- Know how to annotate the return type of an arrow function.
- Use type assertions and non-null assertions only when you know something about types that TypeScript does not.
- When you use a type assertion, include a comment explaining why it's valid.


## Code Samples

```ts
interface Person { name: string };

const alice: Person = { name: 'Alice' };
//    ^? const alice: Person
const bob = { name: 'Bob' } as Person;
//    ^? const bob: Person
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAsI5XJwA2wSFdFGy4AvPkIlyyAOQBBPkhmNWAelXJNyAHoB+ZBxBde-aUJHtOYZACMsN5OIJFSFGQCF7yhtwxpMOGoaWnoGVrb2ggEgLEA)

----

```ts
const alice: Person = {};
//    ~~~~~ Property 'name' is missing in type '{}' but required in type 'Person'
const bob = {} as Person;  // No error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XJwA2wSF6KNlwBefMxYB6SclnIAfosVooWAA7QwAT2QByIqV3JgGZMRMY6x3No168DIwCMArmGRQIARxfBPAE2tkWxRdQWFdNg53JywnZDEHLlNwnCZZaWQAOSxkaFUoFiA)

----

```ts
const alice: Person = {
  name: 'Alice',
  occupation: 'TypeScript developer'
// ~~~~~~~~~ Object literal may only specify known properties,
//           and 'occupation' does not exist in type 'Person'
};
const bob = {
  name: 'Bob',
  occupation: 'JavaScript developer'
} as Person;  // No error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XJwA2wSF6KNlwBefC2SES5ZAHIAgrySyANBORYECAK4AHOGGA4KsgCoBPXRADKCGrrDIAJhABuEblitRZLAPR+yAB+IaGhyADyAEYAVhAIjryQUDzIxHDmGiDcmRhWCMAwmQDWIFgA7ri6UF7QhhAYagGSLa2ScCBOcpo6+oY4ss5YDYRYjhAAHsCcoMhgliiygsK+zGwcjlFYUchieOpEpCYAQtuq6j16BkYgJgBScK5wtvaOLu6e3qtcGGiYOExJM0AHJYZDQGpQFhAA)

----

```ts
const people = ['alice', 'bob', 'jan'].map(name => ({name}));
// { name: string; }[]... but we want Person[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XIAOEWXANigC8yANoByOP2BJxAGmTiARliXzFAKzghxAXQB0xOFwAURUsiEA+ZCbzmIDAJRPWAejf5CJcpWp0mRlEDfX1kJQBXMGQAdxQY7Wj0KGwQYJYgA)

----

```ts
const people = ['alice', 'bob', 'jan'].map(
  name => ({name} as Person)
); // Type is Person[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XIAOEWXANigC8yANoByOP2BJxAGmTiARliXzFAKzghxAXQB0xOFwAULZIRLCAfMhN4ipBsjgY0mHAEoWnpsgD0-sgAKgCePMjAbuhQ2CCiuixAA)

----

```ts
const people = ['alice', 'bob', 'jan'].map(name => ({} as Person));
// No error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XIAOEWXANigC8yANoByOP2BJxAGmTiARliXzFAKzghxAXQB0xOFwAURUsiEA+ZCbwNkcDGkw4AlG9YB6L8gByWMjQUFhQLEA)

----

```ts
const people = ['alice', 'bob', 'jan'].map(name => {
  const person: Person = {name};
  return person
}); // Type is Person[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XIAOEWXANigC8yANoByOP2BJxAGmTiARliXzFAKzghxAXQB0xOFwAURUsiEA+fC2TJ2ITjyjYQFdK5yX85iMztkKAgwAFcoXBc3FgYASiZkAHpE5AAVAE8eZGAMNEwcUV0WIA)

----

```ts
const people = ['alice', 'bob', 'jan'].map(
  (name): Person => ({name})
); // Type is Person[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XIAOEWXANigC8yANoByOP2BJxAGmTiARliXzFAKzghxAXQB0xOFwAULZMhNFSASgroo2XEIB8lvNYgMbLG02QA9AHIACoAnjzIwBhomDiiuixAA)

----

```ts
const people: Person[] = ['alice', 'bob', 'jan'].map(name => ({name})); // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAObIC+A3AFAI5XIAOEWXANuTSYcAbQC6yALzJRAcjj9gSOQBpkcgEZZNajQCs4IOeIB0xOFwAURUtIB8yK3lsQGASndNkAeh-IAeQBpFiA)

----

```ts
document.querySelector('#myButton')?.addEventListener('click', e => {
  e.currentTarget
  // ^? (property) Event.currentTarget: EventTarget | null
  // currentTarget is #myButton is a button element
  const button = e.currentTarget as HTMLButtonElement;
  //    ^? const button: HTMLButtonElement
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYewxgrgtgpgdgFwHQEcIwE4E8DKMA2MYCIGAFAOQDEUWAQhAiXBQJQD8SAhsMAKIA3eAgAyASwDOCeJkph8YsAGsKAGgAEMdQF4AfOoDeAKHWakkDBmEAVLhgDmMBCfUB6V+oB67dWQAOGCB+mAhYrOqCwuYQljZ2jggAXBFCiLYOTuoAPupwEPj4Lu7qFlZp8ZmS6jT0jMzqVVzqAEZ1IHCahLCILmDtUi1tHdpmpXEZCOpcEuoAEtYAsiIMTO18XcIA3EUepl4+fXADratwyfNLK8zrMN3OAL6s20A)

----

```ts
const elNull = document.getElementById('foo');
//    ^? const elNull: HTMLElement | null
const el = document.getElementById('foo') as HTMLElement;
//    ^? const el: HTMLElement
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBApgGwHIFcEJgXhgExMFAWzjCgDoBzOKAUQTmNICEBPASRwAoByAMxBDcAlAG4AUAHoJMGTAB6AfhihIsRKnQAuGAAkAKgFkAMnQYlYAHxhg0CMSujwM2PAUbkqteu9Yce-QSEYAEMIXUMTb3NxKVl5JQc1BG19Y1N3MSA)

----

```ts
const el = document.getElementById('foo')!;
//    ^? const el: HTMLElement
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBApgGxgXhgExMArgWzmKAOgHM4oBRBOPAgIQE8BJNACgHIAzEENgSgEIA3ACgA9KJiSYAPQD8MUJFiIAXDAASAFQCyAGUrV8UYUA)

----

```ts
document.getElementById('foo')?.addEventListener('click', () => {
  alert('Hi there!');
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYewxgrgtgpgdgFwHQHMYIKIBsa0QIQE8BJYACgHIAzEECgSgH4kBDYYDAN3gQBkBLAM4J4MAE6UwWfmADWFADQACMvSUBeAHxKA3gCglSljjEJKACX5KEAC3EwAhAwDcegL71XQA)

----

```ts
interface Person { name: string; }
const body = document.body;
const el = body as Person;
//         ~~~~~~~~~~~~~~
// Conversion of type 'HTMLElement' to type 'Person' may be a mistake because
// neither type sufficiently overlaps with the other. If this was intentional,
// convert the expression to 'unknown' first.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAOYDcyAvgFAI5XIBGWAJgJ7IAvMl5YEAV1LgAdDwH02HMMggAbYdz6C4GNJhyKA9EeRnz5gH7Wbt2yxPIAwjgBumYDmRYYyMPwAHFAByAAkAFQBZABkAUTUIaTBgvyw-QJD0KGwQFOI4QS4UOGRiYCo4AGsUIoQ4CQwIB1MQCGAwAAtodKDKCRgYYARgCHA1QSx3KDU4AL0Ad3aOvy7vTugZZABJX07y5HndZFBIcE8iNQAaZuR2ECmVddUADwCoCAwMc9TkYIkQSogLDzXLIQbZMAyFhAA)

----

```ts
const el = document.body as unknown as Person;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN7IhwC2EAXMhmFKAOYDcyAvgFAI5XIQA2yAvMgAmWBAFdS4AHQAjLIICeyOBmSiQAaxBYA7rmVpMORsgD0J5AHkA0iyA)
