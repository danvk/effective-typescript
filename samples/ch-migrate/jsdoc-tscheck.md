# Item 80: Use @ts-check and JSDoc to Experiment with TypeScript

## Things to Remember

- Add "`// @ts-check`" to the top of a JavaScript file to enable type checking without converting to TypeScript.
- Recognize common errors. Know how to declare globals and add type declarations for third-party libraries.
- Use JSDoc annotations for type assertions and better type inference.
- Don't spend too much time getting your code perfectly typed with JSDoc. Remember that the goal is to convert to _.ts_!

## Code Samples

```js
// @ts-check
const person = {first: 'Grace', last: 'Hopper'};
2 * person.first
//  ~~~~~~~~~~~~ The right-hand side of an arithmetic operation must be of type
//               'any', 'number', 'bigint' or an enum type
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUPA9gO2pKAA7IBO0eoAvKAN4BmAluZAFygDkA4qQIbzIOAGlAAbXgXYcAEtiIlSHAL4BuDACZQAKmJkKuAHRMWGEKFAA-K9ZtXQAFRShSjAOaJIsRL1wATUNCMvsig2PSgPhEukIgAtsiQjPChCryJlLEArgSgAEYhYaCQAJ4kpmDmlVXVHD7Fwpy4mbH5iiIcuW6MuJAcoaQRuKDITbFFpcgYQA)

----

```js
// @ts-check
console.log(user.firstName);
//          ~~~~ Cannot find name 'user'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUPA9gO2tgDbIB0h2A5gBQCu0yATiQGYCWD0kAcgIYC2yAJQBuDCFATJUgH6zpoAMI9cubJFBtcAE1C5+yUAHI6jQxiA)

----

```ts
interface UserData {
  firstName: string;
  lastName: string;
}
declare let user: UserData;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&allowJs=true&noEmit=true#code/JYOwLgpgTgZghgYwgAgKoGdoBE5jsgbwChlkZgp0wA5OAWwgC5kqpQBzAbhOQBs4qtBs1YduAXyIATCAn5QUvCGGQBXTFGYZsuONyA)

----

```js
// @ts-check
$('#graph').style({'width': '100px', 'height': '100px'});
// Error: Cannot find name '$'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUAEgBQHIBiAcwCcBDAB0TwEoA6aSATwBtkcBvPAdwEsATSNQBcoPAEYADJIoAPPABoxKXkUSQ8oidLl4AvjQDcGEKACiJEgHsSogMJkAdo6uRQAM16P+oR2QC2yGJYeBhAA)

----

```js
// @ts-check
$('#graph').style({'width': '100px', 'height': '100px'});
//          ~~~~~ Property 'style' does not exist on type 'JQuery<HTMLElement>'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUAEgBQHIBiAcwCcBDAB0TwEoA6aSATwBtkcBvPAdwEsATSNQBcoPAEYADJIoAPPABoxKXkUSQ8oidLl4AvjQDcGEKDPmLAP2vXQABRIB7CshLMxjVsjyh+j5NCgAHaOkKDIsryMoI5BoMwuYgBSAIoArq5MADwAEgAqALIAMgCibAC2yEGQAHx4GEA)

----

```js
// @ts-check
const ageEl = document.getElementById('age');
ageEl.value = '12';
//    ~~~~~ Property 'value' does not exist on type 'HTMLElement'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUPA9gO2pKAIYDmyAogDagC8oAJtvAK4C2yukAdGZFcu04AhAJ4BJegAoA5KWTSAlAG4McqlwBuRSs2S1Q0gIwAmaSpChLoAH63boAAoAnbAAdkTyCINad8htjI0KC42ITIAB4AlgSgeKBe7gYAEgAqALIAMvyCkNIYQA)

----

```js
// @ts-check
const ageEl = /** @type {HTMLInputElement} */(document.getElementById('age'));
ageEl.value = '12';  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUPA9gO2pKAIYDmyAogDagC8owAVAxJAJ4AOyoA3gBIAqAWQAyASVzsArpCrIAtslyQAvqAbAAFABNs8SQqUA6MjMrzFkAEKtRWjQHJSyewEoXAbgxOqhgG5FKSS46ewBGACZ7d1B6MAB5AGkMIA)

----

```js
// @ts-check
/**
 * Gets the size (in pixels) of an element.
 * @param {Node} el The element
 * @return {{w: number, h: number}} The size
 */
function getSize(el) {
  const bounds = el.getBoundingClientRect();
  //                ~~~~~~~~~~~~~~~~~~~~~
  //     Property 'getBoundingClientRect' does not exist on type 'Node'
  return {width: bounds.width, height: bounds.height};
  //      ~~~~~ Type '{ width: any; height: any; }' is not
  //            assignable to type '{ w: number; h: number; }'
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUMAVNjptQBxZGUSFUaASwC9lQAKagO1AAdqAPZAG2gCUoAPYAzUAEM2fZAFtkLSADp8hcOwkAnCbNABvAHLCAJsgC+oPqAAqlGfMWqIm0gFdNbPXoDuALlAsrrIARsiaADSgiP6BIWFmFrYMNPSqwBiirizwkNTCbADmpADKdMiMfEJ6+KDw+dCQoMHCWcbQoAC8lrxKRZAAQi0sxqwFAMK81AqQAEqokIwCANw1IKDrG5tboAB+e-sHh0erYJsACprC7GGQAJ6gAOR9g62jE1OKczkPoMbCyO0WMJGsguNQGiI2Hdro8jKYHjUXJB3J5vNRjBR-M1WtAlGiMYhIihqAVEJAsUM2kpiaTIGYVus1ltDjZbjCHnpQPjMZIWLcllFkCSyf4pPzQGYfuCAsCTttthJoDQCiwJMFeAxIMJyGyGByuTEgqFNALogEjWEBZKMGYMEA)

----

```js
// @ts-check
/**
 * @param {number} val
 */
function double(val) {
  return 2 * val;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false&allowJs=true&noEmit=true#code/PTAEAEBcGcFoGMAWBTeBrAUMAVNjpsIAHAQwCcSBbUAbwDsBXSgI2TIF9QA3EgG32zAMAMwZ14kAJYB7OqAAm0hs17IAFD14BKWvlBlkkBmTkAmAtz4BuDOwxA)

----

```ts
function loadData(data) {
  data.files.forEach(async file => {
    // ...
  });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false&allowJs=true&noEmit=true&noImplicitAny=false#code/GYVwdgxgLglg9mABAGzgQwCYBE1TQCg1zQEpEBvAKEUSLwDpgZkBTAZ0bgCcBRNCABb40bAJ6RETVogC8APgrUaiAPQrE9TUoC+JANyVtlIA)

----

```ts
/**
 * @param {{
 *  files: { forEach: (arg0: (file: any) => Promise<void>) => void; };
 * }} data
 */
function loadData(data) {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&strictNullChecks=false&allowJs=true&noEmit=true&noImplicitAny=false#code/PQKhCgAIUgBAHAhgJ0QW0gb01GkBmAlgDYCmAzgFxYED2yAoogMYAW1AFCgOYAMnRMtUQA7AJ4BKSAF4AfJAAKyWmkLlSAHgButQgBNZUuZB36A3JAC+Z3FcuQ9iAC6JcwcPgCuI5k8K0RSGJaRD0AEWdEDkcXKRxISGBgSAA6NPBLcCA)
