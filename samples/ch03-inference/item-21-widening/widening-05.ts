interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
const x = 'x';  // type is "x"
let vec = {x: 10, y: 20, z: 30};
getComponent(vec, x);  // OK
