# Item 46: Use unknown Instead of any for Values with an Unknown Type

## Things to Remember

- The `unknown` type is a type-safe alternative to `any`. Use it when you know you have a value but do not know or do not care what its type is.
- Use `unknown` to force your users to use a type assertion or other form of narrowing.
- Avoid return-only type parameters, which can create a false sense of security.
- Understand the difference between `{}`, `object`, and `unknown`.

////## Code Samples

```ts
function parseYAML(yaml: string): any {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CQA)

----

```ts
interface Book {
  name: string;
  author: string;
}
const book: Book = parseYAML(`
  name: Wuthering Heights
  author: Emily Brontë
`);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsEQCEyIAEYJiQzxSYgAvCgYOAQkpAAGqcYMAOq2duHZiAAS2DBsdlCYGvkOTj5UMDR8segIUADXgt0cnkA)

----

```ts
const book = parseYAML(`
  name: Jane Eyre
  author: Charlotte Brontë
`);
console.log(book.title);  // No error, logs "undefined" at runtime
book('read');  // No error, throws "book is not a function" at runtime
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsEQCEyIAEYJyQC8KBg4BCSkAAapxgwAUjwxSuRaGvkOTlJ2GDRwUGFx6AhQANeC7RyeFWCYcDTYAHTTbKS1SXuwULvrIt6+cIjhC+hWh5iIpuAAJtjArNgfLqgoJpwLB0oITolSAByLSoD5Qq5iCS3e7oR5WewLADur1MEMQMFeYBm1kQoEgsAQAKB6BBMDBQA)

----

```ts
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book = safeParseYAML(`
  name: The Tenant of Wildfell Hall
  author: Anne Brontë
`);
console.log(book.title);
//          ~~~~ 'book' is of type 'unknown'
book("read");
// Error: 'book' is of type 'unknown'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsGgkLAIjKjA2HIYOAQkFNT0mSWcDOCJYHAA7voaWjp6KI14RGSUtBxlghAITIgARgnJALw1dQ1Yky0ABqnGDAAqdjGn2EZgUIhwwIgA6jA0ACZ1NDSIABKoXxp8g4nIh8GAwDFYugEFAANeCA5zBZLOA0bAAOhocDYpDWSXRsCgaKR3hEZPJAD8qRTEAByPGJWmIGCYe6PKDkZAxWk9PqDWmCBmkUxaVBvUwkiRKdDQkH09ZMllsxAcrl03kDMACoA)

----

```ts
const book = safeParseYAML(`
  name: Villette
  author: Charlotte Brontë
`) as Book;
console.log(book.title);
//               ~~~~~ Property 'title' does not exist on type 'Book'
book('read');
// Error: This expression is not callable
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsGgkLAIjKjA2HIYOAQkFNT0mSWcDOCJYHAA7voaWjp6KI14RGSUtBxlghAITIgARgnJALw1dQ1Yky0ABqnGDABqMDQ02mEa+Q5OUnYYNHBQYXHoCFAA14IHHNZMHF1p5FmBMHArgA6F5sUhrJJQ2BQK5zQTeESYrHYgB+eLxiDkn2Q4SgfAA5MiruTEAATODYIF9KCIbAADxgy2qZJJiHJ8SS5MECMSpHJWlQtPJaO8SnQnweABU7JzWWzkFpMJh4EhVczEBBUJdUCsroIgA)

----

```ts
interface Feature {
  id?: string | number;
  geometry: Geometry;
  properties: unknown;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsGgkLAIjKjA2HIYOAQkFNT0mSWcDOCJYHAA7voaWjp6KI14RGSUtBxlIWBhEVExAOLYcOnMfPzBoeGR0YgAYtioozFCIjAAJgD8RVnsiAA+hiBUAEbhuYhsG1t0OQGOtNtogb9kOg4MhwrBsJhumBegMwPMgA)

----

```ts
function isSmallArray(arr: readonly unknown[]): boolean {
  return arr.length < 10;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsGgkLAIjKjA2HIYOAQkFNT0mSWcDOCJYHAA7voaWjp6KI14RGSUtBxlIWBhEVExAOLYcOnMfPzl4NDwSDCYKlSoNDT46Oio5KQYTprYqAAmCDR8PX2DANoAulxEAAjBI0Z5DEQjXRIB4AOjB7HsiAAPIgAIwABnmQA)

----

```ts
function processValue(value: unknown) {
  if (value instanceof Date) {
    value
    // ^? (parameter) value: Date
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsGgkLAIjKjA2HIYOAQkFNT0mSWcDOCJYHAA7voaWjp6KI14RGSUtBxlIWBhEVExAOLYcOnMfPzl4NDwSMjocNGYmABqqDQg2KQAbte33WC9A2AcKSIwwIgPTzFWEweNE4L9-Kgwp8hCIRI8btgNCJvAA9AD8fzQ6GMS0+8OeiAhYQ0wWCQA)

----

```ts
function isBook(value: unknown): value is Book {
  return (
      typeof(value) === 'object' && value !== null &&
      'name' in value && 'author' in value
  );
}
function processValue(value: unknown) {
  if (isBook(value)) {
    value;
    // ^? (parameter) value: Book
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CrFDY6MCoENiIAEJwcADWAhpGVCaMzKxsniI29o4MTCzsnsGgkLAIjKjA2HIYOAQkFNT0mSWcDOCJYHAA7voaWjp6KI14RGSUtBxlIWBhEVExAOLYcOnMfPzl4NDwSDCY8UmkAG6oNCAZPX2DXIiX1zHHcQnJQiIjukikGiIRFByMgNsALlcbhxEABeOGIADkcAARgArbDQBGIABk2KekJiAEJ4WAQDQaDjsQDAQi0tgsax8S9KYj8g50AykM8bho5kFBBUDtVkOg4NFMJgAGoEiEvbpgXoDMDQr6IGDARCkY6nRKyqEq6nc7C5QHeAB6AH5NWh0MYltCjQwdRpgsEgA)

----

```ts
function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAmgQQFkAZACgE9UBbAGwC5FMp0YwBzASgdTHMQG8AUIkQB6UYgDCAeUIAFAEoBRAMorhidNigh0SfojDVsDAESmANIlQgoACzjozpxAF8A3BvGIlAOQAigq6CoJCwCIyowNhyGDgEJAA8ACoAfBTU9IzMrJwMyQIaWjp6KHF4RGSUtByewUA)

----

```ts
declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGIHt3IN7JpgLmQGcwpQBzZAXwChRJZEUAhOKHZAI3aNPJBU6AEwgIANuxQJ0IUnkJpMAblriIYbuwCCIAJ7IAvAqxxiyOPovm2UVes08oAVRABrIyevIAru5DoAO4g3raqQA)
