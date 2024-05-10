# Item 15: Use Type Operations and Generic Types to Avoid Repeating Yourself

## Things to Remember

- The DRY (don't repeat yourself) principle applies to types as much as it applies to logic.
- Name types rather than repeating them. Use `extends` to avoid repeating fields in interfaces.

[role="less_space pagebreak-before"]
- Build an understanding of the tools provided by TypeScript to map between types. These include `keyof`, `typeof`, indexing, and mapped types.
- Generic types are the equivalent of functions for types. Use them to map between types instead of repeating type-level operations.
- Familiarize yourself with generic types defined in the standard library, such as `Pick`, `Partial`, and `ReturnType`.
- Avoid over-application of DRY: make sure the properties and types you're sharing are really the same thing.


## Code Samples

```ts
console.log(
  'Cylinder r=1 × h=1',
  'Surface area:', 6.283185 * 1 * 1 + 6.283185 * 1 * 1,
  'Volume:', 3.14159 * 1 * 1 * 1
);
console.log(
  'Cylinder r=1 × h=2',
  'Surface area:', 6.283185 * 1 * 1 + 6.283185 * 2 * 1,
  'Volume:', 3.14159 * 1 * 2 * 1
);
console.log(
  'Cylinder r=2 × h=1',
  'Surface area:', 6.283185 * 2 * 1 + 6.283185 * 2 * 1,
  'Volume:', 3.14159 * 2 * 2 * 1
);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgziA2CmB00QHMAUAoABJg5AYQE9oBLMAE1gCdNKBeARkwHXMALBnAGi1wGUBXSgDMAhsFiYRlWCIBcXTADZ4AJgAcAZnpqArJgBUmRocYBqJas3a9Jg0e7YcANRj8AtrHmdMG+PQAs9DoAnHbGRmHoAJQA3OigkDAISGg8+ESkFNR0jCzsKlxpAsJiElIyXhbqWrphdebK1dZ2KmEOuC7Q7p4KvgFBobaGrSbRcQlQcIgoGI6EJORUNLSteRztOMWi4pLScgqNVrXD9VVHNpgj9mmd3ZV9gSEtz6Ox6EA)

----

```ts
type CylinderFn = (r: number, h: number) => number;
const surfaceArea: CylinderFn = (r, h) => 2 * Math.PI * r * (r + h);
const volume: CylinderFn = (r, h) => Math.PI * r * r * h;

for (const [r, h] of [[1, 1], [1, 2], [2, 1]]) {
  console.log(
    `Cylinder r=${r} × h=${h}`,
    `Surface area: ${surfaceArea(r, h)}`,
    `Volume: ${volume(r, h)}`);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwiA2BLAdgEwgJwGLKgXigAoMAuKZAVwFsAjTAGigAszLbMBKfAPnOrowBuAFABjAPbIAzsChSKGAGYBDURACCGCMrJwkaTDnxEMjJlzy8ATFABUUALLLgTAHQAFAJJ2oGH8SgAamYOEQlpWQA3cXhqCF0EFHRsXAJiMwteJxcPb3s-fJ8mEWFFcT9CcJkoAG1TZgBdKHFFWpqARkZ2hsYOxise2qsuhoauAG9hKCgqmIhXeHEAc0Ip6agAAz0kzF88ABJxjABfKAB15gPxpmON+jXpjYBlBRU1KGUtHShD+SVVDRfdIhW73dabABqMTiZEO0ViVAgwPMt1CwmOwiAA)

----

```ts
interface Person {
  firstName: string;
  lastName: string;
}

interface PersonWithBirthDate {
  firstName: string;
  lastName: string;
  birth: Date;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgQKhIsRCnTkcAdWBgAFgCEyagCJxI+LqXJVaDJmBYgOXXv1NCLIrgCMtqxrshiCQA)

----

```ts
function distance(a: {x: number, y: number}, b: {x: number, y: number}) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAExgZygQ0gUwBSYBciA3gB7FggC2ARjgE4A0iAnpTfQwL4u3HkOdRi3aIqwngEpSAKESIGOKCAZIAspigALAHRoAjgyh4CusogC0iWuZkAqe4gBMiANSIzrKzd2sHTs5SANyy3LJAA)

----

```ts
interface Point2D {
  x: number;
  y: number;
}
function distance(a: Point2D, b: Point2D) { /* ... */ }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRgEwBFkDeAUMsgB4BcyIArgLYBG0A3CcgJ5W2MtEC+RGDRAIwwdCGQATYAGcwcERAAUcKhix4ANMgbrM4PAEpCyAPQAqZADpbyC2eQCgA)

----

```ts
function get(url: string, opts: Options): Promise<Response> { /* ... */ }
function post(url: string, opts: Options): Promise<Response> { /* ... */ }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgCWA7ALgUwE4DMCGBjdUAeQAdVEB7ZAZ1AG8BfeEUWAOWnmwFdl8K1UAHN0qABQ9MAGwBcoGqkwphAGlCVyNeWUG0AlPIAKmSgFtENdAB4ASuhqlqVgHwNQwAFSgAwsQCyRrawAMohoJ5gmGJSyKAm5pboAHTRNJTSAG7o4sjoAO6g9o7OOfr6ANwe3hzQEWDMvPx6oE6KkjLyisrIahpaOuRUBsamFlZ2Dk606G701b4BQaHhkaDRqLHxY0mpDhnZuQVFU6Xi5VVebJz1oMzwQA)

----

```ts
type HTTPFunction = (url: string, opts: Options) => Promise<Response>;
const get: HTTPFunction = (url, opts) => { /* ... */ };
const post: HTTPFunction = (url, opts) => { /* ... */ };
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgCWA7ALgUwE4DMCGBjdUAeQAdVEB7ZAZ1AG8BfeEUWAOWnlQE9SjwAFUEAFAGIBXZPgrVQAXlAAKCZgA2ALlA1UmFAHMANKErkaWsrNoBKBQD5QIzJQC2iGugA8AJXQ1S1B52ANzw+IGooProqFpCopLSVgrKqmrGpqg0tvIO9KDAAFSgAMLEALIi3rAAyjWghWCYMarIjs5uHgB0zTSUagBu6ErI6ADuoL7+gcPW1sEFxRzQDWCMoeG0kQE6ccLiUjJUbYoq6hlmOXmLpRVVtfWNoM2ore2u7ug9fv1DI+OTPwBWizeY3ZarUDreDwIA)

----

```ts
interface Person {
  firstName: string;
  lastName: string;
}

interface PersonWithBirthDate extends Person {
  birth: Date;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgQKhIsRCnTkcAdWBgAFgCEyagCJxIyCAA9IIACYY0mHPi4AjLasa7IYgkA)

----

```ts
interface Bird {
  wingspanCm: number;
  weightGrams: number;
  color: string;
  isNocturnal: boolean;
}
interface Mammal {
  weightGrams: number;
  color: string;
  isNocturnal: boolean;
  eatsGardenPlants: boolean;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgVCRYiFACEyAE3xcA7mwwAHOCADCNRiACuNAEbROxFRGCsAFmADiUWhgPGzUC8gRZuWKEJgLCAcXMAYlFgIYIZQIHDcjCZYvhDaYhLg0PBIyACytDQJypbWdo7ONK7IRqbmXD5+AUxBImERUTFxCUkp3GkgXmlgGA5wUAoQIKi84NXJqekE4kA)

----

```ts
interface Vertebrate {
  weightGrams: number;
  color: string;
  isNocturnal: boolean;
}
interface Bird extends Vertebrate {
  wingspanCm: number;
}
interface Mammal extends Vertebrate {
  eatsGardenPlants: boolean;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgVCRYiFADVokAEZQ4kfFwDuEYKwAWYAOIqaGRiACuNRdE7EEWblihCwLEBy7AMlLAjDmoEDhuRkUsBwg4EDEJcGh4JGQAITIAE2QIAA9IEFSMZHkoJRU1QmINNgwAByiAYRozS2soGMl4mWQAWVoaYIzsiFz8wuLVFDKM1QwDOChUwdRecFNkMIiomKA)

----

```ts
type PersonWithBirthDate = Person & { birth: Date };
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAcnALYQBcyFUoA5gNxHIA2cF1dRszacAvgTABPAA4p05HAHVgYABYAhMmoAicSMgC8aTDmQAyfMgBGW1Y137RnIA)

----

```ts
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  // omits pageContents
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5AVwGdoBJAEwC5liwpQBzAbn2QAc5GIAVYMADYQadBiBZsoEJOABiwIcRH0mAbQC6rAp24BhAPbgI4JbRXjWAX1yhIsRCh772AOTgA3dJhR4CJctRmYhLaXLz8QsrBWshSMmDyilFqmmwA9GnI+gC2-MQcYQZGJrjWQA)

----

```ts
interface TopNavState {
  userId: State['userId'];
  pageTitle: State['pageTitle'];
  recentFiles: State['recentFiles'];
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5AVwGdoBJAEwC5liwpQBzAbn2QAc5GIAVYMADYQadBiBZsoEJOABiwIcRH0mAbQC6rAp24BhAPbgI4JbRXjWAX1yhIsRCh772AOTgA3dJhR4CJctRoGJCqAOT+UJShmmw6vPxCNF4hoXF8ghDRWshSMmDyiknBEGG5xvkKEMRZuJasQA)

----

```ts
type TopNavState = {
  [K in 'userId' | 'pageTitle' | 'recentFiles']: State[K]
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5AVwGdoBJAEwC5liwpQBzAbn2QAc5GIAVYMADYQadBiBZsoEJOABiwIcRH0mAbQC6rAp24BhAPbgI4JbRXjWAX1xgAnuxQ997AHJwAbukwoAvDjaqANLIoMgA5CTkFGHIAD7hOrz8QjHxYVIyYPKKYeo0XpBB6riWrEA)

----

```ts
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5AVwGdoBJAEwC5liwpQBzAbn2QAc5GIAVYMADYQadBiBZsoEJOABiwIcRH0mAbQC6rAp24BhAPbgI4JbRXjWAX1xgAnuxQ997AHJwAbukwoAvMgAKwAgA1gA8XpAANMgA5CTkFDHIAD6xOrz8QkmpMVIyYPKKMQB8rEA)

----

```ts
interface SaveAction {
  type: 'save';
  // ...
}
interface LoadAction {
  type: 'load';
  // ...
}
type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load';  // Repeated types!
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpwG4QIILMAexGQG8AoZZMATwAcIAuZAcgGdMJmBuC5Aej7IAdCLIBfMqEixEKADIE4AE1z4ipXjXpNmAG0VLuvAcNEStKVYWIBeNByvqAPsgXLHIHheQeAKnRQ7Ng5mZBc9A25KEwAlCHo4SCUqANYAQjIgA)

----

```ts
type ActionType = Action['type'];
//   ^? type ActionType = "save" | "load"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpwG4QIILMAexGQG8AoZZMATwAcIAuZAcgGdMJmBuC5Aej7IAdCLIBfMqEixEKADIE4AE1z4ipXjXpNmAG0VLuvAcNEStKVYWIBeNByvqAPsgXLHIHheQeAKnRQ7DwBtZgtmAF0eE0oAPQB+KgCfPGt-emQ7ACJ2LCzkFyz9ZSyyIA)

----

```ts
type ActionRecord = Pick<Action, 'type'>;
//   ^? type ActionRecord = { type: "save" | "load"; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpwG4QIILMAexGQG8AoZZMATwAcIAuZAcgGdMJmBuC5Aej7IAdCLIBfMqEixEKADIE4AE1z4ipXjXpNmAG0VLuvAcNEStKVYWIBeNByvqAPsgXLHIHheQeAShAQCKCVkOwAFYAQAawAeDwAaFgtmAD4eE0oAPQB+KjpLPGt-QODQ0jztZAAidiwq5Bcq-WUqrmQJIA)

----

```ts
interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}
class UIWidget {
  constructor(init: Options) { /* ... */ }
  update(options: OptionsUpdate) { /* ... */ }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgPIAczAPYgM7IDeAUMsgO7AAmYAFgFzIgCuAtgEbQDcpytEwAOa0wjFh268E2ADbYojPGCihBPMjLicZi5ap4BfYqEixEKDFlx4AquipxIRXpRq0A-GLaco6vgOEwTyZvSTJpOShgpRUQNV5NbWi9OMNiBE08AhsASQB1akEIMGdw62VmBDB5AApQYFE0TBx8AEoiZAB6ACpkADoB5G7O5CMyZntHCBrsZutGSxbbSch2wi7egb6hkaMjIA)

----

```ts
type OptionsUpdate = {[k in keyof Options]?: Options[k]};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgPIAczAPYgM7IDeAUMsgO7AAmYAFgFzIgCuAtgEbQDcpytEwAOa0wjFh268E2ADbYojPGCihBPMjLicZi5ap4BfYmACe6FBiy48AVXRU4kZAF4iAbQDWyUMg8QT2DBomDj4ALoA-IyWoXieYQY8QA)

----

```ts
type OptionsKeys = keyof Options;
//   ^? type OptionsKeys = keyof Options
//      (equivalent to "width" | "height" | "color" | "label")
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgPIAczAPYgM7IDeAUMsgO7AAmYAFgFzIgCuAtgEbQDcpytEwAOa0wjFh268E2ADbYojPGCihBPMjLicZi5ap4BfYmACe6FBiy48AaQgmCAXmQBre9hhpMOfDwD0fmTIAHoA-Mim5l5W+HYOyM5uJh7RPnjGZigAShB4sgBuEAA8WXDkAHwJyKXkyBAAHpAgVAQAYswgCDHI4TXIjIQA2jbIoK7unjUAuow1w1MGPJEoAMom4LSWaXFO1bkFxVvWO+X+gWRhEZnIaxtHsfa7AESUNLRPyAA+yE-8QiIfb5PaRyKCAn6abRPYjEIA)

----

```ts
class UIWidget {
  constructor(init: Options) { /* ... */ }
  update(options: Partial<Options>) { /* ... */ }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgPIAczAPYgM7IDeAUMsgO7AAmYAFgFzIgCuAtgEbQDcpytEwAOa0wjFh268E2ADbYojPGCihBPMjLicZi5ap4BfYgk14CAVQCSAdWqCIYIlNxKozBGHkAKUMFFpMHHwASiJkAHoAKmQAOjjkSPDkIzJmdCo4SC9sQJdGAAU4KCw4GQAeDCwXAD5QwgjouJiEpKMjIA)

----

```ts
interface ShortToLong {
  q: 'search';
  n: 'numberOfResults';
}
type LongToShort = { [k in keyof ShortToLong as ShortToLong[k]]: k };
//   ^? type LongToShort = { search: "q"; numberOfResults: "n"; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoAsD2UwBVMAymIA5sgN4BQyyAjgFzIDkAzhHFAukwNzXIhGTEAFcAtgCNoAeRgAlCCxEAbMC16UAvpTABPAA4oipfBmxhkAXgrIA2gGtkoZPYi7MMNFhz5jZOCxe5r7EJA4AuuGMjpp8APRxNMgAegD8yHqGyH6m3hbW5MhsHFyMAES0ZTwC4lJQsgpKqizlIFXI2kA)

----

```ts
interface Customer {
  /** How the customer would like to be addressed. */
  title?: string;
  /** Complete name as entered in the system. */
  readonly name: string;
}

type PickTitle = Pick<Customer, 'title'>;
//   ^? type PickTitle = { title?: string; }
type PickName = Pick<Customer, 'name'>;
//   ^? type PickName = { readonly name: string; }
type ManualName = { [K in 'name']: Customer[K]; };
//   ^? type ManualName = { name: string; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/JYOwLgpgTgZghgYwgAgMIFcDOYD2BbaZAbwChlkB6AKiuQAkcB3ZMACxQS1wKmUZ3QAbACbJBwANYpcyAEYo4w4VAiZMEYQDpkVCmRbAwgiAH4AXMmxRQAcwDc+6rVT4ADscjIQcAsjiZkCHBoDWRQFnZLAE9sCDxtXX0VRRwQQSivHwgLK1sHAF8SEjAo1xQABWAECQAVQ2NkAF5kSuqAHgxsfGgAGmQAcjB6iH6APgcKCnJkAD0TFlKKqtrhpuIDI1McsGsQe2RCkrKW5YA5LLXWiQ6ubqg+-u8CMYmp8jmF46vz32aiZGSwlS6UyBG2u32h0WyAAsnAQOg4IIfig-sgANoAaTCIAGTxGAF0LJ1uNAsQS7AdXtMPkcUHCEUiUWt-vjwXkDiQgA)

----

```ts
type PartialNumber = Partial<number>;
//   ^? type PartialNumber = number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/C4TwDgpgBACghgJ2ASzgGwHIFcC2AjCBKAXlkRXQB4A7XAhAPgG4AoAejai4D0B+KUJDJJUmOoRJRa+QiyA)

----

```ts
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: '#00FF00',
  label: 'VGA',
};
interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/MYewdgzgLgBAkgOTgFQPoHkAKy7oQZRgF4YBvAKBhgHcBLAEygAsAuGANgBYAGAGkphMAprQDmTKG04AOPgNAAbEACc2AcgDE3bgDEd2tfyoKAhgCMhC9QDUA4gEFD5AL4BucrTBQhygGYngIRh0AAcoWnAIMgE6RlYYMABXAFsLZXcqYTEJNiTUnwyYRRU2aGVPUULTCysYMor3Z3IgA)

----

```ts
type Options = typeof INIT_OPTIONS;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/MYewdgzgLgBAkgOTgFQPoHkAKy7oQZRgF4YBvAKBhgHcBLAEygAsAuGANgBYAGAGkphMAprQDmTKG04AOPgNAAbEACc2AcgDE3bgDEd2tfyoKAhgCMhC9QDUA4gEFD5AL4BuclACeAByEx03lC04BDEMF6+IABm8EhoWDh4+O5AA)

----

```ts
function getUserInfo(userId: string) {
  // ...
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor,
  };
}
// Return type inferred as { userId: string; name: string; age: number, ... }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/MYewdgzgLgBAkgOTgFQPoHkAKy7oQZRgF4YBvAKBhgHcBLAEygAsAuGANgBYAGAGkphMAprQDmTKG04AOPgNAAbEACc2AcgDE3bgDEd2tfyoKAhgCMhC9QDUA4gEFD5AL4BucgDMArmGBRa4DCiQlAAqhBCynBgHiAAFF4RUfRs0Mq0YKIAlGQCAPR5MADC6ACymABKAKL4+PLg0DBgJgC2QsQwagBCIGZq7lSgkLAmwR0AjABMAzBDjcJiEh0yM3Ow1CLisCQA7NyrDbAeJgBuKrRQQkUgSsodamYKXkL9+YVVCAAiAsohXspgXJUKiJSJwehGYHNNqQqijISwwSbCSIjaLKCI45ndKXa63SFuFzkAowCp-AEwKAATwADu0Mh5Ir96DATBAyDBQclUlB0plXE1WkIeXzRAL4WwwF4WhZlLwYAA6JUwZzkchAA)

----

```ts
type UserInfo = ReturnType<typeof getUserInfo>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/MYewdgzgLgBAkgOTgFQPoHkAKy7oQZRgF4YBvAKBhgHcBLAEygAsAuGANgBYAGAGkphMAprQDmTKG04AOPgNAAbEACc2AcgDE3bgDEd2tfyoKAhgCMhC9QDUA4gEFD5AL4BucgDMArmGBRa4DCiQlAAqhBCynBgHiAAFF4RUfRs0Mq0YKIAlGQCAPR5MADC6ACymABKAKL4+PLg0DBgJgC2QsQwagBCIGZq7lSgkLAmwR0AjABMAzBDjcJiEh0yM3Ow1CLisCQA7NyrDbAeJgBuKrRQQkUgSsodamYKXkL9+YVVCAAiAsohXspgXJUKiJSJwehGYHNNqQqijISwwSbCSIjaLKCI45ndKXa63SFuFzkAowCp-AEwKAATwADu0Mh5Ir96DATBAyDBQclUlB0plXE1WkIeXzRAL4WwwF4WhZlLwYAA6JUwZzkcjUukwcJgmIgDpkqD-MDIWlCAA8GqEIA8QRC2qiuoAfO4gA)

----

```ts
interface Product {
  id: number;
  name: string;
  priceDollars: number;
}
interface Customer {
  id: number;
  name: string;
  address: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIg4C2ARtANyk1x0TUDOYUoAc1ZkADvyQARDABtpcKN2q1GLYgF9ioSLEQoAwjl4ZOUImwpL6TKMPacefQbbhYsUCN0XJe-EEPXEQA)

----

```ts
// Don't do this!
interface NamedAndIdentified {
  id: number;
  name: string;
}
interface Product extends NamedAndIdentified {
  priceDollars: number;
}
interface Customer extends NamedAndIdentified {
  address: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBEHsDsHIBdQBNKngCwJYGcCEAoTaeAUwCcAzAQwGMTQA5KgWxKQEFokBJJE4zBUxtQAb3yhQmJAC5Q0AK7MARuQDcE+SxJzs8MkQDmGgL6Fi5anVAAFMpCQKaiEgA9SXbI20cuvfvCCwkhimgAOBnRQADbRVGTYcooq6vhmRKSUtPQAwgp6kKxkoG4eSF5MrL48fAJCIuKSVEhIZCTYiaB6BtDGafhAA)
