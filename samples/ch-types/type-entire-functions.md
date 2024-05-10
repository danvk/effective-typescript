# Item 12: Apply Types to Entire Function Expressions When Possible

## Things to Remember

- Consider applying type annotations to entire function expressions, rather than to their parameters and return type.
- If you're writing the same type signature repeatedly, factor out a function type or look for an existing one.
- If you're a library author, provide types for common callbacks.
- Use `typeof fn` to match the signature of another function, or `Parameters` and a rest parameter if you need to change the return type.


## Code Samples

```ts
function rollDice1(sides: number): number { /* ... */ }  // Statement
const rollDice2 = function(sides: number): number { /* ... */ };  // Expression
const rollDice3 = (sides: number): number => { /* ... */ };  // Also expression
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAJzgGzQERhApgRgAoBnGAE12IC5EwQBbAI12QEoa6mXEBvRAegBUiAMIB5ALIAFAEoBRAMoLEg-ilxQQyJAAYA3AOFyAcphVqAvogFqFUAIZRc9XGCgAoCAmJQU6LDi4AEyIALyIoJCwCCTklBwMzGwJXMi8hqKSsorKquqa2oj6GSZmeRYGNohyAB4ADsiUpAie3r6oGNh4AMxhiLEU1LSJLOzDqWEAfOlCmdLySub5WroGs6VLFdb8agCCaMRwiLj1jcTNYO7uQA)

----

```ts
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = sides => { /* ... */ };
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAIglgYwgJQPYBt0DEB2UC8UAFAM5wAmEJAXFDgK4C2ARhAE4CUBAfHU62wDcAKASocJYFDYZ08JLXkpZuAlDKUSPKAG8oAegBUUAMIB5ALIAFZAFEAyvaiH90iMHps8ABkEHjtgByMM6uAL4iwkA)

----

```ts
function add(a: number, b: number) { return a + b; }
function sub(a: number, b: number) { return a - b; }
function mul(a: number, b: number) { return a * b; }
function div(a: number, b: number) { return a / b; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoBTIFyLCAWwCMBTAJwBpEjd9jyBKRAb0TJKhDKWUQGpqAbkQBfAFChIsBIgDOIIllqFSlasvpkmrdp24pEAWiGiJ4aPCQEQAGyV4V5KjQebtbDlx6IAVCfGSFjKoMABu9nSqzhqq7rpeBgD0-mJAA)

----

```ts
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAQglgOwIYCcQDEFQLxQBRIBcUCArgLYBGEKANFJcWVTQJQ4B8JF1KA3ACgAxgHsEAZ2BQkAExnF4yNJhz4k9Su2xckUANQNBoiVPGlGsRKgxZcBDVp1QAtIeFjJUcqQA2Cq8q2ag6c0lAAVG7GnjJwAG7+Sjaq9gyOYQD0bkA)

----

```ts
const response = fetch('/quote?by=Mark+Twain');
//    ^? const response: Promise<Response>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBATgUwgB3BBMC8MBmCrAAWAFAOQD0AjgK4hQID8ARgJ6YCyAhnANYDUAFQDunAJZhSASgDcAKHLkYSmAD0GMUJFiIUaBAC4YABTggAtqPQAeAEpJUkBAD5ZQA)

----

```ts
async function getQuote() {
  const response = await fetch('/quote?by=Mark+Twain');
  const quote = await response.json();
  return quote;
}
// {
//   "quote": "If you tell the truth, you don't have to remember anything.",
//   "source": "notebook",
//   "date": "1894"
// }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/IYZwngdgxgBAZgV2gFwJYHsIwOYFNkCKC6yuAFAJQwDeAUDDFJiMjAE64gAOzuMAvDGAB3YKlZx8UABZkA5AHoAjsVIB+AEZh+AWWBsA1gGoAKqNQQ5FANz1GzVipJ9BIsaw7deAOgBWITEpbBg5kBDYsJ1JbAF9aBQUaeMSGACIo3FSALhhUgEk4GDB0BBhSABtysuk+ZDYEZGkAGiKSmAATTDlWaWAAN1r0dlwAW1GNXDYhCDBGi2xvVKbkhlyA8KhMnNSIZw10dAMllbT24FJs3IBGAA4ATgAWVJW4oA)

----

```ts
declare function fetch(
  input: RequestInfo, init?: RequestInit,
): Promise<Response>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtVJAzAAsAKAKHni1QAdkMAueAJRAEdkQBnDASVSIcAGmqosGAPzM2nHv3EZh5AJTMACjBwBbLNxAAeNt1p59APgDc5IA)

----

```ts
async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    // An exception becomes a rejected Promise in an async function.
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/IYZwngdgxgBAZgV2gFwJYHsIygCwKZQDWeAJgGJ7K4AUqEADgsgFwwBKeAjgniMgJIQ46ADQw6qZAH5WHbrwERJAShgBvAFAxsmPjABOverrwwAvDGAB3YJPiUadRsjETkygNxbxcGNQCEhiDGECB4AHTohKqa2toA9PEwAIJYeAAeUHj0aJgwAEYE6AC2vJYGeABWBMikMAAK+iWoYeJYwO3g0PBIULkQ4d7ayDhNVjAQeOMAovpN+tQABnI8enC2ADakrAAkakEhYeF8wMgIIAC+i57eF96GZ-pYByZed0A)

----

```ts
const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMAWBTYBrRATAYoqCBcMUAngA6IgBmMFOCMAvDAIYRFjAwAUAlmCQK5QANDF7coASgYA+GAG8AUDDjhoMAE6IIJVYgbMA7k3HVa8Hn0EixkgNxLRVTgEJN23QDoQKKYuXKoeHUQAxgwRFCAUXVg9U4AAwAlRABHfi1YCmMAGwwCABI5Nx1IRA9oJih+CABfeIl7ZRqHTSr1MA0tEohEe2agA)

----

```ts
const checkedFetch: typeof fetch = async (input, init) => {
  //  ~~~~~~~~~~~~
  //  'Promise<Response | HTTPError>' is not assignable to 'Promise<Response>'
  //    Type 'Response | HTTPError' is not assignable to type 'Response'
  const response = await fetch(input, init);
  if (!response.ok) {
    return new Error('Request failed: ' + response.status);
  }
  return response;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMAWBTYBrRATAYoqCBcMUAngA6IgBmMFOCMAvDAIYRFjAwAUAlmCQK5QANDF7coASgYA+GAG8AUDBgB6FcoB+W7Tq1LV6mAHIACgCcQAW24REAHgBKiCCXC2YAHxgAJACq+TAFEzCzNpI1EIGDAQWBYIbgBzMCYAIwAbREIQY3MrG3snFzdEcP01ZWVfUiyjItdILK8-AODQiJto2OYIBOS0zOzCGuN6kqN9UEhYM2cG90YmAHcmcWpaeB4+QRExSQBufW4qTgBCWeLGgDoQFClFSphZqH4zMGjEJZg2kDNOOsQAEd+M5YBRVpl0AQIgBqJ5zEpXaBMF4QCSHZQAX30z1e7wu80Qh2xQA)

----

```ts
async function fetchANumber(
    ...args: Parameters<typeof fetch>
): Promise<number> {
  const response = await checkedFetch(...args);
  const num = Number(await response.text());
  if (isNaN(num)) {
    throw new Error(`Response was not a number.`);
  }
  return num;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMAWBTYBrRATAYoqCBcMUAngA6IgBmMFOCMAvDAIYRFjAwAUAlmCQK5QANDF7coASgYA+GAG8AUDBgB6FcoB+W7Tq1LV6mAHIACgCcQAW24REAHgBKiCCXC2YAHxgAJACq+TAFEzCzNpI1EIGDAQWBYIbgBzMCYAIwAbREIQY3MrG3snFzdEcP01ZWVfUiyjItdILK8-AODQiJto2OYIBOS0zOzCGuN6kqN9UEhYM2cG90YmAHcmcWpaeB4+QRExSQBufW4qTgBCWeLGgDoQFClFSphZqH4zMGjEJZg2kDNOOsQAEd+M5YBRVpl0AQIgBqJ5zEpXaBMF4QCSHZQAX30z1e7wu80Qh2xLDYHAo-HYUG44HWuHgAEEAHL8SypRB-fTKK48phmRIQAgmPlMSw4DkQOzEMiUOkIaQKCRCizWWx2MCs9lheSTNwzBGNBjMFZrBDINBYDacHlXPkC9G66bRVlGllsjmcZarfWXWxXKCIAAeUE4EgdymOXBsTKYTM4GssYZ1jyg8AsXzAn2+IV+nAABmNDSsojE4s73WYrnnwzBscpcW9y8SFEA)

----

```ts
fetchANumber
// ^? function fetchANumber(
//      input: RequestInfo | URL, init?: RequestInit | undefined
//    ): Promise<number>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMAWBTYBrRATAYoqCBcMUAngA6IgBmMFOCMAvDAIYRFjAwAUAlmCQK5QANDF7coASgYA+GAG8AUDBgB6FcoB+W7Tq1LV6mAHIACgCcQAW24REAHgBKiCCXC2YAHxgAJACq+TAFEzCzNpI1EIGDAQWBYIbgBzMCYAIwAbREIQY3MrG3snFzdEcP01ZWVfUiyjItdILK8-AODQiJto2OYIBOS0zOzCGuN6kqN9UEhYM2cG90YmAHcmcWpaeB4+QRExSQBufW4qTgBCWeLGgDoQFClFSphZqH4zMGjEJZg2kDNOOsQAEd+M5YBRVpl0AQIgBqJ5zEpXaBMF4QCSHZQAX30z1e7wu80Qh2xLDYHAo-HYUG44HWuHgAEEAHL8SypRB-fTKK48phmRIQAgmPlMSw4DkQOzEMiUOkIaQKCRCizWWx2MCs9lheSTNwzBGNBjMFZrBDINBYDacHlXPkC9G66bRVlGllsjmcZarfWXWxXKCIAAeUE4EgdymOXBsTKYTM4GssYZ1jyg8AsXzAn2+IV+nAABmNDSsojE4s73WYrnnwzBscpcW9y8SFDR6czNRyFBUAHoAfmolOA1NprYQ7YrnC7hkevAEUAITmBoIAkmAKDkvABVBwAGV2YHEvYXQJB0FXay8lPQiAovAwU8eSpgeVV9gTWoVQA)
