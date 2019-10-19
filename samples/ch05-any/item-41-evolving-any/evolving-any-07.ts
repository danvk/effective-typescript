let val: any;  // Type is any
if (Math.random() < 0.5) {
  val = /hello/;
  val  // Type is any
} else {
  val = 12;
  val  // Type is any
}
val  // Type is any
