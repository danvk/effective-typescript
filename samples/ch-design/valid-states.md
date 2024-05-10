# Item 29: Prefer Types That Always Represent Valid States

## Things to Remember

- Types that represent both valid and invalid states are likely to lead to confusing and error-prone code.
- Prefer types that only represent valid states. Even if they are longer or harder to express, they will save you time and pain in the end!

## Code Samples

```ts
interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5ABzgHMIAVCADzAC5kBnMKUEgbn2WAYBkB7OABNW9AEZ8+AGwhwQHAtCh8oAfnpMWIdrgC+uIA)

----

```ts
function renderPage(state: State) {
  if (state.error) {
    return `Error! Unable to load ${currentPage}: ${state.error}`;
  } else if (state.isLoading) {
    return `Loading ${currentPage}...`;
  }
  return `<h1>${currentPage}</h1>\n${state.pageText}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5ABzgHMIAVCADzAC5kBnMKUEgbn2WAYBkB7OABNW9AEZ8+AGwhwQHAtCh8oAfnpMWIdrgC+uQRASS4UFNLDIEAVyinwABVIR1zVhxhWQCMMD4hkdgZQjmQAFEyYzmgYkACUOJzAMMjhMRAAdIrK8XgEBKZgNv4ABgCitsoAhMgAqiBwotLIYHzIkgKCyAAk2Na2EA5OOvQ9EZCZFVA6xfLIOsgQkgwoSSljGdz8Qqw5nPkQhVAlW8Ja3b02dmAhEDrp9zOcevuHJQA8ABYAjAB8PX1XG46N4Aem+PwAOiBRml0sQyJQaNMOHogA)

----

```ts
async function changePage(state: State, newPage: string) {
  state.isLoading = true;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false;
    state.pageText = text;
  } catch (e) {
    state.error = '' + e;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMpjpZBvAUM5ABzgHMIAVCADzAC5kBnMKUEgbn2WAYBkB7OABNW9AEZ8+AGwhwQHAtCh8oAfnpMWIdrgC+uQRASS4UFNLDIEAVyinwABVIR1zVhxhWQCMMD4hkZGAAqlCSAGLKjmQAFIQumiQAlDjIpmA2-gDkmWzIenAMAJ5eyB5ePn6WABayZFEQ0UyYzmgYkAA0yCAQAO718azJeARNkAB03PxCrMgAvMjMVhDyC1CFOJwECH5MqRAMhDso83A9cMAWMBBgCFXRgSHhkU7R3X1OiYkrBMAwyNEAQlMByOYz4AGshpsCAsqkoel1esgAKK2ZTRAAGQRAcFE0gWfGQkgEgmQABJsG96jp6BTgYcQAwIGNRlYGJQaDoMV9oXoYZYdhZIDQ5shTucLPTQcKwNEefzRszJiSZvN4JImd9GG1mcQyByLPMZSsdJZMLd-hAoQqdWNFMpRdlkABqZDLTh6PRAA)

----

```ts
interface RequestPending {
  state: 'pending';
}
interface RequestError {
  state: 'error';
  error: string;
}
interface RequestSuccess {
  state: 'ok';
  pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: {[page: string]: RequestState};
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSgA)

----

```ts
function renderPage(state: State) {
  const {currentPage} = state;
  const requestState = state.requests[currentPage];
  switch (requestState.state) {
    case 'pending':
      return `Loading ${currentPage}...`;
    case 'error':
      return `Error! Unable to load ${currentPage}: ${requestState.error}`;
    case 'ok':
      return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
  }
}

async function changePage(state: State, newPage: string) {
  state.requests[newPage] = {state: 'pending'};
  state.currentPage = newPage;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const pageText = await response.text();
    state.requests[newPage] = {state: 'ok', pageText};
  } catch (e) {
    state.requests[newPage] = {state: 'error', error: '' + e};
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyBEewORxO3240EeYSePmGW0gn26yAQJ3w1F6-XA0IgQjyGi04xRaLAEMyYARKHycIAdJNybg5pjJtihisibgAO7AMAIAAWyCe9M2nRpcKR6h6cFwKE4xV4bGYkvoEN+UFOAAMADJKOA8SgAEiozIGOKENItGqJUpl7GMBiVKpVPz+yA1VRUAEJkBcQHAAEbXFBgJTIa66kjII0m1lhISsI3C2SUmn2oRW5UIaWygKK5UTCBqzUAHj5AEYAHzRvoswZx4sAenLFYAOiBE1MsloaYsItEwOmiSIRDRpSkDsgQYdjqd+XBeBAcbDOqxKQAaZAgCCcnFvXgS7yipP4Rlbnds-FUOE6LikChsHbqWkxutUzfbnFE+IpLwq1EgdFJlwDg0TfOBOTgHlJ0LfknnOK47geZ4zxxd53mtZBgBgQVPSAkCAIgGkAgPJ1kDAPllE5d8qI9KAng1X0AyDMjQ3DPUoyoFChnjDi8NAsVsiwXBIhidN0OVEQnX-dFexE0l8nAyDST4giaUgGInnEp1aWPMBTw-C98ivFc-ECDdZP7R96DxLNeQFJ4IBIw9u10-TzzCFZL2vO1FBUNgN3tHQ2GQABqZBcSHYQaCAA)

----

```ts
interface CockpitControls {
  /** Angle of the left side stick in degrees, 0 = neutral, + = forward */
  leftSideStick: number;
  /** Angle of the right side stick in degrees, 0 = neutral, + = forward */
  rightSideStick: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyCsLQkdgAwkoEP4OMAwBDwMprp5usgAPQAKnRyAAgrxriglDBkGAABYofEwMAMYAkFD4YBQ5CgZC08iTPAAGmQAAY8sgQBAsPE4NcuQBqPkwFQAdzgUBIyHRqPUFLAThpEA6DP8rBAWAAtgAjaDjNGYnF4glE0koczkElU3AajTapmnVns3Bc3n5AVCqAi8WSmVyhVK9R2h3q2laqG6g3GqBJIA)

----

```ts
function getStickSetting(controls: CockpitControls) {
  return controls.leftSideStick;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyCsLQkdgAwkoEP4OMAwBDwMprp5usgAPQAKnRyAAgrxriglDBkGAABYofEwMAMYAkFD4YBQ5CgZC08iTPAAGmQAAY8sgQBAsPE4NcuQBqPkwFQAdzgUBIyHRqPUFLAThpEA6DP8rBAWAAtgAjaDjNGYnF4glE0koczkElU3AajTapmnVns3Bc3n5AVCqAi8WSmVyhVK9R2h3q2laqG6g3GqC7faHY6nc6x-xOCBgI68J4IE7xJRI1gQqEwuFFxG4T4on5-ZCFhEl3AAOlV0c1RyhSSAA)

----

```ts
function getStickSetting(controls: CockpitControls) {
  const {leftSideStick, rightSideStick} = controls;
  if (leftSideStick === 0) {
    return rightSideStick;
  }
  return leftSideStick;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyCsLQkdgAwkoEP4OMAwBDwMprp5usgAPQAKnRyAAgrxriglDBkGAABYofEwMAMYAkFD4YBQ5CgZC08iTPAAGmQAAY8sgQBAsPE4NcuQBqPkwFQAdzgUBIyHRqPUFLAThpEA6DP8rBAWAAtgAjaDjNGYnF4glE0koczkElU3AajTapmnVns3Bc3n5AVCqAi8WSmVyhVK9R2h3q2laqG6g3GqC7faHY6nc6x-xOCBgI68J4IE7xJRI1gQqEwuFFxG4T4owsgfDUVXRzVHKFcyNqjWZoR8hvFpGm4BEp4tnvt-x5XL5bl19QTHN-b7Ae3dmOT00iRe-KCnccb7VJIA)

----

```ts
function getStickSetting(controls: CockpitControls) {
  const {leftSideStick, rightSideStick} = controls;
  if (leftSideStick === 0) {
    return rightSideStick;
  } else if (rightSideStick === 0) {
    return leftSideStick;
  }
  // ???
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyCsLQkdgAwkoEP4OMAwBDwMprp5usgAPQAKnRyAAgrxriglDBkGAABYofEwMAMYAkFD4YBQ5CgZC08iTPAAGmQAAY8sgQBAsPE4NcuQBqPkwFQAdzgUBIyHRqPUFLAThpEA6DP8rBAWAAtgAjaDjNGYnF4glE0koczkElU3AajTapmnVns3Bc3n5AVCqAi8WSmVyhVK9R2h3q2laqG6g3GqC7faHY6nc6x-xOCBgI68J4IE7xJRI1gQqEwuFFxG4T4owsgfDUVXRzVHKFcyNqjWZoR8hvFpGm4BEp4tnvt-x5XL5bl19QTHN-b7Ae3dmOT019iBIlAj5BPLutzPT2fz+iL35QU7jjfarfqVGo5AAfjfwhoQA)

----

```ts
function getStickSetting(controls: CockpitControls) {
  const {leftSideStick, rightSideStick} = controls;
  if (leftSideStick === 0) {
    return rightSideStick;
  } else if (rightSideStick === 0) {
    return leftSideStick;
  }
  if (Math.abs(leftSideStick - rightSideStick) < 5) {
    return (leftSideStick + rightSideStick) / 2;
  }
  // ???
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyCsLQkdgAwkoEP4OMAwBDwMprp5usgAPQAKnRyAAgrxriglDBkGAABYofEwMAMYAkFD4YBQ5CgZC08iTPAAGmQAAY8sgQBAsPE4NcuQBqPkwFQAdzgUBIyHRqPUFLAThpEA6DP8rBAWAAtgAjaDjNGYnF4glE0koczkElU3AajTapmnVns3Bc3n5AVCqAi8WSmVyhVK9R2h3q2laqG6g3GqC7faHY6nc6x-xOCBgI68J4IE7xJRI1gQqEwuFFxG4T4owsgfDUVXRzVHKFcyNqjWZoR8hvFpGm4BEp4tnvt-x5XL5bl19QTHN-b7Ae3dmOT019iBIlAj5BPLutzPT2fz+iL35QU7jjfarfqfdPACyTBJADo4IbcGOIJTj5OyAALQrmuAHap8AA8yAAKznhePzLr+-4Tq6EpHqhUKfKiyAAEwPvQqI4QA-KRwg0EAA)

----

```ts
function getStickSetting(controls: CockpitControls) {
  return (controls.leftSideStick + controls.rightSideStick) / 2;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoQI4FcIGcwAKEIAJqAObIDeAUMsvnJAFzIDkADsWSOWwNw0AvjVCRYiFOmx4wAUShQA9lGp0GYJhFZtoyqAPV6VrfFAqCRY6PCRpMOfAGUsCJLlxr6jFuyUBrQ3oOOHIIABUIAA8wUzBzXksaMABPLnsZZ01IZABeDMdCbgpkAB8C2QV9MornV3dcQVFwG0lkJ2yUWnoELEViQlDtDQTyQXooB1lcVioAbRCwuNGAXVZpQo6tISSYLBAEMGAlEGQwsABVKAAbADEVAiGACg5ligBKamRJsD7TtgEyCsLQkdgAwkoEP4OMAwBDwMprp5usgAPQAKnRyAAgrxriglDBkGAABYofEwMAMYAkFD4YBQ5CgZC08iTPAAGmQAAY8sgQBAsPE4NcuQBqPkwFQAdzgUBIyHRqPUFLAThpEA6DP8rBAWAAtgAjaDjNGYnF4glE0koczkElU3AajTapmnVns3Bc3n5AVCqAi8WSmVyhVK9R2h3q2laqG6g3GqC7faHY6nc6x-xOCBgI68J4IE7xJRI1gQqEwuFFxG4T4on5-ZAF6sl3AAOlV0c1R0ZEsLCNbbcjao1mc+qOQACYkkA)

----

```ts
interface CockpitControls {
  /** Angle of the stick in degrees, 0 = neutral, + = forward */
  stickAngle: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHsEGsAOwwbhToA2AzsgN4BQyyA9AFSPICCIA5iSujMmAAsUZMMGzJQyACYQOUCBDIAaZAAZkAXmQgIAVzBQ4JFQGpNyGOigB3OFCnJG9WshFis7LhABc23QFsAI2gAbmoAX2ogA)
