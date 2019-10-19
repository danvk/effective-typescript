type T = Exclude<string|Date, string|number>;  // Type is Date
type NonZeroNums = Exclude<number, 0>;  // Type is still just number
