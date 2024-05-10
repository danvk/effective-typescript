# Item 40: Prefer Imprecise Types to Inaccurate Types

## Things to Remember

- Avoid the uncanny valley of type safety: complex but inaccurate types are often worse than simpler, less precise types. If you cannot model a type accurately, do not model it inaccurately! Acknowledge the gaps using `any` or `unknown`.
- Pay attention to error messages and autocomplete as you make typings increasingly precise. It's not just about correctness: developer experience matters, too.
- As your types grow more complex, your test suite for them should expand.

## Code Samples

```ts
interface Point {
  type: 'Point';
  coordinates: number[];
}
interface LineString {
  type: 'LineString';
  coordinates: number[][];
}
interface Polygon {
  type: 'Polygon';
  coordinates: number[][][];
}
type Geometry = Point | LineString | Polygon;  // Also several others
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQbwFDLJgCeADhAFzIDkGW1A3AcguulACahyQDOVIAK4BbAEbQA2gF0mAXzxZo8JMgAyoCAGUwUUAHNczEuSrV1ILTv2NmrdlxA8I-ZELGSp0uQvBLEKDAAbYj10EENCY0oaIJCwm0I7Tm4+ARFxKGksmTx5KOQAcQh0YQgdYmQAXjRMcGQAHzUNbV0QA0bY0JAGQgB6XuQAQUDedGReCAA3aDhA5HQwAAtoXjwgA)

----

```ts
type GeoPosition = [number, number];
interface Point {
  type: 'Point';
  coordinates: GeoPosition;
}
// Etc.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBA4hD2AFeBnAlsN8B2UC8UA2tgK4C2ARhAE4A0UplNAugNwBQa2wNAZgIYBjaMi7AoAb3ZQooSAC4oAclHclHGYPjxqAEy78eKRXCSoMWbBwC+7APR2oAUWCCAdOyA)

----

```ts
type Expression1 = any;
type Expression2 = number | string | any[];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAogHmAThAziglgewHYEYoC8UAhtiANwBQoksCyaW2ATIVNgK4C2ARhIlAA+UFMETpsAcyEkyAbQC6VIA)

----

```ts
const okExpressions: Expression2[] = [
  10,
  "red",
  ["+", 10, 5],
  ["rgb", 255, 128, 64],
  ["case", [">", 20, 10], "red", "blue"],
];
const invalidExpressions: Expression2[] = [
  true,
// ~~~ Type 'boolean' is not assignable to type 'Expression2'
  ["**", 2, 31],  // Should be an error: no "**" function
  ["rgb", 255, 0, 127, 0],  // Should be an error: too many values
  ["case", [">", 20, 10], "red", "blue", "green"],  // (Too many values)
];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAogHmAThAziglgewHYEYoC8UAhtiANwBQoksCyaW2ATIVNgK4C2ARhIlAA+UFMETpsAcyEkyAbQC6VAMY5RUTAGt4SVBjUAuOrsY5mitnMpQouAAwAaa1ABEyACYunNuS4DUXraOUACsCt5QvoiSPIHMISEOtswAHEkAbAAs4c6+ysQoEIG+AHxxwfbhrh6BLjwANhxFOUqUqtjqEgBuxPXo7joM+h1Gg3pM5gqWzmJNTgD081AAfqtQACrg0ADkPJiY9RCk21DoKOyYwCSMktjEDdDAmFA0O2OmLNu5LgBUP3FJADMuCqUEWUAAygALTAceruKB8WRQfiITCIIzYZ6-f5QABmHGwymATG+0ViSXiiSgFWYAHYknZQeDobD4YjoKQUYg0RiXvsoFxSCAoD1GqhvvlCsUXGVKRUmUk3BBPEqGk1apJkBBsC5mUsABTrAVCsii3pNFAASkorSAA)

----

```ts
type FnName = '+' | '-' | '*' | '/' | '>' | '<' | 'case' | 'rgb';
type CallExpression = [FnName, ...any[]];
type Expression3 = number | string | CallExpression;

const okExpressions: Expression3[] = [
  10,
  "red",
  ["+", 10, 5],
  ["rgb", 255, 128, 64],
  ["case", [">", 20, 10], "red", "blue"],
];
const invalidExpressions: Expression3[] = [
  true,
  // Error: Type 'boolean' is not assignable to type 'Expression3'
  ["**", 2, 31],
  // ~~ Type '"**"' is not assignable to type 'FnName'
  ["rgb", 255, 0, 127, 0],  // Should be an error: too many values
  ["case", [">", 20, 10], "red", "blue", "green"],  // (Too many values)
];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAogHmAThAziglgewHYEYoC8UAhtiANwBQoksCyaW2ATIVNgK4C2ARhIlAA+UFMETpsAcyEkyAbQC6VGtABi2AHLEu0IgHIA1Hpl6AtMeF6AVBah6A9Lb0A+JwB4nAY2IoITxJI8esrg0ADCxAA2kfBIqBg4bHLqWjoANFAAdNmkIIpK1KF0cYw4AMxsnLz8MqLiUjIR0bEMCdhUlJ44olCYANYt8UwoAFzFrUxlikmUUFC4AAxps1AARMgAJqvLc3KrBtvzS1AArAo7UHsBPIfMJycZuMwAHBkAbAAs5yt73r6He2ct2Oi3Oa02h1WPEiHAgq2+BS62B6EgAblF0BtBqVkWNsW0pgoZnMxLCLvZ7LBEIhMIgxgAVIp6HiYTCRCCkYzoFDsTDAEiMSTYYjQ6DATBQFR2fGTPQ-VZWKy3DJlXDfOYUqAAPy1UEZtD0CqVXJ52D5AowQpF7MlEqlehS2j88uut3uGRBzAA7B6wVBNQBlAAWmA4kQ2UD4sig-BpdNtEq4uSg6JhqHlfzhGUBwMeCzB6wgWwyULTkMkyAg2HhGX9lIAFPTWVAk2QU1FYSgAJSUApAA)

----

```ts
type Expression4 = number | string | CallExpression;

type CallExpression = MathCall | CaseCall | RGBCall;

type MathCall = [
  '+' | '-' | '/' | '*' | '>' | '<',
  Expression4,
  Expression4,
];

interface CaseCall {
  0: 'case';
  [n: number]: Expression4;
  length: 4 | 6 | 8 | 10 | 12 | 14 | 16; // etc.
}

type RGBCall = ['rgb', Expression4, Expression4, Expression4];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAogHmAThAziglgewHYEYoC8UAhtiANwBQoksCyaW2ATIVNgK4C2ARhIlAA+UFMETpsAcyEkyAbQC6VGtHhJUGHABY2nXvxmjxUmQGFiAGwtqGm7FWrho5qzY1M2AWWLAAFi4szYhQIAJkAJQBxACEAhxUobz8wojlKKCgAcgBqTJlMgFo84UyAemKsgCoKzIA+GoAeTIAadLp1Rm1WjLdO7C1WpUpKCWB+ADNiAGNnYNDLQIBvNoAGAC4sqbnMqgy5bA29PkQFDd67LV2oCwgpPw2dYQA2GQAOGVwVj9ZhXEeoXBPchQUqlKAQYBTAB0lAAvsMElFYgs2HJMohJDwWu1bEwBjj3F0CX0tEMgA)

----

```ts
const okExpressions: Expression4[] = [
  10,
  "red",
  ["+", 10, 5],
  ["rgb", 255, 128, 64],
  ["case", [">", 20, 10], "red", "blue"],
];
const invalidExpressions: Expression4[] = [
  true,
// ~~~ Type 'boolean' is not assignable to type 'Expression4'
  ["**", 2, 31],
// ~~~~ Type '"**"' is not assignable to type '"+" | "-" | "/" | ...
  ["rgb", 255, 0, 127, 0],
  //                   ~ Type 'number' is not assignable to type 'undefined'.
  ["case", [">", 20, 10], "red", "blue", "green"],
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Types of property 'length' are incompatible.
  //    Type '5' is not assignable to type '4 | 6 | 8 | 10 | 12 | 14 | 16'.
];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAogHmAThAziglgewHYEYoC8UAhtiANwBQoksCyaW2ATIVNgK4C2ARhIlAA+UFMETpsAcyEkyAbQC6VGtHhJUGHABY2nXvxmjxUmQGFiAGwtqGm7FWrho5qzY1M2AWWLAAFi4szYhQIAJkAJQBxACEAhxUobz8wojlKKCgAcgBqTJlMgFo84UyAemKsgCoKzIA+GoAeTIAadLp1Rm1WjLdO7C1WpUpKCWB+ADNiAGNnYNDLQIBvNoAGAC4sqbnMqgy5bA29PkQFDd67LV2oCwgpPw2dYQA2GQAOGVwVj9ZhXEeoXBPchQUqlKAQYBTAB0lAAvsMElFYgs2HJMohJDwWu1bEwBjj3F0CX0tEMpjhRFBMABrc5MFBneiE-qKVFtT7dKAAImQABMuZy5FzsgKAStmlAAKwKQU8zGi5iSyUS3DMV4Sp6k2VbEKioW1BXisUy7l80VcngWDgQLkyyhkinAKASABulnQvLpFMZHQurNSbTE1taoKgAD8I1AACpOLI8TCYG6kPLoFDsTBO4IYSTYYiW6DATBQBKZL39TJtIWVSoKiUAZlwdtDEcjMdomS51a5KbT2AzJEYObzN2LRZLwq5Mi5BUnwi5pVnUChy8rcp4CqVEqNqoA7Fu7RlQxljyfTyew9HY5kjvwe+nM4Pc-nR8WrxxsLyIOMJBBeZkYXsXI6jaEr6oaKorCaPK-ualrWuakjILctqcs2LboRhmFYdhOFhm0oZtqgVLjFASCYJAiCgFkNx3L4eTEMgzrYOSXBgD46D5gBIJgsehFZJKd59g+2ZPiOhavu2-wvMI7y-F8vw-AC-yAv+9pUEAA)

----

```ts
const moreOkExpressions: Expression4[] = [
  ['-', 12],
  // ~~~~~~ Type '["-", number]' is not assignable to type 'MathCall'.
  //          Source has 2 element(s) but target requires 3.
  ['+', 1, 2, 3],
  //          ~ Type 'number' is not assignable to type 'undefined'.
  ['*', 2, 3, 4],
  //          ~ Type 'number' is not assignable to type 'undefined'.
];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAogHmAThAziglgewHYEYoC8UAhtiANwBQoksCyaW2ATIVNgK4C2ARhIlAA+UFMETpsAcyEkyAbQC6VGtHhJUGHABY2nXvxmjxUmQGFiAGwtqGm7FWrho5qzY1M2AWWLAAFi4szYhQIAJkAJQBxACEAhxUobz8wojlKKCgAcgBqTJlMgFo84UyAemKsgCoKzIA+GoAeTIAadLp1Rm1WjLdO7C1WpUpKCWB+ADNiAGNnYNDLQIBvNoAGAC4sqbnMqgy5bA29PkQFDd67LV2oCwgpPw2dYQA2GQAOGVwVj9ZhXEeoXBPchQUqlKAQYBTAB0lAAvsMElFYgs2HJMohJDwWu1bEwBjj3F0CX0tEMpjhRFAuJhkAB5ADW5yYKDO9EJ-UUqLaaKKzQBzAU3RBYIAfmLxVAACpOLJyABEBTlfKO-AUeXQKHYmGAJEYkmwxB4NygwEwJplmSS-gWmRhGVBGUdTqgAGVMBxEDMoL5glBWBAblxbsAABQoACUUB4HB1wGIGIhUGQAEcOOgGFAAMx2qBo3J83B85h8zOCtoO51OkVSi0qxDqzXYbW6jD6w3G03m2iZDjYAAmEHGEggfdt3My1SLJb5pKFFcrGWr0u7dYbWp1wVbBqN0E7CR7-cHw9HMKGQA)
