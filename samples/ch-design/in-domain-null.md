# Item 36: Use a Distinct Type for Special Values

## Things to Remember

- Avoid special values that are assignable to regular values in a type. They will reduce TypeScript's ability to find bugs in your code.
- Prefer `null` or `undefined` as a special value instead of `0`, `-1`, or `""`.
- Consider using a tagged union rather than `null` or `undefined` if the meaning of those values isn't clear.

## Code Samples

```ts
function splitAround<T>(vals: readonly T[], val: T): [T[], T[]] {
  const index = vals.indexOf(val);
  return [vals.slice(0, index), vals.slice(index+1)];
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwA4BsZQIICc7gAmAPACoB8AFAG4CG6yAXIrgKa2ELoCeipA2gF0ANIjrpmpAJTN+AkXyGDEAbwBQiRBATIoiGGEKsAHogC8Y+sgB0Bo8YDywGvSkBuDS1ZQQuJP3EbZEwIVkoABlE7EylRQOtgmFDKaOMAagBGKUEPAF81IA)

----

```ts
function safeIndexOf<T>(vals: readonly T[], val: T): number | null {
  const index = vals.indexOf(val);
  return index === -1 ? null : index;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwIbAKYEkwBMMAeA8sADwAqAfABQBuqANsgFyIBOGquCDAnouQDaAXQA0ieg1bkAlKzAgAtgCMMbRAB9EChg0QBvAFCJEEBMiiIYeQogC8ExsgB01-MWB1GMgNzH2GFAgbEhutnYRiAC0AIyIAPzaILqIrGEEfgC+hkA)

----

```ts
function splitAround<T>(vals: readonly T[], val: T): [T[], T[]] {
  const index = safeIndexOf(vals, val);
  return [vals.slice(0, index), vals.slice(index+1)];
  //                    ~~~~~              ~~~~~ 'index' is possibly 'null'
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwIbAKYEkwBMMAeA8sADwAqAfABQBuqANsgFyIBOGquCDAnouQDaAXQA0ieg1bkAlKzAgAtgCMMbRAB9EChg0QBvAFCJEEBMiiIYeQogC8ExsgB01-MWB1GMgNzH2GFAgbEhutnYRiAC0AIyIAPzaILqIrGEEfgC+hqCQsAgoAA4MMFAAgmxw4LgUNJIsAVw8-EJijlICcoiCreKtwgb+ZmAWVjYE9ijo2OMkXkzikr7+HEEh3fXOyCUQGNQADOLpMotOWzt76QDUMTLCfiYA9I8mr2-vHwB+398ff4g-X4AcnSQKsyEQhTgyGQMGUfEQQJ0DCBhmyQA)

----

```ts
function splitAround<T>(vals: readonly T[], val: T): [T[], T[]] {
  const index = safeIndexOf(vals, val);
  if (index === null) {
    return [[...vals], []];
  }
  return [vals.slice(0, index), vals.slice(index+1)];  // ok
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwIbAKYEkwBMMAeA8sADwAqAfABQBuqANsgFyIBOGquCDAnouQDaAXQA0ieg1bkAlKzAgAtgCMMbRAB9EChg0QBvAFCJEEBMiiIYeQogC8ExsgB01-MWB1GMgNzH2GFAgbEhutnYRiAC0AIyIAPzaILqIrGEEfgC+hqCQsAgoAA4MMFAAgmxw4LgUNJIsAVw8-EJijlICcoiCreKtwgb+ZmAWVjYE9ijo2OMkXkzikr7+MMCI1On2kToMMoMmJhxBId2Czuf1bSLCfibZh4HBSIL1zsglEBjUAAzi6TKLJxvD5fdIAahiMhuJgA9DDEHAANaGbJAA)

----

```ts
interface Product {
  title: string;
  priceDollars: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwIbAKYEkwBMMAeA8sADwAqAfABQBuqANsgFyIBOGquCDAnouQDaAXQA0ieg1bkAlKzAgAtgCMMbRAB9EChg0QBvAFCJEEBMiiIYeQogC8ExsgB01-MWB1GMgNzH2GFAgbEhutnYRiAC0AIyIAPzaILqIrGEEfgC+htZQasCoEBiIAApscLgg0Ab+sFAMGKwWbNYA5n4mAA4tRQAicLqobCxJKmpZhkA)

----

```ts
interface Product {
  title: string;
  /** Price of the product in dollars, or -1 if price is unknown */
  priceDollars: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMsmMGADYQBcyAzmFKAOYDcpyA9AFS9oWSZBhjkAFigAOmXPmShkWDFSpwoDADQioyALQBGBWJnBhwBshwgA1iAwB3EMl7cuppABEVajfRA4ALYARtCcAL7EQA)

----

```ts
// @strictNullChecks: false
const truck: Product = {
  title: 'Tesla Cybertruck',
  priceDollars: null,  // ok
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMsmMGADYQBcyAzmFKAOYDcpyA9AFS9oWSZBhjkAFigAOmXPmShkWDFSpwoDADQioyALQBGBWJnBhwBshwgA1iAwB3EMl7cuppABEVajfRA4ALYARtCcAL7E3NzIAAJMQmAAcjiqAMKSCDYM9PBUDBDECBggTORQeDb06Nh4BAC8RFwU1HTIAOQAKhAMashpAJ6hUMyV7ZruQhDequo5yAGq2jwxGDbE4ZxAA)
