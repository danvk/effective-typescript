# Item 77: Understand the Relationship Between Type Checking and Unit Testing

## Things to Remember

- Type checking and unit testing are different, complementary techniques for demonstrating program correctness. You want both.
- Unit tests demonstrate correct behavior on particular inputs, while type checking eliminates whole classes of incorrect behaviors.
- Rely on the type checker to check types. Write unit tests for behaviors that can't be checked with types.
- Avoid testing inputs that would be type errors unless there are concerns about security or data corruption.

## Code Samples

```ts
test('add', () => {
  expect(add(0, 0)).toEqual(0);
  expect(add(123, 456)).toEqual(579);
  expect(add(-100, 90)).toEqual(-10);
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKWw0sxAbwChFEySoQZJMkQBqagG5OAX05QSAZygYA5GlQqqGBogC8APg7dEJAB4AHEtCzoMABip2GDAHRQ4AUQCOIZABt7BikeM0trdQwARgAmAGYqABYAVgA2ZzdPH38MJIB2AE4g41CrZQiAWki7B0R8p1d3b18AyqcpaSKgA)

----

```ts
function add(a: number, b: number): number {
  if (isNaN(a) || isNaN(b)) {
    return 'Not a number!';
    // ~~~ Type 'string' is not assignable to type 'number'.
  }
  return (a|0) + (b|0);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKWw0sxAbwChFEZhEMMAM4A5ZCKwNEAH2m9R4jEQZSuPHmRJQQZJAHIRcKCjwtyAQj0BubuoD0dxAD8XiACoBPAA4lEeoVBkMGAA5nryeEYoQkIwIWDIRAA2vlBwiFDevnp0rHoAdLYAvraa2roCyNIADFIA1AJENQw2JUA)

----

```ts
function add(a: number, b: number): number {
  return a - b; // oops!
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKWw0sxAbwChFEySoQZJMkQBaagG5EAemmI4cAA4BnAIScAvpyA)

----

```ts
test('out-of-domain add', () => {
  expect(add(null, null)).toEqual(0);
  //         ~~~~ Type 'null' is not assignable to parameter of type 'number'.
  expect(add(null, 12)).toEqual(12);
  //         ~~~~ Type 'null' is not assignable to parameter of type 'number'.
  expect(add(undefined, null)).toBe(NaN);
  //         ~~~~~~~~~ Type 'undefined' is not assignable to parameter of ...
  expect(add('ab', 'cd')).toEqual('abcd');
  //         ~~~~ Type 'string' is not assignable to parameter of type 'number'.
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKWw0sxAbwChFEySoQZJMkQBqagG5OAX05QSAZygYA5HBBQAtHGCbUcAshjD0KqhgaIAvAD4O3RCQAeABxLQs6DPgA2Pqr4+DAwAdFBwAKIAjiDIPhgADAxSPAD0qTyZWQB+udmIACoAnm6IKoEqiDAKeHBQKAoKMADmYMhEPiSI4YguyGTIBPzkiDrdJV3lLOQqIQ7Obh5omIFUAIwATMFhkTFxGJvJDulZp3n5xaVTfpXVtfXIjS1tHV09fQND8mxjUBNldFYs3mrncymWGHAqBIwGMJFQARAfm24QAQiQMAA5ZCYo5pDKnTLnYmFf4qKEwuGoW41MB1BpNVrtTrdOC9fqDYY-YCIEJ8kGLcFeFTtMxlCDUlG7WLxEVECUqPGIE6EnjnUlXJRkYzNGn3BnPZlvNkfTnfUY8v5XQEzObSI5AA)

----

```ts
interface User {
  id: string;
  name: string;
  memberSince: string;
}

declare function updateUserById(
  id: string,
  update: Partial<Omit<User, 'id'>> & {id?: never}
): Promise<User>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKWw0sxAbwChFEySoQZJMkQBqagG5OAX04wwUcsGQQSiAKoBnch26IYqXJqhl5Acyk8wyAiSMnzlxLfpkAyvNX3TYCzM6cqCQQADbIfIigkLAIiCAADqjIilrkAEIAngCSmHoG3uYUeglJirgACuGwyCEAPADyBDBQtamUiADkBh0AfD2IAGQcBgD8tCQAbuSyTIjlZHBN2q3aZD1SQA)

----

```ts
test('invalid update', () => {
  // @ts-expect-error Can't call updateUserById to update an ID.
  expect(() => updateUserById('123', {id: '234'})).toReject();
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKWw0sxAbwChFEySoQZJMkQBqagG5OAX05QSAZygYA5DDAA3ZABsYqRCAAOqZPJVUMDRAF4AfB26IA9E8QABKAoC0JAB6GSaB8yMjg2AGFkMBUoRAgdbQNjUxIAVQVyACEATwBJfSg4JJN5FCRcgBEAOkc-AOgMSxt7IxK0jLIc-NUARgAmAGZzDj1cFUGAFhVpBgYqwoAlEgArQOUGKRmpIA)
