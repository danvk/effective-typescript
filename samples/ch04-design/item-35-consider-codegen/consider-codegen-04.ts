// requires node modules: @types/geojson

interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
import {Feature} from 'geojson';

function calculateBoundingBox(f: Feature): BoundingBox | null {
  let box: BoundingBox | null = null;

  const helper = (coords: any[]) => {
    // ...
  };

  const {geometry} = f;
  if (geometry) {
    helper(geometry.coordinates);
                 // ~~~~~~~~~~~
                 // Property 'coordinates' does not exist on type 'Geometry'
                 //   Property 'coordinates' does not exist on type
                 //   'GeometryCollection'
  }

  return box;
}
