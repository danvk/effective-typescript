# Item 2: Know Which TypeScript Options You're Using

## Things to Remember

- The TypeScript compiler includes several settings that affect core aspects of the language.
- Configure TypeScript using _tsconfig.json_ rather than command-line options.
- Turn on `noImplicitAny` unless you are transitioning a JavaScript project to TypeScript.
- Use `strictNullChecks` to prevent "undefined is not an object”-style runtime errors.
- Aim to enable `strict` to get the most thorough checking that TypeScript can offer.


## Code Samples

```ts
function add(a, b) {
  return a + b;
}
add(10, null);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/GYVwdgxgLglg9mABAQwCaoBTIDSIEYCUiA3gFCKIBOAplCJUsogNT4DcpAvqWpgIwAGXGBAAbUQQ5A)

----

```ts
function add(a, b) {
  return a + b;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false#code/GYVwdgxgLglg9mABAQwCaoBTIDSIEYCUiA3gFCKIBOAplCJUsogNT4DcpAvqUA)

----

```ts
function add(a, b) {
  //         ~    Parameter 'a' implicitly has an 'any' type
  //            ~ Parameter 'b' implicitly has an 'any' type
  return a + b;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true#code/GYVwdgxgLglg9mABAQwCaoBTIDSIEYCUiA3gFCKID0lFtdAfnQArIBOyAtgKZReuIByZAMQwOABwA2MCDCiSAnogAWyAM4okQsApFQF4ruSo06ZioxbtuvfgLwixUmXMUr1mwch16DRiqw8IKxIyIgA1PgA3KQAvqRAA)

----

```ts
function add(a: number, b: number) {
  return a + b;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKRAbwChFEySoQyllEAamoBuVgF9WQA)

----

```ts
const x: number = null;  // OK, null is a valid number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=false#code/MYewdgzgLgBAHgLhmArgWwEYFMBOMC8yKANsQNwwwD0VMA8gNIA0RpMAlhDAIYwBu3YuwAmRTLgBQQA)

----

```ts
const x: number = null;
//    ~ Type 'null' is not assignable to type 'number'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=true#code/MYewdgzgLgBAHgLhmArgWwEYFMBOMC8yKANsQNwBQA9FTHTAH4wAqAngA5YwDkqp3MAJYRkIWAEMIEQQHMw4jMS5QQMKBy6902HNwpA)

----

```ts
const x: number | null = null;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=true#code/MYewdgzgLgBAHgLhmArgWwEYFMBOMA+yKANsTALxGkDcAUEA)

----

```ts
const statusEl = document.getElementById('status');
statusEl.textContent = 'Ready';
// ~~~~~ 'statusEl' is possibly 'null'.

if (statusEl) {
  statusEl.textContent = 'Ready';  // OK, null has been excluded
}
statusEl!.textContent = 'Ready';  // OK, we've asserted that el is non-null
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=true#code/MYewdgzgLgBNCGUCuECiAbGBeGATEwSAtgKZhQB0A5iVBiaeQEICeAkrgBQDkCyE3AJQBuAFB8UGClBIAPKAGFwM8thjcASiXi4W3MQHoDMAH5mz6iWnTcYASwgwADiAgQ7AI3Qt1YJOhsKUVE7ADMYTisMQRgAb1EYOChESXRpOUVlMlgcTW1dfUSjGAB5AGkAGhg-AJgAC3hHDxIyGDlgdCRcElxRAF9xZP4MAEJ0+SVybLU8nT1hIuNyqoB3Em4ANxIYRogSACcZXBgoBtgSTAdq8ABaGvRRIA)

----

```ts
const tenses = ['past', 'present', 'future'];
tenses[3].toUpperCase();
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=true#code/MYewdgzgLgBFCml4RgXhgbQOQAcCG0WANDLgE7KJTGkBmArlPRVgLoDcAUAkhBgMysAdFBABVHDnhkAwgXgAKAJRcgA)

----

```ts
const tenses = ['past', 'present', 'future'];
tenses[3].toUpperCase();
// ~~~~~~ Object is possibly 'undefined'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=true&noUncheckedIndexedAccess=true#code/MYewdgzgLgBFCml4RgXhgbQOQAcCG0WANDLgE7KJTGkBmArlPRVgLoDcAUAkhBgMysAdFBABVHDnhkAwgXgAKAJRcA9KpgA-bTpgB5AEYAreMFgBLFDhAQI5gwBsAnqXpgAJvFrmw8d1iFOIA)

----

```ts
tenses[0].toUpperCase();
// ~~~~~~ Object is possibly 'undefined'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=true&noUncheckedIndexedAccess=true#code/MYewdgzgLgBFCml4RgXhgbQOQAcCG0WANDLgE7KJTGkBmArlPRVgLoDcAUAkhBgMysAdFBABVHDnhkAwgXgAKAJRcA9KpgA-bTpgB5AEYAreMFgBLFDhAQI5gwBsAnqXpgAJvFrmw8d1iFuRAhkDAAGYVEJKVl5ZTUNHV1DEzMYSxhrW3tnVw8vHz8AziA)
