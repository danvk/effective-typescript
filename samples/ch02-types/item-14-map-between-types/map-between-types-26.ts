interface Name {
  first: string;
  last: string;
}
type DancingDuo<T extends Name> = [T, T];
type FirstLast = Pick<Name, 'first' | 'last'>;  // OK
type FirstMiddle = Pick<Name, 'first' | 'middle'>;
                           // ~~~~~~~~~~~~~~~~~~
                           // Type '"middle"' is not assignable
                           // to type '"first" | "last"'
