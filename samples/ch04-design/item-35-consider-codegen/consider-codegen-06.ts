// requires node modules: @types/geojson

interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
import {Feature, Geometry} from 'geojson';
declare let f: Feature;
function helper(coordinates: any[]) {}
const {geometry} = f;
if (geometry) {
  if (geometry.type === 'GeometryCollection') {
    throw new Error('GeometryCollections are not supported.');
  }
  helper(geometry.coordinates);  // OK
}
