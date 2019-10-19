interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
const v: {x: 1|3|5} = {
  x: 1,
};  // Type is { x: 1 | 3 | 5; }
