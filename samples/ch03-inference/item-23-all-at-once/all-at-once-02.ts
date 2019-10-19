interface Point { x: number; y: number; }
const pt: Point = {};
   // ~~ Type '{}' is missing the following properties from type 'Point': x, y
pt.x = 3;
pt.y = 4;
