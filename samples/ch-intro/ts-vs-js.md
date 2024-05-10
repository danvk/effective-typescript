# Item 1: Understand the Relationship Between TypeScript and JavaScript

## Things to Remember

- TypeScript is a superset of JavaScript: all JavaScript programs are syntactically valid TypeScript programs, but not all TypeScript programs are valid JavaScript programs.
- TypeScript adds a static type system that models JavaScript's runtime behavior and tries to spot code that will throw exceptions at runtime.
- It is possible for code to pass the type checker but still throw at runtime.
- TypeScript disallows some legal but questionable JavaScript constructs such as calling functions with the wrong number of arguments.
- Type annotations tell TypeScript your intent and help it distinguish correct and incorrect code.



## Code Samples

```ts
function greet(who: string) {
  console.log('Hello', who);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwE4FN1QBQHcAWcAXIgM5SoxjICUiA3gFCKIQKlwA26AdJ3MmwByABLpO-IQBpEBODQDcjAL6MgA)

----

```js
let city = 'new york city';
console.log(city.toUppercase());
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/DYUwLgBAxglmCeEC8EDkA7EB3C8D2ATgNbRzyoDcAUFHugM56gB0weA5gBSwLNh4BVAA5CQBKAEN6ITgEpZ1IA)

----

```ts
let city = 'new york city';
console.log(city.toUppercase());
//               ~~~~~~~~~~~ Property 'toUppercase' does not exist on type
//                           'string'. Did you mean 'toUpperCase'?
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/DYUwLgBAxglmCeEC8EDkA7EB3C8D2ATgNbRzyoDcAUFHugM56gB0weA5gBSwLNh4BVAA5CQBKAEN6ITgEpZ1APSKIqteo0A-bTt2aIABQJ5RBBGn7DTk6aggATPCHoR0eSCAAeMepDoQEUSplDVCw8LRfAhh0dlRmCAARGHtcPABXCABbEAl0C0ERMQBhKRBUAH4qIA)

----

```js
const states = [
  {name: 'Alabama', capital: 'Montgomery'},
  {name: 'Alaska',  capital: 'Juneau'},
  {name: 'Arizona', capital: 'Phoenix'},
  // ...
];
for (const state of states) {
  console.log(state.capitol);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBNCGUCmEYF4YG0BQMYG8x4BbJALhgHIBBAG3gCMT5KAaGYeABwEsp5aFSgFlwUAOYhSAJwCelAL6tcBIqSF14EANYt2HbnwFCAUgFcwSeGcXK8hEuSrVpPAF7g9B3v0FUACgAWIEhgPAAetioA9NEwAHSJ2AC6ANzYAGYg0jAAFKCQsAjIMCAZcPzIEACUBCoFECC0SPG0IOK5xS2cPk3V6QrYQA)

----

```ts
for (const state of states) {
  console.log(state.capitol);
  //                ~~~~~~~ Property 'capitol' does not exist on type
  //                        '{ name: string; capital: string; }'.
  //                        Did you mean 'capital'?
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBAbwL4G4BQBjCA7AzvfAQxmFzgF44BtNORbQgW2AC44ByAQQBtCAjJoXYAaOBkJgAljELc27ALI4YAcwjMoAT3ZJhtek1YcehXAGshosROmz5AKQCu2YIUc69dBA2bzOUSQAvHEtrKRk5DgAFAAsIYGxJEA99AHpUuAA6bLQAXXQAM2g4AAosPAIZEjgIArgiElwASkR9ctwIbmBM7ggVEobu8XDOpvQ6dLop6Zm6AD8Fxbm4KKgIMGBYTQ5h6U72OAATeLJsCHhQSXwa7DgYTQ20jNmX17p2BDgfI3wA7BUUGFbJFfpJ-oCkOxMk83rCZgARSSHOCaCCOODMQi3di7CLsAD8aCQaCAA)

----

```ts
const states = [
  {name: 'Alabama', capitol: 'Montgomery'},
  {name: 'Alaska',  capitol: 'Juneau'},
  {name: 'Arizona', capitol: 'Phoenix'},
  // ...
];
for (const state of states) {
  console.log(state.capital);
  //                ~~~~~~~ Property 'capital' does not exist on type
  //                        '{ name: string; capitol: string; }'.
  //                        Did you mean 'capitol'?
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBNCGUCmEYF4YG0BQMYG8x4BbJALhgHIBBAG3gCMT5KAaGYeABwEsoRaFSgFlwUAOYhSAJwCelAL6tcBIqSF14EANYt2HbnwFCAUgFcwSeGcXK8hEuSrVpPAF7g9B3v0FUACgAWIEhgPAAetioA9NEwAHSJ2AC6ANzYAGYg0jAAFKCQsAjIMCAZcFCIKACUBCoFEAJI8bQg4rnFzZw+8LTV6XixeMMjo3gAfpNT4zD+0iBcSNJQslTdfL2UMAAmIahgILBI4TzQpWAwK4sxcWN393iU+DBqTtCuYOKp3kZ+7zyfb4KSjxG4PcGjAAiPG2MFkIDMMFI8AulHWvkoAH5sApsEA)

----

```ts
interface State {
  name: string;
  capital: string;
}
const states: State[] = [
  {name: 'Alabama', capitol: 'Montgomery'},
  //                ~~~~~~~
  {name: 'Alaska',  capitol: 'Juneau'},
  //                ~~~~~~~
  {name: 'Arizona', capitol: 'Phoenix'},
  //                ~~~~~~~ Object literal may only specify known properties,
  //                        but 'capitol' does not exist in type 'State'.
  //                        Did you mean to write 'capital'?
  // ...
];
for (const state of states) {
  console.log(state.capital);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5EOAWwgC5kBnMKUAcwG59kE4AHYDAGwutpEa4AvrgQB7ENSoZIlCukwQA2gF1kAXmRLm2IqQoByAIJc4AIxJwDAGhbtOYnsgMBZCWDpjSUAJ4Gh1swA9EEEYeERBAB+MbFROnrkziZwlADWVrZ2HGCOhgBSAK4gEHCF-oEEIZE1YXGxCSRJxrQAXhKZ2Q5OBgAKABZiECDAAB4VwaG1NfUxyADyZgBWEAhgyFyc0HBcyMRwPsgSXIeUbKvAMIdpIGIA7iDIbFBi51BgwBCUlcjV0--hMyFdYGVg5RwGZAAEyGlEIYnWEFGwCkoGQYB852cCkgBgAdJMAUTkAARYBQ5A+MSFPalR65ZB3WhYUH2bgGAD8hLxPNwKiYMDEUGQAApxJJ1tRFEcYNJFJQAJQ4ZjiyiOCB4rhiOgiqWQPFgzg7BVMERAA)

----

```ts
const states: State[] = [
  {name: 'Alabama', capital: 'Montgomery'},
  {name: 'Alaska',  capitol: 'Juneau'},
  //                ~~~~~~~ Did you mean to write 'capital'?
  {name: 'Arizona', capital: 'Phoenix'},
  // ...
];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5EOAWwgC5kBnMKUAcwG59kE4AHYDAGwutpEa4AvrgQB7ENSoZIlCukwQA2gF1kAXmRLm2IqQoByAIJc4AIxJwDAGhbtOcHsgMBZCWDpjSUAJ4Gh1jp65M4mcJQA1la2dhxgYk4GAFIAriAQcCn+gQQA9LkEhUXFBAB+5RWlyAAiwAAmyD5iKcikcCDI8cgA7rRYBqxxjgYA-EEkIca0AF4S0bEOiQAKABZiECDAAB7ZzPnIAHRHuCpMQA)

----

```ts
const x = 2 + '3';  // OK
//    ^? const x: string
const y = '2' + 3;  // OK
//    ^? const y: string
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAHjAvDATDA1DA5AZiwbhhgHpiYB5AaQChSiiA9AfhlEljgC4ZoAnASzABzam2gwAnkmwosGGDkIkyVWmXrNW4cRO59BIoA)

----

```ts
const a = null + 7;  // Evaluates to 7 in JS
//        ~~~~ The value 'null' cannot be used here.
const b = [] + 12;  // Evaluates to '12' in JS
//        ~~~~~~~ Operator '+' cannot be applied to types ...
alert('Hello', 'TypeScript');  // alerts "Hello"
//             ~~~~~~~~~~~~ Expected 0-1 arguments, but got 2
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAhjAvDMBXANumBqGB2AbhhgHoSYBRANznVTigFMIYoR8YBLMGAKQGUAUGWKjRAP0niYAFQAWjGDTqKA5GkyqYwOGDAhYAI0WoIjACYwFAJ0YA6QaEhGkMANoBdHDACMAJiJScmpaeiYWNhhVfy1uPiERMQkpKRgAeQAHRmsGEGso7C0dPQMYY3gMjPROC1Z2KABPLJY7VsFabKgAClUACUZMEFUAGiiZJsZ+YGtODKhVAEpAkQ7rKBYAIn7BjeFyJIOYFOPUigAPLOAmSwAGAFofeGsAc1QAW0YwddHDVFhn0p+QRAA)

----

```ts
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBGCGBbAphGBeGBtA5AQQBsBLYZHAGhhwCEQAjHAXQG4AoUSEA5AOgJADmACgQoIWAEyMeUEAFUADguQAnAMLwIyIQEodbIA)
