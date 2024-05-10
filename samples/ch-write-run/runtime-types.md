# Item 74: Know How to Reconstruct Types at Runtime

## Things to Remember

- TypeScript types are erased before your code is run. You can't access them at runtime without additional tooling.
- Know your options for runtime types: using a distinct runtime type system (such as Zod), generating TypeScript types from values (`json-schema-to-typescript`), and generating values from your TypeScript types (`typescript-json-schema`).
- If you have another specification for your types (e.g., a schema), use that as the source of truth.
- If you need to reference external TypeScript types, use `typescript-json-schema` or an equivalent.
- Otherwise, weigh whether you prefer another build step or another system for specifying types.

## Code Samples

```ts
interface CreateComment {
  postId: string;
  title: string;
  body: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMJQnSqD2BbPCcZAbwChlkAHHAZzAEkATALmXqlAHMBuC5MMDAAbCGw7c+lAEY4mAT3FhOIXmQC+ZIA)

----

```ts
app.post('/comment', (request, response) => {
  const {body} = request;
  if (
    !body ||
    typeof body !== 'object' ||
    Object.keys(body).length !== 3 ||
    !('postId' in body) || typeof body.postId !== 'string' ||
    !('title' in body) || typeof body.title !== 'string' ||
    !('body' in body) || typeof body.body !== 'string'
  ) {
    return response.status(400).send('Invalid request');
  }
  const comment = body as CreateComment;
  // ... application validation and logic ...
  return response.status(200).send('ok');
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMJQnSqD2BbPCcZAbwChlkAHHAZzAEkATALmXqlAHMBuC5MMDAAbCGw7c+lAEY4mAT3FhOIXmQC+ZYHhpQwyCAA8qGWrWQwo+ZAHIjJiGZt8EOEPWRwqVZAF4Dxqa0ABQAlHxeVAB0NPTBNgD0rgREYDYANMjBGACOAK6OYJmmNO4QoX4AfKT8ru76JLIK6n7IuQX0UsjAMFn8lACETfLIAD6j-QLyVBA4vcPIA77+NjjSAFYQCGljE5SUAPIbW2BRANYQ8iHDoVGiqmAAFovLyADMu5MD8bGMTDbdEDIG67KYzObAuTyGJ0P4vFYSVQA8ZfeKCEQQAGgSEKCrjMGzeZQqLo0Tw2yIrjIvb7b42YZYoEg-FgaaEnHQhZLBHKbg2fgVcj7NoQMB5KBAkpuWgQKL0LB5EIAFgADCrbjKQEx4gwQAA3ODCYBMEX5Qo2cL8TSUOoeZKEYj+BZwczoTDYfAOsBdBIJZBRAOebxGhBYYBuZAGo1MMMRuBa5DCHBcYAIf0B-gYMUSkW0UoyuVgBUhABMao1RG1qzOFr46ktQA)

----

```ts
const val = { postId: '123', title: 'First', body: 'That is all'};
type ValType = typeof val;
//   ^? type ValType = { postId: string; title: string; body: string; }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAbgQwDYwLwwN4wA4mgSQBMAuGAcgEYAmAZjIBoYoBLKJAU1LIDFmAnaAxgAjEIQCeXACoALBLGYQYyJGQC+AbgBQUcdnYwAasil6D6XfpAAzeMm0B6BzBcA9APxMzRk9-RZcAhIYaD5mMABzDSZWDlJQ8KiRMUkQqDDI6LUtIA)

----

```ts
import { z } from 'zod';

// runtime value for type validation
const createCommentSchema = z.object({
  postId: z.string(),
  title: z.string(),
  body: z.string(),
});

// static type
type CreateComment = z.infer<typeof createCommentSchema>;
//   ^? type CreateComment = { postId: string; title: string; body: string; }

app.post('/comment', (request, response) => {
  const {body} = request;
  try {
    const comment = createCommentSchema.parse(body);
    //    ^? const comment: { postId: string; title: string; body: string; }
    // ... application validation and logic ...
    return response.status(200).send('ok');
  } catch (e) {
    return response.status(400).send('Invalid request');
  }
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYWwDg9gTgLgBAUwB5iggzuuAzKERwDkyqG6hA3AFADGEAduvAIZhhwC8iKamAFAEpqoSLDgBvOAC84AXxx4ChKRAAmlKlQD0WuFACu9GKARwAbswA2+09mhwYATzCmLl4KubGGtBkzg0aF4IAML4IAhGAMo0ABYIIMyc0gB0EABGAFYINDB84lRwcJBMAJKqAFypTFDA9ADmggA0hQ7AMJYIVVIpNXWNAi1F6WqO3b0wtQ3NVLJCmjpwTF7ANA7OCFROLnAhQTCh4ZHwXD112AhQADzbCBDYAfuHIBHRcQnMAHzUi0UAegB+dY7PYIYJhF7HZKSEowcpVPoNChtDpdJaTfrIkaqMboqb1ZGyTSsMApWF8QhaOiQoyEJpwPhoACONiY9N4kEYCAEnE+EladEY8HE2Mc8i4zNZMGoRUmjn5RSKgv81NeJ0eYIOELVMXiiTJzCg6AQfFF80VcF+-yByvgquOVRhEDKlTxmJRnQRGKRcFFXvxhNaRUWKVDcBJ7hoKwY5isHmj9HD9FUcEsEHqqzgoZSQb0CBg+igiY5fgQEy8+nQfAATAAGWsCXqRVQUiAAa0I5rkAS8cQZ3IVirQBaLefQnON5YLVYALPXG8bkxTSvQ3B48yyMDBOzK5LN5kA)

----

```ts
// api.ts
export interface CreateComment {
  postId: string;
  title: string;
  body: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEEMAcEsDoBcDOAoApgD0gewE71NAHbyo4Bm4AxqqAMI6rgm1YC2rqxoA3sqKNkTwAkgBMAXKCE4iAcwDcfUPGjwANqknS5i-gCMsogJ5b4MwguQBfZEA)

----

```ts
import Ajv from 'ajv';

import apiSchema from './api.schema.json';
import {CreateComment} from './api';

const ajv = new Ajv();

app.post('/comment', (request, response) => {
  const {body} = request;
  if (!ajv.validate(apiSchema.definitions.CreateComment, body)) {
    return response.status(400).send('Invalid request');
  }
  const comment = body as CreateComment;
  // ... application validation and logic ...
  return response.status(200).send('ok');
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&resolveJsonModule=true&esModuleInterop=true#code/JYWwDg9gTgLgBAUwB5iggzuuAzKERwDkyqG6hA3AFADGEAduvAIZhhwC8iKamAFAEpqoSLDgBBAFYA3HHgKFmMylSojoLMMADKNABYIQzOfiIA6APStgZ9PsPMzk9AxXqxAbwDCaZjARe+CAI9DAAviYKltYqtAxMcEqyXPQIAO4SMoLUVKxgZpBMfIQWdCDBoYQANHB8aACOAK4YMDW8kIwIApwAfHAeVHBwdIzwHgBGEAAmAJ4RXA3NTNRDwNi1AIRJZtLMADbAU34IfNa6BkZmUwjYwPTAMMDxZj4Ix4HlIa1wk7MC3QMhkM0DBGlB6HB2vEELYYH5Gug+AAWAAMKIEthCU2KAEl6LsDlNIQgmi1CEJBnAwpSRgkyhV4FxfjNElhXu8gl8VnALBY4GYBYk2AcaH4nhCCYcxQxEvQiXsIABzYA0fkCykgsEQqGdWHwxEAJjRGPQWOKEAA1uTqGEKUA)
