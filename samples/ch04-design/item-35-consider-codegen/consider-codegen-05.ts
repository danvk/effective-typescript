// requires node modules: @types/geojson

interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
import {Feature, Geometry} from 'geojson';
declare let f: Feature;
function helper(coordinates: any[]) {}
