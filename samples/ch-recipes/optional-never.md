# Item 63: Use Optional Never Properties to Model Exclusive Or

## Things to Remember

- In TypeScript, "or" is "inclusive or": `A | B` means either `A`, `B`, or both.
- Consider the "both" possibility in your code, and either handle it or disallow it.
- Use tagged unions to model exclusive or where it's convenient. Consider using optional `never` properties where it isn't.

## Code Samples

```ts
interface ThingOne {
  shirtColor: string;
}
interface ThingTwo {
  hairColor: string;
}
type Thing = ThingOne | ThingTwo;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCoAtQHMDyIUDeAUMsgM6ZRgDCA9gDa1QBc5YU2A3EQL5GiRYiFBmyoA7rWTFS6OMCh1GLNhxBZufMAE8ADiMzrkAXjSHc+ZAB8zYydyA)

----

```ts
const bothThings = {
  shirtColor: 'red',
  hairColor: 'blue',
};
const thing1: ThingOne = bothThings;  // ok
const thing2: ThingTwo = bothThings;  // ok
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCoAtQHMDyIUDeAUMsgM6ZRgDCA9gDa1QBc5YU2A3EQL5GiRYiFBmyoA7rWTFS6OMCh1GLNhxBZufMAE8ADiMzrkAXjSHc+ZAB8zYydwS0QZMMgBGtMOlHqyJ6STklDQMTKwA5FAQACbhADSBcgpKYcjhbvQArhDxvA5OLshe2ACMrD4WKKYeXhVknKQA9I3ItADWRI7OrsXqAEzl5hJS1Z7e5vVNLe1EQA)

----

```ts
interface OnlyThingOne {
  shirtColor: string;
  hairColor?: never;
}
interface OnlyThingTwo {
  hairColor: string;
  shirtColor?: never;
}
type ExclusiveThing = OnlyThingOne | OnlyThingTwo;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBARiKALAKkglmA5hGBeGAbwCgYYIMAnKAYRABsRKAuGAckoFMATNgGlIwkAQ3SU6jFuzj0Arp37EAvgG5imKJ0oAzYcE4wA8mHoBPNJizGDJMhTG0GTVtEqW1ZEWIlMA-KzBOADctNSV1ME0dPQNjMwtsFAB3ECJBL3EnKVd3QXtqH0p-GECQyjDiKFMABwMAUQAPYDkIdBCErHwjE3MMbGsYAB9u+L6sZJA1IA)

----

```ts
const thing1: OnlyThingOne = bothThings;
//    ~~~~~~ Types of property 'hairColor' are incompatible.
const thing2: OnlyThingTwo = bothThings;
//    ~~~~~~ Types of property 'shirtColor' are incompatible.
const allThings: ExclusiveThing = {
  //  ~~~~~~~~~ Types of property 'hairColor' are incompatible.
  shirtColor: 'red',
  hairColor: 'blue',
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBARiKALAKkglmA5hGBeGAbwCgYYIMAnKAYRABsRKAuGAckoFMATNgGlIwkAQ3SU6jFuzj0Arp37EAvgG5imKJ0oAzYcE4wA8mHoBPNJizGDJMhTG0GTVtEqW1ZEWIlMA-KzBOADctNSV1ME0dPQNjMwtsFAB3ECJBL3EnKVd3QXtqH0p-GECQyjDiKFMABwMAUQAPYDkIdBCErHwjE3MMbGsYAB9u+L6sZJA1UEhYZEsARlY43ssBggRkDog1AHodsjIAP2OTmBQazlwQbRhqyhBa6lN2DMK2GGEuGExQAFtq4RQdAyTgAOmI02gMDm2AATEseh0Jl0NqgxttiHsDjATqdzrUrjc7g8tFV2PlHJJ3p8DD8QP9AcD6GCIeAocJ6PQtqxGs1ZK12mMurYYFicbjcWcLoTbvdHmS2K8stSvnSGUCQeC7FRKc52FxeAJPKJMpJWGwZPJFKpiEA)

----

```ts
interface Vector2D {
  x: number;
  y: number;
  z?: never;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lATAEWQG8AoZZADwC5kQBXAWwCNoBuM5ATxvubY4BeAfh4QAbvwC+JIA)

----

```ts
function norm(v: Vector2D) {
  return Math.sqrt(v.x ** 2 + v.y ** 2);
}
const v = {x: 3, y: 4, z: 5};
const d = norm(v);
//             ~ Types of property 'z' are incompatible.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lATAEWQG8AoZZADwC5kQBXAWwCNoBuM5ATxvubY4BeAfh4QAbvwC+JGHRCZgWELRwMAFGJrpMOAgEpiHKBDB0oygLJwwACwB0AZwCOUMBrsVkAKi-JcyAGpkMTtOb19cPXZpBCUHMGDkAF5iamQAZgAaLhoAFmyBGgBWSXZYkHjkABNklSh1MSiSAHpm8naOjoA-ZAAVTgAHCAdkLBhkAagsIdcwgHIBOeQ4Y2RQWIYB62AmABsIOxIgA)

----

```ts
interface ThingOneTag {
  type: 'one';
  shirtColor: string;
}
interface ThingTwoTag {
  type: 'two';
  hairColor: string;
}
type Thing = ThingOneTag | ThingTwoTag;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCoAtQHMDyIKpxbIDeAUMsmAJ4AOEAXMgOQD2+zA3BcgM6ZQwAYVYAbVlCa8wUbNwC+ZUJFiIUGbKgDurQsXKUa9JszA6uPdHGBQR4yXxlyyio+swhiAXjQfc+PWQAH19NHT1uIA)

----

```ts
type XOR<T1, T2> =
    (T1 & {[k in Exclude<keyof T2, keyof T1>]?: never}) |
    (T2 & {[k in Exclude<keyof T1, keyof T2>]?: never});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAGg8gJQDwBUCMAaKKBMA+KAXgCgoyoAKdKAMigG8BtAaygEsA7KAUQA8BjADYBXACYQkzCCAD2AM2w4sU2QvR4AugH4AXFA4QAbhABOAXwCUUAD6lyVHLQYt2XPkLESV87Jije1fG09A2NzCwBuYiA)

----

```ts
type ExclusiveThing = XOR<ThingOne, ThingTwo>;
const allThings: ExclusiveThing = {
  //  ~~~~~~~~~ Types of property 'hairColor' are incompatible.
  shirtColor: 'red',
  hairColor: 'blue',
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAGg8gJQDwBUCMAaKKBMA+KAXgCgoyoAKdKAMigG8BtAaygEsA7KAUQA8BjADYBXACYQkzCCAD2AM2w4sU2QvR4AugH4AXFA4QAbhABOAXwCUUAD6lyVHLQYt2XPkLESV87Jije1fG09A2NzCwBuYk5gUzkAQ35oFAALTgBzOAMGOwBnNJNgAGEZQRkTPVzgEwyos2iOWJMEpOw0jnSUAHcZHLIU+LYTErKKqCqajrriUEg2jKJ5jqzoayXOnqjZ6HcRXLZjVIXCWERUdsyDLCOO7pk8KP4ZDiqoeMFBG-TcvV3hfcOF0W9DsAHpQWQAH7QmEw7DgCC5KA+MAmGSQQogKAAcgGQxG5WxbxM0E4TwAtmB4sA2AAjQQQAB0eQKxVK5T02JJomxGDseOG7LG2PpwggvOIZiiQA)
