# Item 32: Avoid Including null or undefined in Type Aliases

## Things to Remember

- Avoid defining type aliases that include `null` or `undefined`.

## Code Samples

```ts
function getCommentsForUser(comments: readonly Comment[], user: User) {
  return comments.filter(comment => comment.userId === user?.id);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHsC2mLmQb2QFcBnaASQBMAuZEsKUAcwG5kBfAKFElkRQCqZKAWTAadBszZcYREAjDB0IZEwhgM2XGBIAxdFCHQAFAiw5wJWlAhxKKgDYBPNBZ0BtALoAaYsNpjKABKAk5kZFswIihVc20rADoYYEdeM3c8AF4APmR4yzBE0gpKZCyK-2gAfkTxYJZOLiA)

----

```ts
type User = { id: string; name: string; } | null;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgzhATlAvFA3lAlgEwFxRzCJYB2A5gNxSkCGAthAUSRdQL5QA+NArgDb9KAKCA)

----

```ts
interface User {
  id: string;
  name: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnLAAmAXMumFKAOYDc+yIcAthGRVSHbgL65A)

----

```ts
type NullableUser = { id: string; name: string; } | null;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAcgrgGwQQwEYIgVQM4QE5QC8UA3lAJYAmAXFNsHuQHYDmA3FE8gLYS32NWHAL5QAPp0QI2AKCA)

----

```ts
function getCommentsForUser(comments: readonly Comment[], user: User | null) {
  return comments.filter(comment => comment.userId === user?.id);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHsC2mLmQb2QFcBnaASQBMAuZEsKUAcwG5kBfAKFElkRQCqZKAWTAadBszZcYREAjDB0IZEwhgM2XGBIAxdFCHQAFAiw5wJWlAhxKKgDYBPNBZ0BtALoAaYsNpjEQAfZBAiR0cASgJOZGRbMCIoVXNtKwA6GGBHXjN3PABeAD5kNMswDNIKSmRC+v9oAH4M8SiWTi4gA)

----

```ts
type BirthdayMap = {
  [name: string]: Date | undefined;
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHsC2mLmQb2QFcBnaASQBMAuZEsKUAcwG5kBfAKFElkRQCqZKAWTAadBszZcwATwAOKAELAoYABaU4cgLJwFyALwFOyZAG0QcHLXqMQTALq0AInEjIAPsRCUIMKAQlCyc7KFAA)

----

```ts
type BirthdayMap = {
  [name: string]: Date | undefined;
} | null;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHsC2mLmQb2QFcBnaASQBMAuZEsKUAcwG5kBfAKFElkRQCqZKAWTAadBszZcwATwAOKAELAoYABaU4cgLJwFyALwFOyZAG0QcHLXqMQTALq0AInEjIAPsRCUIMKAQlCyc7N7IIEQANtGhQA)
