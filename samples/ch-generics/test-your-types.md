# Item 55: Write Tests for Your Types

## Things to Remember

- When testing types, be aware of the difference between equality and assignability, particularly for function types.
- For functions that use callbacks, test the inferred types of the callback parameters. Don't forget to test the type of `this` if it's part of your API.
- Avoid writing your own type testing code. Use one of the standard tools instead.
- For code on DefinitelyTyped, use `dtslint`. For your own code, use `vitest`, `expect-type`, or the Type Challenges approach. If you want to test type display, use `eslint-plugin-expect-type`.

## Code Samples

```ts
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKWGKATwC55yBtAXWsSpODZJ3IBKeAF46tcZxp8A3ACggA)

----

```ts
map(['2017', '2018', '2019'], v => Number(v));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKWGKATwC55yBtAXWsSpODZJ3IBKeAF46tcZxp8A3ACgixBtwDkAJgAMARgDsW6rsMAOU-HMGAnFv7wAbtNkA5ZAQBGIGA2dxcVUgA)

----

```ts
test('square a number', () => {
  square(1);
  square(2);
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKCnWlwHIEKDDGQlyVVPwA0eOlkYBvTjDhI06XAEYaXVUI24ATLs4BfU0A)

----

```ts
const lengths: number[] = map(['john', 'paul'], name => name.length);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdQkWP3RgA5lAALCGJSSmozbFkFXGMAcgArEACwWPVY+WREfljzEmQyTAc8goA6bz9Ami4gA)

----

```ts
function assertType<T>(x: T) {}

assertType<number[]>(map(['john', 'paul'], name => name.length));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6cnD5+qIHBoaSU1GbacvK4xgDkAFYgABZgheqF8siI-IXmJMhkmA7NrQB0-OhgAOZQZTQ0XEA)

----

```ts
const n = 12;
assertType<number>(n);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6coJCwYNgwAIwATFw+fqiBwaGklNTaYDTsMDAA9NUwAPIA0pxAA)

----

```ts
const beatles = ['john', 'paul', 'george', 'ringo'];
assertType<{name: string}[]>(
  map(beatles, name => ({
    name,
    inYellowSubmarine: name === 'ringo'
  }))
);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6coJCwVMhQ-OgQ2DDGAOQAViAAFmC56rnyyIj8ZTC5AOboIKiNtbmokmD1ILmmXD5+qIHBoTFgyGToxNAdXXFm2pwwsgq4qemZ6uOTDHgxS8skE+iqB8udAJro-PwgAO4AyogUcrNTRztYX3Wz3bkHcRoNE4NHYywA9OCYAB5ADSnCAA)

----

```ts
const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add);  // OK

const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double);  // OK!?
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6coJCwyNzc2HjIxKSU1OoU2eRUtAwwyDAA1DAUXD5+qIHBoTqFuaj5rcX2jDnF2qncNOwwMAD0ozAA8gDSnIng0DDcIIgU-Jg4BJ3U3TAATKwcnHX+QSGKLSRFedXbJQ5XbdrLq+tDI+NT0wCEAPycQA)

----

```ts
const g: (x: string) => any = () => 12;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6coJCwAObWkdCokmAp9ozIYPrYeHkwAIwATOwwMAD0tTAA8gDSnEA)

----

```ts
const double = (x: number) => 2 * x;
declare let p: Parameters<typeof double>;
assertType<[number, number]>(p);
//                           ~ Argument of type '[number]' is not
//                             assignable to parameter of type [number, number]
declare let r: ReturnType<typeof double>;
assertType<number>(r);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6coJCw3CCIFPyYOATEpJTU9owATKwcPHyCGDCZsPLEAApoyGToUNQQilDB6CDCMKnpmfRcPn6ogd2KxnlUqOoz1Kba8jRcAPRrMFvbO7t7ewB+MACCqADm5OhgsL0wXSEwAOTT5LOmjzCSECQgUJwb+0BQN2o0kZzAyAymCgIBg8iaLTaqBgt3umBe+TmJFei3KAiE1VaMFQxAASq1EKgwEEQp1urcBlDhpxRv4aaEFqhtLR2FsAQB5ADSnCAA)

----

```ts
const beatles = ['john', 'paul', 'george', 'ringo'];
assertType<number[]>(map(
  beatles,
  function(name, i, array) {
    // ~~~ Argument of type '(name: any, i: any, array: any) => any' is
    //     not assignable to parameter of type '(u: string) => any'
    assertType<string>(name);
    assertType<number>(i);
    assertType<string[]>(array);
    assertType<string[]>(this);
    //                   ~~~~ 'this' implicitly has type 'any'
    return name.length;
  }
));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false#code/MYewdgzgLgBBCOBXAhgJwKYwLwwBQA8AuGMRAWwCN1UBKbAPhnxgComBuAKABN1gAbNJgBmiMMCgBLcDDLIADgB4AqgBoYANXq40qZAE9iygNoBddcLDFciI3SyMNNYhrNdR4qTOQQI1KAAq+vLoigHaRDABdADeAL6coJCwVMhQ-OgQ2DDGAOQAViAAFmC56rnyyIj8ZTC5AOboIKiNtbmokmD1ILmmXD5+qIHBoaSU1GbacvK4nDAwqemZqnMwHhLSYLhgyGTo6pLqugaxq-MA9OcwAH63MACCLeToYLAgwjBQI3Xbu+jEyDA+gOAKBR1QekMMEB+nsjBhuRgkggZxgl3mGLAIFgA0k9R2FAynxAMEqej2UGoMHen2+uRsxGgHS6cOhQNyqIG-iCIUUTM69W0Oz2NC4GOhvm5I0UYyoqG0klFnMlQx5oX5XUmOghJzFGK5qulGvqWqgRWRSvF6PFNttGNud1yZuRiMkZHk-EkwEk6X0MCKPlpITqCNRGCgiFQYBIfwAdBkuma9QkaEqgA)

----

```ts
declare function map<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4mQA)

----

```ts
declare module 'your-amazing-module';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQEcwZBAQByTjjIMAC0UEQAXlioAObBHl4+vk5AA)

----

```ts
// @ts-expect-error only takes two parameters
map([1, 2, 3], x => x * x, 'third parameter');
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4mAemfwAAhlkBaEAA9icAxfGBgcGHg8CE54DCgAaxBZWIB3HHhiWCgCEAw9WSYiYgZ+AEZqACZqAGYlPwsreoAqeD9qAHJpLBhgDKycvJh2kycgA)

----

```ts
declare const map: any;
map([1, 2, 3], x => x * x, 'third parameter');
//             ~ Parameter 'x' implicitly has an 'any' type.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEYD2A7AzgF3gWygBwC54oUBPAbgChc8AKAbQEYAaeAJlYGYBdVgD3gBeAHzwBAKjGsA5BgAWASxjB4eWFGwgMIGNICUVAPSH4ps+bMA-eAAV1m7THjS+0+Aux4ICsAowRSeDkoNGIUZxJSNwxSPBAAOkogA)

----

```ts
map(
  [1, 2, 3],
  x => x * x,
  // @ts-expect-error only takes two parameters
  'third parameter'
);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4mRYs1b8AjNQBM1AMzCogAeFlYhAFTwQSKsAPSx8AACGLIAtCBBxOAY6TAwODDweBCc8BhQANYgsmUA7jjwxLBQBCAYerKiAOTSWDDAjc2t7TBdNk5AA)

----

```ts
import {expectTypeOf} from 'expect-type';

const beatles = ['john', 'paul', 'george', 'ringo'];
expectTypeOf(map(
  beatles,
  function(name, i, array) {
    expectTypeOf(name).toEqualTypeOf<string>();
    expectTypeOf(i).toEqualTypeOf<number>();
    expectTypeOf(array).toEqualTypeOf<string[]>();
    expectTypeOf(this).toEqualTypeOf<string[]>();
    return name.length;
  }
)).toEqualTypeOf<number[]>();
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABpyYwPFlK3SgMCBBZC3h+AYArHClUAeoB4ihkCEPBgHMQcuuLgZgsVEucAcEnYcaW9sQGImJAvAlis1uEkGhMLhUAxUFACCA1AZMlwzFVRKxPphviAOjC4SATAA6DA4ACiAEdkFAINiOqQFo9nowTE5WBj6l9JrisESSRSqTSuYhSJodHpmay2ZjmkKGMFeWTKdTacKGU9LkIJej4NKVTE5Ar+cqhfSMIyNYItWz4HAMMgYPhYfDCatntJJZ0bIalYKfiLUnpNQwWUwgA)

----

```ts
const anyVal: any = 1;
expectTypeOf(anyVal).toEqualTypeOf<number>();
//                                 ~~~~~~
//           Type 'number' does not satisfy the constraint 'never'.

const double = (x: number) => 2 * x;
expectTypeOf(double).toEqualTypeOf<(a: number, b: number) => number>();
//                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//           Type ... does not satisfy '"Expected: function, Actual: never"'

interface ABReadOnly {
  readonly a: string;
  b: number;
}
declare let ab: {a: string, b: number};
expectTypeOf(ab).toEqualTypeOf<ABReadOnly>();
//               ~~~~~~~~~~~~~
//           Arguments for the rest parameter 'MISMATCH' were not provided.
expectTypeOf(ab).toEqualTypeOf<{a: string, b: number}>();  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABpzA8WUqoVE4aKAheRc4LeABGJ2HGlvbEBg2ViBMAOgwcAFEAR2RVw5AO0k0dPUYTJwB6H9YAYCgcCQcCAH4QyFMP6ggHPQbvNIDeDAHAgWTwVA4SqyKDYWSITbSBCzVDzDhYVCVAaoEAANz0AwuTCYpPmKJwyG0EAQ5mitRSHxguSsACZ4AAqeC1Pb1A6TDoMVFcnmXa73R4QZ6vE6CtLUbR6vQizGpT4Mb7Q-6wm221iQh2Op3O51W23wi6ejnozHY+C4-GEwYAIhucswIGAvA8mFwqGoAEFMJqNPS9MGBizKRg9IgoGAEAmAEIAJRAUGAbVQEE2VVEcAreBrbF45MpAHMnKxDaahU5Os5wNA4PAeQse1UoK2MDAOwajTBOrKRs0FccoNo1bcHk816Ri2WK1Wa19fta7fAXY63TaEzB21oQFSMYhyvBifA4OziLAoAQQDmMCDAAsgAkgAysBCZNAAwgAEsiADuegIFilTEL0dJYKAwDMvsmDauum5XNumqEaQk7TrOqDtvOvZpJ0p6sDCbQANJMEAA)

----

```ts
export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

export type Expect<T extends true> = T;

const double = (x: number) => 2 * x;
type Test1 = Expect<Equals<typeof double, (x: number) => number>>;
type Test2 = Expect<Equals<typeof double, (x: string) => number>>;
//                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                  Type 'false' does not satisfy the constraint 'true'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABp2HyyomG+ABRAEdkKAhZUgANagBNK3NRBlImxlyrJvg6jBBUYFl4bfgAfngARnheACYzG7uHsdTucLJdrrVbvdHntXh8vvBfrCMDBkAheIgNrIQE4mLMKvAFgglvVGqdwZCHgSUSBDvAmjiwHhZJVgDhkNoIAhzNFaikdHoLgj4AAqeC1JyEukgZmfbnEkYYUirdabUiEnCIeCs9mc6gMXnwTT8mCCo1pOh0CWTKXM74WZYkzBKtaYtWTDVatkckB6g3MmBYVAAc1NqT0FqcAHpI6xY3H43GAH7JlOptPpjOZzNMaMJvPxlqLAYYzZTT3Sw04SqyKDYWSITgEqQIRmof1QQOVAbI1EDAB0TCAA)

----

```ts
type Test3 = Expect<Equals<1 | 2, 2 | 1>>;  // good!
type Test4 = Expect<Equals<[a: 1, b: 2], [1, 2]>>;  // maybe not so good
type Test5 = Expect<Equals<{x: 1} & {y: 2}, {x: 1, y: 2}>>;  // surprising
//                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                  Type 'false' does not satisfy the constraint 'true'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABp2HyyomG+ABRAEdkKAhZUgANagBNK3NRBlImxlyrJvg6jBBUYFl4bfgAfngARnheACYzG7uHsdTucLJdrrVbvdHntXh8vvBfrCMDBkAheIgNrIQE4mLMKvAFgglvVGqdwZCHgSUSBDvAmk5CXSQLIMABmCzLEmYUirdabUifAA+COo33gwvedDoDlYAHpZfAAOY4HDAACETEZTWZGAALBziSMMDy1pjSPwoLx3tRtD8lPxrQjBFKZfB5T5OLp4KgcJVZDglSrgJrJkyWQBWA1c428s1VWpW7oAMmqIW+nWo8at1DTnRdcoVsmQMGIMDkWFQiqY7tYtbr9drAD9my3W232x3O43qwqG326y1FgMMZspvBgDhmd7ffBZFBsLJEJwCVIEGA8CyOBXKgNkaiBgA6JhAA)

----

```ts
const beatles = ['john', 'paul', 'george', 'ringo'];
map(beatles, function(
  name,  // $ExpectType string
  i,     // $ExpectType number
  array  // $ExpectType string[]
) {
  this   // $ExpectType string[]
  return name.length;
});  // $ExpectType number[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABp2HyyomG+ABRAEdkKAhZUgANagBNK3NRBlImxlyrJvg6jBBUYFl4bfgAfngARnheACYzG7uHsdTucLJdrrVbvdHntXh8vvBfrCMDBkAheIgNrIQE4mLMKvAFgglvVGqdwZCHgSUSBDvAmk4wHhZJVdFAMBAQI9zPB+AMAFY4KSoAbUAbEKDICAiwYAcxA5Tl0oGMCwqBlOAGgicRGIDFZ7M51A8mFwqEC8FQUAIIGo8AA9Hb4AASYkjZqTeDMlVq0RYW2se2Ol0kzAtRaaHR6UTBVgO52uxphhBe1UyoQ2aqiaRyANx4NupOe5Gp9OsOAYZAwfCW60AOg5aukTk6JgcsaDCdDHojaXTQA)

----

```ts
const spiceGirls = ['scary', 'sporty', 'baby', 'ginger', 'posh'];
//    ^? const spiceGirls: string[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABp2HyyomG+ABRAEdkKAhZUgANagBNK3NRBlImxlyrJvg6jBBUYFl4bfgAfngARnheACYzG7uHsdTucLJdrrVbvdHntXh8vvBfrCMDBkAheIgNrIQE4mLMKvAFgglvVGqdwZCHgSUSBDvAmk4wHhZJVZMQsGAQABxLAwTYWeD8AayMCwTgDahCsoVMUS7RQbQywYAcywqCVenFgzKsikA0ETgA9AbWKwAHpvRmoZnwVnsrk8za8ZkwVVKoRMIA)

----

```ts
type Game = 'wordle' | 'crossword' | (string & {});
const spellingBee: Game = 'spelling bee';
let g: Game = '';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoAHAHgFUAaeANQD4AKAKHnlhigE8AuecgbQC6lFklS8GGABZYAzrwHD4yBdSy9UyAgCMQMauy4KhASngBeOrSYneNIQG4moSLAQp02PIRIVq9ZlZDHj4hEVZEcXhJGXlQpRU+NQ0tXX02GA4QxTNLa1taRyYsAmIcGAx4AG8QAA9icAwAFU4GgHlEAF8kGBwCeAByOobMAFoMVpABp2HyyomG+ABRAEdkKAhZUgANagBNK3NRBlImxlyrJvg6jBBUYFl4bfgAfngARnheACYzG7uHsdTucLJdrrVbvdHntXh8vvBfrCMDBkAheIgNrIQE4mLMKvAFgglvVGqdwZCHgSUSBDvAmk5CfAAOJQAgIcyDADu5WAECm8AAPoMwL1ZLJuTBgANBdFZMisKgAObwABk1U6JicYDwcvgsgaEAgCsVACEQCBeCy2RZBvqQIbjfBdFMnHzKorLaz2YNpkwgA)
