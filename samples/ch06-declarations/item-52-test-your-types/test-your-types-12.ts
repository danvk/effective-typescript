// tsConfig: {"noImplicitAny":false}

const square = (x: number) => x * x;
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const beatles = ['john', 'paul', 'george', 'ringo'];
assertType<number[]>(map(
  beatles,
  function(name, i, array) {
// ~~~~~~~ Argument of type '(name: any, i: any, array: any) => any' is
//         not assignable to parameter of type '(u: string) => any'
    assertType<string>(name);
    assertType<number>(i);
    assertType<string[]>(array);
    assertType<string[]>(this);
                      // ~~~~ 'this' implicitly has type 'any'
    return name.length;
  }
));
