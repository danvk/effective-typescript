# Item 23: Be Consistent in Your Use of Aliases

## Things to Remember

- Aliasing can prevent TypeScript from narrowing types. If you create an alias for a variable, use it consistently.
- Be aware of how function calls can invalidate type refinements on properties. Trust refinements on local variables more than on properties.


## Code Samples

```ts
const place = {name: 'New York', latLng: [41.6868, -74.2692]};
const loc = place.latLng;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBADgGwIbAKYwLwwN5iQW1QC4YByAOVQHcYBNEAJwGtSAaGZKAGTAHMSA2gBYAjADoAbAA5p7ALQB2IWIBMEgJwqAugF8A3AChQkWAhDBM8ZGjGcevQ0A)

----

```ts
interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBIA)

----

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  if (polygon.bbox) {
    if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] ||
        pt.y < polygon.bbox.y[0] || pt.y > polygon.bbox.y[1]) {
      return false;
    }
  }

  // ... more complex check
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBGBkEMGDfYES3EQBJEDdPbxAACgAHDy8fag7BkD1esBTw9IgASj9kYBhkPoGugDpc-PmSMjIllYn15QAeZH7On0288mP1AAZDZAAfZ-OwY+QAPnO1q63buR1ABGJ6vdh7PZHDjIM4XUbXfLrDgPMFvaHfX6XECI24o0E7CF7KAQMC0KC+eDuRIQbJkQT0oRkAD0zOQ6w5yHoWBQCHQ9F67gCyAQsQgCAA1nYgA)

----

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (pt.x < box.x[0] || pt.x > box.x[1] ||
        //     ~~~                ~~~  'box' is possibly 'undefined'
        pt.y < box.y[0] || pt.y > box.y[1]) {
        //     ~~~                ~~~  'box' is possibly 'undefined'
      return false;
    }
  }
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBGBkEMGDfYES3EQBJEDdPbxAACgAHDy8fag7BkD1esBTw9IgASj9kBB9EsBz85ABeZH7OnwA6XIr2YBhkPoGug7zyeZIyMhOzib3lAB418hf1AAZDZAAff7bMAvZAAPg+XwAjH9Aex7vcAPSIhHIAB+GNRWNRGLRZAA5Nd8chGtt0IlEsBGJ5kPjShAYKAINh8fDUc8OMh3tc9hwfrCgRzwZC+TDbmyEcicZjsbLcQSiSTEmSKVSaXTZAymSyJcgoBAwLQoL54O5EhBsmRBFb2FK9va7EA)

----

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  polygon.bbox
  //      ^? (property) Polygon.bbox?: BoundingBox | undefined
  const box = polygon.bbox;
  //    ^? const box: BoundingBox | undefined
  if (polygon.bbox) {
    console.log(polygon.bbox);
    //                  ^? (property) Polygon.bbox?: BoundingBox
    console.log(box);
    //          ^? const box: BoundingBox | undefined
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBGBkEMGDfYES3EQBJEDdPbxAACgAHDy8fag7BkD1esBTw9IgASj9kfs6fADpc-PYAek2yXeQAPQLkPqh0XugwDnmRrrW8wuLpWVBy5QAfZFKIGFAIbHYED5EmAcvlkABeRYDW7rcjZbZ7Q7IQEgYGgtQlZ4KJTID5fH4gP7sYAwY5LUZ3fLzEh7FGJBIrdzoeR9aGrWGzbJkBF7Xl8shIk5nC5XVxskCUh7ITFlJTsMh0hlMln3Tny5A8-kHI50kH3R6lF44vGyb6-f5kQSCIA)

----

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (box) {
    if (pt.x < box.x[0] || pt.x > box.x[1] ||
        pt.y < box.y[0] || pt.y > box.y[1]) {  // OK
      return false;
    }
  }
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBGBkEMGDfYES3EQBJEDdPbxAACgAHDy8fag7BkD1esBTw9IgASj9kBB9EsBz85ABeZH7OnwA6XIr2YBhkbrzyeZIyMhOzib3lAB418kf1AAZDZAAfH+2wI9kAA+V7vACM3z+7BuNweHGQLwuew4nyh-3hILBqMhVzIAHp8cgAPIAaRhNygEDAtCgvng7kSEGyZEErPYhOQe25diAA)

----

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const {bbox} = polygon;
  if (bbox) {
    const {x, y} = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
      return false;
    }
  }
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBGBkEMGDfYES3EQBJEDdPbxAACgAHDy8fag7BkD1esBTw9IgASj9kBB9EsCJc-P5kAF5kfs6fbOAYZG718nmSMjIlkBWicj0OTZ2z7LIjk4mAOmUAHgp1AAGQzIAA+oN2YB+yAAfACAIwg8GQr4cZD-DhApEQ75ouGYxEXdhXZBQCBgWhQXzwdyJCBvZCCMhM5AAelZyC+XLsQA)

----

```ts
const {bbox} = polygon;
if (!bbox) {
  calculatePolygonBbox(polygon);  // Fills in polygon.bbox
  // Now polygon.bbox and bbox refer to different values!
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBAHoq5AAJAEkAEQBRYgQfRLBkAAcPLx9qN09vXwBeImQAoJCNQz149yTqaOR+NhgZBDBg3wQ4dwRad0jhgZAJPPIACj6Rwdd+0YBKImraloA5JvbO7sJcvl+MgJndzmxgDBkNcAISA8ivEhkfaHY6nJ4+S75W4YkDPFhkGrIABiwHc7kSyFAvVxADp4ewiZ90AB3Gn3ED0q7IOCyHLcqAQGDQZBgdDIXAwYWC8DIABuB1oSRhdmIQA)

----

```ts
function expandABit(p: Polygon) { /* ... */ }

polygon.bbox
//      ^? (property) Polygon.bbox?: BoundingBox | undefined
if (polygon.bbox) {
  polygon.bbox
  //      ^? (property) Polygon.bbox?: BoundingBox
  expandABit(polygon);
  polygon.bbox
  //      ^? (property) Polygon.bbox?: BoundingBox
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIHt1QCajpZAbwChlkAPALmRAFcBbAI2gG5TkBPaup14gX2LFQkWIhQAhdLRC4QAcynki7KsgDaPZlAA0NBtoC6bMlw1boei1GMChI6PCTIACugA2HeehAqyEclFgLGoMLDl8CHVbMgALDwgAZ1DMHDxIaOiTZEZGdHIAfmopGTlFfLZBAHoq5AAJAEkAEQBRYgQfRLBkAAcPLx9qN09vXwBeImQAoJCNQz149yTqaOR+NhgZBDBg3wQ4dwRad0jhgZAJPPIACj6Rwdd+0YBKImraloA5JvbO7sJcvl+MgJndzmxgDBkNcAISA8ivEhkfaHY6nJ4+S75W4YkDPFhkGrIABiwHc7kSyFAvVxADp4ewiZ90AB3Gn3ED0q7IOCyHLcqAQGDQZBgdDIXAwYWC8DIABuB1oSRhdmImxA212U3IPV52AAghJgGBbkNcYjkFUAFTIWl25BW2qCYhg0Zc-LEIlkb0APQK0J6UHQPWgYA4rzObvhRWQJVkoHKygAPshSkLQBBsMIoTiOe6EX52ed84zat6yH6A0GQ1AwxG6dHitJ4wolOwArrZIbjbnzvj2K6fCXCWXy5XbtXQ+HHnnG7Hm2U24IgA)
