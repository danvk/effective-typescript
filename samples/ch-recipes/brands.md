# Item 64: Consider Brands for Nominal Typing

## Things to Remember

- With nominal typing, a value has a type because you say it has a type, not because it has the same shape as that type.
- Consider attaching brands to distinguish primitive and object types that are semantically distinct but structurally identical.
- Be familiar with the various techniques for branding: properties on object types, string-based enums, private fields, and unique symbols.## Code Samples

```ts
interface Vector2D {
  x: number;
  y: number;
}
function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x ** 2 + p.y ** 2);
}

calculateNorm({x: 3, y: 4});  // OK, result is 5
const vec3D = {x: 3, y: 4, z: 1};
calculateNorm(vec3D);  // OK! result is also 5
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lATAEWQG8AoZZADwC5kQBXAWwCNoBuM5ATxvubZIC+JGHRCZgWEMgRwANgjqy4kAHI4GACgAONdJhwEAlMQ5QIYOlCkBZZQAsAdAGcAjlDDaHFZACofyXGQAamQtB05ff1xDdiESGXlFZQg1KE0iamQAZgAaLhoAFgEY8gB6UuQAeQBpPLMnRTBkYCdkAFZ4yScmgDcMLMIAXmJM3PzkAryALxoARgF2BIUlVXUNPoQBkuRyquqAQmR6xubWuScsdpIgA)

----

```ts
interface Vector2D {
  type: '2d';
  x: number;
  y: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lATAEWQG8AoZZMATwAcIAuZAclwBNGBuM5ADwZAFcAtgCNoncpT5DRUTgF8SQA)

----

```ts
type AbsolutePath = string & {_brand: 'abs'};
function listAbsolutePath(path: AbsolutePath) {
  // ...
}
function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith('/');
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAggRgZwPYBsCuwIAUCGwAWUAvFAsAE4CWAdgOZQBkUA3gPpzk7UAmAXFAHIciAQF8A3ACgAZmmoBjYJSTUoKSmXjJ0mXAQAUYPPn5bUGbMYCULSVCgB6B1AB0byaJlzFy1RrM6lgZGBPxkVHRW-CGEGrCI5rrGtvbkEMBo5KoxLmQ45MAIAOqUBgIOAlZSnkA)

----

```ts
function f(path: string) {
  if (isAbsolutePath(path)) {
    listAbsolutePath(path);
  }
  listAbsolutePath(path);
  //               ~~~~ Argument of type 'string' is not assignable to
  //                    parameter of type 'AbsolutePath'
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAggRgZwPYBsCuwIAUCGwAWUAvFAsAE4CWAdgOZQBkUA3gPpzk7UAmAXFAHIciAQF8A3ACgAZmmoBjYJSTUoKSmXjJ0mXAQAUYPPn5bUGbMYCULSVCgB6B1AB0byaJlzFy1RrM6lgZGBPxkVHRW-CGEGrCI5rrGtvbkEMBo5KoxLmQ45MAIAOqUBgIOAlZSnrIKSipQ0obGYRQ0tDbMdlCU0lD6-gmBevjNBFad3fbqmkMWI2P4Vd2e0xrAAfPGi8v2TvYHh0dQAH5nJ7DktGgAthDUwFBIfaCQguHtAj0IUNRIjzgEAhKLRqMIUNBgEhuvtjnDjkZOHdMOQni9wNABJskgQBB5JEA)

----

```ts
type Meters = number & {_brand: 'meters'};
type Seconds = number & {_brand: 'seconds'};

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000);
//    ^? const oneKm: Meters
const oneMin = seconds(60);
//    ^? const oneMin: Seconds
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAshwQE4GcoF4oDsCuBbARklAGRQDeA+vogIaYAmAXFAOS7xLIsC+A3AFChIUAMoQAxgHsGqDDgJFSlanSatkE6fS59+-KZmTAo7BCnRQAFLmbzCiAJToAfCag1UcM8gEGjUDQNtC0tkWzx7JzRXVA9RTRkBfWl-aQgAaVwLU05LAEYABiKHAQB6UqhKqAA9AH4oP2M0zOYvTmTDJswIGABLTAtArWRLADYCkv5yqpr6xqg0vsxmMSDkfiA)

----

```ts
const tenKm = oneKm * 10;
//    ^? const tenKm: number
const v = oneKm / oneMin;
//    ^? const v: number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAshwQE4GcoF4oDsCuBbARklAGRQDeA+vogIaYAmAXFAOS7xLIsC+A3AFChIUAMoQAxgHsGqDDgJFSlanSatkE6fS59+-KZmTAo7BCnRQAFLmbzCiAJToAfCag1UcM8gEGjUDQNtC0tkWzx7JzRXVA9RTRkBfWl-aQgAaVwLU05LAEYABiKHAQB6UqhKqAA9AH4oP2M0zOYvTmTDJswIGABLTAtArWRLADYCkv5yqpr6xqg0vsxmMSDkDv8ETEyLZqyAKihCsoqquoaU4y2WrAikDeMAN13unYrF-pOZ8-nH8IVEPwgA)

----

```ts
declare const brand: unique symbol;
export type Meters = number & {[brand]: 'meters'};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEYD2A7AzgF3gIxlFwAXPAK4oCWAjiQmgJ4C22SEA3AFAgAeADkjFgx0eCALIgMIGGngBeeChJMp8AGTwA3gG1c+YAF1iAcgYSpaIwF8OQA)

----

```ts
function binarySearch<T>(xs: T[], x: T): boolean {
  let low = 0, high = xs.length - 1;
  while (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    const v = xs[mid];
    if (v === x) return true;
    [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
  }
  return false;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAIxmAhgJwJ4GUCmWEAFgDwAqAfABQAeAzgFyLkDaAugDSK3PkCUzZHDgAbQkgDeAKESJxUeXADuiALyIADN2IwA5sXU96AOnFg9UQwFpEARgDcsxMt3jE1XQcSUNolfyIMnJyEAj0igC2MAAmRv6qANSIALLoVibA-nCY1J76NkrKgQD0iABM-E4hiGFgEYgAbkYMrNEx7NUhMMAezWoDPIGY+FAgmEhQmCD4XXKsCToF7C0+TYgA-IhtsYjJdksGK8wLKtztiLZ2nc4Avs4jYxOIwOii9LPS90A)

----

```ts
type SortedList<T> = T[] & {_brand: 'sorted'};

function isSorted<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 0; i < xs.length - 1; i++) {
    if (xs[i] > xs[i + 1]) {
      return false;
    }
  }
  return true;
}

function binarySearch<T>(xs: SortedList<T>, x: T): boolean {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAyg9gJ2BAJgGQJYGdgB4AqAfFALxT4DaAulAGRQDeA+gEYICGAdigFxQDkWRMhT8AvgG4AUFIBmAV04BjYBjico2eElQFCACgAeWPpSoBKPsc1ZYw1Jhx7GUqFFmIo+gDYRgm0igABgkA3ChjADpfTgBzYAALKABaKABGUIwAaizzFzc3DFkvYwoMGmJSjCgs9It8grcEP3kEDVl2bywIaUaxVyh+ppa2qGAEeR6pfrlFFTUNFgxOdgQQGAhVpQS9IxM7HXRsPCIAGgjTSygWODhfLgaAekeoAGEAeQBZAAUAJQBRGAwAa+fzeOAAd0CQXOCQwsSSZCiMXiSVSGQGELhvi8cIRUEIZHBELyDAGbiU6hwUAAthgUIFiTUoJ92IlIrJwYh9Po8WioMS8i8AEzmXoFSmcakAN0CpTpKCo4sKxX0spIGoieWawFaGnGk2VUAoxNh8ISNCRBKgsoA-MaFcy0maETQ+CbIedHeilQMhlAdXr3J1uuLnlB-gA5AAi0xkQA)
