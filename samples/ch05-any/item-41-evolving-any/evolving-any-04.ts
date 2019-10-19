let val;  // Type is any
if (Math.random() < 0.5) {
  val = /hello/;
  val  // Type is RegExp
} else {
  val = 12;
  val  // Type is number
}
val  // Type is number | RegExp
