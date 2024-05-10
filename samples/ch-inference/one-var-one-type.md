# Item 19: Use Different Variables for Different Types

## Things to Remember

- While a variable's value can change, its type generally does not.
- To avoid confusion, both for human readers and for the type checker, avoid reusing variables for differently typed values.

## Code Samples

```ts
let productId = "12-34-56";
fetchProduct(productId);

productId = 123456;
// ~~~~~~ Type 'number' is not assignable to type 'string'
fetchProductBySerialNumber(productId);
//                         ~~~~~~~~~
// Argument of type 'string' is not assignable to parameter of type 'number'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABMAplCALACgJzgExGgAoZ8AuRAZyhxjAHMBKRAbwF8AoUSWBZNJlwEiUAEIBPAMoo6AQwA2AORABbAEazSFRGDWacLDpwVpEABzyFoASXyIAvIgBEARgBMAWgDMAFk8ArABszgDc3ILYVqLEliK2+EzhnHHWUHaOiB5+weEA9HmIAH4lpYgAKhLmKIgA5HoasrWIMFS6cFCIclRUMAxgcuqmiFBwI1U1tTR0jLUR6FHx4tKyMIoqjTix0QlJnAWIh0fHJ6fHpRcl+4UAgjgMaihgnXDA49V10-QMza3tnd1ev1BsNRhY5Dg5Ko0LJEK93pMGgY5kA)

----

```ts
let productId: string | number = "12-34-56";
fetchProduct(productId);

productId = 123456;  // OK
fetchProductBySerialNumber(productId);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABMAplCALACgJzgExGgAoZ8AuRAZyhxjAHMBKRAbwF8AoUSWBZNJlwEiUAEIBPAMoo6AQwA2AORABbAEazSFRGDWacLDpwVpEABzyFoASR006jRAB9d+2YgC8iAEQBGACYAWgBmABYggFYANh8Abm5BbCtRYksRW3wmBM506yg7L0RA8Ji4xEQAekrEAHkAaUT0ZIzxaVkYRRUNLTzRO2yK6rrGoA)

----

```ts
const productId = "12-34-56";
fetchProduct(productId);

const serial = 123456;  // OK
fetchProductBySerialNumber(serial);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABMAplCALACgJzgExGgAoZ8AuRAZyhxjAHMBKRAbwF8AoUSWBZNJlwEiUAEIBPAMoo6AQwA2AORABbAEazSFRGDWacLDpwgIaiAA55C0AJL5EAXkQAiAIwAmALQBmACxeAKwAbC4A3NyC2NaixFYidvhMESZmUNSyMIpOiJ7+IWGIiAD0xYgA8gDSkejRCeLSmYoqGlpUTQrJRaUV1UA)

----

```ts
const productId = "12-34-56";
fetchProduct(productId);

{
  const productId = 123456;  // OK
  fetchProductBySerialNumber(productId);  // OK
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABMAplCALACgJzgExGgAoZ8AuRAZyhxjAHMBKRAbwF8AoUSWBZNJlwEiUAEIBPAMoo6AQwA2AORABbAEazSFRGDWacLDpwgIaiAA55C0AJL5EAXkQAiAIwAmALQBmACxeAKwAbC4A3NyC2NaixFYidvhMEZysnIiIpmDm8TZQ9k6Inv4hYRkA9OWIAPIA0ukC6NEJ4tKyMIoqGlq5ovbJFVV1nFxAA)
