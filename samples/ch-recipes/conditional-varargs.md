# Item 62: Use Rest Parameters and Tuple Types to Model Variadic Functions

## Things to Remember

- Use rest parameters and tuple types to model functions whose signature depends on the type of an argument.
- Use conditional types to model relationships between the type of one parameter and the number and type of the remaining parameters.
- Remember to label the elements of your tuple types to get meaningful parameter names at call sites.

## Code Samples

```ts
interface RouteQueryParams {
  '/': null,
  '/search': { query: string; language?: string; }
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NoA)

----

```ts
function buildURL(route: keyof RouteQueryParams, params?: any) {
  return route + (params ? `?${new URLSearchParams(params)}` : '');
}

console.log(buildURL('/search', {query: 'do a barrel roll', language: 'en'}))
console.log(buildURL('/'))
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAKKCxITgBrCAJ0GDQ4iDxCEjIqfmQAB1IKSjNkPQIASlohKAgwTChfWOwUAGpkKKLc6hNkAAMTABIaEAgAd2RwiIBlMShJHJKu4qpKq37kTiYmSs0XOjoEH0p0HggHHnR1KICgsMio1lFxKXyaeUJt4PRy-1I6jxkLE+Ex8rp9IZjNsICAmFZKpUjiczhcrjc7iFpk82Ii6EA)

----

```ts
buildURL('/', {query: 'recursion'});  // should be an error (no params for root)
buildURL('/search');  // should be an error (missing params)
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAKKCxITgBrCAJ0GDQ4iDxCEjIqfmQAB1IKSjNkPQIASlohKAgwTChfWOwUAGpkKKLc6hNkAAMTABIaEAgAd2RwiIBlMShJHJKu4qpKq37kTiYmSs0XOjoEH0p0HggHHnR1KICgsMio1lFxKXyaeUJt4PRy-1I6jxkLE+Ex8rp9IZjNsICAmFZKpUjiczhcrjc7iFpk82Ii6JiHtFWGDaJ9FNs6ghGpRvHCEdpkHZkJQJFgQv4UHpkNBYlBOiBft0SsgYOg+bF0GAkQTsc95pJdgymSy2cEOeVfDyxZ1yMBKDT9IVVpQkUA)

----

```ts
function buildURL<Path extends keyof RouteQueryParams>(
  route: Path,
  params: RouteQueryParams[Path]
) {
  return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAeEjAJZAgAD0gQYOoAawgCdBg0LFwFYlIKSgA+AAohKHyITliJQUYAB2KqTgxsCDxCEjIqAG16gF06AEpaKogwTChfas7kAGpkcpa+6hNkAAMTABIaEAgAd2RwiIBlMShJXpLV1spRqy3kTiYmUc0XOiA)

----

```ts
buildURL('/search', {query: 'do a barrel roll'})
buildURL('/search', {query: 'do a barrel roll', language: 'en'})
buildURL('/search', {})
//                  ~~ Property 'query' is missing in type '{}'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAeEjAJZAgAD0gQYOoAawgCdBg0LFwFYlIKSgA+AAohKHyITliJQUYAB2KqTgxsCDxCEjIqAG16gF06AEpaKogwTChfas7kAGpkcpa+6hNkAAMTABIaEAgAd2RwiIBlMShJXpLV1spRqy3kTiYmUc0XOgCgsMjyqxROIpPxaPJCG9guhkHB-KQoBAeMhqnwmFZRj9AiEzoCRFdJEwwTQIYooTC4X4EUiUeg0WDdPpDMY3hAQOjMb8cQCgQTQbQMXQ7IwRaKxaKAH4S5BEapNaBgAjMUkEJjIYDUcgaygadW+RXy5g0KxMOhAA)

----

```ts
buildURL('/', {query: 'recursion'});  // error, good!
//            ~~~~~~~~~~~~~~~~~~~~ Argument of type '{ query: string; }' is
//                                 not assignable to parameter of type 'null'
buildURL('/', null);  // ok
buildURL('/');  // we'd like this to be allowed
// ~~~~~ Expected 2 arguments, but got 1.
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAeEjAJZAgAD0gQYOoAawgCdBg0LFwFYlIKSgA+AAohKHyITliJQUYAB2KqTgxsCDxCEjIqAG16gF06AEpaKogwTChfas7kAGpkcpa+6hNkAAMTABIaEAgAd2RwiIBlMShJXpLV1spRqy3kTiYmUc0XOgCgsMjyqwmPxaPJCG8oBAEDNKN4QEwrJ9GHYElBqlAQep0OhggBCOgoxhE4mMAB+5IplKpVOQAEEoAZyBBwMgcsgwAQmigmDQ5IVzGp9NYmMhgJQCfYSVLpTKpSB0GBkHBKLD1CA4H4eCgwOhkGsKFNoKzchyucxuHwmD9AiEzoC2CCLTwkcgUeh0ta-nagS6UUcIExgjpgJl2RIxezdX4UHA+Oh-cEJcgaQBRRJczwQIMAJiVDMwTPAlBBAUVWMVAEYHHQgA)

----

```ts
function buildURL<Path extends keyof RouteQueryParams>(
  route: Path,
  ...args: (
      RouteQueryParams[Path] extends null
      ? []
      : [params: RouteQueryParams[Path]]
    )
) {
  const params = args ? args[0] : null;
  return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAeEjAJZAgAD0gQYOoAawgCdBg0LFwFYlIKSgA+AAohKHyITliJQUYnB1J1Sk5Kxi687Ag8QhIyKgBteoBdBOSIVOpuPiFuk2RhsYWuzmGAB2KqTgxe-sVBktG4OLHV7oBKOivaIQQfFWRtoeoAXmRW6iXv4YAGCacOY8TRVCBgTBQXzVXrIADUyHKrxKyCWAAMTAASGggCAAd2Q4QiAGUxFBJMcqMidpQrlZ0chOEwmFcwTYgA)

----

```ts
buildURL('/search', {query: 'do a barrel roll'})
buildURL('/search', {query: 'do a barrel roll', language: 'en'})
buildURL('/search', {})
//                  ~~ Property 'query' is missing in type '{}' ...

buildURL('/', {query: 'recursion'});
//            ~~~~~~~~~~~~~~~~~~~~ Expected 1 arguments, but got 2.
buildURL('/', null);
//            ~~~~ Expected 1 arguments, but got 2.
buildURL('/');  // ok
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAeEjAJZAgAD0gQYOoAawgCdBg0LFwFYlIKSgA+AAohKHyITliJQUYnB1J1Sk5Kxi687Ag8QhIyKgBteoBdBOSIVOpuPiFuk2RhsYWuzmGAB2KqTgxe-sVBktG4OLHV7oBKOivaIQQfFWRtoeoAXmRW6iXv4YAGCacOY8TRVCBgTBQXzVXrIADUyHKrxKyCWAAMTAASGggCAAd2Q4QiAGUxFBJMcqMidpQrlZ0chOEwmFcwTYAkEwpFyqxROIpPxaPJCMzgugvv5SFAIDxkNU+EwrDdOSFibyROTJEwhTQRYoxRK4FKoDK5QqeDqdHoDEZasxpkqVYE1Ty+VrBbRlXQ7N0-f6ugA-QPIIjVTbQMAEZj6ghMZDAajkROUDQJ3xRiPMGhWePNOh0VXciIaq16wrMmUIKGpnxOsG+gPdYMt1tt9vIACiiQjnggwWQAEYvlADORpmBKEKAmBkOp0LOAEwOQsu4uloUgtk++xNoMtrs9iB9gfD1qYcfgKf+bBzhfIZerrnq1is7TIX3odJ0IA)

----

```ts
buildURL('/');
// ^? function buildURL<"/">(route: "/"): string
buildURL('/search', {query: 'do a barrel roll'})
// ^? function buildURL<"/search">(
//      route: "/search", params: { query: string; language?: string; }
//    ): string
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalPropertyTypes=true#code/JYOwLgpgTgZghgYwgAgEoHsCukCKnoCeACnFHALYDOyA3gFDLIDkA9EwFzIiYA2PANA2YtKEUggAWHWsgCO+KAU6UwUUAHMA3Mh5wQ6zHHUQA-MtUbtAXyEsWyAHRO6NmJhAIwwdCGQAjTGAeABMAVVQAGQAeEjAJZAgAD0gQYOoAawgCdBg0LFwFYlIKSgA+AAohKHyITliJQUYnB1J1Sk5Kxi687Ag8QhIyKgBteoBdBOSIVOpuPiFuk2RhsYWuzmGAB2KqTgxe-sVBktG4OLHV7oBKOivaIQQfFWRtoeoAXmRW6iXv4YAGCacOY8TRVCBgTBQXzVXrIADUyHKrxKyCWAAMTAASGggCAAd2Q4QiAGUxFBJMcqMidpQrlZ0chOEwmFcwTYAkEwpFyqxWWC7MgAHpLNweLw+fyBELEqIAIhYcoqsMgnAVcqu5jU+jonJlPNYonEUn4tHkhGZwXQX38pCgEB4yGqfCYVhugpFyDFnm8vj13OiCqNFIkSsqgu6TpqapE5MkctNKN2MnNii1lh0egMRlM6f01joEcYmuQKm16joQA)
