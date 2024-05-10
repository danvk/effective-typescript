# Item 57: Prefer Tail-Recursive Generic Types

## Things to Remember

- Aim to make your recursive generic types tail recursive. They're more efficient and have greater depth limits.
- Recursive type aliases can often be made tail recursive by rewriting them to use an accumulator.

## Code Samples

```ts
function sum(nums: readonly number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return nums[0] + sum(nums.slice(1));
}

console.log(sum([0, 1, 2, 3, 4]));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBRncgXIgJwFMBDAEwQBsBPRbNAIyIIG0BdASn3qYMQG8AUIkQxgiLDgB0lImADmUABaIAvOsQAGDgOEjCRKCAJJNAbj0BfPcSMm6OFpraIA1CnSS0yKckowIIgwARg4OC2tBCARkOFkZOHkMVEwnABpEYIyAJgyAZgyAFk5wwSA)

----

```ts
const arr = Array(7875).fill(1);
console.log(sum(arr));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBRncgXIgJwFMBDAEwQBsBPRbNAIyIIG0BdASn3qYMQG8AUIkQxgiLDgB0lImADmUABaIAvOsQAGDgOEjCRKCAJJNAbj0BfPcSMm6OFpraIA1CnSS0yKckowIIgwARg4OC2sIBGQoRBICPlVEAEEEkmoMAHYADkyAVg4pYBhKShDwwSiwZDhZGTh5DFRMeIIwiyA)

----

```ts
function sum(nums: readonly number[], acc=0): number {
  if (nums.length === 0) {
    return acc;
  }
  return sum(nums.slice(1), nums[0] + acc);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBRncgXIgJwFMBDAEwQBsBPRbNAIyIIG0BdAGkRIggF4ADAEp89JgUQBvAFCJEMYIiw4AdJSJgA5lAAWiPgcTCpsuYSJQQBJDwgBuUwF9TxS9ZTplaZCuSUYEEQYAIxCXPTILAJsiADU3LxCDs5AA)

----

```ts
type GetChars<S extends string> =
    S extends `${infer FirstChar}${infer RestOfString}`
    ? FirstChar | GetChars<RestOfString>
    : never;

type ABC = GetChars<"abc">;
//   ^? type ABC = "a" | "b" | "c"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBA4hwGEAWBDATgZwDwGUoQA9gIA7AEwyg2DQEsSBzAPigF4AoKLqPQ48ygAMAJAG96AMwhooAMVqZEqNAF8xk6VABKEagHkJOGvQYrBnbgH45C6snRQAPrHj3MWHfsPHGTC1wAuKBIIADdpAG52dlBIKABBACEENhcldGwAIhQAIwBjTKYogHpi7gA9a1joJJTWKGzMpwacpudMgvYgA)

----

```ts
type Long = GetChars<"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX">;
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Type instantiation is excessively deep and possibly infinite.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBA4hwGEAWBDATgZwDwGUoQA9gIA7AEwyg2DQEsSBzAPigF4AoKLqPQ48ygAMAJAG96AMwhooAMVqZEqNAF8xk6VABKEagHkJOGvQYrBnbgH45C6snRQAPrHj3MWHfsPHGTC1wAuKBIIADdpAG52dlBIKABBACEENhcldGwAIhQAIwBjTKYogHpi7gA9a1joJJTWKGzMpwacpudMgpjwaAAZAHtGVLh092z8sggJBiRaACsAawAbAFsSPrAAR0UAV1CAdwIQAC9agBEAUVkYAAkASQApAGkegFkAOT0ABQBFLRwAFQAqgA1ADqAA1CiUytxYVwAH6IpHIlGotHojGYtHsUpwuH-bpQejUFAkYC0FDkgZEyiEPK6DC0cKLEBQCYQMBQUlkKBgPoYRk5FlEkgSei0YgAOnYQA)

----

```ts
type ToSnake<T extends string> =
    string extends T
    ? string  // We want ToSnake<string> = string
    : T extends `${infer First}${infer Rest}`
    ? (First extends Uppercase<First>  // Is First a capital letter?
      ? `_${Lowercase<First>}${ToSnake<Rest>}`  // e.g. "B" -> "_b"
      : `${First}${ToSnake<Rest>}`)
    : T;

type S = ToSnake<'fooBarBaz'>;
//   ^? type S = "foo_bar_baz"

type Two = ToSnake<'className' | 'tagName'>;
//   ^? type Two = "class_name" | "tag_name"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gZQHYEMDWEA8MoQB7ARIAmAzlKcAE4CWSA5gHxQC8AUFJxdXfbgUTKwOXAPzdaDTgHppUAOrQA7iiTBYiVBkyVJTVhN4jOALlj9CJcgAMAJAG86AMwhUoAMRpVKAXwfPXKAAlCF9rYyhxAApPb3V8SyEAVTBIKgBjFFIsWMpmKFkoAElyXPUUKEywGmAUABsoOohgQipRCM5xawB9BwAZOCVXTOzMMsY-e3hkdCwQvJ9rGTkIADp6VagAIgAhLagAWmYt7oAjLY6oMzt7MsnprTnQ4AnrAEoIsxgAbjY2UEgUAQBges0wAHInHA4DsUFRYQAvcGMX6FTgAPXEAOgwJY2yhcDOcKJCIu-3A0BgSjgIM0YPB6TqWVIADkUABbCDgqAAHyg4Nq9DZnORqLkGKxFNg1IMW0ZzO6qE5+z5W0Fio5EAuQA)

----

```ts
type Long = ToSnake<'reallyDescriptiveNamePropThatsALittleTooLoquacious'>;
//          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//          Type instantiation is excessively deep and possibly infinite.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gZQHYEMDWEA8MoQB7ARIAmAzlKcAE4CWSA5gHxQC8AUFJxdXfbgUTKwOXAPzdaDTgHppUAOrQA7iiTBYiVBkyVJTVhN4jOALlj9CJcgAMAJAG86AMwhUoAMRpVKAXwfPXKAAlCF9rYyhxAApPb3V8SyEAVTBIKgBjFFIsWMpmKFkoAElyXPUUKEywGmAUABsoOohgQipRCM5xawB9BwAZOCVXTOzMMsY-e3hkdCwQvJ9rGTkIADp6VagAIgAhLagAWmYt7oAjLY6oMzt7MsnprTnQ4AnrAEoIsxgAbjY2UEgUAQBges0wAHInHA4DsUFRYQAvcGMX6FTgAPXEAOgwJY2yhcDOcKJCIu-3A0BgSjgIM0YPB6TqWVIADkUABbCDgqAAHyg4Nq9DZnORqLkGKxFNg1IMW0ZzO6qE5+z5W0Fio5EAu2KgAykeNB2nBVAg9TqIAAIqF0rQwMAaAA3CDCiAABSocDAMAAFihgKQAIJ9GrAJrwOADACOAFcUOkaHBo6RRWw0Vx01AAH7ZnO5vP5guFovF-Op8UZrgwKV0Siqe1+hNIKA0cj4dKhUiOiDmqDECAQMBQVTEKBgOCkTunHvOOg1NZsIA)

----

```ts
type ToSnake<T extends string, Acc extends string = ""> =
  string extends T
  ? string  // We want ToSnake<string> = string
  : T extends `${infer First}${infer Rest}`
  ? ToSnake<
      Rest,
      First extends Uppercase<First>
      ? `${Acc}_${Lowercase<First>}`
      : `${Acc}${First}`
    >
  : Acc;

type S = ToSnake<'fooBarBaz'>;
//   ^? type S = "foo_bar_baz"

type Two = ToSnake<'className' | 'tagName'>;
//   ^? type Two = "class_name" | "tag_name"

type Long = ToSnake<'reallyDescriptiveNamePropThatsALittleTooLoquacious'>;
//   ^? type Long = "really_descriptive_name_prop_thats_a_little_too_loquacious"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKg9gZQHYEMDWEA8MoQB7ARIAmAzlKcAE4CWSA5gDRQCCAxm7gUWRdXfSgBeKACJRAPmEAoKH1oMuhEuRiyoAfnkC5Ael1QA6tADuKJMFiJUGTJQX0pI+wPUAuWEp7kABgBIAbzoAMwgqKAAxGipKAF9AkLCoACUIOJ91LXhkdCx1OTlUykZ8gqiYy3xlXgBVMEgqNhRSLHLKCVK5LX8A9jZYgH1AgBk4EzCmlsw24AlYjIKCjx6++ICZ+dKOuQ8+gG5paVBIKARhKxzbAHJguDgAIRQqR4AvK4kD-QKAPS1j6DOIlEtzgAwARk9wSgXqJDv9YCY4OdsjYsFc2AAbZqkAByKAAthArlAAD5QK7AFD0PGE96fAxyX5QeEwRHnUSY7EDVCE0SksSU+jcgkQWFHcDQUaKEQo3KYK5UCAoDEYkAAETSbFoYGANAAbhAaRAAApUOBgGAACxQwFILGGNGAwAxEHgcFGAEcAK4oNg0OBe0h06RfRl-CVQKWCIGK5WqgbETXa3UG4WEgZgM1gAbAa22gYoAYYx3OiA5u5FuDe33+wOwoA)
