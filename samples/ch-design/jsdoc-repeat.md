# Item 31: Don’t Repeat Type Information in Documentation

## Things to Remember

- Avoid repeating type information in comments and variable names. In the best case it is duplicative of type declarations, and in the worst case it will lead to conflicting information.
- Declare parameters `readonly` rather than saying that you don't mutate them.
- Consider including units in variable names if they aren't clear from the type (e.g., `timeMs` or `temperatureC`).

## Code Samples

```ts
/**
 * Returns a string with the foreground color.
 * Takes zero or one arguments. With no arguments, returns the
 * standard foreground color. With one argument, returns the foreground color
 * for a particular page.
 */
function getForegroundColor(page?: string) {
  return page === 'login' ? {r: 127, g: 127, b: 127} : {r: 0, g: 0, b: 0};
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhCgAIUglBTALgVwE4DsDOkCGlOKoCW6A5pAO5GIAWkt8kAZgParymovLoAmkAYxYAbNgDooMACo4A1vGwAveF0hs16RjlSlkAW3jpEmMZADq1Ouha4d+w8YA0kdigzYGk-Ihx9t-VnZObj5BEXFzSw0tOwMjZ1c0LHoaRkCOLh5+IVFUL0DcSAAHbUQiAWRhbWKcUngJaGBwJh4BMpZ0SDrEADE2DJDeAGFw1AAKErqAfgAub2IyAEpIAG8oFyQkmrrIAF59yAByUVISQ8gp1dQ5gEYAJgB2Z1Jbx+cAI1eHgF9IOZXrpAAAzPOYgyCfYHfADc4G+4CAA)

----

```ts
/** Get the foreground color for the application or a specific page. */
function getForegroundColor(page?: string): Color {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgAuBPADgU1AYQPYBscAnUAXlAG9RCAuUAOwFcBbAI3UIG5QBzWx19lxZ9mbYgF8O8EKFgA5aNIBUS0AHF0iUIgAWmAGZF03QjgZ0AJqADG+IqEPFdmAIapUeAJbWXiTzjpQexdQAGcMa099b1BUF250ADpQJWB4fXNrPwCeTQAxIxMzS1wCQgAKOISAflpQxEJPOm4ASlpS+3J4UFAZLAB5AFkABQAlWABlCe6qTQZCQKrMEhXQAHICbia10GqKGlAARgAmAHYAGh5aE4vQYSOz8VBacgOABkveUA+72jfJGYyeSKcTweBAA)

----

```ts
/** Sort the strings by numeric value (i.e. "2" < "10"). Does not modify nums. */
function sortNumerically(nums: string[]): string[] {
  return nums.sort((a, b) => Number(a) - Number(b));
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhAIGUHsCcBdzwBYFNwGd6wJYDsBzDcAIwE9w8BXAW1VwGNwA3AQwBsr0AKHAOlR9wAIgBMw8AB4RARgAMwgJRCAItFTE80RDWgATHADMK1GhiEhgAKENU8DeDmh5MceADla9HAw7sy3KYYAFyY2PgEANoAuoqhWLiEMeAA3lbg4LCo8FSwLkF8GG7c3KwANKSK4AC8AHzgnjQk9KVVALQNtM2w3CSKigDcVgC+VkA)

----

```ts
/** Sort the strings by numeric value (i.e. "2" < "10"). */
function sortNumerically(nums: readonly string[]): string[] {
  return nums.sort((a, b) => Number(a) - Number(b));
  //          ~~~~  ~  ~ Property 'sort' does not exist on 'readonly string[]'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhAIGUHsCcBdzwBYFNwGd6wJYDsBzDcAIwE9w8BXAW1VwGNwA3AQwBsr0AKHAOlR9wAIgBMw8AB4RARgAMwgJRCQwAFAAzKngbwc0PJjjwAcrXo4GHdmW7UaGAFzhYqVgBMDNzNnwEA2gC6is5YuIRB4ADeauAuqPBUsIb2GHwYxtzcrAA0pIrgALwAfOBmNCT02QUAtGW0lbDcJIqKANyx4MDAcb194AB+QwNxI4PgAAqw0AAO9PAUAOQZCIvgnqjEeNCIqAAeOFjgBuCLrh5eFGF+QYt8agC+akA)

----

```ts
/** Sort the strings by numeric value (i.e. "2" < "10"). */
function sortNumerically(nums: readonly string[]): string[] {
  return nums.toSorted((a, b) => Number(a) - Number(b));  // ok
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhAIGUHsCcBdzwBYFNwGd6wJYDsBzDcAIwE9w8BXAW1VwGNwA3AQwBsr0AKHAOlR9wAIgBMw8AB4RARgAMwgJRCQwAFAAzKngbwc0PJjjwAcrXo4GHdmW7UaGAFzhYqVgBMDNzNnwEA2gC6is5YuIRB4ADeauAuqPBUsIb2GHzw0DAIqO7c3KwANKSK4AC8AHzgZjQk9PklALRVtLWw3CSKigDcccDA4NAA1moAvmpAA)
