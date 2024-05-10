# Item 56: Pay Attention to How Types Display

## Things to Remember

- There are many valid ways to display the same type. Some are clearer than others.
- TypeScript gives you some tools to control how types display, notably the `Resolve` generic. Make judicious use of this to clarify type display and hide implementation details.
- Consider handling important special cases of generic types to improve type display.
- Write tests for your generic types and their display to avoid regressions.

## Code Samples

```ts
type T123 = '1' | '2' | '3';
//   ^? type T123 = "1" | "2" | "3"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgjAJgMxQLxQORw1APphHfDJDAbgCgB6KqOgPQH4pRJZEV0AiOLvKLgj74uSLhSA)

----

```ts
type T21 = '2' | '1';
//   ^? type T21 = "2" | "1"

type T123 = '1' | '2' | '3';
//   ^? type T123 = "2" | "1" | "3"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgTARigXigcjmqAfdC0DcAUAPQlQUB6A-FKJLIilAERws6sItFH3QwEcAMzM0+Thiy40wwqXJVa-WENGo2HXC26cWwnkA)

----

```ts
type PartiallyPartial<T, K extends keyof T> =
  Partial<Pick<T, K>> & Omit<T, K>;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBACghgJ2ASzgGzSeTVoDwAqANFANJQQAewEAdgCYDOUA1hCAPYBmUBAfFAC8AKCixEKdHhjIAxi0IlSfAQDIoAeQC2yYIrJ8A3MKA)

----

```ts
interface BlogComment {
  commentId: number;
  title: string;
  content: string;
}

type PartComment = PartiallyPartial<BlogComment, 'title'>;
//   ^? type PartComment =
//          Partial<Pick<BlogComment, "title">> &
//          Omit<BlogComment, "title">
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBACghgJ2ASzgGzSeTVoDwAqANFANJQQAewEAdgCYDOUA1hCAPYBmUBAfFAC8AKCixEKdHhjIAxi0IlSfAQDIoAeQC2yYIrJ8A3MOS0aCLnFnQAQmg4BzAMIctWusCgBvUVFmv3MwBJegAuKFoAVy0AIwgEYzEUYDQIcMZgBFMHRL8OMw90zOzjAF9hYVBIcSQXNw8hGskMLAlcPDtHOsDgEgByZNS+o2EAelGxKAA9AH4oKuhsYG6GkXHJjcml9pl5DvtnAI8SACJBiBOVKFUxic2N7V19rqOzU-PL4SA)

----

```ts
type Resolve<T> = T extends Function ? T : {[K in keyof T]: T[K]};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKCA)

----

```ts
type PartiallyPartial<T, K extends keyof T> =
  Resolve<Partial<Pick<T, K>> & Omit<T, K>>;

type PartComment = PartiallyPartial<BlogComment, 'title'>;
//   ^? type PartComment = {
//          title?: string | undefined;
//          commentId: number;
//          content: string;
//      }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAAVTIw5TZGQQcsr2auwAGihJMmzaKDkFZVwCT1gEFHQMeqrkMfYWGRa2nDwAMigAeSd2YDnxBf0i8Ghxxxc3AjKKidrxxsnrOyO-YFaAcjiEp5x9AHpPrygAPT4xQO53uJ0Iwj031+0N+rwgPFyqUotigAB8oMxqBBFNIINQvj8YdCfMd-EEQmFItFIYSiV4fP43Ij8jSiYUgA)

----

```ts
type ObjIdentity<T> = {[K in keyof T]: T[K]};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAHlwgCsgt3ZQbDxCMUlpKDkFZSw1Ik1dPSA)

----

```ts
type S = ObjIdentity<string>;
//   ^? type S = string
type N = ObjIdentity<number>;
//   ^? type N = number
type U = ObjIdentity<'A' | 'B' | 'C'>;
//   ^? type U = "A" | "B" | "C"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAHlwgCsgt3ZQbDxCMUlpKDkFZSw1Ik1dIvBoAGUCMsrq-1qQDGTUylscfQB6Ba8oAD0+YsHh6bS+koA5YfKq6hq60Iio+b0llfWoTahDwgvIoz3oAFUj0dPxuoA5ABBAFQAA+UABllBEIB9gB11uXnuj2+hAARED0eCoOjLNiIej7Oi9EA)

----

```ts
type F = ObjIdentity<(a: number) => boolean>;
//   ^? type F = {}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAHlwgCsgt3ZQbDxCMUlpKDkFZSw1Ik1dIvBoegIyyur-WpAMAApTELDIowBKAjxwxBQIU0ocfQB6Ha8oAD0+YoGh4UKgA)

----

```ts
type D = Resolve<Date>;
//   ^? type D = {
//        toLocaleString: {
//            (locales?: Intl.LocalesArgument,
//             options?: Intl.DateTimeFormatOptions | undefined): string;
//            (): string;
//            (locales?: string | string[] | undefined,
//             options?: Intl.DateTimeFormatOptions | undefined): string;
//        };
//        ... 42 more ...;
//        [Symbol.toPrimitive]: {
//            ...;
//        };
//      }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAHlwgCsgt3ZQbDxCMUlpKDkFZSw1Ik1dIvBoABECWAQUdAwB0wocfQB6Wa8oAD0+YsHh4T15xZ2oYEQAGUQWUwSAZTzKWyFN7d37gAobE4T4HiEA-2QAOiOXhAAgkZbGE3AAaLYLe73RBgDhcN4fL7fSYULDsVz0RBGJxTUpwziUOgAHygzGoEEU0gg1AAlLlUlc5lDoYsHvSoMlGelIaydk9jqcEO9OZdbFBSVy0qIVBKyTRKdTqBC7nyvLD4USRZ94iiphB0ZjsbjgPjNST5RSqZQaRypUzedDeqrdt83VAACwAJigTmx0Dd32ZrNEZxAERQ332AAVUk5aux0F1biy+YHg06MztCkA)

----

```ts
interface Color { r: number; g: number; b: number; a: number };
type Chan = keyof Color;
//   ^? type Chan = keyof Color
type ChanInline = Resolve<keyof Color>;
//   ^? type ChanInline = "r" | "g" | "b" | "a"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAHlwgCsgt3ZQbDxCMUlpKDkFZSw1Ik1dA38oswsoRxsjESgjELDI6KhbKYionShwhZnl0zWoqF7i6HsAC1NuQjalYZREaL0AehuvKAA9Pj3ho5PW+XORq6LwffeAUoyGk0EIcCQaEwZ2UPyMOH0dwezygr0OxyBIMoYKgACIjLioAAfPG2Qkk3Hhcl40y4vRAA)

----

```ts
type FullComment = PartiallyPartial<BlogComment, never>;
//   ^? type FullComment = {
//             title: string;
//             commentId: number;
//             content: string;
//           }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&exactOptionalTypes=true#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAHlwgCsgt3ZQbDxCMUlpKDkFZSw1Ik1dIvBoAAVTIw5TZGQQIZH2MewAGihJMmzaVvklIgbPWAQUdAwp0eQD9hYZecWcPAAyMqdai-Er-T6Sw8cXNwIoQ5nxyeGRww1jsHz8wAWAHI4glITh9AB6BFeKAAPT4xUGgLBX0aeiRKMJKJhEB4uVSlFsUAAPlBmNQIIppBBqIjkUTCT5Pv4giEwpFovj2RyvD5-G5yfkhRzCpiGIxxjj-N9fmMJqrjiCHL43AtKBB0EZ4dKvOioHKmIqdcq8QSRUSSZLKWz7USueDeVBQhEoi7XSixdlgE70ibXYUgA)

----

```ts
type PartiallyPartial<T extends object, K extends keyof T> =
  [K] extends [never]
  ? T  // special case
  : T extends unknown  // extra conditional to preserve distribution over unions
  ? Resolve<Partial<Pick<T, K>> & Omit<T, K>>
  : never;

type FullComment = PartiallyPartial<BlogComment, never>;
//   ^? type FullComment = BlogComment
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAShDOB7ANgNwgHgCoD4oF4osoIAPYCAOwBN4oAxAV0oGNgBLRSqAfiKgBcUAN4BtANJR23ANYQQiAGZEAukKwSVAXwDcAKGkUATooCGLaACFkiAOYBhRAFsnVYCL1QoLZ68rAASWohSkYnACMII30vDmBkCCF4YCNpWxjvLgp-JJS0-S09UEgoAAVTIw5TZGQQcsr2auwScipaKERwgCsINgAaKEkybPa5BWVcAk8oTRaRulFKCHQjFWm+YigAei2oeEgWRuRvU3gIafU5trpmGUpEAHdubd3ho1NMmnYOLmqoYEQUDARgQUXQUGo7GSqXCjB+3EQKygzE4lHg61gCBQ6Aw9SqyFx7BYMmwA3EODwADIoAB5JzfUmDCkXKBLFb6IrgaBMGqOFxuAhlCr42p4o4Yax2Pl+YADNlRHD6HZeKAAPT4xW5jF5vgFhElDl1-j0QA)
