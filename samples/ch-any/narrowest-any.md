# Item 43: Use the Narrowest Possible Scope for any Types

## Things to Remember

- Make your uses of `any` as narrowly scoped as possible to avoid undesired loss of type safety elsewhere in your code.
- Never return an `any` type from a function. This will silently lead to the loss of type safety for code that calls the function.
- Use `as any` on individual properties of a larger object instead of the whole object.

## Code Samples

```ts
declare function getPizza(): Pizza;
function eatSalad(salad: Salad) { /* ... */ }

function eatDinner() {
  const pizza = getPizza();
  eatSalad(pizza);
  //       ~~~~~
  // Argument of type 'Pizza' is not assignable to parameter of type 'Salad'
  pizza.slice();
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNExH0trW3sgsAARUBBobjwxZGQEOzpkMldkAF4HJ083Lm86ktjwluxe2qScusnkAD9Z2bHEnIBBKHJzAFsIcGRCGAJ1FABybsPkYBpkEEIwZDgaGmByEDgAIxYUIma4KDhNqR29moNMhDoNDmNhnA0jQ2JxRuIgA)

----

```ts
function eatDinner1() {
  const pizza: any = getPizza();  // Don't do this
  eatSalad(pizza);  // ok
  pizza.slice();  // This call is unchecked!
}

function eatDinner2() {
  const pizza = getPizza();
  eatSalad(pizza as any);  // This is preferable
  pizza.slice();  // this is safe
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNEfS2tbeyCwABFQEGgARm48MWRkBDs6ZDJXajgQVWQAXgcnTzcuZiSckrsAcjBkQUICAAtgGjrA4Njw1uwh+sScwgBrZY24NJo2Ti2R5AAVBZoGhRZkReR8uaM9iEEAQjFxPL9CitSuVoAAmGq4ZaNEDNI49PrOTDYbjeerFNYcOFwO4dVQXHbXW5PO7EUwwaBwABGLAghyRx1O7AgKO2OTAROekXJvzEQA)

----

```ts
function eatDinner1() {
  const pizza: any = getPizza();
  eatSalad(pizza);
  pizza.slice();
  return pizza;  // unsafe pizza!
}

function spiceItUp() {
  const pizza = eatDinner1();
  //    ^? const pizza: any
  pizza.addRedPepperFlakes();  // This call is also unchecked!
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNEfS2tbeyCwABFQEGgARm48MWRkBDs6ZDJXajgQVWQAXgcnTzcub3ri2PDW7CG6lsxsNJo2Tin60zBzKHsJuGYknMtImBQtgEIxcTy-QtoyJABJMABVYhrcacaQZq2ewOCykAqoNVlrt6vUAHoAfgaTTAMzayA6qmmWzSSkEACUIIJUBBSNAAGKKADWEBo3B2iRyABUABbAGgNBQsZD0hEsGiEZD5GlGEmCU7iIA)

----

```ts
function eatDinner1() {
  const pizza = getPizza();
  // @ts-ignore
  eatSalad(pizza);
  pizza.slice();
}

function eatDinner2() {
  const pizza = getPizza();
  // @ts-expect-error
  eatSalad(pizza);
  pizza.slice();
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNEfS2tbeyCwABFQEGgARm48MWRkBDs6ZDJXZABeBydPNy5vesScgAEwGgBaYHIQQlM6wODY8NbsPrnluDSaNk5V8Ty-QvnS8ugAJhrcOcaQZvWOrudMbG5+pOHRsYgADw1rT6goDM5sVFhx1qt6utNtsIC8xOIgA)

----

```ts
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value
 // ~~~ Property ... missing in type 'Bar' but required in type 'Foo'
  }
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNEJcGh4JGQAMUJCBJgyrXomZErCAFknAAtCcJ5kfiFcyQKZZAAhOCgEgCNh6p09HvzpIoBhOxhgcjwxZGQ4ahBzAFtR6G8N0e29g6gj5ARqXHWN5ABrCFVqUsJLkW8DIxMUBDs6J0FOZNINht5-iBAZDllRkIsQLDkABeNYbLbIACMABo7idkAAmXEba5o+5PF5Algg9aJHIAP0ZaCgJGganSmV2wBoNAoyFABHUKAA5EMoMLkKNzGBkKYAI7mYCmYQCtQaZDCt7Cu7iT5iIA)

----

```ts
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value
  }
} as any;  // Don't do this!
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNEJcGh4JGQAMUJCBJgyrXomZErCAFknAAtCcJ5kfiFcyQKZZAAhOCgEgCNh6p09HvzpIoBhOxhgcjwxZGQ4ahBzAFtR6G8N0e29g6gj5ARqXHWN5ABrCFVqUsJLkW8DIxMUBDs6J0FOZNINht5-iBAZDllRkIsQLDkABeNYbLbIACMABo7idkAAmXEba5o+5PF5Alggu7iESbGibECqZhJHIAETsAHIwMhBOUwM1gDQAIRiIA)

----

```ts
const config: Config = {
  a: 1,
  b: 2,  // These properties are still checked
  c: {
    key: value as any
  }
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArAF4bsg3ssAewAdjQBzALmQGcwoKBuWgG2CQAoBKagN0OAATZAF8AUKEixEKAMpwWcYfjABPYhGp0GIcs3GCICRVBQwAriARhghEMnIQw6LHG7UX2RmItWbd5Ag4MHlFQQ4aBSVqUKUuPGQAegAqZAA6DORkxNEJcGh4JGQAMUJCBJgyrXomZErCAFknAAtCcJ5kfiFcyQKZZAAhOCgEgCNh6p09HvzpIoBhOxhgcjwxZGQ4ahBzAFtR6G8N0e29g6gj5ARqXHWN5ABrCFVqUsJLkW8DIxMUBDs6J0FOZNINht5-iBAZDllRkIsQLDkABeNYbLbIACMABo7idkAAmbEbRI5AAqzQgNBQxCgJGgNipm1MtBsLBYV0pCCegju1zR9yeLyBLBBmxomxAqju4k+YiAA)
