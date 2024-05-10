# Item 6: Use Your Editor to Interrogate and Explore the Type System

## Things to Remember

- Take advantage of the TypeScript language services by using an editor that supports them.
- Use your editor to build an intuition for how the type system works and how TypeScript infers types.
- Familiarize yourself with TypeScript's refactoring tools, e.g., renaming symbols and files.
- Know how to jump into type declaration files to see how they model behavior.



## Code Samples

```ts
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  if (typeof elOrId === 'object') {
    return elOrId;
    // ~~~ Type 'HTMLElement | null' is not assignable to type 'HTMLElement'
  } else if (elOrId === null) {
    return document.body;
  }
  elOrId
  // ^? (parameter) elOrId: string
  return document.getElementById(elOrId);
  // ~~~ Type 'HTMLElement | null' is not assignable to type 'HTMLElement'
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQKIBtUFtVhQAUqWA8gE4CSAJgFyIDOUFMYyiAPogBIAqAWQAy2PAShdEYEFiwBKBv2Gj8hRAG8AUIkQxgiIlACeAB1Rx9pSrUQBee4gDkcAEYArVNEdyN2nYgp0EAokK2oaAG4-HQB6GMQAPyTEPlNUJyURHFUJbmlZR11GKTgJAENGRhhkMDKXHEQoOEa0jMEssUJHPwBfRFJGdL0DMJt7WykZeV9-AKCQxBo4CBAcgDoXOBojKJ0ev1GaPzjEAD0AfgMTMooy-ChUCh9DhmZWdj9AqGCkJZX1tCYbLiABCRloJHI4Tku0QJySCRSrUcmRU4kk+SwhRgxTApUQFSqNTqDSaLTMbWUwK6mn2QA)

----

```ts
function getElement(elOrId: string|HTMLElement|null): HTMLElement {
  if (elOrId === null) {
    return document.body;
  } else if (typeof elOrId === 'object') {
    return elOrId;
    //     ^? (parameter) elOrId: HTMLElement
  }
  const el = document.getElementById(elOrId);
  //                                 ^? (parameter) elOrId: string
  if (!el) {
    throw new Error(`No such element ${elOrId}`);
  }
  return el;
  //     ^? const el: HTMLElement
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQKIBtUFtVhQAUqWA8gE4CSAJgFyIDOUFMYyAPgBIAqAsgBlseAlA5gQWLAEoGvQcPyFEAbwBQiRDGCIS5ajUQBeE4glTpqjZsQV0ICkhpwIIJVAB0AIzg0AngDc1gC+iKSMqFo6RFB+AA6ocDqklLTGpgDkcF4AVqjQGZbqNrb2jmH6tEElAPQ1JYgAegD8unEAhhTt+FCoFJYpBnL8QjjuIdYQCMwVxojOru4eaJhjogBCfrR6qTTS1Yh1DccnpyctbZ3d6H0DlfRMLGzI1tq6AISkRdaaUAAWFDgAHczKgQRgKICKEQAAYAOTgTBAED+FREygAJCpBrRgjD9hNNHYoA4kKQDkcShcpmAZqRhgo1oQ1ME1EA)

----

```ts
let i = 0;
for (let i = 0; i < 10; i++) {
  console.log(i);
  {
    let i = 12;
    console.log(i);
  }
}
console.log(i);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/DYUwLgBAlhC8EAYDcAoAZgewE4QBSkhnmWggB4IBGEqAaloEoIBvFCCAYwwDsBnDUADpgGAOa4oDVO1bt2BUvEoAmaXK58BIYWIlS2EAL4pjG-kJHjJqIA)

----

```ts
let i = 0;
for (let x = 0; x < 10; x++) {
  console.log(x);
  {
    let i = 12;
    console.log(i);
  }
}
console.log(i);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/DYUwLgBAlhC8EAYDcAoAZgewE4QBSkgA85EkJiAeCARmXIGp6BKCAbxQggGMMA7AZwygAdMAwBzXISapO7TpwLQS1AEyyFPAUJCiJuKDI4QAvijNbBIsZMOogA)

----

```ts
declare function fetch(
  input: RequestInfo | URL, init?: RequestInit
): Promise<Response>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtVJAzAAsAKAKHni1QAdkMAueAJRAEdkQBnDASVSIc8AD7wAqiwAyAGmqosGAPzM2nHvwUZyASmYAFGDgC2WbiAA8bbrTzmAfAG5yQA)

----

```ts
interface Request extends Body {
  // ...
}
declare var Request: {
  prototype: Request;
  new(input: RequestInfo | URL, init?: RequestInit | undefined): Request;
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGczIQAekIAJrsgEID2ZAnsgN4BQyyA9B8gHR8sBfFmQgIANnCgoAbpLSYc+AFzM2yAA5QaYbfXUQV6bHjABuNSAgB3ABSh1WMIYUmAkiBg1kAH2QBVVAAZABpkUGAwAH5nY3x3CJ9kLHIIGFAIMgBKGMUzQXMgA)

----

```ts
interface RequestInit {
  body?: BodyInit | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwCSIwYyA3gFDLIBGA9gCYCeA-AFzIBCjTRJyAH2QgsAG1EBuKsgSIAFhHZpMOfAGF5EKdQRQIDCOGBxRuJemx4wavQaMnc25ArgGoZjgAkIr6Lj5gTgD0QcgAdBEUAL4UQA)
