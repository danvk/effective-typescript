# Item 45: Hide Unsafe Type Assertions in Well-Typed Functions

## Things to Remember

- Sometimes unsafe type assertions and `any` types are necessary or expedient. When you need to use one, hide it inside a function with a correct signature.
- Don't compromise a function's type signature to fix type errors in the implementation.
- Make sure you explain why your type assertions are valid, and unit test your code thoroughly.

## Code Samples

```ts
interface MountainPeak {
  name: string;
  continent: string;
  elevationMeters: number;
  firstAscentYear: number;
}

async function checkedFetchJSON(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to fetch! ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPeak(peakId: string): Promise<MountainPeak> {
  return checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
// ~~~~~ Type 'unknown' is not assignable to type 'MountainPeak'.
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtQw2DAuBAHKI7QomLUOLCESicTmqUyLwA9HABsBdbQsDhQABabnEZi6kFWvnRFFo3W65AAPw9HuQsK83OQAHJ6o0Wv6VsxqOg6cxmMAOB8vj9vr6UP6pWa5Tz-XtyG4gA)

----

```ts
export async function fetchPeak(peakId: string): Promise<unknown> {
  return checkedFetchJSON(`/api/mountain-peaks/${peakId}`);  // ok
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtXqjRa7QomLUOLCESicTmqUyLwA9HABsBNbQsDhQABabnEZiakFmvnRFFLKiazXIQ7kNxAA)

----

```ts
const sevenPeaks = [
  'aconcagua', 'denali', 'elbrus', 'everest', 'kilimanjaro', 'vinson', 'wilhelm'
];
async function getPeaksByHeight(): Promise<MountainPeak[]> {
  const peaks = await Promise.all(sevenPeaks.map(fetchPeak));
  return peaks.toSorted(
  // ~~~ Type 'unknown' is not assignable to type 'MountainPeak'.
    (a, b) => b.elevationMeters - a.elevationMeters
    //        ~                   ~ 'b' and 'a' are of type 'unknown'
  );
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtXqjRa7QomLUOLCESicTmqUyLwA9HABsBNbQsDhQABabnEZiakFmvnRFFLKiazXIQ7kNxdHrVOTCDlEZhjZAAbV4AHJEAIEHAOJg4MGADTIYPRYRwaTAOMJmS6KAw9PB+TQfpgXNEYCp2hwEBEuDlXNyUCkkC5pql8LSWjB8gAXR49N8-kCLOQHDUPuYACEvAAJCDADihMDk0rlSrVGoYbBgXAgH0BzuyzrDGbWv3jSbTUXLiV7FPSLKe7085h7csDLJs-6hH1FNHy7FQXHHnsPwpOgtIxFkvCOsgAB+sHILCXjcgmUrNI2Kx+o0dLMMws4fF8PzfIhKDBuuRrbjywZ7LwVBZHA8a6McoztLoewyPIijKCAqjqH6xoTKxsgKCy3HQMw1HIFBpxSdBUmyXJ0kJrowYTCA0QJjGEx9M6axgERyEgA0qEdlQFLkEAA)

----

```ts
async function getPeaksByDate(): Promise<MountainPeak[]> {
  const peaks = await Promise.all(sevenPeaks.map(fetchPeak)) as MountainPeak[];
  return peaks.toSorted((a, b) => b.firstAscentYear - a.firstAscentYear);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtXqjRa7QomLUOLCESicTmqUyLwA9HABsBNbQsDhQABabnEZiakFmvnRFFLKiazXIQ7kNxdHrVOTCDlEZhjZAAbV4AHJEAIEHAOJg4MGADTIYPRYRwaTAOMJmS6KAw9PB+TQfpgXNEYCp2hwEBEuDlXNyUCkkC5pql8LSWjB8gAXR49N8-kCLOQHDUPuYACEvAARRQQcmlcqVao1DDYMC4EA+gOd2WdYYza1+8aTaaihcSvYp6RZT3ennMPblgZZNn-UI+orHTxoQ1r-A8rfLFiioHnsPwpOgtIxFkWRwPGujHKM7S6HsximBYVhgLY1bIMaEwoSYrDocImF2BS5BAA)

----

```ts
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
  return checkedFetchJSON(
    `/api/mountain-peaks/${peakId}`,
  ) as Promise<MountainPeak>;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&target=9#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtQw2DAuBAHKI7QomLUOLCESicTmqUyWV4VGeAHo4ANgAbaFgcKAALTc4jMA0g2186IogA0vGOnlF5Uq1RqUstcp5rVc5CAA)

----

```ts
async function getPeaksByContinent(): Promise<MountainPeak[]> {
  const peaks = await Promise.all(sevenPeaks.map(fetchPeak));  // no assertion!
  return peaks.toSorted((a, b) => a.continent.localeCompare(b.continent));
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&target=9#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtQw2DAuBAHKI7QomLUOLCESicTmqUyWV4VGeAHo4ANgAbaFgcKAALTc4jMA0g2186IogA0vGOnlF5Uq1RqUstcp5rVc5C6PWqcmE8uYY2QAG1eAByRACBBwDiYOBJ13IJPRYRwaTAHN5mS6KAw0tJ+TQfpgatEYDF2hwEBEuDlatyUCkkDVprN8LSWhJ8gAXR49N8-kCLOQHDUMYAQl4AMICJQgYRgcmlH0S-0WmX4Hnx8eKzrDGZO2PjSbTb3iwlF6RZSPRnnMPatgZZNn-KE8pFEsVAGga1C-J41S0soIAbLwWKqreew-Ck6C0jEWRZHAua6McoztHAexdFuO57NI6DprIG60AMnYQFkugkZuQjgCBoZAA)

----

```ts
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
  const maybePeak = checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
  if (
    !maybePeak ||
    typeof maybePeak !== 'object' ||
    !('firstAscentYear' in maybePeak)
  ) {
    throw new Error(`Invalid mountain peak: ${JSON.stringify(maybePeak)}`);
  }
  return checkedFetchJSON(
    `/api/mountain-peaks/${peakId}`,
  ) as Promise<MountainPeak>;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtQw2DAuBAHKI7QoVC6PVocC8+nlYzCESicTmqUyLwA9HABsBjbQsDhQABabnEZjGkEOvnRFFoqirda8KgbNUaiBagA+wd93y83PQawDmp5yA2o3GAHJ0LoiREwMnkKHwxsssnjKYLFYwLY4FBs6BkLGgzyirxjkrTudLtc7g90E9nryQAppMBojXrTLq66mCDDRk9mJOKsvFla-Kih7lhi8dioLjErqYvF-sl0tlw89TebLSPZfaeU6XTz+SiADSNibMUXlSrVGpSm1ynmtVxyCAA)

----

```ts
export async function fetchPeak(peakId: string): Promise<MountainPeak>;
export async function fetchPeak(peakId: string): Promise<unknown> {
  return checkedFetchJSON(`/api/mountain-peaks/${peakId}`);  // OK
}

const denali = fetchPeak('denali');
//    ^? const denali: Promise<MountainPeak>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgLIHsCu46gAoRwDWyA3gFDLIhwC2EAXMgM5hSgDmA3JcguuFARwTVuxDdeEADYQAbnDDABqCJCjMmITLQBG0HlRjANYAILMk4AJqEoWnfqg8AvuXJxmATxAJkMbAQlAT4ACwgEIggAEwAxNQRQgCkAZQB5ADkACkwoaVE2TgBKJjwodFpgZggAHmwiEHQAdxAAPjJefhBWZCgIZgAHAWrkAF5kOCbcMH8E0Jy8osNkYBhkLIBCPsHhiAA6dCIijqoqMFDypuoIK4BRKHKoLIADAFUaXVlkMHRZsESNsgACSkbZDbr7ViKTDMAAqEAAHmAXM8lrw3FQ+mBciBev1wdU9gArZgCLJotzkRFDKAzTw+PwBXzBXEwOYEYhZAaEIgASWiBXEHBKyDKFSqtQw2DAuBAHKIrR41PQtIm3l8-kCLL+iXlXJ5-MFxVK5Uq1TqIAazTaJzx2KguMSESicTmqUyLwA9HABsBPbQsDhQABabnEZiekFhvnRFFLKiez3INIAaXIlK6PWiwjg0mAYx1oT1AHJszQ88W0YnTsgAHoAfj4wxmZdzwBN4vNUqDcp5rXIQA)

----

```ts
function shallowObjectEqual(a: object, b: object): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== b[k]) {
      //                      ~~~~ Element implicitly has an 'any' type
      //                           because type '{}' has no index signature
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwBYEMA2m4HcDyARgFYCm0AogI4hYAU6AXInCeVADSKHOtnQBKZoThxMpdEgDeAKESJgcAE6I6EBMiiIA2gGsu6AGpYAui2CIi-KADpSYKEpilkDAQMSz58mBboBCOl1EGCRCDwAfCMQjLER-AF4E7j0TDy9veQB6LMy8-IKAP2LCxApxAFt7LRgKgAdMGAgYKEwAT0QMZBikAHJJNt7EKDa60jk8nILpme9CcnQQZFJh0ZXeqQBfIa7EMDgQsAATUgAPFBgAczB0KBAlcfyHu6UkYCxlgG4J+U2Jv-kz3uSCs7BsulIbVc6AENnEYEuUFQiCSyVB0HBkNc4Th9kRqG+fyAA)

----

```ts
function shallowObjectEqualBad(a: object, b: any): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== b[k]) {  // ok
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwBYEMA2m4HcDyARgFYCm0AogI4hYAU6AXInCeVADSKHOtnQBKZoThxMpdEgDeAKESJgcAE6I6EBMiiIA2gGsu6AGpYAui2CIi-KADpSYKEpilkDAQMSz58mBboBCOl1EGCRCDwAfCMQjLER-AF4E7j0TDy9veQB6LMy8-IKAP2LCxApxAFt7LRgKgAdMGAgYKEwAT0QMZBikAHJJNt7EKDa60jk8nILpme9CcnQQZFJh0ZXeqQBfIa7EMDgQsAATUgAPFBgAczB0KBAlcfyHu6UkYCxlgG4J+U2Jv-kz3uSCs7BsulIbVc6AENnEYEuUFQiCSyVB0HBkNc4Th9kRqG+f1AkFgCBQGGweHRUGotEwACF0EcGLw2NAuDwem0hNxROJJJ4JooVGoNFo9AZjJgzHALNS7A4nC43OkfiE-IFgqFuJForFMPEkildGlPNlcnBdGrAaQXm8PqRvpkAYgXUDXpY2bYIVC3LiEUiUUb5T7sbD4fjCTIgA)

----

```ts
shallowObjectEqual({x: 1}, null)
//                         ~~~~ Type 'null' is not assignable to type 'object'.
shallowObjectEqualBad({x: 1}, null);  // ok, throws at runtime
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwBYEMA2m4HcDyARgFYCm0AogI4hYAU6AXInCeVADSKHOtnQBKZoThxMpdEgDeAKESJgcAE6I6EBMiiIA2gGsu6AGpYAui2CIi-KADpSYKEpilkDAQMSz58mBboBCOl1EGCRCDwAfCMQjLER-AF4E7j0TDy9veQB6LMy8-IKAP2LCxApxAFt7LRgKgAdMGAgYKEwAT0QMZBikAHJJNt7EKDa60jk8nILpme9CcnQQZFJh0ZXeqQBfIa7EMDgQsAATUgAPFBgAczB0KBAlcfyHu6UkYCxlgG4J+U2Jv-kz3uSCs7BsulIbVc6AENnEYEuUFQiCSyVB0HBkNc4Th9kRqG+f1AkFgCBQGGweHRUGotEwACF0EcGLw2NAuDwem0hNxROJJJ4JooVGoNFo9AZjJgzHALNS7A4nC43OkfiE-IFgqFuJForFMPEkildGlPNlcnBdGrAaQXm8PqRvpkAYgXUDXpY2bYIVC3LiEUiUUb5T7sbD4fjCTI0FgcAQvbT6FJTswAIybLhgEDYAQyKazAveEqlAAqa0QvSz2CGMG6+y06GQyCuN0I4mGBxGYwrfHYvRs0YpcepiYZTLoybTGb22cwAk+5pY+mGqCUeG6t0QSnAsCqMiAA)

----

```ts
function shallowObjectEqualGood(a: object, b: object): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== (b as any)[k]) {
      // `(b as any)[k]` is OK because we've just checked `k in b`
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwBYEMA2m4HcDyARgFYCm0AogI4hYAU6AXInCeVADSKHOtnQBKZoThxMpdEgDeAKESJgcAE6I6EBMiiIA2gGsu6AGpYAui2CIi-KADpSYKEpilkDAQMSz58mBboBCOl1EGCRCDwAfCMQjLER-AF4E7j0TDy9veQB6LMy8-IKAP2LCxApxAFt7LRgKgAdMGAgYKEwAT0QMZBikAHJJNt7EKDa60jk8nILpme9CcnQQZFJh0ZXeqQBfIa7EMDgQsAATUgAPFBgAczB0KBAlcfyHu6UkYCxlgG4J+U2Jv-kz3uSCs7BsulIbVc6AENnEYEuUFQiCSyVB0HBkNc4Th9kRqG+f1AkFgCBQGGweHRUGotEwACF0EcGLw2NAuDwem0hNxROJJJ4JooVGoNFo9AZjJgzHALNS7A4nC43OkfiE-IFgqFuJForFMPEkildGlPNlcnBdGrAaQXm8PqRvpkAYgXUDXpY2bYIVC3LiEUiUUb5T7sbD4fjCTJidB4Eg0FgcAQvbSsABxUTMpgsL0c1nWHkiMQSaRC5SqdRgTQ6fQxKUyuVehWOZzQ9yCzK+VSaw46xBROtxRLJOiEGLdAYCVKq-JTAAGo-HXKnJrnIW6+AA0twFksVrhSL0AG4rYhLLQQVDkCFHRBzrVhOfWxDu+2YL5ql1u23Az3WTG+jC-r4kGaJNqGo7hniSJRkAA)
