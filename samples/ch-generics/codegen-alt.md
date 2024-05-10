# Item 58: Consider Codegen as an Alternative to Complex Types

## Things to Remember

- While type-level TypeScript is an impressively powerful tool, it's not always the best tool for the job.
- For complex type manipulations, consider generating code and types as an alternative to writing type-level code. Your code generation tool can be written in ordinary TypeScript or any other language.
- Run codegen and `git diff` on your continuous integration system to make sure generated code stays in sync.## Code Samples

```ts
async function getBooks(db: Database) {
  const result = await db.query(
    `SELECT title, author, year, publisher FROM books`
  );
  return result.rows;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCJzHARnAzigbwChlkBHAV2gE8AKSmgLmVzClAHMAaZOKD3AH5mcENQDaAXQCUzAApQA9gFtg+ADwElAd1wixUgL4A+ANxFDRPNRAJkMCrbDBFIZBwhgAQosUBrXFoAEyxmdEwcfGlkYlIEV1ZkKAhcCgAbMGQAXl5tOGBMkIA6Big6ElJkAAMAZQBRABk6gGEAFWRnMDSIHjgKMAALRSgeagg+HgAHCiw0tQHoZAAxACUAeQBZZCxfAKqK6XNSZLAKKDdk1IyinVxzSyA)

----

```ts
async function getLatestBookByAuthor(db: Database, publisher: string) {
  const result = await db.query(
    `SELECT author, MAX(year) FROM books GROUP BY author WHERE publisher=$1`,
    [publisher]
  );
  return result.rows;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCJzHARnAzigbwChlkBHAV2gE8AKSmgLmVzClAHMAaZOKD3AH5mcENQDaAXQCUzAApQA9gFtg+ADwElAd1wixUgL4A+ANxFDRPNRAJkMCrbDBFIZBwhgAMhgisAQoqKANb+1ACCFGAAFopQtAAmWMzomDj4PAAOFFgANmrR0Mys7CAc0sjEpAiurMhQfhS5YMgAvLzacMAtSQB0DFB0JKTIAAYAygCiXpMAwgAqvFGxUDwAsuEAGrTUEHwVAGIASgDya8hYQcG4yADipwCqcsj+AJpLMXHIAOoAEpNHSbIbJ5ArQVoAEgAjKMuMNSOIQflcIUoJJhtJzKQGmAKFA3A1cE0wL0dLhzJYgA)

----

```ts
// books-queries.ts
import { sql } from '@pgtyped/runtime';
const selectLatest = sql`
    SELECT author, MAX(year)
    FROM books
    GROUP BY author
    WHERE publisher=$publisher
`;

async function getLatestBookByAuthor(db: Database, publisher: string) {
  const result = await selectLatest.run({publisher}, db);
  //    ^? const result: any[]
  return result;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCJzHARnAzigbwChlkBHAV2gE8AKSmgLmVzClAHMAaZOKD3AH5mcENQDaAXQCUzAApQA9gFtg+ADwElAd1wixUgL4A+ANxFDRAPRXkWRYoDWuALQN2EXADowuIsGUAB0UoMGQCFjIAG2RDZBglZWQAcgABQI4wakCIABMrKApwAIhk8wRFEFYWCCiIBDAAGQxPMIBeSKiAAxJSZABlAFFGwYBhABVeCjAACxCeAFkAQQANWmoIPmle0gAxACUAeQW7B2cd5ABxI4BVOWQAIQBNKdmQi4B1AAlB-cHkQIULBRNQzaBtAAkgOBoOgRC65iIeGoIAQ8SKDWAlWQHAgTRarAeZwe1CW0zmUFouSwzHQmBw+B40JBuDBUGYrHYIA40nCvQqVTCUE8FCi7V42jgwDC+DqDWakFYXkKIFoBGZsKghh41Ok5lINj6yAAeoJkALqsLcKKwPoJJJesKwBQoCBkFabeZLEA)

----

```ts
// books-queries.types.ts
/** Types generated for queries found in "books-queries.ts" */

/** 'selectLatest' parameters type */
export interface selectLatestParams {
  publisher: string;
}

/** 'selectLatest' return type */
export interface selectLatestResult {
  author: string;
  year: number;
}

/** 'selectLatest' query type */
export interface selectLatestQuery {
  params: selectLatestParams;
  result: selectLatestResult;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCJzHARnAzigbwChlkBHAV2gE8AKSmgLmVzClAHMAaZOKD3AH5mcENQDaAXQCUzAApQA9gFtg+ADwElAd1wixUgL4A+ANxFDRAPRXkWRYoDWuALQN2EXADow1AA6ePrjWAFQhyAAq-p7IHBAg0BgQACbIMIpQ5FQeuGmKFCCpoMgARPZOru7AgWC4JcghVkSh4QDk+AA2EAhgADJJrK3IfnxwyhCQULm+AQ1NEAAefhlgyKCT8EgsEF09-ZCscqPKucSkfhRYHWoAFtDMrOwgHOaWLcjtO919A2BDUBMKFAQMgZihGkRFssoKt1tBNihOt99p4wAAlTwUDqrM68ChgG4ZB5sTjmUjUCB8ZggCjKLDQV7NKxhD5Iva-Ibuaig6JzSFLFZrcDwxCIr7sg5gACK2W5uJGUDGem2ux+kqOipOZOQANwWLAD3FatRGL12MZQA)

----

```ts
// books-queries.ts
import { sql } from '@pgtyped/runtime';
import { selectLatestQuery } from './books-queries.types';
export const selectLatestBookByAuthor = sql<selectLatestQuery>`
    SELECT author, MAX(year)
    FROM books
    GROUP BY author
    WHERE publisher=$publisher
`;

async function getLatestBookByAuthor(db: Database, publisher: string) {
  const result = await selectLatestBookByAuthor.run({publisher}, db);
  //    ^? const result: selectLatestResult[]
  return result;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgCJzHARnAzigbwChlkBHAV2gE8AKSmgLmVzClAHMAaZOKD3AH5mcENQDaAXQCUzAApQA9gFtg+ADwElAd1wixUgL4A+ANxFDRAPRXkWRYoDWuALQN2EXADowuIsGUAB0UoMGQCFjIAG2RDZBglZWQAcgABQI4wakCIABMrKApwAIhk8wDg0PCWCCiIBDAAGQxPMABFKihqWPjElK8reydXd2BPH2zPMqIIAA9KsIRFEFYauobmyFYAIQdHbeoAQQowAAsQ5ABeSKj1fHWmltYOmmMAAxJSZABlAFFG34AYQAKrwTucoDwALKHAAatGoED40k+pAAYgAlADyULsez8X2QAHFsQBVOTIbYATTBZxCqOQAHUABK-DG-ZCBChYKJqU7QS4AEi5PL50CIb3MRDw1BACHiRQawGWyA4EEeWzAuycB2OdKgtFyWGY6EwOHwPBFvNw-KgzFY7BAHGk4U+SxWYSgngoUTC1zg2jgwDC93qGta2v2R3BIS8hRAtAIVrFUEMPCN0nMpBshIAeoJkO7Vl7cD6wPbamHNq0Md7fVJPl6wBQoCBkCWy+ZLEA)
