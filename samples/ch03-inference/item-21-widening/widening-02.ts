interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
let x = 'x';
let vec = {x: 10, y: 20, z: 30};
getComponent(vec, x);
               // ~ Argument of type 'string' is not assignable to
               //   parameter of type '"x" | "y" | "z"'
