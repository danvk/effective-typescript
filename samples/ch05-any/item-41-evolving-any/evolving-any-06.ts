function somethingDangerous() {}
let val = null;  // Type is any
try {
  somethingDangerous();
  val = 12;
  val  // Type is number
} catch (e) {
  console.warn('alas!');
}
val  // Type is number | null
