// requires node modules: @types/geojson

interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
import {Feature, Geometry} from 'geojson';
declare let f: Feature;
function helper(coordinates: any[]) {}
const geometryHelper = (g: Geometry) => {
  if (geometry.type === 'GeometryCollection') {
    geometry.geometries.forEach(geometryHelper);
  } else {
    helper(geometry.coordinates);  // OK
  }
}

const {geometry} = f;
if (geometry) {
  geometryHelper(geometry);
}
