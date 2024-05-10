# Item 39: Prefer Unifying Types to Modeling Differences

## Things to Remember

- Having distinct variants of the same type creates cognitive overhead and requires lots of conversion code.
- Rather than modeling slight variations on a type in your code, try to eliminate the variation so that you can unify to a single type.
- Unifying types may require some adjustments to runtime code.
- If the types aren't in your control, you may need to model the variations.
- Don't unify types that aren't representing the same thing.

////## Code Samples

```ts
interface StudentTable {
  first_name: string;
  last_name: string;
  birth_date: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpgK4BMLgCpwBGANigN4BQyyMwUAzmAPohwC2EAXMo1KAOYBuKsmJxGLdlx5g+IISMJ0wACyZY4kbrwHCAvhSA)

----

```ts
interface Student {
  firstName: string;
  lastName: string;
  birthDate: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpgK4BMLgCpwBGANigN4BQyyMwUAzmAPohwC2EAXMo1KAOYBuKsmJxGLdlx5g+IISMJ0wACyZY4kbrwHCAvhVCRYiFOmy4wyStVoMwAOSnbZukWMZOOLuQupKoVQARTWkdeX0KIA)

----

```ts
type Student = ObjectToCamel<StudentTable>;
//   ^? type Student = {
//        firstName: string;
//        lastName: string;
//        birthDate: string;
//      }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpgK4BMLgCpwBGANigN4BQyyMwUAzmAPohwC2EAXMo1KAOYBuKsmJxGLdlx5g+IISMJ0wACyZY4kbrwHCAvhTABPAA4o8AewDCU4gB5UyCAA9IILPRlz+APmQBeEWpHFzcPZAADABIyUBhoZAAJCDgsPSYYuISCYGI9CKDkAH5ImOTUvRibE2AwOGJgAC8IO0sbDnsc4h8ffMLuVGFjM2QAeUIAKwgEMDbbVqdXXHCLSemwP39kSmoAbQBpZFBkAGsIIwsYZDxkcWvrecOAMi8BHwBdbjwD94o9YRwCDEUBQMAwIBmwAsIGQqymM0sqFYZwAFM5uHAQEYAJQYrFDUwodDYXBgAJjNYIh4dByYHD4IikHzCAD0LOoyAAeiVhkS6aTyZQ2RyRTQ6IwAHJSbSyXQUYWi6hiSXS17yVnsxXIJRQVQAEU00h06vlmpFBiAA)

----

```ts
async function writeStudentToDb(student: Student) {
  await writeRowToDb(db, 'students', student);
  //                                 ~~~~~~~
  // Type 'Student' is not assignable to parameter of type 'StudentTable'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpgK4BMLgCpwBGANigN4BQyyMwUAzmAPohwC2EAXMo1KAOYBuKsmJxGLdlx5g+IISMJ0wACyZY4kbrwHCAvhTABPAA4o8AewDCU4gB5UyCAA9IILPRlz+APmQBeEWpHFzcPZAADABIyUBhoZAAJCDgsPSYYuISCYGI9CKDkAH5ImOTUvRibE2AwOGJgAC8IO0sbDnsc4h8ffMLuVGFjM2QAeUIAKwgEMDbbVqdXXHCLSemwP39kSmoAbQBpZFBkAGsIIwsYZDxkcWvrecOAMi8BHwBdbjwD94o9YRwCDEUBQMAwIBmwAsIGQqymM0sqFYZwAFM5uHAQEYAJQYrFDUwodDYXBgAJjNYIh4dByYHD4IikHzCAD0LOoyAAeiVhkS6aTyZQ2RyRTQ6IwAHJSbSyXQUYWi6hiSXS17yVnsxXIJRQVQAEU00h06vlmpFBkBwNB4Mh0OQAHc+JAAEoWe2WPWEFFYQh4owAGmQdRIRtl8kDUDdA35DJDuOQAAVI2xgPQWgA3CzALDMigIaGMZA+8kgDDEYjCcRGCE0G1gKEwx21CDE+mzCyelGMEngaM9sDY7YiOD2uC1B1OiCu90dr0+wMAcm7bfoC8Dy9J2OE1AVWr3+61AD9jyfDyJhXhCcgF63SQujp4QBYyeJ6MB+KwQ0GLMgTHAoFIkBQLCVy8tet6xqQC4AHR-BQQA)

----

```ts
async function writeStudentToDb(student: Student) {
  await writeRowToDb(db, 'students', objectToSnake(student));  // ok
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpgK4BMLgCpwBGANigN4BQyyMwUAzmAPohwC2EAXMo1KAOYBuKsmJxGLdlx5g+IISMJ0wACyZY4kbrwHCAvhTABPAA4o8AewDCU4gB5UyCAA9IILPRlz+APmQBeEWpHFzcPZAADABIyUBhoZAAJCDgsPSYYuISCYGI9CKDkAH5ImOTUvRibE2AwOGJgAC8IO0sbDnsc4h8ffMLuVGFjM2QAeUIAKwgEMDbbVqdXXHCLSemwP39kSmoAbQBpZFBkAGsIIwsYZDxkcWvrecOAMi8BHwBdbjwD94o9YRwCDEUBQMAwIBmwAsIGQqymM0sqFYZwAFM5uHAQEYAJQYrFDUwodDYXBgAJjNYIh4dByYHD4IikHzCAD0LOoyAAeiVhkS6aTyZQ2RyRTQ6IwAHJSbSyXQUYWi6hiSXS17yVnsxXIJRQVQAEU00h06vlmpFBkBwNB4Mh0OQAHc+JAAEoWe2WPWEFFYQh4owAGmQdRIRtl8kDUDdA35DJDuOQAAVI2xgPQWgA3CzALDMigIaGMZA+8kgDDEYjCcRGCE0G1gKEwx21CDE+mzCyelGMEngaM9sDY7YiOD2uC1B1OiCu90dr0+wMAcm7bfoC8DcPWiOREC7MYH2ME1GFFhOfwoQA)
