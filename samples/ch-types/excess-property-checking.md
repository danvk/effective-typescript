# Item 11: Distinguish Excess Property Checking from Type Checking

## Things to Remember

- When you assign an object literal to a variable with a known type or pass it as an argument to a function, it undergoes excess property checking.
- Excess property checking is an effective way to find errors, but it is distinct from the usual structural assignability checks done by the TypeScript type checker. Conflating these processes will make it harder for you to build a mental model of assignability. TypeScript types are not "closed" (pass:[<a href="#structural">Item 4</a>]).
- Be aware of the limits of excess property checking: introducing an intermediate variable will remove these checks.
- A "weak type" is an object type with only optional properties. For these types, assignability checks require at least one matching property.


## Code Samples

```ts
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
// ~~~~~~~ Object literal may only specify known properties,
//         and 'elephant' does not exist in type 'Room'
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvgToQ1MMij0M2ZAF487GZXQ16ARgA07TjxAChoiVOTmADNaIQuEAA4i4cHoAcl8oCGoIcGDrAHpY5AA-ZJTE5AB5RgArCAQNHkgoOC5kLDgAT2RVLkrqX1zgGEqAaxB0AHcQZDD0eqgwYAi4hKJR0cCAE2Rg7z8A6OQJ9AjidA0IAA9gdWRQZDBy+umdLGD8BTYgA)

----

```ts
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
};
const r: Room = obj;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvgToQ1MMnSMAVsgC8edjMroa9AIwAadpx4gBQ0RKnJzABmtEIXCAAcRcOD0AOS+UBDUEODB1gpsKmoaUPQY2PqaOixEAPTZyADyANL4QA)

----

```ts
interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow(options: Options) {
  if (options.darkMode) {
    setDarkMode();
  }
  // ...
}
createWindow({
  title: 'Spider Solitaire',
  darkmode: true
// ~~~~~~~ Object literal may only specify known properties,
//         but 'darkmode' does not exist in type 'Options'.
//         Did you mean to write 'darkMode'?
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvhgkQCMMHQhk1CGHJwoAawCy6ACYQAFAEo8S0JFiIUAeQAOGrdTzsNYLgh6ajAoPjYic0NTCwgAfnpGTEC4EEVlVXVNbQQoCDhIAHVQc3QAdyt0T2y6ZA8vEGo7AiJgGGRK6u8AOijjM0tm9iJdfWiB6xsI5CUiAHo55G7l-CVc-KKS8qsW5H9A+gByAGV3YEsoZGP0HjA4YDzDgBp2PqMsWPpQkgh8BeQAH5A4EAuqMABWEHUyFu0DgXGQWDgAE9kFouKjqO4oW1UUYQOVtO4oFVoBoINQXv8iDSaYwSGBkIc3h9LIdkKUKcR0IyIAAPYAhZCgPbI7FM+o1Q7dP6LWm08jnZDI9AkRH5bRgdDIMphSBMt4TQ5xVZTfBAA)

----

```ts
const o1: Options = document;  // OK
const o2: Options = new HTMLAnchorElement();  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvhgkQCMMHQhk1CGHJwoAawCy6ACYQAFAEo8S0JFiIUAeQAOGrdTzsNYLgh6ajAoPjYic0NTCwgAfnpGTEC4EEV8BG8wZHQARnoPLxAfAF5kc3QEMghwFiIAenrkVwBpDKycgCYCz01i5DKQCAB3ZH4AFRMAGQBBNRF0KABRQKwasFs65EbmtqA)

----

```ts
const o: Options = { darkmode: true, title: 'Ski Free' };
                  // ~~~~~~~~ 'darkmode' does not exist in type 'Options'...
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvhgkQCMMHQhk1CGHJwoAawCy6ACYQAFAEo8S0JFiIUAeQAOGrdTzsNYLgh6ajAoPjYic0NTCwgAfnpGTEC4EEV8BG8wZHR6Dy8QHwBePGQo4yxY+lCSCAAaZH9A+gByAGUjYGRxKAgIFuQFCKIR0bGRgHoJ5AA-Ofm55Bbyo0rLAfN0CB8QdGyIAA9gEORQRoBPdxQW-M1CloA6J-wgA)

----

```ts
const intermediate = { darkmode: true, title: 'Ski Free' };
const o: Options = intermediate;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvhgkQCMMHQhk1CGHJwoAawCy6ACYQAFAEo8S0JFiIUAeQAOGrdTzsNYLgh6ajAoPjYic0NTCwgAfnpGTEC4EEV8BG8wZEdoLAhzYDhIZABePGQo4yxY+lCSCAAaZH9A+gByAGUjYGRxKAgIduQFNkyQEOR0eg8vCbKc8DyCosgWIgB6DeRXAGl8IA)

----

```ts
const o = { darkmode: true, title: 'MS Hearts' } as Options;  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHt0FtkG8BQyyIArlgCKZQDOAXMWQEbQDchySwANqAOYASEYLwAWYAGJh6pLMyhsAvvhgkQCMMHQhk1CGHJwoAawCy6ACYQAFAEo8S0JFiIUAeQAOGrdTzsNYLgh6ajAoPjYic0NTCwgAfnpGTEC4EEV8BG8wZHRkAF48ZCjjLFj6UJIIABpkf0D6AHITAGVkQUMwagbkBWQ4Hw8vEGoWIgB6MeRXAGl8IA)

----

```ts
interface Options {
  darkMode?: boolean;
  [otherOptions: string]: unknown;
}
const o: Options = { darkmode: true };  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgPIAczAPYgM7IDeAUMsgCZxQDWAstuRAPwBcyARttgDYRwgBuUsgDa2MAAtoGLLjxs8YKKADmAXTYBXENRDYA7oOIBfYgjlhk2NjJz5kAXiIUq1ALYMIbJZpTGBZAD0gWgA0sRAA)

----

```ts
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
function setOptions(options: LineChartOptions) { /* ... */ }

const opts = { logScale: true };
setOptions(opts);
//         ~~~~ Type '{ logScale: boolean; }' has no properties in common
//              with type 'LineChartOptions'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDKggYQBZymAeQAcxgB7EAZ2QG8AoZZAGzIHNKE4mIB+ALmQAjMmW5wQAbgbJQAN2iQAJgE0AggA9glfkJFjJ0vBDg48YHcNHGDAXzowAriASkKyShEIlyVABRlvCkoBdBAsXHxiVyoASlpkAHoAKmQAOnTkJITkOzoEILBkALBqAF54llYAZU5uATAoBxQbKQ8vaMp-EkoYqQTsxkHBgD9R4eQAFQBPIhQAchpmNhquCAFLfQkcueRcahAyZCIoAIVgCGpQZHyAWxuKOn6h5+eAd2AwbGQwGfnQ8LMUR8lDmdCAA)
