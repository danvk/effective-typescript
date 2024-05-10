# Item 66: Understand the Three Versions Involved in Type Declarations

## Things to Remember

- There are three versions involved in an `@types` dependency: the library version, the `@types` version, and the TypeScript version.
- Recognize the symptoms of different types of version mismatch.
- If you update a library, make sure you update the corresponding `@types`.
- Understand the pros and cons of bundling types versus publishing them on DefinitelyTyped. Prefer bundling types if your library is written in TypeScript, and DefinitelyTyped if it is not.

