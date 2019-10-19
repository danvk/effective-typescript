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
// HIDE
const polygon: Polygon = { exterior: [], holes: [] };
function calculatePolygonBbox(polygon: Polygon) {}
// END
const {bbox} = polygon;
if (!bbox) {
  calculatePolygonBbox(polygon);  // Fills in polygon.bbox
  // Now polygon.bbox and bbox refer to different values!
}

function fn(p: Polygon) { /* ... */ }

polygon.bbox  // Type is BoundingBox | undefined
if (polygon.bbox) {
  polygon.bbox  // Type is BoundingBox
  fn(polygon);
  polygon.bbox  // Type is still BoundingBox
}
