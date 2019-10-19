function panTo(where: readonly [number, number]) { /* ... */ }
const loc = [10, 20, 30] as const;  // error is really here.
panTo(loc);
//    ~~~ Argument of type 'readonly [10, 20, 30]' is not assignable to
//        parameter of type 'readonly [number, number]'
//          Types of property 'length' are incompatible
//            Type '3' is not assignable to type '2'
