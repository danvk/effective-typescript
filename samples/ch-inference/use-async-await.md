# Item 27: Use async Functions Instead of Callbacks to Improve Type Flow

## Things to Remember

- Prefer Promises to callbacks for better composability and type flow.
- Prefer `async` and `await` to raw Promises when possible. They produce more concise, straightforward code and eliminate whole classes of errors.
- If a function returns a Promise, declare it `async`.


## Code Samples

```ts
declare function fetchURL(
  url: string, callback: (response: string) => void
): void;

fetchURL(url1, function(response1) {
  fetchURL(url2, function(response2) {
    fetchURL(url3, function(response3) {
      // ...
      console.log(1);
    });
    console.log(2);
  });
  console.log(3);
});
console.log(4);

// Logs:
// 4
// 3
// 2
// 1
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ojwIA)

----

```ts
const page1Promise = fetch(url1);
page1Promise.then(response1 => {
  return fetch(url2);
}).then(response2 => {
  return fetch(url3);
}).then(response3 => {
  // ...
}).catch(error => {
  // ...
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ohQ7DRRQeWREAAKeGQAFsdOhVOR5iYlsREaTyVSafTGQdMMZZGMoptGSRSBlOvYVJh8KhuqyBoiXvzBcLmqKpulQFLQDK5QrjGzwfAVQKhRs4gIJTquodjiq-D1rLI8DS8NrdfaDqbEUA)

----

```ts
async function fetchPages() {
  const response1 = await fetch(url1);
  const response2 = await fetch(url2);
  const response3 = await fetch(url3);
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ojwRToACeWnUwwaqG6JgACooPM1rDtfAxsFFNuhZCRyIoAO6KHTYeYmJbERH2QEc5pcqZsAVCkXlYzi35daWgTlxAR8wXC2mq3jgrqHY5PeBAA)

----

```ts
async function fetchPages() {
  try {
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const response3 = await fetch(url3);
    // ...
  } catch (e) {
    // ...
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ojwRToACeWnUwwaqG6JgACooPM1rDtQJg8KTQJ09oDsFFNuhZCRyIoAO6KHTYeYmJbERE8hh85oCqZsMUSqXlYyy34nXmgflxAQi8WS2na3jgk6HY72J6+RQ9UDWWSs+w2g5dJ7wb1AA)

----

```ts
async function fetchPages() {
  const [response1, response2, response3] = await Promise.all([
    fetch(url1), fetch(url2), fetch(url3)
  ]);
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ojwRToACeWnUwwaqG6JgACooPM1rDtfAxsABtKKbdCyGqgblxQYC5o82R8AC6bEUAHdFDpsHS8MgALY6XkHfwEawck7zExLYjJWrlYyG6YmnqG7ZdCWI+yHY5PeBAA)

----

```ts
function fetchPagesWithCallbacks() {
  let numDone = 0;
  const responses: string[] = [];
  const done = () => {
    const [response1, response2, response3] = responses;
    // ...
  };
  const urls = [url1, url2, url3];
  urls.forEach((url, i) => {
    fetchURL(url, r => {
      responses[i] = url;
      numDone++;
      if (numDone === urls.length) done();
    });
  });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4oilYYNVDdEwABUUHmaAHUdJhjABhfxBEKhdDWHagS7YVA4AC20DQqnIAAYAQxsFFNuhmglMG5PABtAC6bDVku4oGkIrYXPSoE6e0B2GVMtaPgtk0GoGtcr46vI9uab3sh2O9ieWsYvHQGuqPgGQeWqrefoOamQeFgIWM1iWBB8OlSpAyxt28wqfV4VsNGb2LvQyp0Tocbt2-KFIoA1DWK-YdGpQNYq8LUKLSOQI5dPIzUrqO1yK5CvYinvAgA)

----

```ts
function timeout(timeoutMs: number): Promise<never> {
  return new Promise((resolve, reject) => {
     setTimeout(() => reject('timeout'), timeoutMs);
  });
}

async function fetchWithTimeout(url: string, timeoutMs: number) {
  return Promise.race([fetch(url), timeout(timeoutMs)]);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4oilYYNVCgXQAW1kyBwmGslOptIAsujQKgcBTArI8AVQAAFPDICk6dCyAA8qFkmW5GU69hUmHwZMlAHd+YLhaLrOMLtKfCoAFbyTCpUiyk4uQwAFR0VJpdOspoyhuN1goDPtFGSPg9zPQiPskKeSMU6AAnlp1CTRt0TAB1HSYYw2u20pZOFyYNyeH22xmYFnOdmc7k7UAKpXqoUiq54EKyawAbXmJnT3vJeft9M7fuSAF1EcGgA)

----

```ts
async function getNumber() { return 42; }
//             ^? function getNumber(): Promise<number>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ojwRToACeWnUwwaqFAHkM4hwAFtArI8NYOqAVJh8DS4cwaKAnji9iLdgA9AD8lLW+jpmAZzNZ7OcAAU8MhGTp0LIADyoJksvBpeBAA)

----

```ts
const getNumber = async () => 42;
//    ^? const getNumber: () => Promise<number>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ohQ7AeQziHAAW0CsjwbEU6AAnlpQNZUqQMnDmHRRLsAHoAfl8DBJZMp1LwETZGQACnhkBSdOhZAAeVBimlpeBAA)

----

```ts
const getNumber = () => Promise.resolve(42);
//    ^? const getNumber: () => Promise<number>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4ohQ7AeQziHAAW0CsjwbGsqVIGQACnhkBSdOgrlELplZNY4b8cbsAHoAfl8DBJZMp1LwEQZzNZ7M5AB5UDKaWl4EA)

----

```ts
// Don't do this!
const _cache: {[url: string]: string} = {};
function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]);
  } else {
    fetchURL(url, text => {
      _cache[url] = text;
      callback(text);
    });
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4og46BoCjYaTIUCYYw6dAAQih2AA+n4TPFQO0ANq8BKYNyeAC6vP5HiebHaTzodRG+nmJgA6jpqQBhELGWRLJwuPlJHx+ALBMIRTCyAAemGFSVSpAyRWkO1AOjUoE1jtQoBZatkDvs+qCIVC1k9bO5hAFiPsYtkBHQqk6ezlvSqhB8JvN6Q5J3swfVoYIArYacwbz2fsNgaLEd2kMj8Ce8CAA)

----

```ts
let requestStatus: 'loading' | 'success' | 'error';
function getUser(userId: string) {
  fetchWithCache(`/user/${userId}`, profile => {
    requestStatus = 'success';
  });
  requestStatus = 'loading';
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEAkEkBEFECgDGB7AdgZwC6gK4CcAbARlAF5QByIigbiTS10ICYzLnb6Nt8CBmNhT6cQoWADlo8ACYBTRAQCGeWaABmOVIkwBLNOtmZEACwCqAJQAyACnigmBAFygseHagDmAGlCJFBAgAjRUQAa2drFXQABwZZZ1d3DwBKMgA+UAA3ZB1peGTnbNy6eDVDEwsbXiIfDS1dNEjZGLiiVIBvOwMjMytrXmZazW09VCaWjFlmDq77Mp7K-sI+IfrR8djJvhn7XdBRADoj2d2UDGQCWQOCZA9rNro9gF9kx9OGC6ubu+m3l7ezuhPtdbtZtnR-lwgZcQXcACyveDwUSWW7oRzIsBwzGgPg45g4og46BoCjYaTIUCYYw6dAAQih2AA+n4TPFQO0ANq8BKYNyeAC6vP5HiebHaTzodRG+nmJgA6jpqQBhELGWRLJwuPlJHx+ALBMIRTCyAAemGFSVSpAyRWkO1AOjUoE1jtQoBZatkDvs+qCIVC1k9bO5hAFiPsYtkBHQqk6ezlvSqhB8JvN6Q5J3swfVoYIArYacwbz2fsNgaLEd2kMj8Ce8Eu2BUAEccM1MABlTCKTA4dGUG6KaRJCigAA+lHQOEQiGa6FHE4osjweGQeE40oa7o8hlMsbw-X3kGkls8DsTipVXusAANgH3l8AACTtB94Y9PG8+aKrtQ6S4ZvGuwtm2WBdj2faCFOM5zpwkZViB7bgb26CCIOw6eJw9ZAA)

----

```ts
const _cache: {[url: string]: string} = {};
async function fetchWithCache(url: string) {
  if (url in _cache) {
    return _cache[url];
  }
  const response = await fetch(url);
  const text = await response.text();
  _cache[url] = text;
  return text;
}

let requestStatus: 'loading' | 'success' | 'error';
async function getUser(userId: string) {
  requestStatus = 'loading';
  const profile = await fetchWithCache(`/user/${userId}`);
  requestStatus = 'success';
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBA+sAhsAFgUwFwwN4G0CuATgDZbSECWYA5gLplSU0C+MAvDswNwBQiEATzDAYAM3zCoFcGLRRUAdQpQUAYWToAFEVIxyVagEocPGDAqiY2kubDwkqNMeymzMQnKJ2EGtARK0vGbMrqCQsB4QAA7gEGjsMIgA7ojKsvIo1sSGQTBh0DBQaAAesBzJqRFo0bFoAHRFpZo5rj6O-sS0CY1QuR5QXoUlvTwhPMRy7mgAjvjVUADKUIgDEFgA5MQgiAAmBuswAD4w6xD4wMDVEAfH62iEhCCE67z8QiLiktJ21HIAqnFCNpAQBJHYMJhGExmDyzeZLFb4CAJTbbPY0F6hWKwKKPUQUCYJCppURyRTKNS+TQAAwA9Ej7rSACTYBmEMHMaktGEzObQBGrFFnC5XTEhIA)

----

```ts
async function getJSON(url: string) {
  const response = await fetch(url);
  const jsonPromise = response.json();
  return jsonPromise;
  //     ^? const jsonPromise: Promise<any>
}
getJSON
// ^? function getJSON(url: string): Promise<any>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/IYZwngdgxgBAZgV2gFwJYHsIwOYFNkBSAygPIByAFAgE4A2AXDCMtahNgJQwDeAUDDCiZmMarhAAHYbhgBeGMADuwVMnj4oACyp0OAbn6DhagFYhMABWroAtqhAz5YydIB0ZzBX2GxyGlg8IK1t7XAMBAHoIgRiAPQB+IwgRQOC7B0Y00IAeYAgwAD5eAF9ePEJSMl4omAT4JCg0TBx8YnIdBiYWNk5M63TcXPyioA)
