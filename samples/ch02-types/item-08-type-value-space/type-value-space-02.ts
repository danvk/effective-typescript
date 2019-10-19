interface Cylinder {
  radius: number;
  height: number;
}

const Cylinder = (radius: number, height: number) => ({radius, height});
function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape.radius
       // ~~~~~~ Property 'radius' does not exist on type '{}'
  }
}
