# Item 51: Avoid Unnecessary Type Parameters

## Things to Remember

- Avoid adding type parameters to functions and classes that don't need them.
- Since type parameters relate types, every type parameter must appear two or more times to establish a relationship.
- Remember that a type parameter may appear in an inferred type.
- Avoid "return-only generics."
- Unneeded type parameters can often be replaced with the `unknown` type.

## Code Samples

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABDAJgUzLKBPAPAFQD4AKAQwCcBzALkXwEpb9EBvAKEUXLShHKQqUA3GwC+bIA)

----

```ts
const date = identity(new Date());
//    ^? const date: Date
const nums = [1, 2, 3];
//    ^? const nums: number[]
const numsCopy = nums.map(identity);
//    ^? const numsCopy: number[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABDAJgUzLKBPAPAFQD4AKAQwCcBzALkXwEpb9EBvAKEUXLShHKQqUA3GwC+bCAgDOURClJQ0iALzJ0mGDmJg0Ad0QARBWmL16IgPQXOnAHoB+RJLAy5x2kcUTpssCAC2UiqIANoAjAA0iABMUQDMALqW1jYOTj6IfoG0WQBGaOQhCd4uvgFSAMJwAA7YwVlSAHT+pNXEqBhY2OZsVjaIac6uDVW1OQH5hcVAA)

----

```ts
function identity<T>(arg: T): T {
  //           (decl.)    1   2
  return arg;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABDAJgUzLKBPAPAFQD4AKAQwCcBzALkXwEpb9EBvAKEUQHovO--OxdBAA2AOnr8AjHwBMHROTRQQ5JBUoBuNgF82QA)

----

```ts
function third<A, B, C>(a: A, b: B, c: C): C {
  return c;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABFAFjATgEwDwEEA0iAQoQMIB8AFAIYBciBiARvSYhPaQJSeIDeAKESJ0AUygh0SCAG4BAXwFA)

----

```ts
function third<C>(a: unknown, b: unknown, c: C): C {
  return c;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABFAFjATgEwDwGEB8AFAIYBci4A1mHAO5gA0iARuVTfUxObgJQ+IA3gChEidAFMoIdEggBuYQF9hQA)

----

```ts
declare function parseYAML<T>(input: string): T;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwAdYBnEATQEEBZAGQB4AVAPgAotUDkMAueYjGOwDmASl4MA3ACggA)

----

```ts
interface Weight {
  pounds: number;
  ounces: number;
}

const w: Weight = parseYAML('');
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwAdYBnEATQEEBZAGQB4AVAPgAotUDkMAueYjGOwDmASl4MA3ACh2GEDERQwCAOogsQgBYZ4AbynxCONMGK9UyALYAjedMPH0IM-As27UgL5SpYPP3gAd141DW14AF5CEnJqGhYAcgSRaSA)

----

```ts
declare function parseYAML<T=null>(input: string): T;
const w: Weight = parseYAML('');  // still allowed
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgOoWAcwBZmQbwChlkAHAewFcQATAZwC5kRKBbAI2gG5jkqQkjZm05QeAX0I0ICADZwoKGNQRhg5EGQV0IATQCCAWQAyAHgAqAXhazZAPgAUoUpTBM6YKKEwBKJuZ4EDQ9kAHcmdCxcZEstKB0DEwcAcmSfLhIAekzkD2BbZDhbclCIGkIgA)

----

```ts
declare function parseYAML(input: string): unknown;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgOoWAcwBZmQbwChlkAHAewFcQATAZwC5kRKBbAI2gG5jkqQkjZm05QeAX0I0ICADZwoKGNQRhg5EGQV0IATQCCAWQAyAClClKYJnTBRQmAJRNqAaxDkA7iB5A)

----

```ts
const w = parseYAML('') as Weight;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgOoWAcwBZmQbwChlkAHAewFcQATAZwC5kRKBbAI2gG5jkqQkjZm05QeAX0I0ICADZwoKGNQRhg5EGQV0IATQCCAWQAyAClClKYJnTBRQmAJRNqAaxDkA7iB4INt5E9kAF4tKB0DE1MAcmjHZDg6NAwcMB4gA)

----

```ts
function printProperty<T, K extends keyof T>(obj: T, key: K) {
  console.log(obj[key]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwE4zFACquyCmqUAngDwAqANIgNKL4AeU+YAJgM6IDW+xcwicgD4AFHABGAKwBcg6j2KyaASkQBvAFCJEEBOzgAbfADoDcAOZipAbQUBdZQG4NAXw1A)

----

```ts
function printProperty<T>(obj: T, key: keyof T) {
  console.log(obj[key]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwE4zFACquyCmqUAngDwAqAfABRwBGAVgFyLkA0iA1vsS98XGCsAlIgDeAKESIICAM5wANvgB0iuAHNajANr8AusIDcEgL4SgA)

----

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQAoCc4AdVZQCeAPACoA0iA0oqgB5SpgAmAzogNapFzCJkAfAAo4AIwBWALgFVuRGdQCUiAN4AoRIizoQWJOIkBteQF0A3OoC+6oA)

----

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQAoCc4AdVZQCeAPACoA0iA0oqgB5SpgAmAzogNapFzCJkAfAAo4AIwBWALgFVuRGdQCUMsgG1qAXUQBvAFCJEWdCCxJxEtfM0BuPQF89QA)

----

```ts
class ClassyArray<T> {
  arr: T[];
  constructor(arr: T[]) { this.arr = arr; }

  get(): T[] { return this.arr; }
  add(item: T) { this.arr.push(item); }
  remove(item: T) {
    this.arr = this.arr.filter(el => el !== item)
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEDC5QJ4EEBOqyIDwBUB80A3gFDTRjoBc0OA2gLoDcp0wA9gHYQAuqArsG5tUACgqpqdegEoi0bgAsAlhAB046AF5y6RtAC+xFgHMAptxHTJDOanN9UHecrXi9hsmAAmXkUu6mALaSsoTOKuroqgAOfBAKfgGB0u4sdoFsAG6miUEhRCxkihEa2sWuUQBmSiABoqYgWgQN0ACEmtr+QdIshoZAA)

----

```ts
class Joiner<T extends string | number> {
  join(els: T[]) {
    return els.map(el => String(el)).join(',');
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEBSD2BLAdgUwE4B4Aq1UA8AXVZAExgkPRQHNoAfaZAVwFsAjDAPmgG8AoaNABWSZAApUICAC5o2ANoBdAJR9BQ6OlSFm6ZHmkA6VmAAOkkNAC8PAMpVallSqOiU4gOQAaTyoDcGgC+-CFAA)

----

```ts
class Joiner {
  join<T extends string | number>(els: T[]) {
    return els.map(el => String(el)).join(',');
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEBSD2BLAdgUwE7QN4ChrQCslkAeAFWlQA8AXVZAExghvRQHNoAfaZAVwC2AIwwA+ABSoQEAFzQyAbQC6ASmx580dKhp90yStIB0AsAAdJIaAF5R0AMqsOllSqNEU4gOQAaLyoBuDQBfHFCgA)

----

```ts
class Joiner {
  join(els: (string | number)[]) {
    return els.map(el => String(el)).join(',');
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEBSD2BLAdgUwE7QN4ChrQCslkAKVECALmhIgBd0UBzaAH2mQFcBbAIwwCUAbQC6A7HnzR0qOp3TJo5CADpuYAA5kQ0ALwA+aAGUGzbQIEqiKEgHIANLYEBuSQF8cHoA)

----

```ts
function join(els: (string|number)[]) {
  return els.map(el => String(el)).join(',');
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAKzjMAKApgGwM4BciGeUATugOYA+YIAtgEZZkCUA2gLquIDeAUIkRksUEGSS48AOnoBDAA7YciALwA+RAGVyVZa1bTU6DAHIANKdYBufgF9+QA)

----

```ts
interface Lengthy {
  length: number;
}
function getLength<T extends Lengthy>(x: T) {
  return x.length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EwMgIwwAPYhkmCGHRZcAHgAqyCAA9IIACYBnNFVx4AfAApldeQEoipZFEkMoY5QDpKMnJx5A)

----

```ts
function getLength(x: Lengthy) {
  return x.length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EwMgIwwAPYhkmCGHRZcACgAedadTwBKIqWRRJDKGPkA6SjJyceQA)

----

```ts
function getLength(x: {length: number}) {
  return x.length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EwMgIwwAPYhkmCGHRZcACgAedQpRm16zNlC4BKIqWRRJDKGPkA6FdU48gA)

----

```ts
function getLength(x: ArrayLike<unknown>) {
  return x.length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EwMgIwwAPYhkmCGHRZcACgAedAIJQocPKmABrCAB5+WkMIDuIAHwBKIqWRRJDKGPkA6SjJyceQA)

----

```ts
declare function processUnrelatedTypes<A, B>(a: A, b: B): void;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EAmECcnCgoYDEAjDAA9iGQAHKNKQBnFQFUQIoZF4AVPPIgqAPAEEANMgBCAPgAUcOpeQs61gJR0AbtOC9OIA)

----

```ts
declare function processUnrelatedTypes(a: unknown, b: unknown): void;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EAmECcnCgoYDEAjDAA9iGQAHKNKQBnFQFUQIoZF4AVPPIgqAFHDriA1iGkB3EABpkLCyGt2QASjoA3acF5OIA)

----

```ts
function processUnrelatedTypes<A, B>(a: A, b: B) {
    a = b;
//  ~ Type 'B' is not assignable to type 'A'.
    b = a;
//  ~ Type 'A' is not assignable to type 'B'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EwMgIwwAPYhkAByjCkAZxkBVEFAjk4kACYAVPOIgyAPAEEANMgBCAPgAUcOieQs6ZgJRFSZZHGQBeB5wD0-mQAfsjausgA5GaRyMAy9MJgnnLAmCBwLJTIYMI5OiiRhpEAdO5kLD6eAUHIoeGFxXEJIEkpMmkZWSi5+RHRpdzEQA)

----

```ts
function processUnrelatedTypes(a: unknown, b: unknown) {
  a = b;  // ok
  b = a;  // ok
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIRAczACwJ7IDeAUMsgDYbY4BcyIArgLYBG0A3MQL7EwMgIwwAPYhkAByjCkAZxkBVEFAjk4kACYAVPOIgyAFHDr8A1iGEB3EABpkLYyDOWQASiKlkcZAF477MgD0AcjCJh4sPp7+yEEhYTxAA)
