interface Person {
  first: string;
  last: string;
}
const p: Person = { first: 'Jane', last: 'Jacobs' };
//    -           --------------------------------- Values
//       ------ Type
function email(p: Person, subject: string, body: string): Response {
  //     ----- -          -------          ----  Values
  //              ------           ------        ------   -------- Types
  // COMPRESS
  return new Response();
  // END
}

class Cylinder {
  radius=1;
  height=1;
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape  // OK, type is Cylinder
    shape.radius  // OK, type is number
  }
}
const v = typeof Cylinder;  // Value is "function"
type T = typeof Cylinder;  // Type is typeof Cylinder
type C = InstanceType<typeof Cylinder>;  // Type is Cylinder
