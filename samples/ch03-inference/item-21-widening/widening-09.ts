interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
const a1 = [1, 2, 3];  // Type is number[]
const a2 = [1, 2, 3] as const;  // Type is readonly [1, 2, 3]
