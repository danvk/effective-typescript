interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function calculateLengthL1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}
