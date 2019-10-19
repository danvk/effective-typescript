interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
type GeoJSONFeature = any;
function calculateBoundingBox(f: GeoJSONFeature): BoundingBox | null {
  let box: BoundingBox | null = null;

  const helper = (coords: any[]) => {
    // ...
  };

  const {geometry} = f;
  if (geometry) {
    helper(geometry.coordinates);
  }

  return box;
}
