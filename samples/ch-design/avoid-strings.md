# Item 35: Prefer More Precise Alternatives to String Types

## Things to Remember

- Avoid "stringly typed" code. Prefer more appropriate types where not every `string` is a possibility.
- Prefer a union of string literal types to `string` if that more accurately describes the domain of a variable. You'll get stricter type checking and improve the development experience.
- Prefer `keyof T` to `string` for function parameters that are expected to be properties of an object.

## Code Samples

```ts
interface Album {
  artist: string;
  title: string;
  releaseDate: string;  // YYYY-MM-DD
  recordingType: string;  // E.g., "live" or "studio"
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIIBsBGBXAtsgbwChlk4oxgBnMALmRqlAHMBuE5SsdCexl9qSgQecKhAAicSHzBMQbUgHolyAJoa1AWgCyOrRIkdhCAPZQAJiwAqATwAOvBnIHLVAUQB0zTwBpkAETowABuEAHI5oE02FamAUQAvkRAA)

----

```ts
const kindOfBlue: Album = {
  artist: 'Miles Davis',
  title: 'Kind of Blue',
  releaseDate: 'August 17th, 1959',  // Oops!
  recordingType: 'Studio',  // Oops!
};  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIIBsBGBXAtsgbwChlk4oxgBnMALmRqlAHMBuE5SsdCexl9qSgQecKhAAicSHzBMQbUgHolyAJoa1AWgCyOrRIkdhCAPZQAJiwAqATwAOvBnIHLVAUQB0zTwBpkAETowABuEAHI5oE02FamAUQAvkRmIDTIANagFgDyMABC6NhOGDj4ALyEHOSUNPQA5DrAPFTIUiHU9b4cXDwNANLZkTDIhcVdxiIQYpLSTvWo2MzY6QCMAOxgABb+qwCcAKx7XW7IOab2VACEk2aWNg7zAMpgscCmJ8gqZxfXSaynHL9IhAA)

----

```ts
function recordRelease(title: string, date: string) { /* ... */ }
recordRelease(kindOfBlue.releaseDate, kindOfBlue.title);  // OK, should be error
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIIBsBGBXAtsgbwChlk4oxgBnMALmRqlAHMBuE5SsdCexl9qSgQecKhAAicSHzBMQbUgHolyAJoa1AWgCyOrRIkdhCAPZQAJiwAqATwAOvBnIHLVAUQB0zTwBpkAETowABuEAHI5oE02FamAUQAvkRmIDTIANagFgDyMABC6NhOGDj4ALyEHOSUNPQA5DrAPFTIUiHU9b4cXDwNANLZkTDIhcVdxiIQYpLSTvWo2MzY6QCMAOxgABb+qwCcAKx7XW7IOab2VACEk2aWNg7zAMpgscCmJ8gqZxfXSaynHL9IgwbAgBCUUwgZAmcwWABKUxmAApek5+Ap-BY5rJ5MwAJSEL4AKmQnnJyGJqmSsMsiNE4mRWRAuQKRQgnmEDNmkH8zNZYw5aPxAK+qiB-ioW1M2HQFmQmBQ0Cg5iIQA)

----

```ts
type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDGB7ATgEwJYDsDmAVc0AvFAOQDOwArhoiVAD6kA26AbhCQNwBQ3WwEZADMAhvGgBBJgCNKAWygBvblCgjkwdBQBcUCsizYeqzcCYRd+w8ajII5kWQgAREQN2uBNu0jSH8kLpwvhg4ARA8AL7cQA)

----

```ts
const kindOfBlue: Album = {
  artist: 'Miles Davis',
  title: 'Kind of Blue',
  releaseDate: new Date('1959-08-17'),
  recordingType: 'Studio'
// ~~~~~~~~~~~~ Type '"Studio"' is not assignable to type 'RecordingType'
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDGB7ATgEwJYDsDmAVc0AvFAOQDOwArhoiVAD6kA26AbhCQNwBQ3WwEZADMAhvGgBBJgCNKAWygBvblCgjkwdBQBcUCsizYeqzcCYRd+w8ajII5kWQgAREQN2uBNu0jSH8kLpwvhg4ARA8AL7cSJgUUADWWKgA8kIAQkyUFlBSsgrEyqrqmjqkALLo5mRQrqxaJAA0KlCm5rokANLJUIhCUJnZTS12Dk6eOZgQAO61bhAAFCQAjACcAKyrALQADAAcW8sA7CQAlM2qPiiheAQdAMpUNCTcAPSvUAB+3z+-31DhUgAIke1HQiCBdC0UEwiGAajIZHQ2EwImk5laiFaBFIwWu-gIL0iPCAA)

----

```ts
function getAlbumsOfType(recordingType: string): Album[] {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDGB7ATgEwJYDsDmAVc0AvFAOQDOwArhoiVAD6kA26AbhCQNwBQ3WwEZADMAhvGgBBJgCNKAWygBvblCgjkwdBQBcUCsizYeqzcCYRd+w8ajII5kWQgAREQN2uBNu0jSH8kLpwvhg4ARA8AL7cQpSY8JqImFDYEMBSsnJkAPJC4QAUPiiheASWwAY4AJS6GfIA2gC6SipQAPRtUADC2QCyAAowAKIAyiOtdlTIyU02HVBDAHLO3NHcQA)

----

```ts
/** What type of environment was this recording made in? */
type RecordingType = 'live' | 'studio';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PQKhAIHUAsEMBdzwJ4AcCm4D2Azc6A7ANwEsAnLAgW0MQHdYBnJaE5s9AYyzIBMSCAc3BVYvTAID84EMABQKDOABKXHvyEAVNJgC84AOQAbEkXQHwAH0ON4AV35YDAbjlA)

----

```js
function pluck(records, key) {
  return records.map(r => r[key]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwDYggawBQCcCmEcuAJgM4A0im+AngJSIDeAUIogVCLkgUaWQB0AWwCGyPIgC8APg4BtGrQC69ANwsAviyA)

----

```ts
function pluck(records: any[], key: string): any[] {
  return records.map(r => r[key]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwDYggawBQCcCmEcuAJgM4BciAhmAJ4DaAugDSKb51VlS4xgBzAJRVajJogDeAKESICUELiQEipMgDoAttWR5EAXgB88hhzpMhAbmkBfaUA)

----

```ts
function pluck<T>(records: T[], key: string): any[] {
  return records.map(r => r[key]);
  //                      ~~~~~~ Element implicitly has an 'any' type
  //                             because type '{}' has no index signature
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwDYggawDwBUB8AFAE4CmEcxAJgM4BciuA2gLoA0impAngzVMRhgA5gEoGAQzDdWiAN4AoRIjJQQxJGQrUaAOgC2E5CUQBefCqZduLUQG4liAPRPlb9x8-KAfr7+IAUVRSfVIwKEQYfTQYCBgoVG5EAAsJGkQpRAByKW4sxChuZFJHFy9yio8AI3IJEBpSAqLGrLkAX3zU9LA4SLAqUgAPRBoYYTAJNTIFNoUgA)

----

```ts
type K = keyof Album;
//   ^? type K = keyof Album
//      (equivalent to "artist" | "title" | "releaseDate" | "recordingType")
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDGB7ATgEwJYDsDmAVc0AvFAOQDOwArhoiVAD6kA26AbhCQNwBQ3WwEZADMAhvGgBBJgCNKAWygBvblCgjkwdBQBcUCsizYeqzcCYRd+w8ajII5kWQgAREQN2uBNu0jSH8kLpwvhg4ARA8AL7coJBQANJQxADWECCIQlBSsnI8APR5qlAAegD8ULHQiSlpGVky8jEEsBBkiEzsADwwIgDuAHxJsH1QEAAeApioZFAAYpSY8JqImFDlPb1QuooA2olYUKnpmRsAukF9e6eRPJVQAMogmMAAFtUtbR0QnfH9+YWqMoVZqPZ5vIYAInUmgoEIYUAhpnMcMYELsDicnggKIRPhQoTwBAhvCAA)

----

```ts
function pluck<T>(records: T[], key: keyof T) {
  return records.map(r => r[key]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDGB7ATgEwJYDsDmAVc0AvFAOQDOwArhoiVAD6kA26AbhCQNwBQ3WwEZADMAhvGgBBJgCNKAWygBvblCgjkwdBQBcUCsizYeqzcCYRd+w8ajII5kWQgAREQN2uBNu0jSH8kLpwvhg4ARA8AL7cQpSY8JqImFBgTJTwANYAPLgAfAAUPiioZLq4ANoAugA0UBkQILr1IIhCULgAlEoqthBUyMlFaGQAdHIiYIVQhLm25c2VHVHcQA)

----

```ts
const releaseDates = pluck(albums, 'releaseDate');
//    ^? const releaseDates: (string | Date)[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDGB7ATgEwJYDsDmAVc0AvFAOQDOwArhoiVAD6kA26AbhCQNwBQ3WwEZADMAhvGgBBJgCNKAWygBvblCgjkwdBQBcUCsizYeqzcCYRd+w8ajII5kWQgAREQN2uBNu0jSH8kLpwvhg4ARA8AL7cQpSY8JqImFBgTJTwANYAPLgAfAAUPiioZLq4ANoAugA0UBkQILr1IIhCULgAlEoqthBUyMlFaGQAdHIiYIVQhLm25c2VHVHcqAhM6tDmwGoy8qVQUrJyVTxImBS9Dk6eEGTTKWmZ+SK7cmS1JHZXLm4cS9wAegBqlUAD0APxQM4XL4QRw-AT7fJWHAMKA3DpVbhAA)

----

```ts
function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map(r => r[key]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwDYggawDwBUA0iA0ogKYAeUpYAJgM6KakCecwiuAfABQBOpEOL3oAuDgG0AuoSbMxRAJRjc4opKmIA3gChEiflBC8k-QcLoA6ALYBDZH0QBeTvvGzJCgNzaAvtqA)

----

```ts
const dates = pluck(albums, 'releaseDate');
//    ^? const dates: Date[]
const artists = pluck(albums, 'artist');
//    ^? const artists: string[]
const types = pluck(albums, 'recordingType');
//    ^? const types: RecordingType[]
const mix = pluck(albums, Math.random() < 0.5 ? 'releaseDate' : 'artist');
//    ^? const mix: (string | Date)[]
const badDates = pluck(albums, 'recordingDate');
//                             ~~~~~~~~~~~~~~~
// Argument of type '"recordingDate"' is not assignable to parameter of type ...
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwDYggawDwBUA0iA0ogKYAeUpYAJgM6KakCecwiuAfABQBOpEOL3oAuDgG0AuoSbMxRAJRjc4opKmIA3gChEiflBC8k-QcLoA6ALYBDZH0QBeTvvGzJCgNzaAvtqjMyKSIAEoCQjQwYADmuIHBjogA5HSGkXBJiAA+yagwAG6kSd7aUVS8wDYQwQCCqABGIFZauog2vLCpYqm8UdHeerBQqKTdUL0xA-qkIzZ0pAAiNlRiS1RTphF9cUFiYWaRMTuk3n40AqjtwSNQbQ1NdGJ1jVZS3oJgqYg0y6QMiWgMJhuDZ7lY6IQkvxZvM1kUvNoAPSIvR6AB6AH5EB8vj8qI9EHCpNocbd2p0oP8UOgsCCwRDkuSYKkkgjkajEJjsQgvkzUgSen1iaTEAEglTAbTQS8GVDwsJtvFWd52aiuSKxX89vLDrF4sKebcrDByE5qUC6TLCABZZYACwsvBstDgVm4CkQ2EQAAYLABWRBYuUwxa-TJiJJ8qDKpEotVYkXG8hibiCmLZQm-BQGz63eo2GhwiU04HSh6QzYKmJwmOqjn1huN+sAP1bbfbHdjiBqvGiTWotzYoviyQARJXdXDR5lmYgwHAyXQ6DBomAbPURqK4Ch2jYrKRyogh5rEBYz9ogA)
