# Item 50: Think of Generics as Functions Between Types

## Things to Remember

- Think of generic types as functions between types.
- Use `extends` to constrain the domain of type parameters, just as you'd use a type annotation to constrain a function parameter.
- Choose type parameter names that increase the legibility of your code, and write TSDoc for them.
- Think of generic functions and classes as conceptually defining generic types that are conducive to type inference.

## Code Samples

```ts
type MyPartial<T> = {[K in keyof T]?: T[K]};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAsiAKBDATsAlogNgHgCoD4oBeKAbwG0BpKNAOygGsIQB7AMylwF0B+ALk5UuAXwDcAKCA)

----

```ts
interface Person {
  name: string;
  age: number;
}

type MyPartPerson = MyPartial<Person>;
//   ^? type MyPartPerson = { name?: string; age?: number; }

type PartPerson = Partial<Person>;
//   ^? type PartPerson = { name?: string; age?: number; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/C4TwDgpgBAsiAKBDATsAlogNgHgCoD4oBeKAbwG0BpKNAOygGsIQB7AMylwF0B+ALk5UuAXwDcAKDrAIyNogDG0eDIDOLeqXFQotRAFsIAlcGR0A5hO2IzhnQFc9AIxkTh48aEiwEKYMuRq9CRwSKgYOP6B+BIA9DHaUAB6PFCe0CG+kerEZDr6EPxQxqa0FlDWBQK0Ds7IolBuHuBKmarZJKHoWNhZtNHicQnJqc1Qnb05pHkGhcXm9RWF1U4uDeJAA)

----

```ts
type MyPick<T, K> = {
  [P in K]: T[P]
  //    ~        Type 'K' is not assignable to type 'string | number | symbol'.
  //        ~~~~ Type 'P' cannot be used to index type 'T'.
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAsiAKBLAxgawDwBUA0UDSAfFALxQDeAUFFANrxSIB2+AugFxSZ0tVQD0fatQB+QsZ3DQA5HikMAzlEYB7YFACG8+YgDmjdQCMANtGDKooSFCnzgAJyY6oAHyUBXALYGIdl1HkgXspGUgB0vALiQsIxopiS1vByyOqMKmreUG7yEAAmFuZMuRAAHhYJUphhFAC+ANwUQA)

----

```ts
// @ts-expect-error (don't do this!)
type MyPick<T, K> = { [P in K]: T[P] };
type AgeOnly = MyPick<Person, 'age'>;
//   ^? type AgeOnly = { age: number; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EA9COQABMBgC0EAB4AHCAjByoULFGQAKACY4A5GGQHkYABbAMAQgCUBMAE9lyALJPUwBAGsAPAAqADTIANIAfMgAvPjIANqoyKBhALrUAQkpyIIszq4AghwA8iAANk7R7p7e-uhQ2CAhhuwQhuEsYsTIAHoA-OYuKIUQJeWVeGwc1CA8-FBM2QRAA)

----

```ts
type FirstNameOnly = MyPick<Person, 'firstName'>;
//   ^? type FirstNameOnly = { firstName: unknown; }
type Flip = MyPick<'age', Person>;
//   ^? type Flip = {}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EA9COQABMBgC0EAB4AHCAjByoULFGQAKACY4A5GGQHkYABbAMAQgCUBMAE9lyALJPUwBAGsAPAAqADTIANIAfMgAvPjIANqoyKBhALrUAQkpyIIszq4AghwA8iAANk7R7p7e-uhQ2CAhhuwQhuEsYsTIAHoA-OYuKIUQJeWVeGwc1CA8-FBM2Y6DyABiwPVgAHLkI2UVMR5evn51DU0w67TbFG0d4sR9A65rG9e7YzETF6871FwgPhAWAA7iAFsI8igVqVgIpKocan5mhxDCFTjh2qJ7j1+pDVjC4Z9hEA)

----

```ts
type MyPick<T, K> = { [P in K & PropertyKey]: T[P & keyof T] };

type AgeOnly = MyPick<Person, 'age'>;
//   ^? type AgeOnly = { age: number; }
type FirstNameOnly = MyPick<Person, 'firstName'>;
//   ^? type FirstNameOnly = { firstName: never; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EwATwAOKALKjUwBAGsAPABUANMgDSAPmQBefMgDaqZKC3IAZGihZJUMZoiiAutRUmryBc6wxkKi7IgiwiEigAghwA8iAANqL6yDJyikroUNggGgDk7BA52iwA9MXEyAB6APzIYpLIURCxCUl4bBzUIDz8UEzBYfUAYsCZYABy5E3xiQYp8soZWbkwI7QTFIUlZcTVteHIw6PrUy0GbStHk50QAG4C-UA)

----

```ts
type MyPick<T extends object, K extends keyof T> = {[P in K]: T[P]};

type AgeOnly = MyPick<Person, 'age'>;
//   ^? type AgeOnly = { age: number; }
type FirstNameOnly = MyPick<Person, 'firstName'>;
//                                  ~~~~~~~~~~~
//            Type '"firstName"' does not satisfy the constraint 'keyof Person'.
type Flip = MyPick<'age', Person>;
//                 ~~~~~ Type 'string' does not satisfy the constraint 'object'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EwATwAOKALKjUwBAGsAPABVkEAB6QQAEwzIsvAFYQEYADTIA0uq0Rd+hRFFYYyFQD5kAXnwBtVGRQawBdahUAkMEWEQkUAEEOAHkQABtRH2QZOUUldChsEEsAcnYIYo8WAHoq4mQAPQB+ZDFJZESIFPTMvDYOahAefigmZGFWlAAxYAKwADlyTrSM32z5ZXzCkpgZ2gWKCuraupPTs-OLgD9rm9vLghqLk5U45GKAIh3Z-Yh34uQdFgIPoQFgwDQ4GBgBgYBkwAALFAIHC0KBwUDg4pOFxuTY4YoAOlibUmqWA4kya1ypQ4xUseJAlQexyeZzu7lexVRjH+gOBJDBEKhMLhiOQyJAqPR4DehhMZkJBCAA)

----

```ts
/**
 * Construct a new object type using a subset of the properties of another one
 * (same as the built-in `Pick` type).
 * @template T The original object type
 * @template K The keys to pick, typically a union of string literal types.
 */
type MyPick<T extends object, K extends keyof T> = {
  [P in K]: T[P]
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EA9ACoxRMcgDCOWlC4IwbEhADuyLLwBWEZcjABPAA4ouGRqoxdeGCCqwxDACxQmoWM1DDAIGLWc4ECwwNygtEAgpZAAKDHIUOACwlF4uYAAbMABaUGQAA1RgBABrAsNTCABKADoYgAFIMhNMuEhkABUuty16BlA4TK1dfRVjM0bm1vaUAGkelFKIIxSsZBMS0oAaSs2EIcyjVS4QYBxAmjorTOBIKCG9-3rkMRECCZQAWSNisoAeboQAAekBAABMAto9MpdgsQWDIchlkYnF0AHzIAC8+FYAG1UMh8nMALrUToEkkEQQsIA)

----

```ts
function pick<T extends object, K extends keyof T>(
  obj: T, ...keys: K[]
): Pick<T, K> {
  const picked: Partial<Pick<T, K>> = {};
  for (const k of keys) {
    picked[k] = obj[k];
  }
  return picked as Pick<T, K>;
}

const p: Person = { name: 'Matilda', age: 5.5 };
const age = pick(p, 'age');
//    ^? const age: Pick<Person, "age">
console.log(age);  // logs { age: 5.5 }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EYXEAjDAcyAA7AEAawA8AFWQQAHpBAATDMiy8AVhAkAaZAGl1WiLv0KIATywxkKgHwAKVoaPUVCwA6EMcnDGpLAG0AXQIASmpUeWVAqw98VgQcWlkUiB0kuChJOAAbJWTFVQtLDwyAXnxBFmIYLChkL2yQXIUDNzCMeMziYjlFAqiFGOQmv2mY1uRhYigIMC4oXAnHHTZ9KtTajyECAh7cmSTMaSa8EnJOAHIAWThJMp04Z4t2TgArEEASsWJcwGwOHM8oovDILM9-s94iwAPSosbIAB6AH5kODIZwjpVbiALAAif7kjwXHJYMoQIJlLAMLz-FHEdHIZkMfQPf7UIEg4RAA)

----

```ts
type P = typeof pick;
//   ^? type P = <T extends object, K extends keyof T>(
//         obj: T, ...keys: K[]
//      ) => Pick<T, K>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EYXEAjDAcyAA7AEAawA8AFWQQAHpBAATDMiy8AVhAkAaZAGl1WiLv0KIATywxkKgHwAKVoaPUVCwA6EMcnDGpLAG0AXQIASmpUeWVAqw98VgQcWlkUiB0kuChJOAAbJWTFVQtLDwyAXnxBFmIYLChkL2yQXIUDNzCMeMziYjlFAqiFGOQmv2mY1uRhYigIMC4oXAnHHTZ9KtTajyECAh7cmSTMaSa8EnJOAHIAWThJMp04Z4t2TgArEEASsWGAnDIUKg5shwZDXHlFCwAPTIsYAPQA-LCIVCYaobNo9AZjKYwLVCXZiWEEZ4fKixoziH4AsFQs4IlZYgQGUyRg0MkcaukCEA)

----

```ts
const age = pick<Person, 'age'>(p, 'age');
//    ^? const age: Pick<Person, "age">
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EYXEAjDAcyAA7AEAawA8AFWQQAHpBAATDMiy8AVhAkAaZAGl1WiLv0KIATywxkKgHwAKVoaPUVCwA6EMcnDGpLAG0AXQIASmpUeWVAqw98VgQcWlkUiB0kuChJOAAbJWTFVQtLDwyAXnxBFmIYLChkL2yQXIUDNzCMeMziYjlFAqiFGOQmv2mY1uRhYigIMC4oXAnHHTZ9KtTajyECAh7cmSTMaSa8EnJOAHIAWThJMp04Z4t2TgArEEASsWJcwGwOHM8tV0FBsCALM9-s9vDIkSj4iwAPTYsbIAB6AH5kODIZwjpVbojkAAif60jwEIA)

----

```ts
class Box<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

const dateBox = new Box(new Date());
//    ^? const dateBox: Box<Date>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcnA1SQK5kBG0LAL4EYXEAjDAcyAA7AEAawA8AFWQQAHpBAATDMiy8AVhAkAaZAGl1WiLv0KIATywxkKgHwAKVoaPUVCwA6EMcnDGpLAG0AXQIASmpUeWVAqw98VgQcWlkUiB0kuChJOAAbJWTFVQtLDwyAXnxBFmIYLChkL2yQXIUDNzCMeMziYjlFAqiFGOQmv2mY1uRhYigIMC4oXAnHHTZ9KtTajyECAh7cmSTMaSa8EnJOAHIAWThJMp04Z4t2TgArEEASsWAgynAMPoAEJYDSqDKEYgAN3KXE4KmWlzoXAkHS8qLK6ICIyRYzAAAtgBggoT0XNkHSIMthMILjkwMhvpBYRoGSAIAB3ZC8rwC4UAEQ+EC88XiLAA9AqxsgAHoAfmQ2K50t51F5SilkA8BCAA)

----

```ts
type MapValues<T extends object, F> = {
  [K in keyof T]: F<T[K]>;
  //              ~~~~~~~ Type 'F' is not generic.
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAsghmAanANgVwgZwDwBUoQAewEAdgCaZQD2ARgFYQDGwANFAGIB8UAvFAG8AUFCgBtANJQAlqSgBrCCGoAzKLgC6ALk55JGrgG4RUAPSnRlq9YB+d+zfXhoAcg4uZVUtWBQA5mQQAE7STAB0QgC+xkA)
