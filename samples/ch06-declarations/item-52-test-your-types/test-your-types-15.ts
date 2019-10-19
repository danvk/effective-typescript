declare function map<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];
const beatles = ['john', 'paul', 'george', 'ringo'];
map(beatles, function(
  name,  // $ExpectType string
  i,     // $ExpectType number
  array  // $ExpectType string[]
) {
  this   // $ExpectType string[]
  return name.length;
});  // $ExpectType number[]
