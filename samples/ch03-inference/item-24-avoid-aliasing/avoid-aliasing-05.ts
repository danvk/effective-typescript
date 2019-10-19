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
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  polygon.bbox  // Type is BoundingBox | undefined
  const box = polygon.bbox;
  box  // Type is BoundingBox | undefined
  if (polygon.bbox) {
    polygon.bbox  // Type is BoundingBox
    box  // Type is BoundingBox | undefined
  }
}
