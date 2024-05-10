# Item 53: Know How to Control the Distribution of Unions over Conditional Types

## Things to Remember

- Think about whether you want unions to distribute over your conditional types.
- Know how to enable or disable distribution by adding conditions or by wrapping conditions in one-tuples.
- Be aware of the surprising behavior of `boolean` and `never` types when they distribute over unions.

## Code Samples

```ts
declare function double<T extends number | string>(
  x: T
): T extends string ? string : number;

const num = double(12);
//    ^? const num: number
const str = double('x');
//    ^? const str: string

declare let numOrStr: number | string;
const either = double(numOrStr);
//    ^? const either: number | string
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAeAFXhAA8MRVgBneVZAW2JBngB94zDDCyoA5gD4AFACh48WgC54lGQEpl1OgyashI8fAD8g4aLHxl7LjwDcMmWDxC2neAF4CRUiCkBGACY1ewB6EPl5AD0TJ1QXaytObhhHZwxTXk9CEjIpAHJaPOCZMIj4aPhYl31lfXMHUEhYBDJ06wB5GABlYUSbXgE68Xsq9JAsDAALHg8vHN8O7uFi0oiK0ZoJ6Zg+5P4M+qA)

----

```ts
type Comparable<T> =
    T extends Date ? Date | number:
    T extends number ? number :
    T extends string ? string :
    never;

declare function isLessThan<T>(a: T, b: Comparable<T>): boolean;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9gWzAQwE7IEYBsIB4AqAfFALwBQUlU+UEAHsBAHYAmAzlACLKNQD8XHtAA+UJgFcEGCKgBcFKjXqNWHCVJn8xk6aijyq1Wg2bsobYKgCWTAOZaL1u-oWUmEAG4yA3GTIsIAGMsNGgAM3EmQOArOCYoKzYAGQg2NnwAC2QmAkIACmRZagAaKAwi+CQ0TBxcgEoijDg4HGzfIA)

----

```ts
isLessThan(new Date(), new Date());  // ok
isLessThan(new Date(), Date.now());  // ok, Date/number comparison allowed
isLessThan(12, 23);  // ok
isLessThan('A', 'B');  // ok
isLessThan(12, 'B');
//             ~~~ Argument of type 'string' is not assignable to parameter
//                 of type 'number'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9gWzAQwE7IEYBsIB4AqAfFALwBQUlU+UEAHsBAHYAmAzlACLKNQD8XHtAA+UJgFcEGCKgBcFKjXqNWHCVJn8xk6aijyq1Wg2bsobYKgCWTAOZaL1u-oWUmEAG4yA3GTIsIAGMsNGgAM3EmQOArOCYoKzYAGQg2NnwAC2QmAkIACmRZagAaKAwi+CQ0TBxcgEoijDg4HGzfRJS0zOy89wB3QUY8utL+wYhhuu9KAHoZqDgAazIO1PSspl6IAe4hkfGAOiY4PsnpqDmFxdLdiBn1XShAxBRrNjioZCwsE4gWFeSa26mwAjAAmUpggDMU1m8yWAM66x6AHIAIIo0oogBCKNhF3hy1WXQ2eXBWNxUzIl0MtKoAD9GVA0ahbJJmMAFmEoKBIFAUY4bLYUQk1HBOcg0lZbEwatBgHAoK9kAgIIxUNT5nTtVQ4NzedAUQ8ZCiDmQgA)

----

```ts
let dateOrStr = Math.random() < 0.5 ? new Date() : 'A';
//  ^? let dateOrStr: Date | string
isLessThan(dateOrStr, 'B')  // ok, but should be an error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9gWzAQwE7IEYBsIB4AqAfFALwBQUlU+UEAHsBAHYAmAzlACLKNQD8XHtAA+UJgFcEGCKgBcFKjXqNWHCVJn8xk6aijyq1Wg2bsobYKgCWTAOZaL1u-oWUmEAG4yA3GTIsIAGMsNGgAM3EmQOArOCYoKzYAGQg2NnwAC2QmAkIACmRZagAaKAwi+CQ0TBxcgEoijDg4HGzfHGAoFiEAeVQAZUtSKABZHgyAOnRWRDy6qFwoAAYJgFYtdwB3QUY5-SgAcgBBA98AejPKAD0BDq7egcsi7l5RRxtbMkSUtMzsvO6jD6g1QpQOACEDvMoBcoHAANalDDiTpsDJwcRYFhlaDZWioVBwVBkIA)

----

```ts
type Comparable<T> =
    [T] extends [Date] ? Date | number:
    [T] extends [number] ? number :
    [T] extends [string] ? string :
    never;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9gWzAQwE7IEYBsIB4AqAfFALwBQUlUA2vgLpQQAewEAdgCYDONAIsqwYB+KP1ZQAPlDYBXBBgioAXBSq0GzVpx7VZ8xcOlyFqKCqo16jFu240uwVAEs2Ac0MPnbs6spsIAG6KANxkQA)

----

```ts
isLessThan(new Date(), new Date());  // ok
isLessThan(new Date(), Date.now());  // ok, Date/number comparison allowed
isLessThan(12, 23);  // ok
isLessThan('A', 'B');  // ok
isLessThan(12, 'B');
//             ~~~ Argument of type 'string' is not assignable to parameter
//                 of type 'number'.
isLessThan(dateOrStr, 'B');
//                    ~~~ Argument of type 'string' is not assignable to
//                        parameter of type 'never'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9gWzAQwE7IEYBsIB4AqAfFALwBQUlUA2vgLpQQAewEAdgCYDONAIsqwYB+KP1ZQAPlDYBXBBgioAXBSq0GzVpx7VZ8xcOlyFqKCqo16jFu240uwVAEs2Ac0MPnbs6spsIAG6KANxkHBAAxlho0ABmMmwRwE5wbFBOXAAyEFxc+AAWyGwEhAAUyEpQ+AA0UBiV8EhomDglAJSVGHBwOEWh4VExUDjAUBwCEADyqADKjpVi0FKeLq6hGdm5BUWl-gDuohOlbbX7h6zHbcGUAPQ3UHAA1mQbOXmFbLsQB4vHtYsAOjYcD2l2uUDuD0e-wmNz0JigEUQKGcXFSUGQWCwIIgHBeWTe20+AEYAEy1UkAZiut3uT3xm3eOwA5ABBZm1ZkAIWZNIhdOery2H1KZM5PKuZEhFhlVAAfgqoKzUK45OxRnBYlBQJAoMyVm5mekeMDRshck5XGwWtBgHAoCjkAgIKxUFL7rLPVRNdrwNBmfDFMyAQzCSLxqxpnNUOLeaFpV7E1AFXKlSq1WwNVqdf6Da4jRlpHAzRarTbtXB3Unq1RHc7XQ9s369f4gqhg2QgA)

----

```ts
type NTuple<T, N extends number> = NTupleHelp<T, N, []>;

type NTupleHelp<T, N extends number, Acc extends T[]> =
  Acc['length'] extends N
  ? Acc
  : NTupleHelp<T, N, [T, ...Acc]>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAcgKgVzAGwgHjgGllCAPYCAOwBMBnKIhAWwCMIAnAPigF5ZEUIAJCZMDNhjYA2gF0mAbgBQ00JA5JUvfoJz5CpClTqNsAQQDGh3AWLkoccS1bSoUI4ZEByVEQDmwABbOxpzRYwdlAA-A7GwQBcilwqAliwogkAdKmOEjJAA)

----

```ts
type PairOfStrings = NTuple<string, 2>;
//   ^? type PairOfStrings = [string, string]
type TripleOfNumbers = NTuple<number, 3>;
//   ^? type TripleOfNumbers = [number, number, number]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAcgKgVzAGwgHjgGllCAPYCAOwBMBnKIhAWwCMIAnAPigF5ZEUIAJCZMDNhjYA2gF0mAbgBQ00JA5JUvfoJz5CpClTqNsAQQDGh3AWLkoccS1bSoUI4ZEByVEQDmwABbOxpzRYwdlAA-A7GwQBcilwqAliwogkAdKmOEjLy0AAKAIYAlgwA8gBmAMrADPkeFOzwSuhkldXu2ABMUtIA9F32UAB6YVlQeYWlFVU1bFAiTZOtUHMtYnLg0HBVXKUwNPQMtTGoaDp72ADMnT19g1DDG-lbJTu6+9MiJ3qUu58fDCtAA)

----

```ts
type PairOrTriple = NTuple<bigint, 2 | 3>;
//   ^? type PairOrTriple = [bigint, bigint]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAcgKgVzAGwgHjgGllCAPYCAOwBMBnKIhAWwCMIAnAPigF5ZEUIAJCZMDNhjYA2gF0mAbgBQ00JA5JUvfoJz5CpClTqNsAQQDGh3AWLkoccS1bSoUI4ZEByVEQDmwABbOxpzRYwdlAA-A7GwQBcilwqAliwogkAdKmOEjLy0AAKAIYAlgwA8gxwDPlcbDGoaLT57vlEwNgATFAAPlAAzFLSAPR99lAAemFZUHmFJWUVqFUidQ1N2IuNwGLSQA)

----

```ts
type NTuple<T, N extends number> =
    N extends number
    ? NTupleHelp<T, N, []>
    : never;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAcgKgVzAGwgCQssAeOAaWKCAD2AgDsATAZynIQFsAjCAJwIEEBjLo0imlDgBtALoA+KAF4AUFCjcuwgOSpyAc2AALZaL5kqtGHKgB+BTxMAuWIhTpMOfLALDnAOk+KJAbhmhIWyRUXAIYfQFaemY2SVl5eXCSA0FollYTeXN4YIcsUJcoMXFMqBtyCAA3Nj8gA)

----

```ts
type PairOrTriple = NTuple<bigint, 2 | 3>;
//   ^? type PairOrTriple = [bigint, bigint] | [bigint, bigint, bigint]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAcgKgVzAGwgCQssAeOAaWKCAD2AgDsATAZynIQFsAjCAJwIEEBjLo0imlDgBtALoA+KAF4AUFCjcuwgOSpyAc2AALZaL5kqtGHKgB+BTxMAuWIhTpMOfLALDnAOk+KJAbhmhIWyRUXAIYfQFaemY2SVl5eXCSA0FollYTeXN4YIcsUJcoMXFMqBtyCAA3Nj8A6AAFAEMAS1YAeVY4Vmb7aSD7bCZm9WbyYAIAJigAHygAZnE-AHolhIA9czqoJtaOrp7UPuEhkbGCE9HgPVnj4cvzu7OoC7HRGSA)

----

```ts
type CelebrateIfTrue<V> = V extends true ? 'Huzzah!' : never;

type Party = CelebrateIfTrue<true>;
//   ^? type Party = "Huzzah!"
type NoParty = CelebrateIfTrue<false>;
//   ^? type NoParty = never
type SurpriseParty = CelebrateIfTrue<boolean>;
//   ^? type SurpriseParty = "Huzzah!"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwhA2EBGAnAhsCBJAZgFRQFcIAeANQD4oBeKMqCAD0wDsATAZymCOgH4oAcgAShAF5i0ACwCEgqAC4oLCADcIKANwAobaEhQACmhSgasBMnSZcBYiR7EKOgPQuoHgHoD90Y6ZBzACJRCWkZIL1waAA5AHt-M1o4RFQMbHxeEhw0eA4IZ203DyhvbmioeMTA2hV1FCiDAGVCFDAUAEt86vMUq3TbLKQ4uMQ0FkLirx8KlrbO7pMkqBDxSVlIoA)

----

```ts
type CelebrateIfTrue<V> = [V] extends [true] ? 'Huzzah!' : never;

type SurpriseParty = CelebrateIfTrue<boolean>;
//   ^? type SurpriseParty = never
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwhA2EBGAnAhsCBJAZgFRQFcIAeANQD4oBeKAbTIF0oIAPTAOwBMBne4IhGYB+KAHIAEoQBe0tAAsAhGKgAuKBwgA3CCgDcAKAOhIUAMqEUYFAEseEAApoUoGrATJ0mXAWIkkAPYBiGgcFIYA9BFQMQB6oibQFla29k4uIG6aOigGQA)

----

```ts
type AllowIn<T> = T extends {password: "open-sesame"} ? "Yes" : "No";
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAggNnA9gdwJIDsA8AVAfFAXimyggA9gJ0ATAZygG8wBDW25RAJ2oC4oAiRJHQBaWhFrMAthH4BfKAH4BATQn8offgDlE-ANwAoIA)

----

```ts
type N = AllowIn<never>;
//   ^? type N = never
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAggNnA9gdwJIDsA8AVAfFAXimyggA9gJ0ATAZygG8wBDW25RAJ2oC4oAiRJHQBaWhFrMAthH4BfKAH4BATQn8offgDlE-ANwAoUJCjbCsBCgyZ0EAG4ROuIwHpXUTwD1lJ6OaI7R05DIA)
