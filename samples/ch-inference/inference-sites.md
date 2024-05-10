# Item 28: Use Classes and Currying to Create New Inference Sites

## Things to Remember

- For functions with multiple type parameters, inference is all or nothing: either all type parameters are inferred or all must be specified explicitly.
- To get partial inference, use either classes or currying to create a new inference site.
- Prefer the currying approach if you'd like to create a local type alias.

////
// verifier:reset## Code Samples

```ts
export interface SeedAPI {
  '/seeds': Seed[];
  '/seed/apple': Seed;
  '/seed/strawberry': Seed;
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eEA)

----

```ts
declare function fetchAPI<
  API, Path extends keyof API
>(path: Path): Promise<API[Path]>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDEA)

----

```ts
fetchAPI<SeedAPI>('/seed/strawberry');
//       ~~~~~~~ Expected 2 type arguments, but got 1.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDCVllWrVEVWTXrac-kFQoZoLDNGEL4QAfh+fb8gAoiIpkGwACZkGAQsIUOkaFk2OByI0AllJDRRJIAIyxPBAA)

----

```ts
const berry = fetchAPI<SeedAPI, '/seed/strawberry'>('/seed/strawberry');  // ok
//    ^? const berry: Promise<Seed>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDAiFlMhBUKHIALzFpRVV1RENnrrenP6noZqTXravgcFhCzohGiyFEvTwIMIyAAegB+ZCHEDHd4hZardYQe4KMZ4IA)

----

```ts
declare class ApiFetcher<API> {
  fetch<Path extends keyof API>(path: Path): Promise<API[Path]>;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDMmp6ShH5D2KwsAAYqUV0JtqYxqEJWXl1Tvtgp3dfQNDI0eUxmcxmSyaKzWGy2Oz2DH4QA)

----

```ts
const fetcher = new ApiFetcher<SeedAPI>();
const berry = await fetcher.fetch('/seed/strawberry'); // OK
//    ^? const berry: Seed

fetcher.fetch('/seed/chicken');
//            ~~~~~~~~~~~~~~~
// Argument of type '"/seed/chicken"' is not assignable to type 'keyof SeedAPI'

const seed: Seed = await fetcher.fetch('/seeds');
//    ~~~~ Seed[] is not assignable to Seed
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&module=7&target=4#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDMmp6ShH5D2KwsAAYqUV0JtqYxqEJWXl1Tvtgp3dfQNDI0eUxmcxmSyaKzWGy2Oz2DH4CEKlGKt3K0GQAF4mBA-CNLjc3vcIlVJgsGIiQMiglBQpjkP44MBJK87lBYizyhMvLZOP5qaFNGTkNFkAB5ADSeBFhGQAD0APzIClU4IhIwKPB4DnQdmorm6bwVYAIfogQUMaUyq0ygB+dvtDsdUpiiigNCybHAyABYBCwhQmgARAbbEaTRAQIHNEQeiBRJI4GdgDRmAFnMgwKIM36A-1BsNiWpNJrlZIbKQ3NgsQymSjCWyOfrywYyc6rQ7K+YY0x4-Skym4GmUJnK3ggA)

----

```ts
declare function getDate(mon: string, day: number): Date;
getDate('dec', 25);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&module=7&target=4#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDMmp6ShH5D2KwsAAYqUV0JtqYxqEJWXl1Tvtgp3dfQNDI0eUxmcxmSyaKzWGy2Oz2DH4hzSGWKOTyBSKNFKABEWhAJixChwqLRGpg4CEyCAsiwglBwTjIAxMWAGXjNIdNI0AEwAVgWDCAA)

----

```ts
declare function getDate(mon: string): (day: number) => Date;
getDate('dec')(25);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&module=7&target=4#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPIxVADTIynBg5chCkCCY5MgA1hAhojDIVXgAfAAUwi3lZM2tAJRzUKIswHrVVSbz5WZjDMmp6ShH5D2KwsAAYqUV0JtqYxqEJWXl1Tvtgp3dfQNDI0eUxmcxmSyaKzWGy2Oz2DH4hzSGWKOTyBSKNFKABEWhAJixChwqLRwRNMHAQmQQFkWEEoAtkABeJ44yAMTFgVl4zSHTQLCYAJgArAsGEA)

----

```ts
declare function fetchAPI<API>():
  <Path extends keyof API>(path: Path) => Promise<API[Path]>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPFUAfAAUAJQkjNXKcGDlyEKQIJjkyADWECGiMMj1DcKd5WQdXU3IALx1yMpQoizAerVqJgvlZnUMQA)

----

```ts
const berry = await fetchAPI<SeedAPI>()('/seed/strawberry'); // OK
//    ^? const berry: Seed

fetchAPI<SeedAPI>()('/seed/chicken');
//                  ~~~~~~~~~~~~~~~
// Argument of type '"/seed/chicken"' is not assignable to type 'keyof SeedAPI'
//
const seed: Seed = await fetchAPI<SeedAPI>()('/seeds');
//    ~~~~ Seed[] is not assignable to Seed
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&module=7&target=4#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPFUAfAAUAJQkjNXKcGDlyEKQIJjkyADWECGiMMj1DcKd5WQdXU3IALx1yMpQoizAerVqJgvlZnUMCIWUyEFQoSvI-nDAkiVllWrVEVNNDV62nP5XoU0TToyGiyAA8gBpPBgwjIAB6AH5kGcQBcASEjAo8HhnhUqu8FJ9vrpvBVgAgRiAgQxYXD6Qz6QA-FmstnsmExRRQGhZNjgZDjZBgELCFCaABEpNs5MpEBAEs0REGIFEkjg5HIwBozACzmFomFovFIzGEw+ak0nLwqIuNlIbmwyzufgeT1K+LeFtUjS+PwGNM5zNZjvMyqYarumu1uv1YENETwQA)

----

```ts
const fetchSeedAPI = fetchAPI<SeedAPI>();
const berry = await fetchSeedAPI('/seed/strawberry');
//    ^? const berry: Seed
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&module=7&target=4#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPFUAfAAUAJQkjNXKcGDlyEKQIJjkyADWECGiMMj1DcKd5WQdXU3IALx1yMpQoizAerVqJgvlZnUMCIWUxaUVEVUrl2WVatU3ao1Np+eSQVChd-5wwEkJQeL1UDS8tk4-m+oU07zw0UIhAAegB+ZBnEAXGEhIwKPBAA)

----

```ts
declare function apiFetcher<API>(): {
  fetch<Path extends keyof API>(path: Path): Promise<API[Path]>;
}

const fetcher = apiFetcher<SeedAPI>();
fetcher.fetch('/seed/strawberry');  // ok
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&module=7&target=4#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eJgQCI5wUCgwAK4gCGDAoiDIMBBgCAAWKqoAPFUAfAAUAJQkjNXKcGDlyEKQIJjkyADWECGiMMj1DcKd5WQdXU3IALx1yMpQoizAerVqJgvlZnUMyanpmTl5BUX2wABipRXQe6qNLRqEJWXl7bM9gj6A2Go3GkzUjRmXXmsw+Gy2OwgrwOs2ODH4eAQhUoxSe5WgK2Qd0ePxeESmTQY32eUFi1PKDS8tk4-iCUFCmkphGiyFEQzwQA)

----

```ts
function fetchAPI<API>() {
  type Routes = keyof API & string;  // local type alias

  return <Path extends Routes>(
    path: Path
  ): Promise<API[Path]> => fetch(path).then(r => r.json());
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoQgE2QbwFDLLCYBcyAzmFKAOYDcByIcAthGZdSPXgL54QAHgAcA9lDBFw0eEjQZMAQQAKASVyMA5AHpyC8prLosAbQC6DQjr1ZtcYcIA2EQ-KyXk1hbqpwA7gBG0FAAnq7GmB7a2sgAdPF8eDAAriAIYMCiIMgwEGAIABYqqgA8xQB8ABQAlBqEYCHCKABKosmQ5MgAvMgA1hAhojDIxcgAZBRUtHSE0ciOoghwjsgNTcjLwHDkeIxQeclQ2SXKcGAFyEKQIJidre0Q5FWMhMJnBWSn54zVn1CiLGAejKahMXwKZnK3ShuXyBUqb3O1Vi5wgIEqUGhyCgsQAVuQsjVqgx+EA)
