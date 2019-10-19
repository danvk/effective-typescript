interface Point { x: number; y: number; }
const pt0 = {};
const pt1 = {...pt0, x: 3};
const pt: Point = {...pt1, y: 4};  // OK
