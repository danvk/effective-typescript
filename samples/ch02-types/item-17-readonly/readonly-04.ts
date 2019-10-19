const a: number[] = [1, 2, 3];
const b: readonly number[] = a;
const c: number[] = b;
   // ~ Type 'readonly number[]' is 'readonly' and cannot be
   //   assigned to the mutable type 'number[]'
