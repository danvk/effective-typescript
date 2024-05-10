# Item 22: Understand Type Narrowing

## Things to Remember

- Understand how TypeScript narrows types based on conditionals and other types of control flow.
- Use tagged/discriminated unions and user-defined type guards to help the process of narrowing.
- Think about whether code can be refactored to let TypeScript follow along more easily.


## Code Samples

```ts
const elem = document.getElementById('what-time-is-it');
//    ^? const elem: HTMLElement | null
if (elem) {
  elem.innerHTML = 'Party Time'.blink();
  // ^? const elem: HTMLElement
} else {
  elem
  // ^? const elem: null
  alert('No element #what-time-is-it');
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBApgGzgWxgXhgExMArsuMKAOgHM4oBRJAogIQE8BJTACgHIB3ACwEMoAtFACWBAcIjio7AJQBuAFAB6JTDUwAegH4YoSLEQoAXDAASAFQCyAGWopCsAD4wwuBAgXCAZjFaHkMjAA3gpq-sTCYGBwAE4WNugw7AAKvDFQDDDmonDsxABGCJEA1qzyoTAqmjp60PA0JvG2NA4KAL71EHDBFf4VVdq64HX+Jq7uFbxI6RwAciD19kQwAMQ8-EI54pLC0uVtCkA)

----

```ts
const elem = document.getElementById('what-time-is-it');
//    ^? const elem: HTMLElement | null
if (!elem) throw new Error('Unable to find #what-time-is-it');
elem.innerHTML = 'Party Time'.blink();
// ^? const elem: HTMLElement
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBApgGzgWxgXhgExMArsuMKAOgHM4oBRJAogIQE8BJTACgHIB3ACwEMoAtFACWBAcIjio7AJQBuAFAB6JTDUwAegH4YoSLEQoAXDAASAFQCyAGWopCsAD4wwuBAgXCAZjFYBCQ2QZGChuACcQThc4KMowiLCOAFUwXgAjJBCQGC9hMEwYAGIefiFROHFJYWl5BUDiPLA4MIsbdBh2AAVeMKgGGHNy9mIMvIBrVlqVTR09aHgaE1bbGgcFIA)

----

```ts
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text);
    //       ^? (parameter) search: RegExp
  }
  return text.includes(search);
  //                   ^? (parameter) search: string
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABBBUCGMwGcAUUCmAHlAFyJZQBOmA5gDTn5qUQAWZF1YNiAPogCV8NAKKEADgEpEAbwBQiRDGCIcWJi1ZLs6SPjgqhoidPmLFlfFBCUkAQjvrmbAHRF8EPESiSA3AvMAekDzUIA9AH5VcWY0AFsrfEppJ00yIzFxAIBfAMtrW0QCYhdMCAAbEAATfFxUtj8A4NCW1vConBjKeMTkxmd2cipaOVygA)

----

```ts
interface Apple { isGoodForBaking: boolean; }
interface Orange { numSlices: number; }
function pickFruit(fruit: Apple | Orange) {
  if ('isGoodForBaking' in fruit) {
    fruit
    // ^? (parameter) fruit: Apple
  } else {
    fruit
    // ^? (parameter) fruit: Orange
  }
  fruit
  // ^? (parameter) fruit: Apple | Orange
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIIAd0BsUG9nADOA4gPakAmAYqVAEJwDWoA5gFzIBG5OcIA3MgC+AKFCRYiFAHkofFnmQgArgFsAylmBJCHFas7RBomMpAIwwUiGTptjKlGXAwAChhOXHDNhQAfZFl5CABKZFwRZAIYZFcAciIyShp6JlY4ghsPZzAwiKio7JdIgoB6UuQAPQB+WPQ4OVUICTCisG9MHBKhZAgsQjwSws8wIeRyqtrXesbm6FaRjiCQBW6StpKJmrqGuCaW5DaO32QA5dXRIA)

----

```ts
function contains(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms];
  //    ^? const termList: string[]
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABBBUCGMwGcAUUCmAHlAFyJZQBOmA5gDSIGUC2WZF1YNiAPuVbQDaAXQCUiAN4AoRMgQVG+FgBkYCgLyIAgpUpoAngDo1OvfrxLW4gPyKWWRGUFNWwgNwzEAei+zZAPVsUbCg7ZlUKdgEuEU8fRENEqQBfKSA)

----

```ts
const elem = document.getElementById('what-time-is-it');
//    ^? const elem: HTMLElement | null
if (typeof elem === 'object') {
  elem;
  // ^? const elem: HTMLElement | null
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBApgGzgWxgXhgExMArsuMKAOgHM4oBRJAogIQE8BJTACgHIB3ACwEMoAtFACWBAcIjio7AJQBuAFAB6JTDUwAegH4YoSLEQoAXDAASAFQCyAGWopCsAD4wwuBAgXCAZjFZQGAA5wID6GqGgRMOwgAEYAVnDA0jIwAN4KamGKaiqaOnrQ8DQmFjZ2tE4ubh4AvgpAA)

----

```ts
function maybeLogX(x?: number | string | null) {
  if (!x) {
    console.log(x);
    //          ^? (parameter) x: string | number | null | undefined
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAWwIYE8BGBTAMnAcwA0AKADwH4AuRMEZHAJ0QB9EBnKRmMA12kABtBASkQBvAFCJEMYIhIBCMmKkyZEBOziDsAOkGFyIgNzT1Aegvqb6gHoUFAB1SNUybFGyMxZGp25efjoGb2ChQX5wABNsYB5saPMAX0lUoA)

----

```ts
interface UploadEvent { type: 'upload'; filename: string; contents: string }
interface DownloadEvent { type: 'download'; filename: string; }
type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case 'download':
      console.log('Download', e.filename);
      //                      ^? (parameter) e: DownloadEvent
      break;
    case 'upload':
      console.log('Upload', e.filename, e.contents.length, 'bytes');
      //                    ^? (parameter) e: UploadEvent
      break;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgKoAcA2B7OATAUQDcJxkBvZMAT3QgC5kByAVy1zyYG5kZhNScALYNkAZzBRQAcx4Js4UmDGMJUkNOQBfAFChIsRCgAi2AO4gc+YkopVaopnnOWO3Xv0EjVkmT100dMgAgujoNmQAvGjs1iRkAD7IphZWhPFgXDo6MCwgCGDACsgAFnAgeAIRYAAUoqHhGQCUFDrI4mbAYAglyHUAdIEQLeRt7cgIcGIoTi5pTPRj4xMKYtgC-TjSNUwprvhMADTIEP18AiDCw1nL7QD0d7dPz8sAegD8fehwUFcGLaI9mlqktxgAjKAQOAAaxu40m02YbHmiye8hAaw2Wx2GHmx1O5y8EHx-XRkHAYk2pGkYBKxyYYOokDETCacOWDxeXPGHy+Pz+0ABjFxHBBTwhUNhY10uiAA)

----

```ts
function isInputElement(el: Element): el is HTMLInputElement {
  return 'value' in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    return el.value;
    //     ^? (parameter) el: HTMLInputElement
  }
  return el.textContent;
  //     ^? (parameter) el: HTMLElement
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABDAzgSTABxFAogGwFMBbQsKACkPwC5ECSyoBKO65FRACQBUBZADIZseIqXKIA3gChEiAE6EoIeUgDkANwCG+EITXIk1ANzSAvtOmhIsBIgDmShuKgBhBFCZVa3fgOdMzFKyyMCIFKjCOAHk3sxBMnJyisqqiNQAdNq6hKZJiAD0BfmIAHoA-OGYWvJapJ7yQdR0vIJRoozkIRbJSipG+BmeAB5uHkx5hcX5FVU1dUqEjek+rf5iTObSQA)

----

```ts
const formEls = document.querySelectorAll('.my-form *');
const formInputEls = [...formEls].filter(isInputElement);
//    ^? const formInputEls: HTMLInputElement[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABDAzgSTABxFAogGwFMBbQsKACkPwC5ECSyoBKO65FRACQBUBZADIZseIqXKIA3gChEiAE6EoIeUgDkANwCG+EITXIk1ANzSAvtOmhIsBIgDmShuKgBhBFCZVa3fgOdMzFKyyMCIFKjCOAHk3sxBMnJyisqqiNQAdNq6hKZJiAD0BfmIAHoA-OGYWvJapJ7yQdR0vIJRoozkIRbJSipG+BmeAB5uHkx5hcX5FVU1dUqEjek+rf5iTObSEAgoUIjAcPLEBJwAvIgAJnAQIC4ZAI568gCeAMrUhNBHAIL4+BQ1BliC8ALSHY6IABUamYph2YD2ByOxHap0QFwA2hkcRCTvgUABdDLAGD4BoRdBYaIbchw6RFGaVBFIvFogktPzszpQTGE6RAA)

----

```ts
const nameToNickname = new Map<string, string>();
declare let yourName: string;
let nameToUse: string;
if (nameToNickname.has(yourName)) {
  nameToUse = nameToNickname.get(yourName);
  // ~~~~~~ Type 'string | undefined' is not assignable to type 'string'.
} else {
  nameToUse = yourName;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBGCGBbApgFRAOQJbANYJRgF45kB3GAWXgAcAeaAJyzAHMAaGJl1gPgAoAlAG4AUABNkwADbxGyGNOSwAniACujDEmQAuLlGZsxS2ATQgAqhD0GjrMVgBmMfufTY85gHQALeBD8apraKIKCMADeojBwOujWCiTumDj4Ot6sykEaWjoiMTAA9EUwAH4VlTCoKjQKAOTcbDAAPjDqYJJOLMji9TBYEHAgsAEQWKwIAEZKMFAgc7UNTaz13qIAvjDI0jZRhSmJxDDBeShiG6JAA)

----

```ts
const nickname = nameToNickname.get(yourName);
let nameToUse: string;
if (nickname !== undefined) {
  nameToUse = nickname;
} else {
  nameToUse = yourName;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBGCGBbApgFRAOQJbANYJRgF45kB3GAWXgAcAeaAJyzAHMAaGJl1gPgAoAlAG4AUABNkwADbxGyGNOSwAniACujDEmQAuLlGZsxoSLDA58O4nB3pseAsgB0rZfzWbtKEaKXm7EABVCD0DI1YxLAAzGH4LR2sAQiISdTBJaJZkcUEYAG9RGFsUdBCFEgSrFDEAXxhkaVCCopK0YOaSTy0dOtEgA)

----

```ts
const nameToUse = nameToNickname.get(yourName) ?? yourName;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBGCGBbApgFRAOQJbANYJRgF45kB3GAWXgAcAeaAJyzAHMAaGJl1gPgAoAlAG4AUABNkwADbxGyGNOSwAniACujDEmQAuLlGZsxoSLAJoQAVQgKSF9NjwWAdK2X81m7SkEwA-P4wXlo6YkA)

----

```ts
function logLaterIfNumber(obj: { value: string | number }) {
  if (typeof obj.value === "number") {
    setTimeout(() => console.log(obj.value.toFixed()));
    //                                     ~~~~~~~
    // Property 'toFixed' does not exist on type 'string | number'.
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAGzgcwDIEMoFMBOAksAHIgC2ARgQBRyUBWAXIgN6IBuWyIuLAzlHwwwaRAB9EYCtXyIAvgEo2AKESIYwRDSgBPAA644W+gwB0XHrkQBeO4gBE0qgQfLWa9Yn64oAFRhyIxAoGhplGwA+RAgEfjhkXDNUNDpGC25eMyg4ADEYAA9cABNwxUUAbk91AHoarwbGpuaWhoA-Ds626sQ6xAAFfDhDfD1EAHIc-KLi8cRiuFx+KTgoRFwCmEFEBEQ9QwnBYVEJKRkCcbNPeRUboA)

----

```ts
const obj: { value: string | number } = { value: 123 };
logLaterIfNumber(obj);
obj.value = 'Cookie Monster';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAGzgcwDIEMoFMBOAksAHIgC2ARgQBRyUBWAXIgN6IBuWyIuLAzlHwwwaRAB9EYCtXyIAvgEo2AKESIYwRDSgBPAA644W+gwB0XHrkQBeO4gBE0qgQfLWa9Yn64oAFRhyIxAoGhplGwA+RAgEfjhkXDNUNDpGC25eMyg4ADEYAA9cABNwxUUAbk91AHoarwbGpuaWhoA-Ds626sQ6xAAFfDhDfD1EAHIc-KLi8cRiuFx+KTgoRFwCmEFEBEQ9QwnBYVEJKRkCcbNPeRUb2LBt0xZ2S14BIRExSWdZBVs2TiZPiIACMACYAMwKKopbB4Iikc74NIMSoqUwZKz-cYAYTgcAA1jBrABZOLw8ZVIA)
