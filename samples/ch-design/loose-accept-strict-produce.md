# Item 30: Be Liberal in What You Accept and Strict in What You Produce

## Things to Remember

- Input types tend to be broader than output types. Optional properties and union types are more common in parameter types than return types.
- Avoid broad return types since these will be awkward for clients to use.
- To reuse types between parameters and return types, introduce a canonical form (for return types) and a looser form (for parameters).
- Use `Iterable<T>` instead of `T[]` if you only need to iterate over your function parameter.

## Code Samples

```ts
declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMJwLbTgeQA5jAD2IAzsgN4BQyyS40A-AFzIAyIA5m3GANw1kALyJEMLZCACuGAEbQBteXCihOE6XIWC8wMAgAWGmfKgCAvlTABPPCg7deyALyCKyADZdWm030+8PiYKyObIAD5uniRBWmYBYLF+oRGCANq+0AA0ksFQALoCNnbsXDxgAEJEUiAAJuSutBQgRFBgBhBwpImljmA5pNXtAO4Q3awO5WGRtGmTvDnzYPmps5lQOeubedtxhVS1EAgeKigwNQiEJMikEGDoWFBwABQImNisD9j4V2QAlKwAG5EYC1ASHY6nZDnECXYggZCA4AQYZ4VpgABirSqNXqz1k1TqpAmZV4OKJALQ7yeP3hpAEQA)

----

```ts
interface CameraOptions {
  center?: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}
type LngLat =
  { lng: number; lat: number; } |
  { lon: number; lat: number; } |
  [number, number];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMJwLbTgeQA5jAD2IAzsgN4BQyyS40A-AFzIAyIA5m3GANw1kALyJEMLZCACuGAEbQBteXCihOE6XIWC8wMAgAWGmfKgCAvlTABPPCg7deyALyCKyADZdWm030+8PiYKyObIAD5uniRBWmYBYLF+oRGCANq+0AA0ksFQALoCQA)

----

```ts
type LngLatBounds =
  {northeast: LngLat, southwest: LngLat} |
  [LngLat, LngLat] |
  [number, number, number, number];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMJwLbTgeQA5jAD2IAzsgN4BQyyS40A-AFzIAyIA5m3GANw1kALyJEMLZCACuGAEbQBteXCihOE6XIWC8wMAgAWGmfKgCAvlTABPPCg7deyALyCKyADZdWm030+8PiYKyObIAD5uniRBWmYBYLF+oRGCANq+0AA0ksFQALoCNnbsXDxgAEJEUiAAJuSutBQgRFBgBhBwpImljmA5pNXtAO4Q3awO5WGRtGmTvDnzYPmps5lQOeubedtxhVRAA)

----

```ts
function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f); // helper function
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const {center: {lat, lng}, zoom} = camera;
               // ~~~      Property 'lat' does not exist on type ...
               //      ~~~ Property 'lng' does not exist on type ...
  zoom;
  // ^? const zoom: number | undefined
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMJwLbTgeQA5jAD2IAzsgN4BQyyS40A-AFzIAyIA5m3GANw1kALyJEMLZCACuGAEbQBteXCihOE6XIWC8wMAgAWGmfKgCAvlTABPPCg7deyALyCKyADZdWm030+8PiYKyObIAD5uniRBWmYBYLF+oRGCANq+0AA0ksFQALoCNnbsXDxgAEJEUiAAJuSutBQgRFBgBhBwpImljmA5pNXtAO4Q3awO5WGRtGmTvDnzYPmps5lQOeubedtxhVS1EAgeKigwNQiEJMikEGDoWFBwABQImNisD9j4V2QAlKwAG5EYC1ASHY6nZDnECXYggZCA4AQYZ4VpgABirSqNXqz1k1TqpAmZV4OKJALQ7yeP3hpCKthQGM6YCkUBQzmQcBA1nBRxO7OhF1+dDgHgQUhOkHJtTUVQAHs8YKxmbw2RBKRkdrk4rtTHroPsYXDrjAiBLSDgQKrWeylSqWeq-pRBAgSN1kATcQ1ReLJbwIDK5URFTA-v4APQR5AdDx2KBC2G-V3usCix5wFyI5Go9FYqAy0j4wn1cOCW73akvN4Zsu0N1kNMUeiQKCsChSnJeTjmHIiMRhTk17CKWhj8cTqPIAB+s4nyAAClAiPGbMgAORS9fIWpEMaSIhpiDy4Ae67FFAAOmvgnnd6nE9n08Xy9X1g33e3u-3LSPJ7PCIXsg16XoI-YYKOU4AHqMHQqbCKIGBJNAETILiEAwKAEC1IIwygLuwyXh45q8PCl63CohhZgABowgLOAAAgAJB2vC9ix3bmEILHgeY1EWFQQA)

----

```ts
interface LngLat { lng: number; lat: number; };
type LngLatLike = LngLat | { lon: number; lat: number; } | [number, number];

interface Camera {
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
}
interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
  center?: LngLatLike;
}
type LngLatBounds =
  {northeast: LngLatLike, southwest: LngLatLike} |
  [LngLatLike, LngLatLike] |
  [number, number, number, number];

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): Camera;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIgOarmZBvZAG0wC5kQBXAWwCNoBuInMy2h5AX3oCgwBPAA4p0WHKmABrFAF40mbLgA++IgHsQLanSiNCzclvYdkygNqttAGgNsoAXR7dQkWIhQBhOFWhx83ZMhI4NBkIgo8AQBeqqpUmrYRyHRwUKAY8dqJAsBgCAAWGQzcHE7BrkjInt5QcADyAmDA6gDOyBAAHpAgACattVQ5ADwACimNcISDVT4AfNYA5EEu8zN+AUvQAPyh8mKSEDwl-EJyomAAQqoUPa3S-vggqlBgeRBwzWA7Z+JS1s1XLwA7hAPl8FD8IMZFPdTGE9r9TuD9nYTDCLNBrOioJjDNibNoHNxuN0IAg9FAUDBrghGupkM0IGBpjUABQILw+MjMuoNJogZoASjIADdVMBujwSWSUpTqbSQMhhcAIICBE8wAAxJ6Xa69Fk0K43ME4HU3IWVDk1HhAA)

----

```ts
interface CameraOptions {
  center?: LngLatLike;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgDIgOarmZBvZAG0wC5kQBXAWwCNoBuInMy2h5AX3oCgwBPAA4p0WHKmABrFAF40mbLgA++IgHsQLanSiNCzclvYdkygNqttAGgNsoAXR6hIsRCgDCcKtDgB5AWGB1AGd8bmRkJHBoAH4yEQVxKR5wgC9VVSpYm21k5Do4KFAMLIsGMOQBYDAEAAsSwx1uDm4gA)

----

```ts
function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const {center: {lat, lng}, zoom} = camera;  // OK
  //                         ^? const zoom: number
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAYhCGwCuAnaBeK8B2IDcAUACYQDGANvGlAGZLanACWA9tlKfOaUpcBACEW9Ik2wBzIQA8AFDQBcsBMjQBKRQG1sSALYAjCCgA0UbfsMmzB46d3WAuoTH8UNeKWgAZCZ8RQA3lDkEopWhnhBiKF24VAAvoSgkFDe4r7AnkwA1hgpPn4APgFBbNHmKBF8ZdYRcVBFWjE2YSiOBATOhm4eUADC8DqG8AEEUBwQ2C6KqemEYwBeLCw61eGjUAZUYuKrFetgTMCkABa7hHEdk13u0P2DKPAA8mDMbADOUBBS-NhEH486Q4AHgAClRmFwgXchgA+EwAcg8VxQ8JhIzGSJcAH5pvkMtkIOcCEkvHihCIPuh1v5sCwUMBjgg3sBcWlEJkciY3sIGQB3CDM1npDkQOoFdYaGbsgkmKX4nL2eoSlqWJqq8rqhyEYhkSjUOgMV7sN4QYDQh4yTj3eCKc1PF6sbBvdRQABuLCYREIJAoVGgBsYjrdTAgvLAdOAMDp5N+bxkemEsaFiBjfxddsIAaNtBYPDej2wcEQqAgckURZUEFU6I472AG0TfygmE43F4iEEje20jkqjmtad9atQ2bwdD4fpUZQqbjCYpffWJrNAyGlpXDwXGLrAUxhkU-j4JmC4jiJkWyzqLfX8AiUAA9HeoI8ANLrB9jD+fr-fr8APSxA7MlA54rLY5TrLyYhECwvIAHTkLmiCOrBJpUCco4AAZYq66AAAIACQHogp6EcecTzIRIFxBhRJAA)

----

```ts
function sum(xs: number[]): number {
  let sum = 0;
  for (const x of xs) {
    sum += x;
  }
  return sum;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBQA9kC5FjoBGApgE4DaAugJT6FqlmIDeAUIogDYlQrqIAvIgAMAbg6JgcZhggJkfLIjjBEOGq0mdUaRAGphWCZwC+ksrxBkkuieaA)

----

```ts
function sum(xs: Iterable<number>): number {
  let sum = 0;
  for (const x of xs) {
    sum += x;
  }
  return sum;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBQA9kC5ECSUApgE4CGARgDbEA8Y6lZAfAJT6NrOmIDeAKESJaUFOkQBeRAAYA3EMTA4vDBATIxWRHGCIcbfouGo0iANTSsC4QF9FpYlBCkkphfaA)

----

```ts
const six = sum([1, 2, 3]);
//    ^? const six: number
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBQA9kC5ECSUApgE4CGARgDbEA8Y6lZAfAJT6NrOmIDeAKESJaUFOkQBeRAAYA3EMTA4vDBATIxWRHGCIcbfouGo0iANTSsC4QF9FpYlBCkkphffVhNKGNummGADaAIwANIgATBEAzAC6bAoA9EnCwgB6APyIXj7IfpxMZAJAA)

----

```ts
function* range(limit: number) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}
const zeroToNine = range(10);
//    ^? const zeroToNine: Generator<number, void, unknown>
const fortyFive = sum(zeroToNine);  // ok, result is 45
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZxAWwBQA9kC5ECSUApgE4CGARgDbEA8Y6lZAfAJT6NrOmIDeAKESJaUFOkQBeRAAYA3EMTA4vDBATIxWRHGCIcbfouGo0iANTSsC4QF9FpYlBCkkphfdCRYCAFSIKMABzYgxqGDQYKE4mMkNBYWVVUUQYKVk5VMQ6EQiozJhzc3jjRABPGGJqABNUm0R7e3UwTUQALzI4ABU4ADkYMGJ0wJCMAEYZNgUAemnhYQA9AH5EZtaO0m6+geJ8AHFiQYooFQZY0gAaRAA3OBhqq-AAazA4AHcwFgE1sSSoMoAYjBrkNpKYMBstv1BlNhLMdE8ro5UNQxDBkIgACwAVgEQA)
