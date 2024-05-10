# Item 70: Mirror Types to Sever Dependencies

## Things to Remember

- Avoid transitive type dependencies in published npm modules.
- Use structural typing to sever dependencies that are nonessential.
- Don't force JavaScript users to depend on `@types`. Don't force web developers to depend on Node.js.


## Code Samples

```ts
// parse-csv.ts
import {Buffer} from 'node:buffer';

function parseCSV(contents: string | Buffer): {[column: string]: string}[]  {
  if (typeof contents === 'object') {
    // It's a buffer
    return parseCSV(contents.toString('utf8'));
  }
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAcEMCcGcFMC0BjWA3AdAF1gKAJYC24A9tFqAN4BCArgGb3zQC+o90JhoA5AHYkAJvABcAIwZNoPANy5c9Wn2RZ8JPhBgIAwgGUAagApk6rPD44RoWFmj4+Ac1AAfUHUbMAlFcoBtEwA2tIR8VjZ2jgC6Ybb2Diy+kaBUuMn49KCGWACe4PAkGSYW5jigALwVvCRiAFbwKjyeKcnJIKAAklg8sKCQoBIe0Kkt0PBYtNAaUHDwekZFZhaw2CS6sY6GPLRY9AAcjZ5yySzDbdoA8gCyAAoASgCiurrDo+OToIlHoG33AHIAIrgTrggA)

----

```ts
// parse-csv.d.ts
import { Buffer } from 'node:buffer';
export declare function parseCSV(contents: string | Buffer): {
    [column: string]: string;
}[];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAcEMCcGcFMC0BjWA3AdAEwwF1gFACWAtuAPbS6gDeoAQgK4Bmz80oAvqM9OSaADkAO3JZ4ALgBGLNtEEBuAvAAeFKqHHIANjHg9Gw5LiLlhEGAgDCAZQBqACmRnc8YfgmhYuaEWEBzUAAfBll2AEpPGgJQWNAAbWdtRhJhT29fAIBddJ8-fyVOeKylIA)

----

```ts
export interface CsvBuffer {
  toString(encoding?: string): string;
}
export function parseCSV(
  contents: string | CsvBuffer
): {[column: string]: string}[]  {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBASwHY2FAZgQwMbDgYQGcA3AIQFd1004BvAKDjhggGUYpkBzACmCWwQAJtwD8ALjiEO3AJSTpnJFwDc9AL71QkWHHTkBMBBCRwwmKIWD5WANR6M4glPxiEFM5XAA+BEhSo0enk6AG1BABtyAFskDyUuAF147nVQxKYGJgB6bIIAeQBZAAUAJQBRVlZHKGAYcihTdLUcvPKAOQARDXp6IA)

----

```ts
parseCSV(new Buffer("column1,column2\nval1,val2", "utf-8"));  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/KYDwDg9gTgLgBASwHY2FAZgQwMbDgYQGcA3AIQFd1004BvAKDjhggGUYpkBzACmCWwQAJtwD8ALjiEO3AJSTpnJFwDc9AL71QkWHHTkBMBBCRwwmKIWD5WANR6M4glPxiEFM5XAA+BEhSo0enk6AG1BABtyAFskDyUuAF147nVQxKYGJgB6bIIAeQBZAAUAJQBRVlZHKGAYcihTdLUcvPKAOQARDXp6c0trOx4kYAB3OADqKB4AIkiYpABGABp52IAmAB0kYkwIld2I9ZnluBnyGHQAWgAOGdlZFVa4fIBpeiA)

----

```ts
/** Anything convertible to a string with an encoding, e.g. a Node buffer. */
export interface StringEncodable {
  toString(encoding?: string): string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhAIEEDsE8BcAWBLaBzcBjA9tAbgKYBO8yARgDYHjzbgCG4AzvEahgO7JIPTgHQcAE3YAafgDo0EhuABy2IdTIBXAGZriMkMABQBAB4AHbCXCp4xNfUzUAyq3YBRQYvqVqAb13ga2B2zoABQCwuwA-ABczI7oAJTRLIFoANy6AL66QA)

----

```ts
import {Buffer} from 'node:buffer';
import {parseCSV} from './parse-csv';

test('parse CSV in a buffer', () => {
  expect(
    parseCSV(new Buffer("column1,column2\nval1,val2", "utf-8"))
  ).toEqual(
    [{column1: 'val1', column2: 'val2'}]
  );
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYWwDg9gTgLgBAbwEIFcBmaCmUC+c1QQhwDkAdhACaYBcARullCQNwBQoksiYAhlAGdMAYQDKANTwEipAHQB6PoMwBaAMYCAbqzZsYmATAAUJJULhjxcYGTi84DDNhIAaOEYCUcALwA+RGxwcJgAHmCYasaBQXBmIhJGZJgA7nCoTlBGAERqEAA2KCBkAIwuuQVFAEwAOmSavHml9XmVWW5ZKDBoKgAcWR4e0R6yMBAAogCOKA1G0UEA2gjlhSU0pM3FrnDLVWskzZUkOAC6Q+w4HuxAA)
