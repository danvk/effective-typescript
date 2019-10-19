interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
                    // ~~~~~~~~~ 'Rectangle' only refers to a type,
                    //           but is being used as a value here
    return shape.width * shape.height;
                    //         ~~~~~~ Property 'height' does not exist
                    //                on type 'Shape'
  } else {
    return shape.width * shape.width;
  }
}
