interface Vector2D {
  x: number;
  y: number;
}
function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({x: 3, y: 4});  // OK, result is 5
const vec3D = {x: 3, y: 4, z: 1};
calculateNorm(vec3D);  // OK! result is also 5
