# Item 48: Avoid Soundness Traps

## Things to Remember

- "Unsoundness" is when a symbol's value at runtime diverges from its static type. It can lead to crashes and other bad behavior without type errors.
- Be aware of some of the common ways that unsoundness can arise: `any` types, type assertions (`as`, `is`), object and array lookups, and inaccurate type definitions.
- Avoid mutating function parameters as this can lead to unsoundness. Mark them as read-only if you don't intend to mutate them.
- Make sure child classes match their parent's method declarations.
- Be aware of how optional properties can lead to unsound types.

## Code Samples

```ts
const x = Math.random();
//    ^? const x: number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAHjAvDAsgQygCwHQCc1gAmIAtgBQCUA3AFAD0dMTMAegPwyiSxwBcMYAK4kARgFNcNIA)

----

```ts
const xs = [0, 1, 2];
//    ^? const xs: number[]
const x = xs[3];
//    ^? const x: number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAHhGBeGBtADAGhgRmwJgF0BuAKAHpyZqYA9AfhlElgQC4YwBXAWwCMApgCdUhUs2jxk8CKgDMJClRoMm4SXA7d+w0kA)

----

```ts
console.log(x.toFixed(1));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAHhGBeGBtADAGhgRmwJgF0BuAKAHpyZqYA9AfhlElgQC4YwBXAWwCMApgCdUhUs2jxk8CKgDMJClRoMm4SXA7d+w8epAAbAQDoDIAOYAKOMaggAYgEs4AgCaWcASk9kgA)

----

```ts
function logNumber(x: number) {
  console.log(x.toFixed(1));  // x is a string at runtime
  //          ^? (parameter) x: number
}
const num: any = 'forty two';
logNumber(num);  // no error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAGzgcwHIgLYCMCmATgBQAeAXImDgYQJSIDeAUIohAgM5zL4B0qNGT5Q4AMRil8AE2IBGOnQDcbAPSrEpRDE6IAhok5RCMMGn1REhcLGz5WidW2cvEAPQD8iYgAc9hPTsoIgYKKhoiZgBfZg4wI3DsSj0wAE9EAF5EAHJgOEIodKgAdzhspWZBLDwiYmpsZTUNMDhEIkJ85iA)

----

```ts
function logNumber(x: number) {
  console.log(x.toFixed(1));
}
const hour = (new Date()).getHours() || null;
//    ^? const hour: number | null
logNumber(hour);
//        ~~~~ ... Type 'null' is not assignable to type 'number'.
logNumber(hour as number);  // type checks, but might blow up at runtime
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAGzgcwHIgLYCMCmATgBQAeAXImDgYQJSIDeAUIohAgM5zL4B0qNGT5Q4AMRil8AE2IBGOnQDczAL7MOYTlEQALOCEKIAvImJh8Ad0QARAIZR8xRXzT4oACQOFOzxAB9-KhBkZBUAenC2NgA9AH52Lh19Q0pqPCIA4NDmQSwMkhT6CKjosoA-SvLEPlrEABUATwAHfEQAcmpQ9sQYTio4HTtOThg0MDtcXkRRGZa2zpoidr5c9HzaYiLEYeCC5TZIudb2XXwIAGtOABpEXBAdbDHdHSm4axBmnZ1CcFhsfDMIA)

----

```ts
if (hour !== null) {
  logNumber(hour);  // ok
  //        ^? const hour: number
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAGzgcwHIgLYCMCmATgBQAeAXImDgYQJSIDeAUIohAgM5zL4B0qNGT5Q4AMRil8AE2IBGOnQDczAL7MOYTlEQALOCEKIAvImJh8Ad0QARAIZR8xRXzT4oACQOFOzxAB9-KhBkZBUAenC2NgA9AH52Lh19Q0pqPCIA4NDmQSwMkhT6CKjosoA-SvLEPlrEABUATwAHfEQAcmpQ9sQYTio4HTtOThg0MDtcXkRRGZa2zpoidr5c9HzaYiLEYeCC5TZIudb2XXwIAGtOABpEXBAdbDHdHSm4axBmnZ1CcFhsfDMGDAMzbACExlMXWQDBYbDyS0K3gOiCOcAurFRpTKsQSmm0em8aURamYQA)

----

```ts
type IdToName = { [id: string]: string };
const ids: IdToName = {'007': 'James Bond'};
const agent = ids['008'];  // undefined at runtime.
//    ^? const agent: string
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAkgJgFQPYDkCGBbaBeKBvKAbQEs4AuKAZ2ACdiA7AcwF0Lq6moBfAbgCgAxknrUopShXjJ0WKLjwByAAxKA7AooKAUpgiUoAIWFwFvQcNFpGEesDli4lQsqUAOBcx5QoAeh9QAV3o4CAAzBgg4KDQ7GiDgYiwAOj4-b28APQB+KCEROysbYDZaBkY+IA)

----

```ts
const xs = [1, 2, 3];
alert(xs[3].toFixed(1));  // invalid code
//    ~~~~~ Object is possibly 'undefined'.
alert(xs[2].toFixed(1));  // valid code
//    ~~~~~ Object is possibly 'undefined'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noUncheckedIndexedAccess=true#code/MYewdgzgLgBAHhGBeGBtAjAGhgJmwZgF0BuAKAEMAbAUwCcoAKBVIgOihADEBLOagEwboAlMOIwYAekkxuYAG5Vu-GKH7VS0iRIB+evTADyAIwBW1YLG6IADiAgRuxygE8YAcgCuYdQDM5Au6sFDT0TBCoOITsXLwCQqLiUjKKlMqqIOqaMtr6BibmlrK29o7Obl4+1P5ggcFAA)

----

```ts
const xs = [1, 2, 3];
for (const x of xs) {
  console.log(x.toFixed(1));  // OK
}
const squares = xs.map(x => x * x);  // also OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAHhGBeGBtAjAGhgJmwZgF0BuAKADMQAnGAClEljhhHPggEoYBvUmGBhBAAbAKYA6YSADmtOOKggAYgEs4ogCa10HDsX4B6AzADyAaVIBfUoNgQAjgFcAhlVGIUCcQFtnABzlkAD54GAAqeD1DY2dhIVMLIA)

----

```ts
const xs: (number | undefined)[] = [1, 2, 3];
alert(xs[3].toFixed(1));
//    ~~~~~ Object is possibly 'undefined'.

type IdToName = { [id: string]: string | undefined };
const ids: IdToName = {'007': 'James Bond'};
const agent = ids['008'];
//    ^? const agent: string | undefined
alert(agent.toUpperCase());
//    ~~~~~ 'agent' is possibly 'undefined'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAHhAXDAFGArgWwEYFMBOMAPjOmACa4BmAlmLuQJQDaAujALwzMCMANDABMAgMysA3ACgAhgBsCUFAmZiAdFBAAxGnAYoejRlID0xmOZgA-a9ZgB5bACtcwWDQgwADiAgQa2WQBPGAByMkpaenIQ1UlJKEDPXBgASXIAFRAAOWlMZK4Ab24acmRofDoAc1YyqAqwSuJSCmo6BhgAXylQSDdyJFSM7Nz8mAKQgAYJgHYQ5BCAKRGPACFwaK7JHugYaUrcMFguEohmSYmADhCJSVMLGAA9AH4Ybdg9g6ha+saScNaojJ5PhFB9DuoQABVTxJfAAYWkEFwKEMJjMFhsthCYKgIRg7i8Pj8AWCYRakQYMUkQA)

----

```ts
'foo'.replace(/f(.)/, (fullMatch, group1, offset, fullString, namedGroups) => {
  console.log(fullMatch);  // "fo"
  console.log(group1);  // "o"
  console.log(offset);  // 0
  console.log(fullString); // "foo"
  console.log(namedGroups);  // undefined
  return fullMatch;
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/OQMw9mwHQE4KYAcA2BDAxnAFAehJqAlNgDQAEmIArkkgLIoAuaAFmQOYxiUICMZYIEAGc4DMlRoBlBjACWAOzZl5KALZwAJgHFO3IQVIBeAHykA3gChSpNGHlCwSOFCRg2FanUYsCAbmvY2KQARODBVjZ2Dk4ubpgcXLx+AUHBYOHWtvaOzq7uAsKiyaSBpAAMEVnRuXESSNJyismloRAZkdkxeZgq6tq6CPr+JUGU8hpwIAqaEfAMlDDypHX0TMy+FgC+fhZAA)

----

```ts
declare function f(): number | string;
const f1: () => number | string | boolean = f;  // OK
const f2: () => number = f;
//    ~~ Type '() => string | number' is not assignable to type '() => number'.
//         Type 'string | number' is not assignable to type 'number'.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtVIAoBKALnlWQFsAjEGeAH3gGcMYtUBzAbgCgw8rJAEYyxeAF4AfOSq16TVuy6N41HDgggo+CUm7x4AeiPwA8gGl+gjEgBMYopJkUadSft4nDhgH6-4ABUATwAHBABycWkWNg5OVVd5CPgsZnIcWyhmZixOVChqLXgMHBKwyOiXOToIgDovUx9moIr4CKV4xJqYFLSMrJy8gqKEUvLw9qTahqA)

----

```ts
declare function f(x: number | string): void;
const f1: (x: number | string | boolean) => void = f;
//    ~~
// Type 'string | number | boolean' is not assignable to type 'string | number'.
const f2: (x: number) => void = f;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtVIAoAPALnlWQFsAjEGeAH3gGcMYtUBzASjIDccWYAG4AUGDyskARjLEyFGnUYs2HTiuo4cEEFFTd4AXgB88AUONIxAehvwH8AH5PRd+ABUAngAcEAclZ2LhVFWnomLR09VH94LGZyHAx4KGZmLE5UKGpdeAwcfN8AoPVQqnD-ADpxSRTEACY5UnIKukNTc0FgK0RhB3cAeQBpUSA)

----

```ts
class Parent {
  foo(x: number | string) {}
  bar(x: number) {}
}
class Child extends Parent {
  foo(x: number) {}  // OK
  bar(x: number | string) {}  // OK
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAKYCcCmA7ALtA3gKGtAZgPaEAUAHgFzQoCuAtgEZILQA+0EaCAligOYBKLAF9c0BonJVajZkMyjRoSDADCAC24gAJtCRk0qbTHjJ0WMUVKVq9JgnnC8AemfQA8gGkxEhFNuyLOycPPyOLm5e2KJAA)

----

```ts
class FooChild extends Parent  {
  foo(x: number) {
    console.log(x.toFixed());
  }
}
const p: Parent = new FooChild();
p.foo('string');  // No type error, crashes at runtime
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEAKYCcCmA7ALtA3gKGtAZgPaEAUAHgFzQoCuAtgEZILQA+0EaCAligOYBKLAF9c0BonJVajZkMyjRoSDABixAMIALbiAAm0JGTSo9MeMnR4ceIqUrV6TBPLF5ghFBEIgkAOhBCPnI-NEJVbjIkPRIBAQBuMUVsDy8MAAcqC1QMAF5qJAB3aHVCbV0YhOx0vzsSAHJOHn56hLwAenboADlCaDQAT3SkQwQEQgQAGmhgBEgtJBgwDAQadG46JGwgA)

----

```ts
function addFoxOrHen(animals: Animal[]) {
  animals.push(Math.random() > 0.5 ? new Fox() : new Hen());
}

const henhouse: Hen[] = [new Hen()];
addFoxOrHen(henhouse); // oh no, a fox in the henhouse!
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAECCB2BLAtmE0DeBfAUD0kMAYgPYAe0ApmQC6XwAmMCKamO00iEpZAXNBoAnAK6VoAXkGjKAbg5cIACXoCAZmgjipGkFvm584KNBXwqtekzhJU6DAu691m7dF37Hy1dLGTfcji4aiLwwDSIJOZgDAy8APJCZgAUYLaaAix2ANoAugCU7JxprHoAdAAOIhAAFskAsmA0NWVCaQwkyMmFAHzQAAxlAKzQAPzQ8JQA7tC83dACkzMp+fkGeMBREDTQNfQ1JNWUAmZ5-tlLpvTdufIxceSJKXvwB0dr0AD0n9AkNRMkAA00DA7nIXHMzXELzeWgAhDggA)

----

```ts
function addFoxOrHen(animals: readonly Animal[]) {
  animals.push(Math.random() > 0.5 ? new Fox() : new Hen());
  //      ~~~~ Property 'push' does not exist on type 'readonly Animal[]'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAECCB2BLAtmE0DeBfAUD0kMAYgPYAe0ApmQC6XwAmMCKamO00iEpZAXNBoAnAK6VoAXkGjKAbg5cIACXoCAZmgjipGkFvm584KNBXwqtekzhJU6DAu691m7dF37Hy1dLGTfcji4aiLwwDSIJOZgDAy8APJCZgAUYLaaAkKUMVEgAJ42rCAA2gC6AJTsnGlFEAB0AA4iEAAWyQCyYDQtdUJpDCTIyZUAfNAADHUArNAA-NDwlADu0LzD0AKLKynl5fKcAPQHnCfQAH4XZ9AACkIkDZRCNAUA5E2tL9ADlDDwJDQWbgAqKCPIPaAvLI5eD5Qp2MovOpBHBAA)

----

```ts
function foxOrHen(): Animal {
  return Math.random() > 0.5 ? new Fox() : new Hen();
}

const henhouse: Hen[] = [new Hen(), foxOrHen()];
//                                  ~~~~~~~~~~ error, yay! Chickens are safe.
// Type 'Animal' is missing the following properties from type 'Hen': ...
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAECCB2BLAtmE0DeBfAUD0kMAYgPYAe0ApmQC6XwAmMCKamO00iEpZAXNBoAnAK6VoAXkGjKAbg5cIACXoCAZmgjipGkFvm584KNBXwqtekzhJU6DAu691m7dF37Hy1dLGTfcji4aiLwwDSIJOZq5ADyQmYAFACUAix27JxClDQiQuYAsmA0ABYAdEJgjCTIKdAAfNAADGUArNAA-NDwlADu0Lx1Aj39SckGeMBREDTQJfQlJCJaAmYA2gC6-msjpvQpADTucQn7yRvyAPSXnLd39w+PjwB+r2-vVEJCJEJHAJ5gP4AQmgAGESohgABregwMDZaAQMBqShlHDXaAAFT+AAdxABydJofGKaDIbgQRDwADmgnmxxAIBIvSptJx3zxQgilBgam+yEEuIJZnxAjK4pwQA)

----

```ts
interface FunFact {
  fact: string;
  author?: string;
}

function processFact(fact: FunFact, processor: (fact: FunFact) => void) {
  if (fact.author) {
    processor(fact);
    console.log(fact.author.blink());  // ok
    //               ^? (property) FunFact.author?: string
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAECCB2BLAtmE0DeBfAUD0kMAYgPYAe0ApmQC6XwAmMCKamO00iEpZAXNBoAnAK6VoAXkGjKAbg5cIACXoCAZmgjipGkFvm584KNBXwqtekzhJU6DAu691m7dF37Hy1dLGTfcji4iPB0QhrA4kQi8ERgwDTsnBE0AhDCIQDm8pxgIjQAFiRCAPxpGfDZQXhqMQmIJOYADkIkkVBxCQAUKQLRsfE0ADTQLW2UUMUCPYN9MZ00AJSSAHzQAG4kiAzLDpyIatAzCQB0eYXFuwqcY+0QxcdLOZzQwI33IJQnICSZj2f5IpCE4AIxAIQA1l1FotZJwAPTw6AkCHXaCIl6YrEvAB6JSOYyalCENAAnst+gsARdSuUhFkFLhcEA)

----

```ts
processFact(
  {fact: 'Peanuts are not actually nuts', author: 'Botanists'},
  f => delete f.author
);
// Type checks, but throws `Cannot read property 'blink' of undefined`.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAECCB2BLAtmE0DeBfAUD0kMAYgPYAe0ApmQC6XwAmMCKamO00iEpZAXNBoAnAK6VoAXkGjKAbg5cIACXoCAZmgjipGkFvm584KNBXwqtekzhJU6DAu691m7dF37Hy1dLGTfcji4iPB0QhrA4kQi8ERgwDTsnBE0AhDCIQDm8pxgIjQAFiRCAPxpGfDZQXhqMQmIJOYADkIkkVBxCQAUKQLRsfE0ADTQLW2UUMUCPYN9MZ00AJSSAHzQAG4kiAzLDpyIatAzCQB0eYXFuwqcY+0QxcdLOZzQwI33IJQnICSZj2f5IpCE4AIxAIQA1l1FotZJwAPTw6AkCHXaCIl6YrEvAB6JSOYyalCENAAnst+gsARdSuUhFkFLhcLcJjxBl0FBhetAAOQABUoYHg+RgYCE4ngJESgxEaBApOgwpoEB5I3OQIEPIAQlKhdxlTysEMFIcJGsGJRPnR3NSgThYTgMQAVUlE14FSjACEQEYg-KCAqtADuMAABgBhIWSxLisAMUatIkkhU8sGQnnIw4xC1qEKUBihk44IA)

----

```ts
interface Person {
  name: string;
}
interface PossiblyAgedPerson extends Person {
  age?: number;
}
const p1 = { name: "Serena", age: "42 years" };
const p2: Person = p1;
const p3: PossiblyAgedPerson = p2;
console.log(`${p3.name} is ${p3.age?.toFixed(1)} years old.`);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAECCB2BLAtmE0DeBfAUD0kMAYgPYAe0ApmQC6XwAmMCKamO00iEpZAXNBoAnAK6VoAXkGjKAbg5cIACXoCAZmgjipGkFvm584KNBXwqtekzhJU6DAu691m7dF37Hy1dLGTfcji4iPB0QhrA4kQi8ERgwDTsnBE0AhDCIQDm8pxgIjQAFiRCAPxpGfDZQXhqMQmIJOYADkIkkVBxCQAUKQLRsfE0ADTQLW2UUMUCPYN9MZ00AJSSAHzQAG4kiAzLDpyIatAzCQB0eYXFuwqcY+0QxcdLOZzQwI33IJQnICSZj2f5IpCE4AIxAIQA1l1FotZJwAPTw6AkCHXaCIl6YrEvAB6JSOYyalCENAAnst+gsARdSuUhFkFLhgqFiRFxAAFYn3cx7aDwMDISh0rIGHAhMJs6DskhQRBg0mwTKUBicoTcix0RgwVXq3lgJVlPkiZAg4mit7wdKjACM-gwfIFQugACIAMrE+hgZ0jfVO50AFgATNBSZQwGrndAsPILVamoGBDrGv4mtaY+9Ek0AMyJmUQOUgBVKlVc5NSePpy0kT7fX5dAAGABIMNmTvzBVhFNBm63fSUTjQSEREGRlV1rYtO6HwzBqwwTvXYTggA)
