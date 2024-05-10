# Item 73: Use Source Maps to Debug TypeScript

## Things to Remember

- Don't debug generated JavaScript. Use source maps to debug your TypeScript code at runtime.
- Make sure that your source maps are mapped all the way through to the code that you run.
- Know how to debug Node.js code written in TypeScript.
- Depending on your settings, your source maps might contain an inline copy of your original code. Don't publish them unless you know what you're doing!

## Code Samples

```ts
// index.ts
function addCounter(el: HTMLElement) {
  let clickCount = 0;
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.addEventListener('click', () => {
    clickCount++;
    button.textContent = `Click me (${clickCount})`;
  });
  el.appendChild(button);
}

addCounter(document.body);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEEsDsBMFMA8B0AXAzgKAGYFdIGNlwB7SUAQ2mgGEjdlYAnAClgBsAuUACQBUBZADIBRVrAC2sSMgCUoAN7pQoUclB5W4PAGsadUAF5QABgDcitSVSqARtmTISB0NCJ5sEqYjwNYZeiPFJZCYAclt7EhDpMyVwh0gUBGQaKSCnEKoNbVAJEJjQOJJECmghADcggXArSUZQ9U0tEIAaUCZZfQA+eXMlBu1dKQBqIfzYu3jE+GSSeiknAANMxpzYNoASOX6dWikAX2kF-IP8tmKAB3PJagALcFZoJkLIaPQ99HQSwfpmFzcPZCIaxEaAAT1eQA)

----

```ts
// index.ts
function addCounter(el: HTMLElement) {
  let clickCount = 0;
  const triviaEl = document.createElement('p');
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.addEventListener('click', async () => {
    clickCount++;
    const response = await fetch(`http://numbersapi.com/${clickCount}`);
    const trivia = await response.text();
    triviaEl.textContent = trivia;
    button.textContent = `Click me (${clickCount})`;
  });
  el.appendChild(triviaEl);
  el.appendChild(button);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEEsDsBMFMA8B0AXAzgKAGYFdIGNlwB7SUAQ2mgGEjdlYAnAClgBsAuUACQBUBZADIBRVrAC2sSMgCUoAN7pQoUclB5W4PAGsadUAF5QABgDcitSVSrkDcADdwZEQdDQiebBKmI8DWGXoRcUlkJgByAAcw6TMlPEtVACNsZGQSFzcPL2QfPwDYIOzw5NSSaNjQErTIFARkGikQlzCqDW1QCTCKqpJECmghOxCBcCtJRnD1TS0wgBpyVABPfFAmWX0APnlzOLadWikAakOKuITQP1QIy1gXMgB3MnBVTFhkPAALJgADD9SI9ggSCeRKMVBkCLgHxEMTAAAkcim2l0UgAvt8YjsLJArKAbPZHHdHs8LrArjdavBQpilEp8Q4nKxKfUSPQpC56Y5TpUUtVmQ02apDN9WtMOrcmAikfs6KjpN8KnKKmw+hEIpJqB9wKxoExOYyaaAVRD1TAqFqdUwepBMaj0EA)

----

```ts
// bedtime.ts
async function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Good night!');
  await sleep(1000);
  console.log('Morning already!?');
}

main();
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAECMFMBMBcEsC2kB0sDOAoAhugngHYDGoAZgK7EID2Bo6ANpJAA4AUi6AXKAeYlABOASlABvTKFCDIscoLoFIAd1AAFQdUTx0kADwA3avGgA+NjPTUGByKAC8p+rIAqSSNXKwLkKzcgANKCcwsIA3JgAvpg4+MRklEQ0dIjY8ARsohJSRLR+qAzUAOZsAOQA4tTU0LzwRQAWsACEpeGSoNjKabD0TKxsAIwADCNtOXnWBcVlALLUCulFHQwy2NB4TQD8rRHRmKnpmRFAA)
