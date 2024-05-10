# Item 71: Use Module Augmentation to Improve Types

## Things to Remember

- Use declaration merging to improve existing APIs or disallow problematic constructs.
- Use `void` or error string returns to "knock out" methods and mark them `@deprecated`.
- Remember that overloads only apply at the type level. Don't make the types diverge from reality.## Code Samples

```ts
declare let apiResponse: string;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQQA)

----

```ts
const response = JSON.parse(apiResponse);
const cacheExpirationTime = response.lastModified + 3600;
//    ^? const cacheExpirationTime: any
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQYJ18cB7CAvPACkAygHkAcgDp0sMgAoMOfEVIgAlCzalUYKGAAWIAKIAPLDCjJMJACqYAtn05KeE6NQCyhYJgBmmEMDwANTwAMwAbAAMkSwA9LHwifAAegD88JocOvpGppjmljb2FGjEAJ7MQA)

----

```ts
// declarations/safe-json.d.ts
interface JSON {
  parse(
    text: string,
    reviver?: (this: any, key: string, value: any) => any
  ): unknown;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQA9K-KJLFMpiXlZ4oAMxABaAFZ4SAOmCzkeZnWQgYIqGAQApAMoB5AHLwA3s3jx0sMgAoLl+GoAeyStVoMANA8twAbpj+6gD8lLbIABaYeJRQxACeXvAA1iAJ7jR09Mn+UBAArhRoiQCU8AC8AHwlCQ6llAXEKcSEAO7ELAC+zEA)

----

```ts
const response = JSON.parse(apiResponse);
//    ^? const response: unknown
const cacheExpirationTime = response.lastModified + 3600;
//                          ~~~~~~~~ response is of type 'unknown'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQYJ18cB7CAvPACkAygHkAcgDp0sMgAoMOfEVIgAlCwD0G+DvgA9APzw2pVF2VlKAV2IBrYoQDuxVu1RgoYABYgAogA8sGChkTBIAFUwAWz5OJR4JaGoAWUJgTAAzTBBgeABqeABmADYABlLNbV1qmtq6gD9Gpsa47hV4TDx4Qgz4ZABPdAQAcht7J2JhiWYgA)

----

```ts
interface ApiResponse {
  lastModified: number;
}
const response = JSON.parse(apiResponse) as ApiResponse;
const cacheExpirationTime = response.lastModified + 3600;  // ok
//    ^? const cacheExpirationTime: number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQdyIMAZlGAgIJZcBEmXgBvZvERRqAWULBMnTCGCViAVwC2AIw4sAvszAjUcYaQQBeeACkAygHkAcgDp0sMgAoMOfEUsASjQ8eAE-CzIWE1JUMB4ACxAAUQAPLBgoZEwSABVMLWt4cwCyV2g5BSUVYHgAangAZgA2AAZWxikAei74QgBrZh6pKQA9AH54GOopxJT0zEzsvIKKeE1dDmYgA)

----

```ts
// declarations/safe-response.d.ts
interface Body {
  json(): Promise<unknown>;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQA9K-KJLFMpiXlZ4oAMxABaOAQEgAdMFnI8zOshAwRUMAgBChYAE94Ab2bx4AKzwkAFAEpKABRiEAtpjIAeAK7EA1sSEAO7EAHwsAL7MQA)

----

```ts
interface SetConstructor {
  new <T>(iterable?: Iterable<T> | null): Set<T>;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEEQBd5QA4EsBKIDO6A9gHZ4gBc8eyMmxA5gNwBQdyIMAZlGAgMooAwiWowArmGSEY8AN7N48YiADu8ADwAVAHwAKTOxhQARkgD8lAJKGTSLdvgAfJWIgQAlJQHJ7LAL7MQA)

----

```ts
// declarations/ban-set-string-constructor.d.ts:
interface SetConstructor {
  new (str: string): void;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBMFMGMBsEMBO8AuBLA9gOwM7AEbxYC0OkKpKiaWA5sdNjlQK7QoaIB04XKOALgBQNFJEQAzeNEigAyuQDCTVu06gA3kNCgskAO6gAFM0QDQpmrQCU5gG4Y04ANxCAvkKA)

----

```ts
const s = new Set('abc');
//    ^? const s: void
console.log(s.has('abc'));
//            ~~~ Property 'has' does not exist on type 'void'.
const otherSet: Set<string> = s;
//    ~~~~~~~~ Type 'void' is not assignable to type 'Set<string>'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBMF4ZgKYHcYGUVQBQHIBDAI2HwEoBuAKAHpaZGYA9AfhlElggC4YA3EAEsAJtU4QQAGxQA6KSADmuCLIAWhCARJlyVOgyZGjAPzMwACgCcQABxRWoATxj4NEfDBEgU8MCFgUAA8haBhwGGd7V0FRfFlxcDCAtQdsKD50gB5oKyEwRQA+RDgaelMzSvMAFSdo-FiRT1DkAJhNCCFFMBIZSJBIupRXbNz8ovjqIA)

----

```ts
interface SetConstructor {
  /** @deprecated */
  new (str: string): 'Error! new Set(string) is banned.';
}

const s = new Set('abc');
//    ^? const s: "Error! new Set(string) is banned."
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoTAYQPYgM5hQCuCY2UyA3gFDLID0AVI8gAIAmEADlBAnJHbJG9WshAQA7sgAUBKAC5k80AHMAlEoDkAUShRyAQnFS0GOYTXrkwPMgBGcEBPYA6LQG5qAX2rUEuATKyAC8JtLoYDJacPYIWupe9PR0dAB6APzIAfhgykoARHoGUMYSEeYqIBo2do7OEG4F1EA)
