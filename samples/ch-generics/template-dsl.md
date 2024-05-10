# Item 54: Use Template Literal Types to Model DSLs and Relationships Between Strings

## Things to Remember

- Use template literal types to model structured subsets of `string` types and domain-specific languages (DSLs).
- Combine template literal types with mapped and conditional types to capture nuanced relationships between types.
- Take care to avoid crossing the line into inaccurate types. Strive for uses of template literal types that improve developer experience without requiring knowledge of fancy language features.

////## Code Samples

```ts
type MedalColor = 'gold' | 'silver' | 'bronze';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAshAmBDANgYQPbPQJygXigHIBzTeQqAHyIGcBLZANwmwusICNt0A7ALwiEA3ACggA)

----

```ts
type PseudoString = `pseudo${string}`;
const science: PseudoString = 'pseudoscience';  // ok
const alias: PseudoString = 'pseudonym';  // ok
const physics: PseudoString = 'physics';
//    ~~~~~~~ Type '"physics"' is not assignable to type '`pseudo${string}`'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBACgzhArgEwPYGVgCcCWA7AcygF4oADMBFVAEgG85t8CBfMgbgCgBjVPRqHG44IebhABcsKmky5CJKAHJKSNEJFiIS9lCgB6fVFQBrHnwEBDADY5LcKfDUYmC0ipl8QAWx17Dxma8-MBQYAAWIHA43A7SznLMiiqR0bE6nAF6UAB+efk5UAAq4NBKAEQRUTFw5UpQOHBQeKih9tEEeJYARtbQwKhQoJDKFJ70jPKsZEoAdJxAA)

----

```ts
interface Checkbox {
  id: string;
  checked: boolean;
  [key: `data-${string}`]: unknown;
}

const check1: Checkbox = {
  id: 'subscribe',
  checked: true,
  value: 'yes',
// ~~~~ Object literal may only specify known properties,
//        and 'value' does not exist in type 'Checkbox'.
  'data-listIds': 'all-the-lists',  // ok
};
const check2: Checkbox = {
  id: 'subscribe',
  checked: true,
  listIds: 'all-the-lists',
// ~~~~~~ Object literal may only specify known properties,
//          and 'listIds' does not exist in type 'Checkbox'
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIAsIINYCMD2AHsgN4BQyywAJgFzIDOYUoA5gNwXIKY4R3IC+ADYQ4ITpQDa2CAE96AA2pwwcALQASEkxYhWAX0UBdegFcQ2EPgDuEsgbJkE+EE269sARnoYseImQAXlIuGnoAcgYzXAYEFlwICIAaLh5-fnpmMwhUygA3OGEcyLkIBhSyAHoq5AA-BrrkAHlcACssMGRhYEgoIuQAWzg5ZFdhUYYAByxgGFGrWxBkKah8GagwYHLUmsp9-fFqZAjC4qTkanxy5GsuiEJgd1BkMDkZk78cAkIIgDouBEVGp1D0mABJagVSJFYTqMCYUFPMAVZKUPb4bAOTguNxddI4ABMvk8P2CoUo4RO0Vi8WAiUqlAJsgE2VyXDBYEhDBhwjhCIgSKYqOqtUajRa7U63V60AGw1G40mMwQcwW1jsKzWGy2O1FBwNyCOJ053Iil2uDFu+Huj2eyzeHwiXwCv2xZCAA)

----

```ts
interface Checkbox {
  id: string;
  checked: boolean;
  [key: string]: unknown;
}

const check1: Checkbox = {
  id: 'subscribe',
  checked: true,
  value: 'yes',  // permitted
  'data-listIds': 'all-the-lists',
};
const check2: Checkbox = {
  id: 'subscribe',
  checked: true,
  listIds: 'all-the-lists'  // also permitted, matches index type
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIAsIINYCMD2AHsgN4BQyywAJgFzIDOYUoA5gNwXIKY4R3IC+ADYQ4ITpQDa2CAE96TFiFYBdegFcQ2EPgDuEsgF8yZBPhBNuvbAEZ6GLHiLIAvKS416AcgYbcDAgsuBDeADRcPE789MwaEBGUAG5wwvE+chAM4ZQA9LnIAA7QALbAYJDUXN7UcGBwALTCwEwAktTZPqnCDWCYTS1g2RFGnOaWYNZOAEwONgTE7uSUXsi+-oHBoYlTfAJxCVzNbR1dwj19EANM2XkFqQz4RaXllWHIJXVRDFQg1BDEMByYrGThAA)

----

```ts
const img = document.querySelector('img');
//    ^? const img: HTMLImageElement | null
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAlgWwOYwLwwCYmAVwQUzCgDoBHHfAJwE8BlfAG32ChEoAoByRJTgSgDcAKAD0ImBJgA9APwxQkWDwBcMABIAVALIAZAJIIAhknwBRJgSIwAPjDA4GDIUA)

----

```ts
const img = document.querySelector('img#spectacular-sunset');
//    ^? const img: Element | null
img?.src
//   ~~~ Property 'src' does not exist on type 'Element'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAlgWwOYwLwwCYmAVwQUzCgDoBHHfAJwE8BlfAG32ChEoAoByRJAYggAOzKAENcDEZQC0EHJHxROASgDcAKAD0GmDpgA9APwxQkWDwBcMAKJMCRGAB8YYHAwZqeB4hErBN2nQA-YJgABUoQIUooahhOH2BOTBB8CGcQWHwADzhoGHAYGKE4m3w7RWI1IA)

----

```ts
interface HTMLElementTagNameMap {
  "a": HTMLAnchorElement;
  "abbr": HTMLElement;
  "address": HTMLElement;
  "area": HTMLAreaElement;
  // ... many more ...
  "video": HTMLVideoElement;
  "wbr": HTMLElement;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgBIBUCyAZAogGwgFsJx04BzAOThMzgAdkBvAKGWQCI5OAuNLNgCCIBAAsA9lALFSYANzsucAEYqofAThklwijtwAmhqBADOZzRm2FdCpd1M9+14U51z9yAPTfkAOkDkIjgQAE9gqRRA-wcAN2BDCAkrQQA1ROSPPQcAd3VUm1kcgF9WIA)

----

```ts
interface ParentNode extends Node {
  // ...
  querySelector<E extends Element = Element>(selectors: string): E | null;
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApyhcA5A9gExQgA9IR8BnZPQ5AbwChlkB6F5AOi6eQEcBXaAE8AyhAA2EBGFxQAPAFFkJMpWQLJAWyxhkAXnVadAPgAUFCVJlQKALmQUwUUAHMAlPaUAfZCH7jxAG4eNk5uAF8GIA)

----

```ts
type HTMLTag = keyof HTMLElementTagNameMap;
declare global {
  interface ParentNode {
    querySelector<
      TagName extends HTMLTag
    >(
      selector: `${TagName}#${string}`
    ): HTMLElementTagNameMap[TagName] | null;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAbwL4CgYE8zDgCQCoCyAMngIYDmcAvHANbDoQBmuhRAogDbAC2wAdjDLkAcqT4FSYANwoAJsADGnUlGzlOEAEalOiFHDgBLQcChNSi7AAVVAmCIgL9hwwEcArmfQBlYN0UYaAAeA1dDYTE+OFAYATkAZ1ZiYTDDAD4ACjTXBP8lIKgALjgAAwASBEjxYCQAYkqEmCgTciRSnIBKEvxiLl57aokpAG0h4ABdOAAfOH4PTk5ZQ1RUIA)

----

```ts
const img = document.querySelector('img#spectacular-sunset');
//    ^? const img: HTMLImageElement | null
img?.src  // ok
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAbwL4CgYE8zDgCQCoCyAMngIYDmcAvHANbDoQBmuhRAogDbAC2wAdjDLkAcqT4FSYANwoAJsADGnUlGzlOEAEalOiFHDgBLQcChNSi7AAVVAmCIgL9hwwEcArmfQBlYN0UYaAAeA1dDYTE+OFAYATkAZ1ZiYTDDAD4ACjTXBP8lIKgALjgAAwASBEjxYCQAYkqEmCgTciRSnIBKEvxiLl57aokpAG0h4ABdOAAfOH4PTk5ZQ1RURQh+JuMeSho5CEUPPkEAOk9vPwDCzIByIx26hKxAywXVAFoEj03gGBvO2QAekB4QAegB+ODrTbwe7kHpsACSPAowH6x3gs3mixQcPBJwSUEUhmBcAgtBQQA)

----

```ts
const img = document.querySelector('div#container img');
//    ^? const img: HTMLDivElement | null
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAbwL4CgYE8zDgCQCoCyAMngIYDmcAvHANbDoQBmuhRAogDbAC2wAdjDLkAcqT4FSYANwoAJsADGnUlGzlOEAEalOiFHDgBLQcChNSi7AAVVAmCIgL9hwwEcArmfQBlYN0UYaAAeA1dDYTE+OFAYATkAZ1ZiYTDDAD4ACjTXBP8lIKgALjgAAwASBEjxYCQAYkqEmCgTciRSnIBKEvxiLl57aokpAG0h4ABdOAAfOH4PTk5ZQ1RURQh+JuMeSho5CEUPPkEAOk9vPwDCzIByOSMANzr1wVITM23yG87ZAHpf8IAPQA-HAXlsjDsemwACKPfrHeCzeaLFBAA)

----

```ts
type CSSSpecialChars = ' ' | '>' | '+' | '~' | '||' | ',';
type HTMLTag = keyof HTMLElementTagNameMap;

declare global {
  interface ParentNode {
    // escape hatch
    querySelector(
      selector: `${HTMLTag}#${string}${CSSSpecialChars}${string}`
    ): Element | null;

    // same as before
    querySelector<
      TagName extends HTMLTag
    >(
      selector: `${TagName}#${string}`
    ): HTMLElementTagNameMap[TagName] | null;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAbwL4CgYE8zDgYQMoFYDGAlgIYA2OAFmVAM5wC8cA5G3AD5sB873rANT82APxGtOnCQBpWAbjSZsACQAqAWQAyasgHNmcANbB0EAGZx12gKIVgAW2AA7GLr0A5Mk41kwilAATYCIKOmw9CggAI0pEFDg4EldgKHMyImwABXDXDwhg+MTEgHoSuGB6Ij9sWhgiagTigEcAV1T0PGB7IhhoAAom4rh6bpC+qAAuOAADABIEax19JABiBfoYKGS9JAX8QhDyKloGPYRN7eddmaG4AEppu0cXeG5nVooKAOGyke9sGRGNFgOZoMA7m0Ol0ehMADx3RLuLxOCogGAuQKMJbuO48QbDRKjWHQabzBDIgFrDZbHZIW7DR5WTRaZ5OVyUnx+ADanOAAF0uHAPl9FIlUKggA)

----

```ts
const img = document.querySelector('img#spectacular-sunset');
//    ^? const img: HTMLImageElement | null
const img2 = document.querySelector('div#container img');
//    ^? const img2: Element | null
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAbwL4CgYE8zDgYQMoFYDGAlgIYA2OAFmVAM5wC8cA5G3AD5sB873rANT82APxGtOnCQBpWAbjSZsACQAqAWQAyasgHNmcANbB0EAGZx12gKIVgAW2AA7GLr0A5Mk41kwilAATYCIKOmw9CggAI0pEFDg4EldgKHMyImwABXDXDwhg+MTEgHoSuGB6Ij9sWhgiagTigEcAV1T0PGB7IhhoAAom4rh6bpC+qAAuOAADABIEax19JABiBfoYKGS9JAX8QhDyKloGPYRN7eddmaG4AEppu0cXeG5nVooKAOGyke9sGRGNFgOZoMA7m0Ol0ehMADx3RLuLxOCogGAuQKMJbuO48QbDRKjWHQabzBDIgFrDZbHZIW7DR5WTRaZ5OVyUnx+ADanOAAF0uHAPl9FIlUKgiBBnJskg4DCxAhAiK12TAAHRQqCdMa9AasEjy1b0YgwDKfOgAWnorRlwBgrHuij+xQAegB+OBSmXwQ16aZLACSDn0wDZryFIooKG9sr9ACZDEqVWrNe1tTDxvrAiQAG6rb1m5KpOV6R3O8puz2x33y+NPexqyOfaNAA)

----

```ts
// e.g. foo_bar -> fooBar
function camelCase(term: string) {
  return term.replace(/_([a-z])/g, m => m[1].toUpperCase());
}

// (return type to be filled in shortly)
function objectToCamel<T extends object>(obj: T) {
  const out: any = {};
  for (const [k, v] of Object.entries(obj)) {
    out[camelCase(k)] = v;
  }
  return out;
}

const snake = {foo_bar: 12};
//    ^? const snake: { foo_bar: number; }
const camel = objectToCamel(snake);
// camel's value at runtime is {fooBar: 12};
// we'd like the type to be {fooBar: number}
const val = camel.fooBar;  // we'd like this to have a number type
const val2 = camel.foo_bar;  // we'd like this to be an error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEFMDoHNNAzA9og+gIwIYCdQFoB8CyAQtgFDwCuAdgMYAuAlotaLRgLbgA2AwhgGdwACnrgsHAFygB9LI2rQAlKADeZUKCzh6lLKzETI2gA7cMtEcBTCA2hlwAvALpLg0ADSgOoALyEOWwBGZ0h6RABVExNxfiFhJSUAbjIAXzIyEFBhbV19UHoATxiCxFA0cARGbm5wABNQBRkAC0Qsem5CpQoaBmZWRDQAK3AGABVEfi5uAB4xiAAPMWo6gVBBkYZ8YQ3pMZV1TVoWWXXKemkMakK-NVSUzSQcYWPqU9sAay8AN2d1+FAAHlhqN6JBwNQ5IxwAIdsNEmoNJozvRbOxpnERB8lH9fKBvg9QOlNLk9ANzil0mRXqcBNQMB9KnjVEhUJgsNIggAme6ZMDIgB6AH42Cd6DJ6YzpKoiGzsNJqJQOBUsEkidSxWxODxbhtQRMpjxhHSGeBknytdMAORrb4YbiUSoYcVYGhMLiNNYskjy0Dc3lZADu4CtDW4jEZBWalSKJXC5Uq3sQpA5oEVyvE6Rp4rt3Fu6J4kFZKbVoCDIbDEZjzUYa3jzQw3ydaaVKoKxXAGreOftXPz2u4ReQ6GwpfLodA4cj9BrdbKFVAVwgWCwbTIQA)

----

```ts
type ToCamelOnce<S extends string> =
    S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<Tail>}`
    : S;

type T = ToCamelOnce<'foo_bar'>;  // type is "fooBar"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gYQIYFsIBsDyA7AxhAHgGUoIAPYCbAEwGcpbgAnAS2wHMA+KAXgCgogqCXKUa9AAYASAN5sAZhCZQAEhCTUAvgH1ZCpbCQt0miQKEB+KNJlqNm2cjAtgSdCwBehGEfSdT5oIAXMIA3Hx8oJCwvLCIqBg4+AQA5PJwcNoARkhMKZyhggD0RVBR0Cz0AETpcABCuVV8QA)

----

```ts
type ToCamel<S extends string> =
    S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<ToCamel<Tail>>}`
    : S;
type T0 = ToCamel<'foo'>;  // type is "foo"
type T1 = ToCamel<'foo_bar'>;  // type is "fooBar"
type T2 = ToCamel<'foo_bar_baz'>;  // type is "fooBarBaz"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gYQIYFsIBsA8BlKEAewEAdgCYDOU5wATgJbEDmAfFALwBQU3UuBRZSgAMAJAG8GAMwg0oACQhJSAXwD64qTNhI66ZUK48A-FFFiFS5eORg6wJOjoAvCJnjI0WGDvTNm+w24ALl4Abg5QSFgABnZYRFQMTABySTg4ZOZQ7gB6HKhI6DpKACI0uBKI8GgYAEY490SsVPTVACMkGkzsqDyC6qhiqDL0gCFOysLYACYGhM8U8vbO5adu3PypoZG4cZpxp0qgA)

----

```ts
type ObjectToCamel<T extends object> = {
  [K in keyof T as ToCamel<K & string>]: T[K]
};

function objectToCamel<T extends object>(obj: T): ObjectToCamel<T> {
  // ... as before ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gYQIYFsIBsA8BlKEAewEAdgCYDOU5wATgJbEDmAfFALwBQU3UuBRZSgAMAJAG8GAMwg0oACQhJSAXwD64qTNhI66ZUK48A-FFFiFS5eORg6wJOjoAvCJnjI0WGDvTNm+w24ALl4Abg5QSFgABnZYRFQMTABySTg4ZOZQ7gB6HKhI6DpKACI0uBKI8GgYAEY490SsVPTVACMkGkzsqDyC6qhiqDL0gCFOysLYACYGhM8U8vbO5adu3PypoZG4cZpxp0mBgHk2gCsIAGNgRoWYPEISCig4c6vgVjYoMUMAbQBpQbEKAAawgIDgklgUCQlFuSUBADIqLQGCwALohGAA9EcZThDiSACuxGudDgwNeF2u8K8DwEzyp72YAAoqViAJQhU7Um7zJIwVg-DZQAB04phlDaEDSNGg4tFhj6cgAkgARACihjlwCJNGBxCJ6HQkphxBA4RFGoAcmq8RwOEA)

----

```ts
const snake = {foo_bar: 12};
//    ^? const snake: { foo_bar: number; }
const camel = objectToCamel(snake);
//    ^? const camel: ObjectToCamel<{ foo_bar: number; }>
//                    (equivalent to { fooBar: number; })
const val = camel.fooBar;
//    ^? const val: number
const val2 = camel.foo_bar;
//                 ~~~~~~~ Property 'foo_bar' does not exist on type
//                         '{ fooBar: number; }'. Did you mean 'fooBar'?
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gYQIYFsIBsA8BlKEAewEAdgCYDOU5wATgJbEDmAfFALwBQU3UuBRZSgAMAJAG8GAMwg0oACQhJSAXwD64qTNhI66ZUK48A-FFFiFS5eORg6wJOjoAvCJnjI0WGDvTNm+w24ALl4Abg5QSFgABnZYRFQMTABySTg4ZOZQ7gB6HKhI6DpKACI0uBKI8GgYAEY490SsVPTVACMkGkzsqDyC6qhiqDL0gCFOysLYACYGhM8U8vbO5adu3PypoZG4cZpxp0mBgHk2gCsIAGNgRoWYPEISCig4c6vgVjYoMUMAbQBpQbEKAAawgIDgklgUCQlFuSUBADIqLQGCwALohGAA9EcZThDiSACuxGudDgwNeF2u8K8DwEzyp72YAAoqViAJQhU7Um7zJIwVg-DZQAB04phlDaEDSNGg4tFhj6cgAkgARACihjlwCJNGBxCJ6HQkphxBA4RFGoAcmq8RwOJcKdQqMQkGC4mIlh0aCFatN8Rw+jwAHomJ3EF3kN1gkJiKDezohQ0oaU0bLKR3O4BQS5NOJMmn89As6PuiAc8LB7hh3PZ3NNblvIseJLxxO+qAptMZ5hZyM5gBuDjiec8ovKeyr+VD4frw-QyaJqZk-ZdC9mXzHGAnrR9054h6PR4AfmfzyeoAAFGhwSA0UBQFpwZZdKCkOAQSjEOA5gjFHMKX6SAgxnY9wIg7hknbMYky7ZceygZRklFKA1ToUgoAhIkoDQJBgWfPZkiMKoogAJS-OB0EHVwyKQAB3T4oDo+j6SeSgADESTJICTBYqA4wBIFQXBSFmIYzFxPonFAymbAQGIYAAAtWxNL4KPIKiaMwHl3lpTAYJfH0lxXdMkL8A8axMOSFOU1TPQTWDO27GQMwdIA)
