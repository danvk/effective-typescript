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
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (pt.x < box.x[0] || pt.x > box.x[1] ||
        //     ~~~                ~~~  Object is possibly 'undefined'
        pt.y < box.y[1] || pt.y > box.y[1]) {
        //     ~~~                ~~~  Object is possibly 'undefined'
      return false;
    }
  }
  // ...
}
