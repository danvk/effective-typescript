# Item 21: Create Objects All at Once

## Things to Remember

- Prefer to build objects all at once rather than piecemeal.
- Use multiple objects and object spread syntax (`{...a, ...b}`) to add properties in a type-safe way.
- Know how to conditionally add properties to an object.

## Code Samples

```ts
const pt = {};
//    ^? const pt: {}
pt.x = 3;
// ~ Property 'x' does not exist on type '{}'
pt.y = 4;
// ~ Property 'y' does not exist on type '{}'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBADrAvDA3gXwNwCgD0OYEwB6A-DKJLAgFyppYIB0AHjMgMzZ4wB+MACgCcQcAKaCoATxgByZjJgATEKIgwwIWKOYBLaDHAwpY2ehkMojacgAsXfHyEjxU2ZIXLV6zTG17YhsaipmjmQA)

----

```ts
interface Point { x: number; y: number; }
const pt: Point = {};
   // ~~ Type '{}' is missing the following properties from type 'Point': x, y
pt.x = 3;
pt.y = 4;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQb2QDwC5kQBXAWwCNoBuZAT2LKtuQF8AoBdEAZ2wAOYYhizIAvLjY0OyOQHp5yAH7LkAFXoCUAchxsdyYL2TljvUAHNkYABYoY6ADZP0AdyvIBUdNqhhgCBMYH3IbLV1RcB1ifAAaBg4hADp8CWQAZhkU+nSAFhkgA)

----

```ts
const pt = {} as Point;
//    ^? const pt: Point
pt.x = 3;
pt.y = 4;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQb2QDwC5kQBXAWwCNoBuZAT2LKtuQF8AoBdEAZ2wAO2ALy42yOLzSZwNDgHp5yZcgB6AfmTc+gsMQxYOQgHT5kogMxyT9c8gAsdZIuQB5ANIcgA)

----

```ts
const pt: Point = {
  x: 3,
  y: 4,
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQb2QDwC5kQBXAWwCNoBuZAT2LKtuQF8AoBdEAZ2wAOYYhizIAvLg7ICxAMwAaaQ2IAWJWxocgA)

----

```ts
const pt = {x: 3, y: 4};
const id = {name: 'Pythagoras'};
const namedPoint = {};
Object.assign(namedPoint, pt, id);
namedPoint.name;
        // ~~~~ Property 'name' does not exist on type '{}'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQb2QDwC5kQBXAWwCNoBuZAT2LKtuQF8AoBdEAZ2wAO2ALy4iyAMwAaBsQAsbGlx79kwACbJROEHHIRiAclT0wACzgBzdFDi9Di5X2y796jFi25HAeUoArCAQwADo7XmBLEAAKVwh3THAZIRkNAEolOISsELilZALCgoB6YuQAP0rytCh0AWgwemRDOMNkdXQIXhJ0bAh8YFUeZEb65pw2Qw4gA)

----

```ts
const namedPoint = {...pt, ...id};
//    ^? const namedPoint: { name: string; x: number; y: number; }
namedPoint.name;  // OK
//         ^? (property) name: string
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQb2QDwC5kQBXAWwCNoBuZAT2LKtuQF8AoBdEAZ2wAO2ALy4iyAMwAaBsQAsbGlx79kwACbJROEHHIRiAclT0wACzgBzdFDi9Di5X2y796jFi24AdL6Ezfbw1HAHoQ5AjkAD0AfmRuZxI9CHdMcGI8VwNkfihQSzpxZmooOkYSChK6TizUrG8sumQw5AB5AGkOFsie6LiACgEodAFoMHoASiT9Ylz8jiA)

----

```ts
const pt0 = {};
const pt1 = {...pt0, x: 3};
const pt: Point = {...pt1, y: 4};  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgAoHtRmQb2QDwC5kQBXAWwCNoBuZAT2LKtuQF8AoBdEAZ2wAOYAAzIAvLjY0uPfsiEBGcbgB0aocIA0BYgGYpMvoLDEMWZTjUrF2xsgAsU5MgD0L5AHkA0hyA)

----

```ts
declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
const president = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};
//    ^? const president: {
//         middle?: string;
//         first: string;
//         last: string;
//       }
// or: const president = {...firstLast, ...(hasMiddle && {middle: 'S'})};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/CYUwxgNghgTiAEEQBd4AsoGcCyBLYwSAXPAEYD25SUAdgNwBQY5NmqAZrjGwDJaoBeeAG9O3ZCQDkACVgwAnpIA0iflIAqMAK4BbWpIC+jZq1QAHOJnwgagkQDpHY3vxWP7ACgw58hBAH4RHV9ieEkAZUN4EmEDAEojBgB6JPg0+AA9QJM2eAsQK1BbGOTU9PL4YIIkfxI2GFwaAHNGFIry5wl4esaW0vb06DY65Abm1rKKg37yGBIc80trW3ghYXdOvjY3Ry8sPGqEADIjoJCQKUj4xKA)

----

```ts
declare let hasDates: boolean;
const nameTitle = {name: 'Khufu', title: 'Pharaoh'};
const pharaoh = { ...nameTitle, ...(hasDates && {start: -2589, end: -2566})};
//    ^? const pharaoh: {
//         start?: number;
//         end?: number;
//         name: string;
//         title: string;
//       }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/CYUwxgNghgTiAEEQBd4AsoGcAiVkkwC54AjAezKSgDsBuAKDDOs1WqgFsQAVAS2STwAvPADe7LsQDkAaTQBXAGbypAGnjJ+SaQAUMMKGTRSAvgyYtUAB32G0wsfAB0LiTy0h1LpwAoMOPAJ4ADJgsVZYZGIAWgAmAFYADgBOdRBqYBiEgDZskwBKM3oAemL4cvgAPQB+eAtWeBtYO2JRErKKzvgImGRq4mp5DhIQGAZSrs704H74QeHR8Y7Juc4QYlYYXmoAcyWV8s0Bde7kLd39yZN6IA)

----

```ts
const {start} = pharaoh;
//     ^? const start: number | undefined
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/CYUwxgNghgTiAEEQBd4AsoGcAiVkkwC54AjAezKSgDsBuAKDDOs1WqgFsQAVAS2STwAvPADe7LsQDkAaTQBXAGbypAGnjJ+SaQAUMMKGTRSAvgyYtUAB32G0wsfAB0LiTy0h1LpwAoMOPAJ4ADJgsVZYZGIAWgAmAFYADgBOdRBqYBiEgDZskwBKM3oAemL4cvgAPQB+eAtWeBtYO2JRErKKzvgImGRq4mp5DhIQGAZSrs704H74QeHR8Y7Juc4QYlYYXmoAcyWV8s0Bde7kLd39yZNGZgbRHuQTByaDI0uKmrrb1AeBoZGYPAAD7weQZECKbYgYD0IA)
