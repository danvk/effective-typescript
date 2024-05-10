# Item 13: Know the Differences Between type and interface

## Things to Remember

- Understand the differences and similarities between `type` and `interface`.
- Know how to write the same types using either syntax.
- Be aware of declaration merging for `interface` and type inlining for `type`.
- For projects without an established style, prefer `interface` to `type` for object types.


## Code Samples

```ts
type TState = {
  name: string;
  capital: string;
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zIA)

----

```ts
interface IState {
  name: string;
  capital: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoViA)

----

```ts
const wyoming: TState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 578_000
  // ~~~~~~~ Object literal may only specify known properties,
  //         and 'population' does not exist in type 'TState'
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoVlYB7PJSgB3ECcKay8JCijpl+IqSgByAOo27DF4ANNocXIi83gDCABYQIBB4eBDBLGAmYACu3Mg0ZmQArADsABwA+gAMVSwA9DVQAH5NzQ1QAPIARgBWEKzAUNxcEFQRUISIIFBm3JPkkKw0EpMA1ngmlnhQYFQZw8A0EOQhuHW4Z+eIeAAm3ulZOftmXlBXJof4Jv0QAB40FnRQUCQbyORReLAiLBAA)

----

```ts
type TDict = { [key: string]: string };
interface IDict {
  [key: string]: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoVlCRYAERqtgUdBigBtANYQQ+zQF03DKCKxiIktJyFlaYLE4uXvSeFBqCWEZAA)

----

```ts
type TFn = (x: number) => string;
interface IFn {
  (x: number): string;
}
type TFnAlt = {
  (x: number): string;
};

const toStrT: TFn = x => '' + x;  // OK
const toStrI: IFn = x => '' + x;  // OK
const toStrTAlt: TFnAlt = x => '' + x;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoVlCRYAMTxR0ACgAeZPAFdCAIwhUAlFYB8FDYKwxdykZKFkLTBY7B2c3T31NYWNwaBgLAEFuYCtI3Gj8WPcPBICRLCxWAHs8SihgSoQqGDI0y3RbHygAci6oAGooW0ZcAHoRqAB5AGkK6tr6xtkycLbBzp7+weGoMcmZqprsheoYTOAWjKycjtRfDYGh0fHprCA)

----

```ts
type TBox<T> = {
  value: T;
};
interface IBox<T> {
  value: T;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoVlCRYAIQD2ADwA8MAHxR0yqADdE3AK6lYw0XnEpGShZS1sHTBZ3Lx8YYSwgA)

----

```ts
interface IStateWithPop extends TState {
  population: number;
}
type TStateWithPop = IState & { population: number; };
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoVjERJ0uQpQB1LgAsACgHswUCAA8UeACblYlpSxgzgCu3Mg0jnhkeMGEAEamwligkH5I1nZOLujy6dAAZJhQQWCh4ZHRsQlUjFAiWEA)

----

```ts
class StateT implements TState {
  name: string = '';
  capital: string = '';
}
class StateI implements IState {
  name: string = '';
  capital: string = '';
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgysAhsaBeKBvAUFKA7RAWwgC4oBnYAJwEs8BzAbhygGNEwakAbMy2hswC+zOiioAzRK2gBJBMmjZcBYn2p0mLdpx7qBWoVlbdE5clAUoYUGoTDcIxPMAvwkKTC1WkKGhlDoAORBzLg6XIi8fgaBUCHCxqbmlh4Qsrb2js6uUPJpXipEvvyacQnaHJHRpQHBoVhGQA)

----

```ts
type AorB = 'a' | 'b';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAgg9gJwEJQLxQOQEMNQD6YBGGA3AFBA)

----

```ts
type Input = { /* ... */ };
type Output = { /* ... */ };
interface VariableMap {
  [name: string]: Input | Output;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAkgdmArsKBeKBvKB6AVFAOiKl2ygF8BuAKFEigHlkkV0s9DjSKaBLOYBABOAMwCGAY2gA1MUN5iARgBsIAWTFhM1KFADacMQFsIALigBnYPLgBzALrn4LKAB9GzZDXLUgA)

----

```ts
type NamedVariable = (Input | Output) & { name: string };
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAkgdmArsKBeKBvKB6AVFAOiKl2ygF8BuAKFEigHlkkV0s9DjSKaBLOYBABOAMwCGAY2gA1MUN5iARgBsIAWTFhM1KFADacMQFsIALigBnYPLgBzALrn4LKAB9GzZDXK1w0AHLGEAAmsvJKqmhQABTOyG4ewCwAlFAAZJhQhibmVja2PNRAA)

----

```ts
interface Person {
  name: string;
  age: string;
}

type TPerson = Person & { age: number; };  // no error, unusable type

interface IPerson extends Person {
  //      ~~~~~~~ Interface 'IPerson' incorrectly extends interface 'Person'.
  //                Types of property 'age' are incompatible.
  //                  Type 'number' is not assignable to type 'string'.
  age: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1TXYywL4EEwATwAOKACroo2XAF40mHMgBk+Nh2ogArmQBG0Jsl6HkAelMksyaFCxQANMi3aMcXQBsUwsQNCRYiCgAklIy1gAekCAAJhgK0kqExObEqcgAfplZ6chB4NDwSMgA5CGKIMXIoAh2UBAIYO5CEVGxVfkBRcWhOMUAdKwpacMj4qIQcVgwyCK2YlDCJewQlXB17TVkInBgwB4QA8kWIydpY2Il2nrQlcBxIFhgbBgYwAyk+8hgVt4oxbT0EAMfqsZaaHT6KB8AhAA)

----

```ts
type Pair = [a: number, b: number];
type StringList = string[];
type NamedNums = [string, ...number[]];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBACghgSwE5QLxQNpwFxQHYCuAtgEYRIA0UJuhp5AugNwBQokUAysEgngOYAZBAGdgaKGN4CMzNuGgA5OEQgATRcRESMUvvyoA6Y3TJJZcoA)

----

```ts
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const wyoming: IState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 578_000
};  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgJIGUx0sg3gKGWRDgFsIAuZAZzClAHMBuQ5BOAB2CwBsrb6IZvgC++UJFiIUGLDgJEOAew4BXHtmBKQVEKtIAjaCzEJttZAHcAnktKMqs7CgC8eViXJUA5AHVb9kLeADSs7Fy8PgDCABYQ1hAgIBAhrMpqGmBaOsgArADsABwA+gAM5aJMRAD01cgA8gDS+EA)

----

```ts
// lib.es5.d.ts
interface Array<T> {
  /** Gets or sets the length of the array. */
  length: number;
  // ...
  [n: number]: T;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBsEsCMDoFMDOBWWATWAXRAoSA7TeAJwDMBDAY3lAEFjjyBPAHgBUA+UAbx1FGAAqQaADi8bKAD2xUIgmJQmABY1w8fAHMV00ktWhyDZrFCDgfCBu3KAXKHwBXALbQSAbkshQsX5YDa+PZOriQAuvZsngC+OEA)

----

```ts
// lib.es2015.core.d.ts
interface Array<T> {
  /** Returns the index of the first element in the array where predicate... */
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number;

  // ... also find, fill, copyWithin
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBsEsCMDoFMDOAmADARgKywMYHsAneWAE1gBdEAoSAO3PgIDMBDHeUAQQIJYE8APABUAfKADeVUKGAAqWaABK8cgFcCtRKHIALDnRLwAHqDxNte0E0gFE5UPHDwAtvHqg6Fjix79QAdz0iUAAHIhJIHBYGWFjQWWApKwMASVpDIwAKJOkw+AiohgAuUEyANxZwVXgSoQAaD3TjEtpVZ2hGBrxoACtagG0AXQBKUABeMVVaAGtaPH9aOpyLSERuAHMAfhKWWj4k4Za2joIAbiokkFBY2FBKxDxk9IbrcHAG-BC+AHVIXToqABfKhAA)

----

```ts
export function getHummer() {
  type Hummingbird = { name: string; weightGrams: number; };
  const ruby: Hummingbird = { name: 'Ruby-throated', weightGrams: 3.4 };
  return ruby;
};

const rubyThroat = getHummer();
//    ^? const rubyThroat: Hummingbird
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAMwK4DsDGMCWEVwObAwASSAtqcFABQCUcA3gFBxwwCeYwcJ5mKeAI0xQAJnAC8DOCgCGFAFxwAzjCh88AbjgB3YJjwALGAHEocpYpRkBlLQF8NzOGhwq4UJALaKepdUNEJKVkFOAByACVPNgBaGAMoCBkYYBEwgBodPUMTM1ILOABmADoAFjgHJyhCJChcDy9HSsYXFDcGtgAVBKT4SQJiMgpqGkcAejGWFgA9AH5nV3gO7sTknyH-YRFGIA)

----

```ts
// get-hummer.d.ts
export declare function getHummer(): {
  name: string;
  weightGrams: number;
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEHMFMBcFoAsCuBbZkBOA6AJp6BnAKEgA8AHAe3WlG0gGMAbAQ3UlADNEA7e6ASwrcIMABIo06ABQBKAFygA3oVChuzNAvzR0-buADcK0AHdI-cPGgBxdBvwLuKAEYYjAXyNA)

----

```ts
export function getHummer() {
  //            ~~~~~~~~~
  // Return type of exported function has or is using private name 'Hummingbird'.
  interface Hummingbird { name: string; weightGrams: number; };
  const bee: Hummingbird = { name: 'Bee Hummingbird', weightGrams: 2.3 };
  return bee;
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&declaration=true#code/KYDwDg9gTgLgBAMwK4DsDGMCWEVwObAwASSAtqcFABQCUcA3gFBxwD0rLnXnAfn--2ZsOAJUJIouGAE8wwOBARxQkWMAAmiVBmy4AFgEMAzgqhxMJpEcwo8cMFEwA3AzHkoDFOAHIS5G3gARphQ6t4AdEI2blAIBmjyfqQBwaEMcB4UAFxwRjCOtgDccADuwJh4ejAA4lCeRjkoZIGUxQC+hUJoOHlwLcA5SSkhmgC86ZkDPgBCwIlkybapYQA0peWVNXWkDXAATOEAzHAdQlDikn1znadAA)
