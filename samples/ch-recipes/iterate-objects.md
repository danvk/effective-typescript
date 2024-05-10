# Item 60: Know How to Iterate Over Objects

## Things to Remember

- Be aware that any objects your function receives as parameters might have additional keys.
- Use `Object.entries` to iterate over the keys and values of any object.
- Use a ++for-in++ loop with an explicit type assertion to iterate objects when you know exactly what the keys will be.
- Consider `Map` as an alternative to objects since it's easier to iterate over.

////
Check that the "Surprisingly" aside continues to work:
// verifier:reset
// verifier:prepend-subset-of-id-to-following:abc:1-5
[source,ts]
----
function foo(abc: ABC) {
let k: keyof ABC;
for (k in abc) {
// ^? let k: keyof ABC (equivalent to "a" | "b" | "c")
const v = abc[k];
//    ^? const v: string | number
}
}
----
////

## Code Samples

```ts
const obj = {
  one: 'uno',
  two: 'dos',
  three: 'tres',
};
for (const k in obj) {
  const v = obj[k];
  //        ~~~~~~ Element implicitly has an 'any' type
  //               because type ... has no index signature
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBCBGArGBeGBvAUDOYCmAXDAOQCuYIxANNjFAO4hHEAmIE1tUAFgE56ESUfhxoBfANyYAZiF4wAFKEiwA1jACWYOEgCUGWsugwAbqh2IA2qoC6UnAHoHOFy4B+HzzACiAGzwAtnhgsBoBAA6+GsAaUL4AnjDcAIYQMMnaxBnxxHTx4Xi0Tq4lpfB4wMmkEHh5BTAAdE1JqTAUmmAseAAeMBAaAOZgyVCk-JhimEA)

----

```ts
const obj = { one: 'uno', two: 'dos', three: 'tres' };
//    ^? const obj: {
//         one: string;
//         two: string;
//         three: string;
//       }
for (const k in obj) {
  //       ^? const k: string
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBCBGArGBeGBvOYCmAuGA5AK5ggEA0MUA7iPgQCYgQVUAWATtnoVFyzAC+AbgBQAenExpMAHoB+GKEiwEifOglSZOrD2gcAlmADmYybp006MA8bNbLMqJ2747p89t2DRAMxAOGAAKZWgYAGsYYzgkAEoMUWkLSwUlcHCI9z57JJgLADoi0V8gA)

----

```ts
for (const kStr in obj) {
  const k = kStr as keyof typeof obj;
  //    ^? const k: "one" | "two" | "three"
  const v = obj[k];  // OK
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBCBGArGBeGBvAUDOYCmAXDAOQCuYIxANNjFAO4hHEAmIE1tUAFgE56ESUfhxoBfANyYAZiF4wAFKEiwA1jACWYOEgCUGWsugwAbqh2IA2qoC6UnAHoHOFy4B+HzzACiAGzwAtnhgsBoBAA6+GsAaUL4AnjDcAIYQMMnaxBnxxHTx4Xi0Tq4lpfB4wMmkEHh5BTAAdE1JqTAUmmAseAAeMBAaAOZgyVCk-JhiMnKKRmoAysIdFvpYOLMw6miqC-KtqnjxINJ1eEcW9jDFLgB6APww66pEAETgeM8wAD4wzwwgH99fnwBM9DOBjGY0AgrLYJI5nAB5ADSE0wQA)

----

```ts
interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  for (const k in abc) {
    //       ^? const k: string
    const v = abc[k];
    //        ~~~~~~ Element implicitly has an 'any' type
    //               because type 'ABC' has no index signature
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBCBGArGBeGBvAUDOYCmAXDAOQCuYIxANNjFAO4hHEAmIE1tUAFgE56ESUfhxoBfANyYAZiF4wAFKEiwA1jACWYOEgCUGWsugwAbqh2IA2qoC6UnAHoHOFy4B+HzzACiAGzwAtnhgsBoBAA6+GsAaUL4AnjDcAIYQMMnaxBnxxHTx4Xi0Tq4lpfB4wMmkEHh5BTAAdE1JqTAUmmAseAAeMBAaAOZgyVCk-JhimFpQeLzSycC1AIIAQgDCBjjJRNC8WgP2MPA7wvuHwERgpAHlvFKTMuTAUBrgMLIgCsnwFzCra-osDhZPIlOBjOotOkfoDaI5nKUAHoAfhgRjUJz2YAGcLR4NgZjQ32A1jsuOKpRgni8fkCwVCESiMTiiRSaQyJGyuSg+UKrgplLKFSqNTqtWI-1ybLaIA6XV6-SGIzGfJgk0mQA)

----

```ts
const x = {a: 'a', b: 'b', c: 2, d: new Date()};
foo(x);  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBCBGArGBeGBvAUDOYCmAXDAOQCuYIxANNjFAO4hHEAmIE1tUAFgE56ESUfhxoBfANyYAZiF4wAFKEiwA1jACWYOEgCUGWsugwAbqh2IA2qoC6UnAHoHOFy4B+HzzACiAGzwAtnhgsBoBAA6+GsAaUL4AnjDcAIYQMMnaxBnxxHTx4Xi0Tq4lpfB4wMmkEHh5BTAAdE1JqTAUmmAseAAeMBAaAOZgyVCk-JhimFpQeLzSycC1AIIAQgDCBjjJRNC8WgP2MPA7wvuHwERgpAHlvFKTMuTAUBrgMLIgCsnwFzCra-osDhZPIlOBjOotOkfoDaI5nKUAHoAfhgRjUJz2YAGcLR4NgZjQ32A1jsuOKpRgni8fkCwVCESiMTiiRSaQyJGyuSg+UKrgplLKFSqNTqtWI-1ybLaIA6XV6-SGIzGfJgk0m6JgvTQ6G2nOoR2Y8ANvwATFQYCxLnh6DAACIjPAKXSSGQgT7dXQSeEwADyAGlMEA)

----

```ts
function foo(abc: ABC) {
  for (const kStr in abc) {
    let k = kStr as keyof ABC;
    //  ^? let k: keyof ABC (equivalent to "a" | "b" | "c")
    const v = abc[k];
    //    ^? const v: string | number
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIICEDCyDeAoZZOALmQGcwpQBzAbgOQCNSKqQ6GFSQBXAW0bR6AXzwweIBGGAB7EMhgyZACjiMuaLAEpcDRVGTKEcisgDWAZUrJQRdTvyFCAGwhhzyALzmrBuGXMIAE8ZGE1MeidkAHpowgA9AH5kV3czUjNg0PCGQmMQUwA3LzsEAG0zAF1Ip1iopOR8opZKGmQAH2ReAWgGUVEwIIAHFAAlCDIZZ0KIAB5RuAB3AD4ShcXkCAAPSBAAEwCAMQkpWXlk9eRSHDKAaRt5TJCw9crSdbvK4XpBkeQLILgAAW92840m0zmT2yGEwy3odQSyV+KABwNByAARHBMR0sYxcZ1MQhMXg8EA)

----

```ts
function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    //        ^? const k: string
    console.log(v);
    //          ^? const v: any
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIICEDCyDeAoZZOALmQGcwpQBzAbgOQCNSKqQ6GFSQBXAW0bR6AXzwweIBGGAB7EMhgyZACjiMuaLAEpcDRVGTKEcisgDaAawA0yAG4BdZDJjIA8owBWEKQDoI4KggyVXUtHXxCQgB6KMi45AA9AH5kYxBTCxZKGgZCNLIZABsIH0KZamVbLXo4mPj45NSTMDtSOBAATwZRUSA)

----

```ts
function foo(abc: ABC) {
  const keys = ['a', 'b', 'c'] as const;
  for (const k of keys) {
    //       ^? const k: "a" | "b" | "c"
    const v = abc[k];
    //    ^? const v: string | number
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIICEDCyDeAoZZOALmQGcwpQBzAbgOQCNSKqQ6GFSQBXAW0bR6AXzwweIBGGAB7EMhgyZACjiMuaLAEpcnORWQBrCAE8yyALzIA2gHI4tgDTJbjJy4S2AukXMJ9YPSEilDIyv4gBobIMjBGpmQ6+ISEAPSpKZkAegD8yBFRpABEcEXIAD7IRYxllUUIRQyEBWDIAG6WROrWhl5BKenZeS3tLJQ0Fci8AtAMoqJAA)

----

```ts
const m = new Map([
  //  ^? const m: Map<string, string>
  ['one', 'uno'],
  ['two', 'dos'],
  ['three', 'tres'],
]);
for (const [k, v] of m.entries()) {
  //        ^? const k: string
  console.log(v);
  //          ^? const v: string
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIICEDCyDeAoZZOALmQGcwpQBzAbgOQCNSKqQ6GFSQBXAW0bR6AXzwIA9iArI+yALzIQEAO7IAsnAAOACgDaDAPQHCAPQD8yCVLAzSGzQB5WNADTlKNAHwNdAckkQvm6+PCDivgC6Lj6+YMrhwQAm4mSR0YR+YAAWUBCBwZQQqVF4EQCU9DDiUMjaVtK6ANZuAG4RyOIwMgB0EOBURdplZbiGxoQTphb1No0sHuyckmTiADYQ3avi1NotFWOTh8jmlss2LfNs1HiiQA)
