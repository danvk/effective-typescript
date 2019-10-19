interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if ('height' in shape) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
