# Item 44: Prefer More Precise Variants of any to Plain any

## Things to Remember

- When you use `any`, think about whether any JavaScript value is truly permissible.
- Prefer more precise forms of `any` such as `any[]` or `{[id: string]: any}` or `() => any` if they more accurately model your data.

// TODO: I don't love these examples since they could all be replaced with `unknown[]`.

## Code Samples

```ts
function getLengthBad(array: any) {  // Don't do this!
  return array.length;
}

function getLength(array: any[]) {  // This is better
  return array.length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQDKrMqALAIQEMATACiICdKiBPALkSLFoEpEBvRRAeh8QAiCAORREJOInwwAzgEIAUN0roQlJFRq0AdABtsuPAG4FAXwULQkWAhTosOfBWp1GzWgG0Auuy69+ACp4soghAEboUKiUSogqUGoaLjr6jsZmCkA)

----

```ts
getLengthBad(/123/);  // No error, returns undefined
getLength(/123/);
//        ~~~~~
// Argument of type 'RegExp' is not assignable to parameter of type 'any[]'.

getLengthBad(null);  // No error, throws at runtime
getLength(null);
//        ~~~~
// Argument of type 'null' is not assignable to parameter of type 'any[]'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQDKrMqALAIQEMATACiICdKiBPALkSLFoEpEBvRRAeh8QAiCAORREJOInwwAzgEIAUN0roQlJFRq0AdABtsuPAG4FAXwULQkWAhTosOfBWp1GzWgG0Auuy69+ACp4soghAEboUKiUSogqUGoaLjr6jsZmCmiYBvjE5DwAjABMAMw8rEbcfIgAcpLRlHCUADRxquoyiOAkqMAwYKgkmfY5eGSFpeUm1dyz3AB+i4sK1QCClMggALbYYnDAUrQADqiIwgBKqMgAogAeR8KhnWBwYkQyMjDIYERh+lKSI5UIg7KKURD7Q4nM7ubzCbQWLIOQx5MhgEC6XQVKr8OqIBpNVr4RoAd06RDElHAsB2w2yaTRGKx034c1mS3mK34602OzAewOUGOp2E6MxjxCLzeHy+Pz+pyggOBoOiEMFwphLDhCKAA)

----

```ts
function hasAKeyThatEndsWithZ(o: Record<string, any>) {
  for (const key in o) {
    if (key.endsWith('z')) {
      console.log(key, o[key]);
      return true;
    }
  }
  return false;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQDKrMqALAIQEMATACiICdKiBPALkSLFoEpEBvRRAeh8QAiCAORREJOInwwAzgEIAUN0roQlJFRq0AdABtsuPAG4FAXwULQkWAhTosOfBWp1GzWgG0Auuy69+ACp4soghAEboUKiUSogqUGoaLjr6jsZmluDQ8Eh4RDIAggDSqLRBRFAAomAkMgDqMPgAWmRwjABKqBBwlCQAPDJQlDA4ADRMLAB8vrHAPYhk3WCDiADWpaFIcDPc3DDAC+s62LUNTsIAXsKsO7vcSzJw+npwyGRH43AeRz4md8qqdRSSggVB-XbmbiQuKApDAIi6GRgjJAA)

----

```ts
function hasAKeyThatEndsWithZ(o: object) {
  for (const key in o) {
    if (key.endsWith('z')) {
      console.log(key, o[key]);
      //               ~~~~~~ Element implicitly has an 'any' type
      //                      because type '{}' has no index signature
      return true;
    }
  }
  return false;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQDKrMqALAIQEMATACiICdKiBPALkSLFoEpEBvRRAeh8QAiCAORREJOInwwAzgEIAUN0roQlJFRq0AdABtsuPAG4FAXwULQkWAhTosOfBWp1GzWgG0Auuy69+ACp4soghAEboUKiUSogqUGoaLjr6jsZmluDQ8Eh4RDIAggDSqLRBRFAAomAkMgDqMPgAWmRwjHBhAFao0L6xwHCUiGQQCDJiANaloUhwfdzcMMDDUzrYtQ1OwgBewqzzC9yjYDJw+npwyGSrADSIcB6rPiaH3HyvH4cAfj+-iJX6AC22DEMEBAAddDAII1dLREHkZEwkMJ3MIpLRwahYod3p98R8IhAiCAZKgMVjEMIOKZ0YjEGBJDAaqgAB6IGQwZBgCpqbEfeKJKSUECoF4LczcSVxVTqRDAIi6MkmcxAA)

----

```ts
type Fn0 = () => any;  // any function callable with no params
type Fn1 = (arg: any) => any;  // With one param
type FnN = (...args: any[]) => any;  // With any number of params
                                     // same as "Function" type
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQDKrMqALAIQEMATACiICdKiBPALkSLFoEpEBvRRAeh8QAiCAORREJOInwwAzgEIAUN0roQlJFRq0AdABtsuPAG4FAXwULQkWAhTosOfBWp1GzWgG0Auuy69+ACp4soghAEboUKiUSogqUGoaLjr6jsZmClC0AA6oiABiYAAMiAC8iGTspQB8TCxG3Hx1tIhW0PBIEES6ukRh+ogA7jD4iGCS2VREALYymTl5hQCMZRVUyG4sVbXuDf6IAOojeIgIeZM00-O5BWAAcqtk2s-rMpuePmU79Y38R6PuMYgaYRSinYCIC4zObcWFw+EIxFI36IGQzPJEGSIABE+XA7QQ2KkCwUQA)

----

```ts
const numArgsBad = (...args: any) => args.length;
//    ^? const numArgsBad: (...args: any) => any
const numArgsBetter = (...args: any[]) => args.length;
//    ^? const numArgsBetter: (...args: any[]) => number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQDKrMqALAIQEMATACiICdKiBPALkSLFoEpEBvRRAeh8QAiCAORREJOInwwAzgEIAUN0roQlJFRq0AdABtsuPAG4FAXwULQkWAhTosOfBWp1GzWgG0Auuy69+ACp4soghAEboUKiUSogqUGoaLjr6jsZmChAIMmJgIAC2AIKUyDLEJIgAvIhk2nVUpW4s7JUAfEwlMnoG+CZ83NwAegD8iFlgOYh5RZ3ljLX1nU1sVe3umdm5BcWlBJHRVTV12g0yy94ta53daX38AyNjm1Pbs-uU88en5z6rL-kRGJAA)
