# Item 24: Understand How Context Is Used in Type Inference

## Things to Remember

- Be aware of how context is used in type inference.
- If factoring out a variable introduces a type error, maybe add a type annotation.
- If the variable is truly a constant, use a const assertion (`as const`). But be aware that this may result in errors surfacing at use, rather than definition.
- Prefer inlining values where it's practical to reduce the need for type annotations.



## Code Samples

```ts
function setLanguage(language: string) { /* ... */ }

setLanguage('JavaScript');  // OK

let language = 'JavaScript';
setLanguage(language);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwKZQDIEMwHMRa6oAUANjvoagFwpQBOMeAlIgN6ID0AVIgHQDE3TogC+AKHFpMFAkWIByAFJYAblgDKERgAcoC5gG5EXEQHkA0pNLpE5PHNSIAvImVrN2mHoWGp6bAcqMlkqIxNOcysgA)

----

```ts
type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) { /* ... */ }

setLanguage('JavaScript');  // OK

let language = 'JavaScript';
setLanguage(language);
//          ~~~~~~~~ Argument of type 'string' is not assignable
//                   to parameter of type 'Language'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgAZigRlgVUVADOEYPGRoMACgA2iVOggAuWIe0QAlFADeUAPQAqKADp3UJw6gBfSZLUNC2MdfCJSSho6K3EoR28AeQBpfz11KAMtYyhsMOIOKIkA9U0jXUyy6ykHbzi6+oA-JuamqABBClQAWwgEYChhaShQSFwVYGpkeioVKARhfrgVFSokBDgAIzTJGvq9-frgYSgwOAo4HuAICgGhkegcUsscSSA)

----

```ts
let language: Language = 'JavaScript';
setLanguage(language);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgAZigRlgVUVADOEYPGRoMACgA2iVOggAuWIe0QAlFADeUAPQAqKADp3UJw6gBfSXvUoAy1jM00jDChsfCJSSho6KTUNC2N9VIwrcShHbwB5AGlJIA)

----

```ts
const language = 'JavaScript';
//    ^? const language: "JavaScript"
setLanguage(language);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgAZigRlgVUVADOEYPGRoMACgA2iVOggAuWIe0QAlFADeUAPQAqKADp3UJw6gBfSWVEVYCgDLWMobHwiUkoaOikHbyhkgD0AfigAhCCQi2MzACICYg44gsk1DTzdUKMMK3FkxKgAeQBpSSA)

----

```ts
// Parameter is a (latitude, longitude) pair.
function panTo(where: [number, number]) { /* ... */ }

panTo([10, 20]);  // OK

const loc = [10, 20];
//    ^? const loc: number[]
panTo(loc);
//    ~~~ Argument of type 'number[]' is not assignable to
//        parameter of type '[number, number]'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgAZigRlgVUVADOEYPGRoMACgA2iVOggAuWIe0QAlFADeUAPQAqKADp3UJw6gBfSQ+9eOAo4AFt1CAooKhUoOCh9OEVgFAATCAAaKD1RJCoU9JswOCoKVxk5BSUEKGKEZmEdAHdBSNMoAG0EFFCAI0is7r7IgF0be2c3Dy9fSUk6hp0OgEYABiyAJlWx8ShHbwB5AGk5slEVYGzhMihsFfWoLZGpAL29gD0AfigzhAurshmIb9CgdEbzRCLHJkKwvbxvAB+SKgAEEKKhwghLsJpFBQJBcMDImD6DEoAhhJc4CoVFQkAg4L09NBgMJ-PC3m9iiFwsBIlAcXi2Lguj0QYMxaMcJIgA)

----

```ts
const loc: [number, number] = [10, 20];
panTo(loc);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgAZigRlgVUVADOEYPGRoMACgA2iVOggAuWIe0QAlFADeUAPQAqKADp3UJw6gBfSQ+9eOAo4AFt1CAooKhUoOCh9OEVgFAATCAAaKD1RJCoU9JswOCoKVxk5BSUEKGKEZmEdAHdBSNMoAG0EFFCAI0is7r7IgF0be2c3Dy9fSTJRFWBs4TIzLp7+ikGN0ahsDoBGAAYsgCYjkak6hv0Vq3EoR28AeQBpSSA)

----

```ts
const loc = [10, 20] as const;
//    ^? const loc: readonly [10, 20]
panTo(loc);
//    ~~~ The type 'readonly [10, 20]' is 'readonly'
//        and cannot be assigned to the mutable type '[number, number]'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgAZigRlgVUVADOEYPGRoMACgA2iVOggAuWIe0QAlFADeUAPQAqKADp3UJw6gBfSQ+9eOAo4AFt1CAooKhUoOCh9OEVgFAATCAAaKD1RJCoU9JswOCoKVxk5BSUEKGKEZmEdAHdBSNMoAG0EFFCAI0is7r7IgF0be2c3Dy9fSTJRFWBs4TIobA6ARgAGLIAmLZG42PmERakAqEuoAD0AfigTxeWyMwoIOFTRPRBO7b2DyR1Br6FZWc7eK4AP2hUGYrSgoEguDeHy+P02Oyg+xG9BiyPenwQ3xw-ghVyuiFSD0QCGES36RxUVCQCAgVOAwgR8NCKGAcF6emgiOgOC6PX6FEG4tGJKAA)

----

```ts
function panTo(where: readonly [number, number]) { /* ... */ }
const loc = [10, 20] as const;
panTo(loc);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIZgCpwBQHcAWApgE6EBcipqAJggDYCeiA2mCALYBGJANIm1xIBdAJSIA3ogD0AKkQA6RYhlTEAXwBQEBAGcoiOnAiIAvCwCMABj4AmS0MSodibWD0BuDWkw5DEEe6I0qoA8gDSGkA)

----

```ts
const loc = [10, 20, 30] as const;  // error is really here.
panTo(loc);
//    ~~~ Argument of type 'readonly [10, 20, 30]' is not assignable to
//        parameter of type 'readonly [number, number]'
//          Source has 3 element(s) but target allows only 2.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIZgCpwBQHcAWApgE6EBcipqAJggDYCeiA2mCALYBGJANIm1xIBdAJSIA3ogD0AKkQA6RYhlTEAXwBQEBAGcoiOnAiIAvCwCMABj4Ama4gDMloYlQ7E2sHoDciaapJiOGJEGHcqOkZEIlJ5DTRMHEMIEW8NKVU-RAA-XMQAQWIAcw5CMH04YEQoBmRCRAByKlowKOYrW3snIQbQ9zA4fTcdGCKwVE46eqg4dMysrLRiVHZCKBJESura+qbCGnomVg5uYj4BU565hZvEAGU4EGIIevw3R0RCKdXy7B0xTggfRQVDFNauSJwXDuQ6IGxxIA)

----

```ts
type Language = 'JavaScript' | 'TypeScript' | 'Python';
interface GovernedLanguage {
  language: Language;
  organization: string;
}

function complain(language: GovernedLanguage) { /* ... */ }

complain({ language: 'TypeScript', organization: 'Microsoft' });  // OK

const ts = {
  language: 'TypeScript',
  organization: 'Microsoft',
};
complain(ts);
//       ~~ Argument of type '{ language: string; organization: string; }'
//            is not assignable to parameter of type 'GovernedLanguage'
//          Types of property 'language' are incompatible
//            Type 'string' is not assignable to type 'Language'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAMghgOwOYFc5OgXigcgFJwBucAygMYBOAlmMDlAD64Aq4E51t9TOACiMAAWAewQ4A3ACgqCYBAoAzOGWgBxYYXkIIAE3jI0GKAG9JUKABtEqdBABcsa4YhTzwikkRUAXnGBVRBwBnYGpkKQBfSUkFFAQyf1EoMmEAWzArGQAKKwNbB3VNCm09J1sAShMoAHoAKigAOiaoWuqoKMkU9MyELONLMowHHFZIDho6ABood08EHz8AhGGAWSpKYSDhBTp28vFzaraAeQBpaJSEEKhgIKhsU3NcmyGWNnGuSbMZjy9fROWuDWGy2OxwXwiUi6GTg2Vu+0kR3MyPMAD9UVAAIIeFCpCCyGYKG5sXD9Z7OYKhGRIA6zP6LQJQEJhGntHCItoornmKh3BDCYBQOBBIJUJAIOAAIws0GAwigYDgFDgeLkFEJxMguEKWl0+heEHZSO5yNGEDu2wVFGEkAooFw5Ns9CV0Bk0MW0ogHJNXLNuGZ1PovKg-MFwtF4qlMpu8tAWpw+uc7KAA)

----

```ts
function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}

callWithRandomNumbers((a, b) => {
  //                   ^? (parameter) a: number
  console.log(a + b);
  //              ^? (parameter) b: number
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABBAhgGzQdRlAFgJRTABM4BbAORDICMBTAJwGcAKYMALkRbAEYuw1egwA0iMACYBQxgEpEAXgB8iAG5wYxeQG8AUIkTsWAWRR4AdAyKkyLWWNMWrJcndkBuXQF9du1Bmw8QhdKGWYWFhQxGnllRD0DAHpEg1S09PSAPQB+bgAHFCsyOig5RBRpWkZ9ZAQmODQ6czQ4AHNIxABqRBjPJJSMwZz8wpRi0oZ5Gkrhbw9dIA)

----

```ts
const fn = (a, b) => {
  //        ~    Parameter 'a' implicitly has an 'any' type
  //           ~ Parameter 'b' implicitly has an 'any' type
  console.log(a + b);
}
callWithRandomNumbers(fn);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABBAhgGzQdRlAFgJRTABM4BbAORDICMBTAJwGcAKYMALkRbAEYuw1egwA0iMACYBQxgEpEAXgB8iAG5wYxeQG8AUIkTsWAWRR4AdAyKkyLWWNMWrJcndkBuXQF9dEBEyhDJAVuFDEaeWVEPQMAeliDRMSAPySABRQrMjooRkQAchR8xBgyAAc0GAgcNABPRFwUJkQiAqJa4qhasrp9RHikwYNUjKycvPyaYtKKqpr6xubWwrAOxC6evr8wJjg0OnM0OABzFhREAGpECM8fVAxsPEIXShlmNjAPXSA)

----

```ts
const fn = (a: number, b: number) => {
  console.log(a + b);
}
callWithRandomNumbers(fn);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABBAhgGzQdRlAFgJRTABM4BbAORDICMBTAJwGcAKYMALkRbAEYuw1egwA0iMACYBQxgEpEAXgB8iAG5wYxeQG8AUIkTsWAWRR4AdAyKkyLWWNMWrJcndkBuXQF9dEBEyhDJAVuFGlaRjEacOF5ZUQ9Az8wJjg0OnM0OABzFhREAGpEGg9vX3QsHAJrcioI5jYwUqA)
