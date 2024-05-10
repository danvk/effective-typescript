# Item 78: Pay Attention to Compiler Performance

## Things to Remember

- There are two forms of TypeScript performance issues: build performance (`tsc`) and editor latency (`tsserver`). Recognize the symptoms of each and direct your optimizations accordingly.
- Keep type checking separate from your build process.
- Remove dead code and dependencies, and be on guard for code bloat in type dependencies. Use a treemap to visualize what TypeScript is compiling.
- Use incremental builds and project references to reduce the work `tsc` does between builds.
- Simplify your types: avoid large unions, use `interface` extension rather than intersection types, and consider annotating function return types.## Code Samples

```ts
// hello.ts
console.log('Hello World!');
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAsFMBtoewHQBcDOAoAxnAdiu1IF4BzACgHIAJGeUAdTgCdoATAQnIEoBuNIA)

----

```ts
function foo() {}
//       ~~~ 'foo' is declared but its value is never read.

export function bar() {}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noUnusedLocals=true#code/GYVwdgxgLglg9mABMOcAUBKRBvAvgKAHpDFSzEA-KxAchThsRgGdEATAUwgBsBDAJw5tEAIxBQmUVgDde3EByaswHaR36JBvNgDp8+DgA8ADnH4TQkWAlEDMOAkA)

----

```ts
// src/fib.ts
export function fib(n: number): number {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noUnusedLocals=true#code/PTAEGcCcGNgMwJYCMB0AXcAoApgDwA4D2kaocArgHbRoKGVnIAUlAXKJeQLZLaQCU7Tjz6gA3plCgEcUC1AAeUACZ+4yVNCRsacpAaUA3BoC+G7bv2Mk8gLSgAjGoDU1uyv7GzQA)

----

```ts
// test/fib.test.ts
import {fib} from '../src/fib';

describe('fib', () => {
  it('should handle base cases', () => {
    expect(fib(0)).toEqual(0);
    expect(fib(1)).toEqual(1);
  })

  it('should handle larger numbers', () => {
    expect(fib(2)).toEqual(1);
    expect(fib(3)).toEqual(2);
    expect(fib(4)).toEqual(3);
    expect(fib(5)).toEqual(5);
    expect(fib(16)).toEqual(987);
  });
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noUnusedLocals=true#code/PTAEBcFMGd2AzAlgIwHRVu6AoRBbABwHsAncUAbyWQF9R4Si9QByVVYaEgYwRRYDc2bABMY3EikgAKFtRYAaUNICUoALwA+StlChE4WdAAWRAK4AbEaGMBDAHYiLkUMlvQX3dzEXK1WnT09SAAPAkhuQ2ppAAYVFXQiAFEARzNbC1iVISDQUPDI6WiARnjE1PTM0pzQGhVhPQMjU0trO0dnUAtbEgBzSBJQezM8ZAHoX1UNbQpdIPyIqJRpACYy8GS0jOlqueCwxaLlgGZ1zcrV7L28g8LogBYziu3Tmv2CpeRpAFYnrczfm8bh8jl9igA2P4XACcAA4AOxXPR1IQo7BAA)

----

```ts
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Year = `2${Digit}${Digit}${Digit}`;
const validYear: Year = '2024';
const invalidYear: Year = '1999';
//    ~~~~~~~~~~~ Type '"1999"' is not assignable to type
//                '"2000" | "2001" | "2002" | ... 996 more ... | "2999"'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noUnusedLocals=true#code/C4TwDgpgBAIglgczsKBeKByADBqAfTARlwIwCYTMBmSjAFloFZaA2WgdloA5aBODANwAoUJCgBNCAEMATmigADMgBIA3vCTAAvmo3Id6xPoXCAxgHsAdgGcUANykAbOABNJsgFwTpc9OSxkDGZWtlBwlg7Obj5e7r5EvImCQgD0KVAZUAB+Obl5WVAAKuDQGABEhIm8Zbhw1lCW5ihS1taIllIARo7QwOZQohCp6ZmjY5nlZFjTZfhQZVNYhLMEC9NkK1AAdDtQiSxQALbmMtA7W3MLVTVbQkA)
