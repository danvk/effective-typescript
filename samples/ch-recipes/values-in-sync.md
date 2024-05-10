# Item 61: Use Record Types to Keep Values in Sync

## Things to Remember

- Recognize the fail open versus fail closed dilemma.
- Use ++Record++ types to keep related values and types synchronized.
- Consider using ++Record++ types to force choices when adding new properties to an interface.

## Code Samples

```ts
interface ScatterProps {
  // The data
  xs: number[];
  ys: number[];

  // Display
  xRange: [number, number];
  yRange: [number, number];
  color: string;

  // Events
  onClick?: (x: number, y: number, index: number) => void;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FEA)

----

```ts
function shouldUpdate(
  oldProps: ScatterProps,
  newProps: ScatterProps
) {
  for (const kStr in oldProps) {
    const k = kStr as keyof ScatterProps;
    if (oldProps[k] !== newProps[k]) {
      if (k !== 'onClick') return true;
    }
  }
  return false;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FDBCIAhgwDnIxEz4QoasAKqE7JDl2Wt4RMromNgHJM5cIBAA7mdHGFjQdxTdlNQwkcjlYSAxyEWoWLIUDIcKsO6vLihHJ-Iq9f6AqDIOCkIoQBT4GBoB6nAgkeTUajALHlMF3SRFaTIACEPR6ghu5MpkMJhOJXzhtPpAHIcvlCkVud0oBAwEIoCBkLEhBACYSJtQFcgRWKJch4IZiLKKBMgA)

----

```ts
function shouldUpdate(
  oldProps: ScatterProps,
  newProps: ScatterProps
) {
  return (
    oldProps.xs !== newProps.xs ||
    oldProps.ys !== newProps.ys ||
    oldProps.xRange !== newProps.xRange ||
    oldProps.yRange !== newProps.yRange ||
    oldProps.color !== newProps.color
    // (no check for onClick)
  );
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FDBCIAhgwDnIxEz4QoasAKqE7JDl2Wt4RMromNgHJM5cIBAA7mdHGFjQdxTdlNRQEGBCUCDIu9TUcKsO4AOl4yAAhD0eoIbqDwQAfBFcQH7AgkEFKSHQ2G3dHETGkJEo5BA+HeWzYmFXPGHMEUlDEgGktF0hQMqm40HsqyUpkAsn4kFhCJQTk00EiyIk7TlED4ZAIFjFZAwSKkvIFYqdLidcYUIA)

----

```ts
interface ScatterProps {
  xs: number[];
  ys: number[];
  // ...
  onClick?: (x: number, y: number, index: number) => void;

  // Note: if you add a property here, update shouldUpdate!
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FKDY8EhoGFjQeESklNS8De4aiso1UiG09AB0x9l5BcVlyJUbtcj1HU3ILW03Xb0DQyOJB8gAcviQATAGB3fBCZBwVisCHIQgEQjQMAKZAsKAQVxCQjsSDIYhMMGGVgAVSxmAgAEIKBMgA)

----

```ts
const REQUIRES_UPDATE: Record<keyof ScatterProps, boolean> = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};

function shouldUpdate(
  oldProps: ScatterProps,
  newProps: ScatterProps
) {
  for (const kStr in oldProps) {
    const k = kStr as keyof ScatterProps;
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
  return false;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FGEgMcjmyQCKAKoAknOoAPqLODoAggzJAuYQYVCsADxFEAr4MGgYWNB4RMSuYvjhEFYDPeRmyrFCCDORT-KCA4HUCxWWwCAFArzQ3xwiHIMIRKLIZHZPIFYoCeCGYjwsaaGBCEAIMDAHLIYhMfBCQysRaEdiQcrZJlPEgCdCYbDcl5cEAQADugt59wFBBIFG6lGoMEiyHKUxmRVQsWQoGQ4VYgvlXFCOXVvWQGq1cFIl2utz5D1wMuI8mo1GAt3KesFkiK0mQAEIej8ReKnT6-QAyCOzBYrNabbZ7ZLhw2u11QCBgIRQECYsEQF2uibUYvIDNZnPIAlE8YUIA)

----

```ts
interface ScatterProps {
  // ...
  onDoubleClick?: () => void;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FKDY8EhoGFjQeESklEn0AHSb2SA6+EJihhD5haUV3f2Dw6MUE0A)

----

```ts
const REQUIRES_UPDATE: Record<keyof ScatterProps, boolean> = {
  //  ~~~~~~~~~~~~~~~ Property 'onDoubleClick' is missing in type ...
  // ...
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FKDY8EhoGFjQeESklEn0AHSb2SA6+EJihhD5haUV3f2Dw6MUE2EgMcjmyQCKAKoAkk+oAPqvODoAQQYyQE5ggYSgrAAPEUIAp8DA5phsEsSK4xPhwhArAMeuQtPRkAA-Emksnk5Co6BgBTIADkOV2+0Ox2KdOQ+mQIn0xHiHJAyBphBQm3WBOQuQA8gBZHBfVBmZSxIQQZyKJVQFVq6gWKy2ATK1VePW+Q3a5BhCJRQWao3UHKsooCeCGYh22j0ZIAOR0N00QA)

----

```ts
const PROPS_REQUIRING_UPDATE: (keyof ScatterProps)[] = [
  'xs',
  'ys',
  // ...
];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMoLmSUAKUD2ADgM7IDeAUMsgPQ3IAqAFigCaZxXIAexAXMhABXALYAjaAG0AugG4uAT36DREqDPlc6yACLBihADZwFXbgCU4IAOYQBk4eOgAaFU6hzFlm3eQPVLm5qntQI+Ib4UALEYFCg1prU2gCiAG4Q4MRc+CAAwobACADWAPwCABTcAo5qrgrVAVCuoKwQVUHQAJTIALwAfMip+MCs8gC+FKDY8EhoGFjQeESklEn0AHSb2SA6+EJihhD5haUV3f2Dw6MUE2EgMcg45gDyOKgA+ubJAIoAqgCS5n+ADkAOLvX44HQAQQYyQqRQgCnwMDmmGwSxInRkvT8XAA5Lx8c4CUpiVoNltPEA)
