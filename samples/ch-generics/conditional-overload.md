# Item 52: Prefer Conditional Types to Overload Signatures

## Things to Remember

- Prefer conditional types to overloaded type signatures. By distributing over unions, conditional types allow your declarations to support union types without additional overloads.
- If the union case is implausible, consider whether your function would be clearer as two or more functions with different names.
- Consider using the single overload strategy for implementing functions declared with conditional types.

## Code Samples

```ts
declare function double(x: string | number): string | number;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAKADwC54BnDGLVAc3gB95VkBbYkGAEpaDJqw5de-GAG4AUEA)

----

```ts
const num = double(12);
//    ^? const num: string | number
const str = double('x');
//    ^? const str: string | number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAKADwC54BnDGLVAc3gB95VkBbYkGAEpaDJqw5de-GAG4AUGDwNJPeAF4CRUhQCMAJkHyA9Efhn4APQD88RamXceIxszadH0hUoz1G6zSRk5ADklMGGcibmljZ2yqLOYm4qnkA)

----

```ts
declare function double<T extends string | number>(x: T): T;

const num = double(12);
//    ^? const num: 12
const str = double('x');
//    ^? const str: "x"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAeAFXhAA8MRVgBneZjGLVAc3gB94qZAFtiIGAD4AFLQBc8SgEp5lANwAodWDztBI+AF4CRUiCkBGAEyKNAelvxH8AHoB+eNtS6hw+Va06GGwchsYkZFIA5LSRNur2Ti7unrrsMPIARLQZ6kA)

----

```ts
declare function double(x: number): number;
declare function double(x: string): string;

const num = double(12);
//    ^? const num: number
const str = double('x');
//    ^? const str: string
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAKADwC55VkBbYkGASlvqZYG4AoUSLAQp02PASKkKNeAGcMMLKgDm7OQqXK+vMHnl1G8ALwSSZcgEYATKz4B6O-CfwAegH54u1Ps4dGzGB09DHUYY1MpcgBySijbXgdnVw8vfXkYWnTNXiA)

----

```ts
function f(x: string | number) {
  return double(x);
  //            ~ Argument of type 'string | number' is not assignable
  //              to parameter of type 'string'
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAKADwC55VkBbYkGASlvqZYG4AoUSLAQp02PASKkKNeAGcMMLKgDm7OQqXK+vMHnl1G8ALwSSZcgEYATKz4B6O-CfwAegH54u1Ps4dGzGB09DHUYY1MpcgBySijbXgdnVw8vfXkYWnTNXhFMXHxEKkyNFXgAHwMuNngAb14nOAxkGHxCM2l4p0SknqcAP3gAQRhlRhBUEJxEeAwATwAHBCis0orOAKj4LFk6HBCoWVksZVQoKXr4bt7ejBx4edgoBhAMFngpmYWlleUo3gBfXhAA)

----

```ts
declare function double<T extends string | number>(
  x: T
): T extends string ? string : number;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAeAFXhAA8MRVgBneZjGLVAc3gB94qZAFtiIGAD4AFACh48WgC54lGQEpl1Ogyat2nHvAD8bDl17Kho8QG4ZQA)

----

```ts
const num = double(12);
//    ^? const num: number
const str = double('x');
//    ^? const str: string

function f(x: string | number) {
  //     ^? function f(x: string | number): string | number
  return double(x);  // ok
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtX2B2QCMIQAeAFXhAA8MRVgBneZjGLVAc3gB94qZAFtiIGAD4AFACh48WgC54lGQEpl1Ogyat2nHvAD8bDl17Kho8QG4ZYPO0Ej4AXgJFSIKQEYATGp2APRB8vIAeiYOqE5WliJiMPaOGKYwbh4kZFIA5LQ5gTIhYfCR8NFO+sr65jIyKOjYeEhSSmnm-M7WMGrwAN5y8MUlZQ2YuPiIrdVmhgJWiRrtc12Jg3AYyDD4hFnetIHyxTgA1jIAvjJAA)

----

```ts
function double<T extends string | number>(
  x: T
): T extends string ? string : number;
function double(x: string | number): string | number {
  return typeof x === 'string' ? x + x : x + x;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAEziARgGwKYB4Aqi2AHlNmMgM6KVQBOMYA5ogD6JggC262dAfAAoAUIkTEAXInzCAlFMIkyFarQbNEAfhr1GLKZx58A3MNCRYCFGizZBknepbtDvOvMd62Hbm8QBvUUQ6bCgQOiQoAE8AB2w4YHFEAF5UxAByNT10rSSAaiSpYkQC4lMAX2EgA)
