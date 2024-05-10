# Item 59: Use Never Types to Perform Exhaustiveness Checking

## Things to Remember

- Use an assignment to the `never` type to ensure that all possible values of a type are handled (an "exhaustiveness check").
- Add a return type annotation to functions that return from multiple branches. You may still want an explicit exhaustiveness check, however.
- Consider using template literal types to ensure that every combination of two or more types is handled.

## Code Samples

```ts
type Coord = [x: number, y: number];
interface Box {
  type: 'box';
  topLeft: Coord;
  size: Coord;
}
interface Circle {
  type: 'circle';
  center: Coord;
  radius: number;
}
type Shape = Box | Circle;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI5s8tAAygAW-JDoUGISAD6wYb7sQA)

----

```ts
function drawShape(shape: Shape, context: CanvasRenderingContext2D) {
  switch (shape.type) {
    case 'box':
      context.rect(...shape.topLeft, ...shape.size);
      break;
    case 'circle':
      context.arc(...shape.center, shape.radius, 0, 2 * Math.PI);
      break;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI5s8tAAygAW-JDoUGISAD6wYb7svEQEgsAccARQyEkA7kUlEAAUZsUKUL2QNIJtPNgGsPwEAG78ZgBKEATIlFwA5vAuMwBMACIAlFJRZl0cwIKFUIPDEAB0eWf+stHL0MqquFEf0SmEBmT0QEGa-SeUKGfReWl0+hoUKeMMgKKsEBOpgBZDB-AA1tjPmZvqEvL5FH8AbJJvtgE9+F5IdDHk8YjxqOZWUkUmkaAAGGgHKAAKigAFl+MBCk8AAoASSx-w+uIgBNMTicQA)

----

```ts
interface Line {
  type: 'line';
  start: Coord;
  end: Coord;
}
type Shape = Box | Circle | Line;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7EA)

----

```ts
function processShape(shape: Shape) {
  switch (shape.type) {
    case 'box': break;
    case 'circle': break;
    case 'line': break;
    default:
      shape
      // ^? (parameter) shape: never
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUMhJAO5DIxAAFGbDCgMXEDSC2zzYTTD8BABu-GYASu3IlFwA5vAXI8AEwAEQAlFIomZ9hxgIJBlAztcAHTlKH+WTRD7QZSqXBRbHRe4QR6oxAQDYnVG087HdFaXT6Gi01H0yDsqwQCGmYlkSn8ADWfJxZjxoS8vkUhOJsjuwOAqIaghpdLRMTyNA5EApyVSZhoAAYaCCoAAqKAAWX4wEGqIACgBJXlE7ECiDC0xOJyrdabbZQMCIODCMxmI6QFHHfCRnnQ2pwhFI6OcjEJ7GCXHBFTYGVQD1et1Z8XBSXhfOFkXF7OVar4Kui34CIjeAxu2rXDtQAD0PagAD0APzIsANfgkCB5KE6+gQV6UKI+thAA)

----

```ts
function processShape(shape: Shape) {
  switch (shape.type) {
    case 'box': break;
    case 'circle': break;
    // (forgot 'line')
    default:
      shape
      // ^? (parameter) shape: Line
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUMhJAO5DIxAAFGbDCgMXEDSC2zzYTTD8BABu-GYASu3IlFwA5vAXI8AEwAEQAlFIomZ9hxgIJBlAztcAHTlKH+WTRD7QZSqXBRbHRe4QR6oxAQDYnVG087HdFaXT6Gi01H0yDsqwQCGmYlkSn8ADWfJxZjxoS8vkUhOJsjuwOAqIaghpdLRMTyNA5EApyVSZhoAAYaCCoAAqKAAWX4wEGqIACgBJXlE7ECiDC0xOJyrdabbZQMCIODCMxmI6QFHHfCRnnQ2pwhFI6OcjEJ7GCXHBFTYGVQD1et1Z8XBSXhfOFkVugD0NeRvCQ-zgwGCVSWighbt+AiI3gMbtq10HUDrUAAegB+ZFgBr8EgQPJQnX4RYQKI+thAA)

----

```ts
function assertUnreachable(value: never): never {
  throw new Error(`Missed a case! ${value}`);
}

function drawShape(shape: Shape, context: CanvasRenderingContext2D) {
  switch (shape.type) {
    case 'box':
      context.rect(...shape.topLeft, ...shape.size);
      break;
    case 'circle':
      context.arc(...shape.center, shape.radius, 0, 2 * Math.PI);
      break;
    default:
      assertUnreachable(shape);
      //                ~~~~~
      // ... type 'Line' is not assignable to parameter of type 'never'.
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUPxmZpTAAKoEiBBCw2S+ABQAbvzeREFLt5QAlPQQr4hSZYOIcAA7oQIMCAKKIAGIa4AAwAshx9hBUPxonsIABCKAAEkk90eEAcMLeOTYq3Wm22UGQSUBQxGEGuZmGCgGLIgNEE2x42CaMH4BHuZgASu1kJQuABzeAuXkAJgAIm9frVARxgIJBlAmeyAHTlZX+WRog7BFTYRS4KLG6LciC83VnDbXXWu5kM-VaXT6Giu3XuyD+qwQEnW41kM78ADWplkgnRwVCXl8lrDcbtDoaghdbr1MTyNADEEdyVSZhoAAYaHKoAAqKBw-jAQa6gAKAElQzbZBHzjGw+KBERvAY07skY0TpHNfwroyi13uwB6JfdtfdgB+W63Y5XUD9ckCwUWESgiMIcGA44skoIs7mmigYAa-BIEDyUDgvEPo0UL0oii6lEThOEAA)

----

```ts
function drawShape(shape: Shape, context: CanvasRenderingContext2D) {
  switch (shape.type) {
    case 'box':
      context.rect(...shape.topLeft, ...shape.size);
      break;
    case 'circle':
      context.arc(...shape.center, shape.radius, 0, 2 * Math.PI);
      break;
    case 'line':
      context.moveTo(...shape.start);
      context.lineTo(...shape.end);
      break;
    default:
      assertUnreachable(shape); // ok
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUPxmZpTAAKoEiBBCw2S+ABQAbvzeREFLt5QAlPQQr4hSZYOIcAA7oQIMCAKKIAGIa4AAwAshx9hBUPxonsIABCKAAEkk90eEAcMLeOVW6022ygyCSgKGIwg1zMwwUA2ZEBogm2PGwTRg-AI9zMACV2shKFwAObwFw8gBMABE3r9aoCOMBBIMoIy2QA6cpK-yyNEHYIqbCKXBRI3RLkQHk6s4ba46l1M+l6rS6fQ0F06t2QP1WCAkq1GshnfgAa1MskE6OCoS8vgtodjtvtDUEztdupieRo-ogDuSqTMNAADDRZVAAFRQOH8YCDHUABQAkiHrbJw+do6G4ybKtVLV2bTLgDqSHBXgAVODZv26uoNYCdruc8c6qpLOcLws60Vr609qMxql6fhEbwGVO7JGNE4RjX8K4MwskqAAek-UDgkaiThOEAA)

----

```ts
function getArea(shape: Shape): number {
  //                            ~~~~~~ Function lacks ending return statement and
  //                                   return type does not include 'undefined'.
  switch (shape.type) {
    case 'box':
      const [width, height] = shape.size;
      return width * height;
    case 'circle':
      return Math.PI * shape.radius ** 2;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUPxmZpTAAKoEiBBCw2S+ABQAbvzeREFLt5QAlPQQr4hSZYOIcAA7oQIMCAKKIAGIa4AAwAshx9hBUPxonsIABCKAAEkk90eEAcMLeOVW6022ygAHMIMAAIJnfjXMzDBQDVkQD6ETKUX6yAD0-NkwpForF4qgAD9pTKoAAxNYbLY7bxCADWZig7RSBCpUDOwCIiB2dX4PBI7WAuw6UUFEvtDolBqNOz6yDgEE1BDgVq4PiIyGgijWgd4JWQigAdFEzICOMBBIMoMyOZHym8+cLBOjgipsIpcFERYJtnUsHHkMBBjRBhAOFTBsAmGMWSMIJGLNZTCLncaoBWq1AAFRQWv1xvdtEHYKhLy+AtF4W9nZws2DSMABQAksPzKmkik0sORwAmUxOJxAA)

----

```ts
function getArea(shape: Shape): number {
  switch (shape.type) {
    case 'box':
      const [width, height] = shape.size;
      return width * height;
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'line':
      return 0;
    default:
      return assertUnreachable(shape);  // ok
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUPxmZpTAAKoEiBBCw2S+ABQAbvzeREFLt5QAlPQQr4hSZYOIcAA7oQIMCAKKIAGIa4AAwAshx9hBUPxonsIABCKAAEkk90eEAcMLeOVW6022ygAHMIMAAIJnfjXMzDBQDVkQD6ETKUX61QEcYCCQZQZkcgB05TefNkaIOwRU2EUuCisui2zqWAFyGAgxogwgHCpg2ATDGLJGEHFFmspjVZ2AREQO21uqgACooAajSa7XLoCFZhEVWrZA6nTs4fxdeKAAoASQ95glSRSaQ9noATH7BOjglUlsrVbLw86oAAGP3IPT8IjeAzFsO0iO7JGNE6M4X8K4QMWWkmyAD0g6gcAA1lEnE4gA)

----

```ts
function processShape(shape: Shape) {
  switch (shape.type) {
    case 'box': break;
    case 'circle': break;
    default:
      const exhaustiveCheck: never = shape;
      //    ~~~~~~~~~~~~~~~ Type 'Line' is not assignable to type 'never'.
      throw new Error(`Missed a case: ${exhaustiveCheck}`);
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUPxmZpTAAKoEiBBCw2S+ABQAbvzeREFLt5QAlPQQr4hSZYOIcAA7oQIMCAKKIAGIa4AAwAshx9hBUPxonsIABCKAAEkk90eEAcMLeOVW6022ygYABwn2QxGEGuZmGCgGLIgb1+tUBHGAgkGUCZ7IAdOVOf5ZGiDsEVNhFPgyGd+ABrUyyQTo4KhLy+eVQRXnVVRWTIPT8IjeAzGyWCbZ1KAQbDDNKbV4wQYQQTKz7fMbMhlqyUAeiDkqgAD9I1HozGoAAVQLBRYRKCIwhwYC7fYcADmBH4V2gmjkicUL0oimF1o0-yBIPBkKQsIRSJRUqCuMdzrqHDdHq9RJJUScTiAA)

----

```ts
function processShape(shape: Shape) {
  switch (shape.type) {
    case 'box': break;
    case 'circle': break;
    default:
      shape satisfies never
      //    ~~~~~~~~~ Type 'Line' does not satisfy the expected type 'never'.
      throw new Error(`Missed a case: ${shape}`);
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAwg9nATgEygXigbQB4C4oB2ArgLYBGEiANFCPseZQLoDcAUAJYHCUBmAhgGNoAITjYoAbzZQooSPgDkZcYvazgcMABkIvYPnhJk6qAGcOALwiGEKdgF9O3PkOgwOiQQBto0jeA2UIqCnj4QajJQwi6ItsamiPzIHERm9KQUiI7OPIgCwlDaXH5R8kGK3iWRsmbA-IgGsHYmURAEyPH2bE7lUADKABb8kOhQYhIAPrBhvlDTxQQQ7LxEBILAHHAEUPxmZpTAAKoEiBBCw2S+ABQAbvzeREFLt5QAlPQQr4hSZYOIcAA7oQIMCAKKIAGIa4AAwAshx9hBUPxonsIABCKAAEkk90eEAcMLeOVW6022ygYABwn2QxGEGuZmGCgGLIgb1+tUBHGAgkGUCZ7IAdOVOf5ZGiDsEVNhFPgyGd+ABrUyyQTo4KhLy+eVQRXnVVRWTIPT8IjeAzGyXMhnmfibMy8DgQMwg77W2QAei9kqgAD9A0Gg1AACqBYKLCJQZBwV2EODAe2O3ggOSDaAQbCQDbIuQRxQvSiKYWe9MA4FLcGQpCwhFIlFSoK422QIkkqJOJxAA)

----

```ts
type Play = 'rock' | 'paper' | 'scissors';

function shoot(a: Play, b: Play) {
  if (a === b) {
    console.log('draw');
  } else if (
    (a === 'rock' && b === 'scissors') ||
    (a === 'paper' && b === 'rock')
  ) {
    console.log('A wins');
  } else {
    console.log('B wins');
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBACgNgQxFAvFA5AJwPYGMDW6UAPhmApJkaegM64CWtt2mt6A3AFBcBmArgDtcwBtkFRaAC2zZgACgQAuWIhAAaKACMV8JAEooAby5QoDXlEWoUaLYZNmzucSzgQAdHGwBzeegATTAQAd3R9bjMAXygIOFpoCytTJ2tbNCw8QigAMhztGwz6JhY2cJJiFLM02zIKCCpc-K1CjBwCcJSHKqgXQTdPbz90AEEoEIZ+8MioGLiE4x6+ga9ffwAhccn2CJSorn2gA)

----

```ts
function shoot(a: Play, b: Play) {
  const pair = `${a},${b}` as `${Play},${Play}`;  // or: as const
  //    ^? const pair: "rock,rock" | "rock,paper" | "rock,scissors" |
  //                   "paper,rock" | "paper,paper" | "paper,scissors" |
  //                   "scissors,rock" | "scissors,paper" | "scissors,scissors"
  switch (pair) {
    case 'rock,rock':
    case 'paper,paper':
    case 'scissors,scissors':
      console.log('draw');
      break;
    case 'rock,scissors':
    case 'paper,rock':
      console.log('A wins');
      break;
    case 'rock,paper':
    case 'paper,scissors':
    case 'scissors,rock':
      console.log('B wins');
      break;
    default:
      assertUnreachable(pair);
      //                ~~~~ Argument of type "scissors,paper" is not
      //                     assignable to parameter of type 'never'.
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwM6oKYCcoFUxYbIQAWyARgDYYAUAbspSBgFyJgZ3YCUbHXWRAG8AUIkRQSWOAHd2GOQFEs0rDQAGAWRjoMAExSIIaDAEJEAEiEMmGAL7ruAbhF2RUAJ4AHDIgAKlMgeiAC8iADk0hAA1uGIAD4RXsg+WHGJ4agQOqhwWKjhLqCQsAiIqCRwcFA0yGwBQQA0iOT1gR7cwmJGCKhQiMkwgmHqVsh2jVbkDiioiKNCDR4TVksOTuIA9JuIeWxoPWB93dvi4gB6APyHfQPIQ2wARFHRjS+PCYjPcDGNyakfRLfX5ZHJ5VCAk47M4w2Fwx7-bBvH7RQFfRFYP4pbBohHYzGg9DgyFbaFw8kwx6E3L5ZExXHU8FYgGfKnZIm0xn5R7dVAyGBQUiIGiDLCdUQw4yYCIvOmxFjdcRS3zhDHM7DhBWSkwRLmoRp6zWKs4QXpwagAOkocAA5jRwnosMgZOFnMbxORCMhoi5tdLIiiDeyaQUtSadar8XKjXDTUdzRgrbb7QBBRD8o6u32wz1EH3G5UywMYmPh-1qw1hpURvXRqsms2W6128IAIXTMEzbrhue92fEegwwGQIEoUHr4jQmBw+C9pAo1BF9zF-bOpwp5IAftvN4gU1gbSAALYYMD9ODACTeXxssG0jEfHTsaruxDrjcfqcwG1gBe+KBwHcTonlA2C7Jeng+BE-Aaha3RuG4QA)
