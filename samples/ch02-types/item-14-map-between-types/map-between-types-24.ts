interface Name {
  first: string;
  last: string;
}
type DancingDuo<T extends Name> = [T, T];

const couple1: DancingDuo<Name> = [
  {first: 'Fred', last: 'Astaire'},
  {first: 'Ginger', last: 'Rogers'}
];  // OK
const couple2: DancingDuo<{first: string}> = [
                       // ~~~~~~~~~~~~~~~
                       // Property 'last' is missing in type
                       // '{ first: string; }' but required in type 'Name'
  {first: 'Sonny'},
  {first: 'Cher'}
];
