# Item 83: Don't Consider Migration Complete Until You Enable noImplicitAny

## Things to Remember

- Don't consider your TypeScript migration done until you adopt `noImplicitAny`. Loose type checking can mask real mistakes in type declarations.
- Fix type errors gradually before enforcing `noImplicitAny`. Give your team a chance to get comfortable with TypeScript before adopting stricter checks.## Code Samples

```ts
class Chart {
  indices: any;

  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/MYGwhgzhAEDCAWYBOAXaBvAUNaBLAdgCa7ACmEAXNGPgJ4Dcm20A9C9AHReYC+mQA)

----

```ts
class Chart {
  indices: number[];

  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/MYGwhgzhAEDCAWYBOAXaBvAUNaBLAdgCa7ACmEAXNPgK4C2ARqUgNoC6A3JttAPS-QAdMMwBfTEA)

----

```ts
getRanges() {
  for (const r of this.indices) {
    const low = r[0];
    //    ^? const low: any
    const high = r[1];
    //    ^? const high: any
    // ...
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/PTAEAkEkBEFECgDGAbAhgZ3aAwgC1QE4AuoA3vKKAJYB2AJlYgKboBcoNArgLYBGTBANoBdANzwQoWADlo8AOZMiAJVQ1F6ABQBKMhVAAzAPYFQmxEZroSpowdBFcVdADpaDZul3lKlC1ZJkIwB3UABeUCEABjF9SklfAD0AflB-a1Ag4PY1AE84tMsMp3lccMjBAEZY31AEyhTCgNAS3ByafNrJFx79AF94AckoOEGJMBk5IA)

----

```ts
getRanges() {
  for (const r of this.indices) {
    const low = r[0];
    //          ~~~~ Element implicitly has an 'any' type because
    //               type 'Number' has no index signature
    const high = r[1];
    //           ~~~~ Element implicitly has an 'any' type because
    //                type 'Number' has no index signature
    // ...
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=true&strictNullChecks=false#code/PTAEAkEkBEFECgDGAbAhgZ3aAwgC1QE4AuoA3vKKAJYB2AJlYgKboBcoNArgLYBGTBANoBdANzwQoWADlo8AOZMiAJVQ1F6ABQBKMhVAAzAPYFQmxEZroSpowdBFcVdADpaDZul3lKlC1ZJkIwB3UABeUCEABjF9SklfRMoAP1TkqWQmbiYaEipuAAdkRioiZABPUHwsNVAAcjVyuodygqZQfkRUTnQmONAEpKHKIlb2uukefgJm6o4janomAA9QdCp5GlQiTgI+xP9rKo3ccMjBAEZYxMHh0DT02Ezs3OpC4sRSiqqMUFqGmhNFptDpMLo9fa+W53RKjEETKYCWa-GgLdwrNYbLY7Pb9SQuAn6AC+8BJkigcFJEjAMjkQA)
