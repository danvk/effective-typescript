# Item 82: Convert Module by Module Up Your Dependency Graph

## Things to Remember

- Start migration by adding `@types` for third-party modules and external API calls.
- Begin migrating your own modules from the bottom of the dependency graph upwards. The first module will usually be some sort of utility code. Consider visualizing the dependency graph to help you track progress.
- Resist the urge to refactor your code as you uncover odd designs. Keep a list of ideas for future refactors, but stay focused on TypeScript conversion.
- Be aware of common errors that come up during conversion. Move JSDoc types into TypeScript type annotations if necessary to avoid losing type safety as you convert.

## Code Samples

```ts
async function fetchTable() {
  const response = await fetch('/data');
  if (!response.ok) throw new Error('Failed to fetch!');
  return response.json();
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/IYZwngdgxgBAZgV2gFwJYHsLwKbKgCwBVgAjAG2wAoBKGAbwCgYYpMRkYAnbEABzewwAvDGAB3YKg5xcBSgHIA9ABNgyYPOoBuJjFRwYlAITc+AgHToA1rWT5O6MTAjYnAUU4POCgGKSKyjDI6Dh4+EaaOszcyAicWKb8ECDY5gBWIJg0OgC+DEA)

----

```ts
interface TabularData {
  columns: string[];
  rows: number[][];
}
async function fetchTable(): Promise<TabularData> {
  const response = await fetch('/data');
  if (!response.ok) throw new Error('Failed to fetch!');
  return response.json();
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCpwEYFcA2coAicYcyA3gFDLIID2OWAtiAM4BcyLYUoA5gNoBdANxVkUWgHd2yEEwzQhQ0QF8KcFgE8QCZDCw6wwWiD0QwCABboMOCAAoAlBwAKExsBYQAPDdz4iEgA+cjE6VjBxCBYABxMvZABeZDhJOGBImHMrewByAHoAE2I4XMdRamAYZHsAQihouNYIADpaAGtHZDBLCUlZCH6AUSgJKDyAMXS7Qu7aMwtLWrKKqLAsKFMG2PjWgCsWEydVCiA)

----

```ts
class Greeting {
  constructor(name) {
    this.greeting = 'Hello';
    //   ~~~~~~~~ Property 'greeting' does not exist on type 'Greeting'
    this.name = name;
    //   ~~~~ Property 'name' does not exist on type 'Greeting'
  }
  greet() {
    return `${this.greeting} ${this.name}`;
    //             ~~~~~~~~         ~~~~ Property ... does not exist
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/MYGwhgzhAEDiBOBTRAXAlgOwObQN4ChppgB7DCFeAV2BRPgAoMwBbRASj0KOhQAs0EAHRYkqTDgC80AOQAJRCBAkZAbm5EA9Jp4A-fQf3QACvBIAHRPBQBPWaOTpsM6ABMSiGBhIpoiAB6CvmS8NpayCI4SMhq8AsLMbNDSiYjqPNDaegYmZpbWdjKpLu6e0N6+AUHQIbbhMpHiztwAvtwOqAycBBlIKFTwGNAABgAkuPyCImJOWC3Q45MJrIgtw+k8WRnb2YZGO0SGuRZWttBCF24eXj5+gRSt+G1AA)

----

```ts
class Greeting {
  greeting: string;
  name: any;
  constructor(name) {
    this.greeting = 'Hello';
    this.name = name;
  }
  greet() {
    return `${this.greeting} ${this.name}`;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/MYGwhgzhAEDiBOBTRAXAlgOwObQN4ChposlVMsAuaCFecgbkOgzAFtEqwMBPRo4APYYa8AK7AUA+AAoW7AJR4mRFAAs0EAHQlk6bNAC80AOQAJRCBADjfItDUbNcxIeZtEtgL5MdqaYoI7aCQUUXgMaAADABJcBy1fPSxPaFj4p3dPSK98byA)

----

```ts
const state = {};
state.name = 'New York';
//    ~~~~ Property 'name' does not exist on type '{}'
state.capital = 'Albany';
//    ~~~~~~~ Property 'capital' does not exist on type '{}'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/MYewdgzgLgBNCGUCmMC8MDeBfA3AKAWQDox4BbFdAcgDkkB3GATRACcBrK-Aem5n5gA-YYJgAFViAAOSVlACeMKqQpUYAExBIIMMCFhIAHgEtoMcDAUyl2KgSiIkRYPCnGHAGzRKAgh4BG8GDyXHi8AkIiIuKSMnKKVC5unmqa2rr6MEamsBZWKFS2eEA)

----

```ts
const state = {
  name: 'New York',
  capital: 'Albany',
};  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/MYewdgzgLgBNCGUCmMC8MDeAoGMzwFskAuGAcgDkkB3GATRACcBrMgGhxmHgAcBLKPAA2pMgEEhAI3hgAnuywBfANy4A9GpgB5ANJYgA)

----

```ts
interface State {
  name: string;
  capital: string;
}
const state = {} as State;
state.name = 'New York';  // OK
state.capital = 'Albany';  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5EOAWwgC5kBnMKUAcwG59kE4AHYDAGwutpEa4AvrgQB7ENSoYsAXhxDkcSmhkQm1TBAB0RUsnkByAHIQA7sgCaYqAGtDDAgHonyAPIBpXJsjbWHbgNkQwBBLgAjOBAATwdnV09cIA)

----

```js
// @ts-check
/**
 * @param {number} num
 */
function double(num) {
  return 2 * num;
}

double('trouble');
//     ~~~~~~~~~
// Argument of type 'string' is not assignable to parameter of type 'number'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUMAVNjpsIAHAQwCcSBbUAbwDsBXSgI2TIF9RHL9tgMAZgzrxIASwD2dUABMJDZgBtkACm4BKWvlBlkkBmWkAmAlyYBuDOwwY5C5SoDkkMvKXJH6yyFC-fAP0CgoKwwAEEyAHMmZDpIUAkBUEgATyJkUEdoFzE6SMdQMWguCXiSaGgxSLoSd2SJUFIKSj02BKTU9MzuVjJHDCA)

----

```ts
/**
 * @param {number} num
 */
function double(num) {
  return 2 * num;
}

double('trouble');  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false&allowJs=true&noEmit=true#code/PQKhCgAIUgBAHAhgJ0QW0gbwHYFc0BGApsgL6R5pQjDgBmu2AxgC4CWA9tpACYe4EANkQAUlAJRYokZERa5k3AEzQK+ANzhS4cHwHCRAchbJ+QoofHrIkYMEgB5ANLggA)

----

```ts
function double(num: number) {
  return 2 * num;
}

double('trouble');
//     ~~~~~~~~~
// Argument of type 'string' is not assignable to parameter of type 'number'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&noImplicitAny=false&strictNullChecks=false&allowJs=true&noEmit=true#code/GYVwdgxgLglg9mABAEziARgGwKYAowgC2AXIgYetgE4CUiA3gFCKJXZQhVIBMiAVGSIBuRgF9GjVBhy4A5FCpos2WTREB6dS20A-Pfv2NNiAIJUA5kWxgoiOMERQAngAdsiWQGcFMMOdmIMJ5kcLYAhp6eMOZgYcqOcIguYVRhhOzUdg7Obh7klFSyjEA)
