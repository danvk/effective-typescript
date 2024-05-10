# Item 75: Understand the DOM Hierarchy

## Things to Remember

- The DOM has a type hierarchy that you can usually ignore while writing JavaScript. But these types become more important in TypeScript. Understanding them will help you write TypeScript for the browser.
- Know the differences between `Node`, `Element`, `HTMLElement`, and `EventTarget`, as well as those between `Event` and `MouseEvent`.
- Either use a specific enough type for DOM elements and Events in your code or give TypeScript the context to infer it.

## Code Samples

```ts
function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  targetEl.classList.add('dragging');
  // ~~~~~           'targetEl' is possibly 'null'
  //       ~~~~~~~~~ Property 'classList' does not exist on type 'EventTarget'
  const dragStart = [
     eDown.clientX, eDown.clientY
     //    ~~~~~~~        ~~~~~~~ Property '...' does not exist on 'Event'
  ];
  const handleUp = (eUp: Event) => {
    targetEl.classList.remove('dragging');
    // ~~~~~           'targetEl' is possibly 'null'
    //       ~~~~~~~~~ Property 'classList' does not exist on type 'EventTarget'
    targetEl.removeEventListener('mouseup', handleUp);
    // ~~~~~ 'targetEl' is possibly 'null'
    const dragEnd = [
      eUp.clientX, eUp.clientY
      //  ~~~~~~~      ~~~~~~~   Property '...' does not exist on 'Event'
    ];
    console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
  }
  targetEl.addEventListener('mouseup', handleUp);
  // ~~~~~ 'targetEl' is possibly 'null'
}

const surfaceEl = document.getElementById('surface');
surfaceEl.addEventListener('mousedown', handleDrag);
// ~~~~~~ 'surfaceEl' is possibly 'null'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABACwIZgCYBsCmARAJ1QHMAKfOAdzAC5EBRANxzCgEpEBvAKEUQgQBnKIiioCxHFHpZEAXkQVqAOgggCBFlAAq4yVADcvUXqkzVWVIMEAZGMOWoMGUgHIMRYsRhhirtkZ8APRBiAB+ERF80TF8rmISZliuiPaIAA5w1jAARlgAnoiuYCBYycYhsXyRNVEACgRw6TgEUIWuEJbWdsIpGHA4gohgcCI4AB72Igii+c1FTFq6iVCuxgJgwogeJADKCSIKANrG0UpgFjBaABoANIp4VBedV6wAmqfBodG1UVXhv0QDSaLTaRWUEL6AyGIzGky2M1ci1Yaz4AF1AvwhCI0JhcABVdLyRDkQl0ZHseQAPi4nwS+nMnSstimyk0AFs4Mw3DsvD4-AFPpVav8YvFTNJkqkhplsnl2iUyqjopUqr9IkDGs1Wu0md0plDBsNRop4dMkG15kjmKxlvplXx6Uk2ThOcwKT0oCwWm5OSBBDgQOlXPdcdgcITBTFhTUik7JSk0rLBLkCkVFeUYhstrz6JhiScqhH0pcbvdi6X3p8vtVAbF1dFgdqwa4IcpDTCTRMpohERSHYgMZ9s3BcMosHAyO5xvcMIUFCHEEcAAz3ACMaOU7NQ6VIMGp208eYwRxgaMQAFpD3sDqe0Wwo4gAL7GePmJwYD1Tb0EX1wf2BsGoboOGkaYjGGriisMiJjKWQpvK6alOUL7cNmIiCOowCoBAOAyMS-RqOyWjKAyuDEawABC+QAJIuK4mEENhuH+EYjHMXhWCOM4X7CD+f4Af01CLmGuCECQgoQZB7E4ZxsEZPBqYKshaxAA)

----

```ts
function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  targetEl.classList.add('dragging');
  // ~~~~~           'targetEl' is possibly 'null'
  //       ~~~~~~~~~ Property 'classList' does not exist on type 'EventTarget'
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABACwIZgCYBsCmARAJ1QHMAKfOAdzAC5EBRANxzCgEpEBvAKEUQgQBnKIiioCxHFHpZEAXkQVqAOgggCBFlAAq4yVADcvUXqkzVWVIMEAZGMOWoMGUgHIMRYsRhhirtkZ8APRBiAB+ERF80TF8rmISZliuiPaIAA5w1jAARlgAnoiuYCBYycYhsXyRNVEACgRw6TgEUIWuEJbWdsIpGHA4gohgcCI4AB72Igii+c1FTFq6iVCuFaHKm9wAvtxAA)

----

```ts
const p = document.getElementsByTagName('p')[0];
//    ^? const p: HTMLParagraphElement
const button = document.createElement('button');
//    ^? const button: HTMLButtonElement
const div = document.querySelector('div');
//    ^? const div: HTMLDivElement | null
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBADjAvDAJiYBXAtgUzFAOgHMcoBRAGx13wgCEBPAFQEMiA5F3ACgHI5eASgDaABgC6AbgBQAelkxFMAHoB+GKEiw4ALhgAJJgFkAMgAUWAJzbW4AC0rU8UaZugwARhihRwSVOjYzgTAljgsUDiONFB8Xj7gQjLySirqbrDxvmB6hqZ03tnRzq7g7igAlgBu-miYMQQAjhg4lgwAyjhUwL6WfJVVSXIKSmoaZbADucYmACLVxfgwAD4wYBgUFNJAA)

----

```ts
const div = document.getElementById('my-div');
//    ^? const div: HTMLElement | null
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAJgSwG4wLzxMArgWwKZhQB0A5nlAKIA2e+hAQgJ4CScAFAOQ6MC0iSHAJQBuAFAB6cTGkwAegH4YoSLH4AuGAAkAKgFkAMtVoFYAHxhgsVKqKA)

----

```ts
document.getElementById('my-div') as HTMLDivElement;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYewxgrgtgpgdgFwHQHMYIKIBsa0QIQE8BJYACgHIpCBaYASwDcKBKAAgEMBnNgCQBUAsgBkAIk2y54CANwAoIA)

----

```ts
const div = document.getElementById('my-div');
if (div instanceof HTMLDivElement) {
  console.log(div);
  //          ^? const div: HTMLDivElement
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAJgSwG4wLzxMArgWwKZhQB0A5nlAKIA2e+hAQgJ4CScAFAOQ6MC0iSHAJQBuAFAIAZjDb8YCSFACGYYHhBSAEgBUAsgBkAIsmq0CUQTADeomDFCQQNIlRAkZyETZgB6b7f8BMAB6APx24NDwyABcMNr6RkgmdFCiAL6iQA)

----

```ts
const div = document.getElementById('my-div')!;
//    ^? const div: HTMLElement
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAJgSwG4wLzxMArgWwKZhQB0A5nlAKIA2e+hAQgJ4CScAFAOQ6MC0iSHAJQBCANwAoAPSSYsmAD0A-DFCRY-AFwwAEgBUAsgBlqtAlHFA)

----

```ts
function handleDrag(eDown: Event) {
  // ...
  const dragStart = [
     eDown.clientX, eDown.clientY
     //    ~~~~~~~        ~~~~~~~ Property '...' does not exist on 'Event'
  ];
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABACwIZgCYBsCmARAJ1QHMAKfOAdzAC5EBRANxzCgEpEBvAKEUQHp+iAHSjeiCAgDOURBiLEAylFQFZAXkQBtcX0QVqwiFhgsoADQA0+vFTBGTZgJq6+gvYgB+3n548ffH0QABQI4AAccNQBPRAByUWE4uTgcKUQwOFkcAA8YGUQEeKYzOPEAXQBucXdE7gBfbiA)

----

```ts
function addDragHandler(el: HTMLElement) {
  el.addEventListener('mousedown', eDown => {
    const dragStart = [eDown.clientX, eDown.clientY];
    const handleUp = (eUp: MouseEvent) => {
      el.classList.remove('dragging');
      el.removeEventListener('mouseup', handleUp);
      const dragEnd = [eUp.clientX, eUp.clientY];
      console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
    }
    el.addEventListener('mouseup', handleUp);
  });
}

const surfaceEl = document.getElementById('surface');
if (surfaceEl) {
  addDragHandler(surfaceEl);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoCICdkHMASyYqANgKZYAUZJAXIvgCoCyAMgKLkC2ZYUAlIgDeAKESIaAOjSp2AN15RWMAM5ReFSgHIucECrKo4AdzBaANBIwmkAXgB8wseMQQEaxKhy4AylGRYUIi2iADaZNamkhAkMIoAGpYRNtGxigCaALoA3M7ibmAeABZEpGQAqgAOwYjUVfTMegbyioIOTi4uUjHIKirKapJYZLoK2l54uDBguFr8uZ3iUsOjZC18A+pgmjpNZCCVFoglxORV83kuBR4TuOzENeFVqXF8iRLPMa9QWQuL13ByJISHBcOMAB6WVAATxqR1CAAZLABGTKSLjISqUGDBRy3e6oUIwTKIAC0nm8fgCUCJmX4F06AF9LlIZOslKotjtdPp9odLCcyuc-oyLsyRNcgioQFhgMgIGsSDUjBAQDw+JJcGQoJwRooAELQgCSqG00tl8rIc1yMGAtXNcoVnEEonEMmweEIp00DstztyzKAA)
