# Item 68: Use TSDoc for API Comments

## Things to Remember

- Use JSDoc-/TSDoc-formatted comments to document exported functions, classes, and types. This helps editors surface information for your users when it's most relevant.
- Use `@param`, `@returns`, and Markdown for formatting.
- Avoid including type information in documentation (see pass:[<a href="#jsdoc-repeat">Item 31</a>]).
- Mark deprecated APIs with `@deprecated`.

## Code Samples

```ts
// Generate a greeting. Result is formatted for display.
function greet(name: string, title: string) {
  return `Hello ${title} ${name}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEHEFMDtIJwIYBdKgaA5nSkkEtoMA6UAJUgGcBXAGyVDwtADMB7OAW2RQBMX3QPRgAcaCAJ5EAUMyrQAxvlbRM2XAApoCDpABcoCkjgEMAGlD4kNPQaMmAlKADeU0KGxIqcFQAMAEpA0NKygACROltYAvmFOWjpRPgDcUlFSQA)

----

```ts
/** Generate a greeting. Result is formatted for display. */
function greetJSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhAIHEFMDtoE4EMAu1xPAcwdaKBLWLAOnACVoBnAVwBsVwCrwAzAewQFtU0ATNp3B9mABzpIAnmRDAAUKxqwAxoXaxsufACkAygBF2ygBSwkXaAC5wVFAiJYANOEIo6Vm3YcBKcAG85cHBcFBoEDQADAAloOjp2cAASP1d3AF8kvzMLNIiAbjk0uSA)

----

```ts
/**
 * Generate a greeting.
 * @param name Name of the person to greet
 * @param title The person's title
 * @returns A greeting formatted for human consumption.
 */
function greetFullTSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhCgAIUhxBTAdvATgQwC70myBzFeeDAS0TwDooYABABzXQFtJE0nsA5d7AewDNIGABbY6qAM69EQ3vkLFqkeo3ZCSGADbYAKqMjiUUxAHIJ6rfCU1CGAK4pE5gILyipcpH68UTTFgATLx9IYTs-GQBjaQlwulJpKmhgcH47REiEmQJ3ADE7TU0dAGUAEV5IgAo2DgAuSAkMFDI8ABoLbXrG5vIASkgAbyhIWwcZAAMACXhCuQASAdJLAF9IBZr4ZfGAbnBl8CA)

----

```ts
/** A measurement performed at a time and place. */
interface Measurement {
  /** Where was the measurement made? */
  position: Vector3D;
  /** When was the measurement made? In seconds since epoch. */
  time: number;
  /** Observed momentum */
  momentum: Vector3D;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lAzAEWQG8BfAKAHoAqK5AQWQFsI4BnAVygmfGQAdoMHMwAmyOGHHIwwZuJBi+AG0QQAdMioUyoSLFXIAsiw5cekomWTJqtAOoALaCgDubaU6YnO3CL0ZwIhAA-Jra1nxYrMAyWCAAXGgY2Hj4ANxWNjTIjn7IbqweKMxsPuZMgSHIAJIgyKwYcSKF0SBIyBCRCA4aWpkyzIkg7IwARtAZ1rbIAPKjDVAAbhBijFjmI2GZaxuMieiYOAQZ5EA)
