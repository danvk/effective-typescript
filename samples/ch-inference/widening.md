# Item 20: Understand How a Variable Gets Its Type

## Things to Remember

- Understand how TypeScript infers a type from a literal by widening it.
- Familiarize yourself with the ways you can affect this behavior: `const`, type annotations, context, helper functions, `as const`, and `satisfies`.

## Code Samples

```ts
interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREgA)

----

```ts
let x = 'x';
let vec = {x: 10, y: 20, z: 30};
getComponent(vec, x);
//                ~ Argument of type 'string' is not assignable
//                  to parameter of type '"x" | "y" | "z"'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREAGwUSZABedydk9LBkKOzCMmQARgAGC1ZkACZq7nJcSsFk+SUVdRBNMF0MC2I-ZIB6EeCJyanggD9kAEEoWRpe5CwYZDBmVRR7GzAoUFlnWwosQrgbG2BZEDhadOEx6Zep7GRVOCg4agVoNY2Wx27gARMQQa5kCDmBC3CCuCD7MIgA)

----

```ts
const mixed = ['x', 1];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswZGpgYggAE2QAXmQYx3sLAEYk4SA)

----

```ts
let x = 'x';
x = 'a';
x = 'Four score and seven years ago...';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREAGwUSZABedydk4mz3OHt8wvsAMSxw5BsEHBQ4EAATGog9GWYIOCgbS1ksADohkuEgA)

----

```ts
const x = 'x';
//    ^? const x: "x"
let vec = {x: 10, y: 20, z: 30};
getComponent(vec, x);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswEmQAXncnZIB6AuDggD0AfmQ0kAyScgAiYnrhABsFZCicwjJkAEYABgtWZAAmQe5yXH7BZPklFXUQTTBdDAtiPyZkIuQAeQBpYSA)

----

```ts
const obj = {
  x: 1,
};
obj.x = 3;  // OK
obj.x = '3';
//  ~ Type 'string' is not assignable to type 'number'
obj.y = 4;
//  ~ Property 'y' does not exist on type '{ x: number; }'
obj.z = 5;
//  ~ Property 'z' does not exist on type '{ x: number; }'
obj.name = 'Pythagoras';
//  ~~~~ Property 'name' does not exist on type '{ x: number; }'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswZCxaACtkAF5A4LJkAEYzFOTsnIA6YgLkXCZkAHoW5AB5AGlharqG+1x7ZLbggD9kABVmVRR7DKhQWWdbCixMuBsbYFkQOFoAGxRsZDAZufZ+e17cmuYGgBYR9uQJgAUoLFmoM-dPZAAJlgIDY1pkINYMlkZGdZu4iCVLpxBNc+lwGgBWZ7jZAfL7QX4+ZxAkFg5AQ2yZaSnc7wki8DgCZAom61PbUFCFexvZhgAAWcFkOE2w2Eo1eY0luM+30J7IgxOBoJA63JkKpMNp9gRDP4QmuQA)

----

```ts
const obj: { x: string | number } = { x: 1 };
//    ^? const obj: { x: string | number; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswZCxaACtyIjJkDKhQWVcKPmhkQWQAXkIScgBGauSAejbg4IA9AH5kNJAMrNz8xqKwEpAyt3Z+IWEgA)

----

```ts
const obj1 = { x: 1, y: 2 };
//    ^? const obj1: { x: number; y: number; }

const obj2 = { x: 1 as const, y: 2 };
//    ^? const obj2: { x: 1; y: number; }

const obj3 = { x: 1, y: 2 } as const;
//    ^? const obj3: { readonly x: 1; readonly y: 2; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswZCxaACsARmQAXkIScjyLVmQAJmRBZIB6euDggD0AfmQ0kAys3LzyIjIKPk5K9n4hYWEunuycmuLBsssbTvSwCvIauuFG5uR2te7MuaqB0uQ8pjGRgVqpmZPc-EWL8pYt2pWjjIam5sOj16OVw51CcAAJtIADbMN5McFQkCwj7VSZAA)

----

```ts
const arr1 = [1, 2, 3];
//    ^? const arr1: number[]
const arr2 = [1, 2, 3] as const;
//    ^? const arr2: readonly [1, 2, 3]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswSygoAEZkAF5kGJyLACYLXCThAHpq4OCAPQB+ZDSQDKzc3g5YhOE2jrhs0oKikuRy5ErLG1b0sGTa+uRmufbMoahS8lC4ABNpABtmMbKKvqA)

----

```ts
function tuple<T extends unknown[]>(...elements: T) { return elements; }

const arr3 = tuple(1, 2, 3);
//    ^? const arr3: [number, number, number]
const mix = tuple(4, 'five', true);
//    ^? const mix: [number, string, boolean]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYRExCTApGTBKVQAbCAAeABVkCGJIEAATG2RxAGsQLAB3EBiEgD4tADoeiHzqTTA7ZCKAolDsiNL+wZshYWEEaRswSyg8ZABeZGy8iC0ARgsAJgtcP2SAekvg4IA9AH5kJZAVtbxyGPZ+C2-oX740ASi2Wq2owGIWx2OXyWgALBZ7DBgHp7BYwFBKBALsJrrdkI9nqDkOCyMgvoCoBYVlBQLILLQsFh8nAQMCgA)

----

```ts
const frozenArray = Object.freeze([1, 2, 3]);
//    ^? const frozenArray: readonly number[]
const frozenObj = Object.freeze({x: 1, y: 2});
//    ^? const frozenObj: Readonly<{ x: 1; y: 2; }>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREEaRswZBgoLC5NAEEoKDhmZABeZAB5WgArfQA6bIgIPK0YgEYLACYLXAS-ZIB6QeDggD0AfmQ0kAysnLyQQuLWEIg4ABNpABtS9n4YhOEZuezczWqa8qrahqaWiC0CMmROlnIuwQHhYdHkSem6UyZ0Wl3IACV1lsQLsADxEF7tJirLpCAB8wiAA)

----

```ts
type Point = [number, number];
const capitals1 = { ny: [-73.7562, 42.6526], ca: [-121.4944, 38.5816] };
//    ^? const capitals1: { ny: number[]; ca: number[]; }

const capitals2 = {
  ny: [-73.7562, 42.6526], ca: [-121.4944, 38.5816]
} satisfies Record<string, Point>;
capitals2
// ^? const capitals2: { ny: [number, number]; ca: [number, number]; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREwZlUUAAUsUDBkAF5kGPZ+CxLoJOEEaRs8hDhVYDA4ABsbAEYCwgpWIoBaAHZcADoBgFYANgAmCwAWKeGJsamJhIt68hi+9qn24dmATlnZi1wADmGxs-bV5EFkgHoH4OCAPQB+ZGqQWq+GptaHXIRBAvXKsSSf14HAhQmEVRqdX+zTaUy6BCCPU2gxG42mcwWSxWayh-R2e0Ox1OFyuNwSKWQNjgYFsMGAEBsyAAShgcAATAA8tSgoFkFmyuQAfMl6o0UTYpsInsgPl9EX85YCpsCsUVwWU+BUmBs9YaoAaYZCREA)

----

```ts
const capitals3: Record<string, Point> = capitals2;
capitals3.pr;  // undefined at runtime
//        ^? Point
capitals2.pr;
//        ~~ Property 'pr' does not exist on type '{ ny: ...; ca: ...; }'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREwZlUUAAUsUDBkAF5kGPZ+CxLoJOEEaRs8hDhVYDA4ABsbAEYCwgpWIoBaAHZcADoBgFYANgAmCwAWKeGJsamJhIt68hi+9qn24dmATlnZi1wADmGxs-bV5EFkgHoH4OCAPQB+ZGqQWq+GptaHXIRBAvXKsSSf14HAhQmEVRqdX+zTaUy6BCCPU2gxG42mcwWSxWayh-R2e0Ox1OFyuNwSKWQNjgYFsMGAEBsyAAShgcAATAA8tSgoFkFmyuQAfMl6o0UTYpsInsgPl9EX85YCpsCsUVwWU+BUmBs9YaoAaYZCRN9frKAW1cOQedUoILhaLxTlwJKunb5VMZcjASNVAJgsrxHyIGyQBA+ZY8lBxCzqBAlc8XpnVRLwFUg6jhqHHhnM8EAH5l5CZKBYDJQNLuUPOPlYDkULB5CDWX7SZBpDLuEG9YYj41wcgj4ZCezCIA)

----

```ts
const capitalsBad = {
    ny: [-73.7562, 42.6526, 148],
//  ~~ Type '[number, number, number]' is not assignable to type 'Point'.
    ca: [-121.4944, 38.5816, 26],
//  ~~ Type '[number, number, number]' is not assignable to type 'Point'.
} satisfies Record<string, Point>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzMgb2QA8AuZEAVwFsAjaAbmQE9yq7HkAvNm+qJgF8AUDEohMwLCGQBzCGADCWagAdpEcAAoAbhmxRy6TDlwAaZHGLAAzuQDkxe8gA+ye82dv7XewEpCYWRkKAVKKBk9EygAbStbAF0GYREwZlUUAAUsUDBkAF5kGPZ+CxLoJOEEaRs8hDhVYDA4ABsbAEYCwgpWIoBaAHZcADoBgFYANgAmCwAWKeGJsamJhIt68hi+9qn24dmATlnZi1wADmGxs-bV5EFkgHoH4OCAPQB+ZGqQWq+GptaHXIRBAvXKsSSf14HAhQmEVRqdX+zTaUy6BCCPU2gxG42mcwWSxWayh-R2e0Ox1OFyuNwSKWQNjgYFsMGAEBsyAAShgcAATAA8tSgoFkFmyuQAfMl6o0UTYpsInsgPl9EX85YCpsCsUVwWU+BUmBs9YaoAaYZCRN9frKAW0AEJwPnozHBUHYoajSYzZDzRbLCYWdqzM5rJXPZAAPyjyAAKukUPZimaLaUKGaEs5bBQsHk4DYbMBZCA4LQWihsMg0hl3BLwPZhm7SVtyfsjidkOdLtcg8hiWYI8EY-HE+4UzC09Ap1As8gcyA85ZC8XS+XK1hq2P7PWwI2GUyWTY2RzubyoILhaLxTlwNLhEA)
