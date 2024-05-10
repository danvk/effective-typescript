# Item 42: Avoid Types Based on Anecdotal Data

## Things to Remember

- Avoid writing types by hand based on data that you've seen. It's easy to misunderstand a schema or get nullability wrong.
- Prefer types sourced from official clients or the community. If these don't exist, generate TypeScript types from schemas.## Code Samples

```ts
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
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEIHsCuIAmoDmGAHsgN4BQyyANnGAFzIDaImAtgEbQA0yrn0ALoBuSjRD5GLdlyi9+skeQC+5MAE8ADigDiEdACkAygHkAcgDEIdTFBQBeZHBDrRG7cj2HTZr2whgUOrIjs6u5DDYCGDA6CDICHDUCJi0kBjYeBLEABQwjF7G5lY2dgCUjBm4BMTIAD58qdRkYtQByBzoRJVY1dld9Y3UzY6sw6JiCHEAzmDIABYQ1NpQIcg5U+hQONOMYUyCZSEAfC1UVAD0F8gAdHdiyhNUUyCzZPj6-oHqymswolRgDB1h90F8gkcKOcFksVjlQeD1DdNttQHQINMygDkKoxHYwLZ4p0iKJVEA)

----

```ts
interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONGeometry | null;
  properties: unknown;
}
interface GeoJSONGeometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPolygon';
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgOIQPYCkDKB5AOQDEI4wBXKFAbwChlkwBPABwgC5kByEsyiLgG56yAOaYAthDBQmndNnwEFUmU2QAfZCHIAbXcIYsoGNlDDAIAZ07kQAaxAYA7iGEBfWqEixEKBbiEKtKyyHQMzGycXAAKGN5cmtwAMqAQODKgoolasRi6TKIYIDncALJ6FnEFRSWGyAgYGFAAJqBk1pw6EgBG0ADaALpJ3X1QQ0Mj5L0DgxPDWqOz80MetEA)

----

```ts
import {Feature} from 'geojson';

function calculateBoundingBox(f: Feature): BoundingBox | null {
  let box: BoundingBox | null = null;

  const helper = (coords: any[]) => {
    // ...
  };

  const {geometry} = f;
  if (geometry) {
    helper(geometry.coordinates);
    //              ~~~~~~~~~~~
    //   Property 'coordinates' does not exist on type 'Geometry'
    //     Property 'coordinates' does not exist on type 'GeometryCollection'
  }

  return box;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEIHsCuIAmoDmGAHsgN4BQyyANnGAFzIDaImAtgEbQA0yrn0ALoBuSjRD5GLdlyi9+skeQC+5YGwAO6KGDIAxCHUxQIy5DCjo2yAOT4I6AFYBndCBujyMbAjDA3yAhw1AiYtJAY2HgSxAAUMIwGRiYAlIyRuATEyAA+fGHUZGLUELoc6ETpWJkxFbn51IUAvA3UnlQIbs66ABYQ1BrQyC2xndo4zoxwIACeTIIpwwB8RVRUAPTryAB0u2LK7YFduqT2VqVQM2YtMKJUwDDIsWdsFzOLFGvIfQPQzw6vMCXbZjKDROgQZwpO5rTZfeHwgB+yJRqMRYg2WyoAAVLIMdDNbKDwZBnDZkDh0JC+OhdBAiMBusgAmAZoNbABxAFvGwY5Bwr649D41lE9DjUAQskUqnOGl0hlMllslA2LnnIEzADC6EaEF8-nc+3IYhMYGMIGQ5SIolUQA)

----

```ts
const {geometry} = f;
if (geometry) {
  if (geometry.type === 'GeometryCollection') {
    throw new Error('GeometryCollections are not supported.');
  }
  helper(geometry.coordinates);  // OK
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEIHsCuIAmoDmGAHsgN4BQyyANnGAFzIDaImAtgEbQA0yrn0ALoBuSjRD5GLdlyi9+skeQC+5YGwAO6KGDIAxCHUxQIvAOIR0bCGCgBPZchhQryAOT5LAKwDO6EG6iOBAItCY0Nk6MBkYmojDYCGDA-sgAFhDUGtAAFAjo2nggdBA+jHAgdkyCAJRkqvkgPrqknlY29o4AvE6iwDDIOW3WtnZ1FFT9g8MddgB0YHbZyF2r7hbtowDC6NTUIcn+buNiVGBpLgDufBDXAKJQLlA5bhsj9jt7BylNyHDhIHQuh8mA0Wh0EBwc2OoioqioGSyuRmozm+UKoBKPhqwioAHo8cgAPIAaRU5CAA)

----

```ts
const geometryHelper = (g: Geometry) => {
  if (g.type === 'GeometryCollection') {
    g.geometries.forEach(geometryHelper);
  } else {
    helper(g.coordinates);  // OK
  }
}

const {geometry} = f;
if (geometry) {
  geometryHelper(geometry);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEIHsCuIAmoDmGAHsgN4BQyyANnGAFzIDaImAtgEbQA0yrn0ALoBuSjRD5GLdlyi9+skeQC+5YGwAO6KGDIAxCHUxQIvAOIR0bCGCgBPZchhQryAOT5LAKwDO6EG6iOBAItCY0Nk6MBkYmojDYCGDA-sgAFhDUGtAAFAjo2nggdBA+jHAgdkyCAJRkqvkgPrqeVjb2ABKZ2VDIALzIOZLIFm22dnV9AHxkYsAwg-gAdGB22f19A26j1uMAwujU1CHJ-m51FFRUy627UMClSzDaAKKIaUOWd3ZdWdA1oiojkyPhQlyuGT+UCGS3yhVAJR8AKoAHoUcgAPIAaTEqlU5EazTIt3aDn6TlE80WX1JFzEJPGvx6nzG9gBKnIQA)
